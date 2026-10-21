import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// LanguageCert Communicator Set B — misma estructura que Set A, otra estética.
// Tema: desperdicio alimentario, cocinas comunitarias, turnos de panadería,
// apps de excedente. No se pisa el Set A (radio) ni los B1 (viaje, salud,
// educación). Nombres nuevos: Callum Reid, Dr Ines Vargas, Ms Chen,
// Leila Rahman. Priya Shah aparece con su oficio canónico (encargada del café).
//
//   LISTENING ~30′ · 4 partes · 26 · TODO ×2
//     T1 7 conversaciones inacabadas (una formal) → hoeren-mc
//     T2 3 conv × 2 MC → hoeren-group
//     T3 ficha 7 huecos 1-5 palabras → hoeren-notes (un monólogo ×2)
//     T4 discusión 6 MC → hoeren-group
//   READING · 26
//     T1 un texto largo 6 MC · T2 lesen-insert 6 de 7 · T3 4 textos 7 MC
//        · T4 7 wh- → lesen-notes (máx. 5 palabras)
// ─────────────────────────────────────────────────────────────────────────────

const RUBRIC_WRITING_12: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment — cumplimiento de la tarea",
    help: "¿Tratas los puntos y te acercas al número de palabras? Off-topic anula la tarea.",
    bands: [3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar — gramática",
    help: "Variedad de B2 y que los errores no estorben la comprensión.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary — vocabulario",
    help: "Precisión y registro correcto para el lector de cada tarea.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation — coherencia y puntuación",
    help: "Párrafos, conectores, puntuación inglesa. Encabezado, cuerpo, cierre.",
    bands: [3, 2, 1, 0],
  },
];

const FOUR_TEXTS =
  "TEXT A — Council notice: food waste collections\n" +
  "From 4 November, cooked leftovers go in the green caddy, not the black bin. Collections are Monday and Thursday before 7 a.m. Caddies left out after 9 a.m. will not be taken. Fines start at £60. Questions: waste@westway.gov.uk, not the kitchen on Green Street.\n\n" +
  "TEXT B — Email from Priya Shah to suppliers\n" +
  "We're joining the surplus app from next Monday. Any sandwiches still unsold at 4 p.m. will be listed at two pounds, not thrown. Please do not send us extra trays on Mondays — that's when we already have too much. If a delivery is late, call me, don't just leave it by the bins.\n\n" +
  "TEXT C — Volunteer call, Green Street Kitchen\n" +
  "We cook with surplus food three nights a week. Need two people who can lift crates and one who can run the till. No chef diploma. Shifts 5–9 p.m., a hot meal included. Email leila@greenstreetkitchen.org with two dates you can do, not a long story about why food waste matters.\n\n" +
  "TEXT D — Forum post by Callum Reid\n" +
  "I work nights at the bakery on the ring road. We bin a third of the day's bread because the supermarket contract says 'same-day only'. The kitchen down the road would take it. The contract forbids us to give it away. If anyone from the council is reading this: change the contract, don't print another poster about leftovers.";

