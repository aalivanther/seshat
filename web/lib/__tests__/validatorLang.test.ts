import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// LA PUERTA, PROBADA POR FUERA
//
// scripts/validate-content.mjs es lo que impide empaquetar contenido roto, y
// desde que hay dos idiomas sus reglas dejaron de ser universales: el nivel de
// un `read`, las fichas intercambiables de un `gapbank` y el registro de un
// `write` dependen del idioma. Una regla por idioma es exactamente la clase de
// cosa que se rompe en silencio (deja de saltar y el build sigue verde), así
// que aquí se comprueba a la brava: se monta un espejo del contenido en un
// directorio temporal, se le meten ejercicios que DEBEN fallar y se mira que el
// validador los cace. Con contenido bueno el build ya se verifica solo, en
// `npm run validate`; lo que nadie verificaba es que las alarmas siguen vivas.

const web = join(__dirname, "..", "..");
let mirror = "";

/** monta el espejo: data + scripts reales, y los fixtures encima */
function buildMirror(): string {
  const dir = mkdtempSync(join(tmpdir(), "seshat-validador-"));
  cpSync(join(web, "data"), join(dir, "data"), { recursive: true });
  cpSync(join(web, "scripts"), join(dir, "scripts"), { recursive: true });
  // el validador ahora importa el catálogo (PLAN-COMPOSICION FASE 1): sin él
  // no resuelve ../content/catalog.mjs desde el espejo.
  cpSync(join(web, "content"), join(dir, "content"), { recursive: true });
  cpSync(join(web, "app", "referencia"), join(dir, "app", "referencia"), { recursive: true });
  // el validador lee CEFR_SCALE de lib/cefr.ts (PLAN 1.9.9 F1.4): un solo
  // archivo, no toda `lib/` — el espejo es del contenido, no del motor.
  mkdirSync(join(dir, "lib"), { recursive: true });
  cpSync(join(web, "lib", "cefr.ts"), join(dir, "lib", "cefr.ts"));
  // el validador transpila con `typescript`: se lo resolvemos con un enlace al
  // node_modules de verdad en vez de copiarlo entero
  cpSync(join(web, "node_modules", "typescript"), join(dir, "node_modules", "typescript"), {
    recursive: true,
  });

  writeFileSync(join(dir, "data", "en", "enb1m1.ts"), FIXTURE_EN);
  writeFileSync(join(dir, "data", "b1m98.ts"), FIXTURE_DE);
  writeFileSync(join(dir, "data", "b2m99.ts"), FIXTURE_B2);
  const genPath = join(dir, "data", "course.gen.ts");
  const gen = readFileSync(genPath, "utf8");
  if (!gen.includes("b2m99")) {
    writeFileSync(genPath, `import { b2m99, vocabB2m99 } from "./b2m99";\n` + gen);
  }

  // los fixtures tienen que viajar en ALGÚN drop, o su vocabulario no entra en
  // la comprobación de la convención de ids (que se hace sobre lo empaquetado)
  // — PLAN-COMPOSICION FASE 1: el eje ya es el catálogo, no la tabla DROPS.
  const catalogPath = join(dir, "content", "catalog.mjs");
  const catalog = readFileSync(catalogPath, "utf8");
  const at = catalog.lastIndexOf("];");
  writeFileSync(
    catalogPath,
    catalog.slice(0, at) +
      `  { kind: "module", id: "enb1m1", lang: "en", level: "b1", file: "en/enb1m1", exports: { phase: "enb1m1", vocab: "vocabEnB1m1" }, order: 999, since: 6 },\n` +
      `  { kind: "module", id: "b1m98", lang: "de", level: "b1", file: "b1m98", exports: { phase: "b1m98", vocab: "vocabB1m98" }, order: 999, since: 7 },\n` +
      `  { kind: "module", id: "b2m99", lang: "de", level: "b2", file: "b2m99", exports: { phase: "b2m99", vocab: "vocabB2m99" }, order: 999, since: 7 },\n` +
      catalog.slice(at),
  );
  return dir;
}

