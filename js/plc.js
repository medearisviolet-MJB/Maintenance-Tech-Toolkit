
/* ======================================
   PLC MOTOR START/STOP SIMULATOR
   ====================================== */

let plcMotorRun = false;

// Build the simulator interface
function plcMotorSimulatorHTML() {
  plcMotorRun = false;

  return `
    <h3>Motor Start/Stop Seal-In Simulator</h3>

    <p>
      Practice a motor starter circuit using
      XIC contacts, an OTE output, and
      seal-in logic.
    </p>

    <div style="display:flex;gap:10px;flex-wrap:wrap;margin:15px 0;">
      <button type="button" class="action"
        onclick="plcStartMotor()">
        ▶ START
      </button>

      <button type="button" class="action"
        onclick="plcStopMotor()">
        ■ STOP
      </button>
    </div>

    <div id="plcMotorStatus"
      style="padding:15px;background:#1e293b;
             border-radius:10px;font-weight:bold;
             margin-bottom:12px;">
      🔴 MOTOR RUN: OFF
    </div>

    <h4>PLC Ladder Logic</h4>


<div id="plcLadderGraphic">
  ${plcLadderDiagramHTML(plcMotorRun)}
</div>


    <p id="plcContactStatus">
      STOP_OK = 1 |
      START_PB = 0 |
      MOTOR_RUN = 0
    </p>

    <p id="plcPathStatus">
      No energized path to the motor output.
    </p>

    <p id="plcActionMessage">
      Press START to energize the motor.
    </p>

    <p style="font-size:12px;opacity:0.75;">
      Training simulation only. Not a real
      motor control or safety circuit.
    </p>
  `;
}

// Simulate a momentary START pushbutton
function plcStartMotor() {
  const stopOK = true;
  const startPB = true;

  plcMotorRun =
    stopOK && (startPB || plcMotorRun);

  plcUpdateMotorView(
    "START was pressed and released. " +
    "The seal-in contact maintains MOTOR_RUN."
  );
}

// Simulate a momentary STOP pushbutton
function plcStopMotor() {
  const stopOK = false;
  const startPB = false;

  plcMotorRun =
    stopOK && (startPB || plcMotorRun);

  plcUpdateMotorView(
    "STOP opened the rung. " +
    "MOTOR_RUN and its seal-in contact dropped out."
  );
}

// Update the simulator display
function plcUpdateMotorView(message) {
  const status =
    document.getElementById("plcMotorStatus");
  const contacts =
    document.getElementById("plcContactStatus");
  const path =
    document.getElementById("plcPathStatus");
  const action =
    document.getElementById("plcActionMessage");

  if (!status || !contacts || !path || !action) {
    return;
  }

  if (plcMotorRun) {
    status.textContent = "🟢 MOTOR RUN: ON";
    status.style.color = "#4ade80";

    contacts.textContent =
      "STOP_OK = 1 | START_PB = 0 | MOTOR_RUN = 1";

    path.textContent =
      "ENERGIZED: STOP_OK → MOTOR_RUN seal-in → OTE";
    path.style.color = "#4ade80";
  } else {
    status.textContent = "🔴 MOTOR RUN: OFF";
    status.style.color = "#f87171";

    contacts.textContent =
      "STOP_OK = 1 | START_PB = 0 | MOTOR_RUN = 0";

    path.textContent =
      "No energized path to the motor output.";
    path.style.color = "#f87171";
  }

  // Update graphical ladder logic
  const graphic =
    document.getElementById("plcLadderGraphic");

  if (graphic) {
    graphic.innerHTML =
      plcLadderDiagramHTML(plcMotorRun);
  }

  action.textContent = message;
}


function plcLadderDiagramHTML(running = false) {
  const active = running ? "plc-ladder-active" : "";

  return `
    <div class="plc-ladder-panel">
      <h4>Live Motor Control Ladder</h4>

      <svg class="plc-ladder-svg"
           viewBox="0 0 540 210"
           xmlns="http://www.w3.org/2000/svg">

        <!-- Power rails -->
        <path d="M20 15 V190 M520 15 V190"
              class="plc-ladder-line"/>

        <!-- STOP_OK -->
        <path d="M20 70 H100 M125 70 H200"
              class="plc-ladder-line ${active}"/>

        <path d="M100 50 V90 M125 50 V90"
              class="plc-ladder-line ${active}"/>

        <text x="80" y="35" class="plc-ladder-text">
          STOP_OK
        </text>

        <!-- START_PB: released -->
        <path d="M200 70 H240 M265 70 H330"
              class="plc-ladder-line"/>

        <path d="M240 50 V90 M265 50 V90"
              class="plc-ladder-line"/>

        <text x="220" y="35" class="plc-ladder-text">
          START_PB
        </text>

        <!-- Seal-in branch -->
        <path d="M200 70 V140 H240"
              class="plc-ladder-line ${active}"/>

        <path d="M240 120 V160 M265 120 V160"
              class="plc-ladder-line ${active}"/>

        <path d="M265 140 H330 V70"
              class="plc-ladder-line ${active}"/>

        <text x="205" y="185" class="plc-ladder-text">
          MOTOR_RUN
        </text>

        <!-- Motor output -->
        <path d="M330 70 H395"
              class="plc-ladder-line ${active}"/>

        <path d="M405 50 Q390 70 405 90"
              class="plc-ladder-line ${active}"/>

        <path d="M430 50 Q445 70 430 90"
              class="plc-ladder-line ${active}"/>

        <path d="M395 70 H398 M438 70 H520"
              class="plc-ladder-line ${active}"/>

        <text x="375" y="35" class="plc-ladder-text">
          MOTOR_RUN
        </text>
      </svg>

      <div class="plc-ladder-status">
        ${running ? "🟢 ENERGIZED" : "🔴 DE-ENERGIZED"}
      </div>
    </div>
  `;
}


/* =====================================
   PLC TON TIMER SIMULATOR
   ===================================== */

let plcTonTimerId = null;
let plcTonEnabled = false;
let plcTonACC = 0;
let plcTonPRE = 5000;
let plcTonStartTime = 0;

