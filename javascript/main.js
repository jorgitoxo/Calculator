let operator = '';
let leftOperand = '';
let rightOperand = '';
let operationResult = '';
let endOfOperationFlag = true;

const lastOperation = document.getElementById("lastOperationDisplay");
const currentOperation = document.getElementById("currentOperationDisplay");

const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

const numPad = document.getElementById("numPad");
const decimalButton = document.getElementById("decimalSeparator");
const equalsButton = document.getElementById("equalsButton");
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

const clearValues = () => {operator = '', leftOperand = '', rightOperand = ''};

const backspaceDisplay = () => {
    resetFlag();
    if (currentOperation.innerText !== '') { 
        currentOperation.innerText = currentOperation.innerText.slice(0, -1)
        updateOperand();
    }
};

const executeOperation = function() {
    if (leftOperand === '') leftOperand = 0;
    if (operator && rightOperand === '') rightOperand = 0;

    if (operator === '') {
        operationResult = leftOperand;
        currentOperation.innerText = leftOperand;
    } else if (operator === "/" && rightOperand === 0) {
        lastOperation.innerText = '';
        setFlag();
        endOfOperationFlag = true;
    } else {
        operationResult = operate(operator, leftOperand, rightOperand);
        leftOperand = operationResult;
        currentOperation.innerText = leftOperand;
        lastOperation.innerText = '';
        rightOperand = '';
        operator = '';
    }
}

const updateOperator = (e) => {
    if (rightOperand === '') {
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
        currentOperation.innerText = '';
    } else if (rightOperand === 0 && operator === "/") {
        setFlag();
    } else {
        leftOperand = operate(operator, leftOperand, rightOperand);
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
        currentOperation.innerText = '';
        rightOperand = '';
    }
}

const updateOperand = function(e) {
    if (operator === '')
        leftOperand = currentOperation.innerText ? parseInt(currentOperation.innerText) : 0;
    else
        rightOperand = currentOperation.innerText ? parseInt(currentOperation.innerText) : 0;
}

const resetFlag = () => {
    if (endOfOperationFlag) {
        clearDisplay();
        clearValues();
        endOfOperationFlag = false;
    }
}

const setFlag = () => {currentOperation.innerText = "You, naughty you!!", endOfOperationFlag = true};

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues()});
    backspaceButton.addEventListener("click", () => backspaceDisplay());
    equalsButton.addEventListener("click",() => executeOperation());
    // decimalButton.addEventListener("click", () => ());

    // Operands
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined) {
            resetFlag();
            if (operationResult !== '') {
                currentOperation.innerText = '';
                operationResult = '';
            }
            currentOperation.innerText += e.target.value;
            updateOperand(e);
        }
    });

    // Operators
    operatorPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined)
            updateOperator(e);
    });
}

calculator();
