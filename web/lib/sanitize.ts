// Sanitizador mínimo para las notas de gramática (contenido local confiable,
// pero defensa en profundidad no cuesta): sobreviven <b>, <i>, <u>, <mark>
// (con clase de caso akk/dat), <br/> y el <u data-g="..."> que generan las
// glosas audibles [[wort|glosa]].
export function sanitizeNoteHtml(html: string): string {
  return html
    .replace(/<(?!\/?(b|i|u|mark|br)(\s+(class="(akk|dat)"|data-g="[^"<>]*"))?\s*\/?>)[^>]*>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "");
}

/** [[wort|glosa]] → <u data-g="glosa">wort</u> (subrayado tocable que suena) */
export function glossify(html: string): string {
  return html.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_m, w: string, g: string) => {
    const safe = g.replace(/"/g, "&quot;").replace(/</g, "&lt;");
    return `<u data-g="${safe}">${w}</u>`;
  });
}
