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
    let solution = window[operatorKey](+firstNumber, +secondNumber);
    solution = Math.round(solution * 1000000000) / 1000000000;
    return solution;
}

const display = document.querySelector('#display');
function updateDisplay(symbol) {
    display.textContent = symbol;
    displayValue = symbol;
}

// Update display, store first and second operand, and compute solution if needed.
function resolveClick(button) {
    const input = button.currentTarget.textContent;
    if (input == '=' && secondNumber) {
        const solution = operate(operator, firstNumber, secondNumber);
        updateDisplay(solution);
        firstNumber = solution;
        secondNumber = null;
        operator = null;
    } else if (input == '=') {
        return;
    } else if (operators.includes(input) && (!operator) && firstNumber) {
        operator = input;
    } else if (operators.includes(input) && operator && secondNumber) {
        const solution = operate(operator, firstNumber, secondNumber);
        updateDisplay(solution);
        firstNumber = solution;
        secondNumber = null;
        operator = input;
    } else if (input == 'clear') {
        firstNumber = null;
        secondNumber = null;
        operator = null
        updateDisplay(0);
    } else if (firstNumber && operator && !secondNumber && (!isNaN(+input))) {
        if (input == 0 && operator == '/') {
            updateDisplay('https://en.wikipedia.org/wiki/Division_by_zero');
            return
        }
        secondNumber = input;
        updateDisplay(secondNumber);
    }  else if (!secondNumber && (!isNaN(+input))) {
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

