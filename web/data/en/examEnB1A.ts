import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// LanguageCert Achiever Set A — simulacro completo del LanguageCert
// International ESOL B1 Achiever (Written: Listening + Reading + Writing,
// ~2h40, y Spoken: 12 min). Variante A de tres simulacros paralelos (A/B/C),
// cada uno con un dominio temático exclusivo para no solaparse: ESTE cubre
// SOLO viajes (un concurso de viajes ganado) + situación laboral (entrevista,
// horario, queja de trabajo). Salud/ocio/relaciones y educación/tecnología/
// medio ambiente/compras van en las variantes B y C.
//
// Hilo narrativo (mismo protagonista en las cuatro destrezas, a propósito):
// Valeria gana un concurso de viajes con Ben, vuelve inspirada y consigue un
// nuevo trabajo como Travel Coordinator — así el Listening 3 (el concurso),
// el Reading 4 (su relato) y el Speaking 4 (contar la experiencia) encajan
// como capítulos de la misma historia, en vez de temas sueltos.
//
// Mapeo oficial → motor de Seshat, Teil por Teil:
//   Listening 1 (7 frases sueltas, "¿qué contestarías?")  → 7× hoeren-mc independientes
//   Listening 2 (3 conversaciones × 2 preguntas)           → hoeren-group ×3 (dialog:true), 2 hoeren-mc dentro de cada uno
//   Listening 3 (dictado de 1-3 palabras en una ficha)     → hoeren-group ×1, 7 hoeren-mc dentro (ver ADAPTACIÓN 1)
//   Listening 4 (discusión a 2 voces, 6 MC)                → hoeren-group ×1 (dialog:true), 6 hoeren-mc dentro
//   Reading 1 (5 textos cortos con hueco, MC-3)            → 5× lesen-mc independientes, cada uno con su `text`
//   Reading 2 (6 frases extraídas de un texto, 7 opciones) → lesen-match (ver ADAPTACIÓN 2)
//   Reading 3 (4 textos, 7 preguntas de emparejamiento)    → lesen-match + 3× lesen-mc sueltas (ver ADAPTACIÓN 3)
//   Reading 4 (8 preguntas ABIERTAS sobre un texto largo)  → 8× lesen-mc compartiendo texto (ver ADAPTACIÓN 4)
//   Writing 1 (carta formal, lector público, 3 puntos)     → schreiben-message con stimulus, points_max:12
//   Writing 2 (carta informal, 2 funciones)                → schreiben-message sin stimulus, points_max:12
//   Speaking 1-4                                            → sprechen ×4, teil 1-4, weight:3 cada una
//
// ADAPTACIÓN 1 (Listening Parte 3 — dictado de notas): el examen real pide
// ESCRIBIR de 1 a 3 palabras en cada uno de los 7 huecos de una ficha. El
// motor de Seshat no tiene todavía un ejercicio de dictado libre para
// simulacros, así que —mismo criterio ya documentado y publicado en el
// Listening 4 del A1 inglés (examEnA.ts, "HoerenMC de datos")— cada hueco se
// resuelve por opción múltiple entre tres respuestas de texto corto, una de
// ellas la que de verdad dice el audio. Sigue siendo honesto: el alumno ve el
// aviso en la instrucción de la Parte 3, en español, de que el examen real
// exige escritura libre.
//
// ADAPTACIÓN 2 (Reading Parte 2 — frase insertada): el examen real numera 6
// huecos DENTRO de un texto continuo y da 7 frases sueltas para colocar en su
// sitio (1 sobra). El motor de Seshat no tiene un tipo "frase insertada en su
// lugar" (`examTypes.ts` no lo declara), así que se usa `lesen-match` — el
// mismo mecanismo del Reading/Lesen Teil 3 del B1 alemán (situación ↔
// anuncio) — con una variación: como aquí NO hay situaciones independientes
// sino UN solo texto con 6 huecos, cada "situación" es el texto COMPLETO con
// el hueco que le toca resuelto por el alumno, y las siete frases candidatas
// son los "anuncios" del `lesen-match`. La mecánica de fondo (cohesión,
// pronombres y conectores que enlazan con la frase correcta, un sobrante) es
// exactamente la misma que en el examen real.
//
// ADAPTACIÓN 3 (Reading Parte 3 — emparejamiento con texto repetido): el
// examen real tiene 4 textos y 7 preguntas, así que un mismo texto responde
// a más de una pregunta. El validador de este motor EXIGE que cada anuncio de
// un `lesen-match` sea la respuesta de una única situación (si no, dos
// alumnos con la misma "clave de progreso" se pisarían). Por eso: las 4
// primeras preguntas usan `lesen-match` con un texto distinto cada una, y las
// 3 preguntas que en el examen real repetirían texto se resuelven como
// `lesen-mc` sueltas, citando literalmente la frase del texto que responde —
// mismo contenido, otro envoltorio, sin perder la lógica de "qué texto dice
// esto".
//
// ADAPTACIÓN 4 (Reading Parte 4 — respuesta abierta): el cambio estructural
// más grande del B1 frente al A2 es que las 8 preguntas del texto largo se
// responden por ESCRITO (máximo 3 palabras), no por opción múltiple. El motor
// de Seshat no tiene todavía un tipo de "respuesta libre corta" para Reading
// en simulacros, así que se aproximan como 8 `lesen-mc` que comparten el
// texto (el primer ítem lleva `title`/`text`, el resto no los repite) —
// mismo criterio, documentado, que las adaptaciones 1 y 3.
//
// Gramática y vocabulario: nivel B1 real (present perfect, pasiva simple,
// primer y segundo condicional, relativas). Nada de C1 (cleft sentences,
// inversión tipo "Hardly had I", phrasal verbs de tres piezas, condicionales
// mixtos).
// ─────────────────────────────────────────────────────────────────────────────

