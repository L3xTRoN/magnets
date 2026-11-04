/* Lernfeld 6: Elektronische Bauelemente und Baugruppen analysieren und prüfen */
LT.lf(6, `
@ widerstaende | Widerstände und Farbcode
= ## Farbcode (4 Ringe)
= 1. Ring = 1. Ziffer · 2. Ring = 2. Ziffer · 3. Ring = Multiplikator (Anzahl Nullen) · 4. Ring = Toleranz
= - **schwarz 0 · braun 1 · rot 2 · orange 3 · gelb 4 · grün 5 · blau 6 · violett 7 · grau 8 · weiß 9**
= - Toleranz: **gold ± 5 %**, **silber ± 10 %**, braun ± 1 %
= - Merksatz: **„Schwarze Bären rennen ohne gelbe Gummistiefel bis violette Gänse weinen“**
= - Beispiel: **gelb-violett-rot-gold = 47 · 100 = 4,7 kΩ ± 5 %**
= ## Normreihen
= Widerstände gibt es in **E-Reihen** (E12, E24 …). E12: 1,0 · 1,2 · 1,5 · 1,8 · 2,2 · 2,7 · 3,3 · 3,9 · 4,7 · 5,6 · 6,8 · 8,2
= ## Kenngrößen aus dem Datenblatt
= Widerstandswert, Toleranz, **Belastbarkeit (W)**. Grenzwerte (absolute maximum ratings) dürfen nie überschritten werden.
Q Welche Zahl steht für die Farbe Rot im Widerstandsfarbcode? | 2 | 1 | 3 | 7 || schwarz 0, braun 1, rot 2, orange 3, gelb 4 …
Q Welche Zahl steht für die Farbe Gelb? | 4 | 3 | 5 | 6 || gelb = 4.
Q Welche Zahl steht für die Farbe Violett? | 7 | 6 | 8 | 9 || violett = 7.
Q Welchen Wert hat ein Widerstand mit den Ringen braun-schwarz-rot-gold? | 1 kΩ ± 5 % | 102 Ω ± 5 % | 10 Ω ± 10 % | 12 kΩ ± 5 % || 1, 0, zwei Nullen = 1000 Ω, gold = 5 %.
Q Welchen Wert hat ein Widerstand mit den Ringen gelb-violett-rot-gold? | 4,7 kΩ ± 5 % | 472 Ω ± 5 % | 47 Ω ± 10 % | 47 kΩ ± 5 % || 4, 7, zwei Nullen = 4700 Ω.
Q Welchen Wert hat ein Widerstand mit den Ringen rot-rot-braun-gold? | 220 Ω ± 5 % | 22 Ω ± 5 % | 2,2 kΩ ± 5 % | 221 Ω ± 1 % || 2, 2, eine Null = 220 Ω.
Q Welchen Wert hat ein Widerstand mit den Ringen braun-schwarz-orange-gold? | 10 kΩ ± 5 % | 103 Ω ± 5 % | 1 kΩ ± 5 % | 100 kΩ ± 5 % || 1, 0, drei Nullen = 10 000 Ω.
Q Welche Toleranz bedeutet ein goldener Ring? | ± 5 % | ± 10 % | ± 1 % | ± 20 % || Gold 5 %, Silber 10 %.
Q Ein 1-kΩ-Widerstand hat ± 5 % Toleranz. In welchem Bereich darf der echte Wert liegen? | 950 Ω bis 1050 Ω | 900 Ω bis 1100 Ω | 995 Ω bis 1005 Ω | 1000 Ω genau || 5 % von 1000 Ω = 50 Ω.
Q Welche Angabe im Datenblatt eines Widerstands begrenzt die zulässige Leistung? | Die Belastbarkeit in Watt | Die Toleranz | Der Farbcode | Die E-Reihe || Wird sie überschritten, wird der Widerstand zu heiß und kann zerstört werden.

@ kondensator | Kondensator
= ## Grundlagen
= - Speichert **elektrische Ladung** in einem elektrischen Feld. Kapazität **C = Q / U** in **Farad (F)**. Praxis: µF, nF, pF.
= - Plattenkondensator: **C = ε0 · εr · A / d** (größere Fläche, kleinerer Abstand → mehr Kapazität).
= - **Elektrolytkondensator (Elko):** gepolt! Falsch herum angeschlossen kann er platzen.
= ## Laden und Entladen über einen Widerstand
= - **Zeitkonstante τ = R · C**
= - Nach **1 τ** ca. **63 %** geladen, nach **5 τ** praktisch **vollständig** (über 99 %).
= ## Schaltungen (umgekehrt zu Widerständen!)
= - **Parallel:** **C = C1 + C2**
= - **Reihe:** **1/C = 1/C1 + 1/C2**
= ## Verhalten
= Gleichspannung: Nach dem Laden fließt **kein Strom** mehr. Wechselspannung: Kondensator lässt Strom durch, **XC = 1 / (2πfC)**.
Q In welcher Einheit wird die Kapazität angegeben? | Farad (F) | Henry (H) | Ohm (Ω) | Coulomb (C) || C = Q / U, Einheit Farad.
Q Wie lautet die Formel für die Zeitkonstante beim Laden eines Kondensators über einen Widerstand? | τ = R · C | τ = R / C | τ = C / R | τ = 2πRC || Zeitkonstante tau = R mal C.
Q Nach welcher Zeit gilt ein Kondensator als praktisch vollständig geladen? | Nach 5 τ | Nach 1 τ | Nach 2 τ | Nie || Nach 5 τ über 99 %.
Q Wie weit ist ein Kondensator nach einer Zeitkonstante τ geladen? | Etwa 63 % | Etwa 37 % | 100 % | 50 % || Nach 1 τ ≈ 63 %.
Q R = 10 kΩ, C = 100 µF. Wie groß ist τ? | 1 s | 0,1 s | 10 s | 1 ms || τ = 10 000 Ω · 0,0001 F = 1 s.
Q Gleiche Schaltung (τ = 1 s). Nach welcher Zeit ist der Kondensator praktisch voll? | 5 s | 1 s | 10 s | 0,5 s || 5 · τ = 5 s.
Q Zwei Kondensatoren mit je 10 µF sind parallel geschaltet. Wie groß ist die Gesamtkapazität? | 20 µF | 5 µF | 10 µF | 100 µF || Parallel: Kapazitäten addieren sich.
Q Zwei Kondensatoren mit je 10 µF sind in Reihe geschaltet. Wie groß ist die Gesamtkapazität? | 5 µF | 20 µF | 10 µF | 100 µF || Reihe: 1/C = 1/10 + 1/10 → C = 5 µF.
Q Was muss beim Einbau eines Elektrolytkondensators beachtet werden? | Die Polung | Die Farbe | Nichts Besonderes | Er darf nur waagerecht eingebaut werden || Ein falsch gepolter Elko kann sich erhitzen und platzen.
Q Was passiert nach dem Laden eines Kondensators an Gleichspannung? | Es fließt kein Strom mehr | Der Strom wird immer größer | Er entlädt sich sofort von selbst | Er wird zum Kurzschluss || Der geladene Kondensator sperrt Gleichstrom.
Q Wie ändert sich die Kapazität eines Plattenkondensators, wenn der Plattenabstand kleiner wird? | Sie wird größer | Sie wird kleiner | Sie bleibt gleich | Sie wird null || C = ε · A / d, kleinerer Abstand d → größere Kapazität.
Q Warum muss man vor Arbeiten an Netzteilen auf große Kondensatoren achten? | Sie können auch nach dem Abschalten noch gefährlich geladen sein | Sie sind immer radioaktiv | Sie sind magnetisch | Sie erzeugen Wechselspannung || Vor Arbeiten Spannung messen bzw. entladen.

@ spule | Spule und Induktion
= ## Grundlagen
= - Eine Spule speichert Energie im **magnetischen Feld**. **Induktivität L** in **Henry (H)**.
= - **Induktion:** Ändert sich das Magnetfeld in einer Spule, wird eine **Spannung induziert**.
= - **Selbstinduktion:** Beim **Abschalten** einer Spule entsteht eine **hohe Induktionsspannung**. Schutz: **Freilaufdiode** parallel zur Relais- oder Schützspule (bei Gleichstrom).
= ## Verhalten
= Gleichstrom: nach dem Einschalten nur der Drahtwiderstand. Wechselstrom: **XL = 2πfL**.
= ## Anwendungen
= Relais, Schütz, Transformator, Drossel, Motor.
Q In welcher Einheit wird die Induktivität angegeben? | Henry (H) | Farad (F) | Tesla (T) | Weber (Wb) || L in Henry.
Q Wann wird in einer Spule eine Spannung induziert? | Wenn sich das Magnetfeld in der Spule ändert | Nur bei konstantem Gleichstrom | Wenn die Spule kalt ist | Nie || Nur Änderungen des Magnetfeldes induzieren Spannung.
Q Was passiert beim Abschalten einer Gleichstrom-Relaisspule? | Es entsteht eine hohe Induktionsspannung (Selbstinduktion) | Nichts | Der Strom wird sofort null ohne Folgen | Die Spule wird zum Kondensator || Die Spannungsspitze kann Transistoren oder Kontakte beschädigen.
Q Wie schützt man einen Transistor vor der Abschaltspannung einer Relaisspule? | Mit einer Freilaufdiode parallel zur Spule | Mit einem Widerstand in Reihe zur Basis | Mit einer Sicherung | Mit einem größeren Relais || Die Diode leitet die Energie der Spule beim Abschalten ab.
Q Wie verhält sich der Blindwiderstand einer Spule bei steigender Frequenz? | Er steigt | Er sinkt | Er bleibt gleich | Er wird null || XL = 2πfL.
Q Welches Bauteil nutzt die Induktion, um Spannungen zu wandeln? | Transformator | Diode | Kondensator | Widerstand || Wechselspannung in der Primärspule erzeugt ein wechselndes Feld, das in der Sekundärspule Spannung induziert.

@ diode | Diode, Z-Diode, LED und Gleichrichter
= ## Diode
= - Lässt Strom nur in **einer Richtung** durch: von **Anode** zu **Kathode**. Die Kathode ist mit einem **Ring** markiert.
= - **Durchlassrichtung:** Silizium-Diode ab ca. **0,7 V** leitend. **Sperrrichtung:** sperrt bis zur Durchbruchspannung.
= ## Gleichrichter
= - **Einweggleichrichter:** 1 Diode, nur eine Halbwelle wird genutzt.
= - **Brückengleichrichter (B2U):** **4 Dioden**, beide Halbwellen werden genutzt.
= - **Glättung** mit einem **Elko** (Ladekondensator).
= ## Z-Diode
= Wird in **Sperrrichtung** betrieben und hält die **Spannung konstant** (Stabilisierung). Braucht einen **Vorwiderstand**.
= ## LED
= - Leuchtdiode, Durchlassspannung je nach Farbe ca. 1,8–3,5 V. **Immer mit Vorwiderstand**.
= - **Vorwiderstand: R = (U − U_LED) / I_LED**
Q In welche Richtung lässt eine Diode den Strom durch? | Von der Anode zur Kathode | Von der Kathode zur Anode | In beide Richtungen | Gar nicht || In Durchlassrichtung ist die Anode positiver als die Kathode.
Q Wie ist die Kathode einer Diode gekennzeichnet? | Mit einem Ring | Mit einem Punkt am längeren Bein | Gar nicht | Mit der Farbe Rot || Der Ring auf dem Gehäuse markiert die Kathode.
Q Ab welcher Spannung wird eine Silizium-Diode in Durchlassrichtung leitend? | Etwa 0,7 V | Etwa 7 V | Etwa 0,07 V | 230 V || Die Schleusenspannung von Si liegt bei ca. 0,6–0,7 V.
Q Wie viele Dioden hat ein Brückengleichrichter (B2U)? | 4 | 1 | 2 | 6 || Vier Dioden nutzen beide Halbwellen der Wechselspannung.
Q Was ist der Vorteil eines Brückengleichrichters gegenüber einem Einweggleichrichter? | Beide Halbwellen werden genutzt | Er braucht nur eine Diode | Er erzeugt Wechselspannung | Er braucht keinen Trafo || Ergebnis: weniger Welligkeit, bessere Ausnutzung.
Q Wozu dient der Elko nach einem Gleichrichter? | Zur Glättung der pulsierenden Gleichspannung | Zur Gleichrichtung | Zur Strombegrenzung | Zur Erhöhung der Frequenz || Er lädt sich in den Spitzen auf und liefert dazwischen Strom.
Q Wie wird eine Z-Diode zur Spannungsstabilisierung betrieben? | In Sperrrichtung mit Vorwiderstand | In Durchlassrichtung ohne Widerstand | Parallel zu einer LED in Durchlassrichtung | In Reihe zum Verbraucher ohne Vorwiderstand || In Sperrrichtung hält sie ihre Z-Spannung konstant.
Q Warum braucht eine LED einen Vorwiderstand? | Er begrenzt den Strom, sonst wird die LED zerstört | Damit sie heller leuchtet | Damit sie Wechselstrom verträgt | Er ist nicht nötig || Ohne Begrenzung steigt der Strom in Durchlassrichtung sehr stark an.
Q Eine rote LED (2 V, 20 mA) soll an 12 V betrieben werden. Wie groß muss der Vorwiderstand sein? | 500 Ω | 600 Ω | 100 Ω | 50 Ω || R = (12 V − 2 V) / 0,02 A = 500 Ω.
Q Eine LED (3 V, 20 mA) soll an 5 V betrieben werden. Wie groß muss der Vorwiderstand sein? | 100 Ω | 250 Ω | 150 Ω | 40 Ω || R = (5 V − 3 V) / 0,02 A = 100 Ω.
Q Welche Leistung wird im Vorwiderstand umgesetzt (12 V, LED 2 V, 20 mA)? | 0,2 W | 0,24 W | 2 W | 0,04 W || P = (12 V − 2 V) · 0,02 A = 0,2 W.

@ transistor | Transistor, Thyristor und Operationsverstärker
= ## Bipolartransistor (NPN / PNP)
= - Anschlüsse: **Basis (B), Kollektor (C), Emitter (E)**.
= - Ein **kleiner Basisstrom** steuert einen **großen Kollektorstrom**: **I_C = B · I_B** (B = Stromverstärkung).
= - Als **Schalter**: Basis über **Vorwiderstand** ansteuern, Transistor schaltet z. B. ein Relais.
= ## Feldeffekttransistor (MOSFET)
= Wird über die **Spannung am Gate** gesteuert, praktisch **leistungslos** (fast kein Gate-Strom).
= ## Thyristor
= - Steuerbare Diode mit Anode, Kathode und **Gate**.
= - **Zündet** durch einen Impuls am Gate und **bleibt leitend**, bis der Strom unter den **Haltestrom** fällt.
= - Einsatz: Phasenanschnittsteuerung (z. B. Dimmer, Drehzahlsteller).
= ## Operationsverstärker (OPV)
= - Ideal: sehr große Verstärkung, sehr großer Eingangswiderstand.
= - **Invertierender Verstärker:** **V = − R2 / R1**
= - **Nichtinvertierender Verstärker:** **V = 1 + R2 / R1**
= - **Komparator:** vergleicht zwei Spannungen, Ausgang springt.
= ## Arbeit an Baugruppen
= - **ESD-Schutz:** Erdungsarmband, ESD-Unterlage. Bauteile können durch statische Entladung zerstört werden, auch ohne dass man es merkt.
= - **Entsorgung:** Elektroaltgeräte nach **ElektroG**, Batterien nach **BattG** getrennt sammeln, nicht in den Hausmüll.
= - **Dokumentation:** Fehlerprotokoll und Abnahmeprotokoll.
Q Wie heißen die Anschlüsse eines Bipolartransistors? | Basis, Kollektor, Emitter | Gate, Drain, Source | Anode, Kathode, Gate | L, N, PE || Gate, Drain, Source sind die Anschlüsse eines FET.
Q Was steuert beim Bipolartransistor den Kollektorstrom? | Ein kleiner Basisstrom | Die Gatespannung ohne Strom | Die Temperatur allein | Der Emitterwiderstand allein || I_C = B · I_B.
Q Ein Transistor hat B = 200, der Basisstrom beträgt 0,1 mA. Wie groß ist I_C? | 20 mA | 2 mA | 200 mA | 0,02 mA || I_C = 200 · 0,1 mA = 20 mA.
Q Wie heißen die Anschlüsse eines MOSFET? | Gate, Drain, Source | Basis, Kollektor, Emitter | Anode, Kathode | A1, A2 || Beim MOSFET wird über die Gate-Spannung gesteuert.
Q Wodurch wird ein MOSFET gesteuert? | Durch die Spannung am Gate, nahezu ohne Strom | Durch einen großen Basisstrom | Durch Licht | Durch den Haltestrom || Deshalb sehr geringe Steuerleistung.
Q Wie wird ein Thyristor gezündet? | Durch einen Impuls am Gate | Durch Umpolen der Kathode | Durch Erwärmen | Er leitet immer || Danach bleibt er leitend, auch ohne Gatestrom.
Q Wann sperrt ein gezündeter Thyristor wieder? | Wenn der Strom unter den Haltestrom fällt | Sobald der Gate-Impuls endet | Nach genau 1 Sekunde | Nie || Bei Wechselspannung passiert das am Ende jeder Halbwelle.
Q Wo werden Thyristoren bzw. Triacs typischerweise eingesetzt? | In Dimmern mit Phasenanschnittsteuerung | In LED-Vorwiderständen | In Netzwerkkabeln | Als Schutzleiter || Durch späteres oder früheres Zünden wird die Leistung gesteuert.
Q Wie groß ist die Verstärkung eines invertierenden OPV mit R1 = 10 kΩ und R2 = 100 kΩ? | −10 | 11 | 10 | −0,1 || V = −R2 / R1 = −100 kΩ / 10 kΩ = −10.
Q Wie groß ist die Verstärkung eines nichtinvertierenden OPV mit R1 = 10 kΩ und R2 = 100 kΩ? | 11 | 10 | −10 | 1,1 || V = 1 + R2 / R1 = 1 + 10 = 11.
Q Wozu dient ein Erdungsarmband bei Arbeiten an Platinen? | Zum Schutz der Bauteile vor elektrostatischer Entladung (ESD) | Zum Schutz vor 230 V | Als Schmuck | Zur Messung des Stroms || Statische Aufladung kann empfindliche Halbleiter zerstören.
Q Wie werden defekte Elektronikbauteile und Altgeräte entsorgt? | Getrennt nach ElektroG, Batterien nach BattG | Im Hausmüll | Im Altpapier | Verbrennen || Elektroschrott enthält Schadstoffe und wertvolle Rohstoffe.
Q Was ist ein Komparator? | Ein OPV, der zwei Spannungen vergleicht und am Ausgang umschaltet | Ein Widerstandsnetzwerk | Ein Gleichrichter | Ein Transformator || Zum Beispiel für Dämmerungsschalter.
`);
