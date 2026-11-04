'use strict';
/* =====================================================================
   Schaltwand – Übungswand zum Verdrahten.
   Aufbau:  1. Bauteile (TYPES)   2. Symbole für Stromlaufpläne
            3. Übungen (LEVELS)   4. Simulation   5. Prüfung   6. Oberfläche
   ===================================================================== */

/* ---------- 1. Bauteile ----------
   terms: Klemmen relativ zum Bauteil (f = Richtung, in die die Ader abgeht: -1 oben, 1 unten, 0 seitlich)
   max:   Adern pro Klemme
   input: vom Menschen bedienbar (states) · momentary: Taster (springt zurück)
   load:  Verbraucher zwischen a und b (R in Ohm, Vn Nennspannung)
   source: Spannungsquelle · bridge: alle Klemmen intern verbunden */
const T = {};
const def = (k, o) => { T[k] = o; };
def('battery', { name: 'Batterie', max: 2, source: { p: 'plus', m: 'minus', V: 4.5 },
  terms: { plus: { x: -26, y: -36, label: '+', name: 'Pluspol' }, minus: { x: 26, y: -36, label: '−', name: 'Minuspol' } } });
def('bulb', { name: 'Glühlampe', max: 2, load: { a: 'a', b: 'b', R: 15, Vn: 4.5 },
  terms: { a: { x: -22, y: 40, label: 'X1' }, b: { x: 22, y: 40, label: 'X2' } } });
def('tswitch', { name: 'Schalter', max: 2, states: ['Aus', 'Ein'], contacts: s => s ? [['a', 'b']] : [],
  terms: { a: { x: -28, y: 36, label: '1' }, b: { x: 28, y: 36, label: '2' } } });
def('resistor', { name: 'Widerstand', max: 2, load: { a: 'a', b: 'b', R: 120, Vn: 99 },
  terms: { a: { x: -44, y: 0, f: 1, label: '' }, b: { x: 44, y: 0, f: 1, label: '' } } });
def('led', { name: 'LED', max: 2, load: { a: 'a', b: 'k', R: 100, Vn: 2, diode: true },
  terms: { a: { x: -18, y: 42, label: '+', name: 'Anode (+, langes Bein)' }, k: { x: 18, y: 42, label: '−', name: 'Kathode (−, kurzes Bein)' } } });
def('vmeter', { name: 'Spannungsmesser', max: 1, meter: 'V', load: { a: 'p', b: 'm', R: 1e6, Vn: 99 },
  terms: { p: { x: -22, y: 46, label: 'V', name: 'Buchse V (+)' }, m: { x: 22, y: 46, label: 'COM', name: 'Buchse COM (−)' } } });
def('ameter', { name: 'Strommesser', max: 1, meter: 'A', load: { a: 'p', b: 'm', R: 0.05, Vn: 99 },
  terms: { p: { x: -22, y: 46, label: 'A', name: 'Buchse A (+)' }, m: { x: 22, y: 46, label: 'COM', name: 'Buchse COM (−)' } } });
def('feed', { name: 'Einspeisung', max: 1, source: { p: 'L', m: 'N', V: 230, needsMain: true }, earth: 'PE',
  terms: { L: { x: -42, y: 56, label: 'L', name: 'Außenleiter L' }, N: { x: 0, y: 56, label: 'N', name: 'Neutralleiter N' }, PE: { x: 42, y: 56, label: 'PE', name: 'Schutzleiter PE' } } });
def('aus', { name: 'Ausschalter', max: 1, states: ['Aus', 'Ein'], contacts: s => s ? [['L', 'o']] : [],
  terms: { L: { x: -18, y: -50, label: 'L' }, o: { x: 18, y: -50, label: '↑', name: 'Abgang ↑' } } });
def('serien', { name: 'Serienschalter', max: 1, states: ['beide aus', 'Wippe 1 ein', 'Wippe 2 ein', 'beide ein'], contacts: s => [...(s & 1 ? [['L', 'o1']] : []), ...(s & 2 ? [['L', 'o2']] : [])],
  terms: { L: { x: -26, y: -50, label: 'L' }, o1: { x: 0, y: -50, label: '↑1', name: 'Abgang 1' }, o2: { x: 26, y: -50, label: '↑2', name: 'Abgang 2' } } });
def('wechsel', { name: 'Wechselschalter', max: 1, states: ['Stellung 1', 'Stellung 2'], contacts: s => [['L', s ? 'k2' : 'k1']],
  terms: { L: { x: -26, y: -50, label: 'L', name: 'Mittelkontakt L' }, k1: { x: 0, y: -50, label: '1', name: 'Kontakt 1' }, k2: { x: 26, y: -50, label: '2', name: 'Kontakt 2' } } });
def('kreuz', { name: 'Kreuzschalter', max: 1, states: ['gerade', 'gekreuzt'], contacts: s => s ? [['a1', 'b2'], ['a2', 'b1']] : [['a1', 'b1'], ['a2', 'b2']],
  terms: { a1: { x: -33, y: -50, label: '1' }, a2: { x: -11, y: -50, label: '2' }, b1: { x: 11, y: -50, label: '3' }, b2: { x: 33, y: -50, label: '4' } } });
def('taster', { name: 'Taster', max: 1, momentary: true, states: ['los', 'gedrückt'], contacts: s => s ? [['L', 'o']] : [],
  terms: { L: { x: -18, y: -50, label: 'L' }, o: { x: 18, y: -50, label: '↑' } } });
def('leuchte', { name: 'Leuchte', max: 1, load: { a: 'L', b: 'N', R: 1, Vn: 230 },
  terms: { L: { x: -28, y: 50, label: 'L' }, N: { x: 0, y: 50, label: 'N' }, PE: { x: 28, y: 50, label: 'PE' } } });
def('steckdose', { name: 'Steckdose', max: 1, load: { a: 'L', b: 'N', R: 1, Vn: 230 }, socket: true,
  terms: { L: { x: -26, y: -52, label: 'L' }, N: { x: 0, y: -52, label: 'N' }, PE: { x: 26, y: -52, label: 'PE' } } });
def('ssch', { name: 'Stromstoßschalter', max: 1, relay: 'toggle', coil: ['A1', 'A2'], load: { a: 'A1', b: 'A2', R: 1, Vn: 230, coil: true }, contacts: (s, on) => on ? [['c1', 'c2']] : [],
  terms: { A1: { x: -30, y: -52, label: 'A1' }, A2: { x: -10, y: -52, label: 'A2' }, c1: { x: 10, y: -52, label: '1' }, c2: { x: 30, y: -52, label: '2' } } });
def('bwm', { name: 'Bewegungsmelder', max: 1, states: ['keine Bewegung', 'Bewegung'], relay: 'bwm', load: { a: 'L', b: 'N', R: 50, Vn: 230, coil: true }, contacts: (s, on) => (s && on) ? [['L', 'o']] : [],
  terms: { L: { x: -26, y: -52, label: 'L' }, N: { x: 0, y: -52, label: 'N' }, o: { x: 26, y: -52, label: '↑', name: 'Schaltausgang ↑' } } });
def('trafo', { name: 'Klingeltransformator', max: 1, relay: 'trafo', load: { a: 'L', b: 'N', R: 1, Vn: 230, coil: true }, source: { p: 's1', m: 's2', V: 8, needsRelay: true },
  terms: { L: { x: -24, y: -50, label: 'L' }, N: { x: 24, y: -50, label: 'N' }, s1: { x: -24, y: 50, label: '8V' }, s2: { x: 24, y: 50, label: '0' } } });
def('gong', { name: 'Gong', max: 1, load: { a: 'a', b: 'b', R: 1, Vn: 8 },
  terms: { a: { x: -18, y: -46, label: '1' }, b: { x: 18, y: -46, label: '2' } } });
def('rcd', { name: 'FI-Schutzschalter (RCD)', max: 1, prot: true, states: ['aus', 'ein'], contacts: s => s ? [['Li', 'Lo'], ['Ni', 'No']] : [],
  terms: { Li: { x: -14, y: -44, label: 'L' }, Ni: { x: 14, y: -44, label: 'N' }, Lo: { x: -14, y: 44, label: 'L' }, No: { x: 14, y: 44, label: 'N' } } });
def('ls', { name: 'Leitungsschutzschalter (LS)', max: 1, prot: true, states: ['aus', 'ein'], contacts: s => s ? [['i', 'o']] : [],
  terms: { i: { x: 0, y: -44, label: '1', max: 2, name: 'Eingang 1' }, o: { x: 0, y: 44, label: '2', name: 'Abgang 2' } } });
def('nbar', { name: 'N-Klemmschiene', max: 1, bridge: true, bar: 'blau',
  terms: { p1: { x: -42, y: 0, f: 0 }, p2: { x: -14, y: 0, f: 0 }, p3: { x: 14, y: 0, f: 0 }, p4: { x: 42, y: 0, f: 0 } } });
def('pebar', { name: 'PE-Klemmschiene', max: 1, bridge: true, bar: 'gnge',
  terms: { p1: { x: -42, y: 0, f: 0 }, p2: { x: -14, y: 0, f: 0 }, p3: { x: 14, y: 0, f: 0 }, p4: { x: 42, y: 0, f: 0 } } });
def('wago', { name: 'Verbindungsklemme', max: 1, bridge: true,
  terms: { p1: { x: -20, y: 0, f: 0, name: 'Eingang 1' }, p2: { x: 0, y: 0, f: 0, name: 'Eingang 2' }, p3: { x: 20, y: 0, f: 0, name: 'Eingang 3' } } });
def('wago5', { name: 'Verbindungsklemme (5-fach)', max: 1, bridge: true,
  terms: { p1: { x: -36, y: 0, f: 0 }, p2: { x: -18, y: 0, f: 0 }, p3: { x: 0, y: 0, f: 0 }, p4: { x: 18, y: 0, f: 0 }, p5: { x: 36, y: 0, f: 0 } } });
def('schuetz', { name: 'Schütz', max: 1, relay: 'follow', load: { a: 'A1', b: 'A2', R: 1, Vn: 230, coil: true }, contacts: (s, on) => on ? [['h1', 'h2'], ['n13', 'n14']] : [],
  terms: { A1: { x: -30, y: -50, label: 'A1' }, h1: { x: 0, y: -50, label: '1' }, n13: { x: 30, y: -50, label: '13' },
           A2: { x: -30, y: 50, label: 'A2' }, h2: { x: 0, y: 50, label: '2' }, n14: { x: 30, y: 50, label: '14' } } });
def('tno', { name: 'Taster (Schließer)', max: 1, momentary: true, states: ['los', 'gedrückt'], contacts: s => s ? [['n13', 'n14']] : [],
  terms: { n13: { x: -18, y: -48, label: '13' }, n14: { x: 18, y: -48, label: '14' } } });
def('tnc', { name: 'Taster (Öffner)', max: 1, momentary: true, states: ['los', 'gedrückt'], contacts: s => s ? [] : [['n11', 'n12']],
  terms: { n11: { x: -18, y: -48, label: '11' }, n12: { x: 18, y: -48, label: '12' } } });
def('melde', { name: 'Meldeleuchte', max: 1, load: { a: 'x1', b: 'x2', R: 1, Vn: 230 },
  terms: { x1: { x: -18, y: -44, label: 'X1' }, x2: { x: 18, y: -44, label: 'X2' } } });
def('luefter', { name: 'Lüftermotor', max: 1, load: { a: 'L', b: 'N', R: 1, Vn: 230 },
  terms: { L: { x: -26, y: -52, label: 'L' }, N: { x: 0, y: -52, label: 'N' }, PE: { x: 26, y: -52, label: 'PE' } } });
def('dose', { name: 'Abzweigdose', terms: {} });
def('rail', { name: 'Hutschiene', terms: {} });

const COLORS = {
  rot: { name: 'rot', v: 'var(--w-rot)' }, schwarz: { name: 'schwarz', v: 'var(--w-schwarz)' }, weiss: { name: 'weiß', v: 'var(--w-weiss)' },
  braun: { name: 'braun', v: 'var(--w-braun)' }, grau: { name: 'grau', v: 'var(--w-grau)' },
  blau: { name: 'blau', v: 'var(--w-blau)' }, gnge: { name: 'grün-gelb', v: 'var(--w-gn)' },
};
const AC = ['braun', 'schwarz', 'grau', 'blau', 'gnge'];

