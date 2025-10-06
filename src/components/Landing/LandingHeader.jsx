"use client";
import Image from "next/image";
import styles from "./LandingHeader.module.css";
import { useLang } from "../../i18n/useLang";

export default function LandingHeader() {
  const [lang, setLang] = useLang();

  const changeLang = (e) => {
    const v = e.target.value;
    if (typeof window !== "undefined") {
      localStorage.setItem("nextpath_lang", v);
      document.documentElement.lang = v;
      try {
        window.dispatchEvent(
          new CustomEvent("nextpath:langChanged", { detail: { lang: v } })
        );
      } catch (err) {}
      setLang(v);
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
            value={lang}
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
