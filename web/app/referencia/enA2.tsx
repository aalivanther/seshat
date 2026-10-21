"use client";

// Inglés A2. Ocho pestañas que el A1 no tenía.

import { refModules } from "@/data/course.gen";
import { SpeakerHigh } from "@phosphor-icons/react";
import { speak } from "@/lib/tts";
import s from "./referencia.module.css";
import { EnA2WrongRight } from "./piezas";

const ena2ref = refModules.ena2;
// ── libreta inglesa del A2 (drop 6) ──
const enA2IrregularFamilies = ena2ref?.enA2IrregularFamilies ?? [];
const EN_A2_IRREGULAR_TIP = ena2ref?.EN_A2_IRREGULAR_TIP ?? "";
const enA2PastAux = ena2ref?.enA2PastAux;
const enA2EdSounds = ena2ref?.enA2EdSounds ?? [];
const EN_A2_ED_TIP = ena2ref?.EN_A2_ED_TIP ?? "";
const enA2EdSpelling = ena2ref?.enA2EdSpelling ?? [];
const enA2ComparativeRules = ena2ref?.enA2ComparativeRules ?? [];
const enA2IrregularComparatives = ena2ref?.enA2IrregularComparatives ?? [];
const enA2CompareNotes = ena2ref?.enA2CompareNotes ?? [];
const EN_A2_UNCOUNTABLE_TIP = ena2ref?.EN_A2_UNCOUNTABLE_TIP ?? "";
const enA2Uncountables = ena2ref?.enA2Uncountables ?? [];
const enA2Quantifiers = ena2ref?.enA2Quantifiers ?? [];
const enA2SomeAny = ena2ref?.enA2SomeAny ?? [];
const EN_A2_SOMEANY_TIP = ena2ref?.EN_A2_SOMEANY_TIP ?? "";
const enA2ZeroArticle = ena2ref?.enA2ZeroArticle;
const enA2Futures = ena2ref?.enA2Futures ?? [];
const enA2FutureTraps = ena2ref?.enA2FutureTraps;
const enA2TimeClauses = ena2ref?.enA2TimeClauses;
const enA2Modals = ena2ref?.enA2Modals ?? [];
const EN_A2_MODAL_TIP = ena2ref?.EN_A2_MODAL_TIP ?? "";
const enA2Signs = ena2ref?.enA2Signs;
const enA2Pronouns = ena2ref?.enA2Pronouns ?? [];
const EN_A2_PRONOUN_TIP = ena2ref?.EN_A2_PRONOUN_TIP ?? "";
const enA2Possessives = ena2ref?.enA2Possessives;
const enA2Reflexives = ena2ref?.enA2Reflexives;
const enA2VerbObjects = ena2ref?.enA2VerbObjects;
const enA2Traps = ena2ref?.enA2Traps ?? [];

/* ══════════ La libreta INGLESA del A2 — ocho pestañas propias ══════════ */

/** «lo que quieres decir · cómo se dice · el porqué», con bocina en la columna
 *  inglesa: el formato de las notas del A2, que casi todas comparan dos mitades */
