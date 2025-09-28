"use client";
import styles from "./LandingHero.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingHero() {
  const router = useRouter();
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
            O jeito grátis, divertido e eficaz de aprender Next.Js!
          </h1>
          <p className={styles.subtitle}>
            Domine os conceitos de Next através de quizzes interativos e
            desafios práticos.
          </p>
          <div className={styles.actions}>
            <button
              className={styles.primary}
              onClick={() => router.push("/inicio")}
            >
              Comece agora
            </button>
            <button
              className={styles.secondary}
              onClick={() => router.push("/entrar")}
            >
              Já tenho uma conta
            </button>
          </div>
          <p className={styles.note}>
            Aprenda Next do básico ao avançado com exercícios práticos, sistema
            de níveis e acompanhamento de progresso.
          </p>
        </div>
      </div>
    </section>
  );
}
