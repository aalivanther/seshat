import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 12 — Your A2 exam: rumbo al LanguageCert International
// ESOL A2 Access. Cierra el nivel y NO enseña ni una estructura nueva: todo lo
// que se practica aquí sale de ena2m1-ena2m11 y del A1.
//
// EL FORMATO ES EL VERIFICADO EN PLAN-EN-A2 §1.1 (handbook ver 7.0, 11/08/2025,
// y Speaking ver 6.0, 09/10/2025), no el del A1 con otro nombre:
//   · Written 1 h 40 — Listening ~20 min: 4 partes, 26 ítems (7-7-6-6), TODO
//     se oye DOS VECES · Reading 4 partes, 26 ítems (6-6-7-7) y Writing 2
//     tareas de 30-50 palabras, los dos juntos en 1 h 20 sin pausa.
//   · Spoken 9 minutos, 4 partes, con 30 s de preparación y 1 minuto de
//     monólogo en la Parte 4.
//   · Aprobado 75/150 · High Pass 101/150. El oral se graba y lo puntúa un
//     Marking Examiner que no estuvo en la sala.
//
// LAS DOS DIFERENCIAS CON EL A1 QUE ESTE MÓDULO ENTRENA A PROPÓSITO:
//   (1) cada ítem de la Parte 1 del Listening trae DOS datos, no uno (L2);
//   (2) la Parte 4 del Listening SE ESCRIBE — una hoja de recados con seis
//       encabezados y espacio para escribir, y el input es un MONÓLOGO, no una
//       conversación (L3). Es el cambio de formato más gordo del nivel.
//
// EL AVISO DE FRONTERA, dicho en voz alta y dos veces (L1 y L9): past
// continuous (m3), should (m8), present perfect (m10), will y el primer
// condicional (m11) están en la columna Achiever (B1) del syllabus oficial y
// NO se evalúan en el A2 Access. El curso los enseña igualmente porque
// entender es gratis y porque el B1 empieza donde acaba esto; lo que no se
// hace es apostar la nota a ellos.
//
// LA CLÍNICA DE CIERRE (L8). Once módulos, once clínicas de sonido; aquí van
// las once seguidas, en su propia sección de la lección del oral, más lo único
// que faltaba: el RITMO de frase (golpes de voz, no sílabas), que es lo que
// explica por qué el audio del examen parece ir rápido cuando lo que hace es
// ir desigual. No se enseña un solo sonido nuevo: todo el material se
// referencia por id de ena2m1-ena2m11.
//
// RECICLADO — este módulo casi no declara vocabulario: referencia por id el de
// los once anteriores y el del A1. Del A1 (drop 3): enexam, enpart, entwice,
// encorrectanswer, enyouwillhear, endontworry, encandidate, entickthebox,
// enrecording, enbestreply, enlistencarefully, enform, enfillintheform,
// endouble, enpostcode, endateofbirth, entext, ensign, enmissingsentence,
// endearamy, enbestwishes, enseeyousoon, enletmethink, encanyousaythatagain,
// engoodluck, enexaminer, enconversation, entopic, enpostcard, enmessage,
// encountyourwords, enwriteback, enthirtyseconds, enyoucandoit, enresults,
// enwelldone, enthankyoufortheinvitation, enhowdoyouspellit. Del A2: los ids
// de ena2m1-ena2m10, uno por lección de la espiral.
//
// NO se toca ena2m11: se está escribiendo en paralelo y sus ids no existen
// todavía. El primer condicional se nombra como frontera y nada más.
//
// Las 40 tarjetas propias son fórmulas de examen —la lengua de la hoja, del
// teléfono y de la carta formal—, no palabras sueltas. Todas llevan el prefijo
// ena2m12, que es regla dura del validador.

export const vocabEnA2m12: Record<string, VocabItem> = {
  // ── ena2m12l1 — el mapa del examen ──
  ena2m12thepassmark: {
    id: "ena2m12thepassmark", target: "the pass mark", source: "el corte de aprobado (75 de 150)",
    sound: "de PAAS maak",
  },
  ena2m12ahighpass: {
    id: "ena2m12ahighpass", target: "a High Pass", source: "un aprobado alto (101 de 150)",
    sound: "a jái PAAS",
  },
  ena2m12theinstructions: {
    id: "ena2m12theinstructions", target: "the instructions", source: "las instrucciones (van en inglés, siempre las mismas)",
    sound: "di in-STRÁK-shons̬",
  },
  ena2m12readthequestionsfirst: {
    id: "ena2m12readthequestionsfirst", target: "Read the questions first.", source: "Lee primero las preguntas.",
    sound: "riid de KUÉS-chons̬ FÉEST",
    gram: { trap: "Read first the questions." },
  },
  ena2m12checkyouranswers: {
    id: "ena2m12checkyouranswers", target: "Check your answers.", source: "Repasa tus respuestas.",
    sound: "chek yoo ÁAN-sas̬",
  },
  // ── ena2m12l2 — Listening, partes 1 y 2 ──
  ena2m12twopiecesofinformation: {
    id: "ena2m12twopiecesofinformation", target: "two pieces of information", source: "dos datos (lo que trae CADA ítem de la Parte 1 en A2)",
    sound: "tuu PÍI-sis̬ ov in-fo-MÉI-shon",
    gram: { trap: "two informations" },
  },
  ena2m12writeitdown: {
    id: "ena2m12writeitdown", target: "Write it down.", source: "Apúntalo.",
    sound: "ráit it DÁUN",
    gram: { trap: "Write down it." },
  },
  ena2m12thefirsttime: {
    id: "ena2m12thefirsttime", target: "the first time / the second time", source: "la primera escucha / la segunda",
    sound: "de FÉEST taim / de SÉ-kond taim",
  },
  ena2m12theannouncement: {
    id: "ena2m12theannouncement", target: "the announcement", source: "el aviso por megafonía (estación, aeropuerto, tienda)",
    sound: "di a-NÁUNS-ment",
  },
  // ── ena2m12l3 — Listening, partes 3 y 4: la ficha que SE ESCRIBE ──
  ena2m12themessagepad: {
    id: "ena2m12themessagepad", target: "the message pad", source: "la hoja de recados (la ficha de 6 huecos de la Parte 4)",
    sound: "de MÉ-sidch pad",
  },
  ena2m12canitakeamessage: {
    id: "ena2m12canitakeamessage", target: "Can I take a message?", source: "¿Quiere dejar un recado?",
    sound: "kan ái téik a MÉ-sidch",
  },
  ena2m12theheading: {
    id: "ena2m12theheading", target: "the heading", source: "el encabezado (lo que va escrito encima de cada hueco)",
    sound: "de JÉ-ding",
  },
  ena2m12couldyouspellthat: {
    id: "ena2m12couldyouspellthat", target: "Could you spell that, please?", source: "¿Me lo deletrea, por favor?",
    sound: "kud yu SPEL dat, plíis̬",
    gram: { trap: "Can you spell me that, please?" },
  },
  ena2m12thereferencenumber: {
    id: "ena2m12thereferencenumber", target: "the reference number", source: "el número de referencia (de una reserva, de un pedido)",
    sound: "de RÉ-frens NAM-ba",
  },
  ena2m12valeriaspeaking: {
    id: "ena2m12valeriaspeaking", target: "Hello, Valeria speaking.", source: "Hola, soy Valeria. (al descolgar el teléfono)",
    sound: "je-LÓU, va-LÉ-ria SPÍI-king",
  },
  ena2m12holdtheline: {
    id: "ena2m12holdtheline", target: "Hold the line, please.", source: "No cuelgue, por favor.",
    sound: "jóuld de LÁIN, plíis̬",
  },
  // ── ena2m12l4 — Reading, tareas 1 y 2 ──
  ena2m12thenotice: {
    id: "ena2m12thenotice", target: "the notice", source: "el aviso escrito (el papel pegado en la puerta)",
    sound: "de NÓU-tis",
  },
  ena2m12theleaflet: {
    id: "ena2m12theleaflet", target: "the leaflet", source: "el folleto",
    sound: "de LÍI-flet",
  },
  ena2m12theextrasentence: {
    id: "ena2m12theextrasentence", target: "the extra sentence", source: "la frase que sobra (la Tarea 2 trae siempre una)",
    sound: "di ÉKS-tra SÉN-tens",
  },
  ena2m12theparagraph: {
    id: "ena2m12theparagraph", target: "the paragraph", source: "el párrafo",
    sound: "de PÁ-ra-graaf",
  },
  // ── ena2m12l5 — Reading, tareas 3 y 4 ──
  ena2m12thepurposeofthetext: {
    id: "ena2m12thepurposeofthetext", target: "the purpose of the text", source: "para qué se escribió el texto (avisar, invitar, disculparse…)",
    sound: "de PÉE-pos ov de tekst",
  },
  ena2m12guessfromthecontext: {
    id: "ena2m12guessfromthecontext", target: "Guess the word from the context.", source: "Adivina la palabra por el contexto.",
    sound: "gues de UÉED from de KON-tekst",
  },
  ena2m12theopeninghours: {
    id: "ena2m12theopeninghours", target: "the opening hours", source: "el horario (de apertura)",
    sound: "di ÓU-pe-ning ÁUas̬",
  },
  // ── ena2m12l6 — Writing, tarea 1: la respuesta informal ──
  ena2m12answerallthreequestions: {
    id: "ena2m12answerallthreequestions", target: "Answer all three questions.", source: "Contesta las tres preguntas.",
    sound: "ÁAN-sa ool zrii KUÉS-chons̬",
  },
  ena2m12thanksforyourmessage: {
    id: "ena2m12thanksforyourmessage", target: "Thanks for your message!", source: "¡Gracias por tu mensaje!",
    sound: "zanks fo yoo MÉ-sidch",
  },
  ena2m12sorryforthelatereply: {
    id: "ena2m12sorryforthelatereply", target: "Sorry for the late reply!", source: "¡Perdona que conteste tan tarde!",
    sound: "SO-ri fo de léit ri-PLÁI",
  },
  ena2m12lovevaleria: {
    id: "ena2m12lovevaleria", target: "Love, Valeria", source: "Un beso, Valeria (cierre informal, solo con gente cercana)",
    sound: "lav, va-LÉ-ria",
  },
  // ── ena2m12l7 — Writing, tarea 2: el texto neutro o formal ──
  ena2m12dearsirormadam: {
    id: "ena2m12dearsirormadam", target: "Dear Sir or Madam,", source: "Estimado señor / Estimada señora, (cuando NO sabes el nombre)",
    sound: "día SÉE oo MÁ-dam",
  },
  ena2m12yourssincerely: {
    id: "ena2m12yourssincerely", target: "Yours sincerely,", source: "Atentamente, (cuando SÍ sabes el nombre: Dear Mr Patel)",
    sound: "yoos̬ sin-SÍA-li",
  },
  ena2m12iamwritingto: {
    id: "ena2m12iamwritingto", target: "I am writing to ask about the exam.", source: "Le escribo para preguntar por el examen.",
    sound: "ái am RÁI-ting tu AASK a-báut di ig-S̬ÁM",
    gram: { trap: "I write you to ask about the exam." },
  },
  ena2m12iwouldbegrateful: {
    id: "ena2m12iwouldbegrateful", target: "I would be grateful for any information.", source: "Le agradecería cualquier información.",
    sound: "ái ud bi GRÉIT-ful fo E-ni in-fo-MÉI-shon",
    gram: { trap: "I would be grateful for any informations." },
  },
  ena2m12ilookforwardtoyourreply: {
    id: "ena2m12ilookforwardtoyourreply", target: "I look forward to your reply.", source: "Quedo a la espera de su respuesta.",
    sound: "ái luk FÓO-uad tu yoo ri-PLÁI",
    gram: { trap: "I look forward to hear from you.", rektion: { prep: "to", stem: "look forward" } },
  },
  // ── ena2m12l8 — Spoken: los nueve minutos ──
  ena2m12thepreparationtime: {
    id: "ena2m12thepreparationtime", target: "You have thirty seconds to prepare.", source: "Tienes treinta segundos para preparar.",
    sound: "yu jav ZÉE-ti SÉ-konds̬ tu pri-PÉA",
    gram: { trap: "You have thirty seconds for prepare." },
  },
  ena2m12iagreewithyou: {
    id: "ena2m12iagreewithyou", target: "I agree with you.", source: "Estoy de acuerdo contigo.",
    sound: "ái a-GRÍI uid yu",
    gram: { trap: "I am agree with you.", same: ["I think so too."] },
  },
  ena2m12itdependsonthetopic: {
    id: "ena2m12itdependsonthetopic", target: "It depends on the topic.", source: "Depende del tema.",
    sound: "it di-PENDS̬ on de TO-pik",
    gram: { trap: "It depends of the topic.", rektion: { prep: "on", stem: "depend" } },
  },
  ena2m12sorryidontunderstandthequestion: {
    id: "ena2m12sorryidontunderstandthequestion", target: "Sorry, I don't understand the question.", source: "Perdona, no entiendo la pregunta.",
    sound: "SO-ri, ái dóunt an-da-STAND de KUÉS-chon",
  },
  ena2m12thatsallthankyou: {
    id: "ena2m12thatsallthankyou", target: "That's all, thank you.", source: "Ya está, gracias. (así cierras tu minuto)",
    sound: "dats OOL, zank yu",
  },
  // ── ena2m12l9 — estrategia, matrícula y cierre del nivel ──
  ena2m12tosumup: {
    id: "ena2m12tosumup", target: "To sum up,", source: "En resumen,",
    sound: "tu sam AP",
  },
  ena2m12theexamcentre: {
    id: "ena2m12theexamcentre", target: "the exam centre", source: "el centro de examen",
    sound: "di ig-S̬ÁM SEN-ta",
  },
  ena2m12thankyouforeverything: {
    id: "ena2m12thankyouforeverything", target: "Thank you for everything!", source: "¡Gracias por todo!",
    sound: "zank yu fo É-vri-zing",
  },
};

