import { openSync, closeSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// `gen-course.mjs` SIEMPRE escribe en el mismo sitio real, `data/course.gen.ts`
// — es su trabajo, y varios ficheros de test (catalogFase1, composicionFase0,
// manifestFase2) lo invocan de verdad para comprobar su salida. Vitest corre
// ficheros de test en paralelo por defecto: sin este candado, dos ficheros
// pueden intercalar sus generaciones y uno acaba comparando un
// `course.gen.ts` a medio escribir por el OTRO — no un fallo del generador,
// un fallo de la prueba. Este candado (nombre de fichero, sin dependencias)
// serializa solo a los que de verdad tocan el recurso compartido; el resto
// de la suite sigue en paralelo.
const LOCK_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data", ".course-gen.lock");

function acquire(): void {
  const deadline = Date.now() + 60_000;
  for (;;) {
    try {
      closeSync(openSync(LOCK_PATH, "wx"));
      return;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
      if (Date.now() > deadline) {
        throw new Error(
          `courseGenLock: no se pudo adquirir en 60 s (¿un test anterior murió sin liberar ${LOCK_PATH}? bórralo a mano si es así)`,
        );
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
}

function release(): void {
  try {
    unlinkSync(LOCK_PATH);
  } catch {
    // ya liberado o nunca existió: nada que hacer
  }
}

export function withCourseGenLock<T>(fn: () => T): T {
  acquire();
  try {
    return fn();
  } finally {
    release();
  }
}
