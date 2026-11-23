function show(page) {
  const content = document.getElementById("content");

  if (page === "electrical") {
    content.innerHTML = `
    
<details class="electrical-group">
  <summary>🧮 Electrical Calculators</summary>
  <div class="group-content">

      <h2>⚡ Ohm's Law Calculator</h2>
      <p>Calculate current using voltage and resistance.</p>
      <label for="voltage">Voltage (V)</label>
      <input id="voltage" type="number" step="any"
             placeholder="Enter voltage">
      <label for="resistance">Resistance (Ω)</label>
      <input id="resistance" type="number" step="any"
             placeholder="Enter resistance">
      <button class="action" onclick="calculate()">
        Calculate Current
      </button>
      <div id="result" aria-live="polite"></div> 
      
<hr style="border:1px solid #334155;margin:25px 0">
<h2>⚙️ Three-Phase Motor Current</h2>
<p>Estimate three-phase motor full-load current.</p>
<label for="motorHP">Motor Horsepower (HP)</label>
<input id="motorHP" type="number" step="any" value="10">
<label for="motorVoltage">Voltage (V)</label>
<input id="motorVoltage" type="number" step="any" value="480">
<label for="motorEfficiency">Efficiency (%)</label>
<input id="motorEfficiency" type="number" step="any" value="90">
<label for="motorPF">Power Factor</label>
<input id="motorPF" type="number"
step="any" value="0.85">
<button class="action" onclick="calculateMotorCurrent()">
  Calculate Motor Current
</button>

<p id="motorResult"></p>
    
<hr style="border:1px solid #334155;margin:25px 0">

<h2>⚡ Voltage Drop Calculator</h2>
<p>Calculate voltage loss across electrical conductors.</p>

<label for="vdPhase">Circuit Type</label>
<select id="vdPhase" style="width:100%;padding:14px;font-size:18px;border-radius:10px">
  <option value="3">Three-Phase</option>
  <option value="1">Single-Phase</option>
</select>

<label for="vdVoltage">Supply Voltage (V)</label>
<input id="vdVoltage" type="number" step="any" value="480">

<label for="vdAmps">Load Current (Amps)</label>
<input id="vdAmps" type="number" step="any" value="30">

<label for="vdLength">One-Way Wire Length (Feet)</label>
<input id="vdLength" type="number" step="any" value="100">

<label for="vdMaterial">Conductor Material</label>
<select id="vdMaterial" style="width:100%;padding:14px;font-size:18px;border-radius:10px">
  <option value="copper">Copper</option>
  <option value="aluminum">Aluminum</option>
</select>

<label for="vdWire">Conductor Size</label>
<select id="vdWire" style="width:100%;padding:14px;font-size:18px;border-radius:10px">
  <option value="14">14 AWG</option>
  <option value="12">12 AWG</option>
  <option value="10">10 AWG</option>
  <option value="8" selected>8 AWG</option>
  <option value="6">6 AWG</option>
  <option value="4">4 AWG</option>
  <option value="2">2 AWG</option>
  <option value="1/0">1/0 AWG</option>
  <option value="2/0">2/0 AWG</option>
  <option value="3/0">3/0 AWG</option>
  <option value="4/0">4/0 AWG</option>
  <option value="250">250 kcmil</option>
  <option value="300">300 kcmil</option>
  <option value="350">350 kcmil</option>
</select>

<button class="action" onclick="calculateVoltageDrop()">
  Calculate Voltage Drop
</button>

<div id="vdResult" aria-live="polite" style="margin-top:18px"></div>

<hr style="border:1px solid #334155;margin:25px 0">

<h2>⚡ Transformer Calculator</h2>
<p>Calculate transformer currents and voltage ratios.</p>

<label for="trPhase">Transformer Phase</label>
<select id="trPhase" style="width:100%;padding:14px;font-size:18px;border-radius:10px">
  <option value="3">Three-Phase</option>
  <option value="1">Single-Phase</option>
</select>

<label for="trKVA">Transformer Rating (kVA)</label>
<input id="trKVA" type="number" step="any" value="45">

<label for="trPrimary">Primary Voltage (V)</label>
<input id="trPrimary" type="number" step="any" value="480">

<label for="trSecondary">Secondary Voltage (V)</label>
<input id="trSecondary" type="number" step="any" value="208">

<button class="action" onclick="calculateTransformer()">
  Calculate Transformer
</button>

<div id="trResult" aria-live="polite" style="margin-top:18px"></div>

<hr style="border:1px solid #334155;margin:25px 0">

<h2>📊 4-20 mA Signal Calculator</h2>
<p>Scale analog signals into engineering units.</p>

<label for="maSignal">Input Signal (mA)</label>
<input id="maSignal" type="number" step="any" value="12">

<label for="maMin">Minimum Engineering Value</label>
<input id="maMin" type="number" step="any" value="0">

<label for="maMax">Maximum Engineering Value</label>
<input id="maMax" type="number" step="any" value="100">

<label for="maUnit">Engineering Unit</label>
<select id="maUnit" style="width:100%;padding:14px;font-size:18px;border-radius:10px">
  <option value="PSI">PSI</option>
  <option value="°F">Degrees F</option>
  <option value="°C">Degrees C</option>
  <option value="%">Percent</option>
  <option value="GPM">GPM</option>
  <option value="in">Inches</option>
  <option value="ft">Feet</option>
</select>

<button class="action" onclick="calculateMASignal()">
  Calculate Analog Signal
</button>

<div id="maResult" aria-live="polite" style="margin-top:18px;white-space:pre-line"></div>

<hr>

<h2>⚡ Motor Overload Calculator</h2>

<label>Motor Nameplate FLA (Amps)</label>
<input type="number" id="olFLA"
  placeholder="Enter motor FLA"
  min="0" step="any">

<label>Motor Service Factor / Temperature Rise</label>
<select id="olFactor">
  <option value="1.25">
    SF 1.15+ or Temperature Rise 40°C or Less
  </option>
  <option value="1.15">
    All Other Motors
  </option>
</select>

<button class="action"
  onclick="calculateMotorOverload()">
  Calculate Motor Overload
</button>

<div id="olResult"
  aria-live="polite"
  style="margin-top:18px;white-space:pre-line">
</div>

<p style="font-size:12px;">
  Maximum overload trip-current calculation.
  Verify manufacturer relay settings.
</p>

<hr>

<h2>⚡ Motor Horsepower Calculator</h2>

<label>Calculation Type</label>
<select id="hpMode">
  <option value="ampsToHp">Amps to Horsepower</option>
  <option value="hpToAmps">Horsepower to Amps</option>
</select>

<label>Motor Phase</label>
<select id="hpPhase">
  <option value="3">Three Phase</option>
  <option value="1">Single Phase</option>
</select>

<label>Motor Voltage (V)</label>
<input type="number" id="hpVoltage"
  placeholder="Example: 480"
  min="0" step="any">

<label>Motor Current (Amps) or Horsepower (HP)</label>
<input type="number" id="hpInput"
  placeholder="Enter Amps or HP"
  min="0" step="any">

<label>Power Factor (0.01 - 1.00)</label>
<input type="number" id="hpPF"
  value="0.85" min="0.01" max="1" step="0.01">

<label>Motor Efficiency (%)</label>
<input type="number" id="hpEfficiency"
  value="90" min="1" max="100" step="any">

<button class="action"
  onclick="calculateMotorHorsepower()">
  Calculate Horsepower
</button>

<div id="hpResult"
  aria-live="polite"
  style="margin-top:18px;white-space:pre-line">
</div>

<p style="font-size:12px;">
  Estimates motor horsepower, current and
  electrical input power using voltage,
  power factor and efficiency.
</p>
<hr style="border:1px solid #334155;margin:25px 0">

<h2>⚙️ VFD & Motor RPM Calculator</h2>
<p>Calculate motor speed, slip, and estimated RPM.</p>

<label for="vfdHz">VFD Frequency (Hz)</label>
<input id="vfdHz" type="number" step="any" value="60">

<label for="motorPoles">Motor Poles</label>
<select id="motorPoles"
style="width:100%;padding:13px;margin:8px 0;
border-radius:8px;font-size:16px">
<option value="2">2 Poles</option>
<option value="4" selected>4 Poles</option>
<option value="6">6 Poles</option>
<option value="8">8 Poles</option>
</select>

<label for="ratedHz">Nameplate Frequency (Hz)</label>
<input id="ratedHz" type="number" step="any" value="60">

<label for="ratedRPM">Nameplate RPM</label>
<input id="ratedRPM" type="number" step="any" value="1750">

<button class="action" onclick="calculateVFDRPM()">
Calculate Motor RPM
</button>

<div id="vfdRPMResult" aria-live="polite"
style="margin-top:18px;color:#4ade80;font-size:18px">
</div>
<hr style="border:1px solid #334155;margin:25px 0">

<h2>⚡ Power Factor Calculator</h2>
<p>Calculate kW, kVA, kVAR, and power factor.</p>

<label for="pfMode">Select Known Values</label>
<select id="pfMode" onchange="setPFMode()"
style="width:100%;padding:13px;margin:8px 0;
border-radius:8px;font-size:16px">
  <option value="kw_kva">kW and kVA</option>
  <option value="kw_pf">kW and Power Factor</option>
  <option value="kva_pf">kVA and Power Factor</option>
  <option value="kw_kvar">kW and kVAR</option>
</select>

<label id="pfLabel1" for="pfInput1">Real Power (kW)</label>
<input id="pfInput1" type="number" step="any" value="10">

<label id="pfLabel2" for="pfInput2">Apparent Power (kVA)</label>
<input id="pfInput2" type="number" step="any" value="12.5">

<button class="action" onclick="calculatePowerFactor()">
  Calculate Power Factor
</button>

<div id="pfResult" aria-live="polite"
style="margin-top:18px;color:#4ade80;font-size:18px">
</div>

<p style="font-size:12px;color:#94a3b8">
Results use power triangle relationships.
Leading or lagging power factor is not determined.
</p>
<hr style="border:1px solid #334155;margin:25px 0">

<h2>🔥 Three-Phase Heater Calculator</h2>
<p>Delta and Wye heating element connections.</p>

<label for="heaterConnection">Connection Type</label>
<select id="heaterConnection"
style="width:100%;padding:13px;margin:8px 0;
border-radius:8px;font-size:16px">
<option value="delta">Delta (Δ)</option>
<option value="wye">Wye (Y)</option>
</select>

<label for="heaterVoltage">Line Voltage (V)</label>
<input id="heaterVoltage" type="number"
step="any" value="480">

<label for="heaterResistance">
Resistance Per Element (Ohms)
</label>
<input id="heaterResistance" type="number"
step="any" value="24">

<button class="action" onclick="calculateHeater()">
Calculate Heater
</button>

<div id="heaterResult" aria-live="polite"
style="margin-top:18px;color:#4ade80;
font-size:18px"></div>

<p style="font-size:12px;color:#94a3b8">
Assumes three equal resistive elements.
Delta: elements connect line-to-line.
Wye: elements connect to a common star point.
Verify element voltage ratings before wiring.
</p>
`;
    
const group = document.querySelector(
  ".electrical-group .group-content"
);

if (group) {
  let currentBody = null;

  [...group.children].forEach(element => {
    if (element.tagName === "H2") {
      const calculator = document.createElement("details");
      calculator.className = "calculator";

      const summary = document.createElement("summary");
      summary.textContent = element.textContent;

      const body = document.createElement("div");
      body.className = "calculator-body";

      calculator.append(summary, body);
      group.insertBefore(calculator, element);

      element.remove();
      currentBody = body;
    } else if (currentBody) {
      currentBody.appendChild(element);
    }
  });
}

content.insertAdjacentHTML("beforeend", `
  <details class="electrical-group">
    <summary>📐 Electrical Diagrams</summary>
    <div class="group-content">

      <details class="calculator">
        <summary>⚡ 3-Wire Motor Starter</summary>
        <div class="calculator-body">

          <h3>Start / Stop Control Circuit</h3>
          <p>Standard contactor seal-in circuit.</p>

          <div style="overflow-x:auto;">
            <svg width="600" height="240"
                 viewBox="0 0 600 240"
                 xmlns="http://www.w3.org/2000/svg"
                 role="img"
                 aria-label="Three-wire motor starter ladder diagram"
                 style="background:#0f172a;
                 border:1px solid #334155;
                 border-radius:10px;">

              <g stroke="#e2e8f0"
                 stroke-width="2.3"
                 fill="none">

                <!-- Supply rails -->
                <path d="M35 40 V205 M565 40 V205"/>

                <!-- Main control rung -->
                <path d="M35 100 H98
                         M118 100 H238
                         M258 100 H390
                         M410 100 H470
                         M510 100 H565"/>

                <!-- STOP normally closed -->
                <path d="M98 88 V112
                         M118 88 V112
                         M95 114 L121 86"/>

                <!-- START normally open -->
                <path d="M238 88 V112
                         M258 88 V112"/>

                <!-- Seal-in branch -->
                <path d="M180 100 V165 H238
                         M258 165 H330 V100"/>

                <!-- Auxiliary NO contact -->
                <path d="M238 153 V177
                         M258 153 V177"/>

                <!-- Overload NC -->
                <path d="M390 88 V112
                         M410 88 V112
                         M387 114 L413 86"/>

                <!-- Contactor coil -->
                <circle cx="490" cy="100" r="20"/>

              </g>

              <g fill="#e2e8f0"
                 font-size="14"
                 text-anchor="middle">

                <text x="35" y="28">L1</text>
                <text x="565" y="28">L2</text>

                <text x="108" y="65">STOP</text>
                <text x="248" y="65">START</text>
                <text x="400" y="65">OL</text>

                <text x="490" y="105">M</text>

                <text x="248" y="195">M AUX</text>
                <text x="248" y="215">NO Seal-In</text>

              </g>
            </svg>
          </div>

          <h3>How It Works</h3>
          <p>
            1. Press START to energize the M coil.
          </p>
          <p>
            2. M auxiliary contact closes to
            maintain the control circuit.
          </p>
          <p>
            3. Press STOP to de-energize M.
          </p>
          <p>
            4. An overload trip opens the
            OL contact and stops the motor.
          </p>

          <p style="color:#94a3b8;font-size:12px;">
            Training schematic only.
            Actual wiring requires appropriate
            control protection and safety devices.
          </p>

        </div>
      </details>

<details class="calculator">
  <summary>🔄 Forward/Reverse Motor Control</summary>
  <div class="calculator-body">

    <h3>Forward / Reverse Starter</h3>
    <p>Control circuit with electrical interlocks and seal-in contacts.</p>

    <div style="overflow-x:auto;">
      <svg width="750" height="345"
        viewBox="0 0 750 345"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Forward reverse contactor ladder control"
        style="background:#0f172a;border:1px solid #334155;border-radius:10px;">

        <g stroke="#e2e8f0" stroke-width="2"
          fill="none" stroke-linecap="round">

          <!-- Common STOP and overload -->
          <path d="M30 25 V60 H95
                   M115 60 H170
                   M190 60 H240 V255
                   M720 25 V320"/>

          <!-- Forward rung -->
          <path d="M240 125 H350
                   M370 125 H485
                   M505 125 H615
                   M653 125 H720"/>

          <!-- Reverse rung -->
          <path d="M240 255 H350
                   M370 255 H485
                   M505 255 H615
                   M653 255 H720"/>

          <!-- Forward seal-in branch -->
          <path d="M295 125 V177 H350
                   M370 177 H420 V125"/>

          <!-- Reverse seal-in branch -->
          <path d="M295 255 V307 H350
                   M370 307 H420 V255"/>

          <!-- Normally closed contacts -->
          <path d="M95 48 V72 M115 48 V72
                   M92 75 L118 45
                   M170 48 V72 M190 48 V72
                   M167 75 L193 45
                   M485 113 V137 M505 113 V137
                   M482 140 L508 110
                   M485 243 V267 M505 243 V267
                   M482 270 L508 240"/>

          <!-- Normally open contacts -->
          <path d="M350 113 V137 M370 113 V137
                   M350 165 V189 M370 165 V189
                   M350 243 V267 M370 243 V267
                   M350 295 V319 M370 295 V319"/>

          <!-- Contactor coils -->
          <circle cx="635" cy="125" r="18"/>
          <circle cx="635" cy="255" r="18"/>
        </g>

        <g fill="#e2e8f0" font-size="12"
          text-anchor="middle">
          <text x="30" y="17">L1</text>
          <text x="720" y="17">L2</text>
          <text x="105" y="35">STOP NC</text>
          <text x="180" y="35">OL NC</text>

          <text x="360" y="103">FWD START</text>
          <text x="495" y="103">REV NC</text>
          <text x="635" y="129">F</text>
          <text x="360" y="202">F AUX NO</text>

          <text x="360" y="233">REV START</text>
          <text x="495" y="233">FWD NC</text>
          <text x="635" y="259">R</text>
          <text x="360" y="336">R AUX NO</text>
        </g>

      </svg>
    </div>

    <h3>How It Works</h3>
    <p>FORWARD START energizes F and closes its seal-in contact.</p>
    <p>The normally closed REV auxiliary contact prevents F from energizing while R is active.</p>
    <p>REVERSE START energizes R when F is de-energized.</p>
    <p>STOP or an overload trip opens the common control circuit.</p>

    <p style="font-size:12px;color:#94a3b8;">
      Training schematic. A reversing starter also requires
      a mechanical interlock and correctly wired power contacts.
      Do not use this illustration as an installation drawing.
    </p>

  </div>
</details>

<details class="calculator">
  <summary>⚙️ 3-Phase Motor Power Circuit</summary>
  <div class="calculator-body">

    <h3>Across-the-Line Motor Starter</h3>
    <p>Three-phase motor power path with protection and switching.</p>

    <div style="overflow-x:auto;">
      <svg width="760" height="285"
        viewBox="0 0 760 285"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Three-phase motor power block diagram"
        style="background:#0f172a;border:1px solid #334155;border-radius:10px;">

        <g stroke="#e2e8f0" stroke-width="2"
          fill="none">

          <!-- Three phase conductors -->
          <path d="M30 75 H120 M200 75 H250 M330 75 H380 M460 75 H565
                   M30 145 H120 M200 145 H250 M330 145 H380 M460 145 H565
                   M30 215 H120 M200 215 H250 M330 215 H380 M460 215 H565"/>

          <!-- Disconnect protection blocks -->
          <rect x="120" y="57" width="80" height="36"/>
          <rect x="120" y="127" width="80" height="36"/>
          <rect x="120" y="197" width="80" height="36"/>

          <!-- Contactor poles -->
          <rect x="250" y="57" width="80" height="36"/>
          <rect x="250" y="127" width="80" height="36"/>
          <rect x="250" y="197" width="80" height="36"/>

          <!-- Overload elements -->
          <rect x="380" y="57" width="80" height="36"/>
          <rect x="380" y="127" width="80" height="36"/>
          <rect x="380" y="197" width="80" height="36"/>

          <!-- Motor block -->
          <rect x="565" y="35" width="170" height="220" rx="10"/>

        </g>

        <g fill="#e2e8f0" font-size="15"
          text-anchor="middle">
          <text x="160" y="30">QF</text>
          <text x="290" y="30">KM</text>
          <text x="420" y="30">OL</text>

          <text x="30" y="64">L1</text>
          <text x="30" y="134">L2</text>
          <text x="30" y="204">L3</text>

          <text x="160" y="81">QF1</text>
          <text x="160" y="151">QF2</text>
          <text x="160" y="221">QF3</text>

          <text x="290" y="81">KM1</text>
          <text x="290" y="151">KM2</text>
          <text x="290" y="221">KM3</text>

          <text x="420" y="81">OL1</text>
          <text x="420" y="151">OL2</text>
          <text x="420" y="221">OL3</text>

          <text x="592" y="80">U</text>
          <text x="592" y="150">V</text>
          <text x="592" y="220">W</text>

          <text x="664" y="145">M 3~</text>
          <text x="664" y="172" font-size="12">MOTOR</text>
        </g>
      </svg>
    </div>

    <h3>Component Identification</h3>
    <p><b>QF:</b> Protective disconnect or circuit breaker.</p>
    <p><b>KM:</b> Three-pole motor contactor.</p>
    <p><b>OL:</b> Motor overload protection.</p>
    <p><b>M:</b> Three-phase AC motor.</p>

    <p style="font-size:12px;color:#94a3b8;">
      Simplified power-path diagram. Actual equipment
      requires appropriate short-circuit protection,
      grounding, motor connections and wiring
      sized for the installation.
    </p>

  </div>
</details>

<details class="calculator">
  <summary>📡 3-Wire PNP Sensor</summary>

  <svg viewBox="0 0 370 235" width="100%"
       role="img" aria-label="PNP sensor wiring to PLC">
    <rect width="370" height="235" rx="10"
          fill="#0b1220"/>

    <rect x="103" y="50" width="125" height="135"
          rx="9" fill="#1e293b" stroke="#64748b"/>
    <text x="165" y="108" fill="white"
          font-size="17" text-anchor="middle">PNP</text>
    <text x="165" y="128" fill="#94a3b8"
          font-size="13" text-anchor="middle">SENSOR</text>

    <rect x="280" y="64" width="80" height="125"
          rx="8" fill="#1e293b" stroke="#38bdf8"/>
    <text x="320" y="89" fill="#38bdf8"
          font-size="15" text-anchor="middle">PLC</text>
    <text x="287" y="117" fill="white"
          font-size="12">INPUT</text>
    <text x="287" y="159" fill="white"
          font-size="12">COM</text>

    <path d="M18 75 H103" stroke="#d97736"
          stroke-width="4" fill="none"/>
    <text x="18" y="61" fill="#fbbf24"
          font-size="12">+24V BN</text>

    <path d="M18 165 H103" stroke="#38bdf8"
          stroke-width="4" fill="none"/>
    <text x="18" y="151" fill="#38bdf8"
          font-size="12">0V BU</text>

    <path d="M228 122 H280" stroke="#e2e8f0"
          stroke-width="4" fill="none"/>
    <text x="236" y="109" fill="white"
          font-size="12">BK</text>

    <path d="M280 165 H260 V214 H45 V165"
          stroke="#38bdf8" stroke-width="3"
          fill="none"/>
    <circle cx="45" cy="165" r="4"
            fill="#38bdf8"/>
    <text x="133" y="206" fill="#38bdf8"
          font-size="12">PLC COM to 0V</text>
  </svg>

  <p><b>PNP sourcing output:</b>
    Brown = +24V, Blue = 0V,
    Black = PLC input. PLC input common
    connects to 0V.
  </p>
</details>

<details class="calculator">
  <summary>📡 3-Wire NPN Sensor</summary>

  <svg viewBox="0 0 370 235" width="100%"
       role="img" aria-label="NPN sensor wiring to PLC">
    <rect width="370" height="235" rx="10"
          fill="#0b1220"/>

    <rect x="103" y="50" width="125" height="135"
          rx="9" fill="#1e293b" stroke="#64748b"/>
    <text x="165" y="108" fill="white"
          font-size="17" text-anchor="middle">NPN</text>
    <text x="165" y="128" fill="#94a3b8"
          font-size="13" text-anchor="middle">SENSOR</text>

    <rect x="280" y="64" width="70" height="125"
          rx="8" fill="#1e293b" stroke="#38bdf8"/>
    <text x="315" y="89" fill="#38bdf8"
          font-size="15" text-anchor="middle">PLC</text>
    <text x="286" y="117" fill="white"
          font-size="12">INPUT</text>
    <text x="286" y="159" fill="white"
          font-size="12">COM</text>

    <path d="M18 75 H103" stroke="#d97736"
          stroke-width="4" fill="none"/>
    <text x="18" y="61" fill="#fbbf24"
          font-size="12">+24V BN</text>

    <path d="M18 165 H103" stroke="#38bdf8"
          stroke-width="4" fill="none"/>
    <text x="18" y="151" fill="#38bdf8"
          font-size="12">0V BU</text>

    <path d="M228 122 H280" stroke="#e2e8f0"
          stroke-width="4" fill="none"/>
    <text x="236" y="109" fill="white"
          font-size="12">BK</text>

    <path d="M350 165 H361 V26 H50 V75"
          stroke="#d97736" stroke-width="3"
          fill="none"/>
    <circle cx="50" cy="75" r="4"
            fill="#d97736"/>
    <text x="145" y="20" fill="#fbbf24"
          font-size="12">PLC COM to +24V</text>
  </svg>

  <p><b>NPN sinking output:</b>
    Brown = +24V, Blue = 0V,
    Black = PLC input. PLC input common
    connects to +24V.
  </p>
</details>

<details class="calculator">
  <summary>📈 4–20 mA Sensor Wiring</summary>

  <svg viewBox="0 0 370 235" width="100%"
       role="img"
       aria-label="Two-wire loop-powered transmitter">
    <rect width="370" height="235" rx="10"
          fill="#0b1220"/>

    <rect x="105" y="50" width="115" height="110"
          rx="8" fill="#1e293b" stroke="#64748b"/>
    <text x="162" y="91" fill="white"
          font-size="15" text-anchor="middle">4–20 mA</text>
    <text x="162" y="111" fill="#94a3b8"
          font-size="12" text-anchor="middle">2-WIRE</text>
    <text x="162" y="128" fill="#94a3b8"
          font-size="12" text-anchor="middle">TRANSMITTER</text>

    <rect x="270" y="65" width="88" height="125"
          rx="8" fill="#1e293b" stroke="#38bdf8"/>
    <text x="314" y="90" fill="#38bdf8"
          font-size="14" text-anchor="middle">PLC AI</text>
    <text x="277" y="119" fill="white"
          font-size="12">I+</text>
    <text x="277" y="164" fill="white"
          font-size="12">I−</text>

    <path d="M18 75 H105" stroke="#d97736"
          stroke-width="4" fill="none"/>
    <text x="18" y="60" fill="#fbbf24"
          font-size="12">+24V DC</text>

    <path d="M220 125 H270" stroke="#e2e8f0"
          stroke-width="4" fill="none"/>
    <text x="228" y="112" fill="white"
          font-size="12">4–20mA</text>

    <path d="M270 170 H247 V214 H55 V170 H18"
          stroke="#38bdf8" stroke-width="3"
          fill="none"/>
    <text x="18" y="160" fill="#38bdf8"
          font-size="12">0V DC</text>
    <text x="107" y="205" fill="#38bdf8"
          font-size="12">Loop return</text>
  </svg>

  <p><b>2-wire loop-powered transmitter:</b>
    +24V to transmitter positive,
    transmitter negative to PLC current
    input I+, and PLC I− back to 0V.
    This example assumes a passive PLC
    current input.
  </p>
</details>

<!-- 4-Wire Photoelectric Sensor -->
<details class="calculator">
  <summary>📡 4-Wire Photoeye NO/NC</summary>

  <svg viewBox="0 0 360 256"
       width="100%"
       xmlns="http://www.w3.org/2000/svg">

    <rect width="360" height="256"
          rx="12" fill="#0f172a"/>

    <!-- Sensor -->
    <rect x="100" y="55" width="118"
          height="149" rx="9"
          fill="#1e293b" stroke="#64748b"/>

    <text x="159" y="116"
          text-anchor="middle"
          fill="white" font-size="15">
      PHOTOEYE
    </text>

    <text x="159" y="137"
          text-anchor="middle"
          fill="#94a3b8" font-size="11">
      4-WIRE PNP
    </text>

    <!-- PLC -->
    <rect x="278" y="63" width="72"
          height="153" rx="7"
          fill="#1e293b" stroke="#38bdf8"/>

    <text x="314" y="88"
          text-anchor="middle"
          fill="#38bdf8" font-size="15">
      PLC
    </text>

    <g fill="white" font-size="11">
      <text x="288" y="122">I0</text>
      <text x="288" y="164">I1</text>
      <text x="288" y="198">COM</text>
    </g>

    <!-- Brown +24V -->
    <path d="M15 81 H100"
          stroke="#b9783a" stroke-width="4"/>
    <text x="15" y="68"
          fill="#fbbf24" font-size="11">
      BN +24V
    </text>

    <!-- Blue 0V -->
    <path d="M15 181 H100"
          stroke="#38bdf8" stroke-width="4"/>
    <text x="15" y="168"
          fill="#7dd3fc" font-size="11">
      BU 0V
    </text>

    <!-- Black Normally Open -->
    <path d="M218 117 H278"
          stroke="#a3a3a3" stroke-width="4"/>
    <text x="230" y="107"
          fill="#cbd5e1" font-size="11">
      BK NO
    </text>

    <!-- White Normally Closed -->
    <path d="M218 159 H278"
          stroke="white" stroke-width="4"/>
    <text x="230" y="149"
          fill="white" font-size="11">
      WH NC
    </text>

    <!-- PLC Input Common -->
    <path d="M278 194 H254 V232 H43 V181"
          stroke="#38bdf8"
          stroke-width="3" fill="none"/>
    <circle cx="43" cy="181" r="4"
            fill="#38bdf8"/>

    <text x="124" y="247"
          fill="#7dd3fc" font-size="11">
      0V Common
    </text>
  </svg>

  <h3>Wire Connections</h3>

  <p>🟤 Brown: +24V DC</p>
  <p>🔵 Blue: 0V DC</p>
  <p>⚫ Black: Normally Open to PLC I0</p>
  <p>⚪ White: Normally Closed to PLC I1</p>

  <h3>How It Works</h3>

  <p>
    When the sensor's switching condition
    is active, the NO output turns ON
    and the complementary NC output
    turns OFF.
  </p>

  <p>
    Both outputs connect to separate
    PLC digital inputs. The PLC input
    common connects to 0V.
  </p>

  <p>
    Note: This example applies to a
    PNP photoeye specifically equipped
    with complementary NO/NC outputs.
    Verify the wire assignments and
    light-on/dark-on configuration
    in the manufacturer's datasheet.
  </p>

</details>

<!-- Laser Distance Sensor -->
<details class="calculator">
  <summary>📏 Laser Distance Sensor</summary>

  <svg viewBox="0 0 390 290"
       width="100%"
       xmlns="http://www.w3.org/2000/svg">

    <rect width="390" height="290"
          rx="12" fill="#0f172a"/>

    <!-- Sensor body -->
    <rect x="92" y="55" width="128" height="170"
          rx="10" fill="#1e293b" stroke="#64748b"/>

    <text x="156" y="110"
          text-anchor="middle"
          fill="white" font-size="16">
      DISTANCE
    </text>

    <text x="156" y="132"
          text-anchor="middle"
          fill="white" font-size="16">
      SENSOR
    </text>

    <text x="156" y="155"
          text-anchor="middle"
          fill="#94a3b8" font-size="11">
      Q1 / Q2 / ANALOG
    </text>

    <!-- Little laser beam -->
    <polygon points="220,118 255,108 255,128"
             fill="#ef4444"/>

    <!-- PLC Digital Inputs -->
    <rect x="285" y="45" width="82" height="115"
          rx="8" fill="#1e293b" stroke="#38bdf8"/>

    <text x="326" y="68"
          text-anchor="middle"
          fill="#38bdf8" font-size="14">
      PLC DI
    </text>

    <g fill="white" font-size="11">
      <text x="294" y="95">I0 = Q1</text>
      <text x="294" y="120">I1 = Q2</text>
      <text x="294" y="145">COM</text>
    </g>

    <!-- PLC Analog Input -->
    <rect x="285" y="180" width="82" height="70"
          rx="8" fill="#1e293b" stroke="#22c55e"/>

    <text x="326" y="203"
          text-anchor="middle"
          fill="#22c55e" font-size="14">
      PLC AI
    </text>

    <g fill="white" font-size="11">
      <text x="294" y="225">AI0</text>
      <text x="294" y="245">COM</text>
    </g>

    <!-- Brown +24V -->
    <path d="M15 82 H92"
          stroke="#b9783a" stroke-width="4" fill="none"/>
    <text x="15" y="68"
          fill="#fbbf24" font-size="11">
      BN +24V
    </text>

    <!-- Blue 0V -->
    <path d="M15 206 H92"
          stroke="#38bdf8" stroke-width="4" fill="none"/>
    <text x="15" y="193"
          fill="#7dd3fc" font-size="11">
      BU 0V
    </text>

    <!-- Black Q1 -->
    <path d="M220 102 H285"
          stroke="#d1d5db" stroke-width="4" fill="none"/>
    <text x="228" y="91"
          fill="#e5e7eb" font-size="11">
      BK Q1
    </text>

    <!-- White Q2 -->
    <path d="M220 128 H285"
          stroke="#ffffff" stroke-width="4" fill="none"/>
    <text x="228" y="145"
          fill="white" font-size="11">
      WH Q2
    </text>

    <!-- Gray Analog -->
    <path d="M220 176 H285"
          stroke="#9ca3af" stroke-width="4" fill="none"/>
    <text x="228" y="166"
          fill="#d1d5db" font-size="11">
      GY Analog
    </text>

    <!-- Digital common tied to 0V -->
    <path d="M285 145 H260 V270 H42 V206"
          stroke="#38bdf8" stroke-width="3" fill="none"/>
    <circle cx="42" cy="206" r="4" fill="#38bdf8"/>

    <!-- Analog common tied to 0V -->
    <path d="M285 245 H272 V270"
          stroke="#38bdf8" stroke-width="3" fill="none"/>

    <text x="120" y="282"
          fill="#7dd3fc" font-size="11">
      0V common return
    </text>
  </svg>

  <h3>Wire Connections</h3>

  <p>🟤 Brown: +24V DC power</p>
  <p>🔵 Blue: 0V DC common</p>
  <p>⚫ Black: Q1 digital output to PLC input I0</p>
  <p>⚪ White: Q2 digital output to PLC input I1</p>
  <p>⚙️ Gray: Analog output to PLC analog input AI0</p>

  <h3>How It Works</h3>

  <p>
    Q1 and Q2 are switching outputs.
    These can be set up as independent
    switching points or windows depending
    on the sensor model.
  </p>

  <p>
    The analog output provides a distance
    value, commonly 4–20 mA or 0–10 V,
    to the PLC analog input.
  </p>

  <p>
    In this example, the PLC digital input
    common is tied to 0V, which matches a
    typical PNP output arrangement.
  </p>

  <p>
    Always verify the actual pinout and
    whether the sensor analog output is
    4–20 mA or 0–10 V before wiring.
  </p>

  </details>
    </div>
  </details>

<!-- CONDUIT BENDING -->

<details class="calculator">
  <summary>📐 Conduit Bending</summary>
  <div class="calculator-body">

    <h3>Conduit Bending Tools</h3>

  
<details class="calculator">
  <summary>90° Stub-Up Bends</summary>
  <div class="calculator-body">

    <h3>90° Stub-Up Calculator</h3>

    <label for="emtStubSize">EMT Conduit Size</label>
    <select id="emtStubSize"
      onchange="document.getElementById('emtStubTakeup').value = this.value"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">
      <option value="5">1/2" EMT</option>
      <option value="6" selected>3/4" EMT</option>
      <option value="8">1" EMT</option>
      <option value="11">1-1/4" EMT</option>
    </select>

    <label for="emtStubHeight">
      Desired Stub Height (inches)
    </label>
    <input id="emtStubHeight" type="number"
      value="24" min="0.125" step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="emtStubTakeup">
      Bender Take-Up (inches)
    </label>
    <input id="emtStubTakeup" type="number"
      value="6" min="0" step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <button type="button" class="action"
      onclick="calculateEmtStub()">
      Calculate Stub-Up
    </button>

    <div id="emtStubResult"
      style="margin-top:15px;">
      Enter your measurements and calculate.
    </div>

    <p style="font-size:12px;opacity:0.75;">
      Verify take-up against your bender markings.
      Measurements are from the free end of the conduit.
    </p>

  </div>
</details>


<!-- BACK-TO-BACK 90 CALCULATOR -->

<details class="calculator">
  <summary>Back-to-Back 90° Calculator</summary>

  <div class="calculator-body">

    <h3>Back-to-Back 90° Bends</h3>

    <p>
      Calculate the first arrow mark and
      second star mark for two 90° bends.
    </p>

    <label for="emtB2BSize">
      EMT Conduit Size
    </label>

    <select id="emtB2BSize"
      onchange="document.getElementById('emtB2BTakeup').value = this.value"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

      <option value="5">1/2" EMT</option>
      <option value="6" selected>3/4" EMT</option>
      <option value="8">1" EMT</option>
      <option value="11">1-1/4" EMT</option>

    </select>

    <label for="emtB2BStub">
      First Stub Height (inches)
    </label>

    <input id="emtB2BStub"
      type="number"
      value="24"
      min="0.125"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="emtB2BDistance">
      Distance Between Backs of 90s (inches)
    </label>

    <input id="emtB2BDistance"
      type="number"
      value="36"
      min="0.125"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="emtB2BTakeup">
      Bender Take-Up (inches)
    </label>

    <input id="emtB2BTakeup"
      type="number"
      value="6"
      min="0"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <button type="button"
      class="action"
      onclick="calculateEmtBackToBack()">
      Calculate Back-to-Back 90°
    </button>

    <div id="emtB2BResult"
      style="margin-top:15px;">
      Enter measurements and calculate.
    </div>

    <p style="font-size:12px;opacity:0.75;">
      Arrow = first stub-up bend.
      Star = back of second 90° bend.
      Verify take-up and minimum bend spacing
      against your specific bender.
    </p>

  </div>
</details>

  <details class="calculator">
  <summary>Offset Bend Calculator</summary>
  <div class="calculator-body">

    <h3>EMT Offset Calculator</h3>

    <label for="emtOffsetHeight">
      Offset Height (inches)
    </label>
    <input
      id="emtOffsetHeight"
      type="number"
      value="4"
      min="0.125"
      step="any"
    >

    <label for="emtOffsetAngle">
      Bend Angle
    </label>
    <select id="emtOffsetAngle">
      <option value="10">10°</option>
      <option value="22.5">22.5°</option>
      <option value="30" selected>30°</option>
      <option value="45">45°</option>
      <option value="60">60°</option>
    </select>

    <button
      type="button"
      class="action"
      onclick="calculateEmtOffset()">
      Calculate Offset
    </button>

    <div id="emtOffsetResult"
         style="margin-top:15px;">
      Enter measurements and calculate.
    </div>

  </div>
</details>
  


<details class="calculator">
  <summary>3-Point Saddle Bends</summary>
  <div class="calculator-body">

    <h3>3-Point Saddle Calculator</h3>

    <p>
      Calculate the three bend marks needed
      to clear an obstruction.
    </p>

    <label for="emtSaddleHeight">
      Required Saddle Rise (inches)
    </label>

    <input id="emtSaddleHeight"
      type="number"
      value="2"
      min="0.125"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="emtSaddleDistance">
      Distance to Obstruction Center (inches)
    </label>

    <input id="emtSaddleDistance"
      type="number"
      value="20"
      min="0"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="emtSaddleAngle">
      Center Bend Angle
    </label>

    <select id="emtSaddleAngle"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

      <option value="45" selected>
        45° Center / 22.5° Outer
      </option>

      <option value="60">
        60° Center / 30° Outer
      </option>

    </select>

    <button type="button" class="action"
      onclick="calculateEmtSaddle()">
      Calculate Saddle
    </button>

    <div id="emtSaddleResult"
      style="margin-top:15px;">
      Enter measurements and calculate.
    </div>

    <p style="font-size:12px;opacity:0.75;">
      Measure all marks from the same conduit end.
      Allow enough rise to clear the obstruction.
      Verify with your bender instructions.
    </p>

  </div>
</details>



<details class="calculator">
  <summary>Conduit Bending Reference</summary>
  <div class="calculator-body">

    <h3>Conduit Bending Quick Reference</h3>
    <p>
      EMT bending multipliers, shrink allowances,
      stub-up deductions, and bending marks.
    </p>

    <h4>Offset Multipliers</h4>

    <div style="overflow-x:auto;">
      <table style="width:100%;text-align:left;
                    border-collapse:collapse;">
        <tr>
          <th>Angle</th>
          <th>Multiplier</th>
          <th>Shrink / Inch</th>
        </tr>
        <tr><td>10°</td><td>6.0</td><td>1/16"</td></tr>
        <tr><td>22.5°</td><td>2.6</td><td>3/16"</td></tr>
        <tr><td>30°</td><td>2.0</td><td>1/4"</td></tr>
        <tr><td>45°</td><td>1.4</td><td>3/8"</td></tr>
        <tr><td>60°</td><td>1.2</td><td>1/2"</td></tr>
      </table>
    </div>

    <hr>

    <h4>Quick Bend Calculator</h4>

    <label for="conduitRefHeight">
      Offset Height (inches)
    </label>
    <input id="conduitRefHeight"
      type="number" value="4"
      min="0.125" step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="conduitRefAngle">
      Bend Angle
    </label>
    <select id="conduitRefAngle"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">
      <option value="10">10°</option>
      <option value="22.5">22.5°</option>
      <option value="30" selected>30°</option>
      <option value="45">45°</option>
      <option value="60">60°</option>
    </select>

    <button type="button" class="action"
      onclick="calculateConduitReference()">
      Calculate
    </button>

    <div id="conduitRefResult"
      style="margin-top:15px;">
      Enter your measurements and calculate.
    </div>

    <hr>

    <h4>90° Stub-Up Take-Up Chart</h4>

    <table style="width:100%;text-align:left;">
      <tr>
        <th>EMT Size</th>
        <th>Typical Take-Up</th>
      </tr>
      <tr><td>1/2"</td><td>5"</td></tr>
      <tr><td>3/4"</td><td>6"</td></tr>
      <tr><td>1"</td><td>8"</td></tr>
      <tr><td>1-1/4"</td><td>11"</td></tr>
    </table>

    <p>
      Bend Mark = Desired Stub Height - Take-Up
    </p>

    <hr>

    <h4>3-Point Saddle Reference</h4>

    <table style="width:100%;text-align:left;">
      <tr>
        <th>Center</th>
        <th>Outer</th>
        <th>Spacing / Rise</th>
      </tr>
      <tr>
        <td>45°</td><td>22.5°</td><td>2.5 ×</td>
      </tr>
      <tr>
        <td>60°</td><td>30°</td><td>2.0 ×</td>
      </tr>
    </table>

    <hr>

    <h4>Bender Marking Guide</h4>

    <p><strong>Arrow:</strong>
      Stub-ups, offsets, and outer saddle bends.
    </p>

    <p><strong>Star:</strong>
      Back-to-back 90° bends.
    </p>

    <p><strong>Rim Notch:</strong>
      Center of a saddle bend.
    </p>

    <p><strong>Degree Markings:</strong>
      Used to achieve the required bend angle.
    </p>

    <p style="font-size:12px;opacity:0.75;">
      Field-reference values are approximate.
      Verify take-up, minimum stub length,
      bend radius, and alignment marks using
      your specific bender instructions.
    </p>

  </div>
</details>


  </div>
</details>


<!-- WIRE SIZING -->

<details class="calculator">
  <summary>⚡ Wire Sizing Calculator</summary>

  <div class="calculator-body">

    <h3>Electrical Wire Sizing</h3>

    <p>
      Preliminary conductor sizing using
      NEC 2023 Table 310.16.
    </p>

    <label for="wireLoadAmps">
      Load Current (Amps)
    </label>

    <input id="wireLoadAmps"
      type="number"
      value="30"
      min="0.1"
      step="any"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

    <label for="wireMaterial">
      Conductor Material
    </label>

    <select id="wireMaterial"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

      <option value="copper">
        Copper
      </option>

      <option value="aluminum">
        Aluminum
      </option>
    </select>

    <label for="wireTemperature">
      Applicable Ampacity Column
    </label>

    <select id="wireTemperature"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

      <option value="60" selected>
        60°C
      </option>

      <option value="75">
        75°C
      </option>
    </select>

    <p style="font-size:12px;opacity:0.75;">
      Select a temperature column supported
      by the conductor insulation and
      equipment terminations.
    </p>

    <label for="wireContinuous">
      Load Type
    </label>

    <select id="wireContinuous"
      style="width:100%;padding:12px;
             margin:8px 0 15px;
             background:white;color:#0f172a;">

      <option value="no" selected>
        Noncontinuous
      </option>

      <option value="yes">
        Continuous
      </option>
    </select>
    
    
<!-- VOLTAGE DROP INPUTS -->

<label for="wireVoltage">
  System Voltage (V)
</label>

<select id="wireVoltage"
  style="width:100%;padding:12px;
         margin:8px 0 15px;
         background:white;color:#0f172a;">
  <option value="120">120 V</option>
  <option value="208">208 V</option>
  <option value="240">240 V</option>
  <option value="277">277 V</option>
  <option value="480" selected>480 V</option>
  <option value="600">600 V</option>
</select>

<label for="wirePhase">
  Electrical System
</label>

<select id="wirePhase"
  style="width:100%;padding:12px;
         margin:8px 0 15px;
         background:white;color:#0f172a;">
  <option value="1">Single-Phase</option>
  <option value="3" selected>Three-Phase</option>
</select>

<label for="wireDistance">
  One-Way Wire Distance (feet)
</label>

<input id="wireDistance"
  type="number"
  value="150"
  min="0.1"
  step="any"
  style="width:100%;padding:12px;
         margin:8px 0 15px;
         background:white;color:#0f172a;">

<label for="wireDropLimit">
  Maximum Voltage Drop
</label>

<select id="wireDropLimit"
  style="width:100%;padding:12px;
         margin:8px 0 15px;
         background:white;color:#0f172a;">
  <option value="2">2%</option>
  <option value="3" selected>3%</option>
  <option value="5">5%</option>
</select>


    <button type="button"
      class="action"
      onclick="calculateWireSize()">
      Calculate Wire Size
    </button>

    <div id="wireSizeResult"
      style="margin-top:15px;">
      Enter your load and calculate.
    </div>

    <p style="font-size:12px;opacity:0.75;">
      General-circuit reference only.
      Additional NEC rules may require
      different conductor sizing.
      Do not use this tool alone to
      select wiring for installation.
    </p>

  </div>
</details>
  
  ${electricalColorCodesHTML()}

`);

  }


if (page === "plc") {
  content.innerHTML = `
    <h2>🧠 PLC Toolkit</h2>
    <p>PLC programming, wiring, diagnostics, and training.</p>

    <details class="calculator">
      <summary>🪜 Ladder Logic Library</summary>
      <div class="calculator-body">

        <h3>Basic Ladder Instructions</h3>

        <p><strong>XIC — Examine If Closed</strong></p>
        <p>True when the referenced bit is 1.</p>

        <p><strong>XIO — Examine If Open</strong></p>
        <p>True when the referenced bit is 0.</p>

        <p><strong>OTE — Output Energize</strong></p>
        <p>Sets an output bit based on rung continuity.</p>

        <h3>Motor Start/Stop Seal-In Circuit</h3>

        <pre style="overflow-x:auto;font-size:12px;">
|----[ STOP_OK ]----+----[ START_PB ]----+----( MOTOR_RUN )----|
|                   |                    |
|                   +----[ MOTOR_RUN ]---+
        </pre>

        <p>START_PB energizes MOTOR_RUN.</p>
        <p>The MOTOR_RUN contact maintains the run command after Start is released.</p>
        <p>STOP_OK becomes false when Stop is pressed, breaking the rung.</p>

      </div>
    </details>

    <details class="calculator">
      <summary>🔌 PLC Wiring Diagrams</summary>
      <div class="calculator-body">
        <h3>PLC Input and Output Wiring</h3>
        <p>PNP and NPN sensors, digital inputs, relay outputs, and analog signals.</p>
      </div>
    </details>

    <details class="calculator">
      <summary>⏱️ Timers and Counters</summary>
       <div class="calculator-body">
    ${plcTonSimulatorHTML()}
    ${plcTofSimulatorHTML()}
    ${plcRtoSimulatorHTML()}
    ${plcCtuSimulatorHTML()}
    ${plcCtdSimulatorHTML()}
      </div>
    </details>

    ${plcLadderBuilderHTML()}


    <details class="calculator">
      <summary>🔍 PLC Troubleshooting</summary>
      <div class="calculator-body">
        <h3>Industrial PLC Diagnostics</h3>
        <p>Input faults, output faults, communication problems, and processor status.</p>
      </div>
    </details>


<details class="calculator">
  <summary>▶️ Interactive PLC Simulator</summary>
  <div class="calculator-body">
    ${plcMotorSimulatorHTML()}
  </div>
</details>

  `;
}

  

  

if (page === "vfd") {
  content.innerHTML = `

    <h2>⚙️ VFD Tools</h2>
    <p>Variable Frequency Drive Toolkit</p>

    <!-- VFD CALCULATORS -->
    <details class="calculator">
      <summary>🧮 VFD Calculators</summary>
      <div class="calculator-body">

        <details class="calculator">
          <summary>⚙️ Frequency & RPM Calculator</summary>
          <div class="calculator-body">

            <label>Output Frequency (Hz)</label>
            <input id="vfdHz" type="number"
                   value="60" min="0" step="any">

            <label>Motor Poles</label>
            <select id="vfdPoles">
              <option value="2">2 Poles</option>
              <option value="4" selected>4 Poles</option>
              <option value="6">6 Poles</option>
              <option value="8">8 Poles</option>
            </select>

            <button type="button"
                    class="action"
                    id="vfdRpmButton">
              Calculate RPM
            </button>

            <h3 id="vfdRpmResult">
              Synchronous RPM: --
            </h3>

            <p>Actual induction motor RPM
               may be lower due to slip.</p>

          </div>
        </details>

      </div>
    </details>


<!-- VFD DIAGRAMS -->
<details class="calculator">
  <summary>🔌 VFD Wiring Diagrams</summary>
  <div class="calculator-body">

    <details class="calculator">
      <summary>⚡ 2-Wire Start/Stop Control</summary>
      <div class="calculator-body">

        <h3>Maintained Run Switch</h3>
        <p>Click the switch button to simulate a VFD run command.</p>

        <svg viewBox="0 0 360 220"
             width="100%"
             role="img"
             aria-label="Two-wire VFD start stop control diagram">

          <rect width="360" height="220"
                rx="10" fill="#0f172a"/>

          <!-- VFD -->
          <rect x="230" y="30" width="115"
                height="170" rx="10"
                fill="#1e293b" stroke="#38bdf8"
                stroke-width="2"/>

          <text x="287" y="58" fill="#38bdf8"
                text-anchor="middle" font-size="18">
            VFD
          </text>

          <text x="242" y="103"
                fill="white" font-size="13">DI1</text>
          <text x="242" y="176"
                fill="white" font-size="13">DCM</text>

          <!-- Run switch -->
          <text x="125" y="48" fill="white"
                text-anchor="middle" font-size="13">
            RUN SWITCH
          </text>

          <circle cx="105" cy="95" r="5"
                  fill="#fbbf24"/>
          <circle cx="145" cy="95" r="5"
                  fill="#fbbf24"/>

          <line class="vfd-switch-blade"
                x1="105" y1="95"
                x2="138" y2="75"
                stroke="#fbbf24"
                stroke-width="4"
                stroke-linecap="round"/>

          <!-- Digital input circuit -->
          <path d="M15 95 H105 M145 95 H230"
                stroke="#fbbf24" stroke-width="3"
                fill="none"/>

          <text x="15" y="78" fill="#fbbf24"
                font-size="12">+24V</text>

          <!-- Common -->
          <path d="M230 170 H90 V205 H15"
                stroke="#38bdf8" stroke-width="3"
                fill="none"/>

          <text x="15" y="195"
                fill="#38bdf8" font-size="12">0V</text>
        </svg>

        <button type="button" class="action"
                onclick="toggleVfd2Wire(this)">
          Close RUN Switch
        </button>

        <h3 class="vfd-switch-status"
            aria-live="polite"
            style="color:#f87171">
          DRIVE COMMAND: STOP
        </h3>

        <h3>How It Works</h3>
        <p>1. Closing the maintained switch applies the run signal to DI1.</p>
        <p>2. The VFD receives a RUN request if properly configured.</p>
        <p>3. Opening the switch removes the RUN request.</p>

        <p style="font-size:12px;color:#94a3b8">
          Training diagram only. This assumes a
          compatible 24V sourcing input arrangement.
          Verify VFD terminal designations, internal
          versus external supply, input configuration
          and safety requirements before wiring.
          Removing RUN is not a safety-rated stop.
        </p>

      </div>
    </details>

<!-- 3-WIRE VFD CONTROL -->
<details class="calculator">
  <summary>🟢 3-Wire VFD Start/Stop</summary>
  <div class="calculator-body">

    <h3>Momentary START / STOP Control</h3>
    <p>Press START or STOP to simulate a VFD
       configured for three-wire control.</p>

    <svg viewBox="0 0 380 245"
         width="100%"
         role="img"
         aria-label="Conceptual three-wire VFD control diagram">

      <rect width="380" height="245"
            rx="10" fill="#0f172a"/>

      <rect x="245" y="30" width="120"
            height="185" rx="10"
            fill="#1e293b"
            stroke="#38bdf8" stroke-width="2"/>

      <text x="305" y="57" text-anchor="middle"
            fill="#38bdf8" font-size="18">VFD</text>

      <g fill="white" font-size="13">
        <text x="255" y="97">DI1 START</text>
        <text x="255" y="148">DI2 STOP</text>
        <text x="255" y="197">DCM</text>
      </g>

      <!-- START NO contact -->
      <path d="M20 91 H95 M115 91 H245"
            stroke="#22c55e" stroke-width="3"
            fill="none"/>
      <path d="M95 80 V102 M115 80 V102"
            stroke="#22c55e" stroke-width="3"/>
      <text x="105" y="70" text-anchor="middle"
            fill="#22c55e" font-size="12">START NO</text>

      <!-- STOP NC contact -->
      <path d="M20 142 H95 M115 142 H245"
            stroke="#f87171" stroke-width="3"
            fill="none"/>
      <path d="M95 131 V153 M115 131 V153
               M91 155 L119 129"
            stroke="#f87171" stroke-width="3"
            fill="none"/>
      <text x="105" y="120" text-anchor="middle"
            fill="#f87171" font-size="12">STOP NC</text>

      <!-- Common return -->
      <path d="M245 193 H185 V225 H20"
            stroke="#38bdf8" stroke-width="3"
            fill="none"/>

      <text x="20" y="81" fill="#fbbf24"
            font-size="11">+24V</text>
      <text x="20" y="132" fill="#fbbf24"
            font-size="11">+24V</text>
      <text x="20" y="219" fill="#38bdf8"
            font-size="11">0V</text>
    </svg>

    <button type="button"
            class="action"
            onclick="startVfd3Wire(this)"
            style="background:#16a34a">
      🟢 Press START
    </button>

    <button type="button"
            class="action"
            onclick="stopVfd3Wire(this)"
            style="background:#dc2626">
      🔴 Press STOP
    </button>

    <h3 class="vfd3-status"
        aria-live="polite"
        style="color:#f87171">
      DRIVE COMMAND: STOP
    </h3>

    <h3>How It Works</h3>
    <p>1. The START pushbutton is normally open.</p>
    <p>2. Pressing START sends a momentary run request.</p>
    <p>3. The VFD maintains the run state internally.</p>
    <p>4. Pressing the normally closed STOP
       button interrupts its stop input circuit.</p>
    <p>5. The VFD stops according to its programmed
       stopping method.</p>

    <p style="font-size:12px;color:#94a3b8">
      Educational control diagram. Terminal names,
      input polarity, internal 24V supply and
      three-wire parameter configuration vary by
      manufacturer. This does not represent a
      safety-rated stop circuit.
    </p>

  </div>
</details>

<!-- FORWARD / REVERSE VFD CONTROL -->
<details class="calculator">
  <summary>🔄 Forward / Reverse VFD Control</summary>
  <div class="calculator-body">

    <h3>VFD Direction Control</h3>
    <p>
      Simulate forward and reverse commands
      using two maintained digital inputs.
    </p>

    <svg viewBox="0 0 390 255"
         width="100%"
         role="img"
         aria-label="VFD forward reverse digital input diagram">

      <rect width="390" height="255"
            rx="10" fill="#0f172a"/>

      <!-- VFD -->
      <rect x="255" y="30" width="120"
            height="195" rx="10"
            fill="#1e293b"
            stroke="#38bdf8"
            stroke-width="2"/>

      <text x="315" y="55"
            text-anchor="middle"
            font-size="18"
            fill="#38bdf8">VFD</text>

      <g fill="white" font-size="12">
        <text x="265" y="100">DI1 FWD</text>
        <text x="265" y="155">DI2 REV</text>
        <text x="265" y="205">DCM</text>
      </g>

      <!-- Forward NO contact -->
      <path d="M20 95 H100 M125 95 H255"
            stroke="#22c55e"
            stroke-width="3" fill="none"/>

      <path class="vfd-fwd-contact"
            d="M100 82 V108 M125 82 V108"
            stroke="#22c55e"
            stroke-width="3"/>

      <text x="112" y="72"
            fill="#22c55e"
            text-anchor="middle"
            font-size="12">FWD NO</text>

      <!-- Reverse NO contact -->
      <path d="M20 150 H100 M125 150 H255"
            stroke="#f59e0b"
            stroke-width="3" fill="none"/>

      <path class="vfd-rev-contact"
            d="M100 137 V163 M125 137 V163"
            stroke="#f59e0b"
            stroke-width="3"/>

      <text x="112" y="129"
            fill="#f59e0b"
            text-anchor="middle"
            font-size="12">REV NO</text>

      <!-- Common return -->
      <path d="M255 200 H190 V239 H20"
            stroke="#38bdf8"
            stroke-width="3" fill="none"/>

      <text x="20" y="84"
            fill="#fbbf24"
            font-size="12">+24V</text>

      <text x="20" y="139"
            fill="#fbbf24"
            font-size="12">+24V</text>

      <text x="20" y="232"
            fill="#38bdf8"
            font-size="12">0V</text>

      <!-- Direction display -->
      <text class="vfd-direction-arrow"
            x="175" y="195"
            text-anchor="middle"
            font-size="31"
            fill="#94a3b8">■</text>

      <text x="175" y="220"
            text-anchor="middle"
            font-size="11"
            fill="#94a3b8">MOTOR DIRECTION</text>

    </svg>

    <button type="button"
            class="action"
            style="background:#16a34a"
            onclick="setVfdDirection(this,'forward')">
      ▶ FORWARD
    </button>

    <button type="button"
            class="action"
            style="background:#d97706"
            onclick="setVfdDirection(this,'reverse')">
      ◀ REVERSE
    </button>

    <button type="button"
            class="action"
            style="background:#dc2626"
            onclick="setVfdDirection(this,'stop')">
      ■ STOP
    </button>

    <h3 class="vfd-direction-status"
        aria-live="polite"
        style="color:#94a3b8">
      MOTOR: STOPPED
    </h3>

    <p class="vfd-interlock-message"
       aria-live="polite"></p>

    <h3>How It Works</h3>

    <p>
      1. FORWARD closes the simulated
      DI1 contact and requests forward rotation.
    </p>

    <p>
      2. STOP removes the direction/run request.
    </p>

    <p>
      3. REVERSE closes the simulated
      DI2 contact and requests reverse rotation.
    </p>

    <p>
      4. The training interlock requires
      STOP before changing direction.
    </p>

    <p style="font-size:12px;color:#94a3b8">
      Training simulation only. Assumes a VFD
      configured for two-wire forward/reverse
      command inputs using compatible 24V
      sourcing control. Check actual terminal
      functions, input polarity, drive parameters,
      and machine safety requirements. A RUN/STOP
      command is not a safety-rated stop.
    </p>

  </div>
</details>

<!-- COMPACTLOGIX PLC TO VFD - DIGITAL -->
<details class="calculator">
  <summary>🧠 CompactLogix PLC to VFD - Digital</summary>
  <div class="calculator-body">

    <h3>5069-OB16 Digital VFD Control</h3>
    <p>Simulate PLC RUN and REVERSE commands,
       along with VFD status feedback.</p>

    <svg viewBox="0 0 390 245" width="100%"
         role="img"
         aria-label="CompactLogix digital VFD control">

      <rect width="390" height="245" rx="10"
            fill="#0f172a"/>

      <rect x="12" y="30" width="145" height="175"
            rx="8" fill="#1e293b"
            stroke="#38bdf8" stroke-width="2"/>

      <text x="84" y="53" fill="#38bdf8"
            text-anchor="middle" font-size="15">
        CompactLogix
      </text>
      <text x="84" y="72" fill="white"
            text-anchor="middle" font-size="12">
        5069-OB16
      </text>

      <rect x="247" y="30" width="130" height="175"
            rx="8" fill="#1e293b"
            stroke="#4ade80" stroke-width="2"/>

      <text x="312" y="55" fill="#4ade80"
            text-anchor="middle" font-size="17">
        VFD
      </text>

      <!-- RUN output -->
      <path class="plc-run-wire"
            d="M157 102 H247"
            stroke="#64748b" stroke-width="4"/>

      <text x="18" y="105" fill="white"
            font-size="11">OUT 0 RUN</text>
      <text x="255" y="105" fill="white"
            font-size="11">DI1 RUN</text>

      <!-- REVERSE output -->
      <path class="plc-rev-wire"
            d="M157 151 H247"
            stroke="#64748b" stroke-width="4"/>

      <text x="18" y="154" fill="white"
            font-size="11">OUT 1 REV</text>
      <text x="255" y="154" fill="white"
            font-size="11">DI2 REV</text>

      <!-- Simplified common reference -->
      <path d="M247 185 H201 V220 H157"
            fill="none" stroke="#38bdf8"
            stroke-width="3"/>

      <text x="255" y="190" fill="white"
            font-size="11">DI COM</text>
      <text x="75" y="223" fill="#7dd3fc"
            font-size="10">0V reference*</text>

      <circle class="plc-run-led"
              cx="141" cy="102" r="6"
              fill="#475569"/>

      <circle class="plc-rev-led"
              cx="141" cy="151" r="6"
              fill="#475569"/>

    </svg>

    <button type="button" class="action"
            style="background:#16a34a"
            onclick="plcVfdCommand(this,'run')">
      START FORWARD
    </button>

    <button type="button" class="action"
            style="background:#d97706"
            onclick="plcVfdCommand(this,'reverse')">
      START REVERSE
    </button>

    <button type="button" class="action"
            style="background:#dc2626"
            onclick="plcVfdCommand(this,'stop')">
      STOP
    </button>

    <h3 class="plc-vfd-status"
        aria-live="polite" style="color:#94a3b8">
      PLC COMMAND: STOPPED
    </h3>

    <p class="plc-vfd-interlock"
       aria-live="polite"></p>

    <h3>Simulated VFD Feedback</h3>

    <label>
      <input type="checkbox" class="plc-vfd-running"
             style="width:auto"
             onchange="plcVfdFeedback(this)">
      VFD Running Feedback - 5069-IB16 IN 0
    </label>

    <label>
      <input type="checkbox" class="plc-vfd-fault"
             style="width:auto"
             onchange="plcVfdFeedback(this)">
      VFD Fault Feedback - 5069-IB16 IN 1
    </label>

    <p class="plc-vfd-feedback"
       aria-live="polite">Feedback: Not running</p>

    <h3>How It Works</h3>
    <p>OUT 0 requests forward operation through DI1.</p>
    <p>OUT 1 requests reverse operation through DI2.</p>
    <p>STOP removes both simulated run commands.</p>
    <p>Feedback contacts are simulated independently
       to demonstrate command versus actual status.</p>

    <p style="font-size:12px;color:#94a3b8">
      Training schematic, not installation wiring.
      The 5069-OB16 sourcing outputs require
      correctly supplied field power. Use matching
      VFD sourcing-compatible input configuration.
      DI common wiring, external 24V supply,
      feedback contact power, and field protection
      must be verified for the selected equipment.
      The 0V line above is conceptual, not a
      connection from an OB16 output terminal.
    </p>

  </div>
</details>


<!-- COMPACTLOGIX PLC TO VFD - ANALOG -->
<details class="calculator">
  <summary>📈 CompactLogix PLC to VFD - Analog</summary>
  <div class="calculator-body">

    <h3>5069-OF4 Analog Speed Control</h3>

    <p>Adjust the simulated PLC speed command
       sent to the VFD analog reference input.</p>

    <svg viewBox="0 0 390 200" width="100%"
         role="img"
         aria-label="CompactLogix analog speed reference">

      <rect width="390" height="200" rx="10"
            fill="#0f172a"/>

      <rect x="12" y="26" width="148" height="145"
            rx="9" fill="#1e293b"
            stroke="#38bdf8" stroke-width="2"/>

      <text x="86" y="51" fill="#38bdf8"
            text-anchor="middle" font-size="15">
        CompactLogix
      </text>

      <text x="86" y="72" fill="white"
            text-anchor="middle" font-size="12">
        5069-OF4
      </text>

      <rect x="245" y="26" width="132" height="145"
            rx="9" fill="#1e293b"
            stroke="#4ade80" stroke-width="2"/>

      <text x="311" y="51" fill="#4ade80"
            text-anchor="middle" font-size="16">
        VFD
      </text>

      <path d="M160 100 H245"
            stroke="#fbbf24" stroke-width="4"/>

      <path d="M160 147 H245"
            stroke="#38bdf8" stroke-width="3"/>

      <text x="18" y="95" fill="white"
            font-size="11">AO CH0 +</text>

      <text x="18" y="142" fill="white"
            font-size="11">AO return</text>

      <text x="253" y="95" fill="white"
            font-size="11">AI SPEED</text>

      <text x="253" y="142" fill="white"
            font-size="11">AI COM</text>

      <text x="203" y="88" fill="#fbbf24"
            text-anchor="middle" font-size="11">
        SIGNAL
      </text>

      <text x="203" y="135" fill="#7dd3fc"
            text-anchor="middle" font-size="11">
        RETURN
      </text>

      <text x="195" y="190" fill="#94a3b8"
            text-anchor="middle" font-size="10">
        Select matching voltage/current mode
      </text>

    </svg>

    <label>Analog Output Type</label>
    <select class="plc-analog-mode"
            onchange="updatePlcAnalog(this)"
            style="width:100%;padding:13px">
      <option value="voltage">0-10V DC</option>
      <option value="current">4-20mA</option>
    </select>

    <label>Motor Maximum Frequency (Hz)</label>
    <input type="number" class="plc-analog-max"
           value="60" min="0.1" max="400"
           step="any" oninput="updatePlcAnalog(this)">

    <label>Speed Command (%)</label>
    <input type="range" class="plc-analog-slider"
           min="0" max="100" value="50"
           step="1" oninput="updatePlcAnalog(this)"
           style="width:100%">

    <h3 class="plc-analog-percent"
        style="color:#38bdf8">
      Speed Command: 50%
    </h3>

    <h3 class="plc-analog-signal"
        style="color:#4ade80">
      Analog Output: 5.00 V
    </h3>

    <h3 class="plc-analog-frequency"
        style="color:#fbbf24">
      Frequency Reference: 30.00 Hz
    </h3>

    <p class="plc-analog-note"
       style="color:#94a3b8;font-size:12px">
      Frequency reference only. This does not
      issue a RUN command.
    </p>

    <h3>How It Works</h3>
    <p>The PLC scales a speed setpoint into
       the configured analog output range.</p>
    <p>The VFD converts that reference into
       a commanded output frequency.</p>
    <p>Actual motor speed depends on motor poles,
       slip, load and drive configuration.</p>

    <p style="font-size:12px;color:#94a3b8">
      Educational block diagram. Confirm the
      5069-OF4 channel-specific voltage/current
      terminals and returns in Rockwell wiring
      documentation. Configure the VFD analog input
      to match the signal. Verify grounding,
      shielding, isolation and input compatibility.
      Actual drive scaling, limits and fault
      handling may differ.
    </p>

  </div>
</details>

  </div>
</details>


    <!-- VFD PARAMETERS -->
    <details class="calculator">
      <summary>⚙️ VFD Parameters</summary>
      <div class="calculator-body">
        <p>Motor nameplate settings</p>
        <p>Acceleration and deceleration</p>
        <p>Minimum and maximum frequency</p>
        <p>Run command source</p>
        <p>Speed reference source</p>
      </div>
    </details>


<!-- VFD FAULT LIBRARY -->
<details class="calculator">
  <summary>🚨 VFD Fault Codes</summary>
  <div class="calculator-body">

<details class="calculator">
  <summary>⚡ PowerFlex 525 Fault Codes</summary>
  <div class="calculator-body">

    <h3>Allen-Bradley PowerFlex 525</h3>
    <p>
      Search drive faults and view
      troubleshooting recommendations.
    </p>

    <label for="pf525Search">Search Fault Codes</label>
    <input
      type="search"
      id="pf525Search"
      placeholder="Example: F059, overload, network"
      oninput="searchPF525Faults()"
      autocomplete="off"
    >

    <button type="button"
            class="action"
            onclick="clearPF525Search()">
      Clear Search
    </button>

    <p id="pf525Count" aria-live="polite"></p>

    <div id="pf525FaultResults"></div>

  <p style="font-size:12px;color:#94a3b8">
      Troubleshooting reference only.
      Verify the drive model, firmware,
      and official Rockwell documentation.
      Follow lockout/tagout and electrical
      safety procedures before servicing.
      Never bypass a safety circuit.
    </p>

    <a href="https://literature.rockwellautomation.com/idc/groups/literature/documents/um/520-um001_-en-e.pdf"
       target="_blank"
       rel="noopener noreferrer"
       style="color:#38bdf8">
      Official PowerFlex 520-Series User Manual
    </a>

  </div>
</details>

<!-- POWERFLEX 753 FAULT LIBRARY -->
<details class="calculator">
  <summary>⚙️ PowerFlex 753 Fault Codes</summary>
  <div class="calculator-body">

    <h3>Allen-Bradley PowerFlex 753</h3>
    <p>Search by fault number, name or symptom.</p>

    <label for="pf753Search">Search Fault Codes</label>
    <input
      type="search"
      id="pf753Search"
      placeholder="Example: 12, overcurrent, network"
      oninput="searchPF753Faults()"
      autocomplete="off"
    >

    <button type="button"
            class="action"
            onclick="clearPF753Search()">
      Clear Search
    </button>

    <p id="pf753Count" aria-live="polite">
      Enter a fault code or keyword to search.
    </p>

    <div id="pf753FaultResults"></div>

    <p style="font-size:12px;color:#94a3b8">
      PowerFlex 753 training reference.
      Verify the actual fault number, port,
      firmware and installed options.
      Follow electrical safety and
      lockout/tagout procedures.
    </p>

    <a
      href="https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/750-pm001_-en-p.pdf"
      target="_blank"
      rel="noopener noreferrer"
      style="color:#38bdf8">
      Official PowerFlex 750-Series Programming Manual
    </a>
  
    </div>
</details>


  </div>
</details>



<!-- INTERACTIVE VFD TROUBLESHOOTING -->
<details class="calculator">
  <summary>🔧 VFD Troubleshooting</summary>
  <div class="calculator-body">

    
<details class="calculator">
  <summary>⚙️ Interactive VFD Diagnostics</summary>
  <div class="calculator-body">

    <h3>Guided Troubleshooting Checklist</h3>


    <p>
      Select the problem you're experiencing
      to view a step-by-step troubleshooting guide.
    </p>

    <label for="vfdTroubleSymptom">
      Select VFD Problem
    </label>

    <select id="vfdTroubleSymptom"
            onchange="loadVfdTroubleshooting()"
            style="width:100%;padding:13px;
                   margin:10px 0;border-radius:8px;
                   font-size:16px;">

      <option value="">-- Select a Problem --</option>
      <option value="blank">Drive Display Is Blank</option>
      <option value="noStart">Drive Will Not Start</option>
      <option value="overcurrent">Overcurrent Fault</option>
      <option value="overvoltage">Overvoltage Fault</option>
      <option value="undervoltage">Undervoltage Fault</option>
      <option value="speed">Motor Speed Problem</option>
      <option value="network">Communication Fault</option>
      <option value="overheat">Drive Overheating</option>

    </select>

    <div id="vfdTroubleProgressBox"
         style="display:none;margin:15px 0;">

      <p id="vfdTroubleProgress"
         aria-live="polite"></p>

      <div style="background:#334155;
                  height:10px;border-radius:8px;
                  overflow:hidden;">

        <div id="vfdTroubleBar"
             style="background:#38bdf8;
                    width:0%;height:100%;
                    transition:width .2s;">
        </div>
      </div>
    </div>

    <div id="vfdTroubleResults">
      <p style="color:#94a3b8">
        Select a problem above to begin.
      </p>
    </div>

    <p style="font-size:12px;color:#94a3b8">
      Training and diagnostic reference only.
      Follow site safety procedures, LOTO
      requirements, and the specific drive manual.
      Isolate hazardous energy and verify DC bus
      discharge before servicing. Never bypass
      an interlock or safety circuit.
      Checking an item does not certify the
      equipment safe to operate.
    </p>

  </div>
</details>

  </div>
</details>


  `;
  searchPF525Faults();
  addVfdDiagnosticAssistant();
}

  if (page === "maintenance") {
    content.innerHTML = `
      <h2>🔧 Maintenance Guides</h2>
      <p>Motors, sensors, relays, and industrial equipment.</p>
      <p>Maintenance guides coming soon.</p>
    `;
  }
}
   
