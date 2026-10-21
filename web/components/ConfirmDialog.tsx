"use client";

// EL DIÁLOGO DE LA CASA — el que sustituye a `window.confirm`.
//
// El confirm del navegador es de otra época y de otra aplicación: tipografía del
// sistema, botones en inglés según el idioma del navegador, y encima aparece
// pegado al borde superior con el nombre del host. En una app que se ha dibujado
// hasta las banderas, ese cuadro gris canta más que cualquier otra cosa.
//
// Reglas que sigue, y que conviene no romper:
//   · el botón que NO destruye va primero y es el que tiene el foco al abrir;
//   · el destructivo nunca es el primario, y dice lo que hace («Borrar», no «Sí»);
//   · Escape y clic en el velo cancelan — nunca confirman;
//   · el foco queda atrapado dentro mientras está abierto y vuelve a su sitio
//     al cerrarse, que es lo que espera quien navega con teclado.

import { useCallback, useEffect, useRef } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  /** el cuerpo: una o dos frases, en cristiano */
  children: React.ReactNode;
  /** texto del botón que ACTÚA; que diga el verbo, no «Sí» */
  confirmLabel: string;
  cancelLabel?: string;
  /** true cuando lo que se hace no tiene vuelta atrás */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel = "Cancelar",
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const antes = useRef<HTMLElement | null>(null);

  const cerrar = useCallback(() => onCancel(), [onCancel]);

  useEffect(() => {
    if (!open) return;
    antes.current = document.activeElement as HTMLElement | null;
    // el foco arranca en «Cancelar»: un Enter por inercia no destruye nada
    cancelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        cerrar();
        return;
      }
      if (e.key !== "Tab") return;
      // trampa de foco: el tabulador no se sale del diálogo
      const focusables = cardRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    // la página de detrás no se desplaza mientras hay un diálogo delante
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      antes.current?.focus?.();
    };
  }, [open, cerrar]);

  if (!open) return null;

  return (
    // La tarjeta va DENTRO del velo, que es quien la centra (position: fixed +
    // place-items: center). Como hermanos, la tarjeta se quedaba en el flujo de
    // la página: aparecía al final del contenido y con el velo tapándola. Eso
    // era lo de «malos posicionamientos de los overlays».
    <div className="dialogVeil" onClick={cerrar}>
      <div
        className="dialogCard"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dlg-title"
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="dialogTitle" id="dlg-title">
          {title}
        </h2>
        <div className="dialogText">{children}</div>
        <div className="dialogActions">
          <button className="dialogBtn" ref={cancelRef} onClick={cerrar}>
            {cancelLabel}
          </button>
          <button
            className={danger ? "dialogBtn dialogBtnDanger" : "dialogBtn dialogBtnPrimary"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
