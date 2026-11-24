
/* ==========================================
   PLC FAULT FINDER — VERSION 3
   MAINTENANCE TECH TOOLKIT
========================================== */

const plcFaultScenarios = {

  processor: {
    title: "PLC Processor Red Fault Light",
    observations: [
      {
        label: "Micro800 FAULT LED Flashing Red",
        checks: [
          "Identify the exact Micro800 model.",
          "Check controller power and status LEDs.",
          "Connect using Connected Components Workbench.",
          "Read and record the controller fault code.",
          "Determine whether the fault is recoverable.",
          "Investigate the cause before clearing it.",
          "Verify controller operation after recovery."
        ]
      },
      {
        label: "Micro800 FAULT LED Solid Red",
        checks: [
          "Identify the controller model and firmware.",
          "Check the model-specific LED meaning.",
          "Record available diagnostic information.",
          "Check power supply and controller status.",
          "Review the manufacturer's recovery procedure.",
          "Only power cycle when authorized and safe.",
          "Contact Rockwell support if the fault persists."
        ]
      },
      {
        label: "CompactLogix / ControlLogix OK Flashing Red",
        checks: [
          "Identify the controller catalog number.",
          "Check processor display messages.",
          "Connect using the correct Studio 5000 version.",
          "Read Major Fault information if accessible.",
          "Record the fault type, code and description.",
          "Investigate related tasks, programs or modules.",
          "Correct the cause before clearing the fault.",
          "Verify safe conditions before returning to Run."
        ]
      },
      {
        label: "CompactLogix / ControlLogix OK Solid Red",
        checks: [
          "Check whether startup diagnostics are running.",
          "Identify the exact controller model.",
          "Read processor status messages.",
          "Consult its LED diagnostic table.",
          "Check power and environmental conditions.",
          "Review available hardware fault information.",
          "Follow the manufacturer recovery procedure."
        ]
      },
      {
        label: "Red I/O, Module or Network Status LED",
        checks: [
          "Identify the exact LED and module model.",
          "Check solid versus flashing red.",
          "Review module diagnostic information.",
          "Verify module power and connections.",
          "Check communication and configuration faults.",
          "Inspect module connection status and keying.",
          "Correct the cause before resetting equipment."
        ]
      }
    ]
  },

  startup: {
    title: "Machine Will Not Start",
    observations: [
      {
        label: "PLC faulted or not in Run mode",
        checks: [
          "Check controller LEDs and operating mode.",
          "Read controller fault information.",
          "Record fault codes and descriptions.",
          "Investigate the cause before resetting.",
          "Verify machine readiness before restarting."
        ]
      },
      {
        label: "Inputs ON but rung is false",
        checks: [
          "Connect to the correct PLC.",
          "Monitor the machine start rung.",
          "Check each XIC and XIO instruction.",
          "Locate the false permissive or interlock.",
          "Use Cross Reference to trace the tag.",
          "Verify relevant input status."
        ]
      },
      {
        label: "Run command TRUE but motor OFF",
        checks: [
          "Verify the output command and module status.",
          "Check field power and module diagnostics.",
          "Check contactor, overload or VFD status.",
          "Inspect wiring using approved procedures.",
          "Determine whether the fault is in PLC logic or downstream equipment."
        ]
      }
    ]
  },

  input: {
    title: "PLC Input Not Responding",
    observations: [
      {
        label: "Sensor indicator LED is OFF",
        checks: [
          "Verify sensor alignment and target detection.",
          "Check sensor configuration and switching mode.",
          "Check supply voltage and correct common.",
          "Inspect wiring and connectors.",
          "Consult the sensor pinout."
        ]
      },
      {
        label: "Sensor LED ON but PLC input LED OFF",
        checks: [
          "Identify the exact PLC input channel.",
          "Verify input module voltage rating.",
          "Check whether the sensor is PNP or NPN.",
          "Confirm input sinking/sourcing compatibility.",
          "Verify voltage at the PLC input terminal relative to its designated common using an approved procedure.",
          "Compare the reading against the input's ON threshold.",
          "Check input common wiring and module diagnostics."
        ]
      },
      {
        label: "PLC input LED ON but logic tag OFF",
        checks: [
          "Verify the correct module and input channel.",
          "Check I/O configuration and tag mapping.",
          "Review aliases and mapped input tags.",
          "Check module communication status.",
          "Check input filtering or logic conditions."
        ]
      }
    ]
  },

  inputVoltage: {
    title: "Verify Voltage at PLC Input",
    observations: [
      {
        label: "Need to check voltage at a PLC input",
        checks: [
          "Identify the PLC and input module catalog number.",
          "Determine whether the input is AC or DC.",
          "Confirm the required nominal input voltage.",
          "Identify the correct input terminal and group common.",
          "Identify PNP/sinking or NPN/sourcing wiring.",
          "Have qualified personnel use an appropriately rated meter under approved energized-testing procedures.",
          "Measure across the input and its designated common with correct polarity and meter mode.",
          "Compare readings with the manufacturer's ON and OFF voltage specifications.",
          "Check the input status LED and corresponding online tag.",
          "Record the voltage and observed input state."
        ]
      },
      {
        label: "PNP sensor ON but input reads 0V",
        checks: [
          "Confirm the sensor should be detecting a target.",
          "Verify that the PLC input common is correctly connected to the intended 0V reference.",
          "Check sensor supply and its switching output.",
          "Inspect cable and connector continuity with power isolated.",
          "Check the correct terminal and channel.",
          "Investigate a missing supply, open conductor or sensor fault.",
          "Do not assume the PLC input card has failed."
        ]
      },
      {
        label: "Input voltage is lower than expected",
        checks: [
          "Confirm the actual input module ON threshold.",
          "Check the 24V power supply condition.",
          "Verify sensor supply and common wiring.",
          "Inspect connections, terminals and cable condition.",
          "Check for excessive voltage drop or overloaded supplies.",
          "Check whether the output device can supply the required input current.",
          "Investigate leakage or induced voltage if applicable.",
          "Compare measurements with the input active and inactive."
        ]
      },
      {
        label: "Correct voltage but input LED stays OFF",
        checks: [
          "Confirm voltage was measured across the actual input channel and its designated common.",
          "Check meter polarity and sinking/sourcing configuration.",
          "Compare voltage with the manufacturer's ON threshold.",
          "Verify the input channel group has the correct common connection.",
          "Check input module power and diagnostic LEDs.",
          "Review the module's configuration and input filter.",
          "Inspect terminal connections using approved procedures.",
          "Consider an input channel fault only after external causes are excluded."
        ]
      },
      {
        label: "Input LED ON but PLC tag stays OFF",
        checks: [
          "Verify the physical module slot and channel.",
          "Confirm the tag references the intended input.",
          "Check module connection and controller diagnostics.",
          "Review aliases and any I/O mapping logic.",
          "Verify whether filtering or program logic changes the monitored value.",
          "Check for stale data or incorrect online project information."
        ]
      },
      {
        label: "NPN sensor — verify input voltage",
        checks: [
          "Confirm the input is compatible with an NPN sinking-output sensor.",
          "Verify the input module's sourcing common is connected as required.",
          "An active NPN output typically pulls the input toward 0V.",
          "For a 24V DC sourcing input, the voltage between input and its +24V common may be approximately 24V with opposite polarity to a PNP arrangement.",
          "Use the module wiring diagram to identify the correct measurement reference and polarity.",
          "Compare measured voltage with the module specifications.",
          "Verify physical input status and online tag."
        ]
      }
    ]
  },

  output: {
    title: "PLC Output Not Working",
    observations: [
      {
        label: "Output command is OFF",
        checks: [
          "Find the output instruction in ladder logic.",
          "Monitor the rung conditions.",
          "Check permissives, alarms and interlocks.",
          "Use Cross Reference to identify other writes.",
          "Determine why the output is not commanded."
        ]
      },
      {
        label: "Output tag ON but module LED OFF",
        checks: [
          "Check module connection status.",
          "Verify the correct output channel.",
          "Review module configuration and diagnostics.",
          "Check inhibit and fault conditions.",
          "Confirm the actual output command."
        ]
      },
      {
        label: "Output LED ON but device does not operate",
        checks: [
          "Verify the correct device and output channel.",
          "Check field-power and protection status.",
          "Inspect contactor, relay or solenoid diagnostics.",
          "Check downstream overloads and interlocks.",
          "Follow approved procedures to test wiring."
        ]
      }
    ]
  },

  ethernet: {
    title: "PLC Ethernet Communication Failure",
    observations: [
      {
        label: "No Ethernet link indication",
        checks: [
          "Verify controller and switch power.",
          "Inspect Ethernet cable and connectors.",
          "Check port link LEDs.",
          "Verify switch port configuration.",
          "Review controller communication diagnostics."
        ]
      },
      {
        label: "Cannot ping the PLC",
        checks: [
          "Verify PLC and PC IP addresses.",
          "Check subnet masks.",
          "Verify routing and VLAN configuration.",
          "Check ICMP and firewall restrictions.",
          "Do not change production network settings without authorization."
        ]
      },
      {
        label: "Ping works but software cannot connect",
        checks: [
          "Verify PLC model and communication path.",
          "Check FactoryTalk Linx, RSLinx or CCW.",
          "Verify firmware and software compatibility.",
          "Check driver, firewall and VPN settings.",
          "Confirm the correct controller is selected."
        ]
      }
    ]
  }

};