// AUTOMATIC COLLAPSIBLE CALCULATORS

const originalShow = show;

show = function(page) {
  originalShow(page);

  if (page !== "electrical") return;

  const content =
    document.getElementById("content");

  const headings = [...content.children]
    .filter(el => el.tagName === "H2");

  headings.forEach(heading => {

    const details =
      document.createElement("details");

    details.className = "calculator";

    const summary =
      document.createElement("summary");

    summary.textContent =
      heading.textContent.trim();

    const body =
      document.createElement("div");

    body.className = "calculator-body";

    let node = heading.nextSibling;

    heading.replaceWith(details);

    while (
      node &&
      !(node.nodeType === 1 &&
        node.tagName === "H2")
    ) {
      const next = node.nextSibling;

      if (
        node.nodeType === 1 &&
        node.tagName === "HR"
      ) {
        node.remove();
      } else {
        body.appendChild(node);
      }

      node = next;
    }

    details.append(summary, body);
  });

  // Expand / Collapse All Buttons

  const toolbar =
    document.createElement("div");

  toolbar.className =
    "calculator-toolbar";

  toolbar.innerHTML = `
    <button type="button"
      class="calculator-control">
      Expand All
    </button>
    <button type="button"
      class="calculator-control">
      Collapse All
    </button>
  `;

  const buttons =
    toolbar.querySelectorAll("button");

  buttons[0].onclick = function() {
    content.querySelectorAll(
      "details.calculator"
    ).forEach(calc => {
      calc.open = true;
    });
  };

  buttons[1].onclick = function() {
    content.querySelectorAll(
      "details.calculator"
    ).forEach(calc => {
      calc.open = false;
    });
  };

  content.prepend(toolbar);
};

