/* Lernfeld 7: Computersysteme konfigurieren und einrichten */
LT.lf(7, `
@ installation | Installation und Betriebssystem
= ## Firmware und Partitionen
= - **UEFI** (Nachfolger des BIOS) mit **Secure Boot**. Partitionstabelle **GPT** (modern) oder **MBR** (alt: max. 2 TB, max. 4 primäre Partitionen).
= ## Dateisysteme
= - **NTFS:** Windows-Standard, Rechte und Verschlüsselung. **FAT32:** sehr kompatibel, aber Dateien **max. 4 GB**. **exFAT:** für USB-Sticks ohne 4-GB-Grenze. **ext4:** Linux.
= ## Einrichtung
= Treiber, Updates, Virenschutz/Firewall, Benutzerkonten, Datensicherung einrichten, Dokumentation.
= ## Lastenheft und Pflichtenheft
= Kunde beschreibt im **Lastenheft**, WAS er braucht. Auftragnehmer beschreibt im **Pflichtenheft**, WIE es umgesetzt wird.
Q Welche Einschränkung hat das Dateisystem FAT32? | Einzelne Dateien dürfen höchstens 4 GB groß sein | Es kann keine Ordner speichern | Es funktioniert nur unter Linux | Es kann nur 2 Dateien speichern || Deshalb nutzt man für große Dateien NTFS oder exFAT.
Q Welche Grenzen hat die alte Partitionstabelle MBR? | Max. 2 TB Datenträgergröße und 4 primäre Partitionen | Max. 4 GB pro Datei | Nur für SSDs | Keine || GPT löst diese Grenzen und wird mit UEFI genutzt.
Q Was ist UEFI? | Die moderne Firmware des Mainboards, Nachfolger des BIOS | Ein Virenscanner | Ein Dateisystem | Ein Netzwerkprotokoll || Unterstützt u. a. Secure Boot und GPT.
Q Welches Dateisystem ist der Standard bei Windows und unterstützt Zugriffsrechte? | NTFS | FAT32 | exFAT | ext4 || NTFS-Berechtigungen steuern, wer was darf.
Q Welches Dateisystem eignet sich für einen großen USB-Stick, der an Windows und Mac funktionieren soll? | exFAT | NTFS ohne Zusatzsoftware | ext4 | FAT12 || exFAT hat keine 4-GB-Dateigrenze und ist weit kompatibel.
Q Was macht Secure Boot? | Es startet nur signierte, vertrauenswürdige Bootprogramme | Es verschlüsselt alle Dateien | Es sichert Daten in die Cloud | Es beschleunigt den Start || Schutz vor Schadsoftware, die sich beim Start einnistet.

@ rechte | Benutzer, Rechte, Sicherheit
= - **Prinzip der minimalen Rechte:** Jeder bekommt nur die Rechte, die er braucht. Im Alltag mit **Standardkonto** arbeiten, nicht als Administrator.
= - **Starke Passwörter** (lang, einzigartig), Passwortmanager, **Zwei-Faktor-Authentifizierung**.
= - Updates zeitnah installieren, Firewall und Virenschutz aktiv lassen.
= - **Datenschutzkonzept:** technische und organisatorische Maßnahmen (**TOM**) nach DSGVO, z. B. Zugangskontrolle, Verschlüsselung, Protokollierung.
= - **Sichere Datenträgervernichtung** nach **DIN 66399** (Sicherheitsstufen). Einfaches Löschen oder Formatieren reicht nicht.
= - **EMV** (elektromagnetische Verträglichkeit): Geräte dürfen andere nicht stören und müssen selbst störfest sein. Gehäuse geschlossen, Schirmung beachten.
Q Was bedeutet das Prinzip der minimalen Rechte? | Jeder Benutzer bekommt nur die Rechte, die er für seine Arbeit braucht | Alle Benutzer sind Administratoren | Niemand darf etwas speichern | Rechte werden zufällig vergeben || So richtet Schadsoftware oder ein Fehler weniger Schaden an.
Q Warum sollte man im Alltag nicht als Administrator arbeiten? | Schadsoftware hätte sonst sofort volle Rechte | Weil es langsamer ist | Weil der Bildschirm dunkler wird | Das ist egal || Für Installationen meldet man sich gezielt mit Adminrechten an.
Q Was ist Zwei-Faktor-Authentifizierung? | Anmeldung mit zwei verschiedenen Nachweisen, z. B. Passwort und Code aufs Handy | Zwei Passwörter hintereinander | Zwei Benutzer gleichzeitig | Anmeldung an zwei PCs || Ein gestohlenes Passwort allein reicht dann nicht.
Q Welche Norm regelt die sichere Vernichtung von Datenträgern? | DIN 66399 | DIN 14675 | DIN EN 54 | DIN 18015-3 || Sie legt Sicherheitsstufen für das Zerkleinern fest.
Q Reicht es, eine Festplatte vor der Entsorgung zu formatieren? | Nein, Daten können oft wiederhergestellt werden. Sicher löschen oder physisch vernichten | Ja, immer | Nur bei SSDs | Ja, wenn man den Papierkorb leert || Sicheres Überschreiben oder Vernichtung nach DIN 66399.
Q Was bedeutet EMV? | Elektromagnetische Verträglichkeit: nicht stören und störfest sein | Elektronische Mehrfachverteilung | Energie-Mess-Verfahren | Ein Virenschutzprogramm || Wichtig beim Einbau von Hardware: Gehäuse schließen, Schirmung erhalten.
Q Was sind TOM im Sinne der DSGVO? | Technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten | Treiber-Optimierungs-Module | Typenschild ohne Markierung | Tägliche Online-Meldungen || Zum Beispiel Zutrittskontrolle, Verschlüsselung, Schulungen.

@ backup | Datensicherung und RAID
= ## Sicherungsarten
= - **Vollsicherung:** alles. Sicher, aber groß und langsam.
= - **Differenzielle Sicherung:** alle Änderungen **seit der letzten Vollsicherung**. Wiederherstellen: Voll + letzte Differenzielle.
= - **Inkrementelle Sicherung:** nur Änderungen **seit der letzten Sicherung** (egal welcher Art). Schnell und klein, Wiederherstellen braucht Voll + alle Inkremente.
= ## RAID
= - **RAID 0:** Striping, schnell, **keine** Ausfallsicherheit. **RAID 1:** Spiegelung. **RAID 5:** mind. 3 Platten, Paritätsdaten, eine Platte darf ausfallen.
= - **RAID ist keine Datensicherung!** Gelöschte oder verschlüsselte Daten sind auf allen Platten weg.
= ## 3-2-1-Regel
= 3 Kopien, 2 verschiedene Medien, 1 Kopie außer Haus.
Q Was sichert eine inkrementelle Sicherung? | Nur die Änderungen seit der letzten Sicherung | Alle Daten | Alle Änderungen seit der letzten Vollsicherung | Nur das Betriebssystem || Wiederherstellung: Vollsicherung plus alle Inkremente der Reihe nach.
Q Was sichert eine differenzielle Sicherung? | Alle Änderungen seit der letzten Vollsicherung | Nur die Änderungen seit gestern | Alle Daten | Nur neue Dateien auf dem Desktop || Wiederherstellung: Vollsicherung plus die letzte differenzielle Sicherung.
Q Was ist RAID 1? | Spiegelung: Daten liegen identisch auf zwei Platten | Striping ohne Sicherheit | Parität über drei Platten | Eine Cloud-Sicherung || Fällt eine Platte aus, läuft das System weiter.
Q Welche Aussage über RAID 0 stimmt? | Schnell, aber keine Ausfallsicherheit | Doppelte Sicherheit | Braucht mindestens 3 Platten | Ist eine Datensicherung || Fällt eine Platte aus, sind alle Daten weg.
Q Wie viele Platten braucht RAID 5 mindestens? | 3 | 1 | 2 | 5 || Eine Platte darf ausfallen.
Q Warum ersetzt ein RAID keine Datensicherung? | Gelöschte oder verschlüsselte Daten sind auf allen Platten gleichzeitig weg | Weil RAID langsamer ist | Weil RAID nur Fotos speichert | Doch, RAID ersetzt jede Sicherung || RAID schützt nur gegen Plattenausfall.
`);
