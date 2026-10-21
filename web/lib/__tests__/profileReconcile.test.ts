import { afterEach, describe, expect, it, vi } from "vitest";
import { pendingPlacementRecoveries, readLocalPlacement } from "@/lib/profileReconcile";
import { placementKey } from "@/lib/placement";
import type { ServerState } from "@/lib/types";
import { courseOf } from "@/data/course";

const doneStat = () => ({
  completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: new Date().toISOString(),
});

function st(partial: Partial<ServerState> = {}): ServerState {
  return { lessons: {}, items: {}, xp: 0, streakDays: 0, lastActive: "", ...partial };
}

describe("pendingPlacementRecoveries", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("si el perfil ya tiene colocación, no hay nada que recuperar", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => JSON.stringify({ placed: "b2", pct: 90 }) } });
    const got = pendingPlacementRecoveries(st({
      placement: { de: { placed: "b1", pct: 70, at: "2026-01-01T00:00:00Z" }, en: { placed: "a2", pct: 60, at: "2026-01-01T00:00:00Z" } },
    }));
    expect(got).toEqual([]);
  });

  it("informe en localStorage y perfil sin placement → se recupera", () => {
    const key = placementKey("de", "default");
    vi.stubGlobal("window", {
      localStorage: { getItem: (k: string) => (k === key ? JSON.stringify({ placed: "b1", pct: 74, veredicto: "ok" }) : null) },
    });
    const got = pendingPlacementRecoveries(st());
    expect(got.some((r) => r.lang === "de" && r.placed === "b1" && r.source === "local")).toBe(true);
  });

  it("sin informe local, lecciones de B2 → se infiere B2", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => null } });
    const b2 = courseOf("de").phases.find((p) => p.level === "b2")!;
    const got = pendingPlacementRecoveries(st({ lessons: { [b2.lessons[0].id]: doneStat() } }));
    expect(got.some((r) => r.lang === "de" && r.placed === "b2" && r.source === "progress")).toBe(true);
  });

  it("lección colocacion-en al 66% sin informe → B1 (perfiles de antes de la feat)", () => {
    vi.stubGlobal("window", { localStorage: { getItem: () => null } });
    const got = pendingPlacementRecoveries(st({
      lessons: {
        "colocacion-en": {
          completed: false, bestScore: 0.66, lastScore: 0.66, attempts: 1, lastAt: "2026-08-19T08:43:21Z",
        },
      },
    }));
    expect(got.some((r) => r.lang === "en" && r.placed === "b1" && r.source === "lesson")).toBe(true);
    expect(got.some((r) => r.lang === "de")).toBe(false);
  });
});

describe("readLocalPlacement", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("acepta la clave legado sin perfil", () => {
    vi.stubGlobal("window", {
      localStorage: { getItem: (k: string) => (k === "seshat-colocacion-en" ? JSON.stringify({ placed: "a2", pct: 55, veredicto: "ok" }) : null) },
    });
    expect(readLocalPlacement("en")).toEqual({ placed: "a2", pct: 55 });
  });
});
