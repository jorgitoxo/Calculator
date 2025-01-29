let operator = '';
let leftOperand = '';
let rightOperand = '';
let operationResult = 0;

let lastOperation = document.getElementById("lastOperationDisplay");
let currentOperation = document.getElementById("currentOperationDisplay");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimalSeparator")
const equalsButton = document.getElementById("equalsButton")

const numPad = document.getElementById("numPad");
const operatorPad = document.getElementById("operators");

const add = (leftOperand, rightOperand) => leftOperand + rightOperand;
const subtract = (leftOperand, rightOperand) => leftOperand - rightOperand;
const multiply = (leftOperand, rightOperand) => leftOperand * rightOperand;
const divide = (leftOperand, rightOperand) => leftOperand / rightOperand;
const operate = (operator, leftOperand, rightOperand) => {
    return operator === '+' ? add(leftOperand, rightOperand)
    : operator === '-' ? subtract(leftOperand, rightOperand)
    : operator === '*' ? multiply(leftOperand, rightOperand)
    : operator === '/' ? divide(leftOperand, rightOperand)
    : 0;
}

const resetValues = function() {
    leftOperand = '';
    rightOperand = '';
    operator = '';
}

const clearDisplay = function() {
    lastOperation.innerText = '';
    currentOperation.innerText = '';
}

const backspaceDisplay = () => currentOperation.innerText = currentOperation.innerText.slice(0, -1);

const evaluateOperation = function() {
    if (leftOperand === '')
        leftOperand = 0;
    // leftOperand = parseInt(lastOperation.innerText);

    if (currentOperation.innerText === '') {
        rightOperand = 0;
    } else {
        rightOperand = parseInt(currentOperation.innerText);
    }

    operationResult = operate(operator, leftOperand, rightOperand);
    clearDisplay();
    currentOperation.innerText = operationResult;
}

const updateOperator = (e) => {
    operator = e.target.value;

    if (currentOperation.innerText !== '') {
        leftOperand = parseInt(currentOperation.innerText)
    }
    clearDisplay();

    if (lastOperation.innerText !== ''){
        evaluateOperation();
        updateOperator(e);
    } else {
        lastOperation.innerText = leftOperand + operator
    }
}


const calculator = function() {
    // Display operations
    clearButton.addEventListener("click", () => clearDisplay());
    backspaceButton.addEventListener("click", () => backspaceDisplay());
    equalsButton.addEventListener("click",() => evaluateOperation());
    // decimalButton.addEventListener("click", () => ());


    // Register operands on screen
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined)
            currentOperation.innerText += e.target.value
    });


    // Operators
    operatorPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined)
            updateOperator(e);
    });
}

calculator();
