function calculate() {
  const vText = document.getElementById("voltage").value;
  const rText = document.getElementById("resistance").value;
  const result = document.getElementById("result");

  if (vText === "" || rText === "") {
    result.textContent = "Enter voltage and resistance.";
    return;
  }

  const voltage = Number(vText);
  const resistance = Number(rText);

  if (!Number.isFinite(voltage) ||
      !Number.isFinite(resistance) ||
      resistance <= 0) {
    result.textContent = "Enter a resistance greater than zero.";
    return;
  }

  const current = voltage / resistance;
  result.textContent = "Current: " +
    Number(current.toFixed(4)) + " Amps";
}

function calculateMotorCurrent() {
  const hpText = document.getElementById("motorHP").value;
  const voltageText = document.getElementById("motorVoltage").value;
  const efficiencyText =
    document.getElementById("motorEfficiency").value;
  const pfText = document.getElementById("motorPF").value;
  const result = document.getElementById("motorResult");

  if ([hpText, voltageText, efficiencyText, pfText]
      .some(value => value.trim() === "")) {
    result.textContent = "Enter all motor values.";
    return;
  }

  const hp = Number(hpText);
  const voltage = Number(voltageText);
  const efficiency = Number(efficiencyText) / 100;
  const pf = Number(pfText);

  if (
    ![hp, voltage, efficiency, pf].every(Number.isFinite) ||
    hp <= 0 ||
    voltage <= 0 ||
    efficiency <= 0 ||
    efficiency > 1 ||
    pf <= 0 ||
    pf > 1
  ) {
    result.textContent = "Check your motor values.";
    return;
  }

  const amps = (hp * 746) /
    (Math.sqrt(3) * voltage * efficiency * pf);

  result.textContent =
    "Estimated Motor Current: " +
    amps.toFixed(2) + " Amps";

}

function calculateVoltageDrop() {
  const result = document.getElementById("vdResult");

  const phase = document.getElementById("vdPhase").value;
  const vText = document.getElementById("vdVoltage").value;
  const aText = document.getElementById("vdAmps").value;
  const lText = document.getElementById("vdLength").value;
  const material = document.getElementById("vdMaterial").value;
  const wire = document.getElementById("vdWire").value;

  if ([vText, aText, lText].some(x => x.trim() === "")) {
    result.textContent = "Enter all required values.";
    return;
  }

  const voltage = Number(vText);
  const amps = Number(aText);
  const length = Number(lText);

  if (![voltage, amps, length].every(Number.isFinite) ||
      voltage <= 0 || amps <= 0 || length < 0) {
    result.textContent = "Check voltage, current, and length.";
    return;
  }

  // Approximate conductor DC resistance at 75 C,
  // in ohms per 1,000 feet.
  const resistance = {
    copper: {
      "14": 3.07, "12": 1.93, "10": 1.21,
      "8": 0.778, "6": 0.491, "4": 0.308,
      "2": 0.194, "1/0": 0.122,
      "2/0": 0.0967, "3/0": 0.0766,
      "4/0": 0.0608, "250": 0.0515,
      "300": 0.0435, "350": 0.0378
    },
    aluminum: {
      "14": 5.04, "12": 3.17, "10": 1.99,
      "8": 1.28, "6": 0.808, "4": 0.508,
      "2": 0.319, "1/0": 0.201,
      "2/0": 0.159, "3/0": 0.126,
      "4/0": 0.100, "250": 0.0847,
      "300": 0.0715, "350": 0.0620
    }
  };

  const ohms = resistance[material][wire];
  const multiplier = phase === "3" ? Math.sqrt(3) : 2;

  const drop = multiplier * amps * length * ohms / 1000;
  const percent = (drop / voltage) * 100;
  const loadVoltage = voltage - drop;

  const message = percent > 3
    ? "Above the common 3% voltage-drop design target."
    : "At or below the common 3% design target.";

  result.innerHTML =
    "<strong>Voltage Drop:</strong> " + drop.toFixed(2) + " V<br>" +
    "<strong>Percentage Drop:</strong> " + percent.toFixed(2) + "%<br>" +
    "<strong>Estimated Load Voltage:</strong> " +
    loadVoltage.toFixed(2) + " V<br>" +
    "<small>" + message + "</small>";
}

