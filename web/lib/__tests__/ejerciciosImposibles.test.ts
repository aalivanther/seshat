import { describe, expect, it } from "vitest";
import {
  isListCard, itemForms, tType, tListen, tCloze, tMatch, tTranslate, tMcForm, tMcMeaning,
  tErrorFix, tParaphrase, tRektion, tK2Hoeflich, tSayTellBucketEn, tPerfectPastBucketEn,
  levelTemplatesOf, buildReviewSession,
} from "@/lib/reviewSession";
import { buildModuleTest } from "@/lib/moduleTest";
import { courseOf } from "@/data/course";
import { setLangConfig, ENGLISH, GERMAN } from "@/lib/language";
import type { Exercise, ItemStat, ServerState, VocabItem } from "@/lib/types";

// EL EJERCICIO IMPOSIBLE: el que no tiene una respuesta que el alumno pueda
// escribir. El motor los fabricaba a decenas en cuanto entró contenido nuevo
// —tarjetas-TABLA («sing → sang · drink → drank») tratadas como frases— y de
// paso los tenía en alemán desde el B1. Aquí se fija que no vuelvan.

const mk = (v: Partial<VocabItem> & { id: string; target: string; source: string }): VocabItem => v as VocabItem;

/** lo que el alumno tendría que teclear; si lleva flecha o punto medio, no es
    una respuesta: es una tabla del libro */
const LISTA = /[→⇒·]/;

describe("isListCard — la ficha dice lo que es", () => {
  it("caza tablas y enumeraciones", () => {
    for (const t of [
      "sing → sang · drink → drank",
      "explain · say · describe · suggest",
      "good → better → the best",
      "people · news · information",
    ]) expect(isListCard(mk({ id: "x", target: t, source: "s" })), t).toBe(true);
  });

  it("no confunde una frase ni un lema con una tabla", () => {
    for (const t of ["money", "well", "der Lärm", "She works hard.", "Would you like some tea?", "Mr / Mrs"]) {
      expect(isListCard(mk({ id: "x", target: t, source: "s" })), t).toBe(false);
    }
  });

  it("una aclaración entre paréntesis con flecha NO convierte la ficha en tabla", () => {
    // «arrived (arrive → arrived)»: la flecha es una ayuda de lectura, y lo
    // que se pide teclear sigue siendo «arrived»
    expect(isListCard(mk({ id: "x", target: "arrived (arrive → arrived)", source: "llegó" }))).toBe(false);
  });
});

describe("de una tarjeta-tabla no sale ningún ejercicio de producción", () => {
  const tabla = mk({
    id: "t", target: "sing → sang · drink → drank · swim → swam",
    source: "cantó · bebió · nadó", gram: { trap: "I singed a song.", same: ["I sang a song."] },
  });
  const otros = Array.from({ length: 6 }, (_, i) => mk({ id: `o${i}`, target: `word ${i}`, source: `palabra ${i}` }));

  it("ni dictado, ni «di en…», ni traducción, ni hueco", () => {
    expect(tType(tabla, "x")).toBeNull();
    expect(tListen(tabla, "x")).toBeNull();
    expect(tCloze(tabla, "x")).toBeNull();
    expect(tTranslate(tabla, "x", true)).toBeNull();
    expect(tTranslate(tabla, "x", false)).toBeNull();
    expect(tMcForm(tabla, otros, "x")).toBeNull();
    expect(tMcMeaning(tabla, otros, "x")).toBeNull();
    expect(tParaphrase(tabla, "x")).toBeNull();
  });

  it("tampoco entra en un emparejado", () => {
    const ex = tMatch([tabla, ...otros], "x") as { pairs: { target: string }[] } | null;
    expect(ex).not.toBeNull();
    for (const p of ex!.pairs) expect(LISTA.test(p.target)).toBe(false);
  });

  it("pero su calco SÍ se aprovecha si la ficha guarda la frase arreglada", () => {
    // «explain · say · describe…» tiene en `gram.same` la corrección de verdad
    const ex = tErrorFix(tabla, "x", 3, "en") as { wrong: string; answers: string[] } | null;
    expect(ex).not.toBeNull();
    expect(ex!.answers).toEqual(["I sang a song."]);
  });
});

