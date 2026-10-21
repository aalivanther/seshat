import { describe, expect, it, vi } from "vitest";
import { CERT_DAYS, computeBadges, examReadiness, moduleCert } from "@/lib/achievements";
import { course, courses, courseOf } from "@/data/course";
import { examResultId } from "@/lib/ids";
import type { Course, Lesson, LessonStat, Phase, ServerState } from "@/lib/types";

const DAY = 86_400_000;
const daysAgo = (n: number) => new Date(Date.now() - n * DAY).toISOString();

function ls(over: Partial<LessonStat> = {}): LessonStat {
  return { completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: daysAgo(0), ...over };
}

function stWith(lessons: Record<string, LessonStat>): ServerState {
  return { lessons, items: {}, xp: 0, streakDays: 0, lastActive: "" };
}

// módulo real con lecciones (f0 — Fundamento)
const phase = course.phases[1];
const TEST_KEY = `test-${phase.id}`;

const allLessonsDone = () =>
  Object.fromEntries(phase.lessons.map((l) => [l.id, ls()]));

describe("moduleCert", () => {
  it("todas las lecciones + prueba ≥80% recién aprobada ⇒ earned y valid", () => {
    const st = stWith({ ...allLessonsDone(), [TEST_KEY]: ls({ bestScore: 0.85, lastScore: 0.85 }) });
    const c = moduleCert(phase, st);
    expect(c.earned).toBe(true);
    expect(c.valid).toBe(true);
    expect(c.score).toBe(85);
    expect(c.validUntil).not.toBeNull();
  });

  it("aprobada hace 29 días: todavía vigente (ventana de 30)", () => {
    const st = stWith({
      ...allLessonsDone(),
      [TEST_KEY]: ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(29) }),
    });
    const c = moduleCert(phase, st);
    expect(c.earned).toBe(true);
    expect(c.valid).toBe(true);
  });

  it("aprobada hace 31 días: earned pero EXPIRADO", () => {
    const st = stWith({
      ...allLessonsDone(),
      [TEST_KEY]: ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(31) }),
    });
    const c = moduleCert(phase, st);
    expect(c.earned).toBe(true);
    expect(c.valid).toBe(false);
  });

  it("validUntil = lastAt + CERT_DAYS", () => {
    const lastAt = daysAgo(5);
    const st = stWith({ ...allLessonsDone(), [TEST_KEY]: ls({ bestScore: 0.9, lastScore: 0.9, lastAt }) });
    const c = moduleCert(phase, st);
    expect(c.validUntil?.getTime()).toBe(new Date(lastAt).getTime() + CERT_DAYS * DAY);
  });

  it("prueba ≥80% pero con una lección sin completar ⇒ NO earned", () => {
    const lessons = allLessonsDone();
    delete lessons[phase.lessons[0].id];
    const st = stWith({ ...lessons, [TEST_KEY]: ls({ bestScore: 0.95, lastScore: 0.95 }) });
    expect(moduleCert(phase, st).earned).toBe(false);
  });

  it("prueba con bestScore 79% ⇒ NO earned", () => {
    const st = stWith({ ...allLessonsDone(), [TEST_KEY]: ls({ bestScore: 0.79, lastScore: 0.79 }) });
    expect(moduleCert(phase, st).earned).toBe(false);
  });

  it("bestScore ≥80 pero ÚLTIMO intento <80: earned sin vigencia (no renueva)", () => {
    const st = stWith({ ...allLessonsDone(), [TEST_KEY]: ls({ bestScore: 0.9, lastScore: 0.5 }) });
    const c = moduleCert(phase, st);
    expect(c.earned).toBe(true);
    expect(c.valid).toBe(false);
    expect(c.since).toBeNull();
    expect(c.validUntil).toBeNull();
  });

  it("estado null: nada earned, score null", () => {
    const c = moduleCert(phase, null);
    expect(c.earned).toBe(false);
    expect(c.valid).toBe(false);
    expect(c.score).toBeNull();
  });
});

