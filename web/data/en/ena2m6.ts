import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 6 — I'm going to Brighton: planes con fecha, el futuro
// que ya está decidido. Sigue el listón del piloto `ena2m1`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): `be going to` (intención y predicción con
// pruebas delante) · presente continuo con valor de FUTURO · subordinadas de
// tiempo con when / before / after / as soon as · las preposiciones de
// movimiento (along, across, towards, up, down, past).
//
// LO QUE NO SE RE-ENSEÑA, y viene cerrado de atrás:
//   · el paradigma del pasado entero (`ena2m1` y `ena2m2`): forma rara solo en
//     afirmativa, `did`/`didn't` + verbo desnudo. Aquí el pasado solo se USA —
//     en el contraste «lo que hicimos el año pasado / lo que vamos a hacer
//     este» y en las escenas del viaje anterior.
//   · «nada se mete entre el verbo y su objeto» (`ena2m3l6`). Se REFERENCIA en
//     la L6, donde las preposiciones de movimiento reabren la pregunta de dónde
//     va cada cosa en la frase, pero no se vuelve a explicar.
//   · el reparto `lose` / `miss` / `forget` / `leave` de `ena2m2` — un módulo de
//     viaje lo necesita entero (perder el tren, perder la maleta, dejarse el
//     pasaporte) y se recicla tal cual, sin tarjetas nuevas para esos verbos.
//   · `more` / `most` / `enough` / `none` / `all` como determinantes (`ena2m4`
//     L7): aquí se usan con equipaje y con tiempo, no se redefinen.
//
// EL FUTURO CON `will` NO ESTÁ AQUÍ, y es deliberado: es frontera con el B1 y
// vive en `ena2m11` (PLAN-EN-A2 §2.1.b). Por eso ni un solo ejemplo de este
// módulo resuelve la principal con `will`: las subordinadas de tiempo de la L4
// se cierran con `be going to` o con el continuo, que es lo que el alumno tiene.
//
// LOS TRES CONTRASTES QUE ESTE MÓDULO TIENE QUE RESOLVER (§4.2 y §9):
//
//   (a) LA TRAMPA QUE DEJÓ EL A1, y se desactiva en la L1, que es la primera
//       cosa que se hace en el módulo. `ena1m10` enseñó `I'm going to work`
//       como continuo de MOVIMIENTO («voy al trabajo, estoy en camino»). Hoy
//       llega `I'm going to work harder` como INTENCIÓN. Misma cara, dos cosas.
//       La regla que se le da al alumno no es etimológica, es de ojo: MIRA LO
//       QUE VA DETRÁS DE `to`. Si hay un SITIO, es movimiento; si hay un VERBO
//       en forma de diccionario, es intención. Y se dice en voz alta que
//       `work` y `home` son las dos cosas a la vez (sustantivo y verbo), que es
//       exactamente por lo que la frase del A1 era ambigua. Se cierra con un
//       `bucket` de sitio/verbo (L1) y vuelve en el espiral de la L9.
//
//   (b) EL FUTURO EN LA SUBORDINADA (L4). El español pide subjuntivo —«cuando
//       llegue»— y el aprendiz lo traduce por futuro: *«When I will arrive…»*.
//       La explicación que funciona no es «tras when va presente» (eso es una
//       regla que se olvida), sino la razón: EL INGLÉS YA SABE QUE ES FUTURO
//       POR LA PRINCIPAL, y repetirlo en la subordinada le sobra. Una sola
//       marca de futuro por frase, y va en la principal.
//
//   (c) EL PUNTO CIEGO MAYOR, el que casi nadie corrige porque SUENA BIEN AL
//       OÍDO ESPAÑOL: el presente simple para planes — *«I go to the cinema
//       tomorrow»*. En español «voy al cine mañana» es impecable; en inglés el
//       presente simple es rutina o horario publicado, jamás un plan personal.
//       Lo tapa el presente continuo de futuro, y por eso la L3 va justo
//       detrás de `going to` y no al final: es el error que el alumno arrastra
//       desde el A1 sin que nadie se lo haya nombrado. La excepción de los
//       horarios (`The train leaves at ten`) se enseña en la misma lección,
//       apoyada en `enthefilmstarts`, que ya la traía del A1.
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: las contracciones
// del futuro y `gonna`, más el `to` átono /tə/. El hispanohablante pronuncia
// «GÓU-ing TU» con las dos sílabas fuertes y así ni le entienden ni entiende: en
// el habla real `going to` + verbo se funde entero. `ena1m10` y `ena1m2` ya
// dejaron `gonna` como píldora receptiva tres veces; aquí se cobra y se le pone
// regla — SOLO delante de verbo, y JAMÁS por escrito.
//
// ELENCO: solo lo que ya está en CANON.md — Valeria, Amy, Ben, Sam, Mr Patel,
// Nora, Emma (Manchester), Clara (la hermana, en Bogotá). El módulo no toca
// CANON.md, así que no estrena secundarios: el viaje a Brighton lo hacen
// Valeria y Amy, y Ben aporta lo que sabe un conductor de autobús.
//
// LO QUE HEREDAN LOS MÓDULOS SIGUIENTES: (1) `be going to` y el continuo de
// futuro quedan instalados como el ÚNICO futuro del alumno hasta `ena2m11`, y
// `ena2m7` (must / have to) puede darlos por hechos para hablar de trámites que
// aún no han pasado; (2) las subordinadas de tiempo sin futuro dentro son la
// percha de la primera condicional de `ena2m11` — «If it rains» es la misma
// mecánica con otra conjunción, y allí solo hay que decirlo; (3) el campo de
// viaje (equipaje, documentos, andén, tráfico) es el escenario natural de los
// avisos y las normas de `ena2m7`; (4) `How about + -ing` y `Why don't we…?`
// quedan como SUGERENCIA entre iguales — el CONSEJO (`Why don't you…?`,
// `You need to…`) es de `ena2m8` y aquí no se toca.
//
// RECICLADO sin redefinir ids (una palabra, una tarjeta) — estos son los que
// este módulo REFERENCIA de verdad, no una lista de intenciones:
// del A1 — enimgoingtowork (la trampa que se desactiva en la L1), enimgoinghome,
// entrain, entube, entaxi, enplane, enonfoot, enwalk, enticket, enshop,
// enopposite, ennexttothebank, eninthekitchen, encrossthestreet, enturnleft,
// enoutsidethecinema, enletsgo, enletsgotothecinema, endoyouwanttocome,
// enwhataboutsaturday, enimbusy, enseeyoutomorrow, enonmonday, enatweekend,
// enthefilmstarts (el horario en presente simple, que ya venía del A1),
// enrightnow, enatthemoment, enitsraining, ensleeping, enwork, enhome,
// enmyfavouriteseason, ensister, entooexpensive;
// de `ena2m1` — ena2m1arrived, ena2m1missedthebus, ena2m1therewas,
// ena2m1therewere, ena2m1howaboutyou;
// de `ena2m2` — ena2m2ilostmyphone, ena2m2iforgotmykeys, ena2m2mywallet,
// ena2m2putgroup, ena2m2soiwalked;
// de `ena2m3` — ena2m3iminterestedin (la preposición que pide -ing, que es la
// misma regla de «how about going»);
// de `ena2m4` — ena2m4cheaperthan.
//
// TODOS los ids nuevos llevan el prefijo "ena2m6": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m6: Record<string, VocabItem> = {
  // ── ena2m6l1 — be going to: la intención que ya está decidida ──
  ena2m6imgoingtobook: {
    id: "ena2m6imgoingtobook", target: "I'm going to book a hotel.",
    source: "Voy a reservar un hotel.",
    sound: "áim GÓU-in ta buk a jou-TÉL",
    gram: { trap: "I'm going to booking a hotel.", same: ["My plan is to book a hotel."] },
  },
  ena2m6weregoingtobrighton: {
    id: "ena2m6weregoingtobrighton", target: "We're going to Brighton on Saturday.",
    source: "Vamos a Brighton el sábado. — detrás de to hay un SITIO: es movimiento",
    sound: "uía GÓU-in ta BRÁI-ton on SÁ-ta-dei",
    gram: { trap: "We're going to Brighton in Saturday." },
  },
  ena2m6imgoingtoworkharder: {
    id: "ena2m6imgoingtoworkharder", target: "I'm going to work harder.",
    source: "Voy a esforzarme más. — detrás de to hay un VERBO: es intención",
    sound: "áim GÓU-in ta uéek JÁA-da",
    gram: { trap: "I'm going to working harder.", same: ["I'm going to try harder."] },
  },
  ena2m6shesgoingtostudy: {
    id: "ena2m6shesgoingtostudy", target: "She's going to study Italian.",
    source: "Va a estudiar italiano.", sound: "shis̬ GÓU-in ta STA-di i-TÁ-lian",
  },
  ena2m6theyregoingtomove: {
    id: "ena2m6theyregoingtomove", target: "They're going to move to Manchester.",
    source: "Se van a mudar a Manchester.", sound: "déa GÓU-in ta múuv tu MÁN-ches-ta",
  },
  ena2m6whatareyougoingtodo: {
    id: "ena2m6whatareyougoingtodo", target: "What are you going to do?",
    source: "¿Qué vas a hacer?", sound: "uót a yu GÓU-in ta DÚU",
    gram: { trap: "What you are going to do?", same: ["What are your plans?"] },
  },

  // ── ena2m6l2 — la negativa, la pregunta y la predicción con pruebas ──
  ena2m6imnotgoingtodrive: {
    id: "ena2m6imnotgoingtodrive", target: "I'm not going to drive.",
    source: "No voy a conducir.", sound: "áim not GÓU-in ta DRÁIV",
    gram: { trap: "I don't going to drive." },
  },
  ena2m6areyougoingtotakethetrain: {
    id: "ena2m6areyougoingtotakethetrain", target: "Are you going to take the train?",
    source: "¿Vas a coger el tren?", sound: "a yu GÓU-in ta téik de TRÉIN",
    gram: { trap: "Do you going to take the train?" },
  },
  ena2m6itsgoingtorain: {
    id: "ena2m6itsgoingtorain", target: "It's going to rain.",
    source: "Va a llover. — se ve venir: mira esas nubes",
    sound: "its GÓU-in ta RÉIN",
    gram: { trap: "It's going to rains.", same: ["It looks like rain."] },
  },
  ena2m6weregoingtobelate: {
    id: "ena2m6weregoingtobelate", target: "We're going to be late!",
    source: "¡Vamos a llegar tarde!", sound: "uía GÓU-in ta bi LÉIT",
    gram: { trap: "We're going to late!" },
  },
  ena2m6clouds: { id: "ena2m6clouds", target: "the clouds", source: "las nubes", sound: "de KLÁUDS̬" },
  ena2m6aweekoff: { id: "ena2m6aweekoff", target: "a week off", source: "una semana libre, sin trabajar", sound: "a UÍIK OF" },

  // ── ena2m6l3 — el presente continuo con valor de futuro ──
  ena2m6weremeetingamyatsix: {
    id: "ena2m6weremeetingamyatsix", target: "We're meeting Amy at six.",
    source: "Hemos quedado con Amy a las seis. — la cita ya está puesta",
    sound: "uía MÍI-tin ÉI-mi at SIKS",
    gram: { trap: "We meet Amy at six.", same: ["We're going to meet Amy at six."] },
  },
  ena2m6imleavingonfriday: {
    id: "ena2m6imleavingonfriday", target: "I'm leaving on Friday.",
    source: "Me voy el viernes.", sound: "áim LÍI-vin on FRÁI-dei",
    gram: { trap: "I leave on Friday." },
  },
  ena2m6thetrainleavesatten: {
    id: "ena2m6thetrainleavesatten", target: "The train leaves at ten.",
    source: "El tren sale a las diez. — horario publicado: aquí SÍ va presente simple",
    sound: "de tréin LÍIVS̬ at TEN",
  },
  ena2m6whatareyoudoingtonight: {
    id: "ena2m6whatareyoudoingtonight", target: "What are you doing tonight?",
    source: "¿Qué haces esta noche? — pregunta por el plan, no por lo de ahora mismo",
    sound: "uót a yu DÚU-in tu-NÁIT",
    gram: { trap: "What do you do tonight?" },
  },
  ena2m6imstayingwithemma: {
    id: "ena2m6imstayingwithemma", target: "I'm staying with Emma.",
    source: "Me quedo en casa de Emma.", sound: "áim STÉI-in uid É-ma",
  },
  ena2m6nextweekend: {
    id: "ena2m6nextweekend", target: "next weekend",
    source: "el finde que viene — next va sin the y sin on",
    sound: "nekst UÍI-kend",
    gram: { trap: "the next weekend" },
  },

  // ── ena2m6l4 — when / before / after: el futuro que no se repite ──
  ena2m6whenigetthere: {
    id: "ena2m6whenigetthere", target: "When I get there, I'm going to call you.",
    source: "Cuando llegue, te llamo.",
    sound: "uén ái guet DÉA, áim GÓU-in ta KOOL yu",
    gram: { trap: "When I will get there, I'm going to call you.", same: ["I'm going to call you when I get there."] },
  },
  ena2m6beforeweleave: {
    id: "ena2m6beforeweleave", target: "Before we leave, I'm going to check the tickets.",
    source: "Antes de salir voy a mirar los billetes.",
    sound: "bi-FÓO ui LÍIV, áim GÓU-in ta chek de TÍ-kits",
    gram: { trap: "Before we will leave, I'm going to check the tickets." },
  },
  ena2m6afterwearrive: {
    id: "ena2m6afterwearrive", target: "After we arrive, we're going to find the hotel.",
    source: "Cuando lleguemos, buscamos el hotel.",
    sound: "AAF-ta ui a-RÁIV, uía GÓU-in ta fáind de jou-TÉL",
    gram: { trap: "After we will arrive, we're going to find the hotel." },
  },
  ena2m6assoonas: {
    id: "ena2m6assoonas", target: "as soon as I get home",
    source: "en cuanto llegue a casa", sound: "as̬ SÚUN as̬ ái guet JÓUM",
    gram: { trap: "as soon as I will get home", same: ["the minute I get home"] },
  },
  ena2m6imgoingtotextyou: {
    id: "ena2m6imgoingtotextyou", target: "I'm going to text you when I get on the train.",
    source: "Te escribo cuando me suba al tren.",
    sound: "áim GÓU-in ta TEKST yu uen ái guet on de tréin",
  },

  // ── ena2m6l5 — la clínica: gonna, wanna y el `to` átono ──
  ena2m6gonnasound: {
    id: "ena2m6gonnasound", target: "going to → gonna",
    source: "en el habla rápida going to se funde en «gonna» — y solo delante de VERBO",
    sound: "GA-na",
  },
  ena2m6wannasound: {
    id: "ena2m6wannasound", target: "want to → wanna",
    source: "want to se funde igual: «uó-na» — tampoco se escribe nunca",
    sound: "UÓ-na",
  },
  ena2m6toweak: {
    id: "ena2m6toweak", target: "going to take · going to book",
    source: "el to de en medio NO suena «tu»: es una «ta» floja y sin fuerza",
    sound: "GÓU-in ta téik · GÓU-in ta buk",
  },
  ena2m6imgoingtogo: {
    id: "ena2m6imgoingtogo", target: "I'm going to go to the beach.",
    source: "Voy a ir a la playa. — sí, «going to go» existe y es lo correcto",
    sound: "áim GÓU-in ta GÓU tu de bíich",
    gram: { trap: "I'm going to the beach to go." },
  },
  ena2m6whereareyougonnastay: {
    id: "ena2m6whereareyougonnastay", target: "Where are you gonna stay?",
    source: "¿Dónde te vas a quedar? — así suena de verdad; escrito, going to",
    sound: "uéa a ya GA-na STÉI",
  },

  // ── ena2m6l6 — las preposiciones de movimiento ──
  ena2m6alongthebeach: {
    id: "ena2m6alongthebeach", target: "Walk along the beach.",
    source: "Ve andando por la playa — a lo largo de ella, sin salirte",
    sound: "uóok a-LONG de BÍICH",
  },
  ena2m6acrosstheroad: {
    id: "ena2m6acrosstheroad", target: "Go across the road.",
    source: "Cruza la carretera — de un lado al otro",
    sound: "góu a-KROS de RÓUD",
    gram: { trap: "Go across of the road.", same: ["Cross the road."] },
  },
  ena2m6towardsthestation: {
    id: "ena2m6towardsthestation", target: "Walk towards the station.",
    source: "Ve hacia la estación — en esa dirección, sin decir que llegas",
    sound: "uóok ta-UÓODS̬ de STÉI-shon",
  },
  ena2m6upthehill: { id: "ena2m6upthehill", target: "up the hill", source: "cuesta arriba, subiendo la cuesta", sound: "ap de JIL" },
  ena2m6downthestreet: { id: "ena2m6downthestreet", target: "down the street", source: "calle abajo — y también «un poco más allá en la calle»", sound: "dáun de STRIIT" },
  ena2m6pastthebank: {
    id: "ena2m6pastthebank", target: "past the bank",
    source: "pasando el banco, dejándolo atrás — nada que ver con el pasado del verbo",
    sound: "paast de BÁNK",
  },

  // ── ena2m6l7 — el viaje de verdad: equipaje, papeles, andén, tráfico ──
  ena2m6luggage: {
    id: "ena2m6luggage", target: "luggage", source: "el equipaje — incontable: nunca «luggages», nunca «a luggage»",
    sound: "LA-guich",
    gram: { trap: "I have two luggages.", same: ["my bags"] },
  },
  ena2m6suitcase: { id: "ena2m6suitcase", target: "a suitcase", source: "una maleta", sound: "a SÚUT-keis" },
  ena2m6passport: { id: "ena2m6passport", target: "my passport", source: "el pasaporte", sound: "mái PAAS-poot" },
  ena2m6thebooking: { id: "ena2m6thebooking", target: "the booking", source: "la reserva (del hotel, del tren)", sound: "de BU-kin" },
  ena2m6platformfour: { id: "ena2m6platformfour", target: "platform four", source: "el andén número cuatro — en el tren se dice sin the", sound: "PLAT-foom FÓO" },
  ena2m6areturnticket: {
    id: "ena2m6areturnticket", target: "a return ticket",
    source: "un billete de ida y vuelta — el de solo ida es a single",
    sound: "a ri-TÉEN TÍ-kit",
  },
  ena2m6atrafficjam: {
    id: "ena2m6atrafficjam", target: "a traffic jam", source: "un atasco",
    sound: "a TRÁ-fik yam",
    gram: { trap: "There were a lot of traffics.", same: ["the traffic was terrible"] },
  },
  ena2m6abedandbreakfast: { id: "ena2m6abedandbreakfast", target: "a bed and breakfast", source: "una pensión con desayuno — el B&B de toda la vida", sound: "a bed and BREK-fast" },
  ena2m6thecoach: { id: "ena2m6thecoach", target: "the coach", source: "el autocar (el autobús de largo recorrido) — y también el vagón del tren", sound: "de KÓUCH" },

  // ── ena2m6l8 — proponer, aceptar y decir que no ──
  ena2m6howaboutgoing: {
    id: "ena2m6howaboutgoing", target: "How about going on Friday?",
    source: "¿Y si vamos el viernes? — how about + verbo en -ing",
    sound: "jáu a-BÁUT GÓU-in on FRÁI-dei",
    gram: { trap: "How about to go on Friday?", same: ["Why don't we go on Friday?"] },
  },
  ena2m6whydontwe: {
    id: "ena2m6whydontwe", target: "Why don't we take the coach?",
    source: "¿Por qué no cogemos el autocar? — una propuesta, no un reproche",
    sound: "uái dóunt ui téik de KÓUCH",
  },
  ena2m6thatsoundsgreat: { id: "ena2m6thatsoundsgreat", target: "That sounds great!", source: "¡Me parece genial!", sound: "dat sáunds̬ GRÉIT" },
  ena2m6imafraidicant: {
    id: "ena2m6imafraidicant", target: "I'm afraid I can't.",
    source: "Me temo que no puedo. — la manera educada de decir que no",
    sound: "áim a-FRÉID ái KAANT",
    gram: { same: ["Sorry, I'm busy that day."] },
  },
  ena2m6letmecheckmydiary: { id: "ena2m6letmecheckmydiary", target: "Let me check my diary.", source: "Déjame mirar la agenda. — diary es la agenda, no el diario íntimo", sound: "let mi CHEK mái DÁIA-ri" },

  // ── ena2m6l9 — cierre del módulo ──
  ena2m6haveagoodtrip: { id: "ena2m6haveagoodtrip", target: "Have a good trip!", source: "¡Buen viaje!", sound: "jav a gud TRIP" },
  ena2m6icantwait: { id: "ena2m6icantwait", target: "I can't wait!", source: "¡Qué ganas! / ¡No veo la hora!", sound: "ái kaant UÉIT" },
};

