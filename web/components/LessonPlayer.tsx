"use client";

// Flujo de una micro-lección: frases usables → nota gramatical → ejercicios → resumen.

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { animate } from "motion";
import { celebrate, SPRING, sfxFanfare } from "@/lib/juice";
import type { Exercise, GrammarNote, Lesson, NativoCard, VocabItem } from "@/lib/types";
import { modeOfExercise } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/lib/useConfirm";
import { useLeaveGuard } from "@/lib/useLeaveGuard";
import { courseOf, langOfPhase } from "@/data/course";
import { PhaseIcon } from "@/lib/phaseMeta";
import { postLessonResult } from "@/lib/api";
import { foldLessonItems } from "@/lib/lessonFold";
import { hasTargetVoice, speak } from "@/lib/tts";
import { glossify, sanitizeNoteHtml } from "@/lib/sanitize";
import { langConfig } from "@/lib/language";
import { adoptLang } from "@/lib/languages";
import type { ServerState } from "@/lib/types";
import { checkNewBadges } from "@/lib/badgeTracker";
import { useProgress } from "@/lib/useProgress";
import { phaseUnlocked, prevPhaseOf } from "@/lib/unlock";
import { getProfile } from "@/lib/api";
import { seenItems, MIN_SEEN_FOR_REVIEW } from "@/lib/reviewSession";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "./BadgeUnlocks";
import { ExercisePlayer, type ExerciseOutcome } from "./ExercisePlayer";
import { ExerciseBoundary } from "./ExerciseBoundary";
import { useTargetVoice } from "@/lib/useTargetVoice";
import { SpeakerIcon } from "./Speaker";
import { LangBadge } from "./LangBadge";
import { MOTOR_OFF } from "./ErrorBanner";
import { saveFailureDetail } from "@/lib/api";
import { SfxToggle } from "./SfxToggle";
import { QuitButton } from "./QuitButton";
import { NativoCardView } from "./NativoCard";
import { resolveItems } from "@/lib/resolveItems";
import ls from "./lesson.module.css";
import ex from "./ex.module.css";

