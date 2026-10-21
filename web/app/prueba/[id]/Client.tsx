"use client";

// Prueba del módulo: 12 ejercicios de sus lecciones, mezclados y a producir.
// Cada intento baraja distinto — repetirla nunca es memorizar el orden.

import { useEffect, useState } from "react";
import Link from "next/link";
import { useConfirm } from "@/lib/useConfirm";
import { notFound, useParams, useRouter } from "next/navigation";
import { Exam, X } from "@phosphor-icons/react";
import { courses, langOfPhase } from "@/data/course";
import { has } from "@/data/features";
import { adoptLang } from "@/lib/languages";
import { buildModuleTest } from "@/lib/moduleTest";
import { postLessonResult } from "@/lib/api";
import type { Exercise, ServerState } from "@/lib/types";
import { PhaseIcon } from "@/lib/phaseMeta";
import { useProgress } from "@/lib/useProgress";
import { phaseUnlocked, prevPhaseOf } from "@/lib/unlock";
import { testId } from "@/lib/ids";
import { MOTOR_OFF } from "@/components/ErrorBanner";
import { saveFailureDetail } from "@/lib/api";
import { celebrate, sfxFanfare } from "@/lib/juice";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { ExercisePlayer, type ExerciseOutcome } from "@/components/ExercisePlayer";
import { LangBadge } from "@/components/LangBadge";
import { SfxToggle } from "@/components/SfxToggle";
import ls from "@/components/lesson.module.css";
import ex from "@/components/ex.module.css";
import p from "./prueba.module.css";

