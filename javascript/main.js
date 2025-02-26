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

const toggleNegative = () => {
    if (!currentOperation.innerText.includes('-'))
        currentOperation.innerText += '-';
}

const toggleDecimal = () => {
    if (!currentOperation.innerText.includes('.') && operationResult === '')
        currentOperation.innerText += '.'
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
    lastOperation.innerText = "You, naughty you!!";
    invalidOperationFlag = true;
}

const resetInvalidOperationFlag = () => {
    if (invalidOperationFlag) {
        clearDisplay();
        clearValues();
        operationResult = '';
        invalidOperationFlag = false;
    }
}

const linkOperation = () => {
    if (operationResult !== '' && !isNaN(operationResult) && isFinite(operationResult) && operationResult < 1e10) {
        leftOperand = operationResult;
        operationResult = '';
        clearDisplay();
    }
}

const backspaceDisplay = () => {
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

const updateOperand = (e) => {
    // Counter-intuitive to use linkOperation() since it updates leftOperand but
    // necessary to clear currentOperation.innerText after an operation is completed
    // without repeating code, leftOperand will be updated below from a fresh source
    linkOperation();
    initiateOperands();
    
    if (e && currentOperation.innerText.length < 10)
        currentOperation.innerText += e.target.value;

    if (operator === '' && currentOperation.innerText !== "-" && currentOperation.innerText !== "") {
        leftOperand = parseFloat(lastOperation.innerText + currentOperation.innerText)
        lastOperation.innerText = '';
    } else if (operator !== '' && currentOperation.innerText !== "-" && currentOperation.innerText !== "") {
        rightOperand = parseFloat(currentOperation.innerText);
    }
}

const updateOperator = (e) => {
    if (currentOperation.innerText === '' && e.target.value === '-' ) {
        toggleNegative();
        return;
    }

    if (operator === '') initiateOperands();
    else executeOperation(e);

    if (invalidOperationFlag) {
        return;
    } else {
        linkOperation();
        clearDisplay();
        operator = e.target.value;
        lastOperation.innerText = leftOperand + operator;
    }
}

const executeOperation = (e) => {
    initiateOperands();
    clearDisplay();

    if (operator === "/" && rightOperand === 0) {
        setInvalidOperationFlag();
        return;
    }
    
    if (operator === '' && operationResult === '') {
        operationResult = leftOperand;
    } else if (operator !== '') {
        operationResult = round(operate(operator, leftOperand, rightOperand), 2);
        clearValues();
    }

    if (operationResult < 1e10)
        currentOperation.innerText = operationResult;
    else if (operationResult > 1e10)
        currentOperation.innerText = operationResult.toExponential(2);

    if (isNaN(operationResult) || !isFinite(operationResult) || operationResult > 1e10)
        invalidOperationFlag = true;
    
    if (invalidOperationFlag) {
        lastOperation.innerText = "Out ouf bounds number";
        return;
    }

    if (e.target.value === "=") clearValues();
    else linkOperation();
}

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues(), operationResult = ''});
    backspaceButton.addEventListener("click", () => {resetInvalidOperationFlag(), backspaceDisplay()});
    decimalButton.addEventListener("click", () => {resetInvalidOperationFlag(), toggleDecimal()});
    equalsButton.addEventListener("click",(e) => executeOperation(e));
    // Operands
    numPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined && e.target.value !== "." && e.target.value !== "=" ) {
            resetInvalidOperationFlag();
            updateOperand(e);
        }
    });
    // Operators
    operatorPad.addEventListener("click", (e) => {
        if (e.target.value !== undefined) {
            resetInvalidOperationFlag();
            updateOperator(e);
        }
    });
}

calculator();
