(() => {
  "use strict";

  window.INFORMATIK_QUESTION_TOPICS = [
    { id: "basics", label: "Grundlagen, Topologien & OSI" },
    { id: "media", label: "Übertragungsmedien & Verkabelung" },
    { id: "ethernet", label: "Ethernet, Switches & VLAN" },
    { id: "ip", label: "IPv4, IPv6 & Subnetting" },
    { id: "routing", label: "Routing, ARP & Diagnose" }
  ];

  window.INFORMATIK_QUESTION_POOL = [
    {
      id: "net-01", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "single",
      prompt: "Was beschreibt ein Netzwerk am treffendsten?",
      options: ["Eine Verbindung mehrerer Systeme zum Austausch von Daten.", "Eine einzelne Anwendung auf einem Host.", "Nur die Verbindung eines Rechners mit dem Internet.", "Ein Speicherbereich für IP-Adressen."],
      correct: 0, tip: "Achte auf den Zweck, der mehrere Systeme miteinander verbindet.",
      trap: "Ein Netzwerk ist nicht auf Internetzugang beschränkt.",
      explanation: "Ein Netzwerk verbindet mehrere Systeme, damit sie Daten austauschen können."
    },
    {
      id: "net-02", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Zuordnung von Netzgröße und Einsatzbereich ist richtig?",
      options: ["PAN – persönlicher Nahbereich, zum Beispiel Bluetooth.", "MAN – weltumspannendes Netz.", "WAN – einzelner Raum oder Arbeitsplatz.", "GAN – mehrere Gebäude eines Campus."],
      correct: 0, tip: "Vergleiche die Reichweite der Abkürzungen vom persönlichen Bereich bis global.",
      trap: "GAN bezeichnet den globalen, nicht den Campusbereich.",
      explanation: "Ein PAN verbindet Geräte im persönlichen Nahbereich; ein GAN umfasst weltweite Netze."
    },
    {
      id: "net-03", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Netzwerktopologien treffen zu?",
      options: ["Bei einer Stern-Topologie führen Endgeräte zu einem zentralen Gerät.", "Ein Ausfall des zentralen Geräts kann eine Stern-Topologie beeinträchtigen.", "Ein Mesh bietet oft mehrere alternative Verbindungswege.", "Bei einer Bus-Topologie hat jede Station eine eigene Verbindung zu einem zentralen Switch."],
      correct: [0, 1, 2], tip: "Unterscheide gemeinsame Leitung, zentrale Verbindung und mehrere alternative Wege.",
      trap: "Eine Bus-Topologie verwendet ein gemeinsames Übertragungsmedium.",
      explanation: "Sternnetze bündeln Verbindungen zentral; Mesh-Netze bieten mehrere Wege. Ein Bus nutzt ein gemeinsames Medium."
    },
    {
      id: "net-04", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Merkmale passen zu Client-Server-Netzen?",
      options: ["Clients fordern Dienste an.", "Server stellen Dienste bereit.", "Zentrale Verwaltung und Rechtevergabe sind möglich.", "Jeder Teilnehmer muss ausschließlich gleichberechtigt Dienste anbieten."],
      correct: [0, 1, 2], tip: "Ordne anfragende Systeme und bereitstellende Systeme ihren Rollen zu.",
      trap: "Gleichberechtigte Teilnehmer beschreiben eher Peer-to-Peer.",
      explanation: "Im Client-Server-Modell fordern Clients Dienste an, während Server sie zentral bereitstellen."
    },
    {
      id: "net-05", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "multiple",
      prompt: "Was kann ein Kommunikationsprotokoll festlegen?",
      options: ["Syntax und Aufbau der Daten.", "Bedeutung und Reihenfolge von Nachrichten.", "Ablaufregeln der Kommunikation.", "Die physische Größe eines Switches."],
      correct: [0, 1, 2], tip: "Ein Protokoll regelt, wie Systeme Daten austauschen.",
      trap: "Protokolle beschreiben Regeln der Kommunikation, nicht Gehäusemaße.",
      explanation: "Protokolle legen unter anderem Syntax, Semantik, Reihenfolge und Ablauf der Kommunikation fest."
    },
    {
      id: "net-06", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Aussage über einen Port ist richtig?",
      options: ["Ein Port ist eine logische Adresse auf der Transportschicht und 16 Bit groß.", "Ein Port ist ein physischer Anschluss am Switch.", "Ein Port ist immer identisch mit einer MAC-Adresse.", "Ein Port kann nur Werte von 0 bis 255 annehmen."],
      correct: 0, tip: "Ports unterscheiden Anwendungen auf einem Host.",
      trap: "Ein logischer Port ist nicht die physische Netzwerkschnittstelle.",
      explanation: "Portnummern sind 16-Bit-Werte von 0 bis 65535 und ordnen Netzwerkkommunikation Anwendungen oder Prozessen zu."
    },
    {
      id: "net-07", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "cloze",
      prompt: "Ein Socket verbindet eine {{0}} mit einer {{1}}.",
      blanks: [
        { options: ["IP-Adresse", "MAC-Adresse", "Subnetzmaske"], correct: "IP-Adresse" },
        { options: ["Portnummer", "VLAN-ID", "Framegröße"], correct: "Portnummer" }
      ],
      tip: "Die übliche Schreibweise lautet IP-Adresse:Doppelpunkt:Portnummer.",
      trap: "Eine Subnetzmaske ist kein Bestandteil des Socket-Endpunkts.",
      explanation: "Ein Socket-Endpunkt wird typischerweise durch IP-Adresse und Portnummer angegeben."
    },
    {
      id: "net-08", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Übermittlungsarten sind richtig beschrieben?",
      options: ["Unicast adressiert genau einen Empfänger.", "Broadcast adressiert alle Teilnehmer einer Broadcast-Domäne.", "Multicast adressiert eine Empfängergruppe.", "Anycast adressiert zwingend alle Hosts eines Netzes."],
      correct: [0, 1, 2], tip: "Achte darauf, ob ein Ziel, alle oder eine Gruppe gemeint ist.",
      trap: "Anycast wählt eine passende beziehungsweise nächstgelegene Instanz aus.",
      explanation: "Unicast ist Einzel-, Broadcast ist Domänen- und Multicast ist Gruppenadressierung."
    },
    {
      id: "net-09", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Ordne die PDU der OSI-Schicht zu: Schicht 1 {{0}}, Schicht 2 {{1}}, Schicht 3 {{2}}, Schicht 4 bei TCP {{3}}.",
      blanks: [
        { options: ["Bit", "Frame", "Paket"], correct: "Bit" },
        { options: ["Frame", "Paket", "Segment"], correct: "Frame" },
        { options: ["Paket", "Bit", "Segment"], correct: "Paket" },
        { options: ["Segment", "Frame", "Bit"], correct: "Segment" }
      ],
      tip: "Die Einheiten steigen von Bits über Frames und Pakete bis zu Transportsegmenten.",
      trap: "MAC und Frame gehören zu Schicht 2; IP und Paket zu Schicht 3.",
      explanation: "Die PDU heißt auf Schicht 1 Bit, auf Schicht 2 Frame, auf Schicht 3 Paket und bei TCP auf Schicht 4 Segment."
    },
    {
      id: "net-10", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Zuordnungen zwischen OSI- und TCP/IP-Modell sind richtig?",
      options: ["OSI 7 bis 5 entsprechen der Anwendungsschicht im TCP/IP-Modell.", "OSI-Schicht 4 entspricht der Transportschicht.", "OSI-Schicht 3 entspricht der Internet-Schicht.", "OSI-Schichten 2 und 1 entsprechen der Anwendungsschicht."],
      correct: [0, 1, 2], tip: "Im TCP/IP-Modell werden mehrere der oberen OSI-Schichten zusammengefasst.",
      trap: "Die OSI-Schichten 1 und 2 bilden den Netzzugang.",
      explanation: "TCP/IP fasst OSI 5–7 zur Anwendung und OSI 1–2 zum Netzzugang zusammen; Transport und Vermittlung bleiben getrennt."
    },
    {
      id: "net-11", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Well-known Ports reichen von {{0}}, registrierte Ports von {{1}} und dynamische/private Ports von {{2}}.",
      blanks: [
        { options: ["0–1023", "1024–49151", "49152–65535"], correct: "0–1023" },
        { options: ["1024–49151", "0–1023", "49152–65535"], correct: "1024–49151" },
        { options: ["49152–65535", "0–1023", "1024–49151"], correct: "49152–65535" }
      ],
      tip: "Die drei Portbereiche sind aufsteigend geordnet und umfassen zusammen 0 bis 65535.",
      trap: "Dynamische/private Client-Ports liegen im höchsten Bereich.",
      explanation: "Das Lernblatt ordnet 0–1023 als Well-known, 1024–49151 als registriert und 49152–65535 als dynamisch/privat ein."
    },
    {
      id: "net-12", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Zuordnungen von Protokoll und Port entsprechen dem Lernblatt?",
      options: ["HTTP – TCP 80.", "HTTPS – TCP 443.", "DNS – UDP/TCP 53.", "SSH – UDP 69."],
      correct: [0, 1, 2], tip: "Vergleiche Transportprotokoll und Standardport in der Tabelle.",
      trap: "UDP 69 gehört zu TFTP; SSH verwendet TCP 22.",
      explanation: "HTTP nutzt standardmäßig TCP 80, HTTPS TCP 443 und DNS UDP/TCP 53."
    },
    {
      id: "net-13", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Aussage über Routing-Protokolle ist richtig?",
      options: ["Sie tauschen Routinginformationen zwischen Routern aus.", "Sie sind gleichbedeutend mit Webprotokollen wie HTTP.", "Sie verwenden ausschließlich die MAC-Adresse als Zielnetz.", "Sie übertragen nur elektrische Signale auf Schicht 1."],
      correct: 0, tip: "RIP, OSPF und BGP helfen Routern bei Routeninformationen.",
      trap: "Ein Routed Protocol wie IPv4 transportiert adressierte Nutzdaten; ein Routing-Protokoll berechnet oder verteilt Routen.",
      explanation: "Routing-Protokolle tauschen Informationen aus, anhand derer Router Routen ermitteln."
    },

    {
      id: "med-01", topic: "media", category: "media", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Aufgabe gehört zur OSI-Schicht 1?",
      options: ["Bits als Signale über ein physisches Medium übertragen.", "IP-Routen auswählen.", "Frames anhand von MAC-Adressen weiterleiten.", "Ports Anwendungen zuordnen."],
      correct: 0, tip: "Schicht 1 arbeitet mit Signalen und Übertragungsmedien.",
      trap: "MAC-Adressen gehören zur Sicherungsschicht.",
      explanation: "Die Bitübertragungsschicht behandelt unter anderem mechanische, elektrische und verfahrenstechnische Eigenschaften."
    },
    {
      id: "med-02", topic: "media", category: "media", difficulty: "leicht", points: 1, type: "single",
      prompt: "Was bewirkt die Verdrillung der Adern bei Twisted-Pair-Kabeln?",
      options: ["Sie reduziert Störeinflüsse.", "Sie wandelt Ethernet in WLAN um.", "Sie weist jedem Kabel automatisch eine IP-Adresse zu.", "Sie erhöht die Framegröße auf 1522 Byte."],
      correct: 0, tip: "Die Verdrillung ist eine Maßnahme gegen elektrische Einflüsse.",
      trap: "Die Kabelkonstruktion verändert keine logischen Netzwerkadressen.",
      explanation: "Die Paarverdrillung reduziert elektromagnetische Störungen."
    },
    {
      id: "med-03", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Kupferkabeln sind richtig?",
      options: ["UTP ist ungeschirmtes Twisted Pair.", "STP bezeichnet allgemein geschirmtes Twisted Pair.", "Koaxialkabel besitzen Innenleiter, Dielektrikum und Außenleiter.", "FTP bezeichnet in diesem Zusammenhang ein optisches Glasfaserkabel."],
      correct: [0, 1, 2], tip: "Unterscheide die Schirmung und den Aufbau der jeweiligen Kabelarten.",
      trap: "FTP steht im Kabelkontext für Folien-Schirmung, nicht für Glasfaser.",
      explanation: "UTP ist ungeschirmt, STP allgemein geschirmt, FTP besitzt einen Folienschirm; Koaxialkabel haben konzentrische Leiter."
    },
    {
      id: "med-04", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage vergleicht Singlemode- und Multimode-Glasfaser richtig?",
      options: ["Multimode wird typischerweise für kürzere Strecken, Singlemode für größere Reichweiten verwendet.", "Singlemode nutzt mehrere Lichtmoden und ist nur für kurze Strecken geeignet.", "Beide übertragen elektrische Signale über Kupferadern.", "Multimode kann keine Daten übertragen."],
      correct: 0, tip: "Vergleiche Anzahl der Lichtmoden und typische Reichweite.",
      trap: "Singlemode ist gerade für große Reichweiten geeignet.",
      explanation: "Multimode-Fasern führen mehrere Lichtmoden und werden eher für kürzere Strecken genutzt; Singlemode-Fasern eignen sich für große Reichweiten."
    },
    {
      id: "med-05", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Vorteile bietet Glasfaser gegenüber Kupfer?",
      options: ["Hohe Bandbreite und große Reichweite.", "Unempfindlichkeit gegenüber elektromagnetischen Störungen.", "Keine leitende Masseverbindung zwischen den Enden.", "In jedem Fall günstigere Stecker und Messgeräte."],
      correct: [0, 1, 2], tip: "Achte auf Übertragungseigenschaften und elektrische Isolation.",
      trap: "Die Prüf- und Montagetechnik kann bei Glasfaser teurer sein.",
      explanation: "Glasfaser ermöglicht hohe Bandbreiten und Reichweiten, ist störungsunempfindlich und elektrisch nicht leitend."
    },
    {
      id: "med-06", topic: "media", category: "media", difficulty: "leicht", points: 1, type: "multiple",
      prompt: "Welche Aussagen zu drahtlosen Übertragungsarten treffen zu?",
      options: ["Bei WLAN-Infrastructure kommunizieren Geräte über Access Points.", "Im Ad-hoc-Modus können Geräte direkt ohne zentrale Infrastruktur kommunizieren.", "Roaming bezeichnet den Wechsel eines Clients zwischen Funkzellen oder Access Points.", "Bluetooth ist ein Weitverkehrsnetz für weltweite Kommunikation."],
      correct: [0, 1, 2], tip: "Vergleiche direkte Kommunikation mit Kommunikation über eine Infrastruktur.",
      trap: "Bluetooth ist ein Kurzstrecken-/WPAN-Verfahren.",
      explanation: "Infrastructure-WLAN nutzt Access Points, Ad-hoc verbindet Geräte direkt und Roaming wechselt zwischen Funkzellen."
    },
    {
      id: "med-07", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "single",
      prompt: "Wofür steht die Bezeichnung 1000BASE-SX typischerweise?",
      options: ["1 Gbit/s über Kurzstrecken-Glasfaser.", "100 Mbit/s über Twisted-Pair-Kupfer.", "10 Gbit/s über Langstrecken-Singlemode.", "1 Gbit/s über WLAN im 2,4-GHz-Band."],
      correct: 0, tip: "Lies zuerst die Datenrate und dann das Medium beziehungsweise die Reichweitenklasse.",
      trap: "SX steht typischerweise für kurze Glasfaserstrecken.",
      explanation: "1000BASE-SX bezeichnet Gigabit-Ethernet über Kurzstrecken-Glasfaser."
    },
    {
      id: "med-08", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Der Primärbereich verbindet {{0}}, der Sekundärbereich verbindet {{1}} und der Tertiärbereich führt zu {{2}}.",
      blanks: [
        { options: ["Gebäude- oder Standortbereiche", "Arbeitsplätze", "Etagenverteiler"], correct: "Gebäude- oder Standortbereiche" },
        { options: ["Gebäudeetagen oder Gebäudebereiche", "Standorte", "einzelne Ports"], correct: "Gebäudeetagen oder Gebäudebereiche" },
        { options: ["Arbeitsplätzen", "Gebäuden", "Routern im Internet"], correct: "Arbeitsplätzen" }
      ],
      tip: "Die strukturierte Verkabelung führt vom Standort über das Gebäude bis zum Arbeitsplatz.",
      trap: "Der Tertiärbereich ist der arbeitsplatznahe Bereich.",
      explanation: "Die Bereiche werden als Primär (Standort), Sekundär (Gebäude) und Tertiär (Arbeitsplatz) gegliedert."
    },
    {
      id: "med-09", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "single",
      prompt: "Wie lang darf ein Permanent Link in der festen strukturierten Verkabelung typischerweise höchstens sein?",
      options: ["90 m.", "30 m.", "150 m.", "500 m."],
      correct: 0, tip: "Unterscheide Permanent Link von einem Channel Link mit Patchkabeln.",
      trap: "Der typische Channel Link ist mit Patchkabeln bis 100 m ausgelegt.",
      explanation: "Für den Permanent Link der festen Installation nennt das Lernblatt typischerweise höchstens 90 m."
    },
    {
      id: "med-10", topic: "media", category: "media", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu WLAN-Zugriffsverfahren treffen zu?",
      options: ["CSMA/CA soll Kollisionen vermeiden oder minimieren.", "CSMA/CD erkennt Kollisionen und wird klassischen kollisionsfähigen Shared-Medien zugeordnet.", "Token Passing erlaubt das Senden der Station mit dem Token.", "CSMA/CA bedeutet, dass jede Station gleichzeitig senden darf."],
      correct: [0, 1, 2], tip: "Ordne Collision Avoidance, Collision Detection und Token-Zuteilung auseinander.",
      trap: "CSMA/CA erlaubt keine beliebigen gleichzeitigen Sendungen.",
      explanation: "CSMA/CA vermeidet Kollisionen, CSMA/CD erkennt sie, und beim Token Passing sendet die Station mit der Freigabe."
    },

    {
      id: "eth-01", topic: "ethernet", category: "ethernet", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Adresse verwendet ein normaler Switch primär zur gezielten Frame-Weiterleitung?",
      options: ["Die Ziel-MAC-Adresse.", "Die Ziel-Portnummer.", "Die Subnetzmaske.", "Die DNS-Adresse."],
      correct: 0, tip: "Ein Switch arbeitet bei klassischer Weiterleitung auf Schicht 2.",
      trap: "IP-Routen und Ziel-IP sind Aufgaben der Vermittlungsschicht.",
      explanation: "Ein Layer-2-Switch leitet Frames anhand der Ziel-MAC-Adresse weiter."
    },
    {
      id: "eth-02", topic: "ethernet", category: "ethernet", difficulty: "leicht", points: 1, type: "single",
      prompt: "Wie lang ist eine MAC-Adresse laut Lernblatt?",
      options: ["48 Bit.", "32 Bit.", "64 Bit.", "128 Bit."],
      correct: 0, tip: "Die Adresse besteht aus sechs Bytes.",
      trap: "32 Bit ist die Länge einer IPv4-Adresse.",
      explanation: "Eine MAC-Adresse ist 48 Bit beziehungsweise sechs Byte lang."
    },
    {
      id: "eth-03", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zur MAC-Adresse sind richtig?",
      options: ["Die ersten 24 Bit bilden die Hersteller-OUI.", "Die folgenden 24 Bit sind gerätespezifisch.", "Sie wird üblicherweise hexadezimal dargestellt.", "Sie ist eine 16-Bit-Portnummer."],
      correct: [0, 1, 2], tip: "Teile die 48 Bit in Hersteller- und gerätespezifischen Anteil.",
      trap: "Portnummern und MAC-Adressen haben unterschiedliche Länge und Funktion.",
      explanation: "Die MAC-Adresse umfasst 48 Bit, meist als Hexadezimalzahl; die ersten 24 Bit sind die OUI."
    },
    {
      id: "eth-04", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Gesamtlänge hat ein klassischer Ethernet-Frame ohne Preamble und SFD mindestens und höchstens?",
      options: ["64 bis 1518 Byte.", "46 bis 1500 Byte.", "60 bis 1514 Byte.", "64 bis 1522 Byte in jedem Fall."],
      correct: 0, tip: "Die Standardlänge umfasst MAC-Header, Datenfeld und FCS.",
      trap: "Ein VLAN-Tag kann die maximale Länge auf 1522 Byte erhöhen.",
      explanation: "Ein klassischer Ethernet-Frame ist 64 bis 1518 Byte lang; Preamble und SFD zählen nicht dazu."
    },
    {
      id: "eth-05", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Im Ethernet-Frame sind Ziel-MAC und Quell-MAC jeweils {{0}} Byte lang; die FCS umfasst {{1}} Byte.",
      blanks: [
        { options: ["6", "4", "2"], correct: "6" },
        { options: ["4", "6", "8"], correct: "4" }
      ],
      tip: "Die Ziel- und Quelladresse sind gleich lang; die FCS ist das Fehlerprüffeld.",
      trap: "Die 4 Byte der FCS sind nicht die Länge einer MAC-Adresse.",
      explanation: "Ziel- und Quell-MAC umfassen jeweils 6 Byte, die FCS/CRC 4 Byte."
    },
    {
      id: "eth-06", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Ethernet-Frame-Feldern und -Längen sind richtig?",
      options: ["Das Datenfeld umfasst im Standard 46 bis 1500 Byte.", "Zu kurze Nutzdaten werden bei Bedarf durch Padding ergänzt.", "Preamble und SFD zählen zur üblichen Frame-Länge von 64 bis 1518 Byte.", "Ein 802.1Q-Tag kann die maximale Länge auf 1522 Byte erhöhen."],
      correct: [0, 1, 3], tip: "Unterscheide MAC-Frame-Länge vom Synchronisationsvorspann.",
      trap: "Preamble und SFD werden bei der angegebenen Länge nicht mitgezählt.",
      explanation: "Das Datenfeld wird auf mindestens 46 Byte aufgefüllt; ein VLAN-Tag fügt 4 Byte hinzu."
    },
    {
      id: "eth-07", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aufgabe erfüllt die FCS im Ethernet-Frame?",
      options: ["Sie unterstützt die Erkennung von Übertragungsfehlern.", "Sie enthält die Ziel-IP-Adresse.", "Sie wählt das VLAN aus.", "Sie speichert den nächsten Routing-Hop."],
      correct: 0, tip: "FCS steht für Frame Check Sequence.",
      trap: "Die FCS ist kein Routing- oder Adressfeld.",
      explanation: "Die FCS wird zur Fehlererkennung verwendet und basiert typischerweise auf CRC."
    },
    {
      id: "eth-08", topic: "ethernet", category: "ethernet", difficulty: "schwer", points: 3, type: "multiple",
      prompt: "Welche Aussagen zum Learning und Forwarding eines Switches treffen zu?",
      options: ["Der Switch lernt die Quell-MAC zusammen mit dem Eingangsport.", "Bei bekannter Ziel-MAC kann er den Frame gezielt weiterleiten.", "Bei unbekannter Ziel-MAC floodet er üblicherweise über andere Ports.", "Er lernt die Ziel-IP und baut daraus automatisch eine Subnetzroute."],
      correct: [0, 1, 2], tip: "Die SAT/MAC-Tabelle verknüpft Quelladressen mit Switchports.",
      trap: "Ein normaler Layer-2-Switch berechnet keine IP-Routen.",
      explanation: "Ein Switch lernt Quell-MAC/Port-Zuordnungen und flutet unbekannte Ziel-MACs aus allen anderen Ports."
    },
    {
      id: "eth-09", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Kollisions- und Broadcast-Domänen sind richtig?",
      options: ["Ein Hub bildet eine gemeinsame Kollisionsdomäne.", "Ein Switch trennt Kollisionsdomänen pro Port.", "Ein gewöhnlicher Switch trennt ohne VLAN keine Broadcast-Domänen.", "Ein Router verbindet alle Broadcast-Domänen ohne Trennung."],
      correct: [0, 1, 2], tip: "Unterscheide Kollisionsdomänen von Broadcast-Domänen.",
      trap: "Router trennen Broadcast-Domänen.",
      explanation: "Hubs teilen eine Kollisionsdomäne; Switchports trennen Kollisionsdomänen, während Router beziehungsweise VLANs Broadcast-Domänen abgrenzen."
    },
    {
      id: "eth-10", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage über VLANs ist richtig?",
      options: ["VLANs trennen logische Broadcast-Domänen auf einer Switch-Infrastruktur.", "Ein VLAN ersetzt die IP-Adresse durch eine Portnummer.", "Ein VLAN-Tag ist immer 12 Byte groß.", "VLANs sind ausschließlich für Glasfaseranschlüsse vorgesehen."],
      correct: 0, tip: "802.1Q kennzeichnet VLANs innerhalb von Ethernet-Frames.",
      trap: "Das Tag umfasst 4 Byte; darin ist die VLAN-ID ein 12-Bit-Feld.",
      explanation: "VLANs teilen eine Switch-Infrastruktur in logische Broadcast-Domänen."
    },

    {
      id: "ip-01", topic: "ip", category: "ip", difficulty: "leicht", points: 1, type: "single",
      prompt: "Wie ist eine IPv4-Adresse aufgebaut?",
      options: ["32 Bit in vier Oktetten zu je 8 Bit.", "48 Bit in sechs Oktetten.", "64 Bit in vier Oktetten.", "128 Bit in acht Hexadezimalblöcken."],
      correct: 0, tip: "Jeder der vier Dezimalwerte wird aus acht Bits gebildet.",
      trap: "128 Bit beschreibt IPv6.",
      explanation: "IPv4 besitzt 32 Bit und wird als vier Dezimaloktette von 0 bis 255 dargestellt."
    },
    {
      id: "ip-02", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu privaten IPv4-Bereichen sind richtig?",
      options: ["10.0.0.0/8 ist privat.", "172.16.0.0/12 ist privat.", "192.168.0.0/16 ist privat.", "172.32.0.0/12 ist ein privater Bereich laut Lernblatt."],
      correct: [0, 1, 2], tip: "Merke dir die drei privaten IPv4-Adressbereiche.",
      trap: "Der private 172er-Bereich endet bei 172.31.255.255.",
      explanation: "Die privaten Bereiche sind 10/8, 172.16/12 und 192.168/16."
    },
    {
      id: "ip-03", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage zum historischen IPv4-Klassenmodell ist richtig?",
      options: ["Klasse C umfasst im ersten Oktett 192 bis 223 und wurde historisch mit /24 verknüpft.", "Klasse A umfasst 192 bis 223 und verwendet /24.", "Klasse B umfasst 1 bis 126 und verwendet /8.", "Das Klassenmodell ersetzt heute CIDR in modernen Netzen."],
      correct: 0, tip: "Vergleiche den Bereich des ersten Oktetts und das historische Standardpräfix.",
      trap: "Moderne Netze werden überwiegend mit CIDR geplant.",
      explanation: "Klasse C reichte historisch von 192 bis 223 und entsprach typischerweise /24."
    },
    {
      id: "ip-04", topic: "ip", category: "ip", difficulty: "leicht", points: 1, type: "cloze",
      prompt: "Eine Subnetzmaske mit Präfix /26 hat die Dezimalmaske {{0}}.",
      blanks: [
        { options: ["255.255.255.192", "255.255.255.224", "255.255.255.128"], correct: "255.255.255.192" }
      ],
      tip: "Ein /26-Präfix setzt die ersten 26 Bits auf 1.",
      trap: "/25 entspricht 255.255.255.128.",
      explanation: "Die Maske /26 lautet 255.255.255.192."
    },
    {
      id: "ip-05", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "single",
      prompt: "Wie viele nutzbare Hostadressen besitzt ein IPv4-Netz mit Präfix /29?",
      options: ["6.", "8.", "14.", "30."],
      correct: 0, tip: "Berechne zuerst die Hostbits und ziehe Netz- und Broadcastadresse ab.",
      trap: "Acht Adressen insgesamt bedeuten nicht acht nutzbare Hosts.",
      explanation: "/29 lässt drei Hostbits: 2³ − 2 = 6 nutzbare Hostadressen."
    },
    {
      id: "ip-06", topic: "ip", category: "ip", difficulty: "schwer", points: 3, type: "cloze",
      prompt: "Das Netz 192.168.10.0/24 wird in /27-Subnetze geteilt. Es entstehen {{0}} Subnetze mit jeweils {{1}} nutzbaren Hosts.",
      blanks: [
        { options: ["8", "4", "16"], correct: "8" },
        { options: ["30", "32", "62"], correct: "30" }
      ],
      tip: "Es werden drei Subnetzbits ausgeliehen und fünf Hostbits bleiben übrig.",
      trap: "Bei der Hostzahl werden Netz- und Broadcastadresse nicht mitgezählt.",
      explanation: "Drei ausgeliehene Bits ergeben 2³ = 8 Subnetze; fünf Hostbits ergeben 2⁵ − 2 = 30 nutzbare Hosts pro Subnetz."
    },
    {
      id: "ip-07", topic: "ip", category: "ip", difficulty: "schwer", points: 3, type: "multiple",
      prompt: "Ein Netzwerk 192.168.50.0/24 soll in mindestens vier gleich große Subnetze geteilt werden. Welche Aussagen stimmen?",
      options: ["Es müssen mindestens zwei Subnetzbits ausgeliehen werden.", "Das neue Präfix lautet /26.", "Die Blockgröße im letzten Oktett beträgt 64.", "Jedes Subnetz hat 126 nutzbare Hosts."],
      correct: [0, 1, 2], tip: "Vier Subnetze benötigen zwei zusätzliche Netzbits.",
      trap: "Bei /26 bleiben sechs Hostbits, nicht sieben.",
      explanation: "Aus /24 wird /26; die Blockgröße ist 64 und jedes Subnetz besitzt 2⁶ − 2 = 62 nutzbare Hosts."
    },
    {
      id: "ip-08", topic: "ip", category: "ip", difficulty: "schwer", points: 3, type: "single",
      prompt: "Welche Netzadresse gehört zu 192.168.10.77/26?",
      options: ["192.168.10.64.", "192.168.10.0.", "192.168.10.77.", "192.168.10.128."],
      correct: 0, tip: "/26 bildet im letzten Oktett Blöcke der Größe 64.",
      trap: "Die Hostadresse selbst ist nicht automatisch die Netzadresse.",
      explanation: "Die /26-Blöcke beginnen bei .0, .64, .128 und .192; .77 liegt im Netz 192.168.10.64/26."
    },
    {
      id: "ip-09", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Netz-, Broadcast- und Hostadressen sind richtig?",
      options: ["Die kleinste Adresse eines IPv4-Subnetzes ist die Netzadresse.", "Die größte Adresse eines IPv4-Subnetzes ist die Broadcastadresse.", "Netz- und Broadcastadresse sind üblicherweise keine nutzbaren Hostadressen.", "Das Default-Gateway muss immer die Broadcastadresse sein."],
      correct: [0, 1, 2], tip: "Die Grenzen eines Subnetzes sind reserviert.",
      trap: "Ein Gateway liegt typischerweise auf einer nutzbaren Hostadresse.",
      explanation: "Netz- und Broadcastadresse markieren die Grenzen; Hosts und Gateway verwenden nutzbare Adressen dazwischen."
    },
    {
      id: "ip-10", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "single",
      prompt: "Wie wird die Netzadresse aus IPv4-Adresse und Subnetzmaske berechnet?",
      options: ["Durch eine bitweise UND-Verknüpfung.", "Durch eine bitweise XOR-Verknüpfung.", "Durch Addition der Dezimaloktette.", "Durch Umwandlung der MAC-Adresse."],
      correct: 0, tip: "Nur Bits, die in Adresse und Maske beide 1 sind, bleiben gesetzt.",
      trap: "Die Broadcastadresse wird anders berechnet: mit der invertierten Maske.",
      explanation: "Die IPv4-Adresse wird bitweise mit der Subnetzmaske UND-verknüpft."
    },
    {
      id: "ip-11", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage beschreibt VLSM richtig?",
      options: ["Teilnetze können unterschiedliche Präfixlängen erhalten.", "Alle Subnetze müssen exakt gleich groß sein.", "VLSM wandelt IPv4 in MAC-Adressen um.", "VLSM ist ein Verfahren zur Fehlerprüfung von Ethernet-Frames."],
      correct: 0, tip: "Variable Length Subnet Masking erlaubt unterschiedlich große Teilnetze.",
      trap: "Gleich große Subnetze sind nicht die entscheidende Eigenschaft von VLSM.",
      explanation: "VLSM verwendet je Teilbereich unterschiedliche Präfixlängen passend zum Hostbedarf."
    },
    {
      id: "ip-12", topic: "ip", category: "ip", difficulty: "leicht", points: 1, type: "multiple",
      prompt: "Welche Aussagen zu IPv6 sind richtig?",
      options: ["Eine IPv6-Adresse umfasst 128 Bit.", "Sie wird in acht hexadezimalen Blöcken geschrieben.", "IPv6 verwendet Broadcast wie IPv4.", "IPv6 kennt unter anderem Unicast, Multicast und Anycast."],
      correct: [0, 1, 3], tip: "IPv6 verwendet längere Adressen und eine andere Darstellung als IPv4.",
      trap: "IPv6 besitzt keine Broadcast-Adressart.",
      explanation: "IPv6-Adressen umfassen 128 Bit und werden hexadezimal notiert; IPv6 nutzt unter anderem Unicast, Multicast und Anycast."
    },

    {
      id: "rt-01", topic: "routing", category: "routing", difficulty: "leicht", points: 1, type: "single",
      prompt: "Auf welcher OSI-Schicht arbeitet ein Router primär?",
      options: ["Schicht 3 – Vermittlungsschicht.", "Schicht 1 – Bitübertragung.", "Schicht 2 – Sicherungsschicht.", "Schicht 7 – Anwendungsschicht."],
      correct: 0, tip: "Router verbinden unterschiedliche IP-Netze.",
      trap: "Switches leiten klassische Ethernet-Frames anhand von MAC-Adressen auf Schicht 2 weiter.",
      explanation: "Router treffen Weiterleitungsentscheidungen anhand logischer IP-Adressen auf Schicht 3."
    },
    {
      id: "rt-02", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Angaben kann eine Routingtabellenzeile enthalten?",
      options: ["Zielnetz und Präfix.", "Next-Hop oder Ausgangsschnittstelle.", "Eine Metrik.", "Die vollständige Liste aller Ethernet-Nutzdaten."],
      correct: [0, 1, 2], tip: "Die Tabelle entscheidet, wohin ein Paket für ein Zielnetz weitergeleitet wird.",
      trap: "Eine Routingtabelle speichert nicht den Inhalt sämtlicher Frames.",
      explanation: "Routingtabellen enthalten Zielpräfixe und Weiterleitungsinformationen wie Next-Hop, Schnittstelle und gegebenenfalls Metrik."
    },
    {
      id: "rt-03", topic: "routing", category: "routing", difficulty: "schwer", points: 3, type: "single",
      prompt: "Welche Route wird bei mehreren passenden Einträgen üblicherweise gewählt?",
      options: ["Die Route mit dem längsten passenden Präfix.", "Immer die Default-Route.", "Die Route mit dem kürzesten Präfix.", "Die erste alphabetisch sortierte Route."],
      correct: 0, tip: "Der längste Präfix beschreibt den spezifischsten passenden Netzbereich.",
      trap: "Die Default-Route wird nur benutzt, wenn kein spezifischerer Eintrag passt.",
      explanation: "Router verwenden üblicherweise den passendsten Eintrag mit dem längsten Präfix."
    },
    {
      id: "rt-04", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Die Default-Route für IPv4 lautet {{0}} und wird verwendet, wenn {{1}}.",
      blanks: [
        { options: ["0.0.0.0/0", "127.0.0.1/8", "255.255.255.255/32"], correct: "0.0.0.0/0" },
        { options: ["kein speziellerer Eintrag passt", "das Ziel im lokalen Netz liegt", "die MAC-Adresse unbekannt ist"], correct: "kein speziellerer Eintrag passt" }
      ],
      tip: "Eine Default-Route ist die Auffangroute für nicht spezifisch gelistete Ziele.",
      trap: "Ein lokales Ziel benötigt nicht automatisch die Default-Route.",
      explanation: "0.0.0.0/0 passt grundsätzlich auf alle Ziele und wird nur genutzt, wenn kein spezifischerer Routeneintrag passt."
    },
    {
      id: "rt-05", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen unterscheiden statisches und dynamisches Routing richtig?",
      options: ["Statische Routen werden manuell gepflegt.", "Dynamisches Routing kann Routen automatisch austauschen und aktualisieren.", "Statisches Routing verursacht grundsätzlich mehr Routingverkehr als dynamisches.", "Dynamisches Routing kann zusätzlichen Konfigurationsaufwand und Overhead verursachen."],
      correct: [0, 1, 3], tip: "Vergleiche manuelle Pflege mit automatischem Austausch von Routinginformationen.",
      trap: "Statisches Routing verursacht typischerweise keinen Routing-Protokollverkehr.",
      explanation: "Statische Routen sind manuell und vorhersehbar; dynamische Verfahren aktualisieren Routen automatisch, benötigen aber Ressourcen."
    },
    {
      id: "rt-06", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage unterscheidet ein Routed Protocol von einem Routing-Protokoll?",
      options: ["IPv4 ist ein Routed Protocol; OSPF tauscht Routinginformationen aus.", "OSPF ist ein Routed Protocol für Nutzdaten; IPv4 verteilt Routertabellen.", "Beide Begriffe bezeichnen ausschließlich Ethernet-Frames.", "Ein Routing-Protokoll weist Hosts ihre MAC-Adresse zu."],
      correct: 0, tip: "Ein Begriff bezeichnet weitergeleitete Nutzdatenprotokolle, der andere berechnet beziehungsweise verteilt Routen.",
      trap: "Routing-Protokolle wie OSPF dienen dem Routenaustausch.",
      explanation: "IPv4/IPv6 transportieren adressierte Nutzdaten; OSPF, RIP und BGP sind Routing-Protokolle."
    },
    {
      id: "rt-07", topic: "routing", category: "routing", difficulty: "schwer", points: 3, type: "multiple",
      prompt: "Welche Aussagen zu Routing-Protokollen und Metriken stimmen?",
      options: ["RIP verwendet die Hop-Anzahl; 16 Hops gelten als unerreichbar.", "OSPF ist ein Link-State-Verfahren und berechnet Pfade mit Dijkstra.", "BGP wird für Routing zwischen Autonomous Systems eingesetzt.", "Eine Metrik kann ausschließlich die MAC-Adresse eines Routers sein."],
      correct: [0, 1, 2], tip: "Ordne RIP, OSPF und BGP ihren im Lernblatt genannten Verfahren zu.",
      trap: "Metriken können Hop-Anzahl, Bandbreite, Verzögerung oder Kosten sein.",
      explanation: "RIP nutzt Hop-Count, OSPF Link-State/Dijkstra und BGP Pfadinformationen und Policies zwischen autonomen Systemen."
    },
    {
      id: "rt-08", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "single",
      prompt: "Ein Host möchte eine IPv4-Adresse im eigenen lokalen Netz erreichen. Wozu verwendet er ARP?",
      options: ["Die bekannte lokale IPv4-Adresse einer MAC-Adresse zuzuordnen.", "Eine IPv6-Adresse in eine Portnummer umzuwandeln.", "Die Default-Route aus dem Internet zu laden.", "Ein Ethernet-Frame zu verschlüsseln."],
      correct: 0, tip: "ARP löst IPv4-Adressen im lokalen Netz auf.",
      trap: "Bei einem entfernten Ziel wird die MAC des Default-Gateways ermittelt.",
      explanation: "ARP ordnet einer bekannten IPv4-Adresse im lokalen Netz die zugehörige MAC-Adresse zu."
    },
    {
      id: "rt-09", topic: "routing", category: "routing", difficulty: "schwer", points: 3, type: "multiple",
      prompt: "Was passiert beim Weiterleiten eines IP-Pakets über einen Router?",
      options: ["Quell- und Ziel-IP bleiben grundsätzlich erhalten.", "Die Layer-2-MAC-Adressen werden für den nächsten Hop neu gesetzt.", "Der Router prüft die Routingtabelle.", "Die ursprünglichen MAC-Adressen bleiben über alle Router-Hops unverändert."],
      correct: [0, 1, 2], tip: "Trenne die logischen IP-Adressen des Pakets von den MAC-Adressen des jeweiligen Frames.",
      trap: "MAC-Adressen gelten nur für den jeweiligen Layer-2-Abschnitt.",
      explanation: "Der Router prüft das Ziel-IP und erstellt für den nächsten Hop einen neuen Frame mit neuen MAC-Adressen."
    },
    {
      id: "rt-10", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Zuordnung von Diagnosebefehl und Zweck ist richtig?",
      options: ["ipconfig /all – lokale IP, Maske, Gateway und DHCP-Daten anzeigen.", "tracert – Router-Hops entlang eines Pfads anzeigen.", "nslookup – DNS-Auflösung prüfen.", "netstat -ano – Subnetzmaske in eine IPv6-Adresse umwandeln."],
      correct: [0, 1, 2], tip: "Ordne jeden Befehl seinem typischen Diagnoseziel zu.",
      trap: "netstat -ano zeigt Verbindungen und Listening-Sockets mit Prozess-ID.",
      explanation: "ipconfig /all zeigt Konfiguration, tracert den Pfad und nslookup prüft Namensauflösung; netstat -ano listet Verbindungen und Ports."
    },
    {
      id: "net-14", topic: "basics", category: "basics", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche OSI-Schicht verantwortet die fehlerfreie Übertragung von Daten zwischen zwei Systemen?",
      options: ["Schicht 2 – Sicherungsschicht.", "Schicht 3 – Vermittlungsschicht.", "Schicht 4 – Transportschicht.", "Schicht 1 – Bitübertragung."],
      correct: 2, tip: "Die Transportschicht nutzt TCP und UDP für end-to-end Verbindungen.",
      trap: "Die Sicherungsschicht arbeitet lokal zwischen zwei Knoten.",
      explanation: "Die Transportschicht (Schicht 4) ist verantwortlich für zuverlässige end-to-end Datenübertragung."
    },
    {
      id: "net-15", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu TCP und UDP sind richtig?",
      options: ["TCP ist verbindungsorientiert und zuverlässig.", "UDP ist verbindungslos und schneller als TCP.", "TCP prüft automatisch, ob Pakete ankamen.", "UDP garantiert eine fehlerfreie Zustellung."],
      correct: [0, 1, 2], tip: "TCP benutzt Three-Way-Handshake; UDP sendet einfach los.",
      trap: "UDP ist nicht zuverlässig und garantiert keine Zustellung.",
      explanation: "TCP ist verbindungsorientiert und zuverlässig; UDP ist verbindungslos und schneller, aber nicht zuverlässig."
    },
    {
      id: "net-16", topic: "basics", category: "basics", difficulty: "schwer", points: 3, type: "single",
      prompt: "Welche Aussage zum OSI-Modell und Encapsulation ist korrekt?",
      options: ["Daten auf Schicht 7 werden mit Headers von Schicht 6 bis 1 umhüllt.", "Jede Schicht fügt beim Versenden ihren eigenen Header hinzu.", "Beim Empfangen werden nur die Header der Schicht 1 geprüft.", "Headers werden beim Empfangen von unten nach oben wieder entfernt."],
      correct: 1, tip: "Dies ist das Encapsulation-Prinzip: jede Schicht wrappt die Daten.",
      trap: "Es werden nicht nur die Header der untersten Schicht geprüft.",
      explanation: "Beim Versenden werden Headers von oben nach unten hinzugefügt; beim Empfangen werden sie von unten nach oben entfernt."
    },
    {
      id: "net-17", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "FTP nutzt typischerweise {{0}}, SMTP nutzt {{1}} und HTTP nutzt {{2}}.",
      blanks: [
        { options: ["TCP 21", "TCP 23", "UDP 53"], correct: "TCP 21" },
        { options: ["TCP 25", "TCP 110", "UDP 123"], correct: "TCP 25" },
        { options: ["TCP 80", "TCP 443", "UDP 69"], correct: "TCP 80" }
      ],
      tip: "Merke die Standard-Portnummern für diese Anwendungsschicht-Protokolle.",
      trap: "UDP wird typischerweise für zeitkritische Dienste wie DNS verwendet.",
      explanation: "FTP nutzt TCP 21, SMTP nutzt TCP 25 und HTTP nutzt TCP 80."
    },
    {
      id: "eth-11", topic: "ethernet", category: "ethernet", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Aussage zu Full-Duplex und Half-Duplex beschreibt die Situation richtig?",
      options: ["Full-Duplex ermöglicht gleichzeitiges Senden und Empfangen.", "Half-Duplex bedeutet, man kann nur noch 50% Daten übertragen.", "Full-Duplex wird ausschließlich in Hubs verwendet.", "Half-Duplex nutzt immer ein gemeinsames Übertragungsmedium und CSMA/CD."],
      correct: 0, tip: "Full-Duplex mit Switches ermöglicht Vollduplexverkehr; Half-Duplex mit Hubs teilt sich das Medium.",
      trap: "Half-Duplex verringert nicht die Datenrate pauschal.",
      explanation: "Full-Duplex ermöglicht gleichzeitiges bidirektionales Senden; Half-Duplex wechselt zwischen Senden und Empfangen."
    },
    {
      id: "eth-12", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zur MAC-Adressierung im Ethernet-Netz stimmen?",
      options: ["Die OUI identifiziert den Gerätehersteller.", "Alle MAC-Adressen sind weltweit einzigartig.", "Broadcast-MAC ist FF:FF:FF:FF:FF:FF.", "Eine Multicast-MAC beginnt mit einer geraden ersten Hexadezimalziffer des ersten Bytes."],
      correct: [0, 2], tip: "Die OUI ist der Herstellerteil; FF:FF... ist Broadcasting; Multicast beginnt mit ungerader zweiter Hexadezimalziffer.",
      trap: "Nicht alle MAC-Adressen sind weltweit einzigartig; lokale Adressen sind möglich.",
      explanation: "OUI identifiziert den Hersteller, Broadcast ist FF:FF:FF:FF:FF:FF, Multicast beginnt mit ungerader Stelle im ersten Byte."
    },
    {
      id: "eth-13", topic: "ethernet", category: "ethernet", difficulty: "schwer", points: 3, type: "single",
      prompt: "Ein Switch empfängt einen Frame mit Ziel-MAC D. Wenn die MAC nicht in der Tabelle eingetragen ist, was macht der Switch normalerweise?",
      options: ["Er flooded den Frame über alle Ports außer dem Eingangsport.", "Er verwirft den Frame sofort.", "Er sendet eine Anfrage per ARP an alle Ports.", "Er wartet, bis ein DHCP-Server antwortet."],
      correct: 0, tip: "Flooded bedeutet, den Frame über alle anderen Ports zu senden.",
      trap: "Verwerfen würde zu unerreichbaren Zielen führen.",
      explanation: "Unbekannte Ziel-MACs werden geflooded, bis der Switch die MAC-Adresse irgendwann durch Learning erfährt."
    },
    {
      id: "ip-13", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "In einem /28-Netz gibt es {{0}} nutzbare Hostadressen pro Subnetz; die Blockgröße ist {{1}}.",
      blanks: [
        { options: ["14", "16", "8"], correct: "14" },
        { options: ["8", "16", "32"], correct: "16" }
      ],
      tip: "Ein /28 lässt 4 Hostbits: 2^4=16 Adressen insgesamt minus Netz und Broadcast ergibt 14.",
      trap: "16 ist die Gesamtzahl der Adressen, nicht die nutzbaren.",
      explanation: "16 Adressen insgesamt, minus Netz- und Broadcastadresse ergibt 14 nutzbare Hosts."
    },
    {
      id: "ip-14", topic: "ip", category: "ip", difficulty: "schwer", points: 3, type: "single",
      prompt: "Welche Netzadresse gehört zu 10.50.75.100/22?",
      options: ["10.50.72.0.", "10.50.76.0.", "10.50.75.0.", "10.50.64.0."],
      correct: 0, tip: "/22 bildet Blöcke der Größe 4 im dritten Oktett: .0, .4, .8, .12, ..., .72, .76.",
      trap: "Achte auf die richtige Blockgröße für /22.",
      explanation: "/22 hat Blöcke zu 4; .75 liegt im Netz .72."
    },
    {
      id: "ip-15", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu IPv4-Fragmentierung und MTU sind richtig?",
      options: ["Die MTU bestimmt die maximale Größe eines Frames ohne Fragmentierung.", "IPv4-Header können bis zu 60 Byte groß sein.", "Jedes Fragment hat seinen eigenen IPv4-Header.", "Die Ziel-IP ändert sich bei Fragmentierung."],
      correct: [0, 1, 2], tip: "IPv4-Fragmente müssen zusammengesetzt werden; die Ziel-IP bleibt gleich.",
      trap: "Die Ziel-IP ist über alle Fragmente konstant.",
      explanation: "MTU begrenzt Framegröße, IPv4-Header bis 60 Byte, jedes Fragment hat einen Header."
    },
    {
      id: "rt-11", topic: "routing", category: "routing", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage zum ARP-Protokoll ist richtig?",
      options: ["ARP ermittelt die MAC-Adresse zu einer bekannten IPv4-Adresse im lokalen Netz.", "ARP funktioniert auch über Router hinweg für entfernte Ziele.", "ARP arbeitet auf Schicht 3 und nutzt IP-Adressen zur Anfrage.", "ARP-Antworten werden typischerweise als Broadcast gesendet."],
      correct: 0, tip: "ARP ist auf lokale Netze beschränkt; es arbeitet auf Schicht 2/3-Grenze.",
      trap: "ARP funktioniert nicht over Router; für entfernte Ziele wird die MAC des Gateways ermittelt.",
      explanation: "ARP löst lokale IPv4-Adressen in MAC-Adressen auf; es funktioniert nicht über Router."
    },
    {
      id: "rt-12", topic: "routing", category: "routing", difficulty: "schwer", points: 3, type: "cloze",
      prompt: "Ein Host möchte ein Paket an 10.20.30.50/24 mit Gateway 10.20.30.1 senden. Um das Ziel zu erreichen, braucht er die MAC des {{0}}, weil {{1}}.",
      blanks: [
        { options: ["Gateways", "Ziel-Hosts", "Routers in der Ferne"], correct: "Gateways" },
        { options: ["das Ziel im eigenen Netz liegt, aber vor Versand die MAC des Gateways bekannt sein muss", "der Gateway die richtige Route ins Zielnetz verwaltet", "ein Gateway ein spezieller Router ist"], correct: "das Ziel im eigenen Netz liegt, aber vor Versand die MAC des Gateways bekannt sein muss" }
      ],
      tip: "Der Host prüft mit AND-Verknüpfung, ob das Ziel lokal liegt.",
      trap: "Lokale Ziele benötigen die MAC des Ziels direkt.",
      explanation: "Mit /24 liegt das Ziel im eigenen Netz und braucht keine Gateway-MAC. Entfernte Ziele gehen zum Gateway."
    },
    {
      id: "eth-14", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche Aussage zum 802.1Q-VLAN-Tag ist korrekt?",
      options: ["Es fügt 4 Bytes hinzu und enthält die 12-Bit VLAN-ID.", "Es ersetzt die Ziel-MAC-Adresse durch eine VLAN-Nummer.", "Es kann maximal 256 verschiedene VLANs auf einem Switch adressieren.", "Es funktioniert auch bei untagged Ports ohne Konfiguration."],
      correct: 0, tip: "802.1Q-Tag: TPID (2 Bytes) + PCP (3 Bit) + CFI (1 Bit) + VLAN-ID (12 Bit).",
      trap: "Mit 12 Bit VLAN-ID können 2^12=4096 VLANs adressiert werden.",
      explanation: "Das 802.1Q-Tag ist 4 Bytes groß und enthält eine 12-Bit VLAN-ID."
    },
    {
      id: "net-18", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "cloze",
      prompt: "Das TCP/IP-Modell hat typischerweise {{0}} Schichten; das OSI-Modell hat {{1}} Schichten.",
      blanks: [
        { options: ["4", "5", "7"], correct: "4" },
        { options: ["4", "5", "7"], correct: "7" }
      ],
      tip: "TCP/IP ist kompakter; OSI ist umfassender.",
      trap: "Manche Varianten teilen TCP/IP in 5 Schichten.",
      explanation: "Das TCP/IP-Modell hat 4 Schichten; das OSI-Modell hat 7 Schichten."
    },
    {
      id: "eth-15", topic: "ethernet", category: "ethernet", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zu Switched Ethernet und Kollisionsdomänen treffen zu?",
      options: ["Jeder Switch-Port ist eine separate Kollisionsdomäne.", "Bridges und Switches trennen Kollisionsdomänen.", "Ein Hub verbindet mehrere Kollisionsdomänen.", "In einem Full-Duplex-Switch-Port gibt es keine Kollisionen."],
      correct: [0, 1, 3], tip: "Switches trennen Kollisionsdomänen pro Port; Hubs teilen eine Domäne.",
      trap: "Ein Hub verbindet Stationen in einer gemeinsamen Kollisionsdomäne.",
      explanation: "Switches und Bridges trennen Kollisionsdomänen; Full-Duplex verhindert Kollisionen ganz."
    },
    {
      id: "ip-16", topic: "ip", category: "ip", difficulty: "leicht", points: 1, type: "single",
      prompt: "Was bedeutet die Notation 10.0.0.0/8?",
      options: ["Das Netz 10.0.0.0 mit Präfixlänge 8; es enthält 16.777.216 Adressen.", "8 Hosts in einem kleinen lokalen Netz.", "10 Computer mit 8-Bit-MAC-Adressen.", "Ein IPv6-Netz mit 8 Oktetten."],
      correct: 0, tip: "/8 bedeutet, die ersten 8 Bits sind Netz, die restlichen 24 sind Host.",
      trap: "/8 ist ein sehr großes Netz, nicht ein kleines.",
      explanation: "10.0.0.0/8 hat 2^24 = 16.777.216 Adressen insgesamt."
    },
    {
      id: "rt-13", topic: "routing", category: "routing", difficulty: "leicht", points: 1, type: "single",
      prompt: "Welche Aussage zum Default Gateway ist korrekt?",
      options: ["Es ist der Router, an den der Host Pakete für unbekannte Ziele sendet.", "Es ist immer die erste Adresse im Subnetz.", "Es kann sich während einer Sitzung mehrfach ändern.", "Es wird von DNS automatisch zugeteilt."],
      correct: 0, tip: "Der Gateway ist typischerweise die erste oder eine andere nutzbare Adresse im lokalen Netz.",
      trap: "Das Default Gateway wird nicht von DNS zugeteilt.",
      explanation: "Das Default Gateway ist der Router, an den unbekannte Remote-Ziele weitergeleitet werden."
    },
    {
      id: "net-19", topic: "basics", category: "basics", difficulty: "mittel", points: 2, type: "single",
      prompt: "Welche PDU-Einheit wird auf Schicht 5 des OSI-Modells verwendet?",
      options: ["Session (bei manchen Modellen), ansonsten Layer-7-PDU.", "Paket.", "Frame.", "Bit."],
      correct: 0, tip: "Die Schichten 5–7 werden oft unter Daten/Message zusammengefasst.",
      trap: "Schicht 5 ist nicht standardisiert in der Praxis.",
      explanation: "Schicht 5 (Session) nutzt bei Bedarf Session-PDU; in der Praxis werden Schichten 5–7 oft zusammengefasst."
    },
    {
      id: "eth-16", topic: "ethernet", category: "ethernet", difficulty: "schwer", points: 3, type: "cloze",
      prompt: "Ein ungelabelter Port eines Switches gehört zum VLAN {{0}}; ein Tagged Port {{1}}.",
      blanks: [
        { options: ["dem Management-VLAN, typischerweise VLAN 1", "einem beliebigen Passthrough-VLAN", "VLAN 65535"], correct: "dem Management-VLAN, typischerweise VLAN 1" },
        { options: ["kann Frames mehrerer VLANs mit Tags weiterleiten", "kann nur Frames eines einzigen VLAN tragen", "hat kein spezielles VLAN"], correct: "kann Frames mehrerer VLANs mit Tags weiterleiten" }
      ],
      tip: "Untagged Ports führen normalerweise nur Frames eines Standard-VLAN; Tagged Ports tragen mehrere VLANs.",
      trap: "Tagged Ports tragen Tags von vielen VLANs gleichzeitig.",
      explanation: "Untagged Ports gehören typischerweise zu VLAN 1; Tagged Ports führen Frames mehrerer VLANs mit Tags."
    },
    {
      id: "ip-17", topic: "ip", category: "ip", difficulty: "mittel", points: 2, type: "multiple",
      prompt: "Welche Aussagen zum Subnetting sind richtig?",
      options: ["Subnetting teilt ein größeres Netz in kleinere Subnetze auf.", "Es erhöht die Anzahl der verfügbaren Hosts insgesamt.", "Das neue Präfix wird länger als das Original-Präfix.", "Es hilft bei der Netzoptimierung und Ressourcenschonung."],
      correct: [0, 2, 3], tip: "Subnetting ist eine Art hierarchische Adressierung.",
      trap: "Subnetting ändert nicht die Gesamtzahl der Adressen.",
      explanation: "Subnetting teilt Netze auf, verlängert das Präfix und hilft bei Ressourcenschonung."
    },
    {
      id: "net-20", topic: "basics", category: "basics", difficulty: "schwer", points: 3, type: "single",
      prompt: "Nach einer OSI-Schicht-7-Anfrage eines Browsers müssen die Daten alle Schichten durchlaufen. Welche Reihenfolge beim Versand ist korrekt?",
      options: ["7 → 6 → 5 → 4 → 3 → 2 → 1 (oben nach unten, dazu Encapsulation)", "1 → 2 → 3 → 4 → 5 → 6 → 7 (unten nach oben, Decapsulation)", "2 → 1 → 7 → 6 → 5 (zufällige Reihenfolge)", "Nur Schicht 1 wird benutzt; der Rest ist optional."],
      correct: 0, tip: "Die Daten werden von oben nach unten mit Headers umwickelt.",
      trap: "Decapsulation passiert beim Empfang, nicht beim Versand.",
      explanation: "Beim Versand werden Daten von Schicht 7 bis 1 mit Headers umwickelt (Encapsulation)."
    }
  ];

  window.INFORMATIK_CATEGORIES = [
    { id: "basics", label: "Netzwerkgrundlagen & OSI" },
    { id: "media", label: "Medien & Verkabelung" },
    { id: "ethernet", label: "Ethernet, Switches & VLAN" },
    { id: "ip", label: "IPv4, IPv6 & Subnetting" },
    { id: "routing", label: "Routing, ARP & Diagnose" }
  ];

  const categoryIds = new Set(window.INFORMATIK_CATEGORIES.map((category) => category.id));
  const topicIds = new Set(window.INFORMATIK_QUESTION_TOPICS.map((topic) => topic.id));
  const questionIds = new Set();
  const validDifficulties = new Set(["leicht", "mittel", "schwer", "knobel"]);
  const validTypes = new Set(["single", "multiple", "cloze"]);

  for (const question of window.INFORMATIK_QUESTION_POOL) {
    if (!question.id || questionIds.has(question.id)) throw new Error(`Fehlende oder doppelte Frage-ID: ${question.id}`);
    questionIds.add(question.id);
    if (!categoryIds.has(question.category) || !topicIds.has(question.topic)) throw new Error(`Unbekannte Kategorie oder Thema für ${question.id}`);
    if (!validDifficulties.has(question.difficulty)) throw new Error(`Unbekannter Schwierigkeitsgrad für ${question.id}`);
    if (!validTypes.has(question.type)) throw new Error(`Unbekannter Aufgabentyp für ${question.id}`);
    if (!Number.isInteger(question.points) || question.points < 1) throw new Error(`Ungültige Punktzahl für ${question.id}`);
    for (const field of ["tip", "trap", "explanation"]) {
      if (typeof question[field] !== "string" || !question[field].trim()) throw new Error(`Fehlende ${field}-Angabe für ${question.id}`);
    }
  }
})();
