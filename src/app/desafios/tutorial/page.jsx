import React from "react";
import Link from "next/link";
import styles from "./tutorial.module.css";
import desafiosJson from "../../../../public/Json/desafios.json";

export default function TutorialPage() {
  // pegar o primeiro desafio do nível iniciante como exemplo
  const primeiro =
    (desafiosJson.iniciante && desafiosJson.iniciante[0]) || null;

  return (
    <main className={styles.page}>
      <div className={styles.topRow}>
        <Link href="/desafios" className={styles.backLink}>
          &larr; Voltar aos Desafios
        </Link>
      </div>
      <h1 className={styles.title}>Tutorial: Como resolver um desafio</h1>

      <section className={styles.intro}>
        <p>
          Nesta página vamos explicar, passo a passo, como abordar e resolver os
          desafios. Usaremos como exemplo o primeiro desafio do nível
          "iniciante" para mostrar um fluxo prático.
        </p>
      </section>

      {primeiro ? (
        <section className={styles.example}>
          <h2 className={styles.exampleTitle}>Exemplo prático</h2>

          <h3 className={styles.challengeTitle}>Desafio</h3>
          <div className={styles.challengeText}>{primeiro.Desafio}</div>

          <h3 className={styles.stepTitle}>1) Leia com atenção</h3>
          <p>
            Note o que o enunciado pede: neste exemplo, você precisa criar uma
            página na rota <code>/sobre</code> que exiba um{" "}
            <code>&lt;h1&gt;</code> com o texto "Página Sobre Nós".
          </p>

          <h3 className={styles.stepTitle}>2) Planeje a solução</h3>
          <p>
            No App Router do Next.js, páginas são arquivos dentro da pasta
            <code>app</code>. Então a solução será criar um arquivo
            <code>app/sobre/page.js</code> (ou .jsx) que exporte o componente
            que retorna o <code>&lt;h1&gt;</code> com o texto desejado.
          </p>

          <h3 className={styles.stepTitle}>3) Escreva o código</h3>
          <pre className={styles.codeBlock}>
            {`// app/sobre/page.jsx
export default function SobrePage() {
  return <h1>Página Sobre Nós</h1>;
}`}
          </pre>

          

          <h3 className={styles.stepTitle}>Dica extra</h3>
          <div className={styles.hintBox}>{primeiro.Dica}</div>

          <div className={styles.actions}>
            <Link href="/desafios/iniciante-0" className={styles.goToChallenge}>
              Ir para o desafio (tentar agora)
            </Link>
          </div>
        </section>
      ) : (
        <p>Não foi possível carregar o exemplo do JSON.</p>
      )}
    </main>
  );
}
