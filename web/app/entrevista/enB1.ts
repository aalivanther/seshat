// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import { pickOne, sample } from "@/lib/shuffle";
import type { InterviewConfig, InterviewItem } from "./tipos";

/* ══════════════ INGLÉS B1 — LanguageCert ESOL B1 Achiever Spoken ══════════════
   12 min, 4 partes, monólogo ~90 s con 30 s de prep. No es el A1 (datos),
   ni el A2 (pasado simple), ni el B2 (congestion charge / skill as an adult). */

const EN_B1_T1: { q: string; qEs: string; model: string }[] = [
  { q: "Some people prefer working from home. What's your view, and why?", qEs: "Opinión corta con un motivo — no basta un dato.", model: "It depends on the job. I like a couple of days at home because I can think. But I also need people around me, otherwise I delay everything." },
  { q: "Do you think cities should have more bike lanes? Why?", qEs: "Postura + razón. El Part 1 del B1 no es «where do you live».", model: "Yes, I do. Bike lanes make short trips safer, and they take pressure off the buses. That said, they only work if drivers actually respect them." },
  { q: "Is it better to learn a language in class or by living in the country? Why?", qEs: "Comparar dos opciones y elegir, con un porque.", model: "Living in the country is faster for everyday phrases. A class is better for the mistakes you don't hear. I'd want both: class twice a week and the rest in shops and on the bus." },
  { q: "Should shops open on Sundays? What's your opinion?", qEs: "Opinión de adulto, no un sí seco.", model: "I think small shops should, because that's when a lot of us actually have time. Big chains can stay shut one day — staff need a pause too." },
  { q: "Why do so many adults find it hard to make new friends in a new city?", qEs: "Pide una explicación, no tu número de amigos.", model: "Work takes the evenings, and people already have their groups. You need a repeating reason to meet — a class, a team, a neighbour like Nora — otherwise it's just hello in the lift." },
  { q: "Is social media more useful or more stressful for you? Why?", qEs: "Elige un lado y sosténlo un turno.", model: "More useful, if I keep it small. I use it to arrange things with Amy and Ben. When I start scrolling news, it becomes noise, so I delete the apps on Sundays." },
  { q: "Some people say adults don't need hobbies. Do you agree?", qEs: "Acuerdo o desacuerdo con un ejemplo.", model: "I disagree. Work is not a personality. A hobby gives you something to talk about that isn't your shift or your inbox." },
  { q: "How important is it to speak the language of the country you live in? Why?", qEs: "Opinión con consecuencia práctica.", model: "It's important if you want a normal life: the GP, the landlord, the bus when it changes. A few phrases get you through the shop; without the rest you stay on the outside of a lot of rooms." },
];

const EN_B1_T2_RESPOND: { q: string; qEs: string; model: string }[] = [
  { q: "I'm a tourist. I start: «Excuse me, is there a pharmacy near here that's still open?» You respond. Be helpful and clear.", qEs: "Role-play: TÚ respondes. Registro educado, indicaciones útiles.", model: "There's one on the high street, about four minutes from here. Cross at the lights, then it's on the left, next to Mr Patel's shop. I think it closes at eight." },
  { q: "I'm your neighbour Nora. I start: «Could you water my plants next week? I'm away.» You respond. Accept or offer an alternative.", qEs: "Respondes a Nora: sí, o un plan B si no puedes.", model: "Of course I can. I'll do Tuesday and Friday after work. If I'm late, Amy has a spare key — I'll ask her to cover one evening." },
  { q: "I'm Mr Patel. I start: «You left a bag here yesterday. Can you describe it?» You respond.", qEs: "Identificas tu bolsa con detalle, sin inventar un incidente de portátil.", model: "Yes — it's a dark green backpack, a bit worn on one strap, with a blue water bottle in the side pocket. There's a Spanish novel inside. That's mine." },
];

const EN_B1_T2_INITIATE: { q: string; qEs: string; model: string }[] = [
  { q: "You're in a café. The coffee is cold. You start — polite but clear. The waiter is listening.", qEs: "TÚ empiezas. Queja con registro: firme, no grosero.", model: "Excuse me — sorry to bother you. This coffee is cold. Could I have a fresh one, please?" },
  { q: "Ben has been waiting for you at the bus stop for twenty minutes. You start.", qEs: "Llegas tarde: tú abres, te disculpas y propones qué hacer ahora.", model: "Ben, I'm really sorry — the previous bus was cancelled. Thanks for waiting. Shall we get the next one, or do you want to walk? I'll get the tickets." },
  { q: "You need to swap a late shift with Amy. You start. She's your flatmate, so keep it warm but specific.", qEs: "TÚ inicias un intercambio de turno: día, hora, qué ofreces a cambio.", model: "Amy, could I ask a favour? Could you take my Thursday late shift? I can do your Saturday morning. I'll owe you dinner either way." },
];

