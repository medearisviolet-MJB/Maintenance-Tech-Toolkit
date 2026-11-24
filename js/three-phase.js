
/* ============================================
   THREE-PHASE MOTOR TROUBLESHOOTING SIMULATOR
   480V INDUSTRIAL MOTOR — VERSION 1
============================================ */

const tp3Faults = [
  { id: "fuse2", name: "Blown L2 power fuse" },
  { id: "pole3", name: "Failed L3 contactor pole" },
  { id: "overload", name: "Tripped motor overload" },
  { id: "control", name: "Open control circuit fuse" },
  { id: "low", name: "Low incoming voltage" },
  { id: "imbalance", name: "Three-phase voltage imbalance" }
];

let tp3State = {
  fault: "fuse2",
  contactor: false
};

function tp3SimulatorHTML() {
  tp3State = {
    fault: tp3Faults[
      Math.floor(Math.random() * tp3Faults.length)
    ].id,
    contactor: false
  };

  return `
    <details class="calculator"
      ontoggle="if(this.open) tp3Render()">

      <summary>
        480V Three-Phase Motor Simulator
      </summary>

      <div class="calculator-body">

        <style>
          .tp3-panel {
            background: #0f172a;
            color: white;
            border: 1px solid #475569;
            border-radius: 12px;
            padding: 12px;
            margin: 12px 0;
            min-width: 0;
            overflow: hidden;
          }

          .tp3-panel svg {
            display: block;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            height: auto;
          }

          .tp3-motor.running .tp3-fan,
          .tp3-motor.running .tp3-shaft-marker {
            animation: tp3Spin .45s linear infinite;
          }

          .tp3-fan {
            transform-origin: 150px 155px;
          }

          .tp3-shaft-marker {
            transform-origin: 650px 166px;
          }

          @keyframes tp3Spin {
            to { transform: rotate(360deg); }
          }

          @media (prefers-reduced-motion: reduce) {
            .tp3-motor.running .tp3-fan,
            .tp3-motor.running .tp3-shaft-marker {
              animation: none;
            }
          }

          .tp3-controls {
            display: grid;
            grid-template-columns: repeat(2,minmax(0,1fr));
            gap: 10px;
            margin: 15px 0;
          }

          .tp3-controls button {
            min-width: 0;
          }

          .tp3-panel select {
            width: 100%;
            padding: 12px;
            margin: 7px 0 12px;
            color: #0f172a;
            background: #fff;
            border-radius: 7px;
          }
        </style>

        <h3>480V Three-Phase Motor Troubleshooting</h3>

        <p>
          A hidden electrical fault has been
          generated. Use the simulated meters
          to identify the problem.
        </p>

        <div class="tp3-controls">
          <button class="action" onclick="tp3Start()">
            ▶ START
          </button>

          <button class="action" onclick="tp3Stop()">
            ■ STOP
          </button>

          <button class="action" onclick="tp3NewFault()">
            ↻ NEW FAULT
          </button>

          <button class="action" onclick="tp3Repair()">
            🔧 REPAIR
          </button>
        </div>

        <p id="tp3Status" aria-live="polite">
          Motor stopped.
        </p>

        <div class="tp3-panel">
          <h4>Three-Phase Power Circuit</h4>
          <div id="tp3PowerDiagram"></div>

          <p style="font-size:12px;color:#cbd5e1;">
            F1-F3 = Power fuses |
            KM1 = Contactor |
            OL = Overload |
            M = Motor
          </p>
        </div>

        <div class="tp3-panel">
          <h4>Industrial Three-Phase Motor</h4>

          <div id="tp3Motor" class="tp3-motor">
            <svg viewBox="0 0 700 300"
              role="img"
              aria-label="Animated industrial motor">

              <defs>
                <linearGradient id="tp3Body"
                  x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#6aa1c5"/>
                  <stop offset="45%" stop-color="#25618d"/>
                  <stop offset="100%" stop-color="#102c45"/>
                </linearGradient>

                <linearGradient id="tp3Metal"
                  x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#e2e8f0"/>
                  <stop offset="45%" stop-color="#8897a5"/>
                  <stop offset="100%" stop-color="#334155"/>
                </linearGradient>
              </defs>

              <!-- Motor base and feet -->
              <ellipse cx="353" cy="278" rx="285"
                ry="13" fill="#020617"/>

              <g fill="#183d5a" stroke="#0b263a"
                stroke-width="3">
                <path d="M233 218 H296 L304 269 H222 Z"/>
                <path d="M453 218 H520 L529 269 H445 Z"/>
              </g>

              <g fill="#94a3b8">
                <ellipse cx="260" cy="256" rx="10" ry="4"/>
                <ellipse cx="487" cy="256" rx="10" ry="4"/>
              </g>

              <!-- Rear fan housing -->
              <circle cx="150" cy="155" r="82"
                fill="url(#tp3Metal)"
                stroke="#293b4b" stroke-width="5"/>

              <circle cx="150" cy="155" r="67"
                fill="#10273c"/>

              <!-- Rotating cooling fan -->
              <g class="tp3-fan" fill="#5b92b5">
                <path d="M150 155 Q112 99 151 95
                  Q172 110 150 155 Z"/>
                <path d="M150 155 Q206 116 210 156
                  Q198 179 150 155 Z"/>
                <path d="M150 155 Q187 211 149 215
                  Q126 201 150 155 Z"/>
                <path d="M150 155 Q94 190 90 154
                  Q102 131 150 155 Z"/>
              </g>

              <!-- Stationary fan guard -->
              <g fill="none" stroke="#a3b3c1"
                stroke-width="2">
                <circle cx="150" cy="155" r="54"/>
                <circle cx="150" cy="155" r="35"/>
                <circle cx="150" cy="155" r="14"/>
                <path d="M83 155 H217
                  M150 88 V222
                  M103 108 L197 202
                  M197 108 L103 202"/>
              </g>

              <!-- Cast iron motor body -->
              <rect x="189" y="81" width="357"
                height="158" rx="26"
                fill="url(#tp3Body)"
                stroke="#0b3048" stroke-width="5"/>

              <!-- Cooling fins -->
              <g stroke="#10405e" stroke-width="6"
                stroke-linecap="round">
                <path d="M210 103 H525"/>
                <path d="M210 126 H525"/>
                <path d="M210 149 H525"/>
                <path d="M210 172 H525"/>
                <path d="M210 195 H525"/>
                <path d="M210 218 H525"/>
              </g>

              <!-- Terminal box -->
              <rect x="332" y="36" width="160"
                height="54" rx="7"
                fill="#214d70"
                stroke="#102d44" stroke-width="4"/>

              <rect x="325" y="31" width="174"
                height="13" rx="3"
                fill="#829fb3"/>

              <g fill="#fff" font-size="14"
                font-weight="bold"
                text-anchor="middle">
                <text x="360" y="70">L1</text>
                <text x="412" y="70">L2</text>
                <text x="464" y="70">L3</text>
              </g>

              <!-- Motor nameplate -->
              <rect x="344" y="158" width="137"
                height="52" rx="4"
                fill="#cbd5e1"
                stroke="#334155" stroke-width="3"/>

              <g fill="#172d40" text-anchor="middle">
                <text x="412" y="178"
                  font-size="14" font-weight="bold">
                  3~ AC MOTOR
                </text>
                <text x="412" y="196" font-size="11">
                  480V · 60Hz
                </text>
              </g>

              <!-- Front end bell -->
              <ellipse cx="547" cy="160"
                rx="29" ry="78"
                fill="url(#tp3Metal)"
                stroke="#293c4e" stroke-width="4"/>

              <!-- Shaft -->
              <rect x="564" y="148" width="86"
                height="24" rx="4"
                fill="url(#tp3Metal)"
                stroke="#344454" stroke-width="2"/>

              <ellipse cx="650" cy="160"
                rx="13" ry="15"
                fill="#bbc7d1"
                stroke="#334155" stroke-width="3"/>

              <g class="tp3-shaft-marker"
                stroke="#334155" stroke-width="3">
                <path d="M640 160 H660"/>
                <path d="M650 150 V170"/>
              </g>

              <!-- Run indicator -->
              <circle id="tp3MotorLamp"
                cx="620" cy="65" r="12"
                fill="#64748b"/>

              <text x="620" y="39"
                fill="#fff" font-size="13"
                text-anchor="middle">
                STATUS
              </text>
            </svg>
          </div>

          <p id="tp3MotorText"
            style="text-align:center;font-weight:bold;
                   color:#94a3b8;">
            MOTOR STOPPED
          </p>
        </div>

        <div class="tp3-panel">
          <h4>Virtual Three-Phase Voltmeter</h4>

          <label for="tp3Location">Test Location</label>
          <select id="tp3Location"
            onchange="tp3Render()">
            <option value="incoming">
              Incoming Supply
            </option>
            <option value="fuses">
              After Power Fuses
            </option>
            <option value="motor">
              Motor Terminals
            </option>
          </select>

          <label for="tp3Pair">Measure Between</label>
          <select id="tp3Pair"
            onchange="tp3Render()">
            <option value="0">L1 - L2</option>
            <option value="1">L2 - L3</option>
            <option value="2">L1 - L3</option>
          </select>

          <h2 id="tp3VoltageDisplay"
            style="text-align:center;color:#4ade80;">
            480.0 V AC
          </h2>

          <h4>Virtual Clamp Meter</h4>

          <select id="tp3CurrentPhase"
            onchange="tp3Render()">
            <option value="0">L1 Current</option>
            <option value="1">L2 Current</option>
            <option value="2">L3 Current</option>
          </select>

          <h2 id="tp3CurrentDisplay"
            style="text-align:center;color:#38bdf8;">
            0.0 A
          </h2>

          <p id="tp3Unbalance"></p>

          <p style="font-size:12px;color:#cbd5e1;">
            Idealized virtual readings for training.
            Open phases are marked FLOAT rather
            than assigning unreliable voltages.
            Running currents are illustrative.
          </p>
        </div>

        <h4>Fault Diagnosis</h4>

        <select id="tp3Guess"
          style="width:100%;padding:12px;
                 margin-bottom:10px;">
          <option value="">Select a fault</option>
          ${tp3Faults.map(f => `
            <option value="${f.id}">
              ${f.name}
            </option>
          `).join("")}
        </select>

        <button type="button" class="action"
          onclick="tp3CheckDiagnosis()">
          Check Diagnosis
        </button>

        <p id="tp3Feedback" aria-live="polite">
          Diagnose the hidden electrical fault.
        </p>

        <p style="font-size:12px;opacity:0.75;">
          Virtual training only. High-voltage
          equipment must be serviced under
          approved electrical safety and
          lockout/tagout procedures.
        </p>

      </div>
    </details>
  `;
}

