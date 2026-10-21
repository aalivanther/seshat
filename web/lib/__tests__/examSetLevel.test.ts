import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { examsByLang, examsOf } from "@/data/exams";
import { levels } from "@/lib/levels";
import { CEFR_SCALE } from "@/lib/cefr";

// PLAN 1.9.9 F0.3 — todo simulacro declara un nivel que existe.
// El campo `ExamSet.level` ya está relleno; este test lo clava.
const KNOWN_CEFR = new Set<string>(CEFR_SCALE);

describe("PLAN 1.9.9 F0.3 — ExamSet.level existe y corresponde a un nivel real", () => {
  const cases = Object.entries(examsByLang).flatMap(([lang, sets]) =>
    sets.map((set) => ({ lang, set })),
  );

  it("hay simulacros que revisar (si esto falla, examsByLang está vacío: no hay nada que probar)", () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  it("F1 — A2 alemán tiene sus ExamSet Goethe (drop 8)", () => {
    expect(examsOf("de").filter((e) => e.level === "a2").length).toBeGreaterThanOrEqual(2);
  });

  it("F1 — el hub de nivel oculta el CTA si no hay ExamSet de ese CEFR", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "nivel", "[id]", "Client.tsx"),
      "utf8",
    );
    expect(src).toMatch(/if \(mine\.length === 0\) return null/);
  });

  for (const { lang, set } of cases) {
    it(`${lang}/${set.id}: declara un level válido y registrado`, () => {
      const level = (set as unknown as { level?: string }).level;
      expect(level, `ExamSet ${set.id} no declara "level"`).toBeTruthy();
      expect(KNOWN_CEFR.has(level as string), `"${level}" no es un cefr conocido`).toBe(true);
      const registrado = levels.some((lv) => lv.lang === lang && lv.cefr === level);
      expect(registrado, `ningún nivel ${lang}-${level} existe en el registro`).toBe(true);
    });
  }
});
