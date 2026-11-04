/* Lernfeld 10: Informationstechnische Systeme programmieren */
LT.lf(10, `
@ grundlagen | Programmieren: Grundlagen
= ## Planen
= - **Programmablaufplan (PAP):** Oval = Start/Ende, Rechteck = Anweisung, **Raute = Verzweigung**, Parallelogramm = Ein-/Ausgabe.
= - **Struktogramm** (Nassi-Shneiderman): Blöcke statt Pfeile, Schleifen und Verzweigungen als verschachtelte Felder.
= ## Bausteine
= - **Variablen** mit **Datentypen**: int (ganze Zahl), float/double (Kommazahl), bool (wahr/falsch), char (Zeichen), string (Text).
= - **Verzweigung:** if / else. **Schleifen:** Zählschleife (for), kopfgesteuert (while: prüft vorher), fußgesteuert (do-while: läuft mindestens einmal).
= - **Array:** Liste gleichartiger Werte mit Index (meist ab 0). **Funktion:** wiederverwendbarer Programmteil mit Parametern und Rückgabewert.
= ## Übersetzen
= - **Compiler** übersetzt das ganze Programm vorab in Maschinencode (z. B. C, C++). **Interpreter** führt Zeile für Zeile aus (z. B. Python).
= - **Bibliotheken** liefern fertige Funktionen, **Schnittstellen (APIs)** verbinden Programme mit Hardware, Betriebssystem oder Datenbanken.
Q Welches Symbol steht im Programmablaufplan für eine Verzweigung? | Raute | Rechteck | Oval | Kreis || Rechteck = Anweisung, Oval = Start/Ende, Parallelogramm = Ein-/Ausgabe.
Q Welcher Datentyp speichert wahr oder falsch? | bool | int | float | string || Boolean nach George Boole.
Q Welcher Datentyp eignet sich für 3,75? | float bzw. double | int | bool | char || int speichert nur ganze Zahlen.
Q Was ist der Unterschied zwischen kopf- und fußgesteuerter Schleife? | Die fußgesteuerte läuft mindestens einmal, die kopfgesteuerte prüft vorher | Kein Unterschied | Die kopfgesteuerte läuft nie | Fußgesteuerte Schleifen gibt es nicht || while prüft vorher, do-while nachher.
Q Bei welchem Index beginnt ein Array in den meisten Programmiersprachen? | 0 | 1 | −1 | 10 || Ein Array mit 5 Werten hat die Indizes 0 bis 4.
Q Was macht ein Compiler? | Er übersetzt den Quelltext vorab komplett in Maschinencode | Er führt den Code Zeile für Zeile aus | Er speichert Daten in Tabellen | Er verschlüsselt das Programm || Ein Interpreter führt dagegen direkt Zeile für Zeile aus.
Q Was ist eine Funktion? | Ein wiederverwendbarer Programmteil mit Parametern und ggf. Rückgabewert | Eine Variable | Ein Kommentar | Ein Datentyp || Sie macht Programme übersichtlicher und vermeidet doppelten Code.
Q Was gibt dieses Programm aus: x = 3; wenn x > 2 dann ausgeben „groß“ sonst „klein“? | groß | klein | 3 | nichts || 3 ist größer als 2.
Q Wie oft läuft eine Zählschleife „für i von 1 bis 5“? | 5-mal | 4-mal | 6-mal | Unendlich || i = 1, 2, 3, 4, 5.

@ datenbanken | Relationale Datenbanken und SQL
= ## Begriffe
= - **Tabelle** (Relation) mit **Datensätzen** (Zeilen) und **Attributen** (Spalten).
= - **Primärschlüssel:** identifiziert jeden Datensatz eindeutig (z. B. Kundennummer). **Fremdschlüssel:** verweist auf den Primärschlüssel einer anderen Tabelle.
= ## ER-Modell (Entity-Relationship)
= Beziehungen **1:1**, **1:n** (ein Kunde, viele Aufträge), **n:m** (Aufträge und Artikel) → braucht eine **Zwischentabelle**.
= ## SQL
= - **SELECT** Spalten **FROM** Tabelle **WHERE** Bedingung **ORDER BY** Spalte;
= - **INSERT INTO** (neuer Datensatz), **UPDATE … SET** (ändern), **DELETE FROM** (löschen), **JOIN** (Tabellen verknüpfen).
= ## Normalisierung
= Daten so aufteilen, dass keine **Redundanz** (doppelte Speicherung) entsteht. So werden Widersprüche vermieden.
Q Was ist ein Primärschlüssel? | Ein Attribut, das jeden Datensatz eindeutig identifiziert | Das Passwort der Datenbank | Die erste Spalte jeder Tabelle, egal welche | Ein Verweis auf eine andere Tabelle || Zum Beispiel die Kundennummer.
Q Was ist ein Fremdschlüssel? | Ein Attribut, das auf den Primärschlüssel einer anderen Tabelle verweist | Ein Schlüssel von außen für den Serverraum | Ein doppelter Datensatz | Ein verschlüsseltes Passwort || So entstehen Beziehungen zwischen Tabellen.
Q Welche Beziehung besteht zwischen Kunde und Aufträgen, wenn ein Kunde viele Aufträge haben kann? | 1:n | 1:1 | n:m | 0:0 || Ein Kunde, viele Aufträge.
Q Was braucht man, um eine n:m-Beziehung in einer relationalen Datenbank abzubilden? | Eine Zwischentabelle | Nichts | Zwei Primärschlüssel in einer Spalte | Eine Excel-Datei || Die Zwischentabelle enthält die Fremdschlüssel beider Tabellen.
Q Welcher SQL-Befehl liest Daten aus? | SELECT | INSERT | DELETE | UPDATE || SELECT … FROM … WHERE …
Q Was bewirkt: SELECT name FROM kunden WHERE ort = 'Düsseldorf'; | Zeigt die Namen aller Kunden aus Düsseldorf | Löscht alle Kunden aus Düsseldorf | Fügt einen Kunden hinzu | Ändert den Ort aller Kunden || WHERE filtert die Datensätze.
Q Welcher SQL-Befehl ändert vorhandene Datensätze? | UPDATE | SELECT | INSERT | CREATE || UPDATE tabelle SET spalte = wert WHERE …
Q Wozu dient die Normalisierung? | Redundanz vermeiden und Widersprüche verhindern | Die Datenbank bunter machen | Daten verschlüsseln | Den Server schneller starten || Jede Information wird nur einmal gespeichert.
Q Wofür steht ein Datensatz in einer Tabelle? | Eine Zeile | Eine Spalte | Die ganze Tabelle | Der Tabellenname || Spalten heißen Attribute bzw. Felder.
`);
