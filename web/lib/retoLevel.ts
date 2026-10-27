// El reto de NIVEL y el idioma de un reto, aparte del motor (retoRun.ts es
// de cliente): la página del reto, en el servidor, arma con esto la fase
// sintética entera antes de mandarla al navegador.

import type { PhaseMeta } from "./types";
import { langOfPhase } from "@/data/courseIndex";
import { resolveLevelId, phasesOf as levelPhases } from "./levels";

/** RETO DE NIVEL ("la vuelta al nivel"): fase sintética que agrupa TODOS los
    módulos — misma run, pool gigante, la medalla gorda. Se abre al completar
    el nivel entero. El id "nivel-<levelId>" vive como LessonStat normal.
    Sus lecciones salen del índice: el contenido lo pone la página. */
export function levelPseudoPhase(levelId: string): PhaseMeta | null {
  const lv = resolveLevelId(levelId);
  if (!lv) return null;
  const phases = levelPhases(lv);
  if (!phases.length) return null;
  return {
    id: `nivel-${lv.id}`,
    level: lv.cefr,
    n: 0,
    title: lv.lang === "en" ? "La vuelta a Londres" : `La vuelta al ${lv.name}`,
    goal: `TODO el ${lv.name} en una run: 10 ejercicios de cualquier módulo.`,
    color: "#7c3aed",
    lessons: phases.flatMap((p) => p.lessons),
  };
}

/** idioma de una fase, entendiendo también las sintéticas de nivel */
export function retoLangOf(phaseId: string): string {
  if (phaseId.startsWith("nivel-")) {
    const lv = resolveLevelId(phaseId.slice("nivel-".length));
    if (lv) return lv.lang;
  }
  return langOfPhase(phaseId);
}
