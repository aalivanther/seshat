import { afterEach, describe, expect, it, vi } from "vitest";
import {
  tRektion, tIndirectQuestionEn, tConditionalEn, tPerfectPastBucketEn, tSayTellBucketEn,
  levelTemplatesFor, levelBucketsFor, buildReviewSession,
} from "@/lib/reviewSession";
import { course, courseOf } from "@/data/course";
import { buildRetoDeck } from "@/lib/retoRun";
import { retoSourceFor } from "@/lib/contentSlices";
import type { RetoCandidate } from "@/lib/retoRun";
import type { Exercise, ItemStat, ServerState, VocabItem } from "@/lib/types";

// Plantillas de NIVEL en INGLÉS (PLAN-MOTOR-EN §4, P9). Dos contratos que hay
// que poder demostrar, no solo afirmar:
//   1. cada plantilla resuelve su caso feliz y calla cuando no hay materia;
//   2. el repaso ALEMÁN no cambia ni un ejercicio para el mismo estado.

const card = (id: string, target: string, gram?: VocabItem["gram"]): VocabItem =>
  ({ id, target, source: "…", gram });
/** cualquier `gram` sirve de llave: lo que se prohíbe es la tarjeta pelada */
const G: VocabItem["gram"] = { trap: "algo mal escrito" };

const answersOf = (e: Exercise | null) => (e as { answers: string[] } | null)?.answers;
const textOf = (e: Exercise | null) => (e as { text: string } | null)?.text;

afterEach(() => vi.unstubAllGlobals());

/* ── 1. rección sin caso: phrasal verbs y colocaciones ── */

describe("tRektion sin `case` (inglés)", () => {
  it("una colocación inglesa genera un cloze válido con el hueco en la preposición", () => {
    const ex = tRektion(card("en1", "It depends on the weather.", {
      rektion: { prep: "on", stem: "depend" },
    }), "r1");
    expect(ex).not.toBeNull();
    expect(ex!.type).toBe("cloze");
    expect(textOf(ex)).toBe("It depends ___ the weather.");
    expect(answersOf(ex)).toEqual(["on"]);
  });

  it("sin caso, el consejo NO habla de acusativo ni de dativo", () => {
    const ex = tRektion(card("en2", "I'm looking forward to the weekend.", {
      rektion: { prep: "to", stem: "look forward" },
    }), "r2");
    expect(textOf(ex)).toBe("I'm looking forward ___ the weekend.");
    const tip = (ex as { tip: string }).tip;
    expect(tip).not.toMatch(/Akkusativ|Dativ/);
    expect(tip).toContain("look forward + to");
  });

  it("con caso (alemán) el consejo sigue diciendo el caso, palabra por palabra", () => {
    const ex = tRektion(card("de1", "Ich warte auf den Bus.", {
      rektion: { prep: "auf", case: "akk", stem: "warten" },
    }), "r3");
    expect((ex as { tip: string }).tip)
      .toBe("warten + auf + Akkusativ — se aprende en bloque, como una palabra.");
  });
});

/* ── 2. pregunta indirecta: la inversión que se queda dentro ── */