/* VFD RPM Calculator */

document.addEventListener("click", function(event) {

  if (!event.target.closest("#vfdRpmButton")) {
    return;
  }

  const hzInput = document.getElementById("vfdHz");
  const polesInput = document.getElementById("vfdPoles");
  const result = document.getElementById("vfdRpmResult");

  if (!hzInput || !polesInput || !result) return;

  const hz = Number(hzInput.value);
  const poles = Number(polesInput.value);

  if (hzInput.value.trim() === "" ||
      !Number.isFinite(hz) || hz < 0) {
    result.textContent = "Enter a valid frequency.";
    return;
  }

  const rpm = (120 * hz) / poles;

  result.textContent =
    "Synchronous RPM: " + rpm.toFixed(1);
});

function toggleVfd2Wire(button) {
  const diagram = button.closest(".calculator");
  const blade = diagram.querySelector(".vfd-switch-blade");
  const status = diagram.querySelector(".vfd-switch-status");

  const running = button.dataset.running === "true";

  if (running) {
    blade.setAttribute("x2", "138");
    blade.setAttribute("y2", "75");
    status.textContent = "DRIVE COMMAND: STOP";
    status.style.color = "#f87171";
    button.textContent = "Close RUN Switch";
    button.dataset.running = "false";
  } else {
    blade.setAttribute("x2", "145");
    blade.setAttribute("y2", "95");
    status.textContent = "DRIVE COMMAND: RUN";
    status.style.color = "#4ade80";
    button.textContent = "Open RUN Switch";
    button.dataset.running = "true";
  }
}

