"use client";

// RETO — run roguelike de 10 ejercicios sobre el módulo (motor en
// lib/retoRun.ts; diseño investigado en PLAN.md). Pantalla inmersiva como
// lección/prueba: sin AppTopBar, con salida confirmable arriba.

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { X, ArrowCounterClockwise } from "@phosphor-icons/react";
import { LifeHeart, Medal as MedalArt, DuelSeal } from "@/components/Art";
import { courses } from "@/data/courseIndex";
import { loadVocab, loadedVocab } from "@/data/vocab";
import { loadFullPhase } from "@/data/phases";
import { has } from "@/data/features";
import { adoptLang } from "@/lib/languages";
import { useProgress } from "@/lib/useProgress";
import { hayQuePreguntarAlSalir, useLeaveGuard } from "@/lib/useLeaveGuard";
import { phaseCompleted, phaseUnlocked, isSandboxProfile } from "@/lib/unlock";
import { buildRetoDeck, pickNext, mulberry32, retoMedal, MEDAL_LABEL, RETO_SIZE, RETO_LIVES, levelPseudoPhase, retoLangOf, type RetoDeck } from "@/lib/retoRun";
import { recordRetoMisses } from "@/lib/retoMiss";
import { retoId } from "@/lib/ids";
import { postLessonResult, saveFailureDetail } from "@/lib/api";
import { motorOffText } from "@/components/ErrorBanner";
import { hasTargetVoice, speak } from "@/lib/tts";
import { ExercisePlayer, type ExerciseOutcome } from "@/components/ExercisePlayer";
import { ExerciseBoundary } from "@/components/ExerciseBoundary";
import { SfxToggle } from "@/components/SfxToggle";
import { TTSGuard } from "@/components/TTSGuard";
import { checkNewBadges } from "@/lib/badgeTracker";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import type { Badge } from "@/lib/achievements";
import type { Exercise, Phase, ServerState } from "@/lib/types";
import { modeOfExercise } from "@/lib/types";
import ls from "@/components/lesson.module.css";
import ex from "@/components/ex.module.css";
import rs from "./reto.module.css";

type Run = {
  seed: number;
  slot: number; // 0-based: ejercicio en curso
  lives: number;
  usedIds: string[];
  current: Exercise | null;
  outcomes: ExerciseOutcome[];
  /** los que se te escaparon: para la pantalla final (con audio) */
  escaped: { expected: string; prompt: string }[];
};

