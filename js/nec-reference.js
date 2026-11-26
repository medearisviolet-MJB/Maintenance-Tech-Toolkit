
/* ==========================================
   MAINTENANCE TECH TOOLKIT
   NEC CODE REFERENCE — VERSION 1
   Searchable electrician's field reference
========================================== */

const necReferenceTopics = [
  {
    number: "110",
    title: "General Installation Requirements",
    category: "General",
    keywords: "clearance working space equipment terminals labeling",
    tip: "Installation practices, equipment suitability, and working-space requirements."
  },
  {
    number: "120",
    previous: "220",
    title: "Load Calculations",
    category: "General",
    keywords: "load demand branch feeder service calculations",
    tip: "Find rules for electrical load calculations. This was Article 220 in the 2023 NEC."
  },
  {
    number: "210",
    title: "Branch Circuits",
    category: "General",
    keywords: "branch circuit receptacle outlet",
    tip: "Requirements for branch-circuit installations and outlets."
  },
  {
    number: "240",
    title: "Overcurrent Protection",
    category: "Protection",
    keywords: "breaker fuse ocpd short circuit",
    tip: "General overcurrent protection requirements for fuses and circuit breakers."
  },
  {
    number: "250",
    title: "Grounding and Bonding",
    category: "Protection",
    keywords: "ground bonding equipment grounding conductor",
    tip: "Equipment grounding, bonding, and grounding electrodes."
  },
  {
    number: "300",
    title: "Wiring Methods",
    category: "Wiring",
    keywords: "raceway conduit wiring installation",
    tip: "General requirements for wiring methods."
  },
  {
    number: "310",
    title: "Conductors",
    category: "Wiring",
    keywords: "wire ampacity conductor derating insulation",
    tip: "Conductor selection, ampacity, and applicable adjustment factors."
  },
  {
    number: "314",
    title: "Boxes and Conduit Bodies",
    category: "Wiring",
    keywords: "pull box junction box box fill",
    tip: "Requirements for junction boxes, pull boxes, and conduit bodies."
  },
  {
    number: "330",
    title: "Metal-Clad Cable",
    category: "Wiring",
    keywords: "mc cable armored metal clad",
    tip: "Permitted uses and installation requirements for MC cable."
  },
  {
    number: "350",
    title: "Liquidtight Flexible Metal Conduit",
    category: "Wiring",
    keywords: "liquidtight flexible conduit lfmc",
    tip: "Installation and permitted-use requirements for LFMC."
  },
  {
    number: "358",
    title: "Electrical Metallic Tubing",
    category: "Wiring",
    keywords: "emt tubing conduit bending fittings support",
    tip: "EMT installation, securing, supporting, and bending."
  },
  {
    number: "392",
    title: "Cable Trays",
    category: "Wiring",
    keywords: "tray cable industrial wiring",
    tip: "Cable tray systems and applicable wiring provisions."
  },
  {
    number: "400",
    title: "Flexible Cords and Cables",
    category: "Wiring",
    keywords: "portable cord flexible cable",
    tip: "Flexible cord and cable installation requirements."
  },
  {
    number: "406",
    title: "Receptacles and Wiring Devices",
    category: "General",
    keywords: "receptacle plug gfci outlet",
    tip: "Requirements for receptacles and related attachment devices."
  },
  {
    number: "408",
    title: "Switchboards and Panelboards",
    category: "Industrial",
    keywords: "panel switchboard distribution",
    tip: "Requirements covering switchboards, switchgear, and panelboards."
  },
  {
    number: "409",
    title: "Industrial Control Panels",
    category: "Industrial",
    keywords: "sccr industrial panel cabinet",
    tip: "Industrial control panel installation and marking requirements."
  },
  {
    number: "430",
    title: "Motors and Motor Circuits",
    category: "Industrial",
    keywords: "motor overload contactor vfd controller",
    tip: "Motor conductors, overload protection, circuit protection, and controllers."
  },
  {
    number: "450",
    title: "Transformers",
    category: "Industrial",
    keywords: "transformer primary secondary protection",
    tip: "Transformer installation and protection requirements."
  },
  {
    number: "500",
    title: "Hazardous Locations",
    category: "Industrial",
    keywords: "hazardous classified dust gas",
    tip: "A starting point for electrical installations in classified locations."
  },
  {
    number: "670",
    title: "Industrial Machinery",
    category: "Industrial",
    keywords: "machine machinery control panel",
    tip: "Electrical installation requirements for industrial machinery."
  },
  {
    number: "725",
    title: "Class 2 and Class 3 Circuits",
    category: "Controls",
    keywords: "low voltage 24v control signal",
    tip: "Requirements for Class 2 and Class 3 circuits and wiring."
  },
  {
    number: "Ch. 9",
    title: "NEC Tables",
    category: "Wiring",
    keywords: "conduit fill raceway dimensions tables",
    tip: "Tables used for raceway and conductor calculations."
  }
];

