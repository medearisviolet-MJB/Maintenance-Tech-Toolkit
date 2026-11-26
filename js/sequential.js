
/* ==========================================
   MAINTENANCE TECH TOOLKIT
   REALISTIC SEQUENTIAL LOGIC TRAINER
   Version 1 — Conveyor + Pneumatic Cylinder

   Training simulation ONLY.
   Never controls physical equipment.
========================================== */

const seqSteps = [
  [0, "IDLE", "Wait for START and healthy permissives"],
  [10, "FEED", "Run conveyor until PE1 detects a part"],
  [20, "STOP", "Wait for motor-stopped feedback"],
  [30, "EXTEND", "Extend cylinder; prove LS_EXT"],
  [40, "PROCESS", "Dwell timer must reach .DN"],
  [50, "RETRACT", "Retract cylinder; prove LS_RET"],
  [60, "DISCHARGE", "Run conveyor until PE1 clears"],
  [900, "FAULT", "Latch alarm; investigate and reset"]
];

const seqFaults = {
  none: "No injected fault",
  peOff: "PE1 fails to detect",
  peOn: "PE1 stuck ON",
  motor: "Motor fails to stop",
  extend: "Cylinder fails to extend",
  retract: "Cylinder fails to retract",
  air: "Low air pressure",
  vfd: "VFD fault",
  guard: "Guard safety circuit opens",
  limits: "Both cylinder limit switches ON"
};

function seqNewState() {
  return {
    step: 0,
    elapsed: 0,
    run: false,
    fault: "none",
    alarm: "",
    pe: false,
    position: "retracted",
    motorFB: false,
    motorDesired: false,
    motorDelay: 0,
    dwellAcc: 0,
    dwellDn: false,
    cycles: 0,
    log: [
      "Trainer ready. Check permissives, then press START."
    ]
  };
}

let seq = seqNewState();
let seqInterval = null;

/* ==========================================
   SEQUENCE CONTROL
========================================== */

function seqMessage(message) {
  seq.log.unshift(message);
  seq.log = seq.log.slice(0, 5);
}

function seqEnter(step) {
  seq.step = step;
  seq.elapsed = 0;
  seq.dwellAcc = 0;
  seq.dwellDn = false;

  const found = seqSteps.find(item => item[0] === step);

  if (found) {
    seqMessage(`STEP ${step}: ${found[1]}`);
  }
}

function seqTrip(code, description) {
  if (seq.step === 900) return;

  seq.alarm = `${code} — ${description}`;
  seq.run = false;
  seqEnter(900);

  seqMessage(`ALARM LATCHED: ${seq.alarm}`);
}

function seqOutputs() {
  const healthy =
    seq.run &&
    seq.step !== 900 &&
    !["air", "vfd", "guard", "limits"].includes(seq.fault);

  return {
    conveyor:
      healthy &&
      (seq.step === 10 || seq.step === 60),

    extend:
      healthy &&
      seq.step === 30 &&
      !seq.motorFB,

    retract:
      healthy &&
      seq.step === 50
  };
}

/* ==========================================
   MOTOR FEEDBACK SIMULATION
========================================== */

function seqUpdateMotor(dt) {
  const desired = seqOutputs().conveyor;

  if (seq.motorDesired !== desired) {
    seq.motorDesired = desired;
    seq.motorDelay = 0;
  }

  if (seq.motorFB === desired) return;

  if (!desired && seq.fault === "motor") return;

  seq.motorDelay += dt;

  if (seq.motorDelay >= 450) {
    seq.motorFB = desired;
  }
}

/* ==========================================
   MAIN AUTOMATIC SEQUENCE
========================================== */

