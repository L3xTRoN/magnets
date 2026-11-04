/* Prüfungstrainer Teil 1 – Logik.
   Daten bleiben im Browser (localStorage). Keine Server, keine externen Dienste. */
'use strict';
const LT = window.LT = { topics: [], items: new Map(), byTopic: new Map() };

/* ---------- Lernfelder laut KMK-Rahmenlehrplan vom 18.12.2020 ---------- */
LT.LF = [
  { n: 1, year: 1, h: 80, title: 'Elektrotechnische Systeme analysieren, Funktionen prüfen und Fehler beheben', core: 'auftragsbezogen elektrotechnische Systeme zu analysieren, Funktionen zu prüfen und Fehler zu beheben' },
  { n: 2, year: 1, h: 80, title: 'Elektrische Systeme planen und installieren', core: 'elektrische Systeme auftragsbezogen zu planen und zu installieren' },
  { n: 3, year: 1, h: 80, title: 'Steuerungen und Regelungen analysieren und realisieren', core: 'Steuerungen und Regelungen zu analysieren und zu realisieren' },
  { n: 4, year: 1, h: 80, title: 'Informationstechnische Systeme bereitstellen', core: 'informationstechnische Systeme zu analysieren, zu konfigurieren und bereitzustellen' },
  { n: 5, year: 2, h: 80, title: 'Elektroenergieversorgung und Sicherheit von Anlagen und Geräten konzipieren', core: 'die Elektroenergieversorgung und Sicherheit von Anlagen und Geräten zu konzipieren und zu prüfen' },
  { n: 6, year: 2, h: 80, title: 'Elektronische Bauelemente und Baugruppen analysieren und prüfen', core: 'die Funktion von elektronischen Bauelementen und Baugruppen von Geräten und Anlagen der Informations- und Kommunikationstechnik zu analysieren und zu prüfen' },
  { n: 7, year: 2, h: 60, title: 'Computersysteme konfigurieren und einrichten', core: 'Computersysteme kundengerecht unter Berücksichtigung von Datensicherheit und Datenschutz zu konfigurieren und einzurichten' },
  { n: 8, year: 2, h: 60, title: 'Vernetzte Systeme installieren, erweitern und administrieren', core: 'vernetzte Systeme zu installieren, zu erweitern und zu administrieren' },
  { n: 9, year: 3, h: 100, title: 'Anwenderspezifische Systeme auswählen und integrieren', note: 'u. a. Gefahrenmeldeanlagen und intelligente Gebäudetechnik', core: 'anwenderspezifische Systeme auszuwählen und zu integrieren' },
  { n: 10, year: 3, h: 100, title: 'Informationstechnische Systeme programmieren', core: 'informationstechnische Systeme zu programmieren, Programme anzupassen sowie Datenbanken einzurichten und zu verwalten' },
  { n: 11, year: 3, h: 80, title: 'Kommunikationssysteme planen und realisieren', core: 'Kommunikationssysteme zu planen und zu realisieren' },
  { n: 12, year: 4, h: 80, title: 'Multimedia- und serverbasierte Systeme einrichten und administrieren', core: 'multimedia- und serverbasierte Systeme zu planen, einzurichten und zu administrieren' },
  { n: 13, year: 4, h: 60, title: 'Komplexe Informationssysteme ändern und instand halten', core: 'an komplexen informationstechnischen Systemen Änderungs- und Instandhaltungsmaßnahmen zu planen und durchzuführen' },
  { n: 20, own: true, group: 'Arbeitsblätter (Magnetismus, Transformator)', title: 'Deine Arbeitsblätter', short: 'Arbeitsblätter' },

];
LT.AP1 = [1, 2, 3, 4, 5, 6];
LT.AP2 = [7, 8, 9, 10, 11, 12, 13];
LT.OWN = [20];
LT.ownKmk = { 20: 5 };
LT.ownImport = d => { d.lfs.forEach(L => { LT.LF.push(Object.assign({ own: true }, L)); LT.OWN.push(L.n); const m = /^LF (\d+)/.exec(L.title); if (m) LT.ownKmk[L.n] = +m[1]; }); d.topics.forEach(t => LT.addTopic(t.lf, t)); };
const lfById = n => LT.LF.find(L => L.n === n);
const lfName = n => { const L = lfById(n); return L && L.own ? L.short : 'LF ' + n; };
LT.ext = { routes: [], acts: {}, after: [], games: [] };

/* ---------- Inhalte registrieren ---------- */
function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
function addTopic(lf, t) {
  const topic = { id: t.id, lf, title: t.title, source: t.source || '', sheet: Array.isArray(t.sheet) ? t.sheet.join('\n') : (t.sheet || ''), html: t.html || '', ids: [] };
  LT.topics.push(topic); LT.byTopic.set(topic.id, topic);
  (t.items || []).forEach(it => {
    if (!it.q || (!it.kind && (!it.a || it.a.length < 2))) return;
    let id = topic.id + '-' + (it.oid || hash(it.q)); while (LT.items.has(id)) id += 'x';
    LT.items.set(id, Object.assign({}, it, { id, topic: topic.id, lf, e: it.e || '' }));
    topic.ids.push(id);
  });
}
LT.addTopic = addTopic;
LT.lf = (n, text) => {
  let cur = null;
  const flush = () => { if (cur) addTopic(n, cur); };
  text.split('\n').forEach(raw => {
    const l = raw.trim();
    if (!l || l.startsWith('#')) return;
    if (l.startsWith('@ ')) { flush(); const [id, title] = l.slice(2).split('|').map(s => s.trim()); cur = { id: 'lf' + n + '-' + id, title, sheet: [], items: [] }; return; }
    if (!cur) return;
    if (l === '=' || l.startsWith('= ')) { cur.sheet.push(l.slice(2)); return; }
    if (l.startsWith('Q ')) {
      const [main, e] = l.slice(2).split(' || ');
      const p = main.split(' | ').map(s => s.trim());
      cur.items.push({ q: p[0], a: p.slice(1), e: (e || '').trim() });
    }
  });
  flush();
};

/* ---------- Hilfen ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const dkey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const pkey = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (k, n) => { const d = pkey(k); d.setDate(d.getDate() + n); return dkey(d); };
const diffDays = (a, b) => Math.round((pkey(b) - pkey(a)) / 864e5);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const plural = (n, a, b) => n + ' ' + (n === 1 ? a : b);
function rich(src) {
  let out = '', list = false;
  const inl = t => esc(t).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  String(src || '').split('\n').forEach(raw => {
    const l = raw.trim(); let m;
    if (!l) { if (list) { out += '</ul>'; list = false; } return; }
    if ((m = l.match(/^#{1,3}\s+(.*)$/))) { if (list) { out += '</ul>'; list = false; } out += '<h3>' + inl(m[1]) + '</h3>'; return; }
    if ((m = l.match(/^[-•]\s+(.*)$/))) { if (!list) { out += '<ul>'; list = true; } out += '<li>' + inl(m[1]) + '</li>'; return; }
    if (list) { out += '</ul>'; list = false; }
    out += '<p>' + inl(l) + '</p>';
  });
  if (list) out += '</ul>';
  return out;
}
const multiline = s => esc(s).replace(/\n/g, '<br>');

/* ---------- Speicher ---------- */
const KEY = 'ap1-trainer-v1';
let S;
function fresh() { return { v: 1, p: {}, days: {}, settings: { name: '', goal: 20, exam: '', size: 15, target: 'ap1', adhs: false, tv: false, focusMin: 10, speak: true, mix: true }, session: null, last: null }; }
function load() {
  S = fresh();
  try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (d && typeof d === 'object') { S = Object.assign(fresh(), d); S.settings = Object.assign(fresh().settings, d.settings || {}); } } catch (e) { /* ohne Speicher weiter */ }
}
let saveWarned = false;
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { if (!saveWarned) { saveWarned = true; toast('Speichern im Browser ist nicht möglich. Dein Fortschritt geht beim Schließen verloren.'); } } }

/* ---------- Lernstufen (transparent) ----------
   Stufe 0–5. Richtig: höchstens einmal pro Tag eine Stufe höher. Falsch: zurück auf Stufe 0.
   Ab Stufe 3 gilt eine Frage als "sicher" (an 3 Tagen richtig, ohne Fehler dazwischen). */
const INT = [0, 1, 2, 4, 8, 16];
const SAFE = 3;
function grade(id, ok) {
  const t = dkey();
  const p = S.p[id] || { b: 0, n: 0, ok: 0, bad: 0 };
  p.n++;
  if (ok) { p.ok++; if (p.up !== t) { p.b = Math.min(5, p.b + 1); p.up = t; } p.d = addDays(t, INT[p.b]); p.lg = 1; }
  else { p.bad++; p.b = 0; p.up = ''; p.d = t; p.lg = 0; }
  p.l = t; S.p[id] = p;
  const day = S.days[t] || (S.days[t] = { n: 0, ok: 0 });
  day.n++; day.q = (day.q || 0) + 1; if (ok) day.ok++;
}
const stat = id => { const p = S.p[id]; return !p || !p.n ? 'neu' : p.b >= SAFE ? 'sicher' : 'arbeit'; };
const isDue = id => { const p = S.p[id]; return !!(p && p.n && p.d <= dkey()); };
function summary(ids) {
  let neu = 0, arbeit = 0, sicher = 0, score = 0;
  ids.forEach(id => { const s = stat(id); if (s === 'neu') neu++; else if (s === 'sicher') sicher++; else arbeit++; score += Math.min(SAFE, (S.p[id] || {}).b || 0); });
  return { neu, arbeit, sicher, total: ids.length, ready: ids.length ? Math.round(score / (SAFE * ids.length) * 100) : 0 };
}
const TARGETS = {
  ap1: { label: 'Abschlussprüfung Teil 1', short: 'Teil 1 · LF 1–6', lfs: () => LT.AP1 },
  ap2: { label: 'Abschlussprüfung Teil 2', short: 'Teil 2 · LF 7–13', lfs: () => LT.AP2 },
  alle: { label: 'Ganze Ausbildung', short: 'LF 1–13', lfs: () => [...LT.AP1, ...LT.AP2] },
};
const tgt = () => TARGETS[S.settings.target] || TARGETS.ap1;
const mixOn = () => S.settings.mix !== false;
/* Themen eines Lernfelds; bei „gemischt“ inkl. deiner Unterlagen zu diesem Lernfeld */
const topicsOf = n => { const base = LT.topics.filter(t => t.lf === n); return (!mixOn() || n > 13) ? base : base.concat(LT.topics.filter(t => LT.ownKmk[t.lf] === n)); };
const lfIds = n => topicsOf(n).flatMap(t => t.ids);
const ap1Ids = () => [...new Set(tgt().lfs().flatMap(lfIds))];
function streak() {
  let k = dkey(), n = 0;
  if (!S.days[k]) k = addDays(k, -1);
  while (S.days[k]) { n++; k = addDays(k, -1); }
  return n;
}

