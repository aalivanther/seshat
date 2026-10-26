import { afterEach, describe, expect, it, vi } from "vitest";
import { course } from "@/data/course";
import {
  buildRetoDeck, pickNext, mulberry32, retoMedal, tramoOf, RETO_SIZE, RETO_LIVES,
} from "@/lib/retoRun";
import { retoSourceFor } from "@/lib/contentSlices";
import type { LessonStat, ServerState } from "@/lib/types";

// Contrato del motor de retos (PLAN.md § RETOS):
// - speak/shadow JAMÁS en la run (autoevaluados no cuestan vidas con justicia);
// - sin pistas dentro de la run;
// - el hueco 10 SIEMPRE producción escrita (type/transform);
// - muestreo sin reemplazo;
// - medallas computadas del bestScore (bronce ≥80 · plata ≥90 · oro 100).

afterEach(() => vi.unstubAllGlobals());

function stWith(lessons: Record<string, LessonStat>): ServerState {
  return { lessons, items: {}, xp: 0, streakDays: 0, lastActive: "" };
}

// un módulo alemán real con pool amplio (tercera fase = módulo con ejercicios)
const phase = course.phases[2];

describe("mulberry32", () => {
  it("misma semilla → misma secuencia (runs reproducibles)", () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("semillas distintas → secuencias distintas", () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});

describe("tramoOf", () => {
  it("1-3 calienta, 4-7 núcleo, 8-10 cumbre (0-based)", () => {
    expect([0, 1, 2].map(tramoOf)).toEqual([0, 0, 0]);
    expect([3, 4, 5, 6].map(tramoOf)).toEqual([1, 1, 1, 1]);
    expect([7, 8, 9].map(tramoOf)).toEqual([2, 2, 2]);
  });
});

describe("buildRetoDeck", () => {
  const deck = buildRetoDeck(phase, null, true, 1234, retoSourceFor(phase.id));

  it("ningún candidato es speak ni shadow, en ningún tramo", () => {
    for (const tramo of deck.tramos) {
      for (const c of tramo) {
        expect(["speak", "shadow"]).not.toContain(c.ex.type);
      }
    }
  });

  it("los candidatos van sin pistas (recuperación a una bala)", () => {
    for (const tramo of deck.tramos) {
      for (const c of tramo) expect(c.ex.hints ?? []).toHaveLength(0);
    }
  });

  it("el pool final es solo producción escrita (type/transform)", () => {
    expect(deck.final.length).toBeGreaterThan(0);
    for (const c of deck.final) {
      expect(["type", "transform"]).toContain(c.ex.type);
    }
  });

  it("cada tramo tiene pool suficiente para una run", () => {
    expect(deck.tramos[0].length).toBeGreaterThanOrEqual(3);
    expect(deck.tramos[1].length).toBeGreaterThanOrEqual(4);
    expect(deck.tramos[2].length).toBeGreaterThanOrEqual(3);
  });

  it("misma semilla → mismo mazo (ids idénticos)", () => {
    const deck2 = buildRetoDeck(phase, null, true, 1234, retoSourceFor(phase.id));
    expect(deck2.tramos.map((t) => t.map((c) => c.ex.id))).toEqual(
      deck.tramos.map((t) => t.map((c) => c.ex.id)),
    );
  });

  it("p(éxito) de todo candidato vive en [0.2, 0.97]", () => {
    for (const tramo of deck.tramos) {
      for (const c of tramo) {
        expect(c.p).toBeGreaterThanOrEqual(0.2);
        expect(c.p).toBeLessThanOrEqual(0.97);
      }
    }
  });
});

describe("pickNext", () => {
  it("una run entera: 10 ejercicios sin repetir y cierre en type/transform", () => {
    const deck = buildRetoDeck(phase, null, true, 99, retoSourceFor(phase.id));
    const rng = mulberry32(99);
    const used = new Set<string>();
    const run: string[] = [];
    let lives = RETO_LIVES;
    for (let slot = 0; slot < RETO_SIZE; slot++) {
      const ex = pickNext(deck, slot, lives, used, rng);
      expect(ex).not.toBeNull();
      expect(used.has(ex!.id)).toBe(false);
      used.add(ex!.id);
      run.push(ex!.id);
      if (slot === 2) lives = 2; // simula perder vidas a mitad de run
      if (slot === RETO_SIZE - 1) {
        expect(["type", "transform"]).toContain(ex!.type);
      }
    }
    expect(new Set(run).size).toBe(RETO_SIZE);
  });

  it("dos semillas → runs distintas (rejugabilidad)", () => {
    const runOf = (seed: number) => {
      const deck = buildRetoDeck(phase, null, true, seed, retoSourceFor(phase.id));
      const rng = mulberry32(seed);
      const used = new Set<string>();
      const ids: string[] = [];
      for (let slot = 0; slot < RETO_SIZE; slot++) {
        const ex = pickNext(deck, slot, 3, used, rng);
        if (!ex) break;
        used.add(ex.id);
        ids.push(ex.id);
      }
      return ids.join("|");
    };
    expect(runOf(7)).not.toBe(runOf(4242));
  });
});

describe("retoMedal", () => {
  const statOf = (best: number): LessonStat => ({
    completed: true, bestScore: best, lastScore: best, attempts: 1, lastAt: "",
  });

  it("umbrales: 100 oro · ≥90 plata · ≥80 bronce · <80 nada", () => {
    expect(retoMedal(stWith({ "reto-x": statOf(1) }), "x")).toBe("oro");
    expect(retoMedal(stWith({ "reto-x": statOf(0.9) }), "x")).toBe("plata");
    expect(retoMedal(stWith({ "reto-x": statOf(0.8) }), "x")).toBe("bronce");
    expect(retoMedal(stWith({ "reto-x": statOf(0.7) }), "x")).toBe(null);
  });

  it("sin resultado de reto → sin medalla (y sin explotar)", () => {
    expect(retoMedal(stWith({}), "x")).toBe(null);
    expect(retoMedal(null, "x")).toBe(null);
  });
});
