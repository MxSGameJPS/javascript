"use client";
import React from "react";
import styles from "./progresso.module.css";
import translations from "../../i18n/translations";
import useLang from "./useLang";

export default function RankingTable({ ranking }) {
  const [userName, setUserName] = React.useState("");
  const lang = useLang();
  const t = translations[lang] || translations["pt-BR"];
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setUserName(localStorage.getItem("nextpath_user_name") || "");
    }
  }, []);
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>{t.posicao || "Posição"}</th>
            <th className={styles.th}>{t.usuario || "Usuário"}</th>
            <th className={styles.th}>{t.gemas || "Gemas"}</th>
          </tr>
        </thead>
        <tbody>
          {ranking.length === 0 && (
            <tr>
              <td className={styles.empty} colSpan={3}>
                {t.nenhumDado || "Nenhum dado encontrado."}
              </td>
            </tr>
          )}
          {ranking.map((user, idx) => (
            <tr className={styles.tr} key={user.id}>
              <td className={styles.td}>{idx + 1}</td>
              <td
                className={
                  user.name === userName
                    ? `${styles.td} ${styles.userHighlight}`
                    : styles.td
                }
              >
                {user.name}
              </td>
              <td className={styles.td}>{user.gems}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
