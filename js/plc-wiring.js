
/* PLC WIRING & SCHEMATIC READING
   Maintenance Tech Toolkit
   Educational diagrams — verify actual module pinouts.
*/

function plcDiagramFrame(label, artwork, height = 200) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="${label}"
      viewBox="0 0 400 ${height}"
      style="display:block;width:100%;max-width:100%;
             min-width:0;height:auto;background:#0f172a;
             border-radius:10px;margin:12px 0;">
      ${artwork}
    </svg>`;
}

function plcSensorWiringSVG(type) {
  const npn = type === "NPN";

  const commonWire = npn
    ? `<path d="M40 70 V18 H392 V142 H380"
        stroke="#f59e0b" stroke-width="3" fill="none"/>`
    : `<path d="M18 142 V181 H392 V142 H380"
        stroke="#38bdf8" stroke-width="3" fill="none"/>`;

  return plcDiagramFrame(
    `${type} sensor connected to PLC input`,
    `
    <rect x="116" y="42" width="108" height="118" rx="8"
      fill="#1e293b" stroke="#64748b" stroke-width="2"/>
    <rect x="270" y="42" width="110" height="118" rx="8"
      fill="#1e293b" stroke="#64748b" stroke-width="2"/>

    ${commonWire}

    <path d="M18 70 H116" stroke="#f59e0b"
      stroke-width="3" fill="none"/>
    <path d="M18 142 H116" stroke="#38bdf8"
      stroke-width="3" fill="none"/>
    <path d="M224 105 H270" stroke="#e2e8f0"
      stroke-width="3" fill="none"/>

    <circle cx="40" cy="70" r="4" fill="#f59e0b"/>

    <text x="20" y="58" fill="#fde68a"
      font-size="12">BRN +24V</text>
    <text x="20" y="133" fill="#7dd3fc"
      font-size="12">BLU 0V</text>
    <text x="230" y="94" fill="#e2e8f0"
      font-size="11">BLK</text>

    <text x="170" y="81" fill="white"
      font-size="16" text-anchor="middle"
      font-weight="bold">${type}</text>
    <text x="170" y="102" fill="#cbd5e1"
      font-size="11" text-anchor="middle">SENSOR</text>
    <text x="170" y="120" fill="#cbd5e1"
      font-size="10" text-anchor="middle">3-wire DC</text>

    <text x="325" y="70" fill="white"
      font-size="13" text-anchor="middle"
      font-weight="bold">PLC INPUT</text>
    <text x="286" y="106" fill="#86efac"
      font-size="12">DI0</text>
    <text x="286" y="145" fill="#cbd5e1"
      font-size="12">COM</text>

    <text x="170" y="195" fill="#94a3b8"
      font-size="11" text-anchor="middle">
      Input common: ${npn ? "+24V" : "0V"}
    </text>
    `
  );
}

function plcRelayOutputSVG() {
  return plcDiagramFrame("PLC relay output to DC load", `
    <rect x="116" y="48" width="155" height="98" rx="8"
      fill="#1e293b" stroke="#64748b" stroke-width="2"/>

    <text x="194" y="40" fill="#e2e8f0"
      font-size="12" text-anchor="middle">
      PLC RELAY OUTPUT
    </text>

    <path d="M18 82 H166" stroke="#f59e0b"
      stroke-width="3" fill="none"/>
    <path d="M166 82 L203 60" stroke="#f59e0b"
      stroke-width="3" fill="none"/>
    <path d="M216 82 H296" stroke="#f59e0b"
      stroke-width="3" fill="none"/>
    <circle cx="211" cy="82" r="4" fill="#f59e0b"/>

    <circle cx="315" cy="82" r="19"
      fill="none" stroke="#a7f3d0" stroke-width="3"/>
    <path d="M315 101 V161 H18" stroke="#38bdf8"
      stroke-width="3" fill="none"/>

    <text x="18" y="61" fill="#fde68a"
      font-size="12">Fused +24V</text>
    <text x="18" y="178" fill="#7dd3fc"
      font-size="12">0V</text>
    <text x="153" y="128" fill="#e2e8f0"
      font-size="11">COM</text>
    <text x="225" y="128" fill="#e2e8f0"
      font-size="11">NO</text>
    <text x="315" y="45" fill="#a7f3d0"
      font-size="12" text-anchor="middle">LOAD</text>
    <text x="315" y="87" fill="white"
      font-size="12" text-anchor="middle">K1</text>
  `);
}

function plcStartInputSVG() {
  return plcDiagramFrame("START button wired to PLC input", `
    <rect x="270" y="47" width="110" height="98" rx="8"
      fill="#1e293b" stroke="#64748b" stroke-width="2"/>

    <path d="M18 83 H66 M88 83 H142 M163 83 H270"
      stroke="#f59e0b" stroke-width="3" fill="none"/>

    <rect x="66" y="75" width="22" height="16"
      fill="none" stroke="#f59e0b" stroke-width="2"/>

    <path d="M143 73 V93 M163 73 V93"
      stroke="#e2e8f0" stroke-width="2"/>

    <path d="M380 122 H392 V171 H18"
      stroke="#38bdf8" stroke-width="3" fill="none"/>

    <text x="18" y="62" fill="#fde68a"
      font-size="12">+24V</text>
    <text x="67" y="65" fill="#cbd5e1"
      font-size="11">F1</text>
    <text x="120" y="63" fill="#cbd5e1"
      font-size="11">S1 START (NO)</text>

    <text x="325" y="72" fill="white"
      font-size="13" text-anchor="middle">PLC INPUT</text>
    <text x="289" y="87" fill="#86efac"
      font-size="12">DI0</text>
    <text x="289" y="125" fill="#cbd5e1"
      font-size="12">COM</text>
    <text x="18" y="188" fill="#7dd3fc"
      font-size="12">0V</text>
  `);
}

/* ========================================
   PLC WIRING DIAGRAMS
======================================== */

function plcWiringDiagramsHTML() {
  return `
    <details class="calculator">
      <summary>🔌 PLC Wiring Diagrams</summary>
      <div class="calculator-body">

        <p>Basic PLC wiring examples. Always verify
        the exact controller and I/O module specifications.</p>

        <details class="calculator">
          <summary>PNP Sensor to PLC Digital Input</summary>
          <div class="calculator-body">

            ${plcSensorWiringSVG("PNP")}

            <p><strong>Brown:</strong> +24V</p>
            <p><strong>Blue:</strong> 0V</p>
            <p><strong>Black:</strong> Signal to PLC input</p>

            <p>When ON, a PNP sensor normally provides
            +24V to the input. A compatible sinking
            PLC input has its common connected to 0V.</p>
          </div>
        </details>

        <details class="calculator">
          <summary>NPN Sensor to PLC Digital Input</summary>
          <div class="calculator-body">

            ${plcSensorWiringSVG("NPN")}

            <p><strong>Brown:</strong> +24V</p>
            <p><strong>Blue:</strong> 0V</p>
            <p><strong>Black:</strong> Signal to PLC input</p>

            <p>When ON, an NPN sensor normally pulls
            the input toward 0V. A compatible sourcing
            PLC input has its common connected to +24V.</p>
          </div>
        </details>

        <details class="calculator">
          <summary>PLC Relay Output to DC Load</summary>
          <div class="calculator-body">

            ${plcRelayOutputSVG()}

            <p>A relay output acts as an electrically
            operated contact. It does not automatically
            provide power to the connected device.</p>

            <p>Verify external supply voltage, contact
            ratings, load current, fuse protection,
            and appropriate load suppression.</p>
          </div>
        </details>

        <p style="font-size:12px;opacity:.8;">
          These are educational diagrams, not exact
          terminal or pinout instructions.
        </p>

      </div>
    </details>
  `;
}

/* ========================================
   SCHEMATIC READING GUIDES
======================================== */

function plcSchematicTipsHTML() {
  return `
    <details class="calculator">
      <summary>📖 How to Read PLC Schematics</summary>

      <div class="calculator-body">

        <details class="calculator">
          <summary>7 Steps to Trace a Circuit</summary>
          <div class="calculator-body">
            <ol>
              <li>Read the drawing title, number,
                  and revision.</li>
              <li>Locate the control-power source
                  and return.</li>
              <li>Identify fuses, circuit breakers,
                  and disconnects.</li>
              <li>Locate the field device such as
                  a sensor, switch, or relay.</li>
              <li>Follow wire numbers and
                  terminal-block references.</li>
              <li>Identify the PLC input or output
                  channel and its common.</li>
              <li>Compare the drawing with actual
                  device and PLC status.</li>
            </ol>
          </div>
        </details>

        <details class="calculator">
          <summary>Common Schematic Symbols</summary>
          <div class="calculator-body">

            <p><strong>NO Contact:</strong>
            Normally open in its normal state.</p>

            <p><strong>NC Contact:</strong>
            Normally closed in its normal state.</p>

            <p><strong>F1 / FU:</strong>
            Often identifies a fuse.</p>

            <p><strong>S1 / PB:</strong>
            Often identifies a switch or pushbutton.</p>

            <p><strong>K1 / CR:</strong>
            Often identifies a relay or contactor.</p>

            <p><strong>TB / X:</strong>
            Often identifies a terminal block.</p>

            <p><strong>COM:</strong>
            An input or output group's common
            connection; not necessarily earth ground.</p>

            <p><strong>Wire Numbers:</strong>
            Help trace conductors across drawing pages.</p>

            <p><strong>Important:</strong>
            XIC and XIO are PLC instructions.
            They do not by themselves determine
            whether a physical device is NO or NC.</p>

          </div>
        </details>

        <details class="calculator">
          <summary>Example: Trace a START Pushbutton</summary>
          <div class="calculator-body">

            ${plcStartInputSVG()}

            <p>Follow the electrical path:</p>

            <p><strong>
              +24V → F1 → S1 START → PLC DI0
            </strong></p>

            <p>The PLC input common returns to 0V.</p>

            <p>When the normally-open START contact
            closes, the input should turn ON if the
            wiring and voltage meet module specifications.</p>

            <p>Next, verify the ladder program references
            the correct input tag.</p>

          </div>
        </details>

        <details class="calculator">
          <summary>Schematic Troubleshooting Tips</summary>
          <div class="calculator-body">

            <p><strong>1. Follow the signal.</strong>
            Determine what should turn ON or OFF.</p>

            <p><strong>2. Check both sides.</strong>
            A missing common can make a good sensor
            appear faulty.</p>

            <p><strong>3. Follow wire numbers.</strong>
            Check terminal strips and page references.</p>

            <p><strong>4. Check the drawing revision.</strong>
            Machine wiring may have been modified.</p>

            <p><strong>5. Compare field and PLC states.</strong>
            Check the physical device, input LED,
            and online tag.</p>

            <p><strong>6. Verify before replacing.</strong>
            An OFF input does not automatically mean
            a failed input card.</p>

          </div>
        </details>

        <p style="font-size:12px;opacity:.8;">
          Training reference only. Electrical testing
          must follow approved safe-work procedures.
          Isolate and lock out equipment as required.
        </p>

      </div>
    </details>
  `;
}