function seqTick() {
  if (!document.getElementById("seqTrainer")) {
    clearInterval(seqInterval);
    seqInterval = null;
    seq = seqNewState();
    return;
  }

  const dt = 100;

  seqUpdateMotor(dt);

  if (seq.step === 0 || seq.step === 900) {
    seqRender();
    return;
  }

  seq.elapsed += dt;

  /* Interlocks take priority */

  if (seq.fault === "guard") {
    seqTrip("ALM-104", "Guard circuit open");
  } else if (seq.fault === "vfd") {
    seqTrip("ALM-105", "VFD fault active");
  } else if (seq.fault === "air") {
    seqTrip("ALM-106", "Low pneumatic pressure");
  } else if (seq.fault === "limits") {
    seqTrip("ALM-107", "Conflicting cylinder limits");
  }

  /* STEP 10 — FEED CONVEYOR */

  if (seq.step === 10) {
    if (
      seq.elapsed >= 1800 &&
      seq.fault !== "peOff"
    ) {
      seq.pe = true;
    }

    if (seq.pe) {
      seqEnter(20);
    } else if (seq.elapsed >= 5000) {
      seqTrip(
        "ALM-100",
        "No product detected within 5 seconds"
      );
    }
  }

  /* STEP 20 — VERIFY MOTOR STOPPED */

  else if (seq.step === 20) {
    if (!seq.motorFB) {
      seqEnter(30);
    } else if (seq.elapsed >= 2000) {
      seqTrip(
        "ALM-103",
        "Motor-stopped feedback not received"
      );
    }
  }

  /* STEP 30 — EXTEND CYLINDER */

  else if (seq.step === 30) {
    if (seq.elapsed >= 200) {
      seq.position = "moving-out";
    }

    if (
      seq.elapsed >= 900 &&
      seq.fault !== "extend"
    ) {
      seq.position = "extended";
      seqEnter(40);
    } else if (seq.elapsed >= 3000) {
      seqTrip(
        "ALM-101",
        "Cylinder extension timeout"
      );
    }
  }

  /* STEP 40 — PROCESS DWELL TIMER */

  else if (seq.step === 40) {
    seq.dwellAcc = Math.min(seq.elapsed, 1500);
    seq.dwellDn = seq.dwellAcc >= 1500;

    if (seq.dwellDn) {
      seqMessage("Dwell_Timer.DN = TRUE");
      seqEnter(50);
    }
  }

  /* STEP 50 — RETRACT CYLINDER */

  else if (seq.step === 50) {
    if (seq.elapsed >= 200) {
      seq.position = "moving-in";
    }

    if (
      seq.elapsed >= 900 &&
      seq.fault !== "retract"
    ) {
      seq.position = "retracted";
      seqEnter(60);
    } else if (seq.elapsed >= 3000) {
      seqTrip(
        "ALM-102",
        "Cylinder retraction timeout"
      );
    }
  }

  /* STEP 60 — DISCHARGE PRODUCT */

  else if (seq.step === 60) {
    if (
      seq.motorFB &&
      seq.elapsed >= 1100 &&
      seq.fault !== "peOn"
    ) {
      seq.pe = false;
    }

    if (seq.motorFB && !seq.pe) {
      seq.cycles++;

      seqMessage(`Completed cycle ${seq.cycles}`);

      seqEnter(10);
    } else if (seq.elapsed >= 4000) {
      seqTrip(
        "ALM-108",
        "PE1 did not clear during discharge"
      );
    }
  }

  seqRender();
}

function seqEnsureTimer() {
  if (seqInterval === null) {
    seqInterval = setInterval(seqTick, 100);
  }
}

/* ==========================================
   OPERATOR CONTROLS
========================================== */

function seqStart() {
  if (seq.step !== 0 || seq.alarm) {
    seqMessage(
      "START rejected: reset faults or stop the current sequence."
    );
  } else if (seq.fault !== "none") {
    seqMessage(
      "START inhibited: an injected fault is present."
    );
  } else if (
    seq.position !== "retracted" ||
    seq.motorFB ||
    seq.pe
  ) {
    seqMessage(
      "START inhibited: home position, motor stopped, and PE1 clear are required."
    );
  } else {
    seq.run = true;
    seqEnter(10);
    seqEnsureTimer();
  }

  seqRender();
}

function seqStop() {
  if (seq.step === 900) {
    seqMessage(
      "STOP acknowledged. Latched fault still requires a safe reset."
    );
  } else {
    seq.run = false;
    seqEnter(0);

    seqMessage(
      "STOP: simulation outputs de-energized."
    );
  }

  seqEnsureTimer();
  seqRender();
}

function seqSetFault(value) {
  seq.fault = Object.hasOwn(seqFaults, value)
    ? value
    : "none";

  seqMessage(
    `Fault injection: ${seqFaults[seq.fault]}`
  );

  if (seq.step !== 0 && seq.step !== 900) {
    seqEnsureTimer();
  }

  seqRender();
}