function plcTonSimulatorHTML() {
  // Reset simulator when the PLC page is rebuilt.
  if (plcTonTimerId !== null) {
    clearInterval(plcTonTimerId);
    plcTonTimerId = null;
  }

  plcTonEnabled = false;
  plcTonACC = 0;
  plcTonPRE = 5000;

  return `
    <details class="plc-timer-dropdown">
  <summary>TON — Timer On Delay</summary>
  <div class="plc-timer-content">

    <h3>TON — Timer On Delay</h3>
    <p>
      Enable the rung to start timing.
      When ACC reaches PRE, the DN bit turns on.
    </p>

    <label for="plcTonPreset">Timer Preset (ms)</label>
    <input
      id="plcTonPreset"
      type="number"
      value="5000"
      min="100"
      max="60000"
      step="100"
      style="width:100%;padding:12px;margin:8px 0 15px;"
    >

    <div style="display:flex;gap:10px;margin-bottom:15px;">
      <button type="button" class="action"
        onclick="plcTonStart()">
        ▶ ENABLE
      </button>

      <button type="button" class="action"
        onclick="plcTonReset()">
        ■ RESET
      </button>
    </div>

    <div class="plc-ladder-panel">
      <h4>Live TON Ladder Logic</h4>

      <svg class="plc-ladder-svg"
           viewBox="0 0 700 355"
           xmlns="http://www.w3.org/2000/svg">

        <!-- Ladder rails -->
      <path d="M25 15 V335 M675 15 V335"
      class="plc-ladder-line"/>

<!-- Timer enable path -->
<g id="plcTonRung" class="plc-ladder-line">
  <path d="M25 95 H120 M145 95 H240"/>
  <path d="M120 73 V117 M145 73 V117"/>
</g>

<!-- Timer done indication -->
<path id="plcTonDonePath"
      d="M490 95 H675"
      class="plc-ladder-line"/>


        <text x="105" y="58" class="plc-ladder-text">
          ENABLE
        </text>

        <!-- TON instruction block -->
        <rect id="plcTonBlock"
              x="240" y="30"
              width="250" height="135"
              rx="8"
              class="plc-ladder-line"
              style="fill:#17263b;"/>

        <text x="270" y="60"
              class="plc-ladder-text">TON — T1</text>

        <text x="270" y="90"
              class="plc-ladder-text">PRE</text>

        <text x="270" y="120"
              class="plc-ladder-text">ACC</text>

        <text x="270" y="150"
              class="plc-ladder-text">DN</text>

        <circle id="plcTonDnLamp"
                cx="455" cy="145" r="9"
                fill="#64748b"/>
       
<!-- =====================================
     RUNG 2 - TIMER DONE OUTPUT
     ===================================== -->

<text x="40" y="225"
      class="plc-ladder-text">
  Rung 2 - Timer Done Output
</text>

<g id="plcTonOutputRung"
   class="plc-ladder-line">

  <!-- Wire from left rail -->
  <path d="M25 280 H150"/>

  <!-- XIC contact: T1.DN -->
  <path d="M150 258 V302
           M180 258 V302"/>

  <!-- Wire to OTE -->
  <path d="M180 280 H490"/>

  <!-- Output coil -->
  <path d="M510 257 Q490 280 510 303
           M550 257 Q570 280 550 303"/>

  <!-- Coil connections -->
  <path d="M490 280 H500
           M560 280 H675"/>

</g>

<!-- Timer done contact label -->
<text x="145" y="245"
      class="plc-ladder-text">
  T1.DN
</text>

<!-- Output coil label -->
<text x="475" y="245"
      class="plc-ladder-text">
  DELAY_OUTPUT
</text>
         
      </svg>
    </div>

    <div style="display:flex;gap:20px;flex-wrap:wrap;margin:12px 0;">
      <strong>EN: <span id="plcTonEN">0</span></strong>
      <strong>TT: <span id="plcTonTT">0</span></strong>
      <strong>DN: <span id="plcTonDN">0</span></strong>
    </div>

    <p><strong>PRE:</strong> <span id="plcTonPRE">5000</span> ms</p>
    <p><strong>ACC:</strong> <span id="plcTonACC">0</span> ms</p>

    <div style="height:16px;background:#334155;border-radius:10px;overflow:hidden;">
      <div id="plcTonBar"
           style="height:100%;width:0%;background:#4ade80;">
      </div>
    </div>

    <p id="plcTonMessage">Timer is waiting for an enable signal.</p>

    <p style="font-size:12px;opacity:0.75;">
      Non-retentive TON training simulator.
      Removing enable resets ACC, EN, TT, and DN.
    </p>

  </div>
</details>

  `;
}

function plcTonStart() {
  if (plcTonEnabled) return;

  const input = document.getElementById("plcTonPreset");
  if (!input) return;

  const preset = Number(input.value);

  if (!Number.isInteger(preset) ||
      preset < 100 || preset > 60000) {
    document.getElementById("plcTonMessage").textContent =
      "Enter a preset between 100 and 60000 ms.";
    return;
  }

  plcTonPRE = preset;
  plcTonACC = 0;
  plcTonEnabled = true;
  plcTonStartTime = performance.now();

  input.disabled = true;
  plcTonRender();

  plcTonTimerId = setInterval(() => {
    // Stop updating if the PLC page is gone.
    if (!document.getElementById("plcTonACC")) {
      clearInterval(plcTonTimerId);
      plcTonTimerId = null;
      plcTonEnabled = false;
      return;
    }

    plcTonACC = Math.min(
      plcTonPRE,
      Math.floor(performance.now() - plcTonStartTime)
    );

    plcTonRender();

    if (plcTonACC >= plcTonPRE) {
      clearInterval(plcTonTimerId);
      plcTonTimerId = null;
    }
  }, 50);
}

function plcTonReset() {
  if (plcTonTimerId !== null) {
    clearInterval(plcTonTimerId);
    plcTonTimerId = null;
  }

  plcTonEnabled = false;
  plcTonACC = 0;

  const input = document.getElementById("plcTonPreset");
  if (input) input.disabled = false;

  plcTonRender();
}

function plcTonRender() {
  const accDisplay = document.getElementById("plcTonACC");
  if (!accDisplay) return;

  const done = plcTonEnabled && plcTonACC >= plcTonPRE;
  const timing = plcTonEnabled && !done;

  accDisplay.textContent = plcTonACC;
  document.getElementById("plcTonPRE").textContent = plcTonPRE;

  const bits = {
    plcTonEN: plcTonEnabled,
    plcTonTT: timing,
    plcTonDN: done
  };

  for (const [id, active] of Object.entries(bits)) {
    const element = document.getElementById(id);
    element.textContent = active ? "1" : "0";
    element.style.color = active ? "#4ade80" : "#94a3b8";
  }

  const percent = (plcTonACC / plcTonPRE) * 100;
  document.getElementById("plcTonBar").style.width =
    percent + "%";

  document.getElementById("plcTonRung")
    .classList.toggle("plc-ladder-active", plcTonEnabled);

  document.getElementById("plcTonBlock")
    .classList.toggle("plc-ladder-active", plcTonEnabled);

    // Energize the done indication only when DN = 1
  document.getElementById("plcTonDonePath")
    .classList.toggle("plc-ladder-active", done);
  
  document.getElementById("plcTonDnLamp")
    .setAttribute("fill", done ? "#4ade80" : "#64748b");
  
  
// =====================================
// RUNG 2 - T1.DN CONTROLS OUTPUT OTE
// =====================================

const outputRung =
  document.getElementById("plcTonOutputRung");

if (outputRung) {
  outputRung.classList.toggle(
    "plc-ladder-active",
    done
  );
}


  document.getElementById("plcTonMessage").textContent =
    done
      ? "Timer DONE. DN = 1. Enable is still active."
      : timing
      ? "Timer timing. ACC increasing toward PRE."
      : "Timer reset. Waiting for enable.";
}


