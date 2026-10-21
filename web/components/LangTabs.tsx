"use client";

// EL SELECTOR DE IDIOMA DEL PERFIL.
//
// Quien estudia alemán e inglés tenía las dos expediciones revueltas en la
// misma pantalla: treinta medallas alemanas y cuatro inglesas seguidas, los
// certificados de los dos cursos en la misma lista y una cuenta de «medallas»
// que no era de ninguno de los dos. Con esto, la carpeta entera —medallas,
// retos, certificados y diagnóstico— habla de un idioma cada vez.

import { courses } from "@/data/course";
import { LANGUAGES } from "@/lib/languages";
import s from "./langtabs.module.css";

/** Los idiomas que EXISTEN como curso en este build. El registro puede
 *  anunciar más de los que trae el drop instalado. */
export function idiomasConCurso() {
  return LANGUAGES.filter((l) => courses[l.id]?.phases?.length);
}

export function LangTabs({
  value,
  onChange,
  nota,
}: {
  value: string;
  onChange: (id: string) => void;
  /** apunte corto bajo el nombre (el nivel de la prueba, p. ej.) */
  nota?: (langId: string) => string | undefined;
}) {
  const idiomas = idiomasConCurso();
  if (idiomas.length < 2) return null; // con un solo curso, elegir no es elegir

  return (
    <div className={s.langTabs} role="tablist" aria-label="Idioma">
      {idiomas.map((l) => {
        const n = nota?.(l.id);
        return (
          <button
            key={l.id}
            role="tab"
            aria-selected={l.id === value}
            className={`${s.langTab} ${l.id === value ? s.langTabOn : ""}`}
            onClick={() => onChange(l.id)}
            style={l.id === value ? { borderColor: colorDe(l.id), color: colorDe(l.id) } : undefined}
          >
            {l.name}
            {n && <span className={s.nota}>{n}</span>}
          </button>
        );
      })}
    </div>
  );
}

/** El idioma no trae color propio: se toma prestado el de su primer módulo,
 *  que es el que el alumno ya asocia a ese curso. */
export function colorDe(id: string): string {
  return courses[id]?.phases?.[0]?.color ?? "var(--accent)";
}
