import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { interviewFor } from "@/app/entrevista/page";
import type { Cefr } from "@/lib/cefr";

// P32: la entrevista no puede volver a un solo archivo. El player no guarda
// los pools ni el baremo; si lo hace, esta prueba falla aunque el resto siga
// en verde.

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "entrevista");
const read = (name: string) => readFileSync(join(dir, name), "utf8");

const PARTITURAS: { file: string; marca: string; lang: string; cefr: Cefr; n: number }[] = [
  { file: "deA1.ts", marca: "Guten Tag! Wie heißen Sie?", lang: "de", cefr: "a1", n: 16 },
  { file: "enA1.ts", marca: "Hello! What's your name?", lang: "en", cefr: "a1", n: 16 },
  { file: "deA2.ts", marca: "Erzählen Sie: Was machen Sie beruflich?", lang: "de", cefr: "a2", n: 6 },
  { file: "deB1.ts", marca: "Karte: Flohmarkt", lang: "de", cefr: "b1", n: 4 },
  { file: "deB2.ts", marca: "Sollte der öffentliche Nahverkehr", lang: "de", cefr: "b2", n: 5 },
  { file: "enA2.ts", marca: "Where did you live last year?", lang: "en", cefr: "a2", n: 13 },
  { file: "enB1.ts", marca: "Some people prefer working from home", lang: "en", cefr: "b1", n: 8 },
  { file: "enB2.ts", marca: "Should a city keep libraries open after nine", lang: "en", cefr: "b2", n: 5 },
];

describe("P32 · la entrevista partida", () => {
  const page = read("page.tsx");
  const nota = read("nota.ts");
  const registro = read("registro.ts");

  it("el player no se queda los pools ni el baremo", () => {
    expect(page).toMatch(/export default function InterviewPage\b/);
    expect(page).toContain('from "./registro"');
    expect(page).toContain('from "./nota"');
    expect(page).not.toMatch(/function capOralPoints\b/);
    expect(page).not.toMatch(/function scoreOralSchema\b/);
    expect(page).not.toMatch(/function buildInterview/);
    expect(page).not.toMatch(/const T1_POOL\b/);
    expect(page).not.toMatch(/const EN_T1_POOL\b/);
    expect(page).not.toMatch(/const DE_B1_T1\b/);
    expect(page).not.toMatch(/grader: oralGradeSystem\(/);
    expect(page.split("\n").length).toBeLessThan(700);
    for (const { file, marca } of PARTITURAS) {
      expect(page, marca).not.toContain(marca);
      expect(registro, file).toContain(`from "./${file.replace(/\.ts$/, "")}"`);
    }
  });

  it("cada partitura trae sus textos y el arranque; el baremo, no", () => {
    expect(nota).toMatch(/export function capOralPoints\b/);
    expect(nota).toMatch(/export function scoreOralSchema\b/);
    expect(nota).not.toMatch(/function InterviewPage\b/);
    expect(nota).not.toContain("Guten Tag! Wie heißen Sie?");
    expect(registro).toMatch(/export function interviewFor\b/);
    expect(registro).not.toMatch(/function capOralPoints\b/);
    expect(registro).not.toMatch(/function buildInterview/);
    for (const { file, marca, lang, cefr, n } of PARTITURAS) {
      const src = read(file);
      expect(src, file).toContain(marca);
      expect(src, file).toMatch(/\bmodel:/);
      expect(src, file).not.toMatch(/oralGradeSystem|grader:/);
      expect(src, file).toMatch(/export function buildInterview/);
      expect(src, file).not.toMatch(/function capOralPoints\b/);
      expect(src, file).not.toMatch(/function InterviewPage\b/);
      const cfg = interviewFor(lang, cefr);
      expect(cfg, `${lang}-${cefr}`).not.toBeNull();
      expect(cfg!.build(), file).toHaveLength(n);
    }
  });

  it("un idioma sin partitura sigue en null y no recicla el A1", () => {
    expect(interviewFor("fr", "a1")).toBeNull();
    const de = interviewFor("de", "a1");
    expect(de?.resultId).toBe("entrevista");
  });
});