function calculateTransformer() {
  const result = document.getElementById("trResult");

  const phase = document.getElementById("trPhase").value;
  const kvaText = document.getElementById("trKVA").value.trim();
  const primaryText = document.getElementById("trPrimary").value.trim();
  const secondaryText = document.getElementById("trSecondary").value.trim();

  if ([kvaText, primaryText, secondaryText].some(x => x === "")) {
    result.textContent = "Enter all transformer values.";
    return;
  }

  const kva = Number(kvaText);
  const primaryV = Number(primaryText);
  const secondaryV = Number(secondaryText);

  if (![kva, primaryV, secondaryV].every(Number.isFinite) ||
      kva <= 0 || primaryV <= 0 || secondaryV <= 0) {
    result.textContent = "All values must be greater than zero.";
    return;
  }

  const phaseFactor = phase === "3" ? Math.sqrt(3) : 1;

  const primaryAmps = (kva * 1000) / (phaseFactor * primaryV);
  const secondaryAmps = (kva * 1000) / (phaseFactor * secondaryV);

  const ratio = primaryV / secondaryV;

  const transformerType = primaryV > secondaryV ? "Step-down" :
                          primaryV < secondaryV ? "Step-up" :
                          "Equal-voltage";

  result.innerHTML =
    "<strong>Transformer Type:</strong> " + transformerType + "<br>" +
    "<strong>Primary Current:</strong> " + primaryAmps.toFixed(2) + " A<br>" +
    "<strong>Secondary Current:</strong> " + secondaryAmps.toFixed(2) + " A<br>" +
    "<strong>Voltage Ratio:</strong> " + ratio.toFixed(2) + ":1<br>" +
    "<strong>Transformer Rating:</strong> " + kva.toFixed(2) + " kVA";
}

function calculateMASignal() {
  const result = document.getElementById("maResult");

  const signalText = document.getElementById("maSignal").value;
  const minText = document.getElementById("maMin").value;
  const maxText = document.getElementById("maMax").value;
  const unit = document.getElementById("maUnit").value;

  if ([signalText, minText, maxText].some(x => x.trim() === "")) {
    result.textContent = "Enter all signal values.";
    return;
  }

  const signal = Number(signalText);
  const min = Number(minText);
  const max = Number(maxText);

  if (![signal, min, max].every(Number.isFinite) ||
      signal < 0 || max <= min) {
    result.textContent = "Check your signal and range values.";
    return;
  }

  const percent = ((signal - 4) / 16) * 100;

  const scaledValue =
    min + ((signal - 4) / 16) * (max - min);

  let status = "Within normal 4-20 mA span.";

  if (signal < 4) {
    status = "Below 4 mA: Check for under-range or loop fault.";
  } else if (signal > 20) {
    status = "Above 20 mA: Check for over-range.";
  }

  result.textContent =
    "Scaled Value: " + scaledValue.toFixed(2) + " " + unit + "\n" +
    "Signal Percentage: " + percent.toFixed(2) + "%\n" +
    "Input Current: " + signal.toFixed(2) + " mA\n" +
    status;
}

