"use client";

// Último paracaídas: si hasta el layout raíz se rompe, esta página sustituye
// TODO el documento (por eso lleva su propio <html>/<body>). Aquí los tokens y
// las fuentes del layout pueden no existir — colores de la libreta en duro.

export default function GlobalError({
  error, reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: "#fbf7f0", color: "#33302b", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 560, margin: "0 auto", padding: "80px 16px", textAlign: "center" }}>
          <p style={{ fontSize: "2.6rem", fontFamily: "'Comic Sans MS', 'Segoe Print', cursive, sans-serif", fontWeight: 800, color: "#8a4a08", margin: 0 }}>
            Se rompió una hoja
          </p>
          <p style={{ color: "#5f594f", marginTop: 14, lineHeight: 1.6 }}>
            Algo falló al abrir el cuaderno. No es culpa tuya y tu progreso está a salvo —
            vuelve a cargar la app y sigue donde estabas.
          </p>
          <div style={{ marginTop: 26 }}>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-block",
                padding: "12px 24px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                borderRadius: "13px 11px 14px 12px" /* literal a propósito: esta pantalla reemplaza el documento entero y NO carga globals.css, así que aquí no hay tokens */,
                background: "#b45309",
                color: "#ffffff",
                fontWeight: 700,
                boxShadow: "inset 0 2px 0 rgba(255,255,255,.25), 0 4px 0 #92400e",
              }}
            >
              Recargar
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
