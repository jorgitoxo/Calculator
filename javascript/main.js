let operator = '';
let leftOperand = '';
let rightOperand = '';
let operationResult = '';
let invalidOperationFlag = false;

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

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const clearDisplay = () => {
    lastOperation.innerText = '';
    currentOperation.innerText = '';
}

const clearValues = () => {
    operator = '';
    leftOperand = '';
    rightOperand = '';
}

const setInvalidOperationFlag = () => {
    clearDisplay();
    currentOperation.innerText = "You, naughty you!!";
    invalidOperationFlag = true;
}

const resetInvalidOperationFlag = () => {
    if (invalidOperationFlag) {
        clearDisplay();
        clearValues();
        invalidOperationFlag = false;
    }
}

const backspaceDisplay = () => {
    resetInvalidOperationFlag();

    if (currentOperation.innerText !== '') {
        currentOperation.innerText = currentOperation.innerText.slice(0, -1);
    } else if (currentOperation.innerText === '' && operator) {
        operator = '';
        lastOperation.innerText = lastOperation.innerText.slice(0, -1);
        currentOperation.innerText = lastOperation.innerText;
        lastOperation.innerText = '';
    } else {
        lastOperation.innerText = lastOperation.innerText.slice(0, -1);
    }
    updateOperand();
}

const initiateOperands = () => {
    if (leftOperand === '') leftOperand = 0;
    if (operator && rightOperand === '') rightOperand = 0;
}

const updateOperand = function() {
    initiateOperands();

    if (operator === '') {
        leftOperand = (currentOperation.innerText !== "-" && currentOperation.innerText !== "") ?
                        parseFloat(lastOperation.innerText + currentOperation.innerText)
                        : 0;
        lastOperation.innerText = '';
    } else {
        rightOperand = currentOperation.innerText ?
                            parseFloat(currentOperation.innerText)
                            : 0;
    }
}

const toggleDecimal = () => {
    if (!currentOperation.innerText.includes('.')) {
        resetInvalidOperationFlag();
        currentOperation.innerText += '.'
    }
}

const executeOperation = function() {
    initiateOperands();
    clearDisplay();

    if (operator === "/" && rightOperand === 0) {
        setInvalidOperationFlag();
        return;
    }
    
    if (operator === '') {
        operationResult = leftOperand;
    } else {
        operationResult = operate(operator, leftOperand, rightOperand);
        clearValues();
        leftOperand = round(operationResult, 2);
    }
    currentOperation.innerText = leftOperand;
}

const updateOperator = (e) => {
    if (currentOperation.innerText === '' && e === '-' ) {
        negativeToggle();
        return;
    }

    if (operator === '') {
        initiateOperands();
    } else {
        executeOperation();
    }

    if (invalidOperationFlag) {
        return;
    } else {
        clearDisplay();
        operator = e;
        lastOperation.innerText = leftOperand + operator;
    }
}

const negativeToggle = () => {
    if (!currentOperation.innerText.includes('-'))
        currentOperation.innerText += '-';
}

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues()});
    backspaceButton.addEventListener("click", () => backspaceDisplay());
    equalsButton.addEventListener("click",() => executeOperation());
    decimalButton.addEventListener("click", () => toggleDecimal());

    // Operands
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined && e.target.value !== "." && e.target.value !== "=" ) {
            resetInvalidOperationFlag();
            currentOperation.innerText += e.target.value;
            updateOperand(e.target.value);
        }
    });

    // Operators
    operatorPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined) {
            resetInvalidOperationFlag();
            updateOperator(e.target.value);
        }
    });
}

calculator();
