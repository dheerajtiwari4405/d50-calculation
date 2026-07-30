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

        ashowToast("Please Enter 60 Mesh Value.", "warning");

        mesh60.focus();

        return;
    }

    showToast("Calculation Completed","success");


    /* -----------------------------
        String → Number
    ------------------------------ */

    const value35 = parseFloat(mesh35.value);

    const value60 = parseFloat(mesh60.value);


    /* -----------------------------
        Number Validation
    ------------------------------ */

    if (isNaN(value35) || isNaN(value60)) {

        showToast("Invalid Number","error");

        return;
    }


    /* -----------------------------
        Denominator Check
    ------------------------------ */

    const denominator = value35 - value60;

    if (denominator === 0) {

        alert("35 Mesh and 60 Mesh Value Cannot Be Same.");

        return;
    }


    /* ==================================================
            D50 Formula
    ================================================== */

    const numerator = 50 - value60;

    const division = numerator / denominator;

    const d50 = 250 + (250 * division);


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

        alert("Please Enter First Weight.");

        firstWeightInput.focus();

        return;
    }

    if (secondWeightInput.value.trim() === "") {

        alert("Please Enter Second Weight.");

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

        alert("Please Enter Valid Numbers.");

        return;
    }


    /* -----------------------------------
            Logical Validation
    ------------------------------------ */

    if (firstWeight <= 0) {

        alert("First Weight Must Be Greater Than Zero.");

        firstWeightInput.focus();

        return;
    }

    if (secondWeight > firstWeight) {

        alert("Second Weight Cannot Be Greater Than First Weight.");

        secondWeightInput.focus();

        return;
    }


    /* -----------------------------------
            Moisture Formula
    ------------------------------------ */

    const moisture =
        ((firstWeight - secondWeight) / firstWeight) * 100;


    /* -----------------------------------
            Result Color
    ------------------------------------ */

    if (moisture <= 10) {

        moistureResult.style.color = "#00ff99";

    }

    else if (moisture <= 15) {

        moistureResult.style.color = "#ffd43b";

    }

    else {

        moistureResult.style.color = "#ff4d4d";

    }


    /* -----------------------------------
            Show Result
    ------------------------------------ */

    moistureResult.innerHTML = `
        Moisture : <span>${moisture.toFixed(2)} %</span>
    `;

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


function calculatePSDResult(){

    let runningTotal = 0;

    for(let i = 0; i < retainedInputs.length; i++){

        const retained = parseFloat(retainedInputs[i].value) || 0;

        runningTotal += retained;

        cumulativeCells[i].innerHTML = runningTotal.toFixed(2);

        let passing = 100 - runningTotal;

        passing = Math.max(0, Math.min(100, passing));

        passingCells[i].innerHTML = passing.toFixed(2);

    }

    totalRetained.innerHTML = runningTotal.toFixed(2);

    totalPassing.innerHTML = (100-runningTotal).toFixed(2);




    if(runningTotal === 100){

        psdStatus.innerHTML="✅ Perfect (100%)";

        psdStatus.style.color="#00ff99";

    }

    else if(runningTotal < 100){

        psdStatus.innerHTML="⚠ Remaining Value Missing";

        psdStatus.style.color="#ffd43b";

    }

    else{

        psdStatus.innerHTML="❌ Total Greater Than 100";

        psdStatus.style.color="#ff4d4d";

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

calculatePSD.addEventListener("click",calculatePSDResult);

/* ==========================================
        PREMIUM PSD CHART
========================================== */

const ctx = document
    .getElementById("psdChart")
    .getContext("2d");

/* Gradient Line */

const gradient = ctx.createLinearGradient(0, 0, 0, 400);

gradient.addColorStop(0, "#00e5ff");
gradient.addColorStop(0.5, "#00c853");
gradient.addColorStop(1, "#2962ff");


const psdChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: [
            "20",
            "30",
            "35",
            "40",
            "50",
            "60",
            "100",
            "140",
            "200"
        ],

        datasets: [{

            label: "% Passing",

            data: [100,100,100,100,100,100,100,100,100],

            borderColor: gradient,

            backgroundColor: "rgba(0,180,255,.20)",

            borderWidth: 4,

            fill: true,

            tension: .45,

            pointRadius: 6,

            pointHoverRadius: 9,

            pointBackgroundColor: "#ffffff",

            pointBorderColor: "#0088ff",

            pointBorderWidth: 3

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        animation: {

            duration: 1800,

            easing: "easeInOutQuart"

        },

        interaction: {

            intersect: false,

            mode: "index"

        },

        plugins: {

            legend: {

                labels: {

                    font: {

                        size: 15,

                        weight: "bold"

                    }

                }

            },

            tooltip: {

                backgroundColor: "#222",

                titleColor: "#fff",

                bodyColor: "#fff",

                padding: 12

            }

        },

        scales: {

            y: {

                min: 0,

                max: 100,

                title: {

                    display: true,

                    text: "% Passing"

                }

            },

            x: {

                title: {

                    display: true,

                    text: "Mesh Size"

                }

            }

        }

    }

});
/* ==========================================
        DOWNLOAD GRAPH
========================================== */

const downloadGraph =
document.getElementById("downloadGraph");

downloadGraph.addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "PSD_Graph.png";

    link.href = psdChart.toBase64Image();

    link.click();

});

