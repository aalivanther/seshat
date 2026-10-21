import type { WriteExercise } from "./types";

/** el mismo tokenizer que examScore.ts y el player del write */
export function writeWordCount(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

export interface WriteGrade {
  correct: boolean;
  almost: boolean;
  words: number;
  okCount: number;
  /** cero checks cubiertos: el texto no trata la tarea → 0, aunque llegue al recuento */
  offTopic: boolean;
}

/** La nota no incluye el registro. Va junto a la rúbrica: en el examen sí
 *  puntúa, y aquí no se resta (haría bajar ejercicios ya publicados). */
export const NOTA_SIN_REGISTRO =
  "Esta nota no incluye el registro: en el examen sí puntúa, y aquí lo comparas tú con el modelo.";

/** Texto del acierto. Si el ejercicio pide registro, o enseña la rúbrica
 *  del examen, la nota no se llama como si el registro ya hubiera entrado. */
export function writePassFeedback(p: {
  puntos: number;
  palabras: number;
  pideRegistro: boolean;
  hayRubrica: boolean;
  conectores: { min: number; usados: number; criterio: string } | null;
}): string {
  const base = `Los ${p.puntos} puntos cubiertos en ${p.palabras} palabras.`;
  const pocos = p.conectores != null && p.conectores.usados < p.conectores.min;
  if (pocos && p.conectores) {
    const linea =
      `${base} Aquí cuenta como bien, pero el texto pedía ${p.conectores.min} conectores distintos del banco y llevas ${p.conectores.usados}: ` +
      `en el examen, ${p.conectores.criterio} puntúa aparte.`;
    // Sin rúbrica, esta línea es lo único que ve: el registro hay que decirlo aquí.
    if (p.pideRegistro && !p.hayRubrica) return `${linea} ${NOTA_SIN_REGISTRO}`;
    return linea;
  }
  if (p.hayRubrica) return `${base} Aquí eso cuenta como bien.`;
  if (p.pideRegistro) return `${base} Aquí eso cuenta como bien. ${NOTA_SIN_REGISTRO}`;
  return `${base} Así se puntúa en el examen.`;
}

/** Nota del write: regex de los checks + rango. Off-topic (0 checks) es 0,
 *  no un «almost» por haber escrito muchas palabras de otra cosa. El
 *  registro no entra: restarlo bajaría ejercicios ya publicados. */
export function gradeWrite(ex: WriteExercise, text: string): WriteGrade {
  const plain = text.replace(/[\u2018\u2019\u02BC]/g, "'");
  const words = writeWordCount(plain);
  const inRange = words >= ex.minWords && words <= ex.maxWords;
  const okCount = ex.checks.filter((c) => new RegExp(c.re, "i").test(plain)).length;
  const offTopic = okCount === 0;
  const allOk = !offTopic && okCount === ex.checks.length && inRange;
  return {
    correct: allOk,
    almost: allOk ? false : !offTopic && okCount >= Math.ceil(ex.checks.length / 2) && words >= ex.minWords,
    words,
    okCount,
    offTopic,
  };
}
