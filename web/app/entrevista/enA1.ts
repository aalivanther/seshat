// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { INTERVIEW_EN_ID } from "@/lib/ids";
import { pickOne, sample } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

/* ══════════════════ INGLÉS — Spoken · LanguageCert ESOL A1 ══════════════════ */

/** Part 1: presentación — nombre, deletreo (alfabeto trampa), país, ciudad, edad, ocupación */
const EN_T1_POOL: { variants: string[]; qEs: string; model: string }[] = [
  { variants: ["Hello! What's your name?", "Good morning! What is your name, please?"], qEs: "¿Cómo te llamas?", model: "My name is {NAME}." },
  { variants: ["How do you spell your surname?", "Can you spell your surname, please?"], qEs: "Deletrea tu apellido con los nombres INGLESES de las letras — trampas: A=«ei», E=«i», I=«ai», G=«yi», J=«yei».", model: "{SPELL}." },
  { variants: ["Where are you from?", "What country are you from?"], qEs: "¿De dónde eres?", model: "I'm from {COUNTRY}." },
  { variants: ["Where do you live?", "What city do you live in?"], qEs: "¿Dónde vives?", model: "I live in {CITY}." },
  { variants: ["How old are you?"], qEs: "La edad con BE, nunca have: I am... (jamás *I have 30 years).", model: "I'm thirty years old." },
  { variants: ["What do you do?", "What's your job?"], qEs: "¿A qué te dedicas? Profesión con artículo: a/an.", model: "I'm {JOB}." },
];

/** Part 2: situaciones — responder a prompts cotidianos del examinador */
const EN_T2_POOL: { q: string; qEs: string; model: string }[] = [
  { q: "What time is it, please?", qEs: "Di una hora — el sujeto it es obligatorio: It's...", model: "It's half past ten." },
  { q: "How do you spell the word 'ticket'?", qEs: "Deletrea la palabra con los nombres ingleses de las letras (I=«ai», E=«i»).", model: "T-I-C-K-E-T." },
  { q: "What's the weather like today?", qEs: "El tiempo SIEMPRE con it: It's... (nunca *Is cold).", model: "It's cold and it's raining." },
  { q: "Would you like tea or coffee?", qEs: "Elige una y pídela con educación.", model: "Coffee, please. Thank you." },
  { q: "How much is a coffee in your city?", qEs: "Di un precio: «two euros fifty» / «two fifty».", model: "It's two euros fifty." },
  { q: "What's your phone number?", qEs: "Cifra a cifra: el 0 se dice «oh»; dos cifras iguales = «double».", model: "It's oh-six-one-two, double five, four-four-seven." },
  { q: "Can you open the window, please?", qEs: "Reacciona a la petición con naturalidad.", model: "Yes, of course. No problem." },
  { q: "Are you hungry?", qEs: "Respuesta corta con el eco del auxiliar — nunca solo «yes».", model: "Yes, I am. / No, I'm not." },
  { q: "How do you go to work?", qEs: "Medio de transporte con by (o on foot).", model: "I go to work by bus." },
  { q: "When is your English class?", qEs: "Día con on, hora con at: on Monday at five.", model: "It's on Monday at five o'clock." },
];

/** Part 3: intercambio — el CANDIDATO pregunta por los datos que le faltan */
const EN_T3_POOL: { q: string; qEs: string; model: string }[] = [
  { q: "Ask me about my job.", qEs: "Ahora preguntas TÚ. Orden inglés: (Qu-) + auxiliar + sujeto + verbo.", model: "What's your job? / What do you do?" },
  { q: "Ask me where I live.", qEs: "Pregunta con where — el auxiliar do no puede faltar.", model: "Where do you live?" },
  { q: "Ask me what time I get up.", qEs: "Pregunta por la hora: What time + do you...", model: "What time do you get up?" },
  { q: "Ask me about my family.", qEs: "Pregunta por la familia (have got o do you have).", model: "Have you got any brothers or sisters?" },
  { q: "Ask me about my hobbies.", qEs: "Pregunta por el tiempo libre.", model: "What do you do in your free time?" },
  { q: "Ask me if I like sport.", qEs: "Pregunta sí/no: empieza con Do you...", model: "Do you like sport?" },
  { q: "Ask me about my favourite food.", qEs: "Pregunta por la comida favorita.", model: "What's your favourite food?" },
  { q: "Ask me how old I am.", qEs: "La edad con be: How old + are you...", model: "How old are you?" },
];

