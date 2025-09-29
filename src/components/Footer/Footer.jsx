"use client";
import { useEffect, useState, useRef } from "react";
import styles from "./Footer.module.css";
import translations from "../../i18n/translations";

const LANG_KEY = "nextpath_lang";

export default function Footer() {
  const [lang, setLang] = useState("pt-BR");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectLang = (newLang) => {
    setLang(newLang);
    setOpen(false);
  };

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : null;
    if (stored) {
      setLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_KEY, lang);
      document.documentElement.lang = lang;
      // dispatch event so other components can react to language change
      try {
        window.dispatchEvent(
          new CustomEvent("nextpath:langChanged", { detail: { lang } })
        );
      } catch (e) {
        // fallback no-op if CustomEvent is not supported
      }
    }
  }, [lang]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("click", handleClickOutside);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleClickOutside);
      }
    };
  }, [wrapperRef]);

  const t = translations[lang] || translations["pt-BR"];

  // Lê nome do usuário logado do localStorage
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserName(localStorage.getItem("nextpath_user_name"));
      // Atualiza ao receber evento de login/cadastro
      const handler = () =>
        setUserName(localStorage.getItem("nextpath_user_name"));
      window.addEventListener("nextpath:userChanged", handler);
      return () => window.removeEventListener("nextpath:userChanged", handler);
    }
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.credit}>developed by</span>
          <a
            className={styles.creditLink}
            href="https://www.linkedin.com/in/saulopavanello"
            target="_blank"
            rel="noreferrer"
          >
            @saulopavanello
          </a>
        </div>

        <div className={styles.loginLinks}>
          {userName ? (
            <span
              className={styles.userName}
              style={{ fontWeight: 600, color: "#fff" }}
            >
              Olá, {userName}!
            </span>
          ) : (
            <>
              <a href="/entrar" className={styles.enterLink}>
                {t.entrar}
              </a>
              <span style={{ color: "rgba(255,255,255,0.35)" }}>|</span>
              <a href="/cadastrar" className={styles.signupLink}>
                {t.cadastrar}
              </a>
            </>
          )}
        </div>

        <div className={styles.links}>
          <label htmlFor="lang" style={{ fontWeight: 600 }}>
            {t.idioma}:
          </label>

          <div className={styles.customSelect} ref={wrapperRef}>
            <button
              type="button"
              className={styles.customSelectButton}
              onClick={() => setOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              {lang === "pt-BR"
                ? "Português"
                : lang === "en"
                ? "English"
                : "Español"}
            </button>

            {open && (
              <ul className={styles.customOptions} role="listbox">
                <li
                  role="option"
                  tabIndex={0}
                  className={styles.customOption}
                  onClick={() => selectLang("pt-BR")}
                >
                  Português
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  className={styles.customOption}
                  onClick={() => selectLang("en")}
                >
                  English
                </li>
                <li
                  role="option"
                  tabIndex={0}
                  className={styles.customOption}
                  onClick={() => selectLang("es")}
                >
                  Español
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
