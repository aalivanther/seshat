import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { courseOf } from "@/data/course";
import { CATALOG } from "../../content/catalog.mjs";

// PLAN 1.9.9 F0.5 — las dos tablas del drop cuadran.
//
// `LEVEL_MIN_DROP` (web/lib/drop.ts) dice "este nivel existe desde el drop N".
// El catálogo (web/content/catalog.mjs, PLAN-COMPOSICION FASE 1) dice "esta
// fase se publicó en el drop `since`". Son DOS fuentes mantenidas a mano por
// separado y hoy NADA las cruza — verificado: `lib/drop.ts` tiene cero
// referencias en `lib/__tests__/`. Si se desincronizan, un nivel de pago
// podría anunciarse disponible antes de que sus módulos hayan llegado al
// build.
//
// LEVEL_MIN_DROP no se exporta (es privado a drop.ts): se PARSEA de su código
// fuente, igual que ya hacía `scripts/validate-content.mjs` con las tablas
// viejas — mismo patrón ya aceptado en el repo, cero cambios de producción
// para poder escribir este test. El catálogo sí se importa: es público desde
// la 1.9.9.5.

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..");

/** Extrae un objeto literal `nombre ... = { ... }` de un fuente por conteo de
 *  llaves (no por AST): sirve para tablas privadas que no se exportan. */
function extractObjectLiteral(src: string, name: string): unknown {
  const at = src.indexOf(name);
  if (at === -1) throw new Error(`no encuentro "${name}" en el fuente`);
  const start = src.indexOf("{", at);
  if (start === -1) throw new Error(`"${name}": no encuentro "{" tras el nombre`);
  let depth = 0;
  let end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}" && --depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end === -1) throw new Error(`"${name}": las llaves no cierran`);
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  return new Function(`return ${src.slice(start, end)};`)();
}

const dropSrc = readFileSync(join(webRoot, "lib", "drop.ts"), "utf8");
const LEVEL_MIN_DROP = extractObjectLiteral(dropSrc, "LEVEL_MIN_DROP") as Record<string, number>;

/** drop en el que el catálogo publicó cada FASE REAL, por idioma. El catálogo
 *  guarda `id` = `Phase.id` (verificado en la extracción de FASE 1), así que
 *  el cruce ya no necesita el zip posicional de antes de la 1.9.9.5 — es una
 *  búsqueda directa por id. */
function phaseDropOf(lang: string, phaseId: string): number | undefined {
  return CATALOG.find((p) => p.kind === "module" && p.lang === lang && p.id === phaseId)?.since;
}

describe("PLAN 1.9.9 F0.5 — LEVEL_MIN_DROP y DROPS no se desincronizan", () => {
  const entries = Object.entries(LEVEL_MIN_DROP);

  it("hay algo que comprobar (si esto falla, LEVEL_MIN_DROP está vacío)", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  for (const [id, minDrop] of entries) {
    it(`${id}: anunciado desde el drop ${minDrop} → sus fases ya viajan en ese drop o antes`, () => {
      const dash = id.indexOf("-");
      const lang = id.slice(0, dash);
      const cefr = id.slice(dash + 1);
      const misFases = courseOf(lang).phases.filter((p) => (p.level ?? "a1") === cefr);
      expect(misFases.length, `${id}: ninguna fase real con level="${cefr}" en el curso de "${lang}"`).toBeGreaterThan(0);
      for (const fase of misFases) {
        const drop = phaseDropOf(lang, fase.id);
        expect(drop, `${id}: la fase "${fase.id}" no aparece en ningún drop de gen-course.mjs`).toBeDefined();
        expect(
          drop! <= minDrop,
          `${id} se anuncia desde el drop ${minDrop}, pero su fase "${fase.id}" no llega hasta el drop ${drop} — se anunciaría antes de traer sus módulos`,
        ).toBe(true);
      }
    });
  }
});
