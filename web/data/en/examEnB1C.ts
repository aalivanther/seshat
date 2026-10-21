import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// LanguageCert Achiever Set C — simulacro completo del LanguageCert
// International ESOL B1 Achiever (formato verificado en PLAN-EN-B1.md §1.1).
// Examen COMPENSATORIO (a diferencia del Goethe B1 alemán): Listening, Reading
// y Writing se SUMAN, sin mínimo por destreza — por eso `scoring` NO lleva
// `modular: true`.
//
// Dominio EXCLUSIVO de este set (no lo comparten los sets A/B del mismo drop):
// educación (escolarización, un curso, un examen) + tecnología/medios
// (comunicación, entretenimiento) + compras/medio ambiente (shopping, the
// natural world). Escenas de Valeria Soto, Amy Wright, Ben Carter, Sam, Nora y
// Priya Shah (CANON.md); los papeles menores (Grace, Daniel Ferris, Vincent
// Bray...) son secundarios nuevos, no listados en CANON.md.
//
// Mapeo oficial → motor, Teil por Teil:
//   Listening 1 (7, frase suelta → responder)     → 7 × hoeren-mc sueltos
//   Listening 2 (3 conversaciones × 2 preguntas)   → hoeren-group × 3 (dialog),
//                                                     2 hoeren-mc dentro c/u
//   Listening 3 (1 monólogo, ficha de 7 huecos)    → hoeren-group × 1, con 7
//                                                     hoeren-mc dentro (ver
//                                                     ADAPTACIÓN 1 abajo)
//   Listening 4 (1 discusión, 6 preguntas)         → hoeren-group × 1 (dialog),
//                                                     6 hoeren-mc dentro
//   Reading 1 (5 textos cortos con hueco)          → 5 × lesen-mc sueltos
//   Reading 2 (texto ~250p, 6 frases extraídas)    → 1 × lesen-match (ver
//                                                     ADAPTACIÓN 2 abajo)
//   Reading 3 (4 textos, 7 preguntas de matching)  → 1 × lesen-match (4) + 3 ×
//                                                     lesen-mc sueltos (ver
//                                                     ADAPTACIÓN 3 abajo)
//   Reading 4 (texto ~400p, 8 preguntas)           → 8 × lesen-mc compartiendo
//                                                     texto (ver ADAPTACIÓN 4)
//   Writing 1 (formal, 70-100p, 3 puntos)          → schreiben-message + rubric
//   Writing 2 (informal, 100-120p, 2 funciones)    → schreiben-message + rubric
//   Speaking 1-4                                   → sprechen × 4 (weight 3)
//
// ADAPTACIONES documentadas (honestas: el examen real pide otra cosa y el
// motor no tiene el tipo de ejercicio que lo resolvería sin aproximar):
//
//   1. Listening Part 3 (ficha de notas, 1-3 palabras por hueco): el motor no
//      tiene un kind de "escribir al dictado". Mismo criterio que el
//      Listening 4 del A1 (`examEnA.ts`, ya documentado allí como "HoerenMC de
//      datos"): cada hueco se resuelve por opción múltiple de 3, una de ellas
//      literalmente lo que se oye. Se pierde la exigencia de ORTOGRAFÍA del
//      examen real; se conserva la comprensión de datos concretos.
//
//   2. Reading Part 2 (texto con 6 frases quitadas, elegir entre 7): el tipo
//      `LesenMatch` no tiene un campo para un texto corrido con huecos
//      numerados — solo `ads` (opciones) y `situations` (qué se empareja). Se
//      resuelve poniendo el texto COMPLETO, con los huecos marcados [1]-[6],
//      en la `instruction` del Teil (visible antes de los ítems, igual que
//      hace `examB1A.ts` con los ejemplos resueltos incrustados), y cada
//      `situation` REPITE además el fragmento local alrededor de su hueco para
//      que se pueda resolver sin volver atrás a releer todo el texto.
//
//   3. Reading Part 3 (4 textos, 7 preguntas de matching): el validador de
//      este curso EXIGE que cada key de `ads` sea la respuesta de COMO MUCHO
//      una `situation` (si no, dos respuestas comparten clave y el ejercicio
//      deja de tener una única solución). Con solo 4 textos y 7 preguntas es
//      IMPOSIBLE cumplir esa regla si las 7 son emparejamientos. Se resuelve
//      —tal como pide el encargo— con 4 preguntas de emparejamiento (una por
//      texto, dentro de un único `lesen-match`) y las 3 restantes como
//      `lesen-mc` sueltos, cada uno con su propio `text` (repite uno de los
//      cuatro textos ya vistos) y una pregunta de comprensión de opción
//      múltiple sobre ese texto.
//
//   4. Reading Part 4 (texto ~400p, 8 preguntas «wh-» de respuesta abierta,
//      máx. 3 palabras): el motor no tiene un kind de respuesta libre para
//      lectura. Mismo criterio que en el Listening 3: se aproximan como 8
//      `lesen-mc` (opción múltiple de 3) que comparten el texto largo — el
//      primer ítem lleva `title`/`text`, el resto los omite.
// ─────────────────────────────────────────────────────────────────────────────

/** Rúbrica oficial de Writing (LC-LRW §3.1): 4 criterios literales del
 *  handbook. Bandas descendentes que acaban en 0; la suma de las bandas A de
 *  los 4 criterios es EXACTAMENTE 12 (points_max de cada tarea). */
