import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Cierre previo al B2 §6.2 / R2: las rutas canónicas existen como páginas.
// typedRoutes está apagado; este listado es la red para no vender un href muerto.

const app = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "app");

const CANON = [
  "page.tsx",
  "idioma/[lang]/page.tsx",
  "nivel/[id]/page.tsx",
  "modulo/[id]/page.tsx",
  "lesson/[id]/page.tsx",
  "examen/page.tsx",
  "examen/[id]/page.tsx",
  "entrevista/page.tsx",
  "escritura/page.tsx",
  "colocacion/page.tsx",
  "telefono/page.tsx",
  "perfil/page.tsx",
  "conversacion/page.tsx",
  "referencia/page.tsx",
  "review/page.tsx",
  "reto/[id]/page.tsx",
  "mision/[id]/page.tsx",
  "certificado/[id]/page.tsx",
  "prueba/[id]/page.tsx",
  "actualizar/page.tsx",
];

describe("R2 — rutas canónicas", () => {
  for (const rel of CANON) {
    it(`app/${rel} existe y exporta la página`, () => {
      const p = join(app, rel);
      expect(existsSync(p), rel).toBe(true);
      expect(readFileSync(p, "utf8")).toMatch(/export default /);
    });
  }
});