export const examEnB2B: ExamSet = {
  id: "en-b2-sim-b",
  level: "b2",
  title: "LanguageCert Communicator Set B",
  description:
    "Segundo simulacro del LanguageCert ESOL B2 Communicator: desperdicio de comida, cocinas comunitarias y turnos de panadería. Misma estructura que el Set A, otros textos. Pass 50 %, High Pass 67 %, compensable.",
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
    {
      skill: "hoeren",
      label: "Listening",
      minutes: 30,
      teile: [
        {
          title: "Listening · Part 1",
          instruction:
            "You will hear seven unfinished conversations. Choose the best way to continue each one. You will hear each recording twice. One conversation is formal.",
          instructionEs:
            "Siete conversaciones inacabadas; una formal. Eliges cómo sigue, no lo que ya oíste. Dos veces cada una.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-1",
              audio:
                "There's still a tray of sandwiches at four. | List them on the app, then. | If nobody takes them by six we should…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…walk them over to the kitchen, not the bins.",
                "…order another tray.",
                "…close the library.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-2",
              audio:
                "Can you cover the till tonight? Leila's got a fever. | I can after seven. Before that I'm on the bus. | All right, I'll hold it until…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…seven, then you take over.",
                "…the doctor calls back.",
                "…we cancel the shift.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-3",
              audio:
                "The bakery wanted to donate the unsold loaves. | And? | The supermarket contract says same-day only, so…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…they had to bin them, which is insane.",
                "…they won an award.",
                "…the bus was late.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-4",
              audio:
                "Good morning. I'm calling from Green Street Kitchen about the food-waste collection. | Do you have an account number? | Yes, GS-218. | Thank you. Collections are…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue? (formal)",
              options: [
                "…Monday and Thursday before 7 a.m.; caddies out after 9 will not be taken.",
                "…whenever you like, just ring the bell.",
                "…cancelled until further notice.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-5",
              audio:
                "Amy, could you talk on air about nurses and the food they throw on night shifts? | Not with my name. The ward's already short. | We can just say…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…'a nurse in north London', no hospital.",
                "…bring your uniform.",
                "…Saturday at the bakery.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-6",
              audio:
                "The crate's too heavy for one person. | Leave it. I'll get Callum. | He's on the ring road until six. So maybe…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…we wait, or we split the load into two boxes.",
                "…we throw the lot.",
                "…we call the council hotline for fun.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2b-h1-7",
              audio:
                "If the app crashes at 4 p.m. again, the sandwiches go in the bin. | Then we need a paper list as backup. | Priya already said…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue?",
              options: [
                "…she'll pin one by the till from Monday.",
                "…the coffee is free today.",
                "…she's moving to Manchester.",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Listening · Part 2",
          instruction:
            "You will hear three conversations. Answer two questions on each. You will hear each conversation twice.",
          instructionEs:
            "Tres conversaciones × dos preguntas. Tema, roles, actitud. Todo ×2.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb2b-h2-g1",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Priya, the Monday trays came in late again. | I know. I told them not to leave anything by the bins. | They left two. One was already warm. | Then we don't list those. Warm chicken at 4 p.m. is a health thing, not a surplus thing. | Shall I write to them? | I'll call. A letter they file. A call they hear.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-1",
                  audio: "",
                  twice: true,
                  question: "What will they do with the warm tray?",
                  questionEs: "¿Qué harán con la bandeja caliente?",
                  options: [
                    "list it on the app anyway",
                    "not list it — it's a health risk",
                    "leave it by the bins overnight",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-2",
                  audio: "",
                  twice: true,
                  question: "How will Priya contact the supplier?",
                  questionEs: "¿Cómo contactará Priya al proveedor?",
                  options: ["by letter", "by phone", "in person at the bins"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb2b-h2-g2",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Leila, I can do Thursday and Saturday, not Friday — I'm on nights at the bakery. | Thursday is crates, Saturday is the till. Are you all right with cash? | I'd rather lift crates. The till makes me slow. | Then Thursday crates, and I'll find someone else for Saturday. Eat before you come; the meal is at nine and you'll be starving. | Got it. I'll be there at five.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-3",
                  audio: "",
                  twice: true,
                  question: "Which shift does the volunteer take?",
                  questionEs: "¿Qué turno coge la persona voluntaria?",
                  options: [
                    "Friday nights at the till",
                    "Thursday crates",
                    "Saturday till",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-4",
                  audio: "",
                  twice: true,
                  question: "What does Leila tell them to do before they arrive?",
                  questionEs: "¿Qué les dice Leila que hagan antes de llegar?",
                  options: [
                    "eat, because the meal is at nine",
                    "bring a chef diploma",
                    "come at nine, not five",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb2b-h2-g3",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Dr Vargas, thanks for coming. The piece is about food waste in hospitals, not about blaming nurses. | Good, because the waste is in the system: meals ordered twelve hours ahead for patients who are discharged at nine. | Would you go on air with your name? | Yes. I'm tired of posters telling staff to 'finish their plate'. | We can record on Friday morning, twenty minutes. | Friday I have clinic. Thursday after five, or not this week.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-5",
                  audio: "",
                  twice: true,
                  question: "Where does Dr Vargas put the blame?",
                  questionEs: "¿Dónde pone la culpa la dra. Vargas?",
                  options: [
                    "on nurses who don't finish plates",
                    "on a system that orders meals hours ahead",
                    "on the community kitchen",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h2-6",
                  audio: "",
                  twice: true,
                  question: "When can she record?",
                  questionEs: "¿Cuándo puede grabar?",
                  options: [
                    "Friday morning",
                    "Thursday after five",
                    "not this week at all",
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
            "You will hear a talk. Complete the notes with 1–5 words. You will hear the talk twice.",
          instructionEs:
            "Monólogo sobre una cocina comunitaria. Completa la ficha: de 1 a 5 palabras por hueco. Dos escuchas.",
          items: [
            {
              kind: "hoeren-notes",
              id: "enb2b-h3",
              twice: true,
              title: "Green Street Kitchen — notes",
              titleEs: "Notas de Green Street Kitchen",
              audio:
                "I'm Callum Reid. I bake nights on the ring road, and three evenings a week I come to Green Street Kitchen. We open Tuesday, Thursday and Saturday, five until nine. We don't take bookings; if the food runs out, it runs out. " +
                "Who eats here? Shift workers, students, a few people who won't say why they came, which is fine. A meal is two pounds if you can pay, nothing if you can't. We don't ask which. " +
                "The food is surplus: bread the supermarket won't take after midnight, vegetables a stall couldn't sell, sandwiches Priya lists at four and nobody collects. We don't serve pork, and we don't fry in the same oil twice. " +
                "Last year the council tried to charge us commercial waste rates. A letter from Dr Vargas and four hundred signatures stopped that. " +
                "What we need now isn't another poster. It's a change in the bakery contracts so that same-day bread can leave through the front door, not the bin. Until then, I'll keep carrying crates at five.",
              gaps: [
                {
                  id: "enb2b-h3-1",
                  prompt: "Open:",
                  promptEs: "Abre:",
                  answers: [
                    "Tue Thu Sat 5-9",
                    "Tuesday Thursday and Saturday",
                    "Tuesday Thursday Saturday 5-9",
                    "Tue, Thu, Sat 5-9 pm",
                    "5-9 Tuesday Thursday Saturday",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-2",
                  prompt: "Bookings:",
                  promptEs: "Reservas:",
                  answers: [
                    "not taken",
                    "none",
                    "no bookings",
                    "don't take bookings",
                    "we don't take bookings",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-3",
                  prompt: "Price of a meal:",
                  promptEs: "Precio de una comida:",
                  answers: [
                    "£2 or nothing",
                    "two pounds or nothing",
                    "2 pounds or nothing",
                    "two pounds if you can",
                    "two pounds",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-4",
                  prompt: "They don't serve:",
                  promptEs: "No sirven:",
                  answers: ["pork", "no pork"],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-5",
                  prompt: "Council tried to:",
                  promptEs: "El ayuntamiento intentó:",
                  answers: [
                    "charge commercial waste rates",
                    "commercial waste rates",
                    "charge commercial rates",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-6",
                  prompt: "What stopped that?",
                  promptEs: "¿Qué lo paró?",
                  answers: [
                    "letter and 400 signatures",
                    "a letter and 400 signatures",
                    "400 signatures",
                    "four hundred signatures",
                    "Dr Vargas and 400 signatures",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-h3-7",
                  prompt: "What does he want changed?",
                  promptEs: "¿Qué quiere que cambie?",
                  answers: [
                    "bakery contracts",
                    "same-day bread contracts",
                    "the bakery contracts",
                    "bakery contracts on same-day bread",
                  ],
                  maxWords: 5,
                },
              ],
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "You will hear a discussion. Answer six questions. You will hear it twice.",
          instructionEs:
            "Dos voces: ¿multar el desperdicio o cambiar contratos? Seis MC. Dos escuchas.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb2b-h4",
              twice: true,
              dialog: true,
              readSeconds: 45,
              audio:
                "Ms Chen: Fines work. Sixty pounds for a caddy in the wrong bin is a language people understand. | " +
                "Dr Ines Vargas: Fines work on households. They do not work on a supermarket contract that forbids a bakery to give bread away. You're ticketing the wrong door. | " +
                "Ms Chen: If we wait for contracts, we'll wait five years. The caddy rule starts in November. That's something we can do now. | " +
                "Dr Vargas: Something is not the same as the right thing. A household that puts leftovers in the black bin is not the same as a warehouse that bins a third of a day's bake. | " +
                "Ms Chen: Then campaign for the contract. Meanwhile, collections twice a week, before seven, keep the rats down. That's also public health, which is your field. | " +
                "Dr Vargas: Public health is also not humiliating people who can't pay two pounds for a meal. The kitchen on Green Street does more against waste than a laminated poster. Fund that, don't fine the street it stands on. | " +
                "Ms Chen: We didn't fine the kitchen. We proposed commercial rates because they cook every night. The signatures changed that. I can live with it. | " +
                "Dr Vargas: Then live with this too: a twelve-month pilot that lets bakeries donate same-day bread without breaking the supermarket clause. If the numbers are ugly, we stop. If they're not, you've done more than a caddy. | " +
                "Ms Chen: A pilot I can take to committee. A promise to rewrite every contract this year I cannot. | " +
                "Dr Vargas: Then we agree on a pilot, and we don't pretend the caddy is the whole policy.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-1",
                  audio: "",
                  twice: true,
                  question: "What is Ms Chen's opening argument?",
                  questionEs: "¿Cuál es el argumento inicial de Ms Chen?",
                  options: [
                    "fines are a language people understand",
                    "contracts should be rewritten this year",
                    "the kitchen should close",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-2",
                  audio: "",
                  twice: true,
                  question: "Why does Dr Vargas say fines miss the point?",
                  questionEs: "¿Por qué dice la dra. Vargas que las multas no dan en el blanco?",
                  options: [
                    "they only hit households, not supermarket contracts",
                    "they are too low",
                    "nobody has a caddy",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-3",
                  audio: "",
                  twice: true,
                  question: "What public-health point does Ms Chen make?",
                  questionEs: "¿Qué punto de salud pública hace Ms Chen?",
                  options: [
                    "collections twice a week keep rats down",
                    "pork should be banned",
                    "nurses waste too much",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-4",
                  audio: "",
                  twice: true,
                  question: "What does Dr Vargas want funded?",
                  questionEs: "¿Qué quiere financiado la dra. Vargas?",
                  options: [
                    "more laminated posters",
                    "the Green Street Kitchen",
                    "a new supermarket",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-5",
                  audio: "",
                  twice: true,
                  question: "What pilot does she propose?",
                  questionEs: "¿Qué piloto propone?",
                  options: [
                    "twelve months allowing bakeries to donate same-day bread",
                    "a fine of £60 for every loaf",
                    "closing collections in November",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2b-h4-6",
                  audio: "",
                  twice: true,
                  question: "What can they agree on?",
                  questionEs: "¿En qué pueden coincidir?",
                  options: [
                    "rewriting every contract this year",
                    "a pilot, without pretending the caddy is the whole policy",
                    "ending all fines immediately",
                  ],
                  answer: 1,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      skill: "lesen",
      label: "Reading",
      minutes: 80,
      teile: [
        {
          title: "Reading · Part 1",
          instruction: "Read the text and choose a, b or c.",
          instructionEs: "Un texto largo, seis MC. Información, ideas, opiniones.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb2b-r1-1",
              title: "The bread that cannot be given away",
              text:
                "Every night, somewhere on the ring road, a bakery throws away bread that was edible at midnight and classified as waste at 12.01. The reason is not taste. It is a clause: 'same-day only'. The supermarket that signed it does not want yesterday's loaf next to today's. The kitchen a mile down the road would take the lot. The contract says no.\n\n" +
                "This is the kind of waste that posters about leftovers do not reach. A household can learn to use a caddy. A warehouse cannot learn its way around a clause without someone rewriting it. Campaigners like Dr Ines Vargas have started saying this out loud, which makes them less popular in committee than people who print the posters. A poster asks you to finish your plate. A clause decides whether a crate ever leaves the loading bay. Those are not the same job, and treating them as the same job is how a committee stays comfortable.\n\n" +
                "The bakery staff know the hour. They bag what they can for staff, then they bin the rest because a manager with a clipboard will count the trays against the contract, not against hunger a mile away. Nobody in that room is cruel. The cruelty is already written, in a font small enough that a night shift can miss it and a lawyer will not. Vargas's point is boring on purpose: if the sentence that forbids donation is still there on Monday, the caddy on Green Street is theatre.\n\n" +
                "There is a second waste, quieter. Meals in hospitals ordered twelve hours ahead for patients who have already gone home. Nurses did not cause that. A timetable did. Treating it as a manners problem — 'finish your plate' — is a way of not looking at the timetable. A ward that orders at nine for a discharge at eleven is not a ward of wasteful people. It is a ward whose software cannot cancel a tray once the kitchen has started the run. The poster does not reach the software either.\n\n" +
                "Green Street Kitchen sits between these two facts and does the unglamorous work: crates at five, a meal at nine, two pounds or nothing. Leila's volunteers do not rewrite supermarket contracts. They lift what the clause still allows, cook it, and send people home less hungry than they arrived. It will not trend. It will, if the contracts ever move, have less to carry. That would be a kind of success that does not look like one on a poster.\n\n" +
                "Vargas is not asking the kitchen to become a campaign. She is asking the committee to stop congratulating itself for the kitchen. A crate that never had to leave the bakery is a better evening than a heroic sort at five. Until the 'same-day only' line is struck out, Green Street will keep doing the work that looks like charity and is, in fact, logistics the contract refused to do. The listening figures of a campaign do not feed anyone. The clause, rewritten, would.",
              question: "Why is the bread thrown away?",
              questionEs: "¿Por qué se tira el pan?",
              options: [
                "it tastes bad after midnight",
                "a 'same-day only' supermarket clause",
                "the kitchen refuses it",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r1-2",
              question: "What can a household do that a warehouse cannot?",
              questionEs: "¿Qué puede hacer un hogar que un almacén no puede?",
              options: [
                "rewrite a supermarket clause",
                "learn to use a caddy",
                "open a kitchen",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r1-3",
              question: "Why are campaigners like Dr Vargas less popular in committee?",
              questionEs: "¿Por qué caen peor en comisión quienes hacen campaña como la dra. Vargas?",
              options: [
                "they say the clause has to be rewritten, not just poster-ed",
                "they want to close bakeries",
                "they oppose caddies",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r1-4",
              question: "What causes the hospital waste, according to the writer?",
              questionEs: "¿Qué causa el desperdicio hospitalario, según el texto?",
              options: [
                "nurses' bad manners",
                "a timetable that orders meals hours ahead",
                "patients who refuse food",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r1-5",
              question: "What does Green Street Kitchen actually do?",
              questionEs: "¿Qué hace de verdad Green Street Kitchen?",
              options: [
                "prints posters about leftovers",
                "turns surplus into meals, two pounds or nothing",
                "rewrites supermarket contracts",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r1-6",
              question: "What would 'success' look like for the kitchen?",
              questionEs: "¿Cómo se vería el «éxito» para la cocina?",
              options: [
                "trending on social media",
                "having less to carry because contracts moved",
                "charging commercial waste rates",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Six sentences have been removed. Choose the correct sentence for each gap. One sentence is extra.",
          instructionEs:
            "Seis huecos, siete frases, una sobra. Cohesión, no parecido léxico.",
          items: [
            {
              kind: "lesen-insert",
              id: "enb2b-r2",
              title: "How a surplus café actually works at four o'clock",
              text:
                "At four, Priya does not 'rescue' food. ___(1)___ She lists what is left, at a price that is not free and not full, and she waits.\n\n" +
                "The wait is the point. ___(2)___ A gift that costs nothing is easier to bin in the head before you collect it.\n\n" +
                "If the app is down, there is a paper list by the till. ___(3)___ Digital virtue that collapses at 16:01 is not a system.\n\n" +
                "Warm chicken is not listed. ___(4)___ Surplus is not a synonym for unsafe.\n\n" +
                "Suppliers who leave trays by the bins get a call, not a newsletter. ___(5)___ A file is where good intentions go to sleep.\n\n" +
                "By six, whatever remains walks to Green Street. ___(6)___ The café's job is to make that walk ordinary, not heroic.",
              sentences: [
                { key: "a", text: "She prices it so that collecting it still feels like shopping." },
                { key: "b", text: "People who pay two pounds show up; people promised a favour often don't." },
                { key: "c", text: "A handwritten backup is unfashionable and, at 4 p.m., the whole policy." },
                { key: "d", text: "That is a health line, not a branding line." },
                { key: "e", text: "Awards for 'zero waste' look better on a window than in a bin alley." },
                { key: "f", text: "A conversation they cannot file is the one they remember." },
                { key: "g", text: "Not as a stunt, as the last ordinary step of the day." },
              ],
              gaps: [
                { id: "enb2b-r2-1", answer: "a" },
                { id: "enb2b-r2-2", answer: "b" },
                { id: "enb2b-r2-3", answer: "c" },
                { id: "enb2b-r2-4", answer: "d" },
                { id: "enb2b-r2-5", answer: "f" },
                { id: "enb2b-r2-6", answer: "g" },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts. A text may be used more than once.",
          instructionEs:
            "Cuatro textos, siete preguntas, un texto puede repetir. Postura y propósito, no solo el dato.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb2b-r3-1",
              title: "Four texts about surplus food",
              text: FOUR_TEXTS,
              question: "Which text sets fines and collection times?",
              questionEs: "¿Qué texto fija multas y horarios de recogida?",
              options: ["Text A", "Text B", "Text C"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-2",
              question: "Which text is written by a café manager to suppliers?",
              questionEs: "¿Qué texto lo escribe la encargada de un café a los proveedores?",
              options: ["Text B", "Text C", "Text D"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-3",
              question: "Which text is recruiting volunteers?",
              questionEs: "¿Qué texto busca voluntarios?",
              options: ["Text A", "Text C", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-4",
              question: "Which text is angry about a supermarket clause?",
              questionEs: "¿Qué texto está enfadado con una cláusula de supermercado?",
              options: ["Text B", "Text C", "Text D"],
              answer: 2,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-5",
              question: "Which text says not to send a long story with the application?",
              questionEs: "¿Qué texto dice que no envíes un rollo con la solicitud?",
              options: ["Text A", "Text C", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-6",
              question: "Which text asks suppliers not to send extra trays on Mondays?",
              questionEs: "¿Qué texto pide a los proveedores que no manden bandejas de más los lunes?",
              options: ["Text A", "Text B", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2b-r3-7",
              question: "Which text tells you not to email the kitchen about collections?",
              questionEs: "¿Qué texto dice que las recogidas no se consultan a la cocina?",
              options: ["Text A", "Text B", "Text C"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction:
            "Read the text and answer the questions. Write short answers of one to five words.",
          instructionEs:
            "Texto continuo, siete preguntas tipo wh-. Escribe como máximo 5 palabras por respuesta.",
          items: [
            {
              kind: "lesen-notes",
              id: "enb2b-r4",
              title: "Leila Rahman, who runs the till and the rota",
              text:
                "Leila Rahman came to Green Street Kitchen the long way. She trained as a bookkeeper, hated the office, and walked in one Thursday because a friend said they needed someone who could add. She can add. She can also tell, without a speech, who will pay two pounds and who will not, and she does not write either fact down.\n\n" +
                "The rota is her invention. Two people on crates, one on the till, nobody in the kitchen who has not been shown the oil rule. Shifts are 5–9 p.m. The meal is at nine so that volunteers actually eat, which they forget to do. She has no patience for people who apply with a page about why food waste matters and no dates they can work.\n\n" +
                "What she wants from the council is not a poster. It is the bakery clause, and a promise that commercial waste rates will not come back in a quieter year. What she wants from volunteers is simpler: come at five, lift what you can, leave the speeches at the door. The food, she says, is already a speech.",
              gaps: [
                {
                  id: "enb2b-r4-1",
                  prompt: "What did Leila train as?",
                  promptEs: "¿De qué se formó Leila?",
                  answers: ["bookkeeper", "a bookkeeper"],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-2",
                  prompt: "Why did she first walk in?",
                  promptEs: "¿Por qué entró la primera vez?",
                  answers: [
                    "needed someone who could add",
                    "a friend asked her",
                    "friend said they needed her",
                    "they needed someone who adds",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-3",
                  prompt: "What does she not write down?",
                  promptEs: "¿Qué no anota?",
                  answers: [
                    "who pays two pounds",
                    "who pays and who doesn't",
                    "who can pay",
                    "who pays",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-4",
                  prompt: "Why is the meal at nine?",
                  promptEs: "¿Por qué la comida es a las nueve?",
                  answers: [
                    "so volunteers actually eat",
                    "volunteers actually eat",
                    "so they eat",
                    "so volunteers eat",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-5",
                  prompt: "What kind of application does she dislike?",
                  promptEs: "¿Qué tipo de solicitud le disgusta?",
                  answers: [
                    "a page and no dates",
                    "no dates they can work",
                    "page about waste no dates",
                    "a page with no dates",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-6",
                  prompt: "What does she want from the council?",
                  promptEs: "¿Qué quiere del ayuntamiento?",
                  answers: [
                    "the bakery clause",
                    "bakery clause",
                    "no return of commercial rates",
                    "the bakery clause back",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2b-r4-7",
                  prompt: "What does she want from volunteers?",
                  promptEs: "¿Qué quiere de los voluntarios?",
                  answers: [
                    "come at five",
                    "come at five and lift",
                    "leave speeches at the door",
                    "come at five, lift",
                  ],
                  maxWords: 5,
                },
              ],
            },
          ],
        },
      ],
    },

    {
      skill: "schreiben",
      label: "Writing",
      minutes: 50,
      teile: [
        {
          title: "Writing · Part 1 (100–150 words)",
          instruction:
            "Write a formal response to the named reader. 100–150 words. Cover all points.",
          instructionEs:
            "Carta formal, lector especificado, 100-150 palabras, todos los puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb2b-w1",
              task:
                "Write to Ms Chen at Westway Council. 100–150 words. Cover all three points.",
              taskEs:
                "Escribe a Ms Chen en el ayuntamiento. 100-150 palabras, tres puntos.",
              stimulus: {
                source: "Westway Council — consultation on bakery surplus",
                text:
                  "We are considering a twelve-month pilot allowing bakeries to donate same-day bread to registered kitchens. Write to Ms Chen, Waste Policy, with: how this would affect a kitchen you know, what safeguards you would want (health, hours, who collects), and whether households should still face caddy fines during the pilot.",
              },
              points: [
                "Explica cómo el piloto ayudaría a una cocina que conoces",
                "Propón una salvaguarda concreta (higiene, horario, quién recoge)",
                "Di si durante el piloto seguirías multando los cubos domésticos, y por qué",
              ],
              words: 130,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "Dear Ms Chen,\n\n" +
                "I am writing in support of the twelve-month bakery pilot, from the point of view of Green Street Kitchen, where I volunteer.\n\n" +
                "Same-day bread that currently goes in the bin after midnight is exactly what we cook with. A legal route from the ring-road bakery to our door would cut both waste and the late-night carrying we do now.\n\n" +
                "As a safeguard, donations should be collected before 6 a.m., logged, and not mixed with anything already warm. Volunteers who have done the kitchen's food-hygiene briefing — not whoever is nearest the alley — should sign for each crate.\n\n" +
                "Household caddy fines can stay during the pilot: they address a different door. What they must not do is pretend to be the whole policy while the clause still stands.\n\n" +
                "Yours sincerely,\nValeria Soto",
            },
          ],
        },
        {
          title: "Writing · Part 2 (150–200 words)",
          instruction:
            "Write a personal letter, narrative or description. 150–200 words.",
          instructionEs:
            "Carta, relato o descripción — no un ensayo a favor y en contra. 150-200 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb2b-w2",
              task:
                "Write a letter to a friend who is thinking of volunteering at a community kitchen. Describe one shift and say whether they should come. 150–200 words.",
              taskEs:
                "Carta a un amigo que piensa apuntarse a una cocina comunitaria. Describe un turno y dile si merece la pena. 150-200 palabras.",
              points: [
                "Describe un turno concreto (hora, tareas, una escena)",
                "Di qué se te dio mal o qué no esperabas",
                "Recomienda ir o no, con una condición (días, fuerza, nada de discursos)",
              ],
              words: 175,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "Hi Callum,\n\n" +
                "You asked about Green Street. I'll tell you Thursday, not the idea of Thursday.\n\n" +
                "I arrived at five. Leila put me on crates, not the till — I still count too slowly. We carried bread the bakery isn't allowed to give away and vegetables a stall couldn't sell. At nine we ate, which I had forgotten to do. Nobody asked why anyone was there. That was the part I hadn't expected: the quiet.\n\n" +
                "What went wrong was my back, halfway through the second crate. I should have split the load. Leila said that without making a speech, which is how she says everything.\n\n" +
                "Come, but come on a day you can lift, and don't write her a page about waste. Send two dates. The food is already the speech.\n\n" +
                "If Thursday's impossible, Saturday is the till, and you'd hate the till.\n\n" +
                "Valeria",
            },
          ],
        },
      ],
    },

    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 13,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction: "Personal information and opinions. Spell your family name.",
          instructionEs: "Datos y opiniones. Deletrea el apellido.",
          items: [
            {
              kind: "sprechen",
              id: "enb2b-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Name and spell your family name. Where are you from? What do you do? Do you throw food away at home? Should shops be fined for binning food that is still edible? Why?",
              promptEs:
                "Nombre, apellido deletreado, origen, oficio. ¿Tiras comida en casa? ¿Habría que multar a las tiendas que tiran comida aún comestible?",
              model:
                "My name is Valeria Soto, S-O-T-O. I'm from Bogotá and I live in London. I volunteer at a community kitchen two evenings a week. At home I throw less than I used to, because the kitchen has made the bin look like a choice. I think shops should face a cost for binning edible food — not a moral lecture, a clause. Households and warehouses are not the same door.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction: "Respond; in the last situation, you start.",
          instructionEs: "Dos situaciones a responder y una que inicias tú.",
          items: [
            {
              kind: "sprechen",
              id: "enb2b-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — A neighbour says: 'Your kitchen's bins attract rats.' Respond. Situation 2 — A manager says: 'We can't donate bread; the contract forbids it.' Respond with a reason and a suggestion. Situation 3 — YOU start: at the council desk, you want to know how to register a kitchen for the bakery pilot. Ask.",
              promptEs:
                "1: un vecino se queja de ratas. 2: un encargado dice que el contrato impide donar pan. 3: tú empiezas — en la ventanilla preguntas cómo registrar una cocina en el piloto.",
              model:
                "1. I'm sorry they're out. We can move the collection to before seven and keep the lids down — that's on us. — 2. I understand the clause. Could we at least log what you bin for a month, so the council can see the scale? A pilot only works if someone counts. — 3. Good morning. I'd like to register Green Street Kitchen for the same-day bread pilot. Could you tell me what documents you need and how long it takes?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction: "Discuss the written prompt and agree a plan.",
          instructionEs: "El apoyo es un texto escrito. Salid con un plan concreto.",
          items: [
            {
              kind: "sprechen",
              id: "enb2b-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "WRITTEN PROMPT: The kitchen must drop one night. Option 1: drop Tuesday (quietest). Option 2: drop Saturday (most volunteers, also most diners). Option 3: open all three nights but close at 8, not 9. Discuss, choose, and agree what you would measure after a month — meals served, leftover crates, or complaints from the street.",
              promptEs:
                "Hay que quitar una noche. Tres opciones. Elegid y decidid qué mediríais al mes.",
              model:
                "I wouldn't drop Saturday — that's when the bakery surplus actually arrives. Tuesday is quieter, so if we have to lose a night, that's the one. Closing at eight on all three nights would cut the meal, and Leila's whole point is that volunteers eat at nine. After a month I'd measure leftover crates, not just meals: if Tuesday's crates just move to Thursday and overflow, we haven't saved anything. Shall we take 'drop Tuesday, review crates in four weeks' to Leila?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "30 seconds to prepare, then about 2 minutes. Follow-up questions after.",
          instructionEs: "30 s de preparación, 2 minutos de monólogo, luego preguntas.",
          items: [
            {
              kind: "sprechen",
              id: "enb2b-sp4",
              teil: 4,
              weight: 3,
              prepSeconds: 30,
              speakSeconds: 120,
              prompt:
                "Topic: SOMETHING YOUR CITY THROWS AWAY. Talk about a kind of waste where you live — food, clothes, light, time. Say what is thrown, why, who could use it, and what a small change would look like.",
              promptEs:
                "Algo que tu ciudad tira: qué es, por qué, quién podría usarlo y cómo sería un cambio pequeño.",
              model:
                "Where I live, the waste I keep noticing is bread. Not crumbs — whole trays, because a clause says 'same-day only'. At midnight it's food; at 12.01 it's a bin. A kitchen a mile away would take it. The contract says no. Posters about leftovers at home don't reach that door. A small change wouldn't be a campaign video. It would be a twelve-month pilot that lets a bakery hand the tray to a registered kitchen before dawn, logged, not heroic. If the numbers are ugly, you stop. If they're not, you've done more than a caddy and a fine. I think cities get stuck on the household because it's visible. The warehouse is quieter, and that's where the volume is.",
            },
          ],
        },
      ],
    },
  ],
};