const RUBRIC_W1: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment",
    help: "¿Cubres los tres puntos del enunciado con contenido suficiente, sin salirte del tema? Ignorar un punto o escribir sobre otra cosa hunde la banda: aquí no hay crédito por un texto fuera de tema.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar",
    help: "¿Usas estructuras variadas de B1 (present perfect, condicionales 1-2, pasiva, relativas) mayoritariamente bien? Un error puntual que no impide entender no baja la banda por sí solo.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary",
    help: "¿El vocabulario es preciso y variado para el tema, o repites las mismas cinco palabras? En una carta formal cuenta también acertar el registro (Dear Sir or Madam, Yours faithfully).",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation",
    help: "¿Se lee con un orden lógico (saludo, cuerpo por puntos, despedida) y con conectores (however, although, for example)? Aquí entra TAMBIÉN la puntuación: mayúsculas, comas y apóstrofos correctos.",
    bands: [3, 2, 1, 0],
  },
];

/** Misma rúbrica oficial que RUBRIC_W1, con el help ajustado al registro
 *  informal y a las DOS funciones (no tres puntos) de la Writing Part 2. */
const RUBRIC_W2: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment",
    help: "¿Cumples las DOS funciones de la consigna (p.ej. invitar Y describir) con contenido suficiente? Cumplir solo una de las dos baja mucho la banda.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar",
    help: "¿Usas estructuras variadas de B1 mayoritariamente bien? En una carta informal se perdona más la espontaneidad, pero el verbo tiene que estar donde toca.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary",
    help: "¿El vocabulario es variado y coloquial de verdad (Guess what, Speak soon), o suena a carta formal traducida? El registro también es parte de la precisión.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation",
    help: "¿Se lee como una carta a un amigo, con saludo informal, cuerpo y despedida, y con puntuación correcta? Una lista de frases sueltas sin conectores no es organización, aunque las ideas estén todas.",
    bands: [3, 2, 1, 0],
  },
];

