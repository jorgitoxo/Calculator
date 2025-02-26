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

const clearDisplay = () => {lastOperation.innerText = '', currentOperation.innerText = '';}
const clearValues = () => {operator = '', leftOperand = '', rightOperand = '';}

const toggleOperation = (key) => {
    if (!currentOperation.innerText.includes(key))
        currentOperation.innerText += key;
}

const initiateOperands = () => {
    if (leftOperand === '' || isNaN(leftOperand)) leftOperand = 0;
    if (operator && (rightOperand === '' || isNaN(rightOperand))) rightOperand = 0;
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

const backspaceDisplay = (e) => {
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
    updateOperand(e);
}

const updateOperand = (e) => {
    // Counter-intuitive to use linkOperation() since it updates leftOperand but
    // necessary to clear currentOperation.innerText after an operation is completed
    // without repeating code, leftOperand will be updated below from a fresh source
    if (e.target.id === "backspace") operationResult = ''
    else linkOperation();

    if (e.target.value === ".")
        toggleOperation(e.target.value);
    else if (e.target.value !== "." && currentOperation.innerText.length < 10)
        currentOperation.innerText += e.target.value;

    if (operator === '' && currentOperation.innerText !== "-") {
        leftOperand = Math.round(Number(lastOperation.innerText + currentOperation.innerText) * 100) / 100;
        lastOperation.innerText = '';
    } else if (operator !== '' && currentOperation.innerText !== "-") {
        rightOperand = Math.round(Number(currentOperation.innerText) * 100) / 100;
    }
}

const updateOperator = (e) => {
    if (currentOperation.innerText === '' && e.target.value === '-' ) {
        toggleOperation(e.target.value);
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
        operationResult = Math.round(operate(operator, leftOperand, rightOperand) * 100) / 100;
        clearValues();
    }

    if (operationResult < 1e10)
        currentOperation.innerText = operationResult;
    else if (operationResult > 1e10)
        currentOperation.innerText = operationResult.toExponential(2);

    if (isNaN(operationResult) || !isFinite(operationResult) || operationResult > 1e10) {
        invalidOperationFlag = true;
        lastOperation.innerText = "Out ouf bounds number";
        return;
    }

    if (e.target.value === "=") clearValues();
    else linkOperation();
}

const calculator = function() {
    // Operations
    clearButton.addEventListener("click", () => {clearDisplay(), clearValues(), operationResult = ''});
    backspaceButton.addEventListener("click", (e) => {resetInvalidOperationFlag(), backspaceDisplay(e)});
    decimalButton.addEventListener("click", (e) => {resetInvalidOperationFlag(), updateOperand(e)});
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
