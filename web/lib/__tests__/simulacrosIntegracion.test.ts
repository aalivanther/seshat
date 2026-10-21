import { describe, expect, it } from "vitest";
import { CATALOG } from "../../content/catalog.mjs";
import { barajaConstruccion } from "@/components/kinds/Build";
import { BUILT_DROP, courses } from "@/data/course";
import { examsByLang } from "@/data/exams";
import { examLevelOf } from "@/lib/examLevel";
import { scoreExam } from "@/lib/examScore";
import type { BuildExercise } from "@/lib/types";

/** Drop en el que entró cada simulacro. Es el contrato de la 2.0.4. */
const DESDE: Record<string, { lang: string; level: string; since: number }> = {
  "sim-a": { lang: "de", level: "a1", since: 1 },
  "sim-b": { lang: "de", level: "a1", since: 1 },
  "sim-c": { lang: "de", level: "a1", since: 1 },
  "en-sim-a": { lang: "en", level: "a1", since: 3 },
  "en-sim-b": { lang: "en", level: "a1", since: 3 },
  "b1-sim-a": { lang: "de", level: "b1", since: 5 },
  "en-a2-sim-a": { lang: "en", level: "a2", since: 6 },
  "en-a2-sim-b": { lang: "en", level: "a2", since: 6 },
  "en-a2-sim-c": { lang: "en", level: "a2", since: 6 },
  "en-b1-sim-a": { lang: "en", level: "b1", since: 7 },
  "en-b1-sim-b": { lang: "en", level: "b1", since: 7 },
  "en-b1-sim-c": { lang: "en", level: "b1", since: 7 },
  "b1-sim-b": { lang: "de", level: "b1", since: 8 },
  "a2-sim-a": { lang: "de", level: "a2", since: 8 },
  "a2-sim-b": { lang: "de", level: "a2", since: 8 },
  "b2-sim-a": { lang: "de", level: "b2", since: 8 },
  "b2-sim-b": { lang: "de", level: "b2", since: 8 },
  "en-b2-sim-a": { lang: "en", level: "b2", since: 8 },
  "en-b2-sim-b": { lang: "en", level: "b2", since: 8 },
};

/** El LCG de antes del cruce, para fijar que solo se toca la frase ya hecha. */
function lcgSinCruce(id: string, n: number): number[] {
  const idxs = Array.from({ length: n }, (_, i) => i);
  let seed = 0;
  for (const c of id) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs;
}

function fichasDe(ex: BuildExercise): string[] {
  return [...ex.target.replace(/[?.!,]/g, "").split(/\s+/), ...(ex.distractors ?? [])];
}

describe("simulacros: catálogo, versión y baremo", () => {
  const piezas = CATALOG.filter((p: { kind: string }) => p.kind === "exam") as {
    id: string; lang: string; level: string; since: number;
  }[];
  const vivos = Object.entries(examsByLang).flatMap(([lang, sets]) =>
    sets.map((set) => ({ lang, set })),
  );

  it("el drop 8 trae los 19 simulacros, cada uno desde su drop", () => {
    expect(BUILT_DROP).toBe(8);
    expect(Object.keys(DESDE)).toHaveLength(19);
    expect(piezas).toHaveLength(19);
    expect(vivos).toHaveLength(19);
    const ids = vivos.map((v) => v.set.id).sort();
    expect(ids).toEqual(Object.keys(DESDE).sort());
    expect(ids).toEqual(piezas.map((p) => p.id).sort());
    for (const pieza of piezas) {
      const contrato = DESDE[pieza.id];
      expect(contrato, pieza.id).toBeTruthy();
      expect(pieza.lang, pieza.id).toBe(contrato.lang);
      expect(pieza.level, pieza.id).toBe(contrato.level);
      expect(pieza.since, pieza.id).toBe(contrato.since);
      expect(pieza.since, pieza.id).toBeLessThanOrEqual(BUILT_DROP);
    }
  });

  it("cada versión declara el nivel del catálogo y el id no cae a A1 por error", () => {
    for (const { lang, set } of vivos) {
      const contrato = DESDE[set.id];
      expect(set.level, set.id).toBe(contrato.level);
      expect(lang, set.id).toBe(contrato.lang);
      expect(examLevelOf(set.id), set.id).toBe(set.level);
      expect(set.sections.map((s) => s.skill).length).toBeGreaterThan(0);
    }
  });

  it("un simulacro en blanco no aprueba, y el modular no compensa", () => {
    for (const { set } of vivos) {
      const r = scoreExam(set, {});
      expect(Number.isFinite(r.totalPct), set.id).toBe(true);
      expect(r.pass, set.id).toBe(false);
      expect(r.totalPct, set.id).toBeLessThan(set.scoring?.passPct ?? 60);
      if (set.scoring?.modular) {
        expect(r.allModulesPassed, set.id).toBe(false);
        expect(r.modules!.some((m) => m.pass), set.id).toBe(false);
        expect(r.weakestPct, set.id).toBeLessThan(set.scoring.passPct ?? 60);
        expect(r.split, set.id).toBeTruthy();
        expect(r.split!.objectivePct, set.id).toBe(0);
      }
    }
  });
});

describe("construcción: el azar es estable y no deja la frase hecha", () => {
  const builds: BuildExercise[] = [];
  for (const course of Object.values(courses)) {
    for (const phase of course.phases) {
      for (const lesson of phase.lessons) {
        for (const sec of lesson.sections) {
          for (const ex of sec.exercises ?? []) {
            if (ex.type === "build") builds.push(ex);
          }
        }
      }
    }
  }

  it("hay construcciones que revisar y ninguna id repetida", () => {
    expect(builds.length).toBeGreaterThan(100);
    const ids = builds.map((ex) => ex.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("el LCG que ya baraja no se vuelve a tocar, y el que deja la frase hecha cruza las dos primeras", () => {
    expect(lcgSinCruce("a2m3l2e4", 4)).toEqual([3, 0, 1, 2]);
    expect(barajaConstruccion("a2m3l2e4", 4)).toEqual([3, 0, 1, 2]);
    expect(lcgSinCruce("id209", 4)).toEqual([0, 1, 2, 3]);
    expect(barajaConstruccion("id209", 4)).toEqual([1, 0, 2, 3]);
    expect(barajaConstruccion("sola", 1)).toEqual([0]);
  });

  it("la misma ficha sale igual dos veces y otra ficha sale distinta", () => {
    const a = builds.find((ex) => fichasDe(ex).length > 3);
    expect(a).toBeTruthy();
    const n = fichasDe(a!).length;
    const orden = barajaConstruccion(a!.id, n);
    expect(barajaConstruccion(a!.id, n)).toEqual(orden);
    expect([...orden].sort((x, y) => x - y)).toEqual(Array.from({ length: n }, (_, i) => i));
    const otras = builds.filter((ex) => ex.id !== a!.id && fichasDe(ex).length === n);
    expect(otras.some((ex) => barajaConstruccion(ex.id, n).join() !== orden.join())).toBe(true);
  });

  it("con más de una ficha, ninguna construcción sale en el orden de la solución", () => {
    const hechas = builds.filter((ex) => {
      const n = fichasDe(ex).length;
      if (n < 2) return false;
      return barajaConstruccion(ex.id, n).every((v, i) => v === i);
    });
    expect(hechas.map((ex) => ex.id)).toEqual([]);
  });
});