export const examEnB1C: ExamSet = {
  id: "en-b1-sim-c",
  level: "b1",
  title: "LanguageCert Achiever Set C",
  description:
    "Simulacro completo del LanguageCert International ESOL B1 Achiever: educación, tecnología y medios, compras y medio ambiente. Listening 26 ítems y Reading 26 ítems (doble escucha en todo el Listening), Writing con la rúbrica oficial de 4 criterios, Speaking en 4 partes. Examen COMPENSATORIO: Listening, Reading y Writing se suman sin mínimo por destreza.",
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
    // ═══════════════════════════ LISTENING · ~30 min ═══════════════════════
    {
      skill: "hoeren",
      label: "Listening",
      minutes: 30,
      teile: [
        // ── Part 1 · 7 ítems · frase suelta → elegir la respuesta ─────────
        {
          title: "Listening · Part 1",
          instruction:
            "Listen to seven short recordings. For each one, choose what you would say, a, b or c. You will hear each recording twice.",
          instructionEs:
            "Escucha siete grabaciones cortas: una afirmación, una explicación, una descripción, una instrucción o una pregunta. En cada una eliges qué RESPONDERÍAS, no lo que has entendido literalmente. Marca a, b o c. Escuchas cada audio dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-1",
              audio: "I finally passed my English exam this morning!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (afirmación)",
              options: [
                "That's great news, congratulations!",
                "The shop closes at six.",
                "I don't like tea very much.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-2",
              audio:
                "The Wi-Fi isn't working because the router needs to be restarted.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (explicación)",
              options: [
                "OK, I'll switch it off and on again.",
                "I bought a new jacket yesterday.",
                "The museum is closed on Mondays.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-3",
              audio:
                "This shop sells second-hand books at half the normal price.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (descripción)",
              options: [
                "That sounds worth a visit.",
                "I finished my homework already.",
                "The bus was late this morning.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-4",
              audio: "Please turn off your phones before the test begins.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (instrucción)",
              options: [
                "Sorry, I'll do that right now.",
                "I really enjoy reading online.",
                "It rained a lot last weekend.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-5",
              audio: "Do you always bring your own bag when you go shopping?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (pregunta)",
              options: [
                "Yes, I try to avoid plastic ones.",
                "No, the library opens at nine.",
                "I usually study in the evening.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-6",
              audio: "I think people spend far too much time on their phones.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (opinión)",
              options: [
                "I agree, it's hard to switch off sometimes.",
                "The train departs from platform four.",
                "She works as a nurse in London.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb1c-h1-7",
              audio:
                "My course starts next Monday, but I still haven't bought the textbook.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (descripción + problema)",
              options: [
                "You can probably find it online for less.",
                "The weather is lovely today.",
                "He usually walks to work.",
              ],
              answer: 0,
            },
          ],
        },
        // ── Part 2 · 6 ítems · 3 conversaciones × 2 preguntas ─────────────
        {
          title: "Listening · Part 2",
          instruction:
            "Listen to three short conversations. For each one, answer two questions by choosing a, b or c. You will hear each conversation twice.",
          instructionEs:
            "Escucha tres conversaciones cortas entre dos personas. De cada una respondes dos preguntas (tema, propósito, relación o actitud). Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1c-h2-g1",
              audio:
                "Valeria: Grace, have you started the essay for our writing class yet? | " +
                "Grace: Not yet, I've been really busy with my part-time job. What's it about again? | " +
                "Valeria: We have to write about a piece of technology that changed our daily life. | " +
                "Grace: Oh, that's easy — I'll write about my phone. When is it due? | " +
                "Valeria: Friday afternoon, so we still have a few days. | " +
                "Grace: Good, because I really need the weekend to finish it.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-1",
                  audio: "",
                  twice: true,
                  question: "What are Valeria and Grace talking about?",
                  questionEs: "¿De qué hablan Valeria y Grace?",
                  options: ["A school essay", "A holiday plan", "A shopping trip"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-2",
                  audio: "",
                  twice: true,
                  question: "Why hasn't Grace started the essay?",
                  questionEs: "¿Por qué no ha empezado Grace la redacción?",
                  options: [
                    "She has been busy with work.",
                    "She doesn't like writing.",
                    "She lost her notes.",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1c-h2-g2",
              audio:
                "Priya: Sam, have you tried the new app customers use to order coffee? | " +
                "Sam: Yes, I set it up on the tablet this morning. It's actually quite simple. | " +
                "Priya: Good, because some of our regulars were confused by the old till. | " +
                "Sam: I think this one will save us a lot of time at busy hours. | " +
                "Priya: Let's hope so — Monday mornings are always chaos here. | " +
                "Sam: Don't worry, I'll show everyone how it works before we open.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-3",
                  audio: "",
                  twice: true,
                  question: "What are Priya and Sam discussing?",
                  questionEs: "¿Qué están comentando Priya y Sam?",
                  options: [
                    "A new ordering system for the café",
                    "A new coffee supplier",
                    "A holiday rota",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-4",
                  audio: "",
                  twice: true,
                  question: "How does Sam feel about the new system?",
                  questionEs: "¿Cómo se siente Sam respecto al nuevo sistema?",
                  options: [
                    "Confident it will help",
                    "Worried it's too complicated",
                    "Annoyed about learning it",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb1c-h2-g3",
              audio:
                "Ben: Nora, are you going to the market today? | " +
                "Nora: Yes, I want to look for a second-hand coat before winter starts. | " +
                "Ben: Good idea — it's cheaper, and better for the environment too. | " +
                "Nora: Exactly, and some of the stalls sell things that are almost new. | " +
                "Ben: Can I come with you? I need a warm jumper as well. | " +
                "Nora: Of course, let's go after lunch.",
              dialog: true,
              twice: true,
              readSeconds: 15,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-5",
                  audio: "",
                  twice: true,
                  question: "Where are Ben and Nora going?",
                  questionEs: "¿Adónde van Ben y Nora?",
                  options: ["To a market", "To a supermarket", "To a library"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h2-6",
                  audio: "",
                  twice: true,
                  question: "Why does Nora prefer buying second-hand?",
                  questionEs: "¿Por qué prefiere Nora comprar de segunda mano?",
                  options: [
                    "It's cheaper and better for the environment.",
                    "She doesn't like new clothes.",
                    "The shops near her are closed.",
                  ],
                  answer: 0,
                },
              ],
            },
          ],
        },
        // ── Part 3 · 7 ítems · monólogo → ficha de notas (ver ADAPTACIÓN 1) ──
        {
          title: "Listening · Part 3",
          instruction:
            "You will hear a talk on the radio. Complete the notes for questions 1 to 7 by choosing a, b or c. You have 45 seconds to read the notes before you listen. You will hear the talk twice.",
          instructionEs:
            "Escucha una charla de radio y completa la ficha de notas de las preguntas 1 a 7. Tienes 45 segundos para leerla antes de escuchar. Se oye dos veces.\n\n" +
            "En el examen real se ESCRIBE la palabra o frase que falta (1-3 palabras, y la ortografía cuenta). Aquí eliges entre tres opciones: una de ellas es literalmente lo que se oye.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1c-h3-g1",
              audio:
                "Good afternoon, and welcome back to Community Radio London. Today's local news is about a new course starting at Camden Library next month. It's called 'Get Online', and it teaches basic computer and internet skills for anyone who feels a bit lost with technology. Classes run every Wednesday evening, from six to half past seven. The course is completely free, but places are limited to twelve people, so you need to book early. If you decide to join, remember to bring your own laptop or tablet if you have one — the library only has four computers to share. To register, you can call the library directly, or send an email to learn@camdenlibrary.org.uk. And here's some good news for parents: while adults attend the course, there is a free homework club for children in the room next door, run by volunteers from the local school. That's all from me for today — join us again tomorrow for more news from around the city.",
              dialog: false,
              twice: true,
              readSeconds: 45,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-1",
                  audio: "",
                  twice: true,
                  question: "Course name: ___",
                  questionEs: "Nombre del curso:",
                  options: ["Get Online", "Tech for All", "Digital Friends"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-2",
                  audio: "",
                  twice: true,
                  question: "Day of the week: ___",
                  questionEs: "Día de la semana:",
                  options: ["Wednesday", "Monday", "Saturday"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-3",
                  audio: "",
                  twice: true,
                  question: "Time: ___",
                  questionEs: "Horario:",
                  options: ["6:00–7:30 pm", "5:00–6:30 pm", "7:00–8:30 pm"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-4",
                  audio: "",
                  twice: true,
                  question: "Price: ___",
                  questionEs: "Precio:",
                  options: ["Free", "£5 per class", "£12 in total"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-5",
                  audio: "",
                  twice: true,
                  question: "Number of places available: ___",
                  questionEs: "Número de plazas disponibles:",
                  options: ["12", "20", "4"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-6",
                  audio: "",
                  twice: true,
                  question: "Bring your own ___ if you have one",
                  questionEs: "Trae tu propio ___ si tienes uno:",
                  options: ["laptop or tablet", "notebook and pen", "chair"],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h3-7",
                  audio: "",
                  twice: true,
                  question: "How to register: ___",
                  questionEs: "Cómo apuntarse:",
                  options: [
                    "call or email the library",
                    "just turn up on the day",
                    "register through the council website",
                  ],
                  answer: 0,
                },
              ],
            },
          ],
        },
        // ── Part 4 · 6 ítems · discusión a 2 voces ────────────────────────
        {
          title: "Listening · Part 4",
          instruction:
            "You will hear a discussion between two speakers. Answer the six questions by choosing a, b or c. You have 30 seconds to read the questions before you listen. You will hear the discussion twice.",
          instructionEs:
            "Escucha una discusión entre dos personas. Responde las seis preguntas (idea general, ejemplo, hecho frente a opinión, contraste y actitud). Tienes 30 segundos para leer antes de escuchar. Se oye dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb1c-h4-g1",
              audio:
                "Host: Today we're discussing whether learning a language online can really replace a classroom. My guest is Daniel Ferris, who leads an adult education programme. Daniel, what's your view? | " +
                "Daniel: Well, apps are wonderful for practising vocabulary on the bus or during a break, and studies show that people who use them daily do build a strong basic vocabulary quickly. | " +
                "Host: So you think apps are enough on their own? | " +
                "Daniel: Not quite — that's just my opinion, not a fact everyone accepts, but I do believe something important is missing: real conversation. An app can't notice that you're nervous, or slow down because you're confused. | " +
                "Host: Can you give an example? | " +
                "Daniel: Sure. Last year, one of my students had used an app for eight months and knew hundreds of words, but she froze completely the first time she had to order food in English at a real café. | " +
                "Host: Interesting. So what would you recommend? | " +
                "Daniel: A mix of both, honestly. Use the app for quick daily practice, but join a class or a conversation group for the confidence that only speaking to a real person can give you. | " +
                "Host: That sounds like sensible advice. Thanks for joining us, Daniel.",
              dialog: true,
              twice: true,
              readSeconds: 30,
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-1",
                  audio: "",
                  twice: true,
                  question: "What is the discussion mainly about?",
                  questionEs: "¿De qué trata principalmente la discusión?",
                  options: [
                    "Whether apps alone are enough to learn a language",
                    "How much language courses cost",
                    "Which app is the most popular",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-2",
                  audio: "",
                  twice: true,
                  question: "What example does Daniel give?",
                  questionEs: "¿Qué ejemplo da Daniel?",
                  options: [
                    "A student who couldn't speak confidently in a real café",
                    "A teacher who lost her job",
                    "A course that was cancelled",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-3",
                  audio: "",
                  twice: true,
                  question: "Which of these is Daniel's OPINION, not a fact?",
                  questionEs: "¿Cuál de estas es la OPINIÓN de Daniel, no un hecho?",
                  options: [
                    "Apps alone are not enough to learn a language.",
                    "His student used an app for eight months.",
                    "The student ordered food in English.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-4",
                  audio: "",
                  twice: true,
                  question: "What contrast does Daniel make?",
                  questionEs: "¿Qué contraste establece Daniel?",
                  options: [
                    "Between practising alone and talking to a real person",
                    "Between British and American English",
                    "Between free and paid apps",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-5",
                  audio: "",
                  twice: true,
                  question: "How does the host react to Daniel's advice?",
                  questionEs: "¿Cómo reacciona el presentador al consejo de Daniel?",
                  options: [
                    "She thinks it's sensible.",
                    "She disagrees completely.",
                    "She seems confused by it.",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb1c-h4-6",
                  audio: "",
                  twice: true,
                  question: "What does Daniel recommend in the end?",
                  questionEs: "¿Qué recomienda Daniel al final?",
                  options: [
                    "Combining an app with real conversation practice",
                    "Stopping the use of apps completely",
                    "Only attending classroom lessons",
                  ],
                  answer: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    // ═══════════════════════════ READING · ~75 min ═════════════════════════
    {
      skill: "lesen",
      label: "Reading",
      minutes: 75,
      teile: [
        // ── Part 1 · 5 ítems · textos cortos con hueco ────────────────────
        {
          title: "Reading · Part 1",
          instruction:
            "Read the five short texts. Choose the word that best completes each one, a, b or c.",
          instructionEs:
            "Lee los cinco textos cortos (25-50 palabras cada uno). Cada uno tiene un hueco: elige la palabra que mejor lo completa, a, b o c.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1c-l1-1",
              title: "Notice — Study Room",
              text:
                "The Study Room on the second floor is for silent work only. Please ___ your phone before you go in, and remember that food and drinks are not allowed at the desks.",
              question: "Which word best completes the notice?",
              questionEs: "¿Qué palabra completa mejor el aviso?",
              options: ["switch off", "turn on", "charge"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l1-2",
              title: "Text message",
              text:
                "Hi! Your parcel from GreenTech Store ___ tomorrow between 9 am and 1 pm. Please make sure someone is at home to sign for it.",
              question: "Which word best completes the message?",
              questionEs: "¿Qué palabra completa mejor el mensaje?",
              options: ["will arrive", "arrived", "arriving"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l1-3",
              title: "Poster — Recycling Point",
              text:
                "Please put glass bottles in the green bin. If you are ___ which bin to use for a plastic bag, ask a member of staff at the reception desk.",
              question: "Which word best completes the poster?",
              questionEs: "¿Qué palabra completa mejor el cartel?",
              options: ["unsure", "happy", "quick"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l1-4",
              title: "Shop advert — TechWorld",
              text:
                "New at TechWorld this week: wireless headphones ___ than any other model in the shop, with a battery that lasts twelve hours.",
              question: "Which word best completes the advert?",
              questionEs: "¿Qué palabra completa mejor el anuncio?",
              options: ["cheaper", "cheap", "cheaply"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l1-5",
              title: "Notice — College",
              text:
                "Because of a problem with the heating system, tomorrow's morning classes ___ to the library instead of Room 12. Afternoon classes are not affected.",
              question: "Which word(s) best complete the notice?",
              questionEs: "¿Qué palabra(s) completan mejor el aviso?",
              options: ["will be moved", "moved", "moving"],
              answer: 0,
            },
          ],
        },
        // ── Part 2 · 6 ítems · texto ~250p, 6 frases quitadas (ver ADAPT. 2) ──
        {
          title: "Reading · Part 2",
          instruction:
            "Read the text below. Six sentences have been removed from it. Choose from sentences a-g the one which fits each gap (1-6). There is one extra sentence which you do not need.\n\n" +
            "HOW I FINALLY STARTED UNDERSTANDING ENGLISH — by Valeria Soto\n\n" +
            "For the first few months after I moved to London, I could read forms and signs without much trouble, but real conversations still felt impossibly fast. (1) ______ My flatmate Amy noticed how frustrated I was getting and suggested I try a language app instead of only relying on my evening classes.\n\n" +
            "At first, I was doubtful. (2) ______ I had already spent hours on grammar exercises at college, and I didn't think a phone app could add much. Still, I downloaded one just to prove myself right.\n\n" +
            "To my surprise, the app worked completely differently from my classes. (3) ______ Instead of long explanations, it gave me short, everyday conversations to listen to on the bus or while I waited for the kettle to boil.\n\n" +
            "Within a few weeks, something changed. (4) ______ I started noticing the same phrases from the app appearing in conversations at the café where I used to work, and for the first time they didn't sound like a foreign language.\n\n" +
            "Of course, the app alone wasn't a magic solution. (5) ______ Whenever I got something wrong, my teacher could explain exactly why, which no app has managed to do as well.\n\n" +
            "These days I use both, and I would recommend the same to anyone starting out. (6) ______ Six months ago I never thought I would say that.\n\n" +
            "a) My evening classes were still essential for the grammar and the corrections a phone can't give.\n" +
            "b) I still remember standing at a bus stop, understanding almost nothing the driver said to me.\n" +
            "c) I assumed it would be just another version of the exercises I already knew.\n" +
            "d) It focused on real situations rather than rules, which suited the little free time I had.\n" +
            "e) I began to understand whole sentences instead of picking out single words here and there.\n" +
            "f) Learning a language is easier when you already speak more than one.\n" +
            "g) Now I actually look forward to practising, instead of dreading it like before.",
          instructionEs:
            "Lee el texto (unas 250 palabras, arriba en la instrucción) sobre cómo Valeria empezó por fin a entender el inglés. Se han quitado seis frases, numeradas (1) a (6). Elige entre las frases a-g cuál va en cada hueco — sobra una, que es el distractor. Cada pregunta de abajo repite además el fragmento cercano a su hueco, para que no tengas que volver arriba a releer todo el texto.",
          items: [
            {
              kind: "lesen-match",
              id: "enb1c-l2",
              ads: [
                {
                  key: "a",
                  text:
                    "My evening classes were still essential for the grammar and the corrections a phone can't give.",
                },
                {
                  key: "b",
                  text:
                    "I still remember standing at a bus stop, understanding almost nothing the driver said to me.",
                },
                {
                  key: "c",
                  text: "I assumed it would be just another version of the exercises I already knew.",
                },
                {
                  key: "d",
                  text:
                    "It focused on real situations rather than rules, which suited the little free time I had.",
                },
                {
                  key: "e",
                  text:
                    "I began to understand whole sentences instead of picking out single words here and there.",
                },
                {
                  key: "f",
                  text: "Learning a language is easier when you already speak more than one.",
                },
                {
                  key: "g",
                  text: "Now I actually look forward to practising, instead of dreading it like before.",
                },
              ],
              situations: [
                {
                  id: "enb1c-l2-1",
                  situation:
                    "Gap (1): \"…real conversations still felt impossibly fast. ______ My flatmate Amy noticed how frustrated I was getting…\"",
                  situationEs:
                    "Hueco (1): justo antes de que Amy note que Valeria está frustrada.",
                  answer: "b",
                },
                {
                  id: "enb1c-l2-2",
                  situation:
                    "Gap (2): \"At first, I was doubtful. ______ I had already spent hours on grammar exercises at college…\"",
                  situationEs:
                    "Hueco (2): explica por qué Valeria dudaba, antes de mencionar la gramática del college.",
                  answer: "c",
                },
                {
                  id: "enb1c-l2-3",
                  situation:
                    "Gap (3): \"…the app worked completely differently from my classes. ______ Instead of long explanations, it gave me short, everyday conversations…\"",
                  situationEs:
                    "Hueco (3): explica EN QUÉ era diferente la app, antes de \"instead of long explanations\".",
                  answer: "d",
                },
                {
                  id: "enb1c-l2-4",
                  situation:
                    "Gap (4): \"Within a few weeks, something changed. ______ I started noticing the same phrases from the app appearing in conversations…\"",
                  situationEs: "Hueco (4): qué fue exactamente lo que cambió.",
                  answer: "e",
                },
                {
                  id: "enb1c-l2-5",
                  situation:
                    "Gap (5): \"…the app alone wasn't a magic solution. ______ Whenever I got something wrong, my teacher could explain exactly why…\"",
                  situationEs:
                    "Hueco (5): por qué la app sola no bastaba, justo antes de hablar del profesor.",
                  answer: "a",
                },
                {
                  id: "enb1c-l2-6",
                  situation:
                    "Gap (6): \"These days I use both… ______ Six months ago I never thought I would say that.\"",
                  situationEs:
                    "Hueco (6): lo que Valeria \"nunca pensó que diría\" seis meses atrás.",
                  answer: "g",
                },
              ],
            },
          ],
        },
        // ── Part 3 · 7 ítems · 4 textos, matching (ver ADAPTACIÓN 3) ──────
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts about buying second-hand. For questions 1-4, decide which text (A, B, C or D) each one refers to. For questions 5-7, read the repeated text and choose the correct answer, a, b or c.",
          instructionEs:
            "Lee los cuatro textos sobre comprar de segunda mano (70-90 palabras cada uno, mismo tema, propósito distinto: anunciar, quejarse, recomendar e informar). Las preguntas 1 a 4 son de emparejamiento: decide a qué texto (A, B, C o D) se refiere cada una. Las preguntas 5 a 7 repiten uno de los textos y son de opción múltiple.\n\n" +
            "En el examen real un mismo texto puede responder a más de una de las siete preguntas. Aquí solo cuatro son de emparejamiento (una por texto) y las tres restantes son de opción múltiple sobre uno de esos mismos textos, repetido para no tener que memorizarlo.",
          items: [
            {
              kind: "lesen-match",
              id: "enb1c-l3",
              ads: [
                {
                  key: "a",
                  text:
                    "Style Again is Camden's favourite charity shop, now open seven days a week. We sell gently used clothes, books and small furniture, and every pound you spend supports our local food bank. New donations arrive every morning, so there's always something different to discover. Bring in your own unwanted clothes and we'll give you 10% off your next purchase — good for your wardrobe, and for the planet.",
                },
                {
                  key: "b",
                  text:
                    "I bought a 'like new' winter coat through an online second-hand marketplace last month, and I was disappointed. The photos looked perfect, but the coat that arrived had a broken zip and smelled strongly of smoke. When I contacted the seller, she simply stopped replying. I still think buying second-hand is a good idea, but this experience taught me to always ask detailed questions and check reviews before paying.",
                },
                {
                  key: "c",
                  text:
                    "Six months ago, a friend invited me to a clothes swap evening at her flat, and now I go every month. Everyone brings a few things they no longer wear and leaves with something 'new' instead. I've found a beautiful jacket and two jumpers this way, without spending a single pound. If your wardrobe feels boring, I honestly recommend trying a swap before buying anything new.",
                },
                {
                  key: "d",
                  text:
                    "According to a recent report, the average person in the UK throws away around thirty kilograms of clothing every year, much of which could still be worn. Buying second-hand instead of new can reduce this waste significantly, as well as cutting the water and energy used to manufacture new clothes. Local councils are now opening more second-hand shops and collection points to make reusing clothes easier for everyone.",
                },
              ],
              situations: [
                {
                  id: "enb1c-l3-1",
                  situation:
                    "Which text tells you about a shop that also helps a food bank?",
                  situationEs:
                    "¿Qué texto habla de una tienda que además ayuda a un banco de alimentos?",
                  answer: "a",
                },
                {
                  id: "enb1c-l3-2",
                  situation:
                    "Which text describes a bad experience buying something online?",
                  situationEs:
                    "¿Qué texto describe una mala experiencia comprando algo por internet?",
                  answer: "b",
                },
                {
                  id: "enb1c-l3-3",
                  situation:
                    "Which text recommends an event where people exchange clothes for free?",
                  situationEs:
                    "¿Qué texto recomienda un evento donde la gente intercambia ropa gratis?",
                  answer: "c",
                },
                {
                  id: "enb1c-l3-4",
                  situation:
                    "Which text gives statistics about how much clothing is wasted every year?",
                  situationEs:
                    "¿Qué texto da estadísticas sobre cuánta ropa se desperdicia cada año?",
                  answer: "d",
                },
              ],
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l3-5",
              title: "Text A — Style Again (repeated)",
              text:
                "Style Again is Camden's favourite charity shop, now open seven days a week. We sell gently used clothes, books and small furniture, and every pound you spend supports our local food bank. New donations arrive every morning, so there's always something different to discover. Bring in your own unwanted clothes and we'll give you 10% off your next purchase — good for your wardrobe, and for the planet.",
              question: "What does Style Again offer if you donate your own clothes?",
              questionEs: "¿Qué ofrece Style Again si donas tu propia ropa?",
              options: ["10% off your next purchase", "A free bag", "A cup of coffee"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l3-6",
              title: "Text B — online marketplace (repeated)",
              text:
                "I bought a 'like new' winter coat through an online second-hand marketplace last month, and I was disappointed. The photos looked perfect, but the coat that arrived had a broken zip and smelled strongly of smoke. When I contacted the seller, she simply stopped replying. I still think buying second-hand is a good idea, but this experience taught me to always ask detailed questions and check reviews before paying.",
              question:
                "What did the writer receive instead of what was shown in the photos?",
              questionEs: "¿Qué recibió la autora en vez de lo que mostraban las fotos?",
              options: [
                "A coat with a broken zip that smelled of smoke",
                "A coat in the wrong size",
                "No coat at all",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l3-7",
              title: "Text D — recent report (repeated)",
              text:
                "According to a recent report, the average person in the UK throws away around thirty kilograms of clothing every year, much of which could still be worn. Buying second-hand instead of new can reduce this waste significantly, as well as cutting the water and energy used to manufacture new clothes. Local councils are now opening more second-hand shops and collection points to make reusing clothes easier for everyone.",
              question:
                "According to the report, what is one advantage of buying second-hand clothes apart from reducing waste?",
              questionEs:
                "Según el informe, ¿qué otra ventaja tiene comprar ropa de segunda mano, aparte de reducir residuos?",
              options: [
                "It cuts the water and energy used to make new clothes",
                "It makes clothes last forever",
                "It is required by law",
              ],
              answer: 0,
            },
          ],
        },
        // ── Part 4 · 8 ítems · texto largo ~400p (ver ADAPTACIÓN 4) ───────
        {
          title: "Reading · Part 4",
          instruction:
            "Read the text. For questions 1-8, choose the correct answer, a, b or c.",
          instructionEs:
            "Lee el texto (~400 palabras) sobre Vincent Bray, que cambió de profesión gracias a un curso nocturno y a clases online.\n\n" +
            "En el examen real estas ocho preguntas son de respuesta abierta (máximo tres palabras cada una). Aquí eliges entre tres opciones sobre el mismo texto. Mismo contenido; en el papel oficial, tú escribes.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb1c-l4-1",
              title: "From Delivery Driver to Web Designer",
              text:
                "Five years ago, Vincent Bray was delivering parcels six days a week and could not have imagined sitting behind a desk designing websites for a living. Today, at thirty-four, he runs a small web design business from a spare room in his flat, and he says the whole change started almost by accident.\n\n" +
                "'I got a puncture on my bike one rainy evening, and while I waited for a replacement, I read an article on my phone about people learning to code for free,' Vincent remembers. 'I'd never really thought about it, but I had nothing else to do that evening, so I signed up out of curiosity.'\n\n" +
                "What began as a way to pass one boring evening slowly became a habit. Vincent started spending thirty minutes most nights working through free online lessons, often still in his delivery uniform. After a few months, he heard about a local adult education programme, run by Daniel Ferris, that offered evening classes to people wanting to change career. He joined immediately, even though it meant giving up two evenings a week that he had previously used to rest after long shifts.\n\n" +
                "'The online lessons taught me the basics, but the classroom gave me something I badly needed: people to ask when I got completely stuck, and a teacher who noticed straight away when I didn't understand something, even if I said I did,' he explains.\n\n" +
                "The course lasted eight months. Vincent built his first real website for a friend's small bakery, entirely for free, simply for the practice. Word spread quickly around the neighbourhood, and within a year he had enough paying customers to leave his delivery job behind completely.\n\n" +
                "Vincent is quick to point out that the change was not easy. There were evenings when he was too tired to concentrate, and months when he doubted whether a career change was really possible at his age. What kept him going, he says, was seeing small results every week: a working button, a page that finally looked right, a client who was happy with the result.\n\n" +
                "These days, Vincent sometimes returns to his old adult education class, not as a student this time, but as a volunteer, helping newer students with the same doubts he once had himself. 'If a puncture can change your career,' he jokes, 'anyone can find their own way in.'",
              question: "What is the text mainly about?",
              questionEs: "¿De qué trata principalmente el texto?",
              options: [
                "How a delivery driver changed his career through learning to code",
                "How to fix a bicycle puncture",
                "The history of web design",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-2",
              question: "What made Vincent first look at coding lessons?",
              questionEs: "¿Qué hizo que Vincent mirara por primera vez clases de programación?",
              options: [
                "He had free time while waiting for a bike repair",
                "His employer suggested it",
                "He read about it in a college prospectus",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-3",
              question: "How long did Daniel Ferris's course last?",
              questionEs: "¿Cuánto duró el curso de Daniel Ferris?",
              options: ["Eight months", "Two months", "One year"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-4",
              question:
                "Why did Vincent join the classroom course as well as the online lessons?",
              questionEs:
                "¿Por qué se apuntó Vincent al curso presencial además de las clases online?",
              options: [
                "He wanted help from a teacher when he got stuck",
                "The online lessons stopped working",
                "His friends made him join",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-5",
              question: "What was Vincent's first real website project?",
              questionEs: "¿Cuál fue el primer proyecto web real de Vincent?",
              options: [
                "A website for a friend's bakery",
                "A website for his delivery company",
                "His own personal blog",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-6",
              question:
                "How does Vincent feel about the difficult moments during his course?",
              questionEs: "¿Cómo se siente Vincent respecto a los momentos difíciles del curso?",
              options: [
                "He admits they were hard but he kept going",
                "He says he never found it difficult",
                "He says he wanted to give up completely",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-7",
              question: "What does Vincent do now at his old adult education class?",
              questionEs: "¿Qué hace Vincent ahora en su antigua clase de educación de adultos?",
              options: [
                "He volunteers to help newer students",
                "He teaches full-time",
                "He no longer goes there",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb1c-l4-8",
              question: "What is the main message of Vincent's story, according to the text?",
              questionEs: "¿Cuál es el mensaje principal de la historia de Vincent, según el texto?",
              options: [
                "A small, unplanned start can lead to a big change",
                "Bicycles are not a reliable form of transport",
                "Online lessons are better than classroom lessons",
              ],
              answer: 0,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════ WRITING · ~55 min ══════════════════════════
    {
      skill: "schreiben",
      label: "Writing",
      minutes: 55,
      teile: [
        {
          title: "Writing · Part 1",
          instruction:
            "Read the notice. Write a formal letter to the library manager. Write 70-100 words. Answer all three points.",
          instructionEs:
            "Lee el aviso. Escribe una carta FORMAL a la directora de la biblioteca (70-100 palabras) que cumpla los tres puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1c-w1",
              task:
                "Read this notice: \"Camden Library — Free 'Get Online' Digital Skills Course. Starting next month! Only 12 places available. Write to the library manager to apply, telling us why you'd like to join, and we'll be in touch.\" Write a formal letter to the library manager (70-100 words).",
              taskEs:
                "Lee este aviso de la biblioteca de Camden sobre un curso gratuito de habilidades digitales, 'Get Online', con solo 12 plazas. Escribe una carta FORMAL a la directora de la biblioteca para apuntarte (70-100 palabras).",
              points: [
                "Di que quieres apuntarte al curso 'Get Online' y por qué",
                "Pregunta por los horarios o si hace falta traer tu propio portátil",
                "Menciona tu experiencia previa con ordenadores (poca o ninguna)",
              ],
              stimulus: {
                source: "Aviso — Biblioteca de Camden",
                text:
                  "Camden Library — Free 'Get Online' Digital Skills Course. Starting next month! Only 12 places available. Write to the library manager to apply, telling us why you'd like to join, and we'll be in touch.",
              },
              words: 85,
              points_max: 12,
              model:
                "Dear Sir or Madam,\n\nI am writing to apply for a place on the 'Get Online' course starting next month, as I would really like to feel more confident using computers and the internet.\n\nCould you please tell me whether I need to bring my own laptop, or if one will be provided during the sessions?\n\nI should mention that I have very little experience with computers, so I hope the course is suitable for complete beginners.\n\nI look forward to hearing from you.\n\nYours faithfully,\nValeria Soto",
              rubric: RUBRIC_W1,
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write an informal letter to a friend. Write 100-120 words. Do the two things in the task.",
          instructionEs:
            "Escribe una carta INFORMAL a un amigo (100-120 palabras) que cumpla las dos funciones de la consigna: invitar y describir.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb1c-w2",
              task:
                "You are having a clear-out at home, and there's a car boot sale next Saturday. Write a letter to a friend (100-120 words): invite them to come and help you on the day, and describe two or three things you're planning to sell.",
              taskEs:
                "Vas a hacer una limpieza a fondo en casa y el sábado que viene hay un mercadillo (car boot sale). Escribe una carta informal a un amigo (100-120 palabras): invítale a venir a ayudarte ese día, y describe dos o tres cosas que vas a vender.",
              points: [
                "Invita a tu amigo a venir y ayudarte el sábado",
                "Describe dos o tres cosas que vas a vender",
              ],
              words: 110,
              points_max: 12,
              model:
                "Hi Jamie,\n\nGuess what — I'm finally having a clear-out this weekend! There's a car boot sale on Saturday morning, and I've decided to sell loads of things I never use any more.\n\nCould you come and help me carry everything there? It would be brilliant to have you around, and we could grab breakfast at Sam's café afterwards.\n\nI'm planning to sell my old bike, a box of books I've already read twice, and a really nice desk lamp that just doesn't fit my new room. Nothing too exciting, but hopefully someone will love it as much as I once did!\n\nLet me know if Saturday works for you.\n\nSpeak soon,\nValeria",
              rubric: RUBRIC_W2,
            },
          ],
        },
      ],
    },
    // ═══════════════════════════ SPEAKING · 12 min ══════════════════════════
    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 12,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction: "Introduce yourself and answer personal questions.",
          instructionEs: "Preséntate y responde preguntas personales, en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "enb1c-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then answer: What are you studying at the moment? Do you use a computer or a smartphone for your studies? What do you think about online shopping?",
              promptEs:
                "Di tu nombre y deletrea tu apellido (con los nombres ingleses de las letras). Luego responde: qué estás estudiando ahora mismo, si usas ordenador o móvil para estudiar, y qué opinas de las compras por internet.",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. At the moment I'm studying English at an evening course, and I also use a language app on my phone every day. I think online shopping is very convenient, but I still prefer to see clothes in person before I buy them.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction:
            "Respond to the situations. Then start a conversation yourself.",
          instructionEs:
            "Responde a las situaciones y, en la última, inicia tú la conversación.",
          items: [
            {
              kind: "sprechen",
              id: "enb1c-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — In a shop, the assistant says: 'Can I help you find anything?' You're looking for a present for a friend who loves reading. Answer him. Situation 2 — A friend says: 'Look, I just bought this new phone!' React and ask a question. Situation 3 — Now YOU start: you bought something online that arrived broken and you want to know if the shop can give your money back. Ask.",
              promptEs:
                "Situación 1: el dependiente pregunta si puede ayudarte — buscas un regalo para un amigo al que le encanta leer, respóndele. Situación 2: un amigo te enseña su móvil nuevo — reacciona y pregúntale algo. Situación 3: ahora empiezas tú — compraste algo por internet que llegó roto y quieres saber si te devuelven el dinero. Pregunta.",
              model:
                "1. Yes, please — I'm looking for a good book for a friend who loves reading. Any recommendations? — 2. Wow, that looks great! How much did it cost? — 3. Excuse me, I bought this online and it arrived broken. Can I get a refund, please?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Discuss the picture with your partner and try to reach an agreement.",
          instructionEs:
            "Comenta la lámina con tu compañero e intentad llegar a un acuerdo, como pide el examen real.",
          items: [
            {
              kind: "sprechen",
              id: "enb1c-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture: two ideas for a leaving present for a colleague who is moving abroad. Option A shows a smart watch. Option B shows a set of second-hand travel books. Discuss the advantages of each option with your partner, and try to agree on which one to buy.",
              promptEs:
                "Lámina: dos opciones de regalo de despedida para un compañero que se muda al extranjero. Opción A: un reloj inteligente. Opción B: un lote de libros de viajes de segunda mano. Comenta las ventajas de cada opción con tu compañero e intentad llegar a un acuerdo sobre cuál comprar.",
              model:
                "I think the smart watch is more exciting, but it's quite expensive for a group gift. The travel books are cheaper, more personal, and better for the environment too, since they're second-hand. Shall we go with the books and add a nice card? — Yes, let's do that, I think everyone will agree.",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "Talk about the topic for one and a half minutes. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema 1,5 minutos seguidos. Como en el examen: 30 segundos para pensar y 90 hablando (usa un reloj).",
          items: [
            {
              kind: "sprechen",
              id: "enb1c-sp4",
              teil: 4,
              weight: 3,
              prepSeconds: 30,
              speakSeconds: 90,
              prompt:
                "Talk about an exciting experience you had while learning something new — for example, learning to use a new gadget, a new app, or starting a course. Say what you learned, how you felt, and why it was exciting.",
              promptEs:
                "Habla de una experiencia emocionante que tuviste aprendiendo algo nuevo — por ejemplo, aprender a usar un aparato, una app, o empezar un curso. Di qué aprendiste, cómo te sentiste y por qué fue emocionante.",
              model:
                "Last year I decided to learn how to use a photo-editing app to help a friend with her small online shop. At first it felt complicated, and I almost gave up after the first evening. But after a few days of practising every night, I managed to create my first proper photo, and I felt incredibly proud. It was exciting because I realised I could learn something completely new just from online tutorials, without any classroom at all. Now I help my friend every week, and I've even started learning a second app.",
            },
          ],
        },
      ],
    },
  ],
};
