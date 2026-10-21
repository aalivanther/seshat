import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { ENGLISH, GERMAN, setLangConfig } from "@/lib/language";
import { gradeText, liveCheck, liveShown } from "@/lib/grade";

// Contrato REAL de gradeText (jerarquía):
// exacto → sin mayúsculas/puntuación → convención ascii ae/oe/ue/ss (avisa)
// → Umlaut omitido (avisa; rechazado si strictUmlaut) → typo 1-2 letras
// (correct:false + almost:true, "muy cerca") → mal.

describe("gradeText — exacto", () => {
  it("respuesta exacta: correcto sin avisos", () => {
    const r = gradeText("Hallo", ["Hallo"]);
    expect(r).toEqual({ correct: true, almost: false, feedback: null, expected: "Hallo" });
  });

  it("espacios alrededor no penalizan", () => {
    const r = gradeText("  Hallo ", ["Hallo"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
  });

  it("acierta contra una alternativa aceptada (no solo la canónica)", () => {
    const r = gradeText("heisse", ["heiße", "heisse"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
    expect(r.expected).toBe("heiße"); // expected siempre es la canónica
  });
});

describe("gradeText — mayúsculas y puntuación", () => {
  it("todo en minúsculas cuando el target lleva mayúscula: correcto pero avisa", () => {
    const r = gradeText("hallo", ["Hallo"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/mayúscula/);
  });

  it("puntuación final omitida: correcto sin aviso (la mayúscula está bien)", () => {
    const r = gradeText("Wie heißt du", ["Wie heißt du?"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
    expect(r.feedback).toBeNull();
  });

  it("espaciado múltiple interno se pliega", () => {
    const r = gradeText("Wie   heißt   du?", ["Wie heißt du?"]);
    expect(r.correct).toBe(true);
  });
});

describe("gradeText — convención ascii ae/oe/ue/ss", () => {
  it("«muede» por «müde»: válido con aviso", () => {
    const r = gradeText("muede", ["müde"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/con sus letras/);
  });

  it("«dreissig» por «dreißig» (ß→ss): válido con aviso", () => {
    const r = gradeText("dreissig", ["dreißig"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
  });

  it("la convención ascii sigue valiendo BAJO strictUmlaut («Aepfel» por «Äpfel»)", () => {
    const r = gradeText("Aepfel", ["Äpfel"], { strictUmlaut: true });
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
  });
});

describe("gradeText — Umlaut omitido", () => {
  it("«mude» por «müde»: cuenta como correcto pero avisa (almost)", () => {
    const r = gradeText("mude", ["müde"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/Umlaut/);
  });

  it("strictUmlaut rechaza el Umlaut omitido («mude» ≠ «müde»)", () => {
    const r = gradeText("mude", ["müde"], { strictUmlaut: true });
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(true); // cae a la rama de typo: "muy cerca", pero NO correcto
  });

  it("strictUmlaut rechaza «Apfel» por «Äpfel» (el Umlaut ES el objetivo)", () => {
    const r = gradeText("Apfel", ["Äpfel"], { strictUmlaut: true });
    expect(r.correct).toBe(false);
  });
});

describe("gradeText — typos", () => {
  it("typo de 1 letra: NO correcto, pero almost con 'muy cerca' (contrato real)", () => {
    const r = gradeText("Katse", ["Katze"]);
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/cerca/i);
  });

  it("targets largos (>10) perdonan hasta 2 letras como almost", () => {
    const r = gradeText("Progamierer", ["Programmierer"]); // faltan una r y una m
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(true);
  });

  it("targets cortos (≤3) no entran a la rama de typo", () => {
    const r = gradeText("jaa", ["ja"]);
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(false);
  });
});

describe("gradeText — ss NUNCA colapsa a s", () => {
  it("«ist» no vale por «isst» (nunca correcto; a lo sumo 'muy cerca')", () => {
    const r = gradeText("ist", ["isst"]);
    expect(r.correct).toBe(false);
  });

  it("«isst» no vale por «ist» (ni siquiera almost: target corto)", () => {
    const r = gradeText("isst", ["ist"]);
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(false);
  });

  it("«dreisig» (una s) por «dreißig»: no correcto — la convención exige ss", () => {
    const r = gradeText("dreisig", ["dreißig"]);
    expect(r.correct).toBe(false);
  });
});

describe("gradeText — mal", () => {
  it("respuesta sin relación: incorrecto sin feedback", () => {
    const r = gradeText("Auto", ["müde"]);
    expect(r).toEqual({ correct: false, almost: false, feedback: null, expected: "müde" });
  });
});

describe("liveCheck", () => {
  it("vacío o solo espacios → empty", () => {
    expect(liveCheck("", ["müde"])).toBe("empty");
    expect(liveCheck("   ", ["müde"])).toBe("empty");
  });

  it("respuesta completa → ready (case-insensitive)", () => {
    expect(liveCheck("müde", ["müde"])).toBe("ready");
    expect(liveCheck("MÜDE", ["müde"])).toBe("ready");
  });

  it("prefijo válido → ontrack", () => {
    expect(liveCheck("mü", ["müde"])).toBe("ontrack");
  });

  it("un typo en curso se tolera → ontrack", () => {
    expect(liveCheck("halo", ["Hallo"])).toBe("ontrack");
  });

  it("texto sin relación → off", () => {
    expect(liveCheck("xyz", ["müde"])).toBe("off");
  });

  it("coherente con strictUmlaut: «mude» es ready sin strict y NO ready con strict", () => {
    expect(liveCheck("mude", ["müde"])).toBe("ready");
    expect(liveCheck("mude", ["müde"], { strictUmlaut: true })).not.toBe("ready");
  });

  it("con strictUmlaut la convención ascii sí da ready («muede»)", () => {
    expect(liveCheck("muede", ["müde"], { strictUmlaut: true })).toBe("ready");
  });
});

describe("P14 — comprobar no se adelanta en verde", () => {
  it("el encaje completo se enseña igual que el prefijo", () => {
    expect(liveShown("ready")).toBe("ontrack");
    expect(liveShown("ontrack")).toBe("ontrack");
    expect(liveShown(liveCheck("müde", ["müde"]))).toBe("ontrack");
    expect(liveShown(liveCheck("mü", ["müde"]))).toBe("ontrack");
    expect(liveShown(liveCheck("müde", ["müde"]))).toBe(liveShown(liveCheck("mü", ["müde"])));
  });

  it("el desvío a mitad de palabra no se esconde", () => {
    expect(liveShown("off")).toBe("off");
    expect(liveShown("empty")).toBe("empty");
    expect(liveShown(liveCheck("xyz", ["müde"]))).toBe("off");
    expect(liveShown(liveCheck("", ["müde"]))).toBe("empty");
    expect(liveShown(liveCheck("halo", ["Hallo"]))).toBe("ontrack");
  });

  it("liveCheck sigue marcando ready: encajar no ensucia la nota", () => {
    expect(liveCheck("müde", ["müde"])).toBe("ready");
    const r = gradeText("müde", ["müde"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
  });

  it("la pantalla no pinta un verde distinto al completar", () => {
    const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
    const kinds = readFileSync(join(web, "components", "kinds", "shared.tsx"), "utf8");
    const css = readFileSync(join(web, "components", "ex.module.css"), "utf8");
    expect(kinds).toMatch(/liveShown\(liveCheck\(/);
    expect(kinds).toMatch(/Vas por buen camino/);
    expect(kinds).toMatch(/Algo no cuadra — relee lo que llevas/);
    expect(kinds).not.toMatch(/Eso encaja/);
    expect(kinds).not.toMatch(/inputReady/);
    expect(kinds).not.toMatch(/liveOk/);
    expect(kinds).not.toMatch(/live === "ready"/);
    expect(css).not.toMatch(/\.inputReady|\.liveOk/);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Equivalencias por idioma (P1): dos escrituras que son LA MISMA respuesta.
// El alemán no declara ninguna, así que todo lo de arriba sigue igual; el
// inglés declara contracciones y números.
// ─────────────────────────────────────────────────────────────────────────────

/** las dos escrituras de una misma respuesta inglesa: contraída y plena */
const CONTRACCIONES: [string, string][] = [
  ["I'm tired", "I am tired"],
  ["I don't know", "I do not know"],
  ["She won't come", "She will not come"],
  ["I can't swim", "I cannot swim"],
  ["It's cold today", "It is cold today"],
  ["There's a problem", "There is a problem"],
  ["I've seen it", "I have seen it"],
  ["Let's start", "Let us start"],
  ["It isn't easy", "It is not easy"],
  ["They aren't ready", "They are not ready"],
  ["She wasn't there", "She was not there"],
  ["He hasn't called", "He has not called"],
  ["We couldn't wait", "We could not wait"],
  ["You shouldn't worry", "You should not worry"],
  ["I wouldn't do that", "I would not do that"],
  ["You mustn't forget", "You must not forget"],
  ["I'll be there", "I will be there"],
  ["We're leaving now", "We are leaving now"],
  ["They're waiting", "They are waiting"],
  ["That's mine", "That is mine"],
  ["What's happening", "What is happening"],
  ["Who's coming", "Who is coming"],
  ["He doesn't care", "He does not care"],
  ["I didn't go", "I did not go"],
  ["We hadn't finished", "We had not finished"],
  ["You've won", "You have won"],
  ["It'll be fine", "It will be fine"],
];

describe("inglés — contracción y forma plena son la misma respuesta", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it.each(CONTRACCIONES)("«%s» vale por «%s»", (contraida, plena) => {
    const r = gradeText(contraida, [plena]);
    expect(r.correct).toBe(true);
    // una equivalencia es un acierto LIMPIO, no un «casi»
    expect(r.almost).toBe(false);
    expect(r.feedback).toBeNull();
  });

  it.each(CONTRACCIONES)("«%2$s» vale por «%1$s» (el otro sentido)", (contraida, plena) => {
    const r = gradeText(plena, [contraida]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
  });

  it("«can not» separado también vale por «can't»", () => {
    expect(gradeText("I can not swim", ["I can't swim"]).correct).toBe(true);
    expect(gradeText("I can't swim", ["I can not swim"]).correct).toBe(true);
  });

  it("he'd es «he had» Y «he would»: las dos valen", () => {
    expect(gradeText("He'd already left", ["He had already left"]).correct).toBe(true);
    expect(gradeText("He'd help you", ["He would help you"]).correct).toBe(true);
    expect(gradeText("She'd finished", ["She had finished"]).correct).toBe(true);
    expect(gradeText("I'd like a coffee", ["I would like a coffee"]).correct).toBe(true);
  });

  it("there's es «there is» y «there has»", () => {
    expect(gradeText("There's been a mistake", ["There has been a mistake"]).correct).toBe(true);
    expect(gradeText("There is time", ["There's time"]).correct).toBe(true);
  });

  it("la equivalencia NO se come el aviso de mayúsculas", () => {
    const r = gradeText("i am tired", ["I'm tired"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/mayúscula/);
  });

  it("la equivalencia NO se come la detección de typo", () => {
    const r = gradeText("I do nott know", ["I don't know"]);
    expect(r.correct).toBe(false);
    expect(r.almost).toBe(true);
    expect(r.feedback).toMatch(/cerca/i);
  });

  it("el apóstrofo tipográfico ’ se trata como el recto", () => {
    expect(gradeText("I don’t know", ["I do not know"]).correct).toBe(true);
  });
});

describe("inglés — lo que la tabla NO iguala, a propósito", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it("your / you're siguen siendo respuestas distintas", () => {
    expect(gradeText("your welcome", ["you're welcome"]).correct).toBe(false);
    expect(gradeText("Is that your car", ["Is that you're car"]).correct).toBe(false);
  });

  it("their / they're / there siguen siendo respuestas distintas", () => {
    expect(gradeText("their coming", ["they're coming"]).correct).toBe(false);
    expect(gradeText("there coming", ["they're coming"]).correct).toBe(false);
  });

  it("ain't no vale por «am not» (no es respuesta de examen)", () => {
    expect(gradeText("I ain't ready", ["I am not ready"]).correct).toBe(false);
  });

  it("gonna/wanna no valen por su forma plena", () => {
    expect(gradeText("I'm gonna call her", ["I am going to call her"]).correct).toBe(false);
    expect(gradeText("I wanna go", ["I want to go"]).correct).toBe(false);
  });

  it("la concordancia sigue puntuando: «I doesn't» no vale por «I don't»", () => {
    expect(gradeText("I doesn't know", ["I don't know"]).correct).toBe(false);
    expect(gradeText("She don't care", ["She doesn't care"]).correct).toBe(false);
  });

  it("«Well done» sigue casando consigo mismo pese a well = we will", () => {
    const r = gradeText("Well done", ["Well done"]);
    expect(r.correct).toBe(true);
    expect(r.almost).toBe(false);
  });
});

describe("inglés — cifra, palabra y ordinal", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it("la palabra vale cuando lo esperado es la cifra (baremo oficial: «16 / sixteen»)", () => {
    expect(gradeText("sixteen", ["16"]).correct).toBe(true);
    expect(gradeText("thirty", ["30"]).correct).toBe(true);
    expect(gradeText("nine", ["9"]).correct).toBe(true);
    expect(gradeText("twenty-one", ["21"]).correct).toBe(true);
    expect(gradeText("twenty one", ["21"]).correct).toBe(true);
  });

  it("los ordinales igual («second / 2nd»)", () => {
    expect(gradeText("first", ["1st"]).correct).toBe(true);
    expect(gradeText("second", ["2nd"]).correct).toBe(true);
    expect(gradeText("third", ["3rd"]).correct).toBe(true);
    expect(gradeText("twelfth", ["12th"]).correct).toBe(true);
    expect(gradeText("thirty-first", ["31st"]).correct).toBe(true);
  });

  it("dentro de una frase, y sin tocar el resto", () => {
    expect(gradeText("on the second floor", ["on the 2nd floor"]).correct).toBe(true);
    expect(gradeText("at sixteen Green Street", ["at 16 Green Street"]).correct).toBe(true);
    expect(gradeText("at seventeen Green Street", ["at 16 Green Street"]).correct).toBe(false);
  });

  it("es un acierto limpio, no un «casi»", () => {
    const r = gradeText("16", ["16"]);
    expect(r.almost).toBe(false);
    expect(gradeText("sixteen", ["16"]).almost).toBe(false);
  });

  it("al revés NO: si el ejercicio pide la palabra, la cifra no vale", () => {
    // el módulo de números del A1 inglés enseña a ESCRIBIR eleven, forty…
    expect(gradeText("11", ["eleven"]).correct).toBe(false);
    expect(gradeText("40", ["forty"]).correct).toBe(false);
    expect(gradeText("25", ["twenty-five", "twenty five"]).correct).toBe(false);
    expect(gradeText("2nd", ["second"]).correct).toBe(false);
    expect(gradeText("7, 8, 9", ["seven, eight, nine"]).correct).toBe(false);
  });

  it("numeralsEitherWay (respuesta corta de simulacro) sí abre los dos sentidos", () => {
    expect(gradeText("2nd", ["second"], { numeralsEitherWay: true }).correct).toBe(true);
    expect(gradeText("16", ["sixteen"], { numeralsEitherWay: true }).correct).toBe(true);
    expect(gradeText("sixteen", ["16"], { numeralsEitherWay: true }).correct).toBe(true);
    // y sigue sin regalar respuestas equivocadas
    expect(gradeText("17", ["sixteen"], { numeralsEitherWay: true }).correct).toBe(false);
  });

  it("una palabra que no es número no se toca", () => {
    expect(gradeText("won", ["1"]).correct).toBe(false);
    expect(gradeText("the ten", ["the 16"]).correct).toBe(false);
  });
});

describe("inglés — una regresión por cada tipo de ejercicio afectado", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it("cloze: el hueco admite las dos escrituras", () => {
    expect(gradeText("don't", ["do not"]).correct).toBe(true);
    expect(gradeText("do not", ["don't"]).correct).toBe(true);
  });

  it("type: producción de la frase entera", () => {
    expect(gradeText("I haven't got any money", ["I have not got any money"]).correct).toBe(true);
  });

  it("listen: dictado", () => {
    expect(gradeText("She's been waiting for an hour", ["She has been waiting for an hour"]).correct).toBe(true);
  });

  it("transform: directa → indirecta", () => {
    expect(
      gradeText("I don't know where she is", ["I do not know where she is"]).correct,
    ).toBe(true);
  });

  it("errorfix: la frase corregida", () => {
    expect(gradeText("I'm not agree is wrong; I don't agree", ["I am not agree is wrong; I do not agree"]).correct).toBe(true);
  });

  it("paraphrase: la misma idea con otras palabras", () => {
    expect(gradeText("It isn't worth it", ["It is not worth it"]).correct).toBe(true);
  });

  it("translate: del español al inglés", () => {
    expect(gradeText("I've lived here for three years", ["I have lived here for three years"]).correct).toBe(true);
  });

  it("build: las fichas montadas en el otro orden de escritura", () => {
    // el build corrige la cadena de fichas: "do not" armado contra "don't"
    expect(gradeText("We do not have time", ["We don't have time"]).correct).toBe(true);
  });
});

describe("inglés — liveCheck coherente con Comprobar", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it("la equivalencia completa da ready (lo que Comprobar aceptará)", () => {
    expect(liveCheck("I do not know", ["I don't know"])).toBe("ready");
    expect(liveCheck("I don't know", ["I do not know"])).toBe("ready");
    expect(liveCheck("sixteen", ["16"])).toBe("ready");
  });

  it("tecleando la forma plena no salta el rojo por el camino", () => {
    expect(liveCheck("I do", ["I don't know"])).toBe("ontrack");
    expect(liveCheck("I do no", ["I don't know"])).toBe("ontrack");
    expect(liveCheck("I do not kn", ["I don't know"])).toBe("ontrack");
  });

  it("tecleando el número en letra tampoco", () => {
    expect(liveCheck("six", ["16"])).toBe("ontrack");
  });

  it("no promete verde a lo que Comprobar rechaza", () => {
    expect(liveCheck("11", ["eleven"])).not.toBe("ready");
    expect(liveCheck("your welcome", ["you're welcome"])).not.toBe("ready");
    expect(liveCheck("I doesn't know", ["I don't know"])).not.toBe("ready");
  });

  it("lo que no tiene nada que ver sigue en off", () => {
    expect(liveCheck("banana split", ["I don't know"])).toBe("off");
  });
});

describe("alemán — las equivalencias no le tocan un pelo", () => {
  beforeAll(() => setLangConfig(GERMAN));

  it("cifra y palabra siguen siendo respuestas distintas", () => {
    expect(gradeText("30", ["dreißig"]).correct).toBe(false);
    expect(gradeText("dreißig", ["30"]).correct).toBe(false);
    expect(gradeText("zwanzig", ["20"]).correct).toBe(false);
    expect(gradeText("16", ["sechzehn"]).correct).toBe(false);
    expect(gradeText("sechzehn", ["16"]).correct).toBe(false);
  });

  it("ni siquiera con numeralsEitherWay: el alemán no declara equivalencias", () => {
    expect(gradeText("30", ["dreißig"], { numeralsEitherWay: true }).correct).toBe(false);
  });

  it("las contracciones alemanas no se igualan a la forma plena", () => {
    expect(gradeText("im Kino", ["in dem Kino"]).correct).toBe(false);
    expect(gradeText("zum Bahnhof", ["zu dem Bahnhof"]).correct).toBe(false);
    expect(gradeText("Ich gehe ins Kino", ["Ich gehe in das Kino"]).correct).toBe(false);
  });

  it("la cascada de siempre sigue intacta", () => {
    expect(gradeText("muede", ["müde"])).toEqual({
      correct: true, almost: true,
      feedback: "Válido — pero escríbelo con sus letras: müde", expected: "müde",
    });
    expect(gradeText("ist", ["isst"]).correct).toBe(false);
    expect(gradeText("Katse", ["Katze"]).almost).toBe(true);
    expect(gradeText("jaa", ["ja"]).almost).toBe(false);
    expect(liveCheck("mude", ["müde"], { strictUmlaut: true })).not.toBe("ready");
  });
});

describe("inglés — strictContractions: cuando la escritura ES el objetivo", () => {
  beforeAll(() => setLangConfig(ENGLISH));
  afterAll(() => setLangConfig(GERMAN));

  it("la vacuna «Yes, I'm» → «Yes, I am» no se regala", () => {
    const opts = { strictContractions: true };
    expect(gradeText("Yes, I'm.", ["Yes, I am.", "Yes, I am"], opts).correct).toBe(false);
    expect(gradeText("Yes, I am.", ["Yes, I am.", "Yes, I am"], opts).correct).toBe(true);
  });

  it("el transform que pide contraer exige la contracción", () => {
    const opts = { strictContractions: true };
    expect(gradeText("He is my brother.", ["He's my brother."], opts).correct).toBe(false);
    expect(gradeText("He's my brother.", ["He's my brother."], opts).correct).toBe(true);
  });

  it("el dictado corrige lo que se oyó, no una forma equivalente", () => {
    const opts = { strictContractions: true };
    expect(gradeText("They are my parents.", ["They're my parents."], opts).correct).toBe(false);
    expect(gradeText("I do not understand.", ["I don't understand."], opts).correct).toBe(false);
    expect(gradeText("I don't understand.", ["I don't understand."], opts).correct).toBe(true);
  });

  it("sigue perdonando lo de siempre: mayúsculas, puntuación y typos", () => {
    const opts = { strictContractions: true };
    expect(gradeText("they're my parents", ["They're my parents."], opts).correct).toBe(true);
    expect(gradeText("They're my parants.", ["They're my parents."], opts).almost).toBe(true);
  });

  it("liveCheck no promete verde a la forma que el ejercicio rechaza", () => {
    const opts = { strictContractions: true };
    expect(liveCheck("I do not understand", ["I don't understand."], opts)).not.toBe("ready");
    expect(liveCheck("I don't understand", ["I don't understand."], opts)).toBe("ready");
  });

  it("no toca los números: el flag es solo de contracciones", () => {
    expect(gradeText("sixteen", ["16"], { strictContractions: true }).correct).toBe(true);
  });
});

// REGRESIÓN: la tabla de contracciones daba por buena una palabra DISTINTA.
// `clean()` borra el apóstrofo, así que «we're» y «were» llegaban iguales al
// corrector y «we are» se aceptaba donde la respuesta era «were» — el pasado de
// `be`, que es la gramática ancla de un módulo entero del A2. Ídem «we will»
// por «well». Ahora esas formas solo se expanden si hay apóstrofo escrito.
describe("contracciones que son otra palabra", () => {
  it("no acepta la forma plena cuando la respuesta es la palabra real", () => {
    setLangConfig(ENGLISH);
    expect(gradeText("we are", ["were"]).correct).toBe(false);
    expect(gradeText("we will", ["well"]).correct).toBe(false);
    expect(gradeText("it is", ["its"]).correct).toBe(false);
    expect(gradeText("i would", ["id"]).correct).toBe(false);
  });

  it("con el apóstrofo escrito sí son la misma respuesta", () => {
    setLangConfig(ENGLISH);
    expect(gradeText("we're", ["we are"]).correct).toBe(true);
    expect(gradeText("we are", ["we're"]).correct).toBe(true);
    expect(gradeText("it's cold", ["it is cold"]).correct).toBe(true);
  });

  it("las contracciones que NO son otra palabra siguen valiendo sin apóstrofo", () => {
    setLangConfig(ENGLISH);
    expect(gradeText("dont", ["do not"]).correct).toBe(true);
    expect(gradeText("do not", ["don't"]).correct).toBe(true);
    expect(gradeText("Im", ["I am"]).correct).toBe(true);
    expect(gradeText("wont", ["will not"]).correct).toBe(true);
  });
});
