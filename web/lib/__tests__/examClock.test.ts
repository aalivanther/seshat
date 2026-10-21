import { describe, expect, it } from "vitest";
import { examDurationSeconds, examWrittenDurationSeconds, examSecondsLeft, examClockPaper, examPaperDurationSeconds, examIntroMinutes } from "@/lib/examClock";

describe("reloj del simulacro — T9 / §2.2", () => {
  it("un examen de 45 min arrancado hace 10 min deja 35", () => {
    const started = 1_000_000;
    const duration = examDurationSeconds([{ minutes: 45 }]);
    expect(duration).toBe(45 * 60);
    expect(examSecondsLeft(started, duration, started + 10 * 60)).toBe(35 * 60);
  });

  it("cerrar la pestaña no regenera tiempo: now avanza, remaining baja", () => {
    const started = 5_000;
    const duration = 30 * 60;
    const a = examSecondsLeft(started, duration, started + 60);
    const b = examSecondsLeft(started, duration, started + 120);
    expect(a).toBe(29 * 60);
    expect(b).toBe(28 * 60);
    expect(b).toBeLessThan(a);
  });

  it("agotado no pasa a negativo", () => {
    expect(examSecondsLeft(0, 60, 120)).toBe(0);
  });

  it("NaN o secciones vacías no inventan duración", () => {
    expect(examDurationSeconds(undefined)).toBe(0);
    expect(examDurationSeconds([{ minutes: Number.NaN }, { minutes: -5 }])).toBe(0);
    expect(examSecondsLeft(Number.NaN, 60, 0)).toBe(0);
  });

  it("un reloj adelantado no regala tiempo por encima de la duración", () => {
    expect(examSecondsLeft(100, 60, 50)).toBe(60);
  });

  it("un minutes enorme de un pack roto no deja el cronómetro en 1e12", () => {
    const d = examDurationSeconds([{ minutes: 1e12 }, { minutes: 45 }]);
    expect(d).toBeGreaterThan(0);
    expect(d).toBeLessThanOrEqual(8 * 3600);
  });

  it("startedAt no positivo no inventa tiempo", () => {
    expect(examSecondsLeft(0, 60, 10)).toBe(0);
    expect(examSecondsLeft(-5, 60, 10)).toBe(0);
  });

  it("dos pestañas con el mismo startedAt ven el mismo remaining", () => {
    const started = 1_000_000;
    const duration = 45 * 60;
    const now = started + 10;
    expect(examSecondsLeft(started, duration, now)).toBe(examSecondsLeft(started, duration, now));
    expect(examSecondsLeft(started, duration, now)).toBe(duration - 10);
  });

  it("recargar 10 s después baja ~10 s, no resetea", () => {
    const started = 5_000;
    const duration = 30 * 60;
    const t0 = examSecondsLeft(started, duration, started);
    const t10 = examSecondsLeft(started, duration, started + 10);
    expect(t0).toBe(duration);
    expect(t10).toBe(duration - 10);
  });

  it("el escrito suma hoeren+lesen+schreiben y deja fuera el sprechen", () => {
    const sections = [
      { minutes: 20, skill: "hoeren" },
      { minutes: 30, skill: "lesen" },
      { minutes: 25, skill: "schreiben" },
      { minutes: 15, skill: "sprechen" },
    ];
    expect(examWrittenDurationSeconds(sections)).toBe((20 + 30 + 25) * 60);
    expect(examDurationSeconds(sections)).toBe((20 + 30 + 25 + 15) * 60);
  });

  it("secciones sin skill siguen contando (compat con minutos pelados)", () => {
    expect(examWrittenDurationSeconds([{ minutes: 45 }])).toBe(45 * 60);
    expect(examWrittenDurationSeconds(undefined)).toBe(0);
  });

  it("Goethe modular: cada destreza es su propio papel", () => {
    const set = {
      id: "b2-sim-a",
      scoring: { modular: true },
      sections: [
        { minutes: 65, skill: "lesen" },
        { minutes: 40, skill: "hoeren" },
        { minutes: 75, skill: "schreiben" },
        { minutes: 15, skill: "sprechen" },
      ],
    };
    expect(examClockPaper(set, "lesen")).toBe("lesen");
    expect(examClockPaper(set, "hoeren")).toBe("hoeren");
    expect(examPaperDurationSeconds(set, "lesen")).toBe(65 * 60);
    expect(examPaperDurationSeconds(set, "hoeren")).toBe(40 * 60);
    expect(examPaperDurationSeconds(set, "sprechen")).toBe(0);
  });

  it("LanguageCert: Listening aparte, Reading+Writing juntos", () => {
    const set = {
      id: "en-b2-sim-a",
      sections: [
        { minutes: 30, skill: "hoeren" },
        { minutes: 60, skill: "lesen" },
        { minutes: 70, skill: "schreiben" },
        { minutes: 13, skill: "sprechen" },
      ],
    };
    expect(examClockPaper(set, "hoeren")).toBe("listening");
    expect(examClockPaper(set, "lesen")).toBe("rw");
    expect(examClockPaper(set, "schreiben")).toBe("rw");
    expect(examPaperDurationSeconds(set, "listening")).toBe(30 * 60);
    expect(examPaperDurationSeconds(set, "rw")).toBe((60 + 70) * 60);
  });

  it("LanguageCert B2 real: Reading 80 + Writing 50 = un papel de 130′", async () => {
    const { examEnB2A } = await import("@/data/en/examEnB2A");
    expect(examClockPaper(examEnB2A, "lesen")).toBe("rw");
    expect(examClockPaper(examEnB2A, "schreiben")).toBe("rw");
    expect(examPaperDurationSeconds(examEnB2A, "rw")).toBe(130 * 60);
    expect(examPaperDurationSeconds(examEnB2A, "listening")).toBe(30 * 60);
  });

  it("P5 — el intro LC muestra 130′ en Reading y en Writing, no 80 ni 50", async () => {
    const { examEnB2A } = await import("@/data/en/examEnB2A");
    expect(examIntroMinutes(examEnB2A, "lesen")).toBe(130);
    expect(examIntroMinutes(examEnB2A, "schreiben")).toBe(130);
    expect(examIntroMinutes(examEnB2A, "hoeren")).toBe(30);
    expect(examIntroMinutes(examEnB2A, "lesen")).not.toBe(80);
    expect(examIntroMinutes(examEnB2A, "schreiben")).not.toBe(50);
  });

  it("Goethe B2 no suma Lesen+Hören en un solo papel", async () => {
    const { examB2A } = await import("@/data/examB2A");
    expect(examClockPaper(examB2A, "lesen")).toBe("lesen");
    expect(examClockPaper(examB2A, "hoeren")).toBe("hoeren");
    expect(examIntroMinutes(examB2A, "lesen")).toBe(65);
    expect(examIntroMinutes(examB2A, "hoeren")).toBe(40);
    expect(examIntroMinutes(examB2A, "lesen") + examIntroMinutes(examB2A, "hoeren")).toBe(105);
  });
});


