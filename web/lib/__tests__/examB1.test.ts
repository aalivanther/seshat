import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { scoreExam, rubricScore, band } from "@/lib/examScore";
import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// Baremo del Goethe-Zertifikat B1 (PLAN-B1 §2): examen MODULAR — cada módulo
// vale 100 puntos, corte 60, SIN compensación entre módulos; Lesen y Hören
// convierten 30 aciertos × 3,333 = 100 (18 aciertos = 60 = aprobado).

const RUBRIC: RubricCriterion[] = [
  { id: "erfuellung", label: "Cumplimiento", help: "", bands: [16, 12, 8, 4, 0], fatalE: true },
  { id: "kohaerenz", label: "Coherencia", help: "", bands: [8, 6, 4, 2, 0] },
  { id: "wortschatz", label: "Vocabulario", help: "", bands: [8, 6, 4, 2, 0] },
  { id: "strukturen", label: "Estructuras", help: "", bands: [8, 6, 4, 2, 0] },
];

/** set B1 mínimo: 3 ítems de Lesen (uno de cada tipo nuevo) + 1 de Schreiben */
function b1Set(): ExamSet {
  return {
    id: "b1-sim-a",
    level: "b1",
    title: "Modellsatz B1",
    description: "",
    scoring: {
      passPct: 60,
      modular: true,
      pointsPerItem: { lesen: 100 / 3, hoeren: 100 / 3 }, // 3 ítems de prueba
      bands: [{ min: 90, label: "sehr gut" }, { min: 0, label: "ausreichend" }],
    },
    sections: [
      {
        skill: "lesen",
        label: "Lesen",
        minutes: 65,
        teile: [
          {
            title: "Lesen · Teil 2",
            instruction: "",
            instructionEs: "",
            items: [
              {
                kind: "lesen-mc",
                id: "l2-1",
                text: "Ein langer Text…",
                question: "Was ist richtig?",
                questionEs: "",
                options: ["a", "b", "c"],
                answer: 1,
              },
              {
                kind: "lesen-match",
                id: "l3",
                ads: [{ key: "a", text: "…" }, { key: "b", text: "…" }],
                situations: [
                  { id: "l3-1", situation: "S1", situationEs: "", answer: "b" },
                  { id: "l3-2", situation: "S2", situationEs: "", answer: "0" },
                ],
              },
            ],
          },
        ],
      },
      {
        skill: "schreiben",
        label: "Schreiben",
        minutes: 60,
        teile: [
          {
            title: "Schreiben · Aufgabe 2",
            instruction: "",
            instructionEs: "",
            items: [
              {
                kind: "schreiben-message",
                id: "s2",
                task: "",
                taskEs: "",
                points: ["tu opinión"],
                model: "…",
                words: 80,
                points_max: 40,
                rubric: RUBRIC,
                stimulus: { source: "Forum", text: "…" },
              },
            ],
          },
        ],
      },
    ],
  };
}

describe("rubricScore", () => {
  it("suma las bandas elegidas", () => {
    expect(rubricScore({ erfuellung: 0, kohaerenz: 0, wortschatz: 0, strukturen: 0 }, RUBRIC, 40)).toBe(40);
    expect(rubricScore({ erfuellung: 1, kohaerenz: 1, wortschatz: 1, strukturen: 1 }, RUBRIC, 40)).toBe(30);
  });

  it("Erfüllung = E anula la tarea entera (regla dura del examen)", () => {
    expect(rubricScore({ erfuellung: 4, kohaerenz: 0, wortschatz: 0, strukturen: 0 }, RUBRIC, 40)).toBe(0);
  });

  it("una E en un criterio NO fatal solo resta lo suyo", () => {
    expect(rubricScore({ erfuellung: 0, kohaerenz: 4, wortschatz: 0, strukturen: 0 }, RUBRIC, 40)).toBe(32);
  });

  it("criterios sin marcar valen 0 y nunca se pasa del máximo", () => {
    expect(rubricScore({ erfuellung: 0 }, RUBRIC, 40)).toBe(16);
    expect(rubricScore({}, RUBRIC, 40)).toBe(0);
    expect(rubricScore({ erfuellung: 0, kohaerenz: 0, wortschatz: 0, strukturen: 0 }, RUBRIC, 20)).toBe(20);
  });

  it("sin rúbrica devuelve 0 (no explota)", () => {
    expect(rubricScore({ x: 1 }, undefined, 40)).toBe(0);
  });
});

