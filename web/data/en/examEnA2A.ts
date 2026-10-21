import type { ExamSet } from "@/lib/examTypes";

// LanguageCert Access Set A — Simulacro 1 del LanguageCert International ESOL
// A2 Access. Tema general: Travel + Services + Places — Valeria organiza un
// viaje a Edimburgo y resuelve varias gestiones (correos, banco, taller,
// policía, hotel) por el camino. Estructura fiel: Listening 7+7+6+6 (todo ×2)
// · Reading 6+6+7+7 · Writing 2 textos de 30-50 palabras (informal/neutro-
// formal) · Speaking 4 partes, 9 minutos.
//
// Mapeo de partes oficiales → tipos del motor:
//   Listening 1 (info clave, 2 datos por ítem) → HoerenMC
//   Listening 2 (mejor réplica)                → HoerenMC
//   Listening 3 (miniconversaciones, diálogo)  → HoerenMC con " | " entre turnos
//   Listening 4 (monólogo → nota con huecos)   → hoeren-notes (un recado ×2, 6 huecos de 1–3 palabras)
//   Reading 1 (6 textos con un hueco, mc-3)    → LesenMC individual (texto propio)
//   Reading 2 (6 supresiones + 1 distractor)   → LesenMatch: ads = 7 frases (a-g),
//                                                 situations = 6 huecos del texto
//   Reading 3 (4 textos, 7 multiple matching)  → lesen-match con allowReuse (4 avisos, 7
//                                                 preguntas; un aviso puede responder a más de una)
//   Reading 4 (texto continuo, 7 mc-3)         → LesenMC en grupo (texto 1 vez)
//   Writing 1 y 2                              → SchreibenMessage (30-50 palabras)
//   Spoken 1-4                                 → SprechenTask ×4 (weight 3)
//
// Notas respecto al formato oficial:
//   · Listening 1: cada ítem cruza DOS datos (p.ej. dársena+hora, peso+trámite),
//     que es justo la diferencia real del A2 Access frente al A1 (un dato por
//     ítem). No es un capricho de estilo: sin cruzar dos datos, el ítem mide
//     A1, no A2.
//   · Reading 2: `LesenMatch` no tiene un campo de "texto compartido", así que
//     la carta se reparte en 6 fragmentos secuenciales, uno por `situation`,
//     cada uno terminando en el hueco — leídos en orden reconstruyen el texto
//     completo tal y como lo vería el alumno en el examen real.
//   · Gramática: todo el simulacro se mantiene dentro del núcleo productivo
//     A2 (pasado simple, going to, presente continuo con marcador de futuro,
//     must/have to/can/could/may, comparativos, conectores and/but/because/so).
//     Se evita a propósito el present perfect, la pasiva, el estilo indirecto
//     y el segundo condicional — eso es B1 (ver PLAN-EN-A2.md §2.1).

