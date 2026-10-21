import { describe, expect, it } from "vitest";
import { buildModuleTest } from "@/lib/moduleTest";
import { course } from "@/data/course";
import type { Exercise, Phase } from "@/lib/types";

const PROD = new Set(["type", "transform", "paraphrase", "write"]);
const RECALL = new Set(["cloze", "build", "listen", "order", "bucket", "errorfix", "gapbank"]);

// módulo real con lecciones y ejercicios de sobra (f0 — Fundamento)
const phase = course.phases[1];

function phasePools(p: Phase) {
  const prod: Exercise[] = [];
  const recall: Exercise[] = [];
  for (const l of p.lessons) {
    for (const s of l.sections) {
      for (const ex of s.exercises ?? []) {
        if (PROD.has(ex.type)) prod.push(ex);
        else if (RECALL.has(ex.type)) recall.push(ex);
      }
    }
  }
  return { prod, recall };
}

const pools = phasePools(phase);
const phaseIds = new Set([...pools.prod, ...pools.recall].map((e) => e.id));

describe("buildModuleTest — invariantes en 20 corridas", () => {
  it("sanity: el módulo da para una prueba completa", () => {
    expect(pools.prod.length + pools.recall.length).toBeGreaterThanOrEqual(12);
  });

  const runs = Array.from({ length: 20 }, () => buildModuleTest(phase));

  it("devuelve exactamente 12 ejercicios", () => {
    for (const test of runs) expect(test).toHaveLength(12);
  });

  it("~60% producción: min(disponibles, ceil(12·0.6)) ejercicios type/transform", () => {
    const wantProd = Math.min(pools.prod.length, Math.ceil(12 * 0.6));
    for (const test of runs) {
      expect(test.filter((e) => PROD.has(e.type)).length).toBe(wantProd);
    }
  });

  it("sin ejercicios duplicados", () => {
    for (const test of runs) {
      expect(new Set(test.map((e) => e.id)).size).toBe(test.length);
    }
  });

  it("todos los ejercicios pertenecen a la fase dada", () => {
    for (const test of runs) {
      for (const e of test) expect(phaseIds.has(e.id), e.id).toBe(true);
    }
  });

  it("solo recuperación: nunca mc, match ni speak (re-estudio fuera)", () => {
    for (const test of runs) {
      for (const e of test) expect(PROD.has(e.type) || RECALL.has(e.type), e.type).toBe(true);
    }
  });
});

describe("buildModuleTest — tamaños y bordes", () => {
  it("respeta el parámetro size (6 → 6 ejercicios, ceil(3.6)=4 de producción)", () => {
    for (let i = 0; i < 20; i++) {
      const test = buildModuleTest(phase, 6);
      expect(test).toHaveLength(6);
      expect(test.filter((e) => PROD.has(e.type)).length).toBe(Math.min(pools.prod.length, 4));
    }
  });

  it("fase sin ejercicios ⇒ prueba vacía", () => {
    const empty: Phase = { id: "vacia", n: 0, title: "", goal: "", color: "#000", lessons: [] };
    expect(buildModuleTest(empty)).toEqual([]);
  });
});
