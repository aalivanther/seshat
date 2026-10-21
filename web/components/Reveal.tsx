"use client";

// Entradas escalonadas con física de spring (motion) — el "juice" de los hubs.
// Cada tarjeta llega con un pequeño retraso según su posición.

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { SPRING } from "@/lib/juice";

export function Reveal({
  children, i = 0, className, style,
}: {
  children: ReactNode;
  /** posición en la lista → retraso escalonado */
  i?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  // Sin animación no basta con devolver un div: el HTML exportado ya trae
  // horneado el `opacity: 0` del estado inicial de motion, y como este div no
  // es el mismo elemento, React lo deja tal cual. Resultado: secciones enteras
  // invisibles para quien pide menos movimiento. Se pisa el estilo a mano.
  if (reduced) {
    return (
      <div className={className} style={{ ...style, opacity: 1, transform: "none" }} suppressHydrationWarning>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...SPRING, delay: Math.min(i, 10) * 0.055 }}
    >
      {children}
    </motion.div>
  );
}

/** Barra de progreso que se llena con spring al montar */
export function JuicyBar({
  pct, color, trackClass, fillClass,
}: {
  pct: number;
  color?: string;
  trackClass: string;
  fillClass: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div className={trackClass}>
      <motion.div
        className={fillClass}
        style={{ background: color, height: "100%", borderRadius: 999 }}
        initial={{ width: reduced ? `${pct}%` : "0%" }}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 90, damping: 22, delay: 0.15 }}
      />
    </div>
  );
}
