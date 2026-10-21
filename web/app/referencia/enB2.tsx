"use client";

// Inglés B2. Marcadores, pasiva impersonal, modalidad, no finitas, inversión y trampas.

import { refModules } from "@/data/course.gen";
import s from "./referencia.module.css";

const enb2ref = refModules.enb2;
const EN_B2_MARKER_TIP = enb2ref?.EN_B2_MARKER_TIP ?? "";
const enb2Markers = enb2ref?.enb2Markers ?? [];
const EN_B2_PASSIVE_TIP = enb2ref?.EN_B2_PASSIVE_TIP ?? "";
const enb2ImpersonalMoulds = enb2ref?.enb2ImpersonalMoulds ?? [];
const EN_B2_MODALITY_TIP = enb2ref?.EN_B2_MODALITY_TIP ?? "";
const enb2BeExpressions = enb2ref?.enb2BeExpressions ?? [];
const EN_B2_NONFINITE_TIP = enb2ref?.EN_B2_NONFINITE_TIP ?? "";
const enb2NonFinite = enb2ref?.enb2NonFinite ?? [];
const EN_B2_INVERSION_TIP = enb2ref?.EN_B2_INVERSION_TIP ?? "";
const enb2Inversions = enb2ref?.enb2Inversions ?? [];
const enb2Traps = enb2ref?.enb2Traps ?? [];

export function LibretaEnB2({ tab }: { tab: string }) {
  return (
    <>
      {tab === "enb2markers" && (
        <section>
          <h2 className={s.groupTitle}>Marcadores del párrafo</h2>
          {EN_B2_MARKER_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{EN_B2_MARKER_TIP}</p>}
          <div className={s.verbGrid}>
            {enb2Markers.map((m) => (
              <article key={m.word} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf} lang="en">{m.word}</span></header>
                <p className={s.verbEs}>{m.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "enb2pasiva" && (
        <section>
          <h2 className={s.groupTitle}>Pasiva impersonal</h2>
          {EN_B2_PASSIVE_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{EN_B2_PASSIVE_TIP}</p>}
          <div className={s.verbGrid}>
            {enb2ImpersonalMoulds.map((row) => (
              <article key={row[0]} className={`${s.qCard} paper`}>
                <p className={s.example} lang="en">{row[0]}</p>
                <p className={s.verbEs}>{row[1]} · {row[2]}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "enb2modal" && (
        <section>
          <h2 className={s.groupTitle}>Modalidad y compromiso</h2>
          {EN_B2_MODALITY_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{EN_B2_MODALITY_TIP}</p>}
          <div className={s.verbGrid}>
            {enb2BeExpressions.map((x) => (
              <article key={x.form} className={`${s.qCard} paper`}>
                <p className={s.example} lang="en">{x.form}</p>
                <p className={s.verbEs}>{x.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "enb2nonfinite" && (
        <section>
          <h2 className={s.groupTitle}>Subordinación no finita</h2>
          {EN_B2_NONFINITE_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{EN_B2_NONFINITE_TIP}</p>}
          <div className={s.verbGrid}>
            {enb2NonFinite.map((x) => (
              <article key={x.id} className={`${s.qCard} paper`}>
                <p className={s.example} lang="en">{x.form}</p>
                <p className={s.verbEs}>{x.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "enb2inversion" && (
        <section>
          <h2 className={s.groupTitle}>Las tres inversiones del B2</h2>
          {EN_B2_INVERSION_TIP && <p className={s.verbEs} style={{ marginBottom: 14 }}>{EN_B2_INVERSION_TIP}</p>}
          <div className={s.verbGrid}>
            {enb2Inversions.map((x) => (
              <article key={x.id} className={`${s.qCard} paper`}>
                <p className={s.example} lang="en">{x.form}</p>
                <p className={s.verbEs}>{x.es}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "enb2trampas" && (
        <section>
          <h2 className={s.groupTitle}>Trampas del B2 inglés</h2>
          <div className={s.verbGrid}>
            {enb2Traps.map((t) => (
              <article key={t.id} className={`${s.qCard} paper`}>
                <header className={s.verbHead}><span className={s.verbInf}>{t.title}</span></header>
                <p className={`${s.trap} hand`}>❌ {t.wrong}</p>
                <p className={s.example} lang="en">{t.right}</p>
                <p className={s.verbEs}>{t.why}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
