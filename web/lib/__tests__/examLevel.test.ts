import { describe, expect, it } from "vitest";
import { examLevelOf } from "@/lib/examLevel";
import { isCefr, type Cefr } from "@/lib/cefr";

describe("examLevelOf — cierre previo al B2 §1.2 / T6", () => {
  it("el A1 alemán histórico (sim-a) sigue siendo a1", () => {
    expect(examLevelOf("sim-a")).toBe("a1");
    expect(examLevelOf("sim-b")).toBe("a1");
    expect(examLevelOf("sim-c")).toBe("a1");
  });

  it("b2-sim-a, b2-sim-b y en-b2-sim-a son B2, no A1", () => {
    expect(examLevelOf("b2-sim-a")).toBe("b2");
    expect(examLevelOf("b2-sim-b")).toBe("b2");
    expect(examLevelOf("en-b2-sim-a")).toBe("b2");
  });

  it("los ids publicados de A2/B1 no se rompen", () => {
    expect(examLevelOf("en-a2-sim-a")).toBe("a2");
    expect(examLevelOf("en-b1-sim-c")).toBe("b1");
    expect(examLevelOf("b1-sim-a")).toBe("b1");
    expect(examLevelOf("b1-sim-b")).toBe("b1");
    expect(examLevelOf("en-sim-a")).toBe("a1");
  });

  it("V9 — Cefr público de cefr.ts acepta b2", () => {
    const x: Cefr = "b2";
    expect(isCefr(x)).toBe(true);
    expect(isCefr("b2")).toBe(true);
  });

  it("id vacío o ausente no lanza: cae a a1", () => {
    expect(examLevelOf("")).toBe("a1");
    expect(examLevelOf(null)).toBe("a1");
    expect(examLevelOf(undefined)).toBe("a1");
  });
});
