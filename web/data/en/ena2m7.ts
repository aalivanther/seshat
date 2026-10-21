import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 7 — You have to check in: lo que hay que hacer, lo que no
// se puede y lo que se puede pedir. Es el módulo de los TRÁMITES, y por eso va
// justo detrás del futuro (PLAN-EN-A2 §4.2): primero se sabe planear (m6),
// luego se sabe qué te dejan hacer.
//
// Gramática ancla (PLAN-EN-A2 §4.1): must / mustn't / have to / don't have to ·
// can / could / may para petición y permiso · couldn't.
//
// LO QUE ESTE MÓDULO INSTALA Y COBRAN LOS DEMÁS — el REGISTRO NEUTRO-FORMAL.
// La segunda tarea del Writing lo exige y en el A2 no hay pronombre que lo
// marque: en inglés el registro se juega entero en LA FORMA DE LA PETICIÓN
// («I want a stamp» frente a «Could I have a stamp, please?»). La L7 es esa
// lección y no es adorno: es el objetivo. De aquí salen las fórmulas que m8
// (la consulta), m9 (el casero) y m12 (la nota de agradecimiento) reciclan tal
// cual, y el `write` con register:"polite" que ya no vuelve a explicarse.
//
// LOS TRES CONTRASTES CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9):
//   (a) `mustn't` NO es `don't have to`. En español las dos se dicen «no tienes
//       que» y el alumno las usa como sinónimos. Una PROHÍBE y la otra EXIME, y
//       confundirlas en un aviso real es el error más caro del módulo: «you
//       don't have to smoke here» le dice a alguien que puede fumar si le
//       apetece. Se ataca con nombre y apellidos en la L4 entera (bucket de dos
//       columnas —prohíbe / exime—, errorfix y gapbank), se prepara en L3 y se
//       vuelve a pasar por encima en la L9.
//   (b) `must to` / `can to` (§9.1 nº 8). El español pone infinitivo tras la
//       perífrasis —«tengo QUE ir», «debo descansar»— y encima con preposición.
//       El truco de diseño que funciona no es la nota: es el `build` SIN FICHA
//       `to`, o con `to` como distractor que sobra. La ficha que no se puede
//       usar es la enseñanza entera, y por eso hay uno en la L2 (must) y otro
//       en la L6 (can).
//   (c) LA ESCALERA DE CORTESÍA Can I → Could I → May I, y por qué «I want a
//       coffee» suena a orden en inglés y no en español. El español marca la
//       cortesía con el condicional y el «por favor» («quería un café»); el
//       inglés la marca con el MODAL, y quien traduce «quiero» por «I want»
//       suena a niño exigiendo. L7.
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: /məsnt/ —la t de
// `must` que desaparece dentro de `mustn't`—, `hafta` / `hasta`, y el par
// can /kən/ vs can't /kɑːnt/, que en británico es la única pista de si te están
// diciendo que sí o que no.
//
// LO QUE NO SE RE-ENSEÑA:
//   · El pasado entero viene cerrado de `ena2m2` (did/didn't + verbo desnudo).
//     Aquí solo se USA: `didn't have to`, `couldn't` y las averías del taller se
//     cuentan en pasado sin abrir una lección de pasado.
//   · La POSICIÓN DEL ADVERBIO se enseñó en `ena2m3l6` («entre el verbo y su
//     objeto no se mete nada») y aquí solo se REFERENCIA, en la L2, cuando
//     aparece «You must always keep your receipt».
//   · Los determinantes more / most / enough / none / all están en `ena2m4l7`.
//
// FRONTERA CON `ena2m6` (futuro y viaje, que se escribe en paralelo): él se
// queda con el DESPLAZAMIENTO (equipaje, documentos, alojamiento, tráfico,
// andén) y este módulo con el TRÁMITE (facturar, la cola, el impreso, el
// recibo, la ventanilla). Por eso aquí no hay ni una tarjeta de pasaporte ni de
// maleta: el mostrador sí, lo que se mete dentro no.
//
// RECICLADO del A1 y de m1-m4 sin redefinir ids (una palabra, una tarjeta):
// enpostoffice, enbank, enstation, enhospital, enshop, endoctor, enform,
// enfillintheform, ensign, enpostcode, enpostcard, enmessage, enticket,
// encash, enchange, encanipaybycard, encanihaveacoffee, encanihelpyou,
// encanyouhelpme, encanyourepeat, encanyousaythatagain, enicanswim,
// encanyouswim, enicantdance, ensorryicant, enplease, enthankyou,
// enthankyouverymuch, ensorry, enexcuseme, enyourewelcome, enidontunderstand,
// enopen, enclosed, enphonenumber,
// enemailaddress, enneed, encar, encrossthestreet, enturnleft, enstophere,
// enimlost, enhurryup, endontbelate, endontworry, enpound, enhowmuchisit,
// endesk, enoffice, enboss, enwork, enearly, enbusy, enfirst, enthen,
// enalways, ennever, enimlate, entoday (vía ena2m1), ena2m1missedthebus,
// ena2m1whathappened, ena2m1yesidid, ena2m2ilostmyphone, ena2m2mywallet,
// ena2m2mykeys, ena2m2iforgotmykeys, ena2m2paid, ena2m2unfortunately,
// ena2m2luckily, ena2m2becauseimissedthebus, ena2m2soiwalked, ena2m3quickly,
// ena2m3slowly, ena2m3quietly, ena2m3dangerous, ena2m3important,
// ena2m3sheworkshard, ena2m4enoughroom, ena2m4noneofthem, ena2m4allofthem.
//
// TODOS los ids nuevos llevan el prefijo "ena2m7": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m7: Record<string, VocabItem> = {
  // ── ena2m7l1 — have to: la obligación que viene de fuera ──
  ena2m7youhavetocheckin: {
    id: "ena2m7youhavetocheckin", target: "You have to check in first.",
    source: "Primero hay que facturar. (lo manda el mostrador, no yo)",
    sound: "yu jav tu CHEK in féest",
    gram: { same: ["You need to check in first."] },
  },
  ena2m7ihavetogotothebank: {
    id: "ena2m7ihavetogotothebank", target: "I have to go to the bank.",
    source: "Tengo que ir al banco.",
    sound: "ái jav tu góu tu de BANK",
    gram: { same: ["I need to go to the bank."] },
  },
  ena2m7shehastoworkonsaturday: {
    id: "ena2m7shehastoworkonsaturday", target: "She has to work on Saturday.",
    source: "Tiene que trabajar el sábado.",
    sound: "shi jas̬ tu UÉEK on SÁ-ta-dei",
    gram: { trap: "She have to work on Saturday.", same: ["She needs to work on Saturday."] },
  },
  ena2m7doihavetopay: {
    id: "ena2m7doihavetopay", target: "Do I have to pay?",
    source: "¿Hay que pagar? / ¿Tengo que pagar?",
    sound: "du ái jav tu PÉI",
    gram: { trap: "I have to pay?", same: ["Is it compulsory to pay?"] },
  },
  ena2m7whatdoihavetodo: {
    id: "ena2m7whatdoihavetodo", target: "What do I have to do?",
    source: "¿Qué tengo que hacer?",
    sound: "uót du ái jav tu DÚU",
    gram: { trap: "What I have to do?" },
  },
  ena2m7thequeue: { id: "ena2m7thequeue", target: "the queue", source: "la cola (de gente)", sound: "de KIÚU — se dice igual que la letra Q" },

  // ── ena2m7l2 — must: la voz de la norma, y el verbo desnudo detrás ──
  ena2m7passengersmustshow: {
    id: "ena2m7passengersmustshow", target: "Passengers must show their tickets.",
    source: "Los viajeros deben mostrar el billete. (así habla un aviso)",
    sound: "PA-sin-dchas̬ mast SHÓU dea TÍ-kits",
    gram: { trap: "Passengers must to show their tickets.", same: ["Passengers have to show their tickets."] },
  },
  ena2m7imustgo: {
    id: "ena2m7imustgo", target: "I must go.",
    source: "Me tengo que ir. (me lo impongo yo, nadie me obliga)",
    sound: "ái mast GÓU",
    gram: { trap: "I must to go.", same: ["I have to go."] },
  },
  ena2m7youmustkeepyourreceipt: {
    id: "ena2m7youmustkeepyourreceipt", target: "You must always keep your receipt.",
    source: "Hay que guardar siempre el recibo.",
    sound: "yu mast ÓOL-ueis̬ kiip yoo ri-SÍIT",
    gram: { same: ["You have to keep your receipt."] },
  },
  ena2m7thereceipt: { id: "ena2m7thereceipt", target: "the receipt", source: "el recibo, el tique", sound: "de ri-SÍIT — la p no suena" },
  ena2m7youmustsignhere: { id: "ena2m7youmustsignhere", target: "You must sign here.", source: "Tiene que firmar aquí.", sound: "yu mast SÁIN jía" },
  ena2m7itsthelaw: { id: "ena2m7itsthelaw", target: "It's the law.", source: "Es la ley. (no es que yo quiera)", sound: "its de LÓO" },

  // ── ena2m7l3 — mustn't: lo que está prohibido, y los carteles ──
  ena2m7youmustntsmoke: {
    id: "ena2m7youmustntsmoke", target: "You mustn't smoke in here.",
    source: "Aquí no se puede fumar. (está prohibido)",
    sound: "yu MA-sent smóuk in JÍA",
    gram: { trap: "You don't have to smoke in here.", same: ["Smoking isn't allowed in here."] },
  },
  ena2m7smokingisntallowed: {
    id: "ena2m7smokingisntallowed", target: "Smoking isn't allowed.",
    source: "No está permitido fumar.",
    sound: "SMÓU-king Í-s̬ent a-LÁUD",
    gram: { trap: "Is not allowed to smoke.", same: ["You can't smoke here."] },
  },
  ena2m7nosmoking: { id: "ena2m7nosmoking", target: "No smoking", source: "Prohibido fumar (en un cartel)", sound: "nóu SMÓU-king" },
  ena2m7donotenter: { id: "ena2m7donotenter", target: "Do not enter", source: "No pasar (en un cartel)", sound: "du not ÉN-ta" },
  ena2m7outoforder: { id: "ena2m7outoforder", target: "Out of order", source: "Averiado / fuera de servicio", sound: "áut ov ÓO-da" },
  ena2m7staffonly: { id: "ena2m7staffonly", target: "Staff only", source: "Solo personal", sound: "staaf ÓUN-li" },
  ena2m7pushpull: { id: "ena2m7pushpull", target: "Push / Pull", source: "Empujar / Tirar — pull es «tirar de», nunca «pulsar»", sound: "push / pul" },

  // ── ena2m7l4 — don't have to: lo que NO hace falta ──
  ena2m7youdonthavetopay: {
    id: "ena2m7youdonthavetopay", target: "You don't have to pay.",
    source: "No hace falta pagar. (puedes, pero nadie te obliga)",
    sound: "yu dóunt jav tu PÉI",
    gram: { trap: "You mustn't pay.", same: ["You don't need to pay."] },
  },
  ena2m7shedoesnthavetowait: {
    id: "ena2m7shedoesnthavetowait", target: "She doesn't have to wait.",
    source: "No tiene por qué esperar.",
    sound: "shi DA-s̬ent jav tu UÉIT",
    gram: { trap: "She doesn't has to wait." },
  },
  ena2m7ididnthavetopay: {
    id: "ena2m7ididnthavetopay", target: "I didn't have to pay.",
    source: "No tuve que pagar. (al final salió gratis)",
    sound: "ái DÍ-dent jav tu PÉI",
    gram: { trap: "I didn't had to pay." },
  },
  ena2m7itsuptoyou: { id: "ena2m7itsuptoyou", target: "It's up to you.", source: "Tú decides. / Como quieras.", sound: "its AP tu yu" },
  ena2m7isitcompulsory: {
    id: "ena2m7isitcompulsory", target: "Is it compulsory?",
    source: "¿Es obligatorio?",
    sound: "is̬ it kom-PAL-sa-ri",
    gram: { same: ["Do I have to?"] },
  },

  // ── ena2m7l5 — la clínica: /məsnt/, hafta, y can frente a can't ──
  ena2m7mustntsound: { id: "ena2m7mustntsound", target: "mustn't", source: "no debes, está prohibido — y la primera t NO suena: queda «MA-sent»", sound: "MA-sent" },
  ena2m7haftahasta: { id: "ena2m7haftahasta", target: "have to → hafta · has to → hasta", source: "así suenan de verdad en cuanto alguien habla a velocidad normal", sound: "JAF-ta / JAS-ta" },
  ena2m7cantstrong: { id: "ena2m7cantstrong", target: "I can help you. / I can't help you.", source: "can va átono y cortito; can't es largo y abierto — ahí está TODA la diferencia entre un sí y un no", sound: "ái kan JELP yu / ái KAANT jelp yu" },
  ena2m7couldyousound: { id: "ena2m7couldyousound", target: "Could you…?", source: "al hablar se funde en un «cud-cha» de una sola pieza", sound: "KUD-cha" },

  // ── ena2m7l6 — can / can't: permiso y petición ──
  ena2m7canisithere: {
    id: "ena2m7canisithere", target: "Can I sit here?",
    source: "¿Puedo sentarme aquí?",
    sound: "kan ái SIT jía",
    gram: { trap: "Can I to sit here?", same: ["Is this seat free?"] },
  },
  ena2m7youcantparkhere: {
    id: "ena2m7youcantparkhere", target: "You can't park here.",
    source: "Aquí no se puede aparcar.",
    sound: "yu KAANT paak jía",
    gram: { trap: "You don't can park here.", same: ["You mustn't park here."] },
  },
  ena2m7canyoucheckit: { id: "ena2m7canyoucheckit", target: "Can you check it for me?", source: "¿Me lo puedes mirar? (en el taller)", sound: "kan yu CHEK it fo mi" },
  ena2m7ofcourseyoucan: { id: "ena2m7ofcourseyoucan", target: "Of course you can.", source: "Claro que sí. (conceder permiso)", sound: "ov KÓOS yu kan" },
  ena2m7imafraidyoucant: {
    id: "ena2m7imafraidyoucant", target: "I'm afraid you can't.",
    source: "Lo siento, no puede ser. (denegar con educación)",
    sound: "áim a-FRÉID yu KAANT",
    gram: { same: ["Sorry, that isn't possible."] },
  },
  ena2m7thecashpoint: { id: "ena2m7thecashpoint", target: "the cashpoint", source: "el cajero automático", sound: "de KASH-point" },

  // ── ena2m7l7 — la escalera de cortesía: can → could → may ──
  ena2m7couldihaveastamp: {
    id: "ena2m7couldihaveastamp", target: "Could I have a stamp, please?",
    source: "¿Me pone un sello, por favor?",
    sound: "kud ái jav a STAMP, plíis̬",
    gram: { trap: "I want a stamp.", same: ["Can I have a stamp, please?"] },
  },
  ena2m7astamp: { id: "ena2m7astamp", target: "a stamp", source: "un sello", sound: "a stamp" },
  ena2m7mayiaskaquestion: {
    id: "ena2m7mayiaskaquestion", target: "May I ask a question?",
    source: "¿Puedo hacerle una pregunta? (lo más formal de los tres)",
    sound: "méi ái aask a KUÉS-chon",
    gram: { trap: "May I to ask a question?", same: ["Could I ask a question?"] },
  },
  ena2m7idliketosendthis: {
    id: "ena2m7idliketosendthis", target: "I'd like to send this to Spain.",
    source: "Quisiera mandar esto a España.",
    sound: "áid láik tu SEND dis tu spéin",
    gram: { trap: "I want to send this to Spain.", same: ["Could I send this to Spain, please?"] },
  },
  ena2m7isitpossibleto: { id: "ena2m7isitpossibleto", target: "Is it possible to pay by card?", source: "¿Se puede pagar con tarjeta? (neutro, sirve en cualquier ventanilla)", sound: "is̬ it PO-si-bol tu péi bái KAAD" },
  ena2m7thankyouforyourhelp: { id: "ena2m7thankyouforyourhelp", target: "Thank you for your help.", source: "Gracias por su ayuda. (el cierre neutro-formal)", sound: "zank yu fo yoo JELP" },

  // ── ena2m7l8 — couldn't: lo que no hubo manera de hacer ──
  ena2m7icouldntgetthrough: { id: "ena2m7icouldntgetthrough", target: "I couldn't get through.", source: "No conseguí hablar con nadie. (el teléfono comunicando)", sound: "ái KU-dent guet ZRÚU" },
  ena2m7icouldntfindit: {
    id: "ena2m7icouldntfindit", target: "I couldn't find it.",
    source: "No lo encontré. (lo intenté y no hubo manera)",
    sound: "ái KU-dent FÁIND it",
    gram: { trap: "I didn't could find it.", same: ["I wasn't able to find it."] },
  },
  ena2m7themachinedidntwork: {
    id: "ena2m7themachinedidntwork", target: "The machine didn't work.",
    source: "La máquina no funcionaba.",
    sound: "de ma-SHÍIN DÍ-dent uéek",
    gram: { trap: "The machine didn't worked.", same: ["The machine was out of order."] },
  },
  ena2m7thegarage: { id: "ena2m7thegarage", target: "the garage", source: "el taller (y también el garaje)", sound: "de GA-ridch" },
  ena2m7thepetrolstation: { id: "ena2m7thepetrolstation", target: "the petrol station", source: "la gasolinera", sound: "de PE-trol STÉI-shon" },
  ena2m7emergencynumber: { id: "ena2m7emergencynumber", target: "999 — the emergency number", source: "el 999: emergencias en Reino Unido (el 112 también entra)", sound: "náin náin NÁIN" },

  // ── ena2m7l9 — cierre: leer el cartel y contarlo ──
  ena2m7whatdoesthesignsay: {
    id: "ena2m7whatdoesthesignsay", target: "What does that sign say?",
    source: "¿Qué pone en ese cartel?",
    sound: "uót das̬ dat SÁIN séi",
    gram: { trap: "What says that sign?", same: ["What does that notice mean?"] },
  },
  ena2m7imsorrytobotheryou: { id: "ena2m7imsorrytobotheryou", target: "I'm sorry to bother you.", source: "Perdone que le moleste. (la apertura neutro-formal)", sound: "áim SO-ri tu BO-da yu" },
};