describe("tIndirectQuestionEn", () => {
  it("deshace la inversión con be, con modales y con have", () => {
    const casos: [string, string][] = [
      ["Where is she?", "I wonder where she is."],
      ["Why are you sad?", "I wonder why you are sad."],
      ["What have you done?", "I wonder what you have done."],
      ["How long have you lived here?", "I wonder how long you have lived here."],
      ["Where can I buy tickets?", "I wonder where I can buy tickets."],
      ["What time is it?", "I wonder what time it is."],
    ];
    for (const [q, esperado] of casos) {
      const ex = tIndirectQuestionEn(card("q", q, G), "i");
      expect(ex, q).not.toBeNull();
      expect(ex!.type).toBe("transform");
      expect(answersOf(ex)![0], q).toBe(esperado);
    }
  });

  it("la pregunta de sí/no entra con «if»", () => {
    expect(answersOf(tIndirectQuestionEn(card("q", "Are you tired?", G), "i"))![0])
      .toBe("I wonder if you are tired.");
    expect(answersOf(tIndirectQuestionEn(card("q", "Can he swim?", G), "i"))![0])
      .toBe("I wonder if he can swim.");
  });

  it("las de do/does/did se quedan fuera: exigirían reconjugar el verbo", () => {
    // «Where does she live?» → «where she liveS»: una plantilla que se
    // equivoca al conjugar enseña algo falso, así que mejor callar
    expect(tIndirectQuestionEn(card("q", "Where does she live?", G), "i")).toBeNull();
    expect(tIndirectQuestionEn(card("q", "When did you arrive?", G), "i")).toBeNull();
  });

  it("sin gram, sin pregunta o sin sujeto pronombre → null", () => {
    expect(tIndirectQuestionEn(card("q", "Where is she?"), "i")).toBeNull();
    expect(tIndirectQuestionEn(card("q", "She is at home.", G), "i")).toBeNull();
    expect(tIndirectQuestionEn(card("q", "Where is the station?", G), "i")).toBeNull();
  });
});

/* ── 3. condicionales ── */

describe("tConditionalEn", () => {
  it("el hueco cae en la mitad del «if» y la otra mitad da la respuesta", () => {
    const seg = tConditionalEn(card("c", "If I had more money, I would travel more.", G), "c");
    expect(seg!.type).toBe("cloze");
    expect(textOf(seg)).toBe("If I ___ more money, I would travel more.");
    expect(answersOf(seg)).toEqual(["had"]);

    const pri = tConditionalEn(card("c", "If you have time, I will call you.", G), "c");
    expect(textOf(pri)).toBe("If you ___ time, I will call you.");
    expect(answersOf(pri)).toEqual(["have"]);
  });

  it("«If I was you» se acepta igual que «If I were you»", () => {
    const ex = tConditionalEn(card("c", "If I were you, I would say no.", G), "c");
    expect(answersOf(ex)).toEqual(["were", "was"]);
  });

  it("si el verbo del «if» no es reconocible, el hueco va al modal", () => {
    const ex = tConditionalEn(card("c", "If it rains, we will stay at home.", G), "c");
    expect(textOf(ex)).toBe("If it rains, we ___ stay at home.");
    expect(answersOf(ex)).toEqual(["will"]);
  });

  it("también con la mitad del «if» al final", () => {
    const ex = tConditionalEn(card("c", "I will call you if I have time.", G), "c");
    expect(textOf(ex)).toBe("I will call you if I ___ time.");
    expect(answersOf(ex)).toEqual(["have"]);
  });

  it("el condicional cero no tiene modal que sirva de ancla: null", () => {
    expect(tConditionalEn(card("c", "If you heat water, it boils.", G), "c")).toBeNull();
  });

  it("sin gram y sin «if» → null", () => {
    expect(tConditionalEn(card("c", "If I had money, I would go."), "c")).toBeNull();
    expect(tConditionalEn(card("c", "I would travel more.", G), "c")).toBeNull();
  });
});

/* ── 4. present perfect vs pasado simple: manda el adverbio ── */

describe("tPerfectPastBucketEn", () => {
  const pool = [
    card("a", "I saw her two years ago.", G),
    card("b", "I went to London last week.", G),
    card("c", "I have just finished.", G),
    card("d", "I have lived here since 2019.", G),
    card("e", "I never drink coffee."), // sin gram: no entra
  ];

  it("clasifica los MARCADORES, no las frases (la frase enseñaría el tiempo)", () => {
    const ex = tPerfectPastBucketEn(pool, "p")!;
    expect(ex.type).toBe("bucket");
    const items = (ex as { items: { text: string; bucket: 0 | 1 }[] }).items;
    const byText = Object.fromEntries(items.map((i) => [i.text, i.bucket]));
    expect(byText["two years ago"]).toBe(0);
    expect(byText["last week"]).toBe(0);
    expect(byText["just"]).toBe(1);
    expect(byText["since 2019"]).toBe(1);
    // ninguna ficha entera: solo el marcador
    for (const i of items) expect(i.text).not.toContain("I ");
    // la tarjeta sin gram no aporta materia
    expect(byText["never"]).toBeUndefined();
  });

  it("una frase con dos marcadores opuestos no entra (no enseñaría nada)", () => {
    const raro = [...pool, card("f", "I have never been there since last year.", G)];
    const items = (tPerfectPastBucketEn(raro, "p") as { items: { text: string }[] }).items;
    for (const i of items) expect(["never", "since last year"]).not.toContain(i.text);
  });

  it("con menos de 2 de un lado no se genera", () => {
    expect(tPerfectPastBucketEn(pool.slice(0, 3), "p")).toBeNull();
    expect(tPerfectPastBucketEn([], "p")).toBeNull();
  });
});

