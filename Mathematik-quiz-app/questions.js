(() => {
  "use strict";

  window.MATHE_CATEGORIES = [
    { id: "aenderung", label: "Änderungsraten & Differenzenquotient" },
    { id: "funktionen", label: "Elementarfunktionen & Transformationen" },
    { id: "ableitung", label: "Ableitungsregeln" },
    { id: "kurven", label: "Kurvendiskussion, Tangente & Normale" },
    { id: "anwendung", label: "Extremwertaufgaben & Ortskurven" },
    { id: "folgen", label: "Zahlenfolgen & Grenzwerte" }
  ];
  window.MATHE_QUESTION_TOPICS = window.MATHE_CATEGORIES;

  const questions = [
    ["aenderung", "Wie groß ist die mittlere Änderungsrate von f(x) = x² zwischen x = 1 und x = 3?", ["4", "2", "6", "8"], "f(3) = 9 und f(1) = 1; (9 − 1)/(3 − 1) = 4.", "Funktionswertdifferenz durch Abstand der x-Werte.", "Nicht nur die Differenz der Funktionswerte verwenden.", "leicht"],
    ["aenderung", "Welche Formel beschreibt die mittlere Änderungsrate zwischen x₁ und x₂?", ["(f(x₂) − f(x₁))/(x₂ − x₁)", "(x₂ − x₁)/(f(x₂) − f(x₁))", "f(x₂) − f(x₁)", "f′(x₁) + f′(x₂)"], "Der Differenzenquotient ist die Steigung der Sekante; x₁ und x₂ müssen verschieden sein.", "Sekantensteigung = Höhenänderung durch Breitenänderung.", "Zähler und Nenner nicht vertauschen.", "leicht"],
    ["aenderung", "Was beschreibt f′(x₀) geometrisch?", ["Die Tangentensteigung an x₀.", "Die Fläche unter dem Graphen.", "Immer die Sekantensteigung zwischen zwei festen Punkten.", "Die x-Koordinate eines Extrempunkts."], "Die Ableitung ist der Grenzwert der Sekantensteigungen und damit die Tangentensteigung.", "Betrachte den Grenzfall sehr naher Punkte.", "Eine lokale Steigung ist keine Fläche.", "leicht"],
    ["aenderung", "Welcher Ausdruck ist der Differenzenquotient an x₀ mit Schrittweite h ≠ 0?", ["(f(x₀ + h) − f(x₀))/h", "(f(x₀) − f(h))/x₀", "f(x₀ + h)/h", "(f(x₀ + h) + f(x₀))/h"], "Die Differenz der Funktionswerte wird durch die Änderung h der Eingabe geteilt.", "Setze x₂ = x₀ + h und x₁ = x₀.", "Der zweite Funktionswert wird subtrahiert.", "leicht"],
    ["aenderung", "Wie lautet der Differenzenquotient für f(x) = x² an x₀ = 2 nach dem Kürzen?", ["4 + h", "4", "2 + h", "4h"], "(2 + h)² − 4 = 4h + h²; für h ≠ 0 folgt 4 + h.", "Verwende die erste binomische Formel.", "(2 + h)² ist nicht 4 + h².", "mittel"],
    ["aenderung", "Welcher Grenzwert ergibt sich für f(x) = x² an x₀ = 2?", ["4", "0", "2", "Unendlich"], "Der Differenzenquotient ist 4 + h und strebt für h → 0 gegen 4.", "Erst kürzen, dann den Grenzwert bestimmen.", "Im ursprünglichen Bruch darf h nicht direkt null gesetzt werden.", "mittel"],
    ["aenderung", "Welchen Differenzenquotienten erhält man für f(x) = x² an einer beliebigen Stelle x₀ nach dem Kürzen?", ["2x₀ + h", "x₀ + h", "2x₀", "x₀² + h"], "(x₀ + h)² − x₀² = 2x₀h + h²; für h ≠ 0 ergibt die Division durch h den Ausdruck 2x₀ + h.", "Entwickle die binomische Formel und klammere h aus.", "Erst der Grenzwert für h → 0 ist 2x₀.", "mittel"],
    ["aenderung", "Ein Weg steigt von 20 m auf 80 m in 5 s. Wie groß ist die mittlere Geschwindigkeit?", ["12 m/s", "16 m/s", "60 m/s", "5 m/s"], "(80 − 20) m / 5 s = 12 m/s.", "Berechne die Wegänderung pro Zeitänderung.", "80 m ist der Endwert, nicht die zurückgelegte Änderung.", "mittel"],
    ["aenderung", "Was ist die Einheit von K′(x), wenn K in Euro und x in Stück gemessen wird?", ["Euro pro Stück", "Stück pro Euro", "Euro", "Stück"], "Eine Änderungsrate hat die Einheit der Ausgangsgröße geteilt durch die Einheit der Eingangsgröße.", "Einheiten von Zähler und Nenner vergleichen.", "K′(x) ist nicht selbst der gesamte Kostenbetrag.", "mittel"],
    ["aenderung", "Welche Aussage über h im Differenzenquotienten ist richtig?", ["Beim Quotienten gilt h ≠ 0; im Grenzwert nähert sich h der Null.", "Man setzt immer sofort h = 0 ein.", "h muss eine positive ganze Zahl sein.", "h ist stets gleich x₀."], "Der Quotient ist für h = 0 nicht definiert, kann aber einen Grenzwert dort besitzen.", "Unterscheide Definitionswert und Grenzwert.", "Ein Grenzwert erfordert keine Division durch null.", "mittel"],
    ["aenderung", "Für f(x) = 3x + 1: Wie groß ist die mittlere Änderungsrate auf jedem Intervall mit verschiedenen Endpunkten?", ["3", "1", "3x + 1", "0"], "Eine lineare Funktion mit Steigung 3 hat auf jedem solchen Intervall die mittlere Änderungsrate 3.", "Geraden besitzen konstante Steigung.", "Der y-Achsenabschnitt ist nicht die Steigung.", "leicht"],

    ["funktionen", "Welcher Definitionsbereich gilt für √x über den reellen Zahlen?", ["x ≥ 0", "x > 0", "x ≠ 0", "Alle reellen x"], "Die reelle Quadratwurzel ist für nichtnegative Argumente definiert.", "Welche Werte darf das Radikand annehmen?", "Null ist bei √x erlaubt.", "leicht"],
    ["funktionen", "Welcher Definitionsbereich gilt für ln(x)?", ["x > 0", "x ≥ 0", "x ≠ 0", "Alle reellen x"], "Der natürliche Logarithmus ist reell nur für positive Argumente definiert.", "Der Logarithmus ist die Umkehrfunktion von eˣ.", "ln(0) ist nicht definiert.", "leicht"],
    ["funktionen", "Wie entsteht f(x) = (x − 3)² aus g(x) = x²?", ["Verschiebung um 3 nach rechts.", "Verschiebung um 3 nach links.", "Verschiebung um 3 nach oben.", "Spiegelung an der x-Achse."], "Der Scheitel verschiebt sich von (0|0) nach (3|0).", "Wann ist der Klammerausdruck null?", "Das Minus in der Klammer bedeutet hier rechts, nicht links.", "leicht"],
    ["funktionen", "Welche Wirkung hat der Faktor −2 vor g(x)?", ["Spiegelung an der x-Achse und vertikale Streckung mit Faktor 2.", "Spiegelung an der y-Achse und Streckung mit Faktor 2.", "Verschiebung um 2 nach unten.", "Horizontale Stauchung mit Faktor 2."], "Alle y-Werte werden mit −2 multipliziert.", "Der Faktor steht außerhalb der Funktion.", "Vertikale und horizontale Transformation nicht verwechseln.", "mittel"],
    ["funktionen", "Wie verändert g(2x) den Graphen von g(x)?", ["Horizontale Stauchung auf die halbe Breite.", "Horizontale Streckung auf die doppelte Breite.", "Vertikale Streckung um Faktor 2.", "Verschiebung um 2 nach rechts."], "Für denselben g-Eingabewert genügt der halbe x-Wert.", "Vergleiche, bei welchem x das ursprüngliche Argument erreicht wird.", "Der innere Faktor wirkt horizontal reziprok.", "mittel"],
    ["funktionen", "Wie wird (u|v) auf dem Graphen von g bei f(x) = a·g(b(x − c)) + d mit b ≠ 0 abgebildet?", ["(c + u/b | a·v + d)", "(bu + c | av + d)", "(u/b − c | av − d)", "(a·u + d | b·v + c)"], "Aus b(x − c) = u folgt x = c + u/b; der neue y-Wert ist av + d.", "Setze das innere Argument gleich u.", "Der horizontale Faktor ist 1/b.", "schwer"],
    ["funktionen", "Welche Eigenschaft besitzt eˣ für alle reellen x?", ["eˣ ist positiv.", "eˣ hat eine Nullstelle bei x = 0.", "eˣ ist stets negativ.", "eˣ ist nur für x > 0 definiert."], "Die Exponentialfunktion eˣ ist für alle reellen x definiert und immer positiv.", "Beachte e⁰ = 1.", "Der Definitionsbereich von ln x gilt nicht für eˣ.", "leicht"],
    ["funktionen", "Welche Periode besitzen sin(x) und cos(x)?", ["2π", "π/2", "1", "4π als kleinste positive Periode"], "Beide Funktionen wiederholen ihre Werte nach 2π.", "Ein vollständiger Umlauf hat 2π Radiant.", "π ist keine Periode von sin und cos.", "leicht"],
    ["funktionen", "Was bewirkt g(−x)?", ["Spiegelung des Graphen an der y-Achse.", "Spiegelung an der x-Achse.", "Verschiebung nach links.", "Vertikale Streckung."], "Das Argument −x vertauscht die Positionen x und −x.", "Das Minus steht innerhalb der Funktion.", "−g(x) spiegelt dagegen an der x-Achse.", "mittel"],
    ["funktionen", "Welche Transformation beschreibt g(x) + 4?", ["Verschiebung um 4 nach oben.", "Verschiebung um 4 nach rechts.", "Vertikale Streckung mit Faktor 4.", "Verschiebung um 4 nach unten."], "Zu jedem Funktionswert wird 4 addiert.", "Verändert wird der y-Wert.", "Eine Verschiebung in x-Richtung steht im Argument.", "leicht"],

    ["ableitung", "Was ist die Ableitung von f(x) = 7?", ["0", "7", "x", "1"], "Eine konstante Funktion hat überall Steigung 0.", "Die Höhe ändert sich nicht.", "Eine Konstante leitet sich nicht zu sich selbst ab.", "leicht"],
    ["ableitung", "Was ist die Ableitung von x⁵?", ["5x⁴", "x⁴", "5x⁵", "4x⁵"], "Die Potenzregel lautet (xⁿ)′ = n·xⁿ⁻¹.", "Exponent vorziehen und um eins verringern.", "Der neue Exponent ist 4, nicht 5.", "leicht"],
    ["ableitung", "Was ist die Ableitung von 1/x für x ≠ 0?", ["−1/x²", "1/x²", "ln(x)", "−1/x"], "1/x = x⁻¹ und somit ist die Ableitung −x⁻² = −1/x².", "Schreibe den Bruch als Potenz.", "Das Minus aus dem negativen Exponenten beachten.", "mittel"],
    ["ableitung", "Was ist die Ableitung von √x für x > 0?", ["1/(2√x)", "2√x", "1/√x", "√x/2"], "√x = x^(1/2), also f′(x) = ½x^(−1/2).", "Wende die Potenzregel auf x^(1/2) an.", "Am Rand x = 0 ist diese Ableitungsformel nicht definiert.", "mittel"],
    ["ableitung", "Welche Produktregel ist richtig?", ["(uv)′ = u′v + uv′", "(uv)′ = u′v′", "(uv)′ = u′ + v′", "(uv)′ = uv′ − u′v"], "Jeder Faktor wird einmal abgeleitet, während der andere unverändert bleibt.", "Es entstehen zwei Summanden.", "Nicht beide Faktoren gleichzeitig ableiten.", "mittel"],
    ["ableitung", "Was ist die Ableitung von x·eˣ?", ["eˣ + x·eˣ", "eˣ", "x·eˣ", "x²·eˣ"], "Produktregel: 1·eˣ + x·eˣ.", "Leite beide Faktoren nacheinander ab.", "Der erste Summand fehlt häufig.", "mittel"],
    ["ableitung", "Welche Quotientenregel gilt für v(x) ≠ 0?", ["(u/v)′ = (u′v − uv′)/v²", "(u/v)′ = u′/v′", "(u/v)′ = (u′v + uv′)/v", "(u/v)′ = uv/v²"], "Die Quotientenregel hat im Zähler die Differenz u′v − uv′ und im Nenner v².", "Nenner mal Zählerableitung minus Zähler mal Nennerableitung.", "u′/v′ ist im Allgemeinen falsch.", "mittel"],
    ["ableitung", "Was ist die Ableitung von (3x + 1)⁴?", ["12(3x + 1)³", "4(3x + 1)³", "12(3x + 1)⁴", "(3x + 1)³"], "Äußere Ableitung 4(3x + 1)³ mal innere Ableitung 3 ergibt 12(3x + 1)³.", "Äußere und innere Ableitung multiplizieren.", "Den Faktor 3 der inneren Ableitung nicht vergessen.", "mittel"],
    ["ableitung", "Was ist die Ableitung von e^(2x)?", ["2e^(2x)", "e^(2x)", "eˣ", "2xe^(2x)"], "Mit der Kettenregel wird e^(2x) mit der inneren Ableitung 2 multipliziert.", "Ableitung der äußeren Exponentialfunktion mal innere Ableitung.", "Der innere Faktor 2 bleibt nicht weg.", "mittel"],
    ["ableitung", "Wie lautet die Ableitung von 2ˣ?", ["2ˣ · ln(2)", "2ˣ", "x · 2ˣ⁻¹", "2ˣ / ln(2)"], "Für a > 0 gilt (aˣ)′ = aˣ · ln(a), hier also 2ˣ · ln(2).", "Schreibe 2ˣ als e^(x·ln(2)).", "Die Potenzregel für xⁿ gilt nicht für eine variable Exponentstelle.", "mittel"],
    ["ableitung", "Was ist die Ableitung von ln(x) für x > 0?", ["1/x", "x", "eˣ", "1/ln(x)"], "Die Ableitung des natürlichen Logarithmus ist 1/x auf x > 0.", "Denke an die Umkehrfunktion der Exponentialfunktion.", "1/ln(x) ist eine andere Funktion.", "leicht"],
    ["ableitung", "Was ist die dritte Ableitung von f(x) = x⁴?", ["24x", "12x²", "24", "4x³"], "f′ = 4x³, f″ = 12x² und f‴ = 24x.", "Leite dreimal nacheinander ab.", "12x² ist erst die zweite Ableitung.", "mittel"],
    ["ableitung", "Was ist die Ableitung von sin(x)?", ["cos(x)", "−cos(x)", "−sin(x)", "sin(x)"], "Im Bogenmaß gilt (sin x)′ = cos x.", "Die Ableitung von cos x trägt ein Minus.", "Sinus und Kosinus nicht beide mit Minus ableiten.", "leicht"],

    ["kurven", "Was folgt aus f′(x) > 0 auf einem Intervall?", ["f ist dort streng monoton steigend.", "f ist dort streng monoton fallend.", "f ist dort konstant.", "f hat dort überall Extrempunkte."], "Eine positive Ableitung bedeutet auf dem Intervall streng monoton steigende Funktionswerte.", "Prüfe das Vorzeichen der Steigung.", "Positive Ableitung bedeutet nicht positive Funktionswerte.", "leicht"],
    ["kurven", "Was ist bei einem inneren Extrempunkt einer differenzierbaren Funktion notwendig?", ["f′(x₀) = 0", "f″(x₀) = 0", "f(x₀) = 0", "f‴(x₀) = 0"], "An einem inneren lokalen Extrempunkt einer differenzierbaren Funktion ist die erste Ableitung null.", "Denke an eine waagerechte Tangente.", "Die Umkehrung ist ohne weitere Prüfung falsch.", "mittel"],
    ["kurven", "Was folgt aus f′(x₀) = 0 und f″(x₀) > 0?", ["Ein lokales Minimum.", "Ein lokales Maximum.", "Sicher ein Wendepunkt.", "Keine Aussage ist möglich."], "Eine positive zweite Ableitung an einer stationären Stelle ist hinreichend für ein lokales Minimum.", "Positive Krümmung am stationären Punkt.", "f′(x₀) = 0 allein ist nicht hinreichend.", "mittel"],
    ["kurven", "Wie erkennt man einen Hochpunkt anhand des Vorzeichenwechsels von f′?", ["Von positiv nach negativ.", "Von negativ nach positiv.", "Von positiv nach positiv.", "Ohne Vorzeichenwechsel."], "Vor dem Punkt steigt und danach fällt die Funktion.", "Betrachte steigende und fallende Abschnitte.", "Negativ nach positiv beschreibt einen Tiefpunkt.", "mittel"],
    ["kurven", "Was bedeutet f″(x) < 0 auf einem Intervall?", ["Der Graph ist rechtsgekrümmt (konkav).", "Der Graph ist linksgekrümmt (konvex).", "Die Funktion ist zwingend fallend.", "Die Funktion hat dort nur negative Werte."], "Negative zweite Ableitung bedeutet fallende Steigung und Rechtskrümmung.", "Betrachte die Änderung der Steigung.", "Krümmung und Monotonie sind verschiedene Eigenschaften.", "mittel"],
    ["kurven", "Welche Aussage über f″(x₀) = 0 ist richtig?", ["Allein reicht sie nicht für einen Wendepunkt.", "Sie garantiert immer einen Wendepunkt.", "Sie garantiert einen Hochpunkt.", "Sie ist bei einem Wendepunkt nie möglich."], "Ein Krümmungswechsel muss zusätzlich geprüft werden, etwa über einen Vorzeichenwechsel von f″.", "Notwendige und hinreichende Bedingungen unterscheiden.", "Bei x⁴ ist f″(0) = 0, aber die Krümmung wechselt dort nicht.", "mittel"],
    ["kurven", "Wie lautet die Tangente an f(x) = x² im Punkt x₀ = 1?", ["t(x) = 2x − 1", "t(x) = 2x + 1", "t(x) = x + 1", "t(x) = −x + 2"], "f(1) = 1 und f′(1) = 2; t(x) = 2(x − 1) + 1 = 2x − 1.", "Benutze t(x) = f′(x₀)(x − x₀) + f(x₀).", "Die Gerade muss durch (1|1) gehen.", "mittel"],
    ["kurven", "Welche Steigung hat die Normale bei Tangentensteigung mₜ = 2?", ["−1/2", "1/2", "−2", "2"], "Für eine nicht waagerechte Tangente gilt mₙ = −1/mₜ.", "Senkrechte Geraden erfüllen mₜ·mₙ = −1.", "Vorzeichen und Kehrwert beachten.", "mittel"],
    ["kurven", "Was gilt für die Normale bei waagerechter Tangente?", ["Sie ist vertikal und hat keine endliche Steigung.", "Sie hat die Steigung 0.", "Sie hat die Steigung −1.", "Sie existiert nicht."], "Die Normale steht senkrecht zur waagerechten Tangente und ist die vertikale Gerade x = x₀.", "Eine vertikale Gerade ist keine Funktion y = mx + b.", "Nicht durch mₜ = 0 dividieren.", "schwer"],
    ["kurven", "Wo liegt der Wendepunkt von f(x) = x³?", ["(0|0)", "(1|1)", "(−1|−1)", "Es gibt keinen."], "f″(x) = 6x wechselt bei x = 0 das Vorzeichen und f(0) = 0.", "Untersuche das Vorzeichen von f″.", "Ein Wendepunkt ist nicht zwingend ein Extrempunkt.", "mittel"],

    ["anwendung", "Ein Rechteck hat Umfang 20 m und Seiten x und y. Welche Nebenbedingung gilt?", ["2x + 2y = 20", "x + y = 20", "xy = 20", "2xy = 20"], "Der Umfang ist die Summe aller vier Seiten.", "Zwei Seiten jeder Länge zählen.", "Umfang und Fläche nicht verwechseln.", "leicht"],
    ["anwendung", "Für ein Rechteck mit Umfang 20 m: Welche Zielfunktion beschreibt die Fläche?", ["A(x) = x(10 − x)", "A(x) = x(20 − x)", "A(x) = 2x + 20", "A(x) = x² + 10"], "Aus 2x + 2y = 20 folgt y = 10 − x und damit A = xy = x(10 − x).", "Löse die Nebenbedingung zuerst nach y auf.", "y ist 10 − x, nicht 20 − x.", "mittel"],
    ["anwendung", "Welche Seitenlänge maximiert die Fläche eines Rechtecks mit Umfang 20 m?", ["5 m und 5 m", "2 m und 8 m", "10 m und 10 m", "1 m und 9 m"], "A(x) = 10x − x²; A′ = 10 − 2x = 0 bei x = 5, und A″ = −2 < 0.", "Bestimme das Maximum der Zielfunktion.", "10 m und 10 m hätten Umfang 40 m.", "mittel"],
    ["anwendung", "Warum ist bei Extremwertaufgaben der zulässige Definitionsbereich wichtig?", ["Nur Werte, die die Sachbedingungen erfüllen, kommen als Lösung infrage.", "Weil eine Ableitung nur für ganzzahlige Werte gilt.", "Weil jedes Maximum bei x = 0 liegt.", "Er ist nur bei linearen Funktionen nötig."], "Längen und Materialbedingungen begrenzen den sinnvollen Bereich; auch Randwerte müssen gegebenenfalls geprüft werden.", "Welche Werte ergeben physikalisch sinnvolle Abmessungen?", "Eine rechnerische Extremstelle kann außerhalb des zulässigen Bereichs liegen.", "mittel"],
    ["anwendung", "Eine offene Kiste entsteht aus einem 10 × 10 großen Quadrat durch Ausschneiden von Quadraten der Seite x. Welches Volumen gilt?", ["V(x) = x(10 − 2x)²", "V(x) = x(10 − x)²", "V(x) = 10x²", "V(x) = 100 − 2x"], "Die Höhe ist x, die Bodenlängen sind jeweils 10 − 2x; daher V = x(10 − 2x)².", "An jeder Seite wird links und rechts je x entfernt.", "Die Bodenlänge nimmt um 2x ab.", "schwer"],
    ["anwendung", "Welcher Bereich liefert für die Kiste mit Seitenlänge 10 positive Abmessungen?", ["0 < x < 5", "0 < x < 10", "x > 5", "Alle reellen x"], "Die Höhe x und die Bodenlänge 10 − 2x müssen beide positiv sein.", "Löse x > 0 und 10 − 2x > 0.", "Bei x = 5 verschwindet der Boden.", "mittel"],
    ["anwendung", "Was beschreibt eine Ortskurve bei einer Funktionenschar?", ["Die Menge bestimmter Punkte der Schar, nachdem der Parameter eliminiert wurde.", "Die Ableitung nur einer festen Funktion.", "Alle Nullstellen jeder beliebigen Funktion.", "Die Gerade durch den Ursprung."], "Beispielsweise wird für Extrempunkte x(t) und y(t) berechnet und der Parameter t eliminiert.", "Verfolge eine ausgezeichnete Punktart bei veränderlichem Parameter.", "Eine Ortskurve ist nicht automatisch ein einzelner Graph der Schar.", "schwer"],
    ["anwendung", "Welche Zielfunktion hat die Oberfläche einer geschlossenen Zylinderdose mit Radius r und Höhe h?", ["O = 2πr² + 2πrh", "O = πr²h", "O = 2πrh", "O = πr² + πrh"], "Die Oberfläche besteht aus zwei Kreisflächen und dem Mantel.", "Zähle Boden, Deckel und Mantel.", "πr²h ist das Volumen, nicht die Oberfläche.", "mittel"],
    ["anwendung", "Wie ersetzt man h bei festem Zylindervolumen V = πr²h und r > 0?", ["h = V/(πr²)", "h = πr²/V", "h = V/(2πr)", "h = V − πr²"], "Die Volumenbedingung wird durch Division durch πr² nach h aufgelöst.", "Stelle die Nebenbedingung nach h um.", "Die Bedingung r > 0 vermeidet Division durch null.", "mittel"],
    ["anwendung", "Ein Rechteck liegt symmetrisch unter y = 4 − x², mit Grundseite auf der x-Achse und oberen Ecken bei ±x. Welche Fläche hat es?", ["A(x) = 2x(4 − x²)", "A(x) = x(4 − x²)", "A(x) = 2x(4 + x²)", "A(x) = 4 − 2x"], "Die Breite ist 2x und die Höhe 4 − x², mit 0 ≤ x ≤ 2.", "Die Breite reicht von −x bis x.", "Die Breite ist 2x, nicht x.", "schwer"],

    ["folgen", "Welche Vorschrift ist explizit?", ["aₙ = 3n + 1", "aₙ₊₁ = aₙ + 3 mit a₁ = 4", "aₙ₊₁ = 2aₙ mit a₁ = 1", "aₙ = aₙ₋₁ + 1 mit a₁ = 2"], "Eine explizite Vorschrift berechnet aₙ direkt aus n.", "Wird ein vorheriges Folgenglied benötigt?", "Eine rekursive Vorschrift benötigt Anfangswerte.", "leicht"],
    ["folgen", "Eine arithmetische Folge hat a₁ = 2 und d = 3. Wie groß ist a₅?", ["14", "17", "15", "11"], "a₅ = a₁ + (5 − 1)d = 2 + 12 = 14.", "Von a₁ bis a₅ gibt es vier Schritte.", "Nicht fünfmal d addieren.", "leicht"],
    ["folgen", "Eine geometrische Folge hat a₁ = 3 und q = 2. Wie groß ist a₄?", ["24", "48", "12", "9"], "a₄ = 3·2³ = 24.", "Bei n = 4 ist der Exponent n − 1 = 3.", "Die geometrische Folge multipliziert statt zu addieren.", "leicht"],
    ["folgen", "Welche Folge ist streng monoton fallend?", ["aₙ = 1/n für n ≥ 1", "aₙ = n", "aₙ = 3", "aₙ = (−1)ⁿ"], "Für n ≥ 1 gilt 1/(n + 1) < 1/n.", "Vergleiche zwei aufeinanderfolgende Glieder.", "Eine konstante Folge ist nicht streng monoton.", "mittel"],
    ["folgen", "Was ist der Grenzwert von aₙ = 1/n für n → ∞?", ["0", "1", "∞", "Der Grenzwert existiert nicht."], "Für wachsende n wird 1/n beliebig klein und positiv.", "Der Nenner wächst unbegrenzt.", "Jedes Glied ist positiv, aber der Grenzwert kann null sein.", "leicht"],
    ["folgen", "Welche Folge divergiert?", ["aₙ = (−1)ⁿ", "aₙ = 1/n", "aₙ = 2 + 1/n", "aₙ = 3"], "Die Folge (−1)ⁿ springt zwischen −1 und 1 und hat keinen gemeinsamen Grenzwert.", "Prüfe gerade und ungerade Indizes.", "Beschränktheit allein garantiert keine Konvergenz.", "mittel"],
    ["folgen", "Was bedeutet eine obere Schranke S?", ["Für alle n gilt aₙ ≤ S.", "Für alle n gilt aₙ ≥ S.", "Es gilt immer aₙ = S.", "S muss ein Folgenglied sein."], "Eine obere Schranke ist mindestens so groß wie jedes Folgenglied.", "Die Schranke liegt oberhalb aller Glieder.", "Eine Schranke muss nicht angenommen werden.", "leicht"],
    ["folgen", "Was bedeutet Konvergenz gegen L?", ["Für jedes ε > 0 liegen ab einem Index alle Glieder im Abstand kleiner als ε von L.", "Jedes Glied ist gleich L.", "Nur ein Glied liegt beliebig nahe bei L.", "Die Folge ist unbegrenzt."], "Zu jedem ε > 0 gibt es N, sodass für n ≥ N gilt: |aₙ − L| < ε.", "Ab einem geeigneten Index müssen alle späteren Glieder passen.", "Einzelne nahe Glieder reichen nicht.", "mittel"],
    ["folgen", "Welchen Grenzwert hat (2n² + 3)/(n² − 1) für n → ∞?", ["2", "0", "3", "∞"], "Durch Division durch n² entsteht (2 + 3/n²)/(1 − 1/n²) → 2.", "Teile Zähler und Nenner durch die höchste Potenz n².", "Der Nenner darf an einzelnen nicht definierten Indizes nicht null sein; für den Grenzwert betrachtet man große n.", "mittel"],
    ["folgen", "Welchen Grenzwert hat (3n + 1)/(n² + 1) für n → ∞?", ["0", "3", "1", "∞"], "Nach Division durch n² geht (3/n + 1/n²)/(1 + 1/n²) gegen 0.", "Der Nenner hat den höheren Grad.", "Nicht nur die führenden Koeffizienten teilen, wenn die Grade verschieden sind.", "mittel"],
    ["folgen", "Welche Aussage gilt für eine geometrische Folge aₙ = a₁qⁿ⁻¹ mit |q| < 1?", ["Sie konvergiert gegen 0.", "Sie divergiert immer.", "Sie konvergiert immer gegen 1.", "Sie ist immer streng monoton steigend."], "Potenzen qⁿ streben für |q| < 1 gegen null, auch wenn sie bei negativem q alternieren.", "Betrachte den Betrag der Potenzen.", "Konvergenz setzt keine Monotonie voraus.", "mittel"],
    ["folgen", "Wann darf der Quotientengrenzwertsatz direkt angewendet werden?", ["Wenn der Nennergrenzwert ungleich null ist.", "Immer, auch bei Nennergrenzwert null.", "Nur wenn beide Grenzwerte null sind.", "Nie bei rationalen Folgen."], "Für aₙ → a und bₙ → b ≠ 0 gilt aₙ/bₙ → a/b; bei b = 0 ist eine gesonderte Untersuchung nötig.", "Prüfe den Grenzwert des Nenners.", "Nicht durch den Grenzwert null teilen.", "mittel"]
  ];

  window.MATHE_QUESTION_POOL = questions.map(([category, prompt, options, explanation, tip, trap, difficulty], index) => ({
    id: `analysis-${String(index + 1).padStart(3, "0")}`,
    topic: category,
    category,
    difficulty,
    points: difficulty === "leicht" ? 1 : difficulty === "mittel" ? 2 : 3,
    type: "single",
    prompt,
    options,
    correct: 0,
    explanation,
    tip,
    trap
  }));
  window.MATHE_QUESTION_POOL.push(
    {
      id: "analysis-m01", topic: "ableitung", category: "ableitung", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Ableitungen sind auf ihren jeweiligen Definitionsbereichen richtig?",
      options: ["(x³)′ = 3x²", "(eˣ)′ = eˣ", "(cos x)′ = −sin x", "(ln x)′ = ln x"],
      correct: [0, 1, 2], tip: "Vergleiche jede Aussage mit den Grundableitungen.",
      trap: "Die Ableitung von ln x ist 1/x, nicht ln x.",
      explanation: "Die Potenz-, Exponential- und Kosinusableitungen sind richtig; (ln x)′ = 1/x für x > 0."
    },
    {
      id: "analysis-m02", topic: "folgen", category: "folgen", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen über Folgen stimmen?",
      options: ["1/n konvergiert gegen 0.", "(−1)ⁿ ist beschränkt, aber divergent.", "Jede beschränkte Folge konvergiert.", "Eine rekursive Vorschrift benötigt passende Anfangswerte."],
      correct: [0, 1, 3], tip: "Unterscheide Beschränktheit, Konvergenz und Bildungsvorschrift.",
      trap: "Beschränktheit allein garantiert keine Konvergenz.",
      explanation: "1/n → 0; (−1)ⁿ wechselt zwischen −1 und 1. Rekursive Folgen benötigen Anfangswerte."
    },
    {
      id: "analysis-c01", topic: "kurven", category: "kurven", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Bei f′-Vorzeichenwechsel von positiv nach negativ liegt ein {{0}} vor; bei negativ nach positiv ein {{1}}.",
      blanks: [
        { options: ["Hochpunkt", "Tiefpunkt", "Wendepunkt"], correct: "Hochpunkt" },
        { options: ["Tiefpunkt", "Hochpunkt", "Wendepunkt"], correct: "Tiefpunkt" }
      ],
      tip: "Überlege, ob die Funktion vor und nach der Stelle steigt oder fällt.",
      trap: "Ein Krümmungswechsel wird über f″ untersucht, nicht allein über den Vorzeichenwechsel von f′.",
      explanation: "Steigend zu fallend ergibt einen Hochpunkt; fallend zu steigend einen Tiefpunkt."
    },
    {
      id: "analysis-c02", topic: "aenderung", category: "aenderung", difficulty: "leicht", points: 1, type: "cloze",
      prompt: "Die Steigung der {{0}} ist eine mittlere Änderungsrate; die Steigung der {{1}} eine lokale Änderungsrate.",
      blanks: [
        { options: ["Sekante", "Tangente", "Normale"], correct: "Sekante" },
        { options: ["Tangente", "Sekante", "Normale"], correct: "Tangente" }
      ],
      tip: "Eine Gerade verbindet zwei Kurvenpunkte, die andere berührt den Graphen lokal.",
      trap: "Eine Normale steht senkrecht zur Tangente.",
      explanation: "Die Sekante verbindet zwei Punkte; die Tangente beschreibt die lokale Steigung."
    }
  );
})();
