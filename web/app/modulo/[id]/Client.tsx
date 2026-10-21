"use client";

import { useEffect, useState } from "react";

// Un módulo (fase): sus lecciones con estado, nota y porcentaje del módulo.

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { courses, langOfPhase, missionOf } from "@/data/course";
import { adoptLang } from "@/lib/languages";
import { PhaseIcon } from "@/lib/phaseMeta";
import { PencilSimple, Timer } from "@phosphor-icons/react";
// Las dos marcas grandes (prueba y misión) son arte propio; los dos iconos de
// 13 px que acompañan al conteo siguen siendo del set, que a ese tamaño da igual.
import { MarkExam, MarkCompass } from "@/components/Art";
import { useProgress, modulePct, moduleAvgScore, nextLessonId } from "@/lib/useProgress";
import { phaseSkippedByPlacement, phaseUnlocked, prevPhaseOf } from "@/lib/unlock";
import { testId, missionId } from "@/lib/ids";
import { retoMedal, MEDAL_LABEL } from "@/lib/retoRun";
import { DuelSeal } from "@/components/Art";
import { isSandboxProfile } from "@/lib/unlock";
import { Reveal, JuicyBar } from "@/components/Reveal";
import { LangBadge } from "@/components/LangBadge";
import { ErrorBanner } from "@/components/ErrorBanner";
import s from "@/components/hub.module.css";

