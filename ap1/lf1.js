/* Lernfeld 1: Elektrotechnische Systeme analysieren, Funktionen prüfen und Fehler beheben
   Format:  @ id | Thementitel
            = Lernzettel-Zeile   (## Überschrift, - Liste, **fett**)
            Q Frage | richtige Antwort | falsch | falsch | falsch || Erklärung   */
LT.lf(1, `
@ grundgroessen | Elektrische Grundgrößen
= ## Die wichtigsten Größen
= - **Spannung U** in Volt (V): Ursache für den Stromfluss, Potenzialunterschied zwischen zwei Punkten.
= - **Stromstärke I** in Ampere (A): gerichtete Bewegung von Ladungsträgern.
= - **Widerstand R** in Ohm (Ω): Hemmung des Stromflusses. **Leitwert G = 1/R** in Siemens (S).
= - **Ladung Q = I · t** in Amperesekunden (As) = Coulomb (C).
= - **Leistung P = U · I** in Watt (W). Auch P = I² · R und P = U² / R.
= - **Arbeit W = P · t** in Wattsekunden (Ws) oder Kilowattstunden (kWh).
= ## Ohmsches Gesetz
= **U = R · I**, umgestellt **I = U / R** und **R = U / I**.
= ## Stromrichtung
= Technische Stromrichtung: von **+ nach −**. Elektronen fließen in Wirklichkeit von − nach +.
= ## Vorsätze
= - k (kilo) = 10³, M (Mega) = 10⁶, m (milli) = 10⁻³, µ (mikro) = 10⁻⁶, n (nano) = 10⁻⁹
Q Welche Einheit hat die elektrische Spannung? | Volt (V) | Ampere (A) | Ohm (Ω) | Watt (W) || Spannung U wird in Volt gemessen.
Q Welche Einheit hat die elektrische Stromstärke? | Ampere (A) | Volt (V) | Coulomb (C) | Siemens (S) || Stromstärke I wird in Ampere gemessen.
Q Welche Einheit hat der elektrische Leitwert G? | Siemens (S) | Ohm (Ω) | Henry (H) | Farad (F) || G = 1/R, Einheit Siemens (S) = 1/Ω.
Q Wie lautet das ohmsche Gesetz? | U = R · I | U = R / I | I = R · U | R = U · I || Spannung = Widerstand mal Strom. Umgestellt: I = U/R, R = U/I.
Q Ein Widerstand von 100 Ω liegt an 230 V. Wie groß ist der Strom? | 2,3 A | 23 A | 0,43 A | 23 000 A || I = U / R = 230 V / 100 Ω = 2,3 A.
Q An einem Widerstand liegen 12 V, es fließen 0,5 A. Wie groß ist R? | 24 Ω | 6 Ω | 12,5 Ω | 0,04 Ω || R = U / I = 12 V / 0,5 A = 24 Ω.
Q Durch einen Widerstand von 47 Ω fließen 0,2 A. Welche Spannung fällt ab? | 9,4 V | 235 V | 0,0043 V | 47,2 V || U = R · I = 47 Ω · 0,2 A = 9,4 V.
Q Wie lautet die Formel für die elektrische Leistung? | P = U · I | P = U / I | P = R · I | P = U · t || Leistung = Spannung mal Strom. Weitere Formen: P = I² · R und P = U² / R.
Q Ein Wasserkocher nimmt an 230 V einen Strom von 8,7 A auf. Welche Leistung hat er etwa? | 2000 W | 26 W | 238,7 W | 200 W || P = U · I = 230 V · 8,7 A ≈ 2001 W ≈ 2 kW.
Q Ein Gerät mit 2 kW läuft 3 Stunden. Wie viel elektrische Arbeit wird umgesetzt? | 6 kWh | 0,67 kWh | 5 kWh | 6000 kWh || W = P · t = 2 kW · 3 h = 6 kWh.
Q Was beschreibt die elektrische Ladung Q? | Q = I · t, Einheit Amperesekunde (As) bzw. Coulomb | Q = U · I, Einheit Watt | Q = U / R, Einheit Ampere | Q = P · t, Einheit kWh || Ladung ist Strom mal Zeit: 1 C = 1 As.
Q In welche Richtung fließt der Strom nach der technischen Stromrichtung? | Von Plus nach Minus | Von Minus nach Plus | Von L nach PE | Er wechselt ständig || Technische Stromrichtung: + → −. Die Elektronen bewegen sich tatsächlich von − nach +.
Q Ein Widerstand mit 10 Ω wird von 2 A durchflossen. Welche Leistung wird in Wärme umgesetzt? | 40 W | 20 W | 5 W | 200 W || P = I² · R = (2 A)² · 10 Ω = 40 W.
Q Welche Leistung nimmt ein 529-Ω-Widerstand an 230 V auf? | 100 W | 2,3 W | 0,43 W | 121 670 W || P = U² / R = (230 V)² / 529 Ω = 52 900 / 529 = 100 W.
Q Wie viel sind 4,7 kΩ in Ohm? | 4700 Ω | 470 Ω | 0,0047 Ω | 47 000 Ω || k = 10³: 4,7 · 1000 = 4700 Ω.
Q Wie viel sind 250 mA in Ampere? | 0,25 A | 2,5 A | 25 A | 0,025 A || m = 10⁻³: 250 / 1000 = 0,25 A.
Q Strom kostet 0,35 € pro kWh. Was kostet ein 60-W-Gerät, das 10 Stunden läuft? | 0,21 € | 2,10 € | 21 € | 0,035 € || W = 0,06 kW · 10 h = 0,6 kWh. Kosten = 0,6 kWh · 0,35 €/kWh = 0,21 €.

@ schaltungen | Reihen-, Parallel- und gemischte Schaltung
= ## Reihenschaltung
= - Es gibt **nur einen Stromweg**: der Strom I ist überall gleich.
= - Gesamtwiderstand: **R = R1 + R2 + …**
= - Die Spannung teilt sich auf: **U = U1 + U2 + …** Am größten Widerstand fällt die größte Spannung ab.
= ## Parallelschaltung
= - An allen Zweigen liegt **dieselbe Spannung**.
= - Gesamtstrom: **I = I1 + I2 + …**
= - Gesamtwiderstand: **1/R = 1/R1 + 1/R2 + …**, bei zwei Widerständen **R = R1 · R2 / (R1 + R2)**.
= - Der Gesamtwiderstand ist **kleiner als der kleinste** Einzelwiderstand.
= ## Kirchhoffsche Regeln
= - **Knotenregel:** Summe der zufließenden Ströme = Summe der abfließenden Ströme.
= - **Maschenregel:** In einer geschlossenen Masche ist die Summe aller Spannungen null.
= ## Spannungsteiler (unbelastet)
= **U2 = U · R2 / (R1 + R2)**
Q Was gilt für den Strom in einer Reihenschaltung? | Er ist an jeder Stelle gleich groß | Er teilt sich auf die Widerstände auf | Er ist am größten Widerstand am größten | Er ist null || Es gibt nur einen Stromweg, deshalb ist I überall gleich.
Q Was gilt für die Spannung in einer Parallelschaltung? | An allen Zweigen liegt dieselbe Spannung | Sie teilt sich auf die Zweige auf | Sie ist am kleinsten Widerstand am größten | Sie addiert sich || Alle Zweige hängen an denselben zwei Knoten, also gleiche Spannung.
Q R1 = 100 Ω und R2 = 220 Ω sind in Reihe geschaltet. Wie groß ist der Gesamtwiderstand? | 320 Ω | 68,75 Ω | 120 Ω | 22 000 Ω || Reihe: R = R1 + R2 = 100 Ω + 220 Ω = 320 Ω.
Q Zwei Widerstände mit je 100 Ω sind parallel geschaltet. Wie groß ist der Gesamtwiderstand? | 50 Ω | 200 Ω | 100 Ω | 10 000 Ω || Zwei gleiche parallel: R/2 = 50 Ω.
Q R1 = 60 Ω und R2 = 30 Ω sind parallel geschaltet. Wie groß ist der Gesamtwiderstand? | 20 Ω | 90 Ω | 45 Ω | 1800 Ω || R = R1 · R2 / (R1 + R2) = 1800 / 90 = 20 Ω.
Q Wie verhält sich der Gesamtwiderstand einer Parallelschaltung? | Er ist kleiner als der kleinste Einzelwiderstand | Er ist größer als der größte Einzelwiderstand | Er ist die Summe aller Widerstände | Er ist gleich dem größten Widerstand || Jeder weitere Zweig ist ein zusätzlicher Stromweg, der Gesamtwiderstand sinkt.
Q Zwei gleiche Lampen sind in Reihe an 12 V. Welche Spannung liegt an jeder Lampe? | 6 V | 12 V | 24 V | 3 V || In Reihe teilt sich die Spannung. Gleiche Lampen: je die Hälfte.
Q In einer Reihenschaltung fällt eine Lampe aus (Glühfaden durchgebrannt). Was passiert? | Alle Lampen gehen aus | Nur diese Lampe geht aus | Die anderen leuchten heller | Die Sicherung löst aus || Der einzige Stromweg ist unterbrochen.
Q In einer Parallelschaltung fällt eine Lampe aus. Was passiert mit den anderen? | Sie leuchten unverändert weiter | Sie gehen alle aus | Sie leuchten schwächer | Sie leuchten doppelt so hell || Jeder Zweig liegt unabhängig an der vollen Spannung.
Q Was besagt die Knotenregel (1. Kirchhoffsche Regel)? | Summe der zufließenden Ströme = Summe der abfließenden Ströme | Summe aller Spannungen in einer Masche ist null | U = R · I | Der Strom ist überall gleich || In einem Knoten geht kein Strom verloren.
Q Was besagt die Maschenregel (2. Kirchhoffsche Regel)? | In einer geschlossenen Masche ist die Summe aller Spannungen null | In einem Knoten addieren sich die Ströme | Der Gesamtwiderstand ist die Summe | P = U · I || Quellenspannung = Summe der Teilspannungen in der Masche.
Q In einen Knoten fließen 3 A und 2 A hinein. Ein Strom von 1 A fließt heraus. Wie groß ist der zweite abfließende Strom? | 4 A | 6 A | 1 A | 5 A || 3 A + 2 A = 5 A hinein. 5 A − 1 A = 4 A.
Q Spannungsteiler: U = 12 V, R1 = 1 kΩ, R2 = 2 kΩ. Wie groß ist U2 (unbelastet)? | 8 V | 4 V | 6 V | 24 V || U2 = U · R2 / (R1 + R2) = 12 V · 2 / 3 = 8 V.
Q Reihenschaltung R1 = 40 Ω, R2 = 80 Ω an 24 V. Wie groß ist der Strom? | 0,2 A | 0,6 A | 0,3 A | 2880 A || R = 120 Ω, I = 24 V / 120 Ω = 0,2 A.
Q Gleiche Schaltung (R1 = 40 Ω, R2 = 80 Ω, 24 V): Welche Spannung liegt an R2? | 16 V | 8 V | 12 V | 24 V || U2 = I · R2 = 0,2 A · 80 Ω = 16 V. Am größeren Widerstand fällt mehr Spannung ab.
Q Parallelschaltung an 230 V: Zweig 1 nimmt 2 A, Zweig 2 nimmt 3 A auf. Wie groß ist der Gesamtstrom? | 5 A | 1 A | 6 A | 2,5 A || Parallel: I = I1 + I2 = 5 A.
Q Wie verändert sich der Gesamtstrom, wenn man zu einer Parallelschaltung einen weiteren Verbraucher dazuschaltet? | Er wird größer | Er wird kleiner | Er bleibt gleich | Er wird null || Mehr Zweige = kleinerer Gesamtwiderstand = größerer Gesamtstrom. Deshalb kann eine Steckdosenleiste überlastet werden.

@ leiter | Leiterwiderstand und Temperatur
= ## Leiterwiderstand
= **R = l / (κ · A)** oder **R = ρ · l / A**
= - l = Länge in m, A = Querschnitt in mm², κ (Kappa) = Leitfähigkeit, ρ (Rho) = spezifischer Widerstand, ρ = 1/κ
= - Kupfer: **κ ≈ 56 m/(Ω·mm²)**, ρ ≈ 0,0178 Ω·mm²/m. Aluminium: κ ≈ 35 m/(Ω·mm²).
= - Längere Leitung → größerer Widerstand. Größerer Querschnitt → kleinerer Widerstand.
= - **Achtung:** Bei einer Leitung gibt es Hin- und Rückleiter, also **doppelte Länge** rechnen.
= ## Temperatur
= - Metalle sind **Kaltleiter**: Ihr Widerstand steigt mit der Temperatur.
= - **ΔR = R20 · α · Δϑ**, Kupfer α ≈ 0,0039 1/K.
= - Kaltleiter = **PTC**, Heißleiter = **NTC** (Widerstand sinkt mit steigender Temperatur).
Q Wovon hängt der Widerstand eines Leiters NICHT ab? | Von der angelegten Spannung | Von der Länge | Vom Querschnitt | Vom Material || R = l / (κ · A). Die Spannung ändert den Widerstand nicht.
Q Wie ändert sich der Leiterwiderstand, wenn die Länge verdoppelt wird? | Er verdoppelt sich | Er halbiert sich | Er bleibt gleich | Er vervierfacht sich || R ist proportional zur Länge l.
Q Wie ändert sich der Leiterwiderstand, wenn der Querschnitt verdoppelt wird? | Er halbiert sich | Er verdoppelt sich | Er bleibt gleich | Er viertelt sich || R ist umgekehrt proportional zum Querschnitt A.
Q Welche Leitfähigkeit κ hat Kupfer ungefähr? | 56 m/(Ω·mm²) | 35 m/(Ω·mm²) | 0,0178 m/(Ω·mm²) | 5,6 m/(Ω·mm²) || Kupfer ≈ 56, Aluminium ≈ 35 m/(Ω·mm²).
Q Wie groß ist der Widerstand eines Kupferdrahts mit 28 m Länge und 1 mm² Querschnitt? | 0,5 Ω | 2 Ω | 1568 Ω | 0,05 Ω || R = l / (κ · A) = 28 / (56 · 1) = 0,5 Ω.
Q Eine Zuleitung ist 20 m lang (Kupfer, 1,5 mm²). Wie groß ist der Widerstand von Hin- und Rückleiter zusammen? | ≈ 0,48 Ω | ≈ 0,24 Ω | ≈ 1680 Ω | ≈ 0,02 Ω || Leiterlänge = 2 · 20 m = 40 m. R = 40 / (56 · 1,5) ≈ 0,48 Ω.
Q Wie verhält sich der Widerstand von Kupfer bei steigender Temperatur? | Er steigt | Er sinkt | Er bleibt konstant | Er wird null || Metalle sind Kaltleiter (positiver Temperaturkoeffizient).
Q Was ist ein NTC-Widerstand? | Ein Heißleiter: Der Widerstand sinkt bei steigender Temperatur | Ein Kaltleiter: Der Widerstand steigt bei steigender Temperatur | Ein lichtabhängiger Widerstand | Ein spannungsabhängiger Widerstand || NTC = Negative Temperature Coefficient = Heißleiter.
Q Was ist ein PTC-Widerstand? | Ein Kaltleiter: Der Widerstand steigt bei steigender Temperatur | Ein Heißleiter | Ein Fotowiderstand | Ein Varistor || PTC = Positive Temperature Coefficient = Kaltleiter.
Q Welcher Zusammenhang besteht zwischen ρ und κ? | ρ = 1 / κ | ρ = κ² | ρ = κ · A | Es gibt keinen Zusammenhang || Spezifischer Widerstand und Leitfähigkeit sind Kehrwerte voneinander.

@ messen | Messen mit Multimeter und Oszilloskop
= ## Grundregeln
= - **Spannung** wird **parallel** zum Bauteil gemessen. Spannungsmesser haben einen **sehr großen Innenwiderstand**.
= - **Strom** wird **in Reihe** gemessen: Der Stromkreis muss aufgetrennt werden. Strommesser haben einen **sehr kleinen Innenwiderstand**.
= - **Widerstand** nur im **spannungsfreien** Zustand messen, Bauteil möglichst ausgebaut.
= - Bei unbekannter Größe mit dem **größten Messbereich** beginnen.
= - Bei Strommessung im Spannungsbereich gemessen → Kurzschluss-Gefahr!
= ## Messkategorien (CAT)
= - **CAT II:** Geräte an der Steckdose
= - **CAT III:** Gebäudeinstallation, Verteiler
= - **CAT IV:** Ursprung der Installation (Hausanschluss, Zähler)
= ## Spannungsprüfer
= Spannungsfreiheit wird mit einem **zweipoligen Spannungsprüfer** festgestellt, nicht mit einem einpoligen „Phasenprüfer“.
= ## Oszilloskop
= Zeigt den **Verlauf einer Spannung über die Zeit**. Ablesen: Kästchen × V/div (senkrecht) und Kästchen × ms/div (waagerecht).
Q Wie wird ein Spannungsmesser angeschlossen? | Parallel zum Bauteil | In Reihe zum Bauteil | Zwischen L und PE immer | Nur im spannungsfreien Zustand || Die Spannung liegt zwischen zwei Punkten an, deshalb parallel messen.
Q Wie wird ein Strommesser angeschlossen? | In Reihe, der Stromkreis wird dafür aufgetrennt | Parallel zum Verbraucher | Parallel zur Spannungsquelle | Zwischen N und PE || Der zu messende Strom muss durch das Messgerät fließen.
Q Welchen Innenwiderstand sollte ein Spannungsmesser haben? | Sehr groß | Sehr klein | Genau 0 Ω | Genau 1 kΩ || Damit er die Schaltung kaum belastet und nur sehr wenig Strom aufnimmt.
Q Welchen Innenwiderstand sollte ein Strommesser haben? | Sehr klein | Sehr groß | Unendlich groß | Genau so groß wie der Verbraucher || Damit an ihm kaum Spannung abfällt und der Strom nicht verfälscht wird.
Q Was passiert, wenn man mit dem Multimeter im Strommessbereich direkt an eine Steckdose geht? | Kurzschluss: Die Sicherung im Messgerät oder in der Anlage löst aus | Es wird die Netzspannung angezeigt | Es passiert nichts | Das Gerät misst den Widerstand || Im Strombereich ist das Messgerät fast ein Kurzschluss.
Q Wann darf ein Widerstand mit dem Ohmmeter gemessen werden? | Nur im spannungsfreien Zustand | Nur unter Spannung | Nur bei Wechselspannung | Jederzeit || Fremdspannung verfälscht die Messung und kann das Messgerät beschädigen.
Q Mit welchem Messbereich beginnt man, wenn die Größe unbekannt ist? | Mit dem größten | Mit dem kleinsten | Mit dem mittleren | Das ist egal || So wird das Messgerät nicht überlastet. Danach schrittweise kleiner schalten.
Q Welches Messgerät nutzt man, um die Spannungsfreiheit festzustellen? | Zweipoliger Spannungsprüfer | Einpoliger Phasenprüfer | Isolationsmessgerät | Zangenamperemeter || Der zweipolige Spannungsprüfer ist dafür vorgesehen. Ein einpoliger Prüfer ist nicht zuverlässig.
Q Für welchen Bereich gilt die Messkategorie CAT III? | Gebäudeinstallation und Verteiler | Ursprung der Installation (Hausanschluss) | Geräte an der Steckdose | Batteriebetriebene Schaltungen || CAT II: Steckdosengeräte, CAT III: Gebäudeinstallation, CAT IV: Hausanschluss.
Q Was zeigt ein Oszilloskop an? | Den zeitlichen Verlauf einer Spannung | Nur den Effektivwert | Den Widerstand eines Bauteils | Den Isolationswiderstand || Senkrecht die Spannung, waagerecht die Zeit.
Q Oszilloskop: Eine Periode ist 4 Kästchen breit, Zeitbasis 5 ms/div. Wie groß ist die Frequenz? | 50 Hz | 20 Hz | 200 Hz | 5 Hz || T = 4 · 5 ms = 20 ms. f = 1/T = 1 / 0,02 s = 50 Hz.
Q Oszilloskop: Der Scheitelwert ist 3 Kästchen hoch, Einstellung 2 V/div. Wie groß ist der Scheitelwert? | 6 V | 1,5 V | 5 V | 3 V || 3 Kästchen · 2 V/div = 6 V.

@ gefahren | Gefahren des Stroms und Sicherheitsregeln
= ## Wirkung auf den Menschen
= Die Gefahr hängt von **Stromstärke, Einwirkdauer und Stromweg** durch den Körper ab.
= - ab ca. **0,5 mA** spürbar
= - ab ca. **10 mA** Muskelverkrampfung, Loslassen oft nicht mehr möglich
= - ab ca. **50 mA** Lebensgefahr durch **Herzkammerflimmern**
= - zusätzlich: Verbrennungen, Lichtbogen, Sturz durch Schreckreaktion
= ## Grenzwerte
= Dauernd zulässige Berührungsspannung: **50 V AC**, **120 V DC**. RCD für zusätzlichen Schutz: **30 mA**.
= ## Die 5 Sicherheitsregeln (DIN VDE 0105-100), Reihenfolge!
= - 1. Freischalten
= - 2. Gegen Wiedereinschalten sichern
= - 3. Spannungsfreiheit feststellen (allpolig)
= - 4. Erden und kurzschließen
= - 5. Benachbarte, unter Spannung stehende Teile abdecken oder abschranken
= Nach der Arbeit in **umgekehrter Reihenfolge** aufheben.
= ## Personen
= - **Elektrofachkraft:** fachliche Ausbildung, Kenntnisse und Erfahrung, kann Gefahren selbst beurteilen.
= - **Elektrotechnisch unterwiesene Person (EuP):** von einer Elektrofachkraft unterwiesen, arbeitet unter Leitung und Aufsicht.
= - Vorschrift: **DGUV Vorschrift 3** „Elektrische Anlagen und Betriebsmittel“.
= ## Erste Hilfe beim Stromunfall
= Eigenschutz: Stromkreis unterbrechen. Notruf **112**. Bei Atem-/Kreislaufstillstand Herz-Lungen-Wiederbelebung. Nach jedem Stromunfall zum Arzt, Herzrhythmusstörungen können verzögert auftreten.
Q Wovon hängt die Gefährdung durch elektrischen Strom im Körper ab? | Stromstärke, Einwirkdauer und Stromweg | Nur von der Spannung | Nur von der Frequenz | Nur von der Leitungslänge || Entscheidend sind wie viel Strom, wie lange und auf welchem Weg (z. B. über das Herz) fließt.
Q Ab welcher Stromstärke besteht Lebensgefahr durch Herzkammerflimmern? | Ab etwa 50 mA | Ab etwa 0,5 mA | Ab etwa 5 A | Erst ab 1 A || Grobe Richtwerte: 0,5 mA spürbar, 10 mA Loslassgrenze, ab ca. 50 mA Herzkammerflimmern.
Q Was passiert ab etwa 10 mA Körperstrom? | Muskeln verkrampfen, Loslassen ist oft nicht mehr möglich | Der Strom ist kaum spürbar | Sofortiger Herzstillstand | Nichts, das ist ungefährlich || Das ist die sogenannte Loslassgrenze.
Q Wie hoch ist die dauernd zulässige Berührungsspannung bei Wechselspannung? | 50 V | 120 V | 230 V | 12 V || 50 V AC und 120 V DC sind die allgemeinen Grenzwerte.
Q Wie hoch ist die dauernd zulässige Berührungsspannung bei Gleichspannung? | 120 V | 50 V | 24 V | 230 V || Bei Gleichspannung (oberschwingungsfrei) gilt 120 V.
Q Welche ist die 1. der 5 Sicherheitsregeln? | Freischalten | Spannungsfreiheit feststellen | Erden und kurzschließen | Abdecken || Reihenfolge: Freischalten, Sichern, Spannungsfreiheit feststellen, Erden und Kurzschließen, Abdecken.
Q Welche ist die 2. der 5 Sicherheitsregeln? | Gegen Wiedereinschalten sichern | Freischalten | Erden und kurzschließen | Spannungsfreiheit feststellen || Zum Beispiel LS ausschalten, mit Sperrelement und Schild sichern.
Q Welche ist die 3. der 5 Sicherheitsregeln? | Spannungsfreiheit allpolig feststellen | Freischalten | Abdecken | Erden und kurzschließen || Mit zweipoligem Spannungsprüfer an der Arbeitsstelle.
Q Welche ist die 4. der 5 Sicherheitsregeln? | Erden und kurzschließen | Gegen Wiedereinschalten sichern | Abdecken | Freischalten || Erst erden, dann kurzschließen. In Niederspannungsanlagen oft nicht nötig, muss aber geprüft werden.
Q Welche ist die 5. der 5 Sicherheitsregeln? | Benachbarte, unter Spannung stehende Teile abdecken oder abschranken | Freischalten | Spannungsfreiheit feststellen | Gegen Wiedereinschalten sichern || Schutz vor zufälligem Berühren von Teilen, die noch Spannung führen.
Q In welcher Reihenfolge werden die 5 Sicherheitsregeln nach der Arbeit aufgehoben? | In umgekehrter Reihenfolge | In derselben Reihenfolge | Beliebig | Sie müssen nicht aufgehoben werden || Zuletzt wird wieder eingeschaltet.
Q Was ist eine elektrotechnisch unterwiesene Person (EuP)? | Eine von einer Elektrofachkraft unterwiesene Person, die unter Leitung und Aufsicht arbeitet | Eine Person mit Meisterprüfung | Jeder Mitarbeitende im Betrieb | Eine Person, die alle Arbeiten selbstständig ausführt || EuP dürfen nur übertragene Aufgaben unter Leitung und Aufsicht einer Elektrofachkraft erledigen.
Q Welche Unfallverhütungsvorschrift gilt für elektrische Anlagen und Betriebsmittel? | DGUV Vorschrift 3 | DIN EN 54 | DSGVO | DIN 18015-3 || DGUV Vorschrift 3 „Elektrische Anlagen und Betriebsmittel“.
Q Was tust du bei einem Stromunfall zuerst? | Eigenschutz: Stromkreis unterbrechen, ohne die Person direkt zu berühren | Die Person sofort an der Hand wegziehen | Wasser über die Person gießen | Abwarten, bis sie sich selbst befreit || Erst den Stromkreis unterbrechen, dann Notruf 112 und Erste Hilfe.
Q Warum muss nach einem Stromunfall immer ein Arzt aufgesucht werden? | Herzrhythmusstörungen können auch Stunden später auftreten | Nur für die Versicherung | Weil die Haut immer verbrannt ist | Das ist nicht nötig, wenn man sich gut fühlt || Auch ohne Beschwerden kann es verzögert zu gefährlichen Herzrhythmusstörungen kommen.

@ plaene | Schaltzeichen, Schaltpläne und Kennzeichnung
= ## Schaltplanarten
= - **Übersichtsschaltplan:** vereinfacht, meist **einpolig**, zeigt den Aufbau einer Anlage.
= - **Stromlaufplan in aufgelöster Darstellung:** Strompfade nebeneinander, gut zum Verstehen der Funktion.
= - **Stromlaufplan in zusammenhängender Darstellung:** Bauteile zusammenhängend gezeichnet.
= - **Installationsplan:** Lage der Betriebsmittel im **Grundriss**.
= - **Blockschaltbild:** Funktionseinheiten als Blöcke mit Signalfluss.
= ## Kennbuchstaben (DIN EN 81346-2)
= - **E** Leuchte, Heizung · **F** Schutz (Sicherung, RCD) · **G** Spannungsquelle (Batterie, Generator)
= - **K** Relais, Hilfsschütz · **M** Motor · **P** Anzeige, Messgerät · **Q** Leistungsschalter, Schütz, LS
= - **R** Widerstand · **S** Schalter, Taster · **T** Transformator · **X** Klemme, Steckdose · **W** Leitung
= ## Aderfarben
= **L** braun, schwarz, grau · **N** blau · **PE** grün-gelb
Q Welcher Plan zeigt die Lage der Betriebsmittel im Grundriss eines Gebäudes? | Installationsplan | Stromlaufplan in aufgelöster Darstellung | Blockschaltbild | Wirkschaltplan || Der Installationsplan zeigt, wo Schalter, Steckdosen und Leuchten im Raum sitzen.
Q Welcher Plan eignet sich am besten, um die Funktion einer Schaltung Strompfad für Strompfad zu verstehen? | Stromlaufplan in aufgelöster Darstellung | Installationsplan | Übersichtsschaltplan | Lageplan || In der aufgelösten Darstellung liegen die Strompfade übersichtlich nebeneinander.
Q Wie wird ein Übersichtsschaltplan meist gezeichnet? | Einpolig, vereinfacht | Allpolig mit allen Adern | Nur mit Fotos | Als Grundriss || Er gibt einen schnellen Überblick über den Aufbau.
Q Welcher Kennbuchstabe steht für eine Leuchte? | E | L | P | H || E steht für Betriebsmittel, die Licht oder Wärme erzeugen.
Q Welcher Kennbuchstabe steht für einen Schalter oder Taster? | S | Q | K | T || S für manuell betätigte Signalgeber wie Schalter und Taster.
Q Welcher Kennbuchstabe steht für eine Schutzeinrichtung wie Sicherung oder RCD? | F | S | E | P || F für Schutzfunktionen.
Q Welcher Kennbuchstabe steht für einen Motor? | M | G | E | W || M für Motor.
Q Welcher Kennbuchstabe steht für eine Klemme oder Steckdose? | X | K | W | S || X für Verbindungen (Klemmen, Steckverbinder, Steckdosen).
Q Welche Farbe hat der Neutralleiter N? | Blau | Braun | Grün-gelb | Schwarz || N ist blau.
Q Welche Farbe hat der Schutzleiter PE? | Grün-gelb | Blau | Braun | Grau || PE ist immer grün-gelb, und grün-gelb darf für nichts anderes verwendet werden.
Q Welche Farben sind für Außenleiter üblich? | Braun, schwarz, grau | Blau, grün-gelb, braun | Nur rot | Grün und gelb || L1 braun, L2 schwarz, L3 grau.

@ fehlersuche | Funktionsprüfung und Fehlersuche
= ## Systematisch vorgehen
= - 1. **Fehler beschreiben lassen**: Was geht nicht? Seit wann? Was wurde verändert?
= - 2. **Unterlagen lesen**: Schaltplan, Bedienungsanleitung, Datenblatt.
= - 3. **Sichtprüfung**: lose Klemmen, verschmorte Stellen, ausgelöste Schutzeinrichtungen.
= - 4. **Messen** von der Quelle zum Verbraucher oder Schaltung halbieren.
= - 5. Fehler beheben, **Funktion prüfen**, **dokumentieren**.
= ## Typische Fehler
= - **Unterbrechung:** Über der Unterbrechungsstelle liegt die **volle Spannung**, es fließt kein Strom.
= - **Kurzschluss:** Sehr großer Strom, Überstromschutz löst aus.
= - **Körperschluss:** Verbindung von aktivem Leiter zum Gehäuse.
= - **Erdschluss:** Verbindung von aktivem Leiter zur Erde.
Q In einem Stromkreis ist eine Unterbrechung. Was misst man über der Unterbrechungsstelle? | Die volle Quellenspannung | 0 V | Die halbe Spannung | Einen sehr großen Strom || Es fließt kein Strom, also fällt an den anderen Bauteilen keine Spannung ab. Die ganze Spannung liegt an der Unterbrechung.
Q Was ist ein Kurzschluss? | Eine nahezu widerstandslose Verbindung zwischen spannungsführenden Leitern | Eine Unterbrechung im Stromkreis | Ein zu großer Widerstand | Ein Verbraucher in Reihe || Der Strom wird sehr groß, die Schutzeinrichtung muss abschalten.
Q Was ist ein Körperschluss? | Eine leitende Verbindung zwischen einem aktiven Leiter und dem Gehäuse eines Betriebsmittels | Eine Verbindung zwischen L und N | Ein Bruch im Neutralleiter | Ein Fehler in der Software || Das Gehäuse kann dann gefährliche Berührungsspannung führen.
Q Was steht bei der systematischen Fehlersuche am Anfang? | Fehler genau beschreiben lassen und Unterlagen sichten | Sofort Bauteile tauschen | Die Anlage neu verdrahten | Den Kunden nach Hause schicken || Erst informieren, dann planen, dann messen.
Q Was gehört nach einer Reparatur unbedingt dazu? | Funktionsprüfung und Dokumentation | Nur die Rechnung | Nichts, wenn es wieder funktioniert | Eine neue Anlage verkaufen || Die Prüfung zeigt, dass alles sicher funktioniert, die Doku macht es nachvollziehbar.
`);
