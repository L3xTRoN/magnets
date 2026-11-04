/* Lernfeld 3: Steuerungen und Regelungen analysieren und realisieren */
LT.lf(3, `
@ eva | EVA-Prinzip, Sensoren und Aktoren
= ## EVA-Prinzip
= **Eingabe → Verarbeitung → Ausgabe**. Jede Steuerung lässt sich so in einem Blockschaltbild darstellen.
= - **Sensoren** (Eingabe): Taster, Schalter, Endschalter, Lichtschranke, Temperaturfühler, Bewegungsmelder, Näherungsschalter.
= - **Verarbeitung:** Relais, Schütze, Logikbausteine, SPS, Mikrocontroller.
= - **Aktoren** (Ausgabe): Motor, Schützspule, Magnetventil, Leuchte, Hupe.
= ## Näherungsschalter
= - **Induktiv:** erkennt nur **Metall**.
= - **Kapazitiv:** erkennt **fast alle Materialien** (auch Holz, Kunststoff, Flüssigkeiten).
= - **Optisch:** Lichtschranke, Reflexlichttaster.
= ## Schließer und Öffner
= - **Schließer:** im Ruhezustand offen, betätigt geschlossen.
= - **Öffner:** im Ruhezustand geschlossen, betätigt offen.
= - **Aus- und Not-Halt-Taster sind Öffner** (drahtbruchsicher): Reißt eine Leitung, wird ausgeschaltet statt dass nichts passiert.
Q Wofür steht EVA? | Eingabe, Verarbeitung, Ausgabe | Erfassen, Verteilen, Abschalten | Einschalten, Verriegeln, Ausschalten | Energie, Verbrauch, Arbeit || Grundprinzip jeder Steuerung und jedes Computers.
Q Welches Bauteil ist ein Sensor? | Endschalter | Motor | Magnetventil | Hupe || Sensoren erfassen Zustände und geben Signale an die Verarbeitung.
Q Welches Bauteil ist ein Aktor? | Motor | Lichtschranke | Temperaturfühler | Taster || Aktoren setzen Signale in eine Wirkung um (Bewegung, Licht, Ton).
Q Welche Materialien erkennt ein induktiver Näherungsschalter? | Nur Metalle | Alle Materialien | Nur Flüssigkeiten | Nur Kunststoff || Er arbeitet mit einem magnetischen Wechselfeld, das nur von Metall beeinflusst wird.
Q Welcher Näherungsschalter erkennt auch Holz, Kunststoff oder Flüssigkeiten? | Kapazitiver Näherungsschalter | Induktiver Näherungsschalter | Reedkontakt | Bimetallschalter || Kapazitive Sensoren reagieren auf die Änderung eines elektrischen Feldes.
Q Was ist ein Schließer? | Ein Kontakt, der im Ruhezustand offen ist und bei Betätigung schließt | Ein Kontakt, der im Ruhezustand geschlossen ist | Ein Kontakt, der immer geschlossen bleibt | Ein Schutzschalter || Kontaktbezeichnung z. B. 13–14.
Q Was ist ein Öffner? | Ein Kontakt, der im Ruhezustand geschlossen ist und bei Betätigung öffnet | Ein Kontakt, der im Ruhezustand offen ist | Ein Motorschutzschalter | Ein Wechselschalter || Kontaktbezeichnung z. B. 11–12 oder 21–22.
Q Warum werden Aus-Taster und Not-Halt als Öffner ausgeführt? | Damit bei Drahtbruch sicher abgeschaltet wird (drahtbruchsicher) | Weil Öffner billiger sind | Damit sie länger halten | Weil Schließer verboten sind || Ein Leitungsbruch wirkt wie eine Betätigung: Die Anlage geht aus.
Q Was zeigt ein Blockschaltbild? | Funktionseinheiten als Blöcke und den Signalfluss zwischen ihnen | Die Lage der Steckdosen im Raum | Jede einzelne Ader | Die Leitungsquerschnitte || Gut, um den strukturellen Aufbau einer Anlage zu verstehen.

@ logik | Logische Grundverknüpfungen
= ## Grundfunktionen (1 = Signal an, 0 = aus)
= - **UND (AND, Zeichen &):** Ausgang 1 nur, wenn **alle** Eingänge 1 sind. Entspricht einer **Reihenschaltung** von Schließern.
= - **ODER (OR, Zeichen ≥1):** Ausgang 1, wenn **mindestens ein** Eingang 1 ist. Entspricht einer **Parallelschaltung** von Schließern.
= - **NICHT (NOT, Zeichen 1 mit Kreis):** Ausgang ist das Gegenteil des Eingangs. Entspricht einem **Öffner**.
= ## Abgeleitete Funktionen
= - **NAND:** UND mit Negation. Ausgang 0 nur, wenn alle Eingänge 1 sind.
= - **NOR:** ODER mit Negation. Ausgang 1 nur, wenn alle Eingänge 0 sind.
= - **XOR (Exklusiv-ODER, =1):** Ausgang 1, wenn die Eingänge **unterschiedlich** sind. Wie die Wechselschaltung!
= ## Wahrheitstabelle
= Bei n Eingängen gibt es **2ⁿ** Kombinationen. 2 Eingänge → 4 Zeilen, 3 Eingänge → 8 Zeilen.
Q Wann ist der Ausgang einer UND-Verknüpfung 1? | Nur wenn alle Eingänge 1 sind | Wenn mindestens ein Eingang 1 ist | Wenn alle Eingänge 0 sind | Wenn die Eingänge unterschiedlich sind || UND = alle Bedingungen müssen erfüllt sein.
Q Wann ist der Ausgang einer ODER-Verknüpfung 1? | Wenn mindestens ein Eingang 1 ist | Nur wenn alle Eingänge 1 sind | Nur wenn alle Eingänge 0 sind | Nie || ODER = eine Bedingung reicht.
Q Welcher Kontaktschaltung entspricht eine UND-Verknüpfung? | Reihenschaltung von Schließern | Parallelschaltung von Schließern | Ein einzelner Öffner | Parallelschaltung von Öffnern || Strom fließt nur, wenn alle Schließer in Reihe geschlossen sind.
Q Welcher Kontaktschaltung entspricht eine ODER-Verknüpfung? | Parallelschaltung von Schließern | Reihenschaltung von Schließern | Ein einzelner Öffner | Reihenschaltung von Öffnern || Ein geschlossener Zweig reicht für den Stromfluss.
Q Welches Schaltzeichen-Symbol steht im Kästchen einer ODER-Verknüpfung? | ≥1 | & | =1 | 1 || ≥1 heißt: mindestens ein Eingang muss 1 sein.
Q Welches Symbol steht im Kästchen einer UND-Verknüpfung? | & | ≥1 | =1 | 1 || & = UND.
Q Wann ist der Ausgang einer XOR-Verknüpfung 1? | Wenn die Eingänge unterschiedlich sind | Wenn beide Eingänge 1 sind | Wenn beide Eingänge 0 sind | Immer || Exklusiv-ODER: entweder A oder B, nicht beide.
Q Welche Installationsschaltung verhält sich wie eine XOR-Verknüpfung? | Wechselschaltung | Ausschaltung | Serienschaltung | Steckdosenschaltung || Jede Betätigung eines der beiden Schalter ändert den Zustand der Leuchte.
Q Wann ist der Ausgang einer NAND-Verknüpfung 0? | Nur wenn alle Eingänge 1 sind | Wenn mindestens ein Eingang 0 ist | Wenn alle Eingänge 0 sind | Nie || NAND = NICHT-UND: genau umgekehrt zu UND.
Q Wann ist der Ausgang einer NOR-Verknüpfung 1? | Nur wenn alle Eingänge 0 sind | Wenn mindestens ein Eingang 1 ist | Wenn alle Eingänge 1 sind | Immer || NOR = NICHT-ODER.
Q Wie viele Zeilen hat die Wahrheitstabelle für 3 Eingänge? | 8 | 3 | 6 | 9 || 2³ = 8 Kombinationen.
Q Was macht eine NICHT-Verknüpfung (Negation)? | Sie kehrt das Signal um: aus 1 wird 0 und aus 0 wird 1 | Sie verdoppelt das Signal | Sie speichert das Signal | Sie verzögert das Signal || Entspricht einem Öffner-Kontakt.

@ steuerung-regelung | Steuerung oder Regelung?
= ## Steuerung
= **Offene Wirkungskette**: Es gibt **keine Rückmeldung**, ob das Ziel erreicht wurde. Beispiel: Zeitschaltuhr schaltet Heizung 2 Stunden ein, egal wie warm es ist.
= ## Regelung
= **Geschlossener Regelkreis**: Der **Istwert** wird ständig gemessen und mit dem **Sollwert** verglichen.
= - **w** = Führungsgröße (**Sollwert**)
= - **x** = Regelgröße (**Istwert**)
= - **e = w − x** = Regeldifferenz
= - **y** = Stellgröße (Ausgang des Reglers)
= - **z** = Störgröße (z. B. offenes Fenster)
= ## Zweipunktregler
= Kennt nur **Ein und Aus** (z. B. Bimetall im Bügeleisen, Thermostat). Die **Hysterese** (Schaltdifferenz) verhindert ständiges Hin- und Herschalten.
Q Was ist das Kennzeichen einer Steuerung? | Offene Wirkungskette ohne Rückmeldung des Ergebnisses | Geschlossener Kreis mit ständigem Vergleich von Soll- und Istwert | Sie braucht immer einen Computer | Sie hat immer eine Störgröße || Steuerung: Befehl ausführen, ohne das Ergebnis zu prüfen.
Q Was ist das Kennzeichen einer Regelung? | Geschlossener Regelkreis: Istwert wird ständig mit Sollwert verglichen | Offene Wirkungskette | Keine Messung | Nur Ein- und Ausschalten per Hand || Die Regelung reagiert auf Abweichungen, auch durch Störungen.
Q Wie heißt der gewünschte Wert in einem Regelkreis? | Sollwert (Führungsgröße w) | Istwert (Regelgröße x) | Stellgröße y | Störgröße z || w = Sollwert.
Q Wie heißt der tatsächlich gemessene Wert in einem Regelkreis? | Istwert (Regelgröße x) | Sollwert (Führungsgröße w) | Stellgröße y | Regeldifferenz e || x = Istwert.
Q Wie wird die Regeldifferenz e berechnet? | e = w − x | e = x − w | e = w + x | e = y · z || Sollwert minus Istwert.
Q Sollwert 21 °C, Istwert 18 °C. Wie groß ist die Regeldifferenz? | 3 K | −3 K | 39 K | 18 K || e = w − x = 21 °C − 18 °C = 3 K. Der Regler muss heizen.
Q Ein Fenster wird geöffnet und der Raum kühlt ab. Welche Größe ist das im Regelkreis? | Störgröße z | Sollwert w | Stellgröße y | Führungsgröße || Störgrößen wirken von außen auf die Regelgröße.
Q Welches Beispiel ist eine Regelung? | Raumthermostat, das die Heizung nach gemessener Temperatur schaltet | Zeitschaltuhr für die Außenbeleuchtung | Treppenlichtzeitschalter | Klingeltaster || Nur das Thermostat misst den Istwert und vergleicht ihn mit dem Sollwert.
Q Welches Beispiel ist eine Steuerung? | Zeitschaltuhr, die die Heizung 2 Stunden einschaltet | Raumthermostat | Tempomat im Auto | Füllstandregelung mit Messung || Die Zeitschaltuhr prüft nicht, ob es warm genug ist.
Q Was ist ein Zweipunktregler? | Ein Regler, der nur zwischen Ein und Aus schaltet | Ein Regler mit zwei Sollwerten | Ein Regler mit zwei Motoren | Eine Steuerung ohne Rückmeldung || Typisch: Bimetallthermostat im Bügeleisen.
Q Wozu dient die Hysterese bei einem Zweipunktregler? | Sie verhindert ständiges Hin- und Herschalten um den Sollwert | Sie erhöht den Sollwert | Sie misst den Istwert | Sie schützt vor Kurzschluss || Ein- und Ausschaltpunkt liegen etwas auseinander.

@ schuetz | Schützschaltungen
= ## Aufbau
= - **Hauptstromkreis** (Laststromkreis): versorgt den Verbraucher, z. B. Motor über die Hauptkontakte (1-2, 3-4, 5-6).
= - **Steuerstromkreis:** Taster, Hilfskontakte und Schützspule.
= - Spulenanschlüsse: **A1 und A2**. Hilfskontakte: **Schließer z. B. 13-14**, **Öffner z. B. 21-22**.
= ## Selbsthaltung
= Ein **Schließer des Schützes** wird **parallel zum Ein-Taster** geschaltet. Nach dem Loslassen bleibt das Schütz angezogen. Der **Aus-Taster (Öffner)** liegt **in Reihe** und unterbricht die Selbsthaltung.
= ## Verriegelung
= Bei der **Wendeschaltung** (Rechts-/Linkslauf) darf nie beides gleichzeitig an sein (Kurzschluss!). Deshalb liegt ein **Öffner des jeweils anderen Schützes** in Reihe vor der Spule: **Schützverriegelung**. Zusätzlich oft **Tasterverriegelung**.
= ## Motorschutz
= Ein **Motorschutzrelais** oder Motorschutzschalter schützt den Motor vor **Überlast** (thermisch).
Q Welche Anschlüsse hat die Spule eines Schützes? | A1 und A2 | 13 und 14 | L und N | 1 und 2 || A1/A2 = Spule. Hauptkontakte 1–6, Hilfskontakte zweistellig.
Q Woran erkennt man einen Hilfsschließer an der Kontaktbezeichnung? | Die zweite Ziffer ist 3 und 4 (z. B. 13–14) | Die zweite Ziffer ist 1 und 2 (z. B. 21–22) | Er heißt A1–A2 | Er hat keine Nummer || Endziffern 3–4 = Schließer, 1–2 = Öffner.
Q Woran erkennt man einen Hilfsöffner? | Endziffern 1 und 2 (z. B. 21–22) | Endziffern 3 und 4 | Endziffern 5 und 6 | Er heißt A1–A2 || Funktionsziffer 1–2 = Öffner.
Q Wie wird eine Selbsthaltung aufgebaut? | Ein Schließer des Schützes wird parallel zum Ein-Taster geschaltet | Ein Öffner des Schützes in Reihe zum Ein-Taster | Der Aus-Taster wird parallel geschaltet | Zwei Spulen in Reihe || So bleibt das Schütz nach dem Loslassen des Ein-Tasters angezogen.
Q Wie ist der Aus-Taster in einer Selbsthaltung geschaltet? | Als Öffner in Reihe zur Spule | Als Schließer parallel zum Ein-Taster | Als Schließer in Reihe | Gar nicht || Wird er gedrückt, wird der Steuerstromkreis unterbrochen und die Selbsthaltung fällt ab.
Q Warum braucht eine Wendeschützschaltung eine Verriegelung? | Damit nie beide Schütze gleichzeitig anziehen, das wäre ein Kurzschluss | Damit der Motor schneller dreht | Damit der Motor leiser ist | Damit man Strom spart || Beim Wenden werden zwei Außenleiter vertauscht. Beide Schütze gleichzeitig = Kurzschluss zwischen Außenleitern.
Q Wie wird eine Schützverriegelung realisiert? | Ein Öffner des einen Schützes liegt in Reihe vor der Spule des anderen | Ein Schließer parallel zum Aus-Taster | Zwei Spulen parallel | Mit einem RCD || Ist K1 angezogen, ist sein Öffner offen und K2 kann nicht anziehen.
Q Wie dreht man die Drehrichtung eines Drehstrommotors um? | Zwei Außenleiter vertauschen | N und PE vertauschen | Die Spannung halbieren | Alle drei Außenleiter vertauschen || Das ist die Aufgabe der Wendeschützschaltung.
Q Wovor schützt ein Motorschutzrelais? | Vor Überlast des Motors | Vor Blitzschlag | Vor zu niedriger Frequenz | Vor Fehlerstrom über den Menschen || Es löst thermisch bei zu großem Motorstrom aus.
Q Was liegt im Hauptstromkreis einer Motorsteuerung? | Die Hauptkontakte des Schützes und der Motor | Die Taster | Die Schützspule | Die Hilfskontakte für die Selbsthaltung || Der Steuerstromkreis schaltet die Spule, der Hauptstromkreis den Motor.

@ sps | SPS (speicherprogrammierbare Steuerung)
= ## VPS oder SPS
= - **VPS** (verbindungsprogrammiert): Funktion steckt in der **Verdrahtung** (Schütze, Relais). Änderung = umverdrahten.
= - **SPS** (speicherprogrammiert): Funktion steckt im **Programm**. Änderung = Programm ändern. Kompakt, flexibel, mit Diagnose.
= ## Zyklus
= **Eingänge lesen (Prozessabbild der Eingänge)** → **Programm abarbeiten** → **Ausgänge schreiben (Prozessabbild der Ausgänge)** → wieder von vorn. Zeit für einen Durchlauf = **Zykluszeit**.
= ## Programmiersprachen (IEC 61131-3)
= **KOP** (Kontaktplan), **FUP** (Funktionsplan), **ST** (Strukturierter Text), **AS** (Ablaufsprache), früher auch **AWL** (Anweisungsliste).
= ## Wichtige Funktionen
= - **Speicher:** **SR = setzdominant**, **RS = rücksetzdominant** (der zweite Buchstabe gewinnt, wenn beide Eingänge 1 sind).
= - **Zeitglieder:** **TON** = Einschaltverzögerung, **TOF** = Ausschaltverzögerung, **TP** = Impuls.
= - **Zähler:** CTU (vorwärts), CTD (rückwärts).
Q Was ist der Hauptvorteil einer SPS gegenüber einer verbindungsprogrammierten Steuerung? | Änderungen erfolgen per Programm statt durch Umverdrahten | Sie braucht keinen Strom | Sie braucht keine Sensoren | Sie ist immer billiger || Die Logik steckt in der Software.
Q In welcher Reihenfolge arbeitet eine SPS ihren Zyklus ab? | Eingänge lesen, Programm bearbeiten, Ausgänge schreiben | Ausgänge schreiben, Eingänge lesen, Programm | Programm, Eingänge, Ausgänge | Nur das Programm || Die Eingänge werden am Zyklusanfang ins Prozessabbild übernommen.
Q Welche Programmiersprache ist an den Stromlaufplan angelehnt? | KOP (Kontaktplan) | ST (Strukturierter Text) | FUP | AS || KOP sieht aus wie ein um 90° gedrehter Stromlaufplan mit Kontakten und Spulen.
Q Welche Programmiersprache verwendet Logikbausteine wie & und ≥1? | FUP (Funktionsplan) | KOP | ST | AWL || FUP zeigt Funktionsblöcke.
Q Welche Norm beschreibt die SPS-Programmiersprachen? | IEC 61131-3 | DIN VDE 0100-410 | DIN 18015-3 | DIN EN 54 || IEC 61131-3 definiert KOP, FUP, ST, AS (und früher AWL).
Q Was macht ein TON-Zeitglied? | Einschaltverzögerung: Der Ausgang wird erst nach Ablauf der Zeit 1 | Ausschaltverzögerung | Es zählt Impulse | Es speichert dauerhaft || TON = Timer On-Delay.
Q Was macht ein TOF-Zeitglied? | Ausschaltverzögerung: Der Ausgang bleibt nach dem Abschalten des Eingangs noch für die eingestellte Zeit 1 | Einschaltverzögerung | Es zählt rückwärts | Es invertiert das Signal || TOF = Timer Off-Delay, z. B. Nachlauf eines Lüfters.
Q Was bedeutet setzdominant bei einem Speicherglied? | Sind Setzen und Rücksetzen gleichzeitig 1, ist der Ausgang 1 | Rücksetzen gewinnt immer | Der Speicher kann nicht gesetzt werden | Der Speicher verliert seinen Zustand || SR-Glied = setzdominant, RS-Glied = rücksetzdominant.
Q Was ist die Zykluszeit einer SPS? | Die Zeit für einen kompletten Durchlauf aus Eingänge lesen, Programm bearbeiten, Ausgänge schreiben | Die Einschaltdauer der SPS | Die Lebensdauer der Batterie | Die Zeit eines Timers || Typisch einige Millisekunden.
`);
