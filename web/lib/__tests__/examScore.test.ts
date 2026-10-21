// BUG 9: examScore extraído "para testear" y sin tests. Contrato REAL:
// bySkill Record{got,max}, totalPct, pass (corte 60), itemResults por ítem;
// band() SOLO mapea aprobados (sehr gut/gut/befriedigend/ausreichend) — la
// banda de suspenso la decide el caller vía pass (documentado aquí).
import { describe, expect, it } from "vitest";
import { scoreExam, band } from "@/lib/examScore";
import { exams } from "@/data/exams";
import { examEnB2A } from "@/data/en/examEnB2A";
import { examEnB2B } from "@/data/en/examEnB2B";

const set = exams[0];

describe("band (contrato real: solo aprobados)", () => {
  it("mapea las 4 bandas oficiales", () => {
    expect(band(95)).toBe("sehr gut");
    expect(band(85)).toBe("gut");
    expect(band(75)).toBe("befriedigend");
    expect(band(65)).toBe("ausreichend");
  });
  it("bordes exactos", () => {
    expect(band(90)).toBe("sehr gut");
    expect(band(80)).toBe("gut");
    expect(band(70)).toBe("befriedigend");
  });
});

describe("scoreExam", () => {
  it("todo en blanco: 0%, no aprueba, sin crash, y cada ítem evaluado", () => {
    const r = scoreExam(set, {});
    expect(r.totalPct).toBe(0);
    expect(r.pass).toBe(false);
    expect(r.split).toBeUndefined();
    const totalItems = set.sections.reduce(
      (n, s) => n + s.teile.reduce((m, t) => m + t.items.length, 0), 0);
    // el Schreiben emite varias filas por carta (Punkte + adecuación):
    // itemResults ≥ ítems crudos, jamás menos
    expect(r.itemResults.length).toBeGreaterThanOrEqual(totalItems);
  });

  it("cubre las 4 destrezas con máximos > 0", () => {
    const r = scoreExam(set, {});
    const skills = Object.keys(r.bySkill);
    expect(skills.length).toBeGreaterThanOrEqual(4);
    for (const s of skills) expect(r.bySkill[s].max).toBeGreaterThan(0);
  });

  it("responder bien un mc de Hören sube la nota (monotonía)", () => {
    const first = set.sections
      .flatMap((s) => s.teile.flatMap((t) => t.items))
      .find((i) => i.kind === "hoeren-mc") as { id: string; answer: number } | undefined;
    expect(first).toBeDefined();
    const r0 = scoreExam(set, {});
    const r1 = scoreExam(set, { [first!.id]: first!.answer });
    expect(r1.totalPct).toBeGreaterThan(r0.totalPct);
    expect(r1.itemResults.find((x) => x.id === first!.id)?.ok).toBe(true);
  });

  it("respuesta incorrecta cuenta como fallo, no como blanco", () => {
    const first = set.sections
      .flatMap((s) => s.teile.flatMap((t) => t.items))
      .find((i) => i.kind === "hoeren-mc") as { id: string; answer: number } | undefined;
    const wrong = (first!.answer + 1) % 3;
    const r = scoreExam(set, { [first!.id]: wrong });
    expect(r.itemResults.find((x) => x.id === first!.id)?.ok).toBe(false);
  });

  it("examen en blanco no aprueba: 0% queda bajo el corte 60", () => {
    const r = scoreExam(set, {});
    expect(r.totalPct).toBe(0);
    expect(r.pass).toBe(false);
  });
});

/* ── fixture SINTÉTICO: control exacto del baremo (Sprechen pesos, Schreiben
   3×3+1, corte 60% no tautológico) — lo que el set real no permite fijar ── */
