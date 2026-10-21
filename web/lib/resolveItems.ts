// Defensa en profundidad: si un itemId de lección no resuelve, no se traga
// en silencio (array más corto). El build ya debió parar; esto es por si se
// cuela un pack a medias.

const MAX_IDS = 500;

export function resolveItems<T>(
  ids: string[] | null | undefined,
  vocab: Record<string, T | undefined> | null | undefined,
): { items: T[]; missing: string[] } {
  const items: T[] = [];
  const missing: string[] = [];
  if (!Array.isArray(ids)) return { items, missing };
  const bank = vocab ?? {};
  const limit = Math.min(ids.length, MAX_IDS);
  for (let i = 0; i < limit; i++) {
    const raw = ids[i];
    const id = typeof raw === "string" ? raw.trim() : "";
    if (!id) {
      missing.push("(vacío)");
      continue;
    }
    const v = bank[id];
    if (v === undefined) missing.push(id);
    else items.push(v);
  }
  return { items, missing };
}
