/* ==========================================================
                D50 CALCULATION SECTION
========================================================== */

/*
    Result show karne wala heading
*/
const d50Result = document.getElementById("d50-show1");

/*
    Calculate button
*/
const d50Button = document.getElementById("d50-button");

/*
==========================================================
        D50 Calculate Function
==========================================================
*/

function calculateD50() {
  /* -----------------------------
        Input Values
    ------------------------------ */

  const mesh35 = document.getElementById("input1");
  const mesh60 = document.getElementById("input2");

  /* -----------------------------
        Empty Validation
    ------------------------------ */

  if (mesh35.value.trim() === "") {
    showToast("Please Enter 35 Mesh Value.", "warning");

    mesh35.focus();

    return;
  }

  if (mesh60.value.trim() === "") {
    showToast("Please Enter 60 Mesh Value.", "warning");

    mesh60.focus();

    return;
  }

  /* -----------------------------
        String → Number
    ------------------------------ */

  const value35 = parseFloat(mesh35.value);

  const value60 = parseFloat(mesh60.value);

  /* -----------------------------
        Number Validation
    ------------------------------ */

  if (isNaN(value35) || isNaN(value60)) {
    showToast("❌ Please enter valid numeric values.", "error");

    return;
  }

  /* -----------------------------
        Denominator Check
    ------------------------------ */

  const denominator = value35 - value60;

  if (denominator === 0) {
    showToast("❌ 35 Mesh and 60 Mesh values cannot be the same.", "error");

    return;
  }

  /* ==================================================
            D50 Formula
    ================================================== */

  const numerator = 50 - value60;

  const division = numerator / denominator;

  const d50 = 250 + 250 * division;

  /* ==================================================
            Result Color
    ================================================== */

  if (d50 >= 0) {
    d50Result.style.color = "#00ff88";
  } else {
    d50Result.style.color = "#ff4d4d";
  }

  /* ==================================================
            Show Result
    ================================================== */

  d50Result.innerHTML = `
        D50 : <span>${d50.toFixed(1)}</span>
    `;
  showToast("Calculation Completed", "success");
}

/*
==========================================================
        Button Click Event
==========================================================
*/

d50Button.addEventListener("click", calculateD50);

/*
==========================================================
        Enter Key Support
==========================================================
*/

document.getElementById("input1").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateD50();
  }
});

document.getElementById("input2").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateD50();
  }
});
/* ==========================================================
                MOISTURE CALCULATION SECTION
========================================================== */

/*
==========================================================
        Required Elements
==========================================================
*/

// Result Heading
const moistureResult = document.getElementById("d50-show2");

// Calculate Button
const moistureButton = document.getElementById("moisture-button");

// First Weight Input
const firstWeightInput = document.getElementById("input1m");

// Second Weight Input
const secondWeightInput = document.getElementById("input2m");

/*
==========================================================
        Moisture Calculate Function
==========================================================
*/

function calculateMoisture() {
  /* -----------------------------------
            Empty Validation
    ------------------------------------ */

  if (firstWeightInput.value.trim() === "") {
    showToast("Please Enter First Weight.", "warning");

    firstWeightInput.focus();

    return;
  }

  if (secondWeightInput.value.trim() === "") {
    showToast("Please Enter Second Weight.", "warning");

    secondWeightInput.focus();

    return;
  }

  /* -----------------------------------
            Convert String to Number
    ------------------------------------ */

  const firstWeight = parseFloat(firstWeightInput.value);

  const secondWeight = parseFloat(secondWeightInput.value);

  /* -----------------------------------
            Number Validation
    ------------------------------------ */

  if (isNaN(firstWeight) || isNaN(secondWeight)) {
    showToast("❌ Please enter valid numeric values.", "error");

    return;
  }

  /* -----------------------------------
            Logical Validation
    ------------------------------------ */

  if (firstWeight <= 0) {
    showToast("❌ First Weight must be greater than 0.", "error");

    firstWeightInput.focus();

    return;
  }

  if (secondWeight > firstWeight) {
    showToast("❌ Second Weight cannot be greater than First Weight.", "error");

    secondWeightInput.focus();

    return;
  }

  /* -----------------------------------
            Moisture Formula
    ------------------------------------ */

  const moisture = ((firstWeight - secondWeight) / firstWeight) * 100;

  /* -----------------------------------
            Result Color
    ------------------------------------ */

  if (moisture <= 10) {
    moistureResult.style.color = "#00ff99";
  } else if (moisture <= 15) {
    moistureResult.style.color = "#ffd43b";
  } else {
    moistureResult.style.color = "#ff4d4d";
  }

  /* -----------------------------------
            Show Result
    ------------------------------------ */

  moistureResult.innerHTML = `
        Moisture : <span>${moisture.toFixed(2)} %</span>
    `;
  showToast("✅ Moisture calculated successfully.", "success");
}

