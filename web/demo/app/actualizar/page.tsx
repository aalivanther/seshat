"use client";

// ACTUALIZAR SESHAT EN LA DEMO WEB.
//
// En la app de escritorio, el paquete del mes (.seshatpack) se sube al motor,
// que lo descomprime junto a los perfiles y sirve el contenido nuevo; volver
// atrás es un botón. La demo del portafolio es un export estático: no hay
// motor que reciba el paquete ni carpeta donde descomprimirlo, y su contenido
// es el que se compiló. Esta pantalla lo dice y enseña qué versión es, sin
// ofrecer un botón que no podría hacer nada.

import Link from "next/link";
import { useEffect, useState } from "react";
import { MarkCap } from "@/components/Art";
import { getVersion } from "@/lib/api";
import { getActiveLang } from "@/lib/languages";
import hub from "@/components/hub.module.css";
import s from "@/app/actualizar/update.module.css";

export default function UpdatePage() {
  const [app, setApp] = useState("");
  const [drop, setDrop] = useState("");
  const [lang, setLang] = useState("de");

  useEffect(() => {
    setLang(getActiveLang());
    void getVersion().then((v) => {
      if (!v) return;
      setApp(v.app);
      setDrop(v.content);
    });
  }, []);

  return (
    <main className={hub.wrap}>
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang}`}>Curso</Link> <span>/</span>{" "}
        <Link href="/perfil">Mi expedición</Link> <span>/</span> <span>Actualizar</span>
      </nav>

      <h1 className={hub.title}>
        <MarkCap size={26} /> Actualizar Seshat
      </h1>
      <p className={hub.subtitle}>
        En la aplicación de escritorio, cada drop llega como un archivo <b>.seshatpack</b>: se carga
        aquí y la aplicación se actualiza sola, sin reinstalar nada y sin tocar tu progreso.
      </p>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Lo que tienes ahora</h2>
        <p className={s.line}>
          Versión <b className="num">{app || "…"}</b> · contenido del drop <b className="num">{drop || "…"}</b>
        </p>
      </section>

      <section className={s.card}>
        <h2 className={s.cardTitle}>Instalar el paquete del mes</h2>
        <p className={s.line}>
          <b>No disponible en esta demo.</b> Instalar un paquete lo hace el motor de la aplicación
          instalada, que guarda el contenido nuevo en tu ordenador. Esta demo es una página web sin
          motor detrás: trae el contenido con el que se publicó y no puede recibir paquetes.
        </p>
      </section>
    </main>
  );
}