/* ---------- Sitzungen ---------- */
const flagged = id => !!(S.flags && S.flags[id]);
function startSession(mode, ids, title, back) {
  ids = ids.filter(id => LT.items.has(id) && !flagged(id));
  if (!ids.length) { toast('Für diese Auswahl gibt es gerade keine Fragen.'); return; }
  const order = {};
  ids.forEach(id => { const it = LT.items.get(id); order[id] = it.fixed || (it.kind === 'multi' ? shuffle(it.opts.map((_, i) => i)) : it.kind === 'match' ? shuffle(it.choices.map((_, i) => i)) : it.kind ? null : shuffle(it.a.map((_, i) => i))); });
  S.session = { mode, ids, i: 0, res: [], order, title, back: back || 'start', again: [], started: Date.now(), answered: null };
  save(); go('sitzung');
}
function smartSet(pool, size) {
  const due = pool.filter(isDue).sort((a, b) => (S.p[a].b - S.p[b].b) || (S.p[a].d < S.p[b].d ? -1 : 1));
  const neu = pool.filter(id => stat(id) === 'neu');
  const rest = pool.filter(id => !due.includes(id) && !neu.includes(id) && stat(id) !== 'sicher');
  return [...due, ...neu, ...shuffle(rest)].slice(0, size);
}
function practiceSet(pool, size) {
  const by = s => pool.filter(id => stat(id) === s);
  return [...shuffle(by('arbeit')), ...by('neu'), ...shuffle(by('sicher'))].slice(0, size);
}
const wrongIds = () => ap1Ids().filter(id => S.p[id] && S.p[id].lg === 0);

/* ---------- Oberfläche ---------- */
const main = () => $('#main');
let toastTimer;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.hidden = true; }, 3800); }
function go(name) { if (location.hash !== '#' + name) location.hash = name; else render(); }
const TABS = [['start', 'Start'], ['lernfelder', 'Lernen'], ['ueben', 'Üben'], ['spiele', 'Spiele'], ['mehr', 'Mehr']];
function tabFor(r) {
  if (r.startsWith('lf-') || r.startsWith('thema-')) return 'lernfelder';
  if (r.startsWith('tool-') || r.startsWith('spiel') || r === 'werkstatt') return 'spiele';
  if (r === 'sitzung' || r === 'ergebnis' || r.startsWith('rechnen') || r === 'formeln' || r === 'mathe') return 'ueben';
  return r;
}

