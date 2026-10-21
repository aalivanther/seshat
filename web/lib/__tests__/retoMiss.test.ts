import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { recordRetoMisses, retoMissSet, consumeRetoMisses } from "@/lib/retoMiss";

// Ledger de fallos de reto: la asimetría SRS. Fallar en el reto no toca el
// intervalo; deja prioridad ×3 para el PRÓXIMO repaso, que se consume al
// servirse (señal de una sola vez) y caduca a la semana.

function fakeBrowser() {
  const store = new Map<string, string>();
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    },
  });
  return store;
}

beforeEach(() => fakeBrowser());
afterEach(() => vi.unstubAllGlobals());

describe("retoMiss", () => {
  it("registra fallos y los expone como prioridad", () => {
    recordRetoMisses(["a", "b"]);
    const set = retoMissSet();
    expect(set.has("a")).toBe(true);
    expect(set.has("b")).toBe(true);
    expect(set.has("c")).toBe(false);
  });

  it("consumir borra SOLO los ids servidos", () => {
    recordRetoMisses(["a", "b", "c"]);
    consumeRetoMisses(["a", "c"]);
    const set = retoMissSet();
    expect(set.has("a")).toBe(false);
    expect(set.has("b")).toBe(true);
    expect(set.has("c")).toBe(false);
  });

  it("la señal caduca a los 7 días", () => {
    vi.useFakeTimers();
    recordRetoMisses(["viejo"]);
    vi.advanceTimersByTime(8 * 24 * 60 * 60 * 1000);
    expect(retoMissSet().has("viejo")).toBe(false);
    vi.useRealTimers();
  });

  it("sin window (SSR) no explota", () => {
    vi.unstubAllGlobals();
    expect(() => recordRetoMisses(["x"])).not.toThrow();
    expect(retoMissSet().size).toBe(0);
    expect(() => consumeRetoMisses(["x"])).not.toThrow();
  });
});
