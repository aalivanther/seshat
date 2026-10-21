import { describe, expect, it, afterEach } from "vitest";
import { examResultId, isExamSimResult } from "@/lib/ids";
import { computeBadges } from "@/lib/achievements";
import { highestStartedCefr } from "@/lib/levels";
import { tMcForm } from "@/lib/reviewSession";
import { ENGLISH, GERMAN, setLangConfig } from "@/lib/language";
import { courseOf } from "@/data/course";
import { examsByLang } from "@/data/exams";
import type { ItemStat, LessonStat, ServerState, VocabItem } from "@/lib/types";

// Los "leaks de idioma": sitios donde la app multi-idioma seguía hablando de
// alemán aunque el alumno estudiara inglés. Cada test fija uno.

afterEach(() => setLangConfig(GERMAN)); // config global: dejarla como estaba

const st = (over: Partial<ServerState> = {}): ServerState => ({
  lessons: {}, items: {}, xp: 0, streakDays: 0, lastActive: "", ...over,
});
const done: LessonStat = {
  completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: new Date().toISOString(),
};
const seen: ItemStat = {
  correct: 1, wrong: 0, streak: 1, intervalDays: 1, nextReview: "", lastSeen: "",
};

describe("isExamSimResult reconoce los simulacros de TODOS los idiomas/niveles", () => {
  it("casa el A1 alemán histórico (ids pelados)", () => {
    expect(isExamSimResult("exam-sim-a")).toBe(true);
    expect(isExamSimResult("exam-sim-c")).toBe(true);
  });

  it("casa los prefijados: en-sim-* y b1-sim-* (antes NO, y la medalla Prüfling era inalcanzable)", () => {
    expect(isExamSimResult("exam-en-sim-a")).toBe(true);
    expect(isExamSimResult("exam-b1-sim-a")).toBe(true);
  });

  it("no casa otras claves de resultado", () => {
    for (const k of ["test-f0", "review", "entrevista", "entrevista-en", "reto-f0", "mission-f0"]) {
      expect(isExamSimResult(k)).toBe(false);
    }
  });

  it("las claves REALES de los sets de este build son todas reconocibles", () => {
    // Antes esto se comprobaba sobre literales que el propio test construía, así
    // que pasaba siempre: un set nuevo con otra forma de id (un simulacro del
    // inglés A2 o B1) rompía la medalla Prüfling sin que nadie se enterase. Se
    // leen los sets de VERDAD del build.
    const sets = Object.values(examsByLang).flat();
    expect(sets.length).toBeGreaterThan(0);
    for (const set of sets) {
      expect(isExamSimResult(examResultId(set.id)), `set "${set.id}"`).toBe(true);
    }
  });
});

describe("repaso: el enunciado nombra el idioma que estudias", () => {
  const mk = (id: string, target: string, source: string): VocabItem => ({ id, target, source });
  const others = [
    mk("o1", "one word", "una palabra"),
    mk("o2", "two words", "dos palabras"),
    mk("o3", "three words", "tres palabras"),
    mk("o4", "four words", "cuatro palabras"),
  ];

  it("en alemán dice «forma en alemán»", () => {
    setLangConfig(GERMAN);
    const ex = tMcForm(mk("v", "das Haus", "la casa"), others, "x");
    expect(ex?.prompt).toContain("alemán");
  });

  it("en inglés dice «forma en inglés» — nunca «alemana»", () => {
    setLangConfig(ENGLISH);
    const ex = tMcForm(mk("v", "the house", "la casa"), others, "x");
    expect(ex?.prompt).toContain("inglés");
    expect(ex?.prompt).not.toContain("alem");
  });
});

describe("medallas: cada expedición cuenta SU mochila", () => {
  const deItem = Object.keys(courseOf("de").vocab)[0];
  const enItem = Object.keys(courseOf("en").vocab)[0];
  const sammler = (bs: ReturnType<typeof computeBadges>) => bs.find((b) => b.id === "sammler")!;

  it("Sammler (alemana) no avanza con palabras inglesas", () => {
    const items = { [enItem]: seen };
    expect(sammler(computeBadges(st({ items }))).progress).toBe(0);
  });

  it("Sammler avanza con palabras alemanas", () => {
    const items = { [deItem]: seen };
    expect(sammler(computeBadges(st({ items }))).progress).toBeGreaterThan(0);
  });

  it("el inglés tiene su propia medalla de mochila", () => {
    const hoard = computeBadges(st()).find((b) => b.id === "en-word-hoard");
    expect(hoard).toBeDefined();
    expect(hoard!.lang).toBe("en");
  });

  it("cada medalla declara el idioma de su título (para lang= del HTML)", () => {
    const bs = computeBadges(st());
    expect(bs.find((b) => b.id === "gipfel")!.lang).toBe("de");
    expect(bs.find((b) => b.id === "en-first-steps")!.lang).toBe("en");
  });
});

describe("highestStartedCefr: el compañero de conversación sigue tu nivel", () => {
  it("sin progreso, el primer nivel disponible del idioma", () => {
    expect(highestStartedCefr("de", st())).toBe("a1");
    expect(highestStartedCefr("en", st())).toBe("a1");
  });

  it("con el simulacro de B1 aprobado, conversa en B1 (PLAN 1.9.9.5 B.2/B.4: una lección sola ya no basta)", () => {
    const b1 = courseOf("de").phases.find((p) => p.level === "b1");
    expect(b1, "este drop trae B1 alemán").toBeDefined();
    const b1Exam = examsByLang.de?.find((e) => e.level === "b1");
    expect(b1Exam, "este drop trae simulacro B1 alemán").toBeDefined();
    expect(highestStartedCefr("de", st({ lessons: { [examResultId(b1Exam!.id)]: done } }))).toBe("b1");
  });

  it("el progreso alemán no sube el nivel del inglés", () => {
    const b1 = courseOf("de").phases.find((p) => p.level === "b1");
    expect(b1).toBeDefined();
    expect(highestStartedCefr("en", st({ lessons: { [b1!.lessons[0].id]: done } }))).toBe("a1");
  });
});
