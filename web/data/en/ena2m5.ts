import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 5 — How much sugar?: contable, incontable, y cómo se pide
// en una mesa. Sigue el listón del piloto `ena2m1`.
//
// Gramática ancla (PLAN-EN-A2 §4.1): contables e incontables · much / many /
// (a) few / (a) little · some / any SISTEMATIZADOS · el artículo cero con los
// genéricos · envases y porciones (a bottle of, a slice of, a piece of).
// Funciones: pedir algo y responder a una petición, y quejarse y disculparse.
//
// POR QUÉ VA AQUÍ (PLAN-EN-A2 §4.2): contable/incontable es otro sistema de
// cuantificación, así que encaja detrás de los determinantes de `ena2m4`
// (more, most, enough) en vez de aparecer suelto. Y el A1 dejó `some/any` como
// chunk A PROPÓSITO (`ena1m5l4`, «some afirma, any pregunta y niega»): aquí se
// paga esa deuda con el sistema entero, excepciones incluidas.
//
// LA DECISIÓN DEL MÓDULO — LA LISTA CERRADA COMO CUBO, NO COMO REGLA (L2).
// people, news, information, advice, furniture, luggage, homework, money,
// hair, bread no se comportan así por ninguna lógica que el alumno pueda
// deducir: es reparto léxico, y el español reparte al revés. Por eso no se
// enseña como regla («los abstractos son incontables» es falso: a mistake, an
// idea, a problem), sino como CLASIFICACIÓN CERRADA de diez palabras que se
// aprende entera, con su tarjeta-lista (`ena2m5uncountablegroup`) y su
// concordancia. Es el error nº 4 de PLAN-EN-A2 §9.1: aparece en A2, fosiliza,
// y sobrevive hasta Proficiency. Diez palabras contra veinte años de fallo.
//
// LO QUE SE HEREDA DE `ena2m3` Y NO SE RE-EXPLICA: la regla de que NADA se
// mete entre el verbo y su objeto ya está enseñada en `ena2m3l6`. Aquí se
// REFERENCIA (L7: «I like coffee very much», nunca «I like very much coffee»)
// y se cobra en los ejercicios, pero no se vuelve a explicar. `well`, `hard` y
// `hardly` están cerrados en aquel módulo: no se tocan. El past continuous
// quedó SOLO presentado allí, así que este módulo no lo produce en ninguna
// frase — ni en las notas, ni en los modelos de escritura.
//
// LA CLÍNICA DE SONIDO (L5) es el ENLACE consonante→vocal que pide
// PLAN-EN-A2 §4.3: a lot of, a bit of, a glass of, pick it up. Es de las
// baratas —el español ya enlaza («los amigos» suena «lo-sa-mi-gos»)—, así que
// no se enseña como habilidad nueva sino como permiso: se puede hacer lo que
// ya haces. Y va justo aquí porque los envases son todos «X of Y», es decir,
// la misma juntura repetida veinte veces.
//
// EL CONTRASTE CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9): (a) la lista
// cerrada de incontables, L2; (b) el artículo cero de los genéricos —«The life
// is hard», «I like the music»—, L7, con su pareja (cuando SÍ va the); (c) la
// cortesía de la petición, L8: «Dame un café» no es maleducado en español y
// «Give me a coffee» sí lo es en inglés — de ahí la escalera Can I → Could I →
// Could I have… please, que es además lo que el examen puntúa como registro;
// (d) la doble negación, que el A1 ya avisó y aquí recae (I don't want ANY
// sugar), L3; (e) «hay un error» → There IS a mistake, nunca «there has», L9.
//
// RECICLADO del A1 y de ena2m1/m2/m3 sin redefinir ids (una palabra, una
// tarjeta): encoffee, entea, enwater, enmilk, ensugar, enbutter, enbread,
// encake, enjuice, enrice, enchicken, enfish, encheese, enapple, eneggs,
// enchips, enfishandchips, ensandwich, entoast, enpizza, enchocolate, enmenu,
// encupoftea, encanihaveacoffee, enanythingelse, enwaiter, entable, enplease,
// enthankyou, enthankyouverymuch, ensorry, enexcuseme, enyourewelcome, ensome,
// enany, enisthereanymilk, enhowmany, enhowmuchisit, enhowmuchare, enimhungry,
// enimthirsty, endelicious, enpeople, enhomework, enbreakfast, enlunch,
// endinner, encanipaybycard, encash, enitscold, encold, enbusy, enshop,
// endoyoulike, enilike, enidontlike, enfavourite, enpound,
// enitsthreepoundsfifty, encheap, enexpensive, encanihelpyou, eninthefridge,
// enthereis, enthereare, ena2m1therewere, ena2m1notmuch, ena2m1terrible,
// ena2m1missedthebus, ena2m1iwaslucky, ena2m2ateeight, ena2m2paid,
// ena2m2shesaidsorry, ena2m2wehadagoodtime, ena2m2unfortunately,
// ena2m2whatashame, ena2m2iwenttothecinema, ena2m3abitshy, ena2m3quitetall,
// ena2m3sonice, ena2m3friendly, ena2m3ilikeitverymuch, ena2m3slowly.
//
// LO QUE HEREDAN LOS MÓDULOS SIGUIENTES: la escalera de cortesía de la L8 es
// la base del `can / could / may` de `ena2m7` (permiso), que ya no tendrá que
// explicar por qué el imperativo pelado suena mal; el «I'd like» del pedido es
// el que `ena2m6` reutiliza para la intención; y la lista cerrada de la L2 es
// la que hace falta para que `ena2m10` pueda decir «I've got a lot of
// experience» sin recaer en «experiences».
//
// TODOS los ids nuevos llevan el prefijo "ena2m5": es regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m5: Record<string, VocabItem> = {
  // ── ena2m5l1 — los dos montones ──
  ena2m5salt: { id: "ena2m5salt", target: "salt", source: "la sal — no se cuenta: ni «a salt» ni «salts»", sound: "soolt" },
  ena2m5soup: { id: "ena2m5soup", target: "soup", source: "la sopa", sound: "suup" },
  ena2m5meat: {
    id: "ena2m5meat", target: "meat", source: "la carne",
    sound: "miit (i larga: con la corta sonaría «mit»)",
    gram: { trap: "I don't eat meats." },
  },
  ena2m5vegetables: { id: "ena2m5vegetables", target: "vegetables", source: "las verduras — aquí el inglés SÍ cuenta, y casi siempre en plural", sound: "VEDCH-ta-bols̬ (tres sílabas, no cuatro)" },
  ena2m5twocoffeesplease: {
    id: "ena2m5twocoffeesplease", target: "Two coffees, please.",
    source: "Dos cafés, por favor. — al pedir, la taza sí se cuenta",
    sound: "tuu KO-fis̬ plíis̬",
    gram: { trap: "Two coffee, please.", same: ["Two cups of coffee, please."] },
  },
  ena2m5thefoodwasgood: {
    id: "ena2m5thefoodwasgood", target: "The food was very good.",
    source: "La comida estaba muy buena. — food no se cuenta ni se pluraliza",
    sound: "de fuud uos̬ VE-ri GUD",
    gram: { trap: "The foods were very good." },
  },

  // ── ena2m5l2 — la lista cerrada: los diez que el español cuenta y el inglés no ──
  ena2m5uncountablegroup: {
    id: "ena2m5uncountablegroup",
    target: "people · news · information · advice · furniture · luggage · homework · money · hair · bread",
    source: "los diez incontables que el español sí pluraliza: sin -s, sin «a», y el verbo en singular (menos people, que es plural)",
    sound: "PÍI-pol · niús̬ · in-fa-MÉI-shon · ad-VÁIS · FÉE-ni-cha · LA-guidch · JÓUM-uéek · MA-ni · jéa · bred",
  },
  ena2m5peoplearefriendly: {
    id: "ena2m5peoplearefriendly", target: "People are very friendly.",
    source: "La gente es muy maja. — people va en PLURAL",
    sound: "PÍI-pol aa VE-ri FREND-li",
    gram: { trap: "People is very friendly.", same: ["Everyone is very friendly."] },
  },
  ena2m5somegoodadvice: {
    id: "ena2m5somegoodadvice", target: "some good advice",
    source: "unos buenos consejos — advice no tiene plural",
    sound: "sam gud ad-VÁIS",
    gram: { trap: "some good advices" },
  },
  ena2m5thenewsisgood: {
    id: "ena2m5thenewsisgood", target: "The news is good.",
    source: "Las noticias son buenas. — news acaba en -s pero es singular",
    sound: "de niús̬ is̬ GUD",
    gram: { trap: "The news are good." },
  },
  ena2m5myhairisverylong: {
    id: "ena2m5myhairisverylong", target: "My hair is very long and dark.",
    source: "Tengo el pelo muy largo y moreno. — un solo hair para toda la cabeza",
    sound: "mái JÉA is̬ VE-ri long and DAAK",
    gram: { trap: "My hairs are very long and dark.", same: ["I have very long dark hair."] },
  },
  ena2m5money: {
    id: "ena2m5money", target: "money",
    source: "el dinero — incontable, y por eso siempre «How much money?»",
    sound: "MA-ni",
    gram: { trap: "I don't have many money." },
  },

  // ── ena2m5l3 — some / any, con sus dos excepciones ──
  ena2m5wouldyoulikesometea: {
    id: "ena2m5wouldyoulikesometea", target: "Would you like some tea?",
    source: "¿Quieres té? — es pregunta, pero al OFRECER va some",
    sound: "uud yu láik sam TÍI",
    gram: { trap: "Would you like any tea?", same: ["Do you want a cup of tea?"] },
  },
  ena2m5canihavesomewater: {
    id: "ena2m5canihavesomewater", target: "Can I have some water?",
    source: "¿Me pones agua? — es pregunta, pero al PEDIR va some",
    sound: "kan ái jav sam UÓ-ta",
    gram: { trap: "Can I have any water?" },
  },
  ena2m5theydonthaveanysoup: {
    id: "ena2m5theydonthaveanysoup", target: "They don't have any soup today.",
    source: "Hoy no tienen sopa.",
    sound: "déi dóunt jav E-ni SUUP tu-DÉI",
    gram: { trap: "They don't have no soup today." },
  },
  ena2m5somethingtoeat: { id: "ena2m5somethingtoeat", target: "something to eat", source: "algo de comer", sound: "SAM-zing tu íit" },
  ena2m5anythingtodrink: { id: "ena2m5anythingtodrink", target: "Anything to drink?", source: "¿Algo para beber? (lo que te pregunta quien te atiende)", sound: "É-ni-zing tu DRINK" },

  // ── ena2m5l4 — how much / how many · much · many · a lot of ──
  ena2m5howmuchsugar: {
    id: "ena2m5howmuchsugar", target: "How much sugar do you take?",
    source: "¿Cuánto azúcar tomas? (en el té o el café)",
    sound: "jáu mach SHU-ga du yu TÉIK",
    gram: { trap: "How many sugar do you take?" },
  },
  ena2m5howmanypeoplearethere: {
    id: "ena2m5howmanypeoplearethere", target: "How many people are there?",
    source: "¿Cuánta gente hay? — people se cuenta, así que many",
    sound: "jáu ME-ni PÍI-pol aa DÉA",
    gram: { trap: "How much people are there?" },
  },
  ena2m5alotof: { id: "ena2m5alotof", target: "a lot of", source: "mucho, mucha, muchos — sirve para los dos montones y es lo que se dice de verdad", sound: "a LO-tov (enlazado: «a-LÓ-tov», nunca «a lot / of»)" },
  ena2m5thereisntmuchmilk: {
    id: "ena2m5thereisntmuchmilk", target: "There isn't much milk.",
    source: "No hay mucha leche.",
    sound: "déar Í-s̬ent mach MILK",
    gram: { trap: "There isn't many milk.", same: ["There's very little milk."] },
  },
  ena2m5toomuchsalt: {
    id: "ena2m5toomuchsalt", target: "There's too much salt in the soup.",
    source: "La sopa tiene demasiada sal.",
    sound: "déas̬ tuu mach SOOLT in de suup",
    gram: { trap: "There's too many salt in the soup." },
  },

  // ── ena2m5l5 — envases y porciones (y la clínica del enlace) ──
  ena2m5abottleofwater: { id: "ena2m5abottleofwater", target: "a bottle of water", source: "una botella de agua", sound: "a BO-tol ov UÓ-ta («bótol-ov», todo pegado)" },
  ena2m5aglassofwine: { id: "ena2m5aglassofwine", target: "a glass of wine", source: "una copa de vino", sound: "a GLAA-sov uáin" },
  ena2m5asliceofcake: { id: "ena2m5asliceofcake", target: "a slice of cake", source: "un trozo de tarta (de lo que se corta en rodajas: tarta, pan, queso)", sound: "a SLÁI-sov kéik" },
  ena2m5apieceofadvice: {
    id: "ena2m5apieceofadvice", target: "a piece of advice",
    source: "un consejo — así se cuenta lo que no se puede contar",
    sound: "a PÍI-sov ad-VÁIS",
    gram: { trap: "two advices", same: ["some advice"] },
  },
  ena2m5abitofsugar: { id: "ena2m5abitofsugar", target: "a bit of sugar", source: "un poquito de azúcar", sound: "a BÍ-tov SHU-ga" },
  ena2m5aloafofbread: {
    id: "ena2m5aloafofbread", target: "a loaf of bread",
    source: "una barra / un pan entero — bread no se cuenta, las barras sí",
    sound: "a LÓU-fov bred",
    gram: { trap: "two breads" },
  },

  // ── ena2m5l6 — (a) few / (a) little ──
  ena2m5afewfriends: {
    id: "ena2m5afewfriends", target: "a few friends",
    source: "unos cuantos amigos — a few + lo que se cuenta",
    sound: "a FIÚU frends̬",
    gram: { trap: "a few money" },
  },
  ena2m5alittlemilk: {
    id: "ena2m5alittlemilk", target: "a little milk",
    source: "un poco de leche — a little + lo que no se cuenta",
    sound: "a LÍ-tol milk",
    gram: { trap: "a little friends" },
  },
  ena2m5fewpeoplecame: {
    id: "ena2m5fewpeoplecame", target: "Few people came.",
    source: "Vino poquísima gente. — sin «a», few es negativo",
    sound: "fiúu PÍI-pol KÉIM",
    gram: { same: ["Almost nobody came."] },
  },
  ena2m5justalittlethanks: { id: "ena2m5justalittlethanks", target: "Just a little, thanks.", source: "Un poquito nada más, gracias. (mientras te sirven)", sound: "dchast a LÍ-tol zanks" },
  ena2m5therearentmanytables: {
    id: "ena2m5therearentmanytables", target: "There aren't many tables free.",
    source: "No hay muchas mesas libres.",
    sound: "déar AANT me-ni TÉI-bols̬ FRII",
    gram: { trap: "There aren't much tables free." },
  },

  // ── ena2m5l7 — el artículo cero de los genéricos ──
  ena2m5ilikemusic: {
    id: "ena2m5ilikemusic", target: "I like music.",
    source: "Me gusta la música. — en general: sin the",
    sound: "ái láik MIÚU-s̬ik",
    gram: { trap: "I like the music." },
  },
  ena2m5lifeishard: {
    id: "ena2m5lifeishard", target: "Life is hard.",
    source: "La vida es dura.",
    sound: "láif is̬ JAAD",
    gram: { trap: "The life is hard." },
  },
  ena2m5moneyisnteverything: {
    id: "ena2m5moneyisnteverything", target: "Money isn't everything.",
    source: "El dinero no lo es todo.",
    sound: "MA-ni Í-s̬ent EV-ri-zing",
    gram: { trap: "The money isn't everything." },
  },
  ena2m5thecoffeehereisgood: { id: "ena2m5thecoffeehereisgood", target: "The coffee here is very good.", source: "El café de aquí está muy bueno. — aquí SÍ va the: no es el café en general, es este", sound: "de KO-fi jía is̬ VE-ri GUD" },
  ena2m5ilovecooking: {
    id: "ena2m5ilovecooking", target: "I love cooking.",
    source: "Me encanta cocinar. / Me encanta la cocina.",
    sound: "ái lav KU-king",
    gram: { trap: "I love the cooking." },
  },

  // ── ena2m5l8 — la escalera de la petición ──
  ena2m5atablefortwoplease: {
    id: "ena2m5atablefortwoplease", target: "A table for two, please.",
    source: "Una mesa para dos, por favor.",
    sound: "a TÉI-bol foo TUU plíis̬",
    gram: { trap: "A table for two persons, please.", same: ["Have you got a table for two?"] },
  },
  ena2m5areyoureadytoorder: { id: "ena2m5areyoureadytoorder", target: "Are you ready to order?", source: "¿Ya saben lo que van a tomar? (lo pregunta quien atiende)", sound: "aa yu RE-di tu OO-da" },
  ena2m5idlikethechicken: {
    id: "ena2m5idlikethechicken", target: "I'd like the chicken, please.",
    source: "Yo, el pollo, por favor.",
    sound: "áid láik de CHI-ken plíis̬",
    gram: { trap: "I want the chicken, please.", same: ["Can I have the chicken, please?"] },
  },
  ena2m5couldihavethemenu: {
    id: "ena2m5couldihavethemenu", target: "Could I have the menu, please?",
    source: "¿Me trae la carta, por favor?",
    sound: "kud ái jav de ME-niu plíis̬",
    gram: { trap: "Give me the menu.", same: ["Can I have the menu, please?"] },
  },
  ena2m5couldyoubringussomewater: {
    id: "ena2m5couldyoubringussomewater", target: "Could you bring us some water, please?",
    source: "¿Nos trae agua, por favor?",
    sound: "kud yu bring as sam UÓ-ta plíis̬",
    gram: { trap: "Bring us water." },
  },
  ena2m5ofcoursehereyouare: { id: "ena2m5ofcoursehereyouare", target: "Of course. Here you are.", source: "Claro. Aquí tiene. (así se contesta a una petición)", sound: "ov KÓOS. jía yu AA" },
  ena2m5imafraidwedonthaveany: {
    id: "ena2m5imafraidwedonthaveany", target: "I'm afraid we don't have any.",
    source: "Me temo que no nos queda. (decir que no, con educación)",
    sound: "áim a-FRÉID ui dóunt jav E-ni",
    gram: { trap: "No, we don't have." },
  },

  // ── ena2m5l9 — la queja, la disculpa y la cuenta ──
  ena2m5excusemethisiscold: {
    id: "ena2m5excusemethisiscold", target: "Excuse me, this is cold.",
    source: "Perdone, esto está frío.",
    sound: "iks-KIÚs̬ mi, dis is̬ KÓULD",
    gram: { same: ["Sorry, this isn't very hot."] },
  },
  ena2m5ithinktheresamistake: {
    id: "ena2m5ithinktheresamistake", target: "I think there's a mistake in the bill.",
    source: "Creo que hay un error en la cuenta.",
    sound: "ái zink déas̬ a mis-TÉIK in de BIL",
    gram: { trap: "There has a mistake in the bill." },
  },
  ena2m5imsosorryaboutthat: { id: "ena2m5imsosorryaboutthat", target: "I'm so sorry about that.", source: "Cuánto lo siento. (lo que contesta quien atiende)", sound: "áim sóu SO-ri a-báut DAT" },
  ena2m5couldwehavethebill: {
    id: "ena2m5couldwehavethebill", target: "Could we have the bill, please?",
    source: "¿Nos trae la cuenta, por favor? — en Reino Unido, bill",
    sound: "kud ui jav de BIL plíis̬",
    gram: { trap: "Bring us the bill.", same: ["Can we pay, please?"] },
  },
  ena2m5wedidntorderthis: { id: "ena2m5wedidntorderthis", target: "We didn't order this.", source: "Esto no lo hemos pedido.", sound: "ui DÍ-dent OO-da dis" },
};

