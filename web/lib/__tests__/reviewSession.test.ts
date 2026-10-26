import { describe, expect, it, vi } from "vitest";
import { articleContrastPair, buildReviewSession, seenCount, seenItems, tPlural, tTranslate } from "@/lib/reviewSession";
import { course } from "@/data/course";
import { modeOfExercise } from "@/lib/types";
import type { Exercise, ItemStat, ServerState, VocabItem } from "@/lib/types";

// buildReviewSession usa Math.random: cada regla se verifica en 20 corridas
// para cazar flakiness, no solo una tirada con suerte.

const POOL = [
  "hallo", "tschuess", "aufwiedersehen", "bisspaeter", "ichheisse", "wieheisstdu",
  "hund", "katze", "pferd", "wetter", "regen", "muede", "gluecklich", "traurig", "danke",
];

function itemStat(dueOffsetMs: number): ItemStat {
  return {
    correct: 3,
    wrong: 1,
    streak: 2,
    intervalDays: 1,
    nextReview: new Date(Date.now() + dueOffsetMs).toISOString(),
    lastSeen: new Date().toISOString(),
  };
}

function mkState(ids: string[], dueOffsetMs = -3_600_000): ServerState {
  return {
    lessons: {},
    items: Object.fromEntries(ids.map((id) => [id, itemStat(dueOffsetMs)])),
    xp: 0,
    streakDays: 0,
    lastActive: "2026-08-08",
  };
}

// «producir» = lo que dice el propio motor, no una lista a mano que se queda
// vieja en cuanto se añade un tipo (pasó con `translate`: traducir hacia el
// idioma es producción pura y el test lo contaba como si no). La cuota y el
// cierre usan la misma definición.
const isProd = (e: Exercise) => modeOfExercise(e) === "produce";
// La lista que la cuota usaba antes de mirar el modo. Sirve para demostrar
// que una traducción hacia el idioma cubre cupo que esa lista no veía.
const listaVieja = (e: Exercise) =>
  e.type === "type" || e.type === "cloze" || e.type === "listen" || e.type === "transform";

/** mismo congelador que el de la regresión del repaso alemán: sin semilla
 *  no se puede afirmar que la traducción hacia el idioma entra en el cupo */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

it("sanity: los ids del pool sintético existen en course.vocab", () => {
  for (const id of POOL) expect(course.vocab[id], `falta ${id} en course.vocab`).toBeDefined();
});

