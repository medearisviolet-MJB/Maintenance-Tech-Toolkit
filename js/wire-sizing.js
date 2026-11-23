
/* ==========================================
   WIRE SIZING CALCULATOR
   NEC 2023 TABLE 310.16 — BASE AMPACITY
========================================== */

const wireAmpacityTable = {
  copper: [
    ["14 AWG", 15, 20, 15],
    ["12 AWG", 20, 25, 20],
    ["10 AWG", 30, 35, 30],
    ["8 AWG", 40, 50],
    ["6 AWG", 55, 65],
    ["4 AWG", 70, 85],
    ["3 AWG", 85, 100],
    ["2 AWG", 95, 115],
    ["1 AWG", 110, 130],
    ["1/0 AWG", 125, 150],
    ["2/0 AWG", 145, 175],
    ["3/0 AWG", 165, 200],
    ["4/0 AWG", 195, 230],
    ["250 kcmil", 215, 255],
    ["300 kcmil", 240, 285],
    ["350 kcmil", 260, 310],
    ["400 kcmil", 280, 335],
    ["500 kcmil", 320, 380]
  ],

  aluminum: [
    ["12 AWG", 15, 20, 15],
    ["10 AWG", 25, 30, 25],
    ["8 AWG", 35, 40],
    ["6 AWG", 40, 50],
    ["4 AWG", 55, 65],
    ["3 AWG", 65, 75],
    ["2 AWG", 75, 90],
    ["1 AWG", 85, 100],
    ["1/0 AWG", 100, 120],
    ["2/0 AWG", 115, 135],
    ["3/0 AWG", 130, 155],
    ["4/0 AWG", 150, 180],
    ["250 kcmil", 170, 205],
    ["300 kcmil", 195, 230],
    ["350 kcmil", 210, 250],
    ["400 kcmil", 225, 270],
    ["500 kcmil", 260, 310]
  ]
};

// Each row:
// [wire size, 60C ampacity, 75C ampacity,
//  optional small-conductor OCPD limit]


/* ==========================================
   WIRE SIZING 2.0
   AMPACITY + VOLTAGE DROP
========================================== */

// Nominal conductor areas in circular mils.
const wireSizeCircularMils = {
  "14 AWG": 4110,
  "12 AWG": 6530,
  "10 AWG": 10380,
  "8 AWG": 16510,
  "6 AWG": 26240,
  "4 AWG": 41740,
  "3 AWG": 52620,
  "2 AWG": 66360,
  "1 AWG": 83690,
  "1/0 AWG": 105600,
  "2/0 AWG": 133100,
  "3/0 AWG": 167800,
  "4/0 AWG": 211600,
  "250 kcmil": 250000,
  "300 kcmil": 300000,
  "350 kcmil": 350000,
  "400 kcmil": 400000,
  "500 kcmil": 500000
};

