"use client";
import { useEffect, useState } from "react";
import styles from "./CardNivel.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import translations from "../../i18n/translations";
import { useLang } from "../../i18n/useLang";

const CardNivel = ({
  nivel,
  slug,
  titulo,
  questoes,
  gems,
  status = "bloqueado", // 'disponivel', 'concluido', 'bloqueado'
  onClick,
}) => {
  const router = useRouter();
  const [lang] = useLang();
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

      {status === "bloqueado" ? (
        <button className={styles.button} disabled>
          {getButtonText()}
        </button>
      ) : typeof onClick === "function" ? (
        <button
          className={styles.button}
          onClick={() => {
            onClick();
          }}
        >
          {status === "disponivel" && (
            <span className={styles.playIcon}>▶</span>
          )}
          {getButtonText()}
        </button>
      ) : slug ? (
        <Link href={`/nivel/${slug}`} className={styles.linkButton}>
          <span className={styles.playIcon}>
            {status === "disponivel" ? "▶" : ""}
          </span>
          {getButtonText()}
        </Link>
      ) : (
        <button className={styles.button}>{getButtonText()}</button>
      )}
    </div>
  );
};

export default CardNivel;
