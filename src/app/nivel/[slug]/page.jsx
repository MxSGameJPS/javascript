"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, useParams } from "next/navigation";
import levels from "../../../data/levels";
import QuizHeader from "../../../components/Quiz/QuizHeader";
import QuizQuestion from "../../../components/Quiz/QuizQuestion";
import QuizFooter from "../../../components/Quiz/QuizFooter";
import styles from "./nivel.module.css";

export default function NivelPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug || "iniciante";
  const level = levels[slug];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [life, setLife] = useState(10);
  const [score, setScore] = useState(0);
  const [gems, setGems] = useState(0);
  const [baseHeat, setBaseHeat] = useState(0);
  const [baseGems, setBaseGems] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalRoot, setModalRoot] = useState(null);
  const overlayRef = useMemo(() => ({ current: null }), []);

  useEffect(() => {
    // reset when level changes
    setIndex(0);
    setSelected(null);
    // initialize lives from storage (persist across levels)
    try {
      const storedLives = parseInt(
        localStorage.getItem("javascriptpath_lives") || "",
        10
      );
      setLife(Number.isFinite(storedLives) ? storedLives : 10);
    } catch (e) {
      setLife(10);
    }
    setScore(0);
    setGems(0);
    // load base heat/gems so header can show cumulative values
    try {
      const storedHeat = parseInt(
        localStorage.getItem("javascriptpath_heat") || "0",
        10
      );
      const storedGems = parseInt(
        localStorage.getItem("javascriptpath_gems") || "0",
        10
      );
      setBaseHeat(Number.isFinite(storedHeat) ? storedHeat : 0);
      setBaseGems(Number.isFinite(storedGems) ? storedGems : 0);
    } catch (e) {
      setBaseHeat(0);
      setBaseGems(0);
    }
  }, [slug]);

  // create a dedicated overlay element when modal opens to avoid stacking issues
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (showModal) {
      // create overlay element with inline styles so it's always on top
      const overlayEl = document.createElement("div");
      overlayEl.setAttribute("id", "javascriptpath-modal-overlay");
      overlayEl.style.position = "fixed";
      overlayEl.style.inset = "0";
      overlayEl.style.display = "flex";
      overlayEl.style.alignItems = "center";
      overlayEl.style.justifyContent = "center";
      overlayEl.style.background = "rgba(2,6,23,0.75)";
      overlayEl.style.zIndex = "2147483647";
      overlayEl.style.padding = "1.25rem";
      document.body.appendChild(overlayEl);
      overlayRef.current = overlayEl;
      setModalRoot(overlayEl);
      return () => {
        if (overlayRef.current) {
          try {
            document.body.removeChild(overlayRef.current);
          } catch (e) {}
          overlayRef.current = null;
          setModalRoot(null);
        }
      };
    }
    // if modal not open, ensure we don't keep overlay
    return undefined;
  }, [showModal, setModalRoot, overlayRef]);

  // lock body scroll while modal is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev;
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showModal]);

  // questions may come from public JSON or fallback to data/levels.js
  useEffect(() => {
    let mounted = true;
    async function loadJson() {
      try {
        const res = await fetch("/Json/quizinicial.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("failed to fetch quiz json");
        const data = await res.json();
        const key = slug || "iniciante";
        const raw = data[key];
        if (mounted && Array.isArray(raw)) {
          // normalize into expected format: {id, pergunta, alternativas, correta, explicacao?}
          const normalized = raw.map((r) => ({
            id: r.id,
            pergunta: r.pergunta,
            alternativas: r.opcoes?.map((o) => o.texto) || r.alternativas || [],
            correta:
              // if JSON used 'opcoes' with 'correta' boolean, find index
              typeof r.correta === "number"
                ? r.correta
                : r.opcoes
                ? r.opcoes.findIndex((o) => o.correta)
                : r.correta,
            explicacao: r.explicacao || null,
          }));
          setQuestions(normalized);
          return;
        }
      } catch (e) {
        // ignore and fallback
      }
      // fallback
      if (mounted && level && Array.isArray(level.perguntas)) {
        setQuestions(level.perguntas);
      }
    }
    loadJson();
    return () => {
      mounted = false;
    };
  }, [slug, level]);

  if (!level) return <div>Level not found</div>;

  const perguntaObj = (questions && questions[index]) || level.perguntas[index];

  const progress = Math.round(
    (index / (questions ? questions.length : level.perguntas.length)) * 100
  );

  const handleSelect = (i) => setSelected(i);

  const handleSkip = () => {
    setSelected(null);
    if (index < level.perguntas.length - 1) setIndex(index + 1);
  };

  const handleVerify = () => {
    if (selected === null) return;
    const isCorrect = selected === perguntaObj.correta;
    if (isCorrect) {
      // award 10 heat points for a correct answer
      setScore((s) => s + 10);
      const per =
        level.perQuestionGems ||
        Math.floor(level.gemsTotal / level.perguntas.length);
      setGems((g) => g + per);
      // increment correct counter and possibly unlock next
      setCorrectCount((prev) => {
        const updated = prev + 1;
        // check threshold immediately
        try {
          const needed = Math.ceil(level.perguntas.length / 2);
          if (updated >= needed) {
            // unlock next level
            const all = Object.values(levels).sort((a, b) => a.id - b.id);
            const pos = all.findIndex((l) => l.slug === slug);
            const next = all[pos + 1];
            if (next) {
              try {
                const raw = localStorage.getItem(
                  "javascriptpath_unlocked_levels"
                );
                const arr = raw ? JSON.parse(raw) : [];
                if (!arr.includes(next.slug)) {
                  arr.push(next.slug);
                  localStorage.setItem(
                    "javascriptpath_unlocked_levels",
                    JSON.stringify(arr)
                  );
                  try {
                    window.dispatchEvent(
                      new CustomEvent("javascriptpath:levelsChanged", {})
                    );
                  } catch (e) {}
                }
              } catch (e) {}
            }
          }
        } catch (e) {}
        return updated;
      });
      setModalContent({
        ok: true,
        title: "Excelente!",
        text: "Parabéns — resposta correta.",
      });
      setShowModal(true);
    } else {
      // decrement life and persist it so next levels start with updated lives
      const newLife = Math.max(0, (life || 0) - 1);
      setLife(newLife);
      try {
        localStorage.setItem("javascriptpath_lives", String(newLife));
      } catch (e) {}
      setModalContent({
        ok: false,
        title: "Ops!",
        text: `Resposta correta: ${
          perguntaObj.alternativas[perguntaObj.correta]
        }`,
        explicacao: perguntaObj.explicacao || null,
      });
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    setShowModal(false);
    setSelected(null);
    if (index < level.perguntas.length - 1) {
      setIndex(index + 1);
    } else {
      // fim do nível - depositar gems e redirecionar para /inicio
      // aqui você poderia chamar API para persistir o resultado
      try {
        // persistir pontos (heat) e gems no localStorage para o header ler
        const heatKey = "javascriptpath_heat";
        const gemsKey = "javascriptpath_gems";
        const prevHeat = parseInt(localStorage.getItem(heatKey) || "0", 10);
        const prevGems = parseInt(localStorage.getItem(gemsKey) || "0", 10);
        const newHeat = prevHeat + (score || 0);
        const newGems = prevGems + (gems || 0);
        localStorage.setItem(heatKey, String(newHeat));
        localStorage.setItem(gemsKey, String(newGems));

        // persist completed levels
        try {
          const completedRaw = localStorage.getItem(
            "javascriptpath_completed_levels"
          );
          const completed = completedRaw ? JSON.parse(completedRaw) : [];
          const slug = params.slug || "";
          if (!completed.includes(slug)) {
            completed.push(slug);
            localStorage.setItem(
              "javascriptpath_completed_levels",
              JSON.stringify(completed)
            );
          }
        } catch (err) {
          // ignore JSON errors
        }
        // persist remaining lives
        try {
          localStorage.setItem("javascriptpath_lives", String(life || 0));
        } catch (e) {}
        // also ensure next level unlocked if user reached correct threshold
        try {
          const needed = Math.ceil(level.perguntas.length / 2);
          if ((correctCount || 0) >= needed) {
            const all = Object.values(levels).sort((a, b) => a.id - b.id);
            const pos = all.findIndex((l) => l.slug === slug);
            const next = all[pos + 1];
            if (next) {
              try {
                const raw = localStorage.getItem(
                  "javascriptpath_unlocked_levels"
                );
                const arr = raw ? JSON.parse(raw) : [];
                if (!arr.includes(next.slug)) {
                  arr.push(next.slug);
                  localStorage.setItem(
                    "javascriptpath_unlocked_levels",
                    JSON.stringify(arr)
                  );
                  try {
                    window.dispatchEvent(
                      new CustomEvent("javascriptpath:levelsChanged", {})
                    );
                  } catch (e) {}
                }
              } catch (e) {}
            }
          }
        } catch (e) {}
        // dispatch event so Header updates immediately
        try {
          window.dispatchEvent(
            new CustomEvent("javascriptpath:statsChanged", {
              detail: { heat: newHeat, gems: newGems },
            })
          );
        } catch (e) {
          // ignore if CustomEvent unsupported
        }

        // also notify levels changed so inicio can update
        const lvlEvent = new CustomEvent("javascriptpath:levelsChanged", {});
        window.dispatchEvent(lvlEvent);

        // if user completed all levels, redirect to cadastro with celebration
        try {
          const completedRaw = localStorage.getItem(
            "javascriptpath_completed_levels"
          );
          const completed = completedRaw ? JSON.parse(completedRaw) : [];
          const all = Object.values(levels).map((l) => l.slug);
          const allDone = all.every((s) => completed.includes(s));
          if (allDone) {
            router.push("/cadastrar?celebration=1");
            return;
          }
        } catch (e) {
          // ignore and fall back to /inicio
        }
      } catch (e) {
        // ignore storage errors
      }
      router.push("/inicio");
    }
  };

  return (
    <div className={styles.page}>
      <QuizHeader
        levelTitle={level.titulo}
        levelNumber={level.id}
        // display cumulative values (persisted base + current level gains)
        streak={(baseHeat || 0) + (score || 0)}
        gems={(baseGems || 0) + (gems || 0)}
      />

      <div className={styles.progressWrap}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuizQuestion
        perguntaObj={perguntaObj}
        selected={selected}
        onSelect={handleSelect}
      />

      <QuizFooter
        onSkip={handleSkip}
        onVerify={() => (showModal ? handleContinue() : handleVerify())}
        canVerify={selected !== null || showModal}
        life={life}
      />

      {modalRoot && showModal
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={modalContent?.title || "Modal"}
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(2,6,23,0.75)",
                zIndex: 2147483647,
                padding: "1.25rem",
              }}
            >
              <div
                style={{
                  maxWidth: 680,
                  width: "100%",
                  borderRadius: 10,
                  padding: "1.25rem 1.5rem",
                  boxShadow: "0 20px 60px rgba(2,6,23,0.6)",
                  color: "#fff",
                  background: modalContent?.ok
                    ? "linear-gradient(180deg,#064c2b,#062f1a)"
                    : "linear-gradient(180deg,#4b1218,#2b0b0f)",
                  border: modalContent?.ok
                    ? "1px solid rgba(7,178,106,0.2)"
                    : "1px solid rgba(220,53,69,0.2)",
                }}
              >
                <h3 style={{ margin: 0, marginBottom: 8 }}>
                  {modalContent.title}
                </h3>
                <p style={{ margin: 0, marginBottom: 8 }}>
                  {modalContent.text}
                </p>
                {modalContent?.explicacao && (
                  <p style={{ marginTop: 8, color: "rgba(255,255,255,0.85)" }}>
                    {modalContent.explicacao}
                  </p>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 12,
                  }}
                >
                  <button
                    onClick={handleContinue}
                    autoFocus
                    style={{
                      padding: "0.6rem 1rem",
                      borderRadius: 8,
                      fontWeight: 700,
                      border: "none",
                      background: modalContent?.ok ? "#07b25a" : "#ff4d4f",
                      color: "#fff",
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>,
            modalRoot
          )
        : null}
    </div>
  );
}
