import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// Simulacro B — LanguageCert International ESOL B1 Achiever (formato oficial,
// PLAN-EN-B1.md §1.1). Estructura fiel:
//   LISTENING ~30′ · 4 partes · 26 ítems → 7 respuesta funcional · 3×2 diálogo ·
//              1 monólogo con ficha de 7 huecos · 1 discusión de 6 preguntas.
//              TODO se escucha DOS VECES (twice:true en las cuatro partes).
//   READING  dentro de 2h10 con Writing · 4 partes · 26 ítems → 5 textos con
//              hueco · 1 texto de ~250 palabras con 6 frases extraídas (7, 1
//              sobra) · 4 textos ↔ 7 preguntas · 1 texto continuo de 8 preguntas.
//   WRITING  2 tareas · 24 marks (12+12) → 1 carta formal a lector público (3
//              puntos) · 1 carta informal a un amigo (2 funciones). Rúbrica
//              oficial de 4 criterios (handbook LRW §3.1).
//   SPEAKING 12′ · 4 partes de 3′ c/u → info personal + opiniones · situaciones
//              sociales · discusión con apoyo visual y acuerdo · monólogo de
//              1,5′ con 30″ de preparación.
// Baremo: Pass 50 % · High Pass 67 % (75/150 y 101/150 reales) — NO modular:
// LanguageCert compensa entre destrezas dentro del escrito.
//
// DOMINIO TEMÁTICO DE ESTE SET (exclusivo de la variante B): salud (una
// dolencia, una cita médica, un accidente menor) + ocio + relaciones
// personales (amistad, invitación, un desacuerdo que se resuelve con
// acuerdo). Las variantes A y C cubren viaje/trabajo y educación/tecnología/
// medio ambiente/compras — no se tocan aquí.
//
// Mapeo de partes oficiales → tipos del motor, y ADAPTACIONES documentadas:
//   Listening 1 (7 frases sueltas → "¿qué contestarías?")
//     → 7 `hoeren-mc` independientes, cada uno con su propia `audio` (la frase
//       suelta) y las 3 opciones son posibles respuestas, no paráfrasis.
//   Listening 2 (3 diálogos × 2 preguntas)
//     → 3 `hoeren-group` (dialog:true, twice:true), cada uno con 2 `hoeren-mc`
//       dentro (audio:"" porque el audio ya lo trae el grupo).
//   Listening 3 (1 monólogo, ficha de notas con 7 huecos de 1-3 palabras)
//     → `hoeren-notes` (un recado ×2, 7 huecos: el alumno ESCRIBE 1-3 palabras).
//       Mismos ids de hueco que los subítems anteriores (`enb1b-h3-1`…`-7`),
//       para no huérfanas claves. Part 4 NO es notes: sigue siendo discusión.
//   Listening 4 (1 discusión, 6 preguntas)
//     → `hoeren-group` (dialog:true, twice:true) con 6 `hoeren-mc` dentro.
//   Reading 1 (5 textos cortos, cada uno con un hueco)
//     → 5 `lesen-mc` independientes, cada uno con su propio `text` corto.
//   Reading 2 (1 texto ~250 palabras, 6 frases extraídas de 7 candidatas)
//     → `lesen-insert`: un `text` con ___(1)___…___(6)___, `sentences` A–G
//       (una sobra) y `gaps` con los ids que ya eran de las situaciones
//       (`enb1b-r2-1`…`-6`). Contenedor `enb1b-r2`.
//   Reading 3 (4 textos cortos, tema común, 7 preguntas de emparejamiento)
//     → `LesenMatch` con `ads` = los 4 textos (keys a-d, con su `text`) y
//       `situations` = 4 de las 7 preguntas (una por texto: el validador
//       PROHÍBE que una key sea `answer` de dos situaciones). ADAPTACIÓN
//       necesaria para las 3 preguntas sobrantes (con 4 textos y 7 preguntas
//       el reparto 1↔1 no llega): se resuelven como 3 `lesen-mc` sueltos justo
//       después, sin texto propio (los cuatro textos ya están visibles arriba,
//       en el mismo Teil), con 3 opciones "Text A/B/C/D" entre las que elegir.
//   Reading 4 (1 texto continuo ~400 palabras, 8 preguntas abiertas tipo "wh-")
//     → ADAPTACIÓN: el motor no tiene un kind de respuesta libre para lectura.
//       Mismo criterio que en Listening 3: se aproximan como 8 `lesen-mc`
//       (mc-3) que comparten el texto (el primer ítem lleva `title`/`text`,
//       el resto los omite). El examen real exige escribir máximo 3 palabras;
//       aquí se reconoce por opción múltiple.
//   Writing 1 y 2 → `schreiben-message` con `rubric` de 4 criterios oficiales
//       (Task fulfilment · Accuracy and Range of Grammar · Accuracy and Range
//       of Vocabulary · Organisation), bandas [3,2,1,0] → 12 en banda A.
//   Speaking 1-4 → `sprechen` × 4 (NUNCA `sprechen-praesentation`), weight 3
//       las cuatro partes; la parte 4 lleva prepSeconds/speakSeconds.
// ─────────────────────────────────────────────────────────────────────────────

