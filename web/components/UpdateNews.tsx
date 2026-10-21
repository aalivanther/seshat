"use client";

// Anuncio de actualización: cuando el binario nuevo (drop N) arranca sobre una
// instalación que había visto el drop N−1, la app LO CUENTA — "no sabía que
// había contenido nuevo" es churn directo del modelo de drops (B26).
// El visto se guarda por dispositivo; el contenido instalado lo dice el
// backend (/api/version), así que el anuncio sobrevive a cómo llegó el update.

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift, X } from "@phosphor-icons/react";
import { getVersion } from "@/lib/api";
import { dropInfo, type DropInfo } from "@/lib/drop";
import { sfxFanfare } from "@/lib/juice";

const SEEN_KEY = "seshat-content-seen";

export function UpdateNews() {
  const [news, setNews] = useState<DropInfo | null>(null);

  useEffect(() => {
    getVersion().then((v) => {
      if (!v) return;
      const installed = Number(v.content);
      if (!Number.isFinite(installed)) return;
      const seen = Number(window.localStorage.getItem(SEEN_KEY) ?? "0");
      if (installed > seen) {
        // primera instalación (seen=0): estrenar sin fanfarria, solo marcar
        if (seen === 0) {
          window.localStorage.setItem(SEEN_KEY, String(installed));
          return;
        }
        const info = dropInfo(installed);
        if (info) {
          setNews(info);
          sfxFanfare();
        }
        window.localStorage.setItem(SEEN_KEY, String(installed));
      }
    });
  }, []);

  if (!news) return null;

  return (
    <div
      role="dialog"
      aria-label="Contenido nuevo instalado"
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 20,
        zIndex: 120,
        maxWidth: 520,
        margin: "0 auto",
        // hueco a la derecha para la X: sin él, el título se metía debajo
        padding: "16px 48px 16px 18px",
        border: "2px solid var(--accent)",
        borderRadius: "19px 15px 20px 16px",
        background: "var(--surface)",
        boxShadow: "4px 5px 0 rgba(211,196,171,.5), 0 16px 40px rgba(87,63,25,.18)",
      }}
    >
      <button
        onClick={() => setNews(null)}
        aria-label="Cerrar aviso"
        style={{
          position: "absolute", top: 8, right: 8, width: 36, height: 36,
          display: "grid", placeItems: "center",
          background: "none", border: "none", color: "var(--text-3)", cursor: "pointer",
        }}
      >
        <X size={18} weight="bold" />
      </button>
      <p style={{ fontFamily: "var(--font-hand)", fontWeight: 800, fontSize: "1.05rem", color: "var(--accent-text)" }}>
        <Gift size={20} weight="duotone" style={{ verticalAlign: "-4px" }} aria-hidden /> Actualización
        instalada: {news.name}
      </p>
      <p style={{ color: "var(--text-2)", marginTop: 6, lineHeight: 1.55 }}>{news.news}</p>
      <div style={{ marginTop: 12 }}>
        <Link
          href={news.href}
          onClick={() => setNews(null)}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "var(--radius-hand)",
            background: "var(--accent)",
            color: "var(--accent-contrast)",
            fontWeight: 700,
            fontFamily: "var(--font-hand)",
            boxShadow: "var(--shadow-btn)",
          }}
        >
          Ver lo nuevo →
        </Link>
      </div>
    </div>
  );
}