function startVfd3Wire(button) {
  const diagram = button.closest(".calculator");
  const status = diagram.querySelector(".vfd3-status");

  status.textContent = "DRIVE COMMAND: RUN";
  status.style.color = "#4ade80";
}

function stopVfd3Wire(button) {
  const diagram = button.closest(".calculator");
  const status = diagram.querySelector(".vfd3-status");

  status.textContent = "DRIVE COMMAND: STOP";
  status.style.color = "#f87171";
}

function setVfdDirection(button, direction) {

  const diagram = button.closest(".calculator");

  const status = diagram.querySelector(
    ".vfd-direction-status"
  );

  const arrow = diagram.querySelector(
    ".vfd-direction-arrow"
  );

  const message = diagram.querySelector(
    ".vfd-interlock-message"
  );

  const fwd = diagram.querySelector(
    ".vfd-fwd-contact"
  );

  const rev = diagram.querySelector(
    ".vfd-rev-contact"
  );

  const current = diagram.dataset.direction || "stop";

  // Require STOP before reversing direction.
  if (direction !== "stop" &&
      current !== "stop" &&
      direction !== current) {

    message.textContent =
      "INTERLOCK ACTIVE: Press STOP before reversing.";

    message.style.color = "#facc15";
    return;
  }

  diagram.dataset.direction = direction;
  message.textContent = "";

  // Open both contacts by default.
  fwd.setAttribute(
    "d", "M100 82 V108 M125 82 V108"
  );

  rev.setAttribute(
    "d", "M100 137 V163 M125 137 V163"
  );

  if (direction === "forward") {

    fwd.setAttribute(
      "d", "M100 95 H125"
    );

    status.textContent = "MOTOR: FORWARD";
    status.style.color = "#4ade80";

    arrow.textContent = "↻";
    arrow.setAttribute("fill", "#4ade80");

  } else if (direction === "reverse") {

    rev.setAttribute(
      "d", "M100 150 H125"
    );

    status.textContent = "MOTOR: REVERSE";
    status.style.color = "#fbbf24";

    arrow.textContent = "↺";
    arrow.setAttribute("fill", "#fbbf24");

  } else {

    status.textContent = "MOTOR: STOPPED";
    status.style.color = "#94a3b8";

    arrow.textContent = "■";
    arrow.setAttribute("fill", "#94a3b8");
  }
}

