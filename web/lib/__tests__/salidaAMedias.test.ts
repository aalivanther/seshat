import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  frenarSalida,
  hayQuePreguntarAlSalir,
  type TrabajoAlSalir,
} from "@/lib/useLeaveGuard";

// P40: cerrar la pestaña pregunta solo si hay texto o una run en marcha.
// El repaso en la invitación, y el saludo de la otra parte, no.

const web = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

function cerrar(t: TrabajoAlSalir): { pregunto: boolean; returnValue: string } {
  let pregunto = false;
  const e = {
    preventDefault() {
      pregunto = true;
    },
    returnValue: "intacto",
  };
  frenarSalida(e, hayQuePreguntarAlSalir(t));
  return { pregunto, returnValue: e.returnValue };
}

function llamada(rel: string): string {
  const src = readFileSync(join(web, rel), "utf8");
  expect(src, rel).toMatch(
    /import \{[^}]*hayQuePreguntarAlSalir[^}]*\} from "@\/lib\/useLeaveGuard"/,
  );
  const i = src.indexOf("useLeaveGuard(");
  expect(i, rel).toBeGreaterThanOrEqual(0);
  expect(src.indexOf("useLeaveGuard(", i + "useLeaveGuard(".length), rel).toBe(-1);
  const fin = src.indexOf(");", i);
  expect(fin, rel).toBeGreaterThan(i);
  const trozo = src.slice(i, fin + 2);
  expect(trozo, rel).toContain("hayQuePreguntarAlSalir(");
  expect(trozo, rel).not.toMatch(/useLeaveGuard\(\s*true\s*\)/);
  return trozo;
}

describe("P40 — salir a medias pregunta solo si hay trabajo", () => {
  it("cerrar con texto pregunta; cerrar sin texto, no", () => {
    expect(cerrar({ texto: "Guten Tag" })).toEqual({ pregunto: true, returnValue: "" });
    expect(cerrar({ texto: "   " })).toEqual({ pregunto: false, returnValue: "intacto" });
    expect(cerrar({ texto: "" })).toEqual({ pregunto: false, returnValue: "intacto" });
    expect(cerrar({})).toEqual({ pregunto: false, returnValue: "intacto" });

    const diez = Array.from({ length: 10 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: i % 2 === 0 ? "Hallo" : "Guten Tag",
    }));
    expect(cerrar({ texto: "", mensajes: diez }).pregunto).toBe(true);
    expect(cerrar({
      mensajes: [{ role: "user", content: "Quiero un café" }],
    }).pregunto).toBe(true);
    // El saludo lo puso la otra parte: el alumno aún no ha escrito nada.
    expect(cerrar({
      mensajes: [{ role: "assistant", content: "Guten Tag, was darf es sein?" }],
    })).toEqual({ pregunto: false, returnValue: "intacto" });
    expect(cerrar({
      mensajes: [{ role: "user", content: "   " }, { role: "assistant", content: "Hallo" }],
    }).pregunto).toBe(false);
  });

  it("el reto en marcha pregunta; la portada y el cierre, no", () => {
    expect(cerrar({ retoEnMarcha: true })).toEqual({ pregunto: true, returnValue: "" });
    expect(cerrar({ retoEnMarcha: false })).toEqual({ pregunto: false, returnValue: "intacto" });
    // Aunque el cierre del repaso diga que ya se guardó, una run en marcha no.
    expect(cerrar({ retoEnMarcha: true, repasoTerminado: true }).pregunto).toBe(true);
  });

  it("el repaso pregunta solo con alguna respuesta, y no en el cierre", () => {
    expect(cerrar({ respuestas: 0, repasoTerminado: false }).pregunto).toBe(false);
    expect(cerrar({ respuestas: 0, repasoTerminado: true }).pregunto).toBe(false);
    expect(cerrar({ respuestas: 1, repasoTerminado: false })).toEqual({ pregunto: true, returnValue: "" });
    expect(cerrar({ respuestas: 4, repasoTerminado: true })).toEqual({ pregunto: false, returnValue: "intacto" });
  });

  it("la misión pregunta por el ensayo, las palabras o la checklist, y al registrar solo sigue el hilo", () => {
    expect(cerrar({
      texto: "",
      palabras: "",
      checklist: 0,
      registrada: false,
      mensajes: [{ role: "assistant", content: "Hallo" }],
    }).pregunto).toBe(false);
    expect(cerrar({ palabras: "recibo, para llevar", registrada: false }).pregunto).toBe(true);
    expect(cerrar({ palabras: "   ", registrada: false }).pregunto).toBe(false);
    expect(cerrar({ checklist: 3, registrada: false })).toEqual({ pregunto: true, returnValue: "" });
    expect(cerrar({ palabras: "recibo", checklist: 3, registrada: true })).toEqual({
      pregunto: false,
      returnValue: "intacto",
    });
    expect(cerrar({
      texto: "aún no lo envié",
      palabras: "recibo",
      checklist: 3,
      registrada: true,
    })).toEqual({ pregunto: true, returnValue: "" });
    expect(cerrar({
      registrada: true,
      checklist: 4,
      mensajes: [{ role: "user", content: "Ich hätte gern einen Kaffee" }],
    }).pregunto).toBe(true);
  });

  it("conversación, misión, reto y repaso usan esa decisión y no un true pelado", () => {
    const conversacion = llamada("app/conversacion/page.tsx");
    expect(conversacion).toContain("texto: dicho");
    expect(conversacion).not.toContain("mensajes:");

    const mision = llamada("app/mision/[id]/Client.tsx");
    expect(mision).not.toContain("chatInput");
    expect(mision).not.toContain("mensajes:");
    expect(mision).toContain("palabras: missedWords");
    expect(mision).toContain("checklist: checked.size");
    expect(mision).toContain('registrada: saved === "ok"');

    const reto = llamada("app/reto/[id]/Client.tsx");
    expect(reto).toContain('retoEnMarcha: phase2 === "run"');
    expect(reto).not.toContain("intro");

    const repaso = llamada("app/review/page.tsx");
    expect(repaso).toContain("respuestas: outcomes.length");
    expect(repaso).toContain("repasoTerminado: finished");
    expect(repaso).not.toContain("!finished");

    const guarda = readFileSync(join(web, "lib", "useLeaveGuard.ts"), "utf8");
    const hook = guarda.slice(guarda.indexOf("export function useLeaveGuard"));
    expect(hook).toContain("if (!active) return");
    expect(hook).toContain('addEventListener("beforeunload"');
    expect(hook).toContain("frenarSalida(e, true)");
    expect(hook).toContain('removeEventListener("beforeunload"');
  });
});
