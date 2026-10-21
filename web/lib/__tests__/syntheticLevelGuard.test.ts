import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { courses } from "@/data/course";
import { levels, highestAvailableUpTo } from "@/lib/levels";
import type { Level } from "@/lib/levels";
import { cefrRank } from "@/lib/cefr";
import { phaseUnlocked } from "@/lib/unlock";
import type { Phase, ServerState } from "@/lib/types";
import { LEVEL_MIN_DROP } from "@/lib/drop";
import { holdMutateCatalogLock, releaseMutateCatalogLock } from "./mutateCatalogLock";

// PLAN 1.9.9 F0.2 y F0.4 — el agujero que el B2 abrirá (§1.1 del plan),
// reproducido HOY sin escribir contenido nuevo.
//
// El bug (comparar contra un array propio de tres peldaños con `indexOf`, que
// da -1 para cualquier nivel fuera de ahí, y -1 <= CUALQUIER techo) no se
// puede ejercitar con un
// `Phase` de mentira desconectado del curso real: `prevPhaseOf`/`levelOfPhase`
// necesitan encontrar la fase en `courseOf(lang).phases` de verdad, o
// devuelven "fase ajena → siempre desbloqueada" (otro camino, no el que
// estamos probando). Así que este test AÑADE un nivel y una fase sintéticos
// a los registros reales EN MEMORIA (levels.push / courses[lang].phases.push)
// solo mientras corre, y los retira al terminar — cero contenido nuevo en
// disco, cero cambio de producción, misma mecánica que usa cualquier función
// del motor. cefr "c1" a propósito: sigue siendo "por encima del máximo real"
// incluso el día que el B2 exista de verdad (PLAN 1.9.9 §F0.2).

const SYN_LEVEL_ID = "de-zzsynthetic";
const SYN_PHASE_ID = "zzsyntheticphase1";

function installSynthetic(): { level: Level; phase: Phase } {
  const level: Level = {
    id: SYN_LEVEL_ID,
    lang: "de",
    cefr: "c1",
    rank: cefrRank("c1"),
    name: "ZZ (sintético)",
    title: "Nivel sintético de prueba",
    desc: "No es contenido real: existe solo mientras corre este test (F0.2/F0.4).",
    goal: "",
    available: true,
  };
  const phase: Phase = {
    id: SYN_PHASE_ID,
    level: "c1",
    n: 999,
    title: "Fase sintética",
    goal: "",
    color: "#000000",
    lessons: [],
  };
  levels.push(level);
  courses["de"].phases.push(phase);
  return { level, phase };
}

function removeSynthetic(): void {
  const li = levels.findIndex((l) => l.id === SYN_LEVEL_ID);
  if (li !== -1) levels.splice(li, 1);
  const pi = courses["de"].phases.findIndex((p) => p.id === SYN_PHASE_ID);
  if (pi !== -1) courses["de"].phases.splice(pi, 1);
}

function stPlacedA1(): ServerState {
  return {
    lessons: {},
    items: {},
    xp: 0,
    streakDays: 0,
    lastActive: "",
    placement: { de: { placed: "a1", pct: 10, at: new Date().toISOString() } },
  } as ServerState;
}

// mismo stub de navegador que unlock.test.ts: sin dev-flag, sin colocación en
// localStorage — el placement solo viaja por ServerState.placement.
function browser() {
  vi.stubGlobal("window", { localStorage: { getItem: () => null } });
}

describe("T4 — placement A1 no abre un B2 registered available", () => {
  const B2_ID = "de-b2";
  const B2_PHASE = "b2m1";
  beforeEach(() => {
    holdMutateCatalogLock();
    browser();
    levels.push({
      id: B2_ID, lang: "de", cefr: "b2", rank: cefrRank("b2"),
      name: "B2", title: "B2 sintético", desc: "", goal: "", available: true,
    });
    LEVEL_MIN_DROP[B2_ID] = 7;
    courses["de"].phases.push({
      id: B2_PHASE, level: "b2", n: 1, title: "B2m1", goal: "", color: "#000", lessons: [
        { id: "b2m1l1", phaseId: B2_PHASE, title: "x", subtitle: "", minutes: 1, sections: [] },
      ],
    });
  });
  afterEach(() => {
    delete LEVEL_MIN_DROP[B2_ID];
    const li = levels.findIndex((l) => l.id === B2_ID);
    if (li !== -1) levels.splice(li, 1);
    const pi = courses["de"].phases.findIndex((p) => p.id === B2_PHASE);
    if (pi !== -1) courses["de"].phases.splice(pi, 1);
    vi.unstubAllGlobals();
    releaseMutateCatalogLock();
  });

  it("placement A1 + B2 available → b2m1 locked", () => {
    const phase = courses["de"].phases.find((p) => p.id === B2_PHASE)!;
    expect(phaseUnlocked(phase, stPlacedA1())).toBe(false);
  });

  it("placement B2 + B2 available → b2m1 open", () => {
    const phase = courses["de"].phases.find((p) => p.id === B2_PHASE)!;
    const st = {
      lessons: {}, items: {}, xp: 0, streakDays: 0, lastActive: "",
      placement: { de: { placed: "b2", pct: 80, at: new Date().toISOString() } },
    } as ServerState;
    expect(phaseUnlocked(phase, st)).toBe(true);
  });

  it("placement C1 + techo B1 (sin B2 en el drop) no 404: highestAvailableUpTo cae al B1 real", () => {
    delete LEVEL_MIN_DROP[B2_ID];
    const dest = highestAvailableUpTo("de", "c1");
    expect(dest?.cefr).toBe("b1");
    expect(dest?.id).not.toBe(B2_ID);
  });
});

describe("PLAN 1.9.9 F0.2/F0.4 — un nivel por encima del máximo real", () => {
  let synthetic: { level: Level; phase: Phase };

  beforeEach(() => {
    holdMutateCatalogLock();
    browser();
    synthetic = installSynthetic();
  });
  afterEach(() => {
    removeSynthetic();
    vi.unstubAllGlobals();
    releaseMutateCatalogLock();
  });

  it("F0.2 — colocado en A1, cero lecciones: la fase del nivel sintético NO se desbloquea", () => {
    expect(phaseUnlocked(synthetic.phase, stPlacedA1())).toBe(false);
  });

  it("F0.4 (núcleo) — highestAvailableUpTo(\"de\",\"a1\") no puede devolver un nivel por encima de a1", () => {
    // Este es el hallazgo central de AUDITORIA-ACOPLAMIENTO.md §1.3:
    // `highestAvailableUpTo` devuelve el nivel sintético para CUALQUIER
    // argumento, incluido el más bajo posible, en cuanto existe y está
    // `available`. Repetir el alta de un nivel (registro + drop + contenido)
    // no debería tener que tocar `unlock.ts` ni `levels.ts` para que esto siga
    // siendo cierto — que es justo el criterio de aceptación del plan (§0).
    const destino = highestAvailableUpTo("de", "a1");
    expect(destino?.id).not.toBe(SYN_LEVEL_ID);
  });
});
