import { useEffect, useState } from "react";

const LANG_KEY = "javascriptpath_lang";

export function useLang() {
  const [lang, setLang] = useState("pt-BR");

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(LANG_KEY) : null;
    if (stored) setLang(stored);

    const onLangChange = (e) => {
      const newLang =
        e?.detail?.lang ||
        (typeof window !== "undefined" && localStorage.getItem(LANG_KEY));
      if (newLang) setLang(newLang);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("javascriptpath:langChanged", onLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("javascriptpath:langChanged", onLangChange);
      }
    };
  }, []);

  // Atualiza o atributo lang do <html>
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return [lang, setLang];
}
