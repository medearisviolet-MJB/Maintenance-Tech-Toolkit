/* POWERFLEX 525 FAULT CODE LIBRARY */

const pf525Faults = [
  {
    code: "F002",
    name: "Auxiliary Input",
    cause: "External auxiliary fault input activated.",
    checks: "Inspect remote fault contacts, field wiring and programmed input functions."
  },
  {
    code: "F003",
    name: "Power Loss",
    cause: "Incoming power interruption or low supply voltage.",
    checks: "Check incoming line voltage, supply stability and upstream fuses."
  },
  {
    code: "F004",
    name: "UnderVoltage",
    cause: "DC bus voltage dropped below the drive limit.",
    checks: "Investigate low incoming voltage, supply interruptions and power quality."
  },
  {
    code: "F005",
    name: "OverVoltage",
    cause: "DC bus voltage exceeded the drive limit.",
    checks: "Check high incoming voltage, transients and regenerative energy during deceleration. Review decel time and braking requirements."
  },
  {
    code: "F006",
    name: "Motor Stalled",
    cause: "Motor load prevented normal acceleration or operation.",
    checks: "Inspect mechanical loading, acceleration settings and current limit configuration."
  },
  {
    code: "F007",
    name: "Motor Overload",
    cause: "Electronic motor overload protection operated.",
    checks: "Check motor loading, nameplate current, P033 Motor OL Current and boost settings."
  },
  {
    code: "F008",
    name: "Heatsink OvrTmp",
    cause: "Drive heatsink temperature exceeded its limit.",
    checks: "Inspect cooling fan, heatsink blockage and ambient temperature."
  },
  {
    code: "F009",
    name: "CC OvrTmp",
    cause: "Control circuitry temperature exceeded its limit.",
    checks: "Check ambient temperature, airflow, dirt buildup and fan operation."
  },
  {
    code: "F012",
    name: "HW OverCurrent",
    cause: "Hardware overcurrent protection operated.",
    checks: "Investigate excessive load, motor conditions, boost settings and DC braking configuration."
  },
  {
    code: "F013",
    name: "Ground Fault",
    cause: "Drive detected a ground fault on the output.",
    checks: "After safe isolation and discharge verification, inspect motor leads and motor insulation using approved test procedures. Disconnect the drive before insulation testing."
  },
  {
    code: "F015",
    name: "Load Loss",
    cause: "Drive detected a load-loss condition.",
    checks: "Inspect the motor-to-load connection and configured load-loss detection settings."
  },
  {
    code: "F021",
    name: "Output Ph Loss",
    cause: "Loss of a motor output phase.",
    checks: "Inspect motor connections, wiring continuity and the motor after isolation."
  },
  {
    code: "F029",
    name: "Analog In Loss",
    cause: "Configured analog reference signal was lost.",
    checks: "Inspect 0-10V or 4-20mA signal wiring, source device, input configuration and signal-loss parameters."
  },
  {
    code: "F033",
    name: "Auto Rstrt Tries",
    cause: "Automatic restart attempts were exhausted.",
    checks: "Identify and correct the original fault before considering a manual reset."
  },
  {
    code: "F038",
    name: "Phase U to Gnd",
    cause: "Ground fault involving motor output phase U.",
    checks: "Inspect phase U motor lead and motor insulation after safe isolation."
  },
  {
    code: "F039",
    name: "Phase V to Gnd",
    cause: "Ground fault involving motor output phase V.",
    checks: "Inspect phase V motor lead and motor insulation after safe isolation."
  },
  {
    code: "F040",
    name: "Phase W to Gnd",
    cause: "Ground fault involving motor output phase W.",
    checks: "Inspect phase W motor lead and motor insulation after safe isolation."
  },
  {
    code: "F041",
    name: "Phase UV Short",
    cause: "Short-circuit condition involving U and V outputs.",
    checks: "Inspect output cables and motor windings after safe isolation."
  },
  {
    code: "F042",
    name: "Phase UW Short",
    cause: "Short-circuit condition involving U and W outputs.",
    checks: "Inspect output cables and motor windings after safe isolation."
  },
  {
    code: "F043",
    name: "Phase VW Short",
    cause: "Short-circuit condition involving V and W outputs.",
    checks: "Inspect output cables and motor windings after safe isolation."
  },
  {
    code: "F048",
    name: "Params Defaulted",
    cause: "Drive parameters were reset to defaults.",
    checks: "Review and restore the approved application parameter configuration before returning to service."
  },
  {
    code: "F059",
    name: "Safety Open",
    cause: "Required drive safety input conditions are not satisfied.",
    checks: "Check the safety relay, E-stop/guard circuit, safety input status and approved safety design. Never jumper around an active safety function."
  },
  {
    code: "F063",
    name: "SW OverCurrent",
    cause: "Software current protection operated.",
    checks: "Inspect mechanical loading, motor-to-load connection and current-related settings."
  },
  {
    code: "F064",
    name: "Drive Overload",
    cause: "Drive overload protection operated.",
    checks: "Check drive sizing, motor loading, acceleration time and operating duty."
  },
  {
    code: "F070",
    name: "Power Unit",
    cause: "Drive power section fault detected.",
    checks: "Inspect ambient temperature and cooling conditions. Follow manufacturer diagnostics before determining whether drive replacement is required."
  },
  {
    code: "F071",
    name: "DSI Net Loss",
    cause: "DSI or Modbus network control was interrupted.",
    checks: "Inspect communication wiring, network master and communication settings."
  },
  {
    code: "F072",
    name: "Opt Net Loss",
    cause: "Network connection through an option adapter was interrupted.",
    checks: "Inspect adapter configuration, communication cabling and network status."
  },
  {
    code: "F073",
    name: "EN Net Loss",
    cause: "Embedded EtherNet/IP network control was interrupted.",
    checks: "Check Ethernet cabling, switches, PLC communication and drive network configuration."
  },
  {
    code: "F080",
    name: "Autotune Failure",
    cause: "Motor autotune was canceled or unsuccessful.",
    checks: "Verify motor data, autotune prerequisites and drive configuration before repeating the procedure."
  },
  {
    code: "F081",
    name: "DSI Comm Loss",
    cause: "DSI communication fault detected.",
    checks: "Inspect DSI/Modbus communication wiring, master status and communication-loss settings."
  },
  {
    code: "F083",
    name: "EN Comm Loss",
    cause: "EtherNet/IP communication fault detected.",
    checks: "Inspect the Ethernet connection, drive IP configuration, switches and controller communication."
  },
  {
    code: "F091",
    name: "Encoder Loss",
    cause: "Configured encoder feedback was lost.",
    checks: "Inspect encoder supply, feedback wiring, signal integrity and feedback configuration."
  },
  {
    code: "F094",
    name: "Function Loss",
    cause: "Configured function-loss input became inactive.",
    checks: "Inspect the function-loss input circuit and determine why the input opened."
  },
  {
    code: "F111",
    name: "Safety Hardware",
    cause: "Safety input hardware or enable discrepancy detected.",
    checks: "Inspect safety input status and the approved safety circuit. Follow Rockwell safety diagnostics and do not defeat safety devices."
  },
  {
    code: "F114",
    name: "uC Failure",
    cause: "Control module processor fault.",
    checks: "Follow Rockwell fault recovery procedures. Control module service or replacement may be required."
  },
  {
    code: "F122",
    name: "I/O Board Fail",
    cause: "Internal I/O board failure detected.",
    checks: "Follow manufacturer diagnostics. Drive or control module replacement may be required."
  }
];

