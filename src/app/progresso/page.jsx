import React from "react";
import { getTopUsersByGemas } from "../../data/ranking";
import styles from "./progresso.module.css";
import RankingTable from "./RankingTable";
import RankingTitle from "./RankingTitle";

export default async function ProgressoPage() {
  const ranking = await getTopUsersByGemas(10);

  return (
    <main className={styles.container}>
      <div className={styles.splitWrapper}>
        <section className={styles.leftCol}>
          <RankingTitle />
          <RankingTable ranking={ranking} />
        </section>
        <aside className={styles.rightCol}>
          <div className={styles.actionsBox}>
            <a
              href="/progresso/perfil"
              className={styles.actionBtn}
              style={{ textAlign: "center", textDecoration: "none" }}
            >
              Meu Perfil
            </a>
            <button className={styles.actionBtn}>Praticar</button>
            <button className={styles.actionBtn}>Continuar estudo</button>
            <button className={styles.actionBtn}>Ver Relatório</button>
            <button className={styles.actionBtn}>Baixar Certificado</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
