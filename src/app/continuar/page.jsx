"use client";
import React from "react";
import styles from "./continuar.module.css";
import CardNivel from "../../components/CardNivel/CardNivel";
import perguntas from "../../../public/Json/perguntas.json";

const niveis = [
  { slug: "iniciante", titulo: "Iniciante" },
  { slug: "intermediario", titulo: "Intermediário" },
  { slug: "avancado", titulo: "Avançado" },
  { slug: "especialista", titulo: "Especialista" },
];

export default function ContinuarPage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Continuar Estudos</h2>
      <button
        className={styles.backBtn}
        type="button"
        onClick={() => (window.location.href = "/progresso")}
        style={{
          marginBottom: "1.5rem",
          background: "#eee",
          color: "#222",
          border: "none",
          borderRadius: "6px",
          padding: "0.7rem 1.5rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
      <section className={styles.niveisSection}>
        <div className={styles.container}>
          <div className={styles.niveisGrid}>
            {niveis.map((nivel) => (
              <CardNivel
                key={nivel.slug}
                nivel={nivel.titulo}
                slug={nivel.slug}
                titulo={nivel.titulo}
                questoes={perguntas[nivel.slug]?.length || 0}
                gems={perguntas[nivel.slug]?.length * 10 || 0}
                status="disponivel"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
