"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import translations from "../../i18n/translations";
import { useLang } from "../../i18n/useLang";

const Header = ({ userStats = { streak: 0, gems: 0 } }) => {
  const [lang] = useLang();
  const [heat, setHeat] = useState(userStats.streak || 0);
  const [gems, setGems] = useState(userStats.gems || 0);

  // useLang hook já sincroniza o idioma com localStorage e eventos globais.

  useEffect(() => {
    if (typeof window === "undefined") return;
    const heatKey = "nextpath_heat";
    const gemsKey = "nextpath_gems";
    const storedHeat = parseInt(localStorage.getItem(heatKey) || "0", 10);
    const storedGems = parseInt(localStorage.getItem(gemsKey) || "0", 10);
    setHeat(storedHeat);
    setGems(storedGems);
    function onStatsChange(e) {
      const newHeat = e?.detail?.heat ?? storedHeat;
      const newGems = e?.detail?.gems ?? storedGems;
      setHeat(newHeat);
      setGems(newGems);
    }
    window.addEventListener("nextpath:statsChanged", onStatsChange);
    return () =>
      window.removeEventListener("nextpath:statsChanged", onStatsChange);
  }, []);

  // lang is handled by useLang hook which listens/updates globally

  const t = translations[lang] || translations["pt-BR"];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1 className={styles.brandName}>
            <span className={styles.brandGradient}>JavaScriptPath</span>
          </h1>
        </div>

        {/* <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="#" className={styles.navLink}>
                {t.cursos}
              </a>
            </li>
            <li>
              <a href="/progresso" className={styles.navLink}>
                {t.progresso}
              </a>
            </li>
            <li>
              <a href="#" className={styles.navLink}>
                {t.perfil}
              </a>
            </li>
          </ul>
        </nav> */}

        <div className={styles.userSection}>
          <div className={styles.streak} title="Pontos de calor">
            <span className={styles.fire}>🔥</span>
            <span className={styles.streakNumber}>{heat}</span>
          </div>
          <div className={styles.gems} title="Joias">
            <span className={styles.gem}>💎</span>
            <span className={styles.gemNumber}>{gems}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
