// IDs "mágicos" del progreso — ÚNICA fuente. El backend guarda por estas
// claves: cambiarlas rompe el progreso de clientes (ver snapshot del validador).

/** clave de resultado de la prueba de un módulo */
export const testId = (phaseId: string) => `test-${phaseId}`;

/** clave de resultado de un simulacro de examen (ExamSet.id, p. ej. "sim-a") */
export const examResultId = (setId: string) => `exam-${setId}`;

/** ¿la clave de lección es un simulacro de examen?
    Solo el A1 alemán (el histórico) tiene ids pelados "sim-a"; los demás sets
    llevan delante su idioma o su nivel: "en-sim-a", "b1-sim-a" → sus claves son
    "exam-en-sim-a" y "exam-b1-sim-a". Con el viejo startsWith("exam-sim-") esos
    no casaban, así que la medalla Prüfling era inalcanzable estudiando inglés
    (y también con el simulacro B1). Las claves guardadas NO cambian: solo
    reconocemos también las que llevan prefijo. */
export const isExamSimResult = (lessonKey: string) => /^exam-(?:[a-z0-9]+-)*sim-/.test(lessonKey);

/** clave de resultado del repaso exprés */
export const REVIEW_ID = "review";

/** clave de resultado de la entrevista oral (alemán · Sprechen Goethe A1) */
export const INTERVIEW_ID = "entrevista";

/** clave de resultado de la entrevista oral inglesa (Spoken LanguageCert A1) */
export const INTERVIEW_EN_ID = "entrevista-en";

/** Clave de progreso de la entrevista de un (idioma, CEFR).
 *  A1 DE/EN conservan las claves ya publicadas. Un B1 no reutiliza la del A1. */
export function interviewResultId(lang: string, cefr: string): string {
  if (lang === "de" && cefr === "a1") return INTERVIEW_ID;
  if (lang === "en" && cefr === "a1") return INTERVIEW_EN_ID;
  return `entrevista-${lang}-${cefr}`;
}

/** clave de resultado del reto (run roguelike) de un módulo */
export const retoId = (phaseId: string) => `reto-${phaseId}`;

/** clave de resultado de la misión de práctica real de un módulo */
export const missionId = (phaseId: string) => `mission-${phaseId}`;

/** Id de progreso de la prueba de nivel. Es una «lección» más a ojos del motor,
 *  así que viaja en el respaldo y sobrevive al cambio de dispositivo — el
 *  informe detallado sigue en el navegador donde se hizo. */
export function placementResultId(lang: string): string {
  return `colocacion-${lang}`;
}
