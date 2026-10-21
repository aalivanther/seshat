import { describe, expect, it } from "vitest";
import {
  coerceAnswers,
  coerceExamDraft,
  EXAM_DRAFT_MAX_ANSWER_KEYS,
  EXAM_DRAFT_MAX_VAL_BYTES,
  isExamSetId,
  remainingOf,
} from "@/lib/examDraft";

const now = 2_000_000;
const duration = 45 * 60;

describe("isExamSetId", () => {
  it("acepta los ids publicados y rechaza basura", () => {
    expect(isExamSetId("sim-a")).toBe(true);
    expect(isExamSetId("en-b1-sim-c")).toBe(true);
    expect(isExamSetId("SIM-A")).toBe(false);
    expect(isExamSetId("sim a")).toBe(false);
    expect(isExamSetId("")).toBe(false);
    expect(isExamSetId(null)).toBe(false);
  });
});

describe("coerceExamDraft", () => {
  it("acepta un borrador sano del perfil", () => {
    const d = coerceExamDraft(
      { startedAt: now - 600, idx: 3, answers: { h1: 1 } },
      { now, durationSec: duration, maxIdx: 40 },
    );
    expect(d).toEqual({ startedAt: now - 600, idx: 3, answers: { h1: 1 } });
    expect(remainingOf(d, duration, now)).toBe(duration - 600);
  });

  it("migra el formato viejo (secondsLeft) a startedAt", () => {
    const d = coerceExamDraft(
      { idx: 1, answers: { a: true }, secondsLeft: 30 * 60, at: now * 1000 },
      { now, durationSec: duration, maxIdx: 10 },
    );
    expect(d).not.toBeNull();
    expect(d!.startedAt).toBe(now - 15 * 60);
  });

  it("un secondsLeft inflado no regenera el examen entero", () => {
    expect(
      coerceExamDraft(
        { idx: 1, answers: {}, secondsLeft: 9_999_999 },
        { now, durationSec: duration, maxIdx: 10 },
      ),
    ).toBeNull();
  });

  it("un idx fuera de rango se recorta, no revienta el player", () => {
    const d = coerceExamDraft(
      { startedAt: now - 10, idx: 999, answers: {} },
      { now, durationSec: duration, maxIdx: 5 },
    );
    expect(d?.idx).toBe(5);
  });

  it("un startedAt de hace 3 días se descarta", () => {
    expect(
      coerceExamDraft(
        { startedAt: now - 3 * 24 * 3600, idx: 1, answers: { a: 1 } },
        { now, durationSec: duration, maxIdx: 10 },
      ),
    ).toBeNull();
  });

  it("answers que no es objeto no tumba el examen: se ignora", () => {
    const d = coerceExamDraft(
      { startedAt: now - 10, idx: 1, answers: ["no"] },
      { now, durationSec: duration, maxIdx: 10 },
    );
    expect(d?.answers).toEqual({});
  });

  it("JSON nulo, basura o opts no finitos → null", () => {
    expect(coerceExamDraft(null, { now, durationSec: duration, maxIdx: 1 })).toBeNull();
    expect(coerceExamDraft("x", { now, durationSec: duration, maxIdx: 1 })).toBeNull();
    expect(coerceExamDraft({ startedAt: now - 1, idx: 0, answers: {} }, { now: Number.NaN, durationSec: duration, maxIdx: 1 })).toBeNull();
  });

  it("un startedAt unos segundos en el futuro no regala tiempo", () => {
    const d = coerceExamDraft(
      { startedAt: now + 30, idx: 0, answers: {} },
      { now, durationSec: duration, maxIdx: 10 },
    );
    expect(d?.startedAt).toBe(now);
    expect(remainingOf(d, duration, now)).toBe(duration);
  });

  it("mutar el objeto de entrada no cambia el snapshot", () => {
    const src = { startedAt: now - 10, idx: 1, answers: { h1: { a: 1 } } };
    const d = coerceExamDraft(src, { now, durationSec: duration, maxIdx: 10 });
    (src.answers.h1 as { a: number }).a = 9;
    expect((d!.answers.h1 as { a: number }).a).toBe(1);
  });
});

describe("coerceAnswers", () => {
  it("salta claves largas, no finitos y valores enormes", () => {
    const huge = "x".repeat(EXAM_DRAFT_MAX_VAL_BYTES + 1);
    const out = coerceAnswers({
      ok: 1,
      "": 2,
      [ "k".repeat(80) ]: 3,
      inf: Number.POSITIVE_INFINITY,
      enorme: huge,
      nulo: null,
    });
    expect(out).toEqual({ ok: 1, nulo: null });
  });

  it("corta a 400 claves", () => {
    const raw: Record<string, number> = {};
    for (let i = 0; i < EXAM_DRAFT_MAX_ANSWER_KEYS + 20; i++) raw[`h${i}`] = i;
    expect(Object.keys(coerceAnswers(raw))).toHaveLength(EXAM_DRAFT_MAX_ANSWER_KEYS);
  });
});

describe("remainingOf", () => {
  it("dos pestañas con el mismo snapshot ven el mismo remaining", () => {
    const d = coerceExamDraft(
      { startedAt: now - 10, idx: 2, answers: { h1: 1 } },
      { now, durationSec: duration, maxIdx: 10 },
    )!;
    const tabA = remainingOf(d, duration, now);
    const tabB = remainingOf({ ...d, answers: { ...d.answers } }, duration, now);
    expect(tabA).toBe(tabB);
    expect(tabA).toBe(duration - 10);
  });

  it("diez segundos después el remaining baja 10, no se regenera", () => {
    const d = coerceExamDraft(
      { startedAt: now, idx: 0, answers: {} },
      { now, durationSec: duration, maxIdx: 10 },
    )!;
    expect(remainingOf(d, duration, now + 10)).toBe(duration - 10);
  });

  it("null o duración inválida → 0, no NaN", () => {
    expect(remainingOf(null, duration, now)).toBe(0);
    expect(remainingOf({ startedAt: now - 10, idx: 0, answers: {} }, Number.NaN, now)).toBe(0);
  });
});
