import type { Phase, VocabItem } from "@/lib/types";

// INGLÉS A2 · MÓDULO 4 — Bigger, cheaper, better: comparar de verdad. Es EL
// módulo que decide la Parte 3 del oral (comparar dos imágenes y hablar de
// semejanzas y diferencias), y por eso va pronto: todo lo que se instala aquí
// se recicla durante ocho módulos.
//
// Gramática ancla (PLAN-EN-A2 §4.1): comparativos y superlativos, regulares e
// irregulares · `than` · el `the` obligatorio del superlativo · los
// determinantes more / most / enough / no / none / all. FRONTERA (se presenta,
// se reconoce, NO se examina): `as…as` y `too / enough`, en la L8 y dicho con
// todas las letras al alumno.
//
// LO QUE NO SE RE-ENSEÑA (viene cerrado de `ena2m1` y `ena2m2`): el paradigma
// del pasado entero — forma rara solo en afirmativa, `did`/`didn't` + verbo
// desnudo — y las seis familias de irregulares por cambio vocálico. Aquí el
// pasado solo se USA (las escenas de compra están contadas en pasado) y los
// verbos irregulares que hagan falta se cuelgan de su familia de `ena2m2`, no
// se abre una lista nueva. Del m2 también se hereda el reparto
// `lose`/`miss`/`forget`/`leave`, que no se toca.
//
// FRONTERA CON `ena2m3`: él enseña a DESCRIBIR (aspecto, carácter, adverbios de
// modo, orden de adjetivos); este módulo enseña a COMPARAR. Por eso aquí casi
// no hay adjetivos sueltos nuevos: lo que se declara son FORMAS comparadas
// («cheaper than…», «the most expensive… in…») y el campo de medidas, que es
// exclusivamente de aquí. Los adjetivos base salen del A1.
//
// EL CONTRASTE CON EL ESPAÑOL, con su nombre (PLAN-EN-A2 §9):
//   (a) el DOBLE COMPARATIVO — «más grande» tiene dos palabras en español y el
//       alumno traslada las dos: *more big*, y peor aún *more cheaper*. Se mata
//       en L1 (nota + errorfix), en L2 (la regla de dónde se corta) y en L9.
//   (b) LA PREPOSICIÓN DEL SUPERLATIVO — «el más barato DE la tienda» sale
//       *the cheapest of the shop*. En inglés es IN con sitios y grupos, y OF
//       solo con periodos de tiempo (the worst day OF my life). L4 entera.
//   (c) `than` FRENTE A `that` — en español las dos son «que» y se cruzan al
//       escribir: *bigger that mine*. Es error de escritura, penaliza en el
//       examen y casi nadie lo nombra. Va con tarjeta propia (`ena2m4than`,
//       con su `trap`), errorfix en L1, errorfix en L3 y espiral en L9. Y en la
//       L9 se cierra el círculo con la frase donde «that» SÍ es la correcta:
//       «The difference is that this one is bigger».
//   (d) «más DE diez libras» → *more OF ten pounds*, en L7.
//   (e) «demasiado pequeño» → *too much small*, en la frontera de L8.
//
// LA CLÍNICA DE SONIDO (L5) es la que pide PLAN-EN-A2 §4.3: la schwa de `-er`
// y la de `than` —que es lo que convierte «cheaper than mine» en «CHÍI-pa dan
// máin»— y el par 13/30 aplicado a MEDIDAS y precios, que es donde de verdad
// cuesta dinero fallarlo. El par se apoya en las tarjetas de números del A1
// (`enthirteen30`, `enfifteen50`, `ensixteen60`), no se redeclara.
//
// LO QUE HEREDAN LOS MÓDULOS SIGUIENTES: `more`, `most`, `enough`, `no`,
// `none` y `all` quedan instalados como DETERMINANTES (L7), que es la percha de
// la que cuelga el contable/incontable de `ena2m5` (much/many, a few/a little);
// y las fórmulas de la Parte 3 (L9) están escritas para reciclarse tal cual en
// m5–m12.
//
// RECICLADO sin redefinir ids (una palabra, una tarjeta): del A1 — enbed,
// enbedroom, enbig, enblue, enbusy, enchair, encheap, encold, enexpensive,
// enfifteen50, enflat, enfourteen40, enfridge, engarden, enhowmuchisit,
// enhowold, enitscold, enjacket, enkitchen, enlondon, enmilk, ennew, ennice,
// enopen, enpound, enred, enroom, ensale, enshoes, enshop, ensister,
// ensixteen60, ensizesmall, ensofa, enstation, ensupermarket, entable, entall,
// enthirteen30, entooexpensive, entube, entwenty, enwindow, enyesterday; de
// `ena2m1` — ena2m1howaboutyou, ena2m1lastyear, ena2m1streetmarket,
// ena2m1therewere; y de `ena2m2` — ena2m2boughtgroup, ena2m2hetookthetrain,
// ena2m2intheend, ena2m2isawamyyesterday.
//
// Los adjetivos base son TODOS del A1 a propósito: este módulo no enseña
// adjetivos, enseña a compararlos. Lo único léxico propio es el campo de
// medidas de la L6, que no existía en ningún sitio.
//
// TODOS los ids nuevos llevan el prefijo "ena2m4": regla dura del validador
// para los módulos nuevos (ena2m*, enb1m*).

export const vocabEnA2m4: Record<string, VocabItem> = {
  // ── ena2m4l1 — el comparativo corto: -er + than ──
  ena2m4cheaperthan: {
    id: "ena2m4cheaperthan", target: "This one is cheaper than that one.",
    source: "Este es más barato que ese.",
    sound: "dis uan is̬ CHÍI-pa dan dat uan",
    gram: { trap: "This one is more cheap than that one.", same: ["That one is more expensive."] },
  },
  ena2m4than: {
    id: "ena2m4than", target: "than",
    source: "que — la palabra que separa las dos cosas comparadas",
    sound: "dan (átono, casi pegado a lo de delante)",
    gram: { trap: "that" },
  },
  ena2m4biggerthanmine: {
    id: "ena2m4biggerthanmine", target: "Your flat is bigger than mine.",
    source: "Tu piso es más grande que el mío.",
    sound: "yoo flat is̬ BÍ-ga dan máin",
    gram: { trap: "Your flat is more big than mine.", same: ["My flat is smaller."] },
  },
  ena2m4olderthanme: {
    id: "ena2m4olderthanme", target: "She's older than me.",
    source: "Es mayor que yo. (than me, no «than I»)",
    sound: "shis̬ ÓUL-da dan mii",
    gram: { trap: "She's more old than me.", same: ["I'm younger than her."] },
  },
  ena2m4muchcheaper: {
    id: "ena2m4muchcheaper", target: "much cheaper",
    source: "mucho más barato — «mucho más» es much, nunca very",
    sound: "mach CHÍI-pa",
    gram: { trap: "very cheaper", same: ["a lot cheaper"] },
  },
  ena2m4easierbiggerhotter: {
    id: "ena2m4easierbiggerhotter", target: "easy → easier · big → bigger · hot → hotter · nice → nicer",
    source: "más fácil · más grande · más caliente · más bonito — la -y se vuelve -ier, la consonante final se dobla y a la -e solo se le añade -r",
    sound: "ÍI-s̬ia · BÍ-ga · JÓ-ta · NÁI-sa",
  },

  // ── ena2m4l2 — el comparativo largo: more + adjetivo ──
  ena2m4moreexpensive: {
    id: "ena2m4moreexpensive", target: "It's more expensive than the other one.",
    source: "Es más caro que el otro.",
    sound: "its moor iks-PEN-siv dan di A-da uan",
    gram: { trap: "It's more expensiver than the other one.", same: ["The other one is cheaper."] },
  },
  ena2m4morecomfortable: {
    id: "ena2m4morecomfortable", target: "This sofa is more comfortable.",
    source: "Este sofá es más cómodo.",
    sound: "dis SÓU-fa is̬ moor KAMF-ta-bol",
    gram: { trap: "This sofa is comfortabler." },
  },
  ena2m4erormore: {
    id: "ena2m4erormore", target: "cheap → cheaper · expensive → more expensive",
    source: "palabra corta, -er; palabra larga, more. Nunca las dos cosas a la vez",
    sound: "CHÍI-pa · moor iks-PEN-siv",
  },
  ena2m4abitcheaper: {
    id: "ena2m4abitcheaper", target: "a bit cheaper",
    source: "un poco más barato — la rebaja pequeña, muy británica",
    sound: "a bit CHÍI-pa",
    gram: { same: ["a little cheaper"] },
  },
  ena2m4whichisbetterforme: {
    id: "ena2m4whichisbetterforme", target: "Which one is better?",
    source: "¿Cuál es mejor? (la pregunta que abre cualquier comparación)",
    sound: "uích uan is̬ BÉ-ta",
    gram: { trap: "What one is more good?" },
  },

  // ── ena2m4l3 — los tres irregulares, y than frente a that ──
  ena2m4goodbetterbest: {
    id: "ena2m4goodbetterbest", target: "good → better → the best",
    source: "bueno → mejor → el mejor. «More good» no existe",
    sound: "gud · BÉ-ta · de BEST",
  },
  ena2m4badworseworst: {
    id: "ena2m4badworseworst", target: "bad → worse → the worst",
    source: "malo → peor → el peor. Worse suena «uées», con la vocal larga",
    sound: "bad · uées · de UÉEST",
  },
  ena2m4itsbetterthan: {
    id: "ena2m4itsbetterthan", target: "This one's better than the other one.",
    source: "Este es mejor que el otro.",
    sound: "dis uans̬ BÉ-ta dan di A-da uan",
    gram: { trap: "This one's better that the other one.", same: ["The other one isn't as good."] },
  },
  ena2m4worsethanlastyear: {
    id: "ena2m4worsethanlastyear", target: "The weather was worse than last year.",
    source: "El tiempo estuvo peor que el año pasado.",
    sound: "de UÉ-da uos̬ uées dan laast YÍA",
    gram: { trap: "The weather was more bad than last year." },
  },
  ena2m4further: {
    id: "ena2m4further", target: "far → further",
    source: "lejos → más lejos. «Farer» no existe; further es lo que se dice",
    sound: "faa · FÉE-da",
    gram: { same: ["far → farther"] },
  },

  // ── ena2m4l4 — el superlativo: the -est / the most … IN ──
  ena2m4thecheapestinthe: {
    id: "ena2m4thecheapestinthe", target: "It's the cheapest one in the shop.",
    source: "Es el más barato de la tienda.",
    sound: "its de CHÍI-pist uan in de SHOP",
    gram: { trap: "It's the cheapest one of the shop.", same: ["Nothing is cheaper in this shop."] },
  },
  ena2m4thebiggestroom: {
    id: "ena2m4thebiggestroom", target: "It's the biggest room in the flat.",
    source: "Es la habitación más grande del piso.",
    sound: "its de BÍ-guist ruum in de FLAT",
    gram: { trap: "It's the biggest room of the flat." },
  },
  ena2m4themostexpensive: {
    id: "ena2m4themostexpensive", target: "the most expensive jacket in the sale",
    source: "la chaqueta más cara de las rebajas",
    sound: "de móust iks-PEN-siv DCHA-kit in de séil",
    gram: { trap: "the most expensivest jacket in the sale" },
  },
  ena2m4thebestcoffee: {
    id: "ena2m4thebestcoffee", target: "the best coffee in London",
    source: "el mejor café de Londres",
    sound: "de best KO-fi in LAN-dan",
    gram: { trap: "the best coffee of London" },
  },
  ena2m4theworstday: {
    id: "ena2m4theworstday", target: "the worst day of my life",
    source: "el peor día de mi vida — con periodos de tiempo sí va OF",
    sound: "de uéest déi ov mái LÁIF",
    gram: { same: ["the worst day I can remember"] },
  },
  ena2m4theyoungestinthefamily: {
    id: "ena2m4theyoungestinthefamily", target: "the youngest in the family",
    source: "el pequeño de la familia — con grupos de personas también va IN",
    sound: "de YANG-guist in de FA-mi-li",
    gram: { trap: "the youngest of the family" },
  },

  // ── ena2m4l5 — clínica: la schwa de -er y de than · 13 y 30 ──
  ena2m4schwaer: {
    id: "ena2m4schwaer", target: "bigger · cheaper · older · better",
    source: "la -er del final NO suena «er»: es una «a» floja y sin fuerza",
    sound: "BÍ-ga · CHÍI-pa · ÓUL-da · BÉ-ta",
  },
  ena2m4thanweak: {
    id: "ena2m4thanweak", target: "cheaper than mine",
    source: "than se dice sin fuerza y se pega a lo de delante: «CHÍI-pa dan máin»",
    sound: "CHÍI-pa dan máin",
  },
  ena2m4thirtydegrees: {
    id: "ena2m4thirtydegrees", target: "thirty degrees",
    source: "treinta grados — thirty lleva el golpe al PRINCIPIO",
    sound: "ZÉE-ti di-GRÍIS̬",
  },
  ena2m4thirteenpounds: {
    id: "ena2m4thirteenpounds", target: "thirteen pounds",
    source: "trece libras — thirteen lleva el golpe al FINAL",
    sound: "zee-TÍIN páunds̬",
  },

  // ── ena2m4l6 — medidas: altura, peso, capacidad, temperatura ──
  ena2m4howtallareyou: {
    id: "ena2m4howtallareyou", target: "How tall are you?",
    source: "¿Cuánto mides?",
    sound: "jáu TOOL aa yu",
    gram: { trap: "How much do you measure?", same: ["What's your height?"] },
  },
  ena2m4onemetreeighty: {
    id: "ena2m4onemetreeighty", target: "one metre eighty",
    source: "un metro ochenta",
    sound: "uan MÍI-ta ÉI-ti",
  },
  ena2m4howheavyisit: {
    id: "ena2m4howheavyisit", target: "How heavy is it?",
    source: "¿Cuánto pesa?",
    sound: "jáu JÉ-vi is̬ it",
    gram: { same: ["How much does it weigh?"] },
  },
  ena2m4itweighstwokilos: {
    id: "ena2m4itweighstwokilos", target: "It weighs two kilos.",
    source: "Pesa dos kilos.",
    sound: "it UÉIS̬ tuu KÍI-lous̬ (weighs suena «uéis̬»: la gh no suena)",
    gram: { trap: "It has two kilos." },
  },
  ena2m4halfalitre: {
    id: "ena2m4halfalitre", target: "half a litre",
    source: "medio litro — half suena «jaaf», sin la l",
    sound: "jaaf a LÍI-ta",
  },
  ena2m4itstwentydegrees: {
    id: "ena2m4itstwentydegrees", target: "It's twenty degrees today.",
    source: "Hoy hace veinte grados.",
    sound: "its TUÉN-ti di-GRÍIS̬ tu-DÉI",
    gram: { trap: "There are twenty degrees today." },
  },
  ena2m4howbigisit: {
    id: "ena2m4howbigisit", target: "How big is it?",
    source: "¿Cómo es de grande? — la pregunta comodín de las medidas",
    sound: "jáu BIG is̬ it",
    gram: { same: ["What size is it?"] },
  },

  // ── ena2m4l7 — los determinantes: more, most, enough, no, none, all ──
  ena2m4weneedmoretime: {
    id: "ena2m4weneedmoretime", target: "We need more time.",
    source: "Nos hace falta más tiempo. (more delante del sustantivo, a pelo)",
    sound: "ui niid moo TÁIM",
    gram: { trap: "We need more of time." },
  },
  ena2m4mostpeople: {
    id: "ena2m4mostpeople", target: "Most people take the bus.",
    source: "La mayoría de la gente coge el autobús.",
    sound: "móust PÍI-pol téik de bas",
    gram: { trap: "The most people take the bus.", same: ["Most of my friends take the bus."] },
  },
  ena2m4enoughroom: {
    id: "ena2m4enoughroom", target: "There isn't enough room.",
    source: "No hay sitio suficiente. (enough DELANTE del sustantivo)",
    sound: "déar is̬nt i-NAF RUUM",
    gram: { same: ["There isn't enough space."] },
  },
  ena2m4nomilkleft: {
    id: "ena2m4nomilkleft", target: "There's no milk left.",
    source: "No queda leche.",
    sound: "déas̬ nóu MILK left",
    gram: { same: ["There isn't any milk left."] },
  },
  ena2m4noneofthem: {
    id: "ena2m4noneofthem", target: "None of them.",
    source: "Ninguno. / Ninguna de ellas. (none va solo, sin sustantivo detrás)",
    sound: "NAN ov dem",
    gram: { trap: "No of them." },
  },
  ena2m4allofthem: {
    id: "ena2m4allofthem", target: "all of them",
    source: "todos / todas (de un grupo concreto)",
    sound: "óol ov dem",
  },
  ena2m4morethantenpounds: {
    id: "ena2m4morethantenpounds", target: "more than ten pounds",
    source: "más de diez libras — con números es more THAN, jamás more OF",
    sound: "moo dan ten PÁUNDS̬",
    gram: { trap: "more of ten pounds", same: ["over ten pounds"] },
  },

  // ── ena2m4l8 — FRONTERA: as…as · too / enough ──
  ena2m4ascheapas: {
    id: "ena2m4ascheapas", target: "It isn't as cheap as the market.",
    source: "No es tan barato como el mercado.",
    sound: "it is̬nt as̬ CHÍIP as̬ de MAA-kit",
    gram: { trap: "It isn't so cheap like the market.", same: ["The market is cheaper."] },
  },
  ena2m4thesameasmine: {
    id: "ena2m4thesameasmine", target: "It's the same as mine.",
    source: "Es igual que el mío.",
    sound: "its de SÉIM as̬ máin",
    gram: { trap: "It's the same that mine.", same: ["It's exactly like mine."] },
  },
  ena2m4tooshoessmall: {
    id: "ena2m4tooshoessmall", target: "These shoes are too small.",
    source: "Estos zapatos me quedan pequeños. (too = demasiado, y es un problema)",
    sound: "diis̬ shuus̬ aa tuu SMÓOL",
    gram: { trap: "These shoes are too much small." },
  },
  ena2m4bigenough: {
    id: "ena2m4bigenough", target: "It isn't big enough.",
    source: "No es lo bastante grande. (enough va DETRÁS del adjetivo)",
    sound: "it is̬nt big i-NAF",
    gram: { trap: "It isn't enough big.", same: ["It's too small."] },
  },

  // ── ena2m4l9 — la Parte 3 del oral: comparar dos imágenes ──
  ena2m4inbothpictures: {
    id: "ena2m4inbothpictures", target: "In both pictures I can see a shop.",
    source: "En las dos fotos veo una tienda. (así se empieza la Parte 3)",
    sound: "in bóuz PÍK-chas̬ ái kan sii a SHOP",
    gram: { trap: "In the both pictures I can see a shop.", same: ["There's a shop in both pictures."] },
  },
  ena2m4inthefirstpicture: {
    id: "ena2m4inthefirstpicture", target: "In the first picture… in the second one…",
    source: "En la primera foto… en la segunda…",
    sound: "in de FÉEST PÍK-cha… in de SÉ-kand uan…",
  },
  ena2m4theyreverysimilar: {
    id: "ena2m4theyreverysimilar", target: "They're very similar.",
    source: "Se parecen mucho. (la frase de las SEMEJANZAS)",
    sound: "déa VE-ri SÍ-mi-la",
    gram: { trap: "They are very similars.", same: ["They look the same."] },
  },
  ena2m4iprefertheseconone: {
    id: "ena2m4iprefertheseconone", target: "I prefer the second one because it's cheaper.",
    source: "Prefiero la segunda porque es más barata.",
    sound: "ái pri-FÉE de SÉ-kand uan bi-KOS̬ its CHÍI-pa",
    gram: { trap: "I prefer more the second one.", same: ["I'd go for the second one."] },
  },
  ena2m4thedifferenceisthat: {
    id: "ena2m4thedifferenceisthat", target: "The difference is that this one is bigger.",
    source: "La diferencia es que este es más grande. (aquí «que» SÍ es that)",
    sound: "de DÍ-fren-s is̬ dat dis uan is̬ BÍ-ga",
    gram: { trap: "The difference is than this one is bigger." },
  },
};

