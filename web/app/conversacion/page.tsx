"use client";

// Conversación guiada. Mia y Holly ponen la frase; tú respondes en voz alta
// y la escribes para no perder el hilo. No sale de esta máquina.

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { has } from "@/data/features";
import { getActiveLang, adoptLang } from "@/lib/languages";
import { asCefr } from "@/lib/cefr";
import { highestStartedCefr } from "@/lib/levels";
import { getState } from "@/lib/api";
import { tallerDe } from "@/lib/taller";
import { Speaker } from "@/components/Speaker";
import { hayQuePreguntarAlSalir, useLeaveGuard } from "@/lib/useLeaveGuard";
import hub from "@/components/hub.module.css";
import ex from "@/components/ex.module.css";

export default function ConversacionPage() {
  if (!has("ai")) notFound();
  const [lang, setLang] = useState("de");
  const [nivel, setNivel] = useState("A1");
  const [turno, setTurno] = useState(0);
  const [dicho, setDicho] = useState("");
  const [hechos, setHechos] = useState(0);
  useLeaveGuard(hayQuePreguntarAlSalir({ texto: dicho }));

  useEffect(() => {
    const l = getActiveLang();
    setLang(l);
    adoptLang(l);
    void getState().then((st) => {
      setNivel(asCefr(highestStartedCefr(l, st), l).toUpperCase());
    });
  }, []);

  const taller = tallerDe(lang);
  const frase = taller.partner.starters[turno % taller.partner.starters.length];

  function siguiente() {
    if (dicho.trim().length > 0) setHechos((n) => n + 1);
    setDicho("");
    setTurno((n) => n + 1);
  }

  return (
    <main className={hub.wrap}>
      <header className={hub.header}>
        <div>
          <h1 className={hub.title}>{taller.partner.title}</h1>
          <p className={hub.subtitle}>
            Nivel {nivel}. {taller.partner.name} dice una frase; tú respondes en voz alta y la
            escribes. Nada de esto se guarda ni sale de aquí.
          </p>
        </div>
      </header>

      <section className={hub.levelCard}>
        <p className={hub.levelDesc} lang={lang === "en" ? "en" : "de"} style={{ fontSize: "1.35rem", fontWeight: 700 }}>
          {frase}
        </p>
        <div style={{ marginTop: 12 }}>
          <Speaker text={frase} label="Escuchar" ariaLabel={`Escuchar: ${frase}`} />
        </div>
        <label className={hub.levelDesc} style={{ display: "block", marginTop: 16 }}>
          Lo que has dicho
          <textarea
            value={dicho}
            onChange={(e) => setDicho(e.target.value)}
            placeholder={taller.partner.placeholder}
            lang={lang === "en" ? "en" : "de"}
            spellCheck={false}
            rows={4}
            style={{
              display: "block",
              width: "100%",
              marginTop: 8,
              padding: 14,
              borderRadius: 14,
              border: "2px solid var(--border-strong)",
              background: "var(--surface)",
              color: "var(--text)",
              font: "inherit",
              resize: "vertical",
            }}
          />
        </label>
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14, flexWrap: "wrap" }}>
          <button type="button" className={ex.btnPrimary} onClick={siguiente}>Siguiente frase</button>
          {hechos > 0 && <span className={hub.levelTag}>{hechos} {hechos === 1 ? "turno" : "turnos"} en esta sesión</span>}
        </div>
        <p className={hub.levelDesc}>
          Si te atascas, vuelve a la lección de este nivel y copia el molde, no la frase entera.
        </p>
      </section>
    </main>
  );
}
