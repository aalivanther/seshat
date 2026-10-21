import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 2 — What happened next: contar una historia. Continúa el
// mismo fin de semana de `ena2m1` y hereda entero su listón.
//
// Gramática ancla (PLAN-EN-A2 §4.1): past simple IRREGULAR (~50 verbos) ·
// did / didn't + verbo base a lo ancho de todos los verbos · la secuencia
// (first of all, then, after that, finally, in the end) · because / so.
//
// LO QUE NO SE RE-ENSEÑA — el auxiliar `did` se presentó en `ena2m1` L8, pero
// SOLO con los verbos regulares de aquel módulo (y con `go` de muestra de que
// tras `did` el verbo va desnudo). Aquí no vuelve a explicarse desde cero: se
// EXTIENDE a los irregulares, y con ellos la negación y la pregunta se vuelven
// el sitio donde el alumno gana o pierde el nivel. Quien escriba `ena2m3` y
// siguientes puede dar por instalado el paradigma entero (afirmativa con la
// forma rara · negativa y pregunta con did + base) y limitarse a reciclarlo.
//
// EL CONTRASTE QUE ORDENA EL MÓDULO: `did` es el mismo motor que el `do/does`
// que enseñó `ena1m4`. El auxiliar se lleva la marca y el verbo se queda
// DESNUDO. «Did you went?» es el error nº 1 del A2 (PLAN-EN-A2 §5.2) y aquí se
// mata por su nombre, tres veces: nota en L3, nota en L4 y `errorfix` en las
// dos, más el espiral de L9. Los otros dos calcos que van con nombre y apellido
// son «I no went» (negación española de un solo elemento, §9.1 nº 9) y «I have
// gone yesterday» (§9.1 nº 11), que ya se abrió en `ena2m1` L9 y aquí vuelve
// con verbos irregulares, que es donde de verdad recae.
//
// LOS IRREGULARES NO SON UNA LISTA ALFABÉTICA. Se enseñan en dos pasadas:
// L1 los ocho de máxima frecuencia, uno a uno y dentro de una frase usable
// (go, have, see, get, make, take, come, say); L2 el resto agrupado por PATRÓN
// de cambio vocálico, seis familias y una tarjeta por familia — que es lo que
// los hace memorizables y lo que permite meter ~50 verbos en ~29 tarjetas sin
// convertir el módulo en un vocabulario. Las familias son: la A abierta
// (sing→sang), las -ought/-aught (buy→bought), las «óu» (write→wrote,
// wake→woke), las que acortan la vocal y acaban en -t (sleep→slept), las «-úu»
// (know→knew) y las que no cambian (put→put).
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: las vocales del
// pasado irregular. Tres trampas y solo tres — la /ɔː/ larga de
// bought/thought/caught, las que se leen a la española y no suenan como se
// escriben (said «sed», read «red», heard «jéed») y los homófonos ate/eight.
// La de m1 (/t/ /d/ /ɪd/) se cobra aquí de espiral, no se repite.
//
// RECICLADO sin redefinir ids (una palabra, una tarjeta): de `ena2m1` —
// ena2m1whatdidyoudo, ena2m1didyouwatchit, ena2m1ididntwork, ena2m1yesidid,
// ena2m1whathappened, ena2m1missedthebus, ena2m1iworked, ena2m1shewatchedafilm,
// ena2m1theywalkedtothepark, ena2m1istayedathome, ena2m1itrained,
// ena2m1phoned, ena2m1arrived, ena2m1tired, ena2m1terrible,
// ena2m1iwaslucky, ena2m1therewere, ena2m1lastweek, ena2m1twodaysago,
// ena2m1lastweekend, ena2m1howaboutyou, ena2m1howwasyourweekend,
// ena2m1notmuch, ena2m1concert, ena2m1streetmarket, ena2m1stopped; y del A1 —
// enyesterday, enlastnight, enthen, enfirst, enbut, enimlate, enbus, enbusstop,
// entrain, enwork, enhome, enathome, enfriend, enmessage, enemail, enpark,
// encoffee, enjacket, enmilk, enfridge, enkitchen, enpound, enletsgotothecinema,
// enwatchafilm, enidontunderstand, ensorry, enphonenumber, enflatmate.
//
// TODOS los ids nuevos llevan el prefijo "ena2m2": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m2: Record<string, VocabItem> = {
  // ── ena2m2l1 — los ocho irregulares de máxima frecuencia ──
  ena2m2iwenttothecinema: {
    id: "ena2m2iwenttothecinema", target: "I went to the cinema.",
    source: "Fui al cine. / Iba al cine. (go → went)",
    sound: "ái UENT tu de SÍ-ne-ma",
    gram: { trap: "I goed to the cinema.", same: ["I went to see a film."] },
  },
  ena2m2wehadagoodtime: {
    id: "ena2m2wehadagoodtime", target: "We had a good time.",
    source: "Nos lo pasamos bien. (have → had)",
    sound: "ui jad a gud TÁIM",
    gram: { trap: "We passed it well.", same: ["We had a laugh."] },
  },
  ena2m2isawamyyesterday: {
    id: "ena2m2isawamyyesterday", target: "I saw Amy yesterday.",
    source: "Vi a Amy ayer. (see → saw)",
    sound: "ái SOO ÉI-mi YÉS-ta-dei",
    gram: { trap: "I have seen Amy yesterday." },
  },
  ena2m2shegotamessage: { id: "ena2m2shegotamessage", target: "She got a message.", source: "Le llegó un mensaje. (get → got)", sound: "shi GOT a MÉ-sich" },
  ena2m2imadeamistake: {
    id: "ena2m2imadeamistake", target: "I made a mistake.",
    source: "Me equivoqué. (make → made)",
    sound: "ái méid a mis-TÉIK",
    gram: { trap: "I did a mistake.", same: ["I got it wrong."] },
  },
  ena2m2hetookthetrain: {
    id: "ena2m2hetookthetrain", target: "He took the train.",
    source: "Cogió el tren. (take → took)",
    sound: "ji TUK de tréin",
    gram: { trap: "He taked the train.", same: ["He caught the train."] },
  },
  ena2m2icamehomelate: {
    id: "ena2m2icamehomelate", target: "I came home late.",
    source: "Llegué a casa tarde. (come → came)",
    sound: "ái kéim jóum léit",
    gram: { trap: "I came to home late.", same: ["I got home late."] },
  },
  ena2m2shesaidsorry: { id: "ena2m2shesaidsorry", target: "She said sorry.", source: "Pidió perdón. (say → said)", sound: "shi SED SO-ri (said suena «sed», jamás «séid»)" },

  // ── ena2m2l2 — las seis familias de irregulares ──
  ena2m2sanggroup: {
    id: "ena2m2sanggroup", target: "sing → sang · drink → drank · swim → swam · run → ran · sit → sat",
    source: "cantó · bebió · nadó · corrió · se sentó — la vocal se abre en A",
    sound: "sang · drank · suam · ran · sat",
  },
  ena2m2boughtgroup: {
    id: "ena2m2boughtgroup", target: "buy → bought · think → thought · bring → brought",
    source: "compró · pensó · trajo — las tres acaban en -ought y suenan «-oot»",
    sound: "boot · zoot · broot",
  },
  ena2m2caughtgroup: {
    id: "ena2m2caughtgroup", target: "catch → caught · teach → taught",
    source: "cogió / pilló · enseñó — se escriben -aught y suenan igual que las -ought",
    sound: "koot · toot",
  },
  ena2m2wrotegroup: {
    id: "ena2m2wrotegroup", target: "write → wrote · drive → drove · ride → rode",
    source: "escribió · condujo · montó (en bici) — la i larga se vuelve «óu»",
    sound: "róut · dróuv · róud",
  },
  ena2m2wokegroup: {
    id: "ena2m2wokegroup", target: "wake → woke · break → broke · speak → spoke",
    source: "se despertó · rompió · habló — también acaban en «óuk»",
    sound: "uóuk · bróuk · spóuk",
  },
  ena2m2sleptgroup: {
    id: "ena2m2sleptgroup", target: "sleep → slept · keep → kept · feel → felt · leave → left · meet → met",
    source: "durmió · guardó · sintió · se fue · quedó con alguien — la vocal se acorta y aparece una -t",
    sound: "slept · kept · felt · left · met",
  },
  ena2m2knewgroup: {
    id: "ena2m2knewgroup", target: "know → knew · grow → grew · throw → threw · fly → flew",
    source: "sabía · creció · tiró · voló — todas acaban en «-úu»",
    sound: "niúu · gruu · zruu · fluu",
  },
  ena2m2putgroup: {
    id: "ena2m2putgroup", target: "put → put · cut → cut · let → let · cost → cost",
    source: "puso · cortó · dejó · costó — estas no cambian nada",
    sound: "put · cat · let · kost",
  },

  // ── ena2m2l3 — didn't + verbo desnudo ──
  ena2m2ididntgoout: {
    id: "ena2m2ididntgoout", target: "I didn't go out.",
    source: "No salí.",
    sound: "ái DÍ-dent góu ÁUT",
    gram: { trap: "I didn't went out.", same: ["I stayed in."] },
  },
  ena2m2wedidnthavetime: {
    id: "ena2m2wedidnthavetime", target: "We didn't have time.",
    source: "No nos dio tiempo.",
    sound: "ui DÍ-dent jav TÁIM",
    gram: { trap: "We didn't had time." },
  },
  ena2m2ididntsleep: { id: "ena2m2ididntsleep", target: "I didn't sleep very well.", source: "No dormí muy bien.", sound: "ái DÍ-dent sliip VE-ri UEL" },
  ena2m2ilostmyphone: {
    id: "ena2m2ilostmyphone", target: "I lost my phone.",
    source: "Perdí el móvil. (lose → lost)",
    sound: "ái LOST mái fóun",
    gram: { trap: "I missed my phone." },
  },
  ena2m2ifounditinmybag: { id: "ena2m2ifounditinmybag", target: "I found it in my bag.", source: "Lo encontré en el bolso. (find → found)", sound: "ái FÁUND it in mái bag" },
  ena2m2ididntdoanything: {
    id: "ena2m2ididntdoanything", target: "I didn't do anything.",
    source: "No hice nada.",
    sound: "ái DÍ-dent du É-ni-zing",
    gram: { trap: "I didn't do nothing.", same: ["I did nothing."] },
  },

  // ── ena2m2l4 — preguntar en pasado ──
  ena2m2wheredidyougo: {
    id: "ena2m2wheredidyougo", target: "Where did you go?",
    source: "¿Adónde fuiste?",
    sound: "uéa did yu GÓU",
    gram: { trap: "Where did you went?" },
  },
  ena2m2whathappenednext: { id: "ena2m2whathappenednext", target: "What happened next?", source: "¿Y luego qué pasó?", sound: "uót JÁ-pend NEKST" },
  ena2m2didyouseeit: {
    id: "ena2m2didyouseeit", target: "Did you see it?",
    source: "¿Lo viste?",
    sound: "did yu SÍI it (rápido: «DÍ-dyu síi it»)",
    gram: { trap: "Did you saw it?" },
  },
  ena2m2howdidyougethome: { id: "ena2m2howdidyougethome", target: "How did you get home?", source: "¿Cómo volviste a casa?", sound: "jáu did yu guet JÓUM" },
  ena2m2whotoldyou: {
    id: "ena2m2whotoldyou", target: "Who told you?",
    source: "¿Quién te lo dijo? (tell → told)",
    sound: "juu TÓULD yu",
    gram: { trap: "Who did tell you?" },
  },
  ena2m2whydidyouleave: { id: "ena2m2whydidyouleave", target: "Why did you leave?", source: "¿Por qué te fuiste?", sound: "uái did yu LÍIV" },

  // ── ena2m2l5 — la clínica: las vocales del irregular ──
  ena2m2readred: { id: "ena2m2readred", target: "read → read", source: "leer → leyó / leí — se escribe igual y suena «red»", sound: "riid → RED" },
  ena2m2ateeight: { id: "ena2m2ateeight", target: "ate / eight", source: "comí / ocho — dos palabras distintas que suenan exactamente igual", sound: "éit / éit" },
  ena2m2heard: { id: "ena2m2heard", target: "heard (hear → heard)", source: "oyó / oí — nada que ver con «jíad»", sound: "jéed" },
  ena2m2paid: { id: "ena2m2paid", target: "paid (pay → paid)", source: "pagó / pagué — se escribe con -aid y suena «péid»", sound: "péid" },
  ena2m2wore: { id: "ena2m2wore", target: "wore (wear → wore)", source: "llevaba puesto / llevé puesto", sound: "uóo" },

  // ── ena2m2l6 — las señales del relato ──
  ena2m2firstofall: { id: "ena2m2firstofall", target: "First of all,", source: "Lo primero de todo,", sound: "féest ov OOL" },
  ena2m2afterthat: { id: "ena2m2afterthat", target: "after that", source: "después de eso / y luego", sound: "AAF-ta dat" },
  ena2m2finally: {
    id: "ena2m2finally", target: "finally",
    source: "al final / por fin (después de mucho esperar)",
    sound: "FÁI-na-li",
    gram: { trap: "at the final" },
  },
  ena2m2intheend: { id: "ena2m2intheend", target: "in the end", source: "al final del todo — cómo acabó la cosa", sound: "in di END" },
  ena2m2suddenly: { id: "ena2m2suddenly", target: "suddenly", source: "de repente", sound: "SA-den-li" },

  // ── ena2m2l7 — la causa y la consecuencia ──
  ena2m2becauseimissedthebus: {
    id: "ena2m2becauseimissedthebus", target: "I was late because I missed the bus.",
    source: "Llegué tarde porque perdí el autobús.",
    sound: "ái uos̬ LÉIT bi-KOS̬ ái mist de bas",
    gram: { trap: "I was late because of I missed the bus.", same: ["I missed the bus, so I was late."] },
  },
  ena2m2soiwalked: {
    id: "ena2m2soiwalked", target: "I missed the bus, so I walked.",
    source: "Perdí el autobús, así que fui andando.",
    sound: "ái mist de bas, sóu ái UÓOKT",
    gram: { trap: "So I missed the bus, I walked." },
  },
  ena2m2thatswhy: {
    id: "ena2m2thatswhy", target: "That's why I was late.",
    source: "Por eso llegué tarde.",
    sound: "dats UÁI ái uos̬ léit",
    gram: { trap: "For that I was late." },
  },
  ena2m2luckily: { id: "ena2m2luckily", target: "Luckily,", source: "Por suerte,", sound: "LA-ki-li" },
  ena2m2unfortunately: { id: "ena2m2unfortunately", target: "Unfortunately,", source: "Por desgracia,", sound: "an-FÓO-chu-net-li" },
  ena2m2whatashame: {
    id: "ena2m2whatashame", target: "What a shame!",
    source: "¡Qué pena! / ¡Qué rabia!",
    sound: "uót a SHÉIM",
    gram: { trap: "What shame!" },
  },

  // ── ena2m2l8 — el contratiempo ──
  ena2m2mywallet: { id: "ena2m2mywallet", target: "my wallet", source: "la cartera (la de los billetes)", sound: "mái UÓ-lit" },
  ena2m2mykeys: { id: "ena2m2mykeys", target: "my keys", source: "las llaves", sound: "mái KIIS̬" },
  ena2m2ifelloverinthestreet: {
    id: "ena2m2ifelloverinthestreet", target: "I fell over in the street.",
    source: "Me caí en la calle. (fall → fell)",
    sound: "ái fel ÓU-va in de striit",
    gram: { trap: "I falled over in the street." },
  },
  ena2m2iforgotmykeys: {
    id: "ena2m2iforgotmykeys", target: "I forgot my keys.",
    source: "Me dejé las llaves. (forget → forgot)",
    sound: "ái fa-GOT mái kiis̬",
    gram: { trap: "I forgot my keys in home.", same: ["I left my keys at home."] },
  },

  // ── ena2m2l9 — cerrar la anécdota ──
  ena2m2itwasadisaster: { id: "ena2m2itwasadisaster", target: "It was a disaster!", source: "¡Fue un desastre!", sound: "it uos̬ a di-S̬AAS-ta" },
  ena2m2andthatwasit: { id: "ena2m2andthatwasit", target: "And that was it!", source: "¡Y ahí acabó la cosa!", sound: "and dat uos̬ IT" },
};