/* ── 5. say vs tell ── */

describe("tSayTellBucketEn", () => {
  const pool = [
    card("h", "He told me the truth.", G),
    card("i", "She told us a story.", G),
    card("j", "He said that he was tired.", G),
    card("k", "She said hello to me.", G),
  ];

  it("tapa el verbo y clasifica por lo que viene DETRÁS", () => {
    const ex = tSayTellBucketEn(pool, "s")!;
    const items = (ex as { items: { text: string; bucket: 0 | 1 }[] }).items;
    const byText = Object.fromEntries(items.map((i) => [i.text, i.bucket]));
    expect(byText["He ___ me the truth."]).toBe(0);
    expect(byText["She ___ us a story."]).toBe(0);
    expect(byText["He ___ that he was tired."]).toBe(1);
    expect(byText["She ___ hello to me."]).toBe(1);
    for (const i of items) expect(i.text).not.toMatch(/\b(said|told)\b/);
  });

  it("una tarjeta con el calco NO se sirve como modelo (eso es de tErrorFix)", () => {
    const conCalco = [...pool, card("l", "He said me the truth.", G)];
    const items = (tSayTellBucketEn(conCalco, "s") as { items: { text: string }[] }).items;
    expect(items).toHaveLength(4); // la quinta no entra
  });

  it("sin 2 de cada lado → null", () => {
    expect(tSayTellBucketEn(pool.slice(0, 3), "s")).toBeNull();
  });
});

/* ── 6. reparto por idioma: cada uno con lo suyo ── */

describe("levelTemplatesFor / levelBucketsFor", () => {
  const ids = () => {
    let n = 0;
    return () => `x${++n}`;
  };

  it("el inglés NO recibe plantillas alemanas", () => {
    // tK2Hoeflich buscaba «hat» en la tabla del Konjunktiv II y convertía
    // «I have a hat» en «I have a hätte»; tDaWo fabricaba «worauf» para
    // colocaciones inglesas. Con el reparto por idioma no pueden pasar.
    const v = card("en", "I have a hat.", { rektion: { prep: "a", stem: "have" } });
    const out = levelTemplatesFor("en", v, ids(), 5).filter(Boolean) as Exercise[];
    for (const e of out) {
      expect(JSON.stringify(e)).not.toMatch(/hätte|worauf|darauf|Konjunktiv/);
    }
  });

  it("el alemán conserva las cinco de B1 al frente; B2 calla sin flags", () => {
    const v = card("de", "Ich warte auf den Bus.", {
      rektion: { prep: "auf", case: "akk", stem: "warten" },
    });
    const out = levelTemplatesFor("de", v, ids(), 5);
    expect(out[0]!.type).toBe("cloze"); // tRektion
    expect(out[1]!.type).toBe("type"); // tDaWo
    expect(out.slice(5).every((e) => e === null)).toBe(true);
  });

  it("los cubos de sesión también se reparten por idioma", () => {
    const konnPool = [
      card("1", "weil", { konn: "sub" }), card("2", "obwohl", { konn: "sub" }),
      card("3", "deshalb", { konn: "adv" }), card("4", "trotzdem", { konn: "adv" }),
    ];
    expect(levelBucketsFor("de", konnPool, "b")).toHaveLength(1);
    expect(levelBucketsFor("en", konnPool, "b")).toHaveLength(0);
  });

  it("sin gram no hay plantilla de nivel inglesa: el A1 se queda como estaba", () => {
    const pelada = card("a1", "Where is she?");
    expect(levelTemplatesFor("en", pelada, ids(), 9).filter(Boolean)).toHaveLength(0);
    expect(levelBucketsFor("en", [pelada], "b")).toHaveLength(0);
  });
});

