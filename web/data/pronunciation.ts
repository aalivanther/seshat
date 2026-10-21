// Tabla de pronunciación del curso — grafema → «suena como» para hispanohablantes.

export interface SoundRule {
  grapheme: string;
  sound: string; // "suena como" para hispanohablante
  examples: string; // palabras del curso
}

export const soundRules: SoundRule[] = [
  { grapheme: "ß", sound: "ss (s fuerte)", examples: "heiße, Fuß, dreißig, Straße" },
  { grapheme: "ü", sound: "di «i» con boca de «u»", examples: "müde, fünf, Tschüss, Züge" },
  { grapheme: "ö", sound: "di «e» con boca de «o»", examples: "Köchin, möchte, hören, öffnen" },
  { grapheme: "ä", sound: "e abierta", examples: "Mädchen, fährst, Ärztin, Getränke" },
  { grapheme: "ei", sound: "«ai» (como baile)", examples: "heißen, drei, mein, Ei" },
  { grapheme: "ie", sound: "«i» larga", examples: "vier, sieben, Liebe, spielen" },
  { grapheme: "au", sound: "«au» (como pausa)", examples: "Haus, Frau, kaufen, Bauch" },
  { grapheme: "eu / äu", sound: "«oi» (como oigo)", examples: "Europa, teuer, Häuser, Verkäufer, neun" },
  { grapheme: "h inicial", sound: "aspirada suave (como j andaluza)", examples: "Hund, Haus, haben, hallo" },
  { grapheme: "h tras vocal", sound: "muda — alarga la vocal", examples: "wohnen, Schuhe, zehn, fahren" },
  { grapheme: "v", sound: "«f»", examples: "Vogel, viel, vier, Vater" },
  { grapheme: "w", sound: "«v» (labios con dientes)", examples: "Wasser, wohnen, wer, schwimmen" },
  { grapheme: "z", sound: "«ts»", examples: "Zucker, Zeit, zahlen, Zug" },
  { grapheme: "j", sound: "«y» (como yo)", examples: "ja, Jahr, Januar, jung" },
  { grapheme: "s + vocal", sound: "«z» zumbada (abeja)", examples: "sieben, Sonntag, lesen, Suppe" },
  { grapheme: "ch tras a/o/u/au", sound: "«j» fuerte (como jota)", examples: "acht, machen, noch, Buch, auch, Bauch" },
  { grapheme: "ch tras e/i", sound: "«j» suave (casi sh)", examples: "ich, nicht, sprechen, Küche" },
  { grapheme: "sch", sound: "«sh»", examples: "schön, schreiben, Tisch, schwimmen" },
  { grapheme: "st / sp inicial", sound: "«sht» / «shp»", examples: "Stunde, Straße, sprechen, spät" },
  { grapheme: "-er final", sound: "«a» relajada", examples: "Mutter, Wasser, Lehrer, aber" },
  { grapheme: "-ig final", sound: "«ij» (j suave)", examples: "billig, richtig, zwanzig, günstig" },
  { grapheme: "-tion", sound: "«tsión»", examples: "Information, Situation" },
];