/*
==========================================================
        Button Event
==========================================================
*/

moistureButton.addEventListener("click", calculateMoisture);

/*
==========================================================
        Enter Key Support
==========================================================
*/

firstWeightInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateMoisture();
  }
});

secondWeightInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateMoisture();
  }
});
/* =====================================================
                PSD ANALYZER
===================================================== */

const retainedInputs = document.querySelectorAll(".retained-input");

const cumulativeCells = document.querySelectorAll(".cum-retained");

const passingCells = document.querySelectorAll(".passing");

const calculatePSD = document.getElementById("calPSD");

const totalRetained = document.getElementById("total-retained");

const totalPassing = document.getElementById("total-passing");

const psdStatus = document.getElementById("psd-status");

function calculatePSDResult() {
  let runningTotal = 0;

  for (let i = 0; i < retainedInputs.length; i++) {
    const retained = parseFloat(retainedInputs[i].value) || 0;

    runningTotal += retained;

    cumulativeCells[i].innerHTML = runningTotal.toFixed(2);

    let passing = 100 - runningTotal;

    passing = Math.max(0, Math.min(100, passing));

    passingCells[i].innerHTML = passing.toFixed(2);
  }

  totalRetained.innerHTML = runningTotal.toFixed(2);

  totalPassing.innerHTML = (100 - runningTotal).toFixed(2);

  if (runningTotal === 100) {
    psdStatus.innerHTML = "✅ Perfect (100%)";

    psdStatus.style.color = "#00ff99";

    showToast("✅ PSD calculation completed successfully.", "success");
  } else if (runningTotal < 100) {
    psdStatus.innerHTML = "⚠ Remaining Value Missing";

    psdStatus.style.color = "#ffd43b";

    showToast("⚠ Total retained is less than 100%.", "warning");
  } else {
    psdStatus.innerHTML = "❌ Total Greater Than 100";

    psdStatus.style.color = "#ff4d4d";

    showToast("❌ Total retained cannot exceed 100%.", "error");
  }
  /* ==========================================
        UPDATE GRAPH
========================================== */

  const graphValues = [];

  passingCells.forEach((cell) => {
    graphValues.push(parseFloat(cell.innerHTML));
  });

  psdChart.data.datasets[0].data = graphValues;

  psdChart.update();
}

/* ======================================
        Button Event
====================================== */

calculatePSD.addEventListener("click", calculatePSDResult);

/* ==========================================
        PREMIUM PSD CHART
========================================== */

const ctx = document.getElementById("psdChart").getContext("2d");

/* Gradient Line */

const gradient = ctx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, "#00e5ff");
gradient.addColorStop(0.5, "#00c853");
gradient.addColorStop(1, "#2962ff");

const psdChart = new Chart(ctx, {
  type: "line",

  data: {
    labels: ["20", "30", "35", "40", "50", "60", "100", "140", "200"],

    datasets: [
      {
        label: "% Passing",

        data: [100, 100, 100, 100, 100, 100, 100, 100, 100],

        borderColor: gradient,

        backgroundColor: "rgba(0,180,255,.20)",

        borderWidth: 4,

        fill: true,

        tension: 0.45,

        pointRadius: 6,

        pointHoverRadius: 9,

        pointBackgroundColor: "#ffffff",

        pointBorderColor: "#0088ff",

        pointBorderWidth: 3,
      },
    ],
  },

  options: {
    responsive: true,

    maintainAspectRatio: false,

    animation: {
      duration: 1800,

      easing: "easeInOutQuart",
    },

    interaction: {
      intersect: false,

      mode: "index",
    },

    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,

            weight: "bold",
          },
        },
      },

      tooltip: {
        backgroundColor: "#222",

        titleColor: "#fff",

        bodyColor: "#fff",

        padding: 12,
      },
    },

    scales: {
      y: {
        min: 0,

        max: 100,

        title: {
          display: true,

          text: "% Passing",
        },
      },

      x: {
        title: {
          display: true,

          text: "Mesh Size",
        },
      },
    },
  },
});
/* ==========================================
        DOWNLOAD GRAPH
========================================== */

