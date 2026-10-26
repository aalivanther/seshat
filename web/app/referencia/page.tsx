"use client";

// La libreta de referencia: todo el detalle que el examen exige, para consultar
// en cualquier momento — verbos conjugados, preguntas, pronunciación y números.
// Esta página solo compone (idioma, nivel, pestañas). Cada libreta vive en su
// fichero: juntas no se podían abrir, y una libreta que no se mantiene deja de
// ser la hebra de foco en la forma.

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { has } from "@/data/features";
import {
  BookOpenText, Notebook, Question, MusicNotes, NumberCircleOne,
  ClockClockwise, ClockCounterClockwise, ListNumbers, ChatCircleText, PuzzlePiece, LinkSimple, ArrowsClockwise, Warning,
  Scales, Stack, CalendarCheck, HandPalm, UserFocus,
  Quotes, GitBranch, Anchor, Lightning,
} from "@phosphor-icons/react";
import { refModules } from "@/data/refs.gen";
import { levelsOf } from "@/lib/levels";
import type { Cefr } from "@/lib/types";
import { useVoiceMissing } from "@/components/ExerciseKinds";
import { langConfig } from "@/lib/language";
import hub from "@/components/hub.module.css";
import s from "./referencia.module.css";
import { adoptLang, getActiveLang, getLanguage } from "@/lib/languages";
import { LibretaDeA1 } from "./deA1";
import { LibretaDeA2 } from "./deA2";
import { LibretaDeB1 } from "./deB1";
import { LibretaDeB2 } from "./deB2";
import { LibretaEnA1 } from "./enA1";
import { LibretaEnA2 } from "./enA2";
import { LibretaEnB1 } from "./enB1";
import { LibretaEnB2 } from "./enB2";
import { NativoTab } from "./nativo";

