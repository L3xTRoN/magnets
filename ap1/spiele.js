/* Lernspiele: Schaltzeichen, Schaltpläne lesen und zeichnen, Farbcode, Formeln umstellen, Einheiten-Memory. */
(function () {
  'use strict';
  const A = LT.api, esc = A.esc;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = A.shuffle;

  /* ---------- Schaltzeichen (DIN EN 60617, vereinfacht), viewBox 0 0 120 60 ---------- */
  const L = (d) => `<path d="${d}"/>`;
  const SYM = {
    widerstand: ['Widerstand', L('M0 30H35M85 30H120') + '<rect x="35" y="22" width="50" height="16"/>'],
    lampe: ['Leuchte / Lampe', L('M0 30H46M74 30H120') + '<circle cx="60" cy="30" r="14"/>' + L('M50 20L70 40M70 20L50 40')],
    batterie: ['Batterie (Gleichspannungsquelle)', L('M0 30H54M66 30H120M54 12V48') + '<path d="M66 20V40" style="stroke-width:6"/>'],
    schliesser: ['Schließer (Schalter)', L('M0 30H40M80 30H120M40 30L78 14')],
    oeffner: ['Öffner', L('M0 30H40M80 30H120M80 30V20M40 30L84 18')],
    taster: ['Taster (Schließer)', L('M0 30H40M80 30H120M40 30L78 14') + '<path d="M59 22V6M52 6H66" stroke-dasharray="4 3"/>'],
    wechsler: ['Wechsler (Wechselschalter)', L('M0 30H40M40 30L78 18M80 18H120M80 42H120')],
    diode: ['Diode', L('M0 30H50M70 30H120M50 18V42L70 30Z M70 18V42')],
    led: ['Leuchtdiode (LED)', L('M0 30H50M70 30H120M50 18V42L70 30Z M70 18V42M64 14L74 4M71 4H74V7M72 18L82 8M79 8H82V11')],
    zdiode: ['Z-Diode', L('M0 30H50M70 30H120M50 18V42L70 30Z M76 14L70 18V42L64 46')],
    kondensator: ['Kondensator', L('M0 30H55M65 30H120M55 14V46M65 14V46')],
    elko: ['Elektrolytkondensator (gepolt)', L('M0 30H52M68 30H120M45 12H51M48 9V15') + '<rect x="52" y="14" width="5" height="32"/><rect x="63" y="14" width="5" height="32" style="fill:currentColor"/>'],
    spule: ['Spule (Induktivität)', L('M0 30H30M90 30H120M30 30A7.5 7.5 0 0 1 45 30A7.5 7.5 0 0 1 60 30A7.5 7.5 0 0 1 75 30A7.5 7.5 0 0 1 90 30')],
    sicherung: ['Sicherung', L('M0 30H120') + '<rect x="38" y="22" width="44" height="16"/>'],
    motor: ['Motor', L('M0 30H46M74 30H120') + '<circle cx="60" cy="30" r="14"/><text x="60" y="36" text-anchor="middle" style="font:700 16px sans-serif;fill:currentColor;stroke:none">M</text>'],
    generator: ['Wechselspannungsquelle', L('M0 30H46M74 30H120') + '<circle cx="60" cy="30" r="14"/>' + L('M51 30C55 22 58 22 60 30S65 38 69 30')],
    trafo: ['Transformator', L('M0 30H38M82 30H120') + '<circle cx="52" cy="30" r="14"/><circle cx="68" cy="30" r="14"/>'],
    erde: ['Erde (Erdung)', L('M60 4V30M40 30H80M47 38H73M54 46H66')],
    schutzleiter: ['Schutzleiteranschluss', '<circle cx="60" cy="30" r="22"/>' + L('M60 12V28M46 28H74M51 35H69M56 42H64')],
    steckdose: ['Steckdose', L('M0 30H34M60 30V8M36 30A24 24 0 0 0 84 30')],
    voltmeter: ['Spannungsmesser (Voltmeter)', L('M0 30H46M74 30H120') + '<circle cx="60" cy="30" r="14"/><text x="60" y="36" text-anchor="middle" style="font:700 16px sans-serif;fill:currentColor;stroke:none">V</text>'],
    amperemeter: ['Strommesser (Amperemeter)', L('M0 30H46M74 30H120') + '<circle cx="60" cy="30" r="14"/><text x="60" y="36" text-anchor="middle" style="font:700 16px sans-serif;fill:currentColor;stroke:none">A</text>'],
    spulerelais: ['Relais- oder Schützspule', L('M0 30H44M76 30H120') + '<rect x="44" y="18" width="32" height="24"/>'],
    transistor: ['Transistor (NPN)', '<circle cx="62" cy="30" r="22"/>' + L('M0 30H52M52 16V44M52 24L80 8M52 36L80 52M80 8V0M80 52V60M73 44L80 52L70 50')],
    gong: ['Klingel / Gong', L('M0 44H40M80 44H120M44 44V30A16 16 0 0 1 76 30V44Z')],
    thermistor: ['Temperaturabhängiger Widerstand', L('M0 30H35M85 30H120') + '<rect x="35" y="22" width="50" height="16"/>' + L('M30 50L90 10M30 50H40') + '<text x="96" y="16" style="font:700 12px sans-serif;fill:currentColor;stroke:none">ϑ</text>'],
  };
  const sym = (id, cls = 'sym-svg') => `<svg viewBox="0 0 120 60" class="${cls}" role="img" aria-label="${SYM[id][0]}"><g class="sg">${SYM[id][1]}</g></svg>`;

  /* ---------- Gemeinsame Quiz-Runde ---------- */
  const R = {};
  function startRound(game) { R[game.id] = { q: 0, ok: 0, streak: 0, best: 0, cur: game.gen(0), ans: null, total: game.len || 10, t0: Date.now(), end: game.timed ? Date.now() + game.timed * 1000 : null }; }
  function roundView(game) {
    const r = R[game.id];
    if (!r) return intro(game);
    if (r.q >= r.total || (r.end && Date.now() > r.end && r.ans == null)) return finish(game, r);
    const c = r.cur, done = r.ans != null;
    const opts = c.opts.map((o, i) => { let cls = ''; if (done) { if (i === c.right) cls = ' right'; else if (i === r.ans) cls = ' wrong'; } return `<button class="opt${cls}${c.big ? ' big' : ''}" data-act="g-pick" data-g="${game.id}" data-i="${i}" ${done ? 'disabled' : ''}><span class="key">${'ABCD'[i]}</span><span>${o}</span></button>`; }).join('');
    const left = r.end ? Math.max(0, Math.ceil((r.end - Date.now()) / 1000)) : null;
    return `${head(game, `${game.timed ? '' : `Frage ${r.q + 1} von ${r.total} · `}${r.ok} Punkte${r.streak >= 2 ? ` · Serie ${r.streak}` : ''}`, left)}
      <section class="card qcard game"><div class="g-prompt">${c.prompt}</div><div class="opts${c.grid ? ' grid' : ''}">${opts}</div>
      ${done ? `<div class="fb ${r.ans === c.right ? 'fb-ok' : 'fb-bad'}"><p><b>${r.ans === c.right ? 'Richtig!' : 'Leider falsch.'}</b> ${c.explain || ''}</p></div><button class="btn big" data-act="g-next" data-g="${game.id}" id="g-next">Weiter</button>` : ''}</section>`;
  }
  const head = (game, info, left) => `<div class="g-head"><a href="#spiele" class="back">← Spiele</a><span class="g-info">${info}</span>${left != null ? `<span class="g-timer" id="g-timer">${left} s</span>` : ''}</div><h1 class="page-h g-title">${game.title}</h1>`;
  function intro(game) {
    const best = (A.S.games || {})[game.id];
    return `${head(game, '')}<section class="card"><p>${game.how}</p>${best ? `<p class="small ok-t">Dein Bestwert: ${best}</p>` : ''}<button class="btn big" data-act="g-start" data-g="${game.id}">Los geht’s</button></section>`;
  }
  function finish(game, r) {
    const score = r.ok, nb = A.best(game.id, score);
    return `${head(game, 'Ergebnis')}<section class="card result"><p class="big-num">${score}<span class="muted"> ${game.timed ? 'Punkte' : 'von ' + r.total}</span></p>${nb && score ? '<p class="ok-t"><b>Neuer Bestwert!</b></p>' : ''}<p>${score >= (game.timed ? 15 : 8) ? 'Stark! Das sitzt.' : 'Noch eine Runde? Mit jeder wird es leichter.'}</p>
      <div class="row"><button class="btn" data-act="g-start" data-g="${game.id}">Nochmal</button><a class="btn ghost" href="#spiele">Andere Spiele</a></div></section>`;
  }

  /* ---------- Spiel 1: Schaltzeichen ---------- */
  const gSym = { id: 'symbole', title: 'Schaltzeichen-Profi', desc: 'Erkenne 26 Schaltzeichen: von Widerstand bis Transistor.', how: 'Du siehst ein Schaltzeichen. Wähle den richtigen Namen. Manchmal ist es umgekehrt: Du siehst den Namen und wählst das Zeichen. 10 Fragen.',
    gen() { const ids = Object.keys(SYM), id = pick(ids), others = shuffle(ids.filter(x => x !== id)).slice(0, 3), all = shuffle([id, ...others]);
      if (Math.random() < 0.6) return { prompt: `<p class="small muted">Wie heißt dieses Schaltzeichen?</p>${sym(id, 'sym-svg big')}`, opts: all.map(x => esc(SYM[x][0])), right: all.indexOf(id), explain: `Das ist: ${SYM[id][0]}.` };
      return { prompt: `<p class="small muted">Welches Zeichen ist das?</p><h2 class="q">${SYM[id][0]}</h2>`, opts: all.map(x => sym(x)), right: all.indexOf(id), grid: true, big: true, explain: '' }; } };

  /* ---------- Spiel 2: Was leuchtet? (Plan lesen) ---------- */
  let swN = 0;
  function genNet(level) {
    swN = 0;
    const leaf = () => ({ t: 's', n: ++swN, on: Math.random() < 0.5 });
    if (level < 3) return { t: Math.random() < 0.5 ? 'ser' : 'par', c: [leaf(), leaf()] };
    if (level < 6) return Math.random() < 0.5 ? { t: 'ser', c: [leaf(), { t: 'par', c: [leaf(), leaf()] }] } : { t: 'par', c: [{ t: 'ser', c: [leaf(), leaf()] }, leaf()] };
    return Math.random() < 0.5 ? { t: 'ser', c: [{ t: 'par', c: [leaf(), leaf()] }, { t: 'par', c: [leaf(), leaf()] }] } : { t: 'par', c: [{ t: 'ser', c: [leaf(), leaf()] }, { t: 'ser', c: [leaf(), { t: 'par', c: [leaf(), leaf()] }] }] };
  }
  const evalNet = (n, ov) => n.t === 's' ? (ov && ov[n.n] !== undefined ? ov[n.n] : n.on) : n.t === 'ser' ? n.c.every(x => evalNet(x, ov)) : n.c.some(x => evalNet(x, ov));
  const leaves = n => n.t === 's' ? [n] : n.c.flatMap(leaves);
  function size(n) { if (n.t === 's') return { w: 70, h: 44 }; const s = n.c.map(size); return n.t === 'ser' ? { w: s.reduce((a, b) => a + b.w, 0), h: Math.max(...s.map(x => x.h)) } : { w: Math.max(...s.map(x => x.w)) + 30, h: s.reduce((a, b) => a + b.h, 0) }; }
  function drawNet(n, x, y) { /* y = Mittellinie, zeichnet von x bis x + w */
    const s = size(n);
    if (n.t === 's') return `<path d="M${x} ${y}H${x + 20}M${x + 50} ${y}H${x + 70}" class="pl"/><circle cx="${x + 20}" cy="${y}" r="2.5" class="dot"/><circle cx="${x + 50}" cy="${y}" r="2.5" class="dot"/><path d="M${x + 20} ${y}L${n.on ? x + 49 : x + 46} ${n.on ? y - 1 : y - 16}" class="pl sw"/><text x="${x + 35}" y="${y + 18}" class="plbl" text-anchor="middle">S${n.n}</text>`;
    if (n.t === 'ser') { let cx = x, out = ''; n.c.forEach(c => { const cs = size(c); out += drawNet(c, cx, y); cx += cs.w; }); return out; }
    let top = y - s.h / 2, out = ''; const pts = [];
    n.c.forEach(c => { const cs = size(c), cy = top + cs.h / 2; out += drawNet(c, x + 15, cy) + `<path d="M${x + 15 + cs.w} ${cy}H${x + s.w - 15}" class="pl"/>`; pts.push(cy); top += cs.h; });
    out += `<path d="M${x} ${y}H${x + 15}M${x + s.w - 15} ${y}H${x + s.w}M${x + 15} ${pts[0]}V${pts[pts.length - 1]}M${x + s.w - 15} ${pts[0]}V${pts[pts.length - 1]}" class="pl"/>`;
    return out;
  }
  function netSVG(net, lampOn) {
    const s = size(net), W = s.w + 140, H = Math.max(140, s.h + 70), y = 40 + s.h / 2;
    return `<svg viewBox="0 0 ${W} ${H}" class="plan-svg" role="img" aria-label="Schaltplan mit ${leaves(net).length} Schaltern">
      <path d="M20 ${y}H40M${40 + s.w} ${y}H${W - 40}V${H - 20}H20V${y}" class="pl"/>${drawNet(net, 40, y)}
      <rect x="10" y="${(y + H - 20) / 2 - 7}" width="20" height="14" class="mask"/><path d="M8 ${(y + H - 20) / 2 - 5}H32" class="pl"/><path d="M14 ${(y + H - 20) / 2 + 5}H26" class="pl" style="stroke-width:5"/>
      <rect x="${W - 54}" y="${(y + H - 20) / 2 - 14}" width="28" height="28" class="mask"/><circle cx="${W - 40}" cy="${(y + H - 20) / 2}" r="12" class="pl ${lampOn ? 'lit' : ''}"/><path d="M${W - 48.5} ${(y + H - 20) / 2 - 8.5}l17 17m0 -17l-17 17" class="pl"/><text x="${W - 22}" y="${(y + H - 20) / 2 + 4}" class="plbl">E1</text></svg>`;
  }
  const gRead = { id: 'leuchtet', title: 'Was leuchtet?', desc: 'Schaltpläne lesen: Leuchtet die Lampe bei diesen Schalterstellungen? Wird immer kniffliger.', how: 'Du siehst einen Stromlaufplan mit Schaltern. Geschlossene Schalter liegen flach, offene stehen schräg ab. Entscheide, ob die Lampe leuchtet, oder welcher Schalter sie einschaltet. 10 Pläne, jeder schwerer als der davor.',
    gen(lv) { const r = R.leuchtet; const level = r ? r.q + 1 : lv; const net = genNet(level); const on = evalNet(net);
      const ls = leaves(net), open = ls.filter(l => !l.on), fix = open.filter(l => evalNet(net, { [l.n]: true }));
      if (!on && fix.length === 1 && open.length >= 2 && level >= 2 && Math.random() < 0.5) {
        const opts = shuffle(open.slice(0, 4)).map(l => 'S' + l.n); return { prompt: `<p class="small muted">Die Lampe ist aus. Welchen <b>einen</b> Schalter musst du schließen, damit sie leuchtet?</p>${netSVG(net, false)}`, opts, right: opts.indexOf('S' + fix[0].n), explain: `Mit S${fix[0].n} geschlossen ist der Stromweg zur Lampe komplett.` };
      }
      return { prompt: `<p class="small muted">Leuchtet die Lampe E1?</p>${netSVG(net, false)}`, opts: ['Ja, sie leuchtet', 'Nein, sie bleibt aus'], right: on ? 0 : 1, explain: on ? 'Es gibt einen durchgehend geschlossenen Weg. Reihe: alle müssen zu sein. Parallel: einer reicht.' : 'Kein durchgehender Weg. Reihe: alle müssen zu sein. Parallel: einer reicht.' }; } };

  /* ---------- Spiel 3: Farbcode-Blitz ---------- */
  const COLS = [['schwarz', '#1b1b1b'], ['braun', '#7a4a25'], ['rot', '#d23a2c'], ['orange', '#f08a24'], ['gelb', '#f2d21b'], ['grün', '#2e9b45'], ['blau', '#2563d6'], ['violett', '#7b3fc4'], ['grau', '#8e959a'], ['weiß', '#f4f4f0']];
  const ohm = v => v >= 1e6 ? (v / 1e6).toLocaleString('de-DE') + ' MΩ' : v >= 1000 ? (v / 1000).toLocaleString('de-DE') + ' kΩ' : v.toLocaleString('de-DE') + ' Ω';
  const resSVG = (a, b, m) => `<svg viewBox="0 0 240 70" class="res-svg" role="img" aria-label="Widerstand mit den Ringen ${COLS[a][0]}, ${COLS[b][0]}, ${COLS[m][0]}, gold"><path d="M0 35H40M200 35H240" stroke="#8e959a" stroke-width="5"/><rect x="40" y="12" width="160" height="46" rx="18" fill="#d9c7a0" stroke="#8c7a55" stroke-width="2"/>
    ${[a, b, m].map((c, i) => `<rect x="${66 + i * 26}" y="12" width="14" height="46" fill="${COLS[c][1]}" stroke="rgba(0,0,0,.2)"/>`).join('')}<rect x="158" y="12" width="14" height="46" fill="#c9a227"/></svg>`;
  const gFarb = { id: 'farbcode', title: 'Farbcode-Blitz', desc: '60 Sekunden: Lies so viele Widerstandswerte wie möglich ab.', timed: 60, len: 999, how: 'Ein Widerstand mit 4 Ringen: 1. Ziffer, 2. Ziffer, Multiplikator, Toleranz (gold). 60 Sekunden, so viele richtige Antworten wie möglich. Merksatz: Schwarze Bären rennen ohne gelbe Gummistiefel bis violette Gänse weinen (0–9).',
    gen() { const a = rnd(1, 9), b = rnd(0, 9), m = rnd(0, 5), v = (a * 10 + b) * 10 ** m; const wrong = new Set(); while (wrong.size < 3) { const x = pick([(a * 10 + b) * 10 ** ((m + rnd(1, 2)) % 6), (b * 10 + a) * 10 ** m, (a * 10 + b + rnd(1, 9)) * 10 ** m, (a * 10 + b) * 10 ** Math.max(0, m - 1)]); if (x !== v && x > 0) wrong.add(x); }
      const opts = shuffle([v, ...wrong]); return { prompt: resSVG(a, b, m), opts: opts.map(ohm), right: opts.indexOf(v), explain: `${COLS[a][0]} = ${a}, ${COLS[b][0]} = ${b}, ${COLS[m][0]} = ${m} Null${m === 1 ? '' : 'en'} → ${ohm(v)} ± 5 %` }; } };

  /* ---------- Spiel 4: Formeln umstellen ---------- */
  const UMS = [
    ['U = R · I', 'I', 'I = U / R', ['I = R / U', 'I = U · R', 'I = U − R']], ['U = R · I', 'R', 'R = U / I', ['R = I / U', 'R = U · I', 'R = U − I']],
    ['P = U · I', 'I', 'I = P / U', ['I = U / P', 'I = P · U', 'I = P − U']], ['P = U · I', 'U', 'U = P / I', ['U = I / P', 'U = P · I', 'U = P − I']],
    ['P = U² / R', 'R', 'R = U² / P', ['R = P / U²', 'R = P · U²', 'R = √(P / U)']], ['P = U² / R', 'U', 'U = √(P · R)', ['U = P · R', 'U = √(P / R)', 'U = P / R²']],
    ['P = I² · R', 'I', 'I = √(P / R)', ['I = P / R²', 'I = √(P · R)', 'I = P · R']], ['W = P · t', 't', 't = W / P', ['t = P / W', 't = W · P', 't = W − P']],
    ['R = l / (κ · A)', 'A', 'A = l / (κ · R)', ['A = κ · R / l', 'A = l · κ · R', 'A = R / (κ · l)']], ['R = l / (κ · A)', 'l', 'l = R · κ · A', ['l = R / (κ · A)', 'l = κ · A / R', 'l = R · κ / A']],
    ['τ = R · C', 'C', 'C = τ / R', ['C = R / τ', 'C = τ · R', 'C = τ − R']], ['f = 1 / T', 'T', 'T = 1 / f', ['T = f', 'T = f / 1000', 'T = 1 − f']],
    ['F = B · I · l', 'I', 'I = F / (B · l)', ['I = F · B · l', 'I = B · l / F', 'I = F / B · l']], ['U1 / U2 = N1 / N2', 'U2', 'U2 = U1 · N2 / N1', ['U2 = U1 · N1 / N2', 'U2 = N1 · N2 / U1', 'U2 = U1 / (N1 · N2)']],
    ['U1 / U2 = N1 / N2', 'N1', 'N1 = N2 · U1 / U2', ['N1 = N2 · U2 / U1', 'N1 = U1 · U2 / N2', 'N1 = N2 / (U1 · U2)']], ['P = √3 · U · I · cos φ', 'I', 'I = P / (√3 · U · cos φ)', ['I = √3 · U · cos φ / P', 'I = P · √3 · U · cos φ', 'I = P / U']],
    ['η = P_ab / P_zu', 'P_zu', 'P_zu = P_ab / η', ['P_zu = η / P_ab', 'P_zu = P_ab · η', 'P_zu = η − P_ab']], ['Rv = (U − U_F) / I', 'I', 'I = (U − U_F) / Rv', ['I = Rv / (U − U_F)', 'I = (U − U_F) · Rv', 'I = U / Rv − U_F']],
    ['Q = C · U', 'U', 'U = Q / C', ['U = C / Q', 'U = Q · C', 'U = Q − C']], ['XL = 2π · f · L', 'L', 'L = XL / (2π · f)', ['L = 2π · f / XL', 'L = XL · 2π · f', 'L = XL − 2π · f']],
  ];
  const gUms = { id: 'umstellen', title: 'Formel-Akrobat', desc: 'Formeln nach der gesuchten Größe umstellen. Die wichtigste Fähigkeit für jede Rechenaufgabe.', how: 'Du bekommst eine Formel und die gesuchte Größe. Wähle die richtig umgestellte Formel. 10 Aufgaben. Tipp: Was mal steht, wandert geteilt auf die andere Seite und umgekehrt.',
    gen() { const [f, v, right, wr] = pick(UMS); const opts = shuffle([right, ...wr]); return { prompt: `<p class="small muted">Stelle nach <b>${v}</b> um:</p><p class="bigformula">${f}</p>`, opts, right: opts.indexOf(right), explain: `${right}` }; } };

  /* ---------- Spiel 5: Plan-Baumeister (Schaltpläne vervollständigen) ---------- */
  /* Lücken: [x, y, Drehung, richtiges Zeichen] im Plan (viewBox 260 x 200) */
  const PUZ = [
    { t: 'Ausschaltung', d: 'Eine Leuchte, die mit einem Schalter am Außenleiter geschaltet wird.', base: 'M30 30H230M30 170H230M130 30V170', labels: [[6, 34, 'L1'], [6, 174, 'N']], gaps: [[130, 70, 90, 'schliesser'], [130, 125, 90, 'lampe']] },
    { t: 'LED mit Vorwiderstand', d: 'Eine LED an einer Batterie, der Strom wird begrenzt.', base: 'M50 40H210V160H50Z', labels: [], gaps: [[50, 100, 90, 'batterie'], [130, 40, 0, 'widerstand'], [210, 100, 90, 'led']] },
    { t: 'Strom und Spannung messen', d: 'Eine Lampe: Strom in Reihe messen, Spannung parallel zur Lampe.', base: 'M50 40H210V160H50ZM210 70H245V130H210', labels: [], gaps: [[50, 100, 90, 'batterie'], [130, 40, 0, 'amperemeter'], [210, 100, 90, 'lampe'], [245, 100, 90, 'voltmeter']] },
    { t: 'Reihenschaltung mit Schalter', d: 'Zwei Lampen in Reihe, ein Schalter schaltet beide.', base: 'M40 40H220V160H40Z', labels: [], gaps: [[40, 100, 90, 'batterie'], [100, 40, 0, 'schliesser'], [170, 40, 0, 'lampe'], [220, 100, 90, 'lampe']] },
    { t: 'Wechselschaltung', d: 'Eine Leuchte von zwei Stellen. Die Wechsler sind schon in der richtigen Stellung gezeichnet.', base: 'M30 15H230M30 190H230M130 15V31M130 174V190', labels: [[6, 19, 'L1'], [6, 194, 'N']], gaps: [[130, 55, 90, 'wechsler'], [130, 105, -90, 'wechsler'], [130, 150, 90, 'lampe']], note: 'Zwischen den beiden Wechslern liegen die korrespondierenden Adern.' },
    { t: 'Selbsthaltung', d: 'Schützsteuerung: AUS-Taster, EIN-Taster, Haltekontakt parallel zu EIN, Schützspule.', base: 'M30 8H230M30 196H230M100 8V26M100 74V86M100 80H160V86M160 134V140H100M100 134V141M100 189V196', labels: [[6, 12, 'L1'], [6, 200, 'N']], gaps: [[100, 50, 90, 'oeffner'], [100, 110, 90, 'taster'], [160, 110, 90, 'schliesser'], [100, 165, 90, 'spulerelais']] },
    { t: 'Motor über Schütz', d: 'Hauptstromkreis: Sicherung, Schützkontakt, Motor.', base: 'M30 20H230M30 186H230M130 20V186', labels: [[6, 24, 'L1'], [6, 190, 'N']], gaps: [[130, 55, 90, 'sicherung'], [130, 100, 90, 'schliesser'], [130, 148, 90, 'motor']] },
    { t: 'Einweggleichrichter', d: 'Netzspannung heruntertransformieren, gleichrichten, glätten, Verbraucher.', base: 'M60 40H230M60 160H230M175 40V160M230 40V160', labels: [], gaps: [[60, 100, 90, 'trafo'], [120, 40, 0, 'diode'], [175, 100, 90, 'elko'], [230, 100, 90, 'widerstand']] },
    { t: 'Klingelanlage', d: 'Klingeltrafo, Klingeltaster, Gong im Kleinspannungskreis.', base: 'M50 40H210V160H50Z', labels: [], gaps: [[50, 100, 90, 'trafo'], [130, 40, 0, 'taster'], [210, 100, 90, 'gong']] },
  ];
  let pz = null;
  function puzzleView() {
    if (!pz) return `${head(gPlan, '')}<section class="card"><p>${gPlan.how}</p><div class="modes two">${PUZ.map((p, i) => { const done = ((A.S.games || {}).planDone || {})[i]; return `<button class="mode" data-act="pz-open" data-i="${i}"><b>${done ? '✓ ' : ''}${p.t}</b><span>${p.d}</span></button>`; }).join('')}</div></section>`;
    const P = PUZ[pz.i];
    const palette = shuffle([...new Set([...P.gaps.map(g => g[3]), ...shuffle(Object.keys(SYM)).slice(0, 4)])]);
    pz.palette = pz.palette || palette;
    const gapsSvg = P.gaps.map((g, k) => { const [x, y, rot, want] = g, put = pz.fill[k], state = pz.checked ? (put === want ? 'ok' : 'bad') : '';
      return `<g class="gap ${pz.sel === k ? 'sel' : ''} ${state}" data-act="pz-gap" data-k="${k}" tabindex="0" role="button" aria-label="Lücke ${k + 1}${put ? ': ' + SYM[put][0] : ' (leer)'}" transform="translate(${x} ${y}) rotate(${rot})">
        <rect x="-25" y="-15" width="50" height="30" rx="6" class="gap-bg"/>${put ? `<g transform="translate(-24 -12) scale(.4)" class="sg">${SYM[put][1]}</g>` : `<text x="0" y="5" class="plbl" text-anchor="middle" transform="rotate(${-rot})">${k + 1}</text>`}</g>`; }).join('');
    const ok = pz.checked && P.gaps.every((g, k) => pz.fill[k] === g[3]);
    return `${head(gPlan, `Plan ${pz.i + 1} von ${PUZ.length}`)}
      <section class="card"><h2>${P.t}</h2><p class="small">${P.d} Tippe eine Lücke an und wähle dann das passende Schaltzeichen.</p>${P.note ? `<p class="small muted">${P.note}</p>` : ''}
      <svg viewBox="0 0 260 206" class="plan-svg puzzle" role="img" aria-label="Schaltplan ${P.t} mit Lücken"><path d="${P.base}" class="pl"/>${P.labels.map(([x, y, t]) => `<text x="${x}" y="${y}" class="plbl">${t}</text>`).join('')}${gapsSvg}</svg>
      <div class="palette-sym">${pz.palette.map(id => `<button class="symbtn" data-act="pz-sym" data-id="${id}" title="${SYM[id][0]}" aria-label="${SYM[id][0]}">${sym(id)}<small>${SYM[id][0].split(' (')[0]}</small></button>`).join('')}</div>
      ${pz.checked ? `<div class="fb ${ok ? 'fb-ok' : 'fb-bad'}"><p><b>${ok ? 'Perfekt, der Plan stimmt!' : 'Noch nicht ganz.'}</b> ${ok ? '' : 'Rot markierte Lücken sind falsch. Tippe sie an und tausche das Zeichen.'}</p>${ok ? `<p class="small">Richtig: ${P.gaps.map((g, k) => `${k + 1} = ${SYM[g[3]][0]}`).join(', ')}</p>` : ''}</div>` : ''}
      <div class="row"><button class="btn" data-act="pz-check">Plan prüfen</button>${ok && pz.i + 1 < PUZ.length ? '<button class="btn ghost" data-act="pz-next">Nächster Plan</button>' : ''}<button class="btn ghost" data-act="pz-list">Alle Pläne</button></div></section>`;
  }
  const gPlan = { id: 'plaene', title: 'Plan-Baumeister', desc: 'Schaltpläne zeichnen: Setze die richtigen Schaltzeichen in 9 echte Stromlaufpläne ein.', how: 'Jeder Plan hat Lücken. Setze die passenden Schaltzeichen ein und prüfe den Plan. So lernst du, wie man Schaltungen zeichnet und liest: Ausschaltung, Wechselschaltung, Selbsthaltung, Gleichrichter und mehr.' };

  /* ---------- Spiel 6: Einheiten-Memory ---------- */
  const PAIRS = [['Spannung U', 'Volt (V)'], ['Stromstärke I', 'Ampere (A)'], ['Widerstand R', 'Ohm (Ω)'], ['Leistung P', 'Watt (W)'], ['Arbeit W', 'Kilowattstunde (kWh)'], ['Kapazität C', 'Farad (F)'], ['Induktivität L', 'Henry (H)'], ['Frequenz f', 'Hertz (Hz)'], ['Ladung Q', 'Coulomb (C)'], ['Leitwert G', 'Siemens (S)'], ['Flussdichte B', 'Tesla (T)'], ['Magn. Fluss Φ', 'Weber (Wb)'], ['Scheinleistung S', 'Voltampere (VA)'], ['Blindleistung Q', 'var']];
  let mem = null;
  function memNew() { const ps = shuffle(PAIRS).slice(0, 6); mem = { cards: shuffle(ps.flatMap((p, i) => [{ p: i, t: p[0], k: 'g' }, { p: i, t: p[1], k: 'e' }])), open: [], found: [], moves: 0, lock: false }; }
  function memView() {
    if (!mem) memNew();
    const done = mem.found.length === mem.cards.length / 2;
    if (done) { const S = A.S; S.games = S.games || {}; const nb = !S.games.memoryMoves || mem.moves < S.games.memoryMoves; if (nb) { S.games.memoryMoves = mem.moves; A.best('memory', 20 - mem.moves > 0 ? 20 - mem.moves : 1); } }
    return `${head(gMem, `${mem.moves} Züge${(A.S.games || {}).memoryMoves ? ' · Bestwert ' + A.S.games.memoryMoves : ''}`)}<section class="card"><p class="small">Finde die Paare aus Größe und Einheit. Tippe zwei Karten an.</p>
      <div class="memgrid">${mem.cards.map((c, i) => { const shown = mem.open.includes(i) || mem.found.includes(c.p); return `<button class="mcard ${shown ? 'up' : ''} ${mem.found.includes(c.p) ? 'found' : ''} ${c.k}" data-act="mem-flip" data-i="${i}" ${shown ? 'aria-pressed="true"' : ''} aria-label="${shown ? esc(c.t) : 'verdeckte Karte'}">${shown ? esc(c.t) : '?'}</button>`; }).join('')}</div>
      ${done ? `<div class="fb fb-ok"><p><b>Alle Paare gefunden in ${mem.moves} Zügen!</b></p></div><button class="btn" data-act="mem-new">Neues Spiel</button>` : ''}</section>`;
  }
  const gMem = { id: 'memory', title: 'Einheiten-Memory', desc: 'Finde die Paare aus Größe und Einheit: Volt, Ampere, Farad, Tesla …' };

  /* ---------- Registrierung ---------- */
  const QUIZ = [gSym, gRead, gFarb, gUms];
  LT.ext.games.push(gSym, gRead, gPlan, gFarb, gUms, gMem);
  const byId = Object.fromEntries([...QUIZ, gPlan, gMem].map(g => [g.id, g]));
  LT.ext.routes.push(['spiel', id => { const g = byId[id]; if (!g) return null; if (g === gPlan) return puzzleView(); if (g === gMem) return memView(); return roundView(g); }]);
  LT.ext.acts['g-start'] = el => { startRound(byId[el.dataset.g]); A.render(); };
  LT.ext.acts['g-pick'] = el => { const g = byId[el.dataset.g], r = R[g.id]; if (!r || r.ans != null) return; r.ans = +el.dataset.i; const ok = r.ans === r.cur.right; if (ok) { r.ok++; r.streak++; } else r.streak = 0; A.count(ok);
    if (g.timed && ok) { r.q++; r.ans = null; r.cur = g.gen(r.q); A.render(); return; } A.render(); const n = document.getElementById('g-next'); if (n) n.focus({ preventScroll: true }); };
  LT.ext.acts['g-next'] = el => { const g = byId[el.dataset.g], r = R[g.id]; r.q++; r.ans = null; if (r.q < r.total) r.cur = g.gen(r.q); A.render(); };
  LT.ext.acts['pz-open'] = el => { pz = { i: +el.dataset.i, fill: {}, sel: 0, checked: false }; A.render(); };
  LT.ext.acts['pz-list'] = () => { pz = null; A.render(); };
  LT.ext.acts['pz-next'] = () => { pz = { i: pz.i + 1, fill: {}, sel: 0, checked: false }; A.render(); };
  LT.ext.acts['pz-gap'] = el => { pz.sel = +el.dataset.k; A.render(); };
  LT.ext.acts['pz-sym'] = el => { if (pz.sel == null) { A.toast('Tippe zuerst eine Lücke an.'); return; } pz.fill[pz.sel] = el.dataset.id; pz.checked = false; const n = PUZ[pz.i].gaps.length; for (let k = 1; k <= n; k++) { const j = (pz.sel + k) % n; if (!pz.fill[j]) { pz.sel = j; break; } } A.render(); };
  LT.ext.acts['pz-check'] = () => { const P = PUZ[pz.i]; if (P.gaps.some((g, k) => !pz.fill[k])) { A.toast('Fülle zuerst alle Lücken.'); return; } pz.checked = true; const ok = P.gaps.every((g, k) => pz.fill[k] === g[3]); A.count(ok); if (ok) { const S = A.S; S.games = S.games || {}; S.games.planDone = S.games.planDone || {}; S.games.planDone[pz.i] = true; A.best('plaene', Object.keys(S.games.planDone).length); } A.render(); };
  LT.ext.acts['mem-new'] = () => { memNew(); A.render(); };
  LT.ext.acts['mem-flip'] = el => { const i = +el.dataset.i; if (mem.lock || mem.open.includes(i) || mem.found.includes(mem.cards[i].p)) return; mem.open.push(i);
    if (mem.open.length === 2) { mem.moves++; const [a, b] = mem.open.map(k => mem.cards[k]); if (a.p === b.p && a.k !== b.k) { mem.found.push(a.p); mem.open = []; A.count(true); } else { mem.lock = true; setTimeout(() => { mem.open = []; mem.lock = false; A.render(); }, 900); } }
    A.render(); };
  /* Countdown-Anzeige für das Zeitspiel */
  setInterval(() => { const t = document.getElementById('g-timer'); if (!t) return; const r = R.farbcode; if (!r || !r.end) return; const left = Math.max(0, Math.ceil((r.end - Date.now()) / 1000)); t.textContent = left + ' s'; if (left === 0 && r.ans == null) A.render(); }, 250);
  LT.ext.after.push(r => { if (r === 'spiele') { pz = null; Object.keys(R).forEach(k => delete R[k]); } });
  LT.SYM = SYM; LT.PUZ = PUZ;
})();
