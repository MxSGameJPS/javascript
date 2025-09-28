"use client";
import styles from "./Quiz.module.css";

export default function QuizFooter({ onSkip, onVerify, canVerify, life }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <button className={styles.skipBtn} onClick={onSkip}>
          Pular
        </button>
      </div>

      <div className={styles.center}></div>

      <div className={styles.right}>
        <div className={styles.life}>❤️ {life}</div>
        <button
          className={styles.verifyBtn}
          onClick={onVerify}
          disabled={!canVerify}
        >
          Verificar
        </button>
      </div>
    </footer>
  );
}
