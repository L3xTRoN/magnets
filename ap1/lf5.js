/* Lernfeld 5: Elektroenergieversorgung und Sicherheit von Anlagen und Geräten konzipieren */
LT.lf(5, `
@ wechselstrom | Wechselspannung und Wechselstrom
= ## Kennwerte im Netz
= - **Effektivwert U = 230 V**, Frequenz **f = 50 Hz**, Periodendauer **T = 1/f = 20 ms**.
= - **Scheitelwert û = U · √2 ≈ 325 V**. Spitze-Spitze-Wert ≈ 650 V.
= - Der Effektivwert erzeugt in einem Widerstand **dieselbe Wärme** wie eine gleich große Gleichspannung.
= ## Verhalten der Bauteile
= - **Ohmscher Widerstand:** Strom und Spannung **in Phase**.
= - **Spule (induktiv):** Strom **eilt der Spannung um 90° nach**. **XL = 2 · π · f · L**
= - **Kondensator (kapazitiv):** Strom **eilt der Spannung um 90° vor**. **XC = 1 / (2 · π · f · C)**
= - Merksatz: **„Beim Kondensator eilt der Strom vor, bei Induktivitäten wird er sich verspäten.“**
= ## Leistung
= - **Scheinleistung S = U · I** in **VA**
= - **Wirkleistung P = U · I · cos φ** in **W**
= - **Blindleistung Q** in **var**
= - **S² = P² + Q²** (Leistungsdreieck). **cos φ = P / S** heißt Leistungsfaktor.
Q Wie groß ist die Periodendauer bei 50 Hz? | 20 ms | 50 ms | 2 ms | 0,5 s || T = 1 / f = 1 / 50 Hz = 0,02 s = 20 ms.
Q Wie groß ist der Scheitelwert der Netzspannung 230 V? | ≈ 325 V | ≈ 163 V | 230 V | ≈ 400 V || û = 230 V · √2 ≈ 325 V.
Q Was gibt der Effektivwert einer Wechselspannung an? | Den Wert einer Gleichspannung, die in einem Widerstand die gleiche Wärme erzeugt | Den höchsten Wert der Spannung | Den Mittelwert über eine halbe Periode | Den Wert bei 0 Hz || Messgeräte zeigen normalerweise den Effektivwert an.
Q Wie verhalten sich Strom und Spannung an einem ohmschen Widerstand? | Sie sind in Phase | Der Strom eilt 90° vor | Der Strom eilt 90° nach | Sie sind 180° verschoben || Kein Phasenverschiebungswinkel: φ = 0°.
Q Wie verhält sich der Strom an einer idealen Spule? | Er eilt der Spannung um 90° nach | Er eilt der Spannung um 90° vor | Er ist mit der Spannung in Phase | Er ist null || Induktivität: Strom verspätet sich.
Q Wie verhält sich der Strom an einem idealen Kondensator? | Er eilt der Spannung um 90° vor | Er eilt der Spannung um 90° nach | Er ist in Phase | Er fließt bei Wechselspannung nicht || Kondensator: Strom eilt vor.
Q Wie ändert sich der induktive Blindwiderstand XL, wenn die Frequenz steigt? | Er steigt | Er sinkt | Er bleibt gleich | Er wird null || XL = 2πfL, proportional zu f.
Q Wie ändert sich der kapazitive Blindwiderstand XC, wenn die Frequenz steigt? | Er sinkt | Er steigt | Er bleibt gleich | Er wird unendlich || XC = 1 / (2πfC), umgekehrt proportional zu f.
Q In welcher Einheit wird die Scheinleistung S angegeben? | VA (Voltampere) | W (Watt) | var | kWh || S in VA, P in W, Q in var.
Q In welcher Einheit wird die Blindleistung Q angegeben? | var | W | VA | Wh || var = Volt-Ampere-reaktiv.
Q Ein Motor nimmt an 230 V einen Strom von 5 A auf, cos φ = 0,8. Wie groß ist die Wirkleistung? | 920 W | 1150 W | 1437 W | 184 W || P = U · I · cos φ = 230 V · 5 A · 0,8 = 920 W.
Q Gleicher Motor (230 V, 5 A). Wie groß ist die Scheinleistung? | 1150 VA | 920 VA | 46 VA | 287 VA || S = U · I = 230 V · 5 A = 1150 VA.
Q Wie lautet der Zusammenhang im Leistungsdreieck? | S² = P² + Q² | S = P + Q | P² = S² + Q² | S = P · Q || Wirk- und Blindleistung stehen senkrecht zueinander.
Q Was gibt der Leistungsfaktor cos φ an? | Das Verhältnis von Wirkleistung zu Scheinleistung | Das Verhältnis von Spannung zu Strom | Die Frequenz | Den Wirkungsgrad eines Motors || cos φ = P / S.

@ drehstrom | Drehstrom und Spannungsebenen
= ## Drehstromnetz 400/230 V
= - Drei Außenleiter **L1, L2, L3**, um **120° phasenverschoben**.
= - **Leiterspannung** (zwischen zwei Außenleitern): **400 V**. **Strangspannung** (Außenleiter gegen N): **230 V**.
= - **Verkettungsfaktor √3 ≈ 1,73**: 230 V · √3 ≈ 400 V.
= ## Stern- und Dreieckschaltung
= - **Stern (Y):** Strangspannung = U / √3, Strangstrom = Leiterstrom.
= - **Dreieck (Δ):** Strangspannung = Leiterspannung, Leiterstrom = √3 · Strangstrom.
= - Gleiche Widerstände in Dreieck nehmen die **dreifache Leistung** auf wie in Stern.
= ## Leistung bei Drehstrom
= **P = √3 · U · I · cos φ** (U = Leiterspannung, I = Leiterstrom)
= ## Spannungsebenen
= - **Niederspannung:** bis **1000 V AC** bzw. **1500 V DC** (z. B. 400/230 V)
= - **Mittelspannung:** z. B. 10 kV oder 20 kV
= - **Hochspannung:** z. B. 110 kV · **Höchstspannung:** 220 kV und 380 kV
= ## Hausanschluss
= Netz → **Hausanschlusskasten (HAK)** mit NH-Sicherungen → Zählerplatz mit **selektivem Hauptleitungsschutzschalter (SH-Schalter)** → **Stromkreisverteiler** mit RCD und LS.
Q Um wie viel Grad sind die drei Außenleiter im Drehstromnetz gegeneinander verschoben? | 120° | 90° | 180° | 60° || 360° / 3 = 120°.
Q Wie groß ist die Spannung zwischen zwei Außenleitern im Netz 400/230 V? | 400 V | 230 V | 690 V | 115 V || Das ist die Leiterspannung.
Q Wie groß ist die Spannung zwischen einem Außenleiter und N? | 230 V | 400 V | 325 V | 0 V || Das ist die Strangspannung.
Q Wie heißt der Faktor zwischen Leiter- und Strangspannung? | Verkettungsfaktor √3 | Leistungsfaktor cos φ | Wirkungsgrad η | Übersetzungsverhältnis ü || 230 V · √3 ≈ 400 V.
Q Welche Spannung liegt an einem Strang in Sternschaltung am 400-V-Netz? | 230 V | 400 V | 690 V | 133 V || U_Strang = 400 V / √3 ≈ 230 V.
Q Welche Spannung liegt an einem Strang in Dreieckschaltung am 400-V-Netz? | 400 V | 230 V | 133 V | 690 V || Im Dreieck liegt jeder Strang zwischen zwei Außenleitern.
Q Wie groß ist die Leistung von drei gleichen Widerständen in Dreieck im Vergleich zu Stern? | Dreimal so groß | Gleich groß | Halb so groß | √3-mal so groß || Im Dreieck √3-mal mehr Spannung pro Strang → (√3)² = 3-fache Leistung.
Q Wie lautet die Formel für die Wirkleistung bei Drehstrom? | P = √3 · U · I · cos φ | P = 3 · U · I | P = U · I | P = √3 · U / I || Mit Leiterspannung und Leiterstrom.
Q Ein Drehstrommotor: 400 V, 10 A, cos φ = 0,85. Wie groß ist P etwa? | ≈ 5,9 kW | ≈ 3,4 kW | ≈ 6,9 kW | ≈ 10,2 kW || P = 1,73 · 400 V · 10 A · 0,85 ≈ 5890 W.
Q Bis zu welcher Wechselspannung spricht man von Niederspannung? | 1000 V | 230 V | 400 V | 10 kV || Niederspannung: bis 1000 V AC bzw. 1500 V DC.
Q Welche Spannung ist typisch für das Mittelspannungsnetz? | 10 kV oder 20 kV | 400 V | 380 kV | 50 V || Ortsnetztransformatoren setzen Mittelspannung auf 400/230 V um.
Q Wo endet das Netz des Netzbetreibers und beginnt die Kundenanlage? | Am Hausanschlusskasten (HAK) | An der Steckdose | Am Zähler-Display | Am RCD || Im HAK sitzen die Hausanschlusssicherungen.

@ schutzklassen | Schutzklassen und Schutzarten (IP)
= ## Schutzklassen
= - **Schutzklasse I:** Gerät mit **Schutzleiteranschluss**. Metallgehäuse wird über PE geschützt.
= - **Schutzklasse II:** **doppelte oder verstärkte Isolierung**, **kein** Schutzleiteranschluss. Symbol: **zwei ineinander liegende Quadrate**.
= - **Schutzklasse III:** Betrieb mit **Schutzkleinspannung (SELV/PELV)**. Symbol: Raute mit III.
= ## IP-Schutzarten (IP + 2 Ziffern)
= - **1. Ziffer (0–6):** Schutz gegen **Berührung und Fremdkörper**. 5 = staubgeschützt, **6 = staubdicht**.
= - **2. Ziffer (0–9):** Schutz gegen **Wasser**. 4 = Spritzwasser, 5 = Strahlwasser, 7 = zeitweiliges Untertauchen.
= - **X** = nicht angegeben, z. B. IPX4.
= - Beispiele: **IP20** einfache Geräte im Innenraum · **IP44** spritzwassergeschützt (z. B. Bad, außen) · **IP65** staubdicht und strahlwassergeschützt · **IP67** kurzzeitig untertauchbar.
Q Was kennzeichnet ein Gerät der Schutzklasse I? | Es hat einen Schutzleiteranschluss | Es ist doppelt isoliert | Es wird mit Kleinspannung betrieben | Es hat kein Gehäuse || Leitfähige Gehäuseteile sind mit PE verbunden.
Q Was kennzeichnet ein Gerät der Schutzklasse II? | Doppelte oder verstärkte Isolierung, kein Schutzleiteranschluss | Schutzleiteranschluss | Betrieb nur mit SELV | Metallgehäuse mit PE || Symbol: zwei ineinander liegende Quadrate.
Q Was kennzeichnet ein Gerät der Schutzklasse III? | Betrieb mit Schutzkleinspannung | Doppelte Isolierung | Schutzleiteranschluss | Betrieb nur mit 400 V || Zum Beispiel Geräte an einem Sicherheitstransformator.
Q Welches Symbol hat die Schutzklasse II? | Zwei ineinander liegende Quadrate | Erdungszeichen | Raute mit III | Ein Blitz im Dreieck || Das Quadrat-im-Quadrat steht für doppelte Isolierung.
Q Darf ein Gerät der Schutzklasse II an den Schutzleiter angeschlossen werden? | Nein, es hat keinen Schutzleiteranschluss | Ja, das ist Pflicht | Nur im Bad | Nur bei 400 V || Der Schutz beruht allein auf der Isolierung.
Q Wofür steht die erste Ziffer der IP-Schutzart? | Schutz gegen Berührung und Fremdkörper | Schutz gegen Wasser | Schutzklasse | Spannungshöhe || Erste Ziffer 0–6, zweite Ziffer 0–9.
Q Wofür steht die zweite Ziffer der IP-Schutzart? | Schutz gegen Wasser | Schutz gegen Fremdkörper | Temperaturbereich | Schlagfestigkeit || Zum Beispiel 4 = Spritzwasser.
Q Was bedeutet IP44? | Schutz gegen Fremdkörper größer 1 mm und gegen Spritzwasser | Staubdicht und wasserdicht | Kein Schutz | Nur gegen Tropfwasser || Typisch für Leuchten im Außenbereich oder im Bad außerhalb der Duschzone.
Q Was bedeutet die Ziffer 6 an erster Stelle (z. B. IP65)? | Staubdicht | Spritzwassergeschützt | Untertauchbar | Kein Schutz || 5 = staubgeschützt, 6 = staubdicht.
Q Was bedeutet IPX4? | Spritzwasserschutz, Fremdkörperschutz nicht angegeben | Kein Wasserschutz | Staubdicht | 4 Meter wasserdicht || X steht für eine nicht angegebene Ziffer.
Q Welche Schutzart ist für ein Gerät nötig, das zeitweise untergetaucht wird? | IP67 | IP44 | IP20 | IP54 || 7 = zeitweiliges Untertauchen.

@ pruefung | Prüfen von Anlagen und Geräten
= ## Erstprüfung neuer Anlagen (DIN VDE 0100-600)
= Reihenfolge: **Besichtigen → Erproben → Messen**, danach **Prüfprotokoll**.
= - **Messen:** Durchgängigkeit der Schutzleiter, **Isolationswiderstand** (Prüfspannung **500 V DC**, Grenzwert **≥ 1 MΩ**), Schleifenimpedanz bzw. Abschaltbedingung, RCD-Prüfung (Auslösezeit, Berührungsspannung), Erdungswiderstand (TT), Drehfeld.
= - Isolationsmessung nur im **spannungsfreien** Zustand, Verbraucher abklemmen.
= ## Wiederholungsprüfung
= - Anlagen: **DIN VDE 0105-100**. Geräte: früher DIN VDE 0701-0702, heute **DIN EN 50678 (VDE 0701)** nach Instandsetzung und **DIN EN 50699 (VDE 0702)** Wiederholungsprüfung.
= - Fristen nach **DGUV Vorschrift 3** (Richtwerte): ortsfeste Anlagen **4 Jahre**, ortsveränderliche Geräte **6 Monate**, auf **Baustellen 3 Monate**. Bei geringer Fehlerquote können die Fristen verlängert werden (z. B. im Büro).
= ## Gerätprüfung: Ablauf
= **Sichtprüfung → Schutzleiterwiderstand → Isolationswiderstand → Schutzleiter- bzw. Berührungsstrom → Funktionsprüfung → Dokumentation**
= ## Grenzwerte Geräteprüfung
= - **Schutzleiterwiderstand:** **≤ 0,3 Ω** bis 5 m Leitung, je weitere 7,5 m + 0,1 Ω, höchstens 1 Ω.
= - **Isolationswiderstand:** SK I **≥ 1 MΩ**, SK II **≥ 2 MΩ**, SK III ≥ 0,25 MΩ.
= - **Schutzleiterstrom ≤ 3,5 mA**, **Berührungsstrom ≤ 0,5 mA**.
Q In welcher Reihenfolge erfolgt die Erstprüfung nach DIN VDE 0100-600? | Besichtigen, Erproben, Messen | Messen, Erproben, Besichtigen | Erproben, Messen, Besichtigen | Nur Messen || Erst schauen, dann Funktion testen, dann messen.
Q Mit welcher Prüfspannung wird der Isolationswiderstand in 230/400-V-Anlagen gemessen? | 500 V DC | 230 V AC | 50 V AC | 1000 V AC || Für Anlagen bis 500 V Nennspannung: Prüfspannung 500 V DC.
Q Welcher Mindestwert gilt für den Isolationswiderstand bei der Erstprüfung von 230/400-V-Anlagen? | 1 MΩ | 1 kΩ | 0,3 Ω | 100 Ω || Mindestens 1 MΩ.
Q Was muss vor der Isolationsmessung beachtet werden? | Anlage spannungsfrei schalten und empfindliche Verbraucher abklemmen | Alle Verbraucher einschalten | RCD überbrücken | Unter Spannung messen || Die Prüfspannung kann Geräte beschädigen und Fremdspannung verfälscht die Messung.
Q Nach welcher Norm werden ortsveränderliche Geräte bei der Wiederholungsprüfung heute geprüft? | DIN EN 50699 (VDE 0702) | DIN VDE 0100-410 | DIN 18015-3 | DIN EN 54 || Nach Instandsetzung gilt DIN EN 50678 (VDE 0701). Beide ersetzen die frühere DIN VDE 0701-0702.
Q Wie groß darf der Schutzleiterwiderstand eines Geräts mit bis zu 5 m Anschlussleitung höchstens sein? | 0,3 Ω | 1 MΩ | 3,5 mA | 30 Ω || Je weitere 7,5 m kommen 0,1 Ω dazu, maximal 1 Ω.
Q Welcher Isolationswiderstand gilt mindestens für ein Gerät der Schutzklasse I? | 1 MΩ | 2 MΩ | 0,3 Ω | 0,25 MΩ || SK I: 1 MΩ, SK II: 2 MΩ, SK III: 0,25 MΩ.
Q Welcher Isolationswiderstand gilt mindestens für ein Gerät der Schutzklasse II? | 2 MΩ | 1 MΩ | 0,5 MΩ | 0,3 Ω || Doppelt isolierte Geräte müssen einen höheren Wert erreichen.
Q Wie groß darf der Schutzleiterstrom eines Geräts der Schutzklasse I üblicherweise höchstens sein? | 3,5 mA | 30 mA | 0,5 mA | 10 A || Allgemeiner Grenzwert 3,5 mA.
Q Wie groß darf der Berührungsstrom an berührbaren leitfähigen Teilen höchstens sein? | 0,5 mA | 3,5 mA | 30 mA | 5 mA || Grenzwert für Berührungsstrom: 0,5 mA.
Q Womit beginnt jede Geräteprüfung? | Mit der Sichtprüfung | Mit der Isolationsmessung | Mit der Funktionsprüfung | Mit der Rechnung || Beschädigte Leitungen, Gehäuse oder Stecker erkennt man schon beim Hinsehen.
Q Welche Vorschrift legt die Prüffristen für elektrische Anlagen und Betriebsmittel im Betrieb fest? | DGUV Vorschrift 3 | DSGVO | DIN EN 81346 | VDE 0100-520 || Mit Richtwerten, die der Betrieb in der Gefährdungsbeurteilung festlegt.
Q Welcher Richtwert gilt nach DGUV Vorschrift 3 für ortsveränderliche Geräte auf Baustellen? | 3 Monate | 4 Jahre | 2 Jahre | 1 Woche || Auf Baustellen werden Geräte stark beansprucht, deshalb kurze Frist.
Q Welcher Richtwert gilt nach DGUV Vorschrift 3 für ortsfeste elektrische Anlagen? | 4 Jahre | 6 Monate | 1 Jahr | 10 Jahre || Ortsfeste Anlagen und Betriebsmittel: 4 Jahre.
Q Was muss nach jeder Prüfung erstellt werden? | Ein Prüfprotokoll | Nur eine Rechnung | Ein neuer Schaltplan | Nichts || Das Protokoll dokumentiert Messwerte und Ergebnis.
Q Was wird bei der RCD-Prüfung u. a. gemessen? | Auslösezeit und Berührungsspannung | Isolationswiderstand der Leuchten | Datenrate | Schutzklasse || Die Berührungsspannung darf dabei 50 V nicht überschreiten.
`);
