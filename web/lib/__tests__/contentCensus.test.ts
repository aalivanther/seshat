import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { courseOf } from "@/data/course";
import { CATALOG } from "../../content/catalog.mjs";

// Censo del drop 7. El 7202 de AUDITORIA-ACOPLAMIENTO era el experimento
// con un b2m1 insertado (73 fases · 613 lecciones). Este build no tiene B2:
// 72 fases. Si el número baja, un módulo se truncó o se skipó un test.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function walkExercises(): { total: number; audiomc: number } {
  let total = 0;
  let audiomc = 0;
  for (const lang of ["de", "en"]) {
    for (const p of courseOf(lang).phases) {
      for (const l of p.lessons) {
        for (const s of l.sections) {
          for (const e of s.exercises ?? []) {
            total += 1;
            if (e.type === "audiomc") audiomc += 1;
          }
        }
      }
    }
  }
  return { total, audiomc };
}

describe("censo drop 8 — A1–B2 de ambos idiomas", () => {
  it("el curso empaquetado tiene las 96 fases y no se ha truncado un módulo", () => {
    const mods = CATALOG.filter((p: { kind: string }) => p.kind === "module");
    expect(mods).toHaveLength(96);
    const { total } = walkExercises();
    expect(total).toBeGreaterThanOrEqual(9087);
  });

  it("el build de los dos idiomas declara 10 libretas; referencia no importa verbs.ts a pelo", () => {
    const refs = CATALOG.filter((p: { kind: string }) => p.kind === "reference");
    expect(refs).toHaveLength(10);
    const dir = join(web, "app", "referencia");
    const src = readdirSync(dir)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => readFileSync(join(dir, f), "utf8"))
      .join("\n");
    expect(src).toMatch(/refModules\.verbs/);
    expect(src).not.toMatch(/import\s+\{[^}]*verbs[^}]*\}\s+from\s+["']@\/data\/verbs["']/);
    expect(src).toMatch(/import type \{ VerbEntry \} from ["']@\/data\/verbs["']/);
  });
});