/* ── 7. el repaso ALEMÁN no cambia ni un ejercicio ── */

// Firma de una sesión alemana con Math.random fijado: tipo + ítems de cada
// ejercicio, en orden. Si esta lista se mueve, es que el alemán ha cambiado y
// hay que mirar por qué.
//
// RE-CAPTURADA en P17. El sorteo, el cupo de nivel y el cierre no se
// reescribieron. Con dos géneros y dos sustantivos vistos en cada uno, dos
// huecos seguidos preguntan el artículo: por eso las tres semillas cambian
// justo en ese par. El cierre no se presta. Semilla 3 sigue cerrando en la
// traducción hacia el idioma (bezahlbar).
const ORO: string[][] = [
  ["mc:b1m1mietvertrag","mc:b1m1muelltrennung","match:b1m1wohnungsnot+b1m1laerm+b1m1achtenauf+b1m1trotzdem","cloze:b1m1dass","type:b1m1bezahlbar","cloze:b1m1sichkuemmernum","listen:b1m1trotzdem","listen:b1m1sichbeschwerenueber","errorfix:b1m1sondern","type:b1m1laerm"],
  ["mc:b1m1muelltrennung","mc:b1m1mietvertrag","match:b1m1unterschreiben+b1m1achtenauf+b1m1laerm+b1m1wohnungsnot","cloze:b1m1dass","transform:b1m1ausserdem","listen:b1m1achtenauf","errorfix:b1m1sondern","cloze:b1m1sichkuemmernum","listen:b1m1wohnungsnot","type:b1m1treppenhaus"],
  ["type:b1m1achtenauf","mc:b1m1laerm","mc:b1m1muelltrennung","transform:b1m1dass","listen:b1m1wohnungsnot","translate:b1m1unterschreiben","match:b1m1sichbeschwerenueber+b1m1mietvertrag+b1m1bezahlbar+b1m1sondern","listen:b1m1ausserdem","cloze:b1m1sichbeschwerenueber","translate:b1m1bezahlbar"],
];

function stat(): ItemStat {
  return {
    correct: 3, wrong: 1, streak: 3, intervalDays: 1,
    nextReview: "2020-01-01T00:00:00.000Z", lastSeen: "2020-01-01T00:00:00.000Z",
  };
}
const IDS = [
  "b1m1sichbeschwerenueber", "b1m1sichkuemmernum", "b1m1achtenauf",
  "b1m1dass", "b1m1ausserdem", "b1m1trotzdem", "b1m1sondern",
  "b1m1mietvertrag", "b1m1laerm", "b1m1treppenhaus", "b1m1bezahlbar",
  "b1m1wohnungsnot", "b1m1unterschreiben", "b1m1muelltrennung",
];
const ST: ServerState = {
  lessons: {}, items: Object.fromEntries(IDS.map((id) => [id, stat()])),
  xp: 0, streakDays: 0, lastActive: "2026-08-19",
};

/** congelador de Math.random: la sesión usa azar, así que sin esto no hay
 *  forma de comparar «antes» con «después» */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