/* ---------- 2. Symbole für Stromlaufpläne ---------- */
const S = {
  line: (d, pe) => `<path d="${d}" class="pl${pe ? ' pe' : ''}"/>`,
  dot: (x, y) => `<circle cx="${x}" cy="${y}" r="3" class="dot"/>`,
  t: (x, y, s, cls = '') => `<text x="${x}" y="${y}" class="plbl ${cls}">${s}</text>`,
  lamp: (x, y, l, lx = 16, ly = 4) => `<circle cx="${x}" cy="${y}" r="13" class="mask"/><circle cx="${x}" cy="${y}" r="11" class="sym"/><path d="M${x - 7.8} ${y - 7.8}L${x + 7.8} ${y + 7.8}M${x + 7.8} ${y - 7.8}L${x - 7.8} ${y + 7.8}" class="sym"/>` + S.t(x + lx, y + ly, l),
  meter: (x, y, m, l, lx = 16) => `<circle cx="${x}" cy="${y}" r="13" class="mask"/><circle cx="${x}" cy="${y}" r="11" class="sym"/>` + `<text x="${x}" y="${y + 4.5}" class="plbl" text-anchor="middle">${m}</text>` + S.t(x + lx, y + 4, l),
  res: (x, y, l, v) => `<rect x="${x - 6}" y="${y - 15}" width="12" height="30" class="mask"/><rect x="${x - 6}" y="${y - 15}" width="12" height="30" class="sym"/>` + S.t(x + 12, y + 4, l),
  resH: (x, y, l) => `<rect x="${x - 15}" y="${y - 6}" width="30" height="12" class="mask"/><rect x="${x - 15}" y="${y - 6}" width="30" height="12" class="sym"/>` + S.t(x - 8, y - 12, l),
  led: (x, y, l) => `<rect x="${x - 10}" y="${y - 12}" width="20" height="24" class="mask"/><path d="M${x - 9} ${y - 8}L${x + 9} ${y - 8}L${x} ${y + 7}Z M${x - 9} ${y + 8}H${x + 9}" class="sym"/><path d="M${x + 12} ${y - 2}l8 -6M${x + 12} ${y + 4}l8 -6" class="sym" style="stroke-width:1.5"/>` + S.t(x + 22, y + 12, l),
  swH: (x, y, l) => `<rect x="${x - 13}" y="${y - 4}" width="26" height="8" class="mask"/><path d="M${x - 13} ${y}L${x + 10} ${y - 11}" class="sym"/>` + S.dot(x - 13, y) + S.dot(x + 13, y) + S.t(x - 6, y - 16, l),
  swV: (x, y, l) => `<rect x="${x - 4}" y="${y - 13}" width="8" height="26" class="mask"/><path d="M${x} ${y + 13}L${x - 11} ${y - 10}" class="sym"/>` + S.dot(x, y - 13) + S.dot(x, y + 13) + S.t(x + 10, y + 4, l),
  tasterV: (x, y, l) => `<rect x="${x - 4}" y="${y - 13}" width="8" height="26" class="mask"/><path d="M${x} ${y + 13}L${x - 11} ${y - 10}M${x - 6} ${y}H${x - 18}M${x - 18} ${y - 5}V${y + 5}" class="sym"/>` + S.dot(x, y - 13) + S.dot(x, y + 13) + S.t(x + 10, y + 4, l),
  oeffnerV: (x, y, l) => `<rect x="${x - 4}" y="${y - 13}" width="8" height="26" class="mask"/><path d="M${x} ${y + 13}L${x + 8} ${y - 12}M${x} ${y - 13}H${x + 10}M${x + 4} ${y}H${x - 14}M${x - 14} ${y - 5}V${y + 5}" class="sym"/>` + S.dot(x, y - 13) + S.dot(x, y + 13) + S.t(x + 14, y + 4, l),
  coil: (x, y, l) => `<rect x="${x - 12}" y="${y - 8}" width="24" height="16" class="mask"/><rect x="${x - 12}" y="${y - 8}" width="24" height="16" class="sym"/>` + S.t(x + 16, y + 4, l),
  sock: (x, y, l) => `<rect x="${x - 12}" y="${y - 12}" width="24" height="18" class="mask"/><path d="M${x - 11} ${y + 4}A11 11 0 0 1 ${x + 11} ${y + 4}M${x} ${y - 7}V${y - 14}" class="sym"/>` + S.t(x + 16, y + 4, l),
  bat: (x, y, l) => `<rect x="${x - 16}" y="${y - 7}" width="32" height="14" class="mask"/><path d="M${x - 15} ${y - 5}H${x + 15}" class="sym"/><path d="M${x - 7} ${y + 5}H${x + 7}" class="sym" style="stroke-width:5"/>` + S.t(x - 30, y - 6, '+') + S.t(x - 30, y + 12, '−') + S.t(x + 20, y + 4, l),
  box: (x, y, w, h, l) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" class="mask"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="4" class="sym"/><text x="${x}" y="${y + 4}" class="plbl" text-anchor="middle">${l}</text>`,
  motor: (x, y, l) => `<circle cx="${x}" cy="${y}" r="13" class="mask"/><circle cx="${x}" cy="${y}" r="12" class="sym"/><text x="${x}" y="${y + 4.5}" class="plbl" text-anchor="middle">M</text>` + S.t(x + 18, y + 4, l),
  gong: (x, y, l) => `<rect x="${x - 12}" y="${y - 10}" width="24" height="20" class="mask"/><path d="M${x - 11} ${y + 6}H${x + 11}M${x - 8} ${y + 6}V${y - 2}A8 8 0 0 1 ${x + 8} ${y - 2}V${y + 6}" class="sym"/>` + S.t(x + 16, y + 4, l),
  rails: (top, bot, x1 = 28, x2 = 240, pe) => S.line(`M${x1} ${top}H${x2}`) + S.t(4, top + 4, 'L1') + S.line(`M${x1} ${bot}H${x2}`) + S.t(4, bot + 4, 'N') + (pe ? S.line(`M${x1} ${pe}H${x2}`, 1) + S.t(4, pe + 4, 'PE', 'pe') : ''),
};
const plan = (w, h, body, label = 'Stromlaufplan') => `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
const loop = 'M50 40H210V160H50Z';

/* ---------- 3. Übungen ---------- */
const lit = (r, id) => r.lamps[id] && r.lamps[id].b > 0.5;
const dim = (r, id) => r.lamps[id] && r.lamps[id].b > 0.12 && r.lamps[id].b < 0.45;
const dark = (r, id) => !r.lamps[id] || r.lamps[id].b < 0.05;
const DOSE = (x, y, n, w = 170, five = []) => {
  const h = 40 + n * 36, top = y - h / 2 + 34;
  return [{ id: 'dose', type: 'dose', x, y, w, h }, ...[...Array(n)].map((_, i) => ({ id: 'k' + (i + 1), type: five.includes(i + 1) ? 'wago5' : 'wago', x, y: top + i * 36 }))];
};
const FEED = (x = 100, y = 78, label) => ({ id: 'ein', type: 'feed', x, y, label: label || 'Einspeisung' });
const G = { dc: 'Strom verstehen (Batterie 4,5 V)', haus: 'Hausinstallation 230 V', vt: 'Sicherungskasten (Verteiler)', ss: 'Schaltschrank: Schütz und Taster' };
const STD_AC_HINT = 'An jede Geräteklemme passt nur eine Ader. Zusammengeführt wird in der Abzweigdose mit Verbindungsklemmen.';

const LEVELS = [
/* ---- Strom verstehen ---- */
{ id: 'kreis', kind: 'dc', group: G.dc, title: 'Der erste Stromkreis', short: 'Batterie, Lampe, zwei Adern',
  goal: 'Bringe die Lampe E1 zum Leuchten.',
  intro: 'Strom fließt nur in einem <b>geschlossenen Stromkreis</b>: vom Pluspol (+) der Batterie über eine Ader zur Lampe, durch den Glühfaden und über eine zweite Ader zurück zum Minuspol (−). Stell dir Wasser im Kreislauf vor: Die Batterie ist die Pumpe, die Adern sind Rohre.',
  comps: [{ id: 'g1', type: 'battery', x: 150, y: 330, label: 'G1' }, { id: 'e1', type: 'bulb', x: 430, y: 160, label: 'E1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.lamp(210, 100, 'E1', -36)),
  hints: ['Tippe auf die Plus-Klemme der Batterie und danach auf eine Klemme der Lampe. Dann liegt dazwischen eine Ader.', 'Die zweite Ader führt von der anderen Lampenklemme zurück zum Minuspol.'],
  test: (X, E) => { if (!lit(X.run(), 'e1')) E.push('E1 leuchtet nicht. Der Stromkreis ist noch nicht geschlossen: Der Strom muss von + durch die Lampe zurück zu − fließen können.'); },
  learn: 'Ein Stromkreis braucht eine Spannungsquelle, einen Verbraucher und einen geschlossenen Weg hin und zurück. Probier es aus: Wähle „Ader lösen“ und tippe eine Ader an. Die Lampe geht sofort aus.' },

{ id: 'schalter', kind: 'dc', group: G.dc, title: 'Stromkreis mit Schalter', short: 'Ein Schalter unterbricht den Kreis',
  goal: 'E1 soll nur leuchten, wenn S1 eingeschaltet ist.',
  intro: 'Ein Schalter <b>öffnet oder schließt</b> den Stromkreis. Er sitzt <b>in Reihe</b> zur Lampe, also in einer der beiden Adern. Tippe auf den Schalter, um ihn umzuschalten.',
  comps: [{ id: 'g1', type: 'battery', x: 130, y: 330, label: 'G1' }, { id: 's1', type: 'tswitch', x: 300, y: 150, label: 'S1' }, { id: 'e1', type: 'bulb', x: 480, y: 160, label: 'E1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.swH(130, 40, 'S1') + S.lamp(210, 100, 'E1', -36)),
  hints: ['Verbinde + mit Klemme 1 des Schalters.', 'Von Klemme 2 des Schalters geht es zur Lampe. Die andere Lampenklemme verbindest du mit −.', 'Tippe auf den Schalter, um ihn ein- und auszuschalten.'],
  test: (X, E) => { const a = X.run({ s1: 0 }), b = X.run({ s1: 1 });
    if (!lit(a, 'e1') && !lit(b, 'e1')) E.push('E1 leuchtet in keiner Schalterstellung. Ist der Kreis über den Schalter geschlossen?');
    else if (lit(a, 'e1')) E.push('E1 leuchtet auch bei ausgeschaltetem S1. Der Schalter liegt nicht im Stromkreis: Er muss eine der beiden Adern unterbrechen.'); },
  learn: 'Offener Schalter heißt offener Stromkreis, also fließt kein Strom. Der Schalter ist zur Lampe in Reihe geschaltet.' },

{ id: 'reihe', kind: 'dc', group: G.dc, title: 'Reihenschaltung', short: 'Zwei Lampen hintereinander',
  goal: 'Schalte E1 und E2 in Reihe.',
  intro: 'In der <b>Reihenschaltung</b> fließt der Strom nacheinander durch alle Verbraucher. Es gibt nur <b>einen</b> Weg. Die Spannung teilt sich auf: Bei zwei gleichen Lampen bekommt jede die Hälfte.',
  comps: [{ id: 'g1', type: 'battery', x: 130, y: 330, label: 'G1' }, { id: 'e1', type: 'bulb', x: 320, y: 150, label: 'E1' }, { id: 'e2', type: 'bulb', x: 490, y: 150, label: 'E2' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.lamp(110, 40, 'E1', -8, -18) + S.lamp(170, 40, 'E2', -8, -18)),
  hints: ['Ein einziger Weg: + → E1 → E2 → −.', 'Zwischen den Lampen brauchst du eine Ader von X2 (E1) zu X1 (E2).'],
  test: (X, E) => { const r = X.run();
    if (lit(r, 'e1') && lit(r, 'e2')) E.push('Beide Lampen leuchten hell. Das ist eine Parallelschaltung. In der Reihenschaltung fließt der Strom erst durch E1 und dann durch E2.');
    else if (dim(r, 'e1') && dim(r, 'e2')) return;
    else if (lit(r, 'e1') || lit(r, 'e2')) E.push('Nur eine Lampe leuchtet. Die zweite Lampe muss im selben Weg liegen, zwischen der ersten Lampe und der Batterie.');
    else E.push('Keine Lampe leuchtet. Der Kreis + → E1 → E2 → − ist noch nicht geschlossen.'); },
  learn: 'Beide Lampen leuchten schwächer, weil jede nur 2,25 V bekommt. Der Strom ist überall gleich groß. Fällt eine Lampe aus, gehen beide aus. Probier es: Löse die Ader zwischen den Lampen.' },

{ id: 'parallel', kind: 'dc', group: G.dc, title: 'Parallelschaltung', short: 'Zwei Lampen nebeneinander',
  goal: 'Schalte E1 und E2 parallel, sodass beide hell leuchten.',
  intro: 'In der <b>Parallelschaltung</b> liegt jeder Verbraucher direkt an der <b>vollen Spannung</b>. Der Strom teilt sich auf mehrere Wege auf. An jede Lampenklemme passen zwei Adern.',
  comps: [{ id: 'g1', type: 'battery', x: 130, y: 330, label: 'G1' }, { id: 'e1', type: 'bulb', x: 320, y: 150, label: 'E1' }, { id: 'e2', type: 'bulb', x: 490, y: 150, label: 'E2' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.line('M140 40V160') + S.dot(140, 40) + S.dot(140, 160) + S.bat(50, 100, 'G1') + S.lamp(140, 100, 'E1') + S.lamp(210, 100, 'E2', -36)),
  hints: ['Jede Lampe braucht ihre eigene Verbindung zu + und zu −.', '+ → X1 von E1, dann X1 von E1 → X1 von E2. Genauso unten: − → X2 von E1, X2 von E1 → X2 von E2.'],
  test: (X, E) => { const r = X.run();
    if (lit(r, 'e1') && lit(r, 'e2')) return;
    if (dim(r, 'e1') && dim(r, 'e2')) E.push('Beide Lampen leuchten nur schwach. Das ist eine Reihenschaltung. Jede Lampe soll direkt mit + und mit − verbunden sein.');
    else if (lit(r, 'e1') || lit(r, 'e2')) E.push('Nur eine Lampe leuchtet hell. Die zweite Lampe braucht auch eine eigene Verbindung zu + und zu −.');
    else E.push('Keine Lampe leuchtet hell. Verbinde jede Lampe mit + und mit −.'); },
  learn: 'Jede Lampe bekommt die vollen 4,5 V. Fällt eine aus, leuchtet die andere weiter. So sind auch Leuchten und Steckdosen im Haus angeschlossen.' },

{ id: 'spannung', kind: 'dc', group: G.dc, title: 'Spannung messen', short: 'Voltmeter parallel anschließen',
  goal: 'E1 soll leuchten und P1 soll die Spannung an der Lampe anzeigen.',
  intro: 'Spannung ist der <b>Unterschied</b> zwischen zwei Punkten. Darum misst du sie <b>parallel</b>: eine Messleitung an jede Seite der Lampe. Rote Buchse <b>V</b> zum Pluspol, schwarze Buchse <b>COM</b> zum Minuspol. Der Spannungsmesser hat einen sehr großen Innenwiderstand, es fließt kaum Strom durch ihn.',
  comps: [{ id: 'g1', type: 'battery', x: 120, y: 340, label: 'G1' }, { id: 'e1', type: 'bulb', x: 300, y: 150, label: 'E1' }, { id: 'p1', type: 'vmeter', x: 490, y: 300, label: 'P1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.line('M210 40H240V160H210') + S.bat(50, 100, 'G1') + S.lamp(160, 40, 'E1', -8, -18) + S.line('M160 40V0', 0) + S.meter(240, 100, 'V', 'P1', -30)),
  hints: ['Baue zuerst den Stromkreis mit der Lampe wie in Übung 1.', 'Dann: Buchse V an die Lampenklemme, die mit + verbunden ist. Buchse COM an die andere Lampenklemme.'],
  test: (X, E) => { const r = X.run(), m = r.meters.p1;
    if (!lit(r, 'e1')) { E.push(m && Math.abs(m.v) > 4 ? 'E1 leuchtet nicht, aber P1 zeigt fast 4,5 V. Der Spannungsmesser liegt in Reihe. Er hat einen riesigen Widerstand und sperrt den Strom. Spannung misst man parallel.' : 'E1 leuchtet nicht. Baue zuerst den geschlossenen Stromkreis mit der Lampe.'); return; }
    if (!m || Math.abs(m.v) < 0.5) E.push('P1 zeigt keine Spannung. Schließe die beiden Messleitungen links und rechts an die Lampe an (parallel).');
    else if (m.v < 0) E.push('P1 zeigt eine negative Spannung. Die Messleitungen sind vertauscht: V an die Plus-Seite, COM an die Minus-Seite.'); },
  learn: 'Der Spannungsmesser zeigt 4,5 V: Die ganze Batteriespannung liegt an der Lampe. Spannung misst man immer parallel. Probier es: Häng P1 in Reihe statt parallel und schau, was mit der Lampe passiert.' },

{ id: 'strom', kind: 'dc', group: G.dc, title: 'Strom messen', short: 'Amperemeter in Reihe einbauen',
  goal: 'E1 soll leuchten und P1 soll den Strom durch die Lampe anzeigen.',
  intro: 'Strom fließt <b>durch</b> den Kreis. Darum muss der Strommesser <b>in den Kreis hinein</b>: in Reihe. Du trennst den Kreis an einer Stelle auf und setzt das Messgerät dazwischen. Ein Strommesser hat fast keinen Widerstand. <b>Niemals parallel</b> an die Batterie, das wäre ein Kurzschluss!',
  comps: [{ id: 'g1', type: 'battery', x: 120, y: 340, label: 'G1' }, { id: 'e1', type: 'bulb', x: 300, y: 150, label: 'E1' }, { id: 'p1', type: 'ameter', x: 490, y: 300, label: 'P1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.lamp(130, 40, 'E1', -8, -18) + S.meter(210, 100, 'A', 'P1', -32)),
  hints: ['Der Strom muss nacheinander durch Lampe und Messgerät fließen: + → E1 → P1 → −.', 'Von X2 der Lampe zur Buchse A, von der Buchse COM zum Minuspol.'],
  test: (X, E) => { const r = X.run(), m = r.meters.p1;
    if (m && m.blown) { E.push('Die Sicherung im Messgerät ist durchgebrannt! Der Strommesser lag direkt an der Batterie (parallel). Das ist fast ein Kurzschluss. Strom misst man in Reihe.'); return; }
    if (!lit(r, 'e1')) { E.push('E1 leuchtet nicht. Der Strom muss von + durch E1 und durch P1 zurück zu − fließen.'); return; }
    if (!m || Math.abs(m.i) < 0.05) E.push('E1 leuchtet, aber P1 zeigt keinen Strom. Das Messgerät liegt nicht im Stromkreis. Trenne den Kreis auf und setze P1 dazwischen.');
    else if (m.i < 0) E.push('P1 zeigt einen negativen Strom. A-Buchse und COM sind vertauscht.'); },
  learn: 'P1 zeigt 0,30 A. Das passt zum ohmschen Gesetz: I = U / R = 4,5 V / 15 Ω = 0,3 A. Strom misst man immer in Reihe, und vorher den Kreis auftrennen.' },

{ id: 'led', kind: 'dc', group: G.dc, title: 'LED mit Vorwiderstand', short: 'Polung und Strombegrenzung',
  goal: 'Lass die LED V1 leuchten, ohne dass sie durchbrennt.',
  intro: 'Eine LED leuchtet nur in einer Richtung: <b>Anode (+, langes Bein)</b> zum Pluspol. Sie braucht immer einen <b>Vorwiderstand</b>, der den Strom begrenzt. Ohne ihn bekommt sie zu viel Spannung und brennt durch.',
  comps: [{ id: 'g1', type: 'battery', x: 120, y: 340, label: 'G1' }, { id: 'r1', type: 'resistor', x: 300, y: 140, label: 'R1' }, { id: 'v1', type: 'led', x: 480, y: 170, label: 'V1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.resH(130, 40, 'R1 120 Ω') + S.led(210, 100, 'V1')),
  hints: ['Reihenschaltung: + → R1 → LED → −.', 'Achte auf die Polung: Die Klemme „+“ der LED (Anode) muss zum Pluspol der Batterie zeigen.'],
  test: (X, E) => { const r = X.run(), l = r.lamps.v1;
    if (l && l.burnt) { E.push('Die LED ist durchgebrannt: Sie hat die ganze Batteriespannung bekommen. Setze den Vorwiderstand R1 in Reihe zur LED.'); return; }
    if (l && l.reverse) { E.push('Die LED ist falsch herum eingebaut. Die Anode (+) muss zum Pluspol der Batterie zeigen.'); return; }
    if (!l || l.b < 0.5) E.push('Die LED leuchtet nicht. Der Kreis + → R1 → LED → − muss geschlossen sein.'); },
  learn: 'Am Vorwiderstand fallen etwa 2,5 V ab, an der LED etwa 2 V. Formel: R = (U − U_LED) / I. Probier aus: Nimm R1 raus oder dreh die LED um.' },

{ id: 'und', kind: 'dc', group: G.dc, title: 'UND-Schaltung', short: 'Zwei Schalter in Reihe',
  goal: 'E1 soll nur leuchten, wenn S1 UND S2 eingeschaltet sind.',
  intro: 'Zwei Schalter <b>in Reihe</b>: Der Strom muss durch beide. So funktioniert die <b>UND</b>-Verknüpfung (LF 3). Beispiel aus dem Alltag: Eine Maschine startet nur, wenn die Schutzhaube zu ist UND der Startknopf gedrückt wird.',
  comps: [{ id: 'g1', type: 'battery', x: 120, y: 340, label: 'G1' }, { id: 's1', type: 'tswitch', x: 240, y: 150, label: 'S1' }, { id: 's2', type: 'tswitch', x: 390, y: 150, label: 'S2' }, { id: 'e1', type: 'bulb', x: 520, y: 260, label: 'E1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.bat(50, 100, 'G1') + S.swH(100, 40, 'S1') + S.swH(160, 40, 'S2') + S.lamp(210, 100, 'E1', -36)),
  hints: ['+ → S1 → S2 → E1 → −. Alles hintereinander.'],
  test: (X, E) => { const c = X.combos(); const bad = c.find(x => lit(x.r, 'e1') !== !!(x.inp.s1 && x.inp.s2));
    if (bad) E.push(c.every(x => !lit(x.r, 'e1')) ? 'E1 leuchtet nie. Ist der Kreis über beide Schalter geschlossen?' : `Bei ${X.desc(bad.inp)} ist E1 ${lit(bad.r, 'e1') ? 'an' : 'aus'}. Bei UND darf E1 nur leuchten, wenn beide Schalter ein sind. Schalte S1 und S2 in Reihe.`); },
  learn: 'Reihenschaltung von Schließern = UND. In der Wahrheitstabelle ist der Ausgang nur bei 1 und 1 gleich 1.' },

{ id: 'oder', kind: 'dc', group: G.dc, title: 'ODER-Schaltung', short: 'Zwei Schalter parallel',
  goal: 'E1 soll leuchten, wenn S1 ODER S2 (oder beide) eingeschaltet ist.',
  intro: 'Zwei Schalter <b>parallel</b>: Der Strom hat zwei Wege, einer reicht. Das ist die <b>ODER</b>-Verknüpfung. Beispiel: Eine Klingel kann an der Haustür oder an der Wohnungstür ausgelöst werden.',
  comps: [{ id: 'g1', type: 'battery', x: 120, y: 340, label: 'G1' }, { id: 's1', type: 'tswitch', x: 290, y: 110, label: 'S1' }, { id: 's2', type: 'tswitch', x: 290, y: 250, label: 'S2' }, { id: 'e1', type: 'bulb', x: 500, y: 200, label: 'E1' }],
  colors: ['rot', 'schwarz'],
  plan: () => plan(260, 200, S.line(loop) + S.line('M90 40V80H170V40') + S.dot(90, 40) + S.dot(170, 40) + S.bat(50, 100, 'G1') + S.swH(130, 40, 'S1') + S.swH(130, 80, 'S2') + S.lamp(210, 100, 'E1', -36)),
  hints: ['Klemme 1 von S1 und Klemme 1 von S2 bekommen beide Plus.', 'Klemme 2 von S1 und Klemme 2 von S2 gehen beide zur Lampe.'],
  test: (X, E) => { const c = X.combos(); const bad = c.find(x => lit(x.r, 'e1') !== !!(x.inp.s1 || x.inp.s2));
    if (bad) E.push(c.every(x => !lit(x.r, 'e1')) ? 'E1 leuchtet nie. Ist der Kreis geschlossen?' : `Bei ${X.desc(bad.inp)} ist E1 ${lit(bad.r, 'e1') ? 'an' : 'aus'}. Bei ODER reicht ein Schalter. Schalte S1 und S2 parallel.`); },
  learn: 'Parallelschaltung von Schließern = ODER. Der Ausgang ist 1, sobald mindestens ein Eingang 1 ist.' },

/* ---- Hausinstallation ---- */
{ id: 'steckdose', kind: 'ac', group: G.haus, title: 'Steckdose anschließen', short: 'L, N und PE richtig anklemmen',
  goal: 'Schließe die Schutzkontakt-Steckdose X1 über die Abzweigdose an.',
  intro: 'Eine Schutzkontakt-Steckdose hat drei Anschlüsse: <b>L</b> (Außenleiter, braun), <b>N</b> (Neutralleiter, blau) und <b>PE</b> (Schutzleiter, grün-gelb) an die Schutzkontakte. ' + STD_AC_HINT,
  comps: [FEED(), ...DOSE(300, 226, 3), { id: 'x1', type: 'steckdose', x: 470, y: 390, label: 'X1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 160, 28, 240, 182) + S.line('M130 30V160') + S.dot(130, 30) + S.dot(130, 160) + S.sock(130, 95, 'X1') + S.line('M130 95H170V182', 1) + S.dot(170, 182)),
  hints: ['K1: L der Einspeisung und L der Steckdose (braun).', 'K2: N und N (blau). K3: PE und PE (grün-gelb).'],
  test: (X, E) => { const r = X.run(); if (!lit(r, 'x1')) E.push('An der Steckdose liegen keine 230 V an. L und N müssen beide angeschlossen sein.'); X.ac(E, {}); },
  learn: 'Die Steckdose führt dauernd Spannung. Der Schutzleiter an den Schutzkontakten sorgt dafür, dass bei einem Fehler im Gerät die Sicherung oder der FI abschaltet.' },

{ id: 'aus', kind: 'ac', group: G.haus, title: 'Ausschaltung', short: 'Eine Leuchte, ein Schalter',
  goal: 'E1 soll sich mit S1 ein- und ausschalten lassen.',
  intro: 'Die <b>Ausschaltung</b> ist die einfachste Lichtschaltung: Eine Leuchte wird von einer Stelle aus geschaltet. Der Schalter unterbricht immer den <b>Außenleiter L</b>, nie den Neutralleiter N. ' + STD_AC_HINT,
  comps: [FEED(110, 78), { id: 'e1', type: 'leuchte', x: 490, y: 78, label: 'E1' }, ...DOSE(300, 226, 4), { id: 's1', type: 'aus', x: 470, y: 400, label: 'S1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 160, 28, 240, 182) + S.line('M130 30V160') + S.dot(130, 30) + S.dot(130, 160) + S.swV(130, 72, 'S1') + S.lamp(130, 118, 'E1', -38) + S.line('M141 118H175V182', 1) + S.dot(175, 182)),
  hints: [STD_AC_HINT, 'K1: L der Einspeisung und L des Schalters (braun).', 'K2: Abgang ↑ des Schalters und L der Leuchte. Das ist der geschaltete Außenleiter (schwarz).', 'K3: N der Einspeisung und N der Leuchte (blau). K4: PE und PE (grün-gelb).'],
  test: (X, E) => { const a = X.run({ s1: 0 }), b = X.run({ s1: 1 });
    if (!lit(a, 'e1') && !lit(b, 'e1')) E.push('E1 leuchtet in keiner Schalterstellung. Verfolge den Weg: L → Schalter → Leuchte (L) und Leuchte (N) → N.');
    else if (lit(a, 'e1') && lit(b, 'e1')) E.push('E1 leuchtet immer. Der Schalter liegt nicht im Weg zur Leuchte.');
    X.ac(E, { switched: ['e1'] }); },
  learn: 'Vom Schalter zur Leuchte führt der geschaltete Außenleiter, meist schwarz. Ist S1 aus, liegt an der Leuchte keine Spannung an. Genau deshalb wird L geschaltet und nicht N.' },

{ id: 'aus-steckdose', kind: 'ac', group: G.haus, title: 'Schalter-Steckdosen-Kombination', short: 'Licht schalten, Steckdose dauernd an',
  goal: 'E1 soll mit S1 schaltbar sein. Die Steckdose X1 soll immer Spannung haben.',
  intro: 'Wie neben jeder Zimmertür: unten der Lichtschalter, daneben eine Steckdose. Beide hängen am selben Stromkreis. Die Steckdose bekommt L, N und PE <b>direkt</b>, die Leuchte bekommt L nur über den Schalter.',
  comps: [FEED(100, 78), { id: 'e1', type: 'leuchte', x: 500, y: 78, label: 'E1' }, ...DOSE(300, 225, 4), { id: 's1', type: 'aus', x: 180, y: 400, label: 'S1' }, { id: 'x1', type: 'steckdose', x: 430, y: 400, label: 'X1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 160, 28, 240, 182) + S.line('M100 30V160M180 30V160') + S.dot(100, 30) + S.dot(100, 160) + S.dot(180, 30) + S.dot(180, 160) + S.swV(100, 72, 'S1') + S.lamp(100, 118, 'E1', -38) + S.sock(180, 100, 'X1') + S.line('M111 118H140V182M180 100H215V182', 1) + S.dot(140, 182) + S.dot(215, 182)),
  hints: ['Jede Verbindungsklemme hat drei Eingänge. Für L brauchst du drei: Einspeisung, Schalter, Steckdose.', 'K1 (L): Einspeisung L, S1 L, X1 L. K2 (geschaltet): S1 ↑ und E1 L.', 'K3 (N): Einspeisung N, E1 N, X1 N. K4 (PE): Einspeisung PE, E1 PE, X1 PE.'],
  test: (X, E) => { const a = X.run({ s1: 0 }), b = X.run({ s1: 1 });
    if (!lit(b, 'e1')) E.push('E1 leuchtet nicht, wenn S1 eingeschaltet ist.');
    else if (lit(a, 'e1')) E.push('E1 leuchtet auch bei ausgeschaltetem S1. Die Leuchte darf L nur über den Schalter bekommen.');
    if (!lit(a, 'x1') || !lit(b, 'x1')) E.push('Die Steckdose X1 hat nicht immer Spannung. Sie muss direkt an L und N hängen, nicht hinter dem Schalter.');
    X.ac(E, { switched: ['e1'] }); },
  learn: 'Die Steckdose ist ungeschaltet, die Leuchte geschaltet. Beide teilen sich N und PE. So sieht fast jede Zimmerinstallation aus.' },

{ id: 'serien', kind: 'ac', group: G.haus, title: 'Serienschaltung', short: 'Zwei Leuchten, ein Doppelschalter',
  goal: 'Wippe 1 von S1 soll E1 schalten, Wippe 2 soll E2 schalten.',
  intro: 'Der <b>Serienschalter</b> hat zwei Wippen und drei Klemmen: <b>L</b> (gemeinsamer Eingang), <b>↑1</b> und <b>↑2</b>. Damit schaltest du zwei Leuchten oder Leuchtengruppen getrennt von einer Stelle, z. B. einen Kronleuchter. Tippe auf S1, um die Stellungen durchzugehen.',
  comps: [FEED(100, 78), { id: 'e1', type: 'leuchte', x: 345, y: 78, label: 'E1' }, { id: 'e2', type: 'leuchte', x: 515, y: 78, label: 'E2' }, ...DOSE(300, 250, 4), { id: 's1', type: 'serien', x: 500, y: 405, label: 'S1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 160, 28, 240, 182) + S.line('M110 30V52M110 52L96 72M110 52L124 72M96 72V160M124 72V160') + S.dot(110, 30) + S.dot(110, 52) + S.dot(96, 160) + S.dot(124, 160) + S.t(132, 56, 'S1') + S.lamp(96, 118, 'E1', -36) + S.lamp(124, 118, 'E2', 16) + S.line('M135 118H190V182', 1) + S.dot(190, 182)),
  hints: ['K1 (L): Einspeisung L und L von S1.', '↑1 von S1 zu L von E1, ↑2 von S1 zu L von E2 (schwarz oder grau). Das geht direkt ohne Klemme.', 'K2 (N, drei Eingänge): Einspeisung N, E1 N, E2 N. K3 (PE): Einspeisung PE, E1 PE, E2 PE.'],
  test: (X, E) => { const c = X.combos();
    const ok = (m1, m2) => c.every(x => lit(x.r, 'e1') === !!(x.inp.s1 & m1) && lit(x.r, 'e2') === !!(x.inp.s1 & m2));
    if (!ok(1, 2) && !ok(2, 1)) E.push(c.every(x => dark(x.r, 'e1') && dark(x.r, 'e2')) ? 'Keine Leuchte geht an. L muss an die Klemme L des Serienschalters, die Abgänge ↑1 und ↑2 zu den Leuchten.' : 'Jede Wippe soll genau eine Leuchte schalten. Prüfe: ↑1 → E1, ↑2 → E2, und L der Einspeisung an L von S1.');
    X.ac(E, { switched: ['e1', 'e2'] }); },
  learn: 'Ein Schalter, zwei getrennte Stromwege. Die Leitung zum Serienschalter braucht dafür eine Ader mehr als bei der Ausschaltung.' },

{ id: 'wechsel', kind: 'ac', group: G.haus, title: 'Wechselschaltung (Treppenhaus)', short: 'Eine Leuchte von zwei Stellen',
  goal: 'E1 soll sich mit S1 und mit S2 umschalten lassen, egal wie der andere Schalter steht.',
  intro: 'Mit der <b>Wechselschaltung</b> schaltest du eine Leuchte von zwei Stellen aus, zum Beispiel unten und oben an der Treppe. Du brauchst zwei <b>Wechselschalter</b>. Die beiden Adern zwischen den Schaltern heißen <b>korrespondierende Adern</b>.',
  comps: [FEED(110, 78), { id: 'e1', type: 'leuchte', x: 490, y: 78, label: 'E1' }, ...DOSE(300, 222, 5), { id: 's1', type: 'wechsel', x: 120, y: 405, label: 'S1' }, { id: 's2', type: 'wechsel', x: 480, y: 405, label: 'S2' }],
  colors: AC,
  plan: () => plan(260, 215, S.rails(24, 186, 28, 240, 204) +
    S.line('M130 24V50') + S.dot(130, 24) + S.line('M130 50L119 72') + S.dot(130, 50) + S.dot(118, 74) + S.dot(142, 74) + S.t(150, 62, 'S1') +
    S.line('M118 74V114M142 74V114') + S.dot(118, 114) + S.dot(142, 114) + S.line('M130 138L119 116') + S.dot(130, 138) + S.t(150, 132, 'S2') +
    S.line('M130 138V186') + S.dot(130, 186) + S.lamp(130, 162, 'E1', -38) + S.line('M141 162H175V204', 1) + S.dot(175, 204)),
  hints: ['L der Einspeisung über eine Verbindungsklemme zum Mittelkontakt L von S1.', 'Korrespondierende Adern: Kontakt 1 von S1 zu Kontakt 1 von S2 und Kontakt 2 zu Kontakt 2 (schwarz oder grau), über je eine Klemme.', 'Mittelkontakt L von S2 über eine Klemme zu L der Leuchte.', 'N (blau) und PE (grün-gelb) wie bei der Ausschaltung. Du brauchst alle 5 Klemmen.'],
  test: (X, E) => { const st = X.combos().map(x => ({ a: x.inp.s1, b: x.inp.s2, on: lit(x.r, 'e1') }));
    if (st.every(x => !x.on)) E.push('E1 leuchtet in keiner der 4 Schalterstellungen. Prüfe den Weg: L → S1 (Mitte) → korrespondierende Adern → S2 (Mitte) → Leuchte.');
    else if (st.every(x => x.on)) E.push('E1 leuchtet immer. Die Schalter liegen nicht im Weg zur Leuchte.');
    else if (!st.every(x => x.on === (x.a === x.b)) && !st.every(x => x.on === (x.a !== x.b))) E.push('E1 lässt sich nicht von beiden Stellen aus umschalten. Prüfe die korrespondierenden Adern (Kontakte 1 und 2) und die Mittelkontakte L.');
    X.ac(E, { switched: ['e1'] }); },
  learn: 'Eine Wechselschaltung hat 4 Schaltzustände. Die Leuchte brennt, wenn beide Schalter auf dieselbe korrespondierende Ader zeigen.' },

{ id: 'kreuz', kind: 'ac', group: G.haus, title: 'Kreuzschaltung', short: 'Eine Leuchte von drei Stellen',
  goal: 'E1 soll sich mit S1, S2 und S3 umschalten lassen.',
  intro: 'Für drei oder mehr Schaltstellen kommt ein <b>Kreuzschalter</b> zwischen die beiden Wechselschalter. Er hat vier Klemmen: <b>1 und 2</b> kommen von S1, <b>3 und 4</b> gehen weiter zu S3. In einer Stellung verbindet er gerade (1–3, 2–4), in der anderen über Kreuz (1–4, 2–3).',
  comps: [FEED(95, 78), { id: 'e1', type: 'leuchte', x: 505, y: 78, label: 'E1' }, ...DOSE(300, 210, 5, 170, [3, 4]), { id: 's1', type: 'wechsel', x: 95, y: 405, label: 'S1' }, { id: 's2', type: 'kreuz', x: 300, y: 405, label: 'S2' }, { id: 's3', type: 'wechsel', x: 505, y: 405, label: 'S3' }],
  colors: AC,
  plan: () => plan(260, 230, S.rails(20, 200, 28, 240, 218) +
    S.line('M130 20V40L119 58') + S.dot(130, 20) + S.dot(130, 40) + S.dot(118, 60) + S.dot(142, 60) + S.t(150, 50, 'S1') +
    S.line('M118 60V80M142 60V80') + S.box(130, 96, 40, 30, 'S2') + S.line('M118 112V132M142 112V132') +
    S.dot(118, 132) + S.dot(142, 132) + S.line('M130 154L119 134') + S.dot(130, 154) + S.t(150, 148, 'S3') +
    S.line('M130 154V200') + S.dot(130, 200) + S.lamp(130, 178, 'E1', -38) + S.line('M141 178H175V218', 1) + S.dot(175, 218)),
  hints: ['Wie die Wechselschaltung, nur liegt S2 in den korrespondierenden Adern.', 'S1 Kontakt 1 → S2 Klemme 1, S1 Kontakt 2 → S2 Klemme 2 (über Klemmen in der Dose).', 'S2 Klemme 3 → S3 Kontakt 1, S2 Klemme 4 → S3 Kontakt 2.', 'L → S1 Mitte. S3 Mitte → Leuchte L. N und PE direkt zur Leuchte. Die Klemmen K3 und K4 haben 5 Eingänge.'],
  test: (X, E) => { const st = X.combos().map(x => ({ p: (x.inp.s1 ^ x.inp.s2 ^ x.inp.s3) & 1, on: lit(x.r, 'e1') }));
    if (st.every(x => !x.on)) E.push('E1 leuchtet in keiner Stellung. Prüfe den Weg L → S1 → S2 → S3 → Leuchte.');
    else if (st.every(x => x.on)) E.push('E1 leuchtet immer. Die Schalter liegen nicht im Weg zur Leuchte.');
    else if (!st.every(x => x.on === !!x.p) && !st.every(x => x.on === !x.p)) E.push('Nicht jeder Schalter schaltet die Leuchte in jeder Lage um. Prüfe die Klemmen des Kreuzschalters: 1 und 2 von S1, 3 und 4 weiter zu S3.');
    X.ac(E, { switched: ['e1'] }); },
  learn: 'Mit 2 Wechselschaltern und beliebig vielen Kreuzschaltern dazwischen kannst du von beliebig vielen Stellen schalten. Hier sind es 8 Schaltzustände.' },

{ id: 'stromstoss', kind: 'ac', group: G.haus, title: 'Stromstoßschaltung', short: 'Taster und Stromstoßschalter',
  goal: 'Jeder Druck auf T1 oder T2 soll E1 umschalten (an → aus → an …).',
  intro: 'Bei vielen Schaltstellen nimmt man <b>Taster</b> und einen <b>Stromstoßschalter</b> K1 (Fernschalter). Jeder Stromstoß auf die Spule <b>A1–A2</b> schaltet den Kontakt <b>1–2</b> um, und er bleibt so. Die Taster liegen <b>parallel</b>. Tippe auf einen Taster: Er wird kurz gedrückt.',
  comps: [FEED(100, 78), { id: 'e1', type: 'leuchte', x: 500, y: 78, label: 'E1' }, ...DOSE(300, 222, 4, 170, [1]), { id: 't1', type: 'taster', x: 100, y: 405, label: 'T1' }, { id: 't2', type: 'taster', x: 270, y: 405, label: 'T2' }, { id: 'k1', type: 'ssch', x: 480, y: 405, label: 'K1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 170, 28, 240, 188) + S.line('M70 30V170M120 30V170') + S.line('M70 60H100V100M70 100H100') + S.dot(70, 30) + S.dot(120, 30) + S.dot(70, 170) + S.dot(120, 170) + S.dot(70, 60) + S.dot(70, 100) +
    S.tasterV(70, 60, 'T1') + S.coil(70, 135, 'K1') + S.swV(120, 70, 'K1') + S.lamp(120, 125, 'E1', 16) + S.t(88, 85, 'T2') + S.line('M131 125H200V188', 1) + S.dot(200, 188)),
  hints: ['Steuerstromkreis: L → beide Taster (L), Taster-Abgänge ↑ zusammen auf A1. A2 an N.', 'Laststromkreis: L → Kontakt 1 von K1, Kontakt 2 → L der Leuchte. Leuchte N an N, PE an PE.', 'K1 ist die 5-fach-Klemme: Einspeisung L, T1 L, T2 L, K1 Kontakt 1.'],
  test: (X, E) => { const q = X.seq([{}, { t1: 1 }, {}, { t2: 1 }, {}, { t1: 1 }, {}]).map(r => lit(r, 'e1'));
    if (q.every(v => v === q[0])) { E.push('E1 ändert sich nie. Prüfe: Taster müssen Spannung auf A1 geben, A2 an N. Kontakt 1–2 von K1 schaltet L zur Leuchte.'); }
    else if (!q[0] && q[1] && !q[2]) E.push('E1 leuchtet nur, solange du drückst. Die Taster schalten die Leuchte direkt. Sie sollen nur die Spule A1–A2 ansteuern.');
    else if (q[1] === q[0] || q[2] !== q[1] || q[3] === q[2] || q[4] !== q[3] || q[5] === q[4]) E.push('Nicht jeder Tastendruck schaltet um. Beide Taster müssen parallel auf A1 liegen.');
    X.ac(E, {}); },
  learn: 'Stromstoßschalter sitzen meist im Verteiler. Die Taster brauchen nur den Steuerstrom. Vorteil: beliebig viele Schaltstellen, alle Taster einfach parallel.' },

{ id: 'bwm', kind: 'ac', group: G.haus, title: 'Bewegungsmelder', short: 'Licht schaltet bei Bewegung',
  goal: 'E1 soll leuchten, wenn B1 eine Bewegung erkennt.',
  intro: 'Ein Bewegungsmelder (PIR) hat drei Klemmen: <b>L</b> und <b>N</b> für seine eigene Elektronik und den Schaltausgang <b>↑</b> für die Leuchte. Ohne N funktioniert er nicht! Tippe auf B1, um eine Bewegung zu simulieren. Bewegungsmelder kennst du auch aus der Einbruchmeldetechnik.',
  comps: [FEED(100, 78), { id: 'e1', type: 'leuchte', x: 500, y: 78, label: 'E1' }, ...DOSE(300, 226, 4), { id: 'b1', type: 'bwm', x: 470, y: 405, label: 'B1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(30, 160, 28, 240, 182) + S.box(110, 80, 50, 34, 'B1') + S.line('M98 30V63M122 97V160M110 97V112') + S.dot(98, 30) + S.dot(122, 160) + S.lamp(110, 128, 'E1', -38) + S.line('M110 140V160') + S.dot(110, 160) + S.t(65, 70, 'L') + S.t(126, 110, 'N') + S.line('M121 128H175V182', 1) + S.dot(175, 182)),
  hints: ['K1: Einspeisung L und L von B1.', 'K2 (N, drei Eingänge): Einspeisung N, N von B1, N der Leuchte.', 'Abgang ↑ von B1 direkt zu L der Leuchte. K3: PE und PE.'],
  test: (X, E) => { const a = X.run({ b1: 0 }), b = X.run({ b1: 1 });
    if (!lit(b, 'e1')) E.push(b.relay.b1 ? 'B1 hat Spannung, aber E1 bleibt bei Bewegung dunkel. Der Abgang ↑ muss zu L der Leuchte, die Leuchte an N.' : 'B1 bekommt keine Versorgung. Er braucht L UND N an seinen Klemmen.');
    else if (lit(a, 'e1')) E.push('E1 leuchtet auch ohne Bewegung. Die Leuchte darf L nur über den Abgang ↑ von B1 bekommen.');
    X.ac(E, { switched: ['e1'], sw: ['b1'] }); },
  learn: 'Ein Bewegungsmelder ist ein Sensor mit eingebautem Schalter. Echte Geräte haben zusätzlich Einstellungen für Nachlaufzeit und Helligkeit.' },

{ id: 'klingel', kind: 'ac', group: G.haus, title: 'Klingelanlage', short: 'Klingeltrafo, Taster, Gong',
  goal: 'Der Gong H1 soll klingeln, solange T1 gedrückt wird.',
  intro: 'Klingeln arbeiten mit <b>Kleinspannung</b>, hier 8 V. Der <b>Klingeltransformator</b> macht aus 230 V sicher getrennte 8 V. Primärseite <b>L, N</b> ans Netz, Sekundärseite <b>8V, 0</b> zum Klingelstromkreis. Die beiden Seiten dürfen <b>nie</b> miteinander verbunden werden. Klingeltrafos sind meist schutzisoliert, deshalb ohne PE.',
  comps: [FEED(100, 78), { id: 'tr', type: 'trafo', x: 300, y: 230, label: 'T1' }, { id: 't1', type: 'taster', x: 130, y: 405, label: 'S1' }, { id: 'h1', type: 'gong', x: 470, y: 400, label: 'H1' }],
  colors: ['braun', 'blau', 'rot', 'weiss', 'gnge'],
  plan: () => plan(260, 200, S.rails(30, 80, 28, 120) + S.line('M90 30V44M90 80V66') + S.dot(90, 30) + S.dot(90, 80) + `<circle cx="90" cy="52" r="10" class="sym"/><circle cx="90" cy="66" r="10" class="sym"/>` + S.t(104, 60, 'T1 230/8 V') +
    S.line('M150 120H230V180H150Z') + S.tasterV(150, 150, 'S1') + S.gong(230, 150, 'H1') + S.t(160, 112, '8 V')),
  hints: ['Primär: L der Einspeisung an L des Trafos, N an N (braun und blau).', 'Sekundär: 8V → Taster L, Taster ↑ → Gong 1, Gong 2 → 0 des Trafos (rot oder weiß).'],
  test: (X, E) => { const a = X.run({ t1: 0 }), b = X.run({ t1: 1 }), g = b.lamps.h1;
    if (X.mixed()) { E.push('Netz und Kleinspannung sind verbunden! Die 8-V-Seite des Trafos darf keine Verbindung zu L, N oder PE haben.'); return; }
    if (g && g.burnt) { E.push('Der Gong hat 230 V bekommen und ist kaputt. Er gehört an die 8-V-Seite des Trafos.'); return; }
    if (!b.relay.tr) E.push('Der Trafo bekommt keine Netzspannung. Schließe L und N der Einspeisung an die Primärseite an.');
    else if (!lit(b, 'h1')) E.push('Der Gong klingelt nicht beim Drücken. Kreis: 8V → S1 → Gong → 0.');
    else if (lit(a, 'h1')) E.push('Der Gong klingelt dauernd. Der Taster muss im Klingelstromkreis liegen.');
    X.ac(E, { noPE: true }); },
  learn: 'Kleinspannung (SELV) ist ungefährlich zu berühren. Deshalb dürfen Klingeltaster draußen an der Haustür sitzen. Der Trafo trennt die beiden Seiten galvanisch.' },

/* ---- Sicherungskasten ---- */
{ id: 'verteiler1', kind: 'ac', group: G.vt, title: 'Sicherungskasten: ein Stromkreis', short: 'Zähler → FI → LS → Steckdose',
  goal: 'Versorge die Steckdose X1 über FI-Schutzschalter Q1 und Leitungsschutzschalter F1.',
  intro: 'So ist ein <b>Stromkreisverteiler</b> aufgebaut: Vom Zähler kommen L, N und PE. <b>L und N</b> gehen zuerst in den <b>FI-Schutzschalter (RCD)</b>. Aus dem FI geht <b>L</b> in den <b>LS-Schalter</b> (Sicherungsautomat) und von dort zur Steckdose. <b>N</b> geht vom FI auf die blaue <b>N-Schiene</b>, <b>PE</b> direkt auf die grün-gelbe <b>PE-Schiene</b>. Der Hauptschalter oben schaltet alles frei.',
  comps: [FEED(110, 70, 'Zähler'), { id: 'rail', type: 'rail', x: 330, y: 226, w: 230 }, { id: 'q1', type: 'rcd', x: 280, y: 226, label: 'Q1' }, { id: 'f1', type: 'ls', x: 390, y: 226, label: 'F1' },
    { id: 'nb', type: 'nbar', x: 210, y: 340, label: 'N' }, { id: 'pb', type: 'pebar', x: 210, y: 400, label: 'PE' }, { id: 'x1', type: 'steckdose', x: 500, y: 405, label: 'X1' }],
  colors: AC,
  plan: () => plan(260, 200, S.box(40, 40, 60, 30, 'Zähler') + S.line('M70 40H90') + S.box(115, 40, 50, 30, 'FI Q1') + S.line('M140 40H160') + S.box(185, 40, 50, 30, 'LS F1') + S.line('M185 55V110') + S.sock(185, 125, 'X1') +
    S.t(20, 95, 'L: Zähler → FI → LS → X1') + S.t(20, 115, 'N: Zähler → FI → N-Schiene → X1') + S.t(20, 135, 'PE: Zähler → PE-Schiene → X1', 'pe'), 'Übersichtsplan'),
  hints: ['Zähler L → Q1 oben L. Zähler N → Q1 oben N.', 'Q1 unten L → F1 oben (Klemme 1). F1 unten (Klemme 2) → L der Steckdose.', 'Q1 unten N → N-Schiene. N-Schiene → N der Steckdose.', 'Zähler PE → PE-Schiene. PE-Schiene → PE der Steckdose.'],
  test: (X, E) => { const r = X.run(); if (!lit(r, 'x1')) E.push('Die Steckdose hat keine Spannung. Verfolge L und N vom Zähler durch Q1 und F1 bis zur Steckdose.');
    X.dist(E, [{ load: 'x1', ls: ['f1'] }]); X.ac(E, {}); },
  learn: 'Der FI überwacht, ob genauso viel Strom zurückfließt wie hin. Darum müssen L und N durch ihn hindurch. Der LS schützt die Leitung vor Überlast und Kurzschluss und gehört in den Außenleiter. Probier die Prüftaste T am FI!' },

{ id: 'verteiler2', kind: 'ac', group: G.vt, title: 'Sicherungskasten: zwei Stromkreise', short: 'Licht und Steckdosen getrennt absichern',
  goal: 'E1 (Licht) soll über F1 und X1 (Steckdose) über F2 versorgt werden, beide hinter dem FI Q1.',
  intro: 'In echten Verteilern hängen mehrere LS-Schalter hinter einem FI. Jeder Stromkreis bekommt seinen <b>eigenen LS</b>. So bleibt das Licht an, wenn in der Steckdose ein Fehler auftritt. Die LS werden auf der Eingangsseite <b>gebrückt</b> (im echten Verteiler mit einer Phasenschiene). An Klemme 1 eines LS passen hier zwei Adern.',
  comps: [FEED(100, 70, 'Zähler'), { id: 'rail', type: 'rail', x: 345, y: 226, w: 290 }, { id: 'q1', type: 'rcd', x: 260, y: 226, label: 'Q1' }, { id: 'f1', type: 'ls', x: 370, y: 226, label: 'F1' }, { id: 'f2', type: 'ls', x: 450, y: 226, label: 'F2' },
    { id: 'e1', type: 'leuchte', x: 510, y: 78, label: 'E1' }, { id: 'nb', type: 'nbar', x: 200, y: 340, label: 'N' }, { id: 'pb', type: 'pebar', x: 200, y: 405, label: 'PE' }, { id: 'x1', type: 'steckdose', x: 490, y: 405, label: 'X1' }],
  colors: AC,
  plan: () => plan(260, 200, S.box(40, 40, 60, 30, 'Zähler') + S.line('M70 40H88') + S.box(112, 40, 48, 30, 'FI Q1') + S.line('M136 40H160M160 40V80M160 40H175M160 80H175') + S.box(198, 40, 46, 26, 'LS F1') + S.box(198, 80, 46, 26, 'LS F2') + S.line('M221 40H240M221 80H240') + S.t(244, 44, 'E1') + S.t(244, 84, 'X1') + S.dot(160, 40) +
    S.t(20, 130, 'Beide LS hinter dem FI.') + S.t(20, 150, 'N über den FI, PE direkt.') + S.t(20, 170, 'Jeder Stromkreis eigener LS.'), 'Übersichtsplan'),
  hints: ['Wie bei einem Stromkreis: Zähler L und N an Q1 oben.', 'Q1 unten L → F1 Klemme 1. F1 Klemme 1 → F2 Klemme 1 (Brücke).', 'F1 Klemme 2 → L der Leuchte E1. F2 Klemme 2 → L der Steckdose X1.', 'Q1 unten N → N-Schiene → N von E1 und N von X1. PE: Zähler → PE-Schiene → E1 und X1.'],
  test: (X, E) => { const r = X.run();
    if (!lit(r, 'e1')) E.push('E1 hat keine Spannung.');
    if (!lit(r, 'x1')) E.push('X1 hat keine Spannung.');
    X.dist(E, [{ load: 'e1', ls: ['f1', 'f2'] }, { load: 'x1', ls: ['f1', 'f2'] }], true); X.ac(E, {}); },
  learn: 'Ein FI für mehrere Stromkreise, jeder Stromkreis mit eigenem LS. In Wohnungen werden oft mehrere FI eingesetzt, damit bei einer Auslösung nicht die ganze Wohnung dunkel wird.' },

/* ---- Schaltschrank ---- */
{ id: 'tippen', kind: 'ac', group: G.ss, title: 'Schütz im Tippbetrieb', short: 'Taster steuert ein Schütz',
  goal: 'Solange S1 gedrückt ist, soll K1 anziehen und die Meldeleuchte H1 leuchten.',
  intro: 'Ein <b>Schütz</b> ist ein elektrisch betätigter Schalter. Bekommt die <b>Spule A1–A2</b> Spannung, schließen seine Kontakte, z. B. <b>1–2</b>. So schaltet ein kleiner <b>Steuerstromkreis</b> (Taster → Spule) einen <b>Hauptstromkreis</b> (Kontakt → Verbraucher). Klemmen: <b>13–14</b> Schließer, <b>11–12</b> Öffner. Tippe auf S1.',
  comps: [FEED(100, 70), { id: 'k1', type: 'schuetz', x: 330, y: 220, label: 'K1' }, { id: 'w1', type: 'wago5', x: 140, y: 230, label: 'L' }, { id: 'w2', type: 'wago5', x: 140, y: 300, label: 'N' }, { id: 's1', type: 'tno', x: 140, y: 405, label: 'S1' }, { id: 'h1', type: 'melde', x: 480, y: 400, label: 'H1' }],
  colors: AC,
  plan: () => plan(260, 200, S.rails(24, 176, 28, 240) + S.line('M80 24V176M170 24V176') + S.dot(80, 24) + S.dot(80, 176) + S.dot(170, 24) + S.dot(170, 176) + S.tasterV(80, 70, 'S1') + S.coil(80, 130, 'K1') + S.swV(170, 70, 'K1') + S.lamp(170, 130, 'H1') + S.t(40, 196, 'Steuerstromkreis') + S.t(150, 196, 'Hauptstromkreis')),
  hints: ['Die 5-fach-Klemmen sind Verteiler: eine für L, eine für N.', 'Steuerstromkreis: L → S1 Klemme 13, S1 Klemme 14 → K1 A1, K1 A2 → N.', 'Hauptstromkreis: L → K1 Kontakt 1, K1 Kontakt 2 → H1 X1, H1 X2 → N.'],
  test: (X, E) => { const q = X.seq([{}, { s1: 1 }, {}]);
    if (lit(q[0], 'h1')) E.push('H1 leuchtet schon ohne Tastendruck.');
    if (!q[1].relay.k1) E.push('K1 zieht beim Drücken nicht an. Die Spule A1–A2 braucht L über S1 und N.');
    else if (!lit(q[1], 'h1')) E.push('K1 zieht an, aber H1 leuchtet nicht. H1 muss über den Kontakt 1–2 von K1 an L und an N.');
    if (lit(q[2], 'h1') || q[2].relay.k1) E.push('Nach dem Loslassen bleibt alles an. Im Tippbetrieb soll K1 abfallen.');
    if (q[1].relay.k1 && !lit(q[1], 'h1') === false && X.direct('h1', 's1')) E.push('S1 schaltet H1 direkt. H1 soll über den Schützkontakt geschaltet werden.');
    X.ac(E, { noPE: true }); },
  learn: 'Kleiner Strom im Steuerstromkreis, großer Strom im Hauptstromkreis. So werden Motoren, Heizungen und Beleuchtungsanlagen in Schaltschränken geschaltet.' },

{ id: 'selbsthaltung', kind: 'ac', group: G.ss, title: 'Selbsthaltung (Ein/Aus)', short: 'Lüfter mit EIN- und AUS-Taster',
  goal: 'S1 (EIN) startet den Lüfter M1, er läuft nach dem Loslassen weiter. S0 (AUS) stoppt ihn.',
  intro: 'Bei der <b>Selbsthaltung</b> hält sich das Schütz selbst: Ein Hilfskontakt <b>13–14</b> von K1 liegt <b>parallel zum EIN-Taster S1</b>. Der <b>AUS-Taster S0</b> ist ein <b>Öffner (11–12)</b> und liegt <b>in Reihe</b> davor. Öffner, weil bei Drahtbruch dann sicher ausgeschaltet wird.',
  comps: [FEED(100, 70), { id: 'k1', type: 'schuetz', x: 370, y: 220, label: 'K1' }, { id: 'w1', type: 'wago', x: 230, y: 168, label: 'L' }, { id: 'w2', type: 'wago', x: 230, y: 212, label: 'N' }, { id: 'w3', type: 'wago', x: 230, y: 256, label: '' }, { id: 'w4', type: 'wago', x: 230, y: 300, label: '' },
    { id: 's0', type: 'tnc', x: 90, y: 405, label: 'S0' }, { id: 's1', type: 'tno', x: 250, y: 405, label: 'S1' }, { id: 'm1', type: 'luefter', x: 500, y: 405, label: 'M1' }],
  colors: AC,
  plan: () => plan(260, 210, S.rails(20, 186, 28, 240) + S.line('M70 20V186M70 75H110V125H70') + S.dot(70, 20) + S.dot(70, 186) + S.dot(70, 75) + S.dot(70, 125) + S.oeffnerV(70, 45, 'S0') + S.tasterV(70, 100, 'S1') + S.swV(110, 100, 'K1') + S.coil(70, 155, 'K1') +
    S.line('M190 20V186') + S.dot(190, 20) + S.dot(190, 186) + S.swV(190, 70, 'K1') + S.motor(190, 130, 'M1')),
  hints: ['W1 = L-Verteilung (Einspeisung L, S0 Klemme 11, K1 Kontakt 1). W2 = N-Verteilung (Einspeisung N, K1 A2, M1 N).', 'S0 Klemme 12 → W3. Auf W3 außerdem S1 Klemme 13 und K1 Klemme 13.', 'W4: S1 Klemme 14, K1 Klemme 14 und K1 A1. Damit liegt 13–14 von K1 parallel zu S1.', 'Hauptstromkreis: K1 Kontakt 2 → M1 L. M1 PE direkt an PE der Einspeisung.'],
  test: (X, E) => { const q = X.seq([{}, { s1: 1 }, {}, { s0: 1 }, {}]); const on = q.map(r => !!r.relay.k1);
    if (on[0]) E.push('K1 zieht schon ohne Tastendruck an.');
    if (!on[1]) E.push('K1 zieht beim Drücken von S1 nicht an. Weg: L → S0 (11–12) → S1 (13–14) → A1, A2 → N.');
    else if (!on[2]) E.push('K1 fällt nach dem Loslassen von S1 ab. Es fehlt die Selbsthaltung: Hilfskontakt 13–14 von K1 parallel zu S1.');
    else if (on[3]) E.push('S0 schaltet K1 nicht ab. S0 muss als Öffner (11–12) in Reihe vor S1 und dem Haltekontakt liegen.');
    if (on[1] && !lit(q[1], 'm1')) E.push('K1 zieht an, aber M1 läuft nicht. M1 muss über den Kontakt 1–2 von K1 an L und an N.');
    X.ac(E, {}); },
  learn: 'Die Selbsthaltung ist die wichtigste Grundschaltung im Schaltschrank. Fällt der Strom aus, fällt K1 ab und die Maschine startet danach nicht von selbst wieder an. Das ist ein Sicherheitsvorteil.' },
];

/* ---------- 4. Simulation ---------- */
const compById = (L, id) => L.comps.find(c => c.id === id);
const termOf = (L, key) => { const [cid, tid] = key.split('.'); const c = compById(L, cid); return c && T[c.type].terms[tid] ? { c, t: T[c.type].terms[tid], tid } : null; };
const isInput = c => !!T[c.type].states;

/* inp: Stellung aller bedienbaren Bauteile, mem: gespeicherte Relaiszustände */
function solveOnce(L, wires, inp, mem, opts) {
  const parent = {};
  const f = k => { if (parent[k] === undefined) parent[k] = k; while (parent[k] !== k) { parent[k] = parent[parent[k]]; k = parent[k]; } return k; };
  const u = (a, b) => { a = f(a); b = f(b); if (a !== b) parent[a] = b; };
  const loads = [], sources = [];
  for (const c of L.comps) {
    const D = T[c.type], keys = Object.keys(D.terms).map(t => c.id + '.' + t);
    keys.forEach(f);
    if (D.bridge) keys.slice(1).forEach(k => u(keys[0], k));
    if (D.contacts && !(opts.openProt && D.prot)) D.contacts(inp[c.id] || 0, !!mem.relay[c.id]).forEach(([a, b]) => u(c.id + '.' + a, c.id + '.' + b));
    if (D.load) loads.push({ id: c.id, a: c.id + '.' + D.load.a, b: c.id + '.' + D.load.b, G: 1 / D.load.R, Vn: D.load.Vn, diode: D.load.diode, meter: D.meter, R: D.load.R });
    if (D.source) {
      const on = D.source.needsMain ? (opts.forceMain || inp[c.id + ':main']) : D.source.needsRelay ? !!mem.relay[c.id] : true;
      sources.push({ id: c.id, p: c.id + '.' + D.source.p, m: c.id + '.' + D.source.m, V: D.source.V, on });
    }
  }
  wires.forEach(w => u(w.a, w.b));
  const r = { f, lamps: {}, meters: {}, relay: {}, short: null, earthFault: false, peN: false, live: false };
  loads.forEach(l => { r.lamps[l.id] = { v: 0, b: 0, pv: 0 }; });
  const feed = L.comps.find(c => c.type === 'feed');
  if (feed) { const ge = f(feed.id + '.PE'); r.earthFault = ge === f(feed.id + '.L'); r.peN = ge === f(feed.id + '.N'); }
  const off = new Set();
  for (const s of sources) {
    if (!s.on) continue;
    r.live = r.live || s.id === (feed && feed.id);
    const gp = f(s.p), gm = f(s.m);
    if (gp === gm) { r.short = r.short || s.id; continue; }
    for (let pass = 0; pass < 3; pass++) {
      const act = loads.filter(l => !off.has(l.id));
      const idx = new Map(), fixed = g => g === gp ? s.V : g === gm ? 0 : null;
      act.forEach(l => [f(l.a), f(l.b)].forEach(g => { if (fixed(g) === null && !idx.has(g)) idx.set(g, idx.size); }));
      const n = idx.size, A = Array.from({ length: n }, () => new Array(n + 1).fill(0));
      for (let i = 0; i < n; i++) A[i][i] += 1e-9;
      act.forEach(l => { const ga = f(l.a), gb = f(l.b); if (ga === gb) return;
        [[ga, gb], [gb, ga]].forEach(([x, y]) => { if (!idx.has(x)) return; const i = idx.get(x); A[i][i] += l.G; if (idx.has(y)) A[i][idx.get(y)] -= l.G; else A[i][n] += l.G * fixed(y); }); });
      for (let c = 0; c < n; c++) { let p = c; for (let q = c + 1; q < n; q++) if (Math.abs(A[q][c]) > Math.abs(A[p][c])) p = q; [A[c], A[p]] = [A[p], A[c]];
        for (let q = 0; q < n; q++) { if (q === c) continue; const k = A[q][c] / A[c][c]; if (!k) continue; for (let j = c; j <= n; j++) A[q][j] -= k * A[c][j]; } }
      const pot = g => { const x = fixed(g); return x !== null ? x : A[idx.get(g)][n] / A[idx.get(g)][idx.get(g)]; };
      let again = false;
      act.forEach(l => { const pv = pot(f(l.a)) - pot(f(l.b));
        if (l.diode && pv < -0.5) { off.add(l.id); r.lamps[l.id].reverse = true; again = true; return; }
        if (Math.abs(pv) > Math.abs(r.lamps[l.id].pv)) r.lamps[l.id] = Object.assign(r.lamps[l.id], { pv, v: Math.abs(pv) }); });
      if (!again) break;
    }
  }
  loads.forEach(l => { const o = r.lamps[l.id]; o.b = Math.min(1, (o.v / l.Vn) ** 2); if (l.diode && o.v > 3.2) { o.burnt = true; o.b = 0; }
    if (l.Vn === 8 && o.v > 20) { o.burnt = true; o.b = 0; }
    if (l.meter) { const i = o.pv / l.R; r.meters[l.id] = { v: o.pv, i, blown: l.meter === 'A' && Math.abs(i) > 2 }; } });
  return r;
}
/* Relais und Sensoren einschwingen lassen (Schütz, Stromstoßschalter, Bewegungsmelder, Trafo) */
function simulate(L, wires, inp, mem, opts = {}) {
  mem = { relay: Object.assign({}, mem && mem.relay), coil: Object.assign({}, mem && mem.coil) };
  let r;
  for (let k = 0; k < 10; k++) {
    r = solveOnce(L, wires, inp, mem, opts);
    let changed = false;
    for (const c of L.comps) {
      const D = T[c.type]; if (!D.relay) continue;
      const en = r.lamps[c.id] && r.lamps[c.id].v > 0.7 * D.load.Vn;
      if (D.relay === 'toggle') { if (en && !mem.coil[c.id]) { mem.relay[c.id] = !mem.relay[c.id]; changed = true; } mem.coil[c.id] = en; }
      else if (!!mem.relay[c.id] !== en) { mem.relay[c.id] = en; changed = true; }
    }
    if (!changed) break;
  }
  r.relay = mem.relay; r.mem = mem;
  return r;
}

/* ---------- 5. Prüfung ---------- */
function baseInputs(L, extra) {
  const inp = {};
  L.comps.forEach(c => { if (isInput(c)) inp[c.id] = T[c.type].prot ? 1 : 0; });
  return Object.assign(inp, extra || {});
}
function makeTester(L, s) {
  const desc = inp => L.comps.filter(c => isInput(c) && !T[c.type].prot && !T[c.type].momentary).map(c => `${c.label} ${T[c.type].states[inp[c.id] || 0]}`).join(', ');
  const X = {
    desc,
    run: (extra, mem) => simulate(L, s.wires, baseInputs(L, extra), mem, { forceMain: true }),
    combos() {
      const sw = L.comps.filter(c => isInput(c) && !T[c.type].prot && !T[c.type].momentary);
      const lists = sw.map(c => T[c.type].states.map((_, i) => i));
      let all = [{}];
      sw.forEach((c, i) => { all = all.flatMap(o => lists[i].map(v => Object.assign({}, o, { [c.id]: v }))); });
      return all.map(inp => ({ inp, r: X.run(inp) }));
    },
    seq(steps) { let mem = null; return steps.map(st => { const r = X.run(st, mem); mem = r.mem; return r; }); },
    mixed() { const r = X.run(), f = r.f, tr = L.comps.find(c => c.type === 'trafo'), fd = L.comps.find(c => c.type === 'feed');
      if (!tr || !fd) return false; const sec = [f(tr.id + '.s1'), f(tr.id + '.s2')], net = ['L', 'N', 'PE'].map(t => f(fd.id + '.' + t)), pri = [f(tr.id + '.L'), f(tr.id + '.N')];
      return sec.some(g => net.includes(g) || pri.includes(g)); },
    direct(load, sw) { const r = X.run(), f = r.f; return Object.keys(T[compById(L, sw).type].terms).some(t => Object.keys(T[compById(L, load).type].terms).some(u => f(sw + '.' + t) === f(load + '.' + u))); },
    /* Verteiler: Wege mit offenem FI/LS prüfen */
    dist(E, list, separate) {
      const o = simulate(L, s.wires, baseInputs(L), null, { forceMain: true, openProt: true }), f = o.f;
      const rcd = L.comps.find(c => c.type === 'rcd'), fd = L.comps.find(c => c.type === 'feed');
      if (f(rcd.id + '.Li') !== f(fd.id + '.L') || f(rcd.id + '.Ni') !== f(fd.id + '.N')) E.push(`L und N vom Zähler gehören oben in den FI ${rcd.label} (Eingang L und N).`);
      const used = [];
      list.forEach(({ load, ls }) => {
        const lc = compById(L, load);
        const via = ls.find(id => f(load + '.L') === f(id + '.o'));
        if (!via) { const nInLs = ls.find(id => f(load + '.N') === f(id + '.o')); E.push(nInLs ? `Der LS liegt im Neutralleiter von ${lc.label}. Ein LS gehört in den Außenleiter L.` : `${lc.label}: L muss vom Ausgang (Klemme 2) eines LS-Schalters kommen.`); }
        else { used.push(via); if (f(via + '.i') !== f(rcd.id + '.Lo')) E.push(`Der LS ${compById(L, via).label} bekommt L nicht vom Ausgang des FI. Verbinde FI unten L mit Klemme 1 des LS.`); }
        if (f(load + '.N') !== f(rcd.id + '.No')) E.push(f(load + '.N') === f(fd.id + '.N') ? `N von ${lc.label} ist am FI vorbei direkt mit dem Zähler verbunden. Dann fließt der Strom nicht zurück durch den FI und er löst aus. N muss vom FI-Ausgang über die N-Schiene kommen.` : `N von ${lc.label} muss vom FI-Ausgang (über die N-Schiene) kommen.`);
      });
      if (separate && used.length === 2 && used[0] === used[1]) E.push('Beide Stromkreise hängen am selben LS. Jeder Stromkreis bekommt seinen eigenen LS.');
    },
    /* allgemeine Regeln für 230-V-Schaltungen */
    ac(E, o) {
      const r = X.run(), f = r.f, fd = L.comps.find(c => c.type === 'feed'); if (!fd) return;
      const F = t => f(fd.id + '.' + t);
      if (r.earthFault) E.push('Gefährlich: PE ist mit L verbunden. Das Gehäuse stünde unter Spannung.');
      if (r.peN) E.push('N und PE sind miteinander verbunden. Hinter der Einspeisung müssen sie getrennt bleiben, sonst löst der FI aus.');
      L.comps.filter(c => T[c.type].terms.PE && c.type !== 'feed').forEach(c => { if (!o.noPE && f(c.id + '.PE') !== F('PE')) E.push(`Der Schutzleiter fehlt: PE von ${c.label} ist nicht mit PE verbunden.`); });
      const cmb = (o.switched || o.sw) ? X.combos() : [{ r }];
      (o.switched || []).forEach(id => {
        const c = compById(L, id);
        const nSw = cmb.some(x => x.r.f(id + '.N') !== x.r.f(fd.id + '.N'));
        const hot = cmb.some(x => dark(x.r, id) && x.r.f(id + '.L') === x.r.f(fd.id + '.L'));
        if (hot && nSw) E.push(`Der Schalter unterbricht den Neutralleiter N. Dann liegt an ${c.label} auch ausgeschaltet noch L an. Lebensgefahr beim Lampenwechsel! Schalte den Außenleiter L.`);
        else if (nSw) E.push(`N von ${c.label} muss direkt (über eine Klemme) mit N verbunden sein.`);
      });
      L.comps.filter(c => (c.type === 'leuchte' || c.type === 'steckdose' || c.type === 'luefter')).forEach(c => { if (cmb.some(x => x.r.f(c.id + '.L') === x.r.f(fd.id + '.N'))) E.push(`An der L-Klemme von ${c.label} liegt N. L und N sind vertauscht.`); });
      const msgs = new Set();
      s.wires.forEach(w => { const g = f(w.a), isPE = g === F('PE'), isN = g === F('N') && !isPE;
        if (isPE && w.c !== 'gnge') msgs.add('Der Schutzleiter PE muss grün-gelb sein.');
        if (!isPE && w.c === 'gnge') msgs.add('Grün-gelb ist nur für den Schutzleiter PE erlaubt.');
        if (isN && w.c !== 'blau') msgs.add('Der Neutralleiter N wird blau verlegt.');
        if (!isN && !isPE && w.c === 'blau') msgs.add('Blau ist für den Neutralleiter N reserviert. Für L, geschaltete und korrespondierende Adern nimm braun, schwarz oder grau.'); });
      msgs.forEach(m => E.push(m));
    },
  };
  return X;
}
function runCheck(L, s) {
  const E = [];
  if (!s.wires.length) return { ok: false, E: ['Es ist noch keine Ader verlegt.'] };
  const X = makeTester(L, s);
  const sh = X.combos().find(x => x.r.short);
  if (sh) { E.push(`Kurzschluss${X.desc(sh.inp) ? ' (bei ' + X.desc(sh.inp) + ')' : ''}: ${L.kind === 'ac' ? 'L und N (oder die beiden Trafoklemmen)' : 'Plus- und Minuspol'} sind ohne Verbraucher direkt verbunden.`); return { ok: false, E, X }; }
  L.test(X, E);
  return { ok: !E.length, E: [...new Set(E)], X };
}

/* ---------- 6. Oberfläche ---------- */
const KEY = 'schaltwand-v1';
let DB = { done: {}, lv: {} };
try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); if (d && typeof d === 'object') DB = { done: d.done || {}, lv: d.lv || {} }; } } catch (e) { /* ohne Speicher */ }
const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* ignorieren */ } };

let cur = null, St = null, hintN = 0, clearArm = false;
const VB_W = 600, VB_H = 470;
const main = document.getElementById('main');
const fmt = (x, d = 2) => x.toFixed(d).replace('.', ',');

function termPos(key) { const { c, t } = termOf(cur, key); const fdir = t.f !== undefined ? t.f : (t.y < 0 ? -1 : 1); return { x: c.x + t.x, y: c.y + t.y, f: fdir }; }
function wirePath(a, b) {
  const s = 26 + Math.abs(b.x - a.x) * 0.1 + Math.abs(b.y - a.y) * 0.08;
  const ca = a.f ? { x: a.x, y: a.y + a.f * s } : { x: a.x + (b.x - a.x) * .35, y: a.y + (b.y - a.y) * .35 };
  const cb = b.f ? { x: b.x, y: b.y + b.f * s } : { x: b.x + (a.x - b.x) * .35, y: b.y + (a.y - b.y) * .35 };
  return `M${a.x} ${a.y}C${ca.x} ${ca.y} ${cb.x} ${cb.y} ${b.x} ${b.y}`;
}
const count = k => St.wires.filter(w => w.a === k || w.b === k).length;
const maxOf = k => { const { c, t } = termOf(cur, k); return t.max || T[c.type].max; };
function termName(k) { const { c, t, tid } = termOf(cur, k); const D = T[c.type]; return `${D.name}${c.label && !D.bridge ? ' ' + c.label : ''}${D.bridge ? ' ' + (c.label || c.id.toUpperCase()) : ''}, ${t.name || 'Klemme ' + (t.label || tid)}`; }
const liveInputs = () => Object.assign({}, St.inp, { [feedId() + ':main']: St.main });
const feedId = () => { const f = cur.comps.find(c => c.type === 'feed'); return f ? f.id : '_'; };

function glowLamp(x, y, b, r0 = 30) { return `<circle cx="${x}" cy="${y}" r="${r0 + b * 22}" class="glow glowfx" opacity="${b ? 0.25 + b * 0.45 : 0}"/>`; }
function clk(c, label, body) { return `<g class="clickable" data-toggle="${c.id}" tabindex="0" role="button" aria-label="${label}">${body}</g>`; }
function compSVG(c, sim) {
  const x = c.x, y = c.y, D = T[c.type], st = St.inp[c.id] || 0, lp = sim.lamps[c.id] || { b: 0 }, b = lp.b;
  switch (c.type) {
    case 'battery': return `<g><rect x="${x - 54}" y="${y - 28}" width="108" height="66" rx="8" class="bat"/><rect x="${x - 54}" y="${y - 28}" width="108" height="14" rx="6" class="bat-top"/>
      <rect x="${x - 32}" y="${y - 38}" width="12" height="12" class="bat-top"/><rect x="${x + 20}" y="${y - 38}" width="12" height="12" class="bat-top"/>
      <text x="${x}" y="${y + 14}" class="dev-t inv">4,5 V</text><text x="${x}" y="${y + 30}" class="dev-s inv">${c.label}</text>${sim.short === c.id ? `<text x="${x}" y="${y + 60}" class="zap" text-anchor="middle">Kurzschluss!</text>` : ''}</g>`;
    case 'bulb': return `<g>${glowLamp(x, y - 16, b)}<rect x="${x - 34}" y="${y + 16}" width="68" height="20" rx="4" class="dev"/><rect x="${x - 12}" y="${y + 2}" width="24" height="16" class="metal"/>
      <circle cx="${x}" cy="${y - 18}" r="22" fill="${b > 0.05 ? 'var(--glow)' : 'var(--glass)'}" stroke="var(--dev-line)" stroke-width="2"/><path d="M${x - 7} ${y + 2}V${y - 14}l4 -8l3 6l3 -6l4 8V${y + 2}" stroke="#6b5a2f" stroke-width="1.6" fill="none"/>
      <text x="${x + 46}" y="${y - 14}" class="dev-t" text-anchor="start">${c.label}</text></g>`;
    case 'tswitch': return clk(c, `Schalter ${c.label}, ${st ? 'ein' : 'aus'}`, `<rect x="${x - 44}" y="${y - 26}" width="88" height="54" rx="8" class="dev"/><rect x="${x - 14}" y="${y - 18}" width="28" height="38" rx="5" class="dev2"/>
      <rect x="${x - 10}" y="${st ? y - 15 : y + 1}" width="20" height="16" rx="3" fill="${st ? 'var(--ok)' : 'var(--metal-d)'}"/><text x="${x + 30}" y="${y + 5}" class="dev-s">${st ? 'EIN' : 'AUS'}</text><text x="${x}" y="${y - 36}" class="dev-t">${c.label}</text>`);
    case 'resistor': return `<g><path d="M${x - 44} ${y}H${x + 44}" stroke="var(--metal-d)" stroke-width="3"/><rect x="${x - 28}" y="${y - 11}" width="56" height="22" rx="8" fill="#D9C7A0" stroke="#8C7A55"/>
      ${['#7a4a25', '#C23324', '#7a4a25', '#C9A227'].map((col, i) => `<rect x="${x - 18 + i * 10}" y="${y - 11}" width="5" height="22" fill="${col}"/>`).join('')}<text x="${x}" y="${y - 20}" class="dev-t">${c.label} · 120 Ω</text></g>`;
    case 'led': return `<g>${lp.burnt ? '' : glowLamp(x, y - 14, b, 18)}<path d="M${x - 18} ${y + 36}V${y + 8}M${x + 18} ${y + 36}V${y + 12}" stroke="var(--metal-d)" stroke-width="3"/>
      <path d="M${x - 16} ${y + 6}V${y - 14}A16 16 0 0 1 ${x + 16} ${y - 14}V${y + 6}Z" fill="${lp.burnt ? '#555' : b > 0.3 ? '#FF4D3A' : '#E8A79E'}" stroke="#9b3b30" stroke-width="2"/><rect x="${x - 20}" y="${y + 4}" width="40" height="6" rx="2" fill="#c97c72"/>
      <text x="${x + 30}" y="${y - 6}" class="dev-t" text-anchor="start">${c.label}</text>${lp.burnt ? `<text x="${x}" y="${y - 40}" class="zap" text-anchor="middle">durchgebrannt!</text>` : ''}</g>`;
    case 'vmeter': case 'ameter': { const m = sim.meters[c.id]; const val = !m ? '–' : m.blown ? 'Sicherung defekt' : D.meter === 'V' ? fmt(m.v) + ' V' : fmt(m.i) + ' A';
      return `<g><rect x="${x - 50}" y="${y - 42}" width="100" height="80" rx="12" fill="#F2C230" stroke="#9A7A10" stroke-width="2"/><rect x="${x - 38}" y="${y - 32}" width="76" height="30" rx="4" fill="#C7D3BF" stroke="#5C6656"/>
      <text x="${x + 32}" y="${y - 11}" class="lcd" text-anchor="end">${val}</text><text x="${x}" y="${y + 18}" class="dev-s" style="fill:#3d3000">${c.label} · ${D.meter === 'V' ? 'Volt' : 'Ampere'}</text>${m && m.blown ? `<text x="${x}" y="${y - 52}" class="zap" text-anchor="middle">Überlast!</text>` : ''}</g>`; }
    case 'feed': { const on = St.main; const vt = c.label === 'Zähler';
      return `<g><rect x="${x - 74}" y="${y - 56}" width="148" height="100" rx="8" class="dev"/>
      <text x="${x - 30}" y="${y - 34}" class="dev-t">${vt ? 'Zähler' : '230 V'}</text><text x="${x - 30}" y="${y - 18}" class="dev-s">${vt ? 'Hauptschalter →' : 'Einspeisung'}</text>
      ${vt ? `<text x="${x - 30}" y="${y + 6}" class="dev-s">L · N · PE</text>` : ''}
      <g class="clickable" data-main="1" tabindex="0" role="switch" aria-checked="${on}" aria-label="${vt ? 'Hauptschalter' : 'Leitungsschutzschalter der Einspeisung'}, ${on ? 'ein' : 'aus'}">
        <rect x="${x + 16}" y="${y - 50}" width="50" height="76" rx="5" class="dev2 ls-body"/><text x="${x + 41}" y="${y - 36}" class="dev-s">${vt ? 'HS' : 'LS'} ${on ? 'EIN' : 'AUS'}</text>
        <rect x="${x + 29}" y="${on ? y - 26 : y - 6}" width="24" height="26" rx="4" fill="${on ? 'var(--ok)' : 'var(--bad)'}"/></g><path d="M${x - 62} ${y + 30}H${x + 62}" stroke="var(--dev-line)"/></g>`; }
    case 'leuchte': return `<g>${glowLamp(x, y, b, 44)}<circle cx="${x}" cy="${y - 6}" r="40" class="dev"/><circle cx="${x}" cy="${y - 6}" r="22" fill="${b > 0.05 ? 'var(--glow)' : 'var(--glass)'}" stroke="var(--dev-line)" stroke-width="2"/>
      <rect x="${x - 40}" y="${y + 28}" width="80" height="14" rx="3" class="dev2"/><text x="${x + 54}" y="${y - 30}" class="dev-t" text-anchor="start">${c.label}</text></g>`;
    case 'steckdose': return `<g><rect x="${x - 40}" y="${y - 36}" width="80" height="76" rx="10" class="dev"/><circle cx="${x}" cy="${y + 4}" r="27" class="dev2"/>
      <circle cx="${x - 10}" cy="${y + 4}" r="3.5" fill="#333"/><circle cx="${x + 10}" cy="${y + 4}" r="3.5" fill="#333"/><rect x="${x - 3}" y="${y - 23}" width="6" height="7" class="metal"/><rect x="${x - 3}" y="${y + 24}" width="6" height="7" class="metal"/>
      <text x="${x + 50}" y="${y - 8}" class="dev-t" text-anchor="start">${c.label}</text><text x="${x + 50}" y="${y + 10}" class="dev-s" text-anchor="start" style="fill:${b > 0.5 ? 'var(--ok)' : '#4A5358'}">${b > 0.5 ? '230 V' : '0 V'}</text></g>`;
    case 'aus': case 'wechsel': case 'kreuz': case 'serien': case 'taster': case 'bwm': {
      const name = D.states[st]; const press = c.type === 'taster';
      const inner = c.type === 'bwm' ? `<circle cx="${x}" cy="${y + 2}" r="20" fill="${st ? 'var(--glow)' : 'var(--glass)'}" stroke="var(--dev-line)" stroke-width="2"/><path d="M${x - 10} ${y + 2}h20M${x} ${y - 8}v20" stroke="var(--dev-line)"/>`
        : c.type === 'serien' ? `<rect x="${x - 28}" y="${y - 22}" width="27" height="54" rx="5" fill="${st & 1 ? 'var(--ok-bg)' : 'var(--card2)'}" stroke="var(--dev-line)"/><rect x="${x + 1}" y="${y - 22}" width="27" height="54" rx="5" fill="${st & 2 ? 'var(--ok-bg)' : 'var(--card2)'}" stroke="var(--dev-line)"/>`
        : press ? `<rect x="${x - 28}" y="${y - 22}" width="56" height="54" rx="6" class="dev2"/><circle cx="${x}" cy="${y + 5}" r="${st ? 11 : 14}" fill="${st ? 'var(--ok)' : 'var(--metal)'}" stroke="var(--dev-line)"/>`
        : `<rect x="${x - 28}" y="${y - 22}" width="56" height="54" rx="6" class="dev2"/><path d="M${x - 24} ${st ? y - 18 : y + 28}L${x + 24} ${st ? y + 28 : y - 18}" stroke="var(--dev-line)" stroke-width="2"/><circle cx="${x}" cy="${st ? y - 8 : y + 18}" r="5" fill="${c.type === 'aus' ? (st ? 'var(--ok)' : 'var(--metal-d)') : 'var(--pen)'}"/>`;
      const w = c.type === 'kreuz' ? 54 : 46;
      return clk(c, `${D.name} ${c.label}, ${name}`, `<rect x="${x - w}" y="${y - 36}" width="${w * 2}" height="80" rx="10" class="dev"/>${inner}<text x="${x}" y="${y + 60}" class="dev-t">${c.label} · ${name}</text>`) +
        (c.type === 'bwm' && sim.relay[c.id] ? `<text x="${x + 52}" y="${y}" class="dev-s" text-anchor="start" style="fill:var(--ok)">versorgt</text>` : ''); }
    case 'tno': case 'tnc': { const nc = c.type === 'tnc';
      return clk(c, `${D.name} ${c.label}, ${st ? 'gedrückt' : 'los'}`, `<rect x="${x - 40}" y="${y - 34}" width="80" height="74" rx="10" class="dev"/><circle cx="${x}" cy="${y + 4}" r="${st ? 17 : 21}" fill="${nc ? 'var(--bad)' : 'var(--ok)'}" stroke="var(--dev-line)" stroke-width="2"/>
      <text x="${x}" y="${y + 9}" class="dev-t" style="fill:#fff">${nc ? 'AUS' : 'EIN'}</text><text x="${x}" y="${y + 58}" class="dev-t">${c.label} · ${nc ? 'Öffner' : 'Schließer'}</text>`); }
    case 'ssch': case 'schuetz': { const on = !!sim.relay[c.id]; const sch = c.type === 'schuetz';
      return `<g><rect x="${x - 48}" y="${y - 36}" width="96" height="${sch ? 72 : 80}" rx="6" class="dev"/><rect x="${x - 36}" y="${y - 22}" width="72" height="${sch ? 44 : 30}" rx="4" class="dev2"/>
      <rect x="${x - 10}" y="${on ? y - 18 : y - 8}" width="20" height="10" rx="2" fill="${on ? 'var(--ok)' : 'var(--metal-d)'}"/><text x="${x}" y="${y + (sch ? 16 : 22)}" class="dev-s">${on ? 'EIN' : 'AUS'}</text>
      <text x="${x + 60}" y="${y + 4}" class="dev-t" text-anchor="start">${c.label}</text><text x="${x + 60}" y="${y + 20}" class="dev-s" text-anchor="start">${sch ? 'Schütz' : 'Stromstoß'}</text></g>`; }
    case 'trafo': { const on = !!sim.relay[c.id]; return `<g><rect x="${x - 50}" y="${y - 38}" width="100" height="76" rx="8" class="dev"/><circle cx="${x - 10}" cy="${y}" r="16" fill="none" stroke="var(--dev-line)" stroke-width="2"/><circle cx="${x + 10}" cy="${y}" r="16" fill="none" stroke="var(--dev-line)" stroke-width="2"/>
      <text x="${x + 64}" y="${y - 6}" class="dev-t" text-anchor="start">${c.label}</text><text x="${x + 64}" y="${y + 10}" class="dev-s" text-anchor="start">230 V / 8 V</text><text x="${x + 64}" y="${y + 26}" class="dev-s" text-anchor="start" style="fill:${on ? 'var(--ok)' : '#4A5358'}">${on ? 'in Betrieb' : 'aus'}</text>
      <text x="${x - 64}" y="${y - 30}" class="dev-s" text-anchor="end">Netz</text><text x="${x - 64}" y="${y + 40}" class="dev-s" text-anchor="end">8 V</text></g>`; }
    case 'gong': return `<g><rect x="${x - 44}" y="${y - 34}" width="88" height="70" rx="10" class="dev"/><path d="M${x - 18} ${y + 14}H${x + 18}M${x - 13} ${y + 14}V${y - 2}A13 13 0 0 1 ${x + 13} ${y - 2}V${y + 14}" stroke="var(--dev-line)" stroke-width="2.5" fill="${b > 0.5 ? 'var(--glow)' : 'none'}"/>
      <text x="${x + 56}" y="${y + 4}" class="dev-t" text-anchor="start">${c.label}</text>${b > 0.5 ? `<text x="${x}" y="${y - 44}" class="dev-t" style="fill:var(--ok)">Ding-dong!</text>` : ''}${lp.burnt ? `<text x="${x}" y="${y - 44}" class="zap" text-anchor="middle">kaputt (230 V)!</text>` : ''}</g>`;
    case 'rcd': case 'ls': { const w = c.type === 'rcd' ? 34 : 22; const on = !!st;
      return clk(c, `${D.name} ${c.label}, ${on ? 'ein' : 'aus'}`, `<rect x="${x - w}" y="${y - 34}" width="${w * 2}" height="68" rx="5" class="dev ls-body"/><text x="${x}" y="${y - 20}" class="dev-s">${c.type === 'rcd' ? 'FI 30mA' : 'B16'}</text>
      <rect x="${x - 8}" y="${on ? y - 12 : y + 2}" width="16" height="14" rx="3" fill="${on ? 'var(--ok)' : 'var(--bad)'}"/><text x="${x - (c.type === 'rcd' ? 10 : 0)}" y="${y + 29}" class="dev-t">${c.label}</text>`) +
      (c.type === 'rcd' ? `<g class="clickable" data-test="${c.id}" tabindex="0" role="button" aria-label="Prüftaste T am FI ${c.label}"><circle cx="${x + 22}" cy="${y + 20}" r="8" fill="var(--metal)" stroke="var(--dev-line)"/><text x="${x + 22}" y="${y + 24}" class="dev-s" style="font-size:10px">T</text></g>` : ''); }
    case 'nbar': case 'pebar': return `<g><rect x="${x - 56}" y="${y - 12}" width="112" height="24" rx="5" fill="${c.type === 'nbar' ? 'var(--w-blau)' : 'var(--w-gn)'}" opacity=".85"/>${c.type === 'pebar' ? `<rect x="${x - 56}" y="${y - 12}" width="112" height="24" rx="5" fill="url(#gy)" opacity=".7"/>` : ''}
      <text x="${x - 66}" y="${y + 5}" class="dev-t" text-anchor="end" style="fill:#2A2118">${c.label}-Schiene</text></g>`;
    case 'wago': case 'wago5': { const n = Object.keys(D.terms).length, w = n === 5 ? 92 : 64;
      return `<g><rect x="${x - w / 2}" y="${y - 12}" width="${w}" height="24" rx="5" fill="#EDEDE6" stroke="#8C918C"/>${Object.values(D.terms).map(t => `<rect x="${x + t.x - 6}" y="${y - 15}" width="12" height="8" rx="2" fill="#F08A24"/>`).join('')}
      <text x="${x - w / 2 - 10}" y="${y + 4}" class="dev-s" text-anchor="end" style="fill:#2A2118">${c.label !== undefined && c.label !== '' ? c.label : c.id.toUpperCase()}</text></g>`; }
    case 'melde': return `<g>${glowLamp(x, y + 2, b, 24)}<rect x="${x - 34}" y="${y - 30}" width="68" height="64" rx="10" class="dev"/><circle cx="${x}" cy="${y + 2}" r="17" fill="${b > 0.05 ? '#5BD37E' : '#BFD8C6'}" stroke="var(--dev-line)" stroke-width="2"/><text x="${x + 46}" y="${y + 6}" class="dev-t" text-anchor="start">${c.label}</text></g>`;
    case 'luefter': return `<g><rect x="${x - 44}" y="${y - 38}" width="88" height="80" rx="10" class="dev"/><g class="${b > 0.5 ? 'spin' : ''}" style="transform-origin:${x}px ${y + 4}px">${[0, 120, 240].map(a => `<path d="M${x} ${y + 4}l0 -24a10 10 0 0 1 10 10z" fill="var(--pen)" transform="rotate(${a} ${x} ${y + 4})"/>`).join('')}</g>
      <circle cx="${x}" cy="${y + 4}" r="5" fill="var(--metal-d)"/><text x="${x + 56}" y="${y}" class="dev-t" text-anchor="start">${c.label}</text><text x="${x + 56}" y="${y + 16}" class="dev-s" text-anchor="start">${b > 0.5 ? 'läuft' : 'steht'}</text></g>`;
    case 'dose': return `<g><rect x="${x - c.w / 2}" y="${y - c.h / 2}" width="${c.w}" height="${c.h}" rx="22" fill="#9AA0A3" opacity=".35" stroke="#5D6468" stroke-width="2"/><text x="${x}" y="${y - c.h / 2 + 16}" class="dev-s" style="fill:#2A2118">Abzweigdose</text></g>`;
    case 'rail': return `<g><rect x="${x - c.w / 2}" y="${y - 8}" width="${c.w}" height="16" rx="2" fill="#B0B6BA" stroke="#7C8387"/><text x="${x - c.w / 2}" y="${y + 74}" class="dev-s" text-anchor="start" style="fill:#2A2118">Hutschiene</text></g>`;
  }
  return '';
}

function wallSVG(sim, demo) {
  const L = cur, s = St;
  let holes = ''; for (let y = 20; y < VB_H; y += 30) for (let x = 20; x < VB_W; x += 30) holes += `<circle cx="${x}" cy="${y}" r="2.2"/>`;
  const comps = L.comps.map(c => compSVG(c, sim)).join('');
  const wires = s.wires.map(w => { const a = termPos(w.a), b = termPos(w.b), d = wirePath(a, b), cut = s.mode === 'cut';
    return `<g class="wire${cut ? ' cut' : ''}" data-wire="${w.id}" ${cut ? `tabindex="0" role="button" aria-label="Ader ${COLORS[w.c].name} lösen: ${termName(w.a)} bis ${termName(w.b)}"` : 'aria-hidden="true"'}>
      <path d="${d}" class="w-hit"/><path d="${d}" class="w-out"/><path d="${d}" class="w-core" style="stroke:${COLORS[w.c].v}"/>${w.c === 'gnge' ? `<path d="${d}" class="w-stripe"/>` : ''}</g>`; }).join('');
  const terms = L.comps.map(c => Object.entries(T[c.type].terms).map(([tid, t]) => {
    const k = c.id + '.' + tid, X = c.x + t.x, Y = c.y + t.y, n = count(k), mx = t.max || T[c.type].max;
    const ly = t.y < 0 ? Y - 14 : t.y > 0 ? Y + 24 : Y + 28;
    return `<g class="term${s.pending === k ? ' sel' : ''}${n >= mx ? ' full' : ''}" data-term="${k}" ${demo ? '' : 'tabindex="0"'} role="button" aria-label="${termName(k)}: ${n} von ${mx} Adern">
      <circle cx="${X}" cy="${Y}" r="16" class="hit"/><circle cx="${X}" cy="${Y}" r="7.5" class="screw"/><path d="M${X - 4.5} ${Y}h9" class="slot"/>${t.label ? `<text x="${X}" y="${ly}" class="tl">${t.label}</text>` : ''}</g>`;
  }).join('')).join('');
  const p = s.pending ? termPos(s.pending) : null;
  return `<svg id="${demo ? 'demo-wall' : 'wall'}" viewBox="0 0 ${VB_W} ${VB_H}" aria-label="Übungswand ${L.title}"><defs><pattern id="gy" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="12" fill="var(--w-ge)"/></pattern></defs>
    <rect width="${VB_W}" height="${VB_H}" class="wall-bg"/><g fill="var(--hole)">${holes}</g>${comps}${wires}${p ? `<line id="band" class="band" x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${p.y}"/>` : ''}${terms}</svg>`;
}

function meter() {
  const n = LEVELS.filter(l => DB.done[l.id]).length;
  document.getElementById('meter').innerHTML = `<span>${n}/${LEVELS.length} geschafft</span><span class="bar" aria-hidden="true"><i style="width:${n / LEVELS.length * 100}%"></i></span>`;
}

function home() {
  cur = null; meter();
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  const groups = [...new Set(LEVELS.map(l => l.group))];
  const next = LEVELS.find(l => !DB.done[l.id]) || LEVELS[0];
  main.innerHTML = `
  <section class="hero">
    <div><h2>Schaltungen bauen wie an der <em>Übungswand</em></h2>
      <p>Schraube Adern an echte Klemmen, wähle die richtige Aderfarbe und prüfe dann deine Schaltung. ${LEVELS.length} Übungen: vom ersten Stromkreis über Lichtschaltungen und den Sicherungskasten bis zur Schützschaltung im Schaltschrank. Den Stromlaufplan hast du immer daneben.</p>
      <div class="row" style="margin-top:16px"><button class="btn big" data-go="${next.id}">${Object.keys(DB.done).length ? 'Weiter: ' + next.title : 'Los geht’s'}</button></div></div>
    <div class="demo" aria-hidden="true" id="demo"></div>
  </section>
  ${groups.map(g => `<section class="group"><h3>${g}</h3><div class="levels">${LEVELS.filter(l => l.group === g).map(l => { const i = LEVELS.indexOf(l); return `
    <button class="lv${DB.done[l.id] ? ' done' : ''}" data-go="${l.id}"><span class="no">${DB.done[l.id] ? '✓' : i + 1}</span><b>${l.title}</b><span>${l.short}</span></button>`; }).join('')}</div></section>`).join('')}
  <section class="safety"><h3>Vor jeder echten Arbeit: die 5 Sicherheitsregeln</h3>
    <p>Hier auf der Wand kann nichts passieren. An einer echten Anlage arbeitest du nur spannungsfrei (DIN VDE 0105-100):</p>
    <ol><li>Freischalten</li><li>Gegen Wiedereinschalten sichern</li><li>Spannungsfreiheit feststellen (allpolig)</li><li>Erden und kurzschließen</li><li>Benachbarte, unter Spannung stehende Teile abdecken oder abschranken</li></ol></section>`;
  const demo = LEVELS[0];
  cur = demo; St = { wires: [{ id: 'a', a: 'g1.plus', b: 'e1.a', c: 'rot' }, { id: 'b', a: 'e1.b', b: 'g1.minus', c: 'schwarz' }], inp: {}, main: false, mode: 'wire', pending: null };
  document.getElementById('demo').innerHTML = wallSVG(simulate(demo, St.wires, {}, null), true);
  cur = null; St = null;
  main.querySelectorAll('[data-go]').forEach(b => b.onclick = () => open(b.dataset.go));
  window.scrollTo(0, 0);
}

function open(id) {
  const L = LEVELS.find(l => l.id === id); if (!L) return home();
  cur = L; hintN = 0; clearArm = false;
  const saved = (DB.lv[id] && Array.isArray(DB.lv[id].wires)) ? DB.lv[id].wires.filter(w => termOf(L, w.a) && termOf(L, w.b) && COLORS[w.c]) : [];
  St = { wires: saved, inp: baseInputs(L), main: false, mem: null, mode: 'wire', pending: null, color: L.colors[0], undo: [] };
  if (location.hash !== '#' + id) history.replaceState(null, '', location.pathname + location.search + '#' + id);
  const i = LEVELS.indexOf(L);
  main.innerHTML = `
  <div class="lvhead"><button class="btn ghost" id="back">← Übersicht</button><h2>${L.title}</h2><span class="tag">Übung ${i + 1} von ${LEVELS.length}</span>${DB.done[L.id] ? '<span class="tag" style="color:var(--ok)">✓ geschafft</span>' : ''}</div>
  <div class="stage">
    <div class="wallcol">
      <div class="panel goal"><h3>Auftrag</h3><p>${L.goal}</p></div>
      <div class="wallbox" id="wallbox"></div>
      <p class="swipe">Die Wand ist breiter als dein Bildschirm: zum Verschieben seitlich wischen.</p>
      <p class="status" id="status" role="status" aria-live="polite"></p>
      <div class="tools" id="tools"></div>
      <div class="row"><button class="btn big ok" id="check">Schaltung prüfen</button><button class="btn ghost" id="undo">Rückgängig</button><button class="btn ghost" id="clear">Alle Adern lösen</button></div>
      <div id="result" class="result" aria-live="polite"></div>
    </div>
    <aside class="side">
      <div class="panel"><h3>Worum geht’s?</h3><p>${L.intro}</p></div>
      <div class="panel plan"><h3>Plan</h3>${L.plan()}${L.kind === 'ac' ? '<p class="muted" style="font-size:.85rem;margin-top:6px">Gestrichelt: Schutzleiter PE.</p>' : ''}</div>
      <div class="panel"><h3>Tipps</h3><ol class="hints" id="hints"></ol><button class="btn ghost" id="hint" style="margin-top:8px">Tipp zeigen</button></div>
      <div class="panel"><h3>So verdrahtest du</h3><p>Tippe eine Klemme an, dann die zweite: Dazwischen liegt eine Ader in der gewählten Farbe. Mit „Ader lösen“ nimmst du eine Ader wieder ab. Schalter und Taster tippst du direkt an.${L.kind === 'ac' ? ' Der Schalter oben in der Einspeisung bringt Spannung auf die Wand. Verdrahtet wird nur ohne Spannung.' : ''}</p></div>
    </aside>
  </div>
  ${i + 1 < LEVELS.length ? `<div class="row" style="margin-top:18px"><button class="btn ghost" id="skip">Nächste Übung: ${LEVELS[i + 1].title} →</button></div>` : ''}`;
  document.getElementById('back').onclick = home;
  document.getElementById('check').onclick = doCheck;
  document.getElementById('undo').onclick = undo;
  document.getElementById('clear').onclick = clearAll;
  document.getElementById('hint').onclick = () => { hintN = Math.min(L.hints.length, hintN + 1); renderHints(); };
  const sk = document.getElementById('skip'); if (sk) sk.onclick = () => open(LEVELS[i + 1].id);
  renderTools(); renderHints(); render(); meter();
  setStatus(L.kind === 'ac' ? 'Die Wand ist spannungsfrei. Du kannst gefahrlos verdrahten.' : 'Tippe eine Klemme an, um eine Ader anzuschließen.');
  window.scrollTo(0, 0);
}
function renderHints() {
  const L = cur; document.getElementById('hints').innerHTML = L.hints.slice(0, hintN).map(h => `<li>${h}</li>`).join('');
  const b = document.getElementById('hint'); b.textContent = hintN >= L.hints.length ? 'Alle Tipps angezeigt' : `Tipp zeigen (${hintN + 1}/${L.hints.length})`; b.disabled = hintN >= L.hints.length;
}
function renderTools() {
  const L = cur, s = St;
  document.getElementById('tools').innerHTML = `
    <div class="seg" role="group" aria-label="Werkzeug"><button data-mode="wire" aria-pressed="${s.mode === 'wire'}">Verdrahten</button><button data-mode="cut" aria-pressed="${s.mode === 'cut'}">Ader lösen</button></div>
    <div class="colors" role="radiogroup" aria-label="Aderfarbe"><span class="lab">Ader:</span>
      ${L.colors.map(c => `<button class="sw${c === 'gnge' ? ' gnge' : ''}" role="radio" aria-checked="${s.color === c}" aria-label="${COLORS[c].name}" title="${COLORS[c].name}" data-color="${c}" ${c !== 'gnge' ? `style="background:${COLORS[c].v}"` : ''}></button>`).join('')}</div>
    ${L.kind === 'ac' ? '<p class="colorhint">Aderfarben: L braun, schwarz oder grau · N blau · PE grün-gelb</p>' : ''}`;
  document.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { s.mode = b.dataset.mode; s.pending = null; renderTools(); render(); setStatus(s.mode === 'cut' ? 'Tippe eine Ader an, um sie zu lösen.' : 'Tippe eine Klemme an, um eine Ader anzuschließen.'); });
  document.querySelectorAll('[data-color]').forEach(b => b.onclick = () => { s.color = b.dataset.color; renderTools(); setStatus(`Aderfarbe: ${COLORS[s.color].name}.`); });
}
function loadSummary(sim) {
  return cur.comps.filter(c => T[c.type].load && !T[c.type].load.coil && !T[c.type].meter && c.type !== 'resistor').map(c => { const l = sim.lamps[c.id]; const b = l.b;
    const verb = c.type === 'steckdose' ? (b > 0.5 ? 'hat Spannung' : 'ist spannungslos') : c.type === 'gong' ? (b > 0.5 ? 'klingelt' : 'ist still') : c.type === 'luefter' ? (b > 0.5 ? 'läuft' : 'steht') : (l.burnt ? 'ist durchgebrannt' : b > 0.5 ? 'leuchtet' : b > 0.05 ? 'leuchtet schwach' : 'ist aus');
    return `${c.label} ${verb}`; }).join(', ');
}

/* Live-Schutz: Kurzschluss, Erdschluss, FI-Fehlerstrom */
function protect(sim) {
  if (cur.kind !== 'ac' || !sim.live) return null;
  const rcd = cur.comps.find(c => c.type === 'rcd'), lss = cur.comps.filter(c => c.type === 'ls' && St.inp[c.id]);
  if (sim.short) { if (lss.length) { lss.forEach(c => St.inp[c.id] = 0); return 'Der LS hat ausgelöst: Kurzschluss zwischen L und N!'; } St.main = false; return 'Die Sicherung hat ausgelöst: Kurzschluss zwischen L und N!'; }
  if (sim.earthFault) { if (rcd && St.inp[rcd.id]) { St.inp[rcd.id] = 0; return 'Der FI hat ausgelöst: L ist mit PE verbunden!'; } St.main = false; return 'Abgeschaltet: L ist mit PE verbunden!'; }
  if (rcd && St.inp[rcd.id]) {
    const o = simulate(cur, St.wires, Object.assign(liveInputs(), { [rcd.id]: 0 }), St.mem), f = o.f;
    const bad = cur.comps.some(c => { const D = T[c.type]; if (!D.load || !sim.lamps[c.id] || sim.lamps[c.id].v < 50) return false;
      const a = c.id + '.' + D.load.a, b = c.id + '.' + D.load.b, via = k => f(k) === f(rcd.id + '.Lo') || f(k) === f(rcd.id + '.No');
      return via(a) !== via(b); });
    if (bad) { St.inp[rcd.id] = 0; return 'Der FI hat ausgelöst: Hin- und Rückstrom fließen nicht beide durch den FI. N muss über den FI geführt werden.'; }
  }
  return null;
}
function render() {
  const ae = document.activeElement; const fk = ae && ae.dataset ? (ae.dataset.term && '[data-term="' + ae.dataset.term + '"]') || (ae.dataset.toggle && '[data-toggle="' + ae.dataset.toggle + '"]') || (ae.dataset.main && '[data-main]') || (ae.dataset.test && '[data-test="' + ae.dataset.test + '"]') : null;
  let sim = simulate(cur, St.wires, liveInputs(), St.mem);
  const trip = protect(sim);
  if (trip) { sim = simulate(cur, St.wires, liveInputs(), St.mem); }
  St.mem = sim.mem;
  const box = document.getElementById('wallbox'); box.innerHTML = wallSVG(sim);
  if (fk) { const el = box.querySelector(fk); if (el) el.focus(); }
  if (trip) setStatus(trip, true);
  return sim;
}
function setStatus(msg, bad) { const el = document.getElementById('status'); if (!el) return; el.textContent = msg; el.className = 'status' + (bad ? ' bad' : ''); }
function save() { DB.lv[cur.id] = { wires: St.wires }; persist(); }
function invalidate() { document.getElementById('result').innerHTML = ''; clearArm = false; document.getElementById('clear').textContent = 'Alle Adern lösen'; }
function guardLive() { if (cur.kind === 'ac' && St.main) { document.getElementById('dlg').showModal(); return true; } return false; }

function onTerm(k) {
  const s = St;
  if (guardLive()) return;
  if (s.mode === 'cut') { const ws = s.wires.filter(w => w.a === k || w.b === k); if (!ws.length) { setStatus('An dieser Klemme ist keine Ader.'); return; } removeWire(ws[ws.length - 1].id); return; }
  const full = () => setStatus(maxOf(k) === 1 ? 'Diese Klemme ist schon belegt. Es passt nur eine Ader hinein. Mehrere Adern verbindest du über eine Verbindungsklemme oder Schiene.' : 'Diese Klemme ist voll.', true);
  if (!s.pending) { if (count(k) >= maxOf(k)) { full(); return; } s.pending = k; render(); setStatus(`${termName(k)} gewählt. Tippe jetzt die zweite Klemme an.`); return; }
  if (s.pending === k) { s.pending = null; render(); setStatus('Auswahl aufgehoben.'); return; }
  const a = termOf(cur, s.pending), b = termOf(cur, k);
  if (a.c.id === b.c.id && T[a.c.type].bridge) { setStatus('Diese Eingänge sind schon miteinander verbunden.', true); return; }
  if (count(k) >= maxOf(k)) { full(); return; }
  if (s.wires.some(w => (w.a === s.pending && w.b === k) || (w.b === s.pending && w.a === k))) { setStatus('Diese beiden Klemmen sind schon verbunden.', true); return; }
  s.undo.push(JSON.stringify(s.wires));
  s.wires.push({ id: 'w' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), a: s.pending, b: k, c: s.color });
  s.pending = null; save(); invalidate();
  const sim = render();
  let msg = `Ader (${COLORS[s.color].name}) angeschlossen.`;
  if (cur.kind === 'dc') msg += sim.short ? ' Achtung: Kurzschluss!' : ' ' + loadSummary(sim) + '.';
  setStatus(msg, cur.kind === 'dc' && !!sim.short);
}
function removeWire(id) { if (guardLive()) return; St.undo.push(JSON.stringify(St.wires)); St.wires = St.wires.filter(w => w.id !== id); save(); invalidate(); const sim = render(); setStatus('Ader gelöst.' + (cur.kind === 'dc' ? ' ' + loadSummary(sim) + '.' : '')); }
function undo() { if (guardLive()) return; if (!St.undo.length) { setStatus('Nichts zum Rückgängigmachen.'); return; } St.wires = JSON.parse(St.undo.pop()); St.pending = null; save(); invalidate(); render(); setStatus('Letzter Schritt rückgängig gemacht.'); }
function clearAll() {
  if (guardLive()) return; const b = document.getElementById('clear');
  if (!St.wires.length) { setStatus('Es ist keine Ader angeschlossen.'); return; }
  if (!clearArm) { clearArm = true; b.textContent = 'Wirklich alle lösen?'; setStatus('Tippe noch einmal, um alle Adern zu lösen.'); return; }
  St.undo.push(JSON.stringify(St.wires)); St.wires = []; St.pending = null; save(); invalidate(); render(); setStatus('Alle Adern gelöst.');
}
let pressTimer = null;
function toggle(id) {
  const c = compById(cur, id), D = T[c.type];
  const powered = () => cur.kind === 'dc' || St.main;
  if (D.momentary) {
    if (St.inp[id]) return;
    St.inp[id] = 1; const sim = render(); setStatus(`${c.label} gedrückt.` + (powered() ? ' ' + loadSummary(sim) + '.' : ' Es liegt keine Spannung an.'));
    clearTimeout(pressTimer); pressTimer = setTimeout(() => { St.inp[id] = 0; if (cur && compById(cur, id)) { const s2 = render(); setStatus(`${c.label} losgelassen.` + (powered() ? ' ' + loadSummary(s2) + '.' : '')); } }, 650);
    return;
  }
  St.inp[id] = ((St.inp[id] || 0) + 1) % D.states.length;
  if (D.prot && St.inp[id] && cur.kind === 'ac' && St.main) { const test = simulate(cur, St.wires, liveInputs(), St.mem); if (test.short) { St.inp[id] = 0; render(); setStatus(`${c.label} löst sofort wieder aus: Kurzschluss!`, true); return; } }
  const sim = render();
  setStatus(`${c.label}: ${D.states[St.inp[id]]}.` + (powered() ? ' ' + loadSummary(sim) + '.' : ' Es liegt keine Spannung an. Schalte oben die Einspeisung ein.'));
}
function toggleMain() {
  if (St.main) { St.main = false; St.pending = null; render(); setStatus('Spannung aus. Die Wand ist spannungsfrei, du kannst verdrahten.'); return; }
  St.main = true; St.pending = null; const sim = render();
  if (St.main) setStatus('Spannung ein, 230 V liegen an. ' + loadSummary(sim) + '. Probiere jetzt die Schalter aus.');
}
function testRCD(id) { if (!St.inp[id]) { setStatus('Der FI ist schon aus. Schalte ihn erst wieder ein.'); return; } St.inp[id] = 0; render(); setStatus('Prüftaste gedrückt: Der FI hat ausgelöst. So prüfst du regelmäßig, ob er funktioniert. Wieder einschalten durch Antippen.'); }

function doCheck() {
  const L = cur, r = runCheck(L, St); const out = document.getElementById('result');
  if (r.ok) {
    const first = !DB.done[L.id]; DB.done[L.id] = true; persist(); meter();
    const next = LEVELS[LEVELS.indexOf(L) + 1];
    out.innerHTML = `<div class="panel res-ok"><h3>${first ? 'Geschafft! Die Schaltung funktioniert.' : 'Funktioniert immer noch.'}</h3><p style="margin-top:4px">${L.learn}</p>
      ${L.kind === 'ac' ? '<p style="margin-top:6px"><b>Jetzt ausprobieren:</b> Spannung oben einschalten und die Schalter betätigen.</p>' : ''}
      <div class="row" style="margin-top:12px">${next ? `<button class="btn" id="next">Weiter: ${next.title}</button>` : '<button class="btn" id="next">Zur Übersicht</button>'}</div></div>`;
    document.getElementById('next').onclick = () => next ? open(next.id) : home();
  } else out.innerHTML = `<div class="panel res-bad"><h3>Noch nicht ganz.</h3><ul>${r.E.map(e => `<li>${e}</li>`).join('')}</ul></div>`;
  const h = out.querySelector('h3'); h.setAttribute('tabindex', '-1'); h.focus();
}

/* Eingaben */
main.addEventListener('click', e => {
  if (!cur || !St || !e.target.closest('#wallbox')) return;
  const t = e.target.closest('[data-term]'); if (t) { onTerm(t.dataset.term); return; }
  const w = e.target.closest('[data-wire]'); if (w && St.mode === 'cut') { removeWire(w.dataset.wire); return; }
  const te = e.target.closest('[data-test]'); if (te) { testRCD(te.dataset.test); return; }
  const sw = e.target.closest('[data-toggle]'); if (sw) { toggle(sw.dataset.toggle); return; }
  if (e.target.closest('[data-main]')) { toggleMain(); return; }
  if (St.pending && !e.target.closest('g')) { St.pending = null; render(); setStatus('Auswahl aufgehoben.'); }
});
main.addEventListener('keydown', e => {
  if (!cur || !e.target.closest || !e.target.closest('#wallbox')) return;
  if (e.key === 'Escape' && St.pending) { St.pending = null; render(); setStatus('Auswahl aufgehoben.'); return; }
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const el = e.target.closest('[data-term],[data-wire],[data-toggle],[data-main],[data-test]'); if (!el) return;
  e.preventDefault(); el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
});
main.addEventListener('pointermove', e => {
  const band = document.getElementById('band'); if (!band) return;
  const svg = document.getElementById('wall'); const m = svg && svg.getScreenCTM(); if (!m) return;
  const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse()); band.setAttribute('x2', p.x); band.setAttribute('y2', p.y);
});
const dlg = document.getElementById('dlg');
document.getElementById('dlg-off').onclick = () => { dlg.close(); if (St && St.main) toggleMain(); };
document.getElementById('dlg-close').onclick = () => dlg.close();
document.getElementById('home-btn').onclick = home;
window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id && (!cur || cur.id !== id)) open(id); else if (!id && cur) home(); });
window.SW = { LEVELS, T, simulate, runCheck, makeTester };
const startId = location.hash.slice(1);
if (startId && LEVELS.some(l => l.id === startId)) open(startId); else home();
