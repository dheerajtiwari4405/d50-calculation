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

        alert("Please Enter 35 Mesh Value.");

        mesh35.focus();

        return;
    }

    if (mesh60.value.trim() === "") {

        alert("Please Enter 60 Mesh Value.");

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

        alert("Please Enter Valid Numbers.");

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

        if(passing < 0){

            passing = 0;

        }

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

}


/* ======================================
        Button Event
====================================== */

calculatePSD.addEventListener("click",calculatePSDResult);



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