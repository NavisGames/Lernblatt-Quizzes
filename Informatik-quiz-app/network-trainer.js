(() => {
  "use strict";

  const pcA = { name: "PC A", kind: "PC", info: "IP: 192.168.1.10/24 · Maske: 255.255.255.0 · Gateway: 192.168.1.1 · MAC: 02:00:00:00:00:0A" };
  const switch1 = { name: "Switch S1", kind: "Switch", info: "Layer-2-Switch im Netz 192.168.1.0/24. Er leitet lokale Ethernet-Frames weiter; er ist nicht das Gateway." };
  const router1 = { name: "Router R1", kind: "Router", info: "LAN: 192.168.1.1/24, MAC 02:00:00:00:01:01 · Transit: 10.0.0.1/30, MAC 02:00:00:00:10:01 · Route zu 192.168.2.0/24 über 10.0.0.2. Beide eigenen Netze sind direkt verbunden." };
  const router2 = { name: "Router R2", kind: "Router", info: "Transit: 10.0.0.2/30, MAC 02:00:00:00:10:02 · LAN: 192.168.2.1/24, MAC 02:00:00:00:02:01 · Route zu 192.168.1.0/24 über 10.0.0.1. Beide eigenen Netze sind direkt verbunden." };
  const switch2 = { name: "Switch S2", kind: "Switch", info: "Layer-2-Switch im Netz 192.168.2.0/24. ARP-Broadcasts bleiben in diesem lokalen Netz." };
  const pcB = { name: "PC B", kind: "PC", info: "IP: 192.168.2.20/24 · Maske: 255.255.255.0 · Gateway: 192.168.2.1 · MAC: 02:00:00:00:00:0B" };
  const twoRouterDevices = [pcA, switch1, router1, router2, switch2, pcB];
  const lessonDevices = [
    { name: "Host 1", kind: "PC", info: "IP: 10.0.0.10/8 · Maske: 255.0.0.0 · Gateway: 10.0.0.1 · MAC: 0060.3EEA.6529" },
    { name: "Router R", kind: "Router", info: "Links: 10.0.0.1/8, MAC 000C.859D.BB01 · Rechts: 172.16.0.1/16, MAC 000C.859D.BB02 · Beide Netze sind direkt verbunden." },
    { name: "Host 2", kind: "PC", info: "IP: 172.16.0.10/16 · Maske: 255.255.0.0 · Gateway: 172.16.0.1 · MAC: 00D0.BCC2.437B" }
  ];
  const largeDevices = [
    { name: "PC A", kind: "PC", info: "IP: 192.168.10.10/24 · Maske: 255.255.255.0 · Gateway: 192.168.10.1 · MAC: 02:00:00:00:00:0A", x: 10, y: 20 },
    { name: "PC C", kind: "PC", info: "IP: 192.168.10.11/24 · Maske: 255.255.255.0 · Gateway: 192.168.10.1 · MAC: 02:00:00:00:00:0C", x: 10, y: 180 },
    { name: "Switch S1", kind: "Switch", info: "Layer-2-Switch im Netz 192.168.10.0/24.", x: 165, y: 100 },
    { name: "Router R1", kind: "Router", info: "LAN: 192.168.10.1/24 · Transit zu R2: 10.1.0.1/30 · Route 192.168.20.0/24 über 10.1.0.2. Beide eigenen Netze sind direkt verbunden.", x: 320, y: 100 },
    { name: "Router R2", kind: "Router", info: "Transit zu R1: 10.1.0.2/30 · Transit zu R3: 10.1.0.5/30 · Routen: 192.168.10.0/24 über 10.1.0.1; 192.168.20.0/24 über 10.1.0.6. Beide Transitnetze sind direkt verbunden.", x: 475, y: 100 },
    { name: "Router R3", kind: "Router", info: "Transit zu R2: 10.1.0.6/30 · LAN: 192.168.20.1/24 · Route 192.168.10.0/24 über 10.1.0.5. Beide eigenen Netze sind direkt verbunden.", x: 630, y: 100 },
    { name: "Switch S2", kind: "Switch", info: "Layer-2-Switch im Netz 192.168.20.0/24.", x: 785, y: 100 },
    { name: "PC B", kind: "PC", info: "IP: 192.168.20.20/24 · Maske: 255.255.255.0 · Gateway: 192.168.20.1 · MAC: 02:00:00:00:00:0B", x: 940, y: 20 },
    { name: "PC D", kind: "PC", info: "IP: 192.168.20.21/24 · Maske: 255.255.255.0 · Gateway: 192.168.20.1 · MAC: 02:00:00:00:00:0D", x: 940, y: 180 }
  ];
  const largeLinks = [[0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [6, 8]];
  const scenarios = [
    {
      id: "same-lan", title: "1 · Zwei PCs im selben Netz",
      description: "PC A sendet an PC B. Beide liegen in 192.168.1.0/24; der ARP-Cache von A ist leer.",
      devices: [pcA, switch1, { name: "PC B", kind: "PC", info: "IP: 192.168.1.20/24 · Maske: 255.255.255.0 · Gateway: 192.168.1.1 · MAC: 02:00:00:00:00:0B" }],
      steps: [
        { title: "Zielnetz prüfen", active: [0, 2], question: "Welchen nächsten Empfänger wählt A für 192.168.1.20?", options: ["PC B direkt", "Das Gateway 192.168.1.1", "Einen Router im Internet"], correct: 0, explanation: "Beide Adressen gehören mit /24 zu 192.168.1.0/24. A sendet deshalb direkt an B; das Gateway wird für diesen Weg nicht benötigt." },
        { title: "ARP-Anfrage", active: [0, 1, 2], question: "Welche Adresse fragt A per ARP ab?", options: ["192.168.1.1", "192.168.1.20", "Die IP-Adresse des Switches"], correct: 1, explanation: "A sendet im lokalen Netz eine ARP-Broadcast-Anfrage nach 192.168.1.20. Der Switch leitet den Broadcast lokal weiter; B antwortet mit seiner MAC 02:00:00:00:00:0B.", cache: "PC A: 192.168.1.20 → 02:00:00:00:00:0B" },
        { title: "Datenframe", active: [0, 1, 2], question: "Welche Ziel-MAC trägt der anschließende Datenframe?", options: ["Die Broadcast-MAC", "Die MAC von PC B", "Die MAC des Gateways"], correct: 1, explanation: "Nach der ARP-Antwort verwendet A die MAC von B als Ziel-MAC. Die Ziel-IP bleibt 192.168.1.20; der Switch leitet den Frame anhand der Ziel-MAC weiter." }
      ]
    },
    {
      id: "one-router", title: "2 · Zwei Netze, ein Router",
      description: "PC A sendet an PC B in einem anderen /24-Netz. R1 verbindet beide Netze direkt.",
      devices: [pcA, switch1, { name: "Router R1", kind: "Router", info: "Links: 192.168.1.1/24, MAC 02:00:00:00:01:01 · Rechts: 192.168.2.1/24, MAC 02:00:00:00:02:01 · Beide Netze sind direkt verbunden." }, switch2, pcB],
      steps: [
        { title: "Gateway auswählen", active: [0, 2], question: "Wessen MAC benötigt A für den ersten Datenframe?", options: ["Die MAC von PC B", "Die MAC von R1 bei 192.168.1.1", "Die MAC von Switch S2"], correct: 1, explanation: "192.168.2.20 liegt außerhalb von 192.168.1.0/24. A fragt per lokalem ARP-Broadcast nach 192.168.1.1; R1 antwortet mit 02:00:00:00:01:01.", cache: "PC A: 192.168.1.1 → 02:00:00:00:01:01" },
        { title: "Erster Ethernet-Abschnitt", active: [0, 1, 2], question: "Welche Zieladressen trägt der Datenframe von A zu R1?", options: ["IP 192.168.2.20 und MAC von R1 links", "IP 192.168.1.1 und MAC von R1 links", "IP 192.168.2.20 und MAC von B"], correct: 0, explanation: "Die Ziel-IP ist weiterhin B. Nur die Ziel-MAC des lokalen Ethernet-Frames zeigt auf die linke Schnittstelle des Gateways." },
        { title: "Router leitet weiter", active: [2, 3, 4], question: "Wonach fragt R1 im Zielnetz bei leerem ARP-Cache?", options: ["Nach 192.168.2.20", "Nach 192.168.1.10", "Nach seiner eigenen Adresse 192.168.2.1"], correct: 0, explanation: "R1 findet 192.168.2.0/24 als direkt verbundenes Netz und fragt dort nach Bs MAC. R1 erstellt einen neuen Frame: Quell-MAC 02:00:00:00:02:01, Ziel-MAC 02:00:00:00:00:0B. Die IP-Adressen bleiben gleich.", cache: "R1, rechtes LAN: 192.168.2.20 → 02:00:00:00:00:0B" },
        { title: "Antwort von B", active: [2, 3, 4], question: "Wohin sendet B seine Antwort zunächst?", options: ["Direkt an die MAC von A", "An sein Gateway 192.168.2.1", "An die Broadcast-IP"], correct: 1, explanation: "A liegt aus Bs Sicht in einem anderen Netz. B verwendet daher R1 rechts als nächsten Hop; R1 hat auch 192.168.1.0/24 direkt verbunden und leitet die Antwort zu A weiter." }
      ]
    },
    {
      id: "two-routers", title: "3 · Zwei Router und statische Routen",
      description: "A sendet an B über zwei Router. Zwischen R1 und R2 liegt das Transitnetz 10.0.0.0/30.",
      devices: twoRouterDevices,
      steps: [
        { title: "Erster Hop", active: [0, 1, 2], question: "Welche IP löst A zuerst per ARP auf?", options: ["192.168.2.20", "192.168.1.1", "10.0.0.2"], correct: 1, explanation: "B liegt außerhalb von As Netz. A löst die lokale Gateway-IP 192.168.1.1 auf und sendet den Datenframe an R1; die Ziel-IP bleibt 192.168.2.20." },
        { title: "Route auf R1", active: [2, 3], question: "Welchen nächsten Hop nimmt R1 für 192.168.2.20?", options: ["10.0.0.2", "192.168.2.20 direkt per ARP", "192.168.1.10"], correct: 0, explanation: "Die statische Route 192.168.2.0/24 über 10.0.0.2 zeigt auf R2. R1 fragt im Transitnetz per ARP nach 10.0.0.2, nicht nach der entfernten Ziel-IP." },
        { title: "Transitframe", active: [2, 3], question: "Welche Ziel-MAC steht im Datenframe von R1 zu R2?", options: ["MAC von PC B", "MAC von R2 im Transitnetz", "MAC von PC A"], correct: 1, explanation: "R2 antwortet auf ARP mit 02:00:00:00:10:02. R1 verwendet diese Ziel-MAC und seine Transit-MAC als Quelle. Die IP-Zieladresse bleibt 192.168.2.20.", cache: "R1, Transit: 10.0.0.2 → 02:00:00:00:10:02" },
        { title: "Letzter Abschnitt", active: [3, 4, 5], question: "Wie erreicht R2 den PC B?", options: ["Über die direkt verbundene Route 192.168.2.0/24 und ARP für B", "Über R1 zurück", "Mit ARP für 192.168.1.10"], correct: 0, explanation: "Das Zielnetz ist direkt an R2 angeschlossen. R2 ermittelt Bs MAC im Zielnetz und sendet einen neuen Ethernet-Frame an B." },
        { title: "Rückweg", active: [2, 3, 5], question: "Welche Route benötigt R2 für die Antwort an A?", options: ["192.168.1.0/24 über 10.0.0.1", "192.168.2.0/24 über 192.168.2.20", "Keine Route, da ARP über Router hinweg funktioniert"], correct: 0, explanation: "B sendet die Antwort an sein Gateway R2. R2 benötigt eine Route zu 192.168.1.0/24 über R1; R1 hat As Netz direkt verbunden. ARP funktioniert jeweils nur auf dem lokalen Abschnitt." }
      ]
    },
    {
      id: "missing-route", title: "4 · Fehlersuche: Rückroute fehlt",
      description: "Wie Szenario 3, aber R2 hat keine Route und keine Default-Route zum Netz 192.168.1.0/24.",
      devices: [pcA, switch1, router1, { name: "Router R2", kind: "Router", info: "Transit: 10.0.0.2/30, MAC 02:00:00:00:10:02 · LAN: 192.168.2.1/24, MAC 02:00:00:00:02:01 · Nur direkt verbundene Netze; keine Route und keine Default-Route zu 192.168.1.0/24." }, switch2, pcB],
      steps: [
        { title: "Hinweg", active: [0, 2, 3, 5], question: "Kann das Paket von A B erreichen?", options: ["Ja, der Hinweg über R1 und R2 ist vorhanden", "Nein, R1 hat keine Route zu Bs Netz", "Nein, ein Router benötigt immer NAT"], correct: 0, explanation: "R1 besitzt die Route über R2 und R2 ist direkt mit Bs Netz verbunden. Die fehlende Rückroute auf R2 verhindert den Hinweg nicht." },
        { title: "Rückweg analysieren", active: [3, 5], question: "Was passiert mit Bs Antwort an A?", options: ["R2 findet keine passende Route und verwirft das Paket", "R2 sendet ARP für A über beide Router", "B antwortet direkt über Switch S2 an A"], correct: 0, explanation: "B sendet an sein Gateway R2. Für As Netz hat R2 weder eine passende Route noch eine Default-Route; das Antwortpaket wird verworfen. Ein Ping bleibt deshalb ohne erfolgreiche Antwort." },
        { title: "Fehler beheben", active: [2, 3], question: "Welche statische Route behebt hier den fehlenden Rückweg?", options: ["Auf R2: 192.168.1.0/24 über 10.0.0.1", "Auf R1: 192.168.2.0/24 über 10.0.0.2 löschen", "Auf B: Gateway auf 192.168.1.10 setzen"], correct: 0, explanation: "Die Route auf R2 zeigt für As Netz auf den erreichbaren nächsten Hop R1. As Netz ist an R1 direkt verbunden; die übrigen Angaben bleiben unverändert." }
      ]
    },
    {
      id: "icmp-lesson", title: "5 · Unterrichtsbeispiel: ARP und ICMP",
      description: "Host 1 pingt Host 2 über R. Links: 10.0.0.0/8, rechts: 172.16.0.0/16. Die Nummern entsprechen dem Unterrichtsbeispiel. R und Host 2 übernehmen die Absenderzuordnung aus den ARP-Anfragen in ihren Cache und behalten sie für die Antwort.",
      devices: lessonDevices,
      steps: [
        { title: "Paket 1 · ARP-Anfrage an das Gateway", active: [0, 1], question: "Was ist bei dieser ARP-Anfrage die Ethernet-Ziel-MAC?", options: ["FFFF.FFFF.FFFF (Broadcast)", "0000.0000.0000", "00D0.BCC2.437B"], correct: 0, explanation: "Ethernet: 0060.3EEA.6529 → FFFF.FFFF.FFFF. Im ARP-Inhalt stehen Sender-IP 10.0.0.10, Sender-MAC 0060.3EEA.6529, Ziel-IP 10.0.0.1 und unbekannte Ziel-MAC 0000.0000.0000. Die Null-MAC ist ein ARP-Feld, nicht die Ziel-MAC des Ethernet-Frames. ARP ist kein IP-Paket." },
        { title: "Paket 2 · ARP-Antwort des Routers", active: [0, 1], question: "Welche Zuordnung lernt Host 1?", options: ["10.0.0.1 → 000C.859D.BB01", "172.16.0.10 → 000C.859D.BB02", "10.0.0.10 → 00D0.BCC2.437B"], correct: 0, explanation: "Ethernet und ARP-Antwort: MAC 000C.859D.BB01 → 0060.3EEA.6529; ARP-Sender-IP 10.0.0.1 → Ziel-IP 10.0.0.10. Host 1 kennt nun die MAC des Gateways.", cache: "Host 1: 10.0.0.1 → 000C.859D.BB01" },
        { title: "Paket 3/6 · Echo Request links", active: [0, 1], question: "Welche Zieladressen trägt der ICMP-Echo-Request auf dem ersten Abschnitt?", options: ["IP 172.16.0.10, MAC 000C.859D.BB01", "IP 10.0.0.1, MAC 000C.859D.BB01", "IP 172.16.0.10, MAC 00D0.BCC2.437B"], correct: 0, explanation: "Ethernet: 0060.3EEA.6529 → 000C.859D.BB01. IP: 10.0.0.10 → 172.16.0.10. Das IP-Paket enthält den ICMP Echo Request. Die Angabe 3/6 bezeichnet im Unterricht dieselbe Adressierung auf dem linken Abschnitt; während R ARP auflöst, kann er das Paket zwischenspeichern." },
        { title: "Paket 4 · ARP-Anfrage im Zielnetz", active: [1, 2], question: "Welche IP sucht R auf seiner rechten Schnittstelle per ARP?", options: ["172.16.0.10", "10.0.0.10", "10.0.0.1"], correct: 0, explanation: "Ethernet: 000C.859D.BB02 → FFFF.FFFF.FFFF. ARP: Sender-IP 172.16.0.1, Ziel-IP 172.16.0.10, Ziel-MAC 0000.0000.0000. Das Zielnetz ist direkt angeschlossen, deshalb sucht R die MAC von Host 2." },
        { title: "Paket 5 · ARP-Antwort von Host 2", active: [1, 2], question: "Welche MAC erhält R für 172.16.0.10?", options: ["00D0.BCC2.437B", "000C.859D.BB01", "0060.3EEA.6529"], correct: 0, explanation: "Ethernet und ARP-Antwort: MAC 00D0.BCC2.437B → 000C.859D.BB02; ARP-Sender-IP 172.16.0.10 → Ziel-IP 172.16.0.1.", cache: "Router R rechts: 172.16.0.10 → 00D0.BCC2.437B" },
        { title: "Paket 7 · Echo Request rechts", active: [1, 2], question: "Welche Quell-MAC verwendet R auf dem rechten Abschnitt?", options: ["000C.859D.BB02", "0060.3EEA.6529", "000C.859D.BB01"], correct: 0, explanation: "Ethernet: 000C.859D.BB02 → 00D0.BCC2.437B. IP: 10.0.0.10 → 172.16.0.10. R erstellt den Frame für das rechte Netz neu; die IP-Endadressen bleiben ohne NAT erhalten." },
        { title: "Paket 8 · Echo Reply rechts", active: [1, 2], question: "Welche Adressen hat die Antwort von Host 2 an R?", options: ["MAC 00D0.BCC2.437B → 000C.859D.BB02; IP 172.16.0.10 → 10.0.0.10", "MAC 00D0.BCC2.437B → 0060.3EEA.6529; IP 172.16.0.10 → 10.0.0.10", "MAC 000C.859D.BB02 → 00D0.BCC2.437B; IP 10.0.0.10 → 172.16.0.10"], correct: 0, explanation: "Host 2 antwortet per ICMP Echo Reply. Das IP-Ziel ist Host 1, aber die lokale Ziel-MAC gehört zum Gateway R rechts. Die MAC des Gateways wurde hier aus Paket 4 gelernt; andernfalls wäre zuvor eine weitere ARP-Auflösung nötig." },
        { title: "Paket 9 · Echo Reply links", active: [0, 1], question: "Welche Quell-MAC hat die Antwort auf dem linken Abschnitt?", options: ["000C.859D.BB01", "00D0.BCC2.437B", "000C.859D.BB02"], correct: 0, explanation: "Ethernet: 000C.859D.BB01 → 0060.3EEA.6529. IP: 172.16.0.10 → 10.0.0.10. R kennt Host 1 hier aus Paket 1; andernfalls müsste R die MAC links erneut per ARP ermitteln." }
      ]
    },
    {
      id: "three-router-lans", title: "6 · Vier PCs und drei Router",
      description: "Zwei PCs je LAN, dazwischen drei Router. A sendet an B; alle angegebenen Routen sind vorhanden. Die Topologie kann seitlich gescrollt werden.",
      devices: largeDevices,
      links: largeLinks,
      steps: [
        { title: "Lokales oder fremdes Netz?", active: [0, 2, 3], question: "Welchen nächsten Hop wählt A für B?", options: ["192.168.10.1", "192.168.20.20", "10.1.0.2"], correct: 0, explanation: "B liegt außerhalb von 192.168.10.0/24. A sendet an sein Gateway R1; die Ziel-IP bleibt 192.168.20.20." },
        { title: "Erster Transit", active: [3, 4], question: "Welche IP löst R1 für B im ersten Transitnetz per ARP auf?", options: ["10.1.0.2", "10.1.0.6", "192.168.20.20"], correct: 0, explanation: "R1s Route zu 192.168.20.0/24 zeigt auf R2 unter 10.1.0.2. Diese Adresse ist im direkt angeschlossenen Transitnetz 10.1.0.0/30 erreichbar." },
        { title: "Zweiter Transit", active: [4, 5], question: "Welchen nächsten Hop wählt R2 für das Zielnetz?", options: ["10.1.0.6", "10.1.0.1", "192.168.20.20"], correct: 0, explanation: "R2 leitet gemäß seiner Route über R3 (10.1.0.6 im Netz 10.1.0.4/30) weiter. R3 erreicht das Zielnetz direkt." },
        { title: "Rückweg", active: [3, 4, 5], question: "Welche Route braucht R2 für Bs Antwort an A?", options: ["192.168.10.0/24 über 10.1.0.1", "192.168.10.0/24 über 10.1.0.6", "192.168.20.0/24 über 10.1.0.6"], correct: 0, explanation: "R3 sendet die Antwort über 10.1.0.5 an R2. R2s Route zum linken LAN zeigt auf R1 (10.1.0.1); R1 stellt lokal zu." },
        { title: "Zwei PCs im selben LAN", active: [0, 1, 2], question: "Welchen nächsten Empfänger wählt A für PC C?", options: ["PC C direkt", "R1", "R3"], correct: 0, explanation: "A und C gehören zu 192.168.10.0/24. A ermittelt Cs MAC im lokalen Netz; kein Router leitet diesen Datenframe weiter." }
      ]
    },
    {
      id: "two-router-lans", title: "7 · Vier PCs und zwei Router",
      description: "Die gleichen beiden LANs sind jetzt über zwei Router verbunden. PC C sendet an PC D; Hin- und Rückrouten sind konfiguriert.",
      devices: [largeDevices[0], largeDevices[1], largeDevices[2], largeDevices[3],
        { name: "Router R2", kind: "Router", info: "Transit zu R1: 10.1.0.2/30 · LAN: 192.168.20.1/24 · Route 192.168.10.0/24 über 10.1.0.1. Beide eigenen Netze sind direkt verbunden.", x: 475, y: 100 },
        { ...largeDevices[6], x: 630 }, { ...largeDevices[7], x: 785 }, { ...largeDevices[8], x: 785 }],
      links: [[0, 2], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [5, 7]],
      steps: [
        { title: "Von C zum Gateway", active: [1, 2, 3], question: "Welche Adresse fragt C zuerst per ARP ab?", options: ["192.168.10.1", "192.168.20.21", "10.1.0.2"], correct: 0, explanation: "D liegt in einem anderen Netz. C benötigt die MAC seines lokalen Gateways 192.168.10.1." },
        { title: "Route und Zielnetz", active: [3, 4, 5, 7], question: "Wie gelangt das Paket zu D?", options: ["R1 sendet an R2; R2 löst D im direkt verbundenen LAN per ARP auf", "R1 fragt D direkt per ARP über R2 hinweg", "Switch S1 routet direkt zu D"], correct: 0, explanation: "R1s Route zeigt auf 10.1.0.2. Auf R2 ist 192.168.20.0/24 direkt angeschlossen, sodass R2 dort Ds MAC per ARP ermitteln kann." },
        { title: "Rückroute", active: [3, 4], question: "Welche Route auf R2 ermöglicht den Rückweg zu C?", options: ["192.168.10.0/24 über 10.1.0.1", "192.168.20.0/24 über 192.168.20.21", "10.1.0.0/30 über 10.1.0.2"], correct: 0, explanation: "R2 leitet Pakete ins linke LAN über R1 unter 10.1.0.1 weiter. R1 kennt das LAN als direkt verbunden." }
      ]
    }
  ];

  function renderTopology(topology, item, active, onDevice) {
    const scrollLeft = topology.scrollLeft;
    topology.replaceChildren();
    topology.classList.toggle("network-topology--graph", Boolean(item.links));
    const links = item.links || item.devices.slice(1).map((_, index) => [index, index + 1]);
    topology.setAttribute("aria-description", `Verbindungen: ${links.map(([from, to]) => `${item.devices[from].name} mit ${item.devices[to].name}`).join("; ")}.`);
    topology.onkeydown = (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.stopPropagation();
      if (topology.scrollWidth > topology.clientWidth) {
        event.preventDefault();
        topology.scrollBy({ left: event.key === "ArrowRight" ? 120 : -120 });
      }
    };
    const graph = item.links ? document.createElement("div") : null;
    if (graph) {
      graph.className = "network-graph";
      graph.style.width = `${Math.max(...item.devices.map((device) => device.x)) + 120}px`;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "network-graph-links");
      svg.setAttribute("aria-hidden", "true");
      item.links.forEach(([from, to]) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", item.devices[from].x + 55);
        line.setAttribute("y1", item.devices[from].y + 50);
        line.setAttribute("x2", item.devices[to].x + 55);
        line.setAttribute("y2", item.devices[to].y + 50);
        line.classList.toggle("is-active", active.includes(from) && active.includes(to));
        svg.append(line);
      });
      graph.append(svg);
      topology.append(graph);
    }
    item.devices.forEach((device, index) => {
      if (!graph && index) {
        const connector = document.createElement("span");
        connector.className = "network-connector";
        connector.classList.toggle("is-active", active.includes(index - 1) && active.includes(index));
        connector.setAttribute("aria-hidden", "true");
        topology.append(connector);
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "network-device";
      button.classList.toggle("is-active", active.includes(index));
      button.setAttribute("aria-pressed", "false");
      if (graph) {
        button.style.left = `${device.x}px`;
        button.style.top = `${device.y}px`;
      }
      const icon = document.createElement("span");
      icon.className = "network-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = device.kind === "PC" ? "▣" : device.kind === "Router" ? "⇄" : "▤";
      const name = document.createElement("strong");
      name.textContent = device.name;
      const addresses = device.info.match(/\b\d{1,3}(?:\.\d{1,3}){3}(?:\/\d{1,2})?/g) || [];
      const address = document.createElement("span");
      address.className = "network-address";
      const addressLabel = device.kind === "Switch" ? "Netz: " : device.kind === "Router" ? "IPs: " : "IP: ";
      address.textContent = addressLabel + addresses.slice(0, device.kind === "Router" ? 2 : 1).join(" · ");
      button.append(icon, name, address);
      button.addEventListener("click", () => onDevice(index));
      (graph || topology).append(button);
    });
    topology.scrollLeft = scrollLeft;
  }

  window.NETWORK_SCENARIOS = scenarios;
  window.renderNetworkTopology = renderTopology;

  const select = document.querySelector("#networkScenario");
  if (!select) return;
  const topology = document.querySelector("#networkTopology");
  const info = document.querySelector("#networkDeviceInfo");
  const options = document.querySelector("#networkOptions");
  const explanation = document.querySelector("#networkExplanation");
  const arp = document.querySelector("#networkArp");
  const feedback = document.querySelector("#networkFeedback");
  const previous = document.querySelector("#networkPrevious");
  const next = document.querySelector("#networkNext");
  let stepIndex = 0;
  let deviceIndex = 0;
  let checked = false;
  const scenario = () => scenarios[Number(select.value)];

  scenarios.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = item.title;
    select.append(option);
  });

  function renderDevice() {
    const device = scenario().devices[deviceIndex];
    info.replaceChildren();
    const heading = document.createElement("strong");
    heading.textContent = device.name;
    const content = document.createElement("p");
    content.textContent = device.info;
    info.append(heading, content);
    topology.querySelectorAll("button").forEach((button, index) => {
      button.setAttribute("aria-pressed", String(index === deviceIndex));
    });
  }

  function renderStep() {
    const item = scenario();
    const step = item.steps[stepIndex];
    document.querySelector("#networkDescription").textContent = item.description;
    document.querySelector("#networkStepCount").textContent = `Schritt ${stepIndex + 1} von ${item.steps.length}`;
    document.querySelector("#networkStepTitle").textContent = step.title;
    document.querySelector("#networkQuestion").textContent = step.question;
    renderTopology(topology, item, step.active, (index) => { deviceIndex = index; renderDevice(); });
    renderDevice();
    options.replaceChildren();
    const legend = document.createElement("legend");
    legend.textContent = "Antwort auswählen";
    options.append(legend);
    step.options.forEach((text, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "network-answer";
      input.value = String(index);
      label.append(input, document.createTextNode(text));
      options.append(label);
    });
    checked = false;
    feedback.textContent = "";
    explanation.hidden = true;
    explanation.textContent = "";
    arp.hidden = true;
    arp.replaceChildren();
    previous.disabled = stepIndex === 0;
    next.disabled = stepIndex === item.steps.length - 1;
  }

  document.querySelector("#networkCheck").addEventListener("click", () => {
    const selected = options.querySelector("input:checked");
    if (!selected) {
      feedback.textContent = "Bitte wähle zuerst eine Antwort aus.";
      return;
    }
    checked = true;
    const step = scenario().steps[stepIndex];
    feedback.textContent = Number(selected.value) === step.correct ? "Richtig!" : `Noch nicht richtig. Richtig ist: ${step.options[step.correct]}`;
    explanation.textContent = step.explanation;
    explanation.hidden = false;
    arp.replaceChildren();
    if (step.cache) {
      const heading = document.createElement("strong");
      heading.textContent = "Beispielhafter ARP-Cache-Eintrag nach der ARP-Antwort";
      const entry = document.createElement("p");
      entry.textContent = step.cache;
      arp.append(heading, entry);
    }
    arp.hidden = !step.cache;
  });
  options.addEventListener("change", () => {
    if (checked) {
      feedback.textContent = "";
      explanation.hidden = true;
      arp.hidden = true;
      checked = false;
    }
  });
  select.addEventListener("change", () => { stepIndex = 0; deviceIndex = 0; topology.scrollLeft = 0; renderStep(); });
  previous.addEventListener("click", () => { if (stepIndex > 0) { stepIndex--; renderStep(); } });
  next.addEventListener("click", () => { if (stepIndex < scenario().steps.length - 1) { stepIndex++; renderStep(); } });
  renderStep();
})();
