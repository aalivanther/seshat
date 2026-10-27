"use client";

// Entradas escalonadas con física de spring (motion) — el "juice" de los hubs.
// Cada tarjeta llega con un pequeño retraso según su posición.
// LazyMotion + m.div: el mismo resorte con solo el motor de animación
// (domAnimation), no el paquete entero de motion en cada hub.

import { LazyMotion, animate, domAnimation, m, useMotionValue, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
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
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        style={style}
        initial={{ opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...SPRING, delay: Math.min(i, 10) * 0.055 }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

/** Barra de progreso que se llena con spring al montar (y al cambiar).
 *
 *  Antes se animaba `width`: layout en cada fotograma, y encima la transición
 *  CSS de `.barFill` (width 0.7s) perseguía al resorte. Ahora el ancho salta
 *  de una vez y lo que se mueve es la posición del relleno (`x`, recortado por
 *  la pista), con el mismo resorte y la misma transición CSS sobre transform:
 *  el borde visible recorre exactamente el mismo camino y en reposo el
 *  relleno es el mismo elemento de siempre (ancho = pct, sin desplazar).
 *  Si baja, el ancho viejo se mantiene mientras se recoge y se ajusta al final. */
export function JuicyBar({
  pct, color, trackClass, fillClass,
}: {
  pct: number;
  color?: string;
  trackClass: string;
  fillClass: string;
}) {
  const reduced = useReducedMotion();
  const fill = useRef<HTMLDivElement>(null);
  // de partida, lo mismo que pintaba el `initial` de antes: vacía, o llena si
  // se pidió menos movimiento
  const width = useMotionValue(`${pct}%`);
  const x = useMotionValue(reduced ? "0%" : "-100%");
  const run = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const el = fill.current;
    if (!el) return;
    run.current?.stop();
    // lo que se ve ahora mismo, en % de la pista
    const w = parseFloat(String(width.get())) || 0;
    const shown = w * (1 + (parseFloat(String(x.get())) || 0) / 100);
    // colocar sin que la transición CSS lo note: el borde no se mueve
    const place = (nextW: number, nextX: number) => {
      el.style.transition = "none";
      width.jump(`${nextW}%`);
      x.jump(`${nextX}%`);
      el.style.width = `${nextW}%`;
      el.style.transform = nextX === 0 ? "none" : `translateX(${nextX}%)`;
      void el.offsetWidth;
      el.style.transition = "";
    };
    const spring = { type: "spring" as const, stiffness: 90, damping: 22, delay: 0.15 };
    if (Math.abs(shown - pct) < 0.01) {
      place(pct, 0);
      return;
    }
    if (pct > shown) {
      place(pct, -(1 - shown / pct) * 100);
      run.current = animate(x, "0%", spring);
    } else {
      place(w, -(1 - shown / w) * 100);
      run.current = animate(x, `${-(1 - pct / w) * 100}%`, {
        ...spring,
        onComplete: () => place(pct, 0),
      });
    }
    return () => run.current?.stop();
  }, [pct, width, x]);

  return (
    <div className={trackClass}>
      <LazyMotion features={domAnimation}>
        <m.div
          ref={fill}
          className={fillClass}
          style={{ background: color, height: "100%", borderRadius: 999, width, x }}
        />
      </LazyMotion>
    </div>
  );
}