describe("examReadiness", () => {
  it("solo cuenta lessonKeys exam-sim-* aprobadas (≥60%) en los últimos 30 días", () => {
    const st = stWith({
      "exam-sim-a": ls({ lastScore: 0.7, lastAt: daysAgo(1) }), // cuenta
      "exam-sim-viejo": ls({ lastScore: 0.9, lastAt: daysAgo(40) }), // fuera de ventana
      "exam-sim-bajo": ls({ lastScore: 0.5, lastAt: daysAgo(1) }), // no aprobado
      "entrevista": ls({ lastScore: 1, lastAt: daysAgo(1) }), // otra clave: no cuenta
      "test-f0": ls({ lastScore: 1, lastAt: daysAgo(1) }), // tampoco
    });
    const r = examReadiness(st);
    expect(r.examsPassed30d).toBe(1);
    expect(r.ready).toBe(false);
  });

  it("certsTotal = número de módulos A1 del curso; estado vacío no certifica nada", () => {
    const a1Count = course.phases.filter((p) => (p.level ?? "a1") === "a1").length;
    const r = examReadiness(stWith({}));
    expect(a1Count).toBeGreaterThan(0);
    expect(r.certsTotal).toBe(a1Count);
    expect(r.certsValid).toBe(0);
    expect(r.ready).toBe(false);
  });

  it("todos los certificados vigentes + 2 simulacros recientes ⇒ ready", () => {
    const a1 = course.phases.filter((p) => (p.level ?? "a1") === "a1");
    const lessons: Record<string, LessonStat> = {};
    for (const p of a1) {
      for (const l of p.lessons) lessons[l.id] = ls();
      lessons[`test-${p.id}`] = ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(1) });
    }
    // ids REALES de los sets alemanes (el Diplom solo cuenta sims de su idioma)
    lessons["exam-sim-a"] = ls({ lastScore: 0.75, lastAt: daysAgo(2) });
    lessons["exam-sim-b"] = ls({ lastScore: 0.8, lastAt: daysAgo(3) });
    const r = examReadiness(stWith(lessons));
    expect(r.certsValid).toBe(r.certsTotal);
    expect(r.examsPassed30d).toBeGreaterThanOrEqual(2);
    expect(r.ready).toBe(true);
  });

  it("los simulacros de OTRO idioma no cuentan para el Diplom alemán", () => {
    const a1 = course.phases.filter((p) => (p.level ?? "a1") === "a1");
    const lessons: Record<string, LessonStat> = {};
    for (const p of a1) {
      for (const l of p.lessons) lessons[l.id] = ls();
      lessons[`test-${p.id}`] = ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(1) });
    }
    lessons["exam-en-sim-a"] = ls({ lastScore: 0.9, lastAt: daysAgo(2) });
    lessons["exam-en-sim-b"] = ls({ lastScore: 0.9, lastAt: daysAgo(3) });
    const r = examReadiness(stWith(lessons));
    expect(r.examsPassed30d).toBe(0);
    expect(r.ready).toBe(false);
  });

  it("el default sigue sin contar exam-en-sim-a", () => {
    const r = examReadiness(stWith({
      "exam-en-sim-a": ls({ lastScore: 0.9, lastAt: daysAgo(1) }),
      "exam-en-sim-b": ls({ lastScore: 0.9, lastAt: daysAgo(1) }),
    }));
    expect(r.examsPassed30d).toBe(0);
    expect(r.lang).toBeUndefined();
    expect(r.level).toBeUndefined();
  });

  it("examReadiness(st, { lang: 'en', level: 'a2' }) no cuenta exam-sim-a alemán", () => {
    const r = examReadiness(
      stWith({
        "exam-sim-a": ls({ lastScore: 0.95, lastAt: daysAgo(1) }),
        "exam-sim-b": ls({ lastScore: 0.95, lastAt: daysAgo(1) }),
      }),
      { lang: "en", level: "a2" },
    );
    expect(r.examsPassed30d).toBe(0);
    expect(r.ready).toBe(false);
    expect(r.lang).toBe("en");
    expect(r.level).toBe("a2");
  });

  it("todos los módulos EN A2 certificados + 2 sims en-a2 recientes ⇒ ready", () => {
    const a2 = courseOf("en").phases.filter((p) => (p.level ?? "a1") === "a2");
    expect(a2.length).toBeGreaterThan(0);
    const lessons: Record<string, LessonStat> = {};
    for (const p of a2) certificar(p, lessons);
    lessons[examResultId("en-a2-sim-a")] = ls({ lastScore: 0.7, lastAt: daysAgo(2) });
    lessons[examResultId("en-a2-sim-b")] = ls({ lastScore: 0.7, lastAt: daysAgo(3) });
    const r = examReadiness(stWith(lessons), { lang: "en", level: "a2" });
    expect(r.certsTotal).toBe(a2.length);
    expect(r.certsValid).toBe(r.certsTotal);
    expect(r.examsPassed30d).toBeGreaterThanOrEqual(2);
    expect(r.ready).toBe(true);
    expect(r.lang).toBe("en");
    expect(r.level).toBe("a2");
  });

  it("DE B1 pide dos simulacros: con uno solo el aval no sale", () => {
    const b1 = courseOf("de").phases.filter((p) => (p.level ?? "a1") === "b1");
    expect(b1.length).toBeGreaterThan(0);
    const lessons: Record<string, LessonStat> = {};
    for (const p of b1) certificar(p, lessons);
    lessons[examResultId("b1-sim-a")] = ls({ lastScore: 0.7, lastAt: daysAgo(2) });
    const one = examReadiness(stWith(lessons), { lang: "de", level: "b1" });
    expect(one.examsNeeded).toBe(2);
    expect(one.examsPassed30d).toBe(1);
    expect(one.ready).toBe(false);
    lessons[examResultId("b1-sim-b")] = ls({ lastScore: 0.7, lastAt: daysAgo(2) });
    const both = examReadiness(stWith(lessons), { lang: "de", level: "b1" });
    expect(both.examsPassed30d).toBe(2);
    expect(both.certsValid).toBe(both.certsTotal);
    expect(both.ready).toBe(true);
  });

  it("con 2 simulacros pero un certificado vencido ⇒ NO ready", () => {
    const a1 = course.phases.filter((p) => (p.level ?? "a1") === "a1");
    const lessons: Record<string, LessonStat> = {};
    for (const p of a1) {
      for (const l of p.lessons) lessons[l.id] = ls();
      lessons[`test-${p.id}`] = ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(1) });
    }
    // el primer módulo certificó por última vez hace 31 días → vencido
    lessons[`test-${a1[0].id}`] = ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(31) });
    lessons["exam-sim-1"] = ls({ lastScore: 0.75, lastAt: daysAgo(2) });
    lessons["exam-sim-2"] = ls({ lastScore: 0.8, lastAt: daysAgo(3) });
    const r = examReadiness(stWith(lessons));
    expect(r.certsValid).toBe(r.certsTotal - 1);
    expect(r.ready).toBe(false);
  });
});

