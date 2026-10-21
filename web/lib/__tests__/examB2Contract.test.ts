import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { examB2A } from "@/data/examB2A";
import { examB2B } from "@/data/examB2B";
import { examClockPaper, examPaperDurationSeconds, examSecondsLeft } from "@/lib/examClock";
import { b2m1 } from "@/data/b2m1";
import { enb2m1 } from "@/data/en/enb2m1";
import { courseOf } from "@/data/course";
import type { ExamSet, LesenMatch } from "@/lib/examTypes";

function lesenT1(set: ExamSet): LesenMatch {
  const lesen = set.sections.find((s) => s.skill === "lesen");
  const item = lesen?.teile[0]?.items[0];
  if (!item || item.kind !== "lesen-match") throw new Error(`${set.id}: Lesen T1 no es lesen-match`);
  return item;
}

function countWords(s: string): number {
  const t = s.trim();
  return t ? t.split(/\s+/).length : 0;
}

function part1Text(set: ExamSet, titleRe: RegExp): string {
  const lesen = set.sections.find((s) => s.skill === "lesen");
  const item = lesen?.teile.find((t) => titleRe.test(t.title))?.items[0];
  if (!item || !("text" in item) || typeof item.text !== "string") throw new Error(`${set.id}: sin text`);
  return item.text;
}