/* ==========================================
   FAULT FINDER INTERFACE
========================================== */

function plcFaultFinderHTML() {
  return `
    <details class="calculator">
      <summary>Interactive PLC Fault Finder</summary>

      <div class="calculator-body">

        <h3>PLC Troubleshooting Assistant</h3>

        <p>
          Select the problem and your observation
          to receive a diagnostic checklist.
        </p>

        <label for="plcFaultSymptom">
          What problem are you experiencing?
        </label>

        <select id="plcFaultSymptom"
          onchange="plcFaultFinderChange()"
          style="width:100%;padding:12px;
                 margin:10px 0 15px;
                 background:white;color:#0f172a;">

          <option value="">Select a Problem</option>

          <option value="processor">
            PLC Processor Red Fault Light
          </option>

          <option value="startup">
            Machine Will Not Start
          </option>

          <option value="input">
            PLC Input Not Responding
          </option>

          <option value="inputVoltage">
            Verify Voltage at PLC Input
          </option>

          <option value="output">
            PLC Output Not Working
          </option>

          <option value="ethernet">
            PLC Ethernet Communication Failure
          </option>

        </select>

        <label for="plcFaultObservation">
          What do you observe?
        </label>

        <select id="plcFaultObservation"
          style="width:100%;padding:12px;
                 margin:10px 0 15px;
                 background:white;color:#0f172a;">

          <option value="">
            Select a Problem First
          </option>

        </select>

        <button type="button" class="action"
          onclick="plcFaultFinderDiagnose()">
          Diagnose Problem
        </button>

        <div id="plcFaultResult"
          aria-live="polite"
          style="margin-top:15px;">
          Select a problem to begin troubleshooting.
        </div>

        <details style="margin-top:15px;">
          <summary>
            24V DC Input Voltage Reference
          </summary>

          <div style="padding:12px;
                      background:#1e293b;
                      color:white;
                      border-radius:10px;
                      margin-top:8px;">

            <h4>PNP Sensor Example</h4>

            <p>
              Sensor ON: typically about +24V
              at the input relative to 0V common.
            </p>

            <p>
              Sensor OFF: typically close to 0V
              at the input relative to 0V common.
            </p>

            <h4>NPN Sensor Example</h4>

            <p>
              When active, the sensor typically
              pulls its output toward 0V.
              Verify the sourcing input's
              +24V common and measurement polarity.
            </p>

            <h4>Important</h4>

            <p>
              Actual ON and OFF thresholds
              vary by PLC and module.
              AC input modules require
              different voltage checks.
            </p>

          </div>
        </details>

        <p style="font-size:12px;opacity:0.75;">
          Training and diagnostic reference only.
          Energized electrical testing must be
          performed by qualified, authorized
          personnel following approved procedures.
          Use an appropriately rated meter and
          verify it before and after testing.
          Never bypass safety devices.
        </p>

      </div>
    </details>
  `;
}