const mini = {
  id: "sim-test",
  title: "Mini",
  sections: [
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 1,
      teile: [{
        n: 1, instruction: "", items: [
          { kind: "hoeren-mc", id: "h1", question: "q1", options: ["a", "b", "c"], answer: 1 },
          { kind: "hoeren-mc", id: "h2", question: "q2", options: ["a", "b", "c"], answer: 0 },
        ],
      }],
    },
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 1,
      teile: [{ n: 1, instruction: "", items: [
        { kind: "schreiben-message", id: "s1", prompt: "", points: ["p1", "p2", "p3"] },
      ]}],
    },
    {
      skill: "sprechen",
      label: "Sprechen",
      minutes: 1,
      teile: [{ n: 1, instruction: "", items: [
        { kind: "sprechen", id: "t1", teil: 1, prompt: "T1", weight: 3 },
        { kind: "sprechen", id: "t2", teil: 2, prompt: "T2", weight: 1.5 },
      ]}],
    },
  ],
} as never;

describe("baremos finos (fixture sintético)", () => {
  it("Schreiben 3×3+1: leit [3,2,1] + gestaltung = 7/10", () => {
    const r = scoreExam(mini, { s1: { leit: [3, 2, 1], gestaltung: true } });
    expect(r.bySkill.schreiben.max).toBe(10);
    expect(r.bySkill.schreiben.got).toBe(7);
  });

  it("Schreiben en blanco = 0/10 con fila de resultado ok=false", () => {
    const r = scoreExam(mini, {});
    expect(r.bySkill.schreiben.got).toBe(0);
    expect(r.itemResults.find((x) => x.id === "s1")?.ok).toBe(false);
  });

  it("Sprechen pesa por teil: T1(3) bien + T2(1.5) mal = 3/4.5", () => {
    const r = scoreExam(mini, { t1: 1, t2: 0 });
    expect(r.bySkill.sprechen.max).toBe(4.5);
    expect(r.bySkill.sprechen.got).toBe(3);
  });

  it("Sprechen a medias (0.5) suma la mitad del peso", () => {
    const r = scoreExam(mini, { t2: 0.5 });
    expect(r.bySkill.sprechen.got).toBeCloseTo(0.75);
  });

  it("corte 60% NO tautológico: 9/16.5 = 55% suspende; 10.5/16.5 = 64% aprueba", () => {
    // max total del mini: hören 2 + schreiben 10 + sprechen 4.5 = 16.5
    const casi = scoreExam(mini, { h1: 1, h2: 0, s1: { leit: [3, 2, 2], gestaltung: false }, t1: 0, t2: 0 });
    expect(casi.totalPct).toBeLessThan(60);
    expect(casi.pass).toBe(false);
    const justo = scoreExam(mini, { h1: 1, h2: 0, s1: { leit: [3, 3, 2], gestaltung: true }, t1: 0, t2: 0.5 });
    expect(justo.totalPct).toBeGreaterThanOrEqual(60);
    expect(justo.pass).toBe(true);
  });
});

const official = {
  id: "sim-official",
  title: "Official",
  sections: [
    {
      skill: "hoeren",
      label: "Hören",
      minutes: 1,
      teile: [{
        n: 1, instruction: "", items: [
          {
            kind: "hoeren-notes",
            id: "hn",
            audio: "Mein Name ist Müller. Ich wohne in Berlin.",
            twice: true,
            gaps: [
              { id: "g1", prompt: "Name", promptEs: "Nombre", answers: ["Müller", "Mueller"] },
              { id: "g2", prompt: "Ort", promptEs: "Lugar", answers: ["Berlin"], maxWords: 2 },
            ],
          },
          {
            kind: "hoeren-photo-match",
            id: "hp",
            audio: "Am Montag gehe ich in die Bibliothek.",
            photos: [
              { key: "a", scene: "library", sceneEs: "biblioteca" },
              { key: "b", scene: "kitchen", sceneEs: "cocina" },
              { key: "c", scene: "park", sceneEs: "parque" },
              { key: "d", scene: "office", sceneEs: "oficina" },
              { key: "e", scene: "home", sceneEs: "casa" },
            ],
            items: [
              { id: "hp1", prompt: "Montag", promptEs: "lunes", answer: "a" },
              { id: "hp2", prompt: "Dienstag", promptEs: "martes", answer: "c" },
            ],
          },
        ],
      }],
    },
    {
      skill: "schreiben",
      label: "Schreiben",
      minutes: 1,
      teile: [{ n: 1, instruction: "", items: [
        { kind: "schreiben-message", id: "sm12", prompt: "", points: ["p1", "p2", "p3"], points_max: 12 },
      ]}],
    },
  ],
} as never;