/* ==========================================
   BUILD THE NEC REFERENCE INTERFACE
========================================== */

function necReferenceHTML() {

  const cards = necReferenceTopics.map(topic => {

    const number = topic.previous
      ? `<span data-nec-renumber="${topic.previous}">
           ${topic.number}
         </span>`
      : topic.number;

    return `
      <article class="nec-topic"
        data-nec-topic
        data-nec-search="${topic.number}
          ${topic.previous || ""}
          ${topic.title}
          ${topic.category}
          ${topic.keywords}">

        <div class="nec-topic-head">
          <span class="nec-number">${number}</span>
          <span class="nec-category">
            ${topic.category}
          </span>
        </div>

        <strong>${topic.title}</strong>
        <p>${topic.tip}</p>

      </article>
    `;
  }).join("");

  return `
    <details class="calculator">
      <summary>📕 NEC Code Reference</summary>

      <div class="calculator-body" id="necLibrary">

        <style>

          #necLibrary {
            color: #e6edf3;
            min-width: 0;
          }

          #necLibrary * {
            box-sizing: border-box;
          }

          #necLibrary .nec-banner {
            background: linear-gradient(
              125deg, #202c3c, #121c2b
            );
            border: 1px solid #597083;
            border-left: 4px solid #e84949;
            border-radius: 12px;
            padding: 14px;
            margin-bottom: 12px;
          }

          #necLibrary .nec-banner h3 {
            color: #ffffff;
            margin: 0 0 6px;
          }

          #necLibrary .nec-banner p {
            color: #bed0df;
            font-size: 13px;
            line-height: 1.5;
          }

          #necLibrary .nec-link {
            display: inline-block;
            text-decoration: none;
            background: #235e99;
            color: white;
            padding: 11px 14px;
            border: 1px solid #5d9fd7;
            border-radius: 8px;
            margin: 8px 8px 3px 0;
            font-weight: bold;
            font-size: 13px;
          }

          #necLibrary .nec-link.secondary {
            background: #293848;
            border-color: #63788e;
          }

          #necLibrary .nec-controls {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) 120px;
            gap: 9px;
            margin: 12px 0;
          }

          #necLibrary .nec-controls input,
          #necLibrary .nec-controls select {
            width: 100%;
            min-width: 0;
            padding: 12px;
            background: #e8eef5 !important;
            color: #172534 !important;
            border: 1px solid #8197ac;
            border-radius: 8px;
            font-size: 14px;
          }

          #necLibrary .nec-chips {
            display: flex;
            gap: 7px;
            flex-wrap: wrap;
            margin: 7px 0 12px;
          }

          #necLibrary .nec-chip {
            padding: 7px 10px;
            background: #26384a;
            color: #dce8f5;
            border: 1px solid #536c82;
            border-radius: 999px;
            cursor: pointer;
            font-size: 12px;
          }

          #necLibrary .nec-grid {
            display: grid;
            grid-template-columns:
              repeat(
                auto-fit,
                minmax(min(100%, 210px), 1fr)
              );
            gap: 10px;
          }

          #necLibrary .nec-topic {
            background: #1d2c3d;
            border: 1px solid #41576d;
            border-radius: 10px;
            padding: 12px;
            min-width: 0;
          }

          #necLibrary .nec-topic-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 9px;
          }

          #necLibrary .nec-number {
            background: #165a97;
            color: white;
            font-weight: 800;
            border-radius: 6px;
            padding: 6px 8px;
            font-size: 13px;
          }

          #necLibrary .nec-category {
            color: #acbece;
            font-size: 11px;
          }

          #necLibrary .nec-topic strong {
            display: block;
            color: #f3f7fa;
            font-size: 14px;
          }

          #necLibrary .nec-topic p {
            font-size: 12px;
            color: #b9cbda;
            line-height: 1.5;
            margin: 7px 0 0;
          }

          #necLibrary .nec-count {
            color: #b9cbda;
            font-size: 12px;
            margin: 6px 0 12px;
          }

          #necLibrary .nec-note {
            background: #362d1b;
            border: 1px solid #8d7132;
            color: #ffe7ad;
            border-radius: 8px;
            padding: 10px;
            font-size: 12px;
            line-height: 1.5;
            margin: 12px 0;
          }

          @media (max-width: 420px) {
            #necLibrary .nec-controls {
              grid-template-columns: 1fr;
            }
          }

        </style>

        <div class="nec-banner">
          <h3>
            National Electrical Code — Quick Reference
          </h3>

          <p>
            Search by article number, equipment,
            or task. These summaries help locate
            topics; they are not code requirements.
          </p>

          <a class="nec-link"
            href="https://link.nfpa.org/free-access/publications/70/2026"
            target="_blank"
            rel="noopener noreferrer">
            📖 Official NEC 2026
          </a>

          <a class="nec-link secondary"
            href="https://www.nfpa.org/education-and-research/electrical/nec-enforcement-maps"
            target="_blank"
            rel="noopener noreferrer">
            Check local adoption
          </a>
        </div>

        <div class="nec-controls">

          <input
            id="necSearch"
            type="search"
            placeholder="Search: motors, EMT, 430..."
            aria-label="Search NEC topics"
            oninput="necReferenceFilter()"
          >

          <select
            id="necEdition"
            aria-label="NEC edition"
            onchange="necReferenceFilter()"
          >
            <option value="2026">
              2026 edition
            </option>
            <option value="2023">
              2023 edition
            </option>
          </select>

        </div>

        <div class="nec-chips">

          <button type="button"
            class="nec-chip"
            onclick="necReferenceFind('motor')">
            Motors
          </button>

          <button type="button"
            class="nec-chip"
            onclick="necReferenceFind('conduit')">
            Conduit
          </button>

          <button type="button"
            class="nec-chip"
            onclick="necReferenceFind('ground')">
            Grounding
          </button>

          <button type="button"
            class="nec-chip"
            onclick="necReferenceFind('panel')">
            Panels
          </button>

          <button type="button"
            class="nec-chip"
            onclick="necReferenceFind('')">
            Show all
          </button>

        </div>

        <div id="necCount"
          class="nec-count"
          aria-live="polite">
          ${necReferenceTopics.length} reference topics
        </div>

        <div class="nec-grid">
          ${cards}
        </div>

        <div class="nec-note">
          ⚠ Verify the NEC edition adopted by your
          jurisdiction, including amendments.
          Read the official code before making a
          compliance or installation decision.
          NFPA 70 and NFPA 70E are different standards.
        </div>

      </div>
    </details>
  `;
}

/* ==========================================
   SEARCH / FILTER NEC TOPICS
========================================== */

function necReferenceFilter() {

  const root =
    document.getElementById("necLibrary");

  if (!root) return;

  const search =
    root.querySelector("#necSearch")
      .value.trim().toLowerCase();

  const edition =
    root.querySelector("#necEdition").value;

  const load =
    root.querySelector("[data-nec-renumber]");

  if (load) {
    load.textContent =
      edition === "2023" ? "220" : "120";
  }

  let shown = 0;

  root.querySelectorAll(
    "[data-nec-topic]"
  ).forEach(card => {

    const match =
      card.dataset.necSearch
        .toLowerCase()
        .includes(search);

    card.style.display =
      match ? "" : "none";

    if (match) shown++;
  });

  root.querySelector("#necCount").textContent =
    shown
      ? `${shown} matching reference topic${shown === 1 ? "" : "s"}`
      : "No matches — try another search.";
}

/* ==========================================
   QUICK TOPIC BUTTONS
========================================== */

function necReferenceFind(term) {

  const input =
    document.getElementById("necSearch");

  if (!input) return;

  input.value = term;

  necReferenceFilter();

  input.focus();
}
