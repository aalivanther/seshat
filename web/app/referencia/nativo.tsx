"use client";

import { useMemo } from "react";
import { NativoCardView } from "@/components/NativoCard";
import { courseOf } from "@/data/course";
import type { Cefr, NativoCard } from "@/lib/types";
import { useProgress } from "@/lib/useProgress";
import s from "./referencia.module.css";

// Colección Nativo: aparecen al pasar por su lección (coleccionable — refuerza
// competencia). Agrupadas por registro, cada una con sus dos audios.
// Genérica para ambos idiomas: recibe el idioma activo del padre.
export function NativoTab({ level, lang }: { level: Cefr; lang: string }) {
  const { state } = useProgress({ due: false });
  const st = state === "loading" || state === null ? null : state;

  const all = useMemo(() => {
    const out: { card: NativoCard; lessonId: string }[] = [];
    for (const p of courseOf(lang).phases) {
      if ((p.level ?? "a1") !== level) continue;
      for (const l of p.lessons) {
        for (const sec of l.sections) {
          if (sec.kind === "nativo" && sec.nativo) out.push({ card: sec.nativo, lessonId: l.id });
        }
      }
    }
    return out;
  }, [lang, level]);

  const seen = all.filter((c) => st?.lessons?.[c.lessonId]?.completed);
  const pending = all.length - seen.length;
  const groups = ["neutral", "amigos", "jerga", "regional"] as const;
  const GROUP_TITLE: Record<(typeof groups)[number], string> = {
    neutral: "Vale siempre",
    amigos: "Con amigos",
    jerga: "Jerga",
    regional: "De una zona",
  };

  if (all.length === 0) {
    return (
      <section>
        <h2 className={s.groupTitle}>Nativo — cómo se habla de verdad</h2>
        <p className={s.verbEs}>Este nivel aún no tiene tarjetas Nativo. Llegarán con su próxima actualización.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className={s.groupTitle}>Nativo — cómo se habla de verdad</h2>
      <p className={s.verbEs}>
        Tu colección: cada tarjeta aparece al pasar por su lección.
        {pending > 0 ? ` Te faltan ${pending} por descubrir.` : " ¡Las tienes todas!"}
      </p>
      {seen.length === 0 && (
        <p className={s.verbEs} style={{ marginTop: 8 }}>
          Aún no has descubierto ninguna — sigue con las lecciones y aquí se irán coleccionando.
        </p>
      )}
      {groups.map((g) => {
        const cards = seen.filter((c) => c.card.register === g);
        if (!cards.length) return null;
        return (
          <div key={g} style={{ marginTop: 18 }}>
            <h3 className={s.groupTitle} style={{ fontSize: "1.02rem" }}>{GROUP_TITLE[g]}</h3>
            <div className={s.verbGrid}>
              {cards.map(({ card }) => (
                <NativoCardView key={card.id} card={card} compact />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
