import { afterEach, describe, expect, it, vi } from "vitest";
import { course, courseOf } from "@/data/course";
import { isSandboxProfile, phaseCompleted, phaseSkippedByPlacement, phaseUnlocked, prevPhaseOf } from "@/lib/unlock";
import type { LessonStat, Phase, ServerState } from "@/lib/types";

// Contrato actual de isSandboxProfile:
// - sin window (node/SSR) → NO es sandbox. El export estático prerenderiza el
//   HTML: si ahí todo salía abierto, el usuario veía un fogonazo con los
//   módulos que aún no le tocan antes de que la hidratación los cerrase.
//   Ante la duda, cerrado;
// - con window → sandbox solo si localStorage["seshat-dev"] === "1".

const doneStat = (): LessonStat => ({
  completed: true, bestScore: 1, lastScore: 1, attempts: 1, lastAt: new Date().toISOString(),
});

function stWith(lessons: Record<string, LessonStat>): ServerState {
  return { lessons, items: {}, xp: 0, streakDays: 0, lastActive: "" };
}

const allDone = (phase: Phase) =>
  Object.fromEntries(phase.lessons.map((l) => [l.id, doneStat()]));

const [first, second, third] = course.phases;

// PLAN 1.9.8 §5.3/§5.4 — la prueba de nivel tiene que abrir la puerta desde
// ServerState (el dato que viaja con el perfil), no solo desde localStorage
// (el dato que se queda en el dispositivo donde se hizo la prueba).
const enB1Phase = courseOf("en").phases.find((p) => p.level === "b1")!;

/** ServerState con colocación — cast porque `placement` aún no existe en el
    tipo (llega en el paso 3 del plan): el test debe poder escribirse antes. */
function stWithPlacement(
  lessons: Record<string, LessonStat>,
  placement?: Record<string, { placed: string; pct: number; at: string }>,
): ServerState {
  return { lessons, items: {}, xp: 0, streakDays: 0, lastActive: "", placement } as ServerState;
}

/** simula navegador; devFlag=true activa el taller (seshat-dev=1) */
function browser(devFlag = false) {
  vi.stubGlobal("window", {
    localStorage: { getItem: (k: string) => (devFlag && k === "seshat-dev" ? "1" : null) },
  });
}

afterEach(() => vi.unstubAllGlobals());

describe("isSandboxProfile", () => {
  it("en node (sin window) NO es sandbox: el HTML prerenderizado no enseña de más", () => {
    expect(typeof window).toBe("undefined");
    expect(isSandboxProfile()).toBe(false);
  });

  it("navegador normal (sin flag): NO es sandbox", () => {
    browser();
    expect(isSandboxProfile()).toBe(false);
  });

  it("navegador con seshat-dev=1: sandbox (taller de dev)", () => {
    browser(true);
    expect(isSandboxProfile()).toBe(true);
  });
});

