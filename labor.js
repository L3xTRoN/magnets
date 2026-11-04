'use strict';
/* Schaltungslabor: freies Bauen auf einem Raster mit Live-Simulation (Gleichstrom, Knotenpotenzialverfahren). */

const COLS = 11, ROWS = 9, GAP = 50, OFF = 25, W = (COLS - 1) * GAP + 2 * OFF, H = (ROWS - 1) * GAP + 2 * OFF;
const fmt = (x, d = 2) => (Math.abs(x) < 1e-9 ? 0 : x).toFixed(d).replace('.', ',');
const unitR = r => r >= 1000 ? fmt(r / 1000, r % 1000 ? 1 : 0) + ' kΩ' : fmt(r, r % 1 ? 1 : 0) + ' Ω';
const fI = i => Math.abs(i) < 1 ? fmt(i * 1000, Math.abs(i) < 0.01 ? 1 : 0) + ' mA' : fmt(i) + ' A';
const fV = v => fmt(v, 2) + ' V';
const fP = p => Math.abs(p) < 1 ? fmt(p * 1000, 0) + ' mW' : fmt(p) + ' W';

/* ---------- Bauteile mit Lexikon ---------- */
const BAT = [1.5, 4.5, 6, 9, 12, 24];
const RES = [1, 2.2, 4.7, 10, 15, 22, 24, 33, 47, 56, 68, 82, 100, 120, 150, 200, 220, 330, 470, 560, 680, 1000, 2000, 2200, 4700, 10000, 22000, 47000, 100000];
const TYPES = {
  wire: { name: 'Leitung', short: 'Leitung', info: 'Eine Leitung verbindet zwei Punkte fast ohne Widerstand. Alle Punkte, die mit Leitungen verbunden sind, haben dieselbe Spannung (gleiche Farbe).' },
  battery: { name: 'Batterie', short: 'Batterie', def: 9, values: BAT, unit: v => fmt(v, v % 1 ? 1 : 0) + ' V',
    info: 'Die Batterie ist die Spannungsquelle, wie eine Pumpe im Wasserkreislauf. Am <b>Pluspol (+)</b> ist das Potenzial hoch, am Minuspol niedrig. Der Strom fließt außen von + nach − (technische Stromrichtung).' },
  resistor: { name: 'Widerstand', short: 'Widerstand', def: 100, values: RES, unit: unitR,
    info: 'Ein Widerstand bremst den Strom. Ohmsches Gesetz: <b>U = R · I</b>. Doppelter Widerstand bei gleicher Spannung heißt halber Strom. Die Leistung P = U · I wird zu Wärme.' },
  lamp: { name: 'Glühlampe 6 V', short: 'Lampe',
    info: 'Eine Glühlampe 6 V / 0,1 A (ca. 60 Ω). Bei 6 V leuchtet sie hell, bei weniger Spannung schwächer. Bei deutlich über 6 V brennt sie durch.' },
  switch: { name: 'Schalter', short: 'Schalter', info: 'Ein Schalter öffnet oder schließt den Stromkreis. Offen: kein Strom. Geschlossen: wie eine Leitung. Tippe ihn an, um umzuschalten.' },
  button: { name: 'Taster', short: 'Taster', info: 'Ein Taster ist nur geschlossen, solange du ihn drückst (wie ein Klingelknopf). Halte ihn gedrückt.' },
  led: { name: 'LED (rot)', short: 'LED',
    info: 'Eine Leuchtdiode leuchtet nur in Durchlassrichtung: Strom von der <b>Anode (+, markiert)</b> zur Kathode. Ab ca. 2 V wird sie leitend. Sie braucht einen <b>Vorwiderstand</b>, sonst wird der Strom zu groß (über 40 mA brennt sie durch).' },
  voltmeter: { name: 'Spannungsmesser', short: 'Voltmeter',
    info: 'Misst die Spannung zwischen seinen zwei Anschlüssen. Wird <b>parallel</b> angeschlossen. Sehr großer Innenwiderstand, deshalb fließt fast kein Strom durch ihn. Der markierte Anschluss ist +.' },
  ammeter: { name: 'Strommesser', short: 'Amperemeter',
    info: 'Misst den Strom, der durch ihn hindurchfließt. Wird <b>in Reihe</b> eingebaut. Sehr kleiner Innenwiderstand. Nie direkt an die Batterie, das wäre ein Kurzschluss!' },
};
const ICON = {
  wire: '<path class="s" d="M4 12H36"/>',
  battery: '<path class="s" d="M4 12H16M24 12H36M16 4V20M24 8V16" /><path class="s" d="M24 8V16" style="stroke-width:4"/>',
  resistor: '<path class="s" d="M2 12H10M30 12H38"/><rect class="s" x="10" y="6" width="20" height="12"/>',
  lamp: '<path class="s" d="M2 12H12M28 12H38"/><circle class="s" cx="20" cy="12" r="8"/><path class="s" d="M14 6L26 18M26 6L14 18"/>',
  switch: '<path class="s" d="M2 12H12M28 12H38M12 12L27 4"/>',
  button: '<path class="s" d="M2 16H12M28 16H38M12 10H28M20 10V3"/>',
  led: '<path class="s" d="M2 12H13M27 12H38M13 5V19L26 12Z M27 5V19"/>',
  voltmeter: '<path class="s" d="M2 12H12M28 12H38"/><circle class="s" cx="20" cy="12" r="8"/><text x="20" y="16" font-size="10" text-anchor="middle" font-weight="700" fill="currentColor">V</text>',
  ammeter: '<path class="s" d="M2 12H12M28 12H38"/><circle class="s" cx="20" cy="12" r="8"/><text x="20" y="16" font-size="10" text-anchor="middle" font-weight="700" fill="currentColor">A</text>',
};

