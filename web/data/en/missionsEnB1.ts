// PRÁCTICA REAL · inglés B1 — una misión TBLT por módulo (spec: PLAN-EN-B1
// §4.3, con la factura de missionsEnA2 subida de nivel).
//
// QUÉ CAMBIA DEL A2 AL B1, Y SE TIENE QUE NOTAR EN CADA MISIÓN: en A2 la tarea
// era transaccional y se resolvía con frases hechas (pedir, contar el finde,
// describir a alguien). Aquí se PRODUCE: cien o ciento veinte palabras que
// alguien va a leer de verdad, minuto y medio de habla seguida, una postura
// argumentada y —lo que más cuesta— un punto concedido al que lleva la
// contraria. Por eso el partner del role-play NO da la razón: sin fricción no
// hay tarea de B1.
//
// EL MUNDO ES EL DE QUIEN ESTUDIA DESDE MADRID, BOGOTÁ O BUENOS AIRES, no el
// de quien vive en Londres: internet, teléfono, mensajes, papeles, lo que hay
// en casa y la gente con la que ya se habla. Ninguna misión exige encontrar un
// nativo por la calle, porque esa es la misión que nadie hace nunca.
//
// CANON.md manda (ciudad, oficio y papel de los seis principales no se tocan).
// Mrs Beckett —la casera de Palmer Road del enb1m1— y la doctora Ellis ya
// tienen su fila; Emma es la amiga de Mánchester del A1. Los tres papeles que
// ningún personaje del elenco puede cubrir sin romper su oficio —quien te
// entrevista para un puesto, quien te atiende en atención al cliente, quien
// está detrás del mostrador cuando se cae un vuelo— y la examinadora del m12
// van SIN NOMBRE a propósito: no se inventan secundarios para un role-play, y
// además en el examen no te examina un conocido.
import type { Mission } from "@/lib/types";

