// Una espera larga cambia de frase a los quince segundos. Cancelar suelta
// la pantalla antes de abortar: si el aborto reanuda el await en el mismo
// turno, la respuesta vieja ya no puede volver a ocupar.

/** A los quince segundos la frase corta deja paso a la larga. */
export const ESPERA_LENTA_MS = 15_000;

export const TEXTO_SIGUE = "Sigue en ello.";

export const AVISO_TARDA = "Está tardando; puedes dejarlo.";

export type EsperaPantalla = {
  busy: boolean;
  gen: number;
};

export function textoDeEspera(lento: boolean, inicial = TEXTO_SIGUE): string {
  return lento ? AVISO_TARDA : inicial;
}

export function esperaQuieta(): EsperaPantalla {
  return { busy: false, gen: 0 };
}

export function empezarEspera(estado: EsperaPantalla): EsperaPantalla {
  return { busy: true, gen: estado.gen + 1 };
}

/** La respuesta de otra generación no pinta ni suelta la espera nueva. */
export function generacionVigente(estado: EsperaPantalla, gen: number): boolean {
  return estado.gen === gen;
}

export function terminarEspera(estado: EsperaPantalla, gen: number): EsperaPantalla {
  if (estado.gen !== gen) return estado;
  return { busy: false, gen: estado.gen };
}

/** `aplicar` corre antes del abort: busy ya es false cuando el fetch despierta. */
export function cancelarEspera(
  estado: EsperaPantalla,
  abort: { abort: () => void } | null,
  aplicar: (siguiente: EsperaPantalla) => void,
): EsperaPantalla {
  const siguiente = { busy: false, gen: estado.gen + 1 };
  aplicar(siguiente);
  abort?.abort();
  return siguiente;
}

/** safeFetch, si recibe señal, ya no pone la suya. Sin el tope, cancelar
 *  dejaría la corrección colgada cuando el alumno no aborta. */
export function senalDeEspera(delAlumno: AbortSignal | undefined, topeMs: number): AbortSignal {
  const tope = AbortSignal.timeout(topeMs);
  if (!delAlumno) return tope;
  return AbortSignal.any([delAlumno, tope]);
}

/** La cancelación no es el motor caído. El tope de tiempo sí: si no se
 *  anota, un reintento puede fiarse de un 401 viejo de otra ruta. */
export function esFalloDeMotor(signal: AbortSignal | undefined): boolean {
  if (!signal?.aborted) return true;
  const reason: unknown = signal.reason;
  if (!reason || typeof reason !== "object" || !("name" in reason)) return false;
  return (reason as { name: unknown }).name === "TimeoutError";
}

export class EsperaCancelada extends Error {
  constructor() {
    super("espera cancelada");
    this.name = "EsperaCancelada";
  }
}

export function cortarSiCancelada(signal: AbortSignal): void {
  if (signal.aborted) throw new EsperaCancelada();
}
