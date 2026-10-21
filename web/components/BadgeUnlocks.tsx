"use client";

// Celebración de medallas recién ganadas — aparece en las pantallas de cierre.

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Badge } from "@/lib/achievements";
import { buzz, celebrate, reducedMotion, SPRING, sfxFanfare } from "@/lib/juice";
import s from "./badge.module.css";

export function BadgeUnlocks({ badges }: { badges: Badge[] }) {
  useEffect(() => {
    if (badges.length > 0) {
      celebrate(true);
      sfxFanfare();
      buzz([30, 60, 30, 60, 30]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badges.length]);

  if (badges.length === 0) return null;

  // El resorte (escala y giro) lo hace motion, no CSS: el global no lo ve, y
  // motion no mira la preferencia si nadie se lo pide. El confeti sigue en
  // celebrate, que ya calla solo para quien pidió calma.
  const quieto = reducedMotion();

  return (
    <div className={s.wrap} role="status">
      <p className={s.heading}>
        {badges.length === 1 ? "¡Medalla nueva en tu expedición!" : "¡Medallas nuevas en tu expedición!"}
      </p>
      <div className={s.row}>
        {badges.map((b, i) => {
          const Icon = b.icon;
          const cuerpo = (
            <>
              <span className={s.icon}><Icon size={30} weight="fill" /></span>
              <span className={s.title} lang={b.lang}>{b.title}</span>
              <span className={s.desc}>{b.desc}</span>
            </>
          );
          if (quieto) {
            return (
              <div key={b.id} className={s.medal}>
                {cuerpo}
              </div>
            );
          }
          return (
            <motion.div
              key={b.id}
              className={s.medal}
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...SPRING, delay: 0.25 + i * 0.18 }}
            >
              {cuerpo}
            </motion.div>
          );
        })}
      </div>
      <Link href="/perfil" className={s.link}>Ver mi expedición →</Link>
    </div>
  );
}
