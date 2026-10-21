import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it, vi } from "vitest";

// P18: «libro o calle» lee dos grafías con la voz del sistema. No es HVPT
// (eso pediría muchas voces) y la pantalla no puede prometerlo.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (rel: string) => readFileSync(join(web, rel), "utf8");

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

describe("P18 — libro o calle no es oído fonético", () => {
  it("el comentario del tipo dice la verdad: misma voz, registro escrito", () => {
    const types = read("lib/types.ts");
    const line = types.split("\n").find((l) => l.includes('"hearreal"'));
    expect(line).toBeTruthy();
    expect(line).not.toMatch(/HVPT/);
    expect(line).toMatch(/Misma voz y misma velocidad/);
    expect(line).toMatch(/registro escrito/);
    expect(line).toMatch(/no un contraste fonético/);
    expect(types).not.toMatch(/TTS la pronuncia bien/);
    expect(types).toMatch(/La misma voz que book la lee/);
    expect(types).toMatch(/no una segunda voz/);
  });

  it("la pantalla de hearreal no promete oído de calle ni otra voz", () => {
    const ui = read("components/kinds/Hearreal.tsx");
    const player = read("components/ExercisePlayer.tsx");
    expect(ui).not.toMatch(/HVPT/);
    expect(ui).not.toMatch(/\bspeakLong\b|\bpickSecondVoice\b|<speak[\s>]|\bssml\b/i);
    expect(ui).toMatch(/import \{ speak \} from "@\/lib\/tts"/);
    // Las dos lecturas van por speak() sin velocidad propia: es la de siempre.
    expect(ui).not.toMatch(/speak\([^)]*,/);
    expect(ui).toMatch(/Como el libro/);
    expect(ui).toMatch(/Como se dice en la calle/);
    const how = player.split("\n").find((l) => l.includes("hearreal:"));
    expect(how).toBeTruthy();
    expect(how).not.toMatch(/HVPT|fonétic|oído de calle|muchas voces/i);
    expect(how).toMatch(/Suena una de las dos versiones/);
  });

  it("speak usa una sola voz, la misma velocidad y el texto tal cual", async () => {
    const uttered: { text: string; rate: number; voice: { name: string } | null }[] = [];
    class FakeUtterance {
      text: string;
      lang = "";
      rate = 1;
      voice: { name: string } | null = null;
      onerror: ((e: unknown) => void) | null = null;
      constructor(text: string) {
        this.text = text;
      }
    }
    const katja = { name: "Katja", lang: "de-DE", localService: true, default: false, voiceURI: "Katja" };
    const conrad = { name: "Conrad", lang: "de-DE", localService: true, default: false, voiceURI: "Conrad" };
    const google = { name: "Google Deutsch", lang: "de-DE", localService: false, default: false, voiceURI: "Google Deutsch" };
    vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
    vi.stubGlobal("window", {
      speechSynthesis: {
        getVoices: () => [google, conrad, katja],
        speak: (u: FakeUtterance) => {
          uttered.push({ text: u.text, rate: u.rate, voice: u.voice });
        },
        cancel: () => {},
        speaking: false,
        pending: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      },
    });
    const { speak } = await import("@/lib/tts");
    speak("Hast du Zeit?");
    speak("Haste Zeit?");
    expect(uttered).toHaveLength(2);
    // La primera local preferida, no la de Google: las dos frases comparten esa voz.
    expect(uttered[0].voice?.name).toBe("Conrad");
    expect(uttered[0].voice).not.toMatchObject({ localService: false });
    expect(uttered[1].voice).toBe(uttered[0].voice);
    expect(uttered[0].rate).toBe(0.9);
    expect(uttered[1].rate).toBe(uttered[0].rate);
    expect(uttered[0].text).toBe("Hast du Zeit?");
    expect(uttered[1].text).toBe("Haste Zeit?");
    expect(uttered[0].text).not.toMatch(/[<>]/);
    expect(uttered[1].text).not.toMatch(/[<>]/);
  });
});