/* ---------- Challenges ---------- */
const parts = () => S.parts;
const of = t => S.parts.filter(p => p.type === t);
const near = (x, v, tol) => Math.abs(x - v) <= tol;
const CH = [
  { id: 'licht', title: 'Es werde Licht', goal: 'Bring eine Lampe zum Leuchten.', hint: 'Batterie setzen, Lampe setzen, mit Leitungen einen geschlossenen Kreis bilden: + → Lampe → −. Tipp: Eine 6-V-Batterie lässt die Lampe hell leuchten.',
    check: r => of('lamp').some(p => r.p[p.id].b > 0.5), why: 'Strom fließt nur im geschlossenen Kreis. Die Batterie treibt ihn an, die Lampe wandelt elektrische Energie in Licht und Wärme.' },
  { id: 'schalter', title: 'An und aus', goal: 'Die Lampe soll nur leuchten, wenn der Schalter geschlossen ist.', hint: 'Setze den Schalter in Reihe zur Lampe, also in eine der beiden Leitungen.',
    check: (r, X) => of('lamp').length > 0 && of('switch').length > 0 && X.combos().every(c => of('lamp').some(l => c.r.p[l.id].b > 0.5) === of('switch').some(s => c.st[s.id])) && X.combos().some(c => of('lamp').some(l => c.r.p[l.id].b > 0.5)),
    why: 'Ein offener Schalter unterbricht den einzigen Stromweg.' },
  { id: 'messen', title: 'Messprofi', goal: 'Lampe an 6 V: Miss gleichzeitig die Spannung an der Lampe (Voltmeter) und den Strom durch die Lampe (Amperemeter).', hint: 'Amperemeter in Reihe zur Lampe, Voltmeter parallel zur Lampe. Markierter Anschluss = +.',
    check: r => of('lamp').some(p => r.p[p.id].b > 0.5) && of('voltmeter').some(m => near(r.p[m.id].u, 6, 0.4)) && of('ammeter').some(m => near(r.p[m.id].i, 0.1, 0.01)),
    why: 'Die Lampe nimmt bei 6 V etwa 0,1 A auf. R = U / I = 6 V / 0,1 A = 60 Ω.' },
  { id: 'ohm', title: 'Ohmsches Gesetz', goal: 'An einer 12-V-Batterie sollen genau 0,5 A durch einen Widerstand fließen. Zeig es mit einem Amperemeter.', hint: 'R = U / I = 12 V / 0,5 A. Wähle diesen Wert beim Widerstand aus (antippen).',
    check: r => of('battery').some(b => b.v === 12) && of('ammeter').some(m => near(Math.abs(r.p[m.id].i), 0.5, 0.02)) && of('resistor').some(p => near(Math.abs(r.p[p.id].i), 0.5, 0.02)),
    why: 'R = 12 V / 0,5 A = 24 Ω. Mit dem ohmschen Gesetz kannst du jede der drei Größen aus den anderen beiden ausrechnen.' },
  { id: 'reihe', title: 'Reihenschaltung', goal: 'Zwei Lampen in Reihe an 12 V. Beide sollen hell leuchten.', hint: 'Die Spannung teilt sich auf: 12 V verteilt auf zwei Lampen gibt je 6 V.',
    check: r => of('lamp').filter(p => near(Math.abs(r.p[p.id].u), 6, 0.4)).length >= 2 && of('battery').some(b => b.v === 12),
    why: 'In Reihe ist der Strom überall gleich und die Spannungen addieren sich: 6 V + 6 V = 12 V.' },
  { id: 'parallel', title: 'Parallelschaltung', goal: 'Drei Lampen parallel an 6 V. Ein Amperemeter soll den Gesamtstrom anzeigen.', hint: 'Jede Lampe hängt direkt an + und −. Das Amperemeter sitzt in der gemeinsamen Leitung zur Batterie.',
    check: r => { const ls = of('lamp').filter(p => r.p[p.id].b > 0.8); if (ls.length < 3) return false; const sum = ls.reduce((a, p) => a + Math.abs(r.p[p.id].i), 0); return of('ammeter').some(m => near(Math.abs(r.p[m.id].i), sum, 0.02)); },
    why: 'Parallel: An jeder Lampe liegen die vollen 6 V. Die Ströme addieren sich: 3 · 0,1 A = 0,3 A.' },
  { id: 'teiler', title: 'Spannungsteiler', goal: 'Mit einer 9-V-Batterie und zwei Widerständen in Reihe sollen an einem Widerstand genau 3 V liegen. Miss es mit dem Voltmeter.', hint: 'Die Spannung teilt sich im Verhältnis der Widerstände. 3 V von 9 V ist ein Drittel: R1 doppelt so groß wie R2.',
    check: r => of('battery').some(b => b.v === 9) && of('resistor').length >= 2 && of('voltmeter').some(m => near(Math.abs(r.p[m.id].u), 3, 0.12)),
    why: 'U2 = U · R2 / (R1 + R2). Mit 200 Ω und 100 Ω: 9 V · 100 / 300 = 3 V. Spannungsteiler stecken in fast jeder Elektronik.' },
  { id: 'led', title: 'LED richtig anschließen', goal: 'Eine LED an 9 V soll leuchten, mit einem Strom zwischen 10 und 25 mA.', hint: 'Vorwiderstand in Reihe. R ≈ (9 V − 2 V) / 0,02 A. Achte auf die Richtung der LED: markierte Seite zu +.',
    check: r => of('led').some(p => !p.burnt && r.p[p.id].i >= 0.01 && r.p[p.id].i <= 0.025) && of('battery').some(b => b.v === 9),
    why: 'Am Vorwiderstand fallen etwa 7 V ab, an der LED etwa 2 V. Ohne Vorwiderstand wäre der Strom viel zu groß.' },
  { id: 'leistung', title: 'Ein Watt', goal: 'Ein Widerstand soll etwa 1 W Leistung umsetzen (0,95 bis 1,05 W).', hint: 'P = U² / R. Probier verschiedene Batterien und Widerstände, z. B. 12 V und 150 Ω.',
    check: r => of('resistor').some(p => near(r.p[p.id].pw, 1, 0.05)),
    why: 'P = U² / R = (12 V)² / 150 Ω = 0,96 W. Die Leistung wird im Widerstand zu Wärme. Deshalb gibt es Widerstände mit verschiedener Belastbarkeit.' },
  { id: 'und', title: 'UND', goal: 'Die Lampe soll nur leuchten, wenn Schalter 1 UND Schalter 2 geschlossen sind.', hint: 'Zwei Schalter in Reihe.',
    check: (r, X) => of('switch').length >= 2 && of('lamp').length > 0 && X.combos().every(c => of('lamp').some(l => c.r.p[l.id].b > 0.5) === of('switch').every(s => c.st[s.id])),
    why: 'Reihenschaltung von Schaltern = UND-Verknüpfung.' },
  { id: 'oder', title: 'ODER', goal: 'Die Lampe soll leuchten, wenn mindestens einer von zwei Schaltern geschlossen ist.', hint: 'Zwei Schalter parallel.',
    check: (r, X) => of('switch').length >= 2 && of('lamp').length > 0 && X.combos().every(c => of('lamp').some(l => c.r.p[l.id].b > 0.5) === of('switch').some(s => c.st[s.id])),
    why: 'Parallelschaltung von Schaltern = ODER-Verknüpfung.' },
  { id: 'taster', title: 'Klingelknopf', goal: 'Die Lampe soll nur leuchten, solange ein Taster gedrückt wird.', hint: 'Wie beim Schalter, nur mit dem Taster.',
    check: (r, X) => of('button').length > 0 && of('lamp').length > 0 && X.combos().every(c => of('lamp').some(l => c.r.p[l.id].b > 0.5) === of('button').some(s => c.st[s.id])),
    why: 'Taster schließen nur, solange sie betätigt werden. So funktionieren Klingeln und Start-Taster.' },
  { id: 'knoten', title: 'Knotenregel', goal: 'Zwei Widerstände parallel. Drei Amperemeter: eins für den Gesamtstrom, je eins pro Zweig.', hint: 'Der Gesamtstrom teilt sich am Knoten auf. Das Amperemeter für den Gesamtstrom sitzt vor dem Knoten.',
    check: r => { const m = of('ammeter').map(a => Math.abs(r.p[a.id].i)).filter(i => i > 0.005); if (m.length < 3) return false; m.sort((a, b) => b - a); return near(m[0], m[1] + m[2], 0.01) && of('resistor').length >= 2; },
    why: 'Knotenregel (1. Kirchhoffsches Gesetz): Was in einen Knoten hineinfließt, fließt auch wieder heraus.' },
  { id: 'kurz', title: 'Kurzschluss verstehen', goal: 'Baue absichtlich einen Kurzschluss: Verbinde + und − der Batterie direkt mit einer Leitung.', hint: 'Eine Leitung direkt von Plus nach Minus. Danach wieder entfernen!',
    check: r => r.short, why: 'Ohne Verbraucher ist der Widerstand fast null, der Strom riesig. In echt wird die Leitung heiß, Batterien können sich entzünden. Sicherungen und LS-Schalter schalten Kurzschlüsse ab.' },
];

