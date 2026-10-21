import { describe, expect, it } from "vitest";
import { interviewFor } from "@/app/entrevista/page";
import { interviewResultId, INTERVIEW_EN_ID } from "@/lib/ids";
import type { Cefr } from "@/lib/cefr";

function questionsOf(lang: string, cefr: Cefr, rounds = 12): Set<string> {
  const cfg = interviewFor(lang, cefr);
  const qs = new Set<string>();
  if (!cfg) return qs;
  for (let i = 0; i < rounds; i++) {
    for (const it of cfg.build()) qs.add(it.question);
  }
  return qs;
}

function overlap(a: Set<string>, b: Set<string>): string[] {
  return [...a].filter((q) => b.has(q));
}

describe("entrevista por (lang, cefr) — T10 / §2.4", () => {
  it("un B1 inglés no reutiliza la clave ni el guion del A1", () => {
    const b1 = interviewFor("en", "b1");
    expect(b1).not.toBeNull();
    expect(b1!.resultId).toBe("entrevista-en-b1");
    expect(b1!.resultId).toBe(interviewResultId("en", "b1"));
    expect(b1!.build().length).toBeGreaterThan(0);
    expect(interviewResultId("en", "b1")).not.toBe(INTERVIEW_EN_ID);
    expect(overlap(questionsOf("en", "b1"), questionsOf("en", "a1"))).toEqual([]);
  });

  it("el A2 inglés y el B1 alemán tienen partitura propia", () => {
    const enA2 = interviewFor("en", "a2");
    const deB1 = interviewFor("de", "b1");
    expect(enA2).not.toBeNull();
    expect(deB1).not.toBeNull();
    expect(enA2!.resultId).toBe("entrevista-en-a2");
    expect(enA2!.resultId).toBe(interviewResultId("en", "a2"));
    expect(deB1!.resultId).toBe("entrevista-de-b1");
    expect(deB1!.resultId).toBe(interviewResultId("de", "b1"));
    expect(enA2!.build().length).toBeGreaterThan(0);
    expect(deB1!.build().length).toBeGreaterThan(0);
    expect(overlap(questionsOf("en", "a2"), questionsOf("en", "a1"))).toEqual([]);
    expect(overlap(questionsOf("de", "b1"), questionsOf("de", "a1"))).toEqual([]);
    expect(overlap(questionsOf("de", "b1"), questionsOf("de", "a2"))).toEqual([]);
  });

  it("el A2 alemán y el B2 de ambos idiomas tienen partitura propia", () => {
    const deA2 = interviewFor("de", "a2");
    const deB2 = interviewFor("de", "b2");
    const enB2 = interviewFor("en", "b2");
    expect(deA2).not.toBeNull();
    expect(deB2).not.toBeNull();
    expect(enB2).not.toBeNull();
    expect(deA2!.resultId).toBe("entrevista-de-a2");
    expect(deB2!.resultId).toBe("entrevista-de-b2");
    expect(enB2!.resultId).toBe("entrevista-en-b2");
    expect(deA2!.build().length).toBeGreaterThan(0);
    expect(deB2!.build().length).toBeGreaterThan(0);
    expect(enB2!.build().length).toBeGreaterThan(0);
  });

  it("el A1 publicado conserva su clave y su partitura", () => {
    const en = interviewFor("en", "a1");
    const de = interviewFor("de", "a1");
    expect(en).not.toBeNull();
    expect(de).not.toBeNull();
    expect(en!.resultId).toBe(INTERVIEW_EN_ID);
    expect(de!.resultId).toBe("entrevista");
    expect(en!.build().length).toBeGreaterThan(0);
    expect(de!.build().length).toBeGreaterThan(0);
  });

  it("lang o cefr vacíos no inventan una entrevista", () => {
    expect(interviewFor("", "a1")).toBeNull();
    expect(interviewFor("de", "" as "a1")).toBeNull();
  });
});
