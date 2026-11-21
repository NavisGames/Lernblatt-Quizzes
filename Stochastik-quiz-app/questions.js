(() => {
  "use strict";

  window.STOCHASTIK_CATEGORIES = [
    { id: "zufall", label: "Zufall & Pfadregeln" },
    { id: "kombinatorik", label: "Kombinatorik" },
    { id: "verteilungen", label: "Binomial- & Poissonverteilung" },
    { id: "kennwerte", label: "Erwartung, Varianz & faires Spiel" },
    { id: "bedingt", label: "Bedingte Wahrscheinlichkeit & Unabhängigkeit" },
    { id: "normalverteilung", label: "Normalverteilung & Kontinuitätskorrektur" },
    { id: "tests", label: "Hypothesentests & Fehler" }
  ];
  window.STOCHASTIK_QUESTION_TOPICS = window.STOCHASTIK_CATEGORIES;

  const questions = [
    ["zufall", "Ein fairer Würfel wird einmal geworfen. Wie groß ist P(gerade Augenzahl)?", ["1/2", "1/3", "1/6", "2/3"], "Drei der sechs gleich wahrscheinlichen Augenzahlen sind gerade: 3/6 = 1/2.", "Zähle 2, 4 und 6.", "Die Laplace-Regel setzt gleich wahrscheinliche Ergebnisse voraus.", "leicht"],
    ["zufall", "Was ist das Gegenereignis zu „mindestens ein Treffer“?", ["Kein Treffer", "Genau ein Treffer", "Mindestens zwei Treffer", "Alle Versuche sind Treffer"], "Das Gegenteil von mindestens einem Treffer ist, dass kein Treffer auftritt.", "Welche Trefferzahl bleibt ausgeschlossen?", "Genau ein Treffer gehört bereits zum ursprünglichen Ereignis.", "leicht"],
    ["zufall", "Wie lautet die Gegenereignisregel?", ["P(Ā) = 1 − P(A)", "P(Ā) = 1 + P(A)", "P(Ā) = P(A)", "P(Ā) = 1/P(A)"], "A und Ā sind disjunkt und ergeben zusammen Ω.", "Ihre Wahrscheinlichkeiten summieren sich zu 1.", "Das Gegenereignis ist kein Kehrwert.", "leicht"],
    ["zufall", "P(A) = 0,6, P(B) = 0,5 und P(A ∩ B) = 0,3. Wie groß ist P(A ∪ B)?", ["0,8", "1,1", "0,3", "0,2"], "P(A ∪ B) = 0,6 + 0,5 − 0,3 = 0,8.", "Ziehe die doppelt gezählte Überschneidung ab.", "Ein einfaches Addieren zählt A ∩ B zweimal.", "mittel"],
    ["zufall", "Wie wird die Wahrscheinlichkeit eines Pfades im Baumdiagramm berechnet?", ["Zweigwahrscheinlichkeiten entlang des Pfades multiplizieren.", "Alle Zweigwahrscheinlichkeiten im Baum addieren.", "Nur die letzte Zweigwahrscheinlichkeit verwenden.", "Die Anzahl der Stufen durch 1 teilen."], "Die Produktregel kombiniert die aufeinanderfolgenden bedingten Wahrscheinlichkeiten.", "Jeder Zweig gilt unter den vorigen Bedingungen.", "Summiert werden die Wahrscheinlichkeiten passender disjunkter Pfade.", "leicht"],
    ["zufall", "Eine Urne enthält 3 rote und 2 blaue Kugeln. Wie groß ist P(rot, dann blau) ohne Zurücklegen?", ["3/10", "6/25", "1/2", "2/5"], "Nach Rot bleiben zwei blaue unter vier Kugeln: 3/5 · 2/4 = 3/10.", "Nach dem ersten Zug ändert sich die Gesamtzahl.", "2/5 als zweiter Faktor gilt nur mit Zurücklegen.", "mittel"],
    ["zufall", "In derselben Urne mit 3 roten und 2 blauen Kugeln: Wie groß ist P(genau eine rote Kugel) bei zwei Zügen ohne Zurücklegen?", ["3/5", "3/10", "6/25", "2/5"], "Die disjunkten Pfade Rot-Blau und Blau-Rot haben jeweils Wahrscheinlichkeit 3/10; zusammen 3/5.", "Berücksichtige beide Reihenfolgen.", "Nur einen Pfad zu rechnen genügt nicht.", "mittel"],
    ["zufall", "Drei unabhängige Versuche haben jeweils Trefferwahrscheinlichkeit 0,2. Wie groß ist P(mindestens ein Treffer)?", ["0,488", "0,512", "0,6", "0,008"], "Das Gegenereignis hat Wahrscheinlichkeit 0,8³ = 0,512; daher 1 − 0,512 = 0,488.", "Berechne zuerst keinen Treffer.", "0,2³ beschreibt drei Treffer.", "mittel"],
    ["zufall", "Welche Aussage über disjunkte Ereignisse A und B ist richtig?", ["P(A ∪ B) = P(A) + P(B)", "P(A ∩ B) = 1", "A und B sind stets unabhängig.", "P(A ∪ B) = P(A)P(B)"], "Disjunkte Ereignisse haben leeren Schnitt, deshalb entfällt der Korrekturterm in der Additionsregel.", "Disjunkt bedeutet: nicht gleichzeitig möglich.", "Disjunkt und unabhängig sind nicht gleichbedeutend.", "mittel"],
    ["zufall", "Zwei faire Münzen werden geworfen. Wie groß ist die Wahrscheinlichkeit für mindestens einmal Kopf?", ["3/4", "1/2", "1/4", "1"], "Nur Zahl-Zahl enthält keinen Kopf; 1 − 1/4 = 3/4.", "Betrachte das Gegenereignis.", "Kopf-Zahl und Zahl-Kopf sind unterschiedliche Ergebnisse.", "leicht"],

    ["kombinatorik", "Was ist 0!?", ["1", "0", "Nicht definiert", "−1"], "Per Definition gilt 0! = 1; so funktionieren die kombinatorischen Formeln auch an Randstellen.", "Es gibt genau eine leere Anordnung.", "0! ist nicht null.", "leicht"],
    ["kombinatorik", "Wie viele Anordnungen haben vier verschiedene Bücher?", ["24", "16", "12", "4"], "Vier verschiedene Objekte können auf 4! = 4·3·2·1 = 24 Arten angeordnet werden.", "Zähle die Möglichkeiten für jeden Platz.", "Die Reihenfolge zählt.", "leicht"],
    ["kombinatorik", "Wie viele dreistellige Codes aus den Ziffern 0 bis 9 sind möglich, wenn Wiederholung und führende Null erlaubt sind?", ["1000", "720", "900", "120"], "Jeder der drei Plätze hat zehn Möglichkeiten: 10³ = 1000.", "Es ist ein Code, keine dreistellige Zahl.", "Die führende Null ist ausdrücklich erlaubt.", "leicht"],
    ["kombinatorik", "Wie viele Möglichkeiten gibt es, drei verschiedene Ämter mit fünf Personen zu besetzen, wenn niemand zwei Ämter erhält?", ["60", "10", "125", "15"], "Für die Ämter bleiben nacheinander 5, 4 und 3 Personen: 5·4·3 = 60.", "Ämter sind unterscheidbar.", "Nicht durch 3! teilen: Die Zuordnung zu den Ämtern zählt.", "mittel"],
    ["kombinatorik", "Wie viele Dreierteams kann man aus fünf Personen bilden?", ["10", "60", "15", "125"], "Ohne Reihenfolge sind es (5 über 3) = 5!/(3!·2!) = 10 Teams.", "Bei Teams ist die Reihenfolge egal.", "60 zählt dieselben Teams mehrfach.", "mittel"],
    ["kombinatorik", "Wie viele Möglichkeiten gibt es, zwei Kugeln Eis aus drei Sorten zu wählen, wenn Sorten wiederholt werden dürfen und die Reihenfolge egal ist?", ["6", "9", "3", "12"], "Es sind drei gleiche Sortenpaare und drei Paare verschiedener Sorten, insgesamt 6.", "Zähle gleiche und verschiedene Sortenpaare.", "AB und BA sind dieselbe Wahl.", "mittel"],
    ["kombinatorik", "Wie viele unterschiedliche Anordnungen hat das Wort ABA?", ["3", "6", "2", "9"], "Die beiden A sind ununterscheidbar: 3!/2! = 3.", "Teile die Anzahl der Anordnungen durch 2!.", "Die beiden A nicht künstlich unterscheiden.", "mittel"],
    ["kombinatorik", "Welche Formel zählt k ausgewählte Objekte aus n verschiedenen Objekten ohne Wiederholung und ohne Reihenfolge?", ["n!/[k!(n−k)!]", "nᵏ", "n!/(n−k)!", "kⁿ"], "Der Binomialkoeffizient (n über k) zählt die Teilmengen der Größe k für 0 ≤ k ≤ n.", "Ein Team ist eine ungeordnete Auswahl.", "Die geordnete Auswahl wird zusätzlich durch k! geteilt.", "mittel"],
    ["kombinatorik", "Welche Formel zählt k geordnete Ziehungen aus n Objekten mit Zurücklegen?", ["nᵏ", "(n über k)", "n!", "n!/(n−k)!"], "Jeder Platz kann unabhängig mit einem der n Objekte belegt werden: nᵏ.", "Für jeden Platz stehen n Möglichkeiten offen.", "Ohne Zurücklegen wäre die Zahl der Möglichkeiten abnehmend.", "leicht"],
    ["kombinatorik", "Wie viele zweiköpfige Teams lassen sich aus sechs Personen bilden?", ["15", "30", "36", "12"], "(6 über 2) = 6·5/2 = 15.", "Die Reihenfolge der beiden Personen zählt nicht.", "30 zählt jedes Team doppelt.", "leicht"],

    ["verteilungen", "Welche Voraussetzungen kennzeichnen eine Bernoulli-Kette?", ["Feste Versuchszahl, unabhängige Versuche, zwei Ausgänge und konstantes p.", "Abhängige Versuche mit wechselndem p.", "Beliebig viele Ausgänge ohne feste Versuchszahl.", "Immer Ziehen ohne Zurücklegen."], "Eine Bernoulli-Kette wiederholt unabhängige Treffer/Nichttreffer-Versuche mit gleicher Trefferwahrscheinlichkeit.", "Prüfe Unabhängigkeit und konstantes p.", "Ziehen ohne Zurücklegen ist im Allgemeinen abhängig.", "leicht"],
    ["verteilungen", "X ~ B(4; 0,5). Wie groß ist P(X = 2)?", ["3/8", "1/16", "1/4", "5/16"], "(4 über 2)·0,5²·0,5² = 6/16 = 3/8.", "Es gibt sechs Anordnungen mit zwei Treffern.", "Ein einzelner Pfad hat nur Wahrscheinlichkeit 1/16.", "mittel"],
    ["verteilungen", "X ~ B(4; 0,5). Wie groß ist P(X > 2)?", ["5/16", "11/16", "3/8", "1/16"], "Für X = 3 oder 4 ergibt sich (4 + 1)/16 = 5/16.", "Zähle drei und vier Treffer.", "X = 2 gehört nicht zu X > 2.", "mittel"],
    ["verteilungen", "Für F(k) = P(X ≤ k): Wie lautet P(X ≥ 3) bei ganzzahligem X?", ["1 − F(2)", "1 − F(3)", "F(3)", "F(2)"], "Das Gegenereignis zu X ≥ 3 ist X ≤ 2.", "Welche ganzzahligen Werte liegen unter 3?", "1 − F(3) beschreibt X ≥ 4.", "mittel"],
    ["verteilungen", "X ~ B(5; 0,2). Wie groß ist P(X = 0)?", ["0,8⁵", "0,2⁵", "5·0,2", "1 − 0,8⁵"], "Kein Treffer bedeutet fünf unabhängige Nichttreffer: 0,8⁵.", "Verwende die Wahrscheinlichkeit eines Nichttreffers.", "1 − 0,8⁵ ist mindestens ein Treffer.", "leicht"],
    ["verteilungen", "X ~ B(10; 0,3). Wie groß ist E(X)?", ["3", "0,3", "7", "2,1"], "Für eine Binomialverteilung gilt E(X) = np = 10·0,3 = 3.", "Multipliziere Versuchszahl und Trefferwahrscheinlichkeit.", "2,1 ist hier die Varianz.", "leicht"],
    ["verteilungen", "X ~ B(10; 0,3). Wie groß ist Var(X)?", ["2,1", "3", "7", "0,21"], "Var(X) = np(1−p) = 10·0,3·0,7 = 2,1.", "Ergänze np um den Faktor 1−p.", "Die Varianz ist nicht die Standardabweichung.", "mittel"],
    ["verteilungen", "X ~ Pois(2). Wie groß ist P(X = 0)?", ["e⁻²", "2e⁻²", "1 − e⁻²", "0"], "In e⁻λ·λᵏ/k! eingesetzt ergibt k = 0 den Wert e⁻².", "Nutze 0! = 1.", "λ⁰ ist 1.", "mittel"],
    ["verteilungen", "X ~ Pois(2). Wie groß ist P(X ≥ 1)?", ["1 − e⁻²", "e⁻²", "2e⁻²", "1 − 2e⁻²"], "Das Gegenereignis ist X = 0 mit Wahrscheinlichkeit e⁻².", "Ziehe P(X = 0) von 1 ab.", "P(X = 1) ist nicht P(X ≥ 1).", "mittel"],
    ["verteilungen", "Welche Kennwerte hat X ~ Pois(λ)?", ["Erwartungswert und Varianz sind beide λ.", "Erwartungswert λ, Varianz λ².", "Erwartungswert 0, Varianz λ.", "Erwartungswert und Varianz sind beide 1/λ."], "Für eine Poissonverteilung sind E(X) = Var(X) = λ; die Standardabweichung ist √λ.", "Beide Kennwerte entsprechen dem Parameter.", "Standardabweichung und Varianz nicht verwechseln.", "leicht"],
    ["verteilungen", "Wann ist eine Poissonnäherung für B(n; p) naheliegend?", ["Bei großem n und kleinem p mit λ = np.", "Bei n = 1 und p = 0,5 mit λ = 1/p.", "Bei beliebigem n und p mit λ = n/p.", "Nur bei p = 1 mit λ = 0."], "Für seltene unabhängige Treffer kann B(n; p) durch Pois(np) approximiert werden.", "Die erwartete Trefferzahl bleibt np.", "Die Näherung muss für den konkreten Fall ausreichend genau sein.", "mittel"],

    ["kennwerte", "Eine Zufallsgröße ist mit Wahrscheinlichkeit 0,25 gleich 4 und sonst 0. Wie groß ist E(X)?", ["1", "4", "0,25", "2"], "E(X) = 4·0,25 + 0·0,75 = 1.", "Werte mit ihren Wahrscheinlichkeiten gewichten.", "Nicht nur die möglichen Werte mitteln.", "leicht"],
    ["kennwerte", "Welche Bedeutung hat der Erwartungswert?", ["Langfristiger Durchschnitt bei vielen Wiederholungen.", "Er muss bei jedem Versuch auftreten.", "Er ist immer der wahrscheinlichste Wert.", "Er ist immer eine mögliche Einzelbeobachtung."], "Der Erwartungswert beschreibt den gewichteten Mittelwert, nicht zwingend einen Einzelwert.", "Ein fairer Würfel hat Erwartungswert 3,5.", "3,5 ist keine mögliche Augenzahl.", "leicht"],
    ["kennwerte", "Wie lautet die Varianzformel für eine diskrete Zufallsgröße mit μ = E(X)?", ["E((X − μ)²)", "E(X)²", "√E(X)", "E(X − μ)"], "Die Varianz ist die erwartete quadratische Abweichung vom Erwartungswert.", "Abweichungen quadrieren und gewichten.", "E(X − μ) ist stets 0 und nicht allgemein die Varianz.", "mittel"],
    ["kennwerte", "Welche Beziehung gilt zwischen Varianz und Standardabweichung?", ["σ = √Var(X)", "σ = Var(X)²", "σ = 1/Var(X)", "σ = E(X)"], "Die Standardabweichung ist die nichtnegative Quadratwurzel der Varianz.", "Die Varianz hat quadrierte Einheiten.", "Die Varianz ist nicht automatisch gleich σ.", "leicht"],
    ["kennwerte", "E(X) = 3. Wie groß ist E(2X + 1)?", ["7", "6", "4", "9"], "Linearität des Erwartungswerts: 2·3 + 1 = 7.", "Multipliziere den Erwartungswert und addiere 1.", "Die additive Konstante nicht vergessen.", "mittel"],
    ["kennwerte", "Var(X) = 4. Wie groß ist Var(3X + 5)?", ["36", "17", "12", "41"], "Var(aX+b) = a²Var(X), also 9·4 = 36; die Verschiebung ändert die Varianz nicht.", "Der Streckfaktor wird quadriert.", "Eine Verschiebung um 5 addiert nicht 5 zur Varianz.", "mittel"],
    ["kennwerte", "Ein Spiel zahlt mit Wahrscheinlichkeit 0,25 vier Euro und sonst nichts aus. Welcher Einsatz macht es im Erwartungswert fair?", ["1 €", "4 €", "0,25 €", "2 €"], "Die erwartete Auszahlung ist 4·0,25 = 1 €; bei diesem Einsatz ist der erwartete Nettogewinn null.", "Berechne erst die erwartete Auszahlung.", "Fair bedeutet nicht, dass jede einzelne Runde ausgeglichen ist.", "mittel"],
    ["kennwerte", "Ein Spiel hat erwartete Auszahlung 1 € und kostet 1,50 €. Wie groß ist der erwartete Nettogewinn?", ["−0,50 €", "0,50 €", "1 €", "−1,50 €"], "Erwartete Auszahlung minus sicherer Einsatz: 1 € − 1,50 € = −0,50 €.", "Der Einsatz wird abgezogen.", "Auszahlung und Nettogewinn sind verschieden.", "leicht"],
    ["kennwerte", "Wie groß ist der Erwartungswert eines fairen Würfels?", ["3,5", "3", "4", "21"], "Die Summe 1 + 2 + 3 + 4 + 5 + 6 = 21 wird durch 6 geteilt.", "Mittle alle sechs Augenzahlen.", "Ein Erwartungswert muss kein möglicher Würfelwert sein.", "leicht"],
    ["kennwerte", "Welche Einheit besitzt die Standardabweichung einer Länge in Metern?", ["Meter", "Quadratmeter", "Keine Einheit", "Meter pro Sekunde"], "Die Varianz hat Quadratmeter, ihre Wurzel wieder Meter.", "Ziehe die Wurzel aus der Varianzeinheit.", "Standardabweichung und Varianz haben nicht dieselbe Einheit.", "mittel"],

    ["bedingt", "Was gilt für P(A | B), wenn P(B) > 0?", ["P(A ∩ B)/P(B)", "P(A ∩ B)/P(A)", "P(A)/P(B)", "P(A) + P(B)"], "Bei Bedingung B wird der gemeinsame Anteil auf die Wahrscheinlichkeit von B bezogen.", "Der Nenner ist die gegebene Bedingung.", "Die Richtung der Bedingung nicht vertauschen.", "leicht"],
    ["bedingt", "P(A ∩ B) = 0,12 und P(B) = 0,3. Wie groß ist P(A | B)?", ["0,4", "0,036", "0,18", "2,5"], "P(A | B) = 0,12/0,3 = 0,4.", "Teile die Schnittwahrscheinlichkeit durch P(B).", "Nicht Schnitt und Bedingung multiplizieren.", "mittel"],
    ["bedingt", "Von 100 Personen sind 40 in A, davon 10 auch in B. Wie groß ist P(B | A)?", ["1/4", "1/10", "2/5", "1/2"], "In der gegebenen Gruppe A sind 10 von 40 auch in B: 10/40 = 1/4.", "Betrachte nur die 40 Personen in A.", "10/100 ist P(A ∩ B), nicht P(B | A).", "mittel"],
    ["bedingt", "Wann sind A und B unabhängig?", ["Wenn P(A ∩ B) = P(A)P(B).", "Wenn P(A ∩ B) = 0.", "Wenn A und B gleich sind.", "Wenn P(A) + P(B) = 1."], "Die Produktgleichung ist das allgemeine Unabhängigkeitskriterium, auch bei Nullwahrscheinlichkeiten.", "Vergleiche Schnitt und Produkt der Randwahrscheinlichkeiten.", "Disjunktheit ist nicht dasselbe wie Unabhängigkeit.", "leicht"],
    ["bedingt", "P(A) = 0,5, P(B) = 0,4 und P(A ∩ B) = 0,2. Sind A und B unabhängig?", ["Ja, denn 0,5·0,4 = 0,2.", "Nein, denn 0,5 + 0,4 ≠ 1.", "Nein, denn beide haben positive Wahrscheinlichkeit.", "Nicht entscheidbar."], "Das Produkt der Randwahrscheinlichkeiten stimmt mit der Schnittwahrscheinlichkeit überein.", "Berechne 0,5·0,4.", "Unabhängige Ereignisse können gleichzeitig eintreten.", "mittel"],
    ["bedingt", "Zwei disjunkte Ereignisse haben beide positive Wahrscheinlichkeit. Sind sie unabhängig?", ["Nein", "Ja, immer", "Nur wenn ihre Summe 1 ist", "Nur wenn sie gleich wahrscheinlich sind"], "Der Schnitt hat Wahrscheinlichkeit 0, das Produkt der positiven Wahrscheinlichkeiten ist größer als 0.", "Vergleiche P(A ∩ B) und P(A)P(B).", "Disjunkt bedeutet nicht unabhängig.", "mittel"],
    ["bedingt", "Ein Test ist bei 80 von 100 Betroffenen positiv und bei 90 von 900 Nichtbetroffenen positiv. Wie groß ist P(betroffen | positiv)?", ["80/170", "80/100", "90/170", "100/1000"], "Unter den 170 positiv Getesteten sind 80 betroffen: 80/170.", "Die gegebene Gruppe sind alle positiv Getesteten.", "80/100 ist P(positiv | betroffen).", "schwer"],
    ["bedingt", "Welche Aussage zu einer Vierfeldertafel ist richtig?", ["Die vier Innenfelder bilden die vier Schnittmengen und summieren sich zur Gesamtzahl.", "Jedes Innenfeld ist eine Randhäufigkeit.", "Die Innenfelder sind immer gleich groß.", "Zeilen- und Spaltensummen dürfen nicht verglichen werden."], "Die vier Schnittmengen zerlegen die Gesamtmenge; ihre Zeilen- und Spaltensummen sind die Randhäufigkeiten.", "Jede Person gehört genau in ein Innenfeld.", "Randhäufigkeiten sind Summen von Innenfeldern.", "leicht"],
    ["bedingt", "P(A | B) = 0,8, P(B) = 0,1. Wie groß ist P(A ∩ B)?", ["0,08", "0,8", "0,9", "0,08/0,9"], "Die Produktregel ergibt P(A ∩ B) = P(A | B)·P(B) = 0,08.", "Multipliziere bedingte Wahrscheinlichkeit und Bedingung.", "0,8 ist der Anteil innerhalb von B, nicht innerhalb der Gesamtmenge.", "mittel"],
    ["bedingt", "Wenn P(B) = 0, ist P(A | B) nach P(A ∩ B)/P(B) definiert?", ["Nein, der Nenner ist null.", "Ja, immer 0.", "Ja, immer 1.", "Ja, gleich P(A)."], "Die elementare Formel ist nur für P(B) > 0 definiert.", "Prüfe den Nenner.", "Eine Division durch null ist nicht definiert.", "mittel"],

    ["normalverteilung", "Y ~ N(100; 15²). Welcher standardisierte Wert gehört zu Y = 115?", ["1", "15", "1/15", "−1"], "z = (115 − 100)/15 = 1.", "Subtrahiere μ und teile durch σ.", "Nicht durch σ² teilen.", "leicht"],
    ["normalverteilung", "Für Z ~ N(0; 1) ist Φ(1) ≈ 0,8413. Wie groß ist P(Z > 1)?", ["0,1587", "0,8413", "0,6826", "0,5"], "P(Z > 1) = 1 − Φ(1) ≈ 0,1587.", "Verwende das Gegenereignis.", "Φ(1) ist die Fläche links von 1.", "leicht"],
    ["normalverteilung", "Welche Beziehung gilt für die Standardnormalverteilung?", ["Φ(−z) = 1 − Φ(z)", "Φ(−z) = −Φ(z)", "Φ(−z) = Φ(z)", "Φ(z) = 1 für alle z"], "Die Standardnormalverteilung ist symmetrisch um 0; komplementäre Flächen ergeben zusammen 1.", "Nutze die Symmetrie der Glockenkurve.", "Eine Wahrscheinlichkeit ist nicht negativ.", "mittel"],
    ["normalverteilung", "Wie groß ist P(Y = 100) bei einer stetigen Normalverteilung?", ["0", "1/2", "1", "Nicht definiert"], "Eine einzelne Stelle hat bei einer stetigen Verteilung Wahrscheinlichkeit 0; Intervalle können positive Wahrscheinlichkeit haben.", "Wahrscheinlichkeit entspricht einer Fläche.", "Die Dichtehöhe ist keine Punktwahrscheinlichkeit.", "mittel"],
    ["normalverteilung", "Ungefähr welcher Anteil einer Normalverteilung liegt zwischen μ − σ und μ + σ?", ["68,3 %", "95,4 %", "50 %", "99,99 %"], "Im Intervall einer Standardabweichung um den Mittelwert liegen ungefähr 68,3 %.", "Denke an die 68-95-Regel.", "95,4 % entsprechen ungefähr zwei Standardabweichungen.", "leicht"],
    ["normalverteilung", "Y ~ N(100; 15²). Wie groß ist P(Y ≤ 115) ungefähr?", ["0,8413", "0,1587", "0,5", "0,9772"], "115 liegt eine Standardabweichung über μ; deshalb P(Y ≤ 115) = Φ(1) ≈ 0,8413.", "Standardisiere zuerst.", "Die Fläche rechts von 115 ist das Gegenereignis.", "mittel"],
    ["normalverteilung", "Welche Kontinuitätskorrektur passt zu P(X ≤ 55) für ganzzahliges X?", ["P(Y ≤ 55,5)", "P(Y ≤ 54,5)", "P(Y ≥ 55,5)", "P(Y = 55)"], "Die Grenze wird um 0,5 nach oben verschoben, damit der Wert 55 ganz erfasst wird.", "Die obere Grenze liegt hinter dem letzten enthaltenen Wert.", "Die Korrektur ersetzt keine exakte Binomialrechnung.", "mittel"],
    ["normalverteilung", "Welche Kontinuitätskorrektur passt zu P(X ≥ 20) für ganzzahliges X?", ["P(Y ≥ 19,5)", "P(Y ≥ 20,5)", "P(Y ≤ 19,5)", "P(Y = 20)"], "Die untere Grenze liegt bei 20 − 0,5 = 19,5.", "Der Wert 20 soll noch enthalten sein.", "Nicht die untere Grenze nach oben verschieben.", "mittel"],
    ["normalverteilung", "X ~ B(100; 0,5). Welche Parameter verwendet die zugehörige Normalnäherung?", ["μ = 50 und σ = 5", "μ = 50 und σ = 25", "μ = 100 und σ = 50", "μ = 0,5 und σ = 5"], "μ = np = 50, Varianz = np(1−p) = 25 und σ = √25 = 5.", "Berechne zuerst die Varianz.", "25 ist die Varianz, nicht σ.", "mittel"],
    ["normalverteilung", "Wie wird P(10 ≤ X ≤ 15) mit Kontinuitätskorrektur angenähert?", ["P(9,5 ≤ Y ≤ 15,5)", "P(10,5 ≤ Y ≤ 14,5)", "P(10 ≤ Y ≤ 15)", "P(Y ≤ 9,5)"], "Beide ganzzahligen Randwerte gehören dazu: die untere Grenze um 0,5 senken, die obere um 0,5 erhöhen.", "Die Intervalle um die Randwerte vollständig erfassen.", "Nicht beide Grenzen nach innen verschieben.", "mittel"],

    ["tests", "Was ist ein Fehler 1. Art?", ["H₀ verwerfen, obwohl H₀ wahr ist.", "H₀ nicht verwerfen, obwohl H₁ wahr ist.", "H₀ verwerfen, obwohl H₁ wahr ist.", "H₀ nicht verwerfen, obwohl H₀ wahr ist."], "Ein Fehler 1. Art ist die fälschliche Ablehnung einer wahren Nullhypothese.", "Denke an einen falschen Alarm.", "Das Übersehen einer wahren Alternative ist ein Fehler 2. Art.", "leicht"],
    ["tests", "Was ist ein Fehler 2. Art?", ["H₀ nicht verwerfen, obwohl H₁ wahr ist.", "H₀ verwerfen, obwohl H₀ wahr ist.", "H₀ verwerfen, obwohl H₁ wahr ist.", "H₀ nicht verwerfen, obwohl H₀ wahr ist."], "Ein Fehler 2. Art liegt vor, wenn H₀ trotz wahrer Alternative nicht verworfen wird.", "Die Abweichung wird übersehen.", "Fehler 1. Art und 2. Art nicht vertauschen.", "leicht"],
    ["tests", "Was begrenzt das Signifikanzniveau α?", ["Die Wahrscheinlichkeit eines Fehlers 1. Art unter H₀.", "Die Wahrscheinlichkeit, dass H₀ wahr ist.", "Immer die Wahrscheinlichkeit eines Fehlers 2. Art.", "Die Wahrscheinlichkeit, dass die Daten korrekt sind."], "Ein Test zum Niveau α hat unter jedem zulässigen H₀-Parameter eine Ablehnungswahrscheinlichkeit von höchstens α.", "Welche Fehlentscheidung betrifft eine wahre Nullhypothese?", "α ist keine Wahrscheinlichkeit für die Wahrheit einer Hypothese.", "mittel"],
    ["tests", "H₀: p = 0,5 gegen H₁: p > 0,5. Welche Trefferzahlen sprechen gegen H₀?", ["Große Trefferzahlen", "Kleine Trefferzahlen", "Nur der Erwartungswert", "Alle Trefferzahlen gleichermaßen"], "Bei der rechtsseitigen Alternative sind große Trefferzahlen unter H₀ besonders auffällig.", "Die Alternative behauptet ein größeres p.", "Die Richtung folgt aus H₁, nicht aus der beobachteten Zahl.", "leicht"],
    ["tests", "H₀: p = 0,5, H₁: p > 0,5, n = 10. Wie groß ist P₀(X ≥ 9)?", ["11/1024", "56/1024", "1/1024", "10/1024"], "Unter H₀ ist X binomialverteilt; für 9 und 10 Treffer gibt es 10 + 1 gleich wahrscheinliche Folgen.", "Summiere die Wahrscheinlichkeiten für 9 und 10.", "Der Fall X = 10 gehört zum Ablehnungsbereich.", "mittel"],
    ["tests", "Bei H₀: p = 0,5, H₁: p > 0,5 und n = 10 soll α = 5 % nicht überschritten werden. Welcher obere Ablehnungsbereich ist größtmöglich?", ["X ≥ 9", "X ≥ 8", "X ≥ 7", "X ≥ 10"], "P₀(X ≥ 9) = 11/1024 ≈ 1,07 %, aber P₀(X ≥ 8) = 56/1024 ≈ 5,47 %.", "Vergleiche die oberen Randwahrscheinlichkeiten mit 0,05.", "Wegen diskreter Werte muss das tatsächliche Niveau nicht genau 5 % sein.", "schwer"],
    ["tests", "Ein Test verwirft H₀ bei X ≥ 9. Was folgt aus der Beobachtung X = 8?", ["H₀ wird nicht verworfen.", "H₀ ist bewiesen.", "H₁ ist bewiesen.", "H₀ wird verworfen."], "8 liegt außerhalb des Ablehnungsbereichs. Dies beweist die Nullhypothese nicht.", "Vergleiche die Beobachtung mit der festgelegten Grenze.", "Nicht verwerfen bedeutet nicht beweisen.", "leicht"],
    ["tests", "Was ist β(p) bei einem konkreten Parameter p aus H₁?", ["Pₚ(H₀ nicht verwerfen)", "Pₚ(H₀ verwerfen)", "P₀(H₀ verwerfen)", "P(H₁ ist wahr)"], "β(p) ist die Wahrscheinlichkeit für einen Fehler 2. Art bei diesem Parameter.", "Die Alternative gilt und der Test übersieht sie.", "β hängt im Allgemeinen vom Parameter unter H₁ ab.", "mittel"],
    ["tests", "Wie hängt die Teststärke bei einer festen Alternative mit β zusammen?", ["Teststärke = 1 − β", "Teststärke = β", "Teststärke = α + β", "Teststärke = 1 − α"], "Unter dem betrachteten alternativen Parameter ergänzen sich Verwerfen und Nichtverwerfen zu 1.", "Die Stärke ist die Wahrscheinlichkeit, H₀ korrekt zu verwerfen.", "α bezieht sich auf H₀, nicht auf denselben alternativen Parameter.", "mittel"],
    ["tests", "Was bedeutet ein p-Wert von 0,03 bei einem festgelegten Test?", ["Unter H₀ beträgt die Wahrscheinlichkeit eines mindestens so extremen Ergebnisses 0,03.", "H₀ ist mit Wahrscheinlichkeit 3 % wahr.", "Die Wahrscheinlichkeit eines Fehlers 2. Art ist 3 %.", "Das Ergebnis ist mit 97 % Wahrscheinlichkeit richtig."], "Der p-Wert beschreibt die unter H₀ berechnete Extremwahrscheinlichkeit gemäß der Testrichtung.", "Die Wahrscheinlichkeit wird unter Annahme von H₀ berechnet.", "Er ist keine Wahrscheinlichkeit für die Hypothese selbst.", "mittel"],
    ["tests", "Ein p-Wert beträgt 0,03, α = 0,05. Welche Entscheidung gilt?", ["H₀ verwerfen.", "H₀ nicht verwerfen.", "H₀ beweisen.", "Den Test ohne Entscheidung wiederholen."], "Da 0,03 ≤ 0,05, ist das Ergebnis auf diesem Niveau signifikant und H₀ wird verworfen.", "Vergleiche p-Wert und α.", "Ein signifikantes Ergebnis beweist die Alternative nicht absolut.", "leicht"],
    ["tests", "Warum kann das tatsächliche Niveau eines Binomialtests kleiner als das gewählte α sein?", ["Weil mögliche Ablehnungswahrscheinlichkeiten diskrete Sprünge haben.", "Weil α stets die Wahrscheinlichkeit einer wahren H₀ ist.", "Weil Stichproben nie zufällig sind.", "Weil ein Test niemals einen Fehler 1. Art macht."], "Bei diskreten Prüfgrößen lässt sich das vorgegebene Niveau oft nicht exakt treffen, ohne es zu überschreiten.", "Grenzwerte sind ganzzahlig.", "Höchstens α heißt nicht zwingend genau α.", "mittel"],
    ["kombinatorik", "Wie viele ungeordnete Auswahlen gibt es beim Ziehen von 6 aus 49 nummerierten Kugeln ohne Zurücklegen?", ["13 983 816", "49⁶", "49·48·47·46·45·44", "49/6"], "(49 über 6) = 49!/(6!·43!) = 13 983 816.", "Es geht um eine ungeordnete Auswahl ohne Wiederholung.", "Die geordneten Ziehungen zählen jede Sechserauswahl 6! mal.", "mittel"],
    ["kennwerte", "Was ist das arithmetische Mittel der Beobachtungen 2, 3 und 7?", ["4", "3", "12", "6"], "x̄ = (2 + 3 + 7)/3 = 4.", "Addiere die beobachteten Werte und teile durch ihre Anzahl.", "Das Stichprobenmittel ist nicht die Summe der Werte.", "leicht"],
    ["verteilungen", "X ~ B(1000; 0,002). Welchen Parameter besitzt die Poissonnäherung?", ["λ = 2", "λ = 500", "λ = 0,002", "λ = 1000"], "Für die Poissonnäherung gilt λ = np = 1000·0,002 = 2.", "Multipliziere n mit p.", "Die Näherung muss für den konkreten Fall ausreichend genau sein.", "mittel"],
    ["verteilungen", "Für F(k) = P(X ≤ k): Wie lautet P(2 ≤ X ≤ 5) bei ganzzahligem X?", ["F(5) − F(1)", "F(5) − F(2)", "F(5) + F(2)", "F(1) − F(5)"], "F(5) enthält alle Werte bis 5. Durch Abzug von F(1) bleiben genau die Werte 2 bis 5.", "Ziehe alle Werte unter 2 ab.", "F(2) abzuziehen würde auch X = 2 entfernen.", "mittel"],
    ["tests", "Ein symmetrischer zweiseitiger Test für X ~ B(10; 0,5) verwirft bei X ≤ 1 oder X ≥ 9. Wie groß ist das tatsächliche Niveau?", ["22/1024 ≈ 2,15 %", "11/1024 ≈ 1,07 %", "112/1024 ≈ 10,94 %", "50 %"], "Beide Ränder haben unter H₀ Wahrscheinlichkeit 11/1024. Ihre Summe ist 22/1024.", "Summiere den linken und den rechten Rand.", "Ein zweiseitiger Test berücksichtigt beide Ränder.", "schwer"]
  ];

  const counts = {};
  window.STOCHASTIK_QUESTION_POOL = questions.map(([category, prompt, options, explanation, tip, trap, difficulty]) => {
    counts[category] = (counts[category] || 0) + 1;
    return {
      id: `stochastik-${category}-${String(counts[category]).padStart(2, "0")}`,
      topic: category, category, difficulty, points: 1, type: "single",
      prompt, options, correct: 0, explanation, tip, trap
    };
  });
  window.STOCHASTIK_QUESTION_POOL.push(
    {
      id: "stochastik-zufall-m01", topic: "zufall", category: "zufall", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen gelten allgemein für Ereignisse A und B?",
      options: ["P(Ā) = 1 − P(A)", "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)", "P(A ∩ B) = P(A)P(B) für beliebige A und B", "P(Ω) = 1"],
      correct: [0, 1, 3], tip: "Prüfe, welche Regel Unabhängigkeit benötigt.",
      trap: "Die einfache Produktregel gilt nur bei Unabhängigkeit.",
      explanation: "Gegenereignis-, Additions- und Normierungsregel gelten allgemein; das Produkt der Randwahrscheinlichkeiten ergibt den Schnitt nur bei Unabhängigkeit."
    },
    {
      id: "stochastik-bedingt-m01", topic: "bedingt", category: "bedingt", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen über bedingte Wahrscheinlichkeit und Unabhängigkeit sind richtig?",
      options: ["P(A | B) = P(A ∩ B)/P(B) für P(B) > 0.", "Unabhängigkeit bedeutet P(A ∩ B) = P(A)P(B).", "P(A | B) und P(B | A) sind immer gleich.", "Positive disjunkte Ereignisse sind abhängig."],
      correct: [0, 1, 3], tip: "Beachte die jeweilige Bezugsgruppe.",
      trap: "Die beiden Richtungen einer Bedingung sind im Allgemeinen verschieden.",
      explanation: "Bedingung und Produktkriterium liefern die ersten beiden Aussagen; positive disjunkte Ereignisse verletzen das Produktkriterium."
    },
    {
      id: "stochastik-tests-m01", topic: "tests", category: "tests", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Hypothesentests sind richtig?",
      options: ["Ein Fehler 1. Art verwirft eine wahre H₀.", "Ein Fehler 2. Art verwirft H₀ bei wahrer Alternative nicht.", "Nichtverwerfen beweist H₀.", "Die Teststärke bei einem festen Alternativparameter ist 1 − β."],
      correct: [0, 1, 3], tip: "Unterscheide die tatsächliche Lage von der Entscheidung.",
      trap: "Nichtverwerfen ist kein Beweis der Nullhypothese.",
      explanation: "Die ersten beiden Aussagen definieren die Fehlerarten; die Teststärke ist die Gegenwahrscheinlichkeit zu β beim selben Alternativparameter."
    },
    {
      id: "stochastik-verteilungen-c01", topic: "verteilungen", category: "verteilungen", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Für X ~ B(n; p) ist der Erwartungswert {{0}} und die Varianz {{1}}.",
      blanks: [
        { options: ["np", "np(1−p)", "√np"], correct: "np" },
        { options: ["np(1−p)", "np", "√(np(1−p))"], correct: "np(1−p)" }
      ],
      tip: "Die Standardabweichung ist die Wurzel der Varianz.",
      trap: "Varianz und Standardabweichung sind verschiedene Kennwerte.",
      explanation: "Für die Binomialverteilung gelten μ = np und Var(X) = np(1−p)."
    },
    {
      id: "stochastik-normalverteilung-c01", topic: "normalverteilung", category: "normalverteilung", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Bei der Normalnäherung wird für P(X ≤ k) die Grenze {{0}}, für P(X ≥ k) die Grenze {{1}} verwendet.",
      blanks: [
        { options: ["k + 0,5", "k − 0,5", "k + 1"], correct: "k + 0,5" },
        { options: ["k − 0,5", "k + 0,5", "k − 1"], correct: "k − 0,5" }
      ],
      tip: "Der ganzzahlige Randwert soll jeweils vollständig enthalten sein.",
      trap: "Die untere und obere Grenze werden in entgegengesetzte Richtungen verschoben.",
      explanation: "Für die obere Grenze k + 0,5 und für die untere Grenze k − 0,5 verwenden."
    }
  );
})();