function plcVfdCommand(button, command) {
  const panel = button.closest(".calculator");
  const current = panel.dataset.command || "stop";
  const status = panel.querySelector(".plc-vfd-status");
  const warning = panel.querySelector(".plc-vfd-interlock");
  const runWire = panel.querySelector(".plc-run-wire");
  const revWire = panel.querySelector(".plc-rev-wire");
  const runLed = panel.querySelector(".plc-run-led");
  const revLed = panel.querySelector(".plc-rev-led");
  const fault = panel.querySelector(".plc-vfd-fault");

  if (fault.checked && command !== "stop") {
    warning.textContent =
      "FAULT ACTIVE: Clear fault before a new command.";
    warning.style.color = "#facc15";
    return;
  }

  if (current !== "stop" && command !== "stop"
      && current !== command) {
    warning.textContent =
      "INTERLOCK: Press STOP before changing direction.";
    warning.style.color = "#facc15";
    return;
  }

  panel.dataset.command = command;
  warning.textContent = "";

  const forward = command === "run";
  const reverse = command === "reverse";

  runWire.setAttribute("stroke",
    forward ? "#4ade80" : "#64748b");
  revWire.setAttribute("stroke",
    reverse ? "#fbbf24" : "#64748b");

  runLed.setAttribute("fill",
    forward ? "#4ade80" : "#475569");
  revLed.setAttribute("fill",
    reverse ? "#fbbf24" : "#475569");

  if (forward) {
    status.textContent = "PLC COMMAND: FORWARD";
    status.style.color = "#4ade80";
  } else if (reverse) {
    status.textContent = "PLC COMMAND: REVERSE";
    status.style.color = "#fbbf24";
  } else {
    status.textContent = "PLC COMMAND: STOPPED";
    status.style.color = "#94a3b8";
  }
}

