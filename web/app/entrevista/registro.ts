import type { Cefr } from "@/lib/cefr";
import type { InterviewConfig } from "./tipos";
import { entrevistaDeA1 } from "./deA1";
import { entrevistaDeA2 } from "./deA2";
import { entrevistaDeB1 } from "./deB1";
import { entrevistaDeB2 } from "./deB2";
import { entrevistaEnA1 } from "./enA1";
import { entrevistaEnA2 } from "./enA2";
import { entrevistaEnB1 } from "./enB1";
import { entrevistaEnB2 } from "./enB2";

/* ══════════════════════════════ REGISTRO ══════════════════════════════ */

/* Registro de entrevistas: la clave es «idioma-nivel», no el idioma a secas.
   Escritas: de-a1, de-a2, de-b1, de-b2, en-a1, en-a2, en-b1, en-b2.
   Si falta una clave, interviewFor devuelve null y la portada lo dice: no se
   recicla el A1. Ids de resultado: lib/ids.ts interviewResultId. Los dos A1
   publicados NO se tocan. */

const INTERVIEWS: Record<string, InterviewConfig> = {
  "de-a1": entrevistaDeA1,
  "en-a1": entrevistaEnA1,
  "de-a2": entrevistaDeA2,
  "de-b2": entrevistaDeB2,
  "en-b2": entrevistaEnB2,
  "de-b1": entrevistaDeB1,
  "en-a2": entrevistaEnA2,
  "en-b1": entrevistaEnB1,
};

/** Exactamente la entrevista de ese (idioma, CEFR). Si no está escrita,
 *  interviewFor devuelve null: jamás se recicla el A1 para un B1. */
export function interviewFor(lang: string, cefr: Cefr): InterviewConfig | null {
  if (typeof lang !== "string" || !lang || typeof cefr !== "string" || !cefr) return null;
  return INTERVIEWS[`${lang}-${cefr}`] ?? null;
}