describe("phaseUnlocked", () => {
  it("sin window (SSR) la fase que exige progreso sigue cerrada", () => {
    expect(phaseUnlocked(second, stWith({}))).toBe(false);
  });

  it("la primera fase está siempre abierta", () => {
    browser();
    expect(phaseUnlocked(first, stWith({}))).toBe(true);
  });

  it("la siguiente fase queda bloqueada hasta completar la anterior", () => {
    browser();
    expect(phaseUnlocked(second, stWith({}))).toBe(false);
  });

  it("completar TODAS las lecciones de la anterior la desbloquea", () => {
    browser();
    expect(phaseUnlocked(second, stWith(allDone(first)))).toBe(true);
  });

  it("completar solo una parte NO desbloquea", () => {
    browser();
    const partial = allDone(first);
    delete partial[first.lessons[0].id];
    expect(phaseUnlocked(second, stWith(partial))).toBe(false);
  });

  it("st null (backend caído) es permisivo", () => {
    browser();
    expect(phaseUnlocked(third, null)).toBe(true);
  });

  it("con el flag de dev todo queda abierto sin progreso", () => {
    browser(true);
    expect(phaseUnlocked(third, stWith({}))).toBe(true);
  });

  it("PLAN 1.9.8 §5.3 — placement B1 en ServerState, cero lecciones, SIN localStorage: abre el B1", () => {
    browser(); // sin seshat-dev, y el stub de localStorage no tiene ninguna colocación guardada
    const st = stWithPlacement({}, { en: { placed: "b1", pct: 80, at: new Date().toISOString() } });
    expect(phaseUnlocked(enB1Phase, st)).toBe(true);
  });

  it("PLAN 1.9.8 §5.4 — sin placement y sin lecciones, el B1 sigue cerrado (no se abre de más)", () => {
    browser();
    const st = stWithPlacement({});
    expect(phaseUnlocked(enB1Phase, st)).toBe(false);
  });

  it("colocarse en B2 abre el primer módulo B2 de ambos idiomas, sin lecciones previas", () => {
    browser();
    const deB2 = courseOf("de").phases.find((p) => p.level === "b2")!;
    const enB2 = courseOf("en").phases.find((p) => p.level === "b2")!;
    const stDe = stWithPlacement({}, { de: { placed: "b2", pct: 80, at: new Date().toISOString() } });
    const stEn = stWithPlacement({}, { en: { placed: "b2", pct: 80, at: new Date().toISOString() } });
    expect(phaseUnlocked(deB2, stDe)).toBe(true);
    expect(phaseUnlocked(enB2, stEn)).toBe(true);
    // la colocación abre el NIVEL entero (todos los módulos de ese CEFR y los
    // de debajo), no solo el primero: el alumno ya demostró el listón.
    const deB2m2 = courseOf("de").phases.filter((p) => p.level === "b2")[1];
    expect(phaseUnlocked(deB2m2, stDe)).toBe(true);
  });

  it("lecciones hechas en B1 sin placement en el servidor: el módulo B1 se ve", () => {
    browser();
    const b1 = courseOf("de").phases.find((p) => p.level === "b1")!;
    const st = stWith({ [b1.lessons[0].id]: doneStat() });
    expect(phaseUnlocked(b1, st)).toBe(true);
  });

  it("progreso en B1 sin placement también abre A2 (el nivel de debajo)", () => {
    browser();
    const b1 = courseOf("de").phases.find((p) => p.level === "b1")!;
    const a2 = courseOf("de").phases.find((p) => p.level === "a2")!;
    const st = stWith({ [b1.lessons[0].id]: doneStat() });
    expect(phaseUnlocked(a2, st)).toBe(true);
  });

  it("colocarse en A2 no abre el B2", () => {
    browser();
    const deB2 = courseOf("de").phases.find((p) => p.level === "b2")!;
    const st = stWithPlacement({}, { de: { placed: "a2", pct: 70, at: new Date().toISOString() } });
    expect(phaseUnlocked(deB2, st)).toBe(false);
  });
});

describe("phaseCompleted", () => {
  it("true solo con todas las lecciones completadas", () => {
    expect(phaseCompleted(first, stWith(allDone(first)))).toBe(true);
  });

  it("false si falta una lección", () => {
    const partial = allDone(first);
    delete partial[first.lessons[first.lessons.length - 1].id];
    expect(phaseCompleted(first, stWith(partial))).toBe(false);
  });

  it("false con estado null o vacío", () => {
    expect(phaseCompleted(first, null)).toBe(false);
    expect(phaseCompleted(first, stWith({}))).toBe(false);
  });

  it("colocarse en B1 deja A1 y A2 saltados (completos) y el B1 por hacer", () => {
    browser();
    const a1 = courseOf("en").phases.find((p) => p.level === "a1")!;
    const a2 = courseOf("en").phases.find((p) => p.level === "a2")!;
    const b1 = courseOf("en").phases.find((p) => p.level === "b1")!;
    const st = stWithPlacement({}, { en: { placed: "b1", pct: 66, at: new Date().toISOString() } });
    expect(phaseSkippedByPlacement(a1, st)).toBe(true);
    expect(phaseSkippedByPlacement(a2, st)).toBe(true);
    expect(phaseSkippedByPlacement(b1, st)).toBe(false);
    expect(phaseCompleted(a1, st)).toBe(true);
    expect(phaseCompleted(a2, st)).toBe(true);
    expect(phaseCompleted(b1, st)).toBe(false);
  });
});

describe("prevPhaseOf", () => {
  it("la primera fase no tiene anterior", () => {
    expect(prevPhaseOf(first)).toBeNull();
  });

  it("la segunda apunta a la primera", () => {
    // devuelve la entrada del índice ligero (lo que lee el cliente), no el
    // objeto del curso completo: se compara por id
    expect(prevPhaseOf(second)?.id).toBe(first.id);
  });

  it("una fase ajena al curso devuelve null (y por tanto quedaría desbloqueada)", () => {
    const foreign: Phase = { id: "x-ajena", n: 99, title: "?", goal: "", color: "#000", lessons: [] };
    expect(prevPhaseOf(foreign)).toBeNull();
    browser();
    expect(phaseUnlocked(foreign, stWith({}))).toBe(true);
  });
});
