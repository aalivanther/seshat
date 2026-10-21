// Reloj del simulacro: la fuente de verdad es cuándo ARRANCÓ, no un contador
// que se congela al cerrar la pestaña (DEUDA §20d / cierre previo al B2 §2.2).

/** Un Teil de Goethe no pasa de aquí. Un `minutes: 1e12` en un pack roto
 *  no puede dejar el cronómetro en un número que tumbe la UI. */
const MAX_SECTION_MIN = 240;
/** Techo total: 8 h. El B1 más largo ronda las 3. */
export const EXAM_MAX_DURATION_SEC = 8 * 3600;

/** Segundos oficiales del set: suma de los minutos de cada sección. */
export function examDurationSeconds(sections: { minutes?: number }[] | null | undefined): number {
  if (!Array.isArray(sections)) return 0;
  let min = 0;
  for (const s of sections) {
    const m = s?.minutes;
    if (typeof m !== "number" || !Number.isFinite(m) || m <= 0) continue;
    min += Math.min(m, MAX_SECTION_MIN);
    if (min * 60 >= EXAM_MAX_DURATION_SEC) return EXAM_MAX_DURATION_SEC;
  }
  return Math.round(min * 60);
}

/** Cronómetro del escrito: Hören+Lesen+Schreiben. El Sprechen es cita aparte
 *  y no corre en el mismo reloj. Secciones sin `skill` siguen contando
 *  (los tests pasan minutos pelados). */
export function examWrittenDurationSeconds(
  sections: { minutes?: number; skill?: string }[] | null | undefined,
): number {
  if (!Array.isArray(sections)) return 0;
  return examDurationSeconds(sections.filter((s) => s.skill !== "sprechen"));
}

/** Papel de reloj de una destreza. Goethe B1/B2 modular: cada módulo es cita
 *  aparte. LanguageCert: Listening vs Reading+Writing. Goethe A1/A2: un escrito. */
export function examClockPaper(
  set: { id?: string; scoring?: { modular?: boolean } },
  skill: string | undefined,
): string {
  if (!skill || skill === "sprechen") return "sprechen";
  if (set.scoring?.modular) return skill;
  const id = typeof set.id === "string" ? set.id : "";
  if (id.startsWith("en-") || id.includes("-en-")) {
    return skill === "hoeren" ? "listening" : "rw";
  }
  return "written";
}

export function examPaperDurationSeconds(
  set: { id?: string; scoring?: { modular?: boolean }; sections?: { minutes?: number; skill?: string }[] },
  paper: string,
): number {
  const sections = set.sections ?? [];
  if (paper === "sprechen") return 0;
  return examDurationSeconds(
    sections.filter((s) => examClockPaper(set, s.skill) === paper),
  );
}

/** Minutos que debe mostrar el intro del player: el papel, no la sección.
 *  LanguageCert Reading o Writing → 130, no 80 ni 50. */
export function examIntroMinutes(
  set: { id?: string; scoring?: { modular?: boolean }; sections?: { minutes?: number; skill?: string }[] },
  skill: string | undefined,
): number {
  const paper = examClockPaper(set, skill);
  const sec = examPaperDurationSeconds(set, paper);
  return sec > 0 ? Math.round(sec / 60) : 0;
}

/** Tiempo restante. `startedAt` y `now` en epoch Unix (segundos). Nunca negativo
 *  ni por encima de la duración (un reloj adelantado no regala tiempo). */
export function examSecondsLeft(startedAt: number, durationSec: number, now: number): number {
  if (!Number.isFinite(startedAt) || !Number.isFinite(durationSec) || !Number.isFinite(now)) return 0;
  if (startedAt <= 0 || durationSec <= 0) return 0;
  const dur = Math.min(durationSec, EXAM_MAX_DURATION_SEC);
  if (now < startedAt) return dur;
  return Math.max(0, startedAt + dur - now);
}
