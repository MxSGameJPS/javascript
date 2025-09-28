"use client";
import { useEffect, useMemo, useState } from "react";
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
  const [life, setLife] = useState(10);
  const [score, setScore] = useState(0);
  const [gems, setGems] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    // reset when level changes
    setIndex(0);
    setSelected(null);
    setLife(10);
    setScore(0);
    setGems(0);
  }, [slug]);

  if (!level) return <div>Level not found</div>;

  const perguntaObj = level.perguntas[index];

  const progress = Math.round((index / level.perguntas.length) * 100);

  const handleSelect = (i) => setSelected(i);

  const handleSkip = () => {
    setSelected(null);
    if (index < level.perguntas.length - 1) setIndex(index + 1);
  };

  const handleVerify = () => {
    if (selected === null) return;
    const isCorrect = selected === perguntaObj.correta;
    if (isCorrect) {
      setScore((s) => s + 1);
      const per =
        level.perQuestionGems ||
        Math.floor(level.gemsTotal / level.perguntas.length);
      setGems((g) => g + per);
      setModalContent({
        ok: true,
        title: "Excelente!",
        text: "Resposta correta.",
      });
      setShowModal(true);
    } else {
      setLife((l) => Math.max(0, l - 1));
      setModalContent({
        ok: false,
        title: "Ops!",
        text: `Resposta correta: ${
          perguntaObj.alternativas[perguntaObj.correta]
        }`,
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
      router.push("/inicio");
    }
  };

  return (
    <div className={styles.page}>
      <QuizHeader
        levelTitle={level.titulo}
        levelNumber={level.id}
        streak={score}
        gems={gems}
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

      {showModal && (
        <div className={styles.modal}>
          <h3>{modalContent.title}</h3>
          <p>{modalContent.text}</p>
          <div style={{ marginTop: 12 }}>
            <button
              onClick={handleContinue}
              style={{ padding: "8px 12px", borderRadius: 8 }}
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
