"use client";
import styles from "./Quiz.module.css";

export default function QuizQuestion({ perguntaObj, selected, onSelect }) {
  return (
    <div className={styles.questionWrap}>
      <h2 className={styles.question}>{perguntaObj.pergunta}</h2>

      <div className={styles.options}>
        {perguntaObj.alternativas.map((alt, idx) => {
          const isSelected = selected === idx;
          return (
            <button
              key={idx}
              className={`${styles.option} ${
                isSelected ? styles.selected : ""
              }`}
              onClick={() => onSelect(idx)}
            >
              {alt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
