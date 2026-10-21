// Práctica libre del cuaderno: consignas, meta de palabras y arranques.
// Todo se resuelve aquí. No hay nada que consultar fuera de la máquina.

import type { Cefr } from "./cefr";

export interface Consigna {
  /** la consigna, en el idioma que se estudia */
  target: string;
  /** qué se espera, en español */
  es: string;
}

export interface Companera {
  name: string;
  title: string;
  starters: string[];
  placeholder: string;
}

type Peldaño = "a1" | "a2" | "b1" | "b2";

interface TallerLang {
  writingName: string;
  examOf: Record<Peldaño, string>;
  wordGoal: Record<Peldaño, string>;
  topics: Record<Peldaño, Consigna[]>;
  criteria: [string, string][];
  partner: Companera;
}

const DE: TallerLang = {
  writingName: "el Schreiben",
  examOf: {
    a1: "Start Deutsch 1",
    a2: "Goethe-Zertifikat A2",
    b1: "Goethe-Zertifikat B1",
    b2: "Goethe-Zertifikat B2",
  },
  wordGoal: {
    a1: "~30",
    a2: "20-30 (SMS) · 30-40 (correo)",
    b1: "~80 (Aufgabe 1) · ~40 (Aufgabe 2)",
    b2: "~150 (Forumsbeitrag) · ~100 (Nachricht al superior)",
  },
  topics: {
    a1: [
      { target: "Schreiben Sie über Ihren Tag.", es: "Escribe sobre tu día (rutina, horas, comidas)." },
      { target: "Schreiben Sie über Ihre Familie.", es: "Escribe sobre tu familia." },
      { target: "Was haben Sie am Wochenende gemacht?", es: "¿Qué hiciste el fin de semana? (Perfekt)" },
      { target: "Schreiben Sie eine E-Mail: Sie können am Montag nicht arbeiten.", es: "Email: no puedes trabajar el lunes — explica por qué y desde cuándo vuelves." },
      { target: "Schreiben Sie über Ihre Wohnung.", es: "Describe tu casa: habitaciones, muebles, qué te gusta." },
      { target: "Was essen Sie gern? Was essen Sie nicht gern?", es: "Qué te gusta comer y qué no." },
      { target: "Schreiben Sie eine E-Mail an einen Freund: Laden Sie ihn ins Kino ein.", es: "Email a un amigo: invítalo al cine (día, hora, dónde se ven)." },
      { target: "Schreiben Sie über Ihren nächsten Urlaub.", es: "Tu próximo viaje: a dónde, cómo, qué quieres hacer." },
    ],
    a2: [
      { target: "Schreiben Sie eine SMS: Sie kommen zu spät zum Treffen.", es: "SMS: llegas tarde. Dónde estás, por qué y a qué hora llegas (20-30 palabras, 3 puntos)." },
      { target: "E-Mail an eine Freundin: Laden Sie sie am Samstag ein.", es: "Correo a una amiga (du): invítala el sábado (qué, cuándo, dónde). 20-30 palabras, 3 puntos." },
      { target: "E-Mail: Sie können am Montag nicht zur Arbeit kommen. Erklären Sie warum.", es: "Correo: no puedes ir a trabajar el lunes. Motivo y desde cuándo vuelves." },
      { target: "Schreiben Sie über Ihr letztes Wochenende.", es: "Tu último fin de semana en Perfekt: qué hiciste, con quién, cómo fue." },
      { target: "E-Mail an Frau Müller: Sie haben eine Jacke bestellt, sie ist zu klein.", es: "Correo semiformal: la chaqueta es pequeña. Qué pasó y qué pides (Sie)." },
    ],
    b1: [
      { target: "Forumsbeitrag: „Sollten Handys in der Schule verboten werden?“ Schreiben Sie Ihre Meinung (ca. 80 Wörter).", es: "Foro: ¿móviles prohibidos en clase? Tu opinión, un argumento y un ejemplo (unas 80 palabras)." },
      { target: "Forumsbeitrag: „Autofreie Innenstädte — gute Idee?“ Nennen Sie Vor- und Nachteile.", es: "Foro: centros sin coches. Ventajas, desventajas y tu postura." },
      { target: "E-Mail an eine Freundin: Sie können nicht zu ihrer Feier kommen. Entschuldigen Sie sich, erklären Sie warum und schlagen Sie einen neuen Termin vor.", es: "Mail a una amiga: no puedes ir a su fiesta. Disculpa, motivo y propuesta de otro día." },
      { target: "Formelle E-Mail: Sie haben eine Waschmaschine online bestellt, sie kam beschädigt an. Beschweren Sie sich und fordern Sie eine Lösung.", es: "Mail formal: pediste una lavadora y llegó dañada. Reclama y pide una solución (con Sie, sin fugas de tú)." },
      { target: "Formelle E-Mail an die Sprachschule: Sie müssen den Kurs unterbrechen. Bitten Sie um eine Lösung.", es: "Mail formal a la escuela: tienes que interrumpir el curso. Explica y pide alternativa." },
      { target: "Forumsbeitrag: „Homeoffice oder Büro?“ Begründen Sie Ihre Meinung mit zwei Argumenten.", es: "Foro: teletrabajo u oficina. Dos argumentos y tu conclusión." },
      { target: "E-Mail: Bedanken Sie sich bei einer Nachbarin, die auf Ihre Wohnung aufgepasst hat, und bieten Sie etwas an.", es: "Mail: agradece a tu vecina que cuidara tu piso y ofrécele algo a cambio." },
    ],
    b2: [
      { target: "Forumsbeitrag: „Homeoffice dauerhaft — Chance oder Risiko?“ Schreiben Sie Ihre Meinung (ca. 150 Wörter): Einleitung, zwei Argumente, eine Gegenposition und ein Schluss.", es: "Foro B2: teletrabajo permanente. ~150 palabras, tesis, dos razones, una objeción y cierre." },
      { target: "Nachricht an Ihren Vorgesetzten, Herrn Ebert: Sie müssen nächste Woche eine Fortbildung besuchen. Begründen Sie, nennen Sie Vertretung und Termin (ca. 100 Wörter, Anrede und Gruß).", es: "Nachricht formal al superior: formación la semana que viene. Motivo, suplencia, fechas. Sie, Anrede y Gruß, ~100 palabras." },
      { target: "Forumsbeitrag: „Sollten Städte den Autoverkehr in der Innenstadt stärker beschränken?“ Wägen Sie Vor- und Nachteile ab.", es: "Foro: limitar el coche en el centro. Ventajas, inconvenientes y tu postura, con conectores de dos piezas." },
      { target: "Nachricht an die Verwaltung: Beschwerde über wiederholten Lärm nach 22 Uhr. Schildern Sie den Sachverhalt und fordern Sie eine Maßnahme.", es: "Reclamación formal: ruido después de las 22. Hechos, petición, Sie sostenido." },
    ],
  },
  criteria: [
    ["Erfüllung", "¿Trataste los puntos, y cada uno con algo de desarrollo?"],
    ["Kohärenz", "¿Se lee de corrido, con conectores que unen ideas de verdad?"],
    ["Wortschatz", "¿Variedad y precisión, o las mismas cuatro palabras?"],
    ["Strukturen", "Casos, orden de la frase y subordinadas. ¿El error estorba para entenderte?"],
  ],
  partner: {
    name: "Mia",
    title: "Conversación con Mia",
    starters: ["Hallo! Wie geht's?", "Was machst du heute?", "Was isst du gern?", "Erzähl mir von deiner Familie"],
    placeholder: "Escribe en alemán lo que has dicho en voz alta",
  },
};