/** Rúbrica oficial de Writing (handbook LRW §3.1): 4 criterios literales,
 *  bandas 3-2-1-0. "Candidates do not receive any credit for off-topic
 *  responses" → Task fulfilment en E anula la tarea entera (fatalE). */
const RUBRIC_WRITING_FORMAL: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment — cumplimiento de la tarea",
    help: "¿Tratas los TRES puntos de contenido con claridad, en el registro formal que pide un lector público (Dear Sir or Madam / Yours faithfully si no hay nombre)? Tema equivocado o menos de la mitad de las palabras = E, y aquí E son 0 puntos en toda la tarea: el examen real no da ningún crédito a una respuesta fuera de tema.",
    bands: [3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar — gramática",
    help: "Rango (¿solo presente simple, o también condicionales, relativas, pasiva cuando toca?) y precisión (¿los errores estorban la comprensión?).",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary — vocabulario y ortografía",
    help: "Variedad léxica (no repetir las mismas cinco palabras) y precisión, incluida la ortografía. Las fórmulas de cortesía formales (I am writing in response to…) cuentan aquí.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation — coherencia Y puntuación",
    help: "Saludo, cuerpo con los puntos en orden lógico y despedida a juego con el saludo; conectores reales (however, in addition, therefore) y puntuación correcta — el handbook mete la puntuación DENTRO de este criterio, no es solo estética.",
    bands: [3, 2, 1, 0],
  },
];

/** Misma rúbrica oficial que arriba, con el "help" adaptado al registro
 *  informal de la Tarea 2 (carta a un amigo, con DOS funciones a cumplir). */
const RUBRIC_WRITING_INFORMAL: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment — cumplimiento de la tarea",
    help: "¿Cumples las DOS funciones pedidas (p. ej. explicar + sugerir) en un registro informal de verdad (contracciones, Hi/Love, nada de Dear Sir)? Tema equivocado o menos de la mitad de las palabras = E = 0 puntos en toda la tarea.",
    bands: [3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar — gramática",
    help: "Rango del nivel (present perfect, pasado, condicional 1, relativas) y precisión suficiente para no interrumpir la lectura.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary — vocabulario y ortografía",
    help: "Vocabulario cotidiano y expresiones de carta informal (Hope you're OK, Let me know, Lots of love) usadas con naturalidad, no traducidas del español.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation — coherencia Y puntuación",
    help: "Saludo y despedida informales a juego, ideas enlazadas (so, but, because, after that) y puntuación cuidada — cuenta como parte de este criterio, no aparte.",
    bands: [3, 2, 1, 0],
  },
];