function calculateWireSize() {

  const get = id => document.getElementById(id);

  const ampsField = get("wireLoadAmps");
  const materialField = get("wireMaterial");
  const tempField = get("wireTemperature");
  const continuousField = get("wireContinuous");
  const voltageField = get("wireVoltage");
  const phaseField = get("wirePhase");
  const distanceField = get("wireDistance");
  const dropField = get("wireDropLimit");
  const result = get("wireSizeResult");

  if ([
    ampsField, materialField, tempField,
    continuousField, voltageField,
    phaseField, distanceField, dropField,
    result
  ].some(field => !field)) return;

  const loadAmps = Number(ampsField.value);
  const material = materialField.value;
  const rating = Number(tempField.value);
  const continuous =
    continuousField.value === "yes";
  const voltage = Number(voltageField.value);
  const phase = Number(phaseField.value);
  const distance = Number(distanceField.value);
  const maxDrop = Number(dropField.value);

  if (
    ampsField.value.trim() === "" ||
    distanceField.value.trim() === "" ||
    !Number.isFinite(loadAmps) ||
    !Number.isFinite(voltage) ||
    !Number.isFinite(distance) ||
    !Number.isFinite(maxDrop) ||
    loadAmps <= 0 ||
    voltage <= 0 ||
    distance <= 0 ||
    maxDrop <= 0 ||
    ![1, 3].includes(phase) ||
    ![60, 75].includes(rating)
  ) {
    result.textContent =
      "Enter valid load, voltage, phase, and distance values.";
    return;
  }

  const table = wireAmpacityTable[material];

  if (!table) {
    result.textContent =
      "Choose copper or aluminum.";
    return;
  }

  // Continuous loads use a 125% ampacity
  // sizing screen for this basic calculator.
  const requiredAmpacity =
    loadAmps * (continuous ? 1.25 : 1);

  // Approximate resistivity at 75 degrees C.
  const K = material === "copper" ? 12.9 : 21.2;

  // Single-phase uses 2.
  // Three-phase uses square root of 3.
  const phaseFactor =
    phase === 3 ? Math.sqrt(3) : 2;

  const ampacityColumn =
    rating === 75 ? 2 : 1;

  function getVoltageDrop(size) {
    const cm = wireSizeCircularMils[size];

    if (!cm) return Infinity;

    return (
      phaseFactor * K * loadAmps * distance
    ) / cm;
  }

  function isAmpacityEligible(row) {
    const tableAmps = row[ampacityColumn];

    // Conservative small-wire protection
    // screen from the existing reference table.
    const smallWireLimit = row[3] ?? Infinity;

    return (
      tableAmps >= requiredAmpacity &&
      smallWireLimit >= requiredAmpacity
    );
  }

  // Minimum size based on basic ampacity.
  const ampacitySize =
    table.find(isAmpacityEligible);

  if (!ampacitySize) {
    result.textContent =
      "The required ampacity exceeds this " +
      "reference table. Detailed sizing needed.";
    return;
  }

  // Choose the first size satisfying both
  // ampacity and selected voltage drop.
  const selected = table.find(row => {
    if (!isAmpacityEligible(row)) return false;

    const dropVolts = getVoltageDrop(row[0]);
    const dropPercent =
      (dropVolts / voltage) * 100;

    return dropPercent <= maxDrop;
  });

  if (!selected) {
    result.innerHTML = `
      <div style="background:#0f172a;
                  color:white;padding:16px;
                  border-radius:12px;">
        <h3 style="color:#facc15;">
          No Matching Size in Table
        </h3>
        <p>
          Minimum ampacity size:
          <strong>${ampacitySize[0]}</strong>
        </p>
        <p>
          No listed single conductor satisfies
          both the ampacity screen and
          ${maxDrop}% voltage-drop target.
        </p>
        <p>
          Review conductor configuration,
          parallel sets, or engineering design.
        </p>
      </div>
    `;
    return;
  }

  const selectedSize = selected[0];
  const selectedAmpacity =
    selected[ampacityColumn];

  const voltageDrop =
    getVoltageDrop(selectedSize);

  const dropPercent =
    (voltageDrop / voltage) * 100;

  const loadVoltage =
    voltage - voltageDrop;

  const allowedDropVolts =
    voltage * maxDrop / 100;

  const upsized =
    selectedSize !== ampacitySize[0];

  result.innerHTML = `
    <div style="background:#0f172a;
                color:white;padding:16px;
                border-radius:12px;">

      <h3 style="color:#4ade80;">
        Preliminary Wire Recommendation
      </h3>

      <h2 style="color:#4ade80;">
        ${selectedSize}
      </h2>

      <p>Material:
        ${material === "copper"
          ? "Copper" : "Aluminum"}
      </p>

      <p>Electrical System:
        ${phase === 3
          ? "Three-Phase" : "Single-Phase"}
      </p>

      <p>System Voltage:
        ${voltage} V
      </p>

      <p>One-Way Distance:
        ${distance.toFixed(1)} ft
      </p>

      <p>Load Current:
        ${loadAmps.toFixed(2)} A
      </p>

      <p>Required Ampacity:
        ${requiredAmpacity.toFixed(2)} A
      </p>

      <p>Selected Wire Ampacity:
        ${selectedAmpacity} A
        (${rating}°C column)
      </p>

      <hr>

      <h3 style="color:#38bdf8;">
        Voltage Drop Results
      </h3>

      <p>Estimated Voltage Drop:
        <strong>
          ${voltageDrop.toFixed(2)} V
        </strong>
      </p>

      <p>Voltage Drop Percentage:
        <strong>
          ${dropPercent.toFixed(2)}%
        </strong>
      </p>

      <p>Selected Maximum Drop:
        ${maxDrop.toFixed(1)}%
        (${allowedDropVolts.toFixed(2)} V)
      </p>

      <p>Estimated Load Voltage:
        <strong>
          ${loadVoltage.toFixed(2)} V
        </strong>
      </p>

      <p style="color:#4ade80;">
        Voltage-drop target satisfied.
      </p>

      <hr>

      <p>Minimum Ampacity-Only Size:
        <strong>${ampacitySize[0]}</strong>
      </p>

      <p style="color:${upsized
        ? "#facc15" : "#4ade80"};">
        ${upsized
          ? "Wire increased in size to meet " +
            "the voltage-drop target."
          : "Ampacity-selected size also meets " +
            "the voltage-drop target."}
      </p>

      <p style="font-size:12px;
                color:#facc15;">
        Preliminary estimate only.
        Voltage drop uses approximate
        75°C conductor resistance,
        without AC reactance or power factor.
        Ampacity assumes 30°C ambient and
        no more than three current-carrying
        conductors. No conductor-count or
        ambient correction is performed.
        Verify insulation, terminations,
        overcurrent protection, conductor
        adjustments, and applicable NEC rules.
        Motor circuits require separate
        Article 430 evaluation.
      </p>
    </div>
  `;
}