describe("buildReviewSession — invariantes en 20 corridas", () => {
  const runs = Array.from({ length: 20 }, (_, i) =>
    buildReviewSession(mkState(POOL, i % 2 === 0 ? -3_600_000 : 3_600_000), i % 2 === 0, "de", course.vocab),
  );

  it("devuelve entre 1 y 10 ejercicios (SESSION_SIZE, no +2)", () => {
    for (const { exercises } of runs) {
      expect(exercises.length).toBeGreaterThanOrEqual(1);
      expect(exercises.length).toBeLessThanOrEqual(10);
    }
  });

  it("cierra SIEMPRE en un ejercicio productivo (modeOfExercise)", () => {
    for (const { exercises } of runs) {
      const last = exercises[exercises.length - 1];
      expect(isProd(last), `cierre en ${last.type}`).toBe(true);
    }
  });

  it("≥40% de los ejercicios son de producción", () => {
    for (const { exercises } of runs) {
      const prod = exercises.filter(isProd).length;
      expect(prod / exercises.length).toBeGreaterThanOrEqual(0.4);
    }
  });

  it("mc: ≤4 opciones, únicas, answer en rango y correcto donde apunta", () => {
    for (const { exercises } of runs) {
      for (const e of exercises) {
        if (e.type !== "mc") continue;
        expect(e.options.length).toBeLessThanOrEqual(4);
        expect(new Set(e.options).size).toBe(e.options.length);
        expect(e.answer).toBeGreaterThanOrEqual(0);
        expect(e.answer).toBeLessThan(e.options.length);
      }
    }
  });

  it("ninguna opción de mc baja de 3 caracteres (los distractores cortos se filtran)", () => {
    for (const { exercises } of runs) {
      for (const e of exercises) {
        if (e.type !== "mc") continue;
        for (const o of e.options) expect(o.length, `opción corta: «${o}»`).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("todos los itemIds de la sesión existen en course.vocab", () => {
    for (const { exercises } of runs) {
      for (const e of exercises) {
        for (const id of e.itemIds ?? []) expect(course.vocab[id], id).toBeDefined();
      }
    }
  });
});

describe("buildReviewSession — pools chicos y estado nulo", () => {
  it("con <4 ítems vistos devuelve sesión vacía", () => {
    expect(buildReviewSession(mkState(POOL.slice(0, 3)), false, "de", course.vocab).exercises).toEqual([]);
  });

  it("con estado null devuelve sesión vacía", () => {
    expect(buildReviewSession(null, false, "de", course.vocab).exercises).toEqual([]);
  });

  it("ids que no existen en el curso se ignoran (3 reales + 2 fantasma = vacía)", () => {
    const st = mkState(["hallo", "danke", "hund", "zzz-fantasma-1", "zzz-fantasma-2"]);
    expect(seenItems(st, course.vocab)).toHaveLength(3);
    expect(buildReviewSession(st, false, "de", course.vocab).exercises).toEqual([]);
  });

  it("con exactamente 4 vistos ya construye sesión", () => {
    const { exercises } = buildReviewSession(mkState(POOL.slice(0, 4)), false, "de", course.vocab);
    expect(exercises.length).toBeGreaterThanOrEqual(1);
  });

  it("seenItems(null) → []", () => {
    expect(seenItems(null, course.vocab)).toEqual([]);
  });

  it("seenCount (solo ids) cuenta lo mismo que seenItems con las tarjetas", () => {
    // ids del curso, uno inventado y uno inglés: la mochila alemana no los mezcla
    const st = mkState([...POOL, "no-existe", "enhello"]);
    expect(seenCount(st, "de")).toBe(seenItems(st, course.vocab).length);
    expect(seenCount(null, "de")).toBe(0);
  });
});

describe("tPlural acepta el plural con y sin artículo", () => {
  it("una ficha que guarda «die Traditionen» también da por buena «Traditionen»", () => {
    const v = {
      id: "b1m7fetradition", target: "die Tradition", source: "la tradición",
      article: "die", plural: "die Traditionen", sound: "tra-di-TSIÓN",
    } as VocabItem;
    const ex = tPlural(v, "t1");
    expect(ex).not.toBeNull();
    const answers = (ex as { answers: string[] }).answers;
    expect(answers).toContain("Traditionen");
    expect(answers).toContain("die Traditionen");
  });

  it("y una que lo guarda pelado acepta también la forma con artículo", () => {
    const v = {
      id: "x", target: "das Gleis", source: "la vía", article: "das",
      plural: "Gleise", sound: "glais",
    } as VocabItem;
    const answers = (tPlural(v, "t2") as { answers: string[] }).answers;
    expect(answers).toContain("Gleise");
    expect(answers).toContain("die Gleise");
  });
});

describe("tTranslate — traducir en los dos sentidos", () => {
  const v = {
    id: "b1m1laerm", target: "der Lärm", source: "el ruido (molesto)",
    article: "der", sound: "leam",
  } as VocabItem;
  const limpio = {
    id: "b1m3vermeiden", target: "vermeiden", source: "evitar", sound: "fea-MAI-den",
  } as VocabItem;

  it("hacia el idioma es PRODUCIR y hacia el español, reconocer", () => {
    const a = tTranslate(limpio, "t1", true) as { mode: string; source: string };
    const b = tTranslate(limpio, "t2", false) as { mode: string; source: string };
    expect(a.mode).toBe("produce");
    expect(b.mode).toBe("recognize");
    expect(a.source).toBe("evitar");
    expect(b.source).toBe("vermeiden");
  });

  it("no genera nada con fichas que llevan aclaraciones entre paréntesis", () => {
    // «el ruido (molesto)» no tiene UNA traducción esperada: sería injusto
    expect(tTranslate(v, "t3", true)).toBeNull();
    expect(tTranslate(v, "t4", false)).toBeNull();
  });
});

describe("buildReviewSession — la traducción hacia el idioma cuenta como producción", () => {
  const sessions = Array.from({ length: 60 }, (_, i) => {
    vi.spyOn(Math, "random").mockImplementation(lcg(i + 1));
    try {
      return buildReviewSession(mkState(POOL), false, "de", course.vocab).exercises;
    } finally {
      vi.restoreAllMocks();
    }
  });

  it("no pasa de 10, cierra produciendo y la traducción al español no cuenta", () => {
    for (const exercises of sessions) {
      expect(exercises.length).toBeGreaterThanOrEqual(1);
      expect(exercises.length).toBeLessThanOrEqual(10);
      const last = exercises[exercises.length - 1];
      expect(isProd(last), `cierre en ${last.type}`).toBe(true);
      if (last.type === "translate") expect(last.direction).toBe("toTarget");
      const quota = Math.ceil(exercises.length * 0.4);
      const real = exercises.filter(isProd).length;
      expect(real).toBeGreaterThanOrEqual(quota);
      for (const e of exercises) {
        if (e.type !== "translate") continue;
        expect(modeOfExercise(e)).toBe(e.direction === "toTarget" ? "produce" : "recognize");
      }
    }
  });

  it("una traducción hacia el idioma cubre cupo que type/cloze/listen/transform no veían", () => {
    const cubre = sessions.filter((exercises) => {
      const quota = Math.ceil(exercises.length * 0.4);
      const vieja = exercises.filter(listaVieja).length;
      const hacia = exercises.filter((e) => e.type === "translate" && e.direction === "toTarget");
      return hacia.length > 0 && vieja < quota && exercises.filter(isProd).length >= quota;
    });
    expect(cubre.length).toBeGreaterThan(0);
  });

  it("puede cerrar en esa traducción, no solo en type", () => {
    const cierraTraduciendo = sessions.some((exercises) => {
      const last = exercises[exercises.length - 1];
      return last.type === "translate" && last.direction === "toTarget";
    });
    expect(cierraTraduciendo).toBe(true);
  });
});

describe("contraste de artículo — dos huecos seguidos, o ninguno", () => {
  const de = (id: string): VocabItem => {
    const v = course.vocab[id];
    if (!v) throw new Error(`falta ${id}`);
    return v;
  };

  /** índice de la respuesta si el ejercicio pregunta el artículo; si no, null */
  const art = (e: Exercise): number | null =>
    e.type === "mc" && e.question.startsWith("¿der, die o das?") ? e.answer : null;

  it("sin dos fichas en cada género no hay par (y una lista no cuenta)", () => {
    expect(articleContrastPair([de("hund"), de("katze"), de("hallo")])).toBeNull();
    const lista = {
      id: "tabla",
      target: "der Hund · die Katze",
      source: "lista",
      article: "der",
    } as VocabItem;
    const otroDie = {
      id: "t", target: "die Tür", source: "la puerta", article: "die",
    } as VocabItem;
    // un der de verdad + una lista no suman dos; el lado der se queda corto
    expect(articleContrastPair([lista, de("hund"), de("katze"), otroDie])).toBeNull();
  });

  it("con dos géneros y dos fichas, el par lleva artículos distintos", () => {
    const pair = articleContrastPair([de("hund"), de("regen"), de("wetter"), de("pferd")]);
    if (!pair) throw new Error("el pool tiene dos géneros con dos fichas");
    expect(pair[0].article).not.toBe(pair[1].article);
  });

  it("la sesión sienta ese par en dos huecos seguidos sin romper cupo ni cierre", () => {
    // POOL trae der×2 (hund, regen) y das×2 (wetter, pferd): fichas bastantes.
    for (let seed = 1; seed <= 20; seed++) {
      vi.spyOn(Math, "random").mockImplementation(lcg(seed));
      let exercises: Exercise[] = [];
      try {
        exercises = buildReviewSession(mkState(POOL), false, "de", course.vocab).exercises;
      } finally {
        vi.restoreAllMocks();
      }
      expect(exercises.length).toBeGreaterThanOrEqual(1);
      expect(exercises.length).toBeLessThanOrEqual(10);
      expect(isProd(exercises[exercises.length - 1]), `semilla ${seed}`).toBe(true);
      const quota = Math.ceil(exercises.length * 0.4);
      expect(exercises.filter(isProd).length).toBeGreaterThanOrEqual(quota);
      let junto = false;
      for (let i = 0; i < exercises.length - 1; i++) {
        const a = art(exercises[i]);
        const b = art(exercises[i + 1]);
        if (a === null || b === null || a === b) continue;
        const idA = exercises[i].itemIds?.[0];
        const idB = exercises[i + 1].itemIds?.[0];
        const artA = idA ? course.vocab[idA]?.article : undefined;
        const artB = idB ? course.vocab[idB]?.article : undefined;
        expect(artA, `semilla ${seed}`).toBeTruthy();
        expect(artA).not.toBe(artB);
        // el cierre productivo no forma parte del par
        expect(i + 1).toBeLessThan(exercises.length - 1);
        junto = true;
      }
      const firma = exercises.map((e) => `${e.type}:${(e.itemIds ?? []).join("+")}`).join(" | ");
      expect(junto, `semilla ${seed} no juntó dos artículos :: ${firma}`).toBe(true);
    }
  });
});