describe("tErrorFix — la respuesta es la corrección, no la ficha", () => {
  it("un lema no corrige una frase", () => {
    const v = mk({ id: "m", target: "money", source: "el dinero", gram: { trap: "I don't have many money." } });
    expect(tErrorFix(v, "x", 3, "en")).toBeNull();
  });

  it("una colocación tampoco («Ich warte für den Bus» → «warten auf»)", () => {
    const v = mk({
      id: "w", target: "warten auf (Ich warte auf den Bus)", source: "esperar a",
      gram: { rektion: { prep: "auf", case: "akk", stem: "warten" }, trap: "Ich warte für den Bus" },
    });
    expect(tErrorFix(v, "x", 3)).toBeNull();
  });

  it("una nota de falso amigo no es un calco escrito", () => {
    const v = mk({ id: "e", target: "eventuell", source: "quizá", gram: { trap: "eventualmente / finalmente" } });
    expect(tErrorFix(v, "x", 3)).toBeNull();
  });

  it("y sí acepta la corrección aunque el calco esté en la primera palabra", () => {
    const v = mk({
      id: "mm", target: "Meiner Meinung nach ist die Miete zu hoch", source: "En mi opinión el alquiler es muy alto",
      gram: { trap: "In meiner Meinung ist die Miete zu hoch" },
    });
    const ex = tErrorFix(v, "x", 3) as { answers: string[] } | null;
    expect(ex).not.toBeNull();
    expect(ex!.answers[0]).toBe(v.target);
  });

  it("sin material consolidado sigue sin servirse (streak < 2)", () => {
    const v = mk({ id: "s", target: "She works hard.", source: "Trabaja mucho.", gram: { trap: "She works hardly." } });
    expect(tErrorFix(v, "x", 1, "en")).toBeNull();
    expect(tErrorFix(v, "x", 2, "en")).not.toBeNull();
  });
});

describe("tParaphrase — se pide entre iguales", () => {
  it("de una palabra no se adivina una frase con datos que nadie ha visto", () => {
    const v = mk({
      id: "a", target: "arrived (arrive → arrived)", source: "llegó",
      gram: { same: ["got to London on Friday"] },
    });
    expect(tParaphrase(v, "x")).toBeNull();
  });

  it("basta con que UNA equivalencia esté a tiro, y se aceptan todas", () => {
    const v = mk({
      id: "b", target: "You'd better keep the receipt.", source: "Más te vale guardar el recibo.",
      gram: { same: ["You should keep the receipt.", "It would be a good idea to keep the receipt."] },
    });
    const ex = tParaphrase(v, "x") as { answers: string[] } | null;
    expect(ex).not.toBeNull();
    expect(ex!.answers).toHaveLength(2);
  });
});

describe("tRektion — el hueco no puede leerse en la otra mitad", () => {
  it("cuando la preposición sale dos veces, el hueco se hace sobre el ejemplo", () => {
    const v = mk({
      id: "f", target: "sich freuen über (Ich freue mich über dein Geschenk)", source: "alegrarse de algo",
      gram: { rektion: { prep: "über", case: "akk", stem: "sich freuen" } },
    });
    const ex = tRektion(v, "x") as { text: string; answers: string[] } | null;
    expect(ex).not.toBeNull();
    expect(ex!.text).toBe("Ich freue mich ___ dein Geschenk");
    // y la respuesta ya no aparece escrita en ninguna parte del enunciado
    expect(ex!.text.toLowerCase()).not.toContain("über");
  });

  it("con una sola aparición se hace el hueco de siempre", () => {
    const v = mk({
      id: "d", target: "depend on", source: "depender de",
      gram: { rektion: { prep: "on", stem: "depend" } },
    });
    expect((tRektion(v, "x") as { text: string }).text).toBe("depend ___");
  });
});

describe("tK2Hoeflich — sobre la forma limpia", () => {
  it("no conjuga lo que hay dentro del paréntesis", () => {
    const v = mk({ id: "k", target: "könnte (können → könnte)", source: "podría", gram: { k2: "könnte" } });
    const ex = tK2Hoeflich(v, "x") as { answers: string[] } | null;
    if (ex) for (const a of ex.answers) expect(LISTA.test(a)).toBe(false);
  });
});

