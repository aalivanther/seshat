import { describe, expect, it } from "vitest";
import { scoreExam } from "@/lib/examScore";
import { examB1A } from "@/data/examB1A";
import { examB1B } from "@/data/examB1B";
import type { ExamSet } from "@/lib/examTypes";

/** respuestas PERFECTAS derivadas del propio set */
function perfectAnswers(set: ExamSet) {
  const a: Record<string, unknown> = {};
  for (const sec of set.sections) {
    for (const t of sec.teile) {
      for (const it of t.items) {
        if (it.kind === "lesen-text") a[it.id] = Object.fromEntries(it.statements.map((s) => [s.id, s.richtig]));
        else if (it.kind === "lesen-match") a[it.id] = Object.fromEntries(it.situations.map((s) => [s.id, s.answer]));
        else if (it.kind === "hoeren-notes" || it.kind === "lesen-notes") a[it.id] = Object.fromEntries(it.gaps.map((g) => [g.id, g.answers[0] ?? ""]));
        else if (it.kind === "hoeren-photo-match") a[it.id] = Object.fromEntries(it.items.map((x) => [x.id, x.answer]));
        else if (it.kind === "lesen-janein") a[it.id] = Object.fromEntries(it.opinions.map((o) => [o.id, o.ja]));
        else if (it.kind === "hoeren-group") {
          for (const sub of it.items) {
            if (sub.kind === "hoeren-mc") a[sub.id] = sub.answer;
            else if (sub.kind === "hoeren-rf") a[sub.id] = sub.richtig;
            else a[sub.id] = sub.answer;
          }
        } else if (it.kind === "hoeren-mc") a[it.id] = it.answer;
        else if (it.kind === "hoeren-rf" || it.kind === "lesen-schild") a[it.id] = it.richtig;
        else if (it.kind === "lesen-mc" || it.kind === "lesen-ads") a[it.id] = it.answer;
        else if (it.kind === "hoeren-wersagt") a[it.id] = it.answer;
        else if (it.kind === "schreiben-message" && it.rubric) a[it.id] = Object.fromEntries(it.rubric.map((c) => [c.id, 0]));
        else if (it.kind === "sprechen-praesentation" && it.rubric) a[it.id] = Object.fromEntries(it.rubric.map((c) => [c.id, 0]));
        else if (it.kind === "sprechen" && it.rubric) a[it.id] = Object.fromEntries(it.rubric.map((c) => [c.id, 0]));
      }
    }
  }
  return a;
}

describe.each([
  ["b1-sim-a", examB1A],
  ["b1-sim-b", examB1B],
] as const)("%s — baremo de punta a punta", (_id, set) => {
  it("un examen perfecto da 100 en los cuatro módulos y aprueba", () => {
    const r = scoreExam(set, perfectAnswers(set));
    for (const m of r.modules!) {
      expect(Math.round(m.pct), `${m.skill} = ${m.pct}`).toBe(100);
      expect(m.pass).toBe(true);
    }
    expect(r.modules).toHaveLength(4);
    expect(r.allModulesPassed).toBe(true);
    expect(r.pass).toBe(true);
    expect(r.split).toEqual({
      objectivePct: 100,
      selfPct: 100,
      objectiveSkills: ["lesen", "hoeren"],
      selfSkills: ["schreiben", "sprechen"],
    });
  });

  it("un examen en blanco suspende los cuatro módulos", () => {
    const r = scoreExam(set, {});
    expect(r.pass).toBe(false);
    for (const m of r.modules!) expect(m.pass).toBe(false);
    expect(r.split?.objectivePct).toBe(0);
    expect(r.split?.selfPct).toBe(0);
  });

  it("Lesen y Hören convierten 18 aciertos de 30 en el 60 del corte", () => {
    const perItem = set.scoring!.pointsPerItem!;
    expect(Math.round(18 * perItem.lesen!)).toBe(60);
    expect(Math.round(18 * perItem.hoeren!)).toBe(60);
    expect(Math.round(17 * perItem.lesen!)).toBeLessThan(60); // 17 NO aprueba
  });

  it("suspender solo Schreiben tumba el certificado (sin compensación)", () => {
    const a = perfectAnswers(set);
    for (const sec of set.sections) {
      if (sec.skill !== "schreiben") continue;
      for (const t of sec.teile) for (const it of t.items) a[it.id] = {};
    }
    const r = scoreExam(set, a);
    expect(r.modules!.find((m) => m.skill === "schreiben")!.pass).toBe(false);
    expect(r.modules!.find((m) => m.skill === "lesen")!.pass).toBe(true);
    expect(r.pass).toBe(false);
    // Schreiben a cero y Sprechen intacto: la media autocalificada baja, la clave no.
    expect(r.split?.objectivePct).toBe(100);
    expect(r.split?.selfPct).toBe(50);
  });
});

function bodyParas(set: ExamSet): Set<string> {
  const out = new Set<string>();
  const push = (s: string | undefined) => {
    if (!s) return;
    for (const p of s.split(/\n\s*\n/)) {
      const t = p.trim();
      if (t.length >= 40) out.add(t);
    }
  };
  for (const sec of set.sections) {
    for (const teil of sec.teile) {
      for (const it of teil.items) {
        if ("text" in it && typeof it.text === "string") push(it.text);
        if ("audio" in it && typeof it.audio === "string") push(it.audio);
        if ("task" in it && typeof it.task === "string") push(it.task);
        if ("prompt" in it && typeof it.prompt === "string") push(it.prompt);
        if ("stimulus" in it && it.stimulus && typeof it.stimulus === "object" && "text" in it.stimulus) {
          push(String((it.stimulus as { text?: string }).text));
        }
        if ("ads" in it && Array.isArray(it.ads)) {
          for (const ad of it.ads) push(ad.text);
        }
        if ("situations" in it && Array.isArray(it.situations)) {
          for (const s of it.situations) push(s.situation);
        }
      }
    }
  }
  return out;
}

describe("G2 — A ≠ B: cero párrafos de cuerpo compartidos", () => {
  it("b1-sim-a y b1-sim-b no comparten bloques ≥40", () => {
    const ov = [...bodyParas(examB1A)].filter((p) => bodyParas(examB1B).has(p));
    expect(ov, ov.join(" || ")).toEqual([]);
  });
});
