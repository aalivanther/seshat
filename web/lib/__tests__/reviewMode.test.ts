import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { modeOf, modeOfExercise } from "@/lib/types";
import type { ExerciseType } from "@/lib/types";
import { courseOf } from "@/data/course";

// El SRS espacia distinto reconocer y producir (PLAN.md §6.1): reconocer no es
// saber (techo receptivo de 16 días) y fallar el test fácil informa MÁS.
// Este contrato lo fija el cliente al etiquetar cada resultado.

describe("modeOf", () => {
  it("los tipos donde solo se ELIGE son reconocimiento", () => {
    const recognize: ExerciseType[] = ["mc", "match", "fastmatch", "bucket", "hearreal", "audiomc"];
    for (const t of recognize) expect(modeOf(t), t).toBe("recognize");
  });

  it("los tipos donde el alumno ESCRIBE o construye son producción", () => {
    const produce: ExerciseType[] = ["type", "cloze", "build", "listen", "transform", "write"];
    for (const t of produce) expect(modeOf(t), t).toBe("produce");
  });

  it("shadow y speak son imitación, no producción libre: cuentan como reconocimiento", () => {
    // decisión consciente: repetir un modelo no demuestra recuperación activa,
    // y no debe levantar el techo receptivo del SRS
    expect(modeOf("shadow")).toBe("recognize");
    expect(modeOf("speak")).toBe("recognize");
  });

  it("el monólogo autocalificado tampoco levanta el techo: es una lista, no una producción", () => {
    expect(modeOf("monologue")).toBe("recognize");
  });

  it("un tipo desconocido cae en producción (el lado conservador)", () => {
    expect(modeOf("tipo-inventado" as ExerciseType)).toBe("produce");
  });
});

describe("F9 — audiomc no levanta el techo de producción", () => {
  it("saltar un ejercicio usa modeOfExercise, no produce a ciegas", () => {
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "LessonPlayer.tsx"), "utf8");
    expect(src).toMatch(/mode: modeOfExercise\(exercise\)/);
    expect(src).not.toMatch(/onSkip\(\)[\s\S]{0,200}mode: "produce"/);
  });

  it("ningún audiomc del curso viaja como produce (ni por type ni por override)", () => {
    let total = 0;
    let audiomc = 0;
    for (const lang of ["de", "en"]) {
      for (const p of courseOf(lang).phases) {
        for (const l of p.lessons) {
          for (const s of l.sections) {
            for (const e of s.exercises ?? []) {
              total += 1;
              if (e.type === "audiomc") {
                audiomc += 1;
                expect(modeOfExercise(e), `${l.id}/${e.id}`).toBe("recognize");
                expect(e.mode, `${l.id}/${e.id} mode produce colgado`).not.toBe("produce");
              }
            }
          }
        }
      }
    }
    expect(total, "el censo recorre el curso, no un fixture de 3 kinds").toBeGreaterThan(7000);
    expect(audiomc).toBeGreaterThan(10);
  });

  it("reto y lección no fuerzan produce al saltar", () => {
    const reto = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "reto", "[id]", "Client.tsx"), "utf8");
    expect(reto).toMatch(/modeOfExercise\(run\.current/);
    expect(reto).not.toMatch(/onSkip\(\)[\s\S]{0,240}mode: "produce"/);
  });
});
