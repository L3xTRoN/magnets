/* Mathe-Grundlagen für die Ausbildung: Gleichungen, Formeln umstellen, Potenzen, Zehnerpotenzen,
   Wurzeln, Brüche, Prozent, Dreisatz, Rechenregeln. Jedes Thema mit Erklärung („So geht’s“). */
(function () {
  'use strict';
  const G = LT.calcTopics, A = LT.api;
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const shuffle = A.shuffle;
  const f = (x, d = 6) => Number(x.toFixed(d)).toLocaleString('de-DE', { maximumFractionDigits: d });
  const T = o => Object.assign({ tol: 0.01, given: [], unit: '' }, o);
  const GR = 'Mathe-Grundlagen';
  const add = (id, title, learn, gen) => { G[id] = { id, group: GR, title, learn, gen }; };
  const sup = n => String(n).replace(/-/g, '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  const p10 = n => '10' + sup(n);
  const mc = (q, right, wrong, formula, steps, hint) => { const opts = shuffle([right, ...wrong]); return T({ q, opts, right: opts.indexOf(right), find: 'die richtige Umstellung', formula, steps, hint, ans: 0 }); };

  /* ---------- Gleichungen ---------- */
  add('m-plusminus', 'Gleichungen: Plus und Minus', `
    <p>Eine Gleichung ist wie eine <b>Waage</b>: Was du auf einer Seite machst, musst du auch auf der anderen Seite machen.</p>
    <p>Ziel: <b>x allein</b> auf einer Seite. Dafür machst du das Gegenteil von dem, was mit x passiert:</p>
    <ul><li>Steht <b>+ 7</b> bei x → auf beiden Seiten <b>− 7</b>.</li><li>Steht <b>− 7</b> bei x → auf beiden Seiten <b>+ 7</b>.</li></ul>
    <p class="ex">x + 7 = 15 &nbsp;|&nbsp; − 7<br>x = 15 − 7<br><b>x = 8</b></p>`,
    () => { const x = rnd(2, 60), a = rnd(2, 40); return rnd(0, 1)
      ? T({ q: `Löse nach x auf: x + ${a} = ${x + a}`, find: 'x', formula: 'Gegenteil von + ist −', steps: [`x + ${a} = ${x + a} &nbsp;| − ${a}`, `x = ${x + a} − ${a}`], ans: x, tol: 0 })
      : T({ q: `Löse nach x auf: x − ${a} = ${x - a}`, find: 'x', formula: 'Gegenteil von − ist +', steps: [`x − ${a} = ${x - a} &nbsp;| + ${a}`, `x = ${x - a} + ${a}`], ans: x, tol: 0, neg: true }); });

  add('m-maldurch', 'Gleichungen: Mal und Geteilt', `
    <p>Auch bei Mal und Geteilt machst du das <b>Gegenteil</b> auf beiden Seiten:</p>
    <ul><li>Steht <b>· 4</b> bei x → beide Seiten <b>: 4</b> (teilen).</li><li>Steht <b>: 5</b> (geteilt durch 5) bei x → beide Seiten <b>· 5</b>.</li></ul>
    <p class="ex">4 · x = 18 &nbsp;|&nbsp; : 4<br>x = 18 : 4<br><b>x = 4,5</b></p>
    <p class="ex">x : 5 = 3 &nbsp;|&nbsp; · 5<br>x = 3 · 5<br><b>x = 15</b></p>`,
    () => { const a = pick([2, 3, 4, 5, 8, 10, 12, 20, 25]), x = pick([1.5, 2, 2.5, 3, 4, 6, 7.5, 9, 12]); return rnd(0, 1)
      ? T({ q: `Löse nach x auf: ${a} · x = ${f(a * x)}`, find: 'x', formula: 'Gegenteil von · ist :', steps: [`${a} · x = ${f(a * x)} &nbsp;| : ${a}`, `x = ${f(a * x)} : ${a}`], ans: x })
      : T({ q: `Löse nach x auf: x : ${a} = ${f(x)}`, find: 'x', formula: 'Gegenteil von : ist ·', steps: [`x : ${a} = ${f(x)} &nbsp;| · ${a}`, `x = ${f(x)} · ${a}`], ans: x * a }); });

  add('m-zwei', 'Gleichungen in zwei Schritten', `
    <p>Bei <b>3 · x + 4 = 19</b> passieren zwei Dinge mit x. Löse sie in <b>umgekehrter Reihenfolge</b> auf:</p>
    <ol><li>Zuerst das <b>Plus/Minus</b> wegschaffen.</li><li>Dann das <b>Mal/Geteilt</b>.</li></ol>
    <p class="ex">3 · x + 4 = 19 &nbsp;| − 4<br>3 · x = 15 &nbsp;| : 3<br><b>x = 5</b></p>
    <p>Probe: 3 · 5 + 4 = 19 ✓ Die Probe zeigt dir immer, ob du richtig liegst.</p>`,
    () => { const a = rnd(2, 9), x = rnd(2, 15), b = rnd(1, 30); return T({ q: `Löse nach x auf: ${a} · x + ${b} = ${a * x + b}`, find: 'x', formula: 'Erst Plus/Minus, dann Mal/Geteilt', steps: [`${a} · x + ${b} = ${a * x + b} &nbsp;| − ${b}`, `${a} · x = ${a * x} &nbsp;| : ${a}`, `x = ${x}`, `Probe: ${a} · ${x} + ${b} = ${a * x + b} ✓`], ans: x, tol: 0 }); });

  /* ---------- Formeln umstellen (Auswahl) ---------- */
  const POOL = ['U', 'R', 'I', 'P', 't', 'l', 'A', 'N', 'C', 'B', 'f', 'Q'];
  const prod = a => a.join(' · ');
  const frac = (num, den) => { const n = num.length ? (num.length > 1 && den.length ? prod(num) : prod(num)) : '1'; if (!den.length) return n; return `${num.length > 1 ? n : n} / ${den.length > 1 ? '(' + prod(den) + ')' : den[0]}`; };
  add('m-umstellen', 'Formeln umstellen (Mal und Geteilt)', `
    <p>Formeln stellst du genauso um wie Gleichungen, nur mit Buchstaben. Merke dir:</p>
    <ul><li>Was auf einer Seite <b>multipliziert</b>, steht auf der anderen Seite <b>im Nenner</b> (geteilt).</li><li>Was <b>im Nenner</b> steht, kommt auf der anderen Seite <b>in den Zähler</b> (mal).</li></ul>
    <p class="ex">U = R · I &nbsp;→ gesucht I<br>U = R · I &nbsp;| : R<br><b>I = U / R</b></p>
    <p class="ex">R = l / (κ · A) &nbsp;→ gesucht A<br>R · A = l / κ &nbsp;(mal A)<br><b>A = l / (κ · R)</b> &nbsp;(geteilt durch R)</p>
    <p><b>Trick Formeldreieck:</b> Bei U = R · I steht U oben, R und I unten. Halte die gesuchte Größe zu, der Rest ist die Formel.</p>`,
    () => {
      const v = shuffle(POOL).slice(0, 4), L = v[0];
      const kind = rnd(0, 3);
      const num = kind === 0 ? [v[1], v[2]] : kind === 1 ? [v[1]] : kind === 2 ? [v[1], v[2]] : [v[1]];
      const den = kind === 0 ? [] : kind === 1 ? [v[2]] : kind === 2 ? [v[3]] : [v[2], v[3]];
      const formula = `${L} = ${frac(num, den)}`;
      const X = pick([...num, ...den]);
      let right, wrong, steps;
      if (num.includes(X)) {
        const rest = num.filter(x => x !== X);
        right = `${X} = ${frac([L, ...den], rest)}`;
        wrong = [`${X} = ${frac(rest, [L, ...den])}`, `${X} = ${frac([L, ...rest], den)}`, (den.length ? `${X} = ${frac(den, rest.length ? [L, ...rest] : [L])}` : `${X} = ${L} − ${prod(rest)}`)];
        steps = [`${X} steht im Zähler.`, den.length ? `Beide Seiten mal ${den.length > 1 ? '(' + prod(den) + ')' : den[0]}` : '', rest.length ? `Beide Seiten geteilt durch ${prod(rest)}` : '', `${right}`].filter(Boolean);
      } else {
        const restD = den.filter(x => x !== X);
        right = `${X} = ${frac(num, [L, ...restD])}`;
        wrong = [`${X} = ${frac([L, ...restD], num)}`, `${X} = ${frac([L, ...num], restD)}`, `${X} = ${L} − ${prod(num)}`];
        steps = [`${X} steht im Nenner. Zuerst beide Seiten mal ${X}: ${L} · ${X} = ${prod(num)}${restD.length ? ' / ' + prod(restD) : ''}`, `Dann beide Seiten geteilt durch ${L}`, `${right}`];
      }
      wrong = [...new Set(wrong.filter(w => w !== right))];
      while (wrong.length < 3) wrong.push(`${X} = ${L} − ${prod(num)}`, `${X} = ${prod([L, ...num, ...den].filter(x => x !== X))}`);
      return mc(`Stelle die Formel <b class="mono">${formula}</b> nach <b>${X}</b> um.`, right, [...new Set(wrong)].filter(w => w !== right).slice(0, 3), 'Mal wird zu geteilt, geteilt wird zu mal', steps);
    });

  add('m-umstellen-plus', 'Formeln umstellen (Plus, Minus, Klammern)', `
    <p>Bei <b>Plus und Minus</b> wandert eine Größe mit dem <b>umgekehrten Rechenzeichen</b> auf die andere Seite:</p>
    <p class="ex">U = U1 + U2 &nbsp;→ gesucht U2<br>U = U1 + U2 &nbsp;| − U1<br><b>U2 = U − U1</b></p>
    <p>Bei <b>Klammern</b> bleibt die Klammer zusammen, bis du sie auflöst:</p>
    <p class="ex">Rv = (U − UF) / I &nbsp;→ gesucht I<br>Rv · I = U − UF &nbsp;(mal I)<br><b>I = (U − UF) / Rv</b> &nbsp;(geteilt durch Rv)</p>
    <p class="ex">Rw = R20 · (1 + α · Δϑ) &nbsp;→ gesucht R20<br><b>R20 = Rw / (1 + α · Δϑ)</b></p>`,
    () => pick([
      () => mc('Stelle <b class="mono">U = U1 + U2</b> nach <b>U2</b> um.', 'U2 = U − U1', ['U2 = U + U1', 'U2 = U1 − U', 'U2 = U / U1'], '+ wird zu −', ['U = U1 + U2 &nbsp;| − U1', 'U2 = U − U1']),
      () => mc('Stelle <b class="mono">I = I1 + I2 + I3</b> nach <b>I2</b> um.', 'I2 = I − I1 − I3', ['I2 = I + I1 + I3', 'I2 = I1 + I3 − I', 'I2 = I − I1 + I3'], '+ wird zu −', ['I = I1 + I2 + I3 &nbsp;| − I1 − I3', 'I2 = I − I1 − I3']),
      () => mc('Stelle <b class="mono">Rv = (U − UF) / I</b> nach <b>I</b> um.', 'I = (U − UF) / Rv', ['I = Rv / (U − UF)', 'I = (U − UF) · Rv', 'I = U − UF / Rv'], 'Klammer bleibt zusammen', ['Rv · I = U − UF &nbsp;(mal I)', 'I = (U − UF) / Rv &nbsp;(geteilt durch Rv)'], 'Ohne Klammer würde nur UF geteilt. Das wäre falsch.'),
      () => mc('Stelle <b class="mono">Rv = (U − UF) / I</b> nach <b>U</b> um.', 'U = Rv · I + UF', ['U = Rv · I − UF', 'U = (Rv + UF) · I', 'U = Rv / I + UF'], 'Erst mal I, dann + UF', ['Rv · I = U − UF &nbsp;(mal I)', 'Rv · I + UF = U &nbsp;(+ UF)']),
      () => mc('Stelle <b class="mono">Rw = R20 · (1 + α · Δϑ)</b> nach <b>R20</b> um.', 'R20 = Rw / (1 + α · Δϑ)', ['R20 = Rw · (1 + α · Δϑ)', 'R20 = Rw − 1 − α · Δϑ', 'R20 = (1 + α · Δϑ) / Rw'], 'Die Klammer ist ein Faktor', ['Rw = R20 · (Klammer) &nbsp;| : (Klammer)', 'R20 = Rw / (1 + α · Δϑ)']),
      () => mc('Stelle <b class="mono">R = R1 + R2</b> nach <b>R1</b> um.', 'R1 = R − R2', ['R1 = R + R2', 'R1 = R2 − R', 'R1 = R / R2'], '+ wird zu −', ['R = R1 + R2 &nbsp;| − R2', 'R1 = R − R2']),
      () => mc('Stelle <b class="mono">U2 = U · R2 / (R1 + R2)</b> nach <b>U</b> um.', 'U = U2 · (R1 + R2) / R2', ['U = U2 · R2 / (R1 + R2)', 'U = U2 / R2 · R1 + R2', 'U = (R1 + R2) / (U2 · R2)'], 'Nenner wird Zähler, Zähler wird Nenner', ['U2 · (R1 + R2) = U · R2 &nbsp;(mal Klammer)', 'U = U2 · (R1 + R2) / R2 &nbsp;(geteilt durch R2)']),
      () => mc('Stelle <b class="mono">W = P · t</b> nach <b>t</b> um.', 't = W / P', ['t = P / W', 't = W · P', 't = W − P'], 'Mal wird zu geteilt', ['W = P · t &nbsp;| : P', 't = W / P']),
    ])());

  add('m-umstellen-quadrat', 'Formeln mit Quadrat und Wurzel', `
    <p>Das Gegenteil vom <b>Quadrat</b> (²) ist die <b>Wurzel</b> (√) und umgekehrt.</p>
    <p class="ex">P = U² / R &nbsp;→ gesucht U<br>P · R = U² &nbsp;(mal R)<br><b>U = √(P · R)</b> &nbsp;(Wurzel ziehen)</p>
    <p class="ex">P = I² · R &nbsp;→ gesucht I<br>P / R = I²<br><b>I = √(P / R)</b></p>
    <p>Wichtig: Erst alles andere wegschaffen, <b>zuletzt</b> die Wurzel ziehen.</p>`,
    () => pick([
      () => mc('Stelle <b class="mono">P = U² / R</b> nach <b>U</b> um.', 'U = √(P · R)', ['U = P · R', 'U = √(P / R)', 'U = (P · R)²'], 'Quadrat ↔ Wurzel', ['P · R = U² &nbsp;(mal R)', 'U = √(P · R) &nbsp;(Wurzel)']),
      () => mc('Stelle <b class="mono">P = U² / R</b> nach <b>R</b> um.', 'R = U² / P', ['R = P / U²', 'R = P · U²', 'R = √(U / P)'], 'Nenner wechselt die Seite', ['P · R = U² &nbsp;(mal R)', 'R = U² / P &nbsp;(geteilt durch P)']),
      () => mc('Stelle <b class="mono">P = I² · R</b> nach <b>I</b> um.', 'I = √(P / R)', ['I = P / R²', 'I = √(P · R)', 'I = (P / R)²'], 'Quadrat ↔ Wurzel', ['P / R = I² &nbsp;(geteilt durch R)', 'I = √(P / R)']),
      () => mc('Stelle <b class="mono">A = π · d² / 4</b> nach <b>d</b> um.', 'd = √(4 · A / π)', ['d = 4 · A / π', 'd = √(A / (4 · π))', 'd = (4 · A / π)²'], 'Quadrat ↔ Wurzel', ['4 · A = π · d² &nbsp;(mal 4)', '4 · A / π = d² &nbsp;(geteilt durch π)', 'd = √(4 · A / π)']),
      () => mc('Stelle <b class="mono">S² = P² + Q²</b> nach <b>Q</b> um.', 'Q = √(S² − P²)', ['Q = S − P', 'Q = √(S² + P²)', 'Q = S² − P²'], 'Erst − P², dann Wurzel', ['S² − P² = Q²', 'Q = √(S² − P²)'], 'Achtung: √(S² − P²) ist NICHT S − P!'),
      () => mc('Stelle <b class="mono">û = U · √2</b> nach <b>U</b> um.', 'U = û / √2', ['U = û · √2', 'U = √(û · 2)', 'U = û²/2'], 'Mal wird zu geteilt', ['û = U · √2 &nbsp;| : √2', 'U = û / √2']),
    ])());

  add('m-einsetzen', 'Umstellen und einsetzen', `
    <p>So gehst du bei jeder Rechenaufgabe vor:</p>
    <ol><li><b>Gegeben</b> und <b>Gesucht</b> aufschreiben.</li><li>Passende <b>Formel</b> aufschreiben.</li><li>Nach der gesuchten Größe <b>umstellen</b>.</li><li>Werte <b>mit Einheit</b> einsetzen.</li><li>Ausrechnen, Ergebnis mit Einheit unterstreichen.</li></ol>
    <p class="ex">Gegeben: P = 2000 W, U = 230 V. Gesucht: I<br>P = U · I &nbsp;→&nbsp; I = P / U<br>I = 2000 W / 230 V = <b>8,7 A</b></p>`,
    () => { const a = pick([2, 4, 5, 8, 10]), b = pick([3, 6, 12, 15, 20]), c = pick([2, 4, 5, 10]); const y = a * b / c;
      const which = rnd(0, 2);
      if (which === 0) return T({ q: `Formel: y = a · b / c. Gegeben: y = ${f(y)}, b = ${b}, c = ${c}. Berechne a.`, given: [['y', f(y)], ['b', b], ['c', c]], find: 'a', formula: 'a = y · c / b', steps: [`a = ${f(y)} · ${c} / ${b}`], ans: a });
      if (which === 1) return T({ q: `Formel: y = a · b / c. Gegeben: y = ${f(y)}, a = ${a}, b = ${b}. Berechne c.`, given: [['y', f(y)], ['a', a], ['b', b]], find: 'c', formula: 'c = a · b / y', steps: [`c = ${a} · ${b} / ${f(y)}`], ans: c });
      return T({ q: `Formel: y = a · b / c. Gegeben: y = ${f(y)}, a = ${a}, c = ${c}. Berechne b.`, given: [['y', f(y)], ['a', a], ['c', c]], find: 'b', formula: 'b = y · c / a', steps: [`b = ${f(y)} · ${c} / ${a}`], ans: b }); });

  /* ---------- Potenzen ---------- */
  add('m-potenzen', 'Potenzen berechnen', `
    <p>Eine <b>Potenz</b> ist eine Abkürzung für Malnehmen mit sich selbst:</p>
    <p class="ex">2³ = 2 · 2 · 2 = <b>8</b> &nbsp;&nbsp; (2 = Basis, 3 = Hochzahl/Exponent)</p>
    <ul><li><b>a¹ = a</b> und <b>a⁰ = 1</b> (immer!)</li><li><b>10ⁿ</b> = eine 1 mit n Nullen: 10⁴ = 10 000</li><li><b>Negative Hochzahl</b> = Kehrwert: 10⁻² = 1/10² = 0,01 · 2⁻¹ = 1/2 = 0,5</li></ul>`,
    () => pick([
      () => { const b = rnd(2, 5), e = rnd(2, 4); return T({ q: `Berechne ${b}${sup(e)}`, find: 'Ergebnis', formula: `${b}${sup(e)} = ${Array(e).fill(b).join(' · ')}`, steps: [`${Array(e).fill(b).join(' · ')} = ${b ** e}`], ans: b ** e, tol: 0 }); },
      () => { const e = rnd(1, 6); return T({ q: `Berechne ${p10(e)}`, find: 'Ergebnis', formula: '10ⁿ = 1 mit n Nullen', steps: [`${p10(e)} = 1${'0'.repeat(e)}`], ans: 10 ** e, tol: 0 }); },
      () => { const e = rnd(1, 4); return T({ q: `Berechne ${p10(-e)} als Dezimalzahl`, find: 'Ergebnis', formula: '10⁻ⁿ = 1 / 10ⁿ', steps: [`${p10(-e)} = 1 / ${10 ** e} = ${f(10 ** -e)}`], ans: 10 ** -e, tol: 1e-9, abs: 1e-12 }); },
      () => { const b = rnd(2, 99); return T({ q: `Berechne ${b}⁰`, find: 'Ergebnis', formula: 'a⁰ = 1', steps: ['Jede Zahl (außer 0) hoch 0 ist 1'], ans: 1, tol: 0 }); },
      () => { const b = pick([2, 4, 5]); return T({ q: `Berechne ${b}⁻¹ als Dezimalzahl`, find: 'Ergebnis', formula: 'a⁻¹ = 1 / a', steps: [`${b}⁻¹ = 1 / ${b} = ${f(1 / b)}`], ans: 1 / b, abs: 1e-9 }); },
    ])());

  add('m-potenzgesetze', 'Potenzgesetze', `
    <p>Bei <b>gleicher Basis</b> rechnest du nur mit den Hochzahlen:</p>
    <ul><li><b>Malnehmen:</b> Hochzahlen <b>addieren</b>: 10³ · 10⁴ = 10⁷</li><li><b>Teilen:</b> Hochzahlen <b>subtrahieren</b>: 10⁶ / 10² = 10⁴</li><li><b>Potenz einer Potenz:</b> Hochzahlen <b>malnehmen</b>: (10²)³ = 10⁶</li></ul>
    <p class="ex">10³ · 10⁻⁶ = 10³⁺⁽⁻⁶⁾ = <b>10⁻³</b><br>10² / 10⁻³ = 10²⁻⁽⁻³⁾ = <b>10⁵</b> &nbsp;(Minus mal Minus = Plus!)</p>
    <p>Gib als Antwort nur die <b>Hochzahl</b> ein, z. B. −3.</p>`,
    () => { const a = rnd(-6, 6), b = rnd(-6, 6), k = rnd(0, 2);
      if (k === 0) return T({ q: `${p10(a)} · ${p10(b)} = 10^? &nbsp; Gib die Hochzahl an.`, find: 'Hochzahl', formula: 'Malnehmen: Hochzahlen addieren', steps: [`${a} + (${b}) = ${a + b}`, `Ergebnis: ${p10(a + b)}`], ans: a + b, tol: 0, neg: true });
      if (k === 1) return T({ q: `${p10(a)} / ${p10(b)} = 10^? &nbsp; Gib die Hochzahl an.`, find: 'Hochzahl', formula: 'Teilen: Hochzahlen subtrahieren', steps: [`${a} − (${b}) = ${a - b}`, `Ergebnis: ${p10(a - b)}`], ans: a - b, tol: 0, neg: true });
      const c = rnd(2, 3), e = rnd(-3, 3) || 2; return T({ q: `(${p10(e)})${sup(c)} = 10^? &nbsp; Gib die Hochzahl an.`, find: 'Hochzahl', formula: 'Potenz einer Potenz: Hochzahlen malnehmen', steps: [`${e} · ${c} = ${e * c}`], ans: e * c, tol: 0, neg: true }); });

  add('m-zehner', 'Zehnerpotenzen und Vorsätze', `
    <p>Sehr große und sehr kleine Zahlen schreibt man mit <b>Zehnerpotenzen</b>: eine Zahl zwischen 1 und 10, mal 10 hoch etwas.</p>
    <ul><li>Komma nach <b>links</b> schieben → Hochzahl wird <b>größer</b>: 4700 = 4,7 · 10³</li><li>Komma nach <b>rechts</b> schieben → Hochzahl wird <b>kleiner</b>: 0,0022 = 2,2 · 10⁻³</li></ul>
    <p><b>Vorsätze</b> sind Zehnerpotenzen: G = 10⁹, M = 10⁶, k = 10³, m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹, p = 10⁻¹²</p>
    <p class="ex">4,7 kΩ = 4,7 · 10³ Ω = 4700 Ω<br>100 nF = 100 · 10⁻⁹ F = 10⁻⁷ F</p>`,
    () => pick([
      () => { const m = pick([1.5, 2.2, 3.3, 4.7, 6.8]), e = rnd(2, 6); return T({ q: `${f(m * 10 ** e)} = ${f(m)} · 10^? &nbsp; Gib die Hochzahl an.`, find: 'Hochzahl', formula: 'Komma nach links → Hochzahl größer', steps: [`Das Komma wandert ${e} Stellen nach links`, `${f(m)} · ${p10(e)}`], ans: e, tol: 0, neg: true }); },
      () => { const m = pick([1.5, 2.2, 3.3, 4.7, 6.8]), e = rnd(1, 6); return T({ q: `${f(m * 10 ** -e, 8)} = ${f(m)} · 10^? &nbsp; Gib die Hochzahl an.`, find: 'Hochzahl', formula: 'Komma nach rechts → Hochzahl kleiner (negativ)', steps: [`Das Komma wandert ${e} Stellen nach rechts`, `${f(m)} · ${p10(-e)}`], ans: -e, tol: 0, neg: true }); },
      () => { const v = pick([['k', 3], ['M', 6], ['m', -3], ['µ', -6], ['n', -9], ['p', -12], ['G', 9]]); return T({ q: `Welche Hochzahl gehört zum Vorsatz ${v[0]}? (1 ${v[0]} = 10^?)`, find: 'Hochzahl', formula: 'G 9, M 6, k 3, m −3, µ −6, n −9, p −12', steps: [`${v[0]} = ${p10(v[1])}`], ans: v[1], tol: 0, neg: true }); },
      () => { const m = pick([2.2, 4.7, 10, 22, 47]), v = pick([['k', 3], ['m', -3], ['µ', -6]]), u = pick(['Ω', 'A', 'F', 'V']); return T({ q: `${f(m)} ${v[0]}${u} = ? ${u} &nbsp; (als Dezimalzahl)`, find: u, formula: `${v[0]} = ${p10(v[1])}`, steps: [`${f(m)} · ${p10(v[1])} = ${f(m * 10 ** v[1], 9)}`], ans: m * 10 ** v[1], tol: 1e-6, abs: 1e-12 }); },
    ])());

  add('m-zehner-rechnen', 'Rechnen mit Zehnerpotenzen', `
    <p>Beim Malnehmen und Teilen trennst du <b>Zahlen</b> und <b>Zehnerpotenzen</b>:</p>
    <p class="ex">2 · 10³ · 4 · 10⁻⁶<br>= (2 · 4) · 10³⁻⁶<br>= 8 · 10⁻³ = <b>0,008</b></p>
    <p class="ex">6 · 10⁻³ / (2 · 10³)<br>= (6 / 2) · 10⁻³⁻³<br>= 3 · 10⁻⁶ = <b>0,000003</b></p>
    <p>Genau so rechnest du z. B. τ = R · C mit kΩ und µF.</p>`,
    () => { const a = pick([1.5, 2, 3, 4, 5]), b = pick([2, 3, 4, 10]), e1 = rnd(-6, 6), e2 = rnd(-6, 3);
      if (rnd(0, 1)) { const ans = a * b * 10 ** (e1 + e2); return T({ q: `Berechne ${f(a)} · ${p10(e1)} · ${b} · ${p10(e2)} und gib das Ergebnis als Dezimalzahl an.`, find: 'Ergebnis', formula: 'Zahlen malnehmen, Hochzahlen addieren', steps: [`(${f(a)} · ${b}) · 10^(${e1} + ${e2})`, `${f(a * b)} · ${p10(e1 + e2)}`, `= ${f(ans, 12)}`], ans, tol: 1e-6, abs: 1e-15 }); }
      const ans = a * b / b * 10 ** (e1 - e2); return T({ q: `Berechne ${f(a * b)} · ${p10(e1)} / (${b} · ${p10(e2)}) als Dezimalzahl.`, find: 'Ergebnis', formula: 'Zahlen teilen, Hochzahlen subtrahieren', steps: [`(${f(a * b)} / ${b}) · 10^(${e1} − (${e2}))`, `${f(a)} · ${p10(e1 - e2)}`, `= ${f(ans, 12)}`], ans, tol: 1e-6, abs: 1e-15 }); });

  /* ---------- Wurzeln, Brüche, Prozent, Dreisatz, Rechenregeln ---------- */
  add('m-wurzel', 'Quadrat und Wurzel', `
    <p><b>Quadrieren</b> heißt mit sich selbst malnehmen: 7² = 49. Die <b>Wurzel</b> fragt rückwärts: Welche Zahl mal sich selbst ergibt 49? √49 = 7.</p>
    <ul><li>Quadratzahlen auswendig: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144</li><li>√2 ≈ 1,414 und √3 ≈ 1,732 brauchst du ständig (Scheitelwert, Drehstrom).</li></ul>
    <p class="ex">Kreisfläche (Leiterquerschnitt): A = π · d² / 4<br>d = 1,38 mm → A = 3,14 · 1,38² / 4 ≈ <b>1,5 mm²</b></p>`,
    () => pick([
      () => { const x = rnd(2, 15); return T({ q: `Berechne √${x * x}`, find: 'Ergebnis', formula: '√ fragt: welche Zahl mal sich selbst?', steps: [`${x} · ${x} = ${x * x}`], ans: x, tol: 0 }); },
      () => { const x = pick([1.2, 1.5, 2.5, 3, 4, 12, 20]); return T({ q: `Berechne ${f(x)}²`, find: 'Ergebnis', formula: 'a² = a · a', steps: [`${f(x)} · ${f(x)} = ${f(x * x)}`], ans: x * x }); },
      () => { const d = pick([1.13, 1.38, 1.78, 2.26, 2.76]); const Aq = Math.PI * d * d / 4; return T({ q: `Ein Draht hat ${f(d)} mm Durchmesser. Wie groß ist sein Querschnitt?`, given: [['d', f(d) + ' mm']], find: 'A in mm²', formula: 'A = π · d² / 4', steps: [`A = 3,1416 · (${f(d)} mm)² / 4`, `A = 3,1416 · ${f(d * d, 4)} mm² / 4`], ans: Aq, unit: 'mm²', tol: 0.02 }); },
      () => { const P = pick([100, 400, 900]), R = pick([1, 4, 9, 16, 25]); return T({ q: `Berechne U = √(P · R) mit P = ${P} W und R = ${R} Ω.`, given: [['P', P + ' W'], ['R', R + ' Ω']], find: 'U in V', formula: 'U = √(P · R)', steps: [`U = √(${P} · ${R}) = √${P * R}`], ans: Math.sqrt(P * R), unit: 'V' }); },
    ])());

  add('m-brueche', 'Brüche und Kehrwerte', `
    <p>Ein Bruch ist eine Division: 3/4 = 3 : 4 = 0,75. Der <b>Kehrwert</b> dreht den Bruch um: Kehrwert von 4 ist 1/4 = 0,25.</p>
    <ul><li><b>Gleichnamige</b> Brüche addieren: Zähler addieren, Nenner bleibt. 1/5 + 2/5 = 3/5</li><li>Sonst <b>auf gleichen Nenner bringen</b>: 1/20 + 1/30 = 3/60 + 2/60 = 5/60 = 1/12</li></ul>
    <p class="ex">Parallelschaltung: 1/R = 1/20 Ω + 1/30 Ω = 1/12 Ω<br>→ Kehrwert: <b>R = 12 Ω</b></p>
    <p>Mit dem Taschenrechner: 1/R ausrechnen, dann die Taste <b>x⁻¹</b> (Kehrwert).</p>`,
    () => pick([
      () => { const n = pick([2, 4, 5, 8, 10, 20, 25]); return T({ q: `Wie groß ist der Kehrwert von ${n} als Dezimalzahl?`, find: 'Kehrwert', formula: 'Kehrwert von a = 1 / a', steps: [`1 / ${n} = ${f(1 / n)}`], ans: 1 / n, abs: 1e-9 }); },
      () => { const [a, b] = pick([[20, 30], [10, 40], [6, 12], [12, 24], [30, 60], [15, 30]]); return T({ q: `1/R = 1/${a} + 1/${b}. Wie groß ist R?`, find: 'R', formula: '1/R ausrechnen, dann Kehrwert', steps: [`1/${a} + 1/${b} = ${f(1 / a + 1 / b, 5)}`, `R = 1 / ${f(1 / a + 1 / b, 5)}`], ans: 1 / (1 / a + 1 / b) }); },
      () => { const z = rnd(1, 7), n = pick([2, 4, 5, 8, 10]); return T({ q: `Schreibe ${z}/${n} als Dezimalzahl.`, find: 'Dezimalzahl', formula: 'Bruch = Zähler : Nenner', steps: [`${z} : ${n} = ${f(z / n)}`], ans: z / n, abs: 1e-9 }); },
      () => { const n = pick([5, 6, 8, 10, 12]), a = rnd(1, n - 2), b = rnd(1, n - a - 1); return T({ q: `Berechne ${a}/${n} + ${b}/${n} als Dezimalzahl.`, find: 'Ergebnis', formula: 'Gleicher Nenner: Zähler addieren', steps: [`${a}/${n} + ${b}/${n} = ${a + b}/${n}`, `${a + b} : ${n} = ${f((a + b) / n)}`], ans: (a + b) / n, abs: 1e-6 }); },
    ])());

  add('m-prozent', 'Prozentrechnung', `
    <p>Prozent heißt <b>von Hundert</b>: 3 % = 3/100 = 0,03.</p>
    <ul><li><b>Prozentwert</b> W = Grundwert G · p / 100 &nbsp; (3 % von 230 V = 6,9 V)</li><li><b>Prozentsatz</b> p = W / G · 100 % &nbsp; (6,9 V von 230 V = 3 %)</li><li><b>Grundwert</b> G = W · 100 / p</li></ul>
    <p class="ex">Netto 500 € + 19 % MwSt.<br>= 500 € · 1,19 = <b>595 €</b></p>
    <p>Wirkungsgrad, Spannungsfall, Toleranzen und Preise: alles Prozentrechnung.</p>`,
    () => pick([
      () => { const G2 = pick([230, 400, 1000, 1500, 2000]), p = pick([3, 5, 10, 19, 25, 4]); return T({ q: `Wie viel sind ${p} % von ${G2}?`, find: 'Prozentwert', formula: 'W = G · p / 100', steps: [`W = ${G2} · ${p} / 100`], ans: G2 * p / 100 }); },
      () => { const G2 = pick([230, 400, 200, 50]), p = pick([2, 3, 4, 5, 10]); const W = G2 * p / 100; return T({ q: `Wie viel Prozent sind ${f(W)} von ${G2}?`, find: 'p in %', formula: 'p = W / G · 100 %', steps: [`p = ${f(W)} / ${G2} · 100 %`], ans: p, unit: '%' }); },
      () => { const n = pick([120, 250, 480, 1000, 1350]); return T({ q: `Eine Rechnung hat netto ${n} €. Wie hoch ist der Bruttobetrag mit 19 % Mehrwertsteuer?`, find: 'Brutto in €', formula: 'Brutto = Netto · 1,19', steps: [`${n} € · 1,19`], ans: n * 1.19, unit: '€' }); },
      () => { const R = pick([100, 220, 470, 1000]), t = pick([5, 10]); return T({ q: `Ein Widerstand ${R} Ω hat ± ${t} % Toleranz. Wie groß ist der größtmögliche Wert?`, find: 'R max in Ω', formula: 'R max = R · (1 + p / 100)', steps: [`${R} Ω · ${f(1 + t / 100)}`], ans: R * (1 + t / 100), unit: 'Ω' }); },
      () => { const W = pick([30, 60, 90]), p = pick([10, 20, 25, 50]); return T({ q: `${W} € sind ${p} % eines Betrags. Wie groß ist der ganze Betrag (Grundwert)?`, find: 'G in €', formula: 'G = W · 100 / p', steps: [`G = ${W} € · 100 / ${p}`], ans: W * 100 / p, unit: '€' }); },
    ])());

  add('m-dreisatz', 'Dreisatz', `
    <p>Beim Dreisatz rechnest du in drei Schritten über die <b>Einheit „1“</b>.</p>
    <p><b>Proportional</b> (je mehr, desto mehr):</p>
    <p class="ex">5 m Kabel kosten 7,50 €. Was kosten 12 m?<br>1 m: 7,50 € / 5 = 1,50 €<br>12 m: 1,50 € · 12 = <b>18 €</b></p>
    <p><b>Antiproportional</b> (je mehr, desto weniger):</p>
    <p class="ex">3 Monteure brauchen 8 Tage. Wie lange brauchen 4?<br>1 Monteur: 8 · 3 = 24 Tage<br>4 Monteure: 24 / 4 = <b>6 Tage</b></p>`,
    () => rnd(0, 1)
      ? (() => { const m1 = pick([4, 5, 10, 25]), p = pick([0.8, 1.2, 1.5, 2.4]), m2 = pick([3, 12, 15, 40, 50]); return T({ q: `${m1} m Leitung kosten ${f(m1 * p)} €. Was kosten ${m2} m?`, find: 'Preis in €', formula: 'proportional: erst durch, dann mal', steps: [`1 m: ${f(m1 * p)} € / ${m1} = ${f(p)} €`, `${m2} m: ${f(p)} € · ${m2}`], ans: p * m2, unit: '€' }); })()
      : (() => { const a = pick([2, 3, 4, 6]), t = pick([6, 8, 10, 12]), b = pick([2, 3, 4, 6, 8].filter(x => x !== a)); return T({ q: `${a} Monteure brauchen für eine Installation ${t} Tage. Wie lange brauchen ${b} Monteure?`, find: 'Tage', formula: 'antiproportional: erst mal, dann durch', steps: [`1 Monteur: ${t} · ${a} = ${t * a} Tage`, `${b} Monteure: ${t * a} / ${b}`], ans: t * a / b, unit: 'Tage' }); })());

  add('m-regeln', 'Punkt vor Strich und Klammern', `
    <p>Reihenfolge beim Rechnen:</p>
    <ol><li><b>Klammern</b> zuerst</li><li>dann <b>Potenzen und Wurzeln</b></li><li>dann <b>Punktrechnung</b> (· und :)</li><li>zuletzt <b>Strichrechnung</b> (+ und −)</li></ol>
    <p class="ex">3 + 4 · 5 = 3 + 20 = <b>23</b> (nicht 35!)<br>(3 + 4) · 5 = 7 · 5 = <b>35</b><br>2 · 3² = 2 · 9 = <b>18</b></p>
    <p>Im Taschenrechner bei Formeln wie R1 · R2 / (R1 + R2) <b>immer Klammern setzen</b>.</p>`,
    () => { const a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9); return pick([
      () => T({ q: `Berechne: ${a} + ${b} · ${c}`, find: 'Ergebnis', formula: 'Punkt vor Strich', steps: [`${b} · ${c} = ${b * c}`, `${a} + ${b * c} = ${a + b * c}`], ans: a + b * c, tol: 0 }),
      () => T({ q: `Berechne: (${a} + ${b}) · ${c}`, find: 'Ergebnis', formula: 'Klammer zuerst', steps: [`${a} + ${b} = ${a + b}`, `${a + b} · ${c} = ${(a + b) * c}`], ans: (a + b) * c, tol: 0 }),
      () => T({ q: `Berechne: ${a} · ${b}²`, find: 'Ergebnis', formula: 'Potenz vor Punkt', steps: [`${b}² = ${b * b}`, `${a} · ${b * b} = ${a * b * b}`], ans: a * b * b, tol: 0 }),
      () => T({ q: `Berechne: ${a * c + b} − ${a} · ${c}`, find: 'Ergebnis', formula: 'Punkt vor Strich', steps: [`${a} · ${c} = ${a * c}`, `${a * c + b} − ${a * c} = ${b}`], ans: b, tol: 0 }),
      () => { const r1 = pick([20, 30, 60]), r2 = pick([30, 60, 120]); return T({ q: `Berechne: ${r1} · ${r2} / (${r1} + ${r2})`, find: 'Ergebnis', formula: 'Klammer zuerst, dann Punktrechnung', steps: [`${r1} + ${r2} = ${r1 + r2}`, `${r1} · ${r2} = ${r1 * r2}`, `${r1 * r2} / ${r1 + r2}`], ans: r1 * r2 / (r1 + r2) }); },
    ])(); });

  /* ---------- Übersichtsseite ---------- */
  const ids = Object.keys(G).filter(id => G[id].group === GR);
  function view() {
    const st = LT.calcGroupState;
    const stars = ids.filter(id => st(id).star).length;
    const sections = [['Gleichungen und Umstellen', ['m-plusminus', 'm-maldurch', 'm-zwei', 'm-umstellen', 'm-umstellen-plus', 'm-umstellen-quadrat', 'm-einsetzen']], ['Potenzen und Wurzeln', ['m-potenzen', 'm-potenzgesetze', 'm-zehner', 'm-zehner-rechnen', 'm-wurzel']], ['Alltagsrechnen', ['m-brueche', 'm-prozent', 'm-dreisatz', 'm-regeln']]];
    return `<a href="#ueben" class="back">← Üben</a><h1 class="page-h">Mathe-Grundlagen</h1>
      <p class="muted">Alles, was du für die Formeln in der Ausbildung brauchst, Schritt für Schritt. Jedes Thema beginnt mit einer kurzen Erklärung. Die Aufgaben haben immer neue Zahlen und einen Lösungsweg. ${stars} von ${ids.length} Sternen.</p>
      <p class="small">Empfohlene Reihenfolge: von oben nach unten. Ein Stern, wenn du 3 Aufgaben hintereinander richtig hast.</p>
      ${sections.map(([h, list]) => `<section><h2 class="sec-h">${h}</h2><div class="calcgrid">${list.map((id, i) => { const s = st(id); return `<a class="calc-t${s.star ? ' star' : ''}" href="#rechnen-${id}"><b>${G[id].title}</b><small>${s.star ? '★ geschafft · ' : s.n ? '' : 'Neu · '}${s.ok} von ${s.n} richtig</small></a>`; }).join('')}</div></section>`).join('')}
      <div class="row"><a class="btn ghost" href="#spiel-umstellen">Spiel: Formel-Akrobat</a><a class="btn ghost" href="#formeln">Formelsammlung</a></div>`;
  }
  LT.ext.routes.push(['mathe', () => view()]);
})();
