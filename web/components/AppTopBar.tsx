"use client";

// Barra superior fija: marca, idioma actual, XP/racha y perfil siempre a mano.
// Se oculta en las pantallas inmersivas (lección, prueba, examen, entrevista,
// repaso, certificado): ahí manda su propia barra de progreso o la impresión.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToolMedal } from "@/components/Art";
import { StreakFlame } from "./Art";
import { Wordmark } from "./Wordmark";
import { getState } from "@/lib/api";
import type { ServerState } from "@/lib/types";
import { LangBadge } from "./LangBadge";
import { ProfilePicker } from "./ProfilePicker";
import { ThemeToggle } from "./ThemeToggle";
import { QuitButton } from "./QuitButton";
import s from "./appbar.module.css";

// Pantallas con su propia barra: si además se pinta esta, salen dos barras y el
// botón «Salir» queda a un dedo en mitad de una run del reto o de una misión.
const IMMERSIVE = ["/lesson/", "/prueba/", "/examen/", "/entrevista", "/review", "/certificado/", "/reto/", "/mision/", "/colocacion"];

export function AppTopBar() {
  const pathname = usePathname();
  const [st, setSt] = useState<ServerState | null>(null);

  const hidden = IMMERSIVE.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (!hidden) getState().then(setSt);
  }, [pathname, hidden]);

  if (hidden) return null;

  const isLanding = pathname === "/";
  const streak = st?.streakDays ?? 0;

  return (
    <div className={s.bar}>
      <Link href="/" className={s.brand} aria-label="Seshat — inicio">
        <Wordmark size="sm" />
      </Link>
      {!isLanding && <LangBadge compact />}
      <span className={s.spacer} />
      <div className={s.chips}>
        {st && (
          <>
            <span className={`${s.chip} ${s.chipInfo}`}>
              <span className={`${s.chipVal} num`}>{st.xp}</span> <span className={s.chipLabel}>XP</span>
            </span>
            <span className={`${s.chip} ${s.chipInfo}`} aria-label={`${streak} días de racha`}>
              <StreakFlame size={15} />
              <span className={`${s.chipVal} num`}>{streak}</span>
            </span>
          </>
        )}
        <Link href="/perfil" className={s.chip} aria-label="Mi expedición">
          <ToolMedal size={16} /> <span className={s.chipLabel}>Expedición</span>
        </Link>
        <ThemeToggle />
        <ProfilePicker />
        <QuitButton compact />
      </div>
    </div>
  );
}
