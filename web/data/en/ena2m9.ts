import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 9 — Whose is this?: la casa compartida, de quién es qué y
// quién hace qué. Sigue el listón del piloto `ena2m1`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): pronombres de OBJETO y REFLEXIVOS ·
// posesivos (mine, yours, whose) y el genitivo sajón · las preguntas finas
// how often / why / which · las QUESTION TAGS simples (L8). Frontera —se
// presenta y se reconoce, no se examina—: relativas con who/which/that.
// Funciones: describir dónde se vive, abrir y cerrar una conversación e
// interrumpir con educación.
//
// LAS COLETILLAS SON A2, NO FRONTERA. Este módulo las trató un tiempo como
// material de B1 «que no entra en el examen». Es falso y estaba corregido al
// revés: la tabla de gramática del handbook (LC-LRW §2.7) lista «simple
// question tags» en la columna Access, que es exactamente el A2 Access por el
// que se examina el alumno. Se enseñan, se producen y se pueden pedir. Lo que
// sí queda fuera del A2 son las coletillas raras (Let's…, shall we?; el
// imperativo con will you?; la entonación que cambia el sentido), y esas viven
// en `enb1m7`. Aquí van las cuatro de manual: is/are, do/did, can y have.
//
// POR QUÉ VA AQUÍ (PLAN-EN-A2 §4.2): es el módulo de PRECISIÓN, el que menos
// depende de los demás, y limpia el terreno antes de los dos módulos duros. Un
// alumno puede llegar aquí con el pasado, el futuro y las normas ya montados y
// seguir diciendo «he explained me» y «I feel myself tired»: son errores de
// pieza pequeña, y las piezas pequeñas se afinan cuando el edificio ya está en
// pie, no antes.
//
// LA DECISIÓN DEL MÓDULO — EL CUBO DE DOS GRUPOS (L2). El español admite el
// dativo con cualquier verbo de decir: «me dijo», «me explicó», «me describió»,
// «me recomendó». El inglés parte esos verbos en dos montones y NO hay ninguna
// lógica semántica que los separe: `tell / give / show / send / lend / buy`
// llevan la persona pegada al verbo, y `explain / say / describe / suggest /
// recommend / mention` exigen `to + persona`. Por eso no se enseña como regla
// («los verbos de comunicación llevan to» es falso: tell es el más comunicativo
// de todos), sino como CLASIFICACIÓN CERRADA de dos montones, con su `bucket`
// como ejercicio nuclear — que es la operación mental exacta que el alumno
// tiene que hacer al hablar. Y el montón que se memoriza es el pequeño: seis
// verbos con `to`; todo lo demás se comporta como `tell`.
//
// LA SEGUNDA DECISIÓN — EL TEST DEL «A MÍ MISMO» (L3). El reflexivo inglés no
// se enseña por lista de verbos, porque la lista española es enorme
// (levantarse, despertarse, sentirse, acordarse, quejarse, quedarse, irse,
// moverse…). Se enseña con UNA prueba que el alumno puede aplicar solo: si en
// español puedes añadir «a mí misma» y la frase sigue significando lo mismo
// («me corté a mí misma»), en inglés va `myself`; si no puedes («me levanté a
// mí misma» no significa nada), en inglés no va nada. Una prueba contra veinte
// verbos.
//
// LA CLÍNICA DE SONIDO (L5) — Y POR QUÉ NO ES LA ENTONACIÓN. PLAN-EN-A2 §4.3
// asignaba a este módulo la entonación (yes/no ascendente, wh- descendente).
// PLAN-EN-A2 §9.2 dice lo contrario y con razón: la entonación es una de las
// tres cosas que NO merecen tiempo en ningún nivel «porque el TTS del sistema
// no la controla y no habría manera honesta de evaluarla». Un ejercicio que
// pide oír una curva que el audio no produce no enseña nada y encima miente.
// Así que la clínica de este módulo es la que el módulo pide de verdad y el TTS
// sí sostiene: las FORMAS DÉBILES de los pronombres —la h de `him` y `her` que
// desaparece, el `them` que se queda en `'em`, el `his` que suena /ɪz/— más el
// par homófono `whose` / `who's`. Es justo donde el Listening del examen
// esconde la mitad de la información, y se puede corregir con `hearreal`,
// `audiomc` y dictado, que es lo que hace honesto al ejercicio.
//
// EL CONTRASTE CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9): (a) el pronombre
// de objeto va DETRÁS del verbo, nunca delante — «la vi» → I saw her, L1; (b)
// el objeto que el español calla y el inglés obliga a decir — «no lo
// encuentro» → I can't find IT, L1; (c) el cubo `explain me` / `tell me`, L2;
// (d) el reflexivo que el inglés no lleva —«I feel myself tired», «I woke up
// myself»—, L3; (e) «el piso de Amy» → Amy's flat, y `whose` frente al calco
// «the man who his car…», L4 y L9; (f) «¿cuántas veces?» → how often, y el
// «¿cuál?» que se traduce por what y no por which, L7; (g) la interrupción,
// que en español se hace subiendo la voz y en inglés hay que ANUNCIARLA, L8;
// (h) las relativas de objeto omitidas —«The girls we saw looked happy»—, que
// el español no puede hacer y por eso el alumno ni las ve: trabajo de
// COMPRENSIÓN, nunca de producción, L9.
//
// LO QUE SE HEREDA Y NO SE RE-EXPLICA: la posición del adverbio y la regla de
// que nada se mete entre el verbo y su objeto están cerradas en `ena2m3l6` —
// aquí se REFERENCIAN (L1: «I saw her this morning», nunca «I saw this morning
// her») y se cobran en los ejercicios. El pasado y el `did/didn't` vienen
// cerrados de `ena2m1`/`ena2m2` y se usan sin volver a explicarlos. Los
// determinantes (`enough`, `no`, `all`, `none`) son de `ena2m4`. Contables e
// incontables y la escalera de cortesía de la petición (Can I → Could I →
// Could I have… please) son de `ena2m5`: la nota de la casa se escribe con esa
// escalera, no con una nueva. Y el reparto `lose` / `miss` / `forget` / `leave`
// quedó fijado en `ena2m2` (objetos se pierden con lose, transportes y citas
// con miss, «me dejé las llaves» es forgot, y `leave` es dejarse algo EN UN
// SITIO): este módulo lo NECESITA tal cual —una casa compartida es un
// inventario de cosas que aparecen y desaparecen— y lo usa sin re-enseñarlo.
//
// RECICLADO del A1 y de ena2m1-m5 sin redefinir ids (una palabra, una
// tarjeta). Si una palabra de la casa ya existe en `ena1m7`, este módulo la
// referencia por su id de siempre y NO la vuelve a declarar:
// ena2m1asked, ena2m1istayedathome, ena2m1phoned, ena2m1therewas,
// ena2m2ididntsleep, ena2m2ifounditinmybag, ena2m2ilostmyphone,
// ena2m2mykeys, ena2m2soiwalked, ena2m2wokegroup, ena2m3acoat,
// ena2m3quietly, ena2m4thebiggestroom, ena2m4whichisbetterforme,
// ena2m5couldyoubringussomewater, enatweekend, enbathroom, enbedroom,
// enblack, enblue, enbusstop, enbut, encanyouhelpme, encoffee, endinner,
// enexpensive, enflat, enflatmate, enfridge, enfriend, engarden, engetup,
// enhe, enher, enhis, enhome, enhowmany, enidontunderstand, enimbusy,
// enimlate, eninthekitchen, enkitchen, enlivingroom, enmonth, ennurse,
// enour, enpeople, enroom, enseeyoutomorrow, enshe, ensofa, enstation,
// ensurname, entea, enthat, enthefirst, entheir, enthen, entwice,
// enusually, enwhatsyourphone, enwindow, enyesterday.
//
// LO QUE HEREDAN LOS DOS MÓDULOS DE FRONTERA QUE VIENEN DETRÁS: `ena2m10`
// (present perfect) necesita el objeto obligatorio de la L1 para que
// «Have you seen it?» y «I've already told him» no salgan mancos, y necesita el
// cubo de la L2 entero, porque `just` / `already` / `yet` se colocan alrededor
// del objeto indirecto y sin el orden fijado no hay dónde ponerlos; además su
// «Have you ever…?» se enseña CONTRA el `How often…?` de la L7, que es la
// pregunta por la frecuencia frente a la pregunta por la experiencia.
// `ena2m11` (will / might / first conditional) hereda los reflexivos de la L3
// para `enjoy yourself` y `look after yourself`, y hereda las question tags de
// la L8, que es donde vive la mitad de la confirmación de un plan («We're
// meeting at six, aren't we?»). Y las dos heredan las relativas de la L9: son
// la píldora que `ena2m12` necesita para «the one that…» y para la Parte 4 del
// Reading, que es texto continuo y va lleno de relativas de objeto omitidas.
//
// TODOS los ids nuevos llevan el prefijo "ena2m9": es regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m9: Record<string, VocabItem> = {
  // ── ena2m9l1 — los pronombres que van detrás del verbo ──
  ena2m9objectgroup: {
    id: "ena2m9objectgroup", target: "me · you · him · her · it · us · them",
    source: "los pronombres de objeto: van SIEMPRE detrás del verbo",
    sound: "mi · yu · jim · jee · it · as · dem",
  },
  ena2m9isawherthismorning: {
    id: "ena2m9isawherthismorning", target: "I saw her this morning.",
    source: "La vi esta mañana.",
    sound: "ái SÓO jee dis MÓO-ning",
    gram: { trap: "I her saw this morning.", same: ["I saw Amy this morning."] },
  },
  ena2m9ihelpedhimwiththeboxes: {
    id: "ena2m9ihelpedhimwiththeboxes", target: "I helped him with the boxes.",
    source: "Le ayudé con las cajas.",
    sound: "ái JELPT jim uid de BOK-sis̬",
    gram: { trap: "I helped to him with the boxes." },
  },
  ena2m9icantfindit: {
    id: "ena2m9icantfindit", target: "I can't find it.",
    source: "No lo encuentro. — el «lo» del español es obligatorio en inglés",
    sound: "ái kaant FÁIND it",
    gram: { trap: "I can't find.", same: ["I don't know where it is."] },
  },
  ena2m9waitforus: {
    id: "ena2m9waitforus", target: "Wait for us!",
    source: "¡Espéranos! — wait pide for, y detrás va el pronombre de objeto",
    sound: "UÉIT foo as",
    gram: { trap: "Wait us!" },
  },

  // ── ena2m9l2 — el cubo: tell me / explain to me ──
  ena2m9tellmegroup: {
    id: "ena2m9tellmegroup", target: "tell · give · show · send · lend · buy",
    source: "montón A: verbo + PERSONA + cosa, sin preposición (tell me the truth)",
    sound: "tel · guiv · shóu · send · lend · bái",
  },
  ena2m9explaintogroup: {
    id: "ena2m9explaintogroup", target: "explain · say · describe · suggest · recommend · mention",
    source: "montón B: exigen TO + persona (explain the rules TO me). Son estos seis y ya",
    sound: "iks-PLÉIN · séi · dis-KRÁIB · sa-DCHEST · re-ka-MEND · MEN-shon",
    gram: { trap: "He explained me the rules.", same: ["He explained the rules to me."] },
  },
  ena2m9canyouexplainittome: {
    id: "ena2m9canyouexplainittome", target: "Can you explain it to me?",
    source: "¿Me lo explicas?",
    sound: "kan yu iks-PLÉIN it tu mi",
    gram: { trap: "Can you explain me it?", same: ["Could you explain it to me?"] },
  },
  ena2m9didyoutellhim: {
    id: "ena2m9didyoutellhim", target: "Did you tell him about the party?",
    source: "¿Le dijiste lo de la fiesta?",
    sound: "did yu TEL jim a-báut de PAA-ti",
    gram: { trap: "Did you tell to him about the party?", same: ["Did you let him know about the party?"] },
  },
  ena2m9whatdidshesaytoyou: {
    id: "ena2m9whatdidshesaytoyou", target: "What did she say to you?",
    source: "¿Qué te dijo?",
    sound: "uót did shi SÉI tu yu",
    gram: { trap: "What did she say you?", same: ["What did she tell you?"] },
  },
  ena2m9showmehowitworks: {
    id: "ena2m9showmehowitworks", target: "Show me how it works.",
    source: "Enséñame cómo funciona.",
    sound: "SHÓU mi jáu it UÉEKS",
  },

  // ── ena2m9l3 — los reflexivos, y los que el inglés no lleva ──
  ena2m9reflexivegroup: {
    id: "ena2m9reflexivegroup", target: "myself · yourself · himself · herself · ourselves · themselves",
    source: "los reflexivos de verdad: cuando el que hace y el que recibe son la misma persona",
    sound: "mai-SELF · yoo-SELF · jim-SELF · jee-SELF · áua-SELVS̬ · dem-SELVS̬",
  },
  ena2m9nonreflexivegroup: {
    id: "ena2m9nonreflexivegroup", target: "get up · wake up · feel · remember · complain · stay",
    source: "levantarse, despertarse, sentirse, acordarse, quejarse, quedarse — en inglés SIN reflexivo",
    sound: "guet AP · uéik AP · fiil · ri-MEM-ba · kom-PLÉIN · stéi",
    gram: { trap: "I feel myself bad.", same: ["I feel bad."] },
  },
  ena2m9helpyourself: {
    id: "ena2m9helpyourself", target: "Help yourself!",
    source: "¡Sírvete! (lo que se le dice a quien entra en tu cocina)",
    sound: "jelp yoo-SELF",
  },
  ena2m9ididitmyself: {
    id: "ena2m9ididitmyself", target: "I did it myself.",
    source: "Lo hice yo sola. — aquí myself significa «yo, sin ayuda»",
    sound: "ái DID it mai-SELF",
  },
  ena2m9bymyself: {
    id: "ena2m9bymyself", target: "I live by myself.",
    source: "Vivo sola.",
    sound: "ái LIV bai mai-SELF",
    gram: { trap: "I live by my own.", same: ["I live on my own.", "I live alone."] },
  },
  ena2m9ifeeltired: {
    id: "ena2m9ifeeltired", target: "I feel tired.",
    source: "Me siento cansada.",
    sound: "ái fiil TÁI-ad",
    gram: { trap: "I feel myself tired.", same: ["I'm tired."] },
  },

  // ── ena2m9l4 — de quién es: whose, mine, Amy's ──
  ena2m9whoseisthis: {
    id: "ena2m9whoseisthis", target: "Whose is this?",
    source: "¿De quién es esto?",
    sound: "JUUS̬ is̬ dis",
  },
  ena2m9possessivegroup: {
    id: "ena2m9possessivegroup", target: "mine · yours · his · hers · ours · theirs",
    source: "los posesivos que van SOLOS, sin sustantivo detrás — y sin apóstrofo",
    sound: "máin · yoos̬ · jis̬ · jees̬ · áuas̬ · déas̬",
  },
  ena2m9itsnotminesits: {
    id: "ena2m9itsnotminesits", target: "It's not mine, it's hers.",
    source: "No es mío, es suyo (de ella).",
    sound: "its not MÁIN, its JEES̬",
    gram: { trap: "It's not mine, it's her.", same: ["That one's hers, not mine."] },
  },
  ena2m9amysflat: {
    id: "ena2m9amysflat", target: "Amy's flat",
    source: "el piso de Amy — el dueño va DELANTE, con 's",
    sound: "ÉI-mis̬ flat",
    gram: { trap: "the flat of Amy", same: ["Amy's place"] },
  },
  ena2m9whosekeysarethese: {
    id: "ena2m9whosekeysarethese", target: "Whose keys are these?",
    source: "¿De quién son estas llaves?",
    sound: "juus̬ KIIS̬ aa diis̬",
    gram: { trap: "Of who are these keys?", same: ["Whose are these keys?"] },
  },
  ena2m9afriendofmine: {
    id: "ena2m9afriendofmine", target: "a friend of mine",
    source: "un amigo mío",
    sound: "a FREND ov máin",
    gram: { trap: "a friend of me" },
  },

  // ── ena2m9l5 — la clínica: los pronombres que casi no se oyen ──
  ena2m9weakhim: {
    id: "ena2m9weakhim", target: "tell him",
    source: "decirle — la h de him desaparece y se pega a lo de delante: «TE-lim»",
    sound: "TE-lim",
  },
  ena2m9weakher: {
    id: "ena2m9weakher", target: "ask her",
    source: "preguntarle — her se queda en una vocal floja: «AAS-ka»",
    sound: "AAS-ka",
  },
  ena2m9weakthem: {
    id: "ena2m9weakthem", target: "give them a key",
    source: "darles una llave — them suena «dem» y en habla rápida se queda en «em»",
    sound: "guiv dem a KII (rápido: GUI-vem a kii)",
  },
  ena2m9whoseorwhos: {
    id: "ena2m9whoseorwhos", target: "whose / who's",
    source: "de quién / quién es — suenan EXACTAMENTE igual: lo decide la gramática, no el oído",
    sound: "juus̬ / juus̬",
  },

  // ── ena2m9l6 — la casa compartida y el barrio ──
  ena2m9weshareaflat: {
    id: "ena2m9weshareaflat", target: "We share a flat.",
    source: "Compartimos piso.",
    sound: "ui SHÉA a flat",
    gram: { trap: "We share flat.", same: ["We live together in a flat."] },
  },
  ena2m9ipaytherentonthefirst: {
    id: "ena2m9ipaytherentonthefirst", target: "I pay the rent on the first.",
    source: "Pago el alquiler el día uno.",
    sound: "ái PÉI de rent on de FEEST",
    gram: { trap: "I pay the rent the first." },
  },
  ena2m9ourlandlordlivesupstairs: {
    id: "ena2m9ourlandlordlivesupstairs", target: "Our landlord lives upstairs.",
    source: "Nuestro casero vive arriba (upstairs = arriba · downstairs = abajo).",
    sound: "áua LAND-lood livs̬ ap-STÉAS̬",
    gram: { trap: "Our landlord lives in upstairs." },
  },
  ena2m9nextdoorneighbour: {
    id: "ena2m9nextdoorneighbour", target: "our next-door neighbour",
    source: "nuestro vecino de al lado",
    sound: "áua nekst-DÓO NÉI-ba",
  },
  ena2m9alettercameforyou: {
    id: "ena2m9alettercameforyou", target: "A letter came for you.",
    source: "Te ha llegado una carta.",
    sound: "a LE-ta kéim foo yu",
    gram: { trap: "It came a letter for you.", same: ["There's a letter for you."] },
  },

  // ── ena2m9l7 — how often, why, which, y el reparto de tareas ──
  ena2m9howoftendoyouclean: {
    id: "ena2m9howoftendoyouclean", target: "How often do you clean the kitchen?",
    source: "¿Cada cuánto limpias la cocina?",
    sound: "jáu Ó-fen du yu KLIIN de KI-chen",
    gram: { trap: "How much times do you clean the kitchen?", same: ["How many times a week do you clean the kitchen?"] },
  },
  ena2m9onceaweek: {
    id: "ena2m9onceaweek", target: "once a week",
    source: "una vez por semana",
    sound: "UÁNS a uíik",
    gram: { trap: "one time per week", same: ["every week"] },
  },
  ena2m9whichroomisyours: {
    id: "ena2m9whichroomisyours", target: "Which room is yours?",
    source: "¿Cuál es tu habitación? — which cuando eliges entre pocas cosas",
    sound: "uích RUUM is̬ yoos̬",
    gram: { same: ["Which one is yours?"] },
  },
  ena2m9whydidntyoutellme: {
    id: "ena2m9whydidntyoutellme", target: "Why didn't you tell me?",
    source: "¿Por qué no me lo dijiste?",
    sound: "uái DÍ-dent yu tel mi",
    gram: { trap: "Why you didn't tell me?", same: ["Why didn't you say anything to me?"] },
  },
  ena2m9itsyourturn: {
    id: "ena2m9itsyourturn", target: "It's your turn.",
    source: "Te toca.",
    sound: "its yoo TEEN",
    gram: { trap: "It touches you.", same: ["It's your go."] },
  },
  ena2m9choresgroup: {
    id: "ena2m9choresgroup", target: "do the washing-up · take out the rubbish · hoover the flat",
    source: "fregar los platos · sacar la basura · pasar la aspiradora",
    sound: "du de UÓ-shing-AP · téik áut de RA-bish · JÚU-va de flat",
  },

  // ── ena2m9l8 — abrir, interrumpir y cerrar ──
  ena2m9haveyougotaminute: {
    id: "ena2m9haveyougotaminute", target: "Have you got a minute?",
    source: "¿Tienes un momento? — así se ABRE una conversación en Reino Unido",
    sound: "jav yu got a MÍ-nit",
    gram: { same: ["Can I ask you something?"] },
  },
  ena2m9sorrytointerrupt: {
    id: "ena2m9sorrytointerrupt", target: "Sorry to interrupt, but…",
    source: "Perdona que te interrumpa, pero…",
    sound: "SO-ri tu in-ta-RAPT, bat",
    gram: { same: ["Sorry, can I just say something?"] },
  },
  ena2m9anywayidbettergo: {
    id: "ena2m9anywayidbettergo", target: "Anyway, I'd better go.",
    source: "Bueno, me voy yendo. — la señal de que la conversación se acaba",
    sound: "E-ni-uei, áid BE-ta góu",
    gram: { same: ["Right, I'd better get going."] },
  },
  ena2m9itwasnicetalkingtoyou: {
    id: "ena2m9itwasnicetalkingtoyou", target: "It was nice talking to you.",
    source: "Me ha alegrado hablar contigo.",
    sound: "it uos̬ NÁIS TÓO-king tu yu",
  },
  ena2m9questiontags: {
    id: "ena2m9questiontags", target: "It's cold in here, isn't it?",
    source: "Hace frío aquí, ¿no? — la coletilla inglesa cambia con cada frase",
    sound: "its KÓULD in jía, Í-s̬en-tit",
    gram: { trap: "It's cold in here, no?", same: ["It's cold in here, right?"] },
  },

  // ── ena2m9l9 — frontera: las relativas ──
  ena2m9thegirlwholivesupstairs: {
    id: "ena2m9thegirlwholivesupstairs", target: "the girl who lives upstairs",
    source: "la chica que vive arriba",
    sound: "de GUEEL ju livs̬ ap-STÉAS̬",
    gram: { same: ["the girl that lives upstairs"] },
  },
  ena2m9themanwhosecar: {
    id: "ena2m9themanwhosecar", target: "the man whose car is outside",
    source: "el hombre cuyo coche está fuera / el hombre ese que tiene el coche fuera",
    sound: "de MAN juus̬ KAA is̬ áut-SÁID",
    gram: { trap: "the man who his car is outside" },
  },
  ena2m9theflatwesaw: {
    id: "ena2m9theflatwesaw", target: "the flat we saw yesterday",
    source: "el piso que vimos ayer — en inglés el «que» PUEDE desaparecer (FRONTERA: reconocer)",
    sound: "de FLAT ui SÓO YÉS-ta-dei",
    gram: { same: ["the flat that we saw yesterday", "the flat which we saw yesterday"] },
  },
};

