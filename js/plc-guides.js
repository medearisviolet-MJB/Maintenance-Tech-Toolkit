
/* ==========================================
   PLC PROGRAMMING & COMMUNICATIONS GUIDE
   MAINTENANCE TECH TOOLKIT
========================================== */

function plcProgrammingGuidesHTML() {
  return `
    <details class="calculator">
      <summary>📘 PLC Programming & Communications</summary>

      <div class="calculator-body">

        <h3>PLC Programming Field Guide</h3>

        <p>
          Step-by-step references for connecting,
          monitoring, uploading, downloading,
          and troubleshooting PLC controllers.
        </p>

        <!-- STUDIO 5000 GO ONLINE -->

        <details class="calculator">
          <summary>Studio 5000 — Going Online</summary>
          <div class="calculator-body">

            <h3>Connecting to a Logix Controller</h3>

            <ol>
              <li>Identify the PLC model and IP address.</li>

              <li>Connect your computer through an
                  approved Ethernet connection.</li>

              <li>Check your PC network configuration
                  and verify communication.</li>

              <li>Open Studio 5000 Logix Designer.</li>

              <li>Open the appropriate offline
                  project (.ACD).</li>

              <li>Open Communications → Who Active.
                  Newer versions may use Network Browser.</li>

              <li>Browse to the correct controller.</li>

              <li>Verify the controller identity
                  and communication path.</li>

              <li>Select Go Online.</li>

              <li>If the project does not match,
                  review the available options.
                  Do not automatically download.</li>

              <li>Once online, monitor controller
                  status, tags, and ladder logic.</li>
            </ol>

            <p>
              <strong>Reminder:</strong>
              Going online does not automatically
              require downloading a program.
            </p>

          </div>
        </details>

        <!-- CCW GO ONLINE -->

        <details class="calculator">
          <summary>CCW — Micro800 Going Online</summary>
          <div class="calculator-body">

            <h3>Connected Components Workbench</h3>

            <ol>
              <li>Connect your PC to the Micro800 PLC.</li>

              <li>Check the controller IP address
                  and your network configuration.</li>

              <li>Open Connected Components Workbench.</li>

              <li>Open the existing Micro800 project.</li>

              <li>Open the Micro800 controller page.</li>

              <li>Select Connect.</li>

              <li>Choose the correct controller
                  from the Connection Browser.</li>

              <li>If a project mismatch appears,
                  inspect the Upload and Download options.</li>

              <li>Use the appropriate, authorized
                  procedure to match the project.</li>

              <li>Once connected, monitor ladder
                  logic and variables.</li>
            </ol>

            <p>
              <strong>Tip:</strong>
              In CCW, going online is called
              Connect. Going offline is Disconnect.
            </p>

          </div>
        </details>

        <!-- UPLOAD VS DOWNLOAD -->

        <details class="calculator">
          <summary>Uploading vs. Downloading</summary>
          <div class="calculator-body">

            <h3>Understanding Program Transfers</h3>

            <div style="padding:14px;
                        background:#14532d;
                        color:white;
                        border-radius:10px;
                        margin-bottom:12px;">

              <h4>UPLOAD — PLC to Computer</h4>

              <p>
                Reads the controller project into
                the programming software.
              </p>

              <p>
                Commonly used to retrieve a project
                for inspection or backup.
              </p>

            </div>

            <div style="padding:14px;
                        background:#7f1d1d;
                        color:white;
                        border-radius:10px;
                        margin-bottom:12px;">

              <h4>DOWNLOAD — Computer to PLC</h4>

              <p>
                Transfers the offline project
                into the controller.
              </p>

              <p>
                May overwrite the running project,
                affect retained values, and
                interrupt machine operation.
              </p>

            </div>

            <p>
              <strong>Best practice:</strong>
              Verify controller identity, back up
              the current project, review changes,
              and obtain authorization before
              downloading.
            </p>

          </div>
        </details>

        <!-- CONTROLLER MODES -->

        <details class="calculator">
          <summary>PLC Controller Modes</summary>
          <div class="calculator-body">

            <h3>Logix Controller Operating Modes</h3>

            <p><strong>RUN:</strong>
              Controller executes the program.
              Editing is restricted.
            </p>

            <p><strong>REMOTE RUN:</strong>
              Controller executes the program
              while permitting supported online edits.
            </p>

            <p><strong>PROGRAM:</strong>
              Controller does not execute
              its normal application tasks.
            </p>

            <p><strong>REMOTE PROGRAM:</strong>
              Allows software-controlled mode
              changes and supported programming work.
            </p>

            <p><strong>REMOTE TEST:</strong>
              Executes logic without normal
              output control, where supported.
            </p>

            <p style="color:#b45309;">
              Important: Program mode is not an
              emergency-stop or energy-isolation method.
              Changing modes can affect machine outputs.
            </p>

          </div>
        </details>

        <!-- ETHERNET TROUBLESHOOTING -->

        <details class="calculator">
          <summary>Ethernet Communication Troubleshooting</summary>
          <div class="calculator-body">

            <h3>PLC Communication Checklist</h3>

            <ol>
              <li>Verify controller power and status LEDs.</li>

              <li>Check Ethernet cable and link LEDs.</li>

              <li>Confirm the PLC IP address.</li>

              <li>Verify the PC IP address
                  and subnet mask.</li>

              <li>Check the approved network
                  routing and VLAN configuration.</li>

              <li>Test reachability using ping,
                  where ICMP is permitted.</li>

              <li>Verify the controller appears
                  in the software communication browser.</li>

              <li>Check communication drivers,
                  firewall restrictions, and VPN settings.</li>

              <li>Verify software, firmware,
                  and controller compatibility.</li>

              <li>Confirm that the correct controller
                  and project have been selected.</li>
            </ol>

            <p>
              A successful ping confirms basic IP
              reachability, not that the controller
              programming connection will succeed.
            </p>

          </div>
        </details>

        <!-- ONLINE MONITORING -->

        <details class="calculator">
          <summary>Online Monitoring & Troubleshooting</summary>
          <div class="calculator-body">

            <h3>Monitoring PLC Logic</h3>

            <ol>
              <li>Connect to the correct PLC.</li>

              <li>Verify controller status and faults.</li>

              <li>Open the relevant program or routine.</li>

              <li>Monitor rung conditions and tag values.</li>

              <li>Use Cross Reference to locate
                  where a tag is read or written.</li>

              <li>Inspect I/O status and communication
                  module diagnostics.</li>

              <li>Use watch or trend tools to observe
                  changing values when appropriate.</li>

              <li>Document your findings before
                  making program changes.</li>
            </ol>

            <p>
              Monitoring is different from modifying
              values or forcing I/O.
              Forces and online edits can create
              unexpected machine movement.
            </p>

          </div>
        </details>

        <!-- SAFE PROGRAMMING PRACTICES -->

        <details class="calculator">
          <summary>Online Edits & Programming Practices</summary>
          <div class="calculator-body">

            <h3>Before Changing PLC Logic</h3>

            <ol>
              <li>Confirm authorization and
                  production impact.</li>

              <li>Identify the correct controller.</li>

              <li>Save a verified backup and
                  document its revision.</li>

              <li>Review interlocks, safety functions,
                  and affected outputs.</li>

              <li>Follow the approved change procedure.</li>

              <li>Test changes under controlled
                  conditions with qualified personnel.</li>

              <li>Confirm no unintended edits or
                  forces remain.</li>

              <li>Save and document the final
                  approved project revision.</li>
            </ol>

            <p>
              Controller and software versions
              determine which online edits are supported.
              Never bypass a safety function to
              complete a programming change.
            </p>

          </div>
        </details>

      </div>
    </details>
  `;
}
