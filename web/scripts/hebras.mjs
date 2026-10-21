// Porcentaje de las cuatro hebras por módulo (P16). Solo mide.
//
// El aviso de ausencia, en validate-content.mjs, sigue siendo un booleano de
// B1 y B2 y no falla el build: con un ejercicio basta, y su fluidez acepta
// material ya visto aunque nadie lo cronometre. Ese gesto NO entra aquí. Si
// entrara, un cloze de repaso parecería fluidez y el porcentaje dejaría de
// decir si el cuarto que pide Nation está torcido.
//
// speak y shadow sí entran en output. El aviso no los cuenta; dejarlos fuera
// ocultaría el oral de A1, que es casi todo leer en voz alta y sombrear.
// El resto (audiomc, mc, cloze, type…) no se reclasifica: esta pasada no
// reescribe la vara, y el contenido que salga de los números es otra ficha.

const INPUT = new Set(["read"]);
// El aviso solo mira write / monologue / paraphrase. speak y shadow se suman
// aquí porque si no el porcentaje repite el agujero que la medición viene a ver.
const OUTPUT = new Set(["write", "monologue", "paraphrase", "speak", "shadow"]);
const FORMA = new Set(["gapbank", "errorfix", "transform", "bucket"]);
// Solo el tipo con reloj. La cláusula «itemIds todos de módulos anteriores»
// se queda en el aviso: marca fluidez sin que nadie haya cronometrado nada.
const FLUIDEZ = new Set(["fastmatch"]);

/** @returns {"input" | "output" | "forma" | "fluidez" | null} null = sin hebra en esta medición */
export function strandOf(type) {
  if (INPUT.has(type)) return "input";
  if (OUTPUT.has(type)) return "output";
  if (FORMA.has(type)) return "forma";
  if (FLUIDEZ.has(type)) return "fluidez";
  return null;
}

export function emptyStrandCounts() {
  return { input: 0, output: 0, forma: 0, fluidez: 0, otras: 0, n: 0, notas: 0 };
}

export function addExercise(counts, type) {
  counts.n++;
  const strand = strandOf(type);
  if (strand) counts[strand]++;
  else counts.otras++;
}

/** Una nota larga no es un ejercicio: el aviso de B1/B2 la cuenta como input
 *  y el porcentaje no. Se anota aparte para no «arreglar» un 0 % de read
 *  borrando el cuento. */
export function addLongNote(counts) {
  counts.notas++;
}

function pct(part, total) {
  if (!total) return "0.0";
  return (Math.round((part * 1000) / total) / 10).toFixed(1);
}

function slot(counts, key) {
  return `${pct(counts[key], counts.n)}% (${counts[key]})`;
}

export function formatStrandLine(row) {
  const c = row;
  return (
    `hebras ${row.id} ${row.level} ${row.lang}: ` +
    `input ${slot(c, "input")} · output ${slot(c, "output")} · ` +
    `forma ${slot(c, "forma")} · fluidez ${slot(c, "fluidez")} · ` +
    `sin hebra ${slot(c, "otras")} · n=${c.n} · notas=${c.notas}`
  );
}

export const STRAND_REPORT_HEADER = [
  "hebras — medición por módulo (no es un fallo; el aviso de ausencia no se convierte en error).",
  "  input = read · output = write, monologue, paraphrase, speak y shadow · forma = gapbank, errorfix, transform, bucket · fluidez = fastmatch.",
  "  sin hebra = el resto. audiomc no es input y mc, cloze o type no son forma: no se reclasifican en esta pasada.",
  "  notas = notas de 150 palabras o más. El aviso de B1/B2 las cuenta como input; aquí no entran en el porcentaje.",
  "  La fluidez del aviso también acepta un ejercicio sin reloj cuyos itemIds vengan todos de módulos anteriores. Ese gesto es a propósito y no entra en este porcentaje.",
].join("\n");

export function formatStrandReport(rows) {
  return [STRAND_REPORT_HEADER, ...rows.map(formatStrandLine)].join("\n");
}
