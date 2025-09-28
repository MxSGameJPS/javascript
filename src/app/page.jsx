"use client";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingHero from "../components/Landing/LandingHero";
import LandingFooter from "../components/Landing/LandingFooter";
import styles from "./page.module.css";

export default function Landing() {
  return (
    <div className={styles.page}>
      <LandingHeader />
      <LandingHero />
      <LandingFooter />
    </div>
  );
}
