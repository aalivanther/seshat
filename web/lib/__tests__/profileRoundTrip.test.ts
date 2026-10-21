import { describe, expect, it } from "vitest";
import ts from "typescript";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Un JSON.parse conserva cualquier clave. Lo que pierde datos es el import
// que reconstruye el perfil solo con las propiedades escritas en el tipo:
// si ItemStat no nombra prodCorrect, o ServerState no nombra xpToday, aquí
// no vuelven. Las claves salen del propio interface, no de una lista paralela.

const typesPath = join(dirname(fileURLToPath(import.meta.url)), "..", "types.ts");

function propsOf(name: string): string[] {
  const sf = ts.createSourceFile(
    typesPath,
    readFileSync(typesPath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  const found: string[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === name) {
      for (const m of node.members) {
        if (!ts.isPropertySignature(m) || !m.name || !ts.isIdentifier(m.name)) continue;
        found.push(m.name.text);
      }
      return;
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (found.length === 0) throw new Error(`no está la interfaz ${name}`);
  return found;
}

function asObj(v: unknown): Record<string, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) throw new Error("no es un objeto");
  return v as Record<string, unknown>;
}

function copiar(src: Record<string, unknown>, keys: readonly string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(src, k)) out[k] = src[k];
  }
  return out;
}

function mapa(raw: unknown, keys: readonly string[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return out;
  const rec = raw as Record<string, unknown>;
  for (const id of Object.keys(rec)) {
    const v = rec[id];
    if (!v || typeof v !== "object" || Array.isArray(v)) continue;
    out[id] = copiar(v as Record<string, unknown>, keys);
  }
  return out;
}

function perfilCampoACampo(
  raw: unknown,
  stateKeys: readonly string[],
  itemKeys: readonly string[],
  lessonKeys: readonly string[],
): Record<string, unknown> {
  const src = asObj(raw);
  const st = copiar(src, stateKeys);
  st.lessons = mapa(src.lessons, lessonKeys);
  st.items = mapa(src.items, itemKeys);
  const back: unknown = JSON.parse(JSON.stringify(st));
  return asObj(back);
}

const WIRE = `{
  "schemaVersion": 2,
  "lessons": {
    "f0l1": {
      "completed": true,
      "bestScore": 1,
      "lastScore": 0.8,
      "attempts": 2,
      "lastAt": "2026-09-28T09:00:00Z",
      "notaAjena": "no es del tipo"
    }
  },
  "items": {
    "b1m1karte": {
      "correct": 6,
      "wrong": 2,
      "streak": 1,
      "intervalDays": 16,
      "nextReview": "2026-10-14T09:00:00Z",
      "lastSeen": "2026-09-28T09:00:00Z",
      "lapses": 3,
      "prodCorrect": 5,
      "ease": 1.5,
      "relearn": true,
      "notaAjena": "no es del tipo"
    },
    "cero": {
      "correct": 1,
      "wrong": 0,
      "streak": 0,
      "intervalDays": 0,
      "nextReview": "2026-09-28T09:00:00Z",
      "lastSeen": "2026-09-28T09:00:00Z",
      "lapses": 0,
      "prodCorrect": 0,
      "ease": 0,
      "relearn": false
    },
    "vieja": {
      "correct": 1,
      "wrong": 0,
      "streak": 1,
      "intervalDays": 1,
      "nextReview": "2026-09-29T09:00:00Z",
      "lastSeen": "2026-09-28T09:00:00Z"
    }
  },
  "xp": 80,
  "streakDays": 4,
  "lastActive": "2026-09-28",
  "xpToday": 0,
  "xpDay": "",
  "seenRequests": [{ "id": "req-1", "at": "2026-09-28T09:00:00Z" }],
  "futureFlag": true
}`;

describe("P03 — el tipo nombra lo que el JSON del perfil guarda", () => {
  it("un import campo a campo devuelve la memoria y no se inventa la que no venía", () => {
    const parsed: unknown = JSON.parse(WIRE);
    const back = perfilCampoACampo(
      parsed,
      propsOf("ServerState"),
      propsOf("ItemStat"),
      propsOf("LessonStat"),
    );

    expect(back.schemaVersion).toBe(2);
    expect(back.xpToday).toBe(0);
    expect(back.xpDay).toBe("");
    expect(back.seenRequests).toEqual([{ id: "req-1", at: "2026-09-28T09:00:00Z" }]);
    expect(back.futureFlag).toBeUndefined();

    const lessons = asObj(back.lessons);
    const leccion = asObj(lessons.f0l1);
    expect(leccion.bestScore).toBe(1);
    expect(leccion.notaAjena).toBeUndefined();

    const items = asObj(back.items);
    const karte = asObj(items.b1m1karte);
    expect(karte.intervalDays).toBe(16);
    expect(karte.lapses).toBe(3);
    expect(karte.prodCorrect).toBe(5);
    expect(karte.ease).toBe(1.5);
    expect(karte.relearn).toBe(true);
    expect(karte.notaAjena).toBeUndefined();

    const cero = asObj(items.cero);
    expect(cero.lapses).toBe(0);
    expect(cero.prodCorrect).toBe(0);
    expect(cero.ease).toBe(0);
    expect(cero.relearn).toBe(false);

    const vieja = asObj(items.vieja);
    expect(vieja).not.toHaveProperty("lapses");
    expect(vieja).not.toHaveProperty("prodCorrect");
    expect(vieja).not.toHaveProperty("ease");
    expect(vieja).not.toHaveProperty("relearn");
  });
});
