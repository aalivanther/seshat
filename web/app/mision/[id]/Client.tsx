"use client";

// PRÁCTICA REAL — la misión TBLT del módulo (spec en PLAN-EN §V1.2.5).
// El idioma como herramienta: preparas el toolkit, sales al mundo (o lo
// simulas en casa), y te puntúas por can-dos cumplidos — jamás por gramática.
// La nota vive como LessonStat `mission-<phaseId>` (cero campos backend).

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { notFound, useParams } from "next/navigation";
// Toda la pantalla de la misión va con arte propio: es la pieza que el alumno
// enseña cuando cuenta qué es esto.
import { MarkCompass, MarkHouse, MarkGlobe, MarkSpark, MarkCheckBox, ToolTalk } from "@/components/Art";
import { courses, langOfPhase, missionOf, courseOf } from "@/data/course";
import { has } from "@/data/features";
import { adoptLang } from "@/lib/languages";
import { useProgress } from "@/lib/useProgress";
import { hayQuePreguntarAlSalir, useLeaveGuard } from "@/lib/useLeaveGuard";
import { phaseCompleted, isSandboxProfile } from "@/lib/unlock";
import { missionId } from "@/lib/ids";
import { postLessonResult, saveFailureDetail } from "@/lib/api";
import { checkNewBadges } from "@/lib/badgeTracker";
import type { Badge } from "@/lib/achievements";
import { BadgeUnlocks } from "@/components/BadgeUnlocks";
import { recordRetoMisses } from "@/lib/retoMiss";
import { asciiFold } from "@/lib/langUtils";
import { Speaker } from "@/components/Speaker";
import { MOTOR_OFF } from "@/components/ErrorBanner";
import { speakSlow } from "@/lib/tts";
import hub from "@/components/hub.module.css";
import ex from "@/components/ex.module.css";
import s from "./mision.module.css";

