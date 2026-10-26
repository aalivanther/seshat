"use client";

// Los tipos de ejercicio. Contrato: cada componente maneja su interacción
// y llama onSubmit(GradeResult) cuando el alumno responde. El player decide
// reintentos, pistas y cierre. `locked` congela la interacción.
//
// Esto no es un tipo: lo usan varios, y si viviera en el barrel que los
// reexporta el import sería un ciclo. La hoja es la compartida: estas piezas
// no tienen clases que sean solo suyas.

import { useEffect, useRef, useState } from "react";
import type { Exercise } from "@/lib/types";
import { charDiff, gradeText, liveCheck, liveShown, type GradeOptions, type GradeResult } from "@/lib/grade";
import { hasTargetVoice } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { vocabTargets as allTargets } from "@/data/vocabTargets.gen";
import { SpeakerSlash } from "@phosphor-icons/react";
import s from "../ex.module.css";

export interface KindProps<T extends Exercise> {
  ex: T;
  locked: boolean;
  /** cambia en cada reintento para no resetear el input del alumno */
  attempt: number;
  onSubmit: (r: GradeResult) => void;
}

/* ---------- Honestidad del audio ---------- */

/** Los tipos en los que el audio ES el ejercicio: sin voz del idioma no hay
 *  tarea, solo silencio —o la voz española leyendo inglés, que es peor porque
 *  parece que la app funciona—. Los demás usan la bocina como apoyo y ya la
 *  esconden solos cuando no hay voz. */
export const AUDIO_KINDS: ReadonlySet<string> = new Set([
  "listen", "speak", "shadow", "hearreal", "audiomc",
]);

// El veredicto sobre las voces es del SISTEMA, no de cada tarjeta: se guarda
// una vez y lo comparten todos los que preguntan. Así el aviso de arriba y el
// botón de abajo nunca opinan distinto, y el segundo ejercicio de oído de la
// sesión no vuelve a pagar la gracia de 1200 ms — el aviso sale ya en el
// primer render. Se guarda CON su LanguageConfig, igual que el caché de voz de
// tts.ts: que no haya voz inglesa no dice nada sobre la alemana.
let voiceVerdict: boolean | null = null;
let voiceVerdictFor: unknown = null;
const voiceWatchers = new Set<(missing: boolean) => void>();

/** Pregunta al sistema AHORA y reparte la respuesta. Devuelve si falta voz. */
export function settleVoice(): boolean {
  const missing = !hasTargetVoice();
  voiceVerdict = missing;
  voiceVerdictFor = langConfig();
  for (const notify of voiceWatchers) notify(missing);
  return missing;
}

/** ¿FALTA la voz del idioma en este sistema? Es el negativo de useTargetVoice,
 *  y no se saca de él con un `!`: aquel arranca en false («todavía no lo sé»)
 *  y el aviso parpadearía en cada ejercicio durante el segundo largo que las
 *  voces del sistema tardan en enumerarse. Este arranca optimista y solo acusa
 *  con pruebas: o el navegador ya enumeró voces y ninguna sirve, o ya hay
 *  veredicto de este mismo idioma, o pasó la gracia y sigue sin haber ninguna. */
export function useVoiceMissing(): boolean {
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    // un navegador sin Web Speech tampoco va a decir nada: también hay que avisar
    if (!synth) { setMissing(true); return; }
    voiceWatchers.add(setMissing);
    // veredicto ya tomado para ESTE idioma: sin espera y sin parpadeo
    if (voiceVerdict !== null && voiceVerdictFor === langConfig()) setMissing(voiceVerdict);
    // lista vacía = las voces aún no han cargado, NO que no haya ninguna
    const check = () => { if (synth.getVoices().length > 0) settleVoice(); };
    check();
    const t = setTimeout(settleVoice, 1200); // veredicto final: no hay ninguna
    synth.addEventListener("voiceschanged", check);
    return () => {
      voiceWatchers.delete(setMissing);
      clearTimeout(t);
      synth.removeEventListener("voiceschanged", check);
    };
  }, []);
  return missing;
}

/** Qué se puede hacer mientras no haya voz, por tipo: un aviso sin salida solo
 *  frustra, y en `audiomc` además hay que decir que no se cobra la escucha. */
const VOICE_FALLBACK: Record<string, string> = {
  audiomc: "Hasta que la instales no se te descuenta ninguna escucha: lo que suene no es el audio del examen.",
  listen: "Mientras tanto, dale a «Mostrar la frase» y practica copiándola: es el mismo ejercicio menos el oído.",
  speak: "Mientras tanto tienes debajo la transcripción «suena como»; el modelo hablado, no.",
  shadow: "Mientras tanto tienes el texto delante: léelo en voz alta y a ritmo, aunque no haya a quién pegarse.",
  hearreal: "Mientras tanto no hay dos versiones que distinguir de oído: quédate con el contraste escrito que sale al responder.",
};

/** Aviso ÚNICO por pantalla. Lo pinta ExercisePlayer una sola vez y no cada
 *  bocina: el alumno tiene que saber que no va a sonar ANTES de gastar una
 *  escucha, y no necesita que se lo repitan ocho veces en la misma tarjeta. */
