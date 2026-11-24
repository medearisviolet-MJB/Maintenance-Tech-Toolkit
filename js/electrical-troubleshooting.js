
/* ==========================================
   ELECTRICAL TROUBLESHOOTING SIMULATOR
   VERSION 1 — 24V DC MOTOR STARTER
========================================== */

const etFaults = [
  { id: "fuse", name: "Open control fuse F1" },
  { id: "stop", name: "STOP contact stuck open" },
  { id: "overload", name: "Overload NC contact open" },
  { id: "start", name: "START contact failed open" },
  { id: "coil", name: "Contactor coil open" },
  { id: "aux", name: "Seal-in auxiliary contact failed open" }
];

let etState = {
  fault: "fuse",
  held: false,
  motor: false
};

/* ==========================================
   SIMULATOR HTML
========================================== */

function etTroubleshootingHTML() {

  etState = {
    fault: etFaults[
      Math.floor(Math.random() * etFaults.length)
    ].id,
    held: false,
    motor: false
  };

  return `
    <details class="calculator"
      ontoggle="if(this.open) etRender()">

      <summary>
        🧰 Electrical Troubleshooting Simulator
      </summary>

      <div class="calculator-body">

        <h3>24V DC Motor Starter — Fault Finder</h3>

        <p>
          A hidden fault is preventing normal operation.
          Use START/STOP, the virtual voltmeter,
          and the test points to diagnose it.
        </p>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin:12px 0;">

          <button type="button" class="action"
            onclick="etStart()">
            ▶ START Pulse
          </button>

          <button type="button" class="action"
            onclick="etStop()">
            ■ STOP Pulse
          </button>

          <button type="button" class="action"
            id="etHoldButton"
            onclick="etHold()">
            Hold START: OFF
          </button>

          <button type="button" class="action"
            onclick="etNewFault()">
            ↻ New Hidden Fault
          </button>

        </div>

        <p id="etMotorStatus" aria-live="polite">
          Motor starter: OFF
        </p>

        <div style="
          background:#0f172a;
          border:1px solid #475569;
          border-radius:12px;
          padding:10px;">

          <strong>24V DC Control Ladder</strong>

          <div id="etDiagram"></div>

          <p style="
            font-size:12px;
            color:#cbd5e1;
            margin:6px 0 0;">
            F1 → STOP (NC) → OL (NC) →
            [START (NO) / M AUX (NO)] →
            M Coil → 0V
          </p>

        </div>

        <h4>Virtual Voltmeter — DC Volts</h4>

        <p style="font-size:13px;">
          Select the red and black probe locations.
          Use Hold START to complete the
          momentary START path during testing.
        </p>

        <div style="
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:10px;">

          <label>
            Red Probe (+)

            <select id="etRed"
              onchange="etRender()"
              style="width:100%;padding:10px;">

              <option value="TP1">
                TP1 — +24V
              </option>

              <option value="TP2">
                TP2 — After Fuse
              </option>

              <option value="TP3">
                TP3 — After STOP
              </option>

              <option value="TP4">
                TP4 — After Overload
              </option>

              <option value="TP5" selected>
                TP5 — Coil Positive
              </option>

              <option value="0V">
                0V — Return
              </option>

            </select>
          </label>

          <label>
            Black Probe (-)

            <select id="etBlack"
              onchange="etRender()"
              style="width:100%;padding:10px;">

              <option value="0V" selected>
                0V — Return
              </option>

              <option value="TP1">TP1</option>
              <option value="TP2">TP2</option>
              <option value="TP3">TP3</option>
              <option value="TP4">TP4</option>
              <option value="TP5">TP5</option>

            </select>
          </label>

        </div>

        <div style="
          background:#111827;
          border:1px solid #64748b;
          padding:15px;
          margin:10px 0;
          border-radius:12px;
          text-align:center;">

          <div style="
            font-size:12px;
            color:#93c5fd;">
            SIMULATED DC VOLTMETER
          </div>

          <div id="etMeter"
            aria-live="polite"
            style="
              font-family:monospace;
              font-size:clamp(22px,6vw,34px);
              color:#4ade80;">
            0.0 V DC
          </div>

        </div>

        <h4>Diagnose the Fault</h4>

        <select id="etGuess"
          style="
            width:100%;
            padding:12px;
            margin-bottom:8px;">

          <option value="">
            Choose Your Diagnosis
          </option>

          ${etFaults.map(f => `
            <option value="${f.id}">
              ${f.name}
            </option>
          `).join("")}

        </select>

        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;">

          <button type="button" class="action"
            onclick="etCheck()">
            Check Diagnosis
          </button>

          <button type="button" class="action"
            onclick="etRepair()">
            Repair Fault
          </button>

        </div>

        <p id="etFeedback" aria-live="polite">
          Try START, then use the meter
          to locate the open circuit.
        </p>

        <p style="font-size:12px;opacity:0.8;">
          Virtual training only.
          Floating test points are displayed
          as FLOAT instead of an invented voltage.
          A STOP button is not an
          energy-isolating device.
        </p>

      </div>
    </details>
  `;
}