let plcTofTimerId = null;
let plcTofEnabled = false;
let plcTofTiming = false;
let plcTofDone = false;
let plcTofACC = 0;
let plcTofPRE = 5000;
let plcTofOffStart = 0;

function plcTofSimulatorHTML() {
  // Reset when the PLC page is rebuilt.
  if (plcTofTimerId !== null) {
    clearInterval(plcTofTimerId);
    plcTofTimerId = null;
  }

  plcTofEnabled = false;
  plcTofTiming = false;
  plcTofDone = false;
  plcTofACC = 0;
  plcTofPRE = 5000;

  return `
    <details class="plc-timer-dropdown">
      <summary>TOF — Timer Off Delay</summary>
      <div class="plc-timer-content">

        <h3>TOF — Timer Off Delay</h3>
        <p>
          Enable turns DN on immediately.
          Disable starts timing. DN stays on
          until ACC reaches PRE.
        </p>

        <label for="plcTofPreset">
          Timer Preset (ms)
        </label>

        <input
          id="plcTofPreset"
          type="number"
          value="5000"
          min="100"
          max="60000"
          step="100"
          style="width:100%;padding:12px;margin:8px 0 15px;
                 color:#0f172a;background:#fff;"
        >

        <div style="display:flex;gap:10px;
                    flex-wrap:wrap;margin-bottom:15px;">

          <button type="button" class="action"
            onclick="plcTofEnable()">
            ▶ ENABLE
          </button>

          <button type="button" class="action"
            onclick="plcTofDisable()">
            ■ STOP
          </button>

          <button type="button" class="action"
            onclick="plcTofReset()">
            ↺ RESET
          </button>
        </div>

        <div style="background:#1e293b;padding:15px;
                    border:1px solid #475569;
                    border-radius:12px;overflow-x:auto;">

          <h4>Live TOF Ladder Logic</h4>

          <svg viewBox="0 0 600 245"
               style="width:100%;min-width:530px;">

            <!-- Power rails -->
            <path d="M20 15 V230 M580 15 V230"
              stroke="#e2e8f0"
              stroke-width="4" fill="none"/>

            <!-- Rung 1: TOF input -->
            <g id="plcTofInputRung"
               stroke="#64748b"
               stroke-width="4" fill="none">

              <path d="M20 76 H115"/>
              <path d="M115 58 V94"/>
              <path d="M135 58 V94"/>
              <path d="M135 76 H220"/>

              <rect x="220" y="35"
                    width="230" height="85"
                    rx="8" stroke-width="3"/>

              <path d="M450 76 H580"/>
            </g>

            <g fill="#f8fafc" font-size="13">
              <text x="93" y="47">ENABLE</text>
              <text x="236" y="57" font-weight="bold">
                TOF — T2
              </text>
              <text x="236" y="78">PRE</text>
              <text x="236" y="96">ACC</text>
              <text x="370" y="98">DN</text>
            </g>

            <circle id="plcTofDnLamp"
              cx="425" cy="95" r="8"
              fill="#64748b"/>

            <!-- Rung 2: DN-controlled output -->
            <g id="plcTofOutputRung"
               stroke="#64748b"
               stroke-width="4" fill="none">

              <path d="M20 188 H140"/>
              <path d="M140 170 V206"/>
              <path d="M160 170 V206"/>
              <path d="M160 188 H462"/>

              <path d="M478 169 Q456 188 478 207"/>
              <path d="M498 169 Q520 188 498 207"/>

              <path d="M514 188 H580"/>
            </g>

            <g fill="#f8fafc" font-size="13"
               text-anchor="middle">
              <text x="150" y="160">T2.DN</text>
              <text x="488" y="157">DELAY_OUTPUT</text>
              <text x="150" y="225">Rung 2</text>
            </g>
          </svg>
        </div>

        <div style="margin-top:15px;">
          <strong>
            EN: <span id="plcTofEN">0</span>
            &nbsp; TT: <span id="plcTofTT">0</span>
            &nbsp; DN: <span id="plcTofDN">0</span>
          </strong>

          <p>PRE: <span id="plcTofPRE">5000</span> ms</p>
          <p>ACC: <span id="plcTofACC">0</span> ms</p>

          <div style="height:16px;background:#334155;
                      border-radius:10px;overflow:hidden;">
            <div id="plcTofBar"
              style="height:100%;width:0%;
                     background:#4ade80;">
            </div>
          </div>

          <p id="plcTofMessage">
            Timer waiting for enable.
          </p>
        </div>

      </div>
    </details>
  `;
}

// ENABLE: DN energizes immediately.
function plcTofEnable() {
  const input = document.getElementById("plcTofPreset");
  if (!input) return;

  const preset = Number(input.value);

  if (!Number.isInteger(preset) ||
      preset < 100 || preset > 60000) {
    document.getElementById("plcTofMessage").textContent =
      "Enter a preset between 100 and 60000 ms.";
    return;
  }

  if (plcTofTimerId !== null) {
    clearInterval(plcTofTimerId);
    plcTofTimerId = null;
  }

  plcTofPRE = preset;
  plcTofEnabled = true;
  plcTofTiming = false;
  plcTofDone = true;
  plcTofACC = 0;

  input.disabled = true;
  plcTofRender();
}

// STOP: Start the off-delay timer.
function plcTofDisable() {
  if (!plcTofEnabled) return;

  plcTofEnabled = false;
  plcTofTiming = true;
  plcTofDone = true;
  plcTofACC = 0;
  plcTofOffStart = performance.now();

  plcTofRender();

  plcTofTimerId = setInterval(() => {
    plcTofACC = Math.min(
      plcTofPRE,
      Math.floor(performance.now() - plcTofOffStart)
    );

    if (plcTofACC >= plcTofPRE) {
      plcTofACC = plcTofPRE;
      plcTofTiming = false;
      plcTofDone = false;

      clearInterval(plcTofTimerId);
      plcTofTimerId = null;
    }

    plcTofRender();
  }, 50);
}