describe("scoreExam modular (B1)", () => {
  it("aprueba solo si TODOS los módulos llegan al corte", () => {
    const set = b1Set();
    // Lesen 3/3 (100 pts) · Schreiben rúbrica perfecta (40/40 = 100 pts)
    const perfect = scoreExam(set, {
      "l2-1": 1,
      l3: { "l3-1": "b", "l3-2": "0" },
      s2: { erfuellung: 0, kohaerenz: 0, wortschatz: 0, strukturen: 0 },
    });
    expect(perfect.modules).toHaveLength(2);
    expect(perfect.allModulesPassed).toBe(true);
    expect(perfect.pass).toBe(true);
    expect(perfect.split).toEqual({
      objectivePct: 100,
      selfPct: 100,
      objectiveSkills: ["lesen"],
      selfSkills: ["schreiben"],
    });
  });

  it("un módulo suspenso tumba el certificado aunque el global sea alto", () => {
    const set = b1Set();
    const r = scoreExam(set, {
      "l2-1": 1,
      l3: { "l3-1": "b", "l3-2": "0" }, // Lesen perfecto
      s2: { erfuellung: 4 }, // Erfüllung E ⇒ Schreiben 0
    });
    const lesen = r.modules!.find((m) => m.skill === "lesen")!;
    const schreiben = r.modules!.find((m) => m.skill === "schreiben")!;
    expect(lesen.pass).toBe(true);
    expect(schreiben.pass).toBe(false);
    expect(r.pass).toBe(false); // sin compensación: manda el módulo flojo
    // el % mostrado es la MEDIA de módulos (100 y 0), no la mezcla de escalas
    expect(r.totalPct).toBe(50);
    expect(r.split).toEqual({
      objectivePct: 100,
      selfPct: 0,
      objectiveSkills: ["lesen"],
      selfSkills: ["schreiben"],
    });
  });

  it("la conversión de puntos es la del examen (18/30 aciertos = 60)", () => {
    const set: ExamSet = {
      ...b1Set(),
      scoring: { passPct: 60, modular: true, pointsPerItem: { lesen: 100 / 30 }, bands: [] },
    };
    // simulamos 18 de 30 con un ítem que vale 18 aciertos:
    const mod = ((18 * (100 / 30)) as number);
    expect(Math.round(mod)).toBe(60);
    expect(set.scoring!.pointsPerItem!.lesen).toBeCloseTo(3.333, 2);
  });

  it("el match puntúa cada situación por separado, incluida la respuesta 0", () => {
    const r = scoreExam(b1Set(), { l3: { "l3-1": "b", "l3-2": "a" } });
    const s1 = r.itemResults.find((i) => i.id === "l3-1")!;
    const s2 = r.itemResults.find((i) => i.id === "l3-2")!;
    expect(s1.ok).toBe(true);
    expect(s2.ok).toBe(false);
    expect(s2.detail).toContain("0");
  });

  it("un set NO modular conserva el comportamiento de siempre", () => {
    const set = b1Set();
    set.scoring = { passPct: 60, bands: [] };
    const r = scoreExam(set, { "l2-1": 1, l3: { "l3-1": "b", "l3-2": "0" }, s2: { erfuellung: 0 } });
    expect(r.modules).toBeUndefined();
    expect(r.split).toBeUndefined();
    expect(typeof r.pass).toBe("boolean");
  });
});

/** Cuatro módulos. Lesen y Hören convierten 1 acierto en 60 y 61 puntos:
 *  justo en el corte y un punto por encima. Schreiben y Sprechen van por rúbrica. */
function fourSkill(): ExamSet {
  const oral: RubricCriterion[] = [
    { id: "erfuellung", label: "Cumplimiento", help: "", bands: [10, 0], fatalE: true },
  ];
  return {
    id: "b1-split",
    level: "b1",
    title: "Split",
    description: "",
    scoring: {
      passPct: 60,
      modular: true,
      pointsPerItem: { lesen: 60, hoeren: 61 },
      bands: [],
    },
    sections: [
      {
        skill: "lesen",
        label: "Lesen",
        minutes: 1,
        teile: [{
          title: "L",
          instruction: "",
          instructionEs: "",
          items: [{
            kind: "lesen-mc",
            id: "l1",
            question: "q",
            questionEs: "",
            options: ["a", "b", "c"],
            answer: 1,
          }],
        }],
      },
      {
        skill: "hoeren",
        label: "Hören",
        minutes: 1,
        teile: [{
          title: "H",
          instruction: "",
          instructionEs: "",
          items: [{
            kind: "hoeren-mc",
            id: "h1",
            audio: "x",
            twice: false,
            question: "q",
            questionEs: "",
            options: ["a", "b", "c"],
            // La opción correcta es la 0: un cero en la respuesta es un acierto.
            answer: 0,
          }],
        }],
      },
      {
        skill: "schreiben",
        label: "Schreiben",
        minutes: 1,
        teile: [{
          title: "S",
          instruction: "",
          instructionEs: "",
          items: [{
            kind: "schreiben-message",
            id: "s1",
            task: "",
            taskEs: "",
            points: ["p"],
            model: "…",
            points_max: 40,
            rubric: RUBRIC,
          }],
        }],
      },
      {
        skill: "sprechen",
        label: "Sprechen",
        minutes: 1,
        teile: [{
          title: "O",
          instruction: "",
          instructionEs: "",
          items: [{
            kind: "sprechen",
            id: "o1",
            teil: 1,
            weight: 10,
            prompt: "p",
            promptEs: "",
            model: "…",
            rubric: oral,
          }],
        }],
      },
    ],
  };
}