/* ============================================
   CONTROL LOGIC
============================================ */

function tp3ControlOK() {
  return !["overload", "control"]
    .includes(tp3State.fault);
}

function tp3AvailablePhases(location) {
  const phases = [true, true, true];

  if (location !== "incoming") {
    if (tp3State.fault === "fuse2") {
      phases[1] = false;
    }
  }

  if (location === "motor") {
    if (!tp3State.contactor) {
      return [false, false, false];
    }

    if (tp3State.fault === "pole3") {
      phases[2] = false;
    }
  }

  return phases;
}

function tp3MotorRunning() {
  return tp3State.contactor &&
    tp3AvailablePhases("motor").every(Boolean);
}

function tp3Start() {
  tp3State.contactor = tp3ControlOK();
  tp3Render();
}

function tp3Stop() {
  tp3State.contactor = false;
  tp3Render();
}

function tp3NewFault() {
  const available = tp3Faults.filter(
    f => f.id !== tp3State.fault
  );

  tp3State.fault = available[
    Math.floor(Math.random() * available.length)
  ].id;

  tp3State.contactor = false;

  document.getElementById("tp3Guess").value = "";
  document.getElementById("tp3Feedback")
    .textContent = "New hidden fault loaded.";

  tp3Render();
}

function tp3Repair() {
  tp3State.fault = "none";
  tp3State.contactor = false;

  document.getElementById("tp3Feedback")
    .textContent =
    "Fault repaired. Press START to verify operation.";

  tp3Render();
}