/* SEARCH AND DISPLAY FAULTS */

function searchPF525Faults() {
  const input = document.getElementById("pf525Search");
  const results = document.getElementById("pf525FaultResults");
  const counter = document.getElementById("pf525Count");

  if (!input || !results || !counter) return;

  const query = input.value.trim().toLowerCase();

  // Keep fault codes hidden until a search is entered.
  if (query === "") {
    results.replaceChildren();
    counter.textContent =
      "Enter a fault code or keyword to search.";
    return;
  }

  const matches = pf525Faults.filter(fault => {
    const searchable = [
      fault.code,
      fault.name,
      fault.cause,
      fault.checks
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });

  results.replaceChildren();

  counter.textContent =
    matches.length + " of " +
    pf525Faults.length + " faults displayed";

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.textContent =
      "No matching fault found in this library.";
    results.appendChild(empty);
    return;
  }

  matches.forEach(fault => {
    const details = document.createElement("details");
    details.className = "calculator";

    const summary = document.createElement("summary");
    summary.textContent =
      fault.code + " - " + fault.name;

    const body = document.createElement("div");
    body.className = "calculator-body";

    const causeTitle = document.createElement("h4");
    causeTitle.textContent = "Possible Cause";

    const cause = document.createElement("p");
    cause.textContent = fault.cause;

    const checkTitle = document.createElement("h4");
    checkTitle.textContent = "Troubleshooting Checks";

    const checks = document.createElement("p");
    checks.textContent = fault.checks;

    body.append(
      causeTitle,
      cause,
      checkTitle,
      checks
    );

    details.append(summary, body);
    results.appendChild(details);
  });
}

function clearPF525Search() {
  const input = document.getElementById("pf525Search");
  if (!input) return;

  input.value = "";
  searchPF525Faults();
  input.focus();
}
/* POWERFLEX 753 FAULT LIBRARY */