/* ==========================================
   UPDATE OBSERVATION OPTIONS
========================================== */

function plcFaultFinderChange() {

  const symptom =
    document.getElementById(
      "plcFaultSymptom"
    ).value;

  const observation =
    document.getElementById(
      "plcFaultObservation"
    );

  const result =
    document.getElementById(
      "plcFaultResult"
    );

  observation.innerHTML =
    '<option value="">Select an Observation</option>';

  result.textContent =
    "Select an observation to continue.";

  const scenario = plcFaultScenarios[symptom];

  if (!scenario) return;

  scenario.observations.forEach(
    (item, index) => {

      const option =
        document.createElement("option");

      option.value = String(index);
      option.textContent = item.label;

      observation.appendChild(option);
    }
  );
}

/* ==========================================
   DISPLAY DIAGNOSTIC PROCEDURE
========================================== */

function plcFaultFinderDiagnose() {

  const symptom =
    document.getElementById(
      "plcFaultSymptom"
    ).value;

  const observation =
    document.getElementById(
      "plcFaultObservation"
    ).value;

  const result =
    document.getElementById(
      "plcFaultResult"
    );

  const scenario = plcFaultScenarios[symptom];

  if (!scenario || observation === "") {
    result.textContent =
      "Select both a problem and an observation.";
    return;
  }

  const finding =
    scenario.observations[
      Number(observation)
    ];

  if (!finding) return;

  result.replaceChildren();

  const panel =
    document.createElement("div");

  panel.style.cssText = `
    background:#0f172a;
    color:white;
    padding:16px;
    border-radius:12px;
    border:1px solid #475569;
  `;

  const title =
    document.createElement("h3");

  title.textContent = scenario.title;
  title.style.color = "#4ade80";

  const selected =
    document.createElement("p");

  selected.textContent =
    "Observation: " + finding.label;

  const heading =
    document.createElement("h4");

  heading.textContent =
    "Recommended Diagnostic Checks";

  const list =
    document.createElement("ol");

  finding.checks.forEach(check => {

    const item =
      document.createElement("li");

    item.textContent = check;
    item.style.marginBottom = "10px";

    list.appendChild(item);
  });

  const reminder =
    document.createElement("p");

  reminder.textContent =
    "These checks help narrow down the fault. " +
    "They do not establish a confirmed diagnosis.";

  reminder.style.cssText = `
    font-size:12px;
    color:#facc15;
  `;

  panel.append(
    title,
    selected,
    heading,
    list,
    reminder
  );

  result.appendChild(panel);
}
