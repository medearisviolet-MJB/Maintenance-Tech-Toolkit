/* INTERACTIVE VFD TROUBLESHOOTING */

const vfdTroubleGuides = {

  blank: {
    title: "Drive Display Is Blank",
    intro: "The drive keypad or display has no indication.",
    steps: [
      {
        title: "Check upstream power status",
        detail: "Review the disconnect, breaker, fuses and upstream supply status. Qualified personnel must use approved procedures for any voltage testing."
      },
      {
        title: "Check the incoming supply",
        detail: "Determine whether the correct input power is available for the drive rating. Investigate an open fuse, missing phase or supply interruption."
      },
      {
        title: "Check external control power",
        detail: "Some drives and control arrangements use separate control power. Verify the configuration and applicable supply."
      },
      {
        title: "Inspect the display connection",
        detail: "After safe isolation and DC bus discharge verification, inspect a removable keypad and its connections if permitted by the manual."
      },
      {
        title: "Review internal power faults",
        detail: "If correct supplies are confirmed but the display remains blank, follow the manufacturer's power-supply or control-board diagnostics."
      }
    ]
  },

  noStart: {
    title: "Drive Will Not Start",
    intro: "The VFD has a start request but does not run.",
    steps: [
      {
        title: "Read the drive status",
        detail: "Record any displayed fault, alarm, inhibit or Not Ready status before resetting anything."
      },
      {
        title: "Verify the command source",
        detail: "Determine whether the drive expects a run command from its keypad, digital input, PLC or industrial network."
      },
      {
        title: "Check the run request",
        detail: "Use drive diagnostics and PLC I/O monitoring to determine whether the expected start command is being received."
      },
      {
        title: "Check permissives and safety status",
        detail: "Inspect the approved stop, enable, interlock and STO status indications. Never jumper or defeat protective devices."
      },
      {
        title: "Verify the speed reference",
        detail: "Check whether the selected reference is zero or below the configured minimum running speed."
      },
      {
        title: "Review active faults",
        detail: "Identify the fault's root cause and the drive's reset or restart behavior before considering a reset."
      }
    ]
  },

  overcurrent: {
    title: "Overcurrent Fault",
    intro: "The drive detected excessive output current.",
    steps: [
      {
        title: "Record when the fault occurs",
        detail: "Determine whether it trips during starting, acceleration, steady running or a load change."
      },
      {
        title: "Inspect the mechanical load",
        detail: "After approved isolation, inspect for seized bearings, jams, binding conveyors, fan obstruction or excessive mechanical loading."
      },
      {
        title: "Review acceleration settings",
        detail: "Compare acceleration time and torque demand with the application requirements."
      },
      {
        title: "Verify motor parameters",
        detail: "Compare the programmed nameplate current, voltage, frequency and motor configuration with the installed motor."
      },
      {
        title: "Investigate motor and output wiring",
        detail: "After isolation and DC bus discharge verification, follow approved motor cable and insulation tests. Disconnect sensitive drive electronics before insulation testing."
      },
      {
        title: "Review drive sizing",
        detail: "Compare motor load current, overload duty and the VFD's applicable current rating."
      }
    ]
  },

  overvoltage: {
    title: "Overvoltage Fault",
    intro: "The DC bus voltage exceeded the drive limit.",
    steps: [
      {
        title: "Identify when the trip happens",
        detail: "Determine whether the fault occurs during deceleration, stopping or normal operation."
      },
      {
        title: "Review deceleration time",
        detail: "Rapid deceleration of a high-inertia load can regenerate energy into the DC bus. Review the programmed ramp against the application."
      },
      {
        title: "Investigate incoming supply",
        detail: "Review high line voltage or power transients using authorized diagnostic procedures."
      },
      {
        title: "Review braking equipment",
        detail: "Where fitted, inspect braking configuration and the condition of braking hardware under approved isolated procedures."
      },
      {
        title: "Evaluate load inertia",
        detail: "Determine whether the motor drives a high-inertia fan, centrifuge or other regenerative load."
      }
    ]
  },

  undervoltage: {
    title: "Undervoltage Fault",
    intro: "The DC bus voltage dropped below its allowed level.",
    steps: [
      {
        title: "Check incoming power",
        detail: "Investigate utility dips, supply interruptions and upstream switching events."
      },
      {
        title: "Check phase-loss indications",
        detail: "Review any evidence of a missing phase, open fuse or upstream protection operation."
      },
      {
        title: "Review supply loading",
        detail: "Determine whether large loads starting elsewhere cause voltage dips."
      },
      {
        title: "Review drive history",
        detail: "Compare the fault time with power events, machine operations and recorded supply alarms."
      },
      {
        title: "Check drive configuration",
        detail: "Review the manufacturer's low-voltage response and restart settings without bypassing protection."
      }
    ]
  },

  speed: {
    title: "Motor Speed Problem",
    intro: "The motor runs at an incorrect speed or does not respond to a speed command.",
    steps: [
      {
        title: "Check the actual frequency display",
        detail: "Compare the VFD output frequency with the commanded frequency reference."
      },
      {
        title: "Check the reference source",
        detail: "Verify whether speed comes from the keypad, HMI, PLC, analog input, preset speed or network."
      },
      {
        title: "Check analog signal configuration",
        detail: "Review 0-10V versus 4-20mA input selection, scaling and signal-loss status."
      },
      {
        title: "Check speed limits",
        detail: "Review minimum and maximum frequency, acceleration/deceleration limits and active preset-speed selections."
      },
      {
        title: "Review motor and load conditions",
        detail: "Check load current, current limiting, torque demand and motor nameplate configuration."
      }
    ]
  },

  network: {
    title: "VFD Communication Fault",
    intro: "The VFD has lost or cannot establish communication with its controller.",
    steps: [
      {
        title: "Record the communication alarm",
        detail: "Capture the complete fault code and the drive or adapter port involved."
      },
      {
        title: "Check physical connection status",
        detail: "Inspect cable and connector condition under approved procedures. Review link and activity indicators."
      },
      {
        title: "Review addressing and configuration",
        detail: "For Ethernet networks, compare IP addressing, subnet configuration and device identity with the design."
      },
      {
        title: "Check the PLC connection",
        detail: "Review the configured drive connection, controller status and associated Studio 5000 diagnostics where applicable."
      },
      {
        title: "Review adapter and timeout settings",
        detail: "Check communication adapter status and configured communication-loss actions."
      },
      {
        title: "Check network infrastructure",
        detail: "Review switch status, managed network diagnostics, damaged cables and relevant network events."
      }
    ]
  },

  overheat: {
    title: "Drive Overheating",
    intro: "The VFD reports a temperature or cooling fault.",
    steps: [
      {
        title: "Inspect cooling indications",
        detail: "Review drive temperature values, cooling alarms and fan status."
      },
      {
        title: "Inspect ventilation",
        detail: "After safe isolation, check for blocked airflow, clogged filters and dust accumulation."
      },
      {
        title: "Review ambient temperature",
        detail: "Compare enclosure temperature and drive installation conditions with manufacturer limits."
      },
      {
        title: "Check motor load current",
        detail: "Investigate continuous overload, excessive duty or operation beyond the drive's applicable rating."
      },
      {
        title: "Review drive cooling hardware",
        detail: "Follow manufacturer procedures for evaluating a failed fan or other cooling components."
      }
    ]
  }
};


