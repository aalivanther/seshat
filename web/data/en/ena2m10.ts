import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 10 — Have you ever…?: lo que has hecho alguna vez, sin
// decir cuándo. Es el primero de los DOS MÓDULOS DE FRONTERA del nivel
// (PLAN-EN-A2 §4.1 y §5.1, riesgo 2), y eso manda sobre todo lo demás.
//
// POR QUÉ ES FRONTERA, con la fuente delante: el syllabus oficial de
// LanguageCert International ESOL coloca el present perfect —con since, for,
// ever, never, yet, already y just— en la columna **Achiever (B1)**. La columna
// Access (A2), que es la que examina a este alumno, llega al pasado simple de
// regulares e irregulares con marcadores de tiempo y al futuro con `be going
// to`, y ahí se para. Cambridge A2 Key sí lo evalúa, y en la calle sale cada
// dos frases. De modo que el curso hace lo mismo que hizo con el past continuous
// de `ena2m3` y con as…as / too / enough de `ena2m4`: se presenta, se reconoce
// y se produce GUIADO, y **no entra en el simulacro**. El aviso se le dice al
// alumno con todas las letras en la nota de apertura de la L1 y se le repite
// en el cierre de la L9: nada de esconderlo en un comentario de código.
//
// LA TRAMPA REINA, Y SE ESCRIBE CON LAS DOS MITADES (PLAN-EN-A2 §9.3). El sesgo
// del hispanohablante NO es uno, son dos opuestos, y dependen de dónde se haya
// criado el alumno: en España se SOBREUSA el perfecto («hoy he ido», y de ahí
// sale *I have seen him yesterday*), y en Latinoamérica se INFRAUSA («hoy fui»,
// y de ahí salen *Did you finish yet?* y *I just arrived*). La nota de la L6
// lleva las dos mitades escritas —«si tú dirías hoy he ido…» / «si dirías hoy
// fui…»— en vez de elegir una: es más honesto y no fragmenta el contenido.
//
// Y NO se repite el error del plan del A1: «he ido AYER» no es gramatical en
// España tampoco. *Ayer* cierra el periodo y pide indefinido en todas partes.
// Lo que sí cambia de una orilla a otra es el periodo ABIERTO (hoy, esta
// semana, este año). Por eso el reparto que se enseña es OPERATIVO y va por
// adverbio, no por intuición: yesterday, last…, …ago, in 2019 → pasado simple;
// just, already, yet, ever, never, so far, recently → perfecto.
//
// FOR / SINCE Y EL CALCO `since three years` (L7): son TRES errores encadenados
// y se separan a propósito, porque juntos no se arreglan. (a) el tiempo verbal
// —el español usa presente («trabajo aquí»)—, (b) la elección de preposición
// —for cuenta cuánto dura, since dice cuándo empezó— y (c) el calco de «desde
// hace». Se enseña partiendo de la frase ESPAÑOLA, porque el problema no es que
// el alumno elija mal: es que en su sistema esa casilla no existe.
//
// LO CERRADO NO SE REABRE: el pasado simple está cerrado en `ena2m2` (did /
// didn't + verbo desnudo, irregulares por familias de cambio vocálico), la
// posición del adverbio se enseñó en `ena2m3l6`, los determinantes en `ena2m4`,
// contables/incontables y la cortesía de la petición en `ena2m5`, y `ena2m7`
// cerró la regla única de los modales. Aquí solo se usan.
//
// CLÍNICA DE SONIDO (L5, PLAN-EN-A2 §4.3): formas débiles de have/has y las
// contracciones 've / 's. Tiene una razón gramatical, no decorativa: si el
// alumno no oye el «(h)av» átono ni la «v» pegada al sujeto, el perfecto le
// llega al oído como un presente, y en el Listening pierde el tiempo verbal
// entero. El par que decide es `he's worked` (= has) frente a `he's working`
// (= is): lo delata lo que viene DETRÁS, no lo que suena.
//
// RECICLADO del A1 y de los módulos CERRADOS, sin redefinir ids (una palabra,
// una tarjeta): ennever, entwice, enexam, enhomework, enuniversity, enschool,
// enstudy, enstudent, enteacher, enlearn, enilearnenglishatschool, enbook,
// enclassroom, enjob, enwork, enoffice, enboss, enwhatdoyoudo, enwheredoyouwork,
// enimastudent, enlondon, enspain, encolombia, enmexico, enplane, enswim,
// enguitar, enfishandchips, enpark, enfriend, enpeople, enbus, enticket,
// enyesterday, enlastnight, endoyouwork, enidontknow, enimlate, enfree,
// engoodluck, enwelldone, enfavourite, ena2m1lastweek, ena2m1twodaysago,
// ena2m1in2024, ena2m1lastyear, ena2m1arrived, ena2m1studied, ena2m1iworked,
// ena2m1shevisitedafriend, ena2m1whathappened, ena2m2iwenttothecinema,
// ena2m2isawamyyesterday, ena2m2ilostmyphone, ena2m2wheredidyougo,
// ena2m2boughtgroup, ena2m2wrotegroup, ena2m2sleptgroup, ena2m2knewgroup,
// ena2m2intheend, ena2m3difficult, ena2m3interesting, ena2m3exciting,
// ena2m4thebestcoffee, ena2m5uncountablegroup, ena2m7ihavetogotothebank.
//
// TODOS los ids nuevos llevan el prefijo "ena2m10": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m10: Record<string, VocabItem> = {
  // ── ena2m10l1 — la pregunta de experiencia: ever / never ──
  ena2m10haveyouever: {
    id: "ena2m10haveyouever", target: "Have you ever worked in a restaurant?",
    source: "¿Has trabajado alguna vez en un restaurante?",
    sound: "jav yu É-va UÉEKT in a RES-tront",
    gram: {
      trap: "Did you ever work in a restaurant?",
      same: ["Have you ever had a job in a restaurant?"],
    },
  },
  ena2m10yesihave: {
    id: "ena2m10yesihave", target: "Yes, I have. / No, I haven't.",
    source: "Sí. / No. (respuesta corta: se repite have, no el verbo)",
    sound: "yes ái JAV / nóu ái JÁ-vent",
  },
  ena2m10ivenevertried: {
    id: "ena2m10ivenevertried", target: "I've never tried sushi.",
    source: "No he probado nunca el sushi.",
    sound: "áiv NÉ-va tráid SÚU-shi",
    gram: { same: ["I have never tried sushi.", "I haven't tried sushi."] },
  },
  ena2m10shesworkedin: {
    id: "ena2m10shesworkedin", target: "She's worked in three countries.",
    source: "Ha trabajado en tres países. (she's = she HAS, no she is)",
    sound: "shíis̬ UÉEKT in zríi KÁN-tris̬",
    gram: { trap: "She is worked in three countries." },
  },
  ena2m10experience: {
    id: "ena2m10experience", target: "an experience", source: "una experiencia (algo que te ha pasado)",
    sound: "an iks-PÍA-riens",
  },
  ena2m10onceortwice: {
    id: "ena2m10onceortwice", target: "once or twice", source: "una vez o dos",
    sound: "uáns oo TUÁIS",
  },

  // ── ena2m10l2 — la tercera columna: el participio ──
  ena2m10thirdcolumn: {
    id: "ena2m10thirdcolumn", target: "work → worked → worked",
    source: "los regulares ni se enteran: la segunda y la tercera columna son la misma palabra",
    sound: "uéek · uéekt · uéekt",
  },
  ena2m10seengroup: {
    id: "ena2m10seengroup", target: "see → saw → seen · eat → ate → eaten · give → gave → given",
    source: "ver · comer · dar — la tercera se hace con -en sobre el infinitivo",
    sound: "síin · ÍI-ten · GUÍ-ven",
  },
  ena2m10writtengroup: {
    id: "ena2m10writtengroup", target: "write → wrote → written · speak → spoke → spoken · break → broke → broken",
    source: "escribir · hablar · romper — otra vez -en, pero sobre la vocal del pasado",
    sound: "RÍ-ten · SPÓU-ken · BRÓU-ken",
  },
  ena2m10donegroup: {
    id: "ena2m10donegroup", target: "do → did → done · go → went → gone · be → was → been",
    source: "hacer · ir · ser/estar — las tres cabezotas del idioma: se aprenden sueltas",
    sound: "dan · gon · biin",
  },
  ena2m10boughtsame: {
    id: "ena2m10boughtsame", target: "buy → bought → bought · think → thought → thought · bring → brought → brought",
    source: "las de -ought no se mueven de la segunda a la tercera: una columna gratis",
    sound: "boot · zoot · broot",
  },
  ena2m10hadmade: {
    id: "ena2m10hadmade", target: "have → had → had · make → made → made · say → said → said",
    source: "otras tres que repiten el pasado en el participio",
    sound: "jad · méid · sed",
  },
  ena2m10taken: {
    id: "ena2m10taken", target: "take → took → taken",
    source: "coger, llevar, tardar — la tercera recupera la vocal del infinitivo y añade -n",
    sound: "téik · tuk · TÉI-ken",
  },

  // ── ena2m10l3 — been vs gone ──
  ena2m10ivebeento: {
    id: "ena2m10ivebeento", target: "I've been to Edinburgh twice.",
    source: "He estado en Edimburgo dos veces. (fui Y volví)",
    sound: "áiv bin tu É-din-bra tuáis",
    gram: {
      trap: "I've gone to Edinburgh twice.",
      same: ["I have been to Edinburgh twice.", "I went to Edinburgh twice."],
    },
  },
  ena2m10shesgoneto: {
    id: "ena2m10shesgoneto", target: "Amy has gone to the hospital.",
    source: "Amy se ha ido al hospital. (sigue allí, no está aquí)",
    sound: "ÉI-mi jas̬ gon tu de JOS-pi-tal",
    gram: { trap: "Amy has been to the hospital." },
  },
  ena2m10haveyoueverbeenabroad: {
    id: "ena2m10haveyoueverbeenabroad", target: "Have you ever been abroad?",
    source: "¿Has salido alguna vez al extranjero?",
    sound: "jav yu É-va bin a-BROOD",
    gram: { trap: "Have you ever gone abroad?" },
  },
  ena2m10abroad: {
    id: "ena2m10abroad", target: "abroad", source: "al extranjero / en el extranjero — nunca lleva to delante",
    sound: "a-BROOD",
    gram: { trap: "to abroad" },
  },
  ena2m10wherehaveyoubeen: {
    id: "ena2m10wherehaveyoubeen", target: "Where have you been?",
    source: "¿Dónde te habías metido? (llegas tarde y alguien te esperaba)",
    sound: "uéa jav yu BÍIN",
  },

  // ── ena2m10l4 — just / already / yet ──
  ena2m10ivejustfinished: {
    id: "ena2m10ivejustfinished", target: "I've just finished my homework.",
    source: "Acabo de terminar los deberes.",
    sound: "áiv dchast FÍ-nisht mái JÓUM-uéek",
    gram: {
      trap: "I just finished my homework.",
      same: ["I have just finished my homework."],
    },
  },
  ena2m10ivealreadyseenit: {
    id: "ena2m10ivealreadyseenit", target: "I've already seen that film.",
    source: "Ya he visto esa película.",
    sound: "áiv ool-RÉ-di síin dat film",
    gram: { trap: "I already saw that film." },
  },
  ena2m10haveyoufinishedyet: {
    id: "ena2m10haveyoufinishedyet", target: "Have you finished yet?",
    source: "¿Ya has terminado? / ¿Has terminado ya?",
    sound: "jav yu FÍ-nisht YET",
    gram: { trap: "Did you finish yet?" },
  },
  ena2m10notyet: {
    id: "ena2m10notyet", target: "Not yet.", source: "Todavía no.",
    sound: "not YET",
  },
  ena2m10shehasntcalledyet: {
    id: "ena2m10shehasntcalledyet", target: "She hasn't called me yet.",
    source: "Todavía no me ha llamado.",
    sound: "shi JÁ-s̬ent koold mi yet",
    gram: { trap: "She hasn't called me already." },
  },
  ena2m10recently: {
    id: "ena2m10recently", target: "recently", source: "hace poco, últimamente",
    sound: "RÍI-sent-li",
  },

  // ── ena2m10l5 — la clínica: 've, 's y el have átono ──
  ena2m10iveweak: {
    id: "ena2m10iveweak", target: "I've · you've · we've · they've",
    source: "have se pega al sujeto y se queda en una v: «áiv», «yuuv», «uiv», «déiv»",
    sound: "áiv · yuuv · uiv · déiv",
  },
  ena2m10hesshesweak: {
    id: "ena2m10hesshesweak", target: "he's · she's · it's",
    source: "aquí la 's puede ser IS o HAS — lo delata lo que venga detrás",
    sound: "jíis̬ · shíis̬ · its",
  },
  ena2m10haveyouweak: {
    id: "ena2m10haveyouweak", target: "Have you seen it?",
    source: "¿Lo has visto? — en pregunta, have casi no suena: «av-yu»",
    sound: "av-yu SÍIN it",
  },
  ena2m10haventhasnt: {
    id: "ena2m10haventhasnt", target: "haven't · hasn't",
    source: "en negativa sí suenan fuerte: llevan encima el «no»",
    sound: "JÁ-vent · JÁ-s̬ent",
  },

  // ── ena2m10l6 — la frontera con el pasado simple ──
  ena2m10isawherlastweek: {
    id: "ena2m10isawherlastweek", target: "I saw Amy last week.",
    source: "Vi a Amy la semana pasada. / He visto a Amy la semana pasada.",
    sound: "ái soo ÉI-mi laast UÍIK",
    gram: { trap: "I have seen Amy last week." },
  },
  ena2m10iveseenherthisweek: {
    id: "ena2m10iveseenherthisweek", target: "I've seen Amy this week.",
    source: "He visto a Amy esta semana. (la semana no ha terminado)",
    sound: "áiv síin ÉI-mi dis UÍIK",
    gram: { same: ["I have seen Amy this week."] },
  },
  ena2m10whendidithappen: {
    id: "ena2m10whendidithappen", target: "When did it happen?",
    source: "¿Cuándo pasó? — con when siempre pasado simple, nunca perfecto",
    sound: "uén did it JÁ-pen",
    gram: { trap: "When have you seen her?" },
  },
  ena2m10thisweekthisyear: {
    id: "ena2m10thisweekthisyear", target: "this week · this month · this year",
    source: "periodos que AÚN no han terminado: piden perfecto",
    sound: "dis UÍIK · dis MANZ · dis YÍA",
  },
  ena2m10threetimes: {
    id: "ena2m10threetimes", target: "three times", source: "tres veces — contar experiencias no cierra el tiempo",
    sound: "zríi TÁIMS̬",
  },

  // ── ena2m10l7 — for / since ──
  ena2m10ivestudiedenglishfor: {
    id: "ena2m10ivestudiedenglishfor", target: "I've studied English for three years.",
    source: "Llevo tres años estudiando inglés. / Estudio inglés desde hace tres años.",
    sound: "áiv STA-did ÍN-glish fo zríi YÍAS̬",
    gram: {
      trap: "I study English since three years.",
      same: ["I have studied English for three years."],
    },
  },
  ena2m10forthreeyears: {
    id: "ena2m10forthreeyears", target: "for three years",
    source: "desde hace tres años — for + CUÁNTO dura",
    sound: "fo zríi YÍAS̬",
    gram: { trap: "since three years" },
  },
  ena2m10since2019: {
    id: "ena2m10since2019", target: "since 2019",
    source: "desde 2019 — since + CUÁNDO empezó",
    sound: "sins tuénti nain-TÍIN",
    gram: { trap: "for 2019" },
  },
  ena2m10howlonghaveyou: {
    id: "ena2m10howlonghaveyou", target: "How long have you worked here?",
    source: "¿Cuánto tiempo llevas trabajando aquí?",
    sound: "jáu long jav yu UÉEKT jía",
    gram: { trap: "How long do you work here?" },
  },
  ena2m10iveknownbensince: {
    id: "ena2m10iveknownbensince", target: "I've known Ben since school.",
    source: "Conozco a Ben desde el colegio.",
    sound: "áiv nóun ben sins skuul",
    gram: { trap: "I know Ben since school." },
  },
  ena2m10allmylife: {
    id: "ena2m10allmylife", target: "all my life", source: "toda mi vida",
    sound: "ool mái LÁIF",
  },

  // ── ena2m10l8 — estudios, asignaturas y trabajo ──
  ena2m10subject: {
    id: "ena2m10subject", target: "a subject", source: "una asignatura (y también «un tema»)",
    sound: "a SAB-dchekt",
  },
  ena2m10mathshistory: {
    id: "ena2m10mathshistory", target: "maths · history · geography",
    source: "matemáticas · historia · geografía — maths lleva -s y va en singular",
    sound: "mazs · JÍS-tri · dchi-Ó-gra-fi",
  },
  ena2m10science: {
    id: "ena2m10science", target: "science", source: "ciencias (asignatura) / la ciencia",
    sound: "SÁI-ens",
  },
  ena2m10adegree: {
    id: "ena2m10adegree", target: "a degree", source: "una carrera universitaria / un título",
    sound: "a di-GRÍI",
  },
  ena2m10ipassedtheexam: {
    id: "ena2m10ipassedtheexam", target: "I passed the exam.", source: "Aprobé el examen. (pass = aprobar, NO «pasar»)",
    sound: "ái PAAST di ig-S̬ÁM",
    gram: { trap: "I approved the exam." },
  },
  ena2m10ifailed: {
    id: "ena2m10ifailed", target: "I failed my driving test.", source: "Suspendí el examen de conducir.",
    sound: "ái FÉILD mái DRÁI-ving test",
  },
  ena2m10acourse: {
    id: "ena2m10acourse", target: "an English course", source: "un curso de inglés — con el idioma delante, sin of",
    sound: "an ÍN-glish koos",
    gram: { trap: "a course of English" },
  },
  ena2m10iveappliedfor: {
    id: "ena2m10iveappliedfor", target: "I've applied for three jobs.", source: "He echado la solicitud a tres trabajos.",
    sound: "áiv a-PLÁID fo zríi dchobs̬",
    gram: { trap: "I've applied to three jobs." },
  },

  // ── ena2m10l9 — cierre ──
  ena2m10thebestivever: {
    id: "ena2m10thebestivever", target: "It's the best thing I've ever done.",
    source: "Es lo mejor que he hecho nunca.",
    sound: "its de best zing áiv É-va DAN",
  },
  ena2m10howmanytimes: {
    id: "ena2m10howmanytimes", target: "How many times have you been to London?",
    source: "¿Cuántas veces has estado en Londres?",
    sound: "jáu me-ni táims̬ jav yu bin tu LÁN-don",
  },
};