export default function ModulePage() {
  const [tab, setTab] = useState<"lecciones" | "practicar">("lecciones");
  const params = useParams<{ id: string }>();
  const { state } = useProgress({ due: false }); // dueCount no se muestra aquí
  const phase = Object.values(courses).flatMap((c) => c.phases).find((p) => p.id === params.id);
  const phaseLang = phase ? langOfPhase(phase.id) : null;
  useEffect(() => {
    if (phaseLang) adoptLang(phaseLang);
  }, [phaseLang]);
  if (!phase) notFound();

  const loading = state === "loading";
  const st = loading ? null : state;
  const locked = !loading && !phaseUnlocked(phase, st);
  const skipped = !loading && phaseSkippedByPlacement(phase, st);
  const pct = modulePct(phase, st);
  const avg = moduleAvgScore(phase, st);
  // «siguiente» dentro del idioma de este módulo (el default alemán marcaba
  // mal la lección en curso al estudiar inglés)
  const next = nextLessonId(st, phaseLang ?? "de");

  return (
    <main className={s.wrap}>
      <nav className={s.crumbs} aria-label="Ruta">
        <LangBadge /> <span>/</span>
        {/* la miga lleva al nivel de SU idioma: «/nivel/a1» a secas resuelve al
            alemán, así que desde un módulo inglés se salía del idioma */}
        <Link href={`/nivel/${phaseLang ?? "de"}-${phase.level ?? "a1"}`}>
          Nivel {(phase.level ?? "a1").toUpperCase()}
        </Link> <span>/</span>
        <span>Módulo {phase.n}</span>
      </nav>

      <Reveal>
        <header
          className={s.moduleHero}
          style={{ background: `${phase.color}12`, borderColor: `${phase.color}55` }}
        >
          <div className={s.moduleHeroTop}>
            <span className={s.moduleIconWrap} style={{ background: `${phase.color}22`, color: phase.color, width: 58, height: 58, borderRadius: 18 }}>
              <PhaseIcon id={phase.id} size={34} />
            </span>
            <div style={{ minWidth: 0 }}>
              <span className={s.moduleBadge} style={{ background: phase.color }}>Módulo {phase.n}</span>
              <h1 className={s.title} style={{ marginTop: 4 }}>{phase.title}</h1>
            </div>
          </div>
          <p className={s.subtitle} style={{ marginTop: 10 }}>{phase.goal}</p>
          <div className={s.barRow} style={{ marginTop: 14 }}>
            <JuicyBar pct={pct} color={phase.color} trackClass={s.bar} fillClass={s.barFill} />
            <span className={s.barPct}>{pct}%</span>
          </div>
          <div className={s.statChips} style={{ marginTop: 10 }}>
            <span className={s.chip}><span className={s.chipVal}>{phase.lessons.length}</span> lecciones</span>
            <span className={s.chip}>Lecciones hechas. El dominio (prueba + memoria + misión) está en Diagnóstico.</span>
            {avg !== null && <span className={s.chip}>nota media <span className={s.chipVal}>{avg}%</span></span>}
          </div>
        </header>
      </Reveal>

      {state === null && (
        <ErrorBanner kind="motor" detail="Los porcentajes y candados no son fiables sin el motor." />
      )}

      {locked && (
        <div className={s.reviewBanner} style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}>
          <span className={s.reviewText} style={{ color: "var(--text-2)" }}>
            Este módulo se desbloquea al completar «{prevPhaseOf(phase)?.title}». Así el avance es
            de verdad: cada módulo recicla el anterior.
          </span>
          <Link href={`/modulo/${prevPhaseOf(phase)?.id}`} className={s.reviewBtn}>
            Ir a «{prevPhaseOf(phase)?.title}»
          </Link>
        </div>
      )}
      {skipped && (
        <div className={s.reviewBanner} style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}>
          <span className={s.reviewText} style={{ color: "var(--text-2)" }}>
            Saltado: la prueba de nivel te colocó por encima de este módulo. Puedes recorrerlo
            si quieres; no cuenta como pendiente.
          </span>
        </div>
      )}
      {/* CARPETA: la pantalla del módulo apilaba el aviso de bloqueo, la prueba,
          la misión, el reto y encima la lista de lecciones — cinco bloques
          seguidos antes de llegar a lo que casi siempre vienes a hacer, que es
          entrar en la siguiente lección. Con lengüetas, las lecciones abren la
          carpeta y lo demás está a un clic, sin desaparecer. */}
      {!locked && (
        <>
          <div className={s.folderTabs} role="tablist" aria-label="Secciones del módulo">
            <button
              role="tab"
              aria-selected={tab === "lecciones"}
              className={`${s.folderTab} ${tab === "lecciones" ? s.folderTabActive : ""}`}
              onClick={() => setTab("lecciones")}
            >
              Lecciones <span className={s.folderCount}>{phase.lessons.length}</span>
            </button>
            <button
              role="tab"
              aria-selected={tab === "practicar"}
              className={`${s.folderTab} ${tab === "practicar" ? s.folderTabActive : ""}`}
              onClick={() => setTab("practicar")}
            >
              Poner a prueba
            </button>
          </div>

          <div className={s.folderBody} role="tabpanel">
            {tab === "lecciones" ? (
              <>

      {loading ? (
        <div className={s.lessons}>
          {Array.from({ length: 4 }, (_, i) => <div key={i} className={s.skeleton} />)}
        </div>
      ) : locked ? null : (
        <div className={s.lessons}>
          {phase.lessons.map((l, i) => {
            const stat = st?.lessons?.[l.id];
            const isNext = l.id === next;
            const nEx = l.sections.reduce((n, sec) => n + (sec.exercises?.length ?? 0), 0);
            return (
              <Reveal key={l.id} i={i + 1}>
                <Link href={`/lesson/${l.id}`} className={`${s.lessonRow} ${isNext ? s.lessonNext : ""}`}>
                  <span
                    className={`${s.lessonState} ${stat?.completed ? s.lessonStateDone : ""}`}
                    style={isNext ? { background: `${phase.color}22`, borderColor: phase.color, color: phase.color } : undefined}
                  >
                    {stat?.completed ? "✓" : i + 1}
                  </span>
                  <span className={s.lessonInfo}>
                    <span className={s.lessonName}>{l.title}</span>
                    <br />
                    <span className={s.lessonSub}>{l.subtitle}</span>
                  </span>
                  <span className={s.lessonMeta}>
                    {typeof stat?.bestScore === "number" ? (
                      <>
                        <span className={s.lessonScore} style={{ color: phase.color }}>{Math.round(stat.bestScore * 100)}%</span>
                        {" · "}
                      </>
                    ) : null}
                    <PencilSimple size={13} weight="duotone" aria-hidden style={{ verticalAlign: "-2px" }} /> {nEx} ejercicios
                    {" · "}
                    <Timer size={13} weight="duotone" aria-hidden style={{ verticalAlign: "-2px" }} /> ~{l.minutes} min
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      )}
              </>
            ) : (
              <>
                <p className={s.subtitle} style={{ marginTop: 0, marginBottom: 12 }}>
                  Tres oficios distintos: <b>Certifica</b> (prueba), <b>Contra el reloj</b> (reto),
                  <b>En el mundo</b> (misión). No son el mismo aviso de repaso.
                </p>
                <div className={s.statChips} style={{ marginBottom: 12 }}>
                  <span className={s.chip}>Certifica</span>
                  <span className={s.chip}>Contra el reloj</span>
                  <span className={s.chip}>En el mundo</span>
                </div>

      {!loading && !locked && (() => {
        const testStat = st?.lessons?.[testId(phase.id)];
        const allDone = phase.lessons.every((l) => st?.lessons?.[l.id]?.completed);
        return (
          <div className={s.reviewBanner} style={{ borderColor: phase.color, background: "var(--surface)" }}>
            <span className={s.reviewText} style={{ color: "var(--text-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MarkExam size={22} color={phase.color} />
              <span>
                <b>Prueba del módulo</b> — todo mezclado y a producir, como pide la memoria.
                {typeof testStat?.bestScore === "number" ? ` Mejor nota: ${Math.round(testStat.bestScore * 100)}%.` : ""}
                {!allDone ? " Mejor tras completar las lecciones." : ""}
              </span>
            </span>
            <Link href={`/prueba/${phase.id}`} className={s.reviewBtn} style={{ background: phase.color }}>
              {testStat ? "Repetir prueba" : "Hacer la prueba"}
            </Link>
          </div>
        );
      })()}

      {!loading && !locked && (() => {
        const allDone = phase.lessons.every((l) => st?.lessons?.[l.id]?.completed);
        const open = isSandboxProfile() || allDone;
        const medal = retoMedal(st, phase.id);
        return (
          <div className={s.reviewBanner} style={{ borderColor: open ? phase.color : "var(--border-strong)", background: "var(--surface)" }}>
            <span className={s.reviewText} style={{ color: "var(--text-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <DuelSeal size={24} />
              <span>
                <b>Reto</b> — run de 10, 3 vidas, cada vez distinta. Ponte a prueba a placer:
                jugar jamás resta.
                {medal ? ` Tu marca: ${MEDAL_LABEL[medal]}.` : ""}
                {!open ? " Se abre al completar el módulo." : ""}
              </span>
            </span>
            {open && (
              <Link href={`/reto/${phase.id}`} className={s.reviewBtn} style={{ background: phase.color }}>
                {medal ? "Mejorar mi marca" : "Entrar al reto"}
              </Link>
            )}
          </div>
        );
      })()}

      {!loading && !locked && (() => {
        const mission = missionOf(phase.id);
        if (!mission) return null;
        const allDone = phase.lessons.every((l) => st?.lessons?.[l.id]?.completed);
        const open = isSandboxProfile() || allDone;
        const best = st?.lessons?.[missionId(phase.id)]?.bestScore;
        return (
          <div className={s.reviewBanner} style={{ borderColor: open ? phase.color : "var(--border-strong)", background: "var(--surface)" }}>
            <span className={s.reviewText} style={{ color: "var(--text-2)", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <MarkCompass size={22} color={open ? phase.color : "var(--text-3)"} />
              <span>
                <b>Práctica real</b> — {mission.title}: {mission.outcome}
                {typeof best === "number" ? ` Tu mejor misión: ${Math.round(best * 100)}%.` : ""}
                {!open ? " Se abre al completar el módulo." : ""}
              </span>
            </span>
            {open && (
              <Link href={`/mision/${phase.id}`} className={s.reviewBtn} style={{ background: phase.color }}>
                {typeof best === "number" ? "Repetir misión" : "Salir al mundo"}
              </Link>
            )}
          </div>
        );
      })()}
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
}