describe("tTranslate al español corrige contra las GLOSAS, no contra el campo entero", () => {
  it("tira la explicación tras la raya", () => {
    const v = mk({ id: "w", target: "well", source: "bien — es el adverbio de good, y no lleva -ly" });
    const ex = tTranslate(v, "x", false) as { answers: string[] };
    expect(ex.answers).toContain("bien");
  });

  it("y acepta cada glosa por separado", () => {
    const v = mk({ id: "l", target: "der Lehrer", source: "profesor / profesora" });
    const ex = tTranslate(v, "x", false) as { answers: string[] };
    expect(ex.answers).toContain("profesor");
    expect(ex.answers).toContain("profesora");
  });

  it("si no queda nada tecleable, no hay ejercicio", () => {
    const v = mk({ id: "z", target: "z", source: "se lee «ts»: zehn → tseen" });
    expect(tTranslate(v, "x", false)).toBeNull();
    expect(tType(v, "x")).toBeNull(); // «Di en alemán: se lee «ts»…» tampoco
  });
});

describe("el enunciado nunca lleva escrita la respuesta", () => {
  const otros = Array.from({ length: 6 }, (_, i) => mk({ id: `o${i}`, target: `word${i} here`, source: `palabra${i} ahí` }));
  it("los préstamos no se preguntan con mc de forma", () => {
    const v = mk({ id: "t", target: "taxi", source: "taxi" });
    expect(tMcForm(v, otros, "x")).toBeNull();
  });
  it("ni cuando la glosa cita la palabra («email / correo electrónico»)", () => {
    const v = mk({ id: "e", target: "email", source: "email / correo electrónico" });
    expect(tMcForm(v, otros, "x")).toBeNull();
  });
});

describe("cubos ingleses: el sorteo es de la plantilla", () => {
  const marcador = (id: string, t: string) => mk({ id, target: t, source: "s", gram: { trap: "x" } });
  it("con más oferta que huecos, dos llamadas no dan siempre lo mismo", () => {
    const pool = [
      ...["yesterday", "last week", "last month", "last year", "two days ago", "in 2019"]
        .map((m, i) => marcador(`p${i}`, `I saw it ${m}.`)),
      ...["just", "already", "yet", "ever", "never", "so far"]
        .map((m, i) => marcador(`q${i}`, `I have ${m} seen it.`)),
    ];
    const combos = new Set<string>();
    for (let i = 0; i < 30; i++) {
      const ex = tPerfectPastBucketEn(pool, "x") as { items: { text: string }[] } | null;
      if (ex) combos.add(ex.items.map((it) => it.text).sort().join("~"));
    }
    expect(combos.size).toBeGreaterThan(1);
  });

  it("una tarjeta-lista no ensucia el cubo de say/tell", () => {
    const pool = [
      marcador("l", "explain · say · describe · suggest"),
      marcador("t1", "Tell me what happened."),
      marcador("t2", "She told me about the flat."),
      marcador("s1", "He said that he was tired."),
      marcador("s2", "They say the pool is closing."),
    ];
    const ex = tSayTellBucketEn(pool, "x") as { items: { text: string }[] } | null;
    expect(ex).not.toBeNull();
    for (const it of ex!.items) expect(LISTA.test(it.text)).toBe(false);
  });
});

