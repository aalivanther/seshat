// MIGRACIÓN DE ESQUEMA PARA LA DEMO WEB — traducción de migrateState
// (backend/main.go) y de backend/migrate_items.go.
//
// En la demo solo se llega aquí con un respaldo antiguo importado (o un perfil
// de esquema 0/1 guardado a mano en el navegador). Se migra con el mismo
// registro de alias que usa el motor, web/scripts/vocab-aliases.json, para
// que un respaldo pase por la demo y vuelva a la app de escritorio sin perder
// ni una tarjeta.

import { CURRENT_SCHEMA, type State } from "./demoState";

type AliasMap = Record<string, string>;

/** El registro se carga bajo demanda: son ~800 filas que ninguna pantalla
 *  necesita salvo al migrar, y van fuera del paquete que carga cada página. */
async function loadAliases(): Promise<AliasMap> {
  const mod = await import("@/scripts/vocab-aliases.json");
  return mod.aliases as AliasMap;
}

/** Claves en orden estable, igual que sortedAliasKeys: cuando varios ids
 *  viejos se funden en el mismo nuevo, el orden cambia el resultado. */
function sortedAliasKeys(aliases: AliasMap): string[] {
  return Object.keys(aliases).sort();
}

/** migrateItemAliases: se queda la tarjeta más madura y suma el historial. */
function migrateItemAliases(st: State, aliases: AliasMap): number {
  if (!st.items) return 0;
  let merged = 0;
  for (const old of sortedAliasKeys(aliases)) {
    const nu = aliases[old];
    const has = Object.prototype.hasOwnProperty.call(st.items, old);
    const src = st.items[old];
    if (!has || !src) {
      delete st.items[old];
      continue;
    }
    delete st.items[old];
    merged++;
    const dst = st.items[nu];
    if (!dst) {
      st.items[nu] = src;
      continue;
    }
    let mature = dst;
    let other = src;
    if (src.intervalDays > dst.intervalDays) {
      mature = src;
      other = dst;
    }
    mature.correct += other.correct;
    mature.wrong += other.wrong;
    mature.prodCorrect += other.prodCorrect;
    mature.lapses += other.lapses;
    if (other.lastSeen > mature.lastSeen) mature.lastSeen = other.lastSeen;
    // una tarjeta en reaprendizaje manda: el fallo reciente sigue pendiente
    if (other.relearn) {
      mature.relearn = true;
      if (other.nextReview < mature.nextReview) mature.nextReview = other.nextReview;
      if (other.intervalDays < mature.intervalDays) mature.intervalDays = other.intervalDays;
      if (other.streak < mature.streak) mature.streak = other.streak;
    }
    if (mature.ease === 0) mature.ease = other.ease;
    else if (other.ease !== 0) mature.ease = Math.min(mature.ease, other.ease);
    st.items[nu] = mature;
  }
  return merged;
}

/** mergeLessonKey: nunca se tira historial de una lección o fase. */
function mergeLessonKey(st: State, old: string, nu: string): boolean {
  if (!st.lessons) return false;
  const src = st.lessons[old];
  if (!Object.prototype.hasOwnProperty.call(st.lessons, old) || !src) {
    delete st.lessons[old];
    return false;
  }
  delete st.lessons[old];
  const dst = st.lessons[nu];
  if (!dst) {
    st.lessons[nu] = src;
    return true;
  }
  dst.completed = dst.completed || src.completed;
  if (src.bestScore > dst.bestScore) dst.bestScore = src.bestScore;
  if (src.lastAt > dst.lastAt) {
    dst.lastScore = src.lastScore;
    dst.lastAt = src.lastAt;
  }
  dst.attempts += src.attempts;
  return true;
}

/** migrateLessonAliases: la lección tal cual y las tres claves derivadas de
 *  una fase (prueba, reto y misión, como las arma web/lib/ids.ts). */
function migrateLessonAliases(st: State, aliases: AliasMap): number {
  if (!st.lessons) return 0;
  let merged = 0;
  for (const old of sortedAliasKeys(aliases)) {
    const nu = aliases[old];
    if (mergeLessonKey(st, old, nu)) merged++;
    for (const prefix of ["test-", "reto-", "mission-"]) {
      if (mergeLessonKey(st, prefix + old, prefix + nu)) merged++;
    }
  }
  return merged;
}

/** migrateState: v0 → v1 solo estampa; v1 → v2 funde los alias. */
export async function migrateState(st: State): Promise<void> {
  while (st.schemaVersion < CURRENT_SCHEMA) {
    switch (st.schemaVersion) {
      case 0:
        st.schemaVersion = 1;
        break;
      case 1: {
        const aliases = await loadAliases();
        migrateItemAliases(st, aliases);
        migrateLessonAliases(st, aliases);
        st.schemaVersion = 2;
        break;
      }
      default:
        st.schemaVersion = CURRENT_SCHEMA;
    }
  }
}