export const missionsEnB1: Record<string, Mission> = {
  enb1m1: {
    phaseId: "enb1m1",
    title: "La cuenta real del alquiler",
    canDo: "Puedo responder a un anuncio de vivienda por escrito, contar cuánto llevo en un sitio y pedir información con conectores de nivel (CEFR B1: gestionar un asunto de la vida diaria por escrito, con present perfect y although/despite).",
    outcome: "Una cifra que antes no tenías: lo que cuesta de verdad al mes un piso concreto de un anuncio real —alquiler, gastos y council tax sumados—, y tu mensaje de 100 palabras al anunciante, con tres preguntas dentro, mandado o guardado listo para mandar.",
    prep: [
      { text: "I've lived here for two years.", es: "Llevo dos años viviendo aquí. (for + duración, y el verbo en present perfect: «I live here since two years» es EL error del nivel)" },
      { text: "I've been working at the same place since March.", es: "Llevo trabajando en el mismo sitio desde marzo. (since + punto de arranque; y continuo, porque se habla de la duración de una actividad)" },
      { text: "Are the bills included?", es: "¿Están los gastos incluidos? (bills = luz, agua e internet: la palabra que decide si el piso es caro)" },
      { text: "Does the rent include council tax?", es: "¿El alquiler incluye el impuesto municipal? (el council tax lo paga quien vive en la casa, no el dueño; si no está incluido, súmalo)" },
      { text: "How much is the deposit, and when do I get it back?", es: "¿De cuánto es la fianza y cuándo me la devuelven? (the deposit: el mes que dejas y te devuelven al irte)" },
      { text: "Could you tell me if the flat is still available?", es: "¿Podría decirme si el piso sigue libre? (pregunta indirecta: dentro ya no se invierte — «if the flat IS», nunca «is the flat»)" },
      { text: "Although the room is small, the location suits me.", es: "Aunque la habitación es pequeña, la zona me viene bien. (although + frase entera, y sin «but» detrás: uno de los dos sobra)" },
      { text: "Despite the high rent, I'm still interested.", es: "A pesar del alquiler alto, me sigue interesando. (despite + sustantivo, y sin «of»: «despite of» no existe)" },
      { text: "I'd like to arrange a viewing.", es: "Me gustaría concertar una visita. (a viewing: ir a ver el piso antes de alquilarlo)" },
    ],
    steps: [
      "Abre un portal británico o irlandés de verdad —SpareRoom para habitaciones, Rightmove o Zoopla para pisos, Daft si te tira Irlanda— y elige UN anuncio concreto: el que cogerías si vivieras allí.",
      "Haz la aritmética que el anuncio no hace por ti: alquiler mensual + bills (si no van incluidos) + council tax + la fianza que hay que adelantar. Apunta la cifra final. Esa cifra es media misión.",
      "Escribe las 100 palabras: quién eres, cuánto llevas donde estás ahora (present perfect, con for y con since cada uno en su sitio), por qué encajas, y una concesión con although o con despite.",
      "Mete TRES preguntas tuyas, y que una sea indirecta: Could you tell me if…? Las otras dos, de dinero: bills, council tax, deposit.",
      "Mándalo si el anuncio te sirve de verdad; guárdalo listo si no. Y aguanta a Mrs Beckett en el role-play sin cambiar al español.",
    ],
    world: "El mercado británico está abierto y en inglés a cualquier hora, y leerlo no compromete a nada. Si conoces a alguien que ya viva allí —o a tu pareja de intercambio—, pásale tu mensaje con una sola pregunta: ¿contestarías a esto? Es la única corrección que importa.",
    home: "Convierte TU casa en el anuncio: escríbela en inglés como si la alquilaras (rent, bills, deposit, what's included, the neighbourhood) con su precio real. Después contéstate a tu propio anuncio haciendo de inquilino desconfiado, con las tres preguntas más incómodas que se te ocurran. Grábate leyendo las dos partes.",
    roleplay: {
      partner: "Mrs Beckett",
      opener: "Hello. Yes, the room's still free — but I've had fourteen messages today. Why should I show it to you?",
    },
    checklist: [
      "Elegí un anuncio real y tengo la cifra final: alquiler, gastos y council tax sumados",
      "Conté cuánto llevo donde estoy con present perfect, y repartí bien for y since",
      "Metí una concesión con although o con despite, cada uno con lo que le toca detrás",
      "Hice tres preguntas, y una de ellas indirecta y sin invertir",
      "El mensaje de 100 palabras existe: mandado, o guardado listo para mandar",
    ],
  },

  enb1m2: {
    phaseId: "enb1m2",
    title: "Tu CV inglés, y la carta que lo acompaña",
    canDo: "Puedo describir un puesto y describirme a mí con oraciones de relativo, y escribir una carta de presentación de 100 palabras (CEFR B1: hablar de trabajo y competencias con relativas y verbos con preposición pegada).",
    outcome: "Dos archivos que antes no existían: un CV de una página en inglés británico y una covering letter de 100 palabras, encajados en una oferta real que has elegido — y leídos por alguien que te dice si te llamaría.",
    prep: [
      { text: "I'm writing to apply for the job advertised on your website.", es: "Les escribo para presentarme al puesto anunciado en su web. (apply FOR a job — «apply to» solo con una empresa entera)" },
      { text: "I've worked with the public for three years.", es: "Llevo tres años trabajando de cara al público." },
      { text: "I'm good at dealing with people.", es: "Se me da bien tratar con la gente. (good AT, nunca «good in»; y detrás de la preposición, -ing)" },
      { text: "I'm responsible for the till.", es: "Soy responsable de la caja. (responsible FOR, nunca «responsible of»)" },
      { text: "It's the sort of job I'm looking for.", es: "Es el tipo de trabajo que busco. (relativo borrado y preposición al final: nadie dice «for which I am looking»)" },
      { text: "I'm looking for a permanent contract with good prospects.", es: "Busco un contrato fijo con buenas perspectivas." },
      { text: "I handed in my notice last month.", es: "Presenté mi dimisión el mes pasado. (hand in your notice: es la fórmula; «present my dimission» no existe)" },
      { text: "I look forward to hearing from you.", es: "Quedo a la espera de su respuesta. (ese «to» es preposición: detrás va -ing, jamás «to hear»)" },
    ],
    steps: [
      "Busca UNA oferta real en inglés: Indeed UK, Reed, o la página de empleo de cualquier empresa grande. Léela entera y subraya las skills que pide, con sus palabras.",
      "Monta el CV a la británica: una página, sin foto, sin fecha de nacimiento y sin estado civil. Personal statement de tres líneas, Work experience de lo más reciente a lo más antiguo, Education, Skills y References available on request.",
      "Escribe la covering letter de 100 palabras: por qué ese puesto, dos frases con relativa que digan quién eres (I'm the sort of person who…), y el cierre fijo. Dear Sir or Madam cierra con Yours faithfully; con nombre, Yours sincerely.",
      "Repasa cazando preposiciones, que son las cinco que delatan: apply for, good at, responsible for, deal with, y work with (personas) frente a work for (empresa).",
      "Pásaselo a alguien que lea inglés —tu pareja de intercambio, un compañero, quien sea— con una sola pregunta: ¿me llamarías? Y guarda los dos archivos en PDF: eso es el resultado.",
    ],
    world: "El CV británico se busca por su nombre y sale a miles: mira tres de verdad antes de escribir el tuyo y fíjate en lo corto que es todo. Y si trabajas ya, tienes la versión más útil de esta misión: traduce tu propio puesto de hoy a la ficha inglesa (job title, duties, skills). Es la conversación que tendrás si alguna vez te mudas.",
    home: "Escribe el anuncio del trabajo que te gustaría tener, en el idioma de los anuncios británicos (No experience necessary · Apply in writing to the Manager · Immediate start). Después preséntate a tu propio anuncio con la carta de 100 palabras. Verlo desde los dos lados es lo que enseña qué se pide de verdad.",
    roleplay: {
      partner: "La entrevistadora",
      opener: "Good morning, thanks for coming in. So — tell me, why did you apply for this job?",
    },
    checklist: [
      "Elegí una oferta real y saqué de ella las palabras que pide",
      "El CV cabe en una página y va sin foto, sin edad y sin estado civil",
      "Escribí dos frases con relativa que dicen quién soy, sin repetir el sujeto",
      "Acerté las cinco preposiciones: apply for, good at, responsible for, deal with, work with o for",
      "Los dos archivos existen y alguien los ha leído y me ha contestado",
    ],
  },

  enb1m3: {
    phaseId: "enb1m3",
    title: "El recado que llega entero",
    canDo: "Puedo escuchar algo en inglés y contárselo a otra persona en estilo indirecto sin perder el dato (CEFR B1: reported speech, preguntas contadas y peticiones con infinitivo).",
    outcome: "Un plan concreto —día, hora y sitio— apuntado en el calendario de otra persona porque tú le pasaste el recado en inglés. Y apuntado bien: si el día sale mal, la misión no cuenta.",
    prep: [
      { text: "She said she was working late on Thursday.", es: "Dijo que el jueves trabajaba hasta tarde. (el paso atrás: «I'm working» se cuenta con WAS working)" },
      { text: "He told me he had already booked it.", es: "Me dijo que ya lo había reservado. (tell SIEMPRE con persona detrás; y el present perfect retrocede a past perfect)" },
      { text: "She asked me if I was free on Friday.", es: "Me preguntó si estaba libre el viernes. (contada, la pregunta pierde la inversión y pierde el «do»)" },
      { text: "He asked me where the meeting was.", es: "Me preguntó dónde era la reunión. (jamás «where was the meeting»: ya no es una pregunta)" },
      { text: "She asked me to call her back.", es: "Me pidió que la llamara. (petición contada = infinitivo con to, no «that I called her»)" },
      { text: "He told me not to worry about it.", es: "Me dijo que no me preocupara. (en negativo, NOT TO delante del verbo)" },
      { text: "She said she'd let me know the next day.", es: "Dijo que me diría algo al día siguiente. (will pasa a would, y tomorrow pasa a the next day)" },
      { text: "Sorry, I didn't catch that. Could you say it again?", es: "Perdona, no te he pillado. ¿Me lo repites? (pedir que te repitan es una técnica de examen, no una derrota)" },
    ],
    steps: [
      "Consigue un recado en inglés de verdad. Tres formas que funcionan: una nota de voz de tu pareja de intercambio, el contestador de un sitio británico real (llama fuera de horario) o un minuto de vídeo en el que alguien propone un plan.",
      "Escúchalo DOS veces, como en el examen, y saca la ficha en cuatro campos: quién habla · qué propone · qué pregunta · qué pide. Nada más. Lo demás sobra.",
      "Pásaselo a otra persona por escrito, en inglés y en estilo indirecto: She said…, She asked me if…, She asked me to… Mueve los tiempos y mueve también los marcadores: tomorrow deja de ser tomorrow.",
      "Comprueba el resultado en su calendario. Si el día o la hora salen mal, vuelve al audio y busca dónde se te cayó el dato: ahí está tu trabajo, no en la gramática.",
      "Cierra el círculo con quien te lo mandó, confirmando en inglés lo que entendiste: So you're saying…? Es la técnica que el examen pide con nombre y apellidos.",
    ],
    world: "Los recados son el 90 % del inglés de oficina y de familia, y viajan solos: un grupo de WhatsApp, un compañero de curso, alguien de casa que necesita saber a qué hora es algo. Si tu cómplice no habla inglés, mejor: tendrás que traducirlo tú al final, y lo que te cueste traducir es exactamente lo que no sabías decir.",
    home: "Sin nadie a quien pasárselo, hazlo con el contestador de un servicio británico real —un cine, una biblioteca, una consulta— y escríbete el recado a ti mismo en tercera persona, como si se lo dejaras a un compañero de piso. Al día siguiente, léelo sin volver al audio: ¿podrías actuar solo con eso?",
    roleplay: {
      partner: "Amy",
      opener: "Oh — someone rang for you earlier. She said she couldn't make Wednesday and she asked if you were free later in the week.",
    },
    checklist: [
      "Escuché el recado dos veces y saqué la ficha de cuatro campos",
      "Conté lo que dijeron con el tiempo verbal un paso atrás",
      "Conté una pregunta sin invertir y sin «do», y una petición con infinitivo",
      "Moví los marcadores: tomorrow, yesterday y here cambiaron al contarlo",
      "El plan está apuntado en el calendario de otra persona, y con el día correcto",
    ],
  },

  enb1m4: {
    phaseId: "enb1m4",
    title: "El bulo, con su ficha",
    canDo: "Puedo leer una noticia en inglés, separar hecho de opinión y contar lo que se dice sin decir quién lo dice (CEFR B1: pasiva, moldes impersonales y lengua de la prensa).",
    outcome: "Un bulo real cazado y fichado: qué decía exactamente, quién lo publicó primero, en qué fecha y qué dice la fuente que citaba — con tu respuesta de cuatro líneas en inglés mandada a quien te lo reenvió.",
    prep: [
      { text: "It is said that the pool will close.", es: "Se dice que la piscina va a cerrar. (el molde formal; ese «it» del principio no significa nada, es relleno, y va siempre)" },
      { text: "It is believed that the fire started in the kitchen.", es: "Se cree que el fuego empezó en la cocina." },
      { text: "The story was shared two thousand times.", es: "La historia se compartió dos mil veces. (pasiva sin culpable: no importa quién)" },
      { text: "The article is based on a survey.", es: "El artículo se basa en una encuesta. (based ON; y una encuesta se carries out, nunca se «makes»)" },
      { text: "There is no evidence for that.", es: "No hay pruebas de eso. (evidence es incontable: jamás «evidences»)" },
      { text: "The headline was misleading.", es: "El titular inducía a error." },
      { text: "Is that a fact or an opinion?", es: "¿Eso es un hecho o una opinión? (es literalmente lo que separa las dos preguntas del Reading Part 4)" },
      { text: "Check it before you share it.", es: "Compruébalo antes de compartirlo. (detrás de before va presente, aunque hables de lo que viene después)" },
    ],
    steps: [
      "Elige un bulo REAL que te haya llegado a ti: un audio del grupo de la familia, una captura, un titular que te encendió. Con uno de laboratorio el ejercicio no funciona.",
      "Móntalo en ficha de cuatro campos: la afirmación exacta · quién la publicó primero (busca el original, no el reenviado) · la fecha · qué dice de verdad la fuente que citan, leída en su web y en su idioma.",
      "Y el truco del oficio, que vale para toda la vida: busca la fecha. La mitad de los bulos son noticias verdaderas de hace seis años reenviadas como si fueran de ayer.",
      "Escribe las cuatro líneas en inglés con los moldes del módulo: It is said that… · There is no evidence for… · The headline was misleading because… · The article was published in 2019, not last week.",
      "Mándalas a quien te lo reenvió. En su idioma si hace falta, pero escríbelas primero en inglés: lo que te cueste traducir es exactamente lo que no sabías decir.",
    ],
    world: "Las herramientas son gratis y están en inglés: la búsqueda inversa de imágenes de tu navegador, el archivo de cualquier periódico, y las webs de verificación británicas. Media hora aquí te enseña más pasiva que un libro entero, porque el inglés de la prensa está escrito en pasiva de arriba abajo.",
    home: "Coge la portada de un periódico británico en internet y despliega cinco titulares: LIBRARY SAVED → The library was saved. POOL TO CLOSE → The pool is going to close. Escríbelos enteros, con su verbo y su artículo. Después escribe tú tres titulares al estilo del periódico sobre algo que haya pasado en tu calle esta semana.",
    roleplay: {
      partner: "Mr Patel",
      opener: "Have you heard? They're closing the library. It was on the internet — everyone's talking about it.",
    },
    checklist: [
      "La ficha tiene los cuatro campos, y el de la fecha está comprobado",
      "Encontré la publicación original, no la captura reenviada",
      "Escribí dos frases con el molde It is said that… o It is believed that…",
      "Usé una pasiva sin «by» donde el culpable no importaba",
      "Mandé la respuesta a quien me lo reenvió",
    ],
  },

  enb1m5: {
    phaseId: "enb1m5",
    title: "La reclamación que sí se manda",
    canDo: "Puedo escribir una reclamación formal de 100 palabras con sus fórmulas fijas y sostenerla de viva voz sin perder los papeles (CEFR B1: Writing Part 1, segundo condicional y consejo).",
    outcome: "Una reclamación real enviada —con su número de pedido, su fecha y una petición concreta—, en 100 palabras y con su Yours faithfully. Y, quince días después, la respuesta apuntada al lado: la que te dieron, o el silencio que te dieron.",
    prep: [
      { text: "I am writing regarding the coat I ordered online on 3 March.", es: "Les escribo en relación con el abrigo que pedí por internet el 3 de marzo. (la primera frase de la carta formal: qué, y desde cuándo)" },
      { text: "The kettle is faulty and it's still under warranty.", es: "El hervidor está defectuoso y sigue en garantía." },
      { text: "I would be grateful if you could send me a replacement.", es: "Les agradecería que me enviaran uno nuevo. (la petición envuelta: en inglés se reclama fuerte y se dice suave)" },
      { text: "I have attached proof of purchase.", es: "Adjunto el justificante de compra. (el tique, el extracto o el correo del pedido)" },
      { text: "I look forward to hearing from you.", es: "Quedo a la espera de su respuesta. (el cierre fijo — y detrás de ese «to», -ing)" },
      { text: "Yours faithfully,", es: "Atentamente, (Dear Sir or Madam cierra con faithfully; si sabes el nombre, Dear Mr Patel cierra con sincerely)" },
      { text: "If I were you, I would ask for a refund.", es: "Yo que tú pediría que me devolvieran el dinero. (el would vive SIEMPRE en la mitad sin if)" },
      { text: "I should have kept the receipt.", es: "Debería haber guardado el tique. (y no lo guardé: el arrepentimiento va con should have + participio)" },
    ],
    steps: [
      "Busca algo que de verdad te deban: un pedido que no llegó, un aparato que se rompió en garantía, un cobro que no reconoces, una suscripción que sigue cargando. Si no lo tienes tú, hazlo por alguien de tu casa.",
      "Reúne los cuatro datos duros ANTES de escribir: qué, cuándo, cuánto y número de pedido. Sin ellos es una queja; con ellos es una reclamación.",
      "Escribe las 100 palabras en cuatro bloques: por qué escribes · qué pasó · qué pides exactamente · el cierre. Ni una línea de sentimientos: la carta formal inglesa es fría y educada, y por eso funciona.",
      "Léela en voz alta buscando el registro. Si suena a bronca, envuélvela: I would be grateful if you could… Y comprueba el par: Dear Sir or Madam va con Yours faithfully.",
      "Mándala, y apunta la fecha en el calendario. A los quince días anotas al lado lo que pasó. Eso es lo que cierra la misión — no el texto, la respuesta.",
    ],
    world: "Casi todas las empresas grandes tienen atención al cliente en inglés, y muchas lo hacen mejor en inglés que en tu idioma. Si la tuya es local, escribe la carta en inglés igualmente y tradúcela después: la estructura (por qué escribo → qué pasó → qué pido → cierre) es la misma en las dos lenguas y llegarás con los argumentos ordenados.",
    home: "Reclámale a una tienda inventada por algo que sí te ha pasado, y escribe las DOS cartas: la tuya y la respuesta que te darían negándotelo con una excusa razonable. Después escribe tu contestación a esa negativa. Ese segundo asalto es donde de verdad se aprende el registro.",
    roleplay: {
      partner: "El servicio de atención al cliente",
      opener: "Good afternoon, you're through to customer services. Could I take your order number, please?",
    },
    checklist: [
      "Tengo los cuatro datos duros: qué, cuándo, cuánto y número de pedido",
      "Las 100 palabras van en cuatro bloques y sin una línea de sentimientos",
      "Pedí envolviendo: I would be grateful if you could…",
      "El saludo y la despedida hacen pareja: Dear Sir or Madam con Yours faithfully",
      "Está mandada, con fecha apuntada para revisar la respuesta",
    ],
  },

  enb1m6: {
    phaseId: "enb1m6",
    title: "Tres minutos de consulta, preparados",
    canDo: "Puedo preparar y sostener una consulta médica en inglés: contar un síntoma, decir desde cuándo, deducir en voz alta y preguntar (CEFR B1: modales de deducción y de obligación).",
    outcome: "Una ficha de consulta guardada en el móvil —el síntoma, desde cuándo, qué probaste y tres preguntas—, probada contra un reloj de tres minutos. Y al lado, lo que la web del NHS dice que se hace con ese síntoma, leído en inglés.",
    prep: [
      { text: "I've had this cough for about ten days.", es: "Llevo unos diez días con esta tos. (for + duración y present perfect: «I have it since ten days» es el error del nivel)" },
      { text: "It started after a cold.", es: "Empezó después de un catarro." },
      { text: "It must be something I ate.", es: "Tiene que ser algo que comí. (aquí must no obliga: deduce)" },
      { text: "It can't be an allergy — I've never had one.", es: "No puede ser una alergia: no he tenido ninguna nunca. (para deducir que NO va can't; mustn't sería prohibir)" },
      { text: "It might be a virus.", es: "Puede que sea un virus." },
      { text: "I've tried drinking more water.", es: "He probado a beber más agua. (try + -ing es probar a ver qué pasa; try + to sería intentarlo con esfuerzo)" },
      { text: "You don't have to pay for a GP appointment.", es: "No hace falta pagar por la cita con el médico de cabecera. (don't have to EXIME; mustn't PROHÍBE — y en un aviso sanitario, confundirlas es serio)" },
      { text: "Do I need a referral to see a specialist?", es: "¿Necesito volante para ir al especialista? (a referral: la palabra que abre la puerta del sistema británico)" },
    ],
    steps: [
      "Elige un síntoma que YA has tenido y que se te pasó. Nada de lo que tengas hoy: esto es un ejercicio de idioma, y lo de hoy se lo cuentas a tu médico.",
      "Móntalo en cuatro líneas: qué era · desde cuándo (for o since) · qué probaste (try + -ing) · cómo acabó.",
      "Deduce en voz alta con la escalera entera, tres frases y tres grados de seguridad: It must be… porque… / It might be… / It can't be… porque…",
      "Escribe las TRES preguntas que le harías al médico. En el Reino Unido la cita dura diez minutos, y las preguntas que no llevas escritas no se hacen.",
      "Entra en nhs.uk, busca ese síntoma en inglés y lee qué recomiendan: esperar, llamar al 111 o ir a A&E. Apunta las tres palabras nuevas que te encuentres allí.",
      "Cronométrate: tres minutos contando el caso entero sin leer la ficha. Si te sobran, has escrito de más.",
    ],
    world: "La web del NHS es probablemente el mejor material de inglés B1 gratuito que existe: frases cortas, vocabulario altísimo de frecuencia y la misma estructura en todas las páginas. Y si alguna vez viajas o vives allí, esa ficha de tres minutos es literalmente lo que vas a necesitar.",
    home: "Hazle la ficha a otra persona: pregúntale en tu idioma por un susto de salud que ya pasó —tuyo, de tus padres, de alguien de casa— y escríbelo en inglés como si fueras a contarlo tú en la consulta. Después cuéntalo en voz alta, grabado, en cuatro movimientos: qué pasó, qué hicimos, qué dijeron, cómo acabó.",
    roleplay: {
      partner: "Dr Ellis",
      opener: "Come in, take a seat. Right — what seems to be the problem?",
    },
    checklist: [
      "Dije desde cuándo con present perfect y con for o since bien elegido",
      "Usé la escalera entera: must be, might be y can't be, cada una con su motivo",
      "Distinguí mustn't (prohíbe) de don't have to (exime)",
      "Llevo tres preguntas escritas, no improvisadas",
      "La ficha existe en el móvil y la conté entera en tres minutos sin leerla",
    ],
  },

  enb1m7: {
    phaseId: "enb1m7",
    title: "Cinco minutos que no entiendes",
    canDo: "Puedo entender un inglés que no es el de mis audios y pedir ayuda cuando se me escapa, sin abandonar la conversación (CEFR B1: variedades, coletillas y estrategias de reparación).",
    outcome: "Cinco minutos de un inglés que no es el de tus grabaciones, transcritos a mano hasta la última palabra, con la lista de lo que nadie te enseñó resuelta al lado — y tu variedad elegida por escrito, con sus siete pares.",
    prep: [
      { text: "Sorry, I didn't catch that.", es: "Perdona, no te he pillado. (la frase que salva una conversación entera)" },
      { text: "Could you speak a bit more slowly, please?", es: "¿Puede hablar un poco más despacio, por favor?" },
      { text: "Could you put it another way?", es: "¿Me lo puede decir de otra manera? (mejor que pedir la traducción: te lo repiten en inglés y aprendes dos veces)" },
      { text: "You're from Scotland, aren't you?", es: "Eres de Escocia, ¿verdad? (frase afirmativa, coletilla negativa; y se repite el mismo verbo)" },
      { text: "He spoke so fast that I lost the thread.", es: "Hablaba tan rápido que perdí el hilo. (so + adjetivo + that)" },
      { text: "I worked it out from the context.", es: "Lo deduje por el contexto. (y el pronombre va EN MEDIO: work it out, nunca «work out it»)" },
      { text: "It's a lift here and an elevator there.", es: "Aquí es lift y allí elevator. (los siete pares: lift/elevator, flat/apartment, queue/stand in line, autumn/fall, rubbish/trash, chemist's/drugstore, holiday/vacation)" },
      { text: "Sort of, or something like that.", es: "Más o menos, o algo así. (no comprometerse también es una destreza: en el examen te da aire)" },
    ],
    steps: [
      "Elige cinco minutos de inglés REAL que no sea el de tus audios: escocés, irlandés, de Yorkshire, indio, australiano, nigeriano. Los vídeos y los podcasts de la BBC lo regalan.",
      "Transcríbelo a mano, sin subtítulos, parando lo que haga falta. Cinco minutos te van a llevar cuarenta y cinco. Es normal, y es exactamente la parte que funciona.",
      "Ahora pon los subtítulos y corrígete en otro color. Lo que fallaste se ordena solo en tres montones: palabras que no conocías, palabras que SÍ conocías y no reconociste, y palabras que se comieron.",
      "El montón del medio es tu trabajo de verdad: escribe cada una como la oíste, a la española, con la grafía inglesa al lado. Ese montón es tu oído, no tu vocabulario.",
      "Y decide de una vez: ¿británico o americano? Escríbelo en la primera página del cuaderno con los siete pares del módulo. No hay una variedad mejor; hay una elegida y no mezclada.",
    ],
    world: "Búscalo por el nombre de la ciudad, no por el del idioma: cocineros de Glasgow, mecánicos de Belfast, gente contando su día en Lagos o en Delhi. Y si tienes pareja de intercambio, pídele el mayor regalo posible: que te mande dos minutos hablando con su familia, no contigo. Con nosotros los nativos hablan despacio; entre ellos, no.",
    home: "Coge dos minutos de un audio que YA entiendes de este curso y transcríbelo también. Después compara los dos folios: verás que en el difícil no fallaste palabras raras — fallaste and, of, to, have, that, comidas y pegadas. Eso es el habla enlazada, y es lo que hay que entrenar.",
    roleplay: {
      partner: "Emma",
      opener: "Alright? Long time no see! You've been studying dead hard, haven't you?",
    },
    checklist: [
      "Los cinco minutos están transcritos a mano y corregidos en otro color",
      "Separé lo que no conocía de lo que conocía y no reconocí",
      "Pedí ayuda en inglés al menos tres veces, sin abandonar la conversación",
      "Formé bien tres coletillas: mismo verbo, y del revés",
      "Elegí variedad y tengo los siete pares apuntados",
    ],
  },

  enb1m8: {
    phaseId: "enb1m8",
    title: "La auditoría de tu basura",
    canDo: "Puedo comparar con matices, defender una postura con datos y conceder un punto sin rendirme (CEFR B1: comparativos matizados, cuantificadores y concesión).",
    outcome: "Siete días de tu basura contados de verdad: cuántos envases, cuántas botellas, cuánto acabó en el cubo equivocado. Una cifra al final — y UN cambio concreto que empieza el lunes.",
    prep: [
      { text: "There's far too much packaging.", es: "Hay muchísimo embalaje. (far, way y much suben el comparativo; y packaging no tiene plural)" },
      { text: "This week's bin is only slightly fuller than last week's.", es: "El cubo de esta semana está solo un pelín más lleno que el de la semana pasada." },
      { text: "The more you recycle, the less you throw away.", es: "Cuanto más reciclas, menos tiras. (dos «the», uno en cada mitad)" },
      { text: "There aren't enough bins in the street.", es: "No hay suficientes papeleras en la calle. (enough va DETRÁS del adjetivo y DELANTE del sustantivo)" },
      { text: "It's too expensive to buy new.", es: "Es demasiado caro comprarlo nuevo." },
      { text: "Most of the packaging is plastic.", es: "La mayor parte del embalaje es plástico. (most OF cuando es el mío concreto; most a secas para hablar en general)" },
      { text: "Even though it costs more, I buy the local one.", es: "Aunque cuesta más, compro el de aquí. (even though es although con el volumen más alto, y detrás va frase entera)" },
      { text: "You've got a point, but the price is the problem.", es: "Algo de razón tienes, pero el problema es el precio. (conceder puntúa más que tener razón)" },
    ],
    steps: [
      "Durante siete días no tires nada sin contarlo. Basta una hoja pegada a la nevera con cuatro columnas: envases · botellas · comida tirada · lo que no sabes en qué cubo va.",
      "El día siete, suma. Y busca en inglés qué se recicla de verdad: la web de cualquier council británico te explica en inglés B1 clarísimo qué va en cada cubo y por qué.",
      "Escribe cinco frases con lo que has visto, y que cada una lleve su matizador: far more, slightly less, too much, not enough, most of. Sin matizador es A2; con matizador es B1.",
      "Elige UN cambio. Uno, no cinco: el que aguantes un mes entero. Y ponle fecha de inicio.",
      "Defiéndelo en el role-play contra alguien que no se lo cree — y concede al menos un punto de verdad: You've got a point, but… Sin la concesión, la misión no está hecha.",
    ],
    world: "Esta misión tiene la ventaja de que su resultado no depende de nadie: la bolsa está en tu cocina. Y si vives con más gente, hazla con ellos y en inglés a ratos: contar botellas en voz alta es la excusa más tonta y más eficaz para hablar en otro idioma dentro de casa.",
    home: "Fotografía tu bolsa de basura del séptimo día y descríbela en inglés en voz alta durante minuto y medio, sin leer: qué hay, qué sobra, qué se podría evitar y qué vas a cambiar. Guárdate el audio. Repítelo dentro de un mes con la bolsa nueva y compara las dos cosas: la bolsa y el audio.",
    roleplay: {
      partner: "Ben",
      opener: "Come off it. One bag of bottles? What difference does that make, honestly?",
    },
    checklist: [
      "Conté siete días de basura y tengo la cifra final",
      "Cinco frases, cinco matizadores distintos: far, slightly, too, enough, most of",
      "Usé un conector de contraste con lo que le toca detrás: frase con although, sustantivo con despite",
      "Concedí un punto de verdad al que me llevaba la contraria",
      "Hay UN cambio elegido, con fecha de inicio",
    ],
  },

  enb1m9: {
    phaseId: "enb1m9",
    title: "El viaje con su plan B",
    canDo: "Puedo organizar un viaje en inglés, entender la letra pequeña y saber reclamar cuando algo sale mal (CEFR B1: los cuatro futuros, temporales en presente y condiciones).",
    outcome: "Un viaje real con su plan B por escrito y sus derechos comprobados: qué pasa si se cancela, cuánto tienen que devolverte, a quién se reclama y con qué palabras — leído en la web de la compañía, en inglés, y guardado en una nota de cinco líneas.",
    prep: [
      { text: "We're flying out on Friday.", es: "Salimos el viernes. (present continuous: hay billete y hay hora — el futuro de la agenda)" },
      { text: "The coach gets in at half nine.", es: "El autocar llega a las nueve y media. (presente simple: es un horario publicado, no un plan mío)" },
      { text: "I'll let you know when I've landed.", es: "Te digo algo cuando haya aterrizado. (detrás de when, jamás will; y el perfecto deja claro qué pasa antes)" },
      { text: "As soon as I get there, I'll text you.", es: "En cuanto llegue, te escribo. (el «llegue» del español es presente simple en inglés)" },
      { text: "You can take it on board as long as it fits in the frame.", es: "Puedes subirlo a bordo siempre que quepa en el medidor." },
      { text: "Take a jumper in case it gets cold.", es: "Llévate un jersey por si acaso hace frío. (in case = te preparas ANTES; con if sería después, y ya sería tarde)" },
      { text: "The eight-fifteen has been cancelled.", es: "El de las ocho y cuarto lo han cancelado. (pasiva: quién lo canceló da igual)" },
      { text: "I've missed my connection. Can I claim compensation?", es: "He perdido el enlace. ¿Puedo reclamar una indemnización? (a delay se sufre: en inglés no se «tiene» retraso)" },
    ],
    steps: [
      "Elige un viaje real: el próximo que tengas o el último que hiciste. Que tenga billete, hora y compañía con nombre.",
      "Cuéntalo con los cuatro futuros, uno cada uno: lo que está quedado (present continuous), lo que dice el horario (present simple), lo que ya habías decidido (going to) y lo que decides sobre la marcha (will).",
      "Ahora la parte que nadie hace: entra en la web de la compañía, en inglés, y busca delays and cancellations. Apunta cuántos minutos de retraso dan derecho a qué, y cómo se llama el formulario.",
      "Escribe el plan B en cinco líneas con las condiciones del módulo: If the train is cancelled… · As long as I keep the ticket… · In case it happens again… · Unless they reply within…",
      "Guárdalo donde lo vayas a encontrar el día que se te caiga el viaje. Ese es el resultado: no un texto bonito, una salida.",
    ],
    world: "Las webs de las compañías británicas —National Rail, las aerolíneas, los operadores de autocar— tienen sus condiciones en un inglés seco y repetitivo que es oro para este nivel: la misma treintena de palabras una y otra vez. Media hora ahí te deja el campo entero puesto.",
    home: "Reconstruye un viaje que se te torció de verdad y cuéntalo en dos capas, como se cuenta un viaje: la línea de los hechos (we set off, we missed it, they put us on a bus) y la línea de lo que sentías. Minuto y medio grabado, con su cierre: We just made it · The journey back was a nightmare · Everything went smoothly.",
    roleplay: {
      partner: "La persona del mostrador",
      opener: "I'm afraid the eight-fifteen has been cancelled. The next available service is tomorrow morning. Can I take your booking reference?",
    },
    checklist: [
      "Usé los cuatro futuros, cada uno con su disparador",
      "Detrás de when, as soon as, until y as long as puse presente, nunca will",
      "Distinguí in case (me preparo antes) de if (si pasa)",
      "Leí en inglés las condiciones de la compañía y sé qué dan y desde qué minuto",
      "El plan B existe, en cinco líneas y guardado donde lo voy a encontrar",
    ],
  },

  enb1m10: {
    phaseId: "enb1m10",
    title: "La persona con la que perdiste el contacto",
    canDo: "Puedo contar una historia con dos pisos de pasado y escribir una carta personal de 120 palabras que cumpla dos funciones (CEFR B1: past perfect, used to y would, y Writing Part 2).",
    outcome: "Un mensaje de 120 palabras mandado de verdad a alguien con quien perdiste el contacto — y su respuesta en tu bandeja de entrada. Si contesta, al final de la misión hay dos cosas: el texto y la persona.",
    prep: [
      { text: "We lost touch after school.", es: "Perdimos el contacto al acabar el colegio." },
      { text: "By the time I wrote to you, I had already moved.", es: "Cuando te escribí, ya me había mudado. (had + participio: la señal de qué pasó ANTES)" },
      { text: "We used to walk home together.", es: "Antes volvíamos andando juntos. (used to vive SOLO en pasado: «suelo» en presente es usually)" },
      { text: "Every summer she would sing in the kitchen.", es: "Todos los veranos cantaba en la cocina. (would repite acciones; con estados no vale: «I would know her» no existe)" },
      { text: "We've known each other for years.", es: "Nos conocemos desde hace años. (each other, jamás «we've known us»)" },
      { text: "It was lovely to hear from you.", es: "Me ha encantado saber de ti. (la primera línea de media carta informal británica)" },
      { text: "I owe you an apology.", es: "Te debo una disculpa." },
      { text: "Let me know what you think.", es: "Dime qué te parece. (el cierre que pide respuesta: sin él, no hay respuesta)" },
    ],
    steps: [
      "Piensa en alguien de verdad: la pareja de intercambio que se enfrió, un compañero de un curso, alguien de un foro, un primo lejano. Que escribirle en inglés tenga sentido con esa persona.",
      "Ordena la historia en dos pisos: lo que pasó, y lo que ya estaba antes. Y aplica la regla honrada: si quitas el had y el orden se entiende igual, quítalo. El past perfect es una señal, no un adorno.",
      "Escribe las 120 palabras con las DOS funciones que pide el examen: contar algo tuyo Y proponer algo concreto. Una carta que solo cuenta se queda a mitad de nota.",
      "Mete un used to y un would de recuerdo, comprueba que no se te ha colado ningún «we know us», y cierra con Let me know what you think.",
      "Mándalo. La misión se cierra cuando llega la respuesta, no cuando pulsas enviar.",
    ],
    world: "Retomar un contacto es de las pocas cosas que casi siempre salen bien: la gente se alegra mucho más de lo que uno teme. Y si de verdad no hay a quién escribir, existen los foros de intercambio y las apps de tándem, donde la primera carta de presentación es exactamente esta tarea.",
    home: "Escríbele las 120 palabras a alguien que ya no puedes mandárselas —alguien de tu infancia, alguien que ya no está—, con sus used to y sus would. Léela en voz alta y grábala. Es la mejor manera que conocemos de aprender el pasado de un idioma, y de lejos la que más se recuerda.",
    roleplay: {
      partner: "Valeria",
      opener: "There's someone I haven't spoken to in six years, and I still don't know why. Is there anyone like that for you?",
    },
    checklist: [
      "La historia tiene dos pisos y el had está solo donde hace falta",
      "Usé used to para lo que ya no hago, y usually para lo que hago ahora",
      "Metí un would de recuerdo, y con una acción, no con un estado",
      "La carta cumple las dos funciones: cuenta algo y propone algo",
      "Las 120 palabras están mandadas y hay respuesta",
    ],
  },

  enb1m11: {
    phaseId: "enb1m11",
    title: "La postura que se te movió",
    canDo: "Puedo defender una opinión sobre un asunto social, discrepar sin ofender y conceder un punto (CEFR B1: Spoken Part 3, gerundio e infinitivo, y el registro de la norma).",
    outcome: "Tu postura sobre algo que te importa, escrita dos veces: antes del debate y después, con el punto que concediste subrayado. Y detrás, quince minutos de debate de verdad con otra persona.",
    prep: [
      { text: "I enjoy living here, but there are rules.", es: "Me gusta vivir aquí, pero hay normas. (enjoy siempre con -ing, y no hay regla que lo explique: es reparto léxico)" },
      { text: "They keep putting bags in the hallway.", es: "No paran de dejar bolsas en el portal. (keep + -ing)" },
      { text: "They agreed to look into it.", es: "Aceptaron mirárselo. (agree + to; y look into es la palabra que quieres que use el ayuntamiento)" },
      { text: "You're not meant to park there.", es: "Ahí no se puede aparcar. (be meant to describe la norma sin acusar a nadie: es lo que de verdad se dice)" },
      { text: "I came here to study English.", es: "Vine aquí para estudiar inglés. (to + VERBO, for + SUSTANTIVO: la regla de bolsillo más rentable del año)" },
      { text: "It isn't fair that some of us pay twice.", es: "No es justo que algunos paguemos dos veces. (el inglés no deja el hueco del sujeto vacío: ese «it» va siempre)" },
      { text: "I'm afraid I disagree, but I see what you mean.", es: "Me temo que no estoy de acuerdo, pero entiendo lo que dices. (I disagree a secas suena bordo, y el registro puntúa aparte)" },
      { text: "How about meeting halfway?", es: "¿Y si nos vemos a medio camino? (detrás de how about, -ing; y proponer un término medio es exactamente lo que el examen exige)" },
    ],
    steps: [
      "Elige un asunto real que te enfrente a alguien de tu vida: el ruido, el reparto de una casa, una norma del trabajo, algo del barrio, la polémica de siempre del grupo.",
      "Escribe tu postura ANTES, en cinco líneas: qué crees, por qué, y qué pides. Guárdala sin volver a tocarla.",
      "Busca los argumentos del otro lado en inglés, y busca los BUENOS, no los tontos: un artículo, un hilo, un vídeo de alguien que piensa lo contrario. Apunta los dos que más te cueste rebatir.",
      "Debate quince minutos con una persona de verdad. En inglés si podéis; si no, en tu idioma pero con las fórmulas inglesas delante: I see what you mean, but… · You've got a point… · How about…?",
      "Escribe tu postura DESPUÉS y subraya el punto que concediste. Si no hay ninguno, no era un debate: era un turno de palabra.",
    ],
    world: "El debate real puede ser con quien quieras y sobre lo que quieras, con una condición: que no dé igual. Y si vas a discutirlo de todas formas esta semana, prepáralo en inglés y tenlo en tu idioma — llegarás con los argumentos ordenados y con la concesión ya pensada, que es la mitad de ganar una conversación.",
    home: "Debate contigo mismo con dos sillas: en una defiendes tu postura, en la otra la del contrario, y en cada cambio de silla tienes que empezar por conceder algo de lo anterior. Grábate las dos voces. Casi siempre argumenta mejor la silla que no es la tuya, y ahí está el trabajo.",
    roleplay: {
      partner: "Nora",
      opener: "Now, I've lived in this building forty years, and those bags have never been left in the hallway. It isn't fair on the rest of us, is it?",
    },
    checklist: [
      "Tengo mi postura escrita ANTES, sin retocar",
      "Busqué los dos mejores argumentos del otro lado, no los peores",
      "Repartí bien los dos montones: enjoy y keep con -ing, agree y decide con to",
      "Discrepé envolviendo: I'm afraid I disagree… / I see what you mean, but…",
      "Hay una postura DESPUÉS, con el punto concedido subrayado",
    ],
  },

  enb1m12: {
    phaseId: "enb1m12",
    title: "El ensayo general del B1",
    canDo: "Puedo hacer el oral completo del LanguageCert B1 Achiever: dar datos y opiniones, resolver dos situaciones sociales, discutir hasta un acuerdo y hablar minuto y medio seguido (CEFR B1: las cuatro partes del Spoken).",
    outcome: "Los doce minutos del Spoken hechos de una sentada con reloj, las cuatro partes seguidas y sin una palabra de español — y la fecha, la sede y el precio del LanguageCert B1 Achiever apuntados, con la versión en línea mirada.",
    prep: [
      { text: "My surname is Soto: S-O-T-O.", es: "Mi apellido es Soto: ese-o-te-o. (deletrear es lo PRIMERO que te piden, y se falla por no haberlo ensayado nunca)" },
      { text: "Personally, I think schools should do more.", es: "Personalmente, creo que los colegios deberían hacer más. (en B1 la Parte 1 ya no pide datos: pide opinión con su porqué)" },
      { text: "Excuse me, I'm afraid there's a problem with my order.", es: "Perdone, me temo que hay un problema con mi pedido. (así EMPIEZAS tú una de las dos situaciones — el sitio donde se cae medio mundo)" },
      { text: "Could we make it a bit later?", es: "¿Podríamos dejarlo un poco más tarde?" },
      { text: "So you're saying we should meet at six?", es: "O sea, que dices que quedemos a las seis, ¿no? (repetir lo entendido puntúa en Task Fulfilment: el examen lo pide con esas palabras)" },
      { text: "Shall we say the first one, then? So we're agreed.", es: "¿Nos quedamos con el primero, entonces? Entonces estamos de acuerdo. (la Parte 3 exige literalmente un intento de acuerdo)" },
      { text: "First of all… what's more… on the other hand… all in all…", es: "Lo primero… es más… por otro lado… en conjunto… (la partitura del minuto y medio: el B1 oral no premia la frase difícil, premia encadenar)" },
      { text: "Hang on, let me think.", es: "Espera, déjame pensar. (así se gana tiempo sin quedarse en blanco, y no resta)" },
    ],
    steps: [
      "Monta la escena: mesa despejada, reloj a la vista, doce minutos y alguien leyendo las preguntas. Tres minutos por parte y sin pausas entre ellas.",
      "Parte 1: deletrea tu apellido, di de dónde eres y contesta cinco preguntas de cinco bloques distintos. En B1 los datos solos no valen: cada respuesta lleva una opinión y su porqué.",
      "Parte 2: DOS situaciones. En una contestas tú; en la otra EMPIEZAS TÚ. Dos turnos cada una, y el registro decide tanto como la gramática.",
      "Parte 3: una discusión con apoyo visual —cuatro imágenes de tu galería valen— y un intento de acuerdo al final. Sin ese intento, la parte está incompleta aunque hayas hablado mucho.",
      "Parte 4: treinta segundos de notas —tres palabras clave, no frases— y minuto y medio hablando con la partitura de conectores. Después, cuatro preguntas de seguimiento.",
      "Al terminar, busca fecha, sede y precio del LanguageCert B1 Achiever en tu país, y mira si hay versión en línea. Esa cita apuntada es el resultado de la misión.",
    ],
    world: "Hazlo con una persona real —otro estudiante vale oro aquí— sin pausar y con reloj. Si puedes, grábalo en vídeo: verse hablando es incómodo y es lo que más corrige la Parte 4. Y el examen se graba de verdad y lo corrige alguien que no te conoce, así que acostumbrarse a la cámara no es capricho.",
    home: "El examen entero con alguien que lea las preguntas y el móvil grabando. Al terminar, escúchate con los cuatro criterios delante —tarea y coherencia, gramática, vocabulario y registro, pronunciación y fluidez— y ponte una nota de 0 a 3 en cada uno. Repite después solo la Parte 4: la segunda vez sale siempre mejor, y esa mejora es la nota que te faltaba.",
    roleplay: {
      partner: "La examinadora",
      opener: "Good morning. I'm your examiner today. Could you tell me your full name, and spell your surname for me, please?",
    },
    checklist: [
      "Aguanté los doce minutos seguidos, con reloj y sin una palabra de español",
      "Deletreé mi apellido y di opinión con su porqué en la Parte 1",
      "En la Parte 2 empecé yo una de las dos situaciones",
      "En la Parte 3 repetí lo entendido y llegamos a un acuerdo explícito",
      "Hablé minuto y medio encadenado en la Parte 4, y tengo fecha, sede y precio apuntados",
    ],
  },
};
