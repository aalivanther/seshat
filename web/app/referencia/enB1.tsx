"use client";

// Inglés B1. Diez pestañas que no repiten el A1 ni el A2.

import { refModules } from "@/data/refs.gen";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";
import { EnA2WrongRight } from "./piezas";

// ── libreta inglesa del B1 (drop 7) ──
const enb1ref = refModules.enb1;
const EN_B1_TENSE_TIP = enb1ref?.EN_B1_TENSE_TIP ?? "";
const enb1Tenses = enb1ref?.enb1Tenses ?? [];
const enb1Markers = enb1ref?.enb1Markers ?? [];
const enb1PerfectAdverbs = enb1ref?.enb1PerfectAdverbs ?? [];
const enb1SimpleVsContinuous = enb1ref?.enb1SimpleVsContinuous;
const EN_B1_PASSIVE_TIP = enb1ref?.EN_B1_PASSIVE_TIP ?? "";
const enb1PassiveTable = enb1ref?.enb1PassiveTable ?? [];
const enb1SeExits = enb1ref?.enb1SeExits;
const enb1ImpersonalMoulds = enb1ref?.enb1ImpersonalMoulds ?? [];
const enb1GetPassive = enb1ref?.enb1GetPassive;
const enb1Headlines = enb1ref?.enb1Headlines ?? [];
const EN_B1_REPORTED_TIP = enb1ref?.EN_B1_REPORTED_TIP ?? "";
const enb1SayTell = enb1ref?.enb1SayTell ?? [];
const enb1Backshift = enb1ref?.enb1Backshift ?? [];
const enb1BackshiftMarkers = enb1ref?.enb1BackshiftMarkers ?? [];
const enb1ReportedQuestions = enb1ref?.enb1ReportedQuestions;
const enb1ReportingVerbs = enb1ref?.enb1ReportingVerbs ?? [];
const EN_B1_COND_TIP = enb1ref?.EN_B1_COND_TIP ?? "";
const enb1Conditionals = enb1ref?.enb1Conditionals ?? [];
const enb1Wishes = enb1ref?.enb1Wishes ?? [];
const enb1TimeClauses = enb1ref?.enb1TimeClauses ?? [];
const EN_B1_RELATIVE_TIP = enb1ref?.EN_B1_RELATIVE_TIP ?? "";
const enb1Relatives = enb1ref?.enb1Relatives ?? [];
const enb1RelativeRules = enb1ref?.enb1RelativeRules ?? [];
const EN_B1_PATTERN_TIP = enb1ref?.EN_B1_PATTERN_TIP ?? "";
const enb1GerundVerbs = enb1ref?.enb1GerundVerbs ?? [];
const enb1InfinitiveVerbs = enb1ref?.enb1InfinitiveVerbs ?? [];
const enb1PatternExamples = enb1ref?.enb1PatternExamples ?? [];
const enb1ChangingVerbs = enb1ref?.enb1ChangingVerbs ?? [];
const enb1PrepIng = enb1ref?.enb1PrepIng;
const EN_B1_PREP_TIP = enb1ref?.EN_B1_PREP_TIP ?? "";
const enb1PrepGroups = enb1ref?.enb1PrepGroups ?? [];
const enb1ForTo = enb1ref?.enb1ForTo;
const EN_B1_PHRASAL_TIP = enb1ref?.EN_B1_PHRASAL_TIP ?? "";
const enb1PhrasalGroups = enb1ref?.enb1PhrasalGroups ?? [];
const enb1PhrasalPronoun = enb1ref?.enb1PhrasalPronoun ?? [];
const EN_B1_CONNECTOR_TIP = enb1ref?.EN_B1_CONNECTOR_TIP ?? "";
const enb1Connectors = enb1ref?.enb1Connectors ?? [];
const enb1ConnectorTraps = enb1ref?.enb1ConnectorTraps ?? [];
const enb1FalseFriends = enb1ref?.enb1FalseFriends ?? [];
const enb1Traps = enb1ref?.enb1Traps ?? [];

