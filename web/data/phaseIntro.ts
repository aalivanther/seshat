import type { Phase, VocabItem } from "@/lib/types";

// MÓDULO INTRO "Primeros pasos" — para alumnos desde cero absoluto.
// Fundamento pedagógico (auditoría SLA): HVPT (oído antes de boca),
// Krashen (input comprensible antes de output) y carga cognitiva mínima.
// REGLA DURA: solo ejercicios "mc" (máx. 3 opciones), "match" (máx. 4 pares)
// y "listen" únicamente con palabras de 1 sílaba transparentes (fil5) o en la
// meta-lección fil6. Nada de "type", "cloze" ni "build" salvo los ejemplos
// triviales de fil6.
// EXCEPCIÓN DOCUMENTADA: la regla del curso "cada lección cierra con type
// ES→DE" NO aplica en este módulo — es receptivo por diseño. Solo fil6
// (meta-lección) contiene un type/cloze/build/speak, con carga lingüística ~0.
// Ítems reutilizados de otras fases (via itemIds, NO redefinidos aquí):
// hallo, tschuess, kaffee, familie, auto, hund, katze, pferd, eins, fuenf,
// schoen, acht, zehn, vier. Los que un ejercicio del módulo usa (vier en fil1,
// zehn en fil5, pferd en fil4) se presentan formalmente en la sección phrases
// de su lección ANTES del primer ejercicio que los toca.

export const vocabIntro: Record<string, VocabItem> = {
  // fil1 — sonidos (el resto de anclas ya existen en otras fases)
  was: { id: "was", target: "Was?", source: "¿Qué?", sound: "vas (w = v)" },
  ich: { id: "ich", target: "ich", source: "yo", sound: "ij (j suave, como bufido de gato)" },
  // fil2 — cognados y palabras que ya conoces
  taxi: { id: "taxi", target: "das Taxi", source: "el taxi", sound: "TA-xi", article: "das", plural: "Taxis" },
  musik: { id: "musik", target: "die Musik", source: "la música", sound: "mu-ZIIK (tónica al final)", article: "die" },
  name: { id: "name", target: "der Name", source: "el nombre", sound: "NAA-me", article: "der", plural: "Namen" },
  danke: { id: "danke", target: "Danke", source: "Gracias", sound: "DAN-ke" },
  ja: { id: "ja", target: "ja", source: "sí", sound: "ya (la j alemana = y española)" },
  // fil3 — pronombres ("ich" ya está arriba; "wer" existe en otra fase, no chocar)
  du: { id: "du", target: "du", source: "tú", sound: "du" },
  sieform: { id: "sieform", target: "Sie", source: "usted", sound: "zii (s zumbada, como abeja)" },
  er: { id: "er", target: "er", source: "él", sound: "ea (la r final casi desaparece)" },
  sieella: { id: "sieella", target: "sie", source: "ella", sound: "zii (igual que Sie — la mayúscula decide)" },
  wir: { id: "wir", target: "wir", source: "nosotros / nosotras", sound: "vía (w = v)" },
  ihrpron: { id: "ihrpron", target: "ihr", source: "vosotros / vosotras", sound: "ía" },
  // fil4 — los tres artículos como ítems-concepto
  derart: { id: "derart", target: "der", source: "el (género masculino)", sound: "dea" },
  dieart: { id: "dieart", target: "die", source: "la (género femenino)", sound: "dii" },
  dasart: { id: "dasart", target: "das", source: "el/lo (género neutro)", sound: "das" },
  // fil5 — reglas de lectura como ítems-concepto
  eiregel: { id: "eiregel", target: "ei", source: "se lee «ai»: Wein → vain", sound: "ai" },
  ieregel: { id: "ieregel", target: "ie", source: "se lee «i» larga: wie → vii", sound: "ii" },
  wregel: { id: "wregel", target: "w", source: "se lee «v»: was → vas", sound: "v" },
  vregel: { id: "vregel", target: "v", source: "se lee «f»: vier → fía", sound: "f" },
  zregel: { id: "zregel", target: "z", source: "se lee «ts»: zehn → tseen", sound: "ts" },
  schregel: { id: "schregel", target: "sch", source: "se lee «sh»: schön → shöön", sound: "sh" },
  eszett: { id: "eszett", target: "ß", source: "= doble s: heiße → jáise", sound: "ss" },
};

