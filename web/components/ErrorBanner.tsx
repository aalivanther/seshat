"use client";

// EL texto de error de la app, humano y en UN solo lugar: cuando cambie la
// forma de abrir la app (instalador, acceso directo), se corrige aquí y no
// en seis pantallas. Cero jerga: ni backend ni scripts.

import { Plugs } from "@phosphor-icons/react";
import { lastErrorWasUnpaired } from "@/lib/api";

/** frase corta reutilizable para mensajes inline (chat, chips, errores) */
export const MOTOR_OFF = "La app no encuentra su motor — ciérrala por completo y vuelve a abrirla.";

/** El texto correcto para «no se pudo hablar con el motor», sea cual sea la
 *  causa: en un móvil de la red casi siempre es la cookie caducada, y decirle
 *  que reinicie la app no le arregla nada. */
export function motorOffText(): string {
  return looksUnpaired() ? NOT_PAIRED : MOTOR_OFF;
}
/** El mismo silencio, otra causa: en un móvil de la red, un 401 significa que
 *  este dispositivo perdió su emparejamiento. Decirle «cierra la app y vuelve a
 *  abrirla» no arregla nada — lo que necesita es volver a escanear el QR. */
export const NOT_PAIRED =
  "Este dispositivo ya no está emparejado con tu Seshat: vuelve a escanear el QR de «En tu teléfono» en el ordenador donde la tienes abierta.";

/** ¿el último fallo fue un 401 reciente (15 s), o sea falta de emparejamiento? */
export function looksUnpaired(): boolean {
  return lastErrorWasUnpaired();
}
export function ErrorBanner({ detail }: { kind: "motor"; detail?: string }) {
  const Icon = Plugs;
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        margin: "16px 0",
        padding: "14px 18px",
        border: "2px solid var(--warn)",
        borderRadius: "17px 14px 18px 15px",
        background: "var(--warn-soft)",
        color: "var(--warn)",
        boxShadow: "3px 4px 0 rgba(138, 90, 0, 0.15)",
        fontWeight: 600,
        lineHeight: 1.55,
      }}
    >
      <Icon size={22} weight="duotone" aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
      <span>
        {looksUnpaired() ? NOT_PAIRED : MOTOR_OFF}
        {detail && <> {detail}</>}
      </span>
    </div>
  );
}