function bar(s) {
  const t = s.total || 1;
  return `<span class="bar" role="img" aria-label="${s.sicher} sicher, ${s.arbeit} in Arbeit, ${s.neu} neu"><i class="b-s" style="width:${s.sicher / t * 100}%"></i><i class="b-a" style="width:${s.arbeit / t * 100}%"></i></span>`;
}
function ring(p, label) {
  const r = 52, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 128 128" role="img" aria-label="${label}: ${p} Prozent"><circle cx="64" cy="64" r="${r}" class="ring-bg"/><circle cx="64" cy="64" r="${r}" class="ring-fg" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" transform="rotate(-90 64 64)"/><text x="64" y="62" class="ring-n">${p}%</text><text x="64" y="84" class="ring-l">Prüfungsreife</text></svg>`;
}
function lfShort(n) { return 'LF ' + n; }

function viewStart() {
  if (S.settings.adhs) return viewStartAdhs();
  const ids = ap1Ids(), s = summary(ids), due = ids.filter(isDue).length, t = dkey();
  const today = S.days[t] || { n: 0, ok: 0 }, goal = S.settings.goal || 20, st = streak();
  const name = S.settings.name ? ', ' + esc(S.settings.name) : '';
  let exam = '';
  if (S.settings.exam) { const d = diffDays(t, S.settings.exam); exam = d >= 0 ? `<p class="exam">Noch <b>${plural(d, 'Tag', 'Tage')}</b> bis zur Prüfung (${pkey(S.settings.exam).toLocaleDateString('de-DE')}).</p>` : ''; }
  const week = [...Array(7)].map((_, i) => { const k = addDays(t, i - 6); const n = (S.days[k] || {}).n || 0; return `<span class="day${n ? ' on' : ''}${k === t ? ' today' : ''}" title="${pkey(k).toLocaleDateString('de-DE')}: ${n} Fragen"><b>${'SMDMDFS'[pkey(k).getDay()]}</b></span>`; }).join('');
  const sess = S.session ? `<div class="card resume"><p><b>Pausierte Runde:</b> ${esc(S.session.title)} · Frage ${Math.min(S.session.i + 1, S.session.ids.length)} von ${S.session.ids.length}</p><div class="row"><button class="btn" data-act="resume">Fortsetzen</button><button class="btn ghost" data-act="drop">Verwerfen</button></div></div>` : '';
  const nextN = Math.min(S.settings.size, smartSet(ids, 999).length);
  return `
  <section class="hero">
    <div class="hero-txt">
      <p class="eyebrow">${tgt().label} · ${tgt().short.replace(/^Teil \d · /, '')}</p>
      <h1>Hallo${name}!</h1>
      ${exam}
      <p class="muted">${s.sicher} von ${s.total} Fragen sitzen sicher. ${due ? `<b>${due}</b> sind heute zur Wiederholung dran.` : 'Heute ist nichts überfällig.'}</p>
      ${nextN ? `<button class="btn big" data-act="smart">Weiterlernen · ${nextN} Fragen</button>` : `<button class="btn big" data-act="mixall">Alles ist sicher – gemischt wiederholen</button>`}
    </div>
    ${ring(s.ready, 'Prüfungsreife')}
  </section>
  ${sess}
  ${todayPlan(today, due)}
  <section class="tiles">
    <a class="tile" href="#rechnen"><b>Rechentrainer</b><small>Aufgaben mit Lösungsweg</small></a>
    <a class="tile" href="#spiele"><b>Spiele</b><small>Schaltpläne, Farbcode, Labor</small></a>
    <a class="tile" href="#mathe"><b>Mathe-Grundlagen</b><small>Umstellen, Potenzen, Prozent</small></a>
    <button class="tile" data-act="adhs-on"><b>Fokusmodus</b><small>Kurze Runden, Timer, ADHS-freundlich</small></button>
  </section>
  <section class="grid2">
    <div class="card">
      <h2>Heute</h2>
      <p class="big-num">${today.n}<span class="muted"> / ${goal} Fragen</span></p>
      <span class="bar single"><i style="width:${Math.min(100, today.n / goal * 100)}%"></i></span>
      <p class="muted small">${today.n >= goal ? 'Tagesziel geschafft. Stark!' : `Noch ${goal - today.n} bis zum Tagesziel.`}</p>
    </div>
    <div class="card">
      <h2>Lernserie</h2>
      <p class="big-num">${st}<span class="muted"> ${st === 1 ? 'Tag' : 'Tage'} am Stück</span></p>
      <div class="week">${week}</div>
    </div>
  </section>
  <section class="card">
    <div class="h-row"><h2>Deine Lernfelder</h2><a href="#lernfelder" class="link">Alle</a></div>
    <ul class="lflist">${tgt().lfs().map(n => { const ss = summary(lfIds(n)); const L = lfById(n); return `<li><a href="#lf-${n}" class="lfrow"><span class="lfno">${n}</span><span class="lft"><b>${esc(L.title)}</b>${bar(ss)}</span><span class="lfp">${ss.ready}%</span></a></li>`; }).join('')}</ul>
    <p class="muted small">Grün = sicher, Gelb = in Arbeit, Grau = neu. <a href="#mehr" class="link">So wird gezählt</a></p>
  </section>`;
}

function viewLernfelder() {
  const card = L => { const s = summary(lfIds(L.n)); const own = mixOn() ? LT.topics.filter(t => LT.ownKmk[t.lf] === L.n).reduce((a, t) => a + t.ids.length, 0) : 0;
    return `<a class="lfcard" href="#lf-${L.n}"><span class="lfno">${L.n}</span><span class="lft"><b>${esc(L.title)}</b><small>${L.h} Std. · ${s.total} Aufgaben${own ? ` (davon ${own} aus deinem Unterricht)` : ''} · ${L.n <= 6 ? 'Prüfung Teil 1' : 'Prüfung Teil 2'}</small>${bar(s)}</span><span class="lfp">${s.ready}%</span></a>`; };
  const years = [[1, 'Ausbildungsjahr 1'], [2, 'Ausbildungsjahr 2'], [3, 'Ausbildungsjahr 3'], [4, 'Ausbildungsjahr 4']];
  const own = LT.LF.filter(L => L.own && lfIds(L.n).length && (!mixOn() || !LT.ownKmk[L.n]));
  const ownCard = L => { const s = summary(lfIds(L.n)); return `<a class="lfcard own" href="#lf-${L.n}"><span class="lfno">✎</span><span class="lft"><b>${esc(L.title)}</b><small>${s.total} Aufgaben · ${s.sicher} sicher${L.src ? ' · ' + esc(L.src) : ''}</small>${bar(s)}</span><span class="lfp">${s.ready}%</span></a>`; };
  return `
  <h1 class="page-h">Lernen</h1>
  <div class="card mixbox"><div><b>Deine Unterlagen</b><p class="small muted">${mixOn() ? 'Sind in die passenden Lernfelder einsortiert. Du lernst pro Lernfeld alles zusammen, deine Unterrichtsaufgaben stehen dort oben.' : 'Stehen getrennt unten auf dieser Seite und werden nicht mit den Lernfeldern gemischt.'}</p></div>
    <div class="seg" role="group" aria-label="Deine Unterlagen"><button data-act="mix-on" aria-pressed="${mixOn()}">Gemischt</button><button data-act="mix-off" aria-pressed="${!mixOn()}">Getrennt</button></div></div>
  ${years.map(([y, t]) => `<section><h2 class="sec-h">${t}</h2><div class="lfcards">${LT.LF.filter(L => L.year === y).map(card).join('')}</div></section>`).join('')}
  ${own.length ? `<section><h2 class="sec-h">${mixOn() ? 'Weitere Unterlagen (ohne Lernfeld)' : 'Deine Unterlagen (getrennt)'}</h2>
    ${[...new Set(own.map(L => L.group || 'Weitere'))].map(g => `<h3 class="sub-h">${esc(g)}</h3><div class="lfcards">${own.filter(L => (L.group || 'Weitere') === g).map(ownCard).join('')}</div>`).join('')}</section>` : ''}
  <p class="small muted">Lernfelder nach dem KMK-Rahmenlehrplan Informationselektroniker/-in (18.12.2020). LF 1–6 vor Teil 1, LF 7–13 vor Teil 2 der Abschlussprüfung. Deine Unterlagen können Fehler enthalten: Aufgaben mit „Hinweis“ habe ich geprüft, Fragwürdiges meldest du mit „Fehler melden“.</p>`;
}

function viewLF(n) {
  const L = lfById(n); if (!L) return viewLernfelder();
  const ts = topicsOf(n), s = summary(lfIds(n));
  const tcard = t => { const ss = summary(t.ids); return `<a class="topic${LT.OWN.includes(t.lf) ? ' own' : ''}" href="#thema-${t.id}"><span class="lft"><b>${esc(t.title)}</b>${t.source ? `<span class="tag">${esc(t.source)}</span>` : ''}<small>${t.ids.length} Aufgaben · ${ss.sicher} sicher</small>${bar(ss)}</span><span class="lfp">${ss.ready}%</span></a>`; };
  const mine = ts.filter(t => LT.OWN.includes(t.lf)), gen = ts.filter(t => !LT.OWN.includes(t.lf));
  return `
  <a href="#lernfelder" class="back">← Lernen</a>
  <p class="eyebrow">${L.own ? 'Deine Unterlagen' : `Lernfeld ${n} · ${L.year}. Ausbildungsjahr · ${L.h} Stunden · ${n <= 6 ? 'Teil 1' : 'Teil 2'}`}</p>
  <h1 class="page-h">${esc(L.title)}</h1>
  ${L.core ? `<blockquote class="kmk">Die Schülerinnen und Schüler verfügen über die Kompetenz, ${esc(L.core)}.<cite>KMK-Rahmenlehrplan, Lernfeld ${n}</cite></blockquote>` : ''}
  ${L.own ? '<p class="card note">Diese Inhalte stammen aus deinen Unterlagen und sind von den Lernfeldern getrennt. Sie können Fehler enthalten. Wo mir beim Übernehmen etwas aufgefallen ist, steht ein Hinweis in der Erklärung. Fragen, die dir falsch vorkommen, markierst du mit „Fehler melden“.</p>' : ''}
  <div class="card stats">${bar(s)}<p><b>${s.ready}% Prüfungsreife</b> · ${s.sicher} sicher · ${s.arbeit} in Arbeit · ${s.neu} neu</p>
    <div class="row"><button class="btn" data-act="lf-smart" data-n="${n}">Lernfeld lernen</button><button class="btn ghost" data-act="lf-cards" data-n="${n}">Karteikarten</button></div></div>
  ${mine.length ? `<h2 class="sec-h">Aus deinem Unterricht</h2><div class="topics">${mine.map(tcard).join('')}</div>` : ''}
  ${gen.length ? `<h2 class="sec-h">${mine.length ? 'Grundwissen zum Lernfeld' : 'Themen'}</h2><div class="topics">${gen.map(tcard).join('')}</div>` : ''}
  ${!L.own && !mixOn() && LT.LF.some(o => o.own && LT.ownKmk[o.n] === n) ? `<p class="small muted">Deine Unterlagen zu diesem Lernfeld sind gerade getrennt. <button class="linkbtn" data-act="mix-on">Hier mit einmischen</button></p>` : ''}`;
}

function viewTopic(id) {
  const t = LT.byTopic.get(id); if (!t) return viewLernfelder();
  const s = summary(t.ids);
  const rows = t.ids.map(i => { const it = LT.items.get(i); const st = stat(i); const fl = flagged(i); return `<li><details><summary><span class="pill p-${fl ? 'flag' : st}">${fl ? 'Gemeldet' : { neu: 'Neu', arbeit: 'In Arbeit', sicher: 'Sicher' }[st]}</span> ${it.warn ? '<span class="pill p-warn">Hinweis</span> ' : ''}${esc(qText(it))}</summary><p class="ans"><b>Antwort:</b> ${esc(answerText(it))}</p>${it.e ? `<p class="muted small">${multiline(it.e)}</p>` : ''}<button class="linkbtn small" data-act="flag" data-id="${i}">${fl ? 'Meldung zurücknehmen' : 'Fehler melden'}</button></details></li>`; }).join('');
  return `
  <a href="#lf-${t.lf}" class="back">← Lernfeld ${t.lf}</a>
  <h1 class="page-h">${esc(t.title)}</h1>
  ${t.source ? `<p class="tag">${esc(t.source)}</p>` : ''}
  <div class="card stats">${bar(s)}<p><b>${s.ready}%</b> · ${s.sicher} sicher · ${s.arbeit} in Arbeit · ${s.neu} neu</p>
    <div class="row"><button class="btn" data-act="t-quiz" data-id="${t.id}">Fragen üben</button><button class="btn ghost" data-act="t-cards" data-id="${t.id}">Karteikarten</button></div></div>
  ${t.html ? `<section class="card sheet own-sheet"><h2>Dein Lernzettel</h2>${t.html}</section>` : ''}
  ${t.sheet ? `<section class="card sheet"><h2>Lernzettel</h2>${S.settings.adhs ? chunked(t) : rich(t.sheet)}${t.source ? '' : '<p class="muted small">Zusammenfassung des allgemeinen Fachwissens. Gleiche sie mit deinem Unterricht ab.</p>'}</section>` : ''}
  <section class="card"><h2>Alle Fragen mit Antworten</h2><p class="muted small">Zum Durchlesen und Auswendiglernen. Tippe eine Frage an.</p><ul class="qlist">${rows}</ul></section>`;
}

const chunkPos = {};
function chunked(t) {
  const parts = []; t.sheet.split('\n').forEach(l => { if (/^##\s/.test(l.trim()) || !parts.length) parts.push([]); parts[parts.length - 1].push(l); });
  const i = Math.min(chunkPos[t.id] || 0, parts.length - 1);
  return `<p class="small muted">Abschnitt ${i + 1} von ${parts.length}</p><div class="chunk">${rich(parts[i].join('\n'))}</div>
    <div class="row">${i > 0 ? `<button class="btn ghost sm" data-act="chunk" data-id="${t.id}" data-d="-1">Zurück</button>` : ''}${i + 1 < parts.length ? `<button class="btn sm" data-act="chunk" data-id="${t.id}" data-d="1">Nächster Abschnitt</button>` : '<span class="small ok-t"><b>Alles gelesen.</b> Jetzt Fragen üben!</span>'}<button class="btn ghost sm" data-act="speak-sheet" data-id="${t.id}" data-i="${i}">Vorlesen</button></div>`;
}
function todayPlan(today, due) {
  const steps = [
    [due === 0, due ? `${due} fällige Wiederholungen` : 'Wiederholungen erledigt', 'smart', 'Wiederholen'],
    [(today.q || 0) >= 10, `10 Fragen beantworten (${Math.min(10, today.q || 0)}/10)`, 'smart', 'Fragen'],
    [(today.c || 0) >= 3, `3 Rechenaufgaben (${Math.min(3, today.c || 0)}/3)`, null, 'Rechnen', '#rechnen-mix'],
    [(today.g || 0) >= 5, `1 Lernspiel (${Math.min(5, today.g || 0)}/5 Antworten)`, null, 'Spielen', '#spiele'],
  ];
  const done = steps.filter(x => x[0]).length;
  return `<section class="card plan-today"><div class="h-row"><h2>Dein Plan für heute</h2><span class="small muted">${done}/4</span></div>
    <ol class="steps-today">${steps.map(([ok, txt, act, lab, href]) => `<li class="${ok ? 'ok' : ''}"><span class="chk" aria-hidden="true">${ok ? '✓' : ''}</span><span>${txt}</span>${ok ? '' : href ? `<a class="btn ghost sm" href="${href}">${lab}</a>` : `<button class="btn ghost sm" data-act="${act}">${lab}</button>`}</li>`).join('')}</ol>
    ${done === 4 ? '<p class="small ok-t"><b>Alles geschafft für heute. Stark!</b></p>' : ''}
    <details class="howto"><summary>So lernst du mit der App am besten</summary>
      <ol class="plain small">
        <li><b>Kurz und täglich</b> statt selten und lang: 15–30 Minuten am Tag bringen mehr als 3 Stunden am Sonntag.</li>
        <li><b>Erst verstehen, dann üben:</b> Bei einem neuen Thema zuerst den Lernzettel lesen, dann die Fragen.</li>
        <li><b>Wiederholen, wenn es fällig ist:</b> „Weiterlernen“ holt Fragen genau dann zurück, wenn du sie fast vergessen hättest. So bleibt das Wissen dauerhaft.</li>
        <li><b>Mischen:</b> Fragen, Rechnen und Spiele abwechseln. Das fühlt sich schwerer an, bleibt aber besser hängen.</li>
        <li><b>Fehler sind Futter:</b> Der Fehlerkorb sammelt alles, was du falsch hattest. Einmal pro Woche leeren.</li>
        <li><b>Prüfung üben:</b> Einmal pro Woche die Prüfungssimulation. Ab etwa 80 % bist du gut vorbereitet.</li>
      </ol></details></section>`;
}
function viewStartAdhs() {
  const t = dkey(), today = S.days[t] || { n: 0, ok: 0 }, st = streak(), ids = ap1Ids(), s = summary(ids);
  return `
  <section class="focus card">
    <p class="eyebrow">Fokusmodus · ${tgt().short}</p>
    <h1>Eine Sache nach der anderen.</h1>
    <div class="ftimer" id="ftimer" aria-live="off">${focusText()}</div>
    <div class="row center">${FOCUS.end ? '<button class="btn ghost sm" data-act="focus-stop">Timer stoppen</button>' : `<button class="btn ghost sm" data-act="focus-start">Fokus-Timer starten (${S.settings.focusMin} min)</button>`}</div>
    <button class="btn big" data-act="mini">Mini-Runde: 5 Fragen</button>
    <div class="row center"><a class="btn ghost" href="#rechnen-mix">3 Rechenaufgaben</a><a class="btn ghost" href="#spiele">Ein kurzes Spiel</a></div>
    <div class="dots" aria-label="Heute ${today.n} Antworten">${[...Array(Math.min(20, S.settings.goal))].map((_, i) => `<span class="${i < today.n ? 'on' : ''}"></span>`).join('')}</div>
    <p class="small muted">Heute ${today.n} von ${S.settings.goal} · Serie ${st} ${st === 1 ? 'Tag' : 'Tage'} · Prüfungsreife ${s.ready} %</p>
    ${S.session ? `<button class="btn ghost" data-act="resume">Pausierte Runde fortsetzen</button>` : ''}
    <button class="btn ghost sm" data-act="adhs-off">Fokusmodus beenden</button>
  </section>`;
}
const stripTags = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
function answerText(it) {
  switch (it.kind) {
    case 'multi': return it.ans.map(i => it.opts[i]).join(' · ');
    case 'match': return it.ans.map((a, i) => (it.rowsText ? it.rowsText[i] : it.rows[i]) + ' → ' + a).join(' · ');
    case 'gap': { let k = -1; return it.q.replace(/\[\[(\d+)\]\]/g, (m, n) => { const g = it.gaps[+n]; return '[' + (g.text ? (g.show || g.ans[0]) : g.ans) + ']'; }); }
    case 'short': return it.show || it.ans[0];
    default: return it.a[0];
  }
}
const qText = it => it.kind === 'gap' ? it.q.replace(/\[\[\d+\]\]/g, '___') : it.q;
const extras = it => `${it.lead ? `<p class="small muted">${esc(it.lead)}</p>` : ''}${it.fig || ''}${it.pre ? `<p class="small">${esc(it.pre)}</p>` : ''}`;
const normA = x => String(x || '').toLowerCase().replace(/\s+/g, '').replace(/,/g, '.').replace(/\.$/, '').replace(/ohm/g, 'ω');
function kindView(it, s, exam) {
  const done = s.answered === 'done', v = (s.kres && s.kres.vals) || [], res = s.kres && s.kres.parts;
  const mark = i => done && !exam && res ? (res[i] ? ' good' : ' badk') : '';
  let body = '';
  if (it.kind === 'multi') {
    const ord = it.noshuf ? it.opts.map((_, i) => i) : (s.order[it.id] || it.opts.map((_, i) => i));
    body = `<p class="small muted">Mehrere Antworten können richtig sein.</p><div class="opts">${ord.map(i => { const right = it.ans.includes(i), on = v.includes(i); const cls = done && !exam ? (right ? ' right' : on ? ' wrong' : '') : ''; return `<label class="opt optc${cls}"><input type="checkbox" name="kmulti" value="${i}" ${on ? 'checked' : ''} ${done ? 'disabled' : ''}><span>${esc(it.opts[i])}</span></label>`; }).join('')}</div>`;
  } else if (it.kind === 'match') {
    const ch = s.order[it.id] ? s.order[it.id].map(i => it.choices[i]) : it.choices;
    body = `<div class="matchgrid">${it.rows.map((r, i) => `<div class="mrow${mark(i)}"><span class="mlab">${it.rowsHtml ? r : esc(r)}</span><select data-k="${i}" ${done ? 'disabled' : ''} aria-label="Zuordnung ${i + 1}"><option value="">– wählen –</option>${ch.map(c => `<option ${v[i] === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select>${done && !exam && res && !res[i] ? `<span class="small ok-t">→ ${esc(it.ans[i])}</span>` : ''}</div>`).join('')}</div>`;
  } else if (it.kind === 'gap') {
    let parts = esc(it.q).replace(/\[\[(\d+)\]\]/g, (m, n) => { const i = +n, g = it.gaps[i];
      const ctl = g.text ? `<input type="text" data-k="${i}" value="${esc(v[i] || '')}" ${done ? 'disabled' : ''} aria-label="Lücke ${i + 1}" autocomplete="off">` : `<select data-k="${i}" ${done ? 'disabled' : ''} aria-label="Lücke ${i + 1}"><option value="">…</option>${g.opts.map(o => `<option ${v[i] === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
      return `<span class="gapw${mark(i)}">${ctl}${done && !exam && res && !res[i] ? `<b class="ok-t"> ${esc(g.text ? (g.show || g.ans[0]) : g.ans)}</b>` : ''}</span>`; });
    body = `<p class="gaptext">${parts}</p>`;
  } else if (it.kind === 'short') {
    body = `<div class="row"><input type="text" id="kshort" data-k="0" value="${esc(v[0] || '')}" ${done ? 'disabled' : ''} aria-label="Deine Antwort" autocomplete="off" class="kshort"></div>`;
  }
  return `<div class="card qcard"><h2 class="q">${multiline(it.kind === 'gap' ? (it.lead ? '' : 'Fülle die Lücken aus.') : it.q)}</h2>${extras(it)}${body}
    ${done && !exam ? `<div class="fb ${s.kres.ok ? 'fb-ok' : 'fb-bad'}" role="status"><p><b>${s.kres.ok ? 'Richtig!' : 'Leider nicht ganz.'}</b> ${s.kres.ok ? '' : 'Richtig ist: <b>' + esc(answerText(it)) + '</b>'}</p>${it.e ? `<p>${multiline(it.e)}</p>` : ''}<button class="linkbtn small" data-act="flag" data-id="${it.id}">Fehler melden: Diese Frage stimmt nicht</button></div>` : ''}
    ${done && !exam ? `<button class="btn big" data-act="next" id="nextbtn">${s.i + 1 < s.ids.length ? 'Weiter' : 'Auswerten'}</button>` : `<button class="btn big" data-act="kchk">${exam ? 'Antwort speichern' : 'Prüfen'}</button>`}</div>`;
}
function kindCheck(it) {
  const m = document.getElementById('main'); let vals = [], parts = [];
  if (it.kind === 'multi') { vals = [...m.querySelectorAll('input[name=kmulti]:checked')].map(x => +x.value); const ok = vals.length === it.ans.length && vals.every(x => it.ans.includes(x)); return { vals, parts: [ok], ok, empty: !vals.length }; }
  m.querySelectorAll('[data-k]').forEach(el => { vals[+el.dataset.k] = el.value; });
  if (it.kind === 'match') parts = it.ans.map((a, i) => vals[i] === a);
  else if (it.kind === 'gap') parts = it.gaps.map((g, i) => g.text ? g.ans.map(normA).includes(normA(vals[i])) : vals[i] === g.ans);
  else if (it.kind === 'short') parts = [it.ans.map(normA).includes(normA(vals[0]))];
  return { vals, parts, ok: parts.every(Boolean), empty: vals.filter(x => x).length === 0 };
}
function viewUeben() {
  const ids = ap1Ids(), w = wrongIds().length, due = ids.filter(isDue).length;
  return `
  <h1 class="page-h">Üben</h1>
  <div class="modes">
    <button class="mode" data-act="smart"><b>Weiterlernen</b><span>Fällige Wiederholungen zuerst, dann neue Fragen in Lernfeld-Reihenfolge. ${due ? due + ' fällig.' : ''}</span></button>
    <button class="mode" data-act="wrong" ${w ? '' : 'disabled'}><b>Fehlerkorb (${w})</b><span>Alle Fragen, die du zuletzt falsch beantwortet hast.</span></button>
    <a class="mode" href="#mathe"><b>Mathe-Grundlagen</b><span>Gleichungen, Formeln umstellen, Potenzen, Zehnerpotenzen, Wurzeln, Brüche, Prozent, Dreisatz. Mit Erklärungen.</span></a>
    <a class="mode" href="#rechnen"><b>Rechentrainer</b><span>Rechenaufgaben mit immer neuen Zahlen und vollständigem Lösungsweg.</span></a>
    <a class="mode" href="#formeln"><b>Formelsammlung</b><span>Alle wichtigen Formeln mit Bedeutung und Einheiten.</span></a>
    <button class="mode" data-act="exam"><b>Prüfungssimulation</b><span>30 zufällige Fragen aus ${tgt().short}. Kein Feedback bis zum Schluss, dann Punkte und Note.</span></button>
    <button class="mode" data-act="cards-all"><b>Karteikarten-Mix</b><span>Frage lesen, Antwort aufdecken, ehrlich bewerten.</span></button>
  </div>
  <section class="card">
    <h2>Eigene Auswahl</h2>
    <fieldset class="pick"><legend>Lernfelder</legend>${[...LT.AP1, ...LT.AP2].filter(n => lfIds(n).length).map(n => `<label><input type="checkbox" name="lfsel" value="${n}" ${tgt().lfs().includes(n) ? 'checked' : ''}> LF ${n}</label>`).join('')}${LT.OWN.filter(n => lfIds(n).length).map(n => `<label><input type="checkbox" name="lfsel" value="${n}"> ${lfName(n)}</label>`).join('')}</fieldset>
    <div class="row">
      <label class="sel">Anzahl <select id="cnt"><option>10</option><option selected>20</option><option>40</option><option value="999">alle</option></select></label>
      <label class="sel">Art <select id="kind"><option value="quiz">Quiz</option><option value="cards">Karteikarten</option></select></label>
    </div>
    <button class="btn" data-act="custom">Starten</button>
  </section>`;
}

function currentQ() { const s = S.session; return s && LT.items.get(s.ids[s.i]); }
function viewSession() {
  const s = S.session; if (!s) return viewUeben();
  if (s.i >= s.ids.length) return finishSession();
  const it = currentQ(), n = s.ids.length, ord = s.order[it.id] || (it.a ? it.a.map((_, i) => i) : []);
  const topic = LT.byTopic.get(it.topic);
  const head = `<div class="s-head"><button class="btn ghost sm" data-act="pause">Pause</button><div class="s-prog"><span class="bar single"><i style="width:${s.i / n * 100}%"></i></span><span class="small muted">${s.i + 1} / ${n}</span></div><button class="btn ghost sm" data-act="end">Beenden</button></div>
  <div class="h-row"><p class="eyebrow">${lfName(it.lf)} · ${esc(topic ? topic.title : '')}</p><button class="btn ghost sm" data-act="speak">Vorlesen</button></div>${S.settings.adhs ? runStreak(s) : ''}`;
  if (s.mode === 'cards') {
    const shown = s.answered === 'shown';
    return `${head}<div class="card qcard"><h2 class="q">${multiline(qText(it))}</h2>${extras(it)}
      ${shown ? `<div class="answer"><p class="ans"><b>${esc(answerText(it))}</b></p>${it.e ? `<p class="muted">${multiline(it.e)}</p>` : ''}<button class="linkbtn small" data-act="flag" data-id="${it.id}">Fehler melden: Diese Frage stimmt nicht</button></div>
      <div class="row grade"><button class="btn bad" data-act="card-no">Nicht gewusst</button><button class="btn ok" data-act="card-yes">Gewusst</button></div>`
      : `<button class="btn big" data-act="flip">Antwort zeigen</button>`}</div>`;
  }
  if (it.kind) return head + kindView(it, s, s.mode === 'exam');
  const done = s.answered != null && s.answered !== 'shown';
  const exam = s.mode === 'exam';
  const opts = ord.map((oi, k) => {
    let cls = '';
    if (done && !exam) { if (oi === 0) cls = ' right'; else if (oi === s.answered) cls = ' wrong'; }
    if (done && exam && oi === s.answered) cls = ' chosen';
    return `<button class="opt${cls}" data-act="pick" data-o="${oi}" ${done ? 'disabled' : ''}><span class="key">${'ABCDEF'[k]}</span><span>${esc(it.a[oi])}</span></button>`;
  }).join('');
  let fb = '';
  if (done && !exam) {
    const ok = s.answered === 0;
    fb = `<div class="fb ${ok ? 'fb-ok' : 'fb-bad'}" role="status"><p><b>${ok ? 'Richtig!' : 'Leider falsch.'}</b> ${ok ? '' : `Richtig ist: <b>${esc(it.a[0])}</b>`}</p>${it.e ? `<p>${multiline(it.e)}</p>` : ''}${ok ? '' : '<p class="small">Die Frage kommt in dieser Runde noch einmal.</p>'}<button class="linkbtn small" data-act="flag" data-id="${it.id}">Fehler melden: Diese Frage stimmt nicht</button></div>`;
  }
  return `${head}<div class="card qcard"><h2 class="q">${multiline(it.q)}</h2>${extras(it)}<div class="opts">${opts}</div>${fb}
    ${done ? `<button class="btn big" data-act="next" id="nextbtn">${s.i + 1 < n ? 'Weiter' : 'Auswerten'}</button>` : ''}</div>`;
}
function runStreak(s) { let n = 0; for (let i = s.res.length - 1; i >= 0 && s.res[i].ok; i--) n++; return n >= 2 ? `<p class="streak">${n} richtig hintereinander. Weiter so!</p>` : ''; }
function note(p) { return p >= 92 ? 'sehr gut (1)' : p >= 81 ? 'gut (2)' : p >= 67 ? 'befriedigend (3)' : p >= 50 ? 'ausreichend (4)' : p >= 30 ? 'mangelhaft (5)' : 'ungenügend (6)'; }
function finishSession() {
  const s = S.session;
  if (s.mode === 'exam') s.res.forEach(r => grade(r.id, r.ok));
  const first = new Map(); s.res.forEach(r => { if (!first.has(r.id)) first.set(r.id, r.ok); });
  const ok = [...first.values()].filter(Boolean).length, total = first.size;
  S.last = { mode: s.mode, title: s.title, ok, total, wrong: [...first].filter(([, v]) => !v).map(([id]) => id), picks: s.mode === 'exam' ? Object.fromEntries(s.res.map(r => [r.id, r.pick])) : null, secs: Math.round((Date.now() - s.started) / 1000), back: s.back };
  S.session = null; save();
  setTimeout(() => go('ergebnis'));
  return '';
}
function viewResult() {
  const r = S.last; if (!r) return viewUeben();
  const p = pct(r.ok, r.total), exam = r.mode === 'exam';
  const list = r.wrong.map(id => { const it = LT.items.get(id); if (!it) return ''; const pk = r.picks && r.picks[id]; return `<li><p><b>${esc(qText(it))}</b></p>${exam && pk != null && pk >= 0 && !it.kind ? `<p class="small bad-t">Deine Antwort: ${esc(it.a[pk])}</p>` : ''}<p class="small ok-t">Richtig: ${esc(answerText(it))}</p>${it.e ? `<p class="small muted">${multiline(it.e)}</p>` : ''}</li>`; }).join('');
  const mins = Math.floor(r.secs / 60), secs = r.secs % 60;
  const msg = p === 100 ? 'Alles richtig. Genau so!' : p >= 80 ? 'Sehr gut, fast alles sitzt.' : p >= 50 ? 'Gute Basis. Die falschen Fragen kommen wieder dran.' : 'Dranbleiben: Lies die Lernzettel und übe den Fehlerkorb.';
  return `
  <h1 class="page-h">${exam ? 'Ergebnis der Prüfungssimulation' : 'Runde geschafft'}</h1>
  <section class="card result">
    <p class="big-num">${r.ok}<span class="muted"> von ${r.total} richtig</span></p>
    <span class="bar single"><i style="width:${p}%"></i></span>
    <p><b>${p}%</b>${exam ? ` · Note nach 100-Punkte-Schlüssel: <b>${note(p)}</b>` : ''} · ${mins} min ${pad(secs)} s</p>
    <p>${msg}</p>
    <div class="row"><button class="btn" data-act="smart">Weiterlernen</button>${r.wrong.length ? '<button class="btn ghost" data-act="redo">Falsche wiederholen</button>' : ''}<a class="btn ghost" href="#start">Zur Startseite</a></div>
  </section>
  ${list ? `<section class="card"><h2>${exam ? 'Falsch beantwortet' : 'Beim ersten Versuch falsch'}</h2><ul class="wrong">${list}</ul></section>` : ''}
  ${exam ? '<p class="muted small">Die Note dient nur zur Orientierung und ist keine echte Prüfungsbewertung.</p>' : ''}`;
}

const TOOLS = {
  labor: { title: 'Schaltungslabor', file: 'labor.html', desc: 'Frei bauen wie in einem Simulator: Batterie, Widerstand, Lampe, LED, Schalter, Messgeräte. Live-Werte, Stromfluss und 14 Challenges.' },
  schaltwand: { title: 'Schaltwand', file: 'schaltwand.html', desc: '22 Übungen zum Verdrahten: Strom messen, LED, Licht- und Steckdosenschaltungen, Sicherungskasten mit FI und LS, Schützschaltungen.' },
  magnetlabor: { title: 'Magnetlabor', file: 'magnetlabor.html', desc: 'Magnetismus, Rechte-Hand-Regel, Transformator mit Rechenaufgaben.' },
  arbeitsblaetter: { title: 'Arbeitsblätter', file: 'arbeitsblaetter.html', desc: 'Deine Arbeitsblätter 5.1 bis 13.6 Schritt für Schritt, mit Zeichenaufgaben.' },
};
function viewSpiele() {
  const best = id => (S.games && S.games[id]) || 0;
  return `<h1 class="page-h">Spiele und Werkstatt</h1>
  <p class="muted">Lernen durch Ausprobieren: Schaltpläne lesen und zeichnen, Bauteile erkennen, Formeln umstellen und echte Schaltungen verdrahten.</p>
  <h2 class="sec-h">Lernspiele</h2>
  <div class="modes two">${LT.ext.games.map(g => `<a class="mode" href="#spiel-${g.id}"><b>${g.title}</b><span>${g.desc}</span>${best(g.id) ? `<span class="small ok-t">Bestwert: ${best(g.id)}</span>` : ''}</a>`).join('')}</div>
  <h2 class="sec-h">Werkstatt</h2>
  <div class="modes two">${Object.entries(TOOLS).map(([k, t]) => `<a class="mode" href="#tool-${k}"><b>${t.title}</b><span>${t.desc}</span></a>`).join('')}</div>`;
}
function viewTool(k) {
  const t = TOOLS[k]; if (!t) return viewSpiele();
  return `<div class="tool-head"><a href="#spiele" class="back">← Spiele</a><a class="link small" href="${t.file}" target="_blank" rel="noopener">In eigenem Fenster öffnen</a></div>
  <iframe class="tool" src="${t.file}" title="${t.title}"></iframe>`;
}

function viewMehr() {
  const ids = ap1Ids(), s = summary(ids), t = dkey();
  const days = [...Array(14)].map((_, i) => { const k = addDays(t, i - 13); return { k, n: (S.days[k] || {}).n || 0, ok: (S.days[k] || {}).ok || 0 }; });
  const mx = Math.max(10, ...days.map(d => d.n));
  const total = Object.values(S.days).reduce((a, d) => a + d.n, 0), totalOk = Object.values(S.days).reduce((a, d) => a + d.ok, 0);
  const st = S.settings;
  return `
  <h1 class="page-h">Fortschritt und Einstellungen</h1>
  <section class="card">
    <h2>Lernverlauf</h2>
    <p class="muted small">Zeigt, was du in der App geübt hast (Fragen, Rechenaufgaben, Spiele). Das ist kein objektives Maß für dein Können.</p>
    <p>${total} Antworten insgesamt, davon ${pct(totalOk, total)}% richtig · ${s.sicher} von ${s.total} Fragen sicher (${tgt().short})</p>
    <div class="chart" role="img" aria-label="Antworten der letzten 14 Tage">${days.map(d => `<div class="col" title="${pkey(d.k).toLocaleDateString('de-DE')}: ${d.n} Antworten, ${d.ok} richtig"><span class="v">${d.n || ''}</span><i style="height:${d.n / mx * 100}%"></i><span class="d">${pkey(d.k).getDate()}.</span></div>`).join('')}</div>
    <div class="scroll"><table class="tbl"><thead><tr><th>Lernfeld</th><th>Sicher</th><th>In Arbeit</th><th>Neu</th><th>Reife</th></tr></thead><tbody>
    ${[...LT.AP1, ...LT.AP2].concat(LT.OWN).filter(n => lfIds(n).length).map(n => { const ss = summary(lfIds(n)); return `<tr><td>${lfName(n)}</td><td>${ss.sicher}</td><td>${ss.arbeit}</td><td>${ss.neu}</td><td>${ss.ready}%</td></tr>`; }).join('')}</tbody></table></div>
  </section>
  <section class="card">
    <h2>Einstellungen</h2>
    <form id="settings" class="form">
      <label>Dein Name <input id="s-name" type="text" maxlength="40" value="${esc(st.name)}" autocomplete="given-name"></label>
      <label>Prüfungsziel <select id="s-target">${Object.entries(TARGETS).map(([k, v]) => `<option value="${k}" ${st.target === k ? 'selected' : ''}>${v.label} (${v.short})</option>`).join('')}</select></label>
      <label>Datum der nächsten Prüfung (optional) <input id="s-exam" type="date" value="${esc(st.exam)}"></label>
      <label>Tagesziel (Antworten) <input id="s-goal" type="number" min="5" max="300" value="${st.goal}"></label>
      <label>Fragen pro Runde bei „Weiterlernen“ <input id="s-size" type="number" min="5" max="100" value="${st.size}"></label>
      <label class="check"><input id="s-mix" type="checkbox" ${st.mix !== false ? 'checked' : ''}> Deine Unterlagen in die passenden Lernfelder einmischen (sonst getrennt)</label>
      <label class="check"><input id="s-adhs" type="checkbox" ${st.adhs ? 'checked' : ''}> Fokusmodus (ADHS-freundlich): Mini-Runden mit 5 Fragen, Fokus-Timer mit Pausen, Lernzettel in Häppchen, ruhigere Oberfläche</label>
      <label>Länge einer Fokus-Phase <select id="s-focus">${[5, 10, 15, 20, 25].map(m => `<option value="${m}" ${st.focusMin === m ? 'selected' : ''}>${m} Minuten</option>`).join('')}</select></label>
      <label class="check"><input id="s-tv" type="checkbox" ${st.tv ? 'checked' : ''}> Großbild-Modus (Fernseher, Tablet): große Schrift, Steuerung mit Pfeiltasten</label>
      <button class="btn" type="submit">Speichern</button>
    </form>
  </section>
  ${S.flags && Object.keys(S.flags).length ? `<section class="card"><h2>Gemeldete Fragen (${Object.keys(S.flags).length})</h2><p class="small muted">Diese Fragen hältst du für fehlerhaft. Sie werden nicht abgefragt. Klär sie mit deiner Lehrkraft oder deinem Tabellenbuch.</p><ul class="plain small">${Object.keys(S.flags).filter(id => LT.items.has(id)).map(id => { const it = LT.items.get(id); return `<li>${esc(qText(it))} <span class="muted">(${lfName(it.lf)})</span> <button class="linkbtn" data-act="flag" data-id="${id}">zurücknehmen</button></li>`; }).join('')}</ul></section>` : ''}
  <section class="card" id="installieren">
    <h2>Aufs iPhone und auf den Fernseher</h2>
    <p class="small"><b>iPhone:</b> Öffne die App in Safari. Tippe auf <b>Teilen</b> (Quadrat mit Pfeil) und dann auf <b>„Zum Home-Bildschirm“</b>. Danach startet sie wie eine App ohne Browserleiste. Läuft sie von einer eigenen Adresse (z. B. GitHub Pages), funktioniert sie danach auch ohne Internet.</p>
    <p class="small"><b>Fernseher:</b> Am einfachsten über <b>AirPlay</b>: Kontrollzentrum öffnen → <b>Bildschirmsynchronisierung</b> → Apple TV oder AirPlay-fähigen Fernseher wählen. Oder die Adresse im Browser des Fernsehers öffnen und hier den <b>Großbild-Modus</b> einschalten. Mit den Pfeiltasten der Fernbedienung oder einer Tastatur springst du von Knopf zu Knopf, OK bzw. Enter wählt aus.</p>
    <p class="small muted">Dein Fortschritt liegt im jeweiligen Gerät. Mit der Datensicherung unten überträgst du ihn.</p>
  </section>
  <section class="card">
    <h2>So wird gezählt</h2>
    <ul class="plain small">
      <li>Jede Frage hat eine Stufe von 0 bis 5. Neu = noch nie beantwortet.</li>
      <li><b>Richtig:</b> eine Stufe höher, höchstens einmal pro Tag. <b>Falsch:</b> zurück auf Stufe 0.</li>
      <li><b>Sicher</b> ist eine Frage ab Stufe 3, also wenn du sie an 3 verschiedenen Tagen richtig beantwortet hast, ohne dazwischen falsch zu liegen.</li>
      <li><b>Prüfungsreife</b> = Durchschnitt aller Fragen deines Prüfungsziels. 100 % heißt: alle Fragen sicher.</li>
      <li>Rechenaufgaben und Spiele zählen fürs Tagesziel. Im Rechentrainer bekommt ein Thema einen Stern, wenn du 3 Aufgaben hintereinander richtig rechnest.</li>
    </ul>
  </section>
  <section class="card">
    <h2>Datensicherung</h2>
    <p class="small muted">Dein Fortschritt liegt nur in diesem Browser auf diesem Gerät. Für ein anderes Gerät: Sicherung kopieren und dort einfügen.</p>
    <div class="row"><button class="btn ghost" data-act="export">Sicherung anzeigen</button><button class="btn ghost" data-act="import">Sicherung einfügen</button></div>
    <div id="io" hidden></div>
    <div class="row" style="margin-top:12px"><button class="btn bad" data-act="reset">Fortschritt zurücksetzen</button></div>
  </section>
  <section class="card">
    <h2>Datenschutz und Quellen</h2>
    <ul class="plain small">
      <li>Die App braucht kein Konto. Es werden keine Daten an Server oder KI-Dienste gesendet. Alles bleibt im Speicher deines Browsers.</li>
      <li>Lernfelder, Stunden und Kompetenzsätze: KMK-Rahmenlehrplan Informationselektroniker/-in, Beschluss vom 18.12.2020. Der NRW-Bildungsplan baut darauf auf.</li>
      <li>Fragen, Lernzettel und Rechenaufgaben fassen allgemeines Fachwissen zusammen. Fragen mit dem Hinweis „Aus deinen Arbeitsblättern“ stammen aus deinem Unterricht. Normen ändern sich: Gleiche Grenzwerte mit deinem aktuellen Tabellenbuch ab.</li>
    </ul>
  </section>`;
}

/* ---------- Fokus-Timer (ADHS-Modus) ---------- */
const FOCUS = { end: null, phase: 'fokus' };
function focusText() {
  if (!FOCUS.end) return `<span class="ft-l">Bereit für ${S.settings.focusMin} Minuten Fokus</span>`;
  const left = Math.max(0, Math.round((FOCUS.end - Date.now()) / 1000));
  return `<span class="ft-n">${Math.floor(left / 60)}:${pad(left % 60)}</span><span class="ft-l">${FOCUS.phase === 'fokus' ? 'Fokus' : 'Pause'}</span>`;
}
function focusStart(phase, min) { FOCUS.phase = phase; FOCUS.end = Date.now() + min * 60000; }
setInterval(() => {
  if (!FOCUS.end) return;
  const el = document.getElementById('ftimer'); if (el) el.innerHTML = focusText();
  if (Date.now() >= FOCUS.end) {
    if (FOCUS.phase === 'fokus') { focusStart('pause', 3); showBreak(); }
    else { FOCUS.end = null; toast('Pause vorbei. Bereit für die nächste Runde?'); const b = document.getElementById('breakbox'); if (b) b.remove(); render(); }
  }
}, 1000);
function showBreak() {
  if (document.getElementById('breakbox')) return;
  const d = document.createElement('div'); d.id = 'breakbox'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-labelledby', 'bb-h');
  d.innerHTML = `<div class="bb"><h2 id="bb-h">Zeit für eine Pause</h2><p>Du hast ${S.settings.focusMin} Minuten gelernt. Steh kurz auf, trink etwas, schau aus dem Fenster. 3 Minuten.</p><div class="row center"><button class="btn" data-act="break-skip">Weiterlernen</button><button class="btn ghost" data-act="break-ok">Pause machen</button></div></div>`;
  document.body.appendChild(d); d.querySelector('button').focus();
}

/* ---------- Vorlesen ---------- */
function speak(text) {
  if (!('speechSynthesis' in window)) { toast('Vorlesen wird von diesem Browser nicht unterstützt.'); return; }
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text.replace(/\*\*/g, '').replace(/·/g, ',')); u.lang = 'de-DE'; u.rate = 0.95; speechSynthesis.speak(u); } catch (e) { toast('Vorlesen ist gerade nicht möglich.'); }
}

/* ---------- Router ---------- */
function render() {
  const r = (location.hash || '#start').slice(1) || 'start';
  let html = null;
  for (const [pre, fn] of LT.ext.routes) { if (r === pre || r.startsWith(pre + '-')) { html = fn(r === pre ? '' : r.slice(pre.length + 1)); break; } }
  if (html == null) {
    if (r === 'start') html = viewStart();
    else if (r === 'lernfelder') html = viewLernfelder();
    else if (r.startsWith('lf-')) html = viewLF(+r.slice(3));
    else if (r.startsWith('thema-')) html = viewTopic(r.slice(6));
    else if (r === 'ueben') html = viewUeben();
    else if (r === 'sitzung') html = viewSession();
    else if (r === 'ergebnis') html = viewResult();
    else if (r === 'spiele' || r === 'werkstatt') html = viewSpiele();
    else if (r.startsWith('tool-')) html = viewTool(r.slice(5));
    else if (r === 'mehr') html = viewMehr();
    else html = viewStart();
  }
  const m = main(); m.innerHTML = html;
  document.body.classList.toggle('in-session', r === 'sitzung' || r.startsWith('tool-') || (r.startsWith('spiel-') && !S.settings.tv));
  document.body.classList.toggle('adhs', !!S.settings.adhs);
  document.body.classList.toggle('tv', !!S.settings.tv);
  const tab = tabFor(r);
  document.querySelectorAll('#tabs a').forEach(a => a.setAttribute('aria-current', a.dataset.tab === tab ? 'page' : 'false'));
  const h = m.querySelector('h1, h2.q');
  if (h && document.activeElement && document.activeElement !== document.body && !m.contains(document.activeElement)) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  if (r !== 'sitzung') window.scrollTo(0, 0);
  const f = $('#settings'); if (f) f.onsubmit = saveSettings;
  LT.ext.after.forEach(fn => { try { fn(r, m); } catch (e) { console.error(e); } });
}
function saveSettings(e) {
  e.preventDefault();
  const goal = parseInt($('#s-goal').value, 10), size = parseInt($('#s-size').value, 10);
  if (!(goal >= 5 && goal <= 300)) { toast('Tagesziel bitte zwischen 5 und 300 wählen.'); return; }
  if (!(size >= 5 && size <= 100)) { toast('Fragen pro Runde bitte zwischen 5 und 100 wählen.'); return; }
  Object.assign(S.settings, { name: $('#s-name').value.trim().slice(0, 40), goal, size, exam: $('#s-exam').value || '', target: $('#s-target').value,
    adhs: $('#s-adhs').checked, mix: $('#s-mix').checked, tv: $('#s-tv').checked, focusMin: parseInt($('#s-focus').value, 10) || 10 });
  save(); render(); toast('Einstellungen gespeichert.');
}

/* ---------- Aktionen ---------- */
let resetArm = false;
function act(a, el) {
  if (LT.ext.acts[a]) { LT.ext.acts[a](el); return; }
  const s = S.session;
  switch (a) {
    case 'smart': startSession('quiz', smartSet(ap1Ids(), S.settings.adhs ? 5 : S.settings.size), S.settings.adhs ? 'Mini-Runde' : 'Weiterlernen'); break;
    case 'mini': startSession('quiz', smartSet(ap1Ids(), 5), 'Mini-Runde', 'start'); break;
    case 'mixall': startSession('quiz', shuffle(ap1Ids()).slice(0, S.settings.size), 'Gemischte Wiederholung'); break;
    case 'wrong': startSession('quiz', shuffle(wrongIds()), 'Fehlerkorb', 'ueben'); break;
    case 'exam': startSession('exam', shuffle(ap1Ids()).slice(0, 30), 'Prüfungssimulation', 'ueben'); break;
    case 'cards-all': startSession('cards', practiceSet(ap1Ids(), 20), 'Karteikarten-Mix', 'ueben'); break;
    case 'lf-smart': startSession('quiz', practiceSet(lfIds(+el.dataset.n), S.settings.adhs ? 5 : S.settings.size), 'Lernfeld ' + el.dataset.n, 'lf-' + el.dataset.n); break;
    case 'lf-cards': startSession('cards', practiceSet(lfIds(+el.dataset.n), 20), 'Karteikarten LF ' + el.dataset.n, 'lf-' + el.dataset.n); break;
    case 't-quiz': { const t = LT.byTopic.get(el.dataset.id); startSession('quiz', practiceSet(t.ids, S.settings.adhs ? 5 : 999), t.title, 'thema-' + t.id); break; }
    case 't-cards': { const t = LT.byTopic.get(el.dataset.id); startSession('cards', practiceSet(t.ids, 999), t.title, 'thema-' + t.id); break; }
    case 'custom': {
      const lfs = [...document.querySelectorAll('input[name=lfsel]:checked')].map(i => +i.value);
      if (!lfs.length) { toast('Bitte mindestens ein Lernfeld auswählen.'); return; }
      const pool = lfs.flatMap(lfIds), cnt = +$('#cnt').value, kind = $('#kind').value;
      startSession(kind, practiceSet(pool, cnt), 'Eigene Auswahl', 'ueben'); break;
    }
    case 'resume': go('sitzung'); break;
    case 'drop': S.session = null; save(); render(); toast('Runde verworfen. Deine Antworten bleiben gezählt.'); break;
    case 'redo': if (S.last) startSession('quiz', S.last.wrong, 'Falsche wiederholen', 'ueben'); break;
    case 'pause': save(); go('start'); toast('Runde pausiert. Auf der Startseite kannst du sie fortsetzen.'); break;
    case 'end': if (!s) return; if (s.res.length) { s.ids = s.ids.slice(0, s.i + (s.answered != null && s.answered !== 'shown' ? 1 : 0)); s.i = s.ids.length; } else { S.session = null; save(); go(s.back); return; } save(); render(); break;
    case 'flip': s.answered = 'shown'; save(); render(); break;
    case 'card-yes': case 'card-no': { const ok = a === 'card-yes'; const id = s.ids[s.i]; grade(id, ok); s.res.push({ id, ok }); if (!ok && !s.again.includes(id)) { s.again.push(id); s.ids.push(id); } s.i++; s.answered = null; save(); render(); break; }
    case 'pick': {
      if (s.answered != null) return;
      const o = +el.dataset.o, id = s.ids[s.i], ok = o === 0;
      s.answered = o;
      if (s.mode === 'exam') { s.res.push({ id, ok, pick: o }); s.i++; s.answered = null; save(); render(); return; }
      grade(id, ok); s.res.push({ id, ok });
      if (!ok && !s.again.includes(id)) { s.again.push(id); s.ids.push(id); }
      save(); render(); const nb = $('#nextbtn'); if (nb) nb.focus({ preventScroll: true }); break;
    }
    case 'next': s.i++; s.answered = null; s.kres = null; save(); render(); window.scrollTo(0, 0); break;
    case 'flag': { S.flags = S.flags || {}; const id = el.dataset.id; if (S.flags[id]) { delete S.flags[id]; toast('Meldung zurückgenommen. Die Frage wird wieder abgefragt.'); } else { S.flags[id] = 1; toast('Gemeldet. Die Frage wird nicht mehr abgefragt. Unter „Mehr“ siehst du alle gemeldeten Fragen.'); }
      save(); const d = el.closest('details'); const open = d && d.open; render(); break; }
    case 'kchk': { const it = currentQ(); if (!it) return; const r = kindCheck(it); if (r.empty) { toast('Bitte zuerst eine Antwort eingeben oder auswählen.'); return; }
      if (s.mode === 'exam') { s.res.push({ id: it.id, ok: r.ok, pick: -1 }); s.i++; s.answered = null; s.kres = null; save(); render(); return; }
      s.answered = 'done'; s.kres = r; grade(it.id, r.ok); s.res.push({ id: it.id, ok: r.ok }); if (!r.ok && !s.again.includes(it.id)) { s.again.push(it.id); s.ids.push(it.id); }
      save(); render(); const nb = $('#nextbtn'); if (nb) nb.focus({ preventScroll: true }); break; }
    case 'speak': { const it = currentQ(); if (!it) return; const ord = s.order[it.id] || (it.a ? it.a.map((_, i) => i) : []); speak(qText(it) + '. ' + (s.mode === 'cards' ? (s.answered === 'shown' ? 'Antwort: ' + answerText(it) : '') : it.kind === 'multi' ? it.opts.join('. ') : it.kind ? '' : (ord || []).map((oi, k) => 'ABCDEF'[k] + ': ' + it.a[oi]).join('. '))); break; }
    case 'speak-sheet': { const t = LT.byTopic.get(el.dataset.id); const txt = document.querySelector('.chunk'); speak(txt ? txt.innerText : t.title); break; }
    case 'chunk': chunkPos[el.dataset.id] = Math.max(0, (chunkPos[el.dataset.id] || 0) + (+el.dataset.d)); render(); { const c = document.querySelector('.sheet'); if (c) c.scrollIntoView({ block: 'start' }); } break;
    case 'mix-on': S.settings.mix = true; save(); render(); toast('Deine Unterlagen sind jetzt in die Lernfelder einsortiert.'); break;
    case 'mix-off': S.settings.mix = false; save(); render(); toast('Deine Unterlagen stehen jetzt getrennt.'); break;
    case 'adhs-on': S.settings.adhs = true; save(); go('start'); render(); toast('Fokusmodus an. Kurze Runden, eine Sache nach der anderen.'); break;
    case 'adhs-off': S.settings.adhs = false; FOCUS.end = null; save(); render(); toast('Fokusmodus aus.'); break;
    case 'focus-start': focusStart('fokus', S.settings.focusMin); render(); break;
    case 'focus-stop': FOCUS.end = null; render(); break;
    case 'break-ok': { const b = $('#breakbox'); if (b) b.remove(); toast('Gute Pause! In 3 Minuten geht es weiter.'); break; }
    case 'break-skip': { const b = $('#breakbox'); if (b) b.remove(); focusStart('fokus', S.settings.focusMin); toast('Weiter geht’s. Neuer Fokus-Block läuft.'); break; }
    case 'export': { const io = $('#io'); io.hidden = false; io.innerHTML = `<label for="io-t" class="small">Sicherung (Text kopieren und gut aufbewahren):</label><textarea id="io-t" rows="5" readonly>${esc(JSON.stringify({ app: 'ap1-trainer', v: 1, exportedAt: new Date().toISOString(), data: { p: S.p, days: S.days, settings: S.settings, calc: S.calc, games: S.games, flags: S.flags } }))}</textarea><button class="btn ghost sm" data-act="copy">Kopieren</button>`; break; }
    case 'copy': { const ta = $('#io-t'); ta.select(); (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(() => toast('Sicherung kopiert.'), () => toast('Text ist markiert. Kopiere ihn mit Strg+C bzw. „Kopieren“.')); break; }
    case 'import': { const io = $('#io'); io.hidden = false; io.innerHTML = `<label for="io-in" class="small">Sicherung hier einfügen:</label><textarea id="io-in" rows="5"></textarea><p class="small">Oder Datei wählen: <input type="file" id="io-file" accept=".json,.txt,application/json,text/plain"></p><div class="row"><button class="btn ghost sm" data-act="imp-merge">Zusammenführen</button><button class="btn ghost sm" data-act="imp-replace">Ersetzen</button></div><p class="small muted">Zusammenführen behält bei jeder Frage den besseren Stand. Ersetzen überschreibt deinen jetzigen Fortschritt.</p>`;
      $('#io-file').onchange = e => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { $('#io-in').value = String(r.result || ''); toast('Datei geladen. Wähle Zusammenführen oder Ersetzen.'); }; r.onerror = () => toast('Die Datei konnte nicht gelesen werden.'); r.readAsText(f); }; break; }
    case 'imp-merge': case 'imp-replace': {
      let d; try { d = JSON.parse($('#io-in').value); } catch (e) { toast('Das ist keine gültige Sicherung (kein JSON).'); return; }
      if (!d || d.app !== 'ap1-trainer' || !d.data || typeof d.data.p !== 'object') { toast('Diese Sicherung stammt nicht aus dem Prüfungstrainer.'); return; }
      if (a === 'imp-replace') { S.p = d.data.p || {}; S.days = d.data.days || {}; S.settings = Object.assign(fresh().settings, d.data.settings || {}); S.calc = d.data.calc || {}; S.games = d.data.games || {}; }
      else {
        Object.entries(d.data.p).forEach(([id, p]) => { const q = S.p[id]; if (!q || (p.b || 0) > (q.b || 0) || ((p.b || 0) === (q.b || 0) && (p.n || 0) > (q.n || 0))) S.p[id] = p; });
        Object.entries(d.data.days || {}).forEach(([k, v]) => { const o = S.days[k]; if (!o || (v.n || 0) > (o.n || 0)) S.days[k] = v; });
        S.calc = Object.assign({}, d.data.calc || {}, S.calc || {}); S.games = S.games || {};
        Object.entries(d.data.games || {}).forEach(([k, v]) => { if (!(S.games[k] >= v)) S.games[k] = v; });
      }
      save(); render(); toast('Sicherung übernommen.'); break;
    }
    case 'reset': if (!resetArm) { resetArm = true; el.textContent = 'Wirklich alles zurücksetzen?'; setTimeout(() => { resetArm = false; if (el.isConnected) el.textContent = 'Fortschritt zurücksetzen'; }, 5000); return; }
      resetArm = false; S.p = {}; S.days = {}; S.session = null; S.last = null; S.calc = {}; S.games = {}; save(); render(); toast('Fortschritt zurückgesetzt.'); break;
  }
}

document.addEventListener('click', e => { const el = e.target.closest('[data-act]'); if (!el || el.disabled) return; act(el.dataset.act, el); });
document.addEventListener('keydown', e => {
  /* Pfeiltasten: von Knopf zu Knopf springen (Fernseher, Tastatur) */
  if (e.key.startsWith('Arrow') && !e.target.closest('input,textarea,select,iframe') && !e.altKey && !e.metaKey) {
    const els = [...document.querySelectorAll('#main a[href], #main button:not([disabled]), #main select, #main input, #main [tabindex="0"], #tabs a, #breakbox button')].filter(x => x.offsetParent !== null);
    const cur = document.activeElement && els.includes(document.activeElement) ? document.activeElement : null;
    if (!cur) { if (els[0]) { e.preventDefault(); els[0].focus(); } return; }
    const a = cur.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    const dir = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
    let best = null, bd = Infinity;
    els.forEach(x => { if (x === cur) return; const b = x.getBoundingClientRect(), dx = b.left + b.width / 2 - ax, dy = b.top + b.height / 2 - ay;
      const along = dx * dir[0] + dy * dir[1]; if (along <= 4) return; const across = Math.abs(dx * dir[1]) + Math.abs(dy * dir[0]); const d = along + across * 2.5; if (d < bd) { bd = d; best = x; } });
    if (best) { e.preventDefault(); best.focus(); best.scrollIntoView({ block: 'nearest' }); }
    return;
  }
  if ((location.hash.slice(1)) !== 'sitzung' || !S.session || e.target.closest('input,textarea,select')) return;
  const s = S.session;
  if (s.mode === 'cards') {
    if ((e.key === ' ' || e.key === 'Enter') && s.answered !== 'shown' && !e.target.closest('button')) { e.preventDefault(); act('flip'); }
    else if (s.answered === 'shown' && (e.key === '1' || e.key === '2')) act(e.key === '2' ? 'card-yes' : 'card-no');
    return;
  }
  const idx = 'abcdef'.indexOf(e.key.toLowerCase()); const num = parseInt(e.key, 10);
  if (s.answered == null && (idx >= 0 || (num >= 1 && num <= 6))) { const btn = document.querySelectorAll('.opt')[idx >= 0 ? idx : num - 1]; if (btn) btn.click(); }
  else if (s.answered != null && e.key === 'Enter' && !e.target.closest('button')) { e.preventDefault(); act('next'); }
});
window.addEventListener('hashchange', render);
window.addEventListener('storage', e => { if (e.key === KEY) { load(); render(); } });

LT.wfPool = () => ap1Ids().map(id => LT.items.get(id)).filter(it => !it.kind && it.a && it.a.length > 1 && !(S.flags || {})[it.id] && it.q.length < 180 && !it.fig);
/* Schnittstelle für Module (Rechentrainer, Spiele) */
LT.api = {
  get S() { return S; }, save, toast, go, render, esc, rich, multiline, shuffle, dkey, pct, speak,
  count(ok, kind = 'c') { const t = dkey(); const d = S.days[t] || (S.days[t] = { n: 0, ok: 0 }); d.n++; d[kind] = (d[kind] || 0) + 1; if (ok) d.ok++; save(); },
  countG(ok) { this.count(ok, 'g'); },
  best(id, score) { S.games = S.games || {}; const nb = !(S.games[id] >= score); if (nb) S.games[id] = score; save(); return nb; },
};

document.addEventListener('DOMContentLoaded', () => {
  load();
  $('#tabs').innerHTML = TABS.map(([k, l]) => `<a href="#${k}" data-tab="${k}"><span class="ti ti-${k}" aria-hidden="true"></span>${l}</a>`).join('');
  render();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !/claude\.ai|claudeusercontent/.test(location.hostname)) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
});
