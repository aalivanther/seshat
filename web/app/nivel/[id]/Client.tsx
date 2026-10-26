"use client";

// Hub de un nivel (A1, A2, ...): sus módulos con porcentaje propio.
// Todo sale del registro de niveles + las fases del curso con ese level.

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowsClockwise, BookOpenText, ChartLineUp } from "@phosphor-icons/react";
// El birrete y el candado son arte propio: son las dos marcas grandes de esta
// pantalla. Los dos iconos de 14 px que acompañan al conteo siguen siendo del
// set — a ese tamaño nadie distingue el trazo.
import { MarkCap, MarkLock } from "@/components/Art";
import { resolveLevelId, type Level } from "@/lib/levels";
import { adoptLang } from "@/lib/languages";
import { useEffect } from "react";
import { PhaseIcon } from "@/lib/phaseMeta";
import { Reveal, JuicyBar } from "@/components/Reveal";
import { LangBadge } from "@/components/LangBadge";
import { useProgress, modulePct, moduleAvgScore, levelPct, nextLessonId, phasesOf } from "@/lib/useProgress";
import { phaseSkippedByPlacement, phaseUnlocked, prevPhaseOf } from "@/lib/unlock";
import { useReviewBannerDue } from "@/lib/reviewSession";
import { examsOf } from "@/data/examsIndex";
import { officialExamName } from "@/lib/achievements";
import { has } from "@/data/features";
import { DuelSeal } from "@/components/Art";
import { ErrorBanner } from "@/components/ErrorBanner";
import s from "@/components/hub.module.css";

function simulacrosCopy(level: Level, n: number): string {
  const nOf = n === 1 ? "un simulacro completo" : `${n} simulacros completos`;
  const name = officialExamName(level.lang, level.cefr);
  if (level.lang === "en") {
    return `Simulacros del examen oficial (${name}): ${nOf}, con doble escucha y nota Pass/High Pass.`;
  }
  if (level.cefr === "b1") {
    return `Simulacro del ${name} (= ÖSD B1): ${nOf}, tres horas, modular — cada módulo se aprueba por separado con 60 puntos y no hay compensación.`;
  }
  if (level.cefr === "b2") {
    return `Simulacro del ${name}: ${nOf}, modular, con reloj y nota oficiales.`;
  }
  return `Simulacros del examen oficial (${name}): ${nOf}, con cronómetro y nota.`;
}