const pf753Faults = [
  {
    code: "2",
    name: "Auxiliary Input",
    cause: "An auxiliary fault or interlock input is open.",
    checks: "Inspect the configured auxiliary input, external permissives and field wiring."
  },
  {
    code: "3",
    name: "Power Loss",
    cause: "The drive detected an incoming power-loss condition.",
    checks: "Investigate supply interruptions, incoming voltage and upstream protection."
  },
  {
    code: "4",
    name: "UnderVoltage",
    cause: "DC bus voltage dropped below the permitted level.",
    checks: "Check incoming voltage, supply stability and power interruptions."
  },
  {
    code: "5",
    name: "OverVoltage",
    cause: "DC bus voltage exceeded the drive limit.",
    checks: "Check input voltage, regenerative loads, braking arrangements and deceleration settings."
  },
  {
    code: "7",
    name: "Motor Overload",
    cause: "Motor thermal overload protection operated.",
    checks: "Check mechanical load, motor nameplate current and motor overload configuration."
  },
  {
    code: "8",
    name: "Heatsink OvrTemp",
    cause: "Drive heatsink temperature exceeded its limit.",
    checks: "Inspect airflow, fans, cooling passages and ambient temperature."
  },
  {
    code: "10",
    name: "DynBrake OvrTemp",
    cause: "Dynamic braking thermal protection was activated.",
    checks: "Review braking duty, deceleration demands and brake resistor configuration."
  },
  {
    code: "12",
    name: "HW OverCurrent",
    cause: "Hardware overcurrent protection activated.",
    checks: "Investigate mechanical loading, acceleration, motor wiring and drive configuration."
  },
  {
    code: "13",
    name: "Ground Fault",
    cause: "The drive detected an output ground fault.",
    checks: "After isolation and discharge verification, inspect output wiring and motor insulation. Disconnect the drive before insulation testing."
  },
  {
    code: "17",
    name: "Input Phase Loss",
    cause: "The drive detected an input phase-loss condition.",
    checks: "Check incoming three-phase supply, fuses and connection integrity using approved procedures."
  },
  {
    code: "21",
    name: "Output PhaseLoss",
    cause: "A motor output phase-loss condition was detected.",
    checks: "Inspect motor connections, output wiring and the motor after safe isolation."
  },
  {
    code: "24",
    name: "Decel Inhibit",
    cause: "The drive inhibited deceleration under its configured conditions.",
    checks: "Review deceleration settings, DC bus conditions and regenerative loading."
  },
  {
    code: "29",
    name: "Analog In Loss",
    cause: "A configured analog input signal was lost.",
    checks: "Verify the configured analog channel, signal source, wiring and loss-action settings."
  },
  {
    code: "33",
    name: "AuRsts Exhausted",
    cause: "Automatic restart attempts were exhausted.",
    checks: "Identify the underlying fault before considering another reset or restart."
  },
  {
    code: "64",
    name: "Drive OverLoad",
    cause: "Drive overload protection operated.",
    checks: "Review load current, drive sizing, acceleration and duty cycle."
  },
  {
    code: "80",
    name: "AutoTune Aborted",
    cause: "The motor autotune procedure was interrupted.",
    checks: "Check motor data, autotune prerequisites and conditions that caused the procedure to stop."
  },
  {
    code: "84",
    name: "Port 4 DPI Loss",
    cause: "Communication with the device at Port 4 was lost.",
    checks: "Check the installed port device, connections, module power and related communication settings."
  },
  {
    code: "93",
    name: "Hw Enable Check",
    cause: "The hardware-enable configuration requires investigation.",
    checks: "Review hardware enable circuitry and drive configuration against the approved design."
  },
  {
    code: "211",
    name: "Safety Brd Fault",
    cause: "A fault was reported by the safety board.",
    checks: "Follow Rockwell safety-board diagnostics. Do not bypass or defeat the safety system."
  },
  {
    code: "224",
    name: "Port 4 Comm Loss",
    cause: "Communication loss involving Port 4 was detected.",
    checks: "Inspect the Port 4 adapter, connections, module status and network configuration."
  }
];


/* POWERFLEX 753 SEARCH */

function searchPF753Faults() {
  const input = document.getElementById("pf753Search");
  const results = document.getElementById("pf753FaultResults");
  const counter = document.getElementById("pf753Count");

  if (!input || !results || !counter) return;

  const query = input.value.trim().toLowerCase();
  results.replaceChildren();

  // Keep results hidden until searched.
  if (query === "") {
    counter.textContent =
      "Enter a fault code or keyword to search.";
    return;
  }

  const matches = pf753Faults.filter(fault => {
    const searchable = [
      fault.code,
      fault.name,
      fault.cause,
      fault.checks
    ].join(" ").toLowerCase();

    return searchable.includes(query);
  });

  counter.textContent =
    matches.length + " matching fault(s)";

  if (matches.length === 0) {
    const empty = document.createElement("p");
    empty.textContent =
      "No matching fault found in this starter library.";
    results.appendChild(empty);
    return;
  }

  matches.forEach(fault => {
    const details = document.createElement("details");
    details.className = "calculator";

    const summary = document.createElement("summary");
    summary.textContent =
      fault.code + " - " + fault.name;

    const body = document.createElement("div");
    body.className = "calculator-body";

    const causeTitle = document.createElement("h4");
    causeTitle.textContent = "Possible Cause";

    const causeText = document.createElement("p");
    causeText.textContent = fault.cause;

    const checkTitle = document.createElement("h4");
    checkTitle.textContent = "Troubleshooting Checks";

    const checkText = document.createElement("p");
    checkText.textContent = fault.checks;

    body.append(
      causeTitle,
      causeText,
      checkTitle,
      checkText
    );

    details.append(summary, body);
    results.appendChild(details);
  });
}

function clearPF753Search() {
  const input = document.getElementById("pf753Search");
  if (!input) return;

  input.value = "";
  searchPF753Faults();
  input.focus();
}

