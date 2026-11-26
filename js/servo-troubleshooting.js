
/* ==========================================
   MAINTENANCE TECH TOOLKIT
   SERVO & MOTION CONTROL — VERSION 1

   Kinetix 5500 / 5700
   Training and troubleshooting reference
========================================== */

const servoGuideProblems = {

  enable: {
    title: "Servo Axis Will Not Enable",
    observations: [
      {
        label: "Drive has an active fault or axis inhibit",
        checks: [
          "Record the exact fault code, message, drive model and axis name.",
          "In Studio 5000, inspect Axis Properties and Faults & Alarms.",
          "Check controller, drive and motion-group connection status.",
          "Compare the fault with the correct Kinetix drive manual.",
          "Correct the underlying fault before performing an approved reset."
        ]
      },
      {
        label: "Safe Torque Off (STO) is active",
        checks: [
          "Identify the drive safety architecture and exact safety status.",
          "Review the approved safety-circuit diagnostics.",
          "Check guards, E-stops and safety inputs using approved procedures.",
          "Determine which required reset condition is not satisfied.",
          "Never jumper, force or bypass STO to enable torque.",
          "After correcting the cause, follow the documented recovery procedure."
        ]
      },
      {
        label: "No visible fault but axis will not enable",
        checks: [
          "Verify the axis is assigned to the correct motion group.",
          "Check axis state and drive-ready status.",
          "Review motion instruction conditions and enable permissives.",
          "Check controller and drive firmware compatibility.",
          "Review the OEM sequence before making any changes."
        ]
      }
    ]
  },

  position: {
    title: "Following Error / Position Error",
    observations: [
      {
        label: "Actual position falls behind commanded position",
        checks: [
          "Trend commanded position and actual position.",
          "Monitor position error and actual velocity.",
          "Check mechanical binding, excessive load and coupling slip with energy isolated.",
          "Review motor current, torque limits and acceleration settings.",
          "Compare feedback scaling and axis configuration with the approved design.",
          "Do not increase following-error limits just to hide the problem."
        ]
      },
      {
        label: "Following error occurs during acceleration",
        checks: [
          "Identify the acceleration point where the fault occurs.",
          "Monitor commanded velocity, actual velocity and torque demand.",
          "Check for excessive inertia or mechanical load.",
          "Inspect for binding or mechanical resistance using safe procedures.",
          "Review the existing tuning and motion profile.",
          "Make parameter changes only through approved change control."
        ]
      }
    ]
  },

  feedback: {
    title: "Encoder / Motor Feedback Fault",
    observations: [
      {
        label: "Feedback loss or intermittent encoder fault",
        checks: [
          "Record the exact feedback fault code and message.",
          "Verify motor and feedback cable compatibility.",
          "With power isolated and stored energy discharged, inspect feedback connectors.",
          "Check cable damage, shielding and grounding against the manual.",
          "Review feedback configuration in Studio 5000.",
          "Inspect cable routing near motor power conductors.",
          "Verify the cause before replacing the motor or encoder."
        ]
      },
      {
        label: "Axis loses position after restart",
        checks: [
          "Determine whether feedback is absolute or incremental.",
          "Check for position-retention or battery-related faults.",
          "Review the documented homing procedure.",
          "Check feedback and position-reference configuration.",
          "Verify the motion area is clear before any approved rehoming.",
          "Restore the position reference using the OEM procedure."
        ]
      }
    ]
  },

  motor: {
    title: "Servo Motor / Temperature Fault",
    observations: [
      {
        label: "Servo motor or drive overheating",
        checks: [
          "Identify whether the fault originates in the motor or drive.",
          "Check ambient temperature and cooling conditions.",
          "Review current, torque demand and duty cycle.",
          "Check for mechanical drag or excessive loading with power isolated.",
          "Inspect cooling fans and ventilation.",
          "Verify motor protection settings."
        ]
      },
      {
        label: "Motor hums but does not move",
        checks: [
          "Read the active drive fault and axis status.",
          "Check whether the holding brake is preventing motion.",
          "Determine whether the load is mechanically obstructed.",
          "Inspect motor power and feedback connections with power isolated.",
          "Review drive-enable and torque-limit conditions.",
          "Do not repeatedly command motion against an unknown obstruction."
        ]
      }
    ]
  },

  brake: {
    title: "Servo Holding Brake Troubleshooting",
    observations: [
      {
        label: "Motor will not move because brake may be engaged",
        checks: [
          "Confirm whether the motor includes a holding brake.",
          "Review brake-related fault messages.",
          "Check the approved brake-release sequence.",
          "Check the brake command and associated status.",
          "Secure the machine and isolate energy before inspecting brake wiring.",
          "Never release a brake supporting an unsecured load."
        ]
      },
      {
        label: "Vertical axis drifts or drops",
        checks: [
          "Treat unexpected load movement as an immediate safety hazard.",
          "Secure the suspended load and keep personnel clear.",
          "Follow approved isolation and stored-energy procedures.",
          "Inspect the mechanical brake and load-holding design.",
          "Review brake timing and drive fault history.",
          "Never test load-holding capability without engineered restraint."
        ]
      }
    ]
  },

  network: {
    title: "Servo Drive Communication Fault",
    observations: [
      {
        label: "Servo drive missing from Ethernet network",
        checks: [
          "Check drive power and module/network status indicators.",
          "Inspect Ethernet cable and switch connection.",
          "Verify drive IP address and network configuration.",
          "Inspect Studio 5000 I/O Configuration.",
          "Check connection status and electronic keying.",
          "Verify controller, drive and firmware compatibility.",
          "Do not change production network settings without authorization."
        ]
      },
      {
        label: "Motion group or axis configuration fault",
        checks: [
          "Identify whether the fault belongs to the axis, drive or motion group.",
          "Review the first recorded fault.",
          "Check motion-group configuration.",
          "Verify the associated drive and axis configuration.",
          "Check network synchronization and communication status.",
          "Compare online settings with the approved machine project."
        ]
      }
    ]
  },

  home: {
    title: "Servo Axis Will Not Home",
    observations: [
      {
        label: "Home switch never changes state",
        checks: [
          "Review the axis homing sequence.",
          "Identify the required home sensor and PLC input.",
          "Verify sensor state and input mapping.",
          "Inspect wiring and sensor alignment using approved procedures.",
          "Confirm the configured homing direction and method.",
          "Never bypass travel limits or safety devices to complete homing."
        ]
      },
      {
        label: "Axis moves in wrong direction during homing",
        checks: [
          "Stop the homing attempt and secure the machine.",
          "Verify axis direction and position scaling.",
          "Inspect feedback polarity and homing configuration.",
          "Check the mechanical orientation of the motor and load.",
          "Verify travel limits and protective functions.",
          "Use an approved commissioning procedure before retrying."
        ]
      }
    ]
  }

};


