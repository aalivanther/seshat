"use client";

// LOGOTIPO DE SESHAT — dibujado a mano, punto por punto.
//
// Seshat es la diosa egipcia de la escritura, la medida y los archivos. Su
// emblema real no es "una estrella": es una **roseta de siete puntas sobre un
// tallo, coronada por un arco invertido** — ese arco es lo que la distingue de
// cualquier otra estrella y lo que hace la marca reconocible.
//
// Las coordenadas de abajo están escritas a mano, no generadas con senos y
// cosenos. Las puntas NO son perfectamente regulares: la de arriba es algo más
// larga, las inferiores un pelo más cortas, y el tallo se estrecha al bajar.
// Esa irregularidad deliberada es lo que separa un logotipo dibujado de una
// figura calculada — la simetría matemática perfecta se nota, y se nota mal.

/** El emblema: roseta de siete puntas, tallo y arco. */
export function SeshatStar({
  size = 22,
  color = "var(--accent)",
  hollow = "var(--surface)",
}: {
  size?: number;
  color?: string;
  hollow?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden style={{ flexShrink: 0, overflow: "visible" }}>
      {/* Tallo: se estrecha hacia abajo, como un junco. No es un rectángulo. */}
      <path d="M14.8 21.5 L17.2 21.5 L16.7 31 Q16 31.8 15.3 31 Z" fill={color} />

      {/* Roseta de siete puntas, centrada en (16, 19) y con las puntas
          escritas a mano: la de arriba sobresale un poco más que sus vecinas,
          y las dos de abajo se recogen. Nada de senos y cosenos. */}
      <path
        d="M16 8.4
           L18.4 15.1 L24.9 12.1 L21.8 18.1
           L28.6 19.4 L21.9 22.0 L25.4 27.4
           L18.9 25.6 L17.6 31.0 L16 26.4
           L14.2 30.6 L13.2 25.4 L6.9 27.0
           L10.4 21.8 L3.6 19.2 L10.3 18.0
           L7.3 11.9 L13.7 15.0 Z"
        fill={color}
        strokeLinejoin="round"
      />

      {/* El arco invertido que corona el emblema — el rasgo que dice
          «Seshat» y no «una estrella cualquiera». Va claramente POR ENCIMA de
          la roseta, con las puntas cayendo a los lados. */}
      <path
        d="M6.4 8.2 Q16 -1.6 25.6 8.0"
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Ojo central hueco: da aire a la roseta y deja respirar el trazo. */}
      <circle cx="16" cy="19" r="2.6" fill={hollow} />
    </svg>
  );
}

/** Trazo de pincel bajo el nombre — un path dibujado, no un degradado CSS:
 *  entra grueso, se levanta al final y deja el papel a la vista. */
function BrushStroke({ width, height }: { width: number; height: number }) {
  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 200 10"
      preserveAspectRatio="none"
      aria-hidden
      style={{ position: "absolute", left: 0, bottom: 0, width, maxWidth: "100%" }}
    >
      <path
        d="M2 6.6 C34 3.4, 62 3.0, 96 4.2 C130 5.4, 158 4.0, 190 2.6
           C176 6.2, 140 7.4, 98 7.0 C60 6.6, 30 7.4, 2 6.6 Z"
        fill="var(--accent)"
        opacity="0.92"
      />
      {/* la cola: el pincel se levanta y el trazo se rompe */}
      <path d="M191 2.8 C195 2.6, 197 3.2, 199 3.8 C196 4.0, 193 3.6, 191 3.4 Z" fill="var(--accent)" opacity="0.55" />
    </svg>
  );
}

export function Wordmark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const px = size === "lg" ? 44 : size === "md" ? 24 : 19;
  const star = size === "lg" ? 42 : size === "md" ? 23 : 19;
  const stroke = size === "lg" ? 9 : size === "md" ? 6 : 5;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "lg" ? 13 : 8,
        lineHeight: 1,
      }}
    >
      <SeshatStar size={star} />
      <span
        style={{
          position: "relative",
          fontFamily: "var(--font-hand)",
          fontWeight: 800,
          fontSize: px,
          letterSpacing: "-0.015em",
          color: "var(--text)",
          paddingBottom: size === "lg" ? 8 : 5,
          display: "inline-block",
        }}
      >
        Se<span style={{ color: "var(--accent-text)" }}>sh</span>at
        <BrushStroke width={px * 3.1} height={stroke} />
      </span>
    </span>
  );
}