function seqHome() {
  if (
    seq.run ||
    ![0, 900].includes(seq.step)
  ) {
    seqMessage(
      "Homing blocked: stop the simulation first."
    );
  } else if (
    seq.fault !== "none" ||
    seq.motorFB
  ) {
    seqMessage(
      "Homing blocked: clear injected fault and wait for motor-stopped feedback."
    );
  } else {
    seq.position = "retracted";
    seq.pe = false;

    seqMessage(
      "SIMULATED service recovery: LS_RET ON and PE1 clear."
    );
  }

  seqRender();
}

/* ==========================================
   RESET BUTTON — GREMLIN FIX
========================================== */

function seqReset() {

  // Prevent reset during normal operation
  if (seq.step !== 0 && seq.step !== 900) {

    seqMessage(
      "RESET BLOCKED: Press STOP before resetting."
    );

    seqRender();
    return;
  }

  // Preserve completed cycle count
  const savedCycles = seq.cycles;

  // Restore all simulated equipment states
  seq = seqNewState();

  // Restore cycle count
  seq.cycles = savedCycles;

  // Clear the fault injection dropdown
  const faultSelector =
    document.getElementById("seqFaultChoice");

  if (faultSelector) {
    faultSelector.value = "none";
  }

  // Confirm successful reset
  seqMessage(
    "SIMULATION RESET: Fault cleared, " +
    "alarm reset, conveyor stopped, " +
    "cylinder returned home. Ready for START."
  );

  // Refresh simulator displays
  seqRender();
}


/* ==========================================
   UPDATE GRAPHICS AND LIVE TAGS
========================================== */

function seqRender() {
  const root = document.getElementById("seqTrainer");

  if (!root) return;

  const $ = id => root.querySelector(`#${id}`);

  const out = seqOutputs();

  const lsRet =
    seq.position === "retracted" ||
    seq.fault === "limits";

  const lsExt =
    seq.position === "extended" ||
    seq.fault === "limits";

  const tags = {
    seqActive:
      `${seq.step} — ${
        seqSteps.find(x => x[0] === seq.step)[1]
      }`,

    seqCycles: String(seq.cycles),
    seqPE: seq.pe,
    seqMotorCmd: out.conveyor,
    seqMotorFb: seq.motorFB,
    seqLsRet: lsRet,
    seqLsExt: lsExt,
    seqExtCmd: out.extend,
    seqRetCmd: out.retract,
    seqSafety: seq.fault !== "guard",
    seqAir: seq.fault !== "air",
    seqVfd: seq.fault !== "vfd",
    seqDwell:
      `${(seq.dwellAcc / 1000).toFixed(1)} / 1.5 s`,
    seqDN: seq.dwellDn,
    seqAlarm: seq.alarm || "None"
  };

  for (const [id, value] of Object.entries(tags)) {
    const node = $(id);

    if (!node) continue;

    if (typeof value === "boolean") {
      node.textContent = value ? "ON" : "OFF";

      node.classList.toggle("seq-on", value);
      node.classList.toggle("seq-off", !value);
    } else {
      node.textContent = value;
    }
  }

  const status = $("seqStatus");

  status.textContent = seq.alarm
    ? seq.alarm
    : seq.step === 0
      ? "Ready / Stopped"
      : `Running: ${
          seqSteps.find(x => x[0] === seq.step)[1]
        }`;

  status.classList.toggle(
    "seq-alert",
    !!seq.alarm
  );

  root.querySelectorAll(
    "[data-seq-step]"
  ).forEach(el => {
    el.classList.toggle(
      "seq-current",
      Number(el.dataset.seqStep) === seq.step
    );
  });

  root.querySelectorAll(
    "[data-seq-rung]"
  ).forEach(el => {
    el.classList.toggle(
      "seq-powered",
      Number(el.dataset.seqRung) === seq.step &&
      seq.step !== 900
    );
  });

  /* Animate the product */

  const pack = $("seqPackage");

  const x =
    seq.step === 10
      ? Math.min(
          240,
          seq.elapsed / 1800 * 240
        )
      : seq.step === 60
        ? 240 + Math.min(
            195,
            seq.elapsed / 1100 * 195
          )
        : 240;

  pack.setAttribute(
    "transform",
    `translate(${x},0)`
  );

  pack.style.opacity =
    (
      seq.pe ||
      [10, 20, 30, 40, 50, 60].includes(seq.step)
    )
      ? "1"
      : "0";

  /* Photoeye beam indicator */

  $("seqBeam").setAttribute(
    "stroke",
    seq.pe ? "#ef4444" : "#22c55e"
  );

  /* Pneumatic cylinder rod */

  const rod = $("seqRod");

  const stroke =
    seq.position === "extended"
      ? 80
      : seq.position === "retracted"
        ? 18
        : 46;

  rod.setAttribute(
    "width",
    String(stroke)
  );

  $("seqEvents").textContent =
    seq.log.join("\n");
}

