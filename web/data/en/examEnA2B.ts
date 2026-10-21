import type { ExamSet } from "@/lib/examTypes";

// LanguageCert Access Set B — Simulacro del LanguageCert International ESOL
// A2 Access. Dominio exclusivo de esta variante (no se solapa con las Set A/C
// del mismo drop): Health and body care + Shopping + Food and drink. Escena
// marco: un sábado de Valeria entre la consulta de la doctora Ellis, la
// farmacia, el mercado y la tienda de Mr Patel.
// Estructura fiel al formato oficial (handbook ver 7.0/6.0, ver PLAN-EN-A2.md
// §1.1): Listening 7+7+6+6 = 26 (todo ×2) · Reading 6+6+7+7 = 26 · Writing 2
// tareas de 30-50 palabras/12 marcas · Speaking 9 min en 4 partes.
//
// Mapeo de partes oficiales → tipos del motor:
//   Listening 1 (info clave, AHORA 2 datos por ítem) → HoerenMC
//   Listening 2 (mejor réplica)                      → HoerenMC
//   Listening 3 (miniconversaciones, 2 hablantes)     → HoerenMC con diálogo " | "
//   Listening 4 (nota con 6 casillas, monólogo)       → hoeren-notes (un recado ×2, 6 huecos de 1–3 palabras)
//   Reading 1 (6 textos cortos con un hueco, mc-3) → LesenMC independientes
//     (uno por texto). Adaptación consciente frente al A1: el A1 usa LesenAds
//     (a/b) para sus huecos, pero el R1 real de A2 pide 3 opciones por texto,
//     no 2 — LesenAds solo admite a/b, así que aquí cada texto corto es su
//     propio LesenMC de 3 opciones (title/text propios, sin compartir con
//     los demás: son 6 textos distintos, no un único texto largo).
//   Reading 2 (texto con 6 supresiones + 1 distractor, elegir entre 7) →
//     LesenMatch: ads = las 7 frases-opción (a-g; "g" es el distractor y
//     nunca es answer de nadie), situations = los 6 huecos. Adaptación: el
//     tipo LesenMatch no tiene un campo de "texto corrido" propio, así que la
//     situación del primer hueco lleva el TEXTO COMPLETO con los seis huecos
//     numerados (1)-(6) — igual que LesenMC comparte el texto una sola vez en
//     el primer ítem del grupo — y las siguientes cinco situaciones repiten
//     solo el fragmento local alrededor de su hueco, ya con el texto entero
//     visible arriba.
//   Reading 3 (4 textos de propósito distinto + 7 multiple matching) →
//     lesen-match con allowReuse: 4 avisos, 7 preguntas; un aviso puede usarse
//     más de una vez (como en el Access real)
//   Reading 4 (texto continuo + 7 preguntas mc-3) → 7 LesenMC que comparten
//     el mismo texto: el primer ítem lleva title/text, los otros seis lo
//     omiten (mismo criterio que usa examB1A.ts en sus grupos de lesen-mc).
//   Writing 1 (responder informalmente a un texto con 3 preguntas/peticiones)
//     y Writing 2 (texto neutro/formal con 3 contenidos obligatorios) →
//     SchreibenMessage, con `stimulus` en W1, 30-50 palabras, 12 marcas cada
//     una. Sin rúbrica de bandas (A2 no la necesita, como el A1 publicado).
//   Speaking 1-4 → SprechenTask ×4, teil 1-4, weight 3 en las cuatro (igual
//     que examEnA/B). S1 lleva 5 encabezados temáticos (más elaborado que el
//     A1, tal y como pide el Access real); S2 tiene 2 situaciones a responder
//     más una tercera que inicia el propio candidato.
//
// Todo el vocabulario y la gramática se mantienen en A2 real: presente simple
// y continuo, pasado simple (regular e irregular con marcador de tiempo),
// "be going to", y los modales must/mustn't/have to/can/could/may. Nada de
// present perfect, voz pasiva, estilo indirecto, segundo condicional, "should"
// ni past continuous (eso es B1, según la tabla del handbook citada en
// PLAN-EN-A2.md).

