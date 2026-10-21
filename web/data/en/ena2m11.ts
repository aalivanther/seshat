import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 11 — If it rains, we'll stay in: el tiempo que hará y el
// plan B. Sigue el listón del piloto `ena2m1`.
//
// ESTO ES UN MÓDULO DE FRONTERA, y se dice con todas las letras al alumno en la
// L1, se repite en la L6 y se cierra en la L9. `will` / `won't`, `might` / `may`
// y la PRIMERA CONDICIONAL están en la columna B1 del syllabus de LanguageCert
// (LC-LRW §2.7, verificado en el handbook), aunque Cambridge los evalúe en A2.
// Aquí se PRESENTAN, se RECONOCEN y se PRODUCEN GUIADOS — nunca libres— y NO
// ENTRAN EN EL SIMULACRO (PLAN-EN-A2 §2.1.b y §5.1, riesgo 2). Es el mismo
// patrón de `ena1m11` con was/were, de las píldoras de `ena2m3` y del present
// perfect de `ena2m10`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): will / won't · might / may · primera
// condicional · los adverbios de probabilidad possibly, probably, perhaps —
// estos tres SÍ están en el núcleo evaluable del A2 (LC-LRW §2.7, «adverbios
// modales»), y son la salida honesta para quien no quiera arriesgarse con la
// frontera. Campo léxico: el parte meteorológico, el clima y los planes con
// condición.
//
// LO QUE VIENE CERRADO DE ATRÁS Y NO SE REABRE:
//   · `ena2m6` — `be going to` y el presente continuo de futuro han sido el
//     ÚNICO futuro del alumno hasta hoy. Este módulo trae `will` y su trabajo
//     número uno es decir CUÁNDO SE USA CADA UNO (L1 y L2), no repartirlos a
//     ojo: decidido de antemano (going to) frente a decidido ahora mismo
//     (will); predicción CON PRUEBA delante (going to) frente a predicción a
//     secas, de cabeza (will). El reparto se enseña en una tabla y se practica
//     con `bucket`, que es el ejercicio que discrimina.
//   · `ena2m6` L4 — las subordinadas de tiempo SIN futuro dentro (`when I get
//     there`, `before we leave`) son la PERCHA EXACTA de la primera condicional:
//     `If it rains` es la misma mecánica con otra conjunción. En la L6 solo hay
//     que decirlo, y se dice; no se re-explica la regla desde cero.
//   · `ena2m6` L8 — `How about + -ing` y `Why don't we…?` quedaron como
//     SUGERENCIA entre iguales. Aquí se USAN para proponer el plan B y no se
//     redefinen. El CONSEJO es de `ena2m8` y no se toca.
//   · `ena2m7` L1-L3 — LA REGLA ÚNICA DE LOS MODALES: sin `do`, sin `-s` y sin
//     `to`. `will`, `won't`, `might` y `may` son modales, así que entran en esa
//     regla ya instalada y no traen gramática nueva: lo único nuevo es PARA QUÉ
//     sirven. Se referencia en la L1 y en la L4, no se re-enseña.
//   · el pasado entero de `ena2m1` y `ena2m2`; la posición del adverbio de
//     `ena2m3l6` (que es justo la percha del `probably` de la L7); los
//     determinantes de `ena2m4` y sus grados de temperatura; los contables y la
//     cortesía de `ena2m5`; el present perfect de frontera de `ena2m10`.
//
// LOS TRES CONTRASTES CON EL ESPAÑOL QUE ESTE MÓDULO TIENE QUE RESOLVER,
// nombrados por su nombre (PLAN-EN-A2 §5.2 nº 13 y §9):
//
//   (a) *«If it will rain»* (L6). El español pone SUBJUNTIVO en la mitad de la
//       condición —«si llueve», «cuando llueva»— y el aprendiz, que no tiene
//       subjuntivo inglés donde meterlo, lo traduce por futuro. Es exactamente
//       la trampa de las temporales del m6 con otra conjunción, y por eso la
//       regla que se le da es LA MISMA, palabra por palabra: UNA FRASE, UNA
//       MARCA DE FUTURO, y va en la principal. La mitad del `if` nunca lleva
//       will.
//
//   (b) *«If I would have money»* (L6). El «si tendría» que además existe de
//       verdad en el norte peninsular: o sea, interferencia DOBLE — la del
//       español estándar (que pide imperfecto de subjuntivo) y la de una
//       variedad del propio alumno. El segundo condicional NO es objetivo de
//       este módulo, pero el error aparece igual dentro de la primera
//       condicional, así que se nombra y se corrige AHÍ, sin abrir el segundo
//       condicional (que es B1 entero).
//
//   (c) LA PROBABILIDAD NO ES UN TIEMPO VERBAL (L4 y L7). El español la marca
//       casi siempre en el VERBO —«puede que llueva», «lloverá»— y el inglés la
//       marca con una PIEZA APARTE: un modal (`might`, `may`) o un adverbio
//       (`probably`, `possibly`, `perhaps`). De ahí los dos errores gemelos:
//       *«Maybe I go»* (usar el presente porque el adverbio ya lleva la duda) y
//       *«It will probably to rain»* / *«It won't probably rain»* (colocar el
//       adverbio donde lo pondría el español). La posición se apoya en la regla
//       de `ena2m3l6`, que ya está enseñada: el adverbio va DETRÁS del primer
//       auxiliar y DELANTE del verbo, y en negativa se adelanta al `won't`.
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: la contracción `'ll`
// y `won't`, con la /w/ de `won't` frente a `want`. Es el par mínimo más caro
// del nivel: «I won't» y «I want» separan un no rotundo de un sí, y el
// hispanohablante los pronuncia igual porque el español no distingue esas dos
// vocales. Se añade la `'ll`, que no es una sílaba y que el alumno tiende a
// convertir en «uil» separada, y el `probably` real de dos sílabas.
//
// ELENCO: solo lo que ya está en CANON.md — Valeria, Amy, Ben (conductor de
// autobús), Sam (barista), Mr Patel (tendero), Nora (la vecina mayor), Emma
// (Manchester) y Clara (la hermana, en Bogotá). El módulo NO toca CANON.md: no
// estrena secundarios.
//
// LO QUE HEREDA `ena2m12`, el módulo de examen: las tres fórmulas de plan B
// listas para reciclarse sin explicación —«If it rains, we'll…», «We might…»,
// «It'll probably…»— más «I hope so / I hope not» y «I don't think it will…».
// Con ellas el Writing de plan B y la Parte 2 del oral se montan solos.
//
// RECICLADO sin redefinir ids (una palabra, una tarjeta) — los que este módulo
// REFERENCIA de verdad, no una lista de intenciones:
// del A1 — enwhatstheweatherlike, enitsraining, enitssunny, enitshot, enitscold,
// enitswindy, enitssnowing, encold, enspring, ensummer, enautumn, enwinter,
// enmyfavouriteseason, enjacket, enpicnic, enpark, enathome, enhome, enwindow,
// enletsgo, enletsgotothecinema, endoyouwanttocome, enwhataboutsaturday,
// enanothertime (el «Maybe another time» que ya traía maybe hecho chunk),
// enimbusy, enseeyoutomorrow, enatweekend, endontworry, enidontknow,
// enseeyouthere, engreatidea, enwatchafilm, entooexpensive, enbus, entrain;
// de `ena2m1` — ena2m1itrained, ena2m1howaboutyou, ena2m1terrible, ena2m1lastweek;
// de `ena2m2` — ena2m2soiwalked, ena2m2luckily, ena2m2unfortunately,
// ena2m2whatashame;
// de `ena2m3` — ena2m3often, ena2m3heoftengoestothecinema (la posición del
// adverbio), ena2m3itwasrainingwhenileft;
// de `ena2m4` — ena2m4itstwentydegrees, ena2m4thirtydegrees, ena2m4worsethanlastyear;
// de `ena2m5` — ena2m5couldihavethemenu (la cortesía que convive con «I'll have…»);
// de `ena2m6` — ena2m6itsgoingtorain (la predicción CON prueba, que es la mitad
// del contraste de la L2), ena2m6clouds, ena2m6whenigetthere, ena2m6beforeweleave,
// ena2m6assoonas, ena2m6howaboutgoing, ena2m6whydontwe, ena2m6thatsoundsgreat,
// ena2m6imafraidicant, ena2m6nextweekend, ena2m6imgoingtobook, ena2m6icantwait,
// ena2m6thecoach, ena2m6atrafficjam, ena2m6haveagoodtrip;
// de `ena2m7` — ena2m7mayiaskaquestion (el `may` de PERMISO, que hoy se separa
// del `may` de posibilidad), ena2m7itsuptoyou;
// de `ena2m10` — ena2m10recently, ena2m10notyet.
//
// TODOS los ids nuevos llevan el prefijo "ena2m11": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m11: Record<string, VocabItem> = {
  // ── ena2m11l1 — will y won't: la decisión de ahora y la predicción a secas ──
  ena2m11illhelpyou: {
    id: "ena2m11illhelpyou", target: "I'll help you.",
    source: "Te ayudo. / Te echo una mano. — lo decides AHORA, al oír el problema",
    sound: "áil JELP yu",
    gram: { trap: "I will to help you.", same: ["Let me help you."] },
  },
  ena2m11itwillrain: {
    id: "ena2m11itwillrain", target: "It will rain tomorrow.",
    source: "Mañana lloverá. — lo dices de cabeza, sin pruebas delante",
    sound: "it uil RÉIN ta-MO-rou",
    gram: { trap: "It will rains tomorrow.", same: ["I think it'll rain tomorrow."] },
  },
  ena2m11itwontrain: {
    id: "ena2m11itwontrain", target: "It won't rain tonight.",
    source: "Esta noche no lloverá. — won't es la negativa de will, entera",
    sound: "it UÓUNT réin tu-NÁIT",
    gram: { trap: "It doesn't will rain tonight.", same: ["It isn't going to rain tonight."] },
  },
  ena2m11willitbecold: {
    id: "ena2m11willitbecold", target: "Will it be cold?",
    source: "¿Hará frío?",
    sound: "uil it bi KÓULD",
    gram: { trap: "Does it will be cold?", same: ["Is it going to be cold?"] },
  },
  ena2m11yesitwill: {
    id: "ena2m11yesitwill", target: "Yes, it will. / No, it won't.",
    source: "Sí. / No. — la respuesta corta devuelve el will, como siempre",
    sound: "yes it UÍL / nóu it UÓUNT",
  },
  ena2m11wellbefine: {
    id: "ena2m11wellbefine", target: "We'll be fine.",
    source: "No pasa nada. / Saldrá bien.",
    sound: "uíil bi FÁIN",
    gram: { trap: "We'll fine." },
  },

  // ── ena2m11l2 — will frente a going to ──
  ena2m11ithinkitllrain: {
    id: "ena2m11ithinkitllrain", target: "I think it'll rain.",
    source: "Creo que va a llover. — una opinión tuya, sin nubes delante",
    sound: "ái zink Í-tol RÉIN",
    gram: { trap: "I think that will rain.", same: ["It'll probably rain."] },
  },
  ena2m11idontthinkitwill: {
    id: "ena2m11idontthinkitwill", target: "I don't think it will rain.",
    source: "Creo que no va a llover. — el inglés niega el «creo», no el «llover»",
    sound: "ái dóunt zink it uil RÉIN",
    gram: { same: ["I don't think it's going to rain."] },
  },
  ena2m11illhaveacoffee: {
    id: "ena2m11illhaveacoffee", target: "I'll have a coffee, please.",
    source: "Un café, por favor. — lo decides ahí, mirando la carta",
    sound: "áil jav a KO-fi plíis̬",
    gram: { trap: "I'm going to have a coffee, please.", same: ["Could I have a coffee, please?"] },
  },
  ena2m11illcallyoulater: {
    id: "ena2m11illcallyoulater", target: "I'll call you later.",
    source: "Te llamo luego. — una promesa, y las promesas van con will",
    sound: "áil KÓOL yu LÉI-ta",
    gram: { trap: "I call you later." },
  },
  ena2m11imsureitllbefine: {
    id: "ena2m11imsureitllbefine", target: "I'm sure it'll be fine.",
    source: "Seguro que sale bien.",
    sound: "áim SHÓO Í-tol bi FÁIN",
    gram: { same: ["Don't worry — it'll be fine."] },
  },

  // ── ena2m11l3 — el parte meteorológico ──
  ena2m11theweatherforecast: {
    id: "ena2m11theweatherforecast", target: "the weather forecast",
    source: "el parte meteorológico, la previsión del tiempo",
    sound: "de UÉ-da FÓO-kaast",
  },
  ena2m11showers: {
    id: "ena2m11showers", target: "showers",
    source: "chubascos — lluvia que va y viene; la misma palabra que «ducha»",
    sound: "SHÁU-as̬",
    gram: { same: ["rain now and then"] },
  },
  ena2m11itllbecloudy: {
    id: "ena2m11itllbecloudy", target: "It'll be cloudy in the morning.",
    source: "Por la mañana estará nublado.",
    sound: "Í-tol bi KLÁU-di in de MÓO-ning",
    gram: { trap: "It'll be cloudy at the morning." },
  },
  ena2m11chilly: {
    id: "ena2m11chilly", target: "chilly",
    source: "fresquito, destemplado — menos que cold, pero se nota",
    sound: "CHÍ-li",
  },
  ena2m11freezing: {
    id: "ena2m11freezing", target: "It's freezing!",
    source: "¡Se hiela uno! — el tope de la escala del frío",
    sound: "its FRÍI-s̬ing",
    gram: { same: ["It's really cold!"] },
  },
  ena2m11anumbrella: {
    id: "ena2m11anumbrella", target: "an umbrella",
    source: "un paraguas — el golpe va en BRE, no en la u",
    sound: "an am-BRE-la",
    gram: { trap: "a umbrella" },
  },
  ena2m11sunnyspells: {
    id: "ena2m11sunnyspells", target: "sunny spells",
    source: "claros, ratos de sol — así lo dice el parte de verdad",
    sound: "SÁ-ni SPELS̬",
  },

  // ── ena2m11l4 — might y may: la probabilidad no es un tiempo verbal ──
  ena2m11itmightrain: {
    id: "ena2m11itmightrain", target: "It might rain.",
    source: "A lo mejor llueve. / Puede que llueva.",
    sound: "it máit RÉIN",
    gram: { trap: "It might to rain.", same: ["It may rain."] },
  },
  ena2m11wemightgo: {
    id: "ena2m11wemightgo", target: "We might go to the park.",
    source: "Igual vamos al parque. — la duda va en might, no en el verbo",
    sound: "ui máit góu tu de PAAK",
    gram: { trap: "Maybe we go to the park.", same: ["Maybe we'll go to the park."] },
  },
  ena2m11imightnotcome: {
    id: "ena2m11imightnotcome", target: "I might not come.",
    source: "Puede que no vaya. — el not va detrás de might, y no hay contracción",
    sound: "ái máit not KAM",
    gram: { trap: "I don't might come.", same: ["I'm not sure I can come."] },
  },
  ena2m11itmaybecold: {
    id: "ena2m11itmaybecold", target: "It may be cold later.",
    source: "Puede que haga frío luego. — may es el hermano formal de might",
    sound: "it méi bi KÓULD LÉI-ta",
    gram: { trap: "It may is cold later.", same: ["It might be cold later."] },
  },
  ena2m11itdependsontheweather: {
    id: "ena2m11itdependsontheweather", target: "It depends on the weather.",
    source: "Depende del tiempo.",
    sound: "it di-PENDS̬ on de UÉ-da",
    gram: { rektion: { prep: "on", stem: "depend" }, trap: "It depends of the weather." },
  },

  // ── ena2m11l5 — la clínica: 'll, won't y el probably de verdad ──
  ena2m11llsound: {
    id: "ena2m11llsound", target: "I will → I'll · we will → we'll",
    source: "la 'll NO es una sílaba: se pega al pronombre y lo alarga",
    sound: "áil · uíil",
  },
  ena2m11wontwant: {
    id: "ena2m11wontwant", target: "I won't. / I want.",
    source: "won't lleva óu larga y want lleva o corta — en esa vocal está la diferencia entre un no rotundo y un quiero",
    sound: "ái UÓUNT / ái UÓNT",
  },
  ena2m11itllbe: {
    id: "ena2m11itllbe", target: "it'll be",
    source: "«it will be» a velocidad normal es una sola pieza: í-tol-bi",
    sound: "Í-tol bi",
  },
  ena2m11probablysound: {
    id: "ena2m11probablysound", target: "probably",
    source: "tres sílabas en el papel y dos en la boca: PRO-bli",
    sound: "PRO-ba-bli → PRO-bli",
  },

  // ── ena2m11l6 — la primera condicional ──
  ena2m11ifitrains: {
    id: "ena2m11ifitrains", target: "If it rains, we'll stay in.",
    source: "Si llueve, nos quedamos en casa.",
    sound: "if it RÉINS̬, uíil stéi IN",
    gram: { trap: "If it will rain, we'll stay in.", same: ["We'll stay in if it rains."] },
  },
  ena2m11ifitsnice: {
    id: "ena2m11ifitsnice", target: "If it's nice, we'll have a picnic.",
    source: "Si hace bueno, hacemos un picnic. — «hace bueno» es it's nice",
    sound: "if its NÁIS, uíil jav a PIK-nik",
    gram: { trap: "If it will be nice, we'll have a picnic." },
  },
  ena2m11whatwillyoudoif: {
    id: "ena2m11whatwillyoudoif", target: "What will you do if it rains?",
    source: "¿Qué harás si llueve?",
    sound: "uót uil yu DÚU if it RÉINS̬",
    gram: { trap: "What will you do if it will rain?" },
  },
  ena2m11ifihavetime: {
    id: "ena2m11ifihavetime", target: "If I have time, I'll call you.",
    source: "Si tengo tiempo, te llamo.",
    sound: "if ái jav TÁIM, áil KÓOL yu",
    gram: { trap: "If I would have time, I'll call you.", same: ["I'll call you if I have time."] },
  },
  ena2m11ifyoudonttakeacoat: {
    id: "ena2m11ifyoudonttakeacoat", target: "If you don't take a coat, you'll be cold.",
    source: "Si no coges abrigo, vas a pasar frío.",
    sound: "if yu dóunt téik a KÓUT, yul bi KÓULD",
    gram: { trap: "If you won't take a coat, you'll be cold." },
  },
  ena2m11wellseehowitgoes: {
    id: "ena2m11wellseehowitgoes", target: "We'll see how it goes.",
    source: "Ya veremos cómo va la cosa.",
    sound: "uíil síi jáu it GÓUS̬",
  },

  // ── ena2m11l7 — probably, possibly, perhaps: dónde se ponen ──
  ena2m11itllprobablyrain: {
    id: "ena2m11itllprobablyrain", target: "It'll probably rain.",
    source: "Seguramente llueva. — probably va DETRÁS de will y DELANTE del verbo",
    sound: "Í-tol PRO-bli RÉIN",
    gram: { trap: "It will probably to rain.", same: ["I think it'll rain."] },
  },
  ena2m11itprobablywont: {
    id: "ena2m11itprobablywont", target: "It probably won't rain.",
    source: "Seguramente no llueva. — en negativa, probably se adelanta al won't",
    sound: "it PRO-bli UÓUNT réin",
    gram: { trap: "It won't probably rain." },
  },
  ena2m11possibly: {
    id: "ena2m11possibly", target: "possibly",
    source: "posiblemente — el escalón más bajo: menos seguro que probably",
    sound: "PO-si-bli",
  },
  ena2m11perhapswellgo: {
    id: "ena2m11perhapswellgo", target: "Perhaps we'll go on Sunday.",
    source: "Quizá vayamos el domingo. — perhaps abre la frase y es un pelín más formal",
    sound: "pa-JAPS uíil góu on SÁN-dei",
    gram: { same: ["Maybe we'll go on Sunday."] },
  },
  ena2m11imnotsure: {
    id: "ena2m11imnotsure", target: "I'm not sure.",
    source: "No estoy seguro. / No lo sé todavía.",
    sound: "áim not SHÓO",
    gram: { trap: "I'm not sure it." },
  },

  // ── ena2m11l8 — el plan B: avisar, esperar y salir del paso ──
  ena2m11takeanumbrella: {
    id: "ena2m11takeanumbrella", target: "Take an umbrella, just in case.",
    source: "Coge un paraguas, por si acaso.",
    sound: "téik an am-BRE-la, dchast in KÉIS",
    gram: { same: ["Take an umbrella — you never know."] },
  },
  ena2m11ihopeitdoesntrain: {
    id: "ena2m11ihopeitdoesntrain", target: "I hope it doesn't rain.",
    source: "Espero que no llueva. — tras hope va presente, aunque hables de mañana",
    sound: "ái JÓUP it DA-s̬ent réin",
    gram: { trap: "I hope doesn't rain.", same: ["Hopefully it won't rain."] },
  },
  ena2m11ihopeso: {
    id: "ena2m11ihopeso", target: "I hope so. / I hope not.",
    source: "Ojalá. / Espero que no. — el inglés no repite la frase: la sustituye por so o not",
    sound: "ái JÓUP sóu / ái jóup NOT",
    gram: { trap: "I hope yes." },
  },
  ena2m11ifnotwellgo: {
    id: "ena2m11ifnotwellgo", target: "If not, we'll go to the cinema.",
    source: "Si no, nos vamos al cine. — el plan B en cuatro palabras",
    sound: "if NOT, uíil góu tu de SÍ-ne-ma",
  },
  ena2m11becarefulicy: {
    id: "ena2m11becarefulicy", target: "Be careful — the roads will be icy.",
    source: "Ten cuidado: las carreteras estarán heladas.",
    sound: "bi KÉA-ful — de RÓUDS̬ uil bi ÁI-si",
    gram: { same: ["Watch out — the roads will be icy."] },
  },
  ena2m11wewontbelong: {
    id: "ena2m11wewontbelong", target: "We won't be long.",
    source: "No tardamos. / Volvemos enseguida.",
    sound: "ui uóunt bi LONG",
    gram: { trap: "We won't be much time." },
  },

  // ── ena2m11l9 — cierre del módulo ──
  ena2m11whatevertheweather: {
    id: "ena2m11whatevertheweather", target: "whatever the weather",
    source: "llueva o no llueva, haga el tiempo que haga",
    sound: "uot-É-va de UÉ-da",
  },
  ena2m11letmeknow: {
    id: "ena2m11letmeknow", target: "Let me know.",
    source: "Ya me dirás. / Avísame.",
    sound: "let mi NÓU",
    gram: { same: ["Tell me when you know."] },
  },
};

