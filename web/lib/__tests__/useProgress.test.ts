import { describe, expect, it } from "vitest";
import { courseOf } from "@/data/course";
import { nextLessonId } from "@/lib/useProgress";
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

describe("nextLessonId — PLAN 1.9.8 §5.1/§5.2", () => {
  it("§5.1 — placement B1 y cero lecciones: el botón manda a una lección del B1, no a la 1 del A1", () => {
    const st = stWithPlacement({}, { en: { placed: "b1", pct: 80, at: new Date().toISOString() } });
    const id = nextLessonId(st, "en");
    const b1Ids = new Set(courseOf("en").phases.filter((p) => p.level === "b1").flatMap((p) => p.lessons.map((l) => l.id)));
    expect(b1Ids.has(id ?? "")).toBe(true);
  });

  it("progreso solo en B1, sin placement: continuar en B1, no mandar al A1 vacío", () => {
    const b1 = courseOf("en").phases.filter((p) => p.level === "b1");
    const firstB1 = b1[0].lessons[0];
    const st = stWithPlacement({ [firstB1.id]: doneStat() });
    const id = nextLessonId(st, "en");
    const b1Ids = new Set(b1.flatMap((p) => p.lessons.map((l) => l.id)));
    expect(b1Ids.has(id ?? "")).toBe(true);
  });

  it("§5.2 — placement B1 aunque haya picado A1 (el candado antiguo no dejaba otra): manda el B1", () => {
    const a1Phases = courseOf("en").phases.filter((p) => p.level === "a1" || !p.level);
    const firstA1Lesson = a1Phases[0].lessons[0];
    const st = stWithPlacement(
      { [firstA1Lesson.id]: doneStat() },
      { en: { placed: "b1", pct: 80, at: new Date().toISOString() } },
    );
    const id = nextLessonId(st, "en");
    const b1Ids = new Set(courseOf("en").phases.filter((p) => p.level === "b1").flatMap((p) => p.lessons.map((l) => l.id)));
    expect(b1Ids.has(id ?? "")).toBe(true);
  });
});
