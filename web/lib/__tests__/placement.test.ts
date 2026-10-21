import { afterEach, describe, expect, it, vi } from "vitest";
import { analyzePlacement, isCorrect, parsePlacementReport, placedFromColocacionScore, placedLevel, placementKey, type PlacementItem } from "@/lib/placement";
import { CEFR_SCALE, type Cefr } from "@/lib/cefr";
import type { ServerState } from "@/lib/types";

/** banco mínimo: dos ítems por tema, como exige el diseño */
function banco(): PlacementItem[] {
  const mk = (n: number, level: "a1" | "a2" | "b1", topic: string): PlacementItem => ({
    id: `p${n}`, level, skill: "grammatik", topic, kind: "mc",
    prompt: "", options: ["a", "b"], answer: 0, why: "",
  });
  return [
    mk(1, "a1", "artikel"), mk(2, "a1", "artikel"),
    mk(3, "a1", "perfekt"), mk(4, "a1", "perfekt"),
    mk(5, "a2", "nebensaetze"), mk(6, "a2", "nebensaetze"),
    mk(7, "a2", "passiv"), mk(8, "a2", "passiv"),
    mk(9, "b1", "konjunktiv2"), mk(10, "b1", "konjunktiv2"),
  ];
}

const todo = (items: PlacementItem[]) => Object.fromEntries(items.map((i) => [i.id, 0]));
const nada = (items: PlacementItem[]) => Object.fromEntries(items.map((i) => [i.id, 1]));
const ap = (
  items: PlacementItem[],
  given: Record<string, string | number | null>,
  ceiling: Cefr = "b1",
) => analyzePlacement(items, given, ceiling);

describe("colocación: dónde se coloca al alumno", () => {
  it("quien no acierta nada empieza por A1, y se le dice sin dramatismo", () => {
    const items = banco();
    const r = ap(items, nada(items));
    expect(r.placed).toBe("a1");
    expect(r.highestSolid).toBeNull();
    expect(r.pct).toBe(0);
    expect(r.veredicto).toContain("cero");
  });

  it("quien lo acierta todo se coloca en B1 (no hay nivel por encima en el curso)", () => {
    const items = banco();
    const r = ap(items, todo(items));
    expect(r.highestSolid).toBe("b1");
    expect(r.placed).toBe("b1");
    expect(r.dominados.length).toBe(5);
    expect(r.flojos.length).toBe(0);
  });

  it("V4 — con techo B2 el mismo acierto perfecto coloca en B2, no miente B1", () => {
    const items = banco();
    const r = ap(items, todo(items), "b2");
    expect(r.placed).toBe("b2");
    expect(r.aboveCourse).toBe(false);
  });

  it("con el A1 sólido y el A2 flojo, se coloca en A2 — el siguiente, no más", () => {
    const items = banco();
    const g = nada(items);
    for (const i of items.filter((x) => x.level === "a1")) g[i.id] = 0;
    const r = ap(items, g);
    expect(r.highestSolid).toBe("a1");
    expect(r.placed).toBe("a2");
  });

  it("NO salta un nivel flojo aunque el de arriba salga bien: un acierto suelto no promociona", () => {
    const items = banco();
    const g = nada(items);
    for (const i of items.filter((x) => x.level === "a1" || x.level === "b1")) g[i.id] = 0;
    const r = ap(items, g);
    expect(r.highestSolid).toBe("a1"); // el A2 corta la escalera
    expect(r.placed).toBe("a2");
  });
});

describe("colocación: qué domina y qué no", () => {
  it("clasifica cada tema en dominado, a medias o flojo", () => {
    const items = banco();
    const g = nada(items);
    g["p1"] = 0; g["p2"] = 0;   // artikel entero
    g["p3"] = 0;                 // perfekt a medias
    const r = ap(items, g);
    expect(r.topics.find((t) => t.topic === "artikel")!.state).toBe("dominado");
    expect(r.topics.find((t) => t.topic === "perfekt")!.state).toBe("a-medias");
    expect(r.topics.find((t) => t.topic === "passiv")!.state).toBe("flojo");
  });

  it("un tema medido en varios niveles se agrupa, y se muestra en el nivel más bajo donde se estudia", () => {
    const items: PlacementItem[] = [
      ...banco(),
      { id: "px", level: "b1", skill: "grammatik", topic: "artikel", kind: "mc", prompt: "", options: ["a", "b"], answer: 0, why: "" },
    ];
    const g = nada(items);
    g["p1"] = 0; g["p2"] = 0; // los dos de A1 bien, el de B1 mal
    const r = ap(items, g);
    const art = r.topics.filter((t) => t.topic === "artikel");
    expect(art).toHaveLength(1);
    expect(art[0].level).toBe("a1");
    expect(art[0].levels).toEqual(["a1", "b1"]);
    expect(art[0].hits).toBe(2);
    expect(art[0].total).toBe(3);
    expect(art[0].state).toBe("a-medias"); // 2 de 3 no es dominar
  });

  it("los temas salen ordenados de peor a mejor: lo que hay que leer, primero", () => {
    const items = banco();
    const g = nada(items);
    g["p1"] = 0; g["p2"] = 0; // artikel perfecto
    const r = ap(items, g);
    expect(r.topics[0].state).toBe("flojo");
    expect(r.topics[r.topics.length - 1].topic).toBe("artikel");
  });
});

