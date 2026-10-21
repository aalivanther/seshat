import { describe, expect, it, vi, afterEach } from "vitest";
import {
  tRektion, tDaWo, tK2Hoeflich, tKonnektorBucket, tErrorFix, tParaphrase,
} from "@/lib/reviewSession";
import type { VocabItem } from "@/lib/types";

// Plantillas de NIVEL (PLAN.md §6.2): se activan con VocabItem.gram y devuelven
// null sin él — la garantía de que A1/A2 no cambian ni una coma.

const warten: VocabItem = {
  id: "b1warten",
  target: "Ich warte auf den Bus.",
  source: "Espero el autobús.",
  gram: { rektion: { prep: "auf", case: "akk", stem: "warten" } },
};
const plain: VocabItem = { id: "a1hund", target: "der Hund", source: "el perro", article: "der" };

afterEach(() => vi.unstubAllGlobals());

describe("null-guard: sin gram, ninguna plantilla de nivel se activa", () => {
  it("un ítem A1 normal no produce ejercicios B1", () => {
    expect(tRektion(plain, "x")).toBeNull();
    expect(tDaWo(plain, "x")).toBeNull();
    expect(tK2Hoeflich(plain, "x")).toBeNull();
    expect(tErrorFix(plain, "x", 9)).toBeNull();
    expect(tParaphrase(plain, "x")).toBeNull();
  });
});

describe("tRektion", () => {
  it("el hueco es la PREPOSICIÓN, nunca el verbo", () => {
    const ex = tRektion(warten, "t10")!;
    expect(ex.type).toBe("cloze");
    const e = ex as { text: string; answers: string[] };
    expect(e.text).toBe("Ich warte ___ den Bus.");
    expect(e.answers).toEqual(["auf"]);
    expect(e.text).toContain("warte"); // el verbo se queda visible
  });

  it("REGRESIÓN: abre hueco también con preposiciones con umlaut (über)", () => {
    const ueber: VocabItem = {
      id: "b1ueber2", target: "Wir sprechen über das Wetter.", source: "Hablamos del tiempo.",
      gram: { rektion: { prep: "über", case: "akk", stem: "sprechen" } },
    };
    const ex = tRektion(ueber, "x");
    expect(ex, "\\b es ASCII: sin arreglarlo, esta plantilla callaba").not.toBeNull();
    expect((ex as { text: string }).text).toBe("Wir sprechen ___ das Wetter.");
  });

  it("si la preposición no aparece en la frase, no hay ejercicio", () => {
    const raro: VocabItem = { ...warten, target: "Ich warte." };
    expect(tRektion(raro, "x")).toBeNull();
  });
});

describe("tDaWo", () => {
  it("mete la -r eufónica ante vocal (auf → worauf/darauf)", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.1); // rama wo-
    const wo = tDaWo(warten, "t11") as { answers: string[] };
    expect(wo.answers[0]).toBe("worauf");
    vi.spyOn(Math, "random").mockReturnValue(0.9); // rama da-
    const da = tDaWo(warten, "t11") as { answers: string[] };
    expect(da.answers[0]).toBe("darauf");
  });

  it("REGRESIÓN: ö y ü también llevan -r (über → worüber, NO «woüber»)", () => {
    const ueber: VocabItem = {
      id: "b1ueber", target: "Wir sprechen über das Wetter.", source: "Hablamos del tiempo.",
      gram: { rektion: { prep: "über", case: "akk", stem: "sprechen" } },
    };
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    expect((tDaWo(ueber, "x") as { answers: string[] }).answers[0]).toBe("worüber");
    vi.spyOn(Math, "random").mockReturnValue(0.9);
    expect((tDaWo(ueber, "x") as { answers: string[] }).answers[0]).toBe("darüber");
  });

  it("sin vocal inicial no mete la -r (mit → womit/damit)", () => {
    const mit: VocabItem = {
      id: "b1mit", target: "Ich rechne mit Regen.", source: "Cuento con lluvia.",
      gram: { rektion: { prep: "mit", case: "dat", stem: "rechnen" } },
    };
    vi.spyOn(Math, "random").mockReturnValue(0.1);
    expect((tDaWo(mit, "x") as { answers: string[] }).answers[0]).toBe("womit");
  });
});

