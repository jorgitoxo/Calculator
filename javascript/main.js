let operator = '';
let leftOperand = '';
let rightOperand = '';
let operationResult = '';
let invalidOperationFlag = true;

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

const setInvalidOperationFlag = () => {currentOperation.innerText = "You, naughty you!!", invalidOperationFlag = true};
const resetInvalidOperationFlag = () => {
    if (invalidOperationFlag) {
        clearDisplay();
        clearValues();
        invalidOperationFlag = false;
    }
}

const clearDisplay = () => {lastOperation.innerText = '', currentOperation.innerText = ''};
const clearValues = () => {operator = '', leftOperand = '', rightOperand = ''};

const backspaceDisplay = () => {
    resetInvalidOperationFlag();

    if (currentOperation.innerText !== '') {
        currentOperation.innerText = currentOperation.innerText.slice(0, -1);
        updateOperand();
    } else if (currentOperation.innerText === '' && operator) {
        operator = '';
        lastOperation.innerText = lastOperation.innerText.slice(0, -1);
        leftOperand = (lastOperation.innerText) ? parseInt(lastOperation.innerText) : 0;
    } else {
        lastOperation.innerText = lastOperation.innerText.slice(0, -1);
        leftOperand = (lastOperation.innerText) ? parseInt(lastOperation.innerText) : 0;
    }
};

const updateOperand = function(e) {
    if (operator === '')
        leftOperand = currentOperation.innerText ? parseInt(currentOperation.innerText) : 0;
    else
        rightOperand = currentOperation.innerText ? parseInt(currentOperation.innerText) : 0;
}

const evaluateOperands = () => {
    if (leftOperand === '') leftOperand = 0;
    if (operator && rightOperand === '') rightOperand = 0;
}

const executeOperation = function() {
    clearDisplay();
    evaluateOperands();

    if (operator === "/" && rightOperand === 0) {
        setInvalidOperationFlag();
    } else if (operator === '') {
        operationResult = leftOperand;
        currentOperation.innerText = leftOperand
    } else {
        operationResult = operate(operator, leftOperand, rightOperand);
        leftOperand = operationResult;
        currentOperation.innerText = leftOperand;
        rightOperand = '';
        operator = '';
    }
}

const updateOperator = (e) => {
    clearDisplay();

    if (rightOperand === 0 && operator === "/") {
        setInvalidOperationFlag();
    } else if (rightOperand === '' || operator === '') {
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
    } else {
        operationResult = operate(operator, leftOperand, rightOperand);
        leftOperand = operationResult
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
        rightOperand = '';
    }
}

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues()});
    backspaceButton.addEventListener("click", () => backspaceDisplay());
    equalsButton.addEventListener("click",() => executeOperation());
    // decimalButton.addEventListener("click", () => ());

    // Operands
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined) {
            resetInvalidOperationFlag();
            if (operationResult !== '') {currentOperation.innerText = '', operationResult = ''};
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
