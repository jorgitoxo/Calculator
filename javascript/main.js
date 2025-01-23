const keyboard = document.getElementById("keyboard");
const operands = document.querySelectorAll(".operand");
const numPad = document.getElementById("numPad");

let operator;
let leftOperand = 0;
let rightOperand = 0;

let lastOperation = document.getElementById("lastOperationDisplay");
let currentOperation = document.getElementById("currentOperationDisplay");

const add = function(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
};

const subtract = function(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
};

const multiply = function(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
};

const divide = function(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
};

const operate = function(operator, leftOperand, rightOperand) {
    return operator === '+' ? add(leftOperand, rightOperand)
    : operator === '-' ? subtract(leftOperand, rightOperand)
    : operator === '*' ? multiply(leftOperand, rightOperand)
    : operator === '/' ? divide(leftOperand, rightOperand)
    : "Not a valid operator";
}

const populateDisplay = function() {
    numPad.addEventListener("click", (e) => registerOperands(e));
    
    // clearDisplay();
}

const clearDisplay = function() {
    lastOperation.innerText = "";
    currentOperation.innerText = "";
}


const backspaceDisplay = function () {

}


const registerOperands = function (e) {
    currentOperation.innerText += e.target.value;
}


const registerOperator = function() {

}

const registerOperation = function() {


}


// Manual testing
// console.log(operate('+', 3, 4));

populateDisplay();
