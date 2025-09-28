"use client";
import { useEffect, useState } from "react";
import HeroHome from "../../components/HeroHome/HeroHome";
import CardNivel from "../../components/CardNivel/CardNivel";
import translations from "../../i18n/translations";
import styles from "../page.module.css";

export default function Inicio() {
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

  const t = translations[lang] || translations["pt-BR"];

  const niveisData = [
    {
      id: 1,
      slug: "iniciante",
      titulo: "Iniciante",
      questoes: 15,
      gems: 150,
      status: "disponivel",
    },
    {
      id: 2,
      slug: "intermediario",
      titulo: "Intermediário",
      questoes: 15,
      gems: 150,
      status: "bloqueado",
    },
    {
      id: 3,
      slug: "avancado",
      titulo: "Avançado",
      questoes: 20,
      gems: 200,
      status: "bloqueado",
    },
    {
      id: 4,
      slug: "especialista",
      titulo: "Especialista",
      questoes: 25,
      gems: 300,
      status: "bloqueado",
    },
  ];

  const handleCardClick = (nivel) => {
    if (nivel.status !== "bloqueado") {
      console.log(`Iniciando nível: ${nivel.titulo}`);
    }
  };

  return (
    <div className={styles.page}>
      <HeroHome />
      <section className={styles.niveisSection}>
        <div className={styles.container}>
          <div className={styles.indicador}>
            <span className={styles.indicadorText}>
              {t.indicator || "Você está aqui"}
            </span>
          </div>
          <div className={styles.niveisGrid}>
            {niveisData.map((nivel) => (
              <CardNivel
                key={nivel.id}
                nivel={nivel.titulo}
                slug={nivel.slug}
                titulo={nivel.titulo}
                questoes={nivel.questoes}
                gems={nivel.gems}
                status={nivel.status}
                onClick={() => handleCardClick(nivel)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