// El perfil enseña una expedición cada vez: si una medalla se quedara sin
// idioma —o con uno que no es curso— desaparecería de las dos pestañas.
describe("medallas por idioma", () => {
  it("toda medalla lleva el idioma de un curso que existe", () => {
    const idiomas = new Set(Object.keys(courses));
    const badges = computeBadges(null);
    expect(badges.length).toBeGreaterThan(0);
    for (const b of badges) expect(idiomas.has(b.lang)).toBe(true);
  });

  it("cada expedición tiene medallas propias y no se pisan", () => {
    const badges = computeBadges(null);
    const de = badges.filter((b) => b.lang === "de");
    const en = badges.filter((b) => b.lang === "en");
    expect(de.length).toBeGreaterThan(0);
    expect(en.length).toBeGreaterThan(0);
    expect(de.length + en.length).toBe(badges.length);
    // ids únicos: dos medallas con el mismo id se pisarían en el `key` de React
    expect(new Set(badges.map((b) => b.id)).size).toBe(badges.length);
  });
});

// ── Las medallas son claves de progreso: ni se renombran ni cambian de meta ──
// El día que exista el inglés A2, «World Class» («Certifica todos los módulos
// del inglés A1») no puede pasar a exigir A1+A2: una medalla ya ganada se
// desganaría sola. Cada nivel nuevo trae las suyas, con ids nuevos.

/** un A2 inglés de mentira (un módulo, una lección) para simular el futuro */
function withFakeEnA2(en: Course): Course {
  const lesson: Lesson = {
    id: "ena2m1l1", phaseId: "ena2m1", title: "Last weekend", subtitle: "past simple", minutes: 10, sections: [],
  };
  const phase: Phase = {
    id: "ena2m1", level: "a2", n: 1, title: "Last weekend", goal: "Contar lo que pasó", color: "#000",
    lessons: [lesson],
  };
  return { ...en, phases: [...en.phases, phase] };
}

/** certifica un módulo entero: todas sus lecciones + su prueba con ≥80% */
function certificar(p: Phase, lessons: Record<string, LessonStat>) {
  for (const l of p.lessons) lessons[l.id] = ls();
  lessons[`test-${p.id}`] = ls({ bestScore: 0.9, lastScore: 0.9, lastAt: daysAgo(1) });
}

