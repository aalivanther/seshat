"use client";

// AVISO AL SALIR — el navegador pregunta antes de tirar lo que estás haciendo.
//
// Seshat guarda el progreso al TERMINAR cada lección, prueba o simulacro: hasta
// entonces, lo hecho vive solo en memoria. Un Cmd+R por inercia, un cierre de
// pestaña sin mirar o un clic en «atrás» se llevaban por delante un Modellsatz
// B1 de tres horas, una entrevista entera o una redacción de ochenta palabras, y
// la app ni se enteraba. El botón de salir de dentro sí avisaba; el del
// navegador, no.
//
// El texto no se puede personalizar (los navegadores lo ignoran desde 2017 para
// que nadie escriba mensajes de chantaje): sale el diálogo estándar. Lo que
// controlamos es CUÁNDO aparece — solo con trabajo de verdad en curso, porque un
// aviso que salta siempre se aprende a ignorar en dos días. Qué cuenta como
// trabajo lo decide `hayQuePreguntarAlSalir`: si no, la invitación del repaso
// o el saludo de la otra parte preguntarían igual que una redacción.

import { useEffect } from "react";

export interface TrabajoAlSalir {
  /** Borrador en el campo, todavía no enviado. */
  texto?: string;
  /** Hilo ya pintado. Solo cuenta el turno del alumno. */
  mensajes?: readonly { role: string; content: string }[];
  /** Palabras de la misión: se registran al guardar, no al teclear. */
  palabras?: string;
  /** Casillas marcadas. Dejan de contar cuando `registrada` es cierto. */
  checklist?: number;
  /** La misión ya viajó al progreso. El hilo del ensayo no viaja con ella. */
  registrada?: boolean;
  /** Respuestas ya cerradas del repaso. Cero es la invitación. */
  respuestas?: number;
  /** El repaso está en el cierre: el guardado ya se pidió. */
  repasoTerminado?: boolean;
  /** La run va. La portada y el cierre no. */
  retoEnMarcha?: boolean;
}

/** ¿Cerrar la pestaña se llevaría trabajo?
 *
 * El orden es la regla. Texto y turno del alumno preguntan aunque la misión
 * ya esté registrada: el ensayo no se guarda con la checklist. El reto
 * pregunta en cuanto la run va, aunque el ejercicio en curso siga en blanco.
 * El repaso no pregunta en la invitación (cero respuestas) ni en el cierre.
 * La checklist y las palabras dejan de preguntar al registrarse. El saludo
 * de la otra parte no es trabajo. */
export function hayQuePreguntarAlSalir(t: TrabajoAlSalir): boolean {
  if ((t.texto ?? "").trim().length > 0) return true;
  if ((t.mensajes ?? []).some((m) => m.role === "user" && m.content.trim().length > 0)) {
    return true;
  }
  if (t.retoEnMarcha) return true;
  if (t.repasoTerminado) return false;
  if ((t.respuestas ?? 0) > 0) return true;
  if (t.registrada) return false;
  if ((t.palabras ?? "").trim().length > 0) return true;
  if ((t.checklist ?? 0) > 0) return true;
  return false;
}

/** Sin preventDefault Chrome no pregunta; sin returnValue, tampoco, aunque no lo muestre. */
export function frenarSalida(
  e: { preventDefault(): void; returnValue: string },
  preguntar: boolean,
): void {
  if (!preguntar) return;
  e.preventDefault();
  e.returnValue = "";
}

/** @param active ¿hay trabajo sin guardar ahora mismo? */
export function useLeaveGuard(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      frenarSalida(e, true);
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [active]);
}
