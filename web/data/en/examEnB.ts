import type { ExamSet } from "@/lib/examTypes";

// LanguageCert Set B — Simulacro 2 del LanguageCert International ESOL A1
// (Preliminary). Tema general: tiempo libre, comida y viajes por Londres.
// Misma estructura fiel que el Set A: Listening 7+7+6+6 (todo ×2) ·
// Reading 6+6+7+7 · Writing 2 textos de 30-50 palabras · Speaking 4 partes.
// (El mapeo parte oficial → tipo del motor está documentado en examEnA.ts.)

export const examEnB: ExamSet = {
  id: "en-sim-b",
  level: "a1",
  title: "LanguageCert Set B",
  description:
    "Simulacro completo del LanguageCert ESOL A1: tiempo libre, comida y viajes por Londres. Doble escucha y nota oficial Pass/High Pass.",
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
            "Listen and choose the correct answer (a, b or c). You will hear each recording twice.",
          instructionEs:
            "Escucha y marca la respuesta correcta (a, b o c). Escuchas cada audio dos veces — como en el examen real.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb-h1-1",
              audio: "The ticket costs thirty pounds.",
              twice: true,
              question: "How much is the ticket?",
              questionEs: "¿Cuánto cuesta el billete? (ojo: thirteen/thirty)",
              options: ["£30", "£13", "£33"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-2",
              audio: "My English class starts at half past nine.",
              twice: true,
              question: "What time does the class start?",
              questionEs: "¿A qué hora empieza la clase?",
              options: ["9.15", "9.30", "8.30"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-3",
              audio: "My first name is Amy. I spell it: A-M-Y.",
              twice: true,
              question: "How do you spell the name?",
              questionEs: "¿Cómo se escribe el nombre? (los nombres de A y E)",
              options: ["E-M-Y", "A-M-Y", "A-M-I"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-4",
              audio: "There are fifteen students in the class.",
              twice: true,
              question: "How many students are there?",
              questionEs: "¿Cuántos estudiantes hay? (fifteen/fifty)",
              options: ["5", "50", "15"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-5",
              audio: "The sandwich is four pounds twenty.",
              twice: true,
              question: "How much is the sandwich?",
              questionEs: "¿Cuánto cuesta el sándwich?",
              options: ["£4.12", "£2.40", "£4.20"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-6",
              audio: "My birthday is on the third of June.",
              twice: true,
              question: "When is her birthday?",
              questionEs: "¿Cuándo es su cumpleaños?",
              options: ["13 June", "3 June", "30 June"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h1-7",
              audio:
                "Call me tonight on oh two oh, double eight one, nine five four seven.",
              twice: true,
              question: "What is the phone number?",
              questionEs: "¿Cuál es el número de teléfono? (double = dos veces)",
              options: ["020 818 9547", "020 881 9574", "020 881 9547"],
              answer: 2,
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
              id: "enb-h2-1",
              audio: "Nice to meet you!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Nice to meet you too.",
                "I'm not hungry.",
                "It's over there.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-2",
              audio: "How much is this bag?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["At half past two.", "It's twenty pounds.", "Yes, it is."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-3",
              audio: "What time is it?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["It's half past two.", "It's Monday.", "It's two pounds."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-4",
              audio: "Have a nice weekend!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, I do.", "It's near the park.", "Thanks, you too!"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-5",
              audio: "Can you open the window, please?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, of course.", "No, I'm not.", "He's my brother."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-6",
              audio: "Do you want tea or coffee?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, I want.", "Coffee, please.", "At the café."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h2-7",
              audio: "Where are you from?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["I'm twenty-eight.", "I'm a nurse.", "I'm from Colombia."],
              answer: 2,
            },
          ],
        },
        {
          title: "Listening · Part 3",
          instruction:
            "Listen to six short conversations and choose the correct answer (a, b or c). You will hear each conversation twice.",
          instructionEs:
            "Escucha seis conversaciones cortas: ¿tema, lugar o relación entre los hablantes? Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb-h3-1",
              audio:
                "Good morning. A ticket to Brighton, please. | Single or return? | Return, please. | That's twenty-eight pounds. Platform two.",
              twice: true,
              question: "Where is the man?",
              questionEs: "¿Dónde está el hombre?",
              options: ["At the train station", "At the airport", "On the bus"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h3-2",
              audio:
                "Are you ready to order? | Yes — the chicken with rice, please. | Anything to drink? | Just water, thank you.",
              twice: true,
              question: "What does the woman order?",
              questionEs: "¿Qué pide la mujer?",
              options: ["Fish and chips", "Chicken with rice", "A pizza"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h3-3",
              audio:
                "Amy, are you free on Sunday? | Yes! Why? | Let's go swimming at the new pool. | Great idea. I love swimming!",
              twice: true,
              question: "What do they want to do on Sunday?",
              questionEs: "¿Qué quieren hacer el domingo?",
              options: ["Go swimming", "Go shopping", "Play tennis"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h3-4",
              audio:
                "Ben, who is that woman with the red coat? | That's my mother. She's here for one week. | Really? She looks young! | Yes, everyone says that.",
              twice: true,
              question: "Who is the woman?",
              questionEs: "¿Quién es la mujer?",
              options: ["Ben's teacher", "Ben's mother", "Ben's sister"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h3-5",
              audio:
                "Sam, what time do we meet tomorrow? | The film starts at eight, so let's meet at half past seven. | OK, half past seven at the cinema. | Perfect. See you there!",
              twice: true,
              question: "What time do they meet?",
              questionEs: "¿A qué hora quedan?",
              options: ["At 7.30", "At 8.00", "At 8.30"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h3-6",
              audio:
                "Excuse me, is there a bank near here? | Yes, on Green Street, next to the supermarket. | Is it far? | No, it's five minutes on foot.",
              twice: true,
              question: "Where is the bank?",
              questionEs: "¿Dónde está el banco?",
              options: [
                "In the station",
                "Opposite the park",
                "Next to the supermarket",
              ],
              answer: 2,
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "Valeria phones a language school to join an English course. Listen and complete the form: choose the correct answer for each space. You will hear each part twice.",
          instructionEs:
            "Valeria llama a una academia para apuntarse a un curso de inglés. Escucha y completa la ficha: marca el dato correcto de cada casilla. Escuchas cada parte dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "enb-h4-1",
              audio:
                "Good morning. I want to join an English course. My name is Valeria Soto. That's S-O-T-O.",
              twice: true,
              question: "Family name:",
              questionEs: "Apellido:",
              options: ["Soto", "Sotto", "Souto"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h4-2",
              audio: "I'm from Colombia, but I live in London now.",
              twice: true,
              question: "Country:",
              questionEs: "País:",
              options: ["Italy", "Colombia", "Spain"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h4-3",
              audio: "I want the beginner course, please — level A1.",
              twice: true,
              question: "Course level:",
              questionEs: "Nivel del curso:",
              options: ["A1", "A2", "B1"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h4-4",
              audio:
                "I work in the morning, so evening classes are good for me — Tuesday and Thursday, please.",
              twice: true,
              question: "Days:",
              questionEs: "Días:",
              options: [
                "Monday and Wednesday",
                "Tuesday and Thursday",
                "Saturday and Sunday",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h4-5",
              audio:
                "My phone number is oh seven nine six, three double five, eight two nine.",
              twice: true,
              question: "Phone number:",
              questionEs: "Teléfono:",
              options: ["0796 355 829", "0796 335 829", "0796 355 892"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "enb-h4-6",
              audio: "Great. And I can start on the tenth of May.",
              twice: true,
              question: "Start date:",
              questionEs: "Fecha de inicio:",
              options: ["12 May", "20 May", "10 May"],
              answer: 2,
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
          instruction: "Choose the word (a or b) that fits the space.",
          instructionEs:
            "Elige la palabra (a o b) que encaja en el hueco de la frase.",
          items: [
            {
              kind: "lesen-ads",
              id: "enb-l1-1",
              situation: "___ is cold in London today.",
              situationEs: "Hoy hace frío en Londres. (el sujeto obligatorio)",
              adA: "It",
              adB: "Is",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l1-2",
              situation: "Sam ___ got two brothers.",
              situationEs: "Sam tiene dos hermanos. (have got, 3ª persona)",
              adA: "have",
              adB: "has",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "enb-l1-3",
              situation: "___ Ben like fish?",
              situationEs: "¿A Ben le gusta el pescado? (el auxiliar)",
              adA: "Does",
              adB: "Do",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l1-4",
              situation: "I have breakfast ___ the morning.",
              situationEs: "Desayuno por la mañana. (preposición de tiempo)",
              adA: "at",
              adB: "in",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "enb-l1-5",
              situation: "Amy has a ___ .",
              situationEs: "Amy tiene una bici roja. (orden adjetivo + sustantivo)",
              adA: "red bike",
              adB: "bike red",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l1-6",
              situation: "We ___ speak French.",
              situationEs: "No sabemos hablar francés. (la negación de can)",
              adA: "don't can",
              adB: "can't",
              answer: "b",
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the text. Choose the sentence (a or b) that fits the space.",
          instructionEs:
            "Lee el texto. Elige la frase (a o b) que encaja en el hueco — una es de otro contexto.",
          items: [
            {
              kind: "lesen-ads",
              id: "enb-l2-1",
              situation:
                "Message from Amy: “Hi Valeria! Are you free on Friday? ______ It starts at seven. Amy”",
              situationEs:
                "Mensaje de Amy: ¿estás libre el viernes? ¿Qué frase falta?",
              adA: "There is a party at my house.",
              adB: "The hospital is very big.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l2-2",
              situation:
                "Note from Ben: “I'm at work until six. ______ It's in the fridge. Ben”",
              situationEs:
                "Nota de Ben: está trabajando hasta las seis. ¿Qué frase falta?",
              adA: "The bus is red.",
              adB: "Your dinner is ready.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "enb-l2-3",
              situation:
                "Message from Sam: “Good news! ______ Do you want to come? Free coffee for friends! Sam”",
              situationEs:
                "Mensaje de Sam: buenas noticias. ¿Qué frase falta?",
              adA: "The café opens again on Saturday.",
              adB: "My phone is old.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l2-4",
              situation:
                "Postcard from Valeria: “Hello from Scotland! ______ At night we watch films at the hotel. Back on Friday. Valeria”",
              situationEs:
                "Postal de Valeria desde Escocia. ¿Qué frase falta?",
              adA: "My computer doesn't work.",
              adB: "In the morning we walk in the mountains.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "enb-l2-5",
              situation:
                "Notice at the language school: “The English class is not in room 4 today. ______ Thank you.”",
              situationEs:
                "Aviso en la academia: la clase no es en el aula 4. ¿Qué frase falta?",
              adA: "Please go to room 12.",
              adB: "The coffee machine is new.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "enb-l2-6",
              situation:
                "Message from Amy: “Thanks for a lovely evening! ______ Next time, dinner is at my house. Amy”",
              situationEs:
                "Mensaje de Amy: gracias por la velada. ¿Qué frase falta?",
              adA: "The train leaves at nine.",
              adB: "Your pasta is my favourite!",
              answer: "b",
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction: "Read the notices. Is the sentence right or wrong?",
          instructionEs:
            "Lee los carteles y decide si la frase es verdadera o falsa.",
          items: [
            {
              kind: "lesen-schild",
              id: "enb-l3-1",
              where: "At the airport",
              sign: "Passengers for Madrid: please go to gate 12.",
              statement: "The Madrid flight leaves from gate 12.",
              statementEs: "El vuelo a Madrid sale por la puerta 12.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-2",
              where: "At the swimming pool",
              sign: "No food or drink in the pool area, please.",
              statement: "You can eat next to the pool.",
              statementEs: "Puedes comer junto a la piscina.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-3",
              where: "In the restaurant window",
              sign: "Lunch menu: two courses for £9.50.\nMonday to Friday, 12–3 pm.",
              statement: "You can have the lunch menu on Saturday.",
              statementEs: "Puedes tomar el menú del día el sábado.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-4",
              where: "At the cinema",
              sign: "Tickets: adults £10.\nChildren under 12: half price.",
              statement: "A ticket for a ten-year-old costs £5.",
              statementEs: "La entrada para un niño de diez años cuesta 5 libras.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-5",
              where: "At Camden Market",
              sign: "The market is open every day from 10 am.\nClosed on 25 December only.",
              statement: "The market is open in the morning.",
              statementEs: "El mercado abre por la mañana.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-6",
              where: "At the gym door",
              sign: "New members: your first week is free!",
              statement: "New members pay for the first week.",
              statementEs: "Los socios nuevos pagan la primera semana.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "enb-l3-7",
              where: "At the bus station",
              sign: "Night bus N5: every 30 minutes, from midnight to 5 am.",
              statement: "The N5 bus comes every thirty minutes at night.",
              statementEs: "El bus N5 pasa cada treinta minutos por la noche.",
              richtig: true,
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction: "Read the texts. Is the sentence right or wrong?",
          instructionEs:
            "Lee los textos y decide si cada frase es verdadera o falsa.",
          items: [
            {
              kind: "lesen-text",
              id: "enb-l4-1",
              title: "Email from Ben",
              text: "Hi Valeria,\n\nHow are you? I have a new flat in Camden! It's small, but the living room has big windows and I love it. It's on King Street, opposite the park, and my bus stop is two minutes away — perfect for a bus driver!\n\nCan you and Amy come for dinner on Friday at eight? I can't cook very well, but my pizza is good!\n\nSee you,\nBen",
              statements: [
                {
                  id: "enb-l4-1-s1",
                  statement: "Ben's new flat is in Camden.",
                  statementEs: "El piso nuevo de Ben está en Camden.",
                  richtig: true,
                },
                {
                  id: "enb-l4-1-s2",
                  statement: "The flat is very big.",
                  statementEs: "El piso es muy grande.",
                  richtig: false,
                },
                {
                  id: "enb-l4-1-s3",
                  statement: "The flat is opposite a park.",
                  statementEs: "El piso está enfrente de un parque.",
                  richtig: true,
                },
                {
                  id: "enb-l4-1-s4",
                  statement: "Ben invites Valeria for dinner on Friday.",
                  statementEs: "Ben invita a Valeria a cenar el viernes.",
                  richtig: true,
                },
              ],
            },
            {
              kind: "lesen-text",
              id: "enb-l4-2",
              title: "Sunny Beach Hotel — information",
              text: "Sunny Beach Hotel is a small family hotel in Brighton, five minutes from the sea. All rooms have a bathroom and free wi-fi. Breakfast is from 7.30 to 10 am and costs £8. The hotel restaurant is closed on Mondays, but there are many cafés on the beach. Families with children pay half price in June.",
              statements: [
                {
                  id: "enb-l4-2-s1",
                  statement: "The hotel is far from the sea.",
                  statementEs: "El hotel está lejos del mar.",
                  richtig: false,
                },
                {
                  id: "enb-l4-2-s2",
                  statement: "Breakfast is free.",
                  statementEs: "El desayuno es gratis.",
                  richtig: false,
                },
                {
                  id: "enb-l4-2-s3",
                  statement: "The hotel restaurant closes on Mondays.",
                  statementEs: "El restaurante del hotel cierra los lunes.",
                  richtig: true,
                },
              ],
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
            "Read the email and write an answer. Write 30–50 words. Answer all three points.",
          instructionEs:
            "Lee el email y contesta. Escribe entre 30 y 50 palabras (cuenta al final) y responde a los tres puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb-w1",
              task: "You get this email from Ben: “Hi! There's a new film at the Camden cinema on Friday. Do you want to come? Ben”. Write an email to Ben (30–50 words).",
              taskEs:
                "Recibes este email de Ben: hay una película nueva en el cine de Camden el viernes y te invita. Contéstale en inglés (30-50 palabras).",
              points: [
                "Dile que sí quieres ir al cine",
                "Pregunta a qué hora empieza la película",
                "Propón dónde quedar antes del cine",
              ],
              model:
                "Hi Ben,\nThanks for your message! Yes, I want to see the new film with you on Friday. What time does it start? We can meet at Sam's café at seven and walk to the cinema together.\nSee you on Friday,\nValeria",
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write a short message. Write 30–50 words. Do the two things in the task: thank and invite.",
          instructionEs:
            "Escribe un mensaje corto de 30-50 palabras que cumpla las dos funciones de la consigna: agradecer e invitar.",
          items: [
            {
              kind: "schreiben-message",
              id: "enb-w2",
              task: "Amy has a present for you: two tickets for a concert. Write a message to Amy (30–50 words): thank her and invite her to your house before the concert.",
              taskEs:
                "Amy tiene un regalo para ti: dos entradas para un concierto. Escríbele un mensaje (30-50 palabras): dale las gracias e invítala a tu casa antes del concierto.",
              points: [
                "Dale las gracias por las entradas",
                "Di cómo te sientes (I'm very happy…)",
                "Invítala a tu casa antes del concierto (di día y hora)",
              ],
              model:
                "Hi Amy,\nThank you very much for the concert tickets — you are a fantastic friend! I'm so happy. Would you like to come to my house on Saturday at six o'clock? We can eat something before the concert.\nLots of love,\nValeria",
            },
          ],
        },
      ],
    },
    // ───────────────────────── SPEAKING ─────────────────────────
    {
      skill: "sprechen",
      label: "Speaking",
      minutes: 6,
      teile: [
        {
          title: "Speaking · Part 1",
          instruction: "Introduce yourself and answer personal questions.",
          instructionEs: "Preséntate y responde preguntas personales, en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "enb-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your first name. Then answer: Where do you live? What is your job? What do you do in your free time? What is your favourite food? How do you go to work?",
              promptEs:
                "Di tu nombre y deletrea tu nombre de pila — ¡con los nombres ingleses de las letras! Luego responde: dónde vives, tu trabajo, qué haces en tu tiempo libre, tu comida favorita y cómo vas al trabajo.",
              model:
                "My name is Valeria Soto. I spell my first name: V-A-L-E-R-I-A. I live in London, in Camden. I work in a bookshop. In my free time I swim and watch films. My favourite food is pasta. I go to work by bus.",
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
              id: "enb-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — In Mr Patel's shop, he says: “Can I help you?” You want milk and eggs. Answer. Situation 2 — On the bus, someone says: “Excuse me, is this seat free?” Answer. Situation 3 — Now YOU start: you are at the station and you want a ticket to Brighton. Ask.",
              promptEs:
                "Situación 1: en la tienda de Mr Patel te pregunta si te ayuda — quieres leche y huevos, respóndele. Situación 2: en el bus te preguntan si el asiento está libre — responde. Situación 3: ahora empiezas tú — estás en la estación y quieres un billete a Brighton. Pide.",
              model:
                "1. Yes, please. Some milk and six eggs, please. How much is that? — 2. Yes, it is. Please sit down. — 3. Good morning. A return ticket to Brighton, please. What time is the next train?",
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
              id: "enb-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture A: a small café — two tables, tea and cakes, one waiter. Picture B: a big restaurant — many tables, pizza and pasta, four waiters. Describe the two places and say two differences. Then ask: which place does your partner like?",
              promptEs:
                "Imagen A: un café pequeño — dos mesas, té y pasteles, un camarero. Imagen B: un restaurante grande — muchas mesas, pizza y pasta, cuatro camareros. Describe los dos sitios, di dos diferencias y pregunta cuál prefiere tu compañero.",
              model:
                "In picture A there is a small café with two tables. You can drink tea and eat cakes. In picture B there is a big restaurant with many tables and four waiters. You can eat pizza and pasta. Which place do you like?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction:
            "Talk about the topic for one minute. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema un minuto seguido. Como en el examen: 30 segundos para pensar y 60 hablando (usa un reloj).",
          items: [
            {
              kind: "sprechen",
              id: "enb-sp4",
              teil: 4,
              weight: 3,
              prompt:
                "Topic: MY WEEK. Ideas: What do you do from Monday to Friday? What time do you get up? What do you do at the weekend? What is your favourite day?",
              promptEs:
                "Tema: MI SEMANA. Ideas: qué haces de lunes a viernes, a qué hora te levantas, qué haces el fin de semana y cuál es tu día favorito. Prepara 30 segundos y habla 1 minuto.",
              model:
                "From Monday to Friday I work in a bookshop. I get up at seven o'clock and go to work by bus. In the evening I study English. At the weekend I meet my friends and we go to the park or the cinema. My favourite day is Saturday.",
            },
          ],
        },
      ],
    },
  ],
};
