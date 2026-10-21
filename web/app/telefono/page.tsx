"use client";

// "En tu teléfono" (AP15): la promesa LAN hecha pantalla — URL grande + QR.
// QR con IP numérica: funciona siempre (mDNS en Android no es fiable).

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import QRCode from "qrcode";
import { CaretDown, DeviceMobile, WifiHigh, Warning } from "@phosphor-icons/react";
import { getLanInfo } from "@/lib/api";
import { activeLanguage, getActiveLang, LANGUAGES, type LanguageDef } from "@/lib/languages";
import hub from "@/components/hub.module.css";

type PhoneUrl = { url: string; iface: string; likely: boolean };

export default function PhonePage() {
  const [urls, setUrls] = useState<PhoneUrl[] | null>(null);
  const [qrs, setQrs] = useState<Record<string, string>>({});
  // la miga vuelve al idioma que estás estudiando; se lee tras montar porque
  // el idioma activo vive en localStorage (el HTML estático no lo conoce)
  const [lang, setLang] = useState<LanguageDef>(LANGUAGES[0]);
  useEffect(() => setLang(activeLanguage()), []);

  // El QR se genera BAJO DEMANDA: con Docker, VPN o Wi-Fi + Ethernet a la vez
  // esto podían ser tres o cuatro códigos de golpe, todos del mismo peso
  // visual — la acción principal competía con señuelos idénticos (PLAN 1.9.8
  // §7). Solo el primero probable lo pide solo; el resto, si alguien abre su
  // fila. La lista evita pedirlo dos veces por la misma dirección.
  const pedidos = useRef<Set<string>>(new Set());
  function pedirQr(url: string) {
    if (pedidos.current.has(url)) return;
    pedidos.current.add(url);
    QRCode.toDataURL(url, { width: 260, margin: 1, color: { dark: "#33302b", light: "#fbf7f0" } })
      .then((data) => setQrs((q) => ({ ...q, [url]: data })))
      .catch(() => pedidos.current.delete(url));
  }

  useEffect(() => {
    getLanInfo().then((info) => {
      if (!info) {
        setUrls([]);
        return;
      }
      // el puerto del MÓVIL es el de la UI actual (misma app que estás viendo)
      const uiPort = window.location.port || "80";
      // La llave viaja DENTRO del QR: desde la red local, Seshat solo abre para
      // quien entra por aquí. Así compartir wifi con medio edificio deja de
      // significar que cualquiera puede abrir —y cambiar— tu progreso. El móvil
      // la guarda en una cookie: solo hace falta escanear una vez.
      // El QR lleva también el idioma que estudias. Un teléfono recién
      // emparejado tiene su propio ajuste, así que aterrizaba en alemán aunque
      // estuvieras con el inglés: la libreta y el repaso le salían del curso
      // equivocado sin que nadie entendiera por qué.
      const params = new URLSearchParams();
      if (info.key) params.set("k", info.key);
      params.set("lang", getActiveLang());
      const key = `/?${params.toString()}`;
      // Con Docker o una VPN instalados aparecían tres o cuatro QR sin decir cuál
      // era el bueno. El motor manda ahora la interfaz de cada dirección: se
      // enseñan primero las de red normal y las virtuales quedan avisadas.
      const addrs = info.addrs?.length
        ? info.addrs
        : info.ips.map((ip) => ({ ip, iface: "", likely: true }));
      const list = addrs.map((a) => ({
        url: `http://${a.ip}:${uiPort}${key}`,
        iface: a.iface,
        likely: a.likely,
      }));
      setUrls(list);
      if (list.length) pedirQr((list.find((u) => u.likely) ?? list[0]).url);
    });
  }, []);

  const primary = urls?.length ? (urls.find((u) => u.likely) ?? urls[0]) : null;
  const otras = primary ? (urls ?? []).filter((u) => u.url !== primary.url) : [];

  return (
    <main className={hub.wrap}>
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang.id}`}>{lang.name}</Link> <span>/</span> <span>En tu teléfono</span>
      </nav>
      <h1 className={hub.title}>
        <DeviceMobile size={30} weight="duotone" style={{ verticalAlign: "-5px" }} aria-hidden /> En tu teléfono
      </h1>
      <p className={hub.subtitle}>
        Seshat funciona en cualquier dispositivo de tu red: escanea el QR con la cámara del
        teléfono (misma red Wi-Fi) y estudia desde ahí — cada persona con su perfil. El enlace
        del código lleva la llave de tu Seshat: por eso hay que escanearlo una vez en cada
        dispositivo, y por eso nadie más de tu wifi puede entrar escribiendo la dirección.
      </p>

      {urls === null && <p style={{ color: "var(--text-3)" }}>Buscando tu red…</p>}

      {urls !== null && urls.length === 0 && (
        <div className={hub.warnBanner}>
          <Warning size={18} weight="duotone" style={{ verticalAlign: "-3px" }} aria-hidden /> No
          encuentro una red local. Conecta esta máquina a tu Wi-Fi y recarga — o puede que el
          cortafuegos esté bloqueando la app.
        </div>
      )}

      {primary && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 16 }}>
          <div
            style={{
              border: "2px solid var(--border-strong)",
              borderRadius: "19px 15px 20px 16px",
              boxShadow: "4px 5px 0 rgba(211,196,171,.45)",
              background: "var(--surface)",
              padding: 24,
              textAlign: "center",
            }}
          >
            {qrs[primary.url] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrs[primary.url]}
                alt={`QR para ${primary.url.split("/?k=")[0]}`}
                width={260}
                height={260}
                style={{ borderRadius: 12 }}
              />
            ) : (
              <div style={{ width: 260, height: 260, background: "var(--panel)", borderRadius: 12 }} />
            )}
            {/* la dirección se enseña SIN la llave: es un churro de 24 letras que
                nadie va a teclear, y enseñarlo invita a mandar la captura por
                WhatsApp con la llave dentro. Quien la necesita es la cámara. */}
            <p
              className="num"
              style={{ fontWeight: 800, fontSize: "1.1rem", marginTop: 14 }}
              aria-label={`Dirección ${primary.url.split("/?k=")[0]}`}
            >
              {primary.url.split("/?k=")[0]}
            </p>
            {/* si no había NINGUNA dirección probable, la primera que se enseña
                aquí puede ser virtual: el aviso ya existente avisa igual */}
            {!primary.likely && primary.iface && (
              <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", marginTop: 4 }}>
                {`red virtual «${primary.iface}» — por aquí normalmente NO se llega desde el móvil`}
              </p>
            )}
          </div>

          {otras.length > 0 && (
            <details style={{ marginTop: 18, width: "100%", maxWidth: 420 }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "var(--text-2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  justifyContent: "center",
                }}
              >
                <CaretDown size={16} weight="bold" aria-hidden /> ¿No funciona? Prueba con otra red
              </summary>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
                {otras.map((u) => (
                  <OtraDireccion key={u.url} u={u} qr={qrs[u.url]} onPedirQr={() => pedirQr(u.url)} />
                ))}
              </div>
            </details>
          )}
        </div>
      )}

      <div style={{ marginTop: 28, color: "var(--text-2)", maxWidth: "62ch", lineHeight: 1.6 }}>
        <p>
          <WifiHigh size={18} weight="duotone" style={{ verticalAlign: "-3px" }} aria-hidden />{" "}
          <b>Si el teléfono no conecta:</b> ambos deben estar en la MISMA red; en Windows, la
          primera vez el sistema pregunta si permites la red — si se canceló, hay que permitir la
          app en el cortafuegos; y algunas redes de hotel u oficina aíslan los dispositivos entre
          sí (ahí no hay manera — usa tu red de casa o compartir internet del móvil).
        </p>
        <p style={{ marginTop: 10 }}>
          Esta máquina debe seguir encendida y despierta mientras estudias desde el teléfono.
        </p>
      </div>
    </main>
  );
}

/** Una dirección alternativa dentro del desplegable: en texto, sin QR propio
 *  —ni siquiera generado— hasta que el alumno pide verlo (PLAN 1.9.8 §7). */
function OtraDireccion({ u, qr, onPedirQr }: { u: PhoneUrl; qr: string | undefined; onPedirQr: () => void }) {
  const [abierto, setAbierto] = useState(false);
  const clean = u.url.split("/?k=")[0];
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 12 }}>
      <p className="num" style={{ fontWeight: 700 }} aria-label={`Dirección ${clean}`}>
        {clean}
      </p>
      {u.iface && (
        <p style={{ fontSize: "0.8125rem", color: "var(--text-3)", marginTop: 2 }}>
          {u.likely
            ? `red «${u.iface}»`
            : `red virtual «${u.iface}» — por aquí normalmente NO se llega desde el móvil`}
        </p>
      )}
      {!abierto ? (
        <button
          type="button"
          onClick={() => {
            setAbierto(true);
            onPedirQr();
          }}
          style={{
            marginTop: 8,
            background: "none",
            border: "1px solid var(--border-strong)",
            borderRadius: 8,
            padding: "4px 10px",
            cursor: "pointer",
            fontSize: "0.85rem",
            color: "var(--text-2)",
          }}
        >
          Mostrar código QR
        </button>
      ) : qr ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qr} alt={`QR para ${clean}`} width={160} height={160} style={{ borderRadius: 10, marginTop: 8 }} />
      ) : (
        <div style={{ width: 160, height: 160, background: "var(--panel)", borderRadius: 10, marginTop: 8 }} />
      )}
    </div>
  );
}
