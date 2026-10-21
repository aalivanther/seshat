"use client";

import { useEffect, useMemo, useState } from "react";
import { NotePencil } from "@phosphor-icons/react";
import type { AudioMCExercise } from "@/lib/types";
import { speakLong } from "@/lib/tts";
import { langConfig } from "@/lib/language";
import { Speaker } from "../Speaker";
import { seededOrder, useVoiceMissing, settleVoice, type KindProps } from "./shared";
import shared from "../ex.module.css";
import s from "./audiomc.module.css";

/* ---------- AudioMC: comprensión auditiva pura ---------- */
// La pregunta se lee ANTES de darle al play (estrategia del examen real) y el
// audio suena como mucho `plays` veces (default 2 — LanguageCert lo pone TODO
// dos veces). El texto del audio jamás se muestra.
/** A partir de aquí, retener de cabeza deja de medir comprensión y mide
 *  memoria: por eso el examen real deja tomar notas. Noventa palabras son unos
 *  treinta y cinco segundos de audio, que ya suelen traer tres datos que
 *  apuntar; por debajo, el cuaderno estorba más de lo que ayuda. El contenido
 *  sigue mandando en los dos sentidos: con `notepad: true` sale aunque sean
 *  veintidós palabras (hay audios cortísimos cargados de cifras) y con
 *  `notepad: false` no sale nunca. El umbral solo cubre lo que nadie declaró. */
const NOTEPAD_WORDS = 90;

export function AudioMC({ ex, locked, onSubmit }: KindProps<AudioMCExercise>) {
  const maxPlays = ex.plays ?? 2;
  const [playsUsed, setPlaysUsed] = useState(0);
  // Haber dado al play, suene o no. Es lo que abre las opciones: sin voz del
  // idioma no se gasta escucha, pero el ejercicio no puede quedarse cerrado.
  const [tried, setTried] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const voiceMissing = useVoiceMissing();
  // Cuaderno de notas del audio largo: vive en este estado y en ningún sitio
  // más. En un audio de tres minutos con seis datos, retenerlos de cabeza no
  // mide comprensión, mide memoria — y el examen deja tomar notas.
  const [notes, setNotes] = useState("");
  useEffect(() => { setNotes(""); setTried(false); setPlaysUsed(0); }, [ex.id]);

  const audioWords = useMemo(
    () => (ex.audio.trim() ? ex.audio.trim().split(/\s+/).length : 0),
    [ex.audio],
  );
  const showNotepad = ex.notepad ?? audioWords >= NOTEPAD_WORDS;
  const left = maxPlays - playsUsed;

  function play() {
    if (locked || (!voiceMissing && left <= 0)) return;
    setTried(true);
    // Se le pregunta al sistema EN EL CLIC, no al estado: si el navegador acaba
    // de enumerar las voces, el estado va un render por detrás y por ese hueco
    // se colaba justo lo que esto viene a impedir — cobrar una escucha muda.
    // Sin voz del idioma lo que suena NO es el audio del examen: descontar por
    // eso sería cobrarle al alumno un agujero del sistema. Puede repetir las
    // veces que quiera y no se le apunta ninguna.
    if (!settleVoice()) setPlaysUsed((p) => p + 1);
    // Un audio con turnos separados por «|» es un diálogo o un debate: se lee
    // con dos voces alternas. Antes iba por `speak()` a secas, así que «tres
    // minutos entre dos nativas» los recitaba una sola voz de corrido — la
    // promesa del ejercicio no se cumplía, y distinguir quién dice qué (que es
    // la tarea del Teil 3 y del Teil 4) resultaba imposible.
    if (ex.audio.includes("|")) speakLong(ex.audio, { dialog: true });
    else speakLong(ex.audio);
  }

  return (
    <div>
      <p className={shared.question}>{ex.question}</p>
      <div className={shared.footer} style={{ justifyContent: "flex-start", marginBottom: 10 }}>
        <button className={shared.btnPrimary} data-sfx="off" disabled={locked || (!voiceMissing && left <= 0)} onClick={play}>
          {tried ? "Otra vez" : "Reproducir"}{" "}
          {voiceMissing ? "(no se te descuenta)" : `(${left} ${left === 1 ? "escucha" : "escuchas"})`}
        </button>
        <span className={shared.liveHint + " " + shared.liveNeutral}>
          {!tried ? "Lee la pregunta y las opciones antes de darle al play. En el examen no hay otra." : ""}
        </span>
      </div>
      {/* Antes del primer play el cuaderno es una línea, no un bloque: en un
          móvil ocupaba trescientos píxeles entre el botón y las opciones, y
          empujaba fuera de pantalla justo lo que la tarjeta manda leer ANTES
          de darle al play. Se abre solo cuando ya hay algo que apuntar. */}
      {showNotepad && !tried && (
        <p className={s.notepadClosed}>
          <NotePencil size={15} weight="duotone" aria-hidden /> Al darle al play se abre un cuaderno
          para apuntar mientras suena. Es papel de borrador: no se corrige ni puntúa.
        </p>
      )}
      {showNotepad && tried && (
        <div className={s.notepad}>
          <label className={s.notepadHead} htmlFor={`notes-${ex.id}`}>
            Tu cuaderno — apunta mientras suena
          </label>
          <textarea
            id={`notes-${ex.id}`}
            className={s.notepadArea}
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Cifras, nombres, horas... lo que se te vaya a olvidar"
          />
          <p className={s.notepadNote}>
            Papel de borrador: esto no se corrige, no puntúa y no se guarda en ningún sitio.
          </p>
        </div>
      )}

      <div className={shared.options} role="group" aria-label="Opciones de respuesta">
        {seededOrder(ex.id, ex.options.length).map((i) => {
          const o = ex.options[i];
          let cls = shared.option;
          if (locked) {
            if (i === ex.answer) cls += " " + shared.optionRight;
            else if (i === picked) cls += " " + shared.optionWrong;
          }
          return (
            <button
              key={o}
              className={cls}
              disabled={locked || !tried}
              onClick={() => {
                setPicked(i);
                onSubmit({
                  correct: i === ex.answer,
                  almost: false,
                  feedback: i === ex.answer ? null : ex.whyWrong?.[i] ?? null,
                  expected: ex.options[ex.answer],
                });
              }}
            >
              {o}
            </button>
          );
        })}
      </div>
      {locked && (
        <div className={shared.hearrealReveal}>
          <div className={shared.hearrealRow}>
            <span className={shared.hearrealTag}>sonó</span>
            <span lang={langConfig().htmlLang}>{ex.audio}</span>
            <Speaker text={ex.audio} />
          </div>
        </div>
      )}
    </div>
  );
}