/* ==========================================
   MOTOR CONTROL LOGIC
========================================== */

function etRecalc() {

  const s = etState;

  const supplyOK = ![
    "fuse",
    "stop",
    "overload"
  ].includes(s.fault);

  const startClosed =
    s.held && s.fault !== "start";

  const auxClosed =
    s.motor && s.fault !== "aux";

  s.motor =
    supplyOK &&
    s.fault !== "coil" &&
    (startClosed || auxClosed);
}

/* START BUTTON */

function etStart() {

  etState.held = true;
  etRecalc();

  etState.held = false;
  etRecalc();

  etRender();
}

/* STOP BUTTON */

function etStop() {

  etState.held = false;
  etState.motor = false;

  etRender();
}

/* HOLD START BUTTON */

function etHold() {

  etState.held = !etState.held;

  etRecalc();
  etRender();
}

/* ==========================================
   FAULT GENERATOR
========================================== */

function etNewFault() {

  const choices = etFaults.filter(
    f => f.id !== etState.fault
  );

  etState = {
    fault: choices[
      Math.floor(Math.random() * choices.length)
    ].id,
    motor: false,
    held: false
  };

  const feedback =
    document.getElementById("etFeedback");

  if (feedback) {
    feedback.textContent =
      "New hidden fault loaded. " +
      "Try START and take measurements.";
  }

  etRender();
}

/* REPAIR FAULT */

function etRepair() {

  etState.fault = "none";
  etState.motor = false;
  etState.held = false;

  document.getElementById("etFeedback")
    .textContent =
    "Fault repaired. Press START to test the healthy circuit.";

  etRender();
}

/* CHECK DIAGNOSIS */

function etCheck() {

  const selected =
    document.getElementById("etGuess").value;

  const feedback =
    document.getElementById("etFeedback");

  if (!selected) {
    feedback.textContent =
      "Choose a fault before checking.";
    return;
  }

  if (etState.fault === "none") {

    feedback.textContent =
      "The circuit is already repaired. " +
      "Generate a new fault.";

  } else if (selected === etState.fault) {

    const found = etFaults.find(
      f => f.id === etState.fault
    );

    feedback.textContent =
      "Correct diagnosis! " + found.name;

  } else {

    feedback.textContent =
      "Not quite. Hold START and trace " +
      "voltage from TP1 toward TP5.";
  }
}

/* ==========================================
   VIRTUAL VOLTMETER LOGIC
========================================== */

function etVoltages() {

  const nodes = [
    "TP1", "TP2", "TP3", "TP4", "TP5"
  ];

  const adj = Object.fromEntries(
    nodes.map(n => [n, []])
  );

  const edge = (a, b, closed) => {

    if (closed) {
      adj[a].push(b);
      adj[b].push(a);
    }
  };

  edge(
    "TP1", "TP2",
    etState.fault !== "fuse"
  );

  edge(
    "TP2", "TP3",
    etState.fault !== "stop"
  );

  edge(
    "TP3", "TP4",
    etState.fault !== "overload"
  );

  edge(
    "TP4", "TP5",
    (
      etState.held &&
      etState.fault !== "start"
    ) ||
    (
      etState.motor &&
      etState.fault !== "aux"
    )
  );

  const reachable = from => {

    const seen = new Set([from]);
    const pending = [from];

    while (pending.length) {

      const n = pending.pop();

      for (const to of adj[n]) {

        if (!seen.has(to)) {
          seen.add(to);
          pending.push(to);
        }
      }
    }

    return seen;
  };

  const hot = reachable("TP1");

  const toCoil =
    etState.fault !== "coil"
      ? reachable("TP5")
      : new Set();

  const volts = {
    "0V": 0
  };

  for (const node of nodes) {

    volts[node] = hot.has(node)
      ? 24
      : toCoil.has(node)
        ? 0
        : null;
  }

  return volts;
}

/* ==========================================
   RENDER ANIMATED LADDER
========================================== */

