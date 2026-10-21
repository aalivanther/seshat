"use client";

// ARTE PROPIO DE SESHAT — dibujado a mano en SVG, no tomado de ninguna parte.
//
// Los emojis del sistema (🥇⚔️🎉💪) son de otra casa: cada plataforma los pinta
// distinto, no combinan con la paleta y le dan a la app ese aire de plantilla
// genérica. Estas piezas comparten el vocabulario visual del wordmark —la
// estrella de siete puntas de Seshat, el trazo de tinta, el ámbar sobre
// pergamino— y escalan sin pixelarse.
//
// Todo aquí es original y vive en el repo: cero dependencias, cero licencias
// que vigilar.

type P = { size?: number; className?: string; title?: string };

const ink = "var(--text)";
const amber = "var(--accent)";

/* ── La estrella de Seshat, la pieza madre ───────────────────────────────── */

function starPoints(cx: number, cy: number, rOut: number, rIn: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 14; i++) {
    const r = i % 2 === 0 ? rOut : rIn;
    const a = (i / 14) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

/* ── Medallas de reto: metal + la estrella grabada ───────────────────────── */

const METALS = {
  oro: { ring: "#c8912f", face: "#f0d089", edge: "#a8761f" },
  plata: { ring: "#9aa0a6", face: "#e2e6ea", edge: "#7d848a" },
  bronce: { ring: "#a9713f", face: "#dda877", edge: "#8a5a30" },
} as const;

export function Medal({ kind, size = 34, title }: P & { kind: keyof typeof METALS }) {
  const m = METALS[kind];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label={title ?? kind}>
      {/* cinta */}
      <path d="M13 2 L20 15 L27 2" fill="none" stroke={m.edge} strokeWidth="3.4" strokeLinecap="round" />
      {/* disco */}
      <circle cx="20" cy="25" r="12.5" fill={m.face} stroke={m.ring} strokeWidth="2.4" />
      <circle cx="20" cy="25" r="9.2" fill="none" stroke={m.edge} strokeWidth="0.9" opacity="0.65" />
      {/* la estrella grabada */}
      <polygon points={starPoints(20, 25, 7.4, 2.9)} fill={m.edge} opacity="0.92" />
      <circle cx="20" cy="25" r="1.7" fill={m.face} />
    </svg>
  );
}

/* ── Marcas de corrección: trazo de pluma, no símbolos del sistema ───────── */

