import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as barrel from "@/components/ExerciseKinds";
import { AudioMC } from "@/components/kinds/AudioMC";
import { Bucket } from "@/components/kinds/Bucket";
import { Build } from "@/components/kinds/Build";
import { Cloze } from "@/components/kinds/Cloze";
import { Errorfix } from "@/components/kinds/Errorfix";
import { Fastmatch } from "@/components/kinds/Fastmatch";
import { Gapbank } from "@/components/kinds/Gapbank";
import { Hearreal } from "@/components/kinds/Hearreal";
import { Listen } from "@/components/kinds/Listen";
import { Match } from "@/components/kinds/Match";
import { MC } from "@/components/kinds/MC";
import { Monologue } from "@/components/kinds/Monologue";
import { Order } from "@/components/kinds/Order";
import { Paraphrase } from "@/components/kinds/Paraphrase";
import { Read } from "@/components/kinds/Read";
import { Shadow } from "@/components/kinds/Shadow";
import { Speak } from "@/components/kinds/Speak";
import { Transform } from "@/components/kinds/Transform";
import { Translate } from "@/components/kinds/Translate";
import { TypeEx } from "@/components/kinds/TypeEx";
import { Write } from "@/components/kinds/Write";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(join(web, rel), "utf8");

const LOCAL = {
  MC, Cloze, Build, Match, TypeEx, Listen, Speak, Order, Transform, Bucket, Shadow,
  Fastmatch, Hearreal, Write, AudioMC, Read, Gapbank, Errorfix, Paraphrase, Translate, Monologue,
} as const;

/** Un trozo que el alumno ve, o que solo existe en ese tipo. Tiene que irse con el fichero. */
const HUELLA: Record<keyof typeof LOCAL, string> = {
  MC: "filter(isVocabTarget)",
  Cloze: "Lo que va en el hueco",
  Build: "Toca las fichas en orden para construir la frase",
  Match: "Una de cada columna, si crees que van juntas",
  TypeEx: "accepted={ex.answers}",
  Listen: "Mostrar la frase (cuenta como pista)",
  Speak: "Ya lo leí en voz alta",
  Order: "Toca las oraciones en el orden en que pasaron",
  Transform: "Escríbela transformada...",
  Bucket: "Ronda completa",
  Shadow: "Sombrear (despacio)",
  Fastmatch: "Emparejar de siempre, con reloj",
  Hearreal: "Como se dice en la calle",
  Write: "Se puntúan las funciones y el rango de palabras",
  AudioMC: "Tu cuaderno — apunta mientras suena",
  Read: "Plegar el texto",
  Gapbank: "Banco de palabras",
  Translate: "Tradúcelo al idioma que estudias",
  Errorfix: "Escríbela bien…",
  Paraphrase: "La misma idea, otras palabras…",
  Monologue: "Preparar (",
};

/** Clases que no usa ningún otro tipo: se fueron con la hoja del tipo. */
const CSS_PROPIO: Record<string, string[]> = {
  build: ["tokenArea", "tokenAreaEmpty", "tokenPool", "token", "tokenUsed", "tokenPlaced"],
  order: ["tokenAreaEmpty"],
  transform: ["transformLabel"],
  bucket: ["bucketStage", "bucketItem", "bucketOk", "bucketBad", "bucketBtn"],
  write: ["writeArea", "writeRubric", "bandBtn", "bandOn"],
  audiomc: ["notepad", "notepadArea", "notepadClosed"],
  read: ["readStick", "readText", "readToggle"],
  gapbank: ["gapText", "gapSlot", "bankWord", "bankTimes"],
  errorfix: ["errorWrong", "errorFixed", "errorWhy"],
  paraphrase: ["forbidRow", "forbidWord", "forbidHit"],
  monologue: ["slideList", "monoTimer", "monoClock", "checkItem"],
};

const PLAYER_TIPO = [
  ["mc", "MC"],
  ["cloze", "Cloze"],
  ["build", "Build"],
  ["match", "Match"],
  ["type", "TypeEx"],
  ["listen", "Listen"],
  ["speak", "Speak"],
  ["order", "Order"],
  ["transform", "Transform"],
  ["bucket", "Bucket"],
  ["shadow", "Shadow"],
  ["fastmatch", "Fastmatch"],
  ["hearreal", "Hearreal"],
  ["write", "Write"],
  ["audiomc", "AudioMC"],
  ["read", "Read"],
  ["gapbank", "Gapbank"],
  ["errorfix", "Errorfix"],
  ["translate", "Translate"],
  ["paraphrase", "Paraphrase"],
  ["monologue", "Monologue"],
] as const;

