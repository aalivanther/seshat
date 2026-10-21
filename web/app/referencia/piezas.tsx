"use client";

// El par ❌ / ✓ lo comparten el A2 y el B1 ingleses. No es una libreta:
// si cada nivel se queda su copia, una de las dos envejece sola.

import s from "./referencia.module.css";

/** ❌ / ✓ — el par que resuelve la duda en una línea, que es justo lo que se
 *  viene a buscar cuando se abre la libreta a medio escribir un mensaje. */
export function EnA2WrongRight({ wrong, right, why }: { wrong: string; right: string; why?: string }) {
  return (
    <>
      <p className={s.example} style={{ marginTop: 0 }}>
        <span style={{ color: "var(--err)" }}>❌ <span lang="en">{wrong}</span></span>
        <br />
        <span lang="en" className="marker">✓ {right}</span>
      </p>
      {why ? <p className={`${s.trap} hand`}>{why}</p> : null}
    </>
  );
}
