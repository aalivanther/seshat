import type { ExamSet } from "@/lib/examTypes";

// LanguageCert Set A — Simulacro 1 del LanguageCert International ESOL A1
// (Preliminary). Tema general: un día en Londres — café, compras, transporte.
// Estructura fiel adaptada al motor: Listening 7+7+6+6 (todo ×2) · Reading
// 6+6+7+7 · Writing 2 textos de 30-50 palabras · Speaking 4 partes.
// Mapeo de partes oficiales → tipos del motor:
//   Listening 1 (símbolos/números/deletreo) → HoerenMC con opciones-texto
//   Listening 2 (mejor réplica)             → HoerenMC
//   Listening 3 (miniconversaciones)        → HoerenMC con diálogo " | "
//   Listening 4 (completar formulario)      → HoerenMC de datos (audio + campo)
//   Reading 1 (huecos) y 2 (frase extraída) → LesenAds (a/b)
//   Reading 3 (avisos/carteles)             → LesenSchild
//   Reading 4 (texto largo)                 → LesenText
//   Writing 1 y 2                           → SchreibenMessage (30-50 palabras)
//   Spoken 1-4                              → SprechenTask ×4 (weight 3)

export const examEnA: ExamSet = {
  id: "en-sim-a",
  level: "a1",
  title: "LanguageCert Set A",
  description:
    "Simulacro completo del LanguageCert ESOL A1: un día en Londres — café, compras y transporte. Doble escucha y nota oficial Pass/High Pass.",
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
              id: "ena-h1-1",
              audio: "Here you are. That's thirteen pounds fifty, please.",
              twice: true,
              question: "How much is it?",
              questionEs: "¿Cuánto cuesta?",
              options: ["£30.50", "£13.50", "£13.15"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-2",
              audio: "The film starts at quarter past seven.",
              twice: true,
              question: "What time does the film start?",
              questionEs: "¿A qué hora empieza la película?",
              options: ["7.15", "6.45", "7.45"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-3",
              audio: "My family name is Patel. That's P-A-T-E-L.",
              twice: true,
              question: "How do you spell the name?",
              questionEs: "¿Cómo se escribe el apellido?",
              options: ["PATEL", "PATTEL", "PATIL"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-4",
              audio: "I live at number ninety, London Road.",
              twice: true,
              question: "What is the house number?",
              questionEs: "¿Cuál es el número de la casa?",
              options: ["19", "90", "99"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-5",
              audio:
                "My phone number is oh seven seven oh, six three four, double two one.",
              twice: true,
              question: "What is the phone number?",
              questionEs: "¿Cuál es el número de teléfono?",
              options: ["0770 634 221", "0770 643 221", "0770 634 212"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-6",
              audio: "The market is closed on Thursday.",
              twice: true,
              question: "When is the market closed?",
              questionEs: "¿Cuándo cierra el mercado?",
              options: ["On Tuesday", "On Thursday", "On Saturday"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h1-7",
              audio: "The train to Brighton leaves from platform E.",
              twice: true,
              question: "Which platform is it?",
              questionEs: "¿De qué andén sale? (ojo: los nombres de las letras A/E/I)",
              options: ["Platform A", "Platform E", "Platform I"],
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
              id: "ena-h2-1",
              audio: "How are you today?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "I'm thirty years old.",
                "Fine, thanks. And you?",
                "It's ten o'clock.",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-2",
              audio: "Would you like some tea?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["Yes, I am.", "You're welcome.", "Yes, please."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-3",
              audio: "Thank you very much for the present!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["You're welcome.", "Yes, please.", "Fine, thanks."],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-4",
              audio: "Excuse me, where is the station, please?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "At six o'clock.",
                "It's next to the bank.",
                "It's two pounds.",
              ],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-5",
              audio: "I'm sorry I'm late!",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["See you tomorrow.", "Happy birthday!", "No problem."],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-6",
              audio: "Can I help you?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: [
                "Yes, please. How much is this T-shirt?",
                "No, he isn't here.",
                "It's very cold today.",
              ],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h2-7",
              audio: "What's your job?",
              twice: true,
              question: "What do you say?",
              questionEs: "¿Qué respondes?",
              options: ["I'm fine, thanks.", "I'm from Italy.", "I'm a nurse."],
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
              id: "ena-h3-1",
              audio:
                "Good morning! What would you like? | A coffee and a cheese sandwich, please. | Sure. Eat in or take away? | Take away, please.",
              twice: true,
              question: "Where are they?",
              questionEs: "¿Dónde están?",
              options: ["At school", "At the station", "In a café"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h3-2",
              audio:
                "Ben, let's do something on Saturday. | Good idea! The weather is bad, so no football. | OK. Let's go to the cinema. | Great! I love films.",
              twice: true,
              question: "What do they want to do on Saturday?",
              questionEs: "¿Qué quieren hacer el sábado?",
              options: ["Play football", "Go to the cinema", "Watch TV at home"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h3-3",
              audio:
                "Excuse me, do you have these shoes in size six? | Yes, we do. Here you are. | Thanks. How much are they? | They're twenty-five pounds.",
              twice: true,
              question: "What does the woman want to buy?",
              questionEs: "¿Qué quiere comprar la mujer?",
              options: ["Shoes", "A bag", "A dress"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h3-4",
              audio:
                "Hello, Mr Patel! Do you have any milk today? | Yes, Valeria, it's next to the bread. | Great, and two apples, please. | Of course. That's three pounds twenty.",
              twice: true,
              question: "Who is Valeria talking to?",
              questionEs: "¿Con quién habla Valeria?",
              options: ["A doctor", "A shop owner", "Her teacher"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h3-5",
              audio:
                "Hi Valeria, where are you? | I'm on the bus, but it's very slow. | The film starts at seven! | I know. Please buy my ticket. See you there.",
              twice: true,
              question: "Why is Valeria late?",
              questionEs: "¿Por qué llega tarde Valeria?",
              options: ["She is at work", "She is ill", "The bus is slow"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h3-6",
              audio:
                "Good afternoon. What's the problem? | My head hurts and I'm very hot. | OK. Open your mouth, please. You need water and rest. | Thank you, doctor.",
              twice: true,
              question: "Where is the man?",
              questionEs: "¿Dónde está el hombre?",
              options: [
                "At the supermarket",
                "At the swimming pool",
                "At the doctor's",
              ],
              answer: 2,
            },
          ],
        },
        {
          title: "Listening · Part 4",
          instruction:
            "Sam wants to join a sports centre. Listen and complete the form: choose the correct answer for each space. You will hear each part twice.",
          instructionEs:
            "Sam quiere apuntarse a un polideportivo. Escucha y completa la ficha: marca el dato correcto de cada casilla. Escuchas cada parte dos veces.",
          items: [
            {
              kind: "hoeren-mc",
              id: "ena-h4-1",
              audio:
                "Hello, I want to join the sports centre. My name is Sam Brooks. That's B-R-O-O-K-S.",
              twice: true,
              question: "Family name:",
              questionEs: "Apellido:",
              options: ["Brooks", "Brookes", "Broks"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h4-2",
              audio: "I'm twenty-four years old.",
              twice: true,
              question: "Age:",
              questionEs: "Edad:",
              options: ["42", "34", "24"],
              answer: 2,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h4-3",
              audio: "I live at fifteen Green Road, London.",
              twice: true,
              question: "Address:",
              questionEs: "Dirección:",
              options: ["15 Green Road", "50 Green Road", "15 Green Street"],
              answer: 0,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h4-4",
              audio:
                "My phone number is oh two oh, seven nine four, six two three five.",
              twice: true,
              question: "Phone number:",
              questionEs: "Teléfono:",
              options: ["020 749 6235", "020 794 6235", "020 794 6253"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h4-5",
              audio:
                "I want to play tennis. I can't come at the weekend, so Wednesday evening is good for me.",
              twice: true,
              question: "Day:",
              questionEs: "Día:",
              options: ["Saturday", "Wednesday", "Sunday"],
              answer: 1,
            },
            {
              kind: "hoeren-mc",
              id: "ena-h4-6",
              audio: "And my email address is sam at fastmail dot com.",
              twice: true,
              question: "Email:",
              questionEs: "Email:",
              options: [
                "sam@firstmail.com",
                "sam@fastmail.co.uk",
                "sam@fastmail.com",
              ],
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
              id: "ena-l1-1",
              situation: "Valeria ___ twenty-five years old.",
              situationEs: "Valeria tiene 25 años. (edad: ¿be o have?)",
              adA: "is",
              adB: "has",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l1-2",
              situation: "Ben ___ in London. He is a bus driver.",
              situationEs: "Ben trabaja en Londres. (3ª persona)",
              adA: "work",
              adB: "works",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "ena-l1-3",
              situation: "___ you like coffee?",
              situationEs: "¿Te gusta el café? (el auxiliar de la pregunta)",
              adA: "Are",
              adB: "Do",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "ena-l1-4",
              situation: "Amy is ___ nurse.",
              situationEs: "Amy es enfermera. (artículo con profesiones)",
              adA: "a",
              adB: "an",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l1-5",
              situation: "There ___ two chairs in the kitchen.",
              situationEs: "Hay dos sillas en la cocina.",
              adA: "are",
              adB: "is",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l1-6",
              situation: "Sam gets up ___ six o'clock.",
              situationEs: "Sam se levanta a las seis. (preposición de hora)",
              adA: "in",
              adB: "at",
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
              id: "ena-l2-1",
              situation:
                "Message from Ben: “Hi Amy! It's my birthday on Saturday. ______ We can eat pizza and listen to music. See you! Ben”",
              situationEs:
                "Mensaje de Ben: es su cumpleaños el sábado. ¿Qué frase falta?",
              adA: "Can you come to my party?",
              adB: "The bank is closed today.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l2-2",
              situation:
                "Note from Valeria: “I'm at the supermarket. ______ Back at six o'clock. Valeria”",
              situationEs:
                "Nota de Valeria: está en el supermercado. ¿Qué frase falta?",
              adA: "My brother is a doctor.",
              adB: "We need milk and bread.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "ena-l2-3",
              situation:
                "Message from Sam: “The café is very busy today. ______ Thank you! Sam”",
              situationEs:
                "Mensaje de Sam: el café está a tope hoy. ¿Qué frase falta?",
              adA: "Can you start at ten, not eleven?",
              adB: "I like your new shoes.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l2-4",
              situation:
                "Postcard from Amy: “Hello from Brighton! The weather is sunny. ______ See you on Sunday. Amy”",
              situationEs:
                "Postal de Amy desde Brighton. ¿Qué frase falta?",
              adA: "My office is near the station.",
              adB: "The beach is beautiful.",
              answer: "b",
            },
            {
              kind: "lesen-ads",
              id: "ena-l2-5",
              situation:
                "Notice in Mr Patel's shop: “Good morning! There is no bread today. ______ Sorry! Mr Patel”",
              situationEs:
                "Aviso en la tienda de Mr Patel: hoy no hay pan. ¿Qué frase falta?",
              adA: "You can buy bread again on Monday.",
              adB: "The number 24 bus is late.",
              answer: "a",
            },
            {
              kind: "lesen-ads",
              id: "ena-l2-6",
              situation:
                "Message from Ben: “I can't play football today. ______ Sorry! Ben”",
              situationEs:
                "Mensaje de Ben: hoy no puede jugar al fútbol. ¿Qué frase falta?",
              adA: "The shop sells cheap phones.",
              adB: "My leg hurts.",
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
              id: "ena-l3-1",
              where: "At the Tube station",
              sign: "No entry. Please use the other door.",
              statement: "You can go in here.",
              statementEs: "Puedes entrar por aquí.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-2",
              where: "In the café window",
              sign: "Open Monday to Saturday, 8 am – 6 pm.\nClosed on Sundays.",
              statement: "The café is open on Sundays.",
              statementEs: "El café abre los domingos.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-3",
              where: "In the library",
              sign: "Quiet, please. No mobile phones.",
              statement: "You can't use your phone here.",
              statementEs: "No puedes usar el móvil aquí.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-4",
              where: "At the bus stop",
              sign: "Buses to Camden do not stop here today.\nPlease use the stop on King Street.",
              statement: "Today the buses to Camden stop on King Street.",
              statementEs: "Hoy los buses a Camden paran en King Street.",
              richtig: true,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-5",
              where: "In a clothes shop",
              sign: "Sale! All T-shirts £5. Today only.",
              statement: "T-shirts are five pounds every day.",
              statementEs: "Las camisetas cuestan cinco libras todos los días.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-6",
              where: "At the park gate",
              sign: "Please close the gate.\nDogs must be on a lead.",
              statement: "Dogs can run free in the park.",
              statementEs: "Los perros pueden ir sueltos por el parque.",
              richtig: false,
            },
            {
              kind: "lesen-schild",
              id: "ena-l3-7",
              where: "At the museum door",
              sign: "Free entry.\nOpen every day, 10 am – 5 pm.",
              statement: "You don't pay to visit the museum.",
              statementEs: "No se paga por visitar el museo.",
              richtig: true,
            },
          ],
        },
        {
          title: "Reading · Part 4",
          instruction:
            "Read the texts. Is the sentence right or wrong?",
          instructionEs:
            "Lee los textos y decide si cada frase es verdadera o falsa.",
          items: [
            {
              kind: "lesen-text",
              id: "ena-l4-1",
              title: "Email from Valeria",
              text: "Hi Amy,\n\nHow are you? I have news: I have a new job! I work at a little bookshop near Camden Market, from Tuesday to Saturday. The people are nice and I can read English books every day.\n\nOn Mondays I'm free. Can we have lunch at Sam's café? The sandwiches there are cheap and very good.\n\nSee you soon,\nValeria",
              statements: [
                {
                  id: "ena-l4-1-s1",
                  statement: "Valeria works in a bookshop.",
                  statementEs: "Valeria trabaja en una librería.",
                  richtig: true,
                },
                {
                  id: "ena-l4-1-s2",
                  statement: "She works on Mondays.",
                  statementEs: "Trabaja los lunes.",
                  richtig: false,
                },
                {
                  id: "ena-l4-1-s3",
                  statement: "The bookshop is near Camden Market.",
                  statementEs: "La librería está cerca de Camden Market.",
                  richtig: true,
                },
                {
                  id: "ena-l4-1-s4",
                  statement: "Valeria wants to have lunch with Amy.",
                  statementEs: "Valeria quiere comer con Amy.",
                  richtig: true,
                },
              ],
            },
            {
              kind: "lesen-text",
              id: "ena-l4-2",
              title: "London City Farm — information",
              text: "London City Farm is a small farm in the east of the city. You can see cows, sheep, chickens and two old horses. The farm is open from Wednesday to Sunday, from 10 am to 4 pm. Entry is free, but the car park costs £3. There is a small farm café: it sells hot drinks, cakes and eggs from the farm.",
              statements: [
                {
                  id: "ena-l4-2-s1",
                  statement: "The farm is open every day.",
                  statementEs: "La granja abre todos los días.",
                  richtig: false,
                },
                {
                  id: "ena-l4-2-s2",
                  statement: "You pay £3 to visit the farm.",
                  statementEs: "Se pagan 3 libras por visitar la granja.",
                  richtig: false,
                },
                {
                  id: "ena-l4-2-s3",
                  statement: "You can buy eggs at the farm café.",
                  statementEs: "Puedes comprar huevos en el café de la granja.",
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
              id: "ena-w1",
              task: "You get this email from Amy: “Hi! On Saturday my friends and I are going to Hyde Park for a picnic. Do you want to come? Amy”. Write an email to Amy (30–50 words).",
              taskEs:
                "Recibes este email de Amy: el sábado hace un pícnic en Hyde Park con sus amigos y te invita. Contéstale en inglés (30-50 palabras).",
              points: [
                "Dile que sí puedes ir al pícnic",
                "Pregunta a qué hora empieza",
                "Di qué comida o bebida puedes llevar",
              ],
              model:
                "Hi Amy,\nThanks for your email! Yes, I can come to the picnic on Saturday — I love Hyde Park. What time does it start? I can bring orange juice and a big chocolate cake.\nSee you soon,\nValeria",
            },
          ],
        },
        {
          title: "Writing · Part 2",
          instruction:
            "Write a short message. Write 30–50 words. Do the two things in the task: say sorry and invite.",
          instructionEs:
            "Escribe un mensaje corto de 30-50 palabras que cumpla las dos funciones de la consigna: disculparte e invitar.",
          items: [
            {
              kind: "schreiben-message",
              id: "ena-w2",
              task: "You can't go to Ben's football game on Sunday. Write a message to Ben (30–50 words): say sorry and invite him to do something another day.",
              taskEs:
                "No puedes ir al partido de fútbol de Ben el domingo. Escríbele un mensaje (30-50 palabras): discúlpate e invítale a otro plan.",
              points: [
                "Discúlpate: no puedes ir el domingo",
                "Explica por qué no puedes ir",
                "Invítale a hacer algo otro día (di día y lugar)",
              ],
              model:
                "Hi Ben,\nI'm very sorry, but I can't go to your football game on Sunday. I'm working at the bookshop all day. Would you like to have lunch on Monday at Sam's café, at one o'clock?\nSee you soon,\nValeria",
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
              id: "ena-sp1",
              teil: 1,
              weight: 3,
              prompt:
                "Say your name and spell your family name. Then answer: Where are you from? Where do you live? How old are you? What is your job? What languages do you speak?",
              promptEs:
                "Di tu nombre y deletrea tu apellido — ¡con los nombres ingleses de las letras! (A = «ei», E = «i», I = «ai»). Luego responde: de dónde eres, dónde vives, tu edad, tu trabajo y qué idiomas hablas.",
              model:
                "My name is Valeria Soto. I spell my family name: S-O-T-O. I'm from Colombia, from Bogotá, and now I live in London. I'm twenty-five years old. I work in a bookshop. I speak Spanish and a little English.",
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
              id: "ena-sp2",
              teil: 2,
              weight: 3,
              prompt:
                "Situation 1 — In a café, the waiter says: “What would you like?” Answer him. Situation 2 — A friend says: “This is my sister.” Greet her. Situation 3 — Now YOU start: you are in a shop and you want to know the price of a bag. Ask.",
              promptEs:
                "Situación 1: el camarero pregunta qué quieres — respóndele. Situación 2: un amigo te presenta a su hermana — salúdala. Situación 3: ahora empiezas tú — estás en una tienda y quieres saber el precio de un bolso. Pregunta.",
              model:
                "1. A tea and a cheese sandwich, please. — 2. Hello! Nice to meet you. I'm Valeria. — 3. Excuse me, how much is this bag?",
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
              id: "ena-sp3",
              teil: 3,
              weight: 3,
              prompt:
                "Picture A: a small kitchen — one table, two chairs, an old fridge. Picture B: a big kitchen — six chairs, a new fridge, a lot of fruit. Describe the two kitchens and say two differences. Then ask: which kitchen does your partner like?",
              promptEs:
                "Imagen A: una cocina pequeña — una mesa, dos sillas, una nevera vieja. Imagen B: una cocina grande — seis sillas, nevera nueva y mucha fruta. Describe las dos cocinas, di dos diferencias y pregunta cuál prefiere tu compañero.",
              model:
                "In picture A there is a small kitchen with one table and two chairs. The fridge is old. In picture B the kitchen is big: there are six chairs and a new fridge, and there is a lot of fruit. Which kitchen do you like?",
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
              id: "ena-sp4",
              teil: 4,
              weight: 3,
              prompt:
                "Topic: MY FAMILY. Ideas: How many people are there in your family? What are their names? How old are they? What are their jobs? What do they like?",
              promptEs:
                "Tema: MI FAMILIA. Ideas: cuántos sois, sus nombres, edades, trabajos y qué les gusta. Prepara 30 segundos y habla 1 minuto.",
              model:
                "There are four people in my family: my mother, my father, my brother and me. My mother is a teacher and my father works in a hospital. My brother Andrés is twenty-five. He likes football and music. We eat together on Sundays.",
            },
          ],
        },
      ],
    },
  ],
};
