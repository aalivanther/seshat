"use client";

// Un ejercicio roto (contenido de un drop que escape al validador) NO puede
// tumbar la lección entera: este boundary lo captura y ofrece saltarlo,
// reportándolo como fallo para que la lección siga su curso.

import { Component, type ReactNode } from "react";
import s from "./ex.module.css";

export class ExerciseBoundary extends Component<
  { children: ReactNode; onSkip: () => void },
  { broken: boolean }
> {
  state = { broken: false };

  static getDerivedStateFromError() {
    return { broken: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Ejercicio roto:", error);
  }

  render() {
    if (!this.state.broken) return this.props.children;
    return (
      <div className={`${s.card} ${s.cardEnter}`} role="alert">
        <p className={s.prompt}>Este ejercicio se rompió — sáltalo</p>
        <p className={s.howTo}>
          Algo en esta tarjeta no cargó bien. No es culpa tuya y tu progreso está a salvo:
          salta al siguiente y sigue con la lección.
        </p>
        <div className={s.footer}>
          <span />
          <button className={s.btnPrimary} onClick={this.props.onSkip} autoFocus>
            Saltar este ejercicio
          </button>
        </div>
      </div>
    );
  }
}