describe("cupo de nivel: se reparte por PLANTILLA", () => {
  it("cada idioma declara sus plantillas con nombre", () => {
    expect(levelTemplatesOf("en").map((t) => t.kind)).toEqual(["rektion", "indirecta", "condicional", "errorfix", "parafrasis", "discourse", "register"]);
    expect(levelTemplatesOf("de").map((t) => t.kind)).toEqual(["rektion", "dawo", "k2", "errorfix", "parafrasis", "nomen", "k1", "partizip", "zweiteilig"]);
  });

  it("las condicionales inglesas —7 fichas en todo el curso— llegan a salir", () => {
    // Con 7 fichas de condicional entre 1.800, que salgan en N tandas es cosa
    // del azar: la prueba fallaba según el orden del fichero y tardaba nueve
    // minutos. Se fija la semilla, y así mide lo que quiere medir —que el cupo
    // reparte por plantilla y no se lo come el errorfix— sin depender de la
    // suerte ni del estado que dejen otras pruebas.
    const azar = Math.random;
    let x = 0x9e3779b9;
    Math.random = () => {
      x |= 0; x = (x + 0x6d2b79f5) | 0;
      let t = Math.imul(x ^ (x >>> 15), 1 | x);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    setLangConfig(ENGLISH);
    try {
      const c = courseOf("en");
      const items: Record<string, ItemStat> = {};
      for (const p of c.phases) {
        for (const l of p.lessons) {
          for (const sec of l.sections) {
            for (const id of sec.itemIds ?? []) {
              if (c.vocab[id]) {
                items[id] = { correct: 4, wrong: 0, streak: 3, intervalDays: 1, nextReview: "2020-01-01T00:00:00.000Z", lastSeen: "2020-01-01T00:00:00.000Z" };
              }
            }
          }
        }
      }
      const st: ServerState = { lessons: {}, items, xp: 0, streakDays: 0, lastActive: "2026-08-20" };
      let condicionales = 0;
      for (let i = 0; i < 40; i++) {
        for (const e of buildReviewSession(st, true, "en").exercises) {
          if (String((e as unknown as { prompt?: string }).prompt ?? "").includes("condicional")) condicionales++;
        }
      }
      expect(condicionales).toBeGreaterThan(0);
    } finally {
      setLangConfig(GERMAN);
      Math.random = azar;
    }
  }, 20_000); // 40 sesiones de repaso sobre el curso inglés completo: bajo
  // carga (suite entera en paralelo, como en build-app.sh) puede superar el
  // timeout POR DEFECTO de 5 s antes de terminar — no es un fallo del cupo.
});

describe("la prueba de módulo mezcla de verdad", () => {
  it("no repite palabra mientras el módulo dé de sí", () => {
    const phase = courseOf("de").phases[3];
    for (let i = 0; i < 20; i++) {
      const test: Exercise[] = buildModuleTest(phase, 12);
      const ids = test.flatMap((e) => e.itemIds ?? []);
      const repes = ids.length - new Set(ids).size;
      // antes de interleaving, la mitad de una prueba de 12 eran repeticiones
      expect(repes).toBeLessThan(Math.ceil(test.length / 3));
    }
  });
});

describe("ninguna sesión del curso REAL trae un ejercicio incontestable", () => {
  function estado(lang: string): ServerState {
    const c = courseOf(lang);
    const items: Record<string, ItemStat> = {};
    for (const p of c.phases) {
      for (const l of p.lessons) {
        for (const sec of l.sections) {
          for (const id of sec.itemIds ?? []) {
            if (c.vocab[id]) items[id] = { correct: 4, wrong: 1, streak: 3, intervalDays: 1, nextReview: "2020-01-01T00:00:00.000Z", lastSeen: "2020-01-01T00:00:00.000Z" };
          }
        }
      }
    }
    return { lessons: {}, items, xp: 0, streakDays: 0, lastActive: "2026-08-20" };
  }

  for (const lang of ["de", "en"]) {
    it(`${lang}: 60 tandas sin flechas ni puntos medios en lo que hay que escribir`, () => {
      setLangConfig(lang === "en" ? ENGLISH : GERMAN);
      try {
        const st = estado(lang);
        for (let i = 0; i < 60; i++) {
          for (const e of buildReviewSession(st, true, lang).exercises) {
            const x = e as unknown as Record<string, unknown>;
            for (const a of (x.answers as string[] | undefined) ?? []) {
              expect(LISTA.test(a), `${e.type}: «${a}»`).toBe(false);
            }
            if (e.type === "listen") expect(LISTA.test(x.text as string)).toBe(false);
            for (const opt of (x.options as string[] | undefined) ?? []) {
              expect(LISTA.test(opt), `mc: «${opt}»`).toBe(false);
            }
            for (const it of (x.items as { text: string }[] | undefined) ?? []) {
              expect(LISTA.test(it.text), `bucket: «${it.text}»`).toBe(false);
            }
            for (const par of (x.pairs as { target: string }[] | undefined) ?? []) {
              expect(LISTA.test(par.target), `match: «${par.target}»`).toBe(false);
            }
            // el hueco de un cloze no puede leerse en el propio enunciado
            if (e.type === "cloze") {
              const text = x.text as string;
              for (const a of (x.answers as string[]) ?? []) {
                const re = new RegExp(`(^|[^a-zA-ZäöüÄÖÜß'])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-zA-ZäöüÄÖÜß']|$)`, "i");
                expect(re.test(text), `cloze regala: «${text}» → «${a}»`).toBe(false);
              }
            }
          }
        }
      } finally {
        setLangConfig(GERMAN);
      }
    }, 60_000);
  }
});

describe("itemForms sigue siendo la puerta de las formas aceptadas", () => {
  it("quita paréntesis y separa alternativas", () => {
    const f = itemForms(mk({ id: "x", target: "der Lehrer / die Lehrerin", source: "profesor" }));
    expect(f.display).toBe("der Lehrer");
    expect(f.accepted).toContain("die Lehrerin");
  });
});