export const ena2m6: Phase = {
  id: "ena2m6",
  level: "a2",
  n: 6,
  title: "I'm going to Brighton",
  goal: "Contar tus planes: la intención con be going to, la cita cerrada con el presente continuo, lo que vas a hacer cuando llegues (when / before / after) y cómo se dice por dónde se va — along, across, towards, up, down.",
  color: "#1d4ed8",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — be going to, y la trampa que dejó el A1
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l1",
      phaseId: "ena2m6",
      title: "I'm going to book a hotel",
      subtitle: "El futuro decidido — y por fin se aclara qué significa «I'm going to work»",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que ya tienes decidido",
          itemIds: ["ena2m6imgoingtobook", "ena2m6weregoingtobrighton", "ena2m6imgoingtoworkharder", "ena2m6shesgoingtostudy", "ena2m6theyregoingtomove", "ena2m6whatareyougoingtodo"],
        },
        {
          kind: "note",
          note: {
            title: "Tercer eje: el futuro que ya está decidido",
            body: "Ya sabes hablar de <b>ahora</b> (módulos del A1) y de <b>lo que pasó</b> (módulos 1 y 2). Falta el tercer eje, y es el más fácil de los tres:<br/><br/><b>be + going to + verbo en forma de diccionario</b><br/><br/>· I <b>am going to</b> book a hotel. → <i>Voy a reservar un hotel.</i><br/>· She <b>is going to</b> study Italian. → <i>Va a estudiar italiano.</i><br/>· They <b>are going to</b> move to Manchester. → <i>Se van a mudar a Manchester.</i><br/><br/>Y aquí llega la única buena noticia que te va a dar el inglés hoy: <b>es exactamente lo que haces en español</b>. «Voy a reservar» = <i>ir a</i> + infinitivo. La estructura es la misma pieza por pieza, así que no hay nada que reordenar.<br/><br/><b>Lo único que hay que vigilar es el «be».</b> En español el verbo <i>ir</i> se conjuga solo («voy», «vas», «vamos»); en inglés esa conjugación la lleva <b>be</b>, y sin él la frase no existe: <i>I going to book</i> no es inglés. La contracción es obligatoria al hablar: <b>I'm · you're · he's · we're · they're</b>.<br/><br/><b>Qué significa exactamente.</b> Going to no es «el futuro» a secas: es lo que <b>ya has decidido</b> antes de abrir la boca. El plan existía antes de la frase. Por eso funciona tan bien para un viaje: cuando dices <i>I'm going to book a hotel</i>, lo que estás contando es una decisión que ya tomaste.",
            table: [
              ["persona", "la frase entera", "en español"],
              ["I", "I'm going to book a hotel.", "Voy a reservar un hotel."],
              ["you / we / they", "We're going to Brighton.", "Vamos a Brighton."],
              ["he / she / it", "She's going to study Italian.", "Va a estudiar italiano."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«I'm going to work»: la frase que significa dos cosas (y cómo se decide)",
            body: "Esto hay que aclararlo hoy, porque si no lo arrastras el nivel entero. En el A1 aprendiste <b>[[I'm going to work.|Voy al trabajo (ahora, en camino).]]</b> — el continuo de <i>go</i> con un destino detrás. Y hoy has aprendido <b>I'm going to work harder</b> — voy a esforzarme más. <b>Misma cara, dos cosas distintas.</b><br/><br/>La regla para decidir no es de gramática, es de ojo. <b>Mira lo que va DETRÁS de «to»:</b><br/><br/>· Detrás hay un <b>SITIO</b> → es <b>movimiento</b>: vas allí. <i>I'm going to <b>the station</b>. · We're going to <b>Brighton</b>.</i><br/>· Detrás hay un <b>VERBO</b> en forma de diccionario → es <b>intención</b>: eso es lo que piensas hacer. <i>I'm going to <b>book</b> a hotel. · I'm going to <b>take</b> the train.</i><br/><br/><b>¿Y por qué la frase del A1 era ambigua?</b> Porque <i>work</i> es las dos cosas a la vez: el sustantivo «el trabajo» y el verbo «trabajar». Lo mismo pasa con <i>home</i>, <i>bed</i> o <i>the shops</i>. Cuando el inglés se queda con la duda, la resuelve con lo que viene después:<br/><br/>· <b>I'm going to work.</b> (y punto) → voy al trabajo.<br/>· <b>I'm going to work harder.</b> → voy a esforzarme más.<br/><br/>Con cualquier otro verbo no hay duda posible, porque <i>book</i>, <i>take</i>, <i>study</i> o <i>move</i> no son sitios adonde ir. Así que en la práctica la ambigüedad se reduce a un puñado de palabras, y ya sabes cuáles son.",
            table: [
              ["lo que va detrás de to", "qué es", "ejemplo"],
              ["un sitio (the station, Brighton, work)", "movimiento: vas allí", "I'm going to the station."],
              ["un verbo (book, take, study)", "intención: eso vas a hacer", "I'm going to book a hotel."],
              ["work / home, sin nada más", "movimiento (es lo que enseñó el A1)", "I'm going to work."],
              ["work / home + más palabras", "intención", "I'm going to work harder."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l1e1", type: "mc", prompt: "Reconoce la intención",
              question: "“I'm going to book a hotel.”",
              options: ["Voy a reservar un hotel", "Voy a un hotel", "Estoy reservando un hotel ahora mismo"],
              answer: 0,
              whyWrong: [null, "Detrás de to hay un VERBO (book), no un sitio: es una intención, no un trayecto", "Eso sería «I'm booking a hotel» — el continuo normal, sin going to"],
              itemIds: ["ena2m6imgoingtobook"],
              tip: "Detrás de to, un verbo. Ese es el cartel que dice «esto es un plan», no un desplazamiento.",
            },
            {
              id: "ena2m6l1e2", type: "fastmatch", prompt: "Calentamiento veloz — el transporte ya es tuyo del A1",
              pairs: [
                { target: "the train", source: "el tren" },
                { target: "the tube", source: "el metro de Londres" },
                { target: "a taxi", source: "un taxi" },
                { target: "the plane", source: "el avión" },
                { target: "on foot", source: "a pie" },
              ],
              targetSeconds: 25,
              itemIds: ["entrain", "entube", "entaxi", "enplane", "enonfoot"],
              tip: "El módulo entero se mueve en estos cinco. Que salgan sin pensar es media lección ganada.",
            },
            {
              id: "ena2m6l1e3", type: "bucket", prompt: "La trampa del A1, desactivada: mira lo que va detrás de «to»",
              categories: ["movimiento: va a un SITIO", "intención: va a HACER algo"],
              items: [
                { text: "I'm going to the station.", bucket: 0 },
                { text: "I'm going to book a hotel.", bucket: 1 },
                { text: "We're going to Brighton.", bucket: 0 },
                { text: "I'm going to take the train.", bucket: 1 },
                { text: "She's going to the beach.", bucket: 0 },
                { text: "She's going to study Italian.", bucket: 1 },
                { text: "I'm going to work.", bucket: 0 },
                { text: "I'm going to work harder.", bucket: 1 },
              ],
              itemIds: ["ena2m6imgoingtobook", "ena2m6weregoingtobrighton", "ena2m6imgoingtoworkharder", "ena2m6shesgoingtostudy", "enimgoingtowork"],
              tip: "Las dos últimas son la misma frase con dos palabras de más. Por eso la regla no es «going to significa X», sino «mira qué viene detrás».",
            },
            {
              id: "ena2m6l1e4", type: "mc", prompt: "La regla, en una pregunta",
              question: "¿Qué te dice si «I'm going to…» es un trayecto o un plan?",
              options: [
                "Lo que va detrás de to: un sitio o un verbo",
                "La persona: I es trayecto, we es plan",
                "El tono de voz",
              ],
              answer: 0,
              whyWrong: [null, "La persona no decide nada: I'm going to work y we're going to work funcionan igual", "En escrito no hay tono, y aun así la frase se entiende: la información está en la palabra siguiente"],
              itemIds: ["enimgoingtowork", "ena2m6imgoingtoworkharder"],
            },
            {
              id: "ena2m6l1e5", type: "cloze", prompt: "El «be» que el español no pone",
              text: "I ___ going to book a hotel in Brighton.",
              answers: ["'m", "am"],
              translation: "Voy a reservar un hotel en Brighton.",
              hints: ["En español «voy» lleva la persona dentro; en inglés la lleva otra palabra", "I … going to…"],
              itemIds: ["ena2m6imgoingtobook"],
              tip: "«I going to book» es el error de arranque más común, y sale de que en español el verbo ir ya va conjugado. En inglés hace falta el be delante, siempre.",
            },
            {
              id: "ena2m6l1e6", type: "cloze", prompt: "Y con «she»",
              text: "Amy ___ going to study Italian next year.",
              answers: ["is", "'s"],
              translation: "Amy va a estudiar italiano el año que viene.",
              hints: ["El be de tercera persona", "Amy … going to study…"],
              itemIds: ["ena2m6shesgoingtostudy"],
            },
            {
              id: "ena2m6l1e7", type: "transform", prompt: "Del presente de rutina al plan",
              source: "We visit Emma every summer.",
              instruction: "Ponla como plan, con going to y «next summer»",
              answers: [
                "We're going to visit Emma next summer.",
                "We are going to visit Emma next summer.",
                "Next summer we're going to visit Emma.",
              ],
              translation: "El verano que viene vamos a visitar a Emma.",
              hints: ["be + going to + el verbo tal cual, sin tocarlo", "We're going to v… Emma next summer."],
              itemIds: ["ena2m6theyregoingtomove", "enmyfavouriteseason"],
            },
            {
              id: "ena2m6l1e8", type: "build", prompt: "Construye el plan",
              target: "I'm going to book a hotel",
              translation: "Voy a reservar un hotel",
              distractors: ["booking", "goes"],
              itemIds: ["ena2m6imgoingtobook"],
            },
            {
              id: "ena2m6l1e9", type: "errorfix", prompt: "Corrige el calco — este sale del «voy a reservando» que nadie diría en español, y aun así se escribe",
              wrong: "I'm going to booking a hotel.",
              answers: ["I'm going to book a hotel."],
              why: "Detrás de «going to» el verbo va en forma de diccionario, desnuda: book, take, study, move. La terminación -ing ya la lleva going, y un verbo no puede llevarla dos veces en la misma frase.",
              translation: "Voy a reservar un hotel.",
              itemIds: ["ena2m6imgoingtobook"],
              tip: "Es el mismo motor que ya conoces de did + verbo desnudo: la pieza de delante se lleva toda la gramática y el verbo se queda limpio.",
            },
            {
              id: "ena2m6l1e10", type: "errorfix", prompt: "Corrige la pregunta",
              wrong: "What you are going to do on Saturday?",
              answers: ["What are you going to do on Saturday?"],
              why: "Con be, la pregunta se hace dándole la vuelta al sujeto y al verbo: are you, no you are. Es lo mismo que ya haces con «Are you busy?» — la palabra qu- delante no cambia esa regla, solo se pone al principio.",
              translation: "¿Qué vas a hacer el sábado?",
              itemIds: ["ena2m6whatareyougoingtodo", "enimbusy"],
            },
            {
              id: "ena2m6l1e11", type: "listen", prompt: "Escucha y transcribe",
              text: "They're going to move to Manchester.",
              translation: "Se van a mudar a Manchester.",
              hints: ["They + be contraído + going to + verbo", "They're going to m… to Manchester."],
              itemIds: ["ena2m6theyregoingtomove"],
            },
            {
              id: "ena2m6l1e12", type: "match", prompt: "Empareja cada plan con su traducción",
              pairs: [
                { target: "I'm going to work.", source: "Voy al trabajo (estoy en camino)" },
                { target: "I'm going to work harder.", source: "Voy a esforzarme más" },
                { target: "We're going to Brighton.", source: "Vamos a Brighton" },
                { target: "We're going to book a hotel.", source: "Vamos a reservar un hotel" },
              ],
              itemIds: ["enimgoingtowork", "ena2m6imgoingtoworkharder", "ena2m6weregoingtobrighton", "ena2m6imgoingtobook"],
              tip: "Fíjate en los pares 1-2 y 3-4: en cada uno cambia una sola cosa, lo que viene después de to. Y con eso cambia todo el significado.",
            },
            {
              id: "ena2m6l1e13", type: "speak", prompt: "Dilo en voz alta — tus dos primeros planes de A2",
              text: "We're going to Brighton on Saturday. I'm going to book a hotel.",
              phonetic: "uía GÓU-in ta BRÁI-ton on SÁ-ta-dei. áim GÓU-in ta buk a jou-TÉL",
              translation: "Vamos a Brighton el sábado. Voy a reservar un hotel.",
              itemIds: ["ena2m6weregoingtobrighton", "ena2m6imgoingtobook"],
              tip: "El «to» de en medio no se pronuncia «tu»: es una «ta» floja. GÓU-in-ta, todo pegado. En la lección 5 lo trabajamos entero.",
            },
            {
              id: "ena2m6l1e14", type: "type", prompt: "Cierre de producción",
              question: "¿Qué vas a hacer el sábado? Voy a reservar un hotel.",
              answers: [
                "What are you going to do on Saturday? I'm going to book a hotel.",
                "What are you going to do on Saturday? I am going to book a hotel.",
              ],
              hints: ["La pregunta invierte are y you · la respuesta lleva be + going to + verbo desnudo", "What a… you going to do on Saturday? I'm going to b… a hotel."],
              itemIds: ["ena2m6whatareyougoingtodo", "ena2m6imgoingtobook"],
              tip: "Con esas dos frases ya puedes abrir y cerrar cualquier conversación sobre planes. Todo lo demás del módulo es afinar.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m6-1",
            book: "We're going to travel by train.",
            real: "We're getting the train.",
            meaning: "Vamos en tren",
            when: "Con amigos y compañeros, para un plan ya cerrado. En Reino Unido «get the train / get the bus» es lo normal para coger un transporte. En el examen escribe «take the train» o «go by train»: las dos puntúan y no suenan raras.",
            register: "amigos",
            note: "get es el comodín del inglés hablado: get the train, get a taxi, get home. En el papel, take.",
            sound: "uía GUE-tin de TRÉIN",
            level: "a2",
            itemId: "entrain",
          },
        },
      ],
      resources: [
        { label: "British Council — 'going to'", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/talking-about-the-future", note: "Lee solo el primer apartado, el de going to (3 min). Ignora de momento todo lo que diga «will»: eso es del módulo 11." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — negativa, pregunta y la predicción que se ve venir
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l2",
      phaseId: "ena2m6",
      title: "Are you going to take the train?",
      subtitle: "Preguntar el plan, negarlo — y decir lo que se ve venir",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar, negar y anticipar",
          itemIds: ["ena2m6areyougoingtotakethetrain", "ena2m6imnotgoingtodrive", "ena2m6itsgoingtorain", "ena2m6weregoingtobelate", "ena2m6clouds", "ena2m6aweekoff"],
        },
        {
          kind: "note",
          note: {
            title: "La negativa y la pregunta salen gratis",
            body: "Esto no hay casi ni que aprenderlo: <b>going to hereda las reglas de be</b>, y las de be las traes del A1 intactas.<br/><br/>· <b>Negativa</b>: el <i>not</i> se mete detrás de be. <i>I'<b>m not</b> going to drive.</i> · <i>She <b>isn't</b> going to come.</i> · <i>We <b>aren't</b> going to stay.</i><br/>· <b>Pregunta</b>: be salta delante del sujeto. <i><b>Are you</b> going to take the train?</i> · <i><b>Is she</b> going to come?</i><br/>· <b>Respuesta corta</b>: se repite <b>be</b>, nunca do ni going. <i>Yes, I <b>am</b>. / No, I'<b>m not</b>.</i><br/><br/><b>El error que hay que matar hoy</b> es meter <i>do</i> donde no toca: <i>Do you going to take the train?</i> Sale de que en el A1 casi todas las preguntas llevaban do/does, y de que en el módulo 2 casi todas llevaban did. Pero <b>do y be nunca aparecen juntos</b>: si la frase ya tiene be —y going to siempre lo tiene—, be hace de auxiliar y do sobra.<br/><br/>Truco de un segundo: <b>¿hay un am / is / are en la frase? Entonces no hay do.</b>",
            table: [
              ["", "con be (going to)", "con do (presente simple)"],
              ["afirmativa", "I'm going to drive.", "I drive to work."],
              ["negativa", "I'm not going to drive.", "I don't drive to work."],
              ["pregunta", "Are you going to drive?", "Do you drive to work?"],
              ["respuesta corta", "Yes, I am.", "Yes, I do."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El otro going to: lo que se ve venir",
            body: "Going to hace dos trabajos, y el segundo es igual de útil que el primero. Ya tienes la <b>intención</b> («lo tengo decidido»). El segundo es la <b>predicción con pruebas delante</b>: algo que va a pasar y se nota <b>ahora mismo</b>.<br/><br/>· <b>[[It's going to rain.|Va a llover.]]</b> — y lo dices porque estás mirando [[the clouds|las nubes]].<br/>· <b>[[We're going to be late!|¡Vamos a llegar tarde!]]</b> — y lo dices porque son y veinte y el tren sale y media.<br/>· <i>Look at that bus — it's going to stop.</i><br/><br/>Lo que une los dos usos es que <b>la causa ya existe</b> cuando hablas: o la decisión ya está tomada, o las señales ya están ahí. Going to nunca es una suposición sacada de la nada.<br/><br/><b>Ojo con «be».</b> «Vamos a llegar tarde» lleva un verbo en inglés que el español se salta: <i>We're going to <b>be</b> late</i>, porque tarde se <b>está</b>, como en <i>I'm late</i> del A1. <i>We're going to late</i> deja la frase sin verbo principal.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l2e1", type: "mc", prompt: "Reconoce la negativa",
              question: "“I'm not going to drive — the traffic is terrible.”",
              options: ["No voy a conducir", "No conduzco nunca", "No sé conducir"],
              answer: 0,
              whyWrong: [null, "Eso sería «I don't drive» — rutina, no plan", "Eso sería «I can't drive»"],
              itemIds: ["ena2m6imnotgoingtodrive"],
            },
            {
              id: "ena2m6l2e2", type: "bucket", prompt: "¿Lo tiene decidido, o se ve venir?",
              categories: ["decisión ya tomada", "se ve venir (hay señales)"],
              items: [
                { text: "I'm going to book a hotel.", bucket: 0 },
                { text: "It's going to rain.", bucket: 1 },
                { text: "We're going to be late!", bucket: 1 },
                { text: "She's going to study Italian.", bucket: 0 },
                { text: "I'm not going to drive.", bucket: 0 },
                { text: "Look at that bus — it's going to stop.", bucket: 1 },
              ],
              itemIds: ["ena2m6itsgoingtorain", "ena2m6weregoingtobelate", "ena2m6imnotgoingtodrive", "ena2m6imgoingtobook"],
              tip: "Los dos usos comparten lo esencial: la causa ya está ahí antes de que hables. Por eso son la misma estructura y no dos.",
            },
            {
              id: "ena2m6l2e3", type: "transform", prompt: "Ponla en negativa",
              source: "I'm going to drive to Brighton.",
              instruction: "Niégala",
              answers: ["I'm not going to drive to Brighton.", "I am not going to drive to Brighton."],
              translation: "No voy a conducir hasta Brighton.",
              hints: ["El not se mete justo detrás del be", "I'm n… going to drive to Brighton."],
              itemIds: ["ena2m6imnotgoingtodrive"],
            },
            {
              id: "ena2m6l2e4", type: "transform", prompt: "Ponla en pregunta",
              source: "You're going to take the train.",
              instruction: "Conviértela en pregunta",
              answers: ["Are you going to take the train?"],
              translation: "¿Vas a coger el tren?",
              hints: ["El be salta delante del sujeto; nada de do", "A… you going to take the train?"],
              itemIds: ["ena2m6areyougoingtotakethetrain"],
            },
            {
              id: "ena2m6l2e5", type: "cloze", prompt: "Completa la pregunta",
              text: "___ Amy going to come with us?",
              answers: ["Is"],
              translation: "¿Amy va a venir con nosotras?",
              hints: ["Amy es «she»: el be de tercera persona, y va delante", "… Amy going to come with us?"],
              itemIds: ["ena2m6areyougoingtotakethetrain", "endoyouwanttocome"],
            },
            {
              id: "ena2m6l2e6", type: "cloze", prompt: "Completa la negativa",
              text: "We aren't going to ___ a taxi — it's too expensive.",
              answers: ["take", "get"],
              translation: "No vamos a coger un taxi: es demasiado caro.",
              hints: ["Detrás de going to, el verbo desnudo", "aren't going to t… a taxi"],
              itemIds: ["entaxi", "entooexpensive"],
            },
            {
              id: "ena2m6l2e7", type: "errorfix", prompt: "Corrige — hay un auxiliar de más",
              wrong: "Do you going to take the train?",
              answers: ["Are you going to take the train?"],
              why: "Si la frase ya lleva be (am / is / are), be es el auxiliar y hace él la pregunta. Do y be nunca conviven: «Do you are…?» tampoco existe. La pista está a la vista — en cuanto veas un going to, busca el be y dale la vuelta.",
              translation: "¿Vas a coger el tren?",
              itemIds: ["ena2m6areyougoingtotakethetrain"],
            },
            {
              id: "ena2m6l2e8", type: "errorfix", prompt: "Corrige la terminación",
              wrong: "It's going to rains tomorrow.",
              answers: ["It's going to rain tomorrow."],
              why: "Detrás de going to, el verbo va desnudo: sin -s, sin -ed y sin -ing. La -s de tercera persona ya la lleva el «is» de delante, y una frase no marca la persona dos veces.",
              translation: "Mañana va a llover.",
              itemIds: ["ena2m6itsgoingtorain"],
            },
            {
              id: "ena2m6l2e9", type: "mc", prompt: "La respuesta corta",
              question: "“Are you going to come on Saturday?” — ¿cómo se contesta que sí?",
              options: ["Yes, I am.", "Yes, I do.", "Yes, I going."],
              answer: 0,
              whyWrong: [null, "Do contesta a preguntas con do: «Do you like it?» → «Yes, I do»", "La respuesta corta repite el auxiliar, y el auxiliar aquí es am"],
              itemIds: ["ena2m6areyougoingtotakethetrain"],
              tip: "Regla de oro de las respuestas cortas: se devuelve el auxiliar que traía la pregunta. Are you…? → I am. Did you…? → I did.",
            },
            {
              id: "ena2m6l2e10", type: "audiomc", prompt: "Escucha el plan de Amy — pregunta primero, audio después",
              audio: "I'm not going to work next week. I have a week off, so I'm going to visit my mum. I'm not going to drive — I'm going to get the coach.",
              question: "¿Cómo va a viajar Amy?",
              options: ["En autocar", "En coche", "En tren"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice justo lo contrario: «I'm not going to drive»", "El tren no suena en ningún momento"],
              itemIds: ["ena2m6aweekoff", "ena2m6imnotgoingtodrive", "ena2m6thecoach"],
              tip: "En el examen, la opción que suena literalmente en el audio suele ser la trampa: aquí «drive» aparece, pero con un not delante. Escucha la frase entera, no la palabra.",
            },
            {
              id: "ena2m6l2e11", type: "speak", prompt: "Dilo en voz alta — mirando por la ventana",
              text: "Look at the clouds! It's going to rain. We're going to be late.",
              phonetic: "luk at de KLÁUDS̬! its GÓU-in ta RÉIN. uía GÓU-in ta bi LÉIT",
              translation: "¡Mira las nubes! Va a llover. Vamos a llegar tarde.",
              itemIds: ["ena2m6clouds", "ena2m6itsgoingtorain", "ena2m6weregoingtobelate"],
              tip: "Fíjate en el «be» de la última: sin él la frase se queda coja. Es el mismo be de «I'm late» que traes del A1.",
            },
            {
              id: "ena2m6l2e12", type: "type", prompt: "Cierre de producción",
              question: "¿Vas a coger el tren? No, no voy a conducir: voy a coger el autocar.",
              answers: [
                "Are you going to take the train? No, I'm not going to drive: I'm going to take the coach.",
                "Are you going to take the train? No, I'm not going to drive. I'm going to take the coach.",
                "Are you going to get the train? No, I'm not going to drive. I'm going to get the coach.",
              ],
              hints: ["La pregunta con be delante · la negativa con not detrás del be", "A… you going to take the train? No, I'm n… going to drive…"],
              itemIds: ["ena2m6areyougoingtotakethetrain", "ena2m6imnotgoingtodrive", "ena2m6thecoach"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 Listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Busca cualquier audio con «plans» en el título y escúchalo dos veces: la primera por el sentido, la segunda contando cuántos going to caen." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — el presente continuo de futuro y el punto ciego del español
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l3",
      phaseId: "ena2m6",
      title: "We're meeting Amy at six",
      subtitle: "La cita que ya está en la agenda — y el error que suena perfecto en español",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que ya está apalabrado",
          itemIds: ["ena2m6weremeetingamyatsix", "ena2m6imleavingonfriday", "ena2m6imstayingwithemma", "ena2m6whatareyoudoingtonight", "ena2m6nextweekend", "ena2m6thetrainleavesatten"],
        },
        {
          kind: "note",
          note: {
            title: "El continuo también sirve para el futuro (y es lo que más se usa)",
            body: "Del A1 traes el continuo para lo de <b>ahora mismo</b>: <i>[[I'm learning English.|Estoy aprendiendo inglés.]]</i> Pues bien, esa misma forma —<b>be + verbo en -ing</b>— es lo que un inglés usa para contar sus <b>citas</b>:<br/><br/>· <b>[[We're meeting Amy at six.|Hemos quedado con Amy a las seis.]]</b><br/>· <b>[[I'm leaving on Friday.|Me voy el viernes.]]</b><br/>· <b>[[I'm staying with Emma.|Me quedo en casa de Emma.]]</b><br/><br/><b>¿Y cómo se distingue de «ahora mismo»?</b> Por lo que hay alrededor. Si hay una <b>hora o una fecha futura</b> —<i>at six</i>, <i>on Friday</i>, <i>tonight</i>, <i>next weekend</i>—, es un plan. Si hay <i>now</i>, <i>right now</i> o <i>at the moment</i>, es lo de este segundo. Nunca hay confusión de verdad, porque nadie dice «estoy quedando con Amy a las seis» de ahora mismo.<br/><br/><b>¿Y entonces going to y el continuo hacen lo mismo?</b> Casi. La diferencia es de grado y es fácil de recordar:<br/><br/>· <b>going to</b> = lo he decidido. <i>I'm going to book a hotel.</i> (aún no lo he reservado)<br/>· <b>continuo</b> = está apalabrado, con hora y sitio, y hay otra gente metida. <i>We're meeting Amy at six.</i> (Amy ya lo sabe)<br/><br/>En el examen las dos puntúan casi siempre igual. Pero para las citas —el 90 % de lo que vas a contar— el continuo es lo que suena a nativo.",
            table: [
              ["forma", "qué dice", "ejemplo"],
              ["be + going to + verbo", "lo he decidido yo", "I'm going to book a hotel."],
              ["be + verbo -ing + hora/fecha", "está apalabrado con alguien", "We're meeting Amy at six."],
              ["be + verbo -ing + now / at the moment", "está pasando ahora", "I'm cooking at the moment."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El punto ciego: «I go to the cinema tomorrow» — y por qué nadie te lo corrige",
            body: "Este es el error más caro de la lección, y el más difícil de ver, porque <b>en español la frase es impecable</b>: «mañana <b>voy</b> al cine», «el viernes <b>salgo</b> a las diez», «la semana que viene <b>trabajo</b> en Brighton». El español usa el presente para los planes sin ningún problema.<br/><br/><b>El inglés no.</b> En inglés el presente simple significa <b>rutina</b> —lo que haces siempre— y nada más:<br/><br/>· <i>I go to the cinema on Fridays.</i> = voy al cine todos los viernes. Rutina.<br/>· <b>❌</b> <i>I go to the cinema tomorrow.</i> = no significa nada. Suena a robot.<br/>· <b>✅</b> <i>I'<b>m going</b> to the cinema tomorrow.</i> = mañana voy al cine.<br/><br/>Como nadie te va a decir nada —se te entiende igual— este error se queda contigo hasta el B2 si no lo cazas ahora. La vacuna es de una línea: <b>si en la frase hay una fecha futura, el verbo no puede ir en presente simple</b>.<br/><br/><b>Y ahora la excepción, que es una sola y es honesta:</b> los <b>horarios publicados</b>. Un tren, un avión, un cine, una tienda: eso no es tu plan, es el plan del mundo, y va en presente simple.<br/><br/>· <b>[[The train leaves at ten.|El tren sale a las diez.]]</b> · <i>[[The film starts at half past seven.|La película empieza a las siete y media.]]</i> (esta ya la traías del A1) · <i>The shop opens at nine.</i><br/><br/>Regla para decidir en un segundo: <b>¿lo decides tú, o está en un cartel?</b> Si lo decides tú, continuo. Si está en un cartel, presente simple.",
            table: [
              ["", "qué es", "qué forma"],
              ["I'm meeting Amy at six.", "tu cita", "continuo"],
              ["The train leaves at ten.", "el horario de la estación", "presente simple"],
              ["I'm working on Saturday.", "tu turno de este sábado", "continuo"],
              ["I work on Saturdays.", "tu rutina de siempre", "presente simple"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l3e1", type: "mc", prompt: "¿Ahora mismo, o un plan?",
              question: "“We're meeting Amy at six.”",
              options: ["Hemos quedado con Amy a las seis", "Estamos con Amy ahora mismo", "Solemos ver a Amy a las seis"],
              answer: 0,
              whyWrong: [null, "«At six» es una hora futura: nadie describe el presente con una cita", "Eso sería «We meet Amy at six» — y significaría todos los días"],
              itemIds: ["ena2m6weremeetingamyatsix"],
            },
            {
              id: "ena2m6l3e2", type: "bucket", prompt: "El mismo continuo, dos trabajos: ¿ahora, o plan?",
              categories: ["está pasando ahora", "es un plan con fecha"],
              items: [
                { text: "I'm working right now.", bucket: 0 },
                { text: "I'm working on Saturday.", bucket: 1 },
                { text: "We're meeting Amy at six.", bucket: 1 },
                { text: "Look — it's raining.", bucket: 0 },
                { text: "I'm leaving on Friday.", bucket: 1 },
                { text: "She's sleeping at the moment.", bucket: 0 },
              ],
              itemIds: ["ena2m6weremeetingamyatsix", "ena2m6imleavingonfriday", "enrightnow", "enatthemoment", "enitsraining", "ensleeping"],
              tip: "Lo que decide no es el verbo: es el complemento de tiempo. Búscalo siempre primero.",
            },
            {
              id: "ena2m6l3e3", type: "bucket", prompt: "¿Lo decides tú, o está en un cartel?",
              categories: ["tu plan → continuo", "horario publicado → presente simple"],
              items: [
                { text: "The train leaves at ten.", bucket: 1 },
                { text: "I'm meeting Amy at six.", bucket: 0 },
                { text: "The film starts at half past seven.", bucket: 1 },
                { text: "We're going to Brighton on Saturday.", bucket: 0 },
                { text: "The shop opens at nine.", bucket: 1 },
                { text: "I'm staying with Emma next weekend.", bucket: 0 },
              ],
              itemIds: ["ena2m6thetrainleavesatten", "enthefilmstarts", "ena2m6imstayingwithemma", "ena2m6weregoingtobrighton"],
              tip: "La excepción de los horarios es la única del inglés en este terreno, y es fácil de aceptar: un tren no cambia de idea.",
            },
            {
              id: "ena2m6l3e4", type: "errorfix", prompt: "Corrige — en español está perfecta, y ese es el problema",
              wrong: "I go to the cinema tomorrow.",
              answers: ["I'm going to the cinema tomorrow."],
              why: "«Mañana voy al cine» es impecable en español, y de ahí sale este calco. Pero en inglés el presente simple solo dice RUTINA: «I go to the cinema» significa que vas siempre. Con una fecha futura delante o detrás, el verbo tiene que ir en continuo.",
              translation: "Mañana voy al cine.",
              itemIds: ["enletsgotothecinema", "ena2m6whatareyoudoingtonight"],
              tip: "Nadie te va a corregir esto en la calle, porque se te entiende. Por eso hay que matarlo aquí: es de los pocos errores que sobreviven al B1 intactos.",
            },
            {
              id: "ena2m6l3e5", type: "errorfix", prompt: "Otro calco de presente",
              wrong: "We meet Amy at six.",
              answers: ["We're meeting Amy at six."],
              why: "Tal cual está, la frase dice que quedáis con Amy a las seis TODOS los días. Para una cita concreta hace falta el continuo: We're meeting.",
              translation: "Hemos quedado con Amy a las seis.",
              itemIds: ["ena2m6weremeetingamyatsix"],
            },
            {
              id: "ena2m6l3e6", type: "cloze", prompt: "Completa con el continuo de futuro",
              text: "I ___ leaving on Friday morning.",
              answers: ["'m", "am"],
              translation: "Me voy el viernes por la mañana.",
              hints: ["be + verbo en -ing, y aquí falta el be", "I … leaving on Friday morning."],
              itemIds: ["ena2m6imleavingonfriday"],
            },
            {
              id: "ena2m6l3e7", type: "cloze", prompt: "Y aquí el horario, que va distinto",
              text: "Hurry up! The train ___ (leave) at ten and it's five to.",
              answers: ["leaves"],
              translation: "¡Date prisa! El tren sale a las diez y son las diez menos cinco.",
              hints: ["Un horario publicado no es tu plan: presente simple", "The train l… at ten."],
              itemIds: ["ena2m6thetrainleavesatten", "entrain"],
              tip: "Aquí la -s de tercera persona vuelve. Es la única casilla del módulo donde reaparece: en going to y en el continuo no hay -s que valga.",
            },
            {
              id: "ena2m6l3e8", type: "transform", prompt: "Del presente de rutina a la cita concreta",
              source: "I work on Saturdays.",
              instruction: "Dilo como plan de ESTE sábado, con el continuo",
              answers: ["I'm working on Saturday.", "I am working on Saturday."],
              translation: "Este sábado trabajo.",
              hints: ["be + working, y el día en singular", "I'm w… on Saturday."],
              itemIds: ["enwork", "enonmonday"],
            },
            {
              id: "ena2m6l3e9", type: "mc", prompt: "Going to o continuo: ¿cuál suena mejor aquí?",
              question: "Ya has quedado con Amy: hora, sitio y ella lo sabe. ¿Cómo lo cuentas?",
              options: [
                "We're meeting Amy at six outside the cinema.",
                "We meet Amy at six outside the cinema.",
                "We meeting Amy at six outside the cinema.",
              ],
              answer: 0,
              whyWrong: [null, "Presente simple: eso dice que quedáis con ella todos los días", "Falta el be: sin él, el continuo no existe"],
              itemIds: ["ena2m6weremeetingamyatsix", "enoutsidethecinema"],
              tip: "«We're going to meet Amy at six» tampoco está mal y en el examen puntúa. Pero cuando la cita ya está cerrada con otra persona, el continuo es lo que dice un nativo.",
            },
            {
              id: "ena2m6l3e10", type: "match", prompt: "Empareja cada frase con lo que significa de verdad",
              pairs: [
                { target: "I work on Saturdays.", source: "Trabajo los sábados (siempre)" },
                { target: "I'm working on Saturday.", source: "Este sábado trabajo" },
                { target: "The shop opens at nine.", source: "La tienda abre a las nueve (horario)" },
                { target: "I'm staying with Emma.", source: "Me quedo en casa de Emma" },
              ],
              itemIds: ["ena2m6imstayingwithemma", "enshop", "enwork"],
            },
            {
              id: "ena2m6l3e11", type: "listen", prompt: "Dictado — un plan y una pregunta",
              text: "What are you doing tonight? I'm staying with Emma.",
              translation: "¿Qué haces esta noche? Me quedo en casa de Emma.",
              hints: ["Las dos son continuo: be + -ing", "What a… you d… tonight? I'm s… with Emma."],
              itemIds: ["ena2m6whatareyoudoingtonight", "ena2m6imstayingwithemma"],
            },
            {
              id: "ena2m6l3e12", type: "gapbank", prompt: "El finde de Valeria: elige la forma que toca",
              text: "Next weekend Valeria ___ to Brighton with Amy. They ___ at ten on Saturday morning, so the alarm is at seven. On Sunday the last train ___ at nine in the evening.",
              answers: ["is going", "are leaving", "leaves"],
              bank: ["is going", "are leaving", "leaves", "goes", "left", "is leaving"],
              translation: "El finde que viene Valeria va a Brighton con Amy. Salen a las diez el sábado por la mañana, así que el despertador está a las siete. El domingo el último tren sale a las nueve de la noche.",
              itemIds: ["ena2m6nextweekend", "ena2m6imleavingonfriday", "ena2m6thetrainleavesatten"],
              tip: "El tercer hueco es el que separa a quien ha entendido la lección: el tren no decide nada, así que va en presente simple. Y el segundo lleva «are» porque son dos.",
            },
            {
              id: "ena2m6l3e13", type: "type", prompt: "Cierre de producción",
              question: "El finde que viene me quedo en casa de Emma. Hemos quedado a las seis.",
              answers: [
                "Next weekend I'm staying with Emma. We're meeting at six.",
                "Next weekend I am staying with Emma. We are meeting at six.",
                "I'm staying with Emma next weekend. We're meeting at six.",
              ],
              hints: ["next va sin the y sin on · las dos frases en continuo", "Next weekend I'm s… with Emma. We're m… at six."],
              itemIds: ["ena2m6nextweekend", "ena2m6imstayingwithemma", "ena2m6weremeetingamyatsix"],
              tip: "Dos continuos seguidos y ni un presente simple. Si te ha salido a la primera, acabas de cerrar el error que más lejos llega.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m6-2",
            book: "What are you doing tonight?",
            real: "You up to anything tonight?",
            meaning: "¿Tienes algo esta noche? / ¿Haces algo esta noche?",
            when: "Entre amigos y compañeros, para tantear si alguien está libre antes de proponer nada. Se come el «Are» del principio, que es lo que la hace sonar tan informal. En el examen, y con quien no conoces: What are you doing tonight? o Are you free tonight?",
            register: "amigos",
            note: "«to be up to something» = tener algo entre manos. Ojo: no es lo mismo que «be up for something», que es «apuntarse».",
            sound: "yu AP tu É-ni-zing tu-NÁIT",
            level: "a2",
            itemId: "ena2m6whatareyoudoingtonight",
          },
        },
      ],
      resources: [
        { label: "British Council — Present continuous", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/present-continuous", note: "Baja hasta el apartado de «future arrangements» y lee solo ese. Es media pantalla, y es justo la lección de hoy." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — when / before / after: una sola marca de futuro por frase
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l4",
      phaseId: "ena2m6",
      title: "When I get there, I'm going to call you",
      subtitle: "«Cuando llegue»: el subjuntivo español no existe, y el futuro tampoco se repite",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Enganchar dos cosas que aún no han pasado",
          itemIds: ["ena2m6whenigetthere", "ena2m6beforeweleave", "ena2m6afterwearrive", "ena2m6assoonas", "ena2m6imgoingtotextyou"],
        },
        {
          kind: "note",
          note: {
            title: "Una frase, una marca de futuro — y va en la principal",
            body: "Mira estas dos frases españolas y lo que tienen dentro:<br/><br/><i>«<b>Cuando llegue</b>, te llamo.»</i> — «llegue» es subjuntivo, una forma que el inglés <b>no tiene</b>.<br/><i>«<b>Antes de salir</b>, miro los billetes.»</i> — infinitivo.<br/><br/>Al traducir, la mano se va sola a poner un futuro donde el español puso subjuntivo, y sale <b>❌ <i>When I will get there, I'm going to call you</i></b>. Es el error nº 1 de este módulo y uno de los que más se ven en el Writing del examen.<br/><br/><b>La explicación, y no es un capricho:</b> el inglés <b>ya sabe que la frase habla del futuro</b>, porque lo dice la parte principal —<i>I'm going to call you</i>—. Repetirlo en la otra mitad le sobra. Una frase, <b>una sola marca de futuro</b>, y va en la principal. La subordinada se queda en <b>presente</b>, y ese presente se lee como futuro sin problema.<br/><br/>· <b>[[When I get there|Cuando llegue]], I'm going to call you.</b><br/>· <b>[[Before we leave|Antes de salir]], I'm going to check the tickets.</b><br/>· <b>[[After we arrive|Cuando lleguemos]], we're going to find the hotel.</b><br/>· <b>I'm going to text you [[as soon as|en cuanto]] I get on the train.</b><br/><br/><b>Las palabras que abren esa mitad</b> son cuatro y con estas te sobra: <b>when</b> (cuando), <b>before</b> (antes de que), <b>after</b> (después de que), <b>as soon as</b> (en cuanto).<br/><br/><b>La coma:</b> si la subordinada va <b>delante</b>, lleva coma detrás. Si va <b>detrás</b>, no lleva nada. <i>When I get there, I'm going to call you.</i> = <i>I'm going to call you when I get there.</i> Las dos son correctas y significan lo mismo.",
            table: [
              ["español", "inglés", "por qué"],
              ["cuando llegue…", "when I get there…", "presente: el futuro ya está en la otra mitad"],
              ["antes de salir…", "before we leave…", "presente, y con sujeto (el inglés no usa infinitivo aquí)"],
              ["en cuanto llegue a casa…", "as soon as I get home…", "presente"],
              ["…te llamo / te voy a llamar", "…I'm going to call you", "AQUÍ va la marca de futuro"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Dos avisos pequeños que ahorran dos errores",
            body: "<b>1. Before y after piden sujeto.</b> En español dices «antes de <i>salir</i>» y «después de <i>llegar</i>», con el verbo suelto. En inglés, detrás de <i>before</i> y <i>after</i> va una frase entera: <b>before <u>we</u> leave</b>, <b>after <u>we</u> arrive</b>. Si te olvidas del sujeto, la frase se queda en el aire.<br/><br/><b>2. When no siempre es «cuando».</b> En pregunta, <i>when</i> sigue siendo la palabra de siempre —<i>[[When is your birthday?|¿Cuándo es tu cumpleaños?]]</i>—, y ahí sí puede haber futuro detrás, porque no es una subordinada de tiempo, es la pregunta entera. La regla del presente vale para la mitad que <b>engancha</b> con otra: <i>when I get there</i>, <i>when the train arrives</i>.<br/><br/>Y una cosa que quita miedo: si en la subordinada pones <i>going to</i> por error en vez de presente, se te entiende igual. Lo que <b>rompe</b> de verdad, y lo que el corrector marca, es el <i>will</i>: <i>when I will get there</i>. Ese es el que hay que borrar de la cabeza.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l4e1", type: "mc", prompt: "Elige la buena",
              question: "«Cuando llegue a Brighton, te llamo.»",
              options: [
                "When I get to Brighton, I'm going to call you.",
                "When I will get to Brighton, I'm going to call you.",
                "When I get to Brighton, I get to call you.",
              ],
              answer: 0,
              whyWrong: [null, "El futuro ya está en la segunda mitad: repetirlo en la primera sobra", "Sin marca de futuro en ninguna de las dos mitades, la frase se lee como rutina"],
              itemIds: ["ena2m6whenigetthere"],
              tip: "Una frase, una marca de futuro. Localiza primero cuál es la mitad principal: ahí es donde va.",
            },
            {
              id: "ena2m6l4e2", type: "bucket", prompt: "¿Dónde va la marca de futuro?",
              categories: ["aquí SÍ: es la principal", "aquí NO: va en presente"],
              items: [
                { text: "…I'm going to call you", bucket: 0 },
                { text: "when I get there…", bucket: 1 },
                { text: "before we leave…", bucket: 1 },
                { text: "…we're going to find the hotel", bucket: 0 },
                { text: "as soon as I get home…", bucket: 1 },
                { text: "…I'm going to text you", bucket: 0 },
              ],
              itemIds: ["ena2m6whenigetthere", "ena2m6beforeweleave", "ena2m6afterwearrive", "ena2m6assoonas", "ena2m6imgoingtotextyou"],
              tip: "Las de la derecha empiezan todas por una palabra de enganche: when, before, after, as soon as. Ese es el cartel de «aquí no».",
            },
            {
              id: "ena2m6l4e3", type: "errorfix", prompt: "Corrige el error nº 1 del módulo",
              wrong: "When I will arrive, I'm going to call you.",
              answers: ["When I arrive, I'm going to call you."],
              why: "El español pone subjuntivo («cuando llegue») y al traducir sale un futuro. Pero el inglés ya ha dicho que esto es futuro en la otra mitad —I'm going to call you— y no lo repite. Detrás de when va presente, y se lee como futuro sin ningún problema.",
              translation: "Cuando llegue, te llamo.",
              itemIds: ["ena2m6whenigetthere", "ena2m1arrived"],
            },
            {
              id: "ena2m6l4e4", type: "errorfix", prompt: "El mismo error, con «before»",
              wrong: "Before we will leave, I'm going to check the tickets.",
              answers: ["Before we leave, I'm going to check the tickets."],
              why: "Before, after, when y as soon as abren la mitad que NO lleva la marca de futuro. La lleva la otra: I'm going to check.",
              translation: "Antes de salir voy a mirar los billetes.",
              itemIds: ["ena2m6beforeweleave", "enticket"],
            },
            {
              id: "ena2m6l4e5", type: "errorfix", prompt: "Y ahora falta algo, no sobra",
              wrong: "After arrive, we're going to find the hotel.",
              answers: ["After we arrive, we're going to find the hotel."],
              why: "En español «después de llegar» se dice con el verbo suelto. En inglés, detrás de after va una frase con su sujeto: after WE arrive. Lo mismo con before: before WE leave.",
              translation: "Cuando lleguemos, buscamos el hotel.",
              itemIds: ["ena2m6afterwearrive"],
            },
            {
              id: "ena2m6l4e6", type: "cloze", prompt: "Completa la subordinada",
              text: "I'm going to text you when I ___ (get) on the train.",
              answers: ["get"],
              translation: "Te escribo cuando me suba al tren.",
              hints: ["Detrás de when, presente — y aquí el sujeto es I", "when I g… on the train"],
              itemIds: ["ena2m6imgoingtotextyou"],
            },
            {
              id: "ena2m6l4e7", type: "cloze", prompt: "Completa la principal",
              text: "As soon as I get home, I ___ going to have a shower.",
              answers: ["'m", "am"],
              translation: "En cuanto llegue a casa, me voy a dar una ducha.",
              hints: ["La marca de futuro va aquí: be + going to", "I … going to have a shower."],
              itemIds: ["ena2m6assoonas", "enhome"],
            },
            {
              id: "ena2m6l4e8", type: "transform", prompt: "Dale la vuelta a la frase",
              source: "When I get there, I'm going to call you.",
              instruction: "Pon la mitad de «when» al final",
              answers: ["I'm going to call you when I get there."],
              translation: "Te llamo cuando llegue.",
              hints: ["Las dos mitades se intercambian; al final, la coma desaparece", "I'm going to call you w… I get there."],
              itemIds: ["ena2m6whenigetthere"],
              tip: "La coma solo aparece cuando la subordinada va delante. Si va detrás, nada: es lo mismo que en español.",
            },
            {
              id: "ena2m6l4e9", type: "build", prompt: "Construye la frase entera",
              target: "Before we leave I'm going to check the tickets",
              translation: "Antes de salir voy a mirar los billetes",
              distractors: ["will", "leaving"],
              itemIds: ["ena2m6beforeweleave"],
              tip: "La ficha «will» está ahí a propósito y sobra siempre. No la vas a necesitar hasta el módulo 11.",
            },
            {
              id: "ena2m6l4e10", type: "gapbank", prompt: "El plan de Valeria, hueco a hueco",
              text: "Before we ___, I'm going to check the booking. When we ___ in Brighton, we're going to find the hotel. As soon as I ___ my bag in the room, I'm going to the beach.",
              answers: ["leave", "arrive", "put"],
              bank: ["leave", "arrive", "put", "left", "stayed", "checked"],
              translation: "Antes de salir voy a mirar la reserva. Cuando lleguemos a Brighton buscamos el hotel. En cuanto deje la bolsa en la habitación, me voy a la playa.",
              itemIds: ["ena2m6beforeweleave", "ena2m6afterwearrive", "ena2m6thebooking", "ena2m2putgroup"],
              tip: "Los tres huecos van en presente aunque los tres hablen del futuro. Los pasados del banco están ahí para ver si te fías de la regla.",
            },
            {
              id: "ena2m6l4e11", type: "speak", prompt: "Dilo en voz alta — con la pausa de la coma",
              text: "When I get there, I'm going to call you. As soon as I get home, I'm going to text Amy.",
              phonetic: "uen ái guet DÉA, áim GÓU-in ta KOOL yu. as̬ SÚUN as̬ ái guet JÓUM, áim GÓU-in ta TEKST ÉI-mi",
              translation: "Cuando llegue, te llamo. En cuanto llegue a casa, le escribo a Amy.",
              itemIds: ["ena2m6whenigetthere", "ena2m6assoonas"],
              tip: "Marca la pausa donde está la coma: es lo que hace que se entienda dónde acaba una mitad y empieza la otra.",
            },
            {
              id: "ena2m6l4e12", type: "translate", prompt: "Traduce al inglés — y vigila el subjuntivo",
              direction: "toTarget",
              mode: "produce",
              source: "Cuando lleguemos a Brighton, vamos a buscar el hotel.",
              answers: [
                "When we arrive in Brighton, we're going to find the hotel.",
                "When we get to Brighton, we're going to find the hotel.",
                "When we arrive in Brighton, we are going to find the hotel.",
              ],
              hint: "la mitad que empieza por «cuando» no lleva marca de futuro",
              itemIds: ["ena2m6afterwearrive", "ena2m1arrived"],
              tip: "Y de paso, la preposición de arrive que ya viste en el módulo 1: con ciudades, arrive IN.",
            },
            {
              id: "ena2m6l4e13", type: "type", prompt: "Cierre de producción",
              question: "Antes de salir voy a mirar los billetes. Cuando llegue, te llamo.",
              answers: [
                "Before we leave, I'm going to check the tickets. When I get there, I'm going to call you.",
                "Before we leave I'm going to check the tickets. When I get there I'm going to call you.",
              ],
              hints: ["Dos frases, dos marcas de futuro: una en cada principal", "Before we l…, I'm going to check the tickets. When I g… there, I'm going to call you."],
              itemIds: ["ena2m6beforeweleave", "ena2m6whenigetthere"],
              tip: "Cuéntalos: dos «going to» y ni un «will». Si te ha salido así, la trampa del subjuntivo está desactivada.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Talking about the future", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/talking-about-the-future", note: "Busca el apartado de las oraciones de tiempo (when, before, after, as soon as) y quédate solo con los ejemplos: verás que ni uno lleva will detrás de when." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: gonna, wanna y el `to` que se apaga
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l5",
      phaseId: "ena2m6",
      title: "Clínica de sonido: GÓU-in-ta",
      subtitle: "Por qué nunca oyes «going to» — y por qué a ti no te entienden",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que suena de verdad",
          itemIds: ["ena2m6gonnasound", "ena2m6wannasound", "ena2m6toweak", "ena2m6imgoingtogo", "ena2m6whereareyougonnastay"],
        },
        {
          kind: "note",
          note: {
            title: "El «to» que se apaga: la clínica del módulo",
            body: "Tienes la gramática del futuro. Ahora el problema de oído, que es doble: <b>no lo reconoces al oírlo</b> y <b>no te entienden al decirlo</b>. Y la culpa es de una sola palabra: <b>to</b>.<br/><br/>En español todas las sílabas pesan lo mismo: «voy-a-re-ser-var», cinco golpes iguales. En inglés no: las palabras <b>de gramática</b> —to, of, and, for, a— se apagan y se pegan a la de al lado. El <b>to</b> de going to no suena «tu»: suena <b>«ta»</b>, floja y sin fuerza.<br/><br/>· <i>going to take</i> → <b>GÓU-in-ta téik</b><br/>· <i>going to book</i> → <b>GÓU-in-ta buk</b><br/><br/>Si tú dices «GÓU-ing TÚU TÉIK», con tres golpes fuertes, un inglés te entiende, pero suena a extranjero de manual — y lo que es peor, <b>tu oído se acostumbra a buscar un «tu» que nunca va a llegar</b>.<br/><br/><b>Y de ahí sale gonna.</b> Cuando el «ta» se pega del todo a going, la cosa acaba en una sola palabra: <b>[[gonna|going to, fundido]]</b>. Nadie lo planeó: es lo que pasa cuando dos sílabas flojas se rozan mil veces al día. Su hermana es <b>[[wanna|want to, fundido]]</b>: <i>I wanna go</i> = I want to go.<br/><br/><b>Las dos reglas de gonna, y son innegociables:</b><br/>1. <b>Solo delante de VERBO.</b> <i>I'm gonna take the train</i> ✅. Pero <i>I'm going to Brighton</i> <b>nunca</b> es «I'm gonna Brighton» ❌ — ahí to es una preposición de destino, no la pieza del futuro. Fíjate en lo bien que encaja esto con la lección 1: <b>gonna solo aparece donde había una intención</b>.<br/>2. <b>No se escribe jamás.</b> Ni en un email, ni en el examen, ni en un mensaje a tu profesora. En el papel siempre <b>going to</b>.<br/><br/>Ya lo oíste tres veces en el A1 sin tener que hacer nada. Hoy le pones nombre y regla.",
            table: [
              ["lo que dice el libro", "lo que oyes", "¿vale gonna?"],
              ["I'm going to take the train.", "áim GA-na téik de tréin", "sí: detrás hay un verbo"],
              ["I'm going to Brighton.", "áim GÓU-in ta BRÁI-ton", "no: detrás hay un sitio"],
              ["What are you going to do?", "uót a ya GA-na dúu", "sí"],
              ["I want to go.", "ái UÓ-na góu", "wanna, la misma historia"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l5e1", type: "mc", prompt: "El sonido del «to»",
              question: "En «I'm going to take the train», el «to» suena…",
              options: ["«ta», flojo y pegado a going", "«tu», bien marcado", "no suena nada"],
              answer: 0,
              whyWrong: [null, "«Tu» es como se dice sola, pero dentro de la frase se apaga", "Sonar suena: lo que pasa es que suena flojo, no que desaparezca"],
              itemIds: ["ena2m6toweak"],
            },
            {
              id: "ena2m6l5e2", type: "bucket", prompt: "¿Aquí cabe «gonna» o no?",
              categories: ["sí: detrás va un VERBO", "no: detrás va un SITIO"],
              items: [
                { text: "I'm going to take the train.", bucket: 0 },
                { text: "I'm going to Brighton.", bucket: 1 },
                { text: "She's going to study Italian.", bucket: 0 },
                { text: "We're going to the beach.", bucket: 1 },
                { text: "What are you going to do?", bucket: 0 },
                { text: "He's going to work.", bucket: 1 },
              ],
              itemIds: ["ena2m6gonnasound", "ena2m6weregoingtobrighton", "ena2m6shesgoingtostudy", "enimgoingtowork"],
              tip: "Es la misma pregunta de la lección 1 con otra ropa: mira lo que va detrás de to. Gonna solo existe donde hay intención.",
            },
            {
              id: "ena2m6l5e3", type: "hearreal", prompt: "¿Cuál has oído?",
              book: "I'm going to take the coach.",
              real: "I'm gonna take the coach.",
              translation: "Voy a coger el autocar.",
              itemIds: ["ena2m6gonnasound", "ena2m6thecoach"],
              tip: "Las dos dicen exactamente lo mismo. La de arriba es la que escribes; la de abajo, la que vas a oír en la estación.",
            },
            {
              id: "ena2m6l5e4", type: "hearreal", prompt: "¿Qué significa lo que suena?",
              book: "Where are you going to stay?",
              real: "Where are you gonna stay?",
              translation: "¿Dónde te vas a quedar?",
              ask: "meaning",
              meaningOptions: ["¿Dónde te vas a quedar?", "¿Dónde estás ahora?", "¿Dónde te quedaste?"],
              itemIds: ["ena2m6whereareyougonnastay"],
            },
            {
              id: "ena2m6l5e5", type: "shadow", prompt: "Repite pegándote al audio — dos pasadas",
              text: "I'm gonna get the train and I'm gonna text you.",
              phonetic: "áim GA-na guet de TRÉIN and áim GA-na TEKST yu",
              translation: "Voy a coger el tren y te escribo.",
              reps: 2,
              itemIds: ["ena2m6gonnasound", "ena2m6imgoingtotextyou"],
              tip: "No intentes pronunciarlo bonito: intenta ir a la misma velocidad. La velocidad es lo que funde las sílabas, no el esfuerzo.",
            },
            {
              id: "ena2m6l5e6", type: "mc", prompt: "La regla de escritura",
              question: "Estás escribiendo el email del examen. ¿Cómo lo pones?",
              options: ["I'm going to visit my sister.", "I'm gonna visit my sister.", "Da igual: las dos puntúan"],
              answer: 0,
              whyWrong: [null, "gonna no se escribe nunca, y en el examen te baja el criterio de vocabulario y registro", "No dan igual: una es lengua escrita y la otra es una transcripción del habla"],
              itemIds: ["ena2m6gonnasound", "ensister"],
              tip: "Reconocerlo al oírlo: obligatorio. Escribirlo: jamás. Es la misma regla que ya tenías con «wanna» desde el A1.",
            },
            {
              id: "ena2m6l5e7", type: "listen", prompt: "Dictado — escríbelo como se escribe, no como suena",
              text: "I'm going to go to the beach.",
              translation: "Voy a ir a la playa.",
              hints: ["Vas a oír «GA-na», pero se escribe entero", "I'm g… to go to the beach."],
              itemIds: ["ena2m6imgoingtogo"],
              tip: "Sí: «going to go» es correcto y muy frecuente. El primer go es la pieza del futuro, el segundo es el verbo de verdad.",
            },
            {
              id: "ena2m6l5e8", type: "mc", prompt: "Y su hermana pequeña",
              question: "“I wanna go home.” ¿Qué se está diciendo?",
              options: ["I want to go home.", "I won't go home.", "I'm going home."],
              answer: 0,
              whyWrong: [null, "won't suena «uóunt» y es otra cosa: no llega hasta el módulo 11", "Eso sería «I'm gonna go home», con gonna"],
              itemIds: ["ena2m6wannasound"],
            },
            {
              id: "ena2m6l5e9", type: "speak", prompt: "Dilo rápido — lo importante es la velocidad, no la boca",
              text: "What are you going to do at the weekend?",
              phonetic: "uót a ya GA-na DÚU at de UÍI-kend",
              translation: "¿Qué vas a hacer el fin de semana?",
              itemIds: ["ena2m6whatareyougoingtodo", "enatweekend"],
              tip: "Fíjate en que «are you» también se apaga: «a ya». En una pregunta de going to solo suenan fuertes dos cosas: la palabra qu- y el verbo del final.",
            },
            {
              id: "ena2m6l5e10", type: "audiomc", prompt: "Habla rápida de verdad — pregunta primero",
              audio: "I'm gonna get the ten o'clock train, so I'm gonna leave the house at half past nine. I'm not gonna take a taxi — I'm gonna walk.",
              question: "¿Cómo va a llegar a la estación?",
              options: ["Andando", "En taxi", "En autobús"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Lo descarta él mismo: «I'm not gonna take a taxi»", "El autobús no suena"],
              itemIds: ["ena2m6gonnasound", "enwalk", "entaxi"],
              tip: "Cuatro «gonna» en tres frases. Así de normal es: si esperas oír «going to», te pierdes la mitad del audio.",
            },
            {
              id: "ena2m6l5e11", type: "fastmatch", prompt: "Ráfaga: lo que suena y lo que significa",
              pairs: [
                { target: "gonna", source: "going to (delante de verbo)" },
                { target: "wanna", source: "want to" },
                { target: "GÓU-in-ta téik", source: "going to take" },
                { target: "uót a ya GA-na dúu", source: "What are you going to do?" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m6gonnasound", "ena2m6wannasound", "ena2m6toweak", "ena2m6whatareyougoingtodo"],
            },
            {
              id: "ena2m6l5e12", type: "type", prompt: "Cierre — lo oyes fundido, lo escribes entero",
              question: "Escribe bien lo que suena: «áim GA-na buk a jou-TÉL tu-NÁIT»",
              answers: [
                "I'm going to book a hotel tonight.",
                "I am going to book a hotel tonight.",
              ],
              hints: ["GA-na se escribe con tres palabras", "I'm g… t… book a hotel tonight."],
              itemIds: ["ena2m6gonnasound", "ena2m6imgoingtobook"],
              tip: "Este es el ejercicio del módulo que más se parece al examen: el Listening suena a calle y la respuesta se escribe en inglés de libro.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m6-3",
            book: "I'm going to be late.",
            real: "I'm gonna be late!",
            meaning: "Voy a llegar tarde",
            when: "En cualquier conversación hablada, con quien sea: gonna no es vulgar, es sencillamente cómo suena going to cuando se habla a velocidad normal. Lo dice un catedrático y lo dice un niño. Lo que no se hace es escribirlo — ni en un email de trabajo ni en el examen.",
            register: "neutral",
            note: "Solo funciona delante de verbo. «I'm gonna the station» no existe en boca de nadie.",
            sound: "áim GA-na bi LÉIT",
            level: "a2",
            itemId: "ena2m6weregoingtobelate",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — Connected speech", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca cualquier clip de «weak forms» y escúchalo dos veces sin leer. La segunda vez, cuenta cuántos «to» consigues oír: te van a salir menos de los que hay." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — por dónde se va: along, across, towards, up, down, past
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l6",
      phaseId: "ena2m6",
      title: "Along the beach, across the road",
      subtitle: "Las preposiciones que cuentan el camino, no el sitio",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "El movimiento, dibujado",
          itemIds: ["ena2m6alongthebeach", "ena2m6acrosstheroad", "ena2m6towardsthestation", "ena2m6upthehill", "ena2m6downthestreet", "ena2m6pastthebank"],
        },
        {
          kind: "note",
          note: {
            title: "Preposiciones de sitio, preposiciones de camino",
            body: "Del A1 traes las de <b>sitio</b>: [[in the kitchen|en la cocina]], [[on the table|encima de la mesa]], [[next to the sofa|al lado del sofá]], [[opposite|enfrente]]. Todas contestan a <b>¿dónde está?</b> y no se mueven.<br/><br/>Las de hoy contestan a otra pregunta: <b>¿por dónde vas?</b> Son seis, y cada una es un dibujo:<br/><br/>· <b>[[along|a lo largo de]]</b> — vas <b>siguiendo</b> algo largo sin salirte: <i>Walk along the beach. · Go along this street.</i><br/>· <b>[[across|de un lado al otro]]</b> — cruzas de una orilla a la otra: <i>Go across the road.</i><br/>· <b>[[towards|hacia]]</b> — en esa dirección, y <b>no dice que llegues</b>: <i>Walk towards the station.</i><br/>· <b>[[up|hacia arriba]]</b> / <b>[[down|hacia abajo]]</b> — subiendo o bajando: <i>up the hill</i>, <i>down the street</i>.<br/>· <b>[[past|pasando por delante]]</b> — lo dejas atrás: <i>Go past the bank and turn left.</i><br/><br/><b>Tres avisos que valen su peso:</b><br/><br/>1. <b>across no lleva «of»</b>. El español pide una preposición detrás («a través <i>de</i>») y sale <i>across of the road</i> ❌. Ninguna de las seis lleva of.<br/>2. <b>across es preposición, cross es verbo</b>. Del A1 traes [[Cross the street.|Cruza la calle.]] — ahí <i>cross</i> ES el verbo. Con <i>across</i> hace falta otro verbo delante: <i>Go across the road. · Walk across the park.</i><br/>3. <b>down the street no siempre es «calle abajo»</b>. En la práctica, un inglés lo usa para «un poco más allá en esta calle», sin cuesta ninguna: <i>The station is just down the road.</i> Con <i>up</i> pasa lo mismo. No busques la pendiente.<br/><br/>Y una que ya sabes y aquí se cobra: estas preposiciones van con su complemento pegado, y <b>entre el verbo y lo que va detrás no se mete nada</b> — la regla de la lección 6 del módulo 3. Se dice <i>Walk slowly along the beach</i> o <i>Walk along the beach slowly</i>, nunca <i>Walk along slowly the beach</i>.",
            table: [
              ["preposición", "el dibujo", "ejemplo"],
              ["along", "siguiendo algo largo", "Walk along the beach."],
              ["across", "de un lado al otro", "Go across the road."],
              ["towards", "en esa dirección (sin llegar)", "Walk towards the station."],
              ["up / down", "subiendo / bajando (o más allá)", "up the hill · down the street"],
              ["past", "dejándolo atrás", "Go past the bank."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l6e1", type: "match", prompt: "Empareja cada preposición con su dibujo",
              pairs: [
                { target: "along the beach", source: "por la playa, siguiéndola" },
                { target: "across the road", source: "cruzando la carretera" },
                { target: "towards the station", source: "hacia la estación" },
                { target: "past the bank", source: "pasando el banco, dejándolo atrás" },
              ],
              itemIds: ["ena2m6alongthebeach", "ena2m6acrosstheroad", "ena2m6towardsthestation", "ena2m6pastthebank"],
            },
            {
              id: "ena2m6l6e2", type: "bucket", prompt: "¿Dice dónde está algo, o por dónde se va?",
              categories: ["dónde está (A1)", "por dónde se va"],
              items: [
                { text: "next to the bank", bucket: 0 },
                { text: "past the bank", bucket: 1 },
                { text: "opposite the station", bucket: 0 },
                { text: "towards the station", bucket: 1 },
                { text: "in the kitchen", bucket: 0 },
                { text: "across the road", bucket: 1 },
              ],
              itemIds: ["ena2m6pastthebank", "ena2m6towardsthestation", "ena2m6acrosstheroad", "ennexttothebank", "enopposite", "eninthekitchen"],
              tip: "Las de la izquierda van con «is»: the bank IS next to the station. Las de la derecha van con un verbo de movimiento: GO past the bank.",
            },
            {
              id: "ena2m6l6e3", type: "cloze", prompt: "Completa la preposición",
              text: "The hotel is on the beach. Walk ___ the beach for ten minutes and it's on the right.",
              answers: ["along"],
              translation: "El hotel está en la playa. Ve andando por la playa diez minutos y está a la derecha.",
              hints: ["No la cruzas ni la subes: la sigues", "Walk a… the beach"],
              itemIds: ["ena2m6alongthebeach"],
            },
            {
              id: "ena2m6l6e4", type: "cloze", prompt: "Completa la preposición",
              text: "The station is opposite the café: go ___ the road and it's there.",
              answers: ["across"],
              translation: "La estación está enfrente del café: cruza la carretera y ahí está.",
              hints: ["De una orilla a la otra", "go a… the road"],
              itemIds: ["ena2m6acrosstheroad", "enopposite"],
            },
            {
              id: "ena2m6l6e5", type: "errorfix", prompt: "Corrige — sobra una palabra",
              wrong: "Go across of the road and turn left.",
              answers: ["Go across the road and turn left."],
              why: "El español pide preposición detrás («a través DE», «al lado DE») y por eso la mano añade un «of». Ninguna de las preposiciones de movimiento lo lleva: across the road, along the beach, past the bank, towards the station.",
              translation: "Cruza la carretera y gira a la izquierda.",
              itemIds: ["ena2m6acrosstheroad", "enturnleft"],
            },
            {
              id: "ena2m6l6e6", type: "errorfix", prompt: "Corrige — falta el verbo",
              wrong: "Across the road and you are at the hotel.",
              answers: ["Go across the road and you are at the hotel."],
              why: "«Across» es una preposición, no un verbo: necesita uno delante (go, walk, run). El verbo que significa «cruzar» es «cross», y ese sí va solo: Cross the road.",
              translation: "Cruza la carretera y estás en el hotel.",
              itemIds: ["ena2m6acrosstheroad", "encrossthestreet"],
            },
            {
              id: "ena2m6l6e7", type: "mc", prompt: "El matiz de «towards»",
              question: "“Walk towards the station.” ¿Qué te está diciendo?",
              options: [
                "Camina en dirección a la estación (no dice que llegues)",
                "Camina hasta la estación y entra",
                "Camina alrededor de la estación",
              ],
              answer: 0,
              whyWrong: [null, "Eso sería «walk to the station»: to sí dice que llegas", "Eso sería «around the station»"],
              itemIds: ["ena2m6towardsthestation"],
              tip: "to = llegas · towards = vas en esa dirección. Es la diferencia entre «voy a la estación» y «voy hacia la estación», igual que en español.",
            },
            {
              id: "ena2m6l6e8", type: "gapbank", prompt: "Cómo se llega al B&B: rellena el camino",
              text: "Go ___ the station and turn right. Walk ___ the road at the traffic lights. Then go ___ the hill: the bed and breakfast is at the top.",
              answers: ["past", "across", "up"],
              bank: ["past", "across", "up", "along", "towards", "down"],
              translation: "Pasa la estación y gira a la derecha. Cruza la carretera en el semáforo. Luego sube la cuesta: la pensión está arriba del todo.",
              itemIds: ["ena2m6pastthebank", "ena2m6acrosstheroad", "ena2m6upthehill", "ena2m6abedandbreakfast"],
              tip: "El tercer hueco lo decide «at the top», no la gramática: «down» encajaría igual de bien si la pensión estuviera abajo. Lee siempre la frase entera antes de elegir la ficha.",
            },
            {
              id: "ena2m6l6e9", type: "build", prompt: "Construye la instrucción",
              target: "Walk along the beach towards the pier",
              translation: "Ve andando por la playa hacia el muelle",
              distractors: ["across", "of"],
              itemIds: ["ena2m6alongthebeach", "ena2m6towardsthestation"],
              tip: "La ficha «of» sobra siempre en este terreno. Está ahí porque es la que más se cuela.",
            },
            {
              id: "ena2m6l6e10", type: "audiomc", prompt: "Direcciones en Brighton — pregunta primero",
              audio: "Go out of the station and walk down the hill towards the sea. Then go across the main road and walk along the beach. The hotel is past the pier, on the right.",
              question: "¿Qué hay que hacer con la carretera principal?",
              options: ["Cruzarla", "Seguirla", "Girar antes de llegar"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Seguir es «along», y eso se hace después, con la playa", "No suena ningún giro antes de la carretera"],
              itemIds: ["ena2m6acrosstheroad", "ena2m6alongthebeach", "ena2m6downthestreet"],
              tip: "En la Parte 1 del Listening las direcciones caen seguidas. Apunta la preposición de cada paso: es la que lleva la información, no el verbo.",
            },
            {
              id: "ena2m6l6e11", type: "speak", prompt: "Dilo en voz alta — el camino entero",
              text: "Go past the bank, across the road and along the beach.",
              phonetic: "góu paast de BÁNK, a-KROS de RÓUD and a-LONG de BÍICH",
              translation: "Pasa el banco, cruza la carretera y ve por la playa.",
              itemIds: ["ena2m6pastthebank", "ena2m6acrosstheroad", "ena2m6alongthebeach"],
              tip: "Tres preposiciones seguidas y ni un «of». Si te sale limpio, el calco está muerto.",
            },
            {
              id: "ena2m6l6e12", type: "type", prompt: "Cierre de producción",
              question: "Cruza la carretera y ve andando por la playa hacia el hotel.",
              answers: [
                "Go across the road and walk along the beach towards the hotel.",
                "Cross the road and walk along the beach towards the hotel.",
                "Go across the road and walk along the beach to the hotel.",
              ],
              hints: ["Tres preposiciones de camino, ninguna con of", "Go a… the road and walk a… the beach t… the hotel."],
              itemIds: ["ena2m6acrosstheroad", "ena2m6alongthebeach", "ena2m6towardsthestation"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Prepositions of place and movement", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/prepositions-place", note: "Mira solo los dibujos. Estas seis preposiciones se aprenden con el ojo, no con la lista: si ves la flecha, ya no se te olvida." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — el viaje de verdad: equipaje, papeles, andén y tráfico
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l7",
      phaseId: "ena2m6",
      title: "Platform four, coach B",
      subtitle: "Las palabras del viaje — y los incontables que hacen fallar una frase entera",
      minutes: 15,
      sections: [
        {
          kind: "phrases",
          title: "Lo que llevas, lo que reservas y lo que te retrasa",
          itemIds: ["ena2m6luggage", "ena2m6suitcase", "ena2m6passport", "ena2m6thebooking", "ena2m6platformfour", "ena2m6areturnticket", "ena2m6atrafficjam", "ena2m6abedandbreakfast", "ena2m6thecoach"],
        },
        {
          kind: "note",
          note: {
            title: "Cuatro palabras de viaje que el español traduce mal",
            body: "El vocabulario de esta lección es casi todo transparente, así que vamos directos a los cuatro sitios donde se pierde tiempo:<br/><br/><b>1. [[luggage|el equipaje]] no tiene plural.</b> Es incontable, como <i>information</i> o <i>advice</i>: nunca <i>luggages</i>, nunca <i>a luggage</i>. Si quieres contar, cuentas las piezas: <i>two [[suitcases|maletas]]</i>, <i>three bags</i>. Y si quieres decir «mucho equipaje»: <i>a lot of luggage</i>.<br/><br/><b>2. [[the traffic|el tráfico]] tampoco.</b> <i>There was a lot of traffic</i>, siempre en singular. Lo que sí se cuenta es el atasco: <b>[[a traffic jam|un atasco]]</b>, <i>two traffic jams</i>.<br/><br/><b>3. [[the coach|el autocar]] es un falso amigo doble.</b> No es un entrenador (aunque también signifique eso) y no es un coche: es el <b>autobús de largo recorrido</b>, el que va de ciudad a ciudad. Y en un tren, <i>coach B</i> es el <b>vagón</b> B. El autobús urbano de siempre sigue siendo <i>bus</i>.<br/><br/><b>4. [[platform four|el andén número cuatro]] va sin «the» y sin «number».</b> En la estación se dice <i>Platform 4</i>, tal cual, igual que <i>Gate 12</i> en el aeropuerto. El cartel lo dice así y el altavoz también.<br/><br/>Y dos que van en pareja: <b>[[a return ticket|un billete de ida y vuelta]]</b> frente a <i>a single</i> (solo ida). En la taquilla se pide entero: <i>A return to Brighton, please.</i>",
            table: [
              ["se cuenta", "no se cuenta"],
              ["a suitcase · two suitcases", "luggage"],
              ["a traffic jam · two traffic jams", "traffic"],
              ["a bag · three bags", "information"],
              ["a ticket · two tickets", "advice"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Perder, dejarse y olvidar: los cuatro verbos del módulo 2, en un andén",
            body: "Un viaje es el sitio donde estos cuatro se cruzan, y ya los tienes repartidos del módulo 2. Aquí solo se recuerda cuál va con qué, porque en español los tres primeros son «perder» u «olvidar» y en inglés no:<br/><br/>· <b>lose</b> → <b>objetos</b>. <i>I [[lost|perdí]] my phone. · I lost my passport.</i> No sabes dónde está.<br/>· <b>miss</b> → <b>transportes y citas</b>. <i>I [[missed the bus|perdí el autobús]]. · We're going to miss the train.</i> Llegaste tarde.<br/>· <b>forget</b> → <b>se te va de la cabeza</b>. <i>I [[forgot|me dejé]] my keys.</i> No dice dónde están.<br/>· <b>leave</b> → <b>lo dejaste en un sitio concreto</b>, y ese sitio se dice. <i>I left my suitcase at the hotel.</i><br/><br/>La regla corta: <b>forget sin sitio, leave con sitio</b>. <i>I forgot my passport</i> ✅ · <i>I left my passport at home</i> ✅ · <i>I forgot my passport at home</i> ❌.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l7e1", type: "fastmatch", prompt: "Ráfaga del andén",
              pairs: [
                { target: "luggage", source: "el equipaje" },
                { target: "a suitcase", source: "una maleta" },
                { target: "my passport", source: "el pasaporte" },
                { target: "the booking", source: "la reserva" },
                { target: "platform four", source: "el andén cuatro" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m6luggage", "ena2m6suitcase", "ena2m6passport", "ena2m6thebooking", "ena2m6platformfour"],
            },
            {
              id: "ena2m6l7e2", type: "bucket", prompt: "¿Se cuenta o no se cuenta?",
              categories: ["se cuenta (lleva a / plural)", "no se cuenta (nunca plural)"],
              items: [
                { text: "suitcase", bucket: 0 },
                { text: "luggage", bucket: 1 },
                { text: "traffic", bucket: 1 },
                { text: "traffic jam", bucket: 0 },
                { text: "ticket", bucket: 0 },
                { text: "information", bucket: 1 },
              ],
              itemIds: ["ena2m6luggage", "ena2m6suitcase", "ena2m6atrafficjam", "enticket"],
              tip: "Los incontables del inglés no siguen la lógica del español: «los equipajes» y «los tráficos» tampoco se dicen mucho en español, pero «las informaciones» sí, y en inglés jamás.",
            },
            {
              id: "ena2m6l7e3", type: "errorfix", prompt: "Corrige el plural imposible",
              wrong: "I'm going to take two luggages.",
              answers: ["I'm going to take two bags."],
              why: "Luggage es incontable: no tiene plural ni lleva número delante. Si quieres contar, cuentas las piezas — two bags, two suitcases — o dejas la cantidad en «a lot of luggage».",
              translation: "Voy a llevar dos bolsas.",
              itemIds: ["ena2m6luggage"],
            },
            {
              id: "ena2m6l7e4", type: "errorfix", prompt: "Corrige la concordancia",
              wrong: "There were a lot of traffics this morning.",
              answers: ["There was a lot of traffic this morning."],
              why: "Traffic es incontable y siempre singular, así que pide «there was», no «there were». Lo que sí se cuenta es el atasco: there were two traffic jams.",
              translation: "Esta mañana había mucho tráfico.",
              itemIds: ["ena2m6atrafficjam", "ena2m1therewas", "ena2m1therewere"],
              tip: "Es el mismo mecanismo del módulo 1: en inglés, lo que va detrás decide si es was o were. Y «traffic» va en singular siempre.",
            },
            {
              id: "ena2m6l7e5", type: "bucket", prompt: "Espiral del módulo 2: ¿lose, miss, forget o leave?",
              categories: ["lo perdiste: no sabes dónde está", "llegaste tarde y se fue sin ti"],
              items: [
                { text: "I lost my passport.", bucket: 0 },
                { text: "We missed the train.", bucket: 1 },
                { text: "I lost my suitcase at the airport.", bucket: 0 },
                { text: "She missed her flight.", bucket: 1 },
                { text: "I lost my wallet on the coach.", bucket: 0 },
                { text: "They missed the last bus.", bucket: 1 },
              ],
              itemIds: ["ena2m2ilostmyphone", "ena2m1missedthebus", "ena2m6passport", "ena2m2mywallet"],
              tip: "El español llama «perder» a las dos cosas y por eso se cruzan. En inglés lose es para objetos y miss para lo que se va sin ti.",
            },
            {
              id: "ena2m6l7e6", type: "mc", prompt: "Forget o leave",
              question: "El pasaporte está encima de tu mesa, en casa, y tú estás en la estación.",
              options: [
                "I left my passport at home.",
                "I forgot my passport at home.",
                "I lost my passport at home.",
              ],
              answer: 0,
              whyWrong: [null, "Forget no lleva sitio: se dice «I forgot my passport», a secas", "Lose es cuando no sabes dónde está, y tú lo sabes perfectamente"],
              itemIds: ["ena2m2iforgotmykeys", "ena2m6passport"],
              tip: "Forget sin sitio, leave con sitio. Es la única diferencia y sirve para toda la vida.",
            },
            {
              id: "ena2m6l7e7", type: "cloze", prompt: "Completa en la taquilla",
              text: "A ___ to Brighton, please — I'm coming back on Sunday.",
              answers: ["return"],
              translation: "Un billete de ida y vuelta a Brighton, por favor: vuelvo el domingo.",
              hints: ["Si vuelves, no es un single", "A r… to Brighton, please."],
              itemIds: ["ena2m6areturnticket"],
            },
            {
              id: "ena2m6l7e8", type: "cloze", prompt: "Completa el aviso de la estación",
              text: "The ten o'clock train to Brighton leaves from ___ four.",
              answers: ["platform"],
              translation: "El tren de las diez a Brighton sale del andén cuatro.",
              hints: ["Va sin the y sin number", "leaves from p… four"],
              itemIds: ["ena2m6platformfour", "ena2m6thetrainleavesatten"],
            },
            {
              id: "ena2m6l7e9", type: "listen", prompt: "Dictado — el mensaje de Amy",
              text: "I'm going to check the booking before we leave.",
              translation: "Voy a mirar la reserva antes de salir.",
              hints: ["going to + verbo desnudo · before + sujeto + presente", "I'm going to check the b… before we l…."],
              itemIds: ["ena2m6thebooking", "ena2m6beforeweleave"],
            },
            {
              id: "ena2m6l7e10", type: "audiomc", prompt: "Aviso de megafonía — pregunta primero, dos escuchas",
              audio: "Good morning. The nine forty-five service to Brighton is going to leave from platform six, not platform four. Passengers with a lot of luggage, please use the lift.",
              question: "¿Qué ha cambiado?",
              options: ["El andén", "La hora", "El destino"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "La hora se dice una sola vez y no se corrige", "Brighton se dice una vez y no cambia"],
              notepad: true,
              itemIds: ["ena2m6platformfour", "ena2m6luggage"],
              tip: "En los avisos de estación, la información importante casi siempre viene con un «not» detrás: «platform six, NOT platform four». Ese not es el dato.",
            },
            {
              id: "ena2m6l7e11", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "There was a traffic jam, so we missed the coach and we lost a whole morning.",
              answers: [
                "Había un atasco, así que perdimos el autocar y perdimos una mañana entera.",
                "Hubo un atasco, así que perdimos el autocar y perdimos toda una mañana.",
              ],
              itemIds: ["ena2m6atrafficjam", "ena2m6thecoach", "ena2m2soiwalked"],
              tip: "Dos «perder» en español, dos verbos distintos en inglés: miss el autocar, lose la mañana. Fíjate en que el reparto aguanta incluso con algo que no es un objeto.",
            },
            {
              // LECTURA LARGA (Reading Part 4), la segunda del nivel. Género
              // expositivo —comparar dos maneras de ir al mismo sitio—, con la
              // lengua de m6 (be going to, presente continuo de futuro,
              // when/before) apoyada en los comparativos de m4 y los
              // incontables de m5. Nada por delante del módulo.
              id: "ena2m6l7e13", type: "read", prompt: "Lectura larga, como la Parte 4 del Reading: lee el texto entero y responde. Toca las palabras subrayadas si necesitas la glosa.",
              title: "Two ways to get to Brighton",
              text: "Valeria and Amy are going to Brighton in July, and they still don't know how they are going to get there.<br/><br/>The train is the fast way. It leaves from Victoria and it takes about an hour. The problem is the price: on a Saturday morning in summer [[a return ticket|un billete de ida y vuelta]] is expensive, and if you buy it at the station on the day, it is even more expensive. Amy always says the same thing: 'Buy it three weeks before and it costs half.'<br/><br/>The coach is slower. It takes two hours, and two and a half when the traffic is bad. It leaves from a station that is not very close to the flat, so they are going to need a bus before the coach. But it is much cheaper, and you can take a big bag without paying extra.<br/><br/>There is a third way, and Ben talks about it every summer: he is going to drive. He has got a small old car and he loves it. He never mentions the [[car park|el aparcamiento]] in Brighton. It is full by ten o'clock and it costs more than two train tickets.<br/><br/>Amy is going to decide this week. She usually decides these things and Valeria usually agrees. But this time Valeria has a plan: she is going to look at the prices herself, before Saturday.",
              source: "relato del curso",
              questions: [
                {
                  id: "ena2m6l7e13q1",
                  q: "How long does the train take?",
                  options: ["About an hour", "Two hours", "Two and a half hours"],
                  answer: 0,
                  why: "«it takes about an hour». Las dos horas y las dos y media son las del autocar, y el texto las pone justo debajo para ver si vas rápido.",
                },
                {
                  id: "ena2m6l7e13q2",
                  q: "What does Amy's advice tell us about train tickets?",
                  options: [
                    "That the same journey costs different money depending on when you buy it",
                    "That tickets are always cheaper at the station",
                    "That you cannot buy a ticket on the day of the journey",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Ella no explica la regla, da un consejo: «cómpralo tres semanas antes y cuesta la mitad». La regla hay que sacarla de ahí.",
                },
                {
                  id: "ena2m6l7e13q3",
                  q: "What are the two advantages of the coach?",
                  options: [
                    "It is much cheaper and you can take a big bag for free",
                    "It is faster and it leaves near the flat",
                    "It is cheaper and it never gets stuck in traffic",
                  ],
                  answer: 0,
                  why: "«it is much cheaper, and you can take a big bag without paying extra». Lo de la estación lejos y el tráfico son justo lo contrario de ventajas.",
                },
                {
                  id: "ena2m6l7e13q4",
                  q: "Why does the writer mention the car park in Brighton?",
                  options: [
                    "To show that Ben's idea is not as cheap as it sounds",
                    "To explain where Ben usually leaves his car",
                    "To say that there is no station in Brighton",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Fíjate en la frase de antes: «He never mentions the car park». El texto lo menciona por él, y con el precio al lado.",
                },
                {
                  id: "ena2m6l7e13q5",
                  q: "What is different about Valeria this time?",
                  options: [
                    "She is not going to leave the decision to Amy",
                    "She is not going to travel with Amy",
                    "She is going to go by car with Ben",
                  ],
                  answer: 0,
                  inference: true,
                  why: "«She usually decides these things and Valeria usually agrees. But this time…». Ese «but this time» es toda la respuesta.",
                },
              ],
              itemIds: ["ena2m6weregoingtobrighton", "ena2m6areturnticket", "ena2m6thecoach", "ena2m6atrafficjam"],
              tip: "Es la Parte 4 del Reading tal cual: un texto seguido y preguntas en el orden del texto. Dos de las cinco no están escritas en ninguna línea — hay que unir dos frases. Ese es el salto del A2.",
            },
            {
              id: "ena2m6l7e12", type: "type", prompt: "Cierre de producción",
              question: "Voy a reservar una pensión y voy a llevar solo una maleta.",
              answers: [
                "I'm going to book a bed and breakfast and I'm going to take one suitcase.",
                "I'm going to book a bed and breakfast and I'm going to take only one suitcase.",
                "I'm going to book a bed and breakfast and take one suitcase.",
              ],
              hints: ["going to + verbo desnudo, dos veces", "I'm going to b… a bed and breakfast and I'm going to take one s…."],
              itemIds: ["ena2m6abedandbreakfast", "ena2m6suitcase", "ena2m6imgoingtobook"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m6-4",
            book: "There is a lot of traffic today.",
            real: "The traffic's terrible today.",
            meaning: "Hay un tráfico horrible hoy",
            when: "Con cualquiera, todos los días: es la queja nacional británica junto con el tiempo. Fíjate en que el nativo no dice «hay mucho», dice «el tráfico está fatal» — cambia la construcción entera. En el examen, «There's a lot of traffic» está perfecto y es más seguro.",
            register: "neutral",
            note: "El mismo giro sirve para el tiempo: «The weather's terrible». Es la forma corta de quejarse sin decir there is.",
            sound: "de TRÁ-fiks TE-ri-bol tu-DÉI",
            level: "a2",
            itemId: "ena2m6atrafficjam",
          },
        },
      ],
      resources: [
        { label: "National Rail — comprar billetes", url: "https://www.nationalrail.co.uk/", note: "Busca un tren de Londres a Brighton para el sábado que viene. No lo compres: lee la pantalla y apunta cinco palabras que reconozcas — single, return, platform, coach, off-peak." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — proponer un plan, aceptarlo y decir que no
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l8",
      phaseId: "ena2m6",
      title: "How about going on Friday?",
      subtitle: "Proponer sin mandar, aceptar con ganas y decir que no sin quedar mal",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar un plan entre dos",
          itemIds: ["ena2m6howaboutgoing", "ena2m6whydontwe", "ena2m6thatsoundsgreat", "ena2m6imafraidicant", "ena2m6letmecheckmydiary"],
        },
        {
          kind: "note",
          note: {
            title: "Tres maneras de proponer, y la que lleva -ing",
            body: "Del A1 traes <b>[[Let's go to the cinema!|¡Vamos al cine!]]</b> y <b>[[What about Saturday?|¿Qué tal el sábado?]]</b> Con eso ya propones. Hoy entran dos más, que es lo que usa un adulto para no sonar mandón:<br/><br/>· <b>[[How about going on Friday?|¿Y si vamos el viernes?]]</b> — la más suave de todas.<br/>· <b>[[Why don't we take the coach?|¿Por qué no cogemos el autocar?]]</b> — no es un reproche, es una propuesta. En inglés suena amable, no impaciente.<br/><br/><b>La regla que hay que memorizar hoy es una sola:</b> detrás de <b>how about</b> y de <b>what about</b>, el verbo va en <b>-ing</b>. <i>How about <b>going</b> on Friday? · What about <b>taking</b> the train?</i> Nunca con <i>to</i>: <i>How about to go</i> ❌ es de los calcos que más se ven, porque en español decimos «¿qué tal <i>ir</i> el viernes?», con infinitivo.<br/><br/>Truco para no fallar: <b>about es una preposición</b>, y en inglés detrás de una preposición el verbo siempre lleva -ing. Es la misma regla de <i>I'm interested in films</i> del módulo 3.<br/><br/><b>Y en «why don't we», el verbo va desnudo</b>, porque lo manda el <i>don't</i>: <i>Why don't we <b>take</b> the coach?</i> Es el mismo motor del do/does del A1.",
            table: [
              ["fórmula", "qué le sigue", "ejemplo"],
              ["How about…?", "verbo en -ing", "How about going on Friday?"],
              ["What about…?", "verbo en -ing", "What about taking the train?"],
              ["Why don't we…?", "verbo desnudo", "Why don't we take the coach?"],
              ["Let's…", "verbo desnudo", "Let's meet at the station."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Decir que sí, ganar tiempo y decir que no",
            body: "En el oral del examen te van a proponer cosas y hay que reaccionar. Tres casillas, y con una frase por casilla vas servido:<br/><br/><b>Que sí:</b> <b>[[That sounds great!|¡Me parece genial!]]</b> · <i>[[I'd love to!|¡Me encantaría!]]</i> (ya la traes del A1) · <i>Perfect!</i><br/><b>Ganar tiempo:</b> <b>[[Let me check my diary.|Déjame mirar la agenda.]]</b> Ojo: <i>diary</i> es la agenda, no el diario íntimo — ese es <i>a journal</i>.<br/><b>Que no:</b> <b>[[I'm afraid I can't.|Me temo que no puedo.]]</b> Y detrás, <b>siempre una razón</b>: <i>I'm working that day. · I'm going to Manchester.</i><br/><br/><b>Por qué la razón no es opcional.</b> En inglés un «no» pelado suena brusco de verdad, mucho más que en español. La estructura completa que espera un británico son tres piezas: <b>disculpa + no + razón + alternativa</b>.<br/><br/><i>I'm afraid I can't — I'm working on Friday. [[What about Saturday?|¿Qué tal el sábado?]]</i><br/><br/>Con esa frase se cierra cualquier negociación de plan, y es exactamente lo que puntúa en la Parte 2 del oral, donde a veces te toca a ti <b>iniciar</b> la situación en vez de responder.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l8e1", type: "mc", prompt: "Elige la propuesta correcta",
              question: "«¿Y si vamos el viernes?»",
              options: ["How about going on Friday?", "How about to go on Friday?", "How about we going on Friday?"],
              answer: 0,
              whyWrong: [null, "Detrás de about no puede ir to + verbo: about es preposición y pide -ing", "Sobra el «we»: la fórmula es how about + verbo en -ing, sin sujeto"],
              itemIds: ["ena2m6howaboutgoing"],
            },
            {
              id: "ena2m6l8e2", type: "bucket", prompt: "¿-ing o verbo desnudo?",
              categories: ["pide verbo en -ing", "pide verbo desnudo"],
              items: [
                { text: "How about…", bucket: 0 },
                { text: "Why don't we…", bucket: 1 },
                { text: "What about…", bucket: 0 },
                { text: "Let's…", bucket: 1 },
                { text: "I'm interested in…", bucket: 0 },
                { text: "I'm going to…", bucket: 1 },
              ],
              itemIds: ["ena2m6howaboutgoing", "ena2m6whydontwe", "enwhataboutsaturday", "enletsgo", "ena2m3iminterestedin"],
              tip: "Las de la izquierda son todas preposiciones (about, in). Detrás de preposición, -ing. Las de la derecha llevan un auxiliar o un imperativo, y esos piden el verbo limpio.",
            },
            {
              id: "ena2m6l8e3", type: "errorfix", prompt: "Corrige el calco del infinitivo",
              wrong: "How about to take the coach?",
              answers: ["How about taking the coach?"],
              why: "En español decimos «¿qué tal coger el autocar?», con infinitivo, y de ahí sale el «to». Pero about es una preposición, y en inglés detrás de una preposición el verbo va siempre en -ing: about taking, in learning, of going.",
              translation: "¿Y si cogemos el autocar?",
              itemIds: ["ena2m6howaboutgoing", "ena2m6thecoach"],
            },
            {
              id: "ena2m6l8e4", type: "transform", prompt: "Di lo mismo con otra fórmula",
              source: "Let's take the coach.",
              instruction: "Propónlo con «Why don't we…?»",
              answers: ["Why don't we take the coach?"],
              translation: "¿Por qué no cogemos el autocar?",
              hints: ["Detrás de don't, el verbo desnudo", "Why don't we t… the coach?"],
              itemIds: ["ena2m6whydontwe", "enletsgo"],
            },
            {
              id: "ena2m6l8e5", type: "transform", prompt: "Y ahora con la que lleva -ing",
              source: "Let's go on Friday.",
              instruction: "Propónlo con «How about…?»",
              answers: ["How about going on Friday?"],
              translation: "¿Y si vamos el viernes?",
              hints: ["Detrás de about, el verbo en -ing y sin sujeto", "How about g… on Friday?"],
              itemIds: ["ena2m6howaboutgoing"],
            },
            {
              id: "ena2m6l8e6", type: "match", prompt: "Empareja cada reacción con lo que hace",
              pairs: [
                { target: "That sounds great!", source: "aceptar con ganas" },
                { target: "Let me check my diary.", source: "ganar tiempo antes de contestar" },
                { target: "I'm afraid I can't.", source: "decir que no con educación" },
                { target: "What about Saturday?", source: "proponer una alternativa" },
              ],
              itemIds: ["ena2m6thatsoundsgreat", "ena2m6letmecheckmydiary", "ena2m6imafraidicant", "enwhataboutsaturday"],
            },
            {
              id: "ena2m6l8e7", type: "mc", prompt: "El «no» que no queda mal",
              question: "Amy te propone ir el viernes y tú trabajas. ¿Qué contestas?",
              options: [
                "I'm afraid I can't — I'm working on Friday. What about Saturday?",
                "No.",
                "I'm afraid I can't.",
              ],
              answer: 0,
              whyWrong: [null, "Un no pelado suena mucho más brusco en inglés que en español", "Va bien encaminado, pero sin razón ni alternativa se lee como un cierre de puerta"],
              itemIds: ["ena2m6imafraidicant", "enwhataboutsaturday"],
              tip: "Disculpa + no + razón + alternativa. Cuatro piezas, y las cuatro puntúan en la Parte 2 del oral.",
            },
            {
              id: "ena2m6l8e8", type: "order", prompt: "Ordena la conversación de Valeria y Amy",
              sentences: [
                "How about going to Brighton next weekend?",
                "That sounds great! Let me check my diary.",
                "I'm afraid I can't on Saturday — I'm working.",
                "Why don't we go on Sunday, then?",
                "Perfect. I'm going to book a bed and breakfast tonight.",
              ],
              translation: "—¿Y si vamos a Brighton el finde que viene? —¡Me parece genial! Déjame mirar la agenda. —El sábado no puedo, trabajo. —¿Y si vamos el domingo? —Perfecto. Reservo una pensión esta noche.",
              itemIds: ["ena2m6howaboutgoing", "ena2m6thatsoundsgreat", "ena2m6imafraidicant", "ena2m6whydontwe", "ena2m6abedandbreakfast"],
              tip: "Fíjate en el arco: propuesta → ganar tiempo → no con razón → alternativa → plan cerrado. Es el guion de cualquier negociación de plan, en inglés y en español.",
            },
            {
              id: "ena2m6l8e9", type: "cloze", prompt: "Completa la propuesta",
              text: "How about ___ (take) the coach? It's cheaper than the train.",
              answers: ["taking"],
              translation: "¿Y si cogemos el autocar? Es más barato que el tren.",
              hints: ["Detrás de about, -ing", "How about t… the coach?"],
              itemIds: ["ena2m6howaboutgoing", "ena2m4cheaperthan"],
            },
            {
              id: "ena2m6l8e10", type: "cloze", prompt: "Completa la negativa educada",
              text: "I'm ___ I can't — I'm going to Manchester that weekend.",
              answers: ["afraid"],
              translation: "Me temo que no puedo: ese finde me voy a Manchester.",
              hints: ["Literalmente sería «tengo miedo», pero aquí significa «me temo»", "I'm a… I can't."],
              itemIds: ["ena2m6imafraidicant", "ena2m6theyregoingtomove"],
            },
            {
              id: "ena2m6l8e11", type: "speak", prompt: "Dilo en voz alta — la negociación entera",
              text: "How about going on Friday? I'm afraid I can't — I'm working. What about Sunday?",
              phonetic: "jáu a-BÁUT GÓU-in on FRÁI-dei? áim a-FRÉID ái KAANT — áim UÉE-kin. uót a-BÁUT SAN-dei",
              translation: "¿Y si vamos el viernes? Me temo que no puedo, trabajo. ¿Qué tal el domingo?",
              itemIds: ["ena2m6howaboutgoing", "ena2m6imafraidicant", "enwhataboutsaturday"],
              tip: "La entonación sube al final de las dos preguntas y baja en la excusa. Aunque no la trabajemos con el corrector, marcarla se nota.",
            },
            {
              id: "ena2m6l8e12", type: "type", prompt: "Cierre de producción",
              question: "¿Y si vamos el domingo? Me parece genial: reservo el hotel esta noche.",
              answers: [
                "How about going on Sunday? That sounds great: I'm going to book the hotel tonight.",
                "How about going on Sunday? That sounds great. I'm going to book the hotel tonight.",
              ],
              hints: ["about + -ing · la respuesta con going to", "How about g… on Sunday? That s… great."],
              itemIds: ["ena2m6howaboutgoing", "ena2m6thatsoundsgreat", "ena2m6imgoingtobook"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Making arrangements", url: "https://learnenglish.britishcouncil.org/general-english/audio-zone", note: "Busca cualquier audio de «making plans» y quédate con una sola cosa: cuántas veces alguien dice «no» sin dar una razón detrás. Vas a contar cero." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — el plan entero: espiral del módulo y el minuto del oral
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m6l9",
      phaseId: "ena2m6",
      title: "Your plan, in one minute",
      subtitle: "Todo el módulo junto — y tu próximo viaje contado de principio a fin",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar y despedir",
          itemIds: ["ena2m6haveagoodtrip", "ena2m6icantwait", "ena2m6nextweekend", "ena2m1howaboutyou"],
        },
        {
          kind: "note",
          note: {
            title: "Cómo se rellena un minuto de planes: cuatro bloques",
            body: "El minuto del oral con el que ya trabajaste en el módulo 1 sirve igual para el futuro, solo que los bloques cambian. Con estos cuatro no te quedas callada:<br/><br/><b>1. Qué y cuándo.</b> Going to o continuo, con fecha: <i>Next weekend I'm going to Brighton with Amy.</i><br/><b>2. Cómo y dónde.</b> Transporte y alojamiento: <i>We're getting the train and we're staying in a bed and breakfast.</i><br/><b>3. Qué vas a hacer al llegar.</b> Aquí entra la subordinada: <i>When we arrive, we're going to walk along the beach.</i><br/><b>4. Qué esperas.</b> Una valoración: <i>[[I can't wait!|¡Qué ganas!]] It's going to be great.</i><br/><br/>Y el remate de siempre: <b>[[How about you?|¿Y tú?]]</b><br/><br/><b>Las tres cosas que el corrector va a mirar</b>, y las tres son de este módulo: que haya <b>going to o continuo</b> con fecha (no presente simple), que la subordinada de tiempo <b>no lleve futuro dentro</b>, y que las preposiciones de camino vayan <b>sin of</b>. Si eso está limpio, la nota está.",
            table: [
              ["bloque", "qué dices", "ejemplo"],
              ["1. qué y cuándo", "going to o continuo + fecha", "Next weekend I'm going to Brighton."],
              ["2. cómo y dónde", "transporte y alojamiento", "We're getting the train."],
              ["3. al llegar", "when / as soon as + presente", "When we arrive, we're going to eat."],
              ["4. qué esperas", "valoración", "I can't wait!"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m6l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya es tuyo",
              pairs: [
                { target: "I'm going to book a hotel.", source: "Voy a reservar un hotel" },
                { target: "We're meeting Amy at six.", source: "Hemos quedado con Amy a las seis" },
                { target: "When I get there…", source: "Cuando llegue…" },
                { target: "across the road", source: "cruzando la carretera" },
                { target: "a return ticket", source: "un billete de ida y vuelta" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m6imgoingtobook", "ena2m6weremeetingamyatsix", "ena2m6whenigetthere", "ena2m6acrosstheroad", "ena2m6areturnticket"],
              tip: "El cronómetro solo premia. Lo que se te atasque aquí volverá en el repaso; lo que salga solo, ya está dentro.",
            },
            {
              id: "ena2m6l9e2", type: "bucket", prompt: "Espiral de la trampa del A1: ¿va a un sitio o va a hacer algo?",
              categories: ["movimiento: va a un SITIO", "intención: va a HACER algo"],
              items: [
                { text: "I'm going to the station.", bucket: 0 },
                { text: "I'm going to check the booking.", bucket: 1 },
                { text: "She's going to the beach.", bucket: 0 },
                { text: "She's going to miss the train.", bucket: 1 },
                { text: "We're going home.", bucket: 0 },
                { text: "We're going to walk along the beach.", bucket: 1 },
              ],
              itemIds: ["ena2m6thebooking", "ena2m6alongthebeach", "enimgoinghome", "ena2m1missedthebus"],
              tip: "Cuatro lecciones después, la regla sigue siendo la misma y ocupa cinco palabras: mira lo que va detrás de to.",
            },
            {
              id: "ena2m6l9e3", type: "gapbank", prompt: "El sábado de Valeria, de la cama a la playa",
              text: "On Saturday Valeria ___ at seven, because the train ___ at ten. She's going to check the booking before she ___. When she gets to Brighton, she's going to walk along the beach.",
              answers: ["is getting up", "leaves", "goes out"],
              bank: ["is getting up", "leaves", "goes out", "got up", "will leave", "is going out"],
              translation: "El sábado Valeria se levanta a las siete, porque el tren sale a las diez. Va a mirar la reserva antes de salir. Cuando llegue a Brighton, va a pasear por la playa.",
              itemIds: ["ena2m6thetrainleavesatten", "ena2m6thebooking", "ena2m6alongthebeach"],
              tip: "Tres formas distintas en tres huecos: su plan va en continuo, el horario del tren en presente simple y la subordinada de tiempo, en presente a secas. El «will leave» del banco está ahí a propósito.",
            },
            {
              id: "ena2m6l9e4", type: "errorfix", prompt: "Corrige el error nº 1 del módulo",
              wrong: "When I will arrive in Brighton, I'm going to text you.",
              answers: ["When I arrive in Brighton, I'm going to text you."],
              why: "El español pone subjuntivo —«cuando llegue»— y al traducir sale un futuro. El inglés ya ha dicho que esto es futuro en la otra mitad (I'm going to text you) y no lo repite: detrás de when, before, after y as soon as va presente.",
              translation: "Cuando llegue a Brighton, te escribo.",
              itemIds: ["ena2m6whenigetthere", "ena2m6imgoingtotextyou"],
            },
            {
              id: "ena2m6l9e5", type: "errorfix", prompt: "Corrige el que suena perfecto en español",
              wrong: "I go to Brighton tomorrow with Amy.",
              answers: ["I'm going to Brighton tomorrow with Amy."],
              why: "«Mañana voy a Brighton» es impecable en español, y por eso este error no lo caza nadie. En inglés el presente simple solo significa rutina: «I go to Brighton» diría que vas siempre. Con una fecha futura, continuo.",
              translation: "Mañana me voy a Brighton con Amy.",
              itemIds: ["ena2m6weregoingtobrighton", "enseeyoutomorrow"],
            },
            {
              id: "ena2m6l9e6", type: "mc", prompt: "Espiral: la frase que abría el módulo",
              question: "Ben dice: “I'm going to work.” ¿Qué está diciendo?",
              options: [
                "Que va al trabajo (está en camino)",
                "Que va a ponerse a trabajar más",
                "Que trabaja todos los días",
              ],
              answer: 0,
              whyWrong: [null, "Para eso haría falta algo más detrás: I'm going to work harder / I'm going to work late", "Eso sería «I work every day»"],
              itemIds: ["enimgoingtowork", "ena2m6imgoingtoworkharder"],
              tip: "Detrás de to no hay más que «work», y punto: es un destino. En cuanto aparece una palabra más, la frase cambia de bando.",
            },
            {
              id: "ena2m6l9e7", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "El finde que viene vamos a Brighton. Cuando lleguemos, vamos a buscar el hotel.",
              answers: [
                "Next weekend we're going to Brighton. When we arrive, we're going to find the hotel.",
                "Next weekend we're going to Brighton. When we get there, we're going to find the hotel.",
                "We're going to Brighton next weekend. When we arrive, we're going to find the hotel.",
              ],
              hint: "«el finde que viene» va sin the y sin on",
              itemIds: ["ena2m6nextweekend", "ena2m6weregoingtobrighton", "ena2m6afterwearrive"],
            },
            {
              id: "ena2m6l9e8", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "We're leaving on Friday, but I'm afraid I can't get a return ticket for Sunday.",
              answers: [
                "Nos vamos el viernes, pero me temo que no puedo conseguir un billete de ida y vuelta para el domingo.",
                "Salimos el viernes, pero me temo que no consigo un billete de ida y vuelta para el domingo.",
              ],
              itemIds: ["ena2m6imleavingonfriday", "ena2m6imafraidicant", "ena2m6areturnticket"],
              tip: "«We're leaving on Friday» no es «nos estamos yendo»: el «on Friday» lo convierte en plan. Es la lección 3 leída del revés.",
            },
            {
              id: "ena2m6l9e9", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "We're going to Brighton next weekend.",
              forbid: ["going", "Brighton", "weekend"],
              answers: [
                "We're travelling to the coast next Saturday.",
                "We're spending Saturday and Sunday by the sea.",
              ],
              translation: "El finde que viene vamos a Brighton.",
              itemIds: ["ena2m6weregoingtobrighton", "ena2m6nextweekend"],
              tip: "Rodear una palabra que no te sale es la habilidad que más te va a salvar en el oral. Y fíjate en que las dos salidas siguen siendo continuo de futuro.",
            },
            {
              id: "ena2m6l9e10", type: "audiomc", prompt: "El plan de Amy, con cuaderno — pregunta primero",
              audio: "Right, so we're leaving on Saturday at ten from platform four. We're not going to take the car, because the traffic is terrible at the weekend. When we get to Brighton, we're going to leave the luggage at the bed and breakfast, and then we're going to walk along the beach.",
              question: "¿Qué van a hacer nada más llegar a Brighton?",
              options: [
                "Dejar el equipaje en la pensión",
                "Ir directas a la playa",
                "Coger un taxi hasta el hotel",
              ],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "La playa viene después: el audio dice «and then»", "El taxi no suena; lo que se descarta es el coche"],
              itemIds: ["ena2m6luggage", "ena2m6abedandbreakfast", "ena2m6alongthebeach", "ena2m6platformfour"],
              tip: "Cuando un audio encadena planes, el orden lo marcan «when», «and then», «after that». Apunta esas palabras y el orden se te queda solo.",
            },
            {
              id: "ena2m6l9e11", type: "write", prompt: "Cuéntale el plan a Emma — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te escribe: «I hear you're going away! Tell me about it.» Contéstale por email con el plan cerrado.",
              bullets: [
                "Di qué vas a hacer, con going to",
                "Di una cita ya cerrada en continuo, con día u hora",
                "Di qué vas a hacer al llegar, con when / before / after",
              ],
              checks: [
                { re: "\\bgoing to (walk|book|take|visit|see|go|meet|stay|get|have|try|find|eat|swim)\\b", label: "un plan con going to + verbo" },
                { re: "\\b(i'm|i am|we're|we are)\\s+\\w+ing\\b[^.]*\\b(on|at|next|tonight|tomorrow)\\b", label: "una cita en continuo con día u hora" },
                { re: "\\b(when|before|after|as soon as) (i|we|you|they|he|she|it)\\b", label: "una subordinada de tiempo" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi Emma! We're going to Brighton next weekend. We're leaving on Saturday at ten and we're staying in a small bed and breakfast. When we arrive, we're going to walk along the beach, because Amy loves the sea. Valeria",
              itemIds: ["ena2m6weregoingtobrighton", "ena2m6imleavingonfriday", "ena2m6afterwearrive", "ena2m6abedandbreakfast", "ena2m6alongthebeach"],
              tip: "El corrector busca primero los tres contenidos y solo después la gramática. Antes de darle a corregir, revisa una sola cosa: que ningún «when», «before» o «after» lleve un futuro detrás.",
            },
            {
              id: "ena2m6l9e12", type: "monologue", prompt: "El minuto de verdad: cuenta TU próximo plan",
              topic: "Tu próximo viaje, escapada o fin de semana fuera",
              slides: [
                { title: "1. Qué y cuándo", hint: "Going to o continuo, con fecha: Next weekend I'm going to… / In August I'm going to…" },
                { title: "2. Cómo y dónde", hint: "Transporte y alojamiento: I'm going to take the train / the coach. I'm staying in a hotel / with a friend." },
                { title: "3. Qué vas a hacer al llegar", hint: "Con subordinada de tiempo, y sin futuro dentro: When I arrive, I'm going to… / As soon as I get there, I'm going to…" },
                { title: "4. Qué esperas", hint: "Una valoración y el remate: It's going to be great. I can't wait! How about you?" },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He usado al menos tres «going to» o continuos de futuro",
                "He dicho una fecha o un día concreto",
                "He usado una subordinada con when, before, after o as soon as",
                "Dentro de esa subordinada NO he puesto ningún futuro",
                "He cerrado con una valoración y con «How about you?»",
              ],
              model: "Next month I'm going to visit my sister in Bogotá. I'm leaving on the fourteenth and I'm coming back two weeks later. I'm not going to take a lot of luggage, because it's expensive: one suitcase and a small bag. I'm going to get the plane at seven in the morning, so I'm going to sleep at the airport hotel the night before. When I arrive, my sister is going to meet me at the airport and we're going to have breakfast together. After that, I'm going to sleep for ten hours! It's going to be great. I can't wait. How about you?",
              itemIds: ["ena2m6imgoingtogo", "ena2m6luggage", "ena2m6suitcase", "ena2m6whenigetthere", "ena2m6icantwait"],
              tip: "Grábate las dos veces y cuenta las casillas, no lo bonito que ha sonado. La segunda pasada siempre sale más suelta: esa es la que se parece al examen.",
            },
            {
              id: "ena2m6l9e13", type: "type", prompt: "Cierre del módulo — el plan entero en una frase",
              question: "El finde que viene vamos a Brighton y, cuando lleguemos, vamos a pasear por la playa.",
              answers: [
                "Next weekend we're going to Brighton and, when we arrive, we're going to walk along the beach.",
                "Next weekend we're going to Brighton and when we arrive we're going to walk along the beach.",
                "Next weekend we're going to Brighton and, when we get there, we're going to walk along the beach.",
              ],
              hints: ["Continuo de futuro + subordinada en presente + going to", "Next weekend we're g… to Brighton and, when we a…, we're going to walk a… the beach."],
              itemIds: ["ena2m6nextweekend", "ena2m6weregoingtobrighton", "ena2m6afterwearrive", "ena2m6alongthebeach"],
              tip: "Ahí está el módulo entero: el futuro decidido, la subordinada sin futuro dentro y la preposición de camino sin «of». Con esto puedes contar cualquier plan. Lo que aún no puedes es prometer ni suponer — eso es «will», y llega en el módulo 11.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m6-5",
            book: "Have a good trip!",
            real: "Safe travels!",
            meaning: "¡Buen viaje!",
            when: "Al despedir a alguien que se va de viaje, con amigos o con compañeros de trabajo. Se ha vuelto lo normal en los últimos años, sobre todo por escrito, en un mensaje. Para una postal o un email de examen, «Have a good trip!» sigue siendo perfecto y nunca queda raro.",
            register: "neutral",
            note: "Ojo con «Good trip!» a secas: no se dice. O va con Have a…, o se usa Safe travels.",
            sound: "séif TRÁ-vels̬",
            level: "a2",
            itemId: "ena2m6haveagoodtrip",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca el vídeo de «making plans» y ensaya tu minuto encima: 30 segundos de papel, uno de habla y una segunda pasada. Siempre dos veces." },
        { label: "Visit Brighton — qué hacer", url: "https://www.visitbrighton.com/", note: "Diez minutos leyendo una web real de turismo. No traduzcas: subraya solo los verbos que sabes usar con going to. Vas a encontrar más de los que crees." },
      ],
    },
  ],
};
