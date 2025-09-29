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
    const user_id = localStorage.getItem("nextpath_user_id") || "";
    if (!user_id) {
      setLoading(false);
      return;
    }
    fetch(`/api/user/profile?id=${user_id}`)
      .then((res) => res.json())
      .then((profile) => {
        setUser({ name: profile.name || "", email: profile.email || "" });
        setPoints({ heat: profile.heat || 0, gems: profile.gems || 0 });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    const user_id = localStorage.getItem("nextpath_user_id") || "";
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user_id, name: user.name }),
      });
      if (res.ok) {
        setSuccess(true);
        // Atualiza localStorage para manter consistência
        localStorage.setItem("nextpath_user_name", user.name);
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
