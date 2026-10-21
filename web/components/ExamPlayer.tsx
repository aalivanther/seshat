"use client";

import { SfxToggle } from "./SfxToggle";
import { MOTOR_OFF } from "./ErrorBanner";
import { saveFailureDetail } from "@/lib/api";

import type { Icon } from "@phosphor-icons/react";
import { Headphones, BookOpenText, PenNib, Microphone, X, SpeakerHigh, Timer as TimerIcon, Warning, CheckCircle, XCircle } from "@phosphor-icons/react";

// Simulador del Goethe-Zertifikat A1 (Start Deutsch 1).
// Modo examen real: sin corrección por ítem — todo se revisa al final,
// con desglose por destreza y nota oficial (corte según el baremo del set).

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type {
  ExamItem, ExamSection, ExamSet, ExamTeil,
  HoerenMC, HoerenRF, LesenSchild, LesenText,
  SchreibenForm, SchreibenMessage, SprechenTask,
  LesenMC, LesenMatch, LesenJaNein, HoerenGroup, HoerenWerSagt,
  SprechenPraesentation, LesenInsert, HoerenNotes, HoerenPhotoMatch, LesenNotes,
  RubricCriterion,
} from "@/lib/examTypes";
import { RUBRIC_BANDS } from "@/lib/examTypes";
import { scoreExam, band, rubricScore, type ExamResults, type ModularSplit } from "@/lib/examScore";
import { adoptLang } from "@/lib/languages";
import { SummitSeal, NotebookSeal } from "./Art";
import { useConfirm } from "@/lib/useConfirm";
import { useLeaveGuard } from "@/lib/useLeaveGuard";
import { examLangOf } from "@/data/exams";
import { langConfig } from "@/lib/language";
import { examResultId } from "@/lib/ids";
import { clearExamDraft, getState, postExamDraft, postLessonResult } from "@/lib/api";
import { examWrittenDurationSeconds, examPaperDurationSeconds, examClockPaper, examSecondsLeft, examIntroMinutes } from "@/lib/examClock";
import { coerceAnswers, coerceExamDraft, EXAM_DRAFT_MAX_BODY } from "@/lib/examDraft";
import { hasDistinctSecondVoice } from "@/lib/tts";
import { celebrate, sfxFanfare } from "@/lib/juice";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "./BadgeUnlocks";
import { speak, speakLong, speakSlow, stopSpeech, hasTargetVoice } from "@/lib/tts";
import { LesenAdsItem } from "./exam/LesenAds";
import { NextBtn } from "./exam/shared";
import s from "./exam.module.css";

const SKILL_ICON: Record<string, Icon> = {
  hoeren: Headphones, lesen: BookOpenText, schreiben: PenNib, sprechen: Microphone,
};

function SkillIcon({ skill, size = 17 }: { skill: string; size?: number }) {
  const Cmp = SKILL_ICON[skill] ?? Headphones;
  return <Cmp size={size} weight="duotone" aria-hidden />;
}

type Step =
  | { kind: "intro"; section: ExamSection }
  | { kind: "item"; section: ExamSection; teil: ExamTeil; item: ExamItem; teilStart: boolean };

type Answers = Record<string, unknown>;

function papersFromAnswers(answers: Answers, key: string): Record<string, number> {
  const raw = answers[key];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof v === "number" && Number.isFinite(v) && v > 0) out[k] = Math.floor(v);
  }
  return out;
}