/* LOAD THE SELECTED TROUBLESHOOTING GUIDE */

function loadVfdTroubleshooting() {

  const select = document.getElementById(
    "vfdTroubleSymptom"
  );

  const results = document.getElementById(
    "vfdTroubleResults"
  );

  const progressBox = document.getElementById(
    "vfdTroubleProgressBox"
  );

  if (!select || !results || !progressBox) return;

  results.replaceChildren();

  const guide = vfdTroubleGuides[select.value];

  if (!guide) {
    progressBox.style.display = "none";
    results.textContent =
      "Select a problem above to begin.";
    return;
  }

  progressBox.style.display = "block";

  const heading = document.createElement("h3");
  heading.textContent = guide.title;
  heading.style.color = "#38bdf8";

  const intro = document.createElement("p");
  intro.textContent = guide.intro;

  const stepHeading = document.createElement("h4");
  stepHeading.textContent = "Diagnostic Checklist";

  results.append(heading, intro, stepHeading);

  guide.steps.forEach((step, index) => {

    const row = document.createElement("label");

    row.style.display = "flex";
    row.style.alignItems = "flex-start";
    row.style.gap = "12px";
    row.style.padding = "14px";
    row.style.margin = "10px 0";
    row.style.borderRadius = "9px";
    row.style.border = "1px solid #475569";
    row.style.background = "#172338";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "vfd-trouble-check";
    checkbox.style.width = "20px";
    checkbox.style.height = "20px";
    checkbox.style.flexShrink = "0";
    checkbox.style.margin = "2px 0";

    checkbox.addEventListener(
      "change",
      updateVfdTroubleProgress
    );

    const textBox = document.createElement("div");

    const title = document.createElement("strong");
    title.textContent =
      "Step " + (index + 1) + ": " + step.title;

    const description = document.createElement("p");
    description.textContent = step.detail;
    description.style.color = "#cbd5e1";
    description.style.fontSize = "14px";
    description.style.marginBottom = "0";

    textBox.append(title, description);
    row.append(checkbox, textBox);
    results.appendChild(row);
  });

  const note = document.createElement("p");
  note.textContent =
    "After reviewing the checks, document findings, " +
    "identify the root cause and follow the approved " +
    "repair and return-to-service procedure.";

  note.style.color = "#94a3b8";
  results.appendChild(note);

  updateVfdTroubleProgress();
}


