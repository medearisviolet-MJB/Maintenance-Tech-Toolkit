
/* ==========================================
   ELECTRICAL WIRE COLOR CODE REFERENCE
========================================== */

const electricalColorSystems = {
  "208": {
    title: "120/208V — Three-Phase Wye",
    standard: "Common U.S. convention",
    wires: [
      ["Phase A — L1", "Black", "#111827"],
      ["Phase B — L2", "Red", "#dc2626"],
      ["Phase C — L3", "Blue", "#2563eb"],
      ["Neutral", "White", "#ffffff"],
      ["Equipment Ground", "Green / Bare", "#16a34a"]
    ],
    note: "Phase colors are customary, not a mandatory NEC sequence."
  },

  "480": {
    title: "277/480V — Three-Phase Wye",
    standard: "Common U.S. convention",
    wires: [
      ["Phase A — L1", "Brown", "#92400e"],
      ["Phase B — L2", "Orange", "#f97316"],
      ["Phase C — L3", "Yellow", "#eab308"],
      ["Neutral", "Gray", "#9ca3af"],
      ["Equipment Ground", "Green / Bare", "#16a34a"]
    ],
    note: "Brown/Orange/Yellow is a common convention. Verify site identification."
  },

  "delta": {
    title: "120/240V — High-Leg Delta",
    standard: "Typical U.S. identification",
    wires: [
      ["Phase A", "Black", "#111827"],
      ["High Leg — often B", "Orange", "#f97316"],
      ["Phase C", "Blue", "#2563eb"],
      ["Neutral", "White", "#ffffff"],
      ["Equipment Ground", "Green / Bare", "#16a34a"]
    ],
    note: "The high leg is approximately 208V to neutral. NEC 110.15 requires orange identification or other effective marking. Verify the actual high-leg location."
  },

  "sensor": {
    title: "24V DC — Common Sensor Wiring",
    standard: "Typical IEC/M12 sensor convention",
    wires: [
      ["Power +24V DC", "Brown", "#92400e"],
      ["Power 0V DC", "Blue", "#2563eb"],
      ["Switching Output Q1", "Black", "#111827"],
      ["Optional Output Q2", "White", "#ffffff"]
    ],
    note: "White is device-dependent and may have another function. Always check the sensor's wiring diagram and connector pinout."
  },

  "control": {
    title: "Industrial Control Panel",
    standard: "Common NFPA 79 identifications",
    wires: [
      ["Ungrounded Power", "Black", "#111827"],
      ["AC Control", "Red", "#dc2626"],
      ["DC Control", "Blue", "#2563eb"],
      ["Grounded AC Common", "White", "#ffffff"],
      ["Grounded DC Common", "White/Blue", "whiteblue"],
      ["Excepted Energized Circuit", "Orange", "#f97316"],
      ["Equipment Ground", "Green", "#16a34a"]
    ],
    note: "Color identifies circuit functions under applicable machinery standards. Orange may indicate wiring still energized with the main disconnect OFF. Verify the applicable NFPA 79 edition and the machine schematic."
  },

  "iec": {
    title: "IEC — Three-Phase AC",
    standard: "IEC conductor identification",
    wires: [
      ["L1", "Brown", "#92400e"],
      ["L2", "Black", "#111827"],
      ["L3", "Gray", "#9ca3af"],
      ["Neutral — N", "Blue", "#2563eb"],
      ["Protective Earth — PE", "Green/Yellow", "greenyellow"]
    ],
    note: "Common IEC three-phase identification. Verify applicable national requirements and equipment markings."
  }
};

function electricalColorCodesHTML() {
  return `
    <details class="calculator"
      ontoggle="if(this.open) renderElectricalColors()">

      <summary>Electrical Color Codes</summary>

      <div class="calculator-body">

        <h3>Electrical Wire Color Codes</h3>

        <p>
          Select an electrical system to view
          common conductor identification colors.
        </p>

        <label for="electricalColorSystem">
          Electrical System
        </label>

        <select id="electricalColorSystem"
          onchange="renderElectricalColors()"
          style="width:100%;padding:12px;
                 margin:8px 0 15px;
                 background:white;color:#0f172a;">

          <option value="208">
            120/208V Three-Phase
          </option>

          <option value="480">
            277/480V Three-Phase
          </option>

          <option value="delta">
            120/240V High-Leg Delta
          </option>

          <option value="sensor">
            24V DC Sensor Wiring
          </option>

          <option value="control">
            Industrial Control Panel
          </option>

          <option value="iec">
            IEC Three-Phase
          </option>

        </select>

        <div id="electricalColorResults">
          Select a system to view wire colors.
        </div>

        <p style="font-size:12px;opacity:0.75;">
          Reference only. Never identify an
          energized conductor by color alone.
          Verify schematics, circuit identification,
          and approved electrical safety procedures.
        </p>

      </div>
    </details>
  `;
}

function renderElectricalColors() {
  const selector =
    document.getElementById("electricalColorSystem");

  const result =
    document.getElementById("electricalColorResults");

  if (!selector || !result) return;

  const system = electricalColorSystems[selector.value];

  if (!system) return;

  const wireRows = system.wires.map(wire => {
    const [purpose, name, color] = wire;

    let background = color;

    if (color === "greenyellow") {
      background =
        "repeating-linear-gradient(45deg," +
        "#16a34a 0px,#16a34a 9px," +
        "#facc15 9px,#facc15 18px)";
    }

    if (color === "whiteblue") {
      background =
        "repeating-linear-gradient(45deg," +
        "#ffffff 0px,#ffffff 9px," +
        "#2563eb 9px,#2563eb 18px)";
    }

    return `
      <div style="
        display:flex;
        align-items:center;
        gap:14px;
        padding:12px;
        margin-bottom:8px;
        background:#1e293b;
        color:white;
        border-radius:10px;">

        <div style="
          width:46px;
          height:46px;
          flex-shrink:0;
          border-radius:8px;
          border:2px solid #94a3b8;
          background:${background};">
        </div>

        <div>
          <strong>${purpose}</strong>
          <div style="color:#cbd5e1;
                      font-size:13px;">
            ${name}
          </div>
        </div>
      </div>
    `;
  }).join("");

  result.innerHTML = `
    <div style="margin-top:12px;">

      <h3>${system.title}</h3>

      <p style="font-size:13px;opacity:0.8;">
        ${system.standard}
      </p>

      ${wireRows}

      <div style="
        padding:12px;
        background:#334155;
        color:white;
        border-radius:10px;
        font-size:13px;">

        <strong>Important:</strong>
        ${system.note}

      </div>
    </div>
  `;
}
