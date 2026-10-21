"use client";

// "En tu teléfono" EN LA DEMO WEB.
//
// En la app de escritorio esta pantalla enseña un QR con la dirección del
// ordenador en la red local y la llave de emparejamiento: el móvil abre la
// misma Seshat y estudia con su perfil. Todo eso lo da el binario Go (lee las
// interfaces de red y guarda la llave). La demo es una página estática sin
// motor local, así que aquí se cuenta qué hace la función y por qué no está,
// en vez de inventar una dirección o un QR que no llevarían a ninguna parte.

import { useEffect, useState } from "react";
import Link from "next/link";
import { DeviceMobile, Info } from "@phosphor-icons/react";
import { activeLanguage, LANGUAGES, type LanguageDef } from "@/lib/languages";
import hub from "@/components/hub.module.css";

export default function PhonePage() {
  // el idioma activo vive en localStorage: se lee tras montar
  const [lang, setLang] = useState<LanguageDef>(LANGUAGES[0]);
  useEffect(() => setLang(activeLanguage()), []);

  return (
    <main className={hub.wrap}>
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang.id}`}>{lang.name}</Link> <span>/</span> <span>En tu teléfono</span>
      </nav>
      <h1 className={hub.title}>
        <DeviceMobile size={30} weight="duotone" style={{ verticalAlign: "-5px" }} aria-hidden /> En tu teléfono
      </h1>
      <p className={hub.subtitle}>
        En la aplicación de escritorio, Seshat funciona en cualquier dispositivo de tu red: el
        ordenador enseña aquí un código QR, lo escaneas con la cámara del teléfono (misma red
        Wi-Fi) y estudias desde ahí, cada persona con su perfil.
      </p>

      <div className={hub.warnBanner} role="note">
        <Info size={18} weight="duotone" style={{ verticalAlign: "-3px" }} aria-hidden />{" "}
        <b>No disponible en esta demo.</b> El QR lo genera el motor de la aplicación instalada, que
        conoce la dirección de tu ordenador en la red local y guarda la llave de emparejamiento.
        Esta demo es una página web sin motor detrás: no hay ordenador al que conectar el móvil.
      </div>

      <div style={{ marginTop: 22, color: "var(--text-2)", maxWidth: "62ch", lineHeight: 1.6 }}>
        <p>
          Puedes abrir esta misma demo en el navegador del teléfono y probar el curso desde ahí. Lo
          que hagas se guarda solo en ese navegador: cada dispositivo lleva su propio progreso y no
          se sincroniza con ningún otro.
        </p>
      </div>
    </main>
  );
}
