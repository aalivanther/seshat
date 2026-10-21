// Nivel de un simulacro a partir de su id — sin regex de tres peldaños.
//
// Los ids publicados no se tocan: "sim-a" (A1 alemán histórico) sigue siendo
// A1. El resto declara el CEFR en el propio id (`b1-sim-a`, `en-b2-sim-a`)
// o en ExamSet.level. Esta función es la red para quien reciba un id suelto
// (hub, tests, medallas) y no el objeto ExamSet.

import { isCefr, type Cefr } from "./cefr";

/** CEFR de un ExamSet.id. `sim-a` (histórico DE A1) → a1. Nunca un B2 cae a A1. */
export function examLevelOf(setId: string | null | undefined): Cefr {
  if (typeof setId !== "string" || !setId) return "a1";
  const parts = setId.split("-");
  for (const p of parts) {
    if (isCefr(p)) return p;
  }
  return "a1";
}
