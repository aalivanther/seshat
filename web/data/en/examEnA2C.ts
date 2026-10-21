import type { ExamSet } from "@/lib/examTypes";

// LanguageCert Set C — Simulacro del LanguageCert International ESOL A2
// (Access). Dominio temático exclusivo de esta variante: ocio y
// entretenimiento (deporte, TV/radio, cine/teatro, música, vacaciones),
// relaciones con otras personas (amistad, correspondencia, invitaciones) y el
// tiempo meteorológico — ambientado en los planes de fin de semana de
// Valeria, Amy, Ben, Sam y Nora, y en la correspondencia de Valeria con Emma,
// su amiga por carta de Manchester (CANON.md). Las variantes A y B cubren
// otros dominios (viajes/servicios/lugares y salud/compras/comida): no se
// tocan aquí.
// Estructura fiel: Listening 7+7+6+6 (todo ×2) · Reading 6+6+7+7 · Writing 2
// textos de 30-50 palabras (informal + neutro/formal) · Speaking 4 partes,
// 9 minutos.
//
// Mapeo de partes oficiales → tipos del motor:
//   Listening 1 (2 datos por enunciado) → HoerenMC; los distractores mezclan
//     cifras/palabras de AMBOS datos, para que valga cruzarlos y no baste con
//     pescar el primero (así distingue el A2 del A1: un dato por ítem)
//   Listening 2 (mejor réplica)          → HoerenMC
//   Listening 3 (miniconversaciones)      → HoerenMC con diálogo " | "
//   Listening 4 (monólogo con huecos)     → hoeren-notes (un recado ×2, 6 huecos de 1–3 palabras;
//     el mensaje de voz de Nora, un solo hablante)
//   Reading 1 (6 textos con 1 hueco, mc-3) → LesenMC ×6, cada uno con su
//     propio texto corto (lista/etiqueta/cartel/aviso)
//   Reading 2 (6 huecos + 1 distractor, 7 opciones) → LesenMatch: `ads` = las
//     7 frases-opción (a-g, la "g" es el distractor y nunca es respuesta),
//     `situations` = los 6 huecos, cada uno con el fragmento de carta que lo
//     rodea como contexto
//   Reading 3 (4 textos, 7 preguntas de multiple matching) → lesen-match con
//     allowReuse: 4 avisos, 7 preguntas; un aviso puede responder a más de una
//   Reading 4 (texto continuo, 7 preguntas mc-3) → LesenMC ×7 compartiendo
//     texto (el primer ítem lleva title/text, los otros seis lo omiten —
//     mismo criterio que usa examB1A.ts para sus grupos de Lesen)
//   Writing 1 (responder informal a un texto con 3 preguntas) →
//     SchreibenMessage con `stimulus` (la postal de Emma)
//   Writing 2 (texto neutro/formal con 3 contenidos obligados) →
//     SchreibenMessage sin `stimulus` (tarea autocontenida, como en A1)
//   Spoken 1-4 (S1 ya con 5 encabezados temáticos y hasta 5 preguntas; S4 con
//     1 min de monólogo, el doble que el A1) → SprechenTask ×4 (weight 3,
//     sin prepSeconds/speakSeconds — el A1 tampoco los pone)
//
// Adaptaciones de gramática (nota, no regla del validador): además de evitar
// present perfect, voz pasiva, estilo indirecto y segunda condicional (las
// cuatro prohibiciones explícitas del encargo), este archivo tampoco usa
// "will" de futuro, "should", primera condicional, pasado continuo ni
// relativas con who/which/that como contenido examinado. PLAN-EN-A2.md
// documenta esas seis estructuras como "frontera B1" —se presentan en m10-m11
// del curso para reconocerlas, pero quedan fuera del simulacro, que debe
// respetar el techo real de la columna Access(A2) del handbook (presente
// simple/continuo, pasado simple, "going to" + presente continuo para
// futuro, y los modales must/mustn't/have to/can/could/may)—. Por eso aquí
// el futuro se resuelve con "going to" o presente continuo, y los pedidos
// corteses con can/could, nunca con would+condicional pleno salvo la fórmula
// fija "would like", ya usada en examEnA.ts.

