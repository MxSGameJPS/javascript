"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import translations from "../../i18n/translations";

const LANG_KEY = "nextpath_lang";

const Header = ({ userStats = { streak: 0, gems: 0 } }) => {
  const [lang, setLang] = useState("pt-BR");
  const [heat, setHeat] = useState(userStats.streak || 0);
  const [gems, setGems] = useState(userStats.gems || 0);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : null;
    if (stored) setLang(stored);
  }, []);

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

  useEffect(() => {
    // listen for global lang change dispatched by Footer
    function onLangChange(e) {
      const newLang =
        e?.detail?.lang ||
        (typeof window !== "undefined" && localStorage.getItem(LANG_KEY));
      if (newLang) setLang(newLang);
    }

    if (typeof window !== "undefined") {
      window.addEventListener("nextpath:langChanged", onLangChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("nextpath:langChanged", onLangChange);
      }
    };
  }, []);

  const t = translations[lang] || translations["pt-BR"];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src="/logos/LogoIcone.png"
            alt="NextPath Logo"
            width={40}
            height={40}
            className={styles.logoImage}
          />
          <h1 className={styles.brandName}>
            <span className={styles.next}>Next</span>
            <span className={styles.path}>Path</span>
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
