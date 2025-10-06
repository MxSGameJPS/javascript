"use client";
import { useEffect, useState } from "react";
import { useLang } from "../../i18n/useLang";
import HeroHome from "../../components/HeroHome/HeroHome";
import CardNivel from "../../components/CardNivel/CardNivel";
import translations from "../../i18n/translations";
import styles from "../page.module.css";
import niveisData from "../../data/levels";

export default function Inicio() {
  const [lang] = useLang();
  const [completed, setCompleted] = useState([]);
  const [unlockedList, setUnlockedList] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem("javascriptpath_completed_levels");
        const parsed = raw ? JSON.parse(raw) : [];

        const rawUnlocked = localStorage.getItem(
          "javascriptpath_unlocked_levels"
        );
        const unlocked = rawUnlocked ? JSON.parse(rawUnlocked) : [];

        // backfill: mark iniciante completed if heat/gems meet simple threshold
        try {
          const heat = parseInt(
            localStorage.getItem("javascriptpath_heat") || "0",
            10
          );
          const gems = parseInt(
            localStorage.getItem("javascriptpath_gems") || "0",
            10
          );
          const inic = niveisData.iniciante;
          const totalGems = inic.gemsTotal ?? inic.gems ?? 0;
          const totalQs = inic.perguntas?.length ?? inic.questoes ?? 0;
          const heatThreshold = Math.round(totalQs * 10 * 0.5);
          const gemsThreshold = Math.round(totalGems * 0.5);
          if (
            !parsed.includes("iniciante") &&
            (heat >= heatThreshold || gems >= gemsThreshold)
          ) {
            parsed.push("iniciante");
            localStorage.setItem(
              "javascriptpath_completed_levels",
              JSON.stringify(parsed)
            );
            try {
              window.dispatchEvent(
                new CustomEvent("javascriptpath:levelsChanged", {})
              );
            } catch (e) {}
          }
        } catch (e) {
          /* ignore */
        }

        // ensure first level unlocked
        try {
          if (!Array.isArray(unlocked) || unlocked.length === 0) {
            const first = niveisData.iniciante?.slug || "iniciante";
            localStorage.setItem(
              "javascriptpath_unlocked_levels",
              JSON.stringify([first])
            );
            unlocked.length = 0;
            unlocked.push(first);
          }
        } catch (e) {}

        setCompleted(parsed);
        setUnlockedList(unlocked);
      } catch (e) {
        setCompleted([]);
        setUnlockedList([]);
      }
    };

    load();
    const onLevelsChanged = () => load();
    if (typeof window !== "undefined")
      window.addEventListener("javascriptpath:levelsChanged", onLevelsChanged);
    return () => {
      if (typeof window !== "undefined")
        window.removeEventListener(
          "javascriptpath:levelsChanged",
          onLevelsChanged
        );
    };
  }, []);

  const t = translations[lang] || translations["pt-BR"];

  const orderedLevels = Object.values(niveisData).sort((a, b) => a.id - b.id);
  const allLevels = orderedLevels.map((lvl, idx) => {
    const slug = lvl.slug;
    const isCompleted = completed.includes(slug);
    const prev = orderedLevels[idx - 1];
    const prevCompleted = prev ? completed.includes(prev.slug) : false;
    const isUnlocked =
      unlockedList.includes(slug) || prevCompleted || lvl.id === 1;
    let status = "bloqueado";
    if (isCompleted) status = "concluido";
    else if (isUnlocked) status = "disponivel";
    return {
      id: lvl.id,
      slug,
      titulo: lvl.titulo,
      questoes: lvl.perguntas?.length ?? lvl.questoes,
      gems: lvl.gemsTotal ?? lvl.gems,
      descricao: lvl.descricao || "",
      status,
    };
  });

  return (
    <div className={styles.page}>
      <HeroHome />
      <section className={styles.niveisSection}>
        <div className={styles.container}>
          <div className={styles.indicador}>
            <span className={styles.indicadorText}>
              {t.indicator || "Você está aqui"}
            </span>
          </div>
          <div className={styles.niveisGrid}>
            {allLevels.map((nivel) => (
              <CardNivel
                key={nivel.slug}
                nivel={nivel.titulo}
                slug={nivel.slug}
                titulo={nivel.titulo}
                questoes={nivel.questoes}
                gems={nivel.gems}
                status={nivel.status}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
