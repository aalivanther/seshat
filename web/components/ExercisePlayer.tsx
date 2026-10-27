"use client";

// Orquesta un ejercicio: pistas incrementales, reintento con prompt
// (evidencia: pista + segundo intento consolida mejor que dar la solución),
// feedback específico y consejo pedagógico.

import { useEffect, useRef, useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  Target, PencilSimple, PuzzlePiece, LinkSimple, Keyboard, Headphones, Microphone, Lightbulb, BookBookmark,
  ListNumbers, ArrowsClockwise, SquaresFour, Waveform, Lightning, Ear, NotePencil,
  BookOpen, Rows, Bandaids, ArrowsLeftRight, Presentation,
} from "@phosphor-icons/react";
import { modeOfExercise, type Exercise, type ReviewMode } from "@/lib/types";
import { EXERCISE_KINDS } from "@/lib/exerciseKinds";
import type { GradeResult } from "@/lib/grade";
import { langConfig } from "@/lib/language";
import { buzz, sfxOk, sfxBad } from "@/lib/juice";
import { speak, stopSpeech } from "@/lib/tts";
import { MC, Cloze, Build, Match, TypeEx, Listen, Speak, Order, Transform, Bucket, Shadow, Fastmatch, Hearreal, Write, AudioMC, Read, Gapbank, Errorfix, Paraphrase, Monologue, Translate, isVocabTarget, VoiceMissingNotice } from "./ExerciseKinds";
import { MarkSpark, MarkEar } from "@/components/Art";
import s from "./ex.module.css";

export interface ExerciseOutcome {
  exerciseId: string;
  correct: boolean;
  score: number; // 0..1
  usedHints: number;
  attempts: number;
  itemIds: string[];
  /** reconocer vs producir — el SRS los espacia distinto (PLAN.md §6.1) */
  mode: ReviewMode;
  /** «Casi» del corrector. La nota ya lo baja en score; el pliegue de la
   *  lección lo necesita crudo, porque si no lo ve lo da por recuperación. */
  almost?: boolean;
}

/** Cómo se hace cada tipo — siempre visible, como en un libro de ejercicios */
// El icono puede venir del set o ser de casa (components/Art.tsx): a los
// nuestros les basta con aceptar `size`.
type HowIcon = Icon | ((p: { size?: number }) => React.ReactElement);

const HOW_TO: Record<string, { icon: HowIcon; label: string; how: string }> = {
  mc: { icon: Target, label: "Elige", how: "Una es la buena. Tócala." },
  cloze: { icon: PencilSimple, label: "Completa", how: "Solo lo que va en el hueco, no la frase entera." },
  build: { icon: PuzzlePiece, label: "Construye", how: "Las fichas, en orden. Si te arrepientes, toca una ya colocada y vuelve al montón." },
  match: { icon: LinkSimple, label: "Empareja", how: "Cada tarjeta tiene la suya en la otra columna." },
  type: { icon: Keyboard, label: "Traduce", how: "La frase entera. Si hay botones de letras raras, ahí están para ti." },
  listen: { icon: Headphones, label: "Dictado", how: "Escribe lo que oigas, tal cual. El audio se repite las veces que haga falta." },
  speak: { icon: Microphone, label: "Pronuncia", how: "Léela en voz alta antes de oír el modelo. La comparación es la lección." },
  order: { icon: ListNumbers, label: "Ordena", how: "Las cosas pasaron en un orden. Reconstrúyelo." },
  transform: { icon: ArrowsClockwise, label: "Transforma", how: "Misma frase, otra forma. Cambia solo lo que se te pide." },
  bucket: { icon: SquaresFour, label: "Clasifica", how: "Una palabra, una categoría. Rápido, pero con cabeza." },
  shadow: { icon: Waveform, label: "Sombrea", how: "Repite a la vez que el audio, sin esperar a que acabe. La primera pasada va despacio." },
  fastmatch: { icon: Lightning, label: "Empareja rápido", how: "Emparejar de siempre, con reloj. Bajar de la meta da bonus; pasarse no quita nada." },
  hearreal: { icon: Ear, label: "¿Libro o calle?", how: "Suena una de las dos versiones. Decide cuál oíste; puedes repetirla." },
  write: { icon: NotePencil, label: "Escribe", how: "El examen mira dos cosas: que cumplas cada punto de la lista y que no te salgas del número de palabras." },
  audiomc: { icon: MarkEar, label: "Oído real", how: "Lee la pregunta antes de darle al play. El audio no se escribe en ningún sitio." },
  read: { icon: BookOpen, label: "Lee", how: "Léelo entero antes de responder. El texto no se va, y alguna respuesta no está escrita." },
  gapbank: { icon: Rows, label: "Completa el párrafo", how: "Toca un hueco, luego su palabra. Sobran palabras del banco: descartar no te sirve." },
  errorfix: { icon: Bandaids, label: "Corrige", how: "Un error, uno solo, del tipo que cometemos los hispanohablantes. Escríbela bien." },
  translate: { icon: ArrowsLeftRight, label: "Traduce", how: "Sin fichas ni opciones: la frase entera, de tu cabeza al papel." },
  paraphrase: { icon: ArrowsLeftRight, label: "Dilo de otra manera", how: "Misma idea, otras palabras — sin usar las que están tachadas." },
  monologue: { icon: Presentation, label: "Habla", how: "Apunta ideas, no frases. Luego habla contra el reloj. La segunda pasada saldrá mejor." },
};

