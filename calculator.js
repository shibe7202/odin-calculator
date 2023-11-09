let firstNumber, secondNumber, operator;
let displayValue = 0;
const operators = ['+', '-', '*', '/'];
const operatorKeys = ['add', 'subtract', 'multiply', 'divide'];

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    const operatorKey = operatorKeys[operators.indexOf(operator)];
    return window[operatorKey](parseInt(firstNumber), parseInt(secondNumber));
}

const display = document.querySelector('#display');
function updateDisplay(symbol) {
    display.textContent = symbol;
    displayValue = symbol;
}

// Update display, store first and second value, and call operate on '='
function resolveClick(button) {
    const input = button.currentTarget.textContent;
    if (input == '=' && secondNumber) {
        const solution = operate(operator, firstNumber, secondNumber);
        updateDisplay(solution);
        firstNumber = solution;
        secondNumber = null;
        operator = null;
    } else if (operators.includes(input) && (!operator)) {
        operator = input;
    } else if (operators.includes(input) && operator && secondNumber) {
        const solution = operate(operator, firstNumber, secondNumber);
        updateDisplay(solution);
        firstNumber = solution;
        secondNumber = null;
        operator = input;
    } else if (input == 'clear') {

    } else if (firstNumber && operator && !secondNumber) {
        secondNumber = input;
        updateDisplay(secondNumber);
    }  else if (!secondNumber && (Number.isInteger(+input))) {
        firstNumber = input;
        updateDisplay(firstNumber);
    }
}

// Adds event listeners to all calculator buttons.
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        resolveClick(event);
    })
})