/* ═══════ La libreta INGLESA del B1 — diez pestañas propias (drop 7) ═══════ */

/** Tabla de consulta del B1: cabecera opcional (hay bloques que se leen mejor
 *  sin ella) y bocina en la columna que lleva el inglés, que es la que se
 *  quiere oír. `speakCol < 0` la quita: no todas las filas son audibles. */
function EnB1Table({ head, rows, speakCol = 1 }: {
  head?: readonly string[];
  rows: readonly (readonly string[])[];
  speakCol?: number;
}) {
  const cols = rows[0]?.length ?? 0;
  return (
    <div className={`${s.soundTableWrap} paper`}>
      <table className={s.soundTable}>
        {head && (
          <thead>
            <tr>
              {head.map((h) => <th key={h}>{h}</th>)}
              {speakCol >= 0 && <th />}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, i) => (
            <tr key={`${r[0]}-${i}`}>
              {r.map((cell, c) => (
                <td
                  key={c}
                  lang={c === speakCol ? "en" : undefined}
                  className={c === cols - 1 ? s.soundExamples : undefined}
                  style={c === 0 && speakCol !== 0 ? { color: "var(--text-3)" } : undefined}
                >
                  {c === speakCol ? <b>{cell}</b> : cell}
                </td>
              ))}
              {speakCol >= 0 && (
                <td>
                  <button className={s.sayInline} onClick={() => speak(r[speakCol])} aria-label={`Escuchar ${r[speakCol]}`}>
                    <SpeakerHigh size={14} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** el aviso de arriba de cada pestaña: lo que hay que leer antes de la tabla */
function EnB1Tip({ title, body }: { title: string; body: string }) {
  return (
    <article className={`${s.patternCard} paper`}>
      <h3 className={s.patternTitle}>{title}</h3>
      <p className={s.patternBody} style={{ marginBottom: 0 }}>{body}</p>
    </article>
  );
}

/** las listas cerradas se leen mejor como fichas sueltas que como párrafo */
function EnB1Chips({ words }: { words: readonly string[] }) {
  return (
    <p className={s.perfekt}>
      {words.map((w) => (
        <span
          key={w}
          lang="en"
          style={{
            background: "var(--panel)", borderRadius: 999, padding: "1px 8px",
            marginRight: 6, whiteSpace: "nowrap", fontWeight: 700,
          }}
        >
          {w}
        </span>
      ))}
    </p>
  );
}

function EnB1TensesTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Los tiempos del B1, de un vistazo</h2>
      <EnB1Tip title="La fila que hay que mirar diez veces" body={EN_B1_TENSE_TIP} />
      <div className={s.verbGrid}>
        {enb1Tenses.map((t) => (
          <article key={t.id} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf}>{t.name}</span>
              <button className={s.sayBtn} onClick={() => speak(t.example)} aria-label={`Escuchar ${t.example}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.perfekt} lang="en">{t.form}</p>
            <p className={s.verbEs}>{t.when}</p>
            <p className={s.example}>
              <span lang="en" className="marker">{t.example}</span>
              <br />
              <span className={s.exampleEs}>{t.es}</span>
            </p>
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>Los marcadores mandan: eligen ellos, no tú</h2>
      <EnB1Table head={["Si ves esto…", "El tiempo es", "Ejemplos"]} rows={enb1Markers} speakCol={2} />

      <h2 className={s.groupTitle}>Y dónde va cada adverbio del perfecto</h2>
      <EnB1Table head={["Adverbio", "Dónde va", "Ejemplo"]} rows={enb1PerfectAdverbs} speakCol={2} />

      {enb1SimpleVsContinuous && (
        <>
          <h2 className={s.groupTitle}>{enb1SimpleVsContinuous.title}</h2>
          <p className={s.verbEs}>{enb1SimpleVsContinuous.body}</p>
          <EnB1Table head={["Lo que cuentas", "Cómo se dice", "Cuál va"]} rows={enb1SimpleVsContinuous.rows} />
        </>
      )}
    </section>
  );
}

function EnB1PassiveTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>be + participio, y el culpable que se calla</h2>
      <EnB1Tip title="Lo que importa no es la forma, es para qué" body={EN_B1_PASSIVE_TIP} />
      <EnB1Table head={["Tiempo", "Activa", "Pasiva"]} rows={enb1PassiveTable} speakCol={2} />

      {enb1SeExits && (
        <>
          <h2 className={s.groupTitle}>{enb1SeExits.title}</h2>
          <p className={s.verbEs}>{enb1SeExits.body}</p>
          <EnB1Table head={["Español", "Inglés", "Cuándo se usa"]} rows={enb1SeExits.rows} />
        </>
      )}

      <h2 className={s.groupTitle}>Lo mismo en tres registros</h2>
      <EnB1Table head={["Dónde", "Cómo suena", "Nota"]} rows={enb1ImpersonalMoulds} />

      {enb1GetPassive && (
        <>
          <h2 className={s.groupTitle}>{enb1GetPassive.title}</h2>
          <p className={s.verbEs}>{enb1GetPassive.body}</p>
          <EnB1Table head={["Hablando (get)", "Escribiendo (be)", "Español"]} rows={enb1GetPassive.rows} speakCol={0} />
        </>
      )}

      <h2 className={s.groupTitle}>El titular borra lo que se puede adivinar</h2>
      <p className={s.verbEs}>
        Esto se reconoce, no se imita: en tu Writing, una frase sin verbo cuenta como error de gramática.
      </p>
      <EnB1Table head={["Titular", "La frase entera", "Qué borró"]} rows={enb1Headlines} />
    </section>
  );
}

function EnB1ReportedTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Contar lo que dijo otro</h2>
      <EnB1Tip title="Esto no es un calco" body={EN_B1_REPORTED_TIP} />

      <h2 className={s.groupTitle}>Cada verbo de decir, con su construcción</h2>
      <EnB1Table head={["Construcción", "Ejemplo", "Cuidado con"]} rows={enb1SayTell} />

      <h2 className={s.groupTitle}>El paso atrás, tiempo por tiempo</h2>
      <EnB1Table head={["Lo que dijo", "Contado después"]} rows={enb1Backshift} />

      <h2 className={s.groupTitle}>Y el paso que el español no da: los marcadores</h2>
      <EnB1Table head={["Al decirlo", "Al contarlo"]} rows={enb1BackshiftMarkers} speakCol={-1} />

      {enb1ReportedQuestions && (
        <>
          <h2 className={s.groupTitle}>{enb1ReportedQuestions.title}</h2>
          <p className={s.verbEs}>{enb1ReportedQuestions.body}</p>
          <EnB1Table head={["La pregunta", "Contada", "Qué cambia"]} rows={enb1ReportedQuestions.rows} />
        </>
      )}

      <h2 className={s.groupTitle}>Diez verbos que valen por veinte «said»</h2>
      <EnB1Table head={["Verbo y su forma", "Ejemplo", "Qué dice"]} rows={enb1ReportingVerbs} />
    </section>
  );
}

function EnB1ConditionalsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Los tres condicionales</h2>
      <EnB1Tip title="Dónde vive el would" body={EN_B1_COND_TIP} />
      <div className={s.verbGrid}>
        {enb1Conditionals.map((c) => (
          <article key={c.id} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf}>{c.name}</span>
              <button className={s.sayBtn} onClick={() => speak(c.example)} aria-label={`Escuchar ${c.example}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.perfekt}>
              <b>{c.ifHalf}</b> … <b>{c.mainHalf}</b>
            </p>
            <p className={s.verbEs}>{c.when}</p>
            <p className={s.example}>
              <span lang="en" className="marker">{c.example}</span>
              <br />
              <span className={s.exampleEs}>{c.es}</span>
            </p>
            <p className={`${s.trap} hand`}>⚠ {c.trap}</p>
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>Desear, y arrepentirse</h2>
      <EnB1Table head={["Fórmula", "Ejemplo", "Qué significa"]} rows={enb1Wishes} />

      <h2 className={s.groupTitle}>Las conjunciones que se llevan el futuro por delante</h2>
      <EnB1Table head={["Conjunción", "Ejemplo", "Cuidado con"]} rows={enb1TimeClauses} />
    </section>
  );
}

function EnB1RelativesTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Una frase dentro de otra</h2>
      <EnB1Tip title="El error nº 1 de este bloque" body={EN_B1_RELATIVE_TIP} />
      <EnB1Table head={["Se refiere a…", "Relativo", "Ejemplo"]} rows={enb1Relatives} speakCol={2} />

      {enb1RelativeRules.map((r) => (
        <div key={r.id}>
          <h2 className={s.groupTitle}>{r.title}</h2>
          <p className={s.verbEs}>{r.body}</p>
          <EnB1Table rows={r.rows} speakCol={r.id === "enb1-rel-commas" ? 0 : 2} />
        </div>
      ))}
    </section>
  );
}

function EnB1PatternsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Dos montones, y se reparten</h2>
      <EnB1Tip title="Aquí no hay nada que entender" body={EN_B1_PATTERN_TIP} />
      <div className={s.verbGrid}>
        <article className={`${s.verbCard} paper`}>
          <header className={s.verbHead}><span className={s.verbInf}>Montón A · detrás va -ing</span></header>
          <EnB1Chips words={enb1GerundVerbs} />
          <p className={s.example}>
            <span lang="en" className="marker">I enjoy living here.</span>
            <br />
            <span className={s.exampleEs}>Me gusta vivir aquí.</span>
          </p>
        </article>
        <article className={`${s.verbCard} paper`}>
          <header className={s.verbHead}><span className={s.verbInf}>Montón B · detrás va to</span></header>
          <EnB1Chips words={enb1InfinitiveVerbs} />
          <p className={s.example}>
            <span lang="en" className="marker">I decided to complain.</span>
            <br />
            <span className={s.exampleEs}>Decidí reclamar.</span>
          </p>
        </article>
      </div>
      <EnB1Table head={["Montón A (+ -ing)", "Montón B (+ to)", "El error clásico"]} rows={enb1PatternExamples} speakCol={0} />

      <h2 className={s.groupTitle}>Los seis que cambian de significado</h2>
      <p className={s.verbEs}>
        Ninguna de las dos formas está mal: son dos frases distintas. La pregunta no es cuál es
        correcta, sino cuál dice lo que quieres decir. El -ing mira hacia atrás; el to, hacia delante.
      </p>
      <div className={s.verbGrid}>
        {enb1ChangingVerbs.map((v) => (
          <article key={v.verb} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}><span className={s.verbInf} lang="en">{v.verb}</span></header>
            <p className={s.example} style={{ marginTop: 0 }}>
              <button className={s.sayInline} onClick={() => speak(v.ing)} aria-label={`Escuchar ${v.ing}`}>
                <SpeakerHigh size={14} />
              </button>{" "}
              <span lang="en" className="marker">{v.ing}</span>
              <br />
              <span className={s.exampleEs}>{v.ingEs}</span>
            </p>
            <p className={s.example}>
              <button className={s.sayInline} onClick={() => speak(v.to)} aria-label={`Escuchar ${v.to}`}>
                <SpeakerHigh size={14} />
              </button>{" "}
              <span lang="en" className="marker">{v.to}</span>
              <br />
              <span className={s.exampleEs}>{v.toEs}</span>
            </p>
          </article>
        ))}
      </div>

      {enb1PrepIng && (
        <>
          <h2 className={s.groupTitle}>{enb1PrepIng.title}</h2>
          <p className={s.verbEs}>{enb1PrepIng.body}</p>
          <EnB1Table head={["Se dice", "No se dice", "Por qué"]} rows={enb1PrepIng.rows} speakCol={0} />
        </>
      )}
    </section>
  );
}

function EnB1PrepTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>El verbo y su preposición son una sola palabra</h2>
      <EnB1Tip title="No hay regla: hay unidad léxica" body={EN_B1_PREP_TIP} />
      {enb1PrepGroups.map((g) => (
        <div key={g.id}>
          <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>{g.label}</h3>
          <p className={s.verbEs}>{g.hint}</p>
          <EnB1Table head={["Español", "Inglés", "Lo que NO se dice"]} rows={g.rows} />
        </div>
      ))}

      {enb1ForTo && (
        <>
          <h2 className={s.groupTitle}>{enb1ForTo.title}</h2>
          <p className={s.verbEs}>{enb1ForTo.body}</p>
          <EnB1Table head={["Lo que quieres decir", "Se dice", "Lo que no existe"]} rows={enb1ForTo.rows} />
        </>
      )}
    </section>
  );
}