/** corre el validador del espejo y devuelve todo lo que escupe */
function runValidator(dir: string): string {
  try {
    return execFileSync("node", [join(dir, "scripts", "validate-content.mjs")], {
      cwd: dir,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    const e = err as { stdout?: string; stderr?: string };
    return `${e.stdout ?? ""}\n${e.stderr ?? ""}`;
  }
}

let salida = "";

beforeAll(() => {
  mirror = buildMirror();
  salida = runValidator(mirror);
}, 120_000);

afterAll(() => {
  if (mirror) rmSync(mirror, { recursive: true, force: true });
});

describe("P3 · el nivel sale de phase.level, no del prefijo del id", () => {
  it("mide un `read` de un módulo B1 inglés con la vara del B1 (el id no empieza por «b1»)", () => {
    // `enb1m1l1e1` tiene 109 palabras: dentro del rango A1 (70-200) y muy por
    // debajo del B1 (280-700). Con la inferencia por prefijo el aviso NO salía.
    expect(salida).toContain("enb1m1l1e1: read de 109 palabras (fuera de 280-700 para B1 en EN");
  });

  it("el prefijo del id, que era el criterio viejo, no sabe nada de este ejercicio", () => {
    const id = "enb1m1l1e1";
    const viejo = id.startsWith("b1") ? "b1" : id.startsWith("a2") ? "a2" : "a1";
    expect(viejo).toBe("a1"); // por eso un texto de B1 pasaba como A1
  });

  it("sigue exigiendo 2 preguntas de inferencia a cualquier `read`", () => {
    expect(salida).toContain("enb1m1l1e1: read con 1 pregunta(s) de inferencia");
  });

  it("una pregunta de respuesta escrita bien formada no se marca como problema", () => {
    expect(salida).not.toContain('pregunta "q5"');
  });

  it("mezclar respuesta escrita y opción múltiple en la misma pregunta sí se caza", () => {
    expect(salida).toContain('pregunta "q6" mezcla respuesta escrita (accepted) con opción múltiple');
  });

  it("una NativoCard con un nivel distinto al de su módulo no se cuela", () => {
    expect(salida).toContain('enb1m1n1: NativoCard de nivel "a1" en un módulo de "b1"');
  });
});

describe("P7 · gapbank: el inglés también tiene red de claves ambiguas", () => {
  it("caza dos concesivas sinónimas en el mismo banco (although / though)", () => {
    expect(salida).toContain("enb1m1l1e2: el hueco 1 espera «Although», pero el banco ofrece «though»");
  });

  it("caza la contracción y su forma plena como una sola respuesta con dos trajes", () => {
    expect(salida).toContain("enb1m1l1e3: el banco trae «don't» y «do not»");
  });

  it("caza el backshift (will/would, may/might) y ofrece el libro de excepciones", () => {
    expect(salida).toContain("enb1m1l1e4: el hueco 1 espera «will» y el banco trae «would»");
    expect(salida).toContain('scripts/gapbank-twins.json con la clave "enb1m1l1e4#1"');
    expect(salida).toContain("enb1m1l1e4: el hueco 2 espera «may» y el banco trae «might»");
  });

  it("el mismo lema con otra terminación es AVISO, no fallo (el sujeto suele descartarlo)", () => {
    expect(salida).toContain("enb1m1l1e8: el hueco 1 espera «gets» y el banco trae «get»");
    expect(salida).not.toContain("- enb1m1l1e8:"); // no está entre los problemas
  });

  it("la red alemana sigue intacta: conectores del mismo grupo…", () => {
    expect(salida).toContain("b1m98l1e1: el hueco 1 espera «deshalb», pero el banco ofrece «darum», «daher»");
  });

  it("…y gemelas por Umlaut o terminación, con su excepción anotable", () => {
    expect(salida).toContain("b1m98l1e2: el hueco 1 espera «muss» y el banco trae «müssen»");
    expect(salida).toContain("solo cambian el Umlaut o la terminación");
  });
});

describe("P10 · registro por idioma", () => {
  it("en inglés el registro es la forma de la petición, no un pronombre", () => {
    expect(salida).toContain('enb1m1l1e5: write register:"polite" pero el modelo filtra el registro contrario');
    expect(salida).toContain("imperativo pelado");
  });

  it("un modelo «polite» sin ni una fórmula de cortesía no enseña lo que dice enseñar", () => {
    expect(salida).toContain("no trae ni una fórmula de cortesía");
  });

  it("un registro cortés de verdad no da ni un problema", () => {
    expect(salida).not.toContain("enb1m1l1e7:");
  });

  it("el registro alemán en una fase inglesa (y al revés) se rechaza", () => {
    expect(salida).toContain('enb1m1l1e6: write register:"Sie" no existe en EN');
    expect(salida).toContain('b1m98l1e4: write register:"polite" no existe en DE');
  });

  it("la fuga du/Sie del alemán sigue saltando igual", () => {
    expect(salida).toContain('b1m98l1e3: write register:"Sie" pero el modelo filtra el registro contrario (du)');
  });
});

describe("P10 · convención de ids en los módulos nuevos", () => {
  it("un ítem de un módulo enb1m* sin el prefijo de su módulo falla", () => {
    expect(salida).toContain("enbadid vive en enb1m1 pero no lleva su prefijo");
    expect(salida).toContain("Renómbralo a enb1m1badid");
  });

  it("y la regla alemana de siempre sigue en pie", () => {
    expect(salida).toContain("b1badid vive en b1m98 pero no lleva su prefijo");
  });

  it("T5 — un módulo B2 mal prefijado también falla (la regex sale de CEFR_SCALE)", () => {
    expect(salida).toContain("nachhaltigkeit vive en b2m99 pero no lleva su prefijo");
  });

  it("V1 — un B2 bien prefijado no se salta el resto: errorfix de dos palabras sigue saltando", () => {
    expect(salida).not.toContain("b2m99gut vive en b2m99 pero no lleva su prefijo");
    expect(salida).toMatch(/b2m99l1e1: errorfix cambia/);
  });

  it("el A1 inglés está exento A PROPÓSITO: sus ids están publicados", () => {
    // `enhello`, `enbreakfast`… viajaron en los drops 3 y 4 y son claves de
    // progreso en máquinas ajenas. Si alguien "arregla" la excepción, esto
    // enseña cuánto progreso se lleva por delante.
    expect(salida).not.toContain("enhello vive en ena1m1");

    const path = join(mirror, "scripts", "validate-content.mjs");
    const src = readFileSync(path, "utf8");
    expect(src).toContain("if (A1_EN_EXENTO.test(mod)) continue;");
    writeFileSync(path, src.replace("if (A1_EN_EXENTO.test(mod)) continue;", ""));
    const sinExencion = runValidator(mirror);
    writeFileSync(path, src);

    const afectados = (sinExencion.match(/ vive en ena1m\d+ pero no lleva su prefijo/g) ?? []).length;
    expect(afectados).toBeGreaterThan(200);
  }, 60_000);
});

describe("P19 · una lectura con demasiados tokens nuevos no es input", () => {
  it("avisa, y no lo mete entre los fallos, cuando ningún token era ya un target", () => {
    expect(salida).toContain(
      "b1m98l1e7: lectura con el 0 % de los tokens que ya son target de un ítem anterior en DE",
    );
    expect(salida).toContain("Por debajo del 65 % — juicio para un texto didáctico de unas 400 palabras, no es un fallo del build");
    expect(salida).toContain("El 98 % es de textos largos de lectura extensiva");
    expect(salida).toContain("no se reescribe la lectura");
    const fallo = salida.slice(salida.indexOf("problema(s) de contenido"));
    expect(fallo).not.toContain("lectura con el");
    expect(fallo).not.toContain("b1m98l1e7:");
  });

  it("no avisa si cada token ya era target de un ítem anterior del mismo idioma", () => {
    expect(salida).not.toContain("b1m98l1e5: lectura con el");
    expect(salida).not.toContain("b1m98l1e6: lectura con el");
  });

  it("la glosa no cuenta: es la traducción, no un token de la lectura", () => {
    expect(salida).not.toContain("b1m98l1e8: lectura con el");
  });

  it("un target alemán no cubre un read inglés", () => {
    expect(salida).toContain(
      "enb1m1l1e9: lectura con el 0 % de los tokens que ya son target de un ítem anterior en EN",
    );
    const fallo = salida.slice(salida.indexOf("problema(s) de contenido"));
    expect(fallo).not.toContain("enb1m1l1e9:");
  });
});

describe("P36 · el mismo lema con artículo y sin él", () => {
  it("avisa, y no lo mete entre los fallos, cuando uno lleva el artículo de cita y el otro no", () => {
    expect(salida).toContain(
      "«Qxarthund» (de): el mismo lema está con artículo y sin él.",
    );
    expect(salida).toContain("Sin artículo: b1m98qxarthundbare («Qxarthund»)");
    expect(salida).toContain("b1m98qxarthund («der Qxarthund»)");
    expect(salida).toContain("b1m98qxarthundcap («Der Qxarthund»)");
    expect(salida).toContain("Aviso, no es un fallo del build: no se fusionan los ids.");
    const marca = salida.indexOf("problema(s) de contenido");
    expect(marca).toBeGreaterThan(-1);
    const fallo = salida.slice(marca);
    expect(fallo).not.toContain("Qxarthund");
  });

  it("en inglés pela the y an, y no cruza el lema con el alemán", () => {
    expect(salida).toContain("«Qxartcat» (en): el mismo lema está con artículo y sin él.");
    expect(salida).toContain("enb1m1qxartcatbare («Qxartcat»)");
    expect(salida).toContain("enb1m1qxartcat («the Qxartcat»)");
    expect(salida).toContain("«Qxartapple» (en): el mismo lema está con artículo y sin él.");
    expect(salida).toContain("enb1m1qxartapple («an Qxartapple»)");
    expect(salida).not.toContain("«Qxartcat» (de)");
    expect(salida).not.toContain("b1m98qxartcatbare");
  });

  it("no pliega mayúsculas del lema, diacríticos, ein, ni dos artículos distintos", () => {
    expect(salida).not.toContain("b1m98qxarthundlow");
    expect(salida).not.toContain("enb1m1qxartcatlow");
    expect(salida).not.toContain("b1m98qxartkase");
    expect(salida).not.toContain("b1m98qxartkaese");
    expect(salida).not.toContain("b1m98qxarein");
    expect(salida).not.toContain("b1m98qxartseed");
    expect(salida).not.toContain("b1m98qxartseei");
  });

  it("el mismo target sigue siendo error de N18, no este aviso", () => {
    expect(salida).toContain("«der Qxartisch» (de) está declarada 2 veces");
    expect(salida).toContain("b1m98qxartisch1");
    expect(salida).toContain("b1m98qxartisch2");
    expect(salida).not.toContain("«Qxartisch»");
  });
});

describe("P37 · la pista no puede contener la respuesta", () => {
  it("falla si hints[] trae la respuesta canónica como palabra suelta", () => {
    expect(salida).toContain("b1m98l1e9: la pista contiene la respuesta canónica («Zedqhint»)");
    expect(salida).toContain(
      "b1m98l1e14: la pista contiene la respuesta canónica («Zedqhint queda en la pista»)",
    );
  });

  it("no falla si la forma va partida, vetada o pegada a otra palabra", () => {
    expect(salida).not.toContain("b1m98l1e10:");
    expect(salida).not.toContain("b1m98l1e11:");
    expect(salida).not.toContain("b1m98l1e12:");
    expect(salida).not.toContain("b1m98l1e13:");
    expect(salida).not.toContain("b1m98l1e15:");
  });
});

describe("P34 · dictation no es un tipo", () => {
  it("un ejercicio «dictation» no pasa: el player no lo pinta y el dictado es listen", () => {
    expect(salida).toContain("b2m99l1e2: tipo de ejercicio desconocido «dictation»");
  });

  it("listen sigue siendo un tipo conocido (no se renombró a dictation)", () => {
    expect(salida).not.toContain("tipo de ejercicio desconocido «listen»");
  });
});

// ── LOS FIXTURES: contenido fabricado que DEBE fallar ────────────────────

const FIXTURE_EN = `import type { Phase, VocabItem } from "@/lib/types";

export const vocabEnB1m1: Record<string, VocabItem> = {
  // id SIN el prefijo del módulo: debe saltar la convención (P10.2)
  enbadid: { target: "to look forward to", source: "esperar con ganas", level: "b1" },
  enb1m1goodid: { target: "to put up with", source: "aguantar", level: "b1" },
  // P36: el artículo inglés se pela con la regla (the/an/a), no en otro idioma
  enb1m1qxartcat: { target: "the Qxartcat", source: "gato de prueba", level: "b1" },
  enb1m1qxartcatbare: { target: "Qxartcat", source: "gato de prueba, sin artículo", level: "b1" },
  enb1m1qxartcatlow: { target: "qxartcat", source: "minúsculas: no es el mismo lema", level: "b1" },
  enb1m1qxartapple: { target: "an Qxartapple", source: "manzana de prueba", level: "b1" },
  enb1m1qxartapplebare: { target: "Qxartapple", source: "manzana de prueba, sin artículo", level: "b1" },
};

export const enb1m1: Phase = {
  id: "enb1m1",
  level: "b1",
  n: 1,
  title: "Fixture de prueba",
  goal: "Solo existe para demostrar que las alarmas saltan.",
  color: "#2563eb",
  lessons: [
    {
      id: "enb1m1l1",
      phaseId: "enb1m1",
      title: "Casos que DEBEN fallar",
      minutes: 7,
      sections: [
        {
          kind: "exercises",
          exercises: [
            {
              // P3: read de B1 con 108 palabras. Antes se medía con la vara del
              // A1 (60-170) porque el id no empieza por "b1", y callaba.
              id: "enb1m1l1e1", type: "read",
              title: "A short text",
              text: "Nora works in a small office near the river. Every morning she takes the bus and reads the news on her phone. She likes her job, but she says the hours are long and the pay is not very good. Last year she started an evening course in design, because she wants to change careers before she turns forty. Her friends think she is brave. Her mother thinks she is throwing away a safe job for a dream. Nora says she has thought about it for a long time and she is not afraid. She knows the first year will be hard, and she has already saved enough money.",
              questions: [
                { id: "q1", q: "Where does Nora work?", options: ["In an office", "In a shop"], answer: 0 },
                { id: "q2", q: "How does she travel?", options: ["By bus", "By car"], answer: 0 },
                { id: "q3", q: "Why does she study?", options: ["To change careers", "To please her mother"], answer: 0, inference: true },
                { id: "q4", q: "What does her mother feel?", options: ["Worry", "Pride"], answer: 0 },
                // respuesta escrita bien formada: el Reading Part 4 del B1
                // inglés son preguntas abiertas, y el baremo acepta variantes
                { id: "q5", q: "Where does she catch the bus?", accepted: ["(at) the corner", "the corner"] },
                // y la que mezcla las dos formas, que no puede pasar
                { id: "q6", q: "What time?", accepted: ["six"], options: ["six", "seven"], answer: 0 },
              ],
            },
            {
              // P7: dos conectores concesivos intercambiables en el mismo banco
              id: "enb1m1l1e2", type: "gapbank",
              prompt: "Completa",
              text: "___ it was raining, we went out. We stayed for an hour ___ nobody wanted to leave.",
              answers: ["Although", "because"],
              bank: ["Although", "because", "though", "so", "however"],
              translation: "Aunque llovía, salimos.",
            },
            {
              // P7: la contracción y su forma plena, dos fichas para una respuesta
              id: "enb1m1l1e3", type: "gapbank",
              prompt: "Completa",
              text: "I ___ know the answer. She ___ come to the party.",
              answers: ["don't", "will"],
              bank: ["don't", "will", "do not", "does", "have"],
              translation: "No sé la respuesta.",
            },
            {
              // P7: backshift — will/would caben en el mismo hueco
              id: "enb1m1l1e4", type: "gapbank",
              prompt: "Completa",
              text: "He said he ___ call me. I think it ___ rain tomorrow.",
              answers: ["will", "may"],
              bank: ["will", "may", "would", "might", "shall"],
              translation: "Dijo que me llamaría.",
            },
            {
              // P10.1: registro cortés con un modelo brusco y sin ni una fórmula
              id: "enb1m1l1e5", type: "write",
              scenario: "Pide el informe a tu jefa.",
              bullets: ["Pide el informe"],
              checks: [{ re: "report", label: "pide el informe" }],
              minWords: 5, maxWords: 30,
              register: "polite",
              model: "Give me the report today. I want it before six o'clock.",
            },
            {
              // P10.1: registro alemán en una fase inglesa
              id: "enb1m1l1e6", type: "write",
              scenario: "Escribe a tu casera.",
              bullets: ["Saluda"],
              checks: [{ re: "hello", label: "saluda" }],
              minWords: 3, maxWords: 30,
              register: "Sie",
              model: "Hello Mrs Brown, could I ask you something about the flat, please?",
            },
            {
              // P7 blanda: mismo lema, otra terminación — AVISO, no fallo
              id: "enb1m1l1e8", type: "gapbank",
              prompt: "Completa",
              text: "She ___ up at seven. He ___ to work at eight.",
              answers: ["gets", "goes"],
              bank: ["gets", "goes", "get", "go", "came"],
              translation: "Se levanta a las siete.",
            },
            {
              // CONTROL: esto NO debe dar ni un problema
              id: "enb1m1l1e7", type: "write",
              scenario: "Pide un café.",
              bullets: ["Pide el café"],
              checks: [{ re: "coffee", label: "pide el café" }],
              minWords: 3, maxWords: 30,
              register: "polite",
              model: "Could I have a coffee, please? Thank you very much.",
            },
            {
              // P19: «Glompix» es target de un módulo alemán anterior. Si el
              // aviso mezclara idiomas, esta lectura saldría cubierta.
              id: "enb1m1l1e9", type: "read",
              title: "Not English",
              text: "Glompix Glompix Glompix Glompix",
              questions: [
                { id: "q1", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q2", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q3", q: "?", options: ["a", "b"], answer: 0, inference: true },
                { id: "q4", q: "?", options: ["a", "b"], answer: 0, inference: true },
              ],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "enb1m1n1",
            level: "a1",
            when: "En la calle",
            register: "amigos",
            book: "How are you?",
            real: "You alright?",
            exam: "How are you doing?",
            meaning: "¿Qué tal?",
          },
        },
      ],
    },
  ],
};
`;

const FIXTURE_DE = `import type { Phase, VocabItem } from "@/lib/types";

export const vocabB1m98: Record<string, VocabItem> = {
  b1badid: { target: "die Prüfungsangst", source: "el miedo al examen", level: "b1" },
  // presentada en la sección de frases, ANTES de las lecturas
  b1m98flurbo: { target: "Flurboqum", source: "palabra ya presentada", level: "b1" },
  // declarada en el módulo, pero ninguna sección la enseña antes del read
  b1m98zorblax: { target: "Zorblaxqum", source: "palabra que la lectura aún no ha visto", level: "b1" },
  // P36: mismo lema, uno con artículo de cita y otro sin él
  b1m98qxarthund: { target: "der Qxarthund", source: "perro de prueba", level: "b1" },
  b1m98qxarthundcap: { target: "Der Qxarthund", source: "perro de prueba, artículo en mayúscula", level: "b1" },
  b1m98qxarthundbare: { target: "Qxarthund", source: "perro de prueba, sin artículo", level: "b1" },
  b1m98qxarthundlow: { target: "qxarthund", source: "minúsculas: no es el mismo lema", level: "b1" },
  // los dos llevan artículo: der y die son palabras distintas
  b1m98qxartseed: { target: "der Qxartsee", source: "lago de prueba", level: "b1" },
  b1m98qxartseei: { target: "die Qxartsee", source: "mar de prueba", level: "b1" },
  // el diacrítico no se pliega
  b1m98qxartkaese: { target: "der Qxartkäse", source: "queso de prueba", level: "b1" },
  b1m98qxartkase: { target: "Qxartkase", source: "sin diacrítico: no es el mismo lema", level: "b1" },
  // ein no es el artículo de cita
  b1m98qxarein: { target: "ein Qxarein", source: "uno de prueba", level: "b1" },
  b1m98qxareinbare: { target: "Qxarein", source: "uno de prueba, sin ein", level: "b1" },
  // el mismo target sigue siendo error de N18, no este aviso
  b1m98qxartisch1: { target: "der Qxartisch", source: "mesa duplicada", level: "b1" },
  b1m98qxartisch2: { target: "der Qxartisch", source: "mesa duplicada, el mismo target", level: "b1" },
  // un lema alemán pelado no se junta con el inglés que sí lleva artículo
  b1m98qxartcatbare: { target: "Qxartcat", source: "no es la tarjeta inglesa", level: "b1" },
};

export const b1m98: Phase = {
  id: "b1m98",
  level: "b1",
  n: 98,
  title: "Fixture alemán",
  goal: "Demostrar que las alarmas alemanas siguen vivas.",
  color: "#2563eb",
  lessons: [
    {
      id: "b1m98l1",
      phaseId: "b1m98",
      title: "Casos alemanes que DEBEN fallar",
      minutes: 7,
      sections: [
        {
          kind: "phrases",
          title: "Una ficha que la lectura de después ya puede usar",
          itemIds: ["b1m98flurbo"],
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "b1m98l1e1", type: "gapbank",
              prompt: "Ergänze",
              text: "Es regnete, ___ blieben wir zu Hause. Ich war müde, ___ ging ich früh ins Bett.",
              answers: ["deshalb", "darum"],
              bank: ["deshalb", "darum", "daher", "weil", "obwohl"],
              translation: "Llovía, por eso nos quedamos en casa.",
            },
            {
              id: "b1m98l1e2", type: "gapbank",
              prompt: "Ergänze",
              text: "Der Müll ___ raus. Die Flaschen ___ in den Container.",
              answers: ["muss", "gehören"],
              bank: ["muss", "gehören", "müssen", "gehört", "kann"],
              translation: "La basura tiene que salir.",
            },
            {
              id: "b1m98l1e3", type: "write",
              scenario: "Escribe a tu jefa.",
              bullets: ["Saluda"],
              checks: [{ re: "Guten", label: "saluda" }],
              minWords: 3, maxWords: 30,
              register: "Sie",
              model: "Guten Tag, kannst du mir bitte den Bericht schicken?",
            },
            {
              id: "b1m98l1e4", type: "write",
              scenario: "Escribe a tu amiga.",
              bullets: ["Saluda"],
              checks: [{ re: "Hallo", label: "saluda" }],
              minWords: 3, maxWords: 30,
              register: "polite",
              model: "Hallo Anna, kannst du mir bitte den Bericht schicken?",
            },
            {
              // P19: palabras que el curso ya enseñó mucho antes. No debe avisar.
              id: "b1m98l1e5", type: "read",
              title: "Ya visto",
              text: "ich ja der die das ich ja der die das",
              questions: [
                { id: "q1", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q2", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q3", q: "?", options: ["a", "b"], answer: 0, inference: true },
                { id: "q4", q: "?", options: ["a", "b"], answer: 0, inference: true },
              ],
            },
            {
              // P19: ficha de esta misma lección, en la sección anterior.
              id: "b1m98l1e6", type: "read",
              title: "Recién presentada",
              text: "Flurboqum Flurboqum Flurboqum Flurboqum",
              questions: [
                { id: "q1", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q2", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q3", q: "?", options: ["a", "b"], answer: 0, inference: true },
                { id: "q4", q: "?", options: ["a", "b"], answer: 0, inference: true },
              ],
            },
            {
              // P19: el ítem existe en el módulo, pero todavía no se ha enseñado.
              id: "b1m98l1e7", type: "read",
              title: "Aún no",
              text: "Zorblaxqum Zorblaxqum Zorblaxqum Zorblaxqum",
              questions: [
                { id: "q1", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q2", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q3", q: "?", options: ["a", "b"], answer: 0, inference: true },
                { id: "q4", q: "?", options: ["a", "b"], answer: 0, inference: true },
              ],
            },
            {
              // P19: la glosa es la traducción. Si contara, zzzzqqqq tiraría el porcentaje.
              id: "b1m98l1e8", type: "read",
              title: "Con glosa",
              text: "[[Flurboqum|zzzzqqqq yyyyywww qqqqqzzz wwwwwyyy mmmmmnnn]] Flurboqum Flurboqum Flurboqum",
              questions: [
                { id: "q1", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q2", q: "?", options: ["a", "b"], answer: 0 },
                { id: "q3", q: "?", options: ["a", "b"], answer: 0, inference: true },
                { id: "q4", q: "?", options: ["a", "b"], answer: 0, inference: true },
              ],
            },
            {
              // P37: la pista escribe la respuesta y se puede copiar
              id: "b1m98l1e9", type: "cloze", prompt: "Completa",
              text: "Das ist ein ___.",
              answers: ["Zedqhint"],
              hints: ["La forma es Zedqhint"],
            },
            {
              // P37: partida como «m-i-t», no es palabra suelta
              id: "b1m98l1e10", type: "cloze", prompt: "Completa",
              text: "Das ist ein ___.",
              answers: ["Zedqhint"],
              hints: ["Z-e-d-q-h-i-n-t"],
            },
            {
              // P37: se cita para vetarla, no como solución
              id: "b1m98l1e11", type: "cloze", prompt: "Completa",
              text: "Das ist ein ___.",
              answers: ["Zedqhint"],
              hints: ["no escribas Zedqhint: es el ejemplo de lo que no va"],
            },
            {
              // P37: va pegada a otra palabra, no suelta
              id: "b1m98l1e12", type: "cloze", prompt: "Completa",
              text: "Das ist ein ___.",
              answers: ["Zedq"],
              hints: ["Zedqhint no es esta ficha"],
            },
            {
              // P37: el apóstrofo pega la contracción; «it» no está suelto en «It's»
              id: "b1m98l1e13", type: "cloze", prompt: "Completa",
              text: "___ is cold.",
              answers: ["It"],
              hints: ["el mismo de It's cold"],
            },
            {
              // P37: la frase entera, no solo una palabra
              id: "b1m98l1e14", type: "type", prompt: "Traduce",
              question: "Frase de prueba",
              answers: ["Zedqhint queda en la pista"],
              hints: ["Zedqhint queda en la pista"],
            },
            {
              // P37: «no X» también es veto, no la solución
              id: "b1m98l1e15", type: "cloze", prompt: "Completa",
              text: "Das ist ein ___.",
              answers: ["Zedqhint"],
              hints: ["no Zedqhint"],
            },
          ],
        },
      ],
    },
  ],
};
`;

const FIXTURE_B2 = `import type { Phase, VocabItem } from "@/lib/types";

export const vocabB2m99: Record<string, VocabItem> = {
  nachhaltigkeit: { target: "die Nachhaltigkeit", source: "la sostenibilidad", level: "b2" },
  b2m99gut: { target: "die Wende", source: "el giro", level: "b2" },
  // va el primero en el orden del espejo: si el aviso no separa idiomas,
  // el read inglés de «Glompix» quedaría cubierto
  b2m99glompix: { target: "Glompix", source: "no es una palabra inglesa", level: "b2" },
};

export const b2m99: Phase = {
  id: "b2m99",
  level: "b2",
  n: 99,
  title: "Fixture B2",
  goal: "La verja de prefijo no se salta el B2.",
  color: "#2563eb",
  lessons: [
    {
      id: "b2m99l1",
      phaseId: "b2m99",
      title: "x",
      minutes: 7,
      sections: [{ kind: "exercises", exercises: [
        {
          id: "b2m99l1e1", type: "errorfix", prompt: "Corrige.",
          wrong: "Die Nachhaltigkeit ist sehr wichtig für uns alle heute hier",
          answers: ["Die Nachhaltigkeit ist wichtig"],
          why: "sobran palabras",
        },
        // P34: el validador llegó a aceptar "dictation", un tipo que el player
        // no pinta. El dictado de verdad es listen; esto tiene que seguir fallando.
        {
          id: "b2m99l1e2", type: "dictation", prompt: "Escribe lo que oyes.",
        },
      ] }],
    },
  ],
};
`;