// RESET: Return simulator to its initial state.
function plcTofReset() {
  if (plcTofTimerId !== null) {
    clearInterval(plcTofTimerId);
    plcTofTimerId = null;
  }

  plcTofEnabled = false;
  plcTofTiming = false;
  plcTofDone = false;
  plcTofACC = 0;

  const input = document.getElementById("plcTofPreset");
  if (input) {
    input.disabled = false;
    input.value = "5000";
  }

  plcTofPRE = 5000;
  plcTofRender();
}

// Update all timer indicators and ladder graphics.
function plcTofRender() {
  const en = document.getElementById("plcTofEN");
  if (!en) return;

  const tt = document.getElementById("plcTofTT");
  const dn = document.getElementById("plcTofDN");

  en.textContent = plcTofEnabled ? "1" : "0";
  tt.textContent = plcTofTiming ? "1" : "0";
  dn.textContent = plcTofDone ? "1" : "0";

  document.getElementById("plcTofPRE").textContent =
    plcTofPRE;

  document.getElementById("plcTofACC").textContent =
    plcTofACC;

  const percent = Math.min(
    100, (plcTofACC / plcTofPRE) * 100
  );

  document.getElementById("plcTofBar").style.width =
    percent + "%";

  // Rung 1 follows the physical enable input.
  document.getElementById("plcTofInputRung")
    .setAttribute("stroke",
      plcTofEnabled ? "#4ade80" : "#64748b");

  // Rung 2 follows the timer DN bit.
  document.getElementById("plcTofOutputRung")
    .setAttribute("stroke",
      plcTofDone ? "#4ade80" : "#64748b");

  document.getElementById("plcTofDnLamp")
    .setAttribute("fill",
      plcTofDone ? "#4ade80" : "#64748b");

  const message =
    document.getElementById("plcTofMessage");

  if (plcTofEnabled) {
    message.textContent =
      "Input ON. DN = 1. Output energized.";
  } else if (plcTofTiming) {
    message.textContent =
      "Input OFF. Off-delay timing. Output remains ON.";
  } else if (plcTofACC >= plcTofPRE) {
    message.textContent =
      "Timer DONE timing. DN = 0. Output OFF.";
  } else {
    message.textContent =
      "Timer reset. Waiting for enable.";
  }
}


/* =====================================
   RTO — RETENTIVE TIMER SIMULATOR
===================================== */

let plcRtoTimerId = null;
let plcRtoEnabled = false;
let plcRtoACC = 0;
let plcRtoPRE = 5000;
let plcRtoStartTime = 0;
let plcRtoStartACC = 0;

function plcRtoSimulatorHTML() {
  if (plcRtoTimerId !== null) {
    clearInterval(plcRtoTimerId);
    plcRtoTimerId = null;
  }

  plcRtoEnabled = false;
  plcRtoACC = 0;
  plcRtoPRE = 5000;

  return `
    <details class="plc-timer-dropdown">
      <summary>RTO — Retentive Timer</summary>

      <div class="plc-timer-content">
        <h3>RTO — Retentive Timer</h3>
        <p>
          ENABLE starts accumulating time.
          STOP pauses the timer and retains ACC.
          RESET clears the accumulated time and DN bit.
        </p>

        <label for="plcRtoPreset">
          Timer Preset (ms)
        </label>

        <input
          id="plcRtoPreset"
          type="number"
          value="5000"
          min="100"
          max="60000"
          step="100"
          style="width:100%;padding:12px;
                 margin:8px 0 15px;
                 color:#0f172a;background:#fff;"
        >

        <div style="display:flex;gap:10px;
                    flex-wrap:wrap;margin-bottom:15px;">

          <button type="button" class="action"
            style="flex:1;min-width:120px;"
            onclick="plcRtoEnable()">
            ▶ ENABLE
          </button>

          <button type="button" class="action"
            style="flex:1;min-width:120px;"
            onclick="plcRtoStop()">
            ■ STOP
          </button>

          <button type="button" class="action"
            style="flex:1;min-width:120px;"
            onclick="plcRtoReset()">
            ↺ RESET
          </button>
        </div>

        <div style="background:#1e293b;padding:15px;
                    border:1px solid #475569;
                    border-radius:12px;overflow-x:auto;">

          <h4>Live RTO Ladder Logic</h4>

          <svg viewBox="0 0 680 270"
               style="width:100%;min-width:540px;">

            <!-- Power rails -->
            <g stroke="#e2e8f0" stroke-width="4">
              <line x1="20" y1="15" x2="20" y2="250"/>
              <line x1="660" y1="15" x2="660" y2="250"/>
            </g>

            <!-- Rung 1: RTO -->
            <g id="plcRtoTop"
               stroke="#64748b"
               stroke-width="3"
               fill="none">

              <path d="M20 85 H110"/>
              <path d="M110 65 V105"/>
              <path d="M135 65 V105"/>
              <path d="M135 85 H220"/>

              <rect x="220" y="38"
                    width="260" height="100"
                    rx="8"/>

              <path d="M480 85 H660"/>
            </g>

            <g fill="#ffffff" font-size="15"
               font-weight="bold">
              <text x="96" y="51">ENABLE</text>
              <text x="237" y="61">RTO — T3</text>
              <text id="plcRtoSvgPRE"
                    x="237" y="84">PRE: 5000</text>
              <text id="plcRtoSvgACC"
                    x="237" y="106">ACC: 0</text>
              <text x="237" y="127">DN</text>
            </g>

            <circle id="plcRtoDnLamp"
                    cx="454" cy="119" r="9"
                    fill="#64748b"/>

            <!-- Rung 2: DN output -->
            <g id="plcRtoBottom"
               stroke="#64748b"
               stroke-width="3"
               fill="none">

              <path d="M20 210 H130"/>
              <path d="M130 190 V230"/>
              <path d="M155 190 V230"/>
              <path d="M155 210 H543"/>

              <path d="M560 185 Q540 210 560 235"/>
              <path d="M580 185 Q600 210 580 235"/>

              <path d="M595 210 H660"/>
            </g>

            <g fill="#ffffff"
               font-size="15" font-weight="bold">
              <text x="117" y="177">T3.DN</text>
              <text x="500" y="171">DELAY_OUTPUT</text>
              <text x="35" y="260"
                    font-size="12">Rung 2 — Retained Done Output</text>
            </g>
          </svg>
        </div>

        <div style="margin-top:15px;">

          <p>
            EN: <strong id="plcRtoEN">0</strong>
            &nbsp; TT: <strong id="plcRtoTT">0</strong>
            &nbsp; DN: <strong id="plcRtoDN">0</strong>
          </p>

          <p>PRE: <span id="plcRtoPRE">5000</span> ms</p>
          <p>ACC: <span id="plcRtoACC">0</span> ms</p>

          <div style="height:16px;
                      background:#334155;
                      border-radius:10px;
                      overflow:hidden;">

            <div id="plcRtoBar"
                 style="height:100%;width:0%;
                        background:#4ade80;">
            </div>
          </div>

          <p id="plcRtoMessage">
            Timer waiting for ENABLE.
          </p>

          <p style="font-size:12px;opacity:0.75;">
            Retentive timer training simulator.
            STOP retains ACC and DN.
            RESET simulates a RES instruction.
          </p>
        </div>
      </div>
    </details>
  `;
}

