// EL CATÁLOGO — PLAN-COMPOSICION.md §4.1. Todo lo que existe, con sus
// propiedades declaradas: una fila por pieza. Sustituye a las cuatro tablas
// que vivían en `scripts/gen-course.mjs` (`DROPS`, `MISSION_FILES`,
// `EXAM_FILES`, `REF_FILES`), que agrupaban por DROP — hoy el eje es la
// PIEZA, y el drop es solo el campo `since`.
//
// Generado una vez, reindexando esas cuatro tablas + el `.level` real de
// cada fase (que solo vivía en su propio fichero de datos, nunca en la
// tabla de empaquetado) — no escrito a mano fila por fila. Añadir contenido
// nuevo SÍ es tocar esto a mano: una fila más, con su `since` explícito.
//
// Campos:
//   kind    "module" | "exam" | "mission" | "reference"
//   id      el id real de la pieza — para módulos y libretas es el mismo
//           que ya usan `Phase.id`/la clave de `refModules`; para exámenes,
//           `ExamSet.id`; para misiones, el nombre de export (no hay un id
//           propio hoy, y no hace falta inventar uno).
//   lang    idioma dueño
//   level   CEFR real. Añadido a "mission"/"reference" en FASE 2 (antes solo
//           vivía en el nombre del export): sin él, un manifiesto de drop no
//           puede seleccionar «las misiones/libretas nuevas de ESTE drop» con
//           un selector `{lang, level}` como hace con módulos y exámenes —
//           tendría que enumerar ids sueltos, la minisintaxis que §4.3
//           prohíbe. Verificado contra el contenido real de cada fichero
//           antes de asignarlo (p.ej. `missionsDeA1` son misiones A1, no una
//           mezcla de niveles).
//   file    ruta del fichero de datos, relativa a web/data/ y sin extensión
//   exports nombres de export que trae ese fichero (fase/vocab, set, o
//           misiones), tal como los necesita gen-course.mjs para escribir
//           los `import` de course.gen.ts
//   key     (solo "reference") la clave de `refModules` — se elige una vez
//           y no se cambia (algunas libretas históricas no siguen
//           idioma+nivel: "a2" y "b1" son alemanas, "en" es el inglés A1)
//   order   (solo "module") posición DENTRO DE SU NIVEL — antes vivía
//           implícito en el array `DROPS[d].order`; declararlo es lo que
//           PLAN-ARQUITECTURA-MODULAR.md §5.4 pedía para `Level.rank`,
//           aplicado un nivel más abajo
//   since   el drop en el que se publicó por primera vez — el único campo
//           de negocio: lo necesitan el sello de ids publicados y las notas
//           de Patreon (PLAN-COMPOSICION.md §8.3)
export const CATALOG = [
  // ── módulos — 96 ──
  { kind: "module", id: "fi", lang: "de", level: "a1", file: "phaseIntro", exports: { phase: "phaseIntro", vocab: "vocabIntro" }, order: 1, since: 1 },
  { kind: "module", id: "f0", lang: "de", level: "a1", file: "phase0", exports: { phase: "phase0", vocab: "vocab0" }, order: 2, since: 1 },
  { kind: "module", id: "f1", lang: "de", level: "a1", file: "phase1", exports: { phase: "phase1", vocab: "vocab1" }, order: 3, since: 1 },
  { kind: "module", id: "f2", lang: "de", level: "a1", file: "phase2", exports: { phase: "phase2", vocab: "vocab2" }, order: 4, since: 1 },
  { kind: "module", id: "f3", lang: "de", level: "a1", file: "phase3", exports: { phase: "phase3", vocab: "vocab3" }, order: 5, since: 1 },
  { kind: "module", id: "f4", lang: "de", level: "a1", file: "phase4", exports: { phase: "phase4", vocab: "vocab4" }, order: 6, since: 1 },
  { kind: "module", id: "f5", lang: "de", level: "a1", file: "phase5", exports: { phase: "phase5", vocab: "vocab5" }, order: 7, since: 1 },
  { kind: "module", id: "f7", lang: "de", level: "a1", file: "phase7", exports: { phase: "phase7", vocab: "vocab7" }, order: 8, since: 1 },
  { kind: "module", id: "f8", lang: "de", level: "a1", file: "phase8", exports: { phase: "phase8", vocab: "vocab8" }, order: 9, since: 1 },
  { kind: "module", id: "f9", lang: "de", level: "a1", file: "phase9", exports: { phase: "phase9", vocab: "vocab9" }, order: 10, since: 1 },
  { kind: "module", id: "f10", lang: "de", level: "a1", file: "phase10", exports: { phase: "phase10", vocab: "vocab10" }, order: 11, since: 1 },
  { kind: "module", id: "f11", lang: "de", level: "a1", file: "phase11", exports: { phase: "phase11", vocab: "vocab11" }, order: 12, since: 1 },
  { kind: "module", id: "f6", lang: "de", level: "a1", file: "phaseExam", exports: { phase: "phase6", vocab: "vocab6" }, order: 13, since: 1 },
  { kind: "module", id: "a2m1", lang: "de", level: "a2", file: "a2m1", exports: { phase: "a2m1", vocab: "vocabA2m1" }, order: 1, since: 2 },
  { kind: "module", id: "a2m2", lang: "de", level: "a2", file: "a2m2", exports: { phase: "a2m2", vocab: "vocabA2m2" }, order: 2, since: 2 },
  { kind: "module", id: "a2m3", lang: "de", level: "a2", file: "a2m3", exports: { phase: "a2m3", vocab: "vocabA2m3" }, order: 3, since: 2 },
  { kind: "module", id: "a2m4", lang: "de", level: "a2", file: "a2m4", exports: { phase: "a2m4", vocab: "vocabA2m4" }, order: 4, since: 2 },
  { kind: "module", id: "a2m5", lang: "de", level: "a2", file: "a2m5", exports: { phase: "a2m5", vocab: "vocabA2m5" }, order: 5, since: 2 },
  { kind: "module", id: "a2m6", lang: "de", level: "a2", file: "a2m6", exports: { phase: "a2m6", vocab: "vocabA2m6" }, order: 6, since: 2 },
  { kind: "module", id: "a2m7", lang: "de", level: "a2", file: "a2m7", exports: { phase: "a2m7", vocab: "vocabA2m7" }, order: 7, since: 2 },
  { kind: "module", id: "a2m8", lang: "de", level: "a2", file: "a2m8", exports: { phase: "a2m8", vocab: "vocabA2m8" }, order: 8, since: 2 },
  { kind: "module", id: "a2m9", lang: "de", level: "a2", file: "a2m9", exports: { phase: "a2m9", vocab: "vocabA2m9" }, order: 9, since: 2 },
  { kind: "module", id: "a2m10", lang: "de", level: "a2", file: "a2m10", exports: { phase: "a2m10", vocab: "vocabA2m10" }, order: 10, since: 2 },
  { kind: "module", id: "a2exam", lang: "de", level: "a2", file: "a2exam", exports: { phase: "a2exam", vocab: "vocabA2exam" }, order: 11, since: 2 },
  { kind: "module", id: "ena1m1", lang: "en", level: "a1", file: "en/ena1m1", exports: { phase: "ena1m1", vocab: "vocabEnA1m1" }, order: 1, since: 3 },
  { kind: "module", id: "ena1m2", lang: "en", level: "a1", file: "en/ena1m2", exports: { phase: "ena1m2", vocab: "vocabEnA1m2" }, order: 2, since: 3 },
  { kind: "module", id: "ena1m3", lang: "en", level: "a1", file: "en/ena1m3", exports: { phase: "ena1m3", vocab: "vocabEnA1m3" }, order: 3, since: 3 },
  { kind: "module", id: "ena1m4", lang: "en", level: "a1", file: "en/ena1m4", exports: { phase: "ena1m4", vocab: "vocabEnA1m4" }, order: 4, since: 3 },
  { kind: "module", id: "ena1m5", lang: "en", level: "a1", file: "en/ena1m5", exports: { phase: "ena1m5", vocab: "vocabEnA1m5" }, order: 5, since: 3 },
  { kind: "module", id: "ena1m6", lang: "en", level: "a1", file: "en/ena1m6", exports: { phase: "ena1m6", vocab: "vocabEnA1m6" }, order: 6, since: 3 },
  { kind: "module", id: "ena1m7", lang: "en", level: "a1", file: "en/ena1m7", exports: { phase: "ena1m7", vocab: "vocabEnA1m7" }, order: 7, since: 3 },
  { kind: "module", id: "ena1m8", lang: "en", level: "a1", file: "en/ena1m8", exports: { phase: "ena1m8", vocab: "vocabEnA1m8" }, order: 8, since: 3 },
  { kind: "module", id: "ena1m9", lang: "en", level: "a1", file: "en/ena1m9", exports: { phase: "ena1m9", vocab: "vocabEnA1m9" }, order: 9, since: 3 },
  { kind: "module", id: "ena1m10", lang: "en", level: "a1", file: "en/ena1m10", exports: { phase: "ena1m10", vocab: "vocabEnA1m10" }, order: 10, since: 3 },
  { kind: "module", id: "ena1m11", lang: "en", level: "a1", file: "en/ena1m11", exports: { phase: "ena1m11", vocab: "vocabEnA1m11" }, order: 11, since: 3 },
  { kind: "module", id: "ena1m12", lang: "en", level: "a1", file: "en/ena1m12", exports: { phase: "ena1m12", vocab: "vocabEnA1m12" }, order: 12, since: 3 },
  { kind: "module", id: "b1m1", lang: "de", level: "b1", file: "b1m1", exports: { phase: "b1m1", vocab: "vocabB1m1" }, order: 1, since: 5 },
  { kind: "module", id: "b1m2", lang: "de", level: "b1", file: "b1m2", exports: { phase: "b1m2", vocab: "vocabB1m2" }, order: 2, since: 5 },
  { kind: "module", id: "b1m3", lang: "de", level: "b1", file: "b1m3", exports: { phase: "b1m3", vocab: "vocabB1m3" }, order: 3, since: 5 },
  { kind: "module", id: "b1m4", lang: "de", level: "b1", file: "b1m4", exports: { phase: "b1m4", vocab: "vocabB1m4" }, order: 4, since: 5 },
  { kind: "module", id: "b1m5", lang: "de", level: "b1", file: "b1m5", exports: { phase: "b1m5", vocab: "vocabB1m5" }, order: 5, since: 5 },
  { kind: "module", id: "b1m6", lang: "de", level: "b1", file: "b1m6", exports: { phase: "b1m6", vocab: "vocabB1m6" }, order: 6, since: 5 },
  { kind: "module", id: "b1m7", lang: "de", level: "b1", file: "b1m7", exports: { phase: "b1m7", vocab: "vocabB1m7" }, order: 7, since: 5 },
  { kind: "module", id: "b1m8", lang: "de", level: "b1", file: "b1m8", exports: { phase: "b1m8", vocab: "vocabB1m8" }, order: 8, since: 5 },
  { kind: "module", id: "b1m9", lang: "de", level: "b1", file: "b1m9", exports: { phase: "b1m9", vocab: "vocabB1m9" }, order: 9, since: 5 },
  { kind: "module", id: "b1m10", lang: "de", level: "b1", file: "b1m10", exports: { phase: "b1m10", vocab: "vocabB1m10" }, order: 10, since: 5 },
  { kind: "module", id: "b1m11", lang: "de", level: "b1", file: "b1m11", exports: { phase: "b1m11", vocab: "vocabB1m11" }, order: 11, since: 5 },
  { kind: "module", id: "b1m12", lang: "de", level: "b1", file: "b1m12", exports: { phase: "b1m12", vocab: "vocabB1m12" }, order: 12, since: 5 },
  { kind: "module", id: "ena2m1", lang: "en", level: "a2", file: "en/ena2m1", exports: { phase: "ena2m1", vocab: "vocabEnA2m1" }, order: 1, since: 6 },
  { kind: "module", id: "ena2m2", lang: "en", level: "a2", file: "en/ena2m2", exports: { phase: "ena2m2", vocab: "vocabEnA2m2" }, order: 2, since: 6 },
  { kind: "module", id: "ena2m3", lang: "en", level: "a2", file: "en/ena2m3", exports: { phase: "ena2m3", vocab: "vocabEnA2m3" }, order: 3, since: 6 },
  { kind: "module", id: "ena2m4", lang: "en", level: "a2", file: "en/ena2m4", exports: { phase: "ena2m4", vocab: "vocabEnA2m4" }, order: 4, since: 6 },
  { kind: "module", id: "ena2m5", lang: "en", level: "a2", file: "en/ena2m5", exports: { phase: "ena2m5", vocab: "vocabEnA2m5" }, order: 5, since: 6 },
  { kind: "module", id: "ena2m6", lang: "en", level: "a2", file: "en/ena2m6", exports: { phase: "ena2m6", vocab: "vocabEnA2m6" }, order: 6, since: 6 },
  { kind: "module", id: "ena2m7", lang: "en", level: "a2", file: "en/ena2m7", exports: { phase: "ena2m7", vocab: "vocabEnA2m7" }, order: 7, since: 6 },
  { kind: "module", id: "ena2m8", lang: "en", level: "a2", file: "en/ena2m8", exports: { phase: "ena2m8", vocab: "vocabEnA2m8" }, order: 8, since: 6 },
  { kind: "module", id: "ena2m9", lang: "en", level: "a2", file: "en/ena2m9", exports: { phase: "ena2m9", vocab: "vocabEnA2m9" }, order: 9, since: 6 },
  { kind: "module", id: "ena2m10", lang: "en", level: "a2", file: "en/ena2m10", exports: { phase: "ena2m10", vocab: "vocabEnA2m10" }, order: 10, since: 6 },
  { kind: "module", id: "ena2m11", lang: "en", level: "a2", file: "en/ena2m11", exports: { phase: "ena2m11", vocab: "vocabEnA2m11" }, order: 11, since: 6 },
  { kind: "module", id: "ena2m12", lang: "en", level: "a2", file: "en/ena2m12", exports: { phase: "ena2m12", vocab: "vocabEnA2m12" }, order: 12, since: 6 },
  { kind: "module", id: "enb1m1", lang: "en", level: "b1", file: "en/enb1m1", exports: { phase: "enb1m1", vocab: "vocabEnB1m1" }, order: 1, since: 7 },
  { kind: "module", id: "enb1m2", lang: "en", level: "b1", file: "en/enb1m2", exports: { phase: "enb1m2", vocab: "vocabEnB1m2" }, order: 2, since: 7 },
  { kind: "module", id: "enb1m3", lang: "en", level: "b1", file: "en/enb1m3", exports: { phase: "enb1m3", vocab: "vocabEnB1m3" }, order: 3, since: 7 },
  { kind: "module", id: "enb1m4", lang: "en", level: "b1", file: "en/enb1m4", exports: { phase: "enb1m4", vocab: "vocabEnB1m4" }, order: 4, since: 7 },
  { kind: "module", id: "enb1m5", lang: "en", level: "b1", file: "en/enb1m5", exports: { phase: "enb1m5", vocab: "vocabEnB1m5" }, order: 5, since: 7 },
  { kind: "module", id: "enb1m6", lang: "en", level: "b1", file: "en/enb1m6", exports: { phase: "enb1m6", vocab: "vocabEnB1m6" }, order: 6, since: 7 },
  { kind: "module", id: "enb1m7", lang: "en", level: "b1", file: "en/enb1m7", exports: { phase: "enb1m7", vocab: "vocabEnB1m7" }, order: 7, since: 7 },
  { kind: "module", id: "enb1m8", lang: "en", level: "b1", file: "en/enb1m8", exports: { phase: "enb1m8", vocab: "vocabEnB1m8" }, order: 8, since: 7 },
  { kind: "module", id: "enb1m9", lang: "en", level: "b1", file: "en/enb1m9", exports: { phase: "enb1m9", vocab: "vocabEnB1m9" }, order: 9, since: 7 },
  { kind: "module", id: "enb1m10", lang: "en", level: "b1", file: "en/enb1m10", exports: { phase: "enb1m10", vocab: "vocabEnB1m10" }, order: 10, since: 7 },
  { kind: "module", id: "enb1m11", lang: "en", level: "b1", file: "en/enb1m11", exports: { phase: "enb1m11", vocab: "vocabEnB1m11" }, order: 11, since: 7 },
  { kind: "module", id: "enb1m12", lang: "en", level: "b1", file: "en/enb1m12", exports: { phase: "enb1m12", vocab: "vocabEnB1m12" }, order: 12, since: 7 },
  { kind: "module", id: "b2m1", lang: "de", level: "b2", file: "b2m1", exports: { phase: "b2m1", vocab: "vocabB2m1" }, order: 1, since: 8 },
  { kind: "module", id: "b2m2", lang: "de", level: "b2", file: "b2m2", exports: { phase: "b2m2", vocab: "vocabB2m2" }, order: 2, since: 8 },
  { kind: "module", id: "b2m3", lang: "de", level: "b2", file: "b2m3", exports: { phase: "b2m3", vocab: "vocabB2m3" }, order: 3, since: 8 },
  { kind: "module", id: "b2m4", lang: "de", level: "b2", file: "b2m4", exports: { phase: "b2m4", vocab: "vocabB2m4" }, order: 4, since: 8 },
  { kind: "module", id: "b2m5", lang: "de", level: "b2", file: "b2m5", exports: { phase: "b2m5", vocab: "vocabB2m5" }, order: 5, since: 8 },
  { kind: "module", id: "b2m6", lang: "de", level: "b2", file: "b2m6", exports: { phase: "b2m6", vocab: "vocabB2m6" }, order: 6, since: 8 },
  { kind: "module", id: "b2m7", lang: "de", level: "b2", file: "b2m7", exports: { phase: "b2m7", vocab: "vocabB2m7" }, order: 7, since: 8 },
  { kind: "module", id: "b2m8", lang: "de", level: "b2", file: "b2m8", exports: { phase: "b2m8", vocab: "vocabB2m8" }, order: 8, since: 8 },
  { kind: "module", id: "b2m9", lang: "de", level: "b2", file: "b2m9", exports: { phase: "b2m9", vocab: "vocabB2m9" }, order: 9, since: 8 },
  { kind: "module", id: "b2m10", lang: "de", level: "b2", file: "b2m10", exports: { phase: "b2m10", vocab: "vocabB2m10" }, order: 10, since: 8 },
  { kind: "module", id: "b2m11", lang: "de", level: "b2", file: "b2m11", exports: { phase: "b2m11", vocab: "vocabB2m11" }, order: 11, since: 8 },
  { kind: "module", id: "b2m12", lang: "de", level: "b2", file: "b2m12", exports: { phase: "b2m12", vocab: "vocabB2m12" }, order: 12, since: 8 },
  { kind: "module", id: "enb2m1", lang: "en", level: "b2", file: "en/enb2m1", exports: { phase: "enb2m1", vocab: "vocabEnB2m1" }, order: 1, since: 8 },
  { kind: "module", id: "enb2m2", lang: "en", level: "b2", file: "en/enb2m2", exports: { phase: "enb2m2", vocab: "vocabEnB2m2" }, order: 2, since: 8 },
  { kind: "module", id: "enb2m3", lang: "en", level: "b2", file: "en/enb2m3", exports: { phase: "enb2m3", vocab: "vocabEnB2m3" }, order: 3, since: 8 },
  { kind: "module", id: "enb2m4", lang: "en", level: "b2", file: "en/enb2m4", exports: { phase: "enb2m4", vocab: "vocabEnB2m4" }, order: 4, since: 8 },
  { kind: "module", id: "enb2m5", lang: "en", level: "b2", file: "en/enb2m5", exports: { phase: "enb2m5", vocab: "vocabEnB2m5" }, order: 5, since: 8 },
  { kind: "module", id: "enb2m6", lang: "en", level: "b2", file: "en/enb2m6", exports: { phase: "enb2m6", vocab: "vocabEnB2m6" }, order: 6, since: 8 },
  { kind: "module", id: "enb2m7", lang: "en", level: "b2", file: "en/enb2m7", exports: { phase: "enb2m7", vocab: "vocabEnB2m7" }, order: 7, since: 8 },
  { kind: "module", id: "enb2m8", lang: "en", level: "b2", file: "en/enb2m8", exports: { phase: "enb2m8", vocab: "vocabEnB2m8" }, order: 8, since: 8 },
  { kind: "module", id: "enb2m9", lang: "en", level: "b2", file: "en/enb2m9", exports: { phase: "enb2m9", vocab: "vocabEnB2m9" }, order: 9, since: 8 },
  { kind: "module", id: "enb2m10", lang: "en", level: "b2", file: "en/enb2m10", exports: { phase: "enb2m10", vocab: "vocabEnB2m10" }, order: 10, since: 8 },
  { kind: "module", id: "enb2m11", lang: "en", level: "b2", file: "en/enb2m11", exports: { phase: "enb2m11", vocab: "vocabEnB2m11" }, order: 11, since: 8 },
  { kind: "module", id: "enb2m12", lang: "en", level: "b2", file: "en/enb2m12", exports: { phase: "enb2m12", vocab: "vocabEnB2m12" }, order: 12, since: 8 },
  // ── simulacros (islas: no citan vocabulario, PLAN-COMPOSICION §2.4) — 19 ──
  { kind: "exam", id: "sim-a", lang: "de", level: "a1", file: "examA", exports: { set: "examA" }, since: 1 },
  { kind: "exam", id: "sim-b", lang: "de", level: "a1", file: "examB", exports: { set: "examB" }, since: 1 },
  { kind: "exam", id: "sim-c", lang: "de", level: "a1", file: "examC", exports: { set: "examC" }, since: 1 },
  { kind: "exam", id: "en-sim-a", lang: "en", level: "a1", file: "en/examEnA", exports: { set: "examEnA" }, since: 3 },
  { kind: "exam", id: "en-sim-b", lang: "en", level: "a1", file: "en/examEnB", exports: { set: "examEnB" }, since: 3 },
  { kind: "exam", id: "b1-sim-a", lang: "de", level: "b1", file: "examB1A", exports: { set: "examB1A" }, since: 5 },
  { kind: "exam", id: "b1-sim-b", lang: "de", level: "b1", file: "examB1B", exports: { set: "examB1B" }, since: 8 },
  { kind: "exam", id: "en-a2-sim-a", lang: "en", level: "a2", file: "en/examEnA2A", exports: { set: "examEnA2A" }, since: 6 },
  { kind: "exam", id: "en-a2-sim-b", lang: "en", level: "a2", file: "en/examEnA2B", exports: { set: "examEnA2B" }, since: 6 },
  { kind: "exam", id: "en-a2-sim-c", lang: "en", level: "a2", file: "en/examEnA2C", exports: { set: "examEnA2C" }, since: 6 },
  { kind: "exam", id: "en-b1-sim-a", lang: "en", level: "b1", file: "en/examEnB1A", exports: { set: "examEnB1A" }, since: 7 },
  { kind: "exam", id: "en-b1-sim-b", lang: "en", level: "b1", file: "en/examEnB1B", exports: { set: "examEnB1B" }, since: 7 },
  { kind: "exam", id: "en-b1-sim-c", lang: "en", level: "b1", file: "en/examEnB1C", exports: { set: "examEnB1C" }, since: 7 },
  { kind: "exam", id: "a2-sim-a", lang: "de", level: "a2", file: "examA2A", exports: { set: "examA2A" }, since: 8 },
  { kind: "exam", id: "a2-sim-b", lang: "de", level: "a2", file: "examA2B", exports: { set: "examA2B" }, since: 8 },
  { kind: "exam", id: "b2-sim-a", lang: "de", level: "b2", file: "examB2A", exports: { set: "examB2A" }, since: 8 },
  { kind: "exam", id: "b2-sim-b", lang: "de", level: "b2", file: "examB2B", exports: { set: "examB2B" }, since: 8 },
  { kind: "exam", id: "en-b2-sim-a", lang: "en", level: "b2", file: "en/examEnB2A", exports: { set: "examEnB2A" }, since: 8 },
  { kind: "exam", id: "en-b2-sim-b", lang: "en", level: "b2", file: "en/examEnB2B", exports: { set: "examEnB2B" }, since: 8 },
  // ── misiones (no declaran level: mezclan niveles dentro del fichero) — 6 ──
  { kind: "mission", id: "missionsDeA1", lang: "de", level: "a1", file: "missionsDeA1", exports: { missions: "missionsDeA1" }, since: 1 },
  { kind: "mission", id: "missionsDeA2", lang: "de", level: "a2", file: "missionsDeA2", exports: { missions: "missionsDeA2" }, since: 2 },
  { kind: "mission", id: "missionsEn", lang: "en", level: "a1", file: "en/missionsEn", exports: { missions: "missionsEn" }, since: 3 },
  { kind: "mission", id: "missionsDeB1", lang: "de", level: "b1", file: "missionsDeB1", exports: { missions: "missionsDeB1" }, since: 5 },
  { kind: "mission", id: "missionsEnA2", lang: "en", level: "a2", file: "en/missionsEnA2", exports: { missions: "missionsEnA2" }, since: 6 },
  { kind: "mission", id: "missionsEnB1", lang: "en", level: "b1", file: "en/missionsEnB1", exports: { missions: "missionsEnB1" }, since: 7 },
  { kind: "mission", id: "missionsDeB2", lang: "de", level: "b2", file: "missionsDeB2", exports: { missions: "missionsDeB2" }, since: 8 },
  { kind: "mission", id: "missionsEnB2", lang: "en", level: "b2", file: "en/missionsEnB2", exports: { missions: "missionsEnB2" }, since: 8 },
  // ── libretas de referencia — 5 ──
  { kind: "reference", id: "a2", lang: "de", level: "a2", file: "referenceA2", key: "a2", since: 2 },
  { kind: "reference", id: "en", lang: "en", level: "a1", file: "en/referenceEn", key: "en", since: 3 },
  { kind: "reference", id: "b1", lang: "de", level: "b1", file: "referenceB1", key: "b1", since: 5 },
  { kind: "reference", id: "ena2", lang: "en", level: "a2", file: "en/referenceEnA2", key: "ena2", since: 6 },
  { kind: "reference", id: "enb1", lang: "en", level: "b1", file: "en/referenceEnB1", key: "enb1", since: 7 },
  { kind: "reference", id: "b2", lang: "de", level: "b2", file: "referenceB2", key: "b2", since: 8 },
  { kind: "reference", id: "enb2", lang: "en", level: "b2", file: "en/referenceEnB2", key: "enb2", since: 8 },

  // Libretas A1 DE (verbs/questions/pronunciation): ahora sí son "reference"
  // con clave, para que un manifiesto solo-inglés no las arrastre. El diff de
  // course.gen.ts de los drops 1-7 CAMBIA a propósito: recapturar fixtures.
  { kind: "reference", id: "verbs", lang: "de", level: "a1", file: "verbs", key: "verbs", since: 1 },
  { kind: "reference", id: "questions", lang: "de", level: "a1", file: "questions", key: "questions", since: 1 },
  { kind: "reference", id: "pronunciation", lang: "de", level: "a1", file: "pronunciation", key: "pronunciation", since: 1 },
];