describe("corrección de un ítem", () => {
  const cloze: PlacementItem = {
    id: "c1", level: "a2", skill: "grammatik", topic: "perfekt", kind: "cloze",
    prompt: "", text: "Ich ___ gestern gearbeitet.", answers: ["habe"], why: "",
  };
  it("el cloze perdona mayúsculas y espacios, pero no otra palabra", () => {
    expect(isCorrect(cloze, " Habe ")).toBe(true);
    expect(isCorrect(cloze, "bin")).toBe(false);
    expect(isCorrect(cloze, "")).toBe(false);
    expect(isCorrect(cloze, null)).toBe(false);
  });
});

describe("ítems de ordenar: los dos bancos los escriben distinto", () => {
  const alemanFrase: PlacementItem = {
    id: "o1", level: "a2", skill: "grammatik", topic: "wortstellung", kind: "order",
    prompt: "", options: ["muss", "ich", "arbeiten", "weil"],
    answers: ["weil ich arbeiten muss", "weil ich arbeiten muss."], why: "",
  };
  const inglesFichas: PlacementItem = {
    id: "o2", level: "a1", skill: "grammar", topic: "word-order", kind: "order",
    prompt: "", options: ["car", "has", "red", "She", "a"],
    answers: ["She", "has", "a", "red", "car"], why: "",
  };

  it("acepta la frase entera cuando las respuestas son la frase", () => {
    expect(isCorrect(alemanFrase, "Weil ich arbeiten muss.")).toBe(true);
    expect(isCorrect(alemanFrase, "ich weil arbeiten muss")).toBe(false);
  });

  it("acepta la frase montada cuando las respuestas son FICHAS SUELTAS (antes era inacertable)", () => {
    expect(isCorrect(inglesFichas, "She has a red car")).toBe(true);
    expect(isCorrect(inglesFichas, "she has a red car.")).toBe(true);
    expect(isCorrect(inglesFichas, "She has a car red")).toBe(false);
  });
});

describe("el informe se puede auditar: valores, no impresiones", () => {
  function bancoAmplio(): PlacementItem[] {
    const mk = (n: number, level: PlacementItem["level"], topic: string, skill: PlacementItem["skill"]): PlacementItem => ({
      id: `q${n}`, level, skill, topic, kind: "mc", prompt: "", options: ["a", "b"], answer: 0, why: "",
    });
    const out: PlacementItem[] = [];
    let n = 0;
    // los cinco niveles que mide la prueba (la escala real menos el c2): ver
    // PlacementLevel en lib/placement.ts.
    for (const lv of CEFR_SCALE.filter((c) => c !== "c2") as PlacementItem["level"][]) {
      for (let i = 0; i < 4; i++) {
        out.push(mk(n++, lv, `t-${lv}-${i % 2}`, i % 2 ? "hoeren" : "grammatik"));
      }
    }
    return out;
  }

  it("desglosa por destreza, que es como puntúa una escuela", () => {
    const items = bancoAmplio();
    const g = Object.fromEntries(items.map((i) => [i.id, i.skill === "grammatik" ? 0 : 1]));
    const r = ap(items, g);
    const gram = r.bySkill.find((x) => x.skill === "grammatik")!;
    const oido = r.bySkill.find((x) => x.skill === "hoeren")!;
    expect(gram.pct).toBe(100);
    expect(oido.pct).toBe(0);
  });

  it("mide hasta C1 aunque el curso llegue al B1, y lo dice sin fingir que hay más curso", () => {
    const items = bancoAmplio();
    const todo = Object.fromEntries(items.map((i) => [i.id, 0]));
    const r = ap(items, todo);
    expect(r.realLevel).toBe("c1");
    expect(r.aboveCourse).toBe(true);
    expect(r.placed).toBe("b1"); // el curso no da para más
    expect(r.veredicto).toContain("C1");
  });

  it("avisa cuando el resultado es de frontera en vez de fingir seguridad", () => {
    const items = bancoAmplio();
    const g: Record<string, number> = {};
    for (const i of items) {
      // A1 justo por encima del corte, A2 rozándolo: eso es una frontera
      if (i.level === "a1") g[i.id] = i.id.endsWith("3") ? 1 : 0; // 75%
      else if (i.level === "a2") g[i.id] = i.id.endsWith("7") || i.id.endsWith("6") ? 1 : 0; // 50%
      else g[i.id] = 1;
    }
    const r = ap(items, g);
    expect(["frontera", "media"]).toContain(r.confianza);
    expect(r.confianzaPorque.length).toBeGreaterThan(30);
  });

  it("publica el método y sus límites: sin eso, el número no se puede defender", () => {
    const items = bancoAmplio();
    const r = ap(items, {});
    expect(r.metodo.corte).toBe(70);
    expect(r.metodo.itemsPorNivel).toHaveLength(5);
    expect(r.metodo.limites.join(" ")).toContain("oral");
    expect(r.equivalencia.length).toBeGreaterThan(10);
  });
});

