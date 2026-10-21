"use client";

// Interruptor de tema: claro / oscuro / el del sistema.
// Escribe data-theme en <html> y lo recuerda en localStorage. El claro es el
// que manda si no hay nada guardado, aunque el sistema pida oscuro: es
// decisión de la casa. Solo «el del sistema» (data-theme="auto") deja que
// mande prefers-color-scheme, y de eso se encarga el CSS él solo.

import { useEffect, useState } from "react";
import { Monitor, MoonStars, Sun } from "@phosphor-icons/react";
import s from "./theme.module.css";

type ThemeChoice = "light" | "dark" | "auto";

const STORE_KEY = "theme";

/* El color de la barra del navegador/PWA: tiene que ir con el lienzo, si no
   en móvil queda una franja crema encima del papel de noche. Estos dos valores
   son --canvas de cada tema en globals.css. */
const BAR_LIGHT = "#fbf7f0";
const BAR_DARK = "#17130f";

/* Script de arranque. Va tal cual en el HTML estático y se ejecuta mientras el
   navegador aún está leyendo la página, antes de pintar nada: sin él, quien
   estudia de noche vería un fogonazo de papel blanco en cada carga. Escrito en
   ES5 y envuelto en try/catch porque en modo privado localStorage puede tirar. */
const BOOT_SCRIPT = `(function(){try{
var d=document.documentElement,c=localStorage.getItem("${STORE_KEY}");
if(c!=="dark"&&c!=="auto"){c="light"}
d.dataset.theme=c;d.dataset.themeChoice=c;
var n=c==="dark"||(c==="auto"&&matchMedia("(prefers-color-scheme: dark)").matches);
var m=document.querySelector('meta[name="theme-color"]');
if(m){m.setAttribute("content",n?"${BAR_DARK}":"${BAR_LIGHT}")}
}catch(e){}})();`;

/** El script anti-parpadeo, suelto por si conviene colgarlo más arriba.
 *  ThemeToggle ya lo lleva dentro: solo hace falta si el interruptor va a vivir
 *  lejos del principio de la página. */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />;
}

function isChoice(v: string | null): v is ThemeChoice {
  return v === "light" || v === "dark" || v === "auto";
}

function readChoice(): ThemeChoice {
  try {
    const v = window.localStorage.getItem(STORE_KEY);
    return isChoice(v) ? v : "light";
  } catch {
    return "light"; // navegación privada con almacenamiento capado
  }
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function paintBrowserBar(choice: ThemeChoice): void {
  const dark = choice === "dark" || (choice === "auto" && systemPrefersDark());
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", dark ? BAR_DARK : BAR_LIGHT);
}

function applyChoice(choice: ThemeChoice): void {
  const root = document.documentElement;
  root.dataset.theme = choice;
  root.dataset.themeChoice = choice; // lo lee el CSS para marcar el botón activo
  paintBrowserBar(choice);
  try {
    window.localStorage.setItem(STORE_KEY, choice);
  } catch {
    /* sin almacenamiento el tema dura lo que la pestaña: mejor eso que reventar */
  }
}

const OPTIONS: { value: ThemeChoice; label: string; title: string }[] = [
  { value: "light", label: "Tema claro", title: "Claro" },
  { value: "dark", label: "Tema oscuro", title: "Oscuro" },
  { value: "auto", label: "El tema del sistema", title: "El del sistema" },
];

export function ThemeToggle() {
  /* Arranca en «claro» y se corrige en cuanto monta: en un export estático el
     HTML se genera sin saber qué eligió el alumno, y leer localStorage durante
     el render rompería la hidratación. Mientras tanto el botón activo ya se ve
     bien, porque lo marca el CSS con data-theme-choice de <html>. */
  const [choice, setChoice] = useState<ThemeChoice>("light");

  useEffect(() => {
    setChoice(readChoice());
  }, []);

  // Con «el del sistema», el color de la barra del navegador tiene que seguir
  // al sistema en vivo. La paleta la cambia el CSS sin ayuda de nadie.
  useEffect(() => {
    if (choice !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => paintBrowserBar("auto");
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [choice]);

  return (
    <>
      <div className={s.group} role="group" aria-label="Tema de la aplicación">
        {OPTIONS.map(({ value, label, title }) => (
          <button
            key={value}
            type="button"
            className={`${s.opt} ${s[value]}`}
            aria-label={label}
            aria-pressed={choice === value}
            title={title}
            onClick={() => {
              applyChoice(value);
              setChoice(value);
            }}
          >
            {value === "light" && <Sun size={18} weight="duotone" aria-hidden />}
            {value === "dark" && <MoonStars size={18} weight="duotone" aria-hidden />}
            {value === "auto" && <Monitor size={18} weight="duotone" aria-hidden />}
          </button>
        ))}
      </div>
    </>
  );
}
