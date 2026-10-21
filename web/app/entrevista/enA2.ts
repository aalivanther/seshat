// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import { pickOne, sample } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

/* ══════════════ INGLÉS A2 — LanguageCert ESOL A2 Access Spoken ══════════════
   Cuatro partes, ~9 min, 50 pts, corte 50%. No es el A1: aquí hay pasado,
   going to y un tema más largo. Los pools NO reutilizan EN_T1/T2/T3/T4. */

const EN_A2_T1: { variants: string[]; qEs: string; model: string }[] = [
  { variants: ["Where did you live last year?", "Where were you living last year?"], qEs: "Dónde vivías el año pasado — pasado, no el presente del A1.", model: "Last year I lived in a small flat in London, near Amy." },
  { variants: ["What did you do last weekend?", "Tell me about last weekend."], qEs: "El fin de semana pasado, en pasado simple.", model: "Last weekend I visited Nora and we had tea. Then I went to the park with Ben." },
  { variants: ["Where did you go on your last holiday?", "Where did you go last summer?"], qEs: "Las últimas vacaciones: went, not go.", model: "Last summer I went to Bogotá to see my family. We ate a lot and I walked in the city every day." },
  { variants: ["What did you study at school?", "What subjects did you like at school?"], qEs: "El colegio, en pasado. No preguntes la profesión actual.", model: "I studied history and English. I liked English because of the stories." },
  { variants: ["Who did you see yesterday?", "Who did you meet last week?"], qEs: "A quién viste — did + verbo base.", model: "Yesterday I saw Sam at the café. We talked for ten minutes." },
  { variants: ["What was the weather like last Sunday?", "What was the weather like on your last trip?"], qEs: "El tiempo EN PASADO: was, not is.", model: "It was cloudy and a bit cold. It rained in the afternoon, so we stayed inside." },
];

const EN_A2_T2: { q: string; qEs: string; model: string }[] = [
  { q: "You missed the last bus home. What did you do?", qEs: "Situación en pasado: qué hiciste, no qué harías en abstracto.", model: "I missed the last bus, so I walked to the next stop and I took a night bus. It took longer, but I got home." },
  { q: "You are going to visit a friend tomorrow. Tell me your plan. Use 'going to'.", qEs: "Planes con going to — el A2 los pide, el A1 no.", model: "I'm going to meet Amy at ten. We're going to walk to the market, and then we're going to cook at home." },
  { q: "You want to change a T-shirt in a shop. It is too small. What do you say? Use 'could'.", qEs: "Petición educada con could, no can you open the window.", model: "Excuse me, could I change this T-shirt, please? It's too small. I have the receipt here." },
  { q: "You broke a glass at Mr Patel's shop. What did you say to him?", qEs: "Un accidente en la tienda de Mr Patel: disculpa en pasado.", model: "I'm really sorry, Mr Patel. I dropped a glass near the door. I'll pay for it." },
  { q: "A neighbour's music was too loud last night. What did you say to her the next morning?", qEs: "Queja educada sobre anoche, no 'open the window'.", model: "Good morning. I'm sorry to bother you. The music last night was very loud, and I couldn't sleep. Could you play it quieter next time?" },
  { q: "You are going to cook for Amy tonight. What are you going to make, and why?", qEs: "going to + motivo. Un plan concreto, no 'I like cooking'.", model: "I'm going to make rice and chicken. Amy finishes late at the hospital, so I want something warm and easy." },
];

const EN_A2_T3: { q: string; qEs: string; model: string }[] = [
  { q: "Ask me what I did last weekend.", qEs: "Preguntas TÚ, en pasado. No copies «Ask me about my job».", model: "What did you do last weekend?" },
  { q: "Ask me where I went on holiday last year.", qEs: "Where did you go… — el auxiliar did no puede faltar.", model: "Where did you go on holiday last year?" },
  { q: "Ask me who I went with.", qEs: "Who did you go with?", model: "Who did you go with?" },
  { q: "Ask me what film I saw last month.", qEs: "Pasado: what film did you see…", model: "What film did you see last month?" },
  { q: "Ask me what I am going to do next Sunday.", qEs: "Planes: going to, no el presente del A1.", model: "What are you going to do next Sunday?" },
  { q: "Ask me why I liked the party.", qEs: "Why did you like… — pide un motivo.", model: "Why did you like the party?" },
];

