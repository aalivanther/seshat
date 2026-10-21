import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { Phase } from "@/lib/types";
import { courseOf } from "@/data/course";
import {
  addExercise,
  emptyStrandCounts,
  formatStrandLine,
  formatStrandReport,
  strandOf,
} from "../../scripts/hebras.mjs";

// P16. El porcentaje se puede calcular sin el validador entero: la puerta
// solo imprime estas filas y no las convierte en error. El curso real entra
// para comprobar que A1 y A2 no se quedan fuera de la cuenta.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

type StrandCounts = {
  input: number;
  output: number;
  forma: number;
  fluidez: number;
  otras: number;
  n: number;
  notas: number;
};

type StrandRow = StrandCounts & { id: string; level: string; lang: string };

function countsOf(types: string[]): StrandCounts {
  const counts: StrandCounts = emptyStrandCounts();
  for (const type of types) addExercise(counts, type);
  return counts;
}

function tallyPhase(phase: Phase): StrandCounts {
  const counts: StrandCounts = emptyStrandCounts();
  for (const lesson of phase.lessons) {
    for (const sec of lesson.sections) {
      for (const exercise of sec.exercises ?? []) addExercise(counts, exercise.type);
    }
  }
  return counts;
}

describe("P16 · porcentaje de hebras por módulo", () => {
  it("speak y shadow son output; fastmatch es la única fluidez del porcentaje", () => {
    expect(strandOf("speak")).toBe("output");
    expect(strandOf("shadow")).toBe("output");
    expect(strandOf("write")).toBe("output");
    expect(strandOf("monologue")).toBe("output");
    expect(strandOf("paraphrase")).toBe("output");
    expect(strandOf("fastmatch")).toBe("fluidez");
    expect(strandOf("read")).toBe("input");
    expect(strandOf("gapbank")).toBe("forma");
    expect(strandOf("errorfix")).toBe("forma");
    expect(strandOf("transform")).toBe("forma");
    expect(strandOf("bucket")).toBe("forma");
  });

  it("un ejercicio sin reloj no es fluidez, aunque sea material de repaso", () => {
    expect(strandOf("match")).toBeNull();
    expect(strandOf("cloze")).toBeNull();
    expect(strandOf("type")).toBeNull();
    expect(strandOf("audiomc")).toBeNull();
    expect(strandOf("mc")).toBeNull();
  });

  it("un módulo A1 se imprime con los cuatro porcentajes y no como fallo", () => {
    const line = formatStrandLine({
      id: "f0",
      level: "a1",
      lang: "de",
      ...countsOf(["mc", "speak", "shadow", "fastmatch", "read", "gapbank", "cloze"]),
    });
    expect(line).toBe(
      "hebras f0 a1 de: input 14.3% (1) · output 28.6% (2) · forma 14.3% (1) · fluidez 14.3% (1) · sin hebra 28.6% (2) · n=7 · notas=0",
    );
    expect(line).not.toMatch(/problema|falta|incompletas/);
  });

  it("un módulo sin ejercicios no divide por cero", () => {
    const line = formatStrandLine({ id: "vacio", level: "a2", lang: "en", ...emptyStrandCounts() });
    expect(line).toContain("input 0.0% (0)");
    expect(line).toContain("n=0");
    expect(line).not.toContain("NaN");
  });

  it("A1 y A2 del curso real entran en el informe, y la fluidez es solo fastmatch", () => {
    const rows: StrandRow[] = [];
    let fastmatch = 0;
    let outputEsperado = 0;
    const outputTipos = new Set(["write", "monologue", "paraphrase", "speak", "shadow"]);
    for (const lang of ["de", "en"]) {
      for (const phase of courseOf(lang).phases) {
        rows.push({ id: phase.id, level: phase.level ?? "a1", lang, ...tallyPhase(phase) });
        for (const lesson of phase.lessons) {
          for (const sec of lesson.sections) {
            for (const exercise of sec.exercises ?? []) {
              if (exercise.type === "fastmatch") fastmatch += 1;
              if (outputTipos.has(exercise.type)) outputEsperado += 1;
            }
          }
        }
      }
    }
    const report = formatStrandReport(rows);
    expect(report).toContain("no es un fallo");
    expect(report).toContain("hebras f0 a1 de:");
    expect(report).toContain("hebras a2m1 a2 de:");
    expect(report).toContain("hebras ena1m1 a1 en:");
    expect(rows.some((row) => row.level === "a1")).toBe(true);
    expect(rows.some((row) => row.level === "a2")).toBe(true);
    for (const row of rows) {
      expect(row.input + row.output + row.forma + row.fluidez + row.otras).toBe(row.n);
    }
    expect(rows.reduce((sum, row) => sum + row.fluidez, 0)).toBe(fastmatch);
    expect(rows.reduce((sum, row) => sum + row.output, 0)).toBe(outputEsperado);
  });

  it("el validador imprime la medición en todos los niveles y no la convierte en error", () => {
    const src = readFileSync(join(web, "scripts", "validate-content.mjs"), "utf8");
    expect(src).toContain("formatStrandReport(strandRows)");
    expect(src).toContain("addExercise(strandCounts, e.type)");
    expect(src).toContain("addLongNote(strandCounts)");
    expect(src).toContain('warnings.push(`${phase.id}: hebras de Nation incompletas');
    expect(src).not.toContain("problems.push(`${phase.id}: hebras");
    expect(src).not.toContain("la hebra que nadie cumple");
    expect(src).not.toContain("velocidad sobre material ya visto");
    const tallyAt = src.indexOf("addExercise(strandCounts, e.type)");
    const booleanAt = src.indexOf('const strands = ["b1", "b2"].includes(level)');
    expect(tallyAt).toBeGreaterThan(booleanAt);
    expect(src.slice(tallyAt - 80, tallyAt)).not.toContain("if (strands)");
  });
});
