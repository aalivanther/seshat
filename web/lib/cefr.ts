// PLAN 1.9.9 FASE 1 — la escala CEFR, UNA SOLA VEZ.
//
// Antes de esto, la escalera vivía copiada en ~15 sitios (censo completo en
// PLAN-ARQUITECTURA-MODULAR.md §5.1), en 5 formas distintas, y ninguna copia
// coincidía con las demás en sus miembros. La más corta ("a1","a2","b1") no
// sabía qué hacer con un nivel fuera de ella: `indexOf` devolvía -1, y un -1
// usado como "el más bajo posible" en una comparación `<=` se comporta como
// "por debajo de cualquier cosa" — así fue como una fase de B2 se leía como
// "al nivel de A1 o por debajo" y se desbloqueaba para cualquiera.
//
// Aquí se separan las dos cosas que esas copias mezclaban sin querer:
// (A) la escala CEFR en sí (esto) — realidad lingüística, fija, no depende
//     de qué contenido tenga Seshat; y
// (B) los niveles que ESTE build enseña — que siguen saliendo de
//     `lib/levels.ts` filtrado por `available`, y eso está bien como está.

/** La escala CEFR. No es del producto: es del Marco Común Europeo. Seis
 *  peldaños y este orden, tenga Seshat contenido para ellos o no. Que aquí
 *  esté el c2 no promete un curso de c2 — promete saber compararlo. */
export const CEFR_SCALE = ["a1", "a2", "b1", "b2", "c1", "c2"] as const;
export type Cefr = (typeof CEFR_SCALE)[number];

/** Posición en la escala. Nunca devuelve -1 para un Cefr válido: ese -1 es el
 *  que desbloqueaba el curso entero (ver la cabecera de este archivo). */
export function cefrRank(c: Cefr): number {
  return CEFR_SCALE.indexOf(c);
}

/** ¿`a` está al mismo nivel o por debajo de `b`? La operación que los ~15
 *  sitios necesitaban y que el registro no ofrecía. */
export function cefrAtOrBelow(a: Cefr, b: Cefr): boolean {
  return cefrRank(a) <= cefrRank(b);
}

export function isCefr(v: string): v is Cefr {
  return (CEFR_SCALE as readonly string[]).includes(v);
}

/** Nivel del cuaderno. Lo que no es CEFR cae a a1. c1 y c2 no se enseñan
 *  aquí, así que se quedan en b2, el último peldaño del curso. `lang` se
 *  acepta para no romper llamadas que ya pasaban el idioma. */
export function asCefr(cefr: string, _lang?: string): Cefr {
  if (!isCefr(cefr)) return "a1";
  if (cefr === "c1" || cefr === "c2") return "b2";
  return cefr;
}
