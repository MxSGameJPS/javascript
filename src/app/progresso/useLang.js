import { useEffect, useState } from "react";

export default function useLang() {
  const [lang, setLang] = useState("pt-BR");
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("javascriptpath_lang")
        : null;
    if (stored) setLang(stored);
    function onLangChange(e) {
      const newLang =
        e?.detail?.lang ||
        (typeof window !== "undefined" &&
          localStorage.getItem("javascriptpath_lang"));
      if (newLang) setLang(newLang);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("javascriptpath:langChanged", onLangChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("javascriptpath:langChanged", onLangChange);
      }
    };
  }, []);
  return lang;
}