const downloadGraph = document.getElementById("downloadGraph");

downloadGraph.addEventListener("click", () => {
  const link = document.createElement("a");

  link.download = "PSD_Graph.png";

  link.href = psdChart.toBase64Image();

  link.click();
});

/* ======================================
        Auto Calculate
====================================== */

retainedInputs.forEach(function (input) {
  input.addEventListener("input", calculatePSDResult);
});

/* ==========================================
        RESET BUTTON
========================================== */

const resetButton = document.getElementById("resetAll");

resetButton.addEventListener("click", resetAll);

function resetAll() {
  /* D50 */

  document.getElementById("input1").value = "";

  document.getElementById("input2").value = "";

  d50Result.innerHTML = "D50 Calculation";

  d50Result.style.color = "white";

  /* Moisture */

  document.getElementById("input1m").value = "";

  document.getElementById("input2m").value = "";

  moistureResult.innerHTML = "Moisture Calculation";

  moistureResult.style.color = "white";

  /* PSD */

  retainedInputs.forEach(function (input) {
    input.value = "";
  });

  calculatePSDResult();

  showToast("❌ Total retained cannot exceed 100%.", "error");
}
/* ==========================================
        PRINT REPORT
========================================== */

const printButton = document.getElementById("printReport");

printButton.addEventListener("click", () => {
  window.print();

  showToast("🖨️ Report sent to printer.", "success");
});
/* ==========================================
        AUTO SAVE
========================================== */

const allInputs = document.querySelectorAll("input");

allInputs.forEach(function (input) {
  input.addEventListener("input", () => {
    localStorage.setItem(input.id || input.className, input.value);
  });
});

window.addEventListener("load", () => {
  allInputs.forEach(function (input) {
    let value = localStorage.getItem(input.id || input.className);

    if (value !== null) {
      input.value = value;
    }
  });
});
function markInput(input, isValid) {
  input.classList.remove("success");

  input.classList.remove("error");

  if (isValid) {
    input.classList.add("success");
  } else {
    input.classList.add("error");
  }
}
/* ==========================================
        TOAST FUNCTION
========================================== */

const toast = document.getElementById("toast");

function showToast(message, type = "info") {
  toast.innerHTML = message;

  toast.className = "";

  toast.classList.add("show");

  switch (type) {
    case "success":
      toast.classList.add("toast-success");
      break;

    case "error":
      toast.classList.add("toast-error");
      break;

    case "warning":
      toast.classList.add("toast-warning");
      break;

    default:
      toast.classList.add("toast-info");
  }
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

showToast("Welcome To Lab Calculation", "success");

/* ==========================================
        PWA UPDATE SYSTEM
========================================== */

let newWorker = null;

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")

    .then((registration) => {
      console.log("Service Worker Registered");

      registration.addEventListener("updatefound", () => {
        newWorker = registration.installing;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            document.getElementById("updatePopup").style.display = "block";
          }
        });
      });
    })

    .catch((error) => {
      console.error("Service Worker Error:", error);
    });
}

/* ==========================================
        UPDATE NOW BUTTON
========================================== */

document.getElementById("updateBtn").addEventListener("click", () => {
  if (newWorker) {
    newWorker.postMessage("SKIP_WAITING");
  }
});

/* ==========================================
        RELOAD AFTER UPDATE
========================================== */

navigator.serviceWorker.addEventListener("controllerchange", () => {
  window.location.reload();
});

document.getElementById("updateBtn").addEventListener("click", () => {
  if (newWorker) {
    newWorker.postMessage("SKIP_WAITING");
  }
});

navigator.serviceWorker.addEventListener("controllerchange", () => {
  window.location.reload();
});

let installPrompt = null;

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();

  installPrompt = event;

  // Install button show karo
  document.getElementById("installApp").style.display = "inline-flex";

  console.log("Install Available");
});

document.getElementById("installApp").addEventListener("click", async () => {
  if (!installPrompt) {
    alert("App Install Not Available Yet");

    return;
  }

  installPrompt.prompt();

  const choice = await installPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("Installed");
  }

  installPrompt = null;

  document.getElementById("installApp").style.display = "none";
});