const EN_A2_T4: { topic: string; es: string; model: string }[] = [
  {
    topic: "a trip you took",
    es: "un viaje que hiciste",
    model:
      "Last year I went to Brighton with Amy for two days. We took the train in the morning and walked along the sea. I ate fish and chips and I took a lot of photos. In the evening we found a cheap hotel near the station. The next day it rained, so we sat in a café and talked. I liked the trip because it was simple and I didn't spend much money. I want to go again next spring.",
  },
  {
    topic: "a film you saw",
    es: "una película que viste",
    model:
      "Last month I saw a film at home with Sam. It was a comedy about two friends in a big city. I liked it because the story was simple and I understood most of the words. After the film we cooked pasta and we talked about a similar day we had at work. I don't go to the cinema often — it's expensive — but I like watching a film on a quiet Sunday.",
  },
  {
    topic: "a celebration you went to",
    es: "una celebración a la que fuiste",
    model:
      "In December I went to Nora's birthday in our building. There were about ten people. I brought a cake from Mr Patel's shop, and Ben came after his last bus. We ate, we talked, and someone played music from a phone. I liked it because it was small. I didn't need to dress up. I went home at ten because I had English class the next morning.",
  },
  {
    topic: "a day that went wrong",
    es: "un día que salió mal",
    model:
      "Last Tuesday everything went wrong. I got up late, I missed Ben's bus, and I arrived at class after the start. Then it rained and I had no jacket. In the afternoon I lost my gloves on the train. At home Amy made tea and I laughed about it. It was a bad day, but it was also a good story. Now I set two alarms.",
  },
];

// P1 4×2.5 = 10 · P2 4×3 = 12 · P3 4×3 = 12 · P4 16 → 50.
export function buildInterviewEnA2(): InterviewItem[] {
  const p1 = sample(EN_A2_T1, 4).map((t) => ({
    part: 1,
    question: pickOne(t.variants),
    questionEs: t.qEs,
    model: t.model,
    weight: 2.5,
  }));
  const p2 = sample(EN_A2_T2, 4).map((t) => ({ part: 2, question: t.q, questionEs: t.qEs, model: t.model, weight: 3 }));
  const p3 = sample(EN_A2_T3, 4).map((t) => ({ part: 3, question: t.q, questionEs: t.qEs, model: t.model, weight: 3 }));
  const t4 = pickOne(EN_A2_T4);
  const p4: InterviewItem[] = [{
    part: 4,
    question: `Now, talk about ${t4.topic} for about a minute and a half. You have thirty seconds to prepare.`,
    questionEs: `Habla ~1,5 minutos sobre ${t4.es}. Pasado y alguna frase de cierre. Primero: 30 segundos de preparación.`,
    model: t4.model,
    weight: 16,
    prep: 30,
  }];
  return [...p1, ...p2, ...p3, ...p4];
}

export const entrevistaEnA2: InterviewConfig = {
    cefr: "a2",
    levelLabel: "A2",
    resultId: interviewResultId("en", "a2"),
    homeHref: "/idioma/en",
    langTag: "en",
    chip: (p) => `Spoken · Part ${p}`,
    intro:
      "El Spoken del LanguageCert ESOL A2 Access: unos 9 minutos, 50 puntos, corte 50%. Cuatro partes: presentación en pasado, situaciones (pasado, planes con going to, peticiones con could), preguntas que haces TÚ, y un tema de minuto y medio con 30 s de preparación. No es el A1.",
    placeholder: "Escribe tu respuesta en inglés...",
    totalPts: 50,
    passPct: 50,
    passTitle: "Pass — aprobarías el Spoken A2",
    failTitle: "Todavía no — el corte es 50%",
    doneTail: "con los pesos del A2 Access (corte 50%, High Pass desde 38/50). Repítela: cambian las preguntas, las situaciones y el tema.",
    build: buildInterviewEnA2,
};
