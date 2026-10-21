"use client";

import { motorOffText } from "@/components/ErrorBanner";
import { saveFailureDetail } from "@/lib/api";

import { X } from "@phosphor-icons/react";

// Repaso exprés (~5 min): sesión GENERATIVA sobre todo lo visto — cada vez
// preguntas distintas (lib/reviewSession). El SRS pondera por debajo; la deuda
// no se expone. Cierre siempre en producción.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { has } from "@/data/features";
import { getState, postLessonResult } from "@/lib/api";
import { REVIEW_ID } from "@/lib/ids";
import type { Exercise, ServerState } from "@/lib/types";
import { hasTargetVoice } from "@/lib/tts";
import { buildReviewSession } from "@/lib/reviewSession";
import { hayQuePreguntarAlSalir, useLeaveGuard } from "@/lib/useLeaveGuard";
import { getActiveLang, adoptLang } from "@/lib/languages";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { ExercisePlayer, type ExerciseOutcome } from "@/components/ExercisePlayer";
import ls from "@/components/lesson.module.css";
import ex from "@/components/ex.module.css";
import hub from "@/components/hub.module.css";

export default function ReviewPage() {
  if (!has("review")) notFound();
  const [queue, setQueue] = useState<Exercise[] | null>(null);
  const [backendDown, setBackendDown] = useState(false);
  const [idx, setIdx] = useState(0);
  const [outcomes, setOutcomes] = useState<ExerciseOutcome[]>([]);
  const [server, setServer] = useState<ServerState | null>(null);
  const [saved, setSaved] = useState<boolean | null>(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  // si llegamos desde la puerta de una lección, el cierre vuelve a ella
  const [thenHref, setThenHref] = useState<string | null>(null);
  // tras un F5 directo aquí, el config lingüístico debe ser el del idioma
  // activo — sin esto el TTS leería inglés con voz alemana
  useEffect(() => adoptLang(getActiveLang()), []);
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("then");
    if (t && t.startsWith("/")) setThenHref(t);
  }, []);

  useEffect(() => {
    // Chrome carga las voces async: si armamos la cola antes de voiceschanged,
    // hasTargetVoice()=false y los dictados desaparecen de la sesión. Esperamos
    // la señal (o 800 ms de cortesía) antes de construirla.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      build();
    };
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!synth || hasTargetVoice()) {
      start();
    } else {
      timer = setTimeout(start, 800);
      synth.addEventListener("voiceschanged", start, { once: true });
    }
    return () => {
      if (timer) clearTimeout(timer);
      synth?.removeEventListener("voiceschanged", start);
    };
    function build() {
      getState().then((st) => {
        if (st === null) {
          setBackendDown(true);
          setQueue([]);
          return;
        }
        const session = buildReviewSession(st, hasTargetVoice(), getActiveLang());
        setQueue(session.exercises);
      });
    }
  }, []);

  const finished = queue !== null && idx >= queue.length;

  useEffect(() => {
    if (finished && queue && queue.length > 0 && outcomes.length === queue.length) {
      const score = outcomes.reduce((s, o) => s + o.score, 0) / outcomes.length;
      const items = outcomes.flatMap((o) => o.itemIds.map((it) => ({ itemId: it, correct: o.correct, mode: o.mode })));
      postLessonResult(REVIEW_ID, score, items).then((st) => {
        setSaved(st !== null);
        setServer(st);
        if (st) setNewBadges(checkNewBadges(st));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  // Cero respuestas es la invitación: preguntar ahí se aprende a ignorar.
  // Con alguna ya cerrada, la sesión vive solo en memoria hasta el cierre.
  useLeaveGuard(hayQuePreguntarAlSalir({ respuestas: outcomes.length, repasoTerminado: finished }));

  const score = useMemo(
    () => (outcomes.length ? Math.round((outcomes.reduce((s, o) => s + o.score, 0) / outcomes.length) * 100) : 0),
    [outcomes],
  );

  return (
    <div className={ls.wrap}>
      <div className={ls.topBar}>
        <Link href={`/idioma/${getActiveLang()}`} className={ls.closeBtn} aria-label="Volver al inicio del idioma"><X size={20} weight="bold" aria-hidden /></Link>
        <div
          className={ls.progressTrack}
          role="progressbar"
          aria-valuenow={queue ? Math.min(idx, queue.length) : 0}
          aria-valuemin={0}
          aria-valuemax={queue?.length ?? 0}
          aria-label="Progreso del repaso"
        >
          <div
            className={ls.progressFill}
            style={{ width: queue?.length ? `${(Math.min(idx, queue.length) / queue.length) * 100}%` : "0%" }}
          />
        </div>
        {queue && queue.length > 0 && (
          <span className={ls.stepCount}>{Math.min(idx + 1, queue.length)}/{queue.length}</span>
        )}
      </div>

      {queue === null && (
        <div style={{ display: "grid", gap: 12 }}>
          <div className={hub.skeleton} />
          <div className={hub.skeleton} style={{ height: 180 }} />
        </div>
      )}

      {queue !== null && queue.length === 0 && backendDown && (
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>El motor no responde</h1>
          <p className={ls.doneSub}>
            No he podido leer qué te toca repasar. {motorOffText()}
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center" }}>
            <Link href={`/idioma/${getActiveLang()}`} className={ex.btnPrimary}>Volver al inicio</Link>
          </div>
        </div>
      )}

      {queue !== null && queue.length === 0 && !backendDown && (
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>Aún no hay nada que repasar</h1>
          <p className={ls.doneSub}>
            Haz una lección primero. A partir de ahí, el repaso exprés mezcla en cinco minutos
            todo lo que ya viste, con preguntas nuevas cada vez.
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center" }}>
            <Link href={thenHref ?? `/idioma/${getActiveLang()}`} className={ex.btnPrimary}>
              {thenHref ? "Continuar donde estabas →" : "Ir al curso"}
            </Link>
          </div>
        </div>
      )}

      {queue && !finished && queue[idx] && (
        <>
          <div className={ls.lessonHead}>
            <h1 className={ls.lessonTitle}>Repaso exprés</h1>
            <p className={ls.lessonSub}>Cinco minutos con todo lo que ya viste, y preguntas nuevas cada vez</p>
          </div>
          <ExercisePlayer
            key={queue[idx].id}
            ex={queue[idx]}
            onDone={(o) => { setOutcomes([...outcomes, o]); setIdx(idx + 1); }}
          />
        </>
      )}

      {queue && finished && queue.length > 0 && (
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>{score >= 80 ? "Memoria de acero" : "Repaso hecho"}</h1>
          <p className={ls.doneSub}>
            {score}%. Lo que fallaste vuelve enseguida; lo que acertaste, cada vez más tarde.
          </p>
          {server && (
            <div className={ls.statRow}>
              <div className={ls.stat}>
                <div className={`${ls.statVal} num`}>{server.xp}</div>
                <div className={ls.statLabel}>XP total</div>
              </div>
              <div className={ls.stat}>
                <div className={`${ls.statVal} num`}>{server.streakDays}</div>
                <div className={ls.statLabel}>Días de racha</div>
              </div>
            </div>
          )}
          {saved === false && (
            <p role="alert" style={{ textAlign: "center", color: "var(--warn)", fontWeight: 600, marginTop: 14 }}>
              Este repaso no quedó guardado. {saveFailureDetail(motorOffText())}
            </p>
          )}
          <BadgeUnlocks badges={newBadges} />
          <div className={ls.continueRow} style={{ justifyContent: "center" }}>
            {/* si veníamos de la puerta de una lección, el cierre devuelve ahí
                (el ?then= solo se respetaba en la rama de «nada que repasar») */}
            <Link href={thenHref ?? `/idioma/${getActiveLang()}`} className={ex.btnPrimary}>
              {thenHref ? "Continuar donde estabas →" : "Volver al curso"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