export const ena2m4: Phase = {
  id: "ena2m4",
  level: "a2",
  n: 4,
  title: "Bigger, cheaper, better",
  goal: "Comparar dos cosas y quedarte con una: el comparativo corto y el largo, than, los tres irregulares, el superlativo con the y con IN, las medidas (altura, peso, capacidad, temperatura) y los determinantes more, most, enough, no, none y all. Al final del módulo tienes montada la Parte 3 del examen oral.",
  color: "#7c3aed",
  lessons: [
    // ────────────────────────────────────────────────────────────────────
    // L1 — el comparativo corto: -er y than
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l1",
      phaseId: "ena2m4",
      title: "Cheaper than that one",
      subtitle: "Una letra al final y una palabra en medio: ya estás comparando",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Comparar dos cosas, en una frase",
          itemIds: ["ena2m4cheaperthan", "ena2m4than", "ena2m4biggerthanmine", "ena2m4olderthanme", "ena2m4muchcheaper", "ena2m4easierbiggerhotter", "encheap", "enbig"],
        },
        {
          kind: "note",
          note: {
            title: "«más barato que» son tres palabras en español y DOS en inglés",
            body: "Ahí está todo el módulo, en esa frase. En español comparas con <b>dos piezas sueltas</b>: <i>más</i> delante del adjetivo y <i>que</i> antes de lo que comparas. En inglés el <i>más</i> no es una palabra: <b>es una letra pegada al final</b>.<br/><br/>cheap → <b>cheaper</b> · big → <b>bigger</b> · old → <b>older</b> · cold → <b>colder</b><br/><br/>Y para el «que» hay una palabra propia, [[than|que — solo en comparaciones]]: <b>This one is cheaper than that one.</b><br/><br/><b>De aquí sale el error más caro del módulo.</b> Como el español dice <i>más</i> por separado, la mano lo traduce por separado y sale <i>more big</i>, <i>more cheap</i>, <i>more old</i>. No existen. Si el adjetivo es corto, <b>la -er le basta</b>, y poner <i>more</i> delante es como escribir «más grandeer». Elige una: o la -er, o el <i>more</i> del que hablaremos mañana. Las dos a la vez, jamás.<br/><br/>Dos detalles que te ahorran vergüenza:<br/>• <b>than me</b>, no <i>than I</i>. El libro antiguo dirá que lo correcto es <i>than I am</i>; en la calle y en el examen oral se dice <b>than me</b> y nadie parpadea.<br/>• «<b>mucho</b> más barato» es <b>much cheaper</b>. <i>Very cheaper</i> no existe: <i>very</i> solo acompaña a adjetivos sin comparar (<i>very cheap</i>).",
            table: [
              ["español", "inglés", "lo que sale mal"],
              ["más barato que", "cheaper than", "more cheap than"],
              ["más grande que", "bigger than", "more big than"],
              ["mayor que yo", "older than me", "more old than I"],
              ["mucho más barato", "much cheaper", "very cheaper"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Cómo se escribe la -er (y ya te la sabes del pasado)",
            body: "Los retoques son <b>los mismos tres</b> que aprendiste para la <b>-ed</b> del pasado en <i>ena2m1</i>. No hay nada nuevo que memorizar:<br/><br/>1. El adjetivo acaba en <b>-e</b> → solo se añade la -r: nice → [[nicer|más bonito]], large → larger.<br/>2. Acaba en <b>consonante + -y</b> → la y se vuelve <b>-ier</b>: easy → [[easier|más fácil]], happy → happier, busy → busier. Igual que study → studied.<br/>3. Acaba en <b>una vocal + una consonante</b> → se dobla la consonante: big → [[bigger|más grande]], hot → hotter, thin → thinner. Igual que stop → stopped.<br/><br/>Todo lo demás: <b>+ -er</b> y a otra cosa. cheap → cheaper, cold → colder, young → younger, small → smaller.",
            table: [
              ["si el adjetivo acaba en…", "qué haces", "ejemplo"],
              ["-e", "solo añades -r", "nice → nicer"],
              ["consonante + -y", "-y se vuelve -ier", "easy → easier"],
              ["vocal + consonante", "doblas la consonante", "big → bigger"],
              ["cualquier otra cosa", "+ -er", "cheap → cheaper"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l1e1", type: "fastmatch", prompt: "Calentamiento — estos adjetivos ya son tuyos del A1",
              pairs: [
                { target: "cheap", source: "barato" },
                { target: "expensive", source: "caro" },
                { target: "big", source: "grande" },
                { target: "small", source: "pequeño" },
                { target: "new", source: "nuevo" },
              ],
              targetSeconds: 25,
              itemIds: ["encheap", "enexpensive", "enbig", "ensizesmall", "ennew"],
              tip: "Todo el módulo se construye sobre cinco adjetivos que ya tenías. Comparar no es aprender palabras nuevas: es aprender a estirar las viejas.",
            },
            {
              id: "ena2m4l1e2", type: "match", prompt: "Empareja cada adjetivo con su comparativo",
              pairs: [
                { target: "cheaper", source: "más barato" },
                { target: "bigger", source: "más grande" },
                { target: "older", source: "mayor / más viejo" },
                { target: "colder", source: "más frío" },
              ],
              itemIds: ["ena2m4cheaperthan", "ena2m4biggerthanmine", "ena2m4olderthanme", "encold"],
              tip: "Fíjate en que la terminación es siempre la misma. Lo único que cambia entre bigger y cheaper es que uno dobla la consonante.",
            },
            {
              id: "ena2m4l1e3", type: "mc", prompt: "«Este es más barato que ese»",
              question: "¿Cuál es la frase inglesa?",
              options: ["This one is cheaper than that one.", "This one is more cheap than that one.", "This one is more cheaper that that one."],
              answer: 0,
              whyWrong: [null, "cheap es corto: le basta la -er. El more sobra", "Dos errores en cuatro palabras: el doble comparativo y el that en lugar de than"],
              itemIds: ["ena2m4cheaperthan", "ena2m4than"],
              tip: "Memoriza la frase entera, no la regla. «This one is cheaper than that one» es la frase que más vas a decir en la Parte 3 del oral.",
            },
            {
              id: "ena2m4l1e4", type: "bucket", prompt: "¿Este adjetivo dobla la última letra antes de la -er?",
              categories: ["se dobla la consonante", "se le pega -er y ya"],
              items: [
                { text: "big", bucket: 0 },
                { text: "cheap", bucket: 1 },
                { text: "hot", bucket: 0 },
                { text: "small", bucket: 1 },
                { text: "thin", bucket: 0 },
                { text: "new", bucket: 1 },
                { text: "young", bucket: 1 },
                { text: "old", bucket: 1 },
              ],
              itemIds: ["ena2m4easierbiggerhotter", "ena2m4biggerthanmine"],
              tip: "Se dobla solo cuando delante de la consonante final hay UNA vocal sola: bi-g, ho-t, thi-n. En cheap hay dos vocales (ea) y en small hay dos eles: no se toca nada.",
            },
            {
              id: "ena2m4l1e5", type: "cloze", prompt: "Completa con el comparativo del adjetivo entre paréntesis",
              text: "This jacket is ___ (cheap) than the one in the shop.",
              answers: ["cheaper"],
              translation: "Esta chaqueta es más barata que la de la tienda.",
              hints: ["El adjetivo es corto: no necesita ninguna palabra delante", "cheap + …"],
              itemIds: ["ena2m4cheaperthan", "enjacket"],
            },
            {
              id: "ena2m4l1e6", type: "cloze", prompt: "Completa — ojo a la ortografía",
              text: "My flat is ___ (big) than yours.",
              answers: ["bigger"],
              translation: "Mi piso es más grande que el tuyo.",
              hints: ["Vocal + consonante: pasa lo mismo que en stop → stopped", "big + …"],
              itemIds: ["ena2m4biggerthanmine", "enflat"],
            },
            {
              id: "ena2m4l1e7", type: "errorfix", prompt: "Corrige el doble comparativo — el calco nº 1 del módulo",
              wrong: "My flat is more big than yours.",
              answers: ["My flat is bigger than yours."],
              why: "En español «más» es una palabra suelta y en inglés no: con los adjetivos cortos el «más» ES la terminación -er. O pones more, o pones -er, pero nunca los dos ni ninguno. Y big es cortísimo, así que le toca la -er.",
              translation: "Mi piso es más grande que el tuyo.",
              itemIds: ["ena2m4biggerthanmine"],
              tip: "Regla mecánica para el examen: si escribes «more» delante de una palabra de una sola sílaba, párate. Casi seguro que sobra.",
            },
            {
              id: "ena2m4l1e8", type: "errorfix", prompt: "Corrige la palabra cruzada — este error se ve en el papel, no en el oído",
              wrong: "This one is cheaper that the other one.",
              answers: ["This one is cheaper than the other one."],
              why: "En español «que» hace dos trabajos: compara («más barato QUE») y encabeza subordinadas («creo QUE sí»). El inglés los reparte: comparar es THAN, lo otro es THAT. Suenan casi igual, pero se escriben distinto y el corrector del examen lo ve.",
              translation: "Este es más barato que el otro.",
              itemIds: ["ena2m4than", "ena2m4cheaperthan"],
              tip: "Truco: than lleva una N, como compariso-N. That lleva una T, como... that. Suena tonto, y funciona.",
            },
            {
              id: "ena2m4l1e9", type: "transform", prompt: "Convierte la descripción en comparación",
              source: "This shop is cheap.",
              instruction: "Compárala con el mercadillo, usando than",
              answers: ["This shop is cheaper than the street market.", "This shop is cheaper than the market."],
              translation: "Esta tienda es más barata que el mercadillo.",
              hints: ["cheap se convierte en cheaper y después va la palabra de la comparación", "This shop is cheap… th… the street market."],
              itemIds: ["ena2m4cheaperthan", "enshop", "ena2m1streetmarket"],
            },
            {
              id: "ena2m4l1e10", type: "build", prompt: "Construye la comparación",
              target: "She's older than me",
              translation: "Es mayor que yo",
              distractors: ["more", "old", "that"],
              itemIds: ["ena2m4olderthanme"],
              tip: "Las tres fichas que sobran son los tres errores de siempre: more, el adjetivo sin comparar y el that. Si las dejas fuera, tienes la frase.",
            },
            {
              id: "ena2m4l1e11", type: "mc", prompt: "«Mucho más barato»",
              question: "¿Cómo se dice «mucho más barato»?",
              options: ["much cheaper", "very cheaper", "more cheaper"],
              answer: 0,
              whyWrong: [null, "very solo acompaña a adjetivos SIN comparar: very cheap sí, very cheaper no", "Doble comparativo otra vez: cheaper ya lleva el «más» dentro"],
              itemIds: ["ena2m4muchcheaper"],
              tip: "La familia entera: much cheaper, a lot cheaper, a bit cheaper. Todas delante del comparativo. very se queda fuera de este club.",
            },
            {
              id: "ena2m4l1e12", type: "listen", prompt: "Dictado — una comparación con el tiempo",
              text: "It's colder than yesterday.",
              translation: "Hace más frío que ayer.",
              hints: ["cold + la terminación del comparativo", "It's cold… th… yesterday."],
              itemIds: ["encold", "ena2m4than", "enyesterday"],
            },
            {
              id: "ena2m4l1e13", type: "speak", prompt: "Dilo en voz alta — tu primera comparación entera",
              text: "This jacket is cheaper than that one, and it's much nicer.",
              phonetic: "dis DCHA-kit is̬ CHÍI-pa dan DAT uan, and its mach NÁI-sa",
              translation: "Esta chaqueta es más barata que esa, y es mucho más bonita.",
              itemIds: ["ena2m4cheaperthan", "ena2m4muchcheaper", "enjacket", "ennice"],
              tip: "Fíjate en que «cheaper than» sale casi como una sola palabra: CHÍI-pa-dan. Lo trabajamos entero en la lección 5.",
            },
            {
              id: "ena2m4l1e14", type: "type", prompt: "Cierre de producción",
              question: "Mi piso es más grande que el tuyo, pero el tuyo es mucho más barato.",
              answers: [
                "My flat is bigger than yours, but yours is much cheaper.",
                "My flat is bigger than yours but yours is much cheaper.",
                "My flat is bigger than your flat, but yours is much cheaper.",
              ],
              hints: ["Dos comparativos con -er y un much delante del segundo", "My flat is big… th… yours, but yours is m… cheaper."],
              itemIds: ["ena2m4biggerthanmine", "ena2m4muchcheaper", "enflat"],
              tip: "Dos comparaciones en una frase y ni un «more» a la vista. Eso ya es lenguaje de Parte 3.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m4-1",
            book: "It's very cheap.",
            real: "It's a bargain.",
            meaning: "Es una ganga / está tirado de precio",
            when: "En tiendas, mercadillos y rebajas, con amigos o con el dependiente. Es palabra de todos los días, no jerga. En el Writing del examen también vale, aunque la del libro (it's very cheap, it's good value) es la que nunca falla.",
            register: "neutral",
            note: "En las rebajas verás carteles con «bargains» a secas: son las gangas. Y ojo, bargain también es «regatear» cuando es verbo.",
            sound: "its a BAA-guin",
            level: "a2",
            itemId: "ena2m4muchcheaper",
          },
        },
      ],
      resources: [
        { label: "British Council — Comparative adjectives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-adjectives", note: "Lee solo la primera mitad (los adjetivos cortos) y haz el primer ejercicio. Los largos son la lección de mañana." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L2 — el comparativo largo: more + adjetivo
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l2",
      phaseId: "ena2m4",
      title: "More expensive, more comfortable",
      subtitle: "Dónde se corta la -er y empieza el «more» — y por qué nunca van juntos",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Cuando el adjetivo es largo",
          itemIds: ["ena2m4moreexpensive", "ena2m4morecomfortable", "ena2m4erormore", "ena2m4abitcheaper", "ena2m4whichisbetterforme", "enexpensive", "ensofa"],
        },
        {
          kind: "note",
          note: {
            title: "La frontera está en las sílabas, y se ve a ojo",
            body: "La regla completa cabe en tres líneas:<br/><br/>• <b>Una sílaba</b> → <b>-er</b>: cheap → cheaper, big → bigger, cold → colder, young → younger.<br/>• <b>Dos sílabas acabadas en -y</b> → <b>-ier</b>: easy → easier, busy → busier, happy → happier.<br/>• <b>Todo lo demás</b> (dos sílabas que no acaban en -y, y tres o más) → <b>more</b> delante: [[more expensive|más caro]], [[more comfortable|más cómodo]], more modern, more difficult, more interesting.<br/><br/>¿Y las dudosas? Existen: <i>quiet</i>, <i>simple</i>, <i>narrow</i> admiten las dos formas y ningún examinador te va a quitar un punto por elegir mal. <b>No pierdas ni un minuto con ellas.</b> Lo que sí cuesta puntos es lo otro:<br/><br/><b>Nunca las dos a la vez.</b> <i>more cheaper</i>, <i>more bigger</i>, <i>more better</i> son el error que más veces aparece en los exámenes de hispanohablantes, y suena a principiante aunque el resto del texto sea impecable. El adjetivo lleva la marca de comparación <b>una sola vez</b>: o dentro (-er) o delante (more).<br/><br/>Y al revés también existe el fallo: <i>expensiver</i>, <i>comfortabler</i>. Las palabras largas <b>no</b> aguantan la -er. Si tienes que decir la palabra en voz alta y te tropiezas al pegarle -er, es que le tocaba more.",
            table: [
              ["sílabas", "cómo se compara", "ejemplo"],
              ["una", "-er", "cheap → cheaper"],
              ["dos, acaba en -y", "-ier", "easy → easier"],
              ["dos o más, el resto", "more + adjetivo", "expensive → more expensive"],
              ["las dos cosas", "NO EXISTE", "more cheaper ✗"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l2e1", type: "mc", prompt: "La palabra larga",
              question: "«Es más caro que el otro» es…",
              options: ["It's more expensive than the other one.", "It's expensiver than the other one.", "It's more expensiver than the other one."],
              answer: 0,
              whyWrong: [null, "expensive tiene tres sílabas: no aguanta la -er", "Marca de comparación dos veces en la misma palabra"],
              itemIds: ["ena2m4moreexpensive"],
            },
            {
              id: "ena2m4l2e2", type: "bucket", prompt: "¿Este adjetivo lleva -er o lleva more?",
              categories: ["-er pegada al final", "more delante"],
              items: [
                { text: "cheap", bucket: 0 },
                { text: "expensive", bucket: 1 },
                { text: "big", bucket: 0 },
                { text: "comfortable", bucket: 1 },
                { text: "easy", bucket: 0 },
                { text: "modern", bucket: 1 },
                { text: "cold", bucket: 0 },
                { text: "interesting", bucket: 1 },
              ],
              itemIds: ["ena2m4erormore", "ena2m4moreexpensive", "ena2m4morecomfortable"],
              tip: "easy va con la -er aunque tenga dos sílabas: es la excepción de las que acaban en -y, y es de las rentables porque easy, busy y happy salen todo el rato.",
            },
            {
              id: "ena2m4l2e3", type: "match", prompt: "Empareja cada adjetivo con su comparativo bien formado",
              pairs: [
                { target: "more expensive", source: "más caro" },
                { target: "more comfortable", source: "más cómodo" },
                { target: "easier", source: "más fácil" },
                { target: "colder", source: "más frío" },
              ],
              itemIds: ["ena2m4moreexpensive", "ena2m4morecomfortable", "ena2m4easierbiggerhotter", "encold"],
            },
            {
              id: "ena2m4l2e4", type: "cloze", prompt: "Completa con la palabra que falta",
              text: "This sofa is ___ comfortable than the old one.",
              answers: ["more"],
              translation: "Este sofá es más cómodo que el viejo.",
              hints: ["comfortable tiene tres sílabas: no le cabe la -er", "Va una palabra suelta delante del adjetivo"],
              itemIds: ["ena2m4morecomfortable", "ensofa"],
            },
            {
              id: "ena2m4l2e5", type: "cloze", prompt: "Y ahora al revés: aquí NO cabe more",
              text: "The street market is ___ (cheap) than the supermarket.",
              answers: ["cheaper"],
              translation: "El mercadillo es más barato que el supermercado.",
              hints: ["Una sílaba: la marca va dentro de la palabra", "cheap + …"],
              itemIds: ["ena2m4cheaperthan", "ena2m1streetmarket", "ensupermarket"],
            },
            {
              id: "ena2m4l2e6", type: "errorfix", prompt: "Corrige el doble comparativo",
              wrong: "This flat is more cheaper than mine.",
              answers: ["This flat is cheaper than mine."],
              why: "cheaper ya lleva el «más» dentro, en la -er. Añadirle more delante es decirlo dos veces, como «más más barato». Una sola marca por adjetivo.",
              translation: "Este piso es más barato que el mío.",
              itemIds: ["ena2m4cheaperthan", "enflat"],
              tip: "Este es literalmente el error que más se repite en los exámenes de A2 de hispanohablantes. Si solo te llevas una cosa del módulo, que sea esta.",
            },
            {
              id: "ena2m4l2e7", type: "errorfix", prompt: "Corrige la -er imposible",
              wrong: "It's expensiver than the other one.",
              answers: ["It's more expensive than the other one."],
              why: "Las palabras largas no admiten la -er: no existe expensiver, ni comfortabler, ni interestinger. A partir de dos sílabas (salvo las de -y) la comparación va delante, con more.",
              translation: "Es más caro que el otro.",
              itemIds: ["ena2m4moreexpensive"],
            },
            {
              id: "ena2m4l2e8", type: "gapbank", prompt: "Los dos pisos — elige del banco",
              text: "Amy's flat is ___ than mine: it has three bedrooms and mine has one. But my flat is ___: I pay £600 a month and she pays £900. Hers is the ___ flat in the street.",
              answers: ["bigger", "cheaper", "biggest"],
              bank: ["bigger", "cheaper", "biggest", "cheapest", "older", "nicer"],
              translation: "El piso de Amy es más grande que el mío: tiene tres dormitorios y el mío uno. Pero mi piso es más barato: yo pago 600 £ al mes y ella 900. El suyo es el piso más grande de la calle.",
              itemIds: ["ena2m4biggerthanmine", "ena2m4cheaperthan", "enflat", "enbedroom", "enpound"],
              tip: "El tercer hueco lleva -est y su THE delante: es un superlativo, y es la lección 4. Ve fijándote en la forma; mañana la desmontamos entera.",
            },
            {
              id: "ena2m4l2e9", type: "transform", prompt: "De la descripción a la comparación",
              source: "The blue jacket is expensive.",
              instruction: "Compárala con la roja, usando more … than",
              answers: ["The blue jacket is more expensive than the red one.", "The blue jacket is more expensive than the red jacket."],
              translation: "La chaqueta azul es más cara que la roja.",
              hints: ["expensive es larga: la marca va delante, suelta", "The blue jacket is m… expensive th… the red one."],
              itemIds: ["ena2m4moreexpensive", "enjacket", "enblue", "enred"],
            },
            {
              id: "ena2m4l2e10", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Este sofá es más cómodo que el mío.",
              answers: ["This sofa is more comfortable than mine.", "This sofa is more comfortable than my sofa."],
              hint: "el adjetivo tiene tres sílabas",
              itemIds: ["ena2m4morecomfortable", "ensofa"],
              tip: "Comfortable se dice KAMF-ta-bol, en tres golpes y no en cuatro. Los ingleses se comen la sílaba del medio.",
            },
            {
              id: "ena2m4l2e11", type: "speak", prompt: "Dilo en voz alta — las dos formas seguidas",
              text: "The sofa is more comfortable, but the chair is cheaper.",
              phonetic: "de SÓU-fa is̬ moor KAMF-ta-bol, bat de chéa is̬ CHÍI-pa",
              translation: "El sofá es más cómodo, pero la silla es más barata.",
              itemIds: ["ena2m4morecomfortable", "ena2m4cheaperthan", "ensofa", "enchair"],
              tip: "Una frase, las dos reglas: more delante de la palabra larga y -er dentro de la corta. Si esto te sale solo, la lección está hecha.",
            },
            {
              id: "ena2m4l2e12", type: "type", prompt: "Cierre de producción",
              question: "Esta tienda es más cara que el mercadillo, pero es un poco más cómoda.",
              answers: [
                "This shop is more expensive than the street market, but it's a bit more comfortable.",
                "This shop is more expensive than the market, but it's a bit more comfortable.",
                "This shop is more expensive than the street market but it's a bit more comfortable.",
              ],
              hints: ["Dos veces more, y ni una -er de más", "This shop is m… expensive th… the street market, but it's a b… more comfortable."],
              itemIds: ["ena2m4moreexpensive", "ena2m4abitcheaper", "ena2m4morecomfortable", "enshop", "ena2m1streetmarket"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Comparative adjectives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-adjectives", note: "Ahora sí, la ficha entera. Al hacer los ejercicios, apunta cada vez que dudes entre -er y more: verás que siempre son las mismas cuatro palabras." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L3 — better, worse, further · y than frente a that
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l3",
      phaseId: "ena2m4",
      title: "Better, worse, further",
      subtitle: "Tres irregulares y ni uno más — y la palabra que se cruza al escribir",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Los que no siguen la regla",
          itemIds: ["ena2m4goodbetterbest", "ena2m4badworseworst", "ena2m4itsbetterthan", "ena2m4worsethanlastyear", "ena2m4further", "ena2m4whichisbetterforme"],
        },
        {
          kind: "note",
          note: {
            title: "Buenas noticias: los irregulares del comparativo son tres",
            body: "Después de los cincuenta verbos irregulares de <i>ena2m2</i>, esto es un regalo. La lista completa de comparativos irregulares del A2 cabe aquí:<br/><br/>• good → <b>better</b> → the <b>best</b><br/>• bad → <b>worse</b> → the <b>worst</b><br/>• far → <b>further</b> (o <i>farther</i>: las dos valen)<br/><br/>Y ya está. <i>More good</i> y <i>more bad</i> no existen, igual que en español no decimos «más bueno que» cuando queremos decir «mejor que».<br/><br/><b>Cuidado con dos sonidos:</b> [[worse|peor]] se dice «uées», con la vocal larga de <i>work</i>, no «uors». Y <b>better</b> en boca británica es «BÉ-ta»: la doble t del medio suena a t normal y la -er del final es esa «a» floja de la que hablaremos en la clínica.<br/><br/>Y ojo al calco de significado: en español «peor» también sirve para «más mal hecho», pero el inglés reparte. <i>worse</i> compara la <b>calidad</b> o el <b>estado</b>: <i>The weather was worse</i>, <i>I feel worse today</i>.",
            table: [
              ["adjetivo", "comparativo", "superlativo"],
              ["good", "better", "the best"],
              ["bad", "worse", "the worst"],
              ["far", "further / farther", "the furthest"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "than / that: un «que» español que en inglés son dos",
            body: "Esta es la trampa de escritura más frecuente del nivel, y la más silenciosa: <b>suena bien y está mal</b>.<br/><br/>En español, «que» hace dos trabajos distintos con la misma palabra:<br/>• <b>comparar</b>: «este es mejor <u>que</u> aquel»<br/>• <b>encabezar una subordinada</b>: «creo <u>que</u> es mejor»<br/><br/>El inglés usa <b>dos palabras distintas</b>:<br/>• comparar → <b>than</b>: <i>This one is better <b>than</b> that one.</i><br/>• subordinada → <b>that</b>: <i>I think <b>that</b> this one is better.</i><br/><br/>Como en el habla rápida las dos se pronuncian igual de flojas («dan», «dat»), el oído no te va a salvar: esto se arregla mirándolo al escribir. <b>Y en el examen escrito penaliza</b>, porque el corrector lo lee como error de gramática básica.<br/><br/>Regla de bolsillo: <b>si delante hay un comparativo (algo con -er, con more, o better/worse), va THAN.</b> En cualquier otro sitio, that.",
            table: [
              ["español", "inglés", "por qué"],
              ["mejor que este", "better than this one", "hay comparación"],
              ["más grande que el mío", "bigger than mine", "hay comparación"],
              ["creo que es mejor", "I think that it's better", "es una subordinada"],
              ["la diferencia es que…", "the difference is that…", "es una subordinada"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l3e1", type: "mc", prompt: "«Mejor»",
              question: "El comparativo de good es…",
              options: ["better", "gooder", "more good"],
              answer: 0,
              whyWrong: [null, "good es de los que cambian entero, no de los que añaden -er", "Ni con more ni con -er: good tiene forma propia"],
              itemIds: ["ena2m4goodbetterbest"],
            },
            {
              id: "ena2m4l3e2", type: "match", prompt: "Empareja cada forma con su significado",
              pairs: [
                { target: "better", source: "mejor" },
                { target: "worse", source: "peor" },
                { target: "further", source: "más lejos" },
                { target: "the best", source: "el mejor / la mejor" },
              ],
              itemIds: ["ena2m4goodbetterbest", "ena2m4badworseworst", "ena2m4further"],
            },
            {
              id: "ena2m4l3e3", type: "bucket", prompt: "¿Este adjetivo sigue la regla o tiene forma propia?",
              categories: ["sigue la regla (-er / more)", "tiene forma propia"],
              items: [
                { text: "good", bucket: 1 },
                { text: "cheap", bucket: 0 },
                { text: "bad", bucket: 1 },
                { text: "expensive", bucket: 0 },
                { text: "far", bucket: 1 },
                { text: "big", bucket: 0 },
              ],
              itemIds: ["ena2m4goodbetterbest", "ena2m4badworseworst", "ena2m4further"],
              tip: "Tres frente a todos los demás. Después de los irregulares del pasado, esta lista es prácticamente un descanso.",
            },
            {
              id: "ena2m4l3e4", type: "cloze", prompt: "Completa con el comparativo de good",
              text: "Sam's coffee is ___ than the coffee at the station.",
              answers: ["better"],
              translation: "El café de Sam es mejor que el de la estación.",
              hints: ["No lleva -er ni more: cambia la palabra entera", "b…"],
              itemIds: ["ena2m4goodbetterbest", "ena2m4itsbetterthan", "enstation"],
            },
            {
              id: "ena2m4l3e5", type: "cloze", prompt: "Completa con el comparativo de bad",
              text: "The weather was ___ than last year.",
              answers: ["worse"],
              translation: "El tiempo estuvo peor que el año pasado.",
              hints: ["Se dice «uées», con vocal larga", "w…"],
              itemIds: ["ena2m4badworseworst", "ena2m4worsethanlastyear", "ena2m1lastyear"],
            },
            {
              id: "ena2m4l3e6", type: "errorfix", prompt: "Corrige el comparativo de más",
              wrong: "This one is more better than that one.",
              answers: ["This one is better than that one."],
              why: "better ya ES el comparativo de good: lleva el «más» dentro. Ponerle more delante es como decir «más mejor». Y en inglés «more better» suena tan raro como suena en español.",
              translation: "Este es mejor que ese.",
              itemIds: ["ena2m4itsbetterthan"],
            },
            {
              id: "ena2m4l3e7", type: "errorfix", prompt: "Corrige el «que» equivocado",
              wrong: "Sam's coffee is better that Mr Patel's.",
              answers: ["Sam's coffee is better than Mr Patel's."],
              why: "Delante hay un comparativo (better), así que el «que» es THAN. THAT se guarda para las subordinadas: «I think that Sam's coffee is better». En español las dos son «que» y por eso se cruzan al escribir.",
              translation: "El café de Sam es mejor que el del señor Patel.",
              itemIds: ["ena2m4than", "ena2m4itsbetterthan"],
              tip: "Cuando revises un texto en el examen, busca cada «than» y cada «that» y pregúntate: ¿hay una comparación delante? Es un repaso de diez segundos que salva puntos.",
            },
            {
              id: "ena2m4l3e8", type: "mc", prompt: "¿than o that?",
              question: "«Creo que este es mejor que el otro» es…",
              options: [
                "I think that this one is better than the other one.",
                "I think than this one is better that the other one.",
                "I think that this one is better that the other one.",
              ],
              answer: 0,
              whyWrong: [null, "Las dos cambiadas: la subordinada pide that y la comparación pide than", "La subordinada está bien; la comparación necesita than"],
              itemIds: ["ena2m4than", "ena2m4itsbetterthan"],
              tip: "En la misma frase caben las dos, y con esa frase se entiende de golpe: think THAT (subordinada) … better THAN (comparación).",
            },
            {
              id: "ena2m4l3e9", type: "transform", prompt: "De la descripción a la comparación",
              source: "This café is good.",
              instruction: "Compáralo con el de la estación, usando better than",
              answers: ["This café is better than the café at the station.", "This café is better than the one at the station."],
              translation: "Este café es mejor que el de la estación.",
              hints: ["good no admite ni -er ni more", "This café is b… th… the one at the station."],
              itemIds: ["ena2m4goodbetterbest", "ena2m4itsbetterthan", "enstation"],
            },
            {
              id: "ena2m4l3e10", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              source: "It's much better than the other one, and it isn't further.",
              answers: [
                "Es mucho mejor que el otro, y no está más lejos.",
                "Es mucho mejor que la otra, y no está más lejos.",
              ],
              itemIds: ["ena2m4itsbetterthan", "ena2m4further", "ena2m4muchcheaper"],
              tip: "much better, much worse, much further: el much delante del comparativo funciona con los irregulares igual que con los demás.",
            },
            {
              id: "ena2m4l3e11", type: "speak", prompt: "Dilo en voz alta — cuidado con la vocal de worse",
              text: "The coffee is better here, but the weather is worse.",
              phonetic: "de KO-fi is̬ BÉ-ta jía, bat de UÉ-da is̬ UÉES",
              translation: "El café es mejor aquí, pero el tiempo es peor.",
              itemIds: ["ena2m4goodbetterbest", "ena2m4badworseworst", "ena2m4worsethanlastyear"],
              tip: "worse rima con first y con work: es esa vocal larga de la boca a medio abrir. Si te sale «uors», estás leyendo la R, y aquí no suena.",
            },
            {
              id: "ena2m4l3e12", type: "type", prompt: "Cierre de producción",
              question: "Esta tienda es mejor que la otra, pero está más lejos.",
              answers: [
                "This shop is better than the other one, but it's further.",
                "This shop is better than the other one but it's further.",
                "This shop is better than the other shop, but it's further.",
              ],
              hints: ["Dos irregulares en la misma frase", "This shop is b… th… the other one, but it's f…"],
              itemIds: ["ena2m4goodbetterbest", "ena2m4further", "ena2m4than", "enshop"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m4-2",
            book: "That's much better.",
            real: "That's way better.",
            meaning: "Eso está mucho mejor",
            when: "Con amigos y compañeros, comparando cualquier cosa: una foto, una versión, un sitio. Es informal pero muy corriente en Reino Unido. En el examen escrito, much better: way better te marcaría el registro como demasiado coloquial.",
            register: "amigos",
            note: "way delante de un comparativo es «mucho» subido de tono: way cheaper, way worse, way too expensive.",
            sound: "dats uéi BÉ-ta",
            level: "a2",
            itemId: "ena2m4itsbetterthan",
          },
        },
      ],
      resources: [
        { label: "British Council — Comparative and superlative adjectives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-superlative-adjectives", note: "Busca la tabla de irregulares y compruébalo: son tres. Lo demás de la página es la lección de mañana." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L4 — el superlativo: the -est / the most … IN
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l4",
      phaseId: "ena2m4",
      title: "The cheapest in the shop",
      subtitle: "El superlativo: el THE que no se cae y la preposición que el español cambia",
      minutes: 11,
      sections: [
        {
          kind: "phrases",
          title: "El primero de todos",
          itemIds: ["ena2m4thecheapestinthe", "ena2m4thebiggestroom", "ena2m4themostexpensive", "ena2m4thebestcoffee", "ena2m4theworstday", "ena2m4theyoungestinthefamily", "ensale"],
        },
        {
          kind: "note",
          note: {
            title: "Del comparativo al superlativo hay dos cambios, y ninguno es difícil",
            body: "Si ayer aprendiste a decir «más barato que», hoy solo tienes que decir «<b>el</b> más barato <b>de todos</b>». Los cambios son estos:<br/><br/>1. La terminación pasa de <b>-er</b> a <b>-est</b>: cheap → cheaper → [[the cheapest|el más barato]]. Y el <i>more</i> pasa a <b>the most</b>: expensive → more expensive → [[the most expensive|el más caro]].<br/>2. <b>Delante va THE, y no se cae nunca.</b> Ni en el habla rápida, ni en un mensaje, ni cuando el sustantivo va detrás. <i>It's best coffee in London</i> está mal; <i>It's <b>the</b> best coffee in London</i> está bien.<br/><br/>Los irregulares son los mismos tres de ayer: good → <b>the best</b>, bad → <b>the worst</b>, far → the furthest.<br/><br/>Y la ortografía tampoco cambia: los mismos retoques del comparativo (big → the biggest, easy → the easiest, nice → the nicest).",
            table: [
              ["adjetivo", "comparativo", "superlativo"],
              ["cheap", "cheaper", "the cheapest"],
              ["big", "bigger", "the biggest"],
              ["easy", "easier", "the easiest"],
              ["expensive", "more expensive", "the most expensive"],
              ["good", "better", "the best"],
              ["bad", "worse", "the worst"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "«El más barato DE la tienda» — y aquí es donde el español te traiciona",
            body: "Después del superlativo, el español pone siempre <b>de</b>: el más barato <i>de</i> la tienda, la habitación más grande <i>del</i> piso, el mejor café <i>de</i> Londres. Y la mano traduce <i>of</i>, que es lo que parece.<br/><br/><b>En inglés casi siempre es IN.</b><br/><br/>• Con <b>sitios</b>: the cheapest one <b>in</b> the shop · the best coffee <b>in</b> London · the biggest room <b>in</b> the flat.<br/>• Con <b>grupos de personas</b>: the youngest <b>in</b> the family · the tallest <b>in</b> the class.<br/>• Con <b>periodos de tiempo</b>, y solo ahí, sí es <b>OF</b>: the worst day <b>of</b> my life · the hottest day <b>of</b> the year.<br/><br/>Así que la regla práctica es corta: <b>si detrás hay un sitio o un grupo de gente, IN. Si detrás hay un trozo de tiempo, OF.</b><br/><br/>Y una última cosa que casi nadie avisa: <i>the best of the shop</i> no es solo raro, es que significa otra cosa (algo así como «lo mejorcito que da de sí la tienda»). No es que suene extranjero: es que se entiende mal.",
            table: [
              ["español", "inglés", "qué hay detrás"],
              ["el más barato de la tienda", "the cheapest in the shop", "un sitio"],
              ["el mejor café de Londres", "the best coffee in London", "un sitio"],
              ["el pequeño de la familia", "the youngest in the family", "un grupo"],
              ["el peor día de mi vida", "the worst day of my life", "un periodo de tiempo"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l4e1", type: "mc", prompt: "El superlativo de cheap",
              question: "«El más barato» es…",
              options: ["the cheapest", "the more cheap", "cheapest"],
              answer: 0,
              whyWrong: [null, "more es para comparar dos, no para coronar a uno; y cheap es corto", "Le falta el THE, que en el superlativo no se cae nunca"],
              itemIds: ["ena2m4thecheapestinthe"],
            },
            {
              id: "ena2m4l4e2", type: "match", prompt: "Empareja cada adjetivo con su superlativo",
              pairs: [
                { target: "the cheapest", source: "el más barato" },
                { target: "the most expensive", source: "el más caro" },
                { target: "the best", source: "el mejor" },
                { target: "the worst", source: "el peor" },
              ],
              itemIds: ["ena2m4thecheapestinthe", "ena2m4themostexpensive", "ena2m4thebestcoffee", "ena2m4theworstday"],
            },
            {
              id: "ena2m4l4e3", type: "bucket", prompt: "¿Este superlativo lleva -est o lleva the most?",
              categories: ["the + adjetivo + -est", "the most + adjetivo"],
              items: [
                { text: "cheap", bucket: 0 },
                { text: "expensive", bucket: 1 },
                { text: "big", bucket: 0 },
                { text: "comfortable", bucket: 1 },
                { text: "young", bucket: 0 },
                { text: "interesting", bucket: 1 },
              ],
              itemIds: ["ena2m4thecheapestinthe", "ena2m4themostexpensive", "ena2m4theyoungestinthefamily"],
              tip: "La frontera es la misma de la lección 2: lo que llevaba -er lleva -est, y lo que llevaba more lleva the most. No hay dos reglas, hay una.",
            },
            {
              id: "ena2m4l4e4", type: "cloze", prompt: "Completa con el superlativo",
              text: "It's the ___ (cheap) jacket in the shop.",
              answers: ["cheapest"],
              translation: "Es la chaqueta más barata de la tienda.",
              hints: ["cheap es corto: la marca va dentro de la palabra", "cheap + …"],
              itemIds: ["ena2m4thecheapestinthe", "enjacket", "enshop"],
            },
            {
              id: "ena2m4l4e5", type: "cloze", prompt: "Y ahora con una palabra larga",
              text: "It's the ___ expensive flat in the street.",
              answers: ["most"],
              translation: "Es el piso más caro de la calle.",
              hints: ["expensive no aguanta la -est", "the … expensive"],
              itemIds: ["ena2m4themostexpensive", "enflat"],
            },
            {
              id: "ena2m4l4e6", type: "errorfix", prompt: "Corrige la preposición — el calco del superlativo",
              wrong: "It's the biggest room of the flat.",
              answers: ["It's the biggest room in the flat."],
              why: "El español dice «del piso» y de ahí sale el of. Pero detrás del superlativo, cuando lo que viene es un SITIO, el inglés pone IN: in the flat, in the shop, in London. El of se guarda para los periodos de tiempo (the worst day OF my life).",
              translation: "Es la habitación más grande del piso.",
              itemIds: ["ena2m4thebiggestroom", "enroom", "enflat"],
              tip: "Este error no rompe la comunicación, pero es de los que un corrector marca sin pensar. Y es baratísimo de arreglar: una preposición.",
            },
            {
              id: "ena2m4l4e7", type: "errorfix", prompt: "Corrige el artículo que falta",
              wrong: "It's best coffee in London.",
              answers: ["It's the best coffee in London."],
              why: "El superlativo lleva THE siempre, y el español ayuda a olvidarlo porque a veces decimos «es mejor café de Londres» sin artículo. En inglés no hay excepción: the best, the cheapest, the most expensive.",
              translation: "Es el mejor café de Londres.",
              itemIds: ["ena2m4thebestcoffee", "enlondon"],
            },
            {
              id: "ena2m4l4e8", type: "mc", prompt: "in u of: ¿qué hay detrás?",
              question: "«El peor día de mi vida» es…",
              options: ["the worst day of my life", "the worst day in my life", "the worst day from my life"],
              answer: 0,
              whyWrong: [null, "Aquí detrás no hay un sitio, hay un periodo de tiempo (my life): toca of", "from no entra en esta construcción en ningún caso"],
              itemIds: ["ena2m4theworstday"],
              tip: "La única familia que se lleva OF es la del tiempo: of my life, of the year, of the month, of the day. Todo lo demás, IN.",
            },
            {
              id: "ena2m4l4e9", type: "order", prompt: "Ordena la tarde de compras de Valeria",
              sentences: [
                "On Saturday Valeria went to the street market with Amy.",
                "She saw three jackets: a blue one, a red one and a black one.",
                "The blue one was the cheapest in the market, but it was too small.",
                "In the end she bought the black one, because it was the most comfortable.",
              ],
              translation: "El sábado Valeria fue al mercadillo con Amy. Vio tres chaquetas: una azul, una roja y una negra. La azul era la más barata del mercadillo, pero le quedaba pequeña. Al final compró la negra, porque era la más cómoda.",
              itemIds: ["ena2m4thecheapestinthe", "ena2m4themostexpensive", "ena2m2intheend", "ena2m2boughtgroup", "ena2m2isawamyyesterday", "ena2m1streetmarket", "enjacket"],
              tip: "Fíjate en cómo se encadena una decisión de compra: qué había, cuál era el más algo, y por qué te quedaste con otro. Eso es exactamente la misión del módulo.",
            },
            {
              id: "ena2m4l4e10", type: "build", prompt: "Construye el superlativo entero",
              target: "It's the cheapest one in the shop",
              translation: "Es el más barato de la tienda",
              distractors: ["of", "most", "cheaper"],
              itemIds: ["ena2m4thecheapestinthe", "enshop"],
              tip: "Tres fichas sobrantes, tres errores clásicos: la preposición española, el most que aquí no toca y el comparativo en lugar del superlativo.",
            },
            {
              id: "ena2m4l4e11", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Es la habitación más grande del piso.",
              answers: ["It's the biggest room in the flat.", "It's the biggest room in the apartment."],
              hint: "detrás hay un sitio",
              itemIds: ["ena2m4thebiggestroom", "enroom", "enflat"],
            },
            {
              id: "ena2m4l4e12", type: "speak", prompt: "Dilo en voz alta — dos superlativos seguidos",
              text: "It's the best coffee in London, and it isn't the most expensive.",
              phonetic: "its de best KO-fi in LAN-dan, and it is̬nt de móust iks-PEN-siv",
              translation: "Es el mejor café de Londres, y no es el más caro.",
              itemIds: ["ena2m4thebestcoffee", "ena2m4themostexpensive"],
              tip: "«the best» se dice pegado, casi «debest». El the del superlativo es átono: no lo separes ni lo alargues.",
            },
            {
              id: "ena2m4l4e13", type: "type", prompt: "Cierre de producción",
              question: "Es la chaqueta más cara de las rebajas, pero es la más cómoda.",
              answers: [
                "It's the most expensive jacket in the sale, but it's the most comfortable.",
                "It's the most expensive jacket in the sale but it's the most comfortable.",
              ],
              hints: ["Dos veces the most, y la preposición del sitio", "It's the m… expensive jacket i… the sale, but it's the m… comfortable."],
              itemIds: ["ena2m4themostexpensive", "ena2m4morecomfortable", "ensale"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Superlative adjectives", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-superlative-adjectives", note: "Haz los ejercicios y fíjate solo en una cosa: qué preposición aparece detrás de cada superlativo. Verás que casi siempre es in." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L5 — clínica de sonido: la schwa de -er y de than · 13 frente a 30
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l5",
      phaseId: "ena2m4",
      title: "Clínica de sonido: CHÍI-pa dan máin",
      subtitle: "La -er que no suena a -er, el than que casi no suena, y el par que cuesta dinero",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Las piezas de la clínica",
          itemIds: ["ena2m4schwaer", "ena2m4thanweak", "ena2m4thirtydegrees", "ena2m4thirteenpounds", "enthirteen30"],
        },
        {
          kind: "note",
          note: {
            title: "Dos trampas de ritmo, y las dos están en la misma frase",
            body: "Coge la frase del módulo: <b>cheaper than mine</b>. Escrita tiene tres palabras; dicha por un británico tiene <b>dos golpes de voz</b> y suena «<b>CHÍI-pa-dan máin</b>». Ahí dentro están las dos trampas del nivel.<br/><br/><b>1. La -er final NO suena «er».</b> Es la vocal más frecuente del inglés y la más floja de todas: una «a» sin fuerza, casi un gruñido. bigger = <b>BÍ-ga</b>. cheaper = <b>CHÍI-pa</b>. better = <b>BÉ-ta</b>. older = <b>ÓUL-da</b>. Si dices «bí-guer», estás leyendo la palabra en español y la R que pronuncias ahí <b>no existe</b> en inglés británico.<br/><br/><b>2. «than» es átono.</b> Nunca lleva el golpe de voz, se pega a la palabra de delante y se reduce a «dan». Y eso tiene una consecuencia práctica que te va a servir en el Listening: <b>si oyes un «dan» flojito, es que acaba de haber una comparación</b>. Es una pista gratis.<br/><br/>La ventaja es que esto <b>no hay que estudiarlo, hay que dejarlo caer</b>. El error del hispanohablante aquí es pronunciar de más, no de menos: dar a cada sílaba su peso, como en español. En inglés unas sílabas pesan y otras casi no existen.",
            table: [
              ["se escribe", "suena", "y NO"],
              ["bigger", "BÍ-ga", "bí-guer"],
              ["cheaper", "CHÍI-pa", "chí-per"],
              ["better", "BÉ-ta", "bé-ter"],
              ["cheaper than mine", "CHÍI-pa dan máin", "chíper zan máin"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "13 y 30: el par que cuesta dinero de verdad",
            body: "Este ya lo viste en el A1 con los números sueltos. Aquí vuelve donde importa: <b>precios, pesos, alturas y temperaturas</b>, que es justo donde confundirse tiene consecuencias.<br/><br/>La diferencia <b>no está en la vocal</b>, está en <b>dónde cae el golpe de voz</b>:<br/>• <b>thir-TEEN</b>, four-TEEN, fif-TEEN, six-TEEN → el golpe <b>al final</b>, y la palabra acaba en un «-tíin» largo.<br/>• <b>THIR-ty</b>, FOR-ty, FIF-ty, SIX-ty → el golpe <b>al principio</b>, y acaba en una «i» corta y floja.<br/><br/>Así que <i>thirteen pounds</i> es «zee-TÍIN páunds̬» y <i>thirty pounds</i> es «ZÉE-ti páunds̬». La diferencia entre 13 £ y 30 £ es dónde pones la fuerza.<br/><br/><b>Y el truco que usan los nativos entre ellos:</b> cuando hay dudas de verdad —por teléfono, en una tienda ruidosa— se dice el número dos veces de otra forma: «<i>Thirty. Three-zero.</i>». No es de mala educación: es lo que hace todo el mundo. En el examen oral, si no estás seguro de haber oído bien, preguntar «<i>One-three or three-zero?</i>» no te resta nada.",
            table: [
              ["número", "cómo suena", "dónde cae el golpe"],
              ["13", "zee-TÍIN", "al final"],
              ["30", "ZÉE-ti", "al principio"],
              ["15", "fif-TÍIN", "al final"],
              ["50", "FÍF-ti", "al principio"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l5e1", type: "mc", prompt: "La -er del final",
              question: "«bigger» suena…",
              options: ["BÍ-ga", "bí-guer", "bi-GUER"],
              answer: 0,
              whyWrong: [null, "Esa R final no se pronuncia en inglés británico: la -er es una «a» floja", "Además del error de la R, el golpe de voz va al principio, no al final"],
              itemIds: ["ena2m4schwaer"],
            },
            {
              id: "ena2m4l5e2", type: "bucket", prompt: "¿El golpe de voz va al principio o al final?",
              categories: ["al principio (30, 40, 50…)", "al final (13, 14, 15…)"],
              items: [
                { text: "thirteen", bucket: 1 },
                { text: "thirty", bucket: 0 },
                { text: "fourteen", bucket: 1 },
                { text: "forty", bucket: 0 },
                { text: "fifteen", bucket: 1 },
                { text: "fifty", bucket: 0 },
                { text: "sixteen", bucket: 1 },
                { text: "sixty", bucket: 0 },
              ],
              itemIds: ["ena2m4thirteenpounds", "ena2m4thirtydegrees", "enthirteen30", "enfourteen40", "enfifteen50", "ensixteen60"],
              tip: "Los «-teen» tiran del golpe hacia el final; los «-ty» lo dejan al principio. Es la única diferencia, y es suficiente.",
            },
            {
              id: "ena2m4l5e3", type: "audiomc", prompt: "Cazar el precio — 2 escuchas, como en el examen",
              audio: "The small jacket is thirteen pounds and the big one is thirty. It's four degrees outside, so you need it today.",
              question: "¿Cuánto cuesta la chaqueta pequeña?",
              options: ["13 £", "30 £", "4 £"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Esos son los 30 £ de la grande: fíjate en dónde cae el golpe de voz", "Los cuatro son los grados de la calle, no un precio"],
              itemIds: ["ena2m4thirteenpounds", "ena2m4thirtydegrees", "enjacket", "enpound"],
              tip: "En el Listening del examen los precios vienen siempre de dos en dos, y uno de los dos es el par 13/30. No es casualidad: saben perfectamente dónde falla la gente.",
            },
            {
              id: "ena2m4l5e4", type: "hearreal", prompt: "¿Libro o calle? La comparación a velocidad normal",
              book: "This one is cheaper than that one.",
              real: "This one's cheapa'n that one.",
              translation: "Este es más barato que ese.",
              itemIds: ["ena2m4cheaperthan", "ena2m4thanweak"],
              tip: "El «than» se funde con la -er de delante y sale un «-pan» que apenas se oye. Tú escribe siempre «cheaper than»; esto es solo para reconocerlo al vuelo.",
            },
            {
              id: "ena2m4l5e5", type: "hearreal", prompt: "Y con un irregular",
              book: "It's much better than the other one.",
              real: "It's much betta'n the otha one.",
              translation: "Es mucho mejor que el otro.",
              itemIds: ["ena2m4itsbetterthan", "ena2m4schwaer"],
              tip: "better y other acaban las dos en esa «a» floja. En una frase rápida oirás «BÉ-ta-n-di-A-da»: cuatro sílabas y un solo golpe fuerte.",
            },
            {
              id: "ena2m4l5e6", type: "shadow", prompt: "Sombrea la frase del módulo — primero lento, después a velocidad normal",
              text: "It's cheaper than mine, but it isn't as good.",
              phonetic: "its CHÍI-pa dan máin, bat it is̬nt as̬ GUD",
              translation: "Es más barato que el mío, pero no es tan bueno.",
              reps: 2,
              itemIds: ["ena2m4cheaperthan", "ena2m4thanweak", "ena2m4ascheapas"],
              tip: "No persigas todas las sílabas: persigue las dos fuertes (CHÍI y máin) y deja que las demás caigan solas. Eso es hablar con ritmo inglés.",
            },
            {
              id: "ena2m4l5e7", type: "speak", prompt: "La escalera de la schwa, en voz alta",
              text: "Bigger, cheaper, older, better.",
              phonetic: "BÍ-ga, CHÍI-pa, ÓUL-da, BÉ-ta",
              translation: "Más grande, más barato, más viejo, mejor.",
              itemIds: ["ena2m4schwaer"],
              tip: "Cuatro palabras, cuatro veces la misma «a» floja al final. Si las cuatro te suenan iguales de final, lo estás haciendo bien.",
            },
            {
              id: "ena2m4l5e8", type: "listen", prompt: "Dictado — dos números del par difícil",
              text: "This one is thirteen pounds and that one is thirty.",
              translation: "Este cuesta 13 libras y ese 30.",
              hints: ["Uno acaba en «-tíin» largo y el otro en una «i» corta", "This one is th… pounds and that one is th…"],
              itemIds: ["ena2m4thirteenpounds", "ena2m4thirtydegrees", "enpound"],
            },
            {
              id: "ena2m4l5e9", type: "match", prompt: "Empareja cada palabra con cómo suena de verdad",
              pairs: [
                { target: "cheaper", source: "CHÍI-pa" },
                { target: "better", source: "BÉ-ta" },
                { target: "thirteen", source: "zee-TÍIN" },
                { target: "thirty", source: "ZÉE-ti" },
              ],
              itemIds: ["ena2m4schwaer", "ena2m4thirteenpounds", "ena2m4thirtydegrees"],
            },
            {
              id: "ena2m4l5e10", type: "fastmatch", prompt: "Ráfaga de sonidos — sin pensar",
              pairs: [
                { target: "bigger", source: "BÍ-ga" },
                { target: "older", source: "ÓUL-da" },
                { target: "worse", source: "uées" },
                { target: "than", source: "dan (flojito)" },
                { target: "fifteen", source: "fif-TÍIN" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m4schwaer", "ena2m4badworseworst", "ena2m4thanweak", "enfifteen50"],
            },
            {
              id: "ena2m4l5e11", type: "mc", prompt: "Por qué esta clínica importa más de lo que parece",
              question: "En el Listening del examen oyes «It's THIR-ty degrees». ¿Cuántos grados hace?",
              options: ["30", "13", "3"],
              answer: 0,
              whyWrong: [null, "13 sería «zee-TÍIN», con el golpe al final", "El 3 es «three», una sola sílaba"],
              itemIds: ["ena2m4thirtydegrees", "ena2m4itstwentydegrees"],
              tip: "Y fíjate en el dato de fondo: 30 grados en Londres es noticia; 13 es un martes cualquiera. En el examen, el contexto también decide.",
            },
            {
              id: "ena2m4l5e12", type: "type", prompt: "Cierre de producción",
              question: "Este es más barato que ese, pero cuesta 30 libras.",
              answers: [
                "This one is cheaper than that one, but it's thirty pounds.",
                "This one is cheaper than that one but it's thirty pounds.",
                "This one is cheaper than that one, but it costs thirty pounds.",
              ],
              hints: ["Escribe el número con letras", "This one is ch… th… that one, but it's th… pounds."],
              itemIds: ["ena2m4cheaperthan", "ena2m4thirtydegrees", "enpound"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m4-3",
            book: "How much is it?",
            real: "How much d'you want for it?",
            meaning: "¿Cuánto quieres por esto?",
            when: "En mercadillos y en compraventa entre particulares, donde el precio se habla. En una tienda normal, jamás: allí se dice How much is it? En el examen, siempre la del libro.",
            register: "amigos",
            note: "En Reino Unido no se regatea en las tiendas, pero sí en los mercadillos y en las ventas de segunda mano. Esta frase es la que abre esa conversación.",
            sound: "jáu mach dchu UÓNT fo rit",
            level: "a2",
            itemId: "enhowmuchisit",
          },
        },
      ],
      resources: [
        { label: "BBC Learning English — The schwa", url: "https://www.bbc.co.uk/learningenglish/features/pronunciation", note: "Busca los vídeos del sonido /ə/. Cinco minutos con esto y entiendes por qué el inglés te suena «masticado»: la mitad de las vocales son esta." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L6 — medidas: altura, peso, capacidad, temperatura
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l6",
      phaseId: "ena2m4",
      title: "How tall? How heavy?",
      subtitle: "Medir cosas: altura, peso, capacidad y temperatura",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Preguntar y decir cuánto",
          itemIds: ["ena2m4howtallareyou", "ena2m4onemetreeighty", "ena2m4howheavyisit", "ena2m4itweighstwokilos", "ena2m4halfalitre", "ena2m4itstwentydegrees", "ena2m4howbigisit", "entall"],
        },
        {
          kind: "note",
          note: {
            title: "«How + adjetivo»: una sola fórmula para todas las medidas",
            body: "Para preguntar una medida, el inglés no tiene un verbo por cada cosa como el español («¿cuánto mides?», «¿cuánto pesa?», «¿cuánto cabe?»). Tiene <b>una sola fórmula</b>, y dentro se cambia el adjetivo:<br/><br/><b>How + adjetivo + is/are…?</b><br/><br/>• [[How tall are you?|¿Cuánto mides?]] — altura de personas y edificios<br/>• [[How heavy is it?|¿Cuánto pesa?]] — peso<br/>• [[How big is it?|¿Cómo es de grande?]] — tamaño en general, la comodín<br/>• How long is it? — longitud (y también duración)<br/>• How old is it? — antigüedad, que ya la traes del A1<br/><br/><b>La trampa española es «medir» y «pesar».</b> En español son verbos: «mido uno ochenta», «pesa dos kilos». En inglés el que mide es <b>be</b> y el que pesa es <b>weigh</b>:<br/>• <i>I'm one metre eighty.</i> — nunca <i>I measure…</i><br/>• <i>It weighs two kilos.</i> — nunca <i>It has two kilos.</i><br/><br/>Y ojo a <b>weigh</b>, que se escribe fatal y se dice fácil: «<b>uéi</b>», y con la -s de tercera persona «<b>uéis̬</b>». La gh no suena, igual que en <i>eight</i>.",
            table: [
              ["qué mides", "la pregunta", "la respuesta"],
              ["altura", "How tall are you?", "I'm one metre eighty."],
              ["peso", "How heavy is it?", "It weighs two kilos."],
              ["capacidad", "How big is the bottle?", "It's half a litre."],
              ["temperatura", "What's the temperature?", "It's twenty degrees."],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "Y ahora la parte rara: en Reino Unido conviven dos sistemas",
            body: "Esto no es gramática, es supervivencia. En Reino Unido el sistema métrico es el oficial <b>y aun así</b> la gente usa el viejo para unas cuantas cosas concretas:<br/><br/>• <b>La altura de las personas</b> va en pies y pulgadas: «<i>I'm five foot ten</i>» (1,78 m). Si dices <i>one metre seventy-eight</i> te entienden perfectamente, pero te van a mirar como al del continente.<br/>• <b>El peso de las personas</b> va en <i>stones</i>: «<i>I'm eleven stone</i>» (unos 70 kg).<br/>• <b>Las distancias en carretera</b> van en millas, y los carteles también.<br/>• <b>La leche y la cerveza</b> van en <i>pints</i> (algo más de medio litro).<br/>• Pero <b>la comida del supermercado</b> va en kilos y gramos, y el tiempo en <b>grados centígrados</b>.<br/><br/><b>Qué haces tú con esto:</b> nada, más que reconocerlo. Para el examen te basta con el sistema métrico, que es el que usan las escuchas. Lo de arriba está aquí para que, cuando alguien te diga «<i>I'm six foot two</i>», no te quedes en blanco.",
            table: [
              ["en la calle británica", "en el examen", "para qué"],
              ["five foot ten", "one metre seventy-eight", "altura de personas"],
              ["eleven stone", "seventy kilos", "peso de personas"],
              ["twenty miles", "thirty kilometres", "distancias"],
              ["a pint of milk", "half a litre", "líquidos"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l6e1", type: "match", prompt: "Empareja cada pregunta con lo que mide",
              pairs: [
                { target: "How tall are you?", source: "la altura de una persona" },
                { target: "How heavy is it?", source: "el peso" },
                { target: "How big is it?", source: "el tamaño, en general" },
                { target: "How old is it?", source: "la antigüedad" },
              ],
              itemIds: ["ena2m4howtallareyou", "ena2m4howheavyisit", "ena2m4howbigisit", "enhowold"],
            },
            {
              id: "ena2m4l6e2", type: "mc", prompt: "«¿Cuánto mides?»",
              question: "¿Cómo se pregunta la altura de una persona?",
              options: ["How tall are you?", "How much do you measure?", "How much height have you?"],
              answer: 0,
              whyWrong: [null, "measure existe, pero se usa para medir objetos con una cinta métrica, no para preguntar la estatura de alguien", "Ni have ni height entran aquí: el inglés lo resuelve con how + adjetivo"],
              itemIds: ["ena2m4howtallareyou"],
              tip: "Y la respuesta también va con be: I'm one metre eighty. En inglés no «mides» tu altura, la eres.",
            },
            {
              id: "ena2m4l6e3", type: "cloze", prompt: "Completa la pregunta",
              text: "___ tall is Ben?",
              answers: ["How"],
              translation: "¿Cuánto mide Ben?",
              hints: ["Es la palabra que abre todas las preguntas de medida", "H…"],
              itemIds: ["ena2m4howtallareyou", "entall"],
            },
            {
              id: "ena2m4l6e4", type: "cloze", prompt: "Completa con el verbo del peso",
              text: "The bag ___ two kilos.",
              answers: ["weighs"],
              translation: "La bolsa pesa dos kilos.",
              hints: ["Se dice «uéis̬» y se escribe con -gh en medio", "It w…"],
              itemIds: ["ena2m4itweighstwokilos"],
            },
            {
              id: "ena2m4l6e5", type: "errorfix", prompt: "Corrige el verbo — el «tener» español otra vez",
              wrong: "It has two kilos.",
              answers: ["It weighs two kilos."],
              why: "En español el peso «se tiene» a veces («tiene dos kilos»), pero en inglés el peso se PESA: weigh. Es la misma familia de errores que «I have 25 years» en lugar de «I'm 25»: el have español metiéndose donde no lo llaman.",
              translation: "Pesa dos kilos.",
              itemIds: ["ena2m4itweighstwokilos"],
            },
            {
              id: "ena2m4l6e6", type: "errorfix", prompt: "Corrige la temperatura",
              wrong: "There are twenty degrees today.",
              answers: ["It's twenty degrees today."],
              why: "El español dice «hay veinte grados» o «hace veinte grados», y de ahí sale el there are. El inglés usa el it del tiempo, el mismo de It's raining y de It's cold, que traes del A1: It's twenty degrees.",
              translation: "Hoy hace veinte grados.",
              itemIds: ["ena2m4itstwentydegrees", "enitscold", "entwenty"],
            },
            {
              id: "ena2m4l6e7", type: "bucket", prompt: "¿Esta medida es de tamaño o de peso y capacidad?",
              categories: ["altura, largo, tamaño", "peso y capacidad"],
              items: [
                { text: "one metre eighty", bucket: 0 },
                { text: "two kilos", bucket: 1 },
                { text: "half a litre", bucket: 1 },
                { text: "twenty centimetres", bucket: 0 },
                { text: "five hundred grams", bucket: 1 },
                { text: "six foot two", bucket: 0 },
              ],
              itemIds: ["ena2m4onemetreeighty", "ena2m4itweighstwokilos", "ena2m4halfalitre"],
              tip: "«six foot two» es la altura de una persona a la británica: seis pies y dos pulgadas, o sea 1,88 m. Fíjate en que foot va en singular ahí, aunque sean seis.",
            },
            {
              id: "ena2m4l6e8", type: "audiomc", prompt: "Cazar la medida — 2 escuchas",
              audio: "The blue bag is bigger, but it weighs three kilos. The black one is smaller and it only weighs one kilo, so I took the black one.",
              question: "¿Cuánto pesa la bolsa que se llevó?",
              options: ["Un kilo", "Tres kilos", "Dos kilos"],
              answer: 0,
              plays: 2,
              whyWrong: [null, "Tres kilos es la azul, la que NO se llevó", "Dos kilos no sale en el audio"],
              itemIds: ["ena2m4itweighstwokilos", "ena2m4biggerthanmine", "ena2m2hetookthetrain"],
              tip: "El audio te da dos datos y una decisión al final. Esa estructura —dos opciones y una elegida— es la del Listening del A2 casi siempre: escucha hasta el final antes de marcar.",
            },
            {
              id: "ena2m4l6e9", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "¿Cuánto pesa? Pesa dos kilos.",
              answers: [
                "How heavy is it? It weighs two kilos.",
                "How much does it weigh? It weighs two kilos.",
              ],
              hint: "la pregunta empieza por How",
              itemIds: ["ena2m4howheavyisit", "ena2m4itweighstwokilos"],
            },
            {
              id: "ena2m4l6e10", type: "listen", prompt: "Dictado — una medida y una temperatura",
              text: "It's half a litre and it's four degrees.",
              translation: "Es medio litro y está a cuatro grados.",
              hints: ["half se dice «jaaf»: la l no suena", "It's h… a l… and it's four d…"],
              itemIds: ["ena2m4halfalitre", "ena2m4itstwentydegrees"],
            },
            {
              id: "ena2m4l6e11", type: "speak", prompt: "Dilo en voz alta — la medida y la comparación juntas",
              text: "I'm one metre eighty, and my sister is taller than me.",
              phonetic: "áim uan MÍI-ta ÉI-ti, and mái SÍS-ta is̬ TÓO-la dan mii",
              translation: "Mido uno ochenta, y mi hermana es más alta que yo.",
              itemIds: ["ena2m4onemetreeighty", "ena2m4olderthanme", "entall", "ensister"],
              tip: "taller también lleva la -er floja: TÓO-la, no «tó-ler». Y fíjate en que la medida va con am y la comparación con is: dos veces el verbo be y ni un measure.",
            },
            {
              id: "ena2m4l6e12", type: "type", prompt: "Cierre de producción",
              question: "¿Cuánto pesa? Pesa dos kilos y es más pequeño que el otro.",
              answers: [
                "How heavy is it? It weighs two kilos and it's smaller than the other one.",
                "How much does it weigh? It weighs two kilos and it's smaller than the other one.",
                "How heavy is it? It weighs two kilos, and it's smaller than the other one.",
              ],
              hints: ["Pregunta de medida + peso con weigh + comparación con -er y than", "How h… is it? It w… two kilos and it's sm… th… the other one."],
              itemIds: ["ena2m4howheavyisit", "ena2m4itweighstwokilos", "ena2m4cheaperthan"],
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m4-4",
            book: "It's very big.",
            real: "It's massive.",
            meaning: "Es enorme",
            when: "Con amigos, para cualquier cosa grande de verdad: un piso, una maleta, una cola. Es de las palabras más usadas del inglés británico coloquial. En el examen escrito, very big o really big.",
            register: "amigos",
            note: "La familia entera funciona igual: massive (enorme), tiny (diminuto), freezing (helado), boiling (achicharrante). Son adjetivos que ya llevan el «muy» dentro, así que no admiten very delante.",
            sound: "its MA-siv",
            level: "a2",
            itemId: "ena2m4howbigisit",
          },
        },
      ],
      resources: [
        { label: "BBC Bitesize — Metric and imperial units", url: "https://www.bbc.co.uk/bitesize/topics/zwbtrmn", note: "Está pensado para escolares británicos, y por eso es perfecto: te enseña las dos escalas con las que ellos crecen y las equivalencias que usan de verdad." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L7 — los determinantes: more, most, enough, no, none, all
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l7",
      phaseId: "ena2m4",
      title: "More, most, enough, none",
      subtitle: "Comparar cantidades: las palabritas que van delante del sustantivo",
      minutes: 10,
      sections: [
        {
          kind: "phrases",
          title: "Cuánto hay, y cuánto falta",
          itemIds: ["ena2m4weneedmoretime", "ena2m4mostpeople", "ena2m4enoughroom", "ena2m4nomilkleft", "ena2m4noneofthem", "ena2m4allofthem", "ena2m4morethantenpounds", "enmilk"],
        },
        {
          kind: "note",
          note: {
            title: "Los mismos more y most, pero delante de un sustantivo",
            body: "Hasta ahora <i>more</i> y <i>most</i> te han servido para comparar <b>adjetivos</b> (more expensive, the most expensive). Las mismas dos palabras sirven, solas, para comparar <b>cantidades</b>:<br/><br/>• <b>more + sustantivo</b> = más de algo: [[We need more time.|Nos hace falta más tiempo.]] · more money · more chairs.<br/>• <b>most + sustantivo</b> = la mayoría: [[Most people take the bus.|La mayoría de la gente coge el autobús.]]<br/><br/><b>Y aquí está la trampa gorda de esta lección:</b> el español dice «<b>la</b> mayoría <b>de</b> la gente», con artículo y con «de». El inglés, cuando habla en general, no pone ni una cosa ni la otra: <b>Most people</b>, a secas. <i>The most people</i> está mal.<br/><br/>Ahora bien, si hablas de un <b>grupo concreto</b>, sí aparece el <i>of</i>: <i>Most <b>of</b> my friends take the bus</i>, <i>most <b>of</b> the students</i>. La regla es fácil de recordar así: <b>en general, most a secas; de un grupo con nombre y apellidos, most of.</b><br/><br/>Y la otra que el español calca: «más <b>de</b> diez libras» no es <i>more of ten pounds</i>. Con números es <b>more than</b>: [[more than ten pounds|más de diez libras]]. Es el mismo <i>than</i> de comparar, otra vez.",
            table: [
              ["español", "inglés", "lo que sale mal"],
              ["más tiempo", "more time", "more of time"],
              ["la mayoría de la gente", "most people", "the most people"],
              ["la mayoría de mis amigos", "most of my friends", "most my friends"],
              ["más de diez libras", "more than ten pounds", "more of ten pounds"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "enough, no, none y all: dónde se colocan",
            body: "<b>enough</b> = suficiente, bastante. Se coloca <b>delante del sustantivo</b>: [[There isn't enough room.|No hay sitio suficiente.]] · <i>enough time</i>, <i>enough money</i>, <i>enough chairs</i>. (Detrás de un adjetivo también existe —<i>big enough</i>—, y esa es la frontera de mañana.)<br/><br/><b>no</b> y <b>none</b> son la misma idea repartida en dos sitios:<br/>• <b>no + sustantivo</b>: <i>There's <b>no</b> milk.</i> — hay sustantivo detrás.<br/>• <b>none</b>, solo o con <i>of</i>: <i>How many are left? <b>None</b>.</i> · <i><b>None of</b> them can come.</i> — no hay sustantivo detrás.<br/><br/>El error español es decir <i>No of them</i>, porque en español «ninguno» es una sola palabra para las dos posiciones. En inglés, si detrás no hay sustantivo, <b>none</b>.<br/><br/><b>all</b> = todo, todos. En general va a pelo (<i>All the chairs are old</i>, <i>all day</i>) y con un grupo concreto lleva <i>of</i>: <i>all of them</i>, <i>all of my friends</i>. Igual que most.<br/><br/>Y un aviso que te ahorra el módulo siguiente: <b>much</b> y <b>many</b> viven en esta misma familia, pero necesitan saber si el sustantivo se puede contar o no. Eso es <i>ena2m5</i> entero. Aquí quédate con estos seis.",
            table: [
              ["palabra", "qué lleva detrás", "ejemplo"],
              ["more", "sustantivo, a pelo", "more time"],
              ["most", "sustantivo (general) / of + grupo", "most people · most of them"],
              ["enough", "sustantivo, a pelo", "enough room"],
              ["no", "sustantivo, a pelo", "no milk"],
              ["none", "nada, o of + grupo", "None. · none of them"],
              ["all", "sustantivo / of + grupo", "all day · all of them"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l7e1", type: "mc", prompt: "«Nos hace falta más tiempo»",
              question: "¿Cuál es la frase correcta?",
              options: ["We need more time.", "We need more of time.", "We need the more time."],
              answer: 0,
              whyWrong: [null, "El «de» del español no se traduce aquí: more va pegado al sustantivo", "more no lleva artículo delante cuando compara cantidades"],
              itemIds: ["ena2m4weneedmoretime"],
            },
            {
              id: "ena2m4l7e2", type: "mc", prompt: "«La mayoría de la gente»",
              question: "Hablando en general, «la mayoría de la gente coge el autobús» es…",
              options: ["Most people take the bus.", "The most people take the bus.", "The most of people take the bus."],
              answer: 0,
              whyWrong: [null, "Ese the sale del «la» español, y en inglés sobra cuando se habla en general", "Sobran el artículo y el of a la vez"],
              itemIds: ["ena2m4mostpeople", "ena2m1therewere"],
              tip: "Con of solo cuando el grupo está identificado: most of my friends, most of the students. Si no, most a secas.",
            },
            {
              id: "ena2m4l7e3", type: "cloze", prompt: "Completa con la palabra de «suficiente»",
              text: "The kitchen is small: there isn't ___ room for a big table.",
              answers: ["enough"],
              translation: "La cocina es pequeña: no hay sitio suficiente para una mesa grande.",
              hints: ["Va delante del sustantivo", "e…"],
              itemIds: ["ena2m4enoughroom", "enkitchen", "entable"],
            },
            {
              id: "ena2m4l7e4", type: "cloze", prompt: "Completa la generalización",
              text: "___ people in London take the tube to work.",
              answers: ["Most"],
              translation: "La mayoría de la gente en Londres va al trabajo en metro.",
              hints: ["Sin artículo delante y sin of detrás", "M…"],
              itemIds: ["ena2m4mostpeople", "entube", "enlondon"],
            },
            {
              id: "ena2m4l7e5", type: "errorfix", prompt: "Corrige el artículo que el español añade",
              wrong: "The most people take the bus.",
              answers: ["Most people take the bus."],
              why: "En español «la mayoría» lleva artículo y en inglés no, cuando se habla en general. «The most people» solo tendría sentido en una comparación rarísima («el sitio con MÁS gente»), y no es lo que quieres decir.",
              translation: "La mayoría de la gente coge el autobús.",
              itemIds: ["ena2m4mostpeople"],
            },
            {
              id: "ena2m4l7e6", type: "errorfix", prompt: "Corrige el «de» de las cantidades",
              wrong: "It costs more of ten pounds.",
              answers: ["It costs more than ten pounds."],
              why: "«Más de diez» es una comparación con un número, y en inglés las comparaciones se hacen con THAN, siempre. El of del español aquí no tiene traducción: more than ten, less than five, over twenty.",
              translation: "Cuesta más de diez libras.",
              itemIds: ["ena2m4morethantenpounds", "ena2m4than", "enpound"],
              tip: "Y fíjate en que es el mismo than de «cheaper than». Una sola palabra para todas las comparaciones: de adjetivos y de números.",
            },
            {
              id: "ena2m4l7e7", type: "gapbank", prompt: "La cocina de Valeria — elige del banco",
              text: "Our kitchen is small: there isn't ___ room for a big table. We need two ___ chairs for Sunday, but ___ of my friends can come, so two is enough. ___ the chairs in this flat are old.",
              answers: ["enough", "more", "none", "All"],
              bank: ["enough", "more", "none", "All", "most", "no"],
              translation: "Nuestra cocina es pequeña: no hay sitio suficiente para una mesa grande. Necesitamos dos sillas más para el domingo, pero no puede venir ninguno de mis amigos, así que con dos basta. Todas las sillas de este piso son viejas.",
              itemIds: ["ena2m4enoughroom", "ena2m4weneedmoretime", "ena2m4noneofthem", "ena2m4allofthem", "enkitchen", "enchair"],
              tip: "Fíjate en el segundo hueco: «two more chairs», el more detrás del número. Es el orden inglés y no se puede cambiar.",
            },
            {
              id: "ena2m4l7e8", type: "bucket", prompt: "¿Aquí va «no» o va «none»?",
              categories: ["no + sustantivo", "none (sin sustantivo detrás)"],
              items: [
                { text: "There's ___ milk in the fridge.", bucket: 0 },
                { text: "How many are left? ___.", bucket: 1 },
                { text: "I have ___ money.", bucket: 0 },
                { text: "___ of them can come.", bucket: 1 },
                { text: "There's ___ room for a table.", bucket: 0 },
                { text: "I wanted three, but there were ___.", bucket: 1 },
              ],
              itemIds: ["ena2m4nomilkleft", "ena2m4noneofthem", "enmilk", "enfridge"],
              tip: "Mira solo lo que hay DETRÁS del hueco: si hay un sustantivo, no. Si no hay nada o hay «of», none. No falla.",
            },
            {
              id: "ena2m4l7e9", type: "mc", prompt: "Dónde se coloca enough",
              question: "¿Cuál de estas dos es la de esta lección?",
              options: ["There isn't enough room.", "There isn't room enough."],
              answer: 0,
              whyWrong: [null, "Se entiende, pero suena a poesía antigua: delante del sustantivo, enough va primero"],
              itemIds: ["ena2m4enoughroom"],
              tip: "Delante de sustantivo, enough va antes: enough room, enough time. Detrás de adjetivo va después: big enough. Mañana lo vemos entero.",
            },
            {
              id: "ena2m4l7e10", type: "translate", prompt: "Traduce al español",
              direction: "toEs",
              source: "There's no milk left, and none of the shops are open.",
              answers: [
                "No queda leche, y no hay ninguna tienda abierta.",
                "No queda leche, y ninguna de las tiendas está abierta.",
              ],
              itemIds: ["ena2m4nomilkleft", "ena2m4noneofthem", "enmilk", "enopen"],
              tip: "Fíjate en que el inglés niega UNA sola vez por frase: «no milk» y «none of the shops». En español encadenamos «no… ninguna» sin problema; en inglés eso serían dos negaciones y no cabe.",
            },
            {
              id: "ena2m4l7e11", type: "speak", prompt: "Dilo en voz alta",
              text: "We need more chairs, but there isn't enough room.",
              phonetic: "ui niid moo CHÉAS̬, bat déar is̬nt i-NAF RUUM",
              translation: "Necesitamos más sillas, pero no hay sitio suficiente.",
              itemIds: ["ena2m4weneedmoretime", "ena2m4enoughroom", "enchair", "enroom"],
              tip: "enough se dice «i-NAF», con el golpe en la segunda y una f al final. La escritura de esta palabra es de las peores del inglés; el sonido, de los fáciles.",
            },
            {
              id: "ena2m4l7e12", type: "type", prompt: "Cierre de producción",
              question: "La mayoría de las tiendas cuestan más de veinte libras, pero esta no.",
              answers: [
                "Most shops cost more than twenty pounds, but this one doesn't.",
                "Most of the shops cost more than twenty pounds, but this one doesn't.",
                "Most shops cost more than twenty pounds, but this one doesn't cost that.",
              ],
              hints: ["Most sin artículo + more than con el número", "M… shops cost m… th… twenty pounds, but this one doesn't."],
              itemIds: ["ena2m4mostpeople", "ena2m4morethantenpounds", "enshop", "entwenty", "enpound"],
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — Quantifiers", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/quantifiers", note: "Lee solo el bloque de all, most, none y enough. Lo de much y many déjalo: es el módulo siguiente y se entiende mucho mejor con el contable/incontable delante." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L8 — FRONTERA: as…as · too / enough
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l8",
      phaseId: "ena2m4",
      title: "As cheap as, too small",
      subtitle: "Frontera: decir que dos cosas son iguales, y que algo se pasa o no llega",
      minutes: 9,
      sections: [
        {
          kind: "phrases",
          title: "Igual, de más y de menos",
          itemIds: ["ena2m4ascheapas", "ena2m4thesameasmine", "ena2m4tooshoessmall", "ena2m4bigenough", "entooexpensive", "enshoes"],
        },
        {
          kind: "note",
          note: {
            title: "Esta lección se PRESENTA — no se examina",
            body: "Antes de empezar, una cosa importante para tu tranquilidad: <b>lo de hoy no entra en lo que se te va a exigir producir</b>. Es lección de <b>frontera</b>. Con el comparativo y el superlativo de las lecciones 1 a 4 tienes cubierto el A2 entero, y la Parte 3 del oral se aprueba sin nada de esto.<br/><br/>¿Y por qué está aquí, entonces? Por dos razones muy prácticas:<br/>1. <b>Lo vas a oír</b>. «Not as good as», «too expensive» y «big enough» salen constantemente en las escuchas del examen, y entender no cuesta lo mismo que producir.<br/>2. <b>Cuando lo necesites, ya lo habrás visto</b>. Te lo vas a encontrar otra vez en el B1, y llegar con la cara ya conocida vale mucho.<br/><br/>Así que hoy: reconocer, entender y, si te sale, usar. Sin agobios.",
          },
        },
        {
          kind: "note",
          note: {
            title: "as … as: decir que dos cosas van igualadas",
            body: "El comparativo dice que una gana. <b>as … as</b> dice que van empatadas, o que no llegan:<br/><br/>• <b>as + adjetivo + as</b> = tan… como: <i>This shop is <b>as cheap as</b> the market.</i><br/>• <b>not as + adjetivo + as</b> = no tan… como: [[It isn't as cheap as the market.|No es tan barato como el mercado.]]<br/><br/>Ojo a las dos palabras del español que se cuelan aquí:<br/>• «tan» tienta a poner <i>so</i>. <b>No.</b> En la comparación va <i>as</i>: <i>so cheap as</i> está mal.<br/>• «como» tienta a poner <i>like</i>. <b>Tampoco.</b> Va el segundo <i>as</i>: <i>as cheap like</i> está mal.<br/><br/>Y muy cerca vive una fórmula que te va a servir muchísimo en la Parte 3 para las <b>semejanzas</b>: <b>the same as</b> = igual que. [[It's the same as mine.|Es igual que el mío.]] Aquí el «que» tampoco es <i>than</i> ni <i>that</i>: es <b>as</b>.<br/><br/>Fíjate en que «not as cheap as» y «more expensive than» dicen lo mismo con otra cara. Poder decirlo de dos maneras es exactamente lo que se premia en el oral.",
            table: [
              ["español", "inglés", "lo que sale mal"],
              ["tan barato como", "as cheap as", "so cheap like"],
              ["no tan bueno como", "not as good as", "not so good like"],
              ["igual que el mío", "the same as mine", "the same that mine"],
            ],
          },
        },
        {
          kind: "note",
          note: {
            title: "too y enough: se pasa, o no llega",
            body: "Dos palabras que parecen inocentes y que el español mezcla sin parar.<br/><br/><b>too = demasiado, Y es un problema.</b> No es «muy». <i>These shoes are <b>too small</b></i> quiere decir que no te valen. <i>These shoes are very small</i> solo dice que son pequeñas, sin queja. Del A1 ya traes <i>too expensive</i>: cuando lo dices en una tienda, estás diciendo que no lo compras.<br/><br/><b>enough = lo suficiente, Y llega justo.</b> Con adjetivos va <b>DETRÁS</b>: [[It isn't big enough.|No es lo bastante grande.]] Con sustantivos va delante, como viste ayer: <i>enough room</i>.<br/><br/>Los dos errores del español:<br/>• <i>too much small</i> — «demasiado» se traduce por <b>too</b> a secas cuando va con adjetivo. El <i>much</i> sobra.<br/>• <i>enough big</i> — con adjetivo, enough va detrás. Es la única palabra del inglés que se coloca así, y por eso se falla.<br/><br/>Y hay un truco de examen: <b>too small</b> y <b>not big enough</b> significan exactamente lo mismo. Si en el oral no te sale una, di la otra.",
            table: [
              ["idea", "con adjetivo", "con sustantivo"],
              ["demasiado", "too small (delante)", "too much / too many (m5)"],
              ["suficiente", "big enough (DETRÁS)", "enough room (delante)"],
              ["lo mismo, dicho al revés", "too small = not big enough", "—"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l8e1", type: "mc", prompt: "«Tan barato como»",
              question: "«No es tan barato como el mercado» es…",
              options: ["It isn't as cheap as the market.", "It isn't so cheap like the market.", "It isn't as cheap like the market."],
              answer: 0,
              whyWrong: [null, "«tan» no es so aquí y «como» no es like: los dos son as", "El primer as está bien; el segundo también tiene que ser as"],
              itemIds: ["ena2m4ascheapas"],
            },
            {
              id: "ena2m4l8e2", type: "cloze", prompt: "Completa la comparación de igualdad",
              text: "This shop isn't ___ cheap as the street market.",
              answers: ["as"],
              translation: "Esta tienda no es tan barata como el mercadillo.",
              hints: ["La misma palabra que ya está al otro lado del adjetivo", "a…"],
              itemIds: ["ena2m4ascheapas", "enshop", "ena2m1streetmarket"],
            },
            {
              id: "ena2m4l8e3", type: "cloze", prompt: "Completa con la palabra de «lo bastante»",
              text: "This room isn't big ___ for two beds.",
              answers: ["enough"],
              translation: "Esta habitación no es lo bastante grande para dos camas.",
              hints: ["Va DETRÁS del adjetivo, no delante", "big e…"],
              itemIds: ["ena2m4bigenough", "enroom", "enbed"],
            },
            {
              id: "ena2m4l8e4", type: "errorfix", prompt: "Corrige el «tan… como»",
              wrong: "It isn't so cheap like the market.",
              answers: ["It isn't as cheap as the market."],
              why: "El español pone dos palabras distintas («tan» y «como») y el inglés pone la misma dos veces: as … as. So y like existen, pero en otras frases: «so cheap!» es una exclamación y «like the market» es «parecido al mercado».",
              translation: "No es tan barato como el mercado.",
              itemIds: ["ena2m4ascheapas"],
            },
            {
              id: "ena2m4l8e5", type: "errorfix", prompt: "Corrige la colocación de enough",
              wrong: "It isn't enough big.",
              answers: ["It isn't big enough."],
              why: "enough es la única palabra del inglés que se pone DETRÁS del adjetivo: big enough, cheap enough, good enough. Delante solo va cuando lo que sigue es un sustantivo (enough room).",
              translation: "No es lo bastante grande.",
              itemIds: ["ena2m4bigenough", "ena2m4enoughroom"],
              tip: "Este error no es de conocimiento, es de reflejo: el español pone «suficientemente» delante y la mano copia el orden. Se cura diciendo la frase en voz alta tres veces.",
            },
            {
              id: "ena2m4l8e6", type: "mc", prompt: "too no es «muy»",
              question: "En una tienda dices «These shoes are too small». ¿Qué estás diciendo?",
              options: ["Que no te valen", "Que son pequeñas y bonitas", "Que son la talla que buscabas"],
              answer: 0,
              whyWrong: [null, "Eso sería «They're very small» o «They're small and nice»: too siempre trae queja", "Si te valieran dirías «They're the right size» o «They fit»"],
              itemIds: ["ena2m4tooshoessmall", "entooexpensive", "enshoes"],
              tip: "too = hay un problema. Por eso «too expensive» en una tienda es la forma educada de decir que no te lo llevas.",
            },
            {
              id: "ena2m4l8e7", type: "bucket", prompt: "¿Esta frase dice que se pasa, o que no llega?",
              categories: ["se pasa (too)", "no llega (not … enough)"],
              items: [
                { text: "These shoes are too small.", bucket: 0 },
                { text: "This room isn't big enough.", bucket: 1 },
                { text: "It's too expensive for me.", bucket: 0 },
                { text: "The coffee isn't hot enough.", bucket: 1 },
                { text: "It's too far from the station.", bucket: 0 },
                { text: "I don't have enough time.", bucket: 1 },
              ],
              itemIds: ["ena2m4tooshoessmall", "ena2m4bigenough", "entooexpensive", "ena2m4further"],
              tip: "Las dos columnas dicen lo mismo con la cara al revés: «too small» y «not big enough» son la misma queja.",
            },
            {
              id: "ena2m4l8e8", type: "match", prompt: "Empareja cada frase con la que significa lo mismo",
              pairs: [
                { target: "It's too small.", source: "It isn't big enough." },
                { target: "It's too expensive.", source: "It isn't cheap enough." },
                { target: "It isn't as cheap as the market.", source: "The market is cheaper." },
                { target: "It's the same as mine.", source: "It isn't different from mine." },
              ],
              itemIds: ["ena2m4tooshoessmall", "ena2m4bigenough", "ena2m4ascheapas", "ena2m4thesameasmine"],
              tip: "Poder decir lo mismo de dos maneras es media Parte 3. Cuando se te atasque una fórmula, tira de la otra y no pares.",
            },
            {
              id: "ena2m4l8e9", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Es igual que el mío, pero es demasiado caro.",
              answers: [
                "It's the same as mine, but it's too expensive.",
                "It's the same as mine but it's too expensive.",
              ],
              hint: "«igual que» lleva as",
              itemIds: ["ena2m4thesameasmine", "entooexpensive"],
            },
            {
              id: "ena2m4l8e10", type: "speak", prompt: "Dilo en voz alta — las dos fórmulas seguidas",
              text: "It isn't as cheap as the market, and it isn't big enough.",
              phonetic: "it is̬nt as̬ CHÍIP as̬ de MAA-kit, and it is̬nt big i-NAF",
              translation: "No es tan barato como el mercado, y no es lo bastante grande.",
              itemIds: ["ena2m4ascheapas", "ena2m4bigenough"],
              tip: "Los dos «as» son átonos: suenan «as̬» flojito, igual que el than. Solo pesa el adjetivo del medio.",
            },
            {
              id: "ena2m4l8e11", type: "type", prompt: "Cierre de producción",
              question: "Estos zapatos me quedan pequeños y no son tan cómodos como los otros.",
              answers: [
                "These shoes are too small and they aren't as comfortable as the other ones.",
                "These shoes are too small, and they aren't as comfortable as the other ones.",
                "These shoes are too small and they aren't as comfortable as the others.",
              ],
              hints: ["too + adjetivo, y después as … as", "These shoes are t… small and they aren't a… comfortable a… the other ones."],
              itemIds: ["ena2m4tooshoessmall", "ena2m4ascheapas", "ena2m4morecomfortable", "enshoes"],
              tip: "Y con esto cierras la frontera. Si te ha salido, perfecto; si no, tranquilo: nada de esta lección se te va a exigir en el examen de A2.",
            },
          ],
        },
      ],
      resources: [
        { label: "British Council — as … as", url: "https://learnenglish.britishcouncil.org/grammar/english-grammar-reference/comparative-superlative-adjectives", note: "Busca el apartado de «as … as» al final de la página. Léelo una vez, sin hacer los ejercicios: hoy solo hace falta reconocerlo." },
      ],
    },

    // ────────────────────────────────────────────────────────────────────
    // L9 — la Parte 3 del oral: comparar dos imágenes
    // ────────────────────────────────────────────────────────────────────
    {
      id: "ena2m4l9",
      phaseId: "ena2m4",
      title: "Two pictures, one minute",
      subtitle: "La Parte 3 del oral, montada de principio a fin con lo de este módulo",
      minutes: 13,
      sections: [
        {
          kind: "phrases",
          title: "Las fórmulas que abren y cierran la Parte 3",
          itemIds: ["ena2m4inbothpictures", "ena2m4inthefirstpicture", "ena2m4theyreverysimilar", "ena2m4iprefertheseconone", "ena2m4thedifferenceisthat", "ena2m1howaboutyou"],
        },
        {
          kind: "note",
          note: {
            title: "La Parte 3 no se improvisa: son cuatro bloques y siempre los mismos",
            body: "En el oral del A2 te ponen <b>dos imágenes</b> —dos tiendas, dos habitaciones, dos formas de ir al trabajo— y te piden que hables de <b>semejanzas y diferencias</b>. Suele durar poco más de un minuto, y el examinador no espera un discurso: espera <b>estructura</b>.<br/><br/>La estructura son cuatro bloques, en este orden:<br/><br/><b>1. Lo que se ve en las dos.</b> Empieza por lo que comparten, que además te da tiempo para pensar. <i>In both pictures I can see a shop. They're very similar.</i><br/><b>2. Las diferencias.</b> Aquí van los comparativos, que es lo que se puntúa. <i>The first one is bigger than the second one, but the second one is cheaper.</i><br/><b>3. Tu preferencia.</b> <i>I prefer the second one.</i><br/><b>4. La razón.</b> Nunca la dejes fuera: el descriptor del A2 pide opiniones <b>con razón</b>. <i>…because it's cheaper and it isn't as busy.</i><br/><br/>Dos avisos de examinador:<br/>• <b>No describas cada foto por separado y en orden.</b> Eso es la Parte 2. Aquí hay que <b>cruzar</b> las dos, y el cruce se hace con <i>than</i>, con <i>both</i> y con <i>but</i>.<br/>• <b>Si no sabes cómo se llama algo, no te calles.</b> Compáralo igual: <i>the thing in the first picture is bigger</i>. Se puntúa el idioma que produces, no tu vocabulario de objetos.",
            table: [
              ["bloque", "fórmula", "qué demuestras"],
              ["1. semejanzas", "In both pictures… They're very similar.", "que has entendido la tarea"],
              ["2. diferencias", "The first one is bigger than…", "comparativos (lo que puntúa)"],
              ["3. preferencia", "I prefer the second one.", "opinión"],
              ["4. razón", "…because it's cheaper.", "opinión CON razón: el descriptor A2"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "ena2m4l9e1", type: "fastmatch", prompt: "Ráfaga de cierre — esto ya es tuyo",
              pairs: [
                { target: "cheaper than", source: "más barato que" },
                { target: "the most expensive", source: "el más caro" },
                { target: "better", source: "mejor" },
                { target: "the worst", source: "el peor" },
                { target: "much bigger", source: "mucho más grande" },
              ],
              targetSeconds: 30,
              itemIds: ["ena2m4cheaperthan", "ena2m4themostexpensive", "ena2m4goodbetterbest", "ena2m4theworstday", "ena2m4muchcheaper"],
              tip: "Cinco fórmulas, y con ellas se contesta cualquier Parte 3. La velocidad importa: en el examen no hay tiempo de reconstruirlas.",
            },
            {
              id: "ena2m4l9e2", type: "order", prompt: "Ordena la respuesta de la Parte 3",
              sentences: [
                "In both pictures I can see a kitchen, so they're very similar.",
                "But the first kitchen is much bigger than the second one.",
                "The second one is smaller, and it hasn't got enough room for a table.",
                "I prefer the first one because it's the biggest and it has a window.",
              ],
              translation: "En las dos fotos veo una cocina, así que se parecen mucho. Pero la primera cocina es mucho más grande que la segunda. La segunda es más pequeña y no tiene sitio suficiente para una mesa. Prefiero la primera porque es la más grande y tiene ventana.",
              itemIds: ["ena2m4inbothpictures", "ena2m4theyreverysimilar", "ena2m4muchcheaper", "ena2m4enoughroom", "ena2m4iprefertheseconone", "enkitchen", "enwindow"],
              tip: "Semejanza, diferencia, detalle, preferencia con razón. Los cuatro bloques, en ese orden. Apréndete el orden y ya solo tienes que rellenarlo.",
            },
            {
              id: "ena2m4l9e3", type: "mc", prompt: "Cómo se empieza",
              question: "Te ponen dos fotos y te piden compararlas. ¿Cuál es la mejor primera frase?",
              options: [
                "In both pictures I can see a shop.",
                "In the first picture there is a shop. It is red. It has a door.",
                "I like the first picture.",
              ],
              answer: 0,
              whyWrong: [
                null,
                "Eso es describir una foto (Parte 2). Aquí te piden cruzar las dos desde el principio",
                "La preferencia va al final, y sin razón no puntúa como opinión de A2",
              ],
              itemIds: ["ena2m4inbothpictures"],
              tip: "Empezar por lo que comparten tiene dos ventajas: demuestra que has entendido la tarea y te regala cinco segundos para pensar la diferencia.",
            },
            {
              id: "ena2m4l9e4", type: "cloze", prompt: "Completa la fórmula de la semejanza",
              text: "In ___ pictures I can see a kitchen.",
              answers: ["both"],
              translation: "En las dos fotos veo una cocina.",
              hints: ["Es la palabra inglesa para «las dos», y no lleva the delante", "b…"],
              itemIds: ["ena2m4inbothpictures", "enkitchen"],
            },
            {
              id: "ena2m4l9e5", type: "bucket", prompt: "¿Esta frase dice una semejanza o una diferencia?",
              categories: ["semejanza", "diferencia"],
              items: [
                { text: "They're very similar.", bucket: 0 },
                { text: "The first one is bigger than the second one.", bucket: 1 },
                { text: "In both pictures I can see a shop.", bucket: 0 },
                { text: "It's the same as the other one.", bucket: 0 },
                { text: "The second one is much cheaper.", bucket: 1 },
                { text: "The difference is that this one has a garden.", bucket: 1 },
              ],
              itemIds: ["ena2m4theyreverysimilar", "ena2m4inbothpictures", "ena2m4thesameasmine", "ena2m4thedifferenceisthat", "engarden"],
              tip: "El examinador pide las dos cosas. Si solo dices diferencias, has hecho media tarea aunque el inglés sea impecable.",
            },
            {
              id: "ena2m4l9e6", type: "errorfix", prompt: "Espiral — corrige el doble comparativo",
              wrong: "The first shop is more cheaper than the second one.",
              answers: ["The first shop is cheaper than the second one."],
              why: "cheaper ya lleva el «más» dentro. En la Parte 3 este error sale mucho porque hablas rápido y traduces «más barato» pieza a pieza. Elige una marca: -er o more, nunca las dos.",
              translation: "La primera tienda es más barata que la segunda.",
              itemIds: ["ena2m4cheaperthan", "ena2m4inthefirstpicture"],
            },
            {
              id: "ena2m4l9e7", type: "errorfix", prompt: "Espiral — corrige el «que» y verás que aquí SÍ era that",
              wrong: "The difference is than this one is bigger.",
              answers: ["The difference is that this one is bigger."],
              why: "Aquí no hay comparación entre «difference» y nada: lo que viene detrás es una subordinada, y las subordinadas van con THAT. El than se guarda para cuando hay un comparativo justo delante (bigger than, better than). Fíjate en que en la misma frase conviven las dos: «is THAT this one is BIGGER».",
              translation: "La diferencia es que este es más grande.",
              itemIds: ["ena2m4thedifferenceisthat", "ena2m4than"],
              tip: "Esta frase es el mejor resumen del módulo: lleva un that de subordinada y un comparativo, y demuestra que ya sabes cuál va dónde.",
            },
            {
              id: "ena2m4l9e8", type: "translate", prompt: "Traduce al inglés",
              direction: "toTarget",
              source: "Prefiero la segunda porque es más barata y no está tan llena.",
              answers: [
                "I prefer the second one because it's cheaper and it isn't as busy.",
                "I prefer the second one because it's cheaper and it isn't so busy.",
              ],
              hint: "empieza por el verbo de la preferencia",
              itemIds: ["ena2m4iprefertheseconone", "ena2m4ascheapas", "enbusy"],
              tip: "«I prefer», no «I prefer more»: prefer ya lleva la comparación dentro, como better.",
            },
            {
              id: "ena2m4l9e9", type: "paraphrase", prompt: "Dilo de otra manera — sin las palabras prohibidas",
              source: "It's cheaper than the other one.",
              forbid: ["cheaper", "than"],
              answers: [
                "The other one is more expensive.",
                "It isn't as expensive as the other one.",
              ],
              translation: "Es más barato que el otro.",
              itemIds: ["ena2m4moreexpensive", "ena2m4ascheapas"],
              tip: "En el oral, cuando una palabra no te sale, dale la vuelta a la frase. Un examinador valora más el rodeo que el silencio.",
            },
            {
              id: "ena2m4l9e10", type: "write", prompt: "Escribe la comparación — 30-50 palabras",
              scenario: "Emma, tu amiga de Manchester, te pregunta por email cuál de los dos pisos que has visto vas a coger. Contéstale comparándolos.",
              bullets: [
                "Compara los dos pisos con una frase con than",
                "Di cuál es el máximo de algo, con un superlativo (the … est / the most …)",
                "Di cuál prefieres",
              ],
              checks: [
                { re: "\\b\\w+er than\\b|\\bmore \\w+ than\\b", label: "una comparación con than" },
                { re: "\\bthe (\\w+est|most \\w+)\\b", label: "un superlativo con the" },
                { re: "\\bi prefer\\b|\\bi'd prefer\\b|\\bi like .{0,20}better\\b", label: "cuál prefieres" },
              ],
              minWords: 30,
              maxWords: 50,
              register: "direct",
              requireConnectors: { min: 2, bank: ["but", "because", "and", "so"] },
              model: "Hi Emma! I saw two flats yesterday. The one in Church Street is bigger than the other one, but it's the most expensive flat in the street. The second one is smaller and much cheaper. I prefer the second one because it's near the station. Valeria",
              itemIds: ["ena2m4biggerthanmine", "ena2m4themostexpensive", "ena2m4iprefertheseconone", "ena2m4muchcheaper", "enflat"],
              tip: "El corrector busca primero los tres contenidos y solo después la gramática. Comparación, superlativo y preferencia: si están los tres, ya tienes el aprobado del ejercicio.",
            },
            {
              id: "ena2m4l9e11", type: "monologue", prompt: "El minuto de verdad: compara dos sitios que conozcas",
              topic: "Dos tiendas o dos cafés de tu barrio",
              slides: [
                { title: "1. Lo que tienen en común", hint: "Empieza por ahí: They're very similar. Both of them are near my house. / In both places you can…" },
                { title: "2. Las diferencias", hint: "Aquí van los comparativos: The first one is bigger / cheaper / better than… · The second one is more expensive…" },
                { title: "3. El máximo", hint: "Un superlativo, con su preposición: It's the cheapest shop in my street. / It's the best coffee in the neighbourhood." },
                { title: "4. Cuál prefieres y por qué", hint: "I prefer the first one because… No dejes fuera la razón: es lo que pide el descriptor de A2." },
              ],
              planSeconds: 30,
              speakSeconds: 90,
              reps: 2,
              checklist: [
                "He empezado por una semejanza, no por una diferencia",
                "He usado al menos tres comparativos con than",
                "He usado un superlativo con the y con la preposición correcta (in)",
                "He dicho cuál prefiero",
                "He dado la razón con because",
              ],
              model: "There are two shops near my house and they're very similar: both of them open at eight and both of them sell bread and milk. But the first one is much bigger than the second one, and it's cheaper too. The second one is smaller and more expensive, but it's nicer inside and the woman there is very friendly. The first one is the cheapest shop in my street, and it's the best for a big shopping list. In the end I prefer the second one, because it's nearer and because I know the people. And the bread is better!",
              itemIds: ["ena2m4theyreverysimilar", "ena2m4muchcheaper", "ena2m4thecheapestinthe", "ena2m4iprefertheseconone", "ena2m4thebestcoffee"],
              tip: "Grábate las dos veces. La segunda pasada siempre sale más suelta y con menos silencios: esa es la que se parece al examen. Y cuéntalas: tres comparativos y un superlativo son la nota.",
            },
            {
              id: "ena2m4l9e12", type: "speak", prompt: "La respuesta modelo, en voz alta",
              text: "In both pictures I can see a shop. They're very similar, but the first one is bigger and the second one is much cheaper.",
              phonetic: "in bóuz PÍK-chas̬ ái kan sii a SHOP. déa VE-ri SÍ-mi-la, bat de FÉEST uan is̬ BÍ-ga and de SÉ-kand uan is̬ mach CHÍI-pa",
              translation: "En las dos fotos veo una tienda. Se parecen mucho, pero la primera es más grande y la segunda es mucho más barata.",
              itemIds: ["ena2m4inbothpictures", "ena2m4theyreverysimilar", "ena2m4biggerthanmine", "ena2m4muchcheaper"],
              tip: "Dilo entero de un tirón, sin parar entre frases. En la Parte 3 los silencios largos cuestan más que los errores pequeños.",
            },
            {
              id: "ena2m4l9e13", type: "type", prompt: "Cierre del módulo — la comparación completa",
              question: "En las dos fotos veo una tienda. La primera es la más barata, pero prefiero la segunda porque es más grande.",
              answers: [
                "In both pictures I can see a shop. The first one is the cheapest, but I prefer the second one because it's bigger.",
                "In both pictures I can see a shop. The first one is the cheapest but I prefer the second one because it's bigger.",
                "In both pictures I can see a shop. The first one is the cheapest one, but I prefer the second one because it's bigger.",
              ],
              hints: ["Semejanza + superlativo + preferencia con razón", "In b… pictures I can see a shop. The first one is the ch…, but I p… the second one b… it's bigger."],
              itemIds: ["ena2m4inbothpictures", "ena2m4thecheapestinthe", "ena2m4iprefertheseconone", "ena2m4biggerthanmine"],
              tip: "Ahí está el módulo entero en dos frases: comparar, coronar y elegir con razón. Con esto la Parte 3 del oral deja de darte miedo — y lo vas a reciclar en los ocho módulos que quedan.",
            },
          ],
        },
        {
          kind: "nativo",
          nativo: {
            id: "nat-ena2m4-5",
            book: "I prefer the first one.",
            real: "I'd go for the first one.",
            meaning: "Yo me quedaría con la primera",
            when: "Con amigos y compañeros, decidiendo entre dos opciones: un piso, un plan, un plato de la carta. Es la forma normal de dar tu preferencia sin sonar solemne. En el examen oral valen las dos; en el escrito, mejor I prefer.",
            register: "neutral",
            note: "go for something = decidirse por algo. Nada que ver con «ir a por algo» de recado, que sería go and get it.",
            sound: "áid góu fo de FÉEST uan",
            level: "a2",
            itemId: "ena2m4iprefertheseconone",
          },
        },
      ],
      resources: [
        { label: "LanguageCert — ESOL A2 Access (página oficial)", url: "https://www.languagecert.org/en/language-exams/english/languagecert-international-esol/a2-access-2277", note: "Mira hoy la Parte 3 del Spoken en el material de muestra: son exactamente dos imágenes y un minuto, y ya tienes las cuatro fórmulas para responderla." },
        { label: "British Council — A2 speaking", url: "https://learnenglish.britishcouncil.org/skills/speaking/a2-speaking", note: "Busca las tareas de comparar. Haz una al día durante una semana con el mismo esquema de cuatro bloques: la estructura se automatiza antes que el vocabulario." },
      ],
    },
  ],
};