/** ¿se puede meter el pronombre en medio? Es la única pregunta que importa */
function EnB1SplitChip({ splits }: { splits: boolean }) {
  return (
    <span
      style={{
        background: splits ? "var(--ok-soft)" : "var(--panel)",
        color: splits ? "var(--ok)" : "var(--text-3)",
        fontWeight: 800, fontSize: "0.75rem", padding: "1px 8px",
        borderRadius: 999, whiteSpace: "nowrap",
      }}
    >
      {splits ? "se parte" : "no se parte"}
    </span>
  );
}

function EnB1PhrasalTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Los phrasal verbs del nivel, por campo</h2>
      <EnB1Tip title="El latinismo te delata" body={EN_B1_PHRASAL_TIP} />
      {enb1PhrasalGroups.map((g) => (
        <div key={g.id}>
          <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>{g.label}</h3>
          <p className={s.verbEs}>{g.hint}</p>
          <div className={s.qGrid}>
            {g.verbs.map((v) => (
              <article key={`${g.id}-${v.verb}`} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="en">{v.verb}</span>
                  <EnB1SplitChip splits={v.splits} />
                </header>
                <p className={s.verbEs}>{v.es}</p>
                <p className={s.example}>
                  <button className={s.sayInline} onClick={() => speak(v.example)} aria-label={`Escuchar ${v.example}`}>
                    <SpeakerHigh size={14} />
                  </button>{" "}
                  <span lang="en" className="marker">{v.example}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      ))}

      <h2 className={s.groupTitle}>La regla del pronombre, que es una y no admite discusión</h2>
      <EnB1Table head={["Con sustantivo", "Con pronombre", "Lo que NO se dice"]} rows={enb1PhrasalPronoun} />
    </section>
  );
}

/** el nivel real del conector, que es el dato que casi nadie tiene bien */
const EN_B1_LEVEL_CHIP: Record<"A2" | "B1" | "B2", { bg: string; fg: string; label: string }> = {
  A2: { bg: "var(--panel)", fg: "var(--text-3)", label: "A2 · ya lo tienes" },
  B1: { bg: "var(--ok-soft)", fg: "var(--ok)", label: "B1 · para producir" },
  B2: { bg: "var(--accent-soft)", fg: "var(--accent-text)", label: "B2 · solo reconocer" },
};

function EnB1ConnectorsTab() {
  const groups: ("B1" | "A2" | "B2")[] = ["B1", "A2", "B2"];
  const GROUP_TITLE: Record<"A2" | "B1" | "B2", string> = {
    B1: "Los tuyos: los que tienes que producir",
    A2: "Los que ya traías de más abajo (y siguen valiendo)",
    B2: "Los de arriba: hay que entenderlos, no hacen falta para escribir",
  };
  return (
    <section>
      <h2 className={s.groupTitle}>Conectores, con su nivel real</h2>
      <EnB1Tip title="El dato que casi nadie tiene bien" body={EN_B1_CONNECTOR_TIP} />
      {groups.map((lv) => {
        const list = enb1Connectors.filter((c) => c.level === lv);
        if (!list.length) return null;
        return (
          <div key={lv}>
            <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>{GROUP_TITLE[lv]}</h3>
            <div className={s.qGrid}>
              {list.map((c) => (
                <article key={c.word} className={`${s.qCard} paper`}>
                  <header className={s.verbHead}>
                    <span className={s.verbInf} lang="en">{c.word}</span>
                    <span
                      style={{
                        background: EN_B1_LEVEL_CHIP[c.level].bg,
                        color: EN_B1_LEVEL_CHIP[c.level].fg,
                        fontWeight: 800, fontSize: "0.75rem", padding: "1px 8px",
                        borderRadius: 999, whiteSpace: "nowrap",
                      }}
                    >
                      {EN_B1_LEVEL_CHIP[c.level].label}
                    </span>
                  </header>
                  <p className={s.verbEs}>{c.es}</p>
                  <p className={s.perfekt}>detrás: {c.follows}</p>
                  <p className={s.example}>
                    <button className={s.sayInline} onClick={() => speak(c.example)} aria-label={`Escuchar ${c.example}`}>
                      <SpeakerHigh size={14} />
                    </button>{" "}
                    <span lang="en" className="marker">{c.example}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        );
      })}

      <h2 className={s.groupTitle}>Los cuatro calcos de conector</h2>
      <div className={s.verbGrid}>
        {enb1ConnectorTraps.map(([wrong, right, why]) => (
          <article key={wrong} className={`${s.qCard} paper`}>
            <EnA2WrongRight wrong={wrong} right={right} why={why} />
          </article>
        ))}
      </div>
    </section>
  );
}

function EnB1TrapsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Falsos amigos que rompen la comprensión</h2>
      <p className={s.verbEs}>
        Estos no se notan, y por eso son los peores: la frase es correcta, se entiende bien y
        significa otra cosa. Nadie te va a pedir que la repitas.
      </p>
      <div className={s.qGrid}>
        {enb1FalseFriends.map((f) => (
          <article key={f.wrong} className={`${s.qCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf}>{f.es}</span>
              <button className={s.sayBtn} onClick={() => speak(f.right)} aria-label={`Escuchar ${f.right}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.example} style={{ marginTop: 0 }}>
              <span style={{ color: "var(--err)" }}>❌ <span lang="en">{f.wrong}</span></span>
              <br />
              <span className={s.exampleEs}>= {f.means}</span>
              <br />
              <span lang="en" className="marker">✓ {f.right}</span>
            </p>
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>Trampas del B1 — las que fosilizan si nadie interviene</h2>
      <p className={s.verbEs}>
        Las del A2 se caen solas con el uso. Estas no: aparecen cuando YA se habla y sobreviven
        en corpus de universitarios avanzados, porque no impiden comunicarse.
      </p>
      <div className={s.verbGrid}>
        {enb1Traps.map((t) => (
          <article key={t.id} className={`${s.qCard} paper`}>
            <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
            <EnA2WrongRight wrong={t.wrong} right={t.right} why={t.why} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function LibretaEnB1({ tab }: { tab: string }) {
  return (
    <>
      {tab === "enb1tiempos" && <EnB1TensesTab />}
      {tab === "enb1pasiva" && <EnB1PassiveTab />}
      {tab === "enb1indirecto" && <EnB1ReportedTab />}
      {tab === "enb1condicionales" && <EnB1ConditionalsTab />}
      {tab === "enb1relativas" && <EnB1RelativesTab />}
      {tab === "enb1patterns" && <EnB1PatternsTab />}
      {tab === "enb1prep" && <EnB1PrepTab />}
      {tab === "enb1phrasal" && <EnB1PhrasalTab />}
      {tab === "enb1conectores" && <EnB1ConnectorsTab />}
      {tab === "enb1trampas" && <EnB1TrapsTab />}
    </>
  );
}
