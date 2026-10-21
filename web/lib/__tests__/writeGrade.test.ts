import { describe, expect, it } from "vitest";
import { gradeWrite, writeWordCount } from "@/lib/writeGrade";
import { b2m1 } from "@/data/b2m1";
import type { WriteExercise } from "@/lib/types";

function writeOf(id: string): WriteExercise {
  for (const l of b2m1.lessons) {
    for (const s of l.sections) {
      for (const e of s.exercises ?? []) {
        if (e.id === id && e.type === "write") return e;
      }
    }
  }
  throw new Error(`write ${id} no está`);
}

const FORUM = writeOf("b2m1l8extra2");

const OFF_TOPIC =
  "Mein Hund Max und ich gehen jeden Morgen in den Park am See. " +
  "Wir kaufen Brot, wir werfen den Ball, wir trinken Wasser aus der Flasche. " +
  "Am Nachmittag kocht Nico Kartoffeln mit Salz und Butter, und Anna kommt nach der Schicht. " +
  "Leo liest auf dem Sofa, Sofía schreibt eine Nachricht an Lucía in Valencia, und Herr Vogel grüßt im Treppenhaus. " +
  "Abends sehen wir einen Film, ohne Streit, ohne Forum, ohne Presse, ohne Konjunktiv. " +
  "Der Park schließt um neun, der See bleibt still, der Hund schläft im Korb. " +
  "Morgen früh wieder: Leine, Park, Ball, Brot, Wasser, Kartoffeln, Film, Korb. " +
  "Das ist unser Tag in Berlin, und so bleibt er, Tag für Tag, ohne Schlagzeile und ohne Quelle. " +
  "Max wedelt, Nico salzt, Anna lacht, Leo blättert, Sofía tippt, Vogel nickt, der See liegt da. " +
  "Manchmal regnet es, dann bleiben wir im Flur und warten, bis die Tropfen aufhören. " +
  "Kein Mensch spricht von Titeln, von Quellen, von Portalen oder von Redaktionen.";

describe("write — off-topic = 0", () => {
  it("el tokenizer es trim + split (el de examScore)", () => {
    expect(writeWordCount("  eins   zwei  ")).toBe(2);
    expect(writeWordCount("")).toBe(0);
  });

  it("b2m1l8extra2: un texto in-range de otro tema no cubre ningún check → 0, no almost", () => {
    expect(writeWordCount(OFF_TOPIC)).toBeGreaterThanOrEqual(FORUM.minWords);
    expect(writeWordCount(OFF_TOPIC)).toBeLessThanOrEqual(FORUM.maxWords);
    const g = gradeWrite(FORUM, OFF_TOPIC);
    expect(g.okCount).toBe(0);
    expect(g.offTopic).toBe(true);
    expect(g.correct).toBe(false);
    expect(g.almost).toBe(false);
  });

  it("el modelo del foro sí cubre los checks y entra en rango", () => {
    const g = gradeWrite(FORUM, FORUM.model);
    expect(g.offTopic).toBe(false);
    expect(g.correct).toBe(true);
    expect(g.okCount).toBe(FORUM.checks.length);
  });
});