function etRender() {

  const diagram =
    document.getElementById("etDiagram");

  if (!diagram) return;

  const v = etVoltages();

  const hot = n => v[n] === 24;

  const color = on =>
    on ? "#4ade80" : "#64748b";

  const line = (x1, y1, x2, y2, on) => `
    <line
      x1="${x1}"
      y1="${y1}"
      x2="${x2}"
      y2="${y2}"
      stroke="${color(on)}"
      stroke-width="3"
      stroke-linecap="round"
    />
  `;

  const contact = (x, y, on, nc = false) => `
    <g stroke="${color(on)}"
       stroke-width="3"
       fill="none">

      <path d="
        M${x} ${y - 18}
        V${y + 18}

        M${x + 18} ${y - 18}
        V${y + 18}
      "/>

      ${nc ? `
        <path d="
          M${x - 5} ${y + 23}
          L${x + 23} ${y - 23}
        "/>
      ` : ""}

    </g>
  `;

  const startConducting =
    etState.held &&
    etState.fault !== "start" &&
    hot("TP4");

  const auxConducting =
    etState.motor &&
    etState.fault !== "aux" &&
    hot("TP4");

  const tp = (n, x) => `
    <circle
      cx="${x}"
      cy="95"
      r="4"
      fill="${
        hot(n)
          ? "#4ade80"
          : v[n] === null
            ? "#fbbf24"
            : "#94a3b8"
      }"
    />

    <text
      x="${x}"
      y="133"
      fill="#e2e8f0"
      text-anchor="middle"
      font-size="12">
      ${n}
    </text>
  `;

  diagram.innerHTML = `
    <svg
      viewBox="0 0 500 230"
      role="img"
      aria-label="24V DC motor starter ladder"
      style="
        display:block;
        width:100%;
        max-width:100%;
        height:auto;
      ">

      <!-- POWER RAILS -->

      <g fill="none"
         stroke="#e2e8f0"
         stroke-width="3">

        <path d="
          M18 30 V210
          M482 30 V210
        "/>
      </g>

      <g fill="#e2e8f0"
         font-size="13"
         text-anchor="middle">

        <text x="21" y="21">+24</text>
        <text x="478" y="21">0V</text>

        <text x="68" y="60">F1</text>
        <text x="132" y="60">STOP</text>
        <text x="205" y="60">OL</text>
        <text x="302" y="60">START</text>
        <text x="424" y="60">M</text>
        <text x="301" y="198">M AUX</text>

      </g>

      <!-- CONTROL PATH -->

      ${line(18,95,58,95,true)}

      <rect
        x="58" y="83"
        width="24" height="24"
        fill="none"
        stroke="${color(hot("TP2"))}"
        stroke-width="3"
      />

      ${line(82,95,125,95,hot("TP2"))}

      ${contact(125,95,hot("TP3"),true)}

      ${line(143,95,198,95,hot("TP3"))}

      ${contact(198,95,hot("TP4"),true)}

      ${line(216,95,287,95,hot("TP4"))}

      ${contact(287,95,startConducting)}

      ${line(305,95,414,95,hot("TP5"))}

      <!-- SEAL-IN BRANCH -->

      ${line(267,95,267,160,hot("TP4"))}

      ${line(267,160,287,160,hot("TP4"))}

      ${contact(287,160,auxConducting)}

      ${line(305,160,370,160,auxConducting)}

      ${line(370,160,370,95,auxConducting)}

      <!-- CONTACTOR COIL -->

      <g fill="none"
         stroke="${color(etState.motor)}"
         stroke-width="3">

        <path d="
          M424 76 Q405 95 424 114
          M444 76 Q463 95 444 114
        "/>

      </g>

      ${line(444,95,482,95,etState.motor)}

      <!-- TEST POINTS -->

      ${tp("TP1",40)}
      ${tp("TP2",104)}
      ${tp("TP3",170)}
      ${tp("TP4",252)}
      ${tp("TP5",390)}

      <text
        x="249" y="222"
        fill="#cbd5e1"
        text-anchor="middle"
        font-size="12">

        Green = 24V Path
        · Yellow = Floating

      </text>

    </svg>
  `;

  /* UPDATE MOTOR STATUS */

  document.getElementById("etMotorStatus")
    .textContent =
    "Motor starter: " +
    (
      etState.motor
        ? "🟢 ENERGIZED"
        : "🔴 OFF"
    );

  /* UPDATE START BUTTON */

  document.getElementById("etHoldButton")
    .textContent =
    "Hold START: " +
    (
      etState.held ? "ON" : "OFF"
    );

  /* UPDATE VIRTUAL METER */

  const red =
    document.getElementById("etRed").value;

  const black =
    document.getElementById("etBlack").value;

  const meter =
    document.getElementById("etMeter");

  meter.textContent =
    red === black
      ? "0.0 V DC"
      : v[red] === null || v[black] === null
        ? "FLOAT / UNKNOWN"
        : (v[red] - v[black]).toFixed(1) +
          " V DC";
}
