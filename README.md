# Lernseiten Elektrotechnik

Lernseiten für die Ausbildung, jede als einzelne HTML-Datei ohne Installation und ohne Build-Schritt.

| Datei | Inhalt |
|---|---|
| `schaltwand.html` | **Schaltwand**: Schaltungen auf einer virtuellen Übungswand verdrahten (Stromkreis, Schalter, Reihen- und Parallelschaltung, Ausschaltung, Wechselschaltung) |
| `index.html` | Magnetlabor: Quiz zu Magnetismus, Rechte-Hand-Regel und Transformator |
| `arbeitsblaetter.html` | Arbeitsblätter 5.1–13.6 Schritt für Schritt |

## Starten

Datei im Browser öffnen (Doppelklick) oder mit lokalem Server:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000/schaltwand.html` öffnen.

## Schaltwand

- Klemme antippen, zweite Klemme antippen: dazwischen liegt eine Ader in der gewählten Farbe. „Ader lösen“ nimmt sie wieder ab.
- 230-V-Schaltungen: An jede Geräteklemme passt eine Ader, verbunden wird in der Abzweigdose mit Verbindungsklemmen. Verdrahten geht nur bei ausgeschaltetem LS.
- „Schaltung prüfen“ spielt alle Schalterstellungen durch, zeigt ein Prüfprotokoll und prüft u. a. Kurzschluss, Schalter in L statt N, Schutzleiter und Aderfarben.
- Die Lampenhelligkeit wird mit einer einfachen Knotenanalyse berechnet (Reihenschaltung: Lampen leuchten schwächer).
- Fortschritt und Verdrahtung speichert nur dein Browser (`localStorage`, Schlüssel `schaltwand-v1`). Nichts wird an einen Server gesendet.
