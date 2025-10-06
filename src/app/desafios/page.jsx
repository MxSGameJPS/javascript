import React from "react";
import Link from "next/link";
import styles from "./desafios.module.css";
import desafiosJson from "../../../public/Json/desafios.json";

export default function DesafiosPage() {
  // O JSON tem chaves por nível, cada uma é um array de objetos
  const niveis = Object.keys(desafiosJson);
  const cards = [];
  niveis.forEach((nivel) => {
    desafiosJson[nivel].forEach((item, idx) => {
      cards.push({ id: `${nivel}-${idx}`, nivel, titulo: item.Desafio });
    });
  });

  return (
    <main className={styles.page}>
      <div style={{ marginBottom: "1rem" }}>
        <Link href="/progresso" className={styles.backBtn}>
          ← Voltar
        </Link>
      </div>
      <h1 className={styles.title}>Desafios</h1>
      <Link href="/desafios/tutorial" className={styles.tutorialButton}>
        Veja o Tutorial
      </Link>
      <div className={styles.grid}>
        {cards.map((c) => (
          <article key={c.id} className={styles.card}>
            <div className={styles.cardNivel}>{c.nivel}</div>
            <div className={styles.cardTitulo}>{c.titulo}</div>
            <Link href={`/desafios/${c.id}`} className={styles.cardButton}>
              Ver Desafio
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
