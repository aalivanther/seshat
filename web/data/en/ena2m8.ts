import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 8 — Where does it hurt?: el cuerpo, la consulta y el
// consejo que sí es de A2. Sigue el listón del piloto `ena2m1`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): el consejo SIN `should` — `Why don't
// you…?` · `You need to…` · el imperativo · `have to`. Y `should / shouldn't`
// entra solo como FRONTERA, en la L9. Funciones: dar consejo, expresar
// sentimientos con su razón y pedir ayuda.
//
// LA DECISIÓN DEL MÓDULO — EL CONSEJO SE ENSEÑA SIN `should`, Y ES A
// PROPÓSITO. Todos los manuales meten `should` en A2 porque es la traducción
// cómoda de «deberías». El sílabo oficial no: `should` está en la columna del
// B1. Así que aquí el consejo se produce con las cuatro herramientas que SÍ
// son de A2 —`Why don't you…?`, `You need to…`, el imperativo y `have to`— y
// `should` se presenta al final para RECONOCERLO, sin examinarlo y sin exigir
// producirlo. Quien llegue al B1 con las cuatro instaladas dirá «should» al
// día siguiente; quien llegue solo con «should» no sabrá decirlo de ninguna
// otra manera, que es justo lo que el examen oral castiga.
//
// POR QUÉ VA AQUÍ (PLAN-EN-A2 §4.2): el consejo es una obligación suavizada.
// El m7 acaba de instalar `must` y `have to` para las normas, así que aquí la
// ESCALA DE FUERZA se ve de un vistazo (L7): must > have to > need to > why
// don't you. Se engancha a lo del m7, no se re-explica. Y salud es, con
// servicios, uno de los dos huecos limpios que deja el A1 (§3.2): aquí hay
// poco que reciclar y mucho que crear.
//
// EL REPARTO CON EL m7, QUE SE ESCRIBE A LA VEZ: este módulo se queda con la
// CONSULTA y la FARMACIA (pedir cita, contar el síntoma, la receta, el
// mostrador del chemist's); el trámite administrativo, las señales y los
// servicios de emergencia son del m7. Por eso aquí no hay ni un 999 ni una
// comisaría.
//
// LO QUE SE HEREDA Y NO SE REABRE: el pasado quedó cerrado en `ena2m2` (aquí
// se USA para contar el accidente, no se enseña); la posición del adverbio se
// enseñó en `ena2m3l6` y aquí solo se referencia («It really hurts», nunca
// «It hurts really much»); los determinantes están en `ena2m4`; y la escalera
// de cortesía `Can I → Could I` está instalada en `ena2m5` L8, así que este
// módulo NO vuelve a explicar por qué el imperativo pelado suena mal — lo da
// por sabido y lo cobra en la petición de cita de la L4. Ojo con una cosa: el
// imperativo que este módulo enseña en la L6 es el del CONSEJO entre iguales
// («Go to bed and rest») y el de la instrucción médica («Take a deep breath»),
// que son los dos sitios donde el inglés sí lo usa sin envolverlo.
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: la vocal larga
// /ɜː/ de hurt · nurse · worse · first · work, más los grupos consonánticos
// finales (coughed, asked, worked). Va aquí porque es la vocal del verbo
// central del módulo —hurt— y porque el alumno ya la trae medio hecha de
// `ennurse` y `enfirst` del A1: se sistematiza, no se estrena.
//
// EL CONTRASTE CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9): (a) «me duele
// la cabeza» tiene DOS traducciones y ninguna es «I have pain in my head» —
// L1; (b) «estoy constipado» → *I am constipated*, el falso amigo que ROMPE
// la comunicación en vez de solo marcarla — L2; (c) el reflexivo que el inglés
// no lleva: «me siento mal» → *I feel myself bad* — L2; (d) el posesivo
// obligatorio con las partes del cuerpo: «me rompí el brazo» → *I broke the
// arm* — L1 y L3; (e) «una receta» del médico es a prescription, no *a
// recipe*, y el ambulatorio es the surgery, que no es «cirugía» — L4 y L8;
// (f) el infinitivo tras el modal: *You must to stay in bed* — L7.
//
// RECICLADO del A1 y de ena2m1-ena2m5 sin redefinir ids (una palabra, una
// tarjeta): endoctor, ennurse, enhospital, enfirst, encold, enitscold, enbed,
// engotobed, ensleeping, enwater, enmilk, entea, encupoftea, enbike, enwalk,
// enwork, enatwork, engotowork, enhome, enathome, enimlate, enimbusy,
// enbusy, ensorry, enexcuseme, enplease, enthankyou, enthankyouverymuch,
// endontworry, ensitdown, encomein, encall, enneed, entwice, enhowareyou,
// enimfinethanks, ennotbad, enimok, encanyouhelpme, enidontunderstand,
// encanyourepeat, enmessage, enflatmate, enfriend, enshop, enpark, enmonth,
// enweek, enyesterday, enlastnight, enmorning (vía engoodmorning), enfree,
// ena2m1tired, ena2m1terrible, ena2m1phoned, ena2m1istayedathome,
// ena2m1whathappened, ena2m1twodaysago, ena2m1lastweek, ena2m1iwaslucky,
// ena2m2ifelloverinthestreet, ena2m2ididntsleep, ena2m2sleptgroup,
// ena2m2icamehomelate, ena2m2luckily, ena2m2unfortunately, ena2m2whatashame,
// ena2m2becauseimissedthebus, ena2m2soiwalked, ena2m2firstofall,
// ena2m2afterthat, ena2m2finally, ena2m2whathappenednext, ena2m2heard,
// ena2m3abitshy, ena2m3ireallylikethisfilm, ena2m3ilikeitverymuch,
// ena2m3slowly, ena2m3badly, ena2m3well, ena2m3tiring, ena2m4badworseworst,
// ena2m4goodbetterbest, ena2m4muchcheaper, ena2m4abitcheaper, ena2m5alotof,
// ena2m5justalittlethanks, ena2m5canihavesomewater, ena2m5couldihavethemenu,
// ena2m5imafraidwedonthaveany, ena2m5somegoodadvice, ena2m5apieceofadvice,
// ena2m5idlikethechicken, ena2m5excusemethisiscold, ena2m5imsosorryaboutthat.
//
// LO QUE HEREDAN LOS MÓDULOS SIGUIENTES: la escala de fuerza de la L7 es la
// que `ena2m10` y `ena2m11` dan por instalada cuando hablen de experiencias y
// de planes con condición; el `should` presentado en la L9 es el que el B1
// recoge para producirlo; y el vocabulario del cuerpo de la L1 es el que
// `ena2m9` necesita para las tareas de casa sin volver a enseñarlo.
//
// TODOS los ids nuevos llevan el prefijo "ena2m8": es regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m8: Record<string, VocabItem> = {
  // ── ena2m8l1 — dónde duele: el cuerpo y el posesivo obligatorio ──
  ena2m8wheredoesithurt: {
    id: "ena2m8wheredoesithurt", target: "Where does it hurt?",
    source: "¿Dónde te duele? / ¿Dónde le duele?",
    sound: "UÉA das it JÉET (hurt: vocal floja y larga, sin r — como nurse)",
    gram: { trap: "Where do you have pain?", same: ["Where's the pain?"] },
  },
  ena2m8myheadhurts: {
    id: "ena2m8myheadhurts", target: "My head hurts.",
    source: "Me duele la cabeza. — el que duele es sujeto, y lleva MY delante",
    sound: "mái JED JÉETS",
    gram: { trap: "I have pain in my head.", same: ["I have a headache."] },
  },
  ena2m8ihaveaheadache: {
    id: "ena2m8ihaveaheadache", target: "I have a headache.",
    source: "Tengo dolor de cabeza. — la otra manera de decir lo mismo",
    sound: "ái jav a JÉ-deik (la ch de -ache suena K: «éik»)",
    gram: { trap: "I have headache.", same: ["My head hurts."] },
  },
  ena2m8achegroup: {
    id: "ena2m8achegroup",
    target: "a headache · a stomach ache · toothache · backache · earache",
    source: "los cinco dolores con nombre propio: cabeza, tripa, muela, espalda, oído",
    sound: "JÉ-deik · STA-mak éik · TÚUZ-eik · BAK-eik · ÍA-reik",
  },
  ena2m8bodypartsgroup: {
    id: "ena2m8bodypartsgroup",
    target: "the head · the throat · the chest · the back · the stomach · the knee",
    source: "la cabeza · la garganta · el pecho · la espalda · el estómago (la tripa) · la rodilla",
    sound: "de JED · de ZRÓUT · de CHEST · de BAK · de STA-mak · de NÍI (la k de knee no suena)",
  },
  ena2m8handsfeetteeth: {
    id: "ena2m8handsfeetteeth",
    target: "a hand → hands · a foot → feet · a tooth → teeth",
    source: "los plurales que no llevan -s: cambian por dentro",
    sound: "jand → jands̬ · fut → FÍIT · tuuz → TÍIZ",
    gram: { trap: "two foots" },
  },
  ena2m8ibrokemyarm: {
    id: "ena2m8ibrokemyarm", target: "I broke my arm.",
    source: "Me rompí el brazo.",
    sound: "ái bróuk mái AAM",
    gram: { trap: "I broke the arm.", same: ["My arm is broken."] },
  },

  // ── ena2m8l2 — cómo te encuentras (y los dos falsos amigos) ──
  ena2m8whatsthematter: {
    id: "ena2m8whatsthematter", target: "What's the matter?",
    source: "¿Qué te pasa? — a alguien que tiene mala cara",
    sound: "uóts de MA-ta",
    gram: { same: ["Are you all right?"] },
  },
  ena2m8idontfeelwell: {
    id: "ena2m8idontfeelwell", target: "I don't feel very well.",
    source: "No me encuentro muy bien.",
    sound: "ái dóunt fíil VE-ri UÉL",
    gram: { trap: "I don't feel myself very well.", same: ["I'm not feeling very well."] },
  },
  ena2m8ihaveacold: {
    id: "ena2m8ihaveacold", target: "I have a cold.",
    source: "Estoy constipada / resfriado.",
    sound: "ái jav a KÓULD",
    gram: { trap: "I am constipated.", same: ["I've got a cold."] },
  },
  ena2m8constipated: {
    id: "ena2m8constipated", target: "constipated",
    source: "estreñido — el falso amigo que rompe la conversación entera: «constipado» se dice a cold",
    sound: "KONS-ti-pei-tid",
  },
  ena2m8ihaveatemperature: {
    id: "ena2m8ihaveatemperature", target: "I have a temperature.",
    source: "Tengo fiebre.",
    sound: "ái jav a TEM-pra-cha (tres sílabas al hablar, no cuatro)",
    gram: { trap: "I have fever.", same: ["I've got a temperature."] },
  },
  ena2m8ifeelsick: {
    id: "ena2m8ifeelsick", target: "I feel sick.",
    source: "Tengo náuseas / ganas de vomitar — ojo: en Reino Unido sick no es «enfermo»",
    sound: "ái fiil SIK",
    gram: { trap: "I feel myself sick." },
  },
  ena2m8ihaveasorethroat: {
    id: "ena2m8ihaveasorethroat", target: "I have a sore throat.",
    source: "Me duele la garganta.",
    sound: "ái jav a soo ZRÓUT",
    gram: { trap: "I have pain in my throat.", same: ["My throat hurts."] },
  },

  // ── ena2m8l3 — el accidente, contado en pasado ──
  ena2m8icutmyfinger: {
    id: "ena2m8icutmyfinger", target: "I cut my finger.",
    source: "Me corté el dedo. — cut no cambia en pasado",
    sound: "ái kat mái FÍN-ga",
    gram: { trap: "I cut the finger.", same: ["I've got a cut on my finger."] },
  },
  ena2m8iburntmyhand: {
    id: "ena2m8iburntmyhand", target: "I burnt my hand.",
    source: "Me quemé la mano.",
    sound: "ái béent mái JAND",
    gram: { trap: "I burnt me the hand." },
  },
  ena2m8ihurtmyback: {
    id: "ena2m8ihurtmyback", target: "I hurt my back.",
    source: "Me hice daño en la espalda. — hurt tampoco cambia en pasado",
    sound: "ái jéet mái BAK",
    gram: { trap: "I hurted my back.", same: ["I did something to my back."] },
  },
  ena2m8itsbleeding: {
    id: "ena2m8itsbleeding", target: "It's bleeding.",
    source: "Está sangrando.",
    sound: "its BLÍI-ding",
  },
  ena2m8acutabruise: {
    id: "ena2m8acutabruise", target: "a cut · a bruise · a burn",
    source: "un corte · un moratón · una quemadura",
    sound: "a kat · a brúus̬ · a béen",
  },

  // ── ena2m8l4 — la consulta: pedir cita y contarlo ──
  ena2m8idliketomakeanappointment: {
    id: "ena2m8idliketomakeanappointment", target: "I'd like to make an appointment.",
    source: "Quería pedir cita. — la fórmula de la recepción, con el I'd like del módulo 5",
    sound: "áid láik tu méik an a-PÓINT-ment",
    gram: { trap: "I want an appointment.", same: ["Could I make an appointment, please?"] },
  },
  ena2m8thesurgery: {
    id: "ena2m8thesurgery", target: "the surgery",
    source: "el ambulatorio, la consulta del médico de cabecera — en Reino Unido surgery NO es «cirugía»",
    sound: "de SÉE-dcha-ri",
  },
  ena2m8whatseemstobetheproblem: {
    id: "ena2m8whatseemstobetheproblem", target: "What seems to be the problem?",
    source: "¿Qué le pasa? — así lo pregunta el médico, y así lo vas a oír",
    sound: "uót síims̬ tu bi de PRO-blem",
    gram: { same: ["What's the problem?"] },
  },
  ena2m8whendiditstart: {
    id: "ena2m8whendiditstart", target: "When did it start?",
    source: "¿Cuándo empezó?",
    sound: "uén did it STAAT",
    gram: { trap: "When it started?" },
  },
  ena2m8takeadeepbreath: {
    id: "ena2m8takeadeepbreath", target: "Take a deep breath.",
    source: "Respire hondo. — la instrucción del médico va en imperativo, y no suena borde",
    sound: "téik a diip BREZ",
  },

  // ── ena2m8l5 — la clínica: /ɜː/ y los grupos finales ──
  ena2m8hurtgroup: {
    id: "ena2m8hurtgroup", target: "hurt · nurse · worse · first · work",
    source: "los cinco de la vocal larga: boca casi cerrada, ni «er» ni «or», y ni rastro de r",
    sound: "jéet · nées · uées · féest · uéek",
  },
  ena2m8acough: {
    id: "ena2m8acough", target: "a cough",
    source: "la tos",
    sound: "a KOF (rima con «off»: la -gh suena F)",
    gram: { same: ["I can't stop coughing."] },
  },
  ena2m8icoughedallnight: {
    id: "ena2m8icoughedallnight", target: "I coughed all night.",
    source: "Me pasé la noche tosiendo.",
    sound: "ái KOFT ool náit (coughed es UNA sílaba: «koft»)",
  },
  ena2m8itsgettingworse: {
    id: "ena2m8itsgettingworse", target: "It's getting worse.",
    source: "Va a peor.",
    sound: "its GUE-ting UÉES",
    gram: { same: ["It isn't getting better."] },
  },
  ena2m8itreallyhurts: {
    id: "ena2m8itreallyhurts", target: "It really hurts.",
    source: "Me duele muchísimo.",
    sound: "it RÍA-li JÉETS",
    gram: { trap: "It hurts really much.", same: ["It hurts a lot."] },
  },

  // ── ena2m8l6 — el consejo suave: Why don't you…? y el imperativo ──
  ena2m8whydontyougohome: {
    id: "ena2m8whydontyougohome", target: "Why don't you go home?",
    source: "¿Por qué no te vas a casa? — es un consejo, no una pregunta de verdad",
    sound: "uái dóunt yu góu JÓUM",
    gram: { trap: "Why you don't go home?", same: ["You need to go home."] },
  },
  ena2m8whynottakeadayoff: {
    id: "ena2m8whynottakeadayoff", target: "Why not take a day off?",
    source: "¿Por qué no te coges un día libre? — la versión corta, sin sujeto",
    sound: "uái not téik a déi OF",
    gram: { trap: "Why not to take a day off?" },
  },
  ena2m8gotobedandrest: {
    id: "ena2m8gotobedandrest", target: "Go to bed and rest.",
    source: "Vete a la cama y descansa.",
    sound: "góu tu bed and REST",
  },
  ena2m8dontgotoworktoday: {
    id: "ena2m8dontgotoworktoday", target: "Don't go to work today.",
    source: "Hoy no vayas a trabajar.",
    sound: "dóunt góu tu UÉEK tu-DÉI",
    gram: { trap: "Not go to work today." },
  },
  ena2m8drinklotsofwater: {
    id: "ena2m8drinklotsofwater", target: "Drink lots of water.",
    source: "Bebe mucha agua.",
    sound: "drink LOT-sov UÓ-ta",
  },

  // ── ena2m8l7 — la escala de fuerza ──
  ena2m8advicescale: {
    id: "ena2m8advicescale",
    target: "You must rest. · You have to rest. · You need to rest. · Why don't you rest?",
    source: "la misma idea, de la orden al consejo: de más fuerte a más suave",
    sound: "yu MAST rest · yu JAF tu rest · yu NIID tu rest · uái dóunt yu REST",
  },
  ena2m8youneedtoseeadoctor: {
    id: "ena2m8youneedtoseeadoctor", target: "You need to see a doctor.",
    source: "Tienes que ir al médico. — el consejo firme, el que más se usa",
    sound: "yu niid tu síi a DOC-ta",
    gram: { trap: "You need see a doctor.", same: ["You have to see a doctor."] },
  },
  ena2m8youhavetostayinbed: {
    id: "ena2m8youhavetostayinbed", target: "You have to stay in bed.",
    source: "Tienes que quedarte en la cama. — obligación, no sugerencia",
    sound: "yu jaf tu stéi in BED",
    gram: { trap: "You must to stay in bed.", same: ["You need to stay in bed."] },
  },
  ena2m8doineedtoseeadoctor: {
    id: "ena2m8doineedtoseeadoctor", target: "Do I need to see a doctor?",
    source: "¿Tengo que ir al médico?",
    sound: "du ái niid tu síi a DOC-ta",
    gram: { trap: "I need to see a doctor?" },
  },
  ena2m8itsnothingserious: {
    id: "ena2m8itsnothingserious", target: "It's nothing serious.",
    source: "No es nada grave.",
    sound: "its NA-zing SÍA-rias",
    gram: { same: ["Don't worry, it isn't serious."] },
  },

  // ── ena2m8l8 — la farmacia ──
  ena2m8thechemists: {
    id: "ena2m8thechemists", target: "the chemist's",
    source: "la farmacia — en Reino Unido, the chemist's (con apóstrofo: «la tienda del farmacéutico»)",
    sound: "de KE-mists",
  },
  ena2m8haveyougotanythingfor: {
    id: "ena2m8haveyougotanythingfor", target: "Have you got anything for a cough?",
    source: "¿Tiene algo para la tos? — la frase que abre cualquier farmacia",
    sound: "jav yu got E-ni-zing foo a KOF",
    gram: { same: ["Do you have anything for a cough?"] },
  },
  ena2m8somepainkillers: {
    id: "ena2m8somepainkillers", target: "some painkillers",
    source: "algo para el dolor, unos analgésicos",
    sound: "sam PÉIN-ki-las̬",
  },
  ena2m8aprescription: {
    id: "ena2m8aprescription", target: "a prescription",
    source: "una receta del médico",
    sound: "a pris-KRIP-shon",
    gram: { trap: "a recipe" },
  },
  ena2m8takeonetabletthreetimesaday: {
    id: "ena2m8takeonetabletthreetimesaday", target: "Take one tablet three times a day.",
    source: "Tome un comprimido tres veces al día.",
    sound: "téik uán TA-blet zrii táims̬ a DÉI",
  },

  // ── ena2m8l9 — cierre, y la frontera con el B1 ──
  ena2m8howareyoufeeling: {
    id: "ena2m8howareyoufeeling", target: "How are you feeling?",
    source: "¿Cómo te encuentras? — a alguien que está malo, no es el «How are you?» de saludar",
    sound: "jáu aa yu FÍI-ling",
    gram: { same: ["Are you feeling any better?"] },
  },
  ena2m8imuchbetterthanks: {
    id: "ena2m8imuchbetterthanks", target: "I'm much better, thanks.",
    source: "Estoy mucho mejor, gracias.",
    sound: "áim mach BÉ-ta zanks",
    gram: { trap: "I'm more better, thanks." },
  },
  ena2m8getwellsoon: {
    id: "ena2m8getwellsoon", target: "Get well soon!",
    source: "¡Que te mejores! — se escribe en las tarjetas y se dice al despedirse",
    sound: "guet uél SÚUN",
  },
  ena2m8shouldfrontier: {
    id: "ena2m8shouldfrontier",
    target: "You should see a doctor. · You shouldn't go to work.",
    source: "Deberías ir al médico. · No deberías ir a trabajar. — FRONTERA con el B1: recónocelo al oírlo; para decirlo tú, usa las cuatro de este módulo",
    sound: "yu shud síi a DOC-ta · yu SHU-dent góu tu uéek (la l de should no suena)",
    gram: { trap: "You should to see a doctor." },
  },
};

