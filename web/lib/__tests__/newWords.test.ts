import { describe, expect, it } from "vitest";
import { newWordsIn } from "@/lib/newWords";
import { course } from "@/data/course";
import type { Exercise } from "@/lib/types";

// f0l1 es la primera lección "real" (fase Fundamento): presenta hallo, tschuess,
// aufwiedersehen, bisspaeter, ichheisse, wieheisstdu — buen punto de corte para
// probar qué se considera "conocido hasta aquí".
const LESSON = "f0l1";

function typeEx(answers: string[], question = "Di en alemán: la frase"): Exercise {
  return { id: "syn-1", type: "type", prompt: "Traduce", question, answers };
}

describe("newWordsIn", () => {
  it("palabra inventada («Quixotisch») en una lección real: se detecta como nueva", () => {
    expect(newWordsIn(typeEx(["Quixotisch"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("palabras GLUE («und») no se marcan; las presentadas en la lección tampoco", () => {
    // hallo se presenta en f0l1; und es pegamento → solo la inventada es nueva
    expect(newWordsIn(typeEx(["Quixotisch und Hallo"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("palabra presentada en la propia lección no es nueva", () => {
    expect(newWordsIn(typeEx(["Hallo"]), LESSON)).toEqual([]);
  });

  it("palabra presentada ANTES sigue conocida en lecciones posteriores", () => {
    const laterLesson = course.phases[1].lessons[course.phases[1].lessons.length - 1].id;
    expect(newWordsIn(typeEx(["Tschüss"]), laterLesson)).toEqual([]);
  });

  it("nombre propio que aparece en el español del ejercicio no cuenta (Mexiko ~ México)", () => {
    expect(newWordsIn(typeEx(["Mexiko"], "Di en alemán: Vengo de México"), LESSON)).toEqual([]);
  });

  it("palabra inventada en minúscula sí se marca (sin trato de nombre propio)", () => {
    expect(newWordsIn(typeEx(["blorfig"]), LESSON)).toEqual(["blorfig"]);
  });

  it("tope de 3 palabras nuevas por ejercicio", () => {
    const ex = typeEx(["Quixotisch Blarfweg Zumpfkraft Wibbelwapp"]);
    expect(newWordsIn(ex, LESSON)).toHaveLength(3);
  });

  it("la misma palabra repetida se reporta una sola vez", () => {
    expect(newWordsIn(typeEx(["Quixotisch Quixotisch"]), LESSON)).toEqual(["Quixotisch"]);
  });

  it("lessonId desconocido → sin avisos (no hay mapa para juzgar)", () => {
    expect(newWordsIn(typeEx(["Quixotisch"]), "no-such-lesson")).toEqual([]);
  });

  it("en cloze se evalúa la frase con el hueco relleno", () => {
    const ex: Exercise = {
      id: "syn-cloze", type: "cloze", prompt: "Completa",
      text: "Hallo, ich ___ Quixotisch", answers: ["heiße"],
      // ojo: la palabra inventada NO puede aparecer en el español del ejercicio
      // (activaría la supresión de nombres propios que prueba otro caso)
      translation: "Hola, me llamo…",
    };
    // heiße se presenta en f0l1 (ichheisse); la inventada es la única nueva
    const out = newWordsIn(ex, LESSON);
    expect(out).toContain("Quixotisch");
    expect(out).not.toContain("heiße");
  });
});
