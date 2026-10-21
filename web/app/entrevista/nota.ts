import type { InterviewItem } from "./tipos";

// Baremo del oral: casillas, tope y leyenda. No vive en el player: si vuelve
// a page.tsx, la nota se mezcla otra vez con las preguntas.

/** Cuántas casillas del esquema cubre la respuesta escrita. */
export function scoreOralSchema(
  item: InterviewItem,
  answer: string,
): { hit: number; total: number; missing: string[] } {
  const checks = item.schemaChecks ?? [];
  if (!checks.length) return { hit: 0, total: 0, missing: [] };
  const missing = checks.filter((c) => !new RegExp(c.re, "i").test(answer)).map((c) => c.label);
  return { hit: checks.length - missing.length, total: checks.length, missing };
}

/** Sin esquema no toca. 0–1 casillas → 0; esquema incompleto → como mucho 1. */
export function capOralPoints(item: InterviewItem, points: number, answer: string): number {
  const s = scoreOralSchema(item, answer);
  if (s.total === 0) return points;
  if (s.hit <= 1) return 0;
  if (s.hit < s.total) return Math.min(points, 1);
  return points;
}

/** Leyenda del 0–2. Con casillas el número sale de ellas. Sin casillas no hay
 *  baremo que inventar, así que la nota es orientativa. El segundo argumento
 *  se conserva para quien ya lo pasaba; no cambia la frase. */
export function oralNotaLeyenda(tieneCasillas: boolean, _calificoElModelo: boolean): string {
  if (tieneCasillas) return "El número sale de las casillas.";
  return "La nota es orientativa.";
}

export function leyendaDe(item: InterviewItem, calificoElModelo: boolean): string {
  return oralNotaLeyenda((item.schemaChecks?.length ?? 0) > 0, calificoElModelo);
}

/** Portada: un A1 no anuncia casillas que no tiene. El B2 alemán, que
 *  mezcla el Vortrag con ítems sin esquema, dice las dos cosas. */
export function oralLeyendaPortada(
  hayCasillas: boolean,
  haySinCasillas: boolean,
  calificoElModelo: boolean,
): string {
  const con = oralNotaLeyenda(true, calificoElModelo);
  const sin = oralNotaLeyenda(false, calificoElModelo);
  if (hayCasillas && haySinCasillas) return `Donde hay casillas: ${con} Donde no las hay: ${sin}`;
  if (hayCasillas) return con;
  if (haySinCasillas) return sin;
  return "";
}

export function leyendaPortada(items: InterviewItem[], calificoElModelo: boolean): string {
  const hay = items.some((it) => (it.schemaChecks?.length ?? 0) > 0);
  const sin = items.some((it) => (it.schemaChecks?.length ?? 0) === 0);
  return oralLeyendaPortada(hay, sin, calificoElModelo);
}

const ORAL_SIGUE =
  "Compárate con la respuesta de ejemplo y ponte nota. El examen real también empieza por saber juzgarse.";

/** La frase del servidor va delante. Sin ella, el alumno solo lee «compárate». */
export function oralTextoSinCalificar(why: string | null): string {
  const motivo = why?.trim() ?? "";
  return motivo ? `${motivo} ${ORAL_SIGUE}` : ORAL_SIGUE;
}

/** Un 2 que se pone el alumno no esconde la frase con la que se rechazó la URL.
 *  Sin frase, el cierre sigue repasando solo lo que no llegó al 2. */
export function oralCierreEnseña(points: number, aviso: string): boolean {
  if (aviso.trim()) return true;
  return points < 2;
}