export const ena2m5: Phase = {
  id: "ena2m5",
  level: "a2",
  n: 5,
  title: "How much sugar?",
  goal: "Comer y beber fuera de casa de principio a fin: distinguir lo que el inglés cuenta de lo que no, cuantificarlo (much, many, a lot of, a few, a little), pedirlo con el registro que puntúa (Could I have… please) y quejarte y disculparte sin sonar borde.",
  color: "#4d7c0f",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — los dos montones: lo que se cuenta y lo que se pesa
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l1",
      phaseId: "ena2m5",
      title: "Two coffees, please",
      subtitle: "El inglés parte los sustantivos en dos montones — y no los reparte como el español",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Lo que hay en la mesa",
          itemIds: ["ena2m5salt", "ena2m5soup", "ena2m5meat", "ena2m5vegetables", "ena2m5twocoffeesplease", "ena2m5thefoodwasgood", "ensugar", "enbread"],
        },
        {
          kind: "note",
          note: {
            title: "Dos montones, y cada uno con su gramática",
            body: "El inglés mira cada sustantivo y decide si es <b>una cosa que se cuenta</b> (una manzana, dos manzanas) o <b>una materia que se pesa</b> (pan, arroz, agua). Y de esa decisión cuelga media gramática del módulo:<br/><br/><b>Lo que se cuenta</b> (countable): lleva <b>a / an</b>, tiene plural con <b>-s</b> y pide <i>How many?</i> — <i>an apple, two apples, a few apples</i>.<br/><b>Lo que no se cuenta</b> (uncountable): <b>nunca</b> lleva a / an, <b>nunca</b> tiene plural, el verbo va en <b>singular</b> y pide <i>How much?</i> — [[bread|el pan]], [[rice|el arroz]], [[salt|la sal]], [[soup|la sopa]], [[meat|la carne]].<br/><br/>Hasta aquí, el español hace algo parecido: tampoco dices «dos panes» cuando hablas de pan en general. <b>El problema es que los dos idiomas no reparten igual.</b> [[vegetables|las verduras]] en inglés se cuentan y en español las tratas como un bloque; y en el módulo siguiente vas a ver diez palabras que el español pluraliza sin pestañear y el inglés no deja.<br/><br/>Y una cosa que parece una excepción y no lo es: <b>Two coffees, please.</b> Cuando pides, no estás hablando del café como materia, estás contando <b>tazas</b>. Igual con <i>two teas</i>, <i>three beers</i>. Fuera de la barra, el café vuelve a su montón: <i>I don't drink coffee.</i>",
            table: [
              ["se cuenta (countable)", "no se cuenta (uncountable)"],
              ["an apple · two apples", "bread · rice · salt · soup"],
              ["lleva a / an", "no lleva a / an"],
              ["tiene plural en -s", "no tiene plural"],
              ["How many? · a few", "How much? · a little"],
              ["The apples are on the table.", "The bread is on the table."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l1e1", type: "fastmatch", prompt: "Calentamiento — la despensa del A1, a toda velocidad",
              pairs: [
                { target: "bread", source: "el pan" },
                { target: "sugar", source: "el azúcar" },
                { target: "rice", source: "el arroz" },
                { target: "cheese", source: "el queso" },
                { target: "eggs", source: "los huevos" },
              ],
              targetSeconds: 25,
              itemIds: ["enbread", "ensugar", "enrice", "encheese", "eneggs"],
              tip: "Fíjate en cuál de las cinco lleva -s. Esa es la única que el inglés cuenta, y no es casualidad: los huevos se cogen de uno en uno.",
            },
            {
              id: "ena2m5l1e2", type: "bucket", prompt: "¿El inglés lo cuenta o no?",
              categories: ["se cuenta: an apple, two apples", "no se cuenta: some rice"],
              items: [
                { text: "apple", bucket: 0 },
                { text: "rice", bucket: 1 },
                { text: "egg", bucket: 0 },
                { text: "salt", bucket: 1 },
                { text: "sandwich", bucket: 0 },
                { text: "soup", bucket: 1 },
                { text: "vegetables", bucket: 0 },
                { text: "meat", bucket: 1 },
              ],
              itemIds: ["ena2m5salt", "ena2m5soup", "ena2m5meat", "ena2m5vegetables", "enapple", "enrice"],
              tip: "La prueba rápida: ¿puedes decir «two ___»? Two apples, sí. Two rices, no. Si no puedes contarlo, va al montón de la derecha.",
            },
            {
              id: "ena2m5l1e3", type: "mc", prompt: "En la barra del café de Sam",
              question: "Valeria pide dos cafés. ¿Cómo lo dice?",
              options: ["Two coffees, please.", "Two coffee, please.", "Two coffees, thanks you."],
              answer: 0,
              whyWrong: [null, "Al pedir cuentas TAZAS, y las tazas llevan plural", "«thanks you» no existe: o thanks, o thank you"],
              itemIds: ["ena2m5twocoffeesplease", "encoffee"],
              tip: "Coffee es incontable en la despensa y contable en la barra. No es una excepción: es que ahí ya no hablas del café, hablas de la taza.",
            },
            {
              id: "ena2m5l1e4", type: "cloze", prompt: "Completa con a, an o nada",
              text: "For breakfast I have ___ apple and some toast.",
              answers: ["an"],
              translation: "Para desayunar tomo una manzana y tostadas.",
              hints: ["apple empieza por vocal", "a → a…"],
              itemIds: ["enapple", "entoast", "enbreakfast"],
              tip: "toast va sin nada porque no se cuenta: las tostadas son «some toast», por raro que suene desde el español.",
            },
            {
              id: "ena2m5l1e5", type: "errorfix", prompt: "Corrige el plural imposible",
              wrong: "I bought some breads at Mr Patel's shop.",
              answers: ["I bought some bread at Mr Patel's shop."],
              why: "bread no tiene plural en inglés: es materia, como el agua o la sal. Si necesitas contarlo, cuentas las barras — «two loaves of bread» —, pero la palabra bread se queda quieta.",
              translation: "Compré pan en la tienda de Mr Patel.",
              itemIds: ["enbread", "enshop"],
            },
            {
              id: "ena2m5l1e6", type: "match", prompt: "Empareja cada palabra con su montón",
              pairs: [
                { target: "salt", source: "la sal — no se cuenta" },
                { target: "vegetables", source: "las verduras — sí se cuentan" },
                { target: "soup", source: "la sopa — no se cuenta" },
                { target: "sandwich", source: "el sándwich — sí se cuenta" },
              ],
              itemIds: ["ena2m5salt", "ena2m5vegetables", "ena2m5soup", "ensandwich"],
            },
            {
              id: "ena2m5l1e7", type: "transform", prompt: "De uno a dos",
              source: "Can I have a coffee, please?",
              instruction: "Pide dos",
              answers: ["Can I have two coffees, please?"],
              translation: "¿Me pones dos cafés, por favor?",
              hints: ["a → two, y la taza se pluraliza", "Can I have two coff…, please?"],
              itemIds: ["encanihaveacoffee", "ena2m5twocoffeesplease"],
            },
            {
              id: "ena2m5l1e8", type: "mc", prompt: "El verbo que va detrás",
              question: "¿Cuál es la buena?",
              options: ["The soup is very hot.", "The soup are very hot.", "The soups is very hot."],
              answer: 0,
              whyWrong: [null, "soup no se cuenta, así que el verbo va en singular", "soup no tiene plural"],
              itemIds: ["ena2m5soup", "enitshot"],
              tip: "Regla mecánica: montón de la derecha → verbo en singular, siempre. Es la misma que te va a salvar con news y con information.",
            },
            {
              id: "ena2m5l1e9", type: "build", prompt: "Construye el pedido",
              target: "Two coffees and some bread please",
              translation: "Dos cafés y pan, por favor",
              distractors: ["coffee", "breads"],
              itemIds: ["ena2m5twocoffeesplease", "enbread", "enplease"],
              tip: "Las dos fichas que sobran son justo las dos trampas: coffee sin -s cuando cuentas tazas, y bread con -s cuando no se cuenta.",
            },
            {
              id: "ena2m5l1e10", type: "listen", prompt: "Escucha y transcribe",
              text: "The food was very good.",
              translation: "La comida estaba muy buena.",
              hints: ["Empieza por The f…", "The food w… very good."],
              itemIds: ["ena2m5thefoodwasgood"],
            },
            {
              id: "ena2m5l1e11", type: "speak", prompt: "Dilo en voz alta — tu primer pedido del módulo",
              text: "Two coffees and a sandwich, please.",
              phonetic: "tuu KO-fis̬ and a SÁN-uich, plíis̬",
              translation: "Dos cafés y un sándwich, por favor.",
              itemIds: ["ena2m5twocoffeesplease", "ensandwich", "enplease"],
              tip: "coffees termina en /z/: «KO-fis̬», con la lengua vibrando. Y el please al final no es un adorno: sin él, en inglés, esto es una orden.",
            },
            {
              id: "ena2m5l1e12", type: "type", prompt: "Cierre de producción",
              question: "La comida estaba muy buena, pero la sopa tenía demasiada sal.",
              answers: [
                "The food was very good, but there was too much salt in the soup.",
                "The food was very good, but the soup had too much salt.",
                "The food was very good but there was too much salt in the soup.",
              ],
              hints: ["food y soup y salt: los tres del montón que no se cuenta, los tres con verbo en singular", "The food w… very good, but there w… too m… salt in the soup."],
              itemIds: ["ena2m5thefoodwasgood", "ena2m5soup", "ena2m5salt"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m5-1",
            book: "Two coffees, please.",
            real: "Two coffees, cheers.",
            meaning: "Dos cafés, gracias",
            when: "En una barra, un pub o un puesto de comida, con quien te atiende. En Reino Unido «cheers» vale como «gracias» todo el día y no solo para brindar. En el Writing del examen, y con cualquiera a quien trates de usted, escribe please y thank you: cheers no puntúa como registro neutro.",
            register: "amigos",
            note: "Es una fórmula de cierre: se dice al final de la frase y sustituye al gracias, nunca al por favor.",
            sound: "tuu KO-fis̬, CHÍAS̬",
            level: "a2",
            itemId: "ena2m5twocoffeesplease",
          },
        },
      ],
      resources: [
        { label: "British Council — Countable and uncountable nouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/countable-uncountable-nouns", note: "Lee la primera mitad (5 min) y haz una lista de dos columnas con la comida de tu nevera. Las que dudes, apúntalas: son las que vas a fallar." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — la lista cerrada
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l2",
      phaseId: "ena2m5",
      title: "People are very friendly",
      subtitle: "Diez palabras que el español cuenta y el inglés no — se aprenden enteras",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "La lista y sus concordancias",
          itemIds: ["ena2m5uncountablegroup", "ena2m5peoplearefriendly", "ena2m5somegoodadvice", "ena2m5thenewsisgood", "ena2m5myhairisverylong", "ena2m5money", "enpeople", "enhomework"],
        },
        {
          kind: "note",
          note: {
            title: "Las diez: apréndetelas como una lista, no como una regla",
            body: "Esto no se deduce. No hay ninguna lógica que explique por qué <i>a mistake</i> se cuenta y <i>advice</i> no; simplemente el inglés reparte así y el español reparte de otra manera. Como no hay regla, <b>lo que hay es una lista, y es cerrada</b>: diez palabras. Se aprenden enteras, con su verbo, y te ahorran el error que más lejos llega — hay gente con nivel C2 que sigue diciendo <i>*the informations</i>.<br/><br/><b>people · news · information · advice · furniture · luggage · homework · money · hair · bread</b><br/><br/>Ninguna lleva <b>-s</b>. Ninguna lleva <b>a / an</b>. Y todas llevan el verbo <b>en singular</b>… menos una: [[People are very friendly.|La gente es muy maja.]] <b>people es plural</b> (uno es <i>a person</i>), así que va con <i>are</i>, con <i>many</i> y con <i>a lot of</i>. Es la rara de la lista, y por eso va la primera.<br/><br/>Dos que dan especial guerra:<br/>· <b>news</b> acaba en -s y aun así es singular: [[The news is good.|Las noticias son buenas.]]<br/>· <b>hair</b> es todo el pelo de la cabeza a la vez: [[My hair is very long and dark.|Tengo el pelo muy largo y moreno.]] <i>*My hairs</i> significaría pelos sueltos, uno a uno, y da bastante grima.<br/><br/>¿Y si necesitas contarlas? Se cuentan por porciones —<i>a piece of advice</i>, <i>two pieces of luggage</i>— y eso es la lección 5 entera.",
            table: [
              ["español", "inglés", "verbo"],
              ["la gente es maja", "people are friendly", "are (¡plural!)"],
              ["las noticias son buenas", "the news is good", "is"],
              ["necesito información", "I need information", "is"],
              ["me dio dos consejos", "she gave me some advice", "is"],
              ["tengo muchos deberes", "I have a lot of homework", "is"],
              ["tengo el pelo largo", "my hair is long", "is"],
              ["¿cuánto dinero?", "how much money?", "is"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l2e1", type: "bucket", prompt: "¿Con is o con are?",
              categories: ["… is", "… are"],
              items: [
                { text: "The news", bucket: 0 },
                { text: "People", bucket: 1 },
                { text: "The information", bucket: 0 },
                { text: "My hair", bucket: 0 },
                { text: "The vegetables", bucket: 1 },
                { text: "The furniture", bucket: 0 },
                { text: "The eggs", bucket: 1 },
                { text: "My luggage", bucket: 0 },
              ],
              itemIds: ["ena2m5uncountablegroup", "ena2m5thenewsisgood", "ena2m5peoplearefriendly", "ena2m5myhairisverylong", "ena2m5vegetables"],
              tip: "De la lista de diez, solo people se va a la columna de la derecha. Las otras nueve, todas is. Con eso ya tienes el 90 % resuelto.",
            },
            {
              id: "ena2m5l2e2", type: "errorfix", prompt: "El error nº 1 del hispanohablante — corrígelo",
              wrong: "People is very friendly in London.",
              answers: ["People are very friendly in London."],
              why: "people no es «la gente» en singular: es el plural de person. Uno es a person, dos son two people. Y si el sujeto es plural, el verbo también: people ARE. Este fallo se oye en alumnos de nivel avanzado, así que mátalo hoy.",
              translation: "La gente es muy maja en Londres.",
              itemIds: ["ena2m5peoplearefriendly", "enpeople"],
            },
            {
              id: "ena2m5l2e3", type: "errorfix", prompt: "Otro de la lista",
              wrong: "I need some advices about the exam.",
              answers: ["I need some advice about the exam."],
              why: "advice no tiene plural. «Dos consejos» es two pieces of advice, y «un consejo» es a piece of advice. La palabra advice nunca lleva -s ni «an» delante.",
              translation: "Necesito que me aconsejen sobre el examen.",
              itemIds: ["ena2m5somegoodadvice"],
            },
            {
              id: "ena2m5l2e4", type: "errorfix", prompt: "Y el del pelo, que da grima",
              wrong: "My hairs are very long and dark.",
              answers: ["My hair is very long and dark."],
              why: "hair es todo el pelo a la vez, así que va en singular. En plural, hairs son pelos sueltos: los que encuentras en la sopa. Es el mismo reparto que people o information: el español los cuenta y el inglés no.",
              translation: "Tengo el pelo muy largo y moreno.",
              itemIds: ["ena2m5myhairisverylong"],
            },
            {
              id: "ena2m5l2e5", type: "mc", prompt: "La que acaba en -s y no es plural",
              question: "«Las noticias son buenas»",
              options: ["The news is good.", "The news are good.", "The new is good."],
              answer: 0,
              whyWrong: [null, "news acaba en -s pero es singular: is", "«new» es el adjetivo «nuevo», no la noticia"],
              itemIds: ["ena2m5thenewsisgood"],
              tip: "El truco: news se comporta como information. Si dudas, cámbiala mentalmente por information y verás que nadie diría «the information are».",
            },
            {
              id: "ena2m5l2e6", type: "cloze", prompt: "Completa con el verbo",
              text: "There ___ a lot of people in the café today.",
              answers: ["are"],
              translation: "Hay mucha gente hoy en el café.",
              hints: ["people cuenta como plural", "There a…"],
              itemIds: ["ena2m5peoplearefriendly", "ena2m1therewere", "enpeople"],
              tip: "Es la misma trampa de «There were a lot of people» del módulo 1. En español «había» y «hay» no se mueven; en inglés, con people, siempre plural.",
            },
            {
              id: "ena2m5l2e7", type: "cloze", prompt: "Completa — ojo al plural que no existe",
              text: "I have a lot of ___ tonight, so I can't come.",
              answers: ["homework"],
              translation: "Tengo muchos deberes esta noche, así que no puedo ir.",
              hints: ["Es una de las diez de la lista", "home…"],
              itemIds: ["enhomework", "ena2m5uncountablegroup"],
            },
            {
              id: "ena2m5l2e8", type: "match", prompt: "Empareja cada incontable con su equivalente español en plural",
              pairs: [
                { target: "information", source: "las informaciones, los datos" },
                { target: "advice", source: "los consejos" },
                { target: "furniture", source: "los muebles" },
                { target: "luggage", source: "las maletas, el equipaje" },
              ],
              itemIds: ["ena2m5uncountablegroup", "ena2m5somegoodadvice"],
              tip: "Míralo así: el español pluraliza las cuatro y el inglés ninguna. Esa asimetría es toda la lección; el resto es repetirla hasta que salga sola.",
            },
            {
              id: "ena2m5l2e9", type: "gapbank", prompt: "El primer mes de Valeria en Londres: rellena con la ficha que toca",
              text: "London is expensive, but ___ are very friendly here. Amy gave me some good ___ about the buses, and now I never miss one. I haven't got much ___ , so I always walk to work.",
              answers: ["people", "advice", "money"],
              bank: ["people", "advice", "money", "persons", "informations", "luggage"],
              translation: "Londres es cara, pero la gente de aquí es muy maja. Amy me dio unos buenos consejos sobre los autobuses y ya no pierdo ninguno. No tengo mucho dinero, así que voy siempre andando al trabajo.",
              itemIds: ["ena2m5peoplearefriendly", "ena2m5somegoodadvice", "ena2m5money", "ena2m1missedthebus"],
              tip: "Las tres fichas que sobran son las tres que escribiría un hispanohablante sin pensar: persons, informations y una palabra suelta de la lista. Ninguna cabe.",
            },
            {
              id: "ena2m5l2e10", type: "listen", prompt: "Dictado — dos de la lista en una frase",
              text: "The news is good and people are happy.",
              translation: "Las noticias son buenas y la gente está contenta.",
              hints: ["news → singular · people → plural", "The news i… good and people a… happy."],
              itemIds: ["ena2m5thenewsisgood", "ena2m5peoplearefriendly"],
              tip: "Una frase, dos incontables y dos verbos distintos. Si te sale al oído, la lista ya está entrando.",
            },
            {
              id: "ena2m5l2e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "La gente es muy maja aquí y me dieron unos buenos consejos.",
              answers: [
                "People are very friendly here and they gave me some good advice.",
                "People are very friendly here and gave me some good advice.",
                "People are very friendly here and they gave me good advice.",
              ],
              hint: "dos de las diez palabras de la lista, y ninguna lleva -s",
              itemIds: ["ena2m5peoplearefriendly", "ena2m5somegoodadvice"],
            },
            {
              id: "ena2m5l2e12", type: "type", prompt: "Cierre de producción",
              question: "No tengo mucho dinero, pero la gente aquí es muy maja.",
              answers: [
                "I don't have much money, but people are very friendly here.",
                "I haven't got much money, but people are very friendly here.",
                "I don't have much money, but people here are very friendly.",
              ],
              hints: ["money → much · people → are", "I don't have m… money, but people a… very friendly here."],
              itemIds: ["ena2m5money", "ena2m5peoplearefriendly"],
              tip: "Ahí están las dos mitades de la lección: la palabra que no se cuenta pide much, y la única plural de la lista pide are.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Countable and uncountable nouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/countable-uncountable-nouns", note: "Baja hasta la lista de incontables «raros» y compárala con las diez de esta lección. Lo que te sorprenda, apúntalo: la sorpresa es exactamente el error que ibas a cometer." },
        { label: "BBC Learning English", url: "https://www.bbc.co.uk/learningenglish", note: "Escucha cualquier boletín corto y cuenta cuántas veces dicen «the news is». Oírlo tres veces vale más que leerlo diez." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — some / any, sistematizados
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l3",
      phaseId: "ena2m5",
      title: "Some tea? Any milk?",
      subtitle: "El A1 te dio la fórmula; aquí está el sistema — con sus dos excepciones",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Ofrecer, pedir y negar",
          itemIds: ["ena2m5wouldyoulikesometea", "ena2m5canihavesomewater", "ena2m5theydonthaveanysoup", "ena2m5somethingtoeat", "ena2m5anythingtodrink", "ensome", "enany"],
        },
        {
          kind: "note",
          note: {
            title: "some / any: la regla, y las dos veces que se salta",
            body: "En el A1 lo aprendiste como fórmula: <b>some</b> afirma, <b>any</b> pregunta y niega. Sigue siendo verdad y sigue siendo el 80 % de los casos:<br/><br/>· afirmo → <i>There's <b>some</b> bread.</i><br/>· pregunto → [[Is there any milk?|¿Hay leche?]]<br/>· niego → [[They don't have any soup today.|Hoy no tienen sopa.]]<br/><br/><b>Y ahora las dos excepciones, que son las que caen en el examen oral</b>, porque las dos son de restaurante:<br/><b>1. Al OFRECER</b> algo se dice some aunque sea pregunta: [[Would you like some tea?|¿Quieres té?]] Con <i>any</i> sonaría a que dudas de que quede té.<br/><b>2. Al PEDIR</b> algo, igual: [[Can I have some water?|¿Me pones agua?]] El any ahí suena a súplica rara.<br/>La lógica es sencilla: some se usa cuando <b>ya cuentas con que la respuesta es sí</b>.<br/><br/>Y la familia entera funciona igual: <b>something / anything</b>, <b>somebody / anybody</b>, <b>somewhere / anywhere</b> — [[something to eat|algo de comer]] en la afirmativa, [[Anything to drink?|¿Algo para beber?]] en la pregunta del camarero (que aquí sí es pregunta de verdad, no ofrecimiento con una copa en la mano).<br/><br/>Y no se te olvide lo del A1: en inglés <b>se niega una sola vez</b>. <i>I don't want <b>any</b> sugar</i>, jamás <i>*I don't want no sugar</i>.",
            table: [
              ["situación", "qué se usa", "ejemplo"],
              ["afirmo", "some", "There's some bread."],
              ["pregunto de verdad", "any", "Is there any milk?"],
              ["niego", "any", "They don't have any soup."],
              ["OFREZCO", "some", "Would you like some tea?"],
              ["PIDO", "some", "Can I have some water?"],
              ["compuestos", "something / anything", "something to eat · Anything to drink?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l3e1", type: "bucket", prompt: "¿some o any? Cuidado con las dos excepciones",
              categories: ["some", "any"],
              items: [
                { text: "Would you like ___ cake?", bucket: 0 },
                { text: "Is there ___ milk in the fridge?", bucket: 1 },
                { text: "Can I have ___ water, please?", bucket: 0 },
                { text: "They don't have ___ soup today.", bucket: 1 },
                { text: "There's ___ bread on the table.", bucket: 0 },
                { text: "We didn't buy ___ vegetables.", bucket: 1 },
              ],
              itemIds: ["ena2m5wouldyoulikesometea", "ena2m5canihavesomewater", "ena2m5theydonthaveanysoup", "ensome", "enany", "enisthereanymilk"],
              tip: "Las dos primeras son preguntas las dos, y llevan cosas distintas. La diferencia no es la forma: es si estás ofreciendo o preguntando de verdad.",
            },
            {
              id: "ena2m5l3e2", type: "mc", prompt: "Sam te ve entrar en el café",
              question: "Te ofrece un té. ¿Qué dice?",
              options: ["Would you like some tea?", "Would you like any tea?", "Do you like any tea?"],
              answer: 0,
              whyWrong: [null, "Con any parecería que duda de que quede té; ofrecer va con some", "«Do you like tea?» pregunta si te gusta el té en general, no si quieres uno ahora"],
              itemIds: ["ena2m5wouldyoulikesometea", "endoyoulike", "entea"],
              tip: "Ojo a la pareja: «Do you like tea?» es sobre tus gustos; «Would you like some tea?» es una taza aquí y ahora. El examen las mezcla a propósito.",
            },
            {
              id: "ena2m5l3e3", type: "cloze", prompt: "Completa — estás pidiendo",
              text: "Excuse me, can I have ___ water, please?",
              answers: ["some"],
              translation: "Perdona, ¿me pones agua, por favor?",
              hints: ["Es pregunta, pero estás pidiendo", "s…"],
              itemIds: ["ena2m5canihavesomewater", "enexcuseme", "enwater"],
            },
            {
              id: "ena2m5l3e4", type: "cloze", prompt: "Completa — aquí niegas",
              text: "I'm sorry, we haven't got ___ vegetarian food today.",
              answers: ["any"],
              translation: "Lo siento, hoy no tenemos comida vegetariana.",
              hints: ["haven't got ya niega", "a…"],
              itemIds: ["ena2m5theydonthaveanysoup", "enany"],
            },
            {
              id: "ena2m5l3e5", type: "errorfix", prompt: "La doble negación, que el español regala",
              wrong: "I don't want no sugar in my coffee.",
              answers: ["I don't want any sugar in my coffee."],
              why: "En español la negación se reparte («no quiero nada de azúcar») y en inglés se niega UNA sola vez: el don't ya niega, así que detrás va any. Dos negaciones juntas, en inglés, se leen como una afirmación.",
              translation: "No quiero azúcar en el café.",
              itemIds: ["enany", "ensugar", "encoffee"],
            },
            {
              id: "ena2m5l3e6", type: "transform", prompt: "De afirmar a negar",
              source: "There's some milk in the fridge.",
              instruction: "Ponla en negativa",
              answers: ["There isn't any milk in the fridge.", "There's no milk in the fridge."],
              translation: "No hay leche en la nevera.",
              hints: ["some se convierte en any al negar", "There isn't a… milk…"],
              itemIds: ["ensome", "enany", "enmilk", "eninthefridge"],
              tip: "La segunda respuesta también vale: «there's no milk» dice lo mismo con la negación metida en el no. Lo que no vale es mezclarlas: «there isn't no milk».",
            },
            {
              id: "ena2m5l3e7", type: "build", prompt: "Construye la pregunta del camarero",
              target: "Would you like something to eat",
              translation: "¿Quiere tomar algo de comer?",
              distractors: ["anything", "eating"],
              itemIds: ["ena2m5wouldyoulikesometea", "ena2m5somethingtoeat"],
              tip: "Ofrecimiento → something, igual que some. anything ahí sonaría a «¿hay algo, lo que sea, que puedas comer?».",
            },
            {
              id: "ena2m5l3e8", type: "hearreal", prompt: "¿Libro o calle? El ofrecimiento más británico que existe",
              book: "Would you like some tea?",
              real: "Fancy a cuppa?",
              translation: "¿Te apetece un té?",
              itemIds: ["ena2m5wouldyoulikesometea", "encupoftea"],
              tip: "cuppa es «a cup of tea» fundido en una palabra, y fancy es «apetecer». Solo con amigos: al cliente se le ofrece con Would you like.",
            },
            {
              id: "ena2m5l3e9", type: "listen", prompt: "Dictado",
              text: "Anything to drink?",
              translation: "¿Algo para beber?",
              hints: ["Empieza por Any…", "…to drink?"],
              itemIds: ["ena2m5anythingtodrink", "enanythingelse"],
              tip: "Esta la vas a oír en cada mesa de Reino Unido. Va sin «would you like» delante: el camarero se lo come.",
            },
            {
              id: "ena2m5l3e10", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              mode: "recognize",
              source: "They don't have any soup today, but would you like some bread?",
              answers: [
                "Hoy no tienen sopa, pero ¿quieres pan?",
                "Hoy no tienen sopa, ¿pero quieres pan?",
                "Hoy no hay sopa, pero ¿quieres pan?",
              ],
              itemIds: ["ena2m5theydonthaveanysoup", "ena2m5wouldyoulikesometea", "enbread"],
              tip: "Una frase con any y otra con some, y las dos mitades salen igual en español. Por eso hay que fijar el criterio en inglés: el español no te va a avisar.",
            },
            {
              id: "ena2m5l3e11", type: "type", prompt: "Cierre de producción",
              question: "¿Quieres té? — No, gracias. ¿Me pones agua?",
              answers: [
                "Would you like some tea? No, thanks. Can I have some water?",
                "Would you like some tea? No, thank you. Can I have some water?",
                "Would you like some tea? No, thanks. Can I have some water, please?",
              ],
              hints: ["Las dos frases llevan some: una ofrece y otra pide", "Would you like s… tea? No, thanks. Can I have s… water?"],
              itemIds: ["ena2m5wouldyoulikesometea", "ena2m5canihavesomewater", "enthankyou"],
              tip: "Dos preguntas seguidas y ni un any. Si te ha salido, ya tienes las excepciones instaladas donde hacen falta: en la mesa.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Some and any", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/some-any", note: "Lee la ficha entera y fíjate solo en los ejemplos con «Would you like…»: son la excepción de esta lección, y ahí la verás explicada por nativos." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — how much / how many · much · many · a lot of
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l4",
      phaseId: "ena2m5",
      title: "How much sugar?",
      subtitle: "Cuantificar los dos montones: much, many y el a lot of que se dice de verdad",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Cuánto y cuántos",
          itemIds: ["ena2m5howmuchsugar", "ena2m5howmanypeoplearethere", "ena2m5alotof", "ena2m5thereisntmuchmilk", "ena2m5toomuchsalt", "enhowmany", "enhowmuchisit"],
        },
        {
          kind: "note",
          note: {
            title: "much, many, a lot of: cuál va con cuál",
            body: "Cada montón tiene su cuantificador, y esta vez la regla sí es mecánica:<br/><br/>· <b>much</b> + lo que NO se cuenta: <i>much sugar, much milk, much money, much time</i>.<br/>· <b>many</b> + lo que SÍ se cuenta: <i>many eggs, many people, many tables</i>.<br/>· <b>a lot of</b> + <b>los dos</b>: <i>a lot of sugar</i>, <i>a lot of people</i>. Por eso es la que más se oye — el nativo no elige, tira de a lot of y se ahorra el problema.<br/><br/><b>El detalle que separa al A2 del A1</b>: much y many, solos, viven casi siempre en <b>preguntas y negaciones</b>. [[There isn't much milk.|No hay mucha leche.]] · <i>Are there many tables free?</i> En afirmativa suenan a libro antiguo: nadie dice <i>*I have many friends</i>, se dice <i>I have a lot of friends</i>.<br/><br/>Y las preguntas, que son de examen: <b>How much…?</b> para lo que no se cuenta y <b>How many…?</b> para lo que sí. [[How much sugar do you take?|¿Cuánto azúcar tomas?]] · [[How many people are there?|¿Cuánta gente hay?]] Ojo aquí: en español dices «cuánta gente» en singular, y en inglés people manda many y verbo plural.<br/><br/>Del A1 ya traías <b>How much is it?</b> (el precio). Es la misma how much: el dinero tampoco se cuenta.<br/><br/>Con <b>too</b> delante, la cantidad se vuelve queja: [[There's too much salt in the soup.|La sopa tiene demasiada sal.]] Es la frase que abre media reclamación de restaurante, y vuelve en la lección 9.",
            table: [
              ["", "no se cuenta", "se cuenta"],
              ["pregunta", "How much sugar?", "How many eggs?"],
              ["negación", "There isn't much milk.", "There aren't many tables."],
              ["afirmación (lo normal)", "a lot of sugar", "a lot of people"],
              ["queja", "too much salt", "too many people"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l4e1", type: "fastmatch", prompt: "Ráfaga — ¿de qué montón es cada una?",
              pairs: [
                { target: "sugar", source: "el azúcar → much" },
                { target: "eggs", source: "los huevos → many" },
                { target: "money", source: "el dinero → much" },
                { target: "people", source: "la gente → many" },
                { target: "milk", source: "la leche → much" },
              ],
              targetSeconds: 28,
              itemIds: ["ensugar", "eneggs", "ena2m5money", "enpeople", "enmilk"],
              tip: "El cronómetro solo premia. Lo que buscamos es que el montón te salga sin pensar: si tardas, ese ítem volverá en el repaso.",
            },
            {
              id: "ena2m5l4e2", type: "bucket", prompt: "¿How much o How many?",
              categories: ["How much…?", "How many…?"],
              items: [
                { text: "sugar", bucket: 0 },
                { text: "people", bucket: 1 },
                { text: "money", bucket: 0 },
                { text: "tables", bucket: 1 },
                { text: "milk", bucket: 0 },
                { text: "coffees", bucket: 1 },
                { text: "bread", bucket: 0 },
                { text: "sandwiches", bucket: 1 },
              ],
              itemIds: ["ena2m5howmuchsugar", "ena2m5howmanypeoplearethere", "ena2m5money", "enhowmany"],
              tip: "coffees está en la columna de la derecha porque son tazas, no café. Es la misma pirueta de la lección 1.",
            },
            {
              id: "ena2m5l4e3", type: "mc", prompt: "Sam te está preparando el café",
              question: "«¿Cuánto azúcar tomas?»",
              options: ["How much sugar do you take?", "How many sugar do you take?", "How much sugars do you take?"],
              answer: 0,
              whyWrong: [null, "sugar no se cuenta: pide much", "sugar no tiene plural"],
              itemIds: ["ena2m5howmuchsugar", "ensugar"],
              tip: "Y la respuesta se hace con la lección 6: «Just a little, thanks» o «Two, please» si son terrones. Los terrones sí se cuentan.",
            },
            {
              id: "ena2m5l4e4", type: "cloze", prompt: "Completa",
              text: "There isn't ___ milk in the fridge.",
              answers: ["much"],
              translation: "No hay mucha leche en la nevera.",
              hints: ["milk no se cuenta", "m…"],
              itemIds: ["ena2m5thereisntmuchmilk", "enmilk", "eninthefridge"],
            },
            {
              id: "ena2m5l4e5", type: "cloze", prompt: "Completa",
              text: "How ___ people are there in the café?",
              answers: ["many"],
              translation: "¿Cuánta gente hay en el café?",
              hints: ["people cuenta como plural", "m…"],
              itemIds: ["ena2m5howmanypeoplearethere", "enpeople"],
            },
            {
              id: "ena2m5l4e6", type: "errorfix", prompt: "Corrige el cuantificador",
              wrong: "I don't have many money this month.",
              answers: ["I don't have much money this month."],
              why: "money no se cuenta, así que pide much, no many. Es el mismo criterio de siempre: si no puedes decir «two ___», el cuantificador es much.",
              translation: "Este mes no tengo mucho dinero.",
              itemIds: ["ena2m5money", "ena2m5thereisntmuchmilk"],
            },
            {
              id: "ena2m5l4e7", type: "transform", prompt: "Suaviza la afirmación",
              source: "I have many friends in London.",
              instruction: "Dilo como lo diría un nativo",
              answers: ["I have a lot of friends in London.", "I've got a lot of friends in London."],
              translation: "Tengo muchos amigos en Londres.",
              hints: ["many en afirmativa suena a libro antiguo", "I have a l… of friends in London."],
              itemIds: ["ena2m5alotof", "ena2m5afewfriends"],
              tip: "No es que «many friends» esté mal: es que no se dice. En el oral del examen, a lot of suena natural y many suena traducido.",
            },
            {
              id: "ena2m5l4e8", type: "build", prompt: "Construye la queja",
              target: "There is too much salt in the soup",
              translation: "La sopa tiene demasiada sal",
              distractors: ["many", "are"],
              itemIds: ["ena2m5toomuchsalt", "ena2m5salt", "ena2m5soup"],
              tip: "Guárdate esta frase: en la lección 9 la vas a decir en voz alta, y con «Excuse me» delante.",
            },
            {
              id: "ena2m5l4e9", type: "audiomc", prompt: "Cazar la cantidad — 2 escuchas",
              audio: "There isn't much milk, but there's a lot of coffee and there are a few eggs in the fridge.",
              question: "¿De qué hay poco?",
              options: ["De leche", "De café", "De huevos"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "De café hay mucho: a lot of coffee", "De huevos hay unos cuantos: a few eggs"],
              itemIds: ["ena2m5thereisntmuchmilk", "ena2m5alotof", "enmilk", "eneggs"],
              tip: "En el Listening del examen, la respuesta suele estar en la negación, no en la palabra que suena más fuerte. Escucha el isn't.",
            },
            {
              id: "ena2m5l4e10", type: "listen", prompt: "Dictado — el enlace de a lot of",
              text: "There's a lot of sugar in this cake.",
              translation: "Esta tarta lleva mucho azúcar.",
              hints: ["«a lot of» suena todo pegado: a-LÓ-tov", "There's a l… of sugar in this cake."],
              itemIds: ["ena2m5alotof", "ensugar", "encake"],
              tip: "Si has oído «a lótov» y has escrito tres palabras, ya has hecho la mitad de la clínica de sonido de la lección siguiente.",
            },
            {
              id: "ena2m5l4e11", type: "type", prompt: "Cierre de producción",
              question: "¿Cuánta gente hay? No hay muchas mesas libres.",
              answers: [
                "How many people are there? There aren't many tables free.",
                "How many people are there? There aren't many free tables.",
                "How many people are there? There are not many tables free.",
              ],
              hints: ["people → many y verbo plural · tables → many", "How m… people a… there? There aren't m… tables free."],
              itemIds: ["ena2m5howmanypeoplearethere", "ena2m5therearentmanytables"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m5-2",
            book: "There's a lot of sugar in it.",
            real: "There's loads of sugar in it.",
            meaning: "Lleva un montón de azúcar",
            when: "Con amigos, hablando de cantidades: comida, gente, trabajo. «Loads of» vale para los dos montones, igual que a lot of, y en Reino Unido se oye a todas horas. En el examen escrito, a lot of: loads no baja nota pero no suma registro.",
            register: "amigos",
            note: "Su hermana es «tons of», y las dos son informales. Lo que NO se dice en afirmativa es «much sugar»: eso suena a gramática de examen mal aprendida.",
            sound: "déas̬ LÓUDS̬ ov SHU-ga",
            level: "a2",
            itemId: "ena2m5alotof",
          },
        },
      ],
      resources: [
        { label: "British Council — Countable and uncountable nouns", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/countable-uncountable-nouns", note: "Vuelve a la misma ficha, pero ahora mira solo los ejemplos con much y many. Verás que casi todos son preguntas o negaciones: no es casualidad." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: el enlace, y los envases
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l5",
      phaseId: "ena2m5",
      title: "Clínica de sonido: a bottle of water",
      subtitle: "Las palabras se enlazan — y así es como se cuenta lo que no se cuenta",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "Envases y porciones",
          itemIds: ["ena2m5abottleofwater", "ena2m5aglassofwine", "ena2m5asliceofcake", "ena2m5apieceofadvice", "ena2m5abitofsugar", "ena2m5aloafofbread", "encupoftea"],
        },
        {
          kind: "note",
          note: {
            title: "El envase cuenta lo que la palabra no puede contar",
            body: "Si <i>bread</i> no tiene plural, ¿cómo pides dos? Cuentas el <b>envase o la porción</b>, y el sustantivo se queda quieto detrás de <i>of</i>:<br/><br/>· <b>a bottle of</b> water, wine, milk — una botella<br/>· <b>a glass of</b> water, wine — un vaso, una copa<br/>· <b>a cup of</b> tea, coffee — una taza (ya la traías del A1)<br/>· <b>a slice of</b> cake, bread, cheese — una rodaja, un trozo de lo que se corta<br/>· <b>a piece of</b> cake, cheese — un trozo, en general<br/>· <b>a bit of</b> sugar, milk — un poquito<br/>· <b>a loaf of</b> bread — una barra, un pan entero<br/><br/>Y ahora <b>la joya</b>, que es lo que rescata a las diez de la lección 2: <i>piece</i> y <i>bit</i> valen también para lo abstracto. [[a piece of advice|un consejo]] · <i>two pieces of luggage</i> · <i>a piece of furniture</i> · <i>a bit of homework</i>. Ahí tienes cómo decir «dos consejos» sin escribir jamás <i>advices</i>.<br/><br/>Y el plural va en el <b>envase</b>, nunca en lo de dentro: <i>two bottles of water</i>, <i>three slices of cake</i>, <i>two pieces of advice</i>.",
            table: [
              ["lo que no se cuenta", "cómo se cuenta"],
              ["bread", "a loaf of bread · two slices of bread"],
              ["water", "a bottle of water · a glass of water"],
              ["cake", "a slice of cake · two slices of cake"],
              ["advice", "a piece of advice · two pieces of advice"],
              ["luggage", "two pieces of luggage"],
              ["sugar", "a bit of sugar"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Clínica: la última consonante se pega a la vocal siguiente",
            body: "Todas las frases de arriba tienen la misma juntura: una palabra que acaba en consonante y un <i>of</i> que empieza por vocal. Y el inglés hablado <b>no las separa</b>: las pega.<br/><br/><b>a lot of</b> → «a-LÓ-tov» · <b>a bit of</b> → «a-BÍ-tov» · <b>a glass of wine</b> → «a-GLAA-sov-uáin» · <b>a slice of cake</b> → «a-SLÁI-sov-kéik» · <b>pick it up</b> → «pi-ki-TAP»<br/><br/><b>Y esto es de las cosas que te salen gratis</b>, porque el español ya lo hace: tú no dices «los / amigos», dices «lo-sa-mi-gos»; ni «el / agua», sino «e-la-gua». Es exactamente el mismo mecanismo. Lo único que hay que quitar es la costumbre de leer palabra por palabra, que es lo que hace la escuela.<br/><br/>Por qué importa: <b>en el Listening no vas a oír palabras, vas a oír bloques.</b> Quien busca «a», «lot», «of» por separado no encuentra ninguna de las tres. Quien sabe que existe «a-LÓ-tov» lo caza a la primera.",
            table: [
              ["se escribe", "suena", "lo mismo en español"],
              ["a lot of", "a-LÓ-tov", "los amigos → lo-sa-mi-gos"],
              ["a bit of", "a-BÍ-tov", "el agua → e-la-gua"],
              ["a glass of wine", "a-GLAA-sov-uáin", "más o menos → má-so-me-nos"],
              ["pick it up", "pi-ki-TAP", "un abrazo → u-na-bra-zo"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l5e1", type: "match", prompt: "Empareja cada porción con lo suyo",
              pairs: [
                { target: "a bottle of…", source: "…water — una botella" },
                { target: "a slice of…", source: "…cake — una porción de lo que se corta" },
                { target: "a loaf of…", source: "…bread — una barra entera" },
                { target: "a piece of…", source: "…advice — un consejo" },
              ],
              itemIds: ["ena2m5abottleofwater", "ena2m5asliceofcake", "ena2m5aloafofbread", "ena2m5apieceofadvice"],
            },
            {
              id: "ena2m5l5e2", type: "speak", prompt: "Clínica 1 — pega la consonante a la vocal",
              text: "A bottle of water and a glass of wine.",
              phonetic: "a BO-tol-ov UÓ-ta and a GLAA-sov UÁIN",
              translation: "Una botella de agua y una copa de vino.",
              itemIds: ["ena2m5abottleofwater", "ena2m5aglassofwine"],
              tip: "No pares entre «bottle» y «of»: la l se pega a la o. Si te sale «bótol-ov», lo has hecho bien; si te sale «bo-tol · of», estás leyendo, no hablando.",
            },
            {
              id: "ena2m5l5e3", type: "shadow", prompt: "Sombrea el bloque entero — primero lento, luego a velocidad normal",
              text: "A bit of sugar and a slice of cake, please.",
              phonetic: "a BÍ-tov SHU-ga and a SLÁI-sov kéik, plíis̬",
              translation: "Un poquito de azúcar y un trozo de tarta, por favor.",
              reps: 2,
              itemIds: ["ena2m5abitofsugar", "ena2m5asliceofcake"],
              tip: "Persigue el audio sin adelantarte. Lo que estás copiando no son las palabras: son las junturas.",
            },
            {
              id: "ena2m5l5e4", type: "listen", prompt: "Dictado — separa lo que suena pegado",
              text: "Can I have a slice of cake?",
              translation: "¿Me pones un trozo de tarta?",
              hints: ["«slice of» suena «SLÁI-sov», pero son dos palabras", "Can I have a sl… of cake?"],
              itemIds: ["ena2m5asliceofcake", "encake", "encanihaveacoffee"],
              tip: "Este es el ejercicio de la clínica: oír un bloque y escribirlo separado. En el examen te van a pedir exactamente esto.",
            },
            {
              id: "ena2m5l5e5", type: "mc", prompt: "Cómo se cuenta lo que no se cuenta",
              question: "«Me dio dos consejos»",
              options: ["She gave me two pieces of advice.", "She gave me two advices.", "She gave me two advice."],
              answer: 0,
              whyWrong: [null, "advice no tiene plural: el plural va en el envase, pieces", "sin envase no hay manera de contarlo"],
              itemIds: ["ena2m5apieceofadvice", "ena2m5somegoodadvice"],
              tip: "Fíjate en dónde cae la -s: en pieces, no en advice. Esa es la regla entera de los envases.",
            },
            {
              id: "ena2m5l5e6", type: "cloze", prompt: "Completa con el envase",
              text: "I bought a ___ of bread at the shop.",
              answers: ["loaf"],
              translation: "Compré una barra de pan en la tienda.",
              hints: ["Un pan entero, no una rodaja", "l…"],
              itemIds: ["ena2m5aloafofbread", "enbread", "enshop"],
            },
            {
              id: "ena2m5l5e7", type: "bucket", prompt: "¿El plural va en el envase o en lo de dentro?",
              categories: ["two bottles of water", "two waters"],
              items: [
                { text: "two slices of cake", bucket: 0 },
                { text: "two cakes", bucket: 1 },
                { text: "two pieces of advice", bucket: 0 },
                { text: "two coffees (en la barra)", bucket: 1 },
                { text: "two loaves of bread", bucket: 0 },
                { text: "two sandwiches", bucket: 1 },
              ],
              itemIds: ["ena2m5asliceofcake", "ena2m5apieceofadvice", "ena2m5aloafofbread", "ena2m5twocoffeesplease"],
              tip: "A la derecha van las que se cuentan solas. A la izquierda, las que necesitan envase. Y «two coffees» está a la derecha porque ahí ya son tazas.",
            },
            {
              id: "ena2m5l5e8", type: "errorfix", prompt: "Corrige el plural",
              wrong: "Can I have two breads, please?",
              answers: ["Can I have two loaves of bread, please?"],
              why: "bread no se pluraliza: lo que se cuenta es la barra. Two loaves of bread si quieres dos barras, two slices of bread si quieres dos rebanadas. La -s va siempre en el envase.",
              translation: "¿Me pone dos barras de pan, por favor?",
              itemIds: ["ena2m5aloafofbread", "enbread"],
            },
            {
              id: "ena2m5l5e9", type: "build", prompt: "Construye el pedido de la mesa",
              target: "A bottle of water and two glasses of wine",
              translation: "Una botella de agua y dos copas de vino",
              distractors: ["waters", "wines"],
              itemIds: ["ena2m5abottleofwater", "ena2m5aglassofwine"],
              tip: "Las dos fichas que sobran son el error entero: en inglés se pluralizan las copas, no el vino.",
            },
            {
              id: "ena2m5l5e10", type: "hearreal", prompt: "¿Libro o calle? Lo que le pasa a «a lot of» a velocidad normal",
              book: "There's a lot of sugar in it.",
              real: "There's alotta sugar in it.",
              translation: "Lleva mucho azúcar.",
              itemIds: ["ena2m5alotof", "ensugar"],
              tip: "Se escribe «a lot of» y se dice «alota». No lo copies al escribir: solo tienes que reconocerlo cuando pase a toda velocidad.",
            },
            {
              id: "ena2m5l5e11", type: "speak", prompt: "Clínica 2 — la juntura fuera de la mesa",
              text: "Pick it up and put it on the table.",
              phonetic: "pi-ki-TAP and pu-ti-ton de TÉI-bol",
              translation: "Cógelo y ponlo en la mesa.",
              itemIds: ["entable"],
              tip: "Seis palabras y ni una pausa: dos bloques. Esto es lo que oyes cuando un británico habla y te parece que va rapidísimo — no va rápido, va pegado.",
            },
            {
              id: "ena2m5l5e12", type: "type", prompt: "Cierre de producción",
              question: "¿Me pone una botella de agua y un trozo de tarta, por favor?",
              answers: [
                "Can I have a bottle of water and a slice of cake, please?",
                "Could I have a bottle of water and a slice of cake, please?",
                "Can I have a bottle of water and a piece of cake, please?",
              ],
              hints: ["Los dos envases con of · el please al final", "Can I have a b… of water and a sl… of cake, please?"],
              itemIds: ["ena2m5abottleofwater", "ena2m5asliceofcake", "encanihaveacoffee"],
              tip: "Léelo en voz alta antes de darlo por bueno: «bótol-ov-uóta» y «sláisov-kéik». Escrito son ocho palabras; hablado, dos bloques.",
            },
          ],
        },
      ],
      resources: [
        { label: "BBC Learning English — Pronunciation", url: "https://www.bbc.co.uk/learningenglish/english/features/pronunciation", note: "Busca los vídeos de «connected speech» o «linking». Cinco minutos y vuelve aquí: el resto de la clínica es repetir en voz alta, no leer." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — (a) few / (a) little
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l6",
      phaseId: "ena2m5",
      title: "A few chips, a little salt",
      subtitle: "Un poco de qué — y lo que cambia cuando le quitas el «a»",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Poco, poquito y poquísimo",
          itemIds: ["ena2m5afewfriends", "ena2m5alittlemilk", "ena2m5fewpeoplecame", "ena2m5justalittlethanks", "ena2m5therearentmanytables", "ena2m3abitshy"],
        },
        {
          kind: "note",
          note: {
            title: "a few / a little: el mismo reparto de siempre",
            body: "Ya sabes el criterio, solo cambia la pareja de palabras:<br/><br/>· <b>a few</b> + lo que SE CUENTA: [[a few friends|unos cuantos amigos]], <i>a few eggs</i>, <i>a few minutes</i>.<br/>· <b>a little</b> + lo que NO se cuenta: [[a little milk|un poco de leche]], <i>a little sugar</i>, <i>a little time</i>.<br/><br/>Las dos son <b>positivas</b>: significan «hay algo, poco pero suficiente». <i>I have a little time</i> = tengo un rato.<br/><br/><b>Y aquí viene lo que pregunta el examen.</b> Si les quitas el <b>a</b>, se dan la vuelta y se vuelven negativas:<br/>· <i>a few people</i> = unos cuantos (bien) → [[Few people came.|Vino poquísima gente.]] (mal)<br/>· <i>a little time</i> = un ratito (bien) → <i>I have little time.</i> (casi nada, mal)<br/><br/>Una letra, y la frase cambia de signo. En el habla normal, para lo negativo se prefiere <b>not many / not much</b>: [[There aren't many tables free.|No hay muchas mesas libres.]] Suena mejor que <i>few tables are free</i>, que es de periódico.<br/><br/>Y para la mesa, la fórmula que más vas a usar: [[Just a little, thanks.|Un poquito nada más, gracias.]] mientras alguien te sirve. Con algo que se cuenta sería <i>Just a few, thanks.</i>",
            table: [
              ["", "se cuenta", "no se cuenta"],
              ["hay algo (positivo)", "a few eggs", "a little milk"],
              ["casi nada (negativo)", "few eggs", "little milk"],
              ["lo que se dice de verdad", "not many eggs", "not much milk"],
              ["en la mesa", "Just a few, thanks.", "Just a little, thanks."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l6e1", type: "bucket", prompt: "¿a few o a little?",
              categories: ["a few…", "a little…"],
              items: [
                { text: "friends", bucket: 0 },
                { text: "milk", bucket: 1 },
                { text: "eggs", bucket: 0 },
                { text: "sugar", bucket: 1 },
                { text: "minutes", bucket: 0 },
                { text: "money", bucket: 1 },
                { text: "tables", bucket: 0 },
                { text: "bread", bucket: 1 },
              ],
              itemIds: ["ena2m5afewfriends", "ena2m5alittlemilk", "ena2m5money", "enbread"],
              tip: "Es el mismo montón de la lección 1 con otro nombre: si va con many, va con a few; si va con much, va con a little.",
            },
            {
              id: "ena2m5l6e2", type: "mc", prompt: "La letra que cambia el signo",
              question: "«Few people came to the party» significa…",
              options: ["Vino poquísima gente", "Vinieron unos cuantos", "Vino mucha gente"],
              answer: 0,
              whyWrong: [null, "Eso sería «a few people came», con el a delante", "Eso sería «a lot of people came»"],
              itemIds: ["ena2m5fewpeoplecame", "ena2m5afewfriends"],
              tip: "Sin «a» es queja; con «a» es tranquilidad. En el examen escrito, esa letra decide si has dicho lo contrario de lo que querías.",
            },
            {
              id: "ena2m5l6e3", type: "cloze", prompt: "Completa",
              text: "I take my tea with ___ little milk.",
              answers: ["a"],
              translation: "Tomo el té con un poco de leche.",
              hints: ["Quieres decir que sí quieres leche, poca pero la quieres", "Falta una sola letra"],
              itemIds: ["ena2m5alittlemilk", "entea", "enmilk"],
              tip: "Sin el a, «with little milk» diría «apenas leche», que en una taza suena a reproche.",
            },
            {
              id: "ena2m5l6e4", type: "cloze", prompt: "Completa",
              text: "We're meeting ___ few friends at the café.",
              answers: ["a"],
              translation: "Hemos quedado con unos cuantos amigos en el café.",
              hints: ["Unos cuantos, en positivo", "Falta una sola letra"],
              itemIds: ["ena2m5afewfriends"],
            },
            {
              id: "ena2m5l6e5", type: "errorfix", prompt: "Corrige el reparto",
              wrong: "Can I have a few milk in my coffee, please?",
              answers: ["Can I have a little milk in my coffee, please?"],
              why: "milk no se cuenta, así que va con a little. a few solo se pone delante de plurales que puedas contar: a few eggs, a few friends, a few minutes.",
              translation: "¿Me pone un poco de leche en el café, por favor?",
              itemIds: ["ena2m5alittlemilk", "enmilk", "encoffee"],
            },
            {
              id: "ena2m5l6e6", type: "transform", prompt: "Del inglés de libro al inglés de la calle",
              source: "Few tables are free tonight.",
              instruction: "Dilo como se dice de verdad, con «There aren't…»",
              answers: ["There aren't many tables free tonight."],
              translation: "Esta noche no hay muchas mesas libres.",
              hints: ["Lo negativo se dice con not many", "There aren't m… tables free tonight."],
              itemIds: ["ena2m5therearentmanytables", "ena2m5fewpeoplecame"],
              tip: "Las dos son correctas, pero «few + sustantivo» al principio de frase suena a prensa escrita. Al hablar, siempre not many.",
            },
            {
              id: "ena2m5l6e7", type: "match", prompt: "Empareja cada cantidad con lo que significa de verdad",
              pairs: [
                { target: "a few friends", source: "unos cuantos amigos — bien" },
                { target: "few friends", source: "casi ningún amigo — mal" },
                { target: "a little time", source: "un ratito — bien" },
                { target: "little time", source: "casi nada de tiempo — mal" },
              ],
              itemIds: ["ena2m5afewfriends", "ena2m5fewpeoplecame", "ena2m5alittlemilk"],
            },
            {
              id: "ena2m5l6e8", type: "listen", prompt: "Dictado — la fórmula de la mesa",
              text: "Just a little, thanks.",
              translation: "Un poquito nada más, gracias.",
              hints: ["Empieza por Just a…", "…thanks."],
              itemIds: ["ena2m5justalittlethanks"],
              tip: "Se dice mientras te están sirviendo, no después. Si esperas a que llenen la taza, ya no sirve de nada.",
            },
            {
              id: "ena2m5l6e9", type: "build", prompt: "Construye la respuesta de Sam",
              target: "There aren't many tables free tonight",
              translation: "Esta noche no hay muchas mesas libres",
              distractors: ["much", "isn't"],
              itemIds: ["ena2m5therearentmanytables", "entable"],
            },
            {
              id: "ena2m5l6e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Con un poco de azúcar y unos cuantos huevos, ya está.",
              answers: [
                "With a little sugar and a few eggs, that's it.",
                "With a little sugar and a few eggs, it's done.",
                "A little sugar and a few eggs, and that's it.",
              ],
              hint: "el azúcar no se cuenta, los huevos sí",
              itemIds: ["ena2m5alittlemilk", "ena2m5afewfriends", "ensugar", "eneggs"],
            },
            {
              id: "ena2m5l6e11", type: "type", prompt: "Cierre de producción",
              question: "Un poquito de leche, gracias. No tengo mucho tiempo.",
              answers: [
                "Just a little milk, thanks. I don't have much time.",
                "Just a little milk, thanks. I haven't got much time.",
                "A little milk, thanks. I don't have much time.",
              ],
              hints: ["milk → a little · time → much", "Just a l… milk, thanks. I don't have m… time."],
              itemIds: ["ena2m5justalittlethanks", "ena2m5alittlemilk", "ena2m5thereisntmuchmilk"],
              tip: "Fíjate en que time va con much: el tiempo, en inglés, tampoco se cuenta. Es una de las que más se falla fuera de la comida.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Some and any", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/some-any", note: "Al final de la ficha hay ejercicios mezclados con otros cuantificadores. Haz solo esos: son los que mezclan a few y a little, que es donde se cae." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — el artículo cero de los genéricos
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l7",
      phaseId: "ena2m5",
      title: "I like music",
      subtitle: "Hablando en general, el inglés quita el artículo — y el español lo pone",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "En general, y en concreto",
          itemIds: ["ena2m5ilikemusic", "ena2m5lifeishard", "ena2m5moneyisnteverything", "ena2m5thecoffeehereisgood", "ena2m5ilovecooking", "enilike"],
        },
        {
          kind: "note",
          note: {
            title: "Sin the cuando hablas del mundo; con the cuando señalas",
            body: "Esta es corta de explicar y cara de olvidar. En español, para hablar de algo <b>en general</b>, pones artículo: «me gusta <b>la</b> música», «<b>la</b> vida es dura», «<b>el</b> dinero no lo es todo». <b>El inglés, en ese mismo caso, no pone nada:</b><br/><br/>[[I like music.|Me gusta la música.]] · [[Life is hard.|La vida es dura.]] · [[Money isn't everything.|El dinero no lo es todo.]] · [[I love cooking.|Me encanta cocinar.]]<br/><br/>Vale para lo que no se cuenta (<i>music, life, money, coffee, bread</i>) y para los <b>plurales</b> (<i>I like dogs</i>, <i>Books are expensive</i>).<br/><br/><b>Y su pareja</b>, que es la mitad que nadie enseña: cuando <b>señalas algo concreto</b>, el the vuelve. [[The coffee here is very good.|El café de aquí está muy bueno.]] No hablas del café del mundo: hablas de ESTE. Lo mismo con <i>The food was very good</i> — la de anoche, no la comida en general.<br/><br/>Truco para decidir en un segundo: <b>¿podrías añadir «en general» detrás?</b> Si sí, fuera el the. Si lo que quieres es «este, el de aquí, el de ayer», el the se queda.<br/><br/>Y un recordatorio del módulo 3, que aquí recae: entre el verbo y su objeto <b>no se mete nada</b>. Es <i>I like coffee very much</i>, nunca <i>*I like very much coffee</i>. La regla está explicada en <b>ena2m3</b>, lección 6; aquí solo se cobra.",
            table: [
              ["en general → sin the", "en concreto → con the"],
              ["I like music.", "I like the music in this café."],
              ["Life is hard.", "The life of a nurse is hard."],
              ["Money isn't everything.", "The money is on the table."],
              ["Coffee is expensive.", "The coffee here is very good."],
              ["I love cooking.", "The cooking was Amy's job."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l7e1", type: "bucket", prompt: "¿Lleva the o no lleva nada?",
              categories: ["sin the (en general)", "con the (este de aquí)"],
              items: [
                { text: "I like ___ music.", bucket: 0 },
                { text: "___ coffee here is very good.", bucket: 1 },
                { text: "___ life is hard.", bucket: 0 },
                { text: "___ food was delicious last night.", bucket: 1 },
                { text: "I don't drink ___ wine.", bucket: 0 },
                { text: "Can you pass me ___ salt?", bucket: 1 },
              ],
              itemIds: ["ena2m5ilikemusic", "ena2m5thecoffeehereisgood", "ena2m5lifeishard", "ena2m5thefoodwasgood", "ena2m5salt"],
              tip: "«Pass me the salt» lleva the porque es la sal de esta mesa, la que está a tu lado. No estás hablando de la sal del mundo.",
            },
            {
              id: "ena2m5l7e2", type: "errorfix", prompt: "El calco más caro de la lección",
              wrong: "I like the music and the coffee.",
              answers: ["I like music and coffee."],
              why: "Hablando en general, el inglés no pone artículo: I like music, I like coffee. Con the estarías señalando una música y un café concretos, los de este sitio. El español obliga al artículo y por eso la mano lo escribe sola.",
              translation: "Me gusta la música y me gusta el café.",
              itemIds: ["ena2m5ilikemusic", "enilike", "encoffee"],
            },
            {
              id: "ena2m5l7e3", type: "errorfix", prompt: "Y el clásico de las frases de la abuela",
              wrong: "The life is hard, but the people are friendly.",
              answers: ["Life is hard, but people are friendly."],
              why: "life y people, en general, van sin the. Con the estarías hablando de la vida de alguien concreto y de un grupo concreto de personas. Es la misma regla dos veces en una frase.",
              translation: "La vida es dura, pero la gente es maja.",
              itemIds: ["ena2m5lifeishard", "ena2m5peoplearefriendly"],
            },
            {
              id: "ena2m5l7e4", type: "cloze", prompt: "Completa con the o déjalo vacío escribiendo «—»",
              text: "___ coffee here is very good, so I come every morning.",
              answers: ["The"],
              translation: "El café de aquí está muy bueno, así que vengo todas las mañanas.",
              hints: ["¿El café del mundo, o el de este sitio?", "T…"],
              itemIds: ["ena2m5thecoffeehereisgood", "encoffee"],
            },
            {
              id: "ena2m5l7e5", type: "mc", prompt: "«Me encanta cocinar»",
              question: "¿Cuál es la buena?",
              options: ["I love cooking.", "I love the cooking.", "I love to the cook."],
              answer: 0,
              whyWrong: [null, "En general no lleva the: eso sería «el cocinado» de un día concreto", "«to the cook» sería «al cocinero»"],
              itemIds: ["ena2m5ilovecooking", "encook"],
              tip: "Las actividades en -ing funcionan igual que los incontables: I love cooking, I hate waiting, I like walking. Sin artículo, siempre.",
            },
            {
              id: "ena2m5l7e6", type: "transform", prompt: "De lo concreto a lo general",
              source: "The bread in this shop is very good.",
              instruction: "Dilo del pan en general",
              answers: ["Bread is very good.", "Bread is very good in this country."],
              translation: "El pan está muy bueno.",
              hints: ["Al quitar «in this shop» ya no señalas nada", "B… is very good."],
              itemIds: ["ena2m5thecoffeehereisgood", "enbread", "enshop"],
              tip: "Fíjate en lo que arrastra el the: se cae en cuanto quitas el complemento que señalaba. En cuanto vuelves a señalar, vuelve.",
            },
            {
              id: "ena2m5l7e7", type: "gapbank", prompt: "El primer email de Valeria a Clara: rellena con la ficha que toca",
              text: "In London ___ is expensive, but I'm happy. ___ in my street is really nice and I go every morning. I don't like ___ , so I drink tea all day.",
              answers: ["life", "The café", "coffee"],
              bank: ["life", "The café", "coffee", "The life", "a café", "the coffee"],
              translation: "En Londres la vida es cara, pero estoy contenta. La cafetería de mi calle es muy maja y voy todas las mañanas. No me gusta el café, así que bebo té todo el día.",
              itemIds: ["ena2m5lifeishard", "ena2m5thecoffeehereisgood", "ena2m5ilikemusic", "enexpensive"],
              tip: "Las tres fichas que sobran son las tres versiones españolas de la frase: The life, a café, the coffee. Ninguna dice lo que Valeria quiere decir.",
            },
            {
              id: "ena2m5l7e8", type: "mc", prompt: "Espiral del módulo 3 — dónde va «very much»",
              question: "«Me gusta muchísimo el café»",
              options: ["I like coffee very much.", "I like very much coffee.", "I like very much the coffee."],
              answer: 0,
              whyWrong: [null, "Entre el verbo y su objeto no se mete nada: esa regla es de ena2m3, lección 6", "Dos errores en una: el orden y el the del genérico"],
              itemIds: ["ena2m3ilikeitverymuch", "ena2m5ilikemusic", "encoffee"],
              tip: "Las dos reglas del módulo se juntan aquí: coffee sin the porque es en general, y very much al final porque nada se cuela entre like y su objeto.",
            },
            {
              id: "ena2m5l7e9", type: "listen", prompt: "Dictado",
              text: "Money isn't everything.",
              translation: "El dinero no lo es todo.",
              hints: ["Empieza directamente por el sustantivo, sin artículo", "M… isn't everything."],
              itemIds: ["ena2m5moneyisnteverything", "ena2m5money"],
              tip: "Si has escrito «The money», te ha traicionado el español. Es exactamente el error que esta lección viene a matar.",
            },
            {
              id: "ena2m5l7e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Me encanta cocinar, pero la comida de este restaurante está buenísima.",
              answers: [
                "I love cooking, but the food in this restaurant is delicious.",
                "I love cooking, but the food in this restaurant is really good.",
                "I love cooking, but the food here is delicious.",
              ],
              hint: "una mitad va en general y la otra señala un sitio",
              itemIds: ["ena2m5ilovecooking", "ena2m5thefoodwasgood", "endelicious"],
            },
            {
              id: "ena2m5l7e11", type: "type", prompt: "Cierre de producción",
              question: "Me gusta la música, pero la música de este café es horrible.",
              answers: [
                "I like music, but the music in this café is terrible.",
                "I like music, but the music in this café is horrible.",
                "I like music, but the music here is terrible.",
              ],
              hints: ["La primera mitad, en general; la segunda señala este café", "I like m… , but t… music in this café is terrible."],
              itemIds: ["ena2m5ilikemusic", "ena2m5thecoffeehereisgood", "ena2m1terrible"],
              tip: "La misma palabra dos veces en la misma frase, una sin the y otra con the. Si te sale, la regla ya no es teoría.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Articles 2 (the, zero article)", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/articles-2", note: "Lee solo el apartado del artículo cero (unos 4 min) y luego escribe cinco cosas que te gusten en general. Si en alguna te sale un the, ahí está el hábito español." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — la escalera de la petición
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l8",
      phaseId: "ena2m5",
      title: "Could I have the menu, please?",
      subtitle: "Pedir en inglés: la escalera que decide si suenas educado o mandón",
      minutes: 12,
      sections: [
        {
          kind: "phrases",
          title: "Reservar, pedir y contestar",
          itemIds: ["ena2m5atablefortwoplease", "ena2m5areyoureadytoorder", "ena2m5idlikethechicken", "ena2m5couldihavethemenu", "ena2m5couldyoubringussomewater", "ena2m5ofcoursehereyouare", "ena2m5imafraidwedonthaveany", "enmenu"],
        },
        {
          kind: "note",
          note: {
            title: "«Dame un café» no es maleducado en español. En inglés, sí",
            body: "Esta es la lección de pragmática del módulo, y se pierden más puntos aquí que en la gramática. En español pides con el imperativo sin ofender a nadie: «ponme un café», «tráeme la carta», «dame la cuenta». El tono ya suaviza. <b>En inglés el tono no basta</b>: <i>Give me a coffee</i> se oye como una orden a un camarero, y quien lo dice queda de borde sin saberlo.<br/><br/>El inglés envuelve la petición en una <b>pregunta</b>. Y hay una escalera de tres peldaños:<br/><br/><b>1. Can I have…?</b> — normal, rápido, correcto. En una barra, en un pub, con Sam: [[Can I have some water?|¿Me pones agua?]]<br/><b>2. Could I have… please?</b> — el peldaño neutro, el que <b>puntúa en el examen</b>. Vale con cualquiera: [[Could I have the menu, please?|¿Me trae la carta, por favor?]]<br/><b>3. Could you…, please?</b> — cuando la otra persona tiene que hacer algo: [[Could you bring us some water, please?|¿Nos trae agua, por favor?]]<br/><br/>Para pedir un plato, la fórmula fija: <b>I'd like…</b> — [[I'd like the chicken, please.|Yo, el pollo, por favor.]] Y ojo: <i>I want the chicken</i> es correcto gramaticalmente y <b>maleducado</b> en una mesa. <i>Want</i> se usa entre amigos, no con quien te sirve.<br/><br/><b>Y responder a una petición</b> también tiene su fórmula:<br/>· sí → [[Of course. Here you are.|Claro. Aquí tiene.]]<br/>· no → [[I'm afraid we don't have any.|Me temo que no nos queda.]] El <i>I'm afraid</i> es lo que hace que un «no» no duela.<br/><br/>Y el <b>please</b>, al final. En inglés no es un adorno: es la señal de que aquello era una petición y no una orden.",
            table: [
              ["español", "inglés (lo que suena bien)", "lo que NO"],
              ["Ponme un café", "Can I have a coffee, please?", "Give me a coffee."],
              ["Tráeme la carta", "Could I have the menu, please?", "Bring me the menu."],
              ["Yo, el pollo", "I'd like the chicken, please.", "I want the chicken."],
              ["Tráenos agua", "Could you bring us some water, please?", "Bring us water."],
              ["Aquí tiene", "Of course. Here you are.", "—"],
              ["No queda", "I'm afraid we don't have any.", "No, we don't have."],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l8e1", type: "bucket", prompt: "¿Suena educado o suena a orden?",
              categories: ["educado", "orden pelada"],
              items: [
                { text: "Could I have the menu, please?", bucket: 0 },
                { text: "Give me the menu.", bucket: 1 },
                { text: "Can I have a coffee, please?", bucket: 0 },
                { text: "I want a coffee.", bucket: 1 },
                { text: "Could you bring us some water?", bucket: 0 },
                { text: "Bring us water.", bucket: 1 },
              ],
              itemIds: ["ena2m5couldihavethemenu", "ena2m5couldyoubringussomewater", "ena2m5idlikethechicken", "encanihaveacoffee"],
              tip: "Todas las de la derecha son traducciones literales del español y todas suenan mal. No es cuestión de tono: es que en inglés la petición va en forma de pregunta.",
            },
            {
              id: "ena2m5l8e2", type: "mc", prompt: "En un restaurante con gente que no conoces",
              question: "¿Cuál es la versión que puntúa en el examen?",
              options: ["Could I have the menu, please?", "Give me the menu, please.", "I want the menu."],
              answer: 0,
              whyWrong: [null, "El please no salva un imperativo: sigue siendo una orden", "want con quien te sirve suena a exigencia"],
              itemIds: ["ena2m5couldihavethemenu", "enmenu"],
              tip: "Could I have… es el peldaño neutro: no se queda corto con desconocidos ni suena raro con amigos. Si tuvieras que memorizar una sola fórmula de todo el módulo, esa.",
            },
            {
              id: "ena2m5l8e3", type: "mc", prompt: "Pedir el plato",
              question: "El camarero pregunta «Are you ready to order?». ¿Qué contestas?",
              options: ["I'd like the chicken, please.", "I want the chicken.", "Give me chicken."],
              answer: 0,
              whyWrong: [null, "Gramaticalmente correcto, socialmente borde: want no se usa con quien te sirve", "Imperativo pelado, lo peor de las tres"],
              itemIds: ["ena2m5idlikethechicken", "ena2m5areyoureadytoorder", "enchicken"],
              tip: "I'd like es «I would like» contraído, y no se dice entero al hablar: «áid láik». Es LA fórmula del pedido en todo el mundo anglosajón.",
            },
            {
              id: "ena2m5l8e4", type: "errorfix", prompt: "Sube un peldaño la escalera",
              wrong: "Bring me the bill, please.",
              answers: ["Could you bring me the bill, please?"],
              why: "El imperativo con please sigue siendo una orden: el please no cambia la forma de la frase. Lo que la convierte en petición es envolverla en una pregunta: Could you + verbo. Es la diferencia entre pedir y mandar.",
              translation: "¿Me trae la cuenta, por favor?",
              itemIds: ["ena2m5couldyoubringussomewater", "ena2m5couldwehavethebill"],
            },
            {
              id: "ena2m5l8e5", type: "errorfix", prompt: "Y el «quiero» que en inglés no se dice",
              wrong: "I want the chicken, please.",
              answers: ["I'd like the chicken, please."],
              why: "want dice lo que te apetece a ti y no deja hueco a la otra persona; en una mesa suena a exigencia. La fórmula del pedido es I'd like, que es literalmente «me gustaría»: la misma distancia que pone el condicional en español.",
              translation: "Yo, el pollo, por favor.",
              itemIds: ["ena2m5idlikethechicken", "enchicken"],
            },
            {
              id: "ena2m5l8e6", type: "order", prompt: "Ordena la escena, de la puerta a la mesa",
              sentences: [
                "A table for two, please.",
                "Of course. Here you are.",
                "Are you ready to order?",
                "I'd like the chicken, please.",
                "And could you bring us some water?",
              ],
              translation: "Una mesa para dos, por favor. — Claro. Aquí tiene (la carta). — ¿Ya saben lo que van a tomar? — Yo, el pollo, por favor. — ¿Y nos trae agua?",
              itemIds: ["ena2m5atablefortwoplease", "ena2m5ofcoursehereyouare", "ena2m5areyoureadytoorder", "ena2m5idlikethechicken", "ena2m5couldyoubringussomewater"],
              tip: "Ese es el guion entero de una mesa en inglés: mesa, carta, pedido, bebida. Si te lo sabes de memoria, la Parte 2 del oral se resuelve sola.",
            },
            {
              id: "ena2m5l8e7", type: "cloze", prompt: "Completa la negativa educada",
              text: "I'm ___ we don't have any soup today.",
              answers: ["afraid"],
              translation: "Me temo que hoy no tenemos sopa.",
              hints: ["Es lo que amortigua el «no»", "a…"],
              itemIds: ["ena2m5imafraidwedonthaveany", "ena2m5theydonthaveanysoup"],
              tip: "I'm afraid no tiene nada que ver con el miedo: es «me temo». Ábrelo cada vez que tengas que dar una mala noticia, aunque sea mínima.",
            },
            {
              id: "ena2m5l8e8", type: "build", prompt: "Construye la reserva",
              target: "Could I have a table for two please",
              translation: "¿Me da una mesa para dos, por favor?",
              distractors: ["persons", "give"],
              itemIds: ["ena2m5atablefortwoplease", "ena2m5couldihavethemenu", "entable"],
              tip: "Las dos fichas que sobran son los dos calcos: «two persons» (en inglés, two people) y el «give» del imperativo español.",
            },
            {
              id: "ena2m5l8e9", type: "audiomc", prompt: "Escucha al camarero — 2 escuchas",
              audio: "Good evening. Have you got a booking? I'm afraid we don't have any tables free, but there's a table at the bar.",
              question: "¿Qué le pasa al restaurante?",
              options: ["No hay mesas libres", "Está cerrado", "No sirven cenas"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Si estuviera cerrado no te ofrecería la barra", "No dice nada de la comida: habla de mesas"],
              notepad: true,
              itemIds: ["ena2m5imafraidwedonthaveany", "ena2m5therearentmanytables"],
              tip: "El «I'm afraid» es la señal: en cuanto lo oigas, lo que viene detrás es un no. Apúntalo en el cuaderno y no hará falta que entiendas el resto.",
            },
            {
              id: "ena2m5l8e10", type: "speak", prompt: "Dilo en voz alta — los tres peldaños seguidos",
              text: "Can I have a coffee? Could I have the menu, please? Could you bring us some water?",
              phonetic: "kan ái jav a KO-fi? kud ái jav de ME-niu, plíis̬? kud yu bring as sam UÓ-ta?",
              translation: "¿Me pones un café? ¿Me trae la carta, por favor? ¿Nos trae agua?",
              itemIds: ["encanihaveacoffee", "ena2m5couldihavethemenu", "ena2m5couldyoubringussomewater"],
              tip: "Fíjate en que las tres suben al final, como las preguntas. Si las dices con entonación de afirmación, vuelves a sonar a orden.",
            },
            {
              id: "ena2m5l8e11", type: "write", prompt: "Escribe al restaurante para reservar — 30-50 palabras",
              scenario: "Quieres reservar mesa en The Green Table para el sábado a las ocho. Sois cuatro y uno de tus amigos no come carne. Escribe el email.",
              bullets: [
                "Pide la mesa con «Could we…?»: día, hora y cuántos sois",
                "Pregunta si tienen algo sin carne",
                "Pide que te confirmen",
              ],
              checks: [
                { re: "(could|can) (i|we|you)", label: "una petición con could/can" },
                { re: "(without meat|vegetarian|no meat)", label: "algo sin carne" },
                { re: "(confirm|let me know|write back)", label: "pedir confirmación" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "polite",
              requireConnectors: { min: 2, bank: ["and", "but", "because", "so"] },
              model: "Hello, Could we have a table for four on Saturday at eight, please? One of my friends doesn't eat meat, so could you tell me if you have anything without meat? And could you confirm by email, please? Thank you, Valeria",
              itemIds: ["ena2m5atablefortwoplease", "ena2m5couldyoubringussomewater", "ena2m5meat"],
              tip: "Antes de corregir, cuenta cuántas veces has escrito «I want» o un verbo pelado al principio de una frase. Si hay alguno, ahí se te ha caído el registro — y eso, en el examen, es la mitad de la nota de la tarea.",
            },
            {
              id: "ena2m5l8e12", type: "type", prompt: "Cierre de producción",
              question: "¿Me trae la carta, por favor? Yo, el pollo.",
              answers: [
                "Could I have the menu, please? I'd like the chicken.",
                "Could I have the menu, please? I'd like the chicken, please.",
                "Can I have the menu, please? I'd like the chicken.",
              ],
              hints: ["Petición envuelta en pregunta + I'd like para el plato", "C… I have the menu, please? I'd l… the chicken."],
              itemIds: ["ena2m5couldihavethemenu", "ena2m5idlikethechicken"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m5-3",
            book: "Could I have a coffee, please?",
            real: "Can I get a coffee, please?",
            meaning: "¿Me pones un café?",
            when: "En cafeterías y sitios de comida rápida, sobre todo con gente joven. Nació en Estados Unidos y hoy se oye por todo Reino Unido, aunque a los mayores les suena brusco. En el examen —oral y escrito— usa Could I have: es la que puntúa como registro neutro.",
            register: "amigos",
            note: "El get sustituye al have y baja medio peldaño la escalera: más rápido, menos formal. Sigue llevando please, que es lo que evita que sea una orden.",
            sound: "kan ái GUET a KO-fi, plíis̬",
            level: "a2",
            itemId: "ena2m5couldihavethemenu",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca el vídeo de pedir en un restaurante y apunta cada petición que oigas. Verás que ninguna empieza por un verbo pelado: todas van envueltas en pregunta." },
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Mira solo la Parte 2 del Spoken: te toca INICIAR la situación (pedir, reservar, quejarte). Esta lección es exactamente el guion de esa parte." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — quejarse, disculparse y pagar (cierre + misión)
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m5l9",
      phaseId: "ena2m5",
      title: "Sorry, this is cold",
      subtitle: "Quejarse sin sonar borde, disculparse y pagar — la comida entera, de la puerta a la cuenta",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "La queja, la disculpa y la cuenta",
          itemIds: ["ena2m5excusemethisiscold", "ena2m5wedidntorderthis", "ena2m5ithinktheresamistake", "ena2m5imsosorryaboutthat", "ena2m5couldwehavethebill", "enexcuseme", "encanipaybycard"],
        },
        {
          kind: "note",
          note: {
            title: "La queja inglesa va envuelta, y por eso funciona",
            body: "En español una queja se dice de frente: «esto está frío», «esto no lo hemos pedido». Traducido tal cual al inglés suena a bronca. <b>El inglés envuelve la queja en tres capas</b>, y las tres son cortas:<br/><br/><b>1. Abre con Excuse me.</b> No es «perdón» de disculpa: es «disculpe» para llamar la atención. Sin él, la queja empieza a medio grito. [[Excuse me, this is cold.|Perdone, esto está frío.]]<br/><b>2. Suaviza con «I think» o con «a bit».</b> Sabes perfectamente que hay un error, pero se dice como si dudaras: [[I think there's a mistake in the bill.|Creo que hay un error en la cuenta.]] · <i>This is a bit cold.</i> El <i>a bit</i> del módulo 3 vuelve aquí, y no por casualidad: solo se usa con lo malo.<br/><b>2 bis. Y cuando la queja va en negativo, el «no» sube al «I think».</b> El español dice «<i>creo que esto <u>no</u> es lo que he pedido</i>»; el inglés dice <b>I <u>don't</u> think this is what I ordered</b>, con la negación en el primer verbo y el segundo en afirmativa. Suena raro escrito así y es lo normal dicho: <i>I don't think we ordered this</i> · <i>I don't think this is ours</i>. La traducción literal —<i>I think this isn't…</i>— se entiende, pero es la frase por la que te colocan de extranjero, y además suena más dura, que es justo lo contrario de lo que buscas.<br/><b>3. No acuses a nadie.</b> Se dice qué pasa, no quién lo hizo: [[We didn't order this.|Esto no lo hemos pedido.]] mejor que «usted se ha equivocado».<br/><br/>Y ojo al calco del módulo 1, que aquí recae: «hay un error» es <b>there IS a mistake</b>, nunca <i>*there has</i>. El «hay» del español viene de haber y arrastra la mano hacia have.<br/><br/><b>La disculpa</b>, del otro lado del mostrador, también es fórmula: [[I'm so sorry about that.|Cuánto lo siento.]] y detrás, la solución: <i>I'll bring you another one</i>.<br/><br/>Y para acabar: en Reino Unido la cuenta es <b>the bill</b> (en Estados Unidos, the check), y se pide como todo lo demás: [[Could we have the bill, please?|¿Nos trae la cuenta, por favor?]]",
            table: [
              ["lo que dirías en español", "lo que se dice en inglés"],
              ["Esto está frío.", "Excuse me, this is a bit cold."],
              ["Esto no es lo que he pedido.", "Sorry, I don't think this is what I ordered."],
              ["Hay un error en la cuenta.", "I think there's a mistake in the bill."],
              ["Lo siento muchísimo.", "I'm so sorry about that."],
              ["La cuenta, por favor.", "Could we have the bill, please?"],
              ["¿Se puede pagar con tarjeta?", "Can I pay by card?"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m5l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — todo esto ya es tuyo",
              pairs: [
                { target: "How much…?", source: "¿cuánto…? (lo que no se cuenta)" },
                { target: "How many…?", source: "¿cuántos…? (lo que se cuenta)" },
                { target: "a little", source: "un poco (lo que no se cuenta)" },
                { target: "a few", source: "unos cuantos (lo que se cuenta)" },
                { target: "a lot of", source: "mucho / muchos (los dos)" },
              ],
              targetSeconds: 28,
              itemIds: ["ena2m5howmuchsugar", "ena2m5howmanypeoplearethere", "ena2m5alittlemilk", "ena2m5afewfriends", "ena2m5alotof"],
              tip: "El cronómetro solo premia. Si las cinco salen sin pensar, el sistema de cuantificación del módulo está instalado.",
            },
            {
              id: "ena2m5l9e2", type: "bucket", prompt: "¿Queja envuelta o bronca?",
              categories: ["queja que funciona", "suena a bronca"],
              items: [
                { text: "Excuse me, this is a bit cold.", bucket: 0 },
                { text: "This soup is cold!", bucket: 1 },
                { text: "I think there's a mistake in the bill.", bucket: 0 },
                { text: "You made a mistake in the bill.", bucket: 1 },
                { text: "Sorry, we didn't order this.", bucket: 0 },
                { text: "This is not our food.", bucket: 1 },
              ],
              itemIds: ["ena2m5excusemethisiscold", "ena2m5ithinktheresamistake", "ena2m5wedidntorderthis", "ena2m3abitshy"],
              tip: "Mira qué tienen en común las tres de la izquierda: abren con una fórmula (Excuse me, I think, Sorry) y ninguna señala a nadie. Eso es toda la técnica.",
            },
            {
              id: "ena2m5l9e3", type: "mc", prompt: "Te traen la sopa fría",
              question: "¿Qué dices?",
              options: ["Excuse me, this is a bit cold.", "This is cold!", "You brought me a cold soup."],
              answer: 0,
              whyWrong: [null, "Sin fórmula de apertura y con exclamación: en inglés eso es levantar la voz", "Acusa directamente a la persona, que es lo que el inglés evita"],
              itemIds: ["ena2m5excusemethisiscold", "ena2m5soup", "encold"],
              tip: "El «a bit» no es que la sopa esté un poco fría: es la manera de decirlo. Puede estar helada y aun así se dice a bit.",
            },
            {
              id: "ena2m5l9e4", type: "errorfix", prompt: "El «hay» que vuelve del módulo 1",
              wrong: "I think there has a mistake in the bill.",
              answers: ["I think there's a mistake in the bill."],
              why: "«Hay» viene de haber y la mano se va sola a have, pero la estructura inglesa es there + BE en todos los tiempos: there is, there are, there was, there were. Ya lo viste con «there was a party»; aquí recae porque la frase es larga.",
              translation: "Creo que hay un error en la cuenta.",
              itemIds: ["ena2m5ithinktheresamistake", "enthereis"],
            },
            {
              // Va aquí, pegado al otro calco de la queja, aunque el número
              // sea el más alto: los ids de ejercicio son claves de progreso y
              // no se renumeran para que queden bonitos.
              id: "ena2m5l9e13", type: "transform", prompt: "El «no» está en el sitio del español — súbelo",
              source: "I think this isn't what I ordered.",
              instruction: "Pon la negación en el primer verbo (I think → I don't think) y deja el segundo en afirmativa",
              answers: ["I don't think this is what I ordered."],
              translation: "Creo que esto no es lo que he pedido.",
              itemIds: ["ena2m5ithinktheresamistake"],
              tip: "Mueve dos piezas a la vez, y por eso no es un «corrige la palabra»: el inglés niega arriba —I don't think, I don't suppose, I don't believe— y el español niega abajo. Con quejas, además, la versión inglesa suena bastante menos dura.",
            },
            {
              id: "ena2m5l9e5", type: "gapbank", prompt: "La escena de la cuenta: rellena con la ficha que toca",
              text: "Excuse me, I ___ there's a mistake in the bill. We didn't ___ the wine. — Oh, I'm so ___ about that. I'll bring you a new bill.",
              answers: ["think", "order", "sorry"],
              bank: ["think", "order", "sorry", "say", "pay", "afraid"],
              translation: "Perdone, creo que hay un error en la cuenta. No hemos pedido el vino. — Ay, cuánto lo siento. Le traigo una cuenta nueva.",
              itemIds: ["ena2m5ithinktheresamistake", "ena2m5wedidntorderthis", "ena2m5imsosorryaboutthat", "ena2m5aglassofwine"],
              tip: "El primer hueco es la clave de la lección: «I think» no dice que dudes, dice que no estás buscando pelea.",
            },
            {
              id: "ena2m5l9e6", type: "paraphrase", prompt: "Dilo de otra manera — sin sonar borde",
              source: "Give me the bill.",
              forbid: ["give"],
              answers: ["Could we have the bill, please?", "Can we pay, please?"],
              translation: "La cuenta, por favor.",
              itemIds: ["ena2m5couldwehavethebill", "encanipaybycard"],
              tip: "Las dos salidas son las de la lección 8: envolver en pregunta, o cambiar de verbo. En el oral del examen, cualquiera de las dos te salva la marca de registro.",
            },
            {
              id: "ena2m5l9e7", type: "audiomc", prompt: "La queja de la mesa de al lado — 2 escuchas",
              audio: "Excuse me, I think there's a mistake here. We didn't order the wine, and there's too much salt in the soup. — I'm so sorry about that. I'll bring you another one.",
              question: "¿De qué se quejan?",
              options: ["Del vino de la cuenta y de la sopa", "Solo de la cuenta", "De que la comida tarda"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Hay dos quejas: el vino y la sal de la sopa", "Nadie habla de esperar"],
              notepad: true,
              itemIds: ["ena2m5ithinktheresamistake", "ena2m5wedidntorderthis", "ena2m5toomuchsalt", "ena2m5imsosorryaboutthat"],
              tip: "Dos quejas en una intervención: en el Listening del examen, la pregunta casi siempre pide las dos. Apunta las dos y luego elige.",
            },
            {
              id: "ena2m5l9e8", type: "build", prompt: "Construye la queja completa",
              target: "Excuse me I think there is a mistake in the bill",
              translation: "Perdone, creo que hay un error en la cuenta",
              distractors: ["has", "sorry"],
              itemIds: ["ena2m5ithinktheresamistake", "enexcuseme"],
            },
            {
              id: "ena2m5l9e9", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              mode: "produce",
              source: "Perdone, esto no lo hemos pedido y la sopa tiene demasiada sal.",
              answers: [
                "Excuse me, we didn't order this and there's too much salt in the soup.",
                "Excuse me, we didn't order this and the soup has too much salt.",
                "Sorry, we didn't order this and there's too much salt in the soup.",
              ],
              hint: "abre con la fórmula y no acuses a nadie",
              itemIds: ["ena2m5wedidntorderthis", "ena2m5toomuchsalt", "enexcuseme"],
            },
            {
              id: "ena2m5l9e10", type: "listen", prompt: "Dictado — la petición del final",
              text: "Could we have the bill, please?",
              translation: "¿Nos trae la cuenta, por favor?",
              hints: ["Empieza por Could w…", "…the bill, please?"],
              itemIds: ["ena2m5couldwehavethebill"],
              tip: "En Reino Unido, bill. Si dices «the check» te van a entender igual, pero suena a película americana.",
            },
            {
              id: "ena2m5l9e11", type: "monologue", prompt: "La misión del módulo: pide una comida entera en inglés, de la puerta a la cuenta",
              topic: "Una comida completa en un restaurante, en voz alta y de principio a fin",
              slides: [
                { title: "1. Llegar y sentarse", hint: "Good evening. A table for two, please. — Could I have the menu, please?" },
                { title: "2. Pedir la comida y la bebida", hint: "I'd like the chicken, please. And could you bring us a bottle of water and two glasses of wine?" },
                { title: "3. Algo va mal, y te quejas", hint: "Excuse me, this is a bit cold. And I don't think we ordered this." },
                { title: "4. Pagar y salir", hint: "Could we have the bill, please? Can I pay by card? Thank you very much." },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He pedido con Could I have… o Can I have…, y ni una vez con un verbo pelado (Give me, Bring me)",
                "He dicho please al menos dos veces",
                "He usado un envase o una porción: a bottle of, a glass of, a slice of",
                "He puesto una queja envuelta: Excuse me / I think / a bit",
                "He pedido la cuenta con Could we have the bill, please?",
              ],
              model: "Good evening. A table for two, please. Thank you. Could I have the menu, please? … I'd like the chicken with vegetables, please. And could you bring us a bottle of water and two glasses of wine? … Excuse me, sorry, I think there's a mistake: we didn't order this, and the soup is a bit cold. … Thank you very much. Could we have the bill, please? Can I pay by card?",
              itemIds: ["ena2m5atablefortwoplease", "ena2m5couldihavethemenu", "ena2m5idlikethechicken", "ena2m5abottleofwater", "ena2m5aglassofwine", "ena2m5excusemethisiscold", "ena2m5couldwehavethebill", "ena2m5vegetables"],
              tip: "La misión de verdad es fuera de la app: cocina algo siguiendo una receta en inglés, o pide en inglés en un sitio real (o por escrito, en una app de comida). Lo que te llevas no es una nota: es el plato o el pedido. Grábate las dos pasadas y quédate con la segunda.",
            },
            {
              id: "ena2m5l9e12", type: "type", prompt: "Cierre del módulo — todo en dos frases",
              question: "¿Nos trae un poco de agua, por favor? Y creo que hay un error en la cuenta.",
              answers: [
                "Could you bring us some water, please? And I think there's a mistake in the bill.",
                "Could you bring us a little water, please? And I think there's a mistake in the bill.",
                "Could you bring us some water, please? I think there's a mistake in the bill.",
              ],
              hints: ["Petición envuelta + some al pedir + there IS", "C… you bring us s… water, please? And I think there's a m… in the bill."],
              itemIds: ["ena2m5couldyoubringussomewater", "ena2m5ithinktheresamistake", "ena2m5canihavesomewater"],
              tip: "Ahí está el módulo entero: el some de la petición, la escalera de cortesía y el there is del «hay». Con esto comes fuera en inglés sin que se te note que traduces.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m5-4",
            book: "Excuse me, there's a problem with my soup.",
            real: "Sorry to be a pain, but my soup's a bit cold.",
            meaning: "Perdona que dé la lata, pero la sopa está fría",
            when: "En Reino Unido, con quien te atiende, cuando quieres quejarte y que no se te note. «Sorry to be a pain» es la fórmula nacional: pide perdón por quejarse antes de quejarse. En el examen escribe la del libro, que es la que enseña la estructura que puntúan.",
            register: "amigos",
            note: "«A pain» es «un pesado». Es la capa cuarta de la queja: primero te disculpas por molestar y después dices lo que pasa, siempre con a bit.",
            sound: "SO-ri tu bi a PÉIN, bat mái suups a bit KÓULD",
            level: "a2",
            itemId: "ena2m5excusemethisiscold",
          },
        },
      ],
      resources: [
        { label: "British Council — A2 Listening", url: "https://learnenglish.britishcouncil.org/skills/listening/a2-listening", note: "Busca los audios de restaurante y de compras. Escúchalos una vez sin leer y apunta solo las peticiones: verás que todas empiezan por Can I, Could I o Could you." },
        { label: "British Council — A2 Writing", url: "https://learnenglish.britishcouncil.org/skills/writing/a2-writing", note: "Mira un email de reserva o de queja y compáralo con el tuyo de la lección 8. Fíjate solo en cómo abren y cierran: eso es el registro que puntúa." },
      ],
    },
  ],
};
