"use client";

// Hoja rota: el error boundary de la app, con la estética de la libreta y sin
// jerga — nunca la pantalla genérica del framework en inglés.

export default function Error({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "64px 16px", textAlign: "center" }}>
      <p style={{ fontSize: "2.6rem", fontFamily: "var(--font-hand)", fontWeight: 800, color: "var(--accent-text)" }}>
        Se rompió una hoja
      </p>
      <p style={{ color: "var(--text-2)", marginTop: 12, lineHeight: 1.6 }}>
        Algo falló al pintar esta pantalla. No es culpa tuya y tu progreso está a salvo —
        vuelve a cargarla y sigue donde estabas.
      </p>
      <div style={{ marginTop: 24 }}>
        <button
          onClick={() => reset()}
          style={{
            display: "inline-block",
            padding: "12px 24px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            borderRadius: "var(--radius-hand)",
            background: "var(--accent)",
            color: "var(--accent-contrast)",
            fontWeight: 700,
            fontFamily: "var(--font-hand)",
            boxShadow: "var(--shadow-btn)",
          }}
        >
          Recargar
        </button>
      </div>
    </main>
  );
}