export default function RetoPage({ pastPhraseIds }: {
  /** ids de frase de los módulos anteriores, para las visitas del pasado
   *  (los calcula la página: recorrer esos módulos aquí obligaría a traerlos) */
  pastPhraseIds: string[];
}) {
  if (!has("challenges")) notFound();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const phase = params.id.startsWith("nivel-")
    ? levelPseudoPhase(params.id.slice("nivel-".length))
    : Object.values(courses).flatMap((c) => c.phases).find((p) => p.id === params.id) ?? null;
  const phaseLang = phase ? retoLangOf(phase.id) : null;
  useEffect(() => {
    if (phaseLang) adoptLang(phaseLang);
  }, [phaseLang]);
  // El mazo se baraja al pulsar «Empezar» con los ejercicios del módulo y
  // tarjetas de todo el idioma: los dos se piden al entrar, mientras se lee
  // la portada, y están listos al pulsarlo.
  const fullPhase = useRef<Phase | null>(null);
  useEffect(() => {
    if (!phase || !phaseLang) return;
    void loadVocab(phaseLang).catch(() => undefined);
    void loadFullPhase(phase).then((p) => (fullPhase.current = p), () => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase?.id, phaseLang]);

  const { state } = useProgress({ due: false });
  const st = state === "loading" ? null : state;

  const [run, setRun] = useState<Run | null>(null);
  const [phase2, setPhase2] = useState<"intro" | "run" | "won" | "dead">("intro");
  const [server, setServer] = useState<ServerState | null | "pending">(null);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [confirmExit, setConfirmExit] = useState(false);
  // La portada no es trabajo. La run, sí: cerrar la pestaña se la lleva.
  // Al ganar o al caer ya se pidió el guardado, y volver a preguntar estorba.
  useLeaveGuard(hayQuePreguntarAlSalir({ retoEnMarcha: phase2 === "run" }));
  const deckRef = useRef<RetoDeck | null>(null);
  const rngRef = useRef<() => number>(() => Math.random());
  const reported = useRef(false);

  if (!phase) notFound();

  // gating: el reto se abre al COMPLETAR su módulo (taller de dev: siempre)
  const unlocked =
    isSandboxProfile() || state === "loading" || !st || (phaseCompleted(phase, st) && phaseUnlocked(phase, st));
  const medal = retoMedal(st, phase.id);
  const backHref = phase.id.startsWith("nivel-") ? `/nivel/${phase.id.slice("nivel-".length)}` : `/modulo/${phase.id}`;

  function startRun() {
    const vocab = loadedVocab(phaseLang!);
    const full = fullPhase.current;
    if (!vocab || !full) {
      // red muy lenta: la run arranca en cuanto llegue lo que falta
      void Promise.all([loadVocab(phaseLang!), loadFullPhase(phase!)]).then(([, p]) => {
        fullPhase.current = p;
        startRun();
      }, () => undefined);
      return;
    }
    // semilla y mazo en handler/efecto — jamás en render (regla #418)
    const seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
    const rng = mulberry32(seed ^ 0x9e3779b9);
    const deck = buildRetoDeck(full, st, hasTargetVoice(), seed, { vocab, pastPhraseIds });
    deckRef.current = deck;
    rngRef.current = rng;
    reported.current = false;
    const first = pickNext(deck, 0, RETO_LIVES, new Set(), rng);
    if (!first) return; // módulo sin pool corregible: el botón ni se muestra
    setRun({ seed, slot: 0, lives: RETO_LIVES, usedIds: [first.id], current: first, outcomes: [], escaped: [] });
    setPhase2("run");
  }

  function onExerciseDone(o: ExerciseOutcome) {
    // el updater es PURO (StrictMode lo invoca doble): solo computa estado;
    // el reporte (POST + ledger) vive en el efecto de abajo
    setRun((r) => {
      if (!r || !deckRef.current || r.current === null) return r;
      const lives = o.correct ? r.lives : r.lives - 1;
      const escaped = o.correct
        ? r.escaped
        : [...r.escaped, { expected: expectedOf(r.current), prompt: r.current?.prompt ?? "" }];
      const outcomes = [...r.outcomes, o];
      const nextSlot = r.slot + 1;
      if (lives <= 0 || nextSlot >= RETO_SIZE) {
        return { ...r, lives, outcomes, escaped, current: null };
      }
      const used = new Set(r.usedIds);
      const next = pickNext(deckRef.current, nextSlot, lives, used, rngRef.current);
      if (!next) {
        return { ...r, lives, outcomes, escaped, current: null };
      }
      used.add(next.id);
      return { ...r, slot: nextSlot, lives, outcomes, escaped, current: next, usedIds: [...used] };
    });
  }

  // run terminada (current volvió a null en fase run) → reportar UNA vez
  useEffect(() => {
    if (phase2 === "run" && run && run.current === null && run.outcomes.length > 0) {
      finishRun(run.outcomes, run.lives, run.escaped);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, phase2]);

  function finishRun(outcomes: ExerciseOutcome[], lives: number, escaped: Run["escaped"]) {
    const hits = outcomes.filter((o) => o.correct).length;
    const survived = lives > 0 && outcomes.length >= RETO_SIZE;
    setPhase2(survived ? "won" : "dead");
    if (reported.current) return;
    reported.current = true;
    // SRS ASIMÉTRICO: solo aciertos viajan (una recuperación es una
    // recuperación); los fallos no tocan el intervalo — van al ledger ×3
    const okItems = outcomes.filter((o) => o.correct).flatMap((o) => o.itemIds.map((it) => ({ itemId: it, correct: true, mode: o.mode })));
    const missIds = outcomes.filter((o) => !o.correct).flatMap((o) => o.itemIds);
    recordRetoMisses(missIds);
    setServer("pending");
    postLessonResult(retoId(phase!.id), hits / RETO_SIZE, okItems).then((s) => {
      setServer(s);
      if (s) setNewBadges(checkNewBadges(s));
      // `null` = no se guardó (motor caído, disco lleno). Las otras seis
      // pantallas ya lo decían; esta se quedaba tan tranquila afirmando que
      // «cada acierto cuenta como repaso de verdad» con el crédito tirado.
    });
  }

  const hits = run?.outcomes.filter((o) => o.correct).length ?? 0;

  return (
    <div className={ls.wrap}>
      <TTSGuard />
      <div className={ls.topBar}>
        {confirmExit ? (
          <span className={rs.exitConfirm}>
            ¿Abandonar la run? No pierdes nada — el reto es terreno de juego.{" "}
            <Link href={backHref} className={ex.btnGhost}>Salir</Link>{" "}
            <button className={ex.btnPrimary} onClick={() => setConfirmExit(false)}>Seguir</button>
          </span>
        ) : (
          <button
            className={ls.closeBtn}
            aria-label="Salir del reto"
            onClick={() => (phase2 === "run" ? setConfirmExit(true) : router.push(backHref))}
          >
            <X size={20} weight="bold" aria-hidden />
          </button>
        )}
        {phase2 === "run" && run && (
          <>
            <div
              className={ls.progressTrack}
              role="progressbar"
              aria-valuenow={run.slot}
              aria-valuemin={0}
              aria-valuemax={RETO_SIZE}
              aria-label="Progreso de la run"
            >
              <div className={ls.progressFill} style={{ width: `${(run.slot / RETO_SIZE) * 100}%` }} />
            </div>
            <span className={rs.lives} aria-label={`${run.lives} vidas`}>
              {Array.from({ length: RETO_LIVES }, (_, i) => (
                <LifeHeart key={i} size={18} spent={i >= run.lives} />
              ))}
            </span>
            <span className={ls.stepCount}>{Math.min(run.slot + 1, RETO_SIZE)}/{RETO_SIZE}</span>
          </>
        )}
        <SfxToggle />
      </div>

      {phase2 === "intro" && (
        <div className={ls.doneWrap}>
          <span className={rs.introIcon}>
            <DuelSeal size={84} />
          </span>
          <h1 className={ls.doneTitle}>Reto: {phase.title}</h1>
          {!unlocked ? (
            <>
              <p className={ls.doneSub}>
                El reto se abre al completar el módulo. Es tu terreno de prueba, no tu profesor.
              </p>
              <Link href={backHref} className={ex.btnPrimary}>Volver</Link>
            </>
          ) : (
            <>
              <p className={ls.doneSub}>
                10 ejercicios de todo el módulo, de reconocer a producir, con 3 vidas. Cada run
                sale distinta, y jugarla nunca te resta nada: aquí solo se gana.
              </p>
              <ul className={rs.rules}>
                <li><LifeHeart size={15} /> Cada fallo cuesta una vida, y te enseña la respuesta al momento.</li>
                <li>Los ejercicios cambian en cada run, y algunos vienen de módulos pasados.</li>
                <li>El número 10 siempre lo escribes tú.</li>
                <li><MedalArt kind="bronce" size={16} /> Medallas por tu mejor run: bronce ≥8 · plata ≥9 · oro 10/10.</li>
              </ul>
              {medal && (
                <p className={rs.medalNow}>
                  <MedalArt kind={medal} size={26} /> Tu mejor marca: {MEDAL_LABEL[medal]}
                </p>
              )}
              <button className={ex.btnPrimary} onClick={startRun} autoFocus disabled={state === "loading"}>
                {state === "loading" ? "Cargando tu progreso…" : "Empezar la run"}
              </button>
            </>
          )}
        </div>
      )}

      {phase2 === "run" && run?.current && (
        <ExerciseBoundary
          key={run.current.id}
          onSkip={() =>
            onExerciseDone({ exerciseId: run.current!.id, correct: false, score: 0, usedHints: 0, attempts: 1, itemIds: [], mode: modeOfExercise(run.current!) })
          }
        >
          <ExercisePlayer ex={run.current} onDone={onExerciseDone} arena />
        </ExerciseBoundary>
      )}

      {(phase2 === "won" || phase2 === "dead") && run && (
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>
            {phase2 === "won"
              ? hits >= RETO_SIZE
                ? "Run perfecta"
                : "Run completada"
              : "Esta vez ganó la run"}
          </h1>
          <p className={ls.doneSub}>
            {phase2 === "won"
              ? `${hits}/${RETO_SIZE}. Cada acierto aquí cuenta como repaso de verdad.`
              : `Llegaste al ejercicio ${run.outcomes.length} con ${hits} aciertos. No se pierde nada: lo fallado vuelve pronto en tu repaso.`}
          </p>
          {server === null && (
            <p className={ls.doneSub} role="alert" style={{ color: "var(--err, #b3323e)", fontWeight: 700 }}>
              Ojo: esta run <b>no se ha guardado</b>. {saveFailureDetail(motorOffText())}
            </p>
          )}

          {(() => {
            // la medalla que enseñamos es la de ESTA run; la histórica va aparte
            const runMedal =
              // La medalla de esta run se calcula EXACTAMENTE como la que se
              // guarda (lib/retoRun.ts: solo la nota). Antes la pantalla exigía
              // además 2 vidas para la plata, así que terminar 9/10 con una vida
              // te daba bronce aquí y plata en «Mi expedición»: dos verdades
              // distintas para la misma run.
              phase2 === "won"
                ? hits >= RETO_SIZE
                  ? ("oro" as const)
                  : hits >= 9
                    ? ("plata" as const)
                    : hits >= 8
                      ? ("bronce" as const)
                      : null
                : null;
            const hist = retoMedal(server && server !== "pending" ? server : st, phase.id);
            return (
              <>
                {runMedal && (
                  <p className={rs.medalNow}>
                    <MedalArt kind={runMedal} size={30} /> {MEDAL_LABEL[runMedal]}
                  </p>
                )}
                {!runMedal && hist && (
                  <p className={rs.medalNow} style={{ color: "var(--text-3)" }}>
                    <MedalArt kind={hist} size={22} /> Tu mejor marca sigue en pie: {MEDAL_LABEL[hist]}
                  </p>
                )}
              </>
            );
          })()}

          {run.escaped.length > 0 && (
            <div className={rs.escapedBox}>
              <h2 className={rs.escapedTitle}>Los que se te escaparon</h2>
              {run.escaped.map((e, i) => (
                <button key={i} className={rs.escapedRow} onClick={() => e.expected && speak(e.expected)}>
                  <span className={rs.escapedExpected}>{e.expected || "—"}</span>
                  <span className={rs.escapedPrompt}>{e.prompt}</span>
                </button>
              ))}
              <p className={rs.escapedNote}>Tócalos para oírlos — tu próximo repaso los traerá de vuelta.</p>
            </div>
          )}

          <BadgeUnlocks badges={newBadges} />

          <div className={ls.continueRow} style={{ justifyContent: "center", marginTop: 24, gap: 12 }}>
            <button className={ex.btnPrimary} onClick={startRun}>
              <ArrowCounterClockwise size={18} weight="bold" aria-hidden /> Otra run
            </button>
            <Link href={backHref} className={ex.btnGhost}>Volver</Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** texto "esperado" del ejercicio para la lista de escapados (con audio) */
function expectedOf(e: Exercise | null): string {
  if (!e) return "";
  switch (e.type) {
    case "mc":
      return e.options[e.answer] ?? "";
    case "cloze":
      return e.text.includes("___") ? e.text.replace("___", e.answers[0] ?? "") : (e.answers[0] ?? "");
    case "build":
      return e.target;
    case "type":
    case "transform":
      return e.answers[0] ?? "";
    case "listen":
      return e.text;
    case "order":
      return e.sentences[0] ?? "";
    case "hearreal":
      return e.real;
    case "audiomc":
      return e.audio;
    default:
      return "";
  }
}
