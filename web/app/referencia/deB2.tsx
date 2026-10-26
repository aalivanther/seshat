"use client";

// Alemán B2. Konjunktiv I, nominalización, Passiversatz, dos piezas, rección y trampas.

import { refModules } from "@/data/refs.gen";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";

const b2ref = refModules.b2;
const k1Forms = b2ref?.k1Forms ?? [];
const K1_TIP = b2ref?.K1_TIP ?? "";
const k1SubstitutionRule = b2ref?.k1SubstitutionRule;
const NOMINAL_TIP = b2ref?.NOMINAL_TIP ?? "";
const nominalSuffixes = b2ref?.nominalSuffixes ?? [];
const nominalPairs = b2ref?.nominalPairs ?? [];
const PASSIVERSATZ_TIP = b2ref?.PASSIVERSATZ_TIP ?? "";
const passiversatzTable = b2ref?.passiversatzTable ?? [];
const zweiTeileKonnektoren = b2ref?.zweiTeileKonnektoren ?? [];
const kultKonnektoren = b2ref?.kultKonnektoren ?? [];
const REKTION_B2_TIP = b2ref?.REKTION_B2_TIP ?? "";
const rektionNomen = b2ref?.rektionNomen ?? [];
const rektionAdjektive = b2ref?.rektionAdjektive ?? [];
const trapsB2 = b2ref?.trapsB2 ?? [];

export function LibretaDeB2({ tab }: { tab: string }) {
  return (
    <>
      {tab === "k1" && (
        <section>
          <h2 className={s.groupTitle}>Konjunktiv I — citar sin firmar</h2>
          {K1_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{K1_TIP}</p>}
          {k1SubstitutionRule && <p className={s.verbEs} style={{ marginBottom: 14 }}>{k1SubstitutionRule.body}</p>}
          <div className={s.verbGrid}>
            {k1Forms.map((f) => (
              <article key={f.inf} className={`${s.verbCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="de">{f.inf} → {f.k1}</span>
                  <button className={s.sayBtn} onClick={() => speak(f.k1)} aria-label={`Escuchar ${f.k1}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{f.es}</p>
                <table className={s.conjTable}>
                  <tbody>
                    {f.rows.map(([p, form]) => (
                      <tr key={p}><td>{p}</td><td lang="de"><b>{form}</b></td></tr>
                    ))}
                  </tbody>
                </table>
                <p className={`${s.trap} hand`}>{f.note}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "nominal" && (
        <section>
          <h2 className={s.groupTitle}>Nominalización — del verbo al nombre</h2>
          {NOMINAL_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{NOMINAL_TIP}</p>}
          <div className={s.verbGrid}>
            {nominalSuffixes.map((x) => (
              <article key={x.suffix} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf} lang="de">{x.suffix}</span></header>
                <p className={s.verbEs}>{x.es}</p>
              </article>
            ))}
            {nominalPairs.map((p) => (
              <article key={p.sub} className={`${s.qCard} paper`}>
                <p className={s.example}><span lang="de" className="marker">{p.sub} → {p.prep}</span><br /><span className={s.exampleEs}>{p.es}</span></p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "passiversatz" && (
        <section>
          <h2 className={s.groupTitle}>Passiversatz — el «se» sin pasiva de werden</h2>
          {PASSIVERSATZ_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{PASSIVERSATZ_TIP}</p>}
          <div className={s.verbGrid}>
            {passiversatzTable.map((r) => (
              <article key={r.form} className={`${s.qCard} paper`}>
                <p className={s.example} lang="de">{r.de}</p>
                <p className={s.verbEs}>{r.es} · {r.when}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "zweistueck" && (
        <section>
          <h2 className={s.groupTitle}>Conectores de dos piezas</h2>
          <div className={s.verbGrid}>
            {zweiTeileKonnektoren.map((k) => (
              <article key={k.de} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf} lang="de">{k.de}</span></header>
                <p className={s.verbEs}>{k.es}</p>
                <p className={s.example} lang="de">{k.example}</p>
              </article>
            ))}
            {kultKonnektoren.map((k) => (
              <article key={k.de} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf} lang="de">{k.de}</span></header>
                <p className={s.verbEs}>{k.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "rektionb2" && (
        <section>
          <h2 className={s.groupTitle}>Rección de nombres y adjetivos</h2>
          {REKTION_B2_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{REKTION_B2_TIP}</p>}
          <div className={s.verbGrid}>
            {rektionNomen.map((r) => (
              <article key={r.nomen} className={`${s.qCard} paper`}>
                <p className={s.example} lang="de">{r.nomen} {r.prep}</p>
                <p className={s.verbEs}>{r.es}</p>
              </article>
            ))}
            {rektionAdjektive.map((r) => (
              <article key={r.adj} className={`${s.qCard} paper`}>
                <p className={s.example} lang="de">{r.adj} {r.prep}</p>
                <p className={s.verbEs}>{r.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "trampasb2" && (
        <section>
          <h2 className={s.groupTitle}>Trampas del B2</h2>
          <div className={s.verbGrid}>
            {trapsB2.map((t) => (
              <article key={t.id} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
                <p className={`${s.trap} hand`}>❌ {t.wrong}</p>
                <p className={s.example} lang="de">{t.right}</p>
                <p className={s.verbEs}>{t.why}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
