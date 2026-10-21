import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  AVISO_TARDA,
  ESPERA_LENTA_MS,
  TEXTO_SIGUE,
  cancelarEspera,
  empezarEspera,
  esFalloDeMotor,
  esperaQuieta,
  generacionVigente,
  senalDeEspera,
  terminarEspera,
  textoDeEspera,
  type EsperaPantalla,
} from "@/lib/esperaModelo";

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const root = join(web, "..");

describe("P22 — una espera larga cambia de frase, y cancelar suelta busy", () => {
  it("a los 15 s la frase cambia; antes dice que sigue", () => {
    expect(ESPERA_LENTA_MS).toBe(15_000);
    expect(textoDeEspera(false)).toBe(TEXTO_SIGUE);
    expect(textoDeEspera(false)).toBe("Sigue en ello.");
    expect(textoDeEspera(true)).toBe(AVISO_TARDA);
    expect(textoDeEspera(true)).toBe("Está tardando; puedes dejarlo.");
    expect(textoDeEspera(true, "El examinador está calificando...")).toBe(AVISO_TARDA);
    expect(textoDeEspera(false, "El examinador está calificando...")).toBe("El examinador está calificando...");
    const modelo = readFileSync(join(web, "lib", "esperaModelo.ts"), "utf8");
    expect(modelo).not.toMatch(/from "react"/);
    const hook = readFileSync(join(web, "lib", "useLento.ts"), "utf8");
    expect(hook).toContain("use client");
    const useLento = hook.slice(hook.indexOf("export function useLento"));
    expect(useLento).toContain("ESPERA_LENTA_MS");
    expect(useLento).toContain("setTimeout");
  });

  it("cancelar no deja la pantalla en busy y la respuesta tardía no la reocupa", () => {
    let pantalla = empezarEspera(esperaQuieta());
    const gen = pantalla.gen;
    expect(pantalla.busy).toBe(true);
    let aborted = false;
    let busyAlAbortar = true;
    let fase = "grading";
    pantalla = cancelarEspera(pantalla, {
      abort() {
        aborted = true;
        busyAlAbortar = pantalla.busy;
        fase = generacionVigente(pantalla, gen) ? fase : "answer";
      },
    }, (siguiente) => {
      pantalla = siguiente;
    });
    expect(aborted).toBe(true);
    expect(busyAlAbortar).toBe(false);
    expect(pantalla.busy).toBe(false);
    expect(fase).toBe("answer");
    expect(generacionVigente(pantalla, gen)).toBe(false);
    expect(terminarEspera(pantalla, gen).busy).toBe(false);

    const nueva = empezarEspera(pantalla);
    expect(nueva.busy).toBe(true);
    expect(terminarEspera(nueva, gen)).toEqual(nueva);
  });

  it("el finally de la generación vieja no apaga la espera nueva", () => {
    let pantalla = empezarEspera(esperaQuieta());
    const vieja = pantalla.gen;
    pantalla = empezarEspera(pantalla);
    const cerrar = (estado: EsperaPantalla, gen: number) => terminarEspera(estado, gen);
    expect(cerrar(pantalla, vieja).busy).toBe(true);
    expect(cerrar(pantalla, pantalla.gen).busy).toBe(false);
  });

  it("abortar al alumno no es el motor caído; el tope sí", async () => {
    const alumno = new AbortController();
    const viva = senalDeEspera(alumno.signal, 60_000);
    expect(esFalloDeMotor(viva)).toBe(true);
    alumno.abort();
    expect(viva.aborted).toBe(true);
    expect(esFalloDeMotor(viva)).toBe(false);
    expect(esFalloDeMotor(alumno.signal)).toBe(false);

    const tope = senalDeEspera(new AbortController().signal, 20);
    await new Promise((r) => setTimeout(r, 80));
    expect(tope.aborted).toBe(true);
    expect(esFalloDeMotor(tope)).toBe(true);
    expect(esFalloDeMotor(undefined)).toBe(true);
  });

  it("escritura, el comentario y el oral no piden una generación", () => {
    const esc = readFileSync(join(web, "app", "escritura", "page.tsx"), "utf8");
    const oral = readFileSync(join(web, "app", "entrevista", "page.tsx"), "utf8");
    const write = readFileSync(join(web, "components", "kinds", "Write.tsx"), "utf8");
    const api = readFileSync(join(web, "lib", "api.ts"), "utf8");
    const go = readFileSync(join(root, "backend", "main.go"), "utf8");

    for (const src of [esc, oral, write, api, go]) {
      expect(src).not.toMatch(/aiChat|aiChatStream|\/api\/ai|ollama|qwen|llama3/);
    }
    expect(esc).toContain("Revisar con la hoja");
    expect(oral).toContain("Corregir");
    expect(write).toContain("gradeWrite");
  });
});
