"use client";

// LATIDO — le dice al motor que sigues ahí.
//
// Seshat se apaga sola tras una hora sin señales de vida, para no dejar un
// proceso invisible corriendo días en el portátil de nadie (en Windows no hay
// ventana que cerrar). Pero "sin señales" no puede significar "sin hacer clic":
// leer una lección larga o pensar una redacción son minutos de silencio
// legítimo. Este latido marca la diferencia entre estar leyendo y haberse ido.
//
// Solo late con la pestaña VISIBLE: una pestaña en segundo plano olvidada
// durante un fin de semana no debe mantener la app despierta.

import { useEffect, useState } from "react";
import { getState, pingApp } from "@/lib/api";
import { adoptLang } from "@/lib/languages";

const EVERY_MS = 30_000;

export function Heartbeat() {
  // Si el motor se apagó (por inactividad o porque alguien cerró la ventana),
  // la pestaña seguiría ahí con toda su pinta de funcionar y cada respuesta
  // fallaría en silencio: el alumno creería que perdió lo que acaba de hacer.
  // Mejor decirlo con todas las letras.
  const [state, setState] = useState<"ok" | "unpaired" | "down">("ok");
  // Aviso del motor cuando el archivo de progreso estaba dañado: se apartó una
  // copia y se empezó de cero. Sin esto, la pantalla es idéntica a la de una
  // instalación nueva y nadie sabe que hay algo que recuperar.
  const [recovered, setRecovered] = useState<string | null>(null);
  useEffect(() => {
    void getState().then((st) => setRecovered(st?.recoveredNotice ?? null));
  }, []);

  // La llave de la red local llega en la URL del QR (?k=…). El backend la
  // convierte en cookie a la primera petición, así que en la barra ya solo
  // estorba: se queda en el historial, sale en las capturas y la ve cualquiera
  // que mire el móvil por encima del hombro. Se borra sin recargar.
  useEffect(() => {
    const url = new URL(window.location.href);
    const hadKey = url.searchParams.has("k");
    // el QR también trae el idioma que se estudia: así el móvil no aterriza en
    // el curso equivocado solo porque su ajuste local es otro
    const qrLang = url.searchParams.get("lang");
    if (qrLang) adoptLang(qrLang);
    if (!hadKey && !qrLang) return;
    url.searchParams.delete("k");
    url.searchParams.delete("lang");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;

    let misses = 0;
    const beat = async () => {
      if (document.visibilityState !== "visible") return;
      const r = await pingApp();
      if (r === "unpaired") {
        // el motor está vivo: no hay que asustar a nadie, solo re-emparejar
        misses = 0;
        setState("unpaired");
        return;
      }
      // dos fallos seguidos: un tropiezo puntual no debe alarmar a nadie
      misses = r === "ok" ? 0 : misses + 1;
      setState(r === "ok" ? "ok" : misses >= 2 ? "down" : "ok");
    };

    const start = () => {
      if (timer) return;
      void beat(); // uno inmediato al volver a la pestaña
      timer = setInterval(() => void beat(), EVERY_MS);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const onVisibility = () => (document.visibilityState === "visible" ? start() : stop());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  if (state === "ok" && !recovered) return null;
  return (
    <div role="alert" style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 90,
      background: "var(--err, #b3323e)", color: "#fff",
      padding: "10px 16px", fontSize: 14, textAlign: "center",
      boxShadow: "0 -2px 10px rgba(0,0,0,.18)",
    }}>
      {recovered && state === "ok"
        ? recovered
        : state === "unpaired"
        ? "Este dispositivo ya no está emparejado con tu Seshat: vuelve a escanear el QR de «En tu teléfono» en el ordenador. Lo que hayas hecho aquí no se está guardando."
        : "Seshat ya no responde: la aplicación está cerrada — la cerraste tú o se apagó sola tras una hora sin usarla. Lo que hayas terminado está guardado; si te has quedado a media lección, esa parte se pierde. Ábrela otra vez y sigue donde estabas."}
    </div>
  );
}
