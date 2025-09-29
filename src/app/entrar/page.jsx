"use client";
import { useState } from "react";
import styles from "./auth.module.css";

export default function Entrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || "Erro");
    else {
      // Salva nome, id e email do usuário no localStorage para uso global
      if (data.user) {
        if (data.user.name) {
          localStorage.setItem("nextpath_user_name", data.user.name);
        }
        if (data.user.id) {
          localStorage.setItem("nextpath_user_id", data.user.id);
        }
        if (data.user.email) {
          localStorage.setItem("nextpath_user_email", data.user.email);
        }
        // dispara evento para atualizar footer
        window.dispatchEvent(new Event("nextpath:userChanged"));
      }
      // Redireciona para /progresso
      window.location.href = "/progresso";
    }
  }

  return (
    <div className={styles.authPage}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        {error && <div className={styles.error}>{error}</div>}
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
        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
