"use client";

// EL «SALIR» DE LA DEMO WEB.
//
// En la app de escritorio este botón apaga el motor local (en Windows no hay
// otra ventana que cerrar). En la demo no hay proceso que apagar: basta con
// cerrar la pestaña. En su sitio se dice dónde se guarda lo que haces, que es
// lo que de verdad le importa a quien prueba la demo.

import { Info } from "@phosphor-icons/react";
import bar from "@/components/appbar.module.css";

const DEMO_NOTE =
  "Demo web: tu progreso se guarda solo en este navegador. No hay aplicación que cerrar; puedes cerrar la pestaña cuando quieras.";

export function QuitButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <span className={bar.chip} title={DEMO_NOTE} role="note" aria-label={DEMO_NOTE}>
        <Info size={16} weight="bold" aria-hidden /> Demo
      </span>
    );
  }
  return (
    <p role="note" style={{ color: "var(--text-3)", fontSize: "0.9rem", textAlign: "center", lineHeight: 1.5 }}>
      {DEMO_NOTE}
    </p>
  );
}