export const ena2m8: Phase = {
  id: "ena2m8",
  level: "a2",
  n: 8,
  title: "Where does it hurt?",
  goal: "Resolver una consulta médica entera en inglés: nombrar la parte del cuerpo que duele, contar el síntoma y el accidente, pedir cita, entender al médico y a la farmacia, y dar consejo con las cuatro fórmulas del A2 (Why don't you…?, You need to…, el imperativo y have to) sabiendo cuál pesa más.",
  color: "#b91c1c",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — dónde duele: el cuerpo, y el posesivo que el español no pone
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l1",
      phaseId: "ena2m8",
      title: "My head hurts",
      subtitle: "Decir qué te duele — y por qué «I have pain in my head» no lo dice nadie",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "El cuerpo y el dolor",
          itemIds: ["ena2m8wheredoesithurt", "ena2m8myheadhurts", "ena2m8ihaveaheadache", "ena2m8achegroup", "ena2m8bodypartsgroup", "ena2m8handsfeetteeth", "ena2m8ibrokemyarm"],
        },
        {
          kind: "note",
          note: {
            title: "«Me duele la cabeza» tiene dos traducciones — y ninguna es la que te sale",
            body: "En español el que duele es el dolor: «<u>me</u> duele <u>la</u> cabeza». En inglés no existe ese «me», y la parte del cuerpo pasa a ser el <b>sujeto de la frase</b>. De ahí salen las dos maneras de decirlo, y las dos son igual de buenas:<br/><br/><b>1. Con el verbo hurt:</b> [[My head hurts.|Me duele la cabeza.]] · <i>My back hurts.</i> · <i>My feet hurt.</i> (plural: sin -s en el verbo)<br/><b>2. Con el sustantivo -ache:</b> [[I have a headache.|Tengo dolor de cabeza.]] · <i>I have backache.</i> · <i>I have toothache.</i><br/><br/><b>Lo que NO se dice es «I have pain in my head».</b> Se entiende, pero suena a informe de hospital traducido, y en el oral del examen marca en seguida. <i>Pain</i> existe, pero es la palabra del dolor fuerte y concreto («I have a pain in my chest»), no la fórmula del día a día.<br/><br/><b>Y ahora el detalle que se te va a caer cien veces:</b> en inglés la parte del cuerpo <b>lleva siempre su posesivo</b>. El español dice «me rompí <u>el</u> brazo» porque el «me» ya avisa de quién es; el inglés no tiene ese «me», así que lo dice con <b>my</b>: [[I broke my arm.|Me rompí el brazo.]] · <i>I cut my finger.</i> · <i>She hurt her back.</i><br/><i>I broke the arm</i> suena a que rompiste el brazo de otro, o el de una silla.<br/><br/>Tres plurales que no llevan -s y que son justo los del cuerpo: <b>a foot → feet</b>, <b>a tooth → teeth</b>, <b>a hand → hands</b> (esta sí, tranquilo).",
            table: [
              ["en español", "en inglés, bien", "en inglés, mal"],
              ["Me duele la cabeza.", "My head hurts. / I have a headache.", "I have pain in my head."],
              ["Me duele la espalda.", "My back hurts. / I have backache.", "I have pain in the back."],
              ["Me duelen los pies.", "My feet hurt.", "My foots hurts."],
              ["Me rompí el brazo.", "I broke my arm.", "I broke the arm."],
              ["Me corté el dedo.", "I cut my finger.", "I cut the finger."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l1e1", type: "match", prompt: "Empareja las partes del cuerpo",
              pairs: [
                { target: "the head", source: "la cabeza" },
                { target: "the throat", source: "la garganta" },
                { target: "the back", source: "la espalda" },
                { target: "the stomach", source: "el estómago, la tripa" },
                { target: "the knee", source: "la rodilla" },
              ],
              itemIds: ["ena2m8bodypartsgroup"],
              tip: "knee se dice «níi»: la k del principio no suena, igual que en know. Es la misma k muda de siempre.",
            },
            {
              id: "ena2m8l1e2", type: "mc", prompt: "La frase que hace todo hispanohablante",
              question: "«Me duele la cabeza» en inglés es…",
              options: ["My head hurts.", "I have pain in my head.", "Me hurts the head."],
              answer: 0,
              whyWrong: [null, "Se entiende, pero no lo dice nadie: es la traducción literal del «tengo dolor de»", "En inglés no hay «me»: el que duele es el sujeto"],
              itemIds: ["ena2m8myheadhurts"],
              tip: "Dos salidas y las dos valen: My head hurts o I have a headache. La tercera vía, la de «pain», no es una tercera vía.",
            },
            {
              id: "ena2m8l1e3", type: "bucket", prompt: "¿Se dice así o no se dice?",
              categories: ["así se dice", "así no lo dice nadie"],
              items: [
                { text: "My head hurts.", bucket: 0 },
                { text: "I have a headache.", bucket: 0 },
                { text: "I have pain in my head.", bucket: 1 },
                { text: "My back hurts.", bucket: 0 },
                { text: "I have pain in the back.", bucket: 1 },
                { text: "I have toothache.", bucket: 0 },
                { text: "Me hurts the head.", bucket: 1 },
                { text: "My feet hurt.", bucket: 0 },
              ],
              itemIds: ["ena2m8myheadhurts", "ena2m8ihaveaheadache", "ena2m8achegroup"],
              tip: "Fíjate en lo que tienen en común las cinco buenas: o la parte del cuerpo es el sujeto (My back hurts), o el dolor es una palabra sola (headache). Nunca las dos cosas a la vez.",
            },
            {
              id: "ena2m8l1e4", type: "cloze", prompt: "Completa con el posesivo",
              text: "I fell in the street and I broke ___ arm.",
              answers: ["my"],
              translation: "Me caí en la calle y me rompí el brazo.",
              hints: ["En español lo dice el «me»; en inglés lo dice otra palabra, delante de arm", "m…"],
              itemIds: ["ena2m8ibrokemyarm", "ena2m2ifelloverinthestreet"],
            },
            {
              id: "ena2m8l1e5", type: "errorfix", prompt: "Corrige el artículo",
              wrong: "She hurt the back at work.",
              answers: ["She hurt her back at work."],
              why: "En inglés la parte del cuerpo lleva su posesivo: her back, my arm, your knee. El español se apoya en el pronombre («se hizo daño en la espalda») y el inglés no lo tiene, así que la información de quién es va en el posesivo. Con «the» parece la espalda de otra persona.",
              translation: "Se hizo daño en la espalda en el trabajo.",
              itemIds: ["ena2m8ibrokemyarm", "ena2m8ihurtmyback"],
            },
            {
              id: "ena2m8l1e6", type: "mc", prompt: "El plural del cuerpo",
              question: "«Me duelen los pies» es…",
              options: ["My feet hurt.", "My foots hurt.", "My feet hurts."],
              answer: 0,
              whyWrong: [null, "foot no hace el plural con -s: es feet", "El sujeto es plural, así que el verbo va sin -s"],
              itemIds: ["ena2m8handsfeetteeth"],
              tip: "Doble trampa en cuatro palabras: el plural irregular (feet) y la -s del verbo, que con sujeto plural NO se pone.",
            },
            {
              id: "ena2m8l1e7", type: "transform", prompt: "Dilo de la otra manera",
              source: "My head hurts.",
              instruction: "Dilo con «I have…»",
              answers: ["I have a headache.", "I've got a headache."],
              translation: "Me duele la cabeza.",
              hints: ["El dolor de cabeza tiene su propia palabra, que acaba en -ache", "I have a head…"],
              itemIds: ["ena2m8myheadhurts", "ena2m8ihaveaheadache"],
              tip: "Con headache el artículo es obligatorio (a headache). Con backache y toothache, los ingleses lo suelen quitar. No hay lógica: es costumbre.",
            },
            {
              id: "ena2m8l1e8", type: "build", prompt: "Construye la frase del médico",
              target: "Where does it hurt",
              translation: "¿Dónde te duele?",
              distractors: ["hurts", "pain"],
              itemIds: ["ena2m8wheredoesithurt"],
              tip: "Detrás de does, el verbo va desnudo: hurt, no hurts. Es el mismo do/does del A1 y el mismo did del módulo 1.",
            },
            {
              id: "ena2m8l1e9", type: "listen", prompt: "Dictado — la pregunta del módulo",
              text: "Where does it hurt?",
              translation: "¿Dónde te duele?",
              hints: ["Empieza por Where d…", "…it hurt?"],
              itemIds: ["ena2m8wheredoesithurt"],
              tip: "hurt suena «jéet», con la misma vocal larga de nurse y de work. La trabajamos entera en la lección 5.",
            },
            {
              id: "ena2m8l1e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Me duele la garganta y me duelen los oídos.",
              answers: [
                "My throat hurts and my ears hurt.",
                "I have a sore throat and earache.",
                "My throat hurts and I have earache.",
              ],
              hint: "la parte del cuerpo va delante, como sujeto",
              itemIds: ["ena2m8bodypartsgroup", "ena2m8achegroup"],
            },
            {
              id: "ena2m8l1e11", type: "type", prompt: "Cierre de producción",
              question: "Me caí de la bici y me rompí el brazo. Me duele muchísimo.",
              answers: [
                "I fell off my bike and I broke my arm. It really hurts.",
                "I fell off my bike and broke my arm. It really hurts.",
                "I fell off my bike and I broke my arm. It hurts a lot.",
              ],
              hints: ["Pasado del módulo 2 + posesivo delante de arm", "I fell off m… bike and I broke m… arm. It really h…"],
              itemIds: ["ena2m8ibrokemyarm", "ena2m8itreallyhurts", "enbike"],
              tip: "Tres posesivos en dos frases: my bike, my arm. En cuanto aparece una parte del cuerpo, el inglés pide dueño.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-1",
            book: "I have a very bad headache.",
            real: "I've got a splitting headache.",
            meaning: "Tengo un dolor de cabeza que me parte",
            when: "Entre amigos y en casa, cuando el dolor de cabeza es de los gordos. Se oye a diario en Reino Unido. En el examen, oral o escrito, di la del libro (a very bad headache): es la que enseña la estructura que puntúan.",
            register: "amigos",
            note: "splitting es de split, «partir en dos»: la misma imagen que el español «me parte la cabeza». Por una vez, las dos lenguas ven lo mismo.",
            sound: "áiv got a SPLÍ-ting JÉ-deik",
            level: "a2",
            itemId: "ena2m8ihaveaheadache",
          },
        },
      ],
      resources: [
        { label: "British Council — Parts of the body", url: "https://learnenglish.britishcouncil.org/vocabulary/beginner-to-pre-intermediate/parts-of-the-body", note: "Haz el ejercicio de vocabulario (5 min) y luego di en voz alta «my … hurts» con cada parte que aprendas. Es la estructura de todo el módulo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — cómo te encuentras: el reflexivo que sobra y el falso amigo que rompe
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l2",
      phaseId: "ena2m8",
      title: "I don't feel very well",
      subtitle: "Contar el síntoma — y no decirle a nadie que estás estreñido sin querer",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Cómo estás y qué tienes",
          itemIds: ["ena2m8whatsthematter", "ena2m8idontfeelwell", "ena2m8ihaveacold", "ena2m8ihaveatemperature", "ena2m8ifeelsick", "ena2m8ihaveasorethroat", "ena2m8constipated", "ena2m1tired"],
        },
        {
          kind: "note",
          note: {
            title: "«Me siento mal»: el inglés no se siente A SÍ MISMO",
            body: "En español los verbos de estado llevan un pronombre reflexivo: <u>me</u> siento mal, <u>te</u> encuentras bien, <u>se</u> siente cansada. En inglés ese pronombre <b>no existe</b>, y ponerlo cambia la frase de sitio: <i>I feel myself bad</i> no significa «me encuentro mal», significa que te estás tocando, y es de las frases que hacen que un nativo levante la ceja.<br/><br/>Se dice, sin más: [[I don't feel very well.|No me encuentro muy bien.]] · <i>I feel tired.</i> · <i>How do you feel?</i><br/><br/>Y ojo a un detalle de sentido: <b>feel</b> va con adjetivo (feel <b>tired</b>, feel <b>ill</b>, feel <b>better</b>), nunca con adverbio. Por eso es <i>I feel bad</i> y no <i>I feel badly</i>.<br/><br/><b>Las tres fórmulas del día a día</b> —y las tres se construyen con have, no con be:<br/>· [[I have a cold.|Estoy constipada.]]<br/>· [[I have a temperature.|Tengo fiebre.]] — <i>fever</i> existe, pero suena a enfermedad tropical: lo normal es <i>a temperature</i>.<br/>· [[I have a sore throat.|Me duele la garganta.]] — <i>sore</i> es «dolorido», y se usa con throat, eyes, feet…<br/><br/>La pregunta con la que empieza todo esto es [[What's the matter?|¿Qué te pasa?]], que no es reproche ninguno: es lo que dice quien te ve mala cara.",
            table: [
              ["en español", "en inglés, bien", "en inglés, mal"],
              ["Me encuentro mal.", "I don't feel very well.", "I don't feel myself well."],
              ["Me siento cansada.", "I feel tired.", "I feel myself tired."],
              ["¿Cómo te encuentras?", "How do you feel?", "How do you feel yourself?"],
              ["Tengo fiebre.", "I have a temperature.", "I have fever."],
              ["Me duele la garganta.", "I have a sore throat.", "I have pain in my throat."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«Estoy constipado» — el falso amigo que no marca: rompe",
            body: "Este merece nota propia, porque no es un fallo de estilo: es un fallo que <b>cambia la conversación de tema</b>.<br/><br/><b>constipated</b> en inglés significa <b>estreñido</b>. Nada más. Así que <i>I am constipated</i> delante de tu jefe, de la farmacéutica o del médico está diciendo exactamente eso, con toda claridad.<br/><br/>«Estar constipado» es [[I have a cold.|Estoy constipada.]] · <i>I've got a cold.</i><br/><br/><b>Y su vecino:</b> «tengo frío» es <i>I'm cold</i> y «estoy resfriado» es <i>I have a cold</i>. Una letra de diferencia —el artículo— y dos cosas distintas:<br/>· <b>I'm cold.</b> = tengo frío (ponme una manta)<br/>· <b>I have a cold.</b> = estoy resfriado (ponme un paracetamol)<br/><br/>Y ya que estamos con los que engañan: <b>sick</b> en inglés británico no es «enfermo» a secas, es <b>con náuseas</b>. [[I feel sick.|Tengo ganas de vomitar.]] Si quieres decir «estoy enfermo», la palabra es <b>ill</b>: <i>I'm ill.</i> (En inglés americano sí usan <i>sick</i> por «enfermo», y de ahí viene el lío.)",
            table: [
              ["si quieres decir…", "di…", "porque si no…"],
              ["Estoy constipado.", "I have a cold.", "I am constipated = estoy estreñido"],
              ["Tengo frío.", "I'm cold.", "I have a cold = estoy resfriado"],
              ["Estoy enfermo.", "I'm ill.", "I'm sick (en UK) = tengo náuseas"],
              ["Tengo ganas de vomitar.", "I feel sick.", "—"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l2e1", type: "errorfix", prompt: "Corrige el reflexivo — el más repetido del módulo",
              wrong: "I don't feel myself very well today.",
              answers: ["I don't feel very well today."],
              why: "feel no lleva reflexivo en inglés: el «me» del español no se traduce. «I feel myself» significa otra cosa muy distinta, así que este no es un error de estilo, es un error de significado. Se dice I feel tired, I feel ill, I don't feel well — y ya está.",
              translation: "Hoy no me encuentro muy bien.",
              itemIds: ["ena2m8idontfeelwell"],
            },
            {
              id: "ena2m8l2e2", type: "mc", prompt: "El falso amigo que rompe la conversación",
              question: "Vas a la farmacia con un catarro. ¿Qué dices?",
              options: ["I have a cold.", "I am constipated.", "I have a constipation."],
              answer: 0,
              whyWrong: [null, "Acabas de decir que estás estreñido, con esas palabras", "Igual de mal, y encima con artículo"],
              itemIds: ["ena2m8ihaveacold", "ena2m8constipated"],
              tip: "constipated = estreñido. No hay medio camino: es la palabra exacta para eso y para nada más.",
            },
            {
              id: "ena2m8l2e3", type: "bucket", prompt: "¿Manta o paracetamol?",
              categories: ["tengo frío", "estoy resfriado"],
              items: [
                { text: "I'm cold.", bucket: 0 },
                { text: "I have a cold.", bucket: 1 },
                { text: "I'm very cold in this flat.", bucket: 0 },
                { text: "I've got a cold and a sore throat.", bucket: 1 },
                { text: "It's cold today.", bucket: 0 },
                { text: "She has a bad cold.", bucket: 1 },
              ],
              itemIds: ["ena2m8ihaveacold", "encold", "enitscold"],
              tip: "Lo que decide es el artículo: A cold es un resfriado, un objeto que se tiene. Cold sin artículo es la temperatura.",
            },
            {
              id: "ena2m8l2e4", type: "match", prompt: "Empareja los síntomas",
              pairs: [
                { target: "I have a temperature.", source: "Tengo fiebre." },
                { target: "I have a sore throat.", source: "Me duele la garganta." },
                { target: "I feel sick.", source: "Tengo ganas de vomitar." },
                { target: "I have a cold.", source: "Estoy constipado." },
              ],
              itemIds: ["ena2m8ihaveatemperature", "ena2m8ihaveasorethroat", "ena2m8ifeelsick", "ena2m8ihaveacold"],
              tip: "Las cuatro se construyen con have o con feel. Con be no se construye ninguna: «I am temperature» no existe.",
            },
            {
              id: "ena2m8l2e5", type: "cloze", prompt: "Completa el verbo",
              text: "I ___ a temperature and my throat hurts.",
              answers: ["have", "have got", "'ve got"],
              translation: "Tengo fiebre y me duele la garganta.",
              hints: ["La fiebre en inglés se TIENE, no se está", "h…"],
              itemIds: ["ena2m8ihaveatemperature", "ena2m8ihaveasorethroat"],
            },
            {
              id: "ena2m8l2e6", type: "errorfix", prompt: "Corrige la fiebre",
              wrong: "I think I have fever.",
              answers: ["I think I have a temperature."],
              why: "fever existe en inglés, pero se reserva para enfermedades con nombre (yellow fever, glandular fever). Lo que dice cualquiera en casa o en la consulta es «a temperature», con su artículo. Y con el artículo puesto: «I have temperature» tampoco se dice.",
              translation: "Creo que tengo fiebre.",
              itemIds: ["ena2m8ihaveatemperature"],
            },
            {
              id: "ena2m8l2e7", type: "audiomc", prompt: "Amy llama al trabajo — 2 escuchas",
              audio: "Hello, it's Amy. I'm sorry, I can't come in today. I don't feel very well: I have a temperature and a really bad cough. I stayed in bed all morning.",
              question: "¿Qué le pasa a Amy?",
              options: ["Tiene fiebre y tos", "Se ha roto un brazo", "Está estreñida"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "No dice nada de accidentes ni de huesos", "Esa palabra no aparece: dice a temperature y a cough"],
              notepad: true,
              itemIds: ["ena2m8ihaveatemperature", "ena2m8idontfeelwell", "ena2m8acough", "ena2m1istayedathome"],
              tip: "En el Listening del examen, la respuesta casi siempre son DOS datos («fiebre y tos»). Apúntalos los dos en el cuaderno mientras suena.",
            },
            {
              id: "ena2m8l2e8", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "She feels sick and she has a bad cold.",
              answers: [
                "Tiene náuseas y está muy constipada.",
                "Tiene ganas de vomitar y está muy resfriada.",
                "Se encuentra mal del estómago y tiene un buen resfriado.",
              ],
              hint: "ninguna de las dos mitades es lo que parece a primera vista",
              itemIds: ["ena2m8ifeelsick", "ena2m8ihaveacold"],
            },
            {
              id: "ena2m8l2e9", type: "build", prompt: "Construye la pregunta de quien te ve mala cara",
              target: "What is the matter with you",
              translation: "¿Qué te pasa?",
              distractors: ["happen", "problem"],
              itemIds: ["ena2m8whatsthematter"],
              tip: "Al hablar sale contraído: What's the matter? Y la respuesta natural es «I don't feel very well».",
            },
            {
              id: "ena2m8l2e10", type: "gapbank", prompt: "El lunes de Valeria: rellena con la ficha que toca",
              text: "Valeria didn't go to work on Monday. She ___ a temperature and a sore ___. She ___ terrible and she stayed in ___ all day.",
              answers: ["had", "throat", "felt", "bed"],
              bank: ["had", "throat", "felt", "bed", "went", "knee", "myself"],
              translation: "Valeria no fue a trabajar el lunes. Tenía fiebre y le dolía la garganta. Se encontraba fatal y se quedó en la cama todo el día.",
              itemIds: ["ena2m8ihaveatemperature", "ena2m8ihaveasorethroat", "ena2m1terrible", "ena2m2sleptgroup", "enbed"],
              tip: "La ficha «myself» sobra siempre: en inglés uno no se siente a sí mismo. Y felt es el pasado de feel, del grupo de slept y kept del módulo 2.",
            },
            {
              id: "ena2m8l2e11", type: "speak", prompt: "Dilo en voz alta — la llamada al trabajo",
              text: "I'm sorry, I don't feel very well. I have a temperature and a sore throat.",
              phonetic: "áim SO-ri, ái dóunt fíil VE-ri UÉL. ái jav a TEM-pra-cha and a soo ZRÓUT",
              translation: "Lo siento, no me encuentro muy bien. Tengo fiebre y me duele la garganta.",
              itemIds: ["ena2m8idontfeelwell", "ena2m8ihaveatemperature", "ena2m8ihaveasorethroat", "ensorry"],
              tip: "temperature se dice en tres golpes: TEM-pra-cha. La segunda e se la come todo el mundo, y si tú la pronuncias entera suena a robot.",
            },
            {
              id: "ena2m8l2e12", type: "type", prompt: "Cierre de producción",
              question: "No me encuentro bien: estoy constipada y tengo fiebre.",
              answers: [
                "I don't feel well: I have a cold and a temperature.",
                "I don't feel very well: I have a cold and a temperature.",
                "I don't feel well. I've got a cold and a temperature.",
              ],
              hints: ["Sin myself, y «constipada» NO es constipated", "I don't feel well: I have a c… and a t…"],
              itemIds: ["ena2m8idontfeelwell", "ena2m8ihaveacold", "ena2m8ihaveatemperature"],
              tip: "Si has escrito esta frase sin myself y sin constipated, ya te has ahorrado los dos errores más caros del módulo.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-2",
            book: "I don't feel very well.",
            real: "I feel a bit rough.",
            meaning: "Estoy hecho polvo / regular",
            when: "Con amigos, compañeros y en casa, para decir que no estás bien sin dar detalles. Muy británico. En la consulta y en el examen, la del libro: «I don't feel very well» es la que entiende todo el mundo y la que puntúa.",
            register: "amigos",
            note: "rough es «áspero, tosco»; aplicado a personas es «hecho polvo». Su pariente cercano es «I feel awful», que ya es más fuerte.",
            sound: "ái fiil a bit RAF (rough rima con «stuff»)",
            level: "a2",
            itemId: "ena2m8idontfeelwell",
          },
        },
      ],
      resources: [
        { label: "British Council — Health problems (A2)", url: "https://learnenglish.britishcouncil.org/vocabulary/beginner-to-pre-intermediate/health-problems", note: "Haz el ejercicio y apunta cuáles se construyen con have y cuáles con feel. Es el reparto que decide la mitad de tus frases en la consulta." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — el accidente: el pasado del módulo 2, aplicado al cuerpo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l3",
      phaseId: "ena2m8",
      title: "I cut my finger",
      subtitle: "Contar el accidente — con los verbos que no cambian en pasado",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que pasó",
          itemIds: ["ena2m8icutmyfinger", "ena2m8iburntmyhand", "ena2m8ihurtmyback", "ena2m8itsbleeding", "ena2m8acutabruise", "ena2m2ifelloverinthestreet", "ena2m1whathappened"],
        },
        {
          kind: "note",
          note: {
            title: "Los tres verbos del accidente, y dos de ellos no se mueven",
            body: "Para contar cómo te hiciste daño no hace falta gramática nueva: es el pasado del módulo 2. Lo único que hay que saber es que <b>cut</b> y <b>hurt</b> son del grupo de los que <b>no cambian</b> —el mismo de put, cost y let—, así que la frase parece presente y no lo es:<br/><br/>· [[I cut my finger.|Me corté el dedo.]] — hoy corto, ayer corté: <i>cut</i> las dos veces.<br/>· [[I hurt my back.|Me hice daño en la espalda.]] — igual: <i>hurt</i> las dos veces. <i>Hurted</i> no existe.<br/>· [[I burnt my hand.|Me quemé la mano.]] — este sí cambia: burn → <b>burnt</b> (en inglés americano, <i>burned</i>: las dos valen).<br/><br/><b>Y vuelve el posesivo de la lección 1</b>, que es donde más se cae: <i>I cut <b>my</b> finger</i>, no <i>I cut the finger</i>.<br/><br/><b>Ojo con «hacerse daño».</b> El español lo dice con reflexivo («me hice daño») y el inglés no repite el sujeto: <i>I hurt myself</i> existe, pero solo cuando NO dices qué parte. Si dices la parte, el reflexivo sobra:<br/>· <i>I hurt myself.</i> ✓ (me hice daño, sin más)<br/>· <i>I hurt my back.</i> ✓ (me hice daño en la espalda)<br/>· <i>I hurt me the back.</i> ✗<br/><br/>Y las tres cosas que te quedan luego: <b>a cut</b> (un corte), <b>a bruise</b> (un moratón, «brúus̬») y <b>a burn</b> (una quemadura). Si sangra, [[It's bleeding.|Está sangrando.]]",
            table: [
              ["presente", "pasado", "ojo"],
              ["I cut my finger.", "I cut my finger.", "no cambia: lo dice el contexto"],
              ["I hurt my back.", "I hurt my back.", "tampoco — y «hurted» no existe"],
              ["I burn my hand.", "I burnt my hand.", "este sí cambia"],
              ["I fall over.", "I fell over.", "del módulo 2"],
              ["I break my arm.", "I broke my arm.", "del módulo 2"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l3e1", type: "fastmatch", prompt: "Ráfaga — el pasado que ya es tuyo del módulo 2",
              pairs: [
                { target: "fell over", source: "me caí" },
                { target: "broke", source: "rompí / rompió" },
                { target: "felt", source: "me encontré / sentí" },
                { target: "came home", source: "volví a casa" },
                { target: "paid", source: "pagué / pagó" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m2ifelloverinthestreet", "ena2m8ibrokemyarm", "ena2m2sleptgroup", "ena2m2icamehomelate", "ena2m2paid"],
              tip: "El cronómetro solo premia. Estos cinco son de hace dos módulos: si salen sin pensar, tienes sitio libre en la cabeza para lo de hoy.",
            },
            {
              id: "ena2m8l3e2", type: "mc", prompt: "El pasado invisible",
              question: "«Ayer me corté el dedo» es…",
              options: ["Yesterday I cut my finger.", "Yesterday I cutted my finger.", "Yesterday I cut the finger."],
              answer: 0,
              whyWrong: [null, "cut es de los que no cambian: cutted no existe", "La parte del cuerpo pide posesivo: my finger"],
              itemIds: ["ena2m8icutmyfinger", "enyesterday"],
              tip: "Quien marca el pasado aquí es «yesterday», no el verbo. Con cut, hurt y put, el marcador de tiempo es toda la información que hay.",
            },
            {
              id: "ena2m8l3e3", type: "bucket", prompt: "¿El verbo cambia en pasado o se queda igual?",
              categories: ["se queda igual", "cambia"],
              items: [
                { text: "cut", bucket: 0 },
                { text: "hurt", bucket: 0 },
                { text: "burn", bucket: 1 },
                { text: "break", bucket: 1 },
                { text: "put", bucket: 0 },
                { text: "fall", bucket: 1 },
                { text: "cost", bucket: 0 },
                { text: "feel", bucket: 1 },
              ],
              itemIds: ["ena2m8icutmyfinger", "ena2m8ihurtmyback", "ena2m8iburntmyhand", "ena2m2putgroup"],
              tip: "El montón de la izquierda es el grupo de put del módulo 2, con hurt añadido. Cuatro verbos que se ahorran el pasado entero.",
            },
            {
              id: "ena2m8l3e4", type: "errorfix", prompt: "Corrige el pasado inventado",
              wrong: "I hurted my back at work yesterday.",
              answers: ["I hurt my back at work yesterday."],
              why: "hurt es invariable: hurt en presente, hurt en pasado, hurt en participio. La -ed sale sola porque el módulo 1 la instaló bien, pero este verbo la rechaza — como put, cut, cost y let.",
              translation: "Ayer me hice daño en la espalda en el trabajo.",
              itemIds: ["ena2m8ihurtmyback", "enatwork"],
            },
            {
              id: "ena2m8l3e5", type: "errorfix", prompt: "Corrige el reflexivo de más",
              wrong: "I burnt me the hand with the coffee.",
              answers: ["I burnt my hand with the coffee."],
              why: "Dos calcos en una frase: el «me» del español, que en inglés no se dice cuando ya se nombra la parte del cuerpo, y el artículo «the», que aquí tiene que ser posesivo. La regla se resume en una línea: parte del cuerpo = my / your / her, y nada de pronombre delante.",
              translation: "Me quemé la mano con el café.",
              itemIds: ["ena2m8iburntmyhand", "encoffee"],
            },
            {
              id: "ena2m8l3e6", type: "order", prompt: "Ordena el accidente de Ben, de principio a fin",
              sentences: [
                "First of all, it was raining and the street was wet.",
                "Ben fell over and hurt his back.",
                "His hand was bleeding, so he went to the surgery.",
                "In the end, it was nothing serious.",
              ],
              translation: "Primero de todo: llovía y la calle estaba mojada. Ben se cayó y se hizo daño en la espalda. Le sangraba la mano, así que fue al ambulatorio. Al final no fue nada grave.",
              itemIds: ["ena2m2firstofall", "ena2m2ifelloverinthestreet", "ena2m8ihurtmyback", "ena2m8itsbleeding", "ena2m8thesurgery", "ena2m8itsnothingserious", "ena2m2intheend"],
              tip: "Los conectores del módulo 2 (First of all, so, In the end) hacen todo el trabajo de ordenar. Sin ellos esto son cuatro frases sueltas.",
            },
            {
              id: "ena2m8l3e7", type: "cloze", prompt: "Completa con el pasado",
              text: "She ___ her hand in the kitchen and now she has a burn.",
              answers: ["burnt", "burned"],
              translation: "Se quemó la mano en la cocina y ahora tiene una quemadura.",
              hints: ["Este sí cambia — y en inglés británico acaba en -t", "burn → bur…"],
              itemIds: ["ena2m8iburntmyhand", "ena2m8acutabruise", "enkitchen"],
            },
            {
              id: "ena2m8l3e8", type: "match", prompt: "Empareja lo que te queda después",
              pairs: [
                { target: "a cut", source: "un corte" },
                { target: "a bruise", source: "un moratón" },
                { target: "a burn", source: "una quemadura" },
                { target: "It's bleeding.", source: "Está sangrando." },
              ],
              itemIds: ["ena2m8acutabruise", "ena2m8itsbleeding"],
              tip: "bruise se dice «brúus̬», con la s sonora del final. Es de esas palabras que se leen fatal si te fías de cómo se escriben.",
            },
            {
              id: "ena2m8l3e9", type: "transform", prompt: "Del presente al pasado",
              source: "I cut my finger and it bleeds a lot.",
              instruction: "Ponla en pasado, con «last night»",
              answers: ["Last night I cut my finger and it bled a lot.", "I cut my finger last night and it bled a lot."],
              translation: "Anoche me corté el dedo y sangró mucho.",
              hints: ["cut no se mueve; bleed sí: bleed → bled, como feed → fed", "Last night I cut my finger and it bl… a lot."],
              itemIds: ["ena2m8icutmyfinger", "ena2m8itsbleeding", "enlastnight"],
            },
            {
              id: "ena2m8l3e10", type: "listen", prompt: "Dictado — el accidente en una frase",
              text: "I fell off my bike and I hurt my knee.",
              translation: "Me caí de la bici y me hice daño en la rodilla.",
              hints: ["Empieza por I fell off m…", "…and I hurt m… knee."],
              itemIds: ["ena2m8ihurtmyback", "ena2m8bodypartsgroup", "enbike"],
              tip: "Dos posesivos: my bike, my knee. Si has escrito «the knee», vuelve a la lección 1 — es el error que más va a costar en el examen oral.",
            },
            {
              id: "ena2m8l3e11", type: "type", prompt: "Cierre de producción",
              question: "Ayer me caí en la calle y me corté la mano. Sangraba mucho.",
              answers: [
                "Yesterday I fell over in the street and I cut my hand. It was bleeding a lot.",
                "Yesterday I fell in the street and I cut my hand. It was bleeding a lot.",
                "Yesterday I fell over in the street and cut my hand. It bled a lot.",
              ],
              hints: ["Pasado del módulo 2 + posesivo + a lot del módulo 5", "Yesterday I fell over in the street and I cut m… hand. It w… bleeding a lot."],
              itemIds: ["ena2m2ifelloverinthestreet", "ena2m8icutmyfinger", "ena2m8itsbleeding", "ena2m5alotof"],
              tip: "Esa es exactamente la frase con la que se entra en un ambulatorio inglés: qué pasó, qué te hiciste y cómo está ahora.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Past simple irregular verbs", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Repasa la lista y marca solo los que NO cambian (cut, hurt, put, cost, let). Son los que parecen presente y no lo son: los únicos que te pueden confundir al leer." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — la consulta: pedir cita, entrar y contarlo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l4",
      phaseId: "ena2m8",
      title: "I'd like to make an appointment",
      subtitle: "El ambulatorio de principio a fin — y dos falsos amigos por el camino",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "De la recepción a la consulta",
          itemIds: ["ena2m8idliketomakeanappointment", "ena2m8thesurgery", "ena2m8whatseemstobetheproblem", "ena2m8whendiditstart", "ena2m8takeadeepbreath", "endoctor", "ennurse", "ena2m5couldihavethemenu"],
        },
        {
          kind: "note",
          note: {
            title: "El guion del ambulatorio, entero",
            body: "En Reino Unido no se va al hospital por un catarro: se va a <b>the surgery</b>, el consultorio del médico de cabecera (<i>the GP</i>). Y ahí pasan siempre las mismas seis cosas, en el mismo orden:<br/><br/><b>1. Pides cita</b> — y aquí cobras la escalera de cortesía del módulo 5, sin explicación nueva: [[I'd like to make an appointment.|Quería pedir cita.]] · <i>Could I make an appointment with Dr Ellis, please?</i> El <i>I want an appointment</i> suena tan mal como el <i>I want the chicken</i> de la mesa.<br/><b>2. Te preguntan cuándo puedes</b>: <i>Is Thursday morning OK?</i><br/><b>3. Entras</b>: <i>Come in. Sit down, please.</i><br/><b>4. El médico abre</b> con [[What seems to be the problem?|¿Qué le pasa?]] — es fórmula fija; también oirás <i>What's the problem?</i> y <i>How can I help?</i><br/><b>5. Te pregunta desde cuándo</b>: [[When did it start?|¿Cuándo empezó?]] — pasado simple del módulo 1, con su <i>did</i> y su verbo desnudo. Se contesta con los marcadores de aquel módulo: <i>Two days ago.</i> · <i>Last week.</i><br/><b>6. Te explora</b>, y ahí van los imperativos: [[Take a deep breath.|Respire hondo.]] · <i>Open your mouth.</i> · <i>Does it hurt here?</i><br/><br/><b>Dos falsos amigos en esta lección, y los dos caros:</b><br/>· <b>surgery</b> no es «cirugía»: es la consulta o el ambulatorio. (La operación es <i>an operation</i>.)<br/>· <b>a prescription</b> es la receta del médico. <i>A recipe</i> es la de la tortilla — volveremos a ello en la farmacia.",
            table: [
              ["quién habla", "lo que dice"],
              ["tú, por teléfono", "Hello, I'd like to make an appointment, please."],
              ["recepción", "Of course. Is Thursday morning OK?"],
              ["el médico", "Come in, sit down. What seems to be the problem?"],
              ["tú", "I don't feel very well. My throat hurts and I have a temperature."],
              ["el médico", "When did it start?"],
              ["tú", "Two days ago."],
              ["el médico", "Take a deep breath. It's nothing serious."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l4e1", type: "mc", prompt: "Llamas al ambulatorio",
              question: "¿Cuál es la versión que puntúa?",
              options: ["I'd like to make an appointment, please.", "I want an appointment.", "Give me an appointment for Thursday."],
              answer: 0,
              whyWrong: [null, "want con quien te atiende suena a exigencia, igual que en el restaurante del módulo 5", "Imperativo pelado: en inglés eso es una orden, no una petición"],
              itemIds: ["ena2m8idliketomakeanappointment", "ena2m5idlikethechicken"],
              tip: "Es la misma escalera del módulo 5, aplicada a otra ventanilla: I'd like… para pedir algo, Could I…? para pedir permiso. No hay que aprender nada nuevo, solo no olvidarla.",
            },
            {
              id: "ena2m8l4e2", type: "mc", prompt: "El falso amigo del edificio",
              question: "Tienes catarro y fiebre. ¿Adónde vas en Reino Unido?",
              options: ["To the surgery.", "To the hospital.", "To the surgery — es decir, a que me operen."],
              answer: 0,
              whyWrong: [null, "El hospital es para urgencias e ingresos: con un catarro no se va", "surgery aquí NO es cirugía: es el consultorio del médico de cabecera"],
              itemIds: ["ena2m8thesurgery", "enhospital"],
              tip: "the surgery = el ambulatorio. La operación es an operation, y quien te la hace es a surgeon. La palabra engaña ella sola.",
            },
            {
              id: "ena2m8l4e3", type: "build", prompt: "Construye la pregunta del médico",
              target: "What seems to be the problem",
              translation: "¿Qué le pasa?",
              distractors: ["happens", "matter"],
              itemIds: ["ena2m8whatseemstobetheproblem"],
              tip: "Es una fórmula: no la analices palabra a palabra, apréndetela entera. La vas a oír igual en la consulta, en el banco y en el taller.",
            },
            {
              id: "ena2m8l4e4", type: "errorfix", prompt: "Corrige la pregunta del pasado",
              wrong: "When it started to hurt?",
              answers: ["When did it start to hurt?"],
              why: "La pregunta en pasado necesita el auxiliar did, y detrás el verbo se queda desnudo: start, no started. Es la regla del módulo 1, y recae aquí porque la frase es corta y suena bien en español («¿cuándo empezó?»). Sin did, en inglés no hay pregunta.",
              translation: "¿Cuándo empezó a dolerte?",
              itemIds: ["ena2m8whendiditstart", "ena2m8itreallyhurts"],
            },
            {
              id: "ena2m8l4e5", type: "cloze", prompt: "Contesta al médico",
              text: "— When did it start? — It started two days ___.",
              answers: ["ago"],
              translation: "— ¿Cuándo empezó? — Empezó hace dos días.",
              hints: ["«Hace dos días» cierra por detrás", "a…"],
              itemIds: ["ena2m8whendiditstart", "ena2m1twodaysago"],
              tip: "Los marcadores del módulo 1 son justo lo que pide una consulta: two days ago, last week, yesterday morning. Sin ellos, el médico no tiene nada.",
            },
            {
              id: "ena2m8l4e6", type: "order", prompt: "Ordena la visita, de la llamada a la puerta",
              sentences: [
                "Hello, I'd like to make an appointment, please.",
                "Come in and sit down. What seems to be the problem?",
                "I have a sore throat and a temperature.",
                "When did it start?",
                "Take a deep breath. It's nothing serious.",
              ],
              translation: "Hola, quería pedir cita, por favor. — Pase y siéntese. ¿Qué le pasa? — Me duele la garganta y tengo fiebre. — ¿Cuándo empezó? — Respire hondo. No es nada grave.",
              itemIds: ["ena2m8idliketomakeanappointment", "ena2m8whatseemstobetheproblem", "ena2m8ihaveasorethroat", "ena2m8whendiditstart", "ena2m8takeadeepbreath", "ena2m8itsnothingserious"],
              tip: "Ese es el guion completo. Si te lo sabes de memoria, la Parte 2 del oral —donde te toca INICIAR la situación— se resuelve sola.",
            },
            {
              id: "ena2m8l4e7", type: "audiomc", prompt: "En la recepción del ambulatorio — 2 escuchas",
              audio: "Good morning, Dr Ellis's surgery. I'm afraid the doctor is very busy today. Could you come on Thursday at half past four? And please bring your list of medicines.",
              question: "¿Qué le dicen a Valeria?",
              options: ["Que venga el jueves por la tarde", "Que vaya al hospital", "Que llame otra vez mañana"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Nadie nombra el hospital: es la consulta de la doctora Ellis", "No le piden que llame: le dan una hora concreta"],
              notepad: true,
              itemIds: ["ena2m8thesurgery", "ena2m5imafraidwedonthaveany", "enbusy", "enthufri"],
              tip: "Otra vez el «I'm afraid» del módulo 5: en cuanto suena, lo que viene detrás es un no o un pero. Y detrás del pero está el dato que te preguntan.",
            },
            {
              id: "ena2m8l4e8", type: "hearreal", prompt: "¿Libro o calle? Escucha a la recepcionista",
              book: "What is the problem?",
              real: "What's up, love?",
              translation: "¿Qué le pasa?",
              ask: "meaning",
              meaningOptions: ["¿Qué le pasa?", "¿Qué hay ahí arriba?", "¿Está usted enamorada?"],
              itemIds: ["ena2m8whatseemstobetheproblem"],
              tip: "«love» aquí no es «amor»: es la coletilla cariñosa que usan en media Inglaterra con cualquiera, sobre todo fuera de Londres. No significa nada personal.",
            },
            {
              id: "ena2m8l4e9", type: "gapbank", prompt: "La conversación entera: rellena con la ficha que toca",
              text: "— Good morning. I'd like to make an ___, please. — What ___ to be the problem? — My back ___ and I can't sleep. — When did it ___?",
              answers: ["appointment", "seems", "hurts", "start"],
              bank: ["appointment", "seems", "hurts", "start", "surgery", "hospital", "finish"],
              translation: "— Buenos días. Quería pedir cita, por favor. — ¿Qué le pasa? — Me duele la espalda y no puedo dormir. — ¿Cuándo empezó?",
              itemIds: ["ena2m8idliketomakeanappointment", "ena2m8whatseemstobetheproblem", "ena2m8ihurtmyback", "ena2m8whendiditstart"],
              tip: "El último hueco es el de siempre: detrás de did, el verbo va desnudo. Si has puesto «started», vuelve al módulo 1 y repasa la lección 8.",
            },
            {
              id: "ena2m8l4e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Quería pedir cita con la doctora Ellis, por favor.",
              answers: [
                "I'd like to make an appointment with Dr Ellis, please.",
                "I would like to make an appointment with Dr Ellis, please.",
                "Could I make an appointment with Dr Ellis, please?",
              ],
              hint: "empieza por la fórmula del pedido del módulo 5",
              itemIds: ["ena2m8idliketomakeanappointment", "endoctor"],
            },
            {
              id: "ena2m8l4e11", type: "speak", prompt: "Dilo en voz alta — tú, en la consulta",
              text: "I don't feel very well. My throat hurts and it started two days ago.",
              phonetic: "ái dóunt fíil VE-ri UÉL. mái ZRÓUT jéets and it STAA-tid tuu déis̬ a-GÓU",
              translation: "No me encuentro muy bien. Me duele la garganta y empezó hace dos días.",
              itemIds: ["ena2m8idontfeelwell", "ena2m8ihaveasorethroat", "ena2m1twodaysago"],
              tip: "Tres datos en dos frases: cómo estás, qué te duele y desde cuándo. Con eso, cualquier médico del mundo ya puede trabajar.",
            },
            {
              id: "ena2m8l4e12", type: "type", prompt: "Cierre de producción",
              question: "Quería pedir cita. Me duele la espalda y empezó la semana pasada.",
              answers: [
                "I'd like to make an appointment. My back hurts and it started last week.",
                "I would like to make an appointment. My back hurts and it started last week.",
                "I'd like to make an appointment, please. My back hurts and it started last week.",
              ],
              hints: ["I'd like + to + verbo · la espalda como sujeto · marcador del módulo 1", "I'd like to make an a… My back h… and it started l… week."],
              itemIds: ["ena2m8idliketomakeanappointment", "ena2m8ihurtmyback", "ena2m1lastweek"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-3",
            book: "I have a stomach ache.",
            real: "I've got a dodgy tummy.",
            meaning: "Tengo la tripa fatal",
            when: "Entre amigos, en casa y en el trabajo, para no dar detalles. Purísimo inglés británico. En la consulta y en el examen, la del libro: «a stomach ache» es lo que entiende el médico y lo que puntúa por escrito.",
            register: "amigos",
            note: "dodgy es «poco fiable, chungo»: sirve para una tripa, un coche y una web. Y tummy es «tripa» en el registro de andar por casa.",
            sound: "áiv got a DO-dchi TA-mi",
            level: "a2",
            itemId: "ena2m8achegroup",
          },
        },
      ],
      resources: [
        { label: "British Council — At the doctor's", url: "https://learnenglish.britishcouncil.org/general-english/audio-zone", note: "Busca un audio de consulta médica y escúchalo dos veces: la primera, solo para pillar la pregunta del médico; la segunda, para apuntar los síntomas. Así se entrena el Listening del examen." },
        { label: "NHS — Find a GP surgery", url: "https://www.nhs.uk/nhs-services/gps/", note: "Cinco minutos por la web real del sistema público británico. Fíjate solo en el vocabulario: surgery, GP, appointment, prescription. Es exactamente el de esta lección." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — la clínica de sonido: /ɜː/ y los grupos finales
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l5",
      phaseId: "ena2m8",
      title: "hurt, nurse, worse, first, work",
      subtitle: "La vocal larga que no tiene r — y las consonantes que se amontonan al final",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Los sonidos de esta lección",
          itemIds: ["ena2m8hurtgroup", "ena2m8acough", "ena2m8icoughedallnight", "ena2m8itsgettingworse", "ena2m8itreallyhurts", "ennurse", "enfirst"],
        },
        {
          kind: "note",
          note: {
            title: "Una vocal, cinco escrituras distintas y ni una r",
            body: "Mira estas cinco palabras: <b>h<u>ur</u>t · n<u>ur</u>se · w<u>or</u>se · f<u>ir</u>st · w<u>or</u>k</b>. Se escriben de tres maneras (-ur-, -or-, -ir-) y <b>suenan exactamente igual</b>: una vocal floja, larga, con la boca casi cerrada y la lengua quieta en el centro. En español no existe; lo más parecido es la e de «Ernesto» dicha con desgana y estirada.<br/><br/><b>Y lo importante: no hay r.</b> El inglés británico no pronuncia la r si detrás no viene una vocal. <i>hurt</i> es «jéet», <i>nurse</i> es «nées», <i>work</i> es «uéek». Meter la r española ahí es lo que hace que <i>work</i> suene a <i>walk</i> y que no te entiendan.<br/><br/>Del A1 ya traes dos de las cinco: [[nurse|enfermera]] y [[first|primero]]. Hoy se les suman <b>hurt</b>, <b>worse</b> y <b>work</b>, que son las tres que más vas a usar en este módulo.<br/><br/><b>La segunda mitad de la clínica</b> es la de siempre, la que se cobra desde el módulo 1: las consonantes amontonadas al final. <i>coughed</i> es <b>una</b> sílaba: «koft». <i>asked</i> es «aaskt». <i>worked</i> es «uéekt». La boca española quiere abrir una vocal detrás («cofed», «askéd») y ahí se va la marca de pasado.<br/><br/>Y un aviso de ortografía: <b>cough</b> se lee «kof» — la -gh suena F, como en <i>enough</i> y <i>laugh</i>. Rima con «off», no con «go».",
            table: [
              ["se escribe", "suena", "no suena"],
              ["hurt", "jéet", "«jurt»"],
              ["nurse", "nées", "«nurs»"],
              ["worse", "uées", "«uors»"],
              ["first", "féest", "«first»"],
              ["work", "uéek", "«uork»"],
              ["coughed", "koft (una sílaba)", "«co-fed»"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l5e1", type: "bucket", prompt: "¿Lleva la vocal larga de hurt, o no?",
              categories: ["suena como hurt", "otra vocal"],
              items: [
                { text: "nurse", bucket: 0 },
                { text: "worse", bucket: 0 },
                { text: "first", bucket: 0 },
                { text: "work", bucket: 0 },
                { text: "hot", bucket: 1 },
                { text: "walk", bucket: 1 },
                { text: "heart", bucket: 1 },
                { text: "word", bucket: 0 },
              ],
              itemIds: ["ena2m8hurtgroup", "ennurse", "enfirst"],
              tip: "heart es la trampa: se escribe casi como hurt y suena «jaat», con la a bien abierta. Son dos palabras distintas y dos vocales distintas.",
            },
            {
              id: "ena2m8l5e2", type: "mc", prompt: "La r que no está",
              question: "¿Cómo suena «It hurts»?",
              options: ["it JÉETS", "it JURTS", "it JAATS"],
              answer: 0,
              whyWrong: [null, "La r española no va: detrás de la vocal, en inglés británico la r no suena", "Esa es la vocal de heart, que es otra palabra"],
              itemIds: ["ena2m8itreallyhurts", "ena2m8hurtgroup"],
              tip: "Regla del curso, y sirve para todo el inglés británico: la r solo se pronuncia si detrás hay una vocal. En hurt no la hay.",
            },
            {
              id: "ena2m8l5e3", type: "shadow", prompt: "Repite pegado al audio — las cinco seguidas",
              text: "hurt, nurse, worse, first, work",
              phonetic: "jéet · nées · uées · féest · uéek",
              translation: "doler, enfermera, peor, primero, trabajo",
              reps: 3,
              itemIds: ["ena2m8hurtgroup"],
              tip: "Dilo sin mover la lengua entre palabra y palabra: la vocal es la misma en las cinco. Si notas que la boca se te abre, has metido una vocal española.",
            },
            {
              id: "ena2m8l5e4", type: "mc", prompt: "La ortografía que engaña",
              question: "«cough» rima con…",
              options: ["off", "go", "though"],
              answer: 0,
              whyWrong: [null, "Esa sería la lectura de dough o though; cough no", "though es «dóu», sin f al final"],
              itemIds: ["ena2m8acough"],
              tip: "La -gh inglesa es un cementerio de sonidos: en cough y enough suena F, en though no suena nada, y en night tampoco. Se aprende palabra a palabra.",
            },
            {
              id: "ena2m8l5e5", type: "listen", prompt: "Dictado — una sílaba, tres consonantes",
              text: "I coughed all night.",
              translation: "Me pasé la noche tosiendo.",
              hints: ["cough + la terminación del pasado", "I cough… all night."],
              itemIds: ["ena2m8icoughedallnight", "ena2m8acough"],
              tip: "coughed suena «koft»: k-o-f-t, sin ninguna vocal detrás de la f. Es el mismo cierre de asked y worked del módulo 1.",
            },
            {
              id: "ena2m8l5e6", type: "speak", prompt: "Dilo en voz alta — la frase de la consulta",
              text: "It really hurts and it's getting worse.",
              phonetic: "it RÍA-li JÉETS and its GUE-ting UÉES",
              translation: "Me duele muchísimo y va a peor.",
              itemIds: ["ena2m8itreallyhurts", "ena2m8itsgettingworse"],
              tip: "Dos veces la misma vocal larga: hurts y worse. Si te salen iguales, la clínica está hecha.",
            },
            {
              id: "ena2m8l5e7", type: "errorfix", prompt: "Corrige la posición del adverbio",
              wrong: "It hurts really much.",
              answers: ["It really hurts."],
              why: "Del módulo 3: lo que gradúa al verbo va DELANTE del verbo (really hurts) o al final del todo (it hurts a lot), nunca detrás del verbo suelto. Y «really much» no es una pareja que exista: o really + verbo, o very much al final.",
              translation: "Me duele muchísimo.",
              itemIds: ["ena2m8itreallyhurts", "ena2m3ireallylikethisfilm"],
            },
            {
              id: "ena2m8l5e8", type: "cloze", prompt: "Completa con el comparativo",
              text: "My back is getting ___ , not better.",
              answers: ["worse"],
              translation: "La espalda me va a peor, no a mejor.",
              hints: ["El comparativo irregular de bad, del módulo 4", "w…"],
              itemIds: ["ena2m8itsgettingworse", "ena2m4badworseworst"],
            },
            {
              id: "ena2m8l5e9", type: "match", prompt: "Empareja el sonido con su palabra",
              pairs: [
                { target: "hurt", source: "jéet — doler" },
                { target: "cough", source: "kof — la tos" },
                { target: "worse", source: "uées — peor" },
                { target: "knee", source: "níi — la rodilla" },
              ],
              itemIds: ["ena2m8hurtgroup", "ena2m8acough", "ena2m8bodypartsgroup"],
              tip: "Las cuatro se leen fatal si te fías de las letras. Este módulo tiene mala ortografía en casi todas sus palabras clave: fíate del oído.",
            },
            {
              id: "ena2m8l5e10", type: "audiomc", prompt: "Escucha a la enfermera — 2 escuchas",
              audio: "The nurse asked me a lot of questions. She worked here first, before the hospital, and she said my knee was getting worse.",
              question: "¿Qué dijo la enfermera de la rodilla?",
              options: ["Que va a peor", "Que ya está bien", "Que hay que operar"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "worse es «peor»: justo lo contrario", "No dice nada de operaciones"],
              itemIds: ["ena2m8itsgettingworse", "ena2m8hurtgroup", "ennurse"],
              tip: "Cuenta cuántas veces suena la vocal larga en ese audio: nurse, worked, first, worse. Cuatro en dos frases. Por eso se entrena.",
            },
            {
              id: "ena2m8l5e11", type: "type", prompt: "Cierre de producción",
              question: "Me pasé la noche tosiendo y hoy me duele el pecho.",
              answers: [
                "I coughed all night and today my chest hurts.",
                "I coughed all night and my chest hurts today.",
                "Last night I coughed all night and today my chest hurts.",
              ],
              hints: ["cough + -ed, y la parte del cuerpo como sujeto", "I cough… all night and today my ch… hurts."],
              itemIds: ["ena2m8icoughedallnight", "ena2m8bodypartsgroup", "ena2m8myheadhurts"],
              tip: "Dilo en voz alta antes de darle a corregir: koft, chest, jéets. Tres cierres consonánticos seguidos y ni una vocal de propina.",
            },
          ],
        },
      ],
      resources: [
        { label: "BBC Learning English — The sounds of English", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca el vídeo de la vocal /ɜː/ (la de nurse) y míralo dos veces: una mirando la boca, otra con los ojos cerrados. Es la vocal más rentable del módulo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — el consejo suave: Why don't you…? y el imperativo entre iguales
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l6",
      phaseId: "ena2m8",
      title: "Why don't you go home?",
      subtitle: "Aconsejar sin «should»: la pregunta que en realidad es un consejo",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que le dices a quien está malo",
          itemIds: ["ena2m8whydontyougohome", "ena2m8whynottakeadayoff", "ena2m8gotobedandrest", "ena2m8dontgotoworktoday", "ena2m8drinklotsofwater", "endontworry", "ena2m8whatsthematter"],
        },
        {
          kind: "note",
          note: {
            title: "El consejo del A2 se da preguntando",
            body: "Aquí hay una sorpresa, y conviene decirla de frente: <b>en este módulo no vas a aprender «should»</b>. No es un olvido. «Should» es material de B1 en el programa oficial, y el A2 da el consejo con otras herramientas — las mismas que usa un nativo la mayor parte del tiempo. Al B1 llegarás con «should» aprendido en dos minutos; lo que no se aprende en dos minutos es esto:<br/><br/><b>1. Why don't you…?</b> — la reina. Parece una pregunta y es un consejo: [[Why don't you go home?|¿Por qué no te vas a casa?]] · <i>Why don't you phone the surgery?</i><br/>Detrás va el <b>verbo desnudo</b>, sin to: <i>Why don't you <b>rest</b>?</i><br/>Y el orden es el de cualquier pregunta con auxiliar: <b>Why + don't + you + verbo</b>. El calco <i>Why you don't go home?</i> es el mismo fallo de siempre —la pregunta española se hace con entonación y la inglesa con auxiliar—, y aquí duele el doble porque la frase es de las que más vas a decir.<br/><br/><b>2. Why not…?</b> — la versión corta, sin sujeto y con el verbo desnudo: [[Why not take a day off?|¿Por qué no te coges un día libre?]] Se usa igual, es más rápida y no lleva <i>to</i>.<br/><br/><b>3. El imperativo.</b> En el módulo 5 aprendiste que pedir con imperativo suena mandón. <b>Aconsejar con imperativo, no.</b> Es la diferencia entre pedir algo para ti («Give me a coffee») y ofrecer algo para el otro: [[Go to bed and rest.|Vete a la cama y descansa.]] · [[Drink lots of water.|Bebe mucha agua.]] · <i>Take an aspirin.</i> Nadie se ofende: el imperativo del consejo es un regalo, no una orden.<br/>Y en negativo, con <b>don't</b>: [[Don't go to work today.|Hoy no vayas a trabajar.]]<br/><br/>Un aviso pequeño y útil: el imperativo del consejo funciona <b>entre iguales y de arriba abajo</b> (amigos, familia, el médico contigo). Si le hablas a un desconocido o a alguien mayor, envuélvelo: <i>Why don't you…?</i> siempre vale.",
            table: [
              ["fórmula", "ejemplo", "detrás va…"],
              ["Why don't you…?", "Why don't you go home?", "verbo desnudo, sin to"],
              ["Why not…?", "Why not take a day off?", "verbo desnudo, sin sujeto"],
              ["imperativo", "Go to bed and rest.", "el verbo, y ya"],
              ["imperativo negativo", "Don't go to work today.", "Don't + verbo"],
              ["lo que NO", "Why you don't go home?", "falta el auxiliar don't delante"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l6e1", type: "mc", prompt: "Tu compañera de piso tiene fiebre y se va a trabajar",
              question: "¿Qué le dices?",
              options: ["Why don't you stay at home?", "Why you don't stay at home?", "Why not to stay at home?"],
              answer: 0,
              whyWrong: [null, "Falta el auxiliar en su sitio: Why DON'T YOU, en ese orden", "Con «Why not» el verbo va desnudo: Why not stay at home?"],
              itemIds: ["ena2m8whydontyougohome", "ena2m8whynottakeadayoff", "ena2m1istayedathome"],
              tip: "Why don't you…? es la fórmula más útil del módulo. Apréndetela como bloque, con el don't y el you pegados: nunca se separan.",
            },
            {
              id: "ena2m8l6e2", type: "bucket", prompt: "¿Consejo bien dado o frase que no existe?",
              categories: ["así se aconseja", "así no se dice"],
              items: [
                { text: "Why don't you go home?", bucket: 0 },
                { text: "Why you don't go home?", bucket: 1 },
                { text: "Why not take a day off?", bucket: 0 },
                { text: "Why not to take a day off?", bucket: 1 },
                { text: "Go to bed and rest.", bucket: 0 },
                { text: "Don't go to work today.", bucket: 0 },
                { text: "Not go to work today.", bucket: 1 },
                { text: "Drink lots of water.", bucket: 0 },
              ],
              itemIds: ["ena2m8whydontyougohome", "ena2m8whynottakeadayoff", "ena2m8gotobedandrest", "ena2m8dontgotoworktoday", "ena2m8drinklotsofwater"],
              tip: "Las tres malas fallan en lo mismo: el auxiliar. O falta (Why you don't…), o sobra un to (Why not to…), o se ha olvidado el don't del imperativo negativo.",
            },
            {
              id: "ena2m8l6e3", type: "errorfix", prompt: "Corrige el orden de la pregunta",
              wrong: "Why you don't phone the surgery?",
              answers: ["Why don't you phone the surgery?"],
              why: "En inglés la pregunta se construye con el auxiliar DELANTE del sujeto: don't you, no you don't. El español pregunta con entonación («¿por qué no llamas?») y por eso la mano coloca el sujeto primero. El bloque es fijo: Why don't you + verbo.",
              translation: "¿Por qué no llamas al ambulatorio?",
              itemIds: ["ena2m8whydontyougohome", "ena2m8thesurgery", "ena2m1phoned"],
            },
            {
              id: "ena2m8l6e4", type: "transform", prompt: "Del imperativo al consejo envuelto",
              source: "Go home and rest.",
              instruction: "Dilo con «Why don't you…?»",
              answers: ["Why don't you go home and rest?"],
              translation: "¿Por qué no te vas a casa y descansas?",
              hints: ["Why + don't + you + el verbo desnudo", "Why don't you g… home and rest?"],
              itemIds: ["ena2m8whydontyougohome", "ena2m8gotobedandrest"],
              tip: "Las dos versiones son correctas y dicen lo mismo. La envuelta vale con cualquiera; la pelada, con gente de confianza.",
            },
            {
              id: "ena2m8l6e5", type: "cloze", prompt: "Completa el consejo",
              text: "You look terrible. Why ___ you take a day off?",
              answers: ["don't"],
              translation: "Tienes muy mala cara. ¿Por qué no te coges un día libre?",
              hints: ["El auxiliar va entre Why y you", "d…"],
              itemIds: ["ena2m8whynottakeadayoff", "ena2m1terrible"],
            },
            {
              id: "ena2m8l6e6", type: "build", prompt: "Construye el consejo en negativo",
              target: "Don't go to work today",
              translation: "Hoy no vayas a trabajar",
              distractors: ["not", "you"],
              itemIds: ["ena2m8dontgotoworktoday", "engotowork"],
              tip: "El imperativo negativo es siempre Don't + verbo, para tú y para usted, para uno y para muchos. Una forma y se acabó.",
            },
            {
              id: "ena2m8l6e7", type: "match", prompt: "Empareja el problema con el consejo",
              pairs: [
                { target: "Why don't you go home?", source: "Tiene fiebre y sigue en la oficina." },
                { target: "Drink lots of water.", source: "Le duele la cabeza y no ha bebido nada." },
                { target: "Don't go to work today.", source: "Se pasó la noche tosiendo." },
                { target: "Go to bed and rest.", source: "No ha dormido en dos días." },
              ],
              itemIds: ["ena2m8whydontyougohome", "ena2m8drinklotsofwater", "ena2m8dontgotoworktoday", "ena2m8gotobedandrest", "ena2m2ididntsleep"],
            },
            {
              id: "ena2m8l6e8", type: "listen", prompt: "Dictado — el consejo entero",
              text: "Why don't you go home and drink lots of water?",
              translation: "¿Por qué no te vas a casa y bebes mucha agua?",
              hints: ["Empieza por Why d…", "…go home and drink lots of water?"],
              itemIds: ["ena2m8whydontyougohome", "ena2m8drinklotsofwater", "enwater"],
              tip: "Al hablar, «don't you» se funde y suena «dóunchu». Si esperas oír las dos palabras separadas, no las vas a oír nunca.",
            },
            {
              id: "ena2m8l6e9", type: "write", prompt: "Contéstale a Amy — 30-50 palabras",
              scenario: "Amy te escribe: lleva tres días con tos y fiebre y sigue yendo al hospital a trabajar. Contéstale con dos consejos y pregúntale cómo se encuentra.",
              bullets: [
                "Dile que sientes que esté mala",
                "Dale un consejo con «Why don't you…?»",
                "Dale otro con «You need to…»",
                "Pregúntale cómo se encuentra",
              ],
              checks: [
                { re: "sorry to hear|poor you|that's terrible", label: "decir que lo sientes" },
                { re: "why don't you|why not", label: "un consejo con Why don't you…?" },
                { re: "you need to", label: "un consejo con You need to…" },
                { re: "how are you feeling|how do you feel", label: "preguntar cómo se encuentra" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hi Amy, I'm sorry to hear you're ill. Why don't you stay at home tomorrow? You need to see a doctor, because three days with a temperature is a long time. And please, no more night shifts! How are you feeling now? Valeria",
              itemIds: ["ena2m8whydontyougohome", "ena2m8youneedtoseeadoctor", "ena2m8howareyoufeeling", "ena2m8ihaveatemperature"],
              tip: "Cuenta cuántos consejos has dado y cómo has envuelto cada uno. Si los dos empiezan igual, cambia uno: el examen premia la variedad de fórmulas, no la cantidad de palabras.",
            },
            {
              id: "ena2m8l6e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "¿Por qué no te vas a la cama? Hoy no vayas a trabajar.",
              answers: [
                "Why don't you go to bed? Don't go to work today.",
                "Why don't you go to bed? Don't go to work today!",
                "Why not go to bed? Don't go to work today.",
              ],
              hint: "el auxiliar delante del sujeto, y el negativo con Don't",
              itemIds: ["ena2m8whydontyougohome", "ena2m8dontgotoworktoday", "engotobed"],
            },
            {
              id: "ena2m8l6e11", type: "speak", prompt: "Dilo en voz alta — los tres consejos seguidos",
              text: "Why don't you go home? Go to bed and rest. And don't go to work tomorrow!",
              phonetic: "uái dóunchu góu JÓUM? góu tu bed and REST. and dóunt góu tu uéek tu-MO-rou",
              translation: "¿Por qué no te vas a casa? Vete a la cama y descansa. ¡Y mañana no vayas a trabajar!",
              itemIds: ["ena2m8whydontyougohome", "ena2m8gotobedandrest", "ena2m8dontgotoworktoday"],
              tip: "Fíjate en que solo la primera sube al final: es la única con forma de pregunta. Las otras dos bajan, como todas las órdenes y consejos.",
            },
            {
              id: "ena2m8l6e12", type: "type", prompt: "Cierre de producción",
              question: "¿Por qué no te coges un día libre? Bebe mucha agua y descansa.",
              answers: [
                "Why don't you take a day off? Drink lots of water and rest.",
                "Why not take a day off? Drink lots of water and rest.",
                "Why don't you take a day off? Drink lots of water and have a rest.",
              ],
              hints: ["Consejo envuelto + dos imperativos", "Why d… you take a day off? Dr… lots of water and rest."],
              itemIds: ["ena2m8whynottakeadayoff", "ena2m8drinklotsofwater", "ena2m8gotobedandrest"],
              tip: "Tres consejos, dos formas distintas y ni un «should». Eso es exactamente lo que pide el A2.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-4",
            book: "Why don't you rest for a while?",
            real: "Why don't you have a lie-down?",
            meaning: "¿Por qué no te echas un rato?",
            when: "En casa, con familia y amigos, cuando alguien está agotado o malo. Muy británico y muy de todos los días. En el examen, la del libro: rest es la palabra que entiende cualquier corrector.",
            register: "amigos",
            note: "a lie-down es «una tumbada»: un sustantivo hecho del verbo lie down. El inglés fabrica muchos así — a chat, a walk, a look.",
            sound: "uái dóunchu jav a LÁI-daun",
            level: "a2",
            itemId: "ena2m8whydontyougohome",
          },
        },
      ],
      resources: [
        { label: "British Council — Giving advice", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca un diálogo donde alguien pida consejo y apunta las fórmulas que oigas. Verás que «Why don't you…?» sale muchísimo más que cualquier otra." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — la escala de fuerza: must > have to > need to > why don't you
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l7",
      phaseId: "ena2m8",
      title: "You need to see a doctor",
      subtitle: "De la orden al consejo: los cuatro peldaños, de un vistazo",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Cuatro maneras de decir lo mismo, con cuatro pesos distintos",
          itemIds: ["ena2m8advicescale", "ena2m8youneedtoseeadoctor", "ena2m8youhavetostayinbed", "ena2m8doineedtoseeadoctor", "ena2m8itsnothingserious", "endoctor"],
        },
        {
          kind: "note",
          note: {
            title: "La escala: la misma idea, cuatro pesos",
            body: "El módulo 7 te dejó <b>must</b> y <b>have to</b> para las normas. El consejo es lo mismo, pero más flojo. Y como todo está hecho de las mismas piezas, se puede ver entero de un vistazo:<br/><br/><b>1. You must rest.</b> — lo más fuerte. Es la norma o la orden del que manda: un cartel, un médico serio, tu jefe. No deja elección.<br/><b>2. You have to rest.</b> — obligación, pero la impone la vida, no quien habla: [[You have to stay in bed.|Tienes que quedarte en la cama.]] Es la que se usa de verdad al hablar.<br/><b>3. You need to rest.</b> — <b>el peldaño del consejo firme</b>, y probablemente la fórmula más útil de todo el módulo: [[You need to see a doctor.|Tienes que ir al médico.]] Dice «esto te hace falta», no «esto te lo mando».<br/><b>4. Why don't you rest?</b> — lo más suave, el de la lección anterior. Sugerencia pura.<br/><br/><b>Detrás de need y de have va TO; detrás de must, no.</b> Es la trampa del hispanohablante número ocho, la de «tengo <u>que</u> ir»:<br/>· <i>You must <b>stay</b> in bed.</i> ✓ — <i>You must to stay in bed.</i> ✗<br/>· <i>You need <b>to</b> stay in bed.</i> ✓ — <i>You need stay in bed.</i> ✗<br/><br/>Y una ventaja gorda de <b>need to</b>: como no es un modal de verdad, hace preguntas y negativas <b>con do</b>, igual que cualquier verbo normal del A1:<br/>· [[Do I need to see a doctor?|¿Tengo que ir al médico?]]<br/>· <i>You don't need to stay in bed.</i><br/><br/>Si solo te llevas una cosa de esta lección: <b>You need to…</b> sirve para el 90 % de los consejos que vas a dar en tu vida en inglés, y no necesita «should» para nada.",
            table: [
              ["fuerza", "fórmula", "quién lo dice", "¿lleva to?"],
              ["máxima", "You must rest.", "el cartel, el jefe, el médico serio", "no"],
              ["alta", "You have to rest.", "la situación te obliga", "sí"],
              ["media — el consejo firme", "You need to rest.", "quien te quiere bien", "sí"],
              ["suave", "Why don't you rest?", "un amigo", "no"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l7e1", type: "bucket", prompt: "¿Te obligan o te aconsejan?",
              categories: ["obligación: no hay elección", "consejo: decides tú"],
              items: [
                { text: "You must stay in bed.", bucket: 0 },
                { text: "You have to take these tablets.", bucket: 0 },
                { text: "You need to see a doctor.", bucket: 1 },
                { text: "Why don't you go home?", bucket: 1 },
                { text: "You must not drive with this medicine.", bucket: 0 },
                { text: "Why not take a day off?", bucket: 1 },
              ],
              itemIds: ["ena2m8advicescale", "ena2m8youhavetostayinbed", "ena2m8youneedtoseeadoctor", "ena2m8whydontyougohome", "ena2m8whynottakeadayoff"],
              tip: "La frontera está entre have to y need to: a la izquierda te lo imponen, a la derecha te lo recomiendan. En español las tres primeras suenan igual («tienes que»), y por eso hay que mirar la fuerza, no la traducción.",
            },
            {
              id: "ena2m8l7e2", type: "mc", prompt: "El infinitivo que sobra",
              question: "¿Cuál es la buena?",
              options: ["You must stay in bed.", "You must to stay in bed.", "You must staying in bed."],
              answer: 0,
              whyWrong: [null, "Detrás de must nunca va to: el español «tienes QUE» empuja a ponerlo", "Detrás de must va el verbo desnudo, no la forma en -ing"],
              itemIds: ["ena2m8youhavetostayinbed", "ena2m8advicescale"],
              tip: "Regla de bolsillo: si delante hay must, can o will, no hay to. Si hay need o have, sí lo hay. No es lógica, es reparto — y se aprende de memoria.",
            },
            {
              id: "ena2m8l7e3", type: "errorfix", prompt: "Corrige el modal",
              wrong: "You must to stay in bed for two days.",
              answers: ["You must stay in bed for two days."],
              why: "Detrás de must el verbo va desnudo. El «que» de «tienes que quedarte» se traduce en have TO y need TO, pero con must no hay nada en medio. Es el mismo error de «I can to swim» que ya viste en el A1.",
              translation: "Tienes que quedarte en la cama dos días.",
              itemIds: ["ena2m8youhavetostayinbed"],
            },
            {
              id: "ena2m8l7e4", type: "errorfix", prompt: "Y ahora el to que falta",
              wrong: "You need see a doctor today.",
              answers: ["You need to see a doctor today."],
              why: "need funciona como un verbo normal, no como un modal: siempre lleva to delante del segundo verbo. Justo al revés que must. Por eso conviene aprenderlos en pareja, uno contra otro.",
              translation: "Tienes que ir al médico hoy.",
              itemIds: ["ena2m8youneedtoseeadoctor"],
            },
            {
              id: "ena2m8l7e5", type: "gapbank", prompt: "La conversación en el trabajo: rellena con la ficha que toca",
              text: "— I feel awful. — Why ___ you go home? You ___ to rest, and ___ go to work tomorrow!",
              answers: ["don't", "need", "don't"],
              bank: ["don't", "need", "must", "doesn't", "not", "why"],
              translation: "— Me encuentro fatal. — ¿Por qué no te vas a casa? Tienes que descansar, ¡y mañana no vayas a trabajar!",
              itemIds: ["ena2m8whydontyougohome", "ena2m8youneedtoseeadoctor", "ena2m8dontgotoworktoday"],
              tip: "El mismo don't hace dos trabajos distintos: en el primer hueco es el auxiliar de la pregunta y en el tercero es la negación del imperativo. Misma palabra, dos oficios.",
            },
            {
              id: "ena2m8l7e6", type: "paraphrase", prompt: "Dilo con menos fuerza — baja un peldaño",
              source: "You must stay in bed.",
              forbid: ["must"],
              answers: ["You need to stay in bed.", "You have to stay in bed."],
              translation: "Tienes que quedarte en la cama.",
              itemIds: ["ena2m8youhavetostayinbed", "ena2m8advicescale"],
              tip: "Las dos salidas dicen lo mismo con menos autoridad. Y las dos añaden el to que must no llevaba: ese es el precio de bajar de peldaño.",
            },
            {
              id: "ena2m8l7e7", type: "transform", prompt: "De la afirmación a la pregunta",
              source: "You need to see a doctor.",
              instruction: "Pregúntalo de ti: «¿tengo que ir al médico?»",
              answers: ["Do I need to see a doctor?"],
              translation: "¿Tengo que ir al médico?",
              hints: ["need no es modal: pregunta con do, como cualquier verbo del A1", "D… I need to see a doctor?"],
              itemIds: ["ena2m8doineedtoseeadoctor", "ena2m8youneedtoseeadoctor"],
              tip: "Ahí se ve que need to es un verbo normal: nadie dice «Need I…?» en el día a día. Con do delante, siempre.",
            },
            {
              id: "ena2m8l7e8", type: "cloze", prompt: "Completa con el peldaño que toca",
              text: "It's nothing serious, but you ___ to rest for two or three days.",
              answers: ["need"],
              translation: "No es nada grave, pero tienes que descansar dos o tres días.",
              hints: ["El consejo firme del médico, el de en medio de la escala", "n…"],
              itemIds: ["ena2m8youneedtoseeadoctor", "ena2m8itsnothingserious"],
            },
            {
              id: "ena2m8l7e9", type: "audiomc", prompt: "La doctora Ellis, al final de la consulta — 2 escuchas",
              audio: "Well, it's nothing serious. You don't need to take antibiotics, but you need to rest. Why don't you stay at home for a couple of days? And drink lots of water.",
              question: "¿Qué le dice la doctora?",
              options: ["Que descanse en casa un par de días", "Que tome antibióticos", "Que vaya al hospital"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice justo lo contrario: «you DON'T need to take antibiotics»", "No nombra el hospital en ningún momento"],
              notepad: true,
              itemIds: ["ena2m8itsnothingserious", "ena2m8youneedtoseeadoctor", "ena2m8whydontyougohome", "ena2m8drinklotsofwater"],
              tip: "Ojo al don't del principio: la opción falsa está construida con la palabra que SÍ suena. En el examen, la trampa es siempre esa.",
            },
            {
              id: "ena2m8l7e10", type: "match", prompt: "Empareja cada frase con su fuerza",
              pairs: [
                { target: "You must rest.", source: "orden: no hay elección" },
                { target: "You have to rest.", source: "obligación: te obliga la situación" },
                { target: "You need to rest.", source: "consejo firme: te hace falta" },
                { target: "Why don't you rest?", source: "sugerencia: tú verás" },
              ],
              itemIds: ["ena2m8advicescale"],
              tip: "En español las cuatro caben en «tienes que descansar» o «descansa». El inglés reparte esa idea en cuatro pesos, y elegir mal el peso es un error de registro, no de gramática.",
            },
            {
              id: "ena2m8l7e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "No es nada grave, pero tienes que ir al médico.",
              answers: [
                "It's nothing serious, but you need to see a doctor.",
                "It isn't anything serious, but you need to see a doctor.",
                "It's nothing serious, but you have to see a doctor.",
              ],
              hint: "el peldaño de en medio, el del consejo firme",
              itemIds: ["ena2m8itsnothingserious", "ena2m8youneedtoseeadoctor"],
            },
            {
              id: "ena2m8l7e12", type: "type", prompt: "Cierre de producción",
              question: "Tienes que quedarte en la cama. ¿Por qué no llamas al ambulatorio?",
              answers: [
                "You need to stay in bed. Why don't you phone the surgery?",
                "You have to stay in bed. Why don't you phone the surgery?",
                "You need to stay in bed. Why don't you call the surgery?",
              ],
              hints: ["Un peldaño con to + el consejo envuelto de la lección 6", "You n… to stay in bed. Why d… you phone the surgery?"],
              itemIds: ["ena2m8youhavetostayinbed", "ena2m8whydontyougohome", "ena2m8thesurgery"],
              tip: "Dos consejos seguidos y de distinta fuerza: primero el firme, luego el suave. Así habla alguien que sabe manejar la escala, y así puntúa el oral.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — must, have to, need to", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-obligation-necessity", note: "Lee la ficha entera y fíjate solo en una cosa: cuáles llevan to detrás y cuáles no. Todo lo demás de esa página ya lo tienes del módulo 7." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — la farmacia: el mostrador donde se resuelve casi todo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l8",
      phaseId: "ena2m8",
      title: "Have you got anything for a cough?",
      subtitle: "La farmacia inglesa — y la receta que no es de cocina",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "En el mostrador",
          itemIds: ["ena2m8thechemists", "ena2m8haveyougotanythingfor", "ena2m8somepainkillers", "ena2m8aprescription", "ena2m8takeonetabletthreetimesaday", "ena2m5canihavesomewater", "enhowmuchisit"],
        },
        {
          kind: "note",
          note: {
            title: "En Reino Unido, la farmacia es «the chemist's»",
            body: "La farmacia se llama <b>the chemist's</b> —con apóstrofo y s, porque significa «la tienda del farmacéutico»—, y también <i>the pharmacy</i>, que es la palabra del cartel oficial y del hospital. En la calle, la gente dice <i>chemist's</i> o directamente el nombre de la cadena (<i>Boots</i>).<br/><br/><b>La frase que abre cualquier farmacia del mundo anglosajón</b> es esta, y merece la pena aprenderla entera:<br/>[[Have you got anything for a cough?|¿Tiene algo para la tos?]]<br/>Cambias lo último y ya tienes veinte frases: <i>…for a sore throat? …for a headache? …for a cold?</i><br/><br/><b>Y el falso amigo caro del módulo:</b><br/>· <b>a prescription</b> = la receta del médico, el papel con el que te dan la medicina.<br/>· <b>a recipe</b> = la receta de cocina. Nada más.<br/>Pedir <i>a recipe</i> en la farmacia es pedir la receta de la tortilla, y ahí no la tienen.<br/><br/><b>Lo que te van a decir</b>, casi siempre en imperativo, que aquí es instrucción y no orden:<br/>· [[Take one tablet three times a day.|Tome un comprimido tres veces al día.]]<br/>· <i>Take it after meals.</i> — después de las comidas.<br/>· <i>Don't take it with alcohol.</i><br/><br/>Y el vocabulario mínimo: <b>a tablet</b> o <b>a pill</b> (un comprimido), <b>painkillers</b> (algo para el dolor), <b>cough medicine</b> (jarabe), <b>plasters</b> (tiritas).",
            table: [
              ["en español", "en inglés"],
              ["la farmacia", "the chemist's / the pharmacy"],
              ["¿Tiene algo para la tos?", "Have you got anything for a cough?"],
              ["la receta del médico", "a prescription"],
              ["la receta de cocina", "a recipe"],
              ["un comprimido", "a tablet / a pill"],
              ["algo para el dolor", "painkillers"],
              ["tres veces al día", "three times a day"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l8e1", type: "fastmatch", prompt: "Ráfaga — los síntomas de las lecciones de atrás",
              pairs: [
                { target: "a cough", source: "la tos" },
                { target: "a sore throat", source: "dolor de garganta" },
                { target: "a temperature", source: "fiebre" },
                { target: "a headache", source: "dolor de cabeza" },
                { target: "a cold", source: "un resfriado" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m8acough", "ena2m8ihaveasorethroat", "ena2m8ihaveatemperature", "ena2m8ihaveaheadache", "ena2m8ihaveacold"],
              tip: "Los cinco van detrás de «Have you got anything for…?». Si salen rápido, la farmacia está resuelta.",
            },
            {
              id: "ena2m8l8e2", type: "mc", prompt: "Tienes tos y quieres un jarabe",
              question: "¿Adónde vas?",
              options: ["To the chemist's.", "To the surgery.", "To the recipe."],
              answer: 0,
              whyWrong: [null, "El ambulatorio es para ver al médico, no para comprar un jarabe", "recipe es la receta de cocina, y además no es un sitio"],
              itemIds: ["ena2m8thechemists", "ena2m8thesurgery", "ena2m8acough"],
              tip: "En Reino Unido, el farmacéutico atiende y aconseja de verdad: para un catarro, mucha gente va al chemist's y no pide cita en el médico.",
            },
            {
              id: "ena2m8l8e3", type: "errorfix", prompt: "Corrige el falso amigo",
              wrong: "The doctor gave me a recipe for some tablets.",
              answers: ["The doctor gave me a prescription for some tablets."],
              why: "a recipe es la receta de cocina: harina, huevos y un horno. El papel que firma el médico es a prescription, del verbo prescribe. Se parecen a «receta» las dos, y por eso este falso amigo lo comete todo el mundo una vez.",
              translation: "El médico me dio una receta para unos comprimidos.",
              itemIds: ["ena2m8aprescription", "endoctor"],
            },
            {
              id: "ena2m8l8e4", type: "cloze", prompt: "Completa la preposición",
              text: "Have you got anything ___ a sore throat?",
              answers: ["for"],
              translation: "¿Tiene algo para la garganta?",
              hints: ["«Para» aquí no es to", "f…"],
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8ihaveasorethroat"],
              tip: "anything FOR + el problema. Es un bloque fijo: no lo traduzcas palabra a palabra, cámbiale solo el final.",
            },
            {
              id: "ena2m8l8e5", type: "build", prompt: "Construye la pregunta del mostrador",
              target: "Have you got anything for a cough",
              translation: "¿Tiene algo para la tos?",
              distractors: ["some", "to"],
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8acough"],
              tip: "En pregunta va anything, no something: es la regla del módulo 5. Y la preposición es for, nunca to.",
            },
            {
              id: "ena2m8l8e6", type: "hearreal", prompt: "¿Libro o calle? Escucha al cliente de delante",
              book: "Have you got anything for a headache?",
              real: "Got anything for a headache?",
              translation: "¿Tiene algo para el dolor de cabeza?",
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8ihaveaheadache"],
              tip: "Al hablar rápido, el «Have you» del principio desaparece entero. Se entiende igual, pero tú escríbelo siempre: en el examen, una pregunta sin auxiliar es un error.",
            },
            {
              id: "ena2m8l8e7", type: "listen", prompt: "Dictado — la instrucción de la caja",
              text: "Take one tablet three times a day.",
              translation: "Tome un comprimido tres veces al día.",
              hints: ["Empieza por Take one t…", "…three times a day."],
              itemIds: ["ena2m8takeonetabletthreetimesaday"],
              tip: "«three times a day» lleva ese «a» que en español no está: una vez al día es once a day. Ese artículo se cae siempre y es de los que se notan.",
            },
            {
              id: "ena2m8l8e8", type: "audiomc", prompt: "En Boots, el farmacéutico — 2 escuchas",
              audio: "This is very good for a cough. Take one tablet three times a day, after meals. But don't take it with the painkillers you have at home.",
              question: "¿Qué le dice el farmacéutico?",
              options: ["Que no lo mezcle con los analgésicos que ya tiene", "Que lo tome antes de las comidas", "Que vuelva mañana con una receta"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice «after meals», después de las comidas", "No pide ninguna receta: se lo vende directamente"],
              notepad: true,
              itemIds: ["ena2m8takeonetabletthreetimesaday", "ena2m8somepainkillers", "ena2m8acough"],
              tip: "Los avisos de una farmacia van casi siempre en imperativo negativo: don't take it with…, don't drive… En cuanto oigas un «don't», apunta lo que viene detrás.",
            },
            {
              id: "ena2m8l8e9", type: "match", prompt: "Empareja lo de la farmacia",
              pairs: [
                { target: "a prescription", source: "la receta del médico" },
                { target: "a tablet", source: "un comprimido" },
                { target: "painkillers", source: "algo para el dolor" },
                { target: "plasters", source: "tiritas" },
              ],
              itemIds: ["ena2m8aprescription", "ena2m8somepainkillers", "ena2m8takeonetabletthreetimesaday", "ena2m8acutabruise"],
            },
            {
              id: "ena2m8l8e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "¿Tiene algo para la tos? Y necesito algo para el dolor.",
              answers: [
                "Have you got anything for a cough? And I need some painkillers.",
                "Do you have anything for a cough? And I need some painkillers.",
                "Have you got anything for a cough? And I need something for the pain.",
              ],
              hint: "el bloque fijo del mostrador, con anything",
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8somepainkillers", "ena2m8acough"],
            },
            {
              id: "ena2m8l8e11", type: "speak", prompt: "Dilo en voz alta — tú, en el mostrador",
              text: "Have you got anything for a cough? And could I have some painkillers, please?",
              phonetic: "jav yu got E-ni-zing foo a KOF? and kud ái jav sam PÉIN-ki-las̬, plíis̬",
              translation: "¿Tiene algo para la tos? ¿Y me da algo para el dolor, por favor?",
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8somepainkillers", "ena2m5couldihavethemenu"],
              tip: "Segunda frase: la escalera de cortesía del módulo 5, intacta. En una farmacia inglesa nadie pide con imperativo, igual que en un restaurante.",
            },
            {
              id: "ena2m8l8e12", type: "type", prompt: "Cierre de producción",
              question: "¿Tiene algo para el dolor de garganta? Tengo la receta del médico aquí.",
              answers: [
                "Have you got anything for a sore throat? I have the prescription from the doctor here.",
                "Have you got anything for a sore throat? I have my prescription here.",
                "Do you have anything for a sore throat? I have my prescription here.",
              ],
              hints: ["anything for + el problema · y la receta NO es recipe", "Have you got anything f… a sore throat? I have the pr… here."],
              itemIds: ["ena2m8haveyougotanythingfor", "ena2m8ihaveasorethroat", "ena2m8aprescription"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-5",
            book: "Have you got anything for a cough?",
            real: "Have you got anything for a tickly cough?",
            meaning: "¿Tiene algo para la tos seca, esa que pica?",
            when: "En la farmacia, tal cual: en Reino Unido distinguen «tickly cough» (seca, que pica) de «chesty cough» (con flema), y los jarabes vienen etiquetados así. Saberlo te ahorra comprar el que no es. En el examen basta con «a cough».",
            register: "neutral",
            note: "tickly es de tickle, «hacer cosquillas»: una tos que hace cosquillas. Y chesty viene de chest, el pecho.",
            sound: "jav yu got E-ni-zing foo a TÍ-kli KOF",
            level: "a2",
            itemId: "ena2m8acough",
          },
        },
      ],
      resources: [
        { label: "NHS — Pharmacies (what they can help with)", url: "https://www.nhs.uk/nhs-services/pharmacies/", note: "Léelo por encima y quédate con dos cosas: qué te resuelve una farmacia sin médico, y cómo llaman a cada producto. Es vocabulario real, del sistema real." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — cierre, misión y la frontera con el B1: should
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m8l9",
      phaseId: "ena2m8",
      title: "How are you feeling?",
      subtitle: "La consulta entera, de la puerta a la despedida — y una ventana al B1",
      minutes: 14,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar por alguien y despedirse",
          itemIds: ["ena2m8howareyoufeeling", "ena2m8imuchbetterthanks", "ena2m8getwellsoon", "ena2m8shouldfrontier", "ena2m8itsnothingserious", "enhowareyou"],
        },
        {
          kind: "note",
          note: {
            title: "«How are you?» y «How are you feeling?» no son la misma pregunta",
            body: "Del A1 traes [[How are you?|¿Qué tal?]], que en inglés es <b>un saludo</b>: se contesta «Fine, thanks» aunque tengas cuarenta de fiebre, y nadie espera un informe médico.<br/><br/>Cuando alguien sabe que estás malo, la pregunta cambia: [[How are you feeling?|¿Cómo te encuentras?]] Esta sí pregunta de verdad, y se contesta de verdad:<br/>· [[I'm much better, thanks.|Estoy mucho mejor, gracias.]]<br/>· <i>A bit better.</i> · <i>Not great, to be honest.</i> · <i>The same.</i><br/><br/>Ojo con <b>much better</b>: es el «mucho mejor» del módulo 4, y va con <b>much</b>, nunca con <i>more</i>. <i>More better</i> no existe en ningún inglés.<br/><br/>Y para despedirte de quien está malo, la fórmula fija: [[Get well soon!|¡Que te mejores!]] Se dice, se escribe en las tarjetas y se pone al final de los mensajes. Un imperativo más que no es ninguna orden.",
            table: [
              ["situación", "pregunta", "respuesta típica"],
              ["te cruzas con alguien", "How are you?", "Fine, thanks. And you?"],
              ["sabes que está malo", "How are you feeling?", "I'm much better, thanks."],
              ["te despides de alguien malo", "Get well soon!", "Thanks!"],
              ["lo que NO se dice", "I'm more better.", "much better, siempre"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — las cuatro fórmulas del consejo",
              pairs: [
                { target: "You must rest.", source: "orden: no hay elección" },
                { target: "You have to rest.", source: "obligación de la situación" },
                { target: "You need to rest.", source: "consejo firme" },
                { target: "Why don't you rest?", source: "sugerencia suave" },
                { target: "Go to bed and rest.", source: "consejo en imperativo" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m8advicescale", "ena2m8youneedtoseeadoctor", "ena2m8whydontyougohome", "ena2m8gotobedandrest"],
              tip: "El cronómetro solo premia. Si las cinco salen sin pensar, tienes el consejo del A2 entero — y sin una sola palabra prestada del B1.",
            },
            {
              id: "ena2m8l9e2", type: "mc", prompt: "Amy sabe que llevas dos días con fiebre y te llama",
              question: "¿Qué te pregunta?",
              options: ["How are you feeling?", "How are you?", "How do you do?"],
              answer: 0,
              whyWrong: [null, "Ese es el saludo de siempre: se contesta «Fine, thanks» y ya", "How do you do? es de presentarse, y hoy suena antiguo"],
              itemIds: ["ena2m8howareyoufeeling", "enhowareyou"],
              tip: "La diferencia es real: How are you? es cortesía, How are you feeling? es interés. Confundirlas no rompe nada, pero contestar «fine, thanks» a la segunda deja la conversación coja.",
            },
            {
              id: "ena2m8l9e3", type: "errorfix", prompt: "Corrige el comparativo",
              wrong: "I'm more better today, thanks.",
              answers: ["I'm much better today, thanks."],
              why: "better ya es el comparativo de good: no admite «more» delante. Y para reforzarlo se usa much, el mismo del módulo 4 (much cheaper, much bigger). «More better» no existe ni en inglés hablado.",
              translation: "Hoy estoy mucho mejor, gracias.",
              itemIds: ["ena2m8imuchbetterthanks", "ena2m4goodbetterbest", "ena2m4muchcheaper"],
            },
            {
              id: "ena2m8l9e4", type: "gapbank", prompt: "La semana de Valeria, entera: rellena con la ficha que toca",
              text: "Last week I ___ off my bike and cut my ___. It ___ a lot, so I went to the surgery. Dr Ellis gave me a ___ for some painkillers.",
              answers: ["fell", "hand", "hurt", "prescription"],
              bank: ["fell", "hand", "hurt", "prescription", "recipe", "broke", "bruise"],
              translation: "La semana pasada me caí de la bici y me corté la mano. Me dolía mucho, así que fui al ambulatorio. La doctora Ellis me dio una receta para unos analgésicos.",
              itemIds: ["ena2m8icutmyfinger", "ena2m8ihurtmyback", "ena2m8thesurgery", "ena2m8aprescription", "ena2m8somepainkillers"],
              tip: "Dos fichas están ahí para cazarte: «recipe» (la receta de la tortilla) y «broke» (que pediría un hueso, no un corte). El resto lo decide el sentido.",
            },
            {
              id: "ena2m8l9e5", type: "order", prompt: "Ordena el mensaje de voz que le dejas a Ben",
              sentences: [
                "Hi Ben, it's Valeria. Sorry, I can't come tonight.",
                "I fell off my bike on Tuesday and I hurt my knee.",
                "I went to the surgery and the doctor said it was nothing serious.",
                "But I have to rest for a few days.",
                "How are you? See you next week!",
              ],
              translation: "Hola, Ben, soy Valeria. Perdona, no puedo ir esta noche. Me caí de la bici el martes y me hice daño en la rodilla. Fui al ambulatorio y la médica dijo que no era nada grave. Pero tengo que descansar unos días. ¿Qué tal tú? ¡Nos vemos la semana que viene!",
              itemIds: ["ena2m8ihurtmyback", "ena2m8thesurgery", "ena2m8itsnothingserious", "ena2m8youhavetostayinbed", "ena2m5afewfriends"],
              tip: "Ese es el orden de cualquier excusa en inglés: disculpa, qué pasó, qué dijo el médico, qué te toca ahora. Y al final, devolver la pregunta.",
            },
            {
              id: "ena2m8l9e6", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "¿Cómo te encuentras? — Mucho mejor, gracias.",
              answers: [
                "How are you feeling? I'm much better, thanks.",
                "How are you feeling? Much better, thanks.",
                "How are you feeling? I feel much better, thanks.",
              ],
              hint: "la pregunta del que sabe que estabas malo, y el refuerzo del módulo 4",
              itemIds: ["ena2m8howareyoufeeling", "ena2m8imuchbetterthanks"],
            },
            {
              id: "ena2m8l9e7", type: "listen", prompt: "Dictado — la despedida",
              text: "Get well soon!",
              translation: "¡Que te mejores!",
              hints: ["Empieza por Get w…", "…soon!"],
              itemIds: ["ena2m8getwellsoon"],
              tip: "Tres palabras y un imperativo que nadie toma por una orden. Es lo que se escribe en las tarjetas y al final de los mensajes.",
            },
          ],
        },
        {
          kind: "note",
          note: {
            title: "FRONTERA con el B1: «should», que hoy solo hay que reconocer",
            body: "Has dado un módulo entero de consejos sin usar <b>should</b>, y eso ha sido a propósito. Pero <b>should</b> existe, se oye a todas horas y en el B1 será tuyo. Hoy solo tienes que <b>entenderlo cuando lo oigas</b>: no se te va a examinar de él, y no hace falta que lo produzcas.<br/><br/><b>Qué es:</b> el «deberías» del inglés. Un consejo de fuerza media, entre <i>need to</i> y <i>why don't you</i>.<br/>· [[You should see a doctor.|Deberías ir al médico.]]<br/>· [[You shouldn't go to work.|No deberías ir a trabajar.]]<br/><br/><b>Cómo se comporta:</b> es un modal, como <i>must</i> y <i>can</i>. Así que:<br/>· detrás va el <b>verbo desnudo</b>, sin to — <i>You should rest</i>, nunca <i>You should to rest</i>;<br/>· no cambia con la persona — <i>he should</i>, no «he shoulds»;<br/>· el negativo es <b>shouldn't</b>, y la l no suena: «shud», «SHU-dent».<br/><br/><b>Y lo que sigue siendo tuyo hoy:</b> cuando quieras dar un consejo, tira de las cuatro del módulo. Son igual de correctas, las usa un nativo todo el rato, y ninguna te va a salir mal por un <i>to</i> de más:<br/><i>You need to see a doctor.</i> · <i>Why don't you see a doctor?</i> · <i>Go and see a doctor.</i> · <i>You have to see a doctor.</i>",
            table: [
              ["lo que oirás (B1)", "lo que dices tú (A2)"],
              ["You should see a doctor.", "You need to see a doctor."],
              ["You should rest.", "Why don't you rest?"],
              ["You shouldn't go to work.", "Don't go to work."],
              ["You should stay in bed.", "You have to stay in bed."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m8l9e8", type: "mc", prompt: "Frontera — solo reconocer",
              question: "El médico te dice: «You shouldn't go to work this week». ¿Qué significa?",
              options: ["No deberías ir a trabajar esta semana", "No puedes ir a trabajar esta semana", "No vas a ir a trabajar esta semana"],
              answer: 0,
              whyWrong: [null, "Eso sería «You can't go to work»: una prohibición, más fuerte", "Eso sería el futuro; should es un consejo, no un plan"],
              itemIds: ["ena2m8shouldfrontier"],
              tip: "Con reconocerlo basta. Para decirlo tú, el módulo ya te ha dado cuatro maneras que no fallan.",
            },
            {
              id: "ena2m8l9e9", type: "bucket", prompt: "¿Ya lo produces tú, o hoy solo hay que entenderlo?",
              categories: ["lo digo yo, hoy mismo", "solo lo reconozco (llega en B1)"],
              items: [
                { text: "You need to see a doctor.", bucket: 0 },
                { text: "You should see a doctor.", bucket: 1 },
                { text: "Why don't you go home?", bucket: 0 },
                { text: "You shouldn't go to work.", bucket: 1 },
                { text: "Go to bed and rest.", bucket: 0 },
                { text: "You have to stay in bed.", bucket: 0 },
              ],
              itemIds: ["ena2m8shouldfrontier", "ena2m8youneedtoseeadoctor", "ena2m8whydontyougohome", "ena2m8gotobedandrest", "ena2m8youhavetostayinbed"],
              tip: "Las cuatro de la izquierda te cubren cualquier consejo que necesites dar en el examen. Las de la derecha las vas a oír mucho antes de tener que decirlas.",
            },
            {
              id: "ena2m8l9e10", type: "translate", prompt: "Traduce al español — frontera, solo comprensión",
              direction: "toEs",
              mode: "recognize",
              source: "You should stay at home and you shouldn't go to work tomorrow.",
              answers: [
                "Deberías quedarte en casa y no deberías ir a trabajar mañana.",
                "Deberías quedarte en casa y mañana no deberías ir a trabajar.",
                "Tendrías que quedarte en casa y no tendrías que ir a trabajar mañana.",
              ],
              hint: "es un consejo, no una orden ni una prohibición",
              itemIds: ["ena2m8shouldfrontier"],
            },
            {
              id: "ena2m8l9e11", type: "audiomc", prompt: "La doctora Ellis se despide — 2 escuchas",
              audio: "It's nothing serious, but you should rest. Take one tablet three times a day and drink lots of water. Come back on Friday if it gets worse. Get well soon!",
              question: "¿Cuándo tiene que volver Valeria?",
              options: ["El viernes, si va a peor", "Mañana por la mañana", "Dentro de tres días, en todo caso"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "No dice nada de mañana", "Las tres veces al día son de las pastillas, no de las visitas"],
              notepad: true,
              itemIds: ["ena2m8itsnothingserious", "ena2m8takeonetabletthreetimesaday", "ena2m8itsgettingworse", "ena2m8getwellsoon"],
              tip: "Ahí va un «should» suelto, y lo has entendido sin pensar. Esa es exactamente la frontera: entra por el oído mucho antes que por la boca.",
            },
            {
              id: "ena2m8l9e12", type: "monologue", prompt: "La misión del módulo: cuenta tu síntoma y pide consejo, en voz alta",
              topic: "Una consulta entera: qué te pasa, desde cuándo, qué te dijeron y qué consejo darías tú",
              slides: [
                { title: "1. Qué te pasa", hint: "I don't feel very well. My back hurts and I have a temperature." },
                { title: "2. Desde cuándo y qué pasó", hint: "It started two days ago. I fell off my bike and I hurt my knee." },
                { title: "3. Qué te dijeron en la consulta", hint: "The doctor said it was nothing serious. I have to rest and take one tablet three times a day." },
                { title: "4. El consejo que le darías tú a alguien igual", hint: "Why don't you go to the surgery? You need to rest. And don't go to work!" },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He nombrado al menos dos partes del cuerpo, cada una con su posesivo (my back, my knee)",
                "He dicho el síntoma sin «I have pain in…» y sin «I feel myself»",
                "He dicho desde cuándo con un marcador del módulo 1 (two days ago, last week)",
                "He dado dos consejos con dos fórmulas distintas: Why don't you…? y You need to…",
                "No he usado «should» ni una vez — y aun así he aconsejado",
              ],
              model: "I don't feel very well. My throat hurts and I have a temperature. It started two days ago, on Monday. On Sunday I fell off my bike in the park and I cut my hand, but that's better now. Yesterday I phoned the surgery and I made an appointment with Dr Ellis. She said it was nothing serious: I have to rest for three days and take one tablet three times a day. So if you feel like this, why don't you phone the surgery? You need to rest, and don't go to work — it only gets worse.",
              itemIds: ["ena2m8idontfeelwell", "ena2m8ihaveasorethroat", "ena2m8ihaveatemperature", "ena2m8idliketomakeanappointment", "ena2m8itsnothingserious", "ena2m8whydontyougohome", "ena2m8youneedtoseeadoctor", "ena2m8takeonetabletthreetimesaday"],
              tip: "La misión de verdad es fuera de la app: cuéntale a alguien un síntoma real y pídele consejo en inglés, hasta que la conversación se resuelva. Lo que te llevas no es una nota: es la consulta resuelta. Grábate las dos pasadas y quédate con la segunda.",
            },
            {
              id: "ena2m8l9e13", type: "type", prompt: "Cierre del módulo — todo en tres frases",
              question: "No me encuentro bien: me duele la garganta y tengo fiebre. ¿Por qué no vas al médico?",
              answers: [
                "I don't feel well: my throat hurts and I have a temperature. Why don't you go to the doctor?",
                "I don't feel very well: my throat hurts and I have a temperature. Why don't you go to the doctor?",
                "I don't feel well: I have a sore throat and a temperature. Why don't you go to the doctor?",
              ],
              hints: ["Sin myself, la garganta como sujeto, y el consejo con el auxiliar delante", "I don't feel well: my throat h… and I have a t… Why d… you go to the doctor?"],
              itemIds: ["ena2m8idontfeelwell", "ena2m8ihaveasorethroat", "ena2m8ihaveatemperature", "ena2m8whydontyougohome"],
              tip: "Ahí está el módulo entero: el síntoma sin reflexivo, el dolor con la parte del cuerpo de sujeto y el consejo envuelto en pregunta. Con esto se resuelve una consulta médica en inglés de principio a fin.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m8-6",
            book: "I'm much better, thanks.",
            real: "I'm on the mend.",
            meaning: "Ya voy mejorando",
            when: "Con amigos, vecinos y compañeros, cuando ya has pasado lo peor pero no estás del todo. Muy común en Reino Unido, sobre todo entre gente mayor. En el examen, la del libro: «much better» es la que enseña el comparativo que puntúan.",
            register: "amigos",
            note: "mend es «arreglar, remendar»: estar «on the mend» es estar en proceso de arreglo, como un jersey en el costurero.",
            sound: "áim on de MEND",
            level: "a2",
            itemId: "ena2m8imuchbetterthanks",
          },
        },
      ],
      resources: [
        { label: "British Council — should (para cuando llegues al B1)", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-advice", note: "Léelo solo por encima, cinco minutos, y sin hacer los ejercicios: hoy basta con reconocer «should» al oírlo. Cuando llegues al B1 lo vas a producir sin esfuerzo." },
        { label: "British Council — A2 Speaking (health)", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca un diálogo de consulta médica y hazlo tú en voz alta las dos partes: primero la del paciente, luego la del médico. La segunda es la que nunca se practica y la que más se oye." },
      ],
    },
  ],
};
