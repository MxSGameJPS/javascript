"use client";
import { useEffect, useState } from "react";
import styles from "./CardNivel.module.css";
import translations from "../../i18n/translations";

const LANG_KEY = "nextpath_lang";

const CardNivel = ({
  nivel,
  slug,
  titulo,
  questoes,
  gems,
  status = "bloqueado", // 'disponivel', 'concluido', 'bloqueado'
  onClick,
}) => {
  const [lang, setLang] = useState("pt-BR");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : null;
    if (stored) setLang(stored);

    function onLangChange(e) {
      const newLang =
        e?.detail?.lang ||
        (typeof window !== "undefined" && localStorage.getItem(LANG_KEY));
      if (newLang) setLang(newLang);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("nextpath:langChanged", onLangChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("nextpath:langChanged", onLangChange);
      }
    };
  }, []);

  const t = translations[lang] || translations["pt-BR"];

  const getStatusText = () => {
    switch (status) {
      case "concluido":
        return t.statusConcluido || "Concluído";
      case "disponivel":
        return t.statusDisponivel || "Não concluído";
      case "bloqueado":
      default:
        return t.statusBloqueado || "Bloqueado";
    }
  };

  const getButtonText = () => {
    switch (status) {
      case "concluido":
        return t.buttonPraticar || "Praticar";
      case "disponivel":
        return t.buttonPraticar || "Praticar";
      case "bloqueado":
      default:
        return t.buttonBloqueado || "Bloqueado";
    }
  };

  const getIcon = () => {
    switch (nivel) {
      case "Iniciante":
        return "🤖";
      case "Intermediário":
        return "🤖";
      case "Avançado":
        return "🤖";
      case "Especialista":
        return "🤖";
      default:
        return "🤖";
    }
  };

  const displayTitle =
    slug && t.levels && t.levels[slug] ? t.levels[slug] : titulo;

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>{getIcon()}</span>
      </div>

      <h3 className={styles.titulo}>{displayTitle}</h3>

      <p className={styles.questoes}>{questoes} questões</p>

      <div className={styles.statusContainer}>
        <span className={styles.status}>{getStatusText()}</span>
      </div>

      <div className={styles.rewardContainer}>
        <span className={styles.gem}>💎</span>
        <span className={styles.gemValue}>{gems}</span>
      </div>

      <button
        className={styles.button}
        onClick={onClick}
        disabled={status === "bloqueado"}
      >
        {status === "disponivel" && <span className={styles.playIcon}>▶</span>}
        {getButtonText()}
      </button>
    </div>
  );
};

export default CardNivel;
