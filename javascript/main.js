let operator = "";
let lastOperation = document.getElementById("lastOperationDisplay");
let currentOperation = document.getElementById("currentOperationDisplay");

let leftOperand = parseInt(lastOperation.innerText);
let rightOperand = parseInt(currentOperation.innerText);

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

const clearDisplay = function() {
    lastOperation.innerText = "";
    currentOperation.innerText = "";
}

const backspaceDisplay = function() {
    currentOperation.innerText = currentOperation.innerText.slice(0, -1);
}

const updateResult = () => {
    leftOperand = parseInt(lastOperation.innerText);
    rightOperand = parseInt(currentOperation.innerText);
    let operationResult = 0;

    clearDisplay();
    operationResult = operate(operator, leftOperand, rightOperand);
    currentOperation.innerText = operationResult;
}

const updateOperator = (e) => {
    // lastOperation.innerText = currentOperation.innerText
    operator = e.target.innerText;
    leftOperand = parseInt(lastOperation.innerText);
    rightOperand = parseInt(currentOperation.innerText);

    operationResult = operate(operator, leftOperand, rightOperand);
    lastOperation.innerText = operationResult;

}

const calculator = function() {
    // Display operations
    const clear = document.getElementById("clear");
    clear.addEventListener("click", () => clearDisplay(lastOperation, currentOperation));
    const backspace = document.getElementById("backspace");
    backspace.addEventListener("click", () => backspaceDisplay(currentOperation));


    // Register operands on screen
    const numPad = document.getElementById("numPad");
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined && e.target.value !== "=") {
            currentOperation.innerText += e.target.value
        } else if (e.target.value === "=") {
            updateResult();
        }
    });


    // Operators
    const operatorPad = document.getElementById("operators");
    operatorPad.addEventListener("click", (e) => {
        // operator = e.target.innerText;
        updateOperator(e);
        // currentOperation.innerText = ;
    });
}

calculator();
