
/* ==========================================
   AB-INSPIRED HMI OPERATOR BAR
   Maintenance Tech Toolkit

   Controls training simulator only.
   Does not control physical equipment.
========================================== */

(function () {
  "use strict";

  function init() {
    if (document.getElementById("abHmiBar")) return;

    const bar = document.createElement("div");

    bar.id = "abHmiBar";
    bar.setAttribute("role", "group");
    bar.setAttribute(
      "aria-label",
      "Training simulator operator controls"
    );

    bar.innerHTML = `
      <div class="ab-buttons">

        <button type="button"
          class="ab-start"
          data-action="start"
          disabled>
          ▶ START
        </button>

        <button type="button"
          class="ab-stop"
          data-action="stop"
          disabled>
          ■ STOP
        </button>

        <button type="button"
          class="ab-reset"
          data-action="reset"
          disabled>
          ↻ RESET
        </button>

      </div>

      <div class="ab-lamps"
        aria-label="Simulation state">

        <span class="ab-lamp-label">
          <i class="ab-lamp"
            id="abRunLamp"></i>
          RUN
        </span>

        <span class="ab-lamp-label">
          <i class="ab-lamp"
            id="abFaultLamp"></i>
          FAULT
        </span>

        <span class="ab-lamp-label">
          <i class="ab-lamp ab-lit-blue"></i>
          SIM
        </span>

      </div>

      <div class="ab-status"
        id="abHmiStatus"
        role="status"
        aria-live="polite">

        <small>
          TRAINING MODE · NOT CONNECTED TO EQUIPMENT
        </small>

        OPEN SEQUENTIAL LOGIC

      </div>
    `;

    document.body.appendChild(bar);

    /* CHECK IF TRAINER IS VISIBLE */

    function getTrainer() {
      const root =
        document.getElementById("seqTrainer");

      if (!root || root.getClientRects().length === 0) {
        return null;
      }

      for (
        let details = root.closest("details");
        details;
        details = details.parentElement.closest("details")
      ) {
        if (!details.open) return null;
      }

      return root;
    }

    /* GET EXISTING SEQUENTIAL SIMULATOR STATE */

    function getState() {
      return typeof seq !== "undefined"
        ? seq
        : null;
    }

    /* UPDATE HMI STATUS */

    function update() {
      const trainer = getTrainer();
      const state = getState();

      const ready =
        !!trainer &&
        !!state &&
        typeof seqStart === "function";

      const buttons = Object.fromEntries(
        [...bar.querySelectorAll("[data-action]")]
          .map(button => [
            button.dataset.action,
            button
          ])
      );

      buttons.start.disabled =
        !ready ||
        state.step !== 0 ||
        !!state.alarm;

      buttons.stop.disabled =
        !ready ||
        state.step === 0 ||
        state.step === 900;

      buttons.reset.disabled =
        !ready ||
        (state.step !== 0 && state.step !== 900);

      const running =
        ready &&
        !!state.run &&
        state.step !== 900;

      const faulted =
        ready &&
        !!state.alarm;

      document
        .getElementById("abRunLamp")
        .classList.toggle("ab-lit-green", running);

      document
        .getElementById("abFaultLamp")
        .classList.toggle("ab-lit-red", faulted);

      const status =
        document.getElementById("abHmiStatus");

      status.classList.toggle(
        "ab-fault",
        faulted
      );

      const text = !ready
        ? "OPEN SEQUENTIAL LOGIC"
        : faulted
          ? state.alarm
          : running
            ? `SEQUENCE RUNNING — STEP ${state.step}`
            : "TRAINER READY";

      if (status.lastChild.nodeType === Node.TEXT_NODE) {
        if (status.lastChild.textContent.trim() !== text) {
          status.lastChild.textContent =
            "\n" + text;
        }
      } else {
        status.append(
          document.createTextNode(text)
        );
      }
    }

    /* START / STOP / RESET CONTROLS */

    bar.addEventListener("click", event => {
      const button =
        event.target.closest("[data-action]");

      if (
        !button ||
        button.disabled ||
        !getTrainer()
      ) {
        return;
      }

      if (
        button.dataset.action === "start" &&
        typeof seqStart === "function"
      ) {
        seqStart();
      }

      if (
        button.dataset.action === "stop" &&
        typeof seqStop === "function"
      ) {
        seqStop();
      }

      if (
        button.dataset.action === "reset" &&
        typeof seqReset === "function"
      ) {
        seqReset();
      }

      update();
    });

    /* MAIN NAVIGATION ACTIVE STATE */

    document
      .querySelectorAll("main .grid > .card")
      .forEach(card => {

        card.addEventListener("click", () => {

          document
            .querySelectorAll("main .grid > .card")
            .forEach(c => {
              c.classList.remove("ab-active");
            });

          card.classList.add("ab-active");
        });

      });

    /* LIVE STATUS REFRESH */

    window.setInterval(update, 350);

    update();
  }

  /* LOAD AFTER PAGE IS READY */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
