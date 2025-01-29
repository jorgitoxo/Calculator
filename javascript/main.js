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
    : "Not a valid operator";
}

const clearDisplay = () => {lastOperation.innerText = '', currentOperation.innerText = ''};
const backspaceDisplay = () => currentOperation.innerText = currentOperation.innerText.slice(0, -1);
const resetValues = () => {leftOperand = '', rightOperand = '', operator = ''};

const evaluateOperation = function() {
    if (leftOperand === '')
        leftOperand = 0;

    if (currentOperation.innerText === '')
        rightOperand = 0;
    else
        rightOperand = parseInt(currentOperation.innerText);

    clearDisplay();
    operationResult = operate(operator, leftOperand, rightOperand);
    (operationResult === "Not a valid operator") ?
        currentOperation.innerText = rightOperand
        : currentOperation.innerText = operationResult;
}

const updateOperator = (e) => {
    
    if (lastOperation.innerText !== '') {
        evaluateOperation();
        clearDisplay();
        resetValues();
        leftOperand = operationResult;
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator
    } else {
        leftOperand = parseInt(currentOperation.innerText);
        operator = e.target.value;
        clearDisplay();
        lastOperation.innerText = leftOperand + e.target.value
    }
}

const calculator = function() {
    // Display operations
    clearButton.addEventListener("click", () => {clearDisplay(), resetValues()});
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