function EnA2RowsTable({ head, rows }: {
  head: [string, string, string];
  rows: readonly (readonly [string, string, string])[];
}) {
  return (
    <div className={`${s.soundTableWrap} paper`}>
      <table className={s.soundTable}>
        <thead>
          <tr><th>{head[0]}</th><th>{head[1]}</th><th>{head[2]}</th><th /></tr>
        </thead>
        <tbody>
          {rows.map(([a, b, c]) => (
            <tr key={`${a}|${b}`}>
              <td style={{ color: "var(--text-3)" }}>{a}</td>
              <td lang="en"><b>{b}</b></td>
              <td className={s.soundExamples}>{c}</td>
              <td>
                <button className={s.sayInline} onClick={() => speak(b)} aria-label={`Escuchar ${b}`}>
                  <SpeakerHigh size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EnA2PastTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Los irregulares, por familias de cambio vocálico</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Mientras te los aprendes</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_IRREGULAR_TIP}</p>
      </article>
      {enA2IrregularFamilies.map((f) => (
        <div key={f.id}>
          <h3 className={s.groupTitle} style={{ fontSize: "1.05rem" }}>
            {f.label} <span style={{ fontWeight: 600, color: "var(--text-3)" }}>· {f.change}</span>
          </h3>
          <p className={s.verbEs}>{f.hint}</p>
          <div className={s.qGrid}>
            {f.verbs.map((v) => (
              <article key={`${f.id}-${v.base}`} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="en">{v.base} → {v.past}</span>
                  <button className={s.sayBtn} onClick={() => speak(`${v.base}. ${v.past}.`)} aria-label={`Escuchar ${v.base} y ${v.past}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{v.es}{v.sound ? <span className={s.verbSound}> · {v.sound}</span> : null}</p>
                {v.trap && <p className={`${s.trap} hand`}>⚠ {v.trap}</p>}
              </article>
            ))}
          </div>
        </div>
      ))}

      {enA2PastAux && (
        <>
          <h2 className={s.groupTitle}>{enA2PastAux.title}</h2>
          <p className={s.verbEs}>{enA2PastAux.body}</p>
          <EnA2RowsTable head={["Qué frase es", "Cómo se dice", "Quién lleva la marca"]} rows={enA2PastAux.rows} />
          <div className={s.qGrid} style={{ marginTop: 14 }}>
            {enA2PastAux.traps.map((t) => (
              <article key={t.wrong} className={`${s.qCard} paper`}>
                <EnA2WrongRight wrong={t.wrong} right={t.right} />
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// lo que cuesta una terminación NO es lo mismo para una boca española: la
// libreta lo dice con color para que el reparto de tiempo se vea de un vistazo
function EnA2CostChip({ cost }: { cost: "barato" | "caro" }) {
  const caro = cost === "caro";
  return (
    <span
      style={{
        background: caro ? "var(--err-soft)" : "var(--ok-soft)",
        color: caro ? "var(--err)" : "var(--ok)",
        fontWeight: 800, fontSize: "0.75rem", padding: "1px 8px",
        borderRadius: 999, whiteSpace: "nowrap",
      }}
    >
      {caro ? "te va a costar" : "te sale sola"}
    </span>
  );
}

function EnA2EdTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>La -ed se escribe siempre igual y suena de tres maneras</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Dónde poner el esfuerzo</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_ED_TIP}</p>
      </article>
      <div className={s.verbGrid}>
        {enA2EdSounds.map((e) => (
          <article key={e.id} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf}>{e.sound}</span>
              <EnA2CostChip cost={e.cost} />
            </header>
            <p className={s.verbEs}>{e.when} — <b>{e.syllable}</b></p>
            <ul className={s.patternList}>
              {e.examples.map((x) => (
                <li key={x.verb}>
                  <button className={s.sayInline} onClick={() => speak(x.verb)} aria-label={`Escuchar ${x.verb}`}>
                    <SpeakerHigh size={14} />
                  </button>{" "}
                  <b lang="en">{x.verb}</b> <span className={s.verbSound}>{x.sound}</span>
                </li>
              ))}
            </ul>
            <p className={s.perfekt}>{e.why}</p>
            <p className={`${s.trap} hand`}>Cada cuánto: {e.train}</p>
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>Y cómo se escribe</h2>
      <div className={`${s.soundTableWrap} paper`}>
        <table className={s.soundTable}>
          <thead>
            <tr><th>Si el verbo…</th><th>Entonces</th><th>Ejemplos</th></tr>
          </thead>
          <tbody>
            {enA2EdSpelling.map((r) => (
              <tr key={r.rule}>
                <td style={{ color: "var(--text-3)" }}>{r.rule}</td>
                <td><b>{r.what}</b></td>
                <td lang="en" className={s.soundExamples}>{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function EnA2CompareTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Comparar: la marca se pone UNA vez</h2>
      <div className={`${s.soundTableWrap} paper`}>
        <table className={s.soundTable}>
          <thead>
            <tr><th>Si el adjetivo tiene…</th><th>Se compara así</th><th>Ejemplos</th></tr>
          </thead>
          <tbody>
            {enA2ComparativeRules.map((r) => (
              <tr key={r.syllables}>
                <td style={{ color: "var(--text-3)" }}>{r.syllables}</td>
                <td><b>{r.how}</b></td>
                <td lang="en" className={s.soundExamples}>{r.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={s.groupTitle}>Los tres que van por libre</h2>
      <div className={s.qGrid}>
        {enA2IrregularComparatives.map((c) => (
          <article key={c.adj} className={`${s.qCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf} lang="en">{c.adj} → {c.comp} → {c.sup}</span>
              <button className={s.sayBtn} onClick={() => speak(`${c.adj}. ${c.comp}. ${c.sup}.`)} aria-label={`Escuchar ${c.adj}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.verbEs}>{c.es}</p>
            {c.note && <p className={`${s.trap} hand`}>{c.note}</p>}
          </article>
        ))}
      </div>

      {enA2CompareNotes.map((n) => (
        <div key={n.id}>
          <article className={`${s.patternCard} paper`} style={{ marginTop: 22 }}>
            <h3 className={s.patternTitle}>{n.title}</h3>
            <p className={s.patternBody} style={{ marginBottom: 0 }}>{n.body}</p>
          </article>
          <EnA2RowsTable head={["Lo que quieres decir", "Cómo se dice", "Por qué"]} rows={n.rows} />
        </div>
      ))}
    </section>
  );
}

function EnA2QuantityTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Las diez que no se cuentan — lista cerrada, se aprende entera</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Lo que tienen en común</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_UNCOUNTABLE_TIP}</p>
      </article>
      <div className={s.qGrid}>
        {enA2Uncountables.map((u) => (
          <article key={u.en} className={`${s.qCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf} lang="en">{u.en}</span>
              <span
                style={{
                  background: u.verb === "are" ? "var(--warn-soft)" : "var(--panel)",
                  color: u.verb === "are" ? "var(--warn)" : "var(--text-2)",
                  fontWeight: 800, fontSize: "0.8125rem", padding: "1px 8px",
                  borderRadius: 999, whiteSpace: "nowrap",
                }}
                lang="en"
              >
                {u.verb}
              </span>
            </header>
            <p className={s.verbEs}>{u.es}</p>
            <p className={`${s.trap} hand`}>⚠ {u.trap}</p>
          </article>
        ))}
      </div>

      <h2 className={s.groupTitle}>Cuánto hay: con qué montón va cada cuantificador</h2>
      <div className={`${s.soundTableWrap} paper`}>
        <table className={s.soundTable}>
          <thead>
            <tr><th>Palabra</th><th>Va con</th><th>Ejemplo</th><th>Lo que hay que saber</th><th /></tr>
          </thead>
          <tbody>
            {enA2Quantifiers.map((q) => (
              <tr key={q.q}>
                <td lang="en"><b>{q.q}</b></td>
                <td style={{ color: "var(--text-3)" }}>{q.goesWith}</td>
                <td lang="en" className={s.soundExamples}>{q.example}</td>
                <td style={{ color: "var(--text-2)" }}>{q.note}</td>
                <td>
                  <button className={s.sayInline} onClick={() => speak(q.example)} aria-label={`Escuchar ${q.q}`}>
                    <SpeakerHigh size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={s.groupTitle}>some y any — y las dos veces que la regla se rompe</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Las excepciones caen en el oral</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_SOMEANY_TIP}</p>
      </article>
      <div className={s.qGrid}>
        {enA2SomeAny.map((r) => (
          <article key={r.when} className={`${s.qCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf}>{r.when}</span>
              <button className={s.sayBtn} onClick={() => speak(r.example)} aria-label={`Escuchar ${r.example}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.verbEs}>→ <b lang="en">{r.use}</b></p>
            <p className={s.example} style={{ marginTop: 0 }}>
              <span lang="en" className="marker">{r.example}</span>
            </p>
          </article>
        ))}
      </div>

      {enA2ZeroArticle && (
        <>
          <h2 className={s.groupTitle}>{enA2ZeroArticle.title}</h2>
          <p className={s.verbEs}>{enA2ZeroArticle.body}</p>
          <div className={`${s.soundTableWrap} paper`}>
            <table className={s.soundTable}>
              <thead>
                <tr><th>En general — sin the</th><th>Señalando algo — con the</th><th /></tr>
              </thead>
              <tbody>
                {enA2ZeroArticle.rows.map(([general, concreto]) => (
                  <tr key={general}>
                    <td lang="en"><b>{general}</b></td>
                    <td lang="en" className={s.soundExamples}>{concreto}</td>
                    <td>
                      <button className={s.sayInline} onClick={() => speak(`${general} ${concreto}`)} aria-label={`Escuchar ${general}`}>
                        <SpeakerHigh size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function EnA2FutureTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Tres formas de hablar del futuro, y cada una dice algo distinto</h2>
      <div className={s.verbGrid}>
        {enA2Futures.map((f) => (
          <article key={f.id} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf} lang="en">{f.form}</span>
              <button className={s.sayBtn} onClick={() => speak(f.example)} aria-label={`Escuchar ${f.example}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.verbEs}>{f.says}</p>
            <p className={s.example}>
              <span lang="en" className="marker">{f.example}</span>
              <br />
              <span className={s.exampleEs}>{f.es}</span>
            </p>
            {f.note && <p className={s.perfekt}>{f.note}</p>}
          </article>
        ))}
      </div>

      {enA2FutureTraps && (
        <>
          <h2 className={s.groupTitle}>{enA2FutureTraps.title}</h2>
          <div className={s.verbGrid}>
            {enA2FutureTraps.items.map((t) => (
              <article key={t.id} className={`${s.qCard} paper`}>
                <EnA2WrongRight wrong={t.wrong} right={t.right} why={t.why} />
              </article>
            ))}
          </div>
        </>
      )}

      {enA2TimeClauses && (
        <>
          <h2 className={s.groupTitle}>{enA2TimeClauses.title}</h2>
          <p className={s.verbEs}>{enA2TimeClauses.body}</p>
          <EnA2RowsTable head={["Lo que quieres decir", "Cómo se dice", "Qué tiempo lleva"]} rows={enA2TimeClauses.rows} />
          <p className={`${s.trap} hand`} style={{ marginTop: 12 }}>{enA2TimeClauses.note}</p>
        </>
      )}
    </section>
  );
}

function EnA2ModalsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Lo que hay que hacer, lo que no se puede y lo que se pide</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Lo que vale para todos</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_MODAL_TIP}</p>
      </article>
      <div className={s.verbGrid}>
        {enA2Modals.map((m) => (
          <article key={m.id} className={`${s.verbCard} paper`}>
            <header className={s.verbHead}>
              <span className={s.verbInf} lang="en">{m.form}</span>
              <button className={s.sayBtn} onClick={() => speak(m.example)} aria-label={`Escuchar ${m.example}`}>
                <SpeakerHigh size={16} />
              </button>
            </header>
            <p className={s.verbEs}>{m.what}</p>
            <p className={s.example}>
              <span lang="en" className="marker">{m.example}</span>
              <br />
              <span className={s.exampleEs}>{m.es}</span>
            </p>
            <p className={s.perfekt}>{m.shape}</p>
            {m.note && <p className={`${s.trap} hand`}>{m.note}</p>}
          </article>
        ))}
      </div>

      {enA2Signs && (
        <>
          <h2 className={s.groupTitle}>{enA2Signs.title}</h2>
          <div className={s.qGrid}>
            {enA2Signs.items.map((i) => (
              <article key={i.pattern} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="en">{i.pattern}</span>
                  <button className={s.sayBtn} onClick={() => speak(i.examples.replace(/\s*·\s*/g, ". "))} aria-label={`Escuchar ${i.pattern}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{i.means}</p>
                <p className={s.example} style={{ marginTop: 0 }}>
                  <span lang="en" className="marker">{i.examples}</span>
                </p>
              </article>
            ))}
          </div>
          <p className={`${s.trap} hand`} style={{ marginTop: 12 }}>{enA2Signs.tip}</p>
        </>
      )}
    </section>
  );
}

function EnA2PronounsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Las cinco filas del inglés, de una vez</h2>
      <article className={`${s.patternCard} paper`}>
        <h3 className={s.patternTitle}>Lo nuevo no son las palabras: es el sitio</h3>
        <p className={s.patternBody} style={{ marginBottom: 0 }}>{EN_A2_PRONOUN_TIP}</p>
      </article>
      <div className={`${s.soundTableWrap} paper`}>
        <table className={s.soundTable}>
          <thead>
            <tr><th>Sujeto</th><th>Objeto</th><th>+ sustantivo</th><th>Solo</th><th>Reflexivo</th><th /></tr>
          </thead>
          <tbody>
            {enA2Pronouns.map((p) => (
              <tr key={p.subject}>
                <td lang="en"><b>{p.subject}</b></td>
                <td lang="en"><b>{p.object}</b></td>
                <td lang="en">{p.possAdj}</td>
                <td lang="en">{p.possPron}</td>
                <td lang="en">{p.reflexive}</td>
                <td>
                  <button className={s.sayInline} onClick={() => speak(p.example)} aria-label={`Escuchar el ejemplo de ${p.subject}`}>
                    <SpeakerHigh size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {enA2Possessives && (
        <>
          <h2 className={s.groupTitle}>{enA2Possessives.title}</h2>
          <p className={s.verbEs}>{enA2Possessives.body}</p>
          <div className={`${s.soundTableWrap} paper`}>
            <table className={s.soundTable}>
              <thead>
                <tr><th>Si el dueño es…</th><th>Se marca</th><th>Ejemplos</th></tr>
              </thead>
              <tbody>
                {enA2Possessives.genitive.map((g) => (
                  <tr key={g.rule}>
                    <td style={{ color: "var(--text-3)" }}>{g.rule}</td>
                    <td><b>{g.how}</b></td>
                    <td lang="en" className={s.soundExamples}>{g.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`${s.trap} hand`} style={{ marginTop: 12 }}>{enA2Possessives.tip}</p>
        </>
      )}

      {enA2Reflexives && (
        <>
          <h2 className={s.groupTitle}>{enA2Reflexives.title}</h2>
          <p className={s.verbEs}>{enA2Reflexives.test}</p>
          <div className={s.qGrid}>
            {enA2Reflexives.uses.map((u) => (
              <article key={u.example} className={`${s.qCard} paper`}>
                <header className={s.verbHead}>
                  <span className={s.verbInf} lang="en">{u.example}</span>
                  <button className={s.sayBtn} onClick={() => speak(u.example)} aria-label={`Escuchar ${u.example}`}>
                    <SpeakerHigh size={16} />
                  </button>
                </header>
                <p className={s.verbEs}>{u.es}</p>
                <p className={s.perfekt}>{u.what}</p>
              </article>
            ))}
          </div>
          <div className={s.qGrid} style={{ marginTop: 14 }}>
            {enA2Reflexives.traps.map((t) => (
              <article key={t.wrong} className={`${s.qCard} paper`}>
                <EnA2WrongRight wrong={t.wrong} right={t.right} />
              </article>
            ))}
          </div>
        </>
      )}

      {enA2VerbObjects && (
        <>
          <h2 className={s.groupTitle}>{enA2VerbObjects.title}</h2>
          <p className={s.verbEs}>{enA2VerbObjects.body}</p>
          <div className={s.verbGrid}>
            {[enA2VerbObjects.directGroup, enA2VerbObjects.toGroup].map((g) => (
              <article key={g.label} className={`${s.verbCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf}>{g.label}</span></header>
                <p className={s.perfekt}>
                  {g.verbs.map((v) => (
                    <span key={v} lang="en" style={{ background: "var(--panel)", borderRadius: 999, padding: "1px 8px", marginRight: 6, whiteSpace: "nowrap", fontWeight: 700 }}>
                      {v}
                    </span>
                  ))}
                </p>
                {g.examples.map((e) => (
                  <p key={e.en} className={s.example}>
                    <button className={s.sayInline} onClick={() => speak(e.en)} aria-label={`Escuchar ${e.en}`}>
                      <SpeakerHigh size={14} />
                    </button>{" "}
                    <span lang="en" className="marker">{e.en}</span>
                    <br />
                    <span className={s.exampleEs}>{e.es}</span>
                  </p>
                ))}
              </article>
            ))}
          </div>
          {enA2VerbObjects.notes.map((n) => (
            <p key={n} className={s.verbEs} style={{ marginTop: 10 }}>{n}</p>
          ))}
        </>
      )}
    </section>
  );
}

function EnA2TrapsTab() {
  return (
    <section>
      <h2 className={s.groupTitle}>Trampas del A2 — lo que delata a un hispanohablante</h2>
      <p className={s.verbEs}>
        Una por una, con las dos frases que tienes en la cabeza y cuál de las dos es la buena.
      </p>
      <div className={s.verbGrid}>
        {enA2Traps.map((t) => (
          <article key={t.id} className={`${s.qCard} paper`}>
            <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
            <EnA2WrongRight wrong={t.wrong} right={t.right} why={t.why} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function LibretaEnA2({ tab }: { tab: string }) {
  return (
    <>
      {tab === "enpasado" && <EnA2PastTab />}
      {tab === "ened" && <EnA2EdTab />}
      {tab === "encomparar" && <EnA2CompareTab />}
      {tab === "encantidad" && <EnA2QuantityTab />}
      {tab === "enfuturo" && <EnA2FutureTab />}
      {tab === "enmodales" && <EnA2ModalsTab />}
      {tab === "enpronombres" && <EnA2PronounsTab />}
      {tab === "entrampas" && <EnA2TrapsTab />}
    </>
  );
}