/* ==========================================
   BUILD THE SIMULATOR INTERFACE
========================================== */

function plcSequentialLogicHTML() {
  return `
    <details class="calculator">

      <summary>🔁 Sequential Logic & Programming</summary>

      <div class="calculator-body" id="seqTrainer">

        <style>
          #seqTrainer {
            line-height: 1.45;
          }

          #seqTrainer * {
            box-sizing: border-box;
          }

          #seqTrainer .seq-panel {
            padding: 13px;
            background: #0f172a;
            color: #e2e8f0;
            border: 1px solid #334155;
            border-radius: 12px;
            margin: 10px 0;
          }

          #seqTrainer .seq-scene {
            width: 100%;
            max-width: 100%;
            height: auto;
            display: block;
            background: #101e32;
            border-radius: 10px;
          }

          #seqTrainer .seq-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0;
          }

          #seqTrainer button {
            padding: 10px 13px;
            border: 1px solid #64748b;
            border-radius: 9px;
            background: #1e293b;
            color: white;
            cursor: pointer;
            font-weight: bold;
          }

          #seqTrainer button.seq-go {
            background: #166534;
          }

          #seqTrainer button.seq-stop {
            background: #991b1b;
          }

          #seqTrainer select {
            width: 100%;
            max-width: 100%;
            padding: 10px;
            background: white;
            color: #0f172a;
            border-radius: 8px;
            margin: 6px 0;
          }

          #seqTrainer .seq-status {
            padding: 10px;
            border-radius: 9px;
            background: #14532d;
            color: white;
            font-weight: bold;
          }

          #seqTrainer .seq-status.seq-alert {
            background: #991b1b;
          }

          #seqTrainer .seq-steps {
            display: grid;
            grid-template-columns:
              repeat(auto-fit, minmax(140px, 1fr));
            gap: 6px;
          }

          #seqTrainer .seq-step {
            font-size: 12px;
            padding: 9px;
            border: 1px solid #475569;
            border-radius: 8px;
            background: #1e293b;
          }

          #seqTrainer .seq-current {
            border-color: #4ade80;
            background: #14532d;
          }

          #seqTrainer .seq-tags {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 8px;
            font-size: 12px;
          }

          #seqTrainer .seq-tags > div {
            background: #1e293b;
            border-radius: 7px;
            padding: 8px;
            min-width: 0;
            overflow-wrap: anywhere;
          }

          #seqTrainer .seq-value {
            display: block;
            font-size: 13px;
            font-weight: bold;
            color: #f8fafc;
          }

          #seqTrainer .seq-value.seq-on {
            color: #4ade80;
          }

          #seqTrainer .seq-value.seq-off {
            color: #fca5a5;
          }

          #seqTrainer .seq-rung {
            font: 12px/1.5 monospace;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
            padding: 10px;
            background: #1e293b;
            border: 1px solid #475569;
            border-radius: 7px;
            margin: 8px 0;
          }

          #seqTrainer .seq-rung.seq-powered {
            background: #14532d;
            border-color: #4ade80;
          }

          #seqTrainer .seq-log {
            white-space: pre-wrap;
            font: 12px/1.6 monospace;
            overflow-wrap: anywhere;
          }

          @media (max-width: 450px) {
            #seqTrainer .seq-tags {
              grid-template-columns: 1fr 1fr;
            }
          }
        </style>

        <p>
          <strong>Realistic training scenario:</strong>
          Feed a product, stop the conveyor, confirm
          motor stopped, extend a pneumatic cylinder,
          dwell, retract, then discharge.
          Includes fault timeouts and recovery.
        </p>

        <!-- EQUIPMENT ANIMATION -->

        <div class="seq-panel">

          <svg
            class="seq-scene"
            viewBox="0 0 480 200"
            role="img"
            aria-label="Simulated conveyor, photoeye and pneumatic cylinder"
          >

            <g fill="#e2e8f0"
               font-size="13"
               font-family="Arial">

              <text x="14" y="23">PE1</text>

              <text x="315" y="23">
                PNEUMATIC CYLINDER
              </text>

            </g>

            <rect
              x="18" y="117"
              width="445" height="38"
              rx="18"
              fill="#64748b"
              stroke="#94a3b8"
              stroke-width="3"
            />

            <path
              d="M38 136H442"
              stroke="#0f172a"
              stroke-width="5"
              stroke-dasharray="12 12"
            />

            <circle
              cx="38" cy="136" r="16"
              fill="none"
              stroke="#cbd5e1"
              stroke-width="3"
            />

            <circle
              cx="443" cy="136" r="16"
              fill="none"
              stroke="#cbd5e1"
              stroke-width="3"
            />

            <!-- PHOTOEYE -->

            <rect
              x="244" y="48"
              width="17" height="21"
              rx="3"
              fill="#38bdf8"
            />

            <path
              id="seqBeam"
              d="M252 69V116"
              stroke="#22c55e"
              stroke-width="3"
              stroke-dasharray="5 4"
            />

            <!-- PRODUCT -->

            <g
              id="seqPackage"
              transform="translate(0,0)"
              opacity="0"
            >

              <rect
                x="28" y="84"
                width="50" height="32"
                rx="3"
                fill="#f59e0b"
                stroke="#fef08a"
                stroke-width="2"
              />

              <path
                d="M28 94H78"
                stroke="#d97706"
                stroke-width="2"
              />

            </g>

            <!-- CYLINDER -->

            <rect
              x="325" y="43"
              width="87" height="23"
              rx="6"
              fill="#334155"
              stroke="#94a3b8"
              stroke-width="2"
            />

            <rect
              id="seqRod"
              x="325" y="51"
              width="18" height="7"
              rx="3"
              fill="#e2e8f0"
            />

            <rect
              x="290" y="40"
              width="33" height="29"
              rx="3"
              fill="#64748b"
            />

            <text
              x="15" y="187"
              fill="#94a3b8"
              font-size="12"
            >
              TRAINING SIMULATOR • NOT CONNECTED TO EQUIPMENT
            </text>

          </svg>

          <div
            class="seq-status"
            id="seqStatus"
          >
            Ready / Stopped
          </div>

          <!-- CONTROLS -->

          <div class="seq-buttons">

            <button
              type="button"
              class="seq-go"
              onclick="seqStart()"
            >
              ▶ START
            </button>

            <button
              type="button"
              class="seq-stop"
              onclick="seqStop()"
            >
              ■ STOP
            </button>

            <button
              type="button"
              onclick="seqHome()"
            >
              Home (simulation)
            </button>

            <button
              type="button"
              onclick="seqReset()"
            >
              Reset Alarm
            </button>

          </div>

          <!-- FAULT INJECTION -->

          <label for="seqFaultChoice">
            <strong>Inject a fault</strong>
          </label>

          <select
            id="seqFaultChoice"
            onchange="seqSetFault(this.value)"
          >
            ${
              Object.entries(seqFaults)
                .map(
                  ([key, name]) =>
                    `<option value="${key}">
                      ${name}
                    </option>`
                )
                .join("")
            }
          </select>

          <p style="font-size:12px;">
            Inject a fault during operation to test
            troubleshooting. Remove the fault,
            verify home and motor feedback,
            then reset and START.
            These controls are simulated only.
          </p>

        </div>

        <!-- SEQUENCE STEPS -->

        <div class="seq-panel">

          <h4>
            Sequence Steps — Active Step Highlighted
          </h4>

          <div class="seq-steps">

            ${
              seqSteps.map(
                ([id, name, desc]) => `
                  <div
                    class="seq-step ${
                      id === 0 ? "seq-current" : ""
                    }"
                    data-seq-step="${id}"
                  >
                    <strong>${id} ${name}</strong>
                    <div>${desc}</div>
                  </div>
                `
              ).join("")
            }

          </div>

        </div>

        <!-- LIVE TAGS -->

        <div class="seq-panel">

          <h4>Live PLC-Style Tags</h4>

          <div class="seq-tags">

            <div>
              Active_Step
              <span id="seqActive"
                class="seq-value">
                0 — IDLE
              </span>
            </div>

            <div>
              Cycle_Count
              <span id="seqCycles"
                class="seq-value">0</span>
            </div>

            <div>
              PE1_Detected
              <span id="seqPE"
                class="seq-value">OFF</span>
            </div>

            <div>
              Conveyor_RunCmd
              <span id="seqMotorCmd"
                class="seq-value">OFF</span>
            </div>

            <div>
              Conveyor_RunningFB
              <span id="seqMotorFb"
                class="seq-value">OFF</span>
            </div>

            <div>
              LS_Retracted
              <span id="seqLsRet"
                class="seq-value seq-on">ON</span>
            </div>

            <div>
              LS_Extended
              <span id="seqLsExt"
                class="seq-value">OFF</span>
            </div>

            <div>
              Cyl_ExtendCmd
              <span id="seqExtCmd"
                class="seq-value">OFF</span>
            </div>

            <div>
              Cyl_RetractCmd
              <span id="seqRetCmd"
                class="seq-value">OFF</span>
            </div>

            <div>
              Safety_OK
              <span id="seqSafety"
                class="seq-value seq-on">ON</span>
            </div>

            <div>
              Air_OK
              <span id="seqAir"
                class="seq-value seq-on">ON</span>
            </div>

            <div>
              VFD_Healthy
              <span id="seqVfd"
                class="seq-value seq-on">ON</span>
            </div>

            <div>
              Dwell_Timer.ACC / PRE
              <span id="seqDwell"
                class="seq-value">
                0.0 / 1.5 s
              </span>
            </div>

            <div>
              Dwell_Timer.DN
              <span id="seqDN"
                class="seq-value">OFF</span>
            </div>

            <div>
              Fault_Alarm
              <span id="seqAlarm"
                class="seq-value">None</span>
            </div>

          </div>

        </div>

        <!-- LADDER LOGIC OVERVIEW -->

        <div class="seq-panel">

          <h4>Studio 5000-Style Logic Overview</h4>

          <p style="font-size:12px;">
            Illustrative logic, not a validated
            or downloadable control program.
            The simulator uses equivalent
            step transitions and timeout checks.
          </p>

          <div
            class="seq-rung"
            data-seq-rung="10"
          >EQU Active_Step 10
XIC Safety_OK
XIC VFD_Healthy
OTE Conveyor_RunCmd

XIC PE1_Detected
MOV 20 Active_Step</div>

          <div
            class="seq-rung"
            data-seq-rung="20"
          >EQU Active_Step 20
XIO Conveyor_RunningFB
MOV 30 Active_Step

2.0 s stop timeout → ALM-103</div>

          <div
            class="seq-rung"
            data-seq-rung="30"
          >EQU Active_Step 30
XIC Air_OK
OTE Cyl_ExtendCmd

XIC LS_Extended
MOV 40 Active_Step

3.0 s timeout → ALM-101</div>

          <div
            class="seq-rung"
            data-seq-rung="40"
          >EQU Active_Step 40
TON Dwell_Timer PRE 1500

XIC Dwell_Timer.DN
MOV 50 Active_Step</div>

          <div
            class="seq-rung"
            data-seq-rung="50"
          >EQU Active_Step 50
OTE Cyl_RetractCmd

XIC LS_Retracted
MOV 60 Active_Step

3.0 s timeout → ALM-102</div>

          <div
            class="seq-rung"
            data-seq-rung="60"
          >EQU Active_Step 60
OTE Conveyor_RunCmd

XIO PE1_Detected
MOV 10 Active_Step</div>

          <div
            class="seq-rung"
            data-seq-rung="900"
          >FAULT 900:
Outputs OFF.
Alarm latched.

Recovery requires:
- Clear the fault
- Verify home position
- Confirm motor stopped
- Reset
- Deliberately restart</div>

        </div>

        <!-- EVENT HISTORY -->

        <div class="seq-panel">

          <h4>Event History</h4>

          <div
            id="seqEvents"
            class="seq-log"
          >
            Trainer ready. Check permissives,
            then press START.
          </div>

        </div>

        <p style="font-size:12px;">
          <strong>Safety:</strong>
          Simulation only. Never copy these
          illustrative rungs directly into
          a live machine. Real sequences require
          a validated risk assessment,
          appropriate safety architecture,
          confirmed feedback logic,
          controlled recovery, and
          approved testing procedures.
        </p>

      </div>

    </details>
  `;
}