const TABS = [
  { id: "verbos", label: "Verbos", icon: BookOpenText },
  { id: "preguntas", label: "Preguntas", icon: Question },
  { id: "sonidos", label: "Pronunciación", icon: MusicNotes },
  { id: "numeros", label: "Números", icon: NumberCircleOne },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

// La libreta del A2: sus propias notas vivas (Perfekt, pasado, narración)
const TABS_A2 = [
  { id: "perfekt", label: "Perfekt", icon: ClockClockwise },
  { id: "pasado", label: "war & hatte", icon: ClockCounterClockwise },
  { id: "conectores", label: "Narración", icon: ListNumbers },
  { id: "anclas", label: "Más anclas", icon: Anchor },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

// La libreta del B1: lo que se consulta de verdad en el nivel — la rección
// (la pestaña más abierta), los conectores por lo que le hacen al verbo, y las
// tres declinaciones del adjetivo.
const TABS_B1 = [
  { id: "rektion", label: "Rección", icon: LinkSimple },
  { id: "konnektoren", label: "Conectores", icon: ListNumbers },
  { id: "k2", label: "Konjunktiv II", icon: ClockClockwise },
  { id: "passiv", label: "Passiv", icon: ArrowsClockwise },
  { id: "adjektive", label: "Adjetivos", icon: PuzzlePiece },
  { id: "trampas", label: "Trampas", icon: Warning },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

const TABS_B2 = [
  { id: "k1", label: "Konjunktiv I", icon: Quotes },
  { id: "nominal", label: "Nominalización", icon: Stack },
  { id: "passiversatz", label: "Passiversatz", icon: ArrowsClockwise },
  { id: "zweistueck", label: "Dos piezas", icon: GitBranch },
  { id: "rektionb2", label: "Rección", icon: LinkSimple },
  { id: "trampasb2", label: "Trampas", icon: Warning },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

const TABS_EN_B2 = [
  { id: "enb2markers", label: "Marcadores", icon: ListNumbers },
  { id: "enb2pasiva", label: "Pasiva", icon: ArrowsClockwise },
  { id: "enb2modal", label: "Modalidad", icon: HandPalm },
  { id: "enb2nonfinite", label: "No finitas", icon: PuzzlePiece },
  { id: "enb2inversion", label: "Inversión", icon: GitBranch },
  { id: "enb2trampas", label: "Trampas", icon: Warning },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

// La libreta INGLESA (A1): mismas costuras, contenido propio — la -s de 3ª,
// el orden de las preguntas, los 10 contrastes de sonido, números e irregulares.
const TABS_EN = [
  { id: "verbos", label: "Verbos", icon: BookOpenText },
  { id: "preguntas", label: "Preguntas", icon: Question },
  { id: "sonidos", label: "Sonidos", icon: MusicNotes },
  { id: "numeros", label: "Números", icon: NumberCircleOne },
  { id: "irregulares", label: "Irregulares", icon: PuzzlePiece },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

// La libreta INGLESA (A2): lo que el A1 no tenía y el A2 exige — el pasado por
// familias, la clínica de la -ed, comparar, medir cantidades, el futuro
// decidido, los modales de norma y permiso, y los pronombres con sus dos
// montones de verbos de decir.
const TABS_EN_A2 = [
  { id: "enpasado", label: "Pasado", icon: ClockCounterClockwise },
  { id: "ened", label: "La -ed", icon: MusicNotes },
  { id: "encomparar", label: "Comparar", icon: Scales },
  { id: "encantidad", label: "Cantidades", icon: Stack },
  { id: "enfuturo", label: "Futuro", icon: CalendarCheck },
  { id: "enmodales", label: "Modales", icon: HandPalm },
  { id: "enpronombres", label: "Pronombres", icon: UserFocus },
  { id: "entrampas", label: "Trampas", icon: Warning },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

// La libreta INGLESA (B1): el nivel donde el sistema verbal explota. Diez
// pestañas, y ninguna repite lo del A1 ni lo del A2 — aquí solo está lo que el
// B1 añade: el reparto de los tiempos, la pasiva, el estilo indirecto, los tres
// condicionales, las relativas, los dos montones del gerundio, las
// preposiciones pegadas, los phrasal verbs, los conectores CON SU NIVEL REAL y
// las trampas que fosilizan si nadie interviene.
const TABS_EN_B1 = [
  { id: "enb1tiempos", label: "Tiempos", icon: ClockClockwise },
  { id: "enb1pasiva", label: "Pasiva", icon: ArrowsClockwise },
  { id: "enb1indirecto", label: "Indirecto", icon: Quotes },
  { id: "enb1condicionales", label: "Condicionales", icon: GitBranch },
  { id: "enb1relativas", label: "Relativas", icon: LinkSimple },
  { id: "enb1patterns", label: "-ing o to", icon: PuzzlePiece },
  { id: "enb1prep", label: "Preposiciones", icon: Anchor },
  { id: "enb1phrasal", label: "Phrasal verbs", icon: Lightning },
  { id: "enb1conectores", label: "Conectores", icon: ListNumbers },
  { id: "enb1trampas", label: "Trampas", icon: Warning },
  { id: "nativo", label: "Nativo", icon: ChatCircleText },
] as const;

type TabId =
  | (typeof TABS)[number]["id"]
  | (typeof TABS_A2)[number]["id"]
  | (typeof TABS_B1)[number]["id"]
  | (typeof TABS_EN)[number]["id"]
  | (typeof TABS_EN_A2)[number]["id"]
  | (typeof TABS_EN_B1)[number]["id"]
  | (typeof TABS_B2)[number]["id"]
  | (typeof TABS_EN_B2)[number]["id"];

type TabDef = readonly { id: TabId; label: string; icon: typeof BookOpenText }[];

/** tabla IDIOMA + NIVEL → pestañas. Antes esta tabla solo miraba el nivel y el
 *  inglés se resolvía con un booleano, así que todo el inglés —A1, A2 y lo que
 *  viniera— compartía las pestañas del A1: el alumno de A2 pulsaba su nivel y
 *  se le pintaba la libreta del A1. Un nivel sin fila aquí no tiene libreta y
 *  no se ofrece. */
const TABS_BY_LANG_LEVEL: Record<string, Partial<Record<Cefr, TabDef>>> = {
  de: { a1: TABS, a2: TABS_A2, b1: TABS_B1, b2: TABS_B2 },
  en: { a1: TABS_EN, a2: TABS_EN_A2, b1: TABS_EN_B1, b2: TABS_EN_B2 },
};
const tabsFor = (lang: string, level: Cefr): TabDef =>
  TABS_BY_LANG_LEVEL[lang]?.[level] ?? TABS;

/** qué entrada de refModules necesita cada nivel para tener contenido. */
const REF_KEY_BY_LEVEL: Record<string, Partial<Record<Cefr, keyof typeof refModules>>> = {
  de: { a1: "verbs", a2: "a2", b1: "b1", b2: "b2" },
  en: { a1: "en", a2: "ena2", b1: "enb1", b2: "enb2" },
};

/** ¿Existe la libreta de este idioma y nivel en el build actual? Dos motivos
 *  para que no: que nadie la haya escrito todavía (no tiene pestañas) o que su
 *  drop no viaje en este build (refModules no la trae). En ambos casos el nivel
 *  ni se ofrece: pintar la pestaña y dentro enseñar la de otro nivel es peor
 *  que no tenerla. */
function hayLibreta(lang: string, cefr: Cefr): boolean {
  if (!TABS_BY_LANG_LEVEL[lang]?.[cefr]) return false;
  const key = REF_KEY_BY_LEVEL[lang]?.[cefr];
  return !key || Boolean(refModules[key]);
}

/** el subtítulo también es por idioma y nivel: el inglés A1 y el A2 son dos
 *  libretas distintas y anunciar una mientras se pinta la otra es la misma
 *  mentira que pintaba la pestaña equivocada. */
function subtitleFor(lang: string, level: Cefr): string {
  if (lang !== "en") {
    if (level === "b2") {
      return "Tu cuaderno de consulta del alemán B2: Konjunktiv I, nominalización, Passiversatz, conectores de dos piezas, rección de nombres y adjetivos, y las trampas que ya no son de gramática sino de registro.";
    }
    return "Tu cuaderno de consulta, con una sección viva por nivel: verbos, preguntas, pronunciación y números del A1; el Perfekt, el pasado y la narración del A2; y del B1 el Konjunktiv II, la pasiva, las recciones y los conectores.";
  }
  if (level === "b2") {
    return "Tu cuaderno de consulta del inglés B2: marcadores del párrafo, pasiva impersonal, modalidad graduada, subordinación no finita, las tres inversiones que sí son B2, y las trampas de la evitación.";
  }
  if (level === "b1") {
    return "Tu cuaderno de consulta del inglés B1: el reparto de los tiempos con los marcadores que mandan, la pasiva, el estilo indirecto, los tres condicionales, las relativas, los dos montones del gerundio, las preposiciones pegadas, los phrasal verbs del nivel, los conectores con su nivel real —«however» es A2— y las trampas que fosilizan si nadie interviene.";
  }
  if (level === "a2") {
    return "Tu cuaderno de consulta del inglés A2: los irregulares por familias, los tres sonidos de la -ed, comparar, medir lo que no se cuenta, el futuro que ya has decidido, los modales de norma y permiso, y las trampas que delatan a un hispanohablante — todo con bocina.";
  }
  return "Tu cuaderno de consulta del inglés A1: los verbos con su -s de 3ª persona, el orden de las preguntas, los sonidos que deciden, los números del examen y los irregulares — todo con bocina.";
}

export default function ReferencePage() {
  if (!has("reference")) notFound();
  const [level, setLevel] = useState<Cefr>("a1");
  const [tab, setTab] = useState<TabId>("verbos");
  // idioma activo tras montar (localStorage): evita divergencia de hidratación,
  // y adoptarlo fija el TTS — la bocina lee inglés cuando la libreta es inglesa
  const [lang, setLang] = useState("de");
  useEffect(() => {
    const l = getActiveLang();
    setLang(l);
    adoptLang(l);
  }, []);
  const isEn = lang === "en";
  const langDef = getLanguage(lang);
  // AUDITORIA-FUNCIONALIDADES.md §7.5#7: las bocinas de las libretas llaman
  // a speak() directo, sin la guarda que components/ExerciseKinds.tsx ya usa
  // en los ejercicios. No se envuelve cada botón (cirugía a ciegas): se avisa
  // UNA vez, arriba, antes de que el alumno gaste los clics en silencio —
  // mismo criterio que VoiceMissingNotice, sin depender de él (esto no es un
  // ejercicio).
  const voiceMissing = useVoiceMissing();

  function switchLevel(lv: Cefr) {
    setLevel(lv);
    setTab(tabsFor(lang, lv)[0].id); // primera pestaña del nivel destino
  }
  return (
    <main className={s.wrap}>
      <nav className={hub.crumbs} aria-label="Ruta">
        <Link href={`/idioma/${lang}`}>{langDef?.name ?? "Alemán"}</Link> <span>/</span> <span>Referencia</span>
      </nav>
      <h1 className={hub.title}><Notebook size={30} weight="duotone" style={{ verticalAlign: "-5px" }} aria-hidden /> La libreta</h1>
      <p className={hub.subtitle}>
        {subtitleFor(lang, level)}
      </p>

      {voiceMissing && (
        <div
          role="status"
          style={{
            display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px",
            border: "1px solid #e5b800", borderRadius: 10, background: "#fff8dc",
            marginBottom: 14, fontSize: 14,
          }}
        >
          <Warning size={18} weight="duotone" aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
          <span>
            Tu sistema no tiene instalada ninguna voz de {langConfig().spanishName}: las bocinas de esta
            libreta sonarán en silencio o con otra voz. Se añade gratis en los ajustes de voz del
            sistema —busca {langConfig().voiceSearch}— y al volver aquí ya suena.
          </span>
        </div>
      )}

      <div className={s.tabs} role="tablist" aria-label="Nivel de la libreta" style={{ marginBottom: 4 }}>
        {levelsOf(lang)
          .filter((l) => l.available)
          .map((l) => l.cefr)
          // Un nivel solo se ofrece si SU libreta viaja en este build. Sin
          // esto, el inglés A2 y B1 pintaban su pestaña y dentro salía la
          // libreta del A1: el alumno pulsaba «Nivel B1» y veía otra cosa,
          // que es peor que no tener la pestaña.
          .filter((cefr) => hayLibreta(lang, cefr))
          .map((lv) => (
          <button
            key={lv}
            role="tab"
            aria-selected={level === lv}
            className={`${s.tab} ${level === lv ? s.tabActive : ""}`}
            onClick={() => switchLevel(lv)}
            style={{ fontWeight: 800 }}
          >
            Nivel {lv.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={s.tabs} role="tablist">
        {tabsFor(lang, level).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={`${s.tab} ${tab === id ? s.tabActive : ""}`}
            onClick={() => setTab(id)}
          >
            <Icon size={18} weight={tab === id ? "fill" : "regular"} /> {label}
          </button>
        ))}
      </div>

      {/* El buscador del A1 y del A2 vive en su libreta. Si se desmonta al
          cambiar de nivel, el texto buscado se pierde: antes el estado estaba
          aquí y sobrevivía. Fuera de su nivel no pintan. */}
      {!isEn && <LibretaDeA1 tab={level === "a1" ? tab : ""} />}
      {!isEn && <LibretaDeA2 tab={level === "a2" ? tab : ""} />}
      {!isEn && level === "b1" && <LibretaDeB1 tab={tab} />}
      {!isEn && level === "b2" && <LibretaDeB2 tab={tab} />}
      {isEn && level === "a1" && <LibretaEnA1 tab={tab} />}
      {isEn && level === "a2" && <LibretaEnA2 tab={tab} />}
      {isEn && level === "b1" && <LibretaEnB1 tab={tab} />}
      {isEn && level === "b2" && <LibretaEnB2 tab={tab} />}

      {tab === "nativo" && <NativoTab level={level} lang={lang} />}
    </main>
  );
}