describe("regresión: el repaso alemán sale igual que antes del inglés", () => {
  it("mismo estado y mismo azar → misma sesión, ejercicio a ejercicio", () => {
    for (let seed = 1; seed <= ORO.length; seed++) {
      vi.spyOn(Math, "random").mockImplementation(lcg(seed));
      const { exercises } = buildReviewSession(ST, true, "de", course.vocab);
      vi.restoreAllMocks();
      expect(exercises.map((e) => `${e.type}:${(e.itemIds ?? []).join("+")}`), `semilla ${seed}`)
        .toEqual(ORO[seed - 1]);
      let junto = false;
      for (let i = 0; i < exercises.length - 1; i++) {
        const a = exercises[i];
        const b = exercises[i + 1];
        if (a?.type !== "mc" || b?.type !== "mc") continue;
        if (!a.question.startsWith("¿der, die o das?") || !b.question.startsWith("¿der, die o das?")) continue;
        if (a.answer === b.answer) continue;
        junto = true;
      }
      expect(junto, `semilla ${seed} sin contraste de artículo`).toBe(true);
    }
  });

  it("un B1 alemán sigue recibiendo ejercicios de NIVEL (el cupo funciona)", () => {
    vi.spyOn(Math, "random").mockImplementation(lcg(1));
    const { exercises } = buildReviewSession(ST, true, "de", course.vocab);
    vi.restoreAllMocks();
    // con ≥3 fichas con `gram` el cupo reserva dos huecos de nivel; aquí se ven
    // como errorfix (tErrorFix sobre gram.trap con racha ≥2)
    expect(exercises.some((e) => e.type === "errorfix")).toBe(true);
  });
});

/* ── 8. P5: `translate` y las plantillas de nivel entran en los RETOS ── */

// Los candidatos GENERADOS se reconocen por su id (`rg<semilla>-<n>`); los
// demás son ejercicios escritos a mano en el módulo.
const PROMPTS_NIVEL = [
  "Repaso — la preposición va pegada al verbo",
  "Repaso — pregunta por una COSA, no por una persona",
  "Repaso — «de ello / en ello» en UNA sola palabra",
  "Repaso — cortesía",
  "Repaso — esto lo escribió un hispanohablante. Arréglalo.",
  "Repaso — dilo de OTRA manera (mismo significado)",
  "Repaso — ¿qué le hace este conector al verbo?",
  "Repaso — la misma idea, otro traje",
  "Repaso — estilo indirecto de prensa",
  "Repaso — comprime o deshaz",
  "Repaso — el conector va en dos piezas",
  "Repaso — ¿con qué traje va este «se»?",
  "Repaso — el marcador que cose el texto",
  "Repaso — ¿formal o informal?",
];

describe("retos: lo que faltaba del P5", () => {
  const deckOf = (phaseId: string) => {
    const phase = [...course.phases, ...courseOf("en").phases].find((p) => p.id === phaseId)!;
    expect(phase, phaseId).toBeDefined();
    const deck = buildRetoDeck(phase, null, true, 7, retoSourceFor(phase.id));
    const all = [...deck.tramos[0], ...deck.tramos[1], ...deck.tramos[2]];
    return { deck, generados: all.filter((c) => c.ex.id.startsWith("rg")) };
  };

  it("`translate` ya es candidato: hacia el idioma en la cumbre, al español en el calentamiento", () => {
    const { deck } = deckOf("b1m1");
    const dir = (t: RetoCandidate[]) =>
      t.filter((c) => c.ex.type === "translate").map((c) => (c.ex as { direction: string }).direction);
    expect(dir(deck.tramos[2])).toContain("toTarget");
    expect(dir(deck.tramos[0])).toContain("toEs");
    // el hueco 10 sigue siendo type/transform: traducir no cambia esa regla
    for (const c of deck.final) expect(["type", "transform"]).toContain(c.ex.type);
  });

  it("un módulo B1 recibe plantillas de NIVEL en la run", () => {
    const { generados } = deckOf("b1m1");
    const nivel = generados.filter((c) => PROMPTS_NIVEL.includes(c.ex.prompt));
    expect(nivel.length).toBeGreaterThan(0);
  });

  it("un módulo A1 NO las recibe: sin `gram` no hay materia de nivel", () => {
    // la garantía de que esto no sube el nivel de un curso por debajo del B1
    for (const phaseId of ["f1", "ena1m1"]) {
      const { generados } = deckOf(phaseId);
      expect(
        generados.filter((c) => PROMPTS_NIVEL.includes(c.ex.prompt)), phaseId,
      ).toHaveLength(0);
    }
  });

  it("un módulo inglés no recibe NADA alemán", () => {
    const { generados } = deckOf("ena1m1");
    for (const c of generados) {
      expect(JSON.stringify(c.ex), c.ex.id).not.toMatch(/hätte|wäre|könnte|worauf|darauf|Akkusativ|Dativ/);
    }
  });
});