export const phaseIntro: Phase = {
  id: "fi",
  n: 0,
  title: "Primeros pasos",
  goal: "Antes de tu primera frase: cómo suena el alemán, qué es conjugar, der/die/das y cómo funciona el curso — desde cero absoluto.",
  color: "#0f766e",
  lessons: [
    // ────────────────────────────────────────────────────────────────
    {
      id: "fil1",
      phaseId: "fi",
      title: "Así suena el alemán",
      subtitle: "Los 7 sonidos nuevos — hoy solo los reconoces, no los pronuncias",
      minutes: 7,
      sections: [
        {
          kind: "phrases",
          title: "Escucha cada palabra (toca el altavoz) — no repitas nada aún",
          itemIds: ["fuenf", "schoen", "ich", "acht", "hallo", "eins", "was", "vier"],
        },
        {
          kind: "note",
          note: {
            title: "El alemán tiene 7 sonidos nuevos. Hoy solo los reconoces.",
            body: "Tu único trabajo hoy: <b>oír la diferencia</b>. Pronunciar viene después — el oído siempre va antes que la boca.<br/><br/>Leyenda de las guías «suena como» de toda la app: están escritas <b>tal como las oiría un hispanohablante</b>. Las <b>MAYÚSCULAS</b> marcan la sílaba fuerte, y la <b>j</b> es una jota suave, aspirada (un soplido, no la jota dura de «jamón»).",
            table: [
              ["sonido", "ejemplo", "truco para el oído"],
              ["ü", "fünf", "una «i» dicha con boca de «u»"],
              ["ö", "schön", "una «e» dicha con boca de «o»"],
              ["ch suave", "ich", "como un gatito bufando bajito"],
              ["ch fuerte", "acht", "como tu jota, pero más rasposa"],
              ["h aspirada", "Hallo", "la h NO es muda: se sopla"],
              ["w = v", "was", "una v de labio y diente, como en inglés"],
              ["ei = «ai»", "eins", "el sonido lo tienes (baile) — la sorpresa es la escritura"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "fil1e1", type: "mc", prompt: "Toca el altavoz de «fünf» arriba y decide",
              question: "La ü de «fünf», ¿es la u de «luna»?",
              options: ["Sí, suena «funf»", "No: es una «i» dicha con boca de «u»"],
              answer: 1,
              whyWrong: ["Si oyes «funf» con u española, vuelve a escuchar: la ü es más aguda, casi una i", null],
              itemIds: ["fuenf"],
              tip: "ü = pon la boca para decir «u»... y di «i». Hoy basta con oírla.",
            },
            {
              id: "fil1e2", type: "mc", prompt: "Par mínimo — toca el altavoz de «vier» si lo tienes a mano, o fíate de la guía",
              question: "«vier» (cuatro) empieza como...",
              options: ["la f de «foca»", "la b de «barco»", "la g de «gato»"],
              answer: 0,
              whyWrong: [null, "La v alemana suena f, nunca b — «fía»", "Nada de g: la v alemana es una f"],
              itemIds: ["vier"],
              tip: "Regla que verás en la lección 5: la letra v alemana se lee «f».",
            },
            {
              id: "fil1e3", type: "mc", prompt: "Escucha «ich» y «acht» arriba, una tras otra",
              question: "El ch de «ich» y el ch de «acht», ¿suenan igual?",
              options: ["Sí, es el mismo sonido", "No: ich es suave (gatito), acht es fuerte (jota rasposa)"],
              answer: 1,
              whyWrong: ["Escucha otra vez: ich sale de adelante de la boca, acht de la garganta", null],
              itemIds: ["ich", "acht"],
              tip: "Son DOS sonidos distintos escritos igual. Tu oído ya empieza a separarlos.",
            },
            {
              id: "fil1e4", type: "mc", prompt: "Escucha «Hallo» arriba",
              question: "La h de «Hallo»...",
              options: ["es muda, como en «hola»", "se sopla: se oye una jota suave"],
              answer: 1,
              whyWrong: ["En alemán ninguna h inicial es muda — si no la soplas, dices otra palabra", null],
              itemIds: ["hallo"],
              tip: "Por eso la guía escribe «JA-lo»: esa j es el soplido de la h.",
            },
            {
              id: "fil1e5", type: "match", prompt: "Empareja cada palabra con su sonido estrella (escúchalas arriba si dudas)",
              pairs: [
                { target: "schön", source: "ö: «e» con boca de «o»" },
                { target: "fünf", source: "ü: «i» con boca de «u»" },
                { target: "ich", source: "ch suave, de gatito" },
                { target: "acht", source: "ch fuerte, de jota rasposa" },
              ],
              itemIds: ["schoen", "fuenf", "ich", "acht"],
            },
            {
              id: "fil1e6", type: "mc", prompt: "Escucha «schön» arriba",
              question: "La ö de «schön» suena como...",
              options: ["la o de «bonito»", "una «e» dicha con boca de «o»", "la u de «luna»"],
              answer: 1,
              whyWrong: ["Si fuera una o normal sonaría «shon» — escucha: hay algo de «e» dentro", null, "Esa es la trampa de la ü, no de la ö"],
              itemIds: ["schoen"],
            },
            {
              id: "fil1e7", type: "mc", prompt: "Escucha «was» arriba",
              question: "«was» suena...",
              options: ["«uas», como el what inglés", "«vas», con v de labio y diente", "«gas»"],
              answer: 1,
              whyWrong: ["La w alemana no es la w inglesa: es una v vibrada", null, "Nada de g — la w alemana es una v"],
              itemIds: ["was"],
              tip: "w alemana = v (labio inferior toca los dientes). Lo verás como regla en la lección 5.",
            },
            {
              id: "fil1e8", type: "mc", prompt: "Última pregunta — y la más importante",
              question: "¿Cuántos de estos 7 sonidos tienes que saber PRONUNCIAR hoy?",
              options: ["Todos", "Ninguno — hoy solo entrenas el oído"],
              answer: 1,
              whyWrong: ["Al revés: pronunciar sin haber afinado el oído fija errores. Primero oír, luego hablar", null],
              itemIds: ["ich", "was"],
              tip: "Así entrenan el acento los estudios de fonética (HVPT): muchas escuchas cortas, cero presión por hablar.",
            },
          ],
        },
      ],
      resources: [
        { label: "Goethe Aussprachetrainer", url: "https://www.goethe.de/de/spr/ueb/ast.html", note: "El entrenador oficial de pronunciación del Goethe. Solo escucha — con eso basta por ahora." },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    // fil2 presenta 8 ítems, dentro del límite 6-8: cuatro son cognados
    // transparentes (Auto, Kaffee, Familie, Name) y la lección es de
    // reconocimiento puro (solo mc/match, cero producción). Los cognados
    // Taxi y Musik se presentan en fil4, como anclas de género (das/die).
    {
      id: "fil2",
      phaseId: "fi",
      title: "Ya sabes 8 palabras de alemán",
      subtitle: "Cognados y saludos — solo reconocer, cero memorización",
      minutes: 5,
      sections: [
        {
          kind: "phrases",
          title: "Ocho palabras que ya entiendes (escúchalas)",
          itemIds: ["hallo", "tschuess", "danke", "ja", "auto", "kaffee", "familie", "name"],
        },
        {
          kind: "note",
          note: {
            title: "Cientos de palabras ya las conoces",
            body: "El alemán y el español comparten muchísimas palabras: Auto, Kaffee, Familie, Name... Empezar no es partir de cero.<br/><br/>Y la <b>regla de oro</b> desde el día uno: los <b>SUSTANTIVOS van con Mayúscula, siempre</b> — no solo al inicio de frase. Das Auto, der Kaffee, die Familie. Es la regla ortográfica más fácil y más útil del alemán.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "fil2e1", type: "match", prompt: "Empareja — ya las conoces todas",
              pairs: [
                { target: "das Auto", source: "el coche" },
                { target: "der Kaffee", source: "el café" },
                { target: "die Familie", source: "la familia" },
                { target: "der Name", source: "el nombre" },
              ],
              itemIds: ["auto", "kaffee", "familie", "name"],
            },
            {
              id: "fil2e2", type: "mc", prompt: "Reconoce el significado",
              question: "„die Familie“ significa...",
              options: ["la familia", "la fama", "la fábrica"],
              answer: 0,
              whyWrong: [null, "Fama sería «der Ruhm» — pero suena parecido a propósito: es un cognado", "Fábrica sería «die Fabrik» — otro cognado que te regalará el alemán"],
              itemIds: ["familie"],
            },
            {
              id: "fil2e3", type: "match", prompt: "Los cuatro imprescindibles del primer día",
              pairs: [
                { target: "Hallo", source: "Hola" },
                { target: "Tschüss", source: "Chau" },
                { target: "Danke", source: "Gracias" },
                { target: "ja", source: "sí" },
              ],
              itemIds: ["hallo", "tschuess", "danke", "ja"],
            },
            {
              id: "fil2e4", type: "mc", prompt: "Reconoce el significado",
              question: "„der Name“ es...",
              options: ["el nombre", "la nación", "un señor que se llama Name"],
              answer: 0,
              whyWrong: [null, "Nación sería «die Nation» — cognado también", "Va con mayúscula porque TODOS los sustantivos la llevan, no porque sea nombre propio"],
              itemIds: ["name"],
              hints: ["Piensa en el inglés «name»"],
            },
            {
              // La antigua fil2e5 (la regla de oro con «Musik») vive ahora en
              // fil4 como fil4e7, junto a la presentación de die Musik.
              id: "fil2e6", type: "mc", prompt: "Aplica la regla de oro",
              question: "En medio de una frase, ¿cuál va con mayúscula?",
              options: ["Auto (es un sustantivo)", "ja (sí)"],
              answer: 0,
              whyWrong: [null, "«ja» no es un sustantivo — va en minúscula"],
              itemIds: ["auto", "ja"],
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    {
      id: "fil3",
      phaseId: "fi",
      title: "ich, du, Sie... y qué es conjugar",
      subtitle: "Los pronombres y el concepto que sostiene todo el curso",
      minutes: 7,
      sections: [
        {
          kind: "phrases",
          title: "Las siete personas (escúchalas)",
          itemIds: ["ich", "du", "er", "sieella", "wir", "ihrpron", "sieform"],
        },
        {
          kind: "note",
          note: {
            title: "Conjugar = cambiar el final del verbo según quién habla",
            body: "Ya lo haces en español sin pensar: yo com<b>O</b>, tú com<b>ES</b>, nosotros com<b>EMOS</b>. Nadie te lo tuvo que explicar. En alemán es exactamente igual: ich komm<b>E</b>, du komm<b>ST</b>, Sie komm<b>EN</b>.<br/><br/>Chuleta de arranque: <b>ich → -e · du → -st · Sie → -en</b>.<br/><br/>Detalle importante: <b>sie</b> (minúscula) = ella, y <b>Sie</b> (mayúscula, siempre) = usted. La mayúscula decide.",
            table: [
              ["alemán", "español"],
              ["ich", "yo"],
              ["du", "tú"],
              ["er / sie", "él / ella"],
              ["wir", "nosotros"],
              ["ihr", "vosotros"],
              ["Sie", "usted (¡con mayúscula!)"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "fil3e1", type: "match", prompt: "Empareja pronombre y persona (1 de 2)",
              pairs: [
                { target: "ich", source: "yo" },
                { target: "du", source: "tú" },
                { target: "er", source: "él" },
                { target: "wir", source: "nosotros" },
              ],
              itemIds: ["ich", "du", "er", "wir"],
            },
            {
              id: "fil3e2", type: "match", prompt: "Empareja pronombre y persona (2 de 2) — atenta a la mayúscula",
              pairs: [
                { target: "sie", source: "ella" },
                { target: "ihr", source: "vosotros" },
                { target: "Sie", source: "usted" },
              ],
              itemIds: ["sieella", "ihrpron", "sieform"],
            },
            {
              id: "fil3e3", type: "mc", prompt: "El concepto",
              question: "¿Qué es conjugar?",
              options: ["Cambiar el final del verbo según quién habla", "Traducir palabra por palabra", "Memorizar listas de vocabulario"],
              answer: 0,
              whyWrong: [null, "Eso es traducir — conjugar es otra cosa, y ya la dominas en español", "Las listas no cambian finales de verbos"],
              itemIds: ["ich", "du"],
              tip: "yo comO / tú comES → ich kommE / du kommST. Mismo mecanismo, otro idioma.",
            },
            {
              id: "fil3e4", type: "mc", prompt: "Inferencia guiada — usa la chuleta ich→-e, du→-st, Sie→-en",
              question: "Oyes «kommst» (del verbo kommen, venir). ¿Quién viene?",
              options: ["yo (ich)", "tú (du)", "usted (Sie)"],
              answer: 1,
              whyWrong: ["Con ich sería «komme» (-e)", null, "Con Sie sería «kommen» (-en)"],
              itemIds: ["du"],
              hints: ["¿En qué termina «kommst»?", "-st es la firma de du"],
              tip: "El final -st delata a «du». En alemán el final del verbo te dice quién habla, aunque no oigas el pronombre.",
            },
            {
              id: "fil3e5", type: "mc", prompt: "Otra vez, al revés",
              question: "«komme» (termina en -e). ¿Quién habla?",
              options: ["ich (yo)", "du (tú)", "Sie (usted)"],
              answer: 0,
              whyWrong: [null, "du pide -st: kommst", "Sie pide -en: kommen"],
              itemIds: ["ich"],
              hints: ["Chuleta: ich → -e"],
            },
            {
              id: "fil3e6", type: "mc", prompt: "La mayúscula que cambia el significado",
              question: "¿Qué diferencia hay entre «sie» y «Sie»?",
              options: ["Ninguna, es solo estilo", "sie = ella · Sie (mayúscula) = usted"],
              answer: 1,
              whyWrong: ["Aquí la mayúscula SÍ cambia el significado — es de las pocas veces que una letra grande importa tanto", null],
              itemIds: ["sieella", "sieform"],
              tip: "Suenan idéntico. Por escrito decide la mayúscula; hablando, el contexto.",
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    {
      id: "fil4",
      phaseId: "fi",
      title: "der, die, das sin dolor",
      subtitle: "Tres géneros, una sola estrategia: aprender la palabra CON su artículo",
      minutes: 6,
      sections: [
        {
          kind: "phrases",
          title: "Los tres artículos + tus anclas de género (dos cognados de la lección 2 incluidos)",
          itemIds: ["derart", "dieart", "dasart", "hund", "katze", "pferd", "taxi", "musik"],
        },
        {
          kind: "note",
          note: {
            title: "Tres géneros, no dos",
            body: "El alemán tiene <b>tres</b> géneros: <b>der</b> (masculino), <b>die</b> (femenino) y <b>das</b> (neutro). Dos avisos honestos:<br/><br/>1. <b>NO siempre coinciden con el español</b>: das Auto (el coche), die Sonne (el sol).<br/>2. <b>NO se pueden adivinar</b> por el significado: das Mädchen (la chica) es... neutro.<br/><br/>La estrategia ganadora: aprende cada palabra <b>CON su der/die/das</b>, como si fueran una sola palabra — la app siempre te lo muestra, nunca tendrás que adivinarlo a ciegas.<br/><br/>Bonus tranquilizador: en plural TODOS usan <b>die</b>. Uno de los tres ya te lo sabes.",
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "fil4e1", type: "mc", prompt: "El dato base",
              question: "¿Cuántos géneros tiene el alemán?",
              options: ["Dos, como el español", "Tres: der, die y das"],
              answer: 1,
              whyWrong: ["El español tiene el/la; el alemán añade un tercero: das (neutro)", null],
              itemIds: ["derart", "dieart", "dasart"],
            },
            {
              id: "fil4e2", type: "match", prompt: "Empareja artículo y ejemplo",
              pairs: [
                { target: "der", source: "masculino: der Hund (el perro)" },
                { target: "die", source: "femenino: die Katze (la gata)" },
                { target: "das", source: "neutro: das Auto (el coche)" },
              ],
              itemIds: ["derart", "dieart", "dasart", "hund"],
            },
            {
              id: "fil4e3", type: "mc", prompt: "Trampa amable",
              question: "¿Se puede adivinar el género por el significado de la palabra?",
              options: ["Sí, con un poco de lógica", "No — se aprende cada palabra con su artículo"],
              answer: 1,
              whyWrong: ["Prueba de fuego: das Mädchen (la chica) es neutro. La lógica pierde", null],
              itemIds: ["dasart"],
              tip: "No es mala noticia: como no hay que razonar, solo hay que mirar. Y la app te lo muestra siempre.",
            },
            {
              id: "fil4e4", type: "mc", prompt: "La estrategia",
              question: "¿Cómo conviene memorizar la palabra «Hund»?",
              options: ["Solo «Hund» — el artículo ya vendrá", "Siempre «der Hund», artículo y palabra como un bloque"],
              answer: 1,
              whyWrong: ["Aprenderla suelta obliga a re-aprenderla después — sale el doble de caro", null],
              itemIds: ["hund", "derart"],
              hints: ["¿Qué te acaba de decir la nota de arriba?"],
            },
            {
              id: "fil4e5", type: "mc", prompt: "¿Coinciden los idiomas?",
              question: "«das Auto» es neutro, pero «el coche» es masculino. ¿Los géneros coinciden entre alemán y español?",
              options: ["Siempre", "A veces sí, a veces no — por eso el artículo se aprende con la palabra"],
              answer: 1,
              whyWrong: ["Ojalá — pero das Auto y die Sonne (el sol) demuestran lo contrario", null],
              itemIds: ["dasart", "auto"],
            },
            {
              id: "fil4e6", type: "mc", prompt: "El bonus del plural",
              question: "En plural (los perros, las gatas, los coches), ¿qué artículo usan TODOS?",
              options: ["der", "die", "das"],
              answer: 1,
              whyWrong: ["der es solo masculino singular", null, "das es solo neutro singular"],
              itemIds: ["dieart"],
              tip: "die Hunde, die Katzen, die Autos. En plural el género desaparece: siempre die.",
            },
            {
              // Movido desde fil2 (antes fil2e5): «die Musik» se presenta ahora
              // en esta lección como ancla de género femenino.
              id: "fil4e7", type: "mc", prompt: "La regla de oro, con tu ancla nueva",
              question: "¿Por qué «Musik» se escribe con mayúscula en medio de una frase?",
              options: ["Porque es palabra importada", "Porque en alemán TODOS los sustantivos van con mayúscula", "Es un error tipográfico"],
              answer: 1,
              whyWrong: ["No importa el origen: Taxi, Hund y Katze la llevan igual", null, "Nada de error: es la norma ortográfica alemana"],
              itemIds: ["musik", "taxi"],
              tip: "Y con su artículo, como un bloque: die Musik, das Taxi. Bonus: la mayúscula te ayudará a LEER — ves de un vistazo qué palabras son cosas.",
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    {
      id: "fil5",
      phaseId: "fi",
      title: "Leer alemán en voz alta",
      subtitle: "7 reglas letra→sonido y podrás leer casi cualquier palabra",
      minutes: 7,
      sections: [
        {
          kind: "phrases",
          title: "Las 7 reglas (toca el altavoz de cada una) — y «zehn» para probarlas",
          itemIds: ["eiregel", "ieregel", "wregel", "vregel", "zregel", "schregel", "eszett", "zehn"],
        },
        {
          kind: "note",
          note: {
            title: "El alemán se lee casi siempre igual que se escribe",
            body: "Buena noticia: a diferencia del inglés, el alemán es muy regular. Con estas 7 correspondencias lees en voz alta casi cualquier palabra del curso.<br/><br/><b>El aviso clave del teclado</b>: <b>ß = doble s</b>. ¿Tu teclado no la tiene? Escribe <b>ss</b> — la app lo acepta. Igual con <b>ue/oe/ae</b> por <b>ü/ö/ä</b>. Aun así, la app te animará a usar las letras de verdad — son parte del idioma.",
            table: [
              ["letra(s)", "suena", "ejemplo"],
              ["ei", "«ai»", "Wein → vain"],
              ["ie", "«i» larga", "wie → vii"],
              ["w", "«v»", "was → vas"],
              ["v", "«f»", "vier → fía"],
              ["z", "«ts»", "zehn → tseen"],
              ["sch", "«sh»", "schön → shöön"],
              ["ß", "«ss»", "heiße → jáise"],
            ],
          },
        },
        {
          kind: "exercises",
          exercises: [
            {
              id: "fil5e1", type: "mc", prompt: "Aplica dos reglas a la vez",
              question: "¿Cómo se lee «Wein» (vino)?",
              options: ["«vain»", "«güein»", "«vein»"],
              answer: 0,
              whyWrong: [null, "La w alemana no es la w inglesa: es una v", "ei se lee «ai», nunca «ei» a la española"],
              itemIds: ["wregel", "eiregel"],
              hints: ["w = v... y ei = ai"],
            },
            {
              id: "fil5e2", type: "mc", prompt: "El par ei/ie — el que más confunde",
              question: "¿Cómo se lee «vier» (cuatro)?",
              options: ["«vier», tal cual", "«fía»: v = f, ie = i larga"],
              answer: 1,
              whyWrong: ["Dos reglas en contra: la v alemana suena f y la ie es una i larga", null],
              itemIds: ["vregel", "ieregel", "vier"],
              tip: "Truco: en «ie» manda la i (i larga); en «ei» manda el sonido «ai».",
            },
            {
              id: "fil5e3", type: "mc", prompt: "Toca el altavoz de la regla «z» arriba y escucha bien",
              question: "🔊 Oíste [tseen]. ¿Qué palabra es?",
              options: ["zehn (diez) — la z suena ts", "sehn"],
              answer: 0,
              whyWrong: [null, "Con s zumbada sonaría «zeen» suave, sin la t inicial del ts"],
              itemIds: ["zregel", "zehn"],
              tip: "La z alemana SIEMPRE es «ts»: zehn, zwanzig, Katze.",
            },
            {
              id: "fil5e4", type: "mc", prompt: "Una regla más",
              question: "¿Cómo se lee «schön» (bonito)?",
              options: ["«es-chon»", "«shoen»: sch = sh"],
              answer: 1,
              whyWrong: ["Las tres letras sch forman UN solo sonido: sh, como pedir silencio", null],
              itemIds: ["schregel", "schoen"],
            },
            {
              id: "fil5e5", type: "mc", prompt: "El aviso del teclado",
              question: "Tu teclado no tiene ß. ¿Cómo escribes «heiße»?",
              options: ["«heisse» — ß = ss y la app lo acepta", "No se puede sin teclado alemán", "«heihse»"],
              answer: 0,
              whyWrong: [null, "Claro que se puede: ß es exactamente una doble s", "La ß no tiene nada de h — es una ss"],
              itemIds: ["eszett"],
              tip: "Lo mismo con ü/ö/ä → ue/oe/ae. La app lo acepta, aunque te animará a usar las letras de verdad.",
            },
            {
              // ÚNICO listen del módulo fuera de fil6: palabra de 1 sílaba, transparente.
              id: "fil5e6", type: "listen", prompt: "Tu primer mini-dictado — una palabra cortita",
              text: "ja",
              translation: "sí",
              hints: ["Suena «ya» — dos letras", "Empieza por j"],
              itemIds: ["ja"],
              tip: "¿Fácil? Esa es la idea: acabas de leer y escribir alemán de verdad.",
            },
          ],
        },
      ],
    },
    // ────────────────────────────────────────────────────────────────
    {
      id: "fil6",
      phaseId: "fi",
      title: "Cómo funciona el curso",
      subtitle: "Un ejemplo trivial de cada tipo de ejercicio — para que nada te sorprenda",
      minutes: 7,
      sections: [
        {
          kind: "phrases",
          title: "Tu material de prueba (ya lo conoces)",
          itemIds: ["hallo", "tschuess", "danke"],
        },
        {
          kind: "note",
          note: {
            title: "Los 7 tipos de ejercicio — y cómo se puntúa",
            body: "En el curso verás estos tipos: <b>Elige</b> (opción múltiple), <b>Empareja</b> (unir pares), <b>Completa</b> (rellenar un hueco), <b>Construye</b> (ordenar fichas), <b>Dictado</b> (escuchar y escribir), <b>Traduce</b> (escribir en alemán) y <b>Pronuncia</b> (leer en voz alta con guía).<br/><br/>Cosas buenas que debes saber:<br/>• Las <b>pistas</b> están para usarse — con pista el acierto vale un 75%, mucho mejor que quedarse atascado.<br/>• Si fallas, tienes <b>segundo intento</b>.<br/>• La app usa <b>repaso espaciado</b>: te volverá a preguntar mañana lo de hoy. Si algo se te olvida y reaparece, <b>eso es aprender, no fallar</b> — el olvido programado es parte del método.",
          },
        },
        {
          kind: "exercises",
          // Meta-lección: un ejemplo de cada tipo con carga lingüística ~cero.
          // Única lección del módulo con cloze/build/type/speak (ver comentario de cabecera).
          exercises: [
            {
              id: "fil6e1", type: "mc", prompt: "Tipo 1 — Elige: marca la opción correcta",
              question: "„Hallo“ significa...",
              options: ["Hola", "Chau"],
              answer: 0,
              whyWrong: [null, "Chau es «Tschüss» — y si fallas, mira: tienes segundo intento"],
              itemIds: ["hallo"],
            },
            {
              id: "fil6e2", type: "match", prompt: "Tipo 2 — Empareja: toca una tarjeta de cada columna",
              pairs: [
                { target: "Hallo", source: "Hola" },
                { target: "Tschüss", source: "Chau" },
                { target: "Danke", source: "Gracias" },
              ],
              itemIds: ["hallo", "tschuess", "danke"],
            },
            {
              id: "fil6e3", type: "cloze", prompt: "Tipo 3 — Completa: escribe lo que falta en el hueco",
              text: "Hal___!",
              answers: ["lo"],
              translation: "¡Hola!",
              hints: ["Es el saludo que ya conoces", "Faltan dos letras: l y o"],
              itemIds: ["hallo"],
              tip: "Las pistas restan un poco de puntuación — pero un 75% con pista gana a un atasco.",
            },
            {
              id: "fil6e4", type: "build", prompt: "Tipo 4 — Construye: toca las fichas en orden (sobra una)",
              target: "Hallo Anna",
              translation: "Hola Anna",
              distractors: ["Tschüss"],
              itemIds: ["hallo"],
              tip: "Siempre puede haber fichas de sobra — como el «Tschüss» que acabas de descartar.",
            },
            {
              id: "fil6e5", type: "listen", prompt: "Tipo 5 — Dictado: pulsa escuchar y escribe lo que oigas",
              text: "Hallo",
              translation: "Hola",
              hints: ["Una sola palabra, ya la conoces", "Empieza por H"],
              itemIds: ["hallo"],
              tip: "Puedes repetir el audio todas las veces que quieras — repetir no penaliza.",
            },
            {
              id: "fil6e6", type: "type", prompt: "Tipo 6 — Traduce: escribe la palabra en alemán",
              question: "hola",
              answers: ["Hallo"],
              hints: ["El saludo de toda esta lección", "H-a-l-l-o"],
              itemIds: ["hallo"],
              tip: "En el curso, casi todas las lecciones cierran con uno de estos: es la prueba de que produces, no solo reconoces.",
            },
            {
              id: "fil6e7", type: "speak", prompt: "Tipo 7 — Pronuncia: léelo en voz alta con la guía y compárate con el audio",
              text: "Hallo! Tschüss!",
              phonetic: "JA-lo! chüs!",
              translation: "¡Hola! ¡Chau!",
              itemIds: ["hallo", "tschuess"],
              tip: "Tú mismo evalúas si te salió — sé honesto y también amable contigo. ¡Módulo completado: ya estás listo para la Fase 0!",
            },
          ],
        },
      ],
      resources: [
        { label: "Nicos Weg (Deutsche Welle)", url: "https://learngerman.dw.com/es/overview", note: "El curso gratuito de DW en video. Mira el primer episodio: entenderás más de lo que crees." },
      ],
    },
  ],
};
