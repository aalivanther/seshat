// El contenido completo de un módulo, para el reto: su mazo se arma al pulsar
// «Empezar», así que se pide al abrir la página y se queda en memoria. Llegaba
// horneado en el HTML de cada reto (el de nivel, con el nivel entero dentro).
import type { Lesson, Phase, PhaseMeta } from "@/lib/types";
import { phaseLoaders } from "./phaseLoaders.gen";

const loaded = new Map<string, Phase>();
const pending = new Map<string, Promise<Phase>>();

function loadPhase(id: string): Promise<Phase> {
  const hit = loaded.get(id);
  if (hit) return Promise.resolve(hit);
  let p = pending.get(id);
  if (!p) {
    const load = phaseLoaders[id];
    if (!load) return Promise.reject(new Error(`módulo «${id}» fuera de este build`));
    p = load().then(
      (phase) => {
        loaded.set(id, phase);
        return phase;
      },
      (err: unknown) => {
        // un fallo de red no se queda cacheado: el siguiente intento vuelve a pedirlo
        pending.delete(id);
        throw err;
      },
    );
    pending.set(id, p);
  }
  return p;
}

/** La fase con el contenido de sus lecciones: un módulo tal cual, o la
 *  sintética del reto de nivel con las lecciones de todos sus módulos, en el
 *  mismo orden que su índice. */
export function loadFullPhase(meta: PhaseMeta): Promise<Phase> {
  if (phaseLoaders[meta.id]) return loadPhase(meta.id);
  const ids = [...new Set(meta.lessons.map((l) => l.phaseId))];
  return Promise.all(ids.map(loadPhase)).then((phases) => {
    const byId = new Map<string, Lesson>(phases.flatMap((p) => p.lessons.map((l) => [l.id, l] as const)));
    const lessons = meta.lessons.flatMap((l) => byId.get(l.id) ?? []);
    return { ...meta, lessons };
  });
}
