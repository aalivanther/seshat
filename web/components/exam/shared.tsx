"use client";

// El pie lo usan todos los ítems. Si se quedara en ExamPlayer, el ítem que
// vive en su fichero importaría al player y el player al ítem.

import s from "../exam.module.css";

export function NextBtn({ ready, onNext, onBlank }: { ready: boolean; onNext: () => void; onBlank?: () => void }) {
  return (
    <div className={s.footer}>
      {onBlank && !ready ? (
        <button className={s.btnGhost} onClick={onBlank} title="En el examen real puedes dejar en blanco — cuenta como fallo">
          Dejar en blanco
        </button>
      ) : (
        <span />
      )}
      <button className={s.btnPrimary} disabled={!ready} onClick={onNext}>Continuar</button>
    </div>
  );
}
