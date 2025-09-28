"use client";
import { useState } from "react";
import styles from "./auth.module.css";

export default function Cadastrar() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedWhatsapp, setAcceptedWhatsapp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || "Erro");
    else {
      alert("Conta criada: " + data.user.email);
    }
  }

  return (
    <div className={styles.authPage}>
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