export const ena2m11: Phase = {
  id: "ena2m11",
  level: "a2",
  n: 11,
  title: "If it rains, we'll stay in",
  goal: "Hablar de lo que pasará y de lo que quizá pase: will y won't, might y may, la primera condicional y los adverbios de probabilidad. Al terminar sabrás leer un parte del tiempo, avisar de algo que viene y montar un plan con su plan B.",
  color: "#0369a1",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — will / won't, y el aviso de frontera
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l1",
      phaseId: "ena2m11",
      title: "It will rain tomorrow",
      subtitle: "El otro futuro: la decisión de ahora mismo y la predicción a secas",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que pasará, y lo que no",
          itemIds: ["ena2m11illhelpyou", "ena2m11itwillrain", "ena2m11itwontrain", "ena2m11willitbecold", "ena2m11yesitwill", "ena2m11wellbefine"],
        },
        {
          kind: "note",
          note: {
            title: "Antes de empezar: esto es FRONTERA con el B1, y se dice claro",
            body: "Este módulo no es como los nueve primeros, y conviene que lo sepas antes de meterle una hora.<br/><br/><b>El examen que preparamos —LanguageCert A2 Access— coloca <i>will</i>, <i>might</i> y la primera condicional en su lista de B1</b>, no en la de A2. No te los van a pedir para producirlos, y <b>no entran en el simulacro de este curso</b>. Cambridge, en su A2 Key, sí los evalúa. Y la calle no le hace caso a ninguno de los dos: <i>It'll rain</i> y <i>if it rains</i> te van a salir al paso cada cinco frases.<br/><br/>Por eso aquí se hace esto:<br/>· se te <b>presenta</b>, para que entiendas lo que lees;<br/>· se te hace <b>reconocer</b>, que es donde de verdad se cobra —en el Listening y en el Reading del examen aparece, aunque no te lo pidan escribir—;<br/>· y se te hace <b>producirlo</b>, primero con la frase medio puesta y después suelto, porque <i>It'll rain</i> y <i>if it rains</i> los vas a necesitar hablando aunque el examen no te los pregunte.<br/><br/>Lo que NO se hace es <b>meterlo en el simulacro ni en la nota</b>: el examen que preparas no lo pide, así que aquí tampoco se te va a suspender por ello. <b>Tu futuro de examen sigue siendo <i>be going to</i> y el presente continuo del módulo 6.</b> Lo de hoy va encima de una casa que ya está terminada.<br/><br/><b>Una excepción, y es buena noticia:</b> los adverbios de probabilidad de la lección 7 —<i>probably</i>, <i>possibly</i>, <i>perhaps</i>— SÍ están en la lista del A2 y sí puntúan. Si en algún momento la frontera te agobia, agárrate a ellos: <i>It's probably going to rain</i> dice lo mismo con la gramática que ya es tuya.",
            table: [
              ["", "¿lo evalúa el A2?", "qué hacemos con ello"],
              ["will / won't", "LanguageCert no · Cambridge sí", "presentar, reconocer, producir — fuera del simulacro"],
              ["might / may (posibilidad)", "LanguageCert no · Cambridge sí", "presentar, reconocer, producir — fuera del simulacro"],
              ["primera condicional", "LanguageCert no · Cambridge sí", "presentar, reconocer, producir — fuera del simulacro"],
              ["probably / possibly / perhaps", "SÍ, los dos", "producción libre: son tuyos"],
              ["be going to · continuo de futuro", "SÍ, los dos", "siguen siendo tu futuro de examen"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "will y won't: un modal más, y ya sabes cómo se portan los modales",
            body: "La forma no trae nada nuevo, y esto es literal. En el módulo 7 aprendiste <b>la regla única de los modales</b>: <b>sin <i>do</i>, sin <i>-s</i> y sin <i>to</i></b>. <i>will</i> es un modal, así que se porta igual que <i>can</i> y que <i>must</i>:<br/><br/>· <b>will + verbo en forma de diccionario.</b> <i>It will <b>rain</b>.</i> — nunca <i>will to rain</i>, nunca <i>will rains</i>.<br/>· <b>Negativa: <i>won't</i></b> (que es <i>will not</i> apretado). <i>It <b>won't</b> rain.</i> — nunca <i>doesn't will</i>.<br/>· <b>Pregunta: <i>will</i> salta delante del sujeto.</b> <i><b>Will it</b> be cold?</i> — nunca <i>Does it will…</i>.<br/>· <b>Respuesta corta: se devuelve el <i>will</i>.</b> <i>Yes, it <b>will</b>. / No, it <b>won't</b>.</i><br/>· Es el mismo para todas las personas: <i>I will · you will · she will · they will</i>. Ni una sola <i>-s</i>.<br/><br/><b>Al hablar casi nunca dirás «will» entero.</b> Se contrae y se pega al sujeto: <b>I'll · you'll · he'll · she'll · it'll · we'll · they'll</b>. Esa <i>'ll</i> no es una sílaba nueva; solo alarga la palabra de delante. La trabajamos entera en la lección 5.<br/><br/><b>¿Y para qué sirve?</b> Hoy quédate con tres trabajos, que son los tres más frecuentes:<br/>1. <b>La decisión que tomas AHORA MISMO</b>, mientras hablas: <i>[[I'll help you.|Te echo una mano.]]</i> (acabas de ver que alguien no llega).<br/>2. <b>La promesa</b>: <i>I'll call you later.</i><br/>3. <b>La predicción de cabeza</b>, sin pruebas delante: <i>[[It will rain tomorrow.|Mañana lloverá.]]</i><br/><br/>El cuarto trabajo —repartirse el futuro con <i>going to</i>— es toda la lección 2.",
            table: [
              ["", "cómo se dice", "el error que hay que matar"],
              ["afirmativa", "It will rain. / It'll rain.", "It will rains."],
              ["negativa", "It won't rain.", "It doesn't will rain."],
              ["pregunta", "Will it be cold?", "Does it will be cold?"],
              ["respuesta corta", "Yes, it will. / No, it won't.", "Yes, it does."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l1e1", type: "mc", prompt: "Reconoce la decisión del momento",
              question: "Amy llega cargada de bolsas y Valeria dice: “I'll help you.”",
              options: ["Te echo una mano (lo decide ahora)", "Voy a ayudarte, ya lo tenía pensado", "Suelo ayudarte"],
              answer: 0,
              whyWrong: [null, "Eso sería «I'm going to help you» — un plan de antes, y aquí Valeria acaba de ver las bolsas", "Eso sería «I help you» o «I usually help you»: rutina"],
              itemIds: ["ena2m11illhelpyou"],
              tip: "Will es la lengua de las reacciones: ves algo, abres la boca. Si el plan existía antes de abrirla, será going to.",
            },
            {
              id: "ena2m11l1e2", type: "fastmatch", prompt: "Calentamiento — el tiempo ya lo traes del A1",
              pairs: [
                { target: "It's raining.", source: "Está lloviendo" },
                { target: "It's sunny.", source: "Hace sol" },
                { target: "It's cold.", source: "Hace frío" },
                { target: "It's windy.", source: "Hace viento" },
                { target: "It's snowing.", source: "Está nevando" },
              ],
              targetSeconds: 25,
              itemIds: ["enitsraining", "enitssunny", "enitscold", "enitswindy", "enitssnowing"],
              tip: "Todo el módulo se mueve sobre estas cinco. Que salgan sin pensar es media lección ganada.",
            },
            {
              id: "ena2m11l1e3", type: "bucket", prompt: "La regla única de los modales, aplicada a will",
              categories: ["así se escribe", "así NO: sobra o falta algo"],
              items: [
                { text: "It will rain tomorrow.", bucket: 0 },
                { text: "It will rains tomorrow.", bucket: 1 },
                { text: "Will it be cold?", bucket: 0 },
                { text: "Does it will be cold?", bucket: 1 },
                { text: "She won't come.", bucket: 0 },
                { text: "She doesn't will come.", bucket: 1 },
                { text: "I'll help you.", bucket: 0 },
                { text: "I will to help you.", bucket: 1 },
              ],
              itemIds: ["ena2m11itwillrain", "ena2m11willitbecold", "ena2m11itwontrain", "ena2m11illhelpyou"],
              tip: "Los cuatro errores de la derecha son el mismo error: tratar a will como si fuera un verbo normal. No lo es — es un modal, y los modales van solos.",
            },
            {
              id: "ena2m11l1e4", type: "cloze", prompt: "La contracción que usarás siempre",
              text: "Don't worry — I ___ help you with the bags.",
              answers: ["'ll", "will"],
              translation: "No te preocupes: te echo una mano con las bolsas.",
              hints: ["Es la decisión de este segundo, no un plan de ayer", "I … help you."],
              itemIds: ["ena2m11illhelpyou", "endontworry"],
              tip: "Al hablar, «I will» entero suena a promesa solemne o a discusión. Lo normal es «I'll», pegadito.",
            },
            {
              id: "ena2m11l1e5", type: "cloze", prompt: "La negativa entera",
              text: "The forecast is good: it ___ rain tonight.",
              answers: ["won't", "will not"],
              translation: "La previsión es buena: esta noche no lloverá.",
              hints: ["Will not, apretado en una sola palabra", "it w… rain tonight"],
              itemIds: ["ena2m11itwontrain"],
            },
            {
              id: "ena2m11l1e6", type: "transform", prompt: "De afirmación a pregunta",
              source: "It will be cold tomorrow.",
              instruction: "Conviértela en pregunta",
              answers: ["Will it be cold tomorrow?"],
              translation: "¿Hará frío mañana?",
              hints: ["El modal salta delante del sujeto; nada de do", "W… it be cold tomorrow?"],
              itemIds: ["ena2m11willitbecold"],
              tip: "Exactamente lo mismo que hacías con can: «Can you swim?». Cambias la pieza y la mecánica no se mueve.",
            },
            {
              id: "ena2m11l1e7", type: "errorfix", prompt: "Corrige — hay un auxiliar de más",
              wrong: "Does it will be cold tomorrow?",
              answers: ["Will it be cold tomorrow?"],
              why: "Will ya es el auxiliar: hace él la pregunta saltando delante del sujeto. Do y un modal nunca conviven — es la misma regla que te impedía escribir «Do you can swim?» en el módulo 7.",
              translation: "¿Hará frío mañana?",
              itemIds: ["ena2m11willitbecold"],
            },
            {
              id: "ena2m11l1e8", type: "errorfix", prompt: "Corrige la terminación",
              wrong: "It will rains tomorrow.",
              answers: ["It will rain tomorrow."],
              why: "Detrás de un modal el verbo va desnudo: sin -s, sin -ed y sin -ing. La tercera persona ya la lleva la frase entera, y el inglés no la marca dos veces.",
              translation: "Mañana lloverá.",
              itemIds: ["ena2m11itwillrain"],
              tip: "Es el mismo motor de «She can swim» y de «She must go»: la pieza de delante se lleva la gramática y el verbo se queda limpio.",
            },
            {
              id: "ena2m11l1e9", type: "build", prompt: "Construye la negativa",
              target: "It won't rain tonight",
              translation: "Esta noche no lloverá",
              distractors: ["doesn't", "rains"],
              itemIds: ["ena2m11itwontrain"],
            },
            {
              id: "ena2m11l1e10", type: "listen", prompt: "Escucha y transcribe",
              text: "Will it be cold tomorrow?",
              translation: "¿Hará frío mañana?",
              hints: ["Empieza por el modal", "W… it be cold tomorrow?"],
              itemIds: ["ena2m11willitbecold"],
            },
            {
              id: "ena2m11l1e11", type: "match", prompt: "Empareja cada frase con lo que hace",
              pairs: [
                { target: "I'll help you.", source: "Lo decide ahora mismo" },
                { target: "It will rain tomorrow.", source: "Predice, sin pruebas delante" },
                { target: "It won't rain tonight.", source: "Predice que NO pasará" },
                { target: "Yes, it will.", source: "Contesta que sí, en corto" },
              ],
              itemIds: ["ena2m11illhelpyou", "ena2m11itwillrain", "ena2m11itwontrain", "ena2m11yesitwill"],
            },
            {
              id: "ena2m11l1e12", type: "speak", prompt: "Dilo en voz alta — mirando el parte del tiempo",
              text: "It will rain tomorrow, but it won't rain tonight. We'll be fine.",
              phonetic: "it uil RÉIN ta-MO-rou, bat it UÓUNT réin tu-NÁIT. uíil bi FÁIN",
              translation: "Mañana lloverá, pero esta noche no. No pasa nada.",
              itemIds: ["ena2m11itwillrain", "ena2m11itwontrain", "ena2m11wellbefine"],
              tip: "Fíjate en la diferencia de fuerza: «will» va flojito y casi no se oye; «won't» es largo y se oye desde la otra punta. Es el inglés avisando de dónde está la negación.",
            },
            {
              id: "ena2m11l1e13", type: "type", prompt: "Cierre de producción",
              question: "¿Hará frío mañana? No, no hará frío. No pasa nada.",
              answers: [
                "Will it be cold tomorrow? No, it won't. We'll be fine.",
                "Will it be cold tomorrow? No, it won't be cold. We'll be fine.",
              ],
              hints: ["La pregunta pone el modal delante · la respuesta corta lo devuelve", "W… it be cold tomorrow? No, it w… We'll be f…"],
              itemIds: ["ena2m11willitbecold", "ena2m11yesitwill", "ena2m11wellbefine"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — will and be going to", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/talking-about-the-future", note: "La misma página que leíste en el módulo 6, pero ahora al revés: entonces te dijimos que ignoraras todo lo que dijera «will». Hoy lee solo eso (4 min)." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — will frente a going to: el reparto del futuro
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l2",
      phaseId: "ena2m11",
      title: "I think it'll rain",
      subtitle: "Cuándo va will y cuándo va going to — y por qué el inglés niega «creo que no» al revés",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que crees, lo que prometes y lo que decides sobre la marcha",
          itemIds: ["ena2m11ithinkitllrain", "ena2m11idontthinkitwill", "ena2m11illhaveacoffee", "ena2m11illcallyoulater", "ena2m11imsureitllbefine", "ena2m6itsgoingtorain"],
        },
        {
          kind: "note",
          note: {
            title: "will o going to: el reparto, que es el trabajo de hoy",
            body: "Hasta ayer tenías un solo futuro y no había nada que elegir. Hoy tienes dos, así que el trabajo de esta lección no es aprender <i>will</i> —eso ya está— sino saber <b>cuál de los dos sale de tu boca</b>. Y se decide con dos preguntas, no con intuición.<br/><br/><b>PREGUNTA 1: ¿cuándo lo decidiste?</b><br/>· <b>Antes de abrir la boca</b> → <i>going to</i>. El plan ya existía. <i>[[I'm going to book a hotel.|Voy a reservar un hotel.]]</i> (lo llevas pensando desde ayer)<br/>· <b>Mientras hablas</b> → <i>will</i>. Es una reacción a algo que acaba de pasar. <i>[[I'll help you.|Te echo una mano.]]</i> · <i>[[I'll have a coffee, please.|Un café, por favor.]]</i> (acabas de mirar la carta)<br/><br/><b>PREGUNTA 2: ¿tienes la prueba delante?</b><br/>· <b>Sí, se ve venir</b> → <i>going to</i>. <i>Look at [[the clouds|las nubes]] — [[it's going to rain.|va a llover.]]</i><br/>· <b>No, lo dices de cabeza</b> → <i>will</i>. Es tu opinión, tu cálculo, lo que te parece. <i>[[I think it'll rain.|Creo que va a llover.]]</i><br/><br/>Fíjate en que en español <b>las cuatro frases se dicen igual</b>: «va a llover» sirve tanto si estás mirando las nubes como si te lo estás imaginando. Por eso este reparto no te lo chiva el oído: hay que preguntárselo.<br/><br/><b>Y la salida de emergencia, que conviene tener escrita:</b> si dudas, <b>going to</b>. Es el que puntúa en tu examen, casi nunca queda mal y como mucho suena un poco menos fino. Al revés —meter <i>will</i> donde tocaba <i>going to</i>— sí chirría: <i>I'll book a hotel</i>, dicho de un plan que llevas semanas cerrando, suena a que lo acabas de decidir en ese instante.",
            table: [
              ["la situación", "cuál va", "ejemplo"],
              ["el plan ya existía", "going to", "I'm going to book a hotel."],
              ["lo decides al hablar", "will", "I'll have a coffee, please."],
              ["hay señales delante", "going to", "It's going to rain — look at the clouds."],
              ["es tu opinión, de cabeza", "will", "I think it'll rain tomorrow."],
              ["prometes algo", "will", "I'll call you later."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«Creo que no lloverá»: el inglés lo niega al revés",
            body: "Esta es pequeña, cabe en una línea y sale en cuanto abres la boca para opinar.<br/><br/>En español niegas <b>la segunda mitad</b>: «creo que <b>no</b> lloverá». El inglés niega <b>la primera</b>:<br/><br/>· <b>[[I don't think it will rain.|Creo que no va a llover.]]</b> ✅<br/>· <i>I think it won't rain.</i> — se entiende, y no es un error de gramática, pero <b>ningún inglés lo dice así</b>. Suena a traducción.<br/><br/>Funciona igual con los otros verbos de opinión: <i>I don't think she'll come</i> · <i>I don't believe it'll work</i>. La regla de bolsillo cabe en seis palabras: <b>el «no» se va al «creo»</b>.<br/><br/>Y ojo, porque hay una que NO sigue la regla: <b><i>I hope</i></b>. Con <i>hope</i> la negación se queda donde el español la pone: <i>[[I hope it doesn't rain.|Espero que no llueva.]]</i>, nunca <i>I don't hope it rains</i>. Es una excepción de una sola palabra, y la trabajamos entera en la lección 8.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l2e1", type: "mc", prompt: "¿Cuál cabe aquí?",
              question: "Sam te pasa la carta del café. Miras, decides y dices…",
              options: ["I'll have a coffee, please.", "I'm going to have a coffee, please.", "I have a coffee, please."],
              answer: 0,
              whyWrong: [null, "Going to dice «lo tenía decidido de antes», y acabas de mirar la carta ahora", "Presente simple es rutina: diría que tomas café todos los días"],
              itemIds: ["ena2m11illhaveacoffee", "ena2m5couldihavethemenu"],
              tip: "Pedir en un bar es el caso más puro de will: la decisión nace en el momento de decirla. Por eso «I'll have…» es la fórmula estándar en todo Reino Unido.",
            },
            {
              id: "ena2m11l2e2", type: "bucket", prompt: "¿Lo tenías decidido, o lo decides ahora?",
              categories: ["ya estaba decidido → going to", "lo decide al hablar → will"],
              items: [
                { text: "I'm going to book a hotel in Brighton.", bucket: 0 },
                { text: "Those bags look heavy — I'll help you.", bucket: 1 },
                { text: "We're going to visit Emma next month.", bucket: 0 },
                { text: "Don't worry, I'll call you later.", bucket: 1 },
                { text: "She's going to study Italian this year.", bucket: 0 },
                { text: "It's cold in here. I'll close the window.", bucket: 1 },
              ],
              itemIds: ["ena2m11illhelpyou", "ena2m11illcallyoulater", "ena2m6imgoingtobook", "enwindow"],
              tip: "Las tres de la derecha tienen algo en común: delante hay una frase que las provoca. Will casi siempre viene de reaccionar a algo.",
            },
            {
              id: "ena2m11l2e3", type: "bucket", prompt: "¿Hay pruebas delante, o es tu opinión?",
              categories: ["se ve venir → going to", "es lo que crees → will"],
              items: [
                { text: "Look at those clouds — it's going to rain.", bucket: 0 },
                { text: "I think it'll rain on Sunday.", bucket: 1 },
                { text: "It's half past eight — we're going to be late.", bucket: 0 },
                { text: "I'm sure it'll be fine.", bucket: 1 },
                { text: "The sky is black. It's going to snow.", bucket: 0 },
                { text: "I don't think it will be cold in May.", bucket: 1 },
              ],
              itemIds: ["ena2m6itsgoingtorain", "ena2m6clouds", "ena2m11ithinkitllrain", "ena2m11imsureitllbefine", "ena2m11idontthinkitwill"],
              tip: "Un truco que funciona: si puedes señalar con el dedo lo que te hace decirlo, es going to. Si solo puedes señalarte la cabeza, es will.",
            },
            {
              id: "ena2m11l2e4", type: "cloze", prompt: "Completa la opinión",
              text: "I ___ think it will rain — the forecast is good.",
              answers: ["don't", "do not"],
              translation: "Creo que no va a llover: la previsión es buena.",
              hints: ["El «no» se va al «creo»", "I d… think it will rain."],
              itemIds: ["ena2m11idontthinkitwill", "ena2m11theweatherforecast"],
            },
            {
              id: "ena2m11l2e5", type: "transform", prompt: "Dilo como lo diría un inglés",
              source: "I think it won't rain tomorrow.",
              instruction: "Mueve la negación adonde va en inglés",
              answers: ["I don't think it will rain tomorrow.", "I don't think it'll rain tomorrow."],
              translation: "Creo que no lloverá mañana.",
              hints: ["Se niega el verbo de opinión, no el de después", "I d… think it will rain tomorrow."],
              itemIds: ["ena2m11idontthinkitwill"],
              tip: "No estabas diciendo nada incorrecto: estabas diciéndolo como se dice en español. La diferencia entre sonar a alumno y sonar a hablante suele ser justo esto.",
            },
            {
              id: "ena2m11l2e6", type: "errorfix", prompt: "Corrige — falta el sujeto que el español no pone",
              wrong: "I think that will rain tomorrow.",
              answers: ["I think it will rain tomorrow."],
              why: "En español «lloverá» va sin sujeto porque la persona ya está dentro del verbo. En inglés todas las frases llevan sujeto, y cuando no hay nadie que haga la acción se pone «it»: it rains, it will rain, it's raining. Sin ese «it» la frase se queda sin arrancar.",
              translation: "Creo que lloverá mañana.",
              itemIds: ["ena2m11ithinkitllrain"],
              tip: "Este «it» de relleno es el mismo de «It's cold» y «It's five o'clock». No significa nada: solo ocupa la silla del sujeto, que en inglés nunca está vacía.",
            },
            {
              id: "ena2m11l2e7", type: "errorfix", prompt: "Corrige — hay una prueba delante y el futuro no la recoge",
              wrong: "Look at those clouds — it will rain.",
              answers: ["Look at those clouds — it's going to rain."],
              why: "Cuando la señal está a la vista —las nubes, el reloj, el humo—, el inglés usa going to: dice «esto ya está en marcha». Will es para lo que te sale de la cabeza sin nada delante que lo respalde.",
              translation: "Mira esas nubes: va a llover.",
              itemIds: ["ena2m6itsgoingtorain", "ena2m6clouds"],
            },
            {
              id: "ena2m11l2e8", type: "audiomc", prompt: "El domingo de Ben — pregunta primero, audio después",
              audio: "I'm going to work on Sunday, so I can't come to the park. But I'll finish at four, and I think it'll be sunny in the afternoon. If you're still there, I'll call you.",
              question: "¿Qué dice Ben de la tarde del domingo?",
              options: ["Que cree que hará sol", "Que ya sabe que va a llover", "Que estará trabajando toda la tarde"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "No dice nada de lluvia: dice «I think it'll be sunny»", "Termina a las cuatro: «I'll finish at four»"],
              itemIds: ["ena2m11ithinkitllrain", "ena2m11illcallyoulater", "enitssunny"],
              tip: "Cuenta los futuros del audio: hay un going to (el turno de trabajo, decidido de antes) y tres will (lo que termina, lo que cree y lo que promete). Ese reparto es exactamente el de la nota.",
            },
            {
              id: "ena2m11l2e9", type: "match", prompt: "Empareja cada frase con la razón por la que lleva ese futuro",
              pairs: [
                { target: "I'll have a coffee, please.", source: "Lo decide mirando la carta" },
                { target: "It's going to rain.", source: "Está mirando las nubes" },
                { target: "I think it'll rain.", source: "Es su opinión, sin pruebas" },
                { target: "I'll call you later.", source: "Es una promesa" },
              ],
              itemIds: ["ena2m11illhaveacoffee", "ena2m6itsgoingtorain", "ena2m11ithinkitllrain", "ena2m11illcallyoulater"],
            },
            {
              id: "ena2m11l2e10", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "I don't think it will be cold, but I'm sure it'll rain.",
              answers: [
                "Creo que no hará frío, pero seguro que llueve.",
                "No creo que haga frío, pero estoy segura de que va a llover.",
              ],
              itemIds: ["ena2m11idontthinkitwill", "ena2m11imsureitllbefine"],
              tip: "Fíjate en cómo se mueve la negación al pasar al español: «I don't think it will be cold» tiene dos traducciones buenas, y en las dos el «no» cambia de sitio.",
            },
            {
              id: "ena2m11l2e11", type: "speak", prompt: "Dilo en voz alta — la opinión y la promesa",
              text: "I don't think it will rain. I'm sure it'll be fine. I'll call you later.",
              phonetic: "ái dóunt zink it uil RÉIN. áim SHÓO Í-tol bi FÁIN. áil KÓOL yu LÉI-ta",
              translation: "Creo que no va a llover. Seguro que sale bien. Te llamo luego.",
              itemIds: ["ena2m11idontthinkitwill", "ena2m11imsureitllbefine", "ena2m11illcallyoulater"],
              tip: "Las dos últimas llevan la 'll pegada: «Í-tol» y «áil», nunca «it uil» ni «ái uil». Si las separas, suenas a robot leyendo.",
            },
            {
              id: "ena2m11l2e12", type: "type", prompt: "Cierre de producción",
              question: "Creo que no va a llover. Seguro que sale bien: te llamo luego.",
              answers: [
                "I don't think it will rain. I'm sure it'll be fine. I'll call you later.",
                "I don't think it'll rain. I'm sure it'll be fine. I'll call you later.",
                "I don't think it will rain. I'm sure it will be fine. I'll call you later.",
              ],
              hints: ["El «no» se va al «creo» · las otras dos llevan will", "I d… think it will rain. I'm s… it'll be fine. I'll c… you later."],
              itemIds: ["ena2m11idontthinkitwill", "ena2m11imsureitllbefine", "ena2m11illcallyoulater"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-2",
            book: "I think it will rain.",
            real: "I reckon it'll rain.",
            meaning: "Yo creo que va a llover",
            when: "Entre amigos y compañeros, en todo Reino Unido, para dar tu opinión sobre algo que aún no ha pasado. «Reckon» es cotidiano y muy común en el habla, pero en el Writing del examen escribe «I think»: es lo que espera el corrector y no te la juegas.",
            register: "amigos",
            note: "reckon se usa casi solo en presente y con opinión: I reckon, do you reckon? Nada de «I am reckoning».",
            sound: "ái RE-kon Í-tol RÉIN",
            level: "a2",
            itemId: "ena2m11ithinkitllrain",
          },
        },
      ],
      resources: [
        { label: "BBC Weather", url: "https://www.bbc.co.uk/weather", note: "Cinco minutos con el tiempo de Londres. No traduzcas: cuenta cuántas veces aparece «will» y cuántas «going to». La proporción te va a sorprender, y explica por qué este módulo existe." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — el parte meteorológico
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l3",
      phaseId: "ena2m11",
      title: "The weather forecast",
      subtitle: "Leer y oír un parte del tiempo — y el «it» que el español nunca pone",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "El vocabulario del parte",
          itemIds: ["ena2m11theweatherforecast", "ena2m11showers", "ena2m11itllbecloudy", "ena2m11sunnyspells", "ena2m11chilly", "ena2m11freezing", "ena2m11anumbrella"],
        },
        {
          kind: "note",
          note: {
            title: "Un parte del tiempo se lee con veinte palabras, y son estas",
            body: "En el A1 aprendiste a decir qué tiempo hace <b>ahora</b>: [[It's raining.|Está lloviendo.]] · [[It's sunny.|Hace sol.]] · [[It's cold.|Hace frío.]] Hoy solo hay que ponerle <i>will</i> delante y mirar dos o tres palabras que el parte usa y la conversación no.<br/><br/><b>Lo que dice el parte, y no aprendiste en el A1:</b><br/>· <b>[[the weather forecast|el parte, la previsión]]</b> — la palabra madre. <i>Have you seen the forecast?</i><br/>· <b>[[showers|chubascos]]</b> — no es lluvia continua, es lluvia a ratos. Es la misma palabra que «ducha», y tiene su lógica.<br/>· <b>[[sunny spells|claros, ratos de sol]]</b> — un <i>spell</i> es un rato. Es la forma educada de decir «va a estar nublado casi todo el día».<br/>· <b>[[chilly|fresquito]]</b> — el escalón de antes de <i>cold</i>. Un día de mayo en Londres es <i>chilly</i>, no <i>cold</i>.<br/>· <b>[[It's freezing!|¡Se hiela uno!]]</b> — el tope. Literalmente «está congelando», y se dice aunque haya diez grados: es una exageración normal, como en español.<br/><br/><b>La escala completa, de menos a más</b>, porque en el examen se pregunta por comparación y sin la escala no se compara:",
            table: [
              ["frío →", "→ calor", "cuándo se dice"],
              ["freezing", "boiling", "el tope de cada lado: exageración normal"],
              ["cold", "hot", "lo neutro, lo que ya traías del A1"],
              ["chilly", "warm", "el escalón intermedio: fresquito / templado"],
              ["wet · rainy", "dry", "de agua, no de temperatura"],
              ["cloudy · grey", "sunny · bright", "de nubes, no de temperatura"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«Llueve» no tiene sujeto en español, y en inglés sí: el «it» obligatorio",
            body: "En español el tiempo se cuenta con verbos que no llevan a nadie delante: «llueve», «nieva», «hace frío». No hay quién llueva. En inglés eso no está permitido: <b>toda frase lleva sujeto</b>, y cuando no hay nadie que haga la acción se pone <b><i>it</i></b>.<br/><br/>· <i><b>It</b> rains a lot in London.</i> · <i><b>It</b>'s raining.</i> · <i><b>It</b> will rain tomorrow.</i> · <i><b>It</b>'s cold.</i><br/><br/>Ese <i>it</i> no significa «ello» ni significa nada: es un relleno para que la silla del sujeto no esté vacía. Y no se cae nunca, ni cuando la frase se alarga: <i>I think <b>it</b> will rain</i>, <i>If <b>it</b> rains…</i>, <i>Do you think <b>it</b>'ll be cold?</i><br/><br/><b>Y ahora fíjate en un reparto que el español no hace, y que decide si el verbo lleva -ing o no:</b><br/>· <b>it + adjetivo</b>: <i>It's sunny · It's cloudy · It's windy · It's cold · It's foggy.</i> Aquí hay un <i>be</i> y un adjetivo, como en <i>I'm tired</i>.<br/>· <b>it + verbo en -ing</b>: <i>It's raining · It's snowing · It's pouring.</i> Aquí hay un verbo de verdad, en continuo.<br/><br/>Por eso no existe <i>It's raining weather</i> ni <i>It's sun</i>: cada palabra está en un bando y no se mezclan. Con <i>will</i>, el adjetivo pide <b>be</b> delante —<i>It'll <b>be</b> sunny</i>— y el verbo no lo lleva —<i>It'll rain</i>.<br/><br/><b>Y la pregunta, que ya es tuya del A1 con una palabra cambiada:</b> [[What's the weather like?|¿Qué tiempo hace?]] → <i>What <b>will</b> the weather <b>be</b> like tomorrow?</i>",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l3e1", type: "mc", prompt: "Reconoce la palabra del parte",
              question: "El parte dice: “Showers in the afternoon.” ¿Qué significa?",
              options: ["Chubascos: lluvia a ratos", "Nieve por la tarde", "Duchas calientes"],
              answer: 0,
              whyWrong: [null, "Nieve es snow: «It'll snow» o «snow showers»", "Es la misma palabra que «ducha», sí, pero en el parte del tiempo significa lluvia a ratos"],
              itemIds: ["ena2m11showers"],
              tip: "Si en el parte oyes showers, sal con paraguas pero sin drama: es lluvia que va y viene, no un día perdido.",
            },
            {
              id: "ena2m11l3e2", type: "match", prompt: "La escala del frío y del calor",
              pairs: [
                { target: "freezing", source: "helador, se hiela uno" },
                { target: "chilly", source: "fresquito, destemplado" },
                { target: "cold", source: "frío, a secas" },
                { target: "warm", source: "templado, agradable" },
              ],
              itemIds: ["ena2m11freezing", "ena2m11chilly", "encold"],
              tip: "Entre chilly y freezing hay dos escalones, y en el oral se nota: quien solo tiene «cold» dice lo mismo en enero que en abril.",
            },
            {
              id: "ena2m11l3e3", type: "bucket", prompt: "¿Adjetivo detrás del «is», o verbo en -ing?",
              categories: ["it + adjetivo (It's sunny)", "it + verbo -ing (It's raining)"],
              items: [
                { text: "It's cloudy.", bucket: 0 },
                { text: "It's raining.", bucket: 1 },
                { text: "It's windy.", bucket: 0 },
                { text: "It's snowing.", bucket: 1 },
                { text: "It's chilly.", bucket: 0 },
                { text: "It's freezing.", bucket: 1 },
                { text: "It's sunny.", bucket: 0 },
                { text: "It's pouring.", bucket: 1 },
              ],
              itemIds: ["ena2m11itllbecloudy", "ena2m11chilly", "ena2m11freezing", "enitsraining", "enitssnowing", "enitswindy", "enitssunny"],
              tip: "Ojo con «freezing»: nació como verbo en -ing y por eso está en la derecha, aunque hoy se use como si fuera un adjetivo. Con will, en cambio, se comporta como adjetivo: «It'll be freezing».",
            },
            {
              id: "ena2m11l3e4", type: "cloze", prompt: "El sujeto que el español no pone",
              text: "___ will rain in the morning, but the afternoon will be dry.",
              answers: ["It", "it"],
              translation: "Por la mañana lloverá, pero la tarde estará seca.",
              hints: ["En inglés la silla del sujeto no se queda vacía", "… will rain in the morning."],
              itemIds: ["ena2m11itwillrain"],
            },
            {
              id: "ena2m11l3e5", type: "cloze", prompt: "El adjetivo pide un verbo delante",
              text: "It'll ___ cloudy in the morning.",
              answers: ["be"],
              translation: "Por la mañana estará nublado.",
              hints: ["Cloudy es un adjetivo, y los adjetivos no son verbos", "It'll b… cloudy."],
              itemIds: ["ena2m11itllbecloudy"],
              tip: "Compara: «It'll rain» (verbo, no lleva be) y «It'll be sunny» (adjetivo, lo lleva). Es el mismo reparto de la nota, ahora con will.",
            },
            {
              id: "ena2m11l3e6", type: "errorfix", prompt: "Corrige la preposición",
              wrong: "It'll be cloudy at the morning.",
              answers: ["It'll be cloudy in the morning."],
              why: "Las partes del día van con in: in the morning, in the afternoon, in the evening. La única que se sale es «at night», y esa hay que aprenderla suelta.",
              translation: "Por la mañana estará nublado.",
              itemIds: ["ena2m11itllbecloudy"],
            },
            {
              id: "ena2m11l3e7", type: "transform", prompt: "Del tiempo de ahora al de mañana",
              source: "It's raining and it's very cold.",
              instruction: "Ponla en futuro con will, para mañana",
              answers: [
                "It will rain and it will be very cold tomorrow.",
                "It'll rain and it'll be very cold tomorrow.",
                "Tomorrow it will rain and it will be very cold.",
              ],
              translation: "Mañana lloverá y hará mucho frío.",
              hints: ["El verbo pierde el -ing; el adjetivo se queda con su be", "It will r… and it will b… very cold tomorrow."],
              itemIds: ["enitsraining", "enitscold", "ena2m11itwillrain"],
              tip: "Aquí se ve el reparto de la nota de un vistazo: «raining» se queda en «rain», pero «cold» necesita que alguien le preste un verbo, y ese es be.",
            },
            {
              id: "ena2m11l3e8", type: "gapbank", prompt: "El parte de mañana en Londres",
              text: "Good morning. It ___ cloudy first thing, with ___ in the afternoon. It ___ be very cold, but you'll want a jacket after six.",
              answers: ["will be", "showers", "won't"],
              bank: ["will be", "showers", "won't", "is being", "sunny spells", "doesn't"],
              translation: "Buenos días. Estará nublado a primera hora, con chubascos por la tarde. No hará mucho frío, pero a partir de las seis vas a querer una chaqueta.",
              itemIds: ["ena2m11itllbecloudy", "ena2m11showers", "ena2m11itwontrain", "enjacket"],
              tip: "Los tres huecos son los tres trozos de cualquier parte: qué habrá, cuándo, y qué NO habrá. Con esa plantilla puedes escribir el parte de tu ciudad esta noche.",
            },
            {
              id: "ena2m11l3e9", type: "audiomc", prompt: "El parte de la radio — pregunta primero, audio después",
              audio: "And now the weather. It'll be cloudy in the morning, with sunny spells around midday. There will be showers in the afternoon, so take an umbrella. It'll be chilly tonight, around six degrees.",
              question: "¿Qué se recomienda llevar?",
              options: ["Un paraguas", "Un abrigo de invierno", "Gafas de sol"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Habla de «chilly», fresquito, no de frío de invierno", "Hay ratos de sol, pero nadie recomienda gafas"],
              itemIds: ["ena2m11anumbrella", "ena2m11showers", "ena2m11sunnyspells", "ena2m11chilly"],
              tip: "En un parte real, la recomendación va SIEMPRE detrás de un «so»: «There will be showers, so take an umbrella». Si cazas el «so», cazas la respuesta.",
            },
            {
              id: "ena2m11l3e10", type: "listen", prompt: "Escucha y transcribe",
              text: "It'll be cloudy in the morning.",
              translation: "Por la mañana estará nublado.",
              hints: ["La contracción suena «Í-tol»", "It'll b… cloudy in the m…"],
              itemIds: ["ena2m11itllbecloudy"],
            },
            {
              id: "ena2m11l3e11", type: "speak", prompt: "Dilo en voz alta — tú eres el parte",
              text: "It'll be cloudy in the morning, with showers in the afternoon. Take an umbrella!",
              phonetic: "Í-tol bi KLÁU-di in de MÓO-ning, uid SHÁU-as̬ in de aaf-ta-NÚUN. téik an am-BRE-la",
              translation: "Por la mañana estará nublado y por la tarde habrá chubascos. ¡Coge un paraguas!",
              itemIds: ["ena2m11itllbecloudy", "ena2m11showers", "ena2m11anumbrella"],
              tip: "Umbrella lleva el golpe en el medio: am-BRE-la. Si lo pones al principio, como en «paraguas», no te entienden a la primera.",
            },
            {
              id: "ena2m11l3e12", type: "type", prompt: "Cierre de producción",
              question: "Por la mañana estará nublado. ¿Hará frío? No, hará fresquito.",
              answers: [
                "It'll be cloudy in the morning. Will it be cold? No, it'll be chilly.",
                "It will be cloudy in the morning. Will it be cold? No, it will be chilly.",
              ],
              hints: ["El adjetivo pide be · la pregunta pone el modal delante", "It'll b… cloudy in the morning. W… it be cold?"],
              itemIds: ["ena2m11itllbecloudy", "ena2m11willitbecold", "ena2m11chilly"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-3",
            book: "It's raining a lot.",
            real: "It's chucking it down.",
            meaning: "Está cayendo un diluvio",
            when: "Entre amigos y en el trabajo, en todo Reino Unido, cuando llueve de verdad. Muy hablado y muy británico. En el examen escribe «It's raining heavily» o «It's pouring»: las dos son correctas y ninguna te baja el registro.",
            register: "amigos",
            note: "«It's pouring» está a medio camino: se dice mucho y se puede escribir sin problema.",
            sound: "its CHA-king it DÁUN",
            level: "a2",
            itemId: "enitsraining",
          },
        },
      ],
      resources: [
        { label: "Met Office — previsión del Reino Unido", url: "https://www.metoffice.gov.uk/", note: "El servicio meteorológico británico, en su idioma. Busca Londres y lee la previsión de mañana en voz alta: son cuatro líneas y usan exactamente el vocabulario de esta lección." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — might / may: la probabilidad no es un tiempo verbal
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l4",
      phaseId: "ena2m11",
      title: "It might rain",
      subtitle: "Puede que sí, puede que no — y por qué «a lo mejor voy» no se traduce palabra por palabra",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que quizá pase",
          itemIds: ["ena2m11itmightrain", "ena2m11wemightgo", "ena2m11imightnotcome", "ena2m11itmaybecold", "ena2m11itdependsontheweather"],
        },
        {
          kind: "note",
          note: {
            title: "might y may: otro modal, y la forma ya te la sabes",
            body: "Igual que <i>will</i>, <i>might</i> y <i>may</i> son <b>modales</b>, así que entran enteros en la regla que traes del módulo 7: <b>sin <i>do</i>, sin <i>-s</i> y sin <i>to</i></b>.<br/><br/>· <b>[[It might rain.|A lo mejor llueve.]]</b> — nunca <i>It might to rain</i>, nunca <i>It mights rain</i>.<br/>· <b>Negativa: <i>might not</i></b>, y aquí <b>no hay contracción</b> que valga: se escribe entero. <i>[[I might not come.|Puede que no vaya.]]</i> — nunca <i>I don't might come</i>.<br/>· <b>[[It may be cold later.|Puede que haga frío luego.]]</b> — <i>may</i> es el mismo significado un peldaño más formal. En un parte del tiempo o en un aviso escrito verás <i>may</i>; hablando con Amy dirás <i>might</i>.<br/>· Igual para todas las personas: <i>I might · she might · they might</i>. Ni una <i>-s</i>.<br/><br/><b>¿Cuánta duda es «might»?</b> Piénsalo como una escala, y quédate con los extremos:<br/>· <b>will</b> → lo doy por hecho. <i>It will rain.</i><br/>· <b>might / may</b> → puede que sí, puede que no. Ni me mojo. <i>It might rain.</i><br/>· <b>won't</b> → lo descarto. <i>It won't rain.</i><br/><br/><b>Una advertencia práctica:</b> <i>might</i> casi nunca se usa para preguntar. <i>Might it rain?</i> existe, pero suena a novela del siglo XIX. Para preguntar por la posibilidad se usa lo que ya tienes: <i>Do you think it'll rain?</i><br/><br/><b>Y el aviso de frontera sigue en pie:</b> esto es material de B1 en tu examen. Aquí se presenta para que lo reconozcas y lo produzcas con la frase medio puesta — <b>no entra en el simulacro</b>.",
            table: [
              ["", "cómo se dice", "el error que hay que matar"],
              ["afirmativa", "It might rain.", "It might to rain."],
              ["negativa", "I might not come.", "I don't might come."],
              ["más formal", "It may be cold later.", "It may is cold later."],
              ["para preguntar", "Do you think it'll rain?", "Might it rain?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«A lo mejor voy»: LA PROBABILIDAD NO ES UN TIEMPO VERBAL",
            body: "Este es el contraste de la lección, y explica dos errores que parecen distintos y son el mismo.<br/><br/><b>En español, la duda se marca EN EL VERBO.</b> «Puede que <b>llueva</b>», «quizá <b>vayamos</b>», «a lo mejor <b>voy</b>»: el verbo cambia de forma (subjuntivo) o directamente se queda en presente y el adverbio se encarga del resto. La duda vive dentro del verbo.<br/><br/><b>En inglés, la duda va en una PIEZA APARTE</b> y el verbo no se entera de nada:<br/>· una pieza que es un <b>modal</b>: <i>It <b>might</b> rain</i> · <i>We <b>might</b> go</i>;<br/>· o una pieza que es un <b>adverbio</b> —<i>probably</i>, <i>possibly</i>, <i>perhaps</i>— que trabaja con un futuro normal, y eso es la lección 7.<br/><br/><b>De ahí sale el error nº 1 de este bloque:</b><br/>· ❌ <i>Maybe we go to the park.</i> — el alumno pone <i>maybe</i> y deja el verbo en presente, como en español.<br/>· ✅ <i>Maybe we<b>'ll</b> go to the park.</i> · ✅ <i>We <b>might</b> go to the park.</i><br/><br/>La regla de bolsillo: <b>maybe no es un futuro; solo es un adverbio.</b> Si detrás no hay <i>will</i> o <i>might</i>, la frase se queda hablando del presente. Y ojo, que <i>maybe</i> ya lo traías del A1 en [[Maybe another time.|Quizá en otro momento.]] — ahí funcionaba porque no había verbo detrás.<br/><br/><b>El «may» que ya tenías, y por qué no se pisan.</b> En el módulo 7 aprendiste <b>[[May I ask a question?|¿Puedo hacer una pregunta?]]</b>: eso es <i>may</i> de <b>permiso</b>. El de hoy es <i>may</i> de <b>posibilidad</b>. Es la misma palabra con dos oficios, y no se confunden nunca porque la forma los separa: el de permiso es una <b>pregunta</b> y va con <i>I</i> o <i>we</i>; el de posibilidad es una <b>afirmación</b> sobre algo que quizá pase.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l4e1", type: "mc", prompt: "Cuánta seguridad hay aquí",
              question: "“It might rain on Saturday.”",
              options: ["Puede que llueva: no se moja", "Va a llover seguro", "No va a llover"],
              answer: 0,
              whyWrong: [null, "Eso sería «It will rain» o «It's going to rain»", "Eso sería «It won't rain»"],
              itemIds: ["ena2m11itmightrain"],
              tip: "Might es el modal de no mojarse. Si en el oral te preguntan por algo que no sabes, es tu mejor amigo: nadie te puede pedir cuentas.",
            },
            {
              id: "ena2m11l4e2", type: "bucket", prompt: "¿Lo da por hecho, o solo puede ser?",
              categories: ["lo da por hecho: will / won't", "puede que sí, puede que no: might / may"],
              items: [
                { text: "It will rain tomorrow.", bucket: 0 },
                { text: "It might rain tomorrow.", bucket: 1 },
                { text: "We might go to the park.", bucket: 1 },
                { text: "It won't be cold tonight.", bucket: 0 },
                { text: "It may be cold later.", bucket: 1 },
                { text: "I'll call you later.", bucket: 0 },
              ],
              itemIds: ["ena2m11itwillrain", "ena2m11itmightrain", "ena2m11wemightgo", "ena2m11itwontrain", "ena2m11itmaybecold", "ena2m11illcallyoulater"],
              tip: "Fíjate en que el verbo de detrás es el mismo en los seis: rain, go, be, call. Lo único que cambia es la pieza de delante. Ahí está toda la probabilidad del inglés.",
            },
            {
              id: "ena2m11l4e3", type: "bucket", prompt: "El mismo «may», dos oficios: ¿permiso o posibilidad?",
              categories: ["permiso (módulo 7)", "posibilidad (hoy)"],
              items: [
                { text: "May I ask a question?", bucket: 0 },
                { text: "It may be cold later.", bucket: 1 },
                { text: "May I sit here?", bucket: 0 },
                { text: "The shop may be closed on Sunday.", bucket: 1 },
                { text: "May we come in?", bucket: 0 },
                { text: "She may not come tonight.", bucket: 1 },
              ],
              itemIds: ["ena2m7mayiaskaquestion", "ena2m11itmaybecold", "ena2m11imightnotcome"],
              tip: "Los de la izquierda son preguntas y llevan I o we; los de la derecha son afirmaciones sobre algo que quizá pase. La forma los separa sola: no hay que recordar nada.",
            },
            {
              id: "ena2m11l4e4", type: "cloze", prompt: "La duda, en una pieza",
              text: "I'm not sure about Sunday — we ___ go to the park.",
              answers: ["might", "may"],
              translation: "No estoy segura de lo del domingo: igual vamos al parque.",
              hints: ["El modal de no mojarse", "we m… go to the park"],
              itemIds: ["ena2m11wemightgo"],
            },
            {
              id: "ena2m11l4e5", type: "cloze", prompt: "La negativa, que no se contrae",
              text: "Sorry, I ___ not come tonight — it depends on my shift.",
              answers: ["might", "may"],
              translation: "Lo siento, puede que no vaya esta noche: depende de mi turno.",
              hints: ["El not va detrás, y entero: nada de «mightn't»", "I m… not come tonight"],
              itemIds: ["ena2m11imightnotcome"],
              tip: "«Mightn't» existe en los libros viejos y no lo usa nadie. Escribe «might not» y no te compliques.",
            },
            {
              id: "ena2m11l4e6", type: "errorfix", prompt: "Corrige — sobra una palabra",
              wrong: "It might to rain this afternoon.",
              answers: ["It might rain this afternoon."],
              why: "Might es un modal, y detrás de un modal el verbo va desnudo: sin to, sin -s y sin -ing. Es la misma regla de «I can swim» y «You must go» que llevas usando desde el módulo 7.",
              translation: "Puede que llueva esta tarde.",
              itemIds: ["ena2m11itmightrain"],
            },
            {
              id: "ena2m11l4e7", type: "errorfix", prompt: "Corrige el calco: el adverbio no basta",
              wrong: "Maybe we go to the park on Sunday.",
              answers: ["Maybe we'll go to the park on Sunday."],
              why: "En español «a lo mejor vamos» funciona porque el adverbio se encarga de la duda y el verbo se queda en presente. En inglés no: maybe es solo un adverbio y no marca futuro. Sin un will o un might detrás, la frase habla del presente y no dice lo que querías decir.",
              translation: "A lo mejor el domingo vamos al parque.",
              itemIds: ["ena2m11wemightgo", "enanothertime"],
              tip: "Este error es hermano del de la lección 7 con «probably». Los dos salen de lo mismo: creer que un adverbio de duda puede hacer el trabajo de un verbo.",
            },
            {
              id: "ena2m11l4e8", type: "transform", prompt: "Dilo con el modal en vez de con el adverbio",
              source: "Maybe we'll go to the park.",
              instruction: "Dilo con might, sin maybe",
              answers: ["We might go to the park.", "We may go to the park."],
              translation: "Igual vamos al parque.",
              hints: ["El modal ocupa el sitio del will", "We m… go to the park."],
              itemIds: ["ena2m11wemightgo"],
              tip: "Las dos formas dicen lo mismo, así que no hay una mejor. Ten las dos: la del modal es más corta y la del adverbio es más fácil de improvisar.",
            },
            {
              id: "ena2m11l4e9", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Puede que no vaya: depende del tiempo.",
              answers: [
                "I might not come. It depends on the weather.",
                "I may not come. It depends on the weather.",
                "I might not go. It depends on the weather.",
              ],
              hint: "«depender de» lleva una preposición que no es la del español",
              itemIds: ["ena2m11imightnotcome", "ena2m11itdependsontheweather"],
              tip: "«Depends of» es de los errores más pegajosos que hay, porque el español dice «depende DE». En inglés es depend ON, siempre, y no hay excepción.",
            },
            {
              id: "ena2m11l4e10", type: "audiomc", prompt: "El domingo de Amy — pregunta primero, audio después",
              audio: "I'm not sure about Sunday, to be honest. I might work — they haven't told me yet. And if I don't work, we might go to the park, but it depends on the weather. I'll let you know on Saturday.",
              question: "¿Qué sabe Amy con seguridad?",
              options: ["Que te lo dirá el sábado", "Que va a trabajar el domingo", "Que van a ir al parque"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice «I might work»: no lo sabe todavía", "También va con might, y encima depende del tiempo"],
              itemIds: ["ena2m11wemightgo", "ena2m11itdependsontheweather", "ena2m11letmeknow"],
              tip: "Truco de examen: en un audio lleno de might, lo seguro es lo único que va con will. Busca el will y ahí está la respuesta.",
            },
            {
              id: "ena2m11l4e11", type: "speak", prompt: "Dilo en voz alta — sin mojarte",
              text: "It might rain on Sunday, so we might not go. It depends on the weather.",
              phonetic: "it máit RÉIN on SAN-dei, sóu ui máit not GÓU. it di-PENDS̬ on de UÉ-da",
              translation: "Puede que llueva el domingo, así que igual no vamos. Depende del tiempo.",
              itemIds: ["ena2m11itmightrain", "ena2m11imightnotcome", "ena2m11itdependsontheweather"],
              tip: "La «t» de might casi no suena cuando le sigue una consonante: «máin-not», todo pegado. No la fuerces.",
            },
            {
              id: "ena2m11l4e12", type: "type", prompt: "Cierre de producción",
              question: "Puede que llueva el domingo. Igual vamos al parque: depende del tiempo.",
              answers: [
                "It might rain on Sunday. We might go to the park. It depends on the weather.",
                "It may rain on Sunday. We may go to the park. It depends on the weather.",
                "It might rain on Sunday. Maybe we'll go to the park. It depends on the weather.",
              ],
              hints: ["El modal delante y el verbo desnudo · depender lleva on", "It m… rain on Sunday. We m… go to the park. It depends o… the weather."],
              itemIds: ["ena2m11itmightrain", "ena2m11wemightgo", "ena2m11itdependsontheweather"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-4",
            book: "Perhaps. I am not sure.",
            real: "Might do.",
            meaning: "A lo mejor. / Puede.",
            when: "Entre amigos, como respuesta corta a «¿vas a ir?», «¿lo vas a hacer?». Es muy británico y muy hablado: dos palabras y ni un sujeto. En el examen contesta «I might» o «I'm not sure yet»: dicen lo mismo y sí puntúan.",
            register: "amigos",
            note: "El truco está en el «do», que sustituye al verbo entero de la pregunta: «Are you going?» → «Might do».",
            sound: "máit DÚU",
            level: "a2",
            itemId: "ena2m11itmightrain",
          },
        },
      ],
      resources: [
        { label: "British Council — modals of probability", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-possibility", note: "Cinco minutos. Lee solo la parte de might y may e ignora todo lo que hable de «must have» o «can't have»: eso es B1 y no lo necesitas todavía." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — la clínica de sonido: 'll, won't / want y el probably real
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l5",
      phaseId: "ena2m11",
      title: "I won't / I want",
      subtitle: "La clínica: la 'll que no es sílaba y la vocal que separa un no de un quiero",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Las cuatro cosas que hay que oír hoy",
          itemIds: ["ena2m11llsound", "ena2m11itllbe", "ena2m11wontwant", "ena2m11probablysound"],
        },
        {
          kind: "note",
          note: {
            title: "La 'll no es una sílaba: se pega y alarga la palabra de delante",
            body: "Al hablar, un inglés casi nunca dice <i>will</i> entero. Lo aprieta contra el sujeto y lo convierte en una <b>l larga</b> al final de la palabra que ya estaba:<br/><br/>· <b>I will</b> → <b>[[I'll|áil]]</b> · <b>we will</b> → <b>we'll</b> (uíil) · <b>you will</b> → <b>you'll</b> (yul) · <b>they will</b> → <b>they'll</b> (déil) · <b>she will</b> → <b>she'll</b> (shíil)<br/><br/><b>El error del hispanohablante es partirlo en dos.</b> «ái-UÍL» suena a dictado, y peor: al oír a otro no reconoces nada, porque tú estás esperando dos golpes y solo llega uno. Practica al revés: di <i>I</i> y alarga la lengua contra el paladar sin abrir otra vez la boca. Eso es <i>I'll</i>.<br/><br/><b>Y el caso más difícil de todos, <i>it'll</i>:</b> ahí se juntan una t y una l, que es una combinación que el español no tiene. Lo que sale de una boca inglesa es <b>[[it'll be|Í-tol bi]]</b>, tres golpes cortitos y pegados. Escúchalo unas cuantas veces: aparece en la mitad de las frases de este módulo.<br/><br/><b>Cuándo NO se contrae:</b> en la respuesta corta. <i>Yes, it <b>will</b>.</i> — nunca <i>Yes, it'll</i>. Es la misma regla de «Yes, I <b>am</b>» del A1: la palabra final de una respuesta corta se dice entera, porque es donde cae el peso.",
          },
        },
        {
          kind: "note",
          note: {
            title: "won't / want: el par mínimo que cambia un no por un quiero",
            body: "Este es el par más caro del nivel, y no es exagerado:<br/><br/>· <b>won't</b> se dice <b>UÓUNT</b> — con una <b>o larga que se cierra en u</b>, como el «óu» de <i>go</i> y <i>home</i>.<br/>· <b>want</b> se dice <b>UÓNT</b> — con una <b>o corta y seca</b>, la de <i>hot</i> y <i>not</i>.<br/><br/>El español solo tiene una «o», así que los dos te salen igual. Y la frase que sale de ahí es un desastre: <i>I won't help you</i> (no pienso ayudarte) frente a <i>I want help</i> (necesito ayuda). Del no rotundo a la petición de socorro.<br/><br/><b>Cómo se arregla en treinta segundos:</b> para decir <i>won't</i>, empieza a decir «go» y córtalo con una n y una t — <b>góu → uóunt</b>. Para <i>want</i>, di «not» y cámbiale la primera letra — <b>not → uónt</b>. Si notas que la boca se te cierra al final, es <i>won't</i>; si se queda abierta, es <i>want</i>.<br/><br/><b>Y una ayuda que no está en los libros:</b> <i>won't</i> casi siempre va <b>acentuado</b> —es la negación, y la negación se oye— mientras que <i>want</i> suele ir seguido de <i>to</i> y se come parte de sí mismo: <i>I wanna go</i>. Si oyes algo largo y fuerte, es <i>won't</i>.<br/><br/><b>La tercera de hoy es más fácil y da mucho:</b> <b>probably</b> tiene tres sílabas escritas y <b>dos habladas</b>: <b>[[probably|PRO-bli]]</b>. Nadie dice «pro-BA-ble-mente» a la inglesa. Si lo dices con tres, se te nota el acento en una palabra que vas a usar cada dos frases.",
            table: [
              ["se escribe", "suena", "y NO suena"],
              ["I'll", "áil", "ái-UÍL"],
              ["it'll be", "Í-tol bi", "it UÍL bi"],
              ["won't", "UÓUNT", "UÓNT"],
              ["want", "UÓNT", "UÓUNT"],
              ["probably", "PRO-bli", "PRO-ba-ble-li"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l5e1", type: "mc", prompt: "La 'll, en una pregunta",
              question: "¿Cuántas sílabas tiene «I'll» al hablar?",
              options: ["Una: es «áil»", "Dos: «ái-uíl»", "Depende de la frase"],
              answer: 0,
              whyWrong: [null, "Eso es «I will» separado, que solo se dice para insistir o discutir", "No depende: la contracción siempre es una sola sílaba"],
              itemIds: ["ena2m11llsound"],
              tip: "La 'll no añade sílaba: alarga la que ya había. Es exactamente lo que hace la contracción de «I'm» con «am».",
            },
            {
              id: "ena2m11l5e2", type: "hearreal", prompt: "¿Cuál has oído?",
              book: "It will be cold tonight.",
              real: "It'll be cold tonight.",
              translation: "Esta noche hará frío.",
              itemIds: ["ena2m11itllbe", "ena2m11willitbecold"],
              tip: "Las dos son correctas y significan lo mismo. La diferencia es que una la vas a leer y la otra la vas a oír: en el habla real, «it'll» gana nueve de cada diez veces.",
            },
            {
              id: "ena2m11l5e3", type: "hearreal", prompt: "Escucha y dime qué significa",
              book: "I will not do it.",
              real: "I won't do it.",
              translation: "No pienso hacerlo.",
              ask: "meaning",
              meaningOptions: ["No pienso hacerlo", "Quiero hacerlo", "Ya lo hice"],
              itemIds: ["ena2m11wontwant", "ena2m11itwontrain"],
              tip: "Con «won't» la negación está dentro de la palabra, no en un «not» aparte. Si no cazas esa vocal larga, te pierdes el «no» entero de la frase.",
            },
            {
              id: "ena2m11l5e4", type: "bucket", prompt: "¿Suena UÓUNT (won't) o UÓNT (want)?",
              categories: ["won't: o larga que se cierra en u", "want: o corta y seca"],
              items: [
                { text: "I won't be long.", bucket: 0 },
                { text: "I want a coffee.", bucket: 1 },
                { text: "It won't rain tonight.", bucket: 0 },
                { text: "Do you want to come?", bucket: 1 },
                { text: "She won't be here.", bucket: 0 },
                { text: "They want more time.", bucket: 1 },
              ],
              itemIds: ["ena2m11wontwant", "ena2m11wewontbelong", "ena2m11itwontrain"],
              tip: "Lee la lista dos veces en voz alta, alternando. La boca tiene que cerrarse en las de la izquierda y quedarse abierta en las de la derecha.",
            },
            {
              id: "ena2m11l5e5", type: "audiomc", prompt: "Escucha bien la vocal — pregunta primero",
              audio: "I won't go to the park with you.",
              question: "¿Qué está diciendo?",
              options: ["Que no piensa ir al parque", "Que quiere ir al parque", "Que fue al parque"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso sería «I want to go», con o corta y un «to» detrás", "El pasado sería «I went», que es otra vocal distinta"],
              itemIds: ["ena2m11wontwant"],
              tip: "Tres palabras que el oído español mezcla: won't (uóunt), want (uónt) y went (uent). Si distingues esas tres, entiendes la mitad de lo que no entendías.",
            },
            {
              id: "ena2m11l5e6", type: "shadow", prompt: "Repite pegado al audio — la contracción entera",
              text: "It'll be cold, but it won't rain.",
              phonetic: "Í-tol bi KÓULD, bat it UÓUNT réin",
              translation: "Hará frío, pero no lloverá.",
              reps: 2,
              itemIds: ["ena2m11itllbe", "ena2m11itwontrain"],
              tip: "Primera pasada lenta, para colocar la lengua en «Í-tol». Segunda a velocidad normal, sin mirar. Si te sale «it uil», para y vuelve a empezar.",
            },
            {
              id: "ena2m11l5e7", type: "listen", prompt: "Escucha y transcribe — con la contracción",
              text: "It'll probably rain tomorrow.",
              translation: "Seguramente llueva mañana.",
              strictContractions: true,
              hints: ["Empieza con la contracción de «it will»", "It'll p… rain tomorrow."],
              itemIds: ["ena2m11itllbe", "ena2m11probablysound"],
              tip: "Aquí sí importa cómo lo escribes: si oíste «Í-tol» y escribes «It will», estás transcribiendo lo que crees que se dijo, no lo que sonó.",
            },
            {
              id: "ena2m11l5e8", type: "match", prompt: "Empareja cada escritura con su sonido",
              pairs: [
                { target: "I'll", source: "áil" },
                { target: "it'll be", source: "Í-tol bi" },
                { target: "won't", source: "UÓUNT" },
                { target: "probably", source: "PRO-bli" },
              ],
              itemIds: ["ena2m11llsound", "ena2m11itllbe", "ena2m11wontwant", "ena2m11probablysound"],
            },
            {
              id: "ena2m11l5e9", type: "cloze", prompt: "La excepción: la respuesta corta no se contrae",
              text: "“Will it be cold?” — “Yes, it ___.”",
              answers: ["will"],
              translation: "«¿Hará frío?» «Sí.»",
              hints: ["En la respuesta corta la palabra final va entera", "Yes, it w…"],
              itemIds: ["ena2m11yesitwill"],
              tip: "Es la misma regla de «Yes, I am» del A1: nunca «Yes, I'm». Lo último de una respuesta corta lleva el peso, y lo que lleva el peso no se contrae.",
            },
            {
              id: "ena2m11l5e10", type: "fastmatch", prompt: "Ráfaga de sonido",
              pairs: [
                { target: "I'll", source: "áil" },
                { target: "we'll", source: "uíil" },
                { target: "won't", source: "UÓUNT" },
                { target: "want", source: "UÓNT" },
                { target: "it'll", source: "Í-tol" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m11llsound", "ena2m11wontwant", "ena2m11itllbe"],
              tip: "El cronómetro solo premia. Lo que te frene aquí es lo que te va a frenar en el Listening.",
            },
            {
              id: "ena2m11l5e11", type: "speak", prompt: "Dilo en voz alta — las tres cosas de hoy juntas",
              text: "I'll be there at six. It'll probably rain, but I won't be long.",
              phonetic: "áil bi DÉA at SIKS. Í-tol PRO-bli RÉIN, bat ái UÓUNT bi LONG",
              translation: "Estaré allí a las seis. Seguramente llueva, pero no tardaré.",
              itemIds: ["ena2m11llsound", "ena2m11itllbe", "ena2m11probablysound", "ena2m11wewontbelong"],
              tip: "Tres contracciones y una vocal larga en once palabras. Si esta frase te sale limpia, la clínica está aprobada.",
            },
            {
              id: "ena2m11l5e12", type: "type", prompt: "Cierre de producción — escríbelo como suena de verdad",
              question: "Seguramente haga frío, pero no lloverá.",
              answers: [
                "It'll probably be cold, but it won't rain.",
                "It will probably be cold, but it won't rain.",
              ],
              hints: ["El adjetivo pide be · la negativa es una sola palabra", "It'll p… be cold, but it w… rain."],
              itemIds: ["ena2m11itllbe", "ena2m11itwontrain", "ena2m11probablysound"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-5",
            book: "We will not be long.",
            real: "We won't be a minute.",
            meaning: "No tardamos nada",
            when: "Con amigos y en cualquier tienda o casa ajena, cuando te vas un momento y quieres tranquilizar al otro. Literalmente dice «no seremos un minuto», que es al revés de lo que significa, y aun así es de lo más corriente. En el examen, «We won't be long».",
            register: "neutral",
            note: "Hay un gemelo aún más raro: «I won't be a sec». Se oye, se entiende y no se escribe nunca.",
            sound: "ui uóunt bi a MI-nit",
            level: "a2",
            itemId: "ena2m11wewontbelong",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — contractions", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca cualquier vídeo de «contractions» y pon el subtítulo. Lo interesante no es lo que dicen: es ver escrito «will» y oír solo una l." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — la primera condicional, colgada de las temporales del m6
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l6",
      phaseId: "ena2m11",
      title: "If it rains, we'll stay in",
      subtitle: "La condición y su consecuencia — y la mitad de la frase que nunca lleva futuro",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Si pasa esto, pasará aquello",
          itemIds: ["ena2m11ifitrains", "ena2m11ifitsnice", "ena2m11ifihavetime", "ena2m11ifyoudonttakeacoat", "ena2m11whatwillyoudoif", "ena2m11wellseehowitgoes"],
        },
        {
          kind: "note",
          note: {
            title: "Esto ya lo sabes hacer: es «when I arrive» con otra conjunción",
            body: "En el módulo 6 aprendiste algo que hoy vale entero: <b>[[When I get there, I'm going to call you.|Cuando llegue, te llamo.]]</b> Y la regla que te dimos entonces no era «tras when va presente», sino <b>el porqué</b>: el inglés ya ha dicho que esto es futuro en la otra mitad de la frase, y repetirlo le sobra. <b>Una frase, una marca de futuro.</b><br/><br/><b>Pues la primera condicional es exactamente eso con otra conjunción.</b> Donde ponías <i>when</i>, pones <i>if</i>. Donde ponías <i>going to</i>, puedes poner <i>will</i>. Ni una regla nueva:<br/><br/><b>IF + presente ‖ will + verbo desnudo</b><br/><br/>· <b>[[If it rains, we'll stay in.|Si llueve, nos quedamos en casa.]]</b><br/>· <b>[[If it's nice, we'll have a picnic.|Si hace bueno, hacemos un picnic.]]</b><br/>· <b>[[If I have time, I'll call you.|Si tengo tiempo, te llamo.]]</b><br/><br/><b>La diferencia entre when y if, en una línea:</b> <i>when</i> es para lo que va a pasar seguro (llegaré, es cuestión de cuándo); <i>if</i> es para lo que no se sabe (a lo mejor llueve, a lo mejor no).<br/><br/><b>El orden se puede dar la vuelta</b>, y las dos formas son igual de correctas:<br/>· <i><b>If it rains</b>, we'll stay in.</i> — con coma, porque la condición va delante.<br/>· <i>We'll stay in <b>if it rains</b>.</i> — sin coma, porque va detrás.<br/>Regla de puntuación de un segundo: <b>si la frase empieza por «if», hay coma en medio. Si no, no hay coma.</b>",
            table: [
              ["la mitad del IF", "la mitad principal", "en español"],
              ["If it rains,", "we'll stay in.", "Si llueve, nos quedamos."],
              ["If it's nice,", "we'll have a picnic.", "Si hace bueno, hacemos un picnic."],
              ["If I have time,", "I'll call you.", "Si tengo tiempo, te llamo."],
              ["presente — NUNCA will", "will + verbo desnudo", ""],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Los dos errores de esta lección, y los dos los pone el español",
            body: "<b>ERROR 1: <i>If it will rain…</i></b><br/>En español la condición va en <b>subjuntivo</b> —«si llueve», «cuando llueva»— y el subjuntivo inglés no existe donde ponerlo, así que el aprendiz tira de futuro: <i>If it <b>will</b> rain…</i>. Es el mismo error que ya cazaste con <i>when</i>, y la vacuna es la misma frase: <b>la mitad del «if» NUNCA lleva will.</b> El futuro ya está dicho en la otra mitad, y el inglés no lo repite.<br/><br/>Un truco de revisión que funciona: antes de dar por buena una frase con <i>if</i>, cuenta los <i>will</i>. <b>Si hay dos, sobra uno, y el que sobra es el del «if».</b><br/><br/><b>ERROR 2: <i>If I would have time…</i></b><br/>Este es más interesante, porque son <b>dos interferencias a la vez</b>. Por un lado, el español estándar dice «si <b>tuviera</b> tiempo» y muchos aprendices traducen ese hueco con <i>would</i>, que es la palabra que más se parece a un condicional. Por otro, en el <b>norte de España</b> se oye «si <b>tendría</b> tiempo» con toda naturalidad — y quien lo diga así en español tiene el error ya montado antes de empezar en inglés.<br/><br/>Sea cual sea tu caso, la regla de hoy es la misma y es tajante: <b>detrás de «if» no va ni <i>will</i> ni <i>would</i>.</b> Va un presente, y punto.<br/><br/>· ❌ <i>If I would have time, I'll call you.</i><br/>· ✅ <i>If I <b>have</b> time, I'll call you.</i><br/><br/><b>Y una nota honesta:</b> el <i>would</i> tiene su sitio en inglés —hay una segunda condicional, para lo imposible y lo imaginario— pero <b>eso es B1 entero</b> y no lo vamos a abrir aquí. Lo único que te hace falta hoy es reconocer el error y no cometerlo: si la frase habla de algo que puede pasar de verdad mañana, la primera condicional te sirve y el <i>would</i> sobra.<br/><br/><b>Recuerda dónde estás:</b> esto es frontera con el B1. Se presenta, se reconoce y se produce con la frase medio puesta. <b>No entra en el simulacro.</b>",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l6e1", type: "mc", prompt: "Reconoce la condición",
              question: "“If it rains, we'll stay in.”",
              options: ["Si llueve, nos quedamos en casa", "Cuando llueva nos quedaremos en casa, seguro", "Llovió y nos quedamos en casa"],
              answer: 0,
              whyWrong: [null, "Eso sería «When it rains…»: con when la cosa se da por segura", "El pasado sería «It rained and we stayed in»"],
              itemIds: ["ena2m11ifitrains"],
              tip: "If deja la puerta abierta a las dos posibilidades. When la cierra: ya sabes que va a pasar y solo falta el cuándo.",
            },
            {
              id: "ena2m11l6e2", type: "bucket", prompt: "¿Qué mitad de la frase es? Mira si lleva futuro dentro",
              categories: ["la mitad del IF: presente, sin will", "la mitad principal: con will"],
              items: [
                { text: "If it rains…", bucket: 0 },
                { text: "…we'll stay in.", bucket: 1 },
                { text: "If I have time…", bucket: 0 },
                { text: "…I'll call you.", bucket: 1 },
                { text: "If you don't take a coat…", bucket: 0 },
                { text: "…you'll be cold.", bucket: 1 },
                { text: "If it's nice…", bucket: 0 },
                { text: "…we'll have a picnic.", bucket: 1 },
              ],
              itemIds: ["ena2m11ifitrains", "ena2m11ifihavetime", "ena2m11ifyoudonttakeacoat", "ena2m11ifitsnice"],
              tip: "Ocho mitades y ni un solo will a la izquierda. Esa es la foto de la regla: el futuro vive en una sola mitad de la frase.",
            },
            {
              id: "ena2m11l6e3", type: "cloze", prompt: "La mitad de la condición",
              text: "If it ___ tomorrow, we'll stay at home.",
              answers: ["rains"],
              translation: "Si llueve mañana, nos quedamos en casa.",
              hints: ["Presente, aunque hables de mañana — y lleva la -s de tercera persona", "If it r… tomorrow"],
              itemIds: ["ena2m11ifitrains"],
              tip: "Fíjate en la -s: «it rains». La mitad del if va en presente de verdad, con todas sus reglas, no en un presente a medias.",
            },
            {
              id: "ena2m11l6e4", type: "cloze", prompt: "La mitad principal",
              text: "If I have time, I ___ call you tonight.",
              answers: ["'ll", "will"],
              translation: "Si tengo tiempo, te llamo esta noche.",
              hints: ["Aquí sí va el futuro: es la otra mitad", "I … call you tonight."],
              itemIds: ["ena2m11ifihavetime"],
            },
            {
              id: "ena2m11l6e5", type: "errorfix", prompt: "Corrige el error nº 1 del módulo",
              wrong: "If it will rain, we'll stay in.",
              answers: ["If it rains, we'll stay in."],
              why: "El español pone subjuntivo en la condición —«si llueve»— y al traducir sale un futuro. El inglés ya ha dicho que esto es futuro en la otra mitad («we'll stay in») y no lo repite: detrás de if va presente. Es la misma regla que ya usabas con when, before y after.",
              translation: "Si llueve, nos quedamos en casa.",
              itemIds: ["ena2m11ifitrains", "ena2m6whenigetthere"],
              tip: "Cuenta los will de la frase antes de darla por buena. Si hay dos, sobra el del if.",
            },
            {
              id: "ena2m11l6e6", type: "errorfix", prompt: "Corrige el «si tendría»",
              wrong: "If I would have time, I'll call you.",
              answers: ["If I have time, I'll call you."],
              why: "Detrás de if no va ni will ni would: va un presente. El «would» sale de traducir «si tuviera» —o «si tendría», que se oye en el norte de España— con la palabra inglesa que más se le parece. Aquí no hace falta ninguna: si la cosa puede pasar de verdad mañana, basta con el presente.",
              translation: "Si tengo tiempo, te llamo.",
              itemIds: ["ena2m11ifihavetime"],
            },
            {
              id: "ena2m11l6e7", type: "transform", prompt: "Dale la vuelta a la frase",
              source: "If it rains, we'll stay in.",
              instruction: "Empieza por la mitad principal",
              answers: ["We'll stay in if it rains.", "We will stay in if it rains."],
              translation: "Nos quedamos en casa si llueve.",
              hints: ["Si el «if» no va delante, la coma desaparece", "We'll stay in i… it rains."],
              itemIds: ["ena2m11ifitrains"],
              tip: "Las dos versiones son igual de correctas y significan lo mismo. Lo único que cambia es la coma, y la coma solo aparece cuando la frase arranca con if.",
            },
            {
              id: "ena2m11l6e8", type: "build", prompt: "Construye la condicional",
              target: "If it rains we'll stay in",
              translation: "Si llueve, nos quedamos en casa",
              distractors: ["will", "would"],
              itemIds: ["ena2m11ifitrains"],
              tip: "Las dos fichas que sobran son justo las dos que no pueden entrar en la mitad del if. Están ahí a propósito.",
            },
            {
              id: "ena2m11l6e9", type: "gapbank", prompt: "El domingo de Valeria y Amy, con condiciones",
              text: "If it ___ tomorrow, we'll stay at home. If it's nice, we ___ have a picnic in the park. And if you ___ time on Saturday, we can buy the food together.",
              answers: ["rains", "will", "have"],
              bank: ["rains", "will", "have", "will rain", "would be", "has"],
              translation: "Si mañana llueve, nos quedamos en casa. Si hace bueno, hacemos un picnic en el parque. Y si el sábado tienes tiempo, compramos la comida juntas.",
              itemIds: ["ena2m11ifitrains", "ena2m11ifitsnice", "ena2m11ifihavetime", "enpicnic"],
              tip: "«Will rain» y «would be» están en el banco a propósito: son los dos errores de la nota puestos en fila. Ninguno entra en un hueco que venga detrás de if.",
            },
            {
              id: "ena2m11l6e10", type: "order", prompt: "Ordena la conversación de Valeria y Amy",
              sentences: [
                "What will you do if it rains on Sunday?",
                "If it rains, we'll stay in and watch a film.",
                "And if it's nice?",
                "If it's nice, we'll have a picnic in the park.",
                "Perfect. We'll see how it goes.",
              ],
              translation: "—¿Qué haréis si el domingo llueve? —Si llueve, nos quedamos en casa viendo una peli. —¿Y si hace bueno? —Si hace bueno, hacemos un picnic en el parque. —Perfecto. Ya veremos cómo va la cosa.",
              itemIds: ["ena2m11whatwillyoudoif", "ena2m11ifitrains", "ena2m11ifitsnice", "ena2m11wellseehowitgoes", "enwatchafilm"],
              tip: "Ese es el arco entero de un plan con plan B: pregunta, plan malo, pregunta, plan bueno, cierre. Cinco frases y ya sabes negociar un domingo.",
            },
            {
              id: "ena2m11l6e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Si no coges abrigo, vas a pasar frío.",
              answers: [
                "If you don't take a coat, you'll be cold.",
                "If you don't take a coat, you will be cold.",
                "You'll be cold if you don't take a coat.",
              ],
              hint: "la mitad de la condición va en presente, negativa incluida",
              itemIds: ["ena2m11ifyoudonttakeacoat"],
              tip: "Ojo a la negativa: «if you don't take», no «if you won't take». La mitad del if se niega como cualquier presente, con don't.",
            },
            {
              id: "ena2m11l6e12", type: "speak", prompt: "Dilo en voz alta — el plan y su plan B",
              text: "If it rains, we'll stay in. If it's nice, we'll have a picnic.",
              phonetic: "if it RÉINS̬, uíil stéi IN. if its NÁIS, uíil jav a PIK-nik",
              translation: "Si llueve, nos quedamos en casa. Si hace bueno, hacemos un picnic.",
              itemIds: ["ena2m11ifitrains", "ena2m11ifitsnice"],
              tip: "La voz sube al final de la mitad del if y baja en la principal. Marcarlo hace que se entienda dónde acaba la condición sin que haga falta la coma.",
            },
            {
              id: "ena2m11l6e13", type: "type", prompt: "Cierre de producción",
              question: "¿Qué harás si llueve? Si llueve, nos quedamos en casa. Ya veremos cómo va.",
              answers: [
                "What will you do if it rains? If it rains, we'll stay in. We'll see how it goes.",
                "What will you do if it rains? If it rains, we will stay in. We'll see how it goes.",
              ],
              hints: ["La mitad del if va en presente las dos veces", "What will you do if it r…? If it r…, we'll stay in."],
              itemIds: ["ena2m11whatwillyoudoif", "ena2m11ifitrains", "ena2m11wellseehowitgoes"],
              tip: "Fíjate en que en la pregunta también manda la regla: «if it rains», no «if it will rain». La pregunta no cambia nada.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-6",
            book: "If it rains, we will stay at home.",
            real: "If it rains, we'll just stay in.",
            meaning: "Si llueve, nos quedamos en casa y ya está",
            when: "Con amigos y en casa. «Stay in» es quedarse en casa, y es lo que dice todo el mundo; «stay at home» suena a redacción. Y ese «just» no significa «solo»: es el «y ya está» que quita hierro al plan B. En el examen, «stay at home» o «stay in», las dos valen.",
            register: "amigos",
            note: "El par es stay in / go out, y funciona igual que quedarse y salir.",
            sound: "if it RÉINS̬, uíil dchast stéi IN",
            level: "a2",
            itemId: "ena2m11ifitrains",
          },
        },
      ],
      resources: [
        { label: "British Council — conditionals 1", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/conditionals-1", note: "Lee solo el primer bloque, el de la primera condicional (4 min). En cuanto la página empiece a hablar de «second conditional», ciérrala: eso es B1 y hoy solo te haría ruido." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — probably, possibly, perhaps: los adverbios que SÍ son de A2
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l7",
      phaseId: "ena2m11",
      title: "It'll probably rain",
      subtitle: "Los tres adverbios de probabilidad — y dónde los pone el inglés, que no es donde los pone el español",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Medir la duda sin arriesgar gramática",
          itemIds: ["ena2m11itllprobablyrain", "ena2m11itprobablywont", "ena2m11possibly", "ena2m11perhapswellgo", "ena2m11imnotsure"],
        },
        {
          kind: "note",
          note: {
            title: "Estos tres SÍ son de A2, y por eso son tu red de seguridad",
            body: "Buena noticia en mitad de un módulo de frontera: <b><i>probably</i>, <i>possibly</i> y <i>perhaps</i> están en la lista de gramática del A2 de LanguageCert</b>, en el bloque de adverbios modales. No son frontera: son tuyos, puntúan y puedes usarlos libremente en el examen.<br/><br/><b>La escala, de más a menos seguro:</b><br/>· <b>definitely</b> → segurísimo, sin ninguna duda.<br/>· <b>[[It'll probably rain.|Seguramente llueva.]]</b> → muy posible. Es el que más se usa de los tres, con diferencia.<br/>· <b>[[possibly|posiblemente]]</b> · <b>[[Perhaps we'll go on Sunday.|Quizá vayamos el domingo.]]</b> · <b>maybe</b> → puede que sí, puede que no. Los tres dicen lo mismo que <i>might</i>.<br/>· <b>[[I'm not sure.|No estoy seguro.]]</b> → la salida honesta cuando no quieres comprometerte con ninguna.<br/><br/><b>Diferencia práctica entre perhaps y maybe:</b> ninguna de significado. <i>Perhaps</i> es un pelín más formal y se escribe más; <i>maybe</i> se habla más. En el examen escribe <i>perhaps</i> y quedas mejor sin arriesgar nada.<br/><br/><b>Y la jugada que te salva del módulo entero:</b> si <i>will</i> y <i>might</i> te dan respeto porque son frontera, di lo mismo con lo que ya es tuyo:<br/>· <i>It's <b>probably</b> going to rain.</i><br/>· <i><b>Perhaps</b> we're going to the park.</i><br/>Misma idea, misma nota, y con la gramática que sí evalúan.",
            table: [
              ["cuánta seguridad", "cómo se dice", "el modal equivalente"],
              ["segurísimo", "definitely", "will"],
              ["muy posible", "probably", "will (con matiz)"],
              ["puede que sí", "possibly · perhaps · maybe", "might · may"],
              ["ni idea", "I'm not sure.", "—"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Dónde se pone: la regla del módulo 3, aplicada a la duda",
            body: "El español coloca estos adverbios casi donde quiere: «seguramente llueva», «llueve, seguramente», «seguramente que va a llover». El inglés no: tiene <b>un sitio</b>, y ese sitio ya lo aprendiste en el módulo 3 con <i>often</i> y <i>always</i>.<br/><br/><b>La regla, en una línea: detrás del primer auxiliar, delante del verbo de verdad.</b><br/><br/>· con <b>will</b>: <i>It will <b>probably</b> rain.</i> · <i>It'll <b>probably</b> be cold.</i><br/>· con <b>be</b> solo: <i>It's <b>probably</b> cold.</i> — detrás del be, igual que [[He often goes to the cinema.|Va al cine a menudo.]] pero al revés, porque be manda distinto.<br/>· con un verbo normal: <i>He <b>probably</b> works late.</i> — delante del verbo.<br/><br/><b>Y ahora la excepción, que es la que se falla:</b> <b>EN NEGATIVA, <i>probably</i> SE ADELANTA</b> y se pone <b>delante</b> del <i>won't</i>:<br/>· ✅ <b>[[It probably won't rain.|Seguramente no llueva.]]</b><br/>· ❌ <i>It won't probably rain.</i><br/><br/>¿Por qué? Porque lo que estás diciendo es «es probable que NO», no «no es probable que». El adverbio se coloca delante de aquello a lo que se aplica, y aquí se aplica a la negación entera.<br/><br/><b>Perhaps y maybe juegan en otra liga:</b> no se meten dentro de la frase, sino que <b>la abren</b>. <i><b>Perhaps</b> we'll go on Sunday.</i> · <i><b>Maybe</b> it'll be sunny.</i> Y ojo, que ya lo viste en la lección 4: detrás de <i>maybe</i> tiene que ir un futuro de verdad. <i>Maybe we go</i> no dice lo que crees.<br/><br/><b>El error de forma que se cuela aquí:</b> <i>It will probably <b>to</b> rain.</i> Ese <i>to</i> no lo pone el adverbio: lo pone la costumbre española de meter infinitivo detrás de todo. Detrás de <i>will</i> el verbo va desnudo, con adverbio en medio o sin él.",
            table: [
              ["situación", "dónde va probably", "ejemplo"],
              ["con will", "detrás del will", "It'll probably rain."],
              ["con won't", "DELANTE del won't", "It probably won't rain."],
              ["con be", "detrás del be", "It's probably cold."],
              ["con verbo normal", "delante del verbo", "He probably works late."],
              ["perhaps / maybe", "al principio de la frase", "Perhaps we'll go."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l7e1", type: "mc", prompt: "Cuánta seguridad hay",
              question: "“It'll probably rain on Saturday.”",
              options: ["Es bastante probable que llueva", "Va a llover seguro", "Es muy poco probable"],
              answer: 0,
              whyWrong: [null, "Para eso bastaría «It'll rain» o «It's definitely going to rain»", "Eso sería «It probably won't rain»"],
              itemIds: ["ena2m11itllprobablyrain"],
              tip: "Probably es el escalón de «yo apostaría por esto». No es certeza, pero se le acerca mucho más que might.",
            },
            {
              id: "ena2m11l7e2", type: "bucket", prompt: "¿Delante o detrás? Mira si la frase es afirmativa o negativa",
              categories: ["afirmativa: detrás del will", "negativa: delante del won't"],
              items: [
                { text: "It'll probably rain.", bucket: 0 },
                { text: "It probably won't rain.", bucket: 1 },
                { text: "She'll probably come.", bucket: 0 },
                { text: "She probably won't come.", bucket: 1 },
                { text: "We'll probably be late.", bucket: 0 },
                { text: "We probably won't be late.", bucket: 1 },
              ],
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itprobablywont"],
              tip: "Lee la columna de la derecha en voz alta tres veces. Es un orden que el español no tiene y solo se instala repitiéndolo.",
            },
            {
              id: "ena2m11l7e3", type: "bucket", prompt: "¿Abre la frase, o se mete dentro?",
              categories: ["abre la frase: perhaps / maybe", "se mete dentro: probably / possibly"],
              items: [
                { text: "Perhaps we'll go on Sunday.", bucket: 0 },
                { text: "It'll probably rain.", bucket: 1 },
                { text: "Maybe it'll be sunny.", bucket: 0 },
                { text: "She'll possibly be late.", bucket: 1 },
                { text: "Perhaps it'll be cold.", bucket: 0 },
                { text: "We'll probably stay in.", bucket: 1 },
              ],
              itemIds: ["ena2m11perhapswellgo", "ena2m11possibly", "ena2m11itllprobablyrain", "enanothertime"],
              tip: "Perhaps y maybe son adverbios de frase entera: comentan todo lo que viene detrás. Por eso se ponen delante de todo, como un titular.",
            },
            {
              id: "ena2m11l7e4", type: "cloze", prompt: "Colócalo en la afirmativa",
              text: "Take an umbrella — it'll ___ rain this afternoon.",
              answers: ["probably"],
              translation: "Coge un paraguas: seguramente llueva esta tarde.",
              hints: ["Va entre el will y el verbo", "it'll p… rain"],
              itemIds: ["ena2m11itllprobablyrain", "ena2m11anumbrella"],
            },
            {
              id: "ena2m11l7e5", type: "cloze", prompt: "Y ahora en la negativa",
              text: "Don't worry about the picnic: it ___ won't rain.",
              answers: ["probably"],
              translation: "No te preocupes por el picnic: seguramente no llueva.",
              hints: ["En negativa se adelanta: va antes del won't", "it p… won't rain"],
              itemIds: ["ena2m11itprobablywont", "enpicnic"],
              tip: "Compara las dos frases que acabas de escribir: la palabra es la misma y ha cambiado de lado. Eso es todo lo que hay que recordar de esta lección.",
            },
            {
              id: "ena2m11l7e6", type: "errorfix", prompt: "Corrige — sobra una palabra",
              wrong: "It will probably to rain this afternoon.",
              answers: ["It will probably rain this afternoon."],
              why: "Detrás de will el verbo va desnudo, tenga un adverbio en medio o no. Ese «to» sale de la costumbre española de poner infinitivo detrás de todo, y aquí no pinta nada: el adverbio no cambia la regla del modal.",
              translation: "Seguramente llueva esta tarde.",
              itemIds: ["ena2m11itllprobablyrain"],
            },
            {
              id: "ena2m11l7e7", type: "errorfix", prompt: "Corrige el orden",
              wrong: "It won't probably rain tonight.",
              answers: ["It probably won't rain tonight."],
              why: "En negativa, probably se pone delante del won't. Lo que quieres decir es «es probable que NO llueva», y el adverbio se coloca delante de aquello a lo que se aplica: aquí, la negación entera.",
              translation: "Seguramente no llueva esta noche.",
              itemIds: ["ena2m11itprobablywont"],
              tip: "Es el mismo tipo de decisión que ya tomaste en el módulo 3 con la posición del adverbio: el inglés no lo pone donde suena bien, lo pone donde significa lo que quieres.",
            },
            {
              id: "ena2m11l7e8", type: "transform", prompt: "Dilo con el adverbio en vez de con el modal",
              source: "It might rain this afternoon.",
              instruction: "Dilo con perhaps y un futuro",
              answers: ["Perhaps it'll rain this afternoon.", "Perhaps it will rain this afternoon."],
              translation: "Quizá llueva esta tarde.",
              hints: ["Perhaps abre la frase, y detrás hace falta un futuro de verdad", "P… it'll rain this afternoon."],
              itemIds: ["ena2m11perhapswellgo", "ena2m11itmightrain"],
              tip: "Ojo al detalle que decide: «Perhaps it rains» no vale. El adverbio no marca futuro, así que el will sigue haciendo falta.",
            },
            {
              id: "ena2m11l7e9", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "It will probably rain on Sunday.",
              forbid: ["probably", "will"],
              answers: [
                "It might rain on Sunday.",
                "I think it's going to rain on Sunday.",
              ],
              translation: "Seguramente llueva el domingo.",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itmightrain"],
              tip: "Las dos salidas son las dos rutas del módulo: la del modal y la de la opinión con going to. Ten las dos y no te quedas callado nunca.",
            },
            {
              id: "ena2m11l7e10", type: "audiomc", prompt: "El sábado de Nora — pregunta primero, audio después",
              audio: "I'm not sure about Saturday, dear. It'll probably be chilly in the morning, so I probably won't go to the market. Perhaps I'll go on Sunday instead, if it's sunny.",
              question: "¿Qué va a hacer Nora el sábado?",
              options: ["Seguramente no ir al mercado", "Ir al mercado por la mañana", "Quedarse en casa seguro, sin duda"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice lo contrario: «I probably won't go to the market»", "«Probably» no es seguridad: es una apuesta, no una certeza"],
              itemIds: ["ena2m11itprobablywont", "ena2m11chilly", "ena2m11perhapswellgo", "ena2m11imnotsure"],
              tip: "Tres adverbios en tres frases, y cada uno en su sitio: detrás del will, delante del won't y abriendo la frase. El audio es la nota entera dicha en voz alta.",
            },
            {
              id: "ena2m11l7e11", type: "speak", prompt: "Dilo en voz alta — la duda medida",
              text: "It'll probably be chilly, but it probably won't rain. Perhaps we'll go anyway.",
              phonetic: "Í-tol PRO-bli bi CHÍ-li, bat it PRO-bli UÓUNT réin. pa-JAPS uíil góu É-ni-uei",
              translation: "Seguramente haga fresquito, pero seguramente no llueva. Quizá vayamos igualmente.",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itprobablywont", "ena2m11perhapswellgo", "ena2m11chilly"],
              tip: "Acuérdate de la clínica: probably son dos sílabas, «PRO-bli». Dicho con tres, esta frase suena a alumno leyendo.",
            },
            {
              id: "ena2m11l7e12", type: "type", prompt: "Cierre de producción",
              question: "Seguramente llueva el sábado, pero seguramente no llueva el domingo. Quizá vayamos el domingo.",
              answers: [
                "It'll probably rain on Saturday, but it probably won't rain on Sunday. Perhaps we'll go on Sunday.",
                "It will probably rain on Saturday, but it probably won't rain on Sunday. Perhaps we will go on Sunday.",
              ],
              hints: ["Detrás del will · delante del won't · perhaps abre la frase", "It'll p… rain on Saturday, but it p… won't rain on Sunday."],
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itprobablywont", "ena2m11perhapswellgo"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — adverbs of probability", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/adverbials-probability", note: "Tres minutos, y lee sobre todo los ejemplos de posición. Es el único apartado de este módulo que entra entero en tu examen: merece la pena mirarlo dos veces." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — el plan B: avisar, esperar y salir del paso
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l8",
      phaseId: "ena2m11",
      title: "Take an umbrella, just in case",
      subtitle: "Avisar de lo que viene, decir lo que esperas y tener siempre un plan B",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "El aviso, la esperanza y la salida",
          itemIds: ["ena2m11takeanumbrella", "ena2m11becarefulicy", "ena2m11ihopeitdoesntrain", "ena2m11ihopeso", "ena2m11ifnotwellgo", "ena2m11wewontbelong"],
        },
        {
          kind: "note",
          note: {
            title: "Avisar: primero qué hacer, y luego por qué",
            body: "Un aviso en inglés tiene <b>dos piezas</b>, siempre en el mismo orden, y las dos ya las tienes:<br/><br/><b>1. Qué hacer</b> → imperativo, que traes del A1: <i>Take…</i>, <i>Be careful…</i>, <i>Don't forget…</i><br/><b>2. Por qué</b> → la razón, en futuro o con might: <i>…it'll be icy</i>, <i>…it might rain</i>.<br/><br/>· <b>[[Take an umbrella, just in case.|Coge un paraguas, por si acaso.]]</b><br/>· <b>[[Be careful — the roads will be icy.|Ten cuidado: las carreteras estarán heladas.]]</b><br/>· <i>Don't forget your jacket — it'll be chilly tonight.</i><br/><br/><b><i>Just in case</i></b> es la joya de la lección: significa «por si acaso» y sirve para cerrar cualquier consejo sin dar explicaciones. Se pone al final, con coma delante, y no lleva nada detrás. <i>Take some money, just in case.</i><br/><br/><b>Ojo con el registro.</b> El imperativo pelado en inglés es normal entre amigos y en carteles, pero áspero con un desconocido. Si estás con alguien a quien no conoces, envuélvelo con lo que aprendiste en el módulo 5: <i>You might want to take an umbrella</i> o <i>I'd take an umbrella if I were you</i> — esta última déjala solo para reconocerla, que ya es B1.<br/><br/><b>Y el plan B, que es de lo que va el módulo:</b> cuando propongas algo con condición, ten siempre la salida preparada. La fórmula más corta que existe es <b>[[If not, we'll go to the cinema.|Si no, nos vamos al cine.]]</b> — cuatro palabras que resuelven cualquier plan que se tuerza.",
          },
        },
        {
          kind: "note",
          note: {
            title: "I hope: la excepción que se comporta como el español, y el «so» que ahorra la frase",
            body: "En la lección 2 viste que el inglés niega la opinión al revés («I don't think it will rain»). <b>Con <i>hope</i> no</b>: aquí la negación se queda donde el español la pone.<br/><br/>· <b>[[I hope it doesn't rain.|Espero que no llueva.]]</b> ✅ — nunca <i>I don't hope it rains</i>.<br/><br/>Y hay una segunda cosa que sorprende: <b>detrás de <i>hope</i> va PRESENTE</b>, aunque estés hablando de mañana. <i>I hope it doesn't rain <b>tomorrow</b></i>. Es la misma economía de siempre: el «mañana» ya dice que es futuro, y el inglés no lo repite. <i>I hope it won't rain</i> también existe y no está mal, pero lo normal es el presente.<br/><br/><b>El error que hay que matar es el del sujeto.</b> «Espero que no llueva» no tiene sujeto en español, y al traducir se cae: <i>I hope doesn't rain</i>. Falta el <b>it</b>, el mismo relleno obligatorio de la lección 3. Sin él, la frase dice que eres tú quien no llueve.<br/><br/><b>Y ahora la pieza más rentable de la lección: <i>so</i> y <i>not</i>.</b> Cuando alguien te pregunta algo y quieres contestar «espero que sí» o «espero que no», el inglés <b>no repite la frase</b>: la sustituye por una palabra.<br/><br/>· «Will it be sunny?» → <b>[[I hope so.|Ojalá.]]</b> — nunca <i>I hope yes</i>.<br/>· «Will it rain?» → <b>I hope not.</b><br/><br/>Y el mismo truco funciona con otros verbos: <i>I think so</i> · <i>I don't think so</i> · <i>I'm afraid so</i> · <i>I'm afraid not</i>. Son cuatro respuestas de dos palabras que puedes soltar en cualquier conversación, y en el oral valen oro: contestas rápido, contestas bien y ganas tiempo para pensar la frase siguiente.",
            table: [
              ["te preguntan", "si esperas que sí", "si esperas que no"],
              ["Will it be sunny?", "I hope so.", "I hope not."],
              ["Will it rain?", "I hope so.", "I hope not."],
              ["Is it going to be cold?", "I think so.", "I don't think so."],
              ["Are we late?", "I'm afraid so.", "I'm afraid not."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l8e1", type: "mc", prompt: "Reconoce el aviso",
              question: "Nora le dice a Valeria: “Take an umbrella, just in case.”",
              options: ["Coge un paraguas, por si acaso", "Coge un paraguas solo en este caso", "Coge un paraguas en esa caja"],
              answer: 0,
              whyWrong: [null, "«Just in case» es una expresión hecha: significa «por si acaso», no «solo en este caso»", "Case es también «caja», sí, pero aquí forma parte de la expresión entera"],
              itemIds: ["ena2m11takeanumbrella"],
              tip: "«Just in case» va siempre al final y no lleva nada detrás. Es un punto y final, no el principio de una explicación.",
            },
            {
              id: "ena2m11l8e2", type: "bucket", prompt: "¿Cómo contestarías: esperando que sí, o esperando que no?",
              categories: ["I hope so.", "I hope not."],
              items: [
                { text: "Will it be sunny for the picnic?", bucket: 0 },
                { text: "Will it rain on Sunday?", bucket: 1 },
                { text: "Will the shop be open?", bucket: 0 },
                { text: "Will the roads be icy tonight?", bucket: 1 },
                { text: "Will Amy come with us?", bucket: 0 },
                { text: "Will it be freezing tomorrow?", bucket: 1 },
              ],
              itemIds: ["ena2m11ihopeso", "ena2m11becarefulicy", "ena2m11freezing"],
              tip: "Fíjate en que la respuesta no repite ni una palabra de la pregunta. Ese es el ahorro: dos palabras cubren una frase entera.",
            },
            {
              id: "ena2m11l8e3", type: "cloze", prompt: "Detrás de hope, presente",
              text: "I hope it ___ rain tomorrow — we've got the picnic.",
              answers: ["doesn't", "does not"],
              translation: "Espero que mañana no llueva: tenemos el picnic.",
              hints: ["Presente negativo, aunque hables de mañana", "I hope it d… rain tomorrow."],
              itemIds: ["ena2m11ihopeitdoesntrain", "enpicnic"],
            },
            {
              id: "ena2m11l8e4", type: "errorfix", prompt: "Corrige — falta el sujeto de relleno",
              wrong: "I hope doesn't rain tomorrow.",
              answers: ["I hope it doesn't rain tomorrow."],
              why: "«Espero que no llueva» no tiene sujeto en español, y al traducir se cae. En inglés hace falta el «it» de siempre: sin él, la frase dice que eres tú quien no llueve. Es el mismo it de «It's cold» y «It will rain».",
              translation: "Espero que mañana no llueva.",
              itemIds: ["ena2m11ihopeitdoesntrain"],
            },
            {
              id: "ena2m11l8e5", type: "errorfix", prompt: "Corrige la respuesta corta",
              wrong: "I hope yes.",
              answers: ["I hope so."],
              why: "El inglés no contesta «sí» detrás de hope: sustituye la frase entera por «so». Y para el no, por «not». Funciona igual con think y con afraid: I think so, I don't think so, I'm afraid not.",
              translation: "Ojalá. / Espero que sí.",
              itemIds: ["ena2m11ihopeso"],
              tip: "«I hope yes» es de los errores que más delatan, porque aparece en la primera conversación. Cuatro fórmulas —so, not, think so, afraid so— y te la quitas de encima para siempre.",
            },
            {
              id: "ena2m11l8e6", type: "gapbank", prompt: "Valeria avisa a Amy antes de salir",
              text: "Take an umbrella, ___ in case. It ___ rain this afternoon, and if it does, we ___ go to the cinema instead.",
              answers: ["just", "might", "will"],
              bank: ["just", "might", "will", "only", "must", "won't"],
              translation: "Coge un paraguas, por si acaso. Puede que llueva esta tarde y, si llueve, nos vamos al cine.",
              itemIds: ["ena2m11takeanumbrella", "ena2m11itmightrain", "ena2m11ifnotwellgo", "enletsgotothecinema"],
              tip: "Los tres huecos son las tres piezas del plan B: el aviso, la posibilidad y la salida. Cópiate esa plantilla, que la vas a usar en la lección 9.",
            },
            {
              id: "ena2m11l8e7", type: "match", prompt: "Empareja cada aviso con su razón",
              pairs: [
                { target: "Take an umbrella.", source: "Puede que llueva" },
                { target: "Be careful.", source: "Las carreteras estarán heladas" },
                { target: "Don't forget your jacket.", source: "Hará fresquito esta noche" },
                { target: "We won't be long.", source: "Volvemos enseguida" },
              ],
              itemIds: ["ena2m11takeanumbrella", "ena2m11becarefulicy", "ena2m11wewontbelong", "enjacket"],
            },
            {
              id: "ena2m11l8e8", type: "order", prompt: "Ordena la conversación de Amy y Valeria",
              sentences: [
                "Are we still going to the park on Sunday?",
                "I hope so! But it might rain in the afternoon.",
                "And if it rains?",
                "If not, we'll go to the cinema instead.",
                "Perfect. Let me know on Saturday.",
              ],
              translation: "—¿Seguimos con lo del parque el domingo? —¡Ojalá! Pero puede que llueva por la tarde. —¿Y si llueve? —Si no, nos vamos al cine. —Perfecto. Ya me dirás el sábado.",
              itemIds: ["ena2m11ihopeso", "ena2m11itmightrain", "ena2m11ifnotwellgo", "ena2m11letmeknow", "enpark"],
              tip: "Ahí tienes un plan B entero en cinco frases, y solo una de ellas es larga. Negociar un domingo en inglés no pide más que esto.",
            },
            {
              id: "ena2m11l8e9", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Ten cuidado: las carreteras estarán heladas. Espero que no nieve.",
              answers: [
                "Be careful — the roads will be icy. I hope it doesn't snow.",
                "Be careful, the roads will be icy. I hope it doesn't snow.",
                "Be careful — the roads will be icy. I hope it won't snow.",
              ],
              hint: "detrás de hope hace falta un sujeto que el español no pone",
              itemIds: ["ena2m11becarefulicy", "ena2m11ihopeitdoesntrain", "enitssnowing"],
            },
            {
              id: "ena2m11l8e10", type: "audiomc", prompt: "Ben avisa a Valeria — pregunta primero, audio después",
              audio: "Listen, if you're getting the bus tonight, take an umbrella just in case. It probably won't rain before nine, but it'll be freezing after that. And be careful on Palmer Road — the roads will be icy.",
              question: "¿De qué avisa Ben para después de las nueve?",
              options: ["De que hará muchísimo frío", "De que lloverá mucho", "De que no habrá autobuses"],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "Dice justo lo contrario de la lluvia: «It probably won't rain»", "Los autobuses no salen en ningún momento del audio"],
              itemIds: ["ena2m11takeanumbrella", "ena2m11itprobablywont", "ena2m11freezing", "ena2m11becarefulicy"],
              tip: "En un aviso, lo importante siempre va detrás del «but». Ben empieza descartando la lluvia y ahí es donde llega lo que de verdad quiere decirte.",
            },
            {
              id: "ena2m11l8e11", type: "speak", prompt: "Dilo en voz alta — el aviso completo",
              text: "Take an umbrella, just in case. I hope it doesn't rain, but if it does, we'll go to the cinema.",
              phonetic: "téik an am-BRE-la, dchast in KÉIS. ái JÓUP it DA-s̬ent réin, bat if it DAS̬, uíil góu tu de SÍ-ne-ma",
              translation: "Coge un paraguas, por si acaso. Espero que no llueva, pero si llueve nos vamos al cine.",
              itemIds: ["ena2m11takeanumbrella", "ena2m11ihopeitdoesntrain", "ena2m11ifnotwellgo"],
              tip: "Ese «if it does» del final sustituye a «if it rains» sin repetir el verbo. Es el mismo ahorro que «I hope so», y suena muy nativo por poco esfuerzo.",
            },
            {
              id: "ena2m11l8e12", type: "type", prompt: "Cierre de producción",
              question: "¿Lloverá el domingo? Espero que no. Coge un paraguas, por si acaso.",
              answers: [
                "Will it rain on Sunday? I hope not. Take an umbrella, just in case.",
                "Will it rain on Sunday? I hope not! Take an umbrella, just in case.",
              ],
              hints: ["La respuesta corta con not · el aviso termina en «just in case»", "Will it rain on Sunday? I hope n… Take an umbrella, j… in case."],
              itemIds: ["ena2m11ihopeso", "ena2m11takeanumbrella", "ena2m11willitbecold"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-8",
            book: "I hope so.",
            real: "Fingers crossed!",
            meaning: "¡A ver si hay suerte! / ¡Crucemos los dedos!",
            when: "Con amigos y compañeros, para desear que algo salga bien: el tiempo, una entrevista, un tren que llega. Se dice y se hace el gesto a la vez. Por escrito aparece en mensajes, nunca en un email de examen: ahí escribe «I hope so» o «Let's hope so».",
            register: "amigos",
            note: "En Reino Unido se cruzan dos dedos de la misma mano; el gesto español de tocar madera no se usa.",
            sound: "FING-gas̬ KROST",
            level: "a2",
            itemId: "ena2m11ihopeso",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Busca cualquier audio donde alguien quede con alguien y cuenta las veces que sale un «if» o un «hope». En una conversación de plan no baja de tres." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — cierre: el plan con su plan B, y el puente al módulo de examen
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m11l9",
      phaseId: "ena2m11",
      title: "Your plan B, in one minute",
      subtitle: "Todo el módulo junto — y las tres fórmulas que te llevas al módulo de examen",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar el plan",
          itemIds: ["ena2m11whatevertheweather", "ena2m11letmeknow", "ena2m11wellseehowitgoes", "ena2m1howaboutyou"],
        },
        {
          kind: "note",
          note: {
            title: "Un plan con plan B se monta con cuatro bloques",
            body: "El minuto del oral que ya trabajaste en los módulos 1 y 6 vale igual aquí; solo cambian los bloques. Con estos cuatro no te quedas callada:<br/><br/><b>1. El plan.</b> Con la gramática que ya es tuya —<i>going to</i> o continuo— y una fecha: <i>On Sunday we're going to the park with Amy.</i><br/><b>2. Lo que hará el tiempo.</b> Aquí entra lo de hoy: <i>[[It'll probably rain.|Seguramente llueva.]]</i> · <i>[[It might rain.|Puede que llueva.]]</i> · <i>It'll be chilly.</i><br/><b>3. El plan B, con if.</b> <i>[[If it rains, we'll stay in.|Si llueve, nos quedamos en casa.]]</i> · <i>[[If not, we'll go to the cinema.|Si no, nos vamos al cine.]]</i><br/><b>4. El cierre.</b> <i>[[We'll see how it goes.|Ya veremos cómo va la cosa.]]</i> · <i>[[Let me know.|Ya me dirás.]]</i> · <i>[[How about you?|¿Y tú?]]</i><br/><br/><b>Las tres cosas que el corrector va a mirar</b>, y las tres son de este módulo: que la mitad del <i>if</i> <b>no lleve futuro dentro</b>, que <i>probably</i> esté <b>en su sitio</b> (detrás del will, delante del won't) y que detrás de un modal el verbo vaya <b>desnudo</b>, sin <i>to</i>. Si eso está limpio, lo demás lo tienes desde el módulo 6.",
            table: [
              ["bloque", "qué dices", "ejemplo"],
              ["1. el plan", "going to o continuo + fecha", "On Sunday we're going to the park."],
              ["2. el tiempo", "will · might · probably", "It'll probably be chilly."],
              ["3. el plan B", "if + presente ‖ will + verbo", "If it rains, we'll stay in."],
              ["4. el cierre", "fórmula corta", "Let me know. How about you?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Qué te llevas de aquí, y qué te dejas",
            body: "Este módulo cierra el A2 antes del de examen, así que conviene dejar la cuenta clara.<br/><br/><b>Lo que te llevas y vas a reciclar en el módulo 12</b>, sin que nadie te lo vuelva a explicar:<br/>· <b>If it rains, we'll…</b> — la condición y su consecuencia.<br/>· <b>We might…</b> — la posibilidad sin mojarse.<br/>· <b>It'll probably…</b> — la apuesta medida.<br/>· <b>I hope so. / I hope not.</b> — las dos respuestas de dos palabras.<br/>· <b>I don't think it will…</b> — la opinión negada al revés.<br/>Con esas cinco puedes contestar cualquier pregunta de la Parte 2 del oral sobre planes, y montar el Writing de un plan con su alternativa sin pensar la estructura.<br/><br/><b>Lo que te dejas aquí, y no pasa nada:</b> este módulo era <b>frontera</b>. <i>will</i>, <i>might</i>, <i>may</i> y la primera condicional están en la lista de B1 de LanguageCert y <b>no aparecen en el simulacro</b>. Si el domingo antes del examen te dan pereza, sáltalos: no te van a preguntar por ellos. Lo que sí es tuyo y sí puntúa son <b>probably, possibly y perhaps</b>, el vocabulario del parte del tiempo y todo lo que traías de los módulos 1 al 9.<br/><br/><b>Y una cosa que sí vale para el examen aunque no la produzcas:</b> el Listening y el Reading del A2 <b>están llenos de <i>will</i> y de <i>if</i></b>, porque los escriben ingleses hablando como ingleses. Reconocerlos —que es lo que has hecho estas nueve lecciones— es puntuación directa aunque no escribas ni un <i>will</i> en tu vida.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m11l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya es tuyo",
              pairs: [
                { target: "If it rains, we'll stay in.", source: "Si llueve, nos quedamos en casa" },
                { target: "It might rain.", source: "Puede que llueva" },
                { target: "It'll probably rain.", source: "Seguramente llueva" },
                { target: "I hope not.", source: "Espero que no" },
                { target: "Let me know.", source: "Ya me dirás" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m11ifitrains", "ena2m11itmightrain", "ena2m11itllprobablyrain", "ena2m11ihopeso", "ena2m11letmeknow"],
              tip: "Esas cinco son literalmente las que te pide el módulo 12. Lo que salga solo aquí, ya no hay que estudiarlo.",
            },
            {
              id: "ena2m11l9e2", type: "bucket", prompt: "Espiral: ¿cuánta seguridad hay en cada frase?",
              categories: ["lo da por hecho", "no se moja"],
              items: [
                { text: "It'll rain tomorrow.", bucket: 0 },
                { text: "It might rain tomorrow.", bucket: 1 },
                { text: "It's going to rain — look at the clouds.", bucket: 0 },
                { text: "Perhaps it'll rain tomorrow.", bucket: 1 },
                { text: "It won't rain tonight.", bucket: 0 },
                { text: "I'm not sure about tomorrow.", bucket: 1 },
                { text: "I'm sure it'll be fine.", bucket: 0 },
                { text: "It may be cold later.", bucket: 1 },
              ],
              itemIds: ["ena2m11itwillrain", "ena2m11itmightrain", "ena2m6itsgoingtorain", "ena2m11perhapswellgo", "ena2m11imnotsure", "ena2m11imsureitllbefine", "ena2m11itmaybecold"],
              tip: "Ocho frases y una sola diferencia: la pieza que va delante del verbo. Eso es todo lo que el inglés necesita para medir la certeza.",
            },
            {
              id: "ena2m11l9e3", type: "errorfix", prompt: "Corrige el error nº 1 del módulo",
              wrong: "If it will rain on Sunday, we'll go to the cinema.",
              answers: ["If it rains on Sunday, we'll go to the cinema."],
              why: "La mitad del if nunca lleva will: el futuro ya está dicho en la otra mitad. Es la misma regla que usabas con when y before en el módulo 6, y el mismo motivo — una frase, una marca de futuro.",
              translation: "Si el domingo llueve, nos vamos al cine.",
              itemIds: ["ena2m11ifitrains", "ena2m11ifnotwellgo"],
              tip: "Truco de revisión, por última vez: cuenta los will de la frase. Si hay dos, sobra el del if.",
            },
            {
              id: "ena2m11l9e4", type: "errorfix", prompt: "Corrige el orden del adverbio",
              wrong: "It won't probably be cold on Sunday.",
              answers: ["It probably won't be cold on Sunday."],
              why: "En negativa, probably se adelanta al won't: estás diciendo «es probable que NO», y el adverbio va delante de aquello a lo que se aplica. En afirmativa es al revés: «It'll probably be cold».",
              translation: "Seguramente no haga frío el domingo.",
              itemIds: ["ena2m11itprobablywont"],
            },
            {
              id: "ena2m11l9e5", type: "gapbank", prompt: "El domingo de Valeria, con su plan B",
              text: "On Sunday we're going to the park. It'll ___ be chilly, but it probably ___ rain. And if it ___, we'll go to the cinema instead.",
              answers: ["probably", "won't", "rains"],
              bank: ["probably", "won't", "rains", "perhaps", "doesn't", "will rain"],
              translation: "El domingo vamos al parque. Seguramente haga fresquito, pero seguramente no llueva. Y si llueve, nos vamos al cine.",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itprobablywont", "ena2m11ifitrains", "ena2m11chilly"],
              tip: "«Will rain» está en el banco por lo mismo de siempre: es la ficha que jamás entra detrás de un if. Y «perhaps» tampoco cabe dentro de la frase, porque perhaps abre.",
            },
            {
              id: "ena2m11l9e6", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Seguramente llueva el domingo. Si llueve, nos quedamos en casa.",
              answers: [
                "It'll probably rain on Sunday. If it rains, we'll stay in.",
                "It will probably rain on Sunday. If it rains, we will stay in.",
                "It'll probably rain on Sunday. If it rains, we'll stay at home.",
              ],
              hint: "el adverbio va entre el futuro y el verbo; la mitad del if, en presente",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11ifitrains"],
            },
            {
              id: "ena2m11l9e7", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "I don't think it will be cold, but take a jacket just in case.",
              answers: [
                "Creo que no hará frío, pero coge una chaqueta por si acaso.",
                "No creo que haga frío, pero llévate una chaqueta por si acaso.",
              ],
              itemIds: ["ena2m11idontthinkitwill", "ena2m11takeanumbrella", "enjacket"],
              tip: "Dos cosas del módulo en una frase: la negación que se va al «creo» y el «just in case» que cierra el aviso. Si las dos te salieron solas, el módulo está.",
            },
            {
              id: "ena2m11l9e8", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "We might go to the park.",
              forbid: ["might", "go"],
              answers: [
                "Maybe we'll visit the park.",
                "Perhaps we'll walk in the park.",
              ],
              translation: "Igual vamos al parque.",
              itemIds: ["ena2m11wemightgo", "ena2m11perhapswellgo"],
              tip: "Rodear una palabra que no te sale es lo que más te va a salvar en el oral. Y fíjate en que las dos salidas siguen llevando un futuro detrás del adverbio: sin él, la frase se iría al presente.",
            },
            {
              id: "ena2m11l9e9", type: "audiomc", prompt: "El plan de Amy, con cuaderno — pregunta primero",
              audio: "Right, so the plan for Saturday. We're meeting at the bus stop at ten. The forecast says sunny spells in the morning and showers after four, so it'll probably be fine for the walk. If it rains before we leave, we won't go — we'll stay at my flat and watch a film. I'll text you at nine either way.",
              question: "¿Qué pasará si llueve antes de salir?",
              options: [
                "Se quedan en el piso de Amy",
                "Van igualmente y se llevan paraguas",
                "Lo dejan para el domingo",
              ],
              answer: 0,
              plays: 2,
              notepad: true,
              whyWrong: [null, "El audio dice «we won't go»: no van", "El domingo no sale en ningún momento"],
              itemIds: ["ena2m11ifitrains", "ena2m11sunnyspells", "ena2m11showers", "ena2m11itllprobablyrain"],
              tip: "Cuando un audio trae un plan con condición, la respuesta casi siempre está detrás del «if». Apunta lo que venga después y tienes el ejercicio hecho.",
            },
            {
              id: "ena2m11l9e10", type: "write", prompt: "Mándale a Emma tu plan con su plan B — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te escribe: «What are you doing at the weekend? Is the weather any good down there?» Contéstale por email con el plan y con lo que haréis si el tiempo se estropea.",
              bullets: [
                "Di el plan, con going to o con el presente continuo, y pon un día",
                "Di lo que crees que hará el tiempo (will, might o probably)",
                "Di el plan B, con una frase que empiece por if",
              ],
              checks: [
                { re: "\\b(going to \\w+|(?:'m|am|'re|are|is|'s)\\s+\\w+ing)\\b", label: "el plan con going to o continuo" },
                { re: "\\b(will|'ll|won't|might|may|probably|possibly|perhaps)\\b", label: "una predicción sobre el tiempo" },
                { re: "\\bif\\s+(it|we|you|i|she|he|they)\\b", label: "un plan B con if" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi Emma! We're going to the park on Sunday and we're meeting Amy at twelve. It'll probably be chilly, but I don't think it will rain. If it rains, we'll go to the cinema instead. Let me know! Valeria",
              itemIds: ["ena2m11ifitrains", "ena2m11itllprobablyrain", "ena2m11idontthinkitwill", "ena2m11letmeknow", "ena2m6weremeetingamyatsix"],
              tip: "Antes de darle a corregir, revisa una sola cosa: que la mitad del «if» no lleve ningún will dentro. Es el error que más caro sale de todo el módulo, y es el único que se caza mirando.",
            },
            {
              id: "ena2m11l9e11", type: "monologue", prompt: "El minuto de verdad: tu próximo plan, con su plan B",
              topic: "Un plan tuyo de esta semana y qué harás si el tiempo lo estropea",
              slides: [
                { title: "1. El plan", hint: "Con going to o continuo, y con día: On Saturday I'm going to… / Next week I'm meeting…" },
                { title: "2. El tiempo", hint: "It'll probably be… / It might rain / I don't think it will be cold." },
                { title: "3. El plan B", hint: "If it rains, I'll… / If not, we'll… / We might go to the cinema instead." },
                { title: "4. El cierre", hint: "We'll see how it goes. I hope it doesn't rain. How about you?" },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He dicho el plan con going to o con el presente continuo, y con un día concreto",
                "He usado al menos una predicción del tiempo (will, might o probably)",
                "He dicho una frase entera con if",
                "Dentro de la mitad del if NO he puesto ningún will ni ningún would",
                "He cerrado con una fórmula corta y con «How about you?»",
              ],
              model: "On Saturday I'm going to the market with Nora, and after that we're having lunch at her flat. The forecast isn't great: it'll probably be chilly and there might be showers in the afternoon. I don't think it will rain in the morning, so we'll be fine at the market. But if it rains before ten, we won't go — we'll stay in and cook something instead. I hope it doesn't rain, because I want to buy fruit for the week. We'll see how it goes. How about you?",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11itmightrain", "ena2m11ifitrains", "ena2m11ihopeitdoesntrain", "ena2m11wellseehowitgoes"],
              tip: "Grábate las dos veces y cuenta casillas, no lo bonito que ha sonado. La segunda pasada siempre sale más suelta: esa es la que se parece al examen.",
            },
            {
              id: "ena2m11l9e12", type: "speak", prompt: "Dilo en voz alta — el módulo entero en tres frases",
              text: "It'll probably be chilly on Sunday. If it rains, we'll stay in. Let me know!",
              phonetic: "Í-tol PRO-bli bi CHÍ-li on SAN-dei. if it RÉINS̬, uíil stéi IN. let mi NÓU",
              translation: "Seguramente el domingo haga fresquito. Si llueve, nos quedamos en casa. ¡Ya me dirás!",
              itemIds: ["ena2m11itllprobablyrain", "ena2m11ifitrains", "ena2m11letmeknow"],
              tip: "Tres frases, tres cosas del módulo: la apuesta medida, la condición y el cierre. Si te salen seguidas y sin pensar, ya tienes el plan B en inglés.",
            },
            {
              id: "ena2m11l9e13", type: "type", prompt: "Cierre del módulo",
              question: "Seguramente llueva el domingo. Si llueve, nos vamos al cine. Ya me dirás.",
              answers: [
                "It'll probably rain on Sunday. If it rains, we'll go to the cinema. Let me know.",
                "It will probably rain on Sunday. If it rains, we will go to the cinema. Let me know.",
              ],
              hints: ["El adverbio entre el futuro y el verbo · la mitad del if en presente", "It'll p… rain on Sunday. If it r…, we'll go to the cinema."],
              itemIds: ["ena2m11itllprobablyrain", "ena2m11ifitrains", "ena2m11letmeknow"],
              tip: "Ahí está el módulo entero. Y ahí se cierra la frontera: lo que viene ahora es el módulo 12, que no enseña nada nuevo — solo afila lo que ya tienes y te lleva al examen. Llueva o no llueva.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m11-9",
            book: "We will go whatever the weather is.",
            real: "We're going, rain or shine.",
            meaning: "Vamos, llueva o no llueva",
            when: "Con amigos y compañeros, para decir que el plan no se cancela pase lo que pase. Es de las expresiones más comunes del inglés británico y aparece en carteles de mercadillos y de fiestas de barrio. En el examen escribe «whatever the weather»: dice lo mismo y es igual de correcta.",
            register: "neutral",
            note: "No se dice «rain or sun»: la pareja fija es rain or shine, y se queda así.",
            sound: "uía GÓU-ing, RÉIN oo SHÁIN",
            level: "a2",
            itemId: "ena2m11whatevertheweather",
          },
        },
      ],
      resources: [
        { label: "BBC Weather — Londres", url: "https://www.bbc.co.uk/weather", note: "Escribe esta noche el parte de mañana de tu ciudad en cuatro líneas, copiando la plantilla de la lección 3. Es la práctica más barata que hay: cinco minutos y sale un texto entero." },
        { label: "British Council — A2 Speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca el vídeo de «making arrangements» y ensaya encima tu minuto: 30 segundos de papel, noventa de habla y una segunda pasada. Siempre dos veces." },
      ],
    },
  ],
};
