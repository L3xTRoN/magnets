/* Lernfeld 11: Kommunikationssysteme planen und realisieren */
LT.lf(11, `
@ antenne | Antennen- und SAT-Technik
= ## Pegel und Dämpfung
= - Pegel in **dBµV**: 0 dBµV = 1 µV, **60 dBµV = 1 mV**. Spannung ×10 = **+20 dB**, Spannung ×2 ≈ +6 dB.
= - Leistung: **+3 dB = doppelt**, **+10 dB = zehnfach**. Dämpfungen (Kabel, Verteiler, Dosen) werden in dB **addiert**.
= - Koaxkabel für Antennen: **75 Ω**, Stecker meist **F-Stecker**. Gute Schirmung (Klasse A+) gegen Störungen.
= ## Satellitenempfang
= - Astra **19,2° Ost** ist in Deutschland am verbreitetsten. Empfang im **Ku-Band (10,7–12,75 GHz)**.
= - Das **LNB** setzt das Signal auf die Zwischenfrequenz **950–2150 MHz** um. **Quattro-LNB** für Multischalter, **Quad-LNB** für bis zu 4 Teilnehmer direkt.
= - **Multischalter** verteilen an viele Teilnehmer. **Einkabelsystem (Unicable, EN 50494/50607)**: mehrere Receiver an einem Kabel.
= - **DiSEqC** schaltet zwischen mehreren Satelliten/LNBs.
= ## Terrestrisch
= **DVB-T2 HD** über Antenne, **DVB-C** über Kabelnetz, **DVB-S2** über Satellit.
Q Welchen Wellenwiderstand haben Antennen-Koaxkabel? | 75 Ω | 50 Ω | 100 Ω | 300 Ω || 50 Ω ist im Funk- und Messbereich üblich.
Q Was bedeutet +3 dB bei der Leistung? | Verdopplung | Verdreifachung | Halbierung | Verzehnfachung || +10 dB = zehnfache Leistung.
Q Wie viel sind 60 dBµV? | 1 mV | 60 µV | 1 V | 1 µV || 20 dB = Faktor 10 bei der Spannung: 0 dB = 1 µV, 20 dB = 10 µV, 40 dB = 100 µV, 60 dB = 1 mV.
Q Ein Signal hat 80 dBµV, die Leitung dämpft 12 dB, der Verteiler 4 dB. Welcher Pegel kommt an? | 64 dBµV | 96 dBµV | 68 dBµV | 76 dBµV || Dämpfungen werden abgezogen: 80 − 12 − 4 = 64 dBµV.
Q Welche Aufgabe hat das LNB? | Es empfängt das SAT-Signal, verstärkt es und setzt es auf die Zwischenfrequenz um | Es ist der Receiver | Es verteilt das Signal auf 16 Teilnehmer | Es entschlüsselt Pay-TV || Low Noise Block Converter.
Q Welches LNB nimmt man für einen Multischalter? | Quattro-LNB | Single-LNB | Quad-LNB | Twin-LNB || Das Quattro-LNB liefert die 4 Ebenen getrennt an den Multischalter.
Q Was ist ein Einkabelsystem (Unicable)? | Mehrere Receiver werden über ein einziges Kabel versorgt | Ein Kabel ohne Schirmung | Nur ein Fernseher pro Haus | Ein Netzwerkkabel für SAT || Jeder Receiver bekommt ein eigenes Frequenzband (Userband).
Q Wozu dient DiSEqC? | Umschalten zwischen mehreren Satelliten bzw. LNBs | Signal verstärken | Fernseher einschalten | Kanäle sortieren || Digital Satellite Equipment Control.
Q Welche Satellitenposition ist in Deutschland am verbreitetsten? | Astra 19,2° Ost | Hotbird 13° West | Eutelsat 90° Ost | Astra 0° || Die Schüssel wird nach Süden ausgerichtet.

@ voip | Telefonie und Voice over IP
= - **VoIP:** Sprache als Datenpakete über IP. **SIP** baut Verbindungen auf und ab (Signalisierung), **RTP** transportiert die Sprache.
= - **Codecs** wandeln Sprache um: **G.711** (unkomprimiert, 64 kbit/s), **G.722** (HD-Telefonie).
= - Qualität hängt ab von **Latenz** (Verzögerung), **Jitter** (Schwankung) und **Paketverlust**. Abhilfe: **QoS** priorisiert Sprachpakete.
= - **DECT:** Schnurlostelefone, Frequenz ca. **1,9 GHz**.
= - Analoge Endgeräte (Fax, alte Telefone) hängen an **a/b-Ports** des Routers.
= - **Notruf** muss funktionieren: Bei Stromausfall läuft VoIP nur mit USV.
Q Welches Protokoll baut bei VoIP die Verbindung auf und ab? | SIP | RTP | HTTP | FTP || RTP transportiert dann die Sprachdaten.
Q Welches Protokoll transportiert bei VoIP die Sprachdaten? | RTP | SIP | DNS | SMTP || Real-time Transport Protocol, meist über UDP.
Q Was ist Jitter? | Die Schwankung der Laufzeit von Datenpaketen | Die Lautstärke | Ein Codec | Die Bandbreite || Zu viel Jitter macht Sprache abgehackt.
Q Wozu dient QoS bei VoIP? | Sprachpakete werden bevorzugt übertragen | Gespräche werden verschlüsselt | Die Rufnummer wird angezeigt | Das WLAN wird abgeschaltet || Quality of Service.
Q In welchem Frequenzbereich arbeiten DECT-Telefone? | Um 1,9 GHz | Um 50 Hz | Um 100 MHz | Um 60 GHz || DECT = Digital Enhanced Cordless Telecommunications.
Q Was passiert mit einem VoIP-Telefon bei Stromausfall ohne USV? | Es funktioniert nicht, auch kein Notruf | Es funktioniert wie immer | Es schaltet auf Funk um | Es ruft automatisch 112 || Router und Telefon brauchen Strom.
Q Woran schließt man ein analoges Faxgerät am Router an? | An einen a/b-Port | An den USB-Port | An den WAN-Port | An die SAT-Dose || Der Router setzt das analoge Signal auf VoIP um.
`);