export default function LevelPage() {
  const params = useParams<{ id: string }>();
  const level = resolveLevelId(params.id);
  const ok = !!level && level.available;
  useEffect(() => {
    if (ok) adoptLang(level!.lang);
  }, [ok, level]);
  if (!level || !ok) notFound();

  const { state } = useProgress({ due: false }); // dueCount no se muestra aquí
  const loading = state === "loading";
  const st = loading ? null : state;
  const phases = phasesOf(level.id);
  const pct = levelPct(st, level.id);
  // la lección «siguiente» es la del idioma de ESTE nivel: sin el segundo
  // argumento se usaba el default alemán y en inglés se marcaba la card
  // equivocada (o ninguna)
  const next = nextLessonId(st, level.lang);
  const reviewDue = useReviewBannerDue(st, level.lang);

  return (
    <main className={s.wrap}>
      <nav className={s.crumbs} aria-label="Ruta">
        <LangBadge /> <span>/</span> <span>Nivel {level.name}</span>
      </nav>

      <header className={s.header}>
        <div>
          <h1 className={s.title}>Nivel {level.name}</h1>
          <p className={s.subtitle}>
            {phases.length} módulos. {level.goal}
          </p>
        </div>
        <div className={s.statChips}>
          {st && <span className={s.chip}><span className={s.chipVal}>{st.xp}</span> XP</span>}
          <span className={s.chip}><span className={s.chipVal}>{pct}%</span> del nivel</span>
        </div>
      </header>

      <div className={s.barRow} style={{ marginTop: 8 }}>
        <JuicyBar pct={pct} trackClass={s.bar} fillClass={s.barFill} />
        <span className={s.barPct}>{pct}%</span>
      </div>

      {state === null && (
        <ErrorBanner kind="motor" detail="Los porcentajes y candados no son fiables sin el motor." />
      )}

      {!loading && (() => {
        // run del día SUGERIDA (autonomía SDT: invitación, jamás racha): el
        // módulo desbloqueado con nota media más floja — su reto te espera
        const cands = phases.filter((p) => phaseUnlocked(p, st) && p.lessons.every((l) => st?.lessons?.[l.id]?.completed));
        if (!cands.length) return null;
        const weakest = cands.reduce((a, b) =>
          (moduleAvgScore(a, st) ?? 101) <= (moduleAvgScore(b, st) ?? 101) ? a : b);
        const allDone = phases.every((p) => p.lessons.every((l) => st?.lessons?.[l.id]?.completed));
        return (
          <div className={s.reviewBanner} style={{ borderColor: "#7c3aed" }}>
            <span className={s.reviewText}>
              <DuelSeal size={20} /> <b>Run del día</b> — hoy pinta bien {weakest.title} (es donde tu nota media flojea).
              {allDone ? " O la vuelta completa al nivel:" : ""}
            </span>
            <span style={{ display: "inline-flex", gap: 8 }}>
              <Link href={`/reto/${weakest.id}`} className={s.reviewBtn}>Al reto</Link>
              {allDone && (
                <Link href={`/reto/nivel-${level.id}`} className={s.reviewBtn} style={{ background: "#7c3aed" }}>
                  Reto de nivel
                </Link>
              )}
            </span>
          </div>
        );
      })()}

      {reviewDue && has("review") && (
        <div className={s.reviewBanner}>
          <span className={s.reviewText}>
            <ArrowsClockwise size={18} weight="bold" style={{ verticalAlign: "-3px" }} aria-hidden />{" "}
            ¿Repasamos? Cinco minutos con todo lo que ya sabes, y preguntas nuevas cada vez.
          </span>
          <Link href="/review" className={s.reviewBtn}>Repaso exprés</Link>
        </div>
      )}

      {/* El aviso de simulacros estaba clavado en A1, así que el Modellsatz B1 —el
          producto estrella del drop 5— no tenía puerta desde ningún sitio salvo
          teclear /examen a mano. Ahora cada nivel enseña LOS SUYOS, contándolos
          del contenido real. */}
      {(() => {
        const mine = examsOf(level.lang).filter((ex) => ex.level === level.cefr);
        if (mine.length === 0) return null;
        return (
          <div className={s.reviewBanner} style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}>
            <span className={s.reviewText} style={{ color: "var(--text-2)" }}>
              <MarkCap size={20} />{" "}
              {simulacrosCopy(level, mine.length)}
            </span>
            <Link href="/examen" className={s.reviewBtn}>Ir a simulacros</Link>
          </div>
        );
      })()}

      {loading ? (
        <div className={s.moduleGrid}>
          {Array.from({ length: 6 }, (_, i) => <div key={i} className={s.skeleton} style={{ height: 170 }} />)}
        </div>
      ) : (
        <div className={s.moduleGrid}>
          {phases.map((phase, i) => {
            const mp = modulePct(phase, st);
            const avg = moduleAvgScore(phase, st);
            const hasNext = phase.lessons.some((l) => l.id === next);
            const unlocked = phaseUnlocked(phase, st);
            const skipped = phaseSkippedByPlacement(phase, st);
            if (!unlocked) {
              const prev = prevPhaseOf(phase);
              return (
                <Reveal key={phase.id} i={i}>
                  <div className={`${s.moduleCard} ${s.moduleCardLocked}`} aria-disabled>
                    <span className={s.moduleIconWrap} style={{ background: "var(--panel)", color: "var(--text-3)" }}>
                      <MarkLock size={24} color="currentColor" />
                    </span>
                    <span className={s.moduleBadge} style={{ background: "var(--text-3)" }}>
                      Módulo {phase.n}
                    </span>
                    <span className={s.moduleName}>{phase.title}</span>
                    <span className={s.moduleGoal}>
                      Se desbloquea al completar «{prev?.title ?? "el módulo anterior"}».
                      {phase.n === 1 ? " La prueba de nivel abre todos los módulos de tu nivel y deja atrás los anteriores." : ""}
                    </span>
                  </div>
                </Reveal>
              );
            }
            return (
              <Reveal key={phase.id} i={i}>
                <Link
                  href={`/modulo/${phase.id}`}
                  className={`${s.moduleCard} ${hasNext ? s.moduleCardNext : ""}`}
                >
                  <span className={s.moduleIconWrap} style={{ background: `${phase.color}1c`, color: phase.color }}>
                    <PhaseIcon id={phase.id} size={26} />
                  </span>
                  <span className={s.moduleBadge} style={{ background: phase.color }}>
                    Módulo {phase.n}
                  </span>
                  <span className={s.moduleName}>{phase.title}</span>
                  <span className={s.moduleGoal}>{skipped ? "Saltado: la prueba de nivel te colocó por encima. Puedes recorrerlo si quieres; no cuenta como pendiente." : phase.goal}</span>
                  <span className={s.moduleMeta}>
                    <BookOpenText size={14} weight="duotone" aria-hidden /> {phase.lessons.length} lecciones
                    {skipped && " · saltado · prueba de nivel"}
                    {!skipped && avg !== null && (
                      <>
                        {" · "}
                        <ChartLineUp size={14} weight="duotone" aria-hidden /> nota media {avg}%
                      </>
                    )}
                  </span>
                  <span className={s.barRow}>
                    <JuicyBar pct={mp} color={phase.color} trackClass={s.bar} fillClass={s.barFill} />
                    <span className={s.barPct}>{mp}%</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      )}
    </main>
  );
}
