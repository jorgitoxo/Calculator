// const keyboard = document.getElementById("keyboard");
// const operands = document.querySelectorAll(".operand");
let lastOperation = document.getElementById("lastOperationDisplay");
let currentOperation = document.getElementById("currentOperationDisplay");


const add = (leftOperand, rightOperand) => leftOperand + rightOperand;

const subtract = (leftOperand, rightOperand) => leftOperand - rightOperand;

const multiply = (leftOperand, rightOperand) => leftOperand * rightOperand;

const divide = (leftOperand, rightOperand) => leftOperand / rightOperand;

const operate = (operator, leftOperand, rightOperand) => {
    return operator === '+' ? add(leftOperand, rightOperand)
    : operator === '-' ? subtract(leftOperand, rightOperand)
    : operator === '*' ? multiply(leftOperand, rightOperand)
    : operator === '/' ? divide(leftOperand, rightOperand)
    : "Not a valid operator";
}


const populateDisplay = function() {
    let operator;
    let leftOperand = 0;
    let rightOperand = 0;

    // Operands
    registerOperands();
    
    // Operators

    // Operations
    registerOperation();
}


const registerOperands = function (e) {
    const numPad = document.getElementById("numPad");
    numPad.addEventListener("click", (e) => currentOperation.innerText += e.target.value);
}

const registerOperation = function() {
    const clear = document.getElementById("clear");
    const backspace = document.getElementById("backspace");

    const clearDisplay = function() {
        lastOperation.innerText = "";
        currentOperation.innerText = "";
    }

    const backspaceDisplay = function () {
        currentOperation.innerText = currentOperation.innerText.slice(0, -1);
    }
    
    clear.addEventListener("click", () => clearDisplay());
    backspace.addEventListener("click", () => backspaceDisplay())
}



const registerOperator = function() {

}

// Manual testing
// console.log(operate('+', 3, 4));

populateDisplay();