export const ena2m10: Phase = {
  id: "ena2m10",
  level: "a2",
  n: 10,
  title: "Have you ever…?",
  goal: "Frontera con el B1: contar y preguntar por experiencias de vida con el present perfect (ever/never, been vs gone, just/already/yet, for/since), y —sobre todo— saber cuándo NO se usa, porque el marcador de tiempo manda.",
  color: "#0e7490",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — la puerta: have/has + participio, con ever y never
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l1",
      phaseId: "ena2m10",
      title: "Have you ever…?",
      subtitle: "Preguntar por toda una vida sin poner fecha a nada",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar y contar experiencias",
          itemIds: ["ena2m10haveyouever", "ena2m10yesihave", "ena2m10ivenevertried", "ena2m10shesworkedin", "ena2m10experience", "ena2m10onceortwice", "ennever"],
        },
        {
          kind: "note",
          note: {
            title: "Léelo antes de empezar: esto es FRONTERA",
            body: "Este módulo y el siguiente son distintos a los nueve anteriores, y lo justo es decírtelo en la primera línea.<br/><br/>El <b>present perfect</b> —eso de <i>I have worked</i>, <i>she has gone</i>— <b>no está en el temario de A2 de tu examen</b>. El temario oficial de LanguageCert lo pone en la columna del <b>B1</b>, junto con <i>since</i>, <i>for</i>, <i>ever</i>, <i>never</i>, <i>yet</i>, <i>already</i> y <i>just</i>. Tu nivel, el Access A2, llega al pasado simple con sus marcadores y al futuro con <i>going to</i>, y ahí se para.<br/><br/><b>Entonces, ¿por qué está aquí?</b> Por tres razones que no son un capricho:<br/>1. <b>Cambridge sí lo evalúa en A2.</b> Si algún día haces el A2 Key en vez del LanguageCert, te lo van a pedir.<br/>2. <b>Lo vas a oír.</b> En Londres nadie espera a tener el B1 para decir <i>I've just arrived</i>. Entender no cuesta lo mismo que producir, y esto se cobra entero en el Listening.<br/>3. <b>Porque te protege el pasado simple.</b> La confusión entre los dos tiempos es <b>el error que más puntos le cuesta a un hispanohablante</b>, y no se arregla ignorando uno de los dos: se arregla viéndolos juntos. Ese es el trabajo de la lección 6.<br/><br/><b>Y el compromiso, por escrito: nada de este módulo entra en el simulacro de examen.</b> Lo que se te va a exigir producir en la prueba sigue siendo el pasado simple de <i>ena2m1</i> y <i>ena2m2</i>. Aquí se presenta, se reconoce y se produce con ayuda. Sin agobios y sin prisa.",
            table: [
              ["", "Tu examen (LanguageCert A2)", "Este módulo"],
              ["Pasado simple", "se te exige producirlo", "se usa y se contrasta"],
              ["Present perfect", "NO entra", "se presenta y se reconoce"],
              ["En el simulacro", "sí", "no aparece"],
              ["En la calle de Londres", "todo el rato", "todo el rato"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "La forma: have (o has) + la tercera forma del verbo",
            body: "Se construye con <b>dos piezas</b> y ninguna es nueva del todo:<br/><br/><b>have / has</b> + <b>participio</b> (la «tercera forma» del verbo)<br/><br/>· <i>I <b>have worked</b>…</i> · <i>She <b>has worked</b>…</i> · <i>They <b>have worked</b>…</i><br/><br/>Solo cambia en tercera persona del singular (<b>he / she / it → has</b>), exactamente igual que el <i>do/does</i> del A1. Y en la calle se contrae siempre: <b>I've</b>, <b>you've</b>, <b>she's</b>, <b>they've</b>.<br/><br/><b>¿Para qué sirve?</b> Para hablar de tu <b>experiencia hasta hoy</b>, sin decir cuándo. Es la diferencia entre estas dos preguntas:<br/>· [[Have you ever worked in a restaurant?|¿Has trabajado alguna vez en un restaurante?]] → toda tu vida, hasta este momento.<br/>· <i>Did you work in the restaurant on Saturday?</i> → un día concreto, cerrado.<br/><br/><b>ever</b> = «alguna vez», y vive <b>en las preguntas</b>. <b>never</b> = «nunca», y vive <b>en las afirmativas</b> (never ya es la negación: no se le pone <i>not</i> encima).<br/><br/>· <i>Have you <b>ever</b> been to a concert?</i><br/>· <i>I've <b>never</b> been to a concert.</i> — nunca <i>I haven't never</i>.<br/><br/>Y el sitio de ever/never es fijo: <b>entre have y el participio</b>. <i>Have you <b>ever</b> worked…?</i> · <i>I've <b>never</b> tried…</i><br/><br/>La respuesta corta repite <b>el auxiliar</b>, como toda la vida: [[Yes, I have.|Sí.]] / [[No, I haven't.|No.]] — nunca <i>Yes, I did</i>, que contestaría a otra pregunta.",
            table: [
              ["persona", "afirmativa", "negativa", "pregunta"],
              ["I / you / we / they", "I've worked.", "I haven't worked.", "Have you worked?"],
              ["he / she / it", "She's worked.", "She hasn't worked.", "Has she worked?"],
              ["respuesta corta", "Yes, I have.", "No, I haven't.", "—"],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "alguna vez, en algún punto",
              pastExample: "I've worked in a restaurant.",
              nowLabel: "hoy",
              nowExample: "I work in a café.",
            },
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l1e1", type: "mc", prompt: "Reconoce la pregunta de experiencia",
              question: "“Have you ever worked in a restaurant?”",
              options: ["¿Has trabajado alguna vez en un restaurante?", "¿Trabajaste ayer en el restaurante?", "¿Vas a trabajar en un restaurante?"],
              answer: 0,
              whyWrong: [null, "Eso pediría un día concreto: «Did you work at the restaurant yesterday?»", "El futuro con going to es del módulo 6; aquí se pregunta por toda tu vida hasta hoy"],
              itemIds: ["ena2m10haveyouever"],
              tip: "La marca de «alguna vez» es ever, y va metida entre have y el verbo. Sin ever, la pregunta sigue siendo de experiencia, pero suena menos abierta.",
            },
            {
              id: "ena2m10l1e2", type: "fastmatch", prompt: "Calentamiento veloz — todo esto ya es tuyo",
              pairs: [
                { target: "never", source: "nunca" },
                { target: "twice", source: "dos veces" },
                { target: "the exam", source: "el examen" },
                { target: "homework", source: "los deberes" },
                { target: "university", source: "la universidad" },
              ],
              targetSeconds: 25,
              itemIds: ["ennever", "entwice", "enexam", "enhomework", "enuniversity"],
              tip: "never lo traes del módulo 4 del A1, donde era «nunca» de frecuencia. Aquí hace otro trabajo, pero es la misma palabra: no hay nada que reaprender.",
            },
            {
              id: "ena2m10l1e3", type: "match", prompt: "Empareja la persona con su auxiliar",
              pairs: [
                { target: "I have worked", source: "he trabajado" },
                { target: "she has worked", source: "ha trabajado (ella)" },
                { target: "we have worked", source: "hemos trabajado" },
                { target: "they have worked", source: "han trabajado" },
              ],
              itemIds: ["ena2m10haveyouever", "ena2m10shesworkedin"],
              tip: "Una sola excepción en toda la tabla: he/she/it llevan has. Es el mismo bulto que la -s del presente, en otro sitio.",
            },
            {
              id: "ena2m10l1e4", type: "bucket", prompt: "¿Pregunta por una experiencia (sin cuándo) o por un momento concreto?",
              categories: ["experiencia: have / has", "momento concreto: pasado simple"],
              items: [
                { text: "Have you ever been to a concert?", bucket: 0 },
                { text: "Did you go to the concert on Sunday?", bucket: 1 },
                { text: "I've never worked at night.", bucket: 0 },
                { text: "I worked at night last summer.", bucket: 1 },
                { text: "She has never tried sushi.", bucket: 0 },
                { text: "She tried sushi in Tokyo in 2019.", bucket: 1 },
              ],
              itemIds: ["ena2m10haveyouever", "ena2m10ivenevertried"],
              tip: "Fíjate en lo que decide: si en la frase hay una FECHA o un día, es pasado simple. Si no la hay, cabe la experiencia. Esa idea vuelve entera en la lección 6.",
            },
            {
              id: "ena2m10l1e5", type: "cloze", prompt: "Completa el auxiliar",
              text: "___ you ever worked in a café?",
              answers: ["Have"],
              translation: "¿Has trabajado alguna vez en un café?",
              hints: ["El auxiliar del perfecto, para you", "H…"],
              itemIds: ["ena2m10haveyouever"],
            },
            {
              id: "ena2m10l1e6", type: "cloze", prompt: "Completa el auxiliar — ojo a la persona",
              text: "Amy ___ never tried Colombian coffee.",
              answers: ["has"],
              translation: "Amy no ha probado nunca el café colombiano.",
              hints: ["Amy es «ella»: el auxiliar cambia", "h…"],
              itemIds: ["ena2m10ivenevertried", "ena2m10shesworkedin"],
            },
            {
              id: "ena2m10l1e7", type: "mc", prompt: "La respuesta corta",
              question: "“Have you ever been to a football match?” — Contestas que sí:",
              options: ["Yes, I have.", "Yes, I did.", "Yes, I am."],
              answer: 0,
              whyWrong: [null, "Ese did contestaría a «Did you go…?», que pregunta por un día concreto", "am es del verbo be; aquí el auxiliar de la pregunta era have"],
              itemIds: ["ena2m10yesihave"],
              tip: "Norma de oro de las respuestas cortas en inglés: se devuelve el auxiliar que trajo la pregunta. Have → have. Did → did. Are → am.",
            },
            {
              id: "ena2m10l1e8", type: "transform", prompt: "Conviértelo en pregunta de experiencia",
              source: "You work in a restaurant.",
              instruction: "Pregúntale si lo ha hecho alguna vez",
              answers: ["Have you ever worked in a restaurant?", "Have you ever worked in a restaurant"],
              translation: "¿Has trabajado alguna vez en un restaurante?",
              hints: ["Auxiliar delante, ever en medio y el verbo en su tercera forma", "H… you ever work… in a restaurant?"],
              itemIds: ["ena2m10haveyouever"],
            },
            {
              id: "ena2m10l1e9", type: "build", prompt: "Construye la negativa — y fíjate en que no hay dos negaciones",
              target: "I have never worked in a hospital",
              translation: "No he trabajado nunca en un hospital",
              distractors: ["ever", "has"],
              itemIds: ["ena2m10ivenevertried", "ena2m10shesworkedin"],
              tip: "never ya niega él solo. En español apilamos dos («no… nunca»); en inglés, una y basta.",
            },
            {
              id: "ena2m10l1e10", type: "errorfix", prompt: "Corrige el sitio de ever",
              wrong: "I have ever been to Ireland.",
              answers: ["I have been to Ireland.", "I've been to Ireland."],
              why: "ever no significa «alguna vez» en una afirmativa: solo vive en preguntas («Have you ever…?») y detrás de superlativos («the best I've ever had»). Si quieres decir que sí has estado, va a pelo: I've been to Ireland. Y si quieres decir que no, es never: I've never been to Ireland.",
              translation: "He estado en Irlanda.",
              itemIds: ["ena2m10ivenevertried"],
            },
            {
              id: "ena2m10l1e11", type: "listen", prompt: "Dictado — escríbelo entero, sin contraer",
              text: "She has never worked in a school.",
              translation: "No ha trabajado nunca en un colegio.",
              strictContractions: true,
              hints: ["Empieza por She ha…", "She ha… never work… in a school."],
              itemIds: ["ena2m10shesworkedin", "enschool"],
              tip: "Aquí se te pide la forma larga a propósito: si no distingues «She has» de «She's» al escribirlo, en el examen escrito la vas a perder.",
            },
            {
              id: "ena2m10l1e12", type: "speak", prompt: "Dilo en voz alta — la pregunta y tu respuesta",
              text: "Have you ever worked in a restaurant? No, I haven't. I've never tried it.",
              phonetic: "jav yu É-va UÉEKT in a RES-tront? nóu ái JÁ-vent. áiv NÉ-va tráid it",
              translation: "¿Has trabajado alguna vez en un restaurante? No. Nunca lo he probado.",
              itemIds: ["ena2m10haveyouever", "ena2m10yesihave", "ena2m10ivenevertried"],
              tip: "El have de la pregunta casi no suena («av-yu»); el haven't de la respuesta suena fuerte. Ese desnivel es el ritmo inglés, y lo trabajamos entero en la lección 5.",
            },
            {
              id: "ena2m10l1e13", type: "type", prompt: "Cierre de producción",
              question: "Ha trabajado en tres países, pero no ha probado nunca el sushi.",
              answers: [
                "She's worked in three countries, but she's never tried sushi.",
                "She has worked in three countries, but she has never tried sushi.",
                "She's worked in three countries but she's never tried sushi.",
                "She has worked in three countries, but she's never tried sushi.",
              ],
              hints: ["has + tercera forma, dos veces; y never entre las dos piezas", "She h… worked in three countries, but she h… never tried sushi."],
              itemIds: ["ena2m10shesworkedin", "ena2m10ivenevertried"],
              tip: "Dos perfectos en una frase y ni una fecha. Eso es exactamente lo que hace este tiempo verbal: cuenta lo que llevas hecho, no cuándo lo hiciste.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-1",
            book: "Have you ever tried it?",
            real: "Ever tried it?",
            meaning: "¿Lo has probado alguna vez?",
            when: "Entre amigos, hablando de comida, de una serie o de un sitio. Se cae el «Have you» entero y arranca por ever. En el examen escribe y di la pregunta completa: el recorte es de conversación, no de papel.",
            register: "amigos",
            note: "El inglés hablado se come el principio de las preguntas cuando el contexto ya lo dice: «Been there?», «Seen it?», «Got a minute?».",
            sound: "É-va TRÁID it",
            level: "a2",
            itemId: "ena2m10haveyouever",
          },
        },
      ],
      resources: [
        { label: "British Council — Present perfect", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/present-perfect", note: "Lee solo el primer apartado, el de experiencias (5 min). No sigas al de for/since todavía: eso es la lección 7 y aquí solo estorbaría." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — la tercera columna: el participio
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l2",
      phaseId: "ena2m10",
      title: "The third column",
      subtitle: "El participio: la columna que el pasado simple no te pidió",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Las familias del participio",
          itemIds: ["ena2m10thirdcolumn", "ena2m10seengroup", "ena2m10writtengroup", "ena2m10donegroup", "ena2m10boughtsame", "ena2m10hadmade", "ena2m10taken"],
        },
        {
          kind: "note",
          note: {
            title: "Buena noticia: la mitad de la columna te la sabes ya",
            body: "En el módulo 2 aprendiste que los verbos ingleses tienen una <b>segunda forma</b> (el pasado: <i>saw</i>, <i>wrote</i>, <i>went</i>). Hoy aparece la <b>tercera</b>: el <b>participio</b>, que es la que va detrás de <i>have</i>.<br/><br/>Antes de que te asustes, los dos regalos del sistema:<br/><br/><b>1. Todos los regulares tienen la tercera igual que la segunda.</b> [[work → worked → worked|trabajar · trabajó · trabajado]], study → studied → studied, arrive → arrived → arrived. Es decir: para la inmensa mayoría de los verbos, <b>no hay nada nuevo que aprender</b>.<br/><b>2. Muchos irregulares tampoco cambian.</b> Los de <i>-ought</i> y <i>-aught</i> que ya te sabes por familias (buy → bought, think → thought, teach → taught) <b>repiten</b>: bought, thought, taught. Igual que have → had → had, make → made → made, say → said → said.<br/><br/><b>Lo que sí hay que aprender</b> son dos familias y tres cabezotas:<br/>· <b>-en sobre el infinitivo</b>: see → saw → <b>seen</b>, eat → ate → <b>eaten</b>, give → gave → <b>given</b>, take → took → <b>taken</b>.<br/>· <b>-en sobre la vocal del pasado</b>: write → wrote → <b>written</b>, speak → spoke → <b>spoken</b>, break → broke → <b>broken</b>.<br/>· y las tres que van por libre: <b>do → did → done</b>, <b>go → went → gone</b>, <b>be → was/were → been</b>.<br/><br/><b>El error que hay que matar hoy:</b> meter la SEGUNDA columna detrás de have. <i>I have went</i>, <i>she has wrote</i>, <i>we have saw</i> — los tres son el mismo fallo. Detrás de <b>have</b> va siempre la <b>tercera</b>.",
            table: [
              ["infinitivo", "pasado (módulo 2)", "participio (aquí)"],
              ["work", "worked", "worked"],
              ["buy", "bought", "bought"],
              ["say", "said", "said"],
              ["see", "saw", "seen"],
              ["take", "took", "taken"],
              ["write", "wrote", "written"],
              ["do", "did", "done"],
              ["go", "went", "gone"],
              ["be", "was / were", "been"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l2e1", type: "match", prompt: "Empareja el pasado con su participio — primera tanda",
              pairs: [
                { target: "saw", source: "seen" },
                { target: "wrote", source: "written" },
                { target: "went", source: "gone" },
                { target: "did", source: "done" },
              ],
              itemIds: ["ena2m10seengroup", "ena2m10writtengroup", "ena2m10donegroup"],
              tip: "Estos cuatro son los que más caen y los que más se fallan. Si sales de la lección con estos, sales con lo importante.",
            },
            {
              id: "ena2m10l2e2", type: "match", prompt: "Segunda tanda — aquí hay trampa: dos no cambian",
              pairs: [
                { target: "ate", source: "eaten" },
                { target: "took", source: "taken" },
                { target: "bought", source: "bought" },
                { target: "made", source: "made" },
              ],
              itemIds: ["ena2m10seengroup", "ena2m10taken", "ena2m10boughtsame", "ena2m10hadmade"],
              tip: "bought y made emparejan consigo mismos, y no es un error del ejercicio: es la regla. Los de -ought y unos cuantos más repiten la segunda forma.",
            },
            {
              id: "ena2m10l2e3", type: "bucket", prompt: "¿Segunda columna (pasado) o tercera (participio)?",
              categories: ["pasado: va solo", "participio: va detrás de have"],
              items: [
                { text: "saw", bucket: 0 },
                { text: "seen", bucket: 1 },
                { text: "wrote", bucket: 0 },
                { text: "written", bucket: 1 },
                { text: "went", bucket: 0 },
                { text: "gone", bucket: 1 },
                { text: "did", bucket: 0 },
                { text: "done", bucket: 1 },
              ],
              itemIds: ["ena2m10seengroup", "ena2m10writtengroup", "ena2m10donegroup"],
              tip: "Truco para no dudar: las terceras formas SUENAN a acabadas — seen, written, gone, done. Y ninguna de ellas puede aparecer sin have delante.",
            },
            {
              id: "ena2m10l2e4", type: "mc", prompt: "¿Cuál va detrás de have?",
              question: "“I have ___ that film three times.”",
              options: ["seen", "saw", "see"],
              answer: 0,
              whyWrong: [null, "saw es la segunda columna: va sola, sin have («I saw that film yesterday»)", "El infinitivo pelado no lleva marca de nada"],
              itemIds: ["ena2m10seengroup", "ena2m10threetimes"],
            },
            {
              id: "ena2m10l2e5", type: "cloze", prompt: "Completa con el participio",
              text: "Ben has ___ (write) three emails this morning.",
              answers: ["written"],
              translation: "Ben ha escrito tres correos esta mañana.",
              hints: ["La familia de spoken y broken", "wr…"],
              itemIds: ["ena2m10writtengroup", "ena2m2wrotegroup"],
            },
            {
              id: "ena2m10l2e6", type: "cloze", prompt: "Completa con el participio",
              text: "I've ___ (do) all my homework.",
              answers: ["done"],
              translation: "He hecho todos los deberes.",
              hints: ["Una de las tres cabezotas: do → did → …", "d…"],
              itemIds: ["ena2m10donegroup", "enhomework"],
            },
            {
              id: "ena2m10l2e7", type: "transform", prompt: "Del pasado a la experiencia",
              source: "I saw that film.",
              instruction: "Dilo como experiencia, empezando por «I've»",
              answers: ["I've seen that film.", "I have seen that film."],
              translation: "He visto esa película.",
              hints: ["El verbo salta de la segunda columna a la tercera", "I've s…n that film."],
              itemIds: ["ena2m10seengroup"],
            },
            {
              id: "ena2m10l2e8", type: "gapbank", prompt: "Tres participios, con el banco delante",
              text: "I've ___ that film twice. Amy has ___ me a message. Ben has ___ his keys again.",
              answers: ["seen", "written", "lost"],
              bank: ["seen", "written", "lost", "saw", "wrote", "left"],
              translation: "He visto esa película dos veces. Amy me ha escrito un mensaje. Ben ha perdido las llaves otra vez.",
              itemIds: ["ena2m10seengroup", "ena2m10writtengroup", "ena2m2ilostmyphone"],
              tip: "El banco trae saw y wrote a propósito: son las segundas columnas, y detrás de have no pintan nada. lose → lost → lost es de las que repiten.",
            },
            {
              id: "ena2m10l2e9", type: "errorfix", prompt: "Corrige la columna equivocada",
              wrong: "I have went to the doctor.",
              answers: ["I have gone to the doctor.", "I've gone to the doctor."],
              why: "went es la SEGUNDA columna y va sola: «I went to the doctor yesterday». Detrás de have hace falta la tercera, que en go es gone. Es el fallo número uno de este módulo y no se arregla razonando: se arregla teniendo las tres columnas en la cabeza.",
              translation: "He ido al médico.",
              itemIds: ["ena2m10donegroup", "endoctor"],
            },
            {
              id: "ena2m10l2e10", type: "errorfix", prompt: "Y el mismo fallo con otro verbo",
              wrong: "She has wrote to me twice.",
              answers: ["She has written to me twice.", "She's written to me twice."],
              why: "wrote es el pasado (She wrote to me last week). El participio de write es written, con dos tes y sin la -o- larga. Su familia entera funciona igual: spoke → spoken, broke → broken.",
              translation: "Me ha escrito dos veces.",
              itemIds: ["ena2m10writtengroup", "entwice"],
            },
            {
              id: "ena2m10l2e11", type: "listen", prompt: "Dictado — dos participios seguidos",
              text: "I've eaten and I've taken my keys.",
              translation: "He comido y he cogido las llaves.",
              hints: ["eat → ate → … y take → took → …", "I've ea…n and I've ta…n my keys."],
              itemIds: ["ena2m10seengroup", "ena2m10taken", "ena2m2mykeys"],
            },
            {
              id: "ena2m10l2e12", type: "fastmatch", prompt: "Ráfaga de terceras columnas",
              pairs: [
                { target: "see", source: "seen" },
                { target: "write", source: "written" },
                { target: "go", source: "gone" },
                { target: "do", source: "done" },
                { target: "take", source: "taken" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m10seengroup", "ena2m10writtengroup", "ena2m10donegroup", "ena2m10taken"],
              tip: "El cronómetro aquí solo premia. Estas cinco tienen que salir sin pensar, porque en una conversación no hay tiempo de consultar una tabla.",
            },
            {
              id: "ena2m10l2e13", type: "type", prompt: "Cierre de producción",
              question: "He hecho los deberes y he escrito dos correos.",
              answers: [
                "I've done my homework and I've written two emails.",
                "I have done my homework and I have written two emails.",
                "I've done my homework and written two emails.",
                "I've done the homework and I've written two emails.",
              ],
              hints: ["Dos terceras columnas: do → … y write → …", "I've d…e my homework and I've wr…n two emails."],
              itemIds: ["ena2m10donegroup", "ena2m10writtengroup", "enhomework", "enemail"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-2",
            book: "I have finished.",
            real: "I'm done.",
            meaning: "Ya está / He terminado",
            when: "Entre amigos y compañeros: acabas la comida, el turno o una tarea. Es cortísima y clarísima. Ojo, no es el participio de este módulo haciendo de perfecto: es done funcionando como adjetivo, «listo». En el examen escrito, I've finished.",
            register: "amigos",
            note: "Su gemela para preguntar es «Are you done?» — «¿has acabado?». Y en un restaurante, «Are you done with that?» significa «¿se lo retiro?».",
            sound: "áim DAN",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Irregular verbs", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/irregular-verbs", note: "Mira la tabla 10 minutos, pero solo la TERCERA columna, tapando las otras dos. Y por familias, nunca por orden alfabético." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — been vs gone
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l3",
      phaseId: "ena2m10",
      title: "Been or gone?",
      subtitle: "Dos participios de «ir», y solo uno significa que has vuelto",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Ir y volver, o irse y no estar",
          itemIds: ["ena2m10ivebeento", "ena2m10shesgoneto", "ena2m10haveyoueverbeenabroad", "ena2m10abroad", "ena2m10wherehaveyoubeen", "enlondon"],
        },
        {
          kind: "note",
          note: {
            title: "been = fui y volví · gone = se fue y sigue allí",
            body: "El inglés tiene <b>dos participios</b> para hablar de viajes, y la diferencia no es de gramática: es de <b>dónde está la persona ahora</b>.<br/><br/><b>have been to</b> = «he estado en» → <b>fuiste y ya has vuelto</b>. Es una experiencia tuya.<br/>· [[I've been to Edinburgh twice.|He estado en Edimburgo dos veces.]] — estoy aquí contándotelo.<br/>· <i>Have you ever been to Spain?</i><br/><br/><b>have gone to</b> = «se ha ido a» → <b>se fue y NO está aquí</b>. Es una ausencia.<br/>· [[Amy has gone to the hospital.|Amy se ha ido al hospital.]] — no la busques, no está.<br/><br/>Por eso hay una frase que casi nunca se dice: <i>I have gone to…</i>. Si estás hablando conmigo, es que has vuelto. Se puede decir de <b>otra persona</b>, no de ti.<br/><br/><b>Dos detalles que cuestan puntos:</b><br/>1. <b>been TO</b>, no <i>been in</i>, cuando cuentas la visita: <i>I've been <b>to</b> London</i>. (Con <i>in</i> significa «he estado dentro un rato»: otra cosa.)<br/>2. <b>abroad va a pelo</b>: <i>Have you ever been [[abroad|al extranjero]]?</i> — nunca <i>to abroad</i>, igual que <i>home</i> no lleva <i>to</i> en «I'm going home».<br/><br/>Y una que oirás a diario: <b>[[Where have you been?|¿Dónde te habías metido?]]</b> — es reproche cariñoso, no una pregunta de geografía.",
            table: [
              ["frase", "¿dónde está?", "significado"],
              ["She's been to the bank.", "aquí", "fue y ya ha vuelto"],
              ["She's gone to the bank.", "en el banco", "se ha ido, no está"],
              ["I've been to Mexico.", "aquí", "lo conozco, es mi experiencia"],
              ["Ben has gone to Mexico.", "en México", "está allí ahora"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l3e1", type: "mc", prompt: "«¿Dónde está Amy?» — «Se ha ido al hospital»",
              question: "¿Cuál es la buena?",
              options: ["Amy has gone to the hospital.", "Amy has been to the hospital.", "Amy has went to the hospital."],
              answer: 0,
              whyWrong: [null, "Esa diría que ya ha vuelto, y entonces la pregunta no tendría sentido", "went es la segunda columna: detrás de has hace falta la tercera"],
              itemIds: ["ena2m10shesgoneto"],
              tip: "La pregunta era «¿dónde está?». Si la respuesta es gone, no está. Si es been, está aquí.",
            },
            {
              id: "ena2m10l3e2", type: "bucket", prompt: "¿La persona está aquí o sigue fuera?",
              categories: ["está aquí (been)", "sigue fuera (gone)"],
              items: [
                { text: "I've been to Paris three times.", bucket: 0 },
                { text: "Ben has gone to Manchester for the weekend.", bucket: 1 },
                { text: "Have you ever been abroad?", bucket: 0 },
                { text: "Sam has gone to the bank, he'll be back at four.", bucket: 1 },
                { text: "We've been to that café before.", bucket: 0 },
                { text: "My parents have gone to Colombia.", bucket: 1 },
              ],
              itemIds: ["ena2m10ivebeento", "ena2m10shesgoneto", "ena2m10haveyoueverbeenabroad"],
              tip: "Clasificar por «¿está o no está?» es mucho más rápido que pensar en participios. La gramática viene detrás del significado, no al revés.",
            },
            {
              id: "ena2m10l3e3", type: "cloze", prompt: "Completa el participio",
              text: "Have you ever ___ to London?",
              answers: ["been"],
              translation: "¿Has estado alguna vez en Londres?",
              hints: ["Le preguntas por su experiencia: fue y volvió", "b…"],
              itemIds: ["ena2m10ivebeento", "enlondon"],
            },
            {
              id: "ena2m10l3e4", type: "cloze", prompt: "Y ahora el otro",
              text: "Sam isn't here. He has ___ to the supermarket.",
              answers: ["gone"],
              translation: "Sam no está. Se ha ido al supermercado.",
              hints: ["«No está» ya te lo dice todo", "g…"],
              itemIds: ["ena2m10shesgoneto", "ensupermarket"],
            },
            {
              id: "ena2m10l3e5", type: "match", prompt: "Empareja cada frase con lo que significa de verdad",
              pairs: [
                { target: "She's been to the shop.", source: "ya ha vuelto, con la compra" },
                { target: "She's gone to the shop.", source: "no está: está en la tienda" },
                { target: "I've never been abroad.", source: "no he salido nunca del país" },
                { target: "Where have you been?", source: "¿dónde te habías metido?" },
              ],
              itemIds: ["ena2m10ivebeento", "ena2m10shesgoneto", "ena2m10abroad", "ena2m10wherehaveyoubeen"],
            },
            {
              id: "ena2m10l3e6", type: "transform", prompt: "Cámbialo de sentido",
              source: "Amy has gone to the hospital.",
              instruction: "Dilo de forma que se entienda que YA HA VUELTO",
              answers: ["Amy has been to the hospital.", "Amy's been to the hospital."],
              translation: "Amy ha estado en el hospital (y ya ha vuelto).",
              hints: ["Solo cambia el participio", "Amy has b…n to the hospital."],
              itemIds: ["ena2m10ivebeento", "ena2m10shesgoneto"],
              tip: "Una palabra, y la escena entera cambia: en una está en la cama del hospital, en la otra está sentada contándotelo.",
            },
            {
              id: "ena2m10l3e7", type: "errorfix", prompt: "Corrige el participio",
              wrong: "I've gone to Edinburgh twice.",
              answers: ["I've been to Edinburgh twice.", "I have been to Edinburgh twice."],
              why: "Si me lo estás contando, es que has vuelto: eso es been. «I've gone to Edinburgh» diría que sigues allí, y entonces no podrías estar diciéndomelo. Con gone se habla de otra persona, casi nunca de uno mismo.",
              translation: "He estado en Edimburgo dos veces.",
              itemIds: ["ena2m10ivebeento", "entwice"],
            },
            {
              id: "ena2m10l3e8", type: "errorfix", prompt: "Corrige la preposición",
              wrong: "Have you ever been to abroad?",
              answers: ["Have you ever been abroad?"],
              why: "abroad ya lleva dentro la idea de «a otro país», así que no admite to delante. Funciona como home: se dice «I'm going home», no «to home». La lista de palabras así es corta: home, abroad, here, there, upstairs, downstairs.",
              translation: "¿Has salido alguna vez al extranjero?",
              itemIds: ["ena2m10abroad", "ena2m10haveyoueverbeenabroad"],
            },
            {
              id: "ena2m10l3e9", type: "build", prompt: "Construye la frase de la ausencia",
              target: "Ben has gone to Mexico for a month",
              translation: "Ben se ha ido a México un mes",
              distractors: ["been", "went"],
              itemIds: ["ena2m10shesgoneto", "enmexico", "enmonth"],
            },
            {
              id: "ena2m10l3e10", type: "audiomc", prompt: "Escucha dos veces, como en el examen",
              audio: "Sorry, Amy isn't here. She's gone to the station to meet her mum.",
              question: "¿Dónde está Amy?",
              options: ["En la estación", "En casa", "Ha estado en la estación y ya ha vuelto"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "El audio empieza diciendo justo lo contrario: isn't here", "Eso sería «she's been to the station»; lo que suena es gone"],
              itemIds: ["ena2m10shesgoneto", "enstation"],
              tip: "En el Listening, been y gone deciden preguntas enteras de «¿dónde está X?». Una sílaba de diferencia y la respuesta se da la vuelta.",
            },
            {
              id: "ena2m10l3e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "¿Has estado alguna vez en el extranjero? — No, nunca.",
              answers: [
                "Have you ever been abroad? No, never.",
                "Have you ever been abroad? No, I haven't.",
                "Have you ever been abroad? No, I've never been abroad.",
              ],
              hint: "la palabra de «extranjero» no lleva preposición delante",
              itemIds: ["ena2m10haveyoueverbeenabroad", "ena2m10abroad", "ena2m10yesihave"],
            },
            {
              id: "ena2m10l3e12", type: "type", prompt: "Cierre de producción — las dos caras en una frase",
              question: "He estado en Londres dos veces, pero mi hermana se ha ido a vivir allí.",
              answers: [
                "I've been to London twice, but my sister has gone to live there.",
                "I have been to London twice, but my sister has gone to live there.",
                "I've been to London twice, but my sister's gone to live there.",
              ],
              hints: ["Yo he vuelto (been); ella no (gone)", "I've b…n to London twice, but my sister has g…e to live there."],
              itemIds: ["ena2m10ivebeento", "ena2m10shesgoneto", "enlondon", "ensister"],
              tip: "Los dos participios de un mismo verbo en la misma frase, y cada uno cuenta dónde está una persona distinta. Ahí se ve para qué sirve la diferencia.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Been or gone?", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/been-gone", note: "Diez minutos. Al terminar, di en voz alta dónde has estado tú y adónde se ha ido alguien de tu casa: dos frases, una de cada." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — just / already / yet
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l4",
      phaseId: "ena2m10",
      title: "Just, already, yet",
      subtitle: "Acabo de, ya, todavía no — y dónde se coloca cada uno",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Las noticias del día",
          itemIds: ["ena2m10ivejustfinished", "ena2m10ivealreadyseenit", "ena2m10haveyoufinishedyet", "ena2m10notyet", "ena2m10shehasntcalledyet", "ena2m10recently"],
        },
        {
          kind: "note",
          note: {
            title: "Tres palabras, tres sitios, tres tipos de frase",
            body: "Estas tres viven pegadas al present perfect y cada una tiene su casilla. Aprende el <b>sitio</b> a la vez que el significado, porque colocarlas mal es el segundo error del bloque.<br/><br/><b>just</b> = «acabo de». Va <b>entre have y el participio</b>.<br/>· [[I've just finished my homework.|Acabo de terminar los deberes.]] · <i>She's just arrived.</i><br/><br/><b>already</b> = «ya», antes de lo que esperabas. También <b>entre have y el participio</b>. Aparece en afirmativas y en preguntas de sorpresa.<br/>· [[I've already seen that film.|Ya he visto esa película.]] · <i>Have you already finished?</i> (= ¿tan pronto?)<br/><br/><b>yet</b> = «todavía» / «ya», y es la rara: solo sale en <b>negativas y preguntas</b>, y va <b>al final de la frase</b>.<br/>· [[Have you finished yet?|¿Ya has terminado?]] · <i>She hasn't called me yet.</i> · [[Not yet.|Todavía no.]]<br/><br/><b>El error de colocación:</b> <i>She hasn't called yet me</i> — no. yet cierra la frase, siempre. Y <i>I just have finished</i> tampoco: just va DESPUÉS del auxiliar, no delante.<br/><br/><b>Y ahora la mitad que casi nadie te cuenta.</b> Si tú dirías «<i>¿ya terminaste?</i>» y «<i>recién llegué</i>» —como se dice en gran parte de Latinoamérica—, tu instinto te va a llevar al pasado simple: <i>Did you finish yet?</i>, <i>I just arrived</i>. En inglés americano eso pasa; en el inglés británico que enseña este curso y que corrigen en tu examen, <b>lo esperado es el perfecto</b>: <i>Have you finished yet?</i>, <i>I've just arrived</i>. Y si tú dirías «<i>ya he terminado</i>» y «<i>acabo de llegar</i>» —como se dice en España—, aquí tu instinto acierta: es de las pocas veces en este módulo que juega a tu favor. Aprovéchalo, porque en la lección siguiente el instinto español cambia de bando.",
            table: [
              ["palabra", "significado", "dónde va", "tipo de frase"],
              ["just", "acabo de", "entre have y el participio", "afirmativa"],
              ["already", "ya (antes de lo previsto)", "entre have y el participio", "afirmativa y pregunta de sorpresa"],
              ["yet", "todavía no / ¿ya?", "AL FINAL", "negativa y pregunta"],
              ["recently", "hace poco", "al final (o al principio)", "cualquiera"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l4e1", type: "mc", prompt: "«Acabo de llegar»",
              question: "¿Cuál es la del examen británico?",
              options: ["I've just arrived.", "I just arrived.", "I have arrived just."],
              answer: 0,
              whyWrong: [null, "Así se dice en inglés americano y en media Latinoamérica, y se entiende; en el inglés que te corrigen aquí, lo esperado es el perfecto", "just no se va al final: ese sitio es de yet"],
              itemIds: ["ena2m10ivejustfinished", "ena2m1arrived"],
              tip: "Si tú dirías «recién llegué», tu oído te va a pedir la segunda. No es que esté prohibida en el mundo: es que no es la que puntúa aquí.",
            },
            {
              id: "ena2m10l4e2", type: "bucket", prompt: "¿En medio o al final?",
              categories: ["entre have y el participio", "al final de la frase"],
              items: [
                { text: "just", bucket: 0 },
                { text: "already", bucket: 0 },
                { text: "yet", bucket: 1 },
                { text: "never", bucket: 0 },
                { text: "ever", bucket: 0 },
                { text: "recently", bucket: 1 },
              ],
              itemIds: ["ena2m10ivejustfinished", "ena2m10ivealreadyseenit", "ena2m10haveyoufinishedyet", "ena2m10recently", "ennever"],
              tip: "Cuatro de estas viven en el mismo hueco: el que queda entre el auxiliar y el verbo. Es el mismo sitio del adverbio de frecuencia del A1 (I always get up at seven).",
            },
            {
              id: "ena2m10l4e3", type: "cloze", prompt: "Completa",
              text: "I've ___ seen that film — twice, de hecho.",
              answers: ["already"],
              translation: "Ya he visto esa película, y dos veces además.",
              hints: ["«Ya», y antes de lo que el otro esperaba", "al…"],
              itemIds: ["ena2m10ivealreadyseenit", "entwice"],
            },
            {
              id: "ena2m10l4e4", type: "cloze", prompt: "Completa — cuidado con cuál de las tres es",
              text: "She hasn't called me ___.",
              answers: ["yet"],
              translation: "Todavía no me ha llamado.",
              hints: ["Frase negativa y hueco al final: solo cabe una", "y…"],
              itemIds: ["ena2m10shehasntcalledyet", "ena2m10notyet"],
            },
            {
              id: "ena2m10l4e5", type: "mc", prompt: "La pregunta de «¿ya has terminado?»",
              question: "¿Cuál escribirías en el examen?",
              options: ["Have you finished yet?", "Did you finish yet?", "Have you yet finished?"],
              answer: 0,
              whyWrong: [null, "Es la que sale sola si tú dices «¿ya terminaste?», y por eso hay que vigilarla: el británico pide el perfecto", "yet no se cuela en medio; su sitio es el final"],
              itemIds: ["ena2m10haveyoufinishedyet"],
            },
            {
              id: "ena2m10l4e6", type: "transform", prompt: "Ponle just",
              source: "I've finished my homework.",
              instruction: "Añade «just» en su sitio",
              answers: ["I've just finished my homework.", "I have just finished my homework."],
              translation: "Acabo de terminar los deberes.",
              hints: ["Entre el auxiliar y el verbo", "I've j… finished my homework."],
              itemIds: ["ena2m10ivejustfinished", "enhomework"],
            },
            {
              id: "ena2m10l4e7", type: "errorfix", prompt: "Corrige la colocación",
              wrong: "She hasn't called yet me.",
              answers: ["She hasn't called me yet."],
              why: "yet cierra la frase entera, y el objeto va pegado a su verbo: called me. Es la misma regla del módulo 3 —nunca separes el verbo de su objeto—, aplicada a otro adverbio.",
              translation: "Todavía no me ha llamado.",
              itemIds: ["ena2m10shehasntcalledyet"],
            },
            {
              // Va de `transform` y no de `errorfix` a propósito: cambiar
              // «Did you finish» por «Have you finished» mueve DOS palabras, y
              // un errorfix con dos cambios ya no es un error, es otra frase
              // (el validador lo rechaza con razón). Aquí lo que se pide es
              // justamente rehacer la pregunta entera, que es la operación real.
              id: "ena2m10l4e8", type: "transform", prompt: "Este es el sesgo latinoamericano: dilo como lo pide el examen",
              source: "Did you finish yet?",
              instruction: "Con Have you…? + yet",
              answers: ["Have you finished yet?", "Have you finished yet"],
              tip: "yet pide el perfecto en el inglés británico, porque señala algo que sigue pendiente AHORA. Si tú dirías «¿ya terminaste?», te va a salir did y suena natural en América; si dirías «¿ya has terminado?», ya estabas en lo correcto. En el examen, la fórmula es Have you…? + yet.",
              translation: "¿Ya has terminado?",
              itemIds: ["ena2m10haveyoufinishedyet"],
            },
            {
              id: "ena2m10l4e9", type: "order", prompt: "Ordena la mañana de Valeria, de lo primero a lo último",
              sentences: [
                "Valeria got up at seven and had a shower.",
                "She's already had breakfast with Amy.",
                "She's just finished her homework.",
                "She hasn't phoned the school yet.",
                "She wants to do it before her shift at the café.",
              ],
              translation: "Valeria se levantó a las siete y se duchó. Ya ha desayunado con Amy. Acaba de terminar los deberes. Todavía no ha llamado a la escuela. Quiere hacerlo antes de su turno en el café.",
              itemIds: ["ena2m10ivealreadyseenit", "ena2m10ivejustfinished", "ena2m10shehasntcalledyet", "enhavebreakfast"],
              tip: "Fíjate en el orden que dibujan las tres palabras: already es lo más antiguo, just es lo de ahora mismo y yet es lo que aún no ha pasado. Son una línea del tiempo en miniatura.",
            },
            {
              id: "ena2m10l4e10", type: "listen", prompt: "Dictado",
              text: "I've already seen it, but I haven't finished it yet.",
              translation: "Ya la he visto, pero todavía no la he terminado.",
              hints: ["already en medio, yet al final", "I've al… seen it, but I haven't finished it y…"],
              itemIds: ["ena2m10ivealreadyseenit", "ena2m10haveyoufinishedyet"],
            },
            {
              id: "ena2m10l4e11", type: "audiomc", prompt: "Escucha dos veces — la pregunta es de estado, no de dato",
              audio: "I've already sent the email, but Amy hasn't replied yet.",
              question: "¿Qué falta por pasar?",
              options: ["La respuesta de Amy", "Enviar el correo", "Nada, está todo hecho"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Eso ya está: lo dice already al principio", "El yet del final avisa de que queda algo pendiente"],
              itemIds: ["ena2m10ivealreadyseenit", "ena2m10shehasntcalledyet", "enemail"],
              tip: "already y yet reparten la frase en dos: lo hecho y lo pendiente. Si cazas esas dos palabras, no necesitas entender el resto.",
            },
            {
              id: "ena2m10l4e12", type: "speak", prompt: "Dilo en voz alta — las tres seguidas",
              text: "I've just arrived. I've already had coffee, but I haven't eaten yet.",
              phonetic: "áiv dchast a-RÁIVD. áiv ool-RÉ-di jad KO-fi, bat ái JÁ-vent ÍI-ten yet",
              translation: "Acabo de llegar. Ya me he tomado un café, pero todavía no he comido.",
              itemIds: ["ena2m10ivejustfinished", "ena2m10ivealreadyseenit", "ena2m10haveyoufinishedyet", "encoffee"],
              tip: "Ojo a «just»: en inglés británico suena «dchast», con la vocal corta de cup. Nada de «yast» ni de «yust».",
            },
            {
              id: "ena2m10l4e13", type: "type", prompt: "Cierre de producción",
              question: "Acabo de llegar y todavía no he desayunado.",
              answers: [
                "I've just arrived and I haven't had breakfast yet.",
                "I have just arrived and I haven't had breakfast yet.",
                "I've just arrived and I haven't had breakfast yet!",
                "I've just arrived, and I haven't had breakfast yet.",
              ],
              hints: ["just en medio, yet al final", "I've j… arrived and I haven't had breakfast y…"],
              itemIds: ["ena2m10ivejustfinished", "ena2m10haveyoufinishedyet", "enbreakfast"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Present perfect: just, already, yet", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/present-perfect", note: "Baja hasta el apartado de just/already/yet y haz los huecos. Si fallas alguno, mira si fue por el significado o por el SITIO: casi siempre es lo segundo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: 've, 's y el have átono
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l5",
      phaseId: "ena2m10",
      title: "The disappearing have",
      subtitle: "Clínica de sonido: 've, 's y el have que casi no suena",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Lo que el oído tiene que cazar",
          itemIds: ["ena2m10iveweak", "ena2m10hesshesweak", "ena2m10haveyouweak", "ena2m10haventhasnt"],
        },
        {
          kind: "note",
          note: {
            title: "El tiempo verbal que se oye menos de todo el inglés",
            body: "Esta clínica no es de adorno: es <b>la razón por la que se pierde el perfecto en el Listening</b>.<br/><br/>Un inglés no dice <i>I have seen it</i>. Dice <b>I've seen it</b>, y esa <b>'ve</b> es una <b>v</b> pegada al sujeto, sin vocal, que dura menos que un parpadeo. Si no la cazas, oyes <i>I seen it</i> — y traduces un presente donde había un perfecto.<br/><br/><b>Las cuatro formas que hay que reconocer:</b><br/>1. <b>'ve</b> pegada al sujeto: <i>I've</i> «áiv», <i>you've</i> «yuuv», <i>we've</i> «uiv», <i>they've</i> «déiv».<br/>2. <b>'s</b> en tercera persona: <i>he's</i> «jíis̬», <i>she's</i> «shíis̬».<br/>3. En <b>pregunta</b>, <i>have</i> pierde la jota y se pega al sujeto: <i>Have you seen it?</i> → «<b>av-yu</b> síin it».<br/>4. En <b>negativa</b>, en cambio, <b>suena fuerte</b>: <b>haven't</b> «JÁ-vent», <b>hasn't</b> «JÁ-s̬ent». El inglés acentúa la negación siempre.<br/><br/><b>Y ahora el par que decide todo:</b> esa <b>'s</b> puede ser <b>is</b> o <b>has</b>, y suenan igual. ¿Cómo se sabe? <b>Por lo que viene detrás</b>:<br/>· <i>He's <b>working</b>.</i> → <b>is</b> + -ing → está trabajando ahora.<br/>· <i>He's <b>worked</b> here for years.</i> → <b>has</b> + participio → lleva años trabajando.<br/><br/>No hay que adivinarlo: se mira la palabra siguiente. Y si es <i>been</i>, es <b>has</b> seguro, porque <i>is been</i> no existe.<br/><br/><b>Última pieza:</b> en el habla rápida, <i>have</i> tras un participio con -n se funde del todo: <i>Where have you been?</i> suena casi «<b>uéa-vyu-bíin</b>». Es una sola cosa, no cuatro palabras.",
            table: [
              ["escrito", "suena", "qué es"],
              ["I have seen it.", "áiv SÍIN it", "'ve átona: casi no está"],
              ["He's working.", "jíis̬ UÉE-king", "is → ahora mismo"],
              ["He's worked here.", "jíis̬ UÉEKT jía", "has → experiencia"],
              ["Have you seen it?", "av-yu SÍIN it", "have sin jota, pegado a you"],
              ["I haven't seen it.", "ái JÁ-vent SÍIN it", "la negación SÍ se oye"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l5e1", type: "mc", prompt: "La 's que hay que desambiguar",
              question: "“He's worked in three countries.” — ese 's es…",
              options: ["has", "is", "was"],
              answer: 0,
              whyWrong: [null, "«is worked» no existe: detrás de is iría -ing (he's working)", "was no se contrae nunca en 's"],
              itemIds: ["ena2m10hesshesweak", "ena2m10shesworkedin"],
              tip: "La regla es de la palabra siguiente, no del oído: -ing → is · participio → has. Nunca al revés.",
            },
            {
              id: "ena2m10l5e2", type: "bucket", prompt: "¿Ese 's es IS o es HAS? Míralo por lo que viene detrás",
              categories: ["'s = is (ahora)", "'s = has (experiencia)"],
              items: [
                { text: "She's cooking dinner.", bucket: 0 },
                { text: "She's cooked dinner.", bucket: 1 },
                { text: "He's been to Spain.", bucket: 1 },
                { text: "He's at the station.", bucket: 0 },
                { text: "Amy's finished her shift.", bucket: 1 },
                { text: "Amy's very tired.", bucket: 0 },
              ],
              itemIds: ["ena2m10hesshesweak", "ena2m10ivebeento"],
              tip: "Los dos primeros se diferencian en UNA letra escrita y en nada al oído: cooking / cooked. Por eso este ejercicio se hace con los ojos antes que con las orejas.",
            },
            {
              id: "ena2m10l5e3", type: "hearreal", prompt: "¿Libro o calle?",
              book: "I have seen it.",
              real: "I've seen it.",
              translation: "Lo he visto.",
              itemIds: ["ena2m10iveweak", "ena2m10seengroup"],
              tip: "La forma larga solo se dice cuando quieres insistir («I HAVE seen it, I promise»). En todo lo demás, la contracción.",
            },
            {
              id: "ena2m10l5e4", type: "hearreal", prompt: "¿Libro o calle? La pregunta, a velocidad real",
              book: "Have you seen it?",
              real: "Seen it?",
              translation: "¿Lo has visto?",
              itemIds: ["ena2m10haveyouweak"],
              tip: "En la calle desaparece el auxiliar entero. Tú no tienes que producirlo así, pero sí reconocerlo: es la forma normal de preguntar entre amigos.",
            },
            {
              id: "ena2m10l5e5", type: "hearreal", prompt: "¿Qué significa lo que has oído?",
              book: "He has worked here for years.",
              real: "He's worked here for years.",
              translation: "Lleva años trabajando aquí.",
              ask: "meaning",
              meaningOptions: ["Lleva años trabajando aquí", "Está trabajando aquí ahora mismo", "Trabajaba aquí y ya no"],
              itemIds: ["ena2m10hesshesweak", "ena2m10howlonghaveyou"],
              tip: "Lo que descarta las otras dos es worked: con is iría working, y si ya no trabajara aquí sería «he worked here for years», en pasado simple y sin has.",
            },
            {
              id: "ena2m10l5e6", type: "listen", prompt: "Dictado — escribe la contracción tal cual suena",
              text: "I've been there twice.",
              translation: "He estado allí dos veces.",
              strictContractions: true,
              hints: ["Empieza por una sola sílaba: sujeto + v", "I'v… been there twice."],
              itemIds: ["ena2m10iveweak", "ena2m10ivebeento", "entwice"],
              tip: "Aquí sí se te exige la contracción: has oído «áiv», no «ái jav», y transcribir lo que sonó es la mitad del trabajo del Listening.",
            },
            {
              id: "ena2m10l5e7", type: "listen", prompt: "Dictado — y ahora la negativa, que sí se oye entera",
              text: "She hasn't finished yet.",
              translation: "Todavía no ha terminado.",
              strictContractions: true,
              hints: ["El auxiliar negativo de she", "She ha…'t finished yet."],
              itemIds: ["ena2m10haventhasnt", "ena2m10shehasntcalledyet"],
            },
            {
              id: "ena2m10l5e8", type: "shadow", prompt: "Sombrea la cadena de contracciones — primero lento, luego a velocidad normal",
              text: "I've seen it, she's seen it, they've all seen it.",
              phonetic: "áiv SÍIN it, shíis̬ SÍIN it, déiv ool SÍIN it",
              translation: "Yo la he visto, ella la ha visto, la han visto todos.",
              reps: 2,
              itemIds: ["ena2m10iveweak", "ena2m10hesshesweak", "ena2m10seengroup"],
              tip: "Tres auxiliares en una frase y ninguno con vocal propia. Si te sale sin meter una «e» delante de la v, la clínica está funcionando.",
            },
            {
              id: "ena2m10l5e9", type: "shadow", prompt: "Sombrea la pregunta fundida",
              text: "Where have you been?",
              phonetic: "uéa-vyu BÍIN",
              translation: "¿Dónde te habías metido?",
              reps: 2,
              itemIds: ["ena2m10wherehaveyoubeen", "ena2m10haveyouweak"],
              tip: "Cuatro palabras escritas, dos golpes de voz reales. El acento cae entero en been; todo lo demás es rampa.",
            },
            {
              id: "ena2m10l5e10", type: "audiomc", prompt: "Escucha dos veces — decide si es presente o experiencia",
              audio: "Ben's driven that bus for ten years.",
              question: "¿Qué se dice de Ben?",
              options: ["Lleva diez años conduciendo ese autobús", "Está conduciendo el autobús ahora", "Va a conducir el autobús diez años"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Para eso haría falta driving, no driven", "El futuro no suena por ninguna parte"],
              itemIds: ["ena2m10hesshesweak", "ena2m10howlonghaveyou", "enbus"],
              tip: "driven es participio, así que ese 's solo puede ser has. La forma del verbo desambigua el auxiliar: es el truco que salva estas preguntas.",
            },
            {
              id: "ena2m10l5e11", type: "speak", prompt: "Di el contraste, con el desnivel bien marcado",
              text: "She's working today, but she's worked here for years.",
              phonetic: "shíis̬ UÉE-king tu-DÉI, bat shíis̬ UÉEKT jía fo YÍAS̬",
              translation: "Hoy está trabajando, pero lleva años trabajando aquí.",
              itemIds: ["ena2m10hesshesweak", "ena2m10howlonghaveyou"],
              tip: "Las dos mitades empiezan igual y significan cosas distintas. La diferencia la lleva entera la terminación del verbo, no el auxiliar.",
            },
            {
              id: "ena2m10l5e12", type: "type", prompt: "Cierre — escríbelo con las contracciones",
              question: "Lo he visto, pero ella todavía no lo ha visto.",
              answers: [
                "I've seen it, but she hasn't seen it yet.",
                "I've seen it but she hasn't seen it yet.",
                "I've seen it, but she hasn't seen it yet!",
              ],
              hints: ["'ve en la primera mitad, hasn't en la segunda", "I'v… seen it, but she ha…'t seen it yet."],
              itemIds: ["ena2m10iveweak", "ena2m10haventhasnt", "ena2m10haveyoufinishedyet"],
              tip: "Fíjate en el desnivel de la frase: la primera mitad se dice en un suspiro y la segunda golpea en hasn't. Ese es el ritmo que hay que copiar.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-5",
            book: "I have not seen him.",
            real: "I've not seen him.",
            meaning: "No lo he visto",
            when: "Muy británico, sobre todo en el norte y en Escocia: en vez de contraer el not (haven't), se contrae el have y el not queda suelto. Las dos son correctas y las dos se escriben. En el examen, cualquiera de las dos vale.",
            register: "regional",
            note: "Es una de las pocas veces en que el inglés te deja elegir dónde poner la contracción. Un londinense dirá «I haven't seen him»; un mancuniano, «I've not seen him».",
            sound: "áiv not SÍIN jim",
            level: "a2",
          },
        },
      ],
      resources: [
        { label: "British Council — Contractions", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/contractions", note: "Cinco minutos leyendo y diez repitiendo en voz alta. Fíjate en la lista de 's ambiguas: es la que decide la mitad de las preguntas de Listening." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — LA lección: perfecto contra pasado simple
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l6",
      phaseId: "ena2m10",
      title: "Yesterday or so far?",
      subtitle: "La frontera de verdad: cuándo el inglés NO te deja usar el perfecto",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "El tiempo cerrado y el tiempo abierto",
          itemIds: ["ena2m10isawherlastweek", "ena2m10iveseenherthisweek", "ena2m10whendidithappen", "ena2m10thisweekthisyear", "ena2m10threetimes", "enyesterday", "ena2m1lastweek", "ena2m1twodaysago"],
        },
        {
          kind: "note",
          note: {
            title: "Tu español te va a engañar — y de dos maneras opuestas",
            body: "Esta es la lección más importante del módulo, y no es de gramática inglesa: es de <b>dónde te criaste</b>.<br/><br/><b>Si tú dirías «hoy he ido al médico», «esta mañana he desayunado tarde»</b> —o sea, si hablas como en España—, tu instinto <b>sobreusa</b> el perfecto. Vas a escribir <i>I have gone to the doctor</i> donde el inglés no lo admite, y vas a producir la frase más marcada de todas: <b><i>I have seen him yesterday</i></b>.<br/><br/><b>Si tú dirías «hoy fui al médico», «esta mañana desayuné tarde»</b> —o sea, si hablas como en la mayor parte de Latinoamérica—, tu instinto <b>infrausa</b> el perfecto. Vas a decir <i>Did you finish yet?</i> y <i>I just arrived</i>, y vas a contar tu experiencia de vida en pasado simple: <i>I never went to London</i> en vez de <i>I've never been to London</i>.<br/><br/><b>Y aquí va la aclaración que casi todos los manuales se saltan:</b> «<i>he ido AYER</i>» <b>no</b> es correcto tampoco en España. <i>Ayer</i> cierra el periodo y pide indefinido en todas partes del mundo hispanohablante. Lo que cambia de una orilla a otra es el periodo <b>abierto</b> —hoy, esta semana, este año—, no el cerrado. Así que la trampa española no es «el español permite todo»: es que <b>el reparto español no coincide con el inglés</b>, y en cada orilla falla por un lado distinto.<br/><br/><b>La solución no es pensar. Es mirar el marcador.</b><br/><br/>El inglés no decide por el sentimiento de cercanía, decide por una pregunta mecánica: <b>¿el periodo de tiempo ha terminado o sigue abierto?</b><br/><br/>· <b>Terminado → pasado simple, SIEMPRE</b>: yesterday, last week, last year, two days ago, in 2019, when I was a child, at six o'clock.<br/>· <b>Abierto o sin decir → present perfect</b>: ever, never, just, already, yet, so far, recently, this week, this month, this year, today, three times.<br/><br/>[[I saw Amy last week.|Vi a Amy la semana pasada.]] — la semana pasada acabó.<br/>[[I've seen Amy this week.|He visto a Amy esta semana.]] — esta semana sigue.<br/><br/>Y una regla de bolsillo que vale oro en el examen: <b>si preguntas «cuándo», es pasado simple</b>. [[When did it happen?|¿Cuándo pasó?]] — nunca <i>When have you seen her?</i>, porque preguntar <i>cuándo</i> ya cierra el periodo.<br/><br/><b>Cómo se usan los dos juntos, que es lo que hace un nativo:</b> se abre con el perfecto (la noticia, sin fecha) y se sigue en pasado simple (los detalles, con fecha).<br/><i>I've been to Scotland!</i> — <i>Really? When did you go?</i> — <i>I went in 2022, with Ben.</i>",
            table: [
              ["marcador", "tiempo verbal", "ejemplo"],
              ["yesterday · last week · …ago · in 2019", "pasado simple", "I saw Amy last week."],
              ["when…?", "pasado simple", "When did it happen?"],
              ["ever · never · three times", "present perfect", "I've never been to Scotland."],
              ["just · already · yet · recently", "present perfect", "I've just arrived."],
              ["this week · this month · today", "present perfect", "I've seen Amy this week."],
              ["so far", "present perfect", "I've read two books so far."],
            ],
            viz: {
              kind: "timeline",
              pastLabel: "last week (cerrado)",
              pastExample: "I saw Amy last week.",
              nowLabel: "this week (abierto)",
              nowExample: "I've seen Amy this week.",
            },
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l6e1", type: "bucket", prompt: "Clasifica EL MARCADOR, no el verbo — así se hace en el examen",
              categories: ["cierra el periodo → pasado simple", "lo deja abierto → present perfect"],
              items: [
                { text: "yesterday", bucket: 0 },
                { text: "ever", bucket: 1 },
                { text: "last week", bucket: 0 },
                { text: "already", bucket: 1 },
                { text: "two days ago", bucket: 0 },
                { text: "this year", bucket: 1 },
                { text: "in 2019", bucket: 0 },
                { text: "so far", bucket: 1 },
              ],
              itemIds: ["enyesterday", "ena2m1lastweek", "ena2m1twodaysago", "ena2m1in2024", "ena2m10thisweekthisyear", "ena2m10ivealreadyseenit"],
              tip: "Ni una sola de estas decisiones necesita mirar el verbo. Clasificar el marcador es más rápido, más fiable y no depende de cómo hables tú en español.",
            },
            {
              id: "ena2m10l6e2", type: "mc", prompt: "La frase que delata a medio mundo hispanohablante",
              question: "«Vi a Amy ayer» / «He visto a Amy ayer». En inglés:",
              options: ["I saw Amy yesterday.", "I have seen Amy yesterday.", "Las dos valen"],
              answer: 0,
              whyWrong: [null, "yesterday cierra el periodo: el inglés no admite ahí el perfecto, y es el error que más se penaliza", "No valen las dos: con un marcador cerrado solo hay una opción"],
              itemIds: ["ena2m10isawherlastweek", "enyesterday"],
              tip: "Y ojo, porque el español tampoco lo admite: «he visto a Amy ayer» no se dice ni en España. Lo que engaña es «he visto a Amy hoy», que sí se dice — y ese hoy es periodo abierto.",
            },
            {
              id: "ena2m10l6e3", type: "errorfix", prompt: "Corrige el sobreuso — la mitad española de la trampa",
              wrong: "I have seen Amy last week.",
              answers: ["I saw Amy last week."],
              why: "last week es un periodo TERMINADO, y eso obliga a pasado simple en inglés, sin excepción. Si tú dirías «he visto a Amy la semana pasada», el inglés no te sigue: la traducción es saw, a secas. Y si dirías «vi a Amy la semana pasada», ya estabas en lo correcto.",
              translation: "Vi a Amy la semana pasada.",
              itemIds: ["ena2m10isawherlastweek", "ena2m1lastweek"],
            },
            {
              id: "ena2m10l6e4", type: "errorfix", prompt: "Corrige el infrauso — la mitad latinoamericana de la trampa",
              wrong: "I never went to Scotland.",
              answers: ["I've never been to Scotland.", "I have never been to Scotland."],
              why: "Aquí no se habla de un viaje concreto: se habla de tu vida entera hasta hoy, y eso en inglés es perfecto. Si tú dirías «nunca fui a Escocia», te va a salir el pasado simple y sonará raro en inglés; si dirías «no he estado nunca en Escocia», tu instinto acierta. Ojo también al participio: de visitas se habla con been, no con gone.",
              translation: "No he estado nunca en Escocia.",
              itemIds: ["ena2m10ivenevertried", "ena2m10ivebeento"],
            },
            {
              id: "ena2m10l6e5", type: "errorfix", prompt: "Corrige la pregunta",
              wrong: "When have you seen her?",
              answers: ["When did you see her?"],
              why: "Preguntar «cuándo» ya cierra el periodo: pides una fecha, y una fecha es pasado simple. El perfecto sirve justo para lo contrario, para no decir cuándo. Por eso when y have + participio no se llevan.",
              translation: "¿Cuándo la viste?",
              itemIds: ["ena2m10whendidithappen"],
            },
            {
              id: "ena2m10l6e6", type: "cloze", prompt: "Completa — mira el marcador antes de decidir",
              text: "I ___ Amy two days ago at the bus stop.",
              answers: ["saw"],
              translation: "Vi a Amy hace dos días en la parada.",
              hints: ["«…ago» cierra el periodo", "s…"],
              itemIds: ["ena2m10isawherlastweek", "ena2m1twodaysago", "enbusstop"],
            },
            {
              id: "ena2m10l6e7", type: "cloze", prompt: "Y ahora el mismo verbo con otro marcador",
              text: "I've ___ Amy three times this week.",
              answers: ["seen"],
              translation: "He visto a Amy tres veces esta semana.",
              hints: ["«this week» sigue abierta, y detrás de have va la tercera columna", "s…n"],
              itemIds: ["ena2m10iveseenherthisweek", "ena2m10thisweekthisyear", "ena2m10threetimes"],
            },
            {
              id: "ena2m10l6e8", type: "transform", prompt: "Cambia el marcador y arrastra el verbo",
              source: "I've seen that film this month.",
              instruction: "Dilo con «last month»",
              answers: ["I saw that film last month.", "Last month I saw that film."],
              translation: "Vi esa película el mes pasado.",
              hints: ["El marcador cierra el periodo: el verbo tiene que seguirle", "I s… that film last month."],
              itemIds: ["ena2m10isawherlastweek", "ena2m10thisweekthisyear", "enmonth"],
              tip: "Es el ejercicio que resume la lección: no cambias de idea ni de significado, cambias de marcador, y el tiempo verbal va detrás obligado.",
            },
            {
              id: "ena2m10l6e9", type: "gapbank", prompt: "La noticia y los detalles: rellena con el banco",
              text: "«I ___ never been to Scotland!» «Really? I ___ there last summer.» «And ___ you like it?» «I ___ it. We stayed in Edinburgh.»",
              answers: ["have", "went", "did", "loved"],
              bank: ["have", "went", "did", "loved", "has", "gone", "have loved"],
              translation: "«¡No he estado nunca en Escocia!» «¿En serio? Yo estuve allí el verano pasado.» «¿Y te gustó?» «Me encantó. Nos quedamos en Edimburgo.»",
              itemIds: ["ena2m10ivenevertried", "ena2m10ivebeento", "ena2m10whendidithappen", "ensummer"],
              tip: "Mira el reparto: el primer hueco no lleva fecha (perfecto) y los otros tres sí (pasado simple). Así se conversa de verdad — se abre sin fecha y se continúa con fecha.",
            },
            {
              id: "ena2m10l6e10", type: "order", prompt: "Ordena la conversación, de la noticia al detalle",
              sentences: [
                "Guess what — I've just booked my flight!",
                "I've never been to Scotland before.",
                "My sister went there in 2022 and she loved it.",
                "She stayed in Edinburgh for a week.",
                "So I've decided to go in the summer.",
              ],
              translation: "Adivina: ¡acabo de reservar el vuelo! No he estado nunca en Escocia. Mi hermana estuvo allí en 2022 y le encantó. Se quedó una semana en Edimburgo. Así que he decidido ir en verano.",
              itemIds: ["ena2m10ivejustfinished", "ena2m10ivebeento", "ena2m1in2024", "ensister"],
              tip: "Cuenta los tiempos: perfecto, perfecto, pasado, pasado, perfecto. Los dos del medio son los únicos que llevan fecha. No es casualidad, es la regla.",
            },
            {
              id: "ena2m10l6e11", type: "translate", prompt: "Traduce al inglés — cuidado con el marcador",
              direction: "toTarget",
              mode: "produce",
              source: "Vi a Ben ayer, pero no he visto a Amy esta semana.",
              answers: [
                "I saw Ben yesterday, but I haven't seen Amy this week.",
                "I saw Ben yesterday but I haven't seen Amy this week.",
                "I saw Ben yesterday, but I have not seen Amy this week.",
              ],
              hint: "un periodo está cerrado y el otro sigue abierto",
              itemIds: ["ena2m10isawherlastweek", "ena2m10iveseenherthisweek", "enyesterday"],
            },
            {
              id: "ena2m10l6e12", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "I've read two books this month, but I didn't read anything last month.",
              answers: [
                "He leído dos libros este mes, pero el mes pasado no leí nada.",
                "Este mes he leído dos libros, pero el mes pasado no leí nada.",
                "He leído dos libros este mes, pero no leí nada el mes pasado.",
              ],
              itemIds: ["ena2m10thisweekthisyear", "enread", "enbook"],
              tip: "Aquí el español y el inglés coinciden por una vez, y coinciden por la misma razón: este mes sigue abierto y el pasado no.",
            },
            {
              id: "ena2m10l6e13", type: "audiomc", prompt: "Escucha dos veces — la pregunta va por el tiempo verbal",
              audio: "I've worked in three cafés, but I didn't like the first one. I left after two months.",
              question: "¿Qué sabemos con seguridad?",
              options: ["Que ha trabajado en tres cafés a lo largo de su vida", "Que trabaja en tres cafés ahora mismo", "Que sigue en el primer café"],
              answer: 0,
              whyWrong: [null, "Para eso haría falta un presente: «I work in three cafés»", "El audio dice justo lo contrario: I left after two months"],
              plays: 2,
              itemIds: ["ena2m10shesworkedin", "ena2m2sleptgroup"],
              tip: "El perfecto suma la experiencia («tres cafés en total, sin decir cuándo») y el pasado simple entra en cuanto se cuenta un episodio concreto. Los dos en cinco segundos de audio.",
            },
            {
              id: "ena2m10l6e14", type: "type", prompt: "Cierre de producción — la regla entera en una frase",
              question: "No he estado nunca en Escocia, pero fui a Gales el año pasado.",
              answers: [
                "I've never been to Scotland, but I went to Wales last year.",
                "I have never been to Scotland, but I went to Wales last year.",
                "I've never been to Scotland but I went to Wales last year.",
              ],
              hints: ["Sin fecha → perfecto · con fecha → pasado simple", "I've n… been to Scotland, but I w… to Wales last year."],
              itemIds: ["ena2m10ivenevertried", "ena2m10ivebeento", "ena2m1lastyear"],
              tip: "Ahí está el módulo entero: dos mitades, dos tiempos verbales, y quien decide no eres tú ni tu español — es el marcador.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Past simple or present perfect?", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/past-simple-present-perfect", note: "Es la página clave del módulo. Léela dos veces: una hoy y otra al terminar la lección 9. Y haz los ejercicios subrayando el marcador antes de elegir el verbo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — for / since
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l7",
      phaseId: "ena2m10",
      title: "For three years, since 2019",
      subtitle: "«Desde hace tres años»: tres errores encadenados, uno por uno",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Cuánto llevas haciendo algo",
          itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10forthreeyears", "ena2m10since2019", "ena2m10howlonghaveyou", "ena2m10iveknownbensince", "ena2m10allmylife"],
        },
        {
          kind: "note",
          note: {
            title: "Empecemos por el español, porque el problema está ahí",
            body: "Coge esta frase: <b>«Trabajo aquí desde hace tres años»</b>. Ahora fíjate en las tres cosas que hace el español y que el inglés hace distinto. No son una: son <b>tres, encadenadas</b>. Y si se atacan juntas, no sale ninguna.<br/><br/><b>Error 1 — el tiempo verbal.</b> El español dice «trabaj<b>o</b>»: presente. El inglés no puede, porque la acción empezó ANTES y sigue: necesita el <b>perfecto</b>. <i>I've worked here…</i> Escribir <i>I work here since…</i> es el fallo de partida, y de él salen los otros dos.<br/><br/><b>Error 2 — qué preposición.</b> El español usa «desde» para las dos cosas; el inglés reparte:<br/>· <b>for</b> + <b>cuánto DURA</b>: [[for three years|desde hace tres años]], for two months, for ten minutes, for a long time, [[all my life|toda mi vida]].<br/>· <b>since</b> + <b>cuándo EMPEZÓ</b>: [[since 2019|desde 2019]], since March, since Monday, since I arrived, [[since school|desde el colegio]].<br/><br/>Truco para no dudar: si detrás puedes poner un reloj o un calendario contando hacia atrás, es <b>for</b>. Si detrás hay un punto en el calendario, es <b>since</b>.<br/><br/><b>Error 3 — el calco de «desde hace».</b> «Desde hace tres años» tiene DOS palabras, y la mano quiere traducir las dos: sale <b><i>since three years</i></b>, que en inglés no significa nada. «Tres años» es una duración, así que es <b>for three years</b> y punto. <i>desde hace</i> = <b>for</b>. Una palabra.<br/><br/><b>Y la pregunta que abre todo esto:</b> [[How long have you worked here?|¿Cuánto tiempo llevas trabajando aquí?]] — nunca <i>How long do you work here?</i>, que preguntaría por tu horario.<br/><br/><b>Un detalle que sorprende:</b> verbos como <i>know</i>, <i>have</i> o <i>be</i> no admiten el continuo, así que se dicen con el perfecto simple: <i>I've known Ben since school</i>, no <i>I'm knowing Ben</i>. Y la traducción española es un presente puro: «conozco a Ben desde el colegio».",
            table: [
              ["español", "inglés", "por qué"],
              ["Trabajo aquí desde hace tres años.", "I've worked here for three years.", "perfecto + for (duración)"],
              ["Trabajo aquí desde 2019.", "I've worked here since 2019.", "perfecto + since (arranque)"],
              ["Conozco a Ben desde el colegio.", "I've known Ben since school.", "presente español = perfecto inglés"],
              ["¿Cuánto llevas aquí?", "How long have you been here?", "how long + perfecto"],
              ["Llevo dos meses estudiando.", "I've studied for two months.", "«llevar + gerundio» = perfecto"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l7e1", type: "bucket", prompt: "¿Duración (for) o punto de arranque (since)?",
              categories: ["for — cuánto dura", "since — cuándo empezó"],
              items: [
                { text: "three years", bucket: 0 },
                { text: "2019", bucket: 1 },
                { text: "two months", bucket: 0 },
                { text: "March", bucket: 1 },
                { text: "a long time", bucket: 0 },
                { text: "I arrived in London", bucket: 1 },
                { text: "ten minutes", bucket: 0 },
                { text: "last Monday", bucket: 1 },
              ],
              itemIds: ["ena2m10forthreeyears", "ena2m10since2019", "ena2m10allmylife"],
              tip: "Fíjate en que ninguna decisión depende del verbo: solo de si detrás hay una cantidad de tiempo o una fecha. Es una regla de dos segundos.",
            },
            {
              id: "ena2m10l7e2", type: "mc", prompt: "El calco más caro de la lección",
              question: "«Trabajo aquí desde hace tres años»",
              options: ["I've worked here for three years.", "I work here since three years.", "I'm working here since three years."],
              answer: 0,
              whyWrong: [null, "Tres errores a la vez: presente por perfecto, since por for, y el calco de «desde hace»", "El continuo no arregla el since: el problema es que tres años es una DURACIÓN"],
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10forthreeyears"],
              tip: "«desde hace» son dos palabras en español y UNA en inglés: for. Cuando te salga el impulso de traducir las dos, corta por lo sano.",
            },
            {
              id: "ena2m10l7e3", type: "cloze", prompt: "Completa la preposición",
              text: "I've studied English ___ three years.",
              answers: ["for"],
              translation: "Llevo tres años estudiando inglés.",
              hints: ["Tres años es una cantidad de tiempo, no una fecha", "f…"],
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10forthreeyears"],
            },
            {
              id: "ena2m10l7e4", type: "cloze", prompt: "Y ahora la otra",
              text: "She's worked at the hospital ___ 2019.",
              answers: ["since"],
              translation: "Trabaja en el hospital desde 2019.",
              hints: ["2019 es un punto en el calendario", "s…"],
              itemIds: ["ena2m10since2019", "enhospital"],
            },
            {
              id: "ena2m10l7e5", type: "errorfix", prompt: "Corrige el error 1: el tiempo verbal",
              wrong: "I live in London since 2023.",
              answers: ["I've lived in London since 2023.", "I have lived in London since 2023."],
              why: "El español usa presente («vivo aquí desde 2023») porque le basta con «desde» para decir que la cosa viene de atrás. El inglés necesita marcarlo en el verbo: empezó antes y sigue, o sea perfecto. La preposición aquí estaba bien; lo que fallaba era el tiempo.",
              translation: "Vivo en Londres desde 2023.",
              itemIds: ["ena2m10since2019", "enlondon"],
            },
            {
              id: "ena2m10l7e6", type: "errorfix", prompt: "Corrige el error 2: la preposición",
              wrong: "I've studied English since three years.",
              answers: ["I've studied English for three years."],
              why: "«Tres años» dice cuánto DURA, no cuándo empezó, y eso es for. Con since haría falta un punto del calendario: since 2022, since March, since I arrived. El tiempo verbal de esta frase ya estaba bien: aquí el único fallo era la preposición.",
              translation: "Llevo tres años estudiando inglés.",
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10forthreeyears"],
            },
            {
              id: "ena2m10l7e7", type: "errorfix", prompt: "Corrige el error 3: la pregunta",
              wrong: "How long do you work here?",
              answers: ["How long have you worked here?", "How long have you been here?"],
              why: "«How long do you work here?» pregunta por tu horario: cuántas horas haces. Para preguntar desde cuándo llevas en el sitio hace falta el perfecto: How long HAVE you WORKED here? Es la misma diferencia que hay entre «¿cuánto trabajas?» y «¿cuánto llevas trabajando?».",
              translation: "¿Cuánto tiempo llevas trabajando aquí?",
              itemIds: ["ena2m10howlonghaveyou", "endoyouwork"],
            },
            {
              id: "ena2m10l7e8", type: "transform", prompt: "Del español al inglés, paso a paso",
              source: "I know Ben since school.",
              instruction: "Arregla solo el tiempo verbal (la preposición ya está bien)",
              answers: ["I've known Ben since school.", "I have known Ben since school."],
              translation: "Conozco a Ben desde el colegio.",
              hints: ["know → knew → known", "I've kn…n Ben since school."],
              itemIds: ["ena2m10iveknownbensince", "ena2m2knewgroup", "enschool"],
              tip: "know no admite continuo: nada de «I'm knowing». Con estos verbos —know, have, be, like— el perfecto simple es la única opción.",
            },
            {
              id: "ena2m10l7e9", type: "build", prompt: "Construye la pregunta",
              target: "How long have you worked at the café",
              translation: "¿Cuánto tiempo llevas trabajando en el café?",
              distractors: ["do", "since"],
              itemIds: ["ena2m10howlonghaveyou"],
            },
            {
              id: "ena2m10l7e10", type: "gapbank", prompt: "La entrevista de Valeria: for o since",
              text: "«How long ___ you lived in London?» «___ 2023.» «And how long have you worked at the café?» «___ eight months.»",
              answers: ["have", "Since", "For"],
              bank: ["have", "Since", "For", "do", "Ago", "During"],
              translation: "«¿Cuánto tiempo llevas viviendo en Londres?» «Desde 2023.» «¿Y cuánto llevas trabajando en el café?» «Ocho meses.»",
              itemIds: ["ena2m10howlonghaveyou", "ena2m10since2019", "ena2m10forthreeyears", "enlondon"],
              tip: "Ojo al banco: Ago y During están ahí porque son los dos vecinos que más se cuelan. «ago» va detrás y con pasado simple (two years ago); «during» dice dentro de qué periodo, no cuánto dura.",
            },
            {
              id: "ena2m10l7e11", type: "listen", prompt: "Dictado",
              text: "I've known Amy for two years.",
              translation: "Conozco a Amy desde hace dos años.",
              hints: ["Dos años es duración", "I've kn…n Amy f… two years."],
              itemIds: ["ena2m10iveknownbensince", "ena2m10forthreeyears"],
            },
            {
              id: "ena2m10l7e12", type: "translate", prompt: "Traduce al inglés — la frase con la que empezó la lección",
              direction: "toTarget",
              mode: "produce",
              source: "Trabajo aquí desde hace tres años y conozco a Ben desde el colegio.",
              answers: [
                "I've worked here for three years and I've known Ben since school.",
                "I have worked here for three years and I have known Ben since school.",
                "I've worked here for three years and I've known Ben since school!",
              ],
              hint: "una mitad cuenta cuánto dura y la otra dice cuándo empezó",
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10iveknownbensince", "ena2m10forthreeyears"],
              tip: "Dos «desde» españoles y dos preposiciones inglesas distintas en la misma frase. Si te ha salido, has desmontado los tres errores de una vez.",
            },
            {
              id: "ena2m10l7e13", type: "type", prompt: "Cierre de producción",
              question: "¿Cuánto tiempo llevas estudiando inglés? — Desde 2022. Unos tres años.",
              answers: [
                "How long have you studied English? Since 2022. About three years.",
                "How long have you studied English? Since 2022. For about three years.",
                "How long have you studied English? Since 2022. Around three years.",
              ],
              hints: ["La pregunta va con have + tercera columna; la fecha con since y la duración con for", "How long h… you studied English? S… 2022."],
              itemIds: ["ena2m10howlonghaveyou", "ena2m10since2019", "ena2m10ivestudiedenglishfor"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-7",
            book: "I have worked here for a long time.",
            real: "I've been here ages.",
            meaning: "Llevo aquí un montón de tiempo",
            when: "Charla informal en el trabajo o con vecinos. Fíjate en dos cosas: «ages» es «un montón», no «edades», y en esta fórmula hasta el for se cae. En el examen escribe la de arriba, con for y todo.",
            register: "amigos",
            note: "«ages» es tan común que sirve para todo: «I haven't seen you for ages» — «hace siglos que no te veo». Esa sí conserva el for.",
            sound: "áiv bin jía ÉI-dchis̬",
            level: "a2",
            itemId: "ena2m10forthreeyears",
          },
        },
      ],
      resources: [
        { label: "British Council — 'for' and 'since'", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/for-since", note: "Cinco minutos. Y luego escribe tres frases tuyas de verdad: una con for, una con since y una pregunta con How long. Con tus datos, no con los del ejemplo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — estudios, asignaturas y trabajo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l8",
      phaseId: "ena2m10",
      title: "What have you studied?",
      subtitle: "Estudios, asignaturas y currículum: el campo donde vive este tiempo verbal",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Lo que has estudiado y lo que has trabajado",
          itemIds: ["ena2m10subject", "ena2m10mathshistory", "ena2m10science", "ena2m10adegree", "ena2m10ipassedtheexam", "ena2m10ifailed", "ena2m10acourse", "ena2m10iveappliedfor", "enstudent", "enteacher"],
        },
        {
          kind: "note",
          note: {
            title: "El vocabulario de la escuela, con sus falsos amigos dentro",
            body: "El present perfect vive en dos sitios: contando viajes y <b>contando tu formación</b>. Un currículum entero se escribe con este tiempo verbal, así que aquí van las palabras y las trampas.<br/><br/><b>Las asignaturas</b> ([[a subject|una asignatura]]): [[maths|matemáticas]], [[history|historia]], [[geography|geografía]], [[science|ciencias]], English, art, PE (educación física). Van <b>sin artículo</b>: <i>I studied history</i>, no <i>the history</i>. Y <b>maths</b> lleva -s pero es singular: <i>Maths <b>is</b> difficult</i>.<br/><br/><b>Los tres falsos amigos que hay que matar hoy:</b><br/>1. <b>pass</b> = <b>aprobar</b>, no «pasar». [[I passed the exam.|Aprobé el examen.]] Y «aprobar» NO es <i>approve</i>, que significa «dar el visto bueno» (a un plan, a un gasto).<br/>2. <b>fail</b> = <b>suspender</b>. [[I failed my driving test.|Suspendí el examen de conducir.]] Nada de <i>I suspended</i>.<br/>3. <b>a course</b> lleva el idioma <b>delante</b>: [[an English course|un curso de inglés]]. <i>A course of English</i> es calco del «de» español.<br/><br/><b>Y dos más del mundo del trabajo:</b> <b>a degree</b> es una carrera universitaria («I've got a degree in history»), y <b>apply FOR</b> a job, nunca <i>apply to</i>. [[I've applied for three jobs.|He echado la solicitud a tres trabajos.]]<br/><br/><b>Cómo se cuenta la formación en inglés</b>, que es lo que va al Writing:<br/>· Lo <b>terminado y fechado</b> → pasado simple: <i>I studied history at school. I finished my degree in 2021.</i><br/>· Lo que <b>cuenta como experiencia acumulada</b> → perfecto: <i>I've studied three languages. I've never worked in an office.</i><br/>· Lo que <b>sigue</b> → perfecto con for/since: <i>I've studied English for three years.</i>",
            table: [
              ["español", "inglés", "el calco que hay que evitar"],
              ["aprobar", "pass", "approve"],
              ["suspender", "fail", "suspend"],
              ["un curso de inglés", "an English course", "a course of English"],
              ["una carrera", "a degree", "a career (= trayectoria)"],
              ["echar solicitud a un trabajo", "apply for a job", "apply to a job"],
              ["matemáticas", "maths (singular)", "«maths are»"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l8e1", type: "match", prompt: "Empareja las asignaturas",
              pairs: [
                { target: "maths", source: "matemáticas" },
                { target: "history", source: "historia" },
                { target: "geography", source: "geografía" },
                { target: "science", source: "ciencias" },
              ],
              itemIds: ["ena2m10mathshistory", "ena2m10science", "ena2m10subject"],
            },
            {
              id: "ena2m10l8e2", type: "mc", prompt: "«Aprobé el examen»",
              question: "¿Cuál es la buena?",
              options: ["I passed the exam.", "I approved the exam.", "I passed of the exam."],
              answer: 0,
              whyWrong: [null, "approve es «dar el visto bueno»: lo hace un jefe con un presupuesto, no un alumno con un examen", "pass no lleva preposición: pass the exam, pass the test"],
              itemIds: ["ena2m10ipassedtheexam", "enexam"],
              tip: "Y su pareja: fail = suspender. «I failed» no es «fallé», es «suspendí».",
            },
            {
              id: "ena2m10l8e3", type: "bucket", prompt: "¿Terminado y con fecha, o experiencia acumulada?",
              categories: ["pasado simple (con fecha)", "present perfect (experiencia)"],
              items: [
                { text: "I finished my degree in 2021.", bucket: 0 },
                { text: "I've studied three languages.", bucket: 1 },
                { text: "I studied history at school.", bucket: 0 },
                { text: "I've never worked in an office.", bucket: 1 },
                { text: "I failed my driving test last month.", bucket: 0 },
                { text: "I've applied for three jobs this week.", bucket: 1 },
              ],
              itemIds: ["ena2m10adegree", "ena2m10ifailed", "ena2m10iveappliedfor", "enoffice"],
              tip: "Un currículum de verdad mezcla los dos: lo fechado en pasado simple y lo acumulado en perfecto. Nadie escribe uno entero en un solo tiempo.",
            },
            {
              id: "ena2m10l8e4", type: "cloze", prompt: "Completa",
              text: "I've ___ for three jobs this month.",
              answers: ["applied"],
              translation: "He echado la solicitud a tres trabajos este mes.",
              hints: ["apply → a-p-p-l-i-e-d, con la -y convertida en -ie", "app…"],
              itemIds: ["ena2m10iveappliedfor", "enjob"],
            },
            {
              id: "ena2m10l8e5", type: "cloze", prompt: "Completa el artículo — o la falta de él",
              text: "I studied ___ history at school for five years.",
              answers: ["", "-"],
              translation: "Estudié historia en el colegio durante cinco años.",
              hints: ["Las asignaturas van desnudas en inglés", "Si no hace falta nada, escribe un guion"],
              itemIds: ["ena2m10mathshistory", "enschool"],
              tip: "El español pone artículo a casi todo («la historia»); el inglés no se lo pone ni a las asignaturas ni a los idiomas ni a las comidas.",
            },
            {
              id: "ena2m10l8e6", type: "errorfix", prompt: "Corrige el falso amigo",
              wrong: "I approved the English exam last June.",
              answers: ["I passed the English exam last June."],
              why: "approve es «dar el visto bueno» a algo: lo aprueba un jefe, un banco o un ayuntamiento. Aprobar un examen es pass. Y ojo al par completo, porque se aprende junto: pass = aprobar, fail = suspender.",
              translation: "Aprobé el examen de inglés el junio pasado.",
              itemIds: ["ena2m10ipassedtheexam", "ena2m10acourse"],
            },
            {
              id: "ena2m10l8e7", type: "errorfix", prompt: "Corrige el calco del «de»",
              wrong: "I've done a course of English.",
              answers: ["I've done an English course.", "I've done a course in English."],
              why: "En inglés el idioma va DELANTE, como si fuera un adjetivo: an English course, a Spanish class, a maths teacher. «A course of English» calca el «de» español, que aquí no existe. La forma con in también vale y suena más formal.",
              translation: "He hecho un curso de inglés.",
              itemIds: ["ena2m10acourse"],
            },
            {
              id: "ena2m10l8e8", type: "transform", prompt: "De un dato fechado a una experiencia",
              source: "I worked in a school in 2022.",
              instruction: "Dilo como experiencia, sin fecha, empezando por «I've»",
              answers: ["I've worked in a school.", "I have worked in a school."],
              translation: "He trabajado en un colegio.",
              hints: ["Quita la fecha y el verbo cambia de tiempo", "I've work… in a school."],
              itemIds: ["ena2m10shesworkedin", "enschool"],
              tip: "Es el movimiento que hace falta en una entrevista: primero se suelta la experiencia sin fecha y, si preguntan cuándo, se pasa al pasado simple.",
            },
            {
              id: "ena2m10l8e9", type: "audiomc", prompt: "Escucha dos veces — apunta los dos datos antes de contestar",
              audio: "I studied maths at university, but I've never worked with numbers. I've been a nurse for six years.",
              question: "¿Qué hace ahora?",
              options: ["Es enfermera", "Es profesora de matemáticas", "Trabaja con números"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Estudió matemáticas, que no es lo mismo que dedicarse a ellas", "Dice justo lo contrario: I've never worked with numbers"],
              itemIds: ["ena2m10mathshistory", "ena2m10shesworkedin", "ennurse"],
              tip: "Clásico del examen: lo que estudió y lo que hace no coinciden, y la pregunta va por lo segundo. El perfecto con for te da la respuesta: I've been a nurse FOR SIX YEARS.",
            },
            {
              id: "ena2m10l8e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Estudié geografía en el colegio, pero no he estudiado nunca ciencias.",
              answers: [
                "I studied geography at school, but I've never studied science.",
                "I studied geography at school but I've never studied science.",
                "I studied geography at school, but I have never studied science.",
              ],
              hint: "una mitad lleva un sitio y un tiempo cerrado; la otra habla de toda tu vida",
              itemIds: ["ena2m10mathshistory", "ena2m10science", "enschool"],
            },
            {
              id: "ena2m10l8e11", type: "write", prompt: "Escribe a la escuela de idiomas — 30-50 palabras",
              scenario: "Quieres apuntarte al curso de inglés de la escuela de tu barrio. Escribe un correo a la secretaría contándoles tu experiencia y pidiendo información.",
              bullets: [
                "Di cuánto tiempo llevas estudiando inglés (con for o con since)",
                "Cuenta una experiencia con «I've never…» o «I've already…»",
                "Pide información sobre el curso con «Could you…?»",
              ],
              checks: [
                { re: "((for (two|three|four|five|six|seven|eight|nine|ten|\\d+) (years|months))|(since \\d{4}))", label: "cuánto tiempo, con for o since" },
                { re: "(i've|i have) (never|already)", label: "una experiencia con never o already" },
                { re: "could (you|i)", label: "una petición con could" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "polite",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hello, I've studied English for three years and I've already passed an A2 exam, but I've never had an English teacher from England. I'd like to join your evening course. Could you tell me when it starts, please? Thank you, Valeria",
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10ivealreadyseenit", "ena2m10acourse", "ena2m10ipassedtheexam"],
              tip: "Antes de corregir, cuenta cuántas veces has escrito una fecha. Si has puesto una («in 2022»), esa frase tiene que ir en pasado simple: el perfecto y la fecha no caben juntos.",
            },
            {
              id: "ena2m10l8e12", type: "speak", prompt: "Dilo en voz alta — tu currículum en tres frases",
              text: "I've studied English for three years. I've worked in two cafés. I've never worked in an office.",
              phonetic: "áiv STA-did ÍN-glish fo zríi YÍAS̬. áiv UÉEKT in tuu KÁ-feis̬. áiv NÉ-va UÉEKT in an Ó-fis",
              translation: "Llevo tres años estudiando inglés. He trabajado en dos cafés. No he trabajado nunca en una oficina.",
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10shesworkedin", "ena2m10ivenevertried", "enoffice"],
              tip: "Tres perfectos seguidos y ni una fecha: así se presenta uno en una entrevista. La fecha solo aparece si te la piden.",
            },
            {
              id: "ena2m10l8e13", type: "type", prompt: "Cierre de producción",
              question: "Aprobé el examen en junio, pero todavía no he empezado el curso.",
              answers: [
                "I passed the exam in June, but I haven't started the course yet.",
                "I passed the exam in June but I haven't started the course yet.",
                "I passed the exam in June, but I have not started the course yet.",
              ],
              hints: ["«in June» cierra el periodo; «todavía no» pide yet al final", "I p… the exam in June, but I haven't started the course y…"],
              itemIds: ["ena2m10ipassedtheexam", "ena2m10haveyoufinishedyet", "ena2m10acourse", "enjune"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-8",
            book: "I passed the exam.",
            real: "I got through it.",
            meaning: "Lo saqué / conseguí aprobarlo",
            when: "Contándoselo a alguien de confianza, cuando el examen costó. Lleva dentro un «por los pelos» que pass no tiene. En el Writing del examen, pass.",
            register: "amigos",
            note: "get through sirve para todo lo que se supera con esfuerzo: un examen, una semana horrible, una entrevista. Y también, muy útil, «I couldn't get through» = no conseguí que me cogieran el teléfono.",
            sound: "ái got ZRÚU it",
            level: "a2",
            itemId: "ena2m10ipassedtheexam",
          },
        },
      ],
      resources: [
        { label: "British Council — Talking about your education", url: "https://learnenglish.britishcouncil.org/skills/writing/a2-writing", note: "Busca los modelos de perfil y de carta de solicitud. Fíjate solo en una cosa: qué frases llevan fecha y en qué tiempo verbal están." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — cierre: espiral, minuto de oral y el recordatorio de frontera
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m10l9",
      phaseId: "ena2m10",
      title: "Three people, three answers",
      subtitle: "Todo el módulo junto — y el recordatorio de qué entra y qué no",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Cerrar contando experiencias",
          itemIds: ["ena2m10thebestivever", "ena2m10howmanytimes", "ena2m10experience", "ena2m10onceortwice"],
        },
        {
          kind: "note",
          note: {
            title: "Antes del cierre: qué te llevas y qué NO te van a pedir",
            body: "Se abrió el módulo con un aviso y se cierra con el mismo, porque es importante que salgas de aquí con las cuentas claras.<br/><br/><b>Lo que NO entra en tu examen de A2 ni en el simulacro:</b> el present perfect entero. Ni ever/never, ni been/gone, ni just/already/yet, ni for/since. Nada de esto se te va a exigir producir. Está en la columna B1 del temario de LanguageCert, y ahí lo volverás a ver con calma.<br/><br/><b>Lo que SÍ te llevas, y vale mucho:</b><br/>1. <b>Lo reconoces al oírlo.</b> En el Listening ya no vas a confundir <i>she's working</i> con <i>she's worked</i>, ni vas a perder un «¿dónde está?» por no distinguir been de gone.<br/>2. <b>Tu pasado simple es mejor que antes.</b> Esto es lo importante: al ver los dos tiempos enfrentados sabes exactamente <b>cuándo el inglés te obliga al pasado simple</b> — con yesterday, last…, ago, in 2019 y cualquier pregunta con when. Antes lo hacías por costumbre; ahora lo haces por regla, y por eso ya no se te va a colar <i>I have seen him yesterday</i>.<br/>3. <b>Sabes por dónde te engaña tu español</b>, y sabes por qué lado: sobreusando el perfecto o infrausándolo. Eso no se olvida.<br/><br/><b>Y para el minuto de oral</b>, la plantilla de siempre, con material de este módulo:<br/>· <b>1. Una experiencia sin fecha</b>: <i>I've been to three countries.</i><br/>· <b>2. El detalle, con fecha</b>: <i>I went to Mexico in 2022 with my sister.</i><br/>· <b>3. Lo que aún no</b>: <i>I've never been to Scotland, but I'd like to go.</i><br/><br/>Perfecto para abrir, pasado simple para contar, perfecto para cerrar. Es la estructura que usa un nativo sin pensarlo.",
            table: [
              ["", "en el examen A2", "en la calle y en el Listening"],
              ["Pasado simple con marcador", "se te exige", "constante"],
              ["ever / never", "no entra", "constante"],
              ["been vs gone", "no entra", "decide «¿dónde está?»"],
              ["just / already / yet", "no entra", "constante"],
              ["for / since", "no entra", "en cuanto alguien te pregunta cuánto llevas"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m10l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya lo tienes",
              pairs: [
                { target: "Have you ever…?", source: "¿Has… alguna vez?" },
                { target: "I've never…", source: "No he… nunca" },
                { target: "Not yet.", source: "Todavía no." },
                { target: "for three years", source: "desde hace tres años" },
                { target: "since 2019", source: "desde 2019" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m10haveyouever", "ena2m10ivenevertried", "ena2m10notyet", "ena2m10forthreeyears", "ena2m10since2019"],
              tip: "El cronómetro solo premia. Si estas cinco salen sin pensar, el módulo se ha instalado; si te paras en alguna, volverá en el repaso.",
            },
            {
              id: "ena2m10l9e2", type: "bucket", prompt: "Espiral final: ¿qué tiempo pide cada marcador?",
              categories: ["pasado simple", "present perfect"],
              items: [
                { text: "last night", bucket: 0 },
                { text: "so far", bucket: 1 },
                { text: "in 2019", bucket: 0 },
                { text: "recently", bucket: 1 },
                { text: "When…?", bucket: 0 },
                { text: "three times", bucket: 1 },
                { text: "two days ago", bucket: 0 },
                { text: "yet", bucket: 1 },
              ],
              itemIds: ["enlastnight", "ena2m10recently", "ena2m10whendidithappen", "ena2m10threetimes", "ena2m1twodaysago", "ena2m10haveyoufinishedyet"],
              tip: "Es el mismo ejercicio de la lección 6 con marcadores nuevos. Si lo has hecho sin dudar, la regla ya no depende de tu español.",
            },
            {
              id: "ena2m10l9e3", type: "gapbank", prompt: "La conversación entera: rellena con el banco",
              // El segundo hueco pedía «have» con el primero en «Have»: para el
              // motor son la MISMA respuesta escrita de dos formas, y el hueco
              // se quedaba con dos claves. Se cambia por el pasado, que además
              // es el contraste que la lección viene a enseñar.
              text: "«___ you ever been to Mexico?» «Yes, I have. I ___ in 2022.» «___ long did you stay?» «Two weeks. It's the best trip I've ___ had.»",
              answers: ["Have", "went", "How", "ever"],
              bank: ["Have", "went", "How", "ever", "Did", "never", "When"],
              translation: "«¿Has estado alguna vez en México?» «Sí. Fui en 2022.» «¿Cuánto tiempo te quedaste?» «Dos semanas. Es el mejor viaje que he hecho nunca.»",
              itemIds: ["ena2m10haveyoueverbeenabroad", "ena2m10yesihave", "ena2m10thebestivever", "enmexico"],
              tip: "Fíjate en el último hueco: ever en afirmativa solo se admite detrás de un superlativo — «the best I've ever had». Es la única puerta que tiene.",
            },
            {
              id: "ena2m10l9e4", type: "order", prompt: "Ordena la respuesta de Valeria, de la noticia al detalle",
              sentences: [
                "I've worked in three cafés since I arrived in London.",
                "My first job was at a place near the station.",
                "I only stayed there for two months.",
                "Then I got a job at the café with Sam.",
                "I've been there ever since, and I love it.",
              ],
              translation: "He trabajado en tres cafés desde que llegué a Londres. Mi primer trabajo fue en un sitio cerca de la estación. Solo estuve allí dos meses. Luego empecé a trabajar en el café con Sam. Llevo ahí desde entonces, y me encanta.",
              itemIds: ["ena2m10shesworkedin", "ena2m10since2019", "ena2m10forthreeyears", "enstation"],
              tip: "Perfecto para abrir, pasado simple en medio para los episodios, perfecto para cerrar. Ese sándwich es la forma normal de contar una trayectoria.",
            },
            {
              id: "ena2m10l9e5", type: "errorfix", prompt: "Corrige el calco más caro del módulo",
              wrong: "I have seen Ben yesterday at the bus stop.",
              answers: ["I saw Ben yesterday at the bus stop."],
              why: "yesterday es tiempo cerrado, y eso obliga al pasado simple en inglés. Y ojo, porque el español tampoco dice «he visto a Ben ayer» en ninguna orilla: lo que engaña es «he visto a Ben hoy», donde el periodo sigue abierto. La regla inglesa es una sola y no depende de cómo hables tú: marcador cerrado, pasado simple.",
              translation: "Vi a Ben ayer en la parada del autobús.",
              itemIds: ["ena2m10isawherlastweek", "enyesterday", "enbusstop"],
            },
            {
              id: "ena2m10l9e6", type: "errorfix", prompt: "Y el calco de la otra orilla",
              wrong: "I live in London since three years.",
              answers: ["I've lived in London for three years.", "I have lived in London for three years."],
              why: "Tres errores en cinco palabras, y conviene verlos separados: (1) el español usa presente y el inglés necesita perfecto; (2) tres años es DURACIÓN, así que es for y no since; (3) «desde hace» son dos palabras en español y una sola en inglés. Arreglar solo uno de los tres no salva la frase.",
              translation: "Vivo en Londres desde hace tres años.",
              itemIds: ["ena2m10ivestudiedenglishfor", "ena2m10forthreeyears", "enlondon"],
            },
            {
              id: "ena2m10l9e7", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "I've never been to Scotland.",
              // Prohibir «been» dejaba el ejercicio sin salida: las dos
              // respuestas buenas lo llevan. Lo que se prohíbe es «never», que
              // es el camino que hay que rodear; el participio tiene que estar.
              forbid: ["never"],
              answers: ["I haven't been to Scotland.", "I have not been to Scotland."],
              translation: "No he estado nunca en Escocia.",
              itemIds: ["ena2m10ivenevertried", "ena2m10ivebeento"],
              tip: "never y haven't dicen lo mismo por dos caminos, y ese es el truco que te salva en el oral cuando una palabra no te sale. Lo que NO puedes hacer es juntarlas: «I haven't never» no existe.",
            },
            {
              id: "ena2m10l9e8", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "Amy has gone to the hospital, but I've been there twice this week and it's fine.",
              answers: [
                "Amy se ha ido al hospital, pero yo he estado allí dos veces esta semana y está bien.",
                "Amy se ha ido al hospital, pero yo he estado ahí dos veces esta semana y no pasa nada.",
              ],
              itemIds: ["ena2m10shesgoneto", "ena2m10ivebeento", "ena2m10thisweekthisyear"],
              tip: "Los dos participios de ir, en la misma frase, contando cosas distintas: Amy está allí, quien habla ya ha vuelto. Si eso te ha quedado claro, la lección 3 está cerrada.",
            },
            {
              id: "ena2m10l9e9", type: "audiomc", prompt: "Cierre de oído — dos datos, como en la Parte 1 del examen",
              audio: "I've applied for four jobs this month, but I haven't had an interview yet. I had one in March, and it went really badly.",
              question: "¿Cuándo hizo la última entrevista?",
              options: ["En marzo", "Este mes", "Todavía no ha hecho ninguna"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Este mes ha echado solicitudes, pero entrevistas no: lo dice el yet", "Sí ha hecho una, la de marzo; lo que no ha habido es ninguna este mes"],
              itemIds: ["ena2m10iveappliedfor", "ena2m10haveyoufinishedyet", "ena2m3badly"],
              tip: "El yet dice «este mes, ninguna» y el «in March» abre un episodio cerrado con su pasado simple. Dos tiempos verbales, dos informaciones distintas: eso es lo que la pregunta te está midiendo.",
            },
            {
              id: "ena2m10l9e10", type: "speak", prompt: "Tu minuto, bloque a bloque — léelo y luego dilo mirando al frente",
              text: "I've been to three countries. I went to Mexico in 2022 with my sister. I've never been to Scotland, but I'd like to go.",
              phonetic: "áiv bin tu zríi KÁN-tris̬. ái uent tu MEK-si-kou in tuénti tuénti-TÚU uid mái SÍS-ta. áiv NÉ-va bin tu SKOT-land, bat áid láik tu góu",
              translation: "He estado en tres países. Fui a México en 2022 con mi hermana. No he estado nunca en Escocia, pero me gustaría ir.",
              itemIds: ["ena2m10ivebeento", "ena2m10ivenevertried", "enmexico", "ensister"],
              tip: "Perfecto, pasado simple, perfecto. Y fíjate en que el único que lleva fecha es el del medio: esa es toda la regla, dicha en voz alta.",
            },
            {
              id: "ena2m10l9e11", type: "monologue", prompt: "El minuto de verdad: tus experiencias",
              topic: "Tres cosas que has hecho en tu vida (y una que no has hecho todavía)",
              slides: [
                { title: "1. Una experiencia, sin fecha", hint: "I've been to… / I've worked in… / I've studied… — nada de «in 2022» todavía" },
                { title: "2. El detalle, con fecha", hint: "Ahora sí: I went there in… / I started in… / It happened last year." },
                { title: "3. Lo que aún no has hecho", hint: "I've never… , but I'd like to. / I haven't… yet." },
              ],
              planSeconds: 30,
              speakSeconds: 60,
              reps: 2,
              checklist: [
                "He empezado con una experiencia SIN fecha (have/has + tercera columna)",
                "He dado un detalle CON fecha, y ahí he usado pasado simple",
                "He usado never o yet una vez",
                "He dicho cuánto tiempo con for o con since",
                "No he metido ninguna fecha detrás de have",
              ],
              model: "I've been to four countries. I've studied English for three years and I've worked in two cafés in London. I went to Mexico in 2022 with my sister and we stayed for two weeks — it's the best trip I've ever had. I've never been to Scotland, but a friend has just moved to Edinburgh, so I'd like to go this year. I haven't booked anything yet.",
              itemIds: ["ena2m10ivebeento", "ena2m10ivestudiedenglishfor", "ena2m10thebestivever", "ena2m10ivenevertried", "ena2m10haveyoufinishedyet"],
              tip: "Grábate las dos veces. La última casilla es la que más se falla: en cuanto sale una fecha, el verbo tiene que caer al pasado simple. Cuéntalas al escucharte.",
            },
            {
              id: "ena2m10l9e12", type: "type", prompt: "Cierre del módulo",
              question: "¿Cuántas veces has estado en Londres? — Una vez o dos. Fui en 2022.",
              answers: [
                "How many times have you been to London? Once or twice. I went in 2022.",
                "How many times have you been to London? Once or twice. I went there in 2022.",
                "How many times have you been to London? Once or twice, I went in 2022.",
              ],
              hints: ["La pregunta cuenta veces (perfecto); la respuesta con fecha cae al pasado simple", "How many times h… you b…n to London? Once or twice. I w… in 2022."],
              itemIds: ["ena2m10howmanytimes", "ena2m10onceortwice", "ena2m10ivebeento", "enlondon"],
              tip: "Con esto cierras la frontera. Si lo reconoces al oírlo y te sale al escribirlo, vas por delante de lo que el A2 te va a pedir — y llegas al B1 con la cara ya conocida. Y recuerda: nada de este módulo entra en tu simulacro.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m10-9",
            book: "It's the best coffee I have ever had.",
            real: "Best coffee ever.",
            meaning: "El mejor café de la historia",
            when: "Coloquial y muy actual: se cae la frase entera y quedan tres palabras. Vale para todo — «best day ever», «worst film ever». En el examen escribe la fórmula completa: es superlativo + I've ever + participio, y ahí sí puntúa.",
            register: "amigos",
            note: "Es la única puerta por la que ever entra en una afirmativa: detrás de un superlativo. En cualquier otro sitio, ever es de preguntas.",
            sound: "best KO-fi É-va",
            level: "a2",
            itemId: "ena2m10thebestivever",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking: personal experiences", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Ensaya el minuto con los vídeos: 30 segundos de papel y uno de habla, siempre dos veces. La segunda pasada sale mejor y es la que te llevas." },
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Vuelve al syllabus y compruébalo tú: el present perfect no está en la columna Access. Verlo con tus ojos vale más que creerme a mí." },
      ],
    },
  ],
};
