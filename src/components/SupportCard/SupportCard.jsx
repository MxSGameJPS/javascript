"use client";
import React from "react";
import styles from "./SupportCard.module.css";

export default function SupportCard() {
  return (
    <div
      className={styles.card}
      role="dialog"
      aria-label="Ajude a manter o projeto"
    >
      <div className={styles.header}>Ajude a manter o projeto ✨</div>
      <div className={styles.body}>
        <p>
          Este projeto é totalmente gratuito, mas se você puder ajudar a
          mantê-lo no ar com todas as funcionalidades (e funcionalidades
          futuras), contribua via PIX com qualquer valor.
        </p>
        <ul className={styles.list}>
          <li>
            <strong>Chave PIX:</strong> marysaujps@gmail.com
          </li>
          <li>
            <strong>Nome:</strong> Saulo J Pavanello
          </li>
          <li>
            <strong>Meio:</strong> PicPay
          </li>
        </ul>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.close}
          onClick={(e) => {
            e.currentTarget.closest("." + styles.card).style.display = "none";
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