function plcVfdFeedback(input) {
  const panel = input.closest(".calculator");
  const running =
    panel.querySelector(".plc-vfd-running").checked;
  const fault =
    panel.querySelector(".plc-vfd-fault").checked;
  const display =
    panel.querySelector(".plc-vfd-feedback");

  if (fault) {
    display.textContent =
      "FEEDBACK: VFD FAULT ACTIVE";
    display.style.color = "#f87171";
  } else if (running) {
    display.textContent =
      "FEEDBACK: VFD RUNNING";
    display.style.color = "#4ade80";
  } else {
    display.textContent =
      "FEEDBACK: VFD NOT RUNNING";
    display.style.color = "#94a3b8";
  }
}

function updatePlcAnalog(input) {
  const panel = input.closest(".calculator");
  const mode =
    panel.querySelector(".plc-analog-mode").value;
  const percent =
    Number(panel.querySelector(".plc-analog-slider").value);
  const max =
    Number(panel.querySelector(".plc-analog-max").value);

  const percentDisplay =
    panel.querySelector(".plc-analog-percent");
  const signalDisplay =
    panel.querySelector(".plc-analog-signal");
  const frequencyDisplay =
    panel.querySelector(".plc-analog-frequency");

  percentDisplay.textContent =
    "Speed Command: " + percent + "%";

  if (mode === "voltage") {
    const volts = percent / 100 * 10;
    signalDisplay.textContent =
      "Analog Output: " + volts.toFixed(2) + " V";
  } else {
    const ma = 4 + percent / 100 * 16;
    signalDisplay.textContent =
      "Analog Output: " + ma.toFixed(2) + " mA";
  }

  if (!Number.isFinite(max) || max <= 0) {
    frequencyDisplay.textContent =
      "Enter a valid maximum frequency.";
    return;
  }

  const hz = percent / 100 * max;
  frequencyDisplay.textContent =
    "Frequency Reference: " + hz.toFixed(2) + " Hz";
}