/* ---------- Zustand ---------- */
const KEY = 'schaltlabor-v1';
let S = { parts: [], done: {}, ch: 'licht' };
try { const d = JSON.parse(localStorage.getItem(KEY) || 'null'); if (d && Array.isArray(d.parts)) S = Object.assign(S, d); } catch (e) { /* ohne Speicher */ }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignorieren */ } };
let tool = 'wire', pending = null, selected = null, undoStack = [], clearArm = false, pressed = {};

/* ---------- Simulation ---------- */
const key = pt => pt[0] + ',' + pt[1];
function simulate(st) {
  st = st || {};
  const nodes = new Map(); const nid = k => { if (!nodes.has(k)) nodes.set(k, nodes.size); return nodes.get(k); };
  S.parts.forEach(p => { nid(key(p.a)); nid(key(p.b)); });
  const n = nodes.size, res = { p: {}, v: {}, short: false };
  if (!n) return res;
  const bat = S.parts.find(p => p.type === 'battery');
  const ground = bat ? nid(key(bat.b)) : 0;
  const led = {}; S.parts.forEach(p => { if (p.type === 'led') led[p.id] = false; });
  const elem = p => {
    const closed = p.type === 'switch' ? (st[p.id] !== undefined ? st[p.id] : p.on) : p.type === 'button' ? (st[p.id] !== undefined ? st[p.id] : !!pressed[p.id]) : true;
    switch (p.type) {
      case 'wire': return { G: 1000, J: 0 };
      case 'switch': case 'button': return { G: closed ? 1000 : 1e-9, J: 0 };
      case 'resistor': return { G: 1 / p.v, J: 0 };
      case 'lamp': return { G: p.burnt ? 1e-9 : 1 / 60, J: 0 };
      case 'voltmeter': return { G: 1e-7, J: 0 };
      case 'ammeter': return { G: 100, J: 0 };
      case 'battery': return { G: 20, J: -p.v * 20 };        // Ri = 0,05 Ω; Strom a→b = G·(va−vb) + J
      case 'led': return p.burnt || !led[p.id] ? { G: 1e-9, J: 0 } : { G: 1 / 20, J: -2 / 20 };
    }
  };
  let v = new Array(n).fill(0);
  for (let it = 0; it < 25; it++) {
    const A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
    for (let i = 0; i < n; i++) A[i][i] += 1e-9;
    A[ground][ground] += 1e6;
    S.parts.forEach(p => { const e = elem(p), a = nid(key(p.a)), b = nid(key(p.b)); if (a === b) return;
      A[a][a] += e.G; A[b][b] += e.G; A[a][b] -= e.G; A[b][a] -= e.G; A[a][n] -= e.J; A[b][n] += e.J; });
    for (let c = 0; c < n; c++) { let q = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[q][c])) q = r; [A[c], A[q]] = [A[q], A[c]];
      for (let r = 0; r < n; r++) { if (r === c) continue; const k = A[r][c] / A[c][c]; if (!k) continue; for (let j = c; j <= n; j++) A[r][j] -= k * A[c][j]; } }
    v = A.map((row, i) => row[n] / row[i]);
    let changed = false;
    S.parts.forEach(p => { if (p.type !== 'led' || p.burnt) return; const u = v[nid(key(p.a))] - v[nid(key(p.b))];
      const on = led[p.id] ? (u - 2) / 20 > 0 : u > 2; if (on !== led[p.id]) { led[p.id] = on; changed = true; } });
    if (!changed) break;
  }
  nodes.forEach((i, k) => { res.v[k] = v[i]; });
  S.parts.forEach(p => { const e = elem(p), u = v[nid(key(p.a))] - v[nid(key(p.b))], i = e.G * u + e.J;
    const o = { u, i, pw: Math.abs(u * i), b: 0 };
    if (p.type === 'lamp') o.b = p.burnt ? 0 : Math.min(1, (u / 6) ** 2);
    if (p.type === 'led') o.b = p.burnt ? 0 : Math.min(1, Math.max(0, i) / 0.02);
    if (p.type === 'battery' && Math.abs(i) > 20) { res.short = true; o.short = true; }
    res.p[p.id] = o; });
  return res;
}
/* Zerstörung durch Überlast (bleibt, bis man das Bauteil ersetzt) */
function applyDamage(r) {
  let msg = null;
  S.parts.forEach(p => { const o = r.p[p.id]; if (!o || p.burnt) return;
    if (p.type === 'lamp' && Math.abs(o.u) > 9) { p.burnt = true; msg = 'Die Lampe ist durchgebrannt: Sie hat deutlich mehr als 6 V bekommen. Tippe sie an und ersetze sie.'; }
    if (p.type === 'led' && o.i > 0.04) { p.burnt = true; msg = 'Die LED ist durchgebrannt: Der Strom war über 40 mA. Sie braucht einen Vorwiderstand. Tippe sie an und ersetze sie.'; }
    if (p.type === 'ammeter' && Math.abs(o.i) > 10) { msg = 'Riesiger Strom durch das Amperemeter! Ein Strommesser gehört in Reihe, nie direkt an die Batterie.'; } });
  return msg;
}
function tester() {
  return { combos() {
    const sw = S.parts.filter(p => p.type === 'switch' || p.type === 'button'); let all = [{}];
    sw.forEach(p => { all = all.flatMap(o => [0, 1].map(x => Object.assign({}, o, { [p.id]: !!x }))); });
    return all.slice(0, 64).map(st => ({ st, r: simulate(st) }));
  } };
}

