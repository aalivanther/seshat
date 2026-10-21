"use client";

// Escritura libre. La consigna y la meta de palabras son las del examen del
// nivel. Tú marcas la hoja; aquí no hay nota que se guarde.

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { has } from "@/data/features";
import { getActiveLang, adoptLang } from "@/lib/languages";
import { asCefr, type Cefr } from "@/lib/cefr";
import { highestStartedCefr } from "@/lib/levels";
import { getState } from "@/lib/api";
import { consignasDe, examenDe, metaPalabras, nombreEscritura, tallerDe } from "@/lib/taller";
import { writeWordCount } from "@/lib/writeGrade";
import { hayQuePreguntarAlSalir, useLeaveGuard } from "@/lib/useLeaveGuard";
import hub from "@/components/hub.module.css";
import ex from "@/components/ex.module.css";

export default function EscrituraPage() {
  if (!has("ai")) notFound();
  const [lang, setLang] = useState("de");
  const [cefr, setCefr] = useState<Cefr>("a1");
  const [tema, setTema] = useState(0);
  const [texto, setTexto] = useState("");
  const [visto, setVisto] = useState(false);
  const [marcas, setMarcas] = useState<Set<number>>(new Set());
  useLeaveGuard(hayQuePreguntarAlSalir({ texto }));

  useEffect(() => {
    const l = getActiveLang();
    setLang(l);
    adoptLang(l);
    void getState().then((st) => {
      setCefr(asCefr(highestStartedCefr(l, st), l));
    });
  }, []);

  const temas = consignasDe(lang, cefr);
  const actual = temas[tema % temas.length];
  const palabras = writeWordCount(texto);
  const criterios = tallerDe(lang).criteria;
  const htmlLang = lang === "en" ? "en" : "de";

  function cambiarTema(i: number) {
    setTema(i);
    setTexto("");
    setVisto(false);
    setMarcas(new Set());
  }

  function marcar(i: number) {
    setMarcas((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <main className={hub.wrap}>
      <header className={hub.header}>
        <div>
          <h1 className={hub.title}>Escritura libre</h1>
          <p className={hub.subtitle}>
            {nombreEscritura(lang)} del {examenDe(lang, cefr)}, nivel {cefr.toUpperCase()}. Meta de
            palabras: {metaPalabras(lang, cefr)}. Esto es un ensayo: no se guarda como nota.
          </p>
        </div>
      </header>

      <section className={hub.levelCard}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {temas.map((t, i) => (
            <button
              key={t.target}
              type="button"
              className={hub.levelTag}
              aria-pressed={i === tema % temas.length}
              onClick={() => cambiarTema(i)}
              style={{ cursor: "pointer", border: i === tema % temas.length ? "2px solid var(--accent)" : undefined }}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p lang={htmlLang} style={{ fontWeight: 700, fontSize: "1.15rem" }}>{actual.target}</p>
        <p className={hub.levelDesc}>{actual.es}</p>
        <textarea
          value={texto}
          onChange={(e) => { setTexto(e.target.value); setVisto(false); }}
          lang={htmlLang}
          spellCheck={false}
          rows={10}
          placeholder="Escribe aquí el texto entero, con saludo y despedida si la consigna es una carta."
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
        <p className={hub.levelTag} style={{ marginTop: 10 }}>{palabras} {palabras === 1 ? "palabra" : "palabras"}</p>
        <div style={{ marginTop: 14 }}>
          <button type="button" className={ex.btnPrimary} disabled={palabras < 5} onClick={() => setVisto(true)}>
            Revisar con la hoja
          </button>
        </div>
        {visto && (
          <div style={{ marginTop: 16 }}>
            <p className={hub.levelDesc}>
              Márcalo con honestidad. En el examen estas cuatro cosas son la nota; aquí solo te las enseña.
            </p>
            {criterios.map(([nombre, ayuda], i) => (
              <button
                key={nombre}
                type="button"
                onClick={() => marcar(i)}
                aria-pressed={marcas.has(i)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  marginTop: 8,
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "2px solid var(--border)",
                  background: marcas.has(i) ? "var(--ok-soft)" : "var(--surface)",
                  color: "var(--text)",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                <b>{nombre}.</b> {ayuda}
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