describe("tK2Hoeflich", () => {
  it("convierte el indicativo en Konjunktiv II conservando el resto", () => {
    const v: VocabItem = { id: "b1k2", target: "Kannst du mir helfen?", source: "¿Puedes ayudarme?" };
    const ex = tK2Hoeflich(v, "t12")!;
    expect(ex.type).toBe("transform");
    expect((ex as { answers: string[] }).answers[0]).toBe("Könntest du mir helfen?");
  });

  it("respeta la puntuación pegada a la forma verbal", () => {
    const v: VocabItem = { id: "x", target: "Hast du Zeit?", source: "¿Tienes tiempo?" };
    expect((tK2Hoeflich(v, "x") as { answers: string[] }).answers[0]).toBe("Hättest du Zeit?");
  });

  it("una frase sin verbo de la tabla no genera ejercicio", () => {
    const v: VocabItem = { id: "x", target: "Der Hund schläft.", source: "El perro duerme." };
    expect(tK2Hoeflich(v, "x")).toBeNull();
  });
});

describe("tKonnektorBucket", () => {
  const pool: VocabItem[] = [
    { id: "1", target: "weil", source: "porque", gram: { konn: "sub" } },
    { id: "2", target: "obwohl", source: "aunque", gram: { konn: "sub" } },
    { id: "3", target: "deshalb", source: "por eso", gram: { konn: "adv" } },
    { id: "4", target: "trotzdem", source: "aun así", gram: { konn: "adv" } },
  ];

  it("clasifica subordinantes (verbo al final) vs adverbiales (inversión)", () => {
    const ex = tKonnektorBucket(pool, "t13")!;
    expect(ex.type).toBe("bucket");
    const e = ex as { items: { text: string; bucket: 0 | 1 }[]; categories: string[] };
    for (const it of e.items) {
      const src = pool.find((p) => p.target === it.text)!;
      expect(it.bucket).toBe(src.gram!.konn === "sub" ? 0 : 1);
    }
    expect(e.categories[0]).toContain("FINAL");
  });

  it("con menos de 2 de cada lado no se genera (no discriminaría)", () => {
    expect(tKonnektorBucket(pool.slice(0, 3), "x")).toBeNull();
  });
});

describe("tErrorFix — con salvaguardas", () => {
  const v: VocabItem = {
    id: "b1trap",
    target: "Ich freue mich darauf, dich zu sehen.",
    source: "Tengo ganas de verte.",
    gram: { trap: "Ich habe Lust dich zu sehen." },
  };

  it("NO se sirve sobre material sin consolidar (streak < 2)", () => {
    expect(tErrorFix(v, "x", 0)).toBeNull();
    expect(tErrorFix(v, "x", 1)).toBeNull();
  });

  it("con streak ≥2 usa el tipo errorfix, que esconde el calco al corregir", () => {
    const ex = tErrorFix(v, "t14", 2)!;
    // `errorfix`, no `type`: es lo que activa la salvaguarda de exposición —
    // al acertar, la forma incorrecta desaparece y solo queda la buena
    expect(ex.type).toBe("errorfix");
    const e = ex as { wrong: string; answers: string[]; why: string };
    expect(e.wrong).toContain("Ich habe Lust"); // el calco se enseña una vez
    expect(e.answers).toEqual([v.target]); // lo que se escribe es lo bueno
    expect(e.why).toBeTruthy(); // y se explica qué falló
  });
});

describe("tParaphrase", () => {
  it("acepta todas las formulaciones equivalentes declaradas", () => {
    const v: VocabItem = {
      id: "b1same",
      target: "Ich bin der Meinung, dass…",
      source: "Opino que…",
      gram: { same: ["Meiner Meinung nach…", "Ich finde, dass…"] },
    };
    const ex = tParaphrase(v, "t15")!;
    expect((ex as { answers: string[] }).answers).toHaveLength(2);
    expect((ex as { answers: string[] }).answers).toContain("Ich finde, dass…");
  });
});
