import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 3 — The woman in the red coat: describir a la gente y las
// cosas, y decir cómo se hizo algo. Sigue el listón del piloto `ena2m1`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): adverbios de modo en -ly Y SU POSICIÓN ·
// orden de varios adjetivos · los graduadores quite / so / a bit. Como
// FRONTERA (se presenta, se reconoce, no se examina): past continuous y los
// adjetivos en -ed / -ing.
//
// EL CONTRASTE QUE ORDENA EL MÓDULO, y es de los que más marcan al
// hispanohablante: NADA se mete entre el verbo y su objeto directo. «I like
// very much this film» y «I speak very well English» son el error más
// resistente del español porque en español ese orden es perfectamente natural.
// Va entero en la L6, con las dos salidas que sí existen (graduador delante del
// verbo, o bloque al final) y con los de frecuencia, que tampoco van donde el
// español los pone. La L4 prepara el terreno con la posición básica del
// adverbio de modo (detrás del verbo, y detrás del objeto si lo hay).
//
// -ed / -ing (L7) NO se enseña por la etiqueta formal —«participio pasado» y
// «participio presente» no ayudan a decidir nada— sino por el significado:
// cómo me siento YO frente a cómo es LA COSA. El par que hunde
// conversaciones («I'm boring» / «I'm bored») está en la nota y en un mc.
//
// EL PAST CONTINUOUS (L8) entra aquí porque su contexto natural —«¿qué estabas
// haciendo cuando…?»— exige el pasado simple ya instalado (ena2m1, ena2m2).
// Pero es FRONTERA: se presenta como suma de dos piezas que el alumno ya tiene
// (el continuo de ena1m9 + el was/were de ena2m1) y se dice en voz alta que no
// se examina. No es el eje del módulo; el eje son los adverbios.
//
// LA CLÍNICA DE SONIDO (L5) es el ACENTO LÉXICO en palabras de tres o más
// sílabas (COMfortable, exPENsive, imPORtant), que es lo que pide la tabla de
// PLAN-EN-A2 §4.3 para este módulo. El hispanohablante las acentúa a la
// española y por eso no se le entiende a la primera; y de paso no las reconoce
// al oírlas, que es donde se pierde el Listening.
//
// ELENCO: solo personajes que ya están en CANON.md (Valeria, Amy, Ben, Sam,
// Mr Patel, Nora, Emma, Clara). El plan proponía un secundario nuevo —Tom
// Okafor— para variedad de acento, pero un secundario nuevo exige su fila en
// CANON.md y este módulo no puede tocar ese archivo: se queda pendiente.
//
// RECICLADO del A1 y de ena2m1 sin redefinir ids (una palabra, una tarjeta):
// entall, enyoung, ennice, enfunny, envery, enheisverytall, enwoman, enpeople,
// ensister, enfriend, enwear, enred, enblue, enblack, enjacket, ennew, enbig,
// enlovely, enexpensive, entooexpensive, enlistencarefully, enverywell,
// enalways, ennever, enhospital, endelicious, ensofa, enflat, enguitar,
// endoor, endriver, encoffee, enticket, enwatchafilm, enletsgotothecinema,
// enitwasgreat, enwhatareyoudoing, enyesterday, enlastnight, enatweekend,
// enwork, enread, enbook, enstation, enbusstop, enitsraining, ena2m1tired,
// ena2m1terrible, ena2m1weweretired, ena2m1streetmarket, ena2m1concert,
// ena2m1itrained, ena2m1shewatchedafilm, ena2m1phoned, ena2m1arrived,
// ena2m1istayedathome, ena2m1lastweekend, ena2m1howaboutyou,
// ena2m1whathappened, ena2m1notmuch, ena2m1howwasyourweekend.
//
// TODOS los ids nuevos llevan el prefijo "ena2m3": es regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m3: Record<string, VocabItem> = {
  // ── ena2m3l1 — describir a una persona: lo que se ES y lo que se TIENE ──
  ena2m3whatdoesshelooklike: {
    id: "ena2m3whatdoesshelooklike", target: "What does she look like?",
    source: "¿Cómo es? (de aspecto: alta, morena, con gafas…)",
    sound: "uót das shi LUK láik",
    gram: { trap: "How is she like?", same: ["Can you describe her?"] },
  },
  ena2m3whatsshelike: {
    id: "ena2m3whatsshelike", target: "What's she like?",
    source: "¿Cómo es? (de carácter: simpática, tímida…)",
    sound: "uóts shi LÁIK",
    gram: { trap: "How is she?", same: ["Tell me about her."] },
  },
  ena2m3longdarkhair: {
    id: "ena2m3longdarkhair", target: "She has long dark hair.",
    source: "Tiene el pelo largo y moreno.",
    sound: "shi jas̬ long daak JÉA",
    gram: { trap: "She has the hair long.", same: ["She's got long dark hair."] },
  },
  ena2m3shorthair: { id: "ena2m3shorthair", target: "short hair", source: "el pelo corto", sound: "shoot JÉA" },
  ena2m3blueeyes: { id: "ena2m3blueeyes", target: "big blue eyes", source: "unos ojos azules grandes", sound: "big bluu ÁIS̬" },
  ena2m3glasses: { id: "ena2m3glasses", target: "glasses", source: "las gafas — siempre en plural, como en español", sound: "GLAA-sis̬" },
  ena2m3abeard: { id: "ena2m3abeard", target: "a beard", source: "la barba", sound: "a BÍAD" },
  ena2m3hesinhisthirties: {
    id: "ena2m3hesinhisthirties", target: "He's in his thirties.",
    source: "Tiene treinta y tantos.",
    sound: "jis̬ in jis̬ ZÉE-tis̬",
    gram: { trap: "He has thirty years.", same: ["He's about thirty-five."] },
  },

  // ── ena2m3l2 — los graduadores: quite / so / a bit ──
  ena2m3quitetall: {
    id: "ena2m3quitetall", target: "She's quite tall.", source: "Es bastante alta.",
    sound: "shis̬ kuáit TÓOL",
    gram: { trap: "She's enough tall.", same: ["She's fairly tall."] },
  },
  ena2m3abitshy: {
    id: "ena2m3abitshy", target: "He's a bit shy.", source: "Es un poco tímido.",
    sound: "jis̬ a bit SHÁI",
    gram: { trap: "He's a bit friendly.", same: ["He's quite shy."] },
  },
  ena2m3sonice: {
    id: "ena2m3sonice", target: "She's so nice!", source: "¡Es majísima!",
    sound: "shis̬ sóu NÁIS",
    gram: { same: ["She's really nice!"] },
  },
  ena2m3shy: { id: "ena2m3shy", target: "shy", source: "tímido / tímida", sound: "shái" },
  ena2m3friendly: { id: "ena2m3friendly", target: "friendly", source: "simpático, cercano, de trato fácil", sound: "FREND-li" },

  // ── ena2m3l3 — el orden de varios adjetivos, y la ropa con IN ──
  ena2m3thewomanintheredcoat: {
    id: "ena2m3thewomanintheredcoat", target: "the woman in the red coat",
    source: "la mujer del abrigo rojo",
    sound: "de UÚ-man in de red KÓUT",
    gram: { trap: "the woman of the red coat", same: ["the woman wearing a red coat"] },
  },
  ena2m3acoat: { id: "ena2m3acoat", target: "a coat", source: "un abrigo", sound: "a kóut" },
  ena2m3ascarf: { id: "ena2m3ascarf", target: "a scarf", source: "una bufanda", sound: "a skaaf" },
  ena2m3boots: { id: "ena2m3boots", target: "boots", source: "las botas", sound: "buuts" },
  ena2m3green: { id: "ena2m3green", target: "green", source: "verde", sound: "griin" },
  ena2m3brown: { id: "ena2m3brown", target: "brown", source: "marrón", sound: "bráun" },
  ena2m3abigoldblackbag: {
    id: "ena2m3abigoldblackbag", target: "a big old black bag",
    source: "un bolso negro, viejo y grande — en inglés, en ESE orden",
    sound: "a big óuld blak BAG",
    gram: { trap: "a bag black old big" },
  },

  // ── ena2m3l4 — los adverbios de modo en -ly ──
  ena2m3slowly: {
    id: "ena2m3slowly", target: "slowly", source: "despacio, lentamente",
    sound: "SLÓU-li",
    gram: { trap: "Can you speak slow, please?", same: ["not quickly"] },
  },
  ena2m3quickly: { id: "ena2m3quickly", target: "quickly", source: "deprisa, rápido", sound: "KUÍK-li" },
  ena2m3quietly: { id: "ena2m3quietly", target: "quietly", source: "en voz baja, sin hacer ruido", sound: "KUÁI-et-li" },
  ena2m3badly: { id: "ena2m3badly", target: "badly", source: "mal", sound: "BAD-li" },
  ena2m3well: {
    id: "ena2m3well", target: "well", source: "bien — es el adverbio de good, y no lleva -ly",
    sound: "uel",
    gram: { trap: "She sings very good.", same: ["not badly"] },
  },
  ena2m3sheworkshard: {
    id: "ena2m3sheworkshard", target: "She works hard.", source: "Trabaja mucho.",
    sound: "shi uéeks JAAD",
    gram: { trap: "She works hardly.", same: ["She works a lot."] },
  },

  // ── ena2m3l5 — la clínica: el acento de las palabras largas ──
  ena2m3comfortable: { id: "ena2m3comfortable", target: "comfortable", source: "cómodo / cómoda", sound: "KAM-fta-bol (tres sílabas, no cuatro)" },
  ena2m3important: { id: "ena2m3important", target: "important", source: "importante", sound: "im-PÓO-tant" },
  ena2m3beautiful: { id: "ena2m3beautiful", target: "beautiful", source: "precioso / guapísima", sound: "BIÚU-ti-fol" },
  ena2m3difficult: { id: "ena2m3difficult", target: "difficult", source: "difícil", sound: "DÍ-fi-kalt" },
  ena2m3dangerous: { id: "ena2m3dangerous", target: "dangerous", source: "peligroso / peligrosa", sound: "DÉIN-ya-ras" },

  // ── ena2m3l6 — la posición: nada entre el verbo y su objeto ──
  ena2m3ireallylikethisfilm: {
    id: "ena2m3ireallylikethisfilm", target: "I really like this film.",
    source: "Esta película me gusta mucho.",
    sound: "ái RÍA-li láik dis FILM",
    gram: { trap: "I like very much this film.", same: ["I like this film a lot."] },
  },
  ena2m3shespeaksenglishverywell: {
    id: "ena2m3shespeaksenglishverywell", target: "She speaks English very well.",
    source: "Habla inglés muy bien.",
    sound: "shi spiiks ÍNG-lish ve-ri UÉL",
    gram: { trap: "She speaks very well English.", same: ["Her English is very good."] },
  },
  ena2m3ilikeitverymuch: {
    id: "ena2m3ilikeitverymuch", target: "I like it very much.",
    source: "Me gusta muchísimo.",
    sound: "ái láik it ve-ri MACH",
    gram: { trap: "I like very much it.", same: ["I like it a lot."] },
  },
  ena2m3often: { id: "ena2m3often", target: "often", source: "a menudo, muchas veces", sound: "Ó-fen (la t casi nunca suena)" },
  ena2m3heoftengoestothecinema: {
    id: "ena2m3heoftengoestothecinema", target: "He often goes to the cinema.",
    source: "Va al cine a menudo.",
    sound: "ji Ó-fen góus̬ tu de SÍ-ne-ma",
    gram: { trap: "He goes often to the cinema.", same: ["He goes to the cinema a lot."] },
  },

  // ── ena2m3l7 — frontera: -ed / -ing ──
  ena2m3iminterestedin: {
    id: "ena2m3iminterestedin", target: "I'm interested in films.",
    source: "Me interesan las películas.",
    sound: "áim ÍN-tres-tid in FILMS̬",
    gram: { trap: "I'm interesting in films.", same: ["I like films a lot."] },
  },
  ena2m3interesting: { id: "ena2m3interesting", target: "interesting", source: "interesante — así es LA COSA", sound: "ÍN-tres-ting" },
  ena2m3bored: {
    id: "ena2m3bored", target: "bored", source: "aburrido — así me siento YO",
    sound: "bood",
    gram: { trap: "The film was very bored.", same: ["not interested"] },
  },
  ena2m3boring: { id: "ena2m3boring", target: "boring", source: "aburrido — así es LA COSA (un tostón)", sound: "BÓO-ring" },
  ena2m3tiring: {
    id: "ena2m3tiring", target: "tiring", source: "cansado, que cansa — así es LA COSA",
    sound: "TÁI-a-ring",
    gram: { trap: "The day was very tired.", same: ["hard work"] },
  },
  ena2m3exciting: { id: "ena2m3exciting", target: "exciting", source: "emocionante", sound: "ik-SÁI-ting" },

  // ── ena2m3l8 — frontera: past continuous ──
  ena2m3whatwereyoudoing: { id: "ena2m3whatwereyoudoing", target: "What were you doing at six?", source: "¿Qué estabas haciendo a las seis?", sound: "uót ua yu DÚU-ing at siks" },
  ena2m3iwaswaitingforthebus: {
    id: "ena2m3iwaswaitingforthebus", target: "I was waiting for the bus.",
    source: "Estaba esperando el autobús.",
    sound: "ái uos̬ UÉI-ting fo de BAS",
    gram: { trap: "I was waiting the bus.", same: ["I was at the bus stop."] },
  },
  ena2m3while: { id: "ena2m3while", target: "while", source: "mientras", sound: "uáil" },
  ena2m3itwasrainingwhenileft: { id: "ena2m3itwasrainingwhenileft", target: "It was raining when I left.", source: "Estaba lloviendo cuando salí.", sound: "it uos̬ RÉI-ning uen ái LEFT" },

  // ── ena2m3l9 — el retrato hablado ──
  ena2m3helookslikehisdad: {
    id: "ena2m3helookslikehisdad", target: "He looks like his dad.",
    source: "Se parece a su padre.",
    sound: "ji luks láik jis̬ DAD",
    gram: { trap: "He looks his dad.", same: ["He's very like his dad."] },
  },
};

