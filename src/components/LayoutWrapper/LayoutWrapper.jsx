"use client";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./LayoutWrapper.module.css";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Don't render header/footer on the root landing page
  const isHome = pathname === "/" || pathname === "" || pathname === undefined;
  // also avoid rendering global header/footer on quiz routes which have their own
  // header/footer (pages under /nivel)
  const isQuizRoute =
    typeof pathname === "string" && pathname.startsWith("/nivel");

  return (
    <div className={styles.root}>
      {!isHome && !isQuizRoute && <Header />}
      <main className={styles.main}>{children}</main>
      {!isHome && !isQuizRoute && <Footer />}
    </div>
  );
}
