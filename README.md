# Prüfungstrainer Teil 1 – Informationselektroniker/-in

Lern-App für **Teil 1 der Abschlussprüfung** (Lernfelder 1–6), dazu interaktive Übungen. Alles läuft im Browser, ohne Konto und ohne Server.

## Starten

Am einfachsten: `index.html` im Browser öffnen (Doppelklick).

Mit lokalem Server (nötig für Offline-Modus und „Zum Startbildschirm hinzufügen“):

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000/` öffnen. Für das Handy unterwegs: Repository z. B. über GitHub Pages veröffentlichen und die Seite im Handy-Browser „Zum Startbildschirm hinzufügen“. Danach funktioniert die App auch offline.

## Inhalt

| Datei | Inhalt |
|---|---|
| `index.html` + `ap1/app.js` | Prüfungstrainer: Start, Lernfelder, Üben, Werkstatt, Fortschritt |
| `ap1/lf1.js` … `ap1/lf6.js` | Fragen und Lernzettel je Lernfeld (345 Fragen) |
| `ap1/arbeitsblaetter.js` | 75 Fragen aus deinen Arbeitsblättern, erzeugt mit `node tools/build-arbeitsblaetter.js` |
| `schaltwand.html` | Schaltungen auf einer Übungswand verdrahten |
| `magnetlabor.html` | Magnetismus, Rechte-Hand-Regel, Transformator (früher `index.html`) |
| `arbeitsblaetter.html` | Arbeitsblätter 5.1–13.6 Schritt für Schritt |
| `manifest.webmanifest`, `sw.js`, `icon.svg` | Installierbar und offline nutzbar |

Struktur nach dem **KMK-Rahmenlehrplan Informationselektroniker/-in vom 18.12.2020**. Laut Rahmenlehrplan werden die Lernfelder 1–6 vor Teil 1 der Abschlussprüfung unterrichtet.

## Fragen ergänzen

In `ap1/lfN.js` je eine Zeile:

```
@ themen-id | Thementitel
= Lernzettel-Zeile (## Überschrift, - Liste, **fett**)
Q Frage | richtige Antwort | falsch | falsch | falsch || Erklärung
```

Die richtige Antwort steht immer an erster Stelle, die App mischt die Reihenfolge.

## Fortschritt

- Jede Frage hat eine Stufe 0–5. Richtig: höchstens einmal pro Tag eine Stufe höher. Falsch: zurück auf Stufe 0.
- **Sicher** ab Stufe 3 (an drei Tagen richtig, ohne Fehler dazwischen). **Prüfungsreife 100 %** = alle Fragen sicher.
- Gespeichert wird nur im Browser (`localStorage`, Schlüssel `ap1-trainer-v1`). Sicherung über „Mehr → Datensicherung“ als Text kopieren und auf einem anderen Gerät einfügen.