export function ExamPlayer({ set }: { set: ExamSet }) {
  // el examen manda: su idioma queda en juego (TTS y corrección del set)
  useEffect(() => adoptLang(examLangOf(set.id)), [set.id]);
  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [];
    for (const section of set.sections) {
      out.push({ kind: "intro", section });
      for (const teil of section.teile) {
        teil.items.forEach((item, i) => {
          out.push({ kind: "item", section, teil, item, teilStart: i === 0 });
        });
      }
    }
    return out;
  }, [set]);

  // EL SIMULACRO SE GUARDA EN EL PERFIL.
  //
  // El reloj (startedAt) y las respuestas viven en examDrafts: cerrar el
  // portátil o abrir el mismo perfil en el teléfono no regenera minutos.
  // Al volver se restaura ese borrador; la copia de localStorage solo entra
  // si el perfil no tenía uno usable (este navegador, o el motor no contestó).
  // No es el resultado: eso se manda al terminar.
  const draftKey = `seshat-examen-${set.id}`;
  const CLOCK_KEY = "__clock";
  const durationSec = useMemo(() => examWrittenDurationSeconds(set.sections), [set]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [papers, setPapers] = useState<Record<string, number>>({});
  const [nowTick, setNowTick] = useState(() => Math.floor(Date.now() / 1000));
  const [restored, setRestored] = useState(false);
  const [oneSpeaker, setOneSpeaker] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOneSpeaker(!hasDistinctSecondVoice());
  }, []);

  // Recuperar ANTES de persistir. El efecto de guardado no puede correr
  // mientras esto no haya terminado: si no, la copia local vacía y el mismo
  // vacío en el perfil pisan el borrador, y getState llega tarde.
  useEffect(() => {
    let alive = true;
    const now = Math.floor(Date.now() / 1000);
    const maxIdx = Math.max(0, steps.length - 1);
    const opts = { now, durationSec, maxIdx };
    void (async () => {
      try {
        const st = await getState();
        if (!alive) return;
        const fromServer = coerceExamDraft(st?.examDrafts?.[set.id], opts);
        if (fromServer) {
          setIdx(fromServer.idx);
          setAnswers(fromServer.answers as Answers);
          const saved = papersFromAnswers(fromServer.answers as Answers, CLOCK_KEY);
          setPapers(Object.keys(saved).length ? saved : { written: fromServer.startedAt });
          setRestored(true);
          return;
        }
        try {
          const raw = window.localStorage.getItem(draftKey);
          if (!raw) return;
          if (raw.length > EXAM_DRAFT_MAX_BODY) {
            window.localStorage.removeItem(draftKey);
            return;
          }
          const loc = JSON.parse(raw) as unknown;
          const fromLocal = coerceExamDraft(loc, opts);
          if (fromLocal) {
            setIdx(fromLocal.idx);
            setAnswers(fromLocal.answers as Answers);
            const saved = papersFromAnswers(fromLocal.answers as Answers, CLOCK_KEY);
            setPapers(Object.keys(saved).length ? saved : { written: fromLocal.startedAt });
            setRestored(true);
          } else {
            window.localStorage.removeItem(draftKey);
          }
        } catch {
          try { window.localStorage.removeItem(draftKey); } catch { /* modo privado */ }
        }
      } finally {
        if (alive) setHydrated(true);
      }
    })();
    return () => { alive = false; };
  }, [draftKey, set.id, durationSec, steps.length]);

  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [saved, setSaved] = useState<boolean | null>(null); // null = guardando
  const posted = useRef(false);

  const finished = idx >= steps.length;
  const step = finished ? null : steps[idx];
  const paper = examClockPaper(set, step?.section.skill);
  const paperDuration = examPaperDurationSeconds(set, paper);
  const startedAt = paper === "sprechen" ? null : (papers[paper] ?? papers.written ?? null);
  const secondsLeft = startedAt === null || paperDuration <= 0
    ? null
    : examSecondsLeft(startedAt, paperDuration, nowTick);
  // un simulacro B1 son TRES HORAS que viven en memoria hasta el final: un
  // Cmd+R por inercia se las llevaba sin preguntar — pero en resultados ya no
  // hay nada que perder, y seguir avisando ahí sería ruido
  useLeaveGuard(!finished);

  const { confirm, dialog } = useConfirm();
  const router = useRouter();
  /** Salir del simulacro: se pregunta con el diálogo de la casa y, si se
   *  confirma, se tira también el borrador — si no, al volver aparecería a
   *  medias sin que nadie lo haya pedido. */
  async function pedirSalida() {
    const ok = await confirm({
      title: "¿Abandonar el simulacro?",
      body: "Se pierde este intento y el borrador guardado. El examen completo son varias horas: si solo vas a por un café, no hace falta salir.",
      confirmLabel: "Abandonar",
      danger: true,
    });
    if (!ok) return;
    try { window.localStorage.removeItem(draftKey); } catch { /* da igual */ }
    void clearExamDraft(set.id);
    router.push("/examen");
  }

  // perfil y copia local, en cada respuesta y en cada paso — nunca antes de hidratar:
  // escribir antes pisaría el borrador que getState todavía no ha traído
  useEffect(() => {
    if (!hydrated) return;
    if (finished) {
      try { window.localStorage.removeItem(draftKey); } catch { /* modo privado */ }
      void clearExamDraft(set.id);
      return;
    }
    const clockStart = startedAt ?? Math.min(...Object.values(papers), Date.now() / 1000);
    if (!Number.isFinite(clockStart) || clockStart <= 0) return;
    const safeAnswers = coerceAnswers({ ...answers, [CLOCK_KEY]: papers });
    let payload: string;
    try {
      payload = JSON.stringify({ idx, answers: safeAnswers, startedAt: Math.floor(clockStart), at: Date.now() });
    } catch {
      return;
    }
    if (payload.length > EXAM_DRAFT_MAX_BODY) return;
    try { window.localStorage.setItem(draftKey, payload); } catch { /* sin espacio o modo privado */ }
    void postExamDraft(set.id, Math.floor(clockStart), idx, safeAnswers);
  }, [hydrated, draftKey, idx, answers, papers, startedAt, finished, set.id]);

  useEffect(() => {
    if (startedAt === null || finished) return;
    const t = setInterval(() => setNowTick(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, [startedAt !== null, finished]);

  const results = useMemo(() => (finished ? scoreExam(set, answers) : null), [finished, set, answers]);

  useEffect(() => {
    if (!results || posted.current) return;
    posted.current = true;
    let alive = true;
    // en un examen modular se guarda el módulo MÁS FLOJO: es lo que decide si
    // estás aprobado, y es lo que luego leen el hub y la medalla Prüfling
    const stored = set.scoring?.modular ? (results.weakestPct ?? results.totalPct) : results.totalPct;
    void postLessonResult(examResultId(set.id), stored / 100, []).then((st) => {
      if (!alive) return;
      setSaved(st !== null);
      if (st) setNewBadges(checkNewBadges(st));
    });
    if (results.pass) { celebrate(true); sfxFanfare(); }
    return () => { alive = false; };
  }, [results, set.id]);

  function setAnswer(id: string, value: unknown) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  // Hasta hidratar, un clic en «Empezar» y el restore se pisan: el borrador
  // viejo gana o el intento nuevo se pierde. No hay nada que jugar todavía.
  if (!hydrated) {
    return (
      <div className={s.wrap}>
        <p className={s.sectionMeta} role="status" style={{ margin: "48px auto", textAlign: "center" }}>
          Recuperando el simulacro…
        </p>
      </div>
    );
  }

  if (finished && results) {
    return <ResultsScreen set={set} answers={answers} results={results} newBadges={newBadges} saved={saved} />;
  }

  return (
    <div className={s.wrap}>
      {dialog}
      {!finished && (
        <p
          role="status"
          style={{
            margin: "8px 0 0", padding: "10px 14px", borderRadius: "var(--radius-hand)",
            background: "var(--panel)", color: "var(--text-2)", fontWeight: 600,
          }}
        >
          {restored ? "Retomas donde lo dejaste. " : null}
          El borrador se guarda en este perfil: puedes cerrar el portátil y seguir en el teléfono.
        </p>
      )}
      <div className={s.topBar}>
        <Link href="/examen" className={s.btnGhost} style={{ padding: "8px 16px", minHeight: 40 }}
          onClick={(e) => {
            // el diálogo es asíncrono, así que la navegación la hacemos nosotros
            // al confirmar (ver pedirSalida)
            e.preventDefault();
            void pedirSalida();
          }}>
          <X size={16} weight="bold" aria-hidden /> Salir
        </Link>
        {step && (
          <span className={s.skillBadge}>
            <SkillIcon skill={step.section.skill} /> {step.section.label} · {set.title}
          </span>
        )}
        {secondsLeft !== null && step?.kind !== "intro" && (
          <span
            className={`${s.timer} ${secondsLeft <= 0 ? s.timerOver : secondsLeft < 120 ? s.timerLow : ""}`}
            aria-label="Tiempo restante orientativo"
          >
            <TimerIcon size={15} weight="duotone" aria-hidden style={{ verticalAlign: "-2px" }} />{" "}
            {secondsLeft <= 0 ? "tiempo oficial agotado" : fmt(secondsLeft)}
          </span>
        )}
        <SfxToggle />
      </div>

      {step?.kind === "intro" && (
        <div className={`${s.card} ${s.sectionIntro}`}>
          <div className={s.sectionEmoji} aria-hidden><SkillIcon skill={step.section.skill} size={30} /></div>
          <h1 className={s.sectionTitle}>{step.section.label}</h1>
          <p className={s.sectionMeta}>
            {step.section.teile.length} {examLangOf(set.id) === "en" ? "parts" : "Teile"} ·{" "}
            {step.section.teile.reduce((n, t) => n + t.items.length, 0)} tareas · tiempo oficial de este papel:{" "}
            {(() => {
              const min = examIntroMinutes(set, step.section.skill);
              if (paper === "rw") {
                const h = Math.floor(min / 60);
                const m = min % 60;
                return m ? `${h} h ${m} / ${min} min` : `${h} h / ${min} min`;
              }
              return `${min} min`;
            })()}
            {paper === "rw" ? " (Reading y Writing seguidos)" : paper === "listening" ? " (Listening)" : ""}
          </p>
          <p className={s.sectionMeta} style={{ maxWidth: "48ch", margin: "10px auto 0" }}>
            Como en el examen real, no verás correcciones hasta el final. El cronómetro es
            de este papel: si se agota puedes seguir al siguiente, pero el tiempo no se traspasa.
          </p>
          <p className={s.sectionMeta} style={{ maxWidth: "48ch", margin: "8px auto 0" }}>
            El audio es la voz del sistema, no el CD oficial del examen.
            {oneSpeaker ? " En este aparato solo hay una voz local: los diálogos se oyen con un solo hablante." : ""}
          </p>
          <div style={{ marginTop: 24 }}>
            <button
              className={s.btnPrimary}
              onClick={() => {
                stopSpeech();
                const p = examClockPaper(set, step.section.skill);
                if (p !== "sprechen") {
                  setPapers((old) => (old[p] ? old : { ...old, [p]: Math.floor(Date.now() / 1000) }));
                }
                setIdx(idx + 1);
              }}
            >
              Empezar {step.section.label}
            </button>
          </div>
        </div>
      )}

      {step?.kind === "item" && (
        <ItemCard
          key={step.item.id}
          step={step}
          answer={answers}
          setAnswer={setAnswer}
          onNext={() => { stopSpeech(); setIdx(idx + 1); }}
          progress={progressOf(steps, idx)}
        />
      )}
    </div>
  );
}

function progressOf(steps: Step[], idx: number): string {
  const cur = steps[idx];
  if (cur.kind !== "item") return "";
  const inTeil = cur.teil.items.length;
  const pos = cur.teil.items.findIndex((it) => it.id === cur.item.id) + 1;
  return `${pos}/${inTeil}`;
}

function fmt(sec: number): string {
  const m = Math.floor(sec / 60), s2 = sec % 60;
  return `${m}:${String(s2).padStart(2, "0")}`;
}

/* ================= Ítems ================= */

function ItemCard({
  step, answer, setAnswer, onNext, progress,
}: {
  step: Extract<Step, { kind: "item" }>;
  answer: Answers;
  setAnswer: (id: string, v: unknown) => void;
  onNext: () => void;
  progress: string;
}) {
  const { teil, item } = step;
  return (
    <div className={s.card}>
      <div className={s.teilTitle}>{teil.title} <span className={s.counter}>· {progress}</span></div>
      <p className={s.instruction} lang={langConfig().htmlLang}>{teil.instruction}</p>
      <p className={s.instructionEs}>{teil.instructionEs}</p>

      {/* Lo decide el TEXTO, no el título del Teil: si trae turnos separados por
          «|» es un diálogo y se lee con dos voces. Antes se le pasaba al Teil 1
          (que son mensajes de una sola voz) y no al Teil 3, que es justo el
          diálogo — o sea, exactamente al revés. */}
      {item.kind === "hoeren-mc" && <HoerenMCItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} dialog={item.audio.includes("|")} />}
      {item.kind === "hoeren-rf" && <HoerenRFItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-text" && <LesenTextItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-ads" && <LesenAdsItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-schild" && <LesenSchildItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "schreiben-form" && <SchreibenFormItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "schreiben-message" && <SchreibenMessageItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "sprechen" && <SprechenItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-mc" && <LesenMCItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-match" && <LesenMatchItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-insert" && <LesenInsertItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-janein" && <LesenJaNeinItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "hoeren-group" && <HoerenGroupItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "hoeren-wersagt" && <HoerenWerSagtItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "hoeren-notes" && <HoerenNotesItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "lesen-notes" && <LesenNotesItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "hoeren-photo-match" && <HoerenPhotoMatchItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
      {item.kind === "sprechen-praesentation" && <SprechenPraesentationItem item={item} answer={answer} setAnswer={setAnswer} onNext={onNext} />}
    </div>
  );
}

function AudioButton({ text, maxPlays, dialog }: { text: string; maxPlays: number; dialog?: boolean }) {
  // sin voz alemana, el Hören completo sonaría raro sin explicación — avisar aquí
  const [voiceReady, setVoiceReady] = useState(true);
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) { setVoiceReady(false); return; }
    const check = () => setVoiceReady(hasTargetVoice());
    const t = setTimeout(check, 1200);
    synth.addEventListener("voiceschanged", check);
    return () => { clearTimeout(t); synth.removeEventListener("voiceschanged", check); };
  }, []);
  // sin autoreproducción: como en el examen real, primero lees la tarea
  // y el audio arranca cuando TÚ pulsas — la primera escucha no se regala
  const [plays, setPlays] = useState(0);
  return (
    <div className={s.audioBar}>
      {!voiceReady && (
        <p role="note" style={{ margin: "0 0 8px", padding: "8px 12px", border: "2px dashed var(--warn)", borderRadius: 10, background: "var(--warn-soft)", color: "var(--warn)", fontSize: "0.8125rem", fontWeight: 600 }}>
          Este dispositivo no tiene voz de {langConfig().spanishName} instalada: el audio puede sonar
          con acento extraño. Se añade gratis en los ajustes de voz del sistema (busca {langConfig().voiceSearch}).
        </p>
      )}
      <button
        className={s.playBtn}
        disabled={plays >= maxPlays}
        onClick={() => { speakLong(text, { dialog }); setPlays(plays + 1); }}
      >
        <SpeakerHigh size={17} weight="duotone" aria-hidden /> {plays === 0 ? "Reproducir audio" : "Escuchar otra vez"}
      </button>
      <span className={s.playsLeft} aria-live="polite">
        {plays === 0
          ? `Lee la tarea primero · ${maxPlays === 1 ? "1 escucha" : "2 escuchas"}`
          : plays >= maxPlays
            ? maxPlays === 1 ? "Solo se escucha una vez, como en el examen" : "Ya no quedan escuchas"
            : `Escuchas: ${plays}/${maxPlays}`}
      </span>
    </div>
  );
}