describe("G1 — lecturas fuente ≥450 palabras", () => {
  it("T3 de cada set alemán y Reading Part 1 de cada set inglés", async () => {
    const { examEnB2A } = await import("@/data/en/examEnB2A");
    const { examEnB2B } = await import("@/data/en/examEnB2B");
    expect(countWords(part1Text(examB2A, /Teil 3/)), "b2-sim-a T3").toBeGreaterThanOrEqual(450);
    expect(countWords(part1Text(examB2B, /Teil 3/)), "b2-sim-b T3").toBeGreaterThanOrEqual(450);
    expect(countWords(part1Text(examEnB2A, /Part 1/)), "en-b2-sim-a P1").toBeGreaterThanOrEqual(450);
    expect(countWords(part1Text(examEnB2B, /Part 1/)), "en-b2-sim-b P1").toBeGreaterThanOrEqual(450);
  });

  it("P1 — T5 es UN reglamento continuo ≥450; concatenar situaciones no vale", () => {
    const t5 = (set: ExamSet): LesenMatch => {
      const lesen = set.sections.find((s) => s.skill === "lesen");
      const item = lesen?.teile.find((t) => /Teil 5/.test(t.title))?.items[0];
      if (!item || item.kind !== "lesen-match") throw new Error(`${set.id}: T5 no es match`);
      return item;
    };
    for (const set of [examB2A, examB2B]) {
      const item = t5(set);
      expect(item.text, `${set.id}: T5 sin text continuo`).toBeTruthy();
      expect(countWords(item.text ?? ""), `${set.id} T5 text`).toBeGreaterThanOrEqual(450);
      const glued = item.situations.map((s) => s.situation).join("\n\n");
      expect(countWords(glued), `${set.id}: situaciones cortas, no el reglamento`).toBeLessThan(120);
    }
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
  it("b2-sim-a y b2-sim-b no comparten bloques ≥40", () => {
    const ov = [...bodyParas(examB2A)].filter((p) => bodyParas(examB2B).has(p));
    expect(ov, ov.join(" || ")).toEqual([]);
  });

  it("en-b2-sim-a y en-b2-sim-b no comparten bloques ≥40", async () => {
    const { examEnB2A } = await import("@/data/en/examEnB2A");
    const { examEnB2B } = await import("@/data/en/examEnB2B");
    const ov = [...bodyParas(examEnB2A)].filter((p) => bodyParas(examEnB2B).has(p));
    expect(ov, ov.join(" || ")).toEqual([]);
  });
});

describe("G5 — Lesen T1 B2: voz repetida + ninguno; quitar el flag rompe el test", () => {
  it.each([
    ["b2-sim-a", examB2A],
    ["b2-sim-b", examB2B],
  ] as const)("%s allowReuse y un 0", (_id, set) => {
    const t1 = lesenT1(set);
    expect(t1.allowReuse, "quitar allowReuse rompe este test").toBe(true);
    const answers = t1.situations.map((s) => s.answer);
    expect(answers.some((a) => a === "0"), "T1 sin ítem «ninguno»").toBe(true);
    const used = answers.filter((a) => a !== "0");
    expect(new Set(used).size, "T1 sin voz repetida").toBeLessThan(used.length);
  });
});

describe("G6c — kill a los 10 min de Lesen: remaining ≈ 55′, Hören no arranca", () => {
  it("papel lesen 65′ con startedAt = now-10min deja 55′; hoeren sin startedAt no corre", () => {
    expect(examClockPaper(examB2A, "lesen")).toBe("lesen");
    expect(examClockPaper(examB2A, "hoeren")).toBe("hoeren");
    const lesenDur = examPaperDurationSeconds(examB2A, "lesen");
    const hoerenDur = examPaperDurationSeconds(examB2A, "hoeren");
    expect(lesenDur).toBe(65 * 60);
    expect(hoerenDur).toBe(40 * 60);

    const now = 2_000_000;
    const lesenStarted = now - 10 * 60;
    expect(examSecondsLeft(lesenStarted, lesenDur, now)).toBe(55 * 60);
    // Hören no se ha tocado: startedAt 0 no inventa tiempo
    expect(examSecondsLeft(0, hoerenDur, now)).toBe(0);
  });
});

describe("P2 — ExamPlayer pinta insert y notes, no un MC", () => {
  const src = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "ExamPlayer.tsx"),
    "utf8",
  );
  it("lesen-insert va a LesenInsertItem y el componente usa el banco de frases", () => {
    expect(src).toMatch(/item\.kind === "lesen-insert" && <LesenInsertItem/);
    expect(src).toMatch(/function LesenInsertItem/);
    expect(src).toMatch(/item\.sentences\.map/);
    expect(src).toMatch(/item\.gaps\.map/);
  });
  it("hoeren-notes y lesen-notes son inputs, no options de MC", () => {
    expect(src).toMatch(/item\.kind === "hoeren-notes" && <HoerenNotesItem/);
    expect(src).toMatch(/item\.kind === "lesen-notes" && <LesenNotesItem/);
    expect(src).toMatch(/function HoerenNotesItem/);
    expect(src).toMatch(/placeholder=\{mw === 1 \? "1 palabra"/);
  });
  it("el intro usa examIntroMinutes, no section.minutes a palo seco", () => {
    expect(src).toMatch(/examIntroMinutes\(set, step\.section\.skill\)/);
    expect(src).not.toMatch(/tiempo oficial de este papel:[\s\S]{0,80}step\.section\.minutes/);
  });
  it("P5 — el intro LC RW usa examIntroMinutes, no un 80 ni un 50 sueltos", () => {
    expect(src).toMatch(/examIntroMinutes\(set, step\.section\.skill\)/);
    expect(src).toMatch(/paper === "rw"/);
  });
  it("P2 — Goethe A2 Hören T2 es hoeren-photo-match, no mc", () => {
    expect(src).toMatch(/item\.kind === "hoeren-photo-match" && <HoerenPhotoMatchItem/);
  });
  it("P12 — insert huérfano: el player avisa, no se lo traga", () => {
    expect(src).toMatch(/orphanGaps/);
    expect(src).toMatch(/mal formado: un hueco apunta a una frase que no está en el banco/);
  });
  it("B6 — el cronómetro del player es el papel, no section.minutes", () => {
    expect(src).toMatch(/examPaperDurationSeconds\(set, paper\)/);
    expect(src).not.toMatch(/secondsLeft[\s\S]{0,200}step\.section\.minutes/);
  });
});

const PRODUCCION = new Set(["paraphrase", "write", "errorfix", "cloze", "transform", "translate", "build"]);

describe("P3 — L1 de b2m1 y enb2m1: regla + producción, no un solo molde", () => {
  it("b2m1l1 enseña K I con nota y al menos 3 tipos de producción", () => {
    const l = b2m1.lessons.find((x) => x.id === "b2m1l1");
    expect(l).toBeDefined();
    const kinds = new Set<string>();
    let hasNote = false;
    for (const sec of l!.sections) {
      if (sec.kind === "note" && sec.note) hasNote = /Konjunktiv I|sei/.test(sec.note.body);
      if (sec.kind === "exercises" && sec.exercises) for (const e of sec.exercises) kinds.add(e.type);
    }
    expect(hasNote, "falta la regla de K I").toBe(true);
    expect(kinds.size, [...kinds].join(",")).toBeGreaterThanOrEqual(5);
    expect([...kinds].filter((k) => PRODUCCION.has(k)).length).toBeGreaterThanOrEqual(3);
  });
  it("enb2m1l1 enseña frase-tema con nota y al menos 3 tipos de producción", () => {
    const l = enb2m1.lessons.find((x) => x.id === "enb2m1l1");
    expect(l).toBeDefined();
    const kinds = new Set<string>();
    let hasNote = false;
    for (const sec of l!.sections) {
      if (sec.kind === "note" && sec.note) hasNote = /párrafo|frase-tema|topic/i.test(sec.note.body);
      if (sec.kind === "exercises" && sec.exercises) for (const e of sec.exercises) kinds.add(e.type);
    }
    expect(hasNote, "falta la regla del párrafo").toBe(true);
    expect(kinds.size, [...kinds].join(",")).toBeGreaterThanOrEqual(5);
    expect([...kinds].filter((k) => PRODUCCION.has(k)).length).toBeGreaterThanOrEqual(3);
  });
});

describe("P4 — un target no viaja de un módulo B2 a otro", () => {
  function collisions(prefix: string, lang: "de" | "en"): string[] {
    const seen = new Map<string, string>();
    const dups: string[] = [];
    for (const card of Object.values(courseOf(lang).vocab)) {
      const m = card.id.match(new RegExp(`^(${prefix}\\d+)`));
      if (!m) continue;
      const mod = m[1];
      const t = card.target;
      const prev = seen.get(t);
      if (prev && prev !== mod) dups.push(`«${t}» en ${prev} y ${mod}`);
      else seen.set(t, mod);
    }
    return dups;
  }
  it("DE B2: un target no se enseña en dos módulos", () => {
    expect(collisions("b2m", "de")).toEqual([]);
  });
  it("EN B2: un target no se enseña en dos módulos", () => {
    expect(collisions("enb2m", "en")).toEqual([]);
  });
});

describe("P10 — entrevista B2 no copia el Sprechen del simulacro", () => {
  async function examPrompts(sim: ExamSet): Promise<string[]> {
    const sp = sim.sections.find((s) => s.skill === "sprechen");
    return (sp?.teile ?? []).flatMap((t) =>
      t.items.flatMap((it) => ("prompt" in it && typeof it.prompt === "string" ? [it.prompt] : [])),
    );
  }
  it("de-b2: 4–6 ítems, prep 15 min, 0 strings con b2-sim-a", { timeout: 15_000 }, async () => {
    const { interviewFor } = await import("@/app/entrevista/page");
    const cfg = interviewFor("de", "b2");
    expect(cfg).not.toBeNull();
    const oral = cfg!.build();
    expect(oral.length).toBeGreaterThanOrEqual(4);
    expect(oral.length).toBeLessThanOrEqual(6);
    expect(oral.some((it) => it.prep === 900)).toBe(true);
    const vortrag = oral.find((it) => it.prep === 900) as { schemaChecks?: unknown[] } | undefined;
    expect(vortrag?.schemaChecks?.length).toBe(4);
    const exam = await examPrompts(examB2A);
    for (const it of oral) {
      expect(exam.some((p) => p === it.question || p.includes(it.question.slice(0, 48)))).toBe(false);
    }
  });
  it("en-b2: 4–6 ítems, 0 strings con en-b2-sim-a", { timeout: 15_000 }, async () => {
    const { interviewFor } = await import("@/app/entrevista/page");
    const { examEnB2A } = await import("@/data/en/examEnB2A");
    const cfg = interviewFor("en", "b2");
    expect(cfg).not.toBeNull();
    const oral = cfg!.build();
    expect(oral.length).toBeGreaterThanOrEqual(4);
    expect(oral.length).toBeLessThanOrEqual(6);
    expect(oral.some((it) => it.prep === 900)).toBe(true);
    const exam = await examPrompts(examEnB2A);
    for (const it of oral) {
      expect(exam.some((p) => p === it.question || (it.question.length > 40 && p.includes(it.question.slice(0, 48))))).toBe(false);
    }
  });
});

describe("B3 — la escritura no ofrece un corrector externo", () => {
  it("la hoja la marca el alumno y no se guarda como nota", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "escritura", "page.tsx"),
      "utf8",
    );
    expect(src).not.toMatch(/lightBlockedB2|aiChat|llama|qwen/);
    expect(src).toMatch(/no se guarda como nota/);
  });
});

describe("B5 — hub B2: TTS y sin micrófono, sin pareja del Goethe", () => {
  it("la tarjeta de entrevista nombra TTS y niega el micrófono", () => {
    const src = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app", "idioma", "[lang]", "Client.tsx"),
      "utf8",
    );
    const copy = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "lib", "oralCopy.ts"),
      "utf8",
    );
    expect(src).toMatch(/ORAL_CONTRACT_SHORT/);
    expect(copy).toMatch(/Ensayas en voz alta con TTS/);
    expect(copy).toMatch(/no hay micrófono/);
    expect(src).not.toMatch(/oral tecleado/);
    expect(src).not.toMatch(/pareja del Goethe/);
  });
});
