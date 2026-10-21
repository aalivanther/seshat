import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 1 — Last weekend: el pasado empieza aquí. Es el módulo
// PILOTO del nivel, así que fija el listón de los once siguientes.
//
// Gramática ancla (PLAN-EN-A2 §4.1): past simple REGULAR (-ed) · there
// was/were · los marcadores (yesterday, last…, …ago, in 2024). El irregular y
// el núcleo de did/didn't a lo ancho de todos los verbos son de `ena2m2`.
//
// DECISIÓN QUE HEREDAN LOS DEMÁS MÓDULOS — el auxiliar entra aquí, en la L8,
// pero SOLO con los verbos regulares de este módulo (y con `go` como muestra
// de que tras `did` el verbo va desnudo, irregular incluido). Sin negación ni
// pregunta, un módulo que se llama «Last weekend» no puede ni preguntar qué
// hiciste el fin de semana, y la misión TBLT del módulo se queda coja. `ena2m2`
// no lo re-enseña: lo extiende a los ~50 irregulares.
//
// LA CLÍNICA DE SONIDO (L5) es /t/ /d/ /ɪd/, la más rentable del curso: se
// entrena aquí y se cobra durante once módulos. Y NO se presenta como tres
// reglas equivalentes, porque no lo son: /ɪd/ (wanted) añade una sílaba, que es
// justo lo que el español sabe hacer, y sale casi gratis; /t/ (worked) y /d/
// (played) exigen cerrar un grupo consonántico final sin vocal detrás, cosa que
// la fonotáctica española prohíbe, y por eso se fallan mucho más.
// Toda la lección está construida sobre esa asimetría.
//
// CONTRASTE CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9): (a) el pasado
// inglés no distingue «canté» de «cantaba» — una sola forma para las dos, L1;
// (b) el auxiliar `did` se lleva la marca y el verbo se queda desnudo, que es
// el mismo motor del `do/does` de `ena1m4`, L8; (c) «he ido ayer» → *I have
// gone yesterday*, con las dos mitades (España sobreusa el present perfect,
// Latinoamérica lo infrausa), L9; (d) el `it` expletivo de *It rained* frente
// al español pro-drop, L1; (e) «tuve suerte» → *I was lucky*, no *I had luck*,
// L6; (f) «había mucha gente» → *There WERE a lot of people*, L3.
//
// RECICLADO del A1 sin redefinir ids (una palabra, una tarjeta): enyesterday,
// enlastnight, enwherewereyou, enitwasgreat, endanced, enplayed, enthereis,
// enthereare, enwork, encook, enwalk, enstudy, enstart, enfinishes, enwatchtv,
// enwatchafilm, enlistentomusic, enplayfootball, endancing, enpark, enathome,
// enhome, enfriend, enpeople, enbus, enbusstop, enmonth, enweek, enweekend,
// enatweekend, enticket, enitsraining, enwhatstheweatherlike, encanyouhelpme,
// endoyouwork, endoeshework, enyesido, enshedoesnt, enidontwork, enatthemoment,
// enrightnow, eneveryday, enbusy, engreat, enlovely, ensister, enexpensive,
// enjacket, endinner, entogether, enearly, enimlate, entomorrow (vía
// enseeyoutomorrow), ensupermarket.
//
// TODOS los ids nuevos llevan el prefijo "ena2m1": es regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*). El A1 inglés está exento a
// propósito porque sus ids ya viajaron a máquinas de alumnos.

export const vocabEnA2m1: Record<string, VocabItem> = {
  // ── ena2m1l1 — el pasado regular, en afirmativa ──
  ena2m1lastweekend: { id: "ena2m1lastweekend", target: "last weekend", source: "el fin de semana pasado", sound: "laast UÍI-kend" },
  ena2m1iworked: {
    id: "ena2m1iworked", target: "I worked on Saturday.",
    source: "Trabajé el sábado. (un sábado concreto: el pasado)",
    sound: "ái UÉEKT on SÁ-ta-dei (worked es UNA sílaba: uéekt)",
    gram: { trap: "I have worked on Saturday.", same: ["I was at work on Saturday."] },
  },
  ena2m1shewatchedafilm: { id: "ena2m1shewatchedafilm", target: "She watched a film.", source: "Vio una película.", sound: "shi UÓCHT a film" },
  ena2m1wecookedtogether: { id: "ena2m1wecookedtogether", target: "We cooked dinner together.", source: "Hicimos la cena juntas.", sound: "ui KUKT DÍ-na tu-GUÉ-da" },
  ena2m1itrained: {
    id: "ena2m1itrained", target: "It rained all day.", source: "Llovió todo el día.",
    sound: "it RÉIND ool déi",
    gram: { trap: "Rained all day.", same: ["It was a rainy day."] },
  },
  ena2m1theywalkedtothepark: { id: "ena2m1theywalkedtothepark", target: "They walked to the park.", source: "Fueron andando al parque.", sound: "déi UÓOKT tu de paak" },

  // ── ena2m1l2 — cómo se ESCRIBE la -ed ──
  ena2m1stopped: { id: "ena2m1stopped", target: "stopped (stop → stopped)", source: "paró / paré — con la -p doblada", sound: "stopt" },
  ena2m1studied: { id: "ena2m1studied", target: "studied (study → studied)", source: "estudió / estudié — la -y se vuelve -ie", sound: "STA-did" },
  ena2m1arrived: {
    id: "ena2m1arrived", target: "arrived (arrive → arrived)", source: "llegó / llegué — si ya acaba en -e, solo se añade la -d",
    sound: "a-RÁIVD",
    gram: { trap: "I arrived to London on Friday.", same: ["got to London on Friday"] },
  },
  ena2m1missedthebus: { id: "ena2m1missedthebus", target: "I missed the bus.", source: "Perdí el autobús.", sound: "ái MIST de bas" },
  ena2m1thefilmstartedat: { id: "ena2m1thefilmstartedat", target: "The film started at eight.", source: "La película empezó a las ocho.", sound: "de film STAA-tid at éit" },
  ena2m1shefinishedwork: { id: "ena2m1shefinishedwork", target: "She finished work at five.", source: "Terminó de trabajar a las cinco.", sound: "shi FÍ-nisht uéek at fáiv" },

  // ── ena2m1l3 — there was / there were ──
  ena2m1therewas: {
    id: "ena2m1therewas", target: "There was a party.", source: "Había una fiesta.",
    sound: "déa uós̬ a PAA-ti",
    gram: { trap: "There had a party." },
  },
  ena2m1therewere: {
    id: "ena2m1therewere", target: "There were a lot of people.", source: "Había mucha gente.",
    sound: "déa ua a LOT ov PÍI-pol",
    gram: { trap: "There was a lot of people.", same: ["There were lots of people."] },
  },
  ena2m1therewasnt: { id: "ena2m1therewasnt", target: "There wasn't any music.", source: "No había música.", sound: "déa UÓ-s̬ent E-ni MIÚU-s̬ik" },
  ena2m1wastherealift: { id: "ena2m1wastherealift", target: "Was there a lift?", source: "¿Había ascensor?", sound: "uos̬ déa a LIFT" },
  ena2m1concert: { id: "ena2m1concert", target: "a concert", source: "un concierto", sound: "a KON-sat" },

  // ── ena2m1l4 — los marcadores que obligan a usar el pasado ──
  ena2m1lastweek: { id: "ena2m1lastweek", target: "last week", source: "la semana pasada", sound: "laast UÍIK" },
  ena2m1lastyear: { id: "ena2m1lastyear", target: "last year", source: "el año pasado", sound: "laast YÍA" },
  ena2m1twodaysago: {
    id: "ena2m1twodaysago", target: "two days ago", source: "hace dos días",
    sound: "tuu déis̬ a-GÓU",
    gram: { trap: "before two days" },
  },
  ena2m1amonthago: { id: "ena2m1amonthago", target: "a month ago", source: "hace un mes", sound: "a manz a-GÓU" },
  ena2m1in2024: { id: "ena2m1in2024", target: "in 2024", source: "en 2024 — con los años sí se pone in", sound: "in tuénti tuénti-FÓO" },
  ena2m1thedaybeforeyesterday: { id: "ena2m1thedaybeforeyesterday", target: "the day before yesterday", source: "anteayer", sound: "de déi bi-FÓO YÉS-ta-dei" },

  // ── ena2m1l5 — la clínica: /t/ · /d/ · /ɪd/ ──
  ena2m1wanted: { id: "ena2m1wanted", target: "wanted", source: "quiso / quería — la -ed suena /ɪd/ y añade sílaba", sound: "UÓN-tid" },
  ena2m1decided: { id: "ena2m1decided", target: "decided", source: "decidió / decidí — otra -ed /ɪd/, la fácil", sound: "di-SÁI-did" },
  ena2m1asked: { id: "ena2m1asked", target: "asked", source: "preguntó / pregunté — la -ed suena /t/", sound: "aaskt (tres consonantes seguidas y ni una vocal detrás)" },
  ena2m1helped: { id: "ena2m1helped", target: "helped", source: "ayudó / ayudé — la -ed suena /t/", sound: "jelpt" },
  ena2m1listened: { id: "ena2m1listened", target: "listened", source: "escuchó / escuché — la -ed suena /d/", sound: "LÍ-send" },
  ena2m1phoned: { id: "ena2m1phoned", target: "phoned", source: "llamó / llamé (por teléfono) — la -ed suena /d/", sound: "fóund" },

  // ── ena2m1l6 — el relato del fin de semana ──
  ena2m1streetmarket: { id: "ena2m1streetmarket", target: "the street market", source: "el mercadillo", sound: "de STRIIT MAA-kit" },
  ena2m1istayedathome: {
    id: "ena2m1istayedathome", target: "I stayed at home.", source: "Me quedé en casa.",
    sound: "ái STÉID at jóum",
    gram: { trap: "I stayed in home.", same: ["I didn't go out."] },
  },
  ena2m1shevisitedafriend: { id: "ena2m1shevisitedafriend", target: "She visited a friend.", source: "Visitó a un amigo.", sound: "shi VÍ-s̬i-tid a frend" },
  ena2m1tired: { id: "ena2m1tired", target: "tired", source: "cansado / cansada", sound: "TÁI-ad" },
  ena2m1terrible: { id: "ena2m1terrible", target: "terrible", source: "horrible / malísimo", sound: "TE-ri-bol" },
  ena2m1iwaslucky: {
    id: "ena2m1iwaslucky", target: "I was lucky.", source: "Tuve suerte.",
    sound: "ái uos̬ LA-ki",
    gram: { trap: "I had luck." },
  },

  // ── ena2m1l7 — oído real: was y were átonos ──
  ena2m1howwasyourweekend: { id: "ena2m1howwasyourweekend", target: "How was your weekend?", source: "¿Qué tal el fin de semana?", sound: "jáu uos̬ yoo UÍI-kend (was átono: un «uos̬» cortito)" },
  ena2m1notmuch: { id: "ena2m1notmuch", target: "Not much.", source: "Poca cosa. (contesta a «What did you do?», no a «How was it?»)", sound: "not MACH" },
  ena2m1wasitgood: { id: "ena2m1wasitgood", target: "Was it good?", source: "¿Estuvo bien?", sound: "uos̬ it GUD" },
  ena2m1weweretired: { id: "ena2m1weweretired", target: "We were really tired.", source: "Estábamos agotadas.", sound: "ui ua RÍA-li TÁI-ad (were átono: «ua», casi no suena)" },

  // ── ena2m1l8 — did / didn't: la pregunta y la negación ──
  ena2m1whatdidyoudo: {
    id: "ena2m1whatdidyoudo", target: "What did you do last weekend?", source: "¿Qué hiciste el fin de semana pasado?",
    sound: "uót did yu DÚU laast UÍI-kend",
    gram: { trap: "What you did last weekend?", same: ["What did you do at the weekend?"] },
  },
  ena2m1didyouwatchit: {
    id: "ena2m1didyouwatchit", target: "Did you watch the match?", source: "¿Viste el partido?",
    sound: "did yu UÓCH de mach",
    gram: { trap: "Did you watched the match?" },
  },
  ena2m1ididntwork: {
    id: "ena2m1ididntwork", target: "I didn't work on Sunday.", source: "No trabajé el domingo.",
    sound: "ái DÍ-dent uéek on SAN-dei",
    gram: { trap: "I didn't worked on Sunday.", same: ["I did not work on Sunday."] },
  },
  ena2m1yesidid: { id: "ena2m1yesidid", target: "Yes, I did. / No, I didn't.", source: "Sí. / No. (respuesta corta: se repite el auxiliar)", sound: "yes ái DID / nóu ái DÍ-dent" },
  ena2m1whathappened: { id: "ena2m1whathappened", target: "What happened?", source: "¿Qué pasó?", sound: "uót JÁ-pend" },

  // ── ena2m1l9 — contarlo entero ──
  ena2m1howaboutyou: { id: "ena2m1howaboutyou", target: "How about you?", source: "¿Y tú? (para devolver la pregunta)", sound: "jáu a-BÁUT yu" },
  ena2m1allweekend: { id: "ena2m1allweekend", target: "all weekend", source: "todo el fin de semana", sound: "ool UÍI-kend" },
};