/* UPDATE CHECKLIST PROGRESS */

function updateVfdTroubleProgress() {

  const results = document.getElementById(
    "vfdTroubleResults"
  );

  const progress = document.getElementById(
    "vfdTroubleProgress"
  );

  const bar = document.getElementById(
    "vfdTroubleBar"
  );

  if (!results || !progress || !bar) return;

  const boxes = results.querySelectorAll(
    ".vfd-trouble-check"
  );

  const checked = results.querySelectorAll(
    ".vfd-trouble-check:checked"
  );

  const total = boxes.length;
  const complete = checked.length;

  const percent = total
    ? Math.round((complete / total) * 100)
    : 0;

  progress.textContent =
    complete + " of " + total +
    " diagnostic checks reviewed (" + percent + "%)";

  bar.style.width = percent + "%";
}

/* ADVANCED VFD DIAGNOSTIC ASSISTANT */

function addVfdDiagnosticAssistant() {

  // Find our existing troubleshooting section.
  const symptomSelect =
    document.getElementById("vfdTroubleSymptom");

  if (!symptomSelect) return;

  
const diagnosticTab =
  symptomSelect.closest("details.calculator");

const troubleshooting =
  diagnosticTab?.parentElement?.closest("details.calculator");


  const body = troubleshooting?.querySelector(
    ":scope > .calculator-body"
  );

  if (!body || document.getElementById("vfdWizard")) {
    return;
  }

  // Create a separate collapsible assistant.
  const wizard = document.createElement("details");
  wizard.className = "calculator";
  wizard.id = "vfdWizard";

  wizard.innerHTML = `
    <summary>🧠 Advanced VFD Diagnostic Assistant</summary>
    <div class="calculator-body">

      <h3>Interactive Drive Diagnosis</h3>
      <p>
        Answer questions about the drive's
        actual status to narrow down
        possible problem areas.
      </p>

      <label for="vfdWizardModel">VFD Model</label>
      <select id="vfdWizardModel"
              style="width:100%;padding:13px;
                     border-radius:8px;margin:8px 0;">
        <option>PowerFlex 525</option>
        <option>PowerFlex 753</option>
        <option>Other VFD</option>
      </select>

      <label for="vfdWizardFault">
        Fault Code (optional)
      </label>
      <input id="vfdWizardFault"
             placeholder="Enter displayed fault code">

      <p id="vfdWizardTrail"
         style="color:#94a3b8;font-size:13px"></p>

      <div id="vfdWizardScreen"
           aria-live="polite"></div>

      <div style="display:flex;gap:10px">
        <button type="button" class="action"
                id="vfdWizardBack">
          Back
        </button>
        <button type="button" class="action"
                id="vfdWizardRestart">
          Restart
        </button>
      </div>

      <h3>Technician Notes</h3>
      <textarea id="vfdWizardNotes"
                rows="3"
                placeholder="Record findings, readings and observations..."
                style="width:100%;padding:12px;
                       border-radius:8px;
                       background:#0f172a;
                       border:1px solid #64748b;
                       color:white"></textarea>

      <button type="button" class="action"
              id="vfdWizardCopy">
        Copy Diagnostic Report
      </button>

      <p id="vfdWizardCopyStatus"
         aria-live="polite"></p>

      <p style="font-size:12px;color:#94a3b8">
        Diagnostic aid only, not a definitive
        diagnosis. Observe drive status using
        approved methods. Do not force outputs,
        bypass safety circuits or restart equipment
        without authorization. Isolate hazardous
        energy and verify DC bus discharge before
        servicing electrical components.
      </p>

    </div>
  `;

  body.appendChild(wizard);

  const screen = wizard.querySelector("#vfdWizardScreen");
  const trail = wizard.querySelector("#vfdWizardTrail");
  const back = wizard.querySelector("#vfdWizardBack");
  const restart = wizard.querySelector("#vfdWizardRestart");
  const copy = wizard.querySelector("#vfdWizardCopy");
  const copyStatus =
    wizard.querySelector("#vfdWizardCopyStatus");

  // Each answer leads to another question
  // or a recommended diagnostic area.
  const questions = {

    power: {
      text: "Is the VFD display powered and responsive?",
      answers: [
        ["Yes", "fault"],
        ["No", "noPower"],
        ["Not sure", "verifyPower"]
      ]
    },

    fault: {
      text: "Does the drive show an active fault or trip?",
      answers: [
        ["Yes", "activeFault"],
        ["No", "run"],
        ["Not sure", "verifyFault"]
      ]
    },

    run: {
      text: "When motion is requested, does the drive indicate RUN?",
      answers: [
        ["Yes", "frequency"],
        ["No", "command"],
        ["Not sure", "verifyRun"]
      ]
    },

    command: {
      text: "Does the VFD show the expected start command in its input or network diagnostics?",
      answers: [
        ["Yes", "permissives"],
        ["No", "missingCommand"],
        ["Not sure", "verifyCommand"]
      ]
    },

    permissives: {
      text: "Do the drive diagnostics show the required stop, enable and safety conditions are satisfied?",
      answers: [
        ["Yes", "driveInhibit"],
        ["No", "interlockIssue"],
        ["Not sure", "verifyPermissives"]
      ]
    },

    frequency: {
      text: "With RUN indicated, is actual drive output frequency above 0 Hz?",
      answers: [
        ["Yes", "motor"],
        ["No", "zeroFrequency"],
        ["Not sure", "verifyFrequency"]
      ]
    },

    motor: {
      text: "Is the motor physically rotating?",
      answers: [
        ["Yes", "speed"],
        ["No", "noMotorMotion"],
        ["Not sure", "verifyMotor"]
      ]
    },

    speed: {
      text: "Is motor speed approximately correct for the application?",
      answers: [
        ["Yes", "normalOperation"],
        ["No", "speedProblem"],
        ["Not sure", "verifySpeed"]
      ]
    }
  };


  /* DIAGNOSTIC RESULTS */

  const outcomes = {

    noPower: {
      title: "Drive Supply / Control Power",
      reason: "The keypad is not displaying an operating status.",
      checks: [
        "Review upstream disconnect and protection status.",
        "Check incoming supply conditions using approved procedures.",
        "Check external control-power requirements, if applicable.",
        "Follow the manufacturer power-supply diagnostics."
      ]
    },

    verifyPower: {
      title: "Confirm Drive Power Status",
      reason: "The drive power state is not yet known.",
      checks: [
        "Observe the keypad and status indicators.",
        "Review HMI and upstream power indications.",
        "Identify the installed drive's normal power-up indications."
      ]
    },

    activeFault: {
      title: "Active VFD Fault",
      reason: "A drive trip is present.",
      checks: [
        "Record the complete fault code and description.",
        "Open the matching drive's Fault Code Library.",
        "Review fault history and operating conditions.",
        "Identify and correct the cause before considering a reset.",
        "Check for automatic restart behavior before servicing."
      ]
    },

    verifyFault: {
      title: "Confirm Fault / Inhibit Status",
      reason: "The drive trip state is uncertain.",
      checks: [
        "Review the keypad fault and alarm displays.",
        "Check active fault and inhibit indications.",
        "Record any displayed status before changing settings."
      ]
    },

    verifyRun: {
      title: "Confirm Drive RUN Status",
      reason: "It is unclear whether the drive accepted a run request.",
      checks: [
        "Review the drive RUN and READY indications.",
        "Compare the machine run request with the drive's actual state.",
        "Review the configured start source."
      ]
    },

    missingCommand: {
      title: "Missing Start Command",
      reason: "The expected start signal is not visible at the drive.",
      checks: [
        "Check the selected local, terminal or network start source.",
        "Review PLC output and machine sequence status.",
        "Inspect configured digital-input status in drive diagnostics.",
        "For network control, review communication and command status."
      ]
    },

    verifyCommand: {
      title: "Trace the Start Signal",
      reason: "The start-command path has not been confirmed.",
      checks: [
        "Identify the configured start source.",
        "Review drive input or communication diagnostics.",
        "Compare PLC logic status with the drive's received command."
      ]
    },

    interlockIssue: {
      title: "Stop / Enable / Safety Inhibit",
      reason: "One or more required conditions are not satisfied.",
      checks: [
        "Review the active drive inhibit or stop indication.",
        "Check the status of required permissives.",
        "Inspect the approved STO and safety-system diagnostics.",
        "Investigate the cause without bypassing a safety function."
      ]
    },

    verifyPermissives: {
      title: "Confirm Permissive Status",
      reason: "Required enable conditions have not been established.",
      checks: [
        "Review the drive's enable, stop and inhibit status.",
        "Check the approved safety-system status.",
        "Compare configured digital-input functions with the design."
      ]
    },

    driveInhibit: {
      title: "Drive Configuration / Inhibit Logic",
      reason: "A start signal appears present but RUN is not established.",
      checks: [
        "Review the configured command source and drive control mode.",
        "Check start-inhibit and stop-mode diagnostics.",
        "Review sequencing and command transitions.",
        "Check the drive manual for model-specific permissives."
      ]
    },

    zeroFrequency: {
      title: "Zero Output Frequency",
      reason: "The drive indicates RUN but output frequency is zero.",
      checks: [
        "Check the selected speed reference source.",
        "Review the active frequency setpoint.",
        "Inspect analog input or network reference status.",
        "Review preset speed selections and frequency limits.",
        "Check for active current limits or other operating restrictions."
      ]
    },

    verifyFrequency: {
      title: "Confirm Actual Output Frequency",
      reason: "The drive's output frequency has not been confirmed.",
      checks: [
        "Read actual output frequency from drive diagnostics.",
        "Compare output frequency with the frequency reference.",
        "Check acceleration and operating status."
      ]
    },

    noMotorMotion: {
      title: "Motor / Output / Mechanical Path",
      reason: "The drive indicates output frequency but no motor motion was observed.",
      checks: [
        "Review output current and any phase-loss indications.",
        "Review the motor command and drive status.",
        "After safe isolation, inspect motor cables and connections.",
        "Inspect the motor and mechanical load for binding.",
        "Follow manufacturer testing procedures before restarting."
      ]
    },

    verifyMotor: {
      title: "Confirm Motor Response",
      reason: "Physical motor operation has not been established.",
      checks: [
        "Observe motor and load movement from a safe, guarded location.",
        "Review available speed or rotation feedback.",
        "Compare drive frequency and current indications."
      ]
    },

    speedProblem: {
      title: "Speed Reference / Scaling Problem",
      reason: "Motor operation does not match the requested process speed.",
      checks: [
        "Compare output frequency with the selected reference.",
        "Check 0-10V or 4-20mA scaling, if used.",
        "Review PLC and HMI speed commands.",
        "Check preset speeds and minimum/maximum limits.",
        "Investigate loading, motor slip and current limiting."
      ]
    },

    verifySpeed: {
      title: "Verify Actual Speed",
      reason: "Motor speed has not been confirmed.",
      checks: [
        "Compare the commanded and output frequencies.",
        "Review available motor or process speed feedback.",
        "Confirm the required speed for the application."
      ]
    },

    normalOperation: {
      title: "No Obvious Command / Speed Mismatch",
      reason: "The reported drive status and motor response appear consistent.",
      checks: [
        "Record commanded and actual frequency.",
        "Check whether a separate machine or process fault remains.",
        "Review intermittent alarms or historical events.",
        "Follow the normal verification and return-to-service procedure."
      ]
    }
  };


  /* NAVIGATION AND RENDERING */

  let current = "power";
  let history = [];

  function render() {

    screen.replaceChildren();

    back.disabled = history.length === 0;

    trail.textContent = history.length
      ? "Questions answered: " + history.length
      : "Start of diagnostic";

    const question = questions[current];

    if (question) {

      const heading = document.createElement("h3");
      heading.textContent = question.text;
      heading.style.color = "#38bdf8";
      screen.appendChild(heading);

      question.answers.forEach(([answer, next]) => {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "action";
        button.textContent = answer;

        button.addEventListener("click", () => {

          history.push({
            node: current,
            question: question.text,
            answer: answer
          });

          current = next;
          copyStatus.textContent = "";
          render();
        });

        screen.appendChild(button);
      });

      return;
    }

    const result = outcomes[current];
    if (!result) return;

    const heading = document.createElement("h3");
    heading.textContent =
      "🔍 Suggested Diagnostic Area";
    heading.style.color = "#38bdf8";

    const title = document.createElement("h3");
    title.textContent = result.title;
    title.style.color = "#4ade80";

    const reason = document.createElement("p");
    reason.textContent = result.reason;

    const listHeading = document.createElement("h4");
    listHeading.textContent = "Recommended Checks";

    const list = document.createElement("ol");

    result.checks.forEach(check => {
      const item = document.createElement("li");
      item.textContent = check;
      item.style.margin = "10px 0";
      list.appendChild(item);
    });

    screen.append(
      heading,
      title,
      reason,
      listHeading,
      list
    );
  }

  back.addEventListener("click", () => {

    if (!history.length) return;

    const previous = history.pop();
    current = previous.node;
    copyStatus.textContent = "";
    render();
  });

  restart.addEventListener("click", () => {
    current = "power";
    history = [];
    copyStatus.textContent = "";
    render();
  });


  /* COPY TECHNICIAN DIAGNOSTIC REPORT */

  copy.addEventListener("click", async () => {

    const model =
      wizard.querySelector("#vfdWizardModel").value;

    const fault =
      wizard.querySelector("#vfdWizardFault").value.trim();

    const notes =
      wizard.querySelector("#vfdWizardNotes").value.trim();

    const result = outcomes[current];

    const report = [
      "MAINTENANCE TECH TOOLKIT",
      "VFD DIAGNOSTIC REPORT",
      "",
      "Model: " + model,
      "Fault Code: " + (fault || "Not recorded"),
      "",
      "Diagnostic Answers:",
      ...history.map((entry, index) =>
        (index + 1) + ". " +
        entry.question + " - " + entry.answer
      ),
      "",
      "Suggested Diagnostic Area:",
      result ? result.title : "Diagnosis in progress",
      "",
      "Recommended Checks:",
      ...(result
        ? result.checks.map((check, i) =>
            (i + 1) + ". " + check
          )
        : ["Complete the diagnostic questions."]),
      "",
      "Technician Notes:",
      notes || "None recorded",
      "",
      "Advisory: Preliminary diagnostic guidance only."
    ].join("\n");

    try {
      await navigator.clipboard.writeText(report);
      copyStatus.textContent =
        "Diagnostic report copied to clipboard.";
      copyStatus.style.color = "#4ade80";
    } catch (error) {
      copyStatus.textContent =
        "Clipboard unavailable. Check browser permissions.";
      copyStatus.style.color = "#f87171";
    }
  });

  render();
}