export const ena2m7: Phase = {
  id: "ena2m7",
  level: "a2",
  n: 7,
  title: "You have to check in",
  goal: "Manejarte en una ventanilla: decir lo que hay que hacer (have to, must), entender lo que está prohibido en un cartel (mustn't) y distinguirlo de lo que simplemente no hace falta (don't have to), pedir permiso y pedir favores con la cortesía que toca (can, could, may) y contar lo que no conseguiste hacer (couldn't).",
  color: "#1d4ed8",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — have to: la obligación que viene de fuera
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l1",
      phaseId: "ena2m7",
      title: "You have to check in",
      subtitle: "«Tengo que…», «hay que…»: la obligación que no pusiste tú",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Lo que hay que hacer",
          itemIds: ["ena2m7youhavetocheckin", "ena2m7ihavetogotothebank", "ena2m7shehastoworkonsaturday", "ena2m7doihavetopay", "ena2m7whatdoihavetodo", "ena2m7thequeue", "enbank", "enpostoffice"],
        },
        {
          kind: "note",
          note: {
            title: "have to = tener que, y punto",
            body: "Buenas noticias para empezar el módulo: <b>have to</b> es la traducción exacta de <i>tener que</i>. Misma idea, mismo uso, y encima se conjuga como cualquier otro verbo que ya conoces.<br/><br/>«Tengo que ir al banco» → [[I have to go to the bank.|Tengo que ir al banco.]]<br/>«Tiene que trabajar el sábado» → [[She has to work on Saturday.|Tiene que trabajar el sábado.]]<br/><br/><b>Y ahí está la única trampa</b>: en tercera persona es <b>has to</b>, con la -s de siempre. La misma -s del A1 (<i>she works</i>, <i>he lives</i>), que el español no marca porque ya la lleva la terminación del verbo y por eso se cae al hablar. Aquí se cae exactamente igual, así que vigílala.<br/><br/>Detrás de <b>have to</b> el verbo va en su forma de diccionario: <i>go</i>, <i>work</i>, <i>pay</i>. Nunca <i>going</i>, nunca <i>goes</i>.<br/><br/><b>Y el «hay que» impersonal.</b> El español tiene una forma para hablar sin sujeto: «hay que facturar», «hay que hacer cola». El inglés no la tiene, así que usa <b>you</b> — un <i>you</i> que no señala a nadie, exactamente como el «tú» de «si tú vas al banco un lunes, te comes la cola». [[You have to check in first.|Primero hay que facturar.]] no le está diciendo nada a nadie en particular: es la norma del sitio.",
            table: [
              ["persona", "forma", "ejemplo"],
              ["I / you / we / they", "have to", "I have to go to the bank."],
              ["he / she / it", "has to", "She has to work on Saturday."],
              ["impersonal («hay que»)", "you have to", "You have to check in first."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Preguntar y negar: con do y does, como siempre",
            body: "Esto es lo que hace a <b>have to</b> tan fácil: se comporta como un verbo normal y corriente, así que la pregunta y la negativa se hacen con el <b>do / does</b> del A1. Nada nuevo que aprender.<br/><br/>[[Do I have to pay?|¿Hay que pagar?]] · [[What do I have to do?|¿Qué tengo que hacer?]] · <i>Does she have to wait?</i><br/><br/>Ojo a la pregunta, que es donde el español mete la pata: nosotros preguntamos con la entonación y nada más («¿tengo que pagar?»), y de ahí sale el clásico <i>I have to pay?</i>, que en inglés escrito no es una pregunta. El auxiliar <b>do</b> no es opcional: es lo que convierte la frase en pregunta.<br/><br/>Y fíjate en <i>Does she have to…?</i>: la -s ya se la ha llevado <b>does</b>, así que detrás vuelve <b>have</b>, no <i>has</i>. Es el mismo reparto que <i>Does she work?</i> del módulo 4 del A1.",
            table: [
              ["afirmativa", "negativa", "pregunta"],
              ["I have to pay.", "I don't have to pay.", "Do I have to pay?"],
              ["She has to wait.", "She doesn't have to wait.", "Does she have to wait?"],
              ["You have to queue.", "You don't have to queue.", "Do you have to queue?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l1e1", type: "mc", prompt: "«Tengo que ir al banco»",
              question: "¿Cuál es la buena?",
              options: ["I have to go to the bank.", "I have that go to the bank.", "I have to going to the bank."],
              answer: 0,
              whyWrong: [null, "El «que» del español no se traduce: have to ya es «tener que» entero", "Detrás de have to, el verbo va en su forma de diccionario: go"],
              itemIds: ["ena2m7ihavetogotothebank", "enbank"],
              tip: "have to es una pieza de dos palabras. No la abras por la mitad para meter nada dentro.",
            },
            {
              id: "ena2m7l1e2", type: "cloze", prompt: "La -s de tercera persona, otra vez",
              text: "She ___ to work on Saturday.",
              answers: ["has"],
              translation: "Tiene que trabajar el sábado.",
              hints: ["Es she: la -s no se perdona", "ha…"],
              itemIds: ["ena2m7shehastoworkonsaturday"],
            },
            {
              id: "ena2m7l1e3", type: "errorfix", prompt: "Corrige la -s que se cayó",
              wrong: "She have to work on Saturday.",
              answers: ["She has to work on Saturday."],
              why: "Con he, she o it, have se convierte en has. En español la persona ya va en la terminación del verbo («trabaja»), así que esta -s suena a información repetida y se cae sola al hablar. En el examen no se cae: se penaliza.",
              translation: "Tiene que trabajar el sábado.",
              itemIds: ["ena2m7shehastoworkonsaturday"],
            },
            {
              id: "ena2m7l1e4", type: "bucket", prompt: "¿have to o has to?",
              categories: ["have to", "has to"],
              items: [
                { text: "I ___ pay", bucket: 0 },
                { text: "Ben ___ work", bucket: 1 },
                { text: "we ___ wait", bucket: 0 },
                { text: "Amy ___ sign", bucket: 1 },
                { text: "they ___ queue", bucket: 0 },
                { text: "my sister ___ go", bucket: 1 },
              ],
              itemIds: ["ena2m7shehastoworkonsaturday", "ena2m7ihavetogotothebank"],
              tip: "La regla es la misma de siempre: he / she / it van solos por un lado, todos los demás por el otro.",
            },
            {
              id: "ena2m7l1e5", type: "transform", prompt: "Pásala a pregunta",
              source: "I have to pay.",
              instruction: "Hazla pregunta",
              answers: ["Do I have to pay?"],
              translation: "¿Hay que pagar?",
              hints: ["have to es un verbo normal: la pregunta la abre do", "D… I have to pay?"],
              itemIds: ["ena2m7doihavetopay"],
            },
            {
              id: "ena2m7l1e6", type: "errorfix", prompt: "Corrige la pregunta que solo tiene entonación",
              wrong: "I have to pay?",
              answers: ["Do I have to pay?"],
              why: "En español preguntamos subiendo la voz y ya está: «¿tengo que pagar?». En inglés hace falta el auxiliar Y va delante del sujeto. Sin do, eso es una afirmación con un signo de interrogación pegado detrás.",
              translation: "¿Hay que pagar?",
              itemIds: ["ena2m7doihavetopay"],
              tip: "Es la misma trampa del A1 («Where you live?»), un tiempo más allá. Si preguntas, el auxiliar abre.",
            },
            {
              id: "ena2m7l1e7", type: "cloze", prompt: "Pregunta por otra persona",
              text: "___ she have to wait?",
              answers: ["Does"],
              translation: "¿Tiene que esperar?",
              hints: ["Es she, así que el auxiliar se lleva la -s", "D…s"],
              itemIds: ["ena2m7shedoesnthavetowait"],
              tip: "Y fíjate: la -s se la ha llevado does, así que detrás vuelve have. Nunca «Does she has to…?».",
            },
            {
              id: "ena2m7l1e8", type: "build", prompt: "Construye la pregunta de ventanilla",
              target: "Do I have to fill in this form",
              translation: "¿Tengo que rellenar este impreso?",
              distractors: ["must", "am"],
              itemIds: ["ena2m7whatdoihavetodo", "enform", "enfillintheform"],
              tip: "Sobran dos fichas y no es casualidad: con have to, la pregunta la abre do y nada más.",
            },
            {
              id: "ena2m7l1e9", type: "translate", prompt: "Traduce el «hay que» impersonal",
              direction: "toTarget",
              source: "¿Hay que hacer cola?",
              answers: ["Do I have to queue?", "Do you have to queue?", "Do we have to queue?", "Do I have to wait in the queue?"],
              hint: "el inglés no tiene «hay que»: pone un tú que no señala a nadie",
              itemIds: ["ena2m7thequeue", "ena2m7doihavetopay"],
              tip: "En inglés, para hablar de una norma general, se usa you. No te está tuteando: es como el «si tú vas un lunes, te comes la cola».",
            },
            {
              id: "ena2m7l1e10", type: "audiomc", prompt: "En la oficina de correos — 2 escuchas",
              audio: "Excuse me, do I have to fill in this form? | Yes, and you have to sign it at the bottom.",
              question: "¿Qué le dicen que haga?",
              options: ["Rellenar el impreso y firmarlo", "Solo firmarlo", "Volver mañana"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dice «yes» a lo del impreso y añade la firma: son las dos cosas", "De volver no dice nada"],
              itemIds: ["ena2m7whatdoihavetodo", "enform", "ena2m7youmustsignhere"],
            },
            {
              id: "ena2m7l1e11", type: "listen", prompt: "Escucha y escribe lo que oigas",
              text: "You have to check in first.",
              translation: "Primero hay que facturar.",
              itemIds: ["ena2m7youhavetocheckin"],
              tip: "Al hablar rápido, have to suena «hafta». Eso lo trabajamos entero en la lección 5.",
            },
            {
              id: "ena2m7l1e12", type: "type", prompt: "Cierre de producción",
              question: "Tengo que ir al banco. ¿Tú también tienes que ir?",
              answers: [
                "I have to go to the bank. Do you have to go too?",
                "I have to go to the bank. Do you have to go, too?",
                "I have to go to the bank. Do you have to go as well?",
              ],
              hints: ["Afirmativa con have to + pregunta con do", "I have to go to the bank. D… you have to go too?"],
              itemIds: ["ena2m7ihavetogotothebank", "ena2m7doihavetopay", "enbank"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-1",
            book: "You have to check in first.",
            real: "You've got to check in first.",
            meaning: "Primero hay que facturar",
            when: "Entre amigos y en cualquier conversación de calle en Reino Unido: have got to es tan corriente como have to, quizá más. En el Writing del examen, mejor have to: es la forma neutra y no falla nunca.",
            register: "neutral",
            note: "Y al hablar deprisa, «got to» se funde en gotta: I gotta go. Eso ya es informal del todo — se reconoce, no se escribe.",
            sound: "yuv got tu CHEK in féest",
            level: "a2",
            itemId: "ena2m7youhavetocheckin",
          },
        },
      ],
      resources: [
        { label: "British Council — 'have to' and 'must'", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-obligation-prohibition", note: "Lee solo la primera mitad, la de have to. El must es la lección de mañana y la página lo mezcla todo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — must: la voz de la norma, y el verbo desnudo detrás
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l2",
      phaseId: "ena2m7",
      title: "Passengers must show their tickets",
      subtitle: "El verbo de los avisos — y la preposición que el español mete y aquí sobra",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Así habla una norma",
          itemIds: ["ena2m7passengersmustshow", "ena2m7imustgo", "ena2m7youmustkeepyourreceipt", "ena2m7thereceipt", "ena2m7youmustsignhere", "ena2m7itsthelaw", "enticket"],
        },
        {
          kind: "note",
          note: {
            title: "must: el verbo que no se dobla ante nadie",
            body: "<b>must</b> es «deber», y es el verbo más cómodo del inglés porque no cambia NUNCA:<br/><br/>I must · you must · <u>she must</u> · we must · they must. Ni una -s. Y la negativa es <b>mustn't</b>, sin do; y la pregunta es <i>Must I…?</i>, sin do tampoco. Es un modal, y los modales van por libre: se bastan solos.<br/><br/><b>Y aquí viene la trampa nº 8 del hispanohablante, la que más barata sale de arreglar.</b> En español, detrás de la perífrasis va un infinitivo con su <i>a</i>, su <i>de</i> o su <i>que</i>: «tengo QUE ir», «voy A salir», «debo descansar». Al traducir, esa preposición se cuela sola:<br/><br/>❌ <i>I must to go.</i> · ❌ <i>Passengers must to show their tickets.</i><br/>✅ <b>I must go.</b> · ✅ <b>Passengers must show their tickets.</b><br/><br/>Detrás de un modal el verbo va <b>desnudo</b>: sin <i>to</i>, sin <i>-s</i> y sin <i>-ing</i>. Y lo mismo valdrá mañana para <i>can</i>, <i>could</i> y <i>may</i>: es una sola regla para los cuatro.<br/><br/>Un apunte de colocación: en <b>You must always keep your receipt</b> el <i>always</i> va entre <b>must</b> y el verbo. Es lo mismo que viste en el módulo 3 con los adverbios de frecuencia; aquí no hay nada nuevo, solo el sitio de siempre.",
            table: [
              ["español", "❌ calco", "✅ inglés"],
              ["Tengo que irme.", "I must to go.", "I must go."],
              ["Debe firmar aquí.", "She must to sign here.", "She must sign here."],
              ["Hay que enseñar el billete.", "You must to show your ticket.", "You must show your ticket."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "must o have to: quién manda",
            body: "Las dos significan obligación, y en el 90 % de los casos el examinador acepta las dos. Pero no suenan igual, y esta es la diferencia que sí te van a agradecer:<br/><br/><b>must</b> es la voz de la NORMA y la de UNO MISMO. Es el verbo de los avisos, los reglamentos, los carteles del ayuntamiento — [[Passengers must show their tickets.|Los viajeros deben mostrar el billete.]] — y también el de la obligación que me pongo yo: [[I must go.|Me tengo que ir.]] («ya va siendo hora, me lo digo yo»).<br/><br/><b>have to</b> es la voz de la VIDA: la circunstancia, el horario, el jefe, la cola. [[She has to work on Saturday.|Tiene que trabajar el sábado.]] — no es que ella quiera, es que le toca.<br/><br/>Regla práctica para el examen: si lo has leído en un cartel, <b>must</b>. Si se lo cuentas a un amigo, <b>have to</b>. Y si dudas, <b>have to</b>: en inglés hablado de hoy es mucho más frecuente, y no queda raro en ningún sitio.",
            table: [
              ["", "must", "have to"],
              ["quién obliga", "la norma escrita, o yo mismo", "la circunstancia, la vida"],
              ["dónde se lee", "carteles, avisos, contratos", "conversación normal"],
              ["forma", "invariable, sin to detrás", "have / has, con do en la pregunta"],
              ["ejemplo", "Passengers must show their tickets.", "I have to work on Saturday."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l2e1", type: "build", prompt: "Construye el aviso — y fíjate en qué fichas te sobran",
              target: "Passengers must show their tickets",
              translation: "Los viajeros deben mostrar el billete.",
              distractors: ["to", "shows"],
              itemIds: ["ena2m7passengersmustshow", "enticket"],
              tip: "Las dos fichas que sobran son las dos trampas del español de golpe: el «to» de «tener que» y la -s que aquí no existe. Detrás de must, el verbo va desnudo.",
            },
            {
              id: "ena2m7l2e2", type: "errorfix", prompt: "Corrige el «to» que se coló",
              wrong: "I must to go.",
              answers: ["I must go."],
              why: "En español la perífrasis lleva preposición o «que» («tengo que ir»), y al traducir se traslada sola. Detrás de un modal —must, can, could, may— el verbo va en su forma de diccionario y nada más. Es uno de los errores más fáciles de quitar del A2: apunta la regla una vez y no vuelvas.",
              translation: "Me tengo que ir.",
              itemIds: ["ena2m7imustgo"],
            },
            {
              id: "ena2m7l2e3", type: "mc", prompt: "El cartel de la estación",
              question: "¿Cómo lo escribe la compañía?",
              options: ["Passengers must show their tickets.", "Passengers must to show their tickets.", "Passengers musts show their tickets."],
              answer: 0,
              whyWrong: [null, "Detrás de must, el verbo va desnudo: sin to", "must no lleva -s nunca, con ninguna persona"],
              itemIds: ["ena2m7passengersmustshow"],
            },
            {
              id: "ena2m7l2e4", type: "bucket", prompt: "¿Lo diría un aviso o lo diría una persona?",
              categories: ["así habla un aviso (must)", "así habla la gente (have to)"],
              items: [
                { text: "Passengers must show their tickets.", bucket: 0 },
                { text: "I have to work late today.", bucket: 1 },
                { text: "Visitors must sign in at reception.", bucket: 0 },
                { text: "She has to go to the bank.", bucket: 1 },
                { text: "All bags must be closed.", bucket: 0 },
                { text: "We have to queue for an hour.", bucket: 1 },
              ],
              itemIds: ["ena2m7passengersmustshow", "ena2m7ihavetogotothebank", "ena2m7thequeue"],
              tip: "No es que una sea correcta y la otra no: es un asunto de voz. must viene de arriba y por escrito; have to viene de la vida y se dice hablando.",
            },
            {
              id: "ena2m7l2e5", type: "cloze", prompt: "Completa el aviso del banco",
              text: "You ___ sign here, please.",
              answers: ["must"],
              translation: "Tiene que firmar aquí, por favor.",
              hints: ["Es una norma del sitio, escrita", "m…t"],
              itemIds: ["ena2m7youmustsignhere", "enbank"],
            },
            {
              id: "ena2m7l2e6", type: "transform", prompt: "Ponlo como lo escribiría un cartel",
              source: "You have to keep your receipt.",
              instruction: "Dilo con must",
              answers: ["You must keep your receipt.", "You must always keep your receipt."],
              translation: "Hay que guardar el recibo.",
              hints: ["Cambia have to por el modal, y el verbo se queda igual", "You m… keep your receipt."],
              itemIds: ["ena2m7youmustkeepyourreceipt", "ena2m7thereceipt"],
            },
            {
              id: "ena2m7l2e7", type: "mc", prompt: "Dónde se pone el «siempre»",
              question: "«Hay que guardar SIEMPRE el recibo»",
              options: ["You must always keep your receipt.", "You must keep always your receipt.", "Always you must keep your receipt."],
              answer: 0,
              whyWrong: [null, "Entre el verbo y su objeto no se mete nada — es la regla del módulo 3, tal cual", "Suena a traducción literal; el sitio natural es detrás del modal"],
              itemIds: ["ena2m7youmustkeepyourreceipt", "enalways"],
              tip: "El sitio del adverbio ya lo tienes del módulo 3: detrás del auxiliar o del modal, delante del verbo de verdad. Aquí no hay nada nuevo que aprender.",
            },
            {
              id: "ena2m7l2e8", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Es la ley.",
              answers: ["It's the law.", "It is the law."],
              hint: "no te olvides del sujeto: el inglés nunca lo deja caer",
              itemIds: ["ena2m7itsthelaw"],
              tip: "«Es la ley» en español no lleva sujeto. En inglés hay que ponerlo: It's. Sin ese it, la frase no existe.",
            },
            {
              id: "ena2m7l2e9", type: "speak", prompt: "Léelo como si lo estuvieras leyendo en la pared",
              text: "Passengers must show their tickets.",
              phonetic: "PA-sin-dchas̬ mast SHÓU dea TÍ-kits",
              translation: "Los viajeros deben mostrar el billete.",
              itemIds: ["ena2m7passengersmustshow"],
              tip: "must aquí va átono y cortito: «mast», casi pegado a lo siguiente. El golpe de voz cae en SHOW.",
            },
            {
              id: "ena2m7l2e10", type: "match", prompt: "Empareja",
              pairs: [
                { target: "the receipt", source: "el recibo" },
                { target: "It's the law.", source: "Es la ley." },
                { target: "You must sign here.", source: "Tiene que firmar aquí." },
                { target: "I must go.", source: "Me tengo que ir." },
              ],
              itemIds: ["ena2m7thereceipt", "ena2m7itsthelaw", "ena2m7youmustsignhere", "ena2m7imustgo"],
            },
            {
              id: "ena2m7l2e11", type: "type", prompt: "Cierre de producción",
              question: "Me tengo que ir. Tiene que firmar aquí.",
              answers: [
                "I must go. You must sign here.",
                "I have to go. You must sign here.",
                "I must go. You have to sign here.",
              ],
              hints: ["Dos modales seguidos y ni un to detrás", "I m… go. You m… sign here."],
              itemIds: ["ena2m7imustgo", "ena2m7youmustsignhere"],
              tip: "Si te has salido con have to en alguna de las dos, también vale: aquí las dos son buenas. Lo que no vale es el «to» detrás del modal.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-2",
            book: "I must go.",
            real: "I'd better be off.",
            meaning: "Me tengo que ir yendo",
            when: "Entre amigos y en visitas, para levantarse sin dar un portazo: es la forma educada de anunciar que te marchas. En una carta o en el examen escrito, I must go o I have to go.",
            register: "amigos",
            note: "Literalmente «más me vale estar fuera». En Reino Unido se dice muchísimo, y casi siempre acompañada de un movimiento de levantarse de la silla.",
            sound: "áid BE-ta bi OF",
            level: "a2",
            itemId: "ena2m7imustgo",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — Modal verbs", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", note: "Busca cualquier episodio con «modal verbs» en el título y escúchalo sin leer la transcripción. Fíjate solo en una cosa: nunca oirás un «to» detrás de must." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — mustn't y el idioma de los carteles
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l3",
      phaseId: "ena2m7",
      title: "You mustn't smoke in here",
      subtitle: "Lo que está prohibido — y cómo lo escriben los carteles ingleses",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Prohibido",
          itemIds: ["ena2m7youmustntsmoke", "ena2m7smokingisntallowed", "ena2m7nosmoking", "ena2m7donotenter", "ena2m7outoforder", "ena2m7staffonly", "ena2m7pushpull", "ensign"],
        },
        {
          kind: "note",
          note: {
            title: "mustn't: la puerta cerrada",
            body: "<b>mustn't</b> es must + not, y significa una cosa muy concreta: <b>está prohibido</b>. No es un consejo ni una recomendación: es una puerta cerrada.<br/><br/>[[You mustn't smoke in here.|Aquí no se puede fumar.]] · <i>You mustn't park here.</i> · <i>Children mustn't play near the road.</i><br/><br/>Como todos los modales, no lleva do delante ni -s detrás, y el verbo que viene después va desnudo: <i>You mustn't <b>smoke</b></i>, nunca <i>mustn't to smoke</i>.<br/><br/><b>Cómo suena, que esto importa</b>: la primera <b>t</b> desaparece. Nadie dice «mast-nt»: se dice <b>MA-sent</b>, en dos golpes. Si esperas oír la t de <i>must</i>, no vas a reconocer la palabra cuando te la digan. Lo trabajamos entero en la lección 5.<br/><br/>Y una vecina que dice lo mismo con otra cara: <b>isn't allowed</b>. [[Smoking isn't allowed.|No está permitido fumar.]] Ojo aquí al sujeto: en español decimos «está prohibido fumar» sin sujeto, y de ahí sale el ❌ <i>Is not allowed to smoke</i>. En inglés alguien tiene que ocupar el hueco: o <b>Smoking</b>, o <b>It</b>, o <b>You</b>.",
            table: [
              ["lo que quieres decir", "cómo se dice", "cuándo"],
              ["Está prohibido fumar.", "You mustn't smoke.", "hablando con alguien"],
              ["No está permitido fumar.", "Smoking isn't allowed.", "neutro, en un aviso o hablando"],
              ["PROHIBIDO FUMAR", "No smoking", "en un cartel, sin verbo"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El inglés de los carteles: tres moldes y ya está",
            body: "Los carteles no hablan como la gente: recortan. Y como recortan siempre igual, con tres moldes los entiendes todos.<br/><br/><b>1. No + verbo en -ing</b> → prohibición. [[No smoking|Prohibido fumar]] · <i>No parking</i> · <i>No entry</i> · <i>No photographs</i>.<br/><b>2. Do not + verbo</b> → prohibición, más seca todavía. [[Do not enter|No pasar]] · <i>Do not touch</i> · <i>Do not lean on the door</i>. Nunca <i>don't</i>: los carteles no se contraen.<br/><b>3. Un sustantivo a secas</b> → información o restricción. [[Staff only|Solo personal]] · [[Out of order|Averiado]] · <i>Exit</i> · <i>Way out</i>.<br/><br/><b>Y el aviso que más disgustos da a un hispanohablante</b>: [[Push / Pull|Empujar / Tirar]] en las puertas. <b>Pull</b> es «tirar DE», no «pulsar». Y <b>Push</b>, que se parece tanto a «pulsar», es «empujar». Las dos van justo al revés de lo que te dice el oído. Míralas dos segundos ahora y te ahorras el empujón contra la puerta del banco.<br/><br/>Un par más que verás en Londres cada día: <b>Mind the gap</b> (cuidado con el hueco, en el metro), <b>Keep left</b>, <b>Please queue here</b>.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l3e1", type: "match", prompt: "Empareja el cartel con lo que quiere decir",
              pairs: [
                { target: "No smoking", source: "Prohibido fumar" },
                { target: "Do not enter", source: "No pasar" },
                { target: "Out of order", source: "Averiado" },
                { target: "Staff only", source: "Solo personal" },
                { target: "Push", source: "Empujar" },
              ],
              itemIds: ["ena2m7nosmoking", "ena2m7donotenter", "ena2m7outoforder", "ena2m7staffonly", "ena2m7pushpull"],
            },
            {
              id: "ena2m7l3e2", type: "mc", prompt: "Estás delante de la puerta del banco y pone PULL",
              question: "¿Qué haces?",
              options: ["Tiras de la puerta", "Empujas la puerta", "Pulsas un botón"],
              answer: 0,
              whyWrong: [null, "Empujar es push, que es justo la que suena a «pulsar»", "Pull no tiene nada que ver con «pulsar», por mucho que lo parezca"],
              itemIds: ["ena2m7pushpull", "enbank"],
              tip: "Pull = tirar. Push = empujar. Las dos van al revés de lo que te sugiere el español, y por eso vale la pena mirarlas una vez a conciencia.",
            },
            {
              id: "ena2m7l3e3", type: "bucket", prompt: "¿Te prohíbe algo o solo te informa?",
              categories: ["te prohíbe", "solo te informa"],
              items: [
                { text: "No smoking", bucket: 0 },
                { text: "Out of order", bucket: 1 },
                { text: "Do not enter", bucket: 0 },
                { text: "Push", bucket: 1 },
                { text: "Staff only", bucket: 0 },
                { text: "Way out", bucket: 1 },
              ],
              itemIds: ["ena2m7nosmoking", "ena2m7outoforder", "ena2m7donotenter", "ena2m7pushpull", "ena2m7staffonly"],
              tip: "«Staff only» no dice «prohibido», pero te está cerrando la puerta igual: si no trabajas ahí, no pasas.",
            },
            {
              id: "ena2m7l3e4", type: "errorfix", prompt: "Corrige el «to» de siempre",
              wrong: "You mustn't to park here.",
              answers: ["You mustn't park here."],
              why: "mustn't sigue siendo un modal: detrás va el verbo desnudo. La preposición viene del español («no debes DE aparcar», «tienes QUE aparcar») y aquí sobra siempre.",
              translation: "Aquí no se puede aparcar.",
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youcantparkhere"],
            },
            {
              id: "ena2m7l3e5", type: "errorfix", prompt: "Corrige la frase sin sujeto",
              wrong: "Is not allowed to smoke here.",
              answers: ["You are not allowed to smoke here.", "You aren't allowed to smoke here.", "Smoking isn't allowed here.", "Smoking is not allowed here."],
              why: "«Está prohibido fumar» no lleva sujeto en español, porque el verbo ya lo dice todo. En inglés el hueco del sujeto no se puede dejar vacío nunca: o lo llena Smoking, o lo llena It.",
              translation: "Aquí está prohibido fumar.",
              itemIds: ["ena2m7smokingisntallowed"],
              tip: "Es la trampa nº 2 del hispanohablante, la del sujeto que se cae. Te va a perseguir hasta el B2, así que cázala ahora.",
            },
            {
              id: "ena2m7l3e6", type: "cloze", prompt: "Completa la prohibición",
              text: "You ___ smoke in here.",
              answers: ["mustn't", "must not"],
              translation: "Aquí no se puede fumar.",
              hints: ["must + not, contraído", "m…'t"],
              itemIds: ["ena2m7youmustntsmoke"],
            },
            {
              id: "ena2m7l3e7", type: "transform", prompt: "Pásalo del cartel a la frase hablada",
              source: "No smoking",
              instruction: "Dilo hablando, con mustn't",
              answers: ["You mustn't smoke.", "You mustn't smoke here.", "You mustn't smoke in here."],
              translation: "Aquí no se puede fumar.",
              hints: ["El cartel recorta; tú tienes que poner sujeto y verbo", "You m…'t smoke."],
              itemIds: ["ena2m7nosmoking", "ena2m7youmustntsmoke"],
            },
            {
              id: "ena2m7l3e8", type: "translate", prompt: "Traduce el cartel al español",
              direction: "toEs",
              source: "Staff only",
              answers: ["Solo personal", "Solo para el personal", "Solo personal autorizado"],
              itemIds: ["ena2m7staffonly"],
            },
            {
              id: "ena2m7l3e9", type: "audiomc", prompt: "En la puerta del museo — 2 escuchas",
              audio: "I'm sorry, you mustn't take photographs in here. And the lift is out of order, so you have to use the stairs.",
              question: "¿Qué dos cosas le dice?",
              options: ["Que no puede hacer fotos y que el ascensor no funciona", "Que no puede entrar y que el museo cierra", "Que puede hacer fotos pero sin flash"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "De cerrar no dice nada; lo que no funciona es el ascensor", "No hay ningún «pero»: las fotos están prohibidas y punto"],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7outoforder"],
              tip: "Fíjate en el «MA-sent» del principio: no vas a oír la t de must. Si esperas oírla, se te escapa la palabra entera.",
            },
            {
              id: "ena2m7l3e10", type: "speak", prompt: "Dilo en voz alta, sin la primera t",
              text: "You mustn't smoke in here.",
              phonetic: "yu MA-sent smóuk in JÍA",
              translation: "Aquí no se puede fumar.",
              itemIds: ["ena2m7youmustntsmoke", "ena2m7mustntsound"],
            },
            {
              id: "ena2m7l3e11", type: "type", prompt: "Cierre de producción",
              question: "Aquí no se puede fumar. No está permitido.",
              answers: [
                "You mustn't smoke in here. It isn't allowed.",
                "You mustn't smoke here. It isn't allowed.",
                "You must not smoke in here. It is not allowed.",
              ],
              hints: ["mustn't + verbo desnudo, y luego una frase CON sujeto", "You m…'t smoke in here. It i…'t allowed."],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7smokingisntallowed"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-3",
            book: "You mustn't do that.",
            real: "You're not supposed to do that.",
            meaning: "Eso no se puede hacer / no deberías estar haciendo eso",
            when: "En la calle, en el trabajo y entre vecinos, para recordarle a alguien una norma sin sonar a policía. Es la forma que oirás de verdad; mustn't, dicho a la cara, suena bastante duro. En el examen escrito, mustn't o isn't allowed.",
            register: "neutral",
            note: "be supposed to = «se supone que tienes que». Sirve para las dos direcciones: You're supposed to sign it (hay que firmarlo) y You're not supposed to park here (no se puede aparcar).",
            sound: "yoo not sa-PÓUS̬T tu du DAT",
            level: "a2",
            itemId: "ena2m7youmustntsmoke",
          },
        },
      ],
      resources: [
        { label: "Transport for London — Signs and notices", url: "https://tfl.gov.uk/", note: "Entra y busca cualquier página de estación: verás los avisos reales que hay pegados en el metro de Londres. Lee tres y busca en cada uno cuál de los tres moldes usa." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — LA LECCIÓN DEL MÓDULO: prohibir no es eximir
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l4",
      phaseId: "ena2m7",
      title: "You don't have to pay",
      subtitle: "Los dos «no tienes que» del español, y por qué en inglés son contrarios",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que no hace falta",
          itemIds: ["ena2m7youdonthavetopay", "ena2m7shedoesnthavetowait", "ena2m7ididnthavetopay", "ena2m7itsuptoyou", "ena2m7isitcompulsory"],
        },
        {
          kind: "note",
          note: {
            title: "El error más caro de todo el módulo",
            body: "Lee estas dos frases españolas en voz alta:<br/><br/>«Aquí <b>no tienes que</b> fumar.» · «<b>No tienes que</b> pagar, invita la casa.»<br/><br/>Suenan igual, ¿verdad? Pues dicen cosas opuestas. La primera te está <b>prohibiendo</b> algo; la segunda te está <b>librando</b> de una obligación. El español las escribe idénticas y deja que lo desenrede el contexto. <b>El inglés no</b>: tiene una palabra para cada una, y elegir mal cambia el sentido de la frase por completo.<br/><br/>❌ <i>You don't have to smoke here.</i> no prohíbe nada. Lo que le estás diciendo a esa persona es «no estás obligada a fumar, pero si te apetece, adelante». En un aviso de un hospital, eso es un problema serio.<br/>✅ <b>You mustn't smoke here.</b> es lo que querías decir.<br/><br/><b>La forma de acordarse</b>: mira el <b>not</b>, y pregúntate a qué palabra está negando.<br/>· En <b>mustn't</b>, el <i>not</i> niega <b>la acción</b>: «es obligatorio NO hacerlo». Puerta cerrada.<br/>· En <b>don't have to</b>, el <i>not</i> niega <b>la obligación</b>: «no es obligatorio hacerlo». Puerta abierta, tú eliges.<br/><br/>Y por eso [[It's up to you.|Tú decides.]] es la respuesta natural a <i>don't have to</i>, y jamás a <i>mustn't</i>.",
            table: [
              ["", "mustn't", "don't have to"],
              ["qué hace", "PROHÍBE", "EXIME"],
              ["quién decide", "la norma, no tú", "tú"],
              ["en español", "no se puede / está prohibido", "no hace falta / no es obligatorio"],
              ["ejemplo", "You mustn't smoke here.", "You don't have to pay."],
              ["respuesta natural", "OK, sorry.", "Great, thanks!"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "don't have to: por dentro es un verbo normal",
            body: "Y ahora la parte fácil. Como <b>have to</b> es un verbo corriente (lección 1), su negativa se hace con el <b>don't / doesn't</b> de siempre — y en pasado, con el <b>didn't</b> del módulo 2. Nada nuevo:<br/><br/>[[You don't have to pay.|No hace falta pagar.]] · [[She doesn't have to wait.|No tiene por qué esperar.]] · [[I didn't have to pay.|No tuve que pagar.]]<br/><br/>Ojo a las dos trampas de forma, que son las de siempre:<br/>· ❌ <i>She doesn't has to wait</i> → la -s ya se la llevó <b>doesn't</b>.<br/>· ❌ <i>I didn't had to pay</i> → el pasado ya se lo llevó <b>didn't</b>. Es exactamente la regla del módulo 1: una marca por frase, y la lleva el auxiliar.<br/><br/>Y para preguntar si algo es obligatorio tienes dos formas, las dos buenísimas para una ventanilla: <b>Do I have to…?</b> y [[Is it compulsory?|¿Es obligatorio?]]",
            table: [
              ["tiempo", "forma", "ejemplo"],
              ["presente, yo/tú/nosotros", "don't have to", "You don't have to pay."],
              ["presente, él/ella", "doesn't have to", "She doesn't have to wait."],
              ["pasado, todos", "didn't have to", "I didn't have to pay."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l4e1", type: "bucket", prompt: "¿Esa frase española prohíbe o exime?",
              categories: ["PROHÍBE → mustn't", "EXIME → don't have to"],
              items: [
                { text: "Aquí no se puede fumar.", bucket: 0 },
                { text: "No hace falta que pagues, invita la casa.", bucket: 1 },
                { text: "No se puede aparcar delante de la puerta.", bucket: 0 },
                { text: "No tienes por qué esperar: puedes pedir cita.", bucket: 1 },
                { text: "No se puede entrar con comida.", bucket: 0 },
                { text: "No es obligatorio rellenar la última parte.", bucket: 1 },
              ],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youdonthavetopay"],
              tip: "Truco: si puedes cambiar el español por «no es obligatorio», es don't have to. Si solo cabe «está prohibido», es mustn't.",
            },
            {
              id: "ena2m7l4e2", type: "mc", prompt: "Le has dicho esto a alguien en un hospital: «You don't have to smoke here»",
              question: "¿Qué acabas de decirle exactamente?",
              options: [
                "Que no está obligado a fumar, pero que puede si quiere",
                "Que está prohibido fumar ahí",
                "Que solo se puede fumar en esa zona",
              ],
              answer: 0,
              whyWrong: [null, "Eso sería You mustn't smoke here — el not de don't have to niega la obligación, no la acción", "Tampoco: no hay ningún «solo» en la frase"],
              itemIds: ["ena2m7youdonthavetopay", "ena2m7youmustntsmoke"],
              tip: "Este es EL error del módulo. No es un matiz: es decir lo contrario de lo que querías con toda la educación del mundo.",
            },
            {
              id: "ena2m7l4e3", type: "transform", prompt: "El aviso quería PROHIBIR y le ha salido lo contrario",
              source: "You don't have to smoke in here.",
              instruction: "Arréglalo para que prohíba de verdad",
              answers: ["You mustn't smoke in here.", "You must not smoke in here.", "You can't smoke in here."],
              translation: "Aquí no se puede fumar.",
              hints: ["No es la negación de la obligación: es la prohibición de la acción", "You m…'t smoke in here."],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youdonthavetopay"],
            },
            {
              id: "ena2m7l4e4", type: "transform", prompt: "Y ahora al revés: la casa invita",
              source: "You mustn't pay.",
              instruction: "Dile que no hace falta pagar",
              answers: ["You don't have to pay.", "You do not have to pay.", "You don't need to pay."],
              translation: "No hace falta pagar.",
              hints: ["Aquí no prohíbes nada: le quitas la obligación", "You d…'t have to pay."],
              itemIds: ["ena2m7youdonthavetopay"],
              tip: "Fíjate en lo que acabas de hacer dos veces seguidas: la misma frase española, dos ingleses opuestos. Esa es la lección entera.",
            },
            {
              id: "ena2m7l4e5", type: "gapbank", prompt: "La cola de correos — completa con la forma que toca",
              text: "At the post office you ___ take a ticket and wait for your number. You ___ push in front of other people: it's the one thing nobody here forgives. But if you only want a stamp, you ___ queue at the desk — there's a machine by the door.",
              answers: ["have to", "mustn't", "don't have to"],
              bank: ["have to", "mustn't", "don't have to", "can't", "doesn't have to", "has to"],
              translation: "En correos hay que coger número y esperar tu turno. No se puede colar: es lo único que aquí no se perdona. Pero si solo quieres un sello, no hace falta hacer cola en la ventanilla: hay una máquina junto a la puerta.",
              itemIds: ["ena2m7youhavetocheckin", "ena2m7youmustntsmoke", "ena2m7youdonthavetopay", "ena2m7thequeue", "enpostoffice"],
              tip: "El tercer hueco es el de la lección: la máquina no te prohíbe hacer cola, te libra de ella.",
            },
            {
              id: "ena2m7l4e6", type: "errorfix", prompt: "Corrige la -s de más",
              wrong: "She doesn't has to wait.",
              answers: ["She doesn't have to wait."],
              why: "doesn't ya se ha llevado la -s de tercera persona, así que detrás vuelve have. Es la misma regla del A1: «Does she work?», nunca «Does she works?».",
              translation: "No tiene por qué esperar.",
              itemIds: ["ena2m7shedoesnthavetowait"],
            },
            {
              id: "ena2m7l4e7", type: "errorfix", prompt: "Corrige el pasado marcado dos veces",
              wrong: "I didn't had to pay.",
              answers: ["I didn't have to pay."],
              why: "El pasado ya lo lleva didn't; detrás, el verbo va desnudo. Una marca de pasado por frase, que es lo que aprendiste en el módulo 1 y sigue valiendo aquí.",
              translation: "No tuve que pagar.",
              itemIds: ["ena2m7ididnthavetopay"],
            },
            {
              id: "ena2m7l4e8", type: "cloze", prompt: "En la peluquería: te dicen que la primera consulta es gratis",
              text: "You ___ have to pay for the first visit.",
              answers: ["don't", "do not"],
              translation: "No hace falta pagar la primera visita.",
              hints: ["No le prohíbes pagar: le quitas la obligación", "d…'t"],
              itemIds: ["ena2m7youdonthavetopay"],
            },
            {
              id: "ena2m7l4e9", type: "audiomc", prompt: "En el mostrador del museo — 2 escuchas",
              audio: "You don't have to pay, it's free on Sundays. But you mustn't take photographs inside.",
              question: "¿Qué pasa con las fotos?",
              options: ["Están prohibidas dentro", "Son gratis los domingos", "Solo se pueden hacer sin flash"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Lo gratis es la entrada, no las fotos", "De flash no dice nada"],
              itemIds: ["ena2m7youdonthavetopay", "ena2m7youmustntsmoke"],
              tip: "Las dos frases van seguidas a propósito: una te abre la puerta y la otra te la cierra. Si las oyes como si fueran lo mismo, te pierdes la mitad del mensaje.",
            },
            {
              id: "ena2m7l4e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "¿Es obligatorio? — No, tú decides.",
              answers: ["Is it compulsory? No, it's up to you.", "Is it compulsory? No, it is up to you.", "Do I have to? No, it's up to you."],
              hint: "la pregunta de ventanilla y la respuesta que te deja elegir",
              itemIds: ["ena2m7isitcompulsory", "ena2m7itsuptoyou"],
            },
            {
              id: "ena2m7l4e11", type: "mc", prompt: "En el aparcamiento del hospital",
              question: "«Aquí no se puede aparcar»",
              options: ["You mustn't park here.", "You don't have to park here.", "You haven't to park here."],
              answer: 0,
              whyWrong: [null, "Eso dice «no estás obligado a aparcar aquí», que no es lo mismo ni de lejos", "have to niega con don't, como cualquier verbo normal"],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youcantparkhere", "enhospital"],
            },
            {
              id: "ena2m7l4e12", type: "type", prompt: "Cierre de producción — las dos, seguidas",
              question: "No hace falta pagar. Pero no se puede fumar dentro.",
              answers: [
                "You don't have to pay. But you mustn't smoke inside.",
                "You don't have to pay, but you mustn't smoke inside.",
                "You do not have to pay. But you must not smoke inside.",
              ],
              hints: ["Primero la que exime, después la que prohíbe", "You d…'t have to pay. But you m…'t smoke inside."],
              itemIds: ["ena2m7youdonthavetopay", "ena2m7youmustntsmoke"],
              tip: "Si te salen las dos en la misma frase y con la forma correcta cada una, este módulo ya te ha dado lo que tenía que darte.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-4",
            book: "You don't have to pay.",
            real: "You don't need to pay.",
            meaning: "No hace falta pagar",
            when: "En cualquier mostrador de Reino Unido: need to es hoy tan corriente como have to y suena un poco más amable, menos a reglamento. Las dos valen en el examen, escrito y oral.",
            register: "neutral",
            note: "Y hay una tercera, más seca, que también oirás: «There's no need». Sirve ella sola de respuesta cuando alguien se ofrece a pagar.",
            sound: "yu dóunt níid tu PÉI",
            level: "a2",
            itemId: "ena2m7youdonthavetopay",
          },
        },
      ],
      resources: [
        { label: "British Council — Obligation and prohibition", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/modals-obligation-prohibition", note: "Ahora sí, léela entera. Y haz el ejercicio 2, que es exactamente el contraste de esta lección: mustn't frente a don't have to." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: /məsnt/, hafta, y el sí que suena a no
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l5",
      phaseId: "ena2m7",
      title: "Clínica de sonido: MA-sent",
      subtitle: "La t que desaparece, el «hafta» que nadie escribe, y el can que dice lo contrario",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que de verdad se oye",
          itemIds: ["ena2m7mustntsound", "ena2m7haftahasta", "ena2m7cantstrong", "ena2m7couldyousound"],
        },
        {
          kind: "note",
          note: {
            title: "Tres consonantes seguidas: alguna se cae",
            body: "En <b>mustn't</b> hay que decir /s/ + /t/ + /n/ + /t/ sin ni una vocal en medio. Ni los ingleses pueden, así que hacen lo natural: <b>se comen la primera t</b>.<br/><br/>mustn't → <b>MA-sent</b>. Dos golpes, y ni rastro de la t de <i>must</i>.<br/><br/>Esto no es dejadez ni acento raro: es la pronunciación normal, la que usa el locutor de la BBC. Y para ti tiene una consecuencia práctica muy concreta: <b>si escuchas esperando la t de must, no vas a reconocer la palabra</b>. Vas a oír algo parecido a «masent» y te vas a quedar en blanco justo en el verbo que te está prohibiendo algo.<br/><br/>La misma tijera funciona en otros sitios que ya conoces: <i>didn't</i> → «DÍ-dent», <i>wouldn't</i> → «UÚ-dent», <i>couldn't</i> → «KU-dent». En todas ellas la n se traga lo que tiene delante.",
          },
        },
        {
          kind: "note",
          note: {
            title: "hafta, hasta y cudja",
            body: "El inglés hablado pega las palabras y las desgasta. Estas tres las vas a oír todos los días, y no vienen escritas en ningún sitio:<br/><br/>· <b>have to</b> → <b>hafta</b>. La v se vuelve f porque la t que viene detrás es sorda. <i>I have to go</i> → «ái JAF-ta góu».<br/>· <b>has to</b> → <b>hasta</b>. Igual: <i>She has to work</i> → «shi JAS-ta uéek».<br/>· <b>could you</b> → <b>cudja</b>. La d y la y se funden en una sola consonante. <i>Could you help me?</i> → «KUD-cha jelp mi».<br/><br/><b>No se escriben así jamás.</b> Esto no es para producirlo: es para reconocerlo. Tú puedes seguir diciendo «hav tu» toda tu vida y te entenderán perfectamente. Lo que no puedes es no entender «hafta» cuando te lo digan en una ventanilla, porque entonces te pierdes justo la obligación.",
            table: [
              ["se escribe", "se oye", "ejemplo"],
              ["mustn't", "MA-sent", "You mustn't smoke."],
              ["have to", "hafta", "I have to go."],
              ["has to", "hasta", "She has to wait."],
              ["could you", "cudja", "Could you help me?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "can y can't: la diferencia que decide si es sí o no",
            body: "Esta es la que más cara sale, porque no es un matiz de acento: es entender lo contrario.<br/><br/>· <b>can</b> afirmativo va <b>átono</b>. Se encoge hasta casi desaparecer: «kan», o incluso «kn». <i>I can help you</i> → «ái kan JELP yu», con el golpe de voz en HELP.<br/>· <b>can't</b> va <b>tónico y largo</b>, y en británico con una vocal muy abierta, casi «aa». <i>I can't help you</i> → «ái KAANT jelp yu», con el golpe de voz en CAN'T.<br/><br/>O sea: <b>la palabra corta y débil es el sí; la larga y fuerte es el no.</b> Justo al revés de lo que espera un hispanohablante, que pronunciaría las dos igual de claras.<br/><br/>Y como la t final de <i>can't</i> también se cae a menudo delante de consonante, la única pista fiable que te queda es <b>dónde cae el acento y cuánto dura la vocal</b>. Si la vocal es larga y el golpe está ahí, te están diciendo que no.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l5e1", type: "hearreal", prompt: "¿Cuál has oído?",
              book: "I have to go now.",
              real: "I hafta go now.",
              translation: "Me tengo que ir ya.",
              itemIds: ["ena2m7haftahasta", "ena2m7imustgo"],
              tip: "Las dos son la misma frase. La de abajo es lo que sale de una boca real a velocidad normal.",
            },
            {
              id: "ena2m7l5e2", type: "hearreal", prompt: "¿Cuál has oído?",
              book: "She has to wait.",
              real: "She hasta wait.",
              translation: "Tiene que esperar.",
              itemIds: ["ena2m7haftahasta", "ena2m7shedoesnthavetowait"],
            },
            {
              id: "ena2m7l5e3", type: "hearreal", prompt: "¿Qué te está diciendo?",
              book: "Could you help me?",
              real: "Cudja help me?",
              translation: "¿Me podría ayudar?",
              ask: "meaning",
              meaningOptions: ["¿Me podría ayudar?", "¿Le ayudo?", "No puedo ayudarle."],
              itemIds: ["ena2m7couldyousound", "encanyouhelpme"],
              tip: "«cudja» de una pieza. Si buscas dos palabras separadas, no la encuentras.",
            },
            {
              id: "ena2m7l5e4", type: "audiomc", prompt: "¿Te está diciendo que sí o que no? — 2 escuchas",
              audio: "I'm sorry, I can't help you with that.",
              question: "¿Le va a ayudar?",
              options: ["No", "Sí", "Dice que lo mirará"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El can va largo y acentuado: KAANT. Eso es un no", "No dice nada de mirarlo"],
              itemIds: ["ena2m7cantstrong", "ena2m7imafraidyoucant"],
              tip: "La pista está en la duración: «KAANT», vocal larga y golpe de voz encima. El can del sí pasa de puntillas.",
            },
            {
              id: "ena2m7l5e5", type: "audiomc", prompt: "Y ahora esta — 2 escuchas",
              audio: "Yes, of course, I can do that for you today.",
              question: "¿Le va a ayudar?",
              options: ["Sí", "No", "Solo mañana"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Aquí el can es corto y átono, casi no suena: eso es el sí", "Dice today, no tomorrow"],
              itemIds: ["ena2m7cantstrong", "ena2m7ofcourseyoucan"],
            },
            {
              id: "ena2m7l5e6", type: "bucket", prompt: "¿La palabra clave va fuerte o va de puntillas?",
              categories: ["suena fuerte y larga", "suena débil y corta"],
              items: [
                { text: "I CAN'T help you.", bucket: 0 },
                { text: "I can help you.", bucket: 1 },
                { text: "She CAN'T come today.", bucket: 0 },
                { text: "She can come today.", bucket: 1 },
                { text: "We CAN'T wait.", bucket: 0 },
                { text: "We can wait.", bucket: 1 },
              ],
              itemIds: ["ena2m7cantstrong"],
              tip: "En inglés, lo importante se alarga y lo de relleno se encoge. Un «no» es importante; un «sí» ya se da por hecho.",
            },
            {
              id: "ena2m7l5e7", type: "listen", prompt: "Dictado — escribe exactamente lo que oigas",
              text: "You mustn't park here.",
              translation: "Aquí no se puede aparcar.",
              strictContractions: true,
              itemIds: ["ena2m7mustntsound", "ena2m7youcantparkhere"],
              tip: "Aunque no oigas la t de must, se escribe. La contracción cuenta: aquí «must not» no vale, porque no es lo que ha sonado.",
            },
            {
              id: "ena2m7l5e8", type: "listen", prompt: "Dictado — y ojo a la obligación",
              text: "I have to go to the bank today.",
              translation: "Hoy tengo que ir al banco.",
              itemIds: ["ena2m7ihavetogotothebank", "ena2m7haftahasta", "enbank"],
              tip: "Va a sonar «hafta», pero se escribe have to, en dos palabras.",
            },
            {
              id: "ena2m7l5e9", type: "shadow", prompt: "Repite pegado al audio, sin la primera t",
              text: "You mustn't smoke in here, I'm afraid.",
              phonetic: "yu MA-sent smóuk in jía, áim a-FRÉID",
              translation: "Aquí no se puede fumar, lo siento.",
              reps: 2,
              itemIds: ["ena2m7mustntsound", "ena2m7youmustntsmoke"],
            },
            {
              id: "ena2m7l5e10", type: "speak", prompt: "Las dos seguidas, y que se note cuál es cuál",
              text: "I can help you. I can't help you.",
              phonetic: "ái kan JELP yu / ái KAANT jelp yu",
              translation: "Puedo ayudarle. / No puedo ayudarle.",
              itemIds: ["ena2m7cantstrong"],
              tip: "Alarga el KAANT hasta que te dé un poco de vergüenza. Ahí es donde empieza a sonar británico de verdad.",
            },
            {
              id: "ena2m7l5e11", type: "fastmatch", prompt: "Contrarreloj: lo que ya sabes del módulo",
              pairs: [
                { target: "You mustn't smoke in here.", source: "Aquí no se puede fumar." },
                { target: "You don't have to pay.", source: "No hace falta pagar." },
                { target: "I have to go to the bank.", source: "Tengo que ir al banco." },
                { target: "Out of order", source: "Averiado" },
                { target: "It's up to you.", source: "Tú decides." },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youdonthavetopay", "ena2m7ihavetogotothebank", "ena2m7outoforder", "ena2m7itsuptoyou"],
              tip: "El cronómetro aquí solo suma: si tardas, no pasa nada. Lo que se entrena es la velocidad de acceso, no la puntería.",
            },
          ],
        },
      ],
      resources: [
        { label: "BBC Learning English — Pronunciation: weak forms", url: "https://www.bbc.co.uk/learningenglish/features/pronunciation", note: "Busca los vídeos de «weak forms». Diez minutos y entiendes por qué el inglés hablado te suena a una sola palabra larga: la mitad de las piezas van sin acento a propósito." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — can / can't: pedir permiso y pedir un favor
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l6",
      phaseId: "ena2m7",
      title: "Can I sit here?",
      subtitle: "El can que ya conoces, en su segundo oficio: permiso y favores",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Pedir y conceder",
          itemIds: ["ena2m7canisithere", "ena2m7youcantparkhere", "ena2m7canyoucheckit", "ena2m7ofcourseyoucan", "ena2m7imafraidyoucant", "ena2m7thecashpoint", "encanipaybycard"],
        },
        {
          kind: "note",
          note: {
            title: "can tiene dos trabajos, y ya conocías uno",
            body: "En el A1 aprendiste <b>can</b> como capacidad: [[I can swim.|Sé nadar.]], [[I can't dance.|No sé bailar.]] Ese es su primer trabajo, y no cambia.<br/><br/>El segundo es el de este módulo: <b>permiso</b>. [[Can I sit here?|¿Puedo sentarme aquí?]] no pregunta si eres físicamente capaz de sentarte: pregunta si te dejan. Y [[You can't park here.|Aquí no se puede aparcar.]] no dice que el coche no quepa: dice que no te dejan.<br/><br/>Es exactamente el mismo doble oficio que tiene «poder» en español, así que aquí no tienes que aprender nada nuevo: solo darte cuenta de que la palabra sirve para las dos cosas y de que el contexto las separa sin esfuerzo.<br/><br/><b>Y la trampa del to, otra vez.</b> can es un modal como must, así que detrás va el verbo desnudo: ❌ <i>Can I to sit here?</i> · ✅ <b>Can I sit here?</b>. La lista de modales del módulo es must, mustn't, can, can't, could y may, y los seis funcionan igual: sin do, sin -s y sin to.<br/><br/>La otra trampa es la negación. El español niega con una sola palabra delante («no puedo»), y de ahí sale ❌ <i>I don't can</i>. En inglés el modal se niega él solo, pegándose el not: <b>can't</b>.",
            table: [
              ["", "capacidad (A1)", "permiso (aquí)"],
              ["afirmativa", "I can swim.", "You can sit here."],
              ["negativa", "I can't dance.", "You can't park here."],
              ["pregunta", "Can you swim?", "Can I sit here?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Can I…? y Can you…?: dos preguntas que no se parecen en nada",
            body: "Las dos empiezan igual y hacen cosas distintas. Fíjate en quién va detrás del <i>can</i>, porque ahí está todo:<br/><br/>· <b>Can I…?</b> → pido algo <b>para mí</b>: permiso, o un objeto. [[Can I sit here?|¿Puedo sentarme aquí?]] · [[Can I pay by card?|¿Puedo pagar con tarjeta?]] · <i>Can I have a coffee, please?</i><br/>· <b>Can you…?</b> → le pido <b>a otra persona</b> que haga algo: un favor. [[Can you check it for me?|¿Me lo puedes mirar?]] · <i>Can you help me?</i> · <i>Can you repeat that, please?</i><br/><br/>Y las respuestas, que en una ventanilla las vas a oír exactamente así:<br/>· Sí → [[Of course you can.|Claro que sí.]] · <i>Yes, of course.</i> · <i>Sure.</i><br/>· No → [[I'm afraid you can't.|Lo siento, no puede ser.]] · <i>Sorry, you can't.</i><br/><br/><b>I'm afraid</b> no tiene nada que ver con el miedo: es la fórmula estándar para dar una mala noticia con educación. En inglés, un «no» pelado suena bastante más seco que en español, así que casi nunca va solo.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l6e1", type: "build", prompt: "Construye la pregunta — y mira qué fichas sobran",
              target: "Can I sit here",
              translation: "¿Puedo sentarme aquí?",
              distractors: ["to", "sitting"],
              itemIds: ["ena2m7canisithere"],
              tip: "Otra vez las dos mismas fichas de sobra. Detrás de un modal, el verbo va en su forma de diccionario y punto.",
            },
            {
              id: "ena2m7l6e2", type: "errorfix", prompt: "Corrige el «to»",
              wrong: "Can I to sit here?",
              answers: ["Can I sit here?"],
              why: "can es un modal, igual que must: detrás va el verbo desnudo. El «to» viene del español, que sí lo pide («puedo sentarme», «tengo QUE sentarme»), y aquí no pinta nada.",
              translation: "¿Puedo sentarme aquí?",
              itemIds: ["ena2m7canisithere"],
            },
            {
              id: "ena2m7l6e3", type: "errorfix", prompt: "Corrige la negación calcada",
              wrong: "You don't can park here.",
              answers: ["You can't park here."],
              why: "En español negamos poniendo un «no» delante y ya está («no puedes aparcar»). En inglés, un modal se niega él solo pegándose el not: can + not = can't. El do no entra nunca en la ecuación cuando hay un modal.",
              translation: "Aquí no se puede aparcar.",
              itemIds: ["ena2m7youcantparkhere"],
            },
            {
              id: "ena2m7l6e4", type: "bucket", prompt: "¿Pides algo para ti o le pides algo a otro?",
              categories: ["para mí (Can I…?)", "un favor a otro (Can you…?)"],
              items: [
                { text: "___ sit here?", bucket: 0 },
                { text: "___ check it for me?", bucket: 1 },
                { text: "___ pay by card?", bucket: 0 },
                { text: "___ repeat that, please?", bucket: 1 },
                { text: "___ have a stamp, please?", bucket: 0 },
                { text: "___ help me with this?", bucket: 1 },
              ],
              itemIds: ["ena2m7canisithere", "ena2m7canyoucheckit", "encanipaybycard", "encanyourepeat", "encanyouhelpme"],
              tip: "Mira quién hace la acción. Si la hago yo, Can I. Si la hace la otra persona, Can you.",
            },
            {
              id: "ena2m7l6e5", type: "cloze", prompt: "En el taller",
              text: "___ you check it for me, please?",
              answers: ["Can", "Could"],
              translation: "¿Me lo puede mirar, por favor?",
              hints: ["Le pides el favor a otra persona", "C…"],
              itemIds: ["ena2m7canyoucheckit", "ena2m7thegarage"],
            },
            {
              id: "ena2m7l6e6", type: "mc", prompt: "Le dices que no, pero sin ser brusco",
              question: "«Lo siento, no puede ser»",
              options: ["I'm afraid you can't.", "I have fear that you can't.", "No, you don't can."],
              answer: 0,
              whyWrong: [null, "I'm afraid aquí no habla de miedo: es una fórmula fija para dar una mala noticia", "El modal se niega solo: can't, sin do"],
              itemIds: ["ena2m7imafraidyoucant"],
              tip: "Guárdate esta frase entera, tal cual. La vas a usar cada vez que tengas que decir que no en inglés, que es más a menudo de lo que parece.",
            },
            {
              id: "ena2m7l6e7", type: "match", prompt: "Empareja pregunta y respuesta",
              pairs: [
                { target: "Can I sit here?", source: "— Of course you can." },
                { target: "Can I pay by card?", source: "— I'm afraid you can't, it's cash only." },
                { target: "Can you check it for me?", source: "— Sure, give me two minutes." },
                { target: "Can I park here?", source: "— No, sorry, it's for staff only." },
              ],
              itemIds: ["ena2m7canisithere", "encanipaybycard", "ena2m7canyoucheckit", "ena2m7youcantparkhere", "ena2m7staffonly"],
            },
            {
              id: "ena2m7l6e8", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "¿Puedo pagar con tarjeta? — Lo siento, no puede ser.",
              answers: [
                "Can I pay by card? I'm afraid you can't.",
                "Can I pay by card? — I'm afraid you can't.",
                "Could I pay by card? I'm afraid you can't.",
              ],
              hint: "una pregunta de permiso y una negativa con envoltorio",
              itemIds: ["encanipaybycard", "ena2m7imafraidyoucant", "encash"],
            },
            {
              id: "ena2m7l6e9", type: "audiomc", prompt: "En el cajero — 2 escuchas",
              audio: "Excuse me, can I use this cashpoint? — I'm afraid you can't, it's out of order. There's another one inside the bank.",
              question: "¿Qué pasa con el cajero?",
              options: ["Está averiado y hay otro dentro del banco", "Solo funciona con tarjeta del banco", "Está cerrado hasta mañana"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "De tarjetas no dice nada", "No dice que cierre: dice que no funciona"],
              itemIds: ["ena2m7thecashpoint", "ena2m7outoforder", "ena2m7imafraidyoucant", "enbank"],
            },
            {
              id: "ena2m7l6e10", type: "speak", prompt: "Pide permiso y agradece la respuesta",
              text: "Excuse me, can I sit here? — Of course you can. — Thank you!",
              phonetic: "eks-KIÚUS̬ mi, kan ái SIT jía? — ov KÓOS yu kan — ZANK yu",
              translation: "Perdone, ¿puedo sentarme aquí? — Claro que sí. — ¡Gracias!",
              itemIds: ["ena2m7canisithere", "ena2m7ofcourseyoucan", "enexcuseme", "enthankyou"],
              tip: "El can de la pregunta va de puntillas y el golpe cae en SIT. Si acentúas el can, suena a que dudas de que te dejen.",
            },
            {
              id: "ena2m7l6e11", type: "type", prompt: "Cierre de producción",
              question: "¿Puedo sentarme aquí? — Claro que sí.",
              answers: [
                "Can I sit here? Of course you can.",
                "Can I sit here? — Of course you can.",
                "Could I sit here? Of course you can.",
              ],
              hints: ["Modal + verbo desnudo, y la respuesta hecha", "C… I sit here? Of course you c…"],
              itemIds: ["ena2m7canisithere", "ena2m7ofcourseyoucan"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-5",
            book: "I'm afraid you can't.",
            real: "Sorry, no can do.",
            meaning: "Lo siento, imposible",
            when: "Entre compañeros y amigos, y solo para cosas sin importancia: un favor pequeño, un cambio de turno. Con un cliente o en una ventanilla, jamás — ahí suena a que te da igual. En el examen, siempre I'm afraid you can't.",
            register: "amigos",
            note: "Es una frase hecha con la gramática rota a propósito, como el «ni de broma» español. No intentes analizarla: se aprende entera o no se usa.",
            sound: "SO-ri, nóu kan DÚU",
            level: "a2",
            itemId: "ena2m7imafraidyoucant",
          },
        },
      ],
      resources: [
        { label: "British Council — Permission", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/permission", note: "Media página y dos ejercicios. Fíjate en una cosa mientras lees: cuántas veces aparece «to» detrás de can. Cero." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — LA ESCALERA DE CORTESÍA: el registro que exige el Writing 2
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l7",
      phaseId: "ena2m7",
      title: "Could I have a stamp, please?",
      subtitle: "Can → Could → May: los tres escalones, y por qué «I want» suena a orden",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Pedir como es debido",
          itemIds: ["ena2m7couldihaveastamp", "ena2m7astamp", "ena2m7mayiaskaquestion", "ena2m7idliketosendthis", "ena2m7isitpossibleto", "ena2m7thankyouforyourhelp", "enpostoffice"],
        },
        {
          kind: "note",
          note: {
            title: "Por qué «I want a coffee» suena fatal (y en español no)",
            body: "En español, «quiero un café» dicho en un bar no ofende a nadie. Con un «por favor» detrás y buen tono, es una frase perfectamente normal. <b>En inglés no lo es.</b><br/><br/>❌ <i>I want a coffee.</i> se oye como «tráeme un café», y no lo arregla ningún <i>please</i>. Suena a niño pidiendo, o a cliente maleducado.<br/><br/>El motivo es de fondo y conviene entenderlo una vez, porque explica medio idioma: <b>el español marca la cortesía con el verbo y el tono</b> («quería», «quisiera», «me pone…»), y <b>el inglés la marca con el modal</b>. Cambiar de <i>can</i> a <i>could</i> es en inglés lo que cambiar de «quiero» a «querría» en español. Si no mueves el modal, no has sido educado, digas lo que digas después.<br/><br/>Lo que sí se dice:<br/>· <b>Could I have a coffee, please?</b> — la de siempre, la que nunca falla.<br/>· <b>I'd like a coffee, please.</b> — «quisiera». <i>I'd like</i> es la versión educada de <i>I want</i>, y es literalmente <i>I would like</i>.<br/><br/>Grábate esta equivalencia: <b>I want = quiero</b> (a secas, con el dedo señalando) · <b>I'd like = quisiera</b>.",
            table: [
              ["español", "❌ lo que sale solo", "✅ lo que se dice"],
              ["Quiero un sello.", "I want a stamp.", "Could I have a stamp, please?"],
              ["Quiero mandar esto a España.", "I want to send this to Spain.", "I'd like to send this to Spain."],
              ["¿Me lo puede mirar?", "You must check it.", "Could you check it, please?"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "La escalera: can, could, may",
            body: "Los tres piden lo mismo y los tres son correctos. Lo que cambia es <b>a cuánta distancia te pones</b> de la otra persona:<br/><br/><b>1. Can I…?</b> — el escalón normal. Con amigos, en un café, en una tienda. [[Can I sit here?|¿Puedo sentarme aquí?]] No es maleducado: es directo y corriente.<br/><b>2. Could I…?</b> — <b>el escalón por defecto de este curso</b>. Sirve absolutamente en todas partes: con un desconocido, en una ventanilla, en un correo, en el examen. Si solo te vas a quedar con uno, quédate con este. [[Could I have a stamp, please?|¿Me pone un sello, por favor?]]<br/><b>3. May I…?</b> — el más formal de los tres. Una oficina, una entrevista, un trámite serio, alguien mucho mayor. [[May I ask a question?|¿Puedo hacerle una pregunta?]] Ojo: usado con un amigo suena antiguo, casi de broma.<br/><br/><b>Todos son modales</b>, así que los tres van con el verbo desnudo: ❌ <i>May I to ask…</i>. Y el <b>please</b> va al final, detrás de una coma, que es donde lo pone el inglés — no al principio como el «por favor» del español.",
            table: [
              ["escalón", "fórmula", "dónde"],
              ["directo", "Can I…?", "amigos, un café, la tienda del barrio"],
              ["neutro-formal", "Could I…? / I'd like…", "ventanilla, desconocidos, el examen"],
              ["formal", "May I…? / Is it possible to…?", "oficina, trámite, alguien mayor"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El registro que puntúa: cómo se monta una petición neutro-formal",
            body: "La segunda tarea del Writing te pide escribir a alguien que <b>no es tu amigo</b>: un casero, una oficina, un taller, una tienda. Y aquí está la clave que casi nadie te dice: <b>en inglés el registro no es un pronombre</b>. En español pasas de «tú» a «usted» y ya has cambiado de registro sin tocar nada más. El inglés dice <i>you</i> a todo el mundo, así que <b>el registro se juega entero en la forma de la petición</b>.<br/><br/>Se monta con tres piezas, siempre las mismas:<br/><br/>· <b>Abrir</b>: <i>Dear Sir or Madam,</i> · [[I'm sorry to bother you.|Perdone que le moleste.]] · <i>I'm writing about…</i><br/>· <b>Pedir</b>: <b>Could I…? / Could you…?</b> · <i>Would it be possible to…?</i> · [[Is it possible to pay by card?|¿Se puede pagar con tarjeta?]]<br/>· <b>Cerrar</b>: [[Thank you for your help.|Gracias por su ayuda.]] · <i>Thank you very much.</i> · <i>Best wishes,</i><br/><br/>Con esas tres piezas ya escribes neutro-formal, aunque el resto de la frase sea A2 puro. Y al revés: un texto lleno de <i>I want</i> y de imperativos pelados (<i>Send me the form</i>) puede no tener ni un fallo de gramática y aun así perder puntos, porque <b>el error de registro se penaliza aparte</b>.",
            table: [
              ["función", "informal (a un amigo)", "neutro-formal (lo que puntúa)"],
              ["abrir", "Hi Amy!", "Dear Sir or Madam,"],
              ["pedir", "Send me the form.", "Could you send me the form, please?"],
              ["pedir para mí", "I want an appointment.", "I'd like to make an appointment."],
              ["cerrar", "See you!", "Thank you for your help."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l7e1", type: "mc", prompt: "Estás en correos, delante de un desconocido",
              question: "«¿Me pone un sello, por favor?»",
              options: ["Could I have a stamp, please?", "I want a stamp.", "You must give me a stamp."],
              answer: 0,
              whyWrong: [null, "I want suena a orden en inglés, y el please no lo salva", "must obliga a la otra persona: en una petición es directamente grosero"],
              itemIds: ["ena2m7couldihaveastamp", "ena2m7astamp", "enpostoffice"],
              tip: "Si solo te llevas una fórmula de todo el módulo, que sea esta: Could I have…, please?",
            },
            {
              id: "ena2m7l7e2", type: "errorfix", prompt: "Corrige el «quiero» que suena a orden",
              wrong: "I want a coffee, please.",
              answers: ["I'd like a coffee, please.", "I would like a coffee, please."],
              why: "I want es «quiero», con el dedo señalando. En inglés, la cortesía se marca en el verbo: I'd like es exactamente «quisiera». Y no, el please no arregla el I want: es como decir «tráeme un café, por favor».",
              translation: "Quisiera un café, por favor.",
              itemIds: ["ena2m7idliketosendthis", "encanihaveacoffee"],
            },
            {
              id: "ena2m7l7e3", type: "errorfix", prompt: "Corrige el «to» del modal más formal",
              wrong: "May I to ask a question?",
              answers: ["May I ask a question?"],
              why: "may es un modal como can, could y must: detrás va el verbo desnudo. Ser más formal no cambia la gramática, solo el modal que eliges.",
              translation: "¿Puedo hacerle una pregunta?",
              itemIds: ["ena2m7mayiaskaquestion"],
            },
            {
              id: "ena2m7l7e4", type: "bucket", prompt: "¿Se lo dirías a un amigo o a una ventanilla?",
              categories: ["a un amigo (directo)", "a una ventanilla (neutro-formal)"],
              items: [
                { text: "Can I sit here?", bucket: 0 },
                { text: "Could I have a stamp, please?", bucket: 1 },
                { text: "Give me the form.", bucket: 0 },
                { text: "May I ask a question?", bucket: 1 },
                { text: "I want to send this.", bucket: 0 },
                { text: "I'd like to send this to Spain.", bucket: 1 },
              ],
              itemIds: ["ena2m7canisithere", "ena2m7couldihaveastamp", "ena2m7mayiaskaquestion", "ena2m7idliketosendthis"],
              tip: "Ojo: «Give me the form» y «I want to send this» no son incorrectas. Son de otro registro, y usarlas en la ventanilla es el error que el examen penaliza aparte de la gramática.",
            },
            {
              id: "ena2m7l7e5", type: "gapbank", prompt: "En la ventanilla de correos — completa el diálogo",
              text: "— Good morning. ___ I have five stamps for Spain, ___? — Of course. Anything else? — Yes. ___ I ask you one more question? Is it possible to pay by card? — Yes, of course you can.",
              answers: ["Could", "please", "May"],
              bank: ["Could", "please", "May", "want", "Give", "I'd like"],
              translation: "— Buenos días. ¿Me pone cinco sellos para España, por favor? — Claro. ¿Algo más? — Sí. ¿Puedo hacerle una pregunta más? ¿Se puede pagar con tarjeta? — Sí, claro que sí.",
              itemIds: ["ena2m7couldihaveastamp", "ena2m7mayiaskaquestion", "ena2m7isitpossibleto", "enplease"],
              tip: "Las tres fichas que sobran son las tres formas de sonar brusco. Fíjate en dónde te habrían encajado y en cómo habría cambiado el tono.",
            },
            {
              id: "ena2m7l7e6", type: "transform", prompt: "Sube un escalón de cortesía",
              source: "I want to send this to Spain.",
              instruction: "Dilo como se lo dirías a un desconocido",
              answers: ["I'd like to send this to Spain.", "I would like to send this to Spain.", "Could I send this to Spain, please?"],
              translation: "Quisiera mandar esto a España.",
              hints: ["Cambia el verbo de «quiero» a «quisiera»", "I'd l… to send this to Spain."],
              itemIds: ["ena2m7idliketosendthis"],
            },
            {
              id: "ena2m7l7e7", type: "cloze", prompt: "La fórmula más formal de las tres",
              text: "___ I ask you a question?",
              answers: ["May", "Could", "Can"],
              translation: "¿Puedo hacerle una pregunta?",
              hints: ["El escalón de arriba del todo: oficina, trámite, alguien mayor", "M…"],
              itemIds: ["ena2m7mayiaskaquestion"],
            },
            {
              id: "ena2m7l7e8", type: "order", prompt: "Ordena la conversación de la ventanilla",
              sentences: [
                "Good morning. Could I have five stamps for Spain, please?",
                "Of course. Anything else?",
                "Yes. Is it possible to pay by card?",
                "I'm afraid you can't, it's cash only.",
                "Never mind. Thank you for your help.",
              ],
              translation: "— Buenos días. ¿Me pone cinco sellos para España, por favor? — Claro. ¿Algo más? — Sí. ¿Se puede pagar con tarjeta? — Lo siento, no puede ser: solo en efectivo. — No pasa nada. Gracias por su ayuda.",
              itemIds: ["ena2m7couldihaveastamp", "ena2m7isitpossibleto", "ena2m7imafraidyoucant", "ena2m7thankyouforyourhelp", "encash"],
            },
            {
              id: "ena2m7l7e9", type: "translate", prompt: "Traduce al inglés, en registro de ventanilla",
              direction: "toTarget",
              source: "¿Se puede pagar con tarjeta? Gracias por su ayuda.",
              answers: [
                "Is it possible to pay by card? Thank you for your help.",
                "Can I pay by card? Thank you for your help.",
                "Could I pay by card? Thank you for your help.",
              ],
              hint: "una pregunta neutra y el cierre de siempre",
              itemIds: ["ena2m7isitpossibleto", "ena2m7thankyouforyourhelp", "encanipaybycard"],
            },
            {
              id: "ena2m7l7e10", type: "speak", prompt: "Léelo entero, con el please al final",
              text: "Excuse me, could I have a stamp for Spain, please?",
              phonetic: "eks-KIÚUS̬ mi, kud ái jav a STAMP fo spéin, plíis̬",
              translation: "Perdone, ¿me pone un sello para España, por favor?",
              itemIds: ["ena2m7couldihaveastamp", "ena2m7astamp", "enexcuseme"],
              tip: "El please va al final y con su coma delante. Ponerlo al principio, como el «por favor» español, delata al hispanohablante en la primera frase.",
            },
            {
              id: "ena2m7l7e11", type: "audiomc", prompt: "¿Qué registro está usando? — 2 escuchas",
              audio: "Good afternoon. I'm sorry to bother you. Could you tell me when the post office closes, please?",
              question: "¿Con quién está hablando?",
              options: ["Con un desconocido, en la calle", "Con un amigo de toda la vida", "Con un niño"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "A un amigo no le dices «I'm sorry to bother you»: eso es distancia educada", "Ni el saludo ni la fórmula encajan con un niño"],
              itemIds: ["ena2m7imsorrytobotheryou", "enpostoffice", "enclosed"],
              tip: "Tres marcas de registro en dos frases: el saludo completo, la disculpa de apertura y el Could you. Ese paquete es el neutro-formal entero.",
            },
            {
              id: "ena2m7l7e12", type: "write", prompt: "Escribe el correo — 30-50 palabras",
              scenario: "El taller te ha llamado: tu coche ya está listo, pero tú no puedes ir a recogerlo hasta el viernes por la mañana. Escríbeles un correo. No los conoces de nada, así que va en registro neutro-formal.",
              bullets: [
                "Abre como se abre una carta a alguien que no conoces",
                "Pide poder recogerlo el viernes, con una fórmula cortés (Could I…?)",
                "Da las gracias al final",
              ],
              checks: [
                { re: "\\bdear\\b|i'm sorry to bother|i am writing", label: "una apertura neutro-formal" },
                { re: "\\bcould i\\b|\\bcould you\\b|would it be possible|\\bmay i\\b", label: "la petición con could o may" },
                { re: "thank you|thanks", label: "el agradecimiento del cierre" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "polite",
              requireConnectors: { min: 2, bank: ["but", "because", "and", "so"] },
              frame: [
                "Dear Sir or Madam, / I'm sorry to bother you.",
                "Explica el problema: no puedes ir hoy y por qué",
                "Could I … on Friday morning?",
                "Thank you for your help.",
              ],
              model: "Dear Sir or Madam, I'm sorry to bother you. My car is ready, but I can't collect it today because I have to work. Could I come on Friday morning? I don't have to be at work until eleven. Thank you very much for your help.",
              itemIds: ["ena2m7imsorrytobotheryou", "ena2m7thankyouforyourhelp", "ena2m7ihavetogotothebank", "ena2m7youdonthavetopay", "ena2m7thegarage"],
              tip: "El corrector busca las tres funciones: apertura, petición cortés y cierre. Un texto con las tres y gramática de A2 puntúa más que uno impecable escrito en «I want».",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-6",
            book: "Could I have a stamp, please?",
            real: "Could I get a stamp, please?",
            meaning: "¿Me pone un sello, por favor?",
            when: "En cafés, tiendas y ventanillas, sobre todo entre gente joven: «Could I get…» se ha comido media isla en veinte años. A alguien mayor puede sonarle americano y un poco brusco, así que en el examen y por escrito, siempre have.",
            register: "neutral",
            note: "Los dos verbos piden lo mismo. La diferencia es de generación, no de educación: have es lo de siempre y get es lo de ahora.",
            sound: "kud ái guet a STAMP, plíis̬",
            level: "a2",
            itemId: "ena2m7couldihaveastamp",
          },
        },
      ],
      resources: [
        { label: "British Council — Requests", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/requests", note: "La página entera vale, y es corta. Cuenta cuántas peticiones empiezan por «I want»: ninguna, y no es casualidad." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — couldn't: lo que no hubo manera de hacer
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l8",
      phaseId: "ena2m7",
      title: "I couldn't get through",
      subtitle: "Cuando el servicio falla: el pasado de can, y el taller al teléfono",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que no salió",
          itemIds: ["ena2m7icouldntgetthrough", "ena2m7icouldntfindit", "ena2m7themachinedidntwork", "ena2m7thegarage", "ena2m7thepetrolstation", "ena2m7emergencynumber", "ena2m2ilostmyphone"],
        },
        {
          kind: "note",
          note: {
            title: "couldn't: el pasado de can, y una sola forma para todo",
            body: "<b>could</b> es el pasado de <b>can</b>, y <b>couldn't</b> el de <i>can't</i>. Como todos los modales, no cambia con la persona y va con el verbo desnudo detrás: <i>I couldn't find it</i>, <i>she couldn't find it</i>, <i>they couldn't find it</i>.<br/><br/><b>Y aquí el inglés te vuelve a regalar algo</b>, igual que en el módulo 1 con la <i>-ed</i>: el español distingue «no pude» de «no podía», y el inglés tiene <b>una sola forma para las dos</b>. [[I couldn't find it.|No lo encontré. / No lo encontraba.]] vale para los dos casos. No busques la segunda: no existe.<br/><br/><b>La trampa</b>: como el pasado en inglés se marca casi siempre con <i>did</i>, sale solo el ❌ <i>I didn't could find it</i>. No: los modales no aceptan <i>do</i> ni en presente ni en pasado. Se niegan ellos solos, pegándose el <i>not</i>. Y el pasado ya lo lleva la propia palabra: <b>could</b> ES el pasado.<br/><br/>Fíjate en la diferencia con los verbos normales, que sí lo hacen a la manera de siempre: <i>The machine <b>didn't work</b></i> — ahí el pasado se lo lleva <b>didn't</b> y <i>work</i> se queda desnudo, exactamente como aprendiste en el módulo 1.",
            table: [
              ["presente", "pasado", "en español"],
              ["I can't find it.", "I couldn't find it.", "no pude / no podía encontrarlo"],
              ["She can't come.", "She couldn't come.", "no pudo / no podía venir"],
              ["The machine doesn't work.", "The machine didn't work.", "la máquina no funciona / no funcionaba"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "El vocabulario de cuando algo se rompe",
            body: "Este es el campo léxico que el A1 no te dio, y que vas a necesitar el día que algo falle:<br/><br/>· [[the garage|el taller]] — ojo, en Reino Unido <i>garage</i> es a la vez el taller mecánico y el garaje de casa. El contexto los separa.<br/>· [[the petrol station|la gasolinera]] — <i>petrol</i>, no <i>gasoline</i>: eso es americano.<br/>· [[the cashpoint|el cajero automático]] — también <i>cash machine</i> o <i>ATM</i>.<br/>· [[Out of order|Averiado]] — el cartel que te encuentras pegado en la máquina.<br/>· [[I couldn't get through.|No conseguí que me lo cogieran.]] — <i>get through</i> es «conseguir contactar» por teléfono: la línea comunicando, la centralita que no responde.<br/><br/>Y el dato que conviene saber antes de necesitarlo: en Reino Unido el número de emergencias es el <b>999</b>. Se dice <i>nine nine nine</i>. El <b>112</b> europeo también funciona, y para cosas urgentes pero no graves está el <b>101</b> (policía) y el <b>111</b> (sanidad).",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l8e1", type: "errorfix", prompt: "Corrige el pasado hecho con did",
              wrong: "I didn't could find it.",
              answers: ["I couldn't find it.", "I could not find it."],
              why: "Los modales no aceptan do ni did, nunca. El pasado ya lo lleva la palabra: could ES el pasado de can. Y la negación se la pega él solo: couldn't.",
              translation: "No lo encontré.",
              itemIds: ["ena2m7icouldntfindit"],
            },
            {
              id: "ena2m7l8e2", type: "errorfix", prompt: "Y aquí, el verbo normal marcando dos veces",
              wrong: "The machine didn't worked.",
              answers: ["The machine didn't work."],
              why: "work sí es un verbo normal, así que su pasado lo lleva didn't y él se queda desnudo. Una marca de pasado por frase: la del módulo 1, intacta.",
              translation: "La máquina no funcionaba.",
              itemIds: ["ena2m7themachinedidntwork"],
              tip: "Los dos ejercicios seguidos enseñan el reparto: los modales van solos, los verbos normales van con did.",
            },
            {
              id: "ena2m7l8e3", type: "transform", prompt: "Pásalo a pasado",
              source: "I can't get through.",
              instruction: "Ponla en pasado",
              answers: ["I couldn't get through.", "I could not get through."],
              translation: "No conseguí que me lo cogieran.",
              hints: ["El pasado de can't es una sola palabra", "I c…'t get through."],
              itemIds: ["ena2m7icouldntgetthrough"],
            },
            {
              id: "ena2m7l8e4", type: "bucket", prompt: "¿Salió bien o no hubo manera?",
              categories: ["sí pude (could)", "no hubo manera (couldn't)"],
              items: [
                { text: "I ___ pay by card in the end.", bucket: 0 },
                { text: "I ___ find the receipt anywhere.", bucket: 1 },
                { text: "She ___ get through after ten minutes.", bucket: 0 },
                { text: "We ___ park anywhere near the bank.", bucket: 1 },
                { text: "They ___ fix the car the same day.", bucket: 0 },
                { text: "He ___ open the door.", bucket: 1 },
              ],
              itemIds: ["ena2m7icouldntfindit", "ena2m7icouldntgetthrough", "ena2m7thereceipt"],
              tip: "Fíjate en el resto de la frase: «in the end», «after ten minutes» y «the same day» son pistas de que al final sí; «anywhere» casi siempre acompaña a una negativa.",
            },
            {
              id: "ena2m7l8e5", type: "cloze", prompt: "El teléfono del taller comunicando",
              text: "I phoned three times, but I ___ get through.",
              answers: ["couldn't", "could not"],
              translation: "Llamé tres veces, pero no conseguí que me lo cogieran.",
              hints: ["Pasado de can't, en una sola palabra", "c…'t"],
              itemIds: ["ena2m7icouldntgetthrough", "ena2m7thegarage", "ena2m1phoned"],
            },
            {
              id: "ena2m7l8e6", type: "match", prompt: "Empareja el sitio con lo que se hace allí",
              pairs: [
                { target: "the garage", source: "arreglar el coche" },
                { target: "the petrol station", source: "echar gasolina" },
                { target: "the cashpoint", source: "sacar dinero" },
                { target: "the post office", source: "mandar un paquete" },
                { target: "999", source: "llamar a emergencias" },
              ],
              itemIds: ["ena2m7thegarage", "ena2m7thepetrolstation", "ena2m7thecashpoint", "ena2m7emergencynumber", "enpostoffice"],
            },
            {
              id: "ena2m7l8e7", type: "mc", prompt: "En Reino Unido se te avería el coche en la carretera y hay alguien herido",
              question: "¿A qué número llamas?",
              options: ["999", "911", "091"],
              answer: 0,
              whyWrong: [null, "El 911 es de Estados Unidos: en Reino Unido no funciona", "El 091 es español"],
              itemIds: ["ena2m7emergencynumber", "ena2m7thegarage"],
              tip: "999 y 112 valen los dos. Y si no es grave: 101 para la policía y 111 para consultas de salud.",
            },
            {
              id: "ena2m7l8e8", type: "audiomc", prompt: "Llamada al taller — 2 escuchas",
              audio: "Hello, I'm sorry to bother you. I tried to phone yesterday but I couldn't get through. My car is at your garage and I couldn't find the receipt. Could you check it for me?",
              question: "¿Cuál es el problema con el recibo?",
              options: ["No lo encuentra", "Se le ha mojado", "Nunca se lo dieron"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Del estado del papel no dice nada", "No dice que no se lo dieran: dice que no lo encuentra"],
              notepad: true,
              itemIds: ["ena2m7icouldntgetthrough", "ena2m7icouldntfindit", "ena2m7canyoucheckit", "ena2m7thereceipt", "ena2m7imsorrytobotheryou"],
              tip: "Escucha el paquete entero: apertura educada, el problema en pasado y la petición con Could you. Eso es una llamada de servicio en inglés, de principio a fin.",
            },
            {
              id: "ena2m7l8e9", type: "listen", prompt: "Dictado",
              text: "The machine didn't work, so I couldn't pay.",
              translation: "La máquina no funcionaba, así que no pude pagar.",
              itemIds: ["ena2m7themachinedidntwork", "ena2m7icouldntfindit", "ena2m2soiwalked"],
              tip: "Dos negativas de pasado en la misma frase, cada una a su manera: didn't con el verbo normal, couldn't con el modal.",
            },
            {
              id: "ena2m7l8e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Perdí el móvil y no pude llamar.",
              answers: [
                "I lost my phone and I couldn't call.",
                "I lost my phone and I couldn't phone.",
                "I lost my phone, so I couldn't call.",
              ],
              hint: "un verbo irregular del módulo 2 y un modal en pasado",
              itemIds: ["ena2m2ilostmyphone", "ena2m7icouldntgetthrough"],
            },
            {
              id: "ena2m7l8e11", type: "speak", prompt: "Cuenta el desastre en voz alta",
              text: "The cashpoint was out of order, so I couldn't pay.",
              phonetic: "de KASH-point uos̬ áut ov ÓO-da, sóu ái KU-dent PÉI",
              translation: "El cajero estaba averiado, así que no pude pagar.",
              itemIds: ["ena2m7thecashpoint", "ena2m7outoforder", "ena2m7icouldntfindit"],
              tip: "couldn't se dice «KU-dent»: la d y la n se comen lo que hay en medio, igual que en mustn't y en didn't.",
            },
            {
              id: "ena2m7l8e12", type: "type", prompt: "Cierre de producción",
              question: "Llamé al taller pero no conseguí que me lo cogieran.",
              answers: [
                "I phoned the garage but I couldn't get through.",
                "I called the garage but I couldn't get through.",
                "I phoned the garage, but I couldn't get through.",
              ],
              hints: ["Pasado normal + modal en pasado", "I phoned the garage but I c…'t get through."],
              itemIds: ["ena2m7icouldntgetthrough", "ena2m7thegarage", "ena2m1phoned"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-7",
            book: "I couldn't get through.",
            real: "I couldn't get hold of anyone.",
            meaning: "No conseguí hablar con nadie",
            when: "En cualquier queja de servicio, hablando o por escrito, y es de las pocas expresiones informales que también quedan bien en un correo de reclamación. En el examen valen las dos.",
            register: "neutral",
            note: "get hold of someone = «localizar a alguien», por el medio que sea. Si la línea comunicaba, get through; si nadie te devolvió las llamadas, get hold of.",
            sound: "ái KU-dent guet JÓULD ov E-ni-uan",
            level: "a2",
            itemId: "ena2m7icouldntgetthrough",
          },
        },
      ],
      resources: [
        { label: "GOV.UK — When to call 999", url: "https://www.gov.uk/", note: "Busca «999» en el buscador de la web del gobierno británico. Está escrito en inglés sencillo a propósito, y es de lo más útil que puedes leer si vas a pisar el país." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — todo junto: leer un cartel y explicar qué prohíbe
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m7l9",
      phaseId: "ena2m7",
      title: "What does that sign say?",
      subtitle: "Todo el módulo junto — y tres carteles explicados con tus palabras",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar por lo que pone",
          itemIds: ["ena2m7whatdoesthesignsay", "ena2m7imsorrytobotheryou", "ensign"],
        },
        {
          kind: "note",
          note: {
            title: "Los seis modales del módulo, en una tabla",
            body: "Este módulo te ha dado seis palabras. Todas funcionan igual —<b>sin do, sin -s y sin to</b>— y cada una hace una cosa distinta. Si te llevas esta tabla, te llevas el módulo:",
            table: [
              ["palabra", "qué hace", "ejemplo"],
              ["must", "obliga: la norma escrita, o yo mismo", "Passengers must show their tickets."],
              ["have to", "obliga: la vida, el horario, la cola", "I have to go to the bank."],
              ["mustn't", "PROHÍBE", "You mustn't smoke in here."],
              ["don't have to", "EXIME: no hace falta", "You don't have to pay."],
              ["can / could / may", "pide permiso o un favor, de menos a más formal", "Could I have a stamp, please?"],
              ["couldn't", "no hubo manera (pasado)", "I couldn't get through."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Tres carteles de verdad, explicados",
            body: "Estos tres están pegados en las paredes de cualquier ciudad británica. Léelos y fíjate en qué molde usa cada uno y qué te está diciendo en realidad.<br/><br/><b>1. «Please queue here. Staff will call you.»</b><br/>Traducción de la calle: [[the queue|la cola]] se hace ahí, y no te acerques al mostrador hasta que te llamen. Con tus palabras: <i>You have to wait here. You mustn't go to the desk before they call you.</i><br/><br/><b>2. «Ticket machines out of order. Please pay at the office.»</b><br/>Las máquinas no funcionan; se paga en la oficina. Con tus palabras: <i>The machines don't work, so you have to pay at the office.</i> Fíjate en que no te prohíbe nada: te redirige.<br/><br/><b>3. «This is a permit holders' car park. Others may be fined.»</b><br/>El aparcamiento es para quien tiene permiso; a los demás les pueden multar. Con tus palabras: <i>You can't park here without a permit. You mustn't leave your car here.</i><br/><br/><b>El ejercicio mental que hay que hacer siempre</b> es este: el cartel está escrito en recortado, y tú lo pasas a una frase entera con <i>have to</i>, <i>mustn't</i>, <i>can't</i> o <i>don't have to</i>. Si sabes decir cuál de los cuatro es, has entendido el cartel de verdad.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m7l9e1", type: "errorfix", prompt: "Corrige la pregunta sin auxiliar",
              wrong: "What says that sign?",
              answers: ["What does that sign say?"],
              why: "En español la pregunta se hace con la entonación y el orden se queda igual («¿qué pone ese cartel?»). En inglés hace falta el auxiliar does, y detrás el verbo va desnudo: say, no says. Es el error más viejo del curso y sigue apareciendo en cuanto la frase se complica.",
              translation: "¿Qué pone en ese cartel?",
              itemIds: ["ena2m7whatdoesthesignsay", "ensign"],
            },
            {
              id: "ena2m7l9e2", type: "mc", prompt: "El cartel del aparcamiento del hospital",
              question: "«Permit holders only» — ¿qué te está diciendo?",
              options: [
                "You mustn't park here without a permit.",
                "You don't have to park here.",
                "You must park here.",
              ],
              answer: 0,
              whyWrong: [null, "Eso dice «no hace falta aparcar aquí», que no prohíbe nada", "Al revés: no te obliga a aparcar, te lo impide"],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youdonthavetopay", "enhospital"],
            },
            {
              id: "ena2m7l9e3", type: "mc", prompt: "En la puerta de una consulta pone: «No appointment necessary»",
              question: "¿Qué significa?",
              options: [
                "You don't have to make an appointment.",
                "You mustn't make an appointment.",
                "You have to make an appointment.",
              ],
              answer: 0,
              whyWrong: [null, "No te prohíbe pedir cita: te dice que no hace falta", "Justo lo contrario de lo que pone el cartel"],
              itemIds: ["ena2m7youdonthavetopay", "ena2m7isitcompulsory", "endoctor"],
              tip: "Este par —«prohibido» frente a «no hace falta»— es lo que este módulo ha venido a enseñarte. Si lo aciertas de corrido, ya está.",
            },
            {
              id: "ena2m7l9e4", type: "bucket", prompt: "Espiral: ¿prohíbe, obliga o exime?",
              categories: ["prohíbe o impide", "obliga o exime"],
              items: [
                { text: "You mustn't smoke in here.", bucket: 0 },
                { text: "You have to check in first.", bucket: 1 },
                { text: "Staff only", bucket: 0 },
                { text: "You don't have to pay.", bucket: 1 },
                { text: "You can't park here.", bucket: 0 },
                { text: "She has to work on Saturday.", bucket: 1 },
              ],
              itemIds: ["ena2m7youmustntsmoke", "ena2m7youhavetocheckin", "ena2m7staffonly", "ena2m7youdonthavetopay", "ena2m7youcantparkhere", "ena2m7shehastoworkonsaturday"],
            },
            {
              id: "ena2m7l9e5", type: "paraphrase", prompt: "Dilo de otra manera, sin usar la palabra prohibida",
              source: "You mustn't park here.",
              forbid: ["mustn't", "must"],
              answers: ["You can't park here.", "Parking isn't allowed here.", "You aren't allowed to park here."],
              translation: "Aquí no se puede aparcar.",
              itemIds: ["ena2m7youcantparkhere", "ena2m7smokingisntallowed"],
              tip: "Tener dos formas de decir lo mismo es lo que te salva en el oral cuando se te olvida una palabra. Y es exactamente lo que puntúa la Parte 2 del examen.",
            },
            {
              id: "ena2m7l9e6", type: "cloze", prompt: "Espiral: el registro de ventanilla",
              text: "Excuse me, ___ I have a stamp for Spain, please?",
              answers: ["could", "can", "may"],
              translation: "Perdone, ¿me pone un sello para España, por favor?",
              hints: ["El escalón por defecto de todo el curso", "c…d"],
              itemIds: ["ena2m7couldihaveastamp", "ena2m7astamp"],
            },
            {
              id: "ena2m7l9e7", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "No hace falta hacer cola, pero no se puede pagar con tarjeta.",
              answers: [
                "You don't have to queue, but you can't pay by card.",
                "You don't have to queue, but you mustn't pay by card.",
                "You don't have to wait in the queue, but you can't pay by card.",
              ],
              hint: "una que exime y otra que impide, unidas por but",
              itemIds: ["ena2m7youdonthavetopay", "ena2m7thequeue", "encanipaybycard"],
            },
            {
              id: "ena2m7l9e8", type: "order", prompt: "Ordena la historia del día que nada funcionó",
              sentences: [
                "On Monday I had to go to the post office to send a parcel to my sister.",
                "There was a long queue, so I waited for twenty minutes.",
                "When it was my turn, the card machine was out of order.",
                "I couldn't pay, because I didn't have any cash on me.",
                "In the end I had to come back the next morning.",
              ],
              translation: "El lunes tuve que ir a correos a mandarle un paquete a mi hermana. Había una cola larga, así que esperé veinte minutos. Cuando me tocó, la máquina de las tarjetas estaba averiada. No pude pagar, porque no llevaba efectivo encima. Al final tuve que volver a la mañana siguiente.",
              itemIds: ["ena2m7thequeue", "ena2m7outoforder", "ena2m7icouldntfindit", "ena2m7ididnthavetopay", "encash", "enpostoffice"],
              tip: "Fíjate en «I had to», que no habíamos visto: es el pasado afirmativo de have to. Si didn't have to es «no tuve que», had to es «tuve que». Ya lo sabías sin saberlo.",
            },
            {
              id: "ena2m7l9e9", type: "fastmatch", prompt: "Contrarreloj: los seis modales del módulo",
              pairs: [
                { target: "must", source: "deber (lo dice la norma)" },
                { target: "mustn't", source: "estar prohibido" },
                { target: "don't have to", source: "no hacer falta" },
                { target: "could", source: "poder (pidiendo con educación)" },
                { target: "couldn't", source: "no haber podido" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m7imustgo", "ena2m7youmustntsmoke", "ena2m7youdonthavetopay", "ena2m7couldihaveastamp", "ena2m7icouldntfindit"],
            },
            {
              id: "ena2m7l9e10", type: "audiomc", prompt: "Los avisos del aeropuerto — 2 escuchas",
              audio: "Good afternoon. All passengers must check in at least two hours before departure. You don't have to print your boarding pass, but you mustn't leave your bags unattended at any time.",
              question: "¿Qué NO hace falta hacer?",
              options: ["Imprimir la tarjeta de embarque", "Facturar dos horas antes", "Vigilar el equipaje"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso es obligatorio: lo dice con must", "Dejar el equipaje solo está prohibido: mustn't"],
              notepad: true,
              itemIds: ["ena2m7youhavetocheckin", "ena2m7youdonthavetopay", "ena2m7youmustntsmoke", "ena2m7passengersmustshow"],
              tip: "Tres modales en una sola megafonía, y cada uno hace algo distinto. Ese es el examen: no te pide gramática, te pide entender quién te obliga a qué.",
            },
            {
              id: "ena2m7l9e11", type: "type", prompt: "Cierre del módulo",
              question: "Perdone que le moleste. ¿Qué pone en ese cartel?",
              answers: [
                "I'm sorry to bother you. What does that sign say?",
                "I'm sorry to bother you. What does this sign say?",
                "Sorry to bother you. What does that sign say?",
              ],
              hints: ["La apertura educada y la pregunta con auxiliar", "I'm sorry to bother you. What d… that sign say?"],
              itemIds: ["ena2m7imsorrytobotheryou", "ena2m7whatdoesthesignsay", "ensign"],
            },
            {
              id: "ena2m7l9e12", type: "monologue", prompt: "El minuto de verdad: tres carteles de tu barrio",
              topic: "Tres carteles o avisos que hay cerca de tu casa, explicados en inglés",
              slides: [
                { title: "1. Dónde está y qué pone", hint: "There's a sign outside the… / It says «…». Basta con leerlo tal cual, aunque esté en español: luego lo explicas." },
                { title: "2. Qué prohíbe o qué obliga", hint: "Aquí van los modales del módulo: It means you mustn't… / You have to… / You can't… No te quedes en uno solo." },
                { title: "3. Uno que EXIMA de algo", hint: "Busca uno de los que no obligan a nada: «entrada libre», «sin cita previa». It means you don't have to…" },
                { title: "4. Si te parece razonable o no", hint: "I think it's a good idea because… / I don't think it's necessary because… El descriptor de A2 pide opinión CON razón: no te dejes el because." },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He usado must o have to al menos una vez",
                "He usado mustn't o can't al menos una vez",
                "He usado don't have to al menos una vez, y para eximir de verdad",
                "He dado una opinión con su because detrás",
              ],
              itemIds: ["ena2m7whatdoesthesignsay", "ena2m7youmustntsmoke", "ena2m7youdonthavetopay", "ena2m7youhavetocheckin"],
              tip: "La tercera diapositiva es la difícil a propósito: encontrar un cartel que EXIMA obliga a mirar el mundo con la distinción que enseña este módulo. Si te cuesta encontrarlo, es que la distinción ya te importa.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m7-8",
            book: "What does that sign say?",
            real: "What's that sign on about?",
            meaning: "¿Y ese cartel qué quiere decir?",
            when: "Entre amigos, con un punto de fastidio: se usa cuando el cartel te parece absurdo o incomprensible. En una ventanilla o en el examen, la del libro.",
            register: "amigos",
            note: "be on about = «ir de qué», «querer decir», siempre con un poquito de guasa. What are you on about? es «¿pero tú de qué hablas?».",
            sound: "uóts dat SÁIN on a-báut",
            level: "a2",
            itemId: "ena2m7whatdoesthesignsay",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — Modals review", url: "https://www.bbc.co.uk/learningenglish/english/course/lower-intermediate", note: "Busca las unidades de modales del curso lower-intermediate. Ya lo sabes todo: úsalas para comprobar, no para aprender." },
      ],
    },
  ],
};