/* ==========================================
   SERVO TROUBLESHOOTING INTERFACE
========================================== */

function servoTroubleshootingHTML() {

  const problemOptions = Object.entries(servoGuideProblems)
    .map(([key, item]) => {
      return `<option value="${key}">${item.title}</option>`;
    })
    .join("");

  return `

    <details class="calculator">

      <summary>⚙️ Servo & Motion Control</summary>

      <div class="calculator-body" id="servoGuideRoot">

        <style>

          #servoGuideRoot {
            color: #e7edf4;
            min-width: 0;
          }

          #servoGuideRoot * {
            box-sizing: border-box;
          }

          #servoGuideRoot .servo-panel {
            background: #192938;
            border: 1px solid #4b6072;
            border-radius: 10px;
            padding: 14px;
            margin: 10px 0;
          }

          #servoGuideRoot h3 {
            color: #eff6ff;
          }

          #servoGuideRoot p,
          #servoGuideRoot li {
            color: #d5e2ee;
            line-height: 1.55;
          }

          #servoGuideRoot select {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            background: #edf4fb !important;
            color: #152335 !important;

            border: 1px solid #8fa8c0;
            border-radius: 8px;

            padding: 11px;
            margin: 7px 0 14px;
          }

          #servoGuideRoot .servo-label {
            display: block;
            font-weight: 700;
            color: #dce8f5;
          }

          #servoGuideRoot .servo-diagnose {
            background: linear-gradient(
              #2475bb,
              #174879
            );

            color: white;
            border: 1px solid #66a8e4;
            border-radius: 8px;

            padding: 12px 18px;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
          }

          #servoGuideRoot .servo-result {
            background: #102438;
            border-left: 4px solid #5ab5ff;

            padding: 12px;
            border-radius: 8px;
            margin-top: 12px;
          }

          #servoGuideRoot .servo-result ol {
            padding-left: 22px;
          }

          #servoGuideRoot .servo-result li {
            margin-bottom: 9px;
          }

          #servoGuideRoot .servo-manual {
            display: block;

            background: #22394d;
            border: 1px solid #587796;

            border-radius: 8px;
            padding: 10px;
            margin: 9px 0;

            color: #d9f0ff;
            text-decoration: none;
            overflow-wrap: anywhere;
          }

          #servoGuideRoot .servo-notice {
            background: #3b2c19;
            border: 1px solid #ad7e35;

            border-radius: 8px;
            padding: 12px;

            color: #ffdf9b;
            font-size: 12px;
            line-height: 1.5;
            margin-top: 12px;
          }

        </style>


        <!-- INTRODUCTION -->

        <div class="servo-panel">

          <h3>Kinetix Servo Diagnostics</h3>

          <p>
            Allen-Bradley Kinetix 5500 / 5700
            Servo Drive & Motion Control Reference.
          </p>

          <p>
            Select the problem and observation
            to receive recommended diagnostic checks.
          </p>

        </div>


        <!-- INTERACTIVE FAULT FINDER -->

        <details class="calculator" open>

          <summary>🔧 Interactive Servo Fault Finder</summary>

          <div class="calculator-body">

            <label class="servo-label"
              for="servoGuideProblem">
              Observed Problem
            </label>

            <select id="servoGuideProblem"
              onchange="servoGuideChange()">

              <option value="">
                Choose a Problem
              </option>

              ${problemOptions}

            </select>


            <label class="servo-label"
              for="servoGuideObservation">
              What Do You Observe?
            </label>

            <select id="servoGuideObservation">

              <option value="">
                Select a Problem First
              </option>

            </select>


            <button type="button"
              class="servo-diagnose"
              onclick="servoGuideDiagnose()">

              Diagnose Problem

            </button>


            <div class="servo-result"
              id="servoGuideResult"
              aria-live="polite">

              Select a problem and observation
              to begin troubleshooting.

            </div>

          </div>

        </details>


        <!-- FAULT CODE LIBRARY -->

        <details class="calculator">

          <summary>📕 Servo Fault Code Library</summary>

          <div class="calculator-body servo-panel">

            <h3>Servo Fault Code Reference</h3>

            <p>
              Record the complete fault code,
              fault description, drive catalog number,
              firmware version and axis name.
            </p>

            <p>
              Kinetix fault codes vary between
              drive families and firmware versions.
              Use the correct manufacturer documentation.
            </p>

            <a class="servo-manual"
              href="https://www.rockwellautomation.com/en-us/support/documentation/technical/motion-control/single-axis-control-servo-drives.html"
              target="_blank"
              rel="noopener noreferrer">

              Kinetix 5500 Documentation

            </a>

            <a class="servo-manual"
              href="https://www.rockwellautomation.com/en-us/support/documentation/technical/motion-control/multi-axis-control-servo-drives.windows.html"
              target="_blank"
              rel="noopener noreferrer">

              Kinetix 5700 Documentation

            </a>

          </div>

        </details>


        <!-- ENCODER AND FEEDBACK -->

        <details class="calculator">

          <summary>🔌 Encoder & Feedback Troubleshooting</summary>

          <div class="calculator-body servo-panel">

            <h3>Encoder & Position Feedback</h3>

            <p>Common symptoms:</p>

            <ol>
              <li>Encoder communication loss</li>
              <li>Intermittent feedback faults</li>
              <li>Position reference errors</li>
              <li>Unstable actual position</li>
              <li>Excessive following error</li>
            </ol>

            <h4>Recommended Checks</h4>

            <ol>
              <li>Record the exact drive fault.</li>
              <li>Verify motor and drive compatibility.</li>
              <li>Check feedback configuration in Studio 5000.</li>
              <li>Inspect cables and connectors with power isolated.</li>
              <li>Check shielding and grounding.</li>
              <li>Compare commanded and actual position.</li>
            </ol>

          </div>

        </details>


        <!-- MOTOR AND BRAKE -->

        <details class="calculator">

          <summary>⚙️ Servo Motor & Holding Brake</summary>

          <div class="calculator-body servo-panel">

            <h3>Servo Motor Troubleshooting</h3>

            <p>Common problems:</p>

            <ol>
              <li>Motor overheating</li>
              <li>Mechanical binding</li>
              <li>Excessive motor torque</li>
              <li>Holding brake not releasing</li>
              <li>Brake slipping or load drifting</li>
            </ol>

            <h4>Recommended Checks</h4>

            <ol>
              <li>Secure moving or suspended loads.</li>
              <li>Review the drive and motor fault information.</li>
              <li>Check torque demand and duty cycle.</li>
              <li>Inspect motor cooling.</li>
              <li>With energy isolated, inspect coupling and mechanical load.</li>
              <li>Review brake timing and release permissives.</li>
            </ol>

          </div>

        </details>


        <!-- STUDIO 5000 MOTION -->

        <details class="calculator">

          <summary>🧠 Studio 5000 Motion Troubleshooting</summary>

          <div class="calculator-body servo-panel">

            <h3>Studio 5000 Axis Diagnostics</h3>

            <ol>

              <li>
                Open the correct Studio 5000 project.
              </li>

              <li>
                Connect to the correct controller
                using approved procedures.
              </li>

              <li>
                Locate the affected axis.
              </li>

              <li>
                Open Axis Properties.
              </li>

              <li>
                Review Faults & Alarms.
              </li>

              <li>
                Record the fault details and axis state.
              </li>

              <li>
                Check drive and motion-group connection status.
              </li>

              <li>
                Check axis inhibit and safety conditions.
              </li>

              <li>
                Trend commanded and actual position
                if safely permitted.
              </li>

              <li>
                Correct the cause before an authorized reset.
              </li>

            </ol>

            <a class="servo-manual"
              href="https://www.rockwellautomation.com/en-gb/docs/studio-5000-logix-designer/38-01/contents-ditamap/studio-5000-logix-designer/axis-properties-for-ethernet-motion-system/faults---alarms-page.html"
              target="_blank"
              rel="noopener noreferrer">

              Studio 5000 Axis Faults & Alarms Help

            </a>

          </div>

        </details>


        <!-- WIRING AND CONNECTIONS -->

        <details class="calculator">

          <summary>📐 Servo Wiring & Connections</summary>

          <div class="calculator-body servo-panel">

            <h3>Servo Drive Connections</h3>

            <p>
              Typical servo systems include:
            </p>

            <ol>
              <li>Incoming power and DC bus connections</li>
              <li>Motor power conductors</li>
              <li>Protective earth connection</li>
              <li>Motor feedback cable</li>
              <li>Holding brake connections</li>
              <li>Safety interface</li>
              <li>EtherNet/IP connections</li>
            </ol>

            <p>
              Always use the model-specific manual
              for actual connector pinouts.
            </p>

            <a class="servo-manual"
              href="https://literature.rockwellautomation.com/idc/groups/literature/documents/um/2198-um001_-en-p.pdf"
              target="_blank"
              rel="noopener noreferrer">

              Kinetix 5500 User Manual

            </a>

            <a class="servo-manual"
              href="https://literature.rockwellautomation.com/idc/groups/literature/documents/um/2198-um002_-en-p.pdf"
              target="_blank"
              rel="noopener noreferrer">

              Kinetix 5700 User Manual

            </a>

          </div>

        </details>


        <!-- SAFETY -->

        <div class="servo-notice">

          ⚠ Servo axes can move unexpectedly.

          Secure suspended loads and follow approved
          lockout/tagout and stored-energy procedures.

          Never bypass Safe Torque Off or release
          a holding brake on an unsupported load.

          This is a training and diagnostic reference,
          not a live machine controller.

        </div>

      </div>

    </details>

  `;
}


