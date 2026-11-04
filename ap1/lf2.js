/* Lernfeld 2: Elektrische Systeme planen und installieren */
LT.lf(2, `
@ netzsysteme | Netzsysteme (TN, TT, IT)
= ## Bedeutung der Buchstaben
= - **1. Buchstabe** (Erdung der Stromquelle): **T** = direkt geerdet (franz. terre), **I** = isoliert oder hochohmig geerdet
= - **2. Buchstabe** (Erdung der Körper/Gehäuse): **T** = eigener Erder, **N** = mit dem geerdeten Punkt des Netzes verbunden
= - **Weitere Buchstaben:** **C** = N und PE kombiniert als **PEN**, **S** = N und PE getrennt
= ## Die Systeme
= - **TN-C:** PEN-Leiter im ganzen Netz.
= - **TN-S:** N und PE im ganzen Netz getrennt.
= - **TN-C-S:** Zuerst PEN, ab dem Aufteilungspunkt (meist Hausanschluss/Verteiler) getrennt. Danach dürfen N und PE **nie wieder verbunden** werden.
= - **TT:** Gehäuse über einen **eigenen Anlagenerder** geerdet, meist mit RCD.
= - **IT:** Quelle isoliert. Beim **ersten Fehler** keine Abschaltung, **Isolationsüberwachung** meldet ihn (z. B. OP-Säle).
= ## PEN-Leiter
= Grün-gelb mit blauer Markierung an den Enden, mindestens **10 mm² Cu**.
Q Wofür steht der erste Buchstabe bei der Bezeichnung eines Netzsystems? | Für die Erdungsverhältnisse der Stromquelle | Für die Erdung der Gehäuse | Für die Spannungshöhe | Für den Leiterquerschnitt || T = Quelle direkt geerdet, I = isoliert.
Q Wofür steht der zweite Buchstabe bei der Bezeichnung eines Netzsystems? | Für die Erdung der Körper (Gehäuse) der Betriebsmittel | Für die Erdung der Stromquelle | Für die Anzahl der Außenleiter | Für die Frequenz || T = eigener Erder, N = Verbindung mit dem Netz-Erdungspunkt über den Schutzleiter.
Q Was bedeutet der Buchstabe C im TN-C-System? | N und PE sind in einem Leiter kombiniert (PEN) | N und PE sind getrennt | Es gibt keinen Schutzleiter | Das Netz ist isoliert || C = combined.
Q Was gilt im TN-C-S-System nach dem Aufteilungspunkt? | N und PE dürfen nie wieder miteinander verbunden werden | N und PE müssen in jeder Dose verbunden werden | Der PE darf entfallen | Der N wird grün-gelb || Sonst würde Betriebsstrom über den PE fließen und ein RCD auslösen.
Q Welches Netzsystem ist in deutschen Wohngebäuden am häufigsten? | TN-C-S | IT | TN-C bis in jede Steckdose | Reines Gleichstromnetz || Der Netzbetreiber liefert meist PEN, im Haus wird in N und PE aufgeteilt.
Q Wodurch sind im TT-System die Gehäuse der Betriebsmittel geerdet? | Über einen eigenen Anlagenerder | Über den PEN-Leiter des Netzes | Gar nicht | Über den Neutralleiter || TT: Quelle und Anlage haben jeweils ihre eigene Erdung.
Q Was ist eine Besonderheit des IT-Systems? | Beim ersten Isolationsfehler wird nicht abgeschaltet, eine Isolationsüberwachung meldet den Fehler | Es hat keinen Außenleiter | Jeder Fehler schaltet sofort ab | Es wird nur in Wohnungen verwendet || Wichtig, wo die Versorgung nicht unterbrochen werden darf, zum Beispiel im OP.
Q Wie ist ein PEN-Leiter gekennzeichnet? | Grün-gelb mit blauer Markierung an den Enden | Nur blau | Braun mit grüner Markierung | Schwarz || Er übernimmt PE-Funktion (grün-gelb) und N-Funktion (blau).
Q Welchen Mindestquerschnitt hat ein PEN-Leiter aus Kupfer? | 10 mm² | 1,5 mm² | 2,5 mm² | 4 mm² || Ein PEN-Leiter muss bei Kupfer mindestens 10 mm² haben.

@ schutzmassnahmen | Schutz gegen elektrischen Schlag
= ## Drei Schutzebenen (DIN VDE 0100-410)
= - **Basisschutz** (Schutz gegen direktes Berühren): Isolierung, Abdeckungen, Gehäuse.
= - **Fehlerschutz** (Schutz bei indirektem Berühren): z. B. automatische Abschaltung, Schutzpotentialausgleich.
= - **Zusätzlicher Schutz:** **RCD mit ≤ 30 mA**, zusätzlicher Schutzpotentialausgleich.
= ## Schutzmaßnahmen
= - **Automatische Abschaltung der Stromversorgung** (häufigste Maßnahme)
= - **Doppelte oder verstärkte Isolierung** (Schutzklasse II)
= - **Schutztrennung** (Trenntransformator, ein Verbraucher)
= - **Schutzkleinspannung SELV / PELV** (max. 50 V AC bzw. 120 V DC)
= ## Abschaltzeiten bei 230 V in Endstromkreisen bis 32 A
= - **TN-System: 0,4 s** · **TT-System: 0,2 s**
= ## RCD (Fehlerstrom-Schutzeinrichtung)
= - Vergleicht hin- und zurückfließenden Strom (Summenstromwandler). Fließt ein Teil über PE oder einen Menschen ab, schaltet er ab.
= - Pflicht als zusätzlicher Schutz u. a. für **Steckdosen bis 32 A** und in Wohnungen auch für **Beleuchtungsstromkreise**.
= - Prüftaste regelmäßig drücken.
= ## Schutzpotentialausgleich
= An der **Haupterdungsschiene** werden verbunden: Erder (z. B. Fundamenterder), Schutzleiter, metallene Rohre (Wasser, Gas, Heizung) und Gebäudeteile.
Q Was gehört zum Basisschutz? | Isolierung der aktiven Teile, Abdeckungen und Gehäuse | Automatische Abschaltung | RCD 30 mA | Schutzpotentialausgleich || Basisschutz verhindert, dass aktive Teile im normalen Betrieb berührt werden können.
Q Was ist die Aufgabe des Fehlerschutzes? | Schutz, wenn im Fehlerfall ein Gehäuse Spannung annimmt | Schutz vor dem Berühren aktiver Teile im Normalbetrieb | Schutz vor Überlast | Schutz vor Blitzschlag || Zum Beispiel durch automatisches Abschalten bei Körperschluss.
Q Welcher Bemessungsdifferenzstrom ist für den zusätzlichen Schutz vorgeschrieben? | Höchstens 30 mA | 300 mA | 10 A | 0,5 A || Ein RCD mit IΔn ≤ 30 mA schützt auch bei direktem Berühren.
Q Wie funktioniert ein RCD? | Er vergleicht den hin- und zurückfließenden Strom und schaltet bei einer Differenz ab | Er misst die Temperatur der Leitung | Er schaltet bei Überspannung ab | Er misst den Widerstand des PE || Bei Fehlerstrom über PE oder einen Menschen fehlt Strom auf dem Rückweg.
Q Schützt ein RCD vor Überlast einer Leitung? | Nein, dafür sind LS-Schalter oder Sicherungen da | Ja, immer | Nur bei 30 mA | Nur bei Gleichstrom || Ein reiner RCD reagiert nur auf Differenzstrom. Ein RCBO (FI/LS) kann beides.
Q Wie lang darf die Abschaltzeit in TN-Systemen (230 V, Endstromkreise bis 32 A) höchstens sein? | 0,4 s | 5 s | 0,04 s | 2 s || TN: 0,4 s, TT: 0,2 s.
Q Welche Abschaltzeit gilt in TT-Systemen (230 V, Endstromkreise bis 32 A)? | 0,2 s | 0,4 s | 1 s | 5 s || Im TT-System ist sie kürzer: 0,2 s.
Q Was ist SELV? | Schutzkleinspannung ohne Verbindung zur Erde, max. 50 V AC bzw. 120 V DC | Eine Schutzmaßnahme mit RCD | Ein isoliertes 400-V-Netz | Schutzklasse I || SELV wird zum Beispiel über einen Sicherheitstransformator erzeugt.
Q Was ist der Unterschied zwischen SELV und PELV? | PELV ist geerdet, SELV nicht | SELV ist geerdet, PELV nicht | PELV hat 230 V | Es gibt keinen Unterschied || Beide sind Kleinspannung, PELV-Stromkreise dürfen geerdet sein.
Q Wofür ist ein RCD als zusätzlicher Schutz u. a. Pflicht? | Für Steckdosenstromkreise bis 32 A | Nur für den Herd | Nur für Außenbeleuchtung | Für Telefonleitungen || In Wohnungen zusätzlich auch für Beleuchtungsstromkreise.
Q Was wird am Schutzpotentialausgleich (Haupterdungsschiene) verbunden? | Erder, Schutzleiter und metallene Rohrleitungen wie Wasser, Gas und Heizung | Nur die Außenleiter | Nur der Neutralleiter | Die Telefonleitung und der Router || So entstehen keine gefährlichen Spannungsunterschiede zwischen leitfähigen Teilen.
Q Wie oft sollte man die Prüftaste eines RCD betätigen? | Regelmäßig, nach Herstellerangabe (z. B. halbjährlich) | Nie | Nur nach einem Gewitter | Jede Stunde || So bleibt die Mechanik gängig und die Funktion wird kontrolliert.
Q Was ist Schutztrennung? | Ein Verbraucher wird über einen Trenntransformator galvanisch vom Netz getrennt versorgt | Der Neutralleiter wird abgeschaltet | Zwei RCDs werden in Reihe geschaltet | Die Leitung wird doppelt isoliert || Ohne Verbindung zur Erde kann beim Berühren eines Leiters kein Strom über den Körper zur Erde fließen.

@ ueberstrom | Überstromschutz und Leitungsdimensionierung
= ## Leitungsschutzschalter (LS)
= - **Thermische Auslösung** (Bimetall): bei **Überlast**, zeitverzögert.
= - **Elektromagnetische Auslösung** (Spule): bei **Kurzschluss**, sofort.
= - Auslösecharakteristik (magnetisch): **B: 3–5 · In**, **C: 5–10 · In**, **D: 10–20 · In**. In Wohnungen meist **B**.
= - Beispiel B16: Bemessungsstrom 16 A, Charakteristik B.
= ## Schmelzsicherungen
= - Bauarten: **D (Diazed)**, **D0 (Neozed)**, **NH** (Niederspannungs-Hochleistung). Betriebsklasse **gG** = Ganzbereichsschutz für Kabel und Leitungen.
= ## Leitungsdimensionierung
= - Bedingung: **Ib ≤ In ≤ Iz** (Betriebsstrom ≤ Bemessungsstrom der Schutzeinrichtung ≤ zulässige Strombelastbarkeit der Leitung).
= - Iz hängt von **Querschnitt, Verlegeart, Häufung und Umgebungstemperatur** ab.
= - **Spannungsfall** bei Wechselstrom: **ΔU = 2 · l · I · cos φ / (κ · A)**. Empfehlung im Wohnbau (DIN 18015-1): höchstens **3 %** vom Zähler bis zum Verbraucher.
= - Typisch im Wohnbereich: **1,5 mm² mit B16** (abhängig von Verlegeart), 2,5 mm² z. B. für Waschmaschine.
Q Wodurch löst ein LS-Schalter bei Überlast aus? | Durch den thermischen Auslöser (Bimetall) | Durch den magnetischen Auslöser | Durch einen Summenstromwandler | Durch einen Zeitschalter || Überlast erwärmt das Bimetall, das löst zeitverzögert aus.
Q Wodurch löst ein LS-Schalter bei Kurzschluss aus? | Durch den elektromagnetischen Auslöser, nahezu sofort | Durch das Bimetall nach einigen Minuten | Durch den Prüfknopf | Gar nicht || Der hohe Kurzschlussstrom zieht über die Spule den Auslösemechanismus sofort an.
Q In welchem Bereich löst ein LS mit Charakteristik B magnetisch aus? | Beim 3- bis 5-fachen Bemessungsstrom | Beim 5- bis 10-fachen | Beim 10- bis 20-fachen | Beim 1,1-fachen || B: 3–5 · In, C: 5–10 · In, D: 10–20 · In.
Q Wofür eignet sich eher die Charakteristik C? | Für Verbraucher mit hohen Einschaltströmen, z. B. Motoren | Für reine Beleuchtung in der Wohnung | Für Telefonanlagen | Für Kleinspannung || C löst magnetisch erst bei 5–10 · In aus und verträgt Einschaltstromspitzen besser.
Q Was bedeutet die Aufschrift B16 auf einem LS-Schalter? | Charakteristik B, Bemessungsstrom 16 A | 16 Pole, Typ B | Auslösung nach 16 s | 16 mA Fehlerstrom || Buchstabe = Charakteristik, Zahl = Bemessungsstrom In.
Q Welche Bedingung gilt für die Auswahl der Schutzeinrichtung einer Leitung? | Ib ≤ In ≤ Iz | Iz ≤ In ≤ Ib | In ≤ Ib ≤ Iz | In = Iz = Ib immer || Betriebsstrom ≤ Bemessungsstrom der Sicherung ≤ Belastbarkeit der Leitung.
Q Wovon hängt die zulässige Strombelastbarkeit Iz einer Leitung ab? | Querschnitt, Verlegeart, Häufung und Umgebungstemperatur | Nur von der Leitungsfarbe | Nur von der Spannung | Nur vom Hersteller des LS || Leitungen, die schlecht Wärme abgeben (Häufung, Dämmung), dürfen weniger Strom führen.
Q Was bedeutet gG bei einer Schmelzsicherung? | Ganzbereichsschutz für Kabel und Leitungen | Nur Kurzschlussschutz für Motoren | Geeignet für Gleichstrom | Glasgehäuse || g = Ganzbereich, G = Kabel und Leitungen (general).
Q Wie heißt die Schmelzsicherung mit dem kleineren Sockel, die in Verteilern häufig verwendet wird? | D0 (Neozed) | NH | Diazed D | Feinsicherung || Neozed (D0) ist kleiner als Diazed (D). NH-Sicherungen sind für große Ströme.
Q Wie viel Spannungsfall wird in Wohngebäuden nach DIN 18015-1 vom Zähler bis zum Verbraucher höchstens empfohlen? | 3 % | 10 % | 0,3 % | 25 % || Bei 230 V sind das 6,9 V.
Q Wechselstrom: l = 20 m, I = 10 A, cos φ = 1, Kupfer κ = 56, A = 1,5 mm². Wie groß ist der Spannungsfall? | ≈ 4,8 V | ≈ 2,4 V | ≈ 9,5 V | ≈ 0,5 V || ΔU = 2 · 20 · 10 · 1 / (56 · 1,5) = 400 / 84 ≈ 4,76 V.
Q Gleiche Leitung (ΔU ≈ 4,8 V bei 230 V). Wie viel Prozent sind das? | ≈ 2,1 % | ≈ 4,8 % | ≈ 0,5 % | ≈ 21 % || 4,8 V / 230 V · 100 % ≈ 2,1 %. Das liegt unter 3 %.
Q Warum steht in der Spannungsfallformel für Wechselstrom der Faktor 2? | Weil Hin- und Rückleiter berücksichtigt werden | Weil es zwei Phasen gibt | Weil der Strom doppelt so groß ist | Als Sicherheitszuschlag || Der Strom fließt über L hin und über N zurück.

@ installation | Installationsschaltungen
= ## Lichtschaltungen
= - **Ausschaltung:** eine Leuchte von **einer Stelle**.
= - **Serienschaltung:** zwei Leuchten(-gruppen) **getrennt** von einer Stelle (Serienschalter, z. B. Kronleuchter).
= - **Wechselschaltung:** eine Leuchte von **zwei Stellen** (2 Wechselschalter, 2 korrespondierende Adern).
= - **Kreuzschaltung:** von **drei oder mehr Stellen**: 2 Wechselschalter + beliebig viele Kreuzschalter dazwischen.
= - **Stromstoßschaltung:** beliebig viele **Taster** steuern einen **Stromstoßschalter** (Fernschalter). Jeder Impuls schaltet um.
= - **Treppenlichtzeitschaltung:** Taster starten einen **Treppenlichtzeitschalter**, Licht geht nach eingestellter Zeit aus.
= ## Wichtige Regel
= Der Schalter unterbricht immer den **Außenleiter L**, nie den N.
= ## Leitungen
= - **NYM-J 3x1,5:** Mantelleitung, J = mit grün-gelber Ader, 3 Adern, 1,5 mm². **O** = ohne grün-gelb.
= - **H07V-U:** Aderleitung, 450/750 V, PVC, **U = eindrähtig**, **R = mehrdrähtig**, **K = feindrähtig**.
= - **H05VV-F:** PVC-Schlauchleitung, flexibel (für Geräte).
= - **NYY:** Kabel, auch für Erdverlegung.
= ## Installationszonen (DIN 18015-3)
= - Waagerecht: **15–45 cm unter der Decke**, **15–45 cm über dem Fußboden**, und **90–130 cm** (mittlere Zone, z. B. in Küchen über Arbeitsflächen).
= - Senkrecht: **10–30 cm neben Türen, Fenstern und Raumecken**.
= - Leitungen nur senkrecht oder waagerecht in den Zonen verlegen, nie schräg.
Q Welche Schaltung brauchst du, um eine Leuchte von zwei Stellen aus zu schalten? | Wechselschaltung | Ausschaltung | Serienschaltung | Kreuzschaltung mit nur einem Schalter || Zwei Wechselschalter, verbunden durch zwei korrespondierende Adern.
Q Welche Schaltung brauchst du, um eine Leuchte von drei Stellen aus zu schalten? | Kreuzschaltung (2 Wechselschalter + 1 Kreuzschalter) | Wechselschaltung | Serienschaltung | Ausschaltung || Zwischen die beiden Wechselschalter kommen beliebig viele Kreuzschalter.
Q Wie viele Kreuzschalter brauchst du für 5 Schaltstellen? | 3 | 5 | 2 | 4 || 2 Wechselschalter + 3 Kreuzschalter = 5 Schaltstellen.
Q Was macht eine Serienschaltung? | Zwei Leuchten oder Leuchtengruppen getrennt von einer Stelle schalten | Eine Leuchte von zwei Stellen schalten | Zwei Lampen in Reihe schalten | Eine Leuchte zeitgesteuert schalten || Der Serienschalter hat zwei Wippen, z. B. für einen Kronleuchter mit zwei Gruppen.
Q Wie wird bei einer Stromstoßschaltung geschaltet? | Taster geben Impulse auf einen Stromstoßschalter, jeder Impuls schaltet um | Mit Wechselschaltern | Das Licht geht nach Zeit aus | Mit Kreuzschaltern || Vorteil: beliebig viele Schaltstellen mit einfachen Tastern parallel.
Q Was ist der Unterschied zwischen Stromstoßschaltung und Treppenlichtzeitschaltung? | Beim Treppenlicht geht das Licht nach einer eingestellten Zeit automatisch aus | Es gibt keinen Unterschied | Stromstoßschaltung braucht Wechselschalter | Treppenlicht braucht keine Taster || Treppenlichtzeitschalter schaltet nach Ablauf der Zeit selbst aus.
Q Welchen Leiter muss ein Lichtschalter unterbrechen? | Den Außenleiter L | Den Neutralleiter N | Den Schutzleiter PE | L und PE || Sonst liegt an der ausgeschalteten Leuchte noch Spannung an.
Q Was bedeutet das J in NYM-J? | Die Leitung hat eine grün-gelbe Ader | Die Leitung ist für Japan | Die Leitung ist flexibel | Die Leitung ist halogenfrei || J = mit grün-gelber Schutzleiterader, O = ohne.
Q Was bedeutet NYM-J 5x2,5? | Mantelleitung mit 5 Adern zu je 2,5 mm², eine davon grün-gelb | 2,5 Adern mit 5 mm² | 5 m lang, 2,5 kg schwer | Erdkabel mit 5 kV || Typisch für Drehstrom: L1, L2, L3, N, PE.
Q Wofür steht das U bei H07V-U? | Eindrähtiger Leiter | Feindrähtiger Leiter | Mehrdrähtiger Leiter | Unterputz || U = eindrähtig, R = mehrdrähtig, K = feindrähtig.
Q Welche Leitung eignet sich für die direkte Verlegung im Erdreich? | NYY | NYM | H07V-U | H05VV-F || NYY ist ein Kabel und für Erde geeignet. NYM darf nicht in Erde verlegt werden.
Q In welchem Bereich liegt die obere waagerechte Installationszone nach DIN 18015-3? | 15–45 cm unter der Decke | 0–15 cm unter der Decke | 50–80 cm unter der Decke | Direkt an der Decke || Waagerecht oben: 15–45 cm unter der Deckenfläche.
Q Wo liegen die senkrechten Installationszonen nach DIN 18015-3? | 10–30 cm neben Türen, Fenstern und Raumecken | Genau in der Raummitte | 50 cm neben Türen | Beliebig || Wer später bohrt, weiß so, wo Leitungen liegen können.
Q Wie dürfen Leitungen in den Installationszonen verlegt werden? | Nur senkrecht oder waagerecht | Diagonal, um Material zu sparen | In Kurven | Beliebig || Schräg verlegte Leitungen sind beim Bohren nicht vorhersehbar und gefährlich.

@ auftrag | Auftrag, Kosten und Arbeitsschutz auf der Baustelle
= ## Ablauf eines Kundenauftrags
= - Auftrag analysieren → planen (Pläne, Material) → **Angebot** → Ausführung → **Prüfung und Inbetriebnahme** → **Übergabe und Einweisung** → **Aufmaß** → **Rechnung**.
= ## Kalkulation (vereinfacht)
= Materialkosten + Lohnkosten + Gemeinkosten + Gewinn (+ Wagnis) = Nettopreis. Dazu **19 % Umsatzsteuer** = Bruttopreis.
= ## Aufmaß
= Erfasst die **tatsächlich ausgeführten Mengen** (z. B. Meter Leitung, Anzahl Dosen) als Grundlage für die Rechnung.
= ## Gefahrstoffe und Brandschutz
= - **Asbest:** In älteren Gebäuden möglich (Platten, Kleber, Putz). Bei Verdacht nicht bohren, schleifen oder brechen. Arbeiten nur durch dafür zugelassene Fachbetriebe.
= - **Baulicher Brandschutz:** Leitungsdurchführungen durch Brandwände und -decken müssen wieder **verschlossen (abgeschottet)** werden, damit sich Feuer und Rauch nicht ausbreiten.
Q Wozu dient ein Aufmaß? | Es erfasst die tatsächlich ausgeführten Mengen als Grundlage für die Rechnung | Es ist das erste Angebot an den Kunden | Es ist ein Messprotokoll für den Isolationswiderstand | Es ist der Grundriss || Abgerechnet wird, was wirklich verbaut wurde.
Q Ein Angebot kostet netto 1000 €. Wie hoch ist der Bruttopreis bei 19 % Umsatzsteuer? | 1190 € | 1019 € | 1900 € | 810 € || 1000 € · 1,19 = 1190 €.
Q Was gehört zur Übergabe einer Anlage an den Kunden? | Funktion zeigen, in die Bedienung einweisen, Dokumentation übergeben | Nur die Rechnung | Nur der Schlüssel | Nichts, der Kunde liest selbst || Der Kunde muss die Anlage sicher bedienen können.
Q Du findest bei Arbeiten in einem Altbau eine Platte, die nach Asbest aussieht. Was tust du? | Arbeit stoppen, nicht bohren oder schleifen, Vorgesetzte informieren | Mit Mundschutz einfach weiterbohren | Die Platte abbrechen und entsorgen | Mit dem Staubsauger reinigen || Asbestfasern sind krebserregend. Arbeiten daran nur durch zugelassene Fachbetriebe.
Q Was muss nach einer Leitungsdurchführung durch eine Brandwand passieren? | Die Öffnung muss mit einer zugelassenen Abschottung verschlossen werden | Nichts | Die Öffnung bleibt für spätere Leitungen offen | Die Leitung wird grün-gelb markiert || Sonst können sich Feuer und Rauch durch die Öffnung ausbreiten.
`);
