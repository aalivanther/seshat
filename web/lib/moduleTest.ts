import type { Exercise, Phase } from "./types";
import { EXERCISE_KINDS } from "./exerciseKinds";
import { shuffle } from "./shuffle";

// Prueba del módulo: SOLO recuperación (nunca re-estudio), mezclando lecciones
// (interleaving tras el bloque — Cepeda/Suzuki) y sesgada a producción
// (el efecto test de Karpicke rinde más cuanto más cuesta recuperar).

export function buildModuleTest(phase: Phase, size = 12): Exercise[] {
  const production: Exercise[] = [];
  const recall: Exercise[] = [];
  for (const lesson of phase.lessons) {
    for (const sec of lesson.sections) {
      for (const ex of sec.exercises ?? []) {
        // `translate` es el único tipo cuya dificultad depende de la
        // DIRECCIÓN: traducir hacia el idioma es producir desde cero —lo más
        // caro que hay— y traducir al español es reconocer. Sin este reparto,
        // la prueba de módulo dejaba fuera justo el ejercicio que más certifica.
        // Es un dato de la INSTANCIA, no del tipo — el descriptor no lo decide.
        if (ex.type === "translate") {
          (ex.direction === "toTarget" ? production : recall).push(ex);
          continue;
        }
        const modo = EXERCISE_KINDS[ex.type].moduleTest;
        if (modo === "production") production.push(ex);
        else if (modo === "recall") recall.push(ex);
      }
    }
  }
  const used = new Set<string>();
  // ~60% producción, resto recuerdo
  const writes = production.filter((e) => e.type === "write");
  const prodRest = production.filter((e) => e.type !== "write");
  const nProd = Math.min(production.length, Math.ceil(size * 0.6));
  // Un write de 80 palabras no puede ocupar la prueba: como mucho uno.
  const writePick = writes.length && nProd > 0 ? spread(shuffle(writes), 1, used) : [];
  const restProd = spread(shuffle(prodRest), Math.max(0, nProd - writePick.length), used);
  const picked = shuffle([
    ...writePick,
    ...restProd,
    ...spread(shuffle(recall), size - writePick.length - restProd.length, used),
  ]);
  return picked.slice(0, size);
}

/**
 * Coge `n` del montón (ya barajado) SIN repetir palabra mientras haya de sobra.
 * El interleaving que promete la cabecera no estaba: barajar y cortar dejaba
 * pruebas donde la mitad de las preguntas eran de la misma palabra —cinco o
 * seis repeticiones en doce huecos—, que es justo lo contrario de mezclar
 * lecciones. Si el módulo no da para tanto, se rellena con lo que haya: antes
 * quedarse corto que dejar la prueba sin certificar.
 */
function spread(pool: Exercise[], n: number, used: Set<string>): Exercise[] {
  if (n <= 0) return [];
  const out: Exercise[] = [];
  const rest: Exercise[] = [];
  for (const ex of pool) {
    const ids = ex.itemIds ?? [];
    if (out.length >= n || ids.some((id) => used.has(id))) {
      rest.push(ex);
      continue;
    }
    for (const id of ids) used.add(id);
    out.push(ex);
  }
  for (const ex of rest) {
    if (out.length >= n) break;
    out.push(ex);
  }
  return out;
}
