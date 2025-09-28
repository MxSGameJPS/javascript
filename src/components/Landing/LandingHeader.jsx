"use client";
import Image from "next/image";
import styles from "./LandingHeader.module.css";

const LANG_KEY = "nextpath_lang";

export default function LandingHeader() {
  const changeLang = (e) => {
    const v = e.target.value;
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, v);
      document.documentElement.lang = v;
      try {
        window.dispatchEvent(
          new CustomEvent("nextpath:langChanged", { detail: { lang: v } })
        );
      } catch (e) {}
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Image
            src="/logos/LogoIcone.png"
            alt="NextPath"
            width={40}
            height={40}
          />
          <h1 className={styles.brandName}>
            <span className={styles.next}>Next</span>
            <span className={styles.path}>Path</span>
          </h1>
        </div>
        <div className={styles.langWrap}>
          <label className={styles.langLabel}>IDIOMA:</label>
          <select
            aria-label="Idioma"
            defaultValue={
              typeof window !== "undefined"
                ? localStorage.getItem(LANG_KEY) || "pt-BR"
                : "pt-BR"
            }
            onChange={changeLang}
            className={styles.langSelect}
          >
            <option value="pt-BR">BR Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
    </header>
  );
}