/* START / RESUME RTO */

function plcRtoEnable() {
  if (plcRtoEnabled) return;

  const input =
    document.getElementById("plcRtoPreset");

  if (!input) return;

  const preset = Number(input.value);

  if (!Number.isInteger(preset) ||
      preset < 100 || preset > 60000) {
    document.getElementById("plcRtoMessage")
      .textContent =
      "Enter a preset between 100 and 60000 ms.";
    return;
  }

  plcRtoPRE = preset;
  plcRtoEnabled = true;

  plcRtoStartACC = plcRtoACC;
  plcRtoStartTime = performance.now();

  plcRtoRender();

  if (plcRtoACC >= plcRtoPRE) return;

  plcRtoTimerId = setInterval(plcRtoTick, 50);
}

/* UPDATE ACCUMULATOR */

function plcRtoTick() {
  if (!plcRtoEnabled) return;

  const elapsed =
    performance.now() - plcRtoStartTime;

  plcRtoACC = Math.min(
    plcRtoPRE,
    plcRtoStartACC + Math.floor(elapsed)
  );

  if (plcRtoACC >= plcRtoPRE) {
    clearInterval(plcRtoTimerId);
    plcRtoTimerId = null;
  }

  plcRtoRender();
}

/* STOP — RETAIN ACC */

function plcRtoStop() {
  if (plcRtoEnabled) {
    plcRtoTick();
  }

  plcRtoEnabled = false;

  if (plcRtoTimerId !== null) {
    clearInterval(plcRtoTimerId);
    plcRtoTimerId = null;
  }

  plcRtoRender();
}

/* RESET — SIMULATED RES */

function plcRtoReset() {
  if (plcRtoTimerId !== null) {
    clearInterval(plcRtoTimerId);
    plcRtoTimerId = null;
  }

  plcRtoEnabled = false;
  plcRtoACC = 0;
  plcRtoStartACC = 0;

  plcRtoRender();
}

/* RENDER RTO LADDER AND STATUS */

function plcRtoRender() {
  const display =
    document.getElementById("plcRtoACC");

  if (!display) return;

  const done = plcRtoACC >= plcRtoPRE;
  const timing = plcRtoEnabled && !done;

  display.textContent = plcRtoACC;

  document.getElementById("plcRtoPRE")
    .textContent = plcRtoPRE;

  const bits = {
    plcRtoEN: plcRtoEnabled,
    plcRtoTT: timing,
    plcRtoDN: done
  };

  for (const [id, active] of Object.entries(bits)) {
    const element = document.getElementById(id);
    element.textContent = active ? "1" : "0";
    element.style.color =
      active ? "#4ade80" : "#94a3b8";
  }

  const percent = Math.min(
    100, (plcRtoACC / plcRtoPRE) * 100
  );

  document.getElementById("plcRtoBar")
    .style.width = percent + "%";

  document.getElementById("plcRtoSvgPRE")
    .textContent = "PRE: " + plcRtoPRE;

  document.getElementById("plcRtoSvgACC")
    .textContent = "ACC: " + plcRtoACC;

  document.getElementById("plcRtoTop")
    .setAttribute(
      "stroke",
      plcRtoEnabled ? "#4ade80" : "#64748b"
    );

  document.getElementById("plcRtoBottom")
    .setAttribute(
      "stroke",
      done ? "#4ade80" : "#64748b"
    );

  document.getElementById("plcRtoDnLamp")
    .setAttribute(
      "fill",
      done ? "#4ade80" : "#64748b"
    );

  document.getElementById("plcRtoPreset")
    .disabled = plcRtoEnabled;

  let message;

  if (done) {
    message =
      "Timer DONE. DN = 1. Output remains ON until RESET.";
  } else if (timing) {
    message =
      "Timer timing. ACC increasing toward PRE.";
  } else if (plcRtoACC > 0) {
    message =
      "Timer paused. ACC retained at " +
      plcRtoACC + " ms.";
  } else {
    message =
      "Timer reset. Waiting for ENABLE.";
  }

  document.getElementById("plcRtoMessage")
    .textContent = message;
}


/* CTU — Count Up */
let plcCtuInput = false;
let plcCtuACC = 0;
let plcCtuPRE = 5;

function plcCtuSimulatorHTML() {
  // New PLC page = fresh training session.
  plcCtuInput = false;
  plcCtuACC = 0;
  plcCtuPRE = 5;

  return `
    <details class="plc-timer-dropdown">
      <summary>CTU — Count Up</summary>
      <div class="plc-timer-content">
        <h3>CTU — Count Up</h3>
        <p>Turn INPUT ON to count one rising edge.
           Turn it OFF before the next count.
           RESET clears ACC and DN.</p>

        <label for="plcCtuPreset">Counter Preset (counts)</label>
        <input id="plcCtuPreset" type="number"
               value="5" min="1" max="1000" step="1"
               onchange="plcCtuSetPreset()"
               style="width:100%;padding:12px;margin:8px 0 15px;
                      color:#0f172a;background:#fff;">

        <div style="display:flex;gap:10px;flex-wrap:wrap;
                    margin-bottom:15px;">
          <button type="button" class="action"
                  style="flex:1;min-width:120px;"
                  onclick="plcCtuInputOn()">▶ INPUT ON</button>
          <button type="button" class="action"
                  style="flex:1;min-width:120px;"
                  onclick="plcCtuInputOff()">■ INPUT OFF</button>
          <button type="button" class="action"
                  style="flex:1;min-width:120px;"
                  onclick="plcCtuReset()">↺ RESET</button>
        </div>

        <div style="background:#1e293b;padding:15px;
                    border:1px solid #475569;border-radius:12px;
                    overflow-x:auto;">
          <h4>Live CTU Ladder Logic</h4>
          <svg viewBox="0 0 680 270"
               style="display:block;width:100%;min-width:540px;"
               role="img" aria-label="Two-rung CTU ladder diagram">
            <g stroke="#e2e8f0" stroke-width="4">
              <path d="M20 15 V250 M660 15 V250"/>
            </g>

            <!-- Rung 1 — input contact to CTU -->
            <g id="plcCtuRung1" stroke="#64748b"
               stroke-width="3" fill="none">
              <path d="M20 88 H110 M110 66 V110
                       M135 66 V110 M135 88 H220"/>
              <rect x="220" y="38" width="270" height="108" rx="8"/>
              <path d="M490 88 H660"/>
            </g>
            <g fill="#fff" font-size="15" font-weight="bold">
              <text x="83" y="52">INPUT</text>
              <text x="239" y="61">CTU — C1</text>
              <text id="plcCtuSvgPRE" x="239" y="87">PRE: 5</text>
              <text id="plcCtuSvgACC" x="239" y="113">ACC: 0</text>
              <text x="404" y="89">CU</text>
              <text x="404" y="129">DN</text>
            </g>
            <circle id="plcCtuCuLamp" cx="466" cy="84" r="9"
                    fill="#64748b"/>
            <circle id="plcCtuDnLamp" cx="466" cy="125" r="9"
                    fill="#64748b"/>

            <!-- Rung 2 — C1.DN drives output -->
            <g id="plcCtuRung2" stroke="#64748b"
               stroke-width="3" fill="none">
              <path d="M20 210 H130 M130 190 V230
                       M155 190 V230 M155 210 H532
                       M550 187 Q530 210 550 233
                       M576 187 Q596 210 576 233
                       M594 210 H660"/>
            </g>
            <g fill="#fff" font-size="14" font-weight="bold">
              <text x="117" y="177">C1.DN</text>
              <text x="500" y="169">COUNT_DONE</text>
              <text x="33" y="260" font-size="12">Rung 2 — Done Output</text>
            </g>
          </svg>
        </div>

        <div style="margin-top:15px;">
          <p>CU: <strong id="plcCtuCU">0</strong>
             &nbsp; DN: <strong id="plcCtuDN">0</strong></p>
          <p>PRE: <span id="plcCtuPRE">5</span> counts</p>
          <p>ACC: <span id="plcCtuACC">0</span> counts</p>
          <div style="height:16px;background:#334155;
                      border-radius:10px;overflow:hidden;">
            <div id="plcCtuBar"
                 style="height:100%;width:0%;background:#4ade80;">
            </div>
          </div>
          <p id="plcCtuMessage">Input OFF. Waiting for a rising edge.</p>
          <p style="font-size:12px;opacity:0.75;">
            Each new OFF-to-ON transition adds one count.
            Holding INPUT ON does not add more counts.
          </p>
        </div>
      </div>
    </details>
  `;
}

