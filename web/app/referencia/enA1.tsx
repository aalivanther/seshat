"use client";

// Inglés A1. Verbos, preguntas, sonidos, números e irregulares.

import { useMemo, useState } from "react";
import type { EnNumberEntry, EnVerbEntry } from "@/data/en/referenceEn";
import { refModules } from "@/data/refs.gen";
import { sanitizeNoteHtml } from "@/lib/sanitize";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";

const enref = refModules.en;
const enVerbs = enref?.enVerbs ?? [];
const EN_VERB_GROUP_LABEL = enref?.EN_VERB_GROUP_LABEL ?? ({} as Record<string, string>);
const EN_THIRD_SOUND_TIP = enref?.EN_THIRD_SOUND_TIP ?? "";
const enQuestions = enref?.enQuestions ?? [];
const enQuestionGroups = enref?.enQuestionGroups ?? [];
const enPronContrasts = enref?.enPronContrasts ?? [];
const enNumbers = enref?.enNumbers ?? [];
const EN_NUMBER_KIND_LABEL = enref?.EN_NUMBER_KIND_LABEL ?? ({} as Record<string, string>);
const enIrregularPlurals = enref?.enIrregularPlurals ?? [];
const enPastBe = enref?.enPastBe ?? { title: "", es: "", rows: [] as [string, string][], tip: "" };

/* ══════════ La libreta INGLESA — cinco pestañas propias del A1 ══════════ */

// chip de color para el sonido de la -s de 3ª persona (la clínica del m4)
const EN_THIRD_CHIP: Record<EnVerbEntry["thirdSound"], { bg: string; fg: string }> = {
  "/s/": { bg: "var(--ok-soft)", fg: "var(--ok)" },
  "/z/": { bg: "var(--accent-soft)", fg: "var(--accent-text)" },
  "/ɪz/": { bg: "var(--err-soft)", fg: "var(--err)" },
};

function EnSoundChip({ sound }: { sound: EnVerbEntry["thirdSound"] }) {
  const c = EN_THIRD_CHIP[sound];
  return (
    <span
      style={{
        background: c.bg, color: c.fg, fontWeight: 800, fontSize: "0.8125rem",
        padding: "1px 8px", borderRadius: 999, whiteSpace: "nowrap",
      }}
    >
      {sound}
    </span>
  );
}