function tp3CheckDiagnosis() {
  const guess =
    document.getElementById("tp3Guess").value;

  const feedback =
    document.getElementById("tp3Feedback");

  if (!guess) {
    feedback.textContent =
      "Choose a fault before checking.";
  } else if (tp3State.fault === "none") {
    feedback.textContent =
      "Circuit already repaired. Load a new fault.";
  } else if (guess === tp3State.fault) {
    feedback.textContent =
      "CORRECT! You identified the electrical fault.";
  } else {
    feedback.textContent =
      "Incorrect. Compare incoming and motor-side readings.";
  }
}

/* ============================================
   VIRTUAL METER VALUES
============================================ */

function tp3SupplyVoltages() {
  switch (tp3State.fault) {
    case "low":
      return [415, 415, 415];
    case "imbalance":
      return [470, 480, 440];
    default:
      return [480, 480, 480];
  }
}

function tp3CurrentReading(phase) {
  if (!tp3State.contactor) return "0.0 A";

  const available = tp3AvailablePhases("motor");

  if (!available.every(Boolean)) {
    return available[phase]
      ? "NOT MODELED"
      : "0.0 A";
  }

  const currents =
    tp3State.fault === "low"
      ? [9.4, 9.2, 9.6]
      : tp3State.fault === "imbalance"
        ? [9.8, 8.1, 10.2]
        : [8.1, 8.3, 8.2];

  return currents[phase].toFixed(1) + " A";
}

/* ============================================
   RENDER POWER CIRCUIT AND MOTOR
============================================ */

