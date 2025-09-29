"use client";
import useLang from "./useLang";
import translations from "../../i18n/translations";
import styles from "./progresso.module.css";

export default function RankingTitle() {
  const lang = useLang();
  const t = translations[lang] || translations["pt-BR"];
  // fallback para o texto padrão se não existir
  return (
    <h1 className={styles.title}>
      {t.rankingTitulo || "Ranking dos 10 primeiros colocados"}
    </h1>
  );
}
