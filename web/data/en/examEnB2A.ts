import type { ExamSet, RubricCriterion } from "@/lib/examTypes";

// ─────────────────────────────────────────────────────────────────────────────
// LanguageCert Communicator Set A — B2, handbook LRW v7.0 / Speaking v6.0.
// PLAN-EN-B2.md §1.1. Tema: radio comunitaria y periodismo de barrio
// (Westway Voices). DISTINTO de examEnB1A (viaje/trabajo), B1B (salud/ocio)
// y B1C (educación/tecnología).
//
//   LISTENING ~30′ · 4 partes · 26 · TODO ×2
//     T1 7 conversaciones inacabadas (una formal) → hoeren-mc «¿cómo sigue?»
//     T2 3 conv × 2 MC → hoeren-group
//     T3 ficha 7 huecos 1-5 palabras → hoeren-notes (un monólogo ×2)
//     T4 discusión 6 MC → hoeren-group
//   READING · 26
//     T1 un texto largo 6 MC · T2 lesen-insert 6 de 7 · T3 4 textos 7 MC
//        (un texto PUEDE repetir) · T4 7 wh- → lesen-notes (máx. 5 palabras)
//   WRITING 2 tareas 100-150 y 150-200 · rúbrica 12+12
//   SPEAKING 13′ · 4 partes · Part 4: 30 s + 2 min
// Baremo: Pass 50 · High Pass 67 · NO modular · compensable.
// ─────────────────────────────────────────────────────────────────────────────

const RUBRIC_WRITING_12: RubricCriterion[] = [
  {
    id: "task",
    label: "Task fulfilment — cumplimiento de la tarea",
    help: "¿Tratas los puntos de contenido y te acercas al número de palabras? Off-topic no baja la banda: la anula.",
    bands: [3, 2, 1, 0],
    fatalE: true,
  },
  {
    id: "grammar",
    label: "Accuracy and Range of Grammar — gramática",
    help: "Variedad de B2 (relativas, pasiva, condicionales, estilo indirecto ligero) y que los errores no estorben.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "vocabulary",
    label: "Accuracy and Range of Vocabulary — vocabulario",
    help: "Precisión y registro: fórmulas formales en la Tarea 1, tono de amigo o de relato en la 2.",
    bands: [3, 2, 1, 0],
  },
  {
    id: "organisation",
    label: "Organisation — coherencia y puntuación",
    help: "Párrafos, conectores (whereas, even so, as a result) y la coma inglesa. Encabezado, cuerpo, cierre.",
    bands: [3, 2, 1, 0],
  },
];

const FOUR_TEXTS =
  "TEXT A — Notice from Westway Council\n" +
  "From 1 October, community radio stations using council rooms after 10 p.m. must apply for a late licence. Applications take ten working days. No extra fee if you already hold a daytime permit. Complaints about volume should go to the noise team, not to the station itself.\n\n" +
  "TEXT B — Email from Fiona Blake to the station manager\n" +
  "Harvey, last Thursday's live show ran until 11.20 and the neighbours in Palmer Road have written to me again. I know the guests were good, but we cannot keep doing this. Can we put a hard stop at 10.50 and record the rest? I don't want the council to pull our room.\n\n" +
  "TEXT C — Job notice\n" +
  "Westway Voices needs a part-time producer, two evenings a week. You will book guests, edit short packages and cover the live desk if the presenter is ill. No journalism degree required; a calm voice and basic editing software are. Send a two-minute demo, not a CV essay, to jobs@westwayvoices.org by Friday.\n\n" +
  "TEXT D — Forum post by Yusuf Rahman\n" +
  "Is anyone else tired of local radio that only plays requests? I started listening because they interviewed the night-bus drivers and the library staff who keep the place open till ten. That was news I couldn't get anywhere else. If they become just another playlist, I'll go back to podcasts.";

