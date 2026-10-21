"use client";

// PREGUNTAR ANTES DE HACER ALGO GORDO, sin el cuadro gris del navegador.
//
// `window.confirm` bloquea el hilo y devuelve un booleano, que es comodísimo de
// escribir. Este hook conserva esa comodidad —`if (await confirm({...}))`— pero
// pinta el diálogo de la casa: mismo idioma, mismos botones, foco en el que no
// destruye y Escape para salir.
//
//   const { confirm, dialog } = useConfirm();
//   …
//   if (!(await confirm({ title: "¿Salir?", body: "…", confirmLabel: "Salir" }))) return;
//   …
//   return (<>{dialog}…</>);

import { useCallback, useRef, useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export interface ConfirmOpts {
  title: string;
  body: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
}

export function useConfirm(): {
  confirm: (o: ConfirmOpts) => Promise<boolean>;
  dialog: React.ReactNode;
} {
  const [opts, setOpts] = useState<ConfirmOpts | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((o: ConfirmOpts) => {
    setOpts(o);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const responder = useCallback((v: boolean) => {
    setOpts(null);
    resolver.current?.(v);
    resolver.current = null;
  }, []);

  const dialog = opts ? (
    <ConfirmDialog
      open
      title={opts.title}
      confirmLabel={opts.confirmLabel}
      cancelLabel={opts.cancelLabel}
      danger={opts.danger}
      onConfirm={() => responder(true)}
      onCancel={() => responder(false)}
    >
      {opts.body}
    </ConfirmDialog>
  ) : null;

  return { confirm, dialog };
}
