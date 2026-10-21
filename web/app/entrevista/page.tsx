"use client";

// Entrevista oral POR IDIOMA Y POR NIVEL — la página elige su config con el
// idioma activo y el nivel REAL del alumno (`highestStartedCefr`, igual que la
// resto del cuaderno) y el resto es un solo player.
//
// Escritas:
// · de-a1 — Sprechen · Start Deutsch 1, PESOS OFICIALES: Teil 1 = 3 pts ·
//   Teil 2 = 6 pts · Teil 3 = 6 pts (total 15, corte 60%). Resultado: "entrevista".
// · de-a2 — Goethe-Zertifikat A2 Sprechen (15 pts, corte 60%). Resultado: "entrevista-de-a2".
// · de-b1 — Goethe-Zertifikat B1 Sprechen, tres Teile, ~15 min, 100 pts, corte 60%.
//   Resultado: "entrevista-de-b1".
// · de-b2 — Goethe-Zertifikat B2 Sprechen (100 pts, corte 60%). Resultado: "entrevista-de-b2".
// · en-a1 — Spoken · LanguageCert ESOL A1, 4 partes: presentación con deletreo
//   (9 pts) · situaciones (15 pts) · preguntas que haces TÚ (12 pts) · mini-tema
//   con 30 s de prep (14 pts) — total 50, corte 50%. Resultado: "entrevista-en".
// · en-a2 — LanguageCert ESOL A2 Access Spoken, 4 partes, ~9 min, 50 pts, corte 50%.
//   Resultado: "entrevista-en-a2".
// · en-b1 — LanguageCert ESOL B1 Achiever Spoken, 12 min, 50 pts, corte 50%.
//   Resultado: "entrevista-en-b1".
// · en-b2 — LanguageCert B2 Communicator Spoken (50 pts, corte 50%). Resultado: "entrevista-en-b2".
//
// Si no hay partitura de ese (idioma, CEFR), `interviewFor` devuelve null y la
// portada dice «aún no escrito». Jamás se recicla el A1 para un B1.
//
// Cada sesión varía: preguntas del pool de formulaciones reales de examinador.
// Si el ítem trae casillas, el número sale de ellas. Sin casillas no se inventa
// un baremo: te comparas con la respuesta de ejemplo y te pones nota.

// Cada partitura (pools, textos del examinador y pesos) vive en su fichero.
// El baremo está en nota.ts. Si vuelven a esta página, deja de poder abrirse
// y la nota se mezcla otra vez con las preguntas.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useConfirm } from "@/lib/useConfirm";
import { notFound, useRouter } from "next/navigation";
import { has } from "@/data/features";
import { Microphone, SpeakerHigh, CheckCircle, X } from "@phosphor-icons/react";
import { useLeaveGuard } from "@/lib/useLeaveGuard";
import { getState, postLessonResult, saveFailureDetail } from "@/lib/api";
import { getActiveLang, adoptLang } from "@/lib/languages";
import { highestStartedCefr } from "@/lib/levels";
import { asCefr, type Cefr } from "@/lib/cefr";
import { ORAL_CONTRACT } from "@/lib/oralCopy";
import { celebrate, sfxFanfare } from "@/lib/juice";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge as BadgeT } from "@/lib/achievements";
import { SfxToggle } from "@/components/SfxToggle";
import { motorOffText } from "@/components/ErrorBanner";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { speak, speakSlow } from "@/lib/tts";
import ls from "@/components/lesson.module.css";
import ex from "@/components/ex.module.css";
import exam from "@/components/exam.module.css";
import type { InterviewConfig, InterviewItem } from "./tipos";
import { interviewFor } from "./registro";
import {
  capOralPoints,
  leyendaDe,
  leyendaPortada,
  oralCierreEnseña,
  oralLeyendaPortada,
  oralNotaLeyenda,
  oralTextoSinCalificar,
  scoreOralSchema,
} from "./nota";

export {
  interviewFor,
  capOralPoints,
  oralCierreEnseña,
  oralLeyendaPortada,
  oralNotaLeyenda,
  oralTextoSinCalificar,
  scoreOralSchema,
};

/** Qué es el oral del nivel que el alumno lleva DE VERDAD. Sirve para una sola
 *  cosa: decírselo cuando su entrevista todavía no está escrita, en vez de
 *  colarle la del A1 como si fuera la suya. */
