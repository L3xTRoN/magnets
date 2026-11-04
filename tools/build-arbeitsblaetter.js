#!/usr/bin/env node
/* Erzeugt ap1/arbeitsblaetter.js aus arbeitsblaetter.html (nur vorhandene Inhalte, nichts dazuerfunden).
   Aufruf im Repo-Ordner:  node tools/build-arbeitsblaetter.js */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'arbeitsblaetter.html'), 'utf8');
let js = html.slice(html.lastIndexOf('<script>') + 8);
js = js.slice(0, js.indexOf('/* ================= Ablauf'));
const stub = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : stub });
const ctx = { Math, document: new Proxy({}, { get: () => stub }) };
vm.createContext(ctx); vm.runInContext(js + ';globalThis.__S = SHEETS;', ctx);
const ent = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
function toText(h) {
  let s = String(h || '').replace(/<svg[\s\S]*?<\/svg>/gi, '').replace(/<div class="pic">[\s\S]*?<\/div>/gi, '');
  s = s.replace(/<b class="h">Merksatz<\/b>/gi, '\nMerksatz: ').replace(/<\/?(b|strong)[^>]*>/gi, '**');
  s = s.replace(/<li[^>]*>/gi, '\n- ').replace(/<\/li>/gi, '').replace(/<tr[^>]*>/gi, '\n- ').replace(/<\/t[dh]>\s*<t[dh][^>]*>/gi, ' · ');
  s = s.replace(/<sub>(.*?)<\/sub>/gi, '$1').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|ol|ul|table)>/gi, '\n').replace(/<[^>]+>/g, '');
  s = ent(s).replace(/\*\*\s*\*\*/g, '').replace(/[ \t]+/g, ' ');
  return s.split('\n').map(l => l.trim()).filter(l => l && l !== '-').join('\n');
}
const LF = { b51: 1, b53: 1, b55: 1, b59: 1, praefix: 1, tafel: 5, b135: 5, b136: 5 };
const out = [];
ctx.__S.forEach(sh => {
  const lf = LF[sh.id]; if (!lf) return;
  const lessons = sh.steps.filter(s => s.t === 'L');
  const items = sh.steps.filter(s => s.t === 'Q').map(st => ({
    q: (st.q.length < 25 && st.orig !== st.q ? st.orig + ' – ' + st.q : st.q),
    a: [st.right, ...st.wrong],
    e: st.why + (st.write ? '\nSo steht es im Arbeitsblatt: ' + st.write : ''),
  }));
  out.push({ lf, topic: {
    id: 'ab-' + sh.id,
    title: (/^\d/.test(sh.nr) ? 'Arbeitsblatt ' + sh.nr + ': ' : '') + sh.title,
    source: 'Aus deinen Arbeitsblättern',
    sheet: lessons.map(l => '## ' + l.title + '\n' + toText(l.html)).join('\n'),
    items } });
});
fs.writeFileSync(path.join(root, 'ap1', 'arbeitsblaetter.js'),
  '/* Automatisch erzeugt durch tools/build-arbeitsblaetter.js aus arbeitsblaetter.html. */\n' +
  out.map(o => 'LT.addTopic(' + o.lf + ', ' + JSON.stringify(o.topic) + ');').join('\n') + '\n');
console.log(out.length + ' Themen, ' + out.reduce((n, o) => n + o.topic.items.length, 0) + ' Fragen');