describe("kinds oficiales (hoeren-notes, photo-match, schreiben points_max)", () => {
  it("hoeren-notes: acierto con gradeText; más de maxWords es fallo", () => {
    const ok = scoreExam(official, { hn: { g1: "Müller", g2: "Berlin" } });
    expect(ok.itemResults.find((x) => x.id === "g1")?.ok).toBe(true);
    expect(ok.itemResults.find((x) => x.id === "g2")?.ok).toBe(true);
    expect(ok.bySkill.hoeren.got).toBe(2);
    const long = scoreExam(official, { hn: { g1: "Müller", g2: "Berlin city center" } });
    expect(long.itemResults.find((x) => x.id === "g2")?.ok).toBe(false);
    const alt = scoreExam(official, { hn: { g1: "Mueller", g2: "Berlin" } });
    expect(alt.itemResults.find((x) => x.id === "g1")?.ok).toBe(true);
  });

  it("hoeren-photo-match: answers[container] = Record<itemId, photoKey>", () => {
    const r = scoreExam(official, { hp: { hp1: "a", hp2: "c" } });
    expect(r.itemResults.find((x) => x.id === "hp1")?.ok).toBe(true);
    expect(r.itemResults.find((x) => x.id === "hp2")?.ok).toBe(true);
    const wrong = scoreExam(official, { hp: { hp1: "b", hp2: "c" } });
    expect(wrong.itemResults.find((x) => x.id === "hp1")?.ok).toBe(false);
    expect(wrong.itemResults.find((x) => x.id === "hp2")?.ok).toBe(true);
  });

  it("schreiben-message con points_max 12: blanco 0/12; raw 10 → 12", () => {
    const blank = scoreExam(official, {});
    expect(blank.bySkill.schreiben.max).toBe(12);
    expect(blank.bySkill.schreiben.got).toBe(0);
    expect(blank.itemResults.find((x) => x.id === "sm12")?.ok).toBe(false);
    const full = scoreExam(official, { sm12: { leit: [3, 3, 3], gestaltung: true } });
    expect(full.bySkill.schreiben.got).toBe(12);
    expect(full.bySkill.schreiben.max).toBe(12);
  });

  it("lesen-notes: acierto con gradeText; más de maxWords es fallo", () => {
    const set = {
      id: "en-ln",
      title: "LN",
      sections: [{
        skill: "lesen",
        label: "Reading",
        minutes: 1,
        teile: [{
          title: "R4", instruction: "", instructionEs: "", items: [{
            kind: "lesen-notes",
            id: "ln",
            title: "T",
            text: "She trained as a librarian.",
            gaps: [
              { id: "q1", prompt: "Job?", promptEs: "¿Oficio?", answers: ["librarian", "a librarian"], maxWords: 5 },
            ],
          }],
        }],
      }],
    } as never;
    expect(scoreExam(set, { ln: { q1: "librarian" } }).itemResults.find((x) => x.id === "q1")?.ok).toBe(true);
    expect(scoreExam(set, { ln: { q1: "she was a very famous librarian indeed" } }).itemResults.find((x) => x.id === "q1")?.ok).toBe(false);
  });
});

describe("LanguageCert B2 Communicator — 26 + 26", () => {
  it("Set A y B: Listening 26 y Reading 26 (huecos de notes puntúan)", () => {
    for (const set of [examEnB2A, examEnB2B]) {
      const r = scoreExam(set, {});
      expect(r.bySkill.hoeren.max, `${set.id} listening`).toBe(26);
      expect(r.bySkill.lesen.max, `${set.id} reading`).toBe(26);
    }
  });
});

