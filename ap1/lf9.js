/* Lernfeld 9: Anwenderspezifische Systeme auswählen und integrieren (u. a. Gefahrenmeldeanlagen, intelligente Gebäudetechnik) */
LT.lf(9, `
@ ema | Einbruchmeldeanlagen (EMA)
= ## Normen und Einstufung
= - **DIN VDE 0833-1** (allgemein für Gefahrenmeldeanlagen) und **DIN VDE 0833-3** (Einbruch- und Überfallmeldeanlagen).
= - **DIN EN 50131:** Einstufung in **Grade 1 bis 4** (4 = höchstes Risiko). Versicherer arbeiten oft mit **VdS-Klassen A, B, C** (C = höchste).
= ## Überwachungsarten
= - **Außenhautüberwachung:** Türen, Fenster, Wände (Öffnungs-, Verschluss-, Glasbruchmelder). Alarm, bevor der Täter drinnen ist.
= - **Fallenüberwachung:** Bewegungsmelder an Stellen, die ein Täter wahrscheinlich passiert (Flur, Treppe).
= - **Objektüberwachung:** einzelne Gegenstände, z. B. Tresor mit Körperschallmelder.
= ## Bedienung
= - **Extern scharf:** niemand im Objekt, Alarm auch nach außen (z. B. an eine Notruf- und Serviceleitstelle, NSL).
= - **Intern scharf:** Personen im Objekt (z. B. nachts), meist nur Außenhaut aktiv, Alarm intern.
= - **Zwangsläufigkeit:** Scharfschalten nur, wenn alle Melder in Ruhe und alle Türen/Fenster zu sind, und der scharf geschaltete Bereich kann nicht versehentlich betreten werden (z. B. **Blockschloss** sperrt die Tür).
= - **Sabotageüberwachung** (z. B. Deckelkontakte) ist rund um die Uhr aktiv, auch unscharf.
= ## Meldelinien
= Melder hängen an Meldelinien mit **Abschlusswiderstand** (Widerstandsüberwachung): Die Zentrale erkennt Alarm, **Drahtbruch** und **Kurzschluss** an der Änderung des Widerstands. Moderne Anlagen nutzen **Bus-Technik** mit adressierbaren Meldern.
= ## Alarmierung
= Intern über Sirene/Summer, extern über akustische und optische Signalgeber und die **Übertragungseinrichtung (ÜE)** zur NSL. Akustische Außensignalgeber sind in Deutschland auf **3 Minuten** begrenzt.
Q Welche Norm behandelt speziell Einbruch- und Überfallmeldeanlagen? | DIN VDE 0833-3 | DIN VDE 0833-2 | DIN 14675 | DIN EN 54 || 0833-1 allgemein, -2 Brandmeldeanlagen, -3 Einbruch und Überfall.
Q In wie viele Grade teilt DIN EN 50131 Einbruchmeldeanlagen ein? | 4 (Grad 1 bis 4) | 3 (A bis C) | 2 | 6 || Grad 4 steht für das höchste Risiko. VdS nutzt die Klassen A, B, C.
Q Was bedeutet Zwangsläufigkeit bei einer EMA? | Scharfschalten nur, wenn alles in Ruhe ist, und der scharfe Bereich kann nicht versehentlich betreten werden | Die Anlage schaltet sich nachts automatisch scharf | Jeder Alarm wird zwingend an die Polizei gemeldet | Alle Melder müssen Bewegungsmelder sein || Zwangsläufigkeit verhindert Fehlbedienung und damit Falschalarme.
Q Wozu dient ein Blockschloss? | Es schaltet die EMA scharf und sperrt im scharfen Zustand die Tür mechanisch | Es ist ein Schloss für den Tresor | Es sperrt die Sirene | Es schaltet die Beleuchtung || Typisches Bauteil zur Zwangsläufigkeit an der Zugangstür.
Q Was ist der Unterschied zwischen intern und extern scharf? | Extern: niemand im Objekt, Alarm nach außen. Intern: Personen im Objekt, Alarm meist nur intern | Intern ist lauter | Extern schaltet nur die Kameras | Es gibt keinen Unterschied || Intern scharf z. B. nachts im Wohnhaus mit Außenhautüberwachung.
Q Welche Überwachungsart meldet einen Täter, bevor er im Gebäude ist? | Außenhautüberwachung | Fallenüberwachung | Objektüberwachung | Videoüberwachung im Keller || Melder an Türen, Fenstern und Wänden.
Q Was ist eine Fallenüberwachung? | Bewegungsmelder an Stellen, die ein Täter wahrscheinlich passiert | Überwachung eines Tresors | Überwachung aller Fenster | Eine Falle im Garten || Zum Beispiel im Flur oder Treppenhaus.
Q Welcher Melder überwacht, ob eine Tür geöffnet wird? | Öffnungsmelder (Magnetkontakt) | Glasbruchmelder | Rauchmelder | Körperschallmelder || Ein Magnet an der Tür hält einen Reedkontakt im Rahmen geschlossen.
Q Was überwacht ein Verschlussmelder (Riegelkontakt)? | Ob die Tür auch abgeschlossen ist | Ob die Tür offen steht | Ob das Glas bricht | Ob Rauch entsteht || Wichtig für die Zwangsläufigkeit.
Q Was erkennt ein passiver Infrarot-Bewegungsmelder (PIR)? | Bewegung einer Wärmequelle im Erfassungsbereich | Rauch | Erschütterungen einer Wand | Das Öffnen eines Fensters per Magnetfeld || Er misst Änderungen der Wärmestrahlung.
Q Warum setzt man Dualmelder (PIR + Mikrowelle) ein? | Weil beide Prinzipien auslösen müssen, das senkt Falschalarme | Weil sie billiger sind | Weil sie keinen Strom brauchen | Weil sie auch Rauch erkennen || Zwei unterschiedliche Messprinzipien bestätigen sich gegenseitig.
Q Welcher Melder eignet sich zur Überwachung eines Tresors? | Körperschallmelder | Rauchmelder | Handfeuermelder | Magnetkontakt allein || Er erkennt Bohr- und Schneidversuche am Material.
Q Was ist ein Überfallmelder? | Ein von Hand ausgelöster Melder, meist für stillen Alarm | Ein Bewegungsmelder für den Garten | Ein Rauchmelder in der Küche | Ein Glasbruchmelder || Zum Beispiel an der Kasse, Alarm geht still an die Leitstelle.
Q Wozu dient der Abschlusswiderstand am Ende einer Meldelinie? | Die Zentrale erkennt damit Alarm, Drahtbruch und Kurzschluss | Er begrenzt die Lautstärke der Sirene | Er spart Strom | Er ersetzt die Sicherung || Ruhezustand = bestimmter Widerstand. Jede Abweichung wird gemeldet.
Q Was passiert bei einem Drahtbruch in einer überwachten Meldelinie? | Der Widerstand wird unendlich groß, die Zentrale meldet eine Störung bzw. Sabotage | Nichts | Die Sirene wird leiser | Der Abschlusswiderstand verbrennt || Drahtbruch und Kurzschluss werden genauso erkannt wie Alarm.
Q Wann ist die Sabotageüberwachung aktiv? | Rund um die Uhr, auch im unscharfen Zustand | Nur extern scharf | Nur nachts | Nur bei Alarm || Zum Beispiel öffnet jemand den Deckel eines Melders.
Q Wohin meldet eine Übertragungseinrichtung (ÜE) den Alarm? | An eine Notruf- und Serviceleitstelle (NSL) bzw. hilfeleistende Stelle | Nur an die Sirene | An den Nachbarn per Zuruf | Nirgendwohin || Die NSL leitet Maßnahmen ein, z. B. Interventionsdienst oder Polizei.
Q Wie lange dürfen akustische Außensignalgeber in Deutschland höchstens ertönen? | 3 Minuten | 30 Sekunden | 30 Minuten | Bis jemand die Anlage abschaltet || Danach bleibt meist nur die optische Anzeige (Blitzleuchte).

@ bma | Brandmeldeanlagen (BMA) und Rauchwarnmelder
= ## Normen
= - **DIN 14675:** Aufbau und Betrieb von BMA. **DIN VDE 0833-2:** BMA. **DIN EN 54:** Bauteile (Melder, Zentrale).
= - **Rauchwarnmelder** in Wohnungen (keine BMA!): **DIN 14676**. Pflicht u. a. in Schlafräumen, Kinderzimmern und Fluren, die zu Aufenthaltsräumen führen.
= ## Melderarten
= - **Optischer Rauchmelder:** Streulichtprinzip. Rauch streut das Licht einer LED auf eine Fotodiode.
= - **Wärmemelder:** thermomaximal (feste Temperatur) oder thermodifferenzial (schneller Anstieg). Für Räume mit Dampf oder Staub, z. B. Küche.
= - **Flammenmelder:** reagieren auf UV- oder IR-Strahlung von Flammen.
= - **Mehrkriterienmelder:** kombinieren z. B. Rauch und Wärme, weniger Täuschungsalarme.
= - **Ansaugrauchmelder (RAS):** saugt Luft über Rohre an, für Serverräume oder hohe Hallen.
= - **Handfeuermelder:** **rot** = Feuerwehralarm, **blau** = Hausalarm.
= ## Feuerwehrperipherie
= - **FBF** Feuerwehr-Bedienfeld (Bedienung durch die Feuerwehr), **FAT** Feuerwehr-Anzeigetableau (welcher Melder hat ausgelöst).
= - **FSD** Feuerwehr-Schlüsseldepot mit Objektschlüssel, **FSE** Freischaltelement (öffnet das FSD von außen), **Blitzleuchte** zeigt den Feuerwehrzugang.
= - **Feuerwehr-Laufkarten** zeigen den Weg zum ausgelösten Melder.
= ## Technik und Betrieb
= - **Ringbus:** Bei einer Unterbrechung bleiben alle Melder von beiden Seiten erreichbar.
= - **Brandfallsteuerungen:** z. B. Aufzüge fahren ins Erdgeschoss, Brandschutztüren schließen, Lüftung schaltet ab.
= - **Instandhaltung (DIN 14675):** Inspektion **vierteljährlich**, Wartung **jährlich**.
Q Welche Norm regelt Aufbau und Betrieb von Brandmeldeanlagen? | DIN 14675 | DIN 14676 | DIN VDE 0833-3 | DIN EN 50131 || Zusammen mit DIN VDE 0833-2. DIN 14676 betrifft Rauchwarnmelder in Wohnungen.
Q Welche Norm gilt für Rauchwarnmelder in Wohnungen? | DIN 14676 | DIN 14675 | DIN EN 54 | DIN VDE 0833-2 || Rauchwarnmelder sind keine Brandmeldeanlage.
Q Nach welchem Prinzip arbeitet ein optischer Rauchmelder? | Streulichtprinzip: Rauch streut LED-Licht auf eine Fotodiode | Er misst die Temperatur | Er erkennt UV-Strahlung | Er misst den Luftdruck || In der Messkammer trifft normalerweise kein Licht auf die Fotodiode.
Q Welcher Melder eignet sich für eine Küche mit Wasserdampf? | Wärmemelder | Optischer Rauchmelder | Ansaugrauchmelder | Flammenmelder ohne Abschirmung || Dampf würde einen Rauchmelder täuschen.
Q Was erkennt ein thermodifferenzieller Wärmemelder? | Einen schnellen Temperaturanstieg | Nur eine feste Höchsttemperatur | Rauchpartikel | Flackerndes Licht || Thermomaximal: feste Grenztemperatur. Differenzial: Anstiegsgeschwindigkeit.
Q Wofür eignet sich ein Ansaugrauchmelder besonders? | Serverräume und hohe Hallen | Wohnzimmer | Außenbereiche | Garagen mit Abgasen || Luft wird über Rohre angesaugt und zentral sehr empfindlich ausgewertet.
Q Welche Farbe hat ein Handfeuermelder, der die Feuerwehr alarmiert? | Rot | Blau | Gelb | Grün || Blau steht für Hausalarm.
Q Was ist ein FBF? | Feuerwehr-Bedienfeld, über das die Feuerwehr die BMA bedient | Feuerwehr-Brandfenster | Fernbedienung für Fenster | Feuchtigkeitsfühler || Zum Beispiel Akustische Signale ab, BMA rückstellen.
Q Was zeigt das FAT? | Welcher Melder bzw. welche Meldergruppe ausgelöst hat | Die Uhrzeit | Den Wasserdruck | Die Anzahl der Personen im Gebäude || FAT = Feuerwehr-Anzeigetableau.
Q Was befindet sich im Feuerwehr-Schlüsseldepot (FSD)? | Der Objektschlüssel für die Feuerwehr | Feuerlöscher | Die Zentrale der BMA | Ersatzmelder || Bei Alarm wird die Außentür des FSD freigegeben.
Q Welchen Vorteil hat ein Ringbus bei einer BMA? | Bei einer Leitungsunterbrechung bleiben alle Melder erreichbar | Er braucht weniger Melder | Er ist immer billiger | Er funktioniert ohne Zentrale || Die Zentrale erreicht die Melder von beiden Seiten.
Q Was ist eine Brandfallsteuerung? | Automatische Aktionen bei Brandalarm, z. B. Brandschutztüren schließen, Lüftung abschalten | Das Löschen mit Wasser | Die Bedienung durch die Feuerwehr | Ein Rauchmelder mit Akku || Die BMA steuert andere Gewerke an.
Q Wie oft ist eine BMA nach DIN 14675 zu inspizieren? | Vierteljährlich | Alle 5 Jahre | Monatlich | Nie || Wartung einmal jährlich.
Q Wo sind Rauchwarnmelder in Wohnungen vorgeschrieben? | In Schlafräumen, Kinderzimmern und Fluren, die zu Aufenthaltsräumen führen | Nur in der Küche | Nur im Keller | Nur im Bad || Die Einzelheiten regeln die Landesbauordnungen.
Q Warum lösen Mehrkriterienmelder seltener Täuschungsalarme aus? | Sie werten mehrere Brandkenngrößen gemeinsam aus | Sie sind lauter | Sie sind unempfindlich | Sie haben keine Elektronik || Zum Beispiel Rauch und Temperatur zusammen.

@ video | Video und Zutrittskontrolle
= ## Videosicherheitssysteme (VSS)
= - Norm: **DIN EN 62676**. Komponenten: Kameras, Rekorder (**NVR** für IP-Kameras), Monitor, Netzwerk.
= - **IP-Kameras** oft mit **PoE** versorgt (Strom über das Netzwerkkabel).
= - **Datenschutz:** Hinweisschild, Zweck festlegen, nur das Nötige aufnehmen, keine öffentlichen Bereiche oder Nachbargrundstücke, Aufnahmen nur begrenzt speichern (DSGVO).
= ## Zutrittskontrolle
= - Identifikation durch **Besitz** (Karte, Transponder), **Wissen** (PIN) oder **Biometrie** (Fingerabdruck). Zwei Faktoren zusammen sind sicherer.
= - **Fluchttüren** müssen auch bei Stromausfall öffnen: **Ruhestrom-Türöffner** (fail-safe) bzw. zugelassene Fluchttürsteuerungen.
= - **Arbeitsstrom-Türöffner** öffnen nur, wenn Strom fließt (fail-secure).
Q Welche Normenreihe gilt für Videosicherheitssysteme? | DIN EN 62676 | DIN EN 54 | DIN 14675 | DIN VDE 0100-410 || VSS = Videosicherheitssystem.
Q Wofür steht NVR? | Network Video Recorder, Rekorder für IP-Kameras | Neutralleiter-Verteiler-Relais | Notrufverbindungsrechner | Nachtsichtvideorahmen || Speichert die Streams der IP-Kameras.
Q Wie werden IP-Kameras häufig mit Strom versorgt? | Über PoE (Power over Ethernet) | Über HDMI | Nur mit Batterien | Über das Koaxkabel der SAT-Anlage || Ein Kabel für Daten und Strom.
Q Was gehört zum Datenschutz bei einer Videoüberwachung? | Hinweisschild, festgelegter Zweck, begrenzte Speicherdauer, keine fremden Bereiche filmen | Möglichst alles filmen und für immer speichern | Kameras verstecken | Aufnahmen ins Internet stellen || Rechtsgrundlage ist die DSGVO.
Q Welche Identifikation gehört zur Kategorie Wissen? | PIN-Code | Chipkarte | Fingerabdruck | Transponder || Besitz: Karte. Biometrie: Fingerabdruck.
Q Welcher Türöffner ist für Fluchttüren geeignet, weil er bei Stromausfall freigibt? | Ruhestrom-Türöffner (fail-safe) | Arbeitsstrom-Türöffner | Mechanisches Vorhängeschloss | Kein Türöffner || Menschen müssen im Notfall immer hinauskommen.

@ knx | Intelligente Gebäudetechnik (KNX)
= ## KNX
= - Bussystem für Gebäudeautomation: **Sensoren** (Taster, Wetterstation) senden Telegramme, **Aktoren** (Schalt-, Dimm-, Jalousieaktor) führen aus. Dezentral, kein zentraler Rechner nötig.
= - Busleitung **2-adrig**, z. B. grünes Buskabel; Busspannung **SELV ca. 30 V DC**.
= - **Physikalische Adresse:** Bereich.Linie.Teilnehmer, z. B. 1.1.5. **Gruppenadresse** verbindet Sensor und Aktor logisch, z. B. 1/0/1.
= - Pro Liniensegment bis **64 Teilnehmer**. Programmierung mit der Software **ETS**.
= ## Vorteile
= Flexibel änderbar ohne neue Leitungen, zentrale Funktionen (Alles aus), Verknüpfung mit Heizung, Jalousie, Alarm.
Q Was ist bei KNX ein Aktor? | Ein Gerät, das schaltet, dimmt oder fährt, z. B. Schaltaktor | Ein Taster | Eine Wetterstation | Die Busleitung || Sensoren geben Befehle, Aktoren führen aus.
Q Welche Spannung führt die KNX-Busleitung? | Sicherheitskleinspannung, ca. 30 V DC | 230 V AC | 400 V AC | 12 V AC || Deshalb kann der Bus neben 230-V-Leitungen geführt werden, wenn die Isolationsanforderungen eingehalten werden.
Q Wie ist eine physikalische KNX-Adresse aufgebaut? | Bereich.Linie.Teilnehmer, z. B. 1.1.5 | Nur eine Zahl | Wie eine IP-Adresse mit 4 Zahlen | Raum/Etage/Haus || Gruppenadressen werden mit Schrägstrich geschrieben, z. B. 1/0/1.
Q Wozu dienen Gruppenadressen bei KNX? | Sie verbinden Sensoren und Aktoren logisch miteinander | Sie identifizieren das einzelne Gerät eindeutig | Sie legen die Busspannung fest | Sie sind die IP-Adresse || Ein Taster sendet auf eine Gruppenadresse, alle Aktoren mit dieser Adresse reagieren.
Q Mit welcher Software werden KNX-Anlagen programmiert? | ETS | Excel | STEP 7 | AutoCAD || ETS = Engineering Tool Software.
Q Wie viele Teilnehmer sind pro KNX-Liniensegment möglich? | Bis zu 64 | Bis zu 8 | Unbegrenzt | Genau 1000 || Mit Linienverstärkern und Linienkopplern lässt sich erweitern.

@ projekt | Projekt: Angebot, Übergabe, Wartung
= ## Ablauf eines Kundenprojekts
= - Anforderungen aufnehmen (Risiko, Wünsche, Versicherung) → Planung → **Angebot** (rechnergestützt) → Installation und Konfiguration → **Funktionsprüfung** → **Einweisung** → **Abnahmeprotokoll** → **Aufmaß** → Rechnung.
= - **Dokumentation:** Pläne, Melderliste, Einstellungen, Prüfprotokolle.
= - **Wartungsvertrag** anbieten: regelmäßige Inspektion und Wartung erhalten die Funktion und oft den Versicherungsschutz.
= - **Sicherheitskonzept:** Schutz gegen unberechtigten Zugriff (Passwörter, Benutzerrechte, verschlüsselte Fernzugänge) und Ausfallsicherheit (Notstromversorgung, Akkus).
Q Was bestätigt das Abnahmeprotokoll? | Dass die Anlage vereinbarungsgemäß übergeben und abgenommen wurde | Den Preis des Materials | Die Arbeitszeit der Monteure | Die Garantie des Herstellers || Mit der Abnahme beginnt in der Regel die Gewährleistung.
Q Warum bietet man zu Gefahrenmeldeanlagen einen Wartungsvertrag an? | Regelmäßige Inspektion und Wartung erhalten die Funktion, oft auch für den Versicherungsschutz nötig | Damit der Kunde mehr bezahlt, ohne Leistung | Weil die Anlage sonst abgeschaltet wird | Das ist nicht üblich || Gefahrenmeldeanlagen müssen dauerhaft zuverlässig funktionieren.
Q Was gehört zu einem Sicherheitskonzept für eine vernetzte Anlage? | Schutz gegen unberechtigten Zugriff und Maßnahmen zur Ausfallsicherheit | Nur ein schöner Bildschirmschoner | Möglichst einfache Standardpasswörter | Offene Ports für alle || Zum Beispiel individuelle Passwörter, Rechtekonzept, Notstromversorgung.
Q Wozu dient die Notstromversorgung einer Gefahrenmeldeanlage? | Die Anlage arbeitet bei Netzausfall weiter | Sie macht die Sirene lauter | Sie ersetzt die Netzleitung dauerhaft | Sie dient nur der Beleuchtung || Akkus übernehmen bei Netzausfall für eine festgelegte Zeit.
`);
