"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./relatorio.module.css";
import perguntas from "../../../public/Json/perguntas.json";

export default function RelatorioPage() {
  const router = useRouter();
  const [respostas, setRespostas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula fetch das respostas do usuário (deveria vir do backend futuramente)
    const raw = localStorage.getItem("javascriptpath_respostas");
    const data = raw ? JSON.parse(raw) : [];
    setRespostas(data);
    setLoading(false);
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  // Monta relatório agrupando por nível
  const niveis = ["iniciante", "intermediario", "avancado", "especialista"];
  return (
    <div className={styles.page}>
      <div className={styles.topActions}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => router.push("/progresso")}
        >
          ← Voltar
        </button>
      </div>
      <h2 className={styles.title}>Relatório de Desempenho</h2>
      {niveis.map((nivel) => {
        const perguntasNivel = perguntas[nivel] || [];
        const respostasNivel = respostas.filter((r) => r.nivel === nivel);
        if (perguntasNivel.length === 0) return null;
        return (
          <section key={nivel} className={styles.nivelSection}>
            <h3 className={styles.nivelTitle}>
              {nivel.charAt(0).toUpperCase() + nivel.slice(1)}
            </h3>
            <ul className={styles.perguntasList}>
              {perguntasNivel.map((pergunta) => {
                const respostaUser = respostasNivel.find(
                  (r) => r.id === pergunta.id
                );
                const acertou = respostaUser?.correta === true;
                const respostaCorreta = pergunta.opcoes.find(
                  (o) => o.correta
                )?.texto;
                return (
                  <li
                    key={pergunta.id}
                    className={acertou ? styles.acerto : styles.erro}
                  >
                    <div className={styles.pergunta}>{pergunta.pergunta}</div>
                    <div className={styles.respostaUser}>
                      Sua resposta:{" "}
                      {respostaUser ? (
                        respostaUser.resposta
                      ) : (
                        <em>Não respondida</em>
                      )}
                    </div>
                    {acertou ? (
                      <div className={styles.correta}>✔ Acertou!</div>
                    ) : (
                      <div className={styles.feedbackErro}>
                        <div>❌ Errou</div>
                        <div>
                          <strong>Correta:</strong> {respostaCorreta}
                        </div>
                        <div className={styles.explicacao}>
                          <strong>Por quê?</strong> {pergunta.explicacao}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
