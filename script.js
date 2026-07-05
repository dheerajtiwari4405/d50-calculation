// d50 logic math
let sho1 = document.getElementById("d50-show1"); // Get the element to display d50 result
const btn1 = document.getElementById("d50-button"); // Get the d50 calculate button

btn1.addEventListener("click", () => { // Add click event listener to d50 button
    let inp1 = document.getElementById("input1").value.trim(); // Get first input value and remove whitespace
    if(inp1 === ""){ // Check if input is empty
        alert("Enter The Value"); // Show alert message if empty
        return; // Exit function early
    }
    inp1 = parseFloat(inp1); // Convert input string to float number
    
    let inp2 = document.getElementById("input2").value.trim(); // Get second input value and remove whitespace
    if(inp2 === ""){ // Check if input is empty
        alert("Enter The Value"); // Show alert message if empty
        return; // Exit function early
    }
    inp2 = parseFloat(inp2); // Convert input string to float number

    let numerator = 50 - inp2; // Calculate numerator (50 minus second input)
    let denominator = inp1 - inp2; // Calculate denominator (first input minus second input)
    let division = numerator / denominator; // Divide numerator by denominator
    let fixdivision = parseFloat(division.toFixed(3)); // Round division to 3 decimal places and convert to float
    let d50m = 250 * fixdivision; // Multiply rounded division by 250
    let d50p = 250 + d50m; // Add 250 to get final d50 value
    sho1.innerHTML = d50p.toFixed(1); // Display result with 1 decimal place
})

// moister logic 

let sho2 = document.getElementById("d50-show2"); // Get the element to display moisture result
const btn2 = document.getElementById("moisture-button"); // Get the moisture calculate button

btn2.addEventListener("click", () => { // Add click event listener to moisture button
    let inp1m = document.getElementById("input1m").value.trim(); // Get first moisture input value and remove whitespace
    if(inp1m === ""){ // Check if input is empty
        alert("Enter The Value"); // Show alert message if empty
        return; // Exit function early
    }
    inp1m = parseFloat(inp1m); // Convert input string to float number
    
    let inp2m = document.getElementById("input2m").value.trim(); // Get second moisture input value and remove whitespace
    if(inp2m === ""){ // Check if input is empty
        alert("Enter The Value"); // Show alert message if empty
        return; // Exit function early
    }
    inp2m = parseFloat(inp2m); // Convert input string to float number

    let numeratorm = inp1m - inp2m; // Calculate moisture numerator (first input minus second input)
    let divisionm = numeratorm / inp1m; // Divide numerator by first input to get moisture ratio
    let moisture = divisionm * 100; // Multiply by 100 to convert ratio to percentage
    sho2.innerHTML = moisture.toFixed(1) + "%"; // Display moisture percentage with 1 decimal place and % symbol

});


function calculatePSD() {
    let inputs = document.querySelectorAll('.retained-input');
    let cumRetainedCells = document.querySelectorAll('.cum-retained');
    let passingCells = document.querySelectorAll('.passing');
    
    let runningTotal = 0;

    for (let i = 0; i < inputs.length; i++) {
        // Input se value lena (agar khali hai to 0 manna)
        let retainedValue = parseFloat(inputs[i].value) || 0;
        
        // 1. Math for Cumulative % Retained (Pichla total + Naya input)
        runningTotal += retainedValue;
        cumRetainedCells[i].innerText = runningTotal.toFixed(2);
        
        // 2. Math for % Passing (100 - Cumulative Total)
        let passingValue = 100 - runningTotal;
        // Agar value 0 se niche jaye to 0 dikhaye
        if(passingValue < 0) passingValue = 0; 
        passingCells[i].innerText = passingValue.toFixed(2);
    }
}