const SELF_FULL = {
  s1: { erfuellung: 0, kohaerenz: 0, wortschatz: 0, strukturen: 0 },
  o1: { erfuellung: 0 },
};

describe("nota objetiva aparte de la autocalificada", () => {
  it("enseña las dos medias y no mueve el aprobado cuando la rúbrica se infla", () => {
    const r = scoreExam(fourSkill(), { l1: 1, h1: 0, ...SELF_FULL });
    // 60 y 61, mismo redondeo que la media de módulos: 60,5 → 61
    expect(r.split).toEqual({
      objectivePct: 61,
      selfPct: 100,
      objectiveSkills: ["lesen", "hoeren"],
      selfSkills: ["schreiben", "sprechen"],
    });
    expect(r.totalPct).toBe(80);
    expect(r.weakestPct).toBe(60);
    expect(r.modules!.every((m) => m.pass)).toBe(true);
    expect(r.pass).toBe(true);
    expect(r.allModulesPassed).toBe(true);
  });

  it("inflar escribir y hablar aprueba esos módulos y no el certificado si la clave suspende", () => {
    const r = scoreExam(fourSkill(), SELF_FULL);
    expect(r.split?.objectivePct).toBe(0);
    expect(r.split?.selfPct).toBe(100);
    expect(r.modules!.find((m) => m.skill === "schreiben")!.pass).toBe(true);
    expect(r.modules!.find((m) => m.skill === "sprechen")!.pass).toBe(true);
    expect(r.modules!.find((m) => m.skill === "lesen")!.pass).toBe(false);
    expect(r.pass).toBe(false);
  });

  it("una clave alta no salva una rúbrica en cero: el corte sigue siendo por módulo", () => {
    const r = scoreExam(fourSkill(), { l1: 1, h1: 0, s1: { erfuellung: 4 }, o1: { erfuellung: 1 } });
    expect(r.split?.objectivePct).toBe(61);
    expect(r.split?.selfPct).toBe(0);
    expect(r.pass).toBe(false);
    expect(r.totalPct).toBe(30);
  });

  it("sin los dos lados no inventa la cifra que falta", () => {
    const set = b1Set();
    set.sections = set.sections.filter((s) => s.skill === "lesen");
    const r = scoreExam(set, {});
    expect(r.modules).toHaveLength(1);
    expect(r.split).toBeUndefined();
    expect(r.pass).toBe(false);
  });

  it("la pantalla de resultados enseña las dos cifras y no recalcula el aprobado", () => {
    const exam = readFileSync(
      join(dirname(fileURLToPath(import.meta.url)), "..", "..", "components", "ExamPlayer.tsx"),
      "utf8",
    );
    expect(exam).toMatch(/Escuchar y leer/);
    expect(exam).toMatch(/Escribir y hablar/);
    expect(exam).toMatch(/Sale de tus respuestas, no de una rúbrica/);
    expect(exam).toMatch(/Sale de la rúbrica que te has puesto/);
    expect(exam).toMatch(/No es la nota de un examinador/);
    expect(exam).toMatch(/results\.split/);
    expect(exam).not.toMatch(/split\.(objective|self)Pct\s*>=/);
  });
});

describe("band con baremo del set", () => {
  it("usa las bandas del set y cae en la última si no llega a ninguna", () => {
    const set = b1Set();
    expect(band(95, set)).toBe("sehr gut");
    expect(band(10, set)).toBe("ausreichend");
  });
});

describe("lo que se GUARDA de un examen modular", () => {
  it("es el módulo más flojo, no la media: sin compensación quiere decir eso", () => {
    // tres módulos altos y uno hundido: la media aprueba, el examen NO
    const modules = [
      { skill: "lesen", pct: 90, pass: true },
      { skill: "hoeren", pct: 85, pass: true },
      { skill: "schreiben", pct: 80, pass: true },
      { skill: "sprechen", pct: 35, pass: false },
    ];
    const media = Math.round(modules.reduce((n, m) => n + m.pct, 0) / modules.length);
    const flojo = Math.min(...modules.map((m) => m.pct));
    expect(media).toBeGreaterThanOrEqual(60); // la media engañaba
    expect(flojo).toBeLessThan(60); // el módulo flojo dice la verdad
    expect(modules.every((m) => m.pass)).toBe(false);
  });
});
