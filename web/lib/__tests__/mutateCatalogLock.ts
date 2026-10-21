import { openSync, closeSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// T1 y T4 mutan `courses`/`levels` en memoria. Vitest corre ficheros en
// paralelo: sin candado, un test de desbloqueo ve un b2m1 fantasma. Solo
// serializa a quien muta el catálogo vivo; el resto de la suite sigue a la vez.

const LOCK_PATH = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "data", ".mutate-catalog.lock");

function acquire(): void {
  const deadline = Date.now() + 60_000;
  for (;;) {
    try {
      closeSync(openSync(LOCK_PATH, "wx"));
      return;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
      if (Date.now() > deadline) {
        throw new Error(`mutateCatalogLock: no se pudo adquirir en 60 s (${LOCK_PATH})`);
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
}

function release(): void {
  try {
    unlinkSync(LOCK_PATH);
  } catch { /* ya libre */ }
}

export function withMutateCatalogLock<T>(fn: () => T): T {
  acquire();
  try {
    return fn();
  } finally {
    release();
  }
}

export function holdMutateCatalogLock(): void {
  acquire();
}

export function releaseMutateCatalogLock(): void {
  release();
}