export const ena2m1: Phase = {
  id: "ena2m1",
  level: "a2",
  n: 1,
  title: "Last weekend",
  goal: "Contar lo que hiciste: el pasado regular con -ed, decir qué había con there was/were, colocar los marcadores (yesterday, last week, two days ago, in 2024) y preguntar por el fin de semana de otro.",
  color: "#0f766e",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — la puerta del A2: una letra para todo el pasado
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l1",
      phaseId: "ena2m1",
      title: "Last weekend I worked",
      subtitle: "El pasado, en una sola letra — y una forma para «canté» y «cantaba»",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Lo que hiciste el finde pasado",
          itemIds: ["ena2m1lastweekend", "ena2m1iworked", "ena2m1shewatchedafilm", "ena2m1wecookedtogether", "ena2m1itrained", "ena2m1theywalkedtothepark", "enyesterday"],
        },
        {
          kind: "note",
          note: {
            title: "Bienvenido al A2 — y no empiezas de cero",
            body: "Enhorabuena: entras en A2. Lo primero, la buena noticia: <b>el inglés que traes del A1 es el 80 % de lo que vas a usar</b>. El presente, las preguntas con do/does, there is/are, los adjetivos delante, la hora, los días — todo eso sigue en pie. Lo que cambia son tres cosas:<br/><br/>1. <b>Ya no hablas solo de hoy.</b> El A2 es el nivel del <b>pasado</b>: contar lo que pasó, no solo describir lo que hay. Por eso el nivel abre con este módulo y no con otro.<br/>2. <b>Frases más largas.</b> En A1 decías «I work in a café». Aquí vas a decir «Last Saturday I worked in the café and I watched a film in the evening». Misma gramática, más metros.<br/>3. <b>Te preguntan tu opinión.</b> No solo «¿qué hiciste?», también «¿qué tal estuvo?». Para eso están [[It was great!|¡Estuvo genial!]] y [[There were a lot of people.|Había mucha gente.]]<br/><br/>Y el A1 ya te dejó dos pistas de esto: en el módulo 11 oíste <b>was</b>, <b>were</b>, <b>danced</b> y <b>played</b> sin tener que producirlos. Hoy pasan a ser tuyos.",
            table: [
              ["A1", "A2"],
              ["«I work in a café.»", "«Last week I worked in a café.»"],
              ["Reconocer was/were al oírlos", "Producirlos tú"],
              ["Frases de 5-6 palabras", "Frases enlazadas con and / but"],
              ["¿Qué haces?", "¿Qué hiciste, y qué tal estuvo?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "-ed: la regla más barata del inglés",
            body: "Para poner un verbo en pasado, le añades <b>-ed</b>. Y ya está.<br/><br/>work → <b>worked</b> · watch → <b>watched</b> · cook → <b>cooked</b> · play → <b>played</b> · walk → <b>walked</b> · rain → <b>rained</b><br/><br/><b>Y no cambia con la persona.</b> Ni una vez. I worked, you worked, <u>she worked</u>, we worked, they worked. Aquella <b>-s</b> de tercera persona que tanto costó en el A1 (<i>she works</i>) <b>desaparece en el pasado</b>: es la única vez que el inglés te regala algo, aprovéchala.<br/><br/><b>Y ahora el contraste que te ahorra medio nivel.</b> En español tienes dos pasados y eliges entre ellos todo el rato: «ayer <i>canté</i>» y «de pequeña <i>cantaba</i>». <b>El inglés tiene UNA sola forma para las dos.</b> <i>I sang</i>, <i>I worked</i>, <i>I played</i> valen para el pretérito indefinido y para el imperfecto: la diferencia, si hace falta, la pone el contexto (<i>every summer</i>, <i>when I was a child</i>), nunca el verbo. Así que no busques la segunda forma: no existe.<br/><br/>Ojo a una cosa más, que el español provoca: en inglés el sujeto <b>nunca</b> se cae. «Llovió» es <b>It rained</b>, con su <i>it</i> delante — <i>Rained all day</i> no es inglés.",
            table: [
              ["ahora", "el finde pasado"],
              ["I work every day.", "I worked last Saturday."],
              ["She watches TV.", "She watched a film."],
              ["We cook together.", "We cooked dinner together."],
              ["They play football.", "They played football."],
              ["It rains a lot.", "It rained all day."],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "last weekend",
              pastExample: "I worked on Saturday.",
              nowLabel: "now",
              nowExample: "I work every day.",
            },
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l1e1", type: "mc", prompt: "Reconoce el pasado",
              question: "“I worked on Saturday.”",
              options: ["Trabajé el sábado", "Trabajo los sábados", "Voy a trabajar el sábado"],
              answer: 0,
              whyWrong: [null, "Eso sería «I work on Saturdays» — sin -ed no hay pasado", "El futuro llega en el módulo 6; aquí la -ed dice que ya pasó"],
              itemIds: ["ena2m1iworked"],
              tip: "La -ed es la única señal de que algo ya pasó. Si se te cae, has dicho otra cosa.",
            },
            {
              id: "ena2m1l1e2", type: "fastmatch", prompt: "Calentamiento veloz — estos verbos ya son tuyos del A1",
              pairs: [
                { target: "work", source: "trabajar" },
                { target: "cook", source: "cocinar" },
                { target: "walk", source: "andar / ir a pie" },
                { target: "watch TV", source: "ver la tele" },
                { target: "listen to music", source: "escuchar música" },
              ],
              targetSeconds: 25,
              itemIds: ["enwork", "encook", "enwalk", "enwatchtv", "enlistentomusic"],
              tip: "El A2 no se gana añadiendo palabras: se gana sacando más rápido las que ya tienes. El cronómetro aquí solo premia.",
            },
            {
              id: "ena2m1l1e3", type: "match", prompt: "Empareja el pasado con su significado",
              pairs: [
                { target: "worked", source: "trabajé / trabajaba" },
                { target: "watched", source: "vi / veía" },
                { target: "cooked", source: "cociné / cocinaba" },
                { target: "walked", source: "anduve / andaba" },
              ],
              itemIds: ["ena2m1iworked", "ena2m1shewatchedafilm", "ena2m1wecookedtogether", "ena2m1theywalkedtothepark"],
              tip: "Fíjate en las traducciones: cada -ed vale por DOS formas españolas. Ese es el regalo del inglés.",
            },
            {
              id: "ena2m1l1e4", type: "bucket", prompt: "¿Lo hace todos los días o lo hizo el finde pasado?",
              categories: ["ahora / todos los días", "el finde pasado"],
              items: [
                { text: "I work in a café", bucket: 0 },
                { text: "I worked on Saturday", bucket: 1 },
                { text: "She watches TV", bucket: 0 },
                { text: "She watched a film", bucket: 1 },
                { text: "They play football", bucket: 0 },
                { text: "We cooked dinner", bucket: 1 },
              ],
              itemIds: ["ena2m1iworked", "ena2m1shewatchedafilm", "ena2m1wecookedtogether"],
              tip: "Todo lo que decide está al final de la palabra. En inglés la gramática vive en las terminaciones, no delante.",
            },
            {
              id: "ena2m1l1e5", type: "cloze", prompt: "Completa con el pasado del verbo entre paréntesis",
              text: "Yesterday I ___ (work) in the café until six.",
              answers: ["worked"],
              translation: "Ayer trabajé en el café hasta las seis.",
              hints: ["El verbo no cambia de persona: solo se le añade algo al final", "work + …"],
              itemIds: ["ena2m1iworked", "enyesterday"],
            },
            {
              id: "ena2m1l1e6", type: "cloze", prompt: "Y el sujeto que el español se come",
              text: "___ rained all day on Sunday.",
              answers: ["It"],
              translation: "Llovió todo el domingo.",
              hints: ["En español «llovió» no lleva sujeto; en inglés SIEMPRE lo lleva", "El mismo i-t de «It's raining» del A1"],
              itemIds: ["ena2m1itrained", "enitsraining"],
              tip: "Del A1 ya traes «It's raining». Cambia el tiempo, no el it: el inglés no deja huecos donde va el sujeto.",
            },
            {
              id: "ena2m1l1e7", type: "mc", prompt: "La regla de oro del pasado inglés",
              question: "«De pequeña jugaba al fútbol» y «Ayer jugué al fútbol». ¿Cuántas formas inglesas necesitas?",
              options: ["Una: played sirve para las dos", "Dos, una para cada tiempo español", "Ninguna: en inglés se usa el presente"],
              answer: 0,
              whyWrong: [null, "Esa es la trampa: buscas un imperfecto que en inglés no existe", "El presente diría que sigues jugando hoy"],
              itemIds: ["enplayed"],
              tip: "Indefinido e imperfecto se funden en una sola forma. Lo que en español elige el verbo, en inglés lo dice el contexto: when I was a child, every summer, yesterday.",
            },
            {
              id: "ena2m1l1e8", type: "transform", prompt: "Del presente al pasado",
              source: "I watch a film every Friday.",
              instruction: "Ponla en pasado, con «last Friday»",
              answers: ["I watched a film last Friday.", "Last Friday I watched a film."],
              translation: "Vi una película el viernes pasado.",
              hints: ["Solo cambia el verbo: +ed", "watch → watch…"],
              itemIds: ["ena2m1shewatchedafilm", "enwatchafilm"],
            },
            {
              id: "ena2m1l1e9", type: "transform", prompt: "Y ahora con «she» — cuidado con la trampa",
              source: "She watches TV every evening.",
              instruction: "Ponla en pasado, con «last night»",
              answers: ["She watched TV last night.", "Last night she watched TV."],
              translation: "Anoche vio la tele.",
              hints: ["En pasado la -s de tercera persona desaparece", "watches → watch…"],
              itemIds: ["ena2m1shewatchedafilm", "enwatches", "enlastnight"],
              tip: "watches → watched, no «watchesed». En pasado se olvida la persona: la misma forma para todos.",
            },
            {
              id: "ena2m1l1e10", type: "build", prompt: "Construye la frase del sábado",
              target: "We cooked dinner together",
              translation: "Hicimos la cena juntas",
              distractors: ["cook", "cooks"],
              itemIds: ["ena2m1wecookedtogether", "endinner", "entogether"],
            },
            {
              id: "ena2m1l1e11", type: "listen", prompt: "Escucha y transcribe",
              text: "They walked to the park.",
              translation: "Fueron andando al parque.",
              hints: ["walk + la terminación del pasado", "They walk… to the park."],
              itemIds: ["ena2m1theywalkedtothepark", "enpark"],
            },
            {
              id: "ena2m1l1e12", type: "errorfix", prompt: "Corrige el calco — este lo escriben nueve de cada diez hispanohablantes",
              wrong: "I have worked last Saturday.",
              answers: ["I worked last Saturday."],
              why: "«last Saturday» es un tiempo TERMINADO, y un tiempo terminado pide pasado simple, siempre. Si tú dirías «he trabajado el sábado» (España), la traducción no es have + participio: es worked a secas. Y si dirías «trabajé el sábado» (Latinoamérica), ya lo tienes.",
              translation: "Trabajé el sábado pasado.",
              itemIds: ["ena2m1iworked"],
              tip: "Regla mecánica: si en la frase hay yesterday, last… o …ago, el present perfect queda prohibido.",
            },
            {
              id: "ena2m1l1e13", type: "speak", prompt: "Dilo en voz alta — es tu primera frase de A2",
              text: "Last weekend I worked and I watched a film.",
              phonetic: "laast UÍI-kend ái UÉEKT and ái UÓCHT a film",
              translation: "El finde pasado trabajé y vi una película.",
              itemIds: ["ena2m1lastweekend", "ena2m1iworked", "ena2m1shewatchedafilm"],
              tip: "worked y watched son de UNA sílaba: uéekt, uócht. Ni «uor-ked» ni «uat-ched» — eso lo trabajamos entero en la lección 5.",
            },
            {
              id: "ena2m1l1e14", type: "type", prompt: "Cierre de producción",
              question: "Ayer trabajé y vi una película.",
              answers: [
                "Yesterday I worked and I watched a film.",
                "Yesterday I worked and watched a film.",
                "I worked yesterday and I watched a film.",
                "Yesterday I worked and I watched a movie.",
              ],
              hints: ["Marcador + verbo con -ed + and + otro verbo con -ed", "Yesterday I work… and I watch… a film."],
              itemIds: ["enyesterday", "ena2m1iworked", "ena2m1shewatchedafilm"],
              tip: "Dos verbos en pasado en la misma frase y ni un cambio de persona. Ya estás produciendo A2.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m1-1",
            book: "It was very good.",
            real: "It was brilliant.",
            meaning: "Estuvo genial / de lujo",
            when: "Con amigos y compañeros, en cuanto valoras algo: una fiesta, una peli, un finde. En Reino Unido se oye a todas horas. En el examen escrito, la versión del libro (very good, really nice) también puntúa: brilliant no te resta, pero no lo estires a un email formal.",
            register: "amigos",
            note: "brilliant en inglés británico casi nunca es «brillante»: es «genial». Y su hermana pequeña, lovely, ya la traes del A1.",
            sound: "it uos̬ BRÍ-liant",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Past simple", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Lee la ficha entera (5 min) y haz los dos ejercicios. Fíjate solo en los verbos con -ed: los raros son del módulo siguiente." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — la ortografía de la -ed
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l2",
      phaseId: "ena2m1",
      title: "stopped, studied, arrived",
      subtitle: "Escribir la -ed sin fallar: tres retoques y se acabó",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Los verbos que retocan algo antes de la -ed",
          itemIds: ["ena2m1stopped", "ena2m1studied", "ena2m1arrived", "ena2m1missedthebus", "ena2m1thefilmstartedat", "ena2m1shefinishedwork"],
        },
        {
          kind: "note",
          note: {
            title: "Los tres retoques de la -ed (y son todos)",
            body: "La -ed se pega al verbo tal cual <b>casi siempre</b>: work → worked, watch → watched, listen → listened. Solo hay tres casos que retocan algo, y los tres tienen una lógica que se ve a simple vista:<br/><br/>1. <b>El verbo ya acaba en -e</b> → no vas a escribir dos: <i>arrive → [[arrived|llegó]]</i>, <i>dance → danced</i>, <i>decide → decided</i>.<br/>2. <b>Acaba en consonante + -y</b> → la y se vuelve <b>-ied</b>: <i>study → [[studied|estudió]]</i>, <i>carry → carried</i>. Ojo: si delante de la y hay una VOCAL, no pasa nada — <i>play → played</i>, <i>stay → stayed</i>.<br/>3. <b>Acaba en una vocal + una consonante y el golpe de voz cae al final</b> → se dobla la consonante: <i>stop → [[stopped|paró]]</i>, <i>plan → planned</i>. Es para que la vocal siga sonando corta.<br/><br/>Y una cuarta cosa que no es una regla, es un aviso: en inglés británico se dobla también la -l aunque el acento no caiga ahí — <i>travel → travelled</i>, <i>cancel → cancelled</i>. En inglés americano, con una sola l. Las dos son correctas; el curso escribe la británica.",
            table: [
              ["si el verbo acaba en…", "qué haces", "ejemplo"],
              ["-e", "solo añades -d", "arrive → arrived"],
              ["consonante + -y", "-y se vuelve -ied", "study → studied"],
              ["vocal + consonante (con el acento al final)", "doblas la consonante", "stop → stopped"],
              ["vocal + -y", "nada: +ed", "play → played"],
              ["cualquier otra cosa", "+ -ed", "watch → watched"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l2e1", type: "bucket", prompt: "¿Se le pega la -ed sin más, o hay que retocar algo?",
              categories: ["+ -ed y ya está", "hay que retocar antes"],
              items: [
                { text: "watch", bucket: 0 },
                { text: "stop", bucket: 1 },
                { text: "study", bucket: 1 },
                { text: "arrive", bucket: 1 },
                { text: "walk", bucket: 0 },
                { text: "listen", bucket: 0 },
                { text: "play", bucket: 0 },
                { text: "plan", bucket: 1 },
              ],
              itemIds: ["ena2m1stopped", "ena2m1studied", "ena2m1arrived"],
              tip: "play va en el montón fácil: delante de la y hay una vocal, así que la y se queda quieta.",
            },
            {
              id: "ena2m1l2e2", type: "mc", prompt: "La ortografía de study",
              question: "study en pasado se escribe…",
              options: ["studied", "studyed", "studed"],
              answer: 0,
              whyWrong: [null, "Consonante + y: la y se convierte en -ie antes de la d", "La y no desaparece, se transforma: stud-i-ed"],
              itemIds: ["ena2m1studied", "enstudy"],
            },
            {
              id: "ena2m1l2e3", type: "mc", prompt: "La ortografía de stop",
              question: "stop en pasado se escribe…",
              options: ["stopped", "stoped", "stopt"],
              answer: 0,
              whyWrong: [null, "Con una sola p, la o se alargaría: «stoped» se leería «stóupt»", "stopt suena bien, pero se escribe con -ed como todos los demás"],
              itemIds: ["ena2m1stopped"],
              tip: "La consonante doblada es un cartel para el ojo: «esta vocal es corta». Por eso stopped y no stoped.",
            },
            {
              id: "ena2m1l2e4", type: "cloze", prompt: "Completa con el pasado",
              text: "The film ___ (start) at eight and finished at ten.",
              answers: ["started"],
              translation: "La película empezó a las ocho y terminó a las diez.",
              hints: ["start acaba en -t: no dobla nada", "start + …"],
              itemIds: ["ena2m1thefilmstartedat", "enstart"],
            },
            {
              id: "ena2m1l2e5", type: "cloze", prompt: "Completa con el pasado",
              text: "I ___ (miss) the bus this morning.",
              answers: ["missed"],
              translation: "He perdido el autobús esta mañana.",
              hints: ["miss ya acaba en dos eses: no se dobla más", "miss + …"],
              itemIds: ["ena2m1missedthebus", "enbus"],
            },
            {
              id: "ena2m1l2e6", type: "match", prompt: "Empareja cada pasado con el retoque que lleva",
              pairs: [
                { target: "stopped", source: "paró — con la consonante doblada" },
                { target: "studied", source: "estudió — la y se volvió -ie" },
                { target: "arrived", source: "llegó — ya tenía la -e, solo se añadió la -d" },
                { target: "watched", source: "vio — la -ed entera, sin tocar nada" },
              ],
              itemIds: ["ena2m1stopped", "ena2m1studied", "ena2m1arrived", "ena2m1shewatchedafilm"],
            },
            {
              id: "ena2m1l2e7", type: "transform", prompt: "Del presente al pasado, con la -s de tercera de por medio",
              source: "She finishes work at five.",
              instruction: "Ponla en pasado, con «yesterday»",
              answers: ["She finished work at five yesterday.", "Yesterday she finished work at five."],
              translation: "Ayer terminó de trabajar a las cinco.",
              hints: ["finishes pierde la -es y gana la -ed", "finish + …"],
              itemIds: ["ena2m1shefinishedwork", "enfinishes"],
            },
            {
              id: "ena2m1l2e8", type: "gapbank", prompt: "El sábado de Valeria: rellena con el verbo que toca",
              text: "On Saturday Valeria ___ the bus. She ___ to the café in the rain. In the evening she ___ dinner for Amy.",
              answers: ["missed", "walked", "cooked"],
              bank: ["missed", "walked", "cooked", "stopped", "studied", "arrived"],
              translation: "El sábado Valeria perdió el autobús. Fue andando al café bajo la lluvia. Por la noche hizo la cena para Amy.",
              itemIds: ["ena2m1missedthebus", "ena2m1theywalkedtothepark", "ena2m1wecookedtogether"],
              tip: "Los tres huecos los decide el significado, no la gramática: todos son pasados regulares bien escritos.",
            },
            {
              id: "ena2m1l2e9", type: "listen", prompt: "Dictado — dos verbos con -ed",
              text: "I studied English and I arrived late.",
              translation: "Estudié inglés y llegué tarde.",
              hints: ["study y arrive, los dos retocados", "I stud… English and I arriv… late."],
              itemIds: ["ena2m1studied", "ena2m1arrived", "enimlate"],
            },
            {
              id: "ena2m1l2e10", type: "errorfix", prompt: "Corrige la preposición",
              wrong: "I arrived to London a year ago.",
              answers: ["I arrived in London a year ago."],
              why: "arrive no se construye como «llegar a»: con ciudades y países va con IN (arrived in London), y con sitios pequeños —una estación, el aeropuerto, el trabajo— con AT (arrived at the station). Con to, nunca.",
              translation: "Llegué a Londres hace un año.",
              itemIds: ["ena2m1arrived"],
            },
            {
              id: "ena2m1l2e11", type: "speak", prompt: "Dilo en voz alta",
              text: "I missed the bus and I walked to work.",
              phonetic: "ái MIST de bas and ái UÓOKT tu uéek",
              translation: "Perdí el autobús y fui andando al trabajo.",
              itemIds: ["ena2m1missedthebus", "ena2m1theywalkedtothepark"],
              tip: "missed suena «mist» y walked suena «uóokt»: una sílaba cada uno. La -ed no añade nada al oído aquí.",
            },
            {
              id: "ena2m1l2e12", type: "type", prompt: "Cierre de producción",
              question: "Ayer estudié inglés y llegué tarde al trabajo.",
              answers: [
                "Yesterday I studied English and I arrived late at work.",
                "Yesterday I studied English and arrived late at work.",
                "Yesterday I studied English and I arrived at work late.",
              ],
              hints: ["study → stud… · arrive → arriv…", "Yesterday I stud… English and I arriv… late at work."],
              itemIds: ["ena2m1studied", "ena2m1arrived", "enyesterday", "enatwork"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Past simple (ejercicios)", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Haz solo los huecos: cada vez que falles uno, apunta si fue por la ortografía o por olvidar la -ed. Son dos errores distintos." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — there was / there were
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l3",
      phaseId: "ena2m1",
      title: "There was a party",
      subtitle: "«Había»: el there is/are del A1, movido al pasado",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Decir qué había",
          itemIds: ["ena2m1therewas", "ena2m1therewere", "ena2m1therewasnt", "ena2m1wastherealift", "ena2m1concert", "enthereis", "enthereare"],
        },
        {
          kind: "note",
          note: {
            title: "there is / there are → there was / there were",
            body: "Esta la tienes medio hecha. En el A1 aprendiste <b>there is</b> (hay, uno) y <b>there are</b> (hay, varios). El pasado es exactamente lo mismo con el verbo cambiado:<br/><br/><b>there was</b> = había (uno) · <b>there were</b> = había (varios)<br/><br/>Y aquí está la trampa gorda del español: nuestro «había» <b>no cambia</b> aunque haya cien cosas («había mucha gente», «había tres autobuses»). El inglés SÍ cambia, y lo decide lo que viene detrás. Por eso [[There were a lot of people.|Había mucha gente.]] va en plural: <b>people es plural en inglés</b> (uno es <i>a person</i>). Nunca «there was a lot of people».<br/><br/>La otra trampa es más sencilla de matar: «había» viene de <i>haber</i>, y la mano se va sola a escribir <i>there had</i>. <b>No existe.</b> El verbo de there is / there are / there was / there were es siempre <b>be</b>.<br/><br/>Negativa y pregunta funcionan como en A1: <b>There wasn't any music.</b> · <b>Was there a lift?</b> — y la respuesta corta repite el verbo: <i>Yes, there was. / No, there wasn't.</i>",
            table: [
              ["ahora", "antes"],
              ["There is a café.", "There was a café."],
              ["There are two buses.", "There were two buses."],
              ["Is there a lift?", "Was there a lift?"],
              ["There isn't any milk.", "There wasn't any milk."],
              ["There are a lot of people.", "There were a lot of people."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l3e1", type: "mc", prompt: "«Había una fiesta en casa de Amy»",
              question: "¿Cuál es la buena?",
              options: ["There was a party at Amy's.", "There had a party at Amy's.", "It had a party at Amy's."],
              answer: 0,
              whyWrong: [null, "«Había» viene de haber, pero el inglés usa BE: there was", "It had no señala existencia; there was sí"],
              itemIds: ["ena2m1therewas"],
              tip: "Grábatelo como bloque: there was / there were. El verbo have no entra nunca aquí.",
            },
            {
              id: "ena2m1l3e2", type: "bucket", prompt: "¿was o were? Lo decide lo que viene DETRÁS",
              categories: ["There was…", "There were…"],
              items: [
                { text: "a concert in the park", bucket: 0 },
                { text: "a lot of people", bucket: 1 },
                { text: "two buses at the bus stop", bucket: 1 },
                { text: "a big cake", bucket: 0 },
                { text: "no tickets", bucket: 1 },
                { text: "a lift in the building", bucket: 0 },
              ],
              itemIds: ["ena2m1therewas", "ena2m1therewere", "ena2m1concert", "enpeople"],
              tip: "En español «había» no se mueve. En inglés mira lo que sigue: uno → was, varios → were. Y people cuenta como varios.",
            },
            {
              id: "ena2m1l3e3", type: "cloze", prompt: "Completa",
              text: "There ___ a lot of people at the concert.",
              answers: ["were"],
              translation: "Había mucha gente en el concierto.",
              hints: ["people es PLURAL en inglés", "There w…"],
              itemIds: ["ena2m1therewere", "enpeople"],
            },
            {
              id: "ena2m1l3e4", type: "transform", prompt: "Del presente al pasado",
              source: "There is a café next to the park.",
              instruction: "Ponla en pasado",
              answers: ["There was a café next to the park."],
              translation: "Había un café al lado del parque.",
              hints: ["Solo cambia el verbo", "There w… a café…"],
              itemIds: ["ena2m1therewas", "enthereis", "enpark"],
            },
            {
              id: "ena2m1l3e5", type: "errorfix", prompt: "Corrige la concordancia",
              wrong: "There was a lot of people at the party.",
              answers: ["There were a lot of people at the party."],
              why: "people es plural en inglés: uno es «a person», varios son «people». Y si el sujeto es plural, el verbo también: there WERE. Es el mismo fallo que «the informations» o «my hairs»: palabras que en español y en inglés no se cuentan igual.",
              translation: "Había mucha gente en la fiesta.",
              itemIds: ["ena2m1therewere", "enpeople"],
            },
            {
              id: "ena2m1l3e6", type: "errorfix", prompt: "Corrige el verbo",
              wrong: "There had a concert in the park on Sunday.",
              answers: ["There was a concert in the park on Sunday."],
              why: "El «había» español viene de haber y arrastra la mano hacia have. Pero la estructura inglesa es there + BE, en todos los tiempos: there is, there are, there was, there were.",
              translation: "Había un concierto en el parque el domingo.",
              itemIds: ["ena2m1therewas", "ena2m1concert"],
            },
            {
              id: "ena2m1l3e7", type: "build", prompt: "Construye la negativa",
              target: "There wasn't any music at the party",
              translation: "No había música en la fiesta",
              distractors: ["weren't", "some"],
              itemIds: ["ena2m1therewasnt", "ena2m1therewas"],
              tip: "En negativa se usa any, igual que en A1: There wasn't ANY music. some se guarda para las afirmativas.",
            },
            {
              id: "ena2m1l3e8", type: "mc", prompt: "La respuesta corta",
              question: "“Was there a lift in the building?”",
              options: ["Yes, there was.", "Yes, there is.", "Yes, it had."],
              answer: 0,
              whyWrong: [null, "La pregunta va en pasado: la respuesta también", "La respuesta corta repite el verbo de la pregunta, que era was"],
              itemIds: ["ena2m1wastherealift"],
            },
            {
              id: "ena2m1l3e9", type: "listen", prompt: "Dictado",
              text: "There were a lot of people at the concert.",
              translation: "Había mucha gente en el concierto.",
              hints: ["Empieza por There w…", "…a lot of people at the concert."],
              itemIds: ["ena2m1therewere", "ena2m1concert"],
            },
            {
              id: "ena2m1l3e10", type: "audiomc", prompt: "Escucha dos veces, como en el examen",
              audio: "There wasn't any coffee in the café, but there was tea.",
              question: "¿Qué había?",
              options: ["Té", "Café", "Ni té ni café"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "coffee suena, pero con wasn't delante: eso es lo que NO había", "El but del final trae lo que sí había"],
              itemIds: ["ena2m1therewasnt", "ena2m1therewas"],
              tip: "La palabra que suena no es la respuesta. Lo que decide es la negación que va delante — y el but que la corrige.",
            },
            {
              id: "ena2m1l3e11", type: "type", prompt: "Cierre de producción",
              question: "Había un concierto en el parque y había mucha gente.",
              answers: [
                "There was a concert in the park and there were a lot of people.",
                "There was a concert in the park and there were lots of people.",
                "There was a concert in the park, and there were a lot of people.",
              ],
              hints: ["Uno → was · varios → were", "There w… a concert… and there w… a lot of people."],
              itemIds: ["ena2m1therewas", "ena2m1therewere", "ena2m1concert", "enpark"],
              tip: "Las dos mitades de la frase con el mismo «había» español y dos verbos ingleses distintos. Esa es toda la lección.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m1-2",
            book: "There were a lot of people.",
            real: "It was packed.",
            meaning: "Estaba a tope / hasta arriba",
            when: "Hablando de un bar, un concierto, el metro o una tienda en rebajas. Es informal pero no vulgar: lo dice todo el mundo. En el Writing del examen escribe la del libro (There were a lot of people), que es la que enseña la gramática que te puntúan.",
            register: "amigos",
            note: "packed es «empaquetado»: tan lleno que no cabe nadie más. Su gemelo es «It was dead» — vacío, sin ambiente.",
            sound: "it uos̬ PAKT",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — There is / there are", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/there-is-there-are", note: "Repasa el presente (10 min) y luego di en voz alta cada ejemplo en pasado. Es la manera más rápida de instalar there was/were." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — los marcadores de pasado
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l4",
      phaseId: "ena2m1",
      title: "Yesterday, last week, two days ago",
      subtitle: "Las cuatro señales que obligan a usar el pasado",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Cuándo pasó",
          itemIds: ["ena2m1lastweek", "ena2m1lastyear", "ena2m1twodaysago", "ena2m1amonthago", "ena2m1in2024", "ena2m1thedaybeforeyesterday", "enyesterday", "enlastnight"],
        },
        {
          kind: "note",
          note: {
            title: "Las cuatro señales del pasado (y sus preposiciones)",
            body: "Un marcador de tiempo no es un adorno: es lo que <b>obliga</b> al verbo a ir en pasado. Son cuatro familias y cada una tiene su norma de preposición, que es justo donde falla el hispanohablante:<br/><br/>1. <b>yesterday</b>, <b>last night</b> → van solos. Nada de <i>in yesterday</i> ni <i>on yesterday</i>.<br/>2. <b>last + tiempo</b>: [[last week|la semana pasada]], last month, last year, last Saturday, last summer → <b>sin the y sin on</b>. «El sábado pasado» es <i>last Saturday</i>, no <i>the last Saturday</i>.<br/>3. <b>tiempo + ago</b>: [[two days ago|hace dos días]], a week ago, [[a month ago|hace un mes]], ten years ago. Fíjate en el orden: <b>ago va DETRÁS</b>, cerrando el bloque. El español pone «hace» delante y por eso sale <i>before two days</i>, que no significa nada.<br/>4. <b>in + año</b>: [[in 2024|en 2024]], in 1999. Con los años sí hay preposición, y es in.<br/><br/>Y una joya del calendario: <b>the day before yesterday</b> = anteayer. Larga, pero es la que hay.",
            table: [
              ["marcador", "ejemplo", "ojo"],
              ["yesterday / last night", "I worked yesterday.", "sin preposición"],
              ["last + tiempo", "last week · last Saturday", "sin the y sin on"],
              ["tiempo + ago", "two days ago · a month ago", "ago va DETRÁS"],
              ["in + año", "in 2024", "aquí sí hay preposición"],
              ["the day before yesterday", "anteayer", "cuatro palabras, una idea"],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "two days ago",
              pastExample: "She arrived two days ago.",
              nowLabel: "today",
              nowExample: "She is at work.",
            },
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l4e1", type: "match", prompt: "Empareja los marcadores",
              pairs: [
                { target: "last week", source: "la semana pasada" },
                { target: "two days ago", source: "hace dos días" },
                { target: "the day before yesterday", source: "anteayer" },
                { target: "in 2024", source: "en 2024" },
              ],
              itemIds: ["ena2m1lastweek", "ena2m1twodaysago", "ena2m1thedaybeforeyesterday", "ena2m1in2024"],
            },
            {
              id: "ena2m1l4e2", type: "mc", prompt: "«Hace tres semanas»",
              question: "¿Cuál es la buena?",
              options: ["three weeks ago", "before three weeks", "ago three weeks"],
              answer: 0,
              whyWrong: [null, "before es «antes de algo», no «hace»: before the party, before six", "ago cierra el bloque, nunca lo abre"],
              itemIds: ["ena2m1twodaysago", "enweek"],
              tip: "Truco de colocación: el español empieza por «hace» y el inglés TERMINA por ago. Es el mismo bloque puesto del revés.",
            },
            {
              id: "ena2m1l4e3", type: "errorfix", prompt: "Corrige el calco de «hace»",
              wrong: "I visited London before two years.",
              answers: ["I visited London two years ago."],
              why: "«Hace dos años» no es before: before significa «antes de». La palabra es ago, y va detrás del tiempo — two years ago, a month ago, ten minutes ago.",
              translation: "Visité Londres hace dos años.",
              itemIds: ["ena2m1twodaysago", "ena2m1shevisitedafriend"],
            },
            {
              id: "ena2m1l4e4", type: "cloze", prompt: "Completa el marcador",
              text: "Amy phoned me ___ night.",
              answers: ["last"],
              translation: "Amy me llamó anoche.",
              hints: ["«Anoche» es «la noche pasada»", "l… night"],
              itemIds: ["enlastnight", "ena2m1phoned"],
            },
            {
              id: "ena2m1l4e5", type: "bucket", prompt: "¿Lleva in delante o va a pelo?",
              categories: ["a pelo, sin preposición", "con in delante"],
              items: [
                { text: "yesterday", bucket: 0 },
                { text: "last week", bucket: 0 },
                { text: "two days ago", bucket: 0 },
                { text: "2024", bucket: 1 },
                { text: "last night", bucket: 0 },
                { text: "1999", bucket: 1 },
              ],
              itemIds: ["ena2m1lastweek", "ena2m1twodaysago", "ena2m1in2024", "enyesterday", "enlastnight"],
              tip: "Regla corta: los años llevan in; todo lo demás de esta lista, nada. Si dudas, quítala — sobra más veces de las que falta.",
            },
            {
              id: "ena2m1l4e6", type: "transform", prompt: "Añade el marcador y mueve el verbo",
              source: "I work in a café.",
              instruction: "Ponla en pasado con «last year»",
              answers: ["I worked in a café last year.", "Last year I worked in a café."],
              translation: "El año pasado trabajé en un café.",
              hints: ["El marcador puede ir al final o al principio", "I work… in a café last year."],
              itemIds: ["ena2m1lastyear", "ena2m1iworked"],
            },
            {
              id: "ena2m1l4e7", type: "build", prompt: "Construye la frase con ago",
              target: "She arrived in London two months ago",
              translation: "Llegó a Londres hace dos meses",
              distractors: ["before", "since"],
              itemIds: ["ena2m1arrived", "ena2m1amonthago"],
              tip: "Orden fijo: número + unidad de tiempo + ago. Y arrived IN London, no to.",
            },
            {
              id: "ena2m1l4e8", type: "order", prompt: "Ordena la vida de Valeria, de lo más antiguo a lo más reciente",
              sentences: [
                "In 2023 Valeria studied English in Bogotá.",
                "Last year she arrived in London.",
                "Two months ago she started work at Sam's café.",
                "Last weekend she walked to the park with Amy.",
                "Yesterday she cooked dinner for Ben.",
              ],
              translation: "En 2023 Valeria estudió inglés en Bogotá. El año pasado llegó a Londres. Hace dos meses empezó a trabajar en el café de Sam. El finde pasado fue andando al parque con Amy. Ayer hizo la cena para Ben.",
              itemIds: ["ena2m1in2024", "ena2m1lastyear", "ena2m1amonthago", "ena2m1lastweekend", "enyesterday"],
              tip: "Los marcadores son la escalera del relato: in + año está más lejos que last year, y last year más lejos que yesterday. Colócalos y la historia se ordena sola.",
            },
            {
              id: "ena2m1l4e9", type: "listen", prompt: "Dictado",
              text: "I visited my sister two weeks ago.",
              translation: "Visité a mi hermana hace dos semanas.",
              hints: ["visit + la -ed que añade sílaba: VÍ-s̬i-tid", "I visit… my sister two weeks a…"],
              itemIds: ["ena2m1shevisitedafriend", "ena2m1twodaysago", "ensister"],
            },
            {
              id: "ena2m1l4e10", type: "mc", prompt: "El año",
              question: "¿Cuál es la buena?",
              options: ["I arrived in 2023.", "I arrived on 2023.", "I arrived 2023."],
              answer: 0,
              whyWrong: [null, "on es para días concretos: on Monday, on the third of May", "Los años necesitan su in; sin él la frase se queda coja"],
              itemIds: ["ena2m1in2024", "ena2m1arrived"],
            },
            {
              id: "ena2m1l4e11", type: "type", prompt: "Cierre de producción",
              question: "Llegué a Londres hace un año.",
              answers: [
                "I arrived in London a year ago.",
                "I arrived in London one year ago.",
                "I arrived in London a year ago",
              ],
              hints: ["arrive + in + ciudad · «hace» va al final", "I arriv… in London a year a…"],
              itemIds: ["ena2m1arrived", "ena2m1amonthago", "ena2m1lastyear"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Past simple (marcadores de tiempo)", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Fíjate solo en los marcadores de los ejemplos y cópialos en tu libreta. Ese listado es media nota del Writing." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — LA CLÍNICA DEL MÓDULO: /t/ · /d/ · /ɪd/
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l5",
      phaseId: "ena2m1",
      title: "Clínica de sonido: -ed",
      subtitle: "Una letra, tres sonidos — y no cuestan lo mismo ni de lejos",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Los seis verbos de la clínica",
          itemIds: ["ena2m1wanted", "ena2m1decided", "ena2m1asked", "ena2m1helped", "ena2m1listened", "ena2m1phoned", "endanced", "enplayed"],
        },
        {
          kind: "note",
          note: {
            title: "La -ed se escribe igual y suena de tres maneras",
            body: "Se escribe <b>-ed</b> siempre. Suena de tres formas, y cuál sale <b>no lo eliges tú</b>: lo decide el último sonido del infinitivo. La buena noticia es que no hay que memorizar listas — la boca lo hace sola en cuanto lo has oído unas cuantas veces.<br/><br/><b>/ɪd/ — una sílaba nueva.</b> Sale detrás de <b>t</b> o <b>d</b>: [[wanted|quiso]] es UÓN-tid, [[decided|decidió]] es di-SÁI-did, visited es VÍ-s̬i-tid, started es STAA-tid. Dos sílabas pasan a tres.<br/><b>/t/ — sin sílaba nueva.</b> Detrás de sonido sordo (k, p, s, sh, ch, f): worked = uéekt, helped = jelpt, [[asked|preguntó]] = aaskt, missed = mist, watched = uócht.<br/><b>/d/ — sin sílaba nueva.</b> Detrás de todo lo demás (vocales, l, n, r, v, m, g): played = pléid, [[listened|escuchó]] = LÍ-send, arrived = a-RÁIVD, [[phoned|llamó]] = fóund, rained = réind.",
            table: [
              ["si el infinitivo acaba en…", "la -ed suena", "ejemplos"],
              ["t o d", "/ɪd/ — sílaba nueva", "wanted · decided · visited · started"],
              ["sonido sordo: k p s sh ch f", "/t/ — pegada, sin sílaba", "worked · helped · asked · missed · watched"],
              ["todo lo demás", "/d/ — pegada, sin sílaba", "played · listened · arrived · phoned · rained"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y ahora lo importante: estas tres NO cuestan lo mismo",
            body: "Aquí es donde casi todos los cursos te mienten poniéndote las tres en fila como si fueran hermanas. No lo son.<br/><br/><b>La /ɪd/ te sale casi gratis.</b> Añade una sílaba, y <i>añadir sílabas</i> es exactamente lo que el español sabe hacer: <i>UÓN-tid</i> se te va a dar bien desde el primer día. Es la que menos entrenamiento necesita.<br/><br/><b>Las otras dos son las caras.</b> ¿Por qué? Porque te obligan a <b>cerrar la palabra con dos o tres consonantes seguidas y sin ninguna vocal detrás</b>: <i>work<u>t</u></i>, <i>help<u>t</u></i>, <i>ask<u>t</u></i>, <i>arriv<u>d</u></i>. El español <b>no hace eso jamás</b>: nuestras palabras acaban en vocal o en una sola consonante amable (-n, -s, -r, -l). Cuando la boca se encuentra con /kt/ o /skt/, hace lo único que sabe: <b>mete una vocal de apoyo</b> y sale «uor-KED», «as-KED». Ahí se ha perdido la /t/ final, y con ella el pasado.<br/><br/>No es una manía tuya: le pasa a casi todo el que llega desde el español, y el motivo es la boca, no el oído. La /ɪd/ se acierta desde el primer día porque añade una sílaba; la /t/ y la /d/ se caen una y otra vez porque piden un final que en español no existe. Así que reparte el esfuerzo en consecuencia: <b>casi todo el tiempo a /t/ y /d/; a /ɪd/, un repaso y a otra cosa</b>.<br/><br/><b>Cómo se entrena, en dos gestos:</b><br/>1. <b>No añadas una -e.</b> «worked» tiene UNA sílaba. Di <i>work</i> entero y cierra con la punta de la lengua: <i>uéekt</i>.<br/>2. <b>Empújala hacia la palabra siguiente.</b> En <i>I worked all day</i> la t no se queda sola: se pega a <i>all</i> y suena <i>uéek-tool</i>. Ese enlace es lo que hace que suene inglés — y de paso te la salva.<br/><br/>Y el porqué de tanta insistencia: <b>esa consonante ES la gramática</b>. Si te la comes, el examinador no ha oído un pasado, ha oído un presente mal dicho. Vas a usar esta clínica durante los once módulos que quedan.",
            table: [
              ["sonido", "coste para ti", "por qué", "cuánto entrenar"],
              ["/ɪd/ (wanted)", "barato", "añade sílaba, que es lo que el español hace de serie", "un repaso y a otra cosa"],
              ["/t/ (worked)", "caro", "cierre de 2-3 consonantes sin vocal detrás: prohibido en español", "todos los días"],
              ["/d/ (played)", "caro", "lo mismo, con la garganta vibrando", "todos los días"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l5e1", type: "bucket", prompt: "¿La -ed añade una sílaba o no?",
              categories: ["+1 sílaba: /ɪd/", "misma sílaba: /t/ o /d/"],
              items: [
                { text: "wanted", bucket: 0 },
                { text: "worked", bucket: 1 },
                { text: "decided", bucket: 0 },
                { text: "played", bucket: 1 },
                { text: "visited", bucket: 0 },
                { text: "listened", bucket: 1 },
                { text: "started", bucket: 0 },
                { text: "helped", bucket: 1 },
              ],
              itemIds: ["ena2m1wanted", "ena2m1decided", "ena2m1helped", "ena2m1listened"],
              tip: "Mira el infinitivo: want y decide acaban en t/d, así que piden sílaba. Los demás no.",
            },
            {
              id: "ena2m1l5e2", type: "bucket", prompt: "Las dos caras: ¿la -ed suena /t/ o /d/?",
              categories: ["suena /t/ (sordo delante)", "suena /d/ (sonoro delante)"],
              items: [
                { text: "worked", bucket: 0 },
                { text: "played", bucket: 1 },
                { text: "helped", bucket: 0 },
                { text: "listened", bucket: 1 },
                { text: "missed", bucket: 0 },
                { text: "phoned", bucket: 1 },
                { text: "watched", bucket: 0 },
                { text: "arrived", bucket: 1 },
              ],
              itemIds: ["ena2m1helped", "ena2m1listened", "ena2m1phoned", "ena2m1missedthebus"],
              tip: "Prueba casera: pon la mano en la garganta y di el infinitivo. Si vibra al final (play, listen, phone, arrive) → /d/. Si no vibra (work, help, miss, watch) → /t/.",
            },
            {
              id: "ena2m1l5e3", type: "mc", prompt: "Cuenta sílabas — la fácil",
              question: "«wanted» tiene…",
              options: ["Dos sílabas: UÓN-tid", "Una sílaba: uónt", "Tres sílabas: ua-ÓN-ted"],
              answer: 0,
              whyWrong: [null, "Detrás de t la -ed SÍ suena aparte: la sílaba existe", "Ni la primera se parte en dos ni la -ed suena «ed»: es «id»"],
              itemIds: ["ena2m1wanted"],
              tip: "Esta es la barata: el español añade sílabas con los ojos cerrados. Un repaso y ya es tuya.",
            },
            {
              id: "ena2m1l5e4", type: "mc", prompt: "Cuenta sílabas — la cara",
              question: "«worked» tiene…",
              options: ["Una sílaba: uéekt", "Dos sílabas: UÉE-ked", "Dos sílabas: uor-KÉD"],
              answer: 0,
              whyWrong: [null, "Ahí has metido una vocal de apoyo que el inglés no tiene", "Ese es exactamente el reflejo español: partir el grupo /kt/ con una e"],
              itemIds: ["ena2m1iworked"],
              tip: "Cierra la palabra con la lengua, sin abrir la boca detrás. La t no necesita vocal para existir.",
            },
            {
              id: "ena2m1l5e5", type: "audiomc", prompt: "¿Presente o pasado? La diferencia está en una consonante — 2 escuchas",
              audio: "She asked Sam for the key.",
              question: "¿Qué oíste?",
              options: ["asked — ya pasó", "ask — presente"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Al final sonó una t pequeñita pegada: as-kt. Eso es el pasado"],
              itemIds: ["ena2m1asked"],
              tip: "En el Listening del examen, media respuesta depende de oír una consonante final. Entrena el oído aquí y cobras once módulos.",
            },
            {
              id: "ena2m1l5e6", type: "hearreal", prompt: "¿Libro o calle? Lo que se cae de verdad al hablar rápido",
              book: "I asked Sam.",
              real: "I ast Sam.",
              translation: "Se lo pregunté a Sam.",
              itemIds: ["ena2m1asked"],
              tip: "Ojo al detalle: en el habla rápida lo que desaparece es la K de asked (/ɑːst/), NO la -ed. La marca de pasado no se cae nunca — es la k la que sobra.",
            },
            {
              id: "ena2m1l5e7", type: "shadow", prompt: "Sombrea tres /t/ seguidas — primero lento, luego a velocidad normal",
              text: "I worked, I cooked and I watched a film.",
              phonetic: "ái UÉEKT, ái KUKT and ái UÓCHT a film",
              translation: "Trabajé, cociné y vi una película.",
              reps: 2,
              itemIds: ["ena2m1iworked", "ena2m1wecookedtogether", "ena2m1shewatchedafilm"],
              tip: "Tres cierres de /t/ en una frase. Si te sale sin meter ninguna «e», la clínica ya está haciendo efecto.",
            },
            {
              id: "ena2m1l5e8", type: "speak", prompt: "Ahora las dos caras juntas: /ɪd/ y /d/",
              text: "She wanted to help and she phoned me.",
              phonetic: "shi UÓN-tid tu jelp and shi FÓUND mi",
              translation: "Quería ayudar y me llamó.",
              itemIds: ["ena2m1wanted", "ena2m1phoned", "ena2m1helped"],
              tip: "wanted te sale sola (sílaba nueva). phoned es la que hay que vigilar: fóund, con la d cerrando y sin vocal detrás.",
            },
            {
              id: "ena2m1l5e9", type: "listen", prompt: "Dictado — dos -ed sonoras",
              text: "We listened to music and we danced.",
              translation: "Escuchamos música y bailamos.",
              hints: ["listen + -ed y dance + -ed", "We listen… to music and we danc…"],
              itemIds: ["ena2m1listened", "endanced", "enlistentomusic"],
              tip: "Fíjate en el contraste dentro de la misma frase: listened acaba en /d/ y danced en /t/. Mismo escrito, dos sonidos.",
            },
            {
              id: "ena2m1l5e10", type: "fastmatch", prompt: "Ráfaga de pasados — sin pensar en la regla, solo el significado",
              pairs: [
                { target: "worked", source: "trabajé" },
                { target: "played", source: "jugué" },
                { target: "watched", source: "vi" },
                { target: "cooked", source: "cociné" },
                { target: "danced", source: "bailé" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m1iworked", "enplayed", "endanced"],
              tip: "La velocidad es el objetivo: si tienes que pararte a aplicar la regla, todavía no es tuyo. El cronómetro solo suma.",
            },
            {
              id: "ena2m1l5e11", type: "mc", prompt: "Por qué esta lección vale más que ninguna",
              question: "Si te comes la -ed al hablar, ¿qué pasa?",
              options: [
                "Que has dicho un presente: la gramática vivía en esa consonante",
                "Nada, se entiende igual por el contexto",
                "Que suenas más natural, como los nativos",
              ],
              answer: 0,
              whyWrong: [null, "A veces se entiende, pero en el examen no se puntúa la buena voluntad del oyente", "Los nativos no se la comen: la pegan a la palabra siguiente, que es distinto"],
              itemIds: ["ena2m1asked", "ena2m1helped"],
              tip: "Este es el motivo de que la clínica vaya en el módulo 1 y no en el 7: se entrena desde el día uno y se cobra en los once que quedan.",
            },
            {
              id: "ena2m1l5e12", type: "type", prompt: "Cierre de producción",
              question: "Ayer ayudé a Amy y llamé a mi hermana.",
              answers: [
                "Yesterday I helped Amy and I phoned my sister.",
                "Yesterday I helped Amy and phoned my sister.",
                "Yesterday I helped Amy and I called my sister.",
              ],
              hints: ["help → /t/ · phone → /d/", "Yesterday I help… Amy and I phon… my sister."],
              itemIds: ["ena2m1helped", "ena2m1phoned", "ensister", "enyesterday"],
              tip: "Escríbela y después dila en voz alta cerrando las dos consonantes finales. Escribir la -ed es fácil; decirla es la clínica.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m1-3",
            book: "It rained a lot.",
            real: "It chucked it down.",
            meaning: "Cayó una buena / diluvió",
            when: "Entre amigos, quejándose del tiempo británico, que es deporte nacional. En el examen, escribe It rained a lot o It rained heavily: chucked it down es de bar, no de Writing.",
            register: "amigos",
            note: "Otra ración de /t/ final: chucked = CHAKT. Y fíjate en el it repetido — el inglés no deja huecos donde va un sujeto o un objeto.",
            sound: "it CHAKT it dáun",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — Pronunciation: -ed endings", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca la ficha de las terminaciones -ed y repite con el vídeo. Cinco minutos al día durante una semana: es la mejor inversión del nivel." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — el relato del fin de semana
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l6",
      phaseId: "ena2m1",
      title: "Valeria's weekend",
      subtitle: "Una historia entera en pasado — y escribir la tuya",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas del relato",
          itemIds: ["ena2m1streetmarket", "ena2m1istayedathome", "ena2m1shevisitedafriend", "ena2m1tired", "ena2m1terrible", "ena2m1iwaslucky"],
        },
        {
          kind: "note",
          note: {
            title: "El fin de semana de Valeria",
            body: "<i>Lee la historia en voz alta. Casi todo el vocabulario es tuyo — lo nuevo va glosado.</i><br/><br/>1. On Saturday morning Valeria walked to [[the street market|el mercadillo]] with Amy.<br/>2. There were a lot of people and the market was very busy.<br/>3. Valeria wanted a red jacket, but it was too expensive.<br/>4. In the afternoon Amy visited a friend, and Valeria stayed at home.<br/>5. It rained all day. It was terrible!<br/>6. In the evening they cooked dinner and they watched a film.<br/>7. On Sunday Ben phoned: «There's a concert in the park at six!»<br/>8. They walked to the park. There were a lot of people there.<br/>9. The music started at six and it finished at nine. They danced [[all evening|toda la tarde-noche]].<br/>10. Valeria was very tired, but she was lucky: [[the last bus|el último autobús]] stopped outside the park.<br/><br/><i>Apoyo: todos los verbos de la historia son regulares y ya los tienes · was/were para describir cómo estaban las cosas · «I was lucky» — «tuve suerte» NO es «I had luck»: en inglés la suerte, el hambre, el frío y los años van con BE, como aprendiste en el A1 con «I'm 25 years old».</i>",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l6e1", type: "order", prompt: "Ordena el fin de semana de Valeria",
              sentences: [
                "On Saturday Valeria walked to the street market with Amy.",
                "It rained in the afternoon and she stayed at home.",
                "In the evening they cooked dinner and watched a film.",
                "On Sunday Ben phoned about the concert in the park.",
                "They danced all evening and Valeria was very tired.",
              ],
              translation: "El sábado Valeria fue andando al mercadillo con Amy. Por la tarde llovió y se quedó en casa. Por la noche hicieron la cena y vieron una película. El domingo Ben llamó por lo del concierto en el parque. Bailaron toda la noche y Valeria acabó agotada.",
              itemIds: ["ena2m1streetmarket", "ena2m1istayedathome", "ena2m1phoned", "ena2m1tired"],
              tip: "Un relato se ordena con los marcadores de tiempo: On Saturday, in the afternoon, in the evening, On Sunday. Sin ellos, cinco frases sueltas.",
            },
            {
              id: "ena2m1l6e2", type: "mc", prompt: "Comprensión",
              question: "¿Por qué no compró Valeria la chaqueta roja?",
              options: ["Era demasiado cara", "No le gustaba el color", "El mercadillo estaba cerrado"],
              answer: 0,
              whyWrong: [null, "El color no se comenta: lo que se dice es «too expensive»", "El mercadillo estaba abierto y lleno de gente"],
              itemIds: ["ena2m1streetmarket", "enexpensive", "enjacket"],
            },
            {
              id: "ena2m1l6e3", type: "mc", prompt: "Comprensión — hay que atar cabos",
              question: "¿Cómo volvió Valeria a casa el domingo por la noche?",
              options: ["En autobús", "Andando", "En taxi"],
              answer: 0,
              whyWrong: [null, "Andando fue al parque, pero volvió agotada y con suerte: paró el último bus", "El taxi no aparece en la historia"],
              itemIds: ["ena2m1iwaslucky", "ena2m1stopped", "enbus"],
              tip: "«She was lucky: the last bus stopped outside the park» no dice «cogió el bus», pero lo deja clarísimo. Eso es leer en A2.",
            },
            {
              id: "ena2m1l6e4", type: "cloze", prompt: "Completa",
              text: "It rained all day and Valeria ___ at home.",
              answers: ["stayed"],
              translation: "Llovió todo el día y Valeria se quedó en casa.",
              hints: ["Quedarse = stay", "stay + …"],
              itemIds: ["ena2m1istayedathome", "ena2m1itrained"],
            },
            {
              id: "ena2m1l6e5", type: "bucket", prompt: "¿Pasó el sábado o el domingo?",
              categories: ["el sábado", "el domingo"],
              items: [
                { text: "the street market with Amy", bucket: 0 },
                { text: "she stayed at home in the rain", bucket: 0 },
                { text: "the concert in the park", bucket: 1 },
                { text: "they danced all evening", bucket: 1 },
                { text: "they watched a film", bucket: 0 },
                { text: "the last bus", bucket: 1 },
              ],
              itemIds: ["ena2m1streetmarket", "ena2m1istayedathome", "ena2m1concert"],
            },
            {
              id: "ena2m1l6e6", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "I was very tired, but I was lucky.",
              answers: [
                "Estaba muy cansada, pero tuve suerte.",
                "Estaba muy cansado, pero tuve suerte.",
                "Estaba agotada, pero tuve suerte.",
              ],
              itemIds: ["ena2m1tired", "ena2m1iwaslucky"],
              tip: "«I was lucky» → «tuve suerte». Dos verbos distintos para la misma idea: el inglés usa be donde el español usa tener.",
            },
            {
              id: "ena2m1l6e7", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Me quedé en casa y vi una película.",
              answers: [
                "I stayed at home and I watched a film.",
                "I stayed at home and watched a film.",
                "I stayed at home and I watched a movie.",
              ],
              hint: "dos verbos regulares, los dos con la misma terminación",
              itemIds: ["ena2m1istayedathome", "ena2m1shewatchedafilm"],
            },
            {
              id: "ena2m1l6e8", type: "errorfix", prompt: "Corrige el «tener» que en inglés es «ser»",
              wrong: "I had luck: the last bus stopped outside the park.",
              answers: ["I was lucky: the last bus stopped outside the park."],
              why: "La suerte, el hambre, el frío, el miedo, el sueño, la razón y los años van en inglés con BE + adjetivo, no con have + sustantivo: I was lucky, I'm hungry, I'm cold, I'm 25 years old. Es una lista cerrada — apréndetela entera y no vuelves a fallarla.",
              translation: "Tuve suerte: el último autobús paró delante del parque.",
              itemIds: ["ena2m1iwaslucky", "ena2m1stopped"],
            },
            {
              id: "ena2m1l6e9", type: "write", prompt: "Escribe tu fin de semana — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te escribe: «How was your weekend?». Contéstale por email.",
              bullets: [
                "Cuenta algo que hiciste, con un verbo en pasado acabado en -ed",
                "Di qué tiempo hizo",
                "Valóralo con was o were (¿bien, mal, aburrido?)",
              ],
              checks: [
                { re: "(worked|watched|walked|cooked|played|visited|danced|stayed|studied|listened|phoned|helped|started|finished|missed|arrived|wanted|decided)", label: "un verbo en pasado con -ed" },
                { re: "(rained|sunny|hot|cold|snowed|windy|weather|rain)", label: "el tiempo que hizo" },
                { re: "(it was|there was|there were|i was|we were)", label: "una valoración con was / were" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "then"] },
              model: "Hi Emma! It was a great weekend. On Saturday I walked to the street market with Amy and we cooked dinner together. On Sunday it rained all day, but I was lucky: I stayed at home and watched a film. How about you? Valeria",
              itemIds: ["ena2m1istayedathome", "ena2m1itrained", "ena2m1iwaslucky", "ena2m1howaboutyou"],
              tip: "El corrector del examen mira PRIMERO si contestaste a lo que te preguntaban, y solo después la gramática. Tres contenidos, dos conectores y las 30-50 palabras: ese es el orden.",
            },
            {
              id: "ena2m1l6e10", type: "speak", prompt: "Cuenta el domingo de Valeria en voz alta",
              text: "There was a concert in the park. We danced all evening and I was very tired.",
              phonetic: "déa uos̬ a KON-sat in de paak. ui DAANST ool ÍIV-ning and ái uos̬ VE-ri TÁI-ad",
              translation: "Había un concierto en el parque. Bailamos toda la noche y acabé agotada.",
              itemIds: ["ena2m1concert", "ena2m1tired", "endanced"],
            },
            {
              id: "ena2m1l6e11", type: "type", prompt: "Cierre de producción",
              question: "Llovió todo el día, así que me quedé en casa. Fue horrible.",
              answers: [
                "It rained all day and I stayed at home. It was terrible.",
                "It rained all day and I stayed at home. It was terrible!",
                "It rained all day, and I stayed at home. It was terrible.",
              ],
              hints: ["El «así que» todavía no lo tienes: úsalo con and", "It rain… all day and I stay… at home. It was terrible."],
              itemIds: ["ena2m1itrained", "ena2m1istayedathome", "ena2m1terrible"],
              tip: "El conector «so» (así que) llega en el módulo 2, junto con because. De momento, and te vale para todo.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 Writing: an email to a friend", url: "https://learnenglish.britishcouncil.org/skills/writing/a2-writing", note: "Escribe un email de 30-50 palabras al día contando algo que hiciste. Cuenta las palabras siempre: en el examen, pasarse también resta." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — oído real: was y were átonos
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l7",
      phaseId: "ena2m1",
      title: "Oído real: How was your weekend?",
      subtitle: "was y were se esconden — y sin ellos no se oye el pasado",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El ritual del lunes por la mañana",
          itemIds: ["ena2m1howwasyourweekend", "ena2m1notmuch", "ena2m1wasitgood", "ena2m1weweretired", "enitwasgreat", "enwherewereyou"],
        },
        {
          kind: "note",
          note: {
            title: "Las formas débiles: por qué no oyes was ni were",
            body: "En el A1 te enseñamos was y were para RECONOCERLOS. Ahora hay que afinar el oído, porque en la frase real casi nunca suenan como en el diccionario.<br/><br/>El inglés reparte el golpe de voz: las palabras <b>con contenido</b> (verbos, sustantivos, adjetivos) suenan fuerte, y las <b>de servicio</b> (was, were, to, for, of, and) se encogen hasta casi desaparecer. A eso se le llama <b>formas débiles</b>, y es lo que hace que un audio de examen te suene a chorro.<br/><br/><b>was</b> suena fuerte solo al final o solo: «Yes, it <u>was</u>» → uós̬. En medio de la frase se encoge: <i>It was great</i> → «it uos̬ GRÉIT», con la vocal comida.<br/><b>were</b> se encoge todavía más: casi solo queda una «ua» — <i>We were tired</i> → «ui ua TÁI-ad». Por eso <b>we are</b> y <b>we were</b> se parecen tanto: toda la diferencia está en una vocal pequeñísima.<br/><br/>Estrategia de examen, y es la de verdad: <b>no persigas el auxiliar, persigue el marcador</b>. Si oyes <i>yesterday</i>, <i>last night</i> o <i>on Saturday</i>, ya sabes que la frase va en pasado aunque el was se te haya escapado.<br/><br/>Y el ritual con el que empieza el lunes en Londres son <b>dos preguntas distintas</b>, y cada una pide lo suyo:<br/>· [[How was your weekend?|¿Qué tal el fin de semana?]] pregunta <b>qué tal estuvo</b> → <i>Not bad. · Yeah, good. · It was lovely.</i><br/>· <i>What did you do?</i> pregunta <b>qué hiciste</b> → ahí sí: [[Not much.|Poca cosa.]]<br/>Contestar <i>Not much</i> a <i>How was it?</i> es responder a otra pregunta. Y después de contestar, <b>devuelve el turno</b>: <i>How about you?</i>",
            table: [
              ["escrito", "fuerte (raro)", "débil (lo normal)"],
              ["was", "uós̬", "uos̬"],
              ["were", "uée", "ua"],
              ["It was great!", "it uós̬ GRÉIT", "—"],
              ["We were tired.", "—", "ui ua TÁI-ad"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l7e1", type: "audiomc", prompt: "Lee la pregunta ANTES de darle al play — 2 escuchas, como en el examen",
              audio: "How was your weekend?",
              question: "¿Qué te preguntan?",
              options: ["Qué tal el fin de semana", "Qué haces los fines de semana", "Adónde vas este fin de semana"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso sería «What do you do at the weekend?», en presente", "El futuro no aparece: was ya lo manda al pasado"],
              itemIds: ["ena2m1howwasyourweekend"],
              tip: "Un was átono de medio segundo cambia el tiempo de toda la pregunta. Léela antes de escuchar y el oído ya sabe qué buscar.",
            },
            {
              id: "ena2m1l7e2", type: "audiomc", prompt: "Cazar el dato — 2 escuchas",
              audio: "It was OK. I worked on Saturday and I stayed at home on Sunday.",
              question: "¿Qué hizo el sábado?",
              options: ["Trabajar", "Quedarse en casa", "Ir a un concierto"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso fue el domingo: escucha el orden de los dos días", "El concierto no suena en el audio"],
              itemIds: ["ena2m1iworked", "ena2m1istayedathome"],
              tip: "Dos datos en una frase y el examen te pide uno. Apunta los dos en el papel mientras suena: es lo que hace todo el mundo que aprueba.",
            },
            {
              id: "ena2m1l7e3", type: "audiomc", prompt: "Par mínimo: ¿are o were? — 2 escuchas",
              audio: "We were at the street market.",
              question: "¿Cuándo — ahora o antes?",
              options: ["Antes: sonó were", "Ahora: sonó are"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "are átono suena «a», seco; were átono suena «ua», con esa u de arranque"],
              itemIds: ["ena2m1streetmarket"],
            },
            {
              id: "ena2m1l7e4", type: "audiomc", prompt: "La negación que decide la respuesta — 2 escuchas",
              audio: "There weren't any tickets and we watched a film at home.",
              question: "¿Qué hicieron?",
              options: ["Ver una película en casa", "Ir al concierto", "Comprar entradas"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El concierto se cae: no había entradas", "tickets suena, pero con weren't delante"],
              itemIds: ["ena2m1therewasnt", "ena2m1shewatchedafilm", "enticket"],
              tip: "weren't lleva una t final clarísima, mucho más audible que el were suelto. En negativo, el inglés se oye mejor.",
            },
            {
              id: "ena2m1l7e5", type: "hearreal", prompt: "¿Libro o calle? La pregunta del lunes",
              book: "Was it good?",
              real: "Was it any good?",
              translation: "¿Estuvo bien?",
              itemIds: ["ena2m1wasitgood"],
              tip: "«any good» no añade significado: añade duda amable. Se usa muchísimo para preguntar por una peli, un restaurante o un concierto.",
            },
            {
              id: "ena2m1l7e6", type: "hearreal", prompt: "¿Qué significa lo que has oído?",
              book: "It was not very good.",
              real: "It wasn't great.",
              translation: "No estuvo muy bien.",
              ask: "meaning",
              meaningOptions: ["No estuvo muy bien", "Estuvo genial", "No lo sé"],
              itemIds: ["enitwasgreat", "ena2m1wasitgood"],
              tip: "Los británicos rebajan en vez de criticar: «It wasn't great» quiere decir «fue bastante malo». Entender ese rodeo es entender el país.",
            },
            {
              id: "ena2m1l7e7", type: "listen", prompt: "Dictado — el were átono, escrito entero",
              text: "We were really tired on Sunday.",
              translation: "El domingo estábamos agotadas.",
              hints: ["Suena «ui ua…», pero se escribe entero", "We w… really tired on Sunday."],
              itemIds: ["ena2m1weweretired", "ena2m1tired"],
              tip: "Lo que se encoge al hablar se escribe completo. Esa distancia entre lo que suena y lo que se escribe es medio Listening del examen.",
            },
            {
              id: "ena2m1l7e8", type: "listen", prompt: "Dictado — con la contracción tal cual suena",
              text: "There wasn't any music at the party.",
              translation: "No había música en la fiesta.",
              strictContractions: true,
              hints: ["La contracción es lo que sonó: no la deshagas", "There w…'t any music at the party."],
              itemIds: ["ena2m1therewasnt"],
              tip: "Aquí «there was not» no vale: un dictado se corrige por lo que sonó, y sonó wasn't.",
            },
            {
              id: "ena2m1l7e9", type: "mc", prompt: "La fórmula del lunes",
              question: "«Not much.» es la respuesta de todos los lunes. ¿A cuál de las dos preguntas contesta?",
              options: ["What did you do at the weekend?", "How was your weekend?", "A las dos igual."],
              answer: 0,
              whyWrong: [null, "Esa pregunta es «qué tal estuvo», y se contesta con «Not bad» o «Yeah, good». «Not much» estaría contestando a otra cosa.", "No: una pregunta por qué HICISTE y la otra por qué TAL estuvo. Es el fallo clásico del lunes."],
              itemIds: ["ena2m1notmuch"],
              tip: "Guárdate las dos: «Not much» para lo que hiciste, «Not bad» para qué tal fue. Y después de contestar, devuelve la pregunta: «How about you?»",
            },
            {
              id: "ena2m1l7e10", type: "shadow", prompt: "Sombrea el ritual entero",
              text: "Not much, really. I worked on Saturday and I was very tired.",
              phonetic: "not MACH, RÍA-li. ái UÉEKT on SÁ-ta-dei and ái uos̬ VE-ri TÁI-ad",
              translation: "Poca cosa. Trabajé el sábado y acabé agotada.",
              reps: 2,
              itemIds: ["ena2m1notmuch", "ena2m1iworked", "ena2m1tired"],
              tip: "Fíjate en el contraste: worked suena fuerte y was casi no suena. Copia ese desnivel y ya hablas con ritmo inglés.",
            },
            {
              id: "ena2m1l7e11", type: "type", prompt: "Cierre de producción",
              question: "¿Qué tal el fin de semana? — No estuvo mal. Trabajé el sábado.",
              answers: [
                "How was your weekend? Not bad. I worked on Saturday.",
                "How was your weekend? Not bad, I worked on Saturday.",
                "How was your weekend? - Not bad. I worked on Saturday.",
              ],
              hints: ["La pregunta del lunes, y la respuesta que SÍ le toca", "How w… your weekend? Not bad. I w… on Saturday."],
              itemIds: ["ena2m1howwasyourweekend", "ena2m1iworked"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m1-4",
            book: "We were very tired.",
            real: "We were knackered.",
            meaning: "Estábamos reventadas",
            when: "Con amigos y compañeros de trabajo, a todas horas. Es informal pero no es palabrota. En el examen: very tired o exhausted.",
            register: "amigos",
            note: "knackered es britanismo puro: en Estados Unidos no lo dicen. Y ojo al were átono de delante: «ui ua NÁ-kad».",
            sound: "ui ua NÁ-kad",
            level: "a2",
            itemId: "ena2m1weweretired",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Un audio al día en modo examen: lee las preguntas antes, dos escuchas y ni una más. Apunta cada was/were que se te escape." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — did / didn't: el motor del A1, movido al pasado
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l8",
      phaseId: "ena2m1",
      title: "Did you watch the match?",
      subtitle: "Preguntar y negar en pasado: el do/does del A1, un tiempo más allá",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar por el finde de otro",
          itemIds: ["ena2m1whatdidyoudo", "ena2m1didyouwatchit", "ena2m1ididntwork", "ena2m1yesidid", "ena2m1whathappened", "enyesido"],
        },
        {
          kind: "note",
          note: {
            title: "did: la misma máquina que ya montaste en el A1",
            body: "Esto no es gramática nueva: es una pieza que ya tienes, cambiada de sitio.<br/><br/>En el módulo 4 del A1 aprendiste que, para preguntar y negar en presente, aparece un ayudante — <b>do</b> / <b>does</b> — <b>que se lleva toda la marca gramatical mientras el verbo se queda desnudo</b>: <i>She work<u>s</u></i>, pero <i>Doe<u>s</u> she <u>work</u>?</i> y <i>She doesn't <u>work</u></i>. La -s se muda al auxiliar y el verbo vuelve a su forma de diccionario.<br/><br/><b>En pasado es idéntico</b>, con un solo ayudante para todas las personas: <b>did</b>. <i>She work<u>ed</u></i>, pero <i>Di<u>d</u> she <u>work</u>?</i> y <i>She didn't <u>work</u></i>. La -ed se muda a did y el verbo se queda limpio.<br/><br/>De ahí sale el error número uno del hispanohablante en A2: <b><i>Did you watched…?</i></b> Es exactamente el mismo fallo que decir <i>Does she works?</i> — el pasado marcado dos veces. Una marca por frase, y la lleva el auxiliar.<br/><br/>Y el contraste con el español, que explica por qué al principio se te olvida el did entero: <b>en español la pregunta se hace con la entonación</b> («¿trabajaste ayer?», mismas palabras que «trabajaste ayer»). En inglés no hay entonación que valga: <b>sin auxiliar no hay pregunta</b>.<br/><br/><b>Un regalo escondido:</b> como detrás de did el verbo va desnudo, <b>ya puedes preguntar por cualquier verbo, incluidos los que no obedecen</b> — <i>Did you go to the concert?</i>, <i>Did you have a good weekend?</i>. Sus pasados raros (went, had) son del módulo siguiente; las preguntas, no.<br/><br/><b>La excepción que conviene saber</b>: cuando la palabra qu- ES el sujeto, no hace falta ayudante. <b>What happened?</b> (¿qué pasó?), <b>Who phoned?</b> (¿quién llamó?). Nadie dice <i>What did happen?</i>",
            table: [
              ["presente (A1)", "pasado (aquí)"],
              ["Do you work?", "Did you work?"],
              ["Does she work?", "Did she work?"],
              ["I don't work.", "I didn't work."],
              ["She doesn't work.", "She didn't work."],
              ["Yes, I do. / No, I don't.", "Yes, I did. / No, I didn't."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Las tres formas, en fila",
            body: "Una sola cosa que vigilar: <b>la -ed aparece en la afirmativa y desaparece en las otras dos</b>. Si la ves dos veces en la misma frase, sobra una.",
            table: [
              ["afirmativa", "negativa", "pregunta"],
              ["I worked.", "I didn't work.", "Did you work?"],
              ["She watched TV.", "She didn't watch TV.", "Did she watch TV?"],
              ["They played football.", "They didn't play football.", "Did they play football?"],
              ["We stayed at home.", "We didn't stay at home.", "Did you stay at home?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l8e1", type: "mc", prompt: "«¿Viste el partido?»",
              question: "¿Cuál es la buena?",
              options: ["Did you watch the match?", "Did you watched the match?", "You watched the match?"],
              answer: 0,
              whyWrong: [null, "Pasado marcado dos veces: did ya lo dice, así que watch va desnudo", "Sin auxiliar no hay pregunta inglesa; la entonación sola es un calco del español"],
              itemIds: ["ena2m1didyouwatchit"],
              tip: "Piensa en el A1: nadie dice «Does she works?». Pues esto es lo mismo, un tiempo más allá.",
            },
            {
              id: "ena2m1l8e2", type: "bucket", prompt: "¿El verbo lleva -ed o va desnudo?",
              categories: ["con -ed", "desnudo (detrás de did / didn't)"],
              items: [
                { text: "I watched a film", bucket: 0 },
                { text: "Did you watch a film?", bucket: 1 },
                { text: "She didn't work on Sunday", bucket: 1 },
                { text: "They played football", bucket: 0 },
                { text: "Did they play football?", bucket: 1 },
                { text: "We cooked dinner", bucket: 0 },
              ],
              itemIds: ["ena2m1didyouwatchit", "ena2m1ididntwork"],
              tip: "Una marca de pasado por frase. Si ya está en did, el verbo no la repite.",
            },
            {
              id: "ena2m1l8e3", type: "cloze", prompt: "Completa la pregunta",
              text: "___ you watch the film last night?",
              answers: ["Did"],
              translation: "¿Viste la película anoche?",
              hints: ["El ayudante del pasado, para todas las personas", "D…"],
              itemIds: ["ena2m1didyouwatchit", "enlastnight"],
            },
            {
              id: "ena2m1l8e4", type: "cloze", prompt: "Completa la negativa",
              text: "I ___ work on Sunday.",
              answers: ["didn't", "did not"],
              translation: "No trabajé el domingo.",
              hints: ["did + not, contraído", "d…'t"],
              itemIds: ["ena2m1ididntwork"],
            },
            {
              id: "ena2m1l8e5", type: "transform", prompt: "Pásala a negativa",
              source: "I worked on Sunday.",
              instruction: "Ponla en negativa",
              answers: ["I didn't work on Sunday.", "I did not work on Sunday."],
              translation: "No trabajé el domingo.",
              hints: ["El pasado se muda al auxiliar", "I d…'t work on Sunday."],
              itemIds: ["ena2m1ididntwork", "ena2m1iworked"],
            },
            {
              id: "ena2m1l8e6", type: "transform", prompt: "Pásala a pregunta",
              source: "She watched a film.",
              instruction: "Hazla pregunta",
              answers: ["Did she watch a film?"],
              translation: "¿Vio una película?",
              hints: ["El auxiliar abre la frase y el verbo se desnuda", "D… she watch a film?"],
              itemIds: ["ena2m1didyouwatchit", "ena2m1shewatchedafilm"],
            },
            {
              id: "ena2m1l8e7", type: "errorfix", prompt: "Corrige el doble pasado — es el error nº 1 del A2",
              wrong: "Did you watched the match?",
              answers: ["Did you watch the match?"],
              why: "El pasado se marca UNA vez por frase, y lo lleva el auxiliar. Con did delante, el verbo vuelve a su forma de diccionario: watch, work, play. Igual que en presente nadie dice «Does she works?».",
              translation: "¿Viste el partido?",
              itemIds: ["ena2m1didyouwatchit"],
            },
            {
              id: "ena2m1l8e8", type: "errorfix", prompt: "Corrige la pregunta sin auxiliar",
              wrong: "What you did last weekend?",
              answers: ["What did you do last weekend?"],
              why: "En español la pregunta se hace con la entonación y el orden no cambia («¿qué hiciste el finde?»). En inglés hace falta el auxiliar Y va delante del sujeto: What DID YOU do…? El verbo do del final es el verbo de verdad, «hacer».",
              translation: "¿Qué hiciste el fin de semana pasado?",
              itemIds: ["ena2m1whatdidyoudo"],
              tip: "Ojo a la frase: lleva did dos veces, pero no son lo mismo. El primero es el ayudante; el segundo (do) es «hacer».",
            },
            {
              id: "ena2m1l8e9", type: "mc", prompt: "La excepción que hay que conocer",
              question: "«¿Qué pasó?»",
              options: ["What happened?", "What did happen?", "What did happened?"],
              answer: 0,
              whyWrong: [null, "Cuando la palabra qu- ES el sujeto (¿qué?, ¿quién?), el auxiliar sobra", "Y esta marca el pasado dos veces, además"],
              itemIds: ["ena2m1whathappened"],
              tip: "Regla corta: si la pregunta es «¿QUIÉN hizo algo?» o «¿QUÉ pasó?», nada de did. Si es «¿qué hiciste TÚ?», did obligatorio.",
            },
            {
              id: "ena2m1l8e10", type: "build", prompt: "Construye la pregunta — y fíjate en el verbo",
              target: "Did you go to the concert on Sunday",
              translation: "¿Fuiste al concierto el domingo?",
              distractors: ["went", "goes"],
              itemIds: ["ena2m1didyouwatchit", "ena2m1concert"],
              tip: "go es de los que no obedecen, y aun así aquí no te hace falta su pasado: detrás de did, el verbo va desnudo. Esa es la puerta al módulo 2.",
            },
            {
              id: "ena2m1l8e11", type: "audiomc", prompt: "Pregunta y respuesta corta — 2 escuchas",
              audio: "Did you phone Amy? | No, I didn't. I was really tired.",
              question: "¿Llamó a Amy?",
              options: ["No", "Sí", "No se sabe"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "La respuesta corta empieza por No, I didn't", "Se sabe perfectamente: lo dice y además da el motivo"],
              itemIds: ["ena2m1yesidid", "ena2m1phoned", "ena2m1tired"],
              tip: "La respuesta corta repite el auxiliar, no el verbo: Yes, I did / No, I didn't. Exactamente como el «Yes, I do» del A1.",
            },
            {
              id: "ena2m1l8e12", type: "speak", prompt: "El intercambio completo, en voz alta",
              text: "Did you have a good weekend? Yes, I did!",
              phonetic: "did yu jav a gud UÍI-kend? yes, ái DID",
              translation: "¿Qué tal el finde? — ¡Muy bien!",
              itemIds: ["ena2m1yesidid", "ena2m1didyouwatchit"],
              tip: "have va desnudo detrás de did, sin pasado raro que aprender. Y el DID de la respuesta va acentuado: ahí sí suena fuerte.",
            },
            {
              id: "ena2m1l8e13", type: "type", prompt: "Cierre de producción",
              question: "¿Qué hiciste el finde pasado? — No trabajé. Vi una película.",
              answers: [
                "What did you do last weekend? I didn't work. I watched a film.",
                "What did you do last weekend? I didn't work. I watched a movie.",
                "What did you do last weekend? I did not work. I watched a film.",
              ],
              hints: ["Pregunta con did + negativa con didn't + afirmativa con -ed", "What d… you do last weekend? I d…'t work. I watch… a film."],
              itemIds: ["ena2m1whatdidyoudo", "ena2m1ididntwork", "ena2m1shewatchedafilm"],
              tip: "Las tres formas en tres frases: pregunta, negativa y afirmativa. Si te sale esto, el pasado regular ya es tuyo entero.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m1-5",
            book: "What did you do at the weekend?",
            real: "What did you get up to at the weekend?",
            meaning: "¿Qué hiciste el finde? / ¿En qué has andado metido?",
            when: "Entre amigos y compañeros, el lunes por la mañana. Tiene un puntito travieso, como el «¿qué has estado tramando?» español, pero se usa con total normalidad. En el examen, la versión del libro.",
            register: "amigos",
            note: "get up to = «hacer», con guasa. Y al hablar rápido, did you se funde en «did-ya»: uót DÍD-ya guet AP tu…",
            sound: "uót did yu guet AP tu at de UÍI-kend",
            level: "a2",
            itemId: "ena2m1whatdidyoudo",
          },
        },
      ],
      resources: [
        { label: "British Council — Past simple: questions and negatives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Fíjate solo en los ejemplos con did y didn't, y comprueba en cada uno que el verbo va desnudo. Diez minutos y la trampa se cae." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — contarlo entero: espiral del módulo y el minuto del oral
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m1l9",
      phaseId: "ena2m1",
      title: "Your weekend, in one minute",
      subtitle: "Todo el módulo junto — y tu primer minuto hablando solo",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar y devolver la pregunta",
          itemIds: ["ena2m1howaboutyou", "ena2m1allweekend", "ena2m1lastweekend", "enitwasgreat"],
        },
        {
          kind: "note",
          note: {
            title: "Cómo se rellena un minuto: tres bloques",
            body: "En el oral del A2 te van a pedir <b>un minuto hablando solo</b> sobre un tema, con 30 segundos para prepararlo en papel. Sesenta segundos parecen eternos si te pones a improvisar y se pasan volando si llevas un esqueleto. El esqueleto son <b>tres bloques</b>, y no hace falta más:<br/><br/><b>1. Qué y cuándo.</b> Un verbo en pasado y un marcador: <i>Last Saturday I worked in the café.</i><br/><b>2. Con quién y dónde.</b> Otro verbo en pasado: <i>Then I walked to the park with Amy.</i><br/><b>3. Qué te pareció.</b> Aquí entra was/were: <i>It was great! There were a lot of people.</i><br/><br/>Y el remate que te salva de quedarte callada: <b>[[How about you?|¿Y tú?]]</b> — devuelves la pregunta y el otro sigue hablando.<br/><br/>Con los conectores que ya tienes (<b>and</b>, <b>but</b>, <b>then</b>) los tres bloques se enganchan solos. Los de causa —<i>because</i>, <i>so</i>— llegan en el módulo 2, y con ellos el minuto pasará a sonar a relato de verdad.",
            table: [
              ["bloque", "qué dices", "ejemplo"],
              ["1. qué y cuándo", "verbo con -ed + marcador", "Last Saturday I worked in the café."],
              ["2. con quién y dónde", "otro verbo con -ed", "Then I walked to the park with Amy."],
              ["3. qué te pareció", "was / were + adjetivo", "It was great! There were a lot of people."],
              ["remate", "devolver la pregunta", "How about you?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m1l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya lo tienes",
              pairs: [
                { target: "last week", source: "la semana pasada" },
                { target: "two days ago", source: "hace dos días" },
                { target: "There was…", source: "Había… (una cosa)" },
                { target: "There were…", source: "Había… (varias)" },
                { target: "I was lucky.", source: "Tuve suerte." },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m1lastweek", "ena2m1twodaysago", "ena2m1therewas", "ena2m1therewere", "ena2m1iwaslucky"],
              tip: "El cronómetro solo premia. Si sale sin pensar, está consolidado; si te paras, ese ítem volverá en el repaso.",
            },
            {
              id: "ena2m1l9e2", type: "gapbank", prompt: "El fin de semana entero, con el banco de palabras",
              text: "Last Saturday Valeria ___ to the street market. In the afternoon it ___ and she stayed at home. On Sunday there ___ a concert in the park and they ___ all evening.",
              answers: ["walked", "rained", "was", "danced"],
              bank: ["walked", "rained", "was", "danced", "were", "watched", "arrived"],
              translation: "El sábado pasado Valeria fue andando al mercadillo. Por la tarde llovió y se quedó en casa. El domingo había un concierto en el parque y bailaron toda la noche.",
              itemIds: ["ena2m1theywalkedtothepark", "ena2m1itrained", "ena2m1therewas", "endanced"],
              tip: "El tercer hueco es el que separa a quien ha entendido la lección 3: «a concert» es UNA cosa, así que was. El were del banco está ahí a propósito.",
            },
            {
              id: "ena2m1l9e3", type: "bucket", prompt: "Espiral: ¿este marcador pide pasado o presente?",
              categories: ["pide pasado", "pide presente"],
              items: [
                { text: "two days ago", bucket: 0 },
                { text: "every day", bucket: 1 },
                { text: "last night", bucket: 0 },
                { text: "at the moment", bucket: 1 },
                { text: "yesterday", bucket: 0 },
                { text: "right now", bucket: 1 },
              ],
              itemIds: ["ena2m1twodaysago", "eneveryday", "enlastnight", "enatthemoment", "enyesterday", "enrightnow"],
              tip: "En el examen, clasificar el MARCADOR es más rápido y más fiable que pensar en el verbo. El tiempo lo manda la señal temporal.",
            },
            {
              id: "ena2m1l9e4", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "El sábado pasado trabajé en el café y por la tarde vi una película.",
              answers: [
                "Last Saturday I worked in the café and in the afternoon I watched a film.",
                "Last Saturday I worked in the café and I watched a film in the afternoon.",
                "Last Saturday I worked at the café and in the afternoon I watched a film.",
              ],
              hint: "el marcador de «pasado» va sin the y sin on",
              itemIds: ["ena2m1iworked", "ena2m1shewatchedafilm", "ena2m1lastweekend"],
            },
            {
              id: "ena2m1l9e5", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "There weren't any tickets, but there was a concert in the park.",
              answers: [
                "No había entradas, pero había un concierto en el parque.",
                "No quedaban entradas, pero había un concierto en el parque.",
              ],
              itemIds: ["ena2m1therewasnt", "ena2m1therewas", "ena2m1concert", "enticket"],
              tip: "Dos «había» en español y dos verbos ingleses distintos, weren't y was, decididos por lo que va detrás de cada uno.",
            },
            {
              id: "ena2m1l9e6", type: "errorfix", prompt: "Corrige el calco más caro del nivel",
              wrong: "Yesterday I have watched a film.",
              answers: ["Yesterday I watched a film."],
              why: "Con yesterday, last… o …ago, el inglés exige pasado simple: son tiempos TERMINADOS. Y ojo, que aquí el español tampoco te ayuda: «ayer he visto una película» no es correcto en ningún sitio — <i>ayer</i> cierra el periodo y pide indefinido también en España. Donde sí se parte en dos es con <b>hoy</b>: si tú dirías «hoy he visto una película», tu español te empuja a poner perfecto de más en inglés; si dirías «hoy vi una película», te empuja a lo contrario. Con <i>yesterday</i>, <i>last…</i> y <i>…ago</i> la regla es una sola para todos: tiempo terminado, pasado simple, siempre.",
              translation: "Ayer vi una película.",
              itemIds: ["ena2m1shewatchedafilm", "enyesterday"],
            },
            {
              id: "ena2m1l9e7", type: "mc", prompt: "Espiral: la regla de oro del módulo",
              question: "«Los veranos trabajaba en un café» y «El verano pasado trabajé en un café». En inglés…",
              options: [
                "worked vale para las dos: el contexto pone la diferencia",
                "hacen falta dos verbos distintos",
                "la primera va en presente",
              ],
              answer: 0,
              whyWrong: [null, "El imperfecto español no tiene forma propia en inglés: lo cubre el mismo pasado", "Ni una ni otra: las dos hablan de un tiempo terminado"],
              itemIds: ["ena2m1iworked"],
              tip: "Una forma para dos tiempos españoles. Es lo primero que se explicó en la lección 1 y lo que más tranquiliza del nivel.",
            },
            {
              id: "ena2m1l9e8", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "There were a lot of people at the concert.",
              forbid: ["a lot of", "people", "lot"],
              answers: ["The concert was very busy.", "It was packed."],
              translation: "Había mucha gente en el concierto.",
              itemIds: ["ena2m1therewere", "ena2m1concert"],
              tip: "Decir lo mismo por otro camino es lo que te salva cuando en el oral no te sale una palabra. «It was packed» te lo enseñó la píldora de la lección 3.",
            },
            {
              id: "ena2m1l9e9", type: "audiomc", prompt: "Cierre de oído — dos datos en un audio, como en la Parte 1 del examen",
              audio: "Last weekend was terrible. It rained all day on Saturday and there weren't any buses on Sunday.",
              question: "¿Qué pasó el domingo?",
              options: ["No había autobuses", "Llovió todo el día", "Hubo un concierto"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso fue el sábado: el audio da los dos días en orden", "El concierto no suena"],
              itemIds: ["ena2m1terrible", "ena2m1itrained", "ena2m1therewasnt"],
              tip: "Cuando un audio corto trae DOS datos, la pregunta casi siempre va por el segundo. Apunta los dos y luego elige.",
            },
            {
              id: "ena2m1l9e10", type: "speak", prompt: "Tu minuto, bloque a bloque — léelo primero y luego dilo mirando al frente",
              text: "Last Saturday I worked in the café. Then I walked to the park with Amy. It was great!",
              phonetic: "laast SÁ-ta-dei ái UÉEKT in de KÁ-fei. den ái UÓOKT tu de paak uid ÉI-mi. it uos̬ GRÉIT",
              translation: "El sábado pasado trabajé en el café. Luego fui andando al parque con Amy. ¡Estuvo genial!",
              itemIds: ["ena2m1iworked", "ena2m1theywalkedtothepark", "enitwasgreat"],
              tip: "Los tres bloques de la nota, en tres frases. Cuida las dos /t/ finales: uéekt, uóokt.",
            },
            {
              id: "ena2m1l9e11", type: "monologue", prompt: "El minuto de verdad: cuenta TU fin de semana",
              topic: "Tu fin de semana pasado, en un minuto",
              slides: [
                { title: "1. Qué y cuándo", hint: "Un verbo con -ed y un marcador: Last Saturday I… / Two days ago I…" },
                { title: "2. Con quién y dónde", hint: "Otro verbo con -ed: Then I walked / visited / cooked / watched…" },
                { title: "3. Qué te pareció", hint: "was / were + adjetivo: It was great / terrible. There were a lot of people. I was tired." },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He usado al menos tres verbos en pasado acabados en -ed",
                "He dicho al menos un marcador (yesterday, last…, …ago)",
                "He usado there was o there were una vez",
                "He valorado el finde con was + adjetivo",
                "He cerrado con «How about you?»",
              ],
              model: "Last Saturday I worked in the café from nine to five. Then I walked home and I cooked dinner with my flatmate. In the evening we watched a film. On Sunday there was a street market near my house and I visited a friend. There were a lot of people and it was great! I was very tired on Sunday night, but it was a good weekend. How about you?",
              itemIds: ["ena2m1lastweekend", "ena2m1iworked", "ena2m1therewere", "ena2m1howaboutyou", "ena2m1allweekend"],
              tip: "Grábate las dos veces y compara: la segunda pasada siempre sale mejor, y esa es la que te llevas al examen. No te evalúas por lo bonito, sino por las casillas de la lista.",
            },
            {
              id: "ena2m1l9e12", type: "type", prompt: "Cierre del módulo — el finde entero en una frase",
              question: "El fin de semana pasado trabajé el sábado, había un concierto el domingo y estuvo genial.",
              answers: [
                "Last weekend I worked on Saturday, there was a concert on Sunday and it was great.",
                "Last weekend I worked on Saturday, there was a concert on Sunday and it was great!",
                "Last weekend I worked on Saturday, there was a concert on Sunday, and it was great.",
              ],
              hints: ["Marcador + verbo con -ed + there was + valoración con was", "Last weekend I work… on Saturday, there w… a concert on Sunday and it was great."],
              itemIds: ["ena2m1lastweekend", "ena2m1iworked", "ena2m1therewas", "enitwasgreat"],
              tip: "Ahí está el módulo entero: la -ed, el there was y el marcador. Con esto ya puedes contar cualquier cosa que te haya pasado — mientras el verbo sea de los que obedecen. Los que no, en el módulo 2.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Ensaya el minuto con los vídeos: 30 segundos de papel, uno de habla y una segunda pasada. Siempre dos veces." },
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Hojéalo hoy 10 minutos: mira solo el formato del Spoken y del Writing. Vas a vivir con ellos doce módulos." },
      ],
    },
  ],
};
