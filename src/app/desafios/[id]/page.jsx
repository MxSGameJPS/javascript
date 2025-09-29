"use client";
import React, { useState } from "react";
import styles from "./desafio.module.css";
import desafiosJson from "../../../../public/Json/desafios.json";

function extractCodeFromResposta(text) {
  if (!text) return "";
  const match = text.match(/```(?:[a-zA-Z]+\n)?([\s\S]*?)```/);
  if (match) return match[1].trim();
  return text.trim();
}

function normalizeForCompare(s) {
  return (s || "").replace(/\s+/g, " ").trim().toLowerCase();
}

export default function DesafioPage({ params }) {
  const { id } = params || {};
  if (!id) return <main className={styles.page}>Desafio inválido</main>;
  const [nivel, idx] = id.split("-");
  const item = desafiosJson[nivel] && desafiosJson[nivel][Number(idx)];
  if (!item)
    return (
      <main className={styles.page}>
        <p>Desafio não encontrado</p>
      </main>
    );

  const expectedRaw = extractCodeFromResposta(item.Resposta);

  const [showDica, setShowDica] = useState(false);
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null); // { ok: boolean, message }

  function evaluateSubmission() {
    const normUser = normalizeForCompare(code);
    const normExpected = normalizeForCompare(expectedRaw);

    // Strategy: if expected has meaningful content, check that most keywords appear in user code
    if (!normExpected) {
      setResult({
        ok: false,
        message: "Nenhuma resposta de referência disponível para avaliação.",
      });
      return;
    }

    // Extract tokens (words >= 3 chars) from expected
    const tokens = Array.from(
      new Set(normExpected.match(/\b[a-z0-9_]{3,}\b/g) || [])
    );
    // pick up to 6 tokens
    const important = tokens.slice(0, 6);
    let hits = 0;
    important.forEach((t) => {
      if (normUser.includes(t)) hits++;
    });

    const pass =
      important.length === 0 ? false : hits / important.length >= 0.6; // 60% tokens

    if (pass) {
      setResult({ ok: true, message: "Parabéns — parece correto!" });
    } else {
      setResult({
        ok: false,
        message: "Parece incorreto. Revise a resposta sugerida abaixo.",
      });
    }
  }

  const router = require("next/navigation").useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.topRow}>
        <button
          type="button"
          className={styles.backToList}
          onClick={() => router.push("/desafios")}
        >
          ← Voltar aos desafios
        </button>
      </div>

      <h1 className={styles.title}>Desafio {nivel}</h1>

      <h2 className={styles.desafioTitulo}>{item.Desafio}</h2>

      <div className={styles.dicaWrapper}>
        <button
          type="button"
          className={styles.hintToggle}
          onClick={() => setShowDica((v) => !v)}
        >
          Dica
        </button>
        {showDica && <div className={styles.dica}>{item.Dica}</div>}
      </div>

      <div className={styles.ideWrapper}>
        <label className={styles.label}>Sua solução</label>
        <textarea
          className={styles.ide}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Digite seu código aqui..."
          spellCheck={false}
        />
        <div className={styles.actions}>
          <button className={styles.submitBtn} onClick={evaluateSubmission}>
            Enviar
          </button>
          <button
            className={styles.clearBtn}
            onClick={() => {
              setCode("");
              setResult(null);
            }}
          >
            Limpar
          </button>
        </div>
        {result && (
          <div
            className={result.ok ? styles.resultOk : styles.resultErr}
            role="status"
          >
            {result.message}
          </div>
        )}
      </div>

      {result && (
        <div className={styles.reference}>
          <h3>Resposta de referência</h3>
          <pre className={styles.resposta}>{item.Resposta}</pre>
        </div>
      )}
    </main>
  );
}
