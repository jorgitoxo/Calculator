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

// Toggle operation for decimal places and/or negative operands
const toggleOperation = (key) => {
    if (!currentOperation.innerText.includes(key))
        currentOperation.innerText += key;
}

// Initiates operands to 0
const initiateOperands = () => {
    if (leftOperand === '' || isNaN(leftOperand)) leftOperand = 0;
    if (operator && (rightOperand === '' || isNaN(rightOperand))) rightOperand = 0;
}

// Flag up (true) when division by zero cases
const setInvalidOperationFlag = () => {
    clearDisplay();
    lastOperation.innerText = "You, naughty you!!";
    invalidOperationFlag = true;
}

// Reset flag down (false) and clear all other values
const resetInvalidOperationFlag = () => {
    if (invalidOperationFlag) {
        clearDisplay();
        clearValues();
        operationResult = '';
        invalidOperationFlag = false;
    }
}

// Passes operation result value on to left operand
// For when an operation result is to be used as left operand
const linkOperation = () => {
    if (operationResult !== '' && !isNaN(operationResult) && isFinite(operationResult) && operationResult < 1e10) {
        leftOperand = operationResult;
        operationResult = '';
        clearDisplay();
    }
}

// Deletes one character at a time based on evaluations
// Call to updateOperand, registers change on operand values
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

// Registers left and right operand changes
const updateOperand = (e) => {
    // It seems counter-intuitive to use linkOperation() since it updates leftOperand
    // but necessary to clear currentOperation.innerText after an operation is completed
    // without repeating code, leftOperand will be updated below from a fresh source
    if (e.target.id === "backspace") operationResult = ''
    else linkOperation();

    // Check for decimal input
    // Otherwise, check that the display content
    // does not exceed 10 characters
    // before appending the new key input
    if (e.target.value === ".")
        toggleOperation(e.target.value);
    else if (e.target.value !== "." && currentOperation.innerText.length < 10)
        currentOperation.innerText += e.target.value;

    // By logic, if there is no operator
    // then changes must be for the left operand
    // Once an operator is present, we can assume
    // changes are for the right operand
    if (operator === '' && currentOperation.innerText !== "-") {
        leftOperand = Math.round(Number(lastOperation.innerText + currentOperation.innerText) * 100) / 100;
        lastOperation.innerText = '';
    } else if (operator !== '' && currentOperation.innerText !== "-") {
        rightOperand = Math.round(Number(currentOperation.innerText) * 100) / 100;
    }
}

// Registers operator changes
const updateOperator = (e) => {
    if (currentOperation.innerText === '' && e.target.value === '-' ) {
        toggleOperation(e.target.value);
        return;
    }

    // Case when operator is present
    // will call on executeOperation()
    // before updating to the latest operator
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

    // First IF deals with division by zero cases
    if (operator === "/" && rightOperand === 0) {
        setInvalidOperationFlag();
        return;
    }
    
    // Second IF determines the operation result
    if (operator === '' && operationResult === '') {
        operationResult = leftOperand;
    } else if (operator !== '') {
        operationResult = Math.round(operate(operator, leftOperand, rightOperand) * 100) / 100;
        clearValues();
    }

    // Third IF presents the operation result on screen,
    // ...rounded up when longer than 10 chars
    if (operationResult < 1e10)
        currentOperation.innerText = operationResult;
    else if (operationResult > 1e10)
        currentOperation.innerText = operationResult.toExponential(2);

    // Fourth IF checks that operation result is valid
    if (isNaN(operationResult) || !isFinite(operationResult) || operationResult > 1e10) {
        invalidOperationFlag = true;
        lastOperation.innerText = "Out ouf bounds number";
        return;
    }

    // Fifth IF for when an operation carries on
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
        // "." and "=" need checking out,
        // as they are present in the element (numPad)
        // on which this event listener is registerd on
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
