"use client";

// Matryoshka visual: idioma → nivel → módulo → lección.
// Este cuadro marca SIEMPRE en qué idioma estás — lee el idioma ACTIVO del
// registro (el que adoptó la página en la que estás).

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LangFlag } from "@/components/Art";
import { activeLanguage, getLanguage, LANGUAGES, type LanguageDef } from "@/lib/languages";
import s from "./langbadge.module.css";

export function LangBadge({ compact = false, static: isStatic = false }: { compact?: boolean; static?: boolean }) {
  // La RUTA manda sobre el idioma guardado. Antes esta insignia leía
  // localStorage una sola vez, y `adoptLang` corría después: en /idioma/en salía
  // la bandera alemana, y en /nivel/de-a1 salía «Inglés» — con el agravante de
  // que la insignia es un enlace, así que un clic desde el alemán te sacaba al
  // curso de inglés. Si la URL dice de qué idioma es la pantalla, se le cree.
  const pathname = usePathname() ?? "";
  const fromRoute =
    getLanguage(/^\/idioma\/([a-z]{2})\b/.exec(pathname)?.[1] ?? "") ??
    getLanguage(/^\/nivel\/([a-z]{2})-/.exec(pathname)?.[1] ?? "");
  const [active, setActive] = useState<LanguageDef>(LANGUAGES[0]);
  useEffect(() => setActive(activeLanguage()), [pathname]);
  const def = fromRoute ?? active;

  const inner = (
    <>
      {/* bandera dibujada: los emojis de bandera no existen en Windows */}
      <span className={s.flag} aria-hidden><LangFlag lang={def.id} size={20} /></span>
      {!compact && <span className={s.name}>{def.name}</span>}
    </>
  );
  // en pantallas inmersivas (lección/prueba) la insignia es informativa:
  // un Link aquí tiraría el intento sin la confirmación del botón de salir
  if (isStatic) {
    return (
      <span className={`${s.badge} ${compact ? s.compact : ""}`} aria-label={`Idioma: ${def.name}`}>
        {inner}
      </span>
    );
  }
  return (
    <Link href={`/idioma/${def.id}`} className={`${s.badge} ${compact ? s.compact : ""}`} aria-label={`Idioma: ${def.name} — ir a sus niveles`}>
      {inner}
    </Link>
  );
}
