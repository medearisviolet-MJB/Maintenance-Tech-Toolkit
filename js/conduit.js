
function calculateEmtOffset() {
  const height = Number(
    document.getElementById("emtOffsetHeight").value
  );

  const angle =
    document.getElementById("emtOffsetAngle").value;

  const result =
    document.getElementById("emtOffsetResult");

  const factors = {
    "10":   { multiplier: 6, shrink: 1/16 },
    "22.5": { multiplier: 2.6, shrink: 3/16 },
    "30":   { multiplier: 2, shrink: 1/4 },
    "45":   { multiplier: 1.4, shrink: 3/8 },
    "60":   { multiplier: 1.2, shrink: 1/2 }
  };

  if (!Number.isFinite(height) || height <= 0) {
    result.textContent = "Enter a valid offset height.";
    return;
  }

  const factor = factors[angle];

  const spacing = height * factor.multiplier;
  const shrink = height * factor.shrink;

  result.innerHTML = `
    <strong>Offset Results</strong>
    <p>Distance Between Marks:
       ${spacing.toFixed(2)} inches</p>
    <p>Estimated Shrink:
       ${shrink.toFixed(2)} inches</p>
    <p>Bend Angle: ${angle}° per bend</p>
  `;
}

/* 90 DEGREE EMT STUB-UP CALCULATOR */

function calculateEmtStub() {
  const height = Number(
    document.getElementById("emtStubHeight").value
  );

  const takeup = Number(
    document.getElementById("emtStubTakeup").value
  );

  const result =
    document.getElementById("emtStubResult");

  if (!Number.isFinite(height) ||
      !Number.isFinite(takeup) ||
      height <= 0 || takeup < 0) {
    result.textContent =
      "Enter valid height and take-up values.";
    return;
  }

  const mark = height - takeup;

  if (mark <= 0) {
    result.textContent =
      "Stub height is too short for this take-up. " +
      "Verify the bender's minimum stub height.";
    return;
  }

  result.innerHTML = `
    <strong>90° Stub-Up Results</strong>

    <p>Desired Stub Height:
      ${height.toFixed(2)} inches</p>

    <p>Bender Take-Up:
      ${takeup.toFixed(2)} inches</p>

    <h3 style="color:#4ade80;">
      Mark at ${mark.toFixed(2)} inches
    </h3>

    <p>
      Measure from the free end of the conduit.
      Align the bender arrow with this mark
      and bend to 90°.
    </p>
  `;
}


/* ==========================================
   3-POINT SADDLE BEND CALCULATOR
========================================== */

// Round measurements to the nearest 1/16 inch.
function conduitSaddleInches(value) {
  const total = Math.round(value * 16);
  const whole = Math.floor(total / 16);
  let numerator = total % 16;

  if (numerator === 0) return `${whole}"`;

  let denominator = 16;

  while (numerator % 2 === 0) {
    numerator /= 2;
    denominator /= 2;
  }

  return `${whole ? whole + " " : ""}${numerator}/${denominator}"`;
}

function calculateEmtSaddle() {
  const heightField =
    document.getElementById("emtSaddleHeight");

  const distanceField =
    document.getElementById("emtSaddleDistance");

  const angleField =
    document.getElementById("emtSaddleAngle");

  const result =
    document.getElementById("emtSaddleResult");

  if (!heightField || !distanceField ||
      !angleField || !result) return;

  const height = Number(heightField.value);
  const distance = Number(distanceField.value);
  const angle = angleField.value;

  // Field factors from a standard saddle table.
  const factors = {
    "45": {
      multiplier: 2.5,
      shrink: 3 / 16,
      outerAngle: 22.5
    },
    "60": {
      multiplier: 2,
      shrink: 1 / 4,
      outerAngle: 30
    }
  };

  if (
    heightField.value.trim() === "" ||
    distanceField.value.trim() === "" ||
    !Number.isFinite(height) ||
    !Number.isFinite(distance) ||
    height <= 0 ||
    distance < 0
  ) {
    result.textContent =
      "Enter a valid saddle rise and distance.";
    return;
  }

  const factor = factors[angle];

  if (!factor) {
    result.textContent = "Select a valid bend angle.";
    return;
  }

  // Calculate saddle shrink.
  const shrink = height * factor.shrink;

  // Distance from center to either outer mark.
  const spacing = height * factor.multiplier;

  // Position of center mark, allowing for shrink.
  const centerMark = distance + shrink;

  // Calculate both outer marks.
  const firstMark = centerMark - spacing;
  const thirdMark = centerMark + spacing;

  if (firstMark <= 0) {
    result.textContent =
      "Not enough distance from the conduit end " +
      "for the first bend mark. Revise the layout.";
    return;
  }

  result.innerHTML = `
    <div style="background:#0f172a;
                padding:15px;
                border-radius:10px;
                color:white;">

      <h3 style="color:#4ade80;">
        Saddle Bend Results
      </h3>

      <p>First Outer Bend:
        <strong>
          ${conduitSaddleInches(firstMark)}
        </strong>
      </p>

      <p>Center Bend:
        <strong>
          ${conduitSaddleInches(centerMark)}
        </strong>
      </p>

      <p>Second Outer Bend:
        <strong>
          ${conduitSaddleInches(thirdMark)}
        </strong>
      </p>

      <hr>

      <p>Distance Off Center:
        ${conduitSaddleInches(spacing)}
      </p>

      <p>Estimated Shrink:
        ${conduitSaddleInches(shrink)}
      </p>

      <p>Center Bend Angle: ${angle}°</p>

      <p>Outer Bend Angles:
        ${factor.outerAngle}° each
      </p>

      <p style="font-size:12px;opacity:0.8;">
        Measurements rounded to nearest 1/16".
        Use the bender's center saddle notch for
        the middle bend and the appropriate
        reference marks for the outer bends.
        Keep all bends in the same plane.
      </p>

    </div>
  `;
}


/* ==================================
   CONDUIT BENDING QUICK REFERENCE
================================== */

function calculateConduitReference() {
  const heightInput =
    document.getElementById("conduitRefHeight");

  const angleInput =
    document.getElementById("conduitRefAngle");

  const result =
    document.getElementById("conduitRefResult");

  if (!heightInput || !angleInput || !result) return;

  const height = Number(heightInput.value);
  const angle = angleInput.value;

  const factors = {
    "10":   { multiplier: 6, shrink: 1/16 },
    "22.5": { multiplier: 2.6, shrink: 3/16 },
    "30":   { multiplier: 2, shrink: 1/4 },
    "45":   { multiplier: 1.4, shrink: 3/8 },
    "60":   { multiplier: 1.2, shrink: 1/2 }
  };

  if (
    heightInput.value.trim() === "" ||
    !Number.isFinite(height) ||
    height <= 0
  ) {
    result.textContent =
      "Enter a valid offset height.";
    return;
  }

  const factor = factors[angle];

  if (!factor) {
    result.textContent = "Select a valid angle.";
    return;
  }

  const spacing = height * factor.multiplier;
  const shrink = height * factor.shrink;

  result.innerHTML = `
    <div style="background:#0f172a;
                color:white;padding:15px;
                border-radius:10px;">

      <h3 style="color:#4ade80;">
        Bending Results
      </h3>

      <p>Offset Height:
        ${height.toFixed(2)} inches</p>

      <p>Bend Angle:
        ${angle}° per bend</p>

      <p>Distance Between Marks:
        <strong>
          ${spacing.toFixed(2)} inches
        </strong>
      </p>

      <p>Estimated Shrink:
        <strong>
          ${shrink.toFixed(2)} inches
        </strong>
      </p>

    </div>
  `;
}
