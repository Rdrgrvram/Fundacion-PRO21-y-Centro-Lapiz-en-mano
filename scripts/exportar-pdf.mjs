// Exporta los documentos de entrega (docs/entrega/*.md) a PDF con Chromium de Playwright.
// Uso: npm run docs:pdf  (opcional: node scripts/exportar-pdf.mjs MANUAL-CMS)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { chromium } from '@playwright/test';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirEntrega = path.join(raiz, 'docs', 'entrega');
const dirSalida = path.join(dirEntrega, 'pdf');
// REUNION-FINAL.md es interno del equipo: no se exporta.
const DOCUMENTOS = ['MANUAL-CMS', 'MANUAL-ADMIN', 'GUIA-DOMINIO', 'GUIA-DESPLIEGUE', 'ACTA-ENTREGA'];

const procesador = remark().use(remarkHtml);
const md2html = (t) => String(procesador.processSync(t));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Sin remark-gfm: las tablas se convierten aparte; las casillas "[ ]" se sustituyen por símbolos.
const celdas = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
const inline = (t) => md2html(t).replace(/^<p>/, '').replace(/<\/p>\s*$/, '').trim();

function tablaHtml(lineas) {
  const cab = celdas(lineas[0]);
  const alin = celdas(lineas[1]).map((a) => (/^:-+:$/.test(a) ? 'center' : /-+:$/.test(a) ? 'right' : 'left'));
  const vacia = cab.every((c) => c === '');
  const filas = lineas.slice(2).map(celdas);
  const th = vacia ? '' : `<thead><tr>${cab.map((c, i) => `<th style="text-align:${alin[i]}">${inline(c)}</th>`).join('')}</tr></thead>`;
  const tb = filas.map((f) => `<tr>${f.map((c, i) => `<td style="text-align:${alin[i] || 'left'}">${inline(c)}</td>`).join('')}</tr>`).join('');
  return `<table>${th}<tbody>${tb}</tbody></table>`;
}

