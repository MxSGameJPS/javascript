"use client";
import styles from "./LandingHero.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLang } from "../../i18n/useLang";
import translations from "../../i18n/translations";

export default function LandingHero() {
  const router = useRouter();
  const [lang] = useLang();
  const t = translations[lang] || translations["pt-BR"];
  const titleLines = (t.heroTitle || "").split("\n");
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image
            src="/next.svg"
            alt="logo"
            width={320}
            height={320}
            className={styles.logoImage}
          />
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>
            {titleLines.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className={styles.subtitle}>{t.heroSubtitle}</p>
          <div className={styles.actions}>
            <button
              className={styles.primary}
              onClick={() => router.push("/inicio")}
            >
              {t.heroCTAPrimary || "Comece agora"}
            </button>
            <button
              className={styles.secondary}
              onClick={() => router.push("/entrar")}
            >
              {t.heroCTASecondary || "Já tenho uma conta"}
            </button>
          </div>
          <p className={styles.note}>{t.heroNote}</p>
        </div>
      </div>
    </section>
  );
}
