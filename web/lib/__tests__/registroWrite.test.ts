import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { b1m1 } from "@/data/b1m1";
import { b1m8 } from "@/data/b1m8";
import type { Phase, WriteExercise } from "@/lib/types";
import { gradeWrite, NOTA_SIN_REGISTRO, writePassFeedback, writeWordCount } from "@/lib/writeGrade";

// P38: el validador exige el registro al modelo. La nota del alumno sigue
// siendo el regex y el rango: un texto de otro registro que cubre las
// funciones no baja, y la pantalla no llama a esa nota como la del examen.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function writeOf(phase: Phase, id: string): WriteExercise {
  for (const l of phase.lessons) {
    for (const s of l.sections) {
      for (const e of s.exercises ?? []) {
        if (e.id === id && e.type === "write") return e;
      }
    }
  }
  throw new Error(`write ${id} no está`);
}

const CARTA_DU = writeOf(b1m1, "b1m1l8e10");
const CARTA_SIE = writeOf(b1m8, "b1m8l4e12");

describe("P38 — el registro no entra en la nota del write", () => {
  it("un correo de tú escrito de usted sigue contando como bien si cubre las funciones", () => {
    const deUsted = CARTA_DU.model
      .replace("Hast du Zeit?", "Haben Sie Zeit?")
      .replace("wenn du kommen", "wenn Sie kommen");
    expect(deUsted).toMatch(/wenn Sie kommen/);
    expect(deUsted).not.toMatch(/(^|[^\p{L}])du(?![\p{L}])/u);
    expect(writeWordCount(deUsted)).toBe(writeWordCount(CARTA_DU.model));
    const bien = gradeWrite(CARTA_DU, CARTA_DU.model);
    const otro = gradeWrite(CARTA_DU, deUsted);
    expect(bien.correct).toBe(true);
    expect(otro.correct).toBe(true);
    expect(otro.okCount).toBe(CARTA_DU.checks.length);
    expect(otro.almost).toBe(false);
  });

  it("una fuga de tú en un correo de usted no baja la nota si los checks pasan", () => {
    const conDu = CARTA_SIE.model.replace("schriftlich", "du");
    expect(conDu).toMatch(/(^|[^\p{L}])du(?![\p{L}])/u);
    expect(writeWordCount(conDu)).toBe(writeWordCount(CARTA_SIE.model));
    const bien = gradeWrite(CARTA_SIE, CARTA_SIE.model);
    const fuga = gradeWrite(CARTA_SIE, conDu);
    expect(bien.correct).toBe(true);
    expect(fuga.correct).toBe(true);
    expect(fuga.okCount).toBe(CARTA_SIE.checks.length);
  });

  it("la nota no se llama como la del examen cuando el registro no entra", () => {
    const base = { puntos: 3, palabras: 40, conectores: null };
    expect(writePassFeedback({ ...base, pideRegistro: false, hayRubrica: false }))
      .toContain("Así se puntúa en el examen.");
    const conRubrica = writePassFeedback({ ...base, pideRegistro: true, hayRubrica: true });
    expect(conRubrica).toContain("Aquí eso cuenta como bien.");
    expect(conRubrica).not.toContain("Así se puntúa en el examen");
    const sinRubrica = writePassFeedback({ ...base, pideRegistro: true, hayRubrica: false });
    expect(sinRubrica).toContain(NOTA_SIN_REGISTRO);
    expect(sinRubrica).not.toContain("Así se puntúa en el examen");
    const pocos = writePassFeedback({
      ...base,
      pideRegistro: true,
      hayRubrica: false,
      conectores: { min: 3, usados: 1, criterio: "Kohärenz" },
    });
    expect(pocos).toContain("Aquí cuenta como bien");
    expect(pocos).toContain("Kohärenz puntúa aparte");
    expect(pocos).toContain(NOTA_SIN_REGISTRO);
    expect(NOTA_SIN_REGISTRO).toBe(
      "Esta nota no incluye el registro: en el examen sí puntúa, y aquí lo comparas tú con el modelo.",
    );
  });

  it("la frase va junto a la rúbrica y el acierto sigue saliendo de gradeWrite", () => {
    const src = readFileSync(join(web, "components", "kinds", "Write.tsx"), "utf8");
    const rúbrica = src.slice(src.indexOf("writeRubricHead"), src.indexOf("ex.rubric.map"));
    expect(rúbrica).toContain("NOTA_SIN_REGISTRO");
    expect(rúbrica).not.toContain("ex.rubric.map");
    const check = src.slice(src.indexOf("function check()"), src.indexOf("function aplicarEspera"));
    expect(check).toContain("gradeWrite(ex, text)");
    expect(check).toContain("correct: allOk");
    expect(check).toContain("allOk = g.correct");
    expect(check).not.toMatch(/registerLeaks|registerNeeds/);
    const nota = readFileSync(join(web, "lib", "writeGrade.ts"), "utf8");
    const cuerpo = nota.slice(nota.indexOf("export function gradeWrite"));
    expect(cuerpo).not.toMatch(/\.register\b|registerLeaks|pideRegistro/);
  });
});
