/* Lernfeld 13: Komplexe Informationssysteme ändern und instand halten */
LT.lf(13, `
@ instandhaltung | Instandhaltung
= ## Grundmaßnahmen nach DIN 31051
= - **Wartung:** Abnutzung verzögern (reinigen, schmieren, Akkus tauschen).
= - **Inspektion:** Ist-Zustand feststellen und beurteilen (prüfen, messen).
= - **Instandsetzung:** Soll-Zustand wiederherstellen (reparieren, tauschen).
= - **Verbesserung:** Zuverlässigkeit oder Funktion erhöhen, ohne die Funktion grundsätzlich zu ändern.
= ## Strategien
= - **Ausfallbedingt (reaktiv):** reparieren, wenn etwas kaputt ist. **Vorbeugend (präventiv):** nach festen Intervallen. **Zustandsorientiert:** nach Messwerten und Zustand (z. B. Akkuspannung, Fehlerspeicher).
= ## Nach Änderungen
= Geänderte Anlagen werden **geprüft** (z. B. nach DIN VDE 0100-600 bzw. 0105-100) und **dokumentiert**. Der Kunde wird **eingewiesen**.
Q Welche vier Grundmaßnahmen der Instandhaltung nennt DIN 31051? | Wartung, Inspektion, Instandsetzung, Verbesserung | Planung, Bau, Abnahme, Rechnung | Messen, Prüfen, Reparieren, Entsorgen | Kaufen, Einbauen, Nutzen, Verschrotten || Merke: WIIV.
Q Was ist eine Inspektion? | Feststellen und Beurteilen des Ist-Zustands | Reparatur eines Defekts | Austausch aller Teile | Eine Erweiterung der Anlage || Zum Beispiel prüfen und messen.
Q Was ist eine Instandsetzung? | Wiederherstellen des Soll-Zustands, also Reparatur | Reinigung | Nur die Sichtprüfung | Eine neue Anlage planen || Defekte Teile werden ersetzt oder repariert.
Q Was beschreibt die zustandsorientierte Instandhaltung? | Maßnahmen nach gemessenem Zustand, z. B. Akkuwerte oder Fehlerspeicher | Erst reparieren, wenn etwas kaputt ist | Immer nach festem Kalender | Gar keine Instandhaltung || Spart unnötige Arbeiten und verhindert Ausfälle.
Q Was gehört nach einer Änderung an einer Anlage unbedingt dazu? | Prüfung, Dokumentation und Einweisung des Kunden | Nur die Rechnung | Nichts, wenn es funktioniert | Ein neues Gehäuse || Sonst ist nicht nachweisbar, dass die Anlage sicher ist.

@ fehler | Systematische Fehlersuche und Fernwartung
= ## Vorgehen
= - Symptome erfassen (Kunde befragen, **Fehlerspeicher/Logdateien** lesen), Unterlagen sichten.
= - **Hypothese** bilden und gezielt prüfen. **Halbierungsmethode:** System in der Mitte prüfen und so den Fehler eingrenzen.
= - Ein Schritt nach dem anderen ändern, Ergebnisse dokumentieren.
= ## Fern­diagnose und Fernwartung
= - Zugriff nur mit **Zustimmung des Kunden**, über **verschlüsselte Verbindungen (VPN)**, mit **eigenen Zugangsdaten** und **Protokollierung**.
= - Vorteile: schneller, keine Anfahrt. Nicht alles geht aus der Ferne (z. B. Hardwaretausch, Sicherheitsprüfungen vor Ort).
Q Was ist die Halbierungsmethode bei der Fehlersuche? | Das System in der Mitte prüfen und so den fehlerhaften Teil schrittweise eingrenzen | Die Hälfte der Teile tauschen | Nur jede zweite Klemme prüfen | Den Preis halbieren || So findet man auch in langen Signalketten schnell den Fehler.
Q Was sollte man bei der Fehlersuche vermeiden? | Mehrere Dinge gleichzeitig zu ändern | Den Kunden zu befragen | Die Unterlagen zu lesen | Ergebnisse aufzuschreiben || Sonst weiß man nicht, welche Änderung gewirkt hat.
Q Was ist Voraussetzung für eine Fernwartung beim Kunden? | Zustimmung des Kunden und eine verschlüsselte, protokollierte Verbindung | Ein offener Port ohne Passwort | Das Passwort des Kunden per E-Mail | Nichts || Datenschutz und IT-Sicherheit müssen gewahrt bleiben.
Q Welche Informationsquelle hilft bei Störungen in IT-Systemen besonders? | Fehlerspeicher und Logdateien | Die Farbe des Gehäuses | Die Rechnung | Das Typenschild allein || Sie zeigen, was wann passiert ist.

@ recht | Haftung, Gewährleistung, Dokumentation
= - **Gewährleistung:** gesetzlicher Anspruch bei Mängeln. Beim Verbrauchsgüterkauf **2 Jahre**. Bei Bauleistungen am Gebäude länger.
= - **Garantie:** freiwilliges Versprechen des Herstellers oder Verkäufers.
= - **Produkthaftung (ProdHaftG):** Der Hersteller haftet für Schäden durch fehlerhafte Produkte. Wer Anlagen verändert, kann selbst zum Hersteller werden. Deshalb Änderungen genau dokumentieren.
= - **Dokumentation:** Schaltpläne aktualisieren, Änderungen, Messwerte und Prüfprotokolle festhalten.
Q Was ist der Unterschied zwischen Gewährleistung und Garantie? | Gewährleistung ist gesetzlich, Garantie ist freiwillig | Es gibt keinen Unterschied | Garantie ist gesetzlich vorgeschrieben | Gewährleistung gibt es nur bei Autos || Gewährleistung beim Verbrauchsgüterkauf: 2 Jahre.
Q Wie lange beträgt die gesetzliche Gewährleistung beim Kauf neuer Waren durch Verbraucher? | 2 Jahre | 6 Monate | 10 Jahre | 30 Tage || Für Bauleistungen gelten längere Fristen.
Q Wofür haftet ein Hersteller nach dem Produkthaftungsgesetz? | Für Schäden, die durch fehlerhafte Produkte entstehen | Für jeden Preisanstieg | Nur für Verpackungen | Für nichts || Wer Geräte wesentlich verändert, kann selbst als Hersteller gelten.
Q Warum müssen Änderungen an Anlagen dokumentiert werden? | Damit später nachvollziehbar ist, was geändert wurde, und für Haftung und Prüfung | Weil Papier billig ist | Das ist nicht nötig | Nur für die Werbung || Aktuelle Pläne sind die Grundlage für jede spätere Arbeit.
`);
