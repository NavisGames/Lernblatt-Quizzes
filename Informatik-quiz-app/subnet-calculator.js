(() => {
  "use strict";

  const addressInput = document.querySelector("#subnetAddress");
  const maskInput = document.querySelector("#subnetMask");
  const message = document.querySelector("#subnetMessage");
  const result = document.querySelector("#subnetResult");
  const outputs = {
    mask: document.querySelector("#subnetMaskResult"),
    network: document.querySelector("#subnetNetwork"),
    last: document.querySelector("#subnetLast"),
    range: document.querySelector("#subnetRange"),
    hosts: document.querySelector("#subnetHosts"),
    counts: document.querySelector("#subnetCounts"),
    interpretation: document.querySelector("#subnetInterpretation"),
    steps: document.querySelector("#subnetSteps")
  };
  const addressSpace = 2 ** 32;
  const formatCount = (value) => new Intl.NumberFormat("de-DE").format(value);

  function parseAddress(text) {
    const parts = text.trim().split(".");
    if (parts.length !== 4 || parts.some((part) => !/^(0|[1-9]\d{0,2})$/.test(part) || Number(part) > 255)) {
      return null;
    }
    return parts.reduce((value, part) => value * 256 + Number(part), 0);
  }

  function parsePrefix(text) {
    const value = text.trim();
    if (/^\/?(0|[1-9]\d?)$/.test(value)) {
      const prefix = Number(value.replace("/", ""));
      return prefix <= 32 ? prefix : null;
    }
    const mask = parseAddress(value);
    if (mask === null) return null;
    for (let prefix = 0; prefix <= 32; prefix++) {
      if (mask === addressSpace - 2 ** (32 - prefix)) return prefix;
    }
    return null;
  }

  function dotted(value) {
    return [24, 16, 8, 0].map((shift) => Math.floor(value / 2 ** shift) % 256).join(".");
  }

  function binary(value) {
    return dotted(value).split(".").map((octet) => Number(octet).toString(2).padStart(8, "0")).join(".");
  }

  function updateCalculator() {
    const address = parseAddress(addressInput.value);
    const prefix = parsePrefix(maskInput.value);
    addressInput.setAttribute("aria-invalid", String(address === null));
    maskInput.setAttribute("aria-invalid", String(prefix === null));
    if (address === null || prefix === null) {
      message.textContent = address === null
        ? "Bitte eine IPv4-Adresse mit vier Oktetten von 0 bis 255 eingeben, z. B. 192.168.10.70."
        : "Bitte ein Präfix von /0 bis /32 oder eine gültige, zusammenhängende Subnetzmaske eingeben.";
      result.hidden = true;
      return;
    }

    const hostBits = 32 - prefix;
    const count = 2 ** hostBits;
    const mask = addressSpace - count;
    const network = Math.floor(address / count) * count;
    const last = network + count - 1;
    const firstText = dotted(network);
    const lastText = dotted(last);
    const ordinary = prefix <= 30;
    const hostCount = ordinary ? count - 2 : prefix === 31 ? 2 : 1;

    outputs.mask.textContent = `/${prefix} · ${dotted(mask)}`;
    outputs.network.textContent = firstText;
    outputs.last.textContent = ordinary ? `${lastText} · Broadcast` : lastText;
    outputs.range.textContent = `${firstText} – ${lastText}`;
    outputs.hosts.textContent = ordinary
      ? `${dotted(network + 1)} – ${dotted(last - 1)}`
      : prefix === 31 ? `${firstText} – ${lastText} · Punkt-zu-Punkt` : `${firstText} · einzelne Adresse`;
    outputs.counts.textContent = `${formatCount(count)} ${count === 1 ? "Adresse" : "Adressen"} / ${formatCount(hostCount)} ${ordinary ? "Hostadressen" : prefix === 31 ? "Endpunkte" : "Adresse"}`;

    if (ordinary) {
      const role = address === network ? "die Netzadresse" : address === last ? "die Broadcastadresse" : "eine Hostadresse";
      outputs.interpretation.textContent = `Die eingegebene Adresse ${dotted(address)} ist in diesem Subnetz ${role}.`;
    } else if (prefix === 31) {
      outputs.interpretation.textContent = "Bei /31 sind auf einer Punkt-zu-Punkt-Verbindung beide Adressen als Endpunkte verwendbar; dort gibt es keinen gerichteten Broadcast.";
    } else {
      outputs.interpretation.textContent = "Bei /32 bezeichnet das Präfix eine einzelne Adresse, z. B. eine Hostroute; es gibt keinen separaten Host- oder Broadcastbereich.";
    }

    const hostCalculation = ordinary
      ? `Hostadressen: ${formatCount(count)} − 2 = ${formatCount(hostCount)}`
      : prefix === 31
        ? "Sonderfall /31: 2 Endpunkte auf einer Punkt-zu-Punkt-Verbindung"
        : "Sonderfall /32: eine einzelne Adresse";
    outputs.steps.textContent = [
      `Hostbits: 32 − ${prefix} = ${hostBits}`,
      `Adressen: 2^${hostBits} = ${formatCount(count)}`,
      `IP:      ${binary(address)}`,
      `Maske:   ${binary(mask)}`,
      `AND:     ${binary(network)} = ${firstText}`,
      `Hostbits auf 1: ${binary(last)} = ${lastText}`,
      hostCalculation
    ].join("\n");
    message.textContent = "";
    result.hidden = false;
  }

  addressInput.addEventListener("input", updateCalculator);
  maskInput.addEventListener("input", updateCalculator);
  updateCalculator();
})();
