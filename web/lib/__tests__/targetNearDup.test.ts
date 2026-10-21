import { describe, expect, it } from "vitest";
import { courseOf } from "@/data/course";

// Cierre 4.3: el validador solo pilla `target` idéntico. Dos tarjetas «la
// misma cosa» con ids distintos parten el SRS. Lo ya publicado se allowlistea
// (alias, no rename). Lo NUEVO falla.

function norm(t: string): string {
  return t
    .toLowerCase()
    .replace(/^(the|a|an|el|la|los|las|der|die|das)\s+/, "")
    .replace(/[.,;:!?¿¡]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** pares de ids ya publicados que el validador de igualdad estricta no ve.
 *  Si aparece un par nuevo, NO se añade aquí: se aliasa o se retargetean
 *  los itemIds al id más viejo. */
const ALLOWED_PAIRS = new Set<string>([
  "sieella||sieform",
  "ei||eiregel",
  "dermorgen||morgenadv",
  "b1m11zkdaslernen||lernen",
  "a2m6weilicharbeitenmuss||b1m6weilarbeitenmuss",
]);

function pairKey(a: string, b: string): string {
  return a < b ? `${a}||${b}` : `${b}||${a}`;
}

describe("4.3 — near-dup de target", () => {
  it("dos ids del mismo idioma no enseñan la misma cosa salvo allowlist publicada", () => {
    const nuevos: string[] = [];
    for (const lang of ["de", "en"]) {
      const byNorm = new Map<string, string[]>();
      const vocab = courseOf(lang).vocab;
      for (const [id, item] of Object.entries(vocab)) {
        const n = norm(item.target ?? "");
        if (!n) continue;
        const arr = byNorm.get(n) ?? [];
        arr.push(id);
        byNorm.set(n, arr);
      }
      for (const ids of byNorm.values()) {
        if (ids.length < 2) continue;
        const uniq = [...new Set(ids)].sort();
        for (let i = 0; i < uniq.length; i++) {
          for (let j = i + 1; j < uniq.length; j++) {
            const k = pairKey(uniq[i], uniq[j]);
            if (!ALLOWED_PAIRS.has(k)) nuevos.push(`${lang}: ${k}`);
          }
        }
      }
    }
    expect(nuevos, `near-dups nuevos (alias o retarget; no ampliar la allowlist a ciegas):\n${nuevos.join("\n")}`).toEqual([]);
  });
});