/** Rúbrica LanguageCert de Writing (handbook LRW §3.1): CUATRO criterios
 *  literales — Task fulfilment · Accuracy and Range of Grammar · Accuracy and
 *  Range of Vocabulary · Organisation (que aquí mete la puntuación dentro de
 *  la coherencia, a diferencia del español). Bandas 3-2-1-0 en cada criterio:
 *  la banda A de los cuatro suma 12, que es justo lo que vale cada tarea. */
const RUBRIC_WRITING_12: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment — cumplimiento de la tarea",
    help: "¿Tratas los puntos de contenido pedidos (los del stimulus o las dos funciones) y te acercas al número de palabras? El handbook es literal: «candidates do not receive any credit for off-topic responses» — quedarte fuera de tema no baja la banda, la anula.",
    bands: [3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar",
    help: "Variedad de estructuras de B1 (present perfect, condicionales 1-2, relativas, pasiva simple) y que los errores no estorben la comprensión. Un fallo puntual no baja de banda si el mensaje llega igual.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary",
    help: "Vocabulario preciso y variado para el tema (no repetir siempre las mismas cinco palabras) y ortografía razonable. Incluye acertar el registro léxico: fórmulas de carta formal en la Tarea 1, tono de amigo en la Tarea 2.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation — coherencia y puntuación",
    help: "El handbook mete la puntuación DENTRO de este criterio: para un hispanohablante, la coma antes de \"and\", el uso de párrafos y el punto y aparte no son estética, son puntos. Encabezado, cuerpo con los puntos en orden lógico y despedida.",
    bands: [3, 2, 1, 0],
  },
];