/* ---------- Zeichnen ---------- */
const P = pt => ({ x: OFF + pt[0] * GAP, y: OFF + pt[1] * GAP });
function vColor(vv, vmax) {
  if (vmax <= 0) return 'var(--v0)';
  const t = Math.max(-1, Math.min(1, vv / vmax));
  if (Math.abs(t) < 0.03) return 'var(--v0)';
  const mix = Math.round(Math.abs(t) * 100);
  return `color-mix(in srgb, ${t > 0 ? 'var(--vpos)' : 'var(--vneg)'} ${mix}%, var(--v0))`;
}
function partSVG(p, r, vmax) {
  const A = P(p.a), B = P(p.b), dx = B.x - A.x, dy = B.y - A.y, len = Math.hypot(dx, dy), ang = Math.atan2(dy, dx) * 180 / Math.PI;
  const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2, o = r.p[p.id] || { u: 0, i: 0, b: 0 };
  const ca = vColor(r.v[key(p.a)] || 0, vmax), cb = vColor(r.v[key(p.b)] || 0, vmax);
  const half = len / 2, s = 18;
  const flowOn = Math.abs(o.i) > 2e-4 && p.type !== 'voltmeter';
  const dur = flowOn ? Math.max(0.25, Math.min(4, 0.6 / Math.sqrt(Math.abs(o.i) / 0.1))) : 1;
  const flow = flowOn ? `<path d="M${A.x} ${A.y}L${B.x} ${B.y}" class="flow${o.i < 0 ? ' rev' : ''}" style="--dur:${dur.toFixed(2)}s"/>` : '';
  let sym = '';
  const g = (inner) => `<g transform="translate(${mx} ${my}) rotate(${ang})">${inner}</g>`;
  const leads = p.type === 'wire' ? `<path d="M${A.x} ${A.y}L${mx} ${my}" class="lead" style="stroke:${ca}"/><path d="M${mx} ${my}L${B.x} ${B.y}" class="lead" style="stroke:${cb}"/>`
    : `<path d="M${A.x} ${A.y}L${A.x + dx / len * (half - s)} ${A.y + dy / len * (half - s)}" class="lead" style="stroke:${ca}"/><path d="M${B.x} ${B.y}L${B.x - dx / len * (half - s)} ${B.y - dy / len * (half - s)}" class="lead" style="stroke:${cb}"/>`;
  const plus = `<text x="${-s - 6}" y="-10" class="lbl" transform="rotate(${-ang} ${-s - 6} -10)">+</text>`;
  const label = (t, dyy = 26) => `<text x="0" y="${dyy}" class="val" text-anchor="middle" transform="rotate(${-ang} 0 ${dyy})">${t}</text>`;
  switch (p.type) {
    case 'wire': sym = `<rect x="${-half}" y="-8" width="${len}" height="16" fill="transparent"/>`; break;
    case 'battery': sym = g(`<rect x="-${s}" y="-16" width="${2 * s}" height="32" class="body" style="stroke:none"/><path d="M-${s} 0H-5M5 0H${s}" class="sym"/><path d="M-5 -15V15" class="sym"/><path d="M5 -8V8" class="sym" style="stroke-width:5"/>${plus}${label(TYPES.battery.unit(p.v))}${o.short ? `<text x="0" y="-22" class="warn" text-anchor="middle" transform="rotate(${-ang} 0 -22)">Kurzschluss!</text>` : ''}`); break;
    case 'resistor': sym = g(`<rect x="-${s}" y="-8" width="${2 * s}" height="16" rx="2" class="body"/>${label(unitR(p.v), 24)}`); break;
    case 'lamp': sym = g(`<circle r="${14 + o.b * 10}" fill="var(--sel)" opacity="${o.b ? 0.15 + o.b * 0.5 : 0}"/><circle r="12" class="body" style="fill:${o.b > 0.05 ? 'color-mix(in srgb, var(--sel) ' + Math.round(40 + o.b * 60) + '%, var(--board))' : 'var(--board)'}"/><path d="M-8.5 -8.5L8.5 8.5M8.5 -8.5L-8.5 8.5" class="sym"/>${p.burnt ? label('kaputt', 30) : ''}`); break;
    case 'switch': { const on = p.on; sym = g(`<rect x="-${s}" y="-14" width="${2 * s}" height="20" fill="var(--board)"/><path d="M-${s} 0H-12M12 0H${s}" class="sym"/><circle cx="-12" r="3" class="sym"/><circle cx="12" r="3" class="sym"/><path d="M-12 0L${on ? '11 -1' : '10 -14'}" class="sym body" style="fill:none"/>${label(on ? 'zu' : 'offen', 24)}`); break; }
    case 'button': { const on = !!pressed[p.id]; sym = g(`<rect x="-${s}" y="-20" width="${2 * s}" height="26" fill="var(--board)"/><path d="M-${s} 0H-12M12 0H${s}" class="sym"/><circle cx="-12" r="3" class="sym"/><circle cx="12" r="3" class="sym"/><path d="M-13 ${on ? -3 : -9}H13M0 ${on ? -3 : -9}V-18" class="sym body" style="fill:none"/>${label(on ? 'gedrückt' : 'halten', 24)}`); break; }
    case 'led': sym = g(`<circle r="${12 + o.b * 10}" fill="#FF5A4A" opacity="${o.b ? 0.15 + o.b * 0.5 : 0}"/><rect x="-14" y="-12" width="28" height="24" fill="var(--board)"/><path d="M-${s} 0H${s}" class="sym"/><path d="M-8 -9V9L8 0Z" class="body" style="fill:${o.b > 0.05 ? '#FF5A4A' : 'var(--board)'}"/><path d="M8 -9V9" class="sym"/><path d="M4 -13l6 -6M9 -12l6 -6" class="sym" style="stroke-width:1.5"/>${plus}${p.burnt ? label('kaputt', 26) : ''}`); break;
    case 'voltmeter': case 'ammeter': { const vv = p.type === 'voltmeter' ? fV(o.u) : fI(o.i);
      sym = g(`<circle r="14" class="body"/><text y="5" class="lbl" text-anchor="middle" style="font-size:13px" transform="rotate(${-ang} 0 0)">${p.type === 'voltmeter' ? 'V' : 'A'}</text>${plus}<g transform="rotate(${-ang})"><rect x="-34" y="18" width="68" height="18" rx="4" fill="#C7D3BF"/><text x="0" y="31" class="lbl" text-anchor="middle" style="fill:#1E2A1A">${vv}</text></g>`); break; }
  }
  const nm = TYPES[p.type].name;
  return `<g class="part${selected === p.id ? ' sel' : ''}" data-part="${p.id}" tabindex="0" role="button" aria-label="${nm}${p.v ? ' ' + (TYPES[p.type].unit ? TYPES[p.type].unit(p.v) : '') : ''}">${leads}${flow}${sym}</g>`;
}
function boardSVG(r) {
  const vmax = Math.max(0.1, ...S.parts.filter(p => p.type === 'battery').map(p => p.v));
  let pts = '';
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) { const q = P([x, y]), k = x + ',' + y, sel = pending && key(pending) === k;
    pts += `<g class="pt${sel ? ' sel' : ''}" data-pt="${k}" tabindex="-1"><circle cx="${q.x}" cy="${q.y}" r="20" class="hit"/><circle cx="${q.x}" cy="${q.y}" r="${sel ? 7 : 3.5}" class="d"/></g>`; }
  const ghost = pending ? `<line id="ghost" class="ghost-line" x1="${P(pending).x}" y1="${P(pending).y}" x2="${P(pending).x}" y2="${P(pending).y}"/>` : '';
  return `<svg id="svg" viewBox="0 0 ${W} ${H}" aria-label="Steckbrett">${pts}${S.parts.map(p => partSVG(p, r, vmax)).join('')}${ghost}</svg>`;
}