function plcCtuSetPreset() {
  const field = document.getElementById("plcCtuPreset");
  if (!field) return false;
  const value = Number(field.value);
  if (!Number.isInteger(value) || value < 1 || value > 1000) {
    document.getElementById("plcCtuMessage").textContent =
      "Enter a whole-number preset from 1 to 1000.";
    return false;
  }
  plcCtuPRE = value;
  plcCtuRender();
  return true;
}

function plcCtuInputOn() {
  if (!plcCtuSetPreset()) return;
  if (plcCtuInput) return; // No new count while held ON.
  plcCtuInput = true;
  plcCtuACC += 1;
  plcCtuRender();
}

function plcCtuInputOff() {
  plcCtuInput = false;
  plcCtuRender();
}

function plcCtuReset() {
  plcCtuInput = false;
  plcCtuACC = 0;
  plcCtuRender();
}

function plcCtuRender() {
  if (!document.getElementById("plcCtuACC")) return;
  const done = plcCtuACC >= plcCtuPRE;
  const color = on => on ? "#4ade80" : "#64748b";

  document.getElementById("plcCtuCU").textContent = plcCtuInput ? "1" : "0";
  document.getElementById("plcCtuDN").textContent = done ? "1" : "0";
  document.getElementById("plcCtuPRE").textContent = plcCtuPRE;
  document.getElementById("plcCtuACC").textContent = plcCtuACC;
  document.getElementById("plcCtuSvgPRE").textContent = "PRE: " + plcCtuPRE;
  document.getElementById("plcCtuSvgACC").textContent = "ACC: " + plcCtuACC;

  document.getElementById("plcCtuRung1")
    .setAttribute("stroke", color(plcCtuInput));
  document.getElementById("plcCtuRung2")
    .setAttribute("stroke", color(done));
  document.getElementById("plcCtuCuLamp")
    .setAttribute("fill", color(plcCtuInput));
  document.getElementById("plcCtuDnLamp")
    .setAttribute("fill", color(done));

  document.getElementById("plcCtuBar").style.width =
    Math.min(100, (plcCtuACC / plcCtuPRE) * 100) + "%";

  document.getElementById("plcCtuMessage").textContent = done
    ? "COUNT DONE: DN = 1. Output ON; RESET to clear."
    : plcCtuInput
      ? "Input ON: counted once. Turn INPUT OFF before the next pulse."
      : "Input OFF: counter retains ACC; ready for next pulse.";
}


/* =====================================
   CTD — COUNT DOWN SIMULATOR
===================================== */

let plcCtdInput = false;
let plcCtdLoaded = false;
let plcCtdACC = 0;
let plcCtdPRE = 5;

