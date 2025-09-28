"use client";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./LayoutWrapper.module.css";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Don't render header/footer on the root landing page
  const isHome = pathname === "/" || pathname === "" || pathname === undefined;

  return (
    <div className={styles.root}>
      {!isHome && <Header />}
      <main className={styles.main}>{children}</main>
      {!isHome && <Footer />}
    </div>
  );
}