export const examEnA2A: ExamSet = {
  id: "en-a2-sim-a",
  level: "a2",
  title: "LanguageCert Access Set A",
  description:
    "Simulacro completo del LanguageCert International ESOL A2 Access: un viaje de Valeria a Edimburgo y las gestiones de servicios por el camino (correos, banco, taller, policía, hotel). Doble escucha, registro informal/formal en Writing y nota oficial Pass/High Pass.",
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
            "Escucha y marca la respuesta correcta (a, b o c). Cada audio se escucha dos veces — ojo, cada pregunta cruza DOS datos, no uno solo.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-1",
              audio:
                "The coach to Edinburgh leaves from bay four at half past nine. Please arrive ten minutes early.",
              twice: true,
              question: "Which bay, and what time does the coach leave?",
              questionEs: "¿De qué dársena sale el autocar y a qué hora?",
              options: ["Bay 4, at 9.30", "Bay 9, at 4.30", "Bay 4, at 4.30"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-2",
              audio:
                "The ten fifteen train to York now leaves from platform six, not platform two.",
              twice: true,
              question: "What time is the train, and which platform now?",
              questionEs: "¿A qué hora es el tren y de qué andén sale ahora?",
              options: ["10.15, platform 6", "10.15, platform 2", "10.50, platform 6"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-3",
              audio:
                "Your suitcase is twenty-three kilos. The limit is twenty kilos, so you need to pay for the extra three kilos.",
              twice: true,
              question: "How heavy is the suitcase, and what must the passenger do?",
              questionEs: "¿Cuánto pesa la maleta y qué tiene que hacer el pasajero?",
              options: ["23 kilos — pay extra", "20 kilos — pay extra", "23 kilos — nothing"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-4",
              audio: "Your room is number twelve, on the second floor, next to the lift.",
              twice: true,
              question: "What is the room number, and which floor?",
              questionEs: "¿Cuál es el número de la habitación y en qué planta está?",
              options: ["Room 12, second floor", "Room 21, second floor", "Room 12, first floor"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-5",
              audio:
                "Passport control is open until eleven at night. The currency exchange desk closes earlier, at nine.",
              twice: true,
              question: "Which service closes at nine, and which stays open until eleven?",
              questionEs:
                "¿Qué servicio cierra a las nueve y cuál sigue abierto hasta las once?",
              options: [
                "Exchange desk at 9, passport control at 11",
                "Passport control at 9, exchange desk at 11",
                "Both close at 11",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-6",
              audio:
                "Locker number eight closes at ten o'clock tonight. Please collect your bags before then.",
              twice: true,
              question: "Which locker, and what time does it close?",
              questionEs: "¿Qué taquilla es y a qué hora cierra?",
              options: ["Locker 8, at 10 pm", "Locker 18, at 10 pm", "Locker 8, at 8 pm"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h1-7",
              audio: "Pump number three is one pound forty-five a litre today.",
              twice: true,
              question: "Which pump, and what is the price per litre?",
              questionEs: "¿Qué surtidor es y cuánto cuesta el litro?",
              options: ["Pump 3, £1.45", "Pump 13, £1.45", "Pump 3, £1.54"],
              answer: 0,
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
              id: "ena2a-h2-1",
              audio: "Where can I buy a ticket for the number nine bus?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "At the newsagent's, just there.",
                "It's ten past three.",
                "I'm from Bogotá.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-2",
              audio: "I'm sorry, this road is closed today.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Oh no, which way can I go, please?", "Yes, I am.", "It's five pounds."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-3",
              audio: "Can I see your passport, please?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, of course. Here you are.", "No, thank you.", "It's next to the bank."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-4",
              audio: "The next train to Leeds is in ten minutes.",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Thank you. Which platform is it?", "I'm a nurse.", "It's my birthday."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-5",
              audio: "Excuse me, is this the way to the police station?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, it's on the left, next to the bank.",
                "It's two pounds fifty.",
                "I don't have a car.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-6",
              audio: "Would you like a receipt for the petrol?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, please.", "It's very cold today.", "I live near here."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h2-7",
              audio: "I'm sorry, but your card doesn't work. Do you have any cash?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, I have some money here.",
                "No, I don't like coffee.",
                "It's on the second floor.",
              ],
              answer: 0,
            },
          ],
        },
        {
          title: "Listening · Part 3",
          instruction:
            "Listen to six short conversations and choose the correct answer (a, b or c). You will hear each conversation twice.",
          instructionEs:
            "Escucha seis conversaciones cortas sobre viajes y gestiones, y elige la respuesta correcta. Escuchas cada conversación dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-1",
              audio:
                "Good morning. Can I help you? | Yes, a return ticket to Bristol, please. | Single or return — sorry, did you say return? | Yes, return, please. That's for one adult.",
              twice: true,
              question: "What does the woman want?",
              questionEs: "¿Qué quiere la mujer?",
              options: [
                "A return ticket to Bristol",
                "A single ticket to Leeds",
                "Information about a bus",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-2",
              audio:
                "Good morning. I'd like to send this parcel to Spain, please. | Of course. Is it urgent? | Not very. The cheaper service is fine. | That's eight pounds fifty, then.",
              twice: true,
              question: "What does the customer want to do?",
              questionEs: "¿Qué quiere hacer el cliente?",
              options: [
                "Send a parcel abroad",
                "Buy some stamps for a postcard",
                "Open a bank account",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-3",
              audio:
                "Good afternoon. I lost my bank card yesterday. | OK, don't worry. What is your name, please? | Valeria Soto. | Thank you, Ms Soto. We can cancel the card and send you a new one.",
              twice: true,
              question: "Why is Valeria at the bank?",
              questionEs: "¿Por qué está Valeria en el banco?",
              options: [
                "She lost her card",
                "She wants to open an account",
                "She wants to change money",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-4",
              audio:
                "My car makes a strange noise when I start it. | OK, let's have a look. When can you leave it here? | Is tomorrow morning possible? | Yes, that's fine. Come at nine o'clock.",
              twice: true,
              question: "What is the problem?",
              questionEs: "¿Cuál es el problema?",
              options: [
                "The car makes a strange noise",
                "The car doesn't have any petrol",
                "The car is too old",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-5",
              audio:
                "Excuse me, I lost my bag at the station this morning. | Can you describe it, please? | It's small and blue, with a black strap. | Thank you. Please wait here. An officer is going to help you in a few minutes.",
              twice: true,
              question: "Where did Valeria lose her bag?",
              questionEs: "¿Dónde perdió Valeria su bolso?",
              options: ["At the station", "At the bank", "At the garage"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena2a-h3-6",
              audio:
                "Hello, I have an appointment with Doctor Ellis at eleven o'clock. | What's your name, please? | Valeria Soto. | Thank you, Ms Soto. Please take a seat — Amy, the nurse, is going to call you soon.",
              twice: true,
              question: "Where is Valeria?",
              questionEs: "¿Dónde está Valeria?",
              options: ["At the doctor's", "At the garage", "At the police station"],
              answer: 0,
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
              id: "ena2a-h4",
              audio:
                "Hello, this is a message from the Castle Guest House for Ms Valeria Soto. That's S-O-T-O. We confirm your booking for two nights, from Friday to Sunday. You have a single room with a bathroom, not a double. You arrive late, at about nine in the evening, so we will keep the room for you. The phone number on the booking is oh seven nine one, four double four, six two zero. The room is seventy-five pounds a night, so one hundred and fifty pounds for two nights. Please call us if you need to change anything. Thank you, and we look forward to seeing you.",
              twice: true,
              title: "Castle Guest House — booking note",
              titleEs: "Nota de la reserva del hotel",
              gaps: [
                {
                  id: "ena2a-h4-1",
                  prompt: "Family name:",
                  promptEs: "Apellido:",
                  answers: ["Soto"],
                  maxWords: 3,
                },
                {
                  id: "ena2a-h4-2",
                  prompt: "Number of nights:",
                  promptEs: "Número de noches:",
                  answers: ["two", "2", "two nights"],
                  maxWords: 3,
                },
                {
                  id: "ena2a-h4-3",
                  prompt: "Room type:",
                  promptEs: "Tipo de habitación:",
                  answers: ["single", "single room", "a single"],
                  maxWords: 3,
                },
                {
                  id: "ena2a-h4-4",
                  prompt: "Arrival time:",
                  promptEs: "Hora de llegada:",
                  answers: ["9 pm", "9pm", "nine pm"],
                  maxWords: 3,
                },
                {
                  id: "ena2a-h4-5",
                  prompt: "Phone number:",
                  promptEs: "Teléfono:",
                  answers: ["0791 444 620", "0791444620", "0791 444620"],
                  maxWords: 3,
                },
                {
                  id: "ena2a-h4-6",
                  prompt: "Total price:",
                  promptEs: "Precio total:",
                  answers: ["150", "£150", "150 pounds"],
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
          instruction: "Read the six short texts. Choose the word (a, b or c) that fits each gap.",
          instructionEs:
            "Lee los seis textos breves (lista, etiqueta, dirección y avisos) y elige la palabra (a, b o c) que encaja en cada hueco.",
          items: [
            {
              kind: "lesen-mc",
              id: "ena2a-r1-1",
              title: "Before you travel (checklist)",
              text: "Before you travel:\n1. Check your passport.\n2. Print ___ tickets.\n3. Charge your phone.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["your", "the", "a"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r1-2",
              title: "Luggage label",
              text: "Name: Valeria Soto\nFlight: BA492\nSeat: 14C\nPlease attach this label ___ your suitcase.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["to", "at", "for"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r1-3",
              title: "Envelope instructions",
              text: "Write the address ___ the front of the envelope, and don't forget the stamp.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["on", "in", "at"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r1-4",
              title: "Notice at the post office",
              text: "The post office is closed ___ lunch, from 1 to 2 pm. We are open again at two o'clock.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["for", "in", "on"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r1-5",
              title: "Notice at the police station",
              text: "Please take a seat and wait ___ we call your name. Thank you for your patience.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["until", "before", "since"],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r1-6",
              title: "Notice at the bank",
              text: "Please have your card and your ID ready ___ you reach the till. This makes the service faster.",
              question: "Which word fits the gap?",
              questionEs: "¿Qué palabra encaja en el hueco?",
              options: ["before", "after", "during"],
              answer: 0,
            },
          ],
        },
        {
          title: "Reading · Part 2",
          instruction:
            "Read the letter. Choose the sentence (a-g) that fits each gap. There is one extra sentence you do not need.",
          instructionEs:
            "Lee la carta de Valeria a Amy, fragmento a fragmento. Elige la frase (a-g) que encaja en cada hueco — sobra una frase que no necesitas.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2a-r2",
              ads: [
                { key: "a", text: "I read my book and listened to music for most of the trip." },
                { key: "b", text: "We walked to our room and put our bags down." },
                { key: "c", text: "There was a small table, a lamp and two chairs." },
                { key: "d", text: "We took a lot of photos from the top of the hill." },
                { key: "e", text: "We talked about our plans for tomorrow." },
                { key: "f", text: "I can't wait to see it!" },
                { key: "g", text: "The bus was very crowded, so we had to stand." },
              ],
              situations: [
                {
                  id: "ena2a-r2-1",
                  situation:
                    "Dear Amy,\n\nI'm writing this letter from a small hotel in Edinburgh! The coach journey was long, but it was fine. ___",
                  situationEs:
                    "Fragmento 1 de la carta: el viaje en autocar fue largo pero tranquilo. ¿Qué frase falta?",
                  answer: "a",
                },
                {
                  id: "ena2a-r2-2",
                  situation:
                    "We arrived at half past six in the evening. The hotel was near the station, so we didn't need a taxi. ___",
                  situationEs:
                    "Fragmento 2: llegaron a las seis y media y el hotel estaba cerca de la estación. ¿Qué frase falta?",
                  answer: "b",
                },
                {
                  id: "ena2a-r2-3",
                  situation:
                    "The room was small but very clean, and the window looked over a quiet street. ___",
                  situationEs:
                    "Fragmento 3: describe la habitación del hotel. ¿Qué frase falta?",
                  answer: "c",
                },
                {
                  id: "ena2a-r2-4",
                  situation:
                    "On the first day, we visited the castle. It was cold, so we wore our warm coats. ___",
                  situationEs:
                    "Fragmento 4: la visita al castillo, con frío. ¿Qué frase falta?",
                  answer: "d",
                },
                {
                  id: "ena2a-r2-5",
                  situation:
                    "In the evening, we had dinner in a small restaurant near the castle. The food was delicious and not expensive. ___",
                  situationEs:
                    "Fragmento 5: la cena cerca del castillo. ¿Qué frase falta?",
                  answer: "e",
                },
                {
                  id: "ena2a-r2-6",
                  situation:
                    "Tomorrow we are going to visit a museum, and after that we want to walk along the river. ___\n\nI hope you are well. Write soon and tell me your news.\n\nLove,\nValeria",
                  situationEs:
                    "Fragmento 6: los planes de mañana (museo y paseo junto al río). ¿Qué frase falta?",
                  answer: "f",
                },
              ],
            },
          ],
        },
        {
          title: "Reading · Part 3",
          instruction:
            "Read the four notices (a–d). Match each question to the correct notice. You can use a notice more than once.",
          instructionEs:
            "Lee los cuatro avisos (a–d), todos de la misma semana de gestiones de Valeria. Empareja cada pregunta con el aviso que la responde. Un aviso puede servir para más de una pregunta.",
          items: [
            {
              kind: "lesen-match",
              id: "ena2a-r3",
              allowReuse: true,
              requireNone: false,
              ads: [
                {
                  key: "a",
                  text:
                    "Camden Post Office\nWe're sorry — the post office is closing early today, at 1 pm, because of a staff meeting. Normal opening hours return tomorrow. If you have a parcel to collect, please come before 1 pm or wait until tomorrow morning.",
                },
                {
                  key: "b",
                  text:
                    "Dear Customer,\nWe confirm your appointment with a bank adviser for Tuesday at 10 am. Please bring your passport or driving licence. If you cannot come, please call us at least one day before to change the time.",
                },
                {
                  key: "c",
                  text:
                    "Valeria's Car — Service Reminder\nYour car is ready to collect. We checked the brakes and changed the oil. Please pay at the front desk before you take the car. We are open until 6 pm today.",
                },
                {
                  key: "d",
                  text:
                    "Lost Property\nIf you lost something in the town centre this week, please come to the police station with a description of the item. Bring some ID with you. We keep lost property for one month only.",
                },
              ],
              situations: [
                {
                  id: "ena2a-r3-1",
                  situation: "Which notice says opening hours change today?",
                  situationEs: "¿Qué aviso dice que hoy cambia el horario de apertura?",
                  answer: "a",
                },
                {
                  id: "ena2a-r3-2",
                  situation: "Which notice is about an appointment with an adviser?",
                  situationEs: "¿Qué aviso trata de una cita con un asesor?",
                  answer: "b",
                },
                {
                  id: "ena2a-r3-3",
                  situation: "Which notice tells you your car is ready?",
                  situationEs: "¿Qué aviso te dice que tu coche ya está listo?",
                  answer: "c",
                },
                {
                  id: "ena2a-r3-4",
                  situation: "Which notice is about something you lost?",
                  situationEs: "¿Qué aviso trata de algo que has perdido?",
                  answer: "d",
                },
                {
                  id: "ena2a-r3-5",
                  situation: "Which notice tells you to pay before you take something away?",
                  situationEs: "¿Qué aviso te dice que pagues antes de llevarte algo?",
                  answer: "c",
                },
                {
                  id: "ena2a-r3-6",
                  situation: "Which notice says they only keep items for one month?",
                  situationEs: "¿Qué aviso dice que solo guardan las cosas un mes?",
                  answer: "d",
                },
                {
                  id: "ena2a-r3-7",
                  situation:
                    "Which notice tells you to call at least one day before you change the time?",
                  situationEs:
                    "¿Qué aviso te dice que llames con al menos un día de antelación para cambiar la hora?",
                  answer: "b",
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
              id: "ena2a-r4-1",
              title: "A Difficult Morning",
              text:
                "Last Saturday, Valeria had to travel to Manchester for a friend's wedding. She got up very early and packed her suitcase quickly. She put her phone and a present for the wedding in a small bag, and she left the flat at six o'clock.\n\n" +
                "At the station, Valeria bought a coffee and waited for her train. When the train arrived, she got on quickly and found a seat near the window. She was very tired, so she closed her eyes for a few minutes.\n\n" +
                "Suddenly, Valeria woke up and looked for her small bag. It wasn't next to her! She looked under the seat and in her suitcase, but she couldn't find it. She felt terrible — the present for her friend was in that bag.\n\n" +
                "Valeria walked through the train and asked the other passengers, but nobody saw a bag. Then she remembered: she left it on the table at the coffee shop, next to her coffee.\n\n" +
                "She called the coffee shop from the train. A member of staff answered and said, \"Don't worry! We found your bag. We can keep it here until you come back.\"\n\n" +
                "Valeria's train didn't stop again before Manchester, so she couldn't go back for the bag that day. She called her friend Ben, but he wasn't free — he drives a bus in London and was working that morning. So she asked her flatmate Amy instead. Amy works near the coffee shop, and she collected the bag the next morning.\n\n" +
                "At the wedding, Valeria told her friends the whole story, and everybody laughed. It was a difficult morning, but a good story to tell.",
              question: "Why did Valeria leave her flat early?",
              questionEs: "¿Por qué salió Valeria pronto de su piso?",
              options: [
                "Because she had to travel to Manchester",
                "Because she wanted to buy a coffee",
                "Because her train was very slow",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-2",
              question: "What did Valeria put in her small bag?",
              questionEs: "¿Qué metió Valeria en su bolso pequeño?",
              options: [
                "Her suitcase and her coat",
                "Her phone and a present",
                "Her coffee and her book",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-3",
              question: "Why did Valeria close her eyes on the train?",
              questionEs: "¿Por qué cerró Valeria los ojos en el tren?",
              options: [
                "Because she was very tired",
                "Because the train was too loud",
                "Because she didn't like the window seat",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-4",
              question: "Where did Valeria leave her bag?",
              questionEs: "¿Dónde se dejó Valeria el bolso?",
              options: [
                "On the train, under her seat",
                "On the table at the coffee shop",
                "At the information desk in Manchester",
              ],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-5",
              question: "How did Valeria feel when she couldn't find her bag?",
              questionEs: "¿Cómo se sintió Valeria al no encontrar el bolso?",
              options: ["Very happy", "Very worried", "Very bored"],
              answer: 1,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-6",
              question: "Why couldn't Ben help Valeria?",
              questionEs: "¿Por qué no pudo ayudar Ben a Valeria?",
              options: [
                "He was working that morning",
                "He didn't have a car",
                "He didn't like weddings",
              ],
              answer: 0,
            },
            {
              kind: "lesen-mc",
              id: "ena2a-r4-7",
              question: "What is this story mainly about?",
              questionEs: "¿De qué trata principalmente esta historia?",
              options: [
                "A problem that had a happy ending",
                "A wedding that didn't happen",
                "A holiday in Manchester",
              ],
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
            "Read the message and write a reply. Write 30–50 words. Answer all three points.",
          instructionEs:
            "Lee el mensaje y contesta. Escribe entre 30 y 50 palabras (cuenta al final) y responde a los tres puntos, en un registro informal — es tu compañera de piso.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2a-w1",
              task:
                "You get this message from Amy: “Hi! I heard you're going on a trip next week. Where are you going? How are you travelling? And can you get some stamps for me at the post office before you leave?” Write a reply to Amy (30–50 words). Answer all three questions.",
              taskEs:
                "Recibes este mensaje de Amy: te pregunta adónde vas de viaje, cómo viajas y si puedes comprarle sellos en correos antes de irte. Contéstale en inglés (30-50 palabras) y responde a las tres preguntas.",
              points: [
                "Di adónde vas de viaje",
                "Di cómo vas a viajar (autocar, tren...)",
                "Dile si puedes comprarle los sellos y cuándo",
              ],
              model:
                "Hi Amy,\nThanks for your message! I'm going to Edinburgh for a few days. I'm travelling by coach because it's cheaper than the train. And yes, of course — I'm going to the post office tomorrow morning, so I can get your stamps then.\nSee you soon,\nValeria",
              stimulus: {
                source: "Amy",
                text:
                  "Hi! I heard you're going on a trip next week. Where are you going? How are you travelling? And can you get some stamps for me at the post office before you leave?",
              },
              words: 40,
              points_max: 12,
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write a short message for the situation below. Write 30–50 words. Include the three points and use a neutral or formal style.",
          instructionEs:
            "Escribe un mensaje corto de 30-50 palabras para la situación. Incluye los tres puntos y usa un registro neutro o formal — no conoces personalmente al destinatario.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena2a-w2",
              task:
                "You want to stay at the Sunny Beach Hotel for two nights next month. Write a message to the hotel (30–50 words). Include: the dates, the type of room you want, and one question for the hotel.",
              taskEs:
                "Quieres alojarte dos noches el mes que viene en el Sunny Beach Hotel. Escribe un mensaje al hotel (30-50 palabras) que incluya: las fechas, el tipo de habitación que quieres y una pregunta para el hotel.",
              points: [
                "Di las fechas de tu estancia (dos noches)",
                "Di qué tipo de habitación quieres",
                "Haz una pregunta al hotel (desayuno, aparcamiento...)",
              ],
              model:
                "Dear Sir or Madam,\nI would like to book a room for two nights, from the tenth to the twelfth of June. I need a single room with a bathroom. Could you please tell me if the price includes breakfast?\nThank you,\nValeria Soto",
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
            "Introduce yourself, spell your family name and answer the questions under five headings.",
          instructionEs:
            "Preséntate, deletrea tu apellido y responde a las preguntas bajo los cinco encabezados temáticos, en voz alta.",
          items: [
            {
              kind: "sprechen",
              id: "ena2a-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then answer the questions under these five headings: PERSONAL INFORMATION (where are you from and where do you live?), WORK OR STUDY (what do you do?), DAILY LIFE (how do you get to work or school every day?), YOUR AREA (what places are near your home, and how do you get to them?), TRAVEL (how do you usually travel, and tell us about your last trip).",
              promptEs:
                "Di tu nombre y deletrea tu apellido — con los nombres ingleses de las letras. Luego responde bajo cinco encabezados: información personal (de dónde eres y dónde vives), trabajo o estudios, vida diaria (cómo vas cada día al trabajo o a clase), tu zona (qué hay cerca de tu casa y cómo se llega) y viajes (cómo viajas normalmente y tu último viaje).",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. I'm from Colombia, from Bogotá, and I live in London now. I work in a bookshop. Every day I go to work by bus — it takes about twenty minutes. Near my flat there is a post office, a bank and a small train station, so it's easy to get around. Last month I went to Edinburgh by coach — it was a great trip!",
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
              id: "ena2a-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — At the train station, the assistant says: “Can I help you?” You want a return ticket to Bristol. Answer. Situation 2 — At the post office, the clerk says: “Anything else?” You also want some stamps. Answer. Situation 3 — Now YOU start: you are at a garage and you want to know when you can collect your car. Ask.",
              promptEs:
                "Situación 1: en la estación te preguntan si te ayudan — quieres un billete de ida y vuelta a Bristol, responde. Situación 2: en correos te preguntan si algo más — también quieres sellos, responde. Situación 3: ahora empiezas tú — estás en un taller y quieres saber cuándo puedes recoger el coche. Pregunta.",
              model:
                "1. Yes, please. A return ticket to Bristol, please. How much is it? — 2. Yes, six stamps, please. — 3. Excuse me, when can I collect my car?",
            },
          ],
        },
        {
          title: "Speaking · Part 3",
          instruction:
            "Compare the two pictures: say what you can see and find two differences. Then ask a question.",
          instructionEs:
            "Compara las dos imágenes descritas: di qué ves, busca dos diferencias y haz una pregunta al final.",
          items: [
            {
              kind: "sprechen",
              id: "ena2a-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture A: a busy airport — many people, long queues, and a lot of suitcases. Picture B: a quiet train station — few people, one open ticket desk, and no queues. Describe the two pictures and say two differences. Then ask: which place does your partner prefer?",
              promptEs:
                "Imagen A: un aeropuerto concurrido — mucha gente, colas largas y muchas maletas. Imagen B: una estación de tren tranquila — poca gente, una taquilla abierta y sin colas. Describe los dos lugares, di dos diferencias y pregunta cuál prefiere tu compañero.",
              model:
                "In picture A there is a busy airport. There are many people and long queues, and I can see a lot of suitcases. In picture B there is a quiet train station. There are few people and no queues. The main difference is the number of people. Which place do you prefer?",
            },
          ],
        },
        {
          title: "Speaking · Part 4",
          instruction: "Talk about the topic for one minute. You have 30 seconds to prepare.",
          instructionEs:
            "Habla del tema un minuto seguido. Como en el examen: 30 segundos para pensar y 1 minuto hablando (usa un reloj).",
          items: [
            {
              kind: "sprechen",
              id: "ena2a-sp4",
              teil: 4,
              weight: 3,
              prompt:
                "Topic: MY LAST TRIP. Ideas: Where did you go? How did you travel? What did you do there? Was there a problem? What did you like best?",
              promptEs:
                "Tema: MI ÚLTIMO VIAJE. Ideas: adónde fuiste, cómo viajaste, qué hiciste allí, si hubo algún problema y qué fue lo que más te gustó. Prepara 30 segundos y habla 1 minuto.",
              model:
                "Last year I went to Bristol for a weekend. I travelled by coach because it was cheap. I visited the old harbour and took a lot of photos, and I stayed in a small hotel near the station. On the way home, the coach was late, so I had to wait two hours at the station. But it wasn't a big problem — I read my book and listened to music. I liked the harbour best. It was a lovely trip.",
            },
          ],
        },
      ],
    },
  ],
};
