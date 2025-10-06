"use client";
import Image from "next/image";
import styles from "./Quiz.module.css";

export default function QuizHeader({
  levelTitle,
  levelNumber,
  streak = 0,
  gems = 0,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.brand}>NextPath</div>
      </div>

      <div className={styles.center}></div>

      <div className={styles.right}>
        <div className={styles.nextLogo}>
          <Image src="/next.svg" alt="next" width={80} height={40} />
        </div>
        <div className={styles.levelInfo}>
          <span className={styles.level}>Nível {levelNumber}</span>
          <span className={styles.streak}>🔥 {streak}</span>
          <span className={styles.gems}>💎 {gems}</span>
        </div>
      </div>
    </header>
  );
}
