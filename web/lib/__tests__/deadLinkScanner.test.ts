import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

// PLAN 1.9.9.5 BLOQUE A, FASE 0 (T5) — AUDITORIA-FUNCIONALIDADES.md §0.6/§14.1:
// "ninguna puerta de calidad detecta un enlace muerto" — ni tsc (typedRoutes
// apagado), ni el validador, ni vitest, ni el smoke. Este es exactamente el
// escáner que ese informe pide, con la misma técnica que ya usa
// `cefrLadderScanner.test.ts`: buscar POR FORMA (href literal + router.push),
// no por archivo:línea, para que un enlace muerto nuevo no se escape.
//
// Hoy no hay ningún sistema de capacidades (llega en la fase 4 del bloque A),
// así que este escáner solo puede comprobar UNA cosa hoy: que cada `href`
// estático apunta a una carpeta de ruta que existe de verdad. Es una red de
// regresión, no una detección de "huérfano por funcionalidad apagada" —eso
// necesita el registro de capacidades y llega después—, pero ya cubre lo que
// AUDITORIA-FUNCIONALIDADES.md cita como el peor punto (REMEDY/REMEDY_EN,
// §0.5) y el más disperso (AppTopBar.IMMERSIVE, §7.5#8): si mañana alguien
// borra `app/escritura/` sin tocar `REMEDY.schreiben.href`, esto lo encuentra.

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = join(here, "..", "..");
const appDir = join(webRoot, "app");
const repoRoot = join(webRoot, "..");

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

/** rutas de primer segmento que YA existen como carpeta de `app/` — más las
 *  que no son rutas de página (raíz, api, ficheros especiales de Next). */
const routeDirs = new Set(
  readdirSync(appDir).filter((n) => statSync(join(appDir, n)).isDirectory()),
);
const NOT_A_PAGE_ROUTE = new Set(["api"]); // el backend Go, no una carpeta de app/

const scanFiles = [...walk(join(webRoot, "app"), [".tsx", ".ts"]), ...walk(join(webRoot, "components"), [".tsx", ".ts"])];

/** Coincide con `href="/x"`, `href={`/x...`}` y `href: "/x"` (objetos como
 *  REMEDY) — las tres formas reales que hay en el repo hoy — y con
 *  `router.push("/x")` / `router.push(`/x...`)`. Captura el primer segmento. */
const HREF_RE = /(?:href\s*[:=]\s*\{?|router\.push\(\s*)[`"']\/([a-zA-Z0-9_-]+)/g;

interface Hit {
  file: string;
  segment: string;
}

function scan(): Hit[] {
  const hits: Hit[] = [];
  for (const file of scanFiles) {
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(HREF_RE)) {
      const segment = m[1];
      if (NOT_A_PAGE_ROUTE.has(segment)) continue;
      if (!routeDirs.has(segment)) hits.push({ file: relative(repoRoot, file), segment });
    }
  }
  return hits;
}

describe("PLAN 1.9.9.5 T5 — ningún href/router.push estático apunta a una ruta que no existe", () => {
  it("todo primer segmento de una ruta interna tiene su carpeta en web/app/", () => {
    expect(scan()).toEqual([]);
  });
});

// El segundo "saludable" de §7.5: `/referencia` llama a `speak()` 46 veces
// (MEDIDO) sin pasar NUNCA por `useVoiceMissing()` — la guarda que sí existe
// y que usa `components/ExerciseKinds.tsx` (AUDITORIA-FUNCIONALIDADES.md
// §7.5#7). No hace falta un sistema de capacidades para comprobar ESTO: es
// una ausencia estructural, verificable hoy, y es justo el patrón que
// PLAN-COMPOSICION.md §7.2 pide copiar en vez de reinventar.
describe("PLAN 1.9.9.5 T5 — /referencia no repite el patrón de guarda de voz que sí existe", () => {
  it("hoy /referencia llama a speak() sin useVoiceMissing/hasTargetVoice (hallazgo AUDITORIA §7.5#7)", () => {
    const refDir = join(webRoot, "app", "referencia");
    const src = readdirSync(refDir)
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => readFileSync(join(refDir, f), "utf8"))
      .join("\n");
    const speakCalls = (src.match(/\bspeak\(/g) ?? []).length;
    const usesGuard = /useVoiceMissing|hasTargetVoice/.test(src);
    expect(speakCalls).toBeGreaterThan(0);
    // Esto documenta el estado de HOY (rojo, a propósito): la pantalla no usa
    // la guarda. Se corrige cuando exista el registro de capacidades (fase 4
    // del bloque A) o antes, si se decide copiarla ya.
    expect(usesGuard, `${speakCalls} llamadas a speak() sin useVoiceMissing/hasTargetVoice`).toBe(true);
  });
});
