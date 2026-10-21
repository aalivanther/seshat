"use client";

// Landing: los idiomas de tu expedición. Cada card sale del registro de
// idiomas ∩ el contenido horneado en este drop (un build sin inglés no
// enseña su card — la liberación escalonada también aplica a idiomas).

import Link from "next/link";
import { courses } from "@/data/course";
import { LANGUAGES } from "@/lib/languages";
import { useProgress, langPct } from "@/lib/useProgress";
import { levelsOf, ready } from "@/lib/levels";
import { ErrorBanner } from "@/components/ErrorBanner";
import { Reveal, JuicyBar } from "@/components/Reveal";
import { Wordmark } from "@/components/Wordmark";
import { LangFlag } from "@/components/Art";
import s from "@/components/hub.module.css";

export default function LanguagesLanding() {
  const { state } = useProgress({ due: false }); // dueCount no se muestra aquí
  const loading = state === "loading";
  const st = loading ? null : state;
  const available = LANGUAGES.filter((l) => (courses[l.id]?.phases.length ?? 0) > 0);

  return (
    <main className={s.wrap}>
      <header className={s.header}>
        <div>
          <h1 className={s.title} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Wordmark size="lg" />
          </h1>
          <p className={s.subtitle} style={{ marginTop: 10 }}>
            Tu expedición de idiomas. Elige uno y entra en su cuaderno: niveles, módulos y
            lecciones, siempre con la frase usable por delante de la regla.
          </p>
        </div>
      </header>

      {state === null && <ErrorBanner kind="motor" detail="Mientras tanto puedes mirar, pero el progreso no se guardará." />}

      <div className={s.levelGrid}>
        {loading ? (
          <div className={s.skeleton} style={{ height: 150 }} />
        ) : (
          available.map((def, i) => {
            const c = courses[def.id];
            const totalLessons = c.phases.reduce((n, p) => n + p.lessons.length, 0);
            const pct = langPct(st, def.id);
            const lvlNames = levelsOf(def.id).filter((lv) => ready(lv.id, lv.lang, lv.cefr)).map((lv) => lv.name);
            const lvlLabel =
              lvlNames.length > 1
                ? `Niveles ${lvlNames.slice(0, -1).join(", ")} y ${lvlNames[lvlNames.length - 1]}`
                : `Nivel ${lvlNames[0] ?? ""}`;
            return (
              <Reveal key={def.id} i={i}>
                <Link href={`/idioma/${def.id}`} className={s.levelCard}>
                  <div className={s.levelTop}>
                    <span className={s.levelName} style={{ fontSize: "1.35rem", display: "inline-flex", alignItems: "center", gap: 8 }}><LangFlag lang={def.id} size={24} /> {def.name}</span>
                    <span className={s.levelTag}>
                      {lvlLabel} · {c.phases.length} módulos · {totalLessons} lecciones ·{" "}
                      {Object.keys(c.vocab).length} palabras
                    </span>
                  </div>
                  <p className={s.levelDesc}>{def.desc}</p>
                  <div className={s.barRow}>
                    <JuicyBar pct={pct} trackClass={s.bar} fillClass={s.barFill} />
                    <span className={s.barPct}>{pct}%</span>
                  </div>
                </Link>
              </Reveal>
            );
          })
        )}

        {/* La prueba de nivel vivía solo dentro del hub de cada idioma, que es
            justo donde NO está quien acaba de abrir la app por primera vez —y es
            quien más falta le hace saber por dónde empezar. */}
        <Reveal i={available.length}>
          <div className={s.levelCard}>
            <div className={s.levelTop}>
              <span className={s.levelName}>¿No sabes por dónde empezar?</span>
              <span className={s.levelTag}>15-25 min · sitúa el cuaderno, abre tu nivel y deja atrás lo anterior</span>
            </div>
            <p className={s.levelDesc}>
              Una prueba de nivel de verdad: mide hasta C1, te dice en qué nivel empezar, a qué
              examen oficial equivale lo tuyo y qué llevas flojo. Si ya sabes algo del idioma, esto
              te ahorra repetir lo que ya sabes.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {available.map((def) => (
                <Link key={def.id} href={`/colocacion?lang=${def.id}`} className={s.levelTag} style={{ textDecoration: "none" }}>
                  Probar mi nivel de {def.name.toLowerCase()} →
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal i={available.length + 1}>
          <div className={`${s.levelCard} ${s.levelCardLocked}`} aria-disabled>
            <div className={s.levelTop}>
              <span className={s.levelName}>Más idiomas</span>
              <span className={s.levelTag}>En camino</span>
            </div>
            <p className={s.levelDesc}>
              El motor ya está preparado para más idiomas — misma pedagogía, mismo cuaderno.
              Llegarán como expediciones nuevas.
            </p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