describe("el banco real coincide con su censo", () => {
  it("DE y EN: 68 ítems, 12+14+14+14+14, y el censo no miente", async () => {
    const { placementDe, placementDeCounts } = await import("@/data/placementDe");
    const { placementEn, placementEnCounts } = await import("@/data/en/placementEn");
    for (const [items, counts] of [
      [placementDe, placementDeCounts],
      [placementEn, placementEnCounts],
    ] as const) {
      const by: Record<string, number> = { a1: 0, a2: 0, b1: 0, b2: 0, c1: 0 };
      for (const it of items) by[it.level] += 1;
      expect(by).toEqual(counts);
      expect(items.length).toBe(68);
    }
  });
});

describe("la última pregunta no puede romper la prueba", () => {
  it("analyzePlacement acepta el mapa COMPLETO de respuestas de una tacada", () => {
    // el fallo real: el informe se calculaba en un efecto posterior y, entre
    // medias, la pantalla se pintaba sin pregunta y reventaba — perdiendo todo.
    // Ahora se calcula con las respuestas ya cerradas, en el mismo gesto.
    const items: PlacementItem[] = Array.from({ length: 5 }, (_, i) => ({
      id: `z${i}`, level: "a1", skill: "grammatik", topic: "artikel", kind: "mc",
      prompt: "", options: ["a", "b"], answer: 0, why: "",
    }));
    const respuestas = Object.fromEntries(items.map((i) => [i.id, 0]));
    const r = ap(items, respuestas);
    expect(r.total).toBe(5);
    expect(r.hits).toBe(5);
    // y con la última sin contestar, tampoco se cae
    const conHueco = { ...respuestas, z4: null };
    expect(ap(items, conHueco).hits).toBe(4);
  });
});

describe("placedLevel — PLAN 1.9.8 §5.7", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("prefiere ServerState sobre localStorage cuando ambos existen y difieren", () => {
    const key = placementKey("en", "default");
    vi.stubGlobal("window", {
      localStorage: {
        getItem: (k: string) => (k === key ? JSON.stringify({ placed: "a2" }) : null),
      },
    });
    const st = {
      lessons: {}, items: {}, xp: 0, streakDays: 0, lastActive: "",
      placement: { en: { placed: "b1", pct: 80, at: new Date().toISOString() } },
    } as ServerState;
    expect(placedLevel(st, "en")).toBe("b1");
  });
});

describe("parsePlacementReport — no se pinta un JSON a medias", () => {
  it("rechaza placed que no es CEFR", () => {
    expect(parsePlacementReport(null)).toBeNull();
    expect(parsePlacementReport({ placed: "z9", pct: 50, veredicto: "ok" })).toBeNull();
  });

  it("un informe viejo sin veredicto no se tira: el placed viaja", () => {
    const r = parsePlacementReport({ placed: "a2", pct: 140 });
    expect(r?.placed).toBe("a2");
    expect(r?.pct).toBe(100);
    expect(r?.veredicto.length).toBeGreaterThan(0);
  });

  it("acepta un informe con placed, pct y veredicto", () => {
    const r = parsePlacementReport({ placed: "b1", pct: 72, veredicto: "Vas por B1." });
    expect(r?.placed).toBe("b1");
    expect(r?.pct).toBe(72);
  });
});

describe("placedFromColocacionScore — último recurso sin informe", () => {
  it("0.66 (el caso real: B1 sólido) → b1", () => {
    expect(placedFromColocacionScore(0.66)).toBe("b1");
    expect(placedFromColocacionScore(66)).toBe("b1");
  });
  it("por debajo del A2 no se sube", () => {
    expect(placedFromColocacionScore(0.2)).toBe("a1");
    expect(placedFromColocacionScore(0.45)).toBe("a2");
  });
  it("un 72 % o más se lee como B2, nunca por encima del techo del curso", () => {
    expect(placedFromColocacionScore(0.72)).toBe("b2");
    expect(placedFromColocacionScore(1)).toBe("b2");
  });
});
