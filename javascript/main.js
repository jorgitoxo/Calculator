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
const clearValues = () => {operator = '', leftOperand = '', rightOperand = '', operationResult = ''};

const executeOperation = function() {
    if (leftOperand === '')
        leftOperand = 0;
    if (operator && rightOperand === '')
        rightOperand = 0;

    clearDisplay();

    if (operator === '') {
        currentOperation.innerText = leftOperand;
    } else {
        leftOperand = operate(operator, leftOperand, rightOperand);;
        currentOperation.innerText = leftOperand;
        rightOperand = '';
        operator = '';
    }
}

const updateOperator = (e) => {
    clearDisplay();
    
    if (rightOperand !== '') {
        operationResult = operate(operator, leftOperand, rightOperand);
        leftOperand = operationResult;
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
        rightOperand = '';
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
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues()});
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
