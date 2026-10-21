import { describe, expect, it } from "vitest";
import { foldLessonItems, type LessonFoldOutcome } from "@/lib/lessonFold";
import { modeOf, type ReviewMode } from "@/lib/types";

// Contrato del pliegue de la lección. Orden, mayoría estricta y empate se
// fotografiaron en P04 y no se mueven. P05: producir solo si alguna
// producción salió bien. P06: un acierto con casi, pista o segundo intento
// cuenta como fallo para el SRS. P07: el monólogo llega como reconocimiento
// (modeOf, igual que speak) y no levanta el techo. La nota de la lección no
// se decide aquí. Repaso, prueba y reto no pasan por aquí.

function fila(
  itemIds: readonly string[],
  correct: boolean,
  mode: ReviewMode,
): LessonFoldOutcome {
  return { itemIds, correct, mode };
}

function sucio(
  itemIds: readonly string[],
  flags: {
    almost?: boolean;
    usedHints?: number;
    attempts?: number;
    mode?: ReviewMode;
  } = {},
): LessonFoldOutcome {
  return { itemIds, correct: true, mode: "produce", ...flags };
}

describe("foldLessonItems", () => {
  it("sin ejercicios no hay filas, y un ejercicio sin ítems tampoco", () => {
    expect(foldLessonItems([])).toEqual([]);
    expect(foldLessonItems([fila([], true, "produce")])).toEqual([]);
  });

  it("una fila por ítem, en el orden en que apareció, no por ejercicio", () => {
    const rows = foldLessonItems([
      fila(["b", "a"], true, "recognize"),
      fila(["a"], true, "recognize"),
      fila(["c"], false, "recognize"),
    ]);
    expect(rows.map((r) => r.itemId)).toEqual(["b", "a", "c"]);
    expect(rows).toEqual([
      { itemId: "b", correct: true, mode: "recognize" },
      { itemId: "a", correct: true, mode: "recognize" },
      { itemId: "c", correct: false, mode: "recognize" },
    ]);
  });

  it("un ejercicio con varios ítems reparte el mismo veredicto a cada uno", () => {
    expect(foldLessonItems([fila(["uno", "dos"], false, "produce")])).toEqual([
      { itemId: "uno", correct: false, mode: "recognize" },
      { itemId: "dos", correct: false, mode: "recognize" },
    ]);
    expect(foldLessonItems([fila(["uno", "dos"], true, "produce")])).toEqual([
      { itemId: "uno", correct: true, mode: "produce" },
      { itemId: "dos", correct: true, mode: "produce" },
    ]);
  });

  it("acierto solo con mayoría estricta: el empate vuelve a repaso", () => {
    expect(foldLessonItems([
      fila(["wort"], true, "recognize"),
      fila(["wort"], false, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: false, mode: "recognize" }]);

    expect(foldLessonItems([
      fila(["wort"], true, "recognize"),
      fila(["wort"], true, "recognize"),
      fila(["wort"], false, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });

  it("un id repetido en el mismo ejercicio cuenta cada aparición", () => {
    // el bucle no deduplica: dos menciones y un fallo son 2 a 1, no un empate
    expect(foldLessonItems([
      fila(["wort", "wort"], true, "recognize"),
      fila(["wort"], false, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });

  it("el modo de un ítem no contagia al de al lado", () => {
    expect(foldLessonItems([
      fila(["visto"], true, "recognize"),
      fila(["escrito"], true, "produce"),
    ])).toEqual([
      { itemId: "visto", correct: true, mode: "recognize" },
      { itemId: "escrito", correct: true, mode: "produce" },
    ]);
  });

  it("P05: dos reconocimientos bien y una producción mal no son un acierto productivo", () => {
    // La mayoría sigue siendo acierto. El modo no: ninguna producción
    // salió bien, así que no se levanta el techo de 16 días.
    expect(foldLessonItems([
      fila(["wort"], true, "recognize"),
      fila(["wort"], true, "recognize"),
      fila(["wort"], false, "produce"),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });

  it("P05: una producción fallida no viaja como produce", () => {
    expect(foldLessonItems([
      fila(["wort"], false, "produce"),
    ])).toEqual([{ itemId: "wort", correct: false, mode: "recognize" }]);
  });

  it("P05: una producción bien marca el modo aunque el ítem no sea un acierto", () => {
    // 1 a 2: la mayoría estricta no se toca. El modo sí es producir,
    // porque esa tentativa salió bien.
    expect(foldLessonItems([
      fila(["wort"], true, "produce"),
      fila(["wort"], false, "recognize"),
      fila(["wort"], false, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: false, mode: "produce" }]);
  });

  it("P05: un reconocimiento posterior no borra la producción que salió bien", () => {
    expect(foldLessonItems([
      fila(["wort"], true, "produce"),
      fila(["wort"], true, "recognize"),
      fila(["wort"], true, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "produce" }]);
  });

  it("P05: un reconocimiento posterior no convierte en producción la que se falló", () => {
    expect(foldLessonItems([
      fila(["wort"], false, "produce"),
      fila(["wort"], true, "recognize"),
      fila(["wort"], true, "recognize"),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });

  it("P05: entre dos producciones basta la que salió bien, y el empate no es acierto", () => {
    expect(foldLessonItems([
      fila(["wort"], false, "produce"),
      fila(["wort"], true, "produce"),
    ])).toEqual([{ itemId: "wort", correct: false, mode: "produce" }]);
  });

  it("P06: umlaut, dictado a la vista, pista y segundo intento no son recuperación", () => {
    // Juicio. Esas cuatro salen de la pantalla con correct true y nota
    // 0,75. Aquí no son un acierto: cuentan como fallo, así que la fila va
    // en falso y el servidor cita el ítem a diez minutos. No hay un tercer
    // estado. La nota de la lección no se toca en este pliegue.
    //
    // El dictado revelado llega como almost, no como pista: «Mostrar la
    // frase» no incrementa usedHints. Si esta prueba solo mirara la pista,
    // el dictado seguiría colando como producción.
    //
    // Sin otra producción limpia, el modo es reconocer: igual que un fallo
    // de producción. No suma prodCorrect y no levanta el techo de 16 días.
    expect(foldLessonItems([
      sucio(["umlaut"], { almost: true }),
      sucio(["dictado"], { almost: true, usedHints: 0, attempts: 1 }),
      sucio(["pista"], { usedHints: 1, attempts: 1, almost: false }),
      sucio(["reintento"], { attempts: 2, usedHints: 0, almost: false }),
    ])).toEqual([
      { itemId: "umlaut", correct: false, mode: "recognize" },
      { itemId: "dictado", correct: false, mode: "recognize" },
      { itemId: "pista", correct: false, mode: "recognize" },
      { itemId: "reintento", correct: false, mode: "recognize" },
    ]);
  });

  it("P06: un sucio es un voto en contra, no un veto y no tres votos", () => {
    // La fórmula sigue siendo ok > bad. ok solo cuenta lo limpio; el sucio
    // suma a bad, una sola vez, aunque traiga casi, pista y reintento juntos.
    // Dos limpios ganan a un sucio. Uno y uno empatan, y el empate no es
    // acierto. Si el sucio no pesara, un limpio y un casi saldrían sabidos.
    // La producción limpia del empate sí marca el modo: salió bien, aunque
    // la fila, por mayoría, sea un fallo.
    expect(foldLessonItems([
      sucio(["todo"], { almost: true, usedHints: 2, attempts: 2 }),
    ])).toEqual([{ itemId: "todo", correct: false, mode: "recognize" }]);

    expect(foldLessonItems([
      fila(["empate"], true, "produce"),
      sucio(["empate"], { almost: true }),
    ])).toEqual([{ itemId: "empate", correct: false, mode: "produce" }]);

    expect(foldLessonItems([
      fila(["mayoria"], true, "produce"),
      fila(["mayoria"], true, "produce"),
      sucio(["mayoria"], { usedHints: 1 }),
    ])).toEqual([{ itemId: "mayoria", correct: true, mode: "produce" }]);
  });

  it("P06: un dictado revelado no levanta el techo aunque lo demás sea acierto", () => {
    // Dos reconocimientos limpios ganan la mayoría. La producción sucia no
    // pone el modo: la fila es acierto de reconocimiento, y el techo de 16
    // días sigue en su sitio.
    expect(foldLessonItems([
      fila(["wort"], true, "recognize"),
      fila(["wort"], true, "recognize"),
      sucio(["wort"], { almost: true, mode: "produce" }),
    ])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });

  it("P06: el sucio de un ítem no mancha al de al lado", () => {
    expect(foldLessonItems([
      sucio(["sucio", "tambien"], { almost: true }),
      fila(["limpio"], true, "produce"),
    ])).toEqual([
      { itemId: "sucio", correct: false, mode: "recognize" },
      { itemId: "tambien", correct: false, mode: "recognize" },
      { itemId: "limpio", correct: true, mode: "produce" },
    ]);
  });

  it("P06: un typo ya venía en falso; el casi no lo convierte en otra fila", () => {
    // grade.ts deja el typo de una o dos letras en correct false. El almost
    // de ese aviso no suaviza ni duplica: es el mismo fallo que cualquier
    // producción que no salió.
    expect(foldLessonItems([{
      itemIds: ["typo"],
      correct: false,
      mode: "produce",
      almost: true,
      attempts: 2,
    }])).toEqual([{ itemId: "typo", correct: false, mode: "recognize" }]);
  });

  it("P06: la nota no decide el pliegue; sin casi, pista ni reintento sigue siendo limpio", () => {
    // Un 0,75 suelto no se inventa un fallo: la nota vive en la pantalla.
    // A la primera, sin pista y sin casi, la fila sigue siendo recuperación.
    const soloNota = {
      itemIds: ["nota"],
      correct: true,
      mode: "produce" as const,
      score: 0.75,
    };
    expect(foldLessonItems([soloNota])).toEqual([
      { itemId: "nota", correct: true, mode: "produce" },
    ]);
    expect(foldLessonItems([{
      itemIds: ["limpio"],
      correct: true,
      mode: "produce",
      almost: false,
      usedHints: 0,
      attempts: 1,
    }])).toEqual([{ itemId: "limpio", correct: true, mode: "produce" }]);
  });

  it("P07: un monólogo marcado al completo no viaja como producción", () => {
    // La lista la pone el alumno. Con el 60 % la pantalla manda correct y
    // almost, y P06 ya no lo cuenta como limpio. El agujero era la lista
    // entera: correcto, sin casi, a la primera. modeOf lo deja en
    // reconocimiento, igual que speak, así que la fila no suma prodCorrect
    // ni levanta el techo de 16 días. La nota de la lección no sale de aquí.
    expect(modeOf("monologue")).toBe("recognize");
    expect(foldLessonItems([{
      itemIds: ["wort"],
      correct: true,
      mode: modeOf("monologue"),
      almost: false,
      usedHints: 0,
      attempts: 1,
    }])).toEqual([{ itemId: "wort", correct: true, mode: "recognize" }]);
  });
});
