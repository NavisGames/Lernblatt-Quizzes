(() => {
  "use strict";

  const frequencyInput = document.querySelector("#calcFosc");
  const depthSelect = document.querySelector("#calcLoopDepth");
  const modeSelect = document.querySelector("#calcLoopMode");
  const formulaDescription = document.querySelector("#calcFormula");
  const countsContainer = document.querySelector("#calcLoopCounts");
  const zeroIs256 = document.querySelector("#calcZeroIs256");
  const cycleOutput = document.querySelector("#calcTcy");
  const countOutput = document.querySelector("#calcCycles");
  const runtimeOutput = document.querySelector("#calcRuntime");
  const message = document.querySelector("#calcMessage");
  const singleCountInput = document.querySelector("#calcSingleCount");
  const singleLoad = document.querySelector("#calcSingleLoad");
  const singleCountOutput = document.querySelector("#calcSingleCycles");
  const singleCycleOutput = document.querySelector("#calcSingleTcy");
  const singleRuntimeOutput = document.querySelector("#calcSingleRuntime");
  const singleMessage = document.querySelector("#calcSingleMessage");
  const loopNames = ["M", "N", "P", "Q"];
  const initialCounts = [2, 3, 2, 2];

  const format = (value, maximumFractionDigits = 4) =>
    new Intl.NumberFormat("de-DE", { maximumFractionDigits }).format(value);

  function renderLoopCounts() {
    const depth = Number(depthSelect.value);
    countsContainer.replaceChildren();
    loopNames.slice(0, depth).forEach((name, index) => {
      const label = document.createElement("label");
      label.htmlFor = `calcLoopCount${index}`;
      label.textContent = `Schleifenebene ${index + 1} · ${name} (äußerste → innerste)`;
      const input = document.createElement("input");
      input.id = `calcLoopCount${index}`;
      input.className = "select-control loop-count-input";
      input.type = "number";
      input.min = "0";
      input.max = "256";
      input.step = "1";
      input.value = String(initialCounts[index]);
      input.inputMode = "numeric";
      label.append(input);
      countsContainer.append(label);
      input.addEventListener("input", updateCalculators);
    });
    updateCalculators();
  }

  function readEffectiveCount(input) {
    if (input.value.trim() === "") return null;
    const value = Number(input.value);
    if (!Number.isInteger(value) || value < 0 || value > 256) return null;
    if (value === 0) return zeroIs256.checked ? 256 : null;
    return value;
  }

  function formatRuntime(microseconds) {
    if (microseconds < 1000) {
      return `${format(microseconds)} µs (${format(microseconds / 1000)} ms)`;
    }
    return `${format(microseconds / 1000)} ms (${format(microseconds / 1000000)} s)`;
  }

  function setInvalid(input, invalid) {
    input.setAttribute("aria-invalid", String(invalid));
  }

  function updateNestedCalculator(frequencyMHz, validFrequency) {
    const inputs = [...countsContainer.querySelectorAll(".loop-count-input")];
    const counts = inputs.map(readEffectiveCount);
    const validCounts = counts.every((count) => count !== null);
    inputs.forEach((input, index) => setInvalid(input, counts[index] === null));
    setInvalid(frequencyInput, !validFrequency);

    if (!validFrequency || !validCounts) {
      cycleOutput.textContent = "—";
      countOutput.textContent = "—";
      runtimeOutput.textContent = "—";
      message.textContent = !validFrequency
        ? "Bitte eine positive Oszillatorfrequenz eingeben."
        : "Zählerwerte müssen ganzzahlig zwischen 1 und 256 liegen. Mit aktivierter 0-Option zählt 0 als 256.";
      return;
    }

    const depth = counts.length;
    const mode = modeSelect.value;
    let cycles;
    if (mode === "all-loads") {
      cycles = 3 * counts[depth - 1] + 1;
      for (let index = depth - 2; index >= 0; index--) {
        cycles = counts[index] * cycles + 3 * counts[index] + 1;
      }
    } else if (mode === "outer-ready") {
      cycles = 3 * counts[depth - 1] + 1;
      for (let index = depth - 2; index >= 1; index--) {
        cycles = counts[index] * cycles + 3 * counts[index] + 1;
      }
      cycles = counts[0] * cycles + 3 * counts[0] - 1;
    } else {
      cycles = 3 * counts[depth - 1] - 1;
      for (let index = depth - 2; index >= 0; index--) {
        cycles = counts[index] * cycles + 3 * counts[index] - 1;
      }
    }

    const cycleMicroseconds = 4 / frequencyMHz;
    cycleOutput.textContent = `${format(cycleMicroseconds)} µs`;
    countOutput.textContent = `${format(cycles, 0)} Zyklen`;
    runtimeOutput.textContent = formatRuntime(cycles * cycleMicroseconds);
    message.textContent = "";
  }

  function updateSingleCalculator(frequencyMHz, validFrequency) {
    const count = readEffectiveCount(singleCountInput);
    const validCount = count !== null;
    setInvalid(singleCountInput, !validCount);

    if (!validFrequency || !validCount) {
      singleCountOutput.textContent = "—";
      singleCycleOutput.textContent = "—";
      singleRuntimeOutput.textContent = "—";
      singleMessage.textContent = !validFrequency
        ? "Für die Laufzeit bitte eine positive Oszillatorfrequenz eingeben."
        : "N muss zwischen 1 und 256 liegen. Mit aktivierter 0-Option zählt 0 als 256.";
      return;
    }

    const cycles = 3 * count + (singleLoad.checked ? 1 : -1);
    const cycleMicroseconds = 4 / frequencyMHz;
    singleCountOutput.textContent = `${cycles} Zyklen`;
    singleCycleOutput.textContent = `${format(cycleMicroseconds)} µs`;
    singleRuntimeOutput.textContent = formatRuntime(cycles * cycleMicroseconds);
    singleMessage.textContent = "";
  }

  function updateCalculators() {
    const frequencyMHz = Number(frequencyInput.value);
    const validFrequency = Number.isFinite(frequencyMHz) && frequencyMHz > 0;
    const depth = Number(depthSelect.value);
    const formulaDescriptions = {
      "all-loads": depth === 2
        ? "Bei zwei Ebenen: C = 3MN + 4M + 1. Alle Zähler werden im Code geladen; bei drei oder vier Ebenen werden die inneren Schleifen rekursiv mitgezählt."
        : "Alle Zähler werden im Code geladen. Bei drei oder vier Ebenen werden die inneren Schleifen rekursiv mitgezählt.",
      "outer-ready": depth === 2
        ? "Bei zwei Ebenen: C = 3MN + 4M − 1. OUTER ist bereits geladen; die inneren Zähler werden weiterhin geladen."
        : "OUTER ist bereits geladen; innere Zähler werden weiterhin geladen. Die zusätzlichen inneren Ebenen werden rekursiv mitgezählt.",
      "no-loads": depth === 2
        ? "Bei zwei Ebenen: C = 3MN + 2M − 1. Ladebefehle sämtlicher Zähler sind nicht Teil des Ausschnitts."
        : "Ladebefehle sämtlicher Zähler sind nicht Teil des Ausschnitts. Die Schleifen werden rekursiv mitgezählt."
    };
    formulaDescription.textContent = formulaDescriptions[modeSelect.value];
    updateNestedCalculator(frequencyMHz, validFrequency);
    updateSingleCalculator(frequencyMHz, validFrequency);
  }

  depthSelect.addEventListener("change", renderLoopCounts);
  modeSelect.addEventListener("change", updateCalculators);
  zeroIs256.addEventListener("change", updateCalculators);
  singleCountInput.addEventListener("input", updateCalculators);
  singleLoad.addEventListener("change", updateCalculators);
  frequencyInput.addEventListener("input", updateCalculators);
  renderLoopCounts();
})();
