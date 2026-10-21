import { describe, expect, it, vi, afterEach } from "vitest";

// pickSecondVoice vive detrás de Web Speech. Se prueba contra el módulo
// re-importado con voces mock: localService:false nunca gana (F5 / T7).

afterEach(() => {
  vi.resetModules();
  vi.unstubAllGlobals();
});

function voice(name: string, lang: string, localService: boolean): SpeechSynthesisVoice {
  return { name, lang, localService, default: false, voiceURI: name } as SpeechSynthesisVoice;
}

describe("pickSecondVoice — nunca elige una voz online", () => {
  it("si hay dos locales, las dos son localService", async () => {
    const voices = [
      voice("Katja", "de-DE", true),
      voice("Conrad", "de-DE", true),
      voice("Google Deutsch", "de-DE", false),
    ];
    vi.stubGlobal("window", {
      speechSynthesis: {
        getVoices: () => voices,
        speak: () => {},
        cancel: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      },
    });
    const { __ttsTest } = await import("@/lib/tts");
    const second = __ttsTest.pickSecondVoice();
    expect(second?.localService).toBe(true);
    expect(second?.name).not.toBe("Google Deutsch");
  });

  it("si no hay ninguna voz local, pickVoice no elige Google", async () => {
    const voices = [voice("Google Deutsch", "de-DE", false)];
    vi.stubGlobal("window", {
      speechSynthesis: {
        getVoices: () => voices,
        speak: () => {},
        cancel: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      },
    });
    const { __ttsTest } = await import("@/lib/tts");
    expect(__ttsTest.pickVoice()).toBeNull();
    expect(__ttsTest.pickSecondVoice()).toBeNull();
  });

  it("si solo hay una local, reutiliza esa y no cae a Google", async () => {
    const voices = [
      voice("Katja", "de-DE", true),
      voice("Google Deutsch", "de-DE", false),
    ];
    vi.stubGlobal("window", {
      speechSynthesis: {
        getVoices: () => voices,
        speak: () => {},
        cancel: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
      },
    });
    const { __ttsTest } = await import("@/lib/tts");
    const first = __ttsTest.pickVoice();
    const second = __ttsTest.pickSecondVoice();
    expect(first?.name).toBe("Katja");
    expect(second).toBe(first);
    expect(second?.localService).toBe(true);
  });
});