function calculatePowerFactor() {
  const get = id => document.getElementById(id).value;
  const mode = get("pfMode");
  const out = document.getElementById("pfResult");
  const rawA = get("pfInput1");
  const rawB = get("pfInput2");
  const error = msg => {
    out.style.color = "#f87171";
    out.textContent = msg;
  };

  if (rawA.trim() === "" || rawB.trim() === "") {
    error("Enter both values.");
    return;
  }

  const a = Number(rawA), b = Number(rawB);
  if (!Number.isFinite(a) || !Number.isFinite(b) ||
      a <= 0 || b < 0) {
    error("Enter valid positive power values.");
    return;
  }

  let kw, kva, kvar;

  if (mode === "kw_kva") {
    if (b < a) {
      error("kVA must be at least kW.");
      return;
    }
    kw = a;
    kva = b;
    kvar = Math.sqrt(kva * kva - kw * kw);
  } else if (mode === "kw_pf") {
    if (b <= 0 || b > 1) {
      error("PF must be greater than 0 and at most 1.");
      return;
    }
    kw = a;
    kva = kw / b;
    kvar = Math.sqrt(Math.max(0, kva * kva - kw * kw));
  } else if (mode === "kva_pf") {
    if (b > 1) {
      error("PF must be between 0 and 1.");
      return;
    }
    kva = a;
    kw = kva * b;
    kvar = Math.sqrt(Math.max(0, kva * kva - kw * kw));
  } else if (mode === "kw_kvar") {
    kw = a;
    kvar = b;
    kva = Math.hypot(kw, kvar);
  } else {
    error("Invalid calculation mode.");
    return;
  }

  out.style.color = "#4ade80";
  out.innerHTML =
    "Real Power: " + kw.toFixed(2) + " kW" +
    "<br><br>Apparent Power: " + kva.toFixed(2) + " kVA" +
    "<br><br>Reactive Power: " + kvar.toFixed(2) + " kVAR" +
    "<br><br>Power Factor: " + (kw / kva).toFixed(3);
}

function calculateMotorOverload() {
  const flaText = document.getElementById("olFLA").value;
  const fla = Number(flaText);
  const factor = Number(
    document.getElementById("olFactor").value
  );
  const result = document.getElementById("olResult");

  if (
    flaText.trim() === "" ||
    !Number.isFinite(fla) ||
    fla <= 0
  ) {
    result.textContent = "Please enter a valid motor FLA.";
    return;
  }

  const overload = fla * factor;
  const percentage = factor * 100;

  result.textContent =
    "Motor FLA: " + fla.toFixed(2) + " A\n" +
    "Overload Percentage: " + percentage.toFixed(0) + "%\n" +
    "Maximum Trip Current: " + overload.toFixed(2) + " A\n\n" +
    "Formula: FLA × Overload Percentage\n\n" +
    "Note: Actual overload relay settings depend on manufacturer instructions.";
}

function calculateHeater() {
  const connection =
    document.getElementById("heaterConnection").value;
  const vText =
    document.getElementById("heaterVoltage").value;
  const rText =
    document.getElementById("heaterResistance").value;
  const result =
    document.getElementById("heaterResult");

  if (vText.trim() === "" || rText.trim() === "") {
    result.textContent = "Enter voltage and resistance.";
    return;
  }

  const voltage = Number(vText);
  const resistance = Number(rText);

  if (!Number.isFinite(voltage) ||
      !Number.isFinite(resistance) ||
      voltage <= 0 || resistance <= 0) {
    result.textContent = "Enter valid positive values.";
    return;
  }

  if (connection !== "delta" && connection !== "wye") {
    result.textContent = "Select Delta or Wye.";
    return;
  }

  const elementVoltage = connection === "delta"
    ? voltage : voltage / Math.sqrt(3);

  const elementCurrent = elementVoltage / resistance;

  const lineCurrent = connection === "delta"
    ? elementCurrent * Math.sqrt(3)
    : elementCurrent;

  const totalWatts =
    3 * elementVoltage * elementCurrent;

  const totalKW = totalWatts / 1000;

  result.innerHTML =
    "Connection: " + connection.toUpperCase() +
    "<br><br>Element Voltage: " +
    elementVoltage.toFixed(2) + " V" +
    "<br><br>Element Current: " +
    elementCurrent.toFixed(2) + " A" +
    "<br><br>Line Current: " +
    lineCurrent.toFixed(2) + " A" +
    "<br><br>Total Power: " +
    totalKW.toFixed(2) + " kW";
  }

  function calculateVFDRPM() {
  const ids = ["vfdHz", "ratedHz", "ratedRPM"];
  const result = document.getElementById("vfdRPMResult");

  if (ids.some(id =>
    document.getElementById(id).value.trim() === ""
  )) {
    result.textContent = "Enter all motor values.";
    return;
  }

  const hz = Number(document.getElementById("vfdHz").value);
  const poles = Number(document.getElementById("motorPoles").value);
  const ratedHz = Number(document.getElementById("ratedHz").value);
  const ratedRPM = Number(document.getElementById("ratedRPM").value);

  const ratedSyncRPM = (120 * ratedHz) / poles;

  if (
    ![hz, poles, ratedHz, ratedRPM].every(Number.isFinite) ||
    hz < 0 || ratedHz <= 0 ||
    ratedRPM <= 0 || ratedRPM > ratedSyncRPM
  ) {
    result.textContent = "Check motor values and nameplate RPM.";
    return;
  }

  const synchronousRPM = (120 * hz) / poles;
  const slipPercent =
    ((ratedSyncRPM - ratedRPM) / ratedSyncRPM) * 100;
  const estimatedRPM =
    synchronousRPM * (1 - slipPercent / 100);

  result.innerHTML =
    "Synchronous RPM: " + synchronousRPM.toFixed(0) +
    "<br><br>Rated Slip: " + slipPercent.toFixed(2) + "%" +
    "<br><br>Estimated Running RPM: " +
    estimatedRPM.toFixed(0) + " RPM";
  }
  function setPFMode() {
  const modes = {
    kw_kva: ["Real Power (kW)", "Apparent Power (kVA)", 10, 12.5],
    kw_pf: ["Real Power (kW)", "Power Factor (0-1)", 10, 0.8],
    kva_pf: ["Apparent Power (kVA)", "Power Factor (0-1)", 12.5, 0.8],
    kw_kvar: ["Real Power (kW)", "Reactive Power (kVAR)", 10, 7.5]
  };
  const m = document.getElementById("pfMode").value;
  const v = modes[m];
  document.getElementById("pfLabel1").textContent = v[0];
  document.getElementById("pfLabel2").textContent = v[1];
  document.getElementById("pfInput1").value = v[2];
  document.getElementById("pfInput2").value = v[3];
  document.getElementById("pfResult").textContent = "";
}