describe("P30 · un tipo por fichero", () => {
  const kinds = read("components/ExerciseKinds.tsx");
  const player = read("components/ExercisePlayer.tsx");
  const compartido = read("components/ex.module.css");
  const tactil = read("lib/useTactile.ts");

  it("los 21 se reexportan y ya no están definidos en el archivo compartido", () => {
    expect(kinds).not.toMatch(/export function /);
    expect(kinds).not.toMatch(/\bfunction (MC|Cloze|Build|Match|TypeEx|Listen|Speak|Order|Transform|Bucket|Shadow|Fastmatch|Hearreal|Write|AudioMC|Read|Gapbank|Translate|Errorfix|Paraphrase|Monologue)\b/);
    for (const [name, fn] of Object.entries(LOCAL)) {
      expect(kinds).toMatch(new RegExp(`export \\{ ${name} \\} from "\\./kinds/${name}"`));
      expect(barrel[name as keyof typeof LOCAL]).toBe(fn);
      expect(typeof fn).toBe("function");
    }
    expect(Object.keys(LOCAL)).toHaveLength(21);
  });

  it("el player sigue montando cada tipo desde el barrel, con los mismos textos", () => {
    expect(player).toContain('from "./ExerciseKinds"');
    expect(player).toContain("Pista (");
    for (const [type, name] of PLAYER_TIPO) {
      expect(player).toContain(`ex.type === "${type}" && <${name} `);
    }
    for (const [name, text] of Object.entries(HUELLA)) {
      const file = name === "Order" ? "components/kinds/Order.tsx" : `components/kinds/${name}.tsx`;
      expect(read(file), name).toContain(text);
      expect(kinds, name).not.toContain(text);
    }
  });

  it("la hoja de un tipo se va con él; lo que comparten dos se queda", () => {
    for (const [file, classes] of Object.entries(CSS_PROPIO)) {
      const css = read(`components/kinds/${file}.module.css`);
      for (const c of classes) {
        expect(css, `${file}.${c}`).toMatch(new RegExp(`\\.${c}(?![\\w-])`));
        expect(compartido, c).not.toMatch(new RegExp(`\\.${c}(?![\\w-])`));
      }
    }
    // Match y Fastmatch pintan con las mismas clases: sacarlas dejaría el reloj sin estilo.
    for (const c of ["matchBtn", "matchGrid", "matchHowTo", "matchSelected", "option", "optionRight", "hearrealReveal", "hearrealRow", "transformSource", "question", "footer", "btnPrimary"]) {
      expect(compartido, c).toMatch(new RegExp(`\\.${c}(?![\\w-])`));
    }
    expect(read("components/kinds/Match.tsx")).not.toMatch(/from "\.\/.*\.module\.css"/);
    expect(read("components/kinds/Fastmatch.tsx")).not.toMatch(/from "\.\/.*\.module\.css"/);
    // useTactile mira el nombre local dentro de la clase hasheada. Si se renombra, el gesto cambia.
    for (const c of ["tokenArea", "tokenPool", "orderTray", "orderPool", "matchBtn", "option", "bucketBtn", "gapSlot", "bandBtn", "btnPrimary"]) {
      expect(tactil).toContain(`"${c}"`);
    }
  });

  it("la voz, el barajado y la entrada de texto siguen saliendo del barrel", () => {
    expect(typeof barrel.useVoiceMissing).toBe("function");
    expect(typeof barrel.VoiceMissingNotice).toBe("function");
    expect(typeof barrel.seededOrder).toBe("function");
    expect(typeof barrel.isVocabTarget).toBe("function");
    expect(barrel.AUDIO_KINDS.has("listen")).toBe(true);
    const shared = read("components/kinds/shared.tsx");
    expect(shared).toContain("Vas por buen camino");
    expect(shared).toContain("Algo no cuadra — relee lo que llevas");
    expect(shared).toMatch(/liveShown\(liveCheck\(/);
    expect(kinds).not.toContain("Vas por buen camino");
    expect(read("app/referencia/page.tsx")).toContain('from "@/components/ExerciseKinds"');
  });
});
