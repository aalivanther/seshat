import { describe, expect, it, afterAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveManifest, loadManifestChain, selectPieces } from "../../scripts/resolve-manifest.mjs";
import { CATALOG } from "../../content/catalog.mjs";
import { withCourseGenLock } from "./courseGenLock";

// PLAN-COMPOSICION.md §10 FASE 2 — el manifiesto y el lockfile.
//
// Criterio de aceptación NO NEGOCIABLE (§10.2, A.5 de PLAN-1.9.9.5.md):
// `node scripts/gen-course.mjs <manifest>` para los manifiestos drop-1..7
// debe producir un `course.gen.ts` BYTE A BYTE IDÉNTICO al que produce
// `node scripts/gen-course.mjs <N>` (la ruta numérica, ya verificada byte a
// byte contra los drops de antes de la 1.9.9.5 en `catalogFase1.test.ts`) —
// salvo la línea de cabecera, que a propósito dice qué manifiesto lo horneó.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const genScript = join(webRoot, "scripts", "gen-course.mjs");
const genOut = join(webRoot, "data", "course.gen.ts");

function bodyWithoutHeader(text: string): string {
  // la línea 2 ("// Drop horneado: N..." / "// Manifiesto horneado: id...")
  // es la ÚNICA que puede diferir a propósito — el resto es contenido.
  return text.split("\n").filter((_, i) => i !== 1).join("\n");
}

describe("FASE 2 — drop-N por manifiesto es idéntico a drop-N numérico (salvo cabecera)", () => {
  for (const n of [1, 2, 3, 4, 5, 6, 7]) {
    it(`drop-${n}.json produce el mismo course.gen.ts que el argumento numérico ${n}`, () => {
      withCourseGenLock(() => {
        execFileSync("node", [genScript, `drop-${n}`], { cwd: webRoot });
        const viaManifest = readFileSync(genOut, "utf8");
        execFileSync("node", [genScript, String(n)], { cwd: webRoot });
        const viaDrop = readFileSync(genOut, "utf8");
        expect(bodyWithoutHeader(viaManifest)).toBe(bodyWithoutHeader(viaDrop));
      });
    }, 90_000);
  }

  afterAll(() => {
    withCourseGenLock(() => execFileSync("node", [genScript, "8"], { cwd: webRoot }));
  }, 90_000);
});

describe("El resolvedor: cadena de extends, selección por igualdad de campos", () => {
  it("drop-7 hereda (por extends) todo lo de drop-1..6", () => {
    const chain = loadManifestChain("drop-7");
    expect(chain.map((m) => m.id)).toEqual(["drop-1", "drop-2", "drop-3", "drop-4", "drop-5", "drop-6", "drop-7"]);
  });

  it("un manifiesto sin extends es un build a la carta: cadena de un solo eslabón", () => {
    expect(loadManifestChain("solo-ingles").map((m) => m.id)).toEqual(["solo-ingles"]);
  });

  it("un selector vacío {} seleccionaría el catálogo entero (nadie lo usa hoy, pero el motor lo soporta)", () => {
    const piezas = selectPieces({ include: [{}], exclude: [] });
    expect(piezas.length).toBe(CATALOG.length);
  });

  it("un drop de producto no arrastra piezas con since posterior (ExamSet A2 del drop 8)", () => {
    const fake = { id: "a2-sim-fake", kind: "exam", lang: "de", level: "a2", file: "x", exports: { set: "x" }, since: 99 };
    const had = CATALOG.some((p: { id: string }) => p.id === fake.id);
    if (!had) (CATALOG as object[]).push(fake);
    try {
      const drop2 = selectPieces({ include: [{ lang: "de", level: "a2" }], exclude: [], dropNumber: 2 });
      expect(drop2.some((p: { id: string }) => p.id === fake.id)).toBe(false);
      const drop99 = selectPieces({ include: [{ lang: "de", level: "a2" }], exclude: [], dropNumber: 99 });
      expect(drop99.some((p: { id: string }) => p.id === fake.id)).toBe(true);
    } finally {
      if (!had) {
        const i = CATALOG.findIndex((p: { id: string }) => p.id === fake.id);
        if (i !== -1) CATALOG.splice(i, 1);
      }
    }
  });

  it("exclude gana sobre include: una pieza que casa con ambos queda fuera", () => {
    const piezas = selectPieces({ include: [{ lang: "de", level: "a1" }], exclude: [{ id: "f0" }] });
    expect(piezas.some((p) => p.id === "f0")).toBe(false);
    expect(piezas.some((p) => p.id === "f1")).toBe(true);
  });

  it("features y policy: la hoja de la cadena gana campo a campo sobre la raíz", () => {
    const m = resolveManifest("drop-7");
    expect(m.features.ai).toBe(true);
    expect(m.policy.vocabularyClosure).toBe("cards"); // por defecto, declarado en drop-1
  });
});

describe("build-app.sh acepta un manifiesto además de un número de drop", () => {
  it("el bloque de resolución de versión reconoce un argumento no numérico como manifiesto", () => {
    const src = readFileSync(join(webRoot, "..", "build-app.sh"), "utf8");
    expect(src, "build-app.sh no menciona manifests/ — no acepta un id de manifiesto todavía").toMatch(/manifests?/);
  });
});
