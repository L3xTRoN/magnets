/* Lernfeld 8: Vernetzte Systeme installieren, erweitern und administrieren */
LT.lf(8, `
@ osi | OSI-Modell, Protokolle und Ports
= ## OSI-Modell (7 Schichten, von unten)
= 1 Bitübertragung · 2 Sicherung (MAC, **Switch**) · 3 Vermittlung (IP, **Router**) · 4 Transport (TCP/UDP) · 5 Sitzung · 6 Darstellung · 7 Anwendung
= Merksatz von unten: **„Please Do Not Throw Salami Pizza Away“** (Physical, Data Link, Network, Transport, Session, Presentation, Application).
= ## TCP und UDP
= - **TCP:** verbindungsorientiert, sicher (Bestätigung, Reihenfolge), z. B. Web, E-Mail.
= - **UDP:** verbindungslos, schnell, ohne Bestätigung, z. B. Telefonie, Streaming, DNS.
= ## Wichtige Ports
= HTTP **80** · HTTPS **443** · DNS **53** · SSH **22** · FTP **21** · SMTP **25** · RDP **3389**
Q Wie viele Schichten hat das OSI-Modell? | 7 | 4 | 5 | 9 || Das TCP/IP-Modell fasst sie zu 4 Schichten zusammen.
Q Auf welcher OSI-Schicht arbeitet ein Switch? | Schicht 2 (Sicherung) | Schicht 1 | Schicht 3 | Schicht 7 || Er leitet anhand der MAC-Adresse weiter.
Q Auf welcher OSI-Schicht arbeitet ein Router? | Schicht 3 (Vermittlung) | Schicht 2 | Schicht 4 | Schicht 1 || Er leitet anhand der IP-Adresse zwischen Netzen weiter.
Q Auf welcher Schicht arbeiten TCP und UDP? | Schicht 4 (Transport) | Schicht 3 | Schicht 2 | Schicht 7 || Sie regeln die Übertragung zwischen Anwendungen über Ports.
Q Was unterscheidet UDP von TCP? | UDP ist verbindungslos und ohne Bestätigung, dafür schnell | UDP ist sicherer | UDP braucht Glasfaser | Es gibt keinen Unterschied || Typisch für Sprache und Video, wo Tempo wichtiger ist als jedes Paket.
Q Welcher Port gehört zu HTTPS? | 443 | 80 | 21 | 25 || HTTP ohne Verschlüsselung nutzt Port 80.
Q Welcher Port gehört zu DNS? | 53 | 22 | 443 | 110 || DNS übersetzt Namen in IP-Adressen.
Q Welcher Port gehört zu SSH (verschlüsselter Fernzugriff)? | 22 | 23 | 80 | 3389 || Port 23 ist Telnet (unverschlüsselt). 3389 ist RDP.

@ subnetz | IP-Adressen und Subnetze
= - **IPv4:** 32 Bit. Präfix /24 = Maske 255.255.255.0 = 254 nutzbare Hosts. /25 = 126 Hosts, /26 = 62 Hosts, /30 = 2 Hosts.
= - Formel: **Hosts = 2^(32 − Präfix) − 2** (minus Netz- und Broadcastadresse).
= - **Netzadresse:** alle Hostbits 0. **Broadcast:** alle Hostbits 1.
= - **IPv6:** 128 Bit, hexadezimal, z. B. 2001:db8::1. Keine Broadcasts, dafür Multicast.
= - **VLAN** (IEEE 802.1Q): trennt ein physisches Netz logisch in mehrere Netze, z. B. Büro, Gäste, Kameras.
Q Wie viele Hosts sind in einem /26-Netz nutzbar? | 62 | 64 | 26 | 126 || 2^6 − 2 = 62.
Q Welche Subnetzmaske gehört zu /24? | 255.255.255.0 | 255.255.0.0 | 255.255.255.128 | 255.0.0.0 || 24 Einsen = drei volle Oktette.
Q Netz 192.168.10.0/24: Welche Adresse ist die Broadcastadresse? | 192.168.10.255 | 192.168.10.0 | 192.168.10.1 | 192.168.255.255 || Alle Hostbits auf 1.
Q Wie viele Bit hat eine IPv6-Adresse? | 128 | 32 | 64 | 48 || Riesiger Adressraum, hexadezimal geschrieben.
Q Wozu dienen VLANs? | Ein physisches Netz logisch in getrennte Netze aufteilen | Das WLAN schneller machen | IP-Adressen automatisch vergeben | Kabel einsparen durch Funk || Zum Beispiel Kameras und Gäste vom Büronetz trennen.

@ infrastruktur | Kabel, WLAN, PoE und USV
= ## Kupferkabel
= - Twisted Pair **Cat 5e** (1 Gbit/s), **Cat 6A** (10 Gbit/s). Maximale Segmentlänge **100 m** (90 m fest + Patchkabel).
= ## Glasfaser
= **Multimode** für kürzere Strecken im Gebäude, **Singlemode** für große Entfernungen. Unempfindlich gegen elektromagnetische Störungen.
= ## Pegel und Dämpfung
= Dämpfung in **dB**: **3 dB** weniger = halbe Leistung, **10 dB** = ein Zehntel.
= ## WLAN
= Frequenzbänder **2,4 GHz** (große Reichweite, wenig Kanäle), **5 GHz** (schneller, weniger Reichweite), 6 GHz (WiFi 6E). Verschlüsselung **WPA2** oder besser **WPA3**.
= ## PoE (Power over Ethernet)
= IEEE **802.3af** bis 15,4 W · **802.3at** (PoE+) bis 30 W · **802.3bt** bis 60 bzw. 90 W (am Switch-Port).
= ## USV (unterbrechungsfreie Stromversorgung)
= **Offline (VFD)**: schaltet erst bei Ausfall um · **Line-Interactive (VI)**: regelt Spannungsschwankungen · **Online (VFI)**: Verbraucher läuft immer über den Wechselrichter, bester Schutz.
Q Wie lang darf ein Twisted-Pair-Ethernet-Segment höchstens sein? | 100 m | 10 m | 500 m | 2 km || 90 m Verlegekabel plus Patchkabel.
Q Welche Kategorie braucht man mindestens für 10 Gbit/s über 100 m? | Cat 6A | Cat 5 | Cat 3 | Cat 5e || Cat 5e reicht für 1 Gbit/s.
Q Wann nimmt man Singlemode-Glasfaser? | Für große Entfernungen | Für Patchkabel am Schreibtisch | Für Telefonleitungen aus Kupfer | Nie || Multimode reicht für kürzere Strecken im Gebäude.
Q Was bedeutet eine Dämpfung von 3 dB? | Die Leistung halbiert sich | Die Leistung verdreifacht sich | Die Spannung wird null | Die Leistung sinkt auf ein Zehntel || 10 dB entspricht einem Zehntel.
Q Welcher Vorteil hat das 5-GHz-WLAN gegenüber 2,4 GHz? | Höhere Datenrate und mehr Kanäle | Größere Reichweite durch Wände | Es braucht keine Verschlüsselung | Es funktioniert ohne Router || Dafür ist die Reichweite geringer.
Q Welche WLAN-Verschlüsselung ist heute zu empfehlen? | WPA3 (mindestens WPA2) | WEP | Keine | WPA (erste Version) || WEP und WPA gelten als unsicher.
Q Wie viel Leistung liefert PoE nach IEEE 802.3af am Switch-Port? | Bis 15,4 W | Bis 90 W | Bis 1 W | Bis 230 W || 802.3at (PoE+) bis 30 W, 802.3bt bis 60/90 W.
Q Welche USV-Bauart bietet den besten Schutz? | Online-USV (VFI) | Offline-USV (VFD) | Line-Interactive (VI) | Alle gleich || Der Verbraucher hängt immer am Wechselrichter, ohne Umschaltzeit.
Q Was ist eine Aufgabe einer USV im Netzwerk? | Server und Netzwerkgeräte bei Stromausfall weiter versorgen und sicher herunterfahren | Das WLAN verschlüsseln | IP-Adressen vergeben | Den Internetanschluss beschleunigen || Datenverlust durch harte Abschaltung wird vermieden.

@ dienste | Dienste, Freigaben und Sicherheit
= - **DHCP** vergibt Adressen, **DNS** löst Namen auf, **NTP** synchronisiert die Zeit.
= - **Freigaben** (Ordner, Drucker) mit **Benutzerrechten**: Lesen, Ändern, Vollzugriff. Rechte möglichst über Gruppen vergeben.
= - **Firewall** filtert Verbindungen, **VPN** baut einen verschlüsselten Tunnel z. B. für Fernzugriff.
= - Netzwerk **dokumentieren**: Plan, IP-Adressen, Patchfeld-Belegung, Messprotokolle (z. B. Kabelzertifizierung).
Q Wozu dient ein VPN? | Ein verschlüsselter Tunnel, z. B. für sicheren Fernzugriff auf das Firmennetz | Es vergibt IP-Adressen | Es verstärkt das WLAN | Es ersetzt den Virenschutz || Virtual Private Network.
Q Was ist sinnvoll bei der Vergabe von Freigaberechten? | Rechte über Gruppen vergeben und nur so viel wie nötig | Allen Vollzugriff geben | Jedem Benutzer ein eigenes Admin-Konto | Keine Rechte dokumentieren || So bleibt die Verwaltung übersichtlich und sicher.
Q Was macht NTP? | Es synchronisiert die Uhrzeit der Geräte | Es druckt Netzwerkpläne | Es vergibt MAC-Adressen | Es misst Kabellängen || Gleiche Zeit ist wichtig für Protokolle und Anmeldungen.
Q Was macht eine Firewall? | Sie filtert Netzwerkverbindungen nach Regeln | Sie kühlt den Server | Sie vergibt IP-Adressen | Sie verbindet Glasfaser || Unerwünschte Verbindungen werden blockiert.
`);