const EN_B1_T3: { q: string; qEs: string; model: string }[] = [
  {
    q: "Read this note and reach a PLAN, not just an opinion.\n\nOur class has £120 and one Saturday. Options:\n• a cooking workshop with a local chef (£15 each, 8 people)\n• a river walk and picnic (cheap, weather risk)\n• a small museum with a guided tour (£12 each)\n• staying in and watching a documentary (free, less social)\n\nAgree on WHAT, WHEN, WHO organises it, and what you do if it rains.",
    qEs: "Texto de apoyo: hay que salir con un plan (qué, cuándo, quién, plan B). Una opinión no puntúa.",
    model:
      "The cooking workshop uses the money well and everyone leaves with something. If eight people sign up, that's the budget gone, so we cap it. Shall we say Saturday at eleven, I book the chef today, and you collect the names by Thursday? If we don't get eight, we switch to the museum — indoor, so rain isn't a problem.",
  },
  {
    q: "Read this note and reach a PLAN, not just an opinion.\n\nThe community centre asked our building for one Saturday morning. Options:\n• food-bank sorting (indoor, 3 hours)\n• reading with children (needs two people who like kids)\n• a park clean-up (weather, gloves provided)\n• helping Nora run the tea table (easy, less visible)\n\nAgree on WHICH job, WHO goes, WHEN you meet, and a backup if someone drops out.",
    qEs: "Voluntariado del edificio: decidid tarea, quién, hora y recambio. No basta «está bien».",
    model:
      "I'd go for the food bank — it's indoor and three hours is realistic. You and I can both do it; Amy has a shift. Let's meet at nine outside the centre. If one of us wakes up ill, we text Nora and she can put us on the tea table instead, so the centre isn't left short.",
  },
  {
    q: "Read this note and reach a PLAN, not just an opinion.\n\nA friend is visiting for one weekend. Budget: not much. Options:\n• street market Saturday morning\n• a free concert in the park (evening, standing)\n• a long walk along the canal\n• cooking at home with Amy and Ben\n\nAgree on a Saturday plan AND a Sunday plan, including a bad-weather version.",
    qEs: "Fin de semana con visita: sábado y domingo, y qué pasa si llueve.",
    model:
      "Saturday morning the market — cheap and busy — then the concert if it stays dry. Sunday we cook at home with Amy and Ben, so the visitor actually meets people. If it rains Saturday, we swap: canal walk cancelled, market still on under the roof, and we eat earlier. I'll book nothing that charges a deposit.",
  },
];

const EN_B1_T4: { topic: string; es: string; model: string }[] = [
  {
    topic: "a change in your town",
    es: "un cambio en tu ciudad",
    model:
      "They turned the side street next to our building into a cut-through. Ben's buses are more punctual, which I like, but the pavement is narrower and Nora finds it hard to walk to the shop. I understand they wanted traffic to move. What I'd like is a slower speed limit and a bench at the corner — not to reverse the change, just to make it liveable. That's the kind of compromise a street can actually do.",
  },
  {
    topic: "learning a language as an adult",
    es: "aprender un idioma de adulto",
    model:
      "I started English properly after I already had a job. That's different from school: nobody marks your homework, and you feel silly in shops. What helped was a repeating slot — class twice a week — and then forcing the same phrases at Mr Patel's counter. The plateau is real: you can buy bread and still freeze in a meeting. My rule now is one uncomfortable conversation a day, even if it's only asking for a form again. Adults don't need talent; they need a calendar.",
  },
  {
    topic: "a problem at work",
    es: "un problema en el trabajo",
    model:
      "The problem wasn't the tasks, it was the late changes. A shift would move after I'd already arranged English class, and I didn't know how to say no without sounding ungrateful. I asked for a fixed two evenings off and offered to cover Saturday mornings instead. It wasn't a big speech. It was one conversation, written down after, so both of us remembered. The work is still busy, but I can plan a week now.",
  },
];

// P1 4×2.5 = 10 · P2 2×6 = 12 · P3 14 · P4 14 → 50.
export function buildInterviewEnB1(): InterviewItem[] {
  const p1 = sample(EN_B1_T1, 4).map((t) => ({ part: 1, question: t.q, questionEs: t.qEs, model: t.model, weight: 2.5 }));
  const respond = pickOne(EN_B1_T2_RESPOND);
  const initiate = pickOne(EN_B1_T2_INITIATE);
  const p2: InterviewItem[] = [
    { part: 2, question: respond.q, questionEs: respond.qEs, model: respond.model, weight: 6 },
    { part: 2, question: initiate.q, questionEs: initiate.qEs, model: initiate.model, weight: 6 },
  ];
  const plan = pickOne(EN_B1_T3);
  const p3: InterviewItem[] = [{ part: 3, question: plan.q, questionEs: plan.qEs, model: plan.model, weight: 14 }];
  const t4 = pickOne(EN_B1_T4);
  const p4: InterviewItem[] = [{
    part: 4,
    question: `Talk for about a minute and a half: "${t4.topic}". You have 30 seconds to plan.`,
    questionEs: `Monólogo ~90 s sobre ${t4.es}. Treinta segundos de preparación. Encadena: qué / por qué / un ejemplo / cierre.`,
    model: t4.model,
    weight: 14,
    prep: 30,
  }];
  return [...p1, ...p2, ...p3, ...p4];
}

export const entrevistaEnB1: InterviewConfig = {
    cefr: "b1",
    levelLabel: "B1",
    resultId: interviewResultId("en", "b1"),
    homeHref: "/idioma/en",
    langTag: "en",
    chip: (p) => `Spoken · Part ${p}`,
    intro:
      "El Spoken del LanguageCert ESOL B1 Achiever: 12 minutos en cuatro partes, 50 puntos, corte 50%. Opiniones cortas, role-play (respondes y empiezas), llegar a un PLAN con un texto de apoyo, y un monólogo de minuto y medio con 30 s de preparación.",
    placeholder: "Escribe tu respuesta en inglés...",
    totalPts: 50,
    passPct: 50,
    passTitle: "Pass — aprobarías el Spoken B1",
    failTitle: "Todavía no — el corte es 50%",
    doneTail: "con los pesos del B1 Achiever (corte 50%, High Pass desde 38/50). El Part 3 se aprueba si hay plan, no si solo hay opinión.",
    build: buildInterviewEnB1,
};