export const ena2m12: Phase = {
  id: "ena2m12",
  level: "a2",
  n: 12,
  title: "Your A2 exam",
  goal: "Conocer el LanguageCert A2 Access por dentro y entrenar sus ocho tareas exactas — con la ficha que se escribe, los dos textos de 30-50 palabras y el minuto de monólogo — sin aprender ni una estructura nueva.",
  color: "#9f1239",
  lessons: [
    {
      // L1 EL MAPA. Dos notas a propósito: el formato verificado, y el aviso
      // de frontera. El aviso va aquí (y vuelve en la L9) porque un alumno que
      // descubre en junio que el present perfect no se evalúa se siente
      // engañado; dicho en agosto, es información útil que le ordena el repaso.
      id: "ena2m12l1",
      phaseId: "ena2m12",
      title: "The A2 exam, up close",
      subtitle: "El mapa del A2 Access — y, con todas las letras, qué NO entra",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Las palabras que verás en todas las hojas",
          itemIds: [
            "ena2m12thepassmark", "ena2m12ahighpass", "ena2m12theinstructions",
            "ena2m12readthequestionsfirst", "ena2m12checkyouranswers",
          ],
        },
        {
          kind: "note",
          note: {
            title: "El A2 Access, por dentro",
            body: "Dos citas, igual que en el A1, pero el examen ha crecido. El <b>escrito</b> dura 1 h 40: <b>Listening</b> (~20 min, 4 partes, 26 preguntas, y <b>todo se oye dos veces</b>) y, sin pausa, <b>Reading</b> (4 partes, 26 preguntas) + <b>Writing</b> (2 textos de <b>30-50 palabras</b>) en 1 h 20 seguidos. El <b>oral</b> son <b>9 minutos</b> en 4 partes; se graba y lo puntúa un examinador que no estuvo en la sala, así que hablar claro vale más que hablar bonito. Se aprueba con <b>75 de 150</b> —ese es [[the pass mark|el corte de aprobado]]— y a partir de <b>101</b> el certificado dice <b>High Pass</b>. El corte que el handbook publica es <b>ese, el del total</b>: 75 sobre la suma de Listening, Reading y Writing. Lo que <b>no</b> publica en esa tabla es si hay además un mínimo por destreza — así que no lo sabemos, y no saberlo no es lo mismo que saber que no lo hay. Consecuencia práctica, y es la única que importa: <b>no dejes una destreza en blanco confiando en que las otras la levanten</b>. Contesta las 26 del Reading y escribe los dos textos aunque vayas mal de tiempo, que cada tarea del Writing vale <b>12 marcas</b> y dejar una sin hacer es tirar una tarea entera. Y el <b>oral se puntúa aparte</b>, con su propio corte (25 de 50): ahí no hay compensación posible, es otro certificado.",
            table: [
              ["Parte", "Tiempo", "Qué haces"],
              ["Listening", "~20 min", "4 partes · 26 ítems (7-7-6-6) · todo ×2"],
              ["Reading", "1 h 20 con Writing", "4 partes · 26 ítems (6-6-7-7)"],
              ["Writing", "(dentro de esa hora y veinte)", "2 textos de 30-50 palabras"],
              ["Spoken", "9 min", "4 partes · 30 s de preparación en la última"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Lo que este curso te enseñó y el examen NO te va a preguntar",
            body: "Esto se dice una vez y claro. El syllabus oficial de LanguageCert reparte la gramática en columnas, y hay cinco cosas que estudiaste en este curso que viven en la columna de <b>B1</b>, no en la de A2:<br/><br/>· el <b>past continuous</b> (<i>I was waiting</i>) del módulo 3,<br/>· <b>should / shouldn't</b> del módulo 8,<br/>· el <b>present perfect</b> entero (<i>have you ever…</i>, <i>just</i>, <i>yet</i>, <i>for</i>, <i>since</i>) del módulo 10,<br/>· <b>will / won't</b> y el <b>primer condicional</b> del módulo 11.<br/><br/>En el examen no te van a puntuar por usarlos ni te van a penalizar por no usarlos: <b>no entran</b>. ¿Y entonces por qué están en el curso? Porque <b>entender es gratis</b>: en el Listening y en el Reading salen igual, dichos por ingleses que no consultan syllabus, y quien los reconoce no se queda en blanco. Y porque el B1 empieza exactamente ahí. Lo único que no se hace es <b>apostar la nota</b> a ellos: si dudas entre <i>I have finished</i> y <i>I finished</i> el día del examen, escribe <b>I finished</b> y sigue.",
            table: [
              ["Núcleo evaluable (A2 Access)", "Frontera (columna B1)"],
              ["past simple regular e irregular", "past continuous"],
              ["be going to · present continuous de futuro", "will · primer condicional"],
              ["must · mustn't · have to · can · could · may", "should"],
              ["comparativos y superlativos", "present perfect (ever, yet, since)"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l1e1", type: "mc", prompt: "El mapa, de memoria",
              question: "¿Cuántas preguntas tiene el Listening del A2 Access?",
              options: ["26, en cuatro partes", "20, en tres partes", "32, en cinco partes"],
              answer: 0,
              whyWrong: [null, "Tres partes son las del A1 antiguo: aquí son cuatro (7-7-6-6)", "Cinco partes es Cambridge A2 Key, otro examen"],
              itemIds: ["enexam", "enpart"],
              tip: "7 + 7 + 6 + 6 = 26. Y el Reading, otras 26 (6-6-7-7). Sabérselo quita media hora de nervios.",
            },
            {
              id: "ena2m12l1e2", type: "mc", prompt: "El corte",
              question: "¿Con cuánto se aprueba el escrito?",
              options: ["75 de 150", "50 de 100", "101 de 150"],
              answer: 0,
              whyWrong: [null, "El 50 % es el corte del A1; aquí la escala es sobre 150", "101 existe, pero es el High Pass — el aprobado está en 75"],
              itemIds: ["ena2m12thepassmark", "ena2m12ahighpass"],
              tip: "75 aprueba, 101 es High Pass. Entre esos dos números vive todo tu margen de error.",
            },
            {
              id: "ena2m12l1e3", type: "mc", prompt: "Reading y Writing, juntos",
              question: "Tienes 1 h 20 para Reading y Writing. ¿Cómo se reparten?",
              options: [
                "Tú decides: van seguidos, sin pausa y sin aviso",
                "40 minutos cada uno, y el examinador avisa",
                "El Writing se hace después, en otra sala",
              ],
              answer: 0,
              whyWrong: [null, "Nadie te avisa: el reloj es uno solo para las dos destrezas", "Van en el mismo cuadernillo y en la misma hora y veinte"],
              itemIds: ["enpart"],
              tip: "Que el reloj sea tuyo significa que el reparto también: en la lección 9 lo fijamos con números.",
            },
            {
              id: "ena2m12l1e4", type: "mc", prompt: "La frontera, sin rodeos",
              question: "¿Cuál de estas estructuras NO se evalúa en el A2 Access?",
              options: [
                "Have you ever been to Scotland?",
                "We're going to take the coach.",
                "You mustn't smoke in here.",
              ],
              answer: 0,
              whyWrong: [
                null,
                "be going to es núcleo del A2: es EL futuro del nivel",
                "must y mustn't son núcleo del A2: la lengua de los avisos",
              ],
              itemIds: ["ena2m10haveyouever", "ena2m6weregoingtobrighton", "ena2m7youmustntsmoke"],
              tip: "El present perfect está en la columna B1. Reconocerlo, sí; jugarte la nota a él, no.",
            },
            {
              id: "ena2m12l1e5", type: "bucket", prompt: "Clasifica: ¿núcleo evaluable o frontera?",
              categories: ["Núcleo A2 (entra)", "Frontera B1 (no entra)"],
              items: [
                { text: "I missed the bus and I walked home.", bucket: 0 },
                { text: "I was waiting for the bus when it started to rain.", bucket: 1 },
                { text: "It's cheaper than the other one.", bucket: 0 },
                { text: "You should see a doctor.", bucket: 1 },
                { text: "You have to check in first.", bucket: 0 },
                { text: "I've already seen that film.", bucket: 1 },
                { text: "There weren't many tables free.", bucket: 0 },
                { text: "If it rains, we'll stay in.", bucket: 1 },
              ],
              itemIds: ["ena2m1missedthebus", "ena2m4cheaperthan", "ena2m7youhavetocheckin"],
              tip: "Las cuatro de la derecha son las de los módulos 3, 8, 10 y 11. Siguen siendo tuyas: solo no son del examen.",
            },
            {
              id: "ena2m12l1e6", type: "match", prompt: "Las instrucciones del examen — las verás tal cual",
              pairs: [
                { target: "Answer all three questions.", source: "Contesta las tres preguntas." },
                { target: "Write 30-50 words.", source: "Escribe entre 30 y 50 palabras." },
                { target: "You will hear the recording twice.", source: "Oirá la grabación dos veces." },
                { target: "Check your answers.", source: "Repasa tus respuestas." },
              ],
              itemIds: ["ena2m12answerallthreequestions", "ena2m12checkyouranswers", "enyouwillhear", "ena2m12theinstructions"],
              tip: "Son siempre las mismas diez frases. Si las lees sin traducir, ganas minutos de reloj el día D.",
            },
            {
              id: "ena2m12l1e7", type: "cloze", prompt: "Completa la regla de oro del papel",
              text: "Read the ___ first, and then read the text.",
              answers: ["questions"],
              translation: "Lee primero las preguntas y luego el texto.",
              hints: ["Lo que tienes que contestar", "Read the qu…"],
              itemIds: ["ena2m12readthequestionsfirst"],
              tip: "Leer las preguntas primero convierte la lectura en una búsqueda. Sin ellas lees a ciegas y lees dos veces.",
            },
            {
              id: "ena2m12l1e8", type: "errorfix", prompt: "Corrige — el adverbio se ha ido de sitio",
              wrong: "Read first the questions.",
              answers: ["Read the questions first.", "Read the questions first"],
              why: "En español el «primero» va pegado al verbo («lee primero las preguntas»); en inglés first se va al FINAL, detrás del complemento. Mismo problema que con «really», «well» y «very much»: el inglés no mete adverbios entre el verbo y su objeto.",
              translation: "Lee primero las preguntas.",
              hints: ["El verbo y su objeto no se separan", "Read the questions ___ ."],
              itemIds: ["ena2m12readthequestionsfirst", "ena2m3ilikeitverymuch"],
            },
            {
              id: "ena2m12l1e9", type: "gapbank", prompt: "El mapa del examen, en un párrafo",
              text: "The written exam is one hour and forty minutes. The Listening has four ___ and you hear everything ___ . After that, the Reading and the Writing go together: twenty-six questions and two texts of thirty to fifty ___ . The Spoken exam is nine ___ long.",
              answers: ["parts", "twice", "words", "minutes"],
              bank: ["parts", "twice", "words", "minutes", "hours", "pages"],
              translation: "El examen escrito dura una hora y cuarenta minutos. El Listening tiene cuatro partes y todo se oye dos veces. Después van juntos el Reading y el Writing: veintiséis preguntas y dos textos de treinta a cincuenta palabras. El oral dura nueve minutos.",
              itemIds: ["enpart", "entwice", "encountyourwords", "enexam"],
              tip: "Si puedes recitar este párrafo, ya no hay sorpresas de formato: solo quedan las preguntas.",
            },
            {
              id: "ena2m12l1e10", type: "listen", prompt: "Dictado: la instrucción que abre el cuadernillo",
              text: "Read the questions first and check your answers at the end.",
              translation: "Lee primero las preguntas y repasa tus respuestas al final.",
              hints: ["Empieza con Read the…", "…and check your answers at the end."],
              itemIds: ["ena2m12readthequestionsfirst", "ena2m12checkyouranswers"],
            },
            {
              id: "ena2m12l1e11", type: "hearreal", prompt: "¿Libro o calle? Así lo dice el examinador de verdad",
              book: "You are going to hear the recording twice.",
              real: "You're gonna hear it twice.",
              translation: "Vas a oír la grabación dos veces.",
              itemIds: ["enyouwillhear", "entwice", "ena2m6gonnasound"],
              tip: "gonna es going to fundido, tu píldora del módulo 6. En la sala se dice así; en tu Writing, nunca.",
            },
            {
              id: "ena2m12l1e12", type: "type", prompt: "Cierre de producción",
              question: "Repasa tus respuestas.",
              answers: ["Check your answers.", "Check your answers"],
              hints: ["Imperativo: verbo + your…", "Check your…"],
              itemIds: ["ena2m12checkyouranswers"],
              tip: "Los últimos cinco minutos del escrito son para esto, y solo para esto. No para escribir más: para repasar.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-1",
            book: "You will hear the recording twice.",
            real: "You'll hear it twice.",
            meaning: "Oirá la grabación dos veces — la frase que te salva el Listening",
            when: "En el audio del examen la versión completa; en boca del invigilador de la sala, la corta. Tú no tienes que decirla: solo reconocerla y respirar.",
            register: "neutral",
            note: "El inglés hablado contrae el auxiliar y sustituye el sustantivo largo por it en cuanto ya se sabe de qué se habla.",
            sound: "yul JÍA it TUÁIS",
            level: "a2",
            itemId: "entwice",
          },
        },
      ],
      resources: [
        {
          label: "LanguageCert — International ESOL A2 Access (página oficial)",
          url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277",
          note: "Descarga el past paper gratuito y HOJÉALO, sin resolverlo (15 min): localiza las cuatro partes del Listening y las cuatro del Reading, y mira la hoja de recados de la Parte 4. Verla hoy vale más que hacerla mal.",
        },
      ],
    },
    {
      // L2 LISTENING 1-2. La novedad del nivel en la T1: cada ítem trae DOS
      // datos y hay que cruzarlos. Por eso todos los audiomc de aquí piden dos
      // cosas a la vez y los distractores cambian solo UNA de las dos: es
      // exactamente cómo se falla en la sala.
      id: "ena2m12l2",
      phaseId: "ena2m12",
      title: "Listening: parts 1 and 2",
      subtitle: "Dos datos por ítem (eso es nuevo) y la mejor réplica",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El kit de las dos primeras partes",
          itemIds: [
            "ena2m12twopiecesofinformation", "ena2m12writeitdown",
            "ena2m12thefirsttime", "ena2m12theannouncement",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Parte 1: dos datos, no uno · Parte 2: la mejor réplica",
            body: "<b>Parte 1</b> (7 ítems): oyes un enunciado corto —un [[the announcement|aviso de megafonía]], un recado, una indicación— y eliges entre tres opciones. Y aquí está <b>el cambio del A2</b>: cada ítem lleva <b>dos datos</b>, no uno. Ya no basta con cazar la hora: hay que cazar la hora <b>y</b> el andén, el número <b>y</b> la planta, el precio <b>y</b> la cantidad. Los tres distractores están hechos para que uno de los dos datos encaje. <b>Parte 2</b> (7 ítems): oyes una frase y eliges <b>la mejor réplica</b> — no la que suena parecido, la que <i>responde</i>. Y la regla que lo cambia todo: <b>se oye dos veces</b>. La primera escucha es para entender de qué va; la segunda, para confirmar los dos datos. Nunca al revés.",
            table: [
              ["Escucha", "Qué haces"],
              ["La primera", "Entender la situación · marcar a lápiz lo que creas"],
              ["Entre las dos", "Leer otra vez las tres opciones"],
              ["La segunda", "Confirmar LOS DOS datos · escribir en firme"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l2e1", type: "mc", prompt: "Lo que cambia respecto al A1",
              question: "En la Parte 1 del A2, ¿qué trae cada ítem?",
              options: [
                "Dos datos que hay que cruzar",
                "Un solo dato, como en el A1",
                "Un texto largo con seis huecos",
              ],
              answer: 0,
              whyWrong: [null, "Ese era el A1: aquí el handbook dice literalmente «two pieces of information»", "Eso es la Parte 4, y además se escribe"],
              itemIds: ["ena2m12twopiecesofinformation"],
              tip: "Antes de darle al play, decide QUÉ DOS cosas vas a cazar. Con una sola en la cabeza, fallas.",
            },
            {
              id: "ena2m12l2e2", type: "audiomc", prompt: "Parte 1: hora y andén — 2 escuchas",
              audio: "The nine fifteen service to Brighton leaves from platform four.",
              question: "¿Qué dos datos apuntas?",
              options: ["9:15 y andén 4", "9:50 y andén 4", "9:15 y andén 14"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "El andén sí, pero la hora no: fifteen lleva el golpe al final (fif-TÍIN) — fifty sonaría plano",
                "La hora sí, pero el andén no: oíste four a secas, no fourteen",
              ],
              itemIds: ["ena2m6platformfour", "ena2m12twopiecesofinformation"],
              tip: "Fíjate en los distractores: cada uno acierta UN dato y falla el otro. Así están hechos todos los de la Parte 1 en A2.",
            },
            {
              id: "ena2m12l2e3", type: "audiomc", prompt: "Parte 1: habitación y planta — 2 escuchas",
              audio: "Your room is number thirteen, on the third floor.",
              question: "¿Qué dos datos apuntas?",
              options: ["Habitación 13, tercera planta", "Habitación 30, tercera planta", "Habitación 13, primera planta"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "thirty suena plano (ZÉE-ti); aquí el golpe cayó al final: zee-TÍIN",
                "third es tercera; first sonaría féest, con otra vocal entera",
              ],
              itemIds: ["ena2m4thirteenpounds", "ena2m12twopiecesofinformation"],
              tip: "El par 13/30 vuelve, pero ahora con un segundo dato al lado. Cazar los dos es el nivel A2.",
            },
            {
              id: "ena2m12l2e4", type: "audiomc", prompt: "Parte 1: cantidad y precio — 2 escuchas",
              audio: "Two coffees and a slice of cake — that's six pounds fifty, please.",
              question: "¿Qué dos datos apuntas?",
              options: ["2 cafés y £6,50", "2 cafés y £6,15", "3 cafés y £6,50"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "El número de cafés sí; el precio no: fifty va plano, fifteen llevaría el golpe al final",
                "El precio sí; los cafés no: oíste two, y el tercer artículo era un trozo de tarta",
              ],
              itemIds: ["ena2m5twocoffeesplease", "ena2m5asliceofcake"],
              tip: "En una cuenta, los dos datos son casi siempre CUÁNTOS y CUÁNTO. Prepara dos casillas antes del play.",
            },
            {
              id: "ena2m12l2e5", type: "audiomc", prompt: "Parte 1: apellido y teléfono — 2 escuchas",
              audio: "It's Doctor Ellis, E-double L-I-S. My number is oh two oh, seven nine four six.",
              question: "¿Qué dos datos apuntas?",
              options: ["Ellis y 020 7946", "Elis y 020 7946", "Ellis y 020 7964"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "double L son DOS eles: Ellis",
                "El apellido sí; el número no: el orden fue nine-four-six, no nine-six-four",
              ],
              itemIds: ["endouble", "enexaminer"],
              tip: "Letras y cifras en el mismo audio: la combinación favorita de la Parte 1. Escribe mientras suena, no después.",
            },
            {
              id: "ena2m12l2e6", type: "audiomc", prompt: "Parte 2: la mejor réplica — 2 escuchas",
              audio: "Would you like some more tea?",
              question: "Elige la mejor réplica:",
              options: ["No, thanks. I'm fine.", "Yes, I did.", "It's over there."],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Yes, I did responde a una pregunta en pasado con did", "Eso respondería a un Where…?"],
              itemIds: ["enbestreply", "ena2m5wouldyoulikesometea"],
              tip: "Pregúntate siempre: ¿a QUÉ pregunta respondería esto? La opción que responde a otra cosa se cae sola.",
            },
            {
              id: "ena2m12l2e7", type: "audiomc", prompt: "Parte 2: la disculpa — 2 escuchas",
              audio: "I'm really sorry about the noise last night.",
              question: "Elige la mejor réplica:",
              options: ["Don't worry about it.", "Yes, please.", "Here you are."],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Yes, please responde a un ofrecimiento", "Here you are se dice al ENTREGAR algo"],
              itemIds: ["enbestreply", "endontworry", "ena2m5imsosorryaboutthat"],
              tip: "Disculpa → quitar hierro. Es una de las seis funciones que más caen: perdón, gracias, ofrecer, pedir, invitar, quedar.",
            },
            {
              id: "ena2m12l2e8", type: "audiomc", prompt: "Parte 1: el aviso de la estación — 2 escuchas",
              audio: "Attention, please. The ten thirty coach to Manchester is now leaving from stand B.",
              question: "¿Qué dos datos apuntas?",
              options: ["10:30 y dársena B", "10:13 y dársena B", "10:30 y dársena D"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "thirty es plano; thirteen llevaría el golpe al final",
                "B se dice «bii»; D se dice «dii» — la consonante es la que cambia",
              ],
              itemIds: ["ena2m12theannouncement", "ena2m6thecoach"],
              tip: "En los avisos reales, la hora va SIEMPRE antes del sitio. Prepara las dos casillas en ese orden.",
            },
            {
              id: "ena2m12l2e9", type: "bucket", prompt: "¿Qué cazas en cada parte?",
              categories: ["Parte 1: dos DATOS", "Parte 2: la FUNCIÓN"],
              items: [
                { text: "una hora y un andén", bucket: 0 },
                { text: "responder a un gracias", bucket: 1 },
                { text: "un apellido deletreado y un teléfono", bucket: 0 },
                { text: "aceptar o rechazar un ofrecimiento", bucket: 1 },
                { text: "un precio y una cantidad", bucket: 0 },
                { text: "quitar hierro a una disculpa", bucket: 1 },
              ],
              itemIds: ["ena2m12twopiecesofinformation", "enbestreply"],
              tip: "Saber qué se te pide antes de oír nada es media respuesta. La otra media es la segunda escucha.",
            },
            {
              id: "ena2m12l2e10", type: "listen", prompt: "Dictado de examen: los dos datos en la misma frase",
              text: "The bus to the airport leaves at ten past six from stop C.",
              translation: "El autobús al aeropuerto sale a las seis y diez desde la parada C.",
              hints: ["ten past six = las seis y diez", "…from stop C."],
              itemIds: ["ena2m12theannouncement", "ena2m6thecoach"],
              tip: "Escribir lo que oyes entrena las dos cosas a la vez: el oído y la mano. La Parte 4 te lo va a cobrar.",
            },
            {
              id: "ena2m12l2e11", type: "errorfix", prompt: "Corrige — el pronombre se ha colado fuera",
              wrong: "Write down it in your notes.",
              answers: ["Write it down in your notes.", "Write it down in your notes"],
              why: "Con estos verbos de dos piezas (write down, pick up, turn off), el pronombre it, them, him va SIEMPRE en medio: write it down. Solo el sustantivo entero puede ir detrás: write down the number.",
              translation: "Apúntalo en tus notas.",
              hints: ["it no se pone al final", "Write ___ down…"],
              itemIds: ["ena2m12writeitdown"],
            },
            {
              id: "ena2m12l2e12", type: "type", prompt: "Cierre de producción",
              question: "Apúntalo.",
              answers: ["Write it down.", "Write it down"],
              hints: ["Verbo + it + partícula", "Write it…"],
              itemIds: ["ena2m12writeitdown"],
              tip: "En la Parte 1 se escribe a lápiz durante la primera escucha y en firme durante la segunda. La mano también se entrena.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-2",
            book: "Would you like some more tea?",
            real: "More tea?",
            meaning: "¿Más té? — el ofrecimiento reducido a dos palabras",
            when: "En casa de alguien, en una mesa, con la tetera en la mano. En el examen lo oyes así de corto en la Parte 2 y tienes que reconocer que es un OFRECIMIENTO, no una pregunta de información.",
            register: "amigos",
            note: "Los ofrecimientos en inglés se acortan hasta el sustantivo: «Coffee?», «Lift?», «Hand?». La entonación sube y eso basta.",
            sound: "móo TÍI? (subiendo)",
            level: "a2",
            itemId: "ena2m5wouldyoulikesometea",
          },
        },
      ],
      resources: [
        {
          label: "British Council — A2 Listening",
          url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening",
          note: "Un audio al día esta semana, con la regla del examen: lee las preguntas antes, dos escuchas y ni una más. Apunta SIEMPRE dos datos por audio, aunque no te los pidan.",
        },
      ],
    },
    {
      // L3 LISTENING 3-4. Aquí vive el cambio de formato más grande del nivel:
      // la Parte 4 del A1 se marcaba con una cruz y la del A2 SE ESCRIBE. Por
      // eso la lección mezcla comprensión (audiomc con cuaderno) y escritura
      // real (listen y gapbank con la ficha), y no solo opciones.
      id: "ena2m12l3",
      phaseId: "ena2m12",
      title: "Listening: parts 3 and 4",
      subtitle: "La conversación… y la ficha de recados que SE ESCRIBE",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "El kit del teléfono y de la ficha",
          itemIds: [
            "ena2m12themessagepad", "ena2m12canitakeamessage", "ena2m12theheading",
            "ena2m12couldyouspellthat", "ena2m12thereferencenumber",
            "ena2m12valeriaspeaking", "ena2m12holdtheline",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Parte 3: qué pasa entre dos personas · Parte 4: escribe lo que oyes",
            body: "<b>Parte 3</b> (6 ítems): seis conversaciones cortas de dos hablantes. No te preguntan el detalle: te preguntan el <b>tema</b>, el <b>propósito</b>, el <b>sitio</b>, la <b>relación</b> entre los dos o —esto es nuevo del A2— la <b>actitud</b>: si están molestos, sorprendidos o encantados. Se caza por el tono y por dos o tres palabras clave, no entendiéndolo todo.<br/><br/><b>Parte 4</b> (6 huecos) es <b>el cambio grande del nivel</b>. En A1 era un formulario con casillas que marcabas. En A2 es una [[the message pad|hoja de recados]] con seis [[the heading|encabezados]] y <b>espacio para escribir</b>: escribes tú, con tu letra. Y quien habla es <b>una sola persona</b> —un mensaje de voz, un aviso—, no una conversación. Estrategia, en este orden: <b>1)</b> lee los seis encabezados antes del play y decide qué tipo de dato pide cada uno (Name → letras, Time → cifras, Price → libras); <b>2)</b> primera escucha, apunta a lápiz aunque sea a medias; <b>3)</b> segunda escucha, completa y arregla. Se escribe <b>corto</b>: una palabra o un número. Nadie te pide una frase.",
            table: [
              ["Encabezado", "Qué vas a oír"],
              ["Name / Surname", "letras deletreadas, muchas veces con double"],
              ["Phone / Reference", "cifras, y oh en lugar de cero"],
              ["Date / Time", "un día, una hora, y ojo al par 13/30"],
              ["Price / Cost", "libras y peniques"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l3e1", type: "mc", prompt: "El cambio grande del A2",
              question: "¿Qué haces en la Parte 4 del Listening del A2 Access?",
              options: [
                "Escribir tú los seis datos en una hoja de recados",
                "Marcar una casilla entre tres opciones",
                "Elegir la mejor réplica a lo que oyes",
              ],
              answer: 0,
              whyWrong: [null, "Eso era el A1: en A2 hay «space to write», no casillas", "Esa es la Parte 2"],
              itemIds: ["ena2m12themessagepad", "ena2m12theheading"],
              tip: "Y además quien habla es UNA persona, no dos. Un mensaje de voz o un aviso: sin réplicas que te ayuden.",
            },
            {
              id: "ena2m12l3e2", type: "audiomc", prompt: "Parte 3: la relación — 2 escuchas",
              audio: "Did you pay the rent this month? | Yes, on the first, like always. And I took the rubbish out. | Great. Then it's my turn to clean the bathroom.",
              question: "¿Qué relación hay entre los dos hablantes?",
              options: ["Comparten piso", "Son casero e inquilina", "Son cliente y camarero"],
              answer: 0,
              whyWrong: [
                null,
                "Un casero no friega el baño: los dos reparten tareas de la misma casa",
                "Nadie pide ni sirve nada; se habla del alquiler y de la basura",
              ],
              itemIds: ["ena2m9weshareaflat", "ena2m9itsyourturn"],
              tip: "La relación se deduce de lo que COMPARTEN: si los dos hacen tareas de la misma casa, viven juntos.",
            },
            {
              id: "ena2m12l3e3", type: "audiomc", prompt: "Parte 3: la actitud (esto es nuevo del A2) — 2 escuchas",
              audio: "I waited forty minutes and nobody came to the table. In the end we left. | Forty minutes? | Forty. And the place was half empty.",
              question: "¿Cómo se siente el primer hablante?",
              options: ["Molesto", "Sorprendido", "Encantado"],
              answer: 0,
              whyWrong: [
                null,
                "El sorprendido es el segundo hablante, el que repite «Forty minutes?»",
                "Nadie que se marcha de un sitio está encantado con él",
              ],
              itemIds: ["ena2m5excusemethisiscold", "ena2m2unfortunately"],
              tip: "La actitud no se dice, se enseña: repetir un dato con incredulidad, marcharse, «in the end». Busca el gesto, no el adjetivo.",
            },
            {
              id: "ena2m12l3e4", type: "audiomc", prompt: "Parte 3: el propósito — 2 escuchas",
              audio: "Hi, it's about Saturday. I'm really sorry, but I can't come — I have to work. | Oh no! | I know. Can we do it next weekend instead?",
              question: "¿Para qué llama?",
              options: ["Para cancelar y proponer otro día", "Para invitar a alguien por primera vez", "Para quejarse del trabajo"],
              answer: 0,
              whyWrong: [
                null,
                "La cita ya existía: por eso se disculpa",
                "El trabajo es la excusa, no el tema: el tema es el sábado",
              ],
              itemIds: ["ena2m6imafraidicant", "ena2m6nextweekend"],
              tip: "Propósito = el VERBO de la llamada: cancelar, invitar, avisar, pedir. Resúmelo en un verbo y ya está.",
            },
            {
              id: "ena2m12l3e5", type: "audiomc", prompt: "Parte 4: el mensaje de voz — usa el cuaderno mientras suena",
              audio: "Hello, this is Mr Patel from the shop. It's about the table booking for Friday. I'm afraid I have to change the time: we can't do eight o'clock, but seven is fine. My number is oh two oh, seven nine four six, oh nine five eight. Could you call me back before six? Thank you.",
              question: "¿Qué cambia Mr Patel?",
              options: ["La hora de la reserva", "El día de la reserva", "El número de personas"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "El viernes sigue igual: lo que se mueve son las ocho", "Nadie menciona cuántos son"],
              itemIds: ["ena2m6thebooking", "ena2m12themessagepad"],
              tip: "Usa el cuaderno DURANTE la primera escucha, no después: seis datos no caben en la cabeza, y el examen lo sabe (por eso te da papel).",
            },
            {
              id: "ena2m12l3e6", type: "gapbank", prompt: "Parte 4, en papel: lee el recado y rellena la ficha",
              text: "«Hello, this is Mr Patel from the shop. It's about the table booking for Friday. My number is 020 7946 0958. Could you call me back before six? Thank you.» → MESSAGE PAD · Caller: Mr ___ · Phone: 020 7946 ___ · About: the ___ for Friday · Call back before: ___ o'clock",
              answers: ["Patel", "0958", "booking", "six"],
              bank: ["Patel", "0958", "booking", "six", "Wright", "eight"],
              translation: "«Hola, soy el señor Patel, de la tienda. Es por la reserva de mesa del viernes. Mi número es el 020 7946 0958. ¿Me puede devolver la llamada antes de las seis? Gracias.» → HOJA DE RECADOS · Quien llama: Sr. Patel · Teléfono: 020 7946 0958 · Asunto: la reserva del viernes · Devolver la llamada antes de: las seis",
              itemIds: ["ena2m12themessagepad", "ena2m6thebooking", "ena2m12thereferencenumber"],
              tip: "Cada encabezado admite UNA palabra o UN número. Si escribes una frase, pierdes tiempo y no ganas ni un punto.",
            },
            {
              id: "ena2m12l3e7", type: "mc", prompt: "Estrategia de la Parte 4",
              question: "Antes de que suene el monólogo, ¿qué haces con los seis encabezados?",
              options: [
                "Leerlos y decidir qué tipo de dato pide cada uno",
                "Copiarlos en el cuaderno para no perderlos",
                "Nada: se leen mientras suena, así se gana tiempo",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Copiarlos gasta el tiempo que necesitas para pensar qué cazas",
                "Leer y escuchar a la vez es justo lo que no se puede hacer en A2",
              ],
              itemIds: ["ena2m12theheading", "ena2m12readthequestionsfirst"],
              tip: "«Name» avisa de letras. «Time» avisa de cifras. Saberlo antes convierte el audio en un dictado con casillas.",
            },
            {
              id: "ena2m12l3e8", type: "bucket", prompt: "¿Qué vas a oír debajo de cada encabezado?",
              categories: ["Letras (deletreo)", "Cifras (números)"],
              items: [
                { text: "Surname", bucket: 0 },
                { text: "Phone number", bucket: 1 },
                { text: "Street name", bucket: 0 },
                { text: "Price", bucket: 1 },
                { text: "Email", bucket: 0 },
                { text: "Time", bucket: 1 },
              ],
              itemIds: ["ena2m12theheading", "enform"],
              tip: "Las dos columnas se preparan distinto: para las letras, el triángulo A-E-I y double; para las cifras, oh y el par 13/30.",
            },
            {
              id: "ena2m12l3e9", type: "listen", prompt: "Dictado de la ficha: escríbelo tal cual",
              text: "Please call Mr Patel back before six o'clock.",
              translation: "Por favor, devuélvele la llamada al señor Patel antes de las seis.",
              hints: ["call somebody back = devolver la llamada", "…before six o'clock."],
              itemIds: ["ena2m12themessagepad", "ena2m12canitakeamessage"],
              tip: "En la Parte 4 lo que se te corrige es lo que ESCRIBES. Practicar dictado no es un extra: es la tarea.",
            },
            {
              id: "ena2m12l3e10", type: "speak", prompt: "Las tres frases del teléfono, en voz alta",
              text: "Hello, Valeria speaking. Hold the line, please. Can I take a message?",
              phonetic: "je-LÓU, va-LÉ-ria SPÍI-king. jóuld de LÁIN, plíis̬. kan ái téik a MÉ-sidch?",
              translation: "Hola, soy Valeria. No cuelgue, por favor. ¿Quiere dejar un recado?",
              itemIds: ["ena2m12valeriaspeaking", "ena2m12holdtheline", "ena2m12canitakeamessage"],
              tip: "Al teléfono el inglés no dice «soy Valeria»: dice «Valeria speaking». Es fórmula fija, no traducción.",
            },
            {
              id: "ena2m12l3e11", type: "errorfix", prompt: "Corrige — el «me» que sobra",
              wrong: "Can you spell me your surname, please?",
              answers: ["Can you spell your surname for me, please?", "Can you spell your surname for me please?"],
              why: "«¿Me deletreas el apellido?» tiene un me que en inglés no cabe ahí: spell no admite dos objetos seguidos. O lo dejas fuera (Can you spell your surname?) o lo mandas al final con for me. Le pasa lo mismo a explain y a describe: explain it TO me, nunca explain me it.",
              translation: "¿Me deletreas el apellido, por favor?",
              hints: ["spell no lleva dos objetos", "…your surname ___ me, please?"],
              itemIds: ["ena2m12couldyouspellthat", "ena2m9explaintogroup"],
            },
            {
              id: "ena2m12l3e12", type: "type", prompt: "Cierre de producción",
              question: "¿Me lo deletrea, por favor?",
              answers: ["Could you spell that, please?", "Could you spell that please?", "Could you spell that, please"],
              hints: ["Petición cortés: Could you…", "Could you spell…"],
              itemIds: ["ena2m12couldyouspellthat", "enhowdoyouspellit"],
              tip: "Esta frase es tuya también en el oral: si el examinador dice un nombre y no lo pillas, pedirlo deletreado NO resta.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-3",
            book: "Hold the line, please.",
            real: "Bear with me a sec.",
            meaning: "Un momentito, por favor — «no cuelgue» en versión humana",
            when: "Al teléfono en una oficina, en el banco, en una tienda. Lo vas a OÍR mucho más de lo que lo vas a decir. En la Parte 3 del Listening te sitúa de golpe: si alguien dice esto, estás en una llamada.",
            register: "neutral",
            note: "bear with me = «ten paciencia conmigo»; a sec es second recortado, como el «un segui» español.",
            sound: "béa uid mi a SEK",
            level: "a2",
            itemId: "ena2m12holdtheline",
          },
        },
      ],
      resources: [
        {
          label: "BBC Learning English — Telephone English",
          url: "https://www.bbc.co.uk/learningenglish/english/features/english-at-work",
          note: "Escucha un episodio corto de llamadas y monta TÚ la hoja de recados: quién llama, teléfono, asunto, qué hay que hacer. Es la Parte 4 con otro nombre.",
        },
      ],
    },
    {
      // L4 READING 1-2. La T1 va a por gramática y colocación en textos que
      // caben en una etiqueta; la T2 es el texto roto con SEIS supresiones y
      // SIETE opciones — la de sobra está hecha para parecer la buena. Aquí el
      // gapbank hace de T2 con conectores, que es lo que de verdad cose un
      // texto de A2.
      id: "ena2m12l4",
      phaseId: "ena2m12",
      title: "Reading: tasks 1 and 2",
      subtitle: "Seis textos con un hueco, y el texto roto con una frase de sobra",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El kit del papel",
          itemIds: ["ena2m12thenotice", "ena2m12theleaflet", "ena2m12theextrasentence", "ena2m12theparagraph"],
        },
        {
          kind: "note",
          note: {
            title: "Tarea 1: seis huecos sueltos · Tarea 2: seis frases y una de más",
            body: "<b>Tarea 1</b> (6 ítems): seis textos brevísimos —una lista de la compra, una etiqueta, una dirección, un [[the notice|aviso]] de una puerta, un [[the leaflet|folleto]]— y cada uno con <b>un solo hueco</b> y tres opciones. No va a por el significado: va a por <b>gramática y colocación</b>. Las tres opciones suelen ser la misma palabra en tres formas, o tres palabras que se parecen. Truco: piensa qué pondrías tú <b>antes</b> de mirar las opciones; si tu respuesta está entre ellas, no le des más vueltas.<br/><br/><b>Tarea 2</b> (6 ítems): un texto al que le han quitado seis trozos y <b>siete</b> opciones para volver a colocarlos. Sí: <b>una sobra</b>, y está escrita para que parezca la buena. Lee lo de <b>antes</b> y lo de <b>después</b> de cada hueco: la pista casi nunca está en el hueco, está en el pegamento —<i>but</i>, <i>so</i>, <i>because</i>, <i>then</i>— y en de quién o de qué se venía hablando. Empieza por los huecos que tengas clarísimos y deja los dudosos para el final: cada acierto quita una opción de la mesa.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l4e1", type: "mc", prompt: "Tarea 1, tal cual: el aviso de la biblioteca",
              question: "«Please do not ___ food or drink into the library.»",
              options: ["bring", "brings", "bringing"],
              answer: 0,
              whyWrong: [
                null,
                "Tras do not el verbo va desnudo, sin -s: es la misma regla que I don't work",
                "El -ing necesita un be delante, y aquí no hay ninguno",
              ],
              itemIds: ["ena2m12thenotice", "ena2m7donotenter"],
              tip: "La Tarea 1 va a por reglas que ya tienes: auxiliar + verbo desnudo, la -s de tercera persona, is/are con there.",
            },
            {
              id: "ena2m12l4e2", type: "mc", prompt: "Tarea 1, tal cual: el cartel de la estación",
              question: "«Tickets ___ be shown at the barrier.»",
              options: ["must", "have", "should"],
              answer: 0,
              whyWrong: [
                null,
                "have necesita to detrás (have to be shown) — y no está",
                "should es correcto en inglés, pero es consejo, no norma… y además está en la columna B1: en un cartel el examen pone must",
              ],
              itemIds: ["ena2m7passengersmustshow", "ena2m12thenotice"],
              tip: "La lengua de los carteles es must y mustn't. Si el texto es una norma escrita, apuesta por must.",
            },
            {
              id: "ena2m12l4e3", type: "mc", prompt: "Tarea 1, tal cual: la etiqueta de las rebajas",
              question: "«SALE! All winter jackets ___ than last month.»",
              options: ["cheaper", "cheap", "the cheapest"],
              answer: 0,
              whyWrong: [
                null,
                "than pide comparativo: sin -er la frase se queda coja",
                "El superlativo no admite than: sería the cheapest in the shop",
              ],
              itemIds: ["ena2m4cheaperthan", "ena2m4than"],
              tip: "than es una señal luminosa: donde hay than, hay -er o more. Sin than, mira si hay the delante.",
            },
            {
              id: "ena2m12l4e4", type: "mc", prompt: "Tarea 1, tal cual: la nota de la nevera",
              question: "«There isn't ___ milk left — please buy some.»",
              options: ["much", "many", "a lot"],
              answer: 0,
              whyWrong: [
                null,
                "many va con contables en plural: many bottles, no many milk",
                "a lot necesita of delante del sustantivo, y en negativa el inglés prefiere much",
              ],
              itemIds: ["ena2m5thereisntmuchmilk", "ena2m4nomilkleft"],
              tip: "milk no se cuenta: much en negativa y pregunta, a lot of en afirmativa. Tu módulo 5, en modo examen.",
            },
            {
              id: "ena2m12l4e5", type: "mc", prompt: "Tarea 2: la trampa del nivel",
              question: "En la Tarea 2 hay seis huecos y siete opciones. ¿Qué pasa con la séptima?",
              options: [
                "Sobra, y está escrita para parecer la correcta",
                "Vale para dos huecos distintos",
                "Es un error de imprenta: se ignora",
              ],
              answer: 0,
              whyWrong: [null, "Cada hueco tiene UNA sola respuesta correcta", "Está puesta a propósito: es el distractor del ejercicio"],
              itemIds: ["ena2m12theextrasentence"],
              tip: "Que sobre una es una buena noticia: si te cuadran seis, la séptima se cae sola. Coloca primero las seguras.",
            },
            {
              id: "ena2m12l4e6", type: "gapbank", prompt: "Tarea 2, en versión corta: el pegamento del texto",
              text: "Last summer I went to Brighton with Amy. ___ we arrived, we left our bags at the hotel. It was very hot, ___ we went straight to the beach. We wanted to swim, ___ the water was really cold. ___ the end, we just walked along the beach and had an ice cream.",
              answers: ["When", "so", "but", "In"],
              bank: ["When", "so", "but", "In", "because", "After"],
              translation: "El verano pasado fui a Brighton con Amy. Cuando llegamos, dejamos las maletas en el hotel. Hacía mucho calor, así que nos fuimos derechas a la playa. Queríamos bañarnos, pero el agua estaba helada. Al final, solo paseamos por la playa y nos tomamos un helado.",
              itemIds: ["ena2m2soiwalked", "ena2m2becauseimissedthebus", "ena2m2intheend", "ena2m6whenigetthere"],
              tip: "Los conectores son lo que la Tarea 2 mide de verdad. so mira hacia delante (consecuencia), because mira hacia atrás (causa), but gira.",
            },
            {
              id: "ena2m12l4e7", type: "order", prompt: "Tarea 2, tal cual: recoloca el texto de la clase de inglés",
              sentences: [
                "Last September I started an English course near my flat.",
                "At first I didn't say anything in class, because I was very shy.",
                "Then the teacher asked us to work in pairs, and everything changed.",
                "After a few weeks I made two good friends there.",
                "In the end, the course was the best thing I did last year.",
              ],
              translation: "En septiembre empecé un curso de inglés cerca de casa. Al principio no decía nada en clase, porque era muy tímida. Luego la profesora nos puso a trabajar por parejas y todo cambió. A las pocas semanas hice allí dos buenas amigas. Al final, el curso fue lo mejor que hice el año pasado.",
              hints: ["Empieza por cuándo empezó todo", "At first… → Then… → After a few weeks… → In the end…"],
              itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2intheend", "ena2m10acourse"],
              tip: "El orden no lo marca la lógica: lo marcan las palabras de tiempo. Subráyalas y el texto se coloca solo.",
            },
            {
              id: "ena2m12l4e8", type: "mc", prompt: "Tarea 2: elige la frase que falta",
              question: "«We arrived at the station at ten to eight. ___ We waited on platform four for twenty minutes.»",
              options: [
                "The train was late again.",
                "The hotel was very comfortable.",
                "I bought a jacket in the sale.",
              ],
              answer: 0,
              whyWrong: [
                null,
                "El hotel no pinta nada entre la estación y el andén",
                "Las rebajas no explican por qué se espera veinte minutos",
              ],
              itemIds: ["ena2m12theextrasentence", "ena2m6platformfour"],
              tip: "Lee lo de ANTES y lo de DESPUÉS. La frase buena explica el salto entre las dos: llegan pronto pero esperan mucho.",
            },
            {
              id: "ena2m12l4e9", type: "cloze", prompt: "Completa la regla de la Tarea 2",
              text: "In Task 2 there are seven options, so there is always one ___ sentence.",
              answers: ["extra"],
              translation: "En la Tarea 2 hay siete opciones, así que siempre sobra una frase.",
              hints: ["La que sobra", "one ex… sentence"],
              itemIds: ["ena2m12theextrasentence"],
            },
            {
              id: "ena2m12l4e10", type: "errorfix", prompt: "Corrige — el aviso habla en tercera persona",
              wrong: "The notice on the door say the shop is closed.",
              answers: ["The notice on the door says the shop is closed.", "The notice on the door says the shop is closed"],
              why: "El sujeto es the notice, no the door: singular, y el verbo lleva -s. Cuando entre el sujeto y el verbo se cuela un complemento largo, el español se despista y el inglés no perdona — y la Tarea 1 vive de esto.",
              translation: "El aviso de la puerta dice que la tienda está cerrada.",
              hints: ["¿Quién dice? No la puerta", "The notice… say___"],
              itemIds: ["ena2m12thenotice"],
            },
            {
              id: "ena2m12l4e11", type: "fastmatch", prompt: "Carteles en ráfaga — los que caen en la Tarea 1",
              pairs: [
                { target: "No smoking", source: "prohibido fumar" },
                { target: "Out of order", source: "no funciona" },
                { target: "Staff only", source: "solo personal" },
                { target: "Do not enter", source: "prohibido el paso" },
                { target: "Push / Pull", source: "empujar / tirar" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m7nosmoking", "ena2m7outoforder", "ena2m7staffonly", "ena2m7donotenter", "ena2m7pushpull"],
              tip: "Estos cinco carteles llevan once módulos contigo. En el examen se leen sin pensar: eso es fluidez, y también puntúa.",
            },
            {
              id: "ena2m12l4e12", type: "type", prompt: "Cierre de producción",
              question: "El aviso dice que la tienda cierra a las seis.",
              answers: [
                "The notice says the shop closes at six.",
                "The notice says the shop closes at six",
                "The notice says that the shop closes at six.",
              ],
              hints: ["the notice + says…", "…the shop closes at six."],
              itemIds: ["ena2m12thenotice"],
              tip: "Dos terceras personas en la misma frase (says, closes). Si te comes una -s en el examen, te la cuentan.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-4",
            book: "The shop is closed today.",
            real: "We're shut.",
            meaning: "Está cerrado — lo que dice el tendero, no el cartel",
            when: "En la puerta de una tienda, dicho por una persona. El cartel escribe CLOSED; la persona dice we're shut. En el examen lo leerás como closed y lo oirás como shut: son la misma cosa.",
            register: "neutral",
            note: "shut es más de boca que de papel: en carteles y avisos escritos casi siempre pone closed.",
            sound: "uía SHAT",
            level: "a2",
            itemId: "ena2m12thenotice",
          },
        },
      ],
    },
    {
      // L5 READING 3-4. La T4 del A2 es la primera lectura larga de verdad del
      // curso inglés: un texto continuo con siete preguntas de opción. Aquí va
      // el `read` del módulo, con tres preguntas de inferencia, porque es lo
      // único que entrena leer sin buscar la palabra idéntica.
      id: "ena2m12l5",
      phaseId: "ena2m12",
      title: "Reading: tasks 3 and 4",
      subtitle: "Cuatro textos con distinto propósito, y la lectura larga de verdad",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "El kit de la lectura larga",
          itemIds: ["ena2m12thepurposeofthetext", "ena2m12guessfromthecontext", "ena2m12theopeninghours"],
        },
        {
          kind: "note",
          note: {
            title: "Tarea 3: para qué se escribió · Tarea 4: leer de verdad",
            body: "<b>Tarea 3</b> (7 ítems): cuatro textos cortos del <b>mismo tema</b> —una nota, un aviso, una tarjeta de cita, un correo— pero con <b>propósitos distintos</b>: uno invita, otro avisa, otro se disculpa, otro informa. Te dan siete situaciones y tienes que decir a qué texto va cada una. La pregunta de fondo es siempre la misma: <b>¿para qué se escribió esto?</b><br/><br/><b>Tarea 4</b> (7 ítems): <b>un solo texto continuo</b> —una historia, una descripción, una explicación— con siete preguntas de tres opciones. Es la novedad del nivel: por primera vez hay que leer de corrido, no buscar un dato en una tabla. Tres reglas que valen puntos: <b>1)</b> las preguntas van <b>en el orden del texto</b>, así que avanza en paralelo; <b>2)</b> la opción que repite una palabra del texto suele ser la trampa —el texto dice lo mismo con otras palabras—; <b>3)</b> cuando aparezca una palabra que no conoces, <b>no pares</b>: [[Guess the word from the context|adivínala por el contexto]], sigue leyendo y vuelve luego. En un texto de 200 palabras siempre hay tres o cuatro que no sabes, y eso es normal también para quien aprueba.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l5e1", type: "mc", prompt: "Tarea 3: ¿para qué se escribió?",
              question: "«Sorry! I came at six but you weren't in. I left the parcel with your neighbour at number 14. — Dave»",
              options: ["Explicar por qué no pudo entregar algo", "Invitar a alguien a una fiesta", "Pedir dinero por un servicio"],
              answer: 0,
              whyWrong: [null, "No hay ninguna invitación: hay un paquete", "No se menciona ningún precio"],
              itemIds: ["ena2m12thepurposeofthetext", "ena2m9alettercameforyou"],
              tip: "Resume el propósito en un verbo: explicar, invitar, avisar, pedir, disculparse. Si no te sale el verbo, no lo has entendido.",
            },
            {
              id: "ena2m12l5e2", type: "mc", prompt: "Tarea 3: el mismo tema, otro propósito",
              question: "«THE LIBRARY WILL BE CLOSED ON 3rd JUNE. Opening hours from 4th June: 9 a.m. to 5 p.m.»",
              options: ["Informar de un cambio de horario", "Disculparse con un cliente concreto", "Invitar a un acto"],
              answer: 0,
              whyWrong: [
                null,
                "Un aviso no se dirige a nadie en particular: no hay ni nombre ni firma",
                "No hay ni fecha de acto ni invitación: hay un horario",
              ],
              itemIds: ["ena2m12theopeninghours", "ena2m12thenotice"],
              tip: "Si el texto no tiene destinatario con nombre, casi nunca es disculpa ni invitación: es un aviso.",
            },
            {
              id: "ena2m12l5e3", type: "match", prompt: "Empareja cada texto con su propósito — así se resuelve la Tarea 3",
              pairs: [
                { target: "Come to my flat on Saturday at eight!", source: "invitar" },
                { target: "The lift is out of order until Friday.", source: "avisar" },
                { target: "I'm very sorry about yesterday.", source: "disculparse" },
                { target: "The course costs ninety pounds a term.", source: "informar" },
              ],
              itemIds: ["ena2m12thepurposeofthetext", "ena2m7outoforder", "ena2m5imsosorryaboutthat"],
              tip: "Cuatro textos, cuatro propósitos: es literalmente el diseño de la Tarea 3. Nunca hay dos textos con el mismo.",
            },
            {
              id: "ena2m12l5e4", type: "mc", prompt: "La palabra que no sabes",
              question: "Lees «the corridor was full of plastic chairs» y no sabes qué es corridor. ¿Qué haces?",
              options: [
                "Sigo leyendo: por las sillas y por la frase siguiente ya sé que es un sitio de paso",
                "Paro y busco la palabra en la lista de vocabulario",
                "Dejo la pregunta en blanco y paso al texto siguiente",
              ],
              answer: 0,
              whyWrong: [
                null,
                "En el examen no hay lista, y parar rompe el hilo de la lectura",
                "Casi nunca la pregunta depende de ESA palabra: dejarla en blanco regala un punto",
              ],
              itemIds: ["ena2m12guessfromthecontext"],
              tip: "En un texto de 200 palabras hay tres o cuatro que no sabes. Quien aprueba también las tiene: la diferencia es que no para.",
            },
            {
              id: "ena2m12l5e5", type: "read", prompt: "Tarea 4 del Reading: lee el texto entero y responde. Toca las palabras subrayadas si necesitas la glosa.",
              title: "The exam centre in south London",
              text: "Three weeks before her real exam, Valeria spent a Saturday at a practice day in a small centre in south London. She arrived forty minutes early, because Amy told her a story about a bus that never came.<br/><br/>The building was not what she expected. There were no big halls: just three rooms above a language school, a [[corridor|pasillo]] with twelve plastic chairs and a coffee machine that was out of order. Twenty-two candidates waited there and nobody talked.<br/><br/>At nine o'clock a woman with a [[folder|carpeta]] opened the door. 'Passports and ID cards, please. Phones in the box.' Valeria put her phone in the box and felt better immediately: for one hour and forty minutes, nothing outside that room existed.<br/><br/>The Listening was first. The recording started with a voice saying 'You will hear each part twice', and Valeria almost laughed: she knew that sentence better than her own address. The Reading and the Writing came together, without a break. She finished the Reading with twenty-five minutes left, which was more time than she needed for two texts of fifty words.<br/><br/>In the afternoon they practised the Spoken exam too, in a smaller room with a red light on the [[recorder|grabadora]]. Nine minutes. The examiner was friendly, but he never said if an answer was good or bad. 'In June nobody in this room gives you a mark,' he explained. 'Another examiner listens to the recording afterwards.'<br/><br/>She came out at half past four. Outside, a man from her group asked her how it went. 'I don't know,' she said. 'But on the fourteenth, nothing is going to surprise me.'",
              source: "relato del curso",
              questions: [
                {
                  id: "ena2m12l5e5q1",
                  q: "Why did Valeria arrive forty minutes early?",
                  options: [
                    "Because of a story Amy told her about a bus",
                    "Because the exam started at eight o'clock",
                    "Because she wanted to buy a coffee first",
                  ],
                  answer: 0,
                  why: "«because Amy told her a story about a bus that never came». La máquina de café aparece, pero rota y después.",
                },
                {
                  id: "ena2m12l5e5q2",
                  q: "How many people were waiting in the corridor?",
                  options: ["Twenty-two", "Twelve", "Three"],
                  answer: 0,
                  why: "Doce son las sillas y tres las salas. El texto pone los tres números seguidos justo para eso.",
                },
                {
                  id: "ena2m12l5e5q3",
                  q: "Why did Valeria feel better after putting her phone in the box?",
                  options: [
                    "Because from that moment nothing outside the room could reach her",
                    "Because her phone was broken and she was worried about it",
                    "Because she did not want the other candidates to call her",
                  ],
                  answer: 0,
                  inference: true,
                  why: "El texto no dice «se relajó»: lo enseña con «nothing outside that room existed». Hay que unir el gesto con la frase.",
                },
                {
                  id: "ena2m12l5e5q6",
                  q: "How much time did Valeria have left when she finished the Reading?",
                  options: ["Twenty-five minutes", "Forty minutes", "Twelve minutes"],
                  answer: 0,
                  why: "«She finished the Reading with twenty-five minutes left». Los cuarenta son los que llegó antes y los doce son las sillas del pasillo: el texto pone los números lejos unos de otros a propósito.",
                },
                {
                  id: "ena2m12l5e5q4",
                  q: "What does the examiner explain about the Spoken exam?",
                  options: [
                    "That the person who marks it is not in the room",
                    "That the room was too dark for the recorder to work",
                    "That the candidate has to speak into a camera",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Lo dice sin decirlo: «nobody in this room gives you a mark» + «another examiner listens to the recording afterwards». Y eso explica por qué no comenta ninguna respuesta.",
                },
                {
                  id: "ena2m12l5e5q5",
                  q: "What does Valeria mean by 'But on the fourteenth, nothing is going to surprise me'?",
                  options: [
                    "That she still does not know her level, but the format will not catch her out",
                    "That she is sure she is going to pass with a High Pass",
                    "That she has already seen the questions of the real exam",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Acaba de decir «I don't know»: no habla de la nota, habla del formato. Es justo lo que entrena este módulo — y el día 14 es el de su examen de verdad.",
                },
              ],
              tip: "Fíjate en el orden: las preguntas van en el orden del texto, y en el examen también. Aquí son seis; el día del examen, siete sobre un texto de este tamaño. Avanza en paralelo y no vuelvas atrás.",
            },
            {
              id: "ena2m12l5e6", type: "cloze", prompt: "Completa la estrategia",
              text: "If you don't know a word, guess it from the ___ and keep reading.",
              answers: ["context"],
              translation: "Si no sabes una palabra, adivínala por el contexto y sigue leyendo.",
              hints: ["Lo que hay alrededor de la palabra", "from the con…"],
              itemIds: ["ena2m12guessfromthecontext"],
            },
            {
              id: "ena2m12l5e7", type: "bucket", prompt: "¿Pregunta de detalle o de propósito?",
              categories: ["Detalle (está escrito)", "Propósito o actitud (hay que deducir)"],
              items: [
                { text: "What time did the exam start?", bucket: 0 },
                { text: "Why did the writer send this note?", bucket: 1 },
                { text: "How much does the course cost?", bucket: 0 },
                { text: "How does Valeria feel at the end?", bucket: 1 },
                { text: "Where is the exam centre?", bucket: 0 },
                { text: "Who is this text for?", bucket: 1 },
              ],
              itemIds: ["ena2m12thepurposeofthetext"],
              tip: "Las de la izquierda se buscan; las de la derecha se piensan. Si te pones a buscar una de la derecha, pierdes dos minutos.",
            },
            {
              id: "ena2m12l5e8", type: "errorfix", prompt: "Corrige — el sujeto plural más famoso del inglés",
              wrong: "The people is waiting outside the exam room.",
              answers: ["The people are waiting outside the exam room.", "The people are waiting outside the exam room"],
              why: "people es PLURAL en inglés, siempre: people are, people want, people say. El español lo piensa en singular («la gente está») y esa concordancia se cuela en el Writing de examen, donde cada una cuenta.",
              translation: "La gente está esperando fuera del aula.",
              hints: ["people no es «la gente» singular", "The people ___ waiting…"],
              itemIds: ["ena2m5peoplearefriendly"],
            },
            {
              id: "ena2m12l5e9", type: "translate", prompt: "Traduce al español — como si se lo explicaras a alguien",
              direction: "toEs",
              source: "The notice on the door says the centre opens at nine and the exam starts at half past nine.",
              answers: [
                "El aviso de la puerta dice que el centro abre a las nueve y que el examen empieza a las nueve y media.",
                "El cartel de la puerta dice que el centro abre a las nueve y el examen empieza a las nueve y media.",
              ],
              hint: "notice = aviso, cartel",
              itemIds: ["ena2m12thenotice", "ena2m12theopeninghours"],
              tip: "Traducir al español comprueba que has ENTENDIDO, no que has adivinado. En la Tarea 4 es la diferencia entre acertar y sonar.",
            },
            {
              id: "ena2m12l5e10", type: "mc", prompt: "El orden de las preguntas",
              question: "Vas por la pregunta 5 de la Tarea 4 y la respuesta no aparece. ¿Dónde la buscas?",
              options: [
                "Entre la respuesta de la 4 y la de la 6, porque van en orden",
                "Desde el principio del texto otra vez",
                "En el último párrafo, que es donde está lo importante",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Volver al principio en cada pregunta es lo que hace que no dé tiempo",
                "Lo importante está repartido: el último párrafo suele ser la pregunta 7",
              ],
              itemIds: ["ena2m12theparagraph"],
              tip: "Preguntas en orden = lectura en una sola pasada. Es la regla que más minutos regala del Reading entero.",
            },
            {
              id: "ena2m12l5e11", type: "type", prompt: "Cierre de producción",
              question: "Adivina la palabra por el contexto.",
              answers: ["Guess the word from the context.", "Guess the word from the context"],
              hints: ["Imperativo: Guess…", "…from the context."],
              itemIds: ["ena2m12guessfromthecontext"],
              tip: "Que sea una frase tuya y no un consejo ajeno: cuando la digas en voz alta en el examen, harás caso.",
            },
          ],
        },
      ],
      resources: [
        {
          label: "British Council — A2 Reading",
          url: "https://learnenglish.britishcouncil.org/skills/reading/a2-reading",
          note: "Elige un texto largo por sesión y cronométrate: siete minutos de lectura y respuesta, ni uno más. Subraya las palabras que no sepas SIN buscarlas y mira al final cuántas te hacían falta de verdad.",
        },
      ],
    },
    {
      // L6 WRITING 1. La tarea informal: un texto que TE HACE TRES PREGUNTAS y
      // hay que contestarlas las tres. El baremo (Task Fulfilment) se pierde
      // por no contestar, casi nunca por gramática — de ahí que la lección
      // insista en contar preguntas antes que en corregir verbos.
      id: "ena2m12l6",
      phaseId: "ena2m12",
      title: "Writing 1: the informal reply",
      subtitle: "Tres preguntas, tres respuestas, 30-50 palabras",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "El kit del mensaje entre amigos",
          itemIds: [
            "ena2m12answerallthreequestions", "ena2m12thanksforyourmessage",
            "ena2m12sorryforthelatereply", "ena2m12lovevaleria",
          ],
        },
        {
          kind: "note",
          note: {
            title: "La Tarea 1: responder, informalmente, a tres cosas",
            body: "Te dan un texto corto —un mensaje, un correo, una postal, una felicitación— de alguien cercano, y ese texto contiene <b>tres preguntas, sugerencias o peticiones</b>. Tu trabajo: <b>contestar las tres</b> en 30-50 palabras. Vale 12 marcas y se puntúa por cuatro criterios: <b>cumplimiento de la tarea</b>, gramática, léxico y <b>organización</b> (que se entienda por dónde va, y que la puntuación exista).<br/><br/>Lo primero, antes de escribir una palabra: <b>numera las tres preguntas</b> en el papel del enunciado. Contestar dos de tres no es sacar dos tercios: es dejar un tercio de la nota principal sin recoger.<br/><br/>Y el rango de palabras. <b>30-50 es un objetivo, no una trampa</b>: por debajo de 30 no hay material suficiente para demostrar nada, y por encima de 50 no te penalizan la palabra 51 — lo que pasa es peor, que cada frase de más es una frase más donde equivocarse, y son minutos robados al Reading. Apunta a <b>38-45</b>: caben las tres respuestas, un saludo y una despedida, y sobra tiempo para releer.",
            table: [
              ["Pieza", "Palabras aproximadas"],
              ["Saludo (Hi Emma,)", "2"],
              ["Gancho (Thanks for your message!)", "5"],
              ["Las tres respuestas", "28-34"],
              ["Cierre (Love, Valeria)", "2"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l6e1", type: "mc", prompt: "Lee el enunciado y cuenta",
              question: "«Hi! How are you? I heard you're taking the A2 exam — when is it? Are you nervous? And can I come and stay that weekend? — Emma» ¿Cuántas cosas tienes que contestar?",
              options: ["Tres: cuándo, cómo estás de nervios y si puede venir", "Dos: cuándo es y si puede venir", "Cuatro, contando el How are you?"],
              answer: 0,
              whyWrong: [
                null,
                "Los nervios también son una pregunta directa: Are you nervous?",
                "How are you? es la fórmula de saludo, no uno de los tres puntos de la tarea",
              ],
              itemIds: ["ena2m12answerallthreequestions"],
              tip: "Numera las tres en el enunciado antes de escribir. Es lo único que hace el examen que no falla nunca: siempre son tres.",
            },
            {
              id: "ena2m12l6e2", type: "order", prompt: "Ordena la respuesta modelo — así se organiza sola",
              sentences: [
                "Hi Emma, thanks for your message!",
                "The exam is on 14th June, in the morning.",
                "I'm a bit nervous, but I'm ready.",
                "And yes, of course you can stay that weekend!",
                "Love, Valeria",
              ],
              translation: "Hola, Emma: ¡gracias por tu mensaje! El examen es el 14 de junio por la mañana. Estoy un poco nerviosa, pero preparada. Y sí, claro que puedes quedarte ese fin de semana. Un beso, Valeria",
              hints: ["Saludo → punto 1 → punto 2 → punto 3 → despedida", "Los puntos se contestan EN EL ORDEN en que te los preguntan"],
              itemIds: ["ena2m12thanksforyourmessage", "ena2m12lovevaleria"],
              tip: "Contestar en el orden del enunciado organiza el texto sin esfuerzo — y la organización es uno de los cuatro criterios.",
            },
            {
              id: "ena2m12l6e3", type: "cloze", prompt: "Completa el arranque informal",
              text: "Hi Emma, ___ for your message!",
              answers: ["thanks", "thank you"],
              translation: "Hola, Emma: ¡gracias por tu mensaje!",
              hints: ["El gancho de todas las respuestas informales", "Th…"],
              itemIds: ["ena2m12thanksforyourmessage"],
            },
            {
              id: "ena2m12l6e4", type: "bucket", prompt: "Clasifica: ¿esto va en la Tarea 1 o en la Tarea 2?",
              categories: ["Tarea 1 (informal)", "Tarea 2 (neutro o formal)"],
              items: [
                { text: "Hi Emma,", bucket: 0 },
                { text: "Dear Sir or Madam,", bucket: 1 },
                { text: "Love, Valeria", bucket: 0 },
                { text: "Yours sincerely,", bucket: 1 },
                { text: "See you soon!", bucket: 0 },
                { text: "I am writing to ask about the course.", bucket: 1 },
                { text: "Thanks for your message!", bucket: 0 },
                { text: "I would be grateful for any information.", bucket: 1 },
              ],
              itemIds: ["ena2m12lovevaleria", "ena2m12dearsirormadam", "ena2m12yourssincerely", "ena2m12iamwritingto"],
              tip: "Las dos tareas se distinguen en la primera línea y en la última. Si el saludo y la despedida son los correctos, el registro ya casi está.",
            },
            {
              id: "ena2m12l6e5", type: "mc", prompt: "El rango de palabras",
              question: "Has escrito 62 palabras y contestas las tres preguntas. ¿Qué haces?",
              options: [
                "Recortar hasta unas 45: cada frase de más es una frase más donde fallar",
                "Dejarlo: escribir más siempre demuestra más nivel",
                "Borrar una de las tres respuestas para bajar de 50",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Demuestra más superficie de error, y el tiempo sale del Reading",
                "Jamás: quitar un punto de contenido es lo único que sí te baja la nota de verdad",
              ],
              itemIds: ["encountyourwords"],
              tip: "El rango es un objetivo, no una trampa. Se recorta de las frases de relleno, nunca de los tres puntos.",
            },
            {
              id: "ena2m12l6e6", type: "errorfix", prompt: "Corrige — la negación española que se cuela",
              wrong: "I no can come on Saturday.",
              answers: ["I can't come on Saturday.", "I cannot come on Saturday.", "I can't come on Saturday"],
              why: "En español la negación va suelta y delante («no puedo»); en inglés se mete DENTRO del auxiliar: can + not = can't. Es un error que casi nadie comete escribiendo despacio y que reaparece en cuanto hay prisa — o sea, en el examen.",
              translation: "No puedo ir el sábado.",
              hints: ["La negación vive dentro del verbo", "I ___ come on Saturday."],
              itemIds: ["ena2m7imafraidyoucant"],
            },
            {
              id: "ena2m12l6e7", type: "gapbank", prompt: "Monta la plantilla del mensaje informal",
              text: "Hi Emma, ___ for your message! Sorry for the ___ reply — last week was crazy. The exam is on 14th June and yes, of course you can stay! ___ me know what time your train arrives. ___ , Valeria",
              answers: ["thanks", "late", "Let", "Love"],
              bank: ["thanks", "late", "Let", "Love", "Dear", "Yours"],
              translation: "Hola, Emma: ¡gracias por tu mensaje! Perdona que conteste tan tarde: la semana pasada fue una locura. El examen es el 14 de junio y sí, ¡claro que puedes quedarte! Dime a qué hora llega tu tren. Un beso, Valeria",
              itemIds: ["ena2m12thanksforyourmessage", "ena2m12sorryforthelatereply", "ena2m12lovevaleria"],
              tip: "Apertura y cierre son puntos regalados: escríbelos ANTES de pensar el contenido y ya llevas la organización medio hecha.",
            },
            {
              id: "ena2m12l6e8", type: "transform", prompt: "Baja el registro: esto va a un amigo, no a una oficina",
              source: "I am writing to inform you that I cannot attend on Saturday.",
              instruction: "Dilo como se lo dirías a Emma",
              answers: [
                "Sorry, I can't come on Saturday!",
                "Sorry, I can't come on Saturday",
                "I'm really sorry, I can't come on Saturday!",
              ],
              translation: "¡Lo siento, no puedo ir el sábado!",
              hints: ["Fuera I am writing to y fuera attend", "Sorry, I can't…"],
              itemIds: ["ena2m12sorryforthelatereply", "ena2m6imafraidicant"],
              tip: "En la Tarea 1 el registro formal NO suma: resta. Escribirle a una amiga como a un banco es un fallo de tarea.",
            },
            {
              id: "ena2m12l6e9", type: "fastmatch", prompt: "Fórmulas informales en ráfaga",
              pairs: [
                { target: "Thanks for your message!", source: "¡Gracias por tu mensaje!" },
                { target: "Sorry for the late reply!", source: "¡Perdona que conteste tan tarde!" },
                { target: "Love, Valeria", source: "Un beso, Valeria" },
                { target: "See you soon!", source: "¡Hasta pronto!" },
                { target: "Write back soon!", source: "¡Contesta pronto!" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m12thanksforyourmessage", "ena2m12sorryforthelatereply", "ena2m12lovevaleria", "enseeyousoon", "enwriteback"],
              tip: "Cinco fórmulas que se escriben sin pensar valen ocho o diez palabras de las cincuenta. Ese es tiempo que le regalas al contenido.",
            },
            {
              id: "ena2m12l6e10", type: "write", prompt: "Tarea 1 del Writing, en condiciones de examen — 30-50 palabras",
              scenario: "Emma te escribe desde Manchester: «Hi! I heard you're taking the A2 exam — when is it? Are you nervous? And can I come and stay that weekend?». Contéstale.",
              bullets: [
                "Dile CUÁNDO es el examen (día o mes)",
                "Dile cómo estás: nerviosa, tranquila, preparada…",
                "Contesta a si puede venir ese fin de semana",
              ],
              checks: [
                { re: "june|14th|next month|on the", label: "dices cuándo es el examen" },
                { re: "nervous|ready|fine|scared|calm|ok", label: "dices cómo te sientes" },
                { re: "(could|can) you|come and stay|you can stay|why don't you", label: "contestas a si puede venir" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi Emma, thanks for your message! Yes, I'm taking the A2 exam on 14th June in London. I'm a bit nervous, but I'm ready. Could you come and stay that weekend? We can go to the park, and then we can celebrate! Love, Valeria",
              itemIds: ["ena2m12answerallthreequestions", "ena2m12thanksforyourmessage", "ena2m12lovevaleria", "ena2m6nextweekend"],
              tip: "Antes de corregir, haz tú lo que hace el examinador: busca las tres respuestas en tu texto y ponles un número. Si falta una, ese es tu punto perdido — no la gramática.",
            },
            {
              id: "ena2m12l6e11", type: "mc", prompt: "El criterio que más se pierde",
              question: "Tu texto está impecable de gramática, pero solo contestas dos de las tres preguntas. ¿Qué pasa?",
              options: [
                "Pierdes en el criterio de cumplimiento de tarea, que es el que más pesa",
                "No pasa nada si las otras dos están muy bien escritas",
                "Te bajan solo la nota de organización",
              ],
              answer: 0,
              whyWrong: [
                null,
                "La calidad de dos respuestas no cubre el hueco de la tercera",
                "La organización mide el orden y la puntuación, no el contenido que falta",
              ],
              itemIds: ["ena2m12answerallthreequestions"],
              tip: "Un texto correcto e incompleto puntúa menos que uno con dos erratas y las tres respuestas. El A2 perdona el error, no el hueco.",
            },
            {
              id: "ena2m12l6e12", type: "type", prompt: "Cierre de producción",
              question: "¡Perdona que conteste tan tarde! Gracias por tu mensaje.",
              answers: [
                "Sorry for the late reply! Thanks for your message.",
                "Sorry for the late reply! Thanks for your message",
                "Sorry for the late reply. Thanks for your message.",
              ],
              hints: ["Sorry for the… reply", "Thanks for your…"],
              itemIds: ["ena2m12sorryforthelatereply", "ena2m12thanksforyourmessage"],
              tip: "Dos frases hechas, once palabras y cero riesgo gramatical. Empezar así te deja las cuarenta restantes para lo que sí se puntúa.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-5",
            book: "Sorry for the late reply!",
            real: "Sorry, only just seen this!",
            meaning: "Perdona, lo acabo de ver — la disculpa por tardar, en versión mensajería",
            when: "En WhatsApp o en un mensaje entre amigos. En el Writing 1 del examen escribe la versión completa: es igual de informal y no se juega nada.",
            register: "amigos",
            note: "El inglés escrito rápido se come el sujeto: «Only just seen this» por «I've only just seen this».",
            sound: "SO-ri, ÓUN-li dchast SÍIN dis",
            level: "a2",
            itemId: "ena2m12sorryforthelatereply",
          },
        },
      ],
    },
    {
      // L7 WRITING 2. La tarea neutra o formal, con TRES contenidos obligados.
      // El eje del A2 aquí no son las funciones (eso era el A1) sino el
      // REGISTRO: en inglés no hay du/Sie, así que la cortesía se juega en la
      // forma de la petición — y el imperativo pelado suena a orden.
      id: "ena2m12l7",
      phaseId: "ena2m12",
      title: "Writing 2: the formal text",
      subtitle: "Tres contenidos obligados, y un registro que no es el tuyo de siempre",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "El kit de la carta que se toma en serio",
          itemIds: [
            "ena2m12dearsirormadam", "ena2m12yourssincerely", "ena2m12iamwritingto",
            "ena2m12iwouldbegrateful", "ena2m12ilookforwardtoyourreply",
          ],
        },
        {
          kind: "note",
          note: {
            title: "La Tarea 2: neutro o formal, y tres contenidos que no se negocian",
            body: "Escribes a un lector concreto —una oficina, una escuela, un casero, [[the exam centre|el centro de examen]]— y el enunciado te da <b>tres elementos de contenido</b> que tienen que aparecer. Mismo rango, 30-50 palabras; mismas 12 marcas.<br/><br/>El registro es <b>lo nuevo del nivel</b>. El inglés no tiene un «usted»: no puedes cambiar de pronombre y quedar bien. La cortesía vive en <b>la forma de la petición</b>. <i>Send me the price</i> y <i>Could you tell me the price, please?</i> dicen lo mismo y no suenan igual — la primera es una orden. Regla práctica: en la Tarea 2, <b>ningún imperativo pelado</b>, y nada de <i>I want</i>.<br/><br/>Y la pareja de saludo y despedida, que es media nota de organización: si empiezas con <b>Dear Sir or Madam</b> (no sabes el nombre), cierras con <b>Yours faithfully</b>; si empiezas con <b>Dear Mr Patel</b> (sabes el nombre), cierras con <b>Yours sincerely</b>. No se mezclan.",
            table: [
              ["Suena a orden", "Suena a persona educada"],
              ["I want information about the exam.", "I would be grateful for any information."],
              ["Send me the dates.", "Could you send me the dates, please?"],
              ["Tell me the price.", "I would like to know the price."],
              ["Answer soon.", "I look forward to your reply."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l7e1", type: "mc", prompt: "La pareja que no se mezcla",
              question: "Has empezado con «Dear Mr Patel,». ¿Cómo cierras?",
              options: ["Yours sincerely,", "Yours faithfully,", "Love,"],
              answer: 0,
              whyWrong: [
                null,
                "faithfully es para cuando NO sabes el nombre: va con Dear Sir or Madam",
                "Love es para tu hermana, no para el tendero",
              ],
              itemIds: ["ena2m12yourssincerely", "ena2m12dearsirormadam"],
              tip: "Regla de memoria: si en el saludo hay un apellido, en la despedida hay sincerely. Sin apellido, faithfully.",
            },
            {
              id: "ena2m12l7e2", type: "bucket", prompt: "Clasifica: ¿orden o petición educada?",
              categories: ["Suena a orden (no lo escribas)", "Suena a persona educada"],
              items: [
                { text: "Send me the information.", bucket: 0 },
                { text: "Could you send me the information, please?", bucket: 1 },
                { text: "I want a place in the June exam.", bucket: 0 },
                { text: "I would like a place in the June exam.", bucket: 1 },
                { text: "Tell me the price.", bucket: 0 },
                { text: "Could you tell me the price, please?", bucket: 1 },
                { text: "Answer soon.", bucket: 0 },
                { text: "I look forward to your reply.", bucket: 1 },
              ],
              itemIds: ["ena2m12iwouldbegrateful", "ena2m12ilookforwardtoyourreply", "ena2m7couldihaveastamp"],
              tip: "Fíjate en que la columna de la izquierda no tiene ni un error de gramática. El registro no es corrección: es otra cosa, y se puntúa igual.",
            },
            {
              id: "ena2m12l7e3", type: "transform", prompt: "Sube el registro sin cambiar el mensaje",
              source: "Send me the exam dates.",
              instruction: "Dilo como se lo escribirías al centro de examen",
              answers: [
                "Could you send me the exam dates, please?",
                "Could you send me the exam dates please?",
                "I would be grateful if you could send me the exam dates.",
              ],
              translation: "¿Podría enviarme las fechas de examen, por favor?",
              hints: ["Empieza por Could you…", "…, please?"],
              itemIds: ["ena2m12theexamcentre", "ena2m7couldyousound"],
              tip: "Could you + please convierte cualquier orden en una petición. Son tres palabras y cambian el criterio de registro entero.",
            },
            {
              id: "ena2m12l7e4", type: "errorfix", prompt: "Corrige — el arranque de la carta formal",
              wrong: "I write you to ask about the exam.",
              answers: ["I am writing to ask about the exam.", "I'm writing to ask about the exam."],
              why: "Dos cosas a la vez, y las dos son calco: en inglés la carta se abre con present continuous (I am writing, porque estás escribiéndola ahora mismo), y write no lleva objeto de persona directo — o es write TO you, o no va nadie, que es lo normal en una carta formal.",
              translation: "Le escribo para preguntar por el examen.",
              hints: ["El presente simple no abre cartas en inglés", "I ___ ___ to ask about the exam."],
              itemIds: ["ena2m12iamwritingto"],
            },
            {
              id: "ena2m12l7e5", type: "errorfix", prompt: "Corrige — el incontable más caro del examen",
              wrong: "I would be grateful for any informations.",
              answers: ["I would be grateful for any information.", "I would be grateful for any information"],
              why: "information no tiene plural en inglés, igual que advice, news, furniture, luggage o homework. El español los cuenta («informaciones», «consejos») y en el Writing cada plural inventado se cuenta como error de léxico.",
              translation: "Le agradecería cualquier información.",
              hints: ["¿Se puede decir «una información»?", "…for any informa___."],
              itemIds: ["ena2m12iwouldbegrateful", "ena2m5somegoodadvice"],
            },
            {
              id: "ena2m12l7e6", type: "errorfix", prompt: "Corrige — la despedida que casi todo el mundo escribe mal",
              wrong: "I look forward to hear from you.",
              answers: ["I look forward to hearing from you.", "I look forward to hearing from you"],
              why: "En look forward TO, ese to no es el del infinitivo: es una preposición, y detrás de preposición el verbo inglés va en -ing. Por eso es to hearing, igual que I'm interested in working o I'm good at cooking.",
              translation: "Quedo a la espera de su respuesta.",
              hints: ["Detrás de preposición, verbo en -ing", "…to hear___ from you."],
              itemIds: ["ena2m12ilookforwardtoyourreply", "ena2m3iminterestedin"],
            },
            {
              id: "ena2m12l7e7", type: "cloze", prompt: "Completa la despedida que toca",
              text: "Dear Mr Patel, … Yours ___ , Valeria Soto",
              answers: ["sincerely"],
              translation: "Estimado señor Patel: … Atentamente, Valeria Soto",
              hints: ["Sabes el apellido del destinatario", "Yours sin…"],
              itemIds: ["ena2m12yourssincerely"],
            },
            {
              id: "ena2m12l7e8", type: "gapbank", prompt: "Monta la plantilla de la carta formal",
              text: "___ Sir or Madam, I am ___ to ask about the A2 exam in June. Could you tell me how much it ___ ? I would be ___ for any information about the documents I need. Yours faithfully, Valeria Soto",
              answers: ["Dear", "writing", "costs", "grateful"],
              bank: ["Dear", "writing", "costs", "grateful", "Hi", "thanks"],
              translation: "Estimados señores: les escribo para preguntar por el examen de A2 de junio. ¿Podrían decirme cuánto cuesta? Les agradecería cualquier información sobre la documentación que hace falta. Atentamente, Valeria Soto",
              itemIds: ["ena2m12dearsirormadam", "ena2m12iamwritingto", "ena2m12iwouldbegrateful", "ena2m12theexamcentre"],
              tip: "Esta plantilla son 20 de tus 50 palabras y no falla nunca. Lo único que cambia de un examen a otro son los tres contenidos del medio.",
            },
            {
              id: "ena2m12l7e9", type: "write", prompt: "Tarea 2 del Writing, en condiciones de examen — 30-50 palabras",
              scenario: "Quieres presentarte al A2 Access en junio. Escribe al centro de examen. No sabes el nombre de quien lo va a leer.",
              bullets: [
                "Di a qué examen quieres presentarte y cuándo",
                "Pregunta cuánto cuesta",
                "Pregunta qué documento hay que llevar el día del examen",
              ],
              checks: [
                { re: "june|14th|a2", label: "dices a qué examen y cuándo" },
                { re: "how much|cost|price|fee", label: "preguntas el precio" },
                { re: "document|passport|id card|identity", label: "preguntas qué documento hace falta" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "polite",
              requireConnectors: { min: 1, bank: ["and", "but", "because", "so"] },
              model: "Dear Sir or Madam, I am writing to ask about the A2 exam in June. I would like to take it on 14th June. Could you tell me how much it costs and what documents I need on the day? Yours faithfully, Valeria Soto",
              itemIds: ["ena2m12dearsirormadam", "ena2m12iamwritingto", "ena2m12theexamcentre", "ena2m12iwouldbegrateful"],
              tip: "Repasa tu texto buscando SOLO dos cosas: imperativos pelados (Send…, Tell…) y la palabra want. Si no hay ninguno de los dos, el criterio de registro está salvado.",
            },
            {
              id: "ena2m12l7e10", type: "paraphrase", prompt: "Dilo de otra manera — la misma petición, con educación",
              source: "Give me some information about the exam.",
              forbid: ["give"],
              answers: [
                "Could you send me some information about the exam, please?",
                "I would be grateful for any information about the exam.",
                "I would like some information about the exam.",
              ],
              translation: "¿Me podría enviar información sobre el examen, por favor?",
              hints: ["Could you… / I would…", "…, please?"],
              itemIds: ["ena2m12iwouldbegrateful", "ena2m7idliketosendthis"],
              tip: "Saber decir lo mismo de tres maneras es exactamente lo que salva un examen: si una fórmula no te sale, sale la otra.",
            },
            {
              id: "ena2m12l7e11", type: "mc", prompt: "Lo que NO se hace en la Tarea 2",
              question: "¿Cuál de estas frases te baja la nota de registro aunque esté bien escrita?",
              options: [
                "Tell me the price of the exam.",
                "Could you tell me the price of the exam?",
                "I would like to know the price of the exam.",
              ],
              answer: 0,
              whyWrong: [null, "Could you + please: petición de manual", "I would like: neutro y perfecto para una oficina"],
              itemIds: ["ena2m12iwouldbegrateful"],
              tip: "El imperativo pelado no es incorrecto: es maleducado. Y el baremo tiene una casilla para eso.",
            },
            {
              id: "ena2m12l7e12", type: "type", prompt: "Cierre de producción",
              question: "Le escribo para preguntar por el examen. Quedo a la espera de su respuesta.",
              answers: [
                "I am writing to ask about the exam. I look forward to your reply.",
                "I'm writing to ask about the exam. I look forward to your reply.",
                "I am writing to ask about the exam. I look forward to your reply",
              ],
              hints: ["I am writing to…", "I look forward to your…"],
              itemIds: ["ena2m12iamwritingto", "ena2m12ilookforwardtoyourreply"],
              tip: "La primera frase y la última de cualquier carta formal, escritas de memoria. Doce palabras que ya no tendrás que pensar en junio.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-6",
            book: "I would be grateful for any information.",
            real: "Any info would be great, thanks!",
            meaning: "Cualquier información me vendría bien — la misma petición, en correo de trabajo del día a día",
            when: "En un correo entre compañeros o a una tienda pequeña. En el Writing 2 del examen, NUNCA: info por information y great por grateful son justo lo que el criterio de registro está mirando.",
            register: "neutral",
            note: "info es la forma corta de information y en inglés hablado se usa muchísimo; en un texto formal, jamás.",
            sound: "É-ni ÍN-fou ud bi GRÉIT, zanks",
            level: "a2",
            itemId: "ena2m12iwouldbegrateful",
          },
        },
      ],
      resources: [
        {
          label: "LanguageCert — material de preparación y past papers",
          url: "https://www.languagecert.org/en/exam-preparation",
          note: "Busca el past paper de A2 Access y copia a mano los dos enunciados del Writing. Escribe las dos tareas con reloj: 15 minutos cada una, contando palabras al final.",
        },
      ],
    },
    {
      // L8 SPOKEN. Nueve minutos, cuatro partes que pesan IGUAL. Lo que suele
      // faltar en la preparación —y por eso ocupa media lección— es la S2: en
      // una de las dos situaciones el candidato tiene que INICIAR, no
      // responder. Y la S4 estrena el minuto entero (en A1 era medio).
      //
      // AQUÍ VIVE TAMBIÉN LA CLÍNICA DE CIERRE DEL NIVEL (§4.3, fila m12), en
      // su propia sección tras los ejercicios del oral. Va en ESTA lección y no
      // en otra porque el cuarto criterio del Spoken es «Pronunciation,
      // Intonation and Fluency» y pesa igual que la gramática: la línea
      // fonética de once módulos se cobra en estos nueve minutos. La batería no
      // enseña ningún sonido nuevo — recicla por id las once clínicas de
      // m1-m11 — y añade lo único que faltaba: el RITMO de frase, que es lo que
      // explica por qué el audio del examen «va rápido» cuando en realidad va
      // desigual.
      id: "ena2m12l8",
      phaseId: "ena2m12",
      title: "Spoken: your nine minutes",
      subtitle: "Cuatro partes que pesan igual, 30 segundos de papel, un minuto de reloj — y las once clínicas de sonido en batería",
      minutes: 22,
      sections: [
        {
          kind: "phrases",
          title: "El kit del oral",
          itemIds: [
            "ena2m12thepreparationtime", "ena2m12iagreewithyou", "ena2m12itdependsonthetopic",
            "ena2m12sorryidontunderstandthequestion", "ena2m12thatsallthankyou",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Los nueve minutos, parte por parte",
            body: "<b>Parte 1</b>: te presentas. Apellido <b>deletreado</b>, país de origen y hasta cinco preguntas que —esto es nuevo del A2— vienen agrupadas <b>bajo cinco temas</b> (trabajo, casa, tiempo libre…). Contesta con una frase y un detalle, nunca con una palabra suelta.<br/><br/><b>Parte 2</b>: dos o más situaciones. En una <b>respondes</b>… y en otra <b>la empiezas tú</b>. Esto es lo que casi nadie prepara: te dan una tarjeta del tipo «estás en una tienda y quieres cambiar una chaqueta» y el examinador espera <b>a que hables</b>. Ten dos arranques listos: <i>Excuse me, could you help me?</i> y <i>Hello, I'd like to…</i>.<br/><br/><b>Parte 3</b>: dos imágenes. Preguntas y dices <b>semejanzas y diferencias</b>. Tu módulo 4 entero cabe aquí: <i>In both pictures…</i>, <i>In the first picture… in the second one…</i>, <i>The difference is that…</i>.<br/><br/><b>Parte 4</b>: te dan un tema, papel y lápiz, <b>30 segundos</b> para prepararlo y <b>un minuto</b> para hablar solo. Después, preguntas de seguimiento.<br/><br/>Dos datos que ordenan todo lo demás: las cuatro partes <b>pesan igual</b> (así que no hay ninguna que puedas regalar), y el oral <b>se graba</b>: quien te puntúa no estuvo en la sala, no vio tus gestos y no sabe que ese día estabas fatal. Habla claro y termina las frases.",
            table: [
              ["Parte", "Lo que se entrena poco y cae seguro"],
              ["1", "deletrear tu apellido sin dudar"],
              ["2", "INICIAR una situación, no solo responder"],
              ["3", "decir en qué se PARECEN, no solo en qué se diferencian"],
              ["4", "usar los 30 segundos en escribir tres palabras, no frases"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l8e1", type: "mc", prompt: "Los 30 segundos de preparación",
              question: "Te dan el tema y 30 segundos con papel. ¿Qué escribes?",
              options: [
                "Tres o cuatro palabras sueltas: el guion de por dónde vas a ir",
                "Las primeras frases completas, para no atascarme al empezar",
                "Nada: mejor pensarlo y no perder tiempo escribiendo",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Escribir frases se come los 30 segundos y luego se leen, y leer suena fatal en una grabación",
                "Sin guion, el minuto se va en el primer tema y no llegas a los otros dos",
              ],
              itemIds: ["ena2m12thepreparationtime", "enthirtyseconds"],
              tip: "Tres palabras = tres bloques de veinte segundos. Es el reparto que hace que el minuto no se acabe antes que tú.",
            },
            {
              id: "ena2m12l8e2", type: "speak", prompt: "Parte 1: tu apellido y tu país, sin dudar",
              text: "My surname is Soto: S-O-T-O. I'm from Bogotá, in Colombia.",
              phonetic: "mai SÉE-neim is̬ SÓU-tou: es-óu-tii-óu. áim from bo-go-TÁ, in ko-LAM-bia",
              translation: "Mi apellido es Soto: S-O-T-O. Soy de Bogotá, en Colombia.",
              itemIds: ["enhowdoyouspellit", "endouble"],
              tip: "Deletrea despacio y con la voz alta al final de cada letra. Es lo primero que se oye en la grabación: que suene seguro.",
            },
            {
              id: "ena2m12l8e3", type: "mc", prompt: "Parte 2: la situación que empiezas tú",
              question: "La tarjeta dice: «You are in a shop. You bought a jacket yesterday and it is too small.» El examinador te mira y no dice nada. ¿Qué haces?",
              options: [
                "Empiezo yo: «Excuse me, I bought this jacket yesterday and it's too small.»",
                "Espero a que me pregunte algo",
                "Le explico en español lo que quiero decir",
              ],
              answer: 0,
              whyWrong: [
                null,
                "En esta situación el turno es tuyo: si esperas, se pierden segundos de una parte que pesa un cuarto de la nota",
                "El examinador no puede puntuar nada dicho en español",
              ],
              itemIds: ["ena2m7imsorrytobotheryou", "ena2m4tooshoessmall"],
              tip: "Ten dos arranques memorizados: «Excuse me, could you help me?» y «Hello, I'd like to…». Con eso ya no hay silencio inicial.",
            },
            {
              id: "ena2m12l8e4", type: "build", prompt: "Parte 2: monta tu arranque",
              target: "Excuse me, could you help me, please?",
              translation: "Perdone, ¿me puede ayudar, por favor?",
              distractors: ["want", "the"],
              hints: ["Empieza pidiendo permiso para hablar", "Excuse me, could you…"],
              itemIds: ["ena2m7couldyousound", "ena2m7imsorrytobotheryou"],
              tip: "Seis palabras que sirven en una tienda, en una estación y en el examen. Que salgan solas.",
            },
            {
              id: "ena2m12l8e5", type: "match", prompt: "Parte 1: los cinco temas y sus preguntas",
              pairs: [
                { target: "What do you do?", source: "trabajo y estudios" },
                { target: "Who do you live with?", source: "casa y familia" },
                { target: "What do you do at the weekend?", source: "tiempo libre" },
                { target: "How do you come here?", source: "transporte y rutina" },
                { target: "What are you going to do this summer?", source: "planes" },
              ],
              itemIds: ["ena2m9weshareaflat", "ena2m6whatareyougoingtodo", "ena2m1lastweekend"],
              tip: "Cinco temas, cinco respuestas de dos frases preparadas de casa. La Parte 1 es la única del examen que se puede ensayar entera.",
            },
            {
              id: "ena2m12l8e6", type: "speak", prompt: "Parte 3: compara las dos imágenes en voz alta",
              text: "In both pictures I can see a family, but in the first one they're at home and in the second one they're in a park.",
              phonetic: "in bóuz PIK-chas̬ ái kan sii a FÁ-mi-li, bat in de FÉEST uan déia at JÓUM and in de SÉ-kond uan déia in a PAAK",
              translation: "En las dos fotos veo una familia, pero en la primera están en casa y en la segunda están en un parque.",
              itemIds: ["ena2m4inbothpictures", "ena2m4inthefirstpicture", "ena2m4theyreverysimilar"],
              tip: "Semejanza PRIMERO, diferencia después: In both… but… Con esa sola estructura ya cumples la tarea de la Parte 3.",
            },
            {
              id: "ena2m12l8e7", type: "errorfix", prompt: "Corrige — la bandera del hispanohablante",
              wrong: "I am agree with you about that.",
              answers: ["I agree with you about that.", "I agree with you about that"],
              why: "En español «estar de acuerdo» es estar + complemento, así que suena a be + adjetivo. En inglés agree es un VERBO normal, como work: I agree, I don't agree, Do you agree? Y ojo a la negación, que es donde más recae: I don't agree, nunca I'm not agree.",
              translation: "Estoy de acuerdo contigo en eso.",
              hints: ["agree no es un adjetivo", "I ___ with you about that."],
              itemIds: ["ena2m12iagreewithyou"],
            },
            {
              id: "ena2m12l8e8", type: "errorfix", prompt: "Corrige — la preposición que el español cambia",
              wrong: "It depends of the topic.",
              answers: ["It depends on the topic.", "It depends on the topic"],
              why: "«Depender DE» en inglés es depend ON, sin excepción. Es una de esas parejas que hay que aprender juntas, como listen TO, wait FOR o look AT: la preposición no se traduce, se memoriza pegada al verbo.",
              translation: "Depende del tema.",
              hints: ["No es of", "It depends ___ the topic."],
              itemIds: ["ena2m12itdependsonthetopic", "entopic"],
            },
            {
              id: "ena2m12l8e9", type: "mc", prompt: "El reparto del minuto",
              question: "Un minuto de monólogo y tres cosas que contar. ¿Cómo lo repartes?",
              options: [
                "Unos veinte segundos por bloque, y cierro con «That's all, thank you.»",
                "Todo lo que sepa del primer punto, y si sobra tiempo, los otros",
                "Hablo despacio para llenar el minuto con el primer punto",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Es lo que más se hace y lo que peor puntúa: la tarea pide cubrir el tema, no agotarlo",
                "Rellenar no es hablar: el criterio de fluidez mira que digas cosas, no que ocupes el tiempo",
              ],
              itemIds: ["ena2m12thatsallthankyou", "ena2m12tosumup"],
              tip: "Cerrar con una frase hecha avisa al examinador de que has terminado. Sin cierre, el final suena a que te quedaste en blanco.",
            },
            {
              id: "ena2m12l8e10", type: "monologue", prompt: "La Parte 4, con el reloj real: 30 segundos de papel y 1 minuto de reloj",
              topic: "A person who is important to you",
              slides: [
                { title: "1. Quién es y de qué la conoces", hint: "Una frase y un detalle: This is my flatmate Amy. She's a nurse and we met three years ago." },
                { title: "2. Cómo es", hint: "Módulo 3: She's quite tall, she has short dark hair, and she's very friendly." },
                { title: "3. Algo que hicisteis juntos", hint: "Módulo 1 y 2, en pasado: Last summer we went to Brighton and we had a great time." },
                { title: "4. Por qué es importante", hint: "Una razón con because: She's important to me because she helped me when I arrived in London." },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He usado los 30 segundos para escribir palabras sueltas, no frases",
                "He cubierto los cuatro bloques, ninguno se ha quedado fuera",
                "He dicho al menos tres verbos en pasado",
                "He dado una razón con because",
                "He cerrado con «That's all, thank you.» y no con un silencio",
              ],
              model: "I'm going to talk about my flatmate Amy. She's a nurse and we met three years ago, when I arrived in London. She's quite tall and she has short dark hair, and she's very friendly. Last summer we went to Brighton together. It rained all day, but we had a great time. She's important to me because she helped me a lot in my first year here, and because she never says no when I ask her for help. That's all, thank you.",
              itemIds: ["ena2m12thepreparationtime", "ena2m12thatsallthankyou", "ena2m3quitetall", "ena2m2becauseimissedthebus", "ena2m1lastweekend"],
              tip: "Grábate las dos veces y escucha la primera con la lista delante. La segunda pasada siempre sale mejor: esa es la que te llevas a junio.",
            },
            {
              id: "ena2m12l8e11", type: "paraphrase", prompt: "Cuando no te sale la palabra: dilo de otra manera",
              source: "The exam is very difficult.",
              forbid: ["difficult"],
              answers: [
                "The exam isn't easy.",
                "The exam is very hard.",
                "The exam is not easy at all.",
              ],
              translation: "El examen es muy difícil.",
              hints: ["Con el contrario y una negación", "The exam isn't…"],
              itemIds: ["ena2m3difficult", "ena2m12itdependsonthetopic"],
              tip: "En el oral no hay diccionario: hay rodeos. Quien sabe rodear una palabra no se queda callado nunca, y el silencio sí puntúa.",
            },
            {
              id: "ena2m12l8e12", type: "type", prompt: "Cierre de producción",
              question: "Perdona, no entiendo la pregunta. — Ya está, gracias.",
              answers: [
                "Sorry, I don't understand the question. That's all, thank you.",
                "Sorry, I don't understand the question. That's all, thank you",
              ],
              hints: ["Sorry, I don't understand…", "That's all, thank…"],
              itemIds: ["ena2m12sorryidontunderstandthequestion", "ena2m12thatsallthankyou", "encanyousaythatagain"],
              tip: "Pedir que te repitan la pregunta NO resta: quedarse callado, sí. Son dos frases y las dos te compran tiempo.",
            },
          ],
        },
        {
          // LA CLÍNICA INTEGRAL DEL NIVEL (PLAN-EN-A2 §4.3, fila m12): «ritmo y
          // acento de frase + batería integral de las 11 clínicas». Vive aquí,
          // en la lección del oral, y no suelta en cualquier sitio, porque el
          // CUARTO criterio del Spoken es Pronunciation, Intonation and Fluency
          // y pesa lo mismo que la gramática: la línea fonética de once módulos
          // se cobra exactamente en estos nueve minutos. Todo el material se
          // referencia por id de m1-m11 — aquí no se enseña ni un sonido nuevo.
          kind: "note",
          note: {
            title: "Clínica integral: las once clínicas del A2, de una sentada",
            body: "Once módulos, once clínicas de sonido. Hoy pasan todas seguidas, y no por nostalgia: de los cuatro criterios del oral, uno entero es <b>Pronunciation, Intonation and Fluency</b>, y los cuatro pesan igual. Traducido: <b>la pronunciación es la cuarta parte de tu nota del oral</b>, tanto como la gramática. Y en el Listening no es una cuarta parte, es casi todo — lo que no reconoces al oído no lo contestas por mucho que te lo sepas escrito.<br/><br/><b>Y lo único de hoy que no viste en su módulo: el ritmo.</b> El español reparte el tiempo por sílabas: todas duran más o menos lo mismo, y por eso un español lee una frase inglesa como quien pica piedra. El inglés reparte el tiempo por <b>golpes de voz</b>: las palabras con contenido (verbos, sustantivos, adjetivos, números) llevan golpe y suenan enteras, y todo lo que hay entre golpe y golpe —artículos, preposiciones, auxiliares, pronombres— se comprime para que quepa.<br/><br/><i>I <b>WORKED</b> on <b>SA</b>turday and I <b>MUST</b>n't for<b>GET</b> the <b>TI</b>ckets.</i><br/><br/>Ahí hay cinco golpes, y da igual cuántas palabritas haya en medio: el hueco entre golpe y golpe dura lo mismo, así que las palabritas se aplastan. <b>Por eso el audio del examen «va rapidísimo»: no va rápido, va desigual.</b> Cuando te suene desigual y no rápido, lo estás oyendo bien.<br/><br/><b>Cómo se usa esta batería:</b> no busques hacerlo bonito, busca ir a la misma velocidad que el audio. La velocidad es la que funde las sílabas — el esfuerzo, no.",
            table: [
              ["Mód.", "Lo que se entrenó", "La prueba de un segundo"],
              ["1", "la -ed y sus tres sonidos", "worked es UNA sílaba: uéekt"],
              ["2", "las vocales del pasado irregular", "bought · thought · brought riman: boot · zoot · broot"],
              ["3", "el acento de las palabras largas", "comfortable son tres sílabas: KAM-fta-bol"],
              ["4", "la -er floja, el than átono y el par 13/30", "thirteen golpea al final; thirty, al principio"],
              ["5", "la consonante que enlaza con la vocal", "a bit of → a BÍ-tov"],
              ["6", "going to y el to débil", "GA-na · going to take → GÓU-in ta téik"],
              ["7", "la t que desaparece", "mustn't → MA-sent · have to → JAF-ta"],
              ["8", "la vocal larga que no tiene r", "nurse · worse · first → nées · uées · féest"],
              ["9", "la h átona que se cae", "tell him → TE-lim · ask her → AAS-ka"],
              ["10", "el have que se encoge", "I have → áiv · he has → jis̬"],
              ["11", "'ll y won't", "it'll be → Í-tol bi · won't con «óu» larga"],
              ["12", "el ritmo: golpes de voz, no sílabas", "entre golpe y golpe cabe lo que sea, aplastado"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l8e13", type: "bucket", prompt: "Clínica 1 — la -ed: ¿añade sílaba o no?",
              categories: ["Añade sílaba (/ɪd/)", "NO añade sílaba (/t/ o /d/)"],
              items: [
                { text: "wanted", bucket: 0 },
                { text: "decided", bucket: 0 },
                { text: "started", bucket: 0 },
                { text: "worked", bucket: 1 },
                { text: "helped", bucket: 1 },
                { text: "listened", bucket: 1 },
                { text: "phoned", bucket: 1 },
                { text: "watched", bucket: 1 },
              ],
              itemIds: ["ena2m1wanted", "ena2m1decided", "ena2m1helped", "ena2m1listened", "ena2m1phoned"],
              tip: "La regla cabe en una línea: la -ed solo añade sílaba detrás de t o de d (want-ed, decid-ed, start-ed). Todo lo demás cierra en seco. Cinco de estos ocho son de una sílaba, y ahí es donde se pierde el pasado.",
            },
            {
              id: "ena2m12l8e14", type: "match", prompt: "Clínicas 2 y 3 — empareja cada palabra con lo que suena de verdad",
              pairs: [
                { target: "read (en pasado)", source: "RED — igual que el color" },
                { target: "bought · thought · brought", source: "boot · zoot · broot — las tres riman" },
                { target: "comfortable", source: "KAM-fta-bol — tres sílabas, no cuatro" },
                { target: "important", source: "im-PÓO-tant — el golpe en medio" },
                { target: "helped", source: "jelpt — una sílaba y cierre en t" },
              ],
              itemIds: ["ena2m2readred", "ena2m2boughtgroup", "ena2m3comfortable", "ena2m3important", "ena2m1helped"],
              tip: "Las dos trampas del nivel juntas: los irregulares mienten con la vista (read se lee «red») y las palabras largas mienten con el golpe. En el oral, una palabra larga con el acento mal puesto no se entiende aunque los sonidos sean correctos.",
            },
            {
              id: "ena2m12l8e15", type: "fastmatch", prompt: "Clínicas 6, 7, 9 y 10 — las formas débiles, en ráfaga",
              pairs: [
                { target: "going to", source: "GA-na" },
                { target: "have to", source: "JAF-ta" },
                { target: "mustn't", source: "MA-sent" },
                { target: "tell him", source: "TE-lim" },
                { target: "I have", source: "áiv" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m6gonnasound", "ena2m7haftahasta", "ena2m7mustntsound", "ena2m9weakhim", "ena2m10iveweak"],
              tip: "Ninguna de estas cinco se escribe así jamás — y las cinco se oyen así siempre. Ese desfase entre lo que se escribe y lo que suena es, entero, el Listening del examen.",
            },
            {
              id: "ena2m12l8e16", type: "audiomc", prompt: "Clínica 4 — el par que cuesta dinero — 2 escuchas",
              audio: "That comes to thirty pounds fifty, please.",
              question: "¿Cuánto hay que pagar?",
              options: ["30,50 £", "13,50 £", "35 £"],
              answer: 0,
              plays: 2,
              whyWrong: [
                null,
                "thirteen golpea al FINAL (zee-TÍIN) y se alarga; thirty golpea al principio (ZÉE-ti) y se acaba en una i corta",
                "Fifty es el segundo número de la frase: los peniques",
              ],
              itemIds: ["ena2m4thirteenpounds", "ena2m4thirtydegrees"],
              tip: "En la Parte 1 del Listening cada ítem trae DOS datos y uno de los dos suele ser un número. Este par es el que más caro sale de todo el inglés: pregunta siempre «one three or three zero?» si tienes ocasión.",
            },
            {
              id: "ena2m12l8e17", type: "shadow", prompt: "Ritmo — cinco golpes de voz, y lo de en medio aplastado",
              text: "I worked on Saturday, so I'm gonna have a rest.",
              phonetic: "ái UÉEKT on SÁ-ta-dei, sou áim GA-na jav a REST",
              translation: "Trabajé el sábado, así que voy a descansar.",
              reps: 2,
              itemIds: ["ena2m1iworked", "ena2m6gonnasound"],
              tip: "Golpea WORKED, SA-, GO- y REST, y deja que el resto se caiga. Si te sale a la misma velocidad que el audio, tienes el ritmo inglés — que es lo que el criterio llama fluency.",
            },
            {
              id: "ena2m12l8e18", type: "shadow", prompt: "Clínicas 4 y 11 — la -er floja, el than átono y la 'll",
              text: "It'll be cheaper than the other one.",
              phonetic: "Í-tol bi CHÍI-pa dan di A-da uán",
              translation: "Va a salir más barato que el otro.",
              reps: 2,
              itemIds: ["ena2m4schwaer", "ena2m4thanweak", "ena2m11itllbe"],
              tip: "Cuatro «a» flojas seguidas: cheap-A, dAn, di A-dA. Ninguna lleva golpe y ninguna suena a la vocal que ves escrita. Esa vocal floja es el sonido más frecuente del inglés.",
            },
            {
              id: "ena2m12l8e19", type: "speak", prompt: "Clínicas 5, 8 y 9 — tres en siete palabras",
              text: "The nurse asked her for a bottle of water.",
              phonetic: "de NÉES AAS-ka for a BO-tol ov UÓ-ta",
              translation: "La enfermera le pidió una botella de agua.",
              itemIds: ["ena2m8hurtgroup", "ena2m9weakher", "ena2m5abottleofwater", "ena2m1asked"],
              tip: "Nurse sin r y con la boca casi cerrada; «ask her» sin la hache y pegado (AAS-ka); y «bottle of» en una sola pieza (BO-tol-ov). Dilo tres veces y grábate: la tercera ya no es la misma frase.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-7",
            book: "Sorry, I don't understand the question.",
            real: "Sorry, come again?",
            meaning: "Perdona, ¿cómo dices? — pedir que repitan sin decir que no entiendes",
            when: "En cualquier conversación. En el examen puedes usar la corta una vez; si necesitas más, di la larga, que además enseña al examinador que sabes construirla.",
            register: "amigos",
            note: "come again? es «repite» en tres sílabas; la versión de examen es la completa, y no cuesta puntos usarla.",
            sound: "SO-ri, kam a-GUÉN?",
            level: "a2",
            itemId: "ena2m12sorryidontunderstandthequestion",
          },
        },
      ],
      resources: [
        {
          label: "LanguageCert — International ESOL Speaking (guía del examen)",
          url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol",
          note: "Mira un vídeo de examen oral de nivel A2 entero, con el reloj a la vista, y cronometra tú la Parte 4: verás que un minuto es mucho más de lo que parece.",
        },
      ],
    },
    {
      // L9 ESTRATEGIA Y ESPIRAL. Dos trabajos en una lección: el reloj (el
      // bloque de 1 h 20 sin pausa es donde se pierden los exámenes bien
      // preparados) y la espiral total — cada ejercicio de aquí visita un
      // módulo distinto del A2, en orden. Y el aviso de frontera vuelve, ahora
      // convertido en instrucción práctica para el día del examen.
      id: "ena2m12l9",
      phaseId: "ena2m12",
      title: "Strategy, and the whole A2 in one lesson",
      subtitle: "El reloj, la frontera otra vez, y un ejercicio por cada módulo del nivel",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Las últimas tres frases del nivel",
          itemIds: ["ena2m12tosumup", "ena2m12theexamcentre", "ena2m12thankyouforeverything"],
        },
        {
          kind: "note",
          note: {
            title: "El reloj: 1 h 20 sin pausa y sin avisos",
            body: "El Listening viene con su propio ritmo: no hay nada que repartir, la grabación manda. El problema es el segundo bloque: <b>Reading y Writing juntos, 1 h 20, sin descanso y sin que nadie te avise de nada</b>. El fallo típico no es no saber: es llegar al Writing con doce minutos.<br/><br/>Reparto que funciona, y que conviene ensayar con reloj antes de junio: <b>45 minutos de Reading</b> (unos 11 por tarea), <b>30 de Writing</b> (15 por texto) y <b>5 de repaso</b>. Y una regla que salva más puntos que cualquier truco de gramática: <b>escribe el Writing antes de terminar de rumiar el Reading</b>. Una pregunta de opción múltiple dudosa vale una marca; un texto sin escribir vale doce.<br/><br/>Si una pregunta te atasca, márcala y sigue: en el Reading todas las preguntas valen lo mismo, así que quedarse tres minutos en una es pagarla al triple.",
            table: [
              ["Bloque", "Minutos", "Qué NO hacer"],
              ["Reading, 4 tareas", "45", "quedarse clavado en una pregunta"],
              ["Writing 1 (informal)", "15", "contestar solo dos de las tres preguntas"],
              ["Writing 2 (formal)", "15", "empezar con Hi y acabar con Love"],
              ["Repaso final", "5", "escribir más texto en vez de repasar"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "La frontera, otra vez — ahora como instrucción de examen",
            body: "Se dijo en la primera lección y se repite aquí porque el día del examen es cuando importa: <b>past continuous</b> (m3), <b>should</b> (m8), <b>present perfect</b> (m10) y <b>will</b> con el <b>primer condicional</b> (m11) están en la columna B1 del syllabus. No entran.<br/><br/>Traducido a lo que se hace con las manos el 14 de junio:<br/>· Si dudas entre <i>I have finished</i> y <i>I finished</i> → escribe <b>I finished</b>.<br/>· Si dudas entre <i>You should rest</i> y <i>Why don't you rest?</i> → escribe <b>Why don't you rest?</b>.<br/>· Si dudas entre <i>I'll call you</i> y <i>I'm going to call you</i> → escribe <b>I'm going to call you</b>.<br/>· Si dudas entre <i>I was waiting</i> y <i>I waited</i> → escribe <b>I waited</b>.<br/><br/>Nada de esto significa que sobre lo que aprendiste. En el Listening y en el Reading esas formas aparecen igual —los textos los escriben ingleses, no el syllabus— y reconocerlas es lo que evita quedarse en blanco. Lo que no se hace es <b>producir</b> lo que no te van a puntuar cuando tienes al lado una forma del A2 que dice lo mismo y que sí puntúa. Y en septiembre, cuando esto ya esté aprobado, esas cuatro estructuras son la primera lección del B1: no las has aprendido de más, las has aprendido de antes.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m12l9e1", type: "mc", prompt: "El reloj del segundo bloque",
              question: "Tienes 1 h 20 para Reading y Writing. ¿Cómo lo repartes?",
              options: [
                "45 de Reading, 30 de Writing y 5 de repaso",
                "60 de Reading y 20 de Writing: el Reading tiene más preguntas",
                "40 y 40, que es lo justo",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Con 20 minutos no salen dos textos de 50 palabras: son 24 marcas jugándose a lo loco",
                "El Writing necesita menos que el Reading, pero necesita terminar: 30 es el mínimo cómodo",
              ],
              itemIds: ["encountyourwords", "ena2m12checkyouranswers"],
              tip: "Ensaya el reparto en casa con reloj DOS veces antes del examen. Es el entrenamiento que más nota mueve por minuto invertido.",
            },
            {
              id: "ena2m12l9e2", type: "cloze", prompt: "Espiral, módulo 1: el pasado regular y el it que no se cae",
              text: "___ rained all day, so we stayed at home.",
              answers: ["It"],
              translation: "Llovió todo el día, así que nos quedamos en casa.",
              hints: ["En inglés el tiempo atmosférico necesita sujeto", "___ rained…"],
              itemIds: ["ena2m1itrained", "ena2m1istayedathome"],
              tip: "«Llovió» en inglés no existe sin sujeto: It rained. El pro-drop español es el error nº 2 del nivel y se cuela justo en el Writing.",
            },
            {
              id: "ena2m12l9e3", type: "transform", prompt: "Espiral, módulo 2: ponlo en pasado",
              source: "I go to the cinema and I see Amy there.",
              instruction: "Cuéntalo como algo que pasó el sábado",
              answers: [
                "I went to the cinema and I saw Amy there.",
                "I went to the cinema and saw Amy there.",
              ],
              translation: "Fui al cine y vi allí a Amy.",
              hints: ["go → went, see → …", "I went… and I saw…"],
              itemIds: ["ena2m2iwenttothecinema", "ena2m2isawamyyesterday"],
              tip: "Los irregulares son la mitad de los verbos que vas a usar en el examen. Si dudas de uno, cambia de verbo: eso también es estrategia.",
            },
            {
              id: "ena2m12l9e4", type: "mc", prompt: "Espiral, módulo 3: dónde va el adverbio",
              question: "¿Cuál está bien?",
              options: [
                "She speaks English very well.",
                "She speaks very well English.",
                "She very well speaks English.",
              ],
              answer: 0,
              whyWrong: [
                null,
                "El inglés no separa el verbo de su objeto: English va pegado a speaks",
                "El adverbio de modo no se pone delante del verbo",
              ],
              itemIds: ["ena2m3shespeaksenglishverywell", "ena2m3well"],
              tip: "Verbo + objeto + adverbio. Esta es la trampa de colocación que más cae en la Tarea 1 del Reading.",
            },
            {
              id: "ena2m12l9e5", type: "cloze", prompt: "Espiral, módulo 4: el superlativo",
              text: "It's the ___ coffee in London, and it costs two pounds.",
              answers: ["best"],
              translation: "Es el mejor café de Londres, y cuesta dos libras.",
              hints: ["good → better → …", "the b…"],
              itemIds: ["ena2m4thebestcoffee", "ena2m4goodbetterbest"],
              tip: "good/better/best y bad/worse/worst caen en el oral cada vez que comparas dos imágenes. Que salgan sin pensar.",
            },
            {
              id: "ena2m12l9e6", type: "mc", prompt: "Espiral, módulo 5: contable o incontable",
              question: "¿Cuál está bien?",
              options: [
                "How much sugar do you take?",
                "How many sugar do you take?",
                "How much sugars do you take?",
              ],
              answer: 0,
              whyWrong: [
                null,
                "many va con plurales contables: how many spoons",
                "sugar no tiene plural cuando hablas de la sustancia",
              ],
              itemIds: ["ena2m5howmuchsugar", "ena2m5howmanypeoplearethere"],
              tip: "much + incontable, many + contable plural. Y la lista negra de siempre: information, advice, news, luggage, homework, furniture.",
            },
            {
              id: "ena2m12l9e7", type: "cloze", prompt: "Espiral, módulo 6: el futuro que sí entra",
              text: "Next month I'm ___ to take the A2 exam in London.",
              answers: ["going"],
              translation: "El mes que viene voy a hacer el examen de A2 en Londres.",
              hints: ["El futuro de intención del A2", "I'm go… to"],
              itemIds: ["ena2m6imgoingtobook", "ena2m12theexamcentre"],
              tip: "be going to es EL futuro del A2. Si en el examen te sale un will, no pasa nada: pero going to es el que te puntúan seguro.",
            },
            {
              id: "ena2m12l9e8", type: "mc", prompt: "Espiral, módulo 7: la pareja que más se confunde",
              question: "En la puerta pone: «You don't have to pay to enter.» ¿Qué significa?",
              options: [
                "Entrar es gratis: pagar no es obligatorio",
                "Está prohibido pagar",
                "Hay que pagar antes de entrar",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Lo prohibido se dice con mustn't: You mustn't pay",
                "La obligación sería You have to pay",
              ],
              itemIds: ["ena2m7youdonthavetopay", "ena2m7youmustntsmoke"],
              tip: "mustn't = prohibido · don't have to = no hace falta. Se parecen en español y no se parecen en nada en inglés.",
            },
            {
              id: "ena2m12l9e9", type: "transform", prompt: "Espiral, módulo 8: el consejo que sí es de A2",
              source: "You should go home and rest.",
              instruction: "Dilo sin should — con la fórmula del A2",
              answers: [
                "Why don't you go home and rest?",
                "Why not go home and rest?",
                "You need to go home and rest.",
              ],
              translation: "¿Por qué no te vas a casa y descansas?",
              hints: ["Empieza por una pregunta", "Why don't you…?"],
              itemIds: ["ena2m8whydontyougohome", "ena2m8youneedtoseeadoctor"],
              tip: "Este es el ejercicio de la frontera hecho hábito: la misma idea, con la herramienta que sí entra en el examen.",
            },
            {
              id: "ena2m12l9e10", type: "errorfix", prompt: "Espiral, módulo 9: el pronombre de objeto",
              wrong: "I saw she this morning at the bus stop.",
              answers: ["I saw her this morning at the bus stop.", "I saw her this morning at the bus stop"],
              why: "she es el sujeto (she works) y her el objeto (I saw her). El español los distingue igual («ella» / «la»), pero al hablar rápido se coge el primero que viene, y en el Writing se ve a la legua.",
              translation: "La vi esta mañana en la parada del autobús.",
              hints: ["Detrás del verbo va el pronombre de objeto", "I saw ___ this morning…"],
              itemIds: ["ena2m9isawherthismorning", "ena2m9objectgroup"],
            },
            {
              id: "ena2m12l9e11", type: "bucket", prompt: "Última pasada por la frontera: ¿lo escribo o lo cambio?",
              categories: ["Lo escribo (A2, puntúa)", "Lo cambio por otra cosa (B1)"],
              items: [
                { text: "I finished my homework.", bucket: 0 },
                { text: "I've already finished my homework.", bucket: 1 },
                { text: "Why don't you take a day off?", bucket: 0 },
                { text: "You should take a day off.", bucket: 1 },
                { text: "I'm going to call you tomorrow.", bucket: 0 },
                { text: "I'll call you tomorrow.", bucket: 1 },
                { text: "It rained and we stayed at home.", bucket: 0 },
                { text: "It was raining, so we stayed at home.", bucket: 1 },
              ],
              itemIds: ["ena2m10ivealreadyseenit", "ena2m8whydontyougohome", "ena2m6imgoingtobook", "ena2m3itwasrainingwhenileft"],
              tip: "Las ocho frases son correctas en inglés. La columna de la derecha no está mal: está en el nivel siguiente. Guárdala para septiembre.",
            },
            {
              id: "ena2m12l9e12", type: "gapbank", prompt: "El cierre del nivel: la nota de agradecimiento",
              text: "Dear Miss Green, thank you for ___ this year. I am ___ to take the A2 exam in June at a centre in south London. Your classes ___ me a lot, and I am not nervous any more. To sum ___ : I arrived in London with ten words and now I can tell a story. Yours sincerely, Valeria",
              answers: ["everything", "going", "helped", "up"],
              bank: ["everything", "going", "helped", "up", "nothing", "asked"],
              translation: "Estimada señorita Green: gracias por todo este año. Voy a presentarme al examen de A2 en junio, en un centro del sur de Londres. Sus clases me ayudaron mucho, y ya no estoy nerviosa. En resumen: llegué a Londres con diez palabras y ahora sé contar una historia. Atentamente, Valeria",
              itemIds: ["ena2m12thankyouforeverything", "ena2m12tosumup", "ena2m12yourssincerely", "ena2m12theexamcentre"],
              tip: "Fíjate en lo que hace esta nota: saludo formal, tres contenidos, un conector de resumen y una despedida que casa con el saludo. Es la Tarea 2 entera, escrita por gusto.",
            },
            {
              id: "ena2m12l9e13", type: "type", prompt: "Cierre del módulo y del nivel",
              question: "En resumen: ¡gracias por todo!",
              answers: [
                "To sum up: thank you for everything!",
                "To sum up, thank you for everything!",
                "To sum up: thank you for everything",
              ],
              hints: ["To sum…", "…thank you for everything!"],
              itemIds: ["ena2m12tosumup", "ena2m12thankyouforeverything", "enwelldone"],
              tip: "Doce módulos, un examen y una frase. Ahora te toca hacer la parte que este curso no puede hacer por ti: pedir fecha en el centro de examen.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m12-8",
            book: "Good luck with your exam!",
            real: "Break a leg!",
            meaning: "¡Mucha suerte! — literalmente «rómpete una pierna», que es como se desea suerte sin gafarla",
            when: "Antes de un examen, de una actuación o de una entrevista, entre gente que se conoce. En un correo formal, Good luck a secas; break a leg entre amigos y con sonrisa.",
            register: "amigos",
            note: "Viene del teatro: desear suerte directamente daba mala suerte, así que se desea lo contrario.",
            sound: "bréik a LEG",
            level: "a2",
            itemId: "engoodluck",
          },
        },
      ],
      resources: [
        {
          label: "LanguageCert — buscar centro de examen y fechas",
          url: "https://www.languagecert.org/en/find-a-centre",
          note: "La misión de este módulo: busca tu centro más cercano, mira las fechas de A2 Access y APÚNTATE. Una fecha en el calendario convierte doce módulos en un examen aprobado; sin fecha, esto se queda en una app bonita.",
        },
      ],
    },
  ],
};
