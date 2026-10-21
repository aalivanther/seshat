import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { courseOf } from "@/data/course";
import { withCourseGenLock } from "./courseGenLock";

// PLAN-COMPOSICION.md §9.3 (T1, T2, T3) — la red de FASE 0 del BLOQUE A,
// escrita CONTRA EL SISTEMA DE HOY (el manifiesto y el resolvedor no existen
// todavía: nada más se toca en esta fase). El número de drop hace hoy el
// papel que hará el manifiesto mañana — son las mismas preguntas, sobre el
// mecanismo actual, para que quede una red antes de tocar nada.

const webRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const genScript = join(webRoot, "scripts", "gen-course.mjs");
const genOut = join(webRoot, "data", "course.gen.ts");

/** T1 — el resolvedor (hoy: gen-course.mjs) es determinista y reproducible.
 *  Sin esto ningún otro test vale: si generar dos veces el mismo drop diera
 *  dos resultados distintos, ni el diff byte a byte de F1/F2 del bloque A
 *  significaría nada. */
describe("T1 — gen-course.mjs es determinista", () => {
  it("generar el mismo drop dos veces produce course.gen.ts byte a byte idéntico", () => {
    withCourseGenLock(() => {
      execFileSync("node", [genScript, "7"], { cwd: webRoot });
      const first = readFileSync(genOut, "utf8");
      execFileSync("node", [genScript, "7"], { cwd: webRoot });
      const second = readFileSync(genOut, "utf8");
      expect(second).toBe(first);
      // el árbol de trabajo es drop 8 (B2); no dejar el 7 horneado
      execFileSync("node", [genScript, "8"], { cwd: webRoot });
    });
  }, 90_000);
});

/** T2 — ninguna referencia de itemIds queda sin resolver. Es el test que
 *  impide el modo de fallo de PLAN-COMPOSICION.md §2.5 (lección con menos
 *  frases, `filter(Boolean)`, silencio) y debe salir en VERDE hoy: hoy no
 *  hay referencias rotas (medido en el propio plan). Queda de red para
 *  cuando exista el cierre de vocabulario de verdad (fase 3 del bloque A). */
describe("T2 — ninguna referencia de itemIds queda sin resolver", () => {
  for (const lang of ["de", "en"]) {
    it(`${lang}: todo itemId de sections/exercises resuelve contra el vocabulario del idioma`, () => {
      const { phases, vocab } = courseOf(lang);
      const huerfanos: string[] = [];
      for (const p of phases) {
        for (const l of p.lessons) {
          for (const sec of l.sections) {
            for (const id of sec.itemIds ?? []) {
              if (!vocab[id]) huerfanos.push(`${l.id}/sección: ${id}`);
            }
            if (sec.nativo?.itemId && !vocab[sec.nativo.itemId]) {
              huerfanos.push(`${l.id}/nativo: ${sec.nativo.itemId}`);
            }
            for (const ex of sec.exercises ?? []) {
              for (const id of ex.itemIds ?? []) {
                if (!vocab[id]) huerfanos.push(`${ex.id}: ${id}`);
              }
            }
          }
        }
      }
      expect(huerfanos).toEqual([]);
    });
  }
});

/** T3 — los cortes que deben ser cerrados, lo son. Hoy el corte por idioma ya
 *  es estructural (`courses[lang].vocab` es un diccionario propio, nunca
 *  fusionado entre idiomas — PLAN-COMPOSICION.md §2.4), así que esto
 *  comprueba dos cosas: que sigue siendo así (0 referencias sin resolver
 *  dentro de su propio idioma, ya cubierto por T2) y que los ESPACIOS DE
 *  NOMBRES no colisionan entre idiomas — si un id de "en" resolviera por
 *  accidente contra el vocabulario "de", un futuro catálogo unificado podría
 *  fusionar por error algo que hoy vive separado sin que nadie lo note. */
describe("T3 — el corte por idioma es real, no solo de hoy por casualidad", () => {
  it("ningún itemId citado en un idioma resuelve por accidente en el vocabulario del otro", () => {
    const vocabDe = courseOf("de").vocab;
    const vocabEn = courseOf("en").vocab;
    const idsDe = new Set(Object.keys(vocabDe));
    const idsEn = new Set(Object.keys(vocabEn));
    const colisiones = [...idsDe].filter((id) => idsEn.has(id));
    expect(colisiones, `ids de vocabulario compartidos entre de/en: ${colisiones.join(", ")}`).toEqual([]);
  });
});