const ORAL_OF: Record<string, string> = {
  "de-a2": "el Sprechen del Goethe-Zertifikat A2: hablar de ti, un intercambio de preguntas y planificar algo entre dos",
  "de-b1": "el Sprechen del Goethe-Zertifikat B1: planificar algo entre dos, presentar un tema y comentar la presentación del otro",
  "en-a2": "el Spoken del LanguageCert ESOL A2 Access: cuatro partes en pasado, planes con going to y un tema más largo que el A1",
  "en-b1": "el Spoken del LanguageCert ESOL B1 Achiever: 12 minutos en cuatro partes, con un monólogo de minuto y medio y 30 s de preparación",
};

type Result = {
  item: InterviewItem;
  answer: string;
  points: number;
  feedback: string;
  aviso: string;
  /** true si el número salió de las casillas; si no, lo puso el alumno. */
  deCasillas: boolean;
};

export default function InterviewPage() {
  const { confirm, dialog } = useConfirm();
  const router = useRouter();
  async function pedirSalida() {
    const ok = await confirm({
      title: "¿Abandonar la entrevista?",
      body: "Se pierde lo respondido hasta ahora. Cada sesión trae preguntas distintas, así que volver a empezar no es repetir lo mismo.",
      confirmLabel: "Abandonar",
      danger: true,
    });
    if (ok) router.push(`/idioma/${getActiveLang()}`);
  }
  // config e ítems SOLO en cliente (post-mount): el idioma vive en localStorage
  // y construir con Math.random durante el render rompería la hidratación
  const [cfg, setCfg] = useState<InterviewConfig | null>(null);
  const [ITEMS, setITEMS] = useState<InterviewItem[] | null>(null);
  // el nivel que el alumno lleva de verdad; si su entrevista no está escrita,
  // hace otra y hay que decírselo (no basta con darle la del A1 en silencio)
  const [asked, setAsked] = useState<Cefr>("a1");
  const [lang, setLang] = useState("de");
  useEffect(() => {
    let alive = true;
    const l = getActiveLang();
    setLang(l);
    adoptLang(l); // config lingüística en juego: el TTS habla el idioma del examen
    // hay que esperar al progreso: el nivel decide QUÉ entrevista se construye,
    // y montar la del A1 para cambiarla después sería enseñar preguntas que no
    // son. getState nunca rechaza (devuelve null si el motor está apagado), así
    // que el peor caso es la portada de «Preparando la entrevista…» unos segundos.
    void getState().then((st) => {
      if (!alive) return;
      const nivel = asCefr(highestStartedCefr(l, st), l);
      setAsked(nivel);
      const c = interviewFor(l, nivel);
      setCfg(c);
      try {
        setITEMS(c ? c.build() : []);
      } catch {
        setCfg(null);
        setITEMS([]);
      }
    });
    return () => { alive = false; };
  }, []);
  const [idx, setIdx] = useState(-1); // -1 = portada
  const [answer, setAnswer] = useState("");
  const [phase, setPhase] = useState<"prep" | "answer" | "graded">("answer");
  const [prepLeft, setPrepLeft] = useState(0);
  const [lastFeedback, setLastFeedback] = useState("");
  const [lastPoints, setLastPoints] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  // avisa al recargar/cerrar solo si ya hay entrevista hecha o respuesta escrita:
  // un aviso que salta siempre se aprende a ignorar
  useLeaveGuard(results.length > 0 || answer.trim().length > 0);
  const [newBadges, setNewBadges] = useState<BadgeT[]>([]);
  const [saved, setSaved] = useState<boolean | null>(null);
  const posted = useRef(false);

  const item = ITEMS && idx >= 0 && idx < ITEMS.length ? ITEMS[idx] : null;
  const finished = ITEMS !== null && idx >= ITEMS.length;

  useEffect(() => {
    if (item) {
      const t = setTimeout(() => speak(item.question), 500);
      return () => clearTimeout(t);
    }
  }, [item]);

  // cuenta atrás de preparación (mini-tema EN): visible, saltable
  useEffect(() => {
    if (phase !== "prep") return;
    if (prepLeft <= 0) {
      setPhase("answer");
      return;
    }
    const t = setTimeout(() => setPrepLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, prepLeft]);

  /** entra al ítem i arrancando en prep si el ítem lo pide (mini-tema) */
  function startItem(i: number) {
    const it = ITEMS?.[i];
    if (it?.prep) {
      setPhase("prep");
      setPrepLeft(it.prep);
    } else {
      setPhase("answer");
    }
    setIdx(i);
  }

  // puntos ponderados como el examen: (nota/2) × peso del ítem
  const totalPts = results.reduce((s, r) => s + (r.points / 2) * r.item.weight, 0);
  const pct = cfg ? Math.round((totalPts / cfg.totalPts) * 100) : 0;

  useEffect(() => {
    if (cfg && ITEMS && finished && results.length === ITEMS.length && !posted.current) {
      posted.current = true;
      postLessonResult(cfg.resultId, totalPts / cfg.totalPts, []).then((st) => {
        setSaved(st !== null);
        if (st) setNewBadges(checkNewBadges(st));
      });
      if (pct >= cfg.passPct) { celebrate(pct >= 85); sfxFanfare(); }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, results]);

  function submit() {
    if (!item || !cfg || answer.trim().length < 2) return;
    const schema = scoreOralSchema(item, answer);
    if (schema.total > 0) {
      const points = schema.hit <= 1 ? 0 : schema.hit < schema.total ? 1 : 2;
      const box =
        `Esquema ${schema.hit}/${schema.total}` +
        (schema.missing.length ? ` · faltó: ${schema.missing.join(" · ")}` : "");
      setLastPoints(points);
      setLastFeedback(box);
    } else {
      setLastPoints(null);
      setLastFeedback("");
    }
    setPhase("graded");
  }

  function nextWith(points: number) {
    if (!item) return;
    const capped = capOralPoints(item, points, answer);
    const schema = scoreOralSchema(item, answer);
    const box = schema.total
      ? `Esquema ${schema.hit}/${schema.total}` +
        (schema.missing.length ? ` · faltó: ${schema.missing.join(" · ")}` : "")
      : "";
    const feedback = [lastFeedback, box].filter(Boolean).join("\n\n");
    setResults([...results, { item, answer, points: capped, feedback, aviso: "", deCasillas: schema.total > 0 }]);
    setAnswer("");
    setLastFeedback("");
    setLastPoints(null);
    startItem(idx + 1);
  }

  if (!has("interview")) notFound();

  return (
    <div className={ls.wrap}>
      {dialog}
      <div className={ls.topBar}>
        <Link
          href={cfg?.homeHref ?? "/idioma/de"}
          className={ls.closeBtn}
          aria-label="Salir de la entrevista"
          onClick={(e) => {
            if (idx >= 0 && !finished && results.length > 0) {
              e.preventDefault();
              void pedirSalida();
            }
          }}
        ><X size={20} weight="bold" aria-hidden /></Link>
        <SfxToggle />
        <div className={ls.progressTrack} role="progressbar" aria-valuenow={Math.max(idx, 0)} aria-valuemin={0} aria-valuemax={ITEMS?.length ?? 0} aria-label="Progreso de la entrevista">
          <div className={ls.progressFill} style={{ width: ITEMS ? `${(Math.max(idx, 0) / ITEMS.length) * 100}%` : "0%" }} />
        </div>
        {idx >= 0 && !finished && ITEMS && <span className={ls.stepCount}>{idx + 1}/{ITEMS.length}</span>}
      </div>

      {ITEMS === null && (
        <div className={ls.doneWrap} aria-busy="true">
          <p className={ls.doneSub}>Preparando la entrevista…</p>
        </div>
      )}

      {ITEMS !== null && cfg === null && (
        <div className={ls.doneWrap}>
          <Microphone size={44} weight="duotone" color="var(--accent-text)" aria-hidden />
          <h1 className={ls.doneTitle}>Oral de {asked.toUpperCase()}: aún no escrito</h1>
          <p className={ls.doneSub} style={{ maxWidth: "48ch", margin: "8px auto 0" }}>
            La entrevista del {asked.toUpperCase()} —{ORAL_OF[`${lang}-${asked}`] ?? "tu examen oral"}—
            todavía no está en este cuaderno. No te ponemos la del A1: no es tu examen.
            El oral de tu nivel se practica en los monólogos y los role-play de tus módulos.
          </p>
          <p className={ls.doneSub} style={{ maxWidth: "48ch" }}>
            {ORAL_CONTRACT}
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center", marginTop: 24 }}>
            <Link href={`/idioma/${lang}`} className={ex.btnPrimary}>Volver al {lang === "en" ? "inglés" : "alemán"}</Link>
          </div>
        </div>
      )}

      {ITEMS !== null && cfg !== null && idx === -1 && (
        <div className={ls.doneWrap}>
          <Microphone size={44} weight="duotone" color="var(--accent-text)" aria-hidden />
          <h1 className={ls.doneTitle}>Entrevista de prueba</h1>
          <p className={ls.doneSub} style={{ maxWidth: "48ch", margin: "8px auto 0" }}>
            <b>Es el oral del {cfg.levelLabel}</b> con sus tareas y su baremo.{" "}
            {cfg.intro}{" "}
            {leyendaPortada(ITEMS, false)}
          </p>
          <p className={ls.doneSub} style={{ maxWidth: "48ch" }}>
            {ORAL_CONTRACT}
          </p>
          <div className={ls.continueRow} style={{ justifyContent: "center", marginTop: 24 }}>
            <button className={ex.btnPrimary} onClick={() => startItem(0)}>Empezar la entrevista</button>
          </div>
        </div>
      )}

      {item && cfg && (
        <div className={`${ex.card} ${ex.cardEnter}`} key={idx}>
          <div className={ex.typeChip}>
            <Microphone size={16} weight="duotone" aria-hidden /> {cfg.chip(item.part)}
            <span style={{ fontWeight: 400 }}>· {item.weight} {item.weight === 1 ? "pt" : "pts"}</span>
          </div>
          <p className={ex.question} lang={cfg.langTag}>{item.question}</p>
          <p className={ex.howTo}>{item.questionEs}</p>
          {item.schemaChecks && item.schemaChecks.length > 0 && (
            <>
              <ol className={ex.howTo} style={{ marginTop: 8, paddingLeft: 20 }}>
                {item.schemaChecks.map((c) => (
                  <li key={c.label}>{c.label}</li>
                ))}
              </ol>
              <p className={ex.howTo}>{leyendaDe(item, false)}</p>
            </>
          )}
          <div className={ex.audioRow}>
            <button className={ex.speakerBtn} onClick={() => speak(item.question)}>
              <SpeakerHigh size={17} weight="duotone" aria-hidden /> Repetir pregunta
            </button>
            <button className={ex.speakerBtn} onClick={() => speakSlow(item.question)}>Despacio</button>
          </div>

          {phase === "prep" && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <div role="timer" aria-live="polite" style={{ fontSize: "2.75rem", fontWeight: 800, color: "var(--accent-text)", fontVariantNumeric: "tabular-nums" }}>
                {prepLeft >= 60
                  ? `${Math.floor(prepLeft / 60)}:${String(prepLeft % 60).padStart(2, "0")}`
                  : `${prepLeft}s`}
              </div>
              <p className={ex.howTo}>
                {prepLeft >= 60
                  ? "Preparación del papel, como en el examen: anota el esquema, no el texto entero."
                  : "Tiempo de preparación, como en el examen real: piensa 4-5 frases simples del tema."}
              </p>
              <div className={ex.footer} style={{ justifyContent: "center" }}>
                <button className={ex.btnPrimary} onClick={() => setPhase("answer")}>Ya estoy — empezar a hablar</button>
              </div>
            </div>
          )}

          {phase === "answer" && (
            <>
              <p className={ex.howTo} style={{ marginTop: 10 }}>
                1) Responde EN VOZ ALTA. 2) Escribe aquí lo que dijiste:
              </p>
              <textarea
                className={exam.textarea}
                style={{ minHeight: 90, paddingLeft: 18 }}
                value={answer}
                lang={cfg.langTag}
                spellCheck={false}
                placeholder={cfg.placeholder}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <div className={ex.footer}>
                <span />
                <button className={ex.btnPrimary} disabled={answer.trim().length < 2} onClick={submit}>
                  {(item.schemaChecks?.length ?? 0) > 0 ? "Corregir" : "Comparar con la respuesta"}
                </button>
              </div>
            </>
          )}

          {phase === "graded" && lastPoints !== null && (
            <div>
              <div className={`${ex.feedback} ${lastPoints === 2 ? ex.feedbackOk : lastPoints === 1 ? ex.feedbackAlmost : ex.feedbackBad}`} role="status">
                <div className={ex.feedbackTitle}>
                  {lastPoints === 2 ? "2/2 — tarea cumplida" : lastPoints === 1 ? "1/2 — a medias" : "0/2 — no cumple la tarea"}
                </div>
                <p className={ex.howTo}>{leyendaDe(item, false)}</p>
                <div className={ex.feedbackBody} style={{ whiteSpace: "pre-line" }}>
                  {lastFeedback.replace(/NOTA:\s*[0-2]\s*/, "")}
                </div>
              </div>
              <div className={ex.footer}>
                <span />
                <button className={ex.btnPrimary} onClick={() => nextWith(lastPoints)} autoFocus>Siguiente</button>
              </div>
            </div>
          )}

          {phase === "graded" && lastPoints === null && (
            <div>
              <div className={exam.modelBox}>
                <div className={exam.modelLabel}>Respuesta de ejemplo</div>
                <span lang={cfg.langTag}>{item.model}</span>
                <div style={{ marginTop: 10 }}>
                  <button data-sfx="off" className={ex.btnGhost} onClick={() => speak(item.model)}>
                    <SpeakerHigh size={15} aria-hidden /> Oír el ejemplo
                  </button>
                </div>
              </div>
              <p className={ex.howTo} style={{ marginTop: 12 }}>
                Compárate y califícate (0-2). {leyendaDe(item, false)}
              </p>
              <div className={ex.footer} style={{ justifyContent: "flex-start", flexWrap: "wrap" }}>
                <button className={ex.btnPrimary} onClick={() => nextWith(2)}>2 · Lo cumplí</button>
                <button className={ex.btnGhost} onClick={() => nextWith(1)}>1 · A medias</button>
                <button className={ex.btnGhost} onClick={() => nextWith(0)}>0 · No pude</button>
              </div>
            </div>
          )}
        </div>
      )}

      {finished && cfg && (
        <div className={ls.doneWrap}>
          <CheckCircle size={44} weight="duotone" color={pct >= cfg.passPct ? "var(--ok)" : "var(--warn)"} aria-hidden />
          <h1 className={ls.doneTitle}>{pct >= cfg.passPct ? cfg.passTitle : cfg.failTitle}</h1>
          <p className={ls.doneSub}>
            {Math.round(totalPts * 10) / 10}/{cfg.totalPts} puntos ponderados ({pct}%) — {cfg.doneTail}
          </p>
          <BadgeUnlocks badges={newBadges} />
          <div style={{ textAlign: "left", marginTop: 20 }}>
            {results.filter((r) => oralCierreEnseña(r.points, r.aviso)).map((r, i) => (
              <div key={i} className={ex.tip} style={{ marginBottom: 8 }}>
                <b lang={cfg.langTag}>{r.item.question}</b>
                <br />Tu respuesta: <span lang={cfg.langTag}>{r.answer}</span> · {r.points}/2
                <span style={{ display: "block", marginTop: 4 }}>{leyendaDe(r.item, r.deCasillas)}</span>
                {r.feedback && (
                  <span style={{ whiteSpace: "pre-line", display: "block", marginTop: 4 }}>
                    {r.feedback.replace(/NOTA:\s*[0-2]\s*/, "")}
                  </span>
                )}
                {!r.feedback && (
                  <span style={{ display: "block", marginTop: 4 }}>
                    Modelo: <span lang={cfg.langTag}>{r.item.model}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
          {saved === false && (
            <p role="alert" style={{ textAlign: "center", color: "var(--warn)", fontWeight: 600, marginTop: 14 }}>
              Este resultado no quedó guardado. {saveFailureDetail(motorOffText())}
            </p>
          )}
          <div className={ls.continueRow} style={{ justifyContent: "center", marginTop: 20 }}>
            <Link href={cfg.homeHref} className={ex.btnGhost} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>Volver</Link>
            <Link href="/entrevista" className={ex.btnPrimary} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }} onClick={() => window.location.reload()}>
              Repetir entrevista
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