/* ---------- Oberfläche ---------- */
const $ = id => document.getElementById(id);
function setStatus(m, bad) { const e = $('status'); e.textContent = m; e.className = 'status' + (bad ? ' bad' : ''); }
let lastWin = null;
function render() {
  let r = simulate(); const dmg = applyDamage(r); if (dmg) { r = simulate(); save(); }
  $('board').innerHTML = boardSVG(r);
  renderInfo(r); renderGoal(r);
  if (dmg) setStatus(dmg, true);
  else if (r.short) setStatus('Kurzschluss! Plus und Minus sind direkt verbunden. Der Strom ist riesig. Entferne die Verbindung.', true);
  return r;
}
function renderPalette() {
  const tools = [['wire'], ['battery'], ['resistor'], ['lamp'], ['switch'], ['button'], ['led'], ['voltmeter'], ['ammeter']];
  $('palette').innerHTML = tools.map(([t]) => `<button class="tool" data-tool="${t}" aria-pressed="${tool === t}"><svg viewBox="0 0 40 24" aria-hidden="true">${ICON[t]}</svg>${TYPES[t].short}</button>`).join('') +
    `<button class="tool" data-tool="select" aria-pressed="${tool === 'select'}"><svg viewBox="0 0 40 24" aria-hidden="true"><path class="s" d="M14 3L14 20L18 16L21 22L24 21L21 15L27 15Z"/></svg>Auswählen</button>`;
}
function renderInfo(r) {
  const p = S.parts.find(x => x.id === selected);
  if (!p) {
    $('info').innerHTML = `<h2>So baust du</h2><p class="small">Wähle oben ein Bauteil. Tippe dann zwei Punkte auf dem Brett an: Das Bauteil wird dazwischen gesetzt. Punkte, die mit Leitungen verbunden sind, gehören zusammen.</p>
      <p class="small">Tippe ein gesetztes Bauteil an, um Werte, Erklärung und Einstellungen zu sehen. Schalter schaltest du durch Antippen, Taster hältst du gedrückt.</p>
      <p class="small muted">Die Farbe der Leitungen zeigt die Spannung, die gelben Punkte zeigen, wo und in welche Richtung Strom fließt.</p>`;
    return;
  }
  const T = TYPES[p.type], o = r.p[p.id] || { u: 0, i: 0, pw: 0 };
  const vals = p.type === 'wire' ? '' : `<div class="vals"><div><span>Spannung U</span><b>${fV(Math.abs(o.u))}</b></div><div><span>Strom I</span><b>${fI(Math.abs(o.i))}</b></div><div><span>Leistung P</span><b>${fP(o.pw)}</b></div></div>`;
  const sel = T.values ? `<label class="inl" for="val">Wert <select id="val">${T.values.map(v => `<option value="${v}" ${v === p.v ? 'selected' : ''}>${T.unit(v)}</option>`).join('')}</select></label>` : '';
  $('info').innerHTML = `<h2>${T.name}</h2>${vals}<p class="small">${T.info}</p>${sel}
    <div class="row">${p.type === 'switch' ? `<button class="btn sm" data-act="toggle">${p.on ? 'Öffnen' : 'Schließen'}</button>` : ''}${p.burnt ? '<button class="btn sm" data-act="repair">Ersetzen</button>' : ''}
    ${['battery', 'led', 'voltmeter', 'ammeter'].includes(p.type) ? '<button class="btn ghost sm" data-act="flip">Umdrehen</button>' : ''}<button class="btn bad sm" data-act="del">Entfernen</button><button class="btn ghost sm" data-act="desel">Fertig</button></div>`;
  const s = $('val'); if (s) s.onchange = () => { pushUndo(); p.v = parseFloat(s.value); save(); render(); setStatus(`${T.name}: ${T.unit(p.v)}.`); };
}
function renderGoal(r) {
  const ch = CH.find(c => c.id === S.ch) || CH[0];
  const won = ch.check(r, tester());
  if (won && !S.done[ch.id]) { S.done[ch.id] = true; save(); renderList(); }
  $('goal').className = 'panel goal' + (won ? ' win' : '');
  $('goal').innerHTML = `<h2>${won ? 'Geschafft: ' : 'Challenge: '}${ch.title}</h2><p>${ch.goal}</p>${won ? `<p><b>Warum?</b> ${ch.why}</p>` : `<details><summary class="small">Tipp</summary><p class="small">${ch.hint}</p></details>`}
    ${won ? `<div class="row">${nextCh() ? `<button class="btn sm" data-act="next">Nächste Challenge</button>` : ''}<button class="btn ghost sm" data-act="fresh">Brett leeren</button></div>` : ''}`;
  if (won && lastWin !== ch.id) { lastWin = ch.id; setStatus('Challenge geschafft!'); }
  if (!won && lastWin === ch.id) lastWin = null;
}
const nextCh = () => { const i = CH.findIndex(c => c.id === S.ch); return CH.slice(i + 1).find(c => !S.done[c.id]) || CH.find(c => !S.done[c.id] && c.id !== S.ch); };
function renderList() {
  const n = CH.filter(c => S.done[c.id]).length;
  $('chprog').textContent = `${n} von ${CH.length} geschafft. Wähle eine Challenge, das Brett bleibt erhalten.`;
  $('chlist').innerHTML = CH.map((c, i) => `<li><button class="ch${S.done[c.id] ? ' done' : ''}" data-ch="${c.id}" aria-current="${c.id === S.ch}"><span class="n">${S.done[c.id] ? '✓' : i + 1}</span><span><b>${c.title}</b></span></button></li>`).join('');
}
function pushUndo() { undoStack.push(JSON.stringify(S.parts)); if (undoStack.length > 50) undoStack.shift(); clearArm = false; $('clear').textContent = 'Alles löschen'; }