/* ======================================
        Auto Calculate
====================================== */

retainedInputs.forEach(function(input){

    input.addEventListener("input",calculatePSDResult);

});

/* ==========================================
        RESET BUTTON
========================================== */

const resetButton = document.getElementById("resetAll");

resetButton.addEventListener("click", resetAll);

function resetAll(){

    /* D50 */

    document.getElementById("input1").value="";

    document.getElementById("input2").value="";

    d50Result.innerHTML="D50 Calculation";

    d50Result.style.color="white";


    /* Moisture */

    document.getElementById("input1m").value="";

    document.getElementById("input2m").value="";

    moistureResult.innerHTML="Moisture Calculation";

    moistureResult.style.color="white";


    /* PSD */

    retainedInputs.forEach(function(input){

        input.value=0;

    });

    calculatePSDResult();

}
/* ==========================================
        PRINT REPORT
========================================== */

const printButton = document.getElementById("printReport");

printButton.addEventListener("click",()=>{

    window.print();

});
/* ==========================================
        AUTO SAVE
========================================== */

const allInputs=document.querySelectorAll("input");

allInputs.forEach(function(input){

    input.addEventListener("input",()=>{

        localStorage.setItem(input.id || input.className,input.value);

    });

});


window.addEventListener("load",()=>{

    allInputs.forEach(function(input){

        let value=localStorage.getItem(input.id || input.className);

        if(value!==null){

            input.value=value;

        }

    });

});
function markInput(input,isValid){

    input.classList.remove("success");

    input.classList.remove("error");

    if(isValid){

        input.classList.add("success");

    }

    else{

        input.classList.add("error");

    }

}
/* ==========================================
        TOAST FUNCTION
========================================== */

const toast = document.getElementById("toast");

function showToast(message,type="info"){

    toast.innerHTML = message;

    toast.className = "";

    toast.classList.add("show");

    switch(type){

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

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}
showToast("PDF Downloaded Successfully","success");




/* ==========================================
        DARK / LIGHT MODE
========================================== */

const themeButton =
document.getElementById("themeToggle");

/* Load Saved Theme */

if(localStorage.getItem("theme")==="dark"){

    document.body.classList.add("dark");

    themeButton.innerHTML="☀️ Light Mode";

}

/* Button Click */

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");

        themeButton.innerHTML="☀️ Light Mode";

        showToast("Dark Mode Enabled","success");

    }

    else{

        localStorage.setItem("theme","light");

        themeButton.innerHTML="🌙 Dark Mode";

        showToast("Light Mode Enabled","info");

    }

});