function tp3Render() {
  const diagram =
    document.getElementById("tp3PowerDiagram");

  if (!diagram) return;

  const source = tp3AvailablePhases("incoming");
  const afterFuse = tp3AvailablePhases("fuses");
  const motorPhases = tp3AvailablePhases("motor");

  const running = tp3MotorRunning();

  const green = "#4ade80";
  const gray = "#64748b";

  const lines = [58, 108, 158].map((y, i) => {
    const fuseColor = afterFuse[i] ? green : gray;
    const motorColor = motorPhases[i] ? green : gray;

    return `
      <g fill="none" stroke-width="3"
         stroke-linecap="round">

        <path d="M35 ${y} H113"
          stroke="${source[i] ? green : gray}"/>

        <rect x="113" y="${y - 9}"
          width="32" height="18"
          rx="3" stroke="${fuseColor}"/>

        <path d="M145 ${y} H234"
          stroke="${fuseColor}"/>

        <path d="M234 ${y - 15} V${y + 15}"
          stroke="${fuseColor}"/>

        <path d="M256 ${y - 15} V${y + 15}"
          stroke="${motorColor}"/>

        <path d="M256 ${y} H359"
          stroke="${motorColor}"/>

        <rect x="359" y="${y - 11}"
          width="38" height="22"
          rx="4" stroke="${motorColor}"/>

        <path d="M397 ${y} H552"
          stroke="${motorColor}"/>
      </g>

      <text x="7" y="${y + 5}"
        fill="#e2e8f0" font-size="15">
        L${i + 1}
      </text>
    `;
  }).join("");

  diagram.innerHTML = `
    <svg viewBox="0 0 610 245"
      role="img"
      aria-label="Three-phase motor power circuit">

      <g fill="#e2e8f0"
         text-anchor="middle"
         font-size="13">
        <text x="129" y="25">F1-F3</text>
        <text x="244" y="25">KM1</text>
        <text x="378" y="25">OL</text>
        <text x="562" y="25">MOTOR</text>
      </g>

      ${lines}

      <rect x="552" y="35"
        width="50" height="150" rx="10"
        fill="#1e3a5f"
        stroke="${running ? green : gray}"
        stroke-width="3"/>

      <g fill="#fff" font-size="18"
         text-anchor="middle">
        <text x="577" y="108">M</text>
        <text x="577" y="132">3~</text>
      </g>

      <text x="305" y="219"
        fill="#cbd5e1"
        font-size="13"
        text-anchor="middle">
        Green = Simulated Energized Path
      </text>
    </svg>
  `;

  const motor = document.getElementById("tp3Motor");
  const motorText =
    document.getElementById("tp3MotorText");

  motor.classList.toggle("running", running);

  const warning =
    ["low", "imbalance"].includes(tp3State.fault);

  const lamp =
    document.getElementById("tp3MotorLamp");

  lamp.setAttribute("fill",
    running ? (warning ? "#facc15" : green) : gray
  );

  motorText.textContent =
    running
      ? warning
        ? "MOTOR RUNNING — ABNORMAL VOLTAGE"
        : "MOTOR RUNNING"
      : "MOTOR STOPPED";

  motorText.style.color =
    running
      ? warning ? "#facc15" : green
      : "#94a3b8";

  const status =
    document.getElementById("tp3Status");

  status.textContent =
    tp3State.contactor
      ? running
        ? "KM1 ENERGIZED — MOTOR RUNNING"
        : "KM1 ENERGIZED — MOTOR NOT RUNNING"
      : "KM1 OFF — MOTOR STOPPED";

  // Virtual voltage readings.
  const location =
    document.getElementById("tp3Location").value;

  const pairIndex =
    Number(document.getElementById("tp3Pair").value);

  const pairs = [[0,1], [1,2], [0,2]];
  const pair = pairs[pairIndex];

  const available = tp3AvailablePhases(location);
  const volts = tp3SupplyVoltages();

  const voltageDisplay =
    document.getElementById("tp3VoltageDisplay");

  voltageDisplay.textContent =
    available[pair[0]] && available[pair[1]]
      ? volts[pairIndex].toFixed(1) + " V AC"
      : "OPEN / FLOAT";

  const currentPhase = Number(
    document.getElementById("tp3CurrentPhase").value
  );

  document.getElementById("tp3CurrentDisplay")
    .textContent = tp3CurrentReading(currentPhase);

  // Voltage imbalance:
  // maximum deviation from average / average.
  const average =
    volts.reduce((sum, v) => sum + v, 0) / 3;

  const maxDeviation = Math.max(
    ...volts.map(v => Math.abs(v - average))
  );

  const imbalance = maxDeviation / average * 100;

  document.getElementById("tp3Unbalance")
    .textContent =
    "Incoming Voltage Unbalance: " +
    imbalance.toFixed(2) + "%";
}