function plcCtdSimulatorHTML() {
  plcCtdInput = false;
  plcCtdLoaded = false;
  plcCtdACC = 0;
  plcCtdPRE = 5;

  return `
    <details class="plc-timer-dropdown">
      <summary>CTD — Count Down</summary>
      <div class="plc-timer-content">

        <h3>CTD — Count Down</h3>
        <p>
          LOAD PRESET initializes the count.
          Each new INPUT pulse subtracts one.
          RESET clears the counter.
        </p>

        <label for="plcCtdPreset">
          Counter Preset (counts)
        </label>

        <input id="plcCtdPreset" type="number"
          value="5" min="1" max="1000" step="1"
          style="width:100%;padding:12px;
                 margin:8px 0 15px;
                 background:#fff;color:#0f172a;">

        <div style="display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;margin-bottom:15px;">

          <button type="button" class="action"
            onclick="plcCtdLoad()">
            ↧ LOAD PRESET
          </button>

          <button type="button" class="action"
            onclick="plcCtdReset()">
            ↺ RESET
          </button>

          <button type="button" class="action"
            onclick="plcCtdInputOn()">
            ▶ INPUT ON
          </button>

          <button type="button" class="action"
            onclick="plcCtdInputOff()">
            ■ INPUT OFF
          </button>
        </div>

        <div style="background:#1e293b;
                    padding:15px;
                    border:1px solid #475569;
                    border-radius:12px;
                    overflow-x:auto;">

          <h4>Live CTD Ladder Logic</h4>

          <svg viewBox="0 0 680 280"
               style="display:block;
                      width:100%;min-width:540px;"
               role="img"
               aria-label="CTD counter ladder diagram">

            <!-- Power rails -->
            <g stroke="#e2e8f0" stroke-width="4">
              <path d="M20 15 V265 M660 15 V265"/>
            </g>

            <!-- Rung 1: CTD instruction -->
            <g id="plcCtdRung1"
               stroke="#64748b"
               stroke-width="3" fill="none">

              <path d="M20 85 H110
                       M110 65 V105
                       M135 65 V105
                       M135 85 H220"/>

              <rect x="220" y="35"
                    width="270" height="112" rx="8"/>

              <path d="M490 85 H660"/>
            </g>

            <g fill="#fff" font-size="15"
               font-weight="bold">

              <text x="85" y="50">INPUT</text>
              <text x="239" y="59">CTD — C2</text>

              <text id="plcCtdSvgPRE"
                    x="239" y="86">PRE: 5</text>

              <text id="plcCtdSvgACC"
                    x="239" y="113">ACC: 0</text>

              <text x="404" y="88">CD</text>
              <text x="404" y="130">DN</text>
            </g>

            <circle id="plcCtdCdLamp"
                    cx="467" cy="83" r="9"
                    fill="#64748b"/>

            <circle id="plcCtdDnLamp"
                    cx="467" cy="125" r="9"
                    fill="#64748b"/>

            <!-- Rung 2: Armed AND ACC = 0 -->
            <g id="plcCtdRung2"
               stroke="#64748b"
               stroke-width="3" fill="none">

              <path d="M20 212 H91
                       M91 192 V232
                       M116 192 V232
                       M116 212 H220"/>

              <rect x="220" y="186"
                    width="194" height="52" rx="6"/>

              <path d="M414 212 H531"/>

              <path d="M549 188
                       Q529 212 549 236"/>

              <path d="M577 188
                       Q597 212 577 236"/>

              <path d="M595 212 H660"/>
            </g>

            <g fill="#fff" font-size="14"
               font-weight="bold">

              <text x="78" y="177">ARMED</text>
              <text x="242" y="206">EQU</text>
              <text x="242" y="226">C2.ACC = 0</text>

              <text x="487" y="174">COUNT_ZERO</text>
              <text x="35" y="269" font-size="12">
                Rung 2 — Zero Count Output
              </text>
            </g>
          </svg>
        </div>

        <div style="margin-top:15px;">

          <p>
            CD: <strong id="plcCtdCD">0</strong>
            &nbsp; DN:
            <strong id="plcCtdDN">0</strong>
          </p>

          <p>PRE:
            <span id="plcCtdPRE">5</span> counts
          </p>

          <p>ACC:
            <span id="plcCtdACC">0</span> counts
          </p>

          <p>ZERO OUTPUT:
            <strong id="plcCtdZero">OFF</strong>
          </p>

          <div style="height:16px;background:#334155;
                      border-radius:10px;overflow:hidden;">

            <div id="plcCtdBar"
                 style="height:100%;width:0%;
                        background:#4ade80;">
            </div>
          </div>

          <p id="plcCtdMessage">
            Load the preset to begin counting.
          </p>

          <p style="font-size:12px;opacity:0.75;">
            Each OFF-to-ON transition subtracts one.
            The EQU comparison detects zero.
            Counting can continue below zero.
          </p>

        </div>
      </div>
    </details>
  `;
}

/* LOAD PRESET — SIMULATED MOV */

function plcCtdLoad() {
  const field =
    document.getElementById("plcCtdPreset");

  if (!field) return;

  const preset = Number(field.value);

  if (!Number.isInteger(preset) ||
      preset < 1 || preset > 1000) {
    document.getElementById("plcCtdMessage")
      .textContent =
      "Enter a whole-number preset from 1 to 1000.";
    return;
  }

  plcCtdPRE = preset;
  plcCtdACC = preset;
  plcCtdInput = false;
  plcCtdLoaded = true;

  plcCtdRender();
}

/* INPUT ON — COUNT FALLING VALUE */

function plcCtdInputOn() {
  if (!plcCtdLoaded) {
    document.getElementById("plcCtdMessage")
      .textContent = "Press LOAD PRESET first.";
    return;
  }

  // Do not count repeatedly while held ON.
  if (plcCtdInput) return;

  plcCtdInput = true;
  plcCtdACC -= 1;

  plcCtdRender();
}

/* INPUT OFF — REARM NEXT PULSE */

function plcCtdInputOff() {
  plcCtdInput = false;
  plcCtdRender();
}

/* RESET — SIMULATED RES */

function plcCtdReset() {
  plcCtdInput = false;
  plcCtdLoaded = false;
  plcCtdACC = 0;

  plcCtdRender();
}

/* RENDER COUNTER AND LADDER */

function plcCtdRender() {
  const accDisplay =
    document.getElementById("plcCtdACC");

  if (!accDisplay) return;

  // Rockwell CTD: DN when ACC >= PRE.
  const done = plcCtdACC >= plcCtdPRE;

  // Separate zero-count logic, with armed bit.
  const zero =
    plcCtdLoaded && plcCtdACC === 0;

  const color = active =>
    active ? "#4ade80" : "#64748b";

  document.getElementById("plcCtdCD")
    .textContent = plcCtdInput ? "1" : "0";

  document.getElementById("plcCtdDN")
    .textContent = done ? "1" : "0";

  document.getElementById("plcCtdPRE")
    .textContent = plcCtdPRE;

  accDisplay.textContent = plcCtdACC;

  document.getElementById("plcCtdZero")
    .textContent = zero ? "ON" : "OFF";

  document.getElementById("plcCtdSvgPRE")
    .textContent = "PRE: " + plcCtdPRE;

  document.getElementById("plcCtdSvgACC")
    .textContent = "ACC: " + plcCtdACC;

  document.getElementById("plcCtdRung1")
    .setAttribute("stroke", color(plcCtdInput));

  document.getElementById("plcCtdRung2")
    .setAttribute("stroke", color(zero));

  document.getElementById("plcCtdCdLamp")
    .setAttribute("fill", color(plcCtdInput));

  document.getElementById("plcCtdDnLamp")
    .setAttribute("fill", color(done));

  const progress = plcCtdLoaded
    ? Math.max(0, Math.min(100,
        ((plcCtdPRE - plcCtdACC) /
          plcCtdPRE) * 100))
    : 0;

  document.getElementById("plcCtdBar")
    .style.width = progress + "%";

  document.getElementById("plcCtdPreset")
    .disabled = plcCtdLoaded;

  let message;

  if (!plcCtdLoaded) {
    message = "Load the preset to begin counting.";
  } else if (zero) {
    message = "COUNT ZERO! Output energized.";
  } else if (plcCtdACC < 0) {
    message = "Count below zero. Output OFF.";
  } else if (plcCtdInput) {
    message = "Count decreased. Release input for next pulse.";
  } else {
    message = "Counter holding ACC: " +
              plcCtdACC + " counts.";
  }

  document.getElementById("plcCtdMessage")
    .textContent = message;
}