/** Part 4: mini-tema — 30 s de preparación visibles + ~1 minuto hablando */
const EN_T4_TOPICS: { topic: string; es: string; model: string }[] = [
  { topic: "your family", es: "tu familia", model: "There are four people in my family: my mother, my father, my sister and me. My mother is a teacher. My father works in a shop. My sister is twenty years old. We live in Madrid. I love my family very much." },
  { topic: "your day", es: "tu día", model: "I get up at seven o'clock. I have coffee and toast for breakfast. I work from nine to five. In the evening I cook dinner and watch TV. I go to bed at eleven o'clock. I like my routine." },
  { topic: "your town", es: "tu ciudad", model: "I live in Valencia. It's a big city in Spain. There is a beautiful beach and there are many parks. I like my neighbourhood because it's quiet. The food in my city is very good." },
  { topic: "your free time", es: "tu tiempo libre", model: "In my free time I play football with my friends. I also like reading books and watching films. On Saturdays I go shopping. On Sundays I cook and listen to music. I love my weekends." },
  { topic: "your house", es: "tu casa", model: "I live in a small flat. There are two bedrooms, a kitchen and a living room. My favourite room is the kitchen because I like cooking. My flat is not big, but it's very nice." },
];

/* Personas modelo del inglés — mismas biografías canon (Sofía programadora,
   Diego camarero...), con país/ciudad en inglés y profesión con artículo. */
const EN_PERSONAS: { name: string; spell: string; country: string; city: string; job: string }[] = [
  { name: "Sofía Marín", spell: "M-A-R-I-N", country: "Mexico", city: "London", job: "a programmer" },
  { name: "Diego Ramos", spell: "R-A-M-O-S", country: "Mexico", city: "Manchester", job: "a waiter" },
  { name: "Lucía Ortega", spell: "O-R-T-E-G-A", country: "Spain", city: "Bristol", job: "a nurse" },
  { name: "Carmen Vidal", spell: "V-I-D-A-L", country: "Spain", city: "London", job: "a teacher" },
  { name: "Pablo Serrano", spell: "S-E-R-R-A-N-O", country: "Colombia", city: "Leeds", job: "a student" },
];

// Pesos EN (Spoken se reporta sobre 50, corte 25 = 50%, High Pass 38):
// P1 6×1.5 = 9 · P2 5×3 = 15 · P3 4×3 = 12 · P4 1×14 = 14 → total 50.
export function buildInterviewEn(): InterviewItem[] {
  const persona = pickOne(EN_PERSONAS);
  const fill = (m: string) =>
    m
      .replace("{NAME}", persona.name)
      .replace("{SPELL}", persona.spell)
      .replace("{COUNTRY}", persona.country)
      .replace("{CITY}", persona.city)
      .replace("{JOB}", persona.job);
  const p1: InterviewItem[] = EN_T1_POOL.map((t) => ({
    part: 1,
    question: pickOne(t.variants),
    questionEs: t.qEs,
    model: fill(t.model),
    weight: 1.5,
  }));
  const p2: InterviewItem[] = sample(EN_T2_POOL, 5).map((t) => ({ part: 2, question: t.q, questionEs: t.qEs, model: t.model, weight: 3 }));
  const p3: InterviewItem[] = sample(EN_T3_POOL, 4).map((t) => ({ part: 3, question: t.q, questionEs: t.qEs, model: t.model, weight: 3 }));
  const t4 = pickOne(EN_T4_TOPICS);
  const p4: InterviewItem[] = [{
    part: 4,
    question: `Now, talk about ${t4.topic} for one minute. You have thirty seconds to prepare.`,
    questionEs: `Habla ~1 minuto sobre ${t4.es}, con frases cortas que ya sabes — suma frases, no te pares. Primero: 30 segundos de preparación.`,
    model: t4.model,
    weight: 14,
    prep: 30,
  }];
  return [...p1, ...p2, ...p3, ...p4];
}

export const entrevistaEnA1: InterviewConfig = {
    cefr: "a1",
    levelLabel: "A1",
    resultId: INTERVIEW_EN_ID,
    homeHref: "/idioma/en",
    langTag: "en",
    chip: (p) => `Spoken · Part ${p}`,
    intro:
      "El Spoken del LanguageCert ESOL A1 con sus 4 partes y pesos reales: presentación con deletreo (9 pts), situaciones cotidianas (15 pts), preguntas que haces TÚ (12 pts) y un minuto de tema con 30 s de preparación (14 pts). Cada sesión cambia preguntas, situaciones y tema. Responde EN VOZ ALTA primero — hablar es el examen — y escribe lo que dijiste",
    placeholder: "Escribe tu respuesta en inglés...",
    totalPts: 50,
    passPct: 50,
    passTitle: "Pass — aprobarías el Spoken",
    failTitle: "Todavía no — el corte es 50%",
    doneTail: "con los pesos del examen real (corte 50%, High Pass desde 38/50). Repítela: cada sesión trae preguntas, situaciones y tema distintos.",
    build: buildInterviewEn,
};