function EnVerbsTab() {
  const [filter, setFilter] = useState("");
  const groups = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const filtered = q
      ? enVerbs.filter((v) =>
          v.base.toLowerCase().includes(q) || v.third.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q))
      : enVerbs;
    const order: EnVerbEntry["group"][] = ["irregular-a1", "regular"];
    return order
      .map((g) => ({ group: g, list: filtered.filter((v) => v.group === g) }))
      .filter((g) => g.list.length > 0);
  }, [filter]);

  return (
    <section>
      <input
        className={s.search}
        placeholder="Busca un verbo (inglés o español)..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>La -s que se oye</h3>
        <p className={s.patternBody}>{EN_THIRD_SOUND_TIP}</p>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>
          {(["works", "goes", "watches"] as const).map((w, i) => (
            <span key={w} style={{ marginRight: 14 }}>
              <button className={s.sayInline} onClick={() => speak(w)} aria-label={`Escuchar ${w}`}>
                <SpeakerHigh size={14} />
              </button>{" "}
              <b lang="en">{w}</b> <EnSoundChip sound={(["/s/", "/z/", "/ɪz/"] as const)[i]} />
            </span>
          ))}
        </p>
      </article>

      {groups.map((g) => (
        <div key={g.group}>
          <h2 className={s.groupTitle}>{EN_VERB_GROUP_LABEL[g.group]}</h2>
          <div className={s.verbGrid}>
            {g.list.map((v) => (
              <article key={v.id} className={`${s.verbCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="en">{v.base}</span>
                  <button className={s.sayBtn} onClick={() => speak(v.base)} aria-label={`Escuchar ${v.base}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{v.meaning}{v.sound ? <span className={s.verbSound}> · {v.sound}</span> : null}</p>
                <p className={s.perfekt}>
                  he/she/it: <b lang="en">{v.third}</b> <EnSoundChip sound={v.thirdSound} />{" "}
                  <button className={s.sayInline} onClick={() => speak(v.third)} aria-label={`Escuchar ${v.third}`}>
                    <SpeakerHigh size={14} />
                  </button>
                </p>
                {v.spellRule && <p className={s.perfekt}>{v.spellRule}</p>}
                <p className={s.perfekt}>
                  negación: <b lang="en">{v.negative}</b>{" "}
                  <button className={s.sayInline} onClick={() => speak(v.negative.replace(/\s*\/\s*/g, ". "))} aria-label="Escuchar la negación">
                    <SpeakerHigh size={14} />
                  </button>
                </p>
                {v.contractions && (
                  <p className={s.perfekt}>
                    contracciones:{" "}
                    {v.contractions.map((c) => (
                      <span key={c} lang="en" style={{ background: "var(--panel)", borderRadius: 999, padding: "1px 8px", marginRight: 6, whiteSpace: "nowrap", fontWeight: 700 }}>
                        {c}
                      </span>
                    ))}
                  </p>
                )}
                {v.example && (
                  <p className={s.example}>
                    <button className={s.sayInline} onClick={() => speak(v.example!.en)} aria-label="Escuchar el ejemplo">
                      <SpeakerHigh size={14} />
                    </button>{" "}
                    <span lang="en" className="marker">{v.example.en}</span>
                    <br />
                    <span className={s.exampleEs}>{v.example.es}</span>
                  </p>
                )}
                {v.trap && <p className={`${s.trap} hand`}>⚠ {v.trap}</p>}
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// fichas de color del orden de la pregunta — la misma pedagogía que la
// Satzklammer alemana: el orden SE VE antes de entenderse
const EN_Q_CHIP: Record<"qw" | "aux" | "subj" | "rest", { bg: string; fg: string; label: string }> = {
  qw: { bg: "var(--warn-soft)", fg: "var(--warn)", label: "pregunta" },
  aux: { bg: "var(--accent-soft)", fg: "var(--accent-text)", label: "auxiliar" },
  subj: { bg: "var(--ok-soft)", fg: "var(--ok)", label: "sujeto" },
  rest: { bg: "var(--panel)", fg: "var(--text-2)", label: "verbo y resto" },
};

function enChipRole(i: number, hasQword: boolean): keyof typeof EN_Q_CHIP {
  if (hasQword) return i === 0 ? "qw" : i === 1 ? "aux" : i === 2 ? "subj" : "rest";
  return i === 0 ? "aux" : i === 1 ? "subj" : "rest";
}

function EnQuestionsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>El orden es el contenido</h2>
      <p className={s.verbEs}>
        Cada pregunta va montada con fichas de color — míralas hasta que el orden se te quede en el ojo:{" "}
        {(Object.keys(EN_Q_CHIP) as (keyof typeof EN_Q_CHIP)[]).map((k) => (
          <span key={k} style={{ background: EN_Q_CHIP[k].bg, color: EN_Q_CHIP[k].fg, fontWeight: 800, fontSize: "0.8125rem", padding: "1px 8px", borderRadius: 999, marginRight: 6, whiteSpace: "nowrap" }}>
            {EN_Q_CHIP[k].label}
          </span>
        ))}
      </p>
      {enQuestionGroups.map((grp) => {
        const list = enQuestions.filter((q) => q.aux === grp.aux);
        return (
          <div key={grp.aux}>
            <article className={`${s.patternCard} paper`} style={{ marginTop: 22 }}>
              <h3 className={s.patternTitle}>{grp.title}</h3>
              <p className={s.patternBody} style={{ marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: sanitizeNoteHtml(grp.body) }} />
            </article>
            <div className={s.qGrid}>
              {list.map((q) => (
                <article key={q.id} className={`${s.qCard} paper`}>
                  <header className={s.verbHead}>
                    <span style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                      {q.pattern.split(" + ").map((part, i) => {
                        const role = enChipRole(i, Boolean(q.qword));
                        const c = EN_Q_CHIP[role];
                        return (
                          <span key={i} lang="en" style={{ background: c.bg, color: c.fg, fontWeight: role === "aux" ? 800 : 700, padding: "2px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
                            {part}
                          </span>
                        );
                      })}
                    </span>
                    <button className={s.sayBtn} onClick={() => speak(q.example)} aria-label="Escuchar la pregunta">
                      <SpeakerHigh size={16} />
                    </button>
                  </header>
                  {q.sound && <p className={s.verbEs}><span className={s.verbSound}>{q.sound}</span></p>}
                  <p className={s.example}>
                    <span lang="en" className="marker">{q.example}</span>
                    <br />
                    <span className={s.exampleEs}>{q.exampleEs}</span>
                  </p>
                  <p className={s.perfekt}>
                    eco del auxiliar:{" "}
                    <button className={s.sayInline} onClick={() => speak(`${q.shortYes} ${q.shortNo}`)} aria-label="Escuchar las respuestas cortas">
                      <SpeakerHigh size={14} />
                    </button>{" "}
                    <b lang="en">{q.shortYes}</b> · <b lang="en">{q.shortNo}</b>
                  </p>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function EnSoundsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Los 10 contrastes que deciden que te entiendan</h2>
      <p className={s.verbEs}>
        Ordenados por lo que más estorba si falla — los primeros seis deciden la comprensión, los
        últimos cuatro son pulido. Toca las dos bocinas de cada par hasta que tu oído los separe:
        el día que los oyes distintos, ya casi los dices distintos.
      </p>
      {enPronContrasts.map((c, i) => (
        <article key={c.id} className={`${s.patternCard} paper`}>
          <h3 className={s.patternTitle}>
            {i + 1} · <span lang="en">{c.title.split(" — ")[0]}</span>
            {c.title.includes(" — ") ? ` — ${c.title.split(" — ")[1]}` : ""}{" "}
            <span style={{ background: c.fl === "alto" ? "var(--err-soft)" : "var(--panel)", color: c.fl === "alto" ? "var(--err)" : "var(--text-2)", fontWeight: 800, fontSize: "0.75rem", padding: "1px 8px", borderRadius: 999, verticalAlign: "2px", whiteSpace: "nowrap" }}>
              {c.fl === "alto" ? "decide la comprensión" : "pulido fino"}
            </span>
          </h3>
          <p className={s.patternBody}>{c.how}</p>
          <ul className={s.patternList}>
            {c.pairs.map((p, j) => (
              <li key={j}>
                <button className={s.sayInline} onClick={() => speak(p.a)} aria-label={`Escuchar ${p.a}`}>
                  <SpeakerHigh size={14} />
                </button>{" "}
                <b lang="en">{p.a}</b>
                {" · "}
                <button className={s.sayInline} onClick={() => speak(p.b)} aria-label={`Escuchar ${p.b}`}>
                  <SpeakerHigh size={14} />
                </button>{" "}
                <b lang="en">{p.b}</b> — <span className={s.exampleEs}>{p.es}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}

function EnNumbersTab() {
  const kinds: EnNumberEntry["kind"][] = ["number", "ordinal", "time", "price", "date", "phone"];
  return (
    <section>
      <h2 className={s.groupTitle}>Números, fechas y precios — la munición del examen de oído</h2>
      <p className={s.verbEs}>
        El Listening del examen vive de esto: un número, una hora, un precio. Escúchalos aquí hasta
        que 13 y 30 dejen de parecerse.
      </p>
      {kinds.map((kind) => {
        const list = enNumbers.filter((n) => n.kind === kind);
        if (!list.length) return null;
        return (
          <div key={kind}>
            <h2 className={s.groupTitle} style={{ fontSize: "1.02rem" }}>{EN_NUMBER_KIND_LABEL[kind]}</h2>
            <div className={s.qGrid}>
              {list.map((n) => (
                <article key={n.id} className={`${s.qCard} paper`}>
                  <header className={s.verbHead}>
                    <span className={s.verbInf} lang="en">{n.target}</span>
                    <button className={s.sayBtn} onClick={() => speak(n.target)} aria-label="Escuchar">
                      <SpeakerHigh size={16} />
                    </button>
                  </header>
                  <p className={s.verbEs}>{n.source}<span className={s.verbSound}> · {n.sound}</span></p>
                  {n.trap && <p className={`${s.trap} hand`}>⚠ {n.trap}</p>}
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function EnIrregularsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Plurales rebeldes — pocos, pero salen en todas partes</h2>
      <p className={s.verbEs}>
        El inglés A1 tiene solo un puñado de plurales sin -s… y son justo las palabras de tu día a
        día. Apréndetelos como parejas de sonido: la vocal hace el trabajo.
      </p>
      <div className={s.qGrid}>
        {enIrregularPlurals.map((p) => (
          <article key={p.id} className={`${s.qCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf} lang="en">{p.singular} → {p.plural}</span>
              <button className={s.sayBtn} onClick={() => speak(`${p.singular}. ${p.plural}.`)} aria-label={`Escuchar ${p.singular} y ${p.plural}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.verbEs}>{p.es}<span className={s.verbSound}> · {p.sound}</span></p>
            {p.trap && <p className={`${s.trap} hand`}>⚠ {p.trap}</p>}
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>El pasado de be — solo para el oído</h2>
      <div className={s.verbGrid}>
        <article className={`${s.verbCard} paper`}>
          <header className={s.verbHead}>
            <span className={s.verbInf} lang="en">{enPastBe.title}</span>
            <button className={s.sayBtn} onClick={() => speak(enPastBe.rows.map((r) => r.join(" ")).join(". "))} aria-label={`Escuchar ${enPastBe.title}`}>
              <SpeakerHigh size={16} />
            </button>
          </header>
          <p className={s.verbEs}>{enPastBe.es}</p>
          <table className={s.conjTable}>
            <tbody>
              {enPastBe.rows.map(([pron, form]) => (
                <tr key={pron}>
                  <td className={s.pronoun} lang="en">{pron}</td>
                  <td lang="en"><b>{form}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={`${s.trap} hand`}>{enPastBe.tip}</p>
        </article>
      </div>
    </section>
  );
}

export function LibretaEnA1({ tab }: { tab: string }) {
  return (
    <>
      {tab === "verbos" && <EnVerbsTab />}
      {tab === "preguntas" && <EnQuestionsTab />}
      {tab === "sonidos" && <EnSoundsTab />}
      {tab === "numeros" && <EnNumbersTab />}
      {tab === "irregulares" && <EnIrregularsTab />}
    </>
  );
}