export const examEnA2B: ExamSet = {
  id: "en-a2-sim-b",
  level: "a2",
  title: "LanguageCert Access Set B",
  description:
    "Simulacro completo del LanguageCert ESOL A2 Access: salud, compras y comida en un sábado de Valeria. Doble escucha, registro informal/formal en Writing y nota oficial Pass/High Pass.",
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
            "Escucha y marca la respuesta correcta (a, b o c). Cada audio da DOS datos — la pregunta se centra en uno de ellos. Escuchas cada audio dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-1",
              audio:
                "A small coffee is one pound eighty, and a large coffee is two pounds fifty.",
              twice: true,
              question: "How much is a large coffee?",
              questionEs: "¿Cuánto cuesta un café grande? (ojo: hay dos precios)",
              options: ["£1.80", "£2.50", "£2.15"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-2",
              audio:
                "The health centre is open every day, but on Sundays it closes at one o'clock, not five.",
              twice: true,
              question: "What time does the health centre close on Sundays?",
              questionEs: "¿A qué hora cierra el centro de salud los domingos?",
              options: ["At one o'clock", "At five o'clock", "At nine o'clock"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-3",
              audio: "I want the blue jacket in size ten, not the black one.",
              twice: true,
              question: "What colour jacket does she want?",
              questionEs: "¿De qué color quiere la chaqueta? (hay dos colores)",
              options: ["Black", "Blue", "Grey"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-4",
              audio: "Can I have two coffees and just one tea, please?",
              twice: true,
              question: "How many teas does he order?",
              questionEs: "¿Cuántos tés pide? (hay dos bebidas distintas)",
              options: ["One", "Two", "Three"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-5",
              audio:
                "Your appointment with Doctor Ellis is on Thursday, not Wednesday, at half past ten.",
              twice: true,
              question: "What day is the appointment?",
              questionEs: "¿Qué día es la cita? (se mencionan dos días)",
              options: ["Wednesday", "Thursday", "Friday"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-6",
              audio: "The apples are eighty pence a kilo, but the bananas are only sixty pence.",
              twice: true,
              question: "How much are the bananas?",
              questionEs: "¿Cuánto cuestan los plátanos? (hay dos precios)",
              options: ["Eighty pence", "Sixty pence", "A pound"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h1-7",
              audio: "Take one tablet in the morning and two tablets at night, with food.",
              twice: true,
              question: "How many tablets does she take at night?",
              questionEs: "¿Cuántas pastillas toma por la noche? (hay dos cantidades)",
              options: ["One", "Two", "Three"],
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
              id: "ena2b-h2-1",
              audio: "Can I help you?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (estás en una tienda)",
              options: [
                "I'm from Colombia.",
                "Yes, I'm looking for a warm jacket.",
                "It's three o'clock.",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-2",
              audio: "How are you feeling today?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "It's next to the bank.",
                "Two pounds, please.",
                "Better, thank you.",
              ],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-3",
              audio: "Would you like anything else?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (estás en un café)",
              options: [
                "No thanks, just the bill, please.",
                "Yes, I am.",
                "At nine o'clock.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-4",
              audio: "Does it hurt here?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (el médico te examina)",
              options: ["It's my brother.", "Yes, a little.", "Every Saturday."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-5",
              audio: "I'm sorry, we don't have any bread left today.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Happy birthday!",
                "That's a pity — I'll come back tomorrow.",
                "It's very cold today.",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-6",
              audio: "What size shoes do you take?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["At half past two.", "Size six, please.", "Yes, I do."],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h2-7",
              audio: "Do you have an appointment today?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes? (estás en la recepción del médico)",
              options: ["I'm a nurse.", "It's five pounds.", "Yes, at half past three."],
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
              id: "ena2b-h3-1",
              audio:
                "Good morning. Do you have anything for a headache? | Yes, these tablets are very good. Take two with water. | Thank you. How much are they? | That's two pounds fifty.",
              twice: true,
              question: "Where are they?",
              questionEs: "¿Dónde están?",
              options: ["At the chemist's", "At the doctor's", "At the market"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h3-2",
              audio:
                "Excuse me, do you have this dress in a smaller size? | Yes, here's a size ten. | Thank you. Can I try it on? | Of course, the changing room is over there.",
              twice: true,
              question: "What does the customer want to do?",
              questionEs: "¿Qué quiere hacer la clienta?",
              options: ["Buy a new coat", "Try on a dress", "Return a jacket"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h3-3",
              audio:
                "Good morning, Valeria. What's the problem today? | I have a sore throat and I feel very tired. | Let me look. Open your mouth, please. | Is it serious, Doctor Ellis?",
              twice: true,
              question: "Who is Valeria talking to?",
              questionEs: "¿Con quién habla Valeria?",
              options: ["A shop assistant", "A doctor", "A waiter"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h3-4",
              audio:
                "Are you ready to order, Ben? | Yes, I'd like the chicken with vegetables, please. | Anything to drink? | Just water, thanks.",
              twice: true,
              question: "What does Ben order to eat?",
              questionEs: "¿Qué pide Ben para comer?",
              options: ["Fish and chips", "Chicken with vegetables", "A pizza"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h3-5",
              audio:
                "Good morning, Mr Patel. Do you have any fresh oranges today? | Yes, Valeria, they're just there, next to the apples. | Great, I'll take a kilo, please. | That's ninety pence.",
              twice: true,
              question: "What does Valeria buy?",
              questionEs: "¿Qué compra Valeria?",
              options: ["Bread and milk", "Fresh oranges", "Tea and sugar"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena2b-h3-6",
              audio:
                "You look tired today, Valeria. Are you OK? | Not really, my stomach hurts a little. | Do you want some tea, or maybe some soup? | Soup would be lovely, thank you.",
              twice: true,
              question: "What is the relationship between the speakers?",
              questionEs: "¿Qué relación hay entre los hablantes?",
              options: ["Doctor and patient", "Flatmates", "Shop assistant and customer"],
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
              id: "ena2b-h4",
              audio:
                "Good morning, this is Riverside Health Centre. This is a message for Valeria Soto. Doctor Ellis can see you on Wednesday. Please come at half past nine, not ten o'clock. You told the nurse you have a sore throat. Please bring your appointment card. If you cannot come, call us on oh two oh, eight one two three, four five six seven. Thank you. Goodbye.",
              twice: true,
              title: "Riverside Health Centre — appointment",
              titleEs: "Cita en el centro de salud",
              gaps: [
                {
                  id: "ena2b-h4-1",
                  prompt: "Doctor:",
                  promptEs: "Médico:",
                  answers: ["Ellis", "Doctor Ellis", "Dr. Ellis"],
                  maxWords: 3,
                },
                {
                  id: "ena2b-h4-2",
                  prompt: "Day:",
                  promptEs: "Día:",
                  answers: ["Wednesday"],
                  maxWords: 3,
                },
                {
                  id: "ena2b-h4-3",
                  prompt: "Time:",
                  promptEs: "Hora:",
                  answers: ["9.30", "9:30", "half past nine"],
                  maxWords: 3,
                },
                {
                  id: "ena2b-h4-4",
                  prompt: "Problem:",
                  promptEs: "Motivo:",
                  answers: ["sore throat", "a sore throat"],
                  maxWords: 3,
                },
                {
                  id: "ena2b-h4-5",
                  prompt: "Please bring:",
                  promptEs: "Qué llevar:",
                  answers: ["appointment card", "the card", "card"],
                  maxWords: 3,
                },
                {
                  id: "ena2b-h4-6",
                  prompt: "Phone number:",
                  promptEs: "Teléfono:",
                  answers: ["020 8123 4567", "02081234567", "020 81234567"],
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
          instruction: "Read the short texts. Choose the correct word (a, b or c) for each space.",
          instructionEs:
            "Lee los textos cortos y elige la palabra correcta (a, b o c) para cada hueco.",
          items: [
            {
              kind: "lesen-mc",
              id: "ena2b-r1-1",
              title: "Shopping list on the fridge",
              text: "Milk\nBread\n_____ (for the soup)\nApples",
              question: "Which word completes the list?",
              questionEs: "¿Qué palabra completa la lista de la compra?",
              options: ["Carrots", "Newspaper", "Umbrella"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r1-2",
              title: "Label on a medicine box",
              text: "Take _____ tablets, three times a day, with food.",
              question: "Which number fits the space?",
              questionEs: "¿Qué número encaja en el hueco?",
              options: ["two", "twelve", "twenty"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r1-3",
              title: "Sign near the bus stop",
              text: "Chemist's: turn _____ at the bank, then go straight on.",
              question: "Which word fits the space?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["left", "right", "near"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r1-4",
              title: "Notice in the shoe shop window",
              text: "Sale! All shoes _____ half price this weekend.",
              question: "Which word fits the space?",
              questionEs: "¿Qué palabra encaja en el hueco? (preposición de precio)",
              options: ["at", "in", "for"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r1-5",
              title: "Menu board outside the café",
              text: "Soup of the day: tomato _____ basil.",
              question: "Which word fits the space?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["and", "or", "but"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r1-6",
              title: "Label on a delivery box",
              text: "Fragile: contains _____ bottles.",
              question: "Which word fits the space?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["glass", "glasses", "grass"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the text about Healthy Eating Week. Choose the sentence (a-g) that fits each space. There is one extra sentence that you do not need.",
          instructionEs:
            "Lee el texto sobre la Semana de la Alimentación Saludable. Elige la frase (a-g) que encaja en cada hueco — hay una frase de sobra que no necesitas.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2b-r2",
              ads: [
                {
                  key: "a",
                  text: "The talk starts at ten o'clock in the morning.",
                },
                {
                  key: "b",
                  text: "You learn to cook cheap, healthy meals for the family.",
                },
                {
                  key: "c",
                  text: "All the events are free and open to everyone.",
                },
                {
                  key: "d",
                  text: "You can buy a bag of vegetables for two pounds.",
                },
                {
                  key: "e",
                  text: "The dinner has soup, chicken, rice and fresh salad.",
                },
                {
                  key: "f",
                  text: "You must book your place at the reception desk.",
                },
                {
                  key: "g",
                  text: "The centre is closed every Sunday.",
                },
              ],
              situations: [
                {
                  id: "ena2b-r2-1",
                  situation:
                    "Healthy Eating Week at the Riverside Centre\n\n" +
                    "Next week, the Riverside Centre is having a Healthy Eating Week. (1) ______ There are talks, cooking classes and a small market with fresh fruit and vegetables.\n\n" +
                    "On Monday, a doctor from the local surgery gives a talk about food and health. (2) ______ Everybody can ask questions after the talk.\n\n" +
                    "On Tuesday and Wednesday, there are free cooking classes in the afternoon. (3) ______ You don't need any experience — the teacher shows you every step.\n\n" +
                    "On Thursday, local shops bring fruit, vegetables and bread to the market in the car park. (4) ______ Prices are usually lower than in the supermarket.\n\n" +
                    "On Friday evening, there is a big dinner for everyone. (5) ______ Children eat for free, and adults pay three pounds.\n\n" +
                    "(6) ______ Please arrive ten minutes before each event starts.\n\n" +
                    "Which sentence fits gap (1)?",
                  situationEs:
                    "Lee el texto completo de arriba. ¿Qué frase completa el hueco (1)?",
                  answer: "c",
                },
                {
                  id: "ena2b-r2-2",
                  situation:
                    "'...a doctor from the local surgery gives a talk about food and health. (2) ______ Everybody can ask questions after the talk.' Which sentence fits gap (2)?",
                  situationEs: "¿Qué frase completa el hueco (2) del texto de arriba?",
                  answer: "a",
                },
                {
                  id: "ena2b-r2-3",
                  situation:
                    "'...there are free cooking classes in the afternoon. (3) ______ You don't need any experience...' Which sentence fits gap (3)?",
                  situationEs: "¿Qué frase completa el hueco (3) del texto de arriba?",
                  answer: "b",
                },
                {
                  id: "ena2b-r2-4",
                  situation:
                    "'...local shops bring fruit, vegetables and bread to the market in the car park. (4) ______ Prices are usually lower than in the supermarket.' Which sentence fits gap (4)?",
                  situationEs: "¿Qué frase completa el hueco (4) del texto de arriba?",
                  answer: "d",
                },
                {
                  id: "ena2b-r2-5",
                  situation:
                    "'On Friday evening, there is a big dinner for everyone. (5) ______ Children eat for free, and adults pay three pounds.' Which sentence fits gap (5)?",
                  situationEs: "¿Qué frase completa el hueco (5) del texto de arriba?",
                  answer: "e",
                },
                {
                  id: "ena2b-r2-6",
                  situation:
                    "'(6) ______ Please arrive ten minutes before each event starts.' Which sentence fits gap (6)?",
                  situationEs: "¿Qué frase completa el hueco (6) del texto de arriba?",
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
            "Lee los cuatro textos del barrio (a–d). Empareja cada pregunta con el texto que la responde. Un texto puede servir para más de una pregunta.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2b-r3",
              allowReuse: true,
              requireNone: false,
              ads: [
                {
                  key: "a",
                  text:
                    "SPECIAL OFFER AT PATEL'S CORNER SHOP! This week only, all tins of soup are two for one pound. We also have fresh bread every morning and a new freezer with ice cream. Come and see us on Green Street — we are open every day from seven till ten!",
                },
                {
                  key: "b",
                  text:
                    "FLU JABS AT THE HEALTH CENTRE. Doctor Ellis's surgery is offering free flu jabs this month for anyone over sixty, and for people with asthma or heart problems. No appointment is necessary — just come to reception between nine and midday, Monday to Friday.",
                },
                {
                  key: "c",
                  text:
                    "I tried the new café on King Street last weekend. The coffee is excellent and the cakes are homemade, but the service is a little slow when it's busy. I really recommend the coffee — it's the best in the area! The prices are fair too.",
                },
                {
                  key: "d",
                  text:
                    "SHOP ASSISTANT WANTED. A small clothes shop near the market needs a friendly shop assistant for Saturdays and some evenings. You need good English and a little experience with customers. Please ask for an application form at the till.",
                },
              ],
              situations: [
                {
                  id: "ena2b-r3-1",
                  situation: "Which text tells you where you can get a flu jab?",
                  situationEs: "¿Qué texto te dice dónde puedes vacunarte de la gripe?",
                  answer: "b",
                },
                {
                  id: "ena2b-r3-2",
                  situation: "Which text is looking for a new member of staff?",
                  situationEs: "¿Qué texto busca a un nuevo empleado?",
                  answer: "d",
                },
                {
                  id: "ena2b-r3-3",
                  situation: "Which text tells you about a special offer in a shop?",
                  situationEs: "¿Qué texto habla de una oferta especial en una tienda?",
                  answer: "a",
                },
                {
                  id: "ena2b-r3-4",
                  situation: "Which text gives an opinion about food or drink?",
                  situationEs: "¿Qué texto da una opinión sobre comida o bebida?",
                  answer: "c",
                },
                {
                  id: "ena2b-r3-5",
                  situation: "Which text says the offer only lasts for a short time?",
                  situationEs: "¿Qué texto dice que la oferta solo dura poco tiempo?",
                  answer: "a",
                },
                {
                  id: "ena2b-r3-6",
                  situation: "Which text says you need some experience for the job?",
                  situationEs: "¿Qué texto dice que hace falta experiencia para el trabajo?",
                  answer: "d",
                },
                {
                  id: "ena2b-r3-7",
                  situation: "Which text recommends the coffee?",
                  situationEs: "¿Qué texto recomienda el café?",
                  answer: "c",
                },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction: "Read the text. Choose the correct answer (a, b or c) for each question.",
          instructionEs:
            "Lee el texto y elige la respuesta correcta (a, b o c) para cada pregunta.",
          items: [
            {
              kind: "lesen-mc",
              id: "ena2b-r4-1",
              title: "A busy Saturday",
              text:
                "Last Saturday, Valeria woke up with a bad cough, so she decided to see the doctor before doing her shopping. She arrived at the surgery at nine o'clock, but the waiting room was full of people. She waited for forty minutes and read a magazine about healthy food.\n\n" +
                "Doctor Ellis listened to Valeria's chest and looked in her throat. 'It's not serious,' she said, 'but you need to rest and drink a lot of water. Take these tablets three times a day, after meals.' Valeria said thank you and left the surgery with a prescription.\n\n" +
                "On her way home, Valeria stopped at the chemist's on Green Street to buy the tablets. The chemist, a young woman with short black hair, was very helpful. She explained how to take the medicine and gave Valeria some information about coughs.\n\n" +
                "After the chemist's, Valeria walked to the market because the fridge at home was almost empty. She bought fresh vegetables, some fish, and a big bag of oranges — Amy always says oranges are good when you have a cold. At Mr Patel's stall, she also bought bread and a bottle of milk.\n\n" +
                "By the time Valeria got home, she was very tired, so she made some soup for lunch and went to bed early. 'A quiet afternoon is exactly what I need,' she thought. On Sunday morning, she felt much better — her cough was almost gone, and she was ready to see her friends again.",
              question: "Why did Valeria go to the doctor?",
              questionEs: "¿Por qué fue Valeria al médico?",
              options: [
                "Because she had a bad cough",
                "Because she had a broken leg",
                "Because she had a headache",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-2",
              question: "How long did Valeria wait at the surgery?",
              questionEs: "¿Cuánto tiempo esperó Valeria en la consulta?",
              options: ["About ten minutes", "About forty minutes", "About two hours"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-3",
              question: "What did Doctor Ellis tell Valeria to do?",
              questionEs: "¿Qué le dijo la doctora Ellis que hiciera?",
              options: [
                "Rest and drink a lot of water",
                "Stop eating for two days",
                "Stay in bed for a week",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-4",
              question: "Where did Valeria get her tablets?",
              questionEs: "¿Dónde consiguió Valeria las pastillas?",
              options: ["At the market", "At the chemist's on Green Street", "At the surgery"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-5",
              question: "Why did Valeria buy oranges?",
              questionEs: "¿Por qué compró naranjas Valeria?",
              options: [
                "Because Amy said they are good for a cold",
                "Because they were very cheap",
                "Because Mr Patel recommended them",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-6",
              question: "What did Valeria buy at Mr Patel's stall?",
              questionEs: "¿Qué compró Valeria en el puesto de Mr Patel?",
              options: ["Fish and vegetables", "Bread and milk", "Tablets and water"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2b-r4-7",
              question: "How did Valeria feel on Sunday morning?",
              questionEs: "¿Cómo se sintió Valeria el domingo por la mañana?",
              options: ["Much better", "Still very ill", "Tired and hungry"],
              answer: 0,
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
            "Read the message and write an informal reply. Write 30–50 words. Answer all three points.",
          instructionEs:
            "Lee el mensaje y responde de forma INFORMAL. Escribe entre 30 y 50 palabras (cuenta al final) y responde a los tres puntos.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2b-w1",
              task:
                "You get this message from Amy: “Hi Valeria, I heard you were at the doctor's on Saturday — how are you feeling now? I'm going to the market after work. Do you need anything for dinner, or maybe some fruit? Tell me what you'd like, and I can bring it home. Amy”. Write a reply to Amy (30–50 words).",
              taskEs:
                "Recibes este mensaje de Amy: se entera de que fuiste al médico el sábado y te pregunta cómo estás, y si necesitas algo del mercado para la cena. Contéstale en inglés (30-50 palabras).",
              points: [
                "Di cómo te sientes ahora",
                "Di qué comida o bebida necesitas del mercado",
                "Di si Amy puede traerte alguna otra cosa",
              ],
              model:
                "Hi Amy,\nThanks for asking! I'm feeling much better today, just a little tired. Can you buy some oranges and a bottle of orange juice? Oh, and some bread too, please — we don't have any left.\nSee you later,\nValeria",
              stimulus: {
                source: "Amy",
                text:
                  "Hi Valeria, I heard you were at the doctor's on Saturday — how are you feeling now? I'm going to the market after work. Do you need anything for dinner, or maybe some fruit? Tell me what you'd like, and I can bring it home. Amy",
              },
              words: 40,
              points_max: 12,
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write a neutral or formal email. Write 30–50 words. Include the three points in the task.",
          instructionEs:
            "Escribe un email de registro NEUTRO o FORMAL, de 30-50 palabras, con los tres contenidos obligatorios de la consigna.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2b-w2",
              task:
                "Write an email to the reception at the health centre. Write 30–50 words. Include: your name, the reason for your appointment, and a day or time that is good for you.",
              taskEs:
                "Escribe un email a la recepción del centro de salud (30-50 palabras). Incluye: tu nombre completo, el motivo de la cita, y un día u hora que te venga bien.",
              points: [
                "Tu nombre completo",
                "El motivo de la cita (qué te pasa)",
                "Un día u hora que te venga bien",
              ],
              model:
                "Dear Receptionist,\nMy name is Valeria Soto and I would like to make an appointment with Doctor Ellis. I have a bad cough and I need some more tablets. Is Wednesday morning possible, or any time on Thursday?\nThank you,\nValeria Soto",
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
            "Spell your family name and answer questions under five topic headings.",
          instructionEs:
            "Deletrea tu apellido y responde preguntas bajo cinco encabezados temáticos, en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "ena2b-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your family name and spell it. Then answer questions under these five headings: HOME — Where do you live? WORK OR STUDIES — What do you do? SHOPPING — Where do you usually buy your food? FOOD — What is your favourite meal? HEALTH — How do you keep healthy?",
              promptEs:
                "Di tu apellido y deletréalo — ¡con los nombres ingleses de las letras! Luego responde bajo cinco encabezados: CASA (dónde vives), TRABAJO O ESTUDIOS (a qué te dedicas), COMPRAS (dónde compras la comida), COMIDA (tu plato favorito) y SALUD (cómo te cuidas).",
              model:
                "My family name is Soto. I spell it: S-O-T-O. Home: I live in London, in a flat with my friend Amy. Work: I study English and I work part-time in a bookshop. Shopping: I usually buy fruit and vegetables at the market, and other things at Mr Patel's shop. Food: my favourite meal is soup with fresh bread. Health: I try to walk every day and I eat a lot of fruit.",
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
              id: "ena2b-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — At the chemist's, the pharmacist says: “Can I help you?” You have a headache and need something for it. Answer her. Situation 2 — At a restaurant, the waiter says: “Are you ready to order?” You want the soup and a glass of water. Answer him. Situation 3 — Now YOU start: you are at the doctor's reception and you want to change your appointment to a different day. Ask.",
              promptEs:
                "Situación 1: en la farmacia te preguntan si te ayudan — tienes dolor de cabeza y necesitas algo, respóndele. Situación 2: en un restaurante el camarero pregunta si quieres pedir — quieres la sopa y un vaso de agua, respóndele. Situación 3: ahora empiezas tú — estás en la recepción del médico y quieres cambiar tu cita a otro día. Pregunta.",
              model:
                "1. Yes, please. Do you have anything for a headache? — 2. Yes, I'd like the soup, please, and a glass of water. — 3. Excuse me, could I change my appointment to another day, please?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Exchange information about the pictures: say what you can see and find two differences. Then ask a question.",
          instructionEs:
            "Intercambia información sobre las dos imágenes descritas: di qué ves, busca dos diferencias y haz una pregunta al final.",
          items: [
            {
              kind: "sprechen",
              id: "ena2b-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture A: a small greengrocer's shop — one shop assistant, fresh fruit in boxes, a short queue. Picture B: a big supermarket — self-service tills, shelves of tinned food, many customers. Describe the two pictures and say two differences. Then ask: which shop does your partner prefer?",
              promptEs:
                "Imagen A: una frutería pequeña — un dependiente, fruta fresca en cajas, poca cola. Imagen B: un supermercado grande — cajas de autoservicio, estanterías de comida en lata, muchos clientes. Describe las dos imágenes, di dos diferencias y pregunta cuál tienda prefiere tu compañero.",
              model:
                "In picture A there is a small greengrocer's shop with fresh fruit in boxes and only a short queue. In picture B there is a big supermarket with self-service tills and shelves of tinned food — there are many more customers. Which shop do you prefer?",
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
              id: "ena2b-sp4",
              teil: 4,
              weight: 3,
              prompt:
                "Topic: HEALTHY EATING. Ideas: What food do you usually eat? Do you cook at home or buy food outside? What do you do to stay healthy? Do you think your diet is healthy?",
              promptEs:
                "Tema: ALIMENTACIÓN SALUDABLE. Ideas: qué comes normalmente, si cocinas en casa o compras comida fuera, qué haces para mantenerte sano/a, y si crees que tu dieta es saludable. Prepara 30 segundos y habla 1 minuto.",
              model:
                "I usually eat a lot of vegetables, fish and fruit. I cook at home most days, but on Fridays I sometimes buy food from the market or a small café. To stay healthy, I walk to work and I drink a lot of water. I think my diet is quite healthy, but I probably eat too much bread!",
            },
          ],
        },
      ],
    },
  ],
};
