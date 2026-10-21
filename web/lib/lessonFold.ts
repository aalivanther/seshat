// Pliegue de UNA lección hacia las filas de /api/lesson-result.
// Una fila por ítem, no por ejercicio: el servidor aplica applyReview una
// vez por fila, así que el veredicto tiene que llegar ya agregado.
//
// El modo es producir solo si alguna tentativa de producción de ese ítem
// salió limpia. Un «casi», una pista o un segundo intento no lo son: no
// levantan el techo de 16 días.
//
// Esos aciertos sucios cuentan como fallo en la mayoría. Un ítem que solo
// tuvo eso sale en falso, y el servidor lo cita a diez minutos. La nota de
// la lección no sale de aquí: la pantalla ya la dejó en 0,75.
// El empate no es acierto: mejor repasar de más que dar por sabido un ítem
// que salió tantas veces mal como bien.

import type { ReviewMode } from "./types";

/** Lo que el pliegue lee de un ejercicio cerrado.
 *  Casi, pistas e intentos separan el acierto sucio del limpio. Si faltan,
 *  no se inventa un fallo: un correct suelto sigue siendo recuperación. */
export interface LessonFoldOutcome {
  correct: boolean;
  mode: ReviewMode;
  itemIds: readonly string[];
  almost?: boolean;
  usedHints?: number;
  attempts?: number;
}

/** Fila que viaja a /api/lesson-result. El modo va siempre: vacío, en el
 *  servidor, contaría como producir. */
export interface LessonItemResult {
  itemId: string;
  correct: boolean;
  mode: ReviewMode;
}

// A la primera, sin pista y sin «casi». Lo demás no fija la forma, aunque
// la nota de la lección siga en 0,75: el SRS tiene que volver a preguntarla.
function recuperacionLimpia(o: LessonFoldOutcome): boolean {
  if (!o.correct) return false;
  if (o.almost) return false;
  if ((o.usedHints ?? 0) > 0) return false;
  if ((o.attempts ?? 1) > 1) return false;
  return true;
}

export function foldLessonItems(outcomes: readonly LessonFoldOutcome[]): LessonItemResult[] {
  const byItem = new Map<string, { ok: number; bad: number; produced: boolean }>();
  for (const o of outcomes) {
    const limpia = recuperacionLimpia(o);
    for (const it of o.itemIds) {
      const e = byItem.get(it) ?? { ok: 0, bad: 0, produced: false };
      if (limpia) e.ok++;
      else e.bad++;
      // Producir es haberlo sacado bien y limpio. Ni un fallo ni un «casi»
      // (umlaut, dictado a la vista, pista, segundo intento) levantan el
      // techo de 16 días.
      if (o.mode === "produce" && limpia) e.produced = true;
      byItem.set(it, e);
    }
  }
  return [...byItem.entries()].map(([itemId, c]) => ({
    itemId,
    correct: c.ok > c.bad,
    mode: c.produced ? "produce" : "recognize",
  }));
}
