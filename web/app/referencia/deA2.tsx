"use client";

// Alemán A2 (Perfekt, pasado, anclas, narración). Misma razón que el A1:
// una libreta por fichero, la página solo compone.

import { useMemo, useState } from "react";
import type { ParticipleEntry } from "@/data/referenceA2";
import { refModules } from "@/data/course.gen";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";

// Drop-gated: si el módulo no viaja, el ?? deja la sección vacía y la página
// no ofrece el nivel. Cero fuga de un drop que no se compró.
const a2ref = refModules.a2;
const participles = a2ref?.participles ?? [];
const pastTables = a2ref?.pastTables ?? [];
const connectors = a2ref?.connectors ?? [];
const a2Anchors = a2ref?.a2Anchors ?? [];
const GROUP_LABEL = a2ref?.GROUP_LABEL ?? ({} as Record<string, string>);

export function LibretaDeA2({ tab }: { tab: string }) {
  const [partFilter, setPartFilter] = useState("");
  const partGroups = useMemo(() => {
    const q = partFilter.trim().toLowerCase();
    const filtered = q
      ? participles.filter((p) => p.inf.includes(q) || p.partizip.includes(q) || p.es.toLowerCase().includes(q))
      : participles;
    const order: ParticipleEntry["group"][] = ["regular", "irregular", "sin-ge", "sein"];
    return order
      .map((g) => ({ group: g, list: filtered.filter((p) => p.group === g) }))
      .filter((g) => g.list.length > 0);
  }, [partFilter]);

  return (
    <>
      {tab === "perfekt" && (
        <section>
          <input
            className={s.search}
            placeholder="Busca un participio (alemán o español)..."
            value={partFilter}
            onChange={(e) => setPartFilter(e.target.value)}
          />
          {partGroups.map((g) => (
            <div key={g.group}>
              <h2 className={s.groupTitle}>{GROUP_LABEL[g.group]}</h2>
              <div className={s.verbGrid}>
                {g.list.map((p) => (
                  <article key={p.inf} className={`${s.qCard} paper`}>
                    <header className={s.verbHead}>
                      <span className={s.verbInf} lang="de">{p.inf}</span>
                      <button className={s.sayBtn} onClick={() => speak(`${p.inf}. Ich habe... ${p.aux === "sein" ? "Ich bin" : "Ich habe"} ${p.partizip}`)} aria-label={`Escuchar ${p.inf} y su participio`}>
                        <SpeakerHigh size={16} />
                      </button>
                    </header>
                    <p className={s.verbEs}>{p.es}</p>
                    <p className={s.perfekt} lang="de">
                      <b>{p.aux}</b> ... <b className={p.aux === "sein" ? "marker" : ""}>{p.partizip}</b>
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "pasado" && (
        <section className={s.verbGrid}>
          {pastTables.map((t) => (
            <article key={t.title} className={`${s.verbCard} paper`}>
              <header className={s.verbHead}>
                <span className={s.verbInf} lang="de">{t.title}</span>
                <button className={s.sayBtn} onClick={() => speak(t.rows.map((r) => r.join(" ")).join(". "))} aria-label={`Escuchar ${t.title}`}>
                  <SpeakerHigh size={16} />
                </button>
              </header>
              <p className={s.verbEs}>{t.es}</p>
              <table className={s.conjTable}>
                <tbody>
                  {t.rows.map(([pron, form]) => (
                    <tr key={pron}>
                      <td className={s.pronoun}>{pron}</td>
                      <td lang="de"><b>{form}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={`${s.trap} hand`}>{t.tip}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "anclas" && (
        <section>
          <h2 className={s.groupTitle}>Dativo, Wechsel, weil y comparativo</h2>
          {a2Anchors.map((t) => (
            <article key={t.title} className={`${s.qCard} paper`} style={{ marginBottom: 12 }}>
              <header className={s.verbHead}>
                <span className={s.verbInf} lang="de">{t.title}</span>
              </header>
              <p className={s.verbEs}>{t.es}</p>
              <table className={s.conjTable}>
                <tbody>
                  {t.rows.map((row) => (
                    <tr key={row[0]}>
                      <td lang="de">{row[0]}</td>
                      <td>{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={`${s.trap} hand`}>{t.tip}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "conectores" && (
        <section>
          <h2 className={s.groupTitle}>El pegamento de contar en pasado</h2>
          <div className={s.verbGrid}>
            {connectors.map((c) => (
              <article key={c.de} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="de">{c.de}</span>
                  <button className={s.sayBtn} onClick={() => speak(c.example)} aria-label={`Escuchar ejemplo de ${c.de}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{c.es}</p>
                <p className={s.example}>
                  <span lang="de" className="marker">{c.example}</span>
                  <br />
                  <span className={s.exampleEs}>{c.exampleEs}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