function convertir(md) {
  const lineas = md.replace(/\r\n/g, '\n').split('\n');
  const tablas = [];
  const salida = [];
  let enCodigo = false;
  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i];
    if (/^\s*(```|~~~)/.test(l)) enCodigo = !enCodigo;
    if (!enCodigo && /^\s*\|/.test(l) && /^\s*\|?\s*:?-{3,}/.test(lineas[i + 1] || '')) {
      const bloque = [];
      while (i < lineas.length && /^\s*\|/.test(lineas[i])) bloque.push(lineas[i++]);
      i--;
      salida.push('', `TABLAMARCA${tablas.push(tablaHtml(bloque)) - 1}FIN`, '');
    } else salida.push(l);
  }
  let html = md2html(salida.join('\n'));
  html = html.replace(/<p>TABLAMARCA(\d+)FIN<\/p>/g, (_, n) => tablas[n]);
  // Casillas de tarea sin GFM
  html = html.replace(/<li>\[ \]\s*/g, '<li class="tarea">&#9744; ').replace(/<li>\[[xX]\]\s*/g, '<li class="tarea">&#9745; ');
  return html;
}

const CSS = `
@page { size: A4; }
* { box-sizing: border-box; }
body { font-family: "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", "Segoe UI Emoji", "Apple Color Emoji", sans-serif; font-size: 11pt; line-height: 1.5; color: #1a1a1a; margin: 0; }
h1, h2, h3, h4 { color: #166e8a; line-height: 1.25; break-after: avoid; }
h2 { font-size: 15pt; margin: 18pt 0 6pt; }
h3 { font-size: 12.5pt; margin: 14pt 0 4pt; }
h4 { font-size: 11pt; margin: 10pt 0 3pt; }
p { margin: 0 0 7pt; orphans: 3; widows: 3; }
ul, ol { margin: 0 0 8pt; padding-left: 20pt; }
li { margin-bottom: 2pt; }
ul.corta, ol.corta { break-inside: avoid; }
li.tarea { list-style: none; margin-left: -16pt; }
a { color: #166e8a; text-decoration: none; }
hr { border: 0; border-top: 1px solid #d0d0d0; margin: 12pt 0; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt; font-size: 10pt; break-inside: avoid; }
table.larga { break-inside: auto; }
tr { break-inside: avoid; }
thead { display: table-header-group; }
th, td { border: 0.5pt solid #b8b8b8; padding: 4pt 6pt; vertical-align: top; }
th { background: #e6f1f5; color: #0f4c5f; }
code { font-family: Consolas, "Courier New", monospace; font-size: 9.5pt; background: #f1f1f1; padding: 0 3pt; border-radius: 2pt; }
pre { background: #f1f1f1; border: 0.5pt solid #dcdcdc; padding: 8pt; border-radius: 3pt; white-space: pre-wrap; word-break: break-word; break-inside: avoid; margin: 6pt 0 10pt; }
pre code { background: none; padding: 0; }
blockquote { margin: 8pt 0; padding: 4pt 12pt; border-left: 4px solid #ffc500; background: #fffbea; break-inside: avoid; }
blockquote p:last-child { margin-bottom: 0; }
.portada { height: 255mm; display: flex; flex-direction: column; justify-content: center; break-after: page; border-left: 8px solid #ffc500; padding-left: 24pt; }
.portada h1 { font-size: 30pt; margin: 0 0 18pt; }
.portada .org { font-size: 15pt; font-weight: 600; }
.portada .sub { font-size: 12pt; color: #555; margin-top: 4pt; }
.portada .fecha { font-size: 11pt; color: #555; margin-top: 28pt; }
`;

function pagina(titulo, cuerpo, fecha) {
  // Quita el primer <h1> (va en la portada) y marca listas/tablas cortas
  cuerpo = cuerpo.replace(/<h1>[\s\S]*?<\/h1>/, '');
  cuerpo = cuerpo.replace(/<(ul|ol)>([\s\S]*?)<\/\1>/g, (m, t, c) => ((c.match(/<li/g) || []).length <= 6 ? `<${t} class="corta">${c}</${t}>` : m));
  cuerpo = cuerpo.replace(/<table>([\s\S]*?)<\/table>/g, (m, c) => ((c.match(/<tr/g) || []).length > 8 ? `<table class="larga">${c}</table>` : m));
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(titulo)}</title><style>${CSS}</style></head><body>
<section class="portada"><h1>${esc(titulo)}</h1><div class="org">Fundación PRO-21 y Centro Lápiz en Mano</div><div class="sub">Proyecto Social UCB</div><div class="fecha">Generado el ${fecha}</div></section>
${cuerpo}</body></html>`;
}

const fecha = new Date().toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/La_Paz' });
const filtro = process.argv.slice(2).map((a) => a.replace(/\.md$/, ''));
const lista = filtro.length ? DOCUMENTOS.filter((d) => filtro.includes(d)) : DOCUMENTOS;

await mkdir(dirSalida, { recursive: true });
const navegador = await chromium.launch();
try {
  for (const nombre of lista) {
    const md = await readFile(path.join(dirEntrega, `${nombre}.md`), 'utf8');
    const titulo = (md.match(/^# (.+)$/m) || [null, nombre])[1].trim();
    const html = pagina(titulo, convertir(md), fecha);
    if (process.env.PDF_DEBUG_HTML) await writeFile(path.join(process.env.PDF_DEBUG_HTML, `${nombre}.html`), html);
    const page = await navegador.newPage();
    await page.setContent(html, { waitUntil: 'load' });
    const destino = path.join(dirSalida, `${nombre}.pdf`);
    await page.pdf({
      path: destino, format: 'A4', printBackground: true,
      margin: { top: '18mm', right: '18mm', bottom: '18mm', left: '18mm' },
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font-size:8px;color:#666;font-family:Arial,sans-serif;padding:0 18mm;display:flex;justify-content:space-between"><span>${esc(titulo)}</span><span>Página <span class="pageNumber"></span> de <span class="totalPages"></span></span></div>`,
    });
    await page.close();
    console.log(`OK ${path.relative(raiz, destino)}`);
  }
} finally {
  await navegador.close();
}