export function ExercisePlayer({
  ex, onDone, freshWords, arena = false,
}: {
  ex: Exercise;
  onDone: (o: ExerciseOutcome) => void;
  /** palabras que se estrenan en este ejercicio (solo dentro de una lección:
   *  las calcula su página en el build con lib/newWords.ts) */
  freshWords?: string[];
  /** modo reto: recuperación a una bala — sin pistas ni segundo intento */
  arena?: boolean;
}) {
  // al pasar de ejercicio o salir, cualquier audio pendiente muere aquí
  useEffect(() => stopSpeech, []);
  const [attempt, setAttempt] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);
  const [status, setStatus] = useState<"active" | "retry" | "done">("active");
  const [result, setResult] = useState<GradeResult | null>(null);

  const hints = ex.hints ?? [];

  function handleSubmit(r: GradeResult) {
    setResult(r);
    buzz(r.correct ? 14 : [24, 40, 24]); // confirmación táctil distinta para acierto y fallo
    if (r.correct) sfxOk(); else sfxBad();
    if (r.correct) {
      setStatus("done");
      // refuerzo auditivo: la app LEE la frase que acabas de completar
      // (tras el sonido de acierto; Match ya habla por su cuenta)
      const toSpeak =
        ex.type === "cloze" && ex.text.includes("___")
          ? ex.text.replace("___", r.expected)
          : ex.type === "type" || ex.type === "build"
            ? r.expected
            : ex.type === "mc" && isVocabTarget(r.expected)
              ? r.expected
              : null;
      if (toSpeak) setTimeout(() => speak(toSpeak), 420);
      return;
    }
    const canRetry = !arena && EXERCISE_KINDS[ex.type].retryable && attempt === 0;
    if (canRetry) {
      // prompt: pista automática + segundo intento
      if (hintsShown < hints.length) setHintsShown(hintsShown + 1);
      setStatus("retry");
      setAttempt(1);
    } else {
      setStatus("done");
    }
  }

  const finished = useRef(false);

  function finish() {
    if (finished.current) return; // doble click en Continuar no duplica el resultado
    finished.current = true;
    const correct = result?.correct ?? false;
    const almost = result?.almost === true;
    const clean = correct && attempt === 0 && hintsShown === 0 && !almost;
    onDone({
      exerciseId: ex.id,
      correct,
      // La nota no se endurece: el sucio sigue en 0,75. almost viaja aparte
      // porque el pliegue no distingue un «casi» de un acierto si no lo ve.
      score: clean ? 1 : correct ? 0.75 : 0,
      usedHints: hintsShown,
      attempts: attempt + 1,
      itemIds: ex.itemIds ?? [],
      mode: modeOfExercise(ex),
      almost,
    });
  }

  const locked = status === "done";
  const kindProps = { locked, attempt, onSubmit: handleSubmit };

  // fallback: un tipo nuevo sin ficha de instrucciones jamás debe romper la lección
  const howTo = HOW_TO[ex.type] ?? { icon: Lightbulb, label: "Ejercicio", how: "Sigue lo que pide la tarjeta." };
  const HowIcon = howTo.icon;

  return (
    <div className={`${s.card} ${s.cardEnter}`}>
      <div className={s.typeChip}>
        <HowIcon size={16} weight="duotone" aria-hidden /> {howTo.label}
      </div>
      <p className={s.prompt}>{ex.prompt}</p>
      <p className={s.howTo}>{howTo.how}</p>

      {/* Honestidad del audio: si el ejercicio ES de oído y el sistema no tiene
          voz del idioma, se dice AQUÍ —antes del botón de reproducir, antes de
          gastar ninguna escucha— y una sola vez por tarjeta. Colgarlo de cada
          bocina lo repetía ocho veces en la misma pantalla; no ponerlo en
          ninguna dejaba al alumno gastando escuchas en silencio. */}
      <VoiceMissingNotice type={ex.type} />

      {freshWords && (() => {
        const fresh = freshWords;
        if (fresh.length === 0) return null;
        return (
          <p className={s.newWords} role="note">
            <MarkSpark size={15} />{" "}
            {fresh.length === 1 ? "Palabra nueva" : "Palabras nuevas"}:{" "}
            {fresh.map((w, i) => (
              <span key={w}>
                {i > 0 && ", "}
                <b lang={langConfig().htmlLang}>{w}</b>
              </span>
            ))}{" "}
            — se {fresh.length === 1 ? "estrena" : "estrenan"} aquí, apoyada
            {fresh.length === 1 ? "" : "s"} en lo que ya sabes.
          </p>
        );
      })()}

      {ex.type === "mc" && <MC ex={ex} {...kindProps} />}
      {ex.type === "cloze" && <Cloze ex={ex} {...kindProps} />}
      {ex.type === "build" && <Build ex={ex} {...kindProps} />}
      {ex.type === "match" && <Match ex={ex} {...kindProps} />}
      {ex.type === "type" && <TypeEx ex={ex} {...kindProps} />}
      {ex.type === "listen" && <Listen ex={ex} {...kindProps} />}
      {ex.type === "speak" && <Speak ex={ex} {...kindProps} />}
      {ex.type === "order" && <Order ex={ex} {...kindProps} />}
      {ex.type === "transform" && <Transform ex={ex} {...kindProps} />}
      {ex.type === "bucket" && <Bucket ex={ex} {...kindProps} />}
      {ex.type === "shadow" && <Shadow ex={ex} {...kindProps} />}
      {ex.type === "fastmatch" && <Fastmatch ex={ex} {...kindProps} />}
      {ex.type === "hearreal" && <Hearreal ex={ex} {...kindProps} />}
      {ex.type === "write" && <Write ex={ex} {...kindProps} />}
      {ex.type === "audiomc" && <AudioMC ex={ex} {...kindProps} />}
      {ex.type === "read" && <Read ex={ex} {...kindProps} />}
      {ex.type === "gapbank" && <Gapbank ex={ex} {...kindProps} />}
      {ex.type === "errorfix" && <Errorfix ex={ex} {...kindProps} />}
      {ex.type === "translate" && <Translate ex={ex} {...kindProps} />}
      {ex.type === "paraphrase" && <Paraphrase ex={ex} {...kindProps} />}
      {ex.type === "monologue" && <Monologue ex={ex} {...kindProps} />}

      {/* Pistas reveladas */}
      {hints.slice(0, hintsShown).map((h, i) => (
        <div key={i} className={s.hintBox} role="status">
          <Lightbulb size={16} weight="duotone" style={{ verticalAlign: "-3px" }} aria-hidden /> {h}
        </div>
      ))}

      {/* Feedback en tiempo real */}
      {status === "retry" && result && (
        <div className={`${s.feedback} ${s.feedbackAlmost}`} role="status">
          <div className={s.feedbackTitle}>
            {result.almost ? "Casi" : "No es eso"} — te queda otro intento
          </div>
          {result.feedback && result.almost === false && (
            <div className={s.feedbackBody}>{result.feedback}</div>
          )}
        </div>
      )}

      {status === "done" && result && (
        <div
          className={`${s.feedback} ${
            result.correct ? (result.almost ? s.feedbackAlmost : s.feedbackOk) : s.feedbackBad
          }`}
          role="status"
        >
          <div className={s.feedbackTitle}>
            {result.correct
              ? result.almost || hintsShown > 0 || attempt > 0
                ? "Bien — acierto parcial (75%)"
                : `${langConfig().cheer} (100%)`
              : "Esta vez no — mira la solución"}
          </div>
          {result.feedback && <div className={s.feedbackBody}>{result.feedback}</div>}
          {!result.correct && result.expected && (
            <div className={s.feedbackBody}>
              La respuesta era: <b lang={langConfig().htmlLang}>{result.expected}</b>
            </div>
          )}
        </div>
      )}

      {status === "done" && ex.tip && (
        <div className={s.tip}>
          <BookBookmark size={16} weight="duotone" style={{ verticalAlign: "-3px" }} aria-hidden /> {ex.tip}
        </div>
      )}

      <div className={s.footer}>
        <div>
          {!arena && status !== "done" && hintsShown < hints.length && (
            <button
              className={s.btnGhost}
              onClick={() => setHintsShown(hintsShown + 1)}
              title="Usar pista limita este ejercicio a acierto parcial (75%)"
            >
              Pista ({hints.length - hintsShown}) · acierto parcial
            </button>
          )}
        </div>
        {/* Al cerrar el ejercicio el foco no salta aquí: se llega con el
            tabulador y se sigue con Intro. Enfocarlo solo en cada tarjeta
            le quita el sitio a quien iba leyendo el fallo. */}
        {status === "done" && (
          <button className={s.btnPrimary} onClick={finish}>
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}
