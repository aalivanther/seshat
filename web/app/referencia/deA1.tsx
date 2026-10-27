"use client";

// Alemán A1. La página solo la monta: el detalle, si vuelve al archivo común,
// deja de poder abrirse.

import { useMemo, useState } from "react";
import type { QuestionPattern, QuestionWord } from "@/data/questions";
import type { SoundRule } from "@/data/pronunciation";
import type { VerbEntry } from "@/data/verbs";
import { refModules } from "@/data/refs.gen";
import { sanitizeNoteHtml } from "@/lib/sanitize";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";

const verbsMod = refModules.verbs;
const questionsMod = refModules.questions;
const pronunciationMod = refModules.pronunciation;
const verbs: VerbEntry[] = verbsMod?.verbs ?? [];
const questionWords: QuestionWord[] = questionsMod?.questionWords ?? [];
const questionPatterns: QuestionPattern[] = questionsMod?.questionPatterns ?? [];
const soundRules: SoundRule[] = pronunciationMod?.soundRules ?? [];

const PRONOUNS = ["ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie"];

const TYPE_LABEL: Record<VerbEntry["type"], string> = {
  "sein-haben": "esenciales",
  modal: "modales",
  regular: "regulares",
  irregular: "irregulares",
  separable: "separables",
};

export function LibretaDeA1({ tab }: { tab: string }) {
  const [verbFilter, setVerbFilter] = useState("");
  const verbGroups = useMemo(() => {
    const q = verbFilter.trim().toLowerCase();
    const filtered = q
      ? verbs.filter((v) => v.infinitive.toLowerCase().includes(q) || v.es.toLowerCase().includes(q))
      : verbs;
    const order: VerbEntry["type"][] = ["sein-haben", "modal", "regular", "irregular", "separable"];
    return order
      .map((t) => ({ type: t, list: filtered.filter((v) => v.type === t) }))
      .filter((g) => g.list.length > 0);
  }, [verbFilter]);

  return (
    <>
      {tab === "verbos" && (
        <section>
          <input
            className={s.search}
            placeholder="Busca un verbo (alemán o español)..."
            value={verbFilter}
            onChange={(e) => setVerbFilter(e.target.value)}
          />
          {verbGroups.map((g) => (
            <div key={g.type}>
              <h2 className={s.groupTitle}>{TYPE_LABEL[g.type]}</h2>
              <div className={s.verbGrid}>
                {g.list.map((v) => (
                  <article key={v.infinitive} className={`${s.verbCard} paper`}>
                    <header className={s.verbHead}>
                      <span className={s.verbInf} lang="de">{v.infinitive}</span>
                      <button className={s.sayBtn} onClick={() => speak(v.infinitive)} aria-label={`Escuchar ${v.infinitive}`}>
                        <SpeakerHigh size={16} />
                      </button>
                    </header>
                    <p className={s.verbEs}>{v.es}{v.sound ? <span className={s.verbSound}> · {v.sound}</span> : null}</p>
                    <table className={s.conjTable}>
                      <tbody>
                        {v.present.map((form, i) => (
                          <tr key={i}>
                            <td className={s.pronoun}>{PRONOUNS[i]}</td>
                            <td lang="de">{form}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {v.perfekt && (
                      <p className={s.perfekt} lang="de">
                        Perfekt: <b>{v.perfekt.aux}</b> ... <b>{v.perfekt.partizip}</b>
                      </p>
                    )}
                    <p className={s.example}>
                      <span lang="de" className="marker">{v.example.de}</span>
                      <br />
                      <span className={s.exampleEs}>{v.example.es}</span>
                    </p>
                    {v.trap && <p className={`${s.trap} hand`}>⚠ {v.trap}</p>}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "preguntas" && (
        <section>
          <h2 className={s.groupTitle}>Las palabras que preguntan</h2>
          <div className={s.qGrid}>
            {questionWords.map((q) => (
              <article key={q.de} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="de">{q.de}</span>
                  <button className={s.sayBtn} onClick={() => speak(q.example.de)} aria-label={`Escuchar ejemplo de ${q.de}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{q.es}{q.sound ? <span className={s.verbSound}> · {q.sound}</span> : null}</p>
                <p className={s.example}>
                  <span lang="de" className="marker">{q.example.de}</span>
                  <br />
                  <span className={s.exampleEs}>{q.example.es}</span>
                </p>
                {q.trap && <p className={`${s.trap} hand`}>⚠ {q.trap}</p>}
              </article>
            ))}
          </div>

          <h2 className={s.groupTitle}>Cómo se construye una pregunta</h2>
          {questionPatterns.map((p) => (
            <article key={p.title} className={`${s.patternCard} paper`}>
              <h3 className={s.patternTitle}>{p.title}</h3>
              <p className={s.patternBody} dangerouslySetInnerHTML={{ __html: sanitizeNoteHtml(p.body) }} />
              <ul className={s.patternList}>
                {p.examples.map((e, i) => (
                  <li key={i}>
                    <button className={s.sayInline} onClick={() => speak(e.de)} aria-label="Escuchar">
                      <SpeakerHigh size={14} />
                    </button>{" "}
                    <span lang="de"><b>{e.de}</b></span> — <span className={s.exampleEs}>{e.es}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      )}

      {tab === "sonidos" && (
        <section>
          <h2 className={s.groupTitle}>Cómo suena cada letra (tu tabla de clases, ampliada)</h2>
          <div className={`${s.soundTableWrap} paper`}>
            <table className={s.soundTable}>
              <thead>
                <tr><th>Se escribe</th><th>Suena</th><th>Ejemplos</th><th></th></tr>
              </thead>
              <tbody>
                {soundRules.map((r) => (
                  <tr key={r.grapheme}>
                    <td className={s.grapheme} lang="de">{r.grapheme}</td>
                    <td>{r.sound}</td>
                    <td lang="de" className={s.soundExamples}>{r.examples}</td>
                    <td>
                      <button
                        className={s.sayInline}
                        onClick={() => speak(r.examples.split(",")[0])}
                        aria-label={`Escuchar ejemplo de ${r.grapheme}`}
                      >
                        <SpeakerHigh size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {tab === "numeros" && <NumbersTab />}
    </>
  );
}

function NumbersTab() {
  const rows: [string, string][] = [
    ["0-12", "null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn, elf, zwölf"],
    ["13-19", "dreizehn, vierzehn, fünfzehn, sechzehn (¡sin s!), siebzehn (¡sin en!), achtzehn, neunzehn"],
    ["decenas", "zwanzig, dreißig (¡con ß!), vierzig, fünfzig, sechzig, siebzig, achtzig, neunzig"],
    ["21+", "einundzwanzig, zweiundzwanzig... — unidad + und + decena, al revés que en español"],
    ["100+", "hundert, zweihundert... — fünfhundertfünfundfünfzig = 555"],
    ["precios", "fünf Euro fünfzig = 5,50 € — se dice sin «coma»"],
    ["horas", "acht Uhr = 8:00 · halb neun = 8:30 (¡media hora ANTES de las 9!) · Viertel nach acht = 8:15 · Viertel vor neun = 8:45"],
    ["teléfono", "cifra a cifra: null - eins - sieben - sechs... (así lo pide el examen oral)"],
    ["fechas", "am zwölften März = el 12 de marzo · 1990 = neunzehnhundertneunzig"],
  ];
  return (
    <section>
      <h2 className={s.groupTitle}>Números, precios, horas y fechas</h2>
      <div className={`${s.soundTableWrap} paper`}>
        <table className={s.soundTable}>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td className={s.grapheme}>{k}</td>
                <td lang="de">{v}</td>
                <td>
                  <button className={s.sayInline} onClick={() => speak(v.split("—")[0].split("·")[0])} aria-label={`Escuchar ${k}`}>
                    <SpeakerHigh size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
