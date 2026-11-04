/* Lernfeld 12: Multimedia- und serverbasierte Systeme einrichten und administrieren */
LT.lf(12, `
@ medien | Bild, Ton und Medientechnik
= ## Bild
= - Auflösungen: **HD 1280 × 720**, **Full HD 1920 × 1080**, **4K UHD 3840 × 2160**. Seitenverhältnis meist **16:9**.
= - **Bildwiederholrate** in Hz (z. B. 60 Hz). **HDMI** (Bild + Ton, Kopierschutz HDCP, Rückkanal ARC/eARC), **DisplayPort** (vor allem PCs).
= - **Beamer:** Helligkeit in **ANSI-Lumen**, je heller der Raum, desto mehr Lumen nötig.
= ## Ton
= - **Abtastrate:** CD **44,1 kHz**, Video **48 kHz**. Sie muss mehr als das **Doppelte** der höchsten Frequenz sein (Abtasttheorem).
= - **Bittiefe:** CD 16 Bit. Formate: **WAV/FLAC** verlustfrei, **MP3/AAC** verlustbehaftet komprimiert.
= ## Video
= Codecs **H.264 (AVC)** und **H.265 (HEVC)**, H.265 braucht bei gleicher Qualität etwa halb so viel Datenrate.
= ## Drucker
= **Laserdrucker:** schnell, günstig pro Seite, Toner. **Tintenstrahldrucker:** gut für Fotos, Tinte kann eintrocknen.
Q Welche Auflösung hat Full HD? | 1920 × 1080 | 1280 × 720 | 3840 × 2160 | 1024 × 768 || 4K UHD hat 3840 × 2160.
Q Welche Auflösung hat 4K UHD? | 3840 × 2160 | 1920 × 1080 | 4096 × 4096 | 2560 × 1440 || Viermal so viele Pixel wie Full HD.
Q Welche Abtastrate hat eine Audio-CD? | 44,1 kHz | 48 kHz | 22 kHz | 96 kHz || Video nutzt meist 48 kHz.
Q Was besagt das Abtasttheorem? | Die Abtastrate muss mehr als doppelt so hoch sein wie die höchste Signalfrequenz | Abtastrate und Frequenz müssen gleich sein | Je niedriger, desto besser | Die Abtastrate ist egal || Menschen hören bis ca. 20 kHz, deshalb 44,1 kHz.
Q Welches Audioformat ist verlustfrei komprimiert? | FLAC | MP3 | AAC | OGG Vorbis || MP3 und AAC lassen unhörbare Anteile weg.
Q In welcher Einheit gibt man die Helligkeit eines Beamers an? | ANSI-Lumen | Lux | Candela pro Watt | Hertz || Lux misst die Beleuchtungsstärke auf einer Fläche.
Q Welche Schnittstelle überträgt Bild und Ton und hat einen Audio-Rückkanal (ARC)? | HDMI | VGA | DVI | USB 2.0 || eARC ist die verbesserte Version.
Q Welchen Vorteil hat H.265 gegenüber H.264? | Etwa halbe Datenrate bei gleicher Qualität | Es ist ein Audioformat | Es braucht keine Rechenleistung | Es ist unkomprimiert || Wichtig für 4K-Streaming.

@ server | Server, Dienste und Virtualisierung
= - **Client-Server:** Clients fordern Dienste an, Server stellen sie bereit (Datei-, Druck-, Web-, Mail-, DHCP-, DNS-Server).
= - **NAS:** Netzwerkspeicher mit eigenem Betriebssystem, oft mit RAID.
= - **Virtualisierung:** mehrere **virtuelle Maschinen (VM)** auf einer Hardware. **Hypervisor Typ 1** läuft direkt auf der Hardware (bare metal), **Typ 2** läuft auf einem Betriebssystem.
= - **Snapshot:** Momentaufnahme einer VM zum Zurückspringen. Ersetzt keine Datensicherung.
= - **Container** teilen sich den Kernel des Host-Systems und sind leichter als VMs.
= - **Datenschutz und Urheberrecht** bei Medien: Nur Inhalte verteilen, für die Rechte bestehen.
Q Was ist ein NAS? | Ein Netzwerkspeicher, auf den mehrere Geräte zugreifen | Ein Netzteil | Ein Antennenverstärker | Ein Betriebssystem für Handys || Network Attached Storage.
Q Was ist ein Hypervisor vom Typ 1? | Er läuft direkt auf der Hardware (bare metal) | Er läuft als Programm unter Windows | Ein Virenscanner | Ein Router || Typ 2 läuft auf einem vorhandenen Betriebssystem.
Q Was ist ein Vorteil von Virtualisierung? | Mehrere Server laufen auf einer Hardware, das spart Geräte und Energie | Jede VM braucht ein eigenes Gehäuse | Es gibt keine Updates mehr | Daten werden automatisch gesichert || Außerdem lassen sich VMs leicht verschieben und sichern.
Q Ersetzt ein Snapshot eine Datensicherung? | Nein, er liegt auf demselben System und schützt nicht vor dessen Ausfall | Ja, immer | Nur bei Linux | Ja, wenn er täglich gemacht wird || Snapshots sind praktisch vor Updates, aber kein Backup.
Q Was unterscheidet Container von virtuellen Maschinen? | Container teilen sich den Kernel des Hosts und sind dadurch leichter | Container brauchen eigene Hardware | Container sind immer größer | Es gibt keinen Unterschied || Beispiel: Docker.
Q Welcher Server vergibt automatisch IP-Adressen? | DHCP-Server | DNS-Server | Webserver | Mailserver || DNS löst Namen auf.
`);
