#!/usr/bin/env node
/* Übernimmt die Aufgaben aus deinem alten „IE-Lerntrainer“ (HTML-Datei) in die App.
   Aufruf: node tools/build-eigene.js <Pfad zu IE-Lerntrainer.html>
   - Politik und Wirtschaft werden weggelassen.
   - Formfehler werden gemeldet, betroffene Aufgaben ausgelassen.
   - Fachliche Hinweise (FIX) werden an die Erklärung angehängt. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const src = process.argv[2]; if (!src) { console.error('Pfad zur HTML-Datei fehlt'); process.exit(1); }
const lines = fs.readFileSync(src, 'utf8').split('\n');
const dline = lines.find(l => l.startsWith('const DATA='));
const D = JSON.parse(dline.replace(/^const DATA=/, '').replace(/;\s*$/, ''));
/* Abbildungen aus dem Original-Skript rendern */
const sIdx = lines.findIndex((l, i) => i > lines.indexOf(dline) && l.startsWith('function esc'));
const eIdx = lines.findIndex((l, i) => i > sIdx && l.startsWith('function preHTML'));
const ctx = {}; vm.createContext(ctx); vm.runInContext(lines.slice(sIdx, eIdx).join('\n') + '\n;globalThis.__F = FIG;', ctx);
const FIG = {}; for (const k of Object.keys(ctx.__F)) { try { FIG[k] = ctx.__F[k](); } catch (e) { console.warn('Abbildung', k, e.message); } }
const FIX = fs.existsSync(path.join(__dirname, 'eigene-hinweise.json')) ? JSON.parse(fs.readFileSync(path.join(__dirname, 'eigene-hinweise.json'), 'utf8')) : {};
const SKIP_LF = ['Politik', 'Wirtschaft'];
/* Topologie-Bilder (fehlten im alten Lerntrainer, dort stand nur „§bus“ usw.) */
const TOPONAME = { bus: 'Bild: alle Geräte an einer gemeinsamen Leitung', stern: 'Bild: alle Geräte an einem zentralen Knoten', ring: 'Bild: Geräte im geschlossenen Kreis' };
const node = (x, y) => `<rect x="${x - 9}" y="${y - 7}" width="18" height="14" rx="2" fill="var(--card)" stroke="var(--ink)" stroke-width="2"/>`;
const TOPO = k => {
  let s = '';
  if (k === 'bus') { s = '<path d="M10 40H150" stroke="var(--ink)" stroke-width="3"/>' + [30, 60, 90, 120].map((x, i) => `<path d="M${x} 40V${i % 2 ? 58 : 22}" stroke="var(--ink)" stroke-width="2"/>` + node(x, i % 2 ? 62 : 18)).join(''); }
  else if (k === 'stern') { const pts = [[80, 12], [140, 40], [80, 68], [20, 40], [124, 64], [36, 16]]; s = pts.map(([x, y]) => `<path d="M80 40L${x} ${y}" stroke="var(--ink)" stroke-width="2"/>`).join('') + '<circle cx="80" cy="40" r="9" fill="var(--accent)"/>' + pts.map(([x, y]) => node(x, y)).join(''); }
  else if (k === 'ring') { s = '<ellipse cx="80" cy="40" rx="55" ry="26" fill="none" stroke="var(--ink)" stroke-width="2"/>' + [[80, 14], [135, 40], [80, 66], [25, 40]].map(([x, y]) => node(x, y)).join(''); }
  return `<svg viewBox="0 0 160 80" width="150" role="img" aria-label="${TOPONAME[k] || k}">${s}</svg>`;
};
const lfs = [], topics = [], problems = [];
let n = 100;
const groupOf = y => y.label;
D.Y.forEach(y => y.lfs.forEach(l => {
  if (SKIP_LF.includes(l.lf)) return;
  const id = ++n;
  lfs.push({ n: id, group: y.label, title: (/^LF/.test(l.lf) ? l.lf + ' · ' : '') + l.name, short: /^LF/.test(l.lf) ? 'Deine ' + l.lf : l.name, src: l.src });
  l.topics.forEach(t => {
    const items = [];
    D.Q.filter(q => q.topic === t).forEach(q => {
      const base = { q: q.q, e: (q.exp || '') + (FIX[q.id] ? '\n\nHinweis: ' + FIX[q.id] : ''), lead: q.lead || '', pre: q.pre || '', fig: q.fig ? FIG[q.fig] || '' : '', src: q.src, oid: q.id, warn: !!FIX[q.id] };
      if (q.t === 'mc' && !q.multi && q.ans.length === 1) {
        if (!(q.ans[0] >= 0 && q.ans[0] < q.opts.length)) { problems.push(q.id + ': richtige Antwort fehlt'); return; }
        const a = [q.opts[q.ans[0]], ...q.opts.filter((_, i) => i !== q.ans[0])];
        const it = Object.assign(base, { a });
        if (q.shuffle === false) it.fixed = q.opts.map((o, i) => i === q.ans[0] ? 0 : (i < q.ans[0] ? i + 1 : i));
        items.push(it);
      } else if (q.t === 'mc') {
        if (!q.ans.every(i => i >= 0 && i < q.opts.length)) { problems.push(q.id + ': Antwortindex'); return; }
        items.push(Object.assign(base, { kind: 'multi', opts: q.opts, ans: q.ans, noshuf: q.shuffle === false }));
      } else if (q.t === 'match') {
        if (q.rows.length !== q.ans.length || !q.ans.every(a => q.choices.includes(a))) { problems.push(q.id + ': Zuordnung unvollständig'); return; }
        const esc = x => String(x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
        const rows = q.rows.map(r => r.startsWith('§') ? TOPO(r.slice(1)) : esc(r));
        items.push(Object.assign(base, { kind: 'match', rows, rowsHtml: true, rowsText: q.rows.map(r => r.startsWith('§') ? TOPONAME[r.slice(1)] || r : r), ans: q.ans, choices: q.choices }));
      } else if (q.t === 'gap') {
        const cnt = (q.q.match(/\[\[\d+\]\]/g) || []).length;
        if (cnt !== q.gaps.length || q.gaps.some(g => g.text ? !(g.ans && g.ans.length) : !(g.opts && g.opts.includes(g.ans)))) { problems.push(q.id + ': Lücke fehlerhaft'); return; }
        items.push(Object.assign(base, { kind: 'gap', gaps: q.gaps }));
      } else if (q.t === 'short') {
        if (!q.ans || !q.ans.length) { problems.push(q.id + ': Lösung fehlt'); return; }
        items.push(Object.assign(base, { kind: 'short', ans: q.ans, show: q.show || q.ans[0] }));
      } else problems.push(q.id + ': unbekannter Typ ' + q.t);
    });
    topics.push({ id: 'ie-' + t, lf: id, title: D.T[t] || t, html: (D.M[t] || '').replace(/<script[\s\S]*?<\/script>/gi, ''), source: 'Dein IE-Lerntrainer', items });
  });
}));
const out = '/* Automatisch erzeugt durch tools/build-eigene.js aus deinem IE-Lerntrainer. */\nLT.ownImport(' + JSON.stringify({ lfs, topics }) + ');\n';
fs.writeFileSync(path.join(__dirname, '..', 'ap1', 'eigene.js'), out);
console.log(lfs.length + ' Bereiche, ' + topics.length + ' Themen, ' + topics.reduce((a, t) => a + t.items.length, 0) + ' Aufgaben, Abbildungen: ' + Object.keys(FIG).length);
console.log('Ausgelassen wegen Formfehler: ' + problems.length); problems.forEach(p => console.log('  ' + p));
console.log('Fachliche Hinweise angehängt: ' + Object.keys(FIX).length);