export const examEnB1B: ExamSet = {
  id: "en-b1-sim-b",
  level: "b1",
  title: "LanguageCert Achiever Set B",
  description:
    "Simulacro completo del LanguageCert International ESOL B1 Achiever: salud, ocio y relaciones personales — una cita médica, un accidente menor, un club nuevo y un desacuerdo que se resuelve con acuerdo. Doble escucha en las cuatro partes del Listening y nota oficial Pass/High Pass; hay compensación entre destrezas del escrito (no es un examen modular).",
  scoring: {
    passPct: 50,
    highPassPct: 67,
    bands: [
      { min: 67, label: "High Pass" },
      { min: 50, label: "Pass" },
      { min: 0, label: "Fail" },
    ],
  },
  sections: [
    // ───────────────────────── LISTENING · ~30 min ─────────────────────────
    {
      skill: "hoeren",
      label: "Listening",
      minutes: 30,
      teile: [
        {
          title: "Listening · Part 1",
          instruction:
            "Listen to seven short recordings. For each one, choose the best response (a, b or c). You will hear each recording twice.",
          instructionEs:
            "Escucha siete frases sueltas. Para cada una, elige la respuesta MÁS ADECUADA (a, b o c) — no lo que has entendido, sino qué contestarías. Escuchas cada una dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-1",
              audio: "I've had a terrible headache since this morning.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Why don't you take some paracetamol?",
                "I go to the gym every day.",
                "The film starts at eight.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-2",
              audio: "Would you like to come to the cinema with us on Friday?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "I'd love to, thanks!",
                "I'm sorry to hear that.",
                "It's next to the chemist's.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-3",
              audio: "I'm really sorry I forgot your birthday.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Don't worry about it, honestly.",
                "I've broken my arm.",
                "See you at six o'clock.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-4",
              audio: "Please take this prescription to the pharmacy on the corner.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Okay, I'll go there now.",
                "I love playing tennis.",
                "We had a great time.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-5",
              audio: "My ankle's been swollen since I fell off my bike yesterday.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "That sounds painful — have you seen a doctor?",
                "I really enjoy reading in my free time.",
                "We're meeting at the café at five.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-6",
              audio: "Have you and Ben made up after your argument?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, we talked it through and we're fine now.",
                "It starts at half past seven.",
                "I've never been to Scotland.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1b-h1-7",
              audio: "I can't come swimming today because I've hurt my shoulder.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "No problem, get well soon!",
                "I'll have the chicken, please.",
                "It's on the second floor.",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Listening · Part 2",
          instruction:
            "Listen to three short conversations. Answer two questions about each one by choosing the correct option (a, b or c). You will hear each conversation twice.",
          instructionEs:
            "Escucha tres conversaciones cortas. Responde dos preguntas por cada una (tema, propósito, relación o actitud). Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1b-h2-g1",
              audio:
                "Good morning, Riverside Health Centre. | Hello, I'd like to make an appointment with Dr Ellis, please. My name's Valeria Soto. | Certainly. Is it urgent? | Not urgent, but I've had a sore throat for four days and it isn't getting better. | I can offer you two thirty this afternoon. | That's perfect, thank you very much.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g1-1",
                  audio: "",
                  twice: true,
                  question: "Why is Valeria calling?",
                  questionEs: "¿Por qué llama Valeria?",
                  options: [
                    "To ask about a job at the health centre",
                    "To book a doctor's appointment",
                    "To cancel an appointment",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g1-2",
                  audio: "",
                  twice: true,
                  question: "How does Valeria describe her symptoms?",
                  questionEs: "¿Cómo describe Valeria sus síntomas?",
                  options: [
                    "She's had a sore throat for four days.",
                    "She's broken her arm.",
                    "She feels perfectly fine.",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1b-h2-g2",
              audio:
                "Ben, are you free on Saturday afternoon? | I think so — why? | There's a new exhibition at the museum. Do you fancy it? | I'd rather do something outdoors, to be honest. | We could go for a bike ride instead, then. | That sounds much better. Let's do that.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g2-1",
                  audio: "",
                  twice: true,
                  question: "What does Ben suggest instead of the museum?",
                  questionEs: "¿Qué propone Ben en vez del museo?",
                  options: [
                    "Going to the cinema",
                    "Going for a bike ride",
                    "Staying at home",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g2-2",
                  audio: "",
                  twice: true,
                  question: "How does Ben feel about the museum idea?",
                  questionEs: "¿Qué opina Ben de ir al museo?",
                  options: [
                    "He'd prefer to do something outdoors.",
                    "He has already been there.",
                    "He thinks it's too expensive.",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1b-h2-g3",
              audio:
                "You look upset, Amy. Is everything all right? | Not really. I had a disagreement with a colleague at work today. | What happened? | She said my notes weren't finished properly, but that wasn't true. | Did you talk to her about it? | Yes, in the end we sat down and sorted it out. We even agreed to check each other's notes from now on.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g3-1",
                  audio: "",
                  twice: true,
                  question: "Why was Amy upset?",
                  questionEs: "¿Por qué estaba disgustada Amy?",
                  options: [
                    "She had a disagreement with a colleague.",
                    "She missed the bus to work.",
                    "She lost her keys.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h2-g3-2",
                  audio: "",
                  twice: true,
                  question: "How did Amy and her colleague solve the problem?",
                  questionEs: "¿Cómo resolvieron el problema Amy y su compañera?",
                  options: [
                    "They stopped talking to each other.",
                    "They talked and reached an agreement.",
                    "A manager separated them.",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },
        {
          title: "Listening · Part 3",
          instruction:
            "You will hear a talk about a community event. Complete the notes with 1–3 words. You will hear the talk twice.",
          instructionEs:
            "Vas a oír una charla sobre un evento del barrio. Completa la ficha de notas: de 1 a 3 palabras por hueco. Escuchas la charla dos veces.",
          items: [
            {
              kind: "hoeren-notes",
              id: "enb1b-h3",
              twice: true,
              title: "Community Wellbeing Day — notes",
              titleEs: "Día de bienestar del barrio — ficha",
              audio:
                "Good morning, and thanks for tuning in. Today I want to tell you about a new event at Riverside Leisure Centre called Community Wellbeing Day. It's happening on Saturday the fourteenth of June, from ten in the morning until four in the afternoon. " +
                "The idea behind the day is simple: to bring health and leisure together under one roof. There will be free blood pressure checks in the small hall, given by nurses from the local surgery, and a physiotherapist will be giving free advice about common sports injuries in Room 2. " +
                "For anyone who just wants to relax and have fun, there's a full programme of activities too: a gentle yoga class at eleven o'clock, a table tennis tournament at half past twelve, and a family swimming session in the afternoon. " +
                "Entry to the centre is free all day, but the swimming session costs two pounds per person. If you'd like more information, you can call the centre on oh two oh seven, nine four six, two two one oh — or just turn up on the day. Everyone's welcome, and you don't need to book in advance.",
              gaps: [
                {
                  id: "enb1b-h3-1",
                  prompt: "Event location:",
                  promptEs: "Lugar del evento:",
                  answers: [
                    "Riverside Leisure Centre",
                    "Leisure Centre",
                    "the Leisure Centre",
                  ],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-2",
                  prompt: "Date:",
                  promptEs: "Fecha:",
                  answers: [
                    "14 June",
                    "14th June",
                    "14th of June",
                    "fourteenth of June",
                    "the 14th June",
                    "Saturday 14 June",
                  ],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-3",
                  prompt: "Opening hours:",
                  promptEs: "Horario:",
                  answers: [
                    "10-4",
                    "10 to 4",
                    "10 until 4",
                    "ten until four",
                    "ten to four",
                    "10-4pm",
                  ],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-4",
                  prompt: "Blood pressure checks given by:",
                  promptEs: "Las revisiones de tensión las hacen:",
                  answers: ["nurses", "the nurses", "local nurses"],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-5",
                  prompt: "Physiotherapist's advice — room:",
                  promptEs: "Consejo del fisioterapeuta — sala:",
                  answers: ["Room 2", "room 2", "2"],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-6",
                  prompt: "Yoga class time:",
                  promptEs: "Hora de la clase de yoga:",
                  answers: [
                    "11 o'clock",
                    "eleven o'clock",
                    "11",
                    "11 am",
                    "eleven",
                  ],
                  maxWords: 3,
                },
                {
                  id: "enb1b-h3-7",
                  prompt: "Swimming session cost:",
                  promptEs: "Precio de la sesión de natación:",
                  answers: ["£2", "2 pounds", "two pounds", "2"],
                  maxWords: 3,
                },
              ],
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "Listen to a discussion between two speakers. Answer the six questions by choosing the correct option (a, b or c). You will hear the discussion twice.",
          instructionEs:
            "Escucha una discusión entre dos personas. Responde seis preguntas (tema general, hechos, opinión, ejemplo y actitud). Escuchas la discusión dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1b-h4",
              audio:
                "Tessa: Callum, I've just joined a running club, and honestly, it's changed my life. | Callum: Really? I've always thought clubs like that were a bit strange, if I'm honest. | Tessa: I used to think that too, but I'd just moved to a new area and I didn't know anyone. | Callum: I suppose it's harder to meet people once you're not at school or university any more. | Tessa: Exactly. And running together every week means you actually get to know people, not just chat for five minutes. | Callum: That's fair. I've heard the same about book clubs, actually — my sister joined one after she was ill for a while, and she made some really good friends. | Tessa: See, that's exactly my point. It doesn't matter what the activity is — running, books, anything — it's the 'every week' part that builds the friendship. | Callum: You've convinced me. Maybe I'll look for something myself, though I'm still not sure running is for me!",
              dialog: true,
              twice: true,
              readSeconds: 45,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-1",
                  audio: "",
                  twice: true,
                  question: "What is the general topic of the conversation?",
                  questionEs: "¿De qué tratan en general?",
                  options: [
                    "Whether hobby clubs help people make friends",
                    "The cost of gym membership",
                    "How to train for a marathon",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-2",
                  audio: "",
                  twice: true,
                  question: "Why did Tessa join a running club?",
                  questionEs: "¿Por qué se apuntó Tessa a un club de running?",
                  options: [
                    "She wanted to train for a competition.",
                    "She'd just moved and didn't know anyone.",
                    "Her doctor told her to exercise.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-3",
                  audio: "",
                  twice: true,
                  question:
                    "What was Callum's opinion of clubs like that before this conversation?",
                  questionEs: "¿Qué opinaba Callum antes de esta conversación?",
                  options: [
                    "He thought they were a good idea.",
                    "He thought they were a bit strange.",
                    "He had never thought about them.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-4",
                  audio: "",
                  twice: true,
                  question: "What example does Callum give about his sister?",
                  questionEs: "¿Qué ejemplo da Callum sobre su hermana?",
                  options: [
                    "She started a running club herself.",
                    "She joined a book club after being ill and made friends.",
                    "She stopped going to any clubs.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-5",
                  audio: "",
                  twice: true,
                  question: "According to Tessa, what really builds friendship?",
                  questionEs: "Según Tessa, ¿qué es lo que de verdad crea amistad?",
                  options: [
                    "Doing the same activity every week",
                    "Choosing exactly the right hobby",
                    "Meeting people only once",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1b-h4-6",
                  audio: "",
                  twice: true,
                  question: "What is Callum's attitude by the end of the conversation?",
                  questionEs: "¿Cómo acaba pensando Callum?",
                  options: [
                    "He's been convinced to try something himself.",
                    "He still completely disagrees with Tessa.",
                    "He decides to join the running club immediately.",
                  ],
                  answer: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    // ───────────────────────── READING ─────────────────────────
    {
      skill: "lesen",
      label: "Reading",
      minutes: 80,
      teile: [
        {
          title: "Reading · Part 1",
          instruction:
            "Read the five short texts. Choose the word or phrase (a, b or c) that best fits the space in each one.",
          instructionEs:
            "Lee los cinco textos cortos. Elige la palabra o frase (a, b o c) que mejor encaja en el hueco de cada uno.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1b-r1-1",
              text: "Notice at Riverside Leisure Centre: “The Tuesday evening yoga class ___ cancelled this week, as the instructor is unwell. The class will run as usual next Tuesday.”",
              question: "Choose the word or phrase that best fits the gap.",
              questionEs:
                "Elige la palabra o frase que encaja en el hueco (pasiva: la clase ES cancelada).",
              options: ["has been", "have been", "having been"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r1-2",
              text: "Message from Amy: “Hi Valeria, I heard you're feeling a bit ___ today — I've left some tea and biscuits by your door. Let me know if you need anything else! Amy”",
              question: "Choose the word or phrase that best fits the gap.",
              questionEs: "Elige la palabra que encaja (ojo al prefijo un-).",
              options: ["unwell", "unwelcome", "unusual"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r1-3",
              text: "Sign at the GP surgery reception: “If you arrive more than ten minutes late for your appointment, you ___ be asked to rebook for another day.”",
              question: "Choose the word or phrase that best fits the gap.",
              questionEs: "Elige el modal correcto (posibilidad).",
              options: ["may", "did", "have"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r1-4",
              text: "Advert in the local paper: “New walking group starting this month for anyone who ___ like to get fitter and meet new people in the area. All welcome — no experience needed!”",
              question: "Choose the word or phrase that best fits the gap.",
              questionEs: "Elige el modal correcto (oferta educada: anyone who would like to…).",
              options: ["would", "should", "must"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r1-5",
              text: "Notice at the cinema box office: “Riverside Leisure Centre members get a 20% discount on tickets ___ they show their membership card at the till.”",
              question: "Choose the word or phrase that best fits the gap.",
              questionEs: "Elige el conector correcto (condición).",
              options: ["as long as", "because", "but"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the article. Six sentences have been removed. Choose from sentences a-g the one which fits each space (1)-(6). There is one extra sentence which you do not need to use.",
          instructionEs:
            "Lee el artículo. Se han quitado seis frases. Elige entre las frases a-g la que encaja en cada hueco (1) a (6). Sobra una frase que no necesitas usar.",
          items: [
            {
              kind: "lesen-insert",
              id: "enb1b-r2",
              title: "Small steps to feeling better",
              text:
                "Most of us know that regular exercise and time with friends make us feel better, but knowing it and doing it are two different things.\n\n" +
                "For Maria Alves, a nurse from Leeds, the turning point came after a minor accident left her with a sprained ankle and several weeks off her usual five-a-side football. ___(1)___\n\n" +
                "“At first I was quite low,” she says. “I couldn't do the thing that usually kept me sane.” ___(2)___ She started going for short, gentle walks with her neighbour, who had recently retired and was often at home during the day.\n\n" +
                "“We began with just ten minutes around the block,” Maria explains. ___(3)___ By the time her ankle was better, they were walking for nearly an hour, and she looked forward to it every day.\n\n" +
                "Doctors often say that the social side of exercise matters just as much as the physical side. ___(4)___\n\n" +
                "Maria's advice for anyone feeling stuck is simple: start small, and don't do it alone. ___(5)___ “You don't need a gym membership or a new hobby,” she says. “You just need someone to walk with.”\n\n" +
                "___(6)___ Six months on, Maria is back playing football twice a week — and she still walks with her neighbour every Sunday morning, injury or no injury.",
              sentences: [
                {
                  key: "a",
                  text: "She decided to try something completely different.",
                },
                {
                  key: "b",
                  text: "The story doesn't end there, though.",
                },
                {
                  key: "c",
                  text: "The two of them soon became good friends.",
                },
                {
                  key: "d",
                  text: "It can also help you make friends you might never otherwise have met.",
                },
                {
                  key: "e",
                  text: "So she had to find another way to stay active and see people.",
                },
                {
                  key: "f",
                  text: "Some experts even recommend joining a gym for the equipment alone.",
                },
                {
                  key: "g",
                  text: "It grew from there, slowly but surely.",
                },
              ],
              gaps: [
                { id: "enb1b-r2-1", answer: "e" },
                { id: "enb1b-r2-2", answer: "a" },
                { id: "enb1b-r2-3", answer: "g" },
                { id: "enb1b-r2-4", answer: "d" },
                { id: "enb1b-r2-5", answer: "c" },
                { id: "enb1b-r2-6", answer: "b" },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts about local health and leisure services. Answer the questions by choosing which text (a, b, c or d) matches each one.",
          instructionEs:
            "Lee los cuatro textos sobre servicios locales de salud y ocio. Responde a qué texto (a, b, c o d) corresponde cada pregunta.\n\nLas cuatro primeras van de emparejamiento (una por texto). Las tres últimas preguntan lo mismo sobre esos cuatro textos, en opción múltiple: en el examen real un texto puede repetir.",
          items: [
            {
              kind: "lesen-match",
              id: "enb1b-r3-match",
              ads: [
                {
                  key: "a",
                  text: "RIVERSIDE WALK-IN CLINIC — no appointment needed. Open Monday to Friday, 9 am to 6 pm, and Saturday mornings from 9 am to midday. We can help with minor injuries, coughs and colds, skin problems and simple health checks. If your problem is more serious, please call 999 or go to the nearest hospital. Please bring some form of ID. Waiting times are usually shorter early in the morning. The clinic is on the ground floor of the Riverside Leisure Centre, next to the reception desk.",
                },
                {
                  key: "b",
                  text: "MEMBERS' SURVEY — HELP US IMPROVE. We'd love to know what you think of Riverside Leisure Centre! Please take five minutes to answer a few short questions about the classes you attend, how friendly you find the staff, and whether you've made new friends here. Everyone who completes the survey before the end of the month will be entered into a prize draw for a free month's membership. You can fill it in online or leave a paper copy at reception.",
                },
                {
                  key: "c",
                  text: "Dear Priya, I hope you're feeling a bit better after such a busy few weeks at the café. I know things have been busy and stressful there lately. Have you thought about joining that walking group at Riverside? I went for the first time last Sunday and it really helped me switch off. There's also a helpline number on their noticeboard if you ever just want to talk to someone. Let me know if you fancy coming along next week — I'd love the company. Take care, Sam",
                },
                {
                  key: "d",
                  text: "Booking confirmation: Gentle Movement class. Thank you for booking a place on our Gentle Movement class, designed for people recovering from injury or getting back into exercise after a break. Your class is on Thursday at 11 am in Studio 2. Please arrive ten minutes early and wear comfortable clothing. If you need to cancel, please let us know at least 24 hours in advance so someone else can take your place. We look forward to seeing you there!",
                },
              ],
              situations: [
                {
                  id: "enb1b-r3-1",
                  situation: "Which text says you don't need to book an appointment?",
                  situationEs: "¿Qué texto dice que no hace falta pedir cita?",
                  answer: "a",
                },
                {
                  id: "enb1b-r3-2",
                  situation:
                    "Which text mentions a prize for people who take part?",
                  situationEs: "¿Qué texto menciona un premio para quien participe?",
                  answer: "b",
                },
                {
                  id: "enb1b-r3-3",
                  situation: "Which text is a personal message from a friend?",
                  situationEs: "¿Qué texto es un mensaje personal de un amigo?",
                  answer: "c",
                },
                {
                  id: "enb1b-r3-4",
                  situation: "Which text tells you what to wear to a class?",
                  situationEs: "¿Qué texto dice qué ponerse para una clase?",
                  answer: "d",
                },
              ],
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r3-5",
              question:
                "Which text explains what to do if you can't attend a booked class?",
              questionEs: "¿Qué texto explica qué hacer si no puedes ir a una clase reservada?",
              options: ["Text A", "Text C", "Text D"],
              answer: 2,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r3-6",
              question:
                "Which text mentions a helpline you could call if you want to talk to someone?",
              questionEs: "¿Qué texto menciona un teléfono de ayuda para hablar con alguien?",
              options: ["Text B", "Text C", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r3-7",
              question: "Which text asks whether you have made new friends?",
              questionEs: "¿Qué texto pregunta si has hecho nuevos amigos?",
              options: ["Text A", "Text B", "Text D"],
              answer: 1,
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction:
            "Read the text. Answer the eight questions by choosing the correct option (a, b or c).",
          instructionEs:
            "Lee el texto y responde ocho preguntas (a, b o c).\n\nEn el examen real se ESCRIBEN ocho respuestas cortas, máximo tres palabras. Aquí eliges entre tres opciones. Mismo contenido; en el papel oficial, tú escribes.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1b-r4-1",
              title: "Back on Her Feet: A Local Nurse's Story",
              text:
                "Amy Wright has worked as a nurse in London for six years, and she is used to helping other people recover from illness and injury. Last spring, however, she found herself on the other side of the desk.\n\n" +
                "It happened on a Sunday afternoon. Amy was hurrying to catch a bus when she slipped on a wet pavement near her flat and twisted her ankle badly. “I heard a horrible crack, and I just sat down on the pavement,” she remembers. “I actually laughed at first, because it felt so unlike me — I'm the one who usually looks after everyone else.”\n\n" +
                "A neighbour helped her home, and the next morning Amy went to the walk-in clinic near where she lives. The doctor told her it wasn't broken, but that she would need to rest it for at least six weeks and avoid the long walks she usually enjoyed with her flatmate at the weekend.\n\n" +
                "Six weeks without exercise turned out to be harder than Amy expected. “I've always used walking and running to switch off after a busy shift,” she says. “Without it, I felt quite low, and I didn't really know what to do with my evenings.”\n\n" +
                "Looking for something she could do while her ankle healed, Amy joined an online book club that had been advertised on a noticeboard at her local leisure centre. She was nervous at first, worried that everyone else would already know each other. In fact, most members were new too, and the group's first book happened to be about a nurse working through a difficult year — which made Amy laugh when she recognised the coincidence.\n\n" +
                "Six months later, Amy's ankle is completely better, and she has gone back to her weekend walks. But she has kept the book club as well. “It's strange,” she admits, “but this injury introduced me to some of my closest friends here in London.”\n\n" +
                "Her advice to anyone recovering from a minor injury is simple: use the quiet time to try something new. “You don't know what you'll discover,” she says, “or who you'll meet along the way.”",
              question: "What is Amy's job?",
              questionEs: "¿Cuál es el trabajo de Amy?",
              options: ["A nurse", "A doctor", "A physiotherapist"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-2",
              question: "How did Amy hurt her ankle?",
              questionEs: "¿Cómo se hizo daño en el tobillo?",
              options: [
                "She fell down some stairs.",
                "She slipped on a wet pavement.",
                "She hurt it playing football.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-3",
              question:
                "What did the doctor at the walk-in clinic tell Amy?",
              questionEs: "¿Qué le dijo el médico en la clínica?",
              options: [
                "That her ankle was broken.",
                "That she needed to rest it for at least six weeks.",
                "That she should go straight to hospital.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-4",
              question:
                "How did Amy feel during the weeks without exercise?",
              questionEs: "¿Cómo se sintió Amy sin poder hacer ejercicio?",
              options: [
                "Quite low, without her usual routine.",
                "Relieved to have a rest.",
                "Angry with her neighbour.",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-5",
              question: "Why did Amy join the book club?",
              questionEs: "¿Por qué se apuntó Amy al club de lectura?",
              options: [
                "A friend from the hospital invited her.",
                "She saw it advertised while looking for something to do during her recovery.",
                "Her flatmate was already a member.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-6",
              question: "What happened when Amy started the book club?",
              questionEs: "¿Qué ocurrió al empezar en el club de lectura?",
              options: [
                "She already knew most of the other members.",
                "Most members were new too, and the first book was about a nurse.",
                "She left after the first meeting.",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-7",
              question:
                "What does Amy say the injury gave her, in the end?",
              questionEs: "¿Qué dice Amy que le trajo la lesión, al final?",
              options: [
                "A permanent limp",
                "Some of her closest friends in London",
                "A new job",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb1b-r4-8",
              question:
                "What is Amy's advice for people recovering from a minor injury?",
              questionEs: "¿Qué consejo da Amy a quien se recupera de una lesión leve?",
              options: [
                "Rest completely and see nobody.",
                "Use the quiet time to try something new.",
                "Go back to exercise as soon as possible.",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    // ───────────────────────── WRITING ─────────────────────────
    {
      skill: "schreiben",
      label: "Writing",
      minutes: 50,
      teile: [
        {
          title: "Writing · Task 1",
          instruction:
            "Read the notice and write a letter. Write 70–100 words. Include all three points.",
          instructionEs:
            "Lee el aviso y escribe una carta formal de 70-100 palabras. Responde a los tres puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1b-w1",
              task:
                "You see this notice in a community magazine: “RIVERSIDE COMMUNITY CENTRE — VOLUNTEERS WANTED. We are looking for friendly volunteers to visit elderly people in the area who live alone, for a chat, a cup of tea, or a short walk together. No experience necessary. Please write to us and tell us which days and times you are free, why you would like to help, and any experience you have of spending time with older people. The Volunteer Coordinator.” Write a formal letter (70–100 words).",
              taskEs:
                "Ves este aviso en una revista del barrio: buscan voluntarios para visitar a personas mayores que viven solas. Escribe una carta FORMAL (70-100 palabras) al coordinador de voluntarios.",
              points: [
                "Di qué días y horas tienes libres",
                "Explica por qué quieres ayudar",
                "Cuenta alguna experiencia (aunque sea pequeña) con personas mayores",
              ],
              model:
                "Dear Sir or Madam,\nI am writing about your notice asking for volunteers to visit elderly people nearby. I am free on Tuesday and Thursday afternoons, and also Saturday mornings, so I could visit whenever it suits best.\nI would like to help because my own elderly neighbour often seems lonely, and I believe a short visit or walk can really brighten someone's day. I have no formal experience, but I regularly visit my grandmother, who lives alone, and always enjoy spending time with her.\nI look forward to hearing from you.\nYours faithfully,\nValeria Soto",
              words: 85,
              points_max: 12,
              stimulus: {
                source: "Community magazine notice",
                text:
                  "RIVERSIDE COMMUNITY CENTRE — VOLUNTEERS WANTED. We are looking for friendly volunteers to visit elderly people in the area who live alone, for a chat, a cup of tea, or a short walk together. No experience necessary — just some free time and a bit of patience! If you are interested, please write to us telling us: which days and times you are free, why you would like to help, and any experience you have of spending time with older people. We look forward to hearing from you.\nThe Volunteer Coordinator, Riverside Community Centre",
              },
              rubric: RUBRIC_WRITING_FORMAL,
            },
          ],
        },
        {
          title: "Writing · Task 2",
          instruction:
            "Write an email to your friend. Write 100–120 words. Make sure you do both things asked.",
          instructionEs:
            "Escribe un email informal a un amigo de 100-120 palabras. Cumple las DOS funciones pedidas.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1b-w2",
              task:
                "Your friend Ben invited you to his birthday barbecue last Saturday, but you couldn't go because you had a small accident and hurt your wrist. Write an email to Ben (100–120 words): explain what happened and suggest another day to celebrate together.",
              taskEs:
                "Ben te invitó a su barbacoa de cumpleaños el sábado pasado, pero no pudiste ir porque tuviste un pequeño accidente y te hiciste daño en la muñeca. Escríbele un email (100-120 palabras): explica qué pasó y sugiere otro día para celebrarlo juntos.",
              points: [
                "Explica qué pasó (el accidente / la muñeca)",
                "Sugiere otro día o plan para celebrar juntos",
              ],
              model:
                "Hi Ben,\nI'm so sorry I missed your birthday barbecue on Saturday! I felt terrible about it, but I fell off my bike on Friday evening and hurt my wrist quite badly. I spent most of Saturday at the walk-in clinic, waiting to get it checked!\nThe good news is it's not broken, just badly bruised, and it's already starting to feel better. I really didn't want to miss celebrating with you, so how about we meet next weekend instead? We could go for a pizza on Friday evening, or if you'd rather do something more active, we could try that new bowling place near the station.\nLet me know what sounds good!\nLots of love,\nValeria",
              words: 110,
              points_max: 12,
              rubric: RUBRIC_WRITING_INFORMAL,
            },
          ],
        },
      ],
    },
    // ───────────────────────── SPEAKING ─────────────────────────
    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 12,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction:
            "Introduce yourself and answer personal questions, including your opinions.",
          instructionEs:
            "Preséntate y responde preguntas personales, incluidas de opinión — en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "enb1b-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then answer: Where do you live? What do you do to stay healthy? What do you usually do in your free time? Tell me about a good friend of yours — who are they, and why are they a good friend?",
              promptEs:
                "Di tu nombre y deletrea tu apellido — con los nombres ingleses de las letras. Luego responde: dónde vives, qué haces para mantenerte sano/a, qué haces en tu tiempo libre y háblame de un buen amigo/a — quién es y por qué lo consideras buen amigo/a.",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. I live in Camden, in London. To stay healthy, I try to go for a walk every day and I don't eat too much sugar. In my free time, I like reading and swimming. My best friend is Amy — she's my flatmate, and she's a good friend because she always listens, and she's especially kind when I'm not feeling well.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction: "Respond to two social situations. Then start a conversation yourself.",
          instructionEs:
            "Responde a dos situaciones sociales y, en la tercera, inicia tú la conversación.",
          items: [
            {
              kind: "sprechen",
              id: "enb1b-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — You are at the doctor's reception and the receptionist asks: “How can I help you today?” Explain why you are there. Situation 2 — A friend says: “I'm really sorry, but I can't come to your party — I've hurt my back.” Respond to them. Situation 3 — Now YOU start: invite a friend to try a new exercise class with you next week.",
              promptEs:
                "Situación 1: en la recepción del médico te preguntan en qué pueden ayudarte — explica por qué estás allí. Situación 2: un amigo te dice que no puede ir a tu fiesta porque se ha hecho daño en la espalda — respóndele. Situación 3: ahora empiezas tú — invita a un amigo a probar una clase de ejercicio nueva contigo la semana que viene.",
              model:
                "1. Good morning. I'd like to see a doctor, please — I've had a sore throat for a few days and it isn't getting better. — 2. Oh no, I'm sorry to hear that! Don't worry about the party, just look after yourself and get well soon. — 3. Hey, there's a new dance class starting at the leisure centre next week — do you fancy coming with me?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Discuss the two pictures with your partner and try to reach an agreement.",
          instructionEs:
            "Comenta las dos imágenes con tu compañero e intentad llegar a un acuerdo.",
          items: [
            {
              kind: "sprechen",
              id: "enb1b-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Look at the two pictures. Picture A shows a quiet afternoon at home: a friend who has just recovered from a minor injury, sitting on the sofa with a cup of tea and a book, soft light through the window. Picture B shows an active afternoon outdoors: two friends walking in a park on a sunny day, laughing together. Your friend has just recovered from a minor injury and is still a little tired. Discuss with your partner which afternoon would be better for your friend, giving reasons for and against each option, and try to reach an agreement on what to suggest.",
              promptEs:
                "Mira las dos imágenes. Imagen A: una tarde tranquila en casa — un amigo que acaba de recuperarse de una lesión leve, en el sofá con té y un libro. Imagen B: una tarde activa al aire libre — dos amigos paseando por un parque soleado, riendo. Vuestro amigo acaba de recuperarse de una lesión leve y todavía está algo cansado. Discutid qué tarde le vendría mejor, dando razones a favor y en contra de cada opción, e intentad llegar a un acuerdo sobre qué proponerle.",
              model:
                "I think picture A might be better at first, because your friend has just recovered and might still feel tired — a quiet afternoon means they can rest if they need to. On the other hand, a gentle walk in the park, like in picture B, could also do them good, as long as it isn't too tiring. Maybe we could suggest a short walk and then relaxing at home afterwards — that way we get a bit of both. What do you think? Shall we agree on that plan?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "Talk about the topic for 90 seconds. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema durante 1 minuto y medio. Como en el examen real: 30 segundos para preparar y 90 hablando (usa un reloj).",
          items: [
            {
              kind: "sprechen",
              id: "enb1b-sp4",
              teil: 4,
              weight: 3,
              prepSeconds: 30,
              speakSeconds: 90,
              prompt:
                "Topic: AN EXCITING EXPERIENCE. Ideas: What was the experience? When and where did it happen? Who were you with? Why was it exciting? How did you feel afterwards?",
              promptEs:
                "Tema: UNA EXPERIENCIA EMOCIONANTE. Ideas: qué pasó, cuándo y dónde, con quién estabas, por qué fue emocionante y cómo te sentiste después. 30 segundos para preparar, 90 hablando.",
              model:
                "One exciting experience I remember was a weekend trip to the coast with my friend Amy last summer. We planned it for weeks, and when we finally got there, the weather was perfect. We went swimming in the sea for the first time in years, and in the evening we walked along the beach and talked for hours. I felt really happy and relaxed afterwards, and it reminded me how important it is to make time for the people you care about.",
            },
          ],
        },
      ],
    },
  ],
};
