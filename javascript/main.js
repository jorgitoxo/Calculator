let leftOperand = 0;
let rightOperand = 0;
let operator;


const add = function(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
};

const subtract = function(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
};

const multiply = function(leftOperand, rightOperand) {
    // return arr.reduce((total, num) => total * num);
    return leftOperand * rightOperand;
};

const divide = function(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
};

const operate = function(operator, leftOperand, rightOperand) {
    return operator === '+' ? add(leftOperand, rightOperand)
    : operator === '-' ? subtract(leftOperand, rightOperand)
    : operator === '*' ? multiply(leftOperand, rightOperand)
    : operator === '/' ? divide(leftOperand, rightOperand)
    : "Not a valid operator";
}


// Manual testing
console.log(operate('+', 3, 4));