export const examEnB2A: ExamSet = {
  id: "en-b2-sim-a",
  level: "b2",
  title: "LanguageCert Communicator Set A",
  description:
    "Simulacro completo del LanguageCert ESOL B2 Communicator: radio comunitaria y periodismo de barrio. Listening ~30′ todo ×2, Reading 26 ítems, Writing 100-150 y 150-200 palabras. Pass 50 %, High Pass 67 %, compensable, no modular.",
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
            "You will hear seven unfinished conversations. Choose the best way to continue each one (a, b or c). You will hear each recording twice. One conversation is in a formal setting.",
          instructionEs:
            "Siete conversaciones inacabadas. No eliges «lo que oyes»: eliges CÓMO SIGUE. Una de las siete es formal (reunión o ventanilla). Cada audio, dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-1",
              audio:
                "The ten o'clock show overran again last night. | I know. Harvey's going to be furious. | So what do we do — cut the last interview next time, or…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…or we start the music bed thirty seconds earlier.",
                "…or the bus is late again.",
                "…or I didn't get the job.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-2",
              audio:
                "Could you stay until eleven? The guest's train is delayed. | I would, but I've got the night bus to catch. | Right, then maybe Amy can…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…cover the last ten minutes from home.",
                "…book a table for two.",
                "…pass the exam on Friday.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-3",
              audio:
                "I thought the interview with the librarian was the best thing we've done this month. | Same here. We should ask her back. | Only if she…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…agrees to talk about the late-night opening, not just the books.",
                "…brings her passport.",
                "…pays for the studio.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-4",
              audio:
                "Good afternoon. I'm calling from Westway Voices about the late licence for room B. | One moment. Do you already hold a daytime permit? | Yes, we do. The reference is WV-441. | In that case…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue? (esta es la formal)",
              options: [
                "…you won't be charged an extra fee; allow ten working days.",
                "…come to the party on Saturday.",
                "…the train leaves from platform six.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-5",
              audio:
                "Ben, can you do a live cross from the night bus depot? | After my shift, yes. Before that I'm driving. | Fine. We'll go to you at…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…half past nine, when you're off the wheel.",
                "…the supermarket on the corner.",
                "…your sister's wedding.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-6",
              audio:
                "The edit on the night-library piece is still rough. | I can stay and finish it. | Would you? I promised Fiona it'd be…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…ready before the morning meeting.",
                "…a pizza with extra cheese.",
                "…closed on Mondays.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb2a-h1-7",
              audio:
                "If the council pulls the room, where do we broadcast from? | Sam said we could use the café after hours. | That's kind, but the espresso machine…",
              twice: true,
              question: "How does the conversation continue?",
              questionEs: "¿Cómo sigue la conversación?",
              options: [
                "…is far too loud for a live microphone.",
                "…makes the best coffee in London.",
                "…needs a new passport.",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Listening · Part 2",
          instruction:
            "You will hear three conversations. For each one, answer two questions. You will hear each conversation twice.",
          instructionEs:
            "Tres conversaciones, dos preguntas cada una: tema, relación, propósito, actitud. Todo dos veces.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb2a-h2-g1",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Fiona, the neighbours in Palmer Road have written again. | I saw. They're not wrong — we did run long. | So we kill the live phone-in after ten-thirty? | Not kill it. Record it and play it the next day. Live after half ten is what gets us the complaints. | Harvey won't like losing the spark. | Harvey can like a station that still has a room.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-1",
                  audio: "",
                  twice: true,
                  question: "What do they decide to do with the phone-in?",
                  questionEs: "¿Qué deciden hacer con las llamadas en directo?",
                  options: [
                    "cancel it completely",
                    "record it and broadcast it the next day",
                    "move it to Palmer Road",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-2",
                  audio: "",
                  twice: true,
                  question: "How does Fiona feel about Harvey's reaction?",
                  questionEs: "¿Cómo ve Fiona la reacción de Harvey?",
                  options: [
                    "she thinks keeping the room matters more than his taste",
                    "she wants to do whatever Harvey prefers",
                    "she plans to leave the station",
                  ],
                  answer: 0,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb2a-h2-g2",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Valeria, thanks for coming in. The producer job — two evenings, booking guests and covering the desk. | I've produced student radio, never a paid desk. | That's fine. The demo you sent was calm, which is rarer than people think. Could you start next Tuesday? | Tuesday's my late class. Wednesday I can do. | Wednesday it is. Bring headphones; we haven't got spares.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-3",
                  audio: "",
                  twice: true,
                  question: "What is the relationship between the speakers?",
                  questionEs: "¿Qué relación hay entre los hablantes?",
                  options: [
                    "interviewer and job applicant",
                    "two neighbours complaining",
                    "a doctor and a patient",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-4",
                  audio: "",
                  twice: true,
                  question: "When can Valeria start?",
                  questionEs: "¿Cuándo puede empezar Valeria?",
                  options: ["on Tuesday", "on Wednesday", "after her exams"],
                  answer: 1,
                },
              ],
            },
            {
              kind: "hoeren-group",
              id: "enb2a-h2-g3",
              twice: true,
              dialog: true,
              readSeconds: 20,
              audio:
                "Amy, we're doing a piece on nurses who work nights and still listen to us on the way home. Would you talk? | On air? I'd rather not use my name. The ward's already short. | We can call you 'a nurse in north London'. No hospital, no surname. | Then yes. But not this week — I'm on nights until Friday. | Saturday morning, ten minutes, here or on the phone. | Phone. If I sit in a studio I'll fall asleep.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-5",
                  audio: "",
                  twice: true,
                  question: "What is Amy willing to do?",
                  questionEs: "¿Qué está dispuesta a hacer Amy?",
                  options: [
                    "appear this week with her full name",
                    "speak if she is not named and not this week",
                    "visit the studio on Saturday",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h2-6",
                  audio: "",
                  twice: true,
                  question: "Why does she prefer the phone?",
                  questionEs: "¿Por qué prefiere el teléfono?",
                  options: [
                    "the studio is too far",
                    "she would fall asleep in the studio",
                    "she doesn't like the presenter",
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
            "You will hear a radio talk. Complete the notes with 1–5 words. You will hear the talk twice.",
          instructionEs:
            "Monólogo: un reportaje sobre la biblioteca nocturna. Completa la ficha: de 1 a 5 palabras por hueco. Dos escuchas.",
          items: [
            {
              kind: "hoeren-notes",
              id: "enb2a-h3",
              twice: true,
              title: "The night library on Green Street",
              titleEs: "La biblioteca nocturna de Green Street",
              audio:
                "This is Westway Voices, and I'm Owen Griffiths with a look at the night library on Green Street. It opened in March, three evenings a week, Tuesday, Thursday and Saturday, from seven until ten. Not a party, not a crèche — a quiet room with desks, power sockets and a librarian until closing. " +
                "Who comes? Students, yes, but also night-bus drivers on a break, and a surprising number of people over sixty who say the daytime is too noisy. Membership is free if you live in the borough; visitors pay two pounds. " +
                "The council almost didn't fund it. The first plan was to shut the branch at five to save money. A petition with four thousand names changed that. " +
                "Rules are simple: no hot food, phones on silent, and the last computer logs off at nine forty-five so people actually leave. " +
                "Next month they start a short radio slot from the reading room — five minutes, live, no music. That's why I'm here. If it works, you'll hear it on this station. If it doesn't, the room will still be there, which is the point.",
              gaps: [
                {
                  id: "enb2a-h3-1",
                  prompt: "Opening days:",
                  promptEs: "Días de apertura:",
                  answers: [
                    "Tuesday Thursday and Saturday",
                    "Tuesday, Thursday and Saturday",
                    "Tuesday Thursday Saturday",
                    "Tue Thu Sat",
                    "Tuesdays Thursdays Saturdays",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-2",
                  prompt: "Hours:",
                  promptEs: "Horario:",
                  answers: [
                    "7-10",
                    "7-10 pm",
                    "7-10 p.m.",
                    "7 until 10",
                    "seven until ten",
                    "from seven until ten",
                    "7 to 10",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-3",
                  prompt: "Visitor fee:",
                  promptEs: "Precio para no residentes:",
                  answers: ["two pounds", "£2", "2 pounds", "2"],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-4",
                  prompt: "Why it almost closed:",
                  promptEs: "Por qué casi cierra:",
                  answers: [
                    "to save money",
                    "save money",
                    "shut at five",
                    "close at five",
                    "shut the branch at five",
                    "close at 5",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-5",
                  prompt: "Petition signatures:",
                  promptEs: "Firmas de la petición:",
                  answers: ["4000", "4,000", "four thousand", "four thousand names"],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-6",
                  prompt: "Last computer logs off at:",
                  promptEs: "El último ordenador se apaga a las:",
                  answers: ["9.45", "9:45", "nine forty-five", "9 45", "945"],
                  maxWords: 5,
                },
                {
                  id: "enb2a-h3-7",
                  prompt: "Next month's radio slot:",
                  promptEs: "La franja de radio del mes que viene:",
                  answers: [
                    "five minutes live no music",
                    "5 minutes live no music",
                    "five minutes live",
                    "five minutes",
                    "live no music",
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
            "You will hear a discussion. Answer the six questions. You will hear the discussion twice.",
          instructionEs:
            "Dos voces discuten si la radio local debe ser más noticia o más música. Seis MC. Hecho frente a opinión, contraste, propósito. Dos escuchas.",
          items: [
            {
              kind: "hoeren-group",
              id: "enb2a-h4",
              twice: true,
              dialog: true,
              readSeconds: 45,
              audio:
                "Harvey Quinn: Fiona, the numbers are down. People want music in the evening, not another interview with a librarian. | " +
                "Fiona Blake: The numbers dipped in August, Harvey. They always dip in August. The night-library piece is the most shared thing we've put out this year. | " +
                "Harvey: Shared isn't listened-to. A share is a polite nod. A listen is forty minutes with us on. Music holds people. Talk makes them tap away. | " +
                "Fiona: Talk makes them come back the next day. The bus-driver interviews did that. Music is everywhere. A woman who keeps a library open until ten is not. | " +
                "Harvey: I'm not saying drop the features. I'm saying put them at seven, not at nine, and give nine to records. That's how commercial stations survive. | " +
                "Fiona: We're not a commercial station. The licence says community. If we sound like a playlist with ads, the council will ask why they're lending us a room. | " +
                "Harvey: And if nobody's listening, the council will ask the same question. Meet in the middle: features until eight, music after, a two-minute bulletin on the hour. | " +
                "Fiona: A bulletin I'll accept. Moving the features to seven I won't — that's when our people are still at work. Nine is when they get home. | " +
                "Harvey: Then we try it for a month and look at the figures, not at how we feel. | " +
                "Fiona: Figures, yes. But the question we measure has to be 'did they learn something', not only 'did they stay'. Otherwise we've already become the thing you want.",
              items: [
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-1",
                  audio: "",
                  twice: true,
                  question: "What is Harvey's main claim about the audience?",
                  questionEs: "¿Cuál es la tesis principal de Harvey sobre la audiencia?",
                  options: [
                    "they prefer evening music to talk",
                    "they only listen in August",
                    "they want longer interviews",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-2",
                  audio: "",
                  twice: true,
                  question: "How does Fiona explain the August drop?",
                  questionEs: "¿Cómo explica Fiona la bajada de agosto?",
                  options: [
                    "the librarian interviews failed",
                    "August always dips",
                    "the council cut the room",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-3",
                  audio: "",
                  twice: true,
                  question: "What contrast does Fiona draw between music and features?",
                  questionEs: "¿Qué contraste traza Fiona entre música y reportajes?",
                  options: [
                    "music is everywhere; a late-night librarian is not",
                    "music is cheaper to produce",
                    "features never get shared",
                  ],
                  answer: 0,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-4",
                  audio: "",
                  twice: true,
                  question: "Why does Fiona refuse to move features to 7 p.m.?",
                  questionEs: "¿Por qué Fiona se niega a mover los reportajes a las 7?",
                  options: [
                    "the presenters are busy then",
                    "their listeners are still at work then",
                    "the licence forbids it",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-5",
                  audio: "",
                  twice: true,
                  question: "What compromise does Harvey offer?",
                  questionEs: "¿Qué compromiso ofrece Harvey?",
                  options: [
                    "drop all features",
                    "features until eight, music after, a short bulletin",
                    "move the station to the café",
                  ],
                  answer: 1,
                },
                {
                  kind: "hoeren-mc",
                  id: "enb2a-h4-6",
                  audio: "",
                  twice: true,
                  question: "What does Fiona want the figures to measure?",
                  questionEs: "¿Qué quiere Fiona que midan las cifras?",
                  options: [
                    "only how long people stayed",
                    "whether people learned something, not only whether they stayed",
                    "how many records were played",
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
          instruction:
            "Read the text and answer the six questions. Choose a, b or c.",
          instructionEs:
            "Un solo texto largo — así ha cambiado el Part 1 respecto al B1, que eran cinco textos con hueco. Seis MC sobre información, ideas y opiniones.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb2a-r1-1",
              title: "Why a small radio station still matters",
              text:
                "When Westway Voices began, twelve years ago, in a room above a newsagent's, nobody expected it to last a winter. The equipment was borrowed, the presenters were unpaid, and the audience, on a good night, was a few hundred people within a mile of the ring road. It has lasted. Not because it became famous, but because it became useful.\n\n" +
                "Usefulness, in this case, means something unfashionable: telling people what is happening where they live, in a voice they recognise. A bus route diverted for three months. A library that will open until ten if enough residents write in. A nurse who will talk about night shifts if you don't name the hospital. National stations cannot do this without sounding as if they have dropped in from another planet. A community station can, and when it doesn't, its listeners notice within a week.\n\n" +
                "The first winters were not heroic. The heating failed twice. A presenter left a microphone on and the street heard a private argument about a rota. What kept people coming back was not polish. It was that the station still knew the names of the streets it was talking about, and did not replace them with a generic 'local area' when a producer from outside the postcode sat in.\n\n" +
                "There is a temptation, when the listening figures soften, to become a playlist with a postcode. Music is cheap, talk is slow, and a shared link is easier to celebrate than a listener who stayed for forty minutes. The people who founded Westway Voices still argue about this in the corridor. One of them thinks survival means sounding like everyone else, only nearer. The other thinks that if you sound like everyone else, there is no reason for the council to lend you a room.\n\n" +
                "That argument is not abstract. A playlist needs a licence and a hard drive. A live hour about a diverted bus needs someone who will sit with a driver at the end of a shift and not tidy the sentences until they could belong to any city. The first founder calls that inefficiency. The second calls it the only evidence that the room above the newsagent's is still a newsroom.\n\n" +
                "The night library on Green Street is a good test. A five-minute live slot from a reading room will not trend. It may, however, tell a night-bus driver that the building is still open, and that is a kind of news no algorithm is trying to sell. Whether that is enough to keep a licence is a question for the council. Whether it is enough to keep a station honest is a question the station has to answer itself.\n\n" +
                "Honesty, here, is a timetable. If the library slot is replaced by a chart show because the chart show is easier to staff, the station has made a choice about what 'local' means. Listeners will notice within a week, the writer says, not because they are sentimental about libraries, but because they can tell when a voice they recognise has been swapped for a voice that could be anywhere. Usefulness is slower than a playlist. It is also the only reason Westway Voices is still on the air.",
              question: "Why has Westway Voices lasted, according to the writer?",
              questionEs: "¿Por qué ha durado Westway Voices, según quien escribe?",
              options: [
                "because it became nationally famous",
                "because it became useful to people nearby",
                "because the equipment was new",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r1-2",
              question: "What does the writer mean by 'usefulness' here?",
              questionEs: "¿Qué entiende aquí por «utilidad»?",
              options: [
                "playing music people already like",
                "local information in a recognisable voice",
                "getting as many shares as possible",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r1-3",
              question: "What happens, according to the text, when the station stops being local?",
              questionEs: "¿Qué pasa, según el texto, cuando la emisora deja de ser local?",
              options: [
                "the council immediately closes it",
                "listeners notice within a week",
                "the figures always go up",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r1-4",
              question: "What temptation does the writer describe?",
              questionEs: "¿Qué tentación describe quien escribe?",
              options: [
                "to become a playlist with a postcode",
                "to move to a national network",
                "to stop broadcasting in the evening",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r1-5",
              question: "What are the two founders arguing about?",
              questionEs: "¿Sobre qué discuten los dos fundadores?",
              options: [
                "whether to pay the presenters",
                "whether survival means sounding like everyone else",
                "whether to leave the newsagent's",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r1-6",
              question: "What is the night library slot a 'test' of?",
              questionEs: "¿De qué es «prueba» la franja de la biblioteca nocturna?",
              options: [
                "whether slow, unfashionable news can keep a station honest",
                "whether the algorithm will sell the story",
                "whether the council prefers music",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Six sentences have been removed from the text. Choose the correct sentence for each gap. There is one sentence you do not need.",
          instructionEs:
            "Un texto con seis huecos y siete frases: una sobra. Encaja por cohesión (pronombre, conector, idea que el hueco siguiente retoma).",
          items: [
            {
              kind: "lesen-insert",
              id: "enb2a-r2",
              title: "How to produce a local feature that people actually finish",
              text:
                "A local radio feature is not a shorter version of a television documentary. ___(1)___ If you treat it like one, you will overfill it and the listener will leave.\n\n" +
                "Start with one person who has something at stake, not with a theme. ___(2)___ A theme is a heading. A person is a reason to stay.\n\n" +
                "Record more than you will use, then cut without mercy. ___(3)___ The bit you love is often the bit that only you understand.\n\n" +
                "Do not explain the whole history of the library in the first thirty seconds. ___(4)___ Give the listener a reason to care, then the fact that earns it.\n\n" +
                "Play the finished piece to someone who was not in the room. ___(5)___ If they cannot tell you what it was about in one sentence, it is not finished.\n\n" +
                "And leave space. ___(6)___ A community station that never breathes sounds like a station that does not trust its own material.",
              sentences: [
                { key: "a", text: "It is a conversation that happens to be recorded." },
                { key: "b", text: "The night-bus driver who might lose a break room is a story; 'transport policy' is not." },
                { key: "c", text: "Silence after a good sentence is not dead air; it is the sentence landing." },
                { key: "d", text: "Most first cuts are twice as long as the slot you actually have." },
                { key: "e", text: "National awards are a poor guide to whether a street has been served." },
                { key: "f", text: "People do not owe you their attention just because you have a licence." },
                { key: "g", text: "If they frown, ask where they got lost, not whether they liked the music underneath." },
              ],
              gaps: [
                { id: "enb2a-r2-1", answer: "a" },
                { id: "enb2a-r2-2", answer: "b" },
                { id: "enb2a-r2-3", answer: "d" },
                { id: "enb2a-r2-4", answer: "f" },
                { id: "enb2a-r2-5", answer: "g" },
                { id: "enb2a-r2-6", answer: "c" },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts. For each question, choose the text that matches. A text may be used more than once.",
          instructionEs:
            "Cuatro textos, mismo tema (la emisora), propósito distinto. Siete preguntas. Un texto PUEDE repetir: no raciones («este ya lo he usado»). Fíjate también en la postura de quien escribe.",
          items: [
            {
              kind: "lesen-mc",
              id: "enb2a-r3-1",
              title: "Four texts about Westway Voices",
              text: FOUR_TEXTS,
              question: "Which text explains a new rule about rooms after 10 p.m.?",
              questionEs: "¿Qué texto explica una norma nueva sobre salas después de las 10?",
              options: ["Text A", "Text B", "Text C"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-2",
              question: "Which text is a complaint from inside the station?",
              questionEs: "¿Qué texto es una queja desde dentro de la emisora?",
              options: ["Text B", "Text C", "Text D"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-3",
              question: "Which text is looking for a new member of staff?",
              questionEs: "¿Qué texto busca personal nuevo?",
              options: ["Text A", "Text C", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-4",
              question: "Which text is written by a listener who may switch off?",
              questionEs: "¿Qué texto lo escribe un oyente que quizá deje de escuchar?",
              options: ["Text B", "Text C", "Text D"],
              answer: 2,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-5",
              question: "Which text says you should not send a long CV?",
              questionEs: "¿Qué texto dice que no envíes un currículum largo?",
              options: ["Text A", "Text C", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-6",
              question: "Which text asks for a hard stop before eleven?",
              questionEs: "¿Qué texto pide un corte duro antes de las once?",
              options: ["Text A", "Text B", "Text D"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "enb2a-r3-7",
              question: "Which text tells you where to send a noise complaint?",
              questionEs: "¿Qué texto dice a dónde mandar una queja por ruido?",
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
              id: "enb2a-r4",
              title: "Harriet Cole, station manager",
              text:
                "Harriet Cole did not plan to run a radio station. She trained as a librarian, spent eight years on the Green Street desk, and only walked into Westway Voices because the night-opening petition needed a room with a microphone. That was six years ago. She is still there, now as station manager, still surprised.\n\n" +
                "The job is less glamorous than the title. She books the cleaner, argues with the council about the late licence, and spends Thursday mornings listening to complaints that the presenters talk too fast. What she will not do is put her own voice on air. 'I'm useful in a corridor,' she says. 'I'm a disaster in a studio.'\n\n" +
                "The decision she is proudest of is not a programme. It is the rule that every paid shift must have an unpaid shadow — someone learning the desk who is not expected to be perfect. Two of those shadows now produce the evening features. One of them is Valeria Soto, who arrived with student-radio experience and a habit of asking the guest the question the presenter had skipped.\n\n" +
                "Cole still goes back to the library one Saturday a month, not as a manager, as a reader. She says it reminds her what the station is for: not to be busy, but to be of use. If the listening figures ever make that impossible, she says, she will go back to issuing books. 'At least a book doesn't ask you to play more music.'",
              gaps: [
                {
                  id: "enb2a-r4-1",
                  prompt: "What was Harriet Cole's job before the station?",
                  promptEs: "¿Cuál era el trabajo de Harriet Cole antes de la emisora?",
                  answers: ["librarian", "a librarian", "she was a librarian", "librarian at Green Street"],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-2",
                  prompt: "How did she first come to Westway Voices?",
                  promptEs: "¿Cómo llegó por primera vez a Westway Voices?",
                  answers: [
                    "petition needed a microphone",
                    "night-opening petition",
                    "the petition needed a microphone",
                    "needed a room with microphone",
                    "night-opening petition needed microphone",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-3",
                  prompt: "What will she not do in the job?",
                  promptEs: "¿Qué no hace en el puesto?",
                  answers: [
                    "put her voice on air",
                    "her voice on air",
                    "go on air",
                    "speak on air",
                    "her own voice on air",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-4",
                  prompt: "What rule is she proudest of?",
                  promptEs: "¿De qué norma está más orgullosa?",
                  answers: [
                    "unpaid shadow per paid shift",
                    "paid shift has unpaid shadow",
                    "an unpaid shadow",
                    "unpaid shadows",
                    "every paid shift has shadow",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-5",
                  prompt: "Who is mentioned as one of those shadows?",
                  promptEs: "¿A quién se nombra como una de esas sombras?",
                  answers: ["Valeria Soto", "Valeria"],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-6",
                  prompt: "Why does she still go to the library?",
                  promptEs: "¿Por qué sigue yendo a la biblioteca?",
                  answers: [
                    "to remember its purpose",
                    "as a reader",
                    "reminds her of its purpose",
                    "to remember the station's purpose",
                    "what the station is for",
                  ],
                  maxWords: 5,
                },
                {
                  id: "enb2a-r4-7",
                  prompt: "What will she do if figures make usefulness impossible?",
                  promptEs: "¿Qué hará si las cifras hacen imposible ser útil?",
                  answers: [
                    "go back to issuing books",
                    "issuing books",
                    "return to issuing books",
                    "go back to books",
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
            "Read the notice and write a formal response to the named reader. Cover all the content points. Write 100–150 words.",
          instructionEs:
            "Respuesta FORMAL a un texto de entrada, lector especificado, 100-150 palabras. Off-topic = la tarea vale 0. No es un ensayo a favor y en contra: es una carta con puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb2a-w1",
              task:
                "Write to the Head of Community Rooms at Westway Council. Write 100–150 words and cover all three points.",
              taskEs:
                "Escribe a la jefa de salas comunitarias del ayuntamiento. 100-150 palabras, los tres puntos.",
              stimulus: {
                source: "Westway Council — consultation",
                text:
                  "We propose that community radio may use Room B only until 10 p.m. on weekdays, to reduce noise in Palmer Road. We invite stations to write to Ms Okonkwo, Head of Community Rooms, with: how this would affect your programme, what you can offer to reduce noise, and whether a later slot at weekends would help. Replies by the 30th.",
              },
              points: [
                "Explica cómo el corte a las 10 afectaría a vuestro programa",
                "Ofrece una medida concreta para bajar el ruido",
                "Di si un horario más largo el fin de semana os serviría, y por qué",
              ],
              words: 130,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "Dear Ms Okonkwo,\n\n" +
                "I am writing on behalf of Westway Voices about the proposal to end use of Room B at 10 p.m. on weekdays.\n\n" +
                "A hard stop at ten would cut the feature we air when night-shift workers get home. We can, however, end live phone-ins at 10.30, keep the last twenty minutes pre-recorded, and fit a limiter on the output so that volume cannot rise after 10 p.m.\n\n" +
                "A later weekend slot would help us: Saturday is when the night library is open, and a live five-minute piece from there would not need to run past eleven.\n\n" +
                "I would be grateful if the consultation could treat recorded output after ten as distinct from live microphones.\n\n" +
                "Yours sincerely,\nValeria Soto",
            },
          ],
        },
        {
          title: "Writing · Part 2 (150–200 words)",
          instruction:
            "Write a personal letter, a narrative or a descriptive piece for the named reader. Write 150–200 words.",
          instructionEs:
            "Carta personal, relato o descripción — no un ensayo argumentativo. LanguageCert llama a esto a veces 'essay' y pide una pieza continua para una publicación. 150-200 palabras.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb2a-w2",
              task:
                "Write an article for your college magazine entitled 'My first night on air'. Describe what happened and say why you remember it. Write 150–200 words.",
              taskEs:
                "Artículo para la revista del centro: «Mi primera noche en antena». Describe lo que pasó y por qué lo recuerdas. 150-200 palabras.",
              points: [
                "Cuenta la noche con escena concreta (lugar, gente, un imprevisto)",
                "Di cómo te sentiste y qué salió mal o distinto de lo previsto",
                "Cierra con por qué te has quedado en la radio, o no",
              ],
              words: 175,
              points_max: 12,
              rubric: RUBRIC_WRITING_12,
              model:
                "I had been in the building six times as a shadow, and I still did not know where to put my hands. Harriet had said, 'If the guest dries, count to three and ask the question on your card.' The guest was a night-bus driver. He did not dry. I did.\n\n" +
                "At 9.12 the fader stuck. For eight seconds Westway Voices broadcast a hum and my breathing. I remember the red light, the driver's raised eyebrows, and Fiona in the corridor mouthing 'you're still on'. I asked the question on the card. He talked about the depot canteen closing. People wrote in.\n\n" +
                "I walked home along Palmer Road feeling taller than I was. The piece was not good. It was finished, which that night was the same thing. I have produced dozens of features since. None of them has the eight seconds of hum. That is why I remember it: not because I was brave, but because I stayed in the chair.",
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
          instruction:
            "Give personal information and opinions. Spell your family name.",
          instructionEs:
            "Datos personales y opiniones. Deletrea el apellido. En B2 ya no basta con el dato: hay que dar una idea.",
          items: [
            {
              kind: "sprechen",
              id: "enb2a-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then: Where are you from? What do you do? Do you listen to local radio or only to playlists? Should a city fund community stations even if the audience is small? Why?",
              promptEs:
                "Nombre y apellido deletreado. De dónde eres, a qué te dedicas, si escuchas radio local o solo listas, y si una ciudad debe financiar emisoras comunitarias aunque la audiencia sea pequeña.",
              model:
                "My name is Valeria Soto, S-O-T-O. I'm from Bogotá and I live in London. I produce evening features for a community station two nights a week. I do still listen to playlists, but local radio tells me things a playlist never will — a bus diversion, a library that's open late. I think cities should fund that even when the audience is small, because usefulness isn't the same as scale.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction:
            "Respond to the situations. In the last one, you start.",
          instructionEs:
            "Al menos dos situaciones, más largas que en B1. En una respondes; en la última inicias tú. Nunca haces de otro personaje.",
          items: [
            {
              kind: "sprechen",
              id: "enb2a-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — A neighbour says: 'Your live show ran past eleven again. My child's asleep.' Respond. Situation 2 — Your manager says: 'We need to drop the library slot; the figures are weak.' Respond, with a reason. Situation 3 — YOU start: at the council desk, you need a late licence for Saturday. Ask.",
              promptEs:
                "1: un vecino se queja del directo después de las once. 2: tu jefa quiere quitar la franja de la biblioteca por las cifras. 3: tú empiezas — en la ventanilla del ayuntamiento pides la licencia nocturna del sábado.",
              model:
                "1. I'm sorry — you're right, we ran over. We'll put a hard stop at ten-fifty from now on. — 2. I don't think we should drop it. The figures are one measure; the slot is the only place night-shift people hear that the building is still open. Could we try it at nine for a month before we cut it? — 3. Good afternoon. I'd like to apply for a late licence for Room B this Saturday. We already hold a daytime permit — the reference is WV-441. Could you tell me how long it takes?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Discuss the written prompt and try to reach a plan.",
          instructionEs:
            "El apoyo ya no es una imagen: es un texto escrito. El objetivo sube de «intento de acuerdo» a un plan concreto.",
          items: [
            {
              kind: "sprechen",
              id: "enb2a-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "WRITTEN PROMPT: Westway Voices must cut one hour a week. Option 1: lose the Saturday music show (cheap, popular). Option 2: lose one midweek feature slot (slower, more local). Option 3: shorten every show by ten minutes. Discuss the three options, say which you would cut and why, and agree a plan you could take to the manager — including what you would measure after a month.",
              promptEs:
                "Hay que recortar una hora a la semana. Tres opciones. Discutid, elegid y salid con un plan para la jefa, incluido qué mediríais al cabo de un mes.",
              model:
                "I wouldn't cut the midweek feature — that's what we can't replace with a playlist. The Saturday music show is popular, but it's also the easiest to shorten rather than kill. What if we took option 3 in the evenings and kept Saturday intact? After a month we'd measure not just listening time but whether the library and bus pieces still get replies. If the replies collapse, we reverse it. Shall we take that to Harriet as a one-month trial, not a permanent cut?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "You have 30 seconds to prepare, then speak for about 2 minutes. The examiner will ask follow-up questions.",
          instructionEs:
            "30 segundos de preparación — no cambian respecto al B1 — y 2 minutos de monólogo (antes 90 s). Luego preguntas de seguimiento.",
          items: [
            {
              kind: "sprechen",
              id: "enb2a-sp4",
              teil: 4,
              weight: 3,
              prepSeconds: 30,
              speakSeconds: 120,
              prompt:
                "Topic: A LOCAL STORY THAT DESERVED MORE ATTENTION. Talk about a piece of news or a person from your neighbourhood that national media ignored. Say what happened, why it mattered, and what would have been lost if nobody had told it.",
              promptEs:
                "Una historia local que merecía más atención: qué pasó, por qué importaba y qué se habría perdido si nadie la cuenta.",
              model:
                "The story I keep coming back to is the night library on Green Street. Nationally, it was a line in a budget: a branch that would shut at five to save money. Locally, it was the only quiet room still open when night-bus drivers and students finished work. A petition with four thousand names kept it open three evenings a week. That isn't a viral story. It doesn't have a villain, just a timetable. If nobody had told it, the building would have gone dark at five, and the people who needed it after seven would have assumed that was just how cities work. What would have been lost is the idea that a room can stay useful after the shops close. I think that's exactly the kind of story community radio is for — not because it's dramatic, but because it's true on one street and invisible on the national bulletin.",
            },
          ],
        },
      ],
    },
  ],
};
