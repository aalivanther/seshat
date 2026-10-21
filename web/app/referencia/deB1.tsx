"use client";

// Alemán B1. Rección, conectores, Konjunktiv II, pasiva, adjetivos y trampas.

import { refModules } from "@/data/course.gen";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";

const b1ref = refModules.b1;
// ── libreta B1 (drop 5) ──
const k2Forms = b1ref?.k2Forms ?? [];
const k2Uses = b1ref?.k2Uses ?? [];
const k2WuerdeRule = b1ref?.k2WuerdeRule;
const passivTable = b1ref?.passivTable ?? [];
const passivAgent = b1ref?.passivAgent;
const passivVsSe = b1ref?.passivVsSe;
const rektionGroups = b1ref?.rektionGroups ?? [];
const daWoRule = b1ref?.daWoRule;
const konnektoren = b1ref?.konnektoren ?? [];
const KONN_EFFECT_LABEL = b1ref?.KONN_EFFECT_LABEL ?? ({} as Record<string, string>);
const konnektorenRule = b1ref?.konnektorenRule;
const adjektivTables = b1ref?.adjektivTables ?? [];
const adjektivRule = b1ref?.adjektivRule;
const falseFriendsB1 = b1ref?.falseFriendsB1 ?? [];
const trapsB1 = b1ref?.trapsB1 ?? [];

