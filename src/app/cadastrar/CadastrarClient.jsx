"use client";
import React, { useEffect, useState } from "react";
import styles from "./auth.module.css";
import { useSearchParams, useRouter } from "next/navigation";

export default function CadastrarClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showCelebration = searchParams.get("celebration") === "1";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedWhatsapp, setAcceptedWhatsapp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(showCelebration);

  function validatePassword(p) {
    if (p.length < 6) return "Senha deve ter ao menos 6 caracteres";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(p))
      return "Senha precisa de um caractere especial";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const passErr = validatePassword(password);
    if (passErr) return setError(passErr);
    if (!acceptedTerms) return setError("Você deve aceitar os termos");

    setLoading(true);
    const heat = Number(localStorage.getItem("nextpath_heat") || "0");
    const gems = Number(localStorage.getItem("nextpath_gems") || "0");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        whatsapp,
        accepted_terms: acceptedTerms,
        accepted_whatsapp: acceptedWhatsapp,
        heat,
        gems,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || "Erro");
    else {
      // Salva nome do usuário no localStorage para uso no footer
      if (data.user && data.user.name) {
        localStorage.setItem("nextpath_user_name", data.user.name);
      }
      router.push("/progresso");
    }
  }

  return (
    <div className={styles.authPage}>
      {showPopup && (
        <div className={styles.popupOverlay} role="dialog" aria-modal="true">
          <div className={styles.popup}>
            <h3>Parabéns!</h3>
            <p>
              Você passou por todas as etapas — agora se cadastre para aprender
              Next.js com desafios e exercícios.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button
                onClick={() => {
                  setShowPopup(false);
                  // remove query param from URL
                  router.push("/cadastrar");
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Cadastrar</h2>
        {error && <div className={styles.error}>{error}</div>}
        <label>
          Nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Whatsapp
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
        </label>

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
          />{" "}
          Aceito os <a href="/termos">termos de uso</a>
        </label>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={acceptedWhatsapp}
            onChange={(e) => setAcceptedWhatsapp(e.target.checked)}
          />{" "}
          Aceito receber novidades pelo Whatsapp
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Criar conta"}
        </button>
      </form>
    </div>
  );
}
