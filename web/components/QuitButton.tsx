"use client";

// "Salir de Seshat" — el cierre de una app de escritorio, dentro de la app.
// Seshat corre como un servidor local sin ventana propia: en Windows el
// proceso no tiene consola y en macOS vive fuera del Dock, así que sin este
// botón la única salida sería el administrador de tareas. Aquí se apaga el
// motor, se guarda todo y se dice claramente que la pestaña ya se puede cerrar.

import { useEffect, useRef, useState } from "react";
import { Power } from "@phosphor-icons/react";
import { quitApp } from "@/lib/api";
import s from "./quit.module.css";

export function QuitButton({ compact = false }: { compact?: boolean }) {
  const [phase, setPhase] = useState<"idle" | "ask" | "closing" | "closed">("idle");
  // Desde un móvil de la red local, apagar el motor dejaría a oscuras a quien
  // está estudiando en el ordenador. El backend ya lo rechaza (solo acepta
  // /api/quit desde la propia máquina); aquí ni se ofrece, para no enseñar un
  // botón que va a fallar. `null` mientras no se sabe: el HTML pregenerado no
  // puede decidirlo, y pintarlo y quitarlo después sería un parpadeo.
  const [onThisMachine, setOnThisMachine] = useState<boolean | null>(null);
  useEffect(() => {
    const h = window.location.hostname;
    setOnThisMachine(h === "localhost" || h === "127.0.0.1" || h === "::1" || h === "[::1]");
  }, []);

  // La pregunta ya no vive en la fila de chips: es un cuadro centrado con velo,
  // y lo que es un modal se comporta como un modal — Escape y clic fuera lo
  // cierran, y el foco arranca en «Seguir», que es el botón que no apaga nada.
  const askRef = useRef<HTMLSpanElement>(null);
  const seguirRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (phase !== "ask") return;
    seguirRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setPhase("idle");
      }
    };
    const fuera = (e: PointerEvent) => {
      if (e.target instanceof Node && !askRef.current?.contains(e.target)) setPhase("idle");
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", fuera);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", fuera);
    };
  }, [phase]);

  async function doQuit() {
    setPhase("closing");
    await quitApp();
    setPhase("closed");
  }

  if (phase === "closed") {
    return (
      <div className={s.closedOverlay} role="status">
        <div className={s.closedCard}>
          <h2 className={s.closedTitle}>Hasta la próxima</h2>
          <p className={s.closedText}>
            Seshat está apagada y tu progreso, guardado. Ya puedes cerrar esta pestaña.
          </p>
          <p className={s.closedHint}>
            Para volver, abre Seshat como cualquier otra aplicación.
          </p>
        </div>
      </div>
    );
  }

  // mientras no se sabe (HTML pregenerado), no se pinta: más vale que aparezca
  // medio segundo tarde en el ordenador que enseñar en el móvil un botón muerto
  if (onThisMachine !== true && phase === "idle") return null;

  if (phase === "ask") {
    return (
      <span className={s.ask} ref={askRef} role="alertdialog" aria-modal="true" aria-label="¿Cerrar Seshat?">
        <span className={s.askText}>¿Cerrar Seshat?</span>
        <button className={s.confirm} onClick={doQuit}>Sí, salir</button>
        <button className={s.cancel} ref={seguirRef} onClick={() => setPhase("idle")}>Seguir</button>
      </span>
    );
  }

  return (
    <button
      className={`${s.btn} ${compact ? s.compact : ""}`}
      onClick={() => setPhase("ask")}
      disabled={phase === "closing"}
      aria-label="Salir de Seshat"
      title="Cierra la aplicación por completo"
    >
      <Power size={16} weight="bold" aria-hidden />
      {!compact && <span>{phase === "closing" ? "Cerrando…" : "Salir"}</span>}
    </button>
  );
}
