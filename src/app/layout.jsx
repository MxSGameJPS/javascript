import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper/LayoutWrapper";
import SupportCard from "../components/SupportCard/SupportCard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "JavaScriptPath - Aprenda JavaScript de forma divertida",
  description:
    "Plataforma gamificada para aprender JavaScript inspirada no Duolingo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LayoutWrapper>{children}</LayoutWrapper>
        <SupportCard />
      </body>
    </html>
  );
}
