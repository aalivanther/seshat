import { describe, expect, it, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { withCourseGenLock } from "./courseGenLock";

// PLAN-COMPOSICION.md §10, FASE 1 — criterio de aceptación:
// `node scripts/gen-course.mjs <n>` produce, para n = 1..7, un
// `course.gen.ts` BYTE A BYTE IDÉNTICO al snapshot recapturado.
// 16-09-2026: se recapturó al meter verbs/questions/pronunciation en refModules.
// Los fixtures de `fixtures/course-gen-snapshots/drop-<n>.ts` son la captura
// EXACTA de lo que el generador basado en drops producía, tomada antes de
// tocar `gen-course.mjs` — es una prueba de "no rompiste nada publicado", no
// de un bug: por eso no hay un estado "roto" que reproducir primero, solo un
// contrato a proteger mientras se cambia el mecanismo por debajo.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const genScript = join(webRoot, "scripts", "gen-course.mjs");
const genOut = join(webRoot, "data", "course.gen.ts");
const fixturesDir = join(webRoot, "lib", "__tests__", "fixtures", "course-gen-snapshots");

describe("PLAN-COMPOSICION FASE 1 — diff byte a byte contra los drops 1-7", () => {
  for (const n of [1, 2, 3, 4, 5, 6, 7]) {
    it(`drop ${n}: course.gen.ts idéntico al capturado antes del catálogo`, () => {
      withCourseGenLock(() => {
        execFileSync("node", [genScript, String(n)], { cwd: webRoot });
        const got = readFileSync(genOut, "utf8");
        // .txt, no .ts: si fuera .ts, tsc lo compilaría como fuente real y sus
        // imports relativos (pensados para vivir en data/) no resolverían.
        const want = readFileSync(join(fixturesDir, `drop-${n}.txt`), "utf8");
        expect(got).toBe(want);
      });
    }, 60_000);
  }

  // dejar el repo como estaba: el build real vive en el drop más alto
  afterAll(() => {
    withCourseGenLock(() => execFileSync("node", [genScript, "8"], { cwd: webRoot }));
  }, 60_000);
});
