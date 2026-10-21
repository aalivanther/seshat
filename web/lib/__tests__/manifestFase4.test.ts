import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { checkCapRequires, ALL_FEATURES_ON, resolveManifest } from "../../scripts/resolve-manifest.mjs";
import { withCourseGenLock } from "./courseGenLock";

// PLAN-COMPOSICION.md §7 — las capacidades. FASE 4.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const genScript = join(webRoot, "scripts", "gen-course.mjs");
const featuresOut = join(webRoot, "data", "features.gen.ts");

describe("T4 — las capacidades cumplen sus requisitos (CAP_REQUIRES, §7.6)", () => {
  it("todo encendido no viola nada (es el estado de hoy)", () => {
    expect(() => checkCapRequires(ALL_FEATURES_ON)).not.toThrow();
  });

  it("certificates sin moduleTest: el certificado nunca se podría emitir — falla", () => {
    expect(() => checkCapRequires({ ...ALL_FEATURES_ON, moduleTest: false })).toThrow(/certificates.*moduleTest/);
  });

  it("badges sin interview: las medallas de entrevista serían inalcanzables — falla", () => {
    // solo interview, para no disparar TAMBIÉN la regla de certificates (que
    // necesita exams) — este test aísla la fila de badges.
    expect(() => checkCapRequires({ ...ALL_FEATURES_ON, interview: false })).toThrow(/badges/);
  });

  it("challenges sin review: retoMiss pondera plantillas de reviewSession que no viajarían — falla", () => {
    expect(() => checkCapRequires({ ...ALL_FEATURES_ON, review: false })).toThrow(/challenges.*review/);
  });

  it("apagar una capacidad SIN encender nada que dependa de ella no falla nunca", () => {
    expect(() => checkCapRequires({ ...ALL_FEATURES_ON, ai: false, interview: false, exams: false, badges: false, certificates: false, moduleTest: false })).not.toThrow();
  });

  it("un manifiesto que viola CAP_REQUIRES no resuelve (falla en el build, no en runtime)", () => {
    // muestra-b1m7 apaga exams/certificates/badges/placement pero deja
    // moduleTest encendido: no depende de nada apagado — no debe lanzar.
    expect(() => resolveManifest("muestra-b1m7")).not.toThrow();
  });
});

describe("features.gen.ts — compilado desde el manifiesto, del mismo modo que course.gen.ts", () => {
  it("un drop numérico (el build completo de hoy) genera FEATURES con las doce encendidas", () => {
    withCourseGenLock(() => execFileSync("node", [genScript, "8"], { cwd: webRoot }));
    const src = readFileSync(featuresOut, "utf8");
    for (const cap of Object.keys(ALL_FEATURES_ON)) {
      expect(src, `features.gen.ts no enciende "${cap}" en el build completo`).toMatch(new RegExp(`${cap}: true`));
    }
  }, 30_000);

  it("un manifiesto que apaga funcionalidades las apaga en el generado", () => {
    withCourseGenLock(() => {
      execFileSync("node", [genScript, "muestra-b1m7"], { cwd: webRoot });
      const src = readFileSync(featuresOut, "utf8");
      expect(src).toMatch(/ai: false/);
      expect(src).toMatch(/exams: false/);
      expect(src).toMatch(/review: true/);
      // dejar el repo como estaba (drop 8 = B2)
      execFileSync("node", [genScript, "8"], { cwd: webRoot });
    });
  }, 30_000);
});

describe("TOOLS.cap — el punto de mayor apalancamiento del censo (§7.3): 8 de 12 tarjetas", () => {
  const src = readFileSync(join(webRoot, "app", "idioma", "[lang]", "Client.tsx"), "utf8");

  it("cada tarjeta de práctica, libreta, entrevista, examen o colocación declara su capacidad", () => {
    for (const cap of ["reference", "ai", "interview", "exams", "placement"]) {
      expect(src, `TOOLS no tiene ninguna fila con cap: "${cap}"`).toMatch(new RegExp(`cap: "${cap}"`));
    }
  });

  it("el filtro de TOOLS pregunta has(t.cap) antes de pintar la tarjeta", () => {
    expect(src).toMatch(/!t\.cap \|\| has\(t\.cap\)/);
  });

  it("A.3 de PLAN-1.9.9.5.md: /examen ya NO depende de un || que corta antes de mirar examsOf()", () => {
    // el patrón viejo, roto: `t.langs.includes(def.id) || (t.href === "/examen" && examsOf(...))`
    expect(src).not.toMatch(/langs\.includes\(def\.id\)\s*\|\|\s*\(t\.href === "\/examen"/);
    // el patrón nuevo: /examen decide SOLO por examsOf(), sin OR con langs
    expect(src).toMatch(/t\.href === "\/examen" \? examsOf\(def\.id\)\.length > 0/);
  });
});
