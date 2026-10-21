import { describe, expect, it } from "vitest";
import { courseOf } from "@/data/course";
import { examsOf } from "@/data/exams";
import { courseCeiling, highestAvailableUpTo, highestStartedCefr, LEVEL_STARTED_THRESHOLD, levels } from "@/lib/levels";
import { DROP } from "@/lib/drop";
import { cefrRank } from "@/lib/cefr";
import { courses } from "@/data/course";
import { LEVEL_MIN_DROP } from "@/lib/drop";
import { withMutateCatalogLock } from "./mutateCatalogLock";
import { examResultId, testId } from "@/lib/ids";
import type { LessonStat, ServerState } from "@/lib/types";

const doneStat = (): LessonStat => ({
  completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: new Date().toISOString(),
});

/** ServerState con colocación — cast porque `placement` aún no existe en el
    tipo (llega en el paso 3 del plan): el test debe poder escribirse antes. */
function stWithPlacement(
  lessons: Record<string, LessonStat>,
  placement?: Record<string, { placed: string; pct: number; at: string }>,
): ServerState {
  return { lessons, items: {}, xp: 0, streakDays: 0, lastActive: "", placement } as ServerState;
}

describe("highestStartedCefr — PLAN 1.9.8 §5.5/§5.6", () => {
  it("§5.5 — placement B1 y cero lecciones: la tutora habla en B1, no en A1", () => {
    const st = stWithPlacement({}, { en: { placed: "b1", pct: 75, at: new Date().toISOString() } });
    expect(highestStartedCefr("en", st)).toBe("b1");
  });

  it("§5.6 — placement A2 pero el B1 ya empezado de verdad (por encima del umbral): gana el mayor de los dos", () => {
    // PLAN 1.9.9.5 B.4: desde el umbral, "empezado de verdad" ya no es una
    // sola lección — aquí se certifica con el simulacro del nivel (B.2).
    const b1Exam = examsOf("en").find((e) => e.level === "b1")!;
    const st = stWithPlacement(
      { [examResultId(b1Exam.id)]: doneStat() },
      { en: { placed: "a2", pct: 60, at: new Date().toISOString() } },
    );
    expect(highestStartedCefr("en", st)).toBe("b1");
  });
});

describe("highestStartedCefr — PLAN 1.9.9.5 B.2/B.4 (el nivel es el que de verdad has empezado)", () => {
  it("B.4 — una sola lección NO basta: hace falta un umbral real", () => {
    const b1Phase = courseOf("en").phases.find((p) => p.level === "b1")!;
    const st = stWithPlacement({ [b1Phase.lessons[0].id]: doneStat() });
    expect(highestStartedCefr("en", st)).not.toBe("b1");
  });

  it("B.4 — con el 25% de las lecciones del nivel hechas, sí arranca", () => {
    const b1Lessons = courseOf("en").phases.filter((p) => p.level === "b1").flatMap((p) => p.lessons);
    const cuarto = Math.ceil(b1Lessons.length * 0.25);
    const lessons: Record<string, LessonStat> = {};
    for (const l of b1Lessons.slice(0, cuarto)) lessons[l.id] = doneStat();
    expect(highestStartedCefr("en", stWithPlacement(lessons))).toBe("b1");
  });

  it("B.2 — aprobar el simulacro del nivel cuenta, aunque no haya ninguna lección hecha", () => {
    const b1Exam = examsOf("en").find((e) => e.level === "b1")!;
    const st = stWithPlacement({ [examResultId(b1Exam.id)]: doneStat() });
    expect(highestStartedCefr("en", st)).toBe("b1");
  });

  it("B.2 — aprobar pruebas de módulo cuenta el módulo ENTERO, sin marcar ninguna lección suelta", () => {
    // 3 módulos de 10 lecciones cada uno = 30/120 = 25%, sin tocar `lessons`
    const b1Phases = courseOf("en").phases.filter((p) => p.level === "b1");
    const lessons: Record<string, LessonStat> = {};
    for (const p of b1Phases.slice(0, 3)) lessons[testId(p.id)] = doneStat();
    expect(highestStartedCefr("en", stWithPlacement(lessons))).toBe("b1");
  });

  it("T12 — por debajo del umbral no sube; al cruzarlo sí (decisión 16-09-2026: 20 %)", () => {
    expect(LEVEL_STARTED_THRESHOLD).toBe(0.2);
    const a2Lessons = courseOf("en").phases.filter((p) => p.level === "a2").flatMap((p) => p.lessons);
    const n = a2Lessons.length;
    const below = Math.max(1, Math.floor(n * 0.19));
    const above = Math.ceil(n * 0.21);
    const mk = (k: number) => {
      const lessons: Record<string, LessonStat> = {};
      for (const l of a2Lessons.slice(0, k)) lessons[l.id] = doneStat();
      return stWithPlacement(lessons);
    };
    expect(highestStartedCefr("en", mk(below))).not.toBe("a2");
    expect(highestStartedCefr("en", mk(above))).toBe("a2");
  });

  it("B.2 — misión y reto NO cuentan (decisión del dueño: son práctica, no acreditación)", () => {
    const b1Phase = courseOf("en").phases.find((p) => p.level === "b1")!;
    const st = stWithPlacement({
      [`mission-${b1Phase.id}`]: doneStat(),
      [`reto-${b1Phase.id}`]: doneStat(),
    });
    expect(highestStartedCefr("en", st)).not.toBe("b1");
  });
});