/* ==========================================
   INTERACTIVE PLC LADDER LOGIC BUILDER
   VERSION 1 — XIC, XIO, OTE
========================================== */

let plcBuilderContacts = [
 { id: 0, type: "XIC", value: false, tag: "I0" } 
];

let plcBuilderNextId = 1;

function plcLadderBuilderHTML() {
  plcBuilderContacts = [
    { id: 0, type: "XIC", value: false }
  ];
  plcBuilderNextId = 1;

  return `
    <details class="calculator"
             ontoggle="if(this.open) plcBuilderRender()">
      <summary>🧩 Interactive Ladder Logic Builder</summary>
      <div class="calculator-body">

        <h3>PLC Ladder Logic Builder</h3>

        <p>
          Add ladder contacts, toggle inputs,
          and watch the circuit energize.
        </p>

        <div style="display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;margin-bottom:15px;">

          <button type="button" class="action"
                  onclick="plcBuilderAdd('XIC')">
            + Add XIC
          </button>

          <button type="button" class="action"
                  onclick="plcBuilderAdd('XIO')">
            + Add XIO
          </button>

          <button type="button" class="action"
                  onclick="plcBuilderRemove()">
            − Remove Last
          </button>

          <button type="button" class="action"
                  onclick="plcBuilderReset()">
            ↺ Reset Rung
          </button>
        </div>

        <h4>Input Controls</h4>
        <div id="plcBuilderInputs"></div>

        <div style="background:#0f172a;
                    border:1px solid #475569;
                    border-radius:12px;
                    padding:15px;
                    margin-top:15px;">

          <h4 style="color:white;">
            Live Ladder Logic
          </h4>

          <div id="plcBuilderDiagram"
               style="overflow-x:auto;">
            Open the builder to load the rung.
          </div>
        </div>

        <p id="plcBuilderStatus">
          Waiting for input.
        </p>

        <p style="font-size:12px;opacity:0.75;">
          Version 1 uses series contacts.
          Parallel branches will be added later.
        </p>

      </div>
    </details>
  `;
}

/* ADD A CONTACT */

function plcBuilderAdd(type) {
  if (plcBuilderContacts.length >= 6) return;
  if (type !== "XIC" && type !== "XIO") return;

  plcBuilderContacts.push({
    id: plcBuilderNextId++,
    type: type,
    value: false
  });

  plcBuilderRender();
}

/* REMOVE LAST CONTACT */

function plcBuilderRemove() {
  if (plcBuilderContacts.length > 1) {
    plcBuilderContacts.pop();
  }

  plcBuilderRender();
}

/* RESET RUNG */

function plcBuilderReset() {
  plcBuilderContacts = [
    { id: 0, type: "XIC", value: false }
  ];

  plcBuilderNextId = 1;
  plcBuilderRender();
}

/* TOGGLE INPUT BIT */

function plcBuilderToggle(id) {
  const contact = plcBuilderContacts.find(
    item => item.id === id
  );

  if (!contact) return;

  contact.value = !contact.value;

  plcBuilderRender();
}

/* EVALUATE AND DRAW THE LADDER */

function plcBuilderRender() {
  const diagram =
    document.getElementById("plcBuilderDiagram");

  const controls =
    document.getElementById("plcBuilderInputs");

  if (!diagram || !controls) return;

  controls.innerHTML = plcBuilderContacts.map(c => `
    <button type="button" class="action"
            onclick="plcBuilderToggle(${c.id})"
            style="margin:5px;padding:12px;
                   background:${c.value ? "#166534" : "#334155"};
                   color:white;">
      I${c.id} (${c.type}): ${c.value ? "ON" : "OFF"}
    </button>
  `).join("");

  const width = Math.max(
    600,
    200 + plcBuilderContacts.length * 115
  );

  const green = "#4ade80";
  const gray = "#64748b";
  const y = 110;

  let powered = true;
  let previousX = 20;
  let drawing = "";

  plcBuilderContacts.forEach((contact, i) => {
    const x = 110 + i * 115;
    const left = x - 12;
    const right = x + 12;

    const condition = contact.type === "XIC"
      ? contact.value
      : !contact.value;

    const nextPowered = powered && condition;

    drawing += `
      <line x1="${previousX}" y1="${y}"
            x2="${left}" y2="${y}"
            stroke="${powered ? green : gray}"
            stroke-width="4"/>

      <g stroke="${nextPowered ? green : gray}"
         stroke-width="4" fill="none">
        <line x1="${left}" y1="88"
              x2="${left}" y2="132"/>
        <line x1="${right}" y1="88"
              x2="${right}" y2="132"/>

        ${contact.type === "XIO"
          ? `<line x1="${left - 5}" y1="137"
                   x2="${right + 5}" y2="83"/>`
          : ""}
      </g>

      <g fill="white" font-size="14"
         text-anchor="middle">
        <text x="${x}" y="72">
          I${contact.id} · ${contact.type}
        </text>
        <text x="${x}" y="155">
          ${contact.value ? "1" : "0"}
        </text>
      </g>
    `;

    powered = nextPowered;
    previousX = right;
  });

  const outputOn = powered;
  const coilX = width - 75;
  const coilColor = outputOn ? green : gray;

  drawing += `
    <line x1="${previousX}" y1="${y}"
          x2="${coilX - 25}" y2="${y}"
          stroke="${coilColor}" stroke-width="4"/>

    <g stroke="${coilColor}"
       stroke-width="4" fill="none">
      <path d="M${coilX - 12} 87
               Q${coilX - 33} 110
               ${coilX - 12} 133"/>

      <path d="M${coilX + 12} 87
               Q${coilX + 33} 110
               ${coilX + 12} 133"/>
    </g>

    <line x1="${coilX + 25}" y1="${y}"
          x2="${width - 20}" y2="${y}"
          stroke="${coilColor}" stroke-width="4"/>

    <text x="${coilX}" y="72"
          fill="white" font-size="14"
          text-anchor="middle">
      Q0 — OTE
    </text>
  `;

  diagram.innerHTML = `
    <svg viewBox="0 0 ${width} 190"
         style="display:block;width:100%;
                min-width:500px;"
         role="img"
         aria-label="Interactive ladder logic rung">

      <g stroke="#e2e8f0" stroke-width="4">
        <line x1="20" y1="15" x2="20" y2="180"/>
        <line x1="${width - 20}" y1="15"
              x2="${width - 20}" y2="180"/>
      </g>

      ${drawing}
    </svg>
  `;

  const status =
    document.getElementById("plcBuilderStatus");

  status.textContent = outputOn
    ? "Q0 OUTPUT ENERGIZED — Rung TRUE"
    : "Q0 OUTPUT OFF — Rung FALSE";

  status.style.color = outputOn
    ? "#16a34a"
    : "";
}