type Step =
  | { kind: "phrases"; title?: string; items: VocabItem[]; missing?: string[] }
  | { kind: "note"; note: GrammarNote }
  | { kind: "exercise"; exercise: Exercise }
  | { kind: "nativo"; card: NativoCard };

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  // idioma DUEÑO de esta lección: su curso y su config lingüística (TTS,
  // corrección, artículos) — adoptado al montar, antes de tocar ejercicio
  const lang = langOfPhase(lesson.phaseId);
  const course = courseOf(lang);
  useEffect(() => adoptLang(lang), [lang]);

  // BORRADOR EN EL NAVEGADOR, y ahí se queda: no es el del simulacro.
  // ExamPlayer manda el reloj al perfil para que aguante el teléfono; una
  // lección a medias no entra en ese contrato (dos pestañas lo harían mal).
  // Un F5 o que el sistema mate la pestaña no debe tirar lo ya respondido.
  // Se guarda el paso y las notas de los ejercicios ya cerrados; el ejercicio
  // a medio escribir en pantalla, no (el simulacro tampoco guarda el ítem
  // a medias).
  const draftKey = `seshat-leccion-${lesson.id}`;
  const [restored, setRestored] = useState(false);
  const draftLoaded = useRef(false);

  const { confirm, dialog } = useConfirm();
  const router = useRouter();
  async function pedirSalida() {
    const ok = await confirm({
      title: "¿Salir de la lección?",
      body: "Lo que llevas hecho aquí no se guarda: una lección cuenta cuando se termina.",
      confirmLabel: "Salir sin guardar",
      danger: true,
    });
    if (!ok) return;
    try { window.localStorage.removeItem(draftKey); } catch { /* da igual */ }
    router.push(`/modulo/${lesson.phaseId}`);
  }

  // el vocabulario sale de course (del idioma): pasarlo como prop serializaba
  // los 860 ítems en el HTML/RSC de las 168 páginas de lección
  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [];
    for (const sec of lesson.sections) {
      if (sec.kind === "phrases" && sec.itemIds) {
        const resolved = resolveItems(sec.itemIds, course.vocab);
        out.push({ kind: "phrases", title: sec.title, items: resolved.items, missing: resolved.missing });
      } else if (sec.kind === "note" && sec.note) {
        out.push({ kind: "note", note: sec.note });
      } else if (sec.kind === "exercises" && sec.exercises) {
        for (const e of sec.exercises) out.push({ kind: "exercise", exercise: e });
      } else if (sec.kind === "nativo" && sec.nativo) {
        // el postre: SIEMPRE tras el cierre (validador lo garantiza)
        out.push({ kind: "nativo", card: sec.nativo });
      }
    }
    return out;
  }, [lesson]);

  // gating: si el módulo de esta lección aún no toca, se explica y se redirige.
  // dueCount no se pinta: pedir /api/due aquí sería la deuda que el producto
  // decidió no enseñar.
  const { state: progState } = useProgress({ due: false });
  const phaseOfLesson = course.phases.find((p) => p.id === lesson.phaseId) ?? null;
  const lessonLocked =
    progState !== "loading" && phaseOfLesson !== null && !phaseUnlocked(phaseOfLesson, progState);

  // puerta de repaso: invitación opcional ANTES de la lección (spec del repaso
  // exprés). Solo si ya hay material visto, y como mucho una vez por hora —
  // invitar, jamás estorbar. Se decide en efecto (localStorage: no en render).
  const [reviewOffer, setReviewOffer] = useState<"idle" | "show" | "done">("idle");
  useEffect(() => {
    if (progState === "loading" || reviewOffer !== "idle") return;
    const st = progState;
    const key = `review-offer-${getProfile() || "default"}`;
    const last = Number(window.localStorage.getItem(key) ?? 0);
    const hourAgo = Date.now() - 60 * 60 * 1000;
    if (st && seenItems(st, lang).length >= MIN_SEEN_FOR_REVIEW && last < hourAgo) {
      window.localStorage.setItem(key, String(Date.now()));
      setReviewOffer("show");
    } else {
      setReviewOffer("done");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progState]);

  const [idx, setIdx] = useState(0);
  const [outcomes, setOutcomes] = useState<ExerciseOutcome[]>([]);
  const [server, setServer] = useState<ServerState | null | "pending">("pending");
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  const total = steps.length;
  // lección vacía (error de contenido; el validador lo impide en build): sin
  // pasos no hay nada que guardar — el chip "Guardando…" no debe quedarse
  const finished = total === 0 || idx >= total;
  useEffect(() => {
    if (total === 0) setServer(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // recuperar el borrador al montar (una sola vez, y solo si es de hoy)
  useEffect(() => {
    if (draftLoaded.current) return;
    draftLoaded.current = true;
    try {
      const raw = window.localStorage.getItem(draftKey);
      if (!raw) return;
      const d = JSON.parse(raw) as { idx: number; outcomes: ExerciseOutcome[]; at: number };
      // un borrador de hace más de un día es de otra sesión: no se resucita
      if (!d || Date.now() - d.at > 24 * 3600_000) {
        window.localStorage.removeItem(draftKey);
        return;
      }
      if (d.idx > 0 || (d.outcomes?.length ?? 0) > 0) {
        setIdx(Math.min(d.idx, total));
        setOutcomes(d.outcomes ?? []);
        setRestored(true);
      }
    } catch {
      /* borrador ilegible: se empieza de cero, que es lo de siempre */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  // guardar el borrador en cada paso y en cada ejercicio cerrado
  useEffect(() => {
    if (!draftLoaded.current) return;
    try {
      if (finished) {
        window.localStorage.removeItem(draftKey); // terminada: ya no es borrador
        return;
      }
      window.localStorage.setItem(
        draftKey,
        JSON.stringify({ idx, outcomes, at: Date.now() }),
      );
    } catch {
      /* sin espacio o modo privado: la lección sigue, solo que sin red */
    }
  }, [draftKey, idx, outcomes, finished]);

  // el navegador pregunta antes de tirar una lección a medias — solo mientras
  // queda trabajo sin guardar, no ya en la pantalla de resultados
  useLeaveGuard(!finished);

  async function complete(all: ExerciseOutcome[]) {
    const exOutcomes = all;
    const score = exOutcomes.length
      ? exOutcomes.reduce((s, o) => s + o.score, 0) / exOutcomes.length
      : 1;
    const items = foldLessonItems(exOutcomes);
    const st = await postLessonResult(lesson.id, score, items);
    setServer(st);
    if (st) setNewBadges(checkNewBadges(st));
  }

  function onExerciseDone(o: ExerciseOutcome) {
    const next = [...outcomes, o];
    setOutcomes(next);
    if (idx + 1 >= total) {
      complete(next);
    }
    setIdx(idx + 1);
  }

  function advance() {
    if (idx + 1 >= total) complete(outcomes);
    setIdx(idx + 1);
  }

  const score = outcomes.length
    ? Math.round((outcomes.reduce((s, o) => s + o.score, 0) / outcomes.length) * 100)
    : 100;
  const correct = outcomes.filter((o) => o.correct).length;
  // El corte de «hecha» lo pone el servidor. El confeti espera a completed:
  // un 80 local no desbloquea el módulo. La frase, mientras el POST no
  // vuelve, sigue el 80 de siempre — el guardado reintenta y no debe
  // parpadear — y se corrige si la respuesta no coincide.
  const hayRespuesta = server !== "pending";
  const dominada =
    server !== "pending" && server !== null && !!server.lessons[lesson.id]?.completed;
  const fraseDominada = hayRespuesta ? dominada : score >= 80;

  useEffect(() => {
    if (!finished || total <= 0 || !dominada) return;
    celebrate(score >= 95);
    sfxFanfare();
  }, [finished, total, dominada, score]);

  if (reviewOffer === "show" && !lessonLocked) {
    return (
      <div className={ls.wrap}>
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>¿Repasas antes de empezar?</h1>
          <p className={ls.doneSub}>
            Cinco minutos con lo que ya sabes, y preguntas nuevas cada vez. Con la memoria
            caliente la lección entra mejor. Si no te apetece, sigue de largo.
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center", gap: 12 }}>
            <button className={ex.btnGhost} onClick={() => setReviewOffer("done")}>
              Ir directo a la lección
            </button>
            <Link href={`/review?then=/lesson/${lesson.id}`} className={ex.btnPrimary} style={{ display: "inline-flex", alignItems: "center" }}>
              Repaso exprés primero
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (lessonLocked) {
    const prev = phaseOfLesson ? prevPhaseOf(phaseOfLesson) : null;
    return (
      <div className={ls.wrap}>
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>Todavía no toca</h1>
          <p className={ls.doneSub}>
            Esta lección es del módulo «{phaseOfLesson?.title}», que se abre al terminar
            «{prev?.title}». Cada módulo recicla el anterior: por eso van en ese orden.
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center" }}>
            <Link href={`/modulo/${prev?.id ?? phaseOfLesson?.id}`} className={ex.btnPrimary}>
              Ir a «{prev?.title ?? "el módulo anterior"}»
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const missingIds = steps.flatMap((st) => (st.kind === "phrases" ? st.missing ?? [] : []));
  if (missingIds.length > 0) {
    return (
      <div className={ls.wrap}>
        <div className={ls.doneWrap}>
          <h1 className={ls.doneTitle}>Contenido incompleto</h1>
          <p className={ls.doneSub} role="alert">
            Esta lección apunta a tarjetas que no están en este cuaderno. No estudies esto:
            el build debió pararse. Si lo ves, es un pack a medias.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={ls.wrap}>
      {dialog}
      {restored && !finished && (
        <p
          role="status"
          style={{
            margin: "8px 0 0", padding: "10px 14px", borderRadius: "var(--radius-hand)",
            background: "var(--panel)", color: "var(--text-2)", fontWeight: 600,
          }}
        >
          Retomas donde lo dejaste: tus respuestas estaban guardadas en este dispositivo.
        </p>
      )}
      <div className={ls.topBar}>
        <Link
          href={`/modulo/${lesson.phaseId}`}
          className={ls.closeBtn}
          aria-label="Salir de la lección"
          onClick={(e) => {
            // con trabajo hecho se pregunta con el diálogo de la casa, que es
            // asíncrono: se corta la navegación y se hace a mano al confirmar
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
          aria-valuenow={Math.min(idx, total)}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label="Progreso de la lección"
        >
          <div className={ls.progressFill} style={{ width: `${total > 0 ? (Math.min(idx, total) / total) * 100 : 0}%` }} />
        </div>
        <span className={ls.stepCount}>{Math.min(idx + 1, total)}/{total}</span>
      </div>

      {!finished && (
        <div className={ls.lessonHead}>
          <h1 className={ls.lessonTitle} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <PhaseIcon id={lesson.phaseId} size={24} color="var(--accent-text)" /> {lesson.title}
          </h1>
          <p className={ls.lessonSub}>{lesson.subtitle}</p>
        </div>
      )}

      {!finished && (
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={SPRING}
          >
            {steps[idx].kind === "phrases" && (
              <PhrasesStep step={steps[idx] as Extract<Step, { kind: "phrases" }>} onNext={advance} />
            )}
            {steps[idx].kind === "note" && (
              <NoteStep note={(steps[idx] as Extract<Step, { kind: "note" }>).note} onNext={advance} />
            )}
            {steps[idx].kind === "nativo" && (
              <div className={`${ex.card} ${ex.cardEnter}`}>
                <NativoCardView card={(steps[idx] as Extract<Step, { kind: "nativo" }>).card} />
                <div className={ex.footer} style={{ marginTop: 16 }}>
                  <span />
                  <button className={ex.btnPrimary} onClick={advance} autoFocus>
                    Continuar
                  </button>
                </div>
              </div>
            )}
            {steps[idx].kind === "exercise" && (() => {
              const exercise = (steps[idx] as Extract<Step, { kind: "exercise" }>).exercise;
              return (
                // un ejercicio roto no atasca la lección: el boundary ofrece
                // saltarlo y lo reporta como fallo
                <ExerciseBoundary
                  key={exercise.id}
                  onSkip={() =>
                    onExerciseDone({ exerciseId: exercise.id, correct: false, score: 0, usedHints: 0, attempts: 1, itemIds: [], mode: modeOfExercise(exercise) })
                  }
                >
                  <ExercisePlayer lessonId={lesson.id} ex={exercise} onDone={onExerciseDone} />
                </ExerciseBoundary>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      )}

      {finished && (
        <div className={ls.doneWrap}>
          <ScoreRing pct={score} />
          <h1 className={ls.doneTitle}>
            {score >= 90 ? langConfig().praise[0] : score >= 70 ? langConfig().praise[1] : langConfig().praise[2]}
          </h1>
          <p className={ls.doneSub}>
            {fraseDominada
              ? "Lección dominada. Lo de hoy volverá a aparecer justo antes de que se te olvide."
              : "Completada. Lo que fallaste vuelve pronto; el resto, más adelante."}
          </p>

          <div className={ls.statRow}>
            <div className={ls.stat}>
              <div className={`${ls.statVal} num`}>{score}%</div>
              <div className={ls.statLabel}>Nota</div>
            </div>
            <div className={ls.stat}>
              <div className={`${ls.statVal} num`}>{correct}/{outcomes.length}</div>
              <div className={ls.statLabel}>Ejercicios</div>
            </div>
            {server === "pending" && (
              <div className={ls.stat} aria-label="Guardando progreso">
                <div className={`${ls.statVal} num`}>…</div>
                <div className={ls.statLabel}>Guardando</div>
              </div>
            )}
            {server && server !== "pending" && (
              <>
                <div className={ls.stat}>
                  <div className={`${ls.statVal} num`}><CountUp to={server.xp} /></div>
                  <div className={ls.statLabel}>XP total</div>
                </div>
                <div className={ls.stat}>
                  <div className={`${ls.statVal} num`}>{server.streakDays}</div>
                  <div className={ls.statLabel}>Días de racha</div>
                </div>
              </>
            )}
          </div>

          <BadgeUnlocks badges={newBadges} />

          {server === null && (
            <p className={ls.offline} role="alert">
              El progreso de esta sesión no quedó guardado. {saveFailureDetail(MOTOR_OFF)}
            </p>
          )}

          {lesson.resources && lesson.resources.length > 0 && (
            <div className={ls.resources}>
              <h2 className={ls.resourcesTitle}>Sigue escuchando {langConfig().spanishName} del bueno</h2>
              {lesson.resources.map((r) => (
                <a key={r.url + r.label} className={ls.resourceCard} href={r.url} target="_blank" rel="noreferrer">
                  <div className={ls.resourceLabel}>{r.label} ↗</div>
                  <div className={ls.resourceNote}>{r.note}</div>
                  <div className={ls.resourceUrl}>{r.url}</div>
                </a>
              ))}
            </div>
          )}

          <div className={ls.quitRow}>
            <QuitButton />
          </div>

          <div className={ls.continueRow} style={{ justifyContent: "center", marginTop: 28, gap: 12 }}>
            <Link href={`/modulo/${lesson.phaseId}`} className={ex.btnGhost} style={{ display: "inline-flex", alignItems: "center" }}>
              Volver al módulo
            </Link>
            {(() => {
              const all = course.phases.flatMap((p) => p.lessons);
              const i = all.findIndex((l) => l.id === lesson.id);
              const next = i >= 0 && i + 1 < all.length ? all[i + 1] : null;
              return next ? (
                <Link href={`/lesson/${next.id}`} className={ex.btnPrimary} style={{ display: "inline-flex", alignItems: "center" }}>
                  Siguiente: {next.title}
                </Link>
              ) : null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

function PhrasesStep({
  step, onNext,
}: {
  step: { title?: string; items: VocabItem[] };
  onNext: () => void;
}) {
  // sin voz del idioma instalada, la primera impresión sería audio con acento
  // raro y sin explicación — avisar aquí, donde empieza el "toca y escucha"
  const [voiceReady, setVoiceReady] = useState(true);
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) { setVoiceReady(false); return; }
    const check = () => setVoiceReady(hasTargetVoice());
    const t = setTimeout(check, 1200); // las voces cargan async: gracia inicial
    synth.addEventListener("voiceschanged", check);
    return () => { clearTimeout(t); synth.removeEventListener("voiceschanged", check); };
  }, []);
  return (
    <div>
      <p className={ls.phraseIntro}>
        {step.title ?? "Frases usables — primero el uso, la regla después"}
      </p>
      {!voiceReady && (
        <p role="note" style={{ margin: "0 0 12px", padding: "10px 14px", border: "2px dashed var(--warn)", borderRadius: 12, background: "var(--warn-soft)", color: "var(--warn)", fontSize: "0.875rem", fontWeight: 600 }}>
          Este dispositivo no tiene voz de {langConfig().spanishName}, así que lo que oigas
          sonará con acento raro. Se añade gratis en los ajustes de voz del sistema: busca{" "}
          {langConfig().voiceSearch}.
        </p>
      )}
      <div className={ls.phraseList}>
        {step.items.map((v) => (
          <button key={v.id} className={ls.phraseCard} onClick={() => speak(v.target.split("...").join(" "))}>
            <span>
              <span className={ls.phraseDe} lang={langConfig().htmlLang}>
                {v.article ? `${v.article} ` : ""}{v.target.replace(langConfig().articleRegex, "")}
              </span>
              {v.plural && <span className={ls.phraseSound}> · pl. {v.plural}</span>}
              <br />
              <span className={ls.phraseEs}>{v.source}</span>
              {v.sound && <span className={ls.phraseSound}> · suena: {v.sound}</span>}
            </span>
            <span style={{ color: "var(--text-3)", flexShrink: 0 }}><SpeakerIcon /></span>
          </button>
        ))}
      </div>
      <p className={ls.phraseHint}>Toca cada frase para escucharla. Repítela en voz alta antes de seguir.</p>
      <div className={ls.continueRow}>
        <button className={ex.btnPrimary} onClick={onNext}>Ya las escuché</button>
      </div>
    </div>
  );
}

function NoteStep({ note, onNext }: { note: GrammarNote; onNext: () => void }) {
  // voz como estado (no en render): el HTML del servidor y el cliente coinciden
  const voiceReady = useTargetVoice();
  // glosa tocada: se muestra unos segundos junto a la nota
  const [gloss, setGloss] = useState<{ w: string; g: string } | null>(null);
  useEffect(() => {
    if (!gloss) return;
    const t = setTimeout(() => setGloss(null), 3500);
    return () => clearTimeout(t);
  }, [gloss]);

  const lines = useMemo(
    () => sanitizeNoteHtml(glossify(note.body)).split(/<br\s*\/?>/i),
    [note.body],
  );

  function onBodyClick(e: React.MouseEvent) {
    const u = (e.target as Element).closest?.("u[data-g]");
    if (!u) return;
    const w = u.textContent ?? "";
    speak(w);
    setGloss({ w, g: u.getAttribute("data-g") ?? "" });
  }

  const plainOf = (line: string) => line.replace(/<[^>]+>/g, "").replace(/^\s*\d+\.\s*/, "").trim();

  return (
    <div>
      <div className={`${ls.note} paper`}>
        <div className={`${ls.noteKicker} hand`}>La regla detrás de lo que ya usaste</div>
        <h2 className={ls.noteTitle}>{note.title}</h2>
        {note.viz?.kind === "timeline" && <TimelineViz viz={note.viz} />}
        <p className={ls.noteBody} onClick={onBodyClick}>
          {lines.map((line, i) => {
            const isStoryLine = /^\s*\d+\.\s/.test(line.replace(/<[^>]+>/g, ""));
            return (
              <span key={i}>
                {i > 0 && <br />}
                {isStoryLine && voiceReady && (
                  <button
                    type="button"
                    data-sfx="off"
                    className={ls.lineSpeak}
                    onClick={() => speak(plainOf(line))}
                    aria-label={`Escuchar línea ${line.replace(/<[^>]+>/g, "").trim().slice(0, 2)}`}
                  >
                    <SpeakerIcon />
                  </button>
                )}
                <span dangerouslySetInnerHTML={{ __html: line }} />
              </span>
            );
          })}
        </p>
        {gloss && (
          <p className={ls.glossChip} role="status">
            <b lang={langConfig().htmlLang}>{gloss.w}</b> = {gloss.g}
          </p>
        )}
        {note.table && (
          <div style={{ overflowX: "auto" }}>
            <div className={ls.noteTableWrap}>
              <table className={ls.noteTable}>
                <tbody>
                  {note.table.map((row, i) => (
                    <tr key={i}>
                      {/* la primera columna es la etiqueta en español; el resto va
                          en el idioma que se aprende (clavarlo a "de" hacía que
                          una tabla inglesa se leyera con voz alemana) */}
                      {row.map((cell, j) => (
                        <td key={j} lang={j > 0 ? langConfig().htmlLang : undefined}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className={ls.continueRow}>
        <button className={ex.btnPrimary} onClick={onNext}>Entendido</button>
      </div>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const ctrl = animate(Math.max(0, to - 60), to, {
      duration: 0.9,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => ctrl.stop();
  }, [to]);
  return <>{v}</>;
}

function ScoreRing({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const color = pct >= 80 ? "var(--ok)" : pct >= 50 ? "var(--warn)" : "var(--err)";
  return (
    <svg className={ls.scoreRing} viewBox="0 0 120 120" role="img" aria-label={`Puntuación ${pct}%`}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--panel)" strokeWidth="10" />
      <circle
        cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.8s var(--ease)" }}
      />
      <text x="60" y="66" textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text)" className="num">
        {pct}%
      </text>
    </svg>
  );
}

/* Línea del tiempo del tiempo verbal (gramática cognitiva: el tiempo se VE) */
function TimelineViz({ viz }: { viz: NonNullable<GrammarNote["viz"]> }) {
  return (
    <div className={ls.timeline} aria-label={`${viz.pastLabel}: ${viz.pastExample} — ${viz.nowLabel}: ${viz.nowExample}`}>
      <div className={ls.timelinePoint}>
        <span className={`${ls.timelineLabel} hand`}>{viz.pastLabel}</span>
        <span className={ls.timelineDot} />
        <span className={ls.timelineExample} lang={langConfig().htmlLang}>{viz.pastExample}</span>
      </div>
      <div className={ls.timelineArrow} aria-hidden />
      <div className={ls.timelinePoint}>
        <span className={`${ls.timelineLabel} hand`}>{viz.nowLabel}</span>
        <span className={`${ls.timelineDot} ${ls.timelineDotNow}`} />
        <span className={ls.timelineExample} lang={langConfig().htmlLang}>{viz.nowExample}</span>
      </div>
    </div>
  );
}