const enA1 = () => courses.en.phases.filter((p) => (p.level ?? "a1") === "a1");

describe("ids de medalla (claves de progreso)", () => {
  it("los ids de hoy siguen existiendo, uno por uno", () => {
    const ids = new Set(computeBadges(null).map((b) => b.id));
    const historicos = [
      // expedición alemana A1
      "erste-schritte", "wanderweg", "entdeckung", "expedition", "gipfel",
      "funke", "flamme", "feuerwerk", "sammler", "meister", "redner", "pruefling", "weltklasse",
      // niveles alemanes por encima del A1
      "a2-start", "a2-halbzeit", "a2-gipfel", "a2-meister",
      "b1-start", "b1-halbzeit", "b1-gipfel", "b1-meister",
      // expedición inglesa A1
      "en-first-steps", "en-on-the-road", "en-explorer", "en-summit", "en-module-master",
      "en-word-hoard", "en-world-class", "en-speaker", "en-mock-exam",
    ];
    for (const id of historicos) expect(ids.has(id), `falta la medalla ${id}`).toBe(true);
  });

  it("«World Class» se gana certificando el A1 inglés, y nada más", () => {
    const lessons: Record<string, LessonStat> = {};
    for (const p of enA1()) certificar(p, lessons);
    const wc = computeBadges(stWith(lessons)).find((b) => b.id === "en-world-class")!;
    expect(wc.earned).toBe(true);
    expect(wc.lang).toBe("en");
  });

  it("ninguna medalla se queda con la barra en NaN", () => {
    for (const b of computeBadges(null)) expect(Number.isFinite(b.progress)).toBe(true);
  });
});

describe("cuando aparezca un nivel nuevo del inglés", () => {
  it("«World Class» sigue ganada con solo el A1, y el A2 trae medallas propias", async () => {
    vi.resetModules();
    vi.doMock("@/data/course.gen", async () => {
      const real = await vi.importActual<typeof import("@/data/course.gen")>("@/data/course.gen");
      return { ...real, courses: { ...real.courses, en: withFakeEnA2(real.courses.en) } };
    });
    const { computeBadges: compute } = await import("@/lib/achievements");
    const { courses: mocked } = await import("@/data/course");

    const lessons: Record<string, LessonStat> = {};
    for (const p of mocked.en.phases.filter((p) => (p.level ?? "a1") === "a1")) certificar(p, lessons);
    const badges = compute(stWith(lessons));
    const by = (id: string) => badges.find((b) => b.id === id);

    // la medalla vieja NO se mueve: se ganó con el A1 y sigue ganada
    expect(by("en-world-class")!.earned).toBe(true);
    expect(by("en-world-class")!.desc).toContain("A1");
    expect(by("en-summit")!.earned).toBe(true);
    // y el nivel nuevo estrena las suyas, con ids nuevos y sin ganar
    for (const id of ["en-a2-start", "en-a2-halfway", "en-a2-summit", "en-a2-mastery"]) {
      expect(by(id), `falta ${id}`).toBeDefined();
      expect(by(id)!.earned).toBe(false);
      expect(by(id)!.lang).toBe("en");
    }
    // el prefijo importa: las alemanas se llaman a2-* y no se pisan
    expect(by("a2-start")).toBeDefined();
    expect(new Set(badges.map((b) => b.id)).size).toBe(badges.length);

    // completar la lección del A2 gana su primera medalla, no las del A1
    const conA2 = { ...lessons, ena2m1l1: ls() };
    const b2 = compute(stWith(conA2));
    expect(b2.find((b) => b.id === "en-a2-start")!.earned).toBe(true);
    expect(b2.find((b) => b.id === "en-world-class")!.earned).toBe(true);

    vi.doUnmock("@/data/course.gen");
    vi.resetModules();
  });
});

describe("la Prüfungsreife es alemana", () => {
  it("certificar el inglés entero no acerca ni un paso al Diplom A1", () => {
    const lessons: Record<string, LessonStat> = {};
    for (const p of courses.en.phases) certificar(p, lessons);
    lessons["exam-en-sim-a"] = ls({ lastScore: 0.9, lastAt: daysAgo(1) });
    const r = examReadiness(stWith(lessons));
    expect(r.certsValid).toBe(0);
    expect(r.examsPassed30d).toBe(0);
    expect(r.ready).toBe(false);
    expect(r.certsTotal).toBe(course.phases.filter((p) => (p.level ?? "a1") === "a1").length);
  });
});
