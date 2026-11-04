/* Rechentrainer und Formelsammlung.
   Jede Aufgabe wird mit Zufallswerten erzeugt und hat einen vollständigen Lösungsweg:
   Gegeben → Gesucht → Formel → (Umstellen) → Einsetzen → Ergebnis. */
(function () {
  'use strict';
  const A = LT.api;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const f = (x, d = 3) => { if (!isFinite(x)) return '–'; const p = Math.abs(x) >= 100 ? Math.min(d, 1) : Math.abs(x) >= 10 ? Math.min(d, 2) : d; return Number(x.toFixed(p)).toLocaleString('de-DE', { maximumFractionDigits: p }); };
  const sq3 = Math.sqrt(3), PI = Math.PI;
  const T = (o) => Object.assign({ tol: 0.02 }, o);

  /* ---------- Aufgabengeneratoren ---------- */
  const G = {};
  const add = (id, group, title, gen) => { G[id] = { id, group, title, gen }; };

  add('ohm', 'Grundlagen', 'Ohmsches Gesetz', () => {
    const R = pick([10, 22, 47, 56, 100, 150, 220, 330, 470, 1000]), I = pick([0.05, 0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]), U = R * I, v = rnd(0, 2);
    if (v === 0) return T({ q: `An einem Widerstand R = ${f(R)} Ω liegt die Spannung U = ${f(U)} V. Wie groß ist der Strom I?`, given: [['R', f(R) + ' Ω'], ['U', f(U) + ' V']], find: 'I in A', formula: 'U = R · I', steps: ['I = U / R', `I = ${f(U)} V / ${f(R)} Ω`], ans: I, unit: 'A' });
    if (v === 1) return T({ q: `Durch einen Widerstand R = ${f(R)} Ω fließt I = ${f(I)} A. Welche Spannung fällt ab?`, given: [['R', f(R) + ' Ω'], ['I', f(I) + ' A']], find: 'U in V', formula: 'U = R · I', steps: [`U = ${f(R)} Ω · ${f(I)} A`], ans: U, unit: 'V' });
    return T({ q: `Ein Verbraucher nimmt an U = ${f(U)} V einen Strom von I = ${f(I)} A auf. Wie groß ist sein Widerstand?`, given: [['U', f(U) + ' V'], ['I', f(I) + ' A']], find: 'R in Ω', formula: 'U = R · I', steps: ['R = U / I', `R = ${f(U)} V / ${f(I)} A`], ans: R, unit: 'Ω' });
  });
  add('leistung', 'Grundlagen', 'Elektrische Leistung', () => {
    const U = pick([12, 24, 230]), v = rnd(0, 3);
    if (v === 0) { const I = pick([0.5, 1.2, 2, 4.35, 6.5, 8.7]); return T({ q: `Ein Gerät nimmt an ${U} V einen Strom von ${f(I)} A auf. Wie groß ist die Leistung?`, given: [['U', U + ' V'], ['I', f(I) + ' A']], find: 'P in W', formula: 'P = U · I', steps: [`P = ${U} V · ${f(I)} A`], ans: U * I, unit: 'W' }); }
    if (v === 1) { const P = pick([60, 100, 500, 1000, 2000, 2300, 3000]); return T({ q: `Ein Gerät hat ${P} W bei ${U} V. Wie groß ist der Strom?`, given: [['P', P + ' W'], ['U', U + ' V']], find: 'I in A', formula: 'P = U · I', steps: ['I = P / U', `I = ${P} W / ${U} V`], ans: P / U, unit: 'A' }); }
    if (v === 2) { const P = pick([40, 60, 100, 500, 1000, 2000]); return T({ q: `Eine Heizung hat bei ${U} V die Leistung ${P} W. Wie groß ist ihr Widerstand?`, given: [['P', P + ' W'], ['U', U + ' V']], find: 'R in Ω', formula: 'P = U² / R', steps: ['R = U² / P', `R = (${U} V)² / ${P} W`], ans: U * U / P, unit: 'Ω' }); }
    const R = pick([10, 22, 47, 100]), I = pick([0.5, 1, 2, 3]); return T({ q: `Durch R = ${R} Ω fließen ${I} A. Welche Leistung wird in Wärme umgesetzt?`, given: [['R', R + ' Ω'], ['I', I + ' A']], find: 'P in W', formula: 'P = I² · R', steps: [`P = (${I} A)² · ${R} Ω`], ans: I * I * R, unit: 'W' });
  });
  add('arbeit', 'Grundlagen', 'Arbeit und Stromkosten', () => {
    const P = pick([60, 100, 800, 1200, 2000, 2500]), h = pick([2, 3, 4, 5, 8, 10]), d = pick([1, 7, 30]), price = pick([0.3, 0.32, 0.35, 0.4]);
    const W = P / 1000 * h * d, v = rnd(0, 1);
    if (v === 0) return T({ q: `Ein Gerät mit ${P} W läuft ${h} Stunden täglich an ${d} ${d === 1 ? 'Tag' : 'Tagen'}. Wie groß ist die elektrische Arbeit?`, given: [['P', P + ' W = ' + f(P / 1000) + ' kW'], ['t', `${h} h · ${d} = ${h * d} h`]], find: 'W in kWh', formula: 'W = P · t', steps: [`W = ${f(P / 1000)} kW · ${h * d} h`], ans: W, unit: 'kWh' });
    return T({ q: `Ein Gerät mit ${P} W läuft ${h} Stunden täglich an ${d} ${d === 1 ? 'Tag' : 'Tagen'}. Strompreis ${f(price)} €/kWh. Wie hoch sind die Kosten?`, given: [['P', f(P / 1000) + ' kW'], ['t', h * d + ' h'], ['Preis', f(price) + ' €/kWh']], find: 'Kosten in €', formula: 'W = P · t,  Kosten = W · Preis', steps: [`W = ${f(P / 1000)} kW · ${h * d} h = ${f(W)} kWh`, `Kosten = ${f(W)} kWh · ${f(price)} €/kWh`], ans: W * price, unit: '€' });
  });
  add('reihe', 'Schaltungen', 'Reihenschaltung', () => {
    const R1 = pick([10, 22, 47, 100, 150]), R2 = pick([22, 33, 68, 100, 220]), R3 = pick([0, 10, 47, 100]), U = pick([12, 24, 48]); const Rg = R1 + R2 + R3, I = U / Rg, v = rnd(0, 2);
    const rs = R3 ? `R1 = ${R1} Ω, R2 = ${R2} Ω, R3 = ${R3} Ω` : `R1 = ${R1} Ω, R2 = ${R2} Ω`;
    const given = [['R1', R1 + ' Ω'], ['R2', R2 + ' Ω'], ...(R3 ? [['R3', R3 + ' Ω']] : []), ['U', U + ' V']];
    if (v === 0) return T({ q: `Reihenschaltung: ${rs}. Wie groß ist der Gesamtwiderstand?`, given: given.slice(0, -1), find: 'R in Ω', formula: 'R = R1 + R2 + …', steps: [`R = ${[R1, R2, R3].filter(Boolean).join(' Ω + ')} Ω`], ans: Rg, unit: 'Ω' });
    if (v === 1) return T({ q: `Reihenschaltung an ${U} V: ${rs}. Wie groß ist der Strom?`, given, find: 'I in A', formula: 'R = R1 + R2 + … ;  I = U / R', steps: [`R = ${Rg} Ω`, `I = ${U} V / ${Rg} Ω`], ans: I, unit: 'A' });
    return T({ q: `Reihenschaltung an ${U} V: ${rs}. Welche Spannung liegt an R2?`, given, find: 'U2 in V', formula: 'I = U / R ;  U2 = R2 · I', steps: [`R = ${Rg} Ω`, `I = ${U} V / ${Rg} Ω = ${f(I, 4)} A`, `U2 = ${R2} Ω · ${f(I, 4)} A`], ans: R2 * I, unit: 'V' });
  });
  add('parallel', 'Schaltungen', 'Parallelschaltung', () => {
    const R1 = pick([10, 20, 30, 40, 60, 100, 120, 150, 300]), R2 = pick([10, 20, 30, 60, 100, 150, 200, 600]), U = pick([12, 24, 230]); const Rg = R1 * R2 / (R1 + R2), v = rnd(0, 1);
    if (v === 0) return T({ q: `R1 = ${R1} Ω und R2 = ${R2} Ω sind parallel geschaltet. Wie groß ist der Gesamtwiderstand?`, given: [['R1', R1 + ' Ω'], ['R2', R2 + ' Ω']], find: 'R in Ω', formula: 'R = R1 · R2 / (R1 + R2)', steps: [`R = ${R1} Ω · ${R2} Ω / (${R1} Ω + ${R2} Ω)`, `R = ${R1 * R2} Ω² / ${R1 + R2} Ω`], ans: Rg, unit: 'Ω' });
    return T({ q: `R1 = ${R1} Ω und R2 = ${R2} Ω liegen parallel an ${U} V. Wie groß ist der Gesamtstrom?`, given: [['R1', R1 + ' Ω'], ['R2', R2 + ' Ω'], ['U', U + ' V']], find: 'I in A', formula: 'I1 = U / R1 ;  I2 = U / R2 ;  I = I1 + I2', steps: [`I1 = ${U} V / ${R1} Ω = ${f(U / R1)} A`, `I2 = ${U} V / ${R2} Ω = ${f(U / R2)} A`, `I = ${f(U / R1)} A + ${f(U / R2)} A`], ans: U / R1 + U / R2, unit: 'A' });
  });
  add('gemischt', 'Schaltungen', 'Gemischte Schaltung', () => {
    const R1 = pick([10, 20, 47, 100]), R2 = pick([20, 30, 60, 120]), R3 = pick([20, 60, 120, 40]), U = pick([12, 24]); const R23 = R2 * R3 / (R2 + R3), Rg = R1 + R23;
    return T({ q: `R1 = ${R1} Ω liegt in Reihe zu einer Parallelschaltung aus R2 = ${R2} Ω und R3 = ${R3} Ω. Spannung ${U} V. Wie groß ist der Gesamtstrom?`, given: [['R1', R1 + ' Ω'], ['R2', R2 + ' Ω'], ['R3', R3 + ' Ω'], ['U', U + ' V']], find: 'I in A',
      formula: 'R23 = R2 · R3 / (R2 + R3) ;  R = R1 + R23 ;  I = U / R', steps: [`R23 = ${R2} · ${R3} / (${R2} + ${R3}) Ω = ${f(R23)} Ω`, `R = ${R1} Ω + ${f(R23)} Ω = ${f(Rg)} Ω`, `I = ${U} V / ${f(Rg)} Ω`], ans: U / Rg, unit: 'A', hint: 'Immer von innen nach außen: erst die Parallelschaltung zusammenfassen, dann die Reihe.' });
  });
  add('teiler', 'Schaltungen', 'Spannungsteiler', () => {
    const R1 = pick([1, 2.2, 3.3, 4.7, 10]) * 1000, R2 = pick([1, 2.2, 4.7, 6.8, 10]) * 1000, U = pick([5, 9, 12, 24]);
    return T({ q: `Unbelasteter Spannungsteiler an ${U} V: R1 = ${f(R1 / 1000)} kΩ (oben), R2 = ${f(R2 / 1000)} kΩ (unten). Wie groß ist U2 an R2?`, given: [['U', U + ' V'], ['R1', f(R1 / 1000) + ' kΩ'], ['R2', f(R2 / 1000) + ' kΩ']], find: 'U2 in V', formula: 'U2 = U · R2 / (R1 + R2)', steps: [`U2 = ${U} V · ${f(R2 / 1000)} kΩ / (${f(R1 / 1000)} kΩ + ${f(R2 / 1000)} kΩ)`], ans: U * R2 / (R1 + R2), unit: 'V' });
  });
  add('kirchhoff', 'Schaltungen', 'Kirchhoffsche Regeln', () => {
    if (rnd(0, 1)) { const I = pick([2, 3.5, 5, 8, 10]), I1 = +(I * pick([0.2, 0.3, 0.4, 0.5])).toFixed(2), I3 = +(I * 0.1).toFixed(2);
      return T({ q: `In einen Knoten fließen ${f(I)} A hinein. Heraus fließen I1 = ${f(I1)} A, I3 = ${f(I3)} A und I2. Wie groß ist I2?`, given: [['I zu', f(I) + ' A'], ['I1', f(I1) + ' A'], ['I3', f(I3) + ' A']], find: 'I2 in A', formula: 'Knotenregel: Σ I zu = Σ I ab', steps: [`${f(I)} A = ${f(I1)} A + I2 + ${f(I3)} A`, `I2 = ${f(I)} A − ${f(I1)} A − ${f(I3)} A`], ans: I - I1 - I3, unit: 'A' }); }
    const U = pick([12, 24, 230]), U1 = +(U * pick([0.25, 0.4, 0.5])).toFixed(1), U3 = +(U * 0.15).toFixed(1);
    return T({ q: `Drei Widerstände in Reihe an ${U} V. An R1 liegen ${f(U1)} V, an R3 liegen ${f(U3)} V. Welche Spannung liegt an R2?`, given: [['U', U + ' V'], ['U1', f(U1) + ' V'], ['U3', f(U3) + ' V']], find: 'U2 in V', formula: 'Maschenregel: U = U1 + U2 + U3', steps: [`U2 = ${U} V − ${f(U1)} V − ${f(U3)} V`], ans: U - U1 - U3, unit: 'V' });
  });
  add('leiter', 'Leitungen', 'Leiterwiderstand', () => {
    const mat = pick([['Kupfer', 56], ['Kupfer', 56], ['Aluminium', 35]]), A = pick([1.5, 2.5, 4, 6, 10]), l = pick([10, 15, 20, 25, 30, 40, 50]), hr = rnd(0, 1);
    const L = hr ? 2 * l : l;
    return T({ q: hr ? `Eine ${mat[0]}-Zuleitung (Hin- und Rückleiter) ist ${l} m lang, Querschnitt ${f(A)} mm². Wie groß ist der Widerstand beider Leiter zusammen? (κ = ${mat[1]} m/(Ω·mm²))` : `Ein ${mat[0]}draht ist ${l} m lang und hat ${f(A)} mm² Querschnitt. Wie groß ist sein Widerstand? (κ = ${mat[1]} m/(Ω·mm²))`,
      given: [['l', hr ? `2 · ${l} m = ${L} m` : l + ' m'], ['A', f(A) + ' mm²'], ['κ', mat[1] + ' m/(Ω·mm²)']], find: 'R in Ω', formula: 'R = l / (κ · A)', steps: [`R = ${L} m / (${mat[1]} m/(Ω·mm²) · ${f(A)} mm²)`], ans: L / (mat[1] * A), unit: 'Ω', hint: hr ? 'Hin- und Rückleiter: Länge verdoppeln!' : '' });
  });
  add('spannungsfall', 'Leitungen', 'Spannungsfall', () => {
    const l = pick([15, 20, 25, 30, 35]), I = pick([10, 13, 16]), A = pick([1.5, 2.5]), U = 230; const dU = 2 * l * I / (56 * A), v = rnd(0, 1);
    if (v === 0) return T({ q: `Wechselstromleitung, Kupfer, l = ${l} m, I = ${I} A, A = ${f(A)} mm², cos φ = 1. Wie groß ist der Spannungsfall?`, given: [['l', l + ' m'], ['I', I + ' A'], ['A', f(A) + ' mm²'], ['κ', '56 m/(Ω·mm²)']], find: 'ΔU in V', formula: 'ΔU = 2 · l · I · cos φ / (κ · A)', steps: [`ΔU = 2 · ${l} m · ${I} A · 1 / (56 · ${f(A)})`], ans: dU, unit: 'V' });
    return T({ q: `Wechselstromleitung, Kupfer, l = ${l} m, I = ${I} A, A = ${f(A)} mm², 230 V, cos φ = 1. Wie viel Prozent Spannungsfall sind das?`, given: [['l', l + ' m'], ['I', I + ' A'], ['A', f(A) + ' mm²'], ['U', '230 V']], find: 'Δu in %', formula: 'ΔU = 2 · l · I / (κ · A) ;  Δu = ΔU / U · 100 %', steps: [`ΔU = 2 · ${l} · ${I} / (56 · ${f(A)}) V = ${f(dU)} V`, `Δu = ${f(dU)} V / 230 V · 100 %`], ans: dU / U * 100, unit: '%', hint: 'Empfehlung im Wohnbau: höchstens 3 %.' });
  });
  add('temperatur', 'Leitungen', 'Widerstand und Temperatur', () => {
    const R20 = pick([10, 20, 50, 100]), t = pick([40, 60, 70, 80, 100]), a = 0.0039, dt = t - 20;
    return T({ q: `Eine Kupferwicklung hat bei 20 °C den Widerstand ${R20} Ω. Wie groß ist er bei ${t} °C? (α = 0,0039 1/K)`, given: [['R20', R20 + ' Ω'], ['Δϑ', `${t} °C − 20 °C = ${dt} K`], ['α', '0,0039 1/K']], find: 'Rw in Ω', formula: 'Rw = R20 · (1 + α · Δϑ)', steps: [`Rw = ${R20} Ω · (1 + 0,0039 1/K · ${dt} K)`, `Rw = ${R20} Ω · ${f(1 + a * dt, 4)}`], ans: R20 * (1 + a * dt), unit: 'Ω' });
  });
  add('frequenz', 'Wechselstrom', 'Frequenz, Periode, Scheitelwert', () => {
    const v = rnd(0, 2);
    if (v === 0) { const fr = pick([50, 60, 100, 400, 1000]); return T({ q: `Eine Wechselspannung hat ${fr} Hz. Wie groß ist die Periodendauer?`, given: [['f', fr + ' Hz']], find: 'T in ms', formula: 'T = 1 / f', steps: [`T = 1 / ${fr} Hz = ${f(1 / fr, 5)} s`, 'in ms: · 1000'], ans: 1000 / fr, unit: 'ms' }); }
    if (v === 1) { const Tm = pick([2, 5, 10, 20, 25]); return T({ q: `Die Periodendauer einer Wechselspannung beträgt ${Tm} ms. Wie groß ist die Frequenz?`, given: [['T', Tm + ' ms = ' + f(Tm / 1000, 3) + ' s']], find: 'f in Hz', formula: 'f = 1 / T', steps: [`f = 1 / ${f(Tm / 1000, 3)} s`], ans: 1000 / Tm, unit: 'Hz' }); }
    const U = pick([12, 24, 230, 400]); return T({ q: `Der Effektivwert einer sinusförmigen Spannung beträgt ${U} V. Wie groß ist der Scheitelwert?`, given: [['U', U + ' V']], find: 'û in V', formula: 'û = U · √2', steps: [`û = ${U} V · 1,414`], ans: U * Math.SQRT2, unit: 'V' });
  });
  add('wechselleistung', 'Wechselstrom', 'Wirk-, Schein-, Blindleistung', () => {
    const U = 230, I = pick([2, 4, 5, 6.5, 8, 10]), c = pick([0.6, 0.7, 0.8, 0.85, 0.9]); const S = U * I, P = S * c, Q = Math.sqrt(S * S - P * P), v = rnd(0, 2);
    const g = [['U', '230 V'], ['I', f(I) + ' A'], ['cos φ', f(c)]];
    if (v === 0) return T({ q: `Ein Motor nimmt an 230 V den Strom ${f(I)} A auf, cos φ = ${f(c)}. Wie groß ist die Wirkleistung?`, given: g, find: 'P in W', formula: 'P = U · I · cos φ', steps: [`P = 230 V · ${f(I)} A · ${f(c)}`], ans: P, unit: 'W' });
    if (v === 1) return T({ q: `Ein Motor nimmt an 230 V den Strom ${f(I)} A auf. Wie groß ist die Scheinleistung?`, given: g.slice(0, 2), find: 'S in VA', formula: 'S = U · I', steps: [`S = 230 V · ${f(I)} A`], ans: S, unit: 'VA' });
    return T({ q: `Ein Motor: S = ${f(S)} VA, P = ${f(P)} W. Wie groß ist die Blindleistung?`, given: [['S', f(S) + ' VA'], ['P', f(P) + ' W']], find: 'Q in var', formula: 'S² = P² + Q²', steps: ['Q = √(S² − P²)', `Q = √(${f(S)}² − ${f(P)}²) var`], ans: Q, unit: 'var' });
  });
  add('drehstrom', 'Wechselstrom', 'Drehstromleistung', () => {
    const U = 400, I = pick([5, 8, 10, 12.5, 16, 20]), c = pick([0.8, 0.82, 0.85, 0.88, 1]); const P = sq3 * U * I * c, v = rnd(0, 1);
    if (v === 0) return T({ q: `Ein Drehstrommotor am 400-V-Netz nimmt ${f(I)} A auf, cos φ = ${f(c)}. Wie groß ist die Wirkleistung?`, given: [['U', '400 V'], ['I', f(I) + ' A'], ['cos φ', f(c)]], find: 'P in W', formula: 'P = √3 · U · I · cos φ', steps: [`P = 1,732 · 400 V · ${f(I)} A · ${f(c)}`], ans: P, unit: 'W' });
    const Pk = pick([3, 5.5, 7.5, 11, 15]); return T({ q: `Ein Drehstromverbraucher hat ${f(Pk)} kW bei 400 V und cos φ = ${f(c)}. Wie groß ist der Leiterstrom?`, given: [['P', f(Pk) + ' kW'], ['U', '400 V'], ['cos φ', f(c)]], find: 'I in A', formula: 'P = √3 · U · I · cos φ', steps: ['I = P / (√3 · U · cos φ)', `I = ${Pk * 1000} W / (1,732 · 400 V · ${f(c)})`], ans: Pk * 1000 / (sq3 * U * c), unit: 'A' });
  });
  add('blind', 'Wechselstrom', 'Blindwiderstand XL und XC', () => {
    if (rnd(0, 1)) { const L = pick([0.05, 0.1, 0.2, 0.5, 1]), fr = pick([50, 100, 1000]); return T({ q: `Eine Spule hat L = ${f(L)} H. Wie groß ist ihr Blindwiderstand bei ${fr} Hz?`, given: [['L', f(L) + ' H'], ['f', fr + ' Hz']], find: 'XL in Ω', formula: 'XL = 2 · π · f · L', steps: [`XL = 2 · 3,1416 · ${fr} Hz · ${f(L)} H`], ans: 2 * PI * fr * L, unit: 'Ω' }); }
    const C = pick([1, 2.2, 4.7, 10, 22]), fr = pick([50, 100, 1000]); return T({ q: `Ein Kondensator hat C = ${f(C)} µF. Wie groß ist sein Blindwiderstand bei ${fr} Hz?`, given: [['C', f(C) + ' µF'], ['f', fr + ' Hz']], find: 'XC in Ω', formula: 'XC = 1 / (2 · π · f · C)', steps: [`XC = 1 / (2 · 3,1416 · ${fr} Hz · ${f(C)} · 10⁻⁶ F)`], ans: 1 / (2 * PI * fr * C * 1e-6), unit: 'Ω', hint: 'µF in F umrechnen: · 10⁻⁶' });
  });
  add('led', 'Bauelemente', 'LED-Vorwiderstand', () => {
    const U = pick([5, 9, 12, 24]), Uf = pick([1.8, 2, 2.1, 3, 3.2]), I = pick([10, 15, 20]); const R = (U - Uf) / (I / 1000), v = rnd(0, 1);
    if (v === 0) return T({ q: `Eine LED (U_F = ${f(Uf)} V, I_F = ${I} mA) soll an ${U} V betrieben werden. Wie groß muss der Vorwiderstand sein?`, given: [['U', U + ' V'], ['U_F', f(Uf) + ' V'], ['I_F', I + ' mA = ' + f(I / 1000) + ' A']], find: 'Rv in Ω', formula: 'Rv = (U − U_F) / I_F', steps: [`Rv = (${U} V − ${f(Uf)} V) / ${f(I / 1000)} A`], ans: R, unit: 'Ω' });
    return T({ q: `Gleiche LED (U_F = ${f(Uf)} V, ${I} mA) an ${U} V: Welche Leistung wird im Vorwiderstand umgesetzt?`, given: [['U', U + ' V'], ['U_F', f(Uf) + ' V'], ['I', f(I / 1000) + ' A']], find: 'P in W', formula: 'P = (U − U_F) · I', steps: [`P = (${U} V − ${f(Uf)} V) · ${f(I / 1000)} A`], ans: (U - Uf) * I / 1000, unit: 'W' });
  });
  add('kondensator', 'Bauelemente', 'Kondensator: τ, Ladung, Schaltungen', () => {
    const v = rnd(0, 3);
    if (v === 0) { const R = pick([1, 4.7, 10, 22, 47]), C = pick([10, 47, 100, 220, 470]); return T({ q: `R = ${f(R)} kΩ, C = ${C} µF. Wie groß ist die Zeitkonstante τ?`, given: [['R', f(R) + ' kΩ'], ['C', C + ' µF']], find: 'τ in s', formula: 'τ = R · C', steps: [`τ = ${f(R * 1000)} Ω · ${C} · 10⁻⁶ F`], ans: R * 1000 * C * 1e-6, unit: 's' }); }
    if (v === 1) { const R = pick([1, 10, 22]), C = pick([100, 220, 470]); const t = R * 1000 * C * 1e-6; return T({ q: `R = ${R} kΩ, C = ${C} µF. Nach welcher Zeit ist der Kondensator praktisch voll geladen?`, given: [['R', R + ' kΩ'], ['C', C + ' µF']], find: 't in s', formula: 'τ = R · C ;  voll nach 5 · τ', steps: [`τ = ${R * 1000} Ω · ${C} · 10⁻⁶ F = ${f(t)} s`, `t = 5 · ${f(t)} s`], ans: 5 * t, unit: 's' }); }
    if (v === 2) { const C = pick([10, 47, 100, 1000]), U = pick([5, 12, 24]); return T({ q: `Ein Kondensator C = ${C} µF wird auf ${U} V geladen. Wie groß ist die gespeicherte Ladung in mAs?`, given: [['C', C + ' µF'], ['U', U + ' V']], find: 'Q in mAs', formula: 'Q = C · U', steps: [`Q = ${C} · 10⁻⁶ F · ${U} V = ${f(C * U * 1e-6, 5)} As`, 'in mAs: · 1000'], ans: C * U / 1000, unit: 'mAs' }); }
    const C1 = pick([10, 22, 47]), C2 = pick([10, 22, 47, 100]); return rnd(0, 1)
      ? T({ q: `C1 = ${C1} µF und C2 = ${C2} µF sind parallel geschaltet. Gesamtkapazität?`, given: [['C1', C1 + ' µF'], ['C2', C2 + ' µF']], find: 'C in µF', formula: 'Parallel: C = C1 + C2', steps: [`C = ${C1} µF + ${C2} µF`], ans: C1 + C2, unit: 'µF', hint: 'Bei Kondensatoren ist es genau umgekehrt wie bei Widerständen!' })
      : T({ q: `C1 = ${C1} µF und C2 = ${C2} µF sind in Reihe geschaltet. Gesamtkapazität?`, given: [['C1', C1 + ' µF'], ['C2', C2 + ' µF']], find: 'C in µF', formula: 'Reihe: C = C1 · C2 / (C1 + C2)', steps: [`C = ${C1} · ${C2} / (${C1} + ${C2}) µF`], ans: C1 * C2 / (C1 + C2), unit: 'µF', hint: 'Bei Kondensatoren ist es genau umgekehrt wie bei Widerständen!' });
  });
  add('transistor', 'Bauelemente', 'Transistor und OPV', () => {
    const v = rnd(0, 2);
    if (v === 0) { const B = pick([100, 150, 200, 250, 300]), Ib = pick([0.05, 0.1, 0.2, 0.5]); return T({ q: `Ein Transistor hat die Stromverstärkung B = ${B}. Der Basisstrom beträgt ${f(Ib)} mA. Wie groß ist der Kollektorstrom?`, given: [['B', B], ['I_B', f(Ib) + ' mA']], find: 'I_C in mA', formula: 'I_C = B · I_B', steps: [`I_C = ${B} · ${f(Ib)} mA`], ans: B * Ib, unit: 'mA' }); }
    const R1 = pick([1, 2, 4.7, 10]), R2 = pick([10, 22, 47, 100]), Ue = pick([0.1, 0.2, 0.5]);
    if (v === 1) return T({ q: `Invertierender OPV: R1 = ${f(R1)} kΩ, R2 = ${R2} kΩ, Ue = ${f(Ue)} V. Wie groß ist Ua?`, given: [['R1', f(R1) + ' kΩ'], ['R2', R2 + ' kΩ'], ['Ue', f(Ue) + ' V']], find: 'Ua in V', formula: 'V = −R2 / R1 ;  Ua = V · Ue', steps: [`V = −${R2} / ${f(R1)} = ${f(-R2 / R1)}`, `Ua = ${f(-R2 / R1)} · ${f(Ue)} V`], ans: -R2 / R1 * Ue, unit: 'V', neg: true, hint: 'Invertierend: Das Ergebnis ist negativ.' });
    return T({ q: `Nichtinvertierender OPV: R1 = ${f(R1)} kΩ, R2 = ${R2} kΩ. Wie groß ist die Verstärkung?`, given: [['R1', f(R1) + ' kΩ'], ['R2', R2 + ' kΩ']], find: 'V', formula: 'V = 1 + R2 / R1', steps: [`V = 1 + ${R2} / ${f(R1)}`], ans: 1 + R2 / R1, unit: '' });
  });
  add('trafo', 'Bauelemente', 'Transformator', () => {
    const N1 = pick([400, 460, 500, 920, 1000, 1150]), U1 = 230, N2 = pick([24, 40, 46, 50, 60, 100]); const U2 = U1 * N2 / N1, v = rnd(0, 2);
    if (v === 0) return T({ q: `Trafo: N1 = ${N1}, N2 = ${N2}, U1 = 230 V. Wie groß ist U2?`, given: [['N1', N1], ['N2', N2], ['U1', '230 V']], find: 'U2 in V', formula: 'U1 / U2 = N1 / N2', steps: ['U2 = U1 · N2 / N1', `U2 = 230 V · ${N2} / ${N1}`], ans: U2, unit: 'V' });
    if (v === 1) { const I2 = pick([1, 2, 2.5, 4, 5]); return T({ q: `Trafo: N1 = ${N1}, N2 = ${N2}. Sekundär fließen ${f(I2)} A. Wie groß ist I1 (ideal)?`, given: [['N1', N1], ['N2', N2], ['I2', f(I2) + ' A']], find: 'I1 in A', formula: 'I1 / I2 = N2 / N1', steps: ['I1 = I2 · N2 / N1', `I1 = ${f(I2)} A · ${N2} / ${N1}`], ans: I2 * N2 / N1, unit: 'A', hint: 'Ströme verhalten sich umgekehrt wie die Windungszahlen.' }); }
    const Ua = pick([6, 8, 12, 24]); return T({ q: `Ein Trafo soll 230 V auf ${Ua} V umsetzen. Wie groß ist das Übersetzungsverhältnis ü?`, given: [['U1', '230 V'], ['U2', Ua + ' V']], find: 'ü', formula: 'ü = U1 / U2', steps: [`ü = 230 V / ${Ua} V`], ans: 230 / Ua, unit: '' });
  });
  add('wirkungsgrad', 'Bauelemente', 'Wirkungsgrad', () => {
    const Pzu = pick([500, 800, 1000, 1500, 2000, 4000]), eta = pick([0.75, 0.8, 0.85, 0.9, 0.92]); const Pab = Pzu * eta;
    return rnd(0, 1) ? T({ q: `Ein Motor nimmt ${Pzu} W auf und gibt ${f(Pab)} W mechanisch ab. Wie groß ist der Wirkungsgrad in %?`, given: [['P_zu', Pzu + ' W'], ['P_ab', f(Pab) + ' W']], find: 'η in %', formula: 'η = P_ab / P_zu', steps: [`η = ${f(Pab)} W / ${Pzu} W = ${f(eta)}`, 'in %: · 100'], ans: eta * 100, unit: '%' })
      : T({ q: `Ein Motor soll ${f(Pab)} W abgeben, Wirkungsgrad ${f(eta * 100)} %. Welche Leistung nimmt er auf?`, given: [['P_ab', f(Pab) + ' W'], ['η', f(eta)]], find: 'P_zu in W', formula: 'η = P_ab / P_zu', steps: ['P_zu = P_ab / η', `P_zu = ${f(Pab)} W / ${f(eta)}`], ans: Pzu, unit: 'W' });
  });
  add('magnet', 'Bauelemente', 'Magnetismus: Kraft und Durchflutung', () => {
    if (rnd(0, 1)) { const I = pick([2, 5, 10]), B = pick([0.5, 1, 1.2, 2]), l = pick([10, 20, 50, 100]); return T({ q: `Ein Leiter (wirksame Länge ${l} mm) führt ${I} A in einem Magnetfeld B = ${f(B)} T. Wie groß ist die Kraft?`, given: [['I', I + ' A'], ['B', f(B) + ' T'], ['l', l + ' mm = ' + f(l / 1000) + ' m']], find: 'F in N', formula: 'F = B · I · l', steps: [`F = ${f(B)} T · ${I} A · ${f(l / 1000)} m`], ans: B * I * l / 1000, unit: 'N', hint: 'mm in m umrechnen!' }); }
    const I = pick([0.5, 1, 2, 2.5]), N = pick([100, 200, 500, 1000]); return T({ q: `Eine Spule hat ${N} Windungen und führt ${f(I)} A. Wie groß ist die Durchflutung Θ?`, given: [['I', f(I) + ' A'], ['N', N]], find: 'Θ in A', formula: 'Θ = I · N', steps: [`Θ = ${f(I)} A · ${N}`], ans: I * N, unit: 'A' });
  });
  add('schutz', 'Schutzmaßnahmen', 'Abschaltbedingung und RCD', () => {
    const v = rnd(0, 1);
    if (v === 0) { const In = pick([10, 13, 16, 20]), ch = pick([['B', 5], ['C', 10]]); const Ia = ch[1] * In; return T({ q: `Ein LS ${ch[0]}${In} muss im TN-System sicher abschalten. Wie groß darf die Schleifenimpedanz Zs höchstens sein? (U0 = 230 V, Ia = ${ch[1]} · In)`, given: [['U0', '230 V'], ['In', In + ' A'], ['Ia', `${ch[1]} · ${In} A = ${Ia} A`]], find: 'Zs in Ω', formula: 'Zs · Ia ≤ U0', steps: ['Zs ≤ U0 / Ia', `Zs ≤ 230 V / ${Ia} A`], ans: 230 / Ia, unit: 'Ω', hint: `Charakteristik B: sichere Auslösung bei 5 · In, C bei 10 · In.` }); }
    const Idn = pick([0.03, 0.1, 0.3, 0.5]); return T({ q: `TT-System mit RCD (IΔn = ${f(Idn * 1000, 0)} mA). Wie groß darf der Erdungswiderstand RA höchstens sein, damit die Berührungsspannung 50 V nicht übersteigt?`, given: [['UL', '50 V'], ['IΔn', f(Idn) + ' A']], find: 'RA in Ω', formula: 'RA · IΔn ≤ 50 V', steps: ['RA ≤ 50 V / IΔn', `RA ≤ 50 V / ${f(Idn)} A`], ans: 50 / Idn, unit: 'Ω' });
  });
  add('praefix', 'IT und Einheiten', 'Einheiten umrechnen', () => {
    const list = [
      () => { const x = pick([0.5, 2.5, 47, 150, 330]); return [`${f(x)} mA = ? A`, x / 1000, 'A', 'milli: durch 1000 teilen']; },
      () => { const x = pick([0.047, 0.25, 1.5, 3.3]); return [`${f(x)} A = ? mA`, x * 1000, 'mA', 'mal 1000']; },
      () => { const x = pick([1.5, 4.7, 22, 470]); return [`${f(x)} kΩ = ? Ω`, x * 1000, 'Ω', 'kilo: mal 1000']; },
      () => { const x = pick([2200, 4700, 680, 100000]); return [`${f(x)} Ω = ? kΩ`, x / 1000, 'kΩ', 'durch 1000']; },
      () => { const x = pick([0.1, 0.47, 2.2, 10]); return [`${f(x)} µF = ? nF`, x * 1000, 'nF', 'µ → n: mal 1000']; },
      () => { const x = pick([1.5, 2.2, 11, 0.4]); return [`${f(x)} kW = ? W`, x * 1000, 'W', 'mal 1000']; },
      () => { const x = pick([10, 20, 110]); return [`${x} kV = ? V`, x * 1000, 'V', 'mal 1000']; },
      () => { const x = pick([5, 25, 120]); return [`${x} mm = ? m`, x / 1000, 'm', 'durch 1000']; },
      () => { const x = pick([1, 2.5, 6]); return [`${f(x)} mm² = ? m²`, x * 1e-6, 'm²', 'mm² → m²: durch 1 000 000']; },
    ];
    const [q, ans, unit, how] = pick(list)();
    return T({ q: `Rechne um: ${q}`, given: [], find: unit, formula: 'Vorsätze: k = 10³, M = 10⁶, m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹', steps: [how], ans, unit, tol: 0.001 });
  });
  add('zahlen', 'IT und Einheiten', 'Dual, Hex, Dezimal', () => {
    const v = rnd(0, 2), n = rnd(5, 250);
    if (v === 0) return T({ q: `Wandle die Dezimalzahl ${n} in eine Dualzahl um.`, given: [], find: 'Dualzahl', formula: 'Fortlaufend durch 2 teilen, Reste von unten nach oben lesen', steps: [(() => { let x = n, st = []; while (x) { st.push(`${x} : 2 = ${Math.floor(x / 2)} Rest ${x % 2}`); x = Math.floor(x / 2); } return st.join('<br>'); })(), 'Reste von unten nach oben lesen'], ans: n.toString(2), text: true, unit: '' });
    if (v === 1) { const b = n.toString(2); return T({ q: `Welchen Dezimalwert hat die Dualzahl ${b}?`, given: [], find: 'Dezimalzahl', formula: 'Stellenwerte 1, 2, 4, 8, 16, 32, 64, 128 …', steps: [b.split('').reverse().map((d, i) => d === '1' ? 2 ** i : 0).filter(Boolean).reverse().join(' + ')], ans: n, unit: '', tol: 0 }); }
    const h = n.toString(16).toUpperCase(); return T({ q: `Welchen Dezimalwert hat die Hexadezimalzahl ${h}?`, given: [], find: 'Dezimalzahl', formula: 'A=10, B=11, C=12, D=13, E=14, F=15; Stellen: 16, 1', steps: [h.length > 1 ? `${parseInt(h[0], 16)} · 16 + ${parseInt(h[1], 16)}` : `${parseInt(h, 16)}`], ans: n, unit: '', tol: 0 });
  });
  add('daten', 'IT und Einheiten', 'Datenrate und Subnetze', () => {
    const v = rnd(0, 1);
    if (v === 0) { const MB = pick([100, 250, 500, 1000, 4000]), r = pick([16, 50, 100, 250]); return T({ q: `Eine Datei mit ${MB} MB wird mit ${r} Mbit/s heruntergeladen. Wie lange dauert das (ideal)?`, given: [['Datei', `${MB} MB = ${MB * 8} Mbit`], ['Datenrate', r + ' Mbit/s']], find: 't in s', formula: 't = Datenmenge / Datenrate (1 Byte = 8 Bit)', steps: [`t = ${MB * 8} Mbit / ${r} Mbit/s`], ans: MB * 8 / r, unit: 's' }); }
    const p = pick([24, 25, 26, 27, 28, 29, 30, 22]); return T({ q: `Wie viele Hosts sind in einem IPv4-Netz mit der Präfixlänge /${p} nutzbar?`, given: [['Hostbits', `32 − ${p} = ${32 - p}`]], find: 'Anzahl Hosts', formula: 'Hosts = 2^Hostbits − 2', steps: [`2^${32 - p} − 2 = ${2 ** (32 - p)} − 2`], ans: 2 ** (32 - p) - 2, unit: '', tol: 0, hint: 'Minus 2: Netzadresse und Broadcastadresse.' });
  });
  LT.calcTopics = G;
  LT.calcState = () => cur;

  /* ---------- Formelsammlung ---------- */
  const FORMELN = [
    ['Grundgrößen', [['U = R · I', 'Ohmsches Gesetz. U Spannung (V), R Widerstand (Ω), I Strom (A)'], ['P = U · I = I² · R = U² / R', 'Leistung (W)'], ['W = P · t', 'Arbeit (Ws, kWh)'], ['Q = I · t', 'Ladung (As = C)'], ['G = 1 / R', 'Leitwert (S)'], ['η = P_ab / P_zu', 'Wirkungsgrad (ohne Einheit, oft in %)']]],
    ['Schaltungen', [['R = R1 + R2 + …', 'Reihe: Strom überall gleich, Spannungen addieren sich'], ['1/R = 1/R1 + 1/R2 + …', 'Parallel: Spannung überall gleich, Ströme addieren sich'], ['R = R1 · R2 / (R1 + R2)', 'zwei Widerstände parallel'], ['U2 = U · R2 / (R1 + R2)', 'unbelasteter Spannungsteiler'], ['Σ I zu = Σ I ab', 'Knotenregel'], ['Σ U = 0', 'Maschenregel']]],
    ['Leitungen', [['R = l / (κ · A) = ρ · l / A', 'Leiterwiderstand. Kupfer κ = 56, Aluminium κ = 35 m/(Ω·mm²)'], ['ΔU = 2 · l · I · cos φ / (κ · A)', 'Spannungsfall Wechselstrom'], ['ΔU = √3 · l · I · cos φ / (κ · A)', 'Spannungsfall Drehstrom'], ['Rw = R20 · (1 + α · Δϑ)', 'Widerstand bei Temperatur. Kupfer α = 0,0039 1/K'], ['Ib ≤ In ≤ Iz', 'Auswahl der Schutzeinrichtung']]],
    ['Wechsel- und Drehstrom', [['f = 1 / T', 'Frequenz (Hz), Periodendauer (s)'], ['û = U · √2', 'Scheitelwert aus Effektivwert'], ['S = U · I', 'Scheinleistung (VA)'], ['P = U · I · cos φ', 'Wirkleistung (W)'], ['S² = P² + Q²', 'Leistungsdreieck, Q Blindleistung (var)'], ['XL = 2π · f · L', 'induktiver Blindwiderstand'], ['XC = 1 / (2π · f · C)', 'kapazitiver Blindwiderstand'], ['U = √3 · U_Str', 'Drehstrom: 400 V = √3 · 230 V'], ['P = √3 · U · I · cos φ', 'Drehstromleistung']]],
    ['Bauelemente', [['τ = R · C', 'Zeitkonstante, voll geladen nach 5 τ'], ['Q = C · U', 'Ladung eines Kondensators'], ['C = C1 + C2', 'Kondensatoren parallel'], ['1/C = 1/C1 + 1/C2', 'Kondensatoren in Reihe'], ['Rv = (U − U_F) / I_F', 'LED-Vorwiderstand'], ['I_C = B · I_B', 'Transistor-Stromverstärkung'], ['V = −R2 / R1', 'invertierender OPV'], ['V = 1 + R2 / R1', 'nichtinvertierender OPV'], ['U1 / U2 = N1 / N2 = I2 / I1 = ü', 'Transformator'], ['F = B · I · l', 'Kraft auf stromdurchflossenen Leiter'], ['Θ = I · N ;  H = Θ / l_m ;  B = Φ / A', 'Magnetische Größen']]],
    ['Schutzmaßnahmen', [['Zs · Ia ≤ U0', 'Abschaltbedingung TN-System (B: Ia = 5 · In, C: 10 · In)'], ['RA · IΔn ≤ 50 V', 'TT-System mit RCD'], ['50 V AC / 120 V DC', 'dauernd zulässige Berührungsspannung'], ['0,4 s (TN) / 0,2 s (TT)', 'Abschaltzeit Endstromkreise ≤ 32 A bei 230 V']]],
    ['IT', [['1 Byte = 8 Bit', 'Datenrate in Bit/s, Dateigröße in Byte'], ['Hosts = 2^(32 − Präfix) − 2', 'nutzbare IPv4-Adressen'], ['t = Datenmenge / Datenrate', 'Übertragungszeit']]],
  ];

  /* ---------- Ansichten ---------- */
  let cur = null, mix = null;
  const st = id => { const S = A.S; S.calc = S.calc || {}; return S.calc[id] || (S.calc[id] = { n: 0, ok: 0, run: 0, star: false }); };
  function viewList() {
    const groups = [...new Set(Object.values(G).map(g => g.group))].sort((a, b) => (b === 'Mathe-Grundlagen') - (a === 'Mathe-Grundlagen'));
    const stars = Object.values(G).filter(g => st(g.id).star).length;
    return `<a href="#ueben" class="back">← Üben</a><h1 class="page-h">Rechentrainer</h1>
      <p class="muted">Immer neue Zahlen, immer mit Lösungsweg. Ein Stern, wenn du 3 Aufgaben eines Themas hintereinander richtig rechnest. ${stars} von ${Object.keys(G).length} Sternen.</p>
      <div class="row"><a class="btn" href="#rechnen-mix">Gemischte Aufgaben</a><a class="btn ghost" href="#mathe">Mathe-Grundlagen</a><a class="btn ghost" href="#formeln">Formelsammlung</a></div>
      ${groups.map(gr => `<section><h2 class="sec-h">${gr}</h2><div class="calcgrid">${Object.values(G).filter(g => g.group === gr).map(g => { const s = st(g.id); return `<a class="calc-t${s.star ? ' star' : ''}" href="#rechnen-${g.id}"><b>${g.title}</b><small>${s.star ? '★ geschafft · ' : ''}${s.ok} von ${s.n} richtig</small></a>`; }).join('')}</div></section>`).join('')}`;
  }
  function newTask(id) { const g = G[id]; cur = { id, t: g.gen(), state: 'ask', tip: 0, input: '' }; }
  function viewTask(arg) {
    const isMix = arg === 'mix';
    if (isMix) { if (!mix) mix = { done: 0, ok: 0, goal: A.S.settings.adhs ? 3 : 10 }; }
    else { if (!G[arg]) return viewList(); if (!cur || cur.id !== arg || cur.mix) newTask(arg); }
    if (isMix && mix.done >= mix.goal && (!cur || !cur.mix)) {
      const res = `<h1 class="page-h">Runde geschafft!</h1><section class="card"><p class="big-num">${mix.ok}<span class="muted"> von ${mix.done} richtig</span></p><div class="row"><button class="btn" data-act="calc-mix-again">Noch eine Runde</button><a class="btn ghost" href="#rechnen">Alle Themen</a></div></section>`;
      return res;
    }
    if (isMix && (!cur || cur.mix !== true)) { newTask(LT.api.shuffle(Object.keys(G))[0]); cur.mix = true; }
    const g = G[cur.id], t = cur.t, s = st(cur.id);
    const given = t.given.length ? `<table class="given"><tbody>${t.given.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</tbody></table>` : '';
    const tip1 = cur.tip >= 1 || cur.state !== 'ask' ? `<p class="formula"><span class="small muted">Formel</span><b>${t.formula}</b></p>` : '';
    let sol = '';
    if (cur.state !== 'ask' || cur.tip >= 2) {
      const ansTxt = t.opts ? t.opts[t.right] : t.text ? t.ans : f(t.ans, 6) + (t.unit ? ' ' + t.unit : '');
      sol = `<div class="solution"><p class="small muted">Lösungsweg</p><ol>${t.given.length ? `<li>Gegeben: ${t.given.map(([k, v]) => `${k} = ${v}`).join(', ')}</li>` : ''}<li>Gesucht: ${t.find}</li><li>Formel: ${t.formula}</li>${t.steps.map(x => `<li>${x}</li>`).join('')}<li><b>Ergebnis: ${ansTxt}</b></li></ol>${t.hint ? `<p class="small">${t.hint}</p>` : ''}</div>`;
    }
    const fb = cur.state === 'right' ? `<div class="fb fb-ok" role="status"><p><b>Richtig!</b> ${s.run >= 3 ? 'Drei in Folge, Stern für dieses Thema!' : `${s.run} in Folge.`}</p></div>` : cur.state === 'wrong' ? `<div class="fb fb-bad" role="status"><p><b>Noch nicht.</b> Deine Antwort: ${t.opts ? (t.opts[+cur.input] || '') : A.esc(cur.input)}. Schau dir den Lösungsweg an.</p></div>` : '';
    const math = g.group === 'Mathe-Grundlagen';
    const learn = g.learn ? `<details class="card learn" ${s.n === 0 ? 'open' : ''}><summary>So geht’s: ${g.title}</summary><div class="learn-body">${g.learn}</div></details>` : '';
    const opts = t.opts ? `<div class="opts">${t.opts.map((o, i) => { let cls = ''; if (cur.state !== 'ask') { if (i === t.right) cls = ' right'; else if (String(i) === cur.input) cls = ' wrong'; } return `<button class="opt${cls}" data-act="calc-opt" data-i="${i}" ${cur.state !== 'ask' ? 'disabled' : ''}><span class="key">${'ABCD'[i]}</span><span class="mono-o">${o}</span></button>`; }).join('')}</div>` : '';
    return `<a href="${math && !isMix ? '#mathe' : '#rechnen'}" class="back">← ${math && !isMix ? 'Mathe-Grundlagen' : 'Rechentrainer'}</a>
      ${learn}<div class="h-row"><p class="eyebrow">${g.group} · ${g.title}${isMix ? ` · Aufgabe ${mix.done + 1} von ${mix.goal}` : ''}</p>${s.star ? '<span class="tag">★</span>' : ''}</div>
      <section class="card qcard"><h2 class="q">${t.q}</h2>${given}
        ${opts}${t.opts ? '' : `<form id="calcform" class="calc-in" autocomplete="off"><label for="calc-a">Ergebnis${t.unit ? ' in ' + t.unit : ''}</label>
          <div class="row"><input id="calc-a" type="text" inputmode="${t.text || t.neg ? 'text' : 'decimal'}" ${cur.state !== 'ask' ? 'disabled' : ''} value="${A.esc(cur.input)}" placeholder="${t.text ? 'z. B. 1011' : 'z. B. 2,5'}"><span class="unit">${t.unit}</span>
          ${cur.state === 'ask' ? '<button class="btn" type="submit">Prüfen</button>' : ''}</div></form>`}
        ${tip1}${fb}${sol}
        <div class="row">${cur.state === 'ask' ? `${cur.tip < 1 ? '<button class="btn ghost sm" data-act="calc-tip">Formel-Tipp</button>' : ''}${cur.tip < 2 ? '<button class="btn ghost sm" data-act="calc-solve">Lösungsweg zeigen</button>' : ''}` : `<button class="btn" data-act="calc-next" id="calc-next">Nächste Aufgabe</button>`}<button class="btn ghost sm" data-act="calc-speak">Vorlesen</button></div>
      </section>`;
  }
  function viewFormeln() {
    return `<a href="#ueben" class="back">← Üben</a><h1 class="page-h">Formelsammlung</h1>
      <p class="muted">Die wichtigsten Formeln für die Ausbildung. Werte und Grenzwerte immer mit deinem Tabellenbuch abgleichen.</p>
      <section class="card triangles"><h2>Formeldreiecke</h2><p class="small">Halte die gesuchte Größe zu: Was übrig bleibt, ist die Formel. Nebeneinander = mal, übereinander = geteilt.</p><div class="tri-row">${tri('U', 'R', 'I')}${tri('P', 'U', 'I')}${tri('W', 'P', 't')}</div></section>
      ${FORMELN.map(([h, list]) => `<section class="card"><h2>${h}</h2><dl class="fl">${list.map(([fm, d]) => `<div><dt>${fm}</dt><dd>${d}</dd></div>`).join('')}</dl></section>`).join('')}
      <a class="btn" href="#rechnen">Jetzt üben</a>`;
  }
  const tri = (a, b, c) => `<svg viewBox="0 0 120 104" class="tri" role="img" aria-label="${a} = ${b} · ${c}"><path d="M60 4L116 100H4Z" class="tri-p"/><path d="M32 54H88M60 54V100" class="tri-p"/><text x="60" y="44" class="tri-t">${a}</text><text x="34" y="88" class="tri-t">${b}</text><text x="86" y="88" class="tri-t">${c}</text></svg>`;

  function check() {
    const inp = document.getElementById('calc-a'); if (!inp) return;
    const raw = inp.value.trim(); if (!raw) { A.toast('Bitte gib ein Ergebnis ein.'); inp.focus(); return; }
    const t = cur.t; let ok;
    if (t.text) ok = raw.replace(/\s/g, '').replace(/^0+(?=\d)/, '') === String(t.ans);
    else { const x = parseFloat(raw.replace(/\s/g, '').replace(/−/g, '-').replace(',', '.').replace(/[^\d.eE+-]/g, ''));
      if (isNaN(x)) { A.toast('Das ist keine Zahl. Schreibe z. B. 2,5'); return; }
      ok = t.tol === 0 ? Math.abs(x - t.ans) < 1e-9 : Math.abs(x - t.ans) <= Math.max(Math.abs(t.ans) * t.tol, t.abs != null ? t.abs : 0.005); }
    judge(ok, raw);
  }
  function judge(ok, raw) {
    const s = st(cur.id); s.n++; cur.input = raw;
    if (ok) { s.ok++; s.run++; if (s.run >= 3 && !s.star) { s.star = true; A.toast('Stern für „' + G[cur.id].title + '“!'); } cur.state = 'right'; }
    else { s.run = 0; cur.state = 'wrong'; }
    if (cur.mix) { mix.done++; if (ok) mix.ok++; }
    A.count(ok); A.render();
    const nb = document.getElementById('calc-next'); if (nb) nb.focus({ preventScroll: true });
  }
  LT.ext.routes.push(['rechnen', a => a ? viewTask(a) : viewList()], ['formeln', () => viewFormeln()]);
  LT.ext.acts['calc-opt'] = el => { if (!cur || cur.state !== 'ask') return; const i = +el.dataset.i; judge(i === cur.t.right, String(i)); };
  LT.calcGroupState = st;
  LT.ext.acts['calc-tip'] = () => { cur.tip = 1; A.render(); };
  LT.ext.acts['calc-solve'] = () => { cur.tip = 2; const s = st(cur.id); s.run = 0; A.render(); };
  LT.ext.acts['calc-next'] = () => { const was = cur; if (was.mix) { cur = null; } else newTask(was.id); A.render(); const i = document.getElementById('calc-a'); if (i) i.focus(); };
  LT.ext.acts['calc-mix-again'] = () => { mix = null; cur = null; A.render(); };
  LT.ext.acts['calc-speak'] = () => { if (cur) A.speak(cur.t.q.replace(/<[^>]+>/g, ' ')); };
  LT.ext.after.push((r) => { const fm = document.getElementById('calcform'); if (fm) fm.onsubmit = e => { e.preventDefault(); check(); }; if (r !== 'rechnen-mix') { mix = null; } });
})();
