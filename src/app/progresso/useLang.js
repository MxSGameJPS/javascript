import { useEffect, useState } from "react";

export default function useLang() {
  const [lang, setLang] = useState("pt-BR");
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem("nextpath_lang")
        : null;
    if (stored) setLang(stored);
    function onLangChange(e) {
      const newLang =
        e?.detail?.lang ||
        (typeof window !== "undefined" &&
          localStorage.getItem("nextpath_lang"));
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
  return lang;
}