const EN: TallerLang = {
  writingName: "el Writing",
  examOf: {
    a1: "LanguageCert ESOL A1 Preliminary",
    a2: "LanguageCert ESOL A2 Access",
    b1: "LanguageCert ESOL B1 Achiever",
    b2: "LanguageCert ESOL B2 Communicator",
  },
  wordGoal: {
    a1: "30-50 (tarea 1) · 20-30 (tarea 2)",
    a2: "30-50 en las dos tareas",
    b1: "70-100 (carta formal) · 100-120 (carta informal)",
    b2: "100-150 (formal) · 150-200 (carta, relato o descripción)",
  },
  topics: {
    a1: [
      { target: "Write about your day.", es: "Escribe sobre tu día (rutina, horas, comidas)." },
      { target: "Write about your family.", es: "Escribe sobre tu familia: quiénes son, cómo son." },
      { target: "Write an email to a friend: invite them to the cinema.", es: "Email a un amigo: invítalo al cine (día, hora, dónde se ven)." },
      { target: "Write about your home.", es: "Describe tu casa: habitaciones, muebles, qué te gusta." },
      { target: "What food do you like? What food don't you like?", es: "Qué te gusta comer y qué no — con because si te atreves." },
      { target: "Write an email: you can't go to English class on Monday.", es: "Email: no puedes ir a clase el lunes — explica por qué." },
      { target: "Write about your free time.", es: "Tu tiempo libre: qué haces, cuándo, con quién." },
    ],
    a2: [
      { target: "Write about your last holiday: where you went and what you did.", es: "Tus últimas vacaciones: dónde fuiste y qué hiciste — todo en past simple." },
      { target: "Write an email to a friend about your plans for next weekend.", es: "Email a un amigo: tus planes para el finde que viene (going to)." },
      { target: "Write about the town where you grew up. What was it like?", es: "Cómo era tu pueblo o barrio de pequeño: there was / there were." },
      { target: "Write an email: you bought something online and it arrived late. Ask the shop what happened.", es: "Email a una tienda: el pedido llegó tarde. Cuenta qué pasó y pregunta." },
      { target: "Compare your life now with your life five years ago.", es: "Tu vida ahora frente a hace cinco años — comparativos." },
      { target: "Write about a person you admire and why.", es: "Alguien a quien admiras y por qué: descríbelo y da razones." },
    ],
    b1: [
      { target: "Write a letter to your local newspaper about the new bus timetable. Say what has changed, how it affects you and what you want the council to do.", es: "Carta formal al periódico local por los nuevos horarios de bus: qué ha cambiado, cómo te afecta y qué pides. Registro cortés, 70-100 palabras." },
      { target: "Write a formal email to an online shop: the laptop you ordered arrived damaged. Explain, say what you have already tried and ask for a solution.", es: "Mail formal: el portátil llegó dañado. Los tres puntos, envueltos con cortesía." },
      { target: "Write a letter to a magazine giving your opinion: should city centres be car-free?", es: "Carta de opinión a una revista: ¿centros sin coches? Postura, dos razones y una concesión (although, however)." },
      { target: "Write an email to a friend: you can't come to their wedding. Apologise, explain why and suggest another way to celebrate together.", es: "Mail a un amigo: no puedes ir a su boda. Disculpa, motivo y propuesta — informal, 100-120 palabras." },
      { target: "Write an email to a friend who is moving to your city: tell them about your neighbourhood and give them two pieces of advice.", es: "Mail a un amigo que se muda a tu ciudad: cuéntale tu barrio y dale dos consejos." },
      { target: "Write a formal email to a language school: you have to interrupt your course. Explain and ask for options.", es: "Mail formal a la escuela: tienes que dejar el curso. Explica y pide alternativas." },
      { target: "Write an email to a friend: thank them for looking after your flat and tell them about your trip.", es: "Mail a un amigo: agradécele que cuidara tu piso y cuéntale el viaje." },
    ],
    b2: [
      { target: "Write a formal letter (100-150 words) to a local council: a new bus lane has made your street worse. Cover all content points: what has changed, how it affects residents, and what you want them to do.", es: "Writing 1 del B2: formal 100-150, lector especificado, puntos de contenido. Fuera de tema = cero." },
      { target: "Write an article for a college magazine entitled \"My earliest childhood memories\". Describe your clearest memory and say why you remember it (150-200 words).", es: "Writing 2: composición descriptiva 150-200. No es un ensayo argumentativo." },
      { target: "Write a report for your manager on a training day: what went well, what did not, and what you recommend. Hedge your conclusions.", es: "Informe: datos, proceso, conclusión con reservas (It is likely that… / The evidence suggests…)." },
      { target: "Write a review of a neighbourhood café: food, service and whether you would go back (150-200 words).", es: "Reseña: colocación y valoración en registro de revista, no de chat." },
    ],
  },
  criteria: [
    ["Task fulfilment", "¿Hiciste lo que se pedía, con todos los puntos?"],
    ["Grammar", "¿Variedad de estructuras y corrección?"],
    ["Vocabulary", "¿Variedad, precisión y ortografía?"],
    ["Organisation", "¿Párrafos, conectores y puntuación sostienen el texto?"],
  ],
  partner: {
    name: "Holly",
    title: "Conversación con Holly",
    starters: ["Hi! How's it going?", "What do you do?", "What food do you like?", "Tell me about your family"],
    placeholder: "Escribe en inglés lo que has dicho en voz alta",
  },
};

const TALLER: Record<string, TallerLang> = { de: DE, en: EN };

function peldaño(cefr: Cefr): Peldaño {
  // C1 y C2 se apoyan en el B2: el curso no sube de ahí.
  if (cefr === "c1") return "b2";
  if (cefr === "c2") return "b2";
  return cefr;
}

function de(lang: string): TallerLang {
  return TALLER[lang] ?? DE;
}

export function tallerDe(lang: string): TallerLang {
  return de(lang);
}

export function consignasDe(lang: string, cefr: Cefr): Consigna[] {
  return de(lang).topics[peldaño(cefr)];
}

export function metaPalabras(lang: string, cefr: Cefr): string {
  return de(lang).wordGoal[peldaño(cefr)];
}

export function examenDe(lang: string, cefr: Cefr): string {
  return de(lang).examOf[peldaño(cefr)];
}

export function nombreEscritura(lang: string): string {
  return de(lang).writingName;
}
