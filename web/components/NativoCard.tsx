"use client";

// Tarjeta NATIVO: el contraste libro↔calle que SE OYE (spec en PLAN.md).
// A1 es receptivo puro — el encuadre "no necesitas decirlo" es parte del
// diseño (gestionar la expectativa ES instrucción pragmática).

import type { NativoCard as Card } from "@/lib/types";
import { langConfig } from "@/lib/language";
import { Speaker } from "./Speaker";
import s from "./nativo.module.css";

const REGISTER_LABEL: Record<Card["register"], string> = {
  amigos: "con amigos",
  neutral: "vale siempre",
  jerga: "jerga",
  regional: "de una zona",
};

export function NativoCardView({ card, compact = false }: { card: Card; compact?: boolean }) {
  return (
    <div className={`${s.card} ${compact ? s.compact : ""}`}>
      <div className={s.head}>
        <span className={s.brand}>Nativo · para tu oído</span>
        <span className={s.register}>{REGISTER_LABEL[card.register]}</span>
      </div>

      <div className={s.row}>
        <span className={s.tag}>el libro dice</span>
        <span className={s.text} lang={langConfig().htmlLang}>{card.book}</span>
        <Speaker text={card.book} label="" ariaLabel={`Escuchar: ${card.book}`} />
      </div>
      <div className={`${s.row} ${s.rowReal}`}>
        <span className={s.tag}>en la calle</span>
        <span className={`${s.text} ${s.textReal}`} lang={langConfig().htmlLang}>{card.real}</span>
        <Speaker text={card.real} label="" ariaLabel={`Escuchar: ${card.real}`} />
      </div>

      {card.exam && (
        <div className={`${s.row} ${s.rowExam}`}>
          <span className={s.tag}>en el examen</span>
          <span className={`${s.text} ${s.textExam}`} lang={langConfig().htmlLang}>{card.exam}</span>
          <Speaker text={card.exam} label="" ariaLabel={`Escuchar: ${card.exam}`} />
        </div>
      )}

      {card.sound && <p className={s.sound}>suena como: {card.sound}</p>}
      <p className={s.meaning}>{card.meaning}</p>
      <p className={s.when}>
        <b>¿Cuándo?</b> {card.when}
      </p>
      {card.note && <p className={s.note}>{card.note}</p>}
      {!compact && card.level === "a1" && !card.produce && (
        <p className={s.promise}>
          Esto existe y lo vas a oír. Con reconocerlo basta — <b>no necesitas decirlo</b>.
        </p>
      )}
      {!compact && card.produce && (
        <p className={s.promise}>
          Esta sí la <b>usas tú</b>: no basta con reconocerla. En el examen cuenta la de
          {card.exam ? " «en el examen»" : " la calle, con cuidado"}.
        </p>
      )}
    </div>
  );
}