export function LibretaDeB1({ tab }: { tab: string }) {
  return (
    <>
      {tab === "rektion" && (
        <section>
          <h2 className={s.groupTitle}>Verbos con preposición — se aprenden en bloque</h2>
          {daWoRule && (
            <p className={s.verbEs} style={{ marginBottom: 14 }}>
              <b>{daWoRule.title}</b> {daWoRule.body}
              <br />
              <span className={s.exampleEs}>
                {daWoRule.people.label}: <span lang="de">{daWoRule.people.de}</span> — {daWoRule.people.es}
              </span>
            </p>
          )}
          {rektionGroups.map((g) => (
            <div key={g.prep + g.kasus} style={{ marginBottom: 22 }}>
              <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>
                <span lang="de">{g.prep}</span> + {g.kasus} · <span lang="de">{g.wo}</span> / <span lang="de">{g.da}</span>
              </h3>
              <p className={s.verbEs}>{g.hint}</p>
              <div className={s.verbGrid}>
                {g.verbs.map((v) => (
                  <article key={v.verb} className={`${s.qCard} paper`}>
                    <header className={s.verbHead}>
                      <span className={s.verbInf} lang="de">{v.verb}</span>
                      <button className={s.sayBtn} onClick={() => speak(v.example)} aria-label={`Escuchar ${v.verb}`}>
                        <SpeakerHigh size={16} />
                      </button>
                    </header>
                    <p className={s.verbEs}>{v.es}</p>
                    <p className={s.example}>
                      <span lang="de" className="marker">{v.example}</span>
                      <br />
                      <span className={s.exampleEs}>{v.exampleEs}</span>
                    </p>
                    {v.trap && <p className={`${s.trap} hand`}>ojo al calco: ❌ {v.trap}</p>}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "konnektoren" && (
        <section>
          <h2 className={s.groupTitle}>Conectores — lo que cada uno le hace al verbo</h2>
          {konnektorenRule && <p className={s.verbEs} style={{ marginBottom: 14 }}>{konnektorenRule.body}</p>}
          {konnektoren.map((g) => (
            <div key={g.fn} style={{ marginBottom: 22 }}>
              <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>{g.fn}</h3>
              <p className={s.verbEs}>{g.hint}</p>
              <div className={s.verbGrid}>
                {g.items.map((k) => (
                  <article key={k.de} className={`${s.qCard} paper`}>
                    <header className={s.verbHead}>
                      <span className={s.verbInf} lang="de">{k.de}</span>
                      <button className={s.sayBtn} onClick={() => speak(k.example)} aria-label={`Escuchar ${k.de}`}>
                        <SpeakerHigh size={16} />
                      </button>
                    </header>
                    <p className={s.verbEs}>
                      {k.es} · <b>{KONN_EFFECT_LABEL[k.effect] ?? k.effect}</b>
                    </p>
                    <p className={s.example}>
                      <span lang="de" className="marker">{k.example}</span>
                      <br />
                      <span className={s.exampleEs}>{k.exampleEs}</span>
                    </p>
                    {k.trap && <p className={`${s.trap} hand`}>❌ {k.trap}</p>}
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {tab === "k2" && (
        <section>
          <h2 className={s.groupTitle}>Konjunktiv II — las formas que NO admiten würde</h2>
          {k2WuerdeRule && <p className={s.verbEs} style={{ marginBottom: 14 }}>{k2WuerdeRule.body}</p>}
          <div className={s.verbGrid}>
            {k2Forms.map((f) => (
              <article key={f.inf} className={`${s.verbCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="de">{f.inf} → {f.k2}</span>
                  <button className={s.sayBtn} onClick={() => speak(f.k2)} aria-label={`Escuchar ${f.k2}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{f.es}</p>
                <table className={s.conjTable}>
                  <tbody>
                    {f.rows.map(([p, form]) => (
                      <tr key={p}>
                        <td>{p}</td>
                        <td lang="de"><b>{form}</b></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className={`${s.trap} hand`}>{f.note}</p>
              </article>
            ))}
          </div>
          <h3 className={s.groupTitle} style={{ fontSize: "1.05rem", marginTop: 24 }}>Para qué se usa</h3>
          <div className={s.verbGrid}>
            {k2Uses.map((u) => (
              <article key={u.id} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf}>{u.label}</span>
                </header>
                <p className={s.verbEs}>{u.when}</p>
                {u.examples.map((ex2) => (
                  <p key={ex2.de} className={s.example}>
                    <span lang="de" className="marker">{ex2.de}</span>
                    <br />
                    <span className={s.exampleEs}>{ex2.es}</span>
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "passiv" && (
        <section>
          <h2 className={s.groupTitle}>Passiv — cuando importa QUÉ pasa, no quién lo hace</h2>
          <div className={s.verbGrid}>
            {passivTable.map((r) => (
              <article key={r.tense} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf}>{r.tense}</span>
                  <button className={s.sayBtn} onClick={() => speak(r.de)} aria-label={`Escuchar ${r.tense}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}><code>{r.formula}</code></p>
                <p className={s.example}>
                  <span lang="de" className="marker">{r.de}</span>
                  <br />
                  <span className={s.exampleEs}>{r.es}</span>
                </p>
                {r.note && <p className={`${s.trap} hand`}>{r.note}</p>}
              </article>
            ))}
          </div>
          {passivVsSe && (
            <>
              <h3 className={s.groupTitle} style={{ fontSize: "1.05rem", marginTop: 24 }}>{passivVsSe.title}</h3>
              <p className={s.verbEs}>{passivVsSe.intro}</p>
              <div className={s.verbGrid}>
                {passivVsSe.options.map((o) => (
                  <article key={o.label} className={`${s.qCard} paper`}>
                    <header className={s.verbHead}><span className={s.verbInf}>{o.label}</span></header>
                    <p className={s.example}>
                      <span lang="de" className="marker">{o.de}</span>
                      <br />
                      <span className={s.exampleEs}>{o.es}</span>
                    </p>
                    <p className={`${s.trap} hand`}>{o.when}</p>
                  </article>
                ))}
              </div>
            </>
          )}
          {passivAgent && (
            <div style={{ marginTop: 16 }}>
              <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>{passivAgent.title}</h3>
              {[passivAgent.von, passivAgent.durch].map((x) => (
                <p key={x.label} className={s.example}>
                  <b>{x.label}</b>
                  <br />
                  <span lang="de" className="marker">{x.example.de}</span>
                  <br />
                  <span className={s.exampleEs}>{x.example.es}</span>
                </p>
              ))}
              <p className={`${s.trap} hand`}>{passivAgent.tip}</p>
            </div>
          )}
        </section>
      )}

      {tab === "adjektive" && (
        <section>
          <h2 className={s.groupTitle}>Adjetivos declinados — las tres tablas</h2>
          {adjektivRule && (
            <p className={s.verbEs} style={{ marginBottom: 14 }}>
              <b>{adjektivRule.title}</b> {adjektivRule.body}
              {adjektivRule.survival && <><br /><br />{adjektivRule.survival}</>}
            </p>
          )}
          {adjektivTables.map((t) => (
            <article key={t.id} className={`${s.verbCard} paper`} style={{ marginBottom: 18 }}>
              <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
              <p className={s.verbEs}>{t.subtitle}</p>
              <div style={{ overflowX: "auto" }}>
                <table className={s.conjTable}>
                  <thead>
                    <tr>{t.head.map((h) => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {t.rows.map((row) => (
                      <tr key={row[0]}>
                        {row.map((c, i) => (
                          <td key={i} lang={i === 0 ? undefined : "de"}>{i === 0 ? c : <b>{c}</b>}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`${s.trap} hand`}>{t.tip}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "trampas" && (
        <section>
          <h2 className={s.groupTitle}>Trampas del B1 — lo que delata a un hispanohablante</h2>
          <div className={s.verbGrid}>
            {trapsB1.map((t) => (
              <article key={t.id} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
                <p className={s.example}>
                  <span style={{ color: "var(--bad, #dc2626)" }}>❌ {t.wrong}</span>
                  <br />
                  <span lang="de" className="marker">✓ {t.right}</span>
                </p>
                <p className={`${s.trap} hand`}>{t.why}</p>
              </article>
            ))}
          </div>
          <h3 className={s.groupTitle} style={{ fontSize: "1.05rem", marginTop: 24 }}>Falsos amigos</h3>
          <div className={s.verbGrid}>
            {falseFriendsB1.map((f) => (
              <article key={f.de} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="de">{f.de}</span>
                  <button className={s.sayBtn} onClick={() => speak(f.example)} aria-label={`Escuchar ${f.de}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>
                  significa <b>{f.means}</b> — no «{f.sounds}» (eso es {f.instead})
                </p>
                <p className={s.example}>
                  <span lang="de" className="marker">{f.example}</span>
                  <br />
                  <span className={s.exampleEs}>{f.exampleEs}</span>
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