export const examEnB1A: ExamSet = {
  id: "en-b1-sim-a",
  level: "b1",
  title: "LanguageCert Achiever Set A",
  description:
    "Simulacro completo del LanguageCert ESOL B1 Achiever: un viaje ganado en un concurso y un cambio de trabajo — de un café a coordinadora de viajes. Doble escucha en las cuatro partes del Listening, Reading fiel al formato oficial y nota Pass/High Pass.",
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
            "You will hear seven short recordings. For each one, choose the best answer, a, b or c. You will hear each recording twice.",
          instructionEs:
            "Escucharás siete grabaciones cortas y sueltas — una afirmación, una explicación, una instrucción o una pregunta. Ojo con la mecánica: no eliges «lo que oyes», eliges QUÉ CONTESTARÍAS. Escuchas cada audio dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-1",
              audio: "I've just come back from a really exciting trip to Peru.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "That sounds amazing!",
                "I'm sorry to hear that.",
                "Can I help you?",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-2",
              audio:
                "Could you tell me what time the coach to the airport leaves?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "It leaves at half past six.",
                "I'm not sure if she can come.",
                "The tickets are quite expensive.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-3",
              audio:
                "I'm afraid I can't come to work tomorrow — I've hurt my back.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Don't worry, get well soon.",
                "That's a great idea!",
                "See you at the airport.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-4",
              audio: "Would you like a window seat or an aisle seat?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "A window seat, please.",
                "Yes, I would.",
                "It's next to the bank.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-5",
              audio:
                "I heard you're applying for a new job at the travel agency.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, I sent my application last week.",
                "It's on the second floor.",
                "The flight was delayed.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-6",
              audio: "Excuse me, is this the queue for the check-in desk?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, it is — we've been waiting for twenty minutes.",
                "No, I don't have any luggage.",
                "It's a lovely city.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1a-h1-7",
              audio: "How was your interview at the hotel this morning?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "I think it went really well, thanks.",
                "I'll book it for Friday.",
                "It's three hours by train.",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Listening · Part 2",
          instruction:
            "You will hear three short conversations. For each conversation, answer two questions. Choose the best answer, a, b or c. You will hear each conversation twice.",
          instructionEs:
            "Escucharás tres conversaciones cortas entre dos personas. De cada una respondes DOS preguntas: tema, propósito, relación entre los hablantes o actitud. Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1a-h2-g1",
              audio:
                "Ben, are you free next weekend? | I think so, why? | I've won two tickets in a travel competition — flights to Edinburgh! | Wow, that's brilliant! When exactly do we fly? | Saturday morning, quite early, and we come back Sunday night. | Perfect, I'll ask my manager for the Saturday morning off.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-1",
                  audio: "",
                  twice: true,
                  question: "Why does Valeria want to go to Edinburgh?",
                  questionEs: "¿Por qué quiere ir Valeria a Edimburgo?",
                  options: [
                    "She won a competition.",
                    "She has a job interview there.",
                    "Her sister lives there.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-2",
                  audio: "",
                  twice: true,
                  question: "What does Ben need to do before the trip?",
                  questionEs: "¿Qué tiene que hacer Ben antes del viaje?",
                  options: [
                    "Buy new luggage.",
                    "Ask his manager for time off.",
                    "Learn some Scottish history.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1a-h2-g2",
              audio:
                "Sam, could you work an extra shift this Saturday? | I'd love to, but I'm going away for the weekend, sorry. | Oh, that's a shame — is it a holiday? | Not really, it's for a work trip — I'm helping at a food festival in Brighton. | That sounds like a great opportunity! | Yes, and Priya, I might have to leave a bit earlier on Friday too, to catch the train.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-3",
                  audio: "",
                  twice: true,
                  question: "Why can't Sam work on Saturday?",
                  questionEs: "¿Por qué no puede trabajar Sam el sábado?",
                  options: [
                    "He's going away for a work trip.",
                    "He's ill.",
                    "He's studying for an exam.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-4",
                  audio: "",
                  twice: true,
                  question: "What does Sam ask Priya?",
                  questionEs: "¿Qué le pide Sam a Priya?",
                  options: [
                    "For a pay rise.",
                    "To leave a bit earlier on Friday.",
                    "For a day off next month.",
                  ],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1a-h2-g3",
              audio:
                "Mr Doyle, could I talk to you about my shifts next week? | Of course, Ben, what's the problem? | I've been given three early shifts in a row, and it's really tiring. | I see — let me check the rota. | Thank you. I don't mind working hard, I just need a bit more rest between shifts. | Leave it with me, I'll change Wednesday's shift for you.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-5",
                  audio: "",
                  twice: true,
                  question: "What is Ben's problem?",
                  questionEs: "¿Cuál es el problema de Ben?",
                  options: [
                    "He has three early shifts in a row.",
                    "He doesn't like his new bus route.",
                    "He wants more money.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h2-6",
                  audio: "",
                  twice: true,
                  question: "What does Mr Doyle agree to do?",
                  questionEs: "¿Qué acepta hacer Mr Doyle?",
                  options: [
                    "Give Ben a day off.",
                    "Change Ben's shift on Wednesday.",
                    "Move Ben to a different bus route.",
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
            "You will hear a radio announcement about a travel writing competition. Complete the notes: choose the correct answer for each gap. You will hear the recording twice.",
          instructionEs:
            "Escucharás un anuncio de radio sobre un concurso de relatos de viajes. El examen real pide ESCRIBIR de 1 a 3 palabras en cada uno de los siete huecos de una ficha de notas; aquí cada hueco se resuelve eligiendo entre tres respuestas cortas. Tienes 60 segundos para leer las siete preguntas antes de escuchar, y el audio se repite dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1a-h3-g1",
              audio:
                "Good afternoon, and welcome back to the show. Today we're talking about the Peterborough Travel Writing Competition, which opens for entries this Monday. The competition is organised by the local newspaper, and this year the theme is 'A Journey That Changed Me'. Writers need to send a story of between five hundred and eight hundred words. The closing date for entries is the thirty-first of October, so there's plenty of time. The first prize is a week's holiday for two people in Portugal, and the two runners-up will each receive a set of travel guidebooks. All entries must be sent by email, not by post, to keep things simple for the judges. Speaking of judges, this year there are three: a travel writer, a photographer, and last year's winner. If you want to enter, you don't need to be a professional writer — the organisers say they're looking for real experiences, not perfect grammar. Good luck to everyone who takes part!",
              dialog: false,
              twice: true,
              readSeconds: 60,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-1",
                  audio: "",
                  twice: true,
                  question: "Name of the competition:",
                  questionEs: "Nombre del concurso: ¿qué falta en la nota?",
                  options: [
                    "Peterborough Travel Writing Competition",
                    "Peterborough Photography Competition",
                    "Peterborough Short Story Competition",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-2",
                  audio: "",
                  twice: true,
                  question: "Opens for entries:",
                  questionEs: "Se abre el plazo: ¿qué falta en la nota?",
                  options: ["This Friday", "This Monday", "Next month"],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-3",
                  audio: "",
                  twice: true,
                  question: "This year's theme:",
                  questionEs: "Tema de este año: ¿qué falta en la nota?",
                  options: [
                    "A Journey That Changed Me",
                    "My Favourite Holiday",
                    "Travelling Alone",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-4",
                  audio: "",
                  twice: true,
                  question: "Length of story:",
                  questionEs: "Extensión del relato: ¿qué falta en la nota?",
                  options: ["300-500 words", "500-800 words", "800-1,000 words"],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-5",
                  audio: "",
                  twice: true,
                  question: "Closing date:",
                  questionEs: "Fecha límite: ¿qué falta en la nota?",
                  options: ["21 October", "31 October", "31 November"],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-6",
                  audio: "",
                  twice: true,
                  question: "First prize:",
                  questionEs: "Primer premio: ¿qué falta en la nota?",
                  options: [
                    "A week's holiday in Portugal for two",
                    "A day trip to Portugal",
                    "A set of travel guidebooks",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h3-7",
                  audio: "",
                  twice: true,
                  question: "Number of judges:",
                  questionEs: "Número de jueces: ¿qué falta en la nota?",
                  options: ["Two", "Three", "Four"],
                  answer: 1,
                },
              ],
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "You will hear a discussion between a radio presenter and a travel journalist about 'workations'. Answer the six questions. Choose the best answer, a, b or c. You will hear the recording twice.",
          instructionEs:
            "Escucharás una discusión entre una presentadora y una periodista de viajes sobre el 'workation' (trabajar mientras viajas). Responde las seis preguntas: idea general, ejemplo, hecho frente a opinión, contraste, actitud y causa-efecto. Escuchas dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1a-h4-g1",
              audio:
                "Laura, more and more people are taking what's called a 'workation' — working from a different country for a few weeks. What do you think of the idea? | I think it can be great, especially for people who work with a computer. You get to see a new place, and you don't need to use all your holiday days. | But isn't it difficult to actually get any work done on a beach? | That's the biggest problem, in my opinion. Some people imagine relaxing by the pool with a laptop, but really you still need a quiet room and a good internet connection, or you get nothing done. | So it's not really a holiday, then? | Not exactly, no — it's still work, just in a nicer place. I always tell people: plan your working hours first, and only then plan the fun part. | And do companies actually allow this? | More than before, yes. A lot of companies now let staff work from abroad for two or three weeks a year, as long as they keep the same hours as the rest of the team.",
              dialog: true,
              twice: true,
              readSeconds: 30,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-1",
                  audio: "",
                  twice: true,
                  question: "What is the main topic of the discussion?",
                  questionEs: "¿Cuál es el tema general de la discusión?",
                  options: [
                    "The advantages and disadvantages of working while travelling",
                    "How to find cheap flights",
                    "The best countries for a holiday",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-2",
                  audio: "",
                  twice: true,
                  question:
                    "According to Laura, who benefits most from a 'workation'?",
                  questionEs:
                    "Según Laura, ¿quién se beneficia más de un 'workation'?",
                  options: [
                    "People who work with a computer",
                    "People who work outdoors",
                    "People who don't like travelling",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-3",
                  audio: "",
                  twice: true,
                  question: "Which of these is Laura's OPINION, not a fact?",
                  questionEs:
                    "¿Cuál de estas frases es OPINIÓN de Laura, no un hecho?",
                  options: [
                    "Some companies let staff work abroad for two or three weeks a year.",
                    "A workation can be a great idea, especially for computer-based jobs.",
                    "A workation means working from a different country.",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-4",
                  audio: "",
                  twice: true,
                  question:
                    "What does Laura say is different between a 'workation' and a real holiday?",
                  questionEs:
                    "¿Qué dice Laura que diferencia un 'workation' de unas vacaciones de verdad?",
                  options: [
                    "A workation still involves doing your normal work.",
                    "A workation is always shorter than a holiday.",
                    "A workation doesn't allow any free time at all.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-5",
                  audio: "",
                  twice: true,
                  question:
                    "What is Laura's attitude towards planning a workation?",
                  questionEs:
                    "¿Cuál es la actitud de Laura sobre planificar un 'workation'?",
                  options: [
                    "Plan the work first, then the fun part.",
                    "Don't make any plans at all.",
                    "Ask your company to plan everything for you.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1a-h4-6",
                  audio: "",
                  twice: true,
                  question: "Why do more companies now allow workations?",
                  questionEs:
                    "¿Por qué permiten hoy más empresas los 'workations'?",
                  options: [
                    "Because staff keep the same working hours as the rest of the team.",
                    "Because it's cheaper for the company.",
                    "Because clients prefer it.",
                  ],
                  answer: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    // ───────────────────────── READING · 80 min ─────────────────────────
    {
      skill: "lesen",
      label: "Reading",
      minutes: 80,
      teile: [
        {
          title: "Reading · Part 1",
          instruction:
            "Read the five short texts. Choose the word or phrase, a, b or c, that best fits the gap in each one.",
          instructionEs:
            "Lee los cinco textos cortos (avisos, mensajes, anuncios) y elige en cada uno la palabra o frase que completa el hueco. Cada texto es independiente.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1a-r1-1",
              title: "Staff notice",
              text:
                "STAFF NOTICE\n\nThe minibus for the Manchester conference leaves at 7 a.m. sharp. Please arrive ___ time, because we cannot wait for late passengers. Bring your ID badge and a notebook.",
              question: "Choose the word that fits the gap.",
              questionEs:
                "Elige la palabra que completa el hueco (aviso de trabajo sobre un viaje en microbús).",
              options: ["on", "in", "at"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r1-2",
              title: "Text message",
              text:
                "Hi! Just landed in Lisbon. Our flight was quite late, so we ___ the connecting train, but we caught another one an hour later. See you Sunday!",
              question: "Choose the word that fits the gap.",
              questionEs:
                "Elige la palabra que completa el hueco (mensaje de texto sobre un vuelo con retraso).",
              options: ["missed", "lost", "forgot"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r1-3",
              title: "Job advertisement",
              text:
                "TRAVEL COMPANY — PART-TIME GUIDE WANTED\n\nMust be friendly, speak good English and be ___ to work at weekends. Apply by email with your CV before Friday.",
              question: "Choose the word that fits the gap.",
              questionEs:
                "Elige la palabra que completa el hueco (anuncio de trabajo de guía turístico).",
              options: ["available", "free", "possible"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r1-4",
              title: "Postcard",
              text:
                "Dear Nora,\n\nGreetings from Rome! The weather has been lovely and we've seen so many beautiful old buildings. Tomorrow we're ___ a boat trip on the river. Speak soon!",
              question: "Choose the phrase that fits the gap.",
              questionEs:
                "Elige la frase que completa el hueco (postal desde Roma).",
              options: ["going on", "doing", "making"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r1-5",
              title: "Staff memo",
              text:
                "MEMO TO ALL STAFF\n\nBecause of building work next week, the office car park will be ___ from Monday to Wednesday. Please use public transport or park on Green Street.",
              question: "Choose the word that fits the gap.",
              questionEs:
                "Elige la palabra que completa el hueco (aviso interno sobre el aparcamiento de la oficina).",
              options: ["closed", "closing", "close"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the text about 'workations'. Six sentences have been removed from it. Choose from sentences A–G the one which fits each gap (1–6). There is one extra sentence which you do not need to use.",
          instructionEs:
            "Lee el artículo sobre el 'workation' (trabajar mientras viajas). Se han quitado seis frases del texto. Elige, entre las siete frases A-G, la que encaja en cada hueco (1-6) — una frase sobra y no se usa en ningún hueco.\n\nEn el examen real los huecos van numerados DENTRO del texto. Aquí ves el texto completo en cada pregunta, con el hueco que te toca señalado. Lo que decide es la cohesión: un pronombre o un conector que solo casa con una frase.",
          items: [
            {
              kind: "lesen-match",
              id: "enb1a-r2",
              ads: [
                {
                  key: "a",
                  text:
                    "Some managers worry that employees relax too much and stop working properly outside the office.",
                },
                {
                  key: "b",
                  text:
                    "It's not always a holiday — it's usually normal work, just somewhere new.",
                },
                {
                  key: "c",
                  text:
                    "A good, fast internet connection is often the most important thing to plan for.",
                },
                {
                  key: "d",
                  text:
                    "She always plans her working hours before booking any sightseeing.",
                },
                {
                  key: "e",
                  text:
                    "Several large companies now allow staff to work from abroad for two or three weeks a year.",
                },
                {
                  key: "f",
                  text:
                    "It lets them keep their job and still see new places at the same time.",
                },
                {
                  key: "g",
                  text:
                    "Others believe the two things — work and travel — should always stay completely separate.",
                },
              ],
              situations: [
                {
                  id: "enb1a-r2-1",
                  situation:
                    "Which sentence fits gap (1)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (1): va justo después de definir qué es un 'workation' y antes de explicar cómo empezó todo. Busca la frase que dice qué es EN REALIDAD un workation, no solo su nombre.",
                  answer: "b",
                },
                {
                  id: "enb1a-r2-2",
                  situation:
                    "Which sentence fits gap (2)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (2): va justo antes de «She works from nine until five». Busca la frase con «She» que anticipa ese hábito de horario fijo.",
                  answer: "d",
                },
                {
                  id: "enb1a-r2-3",
                  situation:
                    "Which sentence fits gap (3)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (3): va justo antes de «Without one...». Busca la frase que menciona algo que se pueda referir con «one» (una cosa contable).",
                  answer: "c",
                },
                {
                  id: "enb1a-r2-4",
                  situation:
                    "Which sentence fits gap (4)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (4): va justo después de «Companies are also changing their rules» y antes de la encuesta. Busca la frase con un ejemplo concreto de ese cambio de normas.",
                  answer: "e",
                },
                {
                  id: "enb1a-r2-5",
                  situation:
                    "Which sentence fits gap (5)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (5): va justo antes de «They argue that...». Busca la frase con un sujeto plural que «They» pueda retomar.",
                  answer: "g",
                },
                {
                  id: "enb1a-r2-6",
                  situation:
                    "Which sentence fits gap (6)?\n\nWORKING AWAY FROM THE OFFICE\n\nMore and more people around the world are trying something called a 'workation' — working normally, but from a different city or country for a few weeks. ___(1)___ For many, it started almost by accident: companies allowed remote work during difficult times, and some staff simply never went back to the office full-time.\n\nA travel writer we spoke to, Laura Bennett, has taken three workations this year alone. ___(2)___ She works from nine until five, just as she would at home, and only explores the new city in the evenings and at weekends.\n\nOf course, a workation isn't only about sitting by a beautiful view with a laptop. ___(3)___ Without one, even the best-planned trip can turn into a stressful week of missed video calls and slow downloads.\n\nCompanies are also changing their rules. ___(4)___ A recent survey found that more than half of office workers would like their company to offer this kind of arrangement.\n\nNot everyone agrees that workations are a good idea, though. ___(5)___ They argue that a real holiday means switching off completely, not answering emails from a hotel room.\n\nStill, for people who love to travel but can't take months off work, the workation offers a middle way. ___(6)___ As Laura puts it: 'You don't need to choose between your job and seeing the world — you just need a good plan.'",
                  situationEs:
                    "Gap (6): va justo antes de la cita final de Laura. Busca la frase que resume la ventaja de «the middle way» que se acaba de nombrar.",
                  answer: "f",
                },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts about business trips. For questions 1–7, decide which text (or texts) each question refers to.",
          instructionEs:
            "Lee los cuatro textos sobre viajes de trabajo y decide a qué texto se refiere cada pregunta.\n\nEn el examen real un mismo texto puede responder a más de una pregunta. Aquí las primeras cuatro van de emparejamiento (una por texto) y las tres últimas, que en el papel oficial repetirían texto, se contestan eligiendo una opción que cita una frase literal del texto correcto. Mismo contenido, otro envoltorio.",
          items: [
            {
              kind: "lesen-match",
              id: "enb1a-r3",
              ads: [
                {
                  key: "a",
                  text:
                    "NOTICE TO ALL STAFF — BUSINESS TRIPS\n\nFrom next month, all staff travelling for work must book flights and hotels through the company website, not by phone or in person. This helps us keep costs down and makes it easier to know where everyone is staying. Please also remember to keep all receipts, even for small things like taxis or coffee, and hand them in within a week of your return. If you have any questions, speak to Priya in the finance office.",
                },
                {
                  key: "b",
                  text:
                    "Hi Priya,\n\nI'm writing about my hotel on the Manchester trip last week. The room I was given hadn't been cleaned properly, and when I called reception nobody answered for over an hour. I know it's not your fault, but could the company please use a different hotel next time? I've attached some photos. I don't want to make a fuss, but I don't think it's acceptable for a two-night stay that cost so much.\nThanks,\nBen",
                },
                {
                  key: "c",
                  text:
                    "TRAVEL COORDINATOR WANTED\n\nA growing travel company is looking for a Travel Coordinator to organise business trips for staff: flights, hotels and local transport. You'll need excellent organisational skills, a good telephone manner, and experience with online booking systems. No travel experience is necessary, as full training is given. This is an office-based role with occasional trips to visit hotel partners. Send your CV to jobs@ — closing date next Friday.",
                },
                {
                  key: "d",
                  text:
                    "Forum post: First business trip — any tips?\n\nI'm going on my first work trip next month, three days in Berlin for a conference. I've never travelled for work before and I'm a bit nervous. What should I pack? Should I arrive the night before? And is it normal to eat alone in the evenings, or do people usually go out together after these events? Any advice from people who do this regularly would be great!",
                },
              ],
              situations: [
                {
                  id: "enb1a-r3-1",
                  situation:
                    "Which text tells you who to contact if you have a question about paying for a trip?",
                  situationEs:
                    "¿Qué texto dice a quién preguntar sobre el pago de un viaje?",
                  answer: "a",
                },
                {
                  id: "enb1a-r3-2",
                  situation:
                    "Which text is written by someone who is not happy with their hotel?",
                  situationEs:
                    "¿Qué texto lo escribe alguien descontento con su hotel?",
                  answer: "b",
                },
                {
                  id: "enb1a-r3-3",
                  situation: "Which text is for someone who wants a new job?",
                  situationEs: "¿Qué texto es para alguien que busca trabajo nuevo?",
                  answer: "c",
                },
                {
                  id: "enb1a-r3-4",
                  situation:
                    "Which text is asking for advice before a first business trip?",
                  situationEs:
                    "¿Qué texto pide consejo antes de un primer viaje de trabajo?",
                  answer: "d",
                },
              ],
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r3-5",
              question:
                "'All staff travelling for work must book flights and hotels through the company website.' Which text says this?",
              questionEs:
                "«Todo el personal que viaje por trabajo debe reservar vuelos y hoteles a través de la web de la empresa.» ¿Qué texto lo dice?",
              options: [
                "The staff notice about business trips",
                "The email about the hotel in Manchester",
                "The forum post asking for advice",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r3-6",
              question:
                "'No travel experience is necessary, as full training is given.' Which text says this?",
              questionEs:
                "«No hace falta experiencia de viajes, porque se da formación completa.» ¿Qué texto lo dice?",
              options: [
                "The job advertisement for a Travel Coordinator",
                "The notice about company travel policy",
                "Ben's email about his hotel",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r3-7",
              question:
                "'Please also remember to keep all receipts... and hand them in within a week of your return.' Which text says this?",
              questionEs:
                "«Recordad también guardar todos los recibos... y entregarlos antes de una semana desde la vuelta.» ¿Qué texto lo dice?",
              options: [
                "The staff notice about business trips",
                "The complaint email about a hotel",
                "The job advertisement",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction:
            "Read the text 'From Café to Travel Agency: My New Adventure'. Answer the eight questions. Choose the best answer, a, b or c.",
          instructionEs:
            "Lee el texto y responde las ocho preguntas.\n\nEn el examen real (Reading Part 4) las ocho respuestas se ESCRIBEN, cortas, máximo tres palabras: es el cambio más grande del B1 respecto al A2. Aquí eliges entre tres opciones. Mismo contenido; en el papel oficial, tú escribes.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1a-r4-1",
              title: "From Café to Travel Agency: My New Adventure",
              text:
                "Two years ago, I would never have imagined myself working somewhere other than Priya's café. I loved my job there — the customers, the free coffee, and Priya herself, who taught me so much about running a small business. But last spring, everything changed.\n\nIt started with a competition. My friend Ben told me about a local newspaper competition: two free flights to Edinburgh for the best short story about a memorable journey. I almost didn't enter — I've never thought of myself as a writer — but Ben persuaded me, and in the end I wrote about the day I arrived in London from Bogotá, five years ago, not knowing a single word of English.\n\nTo my surprise, I won. Ben and I flew to Edinburgh that September, and it turned out to be one of the best weekends of my life. We walked up to the castle, got lost twice in the old town, and ate the best fish and chips either of us has ever had.\n\nWhen I came back, something had changed in me. I kept thinking about how much I'd enjoyed planning the trip — finding the cheapest train, choosing which sights to see, working out the best order to visit them in. A few weeks later, I saw an advertisement for a Travel Coordinator at a small agency near Camden. I almost didn't apply, remembering how nervous I'd been about the writing competition, but I told myself that if I could win a competition I never expected to enter, I could at least try for a job interview.\n\nThe interview was more relaxed than I'd expected. The manager, Mr Andrews, asked me about my trip to Edinburgh and how I'd organised it, rather than testing my knowledge of famous landmarks. I got the job the next day.\n\nI still see Priya every week — she says the café isn't the same without me, though I suspect the new barista makes better coffee than I ever did. My new job isn't always exciting; some days I spend hours checking hotel prices on a screen. But I've already helped three families plan their first trip abroad, and there's something satisfying about that.\n\nBen still teases me about the writing competition, saying I only got the job because of a lucky story. Maybe he's right. But I've learned that sometimes one small, brave decision — entering a competition you don't expect to win — can lead you somewhere you never planned to go.",
              question: "Where did Valeria work before her new job?",
              questionEs: "¿Dónde trabajaba Valeria antes de su nuevo trabajo?",
              options: [
                "At Priya's café",
                "At a travel agency",
                "At a newspaper",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-2",
              question:
                "Why did Valeria decide to enter the writing competition?",
              questionEs:
                "¿Por qué decidió Valeria participar en el concurso de relatos?",
              options: [
                "Ben persuaded her, even though she didn't think of herself as a writer",
                "She had always dreamed of being a writer",
                "She needed the prize money",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-3",
              question: "What was the prize in the competition?",
              questionEs: "¿Cuál era el premio del concurso?",
              options: [
                "Two free flights to Edinburgh",
                "A holiday in Portugal",
                "A job at the newspaper",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-4",
              question: "What did Valeria write her story about?",
              questionEs: "¿Sobre qué escribió Valeria su relato?",
              options: [
                "Her arrival in London from Bogotá",
                "Her job at the café",
                "Her trip to Edinburgh",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-5",
              question:
                "What does Valeria suggest was the connection between the competition and her new job?",
              questionEs:
                "¿Qué sugiere Valeria que conecta el concurso con su nuevo trabajo?",
              options: [
                "Organising the trip made her realise she enjoyed planning journeys",
                "The travel agency was a sponsor of the competition",
                "She met Mr Andrews on the plane to Edinburgh",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-6",
              question:
                "What did the manager, Mr Andrews, ask Valeria about in the interview?",
              questionEs:
                "¿Sobre qué le preguntó el jefe, Mr Andrews, en la entrevista?",
              options: [
                "Her trip to Edinburgh and how she organised it",
                "Her knowledge of famous landmarks",
                "Her opinion of the company's website",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-7",
              question: "How does Valeria feel about her new job?",
              questionEs: "¿Cómo se siente Valeria con su nuevo trabajo?",
              options: [
                "Mostly satisfied, even though it isn't always exciting",
                "Extremely bored and regretful",
                "Certain she wants to return to the café",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1a-r4-8",
              question: "What does Ben say about Valeria getting the job?",
              questionEs: "¿Qué dice Ben sobre que Valeria consiguiera el trabajo?",
              options: [
                "That she only got it because of a lucky story",
                "That she deserved it more than anyone",
                "That he wishes he had applied too",
              ],
              answer: 0,
            },
          ],
        },
      ],
    },
    // ───────────────────────── WRITING · 50 min ─────────────────────────
    {
      skill: "schreiben",
      label: "Writing",
      minutes: 50,
      teile: [
        {
          title: "Writing · Part 1",
          instruction:
            "Read the advertisement and write a letter to the newspaper to enter the competition. Answer all three points. Write 70–100 words.",
          instructionEs:
            "Lee el anuncio y escribe una carta formal al periódico para participar en el concurso. Responde a los tres puntos. Escribe entre 70 y 100 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1a-w1",
              task:
                "You saw this competition in a local newspaper. Write a letter to the newspaper to enter the competition. Write 70–100 words and answer all three points.",
              taskEs:
                "Viste este concurso en un periódico local. Escribe una carta al periódico para participar. Escribe entre 70 y 100 palabras y responde a los tres puntos.",
              stimulus: {
                source: "West London Gazette — competition page",
                text:
                  "TRAVEL COMPETITION! Win a week's holiday for two in Portugal. Just write to us and tell us: where you would like to go on your dream trip, who you would like to take with you, and why this trip would be special for you. The best letter wins! Send your entry to the West London Gazette before the end of the month.",
              },
              points: [
                "Di adónde te gustaría ir en tu viaje soñado",
                "Di con quién te gustaría ir",
                "Explica por qué ese viaje sería especial para ti",
              ],
              words: 85,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "Dear Sir or Madam,\n\nI would like to enter your travel competition. My dream trip would be to Japan, especially Kyoto, because I have always been fascinated by its temples and gardens.\n\nI would like to travel with my sister, Clara, who shares my love of photography and would enjoy the trip just as much as I would.\n\nThis journey would be special because we have never travelled together outside Colombia, and after years of just talking about it, this competition could finally make it happen.\n\nYours faithfully,\nValeria Soto",
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write an email to your friend. Do the two things in the task: describe your new job and invite your friend to celebrate. Write 100–120 words.",
          instructionEs:
            "Escribe un email informal a tu amigo/a que cumpla las dos funciones de la tarea: describe tu nuevo trabajo e invítale a celebrarlo contigo. Escribe entre 100 y 120 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1a-w2",
              task:
                "Your friend has heard that you started a new job. Write an email to your friend. In your email: describe your new job, and invite your friend to celebrate with you. Write 100–120 words.",
              taskEs:
                "Tu amigo/a se ha enterado de que empezaste un trabajo nuevo. Escríbele un email: describe tu nuevo trabajo e invítale a celebrarlo contigo. Escribe entre 100 y 120 palabras.",
              points: [
                "Describe tu nuevo trabajo (qué haces, dónde, con quién)",
                "Invita a tu amigo/a a celebrar contigo (di cuándo y dónde)",
              ],
              words: 110,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "Hi Fiona,\n\nThanks for your message — yes, it's true, I started my new job two weeks ago! I'm working as a Travel Coordinator for a small agency near Camden. My days are quite busy: I book flights and hotels for business trips and help people plan their first holiday abroad. My manager, Mr Andrews, is really friendly, and I already feel part of the team.\n\nI'd love to celebrate with you properly! Are you free on Saturday evening? We could go to that new Italian restaurant on Green Street, or just meet at Sam's café first for a coffee and catch up before dinner.\n\nLet me know what works for you!\n\nLove,\nValeria",
            },
          ],
        },
      ],
    },
    // ───────────────────────── SPEAKING · 12 min ─────────────────────────
    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 12,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction:
            "Introduce yourself, spell your family name, and answer questions about yourself and your opinions.",
          instructionEs:
            "Preséntate, deletrea tu apellido y responde preguntas personales y de opinión, en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "enb1a-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then answer: Where are you from? What do you do (your job or your studies)? Do you like travelling? Why do you think people today like to combine work and travel?",
              promptEs:
                "Di tu nombre y deletrea tu apellido. Luego responde: de dónde eres, a qué te dedicas (trabajo o estudios), si te gusta viajar y por qué crees que hoy en día a la gente le gusta combinar trabajo y viajes — en B1 ya no basta con dar datos, hay que dar tu OPINIÓN.",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. I'm from Bogotá, in Colombia, but I live in London now. I work as a Travel Coordinator for a small travel agency. Yes, I love travelling — I think it's one of the best ways to learn about other cultures. I think more people combine work and travel today because many jobs can be done with just a laptop and an internet connection, so people don't want to stay in one place all year.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction:
            "Respond to the situations. In the last one, start the conversation yourself.",
          instructionEs:
            "Responde a las situaciones y, en la última, inicia tú la conversación.",
          items: [
            {
              kind: "sprechen",
              id: "enb1a-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — You are at a travel agency. The assistant says: 'How can I help you today?' Answer. Situation 2 — Your manager says: 'Could you work an extra shift this Saturday?' Answer, giving a reason if you say no. Situation 3 — Now YOU start: you are at a job interview and you want to know about the working hours. Ask.",
              promptEs:
                "Situación 1: en una agencia de viajes te preguntan en qué pueden ayudarte — responde. Situación 2: tu jefe te pregunta si puedes cubrir un turno extra el sábado — responde, dando un motivo si dices que no. Situación 3: ahora empiezas tú — estás en una entrevista de trabajo y quieres saber el horario. Pregunta.",
              model:
                "1. Hello, I'd like some information about flights to Edinburgh in September, please. — 2. I'm really sorry, I can't this Saturday — I've already arranged to visit my family, but I could work on Sunday instead. — 3. Could you tell me what the usual working hours are for this job?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Look at the two adverts, talk about them, and try to reach an agreement with your partner.",
          instructionEs:
            "Habla de los dos anuncios de viaje descritos e intenta llegar a un acuerdo con tu compañero sobre cuál elegir — en B1 se espera un intento real de acuerdo, no solo describir.",
          items: [
            {
              kind: "sprechen",
              id: "enb1a-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Advert A: a two-week trip to Portugal, all meals included, in a group of twenty people. Advert B: a one-week trip to Scotland, self-catering, in a small group of six people. Talk about the two adverts, say which one you would prefer and why, and try to agree with your partner on which trip to choose.",
              promptEs:
                "Anuncio A: viaje de dos semanas a Portugal, con todas las comidas incluidas, en grupo de veinte personas. Anuncio B: viaje de una semana a Escocia, con cocina propia, en grupo pequeño de seis personas. Habla de los dos anuncios, di cuál prefieres y por qué, e intenta llegar a un acuerdo con tu compañero.",
              model:
                "Advert A offers a longer trip with all meals included, but it's a big group, so it might be less relaxing. Advert B is shorter and smaller, which I usually prefer, but we'd have to cook for ourselves. I think I'd choose Advert B because I like smaller groups and Scotland is somewhere I've always wanted to visit. What do you think — shall we agree on Advert B, then?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "Talk about the topic for 1 minute 30 seconds. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema un minuto y medio seguido. Como en el examen real: 30 segundos para pensar (con papel y lápiz) y 1 minuto 30 hablando.",
          items: [
            {
              kind: "sprechen",
              id: "enb1a-sp4",
              teil: 4,
              weight: 3,
              prepSeconds: 30,
              speakSeconds: 90,
              prompt:
                "Topic: AN EXCITING EXPERIENCE. Talk about an exciting experience you have had, connected to travelling or to work. Say what happened, where you were, who you were with, and why it was exciting.",
              promptEs:
                "Tema: UNA EXPERIENCIA EMOCIONANTE. Habla de una experiencia emocionante relacionada con un viaje o con el trabajo: qué pasó, dónde estabas, con quién y por qué fue emocionante.",
              model:
                "One of the most exciting experiences I've had was winning a travel writing competition last year. I found out by email one evening, and at first I thought it was a mistake! The prize was two flights to Edinburgh, so a few weeks later I travelled there with my friend Ben. We didn't know the city at all, so we got lost twice on the first day, but that was actually part of the fun. We walked up to the castle, tried local food, and talked to people we'd never have met at home. It was exciting because I'd never won anything like that before, and because the whole trip happened by chance — I almost didn't enter the competition at all. Since then, I've felt braver about trying new things, both in my travels and at work.",
            },
          ],
        },
      ],
    },
  ],
};