function HoerenMCItem({ item, answer, setAnswer, onNext, dialog }: ItemProps<HoerenMC> & { dialog?: boolean }) {
  const picked = answer[item.id] as number | undefined;
  return (
    <div>
      <AudioButton text={item.audio} maxPlays={item.twice ? 2 : 1} dialog={dialog} />
      <p className={s.question} lang={langConfig().htmlLang}>{item.question}</p>
      <p className={s.questionEs}>{item.questionEs}</p>
      <div className={s.options}>
        {item.options.map((o, i) => (
          <button
            key={i}
            lang={langConfig().htmlLang}
            className={`${s.option} ${picked === i ? s.optionPicked : ""}`}
            onClick={() => setAnswer(item.id, i)}
          >
            <b>{"abc"[i]})</b> {o}
          </button>
        ))}
      </div>
      <NextBtn ready={picked !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

function RFButtons({ value, onPick }: { value: boolean | undefined; onPick: (v: boolean) => void }) {
  // etiquetas del idioma EN JUEGO (el ExamPlayer adopta el idioma del set)
  const en = langConfig().htmlLang === "en";
  return (
    <div className={s.rfRow}>
      <button className={`${s.rfBtn} ${value === true ? s.rfPicked : ""}`} onClick={() => onPick(true)}>
        {en ? "True" : "Richtig"}
      </button>
      <button className={`${s.rfBtn} ${value === false ? s.rfPicked : ""}`} onClick={() => onPick(false)}>
        {en ? "False" : "Falsch"}
      </button>
    </div>
  );
}

function HoerenRFItem({ item, answer, setAnswer, onNext }: ItemProps<HoerenRF>) {
  const picked = answer[item.id] as boolean | undefined;
  return (
    <div>
      {/* A1 Teil 2: una sola escucha · B1 Teil 1: dos (item.twice) */}
      <AudioButton text={item.audio} maxPlays={item.twice ? 2 : 1} />
      <p className={s.question} lang={langConfig().htmlLang}>{item.statement}</p>
      <p className={s.questionEs}>{item.statementEs}</p>
      <RFButtons value={picked} onPick={(v) => setAnswer(item.id, v)} />
      <NextBtn ready={picked !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

function LesenTextItem({ item, answer, setAnswer, onNext }: ItemProps<LesenText>) {
  const val = (answer[item.id] ?? {}) as Record<string, boolean>;
  const allAnswered = item.statements.every((st) => st.id in val);
  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{item.title}</p>
      <div className={s.readingBox} lang={langConfig().htmlLang}>{item.text}</div>
      {item.statements.map((st) => (
        <div key={st.id} className={s.statementRow}>
          <p className={s.statement} lang={langConfig().htmlLang}>{st.statement}</p>
          <p className={s.statementEs}>{st.statementEs}</p>
          <RFButtons value={val[st.id]} onPick={(v) => setAnswer(item.id, { ...val, [st.id]: v })} />
        </div>
      ))}
      <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

function LesenSchildItem({ item, answer, setAnswer, onNext }: ItemProps<LesenSchild>) {
  const picked = answer[item.id] as boolean | undefined;
  return (
    <div>
      <div className={s.signBox}>
        <div className={s.signWhere}>{item.where}</div>
        <span lang={langConfig().htmlLang}>{item.sign}</span>
      </div>
      <p className={s.statement} lang={langConfig().htmlLang}>{item.statement}</p>
      <p className={s.statementEs}>{item.statementEs}</p>
      <RFButtons value={picked} onPick={(v) => setAnswer(item.id, v)} />
      <NextBtn ready={picked !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

function SchreibenFormItem({ item, answer, setAnswer, onNext }: ItemProps<SchreibenForm>) {
  const vals = (answer[item.id] ?? Array(item.fields.length).fill("")) as string[];
  const ready = vals.every((v) => v.trim().length > 0);
  return (
    <div>
      <div className={s.readingBox} lang={langConfig().htmlLang}>{item.scenario}</div>
      <p className={s.questionEs}>{item.scenarioEs}</p>
      <div className={s.formGrid}>
        {item.fields.map((f, i) => (
          <div key={i} className={s.formField}>
            <label lang={langConfig().htmlLang} htmlFor={`ff-${item.id}-${i}`}>{f.label}</label>
            <input
              id={`ff-${item.id}-${i}`}
              className={s.formInput}
              value={vals[i]}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              onChange={(e) => {
                const next = [...vals];
                next[i] = e.target.value;
                setAnswer(item.id, next);
              }}
            />
          </div>
        ))}
      </div>
      <NextBtn ready={ready} onNext={onNext} />
    </div>
  );
}

function SchreibenMessageItem({ item, answer, setAnswer, onNext }: ItemProps<SchreibenMessage>) {
  // A1/A2: baremo del Goethe A1 — N Leitpunkte × 3 pts (con "parcialmente" =
  // 1.5) + 1 pt de kommunikative Gestaltung (Anrede y Gruß) = 10.
  // B1 (item.rubric): bandas A-E por criterio; el texto se guarda aparte para
  // que answers[item.id] sea EXACTAMENTE el Record<criterioId, banda> que
  // espera rubricScore.
  const rubric = item.rubric;
  const textKey = `${item.id}:text`;
  const legacy = (answer[item.id] ?? { text: "", leit: item.points.map(() => null), gestaltung: false }) as {
    text: string; leit: (number | null)[]; gestaltung: boolean;
  };
  const bands = (answer[item.id] ?? {}) as Record<string, number>;
  const text = rubric ? ((answer[textKey] as string | undefined) ?? "") : legacy.text;
  const setText = (t: string) => (rubric ? setAnswer(textKey, t) : setAnswer(item.id, { ...legacy, text: t }));

  const [phase, setPhase] = useState<"write" | "check">("write");
  const en = langConfig().htmlLang === "en";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const goalNum = item.words ?? (en ? 40 : 30);
  const goal = item.words ? `~${item.words}` : en ? "30-50" : "~30";
  const tooShort = words > 0 && words < goalNum * 0.5;
  const LEIT_OPTS = [
    { v: 0, label: "No" },
    { v: 1.5, label: "A medias" },
    { v: 3, label: "Sí" },
  ];
  const maxPts = item.points_max ?? 40;
  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{item.task}</p>
      <p className={s.questionEs}>{item.taskEs}</p>

      {/* B1 Aufgabe 2: el texto publicado al que hay que REACCIONAR */}
      {item.stimulus && (
        <div className={s.stimulusBox}>
          <div className={s.stimulusSource} lang={langConfig().htmlLang}>{item.stimulus.source}</div>
          <span lang={langConfig().htmlLang}>{item.stimulus.text}</span>
        </div>
      )}

      <ul className={s.pointsList}>
        {item.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <div style={{ marginTop: 14 }}>
        <textarea
          className={s.textarea}
          value={text}
          disabled={phase === "check"}
          placeholder={en ? `Escribe aquí tu texto en inglés (${goal} palabras)...` : `Escribe aquí tu texto en alemán (${goal} palabras)...`}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={s.wordCount}>{words} palabras · objetivo {goal}</div>
        {tooShort && (
          <p className={s.fatalWarn} role="note">
            <Warning size={16} weight="fill" aria-hidden /> Vas por debajo del 50 % de las palabras pedidas:
            en el examen real eso es <b>Erfüllung = E</b>, es decir <b>0 puntos en toda la tarea</b>.
          </p>
        )}
      </div>

      {phase === "write" ? (
        <NextBtn ready={words >= 10} onNext={() => setPhase("check")} />
      ) : rubric ? (
        <div>
          <div className={s.modelBox}>
            <div className={s.modelLabel}>Respuesta modelo</div>
            <span lang={langConfig().htmlLang}>{item.model}</span>
          </div>
          <RubricSelfCheck
            rubric={rubric}
            max={maxPts}
            value={bands}
            onChange={(v) => setAnswer(item.id, v)}
          />
          <NextBtn ready={rubric.every((c) => bands[c.id] !== undefined)} onNext={onNext} />
        </div>
      ) : (
        <div>
          <div className={s.modelBox}>
            <div className={s.modelLabel}>Respuesta modelo</div>
            <span lang={langConfig().htmlLang}>{item.model}</span>
          </div>
          <p className={s.questionEs} style={{ marginTop: 14 }}>
            {en ? "Puntúa como el examinador real (cada función cumplida suma; sé honesto):" : "Puntúa como el examinador real (cada punto de contenido vale 3; las fórmulas, 1):"}
          </p>
          {item.points.map((p, i) => (
            <div key={i} className={s.checkRow} style={{ cursor: "default", flexWrap: "wrap" }}>
              <span style={{ flex: "1 1 100%" }}>Punto {i + 1}: {p}</span>
              <div className={s.rfRow} style={{ flex: "1 1 100%", marginTop: 6 }}>
                {LEIT_OPTS.map((o) => (
                  <button
                    key={o.v}
                    className={`${s.rfBtn} ${legacy.leit[i] === o.v ? s.rfPicked : ""}`}
                    style={{ minHeight: 40, padding: 8 }}
                    onClick={() => {
                      const leit = [...legacy.leit];
                      leit[i] = o.v;
                      setAnswer(item.id, { ...legacy, leit });
                    }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <label className={s.checkRow}>
            <input
              type="checkbox"
              checked={legacy.gestaltung}
              onChange={(e) => setAnswer(item.id, { ...legacy, gestaltung: e.target.checked })}
            />
            <span>{en ? "Usé saludo y despedida (Dear… / Hi… y Best wishes + nombre)" : "Usé saludo y despedida (Liebe/r... y Viele Grüße + nombre)"}</span>
          </label>
          <NextBtn ready={item.points.every((_, i) => legacy.leit[i] !== null && legacy.leit[i] !== undefined)} onNext={onNext} />
        </div>
      )}
    </div>
  );
}

function SprechenItem({ item, answer, setAnswer, onNext }: ItemProps<SprechenTask>) {
  // A1/A2: hablar → autoevaluación binaria. B1 (item.rubric): preparación
  // cronometrada, tiempo de habla y bandas A-E como el examinador real.
  const [phase, setPhase] = useState<"prep" | "speak" | "rate">(item.prepSeconds ? "prep" : "speak");
  const prepLeft = useCountdown(item.prepSeconds ?? 0, phase === "prep");
  const spoken = useCountdown(item.speakSeconds ?? 0, phase === "speak" && !!item.speakSeconds);
  const bands = (answer[item.id] ?? {}) as Record<string, number>;
  return (
    <div>
      <p className={s.question} lang={langConfig().htmlLang}>{item.prompt}</p>
      <p className={s.questionEs}>{item.promptEs}</p>

      {phase === "prep" && (
        <div className={s.prepBox}>
          <div className={s.countdown}>{fmt(Math.max(0, prepLeft))}</div>
          <p className={s.questionEs} style={{ margin: 0 }}>
            Preparación en solitario: toma notas (en el examen real puedes usarlas, pero
            <b> no se lee</b>, se habla). Cuando estés listo, empieza.
          </p>
          <div className={s.footer} style={{ justifyContent: "center" }}>
            <button className={s.btnPrimary} onClick={() => setPhase("speak")}>Empezar a hablar</button>
          </div>
        </div>
      )}

      {phase === "speak" && (
        <div className={s.footer}>
          <span className={s.playsLeft}>
            Responde EN VOZ ALTA, como ante el examinador.
            {item.speakSeconds ? ` Objetivo: ${fmt(item.speakSeconds)} · llevas ${fmt(Math.max(0, item.speakSeconds - spoken))}.` : ""}
          </span>
          <button className={s.btnPrimary} onClick={() => { setPhase("rate"); }}>
            Ya respondí
          </button>
        </div>
      )}

      {phase === "rate" && (
        <div>
          <div className={s.modelBox}>
            <div className={s.modelLabel}>Respuesta modelo</div>
            <span lang={langConfig().htmlLang}>{item.model}</span>
            <div style={{ marginTop: 10 }}>
              <button data-sfx="off" className={s.btnGhost} onClick={() => speak(item.model)}><SpeakerHigh size={16} weight="duotone" aria-hidden /> Oír el modelo</button>{" "}
              <button className={s.btnGhost} onClick={() => speakSlow(item.model)}>Despacio</button>
            </div>
          </div>
          {item.rubric ? (
            <>
              <RubricSelfCheck
                rubric={item.rubric}
                max={item.weight ?? (item.teil === 2 ? 1.5 : 3)}
                value={bands}
                onChange={(v) => setAnswer(item.id, v)}
              />
              <NextBtn ready={item.rubric.every((c) => bands[c.id] !== undefined)} onNext={onNext} />
            </>
          ) : (
            <>
              <p className={s.questionEs} style={{ marginTop: 14 }}>¿Qué tal te salió comparado con el modelo?</p>
              <div className={s.rfRow}>
                <button className={s.rfBtn} onClick={() => { setAnswer(item.id, 1); onNext(); }}>Me salió bien</button>
                <button className={s.rfBtn} onClick={() => { setAnswer(item.id, 0.5); onNext(); }}>A medias</button>
                <button className={s.rfBtn} onClick={() => { setAnswer(item.id, 0); onNext(); }}>Me costó</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ================= Tipos nuevos del B1 (PLAN-B1 §3) ================= */

/** Cuenta atrás en segundos; se congela cuando `running` es false. */
function useCountdown(seconds: number, running: boolean): number {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (!running || left <= 0) return;
    const t = setTimeout(() => setLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left]);
  return left;
}

/** Rúbrica oficial B1: bandas A-E por criterio, con la regla dura de que una
 *  E en el criterio `fatalE` (Erfüllung) anula la tarea entera.
 *  Respuesta guardada: Record<criterionId, bandIndex> — lo que espera rubricScore. */
function RubricSelfCheck({
  rubric, max, value, onChange,
}: {
  rubric: RubricCriterion[];
  max: number;
  value: Record<string, number>;
  onChange: (v: Record<string, number>) => void;
}) {
  const fatal = rubric.find((c) => c.fatalE && value[c.id] === c.bands.length - 1);
  const got = rubricScore(value, rubric, max);
  return (
    <div className={s.rubricBox}>
      <div className={s.modelLabel}>Rúbrica oficial · autoevaluación</div>
      <p className={s.questionEs} style={{ marginBottom: 4 }}>
        Puntúa cada criterio en su banda, como los dos examinadores del examen real.
        <b> A</b> es lo mejor y <b>E</b> vale 0 puntos: no hay valores intermedios. Sé honesto,
        el simulacro solo sirve si mide de verdad.
      </p>
      {rubric.map((c) => (
        <div key={c.id} className={s.rubricCrit}>
          <div className={s.rubricLabel}>
            {c.label} <span className={s.counter}>· máx {c.bands[0]} pts</span>
          </div>
          <p className={s.rubricHelp}>{c.help}</p>
          <div className={s.bandRow}>
            {c.bands.map((pts, i) => {
              const isFatal = !!c.fatalE && i === c.bands.length - 1;
              const picked = value[c.id] === i;
              return (
                <button
                  key={i}
                  className={`${s.bandBtn} ${picked ? s.bandPicked : ""} ${picked && isFatal ? s.bandFatal : ""}`}
                  aria-pressed={picked}
                  onClick={() => onChange({ ...value, [c.id]: i })}
                >
                  <b>{RUBRIC_BANDS[i] ?? String.fromCharCode(65 + i)}</b>
                  <span className={s.bandPts}>{pts}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {fatal && (
        <p className={s.fatalWarn} role="alert">
          <Warning size={18} weight="fill" aria-hidden /> Has marcado <b>E</b> en «{fatal.label}»:
          en el examen real esto son <b>0 puntos en toda la tarea</b>, por bien escrita o bien
          hablada que esté. Es la trampa que más suspensos causa.
        </p>
      )}
      <div className={s.rubricTotal}>
        Autoevaluación: <b className="num">{Math.round(got * 10) / 10}</b>/{max} puntos
      </div>
    </div>
  );
}

/** Lesen Teil 2 y 5: texto compartido por el grupo + MC de 3 opciones.
 *  El texto viaja SOLO en el primer ítem: si no viene, no se repinta. */
function LesenMCItem({ item, answer, setAnswer, onNext }: ItemProps<LesenMC>) {
  const picked = answer[item.id] as number | undefined;
  const L = langConfig().htmlLang;
  return (
    <div>
      {item.text && (
        <>
          {item.title && <p className={s.question} lang={L}>{item.title}</p>}
          <div className={s.readingBox} lang={L}>{item.text}</div>
          {item.footnote && (
            <p className={s.footnote} lang={L}>{item.footnote}</p>
          )}
        </>
      )}
      <p className={s.question} lang={L}>{item.question}</p>
      <p className={s.questionEs}>{item.questionEs}</p>
      <div className={s.options}>
        {item.options.map((o, i) => (
          <button
            key={i}
            lang={L}
            className={`${s.option} ${picked === i ? s.optionPicked : ""}`}
            onClick={() => setAnswer(item.id, i)}
          >
            <b>{"abc"[i]})</b> {o}
          </button>
        ))}
      </div>
      <NextBtn ready={picked !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** Lesen Teil 2 Goethe B2 / Reading Part 2 LanguageCert: texto con huecos
 *  y banco de frases; sobra al menos una. */
function LesenInsertItem({ item, answer, setAnswer, onNext }: ItemProps<LesenInsert>) {
  const val = (answer[item.id] ?? {}) as Record<string, string>;
  const L = langConfig().htmlLang;
  const bankKeys = new Set(item.sentences.map((s) => s.key));
  const orphanGaps = item.gaps.filter((g) => !bankKeys.has(g.answer));
  if (orphanGaps.length) {
    return (
      <p role="alert" className={s.questionEs}>
        Este ítem está mal formado: un hueco apunta a una frase que no está en el banco.
      </p>
    );
  }
  const usedBy = new Map<string, string>();
  for (const g of item.gaps) {
    const k = val[g.id];
    if (k) usedBy.set(k, g.id);
  }
  const allAnswered = item.gaps.every((g) => g.id in val);

  function pick(gapId: string, key: string) {
    const next: Record<string, string> = { ...val };
    if (next[gapId] === key) delete next[gapId];
    else {
      for (const [gid, k] of Object.entries(next)) if (k === key) delete next[gid];
      next[gapId] = key;
    }
    setAnswer(item.id, next);
  }

  return (
    <div>
      <h3 className={s.sectionTitle} lang={L}>{item.title}</h3>
      <p className={s.statement} lang={L} style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>
      <p className={s.questionEs}>Elige para cada hueco la frase que encaja. Sobran {item.sentences.length - item.gaps.length}.</p>
      <div className={s.matchAds}>
        {item.sentences.map((sent) => {
          const by = usedBy.get(sent.key);
          return (
            <div key={sent.key} className={`${s.matchAd} ${by !== undefined ? s.matchAdUsed : ""}`} lang={L}>
              <span className={s.matchAdKey}>{sent.key.toUpperCase()}</span>
              {by !== undefined && <span className={s.matchAdBadge} lang="es">hueco {by}</span>}
              <span className={s.matchAdText}>{sent.text}</span>
            </div>
          );
        })}
      </div>
      {item.gaps.map((g, i) => (
        <div key={g.id} className={s.matchRow}>
          <p className={s.statement} lang={L}><span className={s.counter}>{i + 1}. </span>Hueco {g.id}</p>
          <div className={s.keyGrid}>
            {item.sentences.map((sent) => {
              const mine = val[g.id] === sent.key;
              const taken = usedBy.has(sent.key) && !mine;
              return (
                <button
                  key={sent.key}
                  className={`${s.keyBtn} ${mine ? s.keyPicked : ""} ${taken ? s.keyTaken : ""}`}
                  aria-pressed={mine}
                  onClick={() => pick(g.id, sent.key)}
                >
                  {sent.key.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

function LesenMatchItem({ item, answer, setAnswer, onNext }: ItemProps<LesenMatch>) {
  const val = (answer[item.id] ?? {}) as Record<string, string>;
  const L = langConfig().htmlLang;
  const reuse = !!item.allowReuse;
  const showNone = item.requireNone !== false && !reuse;
  // qué situación(es) (número 1-based) ocupan cada anuncio
  const usedBy = new Map<string, number[]>();
  item.situations.forEach((sit, i) => {
    const k = val[sit.id];
    if (k && k !== "0") {
      const arr = usedBy.get(k) ?? [];
      arr.push(i + 1);
      usedBy.set(k, arr);
    }
  });
  const allAnswered = item.situations.every((sit) => sit.id in val);

  function pick(sitId: string, key: string) {
    const next: Record<string, string> = { ...val };
    if (next[sitId] === key) {
      delete next[sitId]; // volver a pulsar deselecciona
    } else {
      // Goethe B1: un anuncio, una sola situación. Access R3 reutiliza textos.
      if (key !== "0" && !reuse) {
        for (const [sid, k] of Object.entries(next)) if (k === key) delete next[sid];
      }
      next[sitId] = key;
    }
    setAnswer(item.id, next);
  }

  return (
    <div>
      {item.text && (
        <div className={s.readingBox} lang={L} style={{ whiteSpace: "pre-wrap", marginBottom: 16 }}>
          {item.text}
        </div>
      )}
      <div className={s.matchAds}>
        {item.ads.map((ad) => {
          const by = usedBy.get(ad.key);
          return (
            <div key={ad.key} className={`${s.matchAd} ${by !== undefined ? s.matchAdUsed : ""}`} lang={L}>
              <span className={s.matchAdKey}>{ad.key.toUpperCase()}</span>
              {by !== undefined && (
                <span className={s.matchAdBadge} lang="es">usado en {by.join(", ")}</span>
              )}
              <span className={s.matchAdText}>{ad.text}</span>
            </div>
          );
        })}
      </div>

      {reuse ? (
        <p className={s.questionEs} style={{ marginTop: 6 }}>
          Un mismo texto puede responder a <b>más de una</b> pregunta.
        </p>
      ) : showNone ? (
        <p className={s.questionEs} style={{ marginTop: 6 }}>
          Cada anuncio sirve para <b>una sola</b> situación. Y ojo: para una de ellas
          <b> no hay anuncio válido</b> — ahí la respuesta correcta es <b>0</b>.
        </p>
      ) : (
        <p className={s.questionEs} style={{ marginTop: 6 }}>
          Cada anuncio sirve para <b>una sola</b> situación.
        </p>
      )}

      {item.situations.map((sit, i) => (
        <div key={sit.id} className={s.matchRow}>
          <p className={s.statement} lang={L}>
            <span className={s.counter}>{i + 1}. </span>{sit.situation}
          </p>
          <p className={s.statementEs}>{sit.situationEs}</p>
          <div className={s.keyGrid}>
            {item.ads.map((ad) => {
              const mine = val[sit.id] === ad.key;
              const taken = !reuse && usedBy.has(ad.key) && !mine;
              const takenBy = usedBy.get(ad.key);
              return (
                <button
                  key={ad.key}
                  className={`${s.keyBtn} ${mine ? s.keyPicked : ""} ${taken ? s.keyTaken : ""}`}
                  aria-pressed={mine}
                  title={taken ? `Ya asignado a la situación ${takenBy?.join(", ")} — si lo eliges aquí, se lo quitas` : undefined}
                  onClick={() => pick(sit.id, ad.key)}
                >
                  {ad.key.toUpperCase()}
                </button>
              );
            })}
            {showNone && (
              <button
                className={`${s.keyBtn} ${s.keyZero} ${val[sit.id] === "0" ? s.keyPicked : ""}`}
                aria-pressed={val[sit.id] === "0"}
                title="Ningún anuncio sirve para esta situación"
                onClick={() => pick(sit.id, "0")}
              >
                0 · ninguno
              </button>
            )}
          </div>
        </div>
      ))}
      <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** Lesen Teil 4: una pregunta transversal fija + N opiniones con Ja/Nein. */
function LesenJaNeinItem({ item, answer, setAnswer, onNext }: ItemProps<LesenJaNein>) {
  const val = (answer[item.id] ?? {}) as Record<string, boolean>;
  const L = langConfig().htmlLang;
  const allAnswered = item.opinions.every((op) => op.id in val);
  return (
    <div>
      <div className={s.stickyQ}>
        <p className={s.stickyQText} lang={L}>{item.question}</p>
        <p className={s.stickyQEs}>{item.questionEs}</p>
      </div>
      <p className={s.questionEs}>
        Nadie va a escribir «estoy a favor»: hay que <b>deducir la postura</b> de lo que cuenta.
      </p>
      {item.opinions.map((op) => (
        <div key={op.id} className={s.opinionBox}>
          <div className={s.opinionAuthor} lang={L}>{op.author}</div>
          <p className={s.opinionText} lang={L}>{op.text}</p>
          <div className={s.rfRow}>
            <button
              className={`${s.rfBtn} ${val[op.id] === true ? s.rfPicked : ""}`}
              onClick={() => setAnswer(item.id, { ...val, [op.id]: true })}
            >
              Ja
            </button>
            <button
              className={`${s.rfBtn} ${val[op.id] === false ? s.rfPicked : ""}`}
              onClick={() => setAnswer(item.id, { ...val, [op.id]: false })}
            >
              Nein
            </button>
          </div>
        </div>
      ))}
      <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** Un sub-ítem de un hoeren-group: se responde con SU id (el baremo los lee
 *  sueltos), sin audio propio — el audio lo pone el grupo. */
function HoerenSubItem({
  sub, n, answer, setAnswer, preview,
}: {
  sub: HoerenMC | HoerenRF | HoerenWerSagt;
  n: number;
  answer: Answers;
  setAnswer: (id: string, v: unknown) => void;
  preview?: boolean;
}) {
  const L = langConfig().htmlLang;
  const head = sub.kind === "hoeren-mc" ? sub.question : sub.statement;
  const headEs = sub.kind === "hoeren-mc" ? sub.questionEs : sub.statementEs;
  return (
    <div className={s.subItem}>
      <p className={s.statement} lang={L}>
        <span className={s.counter}>{n}. </span>{head}
      </p>
      <p className={s.statementEs}>{headEs}</p>
      {/* durante la lectura previa se ven las opciones pero no se marcan:
          el examen te deja leerlas, no responder antes de oír nada */}
      <fieldset className={s.plainFieldset} disabled={preview}>
        {sub.kind === "hoeren-mc" ? (
          <div className={s.options}>
            {sub.options.map((o, i) => (
              <button
                key={i}
                lang={L}
                className={`${s.option} ${answer[sub.id] === i ? s.optionPicked : ""}`}
                onClick={() => setAnswer(sub.id, i)}
              >
                <b>{"abc"[i]})</b> {o}
              </button>
            ))}
          </div>
        ) : sub.kind === "hoeren-rf" ? (
          <RFButtons value={answer[sub.id] as boolean | undefined} onPick={(v) => setAnswer(sub.id, v)} />
        ) : (
          <SpeakerPicker item={sub} answer={answer} setAnswer={setAnswer} />
        )}
      </fieldset>
    </div>
  );
}

/** Hören Teil 4: ¿quién dice qué? — botones de los hablantes (a/b/c). */
function SpeakerPicker({
  item, answer, setAnswer,
}: {
  item: HoerenWerSagt;
  answer: Answers;
  setAnswer: (id: string, v: unknown) => void;
}) {
  const picked = answer[item.id] as string | undefined;
  return (
    <div className={s.speakerRow}>
      {item.speakers.map((sp) => (
        <button
          key={sp.key}
          className={`${s.speakerBtn} ${picked === sp.key ? s.rfPicked : ""}`}
          aria-pressed={picked === sp.key}
          onClick={() => setAnswer(item.id, sp.key)}
        >
          <b>{sp.key})</b> <span lang={langConfig().htmlLang}>{sp.name}</span>
        </button>
      ))}
    </div>
  );
}

function HoerenWerSagtItem({ item, answer, setAnswer, onNext }: ItemProps<HoerenWerSagt>) {
  const L = langConfig().htmlLang;
  return (
    <div>
      <p className={s.question} lang={L}>{item.statement}</p>
      <p className={s.questionEs}>{item.statementEs}</p>
      <SpeakerPicker item={item} answer={answer} setAnswer={setAnswer} />
      <NextBtn ready={answer[item.id] !== undefined} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** Contenedor: un audio para N ítems, con los 60 s de lectura previa que el
 *  examen regala y casi nadie usa (PLAN-B1 §5.2). */
function HoerenGroupItem({ item, answer, setAnswer, onNext }: ItemProps<HoerenGroup>) {
  const secs = item.readSeconds ?? 60;
  const [reading, setReading] = useState(true);
  const left = useCountdown(secs, reading);
  useEffect(() => { if (left <= 0) setReading(false); }, [left]);
  const allAnswered = item.items.every((sub) => answer[sub.id] !== undefined);
  return (
    <div>
      {reading ? (
        <div className={s.prepBox}>
          <div className={s.countdown}>{fmt(Math.max(0, left))}</div>
          <p className={s.questionEs} style={{ margin: 0 }}>
            <b>Lee las preguntas AHORA</b>, antes del audio. Estos {secs} segundos son parte del
            examen, no una cortesía: quien no los usa escucha sin saber qué busca.
            {item.twice ? " Después tendrás dos escuchas." : " Después habrá UNA sola escucha."}
          </p>
        </div>
      ) : (
        <>
          <AudioButton text={item.audio} maxPlays={item.twice ? 2 : 1} dialog={item.dialog} />
          {!item.twice && (
            <p className={s.oneShot}>
              <Warning size={15} weight="fill" aria-hidden /> Una sola pasada, como en el examen: si
              pierdes un ítem, síguelo perdiendo y no arrastres el retraso.
            </p>
          )}
        </>
      )}
      {item.items.map((sub, i) => (
        <HoerenSubItem
          key={sub.id}
          sub={sub}
          n={i + 1}
          answer={answer}
          setAnswer={setAnswer}
          preview={reading}
        />
      ))}
      {!reading && <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />}
    </div>
  );
}

/** LanguageCert Access Listening Part 4: ficha con huecos de 1–3 palabras. */
function HoerenNotesItem({ item, answer, setAnswer, onNext }: ItemProps<HoerenNotes>) {
  const val = (answer[item.id] ?? {}) as Record<string, string>;
  const L = langConfig().htmlLang;
  const ready = item.gaps.every((g) => (val[g.id] ?? "").trim().length > 0);
  const dialog = item.dialog ?? item.audio.includes("|");

  function setGap(id: string, text: string) {
    setAnswer(item.id, { ...val, [id]: text });
  }

  return (
    <div>
      <AudioButton text={item.audio} maxPlays={item.twice ? 2 : 1} dialog={dialog} />
      {item.title && <p className={s.question} lang={L}>{item.title}</p>}
      {item.titleEs && <p className={s.questionEs}>{item.titleEs}</p>}
      <div className={s.notesSheet}>
        {item.gaps.map((g) => {
          const mw = g.maxWords ?? 3;
          return (
            <div key={g.id} className={s.notesGap}>
              <label htmlFor={`hn-${item.id}-${g.id}`}>
                <span className={s.notesPrompt} lang={L}>{g.prompt}</span>
                <span className={s.statementEs}>{g.promptEs}</span>
              </label>
              <input
                id={`hn-${item.id}-${g.id}`}
                className={s.formInput}
                value={val[g.id] ?? ""}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder={mw === 1 ? "1 palabra" : `1–${mw} palabras`}
                onChange={(e) => setGap(g.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <NextBtn ready={ready} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** LanguageCert Reading Part 4: texto + huecos de 1–5 palabras. */
function LesenNotesItem({ item, answer, setAnswer, onNext }: ItemProps<LesenNotes>) {
  const val = (answer[item.id] ?? {}) as Record<string, string>;
  const L = langConfig().htmlLang;
  const ready = item.gaps.every((g) => (val[g.id] ?? "").trim().length > 0);

  function setGap(id: string, text: string) {
    setAnswer(item.id, { ...val, [id]: text });
  }

  return (
    <div>
      <p className={s.question} lang={L}>{item.title}</p>
      <div className={s.readingBox} lang={L}>{item.text}</div>
      <div className={s.notesSheet}>
        {item.gaps.map((g) => {
          const mw = g.maxWords ?? 5;
          return (
            <div key={g.id} className={s.notesGap}>
              <label htmlFor={`ln-${item.id}-${g.id}`}>
                <span className={s.notesPrompt} lang={L}>{g.prompt}</span>
                <span className={s.statementEs}>{g.promptEs}</span>
              </label>
              <input
                id={`ln-${item.id}-${g.id}`}
                className={s.formInput}
                value={val[g.id] ?? ""}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                placeholder={mw === 1 ? "1 palabra" : `1–${mw} palabras`}
                onChange={(e) => setGap(g.id, e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <NextBtn ready={ready} onNext={onNext} onBlank={onNext} />
    </div>
  );
}

/** Goethe A2 Hören Teil 2: emparejar ítems con fotos dibujadas (sobran fotos). */
function HoerenPhotoMatchItem({ item, answer, setAnswer, onNext }: ItemProps<HoerenPhotoMatch>) {
  const val = (answer[item.id] ?? {}) as Record<string, string>;
  const L = langConfig().htmlLang;
  const secs = item.readSeconds;
  const [reading, setReading] = useState(!!secs && secs > 0);
  const left = useCountdown(secs && secs > 0 ? secs : 0, reading);
  useEffect(() => { if (reading && left <= 0) setReading(false); }, [left, reading]);
  const dialog = item.dialog ?? item.audio.includes("|");

  const usedBy = new Map<string, number[]>();
  item.items.forEach((it, i) => {
    const k = val[it.id];
    if (k) {
      const arr = usedBy.get(k) ?? [];
      arr.push(i + 1);
      usedBy.set(k, arr);
    }
  });
  const allAnswered = item.items.every((it) => it.id in val);

  function pick(itemId: string, key: string) {
    const next: Record<string, string> = { ...val };
    if (next[itemId] === key) {
      delete next[itemId];
    } else {
      for (const [sid, k] of Object.entries(next)) if (k === key) delete next[sid];
      next[itemId] = key;
    }
    setAnswer(item.id, next);
  }

  return (
    <div>
      {reading ? (
        <div className={s.prepBox}>
          <div className={s.countdown}>{fmt(Math.max(0, left))}</div>
          <p className={s.questionEs} style={{ margin: 0 }}>
            <b>Mira las fotos AHORA</b>, antes del audio. Estos {item.readSeconds} segundos son parte del
            examen.{item.twice ? " Después tendrás dos escuchas." : " Después habrá UNA sola escucha."}
          </p>
        </div>
      ) : (
        <AudioButton text={item.audio} maxPlays={item.twice ? 2 : 1} dialog={dialog} />
      )}

      <div className={s.photoGrid}>
        {item.photos.map((p) => {
          const by = usedBy.get(p.key);
          return (
            <figure
              key={p.key}
              className={`${s.photoCard} ${by ? s.photoCardUsed : ""}`}
              aria-label={`${p.key.toUpperCase()}. ${p.sceneEs}`}
            >
              <span className={s.photoLetter}>{p.key.toUpperCase()}</span>
              <span className={s.photoScene} aria-hidden>
                <ExamScene scene={p.scene} />
              </span>
              <figcaption className={s.photoCaption}>{p.sceneEs}</figcaption>
            </figure>
          );
        })}
      </div>

      {item.items.map((it, i) => {
        const mineKey = val[it.id];
        return (
          <div key={it.id} className={s.matchRow}>
            <p className={s.statement} lang={L}>
              <span className={s.counter}>{i + 1}. </span>{it.prompt}
            </p>
            <p className={s.statementEs}>{it.promptEs}</p>
            <fieldset className={s.plainFieldset} disabled={reading}>
              <div className={s.keyGrid}>
                {item.photos.map((p) => {
                  const mine = mineKey === p.key;
                  const taken = usedBy.has(p.key) && !mine;
                  return (
                    <button
                      key={p.key}
                      className={`${s.keyBtn} ${mine ? s.keyPicked : ""} ${taken ? s.keyTaken : ""}`}
                      aria-pressed={mine}
                      title={taken ? `Ya asignada al ítem ${usedBy.get(p.key)?.join(", ")} — si la eliges aquí, se la quitas` : undefined}
                      onClick={() => pick(it.id, p.key)}
                    >
                      {p.key.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        );
      })}
      {!reading && <NextBtn ready={allAnswered} onNext={onNext} onBlank={onNext} />}
    </div>
  );
}

/** Escenas del Hören Teil 2: dibujo propio, no iconos de catálogo. */
function ExamScene({ scene }: { scene: string }) {
  const ink = "var(--text)";
  const amber = "var(--accent)";
  const panel = "var(--panel)";
  const sw = 1.6;
  const svgProps = {
    viewBox: "0 0 80 60",
    width: "100%",
    height: "100%",
    "aria-hidden": true as const,
  };
  switch (scene) {
    case "library":
      return (
        <svg {...svgProps}>
          <rect x="6" y="8" width="68" height="46" rx="2" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="10" y="14" width="10" height="22" fill={amber} opacity="0.85" />
          <rect x="22" y="18" width="9" height="18" fill={ink} opacity="0.45" />
          <rect x="33" y="12" width="11" height="24" fill={amber} opacity="0.6" />
          <rect x="46" y="16" width="8" height="20" fill={ink} opacity="0.35" />
          <rect x="56" y="14" width="12" height="22" fill={amber} opacity="0.75" />
          <line x1="10" y1="40" x2="70" y2="40" stroke={ink} strokeWidth={sw} />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...svgProps}>
          <rect x="8" y="28" width="64" height="22" rx="2" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="14" y="16" width="22" height="14" rx="2" fill={amber} stroke={ink} strokeWidth={sw} />
          <circle cx="25" cy="23" r="4" fill="none" stroke={ink} strokeWidth={sw} />
          <rect x="48" y="20" width="16" height="10" rx="1" fill={panel} stroke={ink} strokeWidth={sw} />
          <circle cx="56" cy="36" r="3" fill={ink} opacity="0.4" />
        </svg>
      );
    case "office":
      return (
        <svg {...svgProps}>
          <rect x="10" y="34" width="60" height="8" fill={amber} stroke={ink} strokeWidth={sw} />
          <rect x="28" y="14" width="24" height="16" rx="1" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="32" y="18" width="16" height="8" fill={ink} opacity="0.2" />
          <rect x="18" y="26" width="10" height="8" fill={panel} stroke={ink} strokeWidth={sw} />
        </svg>
      );
    case "park":
      return (
        <svg {...svgProps}>
          <ellipse cx="28" cy="28" rx="14" ry="16" fill={amber} opacity="0.7" />
          <rect x="25" y="36" width="6" height="16" fill={ink} opacity="0.55" />
          <rect x="48" y="38" width="22" height="5" rx="1" fill={panel} stroke={ink} strokeWidth={sw} />
          <line x1="52" y1="43" x2="52" y2="52" stroke={ink} strokeWidth={sw} />
          <line x1="66" y1="43" x2="66" y2="52" stroke={ink} strokeWidth={sw} />
        </svg>
      );
    case "festival":
      return (
        <svg {...svgProps}>
          <path d="M16 48 L40 14 L64 48 Z" fill={panel} stroke={ink} strokeWidth={sw} />
          <path d="M12 18 L24 26 L36 18 L48 26 L60 18 L68 26" fill="none" stroke={amber} strokeWidth="2.2" />
        </svg>
      );
    case "bakery":
      return (
        <svg {...svgProps}>
          <rect x="12" y="22" width="56" height="28" rx="2" fill={panel} stroke={ink} strokeWidth={sw} />
          <path d="M20 22 Q40 6 60 22" fill={amber} stroke={ink} strokeWidth={sw} />
          <ellipse cx="32" cy="38" rx="7" ry="5" fill={amber} opacity="0.8" />
          <ellipse cx="50" cy="38" rx="8" ry="5" fill={ink} opacity="0.25" />
        </svg>
      );
    case "sport":
      return (
        <svg {...svgProps}>
          <circle cx="32" cy="30" r="12" fill="none" stroke={ink} strokeWidth={sw} />
          <path d="M32 18 Q40 30 32 42 Q24 30 32 18" fill="none" stroke={amber} strokeWidth={sw} />
          <rect x="52" y="16" width="18" height="28" fill="none" stroke={ink} strokeWidth={sw} />
          <line x1="52" y1="44" x2="70" y2="44" stroke={ink} strokeWidth={sw} />
        </svg>
      );
    case "amt":
      return (
        <svg {...svgProps}>
          <rect x="16" y="22" width="48" height="28" fill={panel} stroke={ink} strokeWidth={sw} />
          <path d="M12 22 L40 8 L68 22 Z" fill={amber} stroke={ink} strokeWidth={sw} />
          <rect x="36" y="34" width="10" height="16" fill={ink} opacity="0.35" />
          <rect x="22" y="30" width="8" height="8" fill={panel} stroke={ink} strokeWidth="1.2" />
          <rect x="50" y="30" width="8" height="8" fill={panel} stroke={ink} strokeWidth="1.2" />
        </svg>
      );
    case "home":
      return (
        <svg {...svgProps}>
          <path d="M12 32 L40 10 L68 32" fill={amber} stroke={ink} strokeWidth={sw} />
          <rect x="20" y="32" width="40" height="20" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="36" y="38" width="10" height="14" fill={ink} opacity="0.35" />
        </svg>
      );
    case "market":
      return (
        <svg {...svgProps}>
          <path d="M10 28 L40 16 L70 28" fill={amber} stroke={ink} strokeWidth={sw} />
          <rect x="16" y="28" width="48" height="20" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="22" y="34" width="12" height="10" fill={ink} opacity="0.25" />
          <rect x="46" y="34" width="12" height="10" fill={amber} opacity="0.7" />
        </svg>
      );
    case "cinema":
      return (
        <svg {...svgProps}>
          <path d="M14 12 L66 12 L60 28 L20 28 Z" fill={ink} opacity="0.2" stroke={ink} strokeWidth={sw} />
          <rect x="18" y="36" width="10" height="8" rx="1" fill={amber} />
          <rect x="35" y="36" width="10" height="8" rx="1" fill={amber} opacity="0.7" />
          <rect x="52" y="36" width="10" height="8" rx="1" fill={amber} opacity="0.45" />
        </svg>
      );
    case "station":
      return (
        <svg {...svgProps}>
          <rect x="10" y="22" width="44" height="16" rx="2" fill={amber} stroke={ink} strokeWidth={sw} />
          <rect x="48" y="18" width="10" height="20" fill={panel} stroke={ink} strokeWidth={sw} />
          <circle cx="20" cy="42" r="5" fill="none" stroke={ink} strokeWidth={sw} />
          <circle cx="42" cy="42" r="5" fill="none" stroke={ink} strokeWidth={sw} />
          <line x1="6" y1="48" x2="74" y2="48" stroke={ink} strokeWidth={sw} />
        </svg>
      );
    case "hospital":
      return (
        <svg {...svgProps}>
          <rect x="18" y="16" width="44" height="36" fill={panel} stroke={ink} strokeWidth={sw} />
          <rect x="34" y="22" width="12" height="24" fill={amber} />
          <rect x="28" y="28" width="24" height="12" fill={amber} />
          <rect x="36" y="40" width="8" height="12" fill={ink} opacity="0.35" />
        </svg>
      );
    case "cafe":
      return (
        <svg {...svgProps}>
          <ellipse cx="32" cy="38" rx="14" ry="6" fill={panel} stroke={ink} strokeWidth={sw} />
          <path d="M22 38 Q22 18 32 16 Q42 18 42 38" fill={amber} stroke={ink} strokeWidth={sw} />
          <path d="M42 24 Q52 24 52 34 Q52 40 42 40" fill="none" stroke={ink} strokeWidth={sw} />
          <rect x="54" y="30" width="14" height="16" rx="1" fill={panel} stroke={ink} strokeWidth={sw} />
        </svg>
      );
    default:
      return (
        <svg {...svgProps}>
          <rect x="10" y="12" width="60" height="38" rx="3" fill={panel} stroke={ink} strokeWidth={sw} />
          <circle cx="40" cy="31" r="10" fill={amber} opacity="0.8" />
        </svg>
      );
  }
}

/** Sprechen Teil 2: la presentación de 5 diapositivas — 40 de los 100 puntos
 *  del oral. Preparación cronometrada, habla cronometrada, modelos y rúbrica. */
function SprechenPraesentationItem({ item, answer, setAnswer, onNext }: ItemProps<SprechenPraesentation>) {
  const L = langConfig().htmlLang;
  const prep = item.prepSeconds ?? 180;
  const speakFor = item.speakSeconds ?? 180;
  const [phase, setPhase] = useState<"prep" | "speak" | "rate">("prep");
  const [slide, setSlide] = useState(0);
  const prepLeft = useCountdown(prep, phase === "prep");
  const spokenLeft = useCountdown(speakFor, phase === "speak");
  const bands = (answer[item.id] ?? {}) as Record<string, number>;
  const cur = item.slides[slide];
  const max = item.weight ?? 40;

  return (
    <div>
      <p className={s.question} lang={L}>{item.topic}</p>
      <p className={s.questionEs}>{item.topicEs}</p>

      {phase === "prep" && (
        <div className={s.prepBox}>
          <div className={s.countdown}>{fmt(Math.max(0, prepLeft))}</div>
          <p className={s.questionEs} style={{ margin: 0 }}>
            Preparación en solitario. Toma notas para <b>las cinco</b> diapositivas: la
            «Erfüllung» se mide por cuántas tratas con contenido suficiente. Tratar dos de cinco
            te baja a la banda D.
          </p>
          <ol className={s.slideList}>
            {item.slides.map((sl, i) => (
              <li key={i}>
                <b lang={L}>{sl.title}</b> — <span>{sl.hint}</span>
              </li>
            ))}
          </ol>
          <div className={s.footer} style={{ justifyContent: "center" }}>
            <button className={s.btnPrimary} onClick={() => setPhase("speak")}>
              Empezar la presentación ({fmt(speakFor)})
            </button>
          </div>
        </div>
      )}

      {phase === "speak" && (
        <div>
          <div className={`${s.countdown} ${spokenLeft <= 0 ? s.countdownOver : ""}`}>
            {spokenLeft > 0 ? fmt(spokenLeft) : "tiempo cumplido"}
          </div>
          <div className={s.slideBox}>
            <div className={s.slideNum}>Diapositiva {slide + 1} de {item.slides.length}</div>
            <p className={s.slideTitle} lang={L}>{cur.title}</p>
            <p className={s.slideHint}>{cur.hint}</p>
          </div>
          <p className={s.playsLeft}>Habla EN VOZ ALTA y sin leer, como ante los dos examinadores.</p>
          <div className={s.footer}>
            <button
              className={s.btnGhost}
              disabled={slide === 0}
              onClick={() => setSlide(slide - 1)}
            >
              Anterior
            </button>
            {slide < item.slides.length - 1 ? (
              <button className={s.btnPrimary} onClick={() => setSlide(slide + 1)}>
                Siguiente diapositiva
              </button>
            ) : (
              <button className={s.btnPrimary} onClick={() => setPhase("rate")}>
                Terminé la presentación
              </button>
            )}
          </div>
        </div>
      )}

      {phase === "rate" && (
        <div>
          {item.slides.map((sl, i) => (
            <div key={i} className={s.modelBox}>
              <div className={s.modelLabel}>{i + 1}. {sl.title}</div>
              <span lang={L}>{sl.model}</span>
              <div style={{ marginTop: 10 }}>
                <button data-sfx="off" className={s.btnGhost} onClick={() => speak(sl.model)}>
                  <SpeakerHigh size={16} weight="duotone" aria-hidden /> Oír el modelo
                </button>{" "}
                <button className={s.btnGhost} onClick={() => speakSlow(sl.model)}>Despacio</button>
              </div>
            </div>
          ))}
          {item.rubric ? (
            <>
              <RubricSelfCheck
                rubric={item.rubric}
                max={max}
                value={bands}
                onChange={(v) => setAnswer(item.id, v)}
              />
              <NextBtn ready={item.rubric.every((c) => bands[c.id] !== undefined)} onNext={onNext} />
            </>
          ) : (
            <NextBtn ready onNext={onNext} />
          )}
        </div>
      )}
    </div>
  );
}

type ItemProps<T> = {
  item: T;
  answer: Answers;
  setAnswer: (id: string, v: unknown) => void;
  onNext: () => void;
};

/* ================= Puntuación ================= */
// el baremo vive en lib/examScore.ts (puro y testeable); aquí solo la UI

/** A cada destreza floja, su herramienta — el puente entre medir y remediar */
const REMEDY: Record<string, { label: string; href: string; how: string }> = {
  hoeren: { label: "Hören flojo → dictados", href: "/review", how: "El repaso espaciado te sirve dictados a diario; sube también el volumen de Nicos Weg." },
  lesen: { label: "Lesen flojo → cuentos y libreta", href: "/referencia", how: "Relee los mini-cuentos de Nico de cada módulo y las preguntas de la libreta." },
  schreiben: { label: "Schreiben flojo → escritura libre", href: "/escritura", how: "Un texto al día con la hoja del examen delante; practica el formulario en el módulo Papeles." },
  sprechen: { label: "Sprechen flojo → habla en voz alta", href: "/entrevista", how: "La entrevista de tu nivel ({level}) dos veces por semana. Aquí te pones nota con la rúbrica; la entrevista es el ensayo con examinador. Ensayas en voz alta con TTS; la nota sale de lo que escribes. No hay micrófono." },
};

const REMEDY_EN: Record<string, { label: string; href: string; how: string }> = {
  hoeren: { label: "Listening flojo → oído real", href: "/review", how: "El repaso te sirve dictados a diario; y las lecciones de «Oído real» de cada módulo son tu gimnasio." },
  lesen: { label: "Reading flojo → cuentos y libreta", href: "/referencia", how: "Relee las historias de Valeria de cada módulo y las preguntas de la libreta." },
  schreiben: { label: "Writing flojo → escritura libre", href: "/escritura", how: "Un texto al día, con la meta de palabras del examen y la hoja delante." },
  sprechen: { label: "Speaking flojo → entrevista", href: "/entrevista", how: "La entrevista de tu nivel ({level}) dos veces por semana; habla SIEMPRE en voz alta." },
};

const SPLIT_ES: Record<string, string> = {
  hoeren: "Escuchar",
  lesen: "Leer",
  schreiben: "Escribir",
  sprechen: "Hablar",
};

function splitTitle(skills: string[], pair: readonly [string, string], both: string): string {
  if (pair.every((k) => skills.includes(k))) return both;
  return skills.map((k) => SPLIT_ES[k] ?? k).join(" y ");
}

/** Dos cifras, no un segundo veredicto: el aprobado de arriba sigue siendo
 *  el de cada módulo, rúbrica incluida. */
function SplitScores({ split }: { split: ModularSplit }) {
  return (
    <div className={s.splitRow} role="group" aria-label="Nota que corrige el simulacro y nota que te pones tú">
      <div className={s.splitCard}>
        <div className={`${s.splitPct} num`}>{split.objectivePct}%</div>
        <p className={s.splitName}>{splitTitle(split.objectiveSkills, ["hoeren", "lesen"], "Escuchar y leer")}</p>
        <p className={s.splitHint}>Sale de tus respuestas, no de una rúbrica.</p>
      </div>
      <div className={`${s.splitCard} ${s.splitSelf}`}>
        <div className={`${s.splitPct} num`}>{split.selfPct}%</div>
        <p className={s.splitName}>{splitTitle(split.selfSkills, ["schreiben", "sprechen"], "Escribir y hablar")}</p>
        <p className={s.splitHint}>Sale de la rúbrica que te has puesto. No es la nota de un examinador.</p>
      </div>
    </div>
  );
}

function ResultsScreen({ set, results, newBadges, saved,
  }: { set: ExamSet; answers: Answers; results: ExamResults; newBadges: Badge[]; saved: boolean | null;
}) {
  const wrong = results.itemResults.filter((r) => r.ok === false);
  // la destreza con peor porcentaje marca la remediación
  const weakest = Object.entries(results.bySkill)
    .map(([skill, sc]) => ({ skill, pct: sc.max ? sc.got / sc.max : 1 }))
    .sort((a, b) => a.pct - b.pct)[0];
  const remedyMap = langConfig().htmlLang === "en" ? REMEDY_EN : REMEDY;
  const remedy = weakest && weakest.pct < 0.85 ? remedyMap[weakest.skill] : null;
  const mods = results.modules;
  const cut = set.scoring?.passPct ?? 60;
  const failed = mods?.filter((m) => !m.pass) ?? [];
  return (
    <div className={s.wrap}>
      <div className={s.resultHead}>
        <div aria-hidden>{results.pass ? <SummitSeal size={72} /> : <NotebookSeal size={72} />}</div>
        <div className={`${s.resultPct} num ${results.pass ? s.pass : s.failColor}`}>{results.totalPct}%</div>
        <h1 className={s.sectionTitle}>
          {mods
            ? results.allModulesPassed
              ? `Los ${mods.length} módulos aprobados — ${band(results.totalPct, set)}`
              : `Todavía no — ${failed.length} ${failed.length === 1 ? "módulo suspenso" : "módulos suspensos"}`
            : results.pass
              ? `${langConfig().htmlLang === "en" ? "Pass" : "Bestanden"} — ${band(results.totalPct, set)}`
              : `Todavía no — el corte es ${cut}%`}
        </h1>
        <p className={s.sectionMeta}>
          {set.title} · bandas oficiales:{" "}
          {(set.scoring?.bands ?? [
            { min: 90, label: "sehr gut" }, { min: 80, label: "gut" },
            { min: 70, label: "befriedigend" }, { min: 60, label: "ausreichend" },
          ]).map((b) => `${b.label} ${b.min}+`).join(" · ")}
        </p>
        {mods && (
          <p className={s.sectionMeta}>
            Examen <b>modular</b>: la cifra de arriba es solo la media. Lo que cuenta es cada módulo.
          </p>
        )}
      </div>

      {results.split && <SplitScores split={results.split} />}

      {mods && (
        <>
          <div className={s.moduleGrid}>
            {mods.map((m) => (
              <div key={m.skill} className={`${s.moduleCard} ${m.pass ? s.modulePass : s.moduleFail}`}>
                <div className={s.moduleHead}>
                  <SkillIcon skill={m.skill} size={22} />
                  <span>{set.sections.find((x) => x.skill === m.skill)?.label ?? m.skill}</span>
                </div>
                <div className={`${s.modulePts} num`}>{m.points}<span className={s.moduleOf}>/100</span></div>
                <div className={s.moduleState}>
                  {m.pass
                    ? <><CheckCircle size={16} weight="fill" aria-hidden /> aprobado</>
                    : <><XCircle size={16} weight="fill" aria-hidden /> suspenso</>}
                  {" · corte "}{cut}
                </div>
              </div>
            ))}
          </div>
          <p className={s.modularNote} role="note">
            {results.allModulesPassed
              ? `Con los ${mods.length} módulos aprobados tienes el certificado completo: los certificados de módulo equivalen a un Gesamtzeugnis.`
              : `Sin TODOS los módulos aprobados no hay certificado global — y no hay compensación: un módulo brillante no salva a otro por debajo de ${cut}. Los módulos suspensos (${failed.map((m) => set.sections.find((x) => x.skill === m.skill)?.label ?? m.skill).join(", ")}) se repiten por separado.`}
          </p>
        </>
      )}

      <BadgeUnlocks badges={newBadges} />

      {/* en modular el desglose por destreza ya lo da la tarjeta de módulo */}
      {!mods && (
        <div className={s.skillGrid}>
          {Object.entries(results.bySkill).map(([skill, sc]) => {
            const pct = sc.max ? Math.round((sc.got / sc.max) * 100) : 0;
            return (
              <div key={skill} className={s.skillCard}>
                <div aria-hidden><SkillIcon skill={skill} size={26} /></div>
                <div className={`${s.skillPct} num`}>{pct}%</div>
                <div className={s.skillName}>
                  {set.sections.find((x) => x.skill === skill)?.label ?? skill}
                  {" · "}{Math.round(sc.got * 10) / 10}/{sc.max}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {remedy && (
        <div className={s.card} style={{ marginBottom: 14, borderColor: "var(--warn)" }}>
          <p className={s.instruction}>{remedy.label}</p>
          <p className={s.instructionEs}>{remedy.how.replace("{level}", set.level.toUpperCase())}</p>
          <Link href={remedy.href} className={s.btnPrimary} style={{ display: "inline-flex", alignItems: "center" }}>
            Ir a entrenar esa destreza
          </Link>
        </div>
      )}

      {wrong.length > 0 && (
        <div className={s.card}>
          <p className={s.instruction}>Para repasar ({wrong.length})</p>
          {wrong.map((r) => (
            <div key={r.id} className={s.reviewItem}>
              <p className={s.reviewQ} lang={langConfig().htmlLang}>{r.label}</p>
              <p className={s.reviewDetail}>
                <span className={s.reviewWrong}>✗</span> {r.detail}
              </p>
            </div>
          ))}
        </div>
      )}

      {saved === false && (
        <p role="alert" style={{ textAlign: "center", color: "var(--warn)", fontWeight: 600, marginTop: 14 }}>
          Este resultado no quedó guardado. {saveFailureDetail(MOTOR_OFF)}
        </p>
      )}

      <div className={s.footer} style={{ justifyContent: "center", gap: 12 }}>
        <Link href="/examen" className={s.btnGhost} style={{ display: "inline-flex", alignItems: "center" }}>
          Volver a simulacros
        </Link>
        <button className={s.btnPrimary} onClick={() => window.location.reload()}>
          Repetir este Modellsatz
        </button>
      </div>
    </div>
  );
}