export const ena2m9: Phase = {
  id: "ena2m9",
  level: "a2",
  n: 9,
  title: "Whose is this?",
  goal: "Afinar la puntería: colocar los pronombres de objeto detrás del verbo, repartir los verbos entre «tell me» y «explain to me», usar el reflexivo solo cuando toca, decir de quién es cada cosa (mine, yours, Amy's, whose), preguntar con how often / why / which, describir dónde vives, y abrir, interrumpir y cerrar una conversación como se hace de verdad.",
  color: "#0891b2",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — los pronombres de objeto
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l1",
      phaseId: "ena2m9",
      title: "I saw her this morning",
      subtitle: "Los pronombres que en español van delante y en inglés van detrás",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Hablar de gente sin repetir su nombre",
          itemIds: ["ena2m9objectgroup", "ena2m9isawherthismorning", "ena2m9ihelpedhimwiththeboxes", "ena2m9icantfindit", "ena2m9waitforus", "enflatmate"],
        },
        {
          kind: "note",
          note: {
            title: "Dos filas de pronombres, y la segunda es nueva",
            body: "Del A1 traes la fila de arriba: <b>I, you, he, she, it, we, they</b> — los que hacen la acción. Hoy entra la de abajo: los que la <b>reciben</b>.<br/><br/>Y no hace falta aprenderse catorce palabras: <b>you</b> e <b>it</b> son iguales en las dos filas, así que lo nuevo son cinco: <b>me, him, her, us, them</b>.<br/><br/><b>Lo que de verdad hay que cambiar es el sitio.</b> En español el pronombre se pone <i>delante</i> del verbo: «<u>la</u> vi», «<u>le</u> ayudé», «<u>nos</u> espera». En inglés va <b>siempre detrás</b>, pegado al verbo: <b>I saw <u>her</u></b>, <b>I helped <u>him</u></b>, <b>He's waiting for <u>us</u></b>. <i>I her saw</i> no existe en ningún registro y suena a traducción de máquina.<br/><br/>Recuerda además la regla que cerraste en el módulo 3: <b>entre el verbo y su objeto no se mete nada</b>. Por eso es [[I saw her this morning.|La vi esta mañana.]] y nunca <i>I saw this morning her</i>.<br/><br/><b>Tras preposición, la misma fila de abajo.</b> Aquí el inglés te lo pone fácil: <i>for me</i>, <i>with him</i>, <i>next to her</i>, <i>between us</i>, <i>about them</i>. Una sola forma para todo, mientras el español cambia entre «mí/ti» y «él/ella».<br/><br/><b>Y el aviso caro: el objeto que el español calla.</b> «No lo encuentro», «no lo sé», «ya lo he hecho» — el español puede dejarlo caer si está claro. El inglés <b>no</b>: si el verbo lleva objeto, el objeto se dice. <b>[[I can't find it.|No lo encuentro.]]</b>, no <i>I can't find</i>. Es el mismo hueco que el <i>it</i> de <i>It rained</i> del módulo 1, pero al otro lado del verbo.",
            table: [
              ["quien lo hace", "quien lo recibe", "ejemplo"],
              ["I", "me", "Amy phoned me."],
              ["you", "you", "I saw you at the bus stop."],
              ["he", "him", "I helped him with the boxes."],
              ["she", "her", "I saw her this morning."],
              ["it", "it", "I can't find it."],
              ["we", "us", "Wait for us!"],
              ["they", "them", "I don't know them."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l1e1", type: "fastmatch", prompt: "Calentamiento — la fila de arriba ya es tuya desde el A1",
              pairs: [
                { target: "he", source: "él" },
                { target: "she", source: "ella" },
                { target: "his", source: "su (de él)" },
                { target: "her", source: "su (de ella)" },
                { target: "their", source: "su (de ellos)" },
              ],
              targetSeconds: 25,
              itemIds: ["enhe", "enshe", "enhis", "enher", "entheir"],
              tip: "Ojo a «her», que hace dos trabajos: «su (de ella)» y «la / le». Es la única palabra que aparece en las dos filas con dos oficios distintos.",
            },
            {
              id: "ena2m9l1e2", type: "match", prompt: "Empareja cada pronombre de objeto con lo que significa",
              pairs: [
                { target: "me", source: "me / a mí" },
                { target: "him", source: "lo / le (a él)" },
                { target: "her", source: "la / le (a ella)" },
                { target: "us", source: "nos / a nosotros" },
                { target: "them", source: "los / les (a ellos)" },
              ],
              itemIds: ["ena2m9objectgroup"],
              tip: "Donde el español reparte entre «lo» y «le» según el caso, el inglés usa una sola palabra. Menos que decidir.",
            },
            {
              id: "ena2m9l1e3", type: "bucket", prompt: "¿Hace la acción o la recibe?",
              categories: ["hace la acción (sujeto)", "la recibe (objeto)"],
              items: [
                { text: "I", bucket: 0 },
                { text: "me", bucket: 1 },
                { text: "he", bucket: 0 },
                { text: "him", bucket: 1 },
                { text: "we", bucket: 0 },
                { text: "us", bucket: 1 },
                { text: "they", bucket: 0 },
                { text: "them", bucket: 1 },
              ],
              itemIds: ["ena2m9objectgroup", "enhe"],
              tip: "Truco de un segundo: si va delante del verbo, es de los de arriba; si va detrás del verbo o detrás de una preposición, es de los de abajo.",
            },
            {
              id: "ena2m9l1e4", type: "mc", prompt: "Dónde se coloca",
              question: "«La vi esta mañana» en inglés es…",
              options: ["I saw her this morning.", "I her saw this morning.", "I saw this morning her."],
              answer: 0,
              whyWrong: [null, "Ese es el orden español: el pronombre delante del verbo. En inglés va detrás, sin excepción", "Entre el verbo y su objeto no se mete nada — la regla del módulo 3, aplicada aquí"],
              itemIds: ["ena2m9isawherthismorning"],
              tip: "Verbo primero, objeto pegado detrás. Todo lo demás —la hora, el sitio, el modo— se coloca después.",
            },
            {
              id: "ena2m9l1e5", type: "cloze", prompt: "Completa con el pronombre que toca",
              text: "Amy is in the kitchen. Can you help ___ with the shopping?",
              answers: ["her"],
              translation: "Amy está en la cocina. ¿Puedes ayudarla con la compra?",
              hints: ["Amy es «ella», y aquí RECIBE la ayuda", "h…"],
              itemIds: ["encanyouhelpme", "eninthekitchen"],
            },
            {
              id: "ena2m9l1e6", type: "cloze", prompt: "Completa con el pronombre que toca",
              text: "Ben was late, so I helped ___ with the boxes.",
              answers: ["him"],
              translation: "Ben llegó tarde, así que le ayudé con las cajas.",
              hints: ["Ben es «él» y aquí recibe la ayuda", "h…"],
              itemIds: ["ena2m9ihelpedhimwiththeboxes", "ena2m2soiwalked"],
            },
            {
              id: "ena2m9l1e7", type: "gapbank", prompt: "La noche de las llaves perdidas — rellena con el pronombre",
              text: "Ben lost his key, so I gave ___ mine. Amy and Nora were in the kitchen, so I asked ___ about it. In the end Ben found ___ under the sofa.",
              answers: ["him", "them", "it"],
              bank: ["him", "them", "it", "her", "us", "me"],
              translation: "Ben perdió su llave, así que le di la mía. Amy y Nora estaban en la cocina, así que les pregunté. Al final Ben la encontró debajo del sofá.",
              itemIds: ["ena2m9objectgroup", "ena2m2ilostmyphone", "ena2m2ifounditinmybag", "ensofa"],
              tip: "Los tres huecos los decide el CONTEXTO, no la gramática: los seis pronombres del banco encajan igual de bien en el hueco. Lee quién es quién antes de elegir.",
            },
            {
              id: "ena2m9l1e8", type: "errorfix", prompt: "Corrige el orden español",
              wrong: "I her saw this morning.",
              answers: ["I saw her this morning."],
              why: "En español el pronombre se agarra delante del verbo («la vi») y en inglés va detrás, siempre. No hay ni un caso en todo el idioma en que el objeto vaya delante del verbo.",
              translation: "La vi esta mañana.",
              itemIds: ["ena2m9isawherthismorning"],
            },
            {
              id: "ena2m9l1e9", type: "errorfix", prompt: "Corrige el objeto que se ha caído",
              wrong: "I can't find.",
              answers: ["I can't find it."],
              why: "El español puede callarse el «lo» cuando ya se sabe de qué hablas («no encuentro» suena raro, pero «no lo encuentro» y «no encuentro las llaves» son las dos opciones). El inglés no tiene esa tercera vía: si el verbo pide objeto, el objeto se escribe. Lo mismo con I know it, I did it, I like it.",
              translation: "No lo encuentro.",
              itemIds: ["ena2m9icantfindit"],
              tip: "Regla mecánica: detrás de find, know, do, like, want, need y see nunca hay un hueco. O va el nombre de la cosa, o va it.",
            },
            {
              id: "ena2m9l1e10", type: "transform", prompt: "Sustituye el nombre por un pronombre",
              source: "I saw Amy and Nora at the bus stop.",
              instruction: "Cambia «Amy and Nora» por el pronombre que toca",
              answers: ["I saw them at the bus stop."],
              translation: "Las vi en la parada.",
              hints: ["Dos personas, y reciben la acción", "I saw t… at the bus stop."],
              itemIds: ["ena2m9objectgroup", "enbusstop"],
            },
            {
              id: "ena2m9l1e11", type: "build", prompt: "Construye la frase de la parada",
              target: "Wait for us at the bus stop",
              translation: "Espéranos en la parada",
              distractors: ["we", "to"],
              itemIds: ["ena2m9waitforus", "enbusstop"],
              tip: "Dos fichas sobran a propósito: «we» es de la fila de arriba y aquí toca la de abajo, y wait pide FOR, nunca TO.",
            },
            {
              id: "ena2m9l1e12", type: "listen", prompt: "Dictado — dos pronombres en una frase",
              text: "I saw her this morning and I helped him with the boxes.",
              translation: "La vi esta mañana y le ayudé con las cajas.",
              hints: ["Uno es «ella» y el otro es «él», los dos detrás del verbo", "I saw h… this morning and I helped h… with the boxes."],
              itemIds: ["ena2m9isawherthismorning", "ena2m9ihelpedhimwiththeboxes"],
            },
            {
              id: "ena2m9l1e13", type: "speak", prompt: "Dilo en voz alta — tres objetos seguidos",
              text: "I phoned her, I helped him and I waited for them.",
              phonetic: "ái FÓUND jee, ái JELPT jim and ái UÉI-tid foo dem",
              translation: "La llamé, le ayudé y los esperé.",
              itemIds: ["ena2m1phoned", "ena2m9ihelpedhimwiththeboxes", "ena2m9objectgroup"],
              tip: "Fíjate en dónde caen: siempre después del verbo, sin nada en medio. Y las tres -ed cerradas, que de eso va la clínica del módulo 1.",
            },
            {
              id: "ena2m9l1e14", type: "type", prompt: "Cierre de producción",
              question: "Los vi ayer, pero no me dijeron nada.",
              answers: [
                "I saw them yesterday, but they didn't tell me anything.",
                "I saw them yesterday but they didn't tell me anything.",
                "I saw them yesterday, but they said nothing to me.",
              ],
              hints: ["Objeto detrás del verbo las dos veces", "I saw t… yesterday, but they didn't tell m… anything."],
              itemIds: ["ena2m9objectgroup", "ena2m9didyoutellhim", "enyesterday"],
              tip: "Ahí van los dos: «los» detrás de saw, «me» detrás de tell. Y de paso ya has escrito la primera frase del cubo de la lección siguiente.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-1",
            book: "Can you help me?",
            real: "Give us a hand, would you?",
            meaning: "Échame una mano, ¿quieres?",
            when: "Entre compañeros de piso, amigos y compañeros de trabajo, para pedir ayuda con algo pequeño y físico: una caja, una mesa, la compra. En el examen escribe Could you help me, please?: «give us a hand» es de cocina, no de Writing.",
            register: "amigos",
            note: "Y ojo al detalle que te descoloca: ese «us» quiere decir «me». En el inglés hablado de Reino Unido, us se cuela con frecuencia donde el libro pondría me. No lo produzcas todavía; reconócelo al oírlo.",
            sound: "guiv as a JAND, uud yu",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Personal pronouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/personal-pronouns-it-them", note: "Lee la ficha y haz los ejercicios. Fíjate solo en una cosa: dónde está colocado el pronombre en cada frase de ejemplo. Siempre detrás." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — el cubo: tell me / explain to me
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l2",
      phaseId: "ena2m9",
      title: "Tell me · explain it to me",
      subtitle: "Dos montones de verbos, y solo hay que memorizar el pequeño",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Los dos montones, y cuatro frases para probarlos",
          itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup", "ena2m9canyouexplainittome", "ena2m9didyoutellhim", "ena2m9whatdidshesaytoyou", "ena2m9showmehowitworks"],
        },
        {
          kind: "note",
          note: {
            title: "El error que el español provoca, y por qué es tan tozudo",
            body: "En español, <b>cualquier</b> verbo de decir o de dar admite el pronombre delante: «<u>me</u> dijo», «<u>me</u> explicó», «<u>me</u> describió», «<u>me</u> recomendó», «<u>me</u> sugirió», «<u>me</u> mencionó». Una sola construcción para todos. Por eso la mano se va sola a escribir <i>He explained me the rules</i>, y por eso ese error sobrevive hasta niveles muy altos: no es que el alumno no sepa la regla, es que <b>el español no le ofrece ninguna pista de que haya dos grupos</b>.<br/><br/>El inglés parte esos verbos en dos montones. Y —esto es lo importante— <b>no hay ninguna lógica que los separe</b>: no es que unos sean de comunicación y otros no (<i>tell</i> es el más comunicativo de todos y está en el montón A). Es <b>reparto léxico puro</b>, como el género de los sustantivos en español. Así que no se razona: se clasifica.<br/><br/><b>MONTÓN A — la persona va pegada al verbo.</b><br/><b>tell · give · show · send · lend · buy</b> (y también <i>bring, offer, teach, ask, make, cook</i>)<br/>→ <i>[[Tell me the truth.|Dime la verdad.]]</i> · <i>Give her the keys.</i> · <i>[[Show me how it works.|Enséñame cómo funciona.]]</i><br/><br/><b>MONTÓN B — la persona necesita TO.</b><br/><b>explain · say · describe · suggest · recommend · mention</b> (y <i>repeat</i>)<br/>→ <i>[[Can you explain it to me?|¿Me lo explicas?]]</i> · <i>[[What did she say to you?|¿Qué te dijo?]]</i> · <i>Describe the flat to me.</i><br/><br/><b>El montón que memorizas es el B: seis verbos.</b> Todo lo demás se comporta como <i>tell</i>. Seis palabras contra un error que dura años.<br/><br/><b>Dos avisos para no pasarte de listo:</b><br/>1. Los del montón A <b>también</b> pueden llevar <i>to</i>, pero entonces la cosa va primero: <i>Give the keys <b>to her</b></i>. Las dos son correctas. Los del montón B <b>nunca</b> pueden quitarlo.<br/>2. <b>say</b> y <b>tell</b> son la pareja que más se cruza. <i>tell</i> casi siempre lleva persona (<i>tell me</i>, <i>tell him</i>); <i>say</i> casi nunca la lleva, y si la lleva, con <i>to</i>: <i>She said nothing</i> · <i>She said it to me</i>.",
            table: [
              ["en español", "montón A (sin to)", "montón B (con to)"],
              ["Me dijo la verdad.", "She told me the truth.", "—"],
              ["Me lo explicó.", "—", "She explained it to me."],
              ["Me enseñó el piso.", "She showed me the flat.", "—"],
              ["Me lo describió.", "—", "She described it to me."],
              ["Me mandó un mensaje.", "She sent me a message.", "—"],
              ["Me recomendó la calle.", "—", "She recommended the street to me."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l2e1", type: "bucket", prompt: "EL CUBO DEL MÓDULO — ¿la persona va pegada al verbo o necesita «to»?",
              categories: ["verbo + PERSONA (sin to)", "verbo + TO + persona"],
              items: [
                { text: "tell", bucket: 0 },
                { text: "explain", bucket: 1 },
                { text: "give", bucket: 0 },
                { text: "say", bucket: 1 },
                { text: "show", bucket: 0 },
                { text: "describe", bucket: 1 },
                { text: "send", bucket: 0 },
                { text: "suggest", bucket: 1 },
              ],
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup"],
              tip: "Este es EL ejercicio del módulo. No hay regla que deducir: hay dos montones. Memoriza el de la derecha —seis verbos— y da por hecho que todo lo demás está en el de la izquierda.",
            },
            {
              id: "ena2m9l2e2", type: "bucket", prompt: "Segunda pasada, con los que no salieron antes",
              categories: ["verbo + PERSONA (sin to)", "verbo + TO + persona"],
              items: [
                { text: "lend", bucket: 0 },
                { text: "recommend", bucket: 1 },
                { text: "buy", bucket: 0 },
                { text: "mention", bucket: 1 },
                { text: "bring", bucket: 0 },
                { text: "repeat", bucket: 1 },
              ],
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup"],
              tip: "«Repeat» es la que más pilla: «¿me lo repites?» es Can you repeat it TO me? — o, mejor todavía, Can you say that again?",
            },
            {
              id: "ena2m9l2e3", type: "errorfix", prompt: "Corrige el calco estrella del nivel",
              wrong: "He explained me the rules.",
              answers: ["He explained the rules to me."],
              why: "«explain» está en el montón B: la persona solo puede ir detrás de TO, y detrás del verbo va la cosa. En español «me explicó las normas» es la única forma posible, y de ahí sale el error. Los seis del montón B son explain, say, describe, suggest, recommend y mention.",
              translation: "Me explicó las normas.",
              itemIds: ["ena2m9explaintogroup"],
              tip: "Si dudas, prueba a meter la cosa delante: «explained the rules…» ¿suena bien? Entonces la persona va con to detrás.",
            },
            {
              id: "ena2m9l2e4", type: "errorfix", prompt: "Corrige — el mismo montón, otro verbo",
              wrong: "What did she say you?",
              answers: ["What did she say to you?"],
              why: "«say» también es del montón B. La pareja que hay que tener clara: She TOLD me (sin to) frente a She SAID it TO me. Y en el 90 % de los casos say ni siquiera lleva persona: She said nothing.",
              translation: "¿Qué te dijo?",
              itemIds: ["ena2m9whatdidshesaytoyou"],
            },
            {
              id: "ena2m9l2e5", type: "mc", prompt: "La pareja que más se cruza",
              question: "«Me dijo que el alquiler sube» — ¿cuál es?",
              options: ["She told me the rent is going up.", "She said me the rent is going up.", "She told to me the rent is going up."],
              answer: 0,
              whyWrong: [null, "say va con to: She said to me… Con persona pegada, el verbo es tell", "tell es del montón A: la persona va sin to. «told to me» sobra la preposición"],
              itemIds: ["ena2m9tellmegroup", "ena2m9ipaytherentonthefirst"],
              tip: "Fórmula corta: TELL + persona · SAY + to + persona. Si te acuerdas solo de esta pareja, ya has salvado la mitad de los casos.",
            },
            {
              id: "ena2m9l2e6", type: "cloze", prompt: "Completa con la preposición… o con nada",
              text: "Can you explain it ___ me? I didn't understand the contract.",
              answers: ["to"],
              translation: "¿Me lo explicas? No he entendido el contrato.",
              hints: ["explain es del montón B", "Dos letras"],
              itemIds: ["ena2m9canyouexplainittome", "enidontunderstand"],
            },
            {
              id: "ena2m9l2e7", type: "cloze", prompt: "Y ahora al revés: completa con el pronombre",
              text: "Did you tell ___ about the party on Saturday?",
              answers: ["him", "her", "them"],
              translation: "¿Le dijiste lo de la fiesta del sábado?",
              hints: ["tell es del montón A: la persona va pegada al verbo, sin preposición", "Elige el pronombre de objeto que quieras: h… / t…"],
              itemIds: ["ena2m9didyoutellhim"],
              tip: "Aquí valen varios pronombres: lo que se corrige es que no hayas metido un «to» que no toca.",
            },
            {
              id: "ena2m9l2e8", type: "match", prompt: "Empareja cada verbo con su patrón",
              pairs: [
                { target: "tell", source: "…me the truth (persona pegada)" },
                { target: "explain", source: "…the rules to me (persona con to)" },
                { target: "show", source: "…me the flat (persona pegada)" },
                { target: "recommend", source: "…the street to me (persona con to)" },
              ],
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup"],
            },
            {
              id: "ena2m9l2e9", type: "transform", prompt: "Cambia de montón sin cambiar el significado",
              source: "She explained the house rules to me.",
              instruction: "Dilo con «tell» — y fíjate en lo que le pasa al «to»",
              answers: ["She told me the house rules.", "She told me about the house rules."],
              translation: "Me explicó las normas de la casa.",
              hints: ["tell es del montón A: la persona se pega al verbo y el «to» desaparece", "She told m… the house rules."],
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup"],
              tip: "Este ejercicio es el mejor examen de si has entendido el cubo: cambiar de verbo obliga a mover la persona y a quitar la preposición.",
            },
            {
              id: "ena2m9l2e10", type: "gapbank", prompt: "La primera semana en el piso — elige el verbo",
              text: "Amy ___ me the truth about the neighbours. Then she ___ the house rules to me, one by one. In the end she ___ me the note on the fridge.",
              answers: ["told", "explained", "showed"],
              bank: ["told", "explained", "showed", "said", "listened", "wanted"],
              translation: "Amy me dijo la verdad sobre los vecinos. Luego me explicó las normas de la casa, una por una. Al final me enseñó la nota de la nevera.",
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup", "ena2m9nextdoorneighbour", "enfridge"],
              tip: "El segundo hueco lleva «to me» detrás: eso ya te dice que el verbo es del montón B. Los otros dos llevan la persona pegada, así que son del montón A.",
            },
            {
              id: "ena2m9l2e11", type: "build", prompt: "Construye la petición",
              target: "Can you explain it to me",
              translation: "¿Me lo explicas?",
              distractors: ["explains", "for"],
              itemIds: ["ena2m9canyouexplainittome"],
            },
            {
              id: "ena2m9l2e12", type: "speak", prompt: "Dilo en voz alta — los dos montones en una frase",
              text: "She told me the rules, but she didn't explain them to me.",
              phonetic: "shi TÓULD mi de ruuls̬, bat shi DÍ-dent iks-PLÉIN dem tu mi",
              translation: "Me dijo las normas, pero no me las explicó.",
              itemIds: ["ena2m9tellmegroup", "ena2m9explaintogroup", "enbut"],
              tip: "Una frase, los dos patrones. Si te sale sin pensarlo, el cubo está montado.",
            },
            {
              id: "ena2m9l2e13", type: "type", prompt: "Cierre de producción",
              question: "¿Por qué no me lo explicaste?",
              answers: [
                "Why didn't you explain it to me?",
                "Why didn't you explain that to me?",
              ],
              hints: ["Pregunta en pasado con did (módulo 2) + verbo del montón B", "Why didn't you explain it t… m…?"],
              itemIds: ["ena2m9canyouexplainittome", "ena2m9whydidntyoutellme"],
              tip: "Compárala con «Why didn't you tell me?», que es de la lección 7: mismo significado, dos montones, dos construcciones.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-2",
            book: "I don't understand.",
            real: "You've lost me.",
            meaning: "Me he perdido / no te sigo.",
            when: "Cuando alguien te está explicando algo y te has descolgado: en una conversación con amigos, con compañeros de piso o de trabajo. Es más suave que «I don't understand», porque pone la culpa en la explicación y no en ti. En el examen escrito, la del libro.",
            register: "amigos",
            note: "Y fíjate en el pronombre: «me» detrás del verbo, como toda la lección. Lo que sigue después suele ser «Can you say that again?».",
            sound: "yuuv LOST mi",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Verbs with two objects", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/verbs-two-objects", note: "La lista oficial de los dos patrones. Cópiate a mano solo los seis del montón B en un papel y pégalo donde estudias: es el único que hay que memorizar." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — reflexivos, y los que el inglés no lleva
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l3",
      phaseId: "ena2m9",
      title: "I did it myself",
      subtitle: "El reflexivo inglés — y los veinte «me» españoles que hay que tirar",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Sírvete, hazlo tú, vive solo",
          itemIds: ["ena2m9reflexivegroup", "ena2m9nonreflexivegroup", "ena2m9helpyourself", "ena2m9ididitmyself", "ena2m9bymyself", "ena2m9ifeeltired"],
        },
        {
          kind: "note",
          note: {
            title: "Para qué sirve el reflexivo inglés (y es para poco)",
            body: "Los reflexivos ingleses son ocho y se forman igual: el posesivo o el pronombre + <b>-self</b> (o <b>-selves</b> en plural).<br/><br/><b>myself · yourself · himself · herself · itself · ourselves · yourselves · themselves</b><br/><br/>Y hacen exactamente <b>tres</b> trabajos:<br/><br/><b>1. El reflexivo de verdad</b> — el que hace y el que recibe son la misma persona: <i>I cut myself.</i> (me corté) · <i>She looked at herself in the mirror.</i><br/><b>2. El énfasis</b> — «yo, sin ayuda de nadie»: <b>[[I did it myself.|Lo hice yo sola.]]</b> · <i>Did you paint the room yourselves?</i><br/><b>3. Con <u>by</u>, significa «solo/a»</b>: <b>[[I live by myself.|Vivo sola.]]</b> — que es lo mismo que <i>I live on my own</i>. Ojo al calco: <i>by my own</i> no existe; o <b>by myself</b> o <b>on my own</b>.<br/><br/>Y una fórmula que vas a oír el primer día en una casa compartida: <b>[[Help yourself!|¡Sírvete!]]</b> — con el plural <i>Help yourselves</i> si sois varios.<br/><br/><b>Ojo con el reflexivo mutuo:</b> «se ayudan» (el uno al otro) no es <i>They help themselves</i> —eso sería que cada uno se sirve a sí mismo— sino <b>They help each other</b>.",
            table: [
              ["para qué", "ejemplo", "en español"],
              ["reflexivo de verdad", "I cut myself.", "Me corté."],
              ["énfasis: sin ayuda", "I did it myself.", "Lo hice yo sola."],
              ["by + reflexivo = solo", "I live by myself.", "Vivo sola."],
              ["fórmula de la casa", "Help yourself!", "¡Sírvete!"],
              ["mutuo (¡otro!)", "They help each other.", "Se ayudan."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y ahora lo importante: los «me» del español que el inglés tira",
            body: "El español mete <b>me / te / se</b> en decenas de verbos donde no significa «a mí mismo», sino que forma parte del verbo: <i>levantarse, despertarse, sentirse, acordarse, quejarse, quedarse, irse, moverse, sentarse, ducharse, casarse, caerse, equivocarse…</i><br/><br/>De ahí salen los errores más repetidos del nivel: <i>I feel myself tired</i>, <i>I woke up myself</i>, <i>I get up myself at seven</i>, <i>She complained herself</i>.<br/><br/><b>La prueba que lo resuelve todo, y la puedes hacer tú sola:</b><br/><br/><b>¿Puedes añadir «a mí misma» y la frase sigue significando lo mismo?</b><br/>· «Me corté <u>a mí misma</u>» → sí, significa lo mismo → en inglés va <b>myself</b>: <i>I cut myself.</i><br/>· «Me levanté <u>a mí misma</u>» → no significa nada → en inglés <b>no va nada</b>: <i>I got up.</i><br/>· «Me siento cansada <u>a mí misma</u>» → no → <b>[[I feel tired.|Me siento cansada.]]</b><br/><br/>Una prueba contra veinte verbos. No hace falta la lista.<br/><br/>Y de regalo, la vacuna para el otro lado: en el módulo 2 ya viste que «me caí» es <b>I fell</b> y «me fui» es <b>I left</b>. Es exactamente el mismo fenómeno: el «me» español no viaja.",
            table: [
              ["en español lleva «me»", "en inglés", "el error a evitar"],
              ["me levanto a las siete", "I get up at seven.", "I get up myself at seven."],
              ["me desperté tarde", "I woke up late.", "I woke up myself late."],
              ["me siento cansada", "I feel tired.", "I feel myself tired."],
              ["no me acuerdo", "I don't remember.", "I don't remember myself."],
              ["se quejó del ruido", "She complained about the noise.", "She complained herself…"],
              ["me quedé en casa", "I stayed at home.", "I stayed myself at home."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l3e1", type: "match", prompt: "Empareja cada reflexivo con su persona",
              pairs: [
                { target: "myself", source: "yo mismo / yo misma" },
                { target: "yourself", source: "tú mismo / usted mismo" },
                { target: "himself", source: "él mismo" },
                { target: "herself", source: "ella misma" },
                { target: "themselves", source: "ellos mismos" },
              ],
              itemIds: ["ena2m9reflexivegroup"],
              tip: "Fíjate en el plural: -selves, con v. ourselves, yourselves, themselves. En singular, -self.",
            },
            {
              id: "ena2m9l3e2", type: "bucket", prompt: "LA PRUEBA DEL «A MÍ MISMO» — ¿lleva reflexivo en inglés o no?",
              categories: ["lleva -self", "en inglés no lleva nada"],
              items: [
                { text: "me corté con el cuchillo", bucket: 0 },
                { text: "me levanto a las siete", bucket: 1 },
                { text: "me siento cansada", bucket: 1 },
                { text: "se miró en el espejo", bucket: 0 },
                { text: "me desperté tarde", bucket: 1 },
                { text: "lo pintaron ellos mismos", bucket: 0 },
                { text: "no me acuerdo", bucket: 1 },
                { text: "me quedé en casa", bucket: 1 },
              ],
              itemIds: ["ena2m9reflexivegroup", "ena2m9nonreflexivegroup", "ena2m1istayedathome"],
              tip: "Aplica la prueba en voz baja: «me corté a mí misma» sí significa algo; «me levanté a mí misma» no. Solo los que pasan la prueba llevan -self.",
            },
            {
              id: "ena2m9l3e3", type: "errorfix", prompt: "Corrige el reflexivo que sobra",
              wrong: "I feel myself bad.",
              answers: ["I feel bad."],
              why: "«feel» en inglés no es reflexivo: I feel tired, I feel bad, I feel better. El «me» de «me siento» es parte del verbo español y no viaja. La prueba: «me siento mal a mí misma» no significa nada, así que fuera el myself.",
              translation: "Me siento mal.",
              itemIds: ["ena2m9nonreflexivegroup", "ena2m9ifeeltired"],
            },
            {
              id: "ena2m9l3e4", type: "errorfix", prompt: "Corrige — otro «me» que no viaja",
              wrong: "She woke up herself at six.",
              answers: ["She woke up at six."],
              why: "«despertarse» es reflexivo en español y no lo es en inglés: wake up a secas. Y ojo, porque «She woke him up» sí existe: significa que despertó a OTRA persona. Ahí el pronombre no es reflexivo, es objeto.",
              translation: "Se despertó a las seis.",
              itemIds: ["ena2m9nonreflexivegroup", "ena2m2wokegroup"],
            },
            {
              id: "ena2m9l3e5", type: "mc", prompt: "La que sí lo lleva",
              question: "«Lo hice yo sola, sin ayuda de nadie» es…",
              options: ["I did it myself.", "I did it alone myself.", "I did myself it."],
              answer: 0,
              whyWrong: [null, "«alone» y «myself» dicen lo mismo: uno de los dos sobra", "El objeto va pegado al verbo (did it) y el reflexivo de énfasis va al final"],
              itemIds: ["ena2m9ididitmyself"],
              tip: "Este myself no es reflexivo: es un subrayado. Significa «y no me ayudó nadie». Se puede quitar y la frase sigue en pie.",
            },
            {
              id: "ena2m9l3e6", type: "cloze", prompt: "Completa con el reflexivo que toca",
              text: "There's tea in the pot. Help ___!",
              answers: ["yourself", "yourselves"],
              translation: "Hay té en la tetera. ¡Sírvete!",
              hints: ["Se lo dices a quien está delante de ti", "your…"],
              itemIds: ["ena2m9helpyourself", "entea"],
            },
            {
              id: "ena2m9l3e7", type: "cloze", prompt: "Completa — y cuidado, que aquí no va reflexivo",
              text: "I ___ tired today. I didn't sleep well.",
              answers: ["feel", "felt"],
              translation: "Hoy me siento cansada. No he dormido bien.",
              hints: ["El «me» de «me siento» no viaja al inglés", "Una sola palabra, cuatro letras"],
              itemIds: ["ena2m9ifeeltired", "ena2m2ididntsleep"],
              tip: "Si has escrito «feel myself», vuelve a la prueba: «me siento cansada a mí misma» no significa nada.",
            },
            {
              id: "ena2m9l3e8", type: "transform", prompt: "Del español calcado al inglés de verdad",
              source: "I get up myself at seven and then I feel myself fine.",
              instruction: "Quita los reflexivos que sobran",
              answers: ["I get up at seven and then I feel fine."],
              translation: "Me levanto a las siete y luego me encuentro bien.",
              hints: ["Los dos verbos son de los que en inglés van desnudos"],
              itemIds: ["ena2m9nonreflexivegroup", "engetup", "enthen"],
            },
            {
              id: "ena2m9l3e9", type: "build", prompt: "Construye la frase de quien vive solo",
              target: "I live by myself in a small flat",
              translation: "Vivo sola en un piso pequeño",
              distractors: ["my", "own"],
              itemIds: ["ena2m9bymyself", "enflat"],
              tip: "Las dos fichas que sobran son la trampa: «by my own» no existe. O by myself, o on my own.",
            },
            {
              id: "ena2m9l3e10", type: "fastmatch", prompt: "Ráfaga — ¿con -self o sin nada?",
              pairs: [
                { target: "I cut myself.", source: "Me corté." },
                { target: "I got up.", source: "Me levanté." },
                { target: "I stayed at home.", source: "Me quedé en casa." },
                { target: "I did it myself.", source: "Lo hice yo sola." },
                { target: "I feel fine.", source: "Me encuentro bien." },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m9reflexivegroup", "ena2m9ididitmyself", "ena2m9nonreflexivegroup", "ena2m1istayedathome"],
              tip: "La velocidad es el objetivo: en el oral no vas a tener tiempo de aplicar la prueba, así que hay que dejarla automática aquí.",
            },
            {
              id: "ena2m9l3e11", type: "listen", prompt: "Dictado — uno lleva reflexivo y el otro no",
              text: "I live by myself and I do everything myself.",
              translation: "Vivo sola y lo hago todo yo.",
              hints: ["Los dos son myself, pero con trabajos distintos: «sola» y «yo, sin ayuda»", "I live b… myself and I do everything m…"],
              itemIds: ["ena2m9bymyself", "ena2m9ididitmyself"],
            },
            {
              id: "ena2m9l3e12", type: "speak", prompt: "Dilo en voz alta",
              text: "Help yourself to the coffee. I made it myself.",
              phonetic: "jelp yoo-SELF tu de KO-fi. ái MÉID it mai-SELF",
              translation: "Sírvete café. Lo he hecho yo.",
              itemIds: ["ena2m9helpyourself", "ena2m9ididitmyself", "encoffee"],
              tip: "El acento cae siempre en la segunda parte: mai-SELF, yoo-SELF. Nunca en el «my» ni en el «your».",
            },
            {
              id: "ena2m9l3e13", type: "type", prompt: "Cierre de producción",
              question: "Me levanté tarde y me sentía fatal, pero hice la cena yo sola.",
              answers: [
                "I got up late and I felt terrible, but I made dinner myself.",
                "I got up late and I felt terrible, but I cooked dinner myself.",
                "I woke up late and I felt terrible, but I made dinner myself.",
              ],
              hints: ["Dos verbos sin reflexivo y un myself de énfasis al final", "I got up late and I f… terrible, but I made dinner m…"],
              itemIds: ["ena2m9nonreflexivegroup", "ena2m9ididitmyself", "endinner"],
              tip: "Tres «me» en español y un solo myself en inglés — y el que queda no es reflexivo, es un subrayado. Ese es el resumen de la lección.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-3",
            book: "Come in and sit down, please.",
            real: "Make yourself at home.",
            meaning: "Estás en tu casa.",
            when: "Cuando alguien entra en tu piso por primera vez. Es de las fórmulas más fijas del inglés doméstico y no se cambia ni una palabra. En un email formal no pega; entre amigos y compañeros de piso, es lo normal.",
            register: "amigos",
            note: "Otro reflexivo de los que sí van: «yourself» porque el que se pone cómodo es el propio invitado. La hermana pequeña, para la cocina, es «Help yourself».",
            sound: "méik yoo-SELF at JÓUM",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Reflexive pronouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/reflexive-pronouns", note: "Cinco minutos de ficha y sus ejercicios. Cada vez que veas un reflexivo, pregúntate si en español dirías «a mí mismo»: esa costumbre es la que hay que instalar." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — de quién es: whose, mine, Amy's
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l4",
      phaseId: "ena2m9",
      title: "Whose is this?",
      subtitle: "Mío, tuyo, de Amy — y el genitivo que le da la vuelta a la frase",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "La cocina por la mañana: de quién es cada cosa",
          itemIds: ["ena2m9whoseisthis", "ena2m9possessivegroup", "ena2m9itsnotminesits", "ena2m9amysflat", "ena2m9whosekeysarethese", "ena2m9afriendofmine"],
        },
        {
          kind: "note",
          note: {
            title: "Dos familias de posesivos: una necesita sustantivo y la otra no",
            body: "Del A1 traes la primera familia: <b>my, your, his, her, our, their</b>. Todos ellos <b>necesitan un sustantivo detrás</b>: <i>my key</i>, <i>her room</i>, <i>their flat</i>.<br/><br/>Hoy entra la segunda: <b>mine, yours, his, hers, ours, theirs</b>. Estos van <b>solos</b>, sin nada detrás, y sustituyen a todo el grupo: <i>It's <b>my</b> key</i> → <i>It's <b>mine</b></i>.<br/><br/>De ahí salen los dos errores del nivel, y son espejo:<br/>· <i>It's mine key</i> ❌ — mine ya lleva dentro el sustantivo.<br/>· <b>[[It's not mine, it's hers.|No es mío, es suyo.]]</b> ✅ — nunca <i>it's her</i> a secas.<br/><br/><b>Y una cosa de ortografía que puntúa:</b> ninguno lleva apóstrofo. <b>hers</b>, <b>yours</b>, <b>ours</b>, <b>theirs</b>, <b>its</b>. Ese <i>its</i> sin apóstrofo es el posesivo («su»); <i>it's</i> con apóstrofo es «it is». Se confunden hasta en carteles de tiendas.<br/><br/><b>La pregunta:</b> <b>[[Whose is this?|¿De quién es esto?]]</b> · <b>[[Whose keys are these?|¿De quién son estas llaves?]]</b> — el calco que hay que matar es <i>Of who…?</i>, que no es inglés en ningún registro.<br/><br/>Y una construcción que parece rara y es utilísima: <b>[[a friend of mine|un amigo mío]]</b> — nunca <i>a friend of me</i>, ni <i>a my friend</i>.",
            table: [
              ["con sustantivo detrás", "solo, sin sustantivo", "ejemplo"],
              ["my key", "mine", "It's mine."],
              ["your room", "yours", "Which room is yours?"],
              ["his coat", "his", "That coat is his."],
              ["her keys", "hers", "The keys are hers."],
              ["our flat", "ours", "The flat is ours."],
              ["their post", "theirs", "This letter is theirs."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«El piso de Amy» se dice al revés: Amy's flat",
            body: "El español dice <b>cosa + de + dueño</b>: «el piso <u>de Amy</u>», «las llaves <u>de mi hermana</u>». El inglés le da la vuelta: <b>dueño + 's + cosa</b>.<br/><br/><i>the flat of Amy</i> ❌ → <b>[[Amy's flat|el piso de Amy]]</b> ✅<br/><i>the keys of my sister</i> ❌ → <b>my sister's keys</b> ✅<br/><br/><b>Los tres casos, y no hay más:</b><br/>1. Singular → <b>'s</b>: <i>Ben's key</i>, <i>the landlord's number</i>.<br/>2. Plural que ya acaba en -s → <b>solo el apóstrofo</b>: <i>my flatmates' room</i> (la habitación de mis compañeros).<br/>3. Plural irregular, sin -s → otra vez <b>'s</b>: <i>the children's room</i>, <i>the people's flats</i>.<br/><br/><b>¿Y con las cosas?</b> Ahí el inglés sí usa <i>of</i> —<i>the end of the street</i>, <i>the name of the street</i>— aunque muchas veces prefiere pegar los dos sustantivos y ya está: <b>the kitchen door</b>, <b>the front door key</b>. La regla práctica: <b>si el dueño es una persona (o un animal, o un país), 's; si es una cosa, of o dos sustantivos juntos.</b><br/><br/>Y el aviso de oído para la lección siguiente: <i>Amy's flat</i> y <i>Amy is late</i> empiezan igual. La <b>'s</b> del genitivo suena exactamente como la <b>'s</b> de <i>is</i>. Lo desambigua lo que viene detrás, no el oído.",
            table: [
              ["en español", "en inglés", "por qué"],
              ["el piso de Amy", "Amy's flat", "dueño delante + 's"],
              ["las llaves de mi hermana", "my sister's keys", "dueño delante + 's"],
              ["la habitación de mis compañeros", "my flatmates' room", "plural en -s: solo apóstrofo"],
              ["el final de la calle", "the end of the street", "cosa: se usa of"],
              ["la llave del portal", "the front door key", "cosa: dos sustantivos juntos"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l4e1", type: "bucket", prompt: "¿Necesita sustantivo detrás o va solo?",
              categories: ["pide sustantivo detrás (my key)", "va solo (It's mine)"],
              items: [
                { text: "my", bucket: 0 },
                { text: "mine", bucket: 1 },
                { text: "your", bucket: 0 },
                { text: "yours", bucket: 1 },
                { text: "her", bucket: 0 },
                { text: "hers", bucket: 1 },
                { text: "our", bucket: 0 },
                { text: "theirs", bucket: 1 },
              ],
              itemIds: ["ena2m9possessivegroup", "enour", "entheir"],
              tip: "Casi todos los de la derecha acaban en -s. La excepción es «his», que sirve para las dos columnas: his coat / that coat is his.",
            },
            {
              id: "ena2m9l4e2", type: "match", prompt: "Empareja cada posesivo con su significado",
              pairs: [
                { target: "mine", source: "el mío / la mía" },
                { target: "yours", source: "el tuyo / la tuya" },
                { target: "hers", source: "el suyo (de ella)" },
                { target: "ours", source: "el nuestro" },
                { target: "theirs", source: "el suyo (de ellos)" },
              ],
              itemIds: ["ena2m9possessivegroup"],
              tip: "Ni uno lleva apóstrofo. «her's» y «their's» no existen, aunque los veas escritos por ahí.",
            },
            {
              id: "ena2m9l4e3", type: "errorfix", prompt: "Corrige el posesivo cojo",
              wrong: "It's not mine, it's her.",
              answers: ["It's not mine, it's hers."],
              why: "«her» pide un sustantivo detrás (her coat). Cuando va sola, la forma es «hers». Es la misma pareja que my/mine, your/yours, our/ours, their/theirs.",
              translation: "No es mío, es suyo.",
              itemIds: ["ena2m9itsnotminesits"],
            },
            {
              id: "ena2m9l4e4", type: "errorfix", prompt: "Corrige el orden del genitivo",
              wrong: "This is the flat of Amy.",
              answers: ["This is Amy's flat."],
              why: "Con personas, el inglés pone el dueño DELANTE y le añade 's. «The flat of Amy» se entiende, pero suena a traducción y en el examen te cuesta la banda de Grammar. El «of» se reserva para las cosas: the end of the street.",
              translation: "Este es el piso de Amy.",
              itemIds: ["ena2m9amysflat", "enflat"],
            },
            {
              id: "ena2m9l4e5", type: "mc", prompt: "La pregunta de la cocina",
              question: "«¿De quién son estas llaves?» es…",
              options: ["Whose keys are these?", "Of who are these keys?", "Who's keys are these?"],
              answer: 0,
              whyWrong: [null, "«Of who» no existe en inglés: la pregunta de posesión es whose y va la primera", "Suena igual, pero «who's» es «who is». La de posesión se escribe whose"],
              itemIds: ["ena2m9whosekeysarethese", "ena2m2mykeys"],
              tip: "whose va SIEMPRE al principio y se lleva pegado el sustantivo: Whose keys…? Whose room…? Whose turn…?",
            },
            {
              id: "ena2m9l4e6", type: "cloze", prompt: "Completa con el posesivo que va solo",
              text: "That's not my coat. Mine is black — that one is ___.",
              answers: ["yours", "hers", "his", "theirs", "ours"],
              translation: "Ese no es mi abrigo. El mío es negro; ese es tuyo.",
              hints: ["Va solo, sin sustantivo detrás", "Acaba en -s y no lleva apóstrofo"],
              itemIds: ["ena2m9possessivegroup", "ena2m3acoat", "enblack"],
            },
            {
              id: "ena2m9l4e7", type: "cloze", prompt: "Completa con el genitivo",
              text: "The blue bag isn't mine — it's ___ bag. (Amy)",
              answers: ["Amy's"],
              translation: "El bolso azul no es mío: es el bolso de Amy.",
              hints: ["El dueño va delante, con dos caracteres detrás", "Amy…"],
              itemIds: ["ena2m9amysflat", "enblue"],
            },
            {
              id: "ena2m9l4e8", type: "transform", prompt: "Dale la vuelta al genitivo",
              source: "the room of my flatmate",
              instruction: "Escríbelo como lo escribiría un inglés",
              answers: ["my flatmate's room"],
              translation: "la habitación de mi compañera de piso",
              hints: ["Dueño delante, cosa detrás", "my flatmate… room"],
              itemIds: ["ena2m9amysflat", "enflatmate", "enroom"],
            },
            {
              id: "ena2m9l4e9", type: "transform", prompt: "Sustituye el grupo entero por un posesivo solo",
              source: "This is my key and that one is your key.",
              instruction: "Quita el segundo «key» sin perder el significado",
              answers: ["This is my key and that one is yours.", "This is my key and that's yours."],
              translation: "Esta es mi llave y esa es la tuya.",
              hints: ["your + key se comprimen en una sola palabra", "…and that one is y…"],
              itemIds: ["ena2m9possessivegroup", "enthat"],
              tip: "Para eso están: para no repetir el sustantivo. Es lo mismo que hace el español con «la tuya».",
            },
            {
              id: "ena2m9l4e10", type: "build", prompt: "Construye la presentación",
              target: "She is a friend of mine",
              translation: "Es una amiga mía",
              distractors: ["me", "my"],
              itemIds: ["ena2m9afriendofmine", "enfriend"],
              tip: "«a friend of me» y «a my friend» son las dos trampas. La fórmula fija es of + mine / yours / his / hers.",
            },
            {
              id: "ena2m9l4e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "¿De quién es este abrigo? No es mío, creo que es de Ben.",
              answers: [
                "Whose is this coat? It isn't mine, I think it's Ben's.",
                "Whose coat is this? It isn't mine, I think it's Ben's.",
                "Whose is this coat? It's not mine, I think it's Ben's.",
              ],
              hint: "la pregunta abre con una sola palabra, y el dueño del final lleva dos caracteres detrás",
              itemIds: ["ena2m9whoseisthis", "ena2m9itsnotminesits", "ena2m9amysflat", "ena2m3acoat"],
            },
            {
              id: "ena2m9l4e12", type: "speak", prompt: "Dilo en voz alta — la escena entera",
              text: "Whose is this? It's not mine, it's Amy's.",
              phonetic: "JUUS̬ is̬ dis. its not MÁIN, its ÉI-mis̬",
              translation: "¿De quién es esto? No es mío, es de Amy.",
              itemIds: ["ena2m9whoseisthis", "ena2m9itsnotminesits", "ena2m9amysflat"],
              tip: "Las tres eses finales son /z/, no /s/: juus̬, máin (esta no lleva), ÉI-mis̬. Con la garganta vibrando.",
            },
            {
              id: "ena2m9l4e13", type: "type", prompt: "Cierre de producción",
              question: "Estas llaves no son mías: son de mi compañera de piso.",
              answers: [
                "These keys aren't mine, they're my flatmate's.",
                "These keys are not mine, they're my flatmate's.",
                "These keys aren't mine, they are my flatmate's.",
              ],
              hints: ["Posesivo solo + genitivo con 's", "These keys aren't m…, they're my flatmate…"],
              itemIds: ["ena2m9possessivegroup", "ena2m9amysflat", "enflatmate", "ena2m2mykeys"],
              tip: "Fíjate en el final: «my flatmate's» se queda ahí colgado, sin «keys» detrás, porque ya se sabe de qué hablas. Eso también lo hace el inglés.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-4",
            book: "It isn't mine.",
            real: "Nothing to do with me.",
            meaning: "Yo no he sido / no es cosa mía.",
            when: "Entre compañeros de piso, cuando aparece algo en la cocina y nadie lo reclama, o cuando te achacan un lío que no es tuyo. Suena a defensa rápida; en un email de trabajo escribe «That wasn't me» o «It isn't mine».",
            register: "amigos",
            note: "Frase sin verbo, como muchas de las que se dicen de verdad. Y otra vez el pronombre de objeto detrás de la preposición: with ME, nunca with I.",
            sound: "NA-zing tu du uid mi",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Possessives: nouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/possessives-nouns", note: "La ficha del genitivo sajón con sus tres casos. Haz los ejercicios y presta atención solo al apóstrofo: en singular delante de la s, en plural detrás." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: los pronombres que casi no se oyen
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l5",
      phaseId: "ena2m9",
      title: "Clínica de sonido: tell 'im, ask 'er",
      subtitle: "La h que desaparece — y por qué el Listening se te escapa justo ahí",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Los cuatro sonidos de la clínica",
          itemIds: ["ena2m9weakhim", "ena2m9weakher", "ena2m9weakthem", "ena2m9whoseorwhos"],
        },
        {
          kind: "note",
          note: {
            title: "En el habla real, los pronombres se desinflan",
            body: "Un pronombre casi nunca lleva el acento de la frase: la información va en el verbo y en el sustantivo. Y en inglés, <b>lo que no lleva acento se encoge</b>. Con los pronombres de objeto pasa algo que descoloca a todo el mundo: <b>se les cae la h</b> y se pegan a la palabra de delante.<br/><br/>· <b>him</b> → suena «im», pegado: <b>[[tell him|decirle]]</b> = <i>TE-lim</i> · <i>ask him</i> = <i>AAS-kim</i> · <i>I saw him</i> = <i>ai SÓO-im</i><br/>· <b>her</b> → suena una vocal floja: <b>[[ask her|preguntarle]]</b> = <i>AAS-ka</i> · <i>I gave her the key</i> = <i>ai GUÉI-va de kii</i><br/>· <b>his</b> → «is̬»: <i>in his room</i> = <i>i-NIS̬ ruum</i><br/>· <b>them</b> → «dem», y en habla rápida se queda en «em»: <b>[[give them a key|darles una llave]]</b> = <i>GUI-vem a kii</i><br/><br/><b>La h vuelve</b> solo en dos sitios: al principio de una frase (<i>He phoned me</i>) y cuando el pronombre lleva énfasis (<i>HER? No, HIS</i>).<br/><br/><b>Por qué esta clínica y no otra:</b> media respuesta del Listening del examen depende de saber a quién se refiere una frase, y ese dato viaja en la sílaba más floja de la frase. «I gave it to her» suena <i>ai guéi-vi-tu-a</i>: cuatro palabras fundidas en tres sílabas. Si esperas oír «her» con su hache, no lo vas a oír nunca — porque no está.<br/><br/>Y esto no es una habilidad nueva: es el mismo <b>enlace consonante→vocal</b> que trabajaste en el módulo 5 con <i>a lot of</i> y <i>a bit of</i>. Aquí el enlace se come una hache por el camino.",
            table: [
              ["lo que está escrito", "lo que suena", "en español"],
              ["tell him", "TE-lim", "decirle"],
              ["ask her", "AAS-ka", "preguntarle"],
              ["I saw him", "ai SÓO-im", "lo vi"],
              ["give them a key", "GUI-vem a kii", "darles una llave"],
              ["in his room", "i-NIS̬ ruum", "en su habitación"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y el par que suena idéntico: whose / who's",
            body: "<b>[[whose / who's|de quién / quién es]]</b> se pronuncian <b>exactamente igual</b>: <i>juus̬</i>. No hay ninguna diferencia de sonido, ni de longitud, ni de nada. El oído aquí no sirve para nada, y eso es una buena noticia: significa que no tienes que entrenarlo.<br/><br/>Lo que decide cuál escribes es la <b>gramática</b>:<br/>· <b>whose</b> = <i>de quién</i>, y le sigue un <b>sustantivo</b> o el verbo <i>be</i>: <i>Whose keys are these?</i> · <i>Whose is this?</i><br/>· <b>who's</b> = <i>who is</i> / <i>who has</i>, y le sigue un <b>verbo</b> o un participio: <i>Who's coming tonight?</i> · <i>Who's got the key?</i><br/><br/>Prueba de un segundo: <b>si puedes sustituirlo por «who is», lleva apóstrofo</b>. Si no puedes, es whose.<br/><br/>Es el mismo par que <i>its</i> / <i>it's</i> de la lección anterior, y el mismo que <i>your</i> / <i>you're</i>. En los tres, el apóstrofo señala un verbo escondido.",
            table: [
              ["se escribe", "es", "detrás va", "ejemplo"],
              ["whose", "de quién", "un sustantivo o «is/are»", "Whose turn is it?"],
              ["who's", "who is / who has", "un verbo", "Who's got the key?"],
              ["its", "su (de ello)", "un sustantivo", "The flat and its garden"],
              ["it's", "it is", "un adjetivo o un verbo", "It's cold in here."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l5e1", type: "hearreal", prompt: "¿Libro o calle? La h de him",
              book: "Tell him tomorrow.",
              real: "Tellim tomorrow.",
              translation: "Díselo mañana.",
              itemIds: ["ena2m9weakhim"],
              tip: "Las dos son la MISMA frase: la segunda es cómo suena de verdad. La l de tell se enchufa a la i de him y la hache no llega a existir.",
            },
            {
              id: "ena2m9l5e2", type: "hearreal", prompt: "¿Libro o calle? La h de her",
              book: "I asked her yesterday.",
              real: "I askeder yesterday.",
              translation: "Se lo pregunté ayer.",
              itemIds: ["ena2m9weakher", "ena2m1asked"],
              tip: "«asked her» son tres consonantes seguidas y luego una vocal floja: AAS-ka. Si esperas una hache, pierdes la palabra entera.",
            },
            {
              id: "ena2m9l5e3", type: "hearreal", prompt: "¿Libro o calle? El them que se queda en 'em",
              book: "Give them a key.",
              real: "Give em a key.",
              translation: "Dales una llave.",
              itemIds: ["ena2m9weakthem"],
              tip: "Este no lo produzcas todavía: reconócelo. En el examen escribe siempre «them».",
            },
            {
              id: "ena2m9l5e4", type: "audiomc", prompt: "¿De quién habla? — 2 escuchas",
              audio: "I saw her this morning and I told him about the rent.",
              question: "¿A quién le contó lo del alquiler?",
              options: ["A él", "A ella", "A los dos"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "«her» aparece al principio, con saw. El verbo told lleva «him» detrás", "Solo hay un verbo de contar en la frase"],
              itemIds: ["ena2m9weakhim", "ena2m9weakher", "ena2m9ipaytherentonthefirst"],
              tip: "La estrategia del examen: no persigas la hache, persigue el VERBO. Lo que va pegado detrás del verbo es el pronombre, y ahí lo cazas.",
            },
            {
              id: "ena2m9l5e5", type: "audiomc", prompt: "Cuatro palabras en tres sílabas — 2 escuchas",
              audio: "I gave it to her on Monday.",
              question: "¿A quién se lo dio?",
              options: ["A ella", "A él", "A nadie: no dice a quién"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "«him» sonaría «im», con la i cerrada. Lo que suena al final es una vocal floja: her", "Sí lo dice, pero fundido: «it to her» se comprime en «i-tu-a»"],
              itemIds: ["ena2m9weakher", "ena2m9icantfindit"],
              tip: "«it to her» se funde en «i-tu-a». Es el trozo más comprimido de la frase y el que lleva la información. Cuenta con ello.",
            },
            {
              id: "ena2m9l5e6", type: "shadow", prompt: "Sombrea el enlace — primero lento, luego a velocidad normal",
              text: "Tell him, ask her and give them a key.",
              phonetic: "TE-lim, AAS-ka and GUI-vem a KII",
              translation: "Díselo, pregúntale y dales una llave.",
              reps: 2,
              itemIds: ["ena2m9weakhim", "ena2m9weakher", "ena2m9weakthem"],
              tip: "Tres enlaces seguidos y ni una hache. Si te sale sin separar las palabras, ya suenas a otra cosa.",
            },
            {
              id: "ena2m9l5e7", type: "bucket", prompt: "¿whose o who's?",
              categories: ["whose (de quién)", "who's (who is / who has)"],
              items: [
                { text: "___ keys are these?", bucket: 0 },
                { text: "___ coming tonight?", bucket: 1 },
                { text: "___ turn is it?", bucket: 0 },
                { text: "___ got the key?", bucket: 1 },
                { text: "___ is this jacket?", bucket: 0 },
                { text: "___ in the kitchen?", bucket: 1 },
              ],
              itemIds: ["ena2m9whoseorwhos", "ena2m9whosekeysarethese", "ena2m9itsyourturn"],
              tip: "La prueba de un segundo: si cabe «who is», lleva apóstrofo. «Who is keys are these?» no cabe, así que es whose.",
            },
            {
              id: "ena2m9l5e8", type: "cloze", prompt: "Completa — suenan igual, así que decide por gramática",
              text: "___ got my key? I can't find it anywhere.",
              answers: ["Who's", "Whos", "who's"],
              translation: "¿Quién tiene mi llave? No la encuentro por ningún sitio.",
              hints: ["Detrás va un verbo (got), no un sustantivo", "Cabe «Who has…»"],
              itemIds: ["ena2m9whoseorwhos", "ena2m9icantfindit"],
            },
            {
              id: "ena2m9l5e9", type: "listen", prompt: "Dictado — dos pronombres flojos",
              text: "I told him about it and I asked her for the key.",
              translation: "Se lo conté a él y le pedí la llave a ella.",
              hints: ["Los dos pronombres van pegados a su verbo y sin hache audible", "I told h… about it and I asked h… for the key."],
              itemIds: ["ena2m9weakhim", "ena2m9weakher"],
              tip: "Escríbelos CON hache: se escriben him y her aunque no suenen. La ortografía no se encoge, solo el sonido.",
            },
            {
              id: "ena2m9l5e10", type: "speak", prompt: "Dilo en voz alta — sin separar las palabras",
              text: "I saw him, I phoned her and I sent them a message.",
              phonetic: "ái SÓO-im, ái FÓUN-da and ái SENT dem a ME-sich",
              translation: "Lo vi, la llamé y les mandé un mensaje.",
              itemIds: ["ena2m9weakhim", "ena2m9weakher", "ena2m9weakthem", "ena2m1phoned"],
              tip: "Nota lo que pasa con «phoned her»: la d final se enchufa a la vocal de her y sale FÓUN-da. Ese es el enlace del módulo 5, otra vez.",
            },
            {
              id: "ena2m9l5e11", type: "mc", prompt: "Por qué esta clínica vale para el examen",
              question: "En el Listening del A2, ¿por qué se pierden tantas preguntas de «¿a quién?»",
              options: [
                "Porque el pronombre va en la sílaba más floja de la frase y sin hache",
                "Porque los pronombres se pronuncian muy despacio y confunden",
                "Porque en el examen no se usan pronombres",
              ],
              answer: 0,
              whyWrong: [null, "Al revés: van tan rápido que se funden con el verbo de delante", "Se usan constantemente: son el hilo que sujeta cualquier conversación"],
              itemIds: ["ena2m9weakhim", "ena2m9weakher"],
              tip: "Estrategia de examen, en una línea: si la pregunta es «¿a quién?», escucha el trozo pegado DETRÁS del verbo, no una palabra suelta.",
            },
            {
              id: "ena2m9l5e12", type: "type", prompt: "Cierre de producción",
              question: "¿De quién es esta llave? Pregúntale a Amy, dile que la encontré en la cocina.",
              answers: [
                "Whose is this key? Ask Amy, tell her I found it in the kitchen.",
                "Whose key is this? Ask Amy, tell her I found it in the kitchen.",
                "Whose is this key? Ask Amy and tell her I found it in the kitchen.",
              ],
              hints: ["whose sin apóstrofo + dos pronombres detrás de sus verbos", "Whose is this key? Ask Amy, tell h… I found i… in the kitchen."],
              itemIds: ["ena2m9whoseisthis", "ena2m9weakher", "ena2m9icantfindit", "eninthekitchen"],
              tip: "Escrito lleva todo: whose, her, it. Dicho, la mitad se funde. Escribir y decir son dos oficios y hay que hacer los dos.",
            },
          ],
        },
      ],
      resources: [
        { label: "BBC Learning English — The Sounds of English", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca los vídeos de «weak forms» y «connected speech». Cinco minutos al día durante una semana: el Listening del examen se juega aquí, no en el vocabulario." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — la casa compartida y el barrio
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l6",
      phaseId: "ena2m9",
      title: "Where I live",
      subtitle: "El piso, el alquiler, el casero y los vecinos — segunda pasada",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas de una casa compartida",
          itemIds: ["ena2m9weshareaflat", "ena2m9ipaytherentonthefirst", "ena2m9ourlandlordlivesupstairs", "ena2m9nextdoorneighbour", "ena2m9alettercameforyou", "enflatmate"],
        },
        {
          kind: "note",
          note: {
            title: "Describir dónde vives: el guion de tres bloques",
            body: "«Where do you live?» es de las cinco preguntas que <b>seguro</b> te hacen en la Parte 1 del oral, y también uno de los temas del monólogo de la Parte 4. Con un guion de tres bloques la respuesta sale sola y no se te queda corta.<br/><br/><b>1. Qué y dónde.</b> <i>I live in a flat in North London, near the station.</i><br/><b>2. Con quién y cómo es.</b> <i>[[We share a flat.|Compartimos piso.]] It's small, but it's very bright. There are two bedrooms, a kitchen and a living room.</i><br/><b>3. El barrio y una opinión.</b> <i>The neighbourhood is quiet and there's a park near here. I like it a lot, but the rent is expensive.</i><br/><br/><b>El vocabulario de la casa compartida que hace falta:</b><br/>· <b>[[We share a flat.|Compartimos piso.]]</b> — con artículo. <i>We share flat</i> ❌ es calco directo de «compartimos piso».<br/>· <b>[[I pay the rent on the first.|Pago el alquiler el día uno.]]</b> — <i>rent</i> es el alquiler; el verbo <i>to rent</i> es alquilar.<br/>· <b>[[Our landlord lives upstairs.|Nuestro casero vive arriba.]]</b> — <i>landlord</i> (él) / <i>landlady</i> (ella). Y <i>upstairs</i>, <i>downstairs</i> van solos: <i>lives in upstairs</i> ❌.<br/>· <b>[[our next-door neighbour|nuestro vecino de al lado]]</b> — y <i>the neighbours upstairs</i>.<br/>· <b>[[A letter came for you.|Te ha llegado una carta.]]</b> — el correo que llega al piso.<br/><br/><b>Dos cosas británicas que conviene saber ya:</b><br/>1. Se dice <b>flat</b>, no <i>apartment</i> (eso es americano).<br/>2. La planta baja es el <b>ground floor</b>, y el <b>first floor</b> es lo que en España es el primero. Si quedas con alguien «on the first floor», hay que subir un piso.",
            table: [
              ["en español", "en inglés", "el calco a evitar"],
              ["Compartimos piso.", "We share a flat.", "We share flat."],
              ["Pago el alquiler el día uno.", "I pay the rent on the first.", "I pay the rent the first."],
              ["El casero vive arriba.", "Our landlord lives upstairs.", "…lives in upstairs."],
              ["Te ha llegado una carta.", "A letter came for you.", "It came a letter for you."],
              ["la planta baja", "the ground floor", "the first floor"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l6e1", type: "fastmatch", prompt: "Ráfaga — la casa del A1 sigue en pie",
              pairs: [
                { target: "the kitchen", source: "la cocina" },
                { target: "the bathroom", source: "el baño" },
                { target: "the living room", source: "el salón" },
                { target: "the bedroom", source: "el dormitorio" },
                { target: "the garden", source: "el jardín" },
              ],
              targetSeconds: 25,
              itemIds: ["enkitchen", "enbathroom", "enlivingroom", "enbedroom", "engarden"],
              tip: "Todo esto es del módulo 7 del A1. La segunda pasada no repite palabras: añade el alquiler, el casero y los vecinos encima.",
            },
            {
              id: "ena2m9l6e2", type: "errorfix", prompt: "Corrige el artículo que falta",
              wrong: "We share flat with two other people.",
              answers: ["We share a flat with two other people."],
              why: "«Compartimos piso» va sin artículo en español y con artículo en inglés: share A flat, share A room, share A house. Es la misma familia que «soy profesora» → I'm A teacher, del A1.",
              translation: "Compartimos piso con otras dos personas.",
              itemIds: ["ena2m9weshareaflat", "enpeople"],
            },
            {
              id: "ena2m9l6e3", type: "errorfix", prompt: "Corrige la preposición que sobra",
              wrong: "Our landlord lives in upstairs.",
              answers: ["Our landlord lives upstairs."],
              why: "upstairs, downstairs, here, there, home y abroad son adverbios de lugar: ya llevan la preposición dentro. Igual que «I go home» y no «I go to home», que ya viste en el A1.",
              translation: "Nuestro casero vive arriba.",
              itemIds: ["ena2m9ourlandlordlivesupstairs", "enhome"],
            },
            {
              id: "ena2m9l6e4", type: "errorfix", prompt: "Corrige el sujeto que falta",
              wrong: "It came a letter for you this morning.",
              answers: ["A letter came for you this morning."],
              why: "El español pone el verbo delante y el sujeto detrás («llegó una carta»), y el inglés no puede: el sujeto va SIEMPRE delante del verbo. Si quieres el orden español, hay otra fórmula: There's a letter for you.",
              translation: "Te llegó una carta esta mañana.",
              itemIds: ["ena2m9alettercameforyou", "ena2m1therewas"],
              tip: "Es el mismo hueco que «It rained» del módulo 1, pero al revés: allí el inglés añadía un sujeto que el español no tiene; aquí obliga a colocarlo delante.",
            },
            {
              id: "ena2m9l6e5", type: "order", prompt: "Ordena la descripción del piso de Valeria",
              sentences: [
                "I live in a small flat in North London, near the station.",
                "I share it with Amy, my flatmate.",
                "There are two bedrooms, a kitchen and a small living room.",
                "Our landlord lives upstairs, so he hears everything.",
                "I like the neighbourhood a lot, but the rent is very expensive.",
              ],
              translation: "Vivo en un piso pequeño en el norte de Londres, cerca de la estación. Lo comparto con Amy, mi compañera de piso. Hay dos dormitorios, una cocina y un salón pequeño. Nuestro casero vive arriba, así que lo oye todo. El barrio me gusta mucho, pero el alquiler es carísimo.",
              itemIds: ["ena2m9weshareaflat", "ena2m9ourlandlordlivesupstairs", "ena2m9ipaytherentonthefirst", "enflatmate", "enexpensive"],
              tip: "Los tres bloques de la nota, en cinco frases: qué y dónde · con quién y cómo es · el barrio y una opinión. Ese es el guion que llevas al oral.",
            },
            {
              id: "ena2m9l6e6", type: "cloze", prompt: "Completa con la palabra del alquiler",
              text: "I pay the ___ on the first of the month.",
              answers: ["rent"],
              translation: "Pago el alquiler el día uno del mes.",
              hints: ["Es lo que le pagas al casero cada mes", "r…"],
              itemIds: ["ena2m9ipaytherentonthefirst", "enthefirst", "enmonth"],
            },
            {
              id: "ena2m9l6e7", type: "mc", prompt: "Detalle británico que conviene no fallar",
              question: "Has quedado con alguien «on the first floor». ¿Dónde vas?",
              options: ["Subo un piso desde la calle", "Me quedo en la calle: es la planta baja", "Subo hasta el último piso"],
              answer: 0,
              whyWrong: [null, "La planta baja es el ground floor. El first floor está ya un piso por encima", "Ese sería el top floor"],
              itemIds: ["ena2m9ourlandlordlivesupstairs"],
              tip: "En Estados Unidos el «first floor» sí es la planta baja, y de ahí viene medio lío. El curso enseña británico: ground · first · second.",
            },
            {
              id: "ena2m9l6e8", type: "gapbank", prompt: "El piso de Valeria y Amy — rellena con la palabra del banco",
              text: "Valeria and Amy ___ a flat in North London. They pay the ___ on the first of the month, and their ___ lives upstairs.",
              answers: ["share", "rent", "landlord"],
              bank: ["share", "rent", "landlord", "neighbour", "letter", "kitchen"],
              translation: "Valeria y Amy comparten piso en el norte de Londres. Pagan el alquiler el día uno del mes y su casero vive arriba.",
              itemIds: ["ena2m9weshareaflat", "ena2m9ipaytherentonthefirst", "ena2m9ourlandlordlivesupstairs"],
              tip: "Ojo al segundo hueco: «rent» aquí es sustantivo (el alquiler). Como verbo, «to rent» es alquilar — y va sin the.",
            },
            {
              id: "ena2m9l6e9", type: "build", prompt: "Construye la frase del vecino",
              target: "Our next-door neighbour is very quiet",
              translation: "Nuestro vecino de al lado es muy tranquilo",
              distractors: ["ours", "of"],
              itemIds: ["ena2m9nextdoorneighbour", "ena2m3quietly"],
              tip: "Sobra «ours» porque delante de un sustantivo va «our», y sobra «of» porque el genitivo inglés no lo usa con personas.",
            },
            {
              id: "ena2m9l6e10", type: "audiomc", prompt: "Un recado del casero — 2 escuchas",
              audio: "Hello, it's your landlord. I'm coming on Friday morning to look at the window in the kitchen. A letter came for you as well, I've left it downstairs.",
              question: "¿Para qué viene el viernes?",
              options: ["Para mirar la ventana de la cocina", "Para traer una carta", "Para cobrar el alquiler"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "La carta ya está abajo: no es el motivo de la visita", "El alquiler no se menciona en el mensaje"],
              itemIds: ["ena2m9ourlandlordlivesupstairs", "ena2m9alettercameforyou", "enwindow", "eninthekitchen"],
              tip: "En un mensaje de este tipo casi siempre hay DOS datos y la pregunta va por uno solo. Apunta los dos mientras suena y luego elige.",
            },
            {
              id: "ena2m9l6e11", type: "speak", prompt: "Dilo en voz alta — tu bloque 1 y 2",
              text: "I live in a small flat near the station and I share it with a flatmate.",
              phonetic: "ái LIV in a smool FLAT nía de STÉI-shon and ái SHÉA it uid a FLAT-meit",
              translation: "Vivo en un piso pequeño cerca de la estación y lo comparto con una compañera.",
              itemIds: ["ena2m9weshareaflat", "enflat", "enstation", "enflatmate"],
              tip: "Fíjate en «share it»: la r se enlaza con la i y suena «SHÉA-rit». La r solo suena si detrás va vocal — regla del inglés británico.",
            },
            {
              // LECTURA LARGA (Reading Part 4), la tercera del nivel. Género
              // expositivo-descriptivo: cómo funciona un edificio, que es la
              // lengua de este módulo (posesivos, pronombres de objeto,
              // reflexivos, have to) sin una estructura por delante.
              id: "ena2m9l6e13", type: "read", prompt: "Lectura larga, como la Parte 4 del Reading: lee el texto entero y responde. Toca las palabras subrayadas si necesitas la glosa.",
              title: "The rules nobody wrote down",
              text: "Valeria and Amy share a flat in North London. The building is small — three flats and a shop downstairs — and it has its own rules. Nobody wrote them down. You learn them.<br/><br/>Rule one: the [[bins|los cubos de basura]] go out on Tuesday night, not on Wednesday morning. The man from the ground floor puts his out on Monday, and everybody else pretends not to notice.<br/><br/>Rule two: the washing machine belongs to their flat, but the [[drying rack|el tendedero]] in the hall belongs to everybody. If you leave your clothes on it for two days, somebody moves them. Nobody says anything to you. They just move them.<br/><br/>Rule three: Nora, their neighbour, has a key to their flat. Amy gave it to her three years ago, after she left her own keys inside twice in one month. Nora has never used it, but she waters the plants when they go away and she always tells them who came to the door.<br/><br/>Valeria likes these rules. In Bogotá she lived with her family and the rules were her mother's: this is the hour, this is the plate, this is the seat. Here nobody tells her what she has to do, so she has to work it out herself. Most of the time she gets it right.",
              source: "relato del curso",
              questions: [
                {
                  id: "ena2m9l6e13q1",
                  q: "When do the bins go out?",
                  options: ["On Tuesday night", "On Wednesday morning", "On Monday"],
                  answer: 0,
                  why: "«the bins go out on Tuesday night, not on Wednesday morning». El lunes es lo que hace el del bajo, y el texto lo cuenta precisamente porque está mal.",
                },
                {
                  id: "ena2m9l6e13q2",
                  q: "What does the text suggest about the man from the ground floor?",
                  options: [
                    "He breaks the rule and nobody says anything to him",
                    "He is the only one who follows the rule",
                    "He takes out the bins for the whole building",
                  ],
                  answer: 0,
                  inference: true,
                  why: "«everybody else pretends not to notice» — hacer como que no lo ves solo tiene sentido si hay algo que ver.",
                },
                {
                  id: "ena2m9l6e13q3",
                  q: "Why has Nora got a key to the flat?",
                  options: [
                    "Because Amy locked her own keys inside twice in one month",
                    "Because Nora asked for one when they arrived",
                    "Because Nora looks after the shop downstairs",
                  ],
                  answer: 0,
                  why: "«Amy gave it to her three years ago, after she left her own keys inside twice in one month». Las plantas son lo que Nora hace con la llave, no la razón por la que la tiene.",
                },
                {
                  id: "ena2m9l6e13q4",
                  q: "Why does the writer repeat 'They just move them'?",
                  options: [
                    "Because in this building people correct each other without talking about it",
                    "Because the neighbours are angry with Valeria and Amy",
                    "Because the drying rack is always broken",
                  ],
                  answer: 0,
                  inference: true,
                  why: "La frase de al lado es «Nobody says anything to you». Las dos juntas dicen cómo funciona el sitio: se corrige, no se discute.",
                },
                {
                  id: "ena2m9l6e13q5",
                  q: "Why does Valeria like the rules of the building?",
                  options: [
                    "Because for the first time she works out for herself how to live",
                    "Because they are the same rules she had in Bogotá",
                    "Because her mother explained them to her",
                  ],
                  answer: 0,
                  inference: true,
                  why: "El contraste está en el último párrafo: en Bogotá las reglas eran de su madre; aquí «nobody tells her what she has to do». Lo que le gusta no son las reglas, es quién las decide.",
                },
              ],
              itemIds: ["ena2m9weshareaflat", "ena2m9nextdoorneighbour", "ena2m9choresgroup", "ena2m9itsyourturn"],
              tip: "Tercera lectura larga del nivel, y ya con tres preguntas de inferencia de cinco. En el examen son siete preguntas sobre un texto de este tamaño, y la mitad no están escritas en ninguna línea: se deducen juntando dos frases.",
            },
            {
              id: "ena2m9l6e12", type: "type", prompt: "Cierre de producción",
              question: "Compartimos piso y pagamos el alquiler el día uno. Nuestro casero vive arriba.",
              answers: [
                "We share a flat and we pay the rent on the first. Our landlord lives upstairs.",
                "We share a flat and pay the rent on the first. Our landlord lives upstairs.",
                "We share a flat and we pay the rent on the first of the month. Our landlord lives upstairs.",
              ],
              hints: ["Artículo en «share a flat» y nada delante de «upstairs»", "We share a… flat and we pay the r… on the first. Our landlord lives u…"],
              itemIds: ["ena2m9weshareaflat", "ena2m9ipaytherentonthefirst", "ena2m9ourlandlordlivesupstairs"],
              tip: "Tres frases y las tres trampas del bloque: el artículo, el sustantivo rent y el adverbio upstairs sin preposición.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking: describing where you live", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca la unidad de «my home» y escucha cómo se organiza la respuesta. Cronométrate: un minuto sobre tu casa, con los tres bloques de la nota." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — how often, why, which, y el reparto de tareas
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l7",
      phaseId: "ena2m9",
      title: "How often? Why? Which?",
      subtitle: "Las preguntas finas — y quién friega los platos",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar con puntería, y repartir la casa",
          itemIds: ["ena2m9howoftendoyouclean", "ena2m9onceaweek", "ena2m9whichroomisyours", "ena2m9whydidntyoutellme", "ena2m9itsyourturn", "ena2m9choresgroup"],
        },
        {
          kind: "note",
          note: {
            title: "Tres preguntas que el A1 no te dio",
            body: "Ya sabes preguntar <i>what</i>, <i>where</i>, <i>when</i>, <i>who</i>, <i>how much</i> y <i>how many</i>. Faltan tres, y las tres tienen su trampa española.<br/><br/><b>1. HOW OFTEN = ¿cada cuánto?</b><br/><b>[[How often do you clean the kitchen?|¿Cada cuánto limpias la cocina?]]</b><br/>El calco a matar es <i>How much times…?</i> — «times» es contable, así que sería <i>how many times</i>, y aun así lo natural es <b>how often</b>. Las respuestas son estas: <b>[[once a week|una vez por semana]]</b>, <i>twice a month</i>, <i>three times a week</i>, <i>every day</i>, <i>hardly ever</i>, <i>never</i>. Fíjate en el <b>a</b> de «once a week»: es «por», no «un».<br/><br/><b>2. WHY = ¿por qué?</b> — y necesita su auxiliar como cualquier otra pregunta.<br/><b>[[Why didn't you tell me?|¿Por qué no me lo dijiste?]]</b> — nunca <i>Why you didn't tell me?</i><br/>Y se contesta con <b>because</b> (módulo 2), no con <i>for</i>: <i>Because I forgot.</i><br/><br/><b>3. WHICH = ¿cuál (de estos)?</b><br/><b>[[Which room is yours?|¿Cuál es tu habitación?]]</b> · <i>Which one is better?</i><br/>Aquí está la trampa más fina del módulo, y es de las que marcan a un hispanohablante a un kilómetro: el español tiene <b>«cuál»</b> para todo, y el inglés reparte:<br/>· <b>which</b> cuando eliges entre un número <b>cerrado</b> de cosas que están ahí: dos habitaciones, tres llaves, estas dos fotos.<br/>· <b>what</b> cuando la opción está <b>abierta</b>: <i>What's your name?</i>, <i>What's your phone number?</i>, <i>What do you want?</i><br/>Por eso «¿cuál es tu nombre?» es <b>What's your name?</b> y jamás <i>Which is your name?</i>: los nombres posibles son infinitos.",
            table: [
              ["pregunta", "cuándo", "ejemplo", "el calco"],
              ["How often…?", "por la frecuencia", "How often do you clean it?", "How much times…?"],
              ["Why…?", "por la razón", "Why didn't you tell me?", "Why you didn't tell me?"],
              ["Which…?", "elección cerrada", "Which room is yours?", "—"],
              ["What…?", "elección abierta", "What's your surname?", "Which is your surname?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El reparto de la casa: turnos y tareas",
            body: "Una casa compartida se sostiene con tres frases, y las tres son de este módulo:<br/><br/>· <b>[[It's your turn.|Te toca.]]</b> — y su pregunta, <b>Whose turn is it?</b> Cuidado con el calco: «me toca» no es <i>it touches me</i>, que significa que te está tocando físicamente.<br/>· <b>We take turns.</b> — nos vamos turnando.<br/>· <b>[[do the washing-up · take out the rubbish · hoover the flat|fregar los platos · sacar la basura · pasar la aspiradora]]</b> — las tres tareas que aparecen en cualquier nota de cocina británica. Añade <i>do the shopping</i> (hacer la compra), <i>clean the bathroom</i> y <i>put the bins out</i>.<br/><br/><b>Vocabulario que solo se entiende sabiendo dónde estás:</b> <i>washing-up</i> es fregar los platos a mano (y el aparato es el <i>dishwasher</i>); <i>the rubbish</i> es la basura (los americanos dicen <i>trash</i>); y <i>hoover</i> es aspirar — viene de la marca Hoover, exactamente igual que en español se dice «un kleenex».<br/><br/>Y la pieza pragmática: para pedir un turno se usa la <b>escalera de cortesía del módulo 5</b>, no el imperativo. <i>Take out the rubbish</i> suena a orden; <b>Could you take out the rubbish, please?</b> es lo que se escribe en la nota de la nevera.",
            table: [
              ["en español", "en inglés"],
              ["Te toca.", "It's your turn."],
              ["¿A quién le toca?", "Whose turn is it?"],
              ["fregar los platos", "do the washing-up"],
              ["sacar la basura", "take out the rubbish"],
              ["pasar la aspiradora", "hoover the flat"],
              ["hacer la compra", "do the shopping"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l7e1", type: "match", prompt: "Empareja cada pregunta con lo que quiere saber",
              pairs: [
                { target: "How often…?", source: "cada cuánto pasa" },
                { target: "Why…?", source: "la razón" },
                { target: "Which…?", source: "cuál, entre pocos" },
                { target: "How many…?", source: "la cantidad, en cosas contables" },
              ],
              itemIds: ["ena2m9howoftendoyouclean", "ena2m9whydidntyoutellme", "ena2m9whichroomisyours", "enhowmany"],
            },
            {
              id: "ena2m9l7e2", type: "errorfix", prompt: "Corrige la pregunta de frecuencia",
              wrong: "How much times do you clean the kitchen?",
              answers: ["How often do you clean the kitchen?"],
              why: "«Times» es contable, así que ni siquiera podría llevar «much». Pero la forma natural en inglés no es contar veces: es preguntar «how often». Guarda «how many times» para cuando de verdad quieras el número exacto.",
              translation: "¿Cada cuánto limpias la cocina?",
              itemIds: ["ena2m9howoftendoyouclean"],
            },
            {
              id: "ena2m9l7e3", type: "errorfix", prompt: "Corrige el «cuál» que no es which",
              wrong: "Which is your surname?",
              answers: ["What is your surname?"],
              why: "«Which» solo vale cuando eliges entre un grupo cerrado que está delante (estas dos habitaciones, estas tres llaves). Los apellidos posibles son infinitos, así que la pregunta abre con «what». Es la trampa del «cuál» español, que sirve para las dos cosas.",
              translation: "¿Cuál es tu apellido?",
              itemIds: ["ena2m9whichroomisyours", "ensurname"],
            },
            {
              id: "ena2m9l7e4", type: "bucket", prompt: "¿Which o what?",
              categories: ["which (elección cerrada)", "what (elección abierta)"],
              items: [
                { text: "___ room is yours, this one or that one?", bucket: 0 },
                { text: "___ is your phone number?", bucket: 1 },
                { text: "___ of these two keys is mine?", bucket: 0 },
                { text: "___ do you want for dinner?", bucket: 1 },
                { text: "___ one is cheaper, the blue one or the red one?", bucket: 0 },
                { text: "___ time do you get up?", bucket: 1 },
              ],
              itemIds: ["ena2m9whichroomisyours", "ena2m4whichisbetterforme", "enwhatsyourphone"],
              tip: "Prueba rápida: si puedes señalar las opciones con el dedo, es «which». Si la respuesta puede ser cualquier cosa del mundo, es «what».",
            },
            {
              id: "ena2m9l7e5", type: "cloze", prompt: "Completa la pregunta de frecuencia",
              text: "How ___ do you take out the rubbish? — Twice a week.",
              answers: ["often"],
              translation: "¿Cada cuánto sacas la basura? — Dos veces por semana.",
              hints: ["Cinco letras, y no es «many times»", "o…"],
              itemIds: ["ena2m9howoftendoyouclean", "ena2m9choresgroup", "entwice"],
            },
            {
              id: "ena2m9l7e6", type: "cloze", prompt: "Completa la respuesta",
              text: "I hoover the flat ___ a week, usually on Sundays.",
              answers: ["once", "twice"],
              translation: "Paso la aspiradora una vez por semana, normalmente los domingos.",
              hints: ["Una vez = una sola palabra, no «one time»", "o… / t…"],
              itemIds: ["ena2m9onceaweek", "ena2m9choresgroup", "enusually"],
            },
            {
              id: "ena2m9l7e7", type: "mc", prompt: "El turno",
              question: "«Te toca fregar los platos» es…",
              options: ["It's your turn to do the washing-up.", "It touches you to do the washing-up.", "You have the turn of the washing-up."],
              answer: 0,
              whyWrong: [null, "«Touch» es tocar con la mano. El turno inglés se dice con «turn»", "«Have the turn of» no es inglés: la fórmula es It's your turn to + verbo"],
              itemIds: ["ena2m9itsyourturn", "ena2m9choresgroup"],
              tip: "La fórmula entera, para copiarla tal cual: It's my / your / his / her turn to + verbo en infinitivo.",
            },
            {
              id: "ena2m9l7e8", type: "transform", prompt: "Convierte la orden en petición — la escalera del módulo 5",
              source: "Take out the rubbish.",
              instruction: "Dilo como lo escribirías en la nota de la nevera",
              answers: ["Could you take out the rubbish, please?", "Could you take the rubbish out, please?", "Can you take out the rubbish, please?"],
              translation: "¿Puedes sacar la basura, por favor?",
              hints: ["Envuelve la orden en una pregunta y añade please al final", "C… you take out the rubbish, p…?"],
              itemIds: ["ena2m9choresgroup", "ena2m5couldyoubringussomewater"],
              tip: "En español «saca la basura» entre compañeros de piso no es maleducado. En inglés, sí. La escalera de cortesía del módulo 5 se cobra aquí entera.",
            },
            {
              id: "ena2m9l7e9", type: "build", prompt: "Construye la pregunta que más se oye en un piso compartido",
              target: "Whose turn is it to clean the bathroom",
              translation: "¿A quién le toca limpiar el baño?",
              distractors: ["who's", "of"],
              itemIds: ["ena2m9itsyourturn", "ena2m9whoseorwhos", "enbathroom"],
              tip: "El distractor «who's» es el par homófono de la lección 5: suena igual y aquí sería un error de escritura, no de oído.",
            },
            {
              id: "ena2m9l7e10", type: "audiomc", prompt: "El reparto de la semana — 2 escuchas",
              audio: "Right, so I do the washing-up on Monday and Wednesday, you take out the rubbish on Fridays, and we hoover the flat once a month, both of us together.",
              question: "¿Cada cuánto pasan la aspiradora?",
              options: ["Una vez al mes", "Una vez por semana", "Los viernes"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso sería «once a week»: en el audio suena «once a month»", "Los viernes es la basura, no la aspiradora"],
              notepad: true,
              itemIds: ["ena2m9choresgroup", "ena2m9onceaweek", "ena2m9howoftendoyouclean"],
              tip: "Tres tareas y tres frecuencias en un audio corto. Apunta las tres parejas en el cuaderno mientras suena: de memoria no salen.",
            },
            {
              id: "ena2m9l7e11", type: "write", prompt: "La nota de la nevera: reparte las tareas — 30-50 palabras",
              scenario: "Vives con Amy y Ben. Este mes nadie ha fregado y estáis todos hartos. Escribe la nota que vas a pegar en la nevera para repartir las tareas.",
              bullets: [
                "Propón repartir las tareas con «Could we…?» o «Could you…?»",
                "Nombra al menos una tarea de la casa",
                "Pregunta a quién le toca algo, con «whose turn»",
              ],
              checks: [
                { re: "(could|can) (you|we|i)", label: "una petición con could/can" },
                { re: "(washing-up|rubbish|bathroom|hoover|shopping)", label: "al menos una tarea de la casa" },
                { re: "whose|turn", label: "preguntar de quién es el turno" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "polite",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi both, Could we share the jobs this month, please? I'll do the washing-up on Monday and Wednesday. Ben, could you take out the rubbish on Fridays, because you finish early? And whose turn is it to clean the bathroom? Valeria",
              itemIds: ["ena2m9choresgroup", "ena2m9itsyourturn", "ena2m9howoftendoyouclean"],
              tip: "Antes de corregir, cuenta los imperativos pelados que has escrito («Take out the rubbish», «Clean the bathroom»). Cada uno de ellos, en inglés, suena a bronca — y en el examen es la nota de registro.",
            },
            {
              id: "ena2m9l7e12", type: "speak", prompt: "Dilo en voz alta — la pregunta y la respuesta",
              text: "How often do you clean the kitchen? Once a week, usually on Sundays.",
              phonetic: "jáu Ó-fen du yu KLIIN de KI-chen? UÁNS a UÍIK, YÚU-yua-li on SAN-deis̬",
              translation: "¿Cada cuánto limpias la cocina? Una vez por semana, normalmente los domingos.",
              itemIds: ["ena2m9howoftendoyouclean", "ena2m9onceaweek", "enusually"],
              tip: "«once» suena UÁNS, con la o de «one». Y ojo a la a de «once a week»: aquí significa «por», y va átona, casi no se oye.",
            },
            {
              id: "ena2m9l7e13", type: "type", prompt: "Cierre de producción",
              question: "¿Cada cuánto friegas los platos? ¿Y por qué no me lo dijiste?",
              answers: [
                "How often do you do the washing-up? And why didn't you tell me?",
                "How often do you do the washing-up? Why didn't you tell me?",
                "How often do you do the washing up? And why didn't you tell me?",
              ],
              hints: ["Las dos preguntas llevan su auxiliar: do en la primera, didn't en la segunda", "How o… do you do the washing-up? And why d… you tell me?"],
              itemIds: ["ena2m9howoftendoyouclean", "ena2m9whydidntyoutellme", "ena2m9choresgroup"],
              tip: "Dos preguntas, dos auxiliares, y en la segunda el pronombre pegado a tell. Módulos 1, 2 y 9 en una línea.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-7",
            book: "Can you take out the rubbish?",
            real: "Can you stick the bins out?",
            meaning: "¿Sacas la basura?",
            when: "Entre compañeros de piso y en familia, en Reino Unido. «The bins» son los cubos grandes que se dejan en la acera, y «stick» aquí no es pegar: significa «poner ahí sin más». En la nota de la nevera y en el examen, «take out the rubbish».",
            register: "amigos",
            note: "«Stick it in the fridge», «stick it on the table», «stick the kettle on»: stick sirve para colocar cualquier cosa en cualquier sitio sin ceremonia. Es de las palabras más útiles del inglés doméstico.",
            sound: "kan yu STIK de BINS̬ áut",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Question words", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/question-words", note: "La ficha completa de las palabras interrogativas. Fíjate solo en los ejemplos de which frente a what: es la distinción que el español no hace." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — abrir, interrumpir y cerrar (+ las question tags, que son A2)
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l8",
      phaseId: "ena2m9",
      title: "Have you got a minute?",
      subtitle: "Abrir, interrumpir y cerrar una conversación sin quedar mal",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Las fórmulas que abren y cierran",
          itemIds: ["ena2m9haveyougotaminute", "ena2m9sorrytointerrupt", "ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou", "ena2m9questiontags"],
        },
        {
          kind: "note",
          note: {
            title: "Una conversación inglesa no empieza ni acaba de golpe",
            body: "Esto no es gramática: es <b>pragmática</b>, y se puntúa en el criterio de <i>Task Fulfilment and Coherence</i> del oral. Un candidato con gramática correcta que entra a saco y se despide de golpe suena peor que uno con más errores y estas seis fórmulas.<br/><br/><b>ABRIR — pedir el turno antes de tomarlo</b><br/>· <b>[[Have you got a minute?|¿Tienes un momento?]]</b> — la más usada en Reino Unido.<br/>· <i>Can I ask you something?</i> · <i>Sorry, are you busy?</i><br/>Y para arrancar con alguien conocido: <i>Listen…</i> · <i>By the way…</i> (por cierto).<br/><br/><b>INTERRUMPIR — y aquí está el contraste</b><br/>· <b>[[Sorry to interrupt, but…|Perdona que te interrumpa, pero…]]</b><br/>· <i>Sorry, can I just say something?</i> · <i>Can I stop you there?</i><br/>En español se interrumpe subiendo un poco la voz y siguiendo: no hace falta anunciarlo y no se lee como grosería. <b>En inglés hay que ANUNCIAR la interrupción con una fórmula.</b> Cortar sin fórmula, aunque tengas razón y aunque sea urgente, se lee como maleducado — y en el oral del examen, como falta de cooperación.<br/><br/><b>CERRAR — y esto es una secuencia, no una palabra</b><br/>Una conversación inglesa se cierra en tres pasos, siempre en este orden:<br/>1. <b>La señal</b>: <i>Anyway…</i> · <i>Right…</i> · <i>Well…</i><br/>2. <b>La razón</b>: <b>[[Anyway, I'd better go.|Bueno, me voy yendo.]]</b> · <i>I've got to get back to work.</i><br/>3. <b>La despedida</b>: <b>[[It was nice talking to you.|Me ha alegrado hablar contigo.]]</b> · <i>See you later.</i><br/><br/>Saltarse el paso 1 es lo que hace que un «Bye» suene a colgar el teléfono a media frase. Esa palabrita —<i>anyway</i>, <i>right</i>— es el aviso de que la conversación se acaba, y el otro la está esperando.",
            table: [
              ["para qué", "lo que se dice", "en español"],
              ["abrir", "Have you got a minute?", "¿Tienes un momento?"],
              ["interrumpir", "Sorry to interrupt, but…", "Perdona que te corte, pero…"],
              ["señal de cierre", "Anyway…", "Bueno…"],
              ["la razón", "I'd better go.", "Me voy yendo."],
              ["la despedida", "It was nice talking to you.", "Me ha alegrado hablar contigo."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Las coletillas: «…, isn't it?» — y sí, entran en el examen",
            body: "<i>Esto <b>no</b> es material de frontera, aunque en algún sitio lo hayas leído así: la tabla de gramática del A2 Access incluye las <b>coletillas simples</b> en su columna. Se reconocen, se dicen y te las pueden pedir. Van aquí las cuatro de manual; las rebuscadas —«Let's go, shall we?», «Pass me that, will you?»— esas sí son de B1.</i><br/><br/>El español tiene <b>una</b> coletilla y no cambia nunca: «¿no?», «¿verdad?». <i>Hace frío aquí, <u>¿no?</u></i> · <i>Tú eres la compañera de Amy, <u>¿verdad?</u></i><br/><br/>El inglés cambia la coletilla <b>en cada frase</b>, y lo hace con dos reglas:<br/>1. Frase <b>afirmativa</b> → coletilla <b>negativa</b>. Frase negativa → coletilla afirmativa.<br/>2. La coletilla repite el <b>AUXILIAR</b> de la frase (is, are, was, do, did, can, have), nunca el verbo principal. Y si la frase no tiene auxiliar, el auxiliar es <b>do / does / did</b>: <i>You live upstairs, <b>don't you</b>?</i><br/><br/>· <b>[[It's cold in here, isn't it?|Hace frío aquí, ¿no?]]</b><br/>· <i>You're Amy's flatmate, <b>aren't you</b>?</i><br/>· <i>You didn't pay the rent, <b>did you</b>?</i><br/>· <i>She can cook, <b>can't she</b>?</i><br/><br/>El calco a evitar es el más natural del mundo para nosotros: <i>It's cold in here, no?</i> — se entiende, pero suena a extranjero al instante. Y el segundo error, casi peor: repetir el signo de la frase. «<i>You didn't pay the rent, <s>didn't you?</s></i>» no existe; si la frase va en negativo, la coletilla va en afirmativo.<br/><br/><b>Y el atajo honesto, para cuando hables:</b> mientras no te salga sola, usa <b>right?</b>, que es invariable y perfectamente correcto en registro informal: <i>It's cold in here, right?</i> Sirve para todas las frases y no se equivoca nunca. Ojo: es un salvavidas para el oral, no una excusa para no aprenderte el mecanismo, porque en el Reading y en el Listening las coletillas de verdad te van a salir igual.",
            table: [
              ["la frase", "la coletilla", "por qué"],
              ["It's cold in here,", "isn't it?", "afirmativa → negativa; auxiliar «is»"],
              ["You're Amy's flatmate,", "aren't you?", "afirmativa → negativa; auxiliar «are»"],
              ["You didn't pay the rent,", "did you?", "negativa → afirmativa; auxiliar «did»"],
              ["She can cook,", "can't she?", "afirmativa → negativa; auxiliar «can»"],
              ["You live upstairs,", "don't you?", "la frase no tiene auxiliar → lo pone «do»"],
              ["cualquiera de ellas,", "right?", "el atajo del oral, mientras no salga solo"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l8e1", type: "bucket", prompt: "¿Abre la conversación o la cierra?",
              categories: ["abre", "cierra"],
              items: [
                { text: "Have you got a minute?", bucket: 0 },
                { text: "Anyway, I'd better go.", bucket: 1 },
                { text: "Can I ask you something?", bucket: 0 },
                { text: "It was nice talking to you.", bucket: 1 },
                { text: "Sorry, are you busy?", bucket: 0 },
                { text: "Right, I'll let you get on.", bucket: 1 },
              ],
              itemIds: ["ena2m9haveyougotaminute", "ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou", "enimbusy"],
              tip: "Las de cerrar empiezan casi todas por una señal: Anyway, Right, Well. Esa palabra suelta es el aviso de que se acaba.",
            },
            {
              id: "ena2m9l8e2", type: "mc", prompt: "El contraste pragmático del módulo",
              question: "Tu compañera está hablando y tienes que decirle algo urgente. ¿Qué haces en inglés?",
              options: [
                "Anuncio la interrupción: «Sorry to interrupt, but…»",
                "Subo un poco la voz y sigo, como en español",
                "Espero en silencio hasta que termine, aunque sea urgente",
              ],
              answer: 0,
              whyWrong: [null, "Eso en español no es grosero y en inglés sí: cortar sin fórmula se lee como maleducado", "Tampoco hace falta: la fórmula existe justo para poder interrumpir sin quedar mal"],
              itemIds: ["ena2m9sorrytointerrupt"],
              tip: "La fórmula no es adorno: es el permiso. Con ella puedes cortar a quien sea; sin ella, no.",
            },
            {
              id: "ena2m9l8e3", type: "order", prompt: "Ordena la conversación entera, de la apertura al cierre",
              sentences: [
                "Amy, have you got a minute?",
                "Sorry to interrupt, but the landlord phoned about the window.",
                "He's coming on Friday morning, so somebody has to be at home.",
                "Anyway, I'd better go — I'm late for work.",
                "It was nice talking to you. See you tonight!",
              ],
              translation: "Amy, ¿tienes un momento? Perdona que te interrumpa, pero ha llamado el casero por lo de la ventana. Viene el viernes por la mañana, así que alguien tiene que estar en casa. Bueno, me voy yendo, que llego tarde al trabajo. Me ha alegrado hablar contigo. ¡Hasta esta noche!",
              itemIds: ["ena2m9haveyougotaminute", "ena2m9sorrytointerrupt", "ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou", "enimlate"],
              tip: "Esa es la forma completa: pedir el turno, anunciar el corte, el contenido, la señal de cierre y la despedida. Cinco frases y ninguna es difícil.",
            },
            {
              id: "ena2m9l8e4", type: "cloze", prompt: "Completa la señal de cierre",
              text: "___, I'd better go. It was nice talking to you!",
              answers: ["Anyway", "Right", "Well"],
              translation: "Bueno, me voy yendo. ¡Me ha alegrado hablar contigo!",
              hints: ["Es la palabra que avisa de que la conversación se acaba", "A… / R… / W…"],
              itemIds: ["ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou"],
            },
            {
              id: "ena2m9l8e5", type: "audiomc", prompt: "¿Qué está pasando aquí? — 2 escuchas",
              audio: "Right, I'd better let you get on. It was really nice talking to you. See you at the weekend!",
              question: "¿Qué está haciendo quien habla?",
              options: ["Cerrando la conversación", "Empezando a contar algo", "Interrumpiendo a la otra persona"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "«Right» al principio y «See you» al final: eso es un cierre de manual", "Para interrumpir se dice «Sorry to interrupt», y aquí no aparece"],
              itemIds: ["ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou", "enatweekend"],
              tip: "En la Parte 2 del Listening te dan un enunciado y tienes que elegir la mejor réplica. Reconocer si te están abriendo o cerrando la conversación decide la respuesta.",
            },
            {
              id: "ena2m9l8e6", type: "hearreal", prompt: "¿Libro o calle? La despedida que se comprime",
              book: "It was nice talking to you.",
              real: "Nice talking to you.",
              translation: "Me ha alegrado hablar contigo.",
              itemIds: ["ena2m9itwasnicetalkingtoyou"],
              tip: "En la calle se cae el «It was» entero, igual que se caen los pronombres flojos de la lección 5. Escrito, la fórmula completa.",
            },
            {
              id: "ena2m9l8e7", type: "match", prompt: "Empareja cada frase con su coletilla",
              pairs: [
                { target: "It's cold in here,", source: "isn't it?" },
                { target: "You're Amy's flatmate,", source: "aren't you?" },
                { target: "You didn't pay the rent,", source: "did you?" },
                { target: "She can cook,", source: "can't she?" },
              ],
              itemIds: ["ena2m9questiontags"],
              tip: "Fíjate en el mecanismo, que es siempre el mismo: la coletilla coge el auxiliar de la frase y le da la vuelta. Frase afirmativa, coletilla negativa.",
            },
            {
              id: "ena2m9l8e8", type: "mc", prompt: "El calco de la coletilla",
              question: "«Hace frío aquí, ¿no?» — ¿cuál suena a inglés?",
              options: ["It's cold in here, isn't it?", "It's cold in here, no?", "It's cold in here, is it?"],
              answer: 0,
              whyWrong: [null, "Ese «no?» es el calco directo del español. Se entiende, pero te delata en la primera frase", "La frase es afirmativa, así que la coletilla tiene que ser negativa: isn't it"],
              itemIds: ["ena2m9questiontags"],
              tip: "Mientras no te salga sola, di «right?»: es invariable, es correcta y nunca se equivoca de auxiliar. Pero apúntate el mecanismo, porque esto sí puede caer.",
            },
            {
              id: "ena2m9l8e9", type: "audiomc", prompt: "La coletilla, al oído — 2 escuchas",
              audio: "You're Amy's flatmate, aren't you? I've seen you in the hall.",
              question: "¿Qué está haciendo quien habla?",
              options: ["Confirmando algo que ya cree saber", "Preguntando por primera vez", "Presentándose"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Una pregunta de verdad sería «Are you Amy's flatmate?». La coletilla dice que ya lo daba por hecho", "No dice su nombre en ningún momento"],
              itemIds: ["ena2m9questiontags", "ena2m9amysflat"],
              tip: "Ese es todo el trabajo de una coletilla: no pregunta, confirma. Por eso en el Listening cambia el sentido de la respuesta que se espera.",
            },
            {
              // Producción de coletillas: entra en el A2 Access, así que no
              // basta con reconocerlas. Numerados al final porque los ids de
              // ejercicio son claves de progreso y no se renumera lo que ya
              // existe.
              id: "ena2m9l8e13", type: "cloze", prompt: "Completa la coletilla — la frase va en negativo",
              text: "You didn't pay the rent, ___ you?",
              answers: ["did"],
              translation: "No pagaste el alquiler, ¿verdad?",
              hints: ["Frase negativa → coletilla afirmativa", "El auxiliar de la frase es «didn't»: quítale el not"],
              itemIds: ["ena2m9questiontags"],
              tip: "El error número uno es repetir el signo: «didn't you?» detrás de una frase negativa no existe. Una de las dos mitades va en negativo, nunca las dos.",
            },
            {
              id: "ena2m9l8e14", type: "transform", prompt: "Pide confirmación — añade la coletilla",
              source: "You're Amy's flatmate.",
              instruction: "Conviértelo en una frase que pide confirmación, con su coletilla",
              answers: ["You're Amy's flatmate, aren't you?"],
              translation: "Tú eres la compañera de piso de Amy, ¿verdad?",
              itemIds: ["ena2m9questiontags", "ena2m9amysflat"],
              tip: "El auxiliar de la frase es «'re» (are), así que la coletilla es «aren't you?». Con «I am» hay una rareza que conviene saber: la coletilla es «aren't I?», no «amn't I?».",
            },
            {
              id: "ena2m9l8e10", type: "build", prompt: "Construye la apertura",
              target: "Amy have you got a minute",
              translation: "Amy, ¿tienes un momento?",
              distractors: ["do", "one"],
              itemIds: ["ena2m9haveyougotaminute"],
              tip: "En inglés británico esta pregunta se hace con «have you got», no con «do you have». Las dos existen, pero la de got es la que se oye en la calle.",
            },
            {
              id: "ena2m9l8e11", type: "speak", prompt: "Dilo en voz alta — el cierre entero, sin cortar de golpe",
              text: "Anyway, I'd better go. It was nice talking to you. See you tomorrow!",
              phonetic: "E-ni-uei, áid BE-ta GÓU. it uos̬ NÁIS TÓO-king tu yu. sii yu tu-MÓ-rou",
              translation: "Bueno, me voy yendo. Me ha alegrado hablar contigo. ¡Hasta mañana!",
              itemIds: ["ena2m9anywayidbettergo", "ena2m9itwasnicetalkingtoyou", "enseeyoutomorrow"],
              tip: "Tres frases y un cierre completo. Si te quedas solo con la tercera, suena a que te vas enfadada.",
            },
            {
              id: "ena2m9l8e12", type: "type", prompt: "Cierre de producción",
              question: "Perdona que te interrumpa, pero ¿tienes un momento?",
              answers: [
                "Sorry to interrupt, but have you got a minute?",
                "Sorry to interrupt, but have you got a moment?",
                "Sorry to interrupt you, but have you got a minute?",
              ],
              hints: ["Fórmula de interrupción + but + fórmula de apertura", "Sorry to i…, but have you g… a minute?"],
              itemIds: ["ena2m9sorrytointerrupt", "ena2m9haveyougotaminute", "enbut"],
              tip: "Las dos fórmulas juntas: la de cortar y la de pedir el turno. Con esa frase puedes entrar en cualquier conversación en inglés sin quedar mal.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-8",
            book: "I have to go now. Goodbye.",
            real: "Right, I'll let you get on.",
            meaning: "Bueno, te dejo, que sigas con lo tuyo.",
            when: "Para cerrar una conversación en persona o por teléfono sin que parezca que huyes: pones la excusa en el otro («que sigas con lo tuyo») en vez de en ti. Es de lo más británico que hay. En el examen escrito, «I have to go now».",
            register: "amigos",
            note: "«Get on» aquí es «seguir con lo que estabas haciendo». Y el «Right» del principio es la señal de cierre: sin ella, la frase suena a que te están echando.",
            sound: "ráit, áil let yu guet ON",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Starting and ending conversations", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca las unidades de «starting a conversation» y «saying goodbye». Escucha una vez y apunta la señal de cierre que usa cada persona: siempre hay una." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — frontera: las relativas, y cierre del módulo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m9l9",
      phaseId: "ena2m9",
      title: "The girl who lives upstairs",
      subtitle: "Frontera: el «que» inglés — y el que desaparece",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Tres relativas para reconocer, no para producir",
          itemIds: ["ena2m9thegirlwholivesupstairs", "ena2m9themanwhosecar", "ena2m9theflatwesaw"],
        },
        {
          kind: "note",
          note: {
            title: "FRONTERA — el «que» español se reparte en tres palabras",
            body: "<i>Material de frontera con el B1: hoy se presenta y se <b>reconoce</b>. No hace falta producirlo, y no entra en el examen del A2. Pero sí aparece en cuanto lees un texto largo, así que el trabajo de hoy es de <b>comprensión</b>.</i><br/><br/>El español usa <b>que</b> para todo: «la chica <u>que</u> vive arriba», «el piso <u>que</u> vimos ayer», «el coche <u>que</u> está fuera». El inglés reparte:<br/><br/>· <b>who</b> → personas: <b>[[the girl who lives upstairs|la chica que vive arriba]]</b><br/>· <b>which</b> → cosas: <i>the flat which we saw yesterday</i><br/>· <b>that</b> → sirve para las dos, y es lo que más se oye: <i>the girl that lives upstairs</i> · <i>the flat that we saw</i><br/>· <b>whose</b> → «cuyo», el posesivo: <b>[[the man whose car is outside|el hombre cuyo coche está fuera]]</b><br/><br/><b>El calco que hay que matar</b> es el de <i>whose</i>: en español coloquial decimos «el hombre <u>que su</u> coche está fuera», y de ahí sale <i>the man who his car is outside</i> ❌. En inglés esas dos palabras se funden en una: <b>whose</b>.",
            table: [
              ["en español", "en inglés", "qué es"],
              ["la chica que vive arriba", "the girl who lives upstairs", "persona → who"],
              ["el piso que vimos ayer", "the flat which we saw", "cosa → which"],
              ["cualquiera de las dos", "…that…", "that vale para todo"],
              ["el hombre cuyo coche…", "the man whose car…", "posesivo → whose"],
              ["el hombre que su coche…", "the man who his car…", "el calco ❌"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y la de verdad importante: el «que» que desaparece",
            body: "Esta es la razón por la que un texto inglés se te atasca de repente sin que sepas por qué.<br/><br/>Lee esto: <b>The girls we saw looked happy.</b><br/><br/>Si tu cabeza ha tropezado, es normal: hay dos sujetos pegados —<i>the girls</i> y <i>we</i>— y ni un «que» entre ellos. En español eso <b>es imposible</b>: «las chicas vimos parecían contentas» no existe. Por eso el ojo no sabe dónde parar.<br/><br/><b>Lo que ha pasado:</b> el inglés puede <b>borrar</b> el relativo cuando es el <b>objeto</b> de la frase de dentro.<br/>· <i>The flat <b>that</b> we saw yesterday</i> → <b>[[the flat we saw yesterday|el piso que vimos ayer]]</b><br/>· <i>The girls <b>that</b> we saw</i> → <b>The girls we saw</b><br/>· <i>The letter <b>that</b> you sent me</i> → <b>The letter you sent me</b><br/><br/><b>Cuándo NO se puede borrar:</b> cuando el relativo es el <b>sujeto</b>. <i>The girl who lives upstairs</i> no puede quedarse en <i>the girl lives upstairs</i>, porque eso ya es otra frase entera.<br/><br/><b>El reflejo de lectura que hay que instalar</b>, y es todo lo que se te pide hoy:<br/>· Detrás del sustantivo hay un <b>SUJETO</b> (I, we, she, Ben, my flatmate…) → <b>se ha borrado un «that»</b>. Ponlo mentalmente y sigue leyendo.<br/>· Detrás del sustantivo hay un <b>VERBO</b> (lives, works, came…) → el relativo era el sujeto y no se ha borrado nada.<br/><br/>Con ese reflejo, la Parte 4 del Reading —que es un texto continuo y va lleno de estas— deja de ser un muro.",
            table: [
              ["lo que lees", "lo que hay debajo", "¿se puede borrar?"],
              ["the flat we saw yesterday", "the flat THAT we saw yesterday", "sí: el que es objeto"],
              ["the letter you sent me", "the letter THAT you sent me", "sí: el que es objeto"],
              ["the girl who lives upstairs", "—", "no: el que es sujeto"],
              ["the neighbour we met", "the neighbour THAT we met", "sí: el que es objeto"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m9l9e1", type: "gapbank", prompt: "FRONTERA — rellena con el relativo que toca",
              text: "The girl ___ lives upstairs is a nurse. The flat ___ we saw yesterday was too small. And the man ___ car is always outside the door is our landlord.",
              answers: ["who", "which", "whose"],
              bank: ["who", "which", "whose", "where", "when", "why"],
              translation: "La chica que vive arriba es enfermera. El piso que vimos ayer era demasiado pequeño. Y el hombre cuyo coche está siempre delante de la puerta es nuestro casero.",
              itemIds: ["ena2m9thegirlwholivesupstairs", "ena2m9theflatwesaw", "ena2m9themanwhosecar", "ennurse"],
              tip: "Persona → who · cosa → which · posesión → whose. Y en los tres huecos «that» también valdría, menos en el último: «that his car» no existe.",
            },
            {
              id: "ena2m9l9e2", type: "mc", prompt: "FRONTERA — la frase que te hace tropezar",
              question: "«The girls we saw looked happy.» ¿Qué significa?",
              options: [
                "Las chicas que vimos parecían contentas",
                "Vimos que las chicas parecían contentas",
                "Las chicas nos vieron y parecían contentas",
              ],
              answer: 0,
              whyWrong: [null, "El verbo principal es «looked», no «saw». Entre «girls» y «we» falta un «that» borrado", "«we saw» dice quién vio a quién: nosotros a ellas"],
              itemIds: ["ena2m9theflatwesaw"],
              tip: "Regla de lectura: si detrás del sustantivo viene un SUJETO (we, I, she…), pon un «that» invisible ahí. La frase se ordena sola.",
            },
            {
              id: "ena2m9l9e3", type: "bucket", prompt: "FRONTERA — ¿se puede borrar el «that» o no?",
              categories: ["se puede borrar", "no se puede borrar"],
              items: [
                { text: "the flat that we saw yesterday", bucket: 0 },
                { text: "the girl that lives upstairs", bucket: 1 },
                { text: "the letter that you sent me", bucket: 0 },
                { text: "the man that works in the shop", bucket: 1 },
                { text: "the keys that I found in the kitchen", bucket: 0 },
                { text: "the bus that goes to the station", bucket: 1 },
              ],
              itemIds: ["ena2m9theflatwesaw", "ena2m9thegirlwholivesupstairs"],
              tip: "Mira qué viene justo detrás del «that»: si es un sujeto (we, you, I), se puede borrar; si es un verbo (lives, works, goes), no.",
            },
            {
              id: "ena2m9l9e4", type: "errorfix", prompt: "FRONTERA — corrige el calco de «cuyo»",
              wrong: "the man who his car is outside",
              answers: ["the man whose car is outside"],
              why: "«El hombre que su coche…» es lo que decimos en español coloquial, y el inglés no lo admite: «que su» se funde en una sola palabra, whose. Es la misma palabra de «Whose is this?», usada dentro de la frase en vez de al principio.",
              translation: "el hombre cuyo coche está fuera",
              itemIds: ["ena2m9themanwhosecar", "ena2m9whoseisthis"],
            },
            {
              id: "ena2m9l9e5", type: "audiomc", prompt: "FRONTERA — el relativo borrado, al oído — 2 escuchas",
              audio: "The flat we saw on Saturday was cheaper, but the one Amy found is much bigger.",
              question: "¿Qué piso es más grande?",
              options: ["El que encontró Amy", "El que vieron el sábado", "Los dos igual"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Ese era más barato, no más grande", "El audio los compara: uno es más barato y el otro, más grande"],
              itemIds: ["ena2m9theflatwesaw", "ena2m4thebiggestroom"],
              tip: "Dos relativas borradas en una frase: «the flat (that) we saw» y «the one (that) Amy found». Al oído es peor que al leerlo, porque no hay coma que te ayude.",
            },
            {
              id: "ena2m9l9e6", type: "match", prompt: "FRONTERA — empareja cada relativa con lo que describe",
              pairs: [
                { target: "the girl who lives upstairs", source: "una persona, y ella es la que vive" },
                { target: "the man whose car is outside", source: "una persona, y el coche es suyo" },
                { target: "the flat we saw yesterday", source: "una cosa, y nosotros la vimos" },
                { target: "the bus which goes to the station", source: "una cosa, y ella es la que va" },
              ],
              itemIds: ["ena2m9thegirlwholivesupstairs", "ena2m9themanwhosecar", "ena2m9theflatwesaw"],
            },
            {
              id: "ena2m9l9e7", type: "fastmatch", prompt: "Ráfaga de cierre — el módulo entero, sin pensar",
              pairs: [
                { target: "It's mine.", source: "Es mío." },
                { target: "Whose is this?", source: "¿De quién es esto?" },
                { target: "Help yourself!", source: "¡Sírvete!" },
                { target: "It's your turn.", source: "Te toca." },
                { target: "How often…?", source: "¿Cada cuánto…?" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m9possessivegroup", "ena2m9whoseisthis", "ena2m9helpyourself", "ena2m9itsyourturn", "ena2m9howoftendoyouclean"],
              tip: "Cinco piezas del módulo y ninguna es larga. El cronómetro solo premia: si sale sin pensar, está consolidado.",
            },
            {
              id: "ena2m9l9e8", type: "translate", prompt: "Espiral — traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Se lo expliqué a ella, pero no le dije nada a él.",
              answers: [
                "I explained it to her, but I didn't tell him anything.",
                "I explained it to her but I didn't tell him anything.",
                "I explained it to her, but I said nothing to him.",
              ],
              hint: "un verbo de cada montón, y los dos pronombres detrás de lo que les corresponde",
              itemIds: ["ena2m9explaintogroup", "ena2m9tellmegroup", "ena2m9objectgroup"],
              tip: "El cubo entero en una frase: explain pide «to her» y tell lleva «him» pegado. Si te sale sola, la lección 2 ya es tuya.",
            },
            {
              id: "ena2m9l9e9", type: "translate", prompt: "Espiral — traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "The letter you sent me came on Monday, but I couldn't find it.",
              answers: [
                "La carta que me mandaste llegó el lunes, pero no la encontré.",
                "La carta que me enviaste llegó el lunes, pero no la pude encontrar.",
              ],
              itemIds: ["ena2m9theflatwesaw", "ena2m9alettercameforyou", "ena2m9icantfindit"],
              tip: "Fíjate en lo que el español OBLIGA a poner y el inglés no: el «que» de «la carta que me mandaste». En inglés se había borrado.",
            },
            {
              id: "ena2m9l9e10", type: "errorfix", prompt: "Espiral — corrige el reflexivo",
              wrong: "I woke up myself and I felt myself terrible.",
              answers: ["I woke up and I felt terrible."],
              why: "Ni «wake up» ni «feel» son reflexivos en inglés. La prueba de la lección 3: «me desperté a mí misma» y «me sentí fatal a mí misma» no significan nada, así que fuera los dos myself.",
              translation: "Me desperté y me encontraba fatal.",
              itemIds: ["ena2m9nonreflexivegroup", "ena2m9ifeeltired"],
            },
            {
              id: "ena2m9l9e11", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "This coat isn't mine.",
              forbid: ["mine", "my"],
              answers: ["This coat belongs to somebody else.", "This coat belongs to another person."],
              translation: "Este abrigo no es mío.",
              itemIds: ["ena2m9itsnotminesits", "ena2m3acoat"],
              tip: "Con «mine» y «my» prohibidos, la única salida es «belong to»: el verbo que dice posesión sin usar ningún posesivo. En el oral es exactamente lo que te salva cuando no te sale la palabra.",
            },
            {
              id: "ena2m9l9e12", type: "monologue", prompt: "Tu minuto: tu casa, tu gente y quién hace qué",
              topic: "Dónde vives, con quién y cómo os repartís la casa",
              slides: [
                { title: "1. Dónde vives y con quién", hint: "I live in a flat in… · I share it with… · There are two bedrooms, a kitchen and…" },
                { title: "2. La gente de alrededor", hint: "Our landlord… · Our next-door neighbour… · The girl who lives upstairs…" },
                { title: "3. Quién hace qué, y cada cuánto", hint: "I do the washing-up… · How often…? Once a week · It's her turn to…" },
                { title: "4. Qué te parece", hint: "I like it a lot because… · The rent is expensive, but…" },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He usado al menos dos posesivos (mine, yours, hers, ours, o un genitivo con 's)",
                "He usado al menos dos pronombres de objeto (him, her, it, us, them)",
                "He dicho una frecuencia (once a week, twice a month, every day)",
                "He nombrado al menos dos tareas de la casa",
                "No he metido ni un «myself» donde el inglés no lo lleva",
              ],
              model: "I live in a small flat in North London and I share it with Amy, my flatmate. There are two bedrooms: the big one is hers and the small one is mine. Our landlord lives upstairs, so he hears everything, and our next-door neighbour is a friend of mine now. We take turns with the jobs: I do the washing-up on Monday and Wednesday, and Amy takes out the rubbish. We hoover the flat once a week, usually on Sundays. I like it a lot because the neighbourhood is quiet, but the rent is very expensive.",
              itemIds: ["ena2m9weshareaflat", "ena2m9possessivegroup", "ena2m9choresgroup", "ena2m9onceaweek", "ena2m9nextdoorneighbour"],
              tip: "Grábate las dos veces. La lista no mide si suena bonito: mide si has metido las piezas del módulo. Cuenta los posesivos y los pronombres con el dedo al escucharte.",
            },
            {
              id: "ena2m9l9e13", type: "type", prompt: "Cierre del módulo — todo junto en dos frases",
              question: "Estas llaves no son mías, son de Amy. ¿Puedes dárselas? Vive arriba.",
              answers: [
                "These keys aren't mine, they're Amy's. Can you give them to her? She lives upstairs.",
                "These keys are not mine, they're Amy's. Can you give them to her? She lives upstairs.",
                "These keys aren't mine, they're Amy's. Could you give them to her? She lives upstairs.",
              ],
              hints: ["Posesivo solo + genitivo con 's + dos pronombres de objeto", "These keys aren't m…, they're Amy…. Can you give t… to h…? She lives u…"],
              itemIds: ["ena2m9possessivegroup", "ena2m9amysflat", "ena2m9objectgroup", "ena2m9ourlandlordlivesupstairs"],
              tip: "Ahí está el módulo entero: mine, Amy's, them, her y upstairs sin preposición. Y una cosa más — «give them to her» es el montón A usado con «to», que es legal porque la cosa va primero. Si has llegado hasta aquí sin dudar, la precisión ya la tienes.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m9-9",
            book: "The woman who lives next door is a nurse.",
            real: "The woman next door's a nurse.",
            meaning: "La vecina de al lado es enfermera.",
            when: "Al hablar de vecinos: «the woman next door» es un sitio («de al lado»), no una relativa recortada. Lo que sí se come el habla es el is: door's = door is. En el examen escrito, la frase entera con «who lives».",
            register: "amigos",
            note: "Ojo a ese «door's», que es «door is» y no un genitivo, aunque se escriba igual. Es el par de la lección 5 otra vez: la ortografía no distingue lo que la gramática sí.",
            sound: "de UÚ-man nekst DÓOS̬ a NEES̬",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Relative clauses: defining relative clauses", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/relative-clauses-defining-relative-clauses", note: "Léelo entero aunque sea de B1: hoy solo tienes que reconocerlas. Fíjate en la sección de cuándo se puede omitir el relativo — es lo único que te hace falta para leer." },
        { label: "LanguageCert — ESOL A2 Access (papers de práctica)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Descarga un Reading de práctica y busca en la Parte 4 las relativas sin «that». Vas a encontrar tres o cuatro por texto: ahora ya sabes qué falta ahí." },
      ],
    },
  ],
};