function tapPoint(k) {
  const pt = k.split(',').map(Number);
  if (tool === 'select') { setStatus('Wähle oben ein Bauteil, um es zu setzen. Im Auswahlmodus tippst du Bauteile an.'); return; }
  if (!pending) { pending = pt; render(); setStatus(`${TYPES[tool].name}: Tippe jetzt den zweiten Punkt an.`); return; }
  if (key(pending) === k) { pending = null; render(); setStatus('Auswahl aufgehoben.'); return; }
  pushUndo();
  const p = { id: 'p' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), type: tool, a: pending, b: pt };
  if (TYPES[tool].def) p.v = TYPES[tool].def;
  if (tool === 'switch') p.on = false;
  S.parts.push(p); pending = (tool === 'wire') ? pt : null; save();
  const r = render();
  setStatus(`${TYPES[tool].name} gesetzt.${tool === 'wire' ? ' Tippe weiter, um die Leitung fortzusetzen, oder denselben Punkt zum Beenden.' : ''}${r.short ? '' : ''}`);
}
function tapPart(id) {
  const p = S.parts.find(x => x.id === id); if (!p) return;
  if (pending) { pending = null; }
  if (p.type === 'switch' && selected === id) { pushUndo(); p.on = !p.on; save(); render(); setStatus(`Schalter ${p.on ? 'geschlossen' : 'offen'}.`); return; }
  selected = id; render(); setStatus(`${TYPES[p.type].name} ausgewählt.${p.type === 'switch' ? ' Noch einmal antippen schaltet um.' : ''}`);
}
function act(a, el) {
  const p = S.parts.find(x => x.id === selected);
  switch (a) {
    case 'del': if (p) { pushUndo(); S.parts = S.parts.filter(x => x.id !== p.id); selected = null; save(); render(); setStatus('Bauteil entfernt.'); } break;
    case 'flip': if (p) { pushUndo(); [p.a, p.b] = [p.b, p.a]; save(); render(); setStatus('Umgedreht.'); } break;
    case 'toggle': if (p) { pushUndo(); p.on = !p.on; save(); render(); } break;
    case 'repair': if (p) { p.burnt = false; save(); render(); setStatus('Ersetzt. Pass diesmal auf Spannung und Strom auf!'); } break;
    case 'desel': selected = null; render(); break;
    case 'next': { const n = nextCh(); if (n) { S.ch = n.id; save(); renderList(); render(); } break; }
    case 'fresh': pushUndo(); S.parts = []; selected = null; save(); render(); setStatus('Brett geleert.'); break;
  }
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-tool]'); if (t) { tool = t.dataset.tool; pending = null; selected = null; renderPalette(); render(); setStatus(tool === 'select' ? 'Tippe ein Bauteil an.' : `${TYPES[tool].name}: Tippe zwei Punkte an.`); return; }
  const c = e.target.closest('[data-ch]'); if (c) { S.ch = c.dataset.ch; save(); renderList(); render(); $('goal').scrollIntoView({ block: 'nearest' }); return; }
  const a = e.target.closest('[data-act]'); if (a) { act(a.dataset.act, a); return; }
  const part = e.target.closest('[data-part]'); if (part && part.closest('#board')) { const p = S.parts.find(x => x.id === part.dataset.part); if (p && p.type === 'button') return; tapPart(part.dataset.part); return; }
  const pt = e.target.closest('[data-pt]'); if (pt) { tapPoint(pt.dataset.pt); return; }
});
/* Taster: gedrückt halten */
const releaseAll = () => { if (Object.keys(pressed).length) { pressed = {}; render(); } };
document.addEventListener('pointerdown', e => { const part = e.target.closest('[data-part]'); if (!part) return; const p = S.parts.find(x => x.id === part.dataset.part); if (p && p.type === 'button') { pressed[p.id] = true; selected = p.id; render(); setStatus('Taster gedrückt.'); } });
document.addEventListener('pointerup', releaseAll); document.addEventListener('pointercancel', releaseAll);
document.addEventListener('keydown', e => {
  const part = e.target.closest && e.target.closest('[data-part]');
  if (part && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); const p = S.parts.find(x => x.id === part.dataset.part); if (p && p.type === 'button') { pressed[p.id] = true; render(); setTimeout(releaseAll, 600); } else tapPart(part.dataset.part); }
  if (e.key === 'Escape') { pending = null; selected = null; render(); }
  if ((e.key === 'Delete' || e.key === 'Backspace') && selected && !e.target.closest('select')) act('del');
});
document.addEventListener('pointermove', e => { const g = $('ghost'); if (!g) return; const svg = $('svg'), m = svg.getScreenCTM(); if (!m) return; const q = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); g.setAttribute('x2', q.x); g.setAttribute('y2', q.y); });
$('undo').onclick = () => { if (!undoStack.length) { setStatus('Nichts zum Rückgängigmachen.'); return; } S.parts = JSON.parse(undoStack.pop()); selected = null; pending = null; save(); render(); setStatus('Rückgängig gemacht.'); };
$('clear').onclick = () => { if (!S.parts.length) return; if (!clearArm) { clearArm = true; $('clear').textContent = 'Wirklich alles löschen?'; return; } pushUndo(); S.parts = []; selected = null; save(); render(); setStatus('Brett geleert.'); };
window.LAB = { S, simulate, CH, tester, render };
renderPalette(); renderList(); render(); setStatus('Wähle ein Bauteil und tippe zwei Punkte an.');