export function VoiceMissingNotice({ type }: { type: string }) {
  const missing = useVoiceMissing();
  if (!missing || !AUDIO_KINDS.has(type)) return null;
  const idioma = langConfig().spanishName;
  return (
    <div className={s.voiceGap} role="status">
      <div className={s.voiceGapTitle}>
        <SpeakerSlash size={18} weight="duotone" aria-hidden /> Este ejercicio es de oído y aquí no hay voz de {idioma}
      </div>
      <div className={s.voiceGapBody}>
        Tu sistema no tiene instalada ninguna voz de {idioma}: lo que suene será silencio o la voz
        española leyendo {idioma}, que no es lo que hay que oír. Se añade gratis en los ajustes de
        voz del sistema —busca {langConfig().voiceSearch}— y al volver aquí ya suena.
        {VOICE_FALLBACK[type] ? " " + VOICE_FALLBACK[type] : ""}
      </div>
    </div>
  );
}



/** permutación estable por id de ejercicio (mismo LCG que Order): las
    opciones de mc/audiomc JAMÁS salen en el orden de los datos — sin esto,
    módulos con answer:0 mayoritario enseñan "marca la primera" */
export function seededOrder(id: string, n: number): number[] {
  const idxs = Array.from({ length: n }, (_, i) => i);
  let seed = 0;
  for (const c of id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs;
}

export function ok(expected: string): GradeResult {
  return { correct: true, almost: false, feedback: null, expected };
}
export function fail(expected: string, feedback: string | null = null): GradeResult {
  return { correct: false, almost: false, feedback, expected };
}

// targets del vocab en minúsculas: para saber si lo citado en «» es audible
// (la lista la saca gen-derived.mjs del curso; las tarjetas no hacen falta)
let vocabTargets: Set<string> | null = null;
export function isVocabTarget(text: string): boolean {
  if (!vocabTargets) vocabTargets = new Set(allTargets);
  return vocabTargets.has(text.toLowerCase());
}

/* ---------- Entrada de texto con botones ä ö ü ß ---------- */
export function TextAnswer({
  locked, attempt, accepted, placeholder, onSubmit, gradeOpts,
}: {
  locked: boolean;
  attempt: number;
  accepted: string[];
  placeholder?: string;
  gradeOpts?: GradeOptions;
  onSubmit: (r: GradeResult) => void;
}) {
  const [val, setVal] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastGrade, setLastGrade] = useState<GradeResult | null>(null);
  const lastTried = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // nuevo intento → desbloquea el envío, conserva el texto
  useEffect(() => { setSubmitted(false); }, [attempt]);

  // Mientras se escribe, el encaje completo se ve igual que el prefijo:
  // el verde de «ya está» adelantaba la solución. El desvío sí se dice.
  const live = submitted ? null : liveShown(liveCheck(val, accepted, gradeOpts));

  const [sameRetry, setSameRetry] = useState(false);

  function submit() {
    if (locked || submitted || !val.trim()) return;
    // en el reintento, exige cambiar algo: un Enter mantenido no quema el 2º intento
    if (attempt > 0 && val === lastTried.current) {
      setSameRetry(true);
      return;
    }
    setSameRetry(false);
    lastTried.current = val;
    const r = gradeText(val, accepted, gradeOpts);
    setLastGrade(r);
    setSubmitted(true);
    onSubmit(r);
  }

  function insert(ch: string) {
    const el = inputRef.current;
    if (!el || locked) return;
    const start = el.selectionStart ?? val.length;
    const end = el.selectionEnd ?? val.length;
    const next = val.slice(0, start) + ch + val.slice(end);
    setVal(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + 1, start + 1);
    });
  }

  const stateCls = submitted && lastGrade
    ? (lastGrade.correct ? s.inputOk : s.inputBad)
    : live === "off" ? s.inputOff
    : "";

  const showDiff = locked && lastGrade && !lastGrade.correct && val.trim();
  const diff = showDiff ? charDiff(val.trim(), lastGrade.expected) : null;
  // Sin teclas no hay grupo: en inglés la lista va vacía y un rótulo
  // alemán con cero botones es peor que no decir nada.
  const teclas = langConfig().specialChars;

  return (
    <div>
      <div className={s.inputRow}>
        <input
          ref={inputRef}
          className={`${s.input} ${stateCls}`}
          value={val}
          placeholder={placeholder ?? `Escribe en ${langConfig().spanishName}...`}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          disabled={locked}
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <button className={s.btnPrimary} onClick={submit} disabled={locked || submitted || !val.trim()}>
          Comprobar
        </button>
      </div>
      {teclas.length > 0 && (
        <div className={s.charRow} role="group" aria-label={langConfig().specialCharsLabel}>
          {teclas.map((c) => (
            <button key={c} type="button" className={s.charBtn} onClick={() => insert(c)} disabled={locked} aria-label={`Insertar ${c}`}>
              {c}
            </button>
          ))}
        </div>
      )}

      {sameRetry && (
        <p className={`${s.liveHint} ${s.liveOff}`} role="status">
          Es la misma respuesta — cambia algo antes de volver a comprobar.
        </p>
      )}
      {live !== null && (
        <p
          className={`${s.liveHint} ${live === "off" ? s.liveOff : s.liveNeutral}`}
          aria-live="polite"
        >
          {live === "ontrack" && "Vas por buen camino"}
          {live === "off" && "Algo no cuadra — relee lo que llevas"}
          {live === "empty" && ""}
        </p>
      )}

      {diff && (
        <div className={s.diff} aria-label="Comparación carácter a carácter">
          <span className={s.diffLabel}>Tu respuesta</span>
          <div>
            {diff.got.map((op, i) => (
              <span key={i} className={op.kind === "ok" ? s.diffOk : s.diffBad}>{op.ch}</span>
            ))}
          </div>
          <span className={s.diffLabel} style={{ marginTop: 6 }}>Esperada</span>
          <div lang={langConfig().htmlLang}>
            {diff.want.map((op, i) => (
              <span key={i} className={op.kind === "ok" ? s.diffOk : s.diffMiss}>{op.ch}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
