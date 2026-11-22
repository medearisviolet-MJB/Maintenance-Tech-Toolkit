
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