export const examEnA2C: ExamSet = {
  id: "en-a2-sim-c",
  level: "a2",
  title: "LanguageCert Access Set C",
  description:
    "Simulacro completo del LanguageCert ESOL A2 (Access): ocio, amistades, correspondencia y el tiempo en Londres. Doble escucha, escritura informal y formal, y nota oficial Pass/High Pass.",
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
    // ───────────────────────── LISTENING ─────────────────────────
    {
      skill: "hoeren",
      label: "Listening",
      minutes: 20,
      teile: [
        {
          title: "Listening · Part 1",
          instruction:
            "Listen and choose the correct answer (a, b or c). Each recording gives you two pieces of information — listen for both. You will hear each recording twice.",
          instructionEs:
            "Escucha y marca la respuesta correcta (a, b o c). Cada audio da DOS datos (día+hora, día+precio...) — el A2 exige cruzarlos, no basta con pescar uno suelto. Escuchas cada audio dos veces, como en el examen real.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-1",
              audio:
                "On Saturday it's going to be sunny, but on Sunday it's going to rain all day.",
              twice: true,
              question: "What is the weather like on Sunday?",
              questionEs: "¿Qué tiempo hace el domingo? (hay dos días, dos tiempos)",
              options: ["Sunny", "Rainy", "Snowy"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-2",
              audio:
                "The jazz concert in the park starts at half past seven, and tickets are twelve pounds.",
              twice: true,
              question: "What time does the concert start?",
              questionEs: "¿A qué hora empieza el concierto? (no confundas la hora con el precio)",
              options: ["At seven o'clock", "At half past seven", "At twelve o'clock"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-3",
              audio:
                "My pen friend's name is Emma. That's E-M-M-A, and she writes to me from Manchester every month.",
              twice: true,
              question: "How do you spell your pen friend's first name?",
              questionEs: "¿Cómo se escribe el nombre de su amiga por correspondencia?",
              options: ["E-M-A", "E-M-M-A", "E-N-M-A"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-4",
              audio:
                "The football match is on Channel Two at six o'clock, and the tennis is on Channel Four at eight.",
              twice: true,
              question: "What channel is the football match on?",
              questionEs: "¿En qué canal está el partido de fútbol? (hay dos programas, dos canales)",
              options: ["Channel Two", "Channel Four", "Channel Six"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-5",
              audio:
                "You can call Nora on oh two oh, seven five five, three one nine two, but only after six in the evening.",
              twice: true,
              question: "What is Nora's phone number?",
              questionEs: "¿Cuál es el teléfono de Nora?",
              options: ["020 755 3192", "020 575 3192", "020 755 3912"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-6",
              audio:
                "Tomorrow is going to be cold, only five degrees, but on Wednesday it's going to be much warmer, about fifteen.",
              twice: true,
              question: "What is the temperature tomorrow?",
              questionEs: "¿Qué temperatura hace mañana? (no confundas los dos días)",
              options: ["Five degrees", "Fifteen degrees", "Fifty degrees"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h1-7",
              audio:
                "The photography club meets on Thursdays at the library, on the second floor, room six.",
              twice: true,
              question: "Where does the photography club meet?",
              questionEs: "¿Dónde se reúne el club de fotografía? (planta y número de sala)",
              options: [
                "First floor, room six",
                "Second floor, room six",
                "Second floor, room sixteen",
              ],
              answer: 1,
            },
          ],
        },
        {
          title: "Listening · Part 2",
          instruction:
            "Listen and choose the best reply (a, b or c). You will hear each recording twice.",
          instructionEs:
            "Escucha y elige la mejor respuesta a lo que oyes (a, b o c). Escuchas cada audio dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-1",
              audio: "Do you want to come to the cinema with me on Friday?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["It's ten o'clock.", "Yes, I'd love to.", "I'm from Colombia."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-2",
              audio: "What's the weather like today?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["I'm free today.", "See you tomorrow.", "It's very windy."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-3",
              audio: "I'm sorry, I can't come to your party.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Never mind, another time.", "Yes, please.", "It's two pounds."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-4",
              audio: "Do you like watching football on TV?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["At the cinema.", "Yes, I watch it every Sunday.", "I'm twenty-five."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-5",
              audio: "Would you like to join our book club?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "It's next to the park.",
                "He's my brother.",
                "That sounds great, thank you.",
              ],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-6",
              audio: "Congratulations on your new hobby!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["You're welcome.", "Thank you very much!", "I'm sorry."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h2-7",
              audio: "Shall we listen to some music?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["It's Monday today.", "Three pounds, please.", "Good idea, I love jazz."],
              answer: 2,
            },
          ],
        },
        {
          title: "Listening · Part 3",
          instruction:
            "Listen to six short conversations and choose the correct answer (a, b or c). You will hear each conversation twice.",
          instructionEs:
            "Escucha seis conversaciones cortas: ¿tema, lugar, opinión o relación entre los hablantes? Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-1",
              audio:
                "Amy, what shall we do this weekend? | The weather forecast says it's going to be sunny on Saturday. | Great, let's have a picnic in the park then! | Perfect, I can bring some music too.",
              twice: true,
              question: "What are they planning to do on Saturday?",
              questionEs: "¿Qué planean hacer el sábado?",
              options: ["Go shopping", "Have a picnic in the park", "Watch a film at home"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-2",
              audio:
                "Sam, are you watching the match tonight? | Yes, at Ben's house with some friends. | Can I come too? | Of course, the more the better!",
              twice: true,
              question: "Where are they watching the match?",
              questionEs: "¿Dónde ven el partido?",
              options: ["At the stadium", "At Sam's house", "At Ben's house"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-3",
              audio:
                "Nora, how was the book club meeting? | Very good, we talked about a new detective story. | Do you meet every week? | No, only once a month, on Tuesdays.",
              twice: true,
              question: "How often does the book club meet?",
              questionEs:
                "¿Con qué frecuencia se reúne el club de lectura? (cuidado: se mencionan un día Y una frecuencia)",
              options: ["Every week", "Once a month", "Every Tuesday"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-4",
              audio:
                "Valeria, who do you write to every month? | My pen friend Emma, from Manchester. | What do you write about? | Our free time — music, sport and the weather!",
              twice: true,
              question: "What does Valeria usually write to Emma about?",
              questionEs: "¿Sobre qué escribe Valeria a Emma normalmente?",
              options: ["Her work", "Her free time", "The news"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-5",
              audio:
                "Sam, is it going to rain this evening? | I think so — the radio says storms after six. | Oh no, I wanted to go for a walk. | Maybe watch a film instead!",
              twice: true,
              question: "Why doesn't Valeria want to go for a walk now?",
              questionEs: "¿Por qué no quiere Valeria salir a pasear?",
              options: ["She is tired", "It's going to rain", "She has no time"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2c-h3-6",
              audio:
                "Amy, are you free on Sunday? | Yes, why? | It's Nora's birthday — she asked us for tea. | Lovely, I can bring a cake.",
              twice: true,
              question: "Why does Ben ask if Amy is free on Sunday?",
              questionEs: "¿Por qué pregunta Ben si Amy está libre el domingo?",
              options: ["For a football match", "For Nora's birthday", "For a music festival"],
              answer: 1,
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "Listen and complete the notes with 1–3 words. You will hear the recording twice.",
          instructionEs:
            "Escuchas un recado. Completa las notas con una a tres palabras. El audio suena DOS veces.",
          items: [
            {
              kind: "hoeren-notes",
              id: "ena2c-h4",
              audio:
                "Hi Valeria, it's Nora. I'm calling about the music evening at the community centre. It's next Friday, the fourteenth of May. It starts at half past seven in the evening. It's at the community centre on Elm Street, next to the park. Tickets are six pounds, or five pounds for students. Please call me back on oh seven nine one, four four two, six three three eight. I hope you can come!",
              twice: true,
              title: "Music evening — Nora's message",
              titleEs: "El mensaje de Nora",
              gaps: [
                {
                  id: "ena2c-h4-1",
                  prompt: "Event:",
                  promptEs: "Evento:",
                  answers: ["music evening", "a music evening"],
                  maxWords: 3,
                },
                {
                  id: "ena2c-h4-2",
                  prompt: "Date:",
                  promptEs: "Fecha:",
                  answers: ["14 May", "14th May", "fourteenth of May"],
                  maxWords: 3,
                },
                {
                  id: "ena2c-h4-3",
                  prompt: "Time:",
                  promptEs: "Hora:",
                  answers: ["7.30", "7:30", "half past seven"],
                  maxWords: 3,
                },
                {
                  id: "ena2c-h4-4",
                  prompt: "Place:",
                  promptEs: "Lugar:",
                  answers: ["Elm Street", "community centre", "the community centre"],
                  maxWords: 3,
                },
                {
                  id: "ena2c-h4-5",
                  prompt: "Student ticket:",
                  promptEs: "Entrada de estudiante:",
                  answers: ["five pounds", "5 pounds", "5"],
                  maxWords: 3,
                },
                {
                  id: "ena2c-h4-6",
                  prompt: "Nora's phone number:",
                  promptEs: "Teléfono de Nora:",
                  answers: ["0791 442 6338", "07914426338", "0791 4426338"],
                  maxWords: 3,
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
      minutes: 45,
      teile: [
        {
          title: "Reading · Part 1",
          instruction: "Read the short texts. Choose the word or phrase (a, b or c) that fits the space.",
          instructionEs:
            "Lee los seis textos cortos (una lista, una etiqueta, un cartel, un aviso...) y elige la palabra o frase que completa el hueco de cada uno.",
          items: [
            {
              kind: "lesen-mc",
              id: "ena2c-r1-1",
              title: "Things for Saturday's picnic",
              text:
                "THINGS FOR SATURDAY'S PICNIC\n- A big blanket\n- Ben's guitar\n- An ___, in case it rains\n- Fruit and drinks",
              question: "Choose the word that fits the space.",
              questionEs: "Elige la palabra que completa el hueco de la lista.",
              options: ["umbrella", "oven", "ticket"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r1-2",
              title: "Radio London — Sunday",
              text:
                "RADIO LONDON — SUNDAY\nMorning music, 9–11\nSports news, 11–12\nWeather and travel, ___\nEvening jazz, 8–10 pm",
              question: "Choose the time that fits the space.",
              questionEs: "Elige la franja horaria que falta en la parrilla.",
              options: ["12–1 pm", "12 o'clock at night", "next Sunday"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r1-3",
              title: "Community centre — sign",
              text: "COMMUNITY CENTRE\nThis way →\nNext to the ___, on Elm Street",
              question: "Choose the word that fits the space.",
              questionEs: "Elige la palabra que completa el cartel indicador.",
              options: ["park", "rain", "letter"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r1-4",
              title: "Notice — football practice",
              text:
                "NOTICE\nWe can't practise football today because of the ___.\nSee you next week!",
              question: "Choose the word that fits the space.",
              questionEs: "Elige la palabra que completa el aviso.",
              options: ["storm", "invitation", "postcard"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r1-5",
              title: "Valeria's weekend",
              text: "VALERIA'S WEEKEND\n- Write a letter to Emma\n- ___ the match with Ben\n- Have tea with Nora",
              question: "Choose the word that fits the space.",
              questionEs: "Elige la palabra que completa la lista de planes.",
              options: ["Watch", "Write", "Rain"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r1-6",
              title: "Photography club — poster",
              text: "PHOTOGRAPHY CLUB\nNew ___ always welcome!\nMeetings every Thursday, 6 pm",
              question: "Choose the word that fits the space.",
              questionEs: "Elige la palabra que completa el póster del club.",
              options: ["members", "letters", "weather"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the letter. Choose the sentence (a-g) that fits each space. There is one extra sentence that you do not need.",
          instructionEs:
            "Lee la carta de Emma y elige, entre las siete frases a-g, la que completa cada uno de los seis huecos. Sobra una frase: es el distractor, no la asignes a ningún hueco.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2c-r2",
              ads: [
                { key: "a", text: "I love reading detective stories in bed." },
                { key: "b", text: "One day it's sunny, and the next day it rains." },
                { key: "c", text: "Our team won two nil, and everyone was very happy." },
                { key: "d", text: "We always try to guess the answers together." },
                { key: "e", text: "I want to win a prize this year." },
                { key: "f", text: "I really want to know what you do at the weekends." },
                { key: "g", text: "The new sports centre opens next Monday." },
              ],
              situations: [
                {
                  id: "ena2c-r2-1",
                  situation:
                    "Dear Valeria, thank you for your last letter! ___ I always read a few pages before I go to sleep.",
                  situationEs:
                    "Emma agradece la carta y sigue hablando de leer antes de dormir. ¿Qué frase falta?",
                  answer: "a",
                },
                {
                  id: "ena2c-r2-2",
                  situation:
                    "The weather here in Manchester is very strange this month. ___ Last weekend it even snowed a little!",
                  situationEs:
                    "El tiempo en Manchester está muy raro este mes. ¿Qué frase falta antes de mencionar la nieve?",
                  answer: "b",
                },
                {
                  id: "ena2c-r2-3",
                  situation:
                    "On Saturday my brother and I went to a football match. ___ We shouted so much that we lost our voices!",
                  situationEs:
                    "Fueron a un partido de fútbol el sábado. ¿Qué frase falta antes de que perdieran la voz de tanto gritar?",
                  answer: "c",
                },
                {
                  id: "ena2c-r2-4",
                  situation:
                    "In the evening we listened to the radio together, and my favourite programme is the music quiz. ___",
                  situationEs:
                    "Por la noche escuchan la radio juntos; su programa favorito es el concurso musical. ¿Qué frase cierra la idea?",
                  answer: "d",
                },
                {
                  id: "ena2c-r2-5",
                  situation:
                    "Next month there's a photography competition at my club. ___ I'm going to take some pictures of the river.",
                  situationEs:
                    "El mes que viene hay un concurso de fotografía en su club. ¿Qué frase falta antes del plan de fotografiar el río?",
                  answer: "e",
                },
                {
                  id: "ena2c-r2-6",
                  situation:
                    "Please write back soon and tell me about your free time in London. ___ Do you and Amy still go to the cinema every month?",
                  situationEs:
                    "Le pide que conteste pronto y le cuente su tiempo libre en Londres. ¿Qué frase falta antes de la pregunta sobre el cine?",
                  answer: "f",
                },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four texts (a–d). Match each question to the correct text. You can use a text more than once.",
          instructionEs:
            "Lee los cuatro textos (a–d), todos sobre planes e invitaciones entre amigos. Empareja cada pregunta con el texto que la responde. Un texto puede servir para más de una pregunta.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2c-r3",
              allowReuse: true,
              requireNone: false,
              ads: [
                {
                  key: "a",
                  text:
                    "Hi everyone! It's my birthday next Saturday and I'm having a barbecue in my garden. Bring your favourite music! It starts at four o'clock. Please tell me soon — yes or no! Amy",
                },
                {
                  key: "b",
                  text:
                    "Hi Amy, I'm really sorry but I can't come to your barbecue on Saturday — I'm working an extra shift. Can we meet another day instead? Ben",
                },
                {
                  key: "c",
                  text:
                    "Dear Nora, thank you so much for inviting us to tea yesterday. The cake was wonderful and it was lovely to hear about your holidays. See you soon! Valeria",
                },
                {
                  key: "d",
                  text:
                    "NEW CHOIR GROUP! Do you enjoy singing? Join our friendly choir every Wednesday evening at the community centre. No experience needed — just come and sing! First evening is free.",
                },
              ],
              situations: [
                {
                  id: "ena2c-r3-1",
                  situation: "Which text is an invitation to a party?",
                  situationEs: "¿Qué texto es una invitación a una fiesta?",
                  answer: "a",
                },
                {
                  id: "ena2c-r3-2",
                  situation: "Which text explains why someone cannot come to an event?",
                  situationEs: "¿Qué texto explica por qué alguien no puede ir a un evento?",
                  answer: "b",
                },
                {
                  id: "ena2c-r3-3",
                  situation: "Which text says thank you for a visit?",
                  situationEs: "¿Qué texto da las gracias por una visita?",
                  answer: "c",
                },
                {
                  id: "ena2c-r3-4",
                  situation: "Which text is about a new group people can join?",
                  situationEs: "¿Qué texto habla de un grupo nuevo al que apuntarse?",
                  answer: "d",
                },
                {
                  id: "ena2c-r3-5",
                  situation: "Which text asks the reader to bring something?",
                  situationEs: "¿Qué texto pide al lector que traiga algo?",
                  answer: "a",
                },
                {
                  id: "ena2c-r3-6",
                  situation: "Which text is about a hobby that starts for free?",
                  situationEs: "¿Qué texto habla de una afición que empieza gratis?",
                  answer: "d",
                },
                {
                  id: "ena2c-r3-7",
                  situation: "Which text mentions a specific clock time?",
                  situationEs: "¿Qué texto menciona una hora concreta?",
                  answer: "a",
                },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction: "Read the text. For questions 1-7, choose the correct answer (a, b or c).",
          instructionEs:
            "Lee el texto continuo sobre el tiempo libre en Gran Bretaña y responde a las siete preguntas de opción múltiple.",
          items: [
            {
              kind: "lesen-mc",
              id: "ena2c-r4-1",
              title: "Free time in Britain",
              text:
                "In Britain, people often talk about the weather. This is because the weather changes very often — sometimes it is sunny in the morning and rainy in the afternoon! Many people check the weather forecast every day before they decide what to do.\n\n" +
                "When the weather is good, British people love to spend time outside. Parks are very popular for picnics, football and just walking with friends. Families often go to the seaside for the day when it is warm.\n\n" +
                "Television and radio are also important for free time. Many families watch their favourite programmes together in the evening, and sport programmes — especially football — are very popular on Saturday afternoons. Radio is popular too, especially in the car or at work.\n\n" +
                "Clubs and groups are a good way to make new friends. There are clubs for almost everything: photography, walking, cooking, music and books. Many clubs meet once a week, often in a community centre, and new members are usually welcome.\n\n" +
                "Writing letters and postcards to friends is less common than it was before, but some people still enjoy it — especially older people, or friends far from home. A letter can feel more personal than a quick message on a phone.\n\n" +
                "For many British people, free time means being with family and friends — in the sun or in the rain!",
              question: "Why do British people often talk about the weather?",
              questionEs: "¿Por qué habla tanto la gente del tiempo en Gran Bretaña?",
              options: [
                "Because it changes very often",
                "Because it is always sunny",
                "Because they don't like talking about other things",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-2",
              question: "What do British people like to do when the weather is good?",
              questionEs: "¿Qué les gusta hacer cuando hace buen tiempo?",
              options: [
                "Stay at home all day",
                "Spend time outside, for example in parks",
                "Go to work early",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-3",
              question: "When are families likely to go to the seaside?",
              questionEs: "¿Cuándo suelen ir las familias a la playa?",
              options: ["When it is cold", "When it is warm", "Only in winter"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-4",
              question: "What is popular on Saturday afternoons on TV?",
              questionEs: "¿Qué es popular en la tele los sábados por la tarde?",
              options: ["Cooking programmes", "Sport, especially football", "The news"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-5",
              question: "According to the text, what is a good way to make new friends?",
              questionEs: "Según el texto, ¿cuál es una buena forma de hacer nuevos amigos?",
              options: ["Joining a club or group", "Watching TV alone", "Staying at home"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-6",
              question: "How often do many clubs meet?",
              questionEs: "¿Con qué frecuencia se reúnen muchos clubes?",
              options: ["Every day", "Once a week", "Once a year"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2c-r4-7",
              question: "Who still enjoys writing letters and postcards, according to the text?",
              questionEs: "Según el texto, ¿quién sigue disfrutando de escribir cartas y postales?",
              options: [
                "Only children",
                "Older people or friends far from home",
                "Nobody anymore",
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
      minutes: 35,
      teile: [
        {
          title: "Writing · Part 1",
          instruction:
            "Read the postcard. Write a reply. Write 30-50 words. Answer all three things Emma asks.",
          instructionEs:
            "Lee la postal y contesta. Escribe entre 30 y 50 palabras (cuenta al final) y responde a las tres cosas que te pregunta — en registro informal, como a una amiga.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2c-w1",
              task:
                "Read the postcard from your pen friend Emma. Write a reply (30–50 words). Answer all three things she asks.",
              taskEs:
                "Lee la postal de tu amiga por correspondencia Emma y contéstale (30-50 palabras). Responde a las tres cosas que te pregunta.",
              stimulus: {
                source: "Postcard from Emma",
                text:
                  "Hi Valeria! It's raining every day here in Manchester — so boring! What's the weather like in London this week? Do you have any nice plans for the weekend? And can you send me a photo of you and Amy at your English club? Write soon! Emma",
              },
              points: [
                "Di qué tiempo hace en Londres esta semana",
                "Cuenta qué planes tienes para el fin de semana",
                "Dile si puedes enviarle una foto (y de qué)",
              ],
              model:
                "Hi Emma,\nThanks for your postcard! The weather in London is quite sunny this week, much better than Manchester. This weekend Amy and I are going to a music festival in the park. Yes, I can send you a photo from the English club next week!\nLove,\nValeria",
              words: 40,
              points_max: 12,
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write a message to the club organiser. Write 30-50 words. Include all three points below.",
          instructionEs:
            "Escribe un mensaje de 30-50 palabras al organizador de un club que no conoces — en registro neutro o formal, no como a un amigo — con los tres puntos indicados.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2c-w2",
              task:
                "You want to join the new photography club at the community centre. Write a message to the club organiser (30–50 words). Include all three points below.",
              taskEs:
                "Quieres apuntarte al nuevo club de fotografía del centro comunitario. Escribe un mensaje al organizador (30-50 palabras) con los tres puntos siguientes.",
              points: [
                "Preséntate y di por qué te interesa el club",
                "Di qué día de la semana te viene mejor",
                "Pregunta qué necesitas llevar a las reuniones",
              ],
              model:
                "Dear Mr Wilson,\nMy name is Valeria Soto and I would like to join the new photography club. I'm very interested in taking pictures of London. Wednesday evenings are best for me. Could you tell me what equipment I need to bring?\nBest wishes,\nValeria Soto",
              words: 40,
              points_max: 12,
            },
          ],
        },
      ],
    },
    // ───────────────────────── SPEAKING ─────────────────────────
    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 9,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction:
            "Introduce yourself, spell your family name, and answer one question under each of five topic headings.",
          instructionEs:
            "Preséntate, deletrea tu apellido y responde una pregunta bajo cada uno de cinco encabezados temáticos — en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "ena2c-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Say what country you are from. Then answer one question under each of these five headings: FREE TIME — What do you usually do in your free time? FRIENDS — How often do you see your friends? WEATHER — What is the weather like in your country at the moment? ENTERTAINMENT — Do you prefer the cinema or the theatre? MUSIC — What kind of music do you like?",
              promptEs:
                "Di tu nombre, deletrea tu apellido (con los nombres ingleses de las letras: A = «ei», E = «i», I = «ai») y di de qué país eres. Luego responde a una pregunta bajo cada uno de estos cinco encabezados: TIEMPO LIBRE, AMIGOS, TIEMPO (el meteorológico), OCIO y MÚSICA. El A2 es más elaborado que el A1: aquí son cinco bloques temáticos con su propia pregunta, no una lista suelta de datos personales.",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. I'm from Colombia. In my free time, I like listening to music and going to the cinema. I see my friends two or three times a week — we usually meet at a café or in the park. At the moment the weather in Colombia is warm, but here in London it's quite cloudy. I prefer the cinema to the theatre because it's cheaper and more relaxing. I like pop music, and also some jazz.",
            },
          ],
        },
        {
          title: "Speaking · Part 2",
          instruction: "Respond to the situations. Then start a conversation yourself.",
          instructionEs:
            "Responde a las situaciones y, en la última, inicia tú la conversación.",
          items: [
            {
              kind: "sprechen",
              id: "ena2c-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — A friend says: 'There's a great concert on Saturday. Do you want to come with me?' Answer and accept. Situation 2 — Your neighbour says: 'Lovely weather today!' Answer her. Situation 3 — Now YOU start: you want to invite a friend to watch a film at your flat on Friday evening. Ask them.",
              promptEs:
                "Situación 1: un amigo te invita a un concierto el sábado — acepta. Situación 2: tu vecina comenta que hace buen tiempo — respóndele con naturalidad (small talk). Situación 3: ahora empiezas tú — quieres invitar a un amigo a ver una película en tu piso el viernes por la noche. Invítale.",
              model:
                "1. That sounds great, thank you! What time does it start? — 2. Yes, it's lovely! Perfect for a walk in the park. — 3. Are you free on Friday evening? Would you like to come to my flat and watch a film?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Talk about the pictures: say what you can see and find two differences. Then ask a question.",
          instructionEs:
            "Habla de las dos imágenes descritas: di qué ves, busca dos diferencias y haz una pregunta al final.",
          items: [
            {
              kind: "sprechen",
              id: "ena2c-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture A: a quiet evening at home — one person, a book, the radio, a cup of tea. Picture B: a lively party — many people, loud music, dancing, coloured lights. Describe the two pictures, say two differences between them, and then ask your partner: which picture do you prefer?",
              promptEs:
                "Imagen A: una noche tranquila en casa — una persona, un libro, la radio, una taza de té. Imagen B: una fiesta animada — mucha gente, música alta, gente bailando, luces de colores. Describe las dos imágenes, di dos diferencias y pregunta a tu compañero cuál prefiere.",
              model:
                "In picture A, one person is at home, reading a book and listening to the radio with a cup of tea. It's very quiet. In picture B, there's a party with a lot of people. The music is loud and everyone is dancing. One difference is the number of people, and another is the noise — picture A is calm, picture B is noisy. Which picture do you prefer?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction: "Talk about the topic for one minute. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema un minuto seguido — el doble que en el A1. Como en el examen: 30 segundos para pensar y 60 hablando (usa un reloj).",
          items: [
            {
              kind: "sprechen",
              id: "ena2c-sp4",
              teil: 4,
              weight: 3,
              prompt:
                "Topic: A GOOD FRIEND. Ideas: Who is a good friend of yours? How did you meet? What do you do together in your free time? Why do you like spending time with this person?",
              promptEs:
                "Tema: UN BUEN AMIGO. Ideas: quién es, cómo os conocisteis, qué hacéis juntos en el tiempo libre y por qué te gusta estar con esa persona. Prepara 30 segundos y habla 1 minuto seguido.",
              model:
                "A good friend of mine is Amy. We met in London two years ago, when we started sharing a flat together. In our free time we like going to the cinema and walking in the park. Sometimes we listen to music at home or invite friends for dinner. I like spending time with Amy because she's very kind and funny, and she always listens when I have a problem.",
            },
          ],
        },
      ],
    },
  ],
};