function calculateMotorHorsepower() {
  const mode = document.getElementById("hpMode").value;
  const phase = Number(document.getElementById("hpPhase").value);
  const voltageText = document.getElementById("hpVoltage").value;
  const inputText = document.getElementById("hpInput").value;
  const voltage = Number(voltageText);
  const input = Number(inputText);
  const pf = Number(document.getElementById("hpPF").value);
  const efficiency = Number(document.getElementById("hpEfficiency").value) / 100;
  const result = document.getElementById("hpResult");

  if (
    voltageText.trim() === "" ||
    inputText.trim() === "" ||
    !Number.isFinite(voltage) ||
    !Number.isFinite(input) ||
    voltage <= 0 ||
    input <= 0 ||
    !Number.isFinite(pf) ||
    pf <= 0 ||
    pf > 1 ||
    !Number.isFinite(efficiency) ||
    efficiency <= 0 ||
    efficiency > 1
  ) {
    result.textContent =
      "Please enter valid positive values.\n" +
      "Power factor must be 0.01 to 1.\n" +
      "Efficiency must be greater than 0% and at most 100%.";
    return;
  }

  const multiplier = phase === 3 ? Math.sqrt(3) : 1;

  let amps;
  let hp;
  let kw;

  if (mode === "ampsToHp") {
    amps = input;

    const inputWatts = multiplier * voltage * amps * pf;
    const outputWatts = inputWatts * efficiency;

    hp = outputWatts / 746;
    kw = inputWatts / 1000;
  } else {
    hp = input;

    const outputWatts = hp * 746;
    const inputWatts = outputWatts / efficiency;

    amps = inputWatts / (multiplier * voltage * pf);
    kw = inputWatts / 1000;
  }

  result.textContent =
    "Motor Phase: " + phase + "-Phase\n" +
    "Voltage: " + voltage.toFixed(2) + " V\n" +
    "Power Factor: " + pf.toFixed(2) + "\n" +
    "Efficiency: " + (efficiency * 100).toFixed(1) + "%\n\n" +
    "Motor Current: " + amps.toFixed(2) + " A\n" +
    "Estimated Output: " + hp.toFixed(2) + " HP\n" +
    "Electrical Input: " + kw.toFixed(2) + " kW\n\n" +
    "Calculations use nominal 746 watts per HP.";
}