export const ena2m3: Phase = {
  id: "ena2m3",
  level: "a2",
  n: 3,
  title: "The woman in the red coat",
  goal: "Describir a una persona y una cosa: el orden de varios adjetivos, los graduadores quite / so / a bit, los adverbios de modo en -ly y —sobre todo— dónde se colocan, que es donde el español te traiciona. Y de propina, para reconocer: los adjetivos en -ed/-ing y el pasado continuo.",
  color: "#b91c1c",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — describir a alguien: lo que se ES y lo que se TIENE
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l1",
      phaseId: "ena2m3",
      title: "What does she look like?",
      subtitle: "Describir a una persona: lo que se ES y lo que se TIENE",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El retrato, pieza a pieza",
          itemIds: ["ena2m3whatdoesshelooklike", "ena2m3whatsshelike", "ena2m3longdarkhair", "ena2m3shorthair", "ena2m3blueeyes", "ena2m3glasses", "ena2m3abeard", "ena2m3hesinhisthirties", "entall", "enyoung"],
        },
        {
          kind: "note",
          note: {
            title: "Módulo 3: del «qué pasó» al «quién» y al «cómo»",
            body: "Los dos módulos anteriores te dieron el pasado: ya puedes contar lo que hiciste y lo que pasó. Pero un relato con verbos y sin gente es un parte meteorológico. Este módulo pone lo que falta:<br/><br/>1. <b>Describir</b> a las personas y a las cosas — y en el examen esto cae seguro: la Parte 3 del oral es literalmente «mira estas dos fotos y di en qué se parecen y en qué se diferencian».<br/>2. <b>Decir cómo se hace algo</b>: despacio, deprisa, bien, mal. Los adverbios en -ly.<br/>3. <b>Dónde se colocan.</b> Y esto no es un detalle: es <b>la trampa gorda del módulo</b>. Frases como <i>I like very much this film</i> o <i>She speaks very well English</i> son perfectas en español y no existen en inglés. Van enteras en la lección 6.<br/><br/>De regalo, dos cosas que se presentan para que las reconozcas y de las que no te vamos a examinar: los adjetivos en <b>-ed / -ing</b> (lección 7) y el <b>pasado continuo</b> (lección 8).",
          },
        },
        {
          kind: "note",
          note: {
            title: "Ser y tener, repartidos de otra manera",
            body: "Para describir a alguien, el inglés reparte el trabajo entre dos verbos, y no siempre igual que el español:<br/><br/><b>be</b> + adjetivo o número → cómo <i>es</i>: <i>She's tall. He's young. She's 25.</i> (la edad con <b>be</b>, como aprendiste en el A1: nunca <i>she has 25 years</i>).<br/><b>have</b> + sustantivo → lo que <i>tiene</i>: [[She has long dark hair.|Tiene el pelo largo y moreno.]] · <i>He has [[a beard|barba]].</i> · <i>She has [[big blue eyes|unos ojos azules grandes]].</i><br/><b>wear</b> → lo que lleva puesto: <i>She wears [[glasses|gafas]].</i><br/><br/><b>Y el adjetivo, delante y quieto</b>, como ya machacaste en el A1: <i>long hair</i>, no <i>hair long</i>. Ni plural ni femenino: <i>two tall women</i>.<br/><br/>Ojo a <b>hair</b>: en inglés es <b>incontable</b> y va en singular. «Tiene el pelo largo» es <i>long hair</i>; <i>hairs</i> son pelos sueltos, los que aparecen en la sopa.<br/><br/><b>Y ahora las dos preguntas que se confunden todo el rato:</b><br/>· [[What does she look like?|¿Cómo es de aspecto?]] → alta, morena, con gafas. <i>look like</i> es «tener pinta de».<br/>· [[What's she like?|¿Cómo es de carácter?]] → simpática, tímida, divertida.<br/>· <i>How is she?</i> es otra cosa: pregunta cómo <b>está</b>, de salud o de ánimo.<br/>Las tres se dicen «¿cómo es?» en español, y por eso sale el clásico <i>How is she like?</i>, que no es ninguna de las tres.",
            table: [
              ["español", "inglés", "por qué"],
              ["Es alta.", "She's tall.", "be + adjetivo"],
              ["Tiene 25 años.", "She's 25.", "la edad va con be, como en el A1"],
              ["Tiene el pelo largo.", "She has long hair.", "have + sustantivo, y el adjetivo DELANTE"],
              ["Lleva gafas.", "She wears glasses.", "gafas siempre en plural"],
              ["¿Cómo es? (aspecto)", "What does she look like?", "look like = tener pinta de"],
              ["¿Cómo es? (carácter)", "What's she like?", "sin look"],
              ["¿Cómo está?", "How is she?", "salud o ánimo, no descripción"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l1e1", type: "mc", prompt: "Las dos preguntas que suenan igual en español",
              question: "Quieres saber si es alta o baja, morena o rubia. ¿Qué preguntas?",
              options: ["What does she look like?", "What's she like?", "How is she?"],
              answer: 0,
              whyWrong: [null, "Esa pregunta por el carácter: te contestarían «she's very friendly»", "Esa pregunta cómo está: te contestarían «she's fine, thanks»"],
              itemIds: ["ena2m3whatdoesshelooklike", "ena2m3whatsshelike"],
              tip: "El truco está en look: si aparece, la pregunta es por el aspecto. Sin look, por el carácter.",
            },
            {
              id: "ena2m3l1e2", type: "fastmatch", prompt: "Calentamiento — estos adjetivos ya son tuyos del A1",
              pairs: [
                { target: "tall", source: "alto / alta" },
                { target: "young", source: "joven" },
                { target: "nice", source: "majo / simpático" },
                { target: "funny", source: "gracioso / divertido" },
                { target: "big", source: "grande" },
              ],
              targetSeconds: 25,
              itemIds: ["entall", "enyoung", "ennice", "enfunny", "enbig"],
              tip: "El A2 no empieza de cero: describir gente es media docena de adjetivos del A1 más el sitio donde ponerlos.",
            },
            {
              id: "ena2m3l1e3", type: "match", prompt: "Empareja las piezas del retrato",
              pairs: [
                { target: "long dark hair", source: "el pelo largo y moreno" },
                { target: "short hair", source: "el pelo corto" },
                { target: "big blue eyes", source: "unos ojos azules grandes" },
                { target: "a beard", source: "barba" },
                { target: "glasses", source: "gafas" },
              ],
              itemIds: ["ena2m3longdarkhair", "ena2m3shorthair", "ena2m3blueeyes", "ena2m3glasses", "ena2m3abeard"],
            },
            {
              id: "ena2m3l1e4", type: "bucket", prompt: "¿Va con IS o con HAS?",
              categories: ["She IS…", "She HAS…"],
              items: [
                { text: "tall", bucket: 0 },
                { text: "long hair", bucket: 1 },
                { text: "25", bucket: 0 },
                { text: "blue eyes", bucket: 1 },
                { text: "young", bucket: 0 },
                { text: "a nice jacket", bucket: 1 },
              ],
              itemIds: ["ena2m3longdarkhair", "ena2m3blueeyes", "entall", "enyoung", "enjacket"],
              tip: "Regla de bolsillo: si detrás hay un ADJETIVO, be. Si detrás hay un SUSTANTIVO, have. La edad es la excepción que ya conoces: va con be aunque sea un número.",
            },
            {
              id: "ena2m3l1e5", type: "cloze", prompt: "Completa con el verbo que toca",
              text: "Amy ___ long dark hair and green eyes.",
              answers: ["has"],
              translation: "Amy tiene el pelo largo y moreno, y los ojos verdes.",
              hints: ["Detrás viene un sustantivo (hair), no un adjetivo", "h…"],
              itemIds: ["ena2m3longdarkhair", "ena2m3green"],
            },
            {
              id: "ena2m3l1e6", type: "cloze", prompt: "Y ahora el otro verbo",
              text: "Ben ___ in his thirties and he has a beard.",
              answers: ["is", "'s"],
              translation: "Ben tiene treinta y tantos y lleva barba.",
              hints: ["La edad en inglés va con be, como «I'm 25 years old»", "i…"],
              itemIds: ["ena2m3hesinhisthirties", "ena2m3abeard"],
            },
            {
              id: "ena2m3l1e7", type: "errorfix", prompt: "Corrige el calco — este lo escribe todo el mundo",
              wrong: "She has the hair long.",
              answers: ["She has long hair."],
              why: "El español pone el adjetivo detrás y el artículo delante: «tiene EL pelo LARGO». El inglés hace las dos cosas al revés: el adjetivo va delante del sustantivo y no hay artículo, porque no hablas de un pelo concreto sino de cómo lo tiene. Y hair va en singular: es incontable.",
              translation: "Tiene el pelo largo.",
              itemIds: ["ena2m3longdarkhair"],
            },
            {
              id: "ena2m3l1e8", type: "errorfix", prompt: "Corrige el «tener» que en inglés es «ser»",
              wrong: "He has thirty.",
              answers: ["He is thirty."],
              why: "La edad, el hambre, el frío, el miedo y la suerte van en inglés con BE, no con have: I'm 25, I'm hungry, I was lucky. Es una lista cerrada — apréndetela entera y no vuelves a fallarla.",
              translation: "Tiene treinta años.",
              itemIds: ["ena2m3hesinhisthirties"],
            },
            {
              id: "ena2m3l1e9", type: "build", prompt: "Construye la descripción",
              target: "She has short dark hair and glasses",
              translation: "Tiene el pelo corto y moreno, y lleva gafas",
              distractors: ["the", "hairs"],
              itemIds: ["ena2m3shorthair", "ena2m3glasses"],
              tip: "Ni «the» ni «hairs» tienen sitio: sin artículo y en singular. Las fichas que sobran están ahí a propósito.",
            },
            {
              id: "ena2m3l1e10", type: "transform", prompt: "Añade lo que tiene",
              source: "Ben is tall.",
              instruction: "Añade que tiene barba, enlazando con and",
              answers: ["Ben is tall and he has a beard.", "Ben is tall and has a beard.", "Ben's tall and he has a beard."],
              translation: "Ben es alto y lleva barba.",
              hints: ["El segundo verbo no es be: lo que tiene va con have", "Ben is tall and he h… a beard."],
              itemIds: ["ena2m3abeard", "entall"],
            },
            {
              id: "ena2m3l1e11", type: "listen", prompt: "Dictado",
              text: "She has long dark hair and big blue eyes.",
              translation: "Tiene el pelo largo y moreno, y unos ojos azules grandes.",
              hints: ["Empieza por She has…", "She has long dark h… and big blue e…"],
              itemIds: ["ena2m3longdarkhair", "ena2m3blueeyes"],
            },
            {
              id: "ena2m3l1e12", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Tiene el pelo corto y lleva gafas.",
              answers: [
                "She has short hair and she wears glasses.",
                "She has short hair and wears glasses.",
                "He has short hair and he wears glasses.",
              ],
              hint: "dos verbos distintos: uno para lo que tiene y otro para lo que lleva puesto",
              itemIds: ["ena2m3shorthair", "ena2m3glasses", "enwear"],
            },
            {
              id: "ena2m3l1e13", type: "type", prompt: "Cierre de producción",
              question: "¿Cómo es tu hermana? — Es alta y tiene el pelo largo y moreno.",
              answers: [
                "What does your sister look like? She's tall and she has long dark hair.",
                "What does your sister look like? She's tall and has long dark hair.",
                "What does your sister look like? She is tall and she has long dark hair.",
              ],
              hints: ["La pregunta del aspecto lleva look", "What does your sister l… like? She's tall and she h… long dark hair."],
              itemIds: ["ena2m3whatdoesshelooklike", "ena2m3longdarkhair", "ensister"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m3-1",
            book: "She has long dark hair.",
            real: "She's got long dark hair.",
            meaning: "Tiene el pelo largo y moreno",
            when: "En Reino Unido, «have got» es lo NORMAL al hablar de lo que uno tiene: el pelo, un coche, hermanos, dolor de cabeza. «She has» no está mal —y en el examen escrito puntúa igual—, pero suena a libro. En Estados Unidos se prefiere «has» a secas.",
            register: "neutral",
            note: "El got no añade significado: es puro relleno británico. Y al hablar rápido «she's got» se funde en «shis̬-got», una sola pieza.",
            sound: "shis̬ got long daak JÉA",
            level: "a2",
            itemId: "ena2m3longdarkhair",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking: describing people", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca el vídeo de descripción de personas y apunta cada adjetivo que salga en una columna y cada sustantivo (hair, eyes, beard) en otra. Esa columna decide si va be o have." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — los graduadores: quite / so / a bit
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l2",
      phaseId: "ena2m3",
      title: "Quite tall, a bit shy",
      subtitle: "Graduar: bastante, tan, un poco — y el «poquito» que solo vale para lo malo",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Subir y bajar el volumen de un adjetivo",
          itemIds: ["ena2m3quitetall", "ena2m3abitshy", "ena2m3sonice", "ena2m3shy", "ena2m3friendly", "envery", "entooexpensive", "enheisverytall"],
        },
        {
          kind: "note",
          note: {
            title: "Cinco mandos de volumen, y dónde se colocan",
            body: "Del A1 traes dos: <b>very</b> (muy) y <b>too</b> (demasiado, y siempre es un problema: <i>[[too expensive|demasiado caro]]</i>). El A2 añade tres, y son justo los que pide el examen:<br/><br/><b>quite</b> = bastante. [[She's quite tall.|Es bastante alta.]] Va a medio camino entre «un poco» y «muy».<br/><b>so</b> = tan, qué. [[She's so nice!|¡Es majísima!]] Lleva emoción dentro: es el «¡qué maja es!» español, no una medida.<br/><b>a bit</b> = un poco. [[He's a bit shy.|Es un poco tímido.]]<br/><br/><b>Todos van DELANTE del adjetivo</b>, pegados a él: <i>quite tall</i>, <i>so nice</i>, <i>a bit shy</i>, <i>very friendly</i>. Nunca detrás.<br/><br/><b>Y ahora la regla que casi nadie te cuenta: «a bit» solo sirve para lo NEGATIVO.</b> <i>a bit shy</i>, <i>a bit tired</i>, <i>a bit expensive</i>, <i>a bit cold</i> — cosas que preferirías que no fueran así. Con algo bueno no se usa: <i>a bit nice</i> o <i>a bit beautiful</i> no significan nada. En español sí decimos «es un poco simpático», y de ahí sale el error. Si lo bueno hay que rebajarlo, el inglés usa <b>quite</b>: <i>She's quite friendly.</i><br/><br/>Y un aviso cultural que vale por diez notas: en boca británica <b>quite REBAJA</b>. «It's quite good» no es «está bastante bien» con entusiasmo, es «está bien, sin más». Si de verdad te ha encantado, di <i>really good</i> o <i>so good</i>.",
            table: [
              ["mando", "fuerza", "ejemplo", "ojo"],
              ["a bit", "un poco", "He's a bit shy.", "SOLO con lo negativo"],
              ["quite", "bastante", "She's quite tall.", "en boca británica, rebaja"],
              ["very / really", "muy", "She's very nice.", "el de siempre"],
              ["so", "tan / qué", "She's so nice!", "lleva emoción"],
              ["too", "demasiado", "It's too expensive.", "eso ya es un problema"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l2e1", type: "mc", prompt: "«Es un poco tímido»",
              question: "¿Cuál es la buena?",
              options: ["He's a bit shy.", "He's a bit of shy.", "He's shy a bit."],
              answer: 0,
              whyWrong: [null, "«a bit of» pide un sustantivo detrás: a bit of milk, a bit of luck", "El graduador va DELANTE del adjetivo, siempre"],
              itemIds: ["ena2m3abitshy", "ena2m3shy"],
            },
            {
              id: "ena2m3l2e2", type: "bucket", prompt: "¿Se puede decir con «a bit»?",
              categories: ["sí: es algo negativo", "no: es algo bueno"],
              items: [
                { text: "shy", bucket: 0 },
                { text: "tired", bucket: 0 },
                { text: "expensive", bucket: 0 },
                { text: "beautiful", bucket: 1 },
                { text: "friendly", bucket: 1 },
                { text: "nice", bucket: 1 },
              ],
              itemIds: ["ena2m3abitshy", "ena2m3friendly", "ena2m3beautiful", "ena2m1tired", "enexpensive", "ennice"],
              tip: "El español dice «un poco simpático» sin problema; el inglés no. Para rebajar algo bueno usa quite: she's quite friendly.",
            },
            {
              id: "ena2m3l2e3", type: "match", prompt: "Empareja cada mando con su fuerza",
              pairs: [
                { target: "a bit", source: "un poco (y solo para lo malo)" },
                { target: "quite", source: "bastante" },
                { target: "very", source: "muy" },
                { target: "so", source: "tan / qué (con emoción)" },
                { target: "too", source: "demasiado (ya es un problema)" },
              ],
              itemIds: ["ena2m3abitshy", "ena2m3quitetall", "ena2m3sonice", "envery", "entooexpensive"],
            },
            {
              id: "ena2m3l2e4", type: "cloze", prompt: "Completa el graduador",
              text: "The film was a ___ long, but I liked it.",
              answers: ["bit"],
              translation: "La película se hacía un poco larga, pero me gustó.",
              hints: ["«Un poco» son dos palabras y la primera ya está puesta", "a b…"],
              itemIds: ["ena2m3abitshy"],
            },
            {
              id: "ena2m3l2e5", type: "cloze", prompt: "Completa con emoción",
              text: "Amy is ___ nice! Everybody loves her.",
              answers: ["so"],
              translation: "¡Amy es majísima! Le cae bien a todo el mundo.",
              hints: ["No es una medida, es una exclamación", "s…"],
              itemIds: ["ena2m3sonice"],
            },
            {
              id: "ena2m3l2e6", type: "errorfix", prompt: "Corrige el «un poco» que en inglés no cabe",
              wrong: "She's a bit friendly.",
              answers: ["She's quite friendly."],
              why: "«a bit» solo acompaña a lo negativo: a bit shy, a bit tired, a bit expensive. Friendly es bueno, así que para rebajarlo el inglés usa quite. «A bit friendly» le suena a un nativo tan raro como a ti «es un poquito estupenda».",
              translation: "Es bastante simpática.",
              itemIds: ["ena2m3friendly", "ena2m3quitetall"],
            },
            {
              id: "ena2m3l2e7", type: "errorfix", prompt: "Corrige el falso amigo de «bastante»",
              wrong: "She's enough tall.",
              answers: ["She's quite tall."],
              why: "«Bastante» tiene dos traducciones y el español las confunde: quite = bastante en el sentido de «medianamente» (quite tall), y enough = suficiente, lo justo para algo (tall enough to play basketball). Y fíjate en la colocación: enough va DETRÁS del adjetivo, quite va delante.",
              translation: "Es bastante alta.",
              itemIds: ["ena2m3quitetall"],
            },
            {
              id: "ena2m3l2e8", type: "transform", prompt: "Súbele el volumen",
              source: "She's nice.",
              instruction: "Dilo con emoción: «¡Es majísima!»",
              answers: ["She's so nice!", "She is so nice!", "She's so nice"],
              translation: "¡Es majísima!",
              hints: ["Dos letras delante del adjetivo", "She's s… nice!"],
              itemIds: ["ena2m3sonice", "ennice"],
            },
            {
              id: "ena2m3l2e9", type: "build", prompt: "Construye la frase con dos graduadores",
              target: "He is a bit shy but he is very funny",
              translation: "Es un poco tímido, pero es divertidísimo",
              distractors: ["little", "too"],
              itemIds: ["ena2m3abitshy", "ena2m3shy", "enfunny"],
              tip: "«little» y «too» sobran: little no se usa así con adjetivos, y too diría que es demasiado divertido, que no es lo que quieres decir.",
            },
            {
              id: "ena2m3l2e10", type: "audiomc", prompt: "Dos datos en una frase — 2 escuchas, como en el examen",
              audio: "She's quite tall and she's very friendly.",
              question: "¿Cómo es?",
              options: ["Bastante alta y muy simpática", "Muy alta y bastante simpática", "Un poco alta y algo simpática"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Los dos graduadores están cambiados de sitio: quite va con tall y very con friendly", "«A bit» no suena en ninguna parte del audio"],
              itemIds: ["ena2m3quitetall", "ena2m3friendly"],
              tip: "La Parte 1 del Listening del A2 lleva DOS datos por frase. Aquí los dos datos son los graduadores, no los adjetivos: apunta los dos mientras suena.",
            },
            {
              id: "ena2m3l2e11", type: "hearreal", prompt: "¿Qué significa de verdad lo que has oído?",
              book: "It was quite good.",
              real: "It was all right, I suppose.",
              translation: "Estuvo bien, sin más.",
              ask: "meaning",
              meaningOptions: ["Estuvo bien, sin más", "Estuvo genial", "Estuvo fatal"],
              itemIds: ["ena2m3quitetall"],
              tip: "El británico rebaja en vez de entusiasmarse. «Quite good» y «all right, I suppose» dicen lo mismo: ni fu ni fa. Si te encantó, di really good.",
            },
            {
              id: "ena2m3l2e12", type: "type", prompt: "Cierre de producción",
              question: "Es bastante alta y un poco tímida, pero es majísima.",
              answers: [
                "She's quite tall and a bit shy, but she's so nice.",
                "She's quite tall and a bit shy, but she's so nice!",
                "She is quite tall and a bit shy, but she is so nice.",
              ],
              hints: ["Tres graduadores en una frase, los tres delante de su adjetivo", "She's q… tall and a b… shy, but she's s… nice."],
              itemIds: ["ena2m3quitetall", "ena2m3abitshy", "ena2m3sonice"],
              tip: "Ahí tienes el retrato de una persona en once palabras. Con esto ya contestas a «What's she like?».",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m3-2",
            book: "She's very nice.",
            real: "She's so lovely.",
            meaning: "Es un cielo / es un encanto",
            when: "Entre amigos y compañeros, hablando bien de alguien. En Reino Unido «lovely» se usa a todas horas y para casi todo (una persona, una tarde, una taza de té). En el Writing del examen, very nice o really kind: son las que enseñan la gramática que te puntúan.",
            register: "amigos",
            note: "so + adjetivo es el «qué maja es» español: lleva emoción, no medida. Y lovely ya lo traías del A1, solo que aplicado a cosas.",
            sound: "shis̬ sóu LAV-li",
            level: "a2",
            itemId: "ena2m3sonice",
          },
        },
      ],
      resources: [
        { label: "British Council — Intensifiers and mitigators", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/intensifiers-mitigators", note: "Lee solo la primera mitad (very, quite, a bit) y anota cada ejemplo con «a bit»: verás que todos son cosas malas. Ahí está la regla entera." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — el orden de varios adjetivos, y la ropa con IN
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l3",
      phaseId: "ena2m3",
      title: "A big old black bag",
      subtitle: "Cuando hay varios adjetivos, el inglés tiene un orden — y es siempre el mismo",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "La ropa, los colores y el bolso",
          itemIds: ["ena2m3thewomanintheredcoat", "ena2m3acoat", "ena2m3ascarf", "ena2m3boots", "ena2m3green", "ena2m3brown", "ena2m3abigoldblackbag", "enred", "enblack", "enjacket"],
        },
        {
          kind: "note",
          note: {
            title: "Opinión → tamaño → edad → color → sustantivo",
            body: "En español los adjetivos van detrás y se ordenan como suene: «un bolso negro, viejo y grande» o «un bolso grande, viejo y negro» dan igual, y encima se enlazan con comas y con «y».<br/><br/>En inglés van <b>todos delante del sustantivo</b>, <b>sin comas</b>, <b>sin and</b> y <b>en un orden fijo</b>. La versión de A2, que te cubre el 95 % de los casos, son cuatro casillas:<br/><br/><b>opinión</b> (lovely, nice, horrible) → <b>tamaño</b> (big, small, long, short) → <b>edad</b> (new, old) → <b>color</b> (red, black, [[green|verde]], [[brown|marrón]]) → <b>SUSTANTIVO</b><br/><br/>· a lovely little café<br/>· [[a big old black bag|un bolso negro, viejo y grande]]<br/>· a nice new red coat<br/><br/>Y como siempre, <b>ningún adjetivo cambia de forma</b>: <i>two big old black bags</i>.<br/><br/><b>El truco que te salva en el oral:</b> si dudas del orden, <b>di solo uno</b>. «a black bag» es perfecto e imposible de fallar. Nadie te va a bajar la nota por decir un adjetivo en vez de tres; sí te la bajan por decir <i>a bag black</i>.<br/><br/>¿Por qué existe este orden? Porque el inglés pone lo más subjetivo lejos del sustantivo y lo más pegado a la cosa —su color— justo al lado. Lo notarás: <i>a black big bag</i> le suena mal a un nativo aunque no sepa explicarte por qué, igual que a ti te suena mal «una roja bonita casa».",
            table: [
              ["opinión", "tamaño", "edad", "color", "sustantivo"],
              ["lovely", "little", "—", "—", "café"],
              ["—", "big", "old", "black", "bag"],
              ["nice", "—", "new", "red", "coat"],
              ["—", "long", "—", "dark", "hair"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Para señalar a alguien por lo que lleva: IN",
            body: "Cuando identificas a una persona por su ropa, el inglés usa <b>in</b>, no «of» ni «with»:<br/><br/>· [[the woman in the red coat|la mujer del abrigo rojo]]<br/>· the man in the blue jacket<br/>· the woman in glasses<br/><br/>El español dice «la mujer <b>del</b> abrigo rojo» y la mano se va sola a <i>of</i>. No existe. Piensa que en inglés la persona está <b>dentro</b> del abrigo, que es literalmente lo que pasa.<br/><br/>Y si prefieres el verbo, es <b>wear</b>, que ya traes del A1: <i>She's wearing a red coat.</i> Las dos valen; la de <b>in</b> es más corta y es la que se oye en la calle y en el examen cuando hay que distinguir a dos personas de una foto.",
            table: [
              ["español", "inglés"],
              ["la mujer del abrigo rojo", "the woman in the red coat"],
              ["el chico de la camisa blanca", "the boy in the white shirt"],
              ["la señora de las gafas", "the woman in glasses"],
              ["Lleva un abrigo rojo.", "She's wearing a red coat."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l3e1", type: "mc", prompt: "«Un bolso negro, viejo y grande»",
              question: "¿Cuál es la buena?",
              options: ["a big old black bag", "a black old big bag", "a bag big old black"],
              answer: 0,
              whyWrong: [null, "El color va el último de los tres, pegado al sustantivo: tamaño, edad, color", "En inglés los adjetivos van SIEMPRE delante del sustantivo"],
              itemIds: ["ena2m3abigoldblackbag"],
              tip: "Tamaño → edad → color. Y ni una coma: en inglés esa lista se escribe seguida.",
            },
            {
              id: "ena2m3l3e2", type: "bucket", prompt: "¿Este adjetivo es de tamaño o de color?",
              categories: ["tamaño", "color"],
              items: [
                { text: "big", bucket: 0 },
                { text: "red", bucket: 1 },
                { text: "little", bucket: 0 },
                { text: "green", bucket: 1 },
                { text: "long", bucket: 0 },
                { text: "brown", bucket: 1 },
              ],
              itemIds: ["ena2m3green", "ena2m3brown", "enbig", "enred"],
              tip: "Saber en qué casilla cae cada adjetivo es todo el ejercicio: el orden viene solo detrás.",
            },
            {
              id: "ena2m3l3e3", type: "match", prompt: "Empareja la ropa y los colores nuevos",
              pairs: [
                { target: "a coat", source: "un abrigo" },
                { target: "a scarf", source: "una bufanda" },
                { target: "boots", source: "botas" },
                { target: "green", source: "verde" },
                { target: "brown", source: "marrón" },
              ],
              itemIds: ["ena2m3acoat", "ena2m3ascarf", "ena2m3boots", "ena2m3green", "ena2m3brown"],
            },
            {
              id: "ena2m3l3e4", type: "cloze", prompt: "Completa la preposición",
              text: "Do you know the woman ___ the red coat?",
              answers: ["in"],
              translation: "¿Conoces a la mujer del abrigo rojo?",
              hints: ["El español dice «del», pero el inglés la mete DENTRO del abrigo", "i…"],
              itemIds: ["ena2m3thewomanintheredcoat", "ena2m3acoat"],
            },
            {
              id: "ena2m3l3e5", type: "build", prompt: "Construye la frase con tres adjetivos",
              target: "She has a lovely little green bag",
              translation: "Tiene un bolso verde, pequeño y precioso",
              distractors: ["bags", "and"],
              itemIds: ["ena2m3green", "enlovely"],
              tip: "«and» sobra: entre adjetivos que van delante del sustantivo, el inglés no lo pone. La lista va seguida y sin comas.",
            },
            {
              id: "ena2m3l3e6", type: "errorfix", prompt: "Corrige el orden",
              wrong: "I have a jacket black new.",
              answers: ["I have a new black jacket."],
              why: "Dos cosas a la vez, y las dos son el mismo reflejo español: los adjetivos van DELANTE del sustantivo, y entre ellos el orden es edad antes que color. new black jacket, nunca jacket black new.",
              translation: "Tengo una cazadora negra nueva.",
              itemIds: ["ena2m3abigoldblackbag", "enjacket", "ennew"],
            },
            {
              id: "ena2m3l3e7", type: "errorfix", prompt: "Corrige la preposición",
              wrong: "the woman of the red coat",
              answers: ["the woman in the red coat"],
              why: "«Del abrigo rojo» no es «of the red coat»: para identificar a alguien por su ropa el inglés usa IN. La persona está dentro de la prenda — the man in the blue jacket, the girl in glasses.",
              translation: "la mujer del abrigo rojo",
              itemIds: ["ena2m3thewomanintheredcoat"],
            },
            {
              id: "ena2m3l3e8", type: "transform", prompt: "Junta las dos frases en una",
              source: "It's a bag. It's black and it's big.",
              instruction: "Dilo en una sola frase, con los dos adjetivos delante",
              answers: ["It's a big black bag.", "It is a big black bag."],
              translation: "Es un bolso negro grande.",
              hints: ["Tamaño antes que color", "It's a b… bl… bag."],
              itemIds: ["ena2m3abigoldblackbag", "enbig", "enblack"],
            },
            {
              id: "ena2m3l3e9", type: "fastmatch", prompt: "Ráfaga de colores — dos son nuevos, tres ya eran tuyos",
              pairs: [
                { target: "red", source: "rojo" },
                { target: "blue", source: "azul" },
                { target: "black", source: "negro" },
                { target: "green", source: "verde" },
                { target: "brown", source: "marrón" },
              ],
              targetSeconds: 25,
              itemIds: ["enred", "enblue", "enblack", "ena2m3green", "ena2m3brown"],
            },
            {
              id: "ena2m3l3e10", type: "listen", prompt: "Dictado",
              text: "The woman in the red coat has short brown hair.",
              translation: "La mujer del abrigo rojo tiene el pelo corto y castaño.",
              hints: ["La preposición de la ropa es in", "The woman i… the red coat has short br… hair."],
              itemIds: ["ena2m3thewomanintheredcoat", "ena2m3brown", "ena2m3shorthair"],
            },
            {
              id: "ena2m3l3e11", type: "gapbank", prompt: "El mercadillo del sábado: rellena con la ficha que toca",
              text: "Last Saturday Valeria walked to the street market. She wanted a ___ old black bag, but it was too expensive. Amy liked the ___ boots, and the woman ___ the red coat helped them.",
              answers: ["big", "brown", "in"],
              bank: ["big", "brown", "in", "small", "green", "of"],
              translation: "El sábado pasado Valeria fue andando al mercadillo. Quería un bolso negro, viejo y grande, pero era demasiado caro. A Amy le gustaron las botas marrones, y la mujer del abrigo rojo las ayudó.",
              itemIds: ["ena2m3abigoldblackbag", "ena2m3brown", "ena2m3boots", "ena2m3thewomanintheredcoat", "ena2m1streetmarket"],
              tip: "El tercer hueco es el de verdad: «of» está ahí porque es lo que dicta el español. La ropa va con in.",
            },
            {
              id: "ena2m3l3e12", type: "type", prompt: "Cierre de producción",
              question: "La mujer del abrigo rojo tiene un bolso negro grande.",
              answers: [
                "The woman in the red coat has a big black bag.",
                "The woman in the red coat has a big black bag",
                "The woman in the red coat has got a big black bag.",
              ],
              hints: ["in para la ropa · tamaño antes que color", "The woman i… the red coat has a b… bl… bag."],
              itemIds: ["ena2m3thewomanintheredcoat", "ena2m3abigoldblackbag"],
              tip: "Ahí está el título del módulo entero y su regla: la ropa con in, los adjetivos delante y en orden.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Adjectives: order", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adjectives-order", note: "Lee la tabla completa (hay más casillas de las cuatro del A2) pero practica solo con dos adjetivos seguidos. Con tres ya casi nadie habla." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — los adverbios de modo en -ly, y su sitio básico
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l4",
      phaseId: "ena2m3",
      title: "Slowly, quickly, well",
      subtitle: "Cómo se hace algo: el «-mente» inglés y dónde se pone",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Los adverbios de modo",
          itemIds: ["ena2m3slowly", "ena2m3quickly", "ena2m3quietly", "ena2m3badly", "ena2m3well", "ena2m3sheworkshard", "enlistencarefully", "enverywell"],
        },
        {
          kind: "note",
          note: {
            title: "-ly es el «-mente» inglés",
            body: "Para decir CÓMO se hace algo, el inglés coge el adjetivo y le pega <b>-ly</b>. Es la misma operación que el español hace con «-mente», y sale igual de barata:<br/><br/>slow → [[slowly|despacio]] · quick → [[quickly|deprisa]] · quiet → [[quietly|en voz baja]] · bad → [[badly|mal]] · careful → carefully · easy → <b>easily</b> (la -y se vuelve -i, exactamente como en <i>studied</i>)<br/><br/><b>Y tres cosas que hay que saberse de memoria, porque no obedecen:</b><br/>1. <b>good → well</b>. No existe «goodly». <i>She speaks English [[well|bien]].</i><br/>2. <b>fast, hard, late, early</b> no llevan -ly: son adjetivo y adverbio a la vez. [[She works hard.|Trabaja mucho.]] · <i>He drives fast.</i><br/>3. Cuidado: <b>hardly</b> sí existe, pero significa <b>«apenas»</b>. <i>She hardly works</i> es «casi no trabaja», lo contrario de lo que querías decir. Es la palabra que más disgustos da del nivel.<br/><br/><b>La diferencia que decide todo:</b> el <b>adjetivo</b> describe a una persona o a una cosa (<i>She's quick</i>, «es rápida»); el <b>adverbio</b> describe la ACCIÓN (<i>She works quickly</i>, «trabaja deprisa»). El español hace lo mismo, pero con una trampa: muchas veces usamos el adjetivo tal cual donde el inglés obliga al adverbio — «habla rápido», «canta bonito», «conduce lento». De ahí sale <i>She speaks very quick</i>.",
            table: [
              ["adjetivo", "adverbio", "ejemplo"],
              ["slow", "slowly", "Can you speak more slowly?"],
              ["quick", "quickly", "She answered quickly."],
              ["quiet", "quietly", "Come in quietly."],
              ["bad", "badly", "He sings badly."],
              ["careful", "carefully", "Listen carefully."],
              ["easy", "easily", "She passed easily."],
              ["good", "well", "She speaks English well."],
              ["fast / hard / late", "fast / hard / late", "She works hard."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Dónde se pone: detrás del verbo — y si hay objeto, detrás del objeto",
            body: "El adverbio de modo va <b>después del verbo</b>:<br/>· <i>She works hard.</i> · <i>He drives slowly.</i> · <i>Come in quietly.</i><br/><br/>Y si el verbo lleva un objeto, el adverbio <b>espera a que termine el objeto</b>:<br/>· <i>She speaks <u>English</u> well.</i> · <i>He opened <u>the door</u> quietly.</i> · <i>I read <u>the letter</u> carefully.</i><br/><br/>Ese «espera» es la puerta de la lección 6, que es la trampa gorda del módulo: <b>entre el verbo y su objeto no se mete nada</b>. Vete acostumbrando desde aquí.<br/><br/><b>Y cuando hay varios complementos, el orden es CÓMO → DÓNDE → CUÁNDO:</b><br/><i>She sang beautifully at the party last night.</i><br/>El español los coloca como le apetece («anoche cantó de maravilla en la fiesta»). El inglés no: modo, lugar, tiempo, y en ese orden.",
            table: [
              ["", "cómo", "dónde", "cuándo"],
              ["She sang", "beautifully", "at the party", "last night."],
              ["He worked", "hard", "in the café", "yesterday."],
              ["We danced", "badly", "at the concert", "on Sunday."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l4e1", type: "match", prompt: "Empareja los adverbios",
              pairs: [
                { target: "slowly", source: "despacio" },
                { target: "quickly", source: "deprisa" },
                { target: "quietly", source: "en voz baja" },
                { target: "badly", source: "mal" },
                { target: "well", source: "bien" },
              ],
              itemIds: ["ena2m3slowly", "ena2m3quickly", "ena2m3quietly", "ena2m3badly", "ena2m3well"],
            },
            {
              id: "ena2m3l4e2", type: "bucket", prompt: "¿Describe cómo ES o cómo lo HACE?",
              categories: ["adjetivo: cómo ES", "adverbio: cómo lo HACE"],
              items: [
                { text: "She's quick", bucket: 0 },
                { text: "She works quickly", bucket: 1 },
                { text: "He's a bad driver", bucket: 0 },
                { text: "He drives badly", bucket: 1 },
                { text: "Her English is good", bucket: 0 },
                { text: "She speaks English well", bucket: 1 },
              ],
              itemIds: ["ena2m3quickly", "ena2m3badly", "ena2m3well"],
              tip: "Mira a quién califica: si a una persona o a una cosa, adjetivo. Si al verbo, adverbio con -ly.",
            },
            {
              id: "ena2m3l4e3", type: "cloze", prompt: "Completa con el adverbio de «slow»",
              text: "Can you speak more ___, please? I don't understand.",
              answers: ["slowly"],
              translation: "¿Puedes hablar más despacio, por favor? No te entiendo.",
              hints: ["Es la acción de hablar, no cómo eres tú", "slow + …"],
              itemIds: ["ena2m3slowly"],
              tip: "Guárdate esta frase entera: en el oral del examen puedes pedir que repitan o que hablen más despacio, y no te resta.",
            },
            {
              id: "ena2m3l4e4", type: "cloze", prompt: "Completa con el adverbio de «good»",
              text: "She plays the guitar very ___.",
              answers: ["well"],
              translation: "Toca la guitarra muy bien.",
              hints: ["No es «goodly»: es la única forma irregular de la lista", "w…"],
              itemIds: ["ena2m3well", "enguitar"],
            },
            {
              id: "ena2m3l4e5", type: "mc", prompt: "El adverbio de good",
              question: "good → …",
              options: ["well", "goodly", "gooder"],
              answer: 0,
              whyWrong: [null, "«goodly» no existe: good es el adjetivo y well es su adverbio", "«gooder» tampoco existe, ni como comparativo (es better)"],
              itemIds: ["ena2m3well"],
              tip: "well es la excepción más usada del inglés y la que más se falla. Aprendida esta, el resto son -ly a secas.",
            },
            {
              id: "ena2m3l4e6", type: "errorfix", prompt: "Corrige el adjetivo colado donde iba un adverbio",
              wrong: "She sings very good.",
              answers: ["She sings very well."],
              why: "«good» califica a una persona o a una cosa (a good singer, good music). Aquí lo que se califica es la ACCIÓN de cantar, y para eso el inglés obliga al adverbio: well. El español no obliga —«canta bien» y «es buena»—, y por eso este error sobrevive hasta B2.",
              translation: "Canta muy bien.",
              itemIds: ["ena2m3well"],
            },
            {
              id: "ena2m3l4e7", type: "errorfix", prompt: "Corrige el -ly que cambia el significado",
              wrong: "She works hardly.",
              answers: ["She works hard."],
              why: "hard ya es adverbio: «mucho, duro». Al ponerle -ly no lo refuerzas, lo conviertes en otra palabra: hardly significa «apenas», así que has dicho que casi no trabaja. Lo mismo pasa con late/lately y con near/nearly.",
              translation: "Trabaja mucho.",
              itemIds: ["ena2m3sheworkshard"],
            },
            {
              id: "ena2m3l4e8", type: "transform", prompt: "Del adjetivo al adverbio",
              source: "Ben is a careful driver.",
              instruction: "Dilo con un verbo y un adverbio",
              answers: ["Ben drives carefully.", "Ben drives very carefully."],
              translation: "Ben conduce con cuidado.",
              hints: ["El adjetivo careful se transforma como los demás", "Ben drives care…"],
              itemIds: ["enlistencarefully", "endriver"],
            },
            {
              id: "ena2m3l4e9", type: "build", prompt: "Construye la frase — y fíjate en dónde cae el adverbio",
              target: "She opened the door quietly",
              translation: "Abrió la puerta sin hacer ruido",
              distractors: ["quiet", "slow"],
              itemIds: ["ena2m3quietly", "endoor"],
              tip: "El objeto (the door) va pegado al verbo y el adverbio espera detrás. Esa es la regla que se explica entera en la lección 6.",
            },
            {
              id: "ena2m3l4e10", type: "gapbank", prompt: "Un día de Amy en el hospital: rellena con el adverbio que toca",
              text: "Amy works ___ at the hospital. She talks to people ___ and she listens ___. At home she cooks really ___.",
              answers: ["hard", "quietly", "carefully", "well"],
              bank: ["hard", "quietly", "carefully", "well", "badly", "slowly"],
              translation: "Amy trabaja mucho en el hospital. Habla con la gente en voz baja y escucha con atención. En casa cocina muy bien.",
              itemIds: ["ena2m3sheworkshard", "ena2m3quietly", "ena2m3well", "enlistencarefully", "enhospital"],
              tip: "El primer hueco es el único sin -ly, y no por descuido: hard ya es adverbio. «hardly» diría lo contrario.",
            },
            {
              id: "ena2m3l4e11", type: "listen", prompt: "Dictado — dos adverbios",
              text: "She listens carefully and she answers quickly.",
              translation: "Escucha con atención y contesta deprisa.",
              hints: ["Los dos acaban igual", "She listens care… and she answers quick…"],
              itemIds: ["enlistencarefully", "ena2m3quickly"],
            },
            {
              id: "ena2m3l4e12", type: "speak", prompt: "Dilo en voz alta — el orden cómo, dónde, cuándo",
              text: "She sang beautifully at the party last night.",
              phonetic: "shi sang BIÚU-ti-fli at de PAA-ti laast NÁIT",
              translation: "Anoche cantó de maravilla en la fiesta.",
              itemIds: ["ena2m3beautiful", "enlastnight"],
              tip: "Modo, lugar, tiempo. Si te sale en ese orden sin pensarlo, ya hablas con la sintaxis inglesa y no con la española.",
            },
            {
              id: "ena2m3l4e13", type: "type", prompt: "Cierre de producción",
              question: "Habla despacio y escucha con atención.",
              answers: [
                "She speaks slowly and she listens carefully.",
                "She speaks slowly and listens carefully.",
                "He speaks slowly and he listens carefully.",
              ],
              hints: ["Los dos adverbios van detrás de su verbo", "She speaks slow… and she listens care…"],
              itemIds: ["ena2m3slowly", "enlistencarefully"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m3-3",
            book: "He works very hard.",
            real: "He works his socks off.",
            meaning: "Trabaja como un burro / se deja la piel",
            when: "Entre amigos y compañeros, admirando a alguien que se mata a trabajar. Es informal pero cariñoso, nunca ofensivo. En el Writing del examen escribe la del libro: he works very hard.",
            register: "amigos",
            note: "Literalmente «trabaja hasta quedarse sin calcetines». El inglés tiene media docena de estas con off. Y ojo al hard sin -ly de la versión del libro.",
            sound: "ji uéeks jis̬ SOKS of",
            level: "a2",
            itemId: "ena2m3sheworkshard",
          },
        },
      ],
      resources: [
        { label: "British Council — Adverbials of manner", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adverbials-manner", note: "Lee la ficha y haz los ejercicios, pero apunta aparte los que NO llevan -ly (fast, hard, late, well). Esa lista corta es la que se falla." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — LA CLÍNICA DEL MÓDULO: el acento de las palabras largas
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l5",
      phaseId: "ena2m3",
      title: "Clínica de sonido: COMfortable",
      subtitle: "Palabras largas: dónde cae el golpe de voz, y por qué el español lo pone donde no es",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Las palabras largas del A2",
          itemIds: ["ena2m3comfortable", "ena2m3important", "ena2m3beautiful", "ena2m3difficult", "ena2m3dangerous", "enexpensive", "ena2m1terrible", "endelicious"],
        },
        {
          kind: "note",
          note: {
            title: "El inglés no escribe el acento, pero lo tiene — y decide si te entienden",
            body: "En español el acento es previsible, y cuando no lo es, lleva tilde: nadie duda de dónde va el golpe en «importante». El inglés <b>no escribe tildes</b>: el golpe de voz de cada palabra hay que aprendérselo con la palabra.<br/><br/>Y aquí llega el problema, que es tuyo y de todos los hispanohablantes: cuando la palabra se parece al español, la acentúas a la española. «Im-por-TAN-te» sale <i>im-por-TÁNT</i>, y el nativo tarda medio segundo en reconocerla — medio segundo que en una conversación es una eternidad.<br/><br/><b>La regla práctica del A2:</b> en las palabras largas que se parecen al español, <b>el inglés adelanta el golpe</b>. Casi siempre a la primera o a la segunda sílaba, casi nunca al final.<br/><br/>· [[comfortable|cómodo]] → <b>KAM</b>-fta-bol (¡tres sílabas, no cuatro!)<br/>· [[important|importante]] → im-<b>PÓO</b>-tant<br/>· [[beautiful|precioso]] → <b>BIÚU</b>-ti-fol<br/>· [[difficult|difícil]] → <b>DÍ</b>-fi-kalt<br/>· [[dangerous|peligroso]] → <b>DÉIN</b>-ya-ras<br/>· expensive → iks-<b>PEN</b>-siv (esta ya la traías del A1)<br/>· terrible → <b>TE</b>-ri-bol<br/>· delicious → di-<b>LÍ</b>-shas",
            table: [
              ["escrito", "sílabas de verdad", "suena"],
              ["comfortable", "3", "KAM-fta-bol"],
              ["important", "3", "im-PÓO-tant"],
              ["beautiful", "3", "BIÚU-ti-fol"],
              ["difficult", "3", "DÍ-fi-kalt"],
              ["dangerous", "3", "DÉIN-ya-ras"],
              ["expensive", "3", "iks-PEN-siv"],
              ["delicious", "3", "di-LÍ-shas"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y lo que no lleva el golpe se aplasta",
            body: "Esta es la otra mitad de la clínica, y es la que explica por qué no reconoces las palabras al oírlas. En inglés, <b>la sílaba sin golpe no se pronuncia despacio y clarita: se aplasta</b> hasta un sonido neutro y perezoso que en este curso escribimos como una «a» floja.<br/><br/>Por eso <i>comfortable</i> pierde una sílaba entera (la -or- se evapora: KAM-fta-bol) y <i>dangerous</i> termina en «-ras» y no en «-rous». Por eso también <i>difficult</i> acaba en «-kalt» y no en «-kult».<br/><br/><b>Consecuencia práctica, y es doble:</b><br/>1. <b>Al hablar</b>, si repartes el esfuerzo por igual entre todas las sílabas —como haces en español— suenas a robot y cuesta entenderte. Exagera el golpe y aplasta el resto: es justo al revés de lo que te pide el oído.<br/>2. <b>Al escuchar</b>, la palabra que buscas en el examen puede sonar la mitad de larga de lo que esperabas. Si esperas «kom-for-TÉI-bol» y suena «KAMftabol», no la oyes pasar.<br/><br/>Entrenamiento en dos gestos: dilas <b>golpeando fuerte una sola sílaba</b>, y cuenta las sílabas con los dedos antes de decirlas. Si te salen cuatro en comfortable, empieza otra vez.",
            table: [
              ["a la española (mal)", "en inglés (bien)"],
              ["kom-for-TÁ-ble", "KAM-fta-bol"],
              ["im-por-TÁNT", "im-PÓO-tant"],
              ["bi-u-ti-FUL", "BIÚU-ti-fol"],
              ["di-fi-KÚLT", "DÍ-fi-kalt"],
              ["dan-ye-RÓUS", "DÉIN-ya-ras"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l5e1", type: "mc", prompt: "Cuenta sílabas — la peor de todas",
              question: "«comfortable» tiene…",
              options: ["Tres sílabas: KAM-fta-bol", "Cuatro sílabas: kom-FOR-ta-bol", "Cuatro sílabas: KOM-for-tei-bol"],
              answer: 0,
              whyWrong: [null, "Esa es la lectura española: la -or- del medio no suena, se evapora", "Ni cuatro sílabas ni «tei»: la vocal del medio se aplasta"],
              itemIds: ["ena2m3comfortable"],
              tip: "comfortable es la palabra que más delata a un hispanohablante. Tres sílabas y golpe en la primera: KAM-fta-bol.",
            },
            {
              id: "ena2m3l5e2", type: "bucket", prompt: "¿El golpe cae en la PRIMERA sílaba o en la SEGUNDA?",
              categories: ["golpe en la 1ª", "golpe en la 2ª"],
              items: [
                { text: "comfortable", bucket: 0 },
                { text: "important", bucket: 1 },
                { text: "beautiful", bucket: 0 },
                { text: "expensive", bucket: 1 },
                { text: "difficult", bucket: 0 },
                { text: "delicious", bucket: 1 },
                { text: "dangerous", bucket: 0 },
                { text: "terrible", bucket: 0 },
              ],
              itemIds: ["ena2m3comfortable", "ena2m3important", "ena2m3beautiful", "ena2m3difficult", "ena2m3dangerous", "enexpensive", "endelicious", "ena2m1terrible"],
              tip: "Ninguna de las ocho lleva el golpe al final, que es justo donde lo pone el español. Esa es la moraleja de la lección.",
            },
            {
              id: "ena2m3l5e3", type: "mc", prompt: "El golpe de «dangerous»",
              question: "¿Dónde cae?",
              options: ["DAN-ge-rous", "dan-GE-rous", "dan-ge-ROUS"],
              answer: 0,
              whyWrong: [null, "El golpe se adelanta a la primera: DÉIN-ya-ras", "Y el final se aplasta del todo: «-ras», casi sin vocal"],
              itemIds: ["ena2m3dangerous"],
            },
            {
              id: "ena2m3l5e4", type: "match", prompt: "Empareja las palabras largas",
              pairs: [
                { target: "comfortable", source: "cómodo" },
                { target: "important", source: "importante" },
                { target: "beautiful", source: "precioso" },
                { target: "difficult", source: "difícil" },
                { target: "dangerous", source: "peligroso" },
              ],
              itemIds: ["ena2m3comfortable", "ena2m3important", "ena2m3beautiful", "ena2m3difficult", "ena2m3dangerous"],
            },
            {
              id: "ena2m3l5e5", type: "cloze", prompt: "Completa",
              text: "This sofa isn't very ___: it's old and hard.",
              answers: ["comfortable"],
              translation: "Este sofá no es muy cómodo: es viejo y duro.",
              hints: ["Tres sílabas y golpe en la primera", "KAM-fta-bol"],
              itemIds: ["ena2m3comfortable", "ensofa"],
            },
            {
              id: "ena2m3l5e6", type: "shadow", prompt: "Sombrea dos palabras largas seguidas — lento primero, luego normal",
              text: "It's a beautiful old flat, but it's very expensive.",
              phonetic: "its a BIÚU-ti-fol óuld FLAT, bat its ve-ri iks-PEN-siv",
              translation: "Es un piso antiguo precioso, pero es carísimo.",
              reps: 2,
              itemIds: ["ena2m3beautiful", "enexpensive", "enflat"],
              tip: "Fíjate en el desnivel: BIÚU y PEN suenan fuerte, todo lo demás se aplasta. Copia ese desnivel y ya suenas a inglés.",
            },
            {
              id: "ena2m3l5e7", type: "audiomc", prompt: "Reconocer la palabra larga al vuelo — 2 escuchas",
              audio: "The sofa is very comfortable, but it was quite expensive.",
              question: "¿Qué dice del sofá?",
              options: ["Que es cómodo pero costó bastante", "Que es incómodo y barato", "Que es cómodo y barato"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El but no niega el «comfortable»: introduce el precio", "«quite expensive» es lo contrario de barato"],
              itemIds: ["ena2m3comfortable", "enexpensive", "ensofa"],
              tip: "Las dos palabras que deciden la respuesta son las dos largas. Si no las reconoces al oírlas, la frase entera se cae.",
            },
            {
              id: "ena2m3l5e8", type: "hearreal", prompt: "¿Libro o calle? Lo que le pasa a comfortable al hablar rápido",
              book: "It's very comfortable.",
              real: "It's dead comfy.",
              translation: "Es comodísimo.",
              itemIds: ["ena2m3comfortable"],
              tip: "«comfy» es la prueba de la lección: la palabra se recorta justo por donde no llevaba el golpe. Y «dead» ahí significa «muy», puro britanismo.",
            },
            {
              id: "ena2m3l5e9", type: "fastmatch", prompt: "Ráfaga de palabras largas — solo el significado, sin pensar en el acento",
              pairs: [
                { target: "expensive", source: "caro" },
                { target: "terrible", source: "horrible" },
                { target: "delicious", source: "riquísimo" },
                { target: "important", source: "importante" },
                { target: "difficult", source: "difícil" },
              ],
              targetSeconds: 28,
              itemIds: ["enexpensive", "ena2m1terrible", "endelicious", "ena2m3important", "ena2m3difficult"],
            },
            {
              id: "ena2m3l5e10", type: "speak", prompt: "Golpea una sílaba y aplasta el resto",
              text: "It's a comfortable flat and it isn't very expensive.",
              phonetic: "its a KAM-fta-bol FLAT and it Í-s̬ent ve-ri iks-PEN-siv",
              translation: "Es un piso cómodo y no es muy caro.",
              itemIds: ["ena2m3comfortable", "enexpensive", "enflat"],
              tip: "Cuenta las sílabas de comfortable con los dedos antes de decirla. Si te salen cuatro, empieza otra vez.",
            },
            {
              id: "ena2m3l5e11", type: "listen", prompt: "Dictado — dos palabras largas",
              text: "It was a beautiful concert, but the tickets were expensive.",
              translation: "Fue un concierto precioso, pero las entradas eran caras.",
              hints: ["La primera empieza por beau…", "It was a beauti… concert, but the tickets were expen…"],
              itemIds: ["ena2m3beautiful", "enexpensive", "ena2m1concert", "enticket"],
            },
            {
              id: "ena2m3l5e12", type: "type", prompt: "Cierre de producción",
              question: "Es un piso precioso y muy cómodo, pero es carísimo.",
              answers: [
                "It's a beautiful flat and it's very comfortable, but it's very expensive.",
                "It's a beautiful flat and it's very comfortable, but it's too expensive.",
                "It is a beautiful flat and it is very comfortable, but it is very expensive.",
              ],
              hints: ["Tres palabras largas seguidas: beautiful, comfortable, expensive", "It's a beauti… flat and it's very comfort…, but it's very expen…"],
              itemIds: ["ena2m3beautiful", "ena2m3comfortable", "enexpensive"],
              tip: "Escríbela y después dila en voz alta contando sílabas: tres, tres y tres. Ni una más.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m3-4",
            book: "The house is very beautiful.",
            real: "The house is stunning.",
            meaning: "La casa es una preciosidad",
            when: "Entre amigos, valorando una casa, una vista, un vestido o una foto. Es entusiasta y muy común en Reino Unido. En el Writing del examen: very beautiful o really nice, que son las que enseñan el vocabulario que puntúa.",
            register: "amigos",
            note: "Y de paso, otra ración de clínica: stunning lleva el golpe en la primera — STA-ning, no stan-NÍNG.",
            sound: "de jáus is̬ STA-ning",
            level: "a2",
            itemId: "ena2m3beautiful",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — Pronunciation", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca la ficha de word stress y repite con el vídeo. Cinco minutos al día durante una semana: es lo que separa que te entiendan a la primera de que te pidan repetir." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — LA TRAMPA GORDA: nada entre el verbo y su objeto
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l6",
      phaseId: "ena2m3",
      title: "I really like this film",
      subtitle: "La trampa gorda del módulo: entre el verbo y su objeto no se mete nada",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Decir cuánto te gusta y cómo de bien se hace algo",
          itemIds: ["ena2m3ireallylikethisfilm", "ena2m3shespeaksenglishverywell", "ena2m3ilikeitverymuch", "ena2m3often", "ena2m3heoftengoestothecinema", "enalways", "ennever", "enverywell"],
        },
        {
          kind: "note",
          note: {
            title: "El verbo y su objeto no se separan. Nunca.",
            body: "Esta es <b>la lección del módulo</b>, y probablemente la más rentable del nivel. Léela dos veces.<br/><br/>En español, entre el verbo y lo que va detrás cabe cualquier cosa: «me gusta <u>mucho</u> esta peli», «habla <u>muy bien</u> inglés», «toca <u>muy bien</u> la guitarra». Suena perfecto. Y por eso todo hispanohablante escribe, tarde o temprano, <i>I like very much this film</i> — que en inglés no significa nada, porque <b>el objeto va pegado a su verbo y no se le separa jamás</b>.<br/><br/><b>Hay exactamente dos salidas, y las dos son fáciles:</b><br/><b>1. Pon el graduador DELANTE del verbo:</b> [[I really like this film.|Esta película me gusta mucho.]]<br/><b>2. Pon el bloque AL FINAL, detrás del objeto:</b> [[I like it very much.|Me gusta muchísimo.]] · [[She speaks English very well.|Habla inglés muy bien.]]<br/><br/>Cuál usar es cuestión de gusto: <i>really</i> delante es más natural al hablar; <i>very much</i> al final suena algo más formal y es la que encaja en un email de examen. Lo que no existe es la de en medio.<br/><br/>Y ojo a un detalle que confunde: <b>very much</b> y <b>a lot</b> van con el verbo (I like it very much / a lot), mientras que <b>very</b> a secas solo acompaña a adjetivos y adverbios (very nice, very well). <i>I like it very</i> no se dice.",
            table: [
              ["en español", "en inglés, mal", "en inglés, bien"],
              ["Me gusta mucho esta peli.", "I like very much this film.", "I really like this film."],
              ["Me gusta muchísimo.", "I like very much it.", "I like it very much."],
              ["Habla muy bien inglés.", "She speaks very well English.", "She speaks English very well."],
              ["Toca muy bien la guitarra.", "He plays very well the guitar.", "He plays the guitar very well."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y los de frecuencia van en otro sitio del que crees",
            body: "Los adverbios de frecuencia —<b>always, usually, [[often|a menudo]], sometimes, never</b>— ya los colocaste en el A1, pero merece la pena repetir la regla porque el pasado y las frases largas la vuelven a romper:<br/><br/>· <b>Delante del verbo normal</b>: [[He often goes to the cinema.|Va al cine a menudo.]] · <i>She never works on Sunday.</i><br/>· <b>Detrás de be</b>: <i>I'm often tired.</i> · <i>She's never late.</i><br/><br/>El español los pone al final o donde le apetece («voy al cine a menudo», «llego tarde a menudo»), y de ahí salen <i>I go often to the cinema</i> y <i>I am late often</i>.<br/><br/>Regla de bolsillo, y sirve para las dos mitades de esta lección: <b>en inglés, lo que modifica al verbo se pone DELANTE del verbo o al FINAL de todo — pero nunca en medio.</b>",
            table: [
              ["español", "inglés, mal", "inglés, bien"],
              ["Voy al cine a menudo.", "I go often to the cinema.", "I often go to the cinema."],
              ["Llego tarde a menudo.", "I am late often.", "I'm often late."],
              ["Nunca trabaja los domingos.", "She works never on Sunday.", "She never works on Sunday."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l6e1", type: "mc", prompt: "«Esta peli me gusta mucho»",
              question: "¿Cuál es la buena?",
              options: ["I really like this film.", "I like very much this film.", "I like much this film."],
              answer: 0,
              whyWrong: [null, "Ahí has metido «very much» entre el verbo y su objeto: ese es el orden español, no el inglés", "«much» solo no acompaña a un verbo en afirmativa: hace falta very much o a lot"],
              itemIds: ["ena2m3ireallylikethisfilm"],
              tip: "Dos salidas y ninguna en medio: really delante del verbo, o very much detrás del objeto.",
            },
            {
              id: "ena2m3l6e2", type: "mc", prompt: "«Habla inglés muy bien»",
              question: "¿Cuál es la buena?",
              options: ["She speaks English very well.", "She speaks very well English.", "She speaks very well the English."],
              answer: 0,
              whyWrong: [null, "El objeto (English) va pegado al verbo; el adverbio espera detrás", "Y además los idiomas no llevan artículo: English, no the English"],
              itemIds: ["ena2m3shespeaksenglishverywell"],
            },
            {
              id: "ena2m3l6e3", type: "bucket", prompt: "¿Está bien colocado o no?",
              categories: ["bien colocado", "mal colocado"],
              items: [
                { text: "I really like this film", bucket: 0 },
                { text: "I like very much this film", bucket: 1 },
                { text: "She speaks English very well", bucket: 0 },
                { text: "She speaks very well English", bucket: 1 },
                { text: "I often go to the cinema", bucket: 0 },
                { text: "I go often to the cinema", bucket: 1 },
              ],
              itemIds: ["ena2m3ireallylikethisfilm", "ena2m3shespeaksenglishverywell", "ena2m3heoftengoestothecinema", "ena2m3often"],
              tip: "Los tres malos tienen el mismo fallo: algo metido entre el verbo y lo que viene detrás. Es un solo error con tres disfraces.",
            },
            {
              id: "ena2m3l6e4", type: "errorfix", prompt: "Corrige el error más resistente del hispanohablante",
              wrong: "I like very much this film.",
              answers: ["I like this film very much."],
              why: "En inglés el objeto va pegado a su verbo: like this film. El «mucho» tiene que salir de en medio, y tiene dos sitios: delante del verbo (I really like this film) o al final de todo (I like this film very much). En español ese orden es natural, y por eso este error sobrevive hasta niveles altos si nadie lo nombra.",
              translation: "Esta película me gusta mucho.",
              itemIds: ["ena2m3ireallylikethisfilm", "ena2m3ilikeitverymuch"],
            },
            {
              id: "ena2m3l6e5", type: "errorfix", prompt: "El mismo error, otro disfraz",
              wrong: "She speaks very well English.",
              answers: ["She speaks English very well."],
              why: "Idéntico caso: English es el objeto de speaks y no se le separa. El adverbio de modo espera a que termine el objeto. Recuerda la lección 4: «She opened the door quietly», no «She opened quietly the door».",
              translation: "Habla inglés muy bien.",
              itemIds: ["ena2m3shespeaksenglishverywell"],
            },
            {
              id: "ena2m3l6e6", type: "errorfix", prompt: "Y ahora con un adverbio de frecuencia",
              wrong: "He goes often to the cinema.",
              answers: ["He often goes to the cinema."],
              why: "Los adverbios de frecuencia (always, usually, often, sometimes, never) van DELANTE del verbo normal y DETRÁS de be. El español los coloca al final, y por eso salen «I go often» o «I am late often».",
              translation: "Va al cine a menudo.",
              itemIds: ["ena2m3heoftengoestothecinema", "ena2m3often"],
            },
            {
              id: "ena2m3l6e7", type: "cloze", prompt: "Completa — el graduador va delante del verbo",
              text: "I ___ like this café: the coffee is great.",
              answers: ["really"],
              translation: "Este café me gusta mucho: el café está buenísimo.",
              hints: ["Seis letras, y significa «de verdad, mucho»", "r…"],
              itemIds: ["ena2m3ireallylikethisfilm", "encoffee"],
            },
            {
              id: "ena2m3l6e8", type: "transform", prompt: "La otra salida: el bloque al final",
              source: "I really like this film.",
              instruction: "Dilo con el bloque al final, en vez de delante del verbo",
              answers: ["I like this film very much.", "I like this film a lot."],
              translation: "Esta película me gusta mucho.",
              hints: ["El objeto se queda pegado al verbo y el «mucho» se va al final", "I like this film v… m…"],
              itemIds: ["ena2m3ilikeitverymuch", "ena2m3ireallylikethisfilm"],
            },
            {
              id: "ena2m3l6e9", type: "build", prompt: "Construye la frase con el adverbio de frecuencia",
              target: "She often works at the weekend",
              translation: "Trabaja los fines de semana a menudo",
              distractors: ["work", "always"],
              itemIds: ["ena2m3often", "enatweekend", "enwork"],
              tip: "often va delante del verbo, no al final. Y el verbo mantiene su -s de tercera persona: works.",
            },
            {
              id: "ena2m3l6e10", type: "gapbank", prompt: "Los viernes de Ben: rellena con la ficha que toca",
              text: "Ben ___ goes to the cinema on Fridays. He likes action films very ___, but he doesn't like horror films. His sister speaks English very ___, and she reads ___.",
              answers: ["often", "much", "well", "quickly"],
              bank: ["often", "much", "well", "quickly", "never", "slowly"],
              translation: "Ben va al cine a menudo los viernes. Las películas de acción le gustan mucho, pero las de terror no. Su hermana habla inglés muy bien y lee deprisa.",
              itemIds: ["ena2m3often", "ena2m3ilikeitverymuch", "ena2m3well", "ena2m3quickly", "enletsgotothecinema"],
              tip: "Fíjate en el segundo hueco: «very much» va detrás del objeto (action films), nunca entre likes y films.",
            },
            {
              id: "ena2m3l6e11", type: "audiomc", prompt: "Qué le gusta y qué no — 2 escuchas",
              audio: "I really like this café, but I don't like the music very much.",
              question: "¿Qué le gusta?",
              options: ["El café, pero no mucho la música", "La música, pero no el café", "Ni el café ni la música"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Está al revés: el «really like» va con el café", "El café sí le gusta: lo dice en la primera mitad"],
              itemIds: ["ena2m3ireallylikethisfilm", "ena2m3ilikeitverymuch"],
              tip: "Las dos mitades usan las DOS salidas: really delante del verbo, very much al final. Ninguna en medio.",
            },
            {
              id: "ena2m3l6e12", type: "write", prompt: "Contesta a Emma — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te escribe: «I need a good film for Saturday night. What do you like?». Contéstale por email.",
              bullets: [
                "Di qué película te gusta, con «I really like…» o «I like… a lot»",
                "Descríbela con un graduador (quite, so, a bit, very)",
                "Di algo que alguien hace de una manera concreta, con un adverbio",
              ],
              checks: [
                { re: "(i really like|i like .* a lot|i love)", label: "«I really like…» o «I like… a lot»" },
                { re: "(quite|so |a bit|very|really)", label: "un graduador (quite, so, a bit, very)" },
                { re: "(very well|really well|beautifully|badly|quickly|slowly|quietly|carefully)", label: "un adverbio de modo bien colocado" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi Emma! I really like an old Colombian film, Los pajaros. It's quite long, but it isn't boring: the story is very interesting and the actors speak slowly, so you understand everything. I like it very much. Watch it!",
              itemIds: ["ena2m3ireallylikethisfilm", "ena2m3ilikeitverymuch", "ena2m3slowly", "ena2m3quitetall"],
              tip: "Cuenta las palabras y revisa una sola cosa antes de darle a corregir: que no haya nada metido entre un verbo y su objeto. Es donde el corrector del examen te va a mirar.",
            },
            {
              id: "ena2m3l6e13", type: "type", prompt: "Cierre de producción",
              question: "Voy al cine a menudo y me gusta muchísimo.",
              answers: [
                "I often go to the cinema and I like it very much.",
                "I often go to the cinema and I really like it.",
                "I often go to the cinema and I like it a lot.",
              ],
              hints: ["often delante del verbo · very much al final", "I o… go to the cinema and I like it v… much."],
              itemIds: ["ena2m3heoftengoestothecinema", "ena2m3ilikeitverymuch", "ena2m3often"],
              tip: "Las dos reglas de la lección en una sola frase. Si te sale sin pararte a pensar, has cerrado el error más caro del nivel.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Adverbials: position", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adverbials-position", note: "Lee solo el apartado de mid position y end position, y busca en los ejemplos un solo caso de adverbio entre verbo y objeto. No lo vas a encontrar: esa es la lección." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — FRONTERA: -ed / -ing, por el significado y no por la etiqueta
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l7",
      phaseId: "ena2m3",
      title: "Bored or boring?",
      subtitle: "Frontera: cómo me siento YO, cómo es LA COSA",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Las dos caras del mismo adjetivo",
          itemIds: ["ena2m3iminterestedin", "ena2m3interesting", "ena2m3bored", "ena2m3boring", "ena2m3tiring", "ena2m3exciting", "ena2m1tired"],
        },
        {
          kind: "note",
          note: {
            title: "Dos terminaciones, una sola pregunta",
            body: "Hay una pareja de adjetivos que se parecen tanto que se confunden a diario: <i>bored</i> y <i>boring</i>, <i>interested</i> e <i>interesting</i>, <i>tired</i> y <i>tiring</i>.<br/><br/>No te lo aprendas por la etiqueta gramatical («participio pasado» y «participio presente»): esas palabras no te ayudan a decidir nada en mitad de una frase. Apréndete <b>la pregunta</b>:<br/><br/><b>-ed → cómo me siento YO</b> (o cómo se siente una persona). <i>I'm [[bored|aburrido: así me siento yo]].</i> · <i>I'm tired.</i> · [[I'm interested in films.|Me interesan las películas.]]<br/><b>-ing → cómo es LA COSA</b> que me lo provoca. <i>The film is [[boring|aburrido: así es la cosa]].</i> · <i>The day was [[tiring|que cansa]].</i> · <i>The book is [[interesting|interesante]].</i><br/><br/><b>Y el par que hunde conversaciones:</b><br/>· <b>I'm boring.</b> = «Soy un muermo» — así soy yo, aburro a los demás.<br/>· <b>I'm bored.</b> = «Estoy aburrido» — así me siento ahora mismo.<br/>Una letra de diferencia y un diagnóstico completamente distinto sobre tu persona.<br/><br/><b>El error nº 1 del hispanohablante en este bloque:</b> «me interesa la música» → <i>I'm <b>interested</b> in music</i>. Con -ing («I'm interesting in music») has dicho «soy interesante en la música», que no significa nada. Y ojo a la preposición: <b>interested IN</b>, nunca «interested for» ni «interested about».<br/><br/><b>Aviso honesto:</b> esto es <b>frontera</b>. LanguageCert lo coloca en su lista de B1, así que no te va a caer para producirlo; Cambridge sí lo evalúa en A2, y en la calle sale cada dos frases. Aquí se presenta para que lo reconozcas y lo puedas usar si te sale — no para examinarte de ello.",
            table: [
              ["la cosa (-ing)", "yo (-ed)"],
              ["The film is boring.", "I'm bored."],
              ["The book is interesting.", "I'm interested in it."],
              ["The day was tiring.", "I was tired."],
              ["The match was exciting.", "We were excited."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l7e1", type: "mc", prompt: "«Me interesan las películas»",
              question: "¿Cuál es la buena?",
              options: ["I'm interested in films.", "I'm interesting in films.", "I'm interested for films."],
              answer: 0,
              whyWrong: [null, "Con -ing has dicho que TÚ eres interesante, no que la película te interese", "La preposición es in: interested in, siempre"],
              itemIds: ["ena2m3iminterestedin"],
              tip: "Dos cosas en una frase: la terminación -ed porque hablas de lo que sientes, y la preposición in, que va pegada.",
            },
            {
              id: "ena2m3l7e2", type: "bucket", prompt: "¿Habla de la PERSONA o de la COSA?",
              categories: ["cómo me siento (-ed)", "cómo es la cosa (-ing)"],
              items: [
                { text: "bored", bucket: 0 },
                { text: "boring", bucket: 1 },
                { text: "tired", bucket: 0 },
                { text: "tiring", bucket: 1 },
                { text: "interested", bucket: 0 },
                { text: "interesting", bucket: 1 },
              ],
              itemIds: ["ena2m3bored", "ena2m3boring", "ena2m3tiring", "ena2m3interesting", "ena2m1tired"],
              tip: "-ed mira hacia dentro (lo que siento), -ing mira hacia fuera (lo que lo provoca). Una sola pregunta y se acabó la duda.",
            },
            {
              id: "ena2m3l7e3", type: "mc", prompt: "El par que hunde conversaciones",
              question: "«I'm boring» significa…",
              options: ["Soy un muermo", "Estoy aburrido ahora mismo", "Me aburren las cosas"],
              answer: 0,
              whyWrong: [null, "Eso sería «I'm bored», con -ed", "Eso también sería con -ed: «I get bored easily»"],
              itemIds: ["ena2m3boring", "ena2m3bored"],
              tip: "Si en una fiesta dices «I'm boring», acabas de anunciar que aburres a la gente. Con -ed dices que la fiesta no te está gustando, que ya es otra cosa.",
            },
            {
              id: "ena2m3l7e4", type: "cloze", prompt: "Completa — se habla de la película",
              text: "The film was three hours long. It was very ___.",
              answers: ["boring"],
              translation: "La película duraba tres horas. Era aburridísima.",
              hints: ["¿Quién es aburrido, la peli o tú?", "bor…"],
              itemIds: ["ena2m3boring", "ena2m1shewatchedafilm"],
            },
            {
              id: "ena2m3l7e5", type: "cloze", prompt: "Completa — se habla de ti",
              text: "I'm ___ in English films and English books.",
              answers: ["interested"],
              translation: "Me interesan las películas y los libros en inglés.",
              hints: ["Aquí hablas de lo que TÚ sientes", "interest…"],
              itemIds: ["ena2m3iminterestedin", "enbook"],
            },
            {
              id: "ena2m3l7e6", type: "errorfix", prompt: "Corrige el error nº 1 de este bloque",
              wrong: "I'm very interesting in music.",
              answers: ["I'm very interested in music."],
              why: "-ing describe a la cosa que provoca el sentimiento, así que «I'm interesting» dice que tú eres interesante. Para decir que algo te interesa, la terminación es -ed: I'm interested in music. Y la preposición, in.",
              translation: "Me interesa mucho la música.",
              itemIds: ["ena2m3iminterestedin"],
            },
            {
              id: "ena2m3l7e7", type: "errorfix", prompt: "Corrige la terminación",
              wrong: "The film was very bored.",
              answers: ["The film was very boring."],
              why: "Una película no siente nada: no puede estar aburrida. Lo que puede es aburrir, y para eso el inglés usa -ing. Las cosas llevan -ing (boring, tiring, interesting); las personas, -ed (bored, tired, interested).",
              translation: "La película era aburridísima.",
              itemIds: ["ena2m3boring", "ena2m3bored"],
            },
            {
              id: "ena2m3l7e8", type: "match", prompt: "Empareja cada forma con su significado",
              pairs: [
                { target: "bored", source: "aburrido: así me siento yo" },
                { target: "boring", source: "aburrido: así es la cosa" },
                { target: "tiring", source: "que cansa" },
                { target: "exciting", source: "emocionante" },
                { target: "interested in", source: "interesado en, me interesa" },
              ],
              itemIds: ["ena2m3bored", "ena2m3boring", "ena2m3tiring", "ena2m3exciting", "ena2m3iminterestedin"],
            },
            {
              id: "ena2m3l7e9", type: "transform", prompt: "Dilo desde ti",
              source: "The book is interesting.",
              instruction: "Dilo desde ti, con -ed y su preposición",
              answers: ["I'm interested in the book.", "I am interested in the book."],
              translation: "El libro me interesa.",
              hints: ["Cambias de sujeto: ya no habla el libro, hablas tú", "I'm interest… i… the book."],
              itemIds: ["ena2m3iminterestedin", "ena2m3interesting", "enbook"],
            },
            {
              id: "ena2m3l7e10", type: "build", prompt: "Construye la frase — ojo a las dos terminaciones",
              target: "It was a long and tiring day",
              translation: "Fue un día largo y agotador",
              distractors: ["tired", "boring"],
              itemIds: ["ena2m3tiring", "ena2m1tired"],
              tip: "El día no está cansado: cansa. Por eso tiring y no tired. «tired» está ahí a propósito.",
            },
            {
              id: "ena2m3l7e11", type: "audiomc", prompt: "Qué fue emocionante y qué fue cansado — 2 escuchas",
              audio: "The concert was exciting, but the bus home was very tiring.",
              question: "¿Qué fue cansado?",
              options: ["La vuelta a casa en autobús", "El concierto", "Las dos cosas"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Del concierto dice exciting, que es lo contrario", "El but separa las dos mitades: una buena y otra no"],
              itemIds: ["ena2m3exciting", "ena2m3tiring", "ena2m1concert", "enbus"],
              tip: "Las dos palabras clave acaban en -ing porque las dos describen COSAS: el concierto y el viaje. Si oyeras «tired», hablaría de una persona.",
            },
            {
              id: "ena2m3l7e12", type: "type", prompt: "Cierre de producción",
              question: "La película era aburrida y yo estaba cansada.",
              answers: [
                "The film was boring and I was tired.",
                "The film was boring, and I was tired.",
                "The film was boring and I was very tired.",
              ],
              hints: ["La peli aburre (-ing) · tú lo sientes (-ed)", "The film was bor… and I was tir…"],
              itemIds: ["ena2m3boring", "ena2m1tired"],
              tip: "Las dos terminaciones en una frase de siete palabras. Si te sale esta, ya no vuelves a decir «I'm boring» en una fiesta.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m3-5",
            book: "I was very bored.",
            real: "I was bored stiff.",
            meaning: "Me aburrí como una ostra",
            when: "Entre amigos, contando una charla, una reunión o una película insufrible. Muy común en Reino Unido y nada grosero. En el Writing del examen: very bored o really bored.",
            register: "amigos",
            note: "stiff es «tieso»: tan aburrido que te quedas rígido. Y fíjate en que sigue siendo -ed, porque quien se aburre eres tú.",
            sound: "ái uos̬ bood STIF",
            level: "a2",
            itemId: "ena2m3bored",
          },
        },
      ],
      resources: [
        { label: "British Council — Adjectives ending in -ed and -ing", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adjectives-ed-ing", note: "Lee la ficha y haz los ejercicios. Cuando falles uno, pregúntate solo esto: ¿esto siente algo o lo provoca? La etiqueta gramatical no hace falta." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — FRONTERA: past continuous, el fondo de la escena
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l8",
      phaseId: "ena2m3",
      title: "What were you doing?",
      subtitle: "Frontera: qué estabas haciendo cuando pasó lo otro",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "El fondo de la escena",
          itemIds: ["ena2m3whatwereyoudoing", "ena2m3iwaswaitingforthebus", "ena2m3while", "ena2m3itwasrainingwhenileft", "ena2m1weweretired", "enwhatareyoudoing"],
        },
        {
          kind: "note",
          note: {
            title: "was/were + -ing: dos piezas tuyas, juntas",
            body: "Aquí no hay nada nuevo que memorizar. Ya sabes decir <i>I'm working</i> (el continuo, del módulo 9 del A1) y ya sabes <b>was</b> y <b>were</b> (del módulo 1 de este nivel). Júntalos y tienes el <b>pasado continuo</b>: <i>I was working</i>.<br/><br/><b>¿Para qué sirve?</b> Para el <b>fondo</b> de una escena: lo que ya estaba pasando cuando ocurrió otra cosa.<br/><br/>· [[I was waiting for the bus.|Estaba esperando el autobús.]] <b>when</b> it started to rain → esperar es el fondo (largo), empezar a llover es el suceso (corto).<br/>· <b>[[While|Mientras]]</b> I was cooking, Amy phoned.<br/>· [[It was raining when I left.|Estaba lloviendo cuando salí.]]<br/><br/><b>Regla de bolsillo:</b> <b>when</b> + lo que <i>pasó</i> (pasado simple) · <b>while</b> + lo que <i>estaba pasando</i> (continuo).<br/><br/>Ojo a una preposición que el español no pone: <b>wait FOR</b>. «Esperar el autobús» es <i>wait for the bus</i>; <i>wait the bus</i> no existe.<br/><br/><b>Y el aviso honesto, como en la lección anterior:</b> esto es <b>frontera</b>. LanguageCert lo lista en B1 y no te lo va a pedir en el A2; Cambridge sí lo evalúa. Aquí se presenta para que lo <b>reconozcas al oírlo</b> —que es donde se cobra, en el Listening— y lo uses si te sale. Tu tiempo de pasado sigue siendo el simple, y ese es el que te examinan.",
            table: [
              ["A1 (presente)", "aquí (pasado)"],
              ["I'm working.", "I was working."],
              ["She's cooking.", "She was cooking."],
              ["They're waiting.", "They were waiting."],
              ["What are you doing?", "What were you doing?"],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "at six",
              pastExample: "I was waiting for the bus.",
              nowLabel: "now",
              nowExample: "I'm waiting for the bus.",
            },
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l8e1", type: "mc", prompt: "«¿Qué estabas haciendo a las seis?»",
              question: "¿Cuál es la buena?",
              options: ["What were you doing at six?", "What did you doing at six?", "What you were doing at six?"],
              answer: 0,
              whyWrong: [null, "did y el continuo no se mezclan: el auxiliar del continuo es was/were", "Falta la inversión: el verbo va delante del sujeto en la pregunta"],
              itemIds: ["ena2m3whatwereyoudoing"],
            },
            {
              id: "ena2m3l8e2", type: "transform", prompt: "Del presente continuo al pasado continuo",
              source: "I'm waiting for the bus.",
              instruction: "Ponla en pasado",
              answers: ["I was waiting for the bus.", "I was waiting for the bus"],
              translation: "Estaba esperando el autobús.",
              hints: ["Solo cambia el auxiliar: am → …", "I w… waiting for the bus."],
              itemIds: ["ena2m3iwaswaitingforthebus", "enbusstop"],
            },
            {
              id: "ena2m3l8e3", type: "bucket", prompt: "¿Es el FONDO de la escena o el SUCESO?",
              categories: ["fondo: was/were + -ing", "suceso: pasado simple"],
              items: [
                { text: "I was walking home", bucket: 0 },
                { text: "it started to rain", bucket: 1 },
                { text: "she was cooking dinner", bucket: 0 },
                { text: "Ben phoned", bucket: 1 },
                { text: "we were watching a film", bucket: 0 },
                { text: "the film finished", bucket: 1 },
              ],
              itemIds: ["ena2m3iwaswaitingforthebus", "ena2m1phoned", "ena2m1shewatchedafilm"],
              tip: "El fondo dura y el suceso corta. Por eso el fondo va en continuo y el suceso, en pasado simple.",
            },
            {
              id: "ena2m3l8e4", type: "cloze", prompt: "Completa el auxiliar",
              text: "I ___ waiting for the bus when Ben arrived.",
              answers: ["was"],
              translation: "Estaba esperando el autobús cuando llegó Ben.",
              hints: ["Con I, el auxiliar del pasado es…", "w…"],
              itemIds: ["ena2m3iwaswaitingforthebus", "ena2m1arrived"],
            },
            {
              id: "ena2m3l8e5", type: "cloze", prompt: "Completa el conector",
              text: "___ I was cooking, Amy phoned.",
              answers: ["While"],
              translation: "Mientras cocinaba, llamó Amy.",
              hints: ["«Mientras», y va con lo que estaba pasando", "W…"],
              itemIds: ["ena2m3while", "ena2m1phoned"],
            },
            {
              id: "ena2m3l8e6", type: "errorfix", prompt: "Corrige la preposición que el español no pone",
              wrong: "I was waiting the bus.",
              answers: ["I was waiting for the bus."],
              why: "En español «esperar» lleva el objeto directo pegado («esperaba el autobús»); en inglés wait pide FOR. Es de la misma familia que listen TO y look AT: verbos que en español no llevan preposición y en inglés sí.",
              translation: "Estaba esperando el autobús.",
              itemIds: ["ena2m3iwaswaitingforthebus"],
            },
            {
              id: "ena2m3l8e7", type: "build", prompt: "Construye la escena completa",
              target: "It was raining when I left the house",
              translation: "Estaba lloviendo cuando salí de casa",
              distractors: ["rained", "while"],
              itemIds: ["ena2m3itwasrainingwhenileft", "ena2m1itrained"],
              tip: "«while» sobra: va con el fondo, y aquí el fondo ya abre la frase. Detrás de when va el suceso corto, en pasado simple.",
            },
            {
              id: "ena2m3l8e8", type: "listen", prompt: "Dictado",
              text: "I was walking home when it started to rain.",
              translation: "Iba andando a casa cuando empezó a llover.",
              hints: ["Empieza por el fondo: I was…", "I w… walking home when it started to rain."],
              itemIds: ["ena2m3itwasrainingwhenileft", "ena2m1itrained"],
            },
            {
              id: "ena2m3l8e9", type: "audiomc", prompt: "Dos fondos y un suceso — 2 escuchas",
              audio: "I was cooking dinner when Amy phoned. She was waiting at the station.",
              question: "¿Qué estaba haciendo Amy?",
              options: ["Esperar en la estación", "Cocinar la cena", "Volver a casa en autobús"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso lo hacía quien habla, no Amy", "El autobús no suena en el audio"],
              itemIds: ["ena2m3iwaswaitingforthebus", "ena2m1phoned", "enstation"],
              tip: "Dos personas y dos fondos en dos frases. Lo que decide la respuesta es el sujeto de cada was, no el verbo.",
            },
            {
              id: "ena2m3l8e10", type: "speak", prompt: "Dilo en voz alta — fondo y suceso en la misma frase",
              text: "I was waiting for the bus when it started to rain.",
              phonetic: "ái uos̬ UÉI-ting fo de BAS uen it STAA-tid tu RÉIN",
              translation: "Estaba esperando el autobús cuando empezó a llover.",
              itemIds: ["ena2m3iwaswaitingforthebus", "ena2m3itwasrainingwhenileft"],
              tip: "Fíjate en el desnivel: was y for casi no suenan (son formas débiles), y UÉI-ting y BAS suenan fuerte. Ese contraste es el ritmo inglés.",
            },
            {
              id: "ena2m3l8e11", type: "type", prompt: "Cierre de producción",
              question: "Estaba esperando el autobús cuando empezó a llover.",
              answers: [
                "I was waiting for the bus when it started to rain.",
                "I was waiting for the bus when it started raining.",
                "I was waiting for the bus when it began to rain.",
              ],
              hints: ["El fondo en continuo, el suceso en pasado simple, y wait FOR", "I was waiting f… the bus when it started to rain."],
              itemIds: ["ena2m3iwaswaitingforthebus", "ena2m3itwasrainingwhenileft", "ena2m1itrained"],
              tip: "Frontera cerrada: si la reconoces al oírla y te sale al escribirla, ya vas por delante de lo que te van a pedir en el A2.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Past continuous", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-continuous", note: "Léelo, pero no te obsesiones: en tu examen esto no se produce, se reconoce. Dedícale diez minutos y vuelve al pasado simple, que es lo que puntúa." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — todo junto: el retrato hablado (la misión del módulo)
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m3l9",
      phaseId: "ena2m3",
      title: "Describe someone in one minute",
      subtitle: "Todo el módulo junto — y un retrato que otro pueda reconocer",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar el retrato",
          itemIds: ["ena2m3helookslikehisdad", "ena2m3whatdoesshelooklike", "ena2m3whatsshelike", "ena2m3thewomanintheredcoat", "ena2m1howaboutyou"],
        },
        {
          kind: "note",
          note: {
            title: "El retrato en cuatro pasos",
            body: "En el oral del examen te van a enseñar dos fotos y te van a pedir semejanzas y diferencias; y en la última parte, un minuto hablando solo. Las dos cosas se resuelven con el mismo esqueleto de <b>cuatro pasos</b>. No hace falta más:<br/><br/><b>1. Aspecto</b> — be + adjetivo, have + sustantivo: <i>She's quite tall and she has short dark hair. She wears glasses.</i><br/><b>2. Ropa</b> — con in: <i>She's [[the woman in the red coat|la mujer del abrigo rojo]].</i><br/><b>3. Carácter</b> — con graduador: <i>She's very friendly, but she's a bit shy.</i><br/><b>4. Qué hace y cómo</b> — verbo + adverbio, y el adverbio DETRÁS del objeto: <i>She works hard and she speaks English very well.</i><br/><br/>Y el remate que siempre gusta: [[He looks like his dad.|Se parece a su padre.]] — parecerse a alguien es <b>look like</b>, con su <i>like</i> obligatorio.<br/><br/>Recuerda las dos preguntas de la lección 1, porque en el examen te pueden hacer cualquiera de las dos: <b>What does she look like?</b> (aspecto) y <b>What's she like?</b> (carácter).",
            table: [
              ["paso", "qué dices", "ejemplo"],
              ["1. aspecto", "be + adjetivo · have + sustantivo", "She's quite tall and she has short dark hair."],
              ["2. ropa", "in + prenda", "She's the woman in the red coat."],
              ["3. carácter", "graduador + adjetivo", "She's very friendly, but she's a bit shy."],
              ["4. lo que hace", "verbo + objeto + adverbio", "She speaks English very well."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m3l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya lo tienes",
              pairs: [
                { target: "quite", source: "bastante" },
                { target: "a bit", source: "un poco" },
                { target: "so", source: "tan / qué" },
                { target: "well", source: "bien" },
                { target: "slowly", source: "despacio" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m3quitetall", "ena2m3abitshy", "ena2m3sonice", "ena2m3well", "ena2m3slowly"],
              tip: "El cronómetro solo premia. Si sale sin pensar, está consolidado; si te paras, ese ítem volverá en el repaso.",
            },
            {
              id: "ena2m3l9e2", type: "gapbank", prompt: "Nora, la vecina: rellena con la ficha que toca",
              text: "Nora is my neighbour. She has short white hair and she ___ glasses. She's the woman ___ the green coat. She talks very ___, so I understand everything. She's a bit ___, but she's so nice.",
              answers: ["wears", "in", "slowly", "shy"],
              bank: ["wears", "in", "slowly", "shy", "quickly", "on"],
              translation: "Nora es mi vecina. Tiene el pelo corto y blanco, y lleva gafas. Es la mujer del abrigo verde. Habla muy despacio, así que la entiendo todo. Es un poco tímida, pero es majísima.",
              itemIds: ["ena2m3glasses", "ena2m3thewomanintheredcoat", "ena2m3slowly", "ena2m3shy", "ena2m3green"],
              tip: "El tercer hueco lo decide el «so I understand everything»: si hablara deprisa, no la entenderías. En el examen, la mitad de los huecos se resuelven así, por lo que viene después.",
            },
            {
              id: "ena2m3l9e3", type: "bucket", prompt: "¿Contesta a «What does she look like?» o a «What's she like?»",
              categories: ["look like: aspecto", "like: carácter"],
              items: [
                { text: "She's tall with dark hair", bucket: 0 },
                { text: "She's very friendly", bucket: 1 },
                { text: "She wears glasses", bucket: 0 },
                { text: "She's a bit shy", bucket: 1 },
                { text: "She has big blue eyes", bucket: 0 },
                { text: "She's so funny", bucket: 1 },
              ],
              itemIds: ["ena2m3whatdoesshelooklike", "ena2m3whatsshelike", "ena2m3friendly", "ena2m3abitshy"],
              tip: "En el oral te pueden hacer cualquiera de las dos. Si contestas a la que no era, pierdes la marca de Task Fulfilment aunque el inglés sea perfecto.",
            },
            {
              id: "ena2m3l9e4", type: "mc", prompt: "«Se parece a su padre»",
              question: "¿Cuál es la buena?",
              options: ["He looks like his dad.", "He looks his dad.", "He seems his dad."],
              answer: 0,
              whyWrong: [null, "Sin like, «he looks» es «tiene pinta de» y pide un adjetivo: he looks tired", "seem es «parecer» de opinión, no de parecido físico"],
              itemIds: ["ena2m3helookslikehisdad"],
              tip: "look + adjetivo = «tener pinta»: he looks tired. look LIKE + persona o cosa = «parecerse a»: he looks like his dad.",
            },
            {
              id: "ena2m3l9e5", type: "errorfix", prompt: "Espiral: corrige la terminación",
              wrong: "I'm very interesting in this book.",
              answers: ["I'm very interested in this book."],
              why: "-ed para lo que sientes tú, -ing para lo que lo provoca. El libro es interesting; tú estás interested in él. Es el error nº 1 de la lección 7 y sobrevive hasta B2 si nadie lo nombra.",
              translation: "Este libro me interesa mucho.",
              itemIds: ["ena2m3iminterestedin", "enbook"],
            },
            {
              id: "ena2m3l9e6", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "She's quite tall and she has long dark hair.",
              answers: [
                "Es bastante alta y tiene el pelo largo y moreno.",
                "Es bastante alta y tiene el pelo largo y oscuro.",
                "Ella es bastante alta y tiene el pelo largo y moreno.",
              ],
              itemIds: ["ena2m3quitetall", "ena2m3longdarkhair"],
              tip: "Fíjate en lo que cambia de sitio al traducir: en inglés los adjetivos van delante del sustantivo y en español detrás. Es la misma frase del revés.",
            },
            {
              id: "ena2m3l9e7", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Es un poco tímido, pero es majísimo.",
              answers: [
                "He's a bit shy, but he's so nice.",
                "He is a bit shy, but he is so nice.",
                "He's a bit shy, but he's very nice.",
              ],
              hint: "el «un poco» solo cabe porque tímido es algo negativo",
              itemIds: ["ena2m3abitshy", "ena2m3sonice"],
            },
            {
              id: "ena2m3l9e8", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "She's very beautiful.",
              forbid: ["beautiful", "very"],
              answers: ["She's stunning.", "She's so lovely."],
              translation: "Es guapísima.",
              itemIds: ["ena2m3beautiful", "ena2m3sonice"],
              tip: "Decir lo mismo por otro camino es lo que te salva en el oral cuando no te sale una palabra. Las dos salidas te las dieron las píldoras de las lecciones 2 y 5.",
            },
            {
              id: "ena2m3l9e9", type: "order", prompt: "Ordena el retrato de Nora",
              sentences: [
                "This is my neighbour Nora.",
                "She's quite old and she has short white hair.",
                "She always wears a green coat and glasses.",
                "She's a bit shy, but she's so nice.",
                "Yesterday she cooked dinner for me and it was delicious.",
              ],
              translation: "Esta es mi vecina Nora. Es bastante mayor y tiene el pelo corto y blanco. Siempre lleva un abrigo verde y gafas. Es un poco tímida, pero es majísima. Ayer me hizo la cena y estaba riquísima.",
              itemIds: ["ena2m3quitetall", "ena2m3shorthair", "ena2m3glasses", "ena2m3abitshy", "endelicious"],
              tip: "Ese es el orden de un retrato: quién es, cómo es por fuera, qué lleva, cómo es por dentro y una anécdota. Sirve igual para el oral y para el escrito.",
            },
            {
              id: "ena2m3l9e10", type: "audiomc", prompt: "Identificar a alguien por la descripción — 2 escuchas",
              audio: "The woman in the red coat is quite tall and she has short dark hair. She wears glasses.",
              question: "¿Cuál de las tres es?",
              options: ["Alta, pelo corto moreno y gafas", "Alta, pelo largo moreno y gafas", "Bajita, pelo corto y sin gafas"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El pelo es corto: short hair, no long", "Es quite tall y sí lleva gafas"],
              itemIds: ["ena2m3thewomanintheredcoat", "ena2m3quitetall", "ena2m3shorthair", "ena2m3glasses"],
              tip: "En la Parte 1 del Listening cada frase trae dos datos y los distractores cambian solo uno. Apunta los dos y compara después.",
            },
            {
              id: "ena2m3l9e11", type: "monologue", prompt: "La misión del módulo: describe a una persona real y que otro la reconozca",
              topic: "Una persona que conoces bien, en un minuto",
              slides: [
                { title: "1. Quién es y cómo es por fuera", hint: "She's quite tall. She has short dark hair. She wears glasses." },
                { title: "2. Qué suele llevar puesto", hint: "She's the woman in the red coat. She always wears boots." },
                { title: "3. Cómo es por dentro", hint: "She's very friendly, but she's a bit shy. She's so funny." },
                { title: "4. Qué hace y cómo lo hace", hint: "She works hard. She cooks really well. She speaks English very well." },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He usado be para lo que ES y have para lo que TIENE",
                "He dicho al menos dos graduadores distintos (quite, so, a bit, very)",
                "He puesto dos adjetivos seguidos en el orden correcto delante del sustantivo",
                "He usado un adverbio de modo, y no lo he metido entre el verbo y su objeto",
                "He cerrado devolviendo la pregunta: «What's your neighbour like?»",
              ],
              model: "This is my neighbour Nora. She's quite old and she's not very tall. She has short white hair and she wears big glasses. In winter she's the woman in the long green coat, always with her brown boots. She's a bit shy with new people, but she's so nice: she talks to me every morning. She speaks Spanish very well because her husband was from Madrid, and she cooks really well too. What's your neighbour like?",
              itemIds: ["ena2m3quitetall", "ena2m3shorthair", "ena2m3glasses", "ena2m3thewomanintheredcoat", "ena2m3abitshy", "ena2m3sonice", "ena2m3shespeaksenglishverywell", "ena2m3well"],
              tip: "Grábate las dos veces y compara: la segunda siempre sale mejor, y esa es la que te llevas al examen. Después enséñale la grabación a alguien y pregúntale si sabría reconocer a esa persona por la calle. Si sabe, la misión está cumplida.",
            },
            {
              id: "ena2m3l9e12", type: "type", prompt: "Cierre del módulo — todo en una frase",
              question: "La mujer del abrigo rojo es bastante alta, habla despacio y es majísima.",
              answers: [
                "The woman in the red coat is quite tall, she speaks slowly and she's so nice.",
                "The woman in the red coat is quite tall, she speaks slowly and she is so nice.",
                "The woman in the red coat is quite tall, speaks slowly and is so nice.",
              ],
              hints: ["in para la ropa · quite delante del adjetivo · slowly detrás del verbo", "The woman i… the red coat is q… tall, she speaks slow… and she's s… nice."],
              itemIds: ["ena2m3thewomanintheredcoat", "ena2m3quitetall", "ena2m3slowly", "ena2m3sonice"],
              tip: "Ahí está el módulo entero: la ropa con in, el orden de los adjetivos, el graduador delante y el adverbio detrás del verbo. Con esto ya describes a cualquiera — y no vuelves a decir «I like very much this film».",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Ensaya el minuto con los vídeos de descripción: 30 segundos de papel, uno de habla y una segunda pasada. Siempre dos veces, que la segunda es la buena." },
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Mira solo la Parte 3 del Spoken: dos imágenes, semejanzas y diferencias. Es exactamente lo que has entrenado en este módulo." },
      ],
    },
  ],
};
