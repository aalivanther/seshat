"use client";

import { useEffect, useState } from "react";
import { ESPERA_LENTA_MS } from "./esperaModelo";

/** Mientras `activo` sigue, a los 15 s la frase larga sustituye a la corta.
 *  Al soltar la espera el temporizador se limpia: la siguiente empieza de cero.
 *  Vive aparte de esperaModelo: ese módulo lo importa el API, y el API entra
 *  en páginas de servidor. Un hook ahí metería React en ese grafo y el
 *  empaquetado no compilaría. */
export function useLento(activo: boolean): boolean {
  const [lento, setLento] = useState(false);
  useEffect(() => {
    if (!activo) {
      setLento(false);
      return;
    }
    setLento(false);
    const t = window.setTimeout(() => setLento(true), ESPERA_LENTA_MS);
    return () => window.clearTimeout(t);
  }, [activo]);
  return lento;
}