export function CheckMark({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M4 13.5 L9.5 19 L20 5.5"
        fill="none"
        stroke="var(--ok, #16a34a)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CrossMark({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M5.5 5.5 L18.5 18.5" stroke="var(--err, #b3323e)" strokeWidth="3" strokeLinecap="round" />
      <path d="M18.5 5.5 L5.5 18.5" stroke="var(--err, #b3323e)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ── Vidas del reto: corazón de tinta, lleno o partido ───────────────────── */

export function LifeHeart({ size = 18, spent = false }: P & { spent?: boolean }) {
  const c = spent ? "var(--text-3)" : "var(--err, #b3323e)";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 20.5 C5 15.5 2.5 12 2.5 8.6 A5 5 0 0 1 12 6.4 A5 5 0 0 1 21.5 8.6 C21.5 12 19 15.5 12 20.5 Z"
        fill={spent ? "none" : c}
        stroke={c}
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity={spent ? 0.5 : 1}
      />
      {spent && <path d="M12 5 L10 11 L14 13 L11.5 19" fill="none" stroke="var(--surface)" strokeWidth="2.2" />}
    </svg>
  );
}

/* ── Sellos de momento: los hitos que merecen una imagen, no un emoji ───── */

/** Cumbre alcanzada: el módulo o el nivel completado */
export function SummitSeal({ size = 96 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="Cumbre alcanzada">
      <circle cx="48" cy="48" r="44" fill="none" stroke={amber} strokeWidth="1.6" opacity="0.35" />
      <circle cx="48" cy="48" r="38" fill="none" stroke={amber} strokeWidth="2.6" />
      {/* montaña de dos crestas */}
      <path d="M22 62 L38 38 L48 52 L58 32 L74 62 Z" fill="none" stroke={ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M38 38 L44 46 L34 46 Z" fill={ink} opacity="0.15" />
      <path d="M58 32 L66 45 L52 45 Z" fill={ink} opacity="0.15" />
      {/* la estrella coronando */}
      <polygon points={starPoints(58, 24, 7.5, 3)} fill={amber} />
      <line x1="22" y1="62" x2="74" y2="62" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}


/** Reto: dos plumas cruzadas — el duelo del que ya sabe algo */
export function DuelSeal({ size = 96 }: P) {
  const quill = (flip: boolean) => (
    <g transform={flip ? "scale(-1,1) translate(-96,0)" : undefined}>
      <line x1="26" y1="74" x2="66" y2="26" stroke={ink} strokeWidth="3" strokeLinecap="round" />
      <path d="M66 26 C60 30 58 36 60 42 C66 40 70 34 66 26 Z" fill={amber} stroke={amber} strokeWidth="1.2" />
      <line x1="30" y1="70" x2="38" y2="62" stroke={amber} strokeWidth="3" strokeLinecap="round" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="Reto">
      {quill(false)}
      {quill(true)}
      <polygon points={starPoints(48, 20, 6, 2.4)} fill={amber} opacity="0.9" />
    </svg>
  );
}

/** Estado vacío / calma: la libreta cerrada esperando */
export function NotebookSeal({ size = 96 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" role="img" aria-label="Nada por aquí todavía">
      <rect x="24" y="20" width="48" height="60" rx="4" fill="none" stroke={ink} strokeWidth="2.6" />
      <line x1="34" y1="20" x2="34" y2="80" stroke={amber} strokeWidth="2.2" />
      {[34, 46, 58, 70].map((y) => (
        <line key={y} x1="42" y1={y} x2="64" y2={y} stroke={ink} strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
      ))}
      <polygon points={starPoints(72, 26, 8, 3.2)} fill={amber} />
    </svg>
  );
}

/** Racha viva: llama de trazo, sin degradados de plantilla */
export function StreakFlame({ size = 18 }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2.5 C13.5 7 17.5 8 17.5 13 A5.5 5.5 0 0 1 6.5 13 C6.5 10.5 8 9.5 9 8 C9.8 9.4 10.6 9.8 11 10.6 C11.8 8.4 11 5.4 12 2.5 Z"
        fill={amber}
        stroke={amber}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Iconos de herramienta ───────────────────────────────────────────────
   Los siete accesos del hub. Mismo lenguaje que el emblema: trazo de tinta
   sobre el papel, un acento ámbar por pieza, nada de relleno plano ni
   degradados. Dibujados a mano para que la app no parezca vestida con un
   paquete de iconos de catálogo. */

type IconP = { size?: number };

/** La libreta: cuaderno cosido, con su cinta */
export function ToolNotebook({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M7 4.5 h17 a2 2 0 0 1 2 2 v20.5 a2 2 0 0 1-2 2 H7 Z" fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M7 4.5 v24.5" stroke={amber} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M12 11 h9 M12 16 h9 M12 21 h6" stroke={ink} strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
      <path d="M21 4.5 v7 l2.2-1.8 L25.4 11.5 v-7" fill="var(--surface)" stroke={amber} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

/** Conversación: dos voces que se solapan */
export function ToolTalk({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M4 8.5 h15 a2 2 0 0 1 2 2 v7 a2 2 0 0 1-2 2 h-8 l-4.5 3.4 v-3.4 H4 a2 2 0 0 1-2-2 v-7 a2 2 0 0 1 2-2 Z"
        fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M24 12 h4 a2 2 0 0 1 2 2 v6 a2 2 0 0 1-2 2 h-1.5 v3 L22 22 h-1"
        fill="none" stroke={amber} strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  );
}

/** Escritura: pluma sobre renglón */
export function ToolPen({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6 24 L20.5 8.5 a3 3 0 0 1 4.2 4.2 L10.2 27.2 L4.5 28.5 Z"
        fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M19 10 l3.6 3.6" stroke={ink} strokeWidth="1.5" opacity="0.5" />
      <path d="M3 30.5 h26" stroke={amber} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Entrevista: micrófono de examen */
export function ToolMic({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="12" y="3.5" width="8" height="14" rx="4" fill="none" stroke={ink} strokeWidth="1.9" />
      <path d="M7.5 15 a8.5 8.5 0 0 0 17 0" fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 23.5 v5 M11.5 28.5 h9" stroke={ink} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** Simulacros: hoja sellada con reloj */
export function ToolExam({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6.5 3.5 h13 l6 6 v19 a1.5 1.5 0 0 1-1.5 1.5 h-17.5 a1.5 1.5 0 0 1-1.5-1.5 v-23.5 a1.5 1.5 0 0 1 1.5-1.5 Z"
        fill="none" stroke={ink} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M19.5 3.5 v6 h6" fill="none" stroke={ink} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="20" r="5.6" fill="var(--surface)" stroke={amber} strokeWidth="1.9" />
      <path d="M16 16.8 V20 l2.4 1.6" stroke={amber} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}


/** En tu teléfono: el móvil con la señal */
export function ToolPhone({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect x="8" y="3.5" width="14" height="25" rx="2.6" fill="none" stroke={ink} strokeWidth="1.9" />
      <path d="M13 6.6 h4" stroke={ink} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="15" cy="24.6" r="1.3" fill={ink} opacity="0.5" />
      <path d="M25 10.5 a7 7 0 0 1 0 11 M27.8 7.5 a11 11 0 0 1 0 17"
        fill="none" stroke={amber} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/** Mi expedición: la medalla con su cinta, hermana pequeña de <Medal> */
export function ToolMedal({ size = 30 }: IconP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M10 2.5 L16 13 M22 2.5 L16 13" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="21" r="8.5" fill="none" stroke={amber} strokeWidth="2.2" />
      <polygon points={starPoints(16, 21, 5, 2)} fill={amber} opacity="0.85" />
      <circle cx="16" cy="21" r="1.4" fill="var(--surface)" />
    </svg>
  );
}

/* ── Marcas de actividad ─────────────────────────────────────────────────
   Estas sí llevan color de fuera: en la pantalla del módulo cada fase tiene
   el suyo, y en el perfil el reto se apaga mientras está bloqueado. */

type MarkP = { size?: number; color?: string };

/** Prueba del módulo: la hoja con el reloj, en el color de la fase */
export function MarkExam({ size = 22, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M6.5 3.5 h13 l6 6 v19 a1.5 1.5 0 0 1-1.5 1.5 h-17.5 a1.5 1.5 0 0 1-1.5-1.5 v-23.5 a1.5 1.5 0 0 1 1.5-1.5 Z"
        fill="none" stroke={color} strokeWidth="1.9" strokeLinejoin="round" />
      <path d="M19.5 3.5 v6 h6" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="20" r="5.6" fill={color} opacity="0.14" />
      <circle cx="16" cy="20" r="5.6" fill="none" stroke={color} strokeWidth="1.9" />
      <path d="M16 16.8 V20 l2.4 1.6" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Práctica real: la brújula del que sale al mundo */
export function MarkCompass({ size = 22, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="12.5" fill={color} opacity="0.12" />
      <circle cx="16" cy="16" r="12.5" fill="none" stroke={color} strokeWidth="1.9" />
      <path d="M16 3.5 v2.6 M16 25.9 v2.6 M3.5 16 h2.6 M25.9 16 h2.6" stroke={color} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M16 8.6 L20 17.2 L16 15.2 L12 17.2 Z" fill={color} />
      <path d="M16 23.4 L12 14.8 L16 16.8 L20 14.8 Z" fill="none" stroke={color} strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

/** Reto: dos plumas cruzadas, versión icono.
 *  El plumón va ESTRECHO y pegado al raquis: probé una hoja ancha y a 28 px
 *  las dos siluetas se juntaban en una mariposa. Aquí la silueta son dos
 *  diagonales finas con la punta partida — se lee como plumas cruzadas. */
export function MarkDuel({ size = 28, color = ink, dim = false }: MarkP & { dim?: boolean }) {
  const q = (flip: boolean) => (
    <g transform={flip ? "scale(-1,1) translate(-32,0)" : undefined} opacity={dim ? 0.5 : 1}>
      {/* raquis entero, del cañón a la punta */}
      <line x1="6.5" y1="25.5" x2="24" y2="8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* plumón: una cinta estrecha a un solo lado */}
      <path d="M13 19 C15.5 14.5 18.5 10.5 23.4 7.6 C22.2 13 19 17.2 14.6 20.6 Z"
        fill={dim ? "none" : color} stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      {/* barbas: las dos muescas que dicen «pluma» y no «hoja» */}
      <path d="M16.4 16.4 L20.4 12.4 M18.6 13.4 L22 10.2" stroke="var(--surface)" strokeWidth="1" strokeLinecap="round" opacity={dim ? 0 : 0.9} />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0 }}>
      {q(false)}
      {q(true)}
    </svg>
  );
}

/** Módulo cerrado: candado de trazo, con el arco algo torcido a propósito */
export function MarkLock({ size = 24, color = "var(--text-3)" }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0 }}>
      {/* el arco BAJA por los dos lados: si la pata derecha falta, el candado se
          lee abierto y dice justo lo contrario de lo que este módulo es */}
      <path d="M10.5 14.5 v-3.6 a5.5 5.5 0 0 1 11 0 v3.6" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="6.5" y="14.5" width="19" height="13" rx="2.6" fill="none" stroke={color} strokeWidth="2.2" />
      <path d="M16 18.6 v4.8" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Título del nivel: el birrete, dibujado como el resto y no como un emoji */
export function MarkCap({ size = 20, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, verticalAlign: "-4px" }}>
      <path d="M2.5 12.5 L16 6.5 L29.5 12.5 L16 18.5 Z" fill="none" stroke={color} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M7.5 15 v6.4 c0 2.4 4 4.1 8.5 4.1 s8.5-1.7 8.5-4.1 V15" fill="none" stroke={color} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M29.5 12.5 v7.4" stroke={amber} strokeWidth="2" strokeLinecap="round" />
      <circle cx="29.5" cy="21.4" r="1.6" fill={amber} />
    </svg>
  );
}

/** «En casa»: el tejado del que ensaya antes de salir */
export function MarkHouse({ size = 17, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, verticalAlign: "-2px" }}>
      <path d="M3.5 15.5 L16 5 L28.5 15.5" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 14 v13.5 h19 V14" fill="none" stroke={color} strokeWidth="2.1" strokeLinejoin="round" />
      <path d="M13 27.5 v-7 h6 v7" fill="none" stroke={amber} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** «En el mundo»: el globo con su meridiano torcido, como los de papel */
export function MarkGlobe({ size = 17, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, verticalAlign: "-2px" }}>
      <circle cx="16" cy="16" r="12.5" fill="none" stroke={color} strokeWidth="2.1" />
      <path d="M3.5 16 h25" stroke={color} strokeWidth="1.8" />
      {/* dos meridianos: con uno solo el globo se leía como un ojo */}
      <path d="M16 3.5 C23 9 23 23 16 28.5 C9 23 9 9 16 3.5 Z" fill="none" stroke={amber} strokeWidth="1.8" />
      <path d="M16 3.5 v25" stroke={amber} strokeWidth="1.4" opacity="0.55" />
    </svg>
  );
}

/** La victoria de la misión.
 *  Aquí había un destello de cuatro puntas, el chispeo de plantilla. Va la
 *  estrella de siete puntas de Seshat, que es nuestra. */
export function MarkSpark({ size = 18, color = "var(--accent)" }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, verticalAlign: "-3px" }}>
      <polygon points={starPoints(16, 16, 13, 5.2)} fill={color} />
      <circle cx="16" cy="16" r="2.4" fill="var(--surface)" />
    </svg>
  );
}

/** Casilla de la lista: marcada a mano, no el círculo relleno del set */
export function MarkCheckBox({ size = 20, color = ink, done = false }: MarkP & { done?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, verticalAlign: "-4px" }}>
      <rect x="4" y="4.5" width="24" height="24" rx="4" fill={done ? amber : "none"} stroke={done ? amber : color} strokeWidth="2.2" opacity={done ? 1 : 0.55} />
      {done && <path d="M10 16.5 L14.5 21 L22.5 11.5" fill="none" stroke="var(--surface)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

/** Oído real: la oreja que escucha sin que se lo escriban.
 *  Antes iba una cabeza con circuitos — el icono con el que se dibuja «robot»
 *  desde 2023, y este ejercicio no tiene nada de robot. */
export function MarkEar({ size = 20, color = ink }: MarkP) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M9.5 13.5 a6.5 6.5 0 0 1 13 -0.3 c0 4-3.6 5.4-4.6 8.2 -0.7 2-0.4 4.2-2.6 5.4 -2.4 1.3-5.2-0.2-5.6-2.6"
        fill="none" stroke={color} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 14.6 a2.6 2.6 0 0 1 5 0.4 c0 1.8-2 2.4-2.4 4.2" fill="none" stroke={amber} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/* ── Banderas dibujadas ───────────────────────────────────────────────────
   Los emojis de bandera (🇩🇪 🇬🇧) son pares de «indicadores regionales» que
   CADA sistema decide cómo pintar… y Windows decidió no pintarlos: ahí salen
   dos letras sueltas, «DE» y «GB», mientras en el móvil se ven perfectas. El
   dueño lo vio en su propia máquina. Dibujadas van igual en todas partes, y de
   paso son nuestras. */

type FlagP = { size?: number; className?: string };

/** Alemania: negro, rojo y oro, con el marco de tinta de la casa */
export function FlagDE({ size = 22, className }: FlagP) {
  const h = Math.round(size * 0.68);
  return (
    <svg width={size} height={h} viewBox="0 0 30 20" className={className} role="img" aria-label="Alemán">
      <rect x="0.7" y="0.7" width="28.6" height="18.6" rx="2.4" fill="#111" />
      <path d="M0.7 7 h28.6 v6 H0.7 Z" fill="#c8102e" />
      <path d="M0.7 13 h28.6 v4.9 a2.4 2.4 0 0 1-2.4 2.4 H3.1 A2.4 2.4 0 0 1 0.7 17.9 Z" fill="#f2b705" />
      <rect x="0.7" y="0.7" width="28.6" height="18.6" rx="2.4" fill="none" stroke="var(--text)" strokeWidth="1.3" opacity="0.75" />
    </svg>
  );
}

/** Reino Unido: la Union Jack, simplificada a lo que se distingue a 22 px */
export function FlagGB({ size = 22, className }: FlagP) {
  const h = Math.round(size * 0.68);
  return (
    <svg width={size} height={h} viewBox="0 0 30 20" className={className} role="img" aria-label="Inglés">
      <defs>
        <clipPath id="gbclip">
          <rect x="0.7" y="0.7" width="28.6" height="18.6" rx="2.4" />
        </clipPath>
      </defs>
      <g clipPath="url(#gbclip)">
        <rect x="0.7" y="0.7" width="28.6" height="18.6" fill="#012169" />
        {/* aspas: el blanco tiene que verse a 22 px, así que va ancho */}
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#fff" strokeWidth="6.5" />
        <path d="M0 0 L30 20 M30 0 L0 20" stroke="#c8102e" strokeWidth="2.2" />
        {/* cruz de San Jorge */}
        <path d="M15 0 v20 M0 10 h30" stroke="#fff" strokeWidth="9" />
        <path d="M15 0 v20 M0 10 h30" stroke="#c8102e" strokeWidth="4.6" />
      </g>
      <rect x="0.7" y="0.7" width="28.6" height="18.6" rx="2.4" fill="none" stroke="var(--text)" strokeWidth="1.3" opacity="0.75" />
    </svg>
  );
}

/** La bandera del idioma por su id — un solo sitio que decidir */
export function LangFlag({ lang, size = 22, className }: FlagP & { lang: string }) {
  return lang === "en" ? <FlagGB size={size} className={className} /> : <FlagDE size={size} className={className} />;
}

/* ── Gráfico de fortalezas ────────────────────────────────────────────────
   Un radar: cinco o seis ejes, uno por destreza o por bloque de temas, y el
   polígono que dibuja tu nivel. Una fila de barras dice lo mismo pero hay que
   leerla entera; la forma se ve de un vistazo — un pico hacia el oído y un
   valle hacia la gramática se reconocen sin leer una sola cifra. */

export interface RadarEje {
  label: string;
  /** 0-100 */
  value: number;
}

export function RadarChart({
  ejes,
  size = 260,
  color = "var(--accent)",
}: {
  ejes: RadarEje[];
  size?: number;
  color?: string;
}) {
  const n = ejes.length;
  if (n < 3) return null;
  const c = size / 2;
  const r = size / 2 - 12;
  // Las etiquetas van FUERA de la telaraña, así que el lienzo se ensancha por
  // los lados en vez de encoger el polígono: al revés, «Gramática» a los lados
  // dejaba una figura diminuta en medio de un mar de blanco.
  const padX = 66;
  const padY = 24;
  const punto = (i: number, frac: number) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [c + Math.cos(a) * r * frac, c + Math.sin(a) * r * frac] as const;
  };
  const poly = (frac: (i: number) => number) =>
    ejes.map((_, i) => punto(i, frac(i)).map((v) => v.toFixed(1)).join(",")).join(" ");

  return (
    <svg
      viewBox={`${-padX} ${-padY} ${size + padX * 2} ${size + padY * 2}`}
      width={size + padX * 2}
      height={size + padY * 2}
      style={{ maxWidth: "100%", height: "auto" }}
      role="img"
      aria-label={`Gráfico de fortalezas: ${ejes.map((e) => `${e.label} ${Math.round(e.value)}%`).join(", ")}`}
    >
      {/* telaraña de fondo: cuatro anillos, que más marean */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <polygon key={f} points={poly(() => f)} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {ejes.map((_, i) => {
        const [x, y] = punto(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}

      {/* tu forma */}
      <polygon
        points={poly((i) => Math.max(0.04, ejes[i].value / 100))}
        fill={color}
        fillOpacity="0.22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {ejes.map((e, i) => {
        const [x, y] = punto(i, Math.max(0.04, e.value / 100));
        return <circle key={i} cx={x} cy={y} r="3.6" fill={color} />;
      })}

      {/* etiquetas: nombre y, debajo, la cifra — el radar se lee de un vistazo,
          pero cuando alguien quiere el número no debería tener que buscarlo */}
      {ejes.map((e, i) => {
        const [x, y] = punto(i, 1.1);
        const anchor = x < c - 8 ? "end" : x > c + 8 ? "start" : "middle";
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} fontSize="12" fontWeight="700" fill="var(--text-2)">
            <tspan x={x} dy="0">{e.label}</tspan>
            <tspan x={x} dy="13" fontSize="11" fontWeight="600" fill="var(--text-3)">{Math.round(e.value)}%</tspan>
          </text>
        );
      })}
    </svg>
  );
}

/** El símbolo que resume cómo va algo: se reconoce sin leer la etiqueta. */
export function MarkStrength({ state, size = 22 }: { state: "fuerte" | "medio" | "flojo"; size?: number }) {
  if (state === "fuerte") {
    // cumbre: lo que ya está conquistado
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flexShrink: 0 }}>
        <path d="M2 19 L9 7 L13 13 L16 8.5 L22 19 Z" fill="none" stroke="var(--ok, #16a34a)"
          strokeWidth="2" strokeLinejoin="round" />
        <path d="M9 7 L11.5 11 L6.5 11 Z" fill="var(--ok, #16a34a)" opacity="0.35" />
      </svg>
    );
  }
  if (state === "medio") {
    // cuesta arriba: se avanza, todavía no se corona
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flexShrink: 0 }}>
        <path d="M2 19 L20 6" fill="none" stroke="var(--warn, #b8860b)" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 6 h6 v6" fill="none" stroke="var(--warn, #b8860b)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  // grieta: por aquí se cae el progreso
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M4 4 L9 10 L6 13 L11 20" fill="none" stroke="var(--err, #b3323e)" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4 L15 10 L18 13 L13 20" fill="none" stroke="var(--err, #b3323e)" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}