export default function ModuleTestPage() {
  if (!has("moduleTest")) notFound();
  const { confirm, dialog } = useConfirm();
  const router = useRouter();
  async function pedirSalida() {
    const ok = await confirm({
      title: "¿Abandonar la prueba?",
      body: "Se pierde este intento. La prueba mezcla todo el módulo y te hace producir: conviene hacerla de una sentada.",
      confirmLabel: "Abandonar",
      danger: true,
    });
    if (ok) router.push(`/modulo/${phase.id}`);
  }
  const params = useParams<{ id: string }>();
  const found = Object.values(courses).flatMap((c) => c.phases).find((p) => p.id === params.id);
  const foundLang = found ? langOfPhase(found.id) : null;
  useEffect(() => {
    if (foundLang) adoptLang(foundLang);
  }, [foundLang]);
  if (!found) notFound();
  const phase = found;

  // la prueba se baraja SOLO en cliente: barajar en render rompía la
  // hidratación (el HTML del servidor traía otra mezcla que el cliente)
  const [queue, setQueue] = useState<Exercise[] | null>(null);
  useEffect(() => {
    setQueue(buildModuleTest(phase));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase.id]);
  const { state: progState } = useProgress({ due: false }); // dueCount no se muestra aquí
  const testLocked = progState !== "loading" && !phaseUnlocked(phase, progState);

  const [idx, setIdx] = useState(0);
  const [outcomes, setOutcomes] = useState<ExerciseOutcome[]>([]);
  const [server, setServer] = useState<ServerState | null | "pending">("pending");
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  const finished = queue !== null && idx >= queue.length;
  const score = outcomes.length
    ? Math.round((outcomes.reduce((s, o) => s + o.score, 0) / outcomes.length) * 100)
    : 0;

  function onDone(o: ExerciseOutcome) {
    if (!queue) return;
    const next = [...outcomes, o];
    setOutcomes(next);
    if (idx + 1 >= queue.length) {
      const total = next.reduce((s, x) => s + x.score, 0) / next.length;
      const items = next.flatMap((x) => x.itemIds.map((it) => ({ itemId: it, correct: x.correct, mode: x.mode })));
      const id = testId(phase.id);
      postLessonResult(id, total, items).then((st) => {
        setServer(st);
        if (st) setNewBadges(checkNewBadges(st));
        // El 0,8 lo decide el servidor. Celebrar antes, con la nota local,
        // desfasaría el confeti del desbloqueo, que mira completed.
        if (st?.lessons[id]?.completed) {
          celebrate(total >= 0.9);
          sfxFanfare();
        }
      });
    }
    setIdx(idx + 1);
  }

  if (testLocked) {
    const prev = prevPhaseOf(phase);
    return (
      <div className={ls.wrap}>
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>Todavía no toca</h1>
          <p className={ls.doneSub}>
            La prueba de «{phase.title}» se desbloquea al completar «{prev?.title}».
          </p>
          <div className={p.continueCenter}>
            <Link href={`/modulo/${prev?.id ?? phase.id}`} className={ex.btnPrimary}>Ir al módulo anterior</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={ls.wrap}>
      {dialog}
      <div className={ls.topBar}>
        <Link
          href={`/modulo/${phase.id}`}
          className={ls.closeBtn}
          aria-label="Salir de la prueba"
          onClick={(e) => {
            if (!finished && outcomes.length > 0) {
              e.preventDefault();
              void pedirSalida();
            }
          }}
        >
          <X size={20} weight="bold" aria-hidden />
        </Link>
        <LangBadge compact static />
        <SfxToggle />
        <div
          className={ls.progressTrack}
          role="progressbar"
          aria-valuenow={queue ? Math.min(idx, queue.length) : 0}
          aria-valuemin={0}
          aria-valuemax={queue?.length ?? 0}
          aria-label="Progreso de la prueba"
        >
          <div
            className={ls.progressFill}
            style={{ width: `${queue && queue.length > 0 ? (Math.min(idx, queue.length) / queue.length) * 100 : 0}%`, background: phase.color }}
          />
        </div>
        <span className={ls.stepCount}>{queue ? `${Math.min(idx + 1, queue.length)}/${queue.length}` : "…"}</span>
      </div>

      {queue === null && (
        <div className={ls.doneWrap} aria-busy="true">
          <p className={ls.doneSub}>Barajando la prueba…</p>
        </div>
      )}

      {queue !== null && !finished && (
        <>
          <div className={ls.lessonHead}>
            <h1 className={`${ls.lessonTitle} ${p.titleRow}`}>
              <Exam size={24} weight="duotone" color={phase.color} aria-hidden />
              Prueba · {phase.title}
            </h1>
            <p className={ls.lessonSub}>Prueba · certifica el módulo · sin contexto. Mezcla lecciones y te hace producir (a veces un escrito). No sustituye el simulacro ni el oral.</p>
          </div>
          <ExercisePlayer key={queue![idx].id} ex={queue![idx]} onDone={onDone} />
        </>
      )}

      {finished && queue !== null && queue.length === 0 && (
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>Este módulo aún no tiene prueba</h1>
          <p className={ls.doneSub}>No hay ejercicios disponibles para armarla.</p>
          <div className={p.continueCenter}>
            <Link href={`/modulo/${phase.id}`} className={ex.btnPrimary}>Volver al módulo</Link>
          </div>
        </div>
      )}

      {finished && queue !== null && queue.length > 0 && (
        <div className={ls.doneWrap}>
          <div className={p.doneIcon}>
            <PhaseIcon id={phase.id} size={44} color={phase.color} />
          </div>
          <h1 className={ls.doneTitle}>
            {score >= 90 ? "Prueba muy alta" : score >= 70 ? "Muy sólido" : "Aún se escapa — vuelve pronto"}
          </h1>
          <p className={ls.doneSub}>
            {score}% en la prueba de {phase.title}. Certifica huecos y frases, no el Goethe entero: el escrito largo y el oral viven en la lección, la misión y el simulacro.
            {score < 70 ? " Los fallos ya están en tu cola de repaso — repasa y repítela: cada intento se baraja distinto." : " Los fallos ya están en tu cola de repaso."}
          </p>
          <div className={ls.statRow}>
            <div className={ls.stat}>
              <div className={`${ls.statVal} num`}>{score}%</div>
              <div className={ls.statLabel}>Nota</div>
            </div>
            <div className={ls.stat}>
              <div className={`${ls.statVal} num`}>{outcomes.filter((o) => o.correct).length}/{outcomes.length}</div>
              <div className={ls.statLabel}>Ejercicios</div>
            </div>
            {server && server !== "pending" && (
              <div className={ls.stat}>
                <div className={`${ls.statVal} num`}>{server.xp}</div>
                <div className={ls.statLabel}>XP total</div>
              </div>
            )}
          </div>
          <BadgeUnlocks badges={newBadges} />
          {server === null && (
            <p role="alert" className={p.saveAlert}>
              Este resultado no quedó guardado. {saveFailureDetail(MOTOR_OFF)}
            </p>
          )}
          <div className={`${p.continueCenter} ${p.continueSplit}`}>
            <Link href={`/modulo/${phase.id}`} className={`${ex.btnGhost} ${p.ghostLink}`}>
              Volver al módulo
            </Link>
            <button className={ex.btnPrimary} style={{ background: phase.color }} onClick={() => window.location.reload()}>
              Repetir (otra mezcla)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