describe("courseCeiling — V4 techo = max available de ESTE build", () => {
  it("el techo es el máximo ready de este build (B2 si el drop lo trae)", () => {
    const techo = DROP >= 8 ? "b2" : "b1";
    expect(courseCeiling("de")).toBe(techo);
    expect(courseCeiling("en")).toBe(techo);
  });

  it("un idioma sin niveles no inventa B1", () => {
    expect(courseCeiling("zz")).toBe("a1");
  });

  it("available:true a pelo no sube el techo: hace falta drop Y fases", () => {
    withMutateCatalogLock(() => {
      const id = "de-c1-fake";
      levels.push({
        id, lang: "de", cefr: "c1", rank: cefrRank("c1"),
        name: "C1", title: "C1 fantasma", desc: "", goal: "", available: true,
      });
      try {
        const techo = courseCeiling("de");
        expect(techo).not.toBe("c1");
        expect(highestAvailableUpTo("de", "c1")?.cefr).toBe(techo);
      } finally {
        const i = levels.findIndex((l) => l.id === id);
        if (i !== -1) levels.splice(i, 1);
      }
    });
  });

  it("con drop y fases B2 el techo sube; al retirar el fixture vuelve a B1", () => {
    withMutateCatalogLock(() => {
      const id = "de-b2-ceiling";
      const prevMin = LEVEL_MIN_DROP["de-b2"];
      LEVEL_MIN_DROP["de-b2"] = 7;
      levels.push({
        id, lang: "de", cefr: "b2", rank: cefrRank("b2"),
        name: "B2", title: "B2 sintético", desc: "", goal: "", available: false,
      });
      courses.de.phases.push({
        id: "b2m1-ceiling", level: "b2", n: 1, title: "x", goal: "", color: "#000",
        lessons: [{ id: "b2m1-ceiling-l1", phaseId: "b2m1-ceiling", title: "x", subtitle: "", minutes: 1, sections: [] }],
      });
      try {
        expect(courseCeiling("de")).toBe("b2");
        expect(highestAvailableUpTo("de", "a1")?.cefr).toBe("a1");
      } finally {
        if (prevMin === undefined) delete LEVEL_MIN_DROP["de-b2"];
        else LEVEL_MIN_DROP["de-b2"] = prevMin;
        const li = levels.findIndex((l) => l.id === id);
        if (li !== -1) levels.splice(li, 1);
        const pi = courses.de.phases.findIndex((p) => p.id === "b2m1-ceiling");
        if (pi !== -1) courses.de.phases.splice(pi, 1);
      }
    });
    const hasRealB2 = courseOf("de").phases.some((p) => (p.level ?? "a1") === "b2");
    expect(courseCeiling("de")).toBe(hasRealB2 ? "b2" : "b1");
    expect(LEVEL_MIN_DROP["de-b2"]).toBe(8);
  });
});
