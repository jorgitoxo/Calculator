let operator = '';
let leftOperand = '';
let rightOperand = '';
let operationResult = '';

let lastOperation = document.getElementById("lastOperationDisplay");
let currentOperation = document.getElementById("currentOperationDisplay");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimalSeparator");
const equalsButton = document.getElementById("equalsButton");

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

const executeOperation = function() {
    if (leftOperand === '')
        leftOperand = 0;

    if (rightOperand === '')
        rightOperand = 0;
    
    clearDisplay();
    operationResult = operate(operator, leftOperand, rightOperand);
    
    return (operator === '') ?
        currentOperation.innerText = leftOperand
        : currentOperation.innerText = operationResult;
}

const updateOperator = (e) => {
    clearDisplay();
    
    if (rightOperand !== '') {
        leftOperand = operate(operator, leftOperand, rightOperand);
        operator = e.target.value;
        rightOperand = currentOperation.innerText;
        lastOperation.innerText = leftOperand + operator;
    } else {
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
    }
}

const updateOperand = function(e) {
    currentOperation.innerText += e.target.value;

    if (operator === '')
        leftOperand = parseInt(currentOperation.innerText);
    else
        rightOperand = parseInt(currentOperation.innerText);
}

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), resetValues()});
    backspaceButton.addEventListener("click", () => backspaceDisplay());
    equalsButton.addEventListener("click",() => executeOperation());
    // decimalButton.addEventListener("click", () => ());

    // Operands
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined)
            updateOperand(e);
    });

    // Operators
    operatorPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined)
            updateOperator(e);
    });
}

calculator();