export const ena2m2: Phase = {
  id: "ena2m2",
  level: "a2",
  n: 2,
  title: "What happened next?",
  goal: "Contar una historia entera: los verbos irregulares agrupados por patrón, la negación y la pregunta con did + verbo desnudo, las señales del relato (first of all, then, after that, finally) y la razón con because y so.",
  color: "#b45309",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — los ocho grandes: los irregulares que no se pueden esquivar
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l1",
      phaseId: "ena2m2",
      title: "I went, I saw, I had",
      subtitle: "Los verbos que no obedecen — y por qué son justo los que más usas",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Los ocho que hay que tener esta semana",
          itemIds: [
            "ena2m2iwenttothecinema", "ena2m2wehadagoodtime", "ena2m2isawamyyesterday",
            "ena2m2shegotamessage", "ena2m2imadeamistake", "ena2m2hetookthetrain",
            "ena2m2icamehomelate", "ena2m2shesaidsorry", "enyesterday",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Malas noticias con letra pequeña buena",
            body: "El módulo pasado te dio la regla más barata del inglés: <b>+ed</b> y ya está. Hoy llega la factura.<br/><br/>Hay unos <b>ciento y pico verbos</b> que no hacen la -ed: tienen su propia forma de pasado y hay que aprendérsela. Y —ley de Murphy de las lenguas— <b>son los que más se usan</b>: go, have, see, get, make, take, come, say. En un texto normal, uno de cada tres verbos en pasado es de estos.<br/><br/><b>Ahora la letra pequeña, que es buena de verdad.</b> Compara el trabajo:<br/><br/>· En español, para poner «ir» en pasado tienes que aprender <i>fui, fuiste, fue, fuimos, fuisteis, fueron</i> — y encima el otro pasado: <i>iba, ibas, iba, íbamos, ibais, iban</i>. Doce formas.<br/>· En inglés, «go» en pasado es <b>went</b>. Una. Para todas las personas y para los dos pasados españoles.<br/><br/>Así que sí, hay que memorizar. Pero memorizas <b>una palabra por verbo</b>, no doce. Y siguen valiendo las dos reglas del módulo pasado: <b>no hay -s de tercera persona</b> (<i>she went</i>, no <i>she wents</i>) y <b>el sujeto nunca se cae</b>.<br/><br/>Regla de supervivencia mientras los aprendes: si no te sale el pasado raro, <b>no te inventes una -ed</b>. <i>[[I goed|❌ no existe]]</i> suena a niño de tres años; decir «I went» mal colocado no, y en el examen la forma inventada cuenta como error de sistema.",
            table: [
              ["infinitivo", "pasado", "ejemplo"],
              ["go", "went", "I went to the cinema."],
              ["have", "had", "We had a good time."],
              ["see", "saw", "I saw Amy yesterday."],
              ["get", "got", "She got a message."],
              ["make", "made", "I made a mistake."],
              ["take", "took", "He took the train."],
              ["come", "came", "I came home late."],
              ["say", "said", "She said sorry."],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "yesterday",
              pastExample: "I went to the cinema.",
              nowLabel: "every week",
              nowExample: "I go to the cinema.",
            },
          },
        },
        {
          kind: "note",
          note: {
            title: "Tres de los ocho traen premio",
            body: "No todos cuestan lo mismo. Tres de ellos resuelven frases enteras que en español se dicen con otro verbo, y conviene aprenderlos ya así, en bloque:<br/><br/>· <b>have → had</b>. «Pasarlo bien» no se pasa: se <i>tiene</i>. <b>[[We had a good time.|Nos lo pasamos bien.]]</b> Y también <i>had breakfast</i>, <i>had a shower</i>, <i>had a look</i>.<br/>· <b>make → made</b>. «Equivocarse» no es un verbo en inglés: es <i>hacer</i> un error. <b>[[I made a mistake.|Me equivoqué.]]</b> Ojo, que aquí el español empuja a <i>I did a mistake</i>, y no.<br/>· <b>get → got</b>. Es el comodín del inglés hablado: recibir, conseguir, llegar. <i>She got a message</i> (le llegó), <i>I got home late</i> (llegué), <i>I got a job</i> (conseguí).<br/><br/>Y una nota de pronunciación que vale por diez correcciones: <b>said</b> no suena «séid». Suena <b>«sed»</b>, corto y seco, igual que <i>bed</i>. Es de las palabras más frecuentes del idioma y casi todo el mundo la dice mal el primer año.",
            table: [
              ["en español", "en inglés", "literal, y por eso falla"],
              ["Nos lo pasamos bien.", "We had a good time.", "We passed it well ❌"],
              ["Me equivoqué.", "I made a mistake.", "I did a mistake ❌"],
              ["Llegué a casa tarde.", "I came home late. / I got home late.", "I came to home late ❌"],
              ["Vi a Amy.", "I saw Amy.", "I saw to Amy ❌"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l1e1", type: "mc", prompt: "Lo primero: reconocerlos",
              question: "“I went to the cinema.”",
              options: ["Fui al cine", "Voy al cine", "Quiero ir al cine"],
              answer: 0,
              whyWrong: [null, "«Voy» sería I go — went es el pasado y no se parece en nada", "El «querer» no está en la frase: went es pasado a secas"],
              itemIds: ["ena2m2iwenttothecinema", "enletsgotothecinema"],
              tip: "went no se parece a go. Esa es toda la dificultad y todo el trabajo: reconocer una palabra nueva como el pasado de otra.",
            },
            {
              id: "ena2m2l1e2", type: "fastmatch", prompt: "Calentamiento — los regulares del módulo pasado, sin pensar",
              pairs: [
                { target: "worked", source: "trabajé" },
                { target: "watched", source: "vi (una peli)" },
                { target: "walked", source: "fui andando" },
                { target: "stayed", source: "me quedé" },
                { target: "rained", source: "llovió" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m1iworked", "ena2m1shewatchedafilm", "ena2m1theywalkedtothepark", "ena2m1istayedathome", "ena2m1itrained"],
              tip: "Antes de meter cincuenta formas nuevas, comprueba que las viejas salen solas. El cronómetro aquí solo premia.",
            },
            {
              id: "ena2m2l1e3", type: "match", prompt: "Empareja cada verbo con su pasado",
              pairs: [
                { target: "go", source: "went" },
                { target: "have", source: "had" },
                { target: "see", source: "saw" },
                { target: "get", source: "got" },
                { target: "make", source: "made" },
              ],
              itemIds: ["ena2m2iwenttothecinema", "ena2m2wehadagoodtime", "ena2m2isawamyyesterday", "ena2m2shegotamessage", "ena2m2imadeamistake"],
              tip: "Fíjate en que ninguno lo podrías haber adivinado. Por eso estos se memorizan y no se deducen.",
            },
            {
              id: "ena2m2l1e4", type: "bucket", prompt: "¿Este lleva -ed o cambia entero?",
              categories: ["obediente: + -ed", "rebelde: cambia entero"],
              items: [
                { text: "watch", bucket: 0 },
                { text: "go", bucket: 1 },
                { text: "cook", bucket: 0 },
                { text: "see", bucket: 1 },
                { text: "play", bucket: 0 },
                { text: "take", bucket: 1 },
                { text: "listen", bucket: 0 },
                { text: "have", bucket: 1 },
              ],
              itemIds: ["ena2m2iwenttothecinema", "ena2m2isawamyyesterday", "ena2m2hetookthetrain", "ena2m2wehadagoodtime"],
              tip: "No hay pista en la forma del infinitivo: watch y catch se parecen y hacen watched y caught. Esta clasificación es memoria pura, y está bien que lo sea.",
            },
            {
              id: "ena2m2l1e5", type: "cloze", prompt: "Completa con el pasado del verbo entre paréntesis",
              text: "Yesterday I ___ (go) to the cinema with Amy.",
              answers: ["went"],
              translation: "Ayer fui al cine con Amy.",
              hints: ["No lleva -ed: es una palabra distinta", "Empieza por w"],
              itemIds: ["ena2m2iwenttothecinema", "enyesterday"],
            },
            {
              id: "ena2m2l1e6", type: "cloze", prompt: "Y el que en español se dice con otro verbo",
              text: "We ___ (have) a good time at the concert.",
              answers: ["had"],
              translation: "Nos lo pasamos bien en el concierto.",
              hints: ["«Pasarlo bien» en inglés se TIENE", "have → h…"],
              itemIds: ["ena2m2wehadagoodtime", "ena2m1concert"],
              tip: "«Nos lo pasamos bien» = We HAD a good time. Guárdatela entera como una fórmula: la vas a usar en cada relato del nivel.",
            },
            {
              id: "ena2m2l1e7", type: "mc", prompt: "El error de principiante que hay que saltarse",
              question: "«Fui al cine» — ¿cuál es la buena?",
              options: ["I went to the cinema.", "I goed to the cinema.", "I did go to the cinema."],
              answer: 0,
              whyWrong: [null, "goed no existe: go tiene su propia forma, went", "«did go» existe, pero es enfático («sí que fui»), no la forma normal"],
              itemIds: ["ena2m2iwenttothecinema"],
              tip: "Si no te sale el pasado raro, no le pegues una -ed. Una forma inventada canta muchísimo más que una frase corta y correcta.",
            },
            {
              id: "ena2m2l1e8", type: "transform", prompt: "Del presente al pasado",
              source: "I go to the cinema every Friday.",
              instruction: "Ponla en pasado, con «last Friday»",
              answers: ["I went to the cinema last Friday.", "Last Friday I went to the cinema."],
              translation: "Fui al cine el viernes pasado.",
              hints: ["El verbo cambia entero", "go → w…"],
              itemIds: ["ena2m2iwenttothecinema"],
            },
            {
              id: "ena2m2l1e9", type: "transform", prompt: "Y con «she», donde el A1 dolía",
              source: "She takes the train every morning.",
              instruction: "Ponla en pasado, con «yesterday»",
              answers: ["She took the train yesterday.", "Yesterday she took the train."],
              translation: "Ayer cogió el tren.",
              hints: ["En pasado la -s de tercera persona desaparece", "takes → t…"],
              itemIds: ["ena2m2hetookthetrain", "entrain", "enyesterday"],
              tip: "takes → took, no «tooks». En pasado el inglés se olvida de la persona: misma forma para todos, también con los rebeldes.",
            },
            {
              id: "ena2m2l1e10", type: "errorfix", prompt: "Corrige la -ed inventada",
              wrong: "I seed Amy yesterday.",
              answers: ["I saw Amy yesterday."],
              why: "see no hace «seed»: su pasado es saw. Cuando un verbo es irregular, la -ed no es una segunda opción — sencillamente no existe esa forma.",
              translation: "Vi a Amy ayer.",
              itemIds: ["ena2m2isawamyyesterday"],
            },
            {
              id: "ena2m2l1e11", type: "errorfix", prompt: "Corrige la «a» que el español pone y el inglés no",
              wrong: "I saw to Amy yesterday.",
              answers: ["I saw Amy yesterday."],
              why: "En español «ver» pide «a» delante de persona: «vi A Amy». En inglés no hay tal cosa: el verbo va pegado a la persona, sin preposición. Lo mismo con help, call, visit: I helped Amy, I called Ben.",
              translation: "Vi a Amy ayer.",
              itemIds: ["ena2m2isawamyyesterday"],
              tip: "La «a personal» del español no tiene equivalente inglés. Cuando la escribas, bórrala: no hay ningún verbo que la pida.",
            },
            {
              id: "ena2m2l1e12", type: "build", prompt: "Construye la frase",
              target: "He took the train and I came home late",
              translation: "Él cogió el tren y yo llegué a casa tarde",
              distractors: ["taked", "comed"],
              itemIds: ["ena2m2hetookthetrain", "ena2m2icamehomelate", "entrain", "enhome"],
              tip: "Las dos fichas que sobran son las formas que tu cabeza va a fabricar sola durante un mes. Reconócelas para no escribirlas.",
            },
            {
              id: "ena2m2l1e13", type: "listen", prompt: "Dictado — cuidado con la última",
              text: "She got a message and she said sorry.",
              translation: "Le llegó un mensaje y pidió perdón.",
              hints: ["get → g… · say → s…", "She g… a message and she s… sorry."],
              itemIds: ["ena2m2shegotamessage", "ena2m2shesaidsorry", "enmessage", "ensorry"],
              tip: "Suena «sed» y se escribe said. Es la trampa de deletreo más frecuente del nivel: lo que oyes no te dice cómo se escribe.",
            },
            {
              id: "ena2m2l1e14", type: "speak", prompt: "Dilo en voz alta",
              text: "Yesterday I went to the cinema and I saw Amy.",
              phonetic: "YÉS-ta-dei ái UENT tu de SÍ-ne-ma and ái SOO ÉI-mi",
              translation: "Ayer fui al cine y vi a Amy.",
              itemIds: ["ena2m2iwenttothecinema", "ena2m2isawamyyesterday"],
              tip: "saw es una sola vocal larga: «soo». Ni «sáu» ni «sao».",
            },
            {
              id: "ena2m2l1e15", type: "type", prompt: "Cierre de producción",
              question: "Ayer cogí el tren, llegué a casa tarde y me equivoqué de parada.",
              answers: [
                "Yesterday I took the train, I came home late and I made a mistake with the bus stop.",
                "Yesterday I took the train, I came home late and I made a mistake with the stop.",
                "Yesterday I took the train, came home late and made a mistake with the bus stop.",
              ],
              hints: ["Tres irregulares seguidos: take, come, make", "Yesterday I t… the train, I c… home late and I m… a mistake…"],
              itemIds: ["ena2m2hetookthetrain", "ena2m2icamehomelate", "ena2m2imadeamistake", "enbusstop"],
              tip: "Tres verbos rebeldes en una frase y ni una -ed. Si te ha salido, los ocho grandes ya empiezan a ser tuyos.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m2-1",
            book: "We had a good time.",
            real: "We had a laugh.",
            meaning: "Nos lo pasamos genial / nos reímos mucho",
            when: "Con amigos y compañeros, contando una noche o un finde. Es de las expresiones más británicas que hay y no lleva ninguna carga: se dice de una cena, de un concierto o de un turno de trabajo llevadero. En el Writing del examen, la versión del libro (a good time, a great time).",
            register: "amigos",
            note: "a laugh aquí no es «una risa»: es «un buen rato». Y se dice también de una persona — «Sam's a laugh» = «Sam es divertidísimo».",
            sound: "ui jad a LAAF",
            level: "a2",
            itemId: "ena2m2wehadagoodtime",
          },
        },
      ],
      resources: [
        { label: "British Council — Past simple", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Vuelve a la misma ficha del módulo pasado, pero hoy mira SOLO los ejemplos con verbos irregulares. Cinco minutos: se trata de acostumbrar el ojo, no de estudiar." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — los patrones: seis familias en vez de una lista alfabética
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l2",
      phaseId: "ena2m2",
      title: "Sang, bought, wrote, slept",
      subtitle: "Los irregulares por familias — porque en lista alfabética no se aprenden",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Las seis familias",
          itemIds: [
            "ena2m2sanggroup", "ena2m2boughtgroup", "ena2m2caughtgroup",
            "ena2m2wrotegroup", "ena2m2wokegroup", "ena2m2sleptgroup",
            "ena2m2knewgroup", "ena2m2putgroup",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Nadie aprende una lista alfabética. Familias, sí",
            body: "Si abres cualquier libro por la tabla de verbos irregulares te encuentras <i>be, become, begin, break, bring, build, buy…</i> por orden alfabético. Esa tabla no se aprende: el orden alfabético junta verbos que no tienen nada que ver y separa los que se parecen.<br/><br/><b>Lo que sí funciona es agruparlos por lo que le pasa a la vocal.</b> Los irregulares no son cien casos sueltos: son media docena de patrones con sus miembros. Aprendes el patrón una vez y los verbos entran solos — y, lo que es mejor, cuando te encuentres uno nuevo sabrás por dónde va.<br/><br/>Son estas seis. Léelas en voz alta de arriba abajo: la familia se oye antes de que la entiendas.",
            table: [
              ["familia", "qué le pasa a la vocal", "miembros"],
              ["la A abierta", "i / u → a", "sing→sang · drink→drank · swim→swam · run→ran · sit→sat"],
              ["las -ought / -aught", "todo se vuelve «-oot»", "buy→bought · think→thought · bring→brought · catch→caught · teach→taught"],
              ["las «óu»", "i larga / ea → óu", "write→wrote · drive→drove · ride→rode · wake→woke · break→broke · speak→spoke"],
              ["las que acaban en -t", "la vocal se acorta", "sleep→slept · keep→kept · feel→felt · leave→left · meet→met"],
              ["las «-úu»", "-ow / -y → -ew", "know→knew · grow→grew · throw→threw · fly→flew"],
              ["las que no cambian", "nada de nada", "put→put · cut→cut · let→let · cost→cost"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Dos avisos antes de empezar a memorizar",
            body: "<b>1. La familia de las -ought/-aught es la más rentable del inglés.</b> Cinco verbos altísimos de frecuencia (buy, think, bring, catch, teach) y una sola cosa que aprender: se escriben con esa maraña de letras y suenan todos igual, <b>«-oot»</b>, con la o larga y la gh muda. [[bought|compró]], [[thought|pensó]], [[caught|pilló]]: boot, zoot, koot.<br/><br/><b>2. Las que no cambian son un regalo con trampa.</b> <i>put</i>, <i>cut</i>, <i>let</i> y <i>cost</i> tienen la misma forma en presente y en pasado, así que <b>lo único que dice el tiempo verbal es el contexto</b>: <i>It costs £40</i> (cuesta) frente a <i>It cost £40 last year</i> (costó). Cuando uses una de estas, pon el marcador temporal — <i>yesterday</i>, <i>last year</i> — o nadie sabrá de qué hablas.<br/><br/>Y ojo a un falso amigo de la familia: <b>read</b> también se escribe igual en presente y en pasado, pero <b>sí cambia al oído</b> (riid → red). Esa la trabajamos entera en la lección 5.",
            table: [
              ["presente", "pasado", "qué lo decide"],
              ["It costs £40.", "It cost £40 last year.", "last year"],
              ["I put it in my bag.", "I put it in my bag yesterday.", "yesterday"],
              ["They cut the cake.", "They cut the cake at eight.", "at eight"],
              ["I read the message.", "I read the message last night.", "last night — y el sonido: red"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l2e1", type: "bucket", prompt: "¿De qué familia es? Fíjate solo en el infinitivo",
              categories: ["la vocal se abre en A (sang, drank…)", "acaba en -ought / -aught (bought, caught…)"],
              items: [
                { text: "sing", bucket: 0 },
                { text: "buy", bucket: 1 },
                { text: "swim", bucket: 0 },
                { text: "think", bucket: 1 },
                { text: "run", bucket: 0 },
                { text: "bring", bucket: 1 },
                { text: "catch", bucket: 1 },
                { text: "sit", bucket: 0 },
              ],
              itemIds: ["ena2m2sanggroup", "ena2m2boughtgroup", "ena2m2caughtgroup"],
              tip: "Ojo a bring y sing: riman en presente y van a familias distintas (brought / sang). Es el recordatorio de que el patrón hay que aprenderlo verbo a verbo, no adivinarlo por la rima.",
            },
            {
              id: "ena2m2l2e2", type: "match", prompt: "Empareja — una de cada familia",
              pairs: [
                { target: "drink", source: "drank" },
                { target: "buy", source: "bought" },
                { target: "write", source: "wrote" },
                { target: "sleep", source: "slept" },
                { target: "know", source: "knew" },
              ],
              itemIds: ["ena2m2sanggroup", "ena2m2boughtgroup", "ena2m2wrotegroup", "ena2m2sleptgroup", "ena2m2knewgroup"],
            },
            {
              id: "ena2m2l2e3", type: "match", prompt: "Y la segunda tanda",
              pairs: [
                { target: "catch", source: "caught" },
                { target: "break", source: "broke" },
                { target: "fly", source: "flew" },
                { target: "put", source: "put" },
                { target: "leave", source: "left" },
              ],
              itemIds: ["ena2m2caughtgroup", "ena2m2wokegroup", "ena2m2knewgroup", "ena2m2putgroup", "ena2m2sleptgroup"],
              tip: "put → put no es una errata: es la familia entera de los que no se mueven.",
            },
            {
              id: "ena2m2l2e4", type: "mc", prompt: "La familia más rentable",
              question: "El pasado de think es…",
              options: ["thought", "thinked", "thunk"],
              answer: 0,
              whyWrong: [null, "think es irregular: no admite -ed", "thunk se oye de broma en inglés americano, nunca en un examen"],
              itemIds: ["ena2m2boughtgroup"],
              tip: "buy, think, bring, catch, teach: cinco verbos altísimos y una sola terminación que aprender. Empieza por esta familia si tienes prisa.",
            },
            {
              id: "ena2m2l2e5", type: "mc", prompt: "El regalo de la lista",
              question: "¿Cuál de estos NO cambia en pasado?",
              options: ["cut", "swim", "break", "know"],
              answer: 0,
              whyWrong: [null, "swim → swam", "break → broke", "know → knew"],
              itemIds: ["ena2m2putgroup"],
              tip: "put, cut, let, cost. Cuatro verbos que ya sabes en pasado sin haberlos estudiado — pero acuérdate de poner el marcador temporal o nadie sabrá que hablas del pasado.",
            },
            {
              id: "ena2m2l2e6", type: "cloze", prompt: "Completa con el pasado",
              text: "I ___ (buy) a new jacket last week.",
              answers: ["bought"],
              translation: "Me compré una chaqueta la semana pasada.",
              hints: ["Familia de las -ought", "b…ought"],
              itemIds: ["ena2m2boughtgroup", "enjacket", "ena2m1lastweek"],
            },
            {
              id: "ena2m2l2e7", type: "cloze", prompt: "Y otra familia",
              text: "She ___ (sleep) for ten hours on Sunday.",
              answers: ["slept"],
              translation: "Durmió diez horas el domingo.",
              hints: ["La vocal se acorta y aparece una -t", "sleep → sl…"],
              itemIds: ["ena2m2sleptgroup"],
            },
            {
              id: "ena2m2l2e8", type: "gapbank", prompt: "La mañana de Valeria — elige del banco",
              text: "Last Saturday I ___ up at eleven. Then I ___ a coffee and ___ to Amy for an hour. In the afternoon we ___ to the street market.",
              answers: ["woke", "made", "spoke", "went"],
              bank: ["woke", "made", "spoke", "went", "broke", "took", "sang"],
              translation: "El sábado pasado me desperté a las once. Luego me hice un café y estuve hablando con Amy una hora. Por la tarde nos fuimos al mercadillo.",
              itemIds: ["ena2m2wokegroup", "ena2m2imadeamistake", "ena2m2iwenttothecinema", "encoffee", "ena2m1streetmarket"],
              tip: "Tres de los cuatro son de la familia «óu» (woke, spoke, y broke que sobra). Cuando una familia entra en bloque, los distractores de la misma familia dejan de asustar.",
            },
            {
              id: "ena2m2l2e9", type: "transform", prompt: "Del presente al pasado",
              source: "I write to Emma every month.",
              instruction: "Ponla en pasado, con «last month»",
              answers: ["I wrote to Emma last month.", "Last month I wrote to Emma."],
              translation: "Le escribí a Emma el mes pasado.",
              hints: ["Familia de las «óu»", "write → wr…"],
              itemIds: ["ena2m2wrotegroup", "enemail"],
            },
            {
              id: "ena2m2l2e10", type: "errorfix", prompt: "Corrige la -ed que se cuela",
              wrong: "She catched the bus at eight.",
              answers: ["She caught the bus at eight."],
              why: "catch es de la familia -aught: su pasado es caught, y suena «koot». La trampa está en que catch se parece a watch, que sí es regular (watched). Parecerse en el infinitivo no dice nada del pasado.",
              translation: "Cogió el autobús a las ocho.",
              itemIds: ["ena2m2caughtgroup", "enbus"],
            },
            {
              id: "ena2m2l2e11", type: "fastmatch", prompt: "Ráfaga de familias — solo el significado, sin pensar en la regla",
              pairs: [
                { target: "bought", source: "compré" },
                { target: "thought", source: "pensé" },
                { target: "slept", source: "dormí" },
                { target: "knew", source: "sabía" },
                { target: "broke", source: "rompí" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m2boughtgroup", "ena2m2sleptgroup", "ena2m2knewgroup", "ena2m2wokegroup"],
              tip: "Si tardas, ese verbo volverá en el repaso. Es exactamente para lo que sirve el cronómetro: no para castigarte, para elegir qué te toca mañana.",
            },
            {
              id: "ena2m2l2e12", type: "listen", prompt: "Dictado — dos familias en una frase",
              text: "I bought a coffee and we sat in the park.",
              translation: "Me compré un café y nos sentamos en el parque.",
              hints: ["buy → b…ought · sit → s…", "I b… a coffee and we s… in the park."],
              itemIds: ["ena2m2boughtgroup", "ena2m2sanggroup", "encoffee", "enpark"],
              tip: "bought se escribe con seis letras y suena con dos sonidos: «boot». Escríbela entera aunque te parezca absurdo — el examen es escrito también.",
            },
            {
              id: "ena2m2l2e13", type: "type", prompt: "Cierre de producción",
              question: "Me compré una chaqueta, pero me costó cuarenta libras.",
              answers: [
                "I bought a jacket, but it cost forty pounds.",
                "I bought a jacket but it cost forty pounds.",
                "I bought a jacket, but it cost £40.",
              ],
              hints: ["buy → bought · cost no cambia", "I b… a jacket, but it c… forty pounds."],
              itemIds: ["ena2m2boughtgroup", "ena2m2putgroup", "enjacket", "enpound", "enbut"],
              tip: "cost en pasado se escribe cost. Aquí lo que dice «costó» y no «cuesta» es el bought de la primera mitad: el contexto hace de marcador.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A1-A2 vocabulary", url: "https://learnenglish.britishcouncil.org/vocabulary/a1-a2-vocabulary", note: "Busca los ejercicios de verbos y hazlos mirando la familia de cada uno, no la lista. Diez minutos al día durante esta semana valen más que una hora el domingo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — didn't: la negación con los rebeldes (aquí muere «I didn't went»)
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l3",
      phaseId: "ena2m2",
      title: "I didn't go out",
      subtitle: "Negar en pasado: el auxiliar se lleva la marca y el verbo se queda desnudo",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que NO pasó",
          itemIds: [
            "ena2m2ididntgoout", "ena2m2wedidnthavetime", "ena2m2ididntsleep",
            "ena2m2ilostmyphone", "ena2m2ifounditinmybag", "ena2m2ididntdoanything",
            "ena2m1ididntwork",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Buenas noticias: los irregulares desaparecen en la negativa",
            body: "El módulo pasado te dejó montada la máquina: para negar en pasado aparece <b>didn't</b> y <b>el verbo vuelve a su forma de diccionario</b>. <i>I worked</i> → <i>I didn't work</i>.<br/><br/>Ahora viene el regalo: <b>eso vale igual para los cincuenta verbos rebeldes de este módulo</b>. Como el pasado lo lleva el auxiliar, el verbo se queda desnudo — y desnudo significa <b>la forma normal, no la rara</b>:<br/><br/>· I went out → I <b>didn't go</b> out.<br/>· We had time → We <b>didn't have</b> time.<br/>· I saw Amy → I <b>didn't see</b> Amy.<br/><br/>O sea: en negativa <b>no necesitas saberte went, had ni saw</b>. Solo go, have, see, que ya los sabías del A1. La mitad del trabajo de esta semana desaparece en cuanto pones un didn't delante.<br/><br/><b>Y de ahí sale el error nº 1 del A2 español:</b> <i>I didn't went out</i>. Es el pasado marcado dos veces, exactamente el mismo fallo que decir <i>She doesn't works</i> en presente. Una marca por frase, y la lleva el auxiliar. Si ves <b>didn't</b> y a la vez una forma de pasado, sobra una de las dos.<br/><br/>El otro calco, más de habla rápida que de escritura: <i>[[I no went|❌]]</i>. En español se niega con una sola palabra delante («no salí»); en inglés hace falta el auxiliar completo, <b>didn't</b>, y no hay atajo.",
            table: [
              ["afirmativa", "negativa", "qué pasa"],
              ["I went out.", "I didn't go out.", "went → go"],
              ["We had time.", "We didn't have time.", "had → have"],
              ["I saw Amy.", "I didn't see Amy.", "saw → see"],
              ["She got the message.", "She didn't get the message.", "got → get"],
              ["They came home.", "They didn't come home.", "came → come"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«No hice nada»: la doble negación que el inglés no aguanta",
            body: "En español se niega dos veces y suena perfecto: «<b>no</b> hice <b>nada</b>», «<b>no</b> vi a <b>nadie</b>». Son dos negaciones en la misma frase y nadie se escandaliza.<br/><br/><b>En inglés solo cabe una.</b> Si ya has puesto <i>didn't</i>, lo que viene detrás va en positivo: <b>anything</b>, <b>anybody</b>, <b>anywhere</b>.<br/><br/>· <b>[[I didn't do anything.|No hice nada.]]</b> ✔ · <i>I didn't do nothing</i> ❌<br/>· <b>I didn't see anybody.</b> ✔ · <i>I didn't see nobody</i> ❌<br/><br/>La otra forma de decirlo es cargar la negación en la palabra y dejar el verbo en positivo: <b>I did nothing</b>, <b>I saw nobody</b>. Es correcta y suena más formal, pero <b>solo una de las dos mitades puede ser negativa</b>. Elige una.<br/><br/>(Sí: en canciones y en habla muy coloquial se oye <i>I didn't do nothing</i>. Es un dialecto reconocible, no un descuido — pero en el examen es un error, y punto.)",
            table: [
              ["español", "inglés ✔", "calco ❌"],
              ["No hice nada.", "I didn't do anything. / I did nothing.", "I didn't do nothing."],
              ["No vi a nadie.", "I didn't see anybody.", "I didn't see nobody."],
              ["No fui a ningún sitio.", "I didn't go anywhere.", "I didn't go nowhere."],
              ["No salí.", "I didn't go out.", "I no went out."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l3e1", type: "mc", prompt: "«No salí»",
              question: "¿Cuál es la buena?",
              options: ["I didn't go out.", "I didn't went out.", "I no went out."],
              answer: 0,
              whyWrong: [null, "Pasado marcado dos veces: didn't ya lo dice, así que go va desnudo", "El español niega con una palabra delante; el inglés necesita el auxiliar entero"],
              itemIds: ["ena2m2ididntgoout"],
              tip: "Es el error nº 1 del nivel y el que más veces se corrige en un examen. Merece la pena reconocerlo de un vistazo.",
            },
            {
              id: "ena2m2l3e2", type: "bucket", prompt: "¿Quién lleva la marca de pasado en esta frase?",
              categories: ["la lleva el verbo", "la lleva el auxiliar (verbo desnudo)"],
              items: [
                { text: "I went out", bucket: 0 },
                { text: "I didn't go out", bucket: 1 },
                { text: "She had time", bucket: 0 },
                { text: "She didn't have time", bucket: 1 },
                { text: "We saw it", bucket: 0 },
                { text: "They didn't see it", bucket: 1 },
              ],
              itemIds: ["ena2m2ididntgoout", "ena2m2wedidnthavetime", "ena2m2didyouseeit"],
              tip: "Una marca por frase. Si está en didn't, el verbo no la repite — igual que en presente la -s está en does y no en el verbo.",
            },
            {
              id: "ena2m2l3e3", type: "cloze", prompt: "Completa la negativa",
              text: "I ___ go out last night.",
              answers: ["didn't", "did not"],
              translation: "Anoche no salí.",
              hints: ["did + not, contraído", "d…'t"],
              itemIds: ["ena2m2ididntgoout", "enlastnight"],
            },
            {
              id: "ena2m2l3e4", type: "cloze", prompt: "Y ahora el verbo — cuidado",
              text: "We didn't ___ time for breakfast.",
              answers: ["have"],
              translation: "No nos dio tiempo de desayunar.",
              hints: ["Detrás de didn't, forma de diccionario", "No es «had»…"],
              itemIds: ["ena2m2wedidnthavetime"],
              tip: "Aquí es donde casi todo el mundo escribe «had». Detrás de didn't, la forma rara del verbo NO aparece nunca.",
            },
            {
              id: "ena2m2l3e5", type: "transform", prompt: "Pásala a negativa",
              source: "I went out on Saturday.",
              instruction: "Ponla en negativa",
              answers: ["I didn't go out on Saturday.", "I did not go out on Saturday."],
              translation: "No salí el sábado.",
              hints: ["El pasado se muda al auxiliar y went vuelve a go", "I d…'t go out on Saturday."],
              itemIds: ["ena2m2ididntgoout"],
            },
            {
              id: "ena2m2l3e6", type: "transform", prompt: "Otra, con un rebelde de los gordos",
              source: "She had a good time.",
              instruction: "Ponla en negativa",
              answers: ["She didn't have a good time.", "She did not have a good time."],
              translation: "No se lo pasó bien.",
              hints: ["had → have", "She d…'t h… a good time."],
              itemIds: ["ena2m2wehadagoodtime", "ena2m2wedidnthavetime"],
            },
            {
              id: "ena2m2l3e7", type: "errorfix", prompt: "Corrige el doble pasado — el error nº 1 del A2",
              wrong: "I didn't went out.",
              answers: ["I didn't go out."],
              why: "El pasado se marca UNA vez por frase y lo lleva el auxiliar. Con didn't delante, el verbo vuelve a su forma de diccionario: go, have, see, take. Es el mismo fallo que «Does she works?», solo que un tiempo más allá.",
              translation: "No salí.",
              itemIds: ["ena2m2ididntgoout"],
            },
            {
              id: "ena2m2l3e8", type: "errorfix", prompt: "Corrige la doble negación",
              wrong: "I didn't do nothing on Sunday.",
              answers: ["I didn't do anything on Sunday."],
              why: "En español «no hice nada» lleva dos negaciones y está bien. En inglés solo cabe una: si ya has puesto didn't, lo de detrás va en positivo (anything). La alternativa es «I did nothing», con la negación en la palabra y el verbo limpio.",
              translation: "No hice nada el domingo.",
              itemIds: ["ena2m2ididntdoanything"],
            },
            {
              id: "ena2m2l3e9", type: "mc", prompt: "El verbo que en español es uno y en inglés son dos",
              question: "«Perdí el móvil»",
              options: ["I lost my phone.", "I missed my phone.", "I losed my phone."],
              answer: 0,
              whyWrong: [null, "miss es «perder» un tren, un autobús o una cita — algo que sale sin ti. Un objeto se pierde con lose", "lose es irregular: lost"],
              itemIds: ["ena2m2ilostmyphone", "ena2m1missedthebus", "enphonenumber"],
              tip: "El español usa «perder» para las dos cosas y el inglés reparte: lose un objeto, miss un transporte o una cita. I lost my keys / I missed the bus.",
            },
            {
              id: "ena2m2l3e10", type: "build", prompt: "Construye la negativa",
              target: "We didn't have time for breakfast",
              translation: "No nos dio tiempo de desayunar",
              distractors: ["had", "hadn't"],
              itemIds: ["ena2m2wedidnthavetime"],
              tip: "Las dos fichas sobrantes son exactamente lo que tu cabeza va a querer poner. Que sobren es el ejercicio.",
            },
            {
              id: "ena2m2l3e11", type: "audiomc", prompt: "Escucha dos veces, como en el examen",
              audio: "Did you go out on Saturday? — No, I didn't. I didn't sleep very well on Friday and I stayed at home all weekend.",
              question: "¿Qué hizo el sábado?",
              options: ["Se quedó en casa", "Salió con amigos", "Trabajó"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "La respuesta corta es «No, I didn't»: no salió", "El trabajo no se menciona en ningún momento"],
              itemIds: ["ena2m2ididntgoout", "ena2m2ididntsleep", "ena2m1istayedathome"],
              tip: "Cuando oigas «No, I didn't», el dato ya está: lo que viene detrás es el motivo. En el examen, la respuesta corta te da la mitad de la pregunta.",
            },
            {
              id: "ena2m2l3e12", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "No dormí muy bien y el domingo no hice nada.",
              answers: [
                "I didn't sleep very well and I didn't do anything on Sunday.",
                "I didn't sleep very well and on Sunday I didn't do anything.",
                "I didn't sleep very well and I did nothing on Sunday.",
              ],
              hint: "dos negativas seguidas, y ninguna de las dos lleva forma de pasado en el verbo",
              itemIds: ["ena2m2ididntsleep", "ena2m2ididntdoanything"],
            },
            {
              id: "ena2m2l3e13", type: "speak", prompt: "Dilo en voz alta — dos didn't seguidos",
              text: "I didn't go out and I didn't do anything.",
              phonetic: "ái DÍ-dent góu áut and ái DÍ-dent du É-ni-zing",
              translation: "Ni salí ni hice nada.",
              itemIds: ["ena2m2ididntgoout", "ena2m2ididntdoanything"],
              tip: "didn't es «DÍ-dent», dos golpes. Al hablar rápido casi se come la t final: «DÍ-den góu». Escríbela siempre, dila corta.",
            },
            {
              id: "ena2m2l3e14", type: "type", prompt: "Cierre de producción",
              question: "No salí el sábado. Perdí el móvil y lo encontré en el bolso el domingo.",
              answers: [
                "I didn't go out on Saturday. I lost my phone and I found it in my bag on Sunday.",
                "I didn't go out on Saturday. I lost my phone and found it in my bag on Sunday.",
              ],
              hints: ["Negativa con verbo desnudo + dos irregulares en afirmativa", "I d…'t go out on Saturday. I l… my phone and I f… it in my bag on Sunday."],
              itemIds: ["ena2m2ididntgoout", "ena2m2ilostmyphone", "ena2m2ifounditinmybag"],
              tip: "Mira la diferencia dentro de tu propia frase: go desnudo detrás de didn't, y lost y found con su forma rara en afirmativa. Ese contraste es la lección entera.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m2-2",
            book: "I didn't sleep very well.",
            real: "I didn't sleep a wink.",
            meaning: "No pegué ojo",
            when: "Con amigos y en el trabajo, quejándote de la noche. Es una exageración amable, igual que «no pegué ojo» en español: nadie se la toma al pie de la letra. En el Writing del examen, la del libro.",
            register: "amigos",
            note: "a wink es «un parpadeo». La expresión solo existe en negativo: nadie dice «I slept a wink».",
            sound: "ái DÍ-dent sliip a UÍNK",
            level: "a2",
            itemId: "ena2m2ididntsleep",
          },
        },
      ],
      resources: [
        { label: "British Council — Past simple", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple", note: "Vuelve a los ejercicios de negativa y comprueba en cada frase que detrás de didn't NO hay ninguna forma de pasado. Diez minutos y la trampa deja de tenerte." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — preguntar en pasado, con los rebeldes y con las wh-
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l4",
      phaseId: "ena2m2",
      title: "Where did you go?",
      subtitle: "Preguntar por lo que le pasó a otro — y sacarle la historia entera",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Las preguntas que hacen hablar a otro",
          itemIds: [
            "ena2m2wheredidyougo", "ena2m2whathappenednext", "ena2m2didyouseeit",
            "ena2m2howdidyougethome", "ena2m2whotoldyou", "ena2m2whydidyouleave",
            "ena2m1whatdidyoudo", "ena2m1yesidid",
          ],
        },
        {
          kind: "note",
          note: {
            title: "La pregunta en pasado: tres piezas y siempre en el mismo orden",
            body: "Igual que la negativa, la pregunta se monta con <b>did</b> y el verbo desnudo, y da lo mismo que el verbo sea obediente o rebelde:<br/><br/><b>(palabra qu-) + did + sujeto + verbo en forma de diccionario</b><br/><br/>· <b>Where did you go?</b> — no <i>Where did you went?</i><br/>· <b>What did you do?</b> · <b>How did you get home?</b> · <b>Why did you leave?</b><br/>· Sin palabra qu-, la pregunta de sí o no: <b>Did you see it?</b><br/><br/>Y la respuesta corta repite el auxiliar, nunca el verbo: <b>Yes, I did. / No, I didn't.</b><br/><br/><b>Por qué al principio se te olvida el did entero:</b> en español la pregunta se hace con la entonación y el orden apenas cambia («¿adónde fuiste?»). En inglés no hay entonación que valga — <b>sin auxiliar no hay pregunta</b>, ni en escrito ni en oral.<br/><br/><b>La excepción que ya viste en el módulo 1</b>, y que ahora se cobra: cuando la palabra qu- <b>ES el sujeto</b>, el auxiliar sobra. <b>[[What happened?|¿Qué pasó?]]</b>, <b>[[Who told you?|¿Quién te lo dijo?]]</b>, <b>Who phoned?</b> Nadie dice <i>Who did tell you?</i><br/><br/>Regla corta para decidir en un segundo: si la pregunta es «<b>¿quién</b> hizo algo?» o «<b>¿qué</b> pasó?», nada de did. Si es «¿qué hiciste <b>tú</b>?», did obligatorio.",
            table: [
              ["quieres saber…", "pregunta", "el verbo va…"],
              ["adónde", "Where did you go?", "go, desnudo"],
              ["qué", "What did you do?", "do, desnudo"],
              ["cómo", "How did you get home?", "get, desnudo"],
              ["por qué", "Why did you leave?", "leave, desnudo"],
              ["sí o no", "Did you see it?", "see, desnudo"],
              ["quién lo hizo", "Who told you?", "told — sin auxiliar, aquí sí va el pasado"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y ahora, cómo suena de verdad",
            body: "En el Listening del examen no vas a oír «did you» separado y limpio. Al hablar a velocidad normal, <b>did you</b> se funde en una sílaba: <b>«DÍ-dyu»</b>, y a veces directamente <b>«dja»</b>.<br/><br/>· Did you see it? → <b>DÍ-dyu SÍI it</b><br/>· What did you do? → <b>uót-dyu DÚU</b><br/>· Where did you go? → <b>uéa-dyu GÓU</b><br/><br/>Esto no es dejadez ni acento raro: es <b>cómo se habla</b>. Lo importante para ti es que <b>lo que se encoge al hablar se escribe entero</b>. Tú escribe <i>Did you</i>; solo tienes que reconocerlo cuando llega pegado.<br/><br/>Y un aviso de estrategia: si en el examen pierdes el principio de una pregunta, <b>no la des por perdida</b>. El final («…go?», «…see it?») lleva el verbo, y el verbo suele bastar para contestar.",
            table: [
              ["escrito", "cómo suena", "qué se ha fundido"],
              ["Did you see it?", "DÍ-dyu SÍI it", "did + you"],
              ["What did you do?", "uót-dyu DÚU", "did + you, y el what se pega"],
              ["Where did you go?", "uéa-dyu GÓU", "lo mismo"],
              ["Who told you?", "juu TÓULD-yu", "told + you"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l4e1", type: "mc", prompt: "«¿Adónde fuiste?»",
              question: "¿Cuál es la buena?",
              options: ["Where did you go?", "Where did you went?", "Where you went?"],
              answer: 0,
              whyWrong: [null, "Pasado dos veces: did ya lo marca y go va desnudo", "Sin auxiliar no hay pregunta inglesa: la entonación sola es calco del español"],
              itemIds: ["ena2m2wheredidyougo"],
            },
            {
              id: "ena2m2l4e2", type: "bucket", prompt: "¿Esta pregunta necesita did o no?",
              categories: ["necesita did", "sin did: la palabra qu- ES el sujeto"],
              items: [
                { text: "¿Adónde fuiste?", bucket: 0 },
                { text: "¿Quién te lo dijo?", bucket: 1 },
                { text: "¿Qué pasó?", bucket: 1 },
                { text: "¿Cómo volviste a casa?", bucket: 0 },
                { text: "¿Por qué te fuiste?", bucket: 0 },
                { text: "¿Quién llamó?", bucket: 1 },
              ],
              itemIds: ["ena2m2wheredidyougo", "ena2m2whotoldyou", "ena2m1whathappened", "ena2m2howdidyougethome", "ena2m2whydidyouleave"],
              tip: "El truco: traduce la pregunta y mira si la palabra qu- hace de sujeto. «¿QUIÉN te lo dijo?» — quién es el que dice, así que es sujeto y no hace falta did.",
            },
            {
              id: "ena2m2l4e3", type: "cloze", prompt: "Completa la pregunta",
              text: "Where ___ you go last night?",
              answers: ["did"],
              translation: "¿Adónde fuiste anoche?",
              hints: ["El ayudante del pasado, igual para todas las personas", "d…"],
              itemIds: ["ena2m2wheredidyougo", "enlastnight"],
            },
            {
              id: "ena2m2l4e4", type: "cloze", prompt: "Y ahora la excepción — sin auxiliar el verbo SÍ lleva el pasado",
              text: "Who ___ (tell) you about the party?",
              answers: ["told"],
              translation: "¿Quién te habló de la fiesta?",
              hints: ["Aquí «quién» es el sujeto: no hay did que lleve la marca", "tell → t…"],
              itemIds: ["ena2m2whotoldyou"],
              tip: "Fíjate en el mecanismo: sin auxiliar, la marca de pasado vuelve al verbo. No es otra regla — es la misma, mirada del otro lado.",
            },
            {
              id: "ena2m2l4e5", type: "transform", prompt: "Pásala a pregunta",
              source: "You went home early.",
              instruction: "Hazla pregunta de sí o no",
              answers: ["Did you go home early?"],
              translation: "¿Te fuiste a casa pronto?",
              hints: ["El auxiliar abre la frase y el verbo se desnuda", "D… you g… home early?"],
              itemIds: ["ena2m2wheredidyougo", "ena2m2icamehomelate"],
            },
            {
              id: "ena2m2l4e6", type: "transform", prompt: "Otra, con palabra qu-",
              source: "She saw the message.",
              instruction: "Pregunta cuándo, con «When»",
              answers: ["When did she see the message?"],
              translation: "¿Cuándo vio el mensaje?",
              hints: ["When + did + sujeto + verbo desnudo", "When d… she s… the message?"],
              itemIds: ["ena2m2didyouseeit", "ena2m2shegotamessage", "enmessage"],
            },
            {
              id: "ena2m2l4e7", type: "errorfix", prompt: "Corrige el doble pasado en pregunta",
              wrong: "Where did you went?",
              answers: ["Where did you go?"],
              why: "did ya dice que la frase es pasada, así que el verbo vuelve a su forma de diccionario. Con los rebeldes se nota más porque went y go no se parecen, pero la regla es la misma que con «Did you watched?».",
              translation: "¿Adónde fuiste?",
              itemIds: ["ena2m2wheredidyougo"],
            },
            {
              id: "ena2m2l4e8", type: "errorfix", prompt: "Corrige el auxiliar que sobra",
              wrong: "Who did tell you about the party?",
              answers: ["Who told you about the party?"],
              why: "Cuando la palabra qu- es el sujeto de la frase (¿quién?, ¿qué?), no hay auxiliar: el verbo lleva su pasado directamente. Who told you? · What happened? · Who phoned?",
              translation: "¿Quién te habló de la fiesta?",
              itemIds: ["ena2m2whotoldyou", "ena2m1whathappened"],
            },
            {
              id: "ena2m2l4e9", type: "hearreal", prompt: "¿Libro o calle? Lo que hace el «did you» a velocidad normal",
              book: "Did you have a good time?",
              real: "Didja have a good time?",
              translation: "¿Te lo pasaste bien?",
              itemIds: ["ena2m2wehadagoodtime", "ena2m1yesidid"],
              tip: "Se escribe «Did you» y se dice «didja». No copies la forma de la calle al escribir: solo tienes que reconocerla al oírla.",
            },
            {
              id: "ena2m2l4e10", type: "hearreal", prompt: "Y con palabra qu- delante",
              book: "Where did you go?",
              real: "Where'd you go?",
              translation: "¿Adónde fuiste?",
              itemIds: ["ena2m2wheredidyougo"],
              tip: "El did se reduce hasta convertirse en una d pegada al where. Si en el examen solo pillas «…you go?», ya sabes que te preguntan por el pasado.",
            },
            {
              id: "ena2m2l4e11", type: "audiomc", prompt: "Cazar el dato — 2 escuchas",
              audio: "Where did you go on Saturday? — I went to the cinema with Ben. After that we had dinner in a Turkish place near the station.",
              question: "¿Qué hicieron después del cine?",
              options: ["Cenaron", "Fueron al parque", "Cogieron el tren"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El parque no sale en el audio", "La estación se nombra solo para situar el restaurante"],
              itemIds: ["ena2m2wheredidyougo", "ena2m2afterthat", "ena2m2wehadagoodtime"],
              tip: "«near the station» está ahí para despistarte: nombra un sitio que no es la respuesta. En el Listening del examen siempre hay uno de estos.",
            },
            {
              id: "ena2m2l4e12", type: "build", prompt: "Construye la pregunta",
              target: "How did you get home last night",
              translation: "¿Cómo volviste a casa anoche?",
              distractors: ["got", "gets"],
              itemIds: ["ena2m2howdidyougethome", "enlastnight", "enhome"],
            },
            {
              id: "ena2m2l4e13", type: "speak", prompt: "El interrogatorio completo, en voz alta",
              text: "Where did you go? What happened next? Did you have a good time?",
              phonetic: "uéa-dyu GÓU? uót JÁ-pend NEKST? DÍ-dyu jav a gud TÁIM",
              translation: "¿Adónde fuiste? ¿Y luego qué pasó? ¿Te lo pasaste bien?",
              itemIds: ["ena2m2wheredidyougo", "ena2m2whathappenednext", "ena2m2wehadagoodtime"],
              tip: "Estas tres preguntas sacan una historia entera de cualquiera. Apréndetelas como un bloque: te salvan la Parte 2 del oral.",
            },
            {
              id: "ena2m2l4e14", type: "type", prompt: "Cierre de producción",
              question: "—¿Adónde fuiste anoche? —Fui al cine. —¿Lo pasaste bien? —Sí.",
              answers: [
                "Where did you go last night? I went to the cinema. Did you have a good time? Yes, I did.",
                "Where did you go last night? I went to the cinema. Did you have a good time? Yes I did.",
              ],
              hints: ["Pregunta con did + verbo desnudo · respuesta con la forma rara · respuesta corta con el auxiliar", "Where d… you g… last night? I w… to the cinema. D… you have a good time? Yes, I d…"],
              itemIds: ["ena2m2wheredidyougo", "ena2m2iwenttothecinema", "ena2m2wehadagoodtime", "ena2m1yesidid"],
              tip: "En cuatro líneas has usado el sistema entero: did + base para preguntar, la forma irregular para contestar y el auxiliar solo para el «sí». Eso es el A2 del pasado.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Elige una conversación cualquiera y cuenta cuántos «did you» pillas fundidos en uno solo. No transcribas: solo cázalos. Cinco minutos." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: las vocales del pasado irregular
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l5",
      phaseId: "ena2m2",
      title: "Clínica de sonido: bought, said, read",
      subtitle: "Los irregulares tienen tres trampas de sonido, y solo tres",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas de la clínica",
          itemIds: ["ena2m2readred", "ena2m2ateeight", "ena2m2heard", "ena2m2paid", "ena2m2wore", "ena2m2boughtgroup", "ena2m2caughtgroup"],
        },
        {
          kind: "note",
          note: {
            title: "Tres trampas, y ninguna más",
            body: "El módulo pasado te dio la clínica más rentable del curso: la <b>-ed</b> y sus tres sonidos. Esa sigue en pie y se cobra cada día. Los irregulares traen otras tres, y conviene saber que <b>son solo tres</b>: no hay que aprender el sonido de cada verbo por separado.<br/><br/><b>1. La familia «-oot».</b> [[bought|compró]], [[thought|pensó]], [[caught|pilló]], [[taught|enseñó]], brought. Se escriben con -ought / -aught y todas suenan igual: una <b>o larga</b> y nada más. La gh <b>no suena</b>: no es «bou-gt» ni «cauj». Es <b>boot</b>, <b>zoot</b>, <b>koot</b>, <b>toot</b>, <b>broot</b>.<br/><br/><b>2. Las que se leen a la española y salen mal.</b> Son tres, y las tres son altísimas de frecuencia:<br/>· <b>said</b> → «sed». No «séid».<br/>· <b>read</b> (pasado) → «red». Se escribe igual que el presente y suena distinto.<br/>· <b>heard</b> → «jéed», una sola vocal larga. No «jíard».<br/><br/><b>3. Los homófonos.</b> <b>ate</b> (comí) y <b>eight</b> (ocho) suenan exactamente igual: «éit». No hay forma de distinguirlos al oído — <b>los distingue la frase</b>, no el sonido. <i>I ate at eight</i> es una frase perfectamente normal y suena «ái ÉIT at ÉIT».<br/><br/>Y algo que ya sabes hacer: <b>slept, kept, felt, left</b> acaban en el mismo grupo consonántico que trabajaste con worked y helped. Esa /t/ final ya la tienes entrenada — aprovéchala.",
            table: [
              ["se escribe", "suena", "el error típico"],
              ["bought / thought / caught", "boot · zoot · koot", "«bou-gat», «cauj»"],
              ["said", "sed", "«séid»"],
              ["read (pasado)", "red", "«riid»"],
              ["heard", "jéed", "«jíard»"],
              ["ate", "éit — igual que eight", "«áte»"],
              ["paid", "péid", "«páid»"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Por qué esta clínica importa más de lo que parece",
            body: "Podrías pensar que pronunciar mal <i>said</i> es un detalle. No lo es, por dos motivos muy concretos:<br/><br/>· <b>En el Listening no vas a reconocer lo que no sabes pronunciar.</b> Si tienes <i>said</i> guardado en la cabeza como «séid», cuando el audio diga «sed» tú no oirás la palabra: oirás un ruido. Es el mecanismo por el que se falla la comprensión sin fallar el vocabulario.<br/>· <b>read es el único verbo del inglés que cambia de tiempo sin cambiar de letras.</b> <i>I read the message</i> puede ser presente o pasado, y <b>solo la voz lo dice</b> (riid o red). Al escribir, ponle un marcador — <i>last night</i>, <i>yesterday</i> — o quien te lea no lo sabrá.<br/><br/>La regla general de la clínica: <b>el irregular hay que aprenderlo con su sonido pegado</b>, no solo con su ortografía. Cuando repases la lista, dila en voz alta. Una lista leída en silencio se aprende a medias.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l5e1", type: "bucket", prompt: "¿Suena con la «oo» larga o no?",
              categories: ["suena «-oot» (o larga)", "no"],
              items: [
                { text: "bought", bucket: 0 },
                { text: "thought", bucket: 0 },
                { text: "caught", bucket: 0 },
                { text: "took", bucket: 1 },
                { text: "taught", bucket: 0 },
                { text: "broke", bucket: 1 },
                { text: "spoke", bucket: 1 },
                { text: "put", bucket: 1 },
              ],
              itemIds: ["ena2m2boughtgroup", "ena2m2caughtgroup", "ena2m2wokegroup", "ena2m2putgroup"],
              tip: "Toda la familia -ought/-aught suena igual. Es la única vez que el inglés te da cinco verbos por el precio de un sonido.",
            },
            {
              id: "ena2m2l5e2", type: "mc", prompt: "La palabra más frecuente mal dicha del nivel",
              question: "said suena…",
              options: ["sed", "séid", "sa-íd"],
              answer: 0,
              whyWrong: [null, "Se escribe con -ai- pero no se dice así: rima con bed", "Dos sílabas, ninguna: said es de una sola"],
              itemIds: ["ena2m2shesaidsorry"],
              tip: "said rima con bed, red y head. Dilo diez veces así y no volverás a la versión española.",
            },
            {
              id: "ena2m2l5e3", type: "mc", prompt: "El verbo que cambia sin cambiar",
              question: "«I read the message last night» — ¿cómo suena read aquí?",
              options: ["red", "riid", "de las dos formas"],
              answer: 0,
              whyWrong: [null, "«riid» es el presente; aquí last night dice que es pasado", "Al oído solo hay una: el pasado es red y punto"],
              itemIds: ["ena2m2readred", "enlastnight", "enmessage"],
              tip: "Se escribe read y suena red. Es el único verbo del idioma donde la voz es la única marca de tiempo.",
            },
            {
              id: "ena2m2l5e4", type: "audiomc", prompt: "Dos palabras que suenan igual — 2 escuchas",
              audio: "I paid for the tickets and we ate at eight.",
              question: "¿A qué hora comieron?",
              options: ["A las ocho", "A las siete", "No lo dice"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Las siete no suena en ningún momento", "Sí lo dice: la segunda de las dos palabras iguales es la hora"],
              itemIds: ["ena2m2ateeight", "ena2m2paid"],
              tip: "«ate at eight» suena «éit at ÉIT». No hay forma de separarlas por el sonido: lo hace la posición en la frase, y eso es lo que entrenas aquí.",
            },
            {
              id: "ena2m2l5e5", type: "shadow", prompt: "Sombrea la familia «-oot» — primero lento, luego a velocidad normal",
              text: "I bought it, I thought about it and I brought it home.",
              phonetic: "ái BOOT it, ái ZOOT a-BÁUT it and ái BROOT it jóum",
              translation: "Lo compré, lo pensé y me lo traje a casa.",
              reps: 2,
              itemIds: ["ena2m2boughtgroup"],
              tip: "Tres «-oot» en una frase. Si te sale corrida, la familia entera está resuelta para siempre.",
            },
            {
              id: "ena2m2l5e6", type: "speak", prompt: "Los homófonos, en voz alta",
              text: "I ate at eight and I paid for everything.",
              phonetic: "ái ÉIT at ÉIT and ái PÉID foo ÉV-ri-zing",
              translation: "Comí a las ocho y lo pagué todo.",
              itemIds: ["ena2m2ateeight", "ena2m2paid"],
              tip: "Las dos primeras suenan idénticas y eso está bien. El inglés está lleno de pares así y nadie se pierde: lo resuelve la frase.",
            },
            {
              id: "ena2m2l5e7", type: "listen", prompt: "Dictado — dos vocales largas",
              text: "She paid and we left at eight.",
              translation: "Pagó y nos fuimos a las ocho.",
              hints: ["pay → p… · leave → l…", "She p… and we l… at eight."],
              itemIds: ["ena2m2paid", "ena2m2sleptgroup", "ena2m2ateeight"],
              tip: "left acaba en el mismo grupo /ft/ que ya trabajaste con la -ed de m1. La consonante final lleva gramática: si se te cae, se cae el pasado.",
            },
            {
              id: "ena2m2l5e8", type: "match", prompt: "Empareja cada palabra con cómo suena",
              pairs: [
                { target: "said", source: "sed" },
                { target: "read (pasado)", source: "red" },
                { target: "heard", source: "jéed" },
                { target: "ate", source: "éit" },
                { target: "paid", source: "péid" },
              ],
              itemIds: ["ena2m2shesaidsorry", "ena2m2readred", "ena2m2heard", "ena2m2ateeight", "ena2m2paid"],
              tip: "Las tres primeras son las que se leen a la española y salen mal. Las otras dos van de propina porque se escriben con -ai- y suenan «éi».",
            },
            {
              id: "ena2m2l5e9", type: "mc", prompt: "El par que no se puede separar",
              question: "ate y eight…",
              options: ["suenan exactamente igual: «éit»", "suenan parecido pero se distinguen", "son la misma palabra"],
              answer: 0,
              whyWrong: [null, "No hay ninguna diferencia de sonido: son homófonos perfectos", "Una es «comí» y la otra «ocho»: nada que ver"],
              itemIds: ["ena2m2ateeight"],
              tip: "En el examen, si oyes «éit» mira lo que hay alrededor: detrás de «at» es la hora; detrás de un sujeto es el verbo.",
            },
            {
              id: "ena2m2l5e10", type: "fastmatch", prompt: "Ráfaga de sonidos difíciles",
              pairs: [
                { target: "heard", source: "oí" },
                { target: "paid", source: "pagué" },
                { target: "wore", source: "llevaba puesto" },
                { target: "ate", source: "comí" },
                { target: "read", source: "leí" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m2heard", "ena2m2paid", "ena2m2wore", "ena2m2ateeight", "ena2m2readred"],
            },
            {
              id: "ena2m2l5e11", type: "bucket", prompt: "Espiral: ¿este pasado es de los de -ed o de los rebeldes?",
              categories: ["-ed (los del módulo 1)", "irregular (los de este)"],
              items: [
                { text: "worked", bucket: 0 },
                { text: "went", bucket: 1 },
                { text: "watched", bucket: 0 },
                { text: "bought", bucket: 1 },
                { text: "stayed", bucket: 0 },
                { text: "slept", bucket: 1 },
              ],
              itemIds: ["ena2m1iworked", "ena2m2iwenttothecinema", "ena2m1shewatchedafilm", "ena2m2boughtgroup", "ena2m1istayedathome", "ena2m2sleptgroup"],
              tip: "Cuidado con slept: acaba en -t y parece una -ed disfrazada, pero es irregular. La -ed se escribe -ed siempre, aunque suene /t/.",
            },
            {
              id: "ena2m2l5e12", type: "type", prompt: "Cierre de producción",
              question: "Comí a las ocho, pagué y me fui.",
              answers: [
                "I ate at eight, I paid and I left.",
                "I ate at eight, paid and left.",
                "I ate at eight, I paid and left.",
              ],
              hints: ["Tres irregulares: eat, pay, leave", "I a… at eight, I p… and I l…"],
              itemIds: ["ena2m2ateeight", "ena2m2paid", "ena2m2sleptgroup"],
              tip: "Escríbelo y dilo. Los irregulares que solo se leen se olvidan; los que se dicen en voz alta se quedan.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m2-3",
            book: "It cost a lot of money.",
            real: "It cost a fortune.",
            meaning: "Me costó un dineral / un riñón",
            when: "Con amigos, contando una compra o un viaje. Es exageración amable y se usa muchísimo. En el Writing del examen vale también, pero para un texto neutro la versión del libro (it was very expensive) va más segura.",
            register: "amigos",
            note: "Ojo al verbo: cost no cambia en pasado. «It cost a fortune» ya es pasado — lo dice el contexto, no el verbo.",
            sound: "it kost a FÓO-chun",
            level: "a2",
            itemId: "ena2m2putgroup",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — pronunciación", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca los vídeos de vocales largas y mira el de /ɔː/ (bought, thought, caught). Cinco minutos de boca valen por media hora de lista." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — la secuencia: las señales que convierten frases en relato
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l6",
      phaseId: "ena2m2",
      title: "First of all, then, after that",
      subtitle: "Una historia no es una lista de frases: lleva señales",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Las señales del relato",
          itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2finally", "ena2m2intheend", "ena2m2suddenly", "enthen", "enfirst"],
        },
        {
          kind: "note",
          note: {
            title: "Con las mismas frases, dos textos distintos",
            body: "Mira estas dos versiones del mismo día. La gramática es idéntica; lo único que cambia son cinco palabras.<br/><br/><i>«I woke up late. I missed the bus. I walked to work. I arrived at ten.»</i><br/><br/><b>«First of all, I woke up late. Then I missed the bus. After that, I walked to work. In the end, I arrived at ten.»</b><br/><br/>La primera es una lista; la segunda es una historia. Y esa diferencia <b>puntúa</b>: el criterio de <i>Organisation</i> del examen mira exactamente esto — si el texto avanza o si son frases sueltas pegadas.<br/><br/>Las señales que necesitas son cinco, y no hacen falta más:<br/><br/>· <b>[[First of all,|Lo primero de todo,]]</b> — abre. Ojo: <i>first</i> a secas también vale, pero <i>first of all</i> suena a relato y no a lista de la compra.<br/>· <b>Then</b> — el eslabón normal, el que más se usa. Ya lo traes del A1.<br/>· <b>[[After that,|Después de eso,]]</b> — igual que then, pero con más aire. Alterna los dos para no repetir.<br/>· <b>[[Suddenly,|De repente,]]</b> — el giro. Es la palabra que anuncia que algo se tuerce.<br/>· <b>[[In the end,|Al final,]]</b> / <b>[[finally|por fin]]</b> — cierra.<br/><br/><b>Dónde van y qué coma llevan:</b> casi siempre al principio de la frase y con coma detrás. <i>Then</i> es el único que se usa mucho sin coma. Y ninguno cambia nada del verbo — no son como el <i>because</i> de la lección siguiente: solo se ponen delante y ya.",
            table: [
              ["señal", "para qué", "ejemplo"],
              ["First of all,", "abrir", "First of all, I woke up late."],
              ["Then", "seguir", "Then I missed the bus."],
              ["After that,", "seguir (variando)", "After that, I walked to work."],
              ["Suddenly,", "el giro", "Suddenly, my phone rang."],
              ["In the end, / finally", "cerrar", "In the end, I arrived at ten."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "finally y «in the end» no son lo mismo, y hay un calco de por medio",
            body: "Los dos se traducen por «al final» y el español no los distingue, así que hay que separarlos a mano:<br/><br/>· <b>finally</b> = <b>por fin</b>, después de mucho esperar. Lleva alivio dentro. <i>The bus finally came.</i> (por fin llegó)<br/>· <b>in the end</b> = <b>al final resultó que…</b> Es el resultado de la historia, sin alivio ninguno. <i>In the end, I walked.</i> (al final acabé andando)<br/><br/>Y el calco que hay que matar hoy: «al final» <b>NO</b> es <i>at the final</i>. <i>The final</i> en inglés es la final de un campeonato, un partido. Si escribes <i>at the final I went home</i>, has dicho «en la final me fui a casa».<br/><br/>Dos más que el español confunde y aquí no cuestan nada: <b>at the end</b> (con <i>at</i>) es el final <b>de algo concreto</b> — <i>at the end of the film</i>, <i>at the end of the street</i>. Y <b>at last</b> es sinónimo de <i>finally</i>, con el mismo alivio dentro.",
            table: [
              ["quieres decir", "en inglés", "no digas"],
              ["por fin (después de esperar)", "finally / at last", "at the final"],
              ["al final resultó que…", "in the end", "at the end"],
              ["al final de la película", "at the end of the film", "in the end of the film"],
              ["la final del campeonato", "the final", "—"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l6e1", type: "order", prompt: "Ordena la mañana de Valeria",
              sentences: [
                "First of all, I woke up late.",
                "Then I missed the bus.",
                "After that, I walked to work in the rain.",
                "In the end, I arrived at ten.",
              ],
              translation: "Lo primero, me desperté tarde. Luego perdí el autobús. Después de eso, fui andando al trabajo bajo la lluvia. Al final llegué a las diez.",
              itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2intheend", "ena2m1missedthebus"],
              tip: "Fíjate en que las señales solas ya te dan el orden, sin leer el resto. Eso es exactamente lo que hacen por quien te lee a ti.",
            },
            {
              id: "ena2m2l6e2", type: "match", prompt: "Empareja las señales",
              pairs: [
                { target: "First of all,", source: "Lo primero de todo," },
                { target: "after that", source: "después de eso" },
                { target: "suddenly", source: "de repente" },
                { target: "in the end", source: "al final resultó que…" },
                { target: "finally", source: "por fin, después de esperar" },
              ],
              itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2suddenly", "ena2m2intheend", "ena2m2finally"],
            },
            {
              id: "ena2m2l6e3", type: "cloze", prompt: "Completa la apertura",
              text: "___ of all, I got up at six.",
              answers: ["First"],
              translation: "Lo primero de todo, me levanté a las seis.",
              hints: ["El ordinal que ya traes del A1, con «of all» detrás", "F…"],
              itemIds: ["ena2m2firstofall", "enfirst"],
            },
            {
              id: "ena2m2l6e4", type: "gapbank", prompt: "La mañana entera — elige del banco",
              text: "___ of all, I woke up late. After ___, I missed the bus and I ___ to work in the rain. In the ___, I arrived at ten.",
              answers: ["First", "that", "walked", "end"],
              bank: ["First", "that", "walked", "end", "Then", "Finally", "took"],
              translation: "Lo primero de todo, me desperté tarde. Después de eso, perdí el autobús y fui andando al trabajo bajo la lluvia. Al final llegué a las diez.",
              itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2intheend", "ena2m1theywalkedtothepark"],
              tip: "Tres huecos son de conector y uno es de verbo. Es a propósito: en el examen los huecos no vienen etiquetados y hay que mirar qué pide la frase.",
            },
            {
              id: "ena2m2l6e5", type: "mc", prompt: "El calco de «al final»",
              question: "«Al final llegué a las diez»",
              options: ["In the end I arrived at ten.", "At the final I arrived at ten.", "To the end I arrived at ten."],
              answer: 0,
              whyWrong: [null, "«the final» en inglés es la final de un campeonato: has dicho «en la final llegué a las diez»", "«to the end» es «hasta el final», que es otra cosa"],
              itemIds: ["ena2m2intheend", "ena2m1arrived"],
              tip: "Al final (de la historia) = in the end. Al final de algo concreto = at the end of… Por fin = finally. Tres cosas distintas donde el español dice una.",
            },
            {
              id: "ena2m2l6e6", type: "errorfix", prompt: "Corrige el calco",
              wrong: "At the final, I went home.",
              answers: ["In the end, I went home."],
              why: "«al final» de una historia es in the end. «At the final» sería «en la final» — la del campeonato. Y «at the end» necesita un complemento detrás: at the end OF the film.",
              translation: "Al final me fui a casa.",
              itemIds: ["ena2m2intheend", "ena2m2iwenttothecinema"],
            },
            {
              id: "ena2m2l6e7", type: "build", prompt: "Construye el eslabón del medio",
              target: "After that I went home and I made dinner",
              translation: "Después de eso me fui a casa e hice la cena",
              distractors: ["then", "finally"],
              itemIds: ["ena2m2afterthat", "ena2m2iwenttothecinema", "ena2m2imadeamistake"],
              tip: "Las dos fichas que sobran también valdrían… pero no a la vez que «After that». Una señal por eslabón: dos seguidas suenan a texto mal cosido.",
            },
            {
              id: "ena2m2l6e8", type: "order", prompt: "Y ahora una historia con giro",
              sentences: [
                "First of all, we had dinner at Amy's flat.",
                "Then we watched a film.",
                "Suddenly, the lights went off.",
                "After that, we sat in the kitchen with candles.",
                "In the end, we had a great evening.",
              ],
              translation: "Lo primero, cenamos en casa de Amy. Luego vimos una película. De repente se fue la luz. Después de eso nos sentamos en la cocina con velas. Al final pasamos una noche estupenda.",
              itemIds: ["ena2m2suddenly", "ena2m2firstofall", "ena2m2intheend", "enwatchafilm", "enkitchen"],
              tip: "«Suddenly» va justo antes del problema. Es la señal que le dice a quien te escucha: atención, aquí se tuerce.",
            },
            {
              id: "ena2m2l6e9", type: "listen", prompt: "Dictado — dos señales",
              text: "First of all, I made a coffee. Then I read my messages.",
              translation: "Lo primero de todo, me hice un café. Luego leí los mensajes.",
              hints: ["make → m… · read se escribe igual y suena «red»", "First of all, I m… a coffee. Then I r… my messages."],
              itemIds: ["ena2m2firstofall", "ena2m2imadeamistake", "ena2m2readred", "encoffee", "enmessage"],
              tip: "read en el dictado es la prueba de fuego: has oído «red» y hay que escribir read. Lo que suena no te dice cómo se escribe.",
            },
            {
              id: "ena2m2l6e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Lo primero de todo, perdí las llaves. Después de eso, perdí el autobús.",
              answers: [
                "First of all, I lost my keys. After that, I missed the bus.",
                "First of all I lost my keys. After that I missed the bus.",
              ],
              hint: "los dos «perder» del español no son el mismo verbo en inglés",
              itemIds: ["ena2m2firstofall", "ena2m2afterthat", "ena2m2mykeys", "ena2m1missedthebus"],
              tip: "Objetos: lose. Transportes y citas: miss. El español los llama igual y el inglés no: es de las repartos que más se fallan en el nivel.",
            },
            {
              id: "ena2m2l6e11", type: "speak", prompt: "Tres eslabones seguidos, en voz alta",
              text: "First of all I woke up late. Then I missed the bus. Finally, I walked to work.",
              phonetic: "féest ov OOL ái uóuk ap LÉIT. den ái MIST de bas. FÁI-na-li, ái UÓOKT tu uéek",
              translation: "Lo primero, me desperté tarde. Luego perdí el autobús. Al final fui andando al trabajo.",
              itemIds: ["ena2m2firstofall", "ena2m2finally", "ena2m2wokegroup", "ena2m1missedthebus"],
              tip: "Marca una pequeña pausa después de cada señal. Esa pausa es la coma, y es lo que hace que se te siga sin esfuerzo.",
            },
            {
              id: "ena2m2l6e12", type: "type", prompt: "Cierre de producción",
              question: "Lo primero de todo, me desperté tarde. Luego perdí el autobús y al final llegué a las diez.",
              answers: [
                "First of all, I woke up late. Then I missed the bus and in the end I arrived at ten.",
                "First of all I woke up late. Then I missed the bus and in the end I arrived at ten.",
                "First of all, I woke up late. Then I missed the bus and in the end, I arrived at ten.",
              ],
              hints: ["Tres señales: apertura, eslabón y cierre", "First of all, I w… up late. Then I m… the bus and in the e… I arrived at ten."],
              itemIds: ["ena2m2firstofall", "ena2m2intheend", "ena2m2wokegroup", "ena2m1missedthebus", "ena2m1arrived"],
              tip: "Tres frases y tres señales: eso ya es un texto organizado. En el Writing del examen, esto solo vale una banda entera del criterio de organización.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 writing", url: "https://learnenglish.britishcouncil.org/skills/writing/a2-writing", note: "Abre cualquier modelo y subraya las señales de secuencia. Verás que un texto de 40 palabras lleva dos o tres y ni una más: no es cuestión de meter muchas." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — because / so: una historia sin causa no es una historia
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l7",
      phaseId: "ena2m2",
      title: "Because I missed the bus",
      subtitle: "La causa y la consecuencia — y el descriptor que pide opiniones con razones",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Dar la razón",
          itemIds: [
            "ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2thatswhy",
            "ena2m2luckily", "ena2m2unfortunately", "ena2m2whatashame", "enbut",
          ],
        },
        {
          kind: "note",
          note: {
            title: "Dos palabras, y la historia se sostiene sola",
            body: "Hasta ahora podías contar <b>qué</b> pasó y <b>en qué orden</b>. Falta lo que convierte una secuencia en una historia: el <b>porqué</b>.<br/><br/>Y hay una razón práctica además de la narrativa: el descriptor del A2 no dice «expresa opiniones». Dice <b>«expresa opiniones y da razones»</b>. En el oral y en el escrito del examen, un «It was great» suelto vale menos que un «It was great <b>because</b> there were a lot of people».<br/><br/>Los dos conectores son estos, y son espejo el uno del otro:<br/><br/>· <b>because</b> = <b>porque</b>. Detrás va la <b>causa</b>. <i>I was late <b>because</b> I missed the bus.</i><br/>· <b>so</b> = <b>así que</b>. Detrás va la <b>consecuencia</b>. <i>I missed the bus, <b>so</b> I walked.</i><br/><br/>Es la misma información contada en los dos sentidos. Elige la que te salga: no hay una mejor.<br/><br/><b>La trampa nº 1: «because of».</b> En español dices «a causa de que» y de ahí sale <i>[[because of I missed the bus|❌]]</i>. En inglés <b>because</b> va con una frase entera (sujeto + verbo) y <b>because of</b> va con un sustantivo suelto: <i>because of the rain</i>, <i>because of the bus</i>. Si detrás hay un verbo, <b>of</b> sobra siempre.<br/><br/><b>La trampa nº 2: dónde va so.</b> <i>so</i> abre la <b>segunda</b> mitad, la de la consecuencia, y lleva coma delante. Nunca abre la frase.<br/><br/>Y un tercero de regalo, que suena muy natural: <b>[[That's why…|Por eso…]]</b> — abre una frase nueva con la consecuencia. <i>I missed the bus. <b>That's why</b> I was late.</i> El calco a evitar es <i>for that</i>, que no significa nada.",
            table: [
              ["quieres decir", "en inglés ✔", "el calco ❌"],
              ["Llegué tarde porque perdí el autobús.", "I was late because I missed the bus.", "…because of I missed the bus."],
              ["por culpa de la lluvia", "because of the rain", "because the rain"],
              ["Perdí el autobús, así que fui andando.", "I missed the bus, so I walked.", "So I missed the bus, I walked."],
              ["Por eso llegué tarde.", "That's why I was late.", "For that I was late."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y las tres palabras que ponen el sentimiento",
            body: "Contar un contratiempo sin decir cómo te sentó es contarlo a medias. Con tres palabras basta, y las tres van al principio de la frase con coma:<br/><br/>· <b>[[Luckily,|Por suerte,]]</b> — lo que salvó la situación. <i>Luckily, Amy had a key.</i><br/>· <b>[[Unfortunately,|Por desgracia,]]</b> — lo que la empeoró. <i>Unfortunately, the shop was closed.</i><br/>· <b>[[What a shame!|¡Qué pena!]]</b> — la reacción, sola, como frase entera. Es lo que le dices a otro cuando te cuenta algo malo.<br/><br/>Ojo a <i>What a shame!</i>: lleva <b>a</b> obligatoriamente. <i>What shame!</i> no es inglés, y <i>shame</i> a secas significa «vergüenza», que es otra cosa. Lo mismo pasa con <i>What a pity!</i>, que quiere decir exactamente igual.<br/><br/>Y una nota de uso que vale para el oral entero: cuando alguien te cuenta un desastre, <b>en inglés se reacciona</b>. Un silencio educado se lee como desinterés. <i>Oh no! · What a shame! · That's terrible!</i> — media palabra, pero se espera.",
            table: [
              ["situación", "qué dices"],
              ["Amy tenía llave y me salvó", "Luckily, Amy had a key."],
              ["encima la tienda estaba cerrada", "Unfortunately, the shop was closed."],
              ["te lo cuentan a ti", "Oh no! What a shame!"],
              ["y resumes", "It was terrible."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l7e1", type: "mc", prompt: "«Llegué tarde porque perdí el autobús»",
              question: "¿Cuál es la buena?",
              options: [
                "I was late because I missed the bus.",
                "I was late because of I missed the bus.",
                "I was late for I missed the bus.",
              ],
              answer: 0,
              whyWrong: [null, "because of solo va con un sustantivo (because of the bus): si detrás hay verbo, of sobra", "«for» no introduce causas en inglés moderno"],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m1missedthebus"],
              tip: "Regla mecánica: ¿detrás hay un verbo? because. ¿Detrás hay solo un sustantivo? because of. No falla nunca.",
            },
            {
              id: "ena2m2l7e2", type: "bucket", prompt: "¿Cómo se dice esto en inglés: con because o con so?",
              categories: ["because (detrás va la causa)", "so (detrás va la consecuencia)"],
              items: [
                { text: "porque", bucket: 0 },
                { text: "así que", bucket: 1 },
                { text: "por eso", bucket: 1 },
                { text: "es que", bucket: 0 },
                { text: "ya que", bucket: 0 },
                { text: "de modo que", bucket: 1 },
              ],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2thatswhy"],
              tip: "Clasifica por lo que viene DETRÁS, no por la palabra española. Si detrás va el motivo, because. Si va el resultado, so.",
            },
            {
              id: "ena2m2l7e3", type: "cloze", prompt: "Completa con la causa",
              text: "I was tired ___ I didn't sleep very well.",
              answers: ["because"],
              translation: "Estaba cansada porque no dormí muy bien.",
              hints: ["Detrás viene el motivo", "b…"],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2ididntsleep", "ena2m1tired"],
            },
            {
              id: "ena2m2l7e4", type: "cloze", prompt: "Y ahora la misma idea del revés",
              text: "I didn't sleep very well, ___ I was tired all day.",
              answers: ["so"],
              translation: "No dormí muy bien, así que estuve cansada todo el día.",
              hints: ["Detrás viene el resultado", "s…"],
              itemIds: ["ena2m2soiwalked", "ena2m2ididntsleep", "ena2m1tired"],
              tip: "Misma información, dos montajes. Cuando escribas, alterna: dos because seguidos cansan a quien lee.",
            },
            {
              id: "ena2m2l7e5", type: "gapbank", prompt: "La mañana con su porqué — elige del banco",
              text: "I woke up late, ___ I missed the bus. I walked to work ___ there wasn't another bus. In the ___, I arrived at ten.",
              answers: ["so", "because", "end"],
              bank: ["so", "because", "end", "but", "after", "luckily"],
              translation: "Me desperté tarde, así que perdí el autobús. Fui andando al trabajo porque no había otro autobús. Al final llegué a las diez.",
              itemIds: ["ena2m2soiwalked", "ena2m2becauseimissedthebus", "ena2m2intheend", "ena2m1missedthebus"],
              tip: "Los dos primeros huecos son el mismo mecanismo mirado al derecho y al revés: detrás del primero va lo que pasó después; detrás del segundo, el motivo.",
            },
            {
              id: "ena2m2l7e6", type: "transform", prompt: "Une las dos frases con so",
              source: "I missed the bus. I was late.",
              instruction: "Únelas con so",
              answers: ["I missed the bus, so I was late.", "I missed the bus so I was late."],
              translation: "Perdí el autobús, así que llegué tarde.",
              hints: ["so abre la segunda mitad, con coma delante", "I missed the bus, s… I was late."],
              itemIds: ["ena2m2soiwalked", "ena2m1missedthebus", "enimlate"],
            },
            {
              id: "ena2m2l7e7", type: "transform", prompt: "Y estas otras con because",
              source: "I was tired. I didn't go out.",
              instruction: "Únelas con because, empezando por lo que hiciste",
              answers: ["I didn't go out because I was tired."],
              translation: "No salí porque estaba cansada.",
              hints: ["Primero el hecho, después el motivo", "I didn't go out b… I was tired."],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2ididntgoout", "ena2m1tired"],
              tip: "Fíjate en que has tenido que darle la vuelta al orden. Con because, la mitad que va delante es la que cuenta el hecho.",
            },
            {
              id: "ena2m2l7e8", type: "errorfix", prompt: "Corrige el «of» que sobra",
              wrong: "I was late because of I missed the bus.",
              answers: ["I was late because I missed the bus."],
              why: "because of va con un sustantivo (because of the rain, because of the traffic). Cuando detrás hay una frase entera con sujeto y verbo, el conector es because a secas. El «of» viene del «a causa DE QUE» español.",
              translation: "Llegué tarde porque perdí el autobús.",
              itemIds: ["ena2m2becauseimissedthebus"],
            },
            {
              id: "ena2m2l7e9", type: "errorfix", prompt: "Corrige el «por eso»",
              wrong: "For that I was late.",
              answers: ["That's why I was late."],
              why: "«Por eso» no se traduce palabra a palabra: «for that» no significa nada en inglés. Las dos formas buenas son That's why… al empezar una frase nueva, o …, so… uniendo las dos mitades.",
              translation: "Por eso llegué tarde.",
              itemIds: ["ena2m2thatswhy", "enimlate"],
            },
            {
              id: "ena2m2l7e10", type: "paraphrase", prompt: "Dilo de otra manera — sin la palabra prohibida",
              source: "I was late because I missed the bus.",
              forbid: ["because"],
              answers: ["I missed the bus, so I was late.", "I missed the bus. That's why I was late."],
              translation: "Llegué tarde porque perdí el autobús.",
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2thatswhy"],
              tip: "Poder decir lo mismo por dos caminos es lo que te salva en el oral cuando la primera opción no sale. Aquí solo hay que darle la vuelta a las mitades.",
            },
            {
              id: "ena2m2l7e11", type: "mc", prompt: "La reacción que el inglés espera",
              question: "Amy te cuenta que ha perdido la cartera. ¿Qué le dices?",
              options: ["Oh no! What a shame!", "Oh no! What shame!", "Oh no! What a pity of you!"],
              answer: 0,
              whyWrong: [null, "Falta el artículo: What A shame. Sin él, «shame» significa «vergüenza»", "«What a pity!» sí existe, pero sin «of you»"],
              itemIds: ["ena2m2whatashame", "ena2m2mywallet"],
              tip: "En inglés no reaccionar se lee como no importarte. Media palabra basta, pero hay que decirla.",
            },
            {
              id: "ena2m2l7e12", type: "audiomc", prompt: "Cazar el motivo — 2 escuchas",
              audio: "Why were you late? — I was late because I lost my keys. I went back home and then I missed the train.",
              question: "¿Por qué llegó tarde?",
              options: ["Perdió las llaves", "Se durmió", "Perdió la cartera"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Dormirse no se menciona", "La cartera no sale: fueron las llaves"],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2mykeys", "enimlate"],
              tip: "En el Listening, la palabra because es una señal luminosa: lo que viene justo detrás suele ser la respuesta.",
            },
            {
              id: "ena2m2l7e13", type: "speak", prompt: "La cadena entera, en voz alta",
              text: "I was late because I missed the bus, so I walked. Luckily, my boss said nothing.",
              phonetic: "ái uos̬ LÉIT bi-KOS̬ ái mist de bas, sóu ái UÓOKT. LA-ki-li, mái bos SED NA-zing",
              translation: "Llegué tarde porque perdí el autobús, así que fui andando. Por suerte, mi jefe no dijo nada.",
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2luckily", "ena2m2shesaidsorry"],
              tip: "because suena «bi-KOS̬», con la s final sonora y sin la «e» de apoyo delante. Ni «bicós» ni «becaus».",
            },
            {
              id: "ena2m2l7e14", type: "type", prompt: "Cierre de producción",
              question: "No salí porque estaba cansada. Por suerte, no me perdí nada.",
              answers: [
                "I didn't go out because I was tired. Luckily, I didn't miss anything.",
                "I didn't go out because I was tired. Luckily I didn't miss anything.",
              ],
              hints: ["Negativa + because + la valoración con Luckily", "I d…'t go out b… I was tired. L…, I didn't miss anything."],
              itemIds: ["ena2m2ididntgoout", "ena2m2becauseimissedthebus", "ena2m2luckily", "ena2m1tired"],
              tip: "Ahí tienes el descriptor del A2 cumplido: un hecho, su razón y una valoración. Tres piezas, y con eso se sube de banda.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m2-4",
            book: "It was very bad luck.",
            real: "Just my luck!",
            meaning: "¡Lo que me faltaba! / ¡Qué mala suerte la mía!",
            when: "Con amigos y compañeros, justo después de contar el contratiempo. Se dice con resignación y media sonrisa, nunca en serio. En un email de examen, mejor «Unfortunately…» o «It was very bad luck».",
            register: "amigos",
            note: "Es irónica: dice «mi suerte de siempre» y significa lo contrario. Nadie la usa cuando algo sale bien.",
            sound: "chast mái LAK",
            level: "a2",
            itemId: "ena2m2unfortunately",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Escucha un vídeo cualquiera y cuenta los because. Vas a ver que aparecen cada dos o tres frases: dar razones no es un adorno del nivel, es el nivel." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — la historia entera: el día que Valeria perdió la cartera
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l8",
      phaseId: "ena2m2",
      title: "The day I lost my wallet",
      subtitle: "Una anécdota completa — y todas las piezas del módulo trabajando juntas",
      minutes: 16,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas del contratiempo",
          itemIds: ["ena2m2mywallet", "ena2m2mykeys", "ena2m2ifelloverinthestreet", "ena2m2iforgotmykeys", "ena2m1missedthebus", "ena2m1whathappened"],
        },
        {
          kind: "note",
          note: {
            title: "El martes de Valeria",
            body: "<i>Léelo en voz alta. Casi todo es tuyo: lo nuevo va glosado.</i><br/><br/>1. Last Tuesday Valeria woke up late. She didn't hear her alarm.<br/>2. She didn't have time for breakfast, so she ran to the bus stop.<br/>3. The bus came at eight and she got on. — <i>[[got on|se subió]]</i><br/>4. At the office she opened her bag: her wallet wasn't there.<br/>5. «I lost my wallet!» she thought. «It cost me forty pounds last year!»<br/>6. First of all, she phoned Sam at the café. «Did you find a wallet?» — «No, sorry.»<br/>7. After that, she phoned Amy. Amy didn't answer.<br/>8. Suddenly, at four o'clock, Amy sent her a message: «I found it.»<br/>9. At six Valeria came home. Amy was in the kitchen with the wallet in her hand.<br/>10. «Where did you find it?» — «In the fridge. You put it there with the milk this morning.»<br/>11. Valeria didn't say anything. In the end, she made dinner and they had a good laugh.<br/><br/><i>Apoyo: got on = subirse a un autobús o a un tren · she didn't hear / she didn't have / she didn't answer — detrás de didn't, el verbo desnudo, también aquí · sent es el pasado de send.</i>",
            table: [
              ["quién", "qué hizo"],
              ["Valeria", "se despertó tarde, corrió al autobús y perdió la cartera"],
              ["Sam", "no encontró nada en el café"],
              ["Amy", "encontró la cartera en la nevera"],
              ["la cartera", "estuvo todo el día en casa, con la leche"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l8e1", type: "order", prompt: "Ordena el martes de Valeria",
              sentences: [
                "Valeria woke up late and she didn't have time for breakfast.",
                "She ran to the bus stop and she got on the bus at eight.",
                "At the office she opened her bag: her wallet wasn't there.",
                "She phoned Sam and after that she phoned Amy.",
                "In the end, Amy found the wallet in the fridge.",
              ],
              translation: "Valeria se despertó tarde y no le dio tiempo a desayunar. Corrió a la parada y se subió al autobús a las ocho. En la oficina abrió el bolso: la cartera no estaba. Llamó a Sam y después llamó a Amy. Al final, Amy encontró la cartera en la nevera.",
              itemIds: ["ena2m2mywallet", "ena2m2wokegroup", "ena2m2afterthat", "ena2m2intheend", "enbusstop"],
              tip: "El orden lo dan las señales y las horas. Cuando escribas tu propia anécdota, deja esas dos pistas sembradas: es lo que hace que se te siga sin esfuerzo.",
            },
            {
              id: "ena2m2l8e2", type: "mc", prompt: "Comprensión — el dato",
              question: "¿Dónde estaba la cartera?",
              options: ["En la nevera", "En el café de Sam", "En el autobús"],
              answer: 0,
              whyWrong: [null, "Sam miró y no encontró nada", "En el autobús no llegó a buscarla"],
              itemIds: ["ena2m2mywallet", "enfridge"],
            },
            {
              id: "ena2m2l8e3", type: "mc", prompt: "Comprensión — hay que atar cabos",
              question: "¿Por qué acabó la cartera en la nevera?",
              options: [
                "Valeria la dejó allí al guardar la leche por la mañana",
                "Amy la escondió para gastarle una broma",
                "Se cayó dentro cuando Valeria corría"],
              answer: 0,
              whyWrong: [null, "Amy la encontró, no la escondió: por eso mandó el mensaje", "Valeria corrió a la parada, no por la cocina"],
              itemIds: ["ena2m2mywallet", "enmilk", "enfridge"],
              tip: "La respuesta no está escrita con esas palabras: «You put it there with the milk» te obliga a reconstruirlo. Eso es exactamente lo que pide el Reading del examen.",
            },
            {
              id: "ena2m2l8e4", type: "cloze", prompt: "Completa con el pasado del verbo",
              text: "Valeria ___ (run) to the bus stop.",
              answers: ["ran"],
              translation: "Valeria corrió a la parada del autobús.",
              hints: ["Familia de la A abierta: la vocal se abre", "run → r…"],
              itemIds: ["ena2m2sanggroup", "enbusstop"],
            },
            {
              id: "ena2m2l8e5", type: "bucket", prompt: "¿Pasó antes o después de llegar a la oficina?",
              categories: ["antes de llegar a la oficina", "después"],
              items: [
                { text: "She woke up late", bucket: 0 },
                { text: "She phoned Sam", bucket: 1 },
                { text: "She ran to the bus stop", bucket: 0 },
                { text: "Amy sent her a message", bucket: 1 },
                { text: "She got on the bus", bucket: 0 },
                { text: "She came home at six", bucket: 1 },
              ],
              itemIds: ["ena2m2wokegroup", "ena2m1phoned", "ena2m2icamehomelate", "ena2m2shegotamessage"],
            },
            {
              id: "ena2m2l8e6", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "She didn't have time for breakfast, so she ran to the bus stop.",
              answers: [
                "No le dio tiempo a desayunar, así que corrió a la parada del autobús.",
                "No tuvo tiempo de desayunar, así que corrió a la parada del autobús.",
              ],
              itemIds: ["ena2m2wedidnthavetime", "ena2m2soiwalked", "ena2m2sanggroup"],
              tip: "Mira la primera mitad: didn't have, no didn't had. Y aun así en español sale «no TUVO». Cada idioma pone la marca donde quiere.",
            },
            {
              id: "ena2m2l8e7", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Me dejé las llaves y me caí en la calle. ¡Qué desastre!",
              answers: [
                "I forgot my keys and I fell over in the street. What a disaster!",
                "I forgot my keys and I fell over in the street. It was a disaster!",
              ],
              hint: "los dos verbos son irregulares y ninguno lleva -ed",
              itemIds: ["ena2m2iforgotmykeys", "ena2m2ifelloverinthestreet", "ena2m2mykeys"],
            },
            {
              id: "ena2m2l8e8", type: "errorfix", prompt: "Corrige la -ed inventada",
              wrong: "I falled over in the street.",
              answers: ["I fell over in the street."],
              why: "fall es irregular: fell. Y ojo al reflexivo del español — «me caí» lleva el «me» y el inglés no: I fell, sin pronombre. Lo mismo con «me equivoqué» (I made a mistake) o «me fui» (I left).",
              translation: "Me caí en la calle.",
              itemIds: ["ena2m2ifelloverinthestreet"],
              tip: "Los «me/te/se» del español no viajan al inglés. Cuando traduzcas un verbo reflexivo, quítalos y mira si la frase sigue en pie: casi siempre sí.",
            },
            {
              id: "ena2m2l8e9", type: "gapbank", prompt: "Cuéntalo tú — elige del banco",
              text: "Last Tuesday I ___ up late and I ___ my wallet. First of all I phoned Sam, but he didn't ___ it. In the end Amy ___ it in the fridge.",
              answers: ["woke", "lost", "find", "found"],
              bank: ["woke", "lost", "find", "found", "broke", "missed", "gave"],
              translation: "El martes pasado me desperté tarde y perdí la cartera. Lo primero, llamé a Sam, pero no la encontró. Al final Amy la encontró en la nevera.",
              itemIds: ["ena2m2wokegroup", "ena2m2ilostmyphone", "ena2m2ifounditinmybag", "ena2m2mywallet"],
              tip: "Los huecos tres y cuatro son el mismo verbo en dos sitios distintos: detrás de didn't va desnudo (find) y en afirmativa va con su forma rara (found). Es el módulo entero en dos huecos.",
            },
            {
              id: "ena2m2l8e10", type: "audiomc", prompt: "Otra anécdota — 2 escuchas",
              audio: "I had a terrible morning. I forgot my keys, so I went back home. Then I missed the train and I arrived at eleven. Luckily, nobody said anything.",
              question: "¿Por qué volvió a casa?",
              options: ["Se dejó las llaves", "Perdió el tren", "Se cayó en la calle"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El tren lo perdió después, ya de camino", "La caída no aparece en el audio"],
              itemIds: ["ena2m2iforgotmykeys", "ena2m2soiwalked", "ena2m1terrible"],
              tip: "Cuando un audio trae tres sucesos seguidos, la pregunta suele ir por la CAUSA, no por el último. Apunta los tres en el orden en que suenan.",
            },
            {
              id: "ena2m2l8e11", type: "speak", prompt: "Cuenta el final de la historia en voz alta",
              text: "In the end, Amy found the wallet in the fridge. What a shame!",
              phonetic: "in di END, ÉI-mi fáund de UÓ-lit in de fridch. uót a SHÉIM",
              translation: "Al final, Amy encontró la cartera en la nevera. ¡Qué desastre!",
              itemIds: ["ena2m2intheend", "ena2m2mywallet", "ena2m2whatashame", "enfridge"],
              tip: "Fíjate en el ritmo: la señal (in the end) lleva pausa detrás y la reacción va al final, sola. Así se cuenta un remate.",
            },
            {
              // LECTURA LARGA (Reading Part 4). El A2 Access estrena el texto
              // continuo con siete preguntas, y hasta ahora el nivel entero lo
              // veía por primera vez en ena2m12: aquí entra la primera, con la
              // lengua exacta del módulo (pasado irregular, did/didn't,
              // because/so y los marcadores de secuencia) y ni una estructura
              // por delante. Narrativo, que es el género que le toca a m2.
              id: "ena2m2l8e13", type: "read", prompt: "Lectura larga, como la Parte 4 del Reading: lee el texto entero y responde. Toca las palabras subrayadas si necesitas la glosa.",
              title: "Ben's worst morning",
              text: "Last winter Ben started work at half past five. It was dark, it was cold, and the bus was already ten minutes late when he left the [[depot|las cocheras]].<br/><br/>At the second stop a woman got on with three big bags and a small dog. She paid, she sat down, and two minutes later the dog ran to the front of the bus. Ben stopped. The woman said sorry, took the dog and sat down again. The passengers laughed, because the dog was very small and everybody was still half asleep.<br/><br/>Then things got worse. A car broke down in front of the bus, so Ben waited. And waited. After twenty minutes a police officer arrived and sent all the traffic down a narrow street. Ben knew that street. The bus did not fit under the bridge.<br/><br/>He got out and he told the officer. The officer looked at the bus, looked at the bridge and said nothing for a long time. Then he moved the cars again and let the bus go the normal way.<br/><br/>Ben arrived at the last stop fifty minutes late. His manager did not ask about the traffic or about the bridge. He only asked one question: 'And the dog?'",
              source: "relato del curso",
              questions: [
                {
                  id: "ena2m2l8e13q1",
                  q: "Why did Ben stop the bus the first time?",
                  options: [
                    "Because a dog ran to the front of the bus",
                    "Because a woman got on with three big bags",
                    "Because a car broke down in front of him",
                  ],
                  answer: 0,
                  why: "«the dog ran to the front of the bus. Ben stopped». El coche averiado llega mucho después, y las bolsas no le hacen parar.",
                },
                {
                  id: "ena2m2l8e13q2",
                  q: "Why did Ben get out and talk to the police officer?",
                  options: [
                    "Because his bus was too tall for the bridge in that street",
                    "Because he wanted the officer to move the broken car",
                    "Because he was angry about the twenty minutes",
                  ],
                  answer: 0,
                  inference: true,
                  why: "El texto no dice «se lo explicó»: pone «Ben knew that street. The bus did not fit under the bridge» y después «he got out and he told the officer». Hay que juntar las dos frases.",
                },
                {
                  id: "ena2m2l8e13q3",
                  q: "How late was Ben at the last stop?",
                  options: ["Fifty minutes", "Twenty minutes", "Ten minutes"],
                  answer: 0,
                  why: "Los veinte son los que esperó al policía y los diez, el retraso con el que salió. El texto pone los tres números a propósito.",
                },
                {
                  id: "ena2m2l8e13q4",
                  q: "Why did the officer say nothing for a long time?",
                  options: [
                    "Because he realised that he had sent the bus the wrong way",
                    "Because he did not understand Ben",
                    "Because he was writing down the number of the bus",
                  ],
                  answer: 0,
                  inference: true,
                  why: "Mira lo que hace, no lo que dice: mira el autobús, mira el puente, se calla y acto seguido deshace su propia orden. Ese silencio es la respuesta.",
                },
                {
                  id: "ena2m2l8e13q5",
                  q: "What does the manager's question tell us?",
                  options: [
                    "That he had already heard the story of the dog",
                    "That he did not believe Ben",
                    "That he was worried about the animal",
                  ],
                  answer: 0,
                  inference: true,
                  why: "No pregunta por lo que le contarías tú —el tráfico, el puente, los cincuenta minutos— sino por el perro. Alguien se lo había contado antes.",
                },
              ],
              itemIds: ["ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2afterthat", "ena2m2whathappenednext"],
              tip: "Así es la Parte 4 del examen: un texto seguido y preguntas que van EN EL ORDEN DEL TEXTO. Avanza en paralelo, no vuelvas atrás, y si una palabra no la sabes, sigue leyendo: casi nunca la pregunta depende de esa palabra.",
            },
            {
              id: "ena2m2l8e12", type: "type", prompt: "Cierre de producción",
              question: "Perdí la cartera, así que llamé a Sam. Al final, Amy la encontró en la nevera.",
              answers: [
                "I lost my wallet, so I phoned Sam. In the end, Amy found it in the fridge.",
                "I lost my wallet, so I phoned Sam. In the end Amy found it in the fridge.",
                "I lost my wallet, so I called Sam. In the end, Amy found it in the fridge.",
              ],
              hints: ["Irregular + so + señal de cierre + irregular", "I l… my wallet, so I phoned Sam. In the e…, Amy f… it in the fridge."],
              itemIds: ["ena2m2mywallet", "ena2m2soiwalked", "ena2m2intheend", "ena2m2ifounditinmybag"],
              tip: "Dos irregulares, un conector de consecuencia y una señal de cierre. Con esas cuatro piezas ya se cuenta cualquier contratiempo.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — A2 listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Busca una conversación donde alguien cuente algo que le pasó y apunta solo los verbos en pasado que oigas. Cuenta cuántos son irregulares: te vas a sorprender." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — tu anécdota: espiral del módulo, el email y el minuto del oral
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m2l9",
      phaseId: "ena2m2",
      title: "Your story, in one minute",
      subtitle: "Todo el módulo junto — y tu primera anécdota contada de principio a fin",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar la historia",
          itemIds: ["ena2m2itwasadisaster", "ena2m2andthatwasit", "ena2m2whathappenednext", "ena2m1howaboutyou"],
        },
        {
          kind: "note",
          note: {
            title: "Una anécdota son cuatro bloques, y ni uno más",
            body: "En el oral del A2 te van a pedir <b>un minuto hablando solo</b>, con 30 segundos de papel para prepararlo. Y en el Writing, entre 30 y 50 palabras contando algo que te pasó. Las dos tareas se resuelven con el mismo esqueleto de <b>cuatro bloques</b>:<br/><br/><b>1. La situación.</b> Cuándo y dónde. <i>Last Tuesday I woke up late.</i><br/><b>2. El problema.</b> Lo que se torció. <i>Suddenly, I lost my wallet.</i><br/><b>3. Qué hiciste.</b> Uno o dos verbos. <i>First of all I phoned Sam. After that I went home.</i><br/><b>4. Cómo acabó, y qué te pareció.</b> <i>In the end, Amy found it. It was a disaster, but we had a laugh.</i><br/><br/>Y el remate que te salva de quedarte callada: <b>[[And that was it!|¡Y ahí acabó la cosa!]]</b> o el <b>How about you?</b> que ya traes del módulo pasado.<br/><br/><b>Lo que separa un A2 de un A1 aquí</b> no son las palabras raras: es que los cuatro bloques estén cosidos. Cósalos con lo de esta semana — <i>first of all, then, after that, suddenly, in the end</i> para el orden, y <i>because</i> y <i>so</i> para el porqué. Con eso, un minuto se llena solo.",
            table: [
              ["bloque", "qué dices", "con qué se cose"],
              ["1. la situación", "cuándo y dónde", "Last Tuesday… / Two days ago…"],
              ["2. el problema", "lo que se torció", "Suddenly, … / Unfortunately, …"],
              ["3. qué hiciste", "uno o dos verbos", "First of all… Then… After that…"],
              ["4. cómo acabó", "el desenlace y tu opinión", "In the end… because… so…"],
              ["remate", "devolver la palabra", "And that was it! / How about you?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m2l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — esto ya es tuyo",
              pairs: [
                { target: "went", source: "fui" },
                { target: "had", source: "tuve" },
                { target: "saw", source: "vi" },
                { target: "bought", source: "compré" },
                { target: "lost", source: "perdí (una cosa)" },
              ],
              targetSeconds: 25,
              itemIds: ["ena2m2iwenttothecinema", "ena2m2wehadagoodtime", "ena2m2isawamyyesterday", "ena2m2boughtgroup", "ena2m2ilostmyphone"],
              tip: "Si los cinco salen sin pensar, el núcleo del módulo está consolidado. Los que te frenen volverán solos en el repaso.",
            },
            {
              id: "ena2m2l9e2", type: "gapbank", prompt: "La historia entera, con banco de palabras",
              text: "Last Tuesday I ___ up late, ___ I missed the bus. At the office I ___ my wallet. ___ the end, Amy found it in the fridge.",
              answers: ["woke", "so", "lost", "In"],
              bank: ["woke", "so", "lost", "In", "broke", "found", "After"],
              translation: "El martes pasado me desperté tarde, así que perdí el autobús. En la oficina perdí la cartera. Al final, Amy la encontró en la nevera.",
              itemIds: ["ena2m2wokegroup", "ena2m2soiwalked", "ena2m2ilostmyphone", "ena2m2intheend"],
              tip: "Cuatro huecos y cuatro cosas distintas: un irregular de familia, un conector de consecuencia, otro irregular y una señal de cierre. Ese es el módulo resumido.",
            },
            {
              id: "ena2m2l9e3", type: "bucket", prompt: "Espiral: ¿el verbo va desnudo o con su forma de pasado?",
              categories: ["forma de pasado (went, had, saw…)", "desnudo (detrás de did / didn't)"],
              items: [
                { text: "I ___ to the cinema", bucket: 0 },
                { text: "Did you ___ to the cinema?", bucket: 1 },
                { text: "She didn't ___ time", bucket: 1 },
                { text: "We ___ a good time", bucket: 0 },
                { text: "Where did you ___?", bucket: 1 },
                { text: "They ___ the train", bucket: 0 },
              ],
              itemIds: ["ena2m2iwenttothecinema", "ena2m2wheredidyougo", "ena2m2wedidnthavetime", "ena2m2hetookthetrain"],
              tip: "Es la única decisión de todo el módulo, y se toma mirando si hay un did o un didn't delante. Nada más.",
            },
            {
              id: "ena2m2l9e4", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "No salí el sábado porque perdí las llaves, así que me quedé en casa.",
              answers: [
                "I didn't go out on Saturday because I lost my keys, so I stayed at home.",
                "I didn't go out on Saturday because I lost my keys, so I stayed home.",
              ],
              hint: "una negativa con el verbo desnudo, una causa y una consecuencia",
              itemIds: ["ena2m2ididntgoout", "ena2m2becauseimissedthebus", "ena2m2soiwalked", "ena2m2mykeys", "ena2m1istayedathome"],
            },
            {
              id: "ena2m2l9e5", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "Suddenly the lights went off, so we sat in the kitchen. In the end we had a good time.",
              answers: [
                "De repente se fue la luz, así que nos sentamos en la cocina. Al final nos lo pasamos bien.",
                "De repente se apagaron las luces, así que nos sentamos en la cocina. Al final nos lo pasamos bien.",
              ],
              itemIds: ["ena2m2suddenly", "ena2m2soiwalked", "ena2m2intheend", "ena2m2wehadagoodtime", "enkitchen"],
              tip: "«we had a good time» no se traduce con «tener»: en español lo pasamos, en inglés lo tenemos. Guárdala como bloque, no como palabras.",
            },
            {
              id: "ena2m2l9e6", type: "errorfix", prompt: "Corrige el calco más caro del nivel — ahora con un irregular",
              wrong: "I have gone to the cinema yesterday.",
              answers: ["I went to the cinema yesterday."],
              why: "Con yesterday, last… o …ago, el inglés exige pasado simple: son tiempos TERMINADOS. Y ojo con lo que se cuenta por ahí: «ayer he ido al cine» no es correcto tampoco en España — <i>ayer</i> cierra el periodo y pide indefinido en todas partes. Lo que sí cambia según de dónde seas es el <b>hoy</b>: «hoy he ido» frente a «hoy fui». Con <i>yesterday</i>, <i>last…</i> y <i>…ago</i> la regla es una sola para todos: tiempo terminado, pasado simple, siempre.",
              translation: "Ayer fui al cine.",
              itemIds: ["ena2m2iwenttothecinema", "enyesterday"],
              tip: "Este calco ya salió en el módulo 1 con los verbos regulares. Vuelve aquí porque con los irregulares recae: «have gone», «have seen» y «have had» son las tres formas que más se cuelan.",
            },
            {
              id: "ena2m2l9e7", type: "errorfix", prompt: "Y el error nº 1, por última vez este módulo",
              wrong: "Did you went out on Saturday?",
              answers: ["Did you go out on Saturday?"],
              why: "did ya marca el pasado, así que el verbo vuelve a su forma de diccionario. Es el mismo mecanismo del «Does she work?» del A1 y va a seguir siéndolo en todos los módulos que quedan: el auxiliar se lleva la marca, el verbo se queda desnudo.",
              translation: "¿Saliste el sábado?",
              itemIds: ["ena2m2wheredidyougo", "ena2m2ididntgoout"],
            },
            {
              id: "ena2m2l9e8", type: "mc", prompt: "Espiral: la regla de oro del módulo",
              question: "¿Cuándo necesitas saberte la forma rara de un verbo irregular?",
              options: [
                "Solo en la afirmativa: en la negativa y la pregunta va desnudo",
                "Siempre, en las tres formas",
                "Nunca, si pones did delante"],
              answer: 0,
              whyWrong: [null, "En negativa y pregunta la marca la lleva did: I didn't go, Did you go?", "Solo funciona en negativa y pregunta; en afirmativa no hay did que valga"],
              itemIds: ["ena2m2iwenttothecinema", "ena2m2ididntgoout", "ena2m2wheredidyougo"],
              tip: "Dicho al revés: aprenderte los irregulares te sirve para UNA de las tres formas. Las otras dos te las regala el auxiliar.",
            },
            {
              id: "ena2m2l9e9", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "It was a disaster!",
              forbid: ["disaster", "was"],
              answers: ["What a shame!", "Everything went wrong."],
              translation: "¡Fue un desastre!",
              itemIds: ["ena2m2itwasadisaster", "ena2m2whatashame"],
              tip: "Cuando en el oral no te salga una palabra, no te pares: rodéala. Esa capacidad de rodeo vale más puntos que la palabra exacta.",
            },
            {
              id: "ena2m2l9e10", type: "write", prompt: "Escribe tu anécdota — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te escribe: «What happened to you on Monday?». Contéstale por email y cuéntale el contratiempo.",
              bullets: [
                "Cuenta qué pasó, con al menos un verbo irregular en pasado",
                "Da la razón con because o so",
                "Di cómo acabó (in the end / finally)",
              ],
              checks: [
                { re: "\\b(went|had|saw|got|made|took|came|said|lost|found|forgot|fell|bought|thought|caught|brought|left|slept|kept|felt|met|woke|broke|spoke|wrote|drove|knew|threw|flew|ate|paid|heard|read|told|ran|sat|drank|sang|put|cut|cost)\\b", label: "un verbo irregular en pasado" },
                { re: "(\\bbecause\\b|\\bso\\b|that's why)", label: "la razón con because / so" },
                { re: "(in the end|finally|at last)", label: "cómo acabó" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["because", "so", "then", "and", "but"] },
              model: "Hi Emma! What a morning. On Monday I woke up late and I missed the bus, so I walked to work in the rain. Then I lost my wallet, but luckily Sam found it in the café. In the end I arrived at ten. Valeria",
              itemIds: ["ena2m2wokegroup", "ena2m2soiwalked", "ena2m2mywallet", "ena2m2intheend", "ena2m2luckily"],
              tip: "El corrector mira primero si has contestado a lo que te preguntaban y solo después la gramática. Tres contenidos, dos conectores y las 30-50 palabras: ese es el orden de prioridades.",
            },
            {
              id: "ena2m2l9e11", type: "monologue", prompt: "El minuto de verdad: cuenta TU contratiempo",
              topic: "Un día en que algo te salió mal",
              slides: [
                { title: "1. La situación", hint: "Cuándo y dónde: Last Tuesday I… / Two days ago I was at…" },
                { title: "2. El problema", hint: "Qué se torció: Suddenly, … / Unfortunately, I lost / I forgot / I missed…" },
                { title: "3. Qué hiciste", hint: "Uno o dos verbos: First of all I… Then I… After that I…" },
                { title: "4. Cómo acabó", hint: "El desenlace y tu opinión: In the end… It was a disaster / We had a good laugh." },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He usado al menos tres verbos irregulares en pasado",
                "He puesto una señal de secuencia (first of all, then, after that)",
                "He dado una razón con because o con so",
                "He dicho cómo acabó con «in the end»",
                "He cerrado con «And that was it!» o con «How about you?»",
              ],
              model: "Last Tuesday I woke up late because I didn't hear my alarm. I didn't have time for breakfast, so I ran to the bus stop, but I missed the bus. Then I walked to work in the rain and I arrived at ten. At the office I opened my bag and my wallet wasn't there. First of all I phoned Sam at the café, but he didn't find it. After that I phoned my flatmate. In the end she found it in the fridge — I put it there with the milk! It was a disaster, but we had a good laugh. And that was it!",
              itemIds: ["ena2m2wokegroup", "ena2m2becauseimissedthebus", "ena2m2intheend", "ena2m2itwasadisaster", "ena2m2andthatwasit"],
              tip: "Grábate las dos veces y compara. La segunda pasada siempre sale más suelta, y esa es la que te llevas al examen. No te evalúas por lo bonito: por las casillas de la lista.",
            },
            {
              id: "ena2m2l9e12", type: "speak", prompt: "El remate, en voz alta",
              text: "In the end, Amy found it in the fridge. It was a disaster! And that was it.",
              phonetic: "in di END, ÉI-mi fáund it in de fridch. it uos̬ a di-S̬AAS-ta. and dat uos̬ IT",
              translation: "Al final, Amy la encontró en la nevera. ¡Fue un desastre! Y ahí acabó la cosa.",
              itemIds: ["ena2m2intheend", "ena2m2itwasadisaster", "ena2m2andthatwasit"],
              tip: "«And that was it» se dice bajando la voz: es el punto final. Sin él, quien te escucha se queda esperando más.",
            },
            {
              id: "ena2m2l9e13", type: "type", prompt: "Cierre del módulo — la anécdota entera en dos frases",
              question: "Perdí el autobús, así que fui andando y llegué tarde. Al final no dijo nada nadie.",
              answers: [
                "I missed the bus, so I walked and I arrived late. In the end nobody said anything.",
                "I missed the bus, so I walked and I was late. In the end nobody said anything.",
                "I missed the bus, so I walked and I arrived late. In the end, nobody said anything.",
              ],
              hints: ["Consecuencia con so + señal de cierre + una sola negación", "I m… the bus, so I walked and I arrived late. In the e… nobody s… anything."],
              itemIds: ["ena2m2soiwalked", "ena2m2intheend", "ena2m2shesaidsorry", "ena2m1missedthebus"],
              tip: "Fíjate en la última mitad: «nobody said anything», con la negación en nobody y anything detrás. Dos negaciones en la misma frase siguen sin caber. Y con esto ya puedes contar cualquier cosa que te haya pasado.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m2-5",
            book: "It was a very bad day.",
            real: "It was a nightmare.",
            meaning: "Fue una pesadilla",
            when: "Con amigos y compañeros, resumiendo un día horrible: un viaje, una mudanza, una jornada de trabajo. Es exageración normal y nadie la toma en serio. En el Writing del examen, la del libro (it was terrible, it was a disaster).",
            register: "amigos",
            note: "Se dice de situaciones, no de personas. Y su hermana pequeña, «It was a disaster», ya la tienes en esta lección.",
            sound: "it uos̬ a NÁIT-mea",
            level: "a2",
            itemId: "ena2m2itwasadisaster",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Ensaya el minuto con los vídeos: 30 segundos de papel, uno de habla y una segunda pasada. Siempre dos veces, siempre grabándote." },
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Mira hoy la Parte 4 del Spoken: es exactamente el minuto que acabas de ensayar, con sus 30 segundos de preparación." },
      ],
    },
  ],
};