/* ==========================================
   UPDATE FAULT FINDER OBSERVATIONS
========================================== */

function servoGuideChange() {

  const root =
    document.getElementById("servoGuideRoot");

  if (!root) return;

  const key =
    root.querySelector("#servoGuideProblem").value;

  const observation =
    root.querySelector("#servoGuideObservation");

  const result =
    root.querySelector("#servoGuideResult");

  observation.replaceChildren(
    new Option("Choose an Observation", "")
  );

  result.textContent =
    "Choose an observation, then press Diagnose Problem.";

  const problem = servoGuideProblems[key];

  if (!problem) return;

  problem.observations.forEach((entry, index) => {

    observation.add(
      new Option(entry.label, String(index))
    );

  });

}


/* ==========================================
   DISPLAY DIAGNOSTIC CHECKLIST
========================================== */

function servoGuideDiagnose() {

  const root =
    document.getElementById("servoGuideRoot");

  if (!root) return;

  const key =
    root.querySelector("#servoGuideProblem").value;

  const selection =
    root.querySelector("#servoGuideObservation").value;

  const result =
    root.querySelector("#servoGuideResult");

  const problem = servoGuideProblems[key];

  if (!problem || selection === "") {

    result.textContent =
      "Select both a problem and an observation.";

    return;

  }

  const item =
    problem.observations[Number(selection)];

  if (!item) return;

  result.replaceChildren();

  const heading =
    document.createElement("h3");

  heading.textContent = problem.title;

  const summary =
    document.createElement("p");

  summary.textContent =
    "Observation: " + item.label;

  const list =
    document.createElement("ol");

  item.checks.forEach(check => {

    const li = document.createElement("li");

    li.textContent = check;

    list.appendChild(li);

  });

  const footer =
    document.createElement("p");

  footer.textContent =
    "These checks help narrow down the problem. " +
    "They do not establish a confirmed diagnosis. " +
    "Verify the correct manufacturer documentation.";

  result.append(
    heading,
    summary,
    list,
    footer
  );

}
