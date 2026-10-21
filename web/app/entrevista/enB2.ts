// Pools y textos del examinador de esta partitura. Apartados del
// player y del baremo: si vuelven a page.tsx, el archivo deja de poder abrirse.

import { interviewResultId } from "@/lib/ids";
import type { InterviewConfig, InterviewItem } from "./tipos";

export function buildInterviewEnB2(): InterviewItem[] {
  return [
    {
      part: 1,
      question:
        "Should a city keep libraries open after nine, even if the audience is small? Give a reason and an example. Spell your family name first.",
      questionEs: "Part 1: opinión con ejemplo. Deletrea el apellido. No es el dato del A1: hay que argumentar.",
      model:
        "My name is Valeria Soto, S-O-T-O. I think late opening is worth it. Shift workers can't come at four. In my street the Tuesday evening slot is the only hour a night-bus driver can sit down with a book. Scale isn't the same as use.",
      weight: 8,
    },
    {
      part: 2,
      question:
        "Situation 1 — A colleague says: 'Your report is late again.' Respond with a reason and a repair, polite register. Situation 2 — YOU start: at the council desk, you need a replacement bin lid. Ask.",
      questionEs: "Part 2: una respuesta y una que inicias tú. Registro.",
      model:
        "1. I'm sorry it's late. I waited for the figures from estates; I'll send a one-page version by four and the full note tomorrow. — 2. Good morning. The lid on the green caddy cracked in the frost. Could you tell me how to order a replacement and how long it takes?",
      weight: 10,
    },
    {
      part: 3,
      question:
        "WRITTEN PROMPT: A small street fund, £2,400. Option 1: two benches. Option 2: a bike shelter. Option 3: one extra lamp. Agree a PLAN and what you would measure after a month.",
      questionEs: "15 minutos de preparación del papel. El apoyo es un texto. Hay que salir con un plan y un dato a medir. Escribe lo que hayas dicho.",
      model:
        "I wouldn't spend it all on benches — they get used if people already stop. The lamp covers the corner where the last bus drops people. The shelter is nicer but needs a key and someone to lock it. Shall we take the lamp this year and count how many people wait there after nine? If the corner stays empty, we revisit the shelter. That's a one-month trial, not a permanent choice.",
      weight: 14,
      prep: 900,
    },
    {
      part: 4,
      question: "Talk for two minutes: \"A time you changed your mind about a neighbour.\" 30 seconds to plan: fact, why it shifted, what you do now.",
      questionEs: "Part 4: dos minutos. Esquema: hecho · por qué cambiaste · qué haces ahora.",
      model:
        "I used to think the man upstairs was rude because he never said hello. Then the lift broke and he carried Mrs Khan's shopping up four floors without making a speech about it. What changed was seeing the work, not the greeting. Now I hold the door and I don't score people on the stairs.",
      weight: 12,
      prep: 30,
    },
    {
      part: 4,
      question: "Follow-up: Would you rather have a friendly building or a quiet one? Why?",
      questionEs: "Pregunta de seguimiento: ¿edificio amable o silencioso?",
      model:
        "Quiet first, then friendly. If you can't sleep, you don't meet anyone well. A lamp on the corner does more for friendliness than a party in the hall.",
      weight: 6,
    },
  ];
}

export const entrevistaEnB2: InterviewConfig = {
    cefr: "b2",
    levelLabel: "B2",
    resultId: interviewResultId("en", "b2"),
    homeHref: "/idioma/en",
    langTag: "en",
    chip: (p) => `Spoken · Part ${p}`,
    intro:
      "El Spoken del LanguageCert B2 Communicator: opiniones, dos roles con registro, un PLAN sobre un texto (15 minutos de preparación del papel) y dos minutos de tema. Corte 50%, High Pass 38/50. Ensayas en voz alta; la nota sale de lo que escribes. No hay micrófono.",
    placeholder: "Escribe tu respuesta en inglés...",
    totalPts: 50,
    passPct: 50,
    passTitle: "Pass — aprobarías el Spoken B2",
    failTitle: "Todavía no — el corte es 50%",
    doneTail: "con los pesos del B2 Communicator. El Part 3 se aprueba si hay plan, no si solo hay opinión.",
    build: buildInterviewEnB2,
};