export default function MissionPage() {
  if (!has("missions")) notFound();
  const params = useParams<{ id: string }>();
  const mission = missionOf(params.id);
  const phase = Object.values(courses).flatMap((c) => c.phases).find((p) => p.id === params.id);
  const lang = phase ? langOfPhase(phase.id) : null;
  useEffect(() => {
    if (lang) adoptLang(lang);
  }, [lang]);

  const { state } = useProgress({ due: false });
  const st = state === "loading" ? null : state;

  const [variant, setVariant] = useState<"world" | "home">("home");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [missedWords, setMissedWords] = useState("");
  const [missedUnknown, setMissedUnknown] = useState<string[]>([]);
  const [saved, setSaved] = useState<"idle" | "pending" | "ok" | "fail">("idle");
  // Registrar la misión da XP y puede cerrar una racha, así que puede desbloquear
  // medalla — y hasta ahora el aviso no se pedía aquí: la medalla se ganaba y el
  // alumno no se enteraba nunca, porque `checkNewBadges` solo anuncia lo NUEVO.
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  // La checklist no se guarda hasta registrar. Mirar la misión no es trabajo.
  useLeaveGuard(hayQuePreguntarAlSalir({
    palabras: missedWords,
    checklist: checked.size,
    registrada: saved === "ok",
  }));

  const best = st?.lessons?.[missionId(params.id)]?.bestScore;

  if (!mission || !phase) notFound();
  const unlocked = isSandboxProfile() || !st || phaseCompleted(phase, st);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setSaved("idle");
  }

  function finish() {
    if (saved === "pending") return;
    const pct = checked.size / mission!.checklist.length;
    // "palabras que me faltaron" → ítems del curso → prioridad ×3 en el repaso
    const words = missedWords.toLowerCase().split(/[,;\n]+/).map((w) => w.trim()).filter((w) => w.length >= 3);
    if (words.length) {
      const vocab = Object.values(courseOf(lang!).vocab);
      const tokensOf = (s: string) => asciiFold(s.toLowerCase()).split(/[^a-z']+/).filter(Boolean);
      const found = new Set<string>();
      const hit = vocab
        .filter((v) => {
          const toks = new Set([...tokensOf(v.target), ...tokensOf(v.source)]);
          const w = words.find((w) => tokensOf(w).every((t) => toks.has(t)));
          if (w) found.add(w);
          return !!w;
        })
        .map((v) => v.id);
      recordRetoMisses(hit);
      setMissedUnknown(words.filter((w) => !found.has(w)));
    }
    setSaved("pending");
    postLessonResult(missionId(params.id), pct, []).then((r) => {
      setSaved(r ? "ok" : "fail");
      if (r) setNewBadges(checkNewBadges(r));
    });
  }

  return (
    <main className={hub.wrap}>
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang}`}>{lang === "de" ? "Alemán" : "Inglés"}</Link> <span>/</span>
        <Link href={`/modulo/${phase.id}`}>{phase.title}</Link> <span>/</span>
        <span>Práctica real</span>
      </nav>

      <header className={hub.header}>
        <div>
          <h1 className={hub.title}>
            <span style={{ display: "inline-block", verticalAlign: "-6px" }}><MarkCompass size={30} color={phase.color} /></span>{" "}
            {mission.title}
          </h1>
          <p className={hub.subtitle}>{mission.canDo}</p>
        </div>
      </header>

      {!unlocked ? (
        <div className={s.card}>
          <p>La misión se abre al completar el módulo: primero las herramientas, luego el mundo.</p>
          <Link href={`/modulo/${phase.id}`} className={ex.btnPrimary}>Volver al módulo</Link>
        </div>
      ) : (
        <>
          <div className={s.outcome}>
            <MarkSpark size={18} /> <b>La victoria:</b> {mission.outcome}
            {typeof best === "number" && (
              <span className={s.best}>Tu mejor misión: {Math.round(best * 100)}% de la checklist</span>
            )}
          </div>

          <section className={s.card}>
            <h2 className={s.h2}>1 · Prepara las frases</h2>
            <p className={s.sub}>Ensáyalas en voz alta hasta soltarlas sin leer. Para eso está el botón «despacio».</p>
            <div className={s.toolkit}>
              {mission.prep.map((p) => (
                <div key={p.text} className={s.phrase}>
                  <div>
                    <div className={s.phraseTarget}>{p.text}</div>
                    <div className={s.phraseEs}>{p.es}</div>
                  </div>
                  <span className={s.phraseAudio}>
                    <Speaker text={p.text} label="" ariaLabel={`Escuchar: ${p.text}`} />
                    <button className={ex.btnGhost} onClick={() => speakSlow(p.text)}>despacio</button>
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className={s.card}>
            <h2 className={s.h2}>2 · La misión</h2>
            <ol className={s.steps}>
              {mission.steps.map((p) => <li key={p}>{p}</li>)}
            </ol>
            <div className={s.variantRow} role="tablist" aria-label="Dónde harás la misión">
              <button
                role="tab"
                aria-selected={variant === "home"}
                className={`${s.variantBtn} ${variant === "home" ? s.variantActive : ""}`}
                onClick={() => setVariant("home")}
              >
                <MarkHouse size={17} /> En casa
              </button>
              <button
                role="tab"
                aria-selected={variant === "world"}
                className={`${s.variantBtn} ${variant === "world" ? s.variantActive : ""}`}
                onClick={() => setVariant("world")}
              >
                <MarkGlobe size={17} /> En el mundo
              </button>
            </div>
            <p className={s.variantText}>{variant === "home" ? mission.home : mission.world}</p>
          </section>

          {mission.roleplay && (
            <section className={s.card}>
              <h2 className={s.h2}>
                <ToolTalk size={20} /> Ensayo con {mission.roleplay.partner}
              </h2>
              <p className={s.sub}>
                {mission.roleplay.partner} abre. Tú contestas en voz alta, con las frases de arriba. No hay que escribir el diálogo.
              </p>
              <p className={s.phraseTarget} lang={lang === "en" ? "en" : "de"}>
                <b>{mission.roleplay.partner}: </b>{mission.roleplay.opener}
              </p>
              <span className={s.phraseAudio}>
                <Speaker text={mission.roleplay.opener} label="" ariaLabel={`Escuchar: ${mission.roleplay.opener}`} />
                <button type="button" className={ex.btnGhost} onClick={() => speakSlow(mission.roleplay!.opener)}>despacio</button>
              </span>
            </section>
          )}

          <section className={s.card}>
            <h2 className={s.h2}>3 · ¿Pudiste? — márcalo con honestidad</h2>
            <div className={s.checklist}>
              {mission.checklist.map((c, i) => (
                <button
                  key={c}
                  className={`${s.check} ${checked.has(i) ? s.checkOn : ""}`}
                  onClick={() => toggle(i)}
                  aria-pressed={checked.has(i)}
                >
                  <MarkCheckBox size={20} done={checked.has(i)} /> {c}
                </button>
              ))}
            </div>
            <label className={s.missedLabel}>
              ¿Qué palabras te faltaron ahí fuera? (sepáralas con comas — el repaso te las traerá pronto)
              <input
                className={s.chatInput}
                value={missedWords}
                onChange={(e) => setMissedWords(e.target.value)}
                placeholder="p. ej.: recibo, para llevar…"
              />
            </label>
            <div className={ex.footer} style={{ justifyContent: "flex-start", marginTop: 12 }}>
              <button className={ex.btnPrimary} disabled={saved === "pending" || saved === "ok" || checked.size === 0} onClick={finish}>
                {saved === "ok" ? "✓ Misión registrada" : "Registrar mi misión"}
              </button>
              {saved === "ok" && <Link href={`/modulo/${phase.id}`} className={ex.btnGhost}>Volver al módulo</Link>}
            </div>
            {missedUnknown.length > 0 && (
              <p className={s.sub} role="note" style={{ marginTop: 8 }}>
                {missedUnknown.length === 1 ? "Esta palabra no está" : "Estas palabras no están"} en el curso
                todavía: {missedUnknown.join(", ")} — apúntalas por tu cuenta, el curso sigue creciendo.
              </p>
            )}
            {saved === "fail" && (
              <p role="alert" className={s.saveFail}>
                La misión no quedó guardada. {saveFailureDetail(MOTOR_OFF)}
              </p>
            )}
            <BadgeUnlocks badges={newBadges} />
          </section>
        </>
      )}
    </main>
  );
}
