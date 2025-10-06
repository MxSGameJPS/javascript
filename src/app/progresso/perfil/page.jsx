"use client";

import React, { useEffect, useState } from "react";
import styles from "./perfil.module.css";

export default function PerfilPage() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [points, setPoints] = useState({ heat: 0, gems: 0 });

  useEffect(() => {
    (async function loadProfile() {
      // prefer new namespace, fall back to legacy keys if present
      const user_id =
        localStorage.getItem("javascriptpath_user_id") ||
        localStorage.getItem("nextpath_user_id") ||
        "";
      const savedEmail =
        localStorage.getItem("javascriptpath_user_email") ||
        localStorage.getItem("nextpath_user_email") ||
        "";
      const savedName =
        localStorage.getItem("javascriptpath_user_name") ||
        localStorage.getItem("nextpath_user_name") ||
        "";

      console.debug("perfil: keys", { user_id, savedEmail, savedName });

      // try fetch by id first
      if (user_id) {
        try {
          const res = await fetch(`/api/user/profile?id=${user_id}`);
          if (res.ok) {
            const profile = await res.json();
            setUser({ name: profile.name || "", email: profile.email || "" });
            setPoints({ heat: profile.heat || 0, gems: profile.gems || 0 });
            // persist server id if returned so future loads can fetch by id
            try {
              if (profile.id) {
                localStorage.setItem("javascriptpath_user_id", profile.id);
                localStorage.setItem(
                  "javascriptpath_user_email",
                  profile.email || ""
                );
                // maintain legacy keys for older clients
                try {
                  localStorage.setItem("nextpath_user_id", profile.id);
                  localStorage.setItem(
                    "nextpath_user_email",
                    profile.email || ""
                  );
                } catch (e) {}
              }
            } catch (e) {}
            setLoading(false);
            return;
          }
        } catch (e) {
          // fall through to email try / localStorage
        }
      }

      // if no id or id fetch failed, try by email (server)
      if (savedEmail) {
        try {
          const res = await fetch(
            `/api/user/profile?email=${encodeURIComponent(savedEmail)}`
          );
          if (res.ok) {
            const profile = await res.json();
            setUser({ name: profile.name || "", email: profile.email || "" });
            setPoints({ heat: profile.heat || 0, gems: profile.gems || 0 });
            try {
              if (profile.id) {
                localStorage.setItem("javascriptpath_user_id", profile.id);
                localStorage.setItem(
                  "javascriptpath_user_email",
                  profile.email || ""
                );
                try {
                  localStorage.setItem("nextpath_user_id", profile.id);
                  localStorage.setItem(
                    "nextpath_user_email",
                    profile.email || ""
                  );
                } catch (e) {}
              }
            } catch (e) {}
            setLoading(false);
            return;
          }
        } catch (e) {
          // fall through to localStorage fallback
        }
      }

      // final fallback: localStorage (ensure UI shows something)
      const name = localStorage.getItem("javascriptpath_user_name") || "";
      const email = localStorage.getItem("javascriptpath_user_email") || "";
      const heat = Number(localStorage.getItem("javascriptpath_heat") || 0);
      const gems = Number(localStorage.getItem("javascriptpath_gems") || 0);
      setUser({ name, email });
      setPoints({ heat, gems });
      setLoading(false);
    })();
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const user_id = localStorage.getItem("javascriptpath_user_id") || "";
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user_id, name: user.name }),
      });
      if (res.ok) {
        setSuccess(true);
        // Atualiza localStorage para manter consistência
        localStorage.setItem("javascriptpath_user_name", user.name);
        setTimeout(() => setSuccess(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.perfilContainer}>
      <h2 className={styles.title}>Meu Perfil</h2>
      <button
        className={styles.backBtn}
        type="button"
        onClick={() => (window.location.href = "/progresso")}
        style={{
          marginBottom: "1.5rem",
          background: "#eee",
          color: "#222",
          border: "none",
          borderRadius: "6px",
          padding: "0.7rem 1.5rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Voltar
      </button>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome
          <input
            className={styles.input}
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            name="email"
            value={user.email}
            readOnly
            disabled
          />
        </label>
        <button className={styles.saveBtn} type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
        {success && <div className={styles.success}>Perfil atualizado!</div>}
      </form>
      <div className={styles.pointsBox}>
        <div className={styles.pointItem}>
          <span className={styles.pointLabel}>Pontos de Calor:</span>
          <span className={styles.pointValue}>{points.heat}</span>
        </div>
        <div className={styles.pointItem}>
          <span className={styles.pointLabel}>Gemas:</span>
          <span className={styles.pointValue}>{points.gems}</span>
        </div>
      </div>
    </div>
  );
}
