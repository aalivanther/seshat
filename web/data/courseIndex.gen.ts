// ⚠️ GENERADO por scripts/gen-derived.mjs — NO editar a mano.
// Derivado de course.gen.ts (drop 8). Regenerar: node scripts/gen-derived.mjs
import type { CourseIndex, MissionMeta } from "@/lib/types";
import type { ExamMeta } from "@/lib/examTypes";

/** módulos y lecciones de este build, sin el contenido de ninguna lección */
export const courseIndex: Record<string, CourseIndex> = {
 "de": {
  "phases": [
   {
    "id": "fi",
    "n": 0,
    "title": "Primeros pasos",
    "goal": "Antes de tu primera frase: cómo suena el alemán, qué es conjugar, der/die/das y cómo funciona el curso — desde cero absoluto.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "fil1",
      "phaseId": "fi",
      "title": "Así suena el alemán",
      "subtitle": "Los 7 sonidos nuevos — hoy solo los reconoces, no los pronuncias",
      "minutes": 7,
      "nEx": 8
     },
     {
      "id": "fil2",
      "phaseId": "fi",
      "title": "Ya sabes 8 palabras de alemán",
      "subtitle": "Cognados y saludos — solo reconocer, cero memorización",
      "minutes": 5,
      "nEx": 5
     },
     {
      "id": "fil3",
      "phaseId": "fi",
      "title": "ich, du, Sie... y qué es conjugar",
      "subtitle": "Los pronombres y el concepto que sostiene todo el curso",
      "minutes": 7,
      "nEx": 6
     },
     {
      "id": "fil4",
      "phaseId": "fi",
      "title": "der, die, das sin dolor",
      "subtitle": "Tres géneros, una sola estrategia: aprender la palabra CON su artículo",
      "minutes": 6,
      "nEx": 7
     },
     {
      "id": "fil5",
      "phaseId": "fi",
      "title": "Leer alemán en voz alta",
      "subtitle": "7 reglas letra→sonido y podrás leer casi cualquier palabra",
      "minutes": 7,
      "nEx": 6
     },
     {
      "id": "fil6",
      "phaseId": "fi",
      "title": "Cómo funciona el curso",
      "subtitle": "Un ejemplo trivial de cada tipo de ejercicio — para que nada te sorprenda",
      "minutes": 7,
      "nEx": 7
     }
    ]
   },
   {
    "id": "f0",
    "n": 1,
    "title": "Fundamento",
    "goal": "Tus primeras frases reales: presentarte, tu trabajo y tus gustos — la base de todo el curso.",
    "color": "#2957d0",
    "lessons": [
     {
      "id": "f0l1",
      "phaseId": "f0",
      "title": "Hallo! Ich bin ...",
      "subtitle": "Saludar y decir tu nombre — tus primeras palabras",
      "minutes": 6,
      "nEx": 6
     },
     {
      "id": "f0l1b",
      "phaseId": "f0",
      "title": "Woher? Wo? Wie alt?",
      "subtitle": "Decir tu origen, tu ciudad y tu edad",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "f0l2",
      "phaseId": "f0",
      "title": "du oder Sie?",
      "subtitle": "Formal vs informal — la elección que haces en cada frase",
      "minutes": 7,
      "nEx": 8
     },
     {
      "id": "f0l3",
      "phaseId": "f0",
      "title": "Was machst du beruflich?",
      "subtitle": "Tu trabajo en 4 estructuras",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "f0l4",
      "phaseId": "f0",
      "title": "sein, haben, mögen",
      "subtitle": "Los 3 verbos que sostienen todo — y los errores a cazar",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f0l5",
      "phaseId": "f0",
      "title": "Klang: ü, ei/ie y números",
      "subtitle": "Bloque de pronunciación + números — tu oído alemán",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f0l6",
      "phaseId": "f0",
      "title": "Zahlen 0-6",
      "subtitle": "Los primeros números — se memorizan tal cual",
      "minutes": 6,
      "nEx": 6
     },
     {
      "id": "f0l7",
      "phaseId": "f0",
      "title": "Zahlen bis 100",
      "subtitle": "Del 7 al 12 de memoria — y hasta 100 con dos patrones",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "f0l8",
      "phaseId": "f0",
      "title": "Nico kommt an",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 8
     }
    ]
   },
   {
    "id": "f1",
    "n": 2,
    "title": "Mi gente",
    "goal": "Presentar a tu familia con los posesivos correctos, describir personas y cosas con colores, y dominar tus primeros plurales.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "f1l1",
      "phaseId": "f1",
      "title": "Meine Familie",
      "subtitle": "Presentar a tu familia — mein/meine como frase hecha",
      "minutes": 7,
      "nEx": 9
     },
     {
      "id": "f1l2",
      "phaseId": "f1",
      "title": "dein, sein, ihr",
      "subtitle": "De quién es cada cosa — los posesivos de tú, él y ella",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f1l3",
      "phaseId": "f1",
      "title": "Oma, Opa und Co.",
      "subtitle": "La familia completa + estado civil",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "f1l4",
      "phaseId": "f1",
      "title": "Farben",
      "subtitle": "Los 8 colores oficiales del Goethe A1 — describiendo lo tuyo",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f1l5",
      "phaseId": "f1",
      "title": "Plurale",
      "subtitle": "Hunde, Katzen, Kinder, Häuser — los 4 primeros patrones",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "f1l6",
      "phaseId": "f1",
      "title": "Klang: ich vs. acht",
      "subtitle": "Las dos ch + h aspirada — y repaso integrador de la fase",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "f1l7",
      "phaseId": "f1",
      "title": "Nicos Familie",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 9
     }
    ]
   },
   {
    "id": "f2",
    "n": 3,
    "title": "Mi día",
    "goal": "Decir la hora, hablar de tu semana y contar tu rutina diaria — con el verbo siempre en segunda posición, como un alemán.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "f2l1",
      "phaseId": "f2",
      "title": "Wie spät ist es?",
      "subtitle": "La hora — y la trampa de «halb neun»",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "f2l2",
      "phaseId": "f2",
      "title": "Die Woche",
      "subtitle": "Los 7 días y el finde",
      "minutes": 8,
      "nEx": 6
     },
     {
      "id": "f2l2b",
      "phaseId": "f2",
      "title": "Guten Morgen! Heute und morgen",
      "subtitle": "El saludo correcto a cada hora — y hoy vs. mañana",
      "minutes": 7,
      "nEx": 8
     },
     {
      "id": "f2l3",
      "phaseId": "f2",
      "title": "Mein Tag",
      "subtitle": "Tu rutina — y el prefijo que vuela al final",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "f2l4",
      "phaseId": "f2",
      "title": "um, am, im",
      "subtitle": "Las tres llaves del tiempo — y los meses",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "f2l4b",
      "phaseId": "f2",
      "title": "Wann hast du Geburtstag?",
      "subtitle": "El cumpleaños y las fechas — am + ordinal como chunk",
      "minutes": 7,
      "nEx": 7
     },
     {
      "id": "f2l5",
      "phaseId": "f2",
      "title": "Am Montag arbeite ich",
      "subtitle": "El orden V2 — el gran escollo del hispanohablante",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "f2l6",
      "phaseId": "f2",
      "title": "Jahreszeiten und Wetter",
      "subtitle": "Estaciones y clima — im Winter ist es kalt",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f2l7",
      "phaseId": "f2",
      "title": "Klang: st, sp und z",
      "subtitle": "scht, schp, ts — y repaso integrador de la fase",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f2l8",
      "phaseId": "f2",
      "title": "Nicos erster Montag",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 8
     }
    ]
   },
   {
    "id": "f3",
    "n": 4,
    "title": "Comer y comprar",
    "goal": "Pedir en un café o restaurante, entender precios, hacer la compra — y dominar el acusativo sin darte cuenta de que es gramática.",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "f3l1",
      "phaseId": "f3",
      "title": "Im Café",
      "subtitle": "Tu primera transacción real en alemán: pedir y pagar",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "f3l2",
      "phaseId": "f3",
      "title": "Frühstück",
      "subtitle": "El desayuno alemán — y tu primer verbo irregular nuevo: essen",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f3l3",
      "phaseId": "f3",
      "title": "Was kostet das?",
      "subtitle": "Precios: tus números de fase 0, ahora con dinero de verdad",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f3l4",
      "phaseId": "f3",
      "title": "Der Akkusativ",
      "subtitle": "La lección gramatical: einen — y por qué ya lo usabas sin saberlo",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f3l5",
      "phaseId": "f3",
      "title": "Im Supermarkt",
      "subtitle": "La compra semanal: es gibt + tu acusativo recién estrenado",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f3l6",
      "phaseId": "f3",
      "title": "Im Restaurant",
      "subtitle": "Pedir como un local: la carta, el camarero y «Ich nehme...»",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f3l7",
      "phaseId": "f3",
      "title": "Klang: ö y eu/äu — y tu café completo",
      "subtitle": "Bloque de pronunciación + repaso integrador de toda la fase",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f3l8",
      "phaseId": "f3",
      "title": "Nico im Café",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 9
     }
    ]
   },
   {
    "id": "f4",
    "n": 5,
    "title": "Donde vivo",
    "goal": "Describir tu casa habitación por habitación, decir dónde está cada cosa y orientarte en la ciudad preguntando por direcciones.",
    "color": "#166534",
    "lessons": [
     {
      "id": "f4l1",
      "phaseId": "f4",
      "title": "Meine Wohnung",
      "subtitle": "Tu casa por dentro — y las palabras compuestas alemanas",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f4l2",
      "phaseId": "f4",
      "title": "Möbel",
      "subtitle": "Los muebles — y el adjetivo que no se mueve",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f4l3",
      "phaseId": "f4",
      "title": "Wo ist ...?",
      "subtitle": "Ubicar cosas con chunks fijos: auf dem, im, an der",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f4l4",
      "phaseId": "f4",
      "title": "In der Stadt",
      "subtitle": "Salir de casa: los sitios de tu barrio y cómo preguntar por ellos",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f4l5",
      "phaseId": "f4",
      "title": "Himmelsrichtungen",
      "subtitle": "Norte, sur, este, oeste — y las tres palabras que te llevan a todas partes",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "f4l6",
      "phaseId": "f4",
      "title": "Klang: ß y la -er final — y tu casa en 3 frases",
      "subtitle": "Bloque de pronunciación + repaso integrador de toda la fase",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "f4l7",
      "phaseId": "f4",
      "title": "Nico sucht die Apotheke",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 8
     }
    ]
   },
   {
    "id": "f5",
    "n": 6,
    "title": "Tiempo libre",
    "goal": "Hablar de tus hobbys, decir qué sabes, debes y quieres hacer, y quedar con alguien — aceptando o rechazando con educación.",
    "color": "#9333ea",
    "lessons": [
     {
      "id": "f5l1",
      "phaseId": "f5",
      "title": "Was machst du gern?",
      "subtitle": "Tus hobbys — y el truco de «gern»",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "f5l2",
      "phaseId": "f5",
      "title": "Ich kann gut kochen",
      "subtitle": "können — tu primer verbo modal y la Satzklammer",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "f5l3",
      "phaseId": "f5",
      "title": "Ich muss arbeiten, ich will lernen",
      "subtitle": "müssen y wollen — obligación y voluntad con la misma pinza",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "f5l4",
      "phaseId": "f5",
      "title": "gern, lieber, am liebsten",
      "subtitle": "La escalera de preferencias — y cuándo usar mögen",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f5l5",
      "phaseId": "f5",
      "title": "Hast du am Samstag Zeit?",
      "subtitle": "Invitar, aceptar y rechazar — tu primera Verabredung",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f5l6",
      "phaseId": "f5",
      "title": "Klang: w, sch y repaso de la fase",
      "subtitle": "Pronunciación en bloque + el diálogo de invitación completo",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "f5l7",
      "phaseId": "f5",
      "title": "Nico und der Fußball",
      "subtitle": "Mini-cuento — demuestra que lo entendiste",
      "minutes": 7,
      "nEx": 8
     }
    ]
   },
   {
    "id": "f7",
    "n": 7,
    "title": "Ropa y estilo",
    "goal": "Describir lo que llevas puesto, comprar ropa preguntando talla y probador, y opinar con gefallen, passen y dieser/diese/dieses — como en una tienda de Berlín.",
    "color": "#a21caf",
    "lessons": [
     {
      "id": "f7l1",
      "phaseId": "f7",
      "title": "Die Kleidung",
      "subtitle": "Tu ropa — y el verbo tragen para decir qué llevas",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f7l2",
      "phaseId": "f7",
      "title": "Einkaufen gehen",
      "subtitle": "En la tienda: talla, probador y «demasiado caro»",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f7l3",
      "phaseId": "f7",
      "title": "Gefällt es dir?",
      "subtitle": "Opinar sobre ropa: gefallen, passen y Wie findest du...?",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "f7l4",
      "phaseId": "f7",
      "title": "Dieser, diese, dieses",
      "subtitle": "Señalar en la tienda: «esta chaqueta», «me llevo esta falda»",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f7l5",
      "phaseId": "f7",
      "title": "Klang: -ig, -ich y la h muda",
      "subtitle": "billig suena «bílij», Schuhe suena «shúue» — y repaso de la fase",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f7l6",
      "phaseId": "f7",
      "title": "Mini-cuento: Nico kauft eine Jacke",
      "subtitle": "Toda la fase en una historia — léela, entiéndela, úsala",
      "minutes": 10,
      "nEx": 10
     }
    ]
   },
   {
    "id": "f8",
    "n": 8,
    "title": "Cuerpo y salud",
    "goal": "Nombrar tu cuerpo, decir qué te duele, pedir cita con el médico y entender sus instrucciones — el alemán que necesitas el día que te sientes mal.",
    "color": "#0e7490",
    "lessons": [
     {
      "id": "f8l1",
      "phaseId": "f8",
      "title": "Der Körper",
      "subtitle": "Tu cuerpo con tus posesivos: mein Kopf, meine Hände",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f8l2",
      "phaseId": "f8",
      "title": "Was tut dir weh?",
      "subtitle": "Decir qué te duele: tut weh / tun weh",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "f8l3",
      "phaseId": "f8",
      "title": "Beim Arzt",
      "subtitle": "Pedir cita y entender al médico: Was fehlt Ihnen?",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "f8l4",
      "phaseId": "f8",
      "title": "Nehmen Sie...!",
      "subtitle": "Las órdenes del médico: el imperativo formal",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f8l5",
      "phaseId": "f8",
      "title": "Klang: au, ei y el par Ohr/Uhr",
      "subtitle": "Bauch, Bein, Auge — y repaso integrador de la fase",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f8l6",
      "phaseId": "f8",
      "title": "Mini-cuento: Nico ist krank",
      "subtitle": "Toda la fase en una historia — del dolor de cabeza al baile",
      "minutes": 10,
      "nEx": 10
     }
    ]
   },
   {
    "id": "f9",
    "n": 9,
    "title": "De viaje",
    "goal": "Moverte por Alemania: comprar billetes, entender salidas y llegadas, hacer transbordo, reservar hotel y contar a dónde vas de vacaciones.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "f9l1",
      "phaseId": "f9",
      "title": "Wie fährst du?",
      "subtitle": "Los transportes — y el chunk «mit dem Bus»",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f9l2",
      "phaseId": "f9",
      "title": "Am Bahnhof",
      "subtitle": "Billetes, andenes y transbordos — supervivencia en la estación",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "f9l3",
      "phaseId": "f9",
      "title": "Wohin fährst du?",
      "subtitle": "Wo vs Wohin — y los chunks nach / zum / zur",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f9l3b",
      "phaseId": "f9",
      "title": "Urlaub!",
      "subtitle": "Vacaciones: fliegen, el hotel y «Wohin fährst du im Urlaub?»",
      "minutes": 8,
      "nEx": 9
     },
     {
      "id": "f9l4",
      "phaseId": "f9",
      "title": "Im Hotel",
      "subtitle": "Reservar, preguntar el precio y recoger la llave",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f9l5",
      "phaseId": "f9",
      "title": "Klang: fahren/waren y Zug/Züge",
      "subtitle": "Pares mínimos f/v(w), u/ü y la familia -zeug",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f9l6",
      "phaseId": "f9",
      "title": "Mini-cuento: Nico fährt nach Hamburg",
      "subtitle": "Toda la fase en una historia — con café incluido",
      "minutes": 10,
      "nEx": 10
     }
    ]
   },
   {
    "id": "f10",
    "n": 10,
    "title": "Papeles y trámites",
    "goal": "Rellenar cualquier formulario alemán (¡la tarea Schreiben del examen!), enviar cartas y paquetes, abrir una cuenta y sobrevivir a una llamada formal.",
    "color": "#78350f",
    "lessons": [
     {
      "id": "f10l1",
      "phaseId": "f10",
      "title": "Das Formular",
      "subtitle": "Los campos del formulario — la tarea Schreiben del examen",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f10l2",
      "phaseId": "f10",
      "title": "Auf der Post",
      "subtitle": "Cartas, sellos y paquetes — reciclando tus precios",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "f10l3",
      "phaseId": "f10",
      "title": "Auf der Bank",
      "subtitle": "Cuenta, tarjeta y sacar dinero",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "f10l4",
      "phaseId": "f10",
      "title": "Am Telefon",
      "subtitle": "Contestar, pedir por alguien y colgar — sin pánico",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f10l5",
      "phaseId": "f10",
      "title": "Klang: -tion y st",
      "subtitle": "«tsión», «sht» — y repaso integrador de la fase",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "f10l6",
      "phaseId": "f10",
      "title": "Mini-cuento: Nico und das Formular",
      "subtitle": "Toda la fase en una historia — en el Bürgeramt",
      "minutes": 10,
      "nEx": 10
     }
    ]
   },
   {
    "id": "f11",
    "n": 11,
    "title": "Ayer y mañana",
    "goal": "Contar qué hiciste ayer y el fin de semana en Perfekt, usar war/hatte, y hablar de tus planes con el presente — el broche del A1.",
    "color": "#4d7c0f",
    "lessons": [
     {
      "id": "f11l1",
      "phaseId": "f11",
      "title": "Gestern war ich zu Hause",
      "subtitle": "war y hatte — tu entrada suave al pasado",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f11l2",
      "phaseId": "f11",
      "title": "Was hast du gemacht?",
      "subtitle": "El Perfekt regular — la Satzklammer que ya conoces",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "f11l3",
      "phaseId": "f11",
      "title": "Gegessen, getrunken, gesehen",
      "subtitle": "Los Partizip irregulares — acaban en -en",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "f11l4",
      "phaseId": "f11",
      "title": "Ich bin gegangen",
      "subtitle": "Movimiento → sein, no haben — el error nº1",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "f11l5",
      "phaseId": "f11",
      "title": "Am Wochenende",
      "subtitle": "Cuenta tu finde completo — con zuerst, dann y danach",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "f11l6",
      "phaseId": "f11",
      "title": "Morgen mache ich ...",
      "subtitle": "El futuro sin futuro — presente + palabra de tiempo",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "f11l7",
      "phaseId": "f11",
      "title": "Nicos Woche",
      "subtitle": "El mini-cuento final — todo el curso en una semana",
      "minutes": 11,
      "nEx": 11
     }
    ]
   },
   {
    "id": "f6",
    "n": 12,
    "title": "Rumbo al examen",
    "goal": "Conocer el Start Deutsch 1 por dentro, dominar sus instrucciones en alemán y entrenar las cuatro destrezas con material oficial del Goethe.",
    "color": "#b91c1c",
    "lessons": [
     {
      "id": "f6l1",
      "phaseId": "f6",
      "title": "So funktioniert die Prüfung",
      "subtitle": "El mapa del examen — y el idioma de sus instrucciones",
      "minutes": 9,
      "nEx": 8
     },
     {
      "id": "f6l2",
      "phaseId": "f6",
      "title": "Hören-Training",
      "subtitle": "Horas, precios y teléfonos — lo que SIEMPRE preguntan",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "f6l3",
      "phaseId": "f6",
      "title": "Lesen & Schreiben",
      "subtitle": "Mini-textos tipo examen y las fórmulas de email que puntúan",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "f6l4",
      "phaseId": "f6",
      "title": "Sprechen-Training",
      "subtitle": "Tu presentación de examen + las frases que te rescatan",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "f6l4b",
      "phaseId": "f6",
      "title": "Die Karten",
      "subtitle": "Sprechen Teil 2 y 3 — preguntas y Bitten desde la tarjeta",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "f6l5",
      "phaseId": "f6",
      "title": "Interleaving final",
      "subtitle": "Todos tus pares confundibles, mezclados a propósito",
      "minutes": 11,
      "nEx": 11
     }
    ]
   },
   {
    "id": "a2m1",
    "level": "a2",
    "n": 1,
    "title": "Erzähl mal",
    "goal": "Contar qué hiciste ayer y el fin de semana con el Perfekt (haben + Partizip II).",
    "color": "#0e7490",
    "lessons": [
     {
      "id": "a2m1l1",
      "phaseId": "a2m1",
      "title": "Was hast du gemacht?",
      "subtitle": "La pregunta de cada lunes — y tus respuestas listas",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "a2m1l2",
      "phaseId": "a2m1",
      "title": "ge—t: la fábrica de participios",
      "subtitle": "La regla que fabrica el 80% de los participios",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m1l3",
      "phaseId": "a2m1",
      "title": "haben en su sitio",
      "subtitle": "La pinza verbal — haben 2º, participio al FINAL",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m1l4",
      "phaseId": "a2m1",
      "title": "Los rebeldes",
      "subtitle": "Los participios que no pasan por la fábrica — acaban en -en",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "a2m1l5",
      "phaseId": "a2m1",
      "title": "Mein Wochenende",
      "subtitle": "am Samstag, am Sonntag — y tu finde en orden con zuerst, dann, danach",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "a2m1l6",
      "phaseId": "a2m1",
      "title": "Verbos sin ge-",
      "subtitle": "besucht, telefoniert — el matiz que el examen pregunta",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m1l7",
      "phaseId": "a2m1",
      "title": "Nico erzählt",
      "subtitle": "Mini-cuento — la primera semana de Nico, contada en Perfekt",
      "minutes": 10,
      "nEx": 15
     }
    ]
   },
   {
    "id": "a2m2",
    "level": "a2",
    "n": 2,
    "title": "Unterwegs gewesen",
    "goal": "Contar un viaje completo: Perfekt con sein, y el pasado directo con war y hatte.",
    "color": "#7c2d92",
    "lessons": [
     {
      "id": "a2m2l1",
      "phaseId": "a2m2",
      "title": "Ich bin gefahren",
      "subtitle": "El descubrimiento: el pasado que se mueve va con sein",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m2l2",
      "phaseId": "a2m2",
      "title": "¿haben o sein?",
      "subtitle": "La regla completa — y las dos excepciones estrella",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m2l3",
      "phaseId": "a2m2",
      "title": "war und hatte",
      "subtitle": "El pasado SIN Perfekt — como habla la gente de verdad",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m2l4",
      "phaseId": "a2m2",
      "title": "Die Reise",
      "subtitle": "El léxico del viaje — contado en pasado",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m2l5",
      "phaseId": "a2m2",
      "title": "Wohin bist du gefahren?",
      "subtitle": "Preguntar y responder por un viaje — nach, ans Meer, in die Berge",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m2l6",
      "phaseId": "a2m2",
      "title": "Ein Tag, eine Geschichte",
      "subtitle": "Secuencia un día de viaje entero — mezclando sein, haben, war y hatte",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "a2m2l7",
      "phaseId": "a2m2",
      "title": "Nico unterwegs",
      "subtitle": "Mini-cuento: el primer viaje de Nico desde Berlín",
      "minutes": 11,
      "nEx": 16
     }
    ]
   },
   {
    "id": "a2m3",
    "level": "a2",
    "n": 3,
    "title": "Meine Geschichte",
    "goal": "Contar tu biografía: de niño, la escuela, y lo que podías/debías/querías con los modales en Präteritum.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "a2m3l1",
      "phaseId": "a2m3",
      "title": "Als Kind…",
      "subtitle": "El chunk estrella para abrir cualquier biografía",
      "minutes": 9,
      "nEx": 8
     },
     {
      "id": "a2m3l2",
      "phaseId": "a2m3",
      "title": "konnte, musste, wollte",
      "subtitle": "Los modales viajan al pasado — y pierden el Umlaut",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "a2m3l3",
      "phaseId": "a2m3",
      "title": "Die Schule",
      "subtitle": "Grundschule, Gymnasium y el misterio de las notas al revés",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m3l4",
      "phaseId": "a2m3",
      "title": "durfte (nicht)",
      "subtitle": "Los permisos de la infancia — y el matiz dürfen/können",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m3l5",
      "phaseId": "a2m3",
      "title": "Mit sechs Jahren",
      "subtitle": "Las marcas temporales que ordenan tu biografía",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m3l6",
      "phaseId": "a2m3",
      "title": "Interview mit Oma",
      "subtitle": "Las preguntas biográficas — y un diálogo modelo para robar",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m3l7",
      "phaseId": "a2m3",
      "title": "Nico als Kind",
      "subtitle": "Mini-cuento — la infancia de Nico, del sueño de futbolista a cocinero",
      "minutes": 11,
      "nEx": 12
     }
    ]
   },
   {
    "id": "a2m4",
    "level": "a2",
    "n": 4,
    "title": "Der Dativ im Alltag",
    "goal": "Dar, ayudar, gustar y pertenecer: el dativo completo — artículos, pronombres y sus verbos.",
    "color": "#0d9488",
    "lessons": [
     {
      "id": "a2m4l1",
      "phaseId": "a2m4",
      "title": "Wem?",
      "subtitle": "La pregunta del que recibe — y tres verbos que siempre la hacen",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m4l2",
      "phaseId": "a2m4",
      "title": "dem, der, dem",
      "subtitle": "Los artículos del dativo — frente al acusativo que ya dominas",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m4l3",
      "phaseId": "a2m4",
      "title": "mir, dir, ihm...",
      "subtitle": "Los pronombres del dativo — la familia completa",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m4l4",
      "phaseId": "a2m4",
      "title": "schmeckt mir!",
      "subtitle": "Los verbos que te sientan: schmecken, passen, stehen, danken",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m4l5",
      "phaseId": "a2m4",
      "title": "mit, nach, von, zu...",
      "subtitle": "Las siete preposiciones que SIEMPRE piden dativo",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m4l6",
      "phaseId": "a2m4",
      "title": "Geschenke",
      "subtitle": "Regalar = dativo + acusativo: a quién, y luego qué",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m4l7",
      "phaseId": "a2m4",
      "title": "Nico hilft",
      "subtitle": "Mini-cuento — Oma Ilse llama a la puerta de Nico",
      "minutes": 11,
      "nEx": 13
     }
    ]
   },
   {
    "id": "a2m5",
    "level": "a2",
    "n": 5,
    "title": "Wo oder wohin?",
    "goal": "Decir dónde está todo y a dónde va: las Wechselpräpositionen con Akkusativ y Dativ.",
    "color": "#4d7c0f",
    "lessons": [
     {
      "id": "a2m5l1",
      "phaseId": "a2m5",
      "title": "Wo ist mein Handy?",
      "subtitle": "Buscar cosas — y los tres verbos de ESTAR del alemán",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m5l2",
      "phaseId": "a2m5",
      "title": "Wo (Dativ) vs Wohin (Akkusativ)",
      "subtitle": "La regla del módulo — foto quieta o flecha en movimiento",
      "minutes": 11,
      "nEx": 9
     },
     {
      "id": "a2m5l3",
      "phaseId": "a2m5",
      "title": "legen, stellen, hängen",
      "subtitle": "Los verbos de PONER — y los pares mínimos que delatan el caso",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m5l4",
      "phaseId": "a2m5",
      "title": "Mein Zimmer",
      "subtitle": "Describe tu cuarto entero — posiciones encadenadas en Dativ",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m5l5",
      "phaseId": "a2m5",
      "title": "In der Stadt",
      "subtitle": "Lugares nuevos y el chunk mágico: Wie komme ich zu ...?",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m5l6",
      "phaseId": "a2m5",
      "title": "Umzug",
      "subtitle": "La mudanza — todo a su sitio, en ráfaga de Akkusativ",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "a2m5l7",
      "phaseId": "a2m5",
      "title": "Nicos neues Zimmer",
      "subtitle": "Mini-cuento — la mudanza de Nico, del caos a lo acogedor",
      "minutes": 11,
      "nEx": 12
     }
    ]
   },
   {
    "id": "a2m6",
    "level": "a2",
    "n": 6,
    "title": "Weil es wichtig ist",
    "goal": "Dar razones, opinar y poner condiciones: weil, dass y wenn — con el verbo al final.",
    "color": "#be185d",
    "lessons": [
     {
      "id": "a2m6l1",
      "phaseId": "a2m6",
      "title": "Warum? — Weil...",
      "subtitle": "La pregunta que pide razones — y tus respuestas listas",
      "minutes": 8,
      "nEx": 8
     },
     {
      "id": "a2m6l2",
      "phaseId": "a2m6",
      "title": "El verbo se va al final",
      "subtitle": "LA regla del A2 — la subordinada manda el verbo a la cola",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m6l3",
      "phaseId": "a2m6",
      "title": "Ich denke, dass...",
      "subtitle": "Opinar como un nativo — dass abre tu opinión y manda el verbo al final",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m6l4",
      "phaseId": "a2m6",
      "title": "wenn: condiciones y rutinas",
      "subtitle": "Si llueve... — y la inversión tras la coma",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m6l5",
      "phaseId": "a2m6",
      "title": "weil + Perfekt y modales",
      "subtitle": "Dos verbos en la cola — y el conjugado cierra la puerta",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m6l6",
      "phaseId": "a2m6",
      "title": "deshalb y denn",
      "subtitle": "Las alternativas que NO mandan el verbo al final",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m6l7",
      "phaseId": "a2m6",
      "title": "Nico erklärt",
      "subtitle": "Mini-cuento — por qué Nico ama Berlín (y qué le costó)",
      "minutes": 11,
      "nEx": 13
     }
    ]
   },
   {
    "id": "a2m7",
    "level": "a2",
    "n": 7,
    "title": "Besser als gestern",
    "goal": "Comparar todo: más grande, más barato, el mejor — y comprar con criterio.",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "a2m7l1",
      "phaseId": "a2m7",
      "title": "größer, kleiner, billiger",
      "subtitle": "El -er que lo compara todo — y su Umlaut de propina",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m7l2",
      "phaseId": "a2m7",
      "title": "als",
      "subtitle": "Comparar dos cosas — y el «que» que NUNCA es wie",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m7l3",
      "phaseId": "a2m7",
      "title": "am besten, am liebsten",
      "subtitle": "El podio completo — y los tres irregulares estrella",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m7l4",
      "phaseId": "a2m7",
      "title": "Im Geschäft",
      "subtitle": "El guion completo del probador — con ofertas y descuentos",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m7l5",
      "phaseId": "a2m7",
      "title": "genauso ... wie",
      "subtitle": "La igualdad — y el duelo final als contra wie",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m7l6",
      "phaseId": "a2m7",
      "title": "Das beste Angebot",
      "subtitle": "Precios, tallas, calidad — decidir como un comprador listo",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "a2m7l7",
      "phaseId": "a2m7",
      "title": "Nico kauft ein",
      "subtitle": "Mini-cuento — un traje, tres tiendas y una boda sorpresa",
      "minutes": 11,
      "nEx": 13
     }
    ]
   },
   {
    "id": "a2m8",
    "level": "a2",
    "n": 8,
    "title": "Körper und Kopf",
    "goal": "Hablar de tu cuerpo y tu ánimo: reflexivos, consejos con sollten y la cita médica completa.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "a2m8l1",
      "phaseId": "a2m8",
      "title": "Wie fühlst du dich?",
      "subtitle": "La pregunta del ánimo — y tus respuestas con espejo",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m8l2",
      "phaseId": "a2m8",
      "title": "mich, dich, sich",
      "subtitle": "La tabla del espejo — y el transform que la clava",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m8l3",
      "phaseId": "a2m8",
      "title": "Der Körper genau",
      "subtitle": "Rücken, Schulter, Knie — y la fábrica -schmerzen",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m8l4",
      "phaseId": "a2m8",
      "title": "Du solltest...",
      "subtitle": "El consejo con guante: sollten frente al muss de siempre",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m8l5",
      "phaseId": "a2m8",
      "title": "Beim Arzt",
      "subtitle": "La cita completa con Sie — del teléfono al Rezept",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m8l6",
      "phaseId": "a2m8",
      "title": "Seit wann?",
      "subtitle": "seit + Dativ con dolencias — y la visita entera en orden",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m8l7",
      "phaseId": "a2m8",
      "title": "Nico beim Zahnarzt",
      "subtitle": "Mini-cuento — una muela rebelde justo antes de la gran cena",
      "minutes": 11,
      "nEx": 14
     }
    ]
   },
   {
    "id": "a2m9",
    "level": "a2",
    "n": 9,
    "title": "Zusammen feiern",
    "goal": "Invitar, felicitar y organizar una fiesta — con el imperativo de du/ihr y el genitivo -s.",
    "color": "#a21caf",
    "lessons": [
     {
      "id": "a2m9l1",
      "phaseId": "a2m9",
      "title": "Die Einladung",
      "subtitle": "Invitar y responder — el sí, el no cortés y la fiesta",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m9l2",
      "phaseId": "a2m9",
      "title": "Komm! Kommt!",
      "subtitle": "El imperativo de du y de ihr — órdenes entre amigos",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m9l3",
      "phaseId": "a2m9",
      "title": "Herzlichen Glückwunsch!",
      "subtitle": "Felicitar todo el año — cumpleaños, Navidad y año nuevo",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m9l4",
      "phaseId": "a2m9",
      "title": "Annas Geburtstags-Party",
      "subtitle": "El genitivo -s de los nombres — y qué traer a la fiesta",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m9l5",
      "phaseId": "a2m9",
      "title": "Handy und Internet",
      "subtitle": "Mensajes, fotos y llamadas — la invitación viaja por el móvil",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m9l6",
      "phaseId": "a2m9",
      "title": "Die Party planen",
      "subtitle": "De la invitación al baile — la secuencia completa, con órdenes",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m9l7",
      "phaseId": "a2m9",
      "title": "Nicos Überraschung",
      "subtitle": "Mini-cuento — la fiesta sorpresa para Anna",
      "minutes": 11,
      "nEx": 13
     }
    ]
   },
   {
    "id": "a2m10",
    "level": "a2",
    "n": 10,
    "title": "Arbeit und Pläne",
    "goal": "Hablar de tu trabajo, tu formación y tus planes — y poner condiciones con wenn.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "a2m10l1",
      "phaseId": "a2m10",
      "title": "Mein Arbeitstag",
      "subtitle": "Kollege, Chef, Pause — y la palabra sagrada: Feierabend",
      "minutes": 9,
      "nEx": 9
     },
     {
      "id": "a2m10l2",
      "phaseId": "a2m10",
      "title": "Die Ausbildung",
      "subtitle": "Praktikum, Universität, Deutschkurs — tu biografía formativa",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m10l3",
      "phaseId": "a2m10",
      "title": "Ich möchte ... werden",
      "subtitle": "werden: el verbo de tu futuro — y träumen von para tus sueños",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "a2m10l4",
      "phaseId": "a2m10",
      "title": "Wenn ich Zeit habe...",
      "subtitle": "La condición real: verbo al final — y tras la coma, inversión",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m10l5",
      "phaseId": "a2m10",
      "title": "Der Termin",
      "subtitle": "Kalender, Plan, pünktlich — la agenda alemana en serio",
      "minutes": 9,
      "nEx": 10
     },
     {
      "id": "a2m10l6",
      "phaseId": "a2m10",
      "title": "Traumjob",
      "subtitle": "mehr Geld, weniger Stress — describe tu trabajo ideal y da razones",
      "minutes": 10,
      "nEx": 9
     },
     {
      "id": "a2m10l7",
      "phaseId": "a2m10",
      "title": "Nicos Plan",
      "subtitle": "Mini-cuento — Nico decide qué quiere de verdad",
      "minutes": 11,
      "nEx": 16
     }
    ]
   },
   {
    "id": "a2exam",
    "level": "a2",
    "n": 11,
    "title": "Rumbo al A2",
    "goal": "Conocer el Goethe-Zertifikat A2 por dentro: cada Teil, su estrategia y práctica real.",
    "color": "#7f1d1d",
    "lessons": [
     {
      "id": "a2examl1",
      "phaseId": "a2exam",
      "title": "El examen por dentro",
      "subtitle": "El mapa del Goethe-Zertifikat A2 — y en qué cambia respecto al A1",
      "minutes": 10,
      "nEx": 8
     },
     {
      "id": "a2examl2",
      "phaseId": "a2exam",
      "title": "Hören con estrategia",
      "subtitle": "Los 4 Teile del oído — y qué número ir a cazar en cada uno",
      "minutes": 18,
      "nEx": 26
     },
     {
      "id": "a2examl3",
      "phaseId": "a2exam",
      "title": "Lesen con estrategia",
      "subtitle": "Anuncios, correos y el arte de leer por encima",
      "minutes": 11,
      "nEx": 9
     },
     {
      "id": "a2examl4",
      "phaseId": "a2exam",
      "title": "Schreiben: la nota y el correo",
      "subtitle": "Dos plantillas ganadoras — 3 puntos, saludo y despedida que puntúan",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "a2examl5",
      "phaseId": "a2exam",
      "title": "Sprechen zu zweit",
      "subtitle": "Teil 3: planear algo JUNTOS — proponer, rechazar con arte y cerrar el trato",
      "minutes": 11,
      "nEx": 9
     },
     {
      "id": "a2examl6",
      "phaseId": "a2exam",
      "title": "Generalprobe",
      "subtitle": "Mini-cuento: Sofía hace el examen A2 — y tu frase de graduación",
      "minutes": 11,
      "nEx": 9
     }
    ]
   },
   {
    "id": "b1m1",
    "level": "b1",
    "n": 1,
    "title": "Ankommen und Wohnen",
    "goal": "Contar una mudanza, entender un anuncio de piso y describir con Relativsätze (Nominativ y Akkusativ) el piso, el casero y los vecinos que te tocan.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "b1m1l1",
      "phaseId": "b1m1",
      "title": "Angekommen",
      "subtitle": "Bienvenido al B1 — y tu mudanza contada en una frase",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "b1m1l2",
      "phaseId": "b1m1",
      "title": "Die Wohnungssuche",
      "subtitle": "Descifrar un anuncio alemán: KM, NK, WM, Kaution",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "b1m1l3",
      "phaseId": "b1m1",
      "title": "Eine Wohnung, die hell ist",
      "subtitle": "Relativsätze en Nominativ — der, die, das",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m1l4",
      "phaseId": "b1m1",
      "title": "Der Vertrag, den ich unterschreibe",
      "subtitle": "Relativsätze en Akkusativ — y quién manda el caso de verdad",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m1l5",
      "phaseId": "b1m1",
      "title": "Das „que“, das keins ist",
      "subtitle": "Clínica: dass · der/die/das · als — tres «que» distintos",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m1l6",
      "phaseId": "b1m1",
      "title": "200 Bewerber für 60 Quadratmeter",
      "subtitle": "Lectura larga — la crisis de la vivienda, contada desde Viena",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "b1m1l7",
      "phaseId": "b1m1",
      "title": "Die Nachbarn und die Hausordnung",
      "subtitle": "Escuchar, entender y quejarse con educación",
      "minutes": 12,
      "nEx": 15
     },
     {
      "id": "b1m1l8",
      "phaseId": "b1m1",
      "title": "Schreib mir mal!",
      "subtitle": "Escritura — el correo informal de la mudanza (80 palabras)",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m1l9",
      "phaseId": "b1m1",
      "title": "Sofía zieht um",
      "subtitle": "La historia del módulo, el repaso de lo anterior y tu primer monólogo",
      "minutes": 16,
      "nEx": 19
     }
    ]
   },
   {
    "id": "b1m2",
    "level": "b1",
    "n": 2,
    "title": "Arbeit, die passt",
    "goal": "Opinar sobre horarios fijos y flexibles, negociar condiciones con Konjunktiv II de cortesía y encadenar subordinadas con obwohl, damit y falls.",
    "color": "#0891b2",
    "lessons": [
     {
      "id": "b1m2l1",
      "phaseId": "b1m2",
      "title": "Neun bis fünf?",
      "subtitle": "Horarios fijos, Gleitzeit y horas extra",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "b1m2l2",
      "phaseId": "b1m2",
      "title": "Homeoffice",
      "subtitle": "El teletrabajo — y «obwohl», la concesión que el examen premia",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m2l3",
      "phaseId": "b1m2",
      "title": "damit, falls, um … zu",
      "subtitle": "Finalidad y condición — las tres subordinadas que faltaban",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m2l4",
      "phaseId": "b1m2",
      "title": "Könnten Sie …?",
      "subtitle": "Konjunktiv II de cortesía — pedir sin sonar a orden",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m2l5",
      "phaseId": "b1m2",
      "title": "Wenn ich Zeit hätte …",
      "subtitle": "Clínica: ¿pasó de verdad o es hipótesis? Solo el Umlaut lo dice",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m2l6",
      "phaseId": "b1m2",
      "title": "Gleitzeit für alle?",
      "subtitle": "Lectura larga — un artículo de opinión desde Suiza",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "b1m2l7",
      "phaseId": "b1m2",
      "title": "Das Vorstellungsgespräch",
      "subtitle": "Escuchar, presentarse y negociar condiciones",
      "minutes": 13,
      "nEx": 15
     },
     {
      "id": "b1m2l8",
      "phaseId": "b1m2",
      "title": "Deine Meinung im Forum",
      "subtitle": "Escritura — el comentario de opinión (80 palabras)",
      "minutes": 15,
      "nEx": 15
     },
     {
      "id": "b1m2l9",
      "phaseId": "b1m2",
      "title": "Nico verhandelt",
      "subtitle": "La historia del módulo, el repaso de lo anterior y tu monólogo",
      "minutes": 24,
      "nEx": 27
     }
    ]
   },
   {
    "id": "b1m3",
    "level": "b1",
    "n": 3,
    "title": "Gesund bleiben",
    "goal": "Hablar de salud, deporte y sedentarismo, entender y producir la pasiva alemana (werden + Partizip) y dar consejos con el imperativo.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "b1m3l1",
      "phaseId": "b1m3",
      "title": "Sitzen ist das neue Rauchen",
      "subtitle": "El eslogan que abre todos los debates de salud en el DACH",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "b1m3l2",
      "phaseId": "b1m3",
      "title": "werden + Partizip: la pasiva",
      "subtitle": "Cómo dice el alemán lo que tú dices con «se»",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m3l3",
      "phaseId": "b1m3",
      "title": "man ↔ Passiv",
      "subtitle": "La trampa nº1: tu «se» tiene dos traducciones y solo usas una",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m3l4",
      "phaseId": "b1m3",
      "title": "Beweg dich!",
      "subtitle": "El imperativo de consejo — y su versión suave",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "b1m3l5",
      "phaseId": "b1m3",
      "title": "Clínica: quién le hace qué a quién",
      "subtitle": "El principio del primer sustantivo — y cómo desactivarlo",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m3l6",
      "phaseId": "b1m3",
      "title": "Lesen: Sitzen ist das neue Rauchen",
      "subtitle": "Lectura larga de prensa — leer para inferir, no para localizar",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m3l7",
      "phaseId": "b1m3",
      "title": "Beim Arzt",
      "subtitle": "Pedir cita, explicar molestias, entender lo que te dicen",
      "minutes": 12,
      "nEx": 15
     },
     {
      "id": "b1m3l8",
      "phaseId": "b1m3",
      "title": "Schreiben: Sport im Betrieb",
      "subtitle": "Comentario de foro — el género que más se suspende del examen",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "b1m3l9",
      "phaseId": "b1m3",
      "title": "Lucías Experiment",
      "subtitle": "Historia larga, espiral de los módulos anteriores y tu monólogo de 3 minutos",
      "minutes": 26,
      "nEx": 27
     }
    ]
   },
   {
    "id": "b1m4",
    "level": "b1",
    "n": 4,
    "title": "Immer online",
    "goal": "Opinar sobre redes, videojuegos y móviles: hablar en hipótesis con Konjunktiv II y manejar los verbos con preposición y sus da-/wo-Komposita.",
    "color": "#4f46e5",
    "lessons": [
     {
      "id": "b1m4l1",
      "phaseId": "b1m4",
      "title": "Immer online",
      "subtitle": "Bildschirmzeit, scrollen y la distracción que no se ve",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "b1m4l2",
      "phaseId": "b1m4",
      "title": "Wenn ich mehr Zeit hätte…",
      "subtitle": "Konjunktiv II hipotético — y el error diagnóstico del nivel",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m4l3",
      "phaseId": "b1m4",
      "title": "Verben mit Präposition (1)",
      "subtitle": "warten AUF, denken AN, sich freuen AUF/ÜBER — bloques, no palabras",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m4l4",
      "phaseId": "b1m4",
      "title": "Verben mit Präposition (2)",
      "subtitle": "abhängen VON, teilnehmen AN, sich kümmern UM — y el caso que arrastran",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m4l5",
      "phaseId": "b1m4",
      "title": "Clínica: darauf, worauf",
      "subtitle": "Los da-/wo-Komposita — lo que el español no tiene",
      "minutes": 13,
      "nEx": 14
     },
     {
      "id": "b1m4l6",
      "phaseId": "b1m4",
      "title": "Lesen: Videospiele verbieten?",
      "subtitle": "Lectura larga de prensa suiza — el tema estrella del examen",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m4l7",
      "phaseId": "b1m4",
      "title": "Handys im Unterricht",
      "subtitle": "Escuchar el debate: padres, profesora y alumnos",
      "minutes": 12,
      "nEx": 15
     },
     {
      "id": "b1m4l8",
      "phaseId": "b1m4",
      "title": "Schreiben: Mail an Nico",
      "subtitle": "Correo informal de 80 palabras — los 3 puntos de contenido lo son todo",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m4l9",
      "phaseId": "b1m4",
      "title": "Leos Woche ohne Handy",
      "subtitle": "Historia larga, espiral de b1m2 y b1m3, y tu monólogo de 3 minutos",
      "minutes": 18,
      "nEx": 20
     }
    ]
   },
   {
    "id": "b1m5",
    "level": "b1",
    "n": 5,
    "title": "Unsere Umwelt",
    "goal": "Discutir reciclaje, tráfico y límites de velocidad usando la pasiva con modal y en Perfekt, y argumentar comparando (je… desto).",
    "color": "#15803d",
    "lessons": [
     {
      "id": "b1m5l1",
      "phaseId": "b1m5",
      "title": "Müll trennen",
      "subtitle": "La frase sin culpable: wird + Partizip (y el man que ya usas)",
      "minutes": 10,
      "nEx": 10
     },
     {
      "id": "b1m5l2",
      "phaseId": "b1m5",
      "title": "Das muss recycelt werden",
      "subtitle": "Pasiva con modal — el orden que nadie adivina desde el español",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m5l3",
      "phaseId": "b1m5",
      "title": "Es ist gebaut worden",
      "subtitle": "Pasiva en pasado — y worden, que no es geworden",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m5l4",
      "phaseId": "b1m5",
      "title": "Je schneller, desto teurer",
      "subtitle": "Comparar para argumentar: als, am …sten y el je… desto del examen",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m5l5",
      "phaseId": "b1m5",
      "title": "Clínica: la pasiva contra el «se»",
      "subtitle": "Segunda pasada de la trampa — y las preposiciones que van pegadas al verbo",
      "minutes": 12,
      "nEx": 14
     },
     {
      "id": "b1m5l6",
      "phaseId": "b1m5",
      "title": "Lesen: die neue Abfallordnung",
      "subtitle": "Texto normativo — el Lesen Teil 5 del examen, con austriacismos",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "b1m5l7",
      "phaseId": "b1m5",
      "title": "Im Radio: Tempo 130?",
      "subtitle": "Escucha una discusión y quédate con la postura, no con los datos",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m5l8",
      "phaseId": "b1m5",
      "title": "Dein Kommentar im Forum",
      "subtitle": "Schreiben Aufgabe 2 — 80 palabras que reaccionan y argumentan",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m5l9",
      "phaseId": "b1m5",
      "title": "Eine Woche ohne Auto",
      "subtitle": "La historia larga del módulo, la espiral y tu monólogo de 3 minutos",
      "minutes": 23,
      "nEx": 27
     }
    ]
   },
   {
    "id": "b1m6",
    "level": "b1",
    "n": 6,
    "title": "Lernen ein Leben lang",
    "goal": "Hablar de guarderías, cursos, universidad y formación profesional encadenando subordinadas sin perder el verbo, y contar lo que dijo otra persona.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "b1m6l1",
      "phaseId": "b1m6",
      "title": "Krippe ab wann?",
      "subtitle": "El tema que divide a Alemania — y el verbo que se va al final",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m6l2",
      "phaseId": "b1m6",
      "title": "…, weil ich arbeiten muss",
      "subtitle": "La pila de verbos: subordinada con modal y en Perfekt",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "b1m6l3",
      "phaseId": "b1m6",
      "title": "Zwei Nebensätze hintereinander",
      "subtitle": "Cuando una subordinada lleva otra dentro — y nadie se pierde",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "b1m6l4",
      "phaseId": "b1m6",
      "title": "Er sagt, dass… / Er sagte, er habe…",
      "subtitle": "Contar lo que dijo otro — con dass, sin dass y como la prensa",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m6l5",
      "phaseId": "b1m6",
      "title": "Clínica: ¿al final o inversión?",
      "subtitle": "Las tres familias de conectores, de una vez y para siempre",
      "minutes": 12,
      "nEx": 14
     },
     {
      "id": "b1m6l6",
      "phaseId": "b1m6",
      "title": "Lesen: Mit 30 noch einmal von vorn",
      "subtitle": "Un reportaje de prensa — inferir la postura, no buscar datos",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "b1m6l7",
      "phaseId": "b1m6",
      "title": "Beratung an der Volkshochschule",
      "subtitle": "Escucha una consulta real y quédate con lo que hay que hacer",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m6l8",
      "phaseId": "b1m6",
      "title": "Schreiben: E-Mail an Anna",
      "subtitle": "Schreiben Aufgabe 1 — 80 palabras, tres puntos y ni uno menos",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m6l9",
      "phaseId": "b1m6",
      "title": "Carmen holt den Abschluss nach",
      "subtitle": "La historia larga, la espiral de los módulos anteriores y tu monólogo",
      "minutes": 15,
      "nEx": 20
     }
    ]
   },
   {
    "id": "b1m7",
    "level": "b1",
    "n": 7,
    "title": "Feste und Traditionen",
    "goal": "Hablar y escribir sobre las fiestas del espacio germanohablante — Alemania, Austria y Suiza — con genitivo y con participios usados como adjetivos.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "b1m7l1",
      "phaseId": "b1m7",
      "title": "Das Fest des Jahres",
      "subtitle": "El genitivo: el «de» que el alemán escribe con caso",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "b1m7l2",
      "phaseId": "b1m7",
      "title": "während, wegen, trotz",
      "subtitle": "Las preposiciones que exigen genitivo (y la trampa de la calle)",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m7l3",
      "phaseId": "b1m7",
      "title": "Das kommende Fest",
      "subtitle": "Partizip I: la relativa española convertida en adjetivo",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "b1m7l4",
      "phaseId": "b1m7",
      "title": "Die gefeierte Tradition",
      "subtitle": "Partizip II: lo que ya está hecho, convertido en adjetivo",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m7l5",
      "phaseId": "b1m7",
      "title": "Clínica: adjetivos en frases largas",
      "subtitle": "Donde se pierden las bandas — producir la terminación en caliente",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m7l6",
      "phaseId": "b1m7",
      "title": "Lesen: ein Winter in Wien",
      "subtitle": "Lectura larga austriaca — con nota al pie, como en el examen",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "b1m7l7",
      "phaseId": "b1m7",
      "title": "Hören: Fasnacht in Basel",
      "subtitle": "Suiza al oído — y las cuatro de la madrugada a oscuras",
      "minutes": 15,
      "nEx": 14
     },
     {
      "id": "b1m7l8",
      "phaseId": "b1m7",
      "title": "Schreiben: dein Kommentar",
      "subtitle": "El comentario de foro — 80 palabras que valen 40 puntos",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "b1m7l9",
      "phaseId": "b1m7",
      "title": "Sofía an der Fasnacht",
      "subtitle": "Historia larga, espiral de los dos módulos anteriores y monólogo",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "b1m8",
    "level": "b1",
    "n": 8,
    "title": "Geld und Konsum",
    "goal": "Comprar y devolver por internet, entender un contrato, reclamar por escrito en registro formal y hablar de tu presupuesto con Futur I.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "b1m8l1",
      "phaseId": "b1m8",
      "title": "Der Warenkorb ist voll",
      "subtitle": "Comprar online: del carrito a la factura",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m8l2",
      "phaseId": "b1m8",
      "title": "Ich werde bezahlen",
      "subtitle": "Futur I: werden + Infinitiv, y cuándo NO usarlo",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m8l3",
      "phaseId": "b1m8",
      "title": "Falls das Paket nicht ankommt",
      "subtitle": "wenn y falls: la condición que dispara el futuro",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m8l4",
      "phaseId": "b1m8",
      "title": "Das Kleingedruckte",
      "subtitle": "Contratos, plazos y la fábrica de sustantivos",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m8l5",
      "phaseId": "b1m8",
      "title": "Clínica: du oder Sie?",
      "subtitle": "El mismo contenido, dos registros — y el examen los pide con 20 minutos de diferencia",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m8l6",
      "phaseId": "b1m8",
      "title": "Lesen: jetzt bestellen, später zahlen",
      "subtitle": "Texto de prensa — y las preguntas que no están escritas",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "b1m8l7",
      "phaseId": "b1m8",
      "title": "Hören: Anruf beim Kundenservice",
      "subtitle": "La llamada — una sola escucha, como en el Teil 3",
      "minutes": 17,
      "nEx": 16
     },
     {
      "id": "b1m8l8",
      "phaseId": "b1m8",
      "title": "Schreiben: die Beschwerde-Mail",
      "subtitle": "El mail formal de la Aufgabe 3 — Anrede, Gruß y ni un «du» en 40 palabras",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "b1m8l9",
      "phaseId": "b1m8",
      "title": "Nicos Ofen",
      "subtitle": "Historia larga, espiral de los dos módulos anteriores y monólogo",
      "minutes": 16,
      "nEx": 14
     }
    ]
   },
   {
    "id": "b1m9",
    "level": "b1",
    "n": 9,
    "title": "Unterwegs im DACH",
    "goal": "Moverte por Alemania, Austria y Suiza: billetes, transbordos, alojamiento y reclamaciones — con el adjetivo declinado saliendo solo dentro de frases largas.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "b1m9l1",
      "phaseId": "b1m9",
      "title": "Die Fahrkarte, bitte",
      "subtitle": "Comprar el billete — y el adjetivo tras der/die/das",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m9l2",
      "phaseId": "b1m9",
      "title": "Der Zug hat Verspätung",
      "subtitle": "Transbordos y retrasos — y el adjetivo tras ein/kein/mein",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "b1m9l3",
      "phaseId": "b1m9",
      "title": "Ein Zimmer für zwei Nächte",
      "subtitle": "Alojamiento — y el adjetivo SIN artículo, el que casi nadie produce",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m9l4",
      "phaseId": "b1m9",
      "title": "Wenn etwas schiefgeht",
      "subtitle": "Maleta perdida, habitación ruidosa — reclamar sin sonar grosero",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m9l5",
      "phaseId": "b1m9",
      "title": "Klinik: die Endung entscheidet",
      "subtitle": "Processing Instruction — la terminación como ÚNICO indicio",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "b1m9l6",
      "phaseId": "b1m9",
      "title": "Lesen: die Schweiz und ihr Billett",
      "subtitle": "Lectura larga — prensa suiza, con nota al pie de helvetismos",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "b1m9l7",
      "phaseId": "b1m9",
      "title": "Durchsagen verstehen",
      "subtitle": "Megafonía y ventanilla — entender a la primera",
      "minutes": 15,
      "nEx": 16
     },
     {
      "id": "b1m9l8",
      "phaseId": "b1m9",
      "title": "Schreiben: Nachtzug oder Billigflug?",
      "subtitle": "Comentario de foro de 80 palabras — el género que más puntos cuesta",
      "minutes": 15,
      "nEx": 15
     },
     {
      "id": "b1m9l9",
      "phaseId": "b1m9",
      "title": "Die lange Reise",
      "subtitle": "Historia larga, espiral de los módulos 7 y 8, y tu monólogo",
      "minutes": 28,
      "nEx": 22
     }
    ]
   },
   {
    "id": "b1m10",
    "level": "b1",
    "n": 10,
    "title": "Menschen und Gefühle",
    "goal": "Hablar de amistad y convivencia, dar consejo en Konjunktiv II, discutir sin herir y pedir perdón — diciendo lo mismo sin sonar brusco.",
    "color": "#9d174d",
    "lessons": [
     {
      "id": "b1m10l1",
      "phaseId": "b1m10",
      "title": "Freunde, auf die man sich verlässt",
      "subtitle": "Hablar de amistad — y el «seit» que en alemán va en presente",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m10l2",
      "phaseId": "b1m10",
      "title": "Streit ums Putzen",
      "subtitle": "Convivencia y roces — enfadarse y tener consideración, con su preposición",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m10l3",
      "phaseId": "b1m10",
      "title": "An deiner Stelle würde ich…",
      "subtitle": "Dar consejo en Konjunktiv II — las tres fórmulas que lo hacen todo",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "b1m10l4",
      "phaseId": "b1m10",
      "title": "Es tut mir leid",
      "subtitle": "Pedir perdón de verdad — y arreglar un malentendido",
      "minutes": 12,
      "nEx": 11
     },
     {
      "id": "b1m10l5",
      "phaseId": "b1m10",
      "title": "Klinik: damit oder um…zu",
      "subtitle": "Processing Instruction — el sujeto decide, no el significado",
      "minutes": 13,
      "nEx": 14
     },
     {
      "id": "b1m10l6",
      "phaseId": "b1m10",
      "title": "Lesen: Streiten will gelernt sein",
      "subtitle": "Lectura larga — revista austriaca, con nota al pie de austriacismos",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "b1m10l7",
      "phaseId": "b1m10",
      "title": "Richtig zuhören",
      "subtitle": "Escuchar y responder sin encender la mecha",
      "minutes": 16,
      "nEx": 17
     },
     {
      "id": "b1m10l8",
      "phaseId": "b1m10",
      "title": "Schreiben: die Mail nach dem Streit",
      "subtitle": "Correo informal de 80 palabras — disculparse y proponer una cita",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "b1m10l9",
      "phaseId": "b1m10",
      "title": "Der Streit und danach",
      "subtitle": "Historia larga, espiral de los módulos 8 y 9, y tu monólogo",
      "minutes": 20,
      "nEx": 15
     }
    ]
   },
   {
    "id": "b1m11",
    "level": "b1",
    "n": 11,
    "title": "Pläne und Zukunft",
    "goal": "Hablar y escribir de tus planes con Futur I y II, y subir de registro nominalizando (das Lernen, die Entscheidung) sin caer en los falsos amigos de nivel medio.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "b1m11l1",
      "phaseId": "b1m11",
      "title": "Ich werde im Ausland arbeiten",
      "subtitle": "Futur I: werden en 2ª posición, el infinitivo al final",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m11l2",
      "phaseId": "b1m11",
      "title": "Der Traumjob",
      "subtitle": "Solicitar un puesto: sich um … bewerben y la rección que nadie adivina",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m11l3",
      "phaseId": "b1m11",
      "title": "Ins Ausland ziehen",
      "subtitle": "Emigrar: la oportunidad, la estancia y el «eventuell» que engaña",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m11l4",
      "phaseId": "b1m11",
      "title": "das Lernen, die Entscheidung",
      "subtitle": "Nominalisierung: el salto de registro que separa el B1 del A2",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "b1m11l5",
      "phaseId": "b1m11",
      "title": "Clínica: Futur II y los falsos amigos",
      "subtitle": "Lo que estará hecho, lo que supones — y ocho palabras que te traicionan",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "b1m11l6",
      "phaseId": "b1m11",
      "title": "Lesen: Ein Semester in Wien",
      "subtitle": "Lectura larga de un blog austriaco — inferir la postura, no buscar datos",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "b1m11l7",
      "phaseId": "b1m11",
      "title": "Gute Vorsätze",
      "subtitle": "Escucha y conversación: propósitos, promesas y la excusa de siempre",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m11l8",
      "phaseId": "b1m11",
      "title": "Schreiben: Auswandern — Flucht oder Chance?",
      "subtitle": "Comentario de foro de 80 palabras: tesis, razón, concesión y cierre",
      "minutes": 16,
      "nEx": 16
     },
     {
      "id": "b1m11l9",
      "phaseId": "b1m11",
      "title": "Lucías Schritt",
      "subtitle": "Historia larga, espiral de los dos módulos anteriores y tu monólogo de 3 minutos",
      "minutes": 23,
      "nEx": 20
     }
    ]
   },
   {
    "id": "b1m12",
    "level": "b1",
    "n": 12,
    "title": "Rumbo al Goethe-Zertifikat B1",
    "goal": "Entrar al examen sabiendo exactamente qué te van a pedir en cada Teil, cuánto vale y cómo se resuelve — Lesen, Hören, Schreiben y Sprechen, uno por uno.",
    "color": "#b91c1c",
    "lessons": [
     {
      "id": "b1m12l1",
      "phaseId": "b1m12",
      "title": "El examen por dentro",
      "subtitle": "Modular, 100 puntos por módulo, corte en 60 y sin compensación",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "b1m12l2",
      "phaseId": "b1m12",
      "title": "Lesen Teil 1 y 2",
      "subtitle": "Richtig/Falsch sobre un texto personal · dos textos de prensa con MC de 3",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "b1m12l3",
      "phaseId": "b1m12",
      "title": "Lesen Teil 3 y 4",
      "subtitle": "El emparejamiento 7↔10 con la trampa del «0» · y siete lectores a favor o en contra",
      "minutes": 14,
      "nEx": 20
     },
     {
      "id": "b1m12l4",
      "phaseId": "b1m12",
      "title": "Lesen Teil 5",
      "subtitle": "El texto normativo: reglamentos, condiciones y letra pequeña",
      "minutes": 13,
      "nEx": 11
     },
     {
      "id": "b1m12l5",
      "phaseId": "b1m12",
      "title": "Hören Teil 1 y 2",
      "subtitle": "Dos escuchas… y luego UNA sola: la diferencia brutal del módulo",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "b1m12l6",
      "phaseId": "b1m12",
      "title": "Hören Teil 3 y 4",
      "subtitle": "Un diálogo sin red · y una discusión a tres voces: ¿quién dice qué?",
      "minutes": 17,
      "nEx": 23
     },
     {
      "id": "b1m12l7",
      "phaseId": "b1m12",
      "title": "Schreiben A1, A2 y A3",
      "subtitle": "Tres géneros en 60 minutos — y el registro du/Sie con 20 minutos de diferencia",
      "minutes": 18,
      "nEx": 15
     },
     {
      "id": "b1m12l8",
      "phaseId": "b1m12",
      "title": "Sprechen Teil 1 y 3",
      "subtitle": "Planificar algo con tu pareja (28 pts) · dar feedback y preguntar (16 pts)",
      "minutes": 20,
      "nEx": 16
     },
     {
      "id": "b1m12l9",
      "phaseId": "b1m12",
      "title": "Sprechen Teil 2: las cinco diapositivas",
      "subtitle": "La partitura del 40 % del oral — y son SIEMPRE las mismas",
      "minutes": 16,
      "nEx": 15
     }
    ]
   },
   {
    "id": "b2m1",
    "level": "b2",
    "n": 1,
    "title": "Was man so hört",
    "goal": "Contar lo que dijo otro sin firmarlo: Konjunktiv I, sustitución por K II, sollen/wollen de distanciamiento, y citar la fuente.",
    "color": "#6d28d9",
    "lessons": [
     {
      "id": "b2m1l1",
      "phaseId": "b2m1",
      "title": "Er sei krank",
      "subtitle": "El Konjunktiv I corto: sei, habe, komme, könne, müsse",
      "minutes": 12,
      "nEx": 10
     },
     {
      "id": "b2m1l2",
      "phaseId": "b2m1",
      "title": "Sie hätten keine Zeit",
      "subtitle": "Cuando el Konjunktiv I no se ve: se sustituye por K II",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m1l3",
      "phaseId": "b2m1",
      "title": "Er sei gekommen",
      "subtitle": "El pasado de la indirecta: una sola forma para tres tiempos",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m1l4",
      "phaseId": "b2m1",
      "title": "Er soll reich sein",
      "subtitle": "sollen y wollen de distanciamiento: un modal en lugar de una oración",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m1l5",
      "phaseId": "b2m1",
      "title": "Das Vorfeld und der Mittelfeld",
      "subtitle": "Clínica: dónde va todo lo que no es el verbo",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "b2m1l6",
      "phaseId": "b2m1",
      "title": "Zwei Stimmen, eine Meldung",
      "subtitle": "Lectura larga: dos textos que se contradicen",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "b2m1l7",
      "phaseId": "b2m1",
      "title": "Nachgefragt",
      "subtitle": "Escucha larga: tertulia, una pasada, cuaderno",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m1l8",
      "phaseId": "b2m1",
      "title": "Schreiben: zitieren, ohne zu unterschreiben",
      "subtitle": "Dos textos: mensaje formal (~100) y foro argumentativo (~150)",
      "minutes": 20,
      "nEx": 7
     },
     {
      "id": "b2m1l9",
      "phaseId": "b2m1",
      "title": "Sofía zitiert, ohne zu unterschreiben",
      "subtitle": "La historia del módulo y tu primer Vortrag de cuatro minutos",
      "minutes": 18,
      "nEx": 9
     }
    ]
   },
   {
    "id": "b2m2",
    "level": "b2",
    "n": 2,
    "title": "Wie es gemacht wird",
    "goal": "Describir procesos y normas sin decir quién: Zustandspassiv, pasiva impersonal, Ersatzformen, y elegir la salida alemana del «se».",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "b2m2l1",
      "phaseId": "b2m2",
      "title": "Ist geöffnet, wird geöffnet",
      "subtitle": "Estado o proceso: la primera elección de la pasiva",
      "minutes": 12,
      "nEx": 8
     },
     {
      "id": "b2m2l2",
      "phaseId": "b2m2",
      "title": "Es wird gestreikt",
      "subtitle": "Pasiva sin sujeto, y la de dativo que el español no produce",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m2l3",
      "phaseId": "b2m2",
      "title": "…, weil es erledigt werden muss",
      "subtitle": "Pasiva con modal, y la pila al final de la subordinada",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m2l4",
      "phaseId": "b2m2",
      "title": "Das lässt sich machen",
      "subtitle": "Las otras salidas: sich lassen, sein + zu, -bar, man",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m2l5",
      "phaseId": "b2m2",
      "title": "Fünf Wege aus dem «se»",
      "subtitle": "Clínica: el «se» español y sus cinco salidas alemanas",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m2l6",
      "phaseId": "b2m2",
      "title": "Wer darf den Plan ändern?",
      "subtitle": "Lectura larga: dos voces sobre el mismo cuadrante",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "b2m2l7",
      "phaseId": "b2m2",
      "title": "Die Küchensitzung",
      "subtitle": "Escucha larga: acta hablada, una pasada, cuaderno",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m2l8",
      "phaseId": "b2m2",
      "title": "Schreiben ohne Anklage",
      "subtitle": "Dos textos: Nachricht an den Chef (~100) y foro (~150)",
      "minutes": 20,
      "nEx": 22
     },
     {
      "id": "b2m2l9",
      "phaseId": "b2m2",
      "title": "Nico bleibt sachlich",
      "subtitle": "La historia del módulo y un Vortrag de cuatro minutos",
      "minutes": 18,
      "nEx": 8
     }
    ]
   },
   {
    "id": "b2m3",
    "level": "b2",
    "n": 3,
    "title": "Vom Verb zum Nomen",
    "goal": "Pasar del estilo verbal al nominal y volver: sufijos, seis pares de conversión, Funktionsverbgefüge, y saber cuándo no nominalizar.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "b2m3l1",
      "phaseId": "b2m3",
      "title": "Aus Verben werden Nomen",
      "subtitle": "Las fábricas: -ung, -heit/-keit, -nis, das + infinitivo",
      "minutes": 12,
      "nEx": 8
     },
     {
      "id": "b2m3l2",
      "phaseId": "b2m3",
      "title": "Weil wird zu aufgrund",
      "subtitle": "Seis pares: de subordinada a sintagma",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m3l3",
      "phaseId": "b2m3",
      "title": "Zur Verfügung stellen",
      "subtitle": "Funktionsverbgefüge: el verbo que ya no significa nada solo",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m3l4",
      "phaseId": "b2m3",
      "title": "Der Beschluss der Reform",
      "subtitle": "El genitivo como compresión, no como caso suelto",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m3l5",
      "phaseId": "b2m3",
      "title": "Das Lesen ist leicht, die Entscheidung zu gehen nicht",
      "subtitle": "Clínica: el infinitivo sustantivado que el español no fabrica igual",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m3l6",
      "phaseId": "b2m3",
      "title": "Zwei Auswertungen",
      "subtitle": "Lectura larga: un informe y una bitácora que no dicen lo mismo",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "b2m3l7",
      "phaseId": "b2m3",
      "title": "Nachgerechnet",
      "subtitle": "Escucha larga: estudio y prensa, una pasada, cuaderno",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m3l8",
      "phaseId": "b2m3",
      "title": "Schreiben im Nominalstil — und wieder raus",
      "subtitle": "Dos textos: Nachricht (~100) y foro (~150)",
      "minutes": 20,
      "nEx": 22
     },
     {
      "id": "b2m3l9",
      "phaseId": "b2m3",
      "title": "Sofía packt den Satz ein",
      "subtitle": "La historia del módulo y un Vortrag de cuatro minutos",
      "minutes": 18,
      "nEx": 8
     }
    ]
   },
   {
    "id": "b2m4",
    "level": "b2",
    "n": 4,
    "title": "Der eine lange Satz",
    "goal": "Comprimir y deshacer: atributo participial, Gerundivum, relativa con preposición y cuyo, y leer un reglamento universitario sin perder el hilo.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "b2m4l1",
      "phaseId": "b2m4",
      "title": "Die ständig steigenden Preise",
      "subtitle": "Partizip I extendido: la relativa de «que está ocurriendo»",
      "minutes": 12,
      "nEx": 8
     },
     {
      "id": "b2m4l2",
      "phaseId": "b2m4",
      "title": "Die gestern beschlossene Reform",
      "subtitle": "Partizip II extendido: lo que ya está hecho, delante del nombre",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m4l3",
      "phaseId": "b2m4",
      "title": "Das zu lösende Problem",
      "subtitle": "Gerundivum: lo que hay que hacer, plegado",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m4l4",
      "phaseId": "b2m4",
      "title": "Der Kollege, mit dem ich …",
      "subtitle": "Relativa con preposición, cuyo, y was/wo(r)-",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m4l5",
      "phaseId": "b2m4",
      "title": "Die Endung im langen Attribut",
      "subtitle": "Clínica: una terminación mal puesta hunde veinte palabras",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m4l6",
      "phaseId": "b2m4",
      "title": "§4 der Studienordnung",
      "subtitle": "Lectura larga: un reglamento y un foro que lo contradice",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "b2m4l7",
      "phaseId": "b2m4",
      "title": "Seminarsitzung Holm",
      "subtitle": "Escucha larga: el seminario, una pasada, cuaderno",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m4l8",
      "phaseId": "b2m4",
      "title": "Der Antrag und das Forum",
      "subtitle": "Dos textos: solicitud a Holm (~100) y foro sobre el NC (~150)",
      "minutes": 20,
      "nEx": 22
     },
     {
      "id": "b2m4l9",
      "phaseId": "b2m4",
      "title": "Leo faltet den Satz",
      "subtitle": "La historia del módulo y un Vortrag de cuatro minutos",
      "minutes": 18,
      "nEx": 8
     }
    ]
   },
   {
    "id": "b2m5",
    "level": "b2",
    "n": 5,
    "title": "Dafür, dagegen, und trotzdem",
    "goal": "Defender una postura, conceder sin rendirte y rebatir, y sostener un texto largo con los conectores que el examen espera ver.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "b2m5l1",
      "phaseId": "b2m5",
      "title": "Nicht nur, sondern auch",
      "subtitle": "Los conectores de dos piezas: sumar, excluir y conceder sin rendirse",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m5l2",
      "phaseId": "b2m5",
      "title": "Je klarer, desto besser",
      "subtitle": "O bien, en parte, cuanto más: el esqueleto de un texto argumentativo",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "b2m5l3",
      "phaseId": "b2m5",
      "title": "Zumal und wobei",
      "subtitle": "Los cultos que sí mandan el verbo al final — y wobei, que no es zwar",
      "minutes": 15,
      "nEx": 8
     },
     {
      "id": "b2m5l4",
      "phaseId": "b2m5",
      "title": "Sofern das Amt mitzieht",
      "subtitle": "Condición, excepción y «por no hablar de»: los cultos que cierran un párrafo",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m5l5",
      "phaseId": "b2m5",
      "title": "Allerdings, wobei, je … desto",
      "subtitle": "Clínica: adverbio o conjunción, otra vez, pero con los cultos",
      "minutes": 16,
      "nEx": 10
     },
     {
      "id": "b2m5l6",
      "phaseId": "b2m5",
      "title": "Zwei Texte, zwei Thesen",
      "subtitle": "Dos artículos que se contradicen — el Lesen de B2 vive de eso",
      "minutes": 20,
      "nEx": 6
     },
     {
      "id": "b2m5l7",
      "phaseId": "b2m5",
      "title": "Kiez im Gespräch",
      "subtitle": "Audio largo con cuaderno: Lena Krüger, Sofía y Nico",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "b2m5l8",
      "phaseId": "b2m5",
      "title": "Zwei Schreiben",
      "subtitle": "Carta formal al distrito (~100) y comentario argumentativo (~150)",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "b2m5l9",
      "phaseId": "b2m5",
      "title": "Der Abend im Kiez",
      "subtitle": "El relato del módulo y tu monólogo de cuatro minutos",
      "minutes": 24,
      "nEx": 10
     }
    ]
   },
   {
    "id": "b2m6",
    "level": "b2",
    "n": 6,
    "title": "Es wäre denkbar",
    "goal": "Lamentar y reprochar sin ofender, plantear lo que habría pasado, y bajar el grado de compromiso de una afirmación por escrito.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "b2m6l1",
      "phaseId": "b2m6",
      "title": "Hätte ich das gewusst",
      "subtitle": "El irreal del pasado: lo que no pasó, y se nota",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m6l2",
      "phaseId": "b2m6",
      "title": "Hätte kommen können",
      "subtitle": "El doble infinitivo: lo que se habría podido, debido o tenido que hacer",
      "minutes": 15,
      "nEx": 8
     },
     {
      "id": "b2m6l3",
      "phaseId": "b2m6",
      "title": "Als ob nichts wäre",
      "subtitle": "Hacer como si: als ob y als + Konjunktiv II",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m6l4",
      "phaseId": "b2m6",
      "title": "Es wäre denkbar",
      "subtitle": "Bajar el compromiso: el K II que sostiene un argumento escrito",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m6l5",
      "phaseId": "b2m6",
      "title": "Weil ich hätte kommen können",
      "subtitle": "Clínica: el doble infinitivo dentro de la subordinada",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m6l6",
      "phaseId": "b2m6",
      "title": "Lesen: Pflegenotstand",
      "subtitle": "Un reportaje sobre la planta — y un helvetismo a pie de página",
      "minutes": 18,
      "nEx": 6
     },
     {
      "id": "b2m6l7",
      "phaseId": "b2m6",
      "title": "Anna ruft an",
      "subtitle": "Audio largo con cuaderno: la planta y la consulta, una llamada",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "b2m6l8",
      "phaseId": "b2m6",
      "title": "Zwei Schreiben",
      "subtitle": "Carta a la Krankenkasse (~100) y comentario sobre la Pflege (~150)",
      "minutes": 22,
      "nEx": 9
     },
     {
      "id": "b2m6l9",
      "phaseId": "b2m6",
      "title": "Hätte ich früher hingehen sollen",
      "subtitle": "El relato del módulo y tu monólogo de cuatro minutos",
      "minutes": 24,
      "nEx": 10
     }
    ]
   },
   {
    "id": "b2m7",
    "level": "b2",
    "n": 7,
    "title": "Das muss ja teuer sein",
    "goal": "Deducir con grados de certeza, ponerle tono a una frase que ya es correcta, y quejarte de un cobro sin agredir.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "b2m7l1",
      "phaseId": "b2m7",
      "title": "Das muss so sein",
      "subtitle": "Modales subjetivos: no mandan, deducen",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m7l2",
      "phaseId": "b2m7",
      "title": "Das muss teuer gewesen sein",
      "subtitle": "La misma escala, sobre el pasado: muss gewesen sein",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m7l3",
      "phaseId": "b2m7",
      "title": "Sag mal — das ist ja…",
      "subtitle": "Partículas I: mal, ja, denn, doch, halt, wohl. No se traducen: se colocan",
      "minutes": 15,
      "nEx": 8
     },
     {
      "id": "b2m7l4",
      "phaseId": "b2m7",
      "title": "Eigentlich, ruhig, bloß, etwa",
      "subtitle": "Partículas II y la escala bestimmt → scheinbar",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m7l5",
      "phaseId": "b2m7",
      "title": "Das dürfte kostspielig sein",
      "subtitle": "Clínica: las partículas se colocan; el examen cambia de traje",
      "minutes": 16,
      "nEx": 10
     },
     {
      "id": "b2m7l6",
      "phaseId": "b2m7",
      "title": "Lesen: das Kleingedruckte",
      "subtitle": "Un reportaje sobre Abos — y el Konsumentenschutz austriaco",
      "minutes": 18,
      "nEx": 6
     },
     {
      "id": "b2m7l7",
      "phaseId": "b2m7",
      "title": "Die Rechnung auf dem Tisch",
      "subtitle": "Audio largo con cuaderno: Nico, Sofía y un Abo",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "b2m7l8",
      "phaseId": "b2m7",
      "title": "Zwei Schreiben",
      "subtitle": "Reclamación formal (~100) y comentario sobre Abos (~150)",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "b2m7l9",
      "phaseId": "b2m7",
      "title": "Halt, wo ist die Nummer?",
      "subtitle": "El relato del módulo y tu monólogo de cuatro minutos",
      "minutes": 24,
      "nEx": 10
     }
    ]
   },
   {
    "id": "b2m8",
    "level": "b2",
    "n": 8,
    "title": "Wem gehört die Stadt?",
    "goal": "Leer un texto normativo, presentar un recurso formal y resumir una norma en lenguaje llano, con el genitivo que el Amtsdeutsch exige.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "b2m8l1",
      "phaseId": "b2m8",
      "title": "Angesichts des Bescheids",
      "subtitle": "Cuatro preposiciones de genitivo: el traje del Amt",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m8l2",
      "phaseId": "b2m8",
      "title": "Mangels Unterlagen",
      "subtitle": "Otras seis: mangels, zugunsten, seitens, anhand, mittels, im Zuge",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m8l3",
      "phaseId": "b2m8",
      "title": "Wegen des Lärms, wegen dem Lärm",
      "subtitle": "El genitivo como estilo — y el dativo que la calle ya dio por bueno",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m8l4",
      "phaseId": "b2m8",
      "title": "Der eine lange Satz",
      "subtitle": "Tres pisos: subordinadas anidadas y la subordinada que abre el Vorfeld",
      "minutes": 15,
      "nEx": 8
     },
     {
      "id": "b2m8l5",
      "phaseId": "b2m8",
      "title": "Weil der Antrag hätte gestellt werden müssen",
      "subtitle": "Clínica: el campo medio en la frase de tres pisos",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m8l6",
      "phaseId": "b2m8",
      "title": "Lesen: wem gehört die Wohnung?",
      "subtitle": "Eigenbedarf, Mietspiegel y una Gemeindewohnung vienesa",
      "minutes": 18,
      "nEx": 6
     },
     {
      "id": "b2m8l7",
      "phaseId": "b2m8",
      "title": "Der Bescheid auf dem Tisch",
      "subtitle": "Audio largo con cuaderno: Herr Vogel y Sofía",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "b2m8l8",
      "phaseId": "b2m8",
      "title": "Zwei Schreiben",
      "subtitle": "Widerspruch formal (~100) y comentario: ¿de quién es la ciudad? (~150)",
      "minutes": 22,
      "nEx": 8
     },
     {
      "id": "b2m8l9",
      "phaseId": "b2m8",
      "title": "Das Haus gehört nicht dem Lautesten",
      "subtitle": "El relato del módulo y tu monólogo de cuatro minutos",
      "minutes": 24,
      "nEx": 12
     }
    ]
   },
   {
    "id": "b2m9",
    "level": "b2",
    "n": 9,
    "title": "Woran es liegt",
    "goal": "Explicar causas y consecuencias con la rección justa — de sustantivo, de adjetivo y con da-Komposita — y leer un gráfico sin inventar el dato.",
    "color": "#15803d",
    "lessons": [
     {
      "id": "b2m9l1",
      "phaseId": "b2m9",
      "title": "Die Frage nach dem Grund",
      "subtitle": "La rección de los sustantivos: el nombre arrastra su preposición",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "b2m9l2",
      "phaseId": "b2m9",
      "title": "Stolz darauf, abhängig davon",
      "subtitle": "La rección de los adjetivos: el traje que lleva el adjetivo",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m9l3",
      "phaseId": "b2m9",
      "title": "Davon ausgehen, dass",
      "subtitle": "Dos complementos, y el da-Komposita que anticipa la frase",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m9l4",
      "phaseId": "b2m9",
      "title": "Woran es liegt",
      "subtitle": "wo(r)- para preguntar, y cómo se lee un gráfico sin inventar el dato",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m9l5",
      "phaseId": "b2m9",
      "title": "Clínica: Ich gehe davon aus",
      "subtitle": "El da-Komposita anticipador — lo que el español no tiene y por eso se omite",
      "minutes": 14,
      "nEx": 10
     },
     {
      "id": "b2m9l6",
      "phaseId": "b2m9",
      "title": "Zwei Texte, zwei Ursachen",
      "subtitle": "Dos artículos que se contradicen — contrastar, no solo comprender",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "b2m9l7",
      "phaseId": "b2m9",
      "title": "Hören: woran es liegt, mit Notizblock",
      "subtitle": "Audio largo de tertulia — el cuaderno no es opcional",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m9l8",
      "phaseId": "b2m9",
      "title": "Schreiben: 100 formal, 150 de argumento",
      "subtitle": "Dos tareas, dos relojes, un solo error que vale cero",
      "minutes": 22,
      "nEx": 7
     },
     {
      "id": "b2m9l9",
      "phaseId": "b2m9",
      "title": "Vortrag: die Grafik erklären",
      "subtitle": "Un relato del Kiez y cuatro minutos de datos, sin diapositivas fijas",
      "minutes": 18,
      "nEx": 9
     }
    ]
   },
   {
    "id": "b2m10",
    "level": "b2",
    "n": 10,
    "title": "Deutsch ist nicht gleich Deutsch",
    "goal": "Reconocer de dónde es un texto, subir y bajar de registro a voluntad, y escribir siempre en alemán estándar — aunque el oído sea vienés o bernés.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "b2m10l1",
      "phaseId": "b2m10",
      "title": "Drei Anzüge, eine Idee",
      "subtitle": "Coloquial, estándar, Amtsdeutsch — y la regla de producción, en pantalla",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "b2m10l2",
      "phaseId": "b2m10",
      "title": "ver-, ent-, zer-: la palabra que no has visto",
      "subtitle": "Prefijos: lo que te salva cuando el Goethe no publica lista de B2",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m10l3",
      "phaseId": "b2m10",
      "title": "-bar, -los, -reich: el adjetivo que te fabricas",
      "subtitle": "Sufijos: la otra mitad de la Wortbildung",
      "minutes": 12,
      "nEx": 8
     },
     {
      "id": "b2m10l4",
      "phaseId": "b2m10",
      "title": "Fußnote, nicht Produktion",
      "subtitle": "Austriacismos y helvetismos: se glosan, no se copian al escrito",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m10l5",
      "phaseId": "b2m10",
      "title": "Clínica: el traje equivocado",
      "subtitle": "kriegen, erhalten, Kumpel, tun mal, wo — aciertas la palabra y fallas el acto",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m10l6",
      "phaseId": "b2m10",
      "title": "Wien sagt, Bern sagt",
      "subtitle": "Dos textos, dos normas, una sola producción — y se contradicen",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "b2m10l7",
      "phaseId": "b2m10",
      "title": "Hören: drei Stimmen, eine Norm",
      "subtitle": "Tertulia sobre registro — cuaderno, y los nombres van en el audio",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m10l8",
      "phaseId": "b2m10",
      "title": "Schreiben: el traje, no el souvenir",
      "subtitle": "100 de Sie y 150 de foro — y ni un Jänner de producción",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "b2m10l9",
      "phaseId": "b2m10",
      "title": "Vortrag: welche Sprache schreibe ich?",
      "subtitle": "Cuatro minutos sobre norma, registro y pertenencia — sin souvenir",
      "minutes": 18,
      "nEx": 14
     }
    ]
   },
   {
    "id": "b2m11",
    "level": "b2",
    "n": 11,
    "title": "In eigenen Worten",
    "goal": "Resumir sin copiar, sintetizar dos textos que no se ponen de acuerdo y transmitírselo a quien no los ha leído — en alemán y, si hace falta, en español.",
    "color": "#4f46e5",
    "lessons": [
     {
      "id": "b2m11l1",
      "phaseId": "b2m11",
      "title": "Kurz gesagt, ohne mich",
      "subtitle": "El resumen: presente, sin detalle, sin tu opinión",
      "minutes": 13,
      "nEx": 9
     },
     {
      "id": "b2m11l2",
      "phaseId": "b2m11",
      "title": "Laut, zufolge, so die Autorin",
      "subtitle": "Citar no es parafrasear — el Lesen y el Schreiben premian las dos",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m11l3",
      "phaseId": "b2m11",
      "title": "Im Gegensatz zu, wohingegen",
      "subtitle": "Dos fuentes que no se ponen de acuerdo: el esqueleto del contraste",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m11l4",
      "phaseId": "b2m11",
      "title": "Lena erteilt das Wort",
      "subtitle": "Reunión, orden del día, protocolo: resumir en voz alta",
      "minutes": 13,
      "nEx": 8
     },
     {
      "id": "b2m11l5",
      "phaseId": "b2m11",
      "title": "Clínica: resumir no es acortar",
      "subtitle": "A propósito: las palabras del original están prohibidas",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "b2m11l6",
      "phaseId": "b2m11",
      "title": "Zwei Quellen, ein Protokoll",
      "subtitle": "Hofmann y Vogel no se ponen de acuerdo — tú se lo cuentas a un tercero",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "b2m11l7",
      "phaseId": "b2m11",
      "title": "Hören: die Moderation mitschreiben",
      "subtitle": "Lena reparte turnos — cuaderno: quién dice la causa",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "b2m11l8",
      "phaseId": "b2m11",
      "title": "Schreiben: el acta y el foro",
      "subtitle": "100 de Sie al distrito, 150 de foro — las dos piden resumir y contrastar",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "b2m11l9",
      "phaseId": "b2m11",
      "title": "Vortrag: zwei Texte, ein Dritter",
      "subtitle": "Cuatro minutos de síntesis — y luego preguntas",
      "minutes": 18,
      "nEx": 14
     }
    ]
   },
   {
    "id": "b2m12",
    "level": "b2",
    "n": 12,
    "title": "Rumbo al Goethe-Zertifikat B2",
    "goal": "Entrar al examen de 2019 sabiendo qué pide cada Teil, qué ha cambiado respecto al B1 y al handbook de 2007, y qué no puede sustituir esta app: una pareja de oral.",
    "color": "#b91c1c",
    "lessons": [
     {
      "id": "b2m12l1",
      "phaseId": "b2m12",
      "title": "El examen por dentro — 2019, no 2007",
      "subtitle": "Modular, 60 por módulo, 18 de 30, sin diccionario, sin compensación",
      "minutes": 14,
      "nEx": 10
     },
     {
      "id": "b2m12l2",
      "phaseId": "b2m12",
      "title": "Lesen Teil 1: cuatro voces, una puede repetir",
      "subtitle": "Einstellungen verstehen — se acabó el «0» del B1",
      "minutes": 16,
      "nEx": 6
     },
     {
      "id": "b2m12l3",
      "phaseId": "b2m12",
      "title": "Lesen Teil 2 y 3: coser un texto, leer un artículo",
      "subtitle": "Insertar frases (2 sobran) · MC de 3 sobre prensa",
      "minutes": 15,
      "nEx": 6
     },
     {
      "id": "b2m12l4",
      "phaseId": "b2m12",
      "title": "Lesen Teil 4 y 5: posturas y Studienordnung",
      "subtitle": "Ocho opiniones, un titular sobra · reglamento universitario",
      "minutes": 15,
      "nEx": 6
     },
     {
      "id": "b2m12l5",
      "phaseId": "b2m12",
      "title": "Hören Teil 1 y 2: abres a una sola pasada",
      "subtitle": "T1 UNA vez (5 cortos) · T2 DOS veces (entrevista)",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "b2m12l6",
      "phaseId": "b2m12",
      "title": "Hören Teil 3 y 4: ¿quién dice qué? y el Vortrag",
      "subtitle": "T3 UNA vez, tertulia · T4 DOS veces, ponencia",
      "minutes": 16,
      "nEx": 14
     },
     {
      "id": "b2m12l7",
      "phaseId": "b2m12",
      "title": "Schreiben: 150 de foro, 100 al jefe",
      "subtitle": "75 minutos, dos tareas, y Erfüllung E vale cero",
      "minutes": 22,
      "nEx": 14
     },
     {
      "id": "b2m12l8",
      "phaseId": "b2m12",
      "title": "Sprechen Teil 1: el Vortrag sin diapositivas",
      "subtitle": "4 minutos, estructura propia, y luego preguntas que valen 12 puntos",
      "minutes": 20,
      "nEx": 6
     },
     {
      "id": "b2m12l9",
      "phaseId": "b2m12",
      "title": "Sprechen Teil 2: discrepar, no pactar",
      "subtitle": "Discusión de ~5 minutos, 40 puntos — y esto no se hace solo",
      "minutes": 18,
      "nEx": 10
     }
    ]
   }
  ],
  "vocabCount": 2090
 },
 "en": {
  "phases": [
   {
    "id": "ena1m1",
    "level": "a1",
    "n": 1,
    "title": "Hello! Nice to meet you",
    "goal": "Saludar y despedirte como en Londres, presentarte, sobrevivir al «How are you?», pedir con please/sorry y deletrear tu nombre — la parte 1 del examen oral, lista.",
    "color": "#2563eb",
    "lessons": [
     {
      "id": "ena1m1l1",
      "phaseId": "ena1m1",
      "title": "Hello! I'm Valeria",
      "subtitle": "Saludar, decir tu nombre y preguntar el del otro",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m1l2",
      "phaseId": "ena1m1",
      "title": "Good morning, London",
      "subtitle": "El reloj de los saludos — y la trampa de good night",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m1l3",
      "phaseId": "ena1m1",
      "title": "How are you?",
      "subtitle": "El ritual — y tus respuestas reales, de great a not bad",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m1l4",
      "phaseId": "ena1m1",
      "title": "Where are you from?",
      "subtitle": "be con I y you: afirmar, preguntar y responder en corto",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m1l5",
      "phaseId": "ena1m1",
      "title": "Please, sorry, thank you",
      "subtitle": "La santísima trinidad británica — y cuándo va cada una",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m1l6",
      "phaseId": "ena1m1",
      "title": "V-A-L-E-R-I-A",
      "subtitle": "Deletrear tu nombre — y el cuento de la llegada a Londres",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m1l7",
      "phaseId": "ena1m1",
      "title": "Oído real: ¿hi o I?",
      "subtitle": "La h que sopla y las letras trampa — a 2 escuchas, como en el examen",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m1l8",
      "phaseId": "ena1m1",
      "title": "Leer y escribir: tu primera tarjeta",
      "subtitle": "Mr, Mrs y los carteles — y tu primera nota entera en inglés",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "ena1m1l9",
      "phaseId": "ena1m1",
      "title": "La historia: la tienda de Mr Patel",
      "subtitle": "El cuento del módulo — y repaso espiral de todo lo tuyo",
      "minutes": 10,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m2",
    "level": "a1",
    "n": 2,
    "title": "My people",
    "goal": "Presentar a tu familia y hablar de tu gente: he's/she's/they're, los posesivos his/her, adjetivos en su sitio y los plurales rebeldes.",
    "color": "#0d9488",
    "lessons": [
     {
      "id": "ena1m2l1",
      "phaseId": "ena1m2",
      "title": "This is my family",
      "subtitle": "Presentar a los tuyos — mother, father, brother, sister",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m2l2",
      "phaseId": "ena1m2",
      "title": "Who's he? — He's my brother",
      "subtitle": "be en 3ª persona — y el sujeto que el español se come",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m2l3",
      "phaseId": "ena1m2",
      "title": "Husband, wife & the kids",
      "subtitle": "El matrimonio, los hijos — y el falso amigo parents",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m2l4",
      "phaseId": "ena1m2",
      "title": "his, her, our, their",
      "subtitle": "El «su» español se divide en tres — manda el DUEÑO",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m2l5",
      "phaseId": "ena1m2",
      "title": "Tall, young, nice, funny",
      "subtitle": "Describir a tu gente — con el adjetivo EN SU SITIO",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m2l6",
      "phaseId": "ena1m2",
      "title": "Men, women, children",
      "subtitle": "Los plurales rebeldes — y la foto de la familia de Valeria",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m2l7",
      "phaseId": "ena1m2",
      "title": "Oído real: la familia al oído",
      "subtitle": "mum, dad y los tíos a 2 escuchas — y el th que el seseo se come",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m2l8",
      "phaseId": "ena1m2",
      "title": "Leer y escribir: la foto de Amy",
      "subtitle": "Lee el post como en el examen — y escribe tu pie de foto",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "ena1m2l9",
      "phaseId": "ena1m2",
      "title": "La historia: Sunday at Ben's",
      "subtitle": "Conoce a la familia de Ben — con repaso espiral del módulo 1",
      "minutes": 9,
      "nEx": 10
     }
    ]
   },
   {
    "id": "ena1m3",
    "level": "a1",
    "n": 3,
    "title": "Numbers, countries & you",
    "goal": "Contar de 0 a 100 sin caer en la trampa 13/30, decir de dónde eres, tu edad con BE (I'm 25 — nunca «I have») y dar tu teléfono y tu email tal como lo pide el examen.",
    "color": "#059669",
    "lessons": [
     {
      "id": "ena1m3l1",
      "phaseId": "ena1m3",
      "title": "Zero to twelve",
      "subtitle": "Los números 0-12 — tu kit de supervivencia",
      "minutes": 6,
      "nEx": 10
     },
     {
      "id": "ena1m3l2",
      "phaseId": "ena1m3",
      "title": "Thirteen or thirty?",
      "subtitle": "13 vs 30: el acento decide — y las decenas hasta 100",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m3l3",
      "phaseId": "ena1m3",
      "title": "Where are you from?",
      "subtitle": "Decir de dónde eres — y matar la e- de «espéin»",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m3l4",
      "phaseId": "ena1m3",
      "title": "I'm Colombian",
      "subtitle": "Nacionalidades — mayúscula siempre, país o nacionalidad",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m3l5",
      "phaseId": "ena1m3",
      "title": "I'm 25",
      "subtitle": "La edad va con BE — la trampa reina del hispanohablante",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m3l6",
      "phaseId": "ena1m3",
      "title": "At, dot — got it!",
      "subtitle": "Teléfono y email como en el Listening parte 4 — y la regla a/an",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m3l7",
      "phaseId": "ena1m3",
      "title": "Oído real: thirteen or thirty?",
      "subtitle": "Números, letras y nombres a 2 escuchas — como en el examen",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m3l8",
      "phaseId": "ena1m3",
      "title": "About you: el formulario",
      "subtitle": "Leer una ficha como la del examen — y escribir la tuya",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "ena1m3l9",
      "phaseId": "ena1m3",
      "title": "Valeria calls Bogotá",
      "subtitle": "El cuento del módulo — y repaso espiral de los módulos 1 y 2",
      "minutes": 9,
      "nEx": 9
     }
    ]
   },
   {
    "id": "ena1m4",
    "level": "a1",
    "n": 4,
    "title": "My day",
    "goal": "Contar tu rutina en present simple, clavar la -s de he/she, preguntar y negar con do/does, y decir la hora y los días de la semana.",
    "color": "#ea580c",
    "lessons": [
     {
      "id": "ena1m4l1",
      "phaseId": "ena1m4",
      "title": "I get up at seven",
      "subtitle": "Tu rutina con I/you/we — el present simple sin dolor",
      "minutes": 7,
      "nEx": 11
     },
     {
      "id": "ena1m4l2",
      "phaseId": "ena1m4",
      "title": "He works — with an s!",
      "subtitle": "La -s de he/she: pequeña, obligatoria, traicionera",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "ena1m4l3",
      "phaseId": "ena1m4",
      "title": "Do you? Does he?",
      "subtitle": "do/does: la llave de preguntas y negaciones",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m4l4",
      "phaseId": "ena1m4",
      "title": "What time is it?",
      "subtitle": "La hora: o'clock, half past, quarter to/past",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m4l5",
      "phaseId": "ena1m4",
      "title": "From Monday to Sunday",
      "subtitle": "Los días: mayúscula siempre, on delante",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m4l6",
      "phaseId": "ena1m4",
      "title": "Always? Sometimes? Never!",
      "subtitle": "Los adverbios de frecuencia — y su SITIO en la frase",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m4l8",
      "phaseId": "ena1m4",
      "title": "Oído real: works, goes, watches",
      "subtitle": "La -s que se OYE: tres sonidos — y horas y rutinas a 2 escuchas",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m4l9",
      "phaseId": "ena1m4",
      "title": "Leer y escribir: my day",
      "subtitle": "La nota semanal de Amy, tu día en 20-30 palabras — y espiral de m2-m3",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "ena1m4l7",
      "phaseId": "ena1m4",
      "title": "Ben's day",
      "subtitle": "Mini-cuento — el día de Ben Carter, contado con todas tus armas",
      "minutes": 8,
      "nEx": 10
     }
    ]
   },
   {
    "id": "ena1m5",
    "level": "a1",
    "n": 5,
    "title": "Are you hungry?",
    "goal": "Pedir comida y bebida de verdad: el desayuno con have, la cafetería de Sam con Can I have… please?, decir qué hay (there is/are) con some/any, y qué te gusta y qué no.",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "ena1m5l1",
      "phaseId": "ena1m5",
      "title": "Breakfast, lunch, dinner",
      "subtitle": "Las tres comidas del día — y el verbo que las acompaña: have",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m5l2",
      "phaseId": "ena1m5",
      "title": "Sam's café",
      "subtitle": "Pedir como se pide de verdad: Can I have…, please?",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m5l3",
      "phaseId": "ena1m5",
      "title": "There is, there are",
      "subtitle": "Decir qué hay en la nevera — el «hay» inglés tiene dos formas",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m5l4",
      "phaseId": "ena1m5",
      "title": "Some & any",
      "subtitle": "some milk, any eggs? — la pareja que acompaña al «hay»",
      "minutes": 7,
      "nEx": 11
     },
     {
      "id": "ena1m5l5",
      "phaseId": "ena1m5",
      "title": "I like it!",
      "subtitle": "Decir qué te gusta — y preguntarlo: Do you like…?",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m5l6",
      "phaseId": "ena1m5",
      "title": "Saturday at Sam's",
      "subtitle": "Mini-cuento — Valeria y Amy desayunan fuera: todo el módulo en una historia",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m5l7",
      "phaseId": "ena1m5",
      "title": "Oído real: el pedido al vuelo",
      "subtitle": "Pedidos de verdad a 2 escuchas — y los duelos sh/ch y cup/cap",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m5l8",
      "phaseId": "ena1m5",
      "title": "Leer y escribir: el menú de Sam",
      "subtitle": "Leer un menú de verdad — y escribir tu pedido en 20-30 palabras",
      "minutes": 11,
      "nEx": 10
     },
     {
      "id": "ena1m5l9",
      "phaseId": "ena1m5",
      "title": "La historia: Breakfast at Ben's flat",
      "subtitle": "El cuento del domingo — y repaso espiral de los módulos 3 y 4",
      "minutes": 9,
      "nEx": 10
     }
    ]
   },
   {
    "id": "ena1m6",
    "level": "a1",
    "n": 6,
    "title": "How much is it?",
    "goal": "Comprar en la tienda de Mr Patel: señalar con this/that/these/those, entender precios en libras al vuelo, pedir tu talla y tu color en el orden correcto (a blue shirt) y pagar con tarjeta.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "ena1m6l1",
      "phaseId": "ena1m6",
      "title": "This shop, those apples",
      "subtitle": "Señalar con palabras: this, that, these, those",
      "minutes": 8,
      "nEx": 12
     },
     {
      "id": "ena1m6l2",
      "phaseId": "ena1m6",
      "title": "Pounds and pence",
      "subtitle": "How much is it? — los precios británicos, al oído",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m6l3",
      "phaseId": "ena1m6",
      "title": "Clothes",
      "subtitle": "shirt, shoes, jacket — la ropa básica, a la británica",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m6l4",
      "phaseId": "ena1m6",
      "title": "A blue shirt",
      "subtitle": "Colores y talla — con el adjetivo SIEMPRE delante",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m6l5",
      "phaseId": "ena1m6",
      "title": "Can I pay by card?",
      "subtitle": "Pagar, quejarse del precio con too — y decidirse: I'll take it!",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m6l6",
      "phaseId": "ena1m6",
      "title": "Valeria buys a jacket",
      "subtitle": "Mini-cuento — Valeria comprando donde Mr Patel: todo el módulo en una historia",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m6l7",
      "phaseId": "ena1m6",
      "title": "Oído real: precios y la i que decide",
      "subtitle": "Libras a 2 escuchas — y el par cheap/chip que te cuesta dinero",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m6l8",
      "phaseId": "ena1m6",
      "title": "Leer y escribir: la nota de compra",
      "subtitle": "Carteles de tienda de verdad — y tu primera nota de dos funciones",
      "minutes": 11,
      "nEx": 9
     },
     {
      "id": "ena1m6l9",
      "phaseId": "ena1m6",
      "title": "La historia: Saturday breakfast",
      "subtitle": "El sábado de Valeria — con repaso espiral de rutina y comida",
      "minutes": 9,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m7",
    "level": "a1",
    "n": 7,
    "title": "My home & my town",
    "goal": "Describir tu casa y tu barrio: there is/there are, preposiciones de lugar, el it obligatorio — y preguntar por sitios en la ciudad como un londinense.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "ena1m7l1",
      "phaseId": "ena1m7",
      "title": "Welcome home: the rooms",
      "subtitle": "Las habitaciones de tu casa — y el tour «This is…»",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m7l2",
      "phaseId": "ena1m7",
      "title": "There's a sofa!",
      "subtitle": "Los muebles — y there is / there are bien afinados",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m7l3",
      "phaseId": "ena1m7",
      "title": "Where is the cat?",
      "subtitle": "in, on, under, next to — el gato te enseña las preposiciones",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m7l4",
      "phaseId": "ena1m7",
      "title": "It's big! — el it obligatorio",
      "subtitle": "behind, in front of — y el sujeto que el español se come",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m7l5",
      "phaseId": "ena1m7",
      "title": "Is there a bank near here?",
      "subtitle": "La ciudad — y la pregunta que te salva en cualquier barrio",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m7l6",
      "phaseId": "ena1m7",
      "title": "Valeria's new flat",
      "subtitle": "Mini-cuento — Ben y Amy visitan el piso nuevo de Valeria",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m7l7",
      "phaseId": "ena1m7",
      "title": "Oído real: la casa al oído",
      "subtitle": "Descripciones de casa a 2 escuchas — y la h que sí sopla",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m7l8",
      "phaseId": "ena1m7",
      "title": "Leer y escribir: tu casa",
      "subtitle": "Un anuncio y carteles de verdad — y tu primer texto de dos funciones",
      "minutes": 12,
      "nEx": 9
     },
     {
      "id": "ena1m7l9",
      "phaseId": "ena1m7",
      "title": "La historia: dinner at Valeria's",
      "subtitle": "La cena de inauguración — con repaso espiral de comida y compras",
      "minutes": 9,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m8",
    "level": "a1",
    "n": 8,
    "title": "Free time",
    "goal": "Hablar de tus aficiones con like/love/hate + -ing, decir lo que sabes hacer con can, comentar el tiempo — It's raining! — y situarte en estaciones y meses.",
    "color": "#d97706",
    "lessons": [
     {
      "id": "ena1m8l1",
      "phaseId": "ena1m8",
      "title": "What do you do in your free time?",
      "subtitle": "Tus aficiones — y la pregunta que rompe el hielo",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m8l2",
      "phaseId": "ena1m8",
      "title": "I love swimming!",
      "subtitle": "like, love, hate + -ing — el patrón que el examen adora",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m8l3",
      "phaseId": "ena1m8",
      "title": "I can swim",
      "subtitle": "can de habilidad — un verbo que no se conjuga (¡ni con she!)",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m8l4",
      "phaseId": "ena1m8",
      "title": "What's the weather like?",
      "subtitle": "El tiempo — el tema británico por excelencia (y otra vez it)",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m8l5",
      "phaseId": "ena1m8",
      "title": "Seasons and months",
      "subtitle": "Las estaciones, los meses — y el in que los acompaña",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m8l6",
      "phaseId": "ena1m8",
      "title": "Amy's Saturday",
      "subtitle": "Mini-cuento — un sábado de sol, lluvia y fútbol en Londres",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m8l7",
      "phaseId": "ena1m8",
      "title": "Oído real: el tiempo y tus hobbies",
      "subtitle": "Partes del tiempo a 2 escuchas — y las dos aes que el español no tiene",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m8l8",
      "phaseId": "ena1m8",
      "title": "Leer y escribir: tu tiempo libre",
      "subtitle": "El cartel del club — y tu texto de dos funciones sobre aficiones",
      "minutes": 12,
      "nEx": 9
     },
     {
      "id": "ena1m8l9",
      "phaseId": "ena1m8",
      "title": "La historia: the new ball",
      "subtitle": "Domingo de fútbol, lluvia y cine — con repaso espiral de compras y casa",
      "minutes": 9,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m9",
    "level": "a1",
    "n": 9,
    "title": "Work & study: What do you do?",
    "goal": "Decir tu profesión (con su artículo), dónde trabajas, hablar del aula — y estrenar el presente continuo: I'm learning English.",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "ena1m9l1",
      "phaseId": "ena1m9",
      "title": "What do you do?",
      "subtitle": "La pregunta que no significa lo que parece",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m9l2",
      "phaseId": "ena1m9",
      "title": "She's a nurse",
      "subtitle": "El artículo que el español se come",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m9l3",
      "phaseId": "ena1m9",
      "title": "Where do you work?",
      "subtitle": "work at / work in — y la -s que no perdona",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m9l4",
      "phaseId": "ena1m9",
      "title": "In the classroom",
      "subtitle": "book, pen, computer — y aprender de verdad",
      "minutes": 7,
      "nEx": 11
     },
     {
      "id": "ena1m9l5",
      "phaseId": "ena1m9",
      "title": "I'm learning English",
      "subtitle": "El presente continuo — ahora mismo, no siempre",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m9l6",
      "phaseId": "ena1m9",
      "title": "Everyone is working",
      "subtitle": "Mini-cuento — un lunes ocupado en Londres",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m9l7",
      "phaseId": "ena1m9",
      "title": "Oído real: la s que no lleva e",
      "subtitle": "student, school, start — y réplicas al vuelo, a 2 escuchas",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m9l8",
      "phaseId": "ena1m9",
      "title": "Leer y escribir: tu nuevo trabajo",
      "subtitle": "Un anuncio de empleo de verdad — y tu email de dos funciones",
      "minutes": 12,
      "nEx": 9
     },
     {
      "id": "ena1m9l9",
      "phaseId": "ena1m9",
      "title": "La historia: Saturday at the flat",
      "subtitle": "Un sábado de lluvia en casa — con repaso espiral de casa y hobbies",
      "minutes": 9,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m10",
    "level": "a1",
    "n": 10,
    "title": "Getting around London",
    "goal": "Moverte por Londres: decir cómo viajas, preguntar el camino con Excuse me y How do I get to…?, y entender direcciones con imperativos — sin perderte nunca.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "ena1m10l1",
      "phaseId": "ena1m10",
      "title": "By bus or on foot?",
      "subtitle": "Moverse por Londres: bus, train, tube…",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m10l2",
      "phaseId": "ena1m10",
      "title": "I'm going to work",
      "subtitle": "El continuo echa a andar — y «going to» suena «gonna»",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m10l3",
      "phaseId": "ena1m10",
      "title": "Excuse me…",
      "subtitle": "Preguntar el camino sin miedo",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m10l4",
      "phaseId": "ena1m10",
      "title": "Turn left, turn right",
      "subtitle": "Órdenes que te llevan: el imperativo",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "ena1m10l5",
      "phaseId": "ena1m10",
      "title": "Take the bus!",
      "subtitle": "Junta las piezas: preguntar, entender, llegar",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m10l6",
      "phaseId": "ena1m10",
      "title": "Valeria is lost",
      "subtitle": "Mini-cuento — Ben al rescate",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m10l7",
      "phaseId": "ena1m10",
      "title": "Oído real: el camino al oído",
      "subtitle": "left o right a 2 escuchas — y el gonna de la calle",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m10l8",
      "phaseId": "ena1m10",
      "title": "Leer y escribir: quedamos en Londres",
      "subtitle": "Carteles del transporte — y tu email completo de tres funciones",
      "minutes": 12,
      "nEx": 9
     },
     {
      "id": "ena1m10l9",
      "phaseId": "ena1m10",
      "title": "La historia: the red bus to the park",
      "subtitle": "Domingo de fútbol — con repaso espiral de hobbies y trabajos",
      "minutes": 9,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena1m11",
    "level": "a1",
    "n": 11,
    "title": "Time with people",
    "goal": "Invitar y quedar, decir fechas y tu cumpleaños, y empezar a reconocer el pasado (was/were) — todo el curso en acción con tu gente de Londres.",
    "color": "#d97706",
    "lessons": [
     {
      "id": "ena1m11l1",
      "phaseId": "ena1m11",
      "title": "Do you want to come?",
      "subtitle": "Invitar, aceptar y decir que no sin sonar borde",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m11l2",
      "phaseId": "ena1m11",
      "title": "Let's go!",
      "subtitle": "Proponer planes — Let's + verbo, sin to",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m11l3",
      "phaseId": "ena1m11",
      "title": "When? Where? See you at 7!",
      "subtitle": "Cerrar la cita: hora, sitio y despedida",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena1m11l4",
      "phaseId": "ena1m11",
      "title": "Months of the year",
      "subtitle": "Los 12 meses — con mayúscula y con in",
      "minutes": 7,
      "nEx": 10
     },
     {
      "id": "ena1m11l5",
      "phaseId": "ena1m11",
      "title": "When is your birthday?",
      "subtitle": "Ordinales 1st-31st y tu fecha estrella",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m11l6",
      "phaseId": "ena1m11",
      "title": "Amy's birthday",
      "subtitle": "Mini-cuento — la fiesta sorpresa, y tu primer was/were (solo para reconocerlo)",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m11l7",
      "phaseId": "ena1m11",
      "title": "Oído real: Were you at the party?",
      "subtitle": "Invitaciones a 2 escuchas — y el pasado que solo tiene que sonarte",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m11l8",
      "phaseId": "ena1m11",
      "title": "Leer y escribir: la invitación",
      "subtitle": "La tarjeta de Nora — y tu primer email completo de examen",
      "minutes": 12,
      "nEx": 10
     },
     {
      "id": "ena1m11l9",
      "phaseId": "ena1m11",
      "title": "La historia: the Sunday picnic",
      "subtitle": "El pícnic del domingo — con repaso espiral de trabajo y transporte",
      "minutes": 9,
      "nEx": 10
     }
    ]
   },
   {
    "id": "ena1m12",
    "level": "a1",
    "n": 12,
    "title": "Your exam!",
    "goal": "Conocer el LanguageCert ESOL A1 Preliminary por dentro y entrenar sus tareas exactas — escuchar, leer, escribir y hablar en modo examen.",
    "color": "#be123c",
    "lessons": [
     {
      "id": "ena1m12l1",
      "phaseId": "ena1m12",
      "title": "The exam, inside",
      "subtitle": "El mapa del examen — partes, tiempos y la regla de oro: todo se oye dos veces",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m12l2",
      "phaseId": "ena1m12",
      "title": "Listening: parts 1 and 2",
      "subtitle": "Cazar el dato (horas, precios, 13/30) y elegir la mejor réplica",
      "minutes": 8,
      "nEx": 10
     },
     {
      "id": "ena1m12l3",
      "phaseId": "ena1m12",
      "title": "Listening: the form",
      "subtitle": "Partes 3 y 4 — nombres deletreados, números y precios en un formulario",
      "minutes": 8,
      "nEx": 11
     },
     {
      "id": "ena1m12l4",
      "phaseId": "ena1m12",
      "title": "Reading: the 4 tasks",
      "subtitle": "Huecos, texto roto, carteles y el texto largo — con sus trampas favoritas",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena1m12l5",
      "phaseId": "ena1m12",
      "title": "Writing: 30-50 words",
      "subtitle": "Los 2 textos — plantilla fija y las 4 funciones que ya dominas",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m12l6",
      "phaseId": "ena1m12",
      "title": "Spoken: your 6 minutes",
      "subtitle": "Las 4 partes del oral — presentación, deletreo, situaciones y tu minuto de gloria",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena1m12l7",
      "phaseId": "ena1m12",
      "title": "Oído real: tu simulacro de Listening",
      "subtitle": "Las partes 1-3 a 2 escuchas — y la batería de sonidos del curso entero",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena1m12l8",
      "phaseId": "ena1m12",
      "title": "Leer y escribir: los dos textos",
      "subtitle": "La Tarea 1 y la Tarea 2 en condiciones de examen — contador vivo y funciones del baremo",
      "minutes": 12,
      "nEx": 11
     },
     {
      "id": "ena1m12l9",
      "phaseId": "ena1m12",
      "title": "Spoken: tu minuto — y la vuelta al curso",
      "subtitle": "El mini-tema de la Parte 4, frase a frase — con el curso entero de visita",
      "minutes": 10,
      "nEx": 11
     }
    ]
   },
   {
    "id": "ena2m1",
    "level": "a2",
    "n": 1,
    "title": "Last weekend",
    "goal": "Contar lo que hiciste: el pasado regular con -ed, decir qué había con there was/were, colocar los marcadores (yesterday, last week, two days ago, in 2024) y preguntar por el fin de semana de otro.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "ena2m1l1",
      "phaseId": "ena2m1",
      "title": "Last weekend I worked",
      "subtitle": "El pasado, en una sola letra — y una forma para «canté» y «cantaba»",
      "minutes": 10,
      "nEx": 14
     },
     {
      "id": "ena2m1l2",
      "phaseId": "ena2m1",
      "title": "stopped, studied, arrived",
      "subtitle": "Escribir la -ed sin fallar: tres retoques y se acabó",
      "minutes": 9,
      "nEx": 12
     },
     {
      "id": "ena2m1l3",
      "phaseId": "ena2m1",
      "title": "There was a party",
      "subtitle": "«Había»: el there is/are del A1, movido al pasado",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena2m1l4",
      "phaseId": "ena2m1",
      "title": "Yesterday, last week, two days ago",
      "subtitle": "Las cuatro señales que obligan a usar el pasado",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena2m1l5",
      "phaseId": "ena2m1",
      "title": "Clínica de sonido: -ed",
      "subtitle": "Una letra, tres sonidos — y no cuestan lo mismo ni de lejos",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m1l6",
      "phaseId": "ena2m1",
      "title": "Valeria's weekend",
      "subtitle": "Una historia entera en pasado — y escribir la tuya",
      "minutes": 12,
      "nEx": 11
     },
     {
      "id": "ena2m1l7",
      "phaseId": "ena2m1",
      "title": "Oído real: How was your weekend?",
      "subtitle": "was y were se esconden — y sin ellos no se oye el pasado",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m1l8",
      "phaseId": "ena2m1",
      "title": "Did you watch the match?",
      "subtitle": "Preguntar y negar en pasado: el do/does del A1, un tiempo más allá",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m1l9",
      "phaseId": "ena2m1",
      "title": "Your weekend, in one minute",
      "subtitle": "Todo el módulo junto — y tu primer minuto hablando solo",
      "minutes": 12,
      "nEx": 12
     }
    ]
   },
   {
    "id": "ena2m2",
    "level": "a2",
    "n": 2,
    "title": "What happened next?",
    "goal": "Contar una historia entera: los verbos irregulares agrupados por patrón, la negación y la pregunta con did + verbo desnudo, las señales del relato (first of all, then, after that, finally) y la razón con because y so.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "ena2m2l1",
      "phaseId": "ena2m2",
      "title": "I went, I saw, I had",
      "subtitle": "Los verbos que no obedecen — y por qué son justo los que más usas",
      "minutes": 11,
      "nEx": 15
     },
     {
      "id": "ena2m2l2",
      "phaseId": "ena2m2",
      "title": "Sang, bought, wrote, slept",
      "subtitle": "Los irregulares por familias — porque en lista alfabética no se aprenden",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m2l3",
      "phaseId": "ena2m2",
      "title": "I didn't go out",
      "subtitle": "Negar en pasado: el auxiliar se lleva la marca y el verbo se queda desnudo",
      "minutes": 11,
      "nEx": 14
     },
     {
      "id": "ena2m2l4",
      "phaseId": "ena2m2",
      "title": "Where did you go?",
      "subtitle": "Preguntar por lo que le pasó a otro — y sacarle la historia entera",
      "minutes": 11,
      "nEx": 14
     },
     {
      "id": "ena2m2l5",
      "phaseId": "ena2m2",
      "title": "Clínica de sonido: bought, said, read",
      "subtitle": "Los irregulares tienen tres trampas de sonido, y solo tres",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m2l6",
      "phaseId": "ena2m2",
      "title": "First of all, then, after that",
      "subtitle": "Una historia no es una lista de frases: lleva señales",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m2l7",
      "phaseId": "ena2m2",
      "title": "Because I missed the bus",
      "subtitle": "La causa y la consecuencia — y el descriptor que pide opiniones con razones",
      "minutes": 11,
      "nEx": 14
     },
     {
      "id": "ena2m2l8",
      "phaseId": "ena2m2",
      "title": "The day I lost my wallet",
      "subtitle": "Una anécdota completa — y todas las piezas del módulo trabajando juntas",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "ena2m2l9",
      "phaseId": "ena2m2",
      "title": "Your story, in one minute",
      "subtitle": "Todo el módulo junto — y tu primera anécdota contada de principio a fin",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m3",
    "level": "a2",
    "n": 3,
    "title": "The woman in the red coat",
    "goal": "Describir a una persona y una cosa: el orden de varios adjetivos, los graduadores quite / so / a bit, los adverbios de modo en -ly y —sobre todo— dónde se colocan, que es donde el español te traiciona. Y de propina, para reconocer: los adjetivos en -ed/-ing y el pasado continuo.",
    "color": "#b91c1c",
    "lessons": [
     {
      "id": "ena2m3l1",
      "phaseId": "ena2m3",
      "title": "What does she look like?",
      "subtitle": "Describir a una persona: lo que se ES y lo que se TIENE",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "ena2m3l2",
      "phaseId": "ena2m3",
      "title": "Quite tall, a bit shy",
      "subtitle": "Graduar: bastante, tan, un poco — y el «poquito» que solo vale para lo malo",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m3l3",
      "phaseId": "ena2m3",
      "title": "A big old black bag",
      "subtitle": "Cuando hay varios adjetivos, el inglés tiene un orden — y es siempre el mismo",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m3l4",
      "phaseId": "ena2m3",
      "title": "Slowly, quickly, well",
      "subtitle": "Cómo se hace algo: el «-mente» inglés y dónde se pone",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m3l5",
      "phaseId": "ena2m3",
      "title": "Clínica de sonido: COMfortable",
      "subtitle": "Palabras largas: dónde cae el golpe de voz, y por qué el español lo pone donde no es",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m3l6",
      "phaseId": "ena2m3",
      "title": "I really like this film",
      "subtitle": "La trampa gorda del módulo: entre el verbo y su objeto no se mete nada",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m3l7",
      "phaseId": "ena2m3",
      "title": "Bored or boring?",
      "subtitle": "Frontera: cómo me siento YO, cómo es LA COSA",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m3l8",
      "phaseId": "ena2m3",
      "title": "What were you doing?",
      "subtitle": "Frontera: qué estabas haciendo cuando pasó lo otro",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m3l9",
      "phaseId": "ena2m3",
      "title": "Describe someone in one minute",
      "subtitle": "Todo el módulo junto — y un retrato que otro pueda reconocer",
      "minutes": 12,
      "nEx": 12
     }
    ]
   },
   {
    "id": "ena2m4",
    "level": "a2",
    "n": 4,
    "title": "Bigger, cheaper, better",
    "goal": "Comparar dos cosas y quedarte con una: el comparativo corto y el largo, than, los tres irregulares, el superlativo con the y con IN, las medidas (altura, peso, capacidad, temperatura) y los determinantes more, most, enough, no, none y all. Al final del módulo tienes montada la Parte 3 del examen oral.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "ena2m4l1",
      "phaseId": "ena2m4",
      "title": "Cheaper than that one",
      "subtitle": "Una letra al final y una palabra en medio: ya estás comparando",
      "minutes": 10,
      "nEx": 14
     },
     {
      "id": "ena2m4l2",
      "phaseId": "ena2m4",
      "title": "More expensive, more comfortable",
      "subtitle": "Dónde se corta la -er y empieza el «more» — y por qué nunca van juntos",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m4l3",
      "phaseId": "ena2m4",
      "title": "Better, worse, further",
      "subtitle": "Tres irregulares y ni uno más — y la palabra que se cruza al escribir",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m4l4",
      "phaseId": "ena2m4",
      "title": "The cheapest in the shop",
      "subtitle": "El superlativo: el THE que no se cae y la preposición que el español cambia",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m4l5",
      "phaseId": "ena2m4",
      "title": "Clínica de sonido: CHÍI-pa dan máin",
      "subtitle": "La -er que no suena a -er, el than que casi no suena, y el par que cuesta dinero",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m4l6",
      "phaseId": "ena2m4",
      "title": "How tall? How heavy?",
      "subtitle": "Medir cosas: altura, peso, capacidad y temperatura",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m4l7",
      "phaseId": "ena2m4",
      "title": "More, most, enough, none",
      "subtitle": "Comparar cantidades: las palabritas que van delante del sustantivo",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m4l8",
      "phaseId": "ena2m4",
      "title": "As cheap as, too small",
      "subtitle": "Frontera: decir que dos cosas son iguales, y que algo se pasa o no llega",
      "minutes": 9,
      "nEx": 11
     },
     {
      "id": "ena2m4l9",
      "phaseId": "ena2m4",
      "title": "Two pictures, one minute",
      "subtitle": "La Parte 3 del oral, montada de principio a fin con lo de este módulo",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m5",
    "level": "a2",
    "n": 5,
    "title": "How much sugar?",
    "goal": "Comer y beber fuera de casa de principio a fin: distinguir lo que el inglés cuenta de lo que no, cuantificarlo (much, many, a lot of, a few, a little), pedirlo con el registro que puntúa (Could I have… please) y quejarte y disculparte sin sonar borde.",
    "color": "#4d7c0f",
    "lessons": [
     {
      "id": "ena2m5l1",
      "phaseId": "ena2m5",
      "title": "Two coffees, please",
      "subtitle": "El inglés parte los sustantivos en dos montones — y no los reparte como el español",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m5l2",
      "phaseId": "ena2m5",
      "title": "People are very friendly",
      "subtitle": "Diez palabras que el español cuenta y el inglés no — se aprenden enteras",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m5l3",
      "phaseId": "ena2m5",
      "title": "Some tea? Any milk?",
      "subtitle": "El A1 te dio la fórmula; aquí está el sistema — con sus dos excepciones",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m5l4",
      "phaseId": "ena2m5",
      "title": "How much sugar?",
      "subtitle": "Cuantificar los dos montones: much, many y el a lot of que se dice de verdad",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m5l5",
      "phaseId": "ena2m5",
      "title": "Clínica de sonido: a bottle of water",
      "subtitle": "Las palabras se enlazan — y así es como se cuenta lo que no se cuenta",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m5l6",
      "phaseId": "ena2m5",
      "title": "A few chips, a little salt",
      "subtitle": "Un poco de qué — y lo que cambia cuando le quitas el «a»",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m5l7",
      "phaseId": "ena2m5",
      "title": "I like music",
      "subtitle": "Hablando en general, el inglés quita el artículo — y el español lo pone",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m5l8",
      "phaseId": "ena2m5",
      "title": "Could I have the menu, please?",
      "subtitle": "Pedir en inglés: la escalera que decide si suenas educado o mandón",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m5l9",
      "phaseId": "ena2m5",
      "title": "Sorry, this is cold",
      "subtitle": "Quejarse sin sonar borde, disculparse y pagar — la comida entera, de la puerta a la cuenta",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m6",
    "level": "a2",
    "n": 6,
    "title": "I'm going to Brighton",
    "goal": "Contar tus planes: la intención con be going to, la cita cerrada con el presente continuo, lo que vas a hacer cuando llegues (when / before / after) y cómo se dice por dónde se va — along, across, towards, up, down.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "ena2m6l1",
      "phaseId": "ena2m6",
      "title": "I'm going to book a hotel",
      "subtitle": "El futuro decidido — y por fin se aclara qué significa «I'm going to work»",
      "minutes": 11,
      "nEx": 14
     },
     {
      "id": "ena2m6l2",
      "phaseId": "ena2m6",
      "title": "Are you going to take the train?",
      "subtitle": "Preguntar el plan, negarlo — y decir lo que se ve venir",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m6l3",
      "phaseId": "ena2m6",
      "title": "We're meeting Amy at six",
      "subtitle": "La cita que ya está en la agenda — y el error que suena perfecto en español",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m6l4",
      "phaseId": "ena2m6",
      "title": "When I get there, I'm going to call you",
      "subtitle": "«Cuando llegue»: el subjuntivo español no existe, y el futuro tampoco se repite",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m6l5",
      "phaseId": "ena2m6",
      "title": "Clínica de sonido: GÓU-in-ta",
      "subtitle": "Por qué nunca oyes «going to» — y por qué a ti no te entienden",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m6l6",
      "phaseId": "ena2m6",
      "title": "Along the beach, across the road",
      "subtitle": "Las preposiciones que cuentan el camino, no el sitio",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m6l7",
      "phaseId": "ena2m6",
      "title": "Platform four, coach B",
      "subtitle": "Las palabras del viaje — y los incontables que hacen fallar una frase entera",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "ena2m6l8",
      "phaseId": "ena2m6",
      "title": "How about going on Friday?",
      "subtitle": "Proponer sin mandar, aceptar con ganas y decir que no sin quedar mal",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m6l9",
      "phaseId": "ena2m6",
      "title": "Your plan, in one minute",
      "subtitle": "Todo el módulo junto — y tu próximo viaje contado de principio a fin",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m7",
    "level": "a2",
    "n": 7,
    "title": "You have to check in",
    "goal": "Manejarte en una ventanilla: decir lo que hay que hacer (have to, must), entender lo que está prohibido en un cartel (mustn't) y distinguirlo de lo que simplemente no hace falta (don't have to), pedir permiso y pedir favores con la cortesía que toca (can, could, may) y contar lo que no conseguiste hacer (couldn't).",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "ena2m7l1",
      "phaseId": "ena2m7",
      "title": "You have to check in",
      "subtitle": "«Tengo que…», «hay que…»: la obligación que no pusiste tú",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m7l2",
      "phaseId": "ena2m7",
      "title": "Passengers must show their tickets",
      "subtitle": "El verbo de los avisos — y la preposición que el español mete y aquí sobra",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "ena2m7l3",
      "phaseId": "ena2m7",
      "title": "You mustn't smoke in here",
      "subtitle": "Lo que está prohibido — y cómo lo escriben los carteles ingleses",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "ena2m7l4",
      "phaseId": "ena2m7",
      "title": "You don't have to pay",
      "subtitle": "Los dos «no tienes que» del español, y por qué en inglés son contrarios",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m7l5",
      "phaseId": "ena2m7",
      "title": "Clínica de sonido: MA-sent",
      "subtitle": "La t que desaparece, el «hafta» que nadie escribe, y el can que dice lo contrario",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "ena2m7l6",
      "phaseId": "ena2m7",
      "title": "Can I sit here?",
      "subtitle": "El can que ya conoces, en su segundo oficio: permiso y favores",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m7l7",
      "phaseId": "ena2m7",
      "title": "Could I have a stamp, please?",
      "subtitle": "Can → Could → May: los tres escalones, y por qué «I want» suena a orden",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "ena2m7l8",
      "phaseId": "ena2m7",
      "title": "I couldn't get through",
      "subtitle": "Cuando el servicio falla: el pasado de can, y el taller al teléfono",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m7l9",
      "phaseId": "ena2m7",
      "title": "What does that sign say?",
      "subtitle": "Todo el módulo junto — y tres carteles explicados con tus palabras",
      "minutes": 13,
      "nEx": 12
     }
    ]
   },
   {
    "id": "ena2m8",
    "level": "a2",
    "n": 8,
    "title": "Where does it hurt?",
    "goal": "Resolver una consulta médica entera en inglés: nombrar la parte del cuerpo que duele, contar el síntoma y el accidente, pedir cita, entender al médico y a la farmacia, y dar consejo con las cuatro fórmulas del A2 (Why don't you…?, You need to…, el imperativo y have to) sabiendo cuál pesa más.",
    "color": "#b91c1c",
    "lessons": [
     {
      "id": "ena2m8l1",
      "phaseId": "ena2m8",
      "title": "My head hurts",
      "subtitle": "Decir qué te duele — y por qué «I have pain in my head» no lo dice nadie",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "ena2m8l2",
      "phaseId": "ena2m8",
      "title": "I don't feel very well",
      "subtitle": "Contar el síntoma — y no decirle a nadie que estás estreñido sin querer",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m8l3",
      "phaseId": "ena2m8",
      "title": "I cut my finger",
      "subtitle": "Contar el accidente — con los verbos que no cambian en pasado",
      "minutes": 11,
      "nEx": 11
     },
     {
      "id": "ena2m8l4",
      "phaseId": "ena2m8",
      "title": "I'd like to make an appointment",
      "subtitle": "El ambulatorio de principio a fin — y dos falsos amigos por el camino",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m8l5",
      "phaseId": "ena2m8",
      "title": "hurt, nurse, worse, first, work",
      "subtitle": "La vocal larga que no tiene r — y las consonantes que se amontonan al final",
      "minutes": 10,
      "nEx": 11
     },
     {
      "id": "ena2m8l6",
      "phaseId": "ena2m8",
      "title": "Why don't you go home?",
      "subtitle": "Aconsejar sin «should»: la pregunta que en realidad es un consejo",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m8l7",
      "phaseId": "ena2m8",
      "title": "You need to see a doctor",
      "subtitle": "De la orden al consejo: los cuatro peldaños, de un vistazo",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m8l8",
      "phaseId": "ena2m8",
      "title": "Have you got anything for a cough?",
      "subtitle": "La farmacia inglesa — y la receta que no es de cocina",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m8l9",
      "phaseId": "ena2m8",
      "title": "How are you feeling?",
      "subtitle": "La consulta entera, de la puerta a la despedida — y una ventana al B1",
      "minutes": 14,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m9",
    "level": "a2",
    "n": 9,
    "title": "Whose is this?",
    "goal": "Afinar la puntería: colocar los pronombres de objeto detrás del verbo, repartir los verbos entre «tell me» y «explain to me», usar el reflexivo solo cuando toca, decir de quién es cada cosa (mine, yours, Amy's, whose), preguntar con how often / why / which, describir dónde vives, y abrir, interrumpir y cerrar una conversación como se hace de verdad.",
    "color": "#0891b2",
    "lessons": [
     {
      "id": "ena2m9l1",
      "phaseId": "ena2m9",
      "title": "I saw her this morning",
      "subtitle": "Los pronombres que en español van delante y en inglés van detrás",
      "minutes": 11,
      "nEx": 14
     },
     {
      "id": "ena2m9l2",
      "phaseId": "ena2m9",
      "title": "Tell me · explain it to me",
      "subtitle": "Dos montones de verbos, y solo hay que memorizar el pequeño",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m9l3",
      "phaseId": "ena2m9",
      "title": "I did it myself",
      "subtitle": "El reflexivo inglés — y los veinte «me» españoles que hay que tirar",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m9l4",
      "phaseId": "ena2m9",
      "title": "Whose is this?",
      "subtitle": "Mío, tuyo, de Amy — y el genitivo que le da la vuelta a la frase",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m9l5",
      "phaseId": "ena2m9",
      "title": "Clínica de sonido: tell 'im, ask 'er",
      "subtitle": "La h que desaparece — y por qué el Listening se te escapa justo ahí",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m9l6",
      "phaseId": "ena2m9",
      "title": "Where I live",
      "subtitle": "El piso, el alquiler, el casero y los vecinos — segunda pasada",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "ena2m9l7",
      "phaseId": "ena2m9",
      "title": "How often? Why? Which?",
      "subtitle": "Las preguntas finas — y quién friega los platos",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "ena2m9l8",
      "phaseId": "ena2m9",
      "title": "Have you got a minute?",
      "subtitle": "Abrir, interrumpir y cerrar una conversación sin quedar mal",
      "minutes": 12,
      "nEx": 14
     },
     {
      "id": "ena2m9l9",
      "phaseId": "ena2m9",
      "title": "The girl who lives upstairs",
      "subtitle": "Frontera: el «que» inglés — y el que desaparece",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m10",
    "level": "a2",
    "n": 10,
    "title": "Have you ever…?",
    "goal": "Frontera con el B1: contar y preguntar por experiencias de vida con el present perfect (ever/never, been vs gone, just/already/yet, for/since), y —sobre todo— saber cuándo NO se usa, porque el marcador de tiempo manda.",
    "color": "#0e7490",
    "lessons": [
     {
      "id": "ena2m10l1",
      "phaseId": "ena2m10",
      "title": "Have you ever…?",
      "subtitle": "Preguntar por toda una vida sin poner fecha a nada",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m10l2",
      "phaseId": "ena2m10",
      "title": "The third column",
      "subtitle": "El participio: la columna que el pasado simple no te pidió",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "ena2m10l3",
      "phaseId": "ena2m10",
      "title": "Been or gone?",
      "subtitle": "Dos participios de «ir», y solo uno significa que has vuelto",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m10l4",
      "phaseId": "ena2m10",
      "title": "Just, already, yet",
      "subtitle": "Acabo de, ya, todavía no — y dónde se coloca cada uno",
      "minutes": 10,
      "nEx": 13
     },
     {
      "id": "ena2m10l5",
      "phaseId": "ena2m10",
      "title": "The disappearing have",
      "subtitle": "Clínica de sonido: 've, 's y el have que casi no suena",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m10l6",
      "phaseId": "ena2m10",
      "title": "Yesterday or so far?",
      "subtitle": "La frontera de verdad: cuándo el inglés NO te deja usar el perfecto",
      "minutes": 13,
      "nEx": 14
     },
     {
      "id": "ena2m10l7",
      "phaseId": "ena2m10",
      "title": "For three years, since 2019",
      "subtitle": "«Desde hace tres años»: tres errores encadenados, uno por uno",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m10l8",
      "phaseId": "ena2m10",
      "title": "What have you studied?",
      "subtitle": "Estudios, asignaturas y currículum: el campo donde vive este tiempo verbal",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m10l9",
      "phaseId": "ena2m10",
      "title": "Three people, three answers",
      "subtitle": "Todo el módulo junto — y el recordatorio de qué entra y qué no",
      "minutes": 13,
      "nEx": 12
     }
    ]
   },
   {
    "id": "ena2m11",
    "level": "a2",
    "n": 11,
    "title": "If it rains, we'll stay in",
    "goal": "Hablar de lo que pasará y de lo que quizá pase: will y won't, might y may, la primera condicional y los adverbios de probabilidad. Al terminar sabrás leer un parte del tiempo, avisar de algo que viene y montar un plan con su plan B.",
    "color": "#0369a1",
    "lessons": [
     {
      "id": "ena2m11l1",
      "phaseId": "ena2m11",
      "title": "It will rain tomorrow",
      "subtitle": "El otro futuro: la decisión de ahora mismo y la predicción a secas",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "ena2m11l2",
      "phaseId": "ena2m11",
      "title": "I think it'll rain",
      "subtitle": "Cuándo va will y cuándo va going to — y por qué el inglés niega «creo que no» al revés",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m11l3",
      "phaseId": "ena2m11",
      "title": "The weather forecast",
      "subtitle": "Leer y oír un parte del tiempo — y el «it» que el español nunca pone",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m11l4",
      "phaseId": "ena2m11",
      "title": "It might rain",
      "subtitle": "Puede que sí, puede que no — y por qué «a lo mejor voy» no se traduce palabra por palabra",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m11l5",
      "phaseId": "ena2m11",
      "title": "I won't / I want",
      "subtitle": "La clínica: la 'll que no es sílaba y la vocal que separa un no de un quiero",
      "minutes": 11,
      "nEx": 12
     },
     {
      "id": "ena2m11l6",
      "phaseId": "ena2m11",
      "title": "If it rains, we'll stay in",
      "subtitle": "La condición y su consecuencia — y la mitad de la frase que nunca lleva futuro",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "ena2m11l7",
      "phaseId": "ena2m11",
      "title": "It'll probably rain",
      "subtitle": "Los tres adverbios de probabilidad — y dónde los pone el inglés, que no es donde los pone el español",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m11l8",
      "phaseId": "ena2m11",
      "title": "Take an umbrella, just in case",
      "subtitle": "Avisar de lo que viene, decir lo que esperas y tener siempre un plan B",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m11l9",
      "phaseId": "ena2m11",
      "title": "Your plan B, in one minute",
      "subtitle": "Todo el módulo junto — y las tres fórmulas que te llevas al módulo de examen",
      "minutes": 14,
      "nEx": 13
     }
    ]
   },
   {
    "id": "ena2m12",
    "level": "a2",
    "n": 12,
    "title": "Your A2 exam",
    "goal": "Conocer el LanguageCert A2 Access por dentro y entrenar sus ocho tareas exactas — con la ficha que se escribe, los dos textos de 30-50 palabras y el minuto de monólogo — sin aprender ni una estructura nueva.",
    "color": "#9f1239",
    "lessons": [
     {
      "id": "ena2m12l1",
      "phaseId": "ena2m12",
      "title": "The A2 exam, up close",
      "subtitle": "El mapa del A2 Access — y, con todas las letras, qué NO entra",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m12l2",
      "phaseId": "ena2m12",
      "title": "Listening: parts 1 and 2",
      "subtitle": "Dos datos por ítem (eso es nuevo) y la mejor réplica",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m12l3",
      "phaseId": "ena2m12",
      "title": "Listening: parts 3 and 4",
      "subtitle": "La conversación… y la ficha de recados que SE ESCRIBE",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m12l4",
      "phaseId": "ena2m12",
      "title": "Reading: tasks 1 and 2",
      "subtitle": "Seis textos con un hueco, y el texto roto con una frase de sobra",
      "minutes": 10,
      "nEx": 12
     },
     {
      "id": "ena2m12l5",
      "phaseId": "ena2m12",
      "title": "Reading: tasks 3 and 4",
      "subtitle": "Cuatro textos con distinto propósito, y la lectura larga de verdad",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "ena2m12l6",
      "phaseId": "ena2m12",
      "title": "Writing 1: the informal reply",
      "subtitle": "Tres preguntas, tres respuestas, 30-50 palabras",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m12l7",
      "phaseId": "ena2m12",
      "title": "Writing 2: the formal text",
      "subtitle": "Tres contenidos obligados, y un registro que no es el tuyo de siempre",
      "minutes": 12,
      "nEx": 12
     },
     {
      "id": "ena2m12l8",
      "phaseId": "ena2m12",
      "title": "Spoken: your nine minutes",
      "subtitle": "Cuatro partes que pesan igual, 30 segundos de papel, un minuto de reloj — y las once clínicas de sonido en batería",
      "minutes": 22,
      "nEx": 19
     },
     {
      "id": "ena2m12l9",
      "phaseId": "ena2m12",
      "title": "Strategy, and the whole A2 in one lesson",
      "subtitle": "El reloj, la frontera otra vez, y un ejercicio por cada módulo del nivel",
      "minutes": 14,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m1",
    "level": "b1",
    "n": 1,
    "title": "Two Years In",
    "goal": "Contar lo que llevas hecho y cuánto tiempo llevas haciéndolo: present perfect simple y continuo, for/since, already/yet/just/still, y el vocabulario real del alquiler en Londres.",
    "color": "#0f766e",
    "lessons": [
     {
      "id": "enb1m1l1",
      "phaseId": "enb1m1",
      "title": "Two years in",
      "subtitle": "Bienvenido al B1 — y tus dos años contados en una sola frase",
      "minutes": 11,
      "nEx": 13
     },
     {
      "id": "enb1m1l2",
      "phaseId": "enb1m1",
      "title": "How long have you been here?",
      "subtitle": "for y since, y el tiempo verbal que el español no usa",
      "minutes": 12,
      "nEx": 14
     },
     {
      "id": "enb1m1l3",
      "phaseId": "enb1m1",
      "title": "Already, yet, just, still",
      "subtitle": "Los cuatro adverbios del perfecto — y dónde va cada uno en la frase",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m1l4",
      "phaseId": "enb1m1",
      "title": "The flat hunt",
      "subtitle": "Descifrar un anuncio británico y escribirle a la casera",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb1m1l5",
      "phaseId": "enb1m1",
      "title": "Say, tell, explain",
      "subtitle": "El «me» del español que en inglés no cabe en todos los verbos",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m1l6",
      "phaseId": "enb1m1",
      "title": "Four addresses in two years",
      "subtitle": "Tu primer texto largo de verdad — y las preguntas que no se responden buscando",
      "minutes": 16,
      "nEx": 11
     },
     {
      "id": "enb1m1l7",
      "phaseId": "enb1m1",
      "title": "Depend on, worry about",
      "subtitle": "La preposición es parte de la palabra — y el adverbio no se mete en medio",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m1l8",
      "phaseId": "enb1m1",
      "title": "Although, despite, unless",
      "subtitle": "Los conectores que sostienen 110 palabras — y la carta a Emma",
      "minutes": 16,
      "nEx": 14
     },
     {
      "id": "enb1m1l9",
      "phaseId": "enb1m1",
      "title": "Valeria's two years",
      "subtitle": "La historia del módulo, el repaso y tu primer monólogo del nivel",
      "minutes": 25,
      "nEx": 17
     },
     {
      "id": "enb1m1l10",
      "phaseId": "enb1m1",
      "title": "Exam lab: Listening Part 1",
      "subtitle": "Siete frases sueltas y una pregunta que no es «¿qué has entendido?»",
      "minutes": 14,
      "nEx": 12
     }
    ]
   },
   {
    "id": "enb1m2",
    "level": "b1",
    "n": 2,
    "title": "The Job I Want",
    "goal": "Describir puestos, personas y sitios sin empezar otra frase: relativas con who/which/that, el relativo omitido, la preposición al final y las explicativas con comas — más el vocabulario real del sueldo, los turnos y la búsqueda de trabajo en Londres.",
    "color": "#4338ca",
    "lessons": [
     {
      "id": "enb1m2l1",
      "phaseId": "enb1m2",
      "title": "The job I want",
      "subtitle": "La máquina de alargar frases: who, which, that",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m2l2",
      "phaseId": "enb1m2",
      "title": "Whose, where, when",
      "subtitle": "Los otros tres relativos — y el «en él» que sobra",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m2l3",
      "phaseId": "enb1m2",
      "title": "The job I applied for",
      "subtitle": "El relativo que se puede quitar — y la preposición que se queda sola al final",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m2l4",
      "phaseId": "enb1m2",
      "title": "Salary, shifts and prospects",
      "subtitle": "El dinero, las condiciones y la carta formal de 70-100 palabras",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m2l5",
      "phaseId": "enb1m2",
      "title": "Applying",
      "subtitle": "CV, referencias y entrevista — y la preposición que viene pegada al verbo",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "enb1m2l6",
      "phaseId": "enb1m2",
      "title": "Starting again at forty-three",
      "subtitle": "Un texto largo de verdad — y dos preguntas de respuesta escrita, como el Reading Part 4",
      "minutes": 17,
      "nEx": 12
     },
     {
      "id": "enb1m2l7",
      "phaseId": "enb1m2",
      "title": "Amy, who is a nurse",
      "subtitle": "Las comas que cambian el significado — y valen puntos de Organisation",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m2l8",
      "phaseId": "enb1m2",
      "title": "While, since, otherwise",
      "subtitle": "Seis conectores más — y la carta informal de 100-120 palabras",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m2l9",
      "phaseId": "enb1m2",
      "title": "Time to move on",
      "subtitle": "El repaso del módulo y tu monólogo de minuto y medio",
      "minutes": 25,
      "nEx": 17
     },
     {
      "id": "enb1m2l10",
      "phaseId": "enb1m2",
      "title": "Exam lab: Reading Part 1",
      "subtitle": "Cinco textos cortos, un hueco cada uno, y la palabra que casi nunca es la que buscas",
      "minutes": 14,
      "nEx": 12
     }
    ]
   },
   {
    "id": "enb1m3",
    "level": "b1",
    "n": 3,
    "title": "What They Said",
    "goal": "Contar lo que otro dijo sin traicionarlo y preguntar sin sonar brusco: estilo indirecto, preguntas referidas sin inversión, preguntas incrustadas de cortesía y los verbos que dicen CÓMO se dijo algo.",
    "color": "#6d28d9",
    "lessons": [
     {
      "id": "enb1m3l1",
      "phaseId": "enb1m3",
      "title": "Say, tell, ask",
      "subtitle": "Tres verbos de decir, tres construcciones — y el recado que hay que pasar",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m3l2",
      "phaseId": "enb1m3",
      "title": "One step back",
      "subtitle": "El tiempo verbal retrocede un paso — y esto, por una vez, el español ya lo hace",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m3l3",
      "phaseId": "enb1m3",
      "title": "She asked me where it was",
      "subtitle": "La pregunta referida deja de ser pregunta — y ese es todo el truco",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m3l4",
      "phaseId": "enb1m3",
      "title": "Could you tell me…?",
      "subtitle": "Subir el registro entero con una fórmula — y la carta formal del examen",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m3l5",
      "phaseId": "enb1m3",
      "title": "He admitted, she promised",
      "subtitle": "Dejar de contarlo todo con «said» — y la construcción que pide cada verbo",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m3l6",
      "phaseId": "enb1m3",
      "title": "The bus that was never cut",
      "subtitle": "Un texto de 450 palabras lleno de estilo indirecto — y de Glasgow, no de Londres",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m3l7",
      "phaseId": "enb1m3",
      "title": "Sorry, I didn't catch that",
      "subtitle": "Pedir que te repitan sin quedar mal, confirmar lo entendido — y puntuar una cita",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m3l8",
      "phaseId": "enb1m3",
      "title": "You'll never guess what happened",
      "subtitle": "Contar un lío por escrito: apparently, actually, anyway, at least — y la carta a Emma",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m3l9",
      "phaseId": "enb1m3",
      "title": "To cut a long story short",
      "subtitle": "Todo el módulo junto, la historia entera y tu monólogo de minuto y medio",
      "minutes": 26,
      "nEx": 18
     },
     {
      "id": "enb1m3l10",
      "phaseId": "enb1m3",
      "title": "Exam lab: Listening Part 3",
      "subtitle": "Un monólogo largo, una ficha con siete huecos y un máximo de tres palabras",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m4",
    "level": "b1",
    "n": 4,
    "title": "Read All About It",
    "goal": "Informar sin decir quién: la pasiva en presente, pasado y perfecto, las tres salidas inglesas del «se» impersonal, el vocabulario de la prensa y de las redes, y el Reading Part 4 del examen.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "enb1m4l1",
      "phaseId": "enb1m4",
      "title": "Written, published, delivered",
      "subtitle": "La pasiva: cuando lo que importa es qué pasó, no quién lo hizo",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m4l2",
      "phaseId": "enb1m4",
      "title": "Se dice, se hace, se cierra",
      "subtitle": "El «se» impersonal no existe en inglés: hay tres maneras de sustituirlo",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m4l3",
      "phaseId": "enb1m4",
      "title": "Has been published",
      "subtitle": "El perfecto en pasiva, y por qué los titulares no tienen verbo",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m4l4",
      "phaseId": "enb1m4",
      "title": "It got nicked",
      "subtitle": "La pasiva de la calle: get + participio, y cuándo NO escribirla",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m4l5",
      "phaseId": "enb1m4",
      "title": "It was shared two thousand times",
      "subtitle": "El inglés de las redes — y tu carta informal a Emma",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m4l6",
      "phaseId": "enb1m4",
      "title": "The paper nobody reads until it goes",
      "subtitle": "Prensa local, ayuntamiento y voluntarios — y el «by» que decide si sobra",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m4l7",
      "phaseId": "enb1m4",
      "title": "It is said that…",
      "subtitle": "Los ladrillos del argumento escrito: informar sin firmar",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m4l8",
      "phaseId": "enb1m4",
      "title": "Fact or opinion?",
      "subtitle": "Pruebas, titulares que engañan — y tu carta al periódico",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m4l9",
      "phaseId": "enb1m4",
      "title": "All in all",
      "subtitle": "La espiral del nivel y tu monólogo de minuto y medio",
      "minutes": 24,
      "nEx": 18
     },
     {
      "id": "enb1m4l10",
      "phaseId": "enb1m4",
      "title": "Exam lab: Reading Part 4",
      "subtitle": "Un texto largo, ocho preguntas abiertas y un máximo de tres palabras",
      "minutes": 24,
      "nEx": 14
     }
    ]
   },
   {
    "id": "enb1m5",
    "level": "b1",
    "n": 5,
    "title": "If I Were You",
    "goal": "Hipotetizar, desear y aconsejar sin ofender: segundo condicional, wish e if only, would rather y had better, y el vocabulario real del dinero, las devoluciones y las reclamaciones.",
    "color": "#a21caf",
    "lessons": [
     {
      "id": "enb1m5l1",
      "phaseId": "enb1m5",
      "title": "If I had the money",
      "subtitle": "El segundo condicional: dos mitades, y cada una lleva lo suyo",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m5l2",
      "phaseId": "enb1m5",
      "title": "If I were you",
      "subtitle": "Aconsejar sin mandar — y el «were» que vale para todas las personas",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m5l3",
      "phaseId": "enb1m5",
      "title": "Real or unreal?",
      "subtitle": "Primer y segundo condicional — y el futuro que en inglés no cabe detrás de «if»",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m5l4",
      "phaseId": "enb1m5",
      "title": "I'd like to make a complaint",
      "subtitle": "Quejarse en inglés sin sonar borde — y la carta que sí te contestan",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m5l5",
      "phaseId": "enb1m5",
      "title": "I wish I hadn't",
      "subtitle": "Desear lo que no es y lamentar lo que fue — wish, if only y should have",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m5l6",
      "phaseId": "enb1m5",
      "title": "The shop where nothing is for sale",
      "subtitle": "Tu texto largo del módulo — y un inglés que no es el de Londres: el de Cardiff",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m5l7",
      "phaseId": "enb1m5",
      "title": "Pay for, spend on",
      "subtitle": "La preposición es parte de la palabra — y un falso amigo que cambia a una persona entera",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m5l8",
      "phaseId": "enb1m5",
      "title": "Would you rather?",
      "subtitle": "Preferir, advertir y matizar — y la carta a Emma con tres conectores",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m5l9",
      "phaseId": "enb1m5",
      "title": "All in all",
      "subtitle": "Todo el módulo junto, el repaso de lo que traías y tu monólogo de minuto y medio",
      "minutes": 26,
      "nEx": 18
     },
     {
      "id": "enb1m5l10",
      "phaseId": "enb1m5",
      "title": "Exam lab: Writing Part 1",
      "subtitle": "Setenta palabras, tres puntos de contenido y cuatro criterios que se cobran por separado",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m6",
    "level": "b1",
    "n": 6,
    "title": "Body and Mind",
    "goal": "Deducir a partir de indicios, aconsejar sin ofender y separar lo que está prohibido de lo que simplemente no hace falta: must be / can't be / might, la escalera entera de la obligación, la probabilidad con adverbio, y el vocabulario real de la salud y del NHS.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "enb1m6l1",
      "phaseId": "enb1m6",
      "title": "It must be something you ate",
      "subtitle": "Deducir en inglés: lo que tiene que ser, lo que no puede ser y lo que a lo mejor es",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m6l2",
      "phaseId": "enb1m6",
      "title": "Registering with a GP",
      "subtitle": "Cómo se entra en el sistema — y por qué «mustn't» y «don't have to» no son lo mismo",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m6l3",
      "phaseId": "enb1m6",
      "title": "You should get that looked at",
      "subtitle": "Dar un consejo que no ofenda — y rechazar uno con motivos",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m6l4",
      "phaseId": "enb1m6",
      "title": "What seems to be the problem?",
      "subtitle": "Contar un síntoma en treinta segundos — y escribirle a la administración del centro",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m6l5",
      "phaseId": "enb1m6",
      "title": "I'll probably be back on Monday",
      "subtitle": "Cuánto de seguro estás de lo que va a pasar — y dónde se coloca el adverbio",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m6l6",
      "phaseId": "enb1m6",
      "title": "Free at the point of use",
      "subtitle": "Un texto de Cardiff, cuatro sistemas distintos y dos conectores nuevos",
      "minutes": 19,
      "nEx": 13
     },
     {
      "id": "enb1m6l7",
      "phaseId": "enb1m6",
      "title": "Getting over it",
      "subtitle": "Siete phrasal verbs de salud — y dónde va el objeto cuando lo hay",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m6l8",
      "phaseId": "enb1m6",
      "title": "Nora had a fall",
      "subtitle": "Contar un susto por escrito: luckily, though, in addition, on the other hand",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m6l9",
      "phaseId": "enb1m6",
      "title": "All in all",
      "subtitle": "Resumir, cuidarse y hablar minuto y medio de salud sin repetir «I think»",
      "minutes": 25,
      "nEx": 18
     },
     {
      "id": "enb1m6l10",
      "phaseId": "enb1m6",
      "title": "Exam lab: Listening Part 2",
      "subtitle": "Tres conversaciones cortas, dos preguntas por conversación — y ninguna se contesta con un dato",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m7",
    "level": "b1",
    "n": 7,
    "title": "The Way We Speak",
    "goal": "Entender el inglés que no es el de Londres —Escocia, Irlanda, Estados Unidos, Australia, India— y sostener una conversación de verdad: coletillas, lenguaje vago, marcadores del habla y las cuatro maneras de decir «no te he entendido» sin quedarte callado.",
    "color": "#b45309",
    "lessons": [
     {
      "id": "enb1m7l1",
      "phaseId": "enb1m7",
      "title": "Which English?",
      "subtitle": "Acento, dialecto y argot — y qué se puede aprender leyendo",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m7l2",
      "phaseId": "enb1m7",
      "title": "…aren't you? …haven't you?",
      "subtitle": "El «¿no?» del español son veinte coletillas distintas en inglés",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m7l3",
      "phaseId": "enb1m7",
      "title": "Lovely day, isn't it?",
      "subtitle": "Cuándo la coletilla pregunta de verdad y cuándo solo busca compañía",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m7l4",
      "phaseId": "enb1m7",
      "title": "Lift or elevator?",
      "subtitle": "Siete pares de palabras, una decisión — y la carta formal del módulo",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m7l5",
      "phaseId": "enb1m7",
      "title": "Sort of, or something",
      "subtitle": "Cómo suena un nativo cuando no está seguro — y por qué tú también deberías",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m7l6",
      "phaseId": "enb1m7",
      "title": "Half a word is enough",
      "subtitle": "Un texto australiano entero — y qué hacer con las palabras que no vienen en tu libro",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m7l7",
      "phaseId": "enb1m7",
      "title": "Anyway, by the way, mind you",
      "subtitle": "Las seis palabras que hacen que una conversación no se caiga",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m7l8",
      "phaseId": "enb1m7",
      "title": "Got to go. Sounds good.",
      "subtitle": "El inglés hablado se come el principio de las frases — y qué decir cuando no entiendes",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m7l9",
      "phaseId": "enb1m7",
      "title": "One language, many Englishes",
      "subtitle": "El repaso del módulo y tu monólogo de minuto y medio",
      "minutes": 25,
      "nEx": 18
     },
     {
      "id": "enb1m7l10",
      "phaseId": "enb1m7",
      "title": "Exam lab: Speaking Parts 1 y 2",
      "subtitle": "Deletrear, opinar y meterte en dos escenas de tres minutos",
      "minutes": 15,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m8",
    "level": "b1",
    "n": 8,
    "title": "Green Enough?",
    "goal": "Comparar con matices y argumentar: far/much/a bit/slightly + comparativo, the more… the better, as… as, too/enough, all/most/both/neither, y los conectores de contraste y concesión que sostienen un texto entero.",
    "color": "#15803d",
    "lessons": [
     {
      "id": "enb1m8l1",
      "phaseId": "enb1m8",
      "title": "Far cheaper, slightly higher",
      "subtitle": "Comparar ya lo sabes; lo nuevo es decir CUÁNTO más",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m8l2",
      "phaseId": "enb1m8",
      "title": "The more you recycle…",
      "subtitle": "Dos comparativos en la misma frase, y los dos verbos con preposición pegada",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m8l3",
      "phaseId": "enb1m8",
      "title": "As green as it looks?",
      "subtitle": "as… as, the same as, twice as much y el «parece» que no es «seems»",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m8l4",
      "phaseId": "enb1m8",
      "title": "Too much, not enough",
      "subtitle": "Demasiado delante, suficiente detrás — y la coletilla que casi nadie escribe",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m8l5",
      "phaseId": "enb1m8",
      "title": "All, most, both, neither",
      "subtitle": "Cuánta gente, cuántas cosas — y el «of» que sobra la mitad de las veces",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m8l6",
      "phaseId": "enb1m8",
      "title": "The street that stopped buying new",
      "subtitle": "Un boletín de barrio de Cardiff — y dos preguntas que no se responden buscando",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m8l7",
      "phaseId": "enb1m8",
      "title": "Even though, however, despite",
      "subtitle": "Los conectores que convierten frases sueltas en un argumento — y la carta al ayuntamiento",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m8l8",
      "phaseId": "enb1m8",
      "title": "You've got a point",
      "subtitle": "Dar la razón a medias es lo que más sube la nota — y la carta a Emma",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m8l9",
      "phaseId": "enb1m8",
      "title": "Green enough?",
      "subtitle": "Lo que haces de verdad, dicho en minuto y medio — y el repaso del módulo",
      "minutes": 26,
      "nEx": 19
     },
     {
      "id": "enb1m8l10",
      "phaseId": "enb1m8",
      "title": "Exam lab: Reading Part 2",
      "subtitle": "Un texto con seis agujeros, siete frases donde elegir y una que sobra",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m9",
    "level": "b1",
    "n": 9,
    "title": "On the Move",
    "goal": "Planear y predecir con los cuatro futuros ingleses, entender la megafonía y los papeles de un viaje de verdad, reclamar cuando algo sale mal y —sobre todo— dejar de meter futuro donde el inglés pone presente: as soon as I get there, not «as soon as I will get there».",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "enb1m9l1",
      "phaseId": "enb1m9",
      "title": "We're flying out on Friday",
      "subtitle": "Cuatro maneras de hablar del futuro, y el disparador que elige cada una",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m9l2",
      "phaseId": "enb1m9",
      "title": "Valid until 2031",
      "subtitle": "Pasaporte, visado, seguro y aduana — y un falso amigo que cuesta un ítem entero",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m9l3",
      "phaseId": "enb1m9",
      "title": "As soon as I get there",
      "subtitle": "«En cuanto llegue» no lleva futuro en inglés — y ahí se cae medio nivel",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "enb1m9l4",
      "phaseId": "enb1m9",
      "title": "As long as it fits",
      "subtitle": "Cuatro maneras de poner una condición — y «por si acaso», que no es ninguna de ellas",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m9l5",
      "phaseId": "enb1m9",
      "title": "The eight-fifteen has been cancelled",
      "subtitle": "Contar una incidencia y reclamar por escrito sin sonar a exigencia",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m9l6",
      "phaseId": "enb1m9",
      "title": "This train calls at…",
      "subtitle": "El inglés de los altavoces: se dice rápido, se dice una vez y no se repite",
      "minutes": 15,
      "nEx": 13
     },
     {
      "id": "enb1m9l7",
      "phaseId": "enb1m9",
      "title": "Can you drop me off?",
      "subtitle": "Seis phrasal verbs de viaje, y la preposición que va pegada y no se traduce",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m9l8",
      "phaseId": "enb1m9",
      "title": "We just made it",
      "subtitle": "Contar un viaje cuando ya ha pasado — y escribirle a una amiga sin sonar a informe",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m9l9",
      "phaseId": "enb1m9",
      "title": "It's a couple of hours",
      "subtitle": "Planear, calcular y contar — el módulo entero dicho por ti en minuto y medio",
      "minutes": 25,
      "nEx": 18
     },
     {
      "id": "enb1m9l10",
      "phaseId": "enb1m9",
      "title": "Exam lab: Reading Part 3",
      "subtitle": "Cuatro textos sobre lo mismo, escritos por cuatro motivos distintos — y siete preguntas que no se contestan leyendo entero",
      "minutes": 18,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m10",
    "level": "b1",
    "n": 10,
    "title": "People Like Us",
    "goal": "Contar una historia con el orden que tú decidas, no con el orden en que pasó: past perfect para lo que ya estaba antes, used to y would para lo que se repetía, los tres tiempos narrativos trabajando juntos, los recíprocos, las descripciones de personas con post-modificación y el vocabulario real de llevarse bien, pelearse y hacer las paces.",
    "color": "#166534",
    "lessons": [
     {
      "id": "enb1m10l1",
      "phaseId": "enb1m10",
      "title": "By the time I got there",
      "subtitle": "El pasado que ya estaba antes de lo que estás contando",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m10l2",
      "phaseId": "enb1m10",
      "title": "We get on really well",
      "subtitle": "El vocabulario de las relaciones que se rompen y se arreglan",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m10l3",
      "phaseId": "enb1m10",
      "title": "I used to, and I don't any more",
      "subtitle": "El hábito que se acabó — y el error de presente que casi ningún libro nombra",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m10l4",
      "phaseId": "enb1m10",
      "title": "Every summer she would sing",
      "subtitle": "El otro pasado repetido — y el único sitio donde «would» no sirve",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m10l5",
      "phaseId": "enb1m10",
      "title": "It all started when",
      "subtitle": "El fondo, los hechos y lo que ya estaba antes: los tres motores de una historia",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m10l6",
      "phaseId": "enb1m10",
      "title": "The shed at the end of the street",
      "subtitle": "Un texto de Sheffield, un dato que no te esperas y el past perfect leído, no escrito",
      "minutes": 19,
      "nEx": 13
     },
     {
      "id": "enb1m10l7",
      "phaseId": "enb1m10",
      "title": "Each other",
      "subtitle": "El «se» español se parte en dos al cruzar el Canal",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m10l8",
      "phaseId": "enb1m10",
      "title": "A tall woman in her forties",
      "subtitle": "Lo corto delante, lo largo detrás — y el carácter, que es lo que de verdad se pregunta",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m10l9",
      "phaseId": "enb1m10",
      "title": "Sorry about that",
      "subtitle": "Disculparse sin sobreactuar, perdonar sin decirlo y saber de quién te fías",
      "minutes": 25,
      "nEx": 19
     },
     {
      "id": "enb1m10l10",
      "phaseId": "enb1m10",
      "title": "Exam lab: Writing Part 2",
      "subtitle": "Cien palabras, dos funciones y un registro que no se puede fingir",
      "minutes": 20,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb1m11",
    "level": "b1",
    "n": 11,
    "title": "Rights and Wrongs",
    "goal": "Opinar sobre lo que pasa en tu barrio y salir con un acuerdo: los dos montones de verbos (enjoy doing / decide to do), los seis que cambian de sentido, el «to» de propósito que el español confunde con «for», dónde va el pronombre en un phrasal verb, y el vocabulario de normas, quejas y justicia.",
    "color": "#166534",
    "lessons": [
     {
      "id": "enb1m11l1",
      "phaseId": "enb1m11",
      "title": "I enjoy living here",
      "subtitle": "Dos montones de verbos: detrás de unos va -ing y detrás de otros, to. Y no hay regla",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m11l2",
      "phaseId": "enb1m11",
      "title": "I stopped listening",
      "subtitle": "Seis verbos donde la forma de detrás no es una regla: es el significado entero",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m11l3",
      "phaseId": "enb1m11",
      "title": "You're not meant to",
      "subtitle": "Las normas del portal, las del ayuntamiento y las del cartel — y la única regla del módulo que sí se deduce",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m11l4",
      "phaseId": "enb1m11",
      "title": "I came here to study English",
      "subtitle": "El calco más rentable del nivel: el español dice «para» dos veces y el inglés parte en dos",
      "minutes": 12,
      "nEx": 13
     },
     {
      "id": "enb1m11l5",
      "phaseId": "enb1m11",
      "title": "I looked it up",
      "subtitle": "El pronombre parte los phrasal verbs por la mitad — menos cuando no puede",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m11l6",
      "phaseId": "enb1m11",
      "title": "The entry",
      "subtitle": "Una hoja de vecinos del este de Belfast, y por qué el mismo problema se resuelve en sitios distintos",
      "minutes": 19,
      "nEx": 13
     },
     {
      "id": "enb1m11l7",
      "phaseId": "enb1m11",
      "title": "It isn't fair",
      "subtitle": "En inglés siempre hay alguien delante del verbo, aunque no sea nadie",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m11l8",
      "phaseId": "enb1m11",
      "title": "I'm not so sure about that",
      "subtitle": "Discrepar en inglés es un arte de amortiguadores — y el examen los cuenta",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m11l9",
      "phaseId": "enb1m11",
      "title": "How about meeting halfway?",
      "subtitle": "Una discusión que no termina en acuerdo no ha terminado — y el examen lo sabe",
      "minutes": 17,
      "nEx": 13
     },
     {
      "id": "enb1m11l10",
      "phaseId": "enb1m11",
      "title": "Exam lab: Listening Part 4 y Spoken Part 3",
      "subtitle": "La discusión que hay que ESCUCHAR y la discusión que hay que SOSTENER — las dos partes del examen que van de negociar",
      "minutes": 24,
      "nEx": 19
     }
    ]
   },
   {
    "id": "enb1m12",
    "level": "b1",
    "n": 12,
    "title": "Rumbo al LanguageCert B1 Achiever",
    "goal": "Entrar al examen sabiendo exactamente qué te van a pedir en cada una de las ocho partes, cuánto dura cada cosa y cuáles son las trece trampas que un hispanohablante paga en la nota. Ni una estructura nueva: todo lo que ya sabes, ordenado por dónde se cobra.",
    "color": "#166534",
    "lessons": [
     {
      "id": "enb1m12l1",
      "phaseId": "enb1m12",
      "title": "Two hours and forty minutes",
      "subtitle": "El examen por dentro: el reloj, los puntos y por qué la resistencia se entrena",
      "minutes": 13,
      "nEx": 13
     },
     {
      "id": "enb1m12l2",
      "phaseId": "enb1m12",
      "title": "Listening: parts 1 and 2",
      "subtitle": "Siete frases sueltas que hay que CONTESTAR, y tres conversaciones de las que hay que sacar la intención",
      "minutes": 14,
      "nEx": 13
     },
     {
      "id": "enb1m12l3",
      "phaseId": "enb1m12",
      "title": "Listening: the note sheet",
      "subtitle": "Siete huecos que se escriben al dictado, y una discusión de la que hay que separar el hecho de la opinión",
      "minutes": 23,
      "nEx": 18
     },
     {
      "id": "enb1m12l4",
      "phaseId": "enb1m12",
      "title": "Reading: what holds the text together",
      "subtitle": "Cinco huecos de cohesión y seis frases extraídas — y la frase que sobra",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m12l5",
      "phaseId": "enb1m12",
      "title": "Reading: eight questions you write yourself",
      "subtitle": "Cuatro textos con el mismo tema y distinto propósito, y el texto largo que ya no es un test",
      "minutes": 25,
      "nEx": 14
     },
     {
      "id": "enb1m12l6",
      "phaseId": "enb1m12",
      "title": "Writing Part 1: seventy to a hundred",
      "subtitle": "La carta formal, los tres puntos de contenido que se cuentan con el dedo, y el «se» impersonal que en inglés es pasiva",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m12l7",
      "phaseId": "enb1m12",
      "title": "Writing Part 2: the four criteria",
      "subtitle": "Cien a ciento veinte palabras con dos funciones, y los cuatro criterios convertidos en lista de comprobación",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb1m12l8",
      "phaseId": "enb1m12",
      "title": "Speaking: parts 1 and 2",
      "subtitle": "Tu apellido letra a letra, cinco preguntas que piden opinión, y dos situaciones — en una empiezas tú",
      "minutes": 16,
      "nEx": 13
     },
     {
      "id": "enb1m12l9",
      "phaseId": "enb1m12",
      "title": "Speaking: agreeing, and your ninety seconds",
      "subtitle": "La discusión que tiene que terminar en acuerdo, el monólogo con treinta segundos de preparación — y el último laboratorio del curso: el Speaking Part 4",
      "minutes": 26,
      "nEx": 18
     },
     {
      "id": "enb1m12l10",
      "phaseId": "enb1m12",
      "title": "The words that lie",
      "subtitle": "Los falsos amigos que no rompen el estilo: rompen el sentido",
      "minutes": 13,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb2m1",
    "level": "b2",
    "n": 1,
    "title": "Say It Straight",
    "goal": "Escribir párrafos que se lean de un tirón: una idea, frase-tema al principio, y los marcadores que unen sin que el texto suene a lista. El Reading Part 2 del examen es exactamente esto, al revés.",
    "color": "#4c1d95",
    "lessons": [
     {
      "id": "enb2m1l1",
      "phaseId": "enb2m1",
      "title": "One idea, then stop",
      "subtitle": "El párrafo inglés no se trenza: se planta y se sostiene",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m1l2",
      "phaseId": "enb2m1",
      "title": "Whereas, not but",
      "subtitle": "El contraste paralelo, y la coma que el español no pone",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m1l3",
      "phaseId": "enb2m1",
      "title": "Moreover, as a result",
      "subtitle": "Sumar y causar por escrito — y el foco The thing is",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m1l4",
      "phaseId": "enb2m1",
      "title": "Three paragraphs, one letter",
      "subtitle": "El género del módulo: un correo formal que se sostiene",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m1l5",
      "phaseId": "enb2m1",
      "title": "The Spanish paragraph",
      "subtitle": "Clínica: el comma splice, últimamente y el punto enterrado",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "enb2m1l6",
      "phaseId": "enb2m1",
      "title": "Two languages, two writers",
      "subtitle": "Dos lecturas del mismo asunto, y la postura de quien escribe",
      "minutes": 22,
      "nEx": 10
     },
     {
      "id": "enb2m1l7",
      "phaseId": "enb2m1",
      "title": "Likewise, granted",
      "subtitle": "Comparar y conceder: los marcadores que un argumento necesita para no ser una lista",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m1l8",
      "phaseId": "enb2m1",
      "title": "To begin with, to sum up",
      "subtitle": "Los marcadores que abren y cierran, y 150 palabras que se sostienen",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb2m1l9",
      "phaseId": "enb2m1",
      "title": "Amy reads it back",
      "subtitle": "La historia del módulo, el repaso y el monólogo de dos minutos",
      "minutes": 25,
      "nEx": 15
     },
     {
      "id": "enb2m1l10",
      "phaseId": "enb2m1",
      "title": "Exam lab: Reading Part 2",
      "subtitle": "Seis frases extraídas, siete opciones: el párrafo al revés",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb2m2",
    "level": "b2",
    "n": 2,
    "title": "The Right Word",
    "goal": "Dejar el rodeo: nominalizar, elegir the rise in en vez de prices went up, y escribir la carta formal de 100-150 palabras con los puntos de contenido contados.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "enb2m2l1",
      "phaseId": "enb2m2",
      "title": "The decision to close",
      "subtitle": "Una frase donde había tres: la nominalización",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m2l2",
      "phaseId": "enb2m2",
      "title": "All my documents",
      "subtitle": "El sintagma nominal: qué va delante del nombre, y la nómina",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m2l3",
      "phaseId": "enb2m2",
      "title": "Fewer meetings, less overtime",
      "subtitle": "fewer / less, rather than + -ing, enough to",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m2l4",
      "phaseId": "enb2m2",
      "title": "I am writing to apply",
      "subtitle": "El género del módulo: la carta formal de 100-150, que ES la Writing Part 1",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m2l5",
      "phaseId": "enb2m2",
      "title": "Diary, not agenda",
      "subtitle": "Clínica: el rodeo, y los falsos amigos que solo salen al escribir formal",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "enb2m2l6",
      "phaseId": "enb2m2",
      "title": "What the payslip actually says",
      "subtitle": "Dos lecturas: un informe sobre transparencia salarial, y una columna que pide silencio",
      "minutes": 22,
      "nEx": 10
     },
     {
      "id": "enb2m2l7",
      "phaseId": "enb2m2",
      "title": "Improve, don't make it better",
      "subtitle": "Léxico de precisión: una palabra donde había cinco",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m2l8",
      "phaseId": "enb2m2",
      "title": "Further to Monday",
      "subtitle": "Los conectores de la carta, y 150 palabras que condensan",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb2m2l9",
      "phaseId": "enb2m2",
      "title": "The first payslip",
      "subtitle": "La conversación incómoda con Ben, y el monólogo de dos minutos",
      "minutes": 25,
      "nEx": 14
     },
     {
      "id": "enb2m2l10",
      "phaseId": "enb2m2",
      "title": "Exam lab: Writing Part 1",
      "subtitle": "100-150 palabras, lector especificado, puntos de contenido, fuera de tema = cero",
      "minutes": 16,
      "nEx": 12
     }
    ]
   },
   {
    "id": "enb2m3",
    "level": "b2",
    "n": 3,
    "title": "Depends Who's Asking",
    "goal": "Decir la misma queja a Amy, al centro de llamadas y al tribunal, y acertar el registro en las dos direcciones. El Speaking Parts 1 y 2 se juegan exactamente ahí.",
    "color": "#be185d",
    "lessons": [
     {
      "id": "enb2m3l1",
      "phaseId": "enb2m3",
      "title": "It is clear that",
      "subtitle": "La misma queja, atenuada: It is + adjetivo + that",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m3l2",
      "phaseId": "enb2m3",
      "title": "I was wondering if",
      "subtitle": "Pedir sin exigir: wondering, mind, el pasado de cortesía",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m3l3",
      "phaseId": "enb2m3",
      "title": "That's not right, is it?",
      "subtitle": "Tags que suavizan, elipsis, y may… but para conceder",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m3l4",
      "phaseId": "enb2m3",
      "title": "Far from satisfied",
      "subtitle": "El género: la queja formal, con procedimiento y plazo",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m3l5",
      "phaseId": "enb2m3",
      "title": "Demand is a threat",
      "subtitle": "Clínica: registro de más, registro de menos, y solicit no es solicitar",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "enb2m3l6",
      "phaseId": "enb2m3",
      "title": "Hold the line",
      "subtitle": "Dos lecturas: un informe sobre trámites y mayores, y una columna que acusa al hold music",
      "minutes": 22,
      "nEx": 10
     },
     {
      "id": "enb2m3l7",
      "phaseId": "enb2m3",
      "title": "Forty minutes on hold",
      "subtitle": "Léxico de precisión: la queja con fechas, importes y plazos",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m3l8",
      "phaseId": "enb2m3",
      "title": "The same afternoon, two letters",
      "subtitle": "150 palabras a Amy, en el registro que el banco no verá",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb2m3l9",
      "phaseId": "enb2m3",
      "title": "Three registers, one afternoon",
      "subtitle": "La historia del módulo, y el monólogo de dos minutos",
      "minutes": 25,
      "nEx": 14
     },
     {
      "id": "enb2m3l10",
      "phaseId": "enb2m3",
      "title": "Exam lab: Speaking Parts 1 and 2",
      "subtitle": "Opiniones, y dos situaciones de rol: una en la que respondes, otra en la que empiezas",
      "minutes": 16,
      "nEx": 13
     }
    ]
   },
   {
    "id": "enb2m4",
    "level": "b2",
    "n": 4,
    "title": "Who Says So?",
    "goal": "Escribir y leer la frase sin dueño: It is thought that…, He is said to have…, y saber cuándo la pasiva informa y cuándo convence. El Reading Part 1 del B2 es un texto largo, no cinco anuncios.",
    "color": "#155e75",
    "lessons": [
     {
      "id": "enb2m4l1",
      "phaseId": "enb2m4",
      "title": "It is thought that",
      "subtitle": "La frase sin dueño: It is + participio + that",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m4l2",
      "phaseId": "enb2m4",
      "title": "He is said to have",
      "subtitle": "La persona como sujeto: is said to + infinitivo (y to have + participio)",
      "minutes": 14,
      "nEx": 12
     },
     {
      "id": "enb2m4l3",
      "phaseId": "enb2m4",
      "title": "She was offered a refund",
      "subtitle": "Tiempos compuestos, dos objetos, y el modal que evalúa",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m4l4",
      "phaseId": "enb2m4",
      "title": "According to the report",
      "subtitle": "El género: el artículo, y cómo se cita sin dueño",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m4l5",
      "phaseId": "enb2m4",
      "title": "Notorious is not famous",
      "subtitle": "Clínica: people say, expose, y el falso amigo de la fama mala",
      "minutes": 15,
      "nEx": 12
     },
     {
      "id": "enb2m4l6",
      "phaseId": "enb2m4",
      "title": "Two passives, one leak",
      "subtitle": "El periódico se cubre; el grupo acusa. Las dos usan la pasiva.",
      "minutes": 22,
      "nEx": 10
     },
     {
      "id": "enb2m4l7",
      "phaseId": "enb2m4",
      "title": "Got cancelled, was cancelled",
      "subtitle": "Léxico de precisión: tres alturas de la misma pasiva, y la filtración",
      "minutes": 13,
      "nEx": 12
     },
     {
      "id": "enb2m4l8",
      "phaseId": "enb2m4",
      "title": "This article argues",
      "subtitle": "150 palabras de artículo: informar, y marcar lo que no se sabe",
      "minutes": 18,
      "nEx": 13
     },
     {
      "id": "enb2m4l9",
      "phaseId": "enb2m4",
      "title": "Who says so?",
      "subtitle": "La historia del módulo, y el monólogo de dos minutos",
      "minutes": 25,
      "nEx": 14
     },
     {
      "id": "enb2m4l10",
      "phaseId": "enb2m4",
      "title": "Exam lab: Reading Part 1",
      "subtitle": "Un texto largo, seis preguntas: el Part 1 que ya no es un hueco",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m4l11",
      "phaseId": "enb2m4",
      "title": "Apply by Friday",
      "subtitle": "Un reglamento de formación: la pasiva sin dueño, aplicada a un plazo",
      "minutes": 20,
      "nEx": 12
     }
    ]
   },
   {
    "id": "enb2m5",
    "level": "b2",
    "n": 5,
    "title": "More Likely Than Not",
    "goal": "Graduar el compromiso: decir lo mismo en seis alturas de seguridad, escribir un informe con datos y reservas, y rellenar una ficha de Listening Part 3 con respuestas de una a cinco palabras.",
    "color": "#0e7490",
    "lessons": [
     {
      "id": "enb2m5l1",
      "phaseId": "enb2m5",
      "title": "More likely than not",
      "subtitle": "La escala: de «puede» a «casi seguro», sin decir «yo creo»",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m5l2",
      "phaseId": "enb2m5",
      "title": "Bound to happen",
      "subtitle": "Lo inevitable, y la deducción que mira hacia atrás",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m5l3",
      "phaseId": "enb2m5",
      "title": "Supposed to, meant to",
      "subtitle": "La misma forma, dos oficios: la norma y el rumor",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m5l4",
      "phaseId": "enb2m5",
      "title": "The report",
      "subtitle": "Datos, proceso, conclusión con reservas — el género del módulo",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "enb2m5l5",
      "phaseId": "enb2m5",
      "title": "The evidence, a phenomenon",
      "subtitle": "Clínica: el artículo que el español no pone, y el que pone de más",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m5l6",
      "phaseId": "enb2m5",
      "title": "A ghost or a pipe",
      "subtitle": "Dos lecturas del mismo asunto: la que informa y la que convence",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "enb2m5l7",
      "phaseId": "enb2m5",
      "title": "To a great extent",
      "subtitle": "Léxico de precisión: grado, extensión y la cifra que no es exacta",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m5l8",
      "phaseId": "enb2m5",
      "title": "With reservations",
      "subtitle": "Conectores del informe y el write de 150-200",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "enb2m5l9",
      "phaseId": "enb2m5",
      "title": "The house opposite",
      "subtitle": "Seis alturas sobre la misma casa, y tu monólogo de dos minutos",
      "minutes": 26,
      "nEx": 8
     },
     {
      "id": "enb2m5l10",
      "phaseId": "enb2m5",
      "title": "Exam lab: Listening Part 3",
      "subtitle": "Un monólogo, una ficha de siete huecos, y de una a cinco palabras",
      "minutes": 18,
      "nEx": 11
     },
     {
      "id": "enb2m5l11",
      "phaseId": "enb2m5",
      "title": "Dr Google and the list",
      "subtitle": "Salud pública: la escala aplicada a una cola, una vacuna y un buscador",
      "minutes": 20,
      "nEx": 12
     }
    ]
   },
   {
    "id": "enb2m6",
    "level": "b2",
    "n": 6,
    "title": "What I Should Have Said",
    "goal": "Hablar del pasado que no fue: tercer condicional, arrepentirse en voz alta, reparar una frase a mitad de camino y escribir una disculpa que no suene a excusa.",
    "color": "#be185d",
    "lessons": [
     {
      "id": "enb2m6l1",
      "phaseId": "enb2m6",
      "title": "If I had known",
      "subtitle": "El tercer condicional: dos mitades en pasado, y el would que no se cuela en el if",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m6l2",
      "phaseId": "enb2m6",
      "title": "I should have told you",
      "subtitle": "Should, ought, might: el arrepentimiento y la especulación, sin if",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m6l3",
      "phaseId": "enb2m6",
      "title": "I wish I had",
      "subtitle": "Ojalá + past perfect, conceder con must admit, y hacer que otro lo haga",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m6l4",
      "phaseId": "enb2m6",
      "title": "I sincerely apologise",
      "subtitle": "La carta de disculpa: tres alturas, y la que puntúa",
      "minutes": 18,
      "nEx": 8
     },
     {
      "id": "enb2m6l5",
      "phaseId": "enb2m6",
      "title": "That's called avoidance",
      "subtitle": "Clínica: no es un error, es un techo — y la reparación lo rompe",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m6l6",
      "phaseId": "enb2m6",
      "title": "Manners, and the cost of a sentence",
      "subtitle": "Dos lecturas: cómo se repara un correo, y por qué disculparse de más también es un hábito",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "enb2m6l7",
      "phaseId": "enb2m6",
      "title": "Let me rephrase that",
      "subtitle": "Léxico de precisión: la reparación, la culpa y el segundo borrador",
      "minutes": 14,
      "nEx": 11
     },
     {
      "id": "enb2m6l8",
      "phaseId": "enb2m6",
      "title": "On reflection",
      "subtitle": "Conectores del arrepentimiento y el relato de un error, 150-200",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "enb2m6l9",
      "phaseId": "enb2m6",
      "title": "The email to Priya",
      "subtitle": "Toda la tarde, el segundo borrador, y tu monólogo de dos minutos",
      "minutes": 26,
      "nEx": 7
     },
     {
      "id": "enb2m6l10",
      "phaseId": "enb2m6",
      "title": "Exam lab: Listening Part 1",
      "subtitle": "Siete conversaciones inacabadas, una formal, y el remate que sigue",
      "minutes": 16,
      "nEx": 9
     }
    ]
   },
   {
    "id": "enb2m7",
    "level": "b2",
    "n": 7,
    "title": "Taste and Waste",
    "goal": "Colocar bloques enteros: lo que va con lo que, la preposición que manda el verbo, el phrasal que ya conocías con el sentido que te faltaba, y escribir una reseña que se note.",
    "color": "#c2410c",
    "lessons": [
     {
      "id": "enb2m7l1",
      "phaseId": "enb2m7",
      "title": "Make a decision, heavy rain",
      "subtitle": "Lo que va con lo que: no se razona, se memoriza",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m7l2",
      "phaseId": "enb2m7",
      "title": "Keen on, fed up with",
      "subtitle": "La preposición que manda el verbo — y el adjetivo",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m7l3",
      "phaseId": "enb2m7",
      "title": "Gone off, put me off",
      "subtitle": "Los phrasal que ya conocías, con el sentido que te faltaba",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m7l4",
      "phaseId": "enb2m7",
      "title": "The food was outstanding",
      "subtitle": "La reseña: valoración en tres alturas, y el precio que no lo vale",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "enb2m7l5",
      "phaseId": "enb2m7",
      "title": "Do a decision?",
      "subtitle": "Clínica: la colocación imposible, en lista cerrada",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m7l6",
      "phaseId": "enb2m7",
      "title": "Year-round, and a word called organic",
      "subtitle": "Dos lecturas: los números del desperdicio, y la opinión de que ecológico es un eslogan",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "enb2m7l7",
      "phaseId": "enb2m7",
      "title": "It turned out fine",
      "subtitle": "Más acepciones, la ración, y el hábito que se deja",
      "minutes": 14,
      "nEx": 17
     },
     {
      "id": "enb2m7l8",
      "phaseId": "enb2m7",
      "title": "Worth a mention",
      "subtitle": "Conectores de reseña y el write de 150-200, con bloques que se cuentan",
      "minutes": 18,
      "nEx": 5
     },
     {
      "id": "enb2m7l9",
      "phaseId": "enb2m7",
      "title": "Sam's new menu",
      "subtitle": "La reseña que Valeria habría querido leer, y tu monólogo de dos minutos",
      "minutes": 26,
      "nEx": 6
     },
     {
      "id": "enb2m7l10",
      "phaseId": "enb2m7",
      "title": "Exam lab: Reading Part 4",
      "subtitle": "Un texto, siete preguntas abiertas, máximo cinco palabras",
      "minutes": 20,
      "nEx": 4
     }
    ]
   },
   {
    "id": "enb2m8",
    "level": "b2",
    "n": 8,
    "title": "Both Sides of It",
    "goal": "Sostener un argumento: tesis, dos razones, la concesión que te hace ganar, y una conclusión que no copia la tesis — y saber por qué LanguageCert no te lo pide nunca de frente.",
    "color": "#1d4ed8",
    "lessons": [
     {
      "id": "enb2m8l1",
      "phaseId": "enb2m8",
      "title": "Whereas",
      "subtitle": "El contraste que no es un but: una subordinada, dos lecturas de la misma calle",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m8l2",
      "phaseId": "enb2m8",
      "title": "Both the buses and the bikes",
      "subtitle": "Énfasis: both…and, neither…nor, y la oración que lleva dos subordinadas",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m8l3",
      "phaseId": "enb2m8",
      "title": "Admittedly… nevertheless",
      "subtitle": "La concesión: le das la razón para ganarla después",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m8l4",
      "phaseId": "enb2m8",
      "title": "The essay they don't ask",
      "subtitle": "For and against: el género rey, y por qué LanguageCert no te lo pone en el papel",
      "minutes": 20,
      "nEx": 6
     },
     {
      "id": "enb2m8l5",
      "phaseId": "enb2m8",
      "title": "Stress the words that carry the meaning",
      "subtitle": "Clínica: el ritmo silábico, y el «yo» que no te deja argumentar",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m8l6",
      "phaseId": "enb2m8",
      "title": "The lane, on paper and in the road",
      "subtitle": "Dos lecturas: la consulta del ayuntamiento, y la carta de quien conduce el 29",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "enb2m8l7",
      "phaseId": "enb2m8",
      "title": "Consequently",
      "subtitle": "Causa-efecto y adición de informe: las primas de therefore, una a una",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m8l8",
      "phaseId": "enb2m8",
      "title": "To sum up",
      "subtitle": "Comparar, abrir, definir, y el ensayo de 150-200 que no copia la tesis",
      "minutes": 18,
      "nEx": 5
     },
     {
      "id": "enb2m8l9",
      "phaseId": "enb2m8",
      "title": "Neither of us is entirely right",
      "subtitle": "La calle de Valeria, el 29 de Ben, y tu monólogo de dos minutos",
      "minutes": 26,
      "nEx": 6
     },
     {
      "id": "enb2m8l10",
      "phaseId": "enb2m8",
      "title": "Exam lab: Listening Part 4",
      "subtitle": "Una discusión, seis preguntas: gist, hecho u opinión, contraste, propósito, actitud, causa",
      "minutes": 18,
      "nEx": 8
     }
    ]
   },
   {
    "id": "enb2m9",
    "level": "b2",
    "n": 9,
    "title": "Getting There",
    "goal": "Meter la circunstancia dentro de la frase —con -ing, after having y rather than— en vez de ponerla al lado; escribir una propuesta sobre un trazado; y en el Reading Part 3 cazar la postura de quien escribe, no solo el dato.",
    "color": "#0e7490",
    "lessons": [
     {
      "id": "enb2m9l1",
      "phaseId": "enb2m9",
      "title": "Walking home, I realised",
      "subtitle": "La circunstancia va DENTRO de la frase, no al lado",
      "minutes": 14,
      "nEx": 10
     },
     {
      "id": "enb2m9l2",
      "phaseId": "enb2m9",
      "title": "After having checked the board",
      "subtitle": "Detrás de preposición, siempre -ing. No hay más regla",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m9l3",
      "phaseId": "enb2m9",
      "title": "Rather than wait, we hired a car",
      "subtitle": "La alternativa, el como si, y el there had been que el B1 no tocó",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m9l4",
      "phaseId": "enb2m9",
      "title": "A proposal, not an opinion",
      "subtitle": "Informar, evaluar, recomendar: las tres patas de una propuesta",
      "minutes": 18,
      "nEx": 7
     },
     {
      "id": "enb2m9l5",
      "phaseId": "enb2m9",
      "title": "I don't know where it is",
      "subtitle": "Dos trampas que sobreviven en B2: el sujeto colgante y la interrogativa indirecta",
      "minutes": 16,
      "nEx": 10
     },
     {
      "id": "enb2m9l6",
      "phaseId": "enb2m9",
      "title": "The same valley, two reports",
      "subtitle": "Uno informa y recomienda con reservas; el otro convence. El B2 es notar la diferencia",
      "minutes": 22,
      "nEx": 6
     },
     {
      "id": "enb2m9l7",
      "phaseId": "enb2m9",
      "title": "Satnav, green travel, the scenic route",
      "subtitle": "Las palabras con las que un B2 habla de moverse por el país, no de coger un vuelo",
      "minutes": 16,
      "nEx": 12
     },
     {
      "id": "enb2m9l8",
      "phaseId": "enb2m9",
      "title": "Given that the last train leaves at ten",
      "subtitle": "Los conectores que empaquetan una propuesta de 150-200 palabras",
      "minutes": 20,
      "nEx": 7
     },
     {
      "id": "enb2m9l9",
      "phaseId": "enb2m9",
      "title": "The site was closed — and it was the best day",
      "subtitle": "Un fin de semana fuera de Londres: tren cancelado, priorato cerrado, y el sendero",
      "minutes": 25,
      "nEx": 8
     },
     {
      "id": "enb2m9l10",
      "phaseId": "enb2m9",
      "title": "Exam lab: Reading Part 3",
      "subtitle": "Cuatro textos, la postura de quien escribe, y un texto puede ser la respuesta más de una vez",
      "minutes": 20,
      "nEx": 8
     }
    ]
   },
   {
    "id": "enb2m10",
    "level": "b2",
    "n": 10,
    "title": "The Story Underneath",
    "goal": "Contar con capas: el hecho en la principal, el fondo en el past perfect y en la relativa; escribir un relato o una descripción de 150-200 palabras con los puntos de contenido a la vista; y reconocer el arte del barrio sin mudarte a otro.",
    "color": "#7c3aed",
    "lessons": [
     {
      "id": "enb2m10l1",
      "phaseId": "enb2m10",
      "title": "The painting she had been looking for",
      "subtitle": "El past perfect ya no ordena: sostiene",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m10l2",
      "phaseId": "enb2m10",
      "title": "Said nothing. Just nodded.",
      "subtitle": "El past perfect continuous, y el sujeto que el inglés se come cuando se entiende",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m10l3",
      "phaseId": "enb2m10",
      "title": "«Forty years,» murmured Nora",
      "subtitle": "El verbo de decir se mueve: al medio, al final, invertido, con adverbio",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m10l4",
      "phaseId": "enb2m10",
      "title": "150 to 200 words, and something happens",
      "subtitle": "El relato y la descripción: la Writing Part 2 exacta, todavía sin reloj de examen",
      "minutes": 18,
      "nEx": 5
     },
     {
      "id": "enb2m10l5",
      "phaseId": "enb2m10",
      "title": "A piece of information, not an information",
      "subtitle": "La contabilidad: la trampa que sigue viva en Proficiency y aquí se caza en un museo",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m10l6",
      "phaseId": "enb2m10",
      "title": "The same show, two captions",
      "subtitle": "Una reseña que convence y una ficha que informa: el arte también tiene postura",
      "minutes": 22,
      "nEx": 5
     },
     {
      "id": "enb2m10l7",
      "phaseId": "enb2m10",
      "title": "Brushstroke, lighting, the catalogue",
      "subtitle": "El léxico con el que se mira, no con el que se dice «bonito»",
      "minutes": 16,
      "nEx": 11
     },
     {
      "id": "enb2m10l8",
      "phaseId": "enb2m10",
      "title": "In the years that followed",
      "subtitle": "Los conectores de un relato de 150-200, y una descripción con evaluación",
      "minutes": 20,
      "nEx": 5
     },
     {
      "id": "enb2m10l9",
      "phaseId": "enb2m10",
      "title": "Forty years, murmured Nora",
      "subtitle": "Lo que pasó es pequeño. Lo que había pasado antes, no",
      "minutes": 25,
      "nEx": 7
     },
     {
      "id": "enb2m10l10",
      "phaseId": "enb2m10",
      "title": "Exam lab: Writing Part 2",
      "subtitle": "150-200 palabras, carta o relato o descripción, puntos de contenido, y fuera de tema vale cero",
      "minutes": 20,
      "nEx": 8
     }
    ]
   },
   {
    "id": "enb2m11",
    "level": "b2",
    "n": 11,
    "title": "Fair Shares",
    "goal": "Negociar hasta un plan —rechazar con alternativa, ceder, cerrar— y usar las tres inversiones del B2 cuando hay algo de verdad que enfatizar; escribir a quien decide; y en el oral, no irse sin un acuerdo.",
    "color": "#be185d",
    "lessons": [
     {
      "id": "enb2m11l1",
      "phaseId": "enb2m11",
      "title": "Never had I been so sure",
      "subtitle": "La primera de las tres inversiones, y solo cuando hay algo que enfatizar",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m11l2",
      "phaseId": "enb2m11",
      "title": "No sooner… than. Not only… but also",
      "subtitle": "Las otras dos. Than no es when. El presente de not only no lleva do",
      "minutes": 14,
      "nEx": 9
     },
     {
      "id": "enb2m11l3",
      "phaseId": "enb2m11",
      "title": "Neither of the plans works",
      "subtitle": "Neither y none van con verbo afirmativo. Ought pinta el estado deseable",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m11l4",
      "phaseId": "enb2m11",
      "title": "A letter to the editor",
      "subtitle": "Opinión pública con una propuesta, no una queja suelta",
      "minutes": 18,
      "nEx": 4
     },
     {
      "id": "enb2m11l5",
      "phaseId": "enb2m11",
      "title": "I see it rather differently",
      "subtitle": "Rechazar con alternativa, ceder un palmo, cerrar el plan. Eso es el Part 3",
      "minutes": 16,
      "nEx": 9
     },
     {
      "id": "enb2m11l6",
      "phaseId": "enb2m11",
      "title": "The same money, two reports",
      "subtitle": "Un acta que informa y una carta que convence: el fondo de reserva no es neutro",
      "minutes": 22,
      "nEx": 5
     },
     {
      "id": "enb2m11l7",
      "phaseId": "enb2m11",
      "title": "Step-free, the sinking fund, a motion",
      "subtitle": "Las palabras con las que se vota, no con las que se discute en el rellano",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m11l8",
      "phaseId": "enb2m11",
      "title": "Shall we agree on the lift, then?",
      "subtitle": "Conectores de concesión y un escrito de 150-200 que cierra en un plan",
      "minutes": 20,
      "nEx": 3
     },
     {
      "id": "enb2m11l9",
      "phaseId": "enb2m11",
      "title": "Five neighbours, four ideas, one afternoon",
      "subtitle": "El dinero ha aparecido. Nadie tiene del todo razón. Hay que salir con un plan",
      "minutes": 25,
      "nEx": 15
     },
     {
      "id": "enb2m11l10",
      "phaseId": "enb2m11",
      "title": "Exam lab: Speaking Part 3 + Listening Part 2",
      "subtitle": "Un texto escrito, veinte segundos, y hay que salir con un plan. Luego, tres conversaciones y sus actitudes",
      "minutes": 20,
      "nEx": 8
     }
    ]
   },
   {
    "id": "enb2m12",
    "level": "b2",
    "n": 12,
    "title": "Rumbo al LanguageCert B2 Communicator",
    "goal": "Entrar al examen sabiendo la aritmética (150, 75, 101, sin mínimos), el reloj de verdad (25 minutos de audio, 2 h 10 compartidas, dos minutos de monólogo con treinta segundos de papel) y las trampas que un hispanohablante sigue pagando cuando ya se hace entender.",
    "color": "#1e3a8a",
    "lessons": [
     {
      "id": "enb2m12l1",
      "phaseId": "enb2m12",
      "title": "150, 75, 101 — and no skill minimums",
      "subtitle": "La aritmética que cambia la estrategia: se suma, no se aprueba por partes",
      "minutes": 14,
      "nEx": 8
     },
     {
      "id": "enb2m12l2",
      "phaseId": "enb2m12",
      "title": "Twenty-five minutes, same 26 questions",
      "subtitle": "Listening 1 y 2: conversaciones inacabadas, una formal, y la respuesta más lejos",
      "minutes": 16,
      "nEx": 8
     },
     {
      "id": "enb2m12l3",
      "phaseId": "enb2m12",
      "title": "One to five words, not one to three",
      "subtitle": "Listening 3 y 4: la ficha se alarga, y el Part 4 cobra hecho frente a opinión",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "enb2m12l4",
      "phaseId": "enb2m12",
      "title": "One long text — and no cloze",
      "subtitle": "Reading 1 y 2: el Part 1 cambió de naturaleza; el 2 sigue siendo reconstruir el párrafo",
      "minutes": 16,
      "nEx": 5
     },
     {
      "id": "enb2m12l5",
      "phaseId": "enb2m12",
      "title": "Stance, and five words maximum",
      "subtitle": "Reading 3 y 4: la postura, el texto que se repite, y las preguntas abiertas",
      "minutes": 16,
      "nEx": 6
     },
     {
      "id": "enb2m12l6",
      "phaseId": "enb2m12",
      "title": "100 to 150, and the clock is already running",
      "subtitle": "Writing Part 1: formal, puntos de contenido, y las 2 h 10 no son solo tuyas",
      "minutes": 18,
      "nEx": 4
     },
     {
      "id": "enb2m12l7",
      "phaseId": "enb2m12",
      "title": "150 to 200 — and it is not an essay",
      "subtitle": "Writing Part 2: carta, relato o descripción. El ensayo del m8 no cae aquí",
      "minutes": 18,
      "nEx": 3
     },
     {
      "id": "enb2m12l8",
      "phaseId": "enb2m12",
      "title": "Spell the surname. Then give an opinion",
      "subtitle": "Speaking 1 y 2: cinco bloques con hipótesis, y dos situaciones más largas",
      "minutes": 16,
      "nEx": 7
     },
     {
      "id": "enb2m12l9",
      "phaseId": "enb2m12",
      "title": "Two minutes, same thirty seconds",
      "subtitle": "Speaking 3 y 4: el plan, y el monólogo que creció medio minuto sin más papel",
      "minutes": 25,
      "nEx": 7
     },
     {
      "id": "enb2m12l10",
      "phaseId": "enb2m12",
      "title": "The traps that are still yours",
      "subtitle": "La batería: evitación, circunloquio, comma splice, people say, an information, where is it — y el nervio",
      "minutes": 18,
      "nEx": 21
     }
    ]
   }
  ],
  "vocabCount": 2524
 }
};

/** de cada misión, lo que enseña la página del módulo */
export const missionIndex: Record<string, Record<string, MissionMeta>> = {
 "de": {
  "fi": {
   "phaseId": "fi",
   "title": "El alemán ya vive contigo",
   "outcome": "Una lista de 10 palabras alemanas encontradas en tu propia casa o supermercado — leídas en voz alta, con Mayúscula los sustantivos y con artículo las del curso."
  },
  "f0": {
   "phaseId": "f0",
   "title": "Tu nombre, en voz alta",
   "outcome": "Un audio de 30 segundos con tu presentación completa en alemán, grabado y escuchado por ti — tu primera voz en alemán."
  },
  "f1": {
   "phaseId": "f1",
   "title": "Tu gente, en una foto",
   "outcome": "Tu familia, presentada en voz alta con una foto real delante — cada persona con su nombre y una frase."
  },
  "f2": {
   "phaseId": "f2",
   "title": "Tu mañana, narrada en directo",
   "outcome": "Tu mañana de verdad, narrada en alemán mientras pasaba — y una alarma con etiqueta en alemán esperando al día siguiente."
  },
  "f3": {
   "phaseId": "f3",
   "title": "Tu café, en alemán",
   "outcome": "Tu bebida pedida entera en alemán de saludo a despedida — y tu próxima lista de la compra real, escrita en alemán."
  },
  "f4": {
   "phaseId": "f4",
   "title": "El tour de tu casa",
   "outcome": "Un audio de 60 segundos con el tour completo de tu casa, grabado por ti — habitación por habitación."
  },
  "f5": {
   "phaseId": "f5",
   "title": "El plan improvisado",
   "outcome": "Un plan pequeño propuesto a una persona real, en alemán — y con suerte, un sí."
  },
  "f7": {
   "phaseId": "f7",
   "title": "La caza de la prenda",
   "outcome": "Tu prenda elegida en una tienda online alemana — con talla, color y precio dichos en voz alta — esperando en el carrito."
  },
  "f8": {
   "phaseId": "f8",
   "title": "La cita con la doctora",
   "outcome": "Una cita médica completa superada de principio a fin — pedida, contada y entendida en alemán — y tus síntomas listos para el día que los necesites de verdad."
  },
  "f9": {
   "phaseId": "f9",
   "title": "Tu viaje, planeado de verdad",
   "outcome": "El plan real de un viaje por Alemania: una conexión de tren auténtica encontrada en bahn.de — con horas, andén y transbordo entendidos — guardada en tu teléfono."
  },
  "f10": {
   "phaseId": "f10",
   "title": "Tus datos, en un formulario alemán",
   "outcome": "Un formulario alemán de verdad, rellenado con tus datos — y tu apellido deletreado a la alemana, listo para cualquier ventanilla."
  },
  "f11": {
   "phaseId": "f11",
   "title": "Tu ayer, contado hoy",
   "outcome": "Tu día de ayer — el de verdad — contado entero en pasado: grabado en un audio de 60 segundos o narrado a alguien."
  },
  "f6": {
   "phaseId": "f6",
   "title": "El ensayo general",
   "outcome": "El simulacro completo del oral del Start Deutsch 1, superado de principio a fin — y una fecha posible para el examen real, apuntada."
  },
  "a2m1": {
   "phaseId": "a2m1",
   "title": "Tu finde, contado de verdad",
   "outcome": "Tu fin de semana real — el que acaba de pasar — contado entero en alemán a una persona (o grabado), con la pregunta devuelta."
  },
  "a2m2": {
   "phaseId": "a2m2",
   "title": "Aquel viaje tuyo",
   "outcome": "Un viaje real de tu vida, contado en alemán con una foto de aquel viaje delante — de la salida a la vuelta — grabado o narrado a alguien."
  },
  "a2m3": {
   "phaseId": "a2m3",
   "title": "Tu historia, en dos minutos",
   "outcome": "Tu mini-biografía — infancia, escuela y lo que querías ser — grabada en un audio de 2 minutos que podrás reescuchar dentro de unos años."
  },
  "a2m4": {
   "phaseId": "a2m4",
   "title": "Los regalos, decididos",
   "outcome": "Tres regalos reales decididos — uno por cada persona elegida de tu vida — con su porqué; la próxima ocasión ya no te pilla sin plan."
  },
  "a2m5": {
   "phaseId": "a2m5",
   "title": "Todo a su sitio",
   "outcome": "Una zona real de tu casa (escritorio, cajón, estantería) ordenada de verdad — cada cosa colocada mientras dices a dónde va — con foto del antes y el después."
  },
  "a2m6": {
   "phaseId": "a2m6",
   "title": "Tus porqués, sobre la mesa",
   "outcome": "Tu mini-manifiesto: tres opiniones tuyas de verdad, cada una con su porqué, escritas o grabadas — y una defendida en directo."
  },
  "a2m7": {
   "phaseId": "a2m7",
   "title": "La compra comparada",
   "outcome": "Una decisión de compra real tomada con criterio: dos candidatos comparados en voz alta y un ganador elegido — antes de gastar un peso."
  },
  "a2m8": {
   "phaseId": "a2m8",
   "title": "La consulta completa",
   "outcome": "La cita médica de nivel A2 superada entera — síntomas, preguntas y consejo entendido — y uno de los consejos cumplido HOY en la vida real."
  },
  "a2m9": {
   "phaseId": "a2m9",
   "title": "La fiesta, organizada",
   "outcome": "Una celebración real en marcha: la invitación escrita y enviada, el reparto de tareas hecho y la felicitación lista para el día señalado."
  },
  "a2m10": {
   "phaseId": "a2m10",
   "title": "Tus planes, dichos en alto",
   "outcome": "Tu pitch profesional A2 — a qué te dedicas, qué aprendiste y a dónde vas — grabado en 90 segundos, con tu sueño incluido."
  },
  "a2exam": {
   "phaseId": "a2exam",
   "title": "El ensayo general, a dúo",
   "outcome": "El simulacro social completo del Goethe A2 superado — incluido el Teil 3: un plan negociado y cerrado con tu compañera de examen — y una fecha posible apuntada."
  },
  "b1m1": {
   "phaseId": "b1m1",
   "title": "El piso, peleado de verdad",
   "outcome": "Un anuncio REAL de piso o habitación en un país germanófono elegido y tu candidatura escrita y enviada (o guardada lista para enviar), con tres preguntas tuyas dentro."
  },
  "b1m2": {
   "phaseId": "b1m2",
   "title": "Tu horario, negociado",
   "outcome": "Tu propuesta de horario (o de teletrabajo, o de turnos) escrita en cinco líneas, defendida en voz alta contra objeciones — y un acuerdo intermedio concreto por escrito: qué, cuánto tiempo y cómo se comprueba."
  },
  "b1m3": {
   "phaseId": "b1m3",
   "title": "«Sentarse es el nuevo fumar»",
   "outcome": "Una consulta médica de nivel B1 sostenida entera con contrapreguntas incluidas — y un cambio real puesto en marcha HOY: tres días seguidos de la medida que acordaste, apuntados."
  },
  "b1m4": {
   "phaseId": "b1m4",
   "title": "Tu postura, defendida",
   "outcome": "Una discusión real de cinco minutos sobre móviles, redes o videojuegos aguantada entera en alemán — con tus tres argumentos escritos antes y una medida real aplicada a TU móvil al terminar."
  },
  "b1m5": {
   "phaseId": "b1m5",
   "title": "El comentario que publicas",
   "outcome": "Tu comentario de 80-100 palabras sobre el límite de velocidad, el reciclaje o el transporte — escrito, revisado y publicado o enviado a alguien de verdad — más un cambio doméstico en marcha esta semana."
  },
  "b1m6": {
   "phaseId": "b1m6",
   "title": "El consejo que sí sirve",
   "outcome": "Un consejo real dado a una persona real sobre estudiar algo (un curso, la carrera, volver a clase) — y tu propio plan de alemán de cuatro semanas escrito, con días y minutos."
  },
  "b1m7": {
   "phaseId": "b1m7",
   "title": "Tu fiesta, explicada a un alemán",
   "outcome": "La fiesta más tuya explicada entera en dos minutos grabados — qué se hace, por qué y cómo se vive — y una tradición del DACH averiguada de verdad y comparada con la tuya."
  },
  "b1m8": {
   "phaseId": "b1m8",
   "title": "La reclamación que llega",
   "outcome": "Una reclamación real hecha de verdad — un pedido que no llegó, una factura mal cobrada, una suscripción que no cancelaron — con su email formal alemán escrito al lado y la llamada ensayada."
  },
  "b1m9": {
   "phaseId": "b1m9",
   "title": "Tres días por el DACH, negociados",
   "outcome": "Un itinerario real de tres días por Alemania, Austria o Suiza — con trenes, precios y alojamiento de verdad buscados por ti — negociado con alguien y cerrado por escrito."
  },
  "b1m10": {
   "phaseId": "b1m10",
   "title": "La conversación difícil",
   "outcome": "Una conversación pendiente de verdad — con quien convives, con un amigo, con un compañero — preparada en alemán y mantenida (o escrita y enviada), que acaba en un acuerdo concreto de una frase."
  },
  "b1m11": {
   "phaseId": "b1m11",
   "title": "Tu plan a cinco años, en voz alta",
   "outcome": "Tu plan a cinco años dicho en dos minutos grabados y escrito en diez líneas — con el primer paso ejecutado esta semana: el curso buscado, el precio del visado mirado, el email enviado."
  },
  "b1m12": {
   "phaseId": "b1m12",
   "title": "El Sprechen del Goethe, entero",
   "outcome": "El Sprechen completo del Goethe B1 hecho de una sentada con reloj — Teil 1 negociado, Teil 2 presentado con sus cinco puntos, Teil 3 con preguntas y feedback — y una fecha real de examen apuntada con precio y sede."
  },
  "b2m1": {
   "phaseId": "b2m1",
   "title": "La noticia, sin firmarla",
   "outcome": "Una ficha de tres fuentes sobre UNA noticia real —qué afirma cada una, en Konjunktiv I— y un párrafo de diez líneas que las resume sin que se te cuele tu opinión."
  },
  "b2m2": {
   "phaseId": "b2m2",
   "title": "La queja sin culpable",
   "outcome": "La descripción de UN proceso real de tu trabajo o tus estudios —quién no importa— y un correo formal de ~100 palabras que reclama el arreglo sin nombrar a un culpable."
  },
  "b2m3": {
   "phaseId": "b2m3",
   "title": "De la bronca al informe",
   "outcome": "Una queja que de verdad has dicho en voz alta, convertida en un párrafo formal de registro de informe — y la misma idea, al lado, en estilo verbal, para demostrar que eliges y no te has quedado atrapado en el Papierdeutsch."
  },
  "b2m4": {
   "phaseId": "b2m4",
   "title": "La Hausarbeit, desempaquetada",
   "outcome": "Un párrafo de una Prüfungsordnung o de un artículo académico, desempaquetado en relativas y vuelto a comprimir — más cinco líneas tuyas al estilo Hausarbeit, con al menos un atributo extendido y un Gerundivum."
  },
  "b2m5": {
   "phaseId": "b2m5",
   "title": "El foro, argumentado de verdad",
   "outcome": "Tu Forumsbeitrag de ~150 palabras sobre un tema público real —publicado o enviado a alguien que te rebata— con tesis, dos argumentos, una concesión y un cierre que no repite la tesis."
  },
  "b2m6": {
   "phaseId": "b2m6",
   "title": "Lo que habría hecho",
   "outcome": "Un consejo retrospectivo dado de verdad a una persona real —o a ti mismo— sobre una decisión de salud, de trabajo o de cuidado, con el doble infinitivo en su sitio y una atenuación que no suene a sermón."
  },
  "b2m7": {
   "phaseId": "b2m7",
   "title": "El contrato, leído en voz baja",
   "outcome": "Una suscripción, un contrato o una factura que de verdad te están cobrando de más, leída entera —el Kleingedruckte incluido— y cancelada o reclamada con el tono justo: ni seca ni grosera."
  },
  "b2m8": {
   "phaseId": "b2m8",
   "title": "El Widerspruch que llega",
   "outcome": "Un Widerspruch o un escrito formal de ~100 palabras sobre un trámite real —empadronamiento, multa, alquiler, una prestación—, más la misma norma explicada en cinco frases que entendería Herr Vogel."
  },
  "b2m9": {
   "phaseId": "b2m9",
   "title": "Los números, con su preposición",
   "outcome": "Un gráfico real —emisiones, consumo, un recibo de la luz, los trayectos de tu semana— presentado en diez líneas y en voz alta, con cada nombre y cada adjetivo llevando SU preposición."
  },
  "b2m10": {
   "phaseId": "b2m10",
   "title": "La misma idea, tres trajes",
   "outcome": "LA MISMA idea escrita tres veces —calle, estándar, Amtsdeutsch— más cinco formas austriacas o suizas cazadas en un texto real, glosadas, y una regla escrita en grande: en el examen se produce el estándar alemán."
  },
  "b2m11": {
   "phaseId": "b2m11",
   "title": "Dos fuentes, una síntesis",
   "outcome": "Una síntesis de ~150 palabras de DOS textos reales que no están de acuerdo —enviada a alguien que no los ha leído— y un minuto de transmisión oral, sin notas leídas."
  },
  "b2m12": {
   "phaseId": "b2m12",
   "title": "El Vortrag de cuatro minutos",
   "outcome": "El Sprechen completo del Goethe B2 hecho de una sentada con reloj —15 minutos de preparación, Vortrag de 4 minutos, ronda de preguntas, discusión de 5— y una fecha real de examen apuntada con precio y sede."
  }
 },
 "en": {
  "ena1m1": {
   "phaseId": "ena1m1",
   "title": "Tu nombre, en voz alta",
   "outcome": "Alguien nuevo sabe cómo te llamas — o tienes un audio de 30 segundos con tu presentación, escuchado por ti."
  },
  "ena1m2": {
   "phaseId": "ena1m2",
   "title": "Tu gente, en una foto",
   "outcome": "Tu familia, presentada en voz alta con una foto real delante — cada persona con su nombre y una frase."
  },
  "ena1m3": {
   "phaseId": "ena1m3",
   "title": "Tus datos, en un formulario real",
   "outcome": "Un formulario real en inglés, enviado — una cuenta, una newsletter o un registro creado con tus datos de verdad."
  },
  "ena1m4": {
   "phaseId": "ena1m4",
   "title": "Tu mañana, narrada en directo",
   "outcome": "Tu mañana de verdad, narrada en inglés mientras pasaba — y una alarma con etiqueta en inglés esperando al día siguiente."
  },
  "ena1m5": {
   "phaseId": "ena1m5",
   "title": "Tu café, en inglés",
   "outcome": "Tienes tu bebida en la mano — pedida entera en inglés, sin señalar el menú."
  },
  "ena1m6": {
   "phaseId": "ena1m6",
   "title": "La caza del precio",
   "outcome": "El precio averiguado y tu artículo elegido — en el carrito de una web en inglés o pagado en el mundo real."
  },
  "ena1m7": {
   "phaseId": "ena1m7",
   "title": "El tour de tu casa",
   "outcome": "Un audio de 60 segundos con el tour completo de tu casa, grabado por ti — habitación por habitación."
  },
  "ena1m8": {
   "phaseId": "ena1m8",
   "title": "El plan improvisado",
   "outcome": "Un plan pequeño propuesto a una persona real, en inglés — y con suerte, un sí."
  },
  "ena1m9": {
   "phaseId": "ena1m9",
   "title": "Tus 30 segundos profesionales",
   "outcome": "Tu presentación profesional de 30 segundos, grabada y escuchada — lista para el próximo What do you do?"
  },
  "ena1m10": {
   "phaseId": "ena1m10",
   "title": "Llegar en inglés",
   "outcome": "Llegaste — un trayecto real completado siguiendo instrucciones en inglés."
  },
  "ena1m11": {
   "phaseId": "ena1m11",
   "title": "El plan por escrito",
   "outcome": "Un plan cerrado por mensaje — con día, hora y lugar — esperándote en el calendario."
  },
  "ena1m12": {
   "phaseId": "ena1m12",
   "title": "El ensayo general",
   "outcome": "El simulacro completo del examen oral, superado de principio a fin — y una fecha posible para el de verdad, apuntada."
  },
  "ena2m1": {
   "phaseId": "ena2m1",
   "title": "Tu finde, en un audio que mandas",
   "outcome": "Un audio de 60 segundos con TU fin de semana real, mandado de verdad a alguien — y su respuesta esperándote en el móvil."
  },
  "ena2m2": {
   "phaseId": "ena2m2",
   "title": "La historia de aquel día",
   "outcome": "Tu peor día contado como historia: 60-80 palabras escritas y mandadas a alguien que te contesta, más la versión hablada de un minuto."
  },
  "ena2m3": {
   "phaseId": "ena2m3",
   "title": "El retrato hablado",
   "outcome": "Alguien señala a la persona correcta en una foto de grupo solo con tu descripción en inglés. Sin decir el nombre y sin señalar tú."
  },
  "ena2m4": {
   "phaseId": "ena2m4",
   "title": "Tres candidatos, una decisión",
   "outcome": "Una compra pendiente decidida de verdad: tres candidatos reales con sus precios y sus medidas en una tabla, un ganador y el pedido hecho o en el carrito."
  },
  "ena2m5": {
   "phaseId": "ena2m5",
   "title": "La receta, en inglés",
   "outcome": "Un plato hecho y en la mesa, cocinado siguiendo una receta en inglés — con su lista de la compra escrita en inglés antes de salir de casa."
  },
  "ena2m6": {
   "phaseId": "ena2m6",
   "title": "La escapada, cerrada",
   "outcome": "Una escapada real con fecha en el calendario: transporte con horarios y precios de verdad, alojamiento elegido, lista de equipaje en inglés y alguien que ya ha dicho que sí."
  },
  "ena2m7": {
   "phaseId": "ena2m7",
   "title": "Las normas, descifradas",
   "outcome": "Tres avisos reales en inglés fotografiados y entendidos, y las normas de un servicio que usas de verdad —el equipaje de tu vuelo, las devoluciones de una tienda, el gimnasio— resumidas en tres reglas tuyas."
  },
  "ena2m8": {
   "phaseId": "ena2m8",
   "title": "El botiquín, revisado",
   "outcome": "Tu botiquín revisado de verdad —caducidades comprobadas y lo caducado fuera— con tres etiquetas en inglés puestas, y un consejo cumplido HOY."
  },
  "ena2m9": {
   "phaseId": "ena2m9",
   "title": "El cuadrante, en la nevera",
   "outcome": "Un cuadrante de tareas escrito en inglés y pegado donde lo vea quien vive contigo — acordado en una conversación que abriste tú."
  },
  "ena2m10": {
   "phaseId": "ena2m10",
   "title": "Have you ever…? — tres respuestas",
   "outcome": "Tres cosas que no sabías de tres personas de tu vida, preguntadas de verdad y escritas en inglés — más las dos tuyas que a nadie se le habría ocurrido preguntar."
  },
  "ena2m11": {
   "phaseId": "ena2m11",
   "title": "El plan que aguanta la lluvia",
   "outcome": "Un plan real cerrado con alguien, con su plan B por escrito en 30-50 palabras y mandado — y el parte del tiempo de ese día consultado en inglés."
  },
  "ena2m12": {
   "phaseId": "ena2m12",
   "title": "El ensayo general del A2",
   "outcome": "Los nueve minutos del oral A2 hechos de una sentada con reloj, sin pausas y sin español — y la fecha, la sede y el precio del examen real apuntados, con la opción online mirada."
  },
  "enb1m1": {
   "phaseId": "enb1m1",
   "title": "La cuenta real del alquiler",
   "outcome": "Una cifra que antes no tenías: lo que cuesta de verdad al mes un piso concreto de un anuncio real —alquiler, gastos y council tax sumados—, y tu mensaje de 100 palabras al anunciante, con tres preguntas dentro, mandado o guardado listo para mandar."
  },
  "enb1m2": {
   "phaseId": "enb1m2",
   "title": "Tu CV inglés, y la carta que lo acompaña",
   "outcome": "Dos archivos que antes no existían: un CV de una página en inglés británico y una covering letter de 100 palabras, encajados en una oferta real que has elegido — y leídos por alguien que te dice si te llamaría."
  },
  "enb1m3": {
   "phaseId": "enb1m3",
   "title": "El recado que llega entero",
   "outcome": "Un plan concreto —día, hora y sitio— apuntado en el calendario de otra persona porque tú le pasaste el recado en inglés. Y apuntado bien: si el día sale mal, la misión no cuenta."
  },
  "enb1m4": {
   "phaseId": "enb1m4",
   "title": "El bulo, con su ficha",
   "outcome": "Un bulo real cazado y fichado: qué decía exactamente, quién lo publicó primero, en qué fecha y qué dice la fuente que citaba — con tu respuesta de cuatro líneas en inglés mandada a quien te lo reenvió."
  },
  "enb1m5": {
   "phaseId": "enb1m5",
   "title": "La reclamación que sí se manda",
   "outcome": "Una reclamación real enviada —con su número de pedido, su fecha y una petición concreta—, en 100 palabras y con su Yours faithfully. Y, quince días después, la respuesta apuntada al lado: la que te dieron, o el silencio que te dieron."
  },
  "enb1m6": {
   "phaseId": "enb1m6",
   "title": "Tres minutos de consulta, preparados",
   "outcome": "Una ficha de consulta guardada en el móvil —el síntoma, desde cuándo, qué probaste y tres preguntas—, probada contra un reloj de tres minutos. Y al lado, lo que la web del NHS dice que se hace con ese síntoma, leído en inglés."
  },
  "enb1m7": {
   "phaseId": "enb1m7",
   "title": "Cinco minutos que no entiendes",
   "outcome": "Cinco minutos de un inglés que no es el de tus grabaciones, transcritos a mano hasta la última palabra, con la lista de lo que nadie te enseñó resuelta al lado — y tu variedad elegida por escrito, con sus siete pares."
  },
  "enb1m8": {
   "phaseId": "enb1m8",
   "title": "La auditoría de tu basura",
   "outcome": "Siete días de tu basura contados de verdad: cuántos envases, cuántas botellas, cuánto acabó en el cubo equivocado. Una cifra al final — y UN cambio concreto que empieza el lunes."
  },
  "enb1m9": {
   "phaseId": "enb1m9",
   "title": "El viaje con su plan B",
   "outcome": "Un viaje real con su plan B por escrito y sus derechos comprobados: qué pasa si se cancela, cuánto tienen que devolverte, a quién se reclama y con qué palabras — leído en la web de la compañía, en inglés, y guardado en una nota de cinco líneas."
  },
  "enb1m10": {
   "phaseId": "enb1m10",
   "title": "La persona con la que perdiste el contacto",
   "outcome": "Un mensaje de 120 palabras mandado de verdad a alguien con quien perdiste el contacto — y su respuesta en tu bandeja de entrada. Si contesta, al final de la misión hay dos cosas: el texto y la persona."
  },
  "enb1m11": {
   "phaseId": "enb1m11",
   "title": "La postura que se te movió",
   "outcome": "Tu postura sobre algo que te importa, escrita dos veces: antes del debate y después, con el punto que concediste subrayado. Y detrás, quince minutos de debate de verdad con otra persona."
  },
  "enb1m12": {
   "phaseId": "enb1m12",
   "title": "El ensayo general del B1",
   "outcome": "Los doce minutos del Spoken hechos de una sentada con reloj, las cuatro partes seguidas y sin una palabra de español — y la fecha, la sede y el precio del LanguageCert B1 Achiever apuntados, con la versión en línea mirada."
  },
  "enb2m1": {
   "phaseId": "enb2m1",
   "title": "El párrafo que se entiende",
   "outcome": "Un texto tuyo de tres párrafos —el mismo contenido que habías escrito «a la española»— reescrito de modo que cada párrafo lleva UNA idea, más seis frases extraídas de un artículo real vueltas a colocar."
  },
  "enb2m2": {
   "phaseId": "enb2m2",
   "title": "La carta de 150, sin rodeos",
   "outcome": "Una carta formal de 100-150 palabras sobre una oferta, una reclamación o una solicitud REAL, con cada punto de contenido marcado al margen — y al lado, la lista de rodeos que mataste: make the situation better → improve."
  },
  "enb2m3": {
   "phaseId": "enb2m3",
   "title": "La misma queja, tres voces",
   "outcome": "UN problema real —un cargo, un cobro, un retraso, un servicio— escrito tres veces (bronca a un amigo, queja formal, versión de examen) y una llamada ensayada en la que no te calientas."
  },
  "enb2m4": {
   "phaseId": "enb2m4",
   "title": "Quién lo dice, y cómo se esconde",
   "outcome": "Un bulo o una noticia local fichada: la afirmación en pasiva impersonal, la fuente, la fecha — y cuatro líneas mandadas a quien te lo reenvió, sin un people say."
  },
  "enb2m5": {
   "phaseId": "enb2m5",
   "title": "Cuánto te mojas",
   "outcome": "Un miniinforme de 150 palabras sobre algo que NADIE puede probar del todo —un síntoma de casa, un rumor del edificio, un dato científico de prensa— con cada afirmación etiquetada por cuánto te mojas."
  },
  "enb2m6": {
   "phaseId": "enb2m6",
   "title": "Lo que debería haber dicho",
   "outcome": "Una disculpa real mandada —un correo que sonó peor de lo que querías, una cosa que no dijiste— con su should have y su Allow me to rephrase, y la versión hablada donde te corrige a ti mismo en marcha."
  },
  "enb2m7": {
   "phaseId": "enb2m7",
   "title": "La reseña que suena a reseña",
   "outcome": "Una reseña real de 150-180 palabras —un restaurante, un café, un producto, un curso— publicada o enviada, donde postpone perdió contra put off y very good perdió contra outstanding / on the pricey side."
  },
  "enb2m8": {
   "phaseId": "enb2m8",
   "title": "A favor, en contra, y el punto que concedes",
   "outcome": "Un ensayo de 150-200 palabras sobre un asunto público que te importa —publicado o enviado a alguien que piensa lo contrario— con la concesión en el tercio central, no en una coletilla."
  },
  "enb2m9": {
   "phaseId": "enb2m9",
   "title": "La propuesta, empaquetada",
   "outcome": "Una proposal de 150-180 palabras sobre un trayecto, un viaje o un espacio público reales —con al menos tres cláusulas de -ing y cero After I finished, I left donde cabía Having finished, I left."
  },
  "enb2m10": {
   "phaseId": "enb2m10",
   "title": "La historia con su sótano",
   "outcome": "Un relato o una descripción de 150-200 palabras sobre una visita, una persona o un sitio que te haya movido —con el past perfect solo donde hace falta y un Never before had I… si de verdad encaja."
  },
  "enb2m11": {
   "phaseId": "enb2m11",
   "title": "La reunión que acaba en un plan",
   "outcome": "Un plan escrito de seis líneas —qué, quién, cuándo, con qué dinero, cómo se revisa— salido de una negociación de verdad, no de un «pues sí»."
  },
  "enb2m12": {
   "phaseId": "enb2m12",
   "title": "Los trece minutos del Communicator",
   "outcome": "Los trece minutos del Spoken hechos de una sentada con reloj —y la fecha, el precio y la modalidad online del LanguageCert B2 Communicator apuntados, con el High Pass (101/150 y 38/50) escrito al lado."
  }
 }
};

/** simulacros sin sus Teile: lo que listan los hubs y cuentan las medallas */
export const examIndex: Record<string, ExamMeta[]> = {
 "de": [
  {
   "id": "sim-a",
   "level": "a1",
   "title": "Modellsatz A",
   "description": "Simulacro completo del examen oficial A1: vida cotidiana en la ciudad — compras, citas y transporte.",
   "sections": [
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 25
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 20
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "sim-b",
   "level": "a1",
   "title": "Modellsatz B",
   "description": "Simulacro completo del examen Start Deutsch 1 con el formato oficial: Hören, Lesen, Schreiben y Sprechen. Tema del set: trabajo, salud y familia.",
   "sections": [
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 25
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 20
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "sim-c",
   "level": "a1",
   "title": "Modellsatz C",
   "description": "Simulacro completo estilo Start Deutsch 1 sobre viajes y tiempo libre: la estación, el hotel, el restaurante, el cine y el fin de semana en Perfekt.",
   "sections": [
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 25
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 20
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "b1-sim-a",
   "level": "b1",
   "title": "Modellsatz B1",
   "description": "Simulacro completo y fiel del Goethe-Zertifikat B1 (= ÖSD B1): Lesen 65′, Hören 40′ con escuchas 2-1-1-2, Schreiben 60′ y Sprechen. Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas de opinión social: voluntariado, segunda mano, animales en la ciudad y el trabajo de los estudiantes.",
   "scoring": {
    "passPct": 60,
    "modular": true,
    "pointsPerItem": {
     "lesen": 3.3333333333333335,
     "hoeren": 3.3333333333333335
    },
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 65
    },
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 40
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 60
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "b1-sim-b",
   "level": "b1",
   "title": "Modellsatz B1 B",
   "description": "Simulacro completo y fiel del Goethe-Zertifikat B1 (= ÖSD B1): Lesen 65′, Hören 40′ con escuchas 2-1-1-2, Schreiben 60′ y Sprechen. Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Segundo simulacro, mismos baremos. Temas: ayuda vecinal, huertos urbanos, prácticas no pagadas y la biblioteca de barrio. Textos distintos del Modellsatz A: no se recicla ni un párrafo.",
   "scoring": {
    "passPct": 60,
    "modular": true,
    "pointsPerItem": {
     "lesen": 3.3333333333333335,
     "hoeren": 3.3333333333333335
    },
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 65
    },
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 40
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 60
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "a2-sim-a",
   "level": "a2",
   "title": "Modellsatz A2 A",
   "description": "Simulacro completo del Goethe-Zertifikat A2: la vida de barrio — biblioteca, senderismo, curso de cocina y fiesta vecinal. Hören ~30′, Lesen 30′, Schreiben 30′ y Sprechen en pareja. Se aprueba con el 60 % del total.",
   "scoring": {
    "passPct": 60,
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 30
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 30
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "a2-sim-b",
   "level": "a2",
   "title": "Modellsatz A2 B",
   "description": "Segundo simulacro del Goethe-Zertifikat A2: trabajo, salud y trámites — una semana de turnos, una cita en el Bürgeramt y una visita al médico. Misma estructura que el Modellsatz A, otros textos. Se aprueba con el 60 % del total.",
   "scoring": {
    "passPct": 60,
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 30
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 30
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "b2-sim-a",
   "level": "b2",
   "title": "Modellsatz B2",
   "description": "Simulacro fiel del Goethe-Zertifikat B2 (formato 2019): Lesen 65′, Hören ~40′ con escuchas 1-2-1-2, Schreiben 75′ y Sprechen (Vortrag + Diskussion). Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas: cuidado de familiares, derecho a reparar, semana de cuatro días, videovigilancia.",
   "scoring": {
    "passPct": 60,
    "modular": true,
    "pointsPerItem": {
     "lesen": 3.3333333333333335,
     "hoeren": 3.3333333333333335
    },
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 65
    },
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 40
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 75
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  },
  {
   "id": "b2-sim-b",
   "level": "b2",
   "title": "Modellsatz B2 B",
   "description": "Segundo simulacro fiel del Goethe-Zertifikat B2 (formato 2019): Lesen 65′, Hören ~40′ con escuchas 1-2-1-2, Schreiben 75′ y Sprechen (Vortrag + Diskussion). Examen MODULAR — cada módulo vale 100 puntos y se aprueba por separado con 60, sin compensación. Temas: formación dual, escuela digital, huelga climática, redes, club deportivo, vivienda de estudiantes.",
   "scoring": {
    "passPct": 60,
    "modular": true,
    "pointsPerItem": {
     "lesen": 3.3333333333333335,
     "hoeren": 3.3333333333333335
    },
    "bands": [
     {
      "min": 90,
      "label": "sehr gut"
     },
     {
      "min": 80,
      "label": "gut"
     },
     {
      "min": 70,
      "label": "befriedigend"
     },
     {
      "min": 60,
      "label": "ausreichend"
     },
     {
      "min": 0,
      "label": "nicht bestanden"
     }
    ]
   },
   "sections": [
    {
     "skill": "lesen",
     "label": "Lesen",
     "minutes": 65
    },
    {
     "skill": "hoeren",
     "label": "Hören",
     "minutes": 40
    },
    {
     "skill": "schreiben",
     "label": "Schreiben",
     "minutes": 75
    },
    {
     "skill": "sprechen",
     "label": "Sprechen",
     "minutes": 15
    }
   ]
  }
 ],
 "en": [
  {
   "id": "en-sim-a",
   "level": "a1",
   "title": "LanguageCert Set A",
   "description": "Simulacro completo del LanguageCert ESOL A1: un día en Londres — café, compras y transporte. Doble escucha y nota oficial Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 45
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 35
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 6
    }
   ]
  },
  {
   "id": "en-sim-b",
   "level": "a1",
   "title": "LanguageCert Set B",
   "description": "Simulacro completo del LanguageCert ESOL A1: tiempo libre, comida y viajes por Londres. Doble escucha y nota oficial Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 45
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 35
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 6
    }
   ]
  },
  {
   "id": "en-a2-sim-a",
   "level": "a2",
   "title": "LanguageCert Access Set A",
   "description": "Simulacro completo del LanguageCert International ESOL A2 Access: un viaje de Valeria a Edimburgo y las gestiones de servicios por el camino (correos, banco, taller, policía, hotel). Doble escucha, registro informal/formal en Writing y nota oficial Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 45
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 35
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 9
    }
   ]
  },
  {
   "id": "en-a2-sim-b",
   "level": "a2",
   "title": "LanguageCert Access Set B",
   "description": "Simulacro completo del LanguageCert ESOL A2 Access: salud, compras y comida en un sábado de Valeria. Doble escucha, registro informal/formal en Writing y nota oficial Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 45
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 35
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 9
    }
   ]
  },
  {
   "id": "en-a2-sim-c",
   "level": "a2",
   "title": "LanguageCert Access Set C",
   "description": "Simulacro completo del LanguageCert ESOL A2 (Access): ocio, amistades, correspondencia y el tiempo en Londres. Doble escucha, escritura informal y formal, y nota oficial Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 20
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 45
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 35
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 9
    }
   ]
  },
  {
   "id": "en-b1-sim-a",
   "level": "b1",
   "title": "LanguageCert Achiever Set A",
   "description": "Simulacro completo del LanguageCert ESOL B1 Achiever: un viaje ganado en un concurso y un cambio de trabajo — de un café a coordinadora de viajes. Doble escucha en las cuatro partes del Listening, Reading fiel al formato oficial y nota Pass/High Pass.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 80
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 50
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 12
    }
   ]
  },
  {
   "id": "en-b1-sim-b",
   "level": "b1",
   "title": "LanguageCert Achiever Set B",
   "description": "Simulacro completo del LanguageCert International ESOL B1 Achiever: salud, ocio y relaciones personales — una cita médica, un accidente menor, un club nuevo y un desacuerdo que se resuelve con acuerdo. Doble escucha en las cuatro partes del Listening y nota oficial Pass/High Pass; hay compensación entre destrezas del escrito (no es un examen modular).",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 80
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 50
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 12
    }
   ]
  },
  {
   "id": "en-b1-sim-c",
   "level": "b1",
   "title": "LanguageCert Achiever Set C",
   "description": "Simulacro completo del LanguageCert International ESOL B1 Achiever: educación, tecnología y medios, compras y medio ambiente. Listening 26 ítems y Reading 26 ítems (doble escucha en todo el Listening), Writing con la rúbrica oficial de 4 criterios, Speaking en 4 partes. Examen COMPENSATORIO: Listening, Reading y Writing se suman sin mínimo por destreza.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 75
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 55
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 12
    }
   ]
  },
  {
   "id": "en-b2-sim-a",
   "level": "b2",
   "title": "LanguageCert Communicator Set A",
   "description": "Simulacro completo del LanguageCert ESOL B2 Communicator: radio comunitaria y periodismo de barrio. Listening ~30′ todo ×2, Reading 26 ítems, Writing 100-150 y 150-200 palabras. Pass 50 %, High Pass 67 %, compensable, no modular.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 80
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 50
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 13
    }
   ]
  },
  {
   "id": "en-b2-sim-b",
   "level": "b2",
   "title": "LanguageCert Communicator Set B",
   "description": "Segundo simulacro del LanguageCert ESOL B2 Communicator: desperdicio de comida, cocinas comunitarias y turnos de panadería. Misma estructura que el Set A, otros textos. Pass 50 %, High Pass 67 %, compensable.",
   "scoring": {
    "passPct": 50,
    "highPassPct": 67,
    "bands": [
     {
      "min": 67,
      "label": "High Pass"
     },
     {
      "min": 50,
      "label": "Pass"
     },
     {
      "min": 0,
      "label": "Fail"
     }
    ]
   },
   "sections": [
    {
     "skill": "hoeren",
     "label": "Listening",
     "minutes": 30
    },
    {
     "skill": "lesen",
     "label": "Reading",
     "minutes": 80
    },
    {
     "skill": "schreiben",
     "label": "Writing",
     "minutes": 50
    },
    {
     "skill": "sprechen",
     "label": "Speaking",
     "minutes": 13
    }
   ]
  }
 ]
};
