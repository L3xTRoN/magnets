/* Lernfeld 4: Informationstechnische Systeme bereitstellen */
LT.lf(4, `
@ hardware | Hardware eines Computers
= ## Komponenten
= - **CPU (Prozessor):** führt Befehle aus. Kenngrößen: Kerne, Takt (GHz), Cache.
= - **RAM (Arbeitsspeicher):** schnell, **flüchtig** (Daten weg ohne Strom).
= - **Massenspeicher:** **SSD** (Flash, schnell, keine beweglichen Teile) oder **HDD** (Magnetscheiben, günstiger pro GB, empfindlich gegen Stöße).
= - **Mainboard:** verbindet alle Komponenten. **Firmware: BIOS bzw. UEFI**.
= - **Grafikkarte (GPU)**, **Netzteil**, **Netzwerkkarte**.
= ## Schnittstellen
= - **USB 2.0:** 480 Mbit/s · **USB 3.2 Gen 1** (früher USB 3.0): 5 Gbit/s
= - **HDMI, DisplayPort:** Bild und Ton digital · **RJ45:** Ethernet
= ## Einheiten
= - 1 **Byte** = 8 **Bit**
= - Dezimal: 1 kB = 1000 Byte · Binär: **1 KiB = 1024 Byte**, 1 MiB = 1024 KiB
= - Datenrate in **Bit pro Sekunde** (Mbit/s), Speicher in **Byte**. 100 Mbit/s ≈ 12,5 MB/s.
Q Was bedeutet „flüchtiger Speicher“? | Die Daten gehen ohne Stromversorgung verloren | Die Daten sind verschlüsselt | Der Speicher ist sehr langsam | Der Speicher kann nur gelesen werden || RAM ist flüchtig, SSD und HDD sind nicht flüchtig.
Q Welcher Speicher ist flüchtig? | RAM | SSD | HDD | USB-Stick || Der Arbeitsspeicher verliert ohne Strom seinen Inhalt.
Q Was ist ein Vorteil einer SSD gegenüber einer HDD? | Schneller und unempfindlich gegen Erschütterungen | Immer günstiger pro Gigabyte | Speichert Daten ohne Strom nicht | Hat bewegliche Schreib-/Leseköpfe || SSDs nutzen Flash-Speicher ohne Mechanik.
Q Wie viele Bit hat ein Byte? | 8 | 10 | 16 | 1024 || 1 Byte = 8 Bit.
Q Wie viele Byte sind 1 KiB? | 1024 | 1000 | 8 | 100 || KiB (Kibibyte) ist binär: 2¹⁰ = 1024.
Q Eine Internetleitung hat 100 Mbit/s. Wie viele Megabyte pro Sekunde sind das ungefähr? | 12,5 MB/s | 100 MB/s | 800 MB/s | 1 MB/s || 100 Mbit/s / 8 = 12,5 MB/s.
Q Welche Datenrate hat USB 2.0? | 480 Mbit/s | 5 Gbit/s | 12 Mbit/s | 40 Gbit/s || USB 2.0 Hi-Speed: 480 Mbit/s. USB 3.2 Gen 1: 5 Gbit/s.
Q Was ist die Aufgabe von BIOS bzw. UEFI? | Hardware beim Start initialisieren und das Betriebssystem laden | Dateien im Internet suchen | Viren entfernen | Daten auf dem Server sichern || Firmware auf dem Mainboard.
Q Welche Komponente führt die Befehle eines Programms aus? | CPU (Prozessor) | RAM | Netzteil | SSD || Der Prozessor ist das Rechenwerk des Computers.
Q Welcher Anschluss überträgt Bild und Ton digital an einen Monitor oder Fernseher? | HDMI | RJ45 | VGA | RJ11 || VGA ist analog und nur Bild. RJ45 ist für Netzwerk.

@ zahlen | Zahlensysteme
= ## Dualsystem (Basis 2)
= Stellenwerte von rechts: 1, 2, 4, 8, 16, 32, 64, 128 …
= - Beispiel: **1011₂ = 8 + 0 + 2 + 1 = 11₁₀**
= - Mit **8 Bit** lassen sich **256** Werte darstellen: **0 bis 255**.
= ## Hexadezimal (Basis 16)
= Ziffern 0–9 und **A=10, B=11, C=12, D=13, E=14, F=15**. Eine Hex-Ziffer = 4 Bit.
= - Beispiel: **FF₁₆ = 255₁₀ = 1111 1111₂**
= ## Umrechnen Dezimal → Dual
= Fortlaufend durch 2 teilen und die Reste **von unten nach oben** lesen.
Q Welchen Dezimalwert hat die Dualzahl 1011? | 11 | 13 | 9 | 1011 || 8 + 0 + 2 + 1 = 11.
Q Welchen Dezimalwert hat die Dualzahl 1111 1111? | 255 | 256 | 128 | 512 || 128+64+32+16+8+4+2+1 = 255.
Q Wie lautet 13 als Dualzahl? | 1101 | 1011 | 1110 | 0111 || 13 = 8 + 4 + 1 → 1101.
Q Wie viele verschiedene Werte kann man mit 8 Bit darstellen? | 256 | 255 | 128 | 8 || 2⁸ = 256 Werte (0 bis 255).
Q Welchen Dezimalwert hat die Hexadezimalziffer C? | 12 | 11 | 13 | 10 || A=10, B=11, C=12, D=13, E=14, F=15.
Q Welchen Dezimalwert hat 1A₁₆? | 26 | 16 | 110 | 20 || 1 · 16 + 10 = 26.
Q Welchen Dezimalwert hat FF₁₆? | 255 | 1515 | 256 | 240 || 15 · 16 + 15 = 255.
Q Wie viele Bit stellt eine Hexadezimalziffer dar? | 4 | 8 | 2 | 16 || 2⁴ = 16 Möglichkeiten.
Q Wie lautet die Dualzahl 1010 als Hexadezimalzahl? | A | 10 | 1A | F || 1010₂ = 10₁₀ = A₁₆.
Q Wie lautet 64 als Dualzahl? | 100 0000 | 110 0100 | 1000 0000 | 64 || 64 = 2⁶ → eine 1 mit sechs Nullen.

@ netzwerk | Netzwerk-Grundlagen
= ## Begriffe
= - **LAN** (lokales Netz), **WAN** (Weitverkehrsnetz, z. B. Internet), **WLAN** (Funk).
= - **Switch:** verbindet Geräte **im selben Netz** anhand der **MAC-Adresse**.
= - **Router:** verbindet **verschiedene Netze** anhand der **IP-Adresse** (z. B. Heimnetz ↔ Internet).
= ## IPv4
= - **32 Bit**, geschrieben als 4 Zahlen 0–255, z. B. 192.168.1.10.
= - **Subnetzmaske** trennt Netz- und Hostanteil, z. B. 255.255.255.0 = **/24** → 254 nutzbare Hosts.
= - Private Bereiche: **10.0.0.0/8**, **172.16.0.0/12**, **192.168.0.0/16**.
= - **Standardgateway:** Router-Adresse für Ziele außerhalb des eigenen Netzes.
= - **IPv6:** **128 Bit**, hexadezimal geschrieben.
= ## Dienste
= - **DHCP:** vergibt IP-Adressen automatisch. **DNS:** übersetzt Namen (z. B. www.beispiel.de) in IP-Adressen.
= - **MAC-Adresse:** 48 Bit, fest in der Netzwerkkarte.
= ## Diagnose (Windows)
= **ipconfig** (eigene IP-Einstellungen) · **ping** (Erreichbarkeit) · **tracert** (Weg der Pakete) · **nslookup** (DNS prüfen)
Q Welches Gerät verbindet Geräte im selben lokalen Netz anhand der MAC-Adresse? | Switch | Router | Modem | Repeater ohne Netz || Der Switch leitet Pakete gezielt an den richtigen Port weiter.
Q Welches Gerät verbindet verschiedene Netze anhand der IP-Adresse? | Router | Switch | Hub | Patchfeld || Zum Beispiel das Heimnetz mit dem Internet.
Q Wie viele Bit hat eine IPv4-Adresse? | 32 | 48 | 64 | 128 || 4 · 8 Bit = 32 Bit.
Q Wie viele Bit hat eine IPv6-Adresse? | 128 | 32 | 48 | 64 || IPv6 hat einen riesigen Adressraum mit 128 Bit.
Q Wie viele Bit hat eine MAC-Adresse? | 48 | 32 | 128 | 16 || Meist als 6 Hex-Paare geschrieben, z. B. 00:1A:2B:3C:4D:5E.
Q Welche Adresse ist eine private IPv4-Adresse? | 192.168.1.20 | 8.8.8.8 | 85.12.4.1 | 141.1.1.1 || 192.168.0.0/16, 10.0.0.0/8 und 172.16.0.0/12 sind privat.
Q Was macht DHCP? | Es vergibt IP-Adressen automatisch an Geräte im Netz | Es übersetzt Namen in IP-Adressen | Es verschlüsselt das WLAN | Es prüft die Erreichbarkeit || Dynamic Host Configuration Protocol.
Q Was macht DNS? | Es übersetzt Domainnamen in IP-Adressen | Es vergibt IP-Adressen | Es verbindet Netze | Es misst die Datenrate || Domain Name System, wie ein Telefonbuch.
Q Wie viele Hosts sind in einem /24-Netz (255.255.255.0) nutzbar? | 254 | 256 | 255 | 24 || 256 Adressen minus Netzadresse und Broadcastadresse = 254.
Q Was ist das Standardgateway? | Die Adresse des Routers für Ziele außerhalb des eigenen Netzes | Die Adresse des DNS-Servers | Die eigene IP-Adresse | Die MAC-Adresse des Switches || Pakete in fremde Netze gehen an das Gateway.
Q Mit welchem Befehl prüft man, ob ein anderes Gerät im Netz erreichbar ist? | ping | ipconfig | dir | format || ping sendet Echo-Anfragen und misst die Antwortzeit.
Q Mit welchem Befehl zeigt man unter Windows die eigene IP-Konfiguration an? | ipconfig | ping | tracert | netstat -r || ipconfig /all zeigt auch MAC-Adresse, DNS und Gateway.

@ lastenheft | Auftrag, Lastenheft und Arbeitsplatz
= ## Lastenheft und Pflichtenheft
= - **Lastenheft:** vom **Auftraggeber (Kunde)**. Beschreibt **WAS** und **WOFÜR** gebraucht wird.
= - **Pflichtenheft:** vom **Auftragnehmer**. Beschreibt **WIE** und **WOMIT** die Anforderungen umgesetzt werden.
= ## Ergonomischer Bildschirmarbeitsplatz
= - Bildschirm **seitlich zum Fenster** (Blickrichtung parallel zur Fensterfläche), um Blendung und Spiegelung zu vermeiden.
= - Oberste Bildschirmzeile **etwa auf Augenhöhe oder darunter**, Blick leicht nach unten.
= - Ausreichender Sehabstand, verstellbarer Stuhl und Tisch, Pausen bzw. Tätigkeitswechsel.
= ## Präsentieren
= Ergebnisse dokumentieren und präsentieren. Feedback wertschätzend geben und annehmen.
Q Wer erstellt das Lastenheft? | Der Auftraggeber (Kunde) | Der Auftragnehmer | Der Hersteller der Hardware | Der Datenschutzbeauftragte || Lastenheft: Anforderungen des Kunden, WAS soll erreicht werden.
Q Wer erstellt das Pflichtenheft? | Der Auftragnehmer | Der Auftraggeber | Das Finanzamt | Die Berufsschule || Pflichtenheft: WIE der Auftragnehmer die Anforderungen umsetzt.
Q Was beschreibt das Pflichtenheft? | Wie und womit die Anforderungen umgesetzt werden | Nur den Preis | Was der Kunde sich wünscht, ohne Lösung | Die Arbeitszeiten der Mitarbeiter || Konkrete technische Lösung zum Lastenheft.
Q Wie sollte ein Bildschirm zum Fenster aufgestellt werden? | Seitlich, sodass der Blick parallel zur Fensterfläche geht | Mit dem Rücken zum Fenster | Direkt vor dem Fenster | Egal || So gibt es weder Blendung von vorn noch Spiegelungen von hinten.
Q Wo sollte die oberste Bildschirmzeile liegen? | Etwa auf Augenhöhe oder leicht darunter | Deutlich über Augenhöhe | Auf Höhe des Tisches | Auf Kniehöhe || Der Blick geht dann entspannt leicht nach unten.

@ datenschutz | Datenschutz, Datensicherheit, Datensicherung
= ## Unterschiede
= - **Datenschutz:** Schutz von **Personen** vor Missbrauch ihrer **personenbezogenen Daten** (DSGVO, BDSG).
= - **Datensicherheit:** Schutz der **Daten selbst** vor Verlust, Manipulation, unberechtigtem Zugriff (technische Maßnahmen).
= - **Datensicherung (Backup):** Kopien anlegen, um Daten wiederherstellen zu können.
= ## Schutzziele der IT-Sicherheit
= **Vertraulichkeit, Integrität, Verfügbarkeit**.
= ## 3-2-1-Regel
= **3** Kopien der Daten, auf **2** verschiedenen Speichermedien, **1** davon außer Haus.
= ## Recht
= - **Personenbezogene Daten:** alle Infos zu einer erkennbaren Person (Name, Adresse, IP-Adresse, Foto …).
= - **Urheberrecht:** Software nur mit gültiger **Lizenz** nutzen, Bilder und Texte nicht einfach übernehmen.
Q Was regelt der Datenschutz? | Den Schutz von Personen vor Missbrauch ihrer personenbezogenen Daten | Den Schutz der Festplatte vor Stößen | Die Datenrate im Netzwerk | Die Garantie von Hardware || Rechtsgrundlage ist vor allem die DSGVO.
Q Was ist Datensicherheit? | Schutz der Daten vor Verlust, Manipulation und unberechtigtem Zugriff | Ein anderes Wort für Datenschutzgesetz | Das Löschen alter Daten | Die Geschwindigkeit des Netzwerks || Technische und organisatorische Maßnahmen wie Passwörter, Verschlüsselung, Backups.
Q Wie lauten die drei klassischen Schutzziele der IT-Sicherheit? | Vertraulichkeit, Integrität, Verfügbarkeit | Schnelligkeit, Preis, Qualität | Hardware, Software, Netzwerk | Speichern, Löschen, Kopieren || Integrität = Daten sind unverändert und korrekt.
Q Was besagt die 3-2-1-Regel? | 3 Kopien, 2 verschiedene Medien, 1 Kopie außer Haus | 3 Passwörter, 2 Benutzer, 1 Admin | 3 Server, 2 Switches, 1 Router | 3 Tage, 2 Wochen, 1 Monat || Schützt auch bei Brand, Diebstahl oder Ransomware.
Q Welche Information ist ein personenbezogenes Datum? | Name und Wohnanschrift eines Kunden | Die Taktfrequenz einer CPU | Die Normnummer DIN VDE 0100 | Der Preis eines Kabels || Personenbezogen ist alles, was sich einer bestimmten Person zuordnen lässt.
Q Welches Gesetz regelt in der EU den Datenschutz? | DSGVO (Datenschutz-Grundverordnung) | DGUV Vorschrift 3 | VDE 0105-100 | BGB § 433 || Ergänzt in Deutschland durch das BDSG.
Q Ein Kunde möchte, dass du eine Software installierst, für die er keine Lizenz hat. Was tust du? | Ablehnen und auf das Urheberrecht hinweisen | Installieren, wenn er es wünscht | Eine Lizenz aus dem Internet kopieren | Die Software umbenennen || Ohne gültige Lizenz ist die Nutzung ein Verstoß gegen das Urheberrecht.

@ itfehler | Fehlersuche an IT-Systemen
= ## Vorgehen von unten nach oben
= - **Physisch:** Strom an? Kabel gesteckt? Link-LED leuchtet?
= - **Netzwerk:** IP-Adresse vorhanden (ipconfig)? Gateway mit **ping** erreichbar? DNS funktioniert (Name auflösen)?
= - **Software:** Treiber im **Geräte-Manager**, Fehlermeldungen in der **Ereignisanzeige**, Updates.
= ## Typische Hinweise
= - IP-Adresse **169.254.x.x** (APIPA): Der PC hat **keine Adresse vom DHCP-Server** erhalten.
= - Ping auf IP klappt, auf Namen nicht → **DNS-Problem**.
Q Ein PC hat die IP-Adresse 169.254.12.7. Was bedeutet das? | Er hat keine Adresse vom DHCP-Server bekommen | Er ist richtig im Firmennetz | Er ist direkt im Internet | Die Netzwerkkarte ist kaputt, sicher || 169.254.x.x ist eine automatische private Adresse (APIPA), wenn DHCP nicht antwortet.
Q Ping auf 8.8.8.8 funktioniert, aber Webseiten per Namen öffnen nicht. Wo liegt vermutlich der Fehler? | Bei der Namensauflösung (DNS) | Am Netzwerkkabel | Am Netzteil | Am Monitor || Die Verbindung steht, nur die Übersetzung von Namen in IP-Adressen klappt nicht.
Q Wo findet man unter Windows Probleme mit Gerätetreibern? | Im Geräte-Manager | Im Papierkorb | In der Taskleiste | Im Editor || Geräte mit Problemen sind dort mit einem Warnsymbol markiert.
Q Womit beginnt man sinnvollerweise bei einem Netzwerkproblem? | Physische Verbindung prüfen: Strom, Kabel, Link-LED | Betriebssystem neu installieren | Router zurücksetzen | Neue Hardware kaufen || Von unten nach oben: erst einfache, häufige Ursachen ausschließen.
`);
