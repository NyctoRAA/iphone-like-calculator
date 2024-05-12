// // HTML Elements
// const display = document.querySelector(".display");

// // Utility Buttons
// const addButton = document.querySelector("#add-button");
// const subtractButton = document.querySelector("#subtract-button");
// const multiplyButton = document.querySelector("#multiply-button");
// const divideButton = document.querySelector("#divide-button");
// const equalButton = document.querySelector("#equal-button");
// const clearButton = document.querySelector("#clear");
// const negativeButton = document.querySelector("#negative");
// const percentButton = document.querySelector("#percent");
// const dotButton = document.querySelector("#dot");

// // Number Buttons
// const oneButton = document.querySelector("#one");
// const twoButton = document.querySelector("#two");
// const threeButton = document.querySelector("#three");
// const fourButton = document.querySelector("#four");
// const fiveButton = document.querySelector("#five");
// const sixButton = document.querySelector("#six");
// const sevenButton = document.querySelector("#seven");
// const eightButton = document.querySelector("#eight");
// const nineButton = document.querySelector("#nine");
// const zeroButton = document.querySelector("#zero");

// // Code
// let currentDisplay = "0";
// let resultDisplay = false;

// function appendToDisplay(value) {
//     if(currentDisplay === "0" || resultDisplay) {
//         currentDisplay = value;
//     } else {
//         currentDisplay += value;
//     }

//     resultDisplay = false;

//     updateDisplay();
// }

// function updateDisplay() {
//     display.textContent = currentDisplay;
// }

// function clearDisplay() {
//     currentDisplay = "0";
//     resultDisplay = false;
//     updateDisplay();
// }

// function operate() {
//     let splitted = display.textContent.split("");

//     if (splitted.includes("+")) {
//         splitted = display.textContent.split("+");
//         let value1 = Number(splitted[0]);
//         let value2 = Number(splitted[1]);
//         currentDisplay = add(value1, value2);
//         updateDisplay();
//     } else if (splitted.includes("-")) {
//         splitted = display.textContent.split("-");
//         let value1 = Number(splitted[0]);
//         let value2 = Number(splitted[1]);
//         currentDisplay = subtract(value1 - value2);
//         updateDisplay();
//     } else if (splitted.includes("*")) {
//         splitted = display.textContent.split("*");
//         let value1 = Number(splitted[0]);
//         let value2 = Number(splitted[1]);
//         currentDisplay = multiply(value1, value2);
//         updateDisplay();
//     } else if (splitted[1] === "/") {
//         splitted = display.textContent.split("/");
//         let value1 = Number(splitted[0]);
//         let value2 = Number(splitted[1]);
//         currentDisplay = divide(value1, value2);
//         updateDisplay();
//     }
// }

// function add(num1, num2) {
//     return num1 + num2;
// }

// function subtract(num1, num2) {
//     return num1 - num2;
// }

// function multiply(num1, num2) {
//     return num1 * num2;
// }

// function divide(num1, num2) {
//     return num1 / num2;
// }

// function percentage(value) {
//     return value * 0.01;
// }

// function negative() {
//     let value = Number(display.textContent);
//     if(value < 0) {
//         updateDisplay();
//         return display.innerHTML = Math.abs(value);
//     } else {
//         updateDisplay();
//         return display.innerHTML = -Math.abs(value);
//     }
// }

// // Event Listeners
// oneButton.addEventListener("click", () => appendToDisplay("1"));
// twoButton.addEventListener("click", () => appendToDisplay("2"));
// threeButton.addEventListener("click", () => appendToDisplay("3"));
// fourButton.addEventListener("click", () => appendToDisplay("4"));
// fiveButton.addEventListener("click", () => appendToDisplay("5"));
// sixButton.addEventListener("click", () => appendToDisplay("6"));
// sevenButton.addEventListener("click", () => appendToDisplay("7"));
// eightButton.addEventListener("click", () => appendToDisplay("8"));
// nineButton.addEventListener("click", () => appendToDisplay("9"));
// zeroButton.addEventListener("click", () => appendToDisplay("0"));

// dotButton.addEventListener("click", () => appendToDisplay("."));

// addButton.addEventListener("click", () => appendToDisplay("+"));
// subtractButton.addEventListener("click", () => appendToDisplay("-"));
// multiplyButton.addEventListener("click", () => appendToDisplay("*"));
// divideButton.addEventListener("click", () => appendToDisplay("/"));
// percentButton.addEventListener("click", () => appendToDisplay("%"));

// negativeButton.addEventListener("click", () => negative());
// equalButton.addEventListener("click", () => operate());
// clearButton.addEventListener("click", () => clearDisplay());

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

function operate(firstNum, secondNum, operator) {
    switch(operator.textContent) {
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function clearInput() {
    displayInput = '0';
    firstNum = 0;
    secondNum = 0;
    lastOperation = '-';

    if(operator !== undefined) {
        operator.classList.remove('active');
    }
    operator = undefined;

    const display = document.querySelector('.display');
    display.textContent = displayInput;
}

function removeLastDigit() {
    displayInput = displayInput.slice(0, displayInput.length - 1);

    const display = document.querySelector('.display');
    display.textContent = displayInput;
}

function roundNumber(num) {
    if(num % 1 !== 0) {
        return num.toFixed(2);
    } else {
        return num;
    }
}

function validateAction(event) {
    if(event.target.textContent === '=' && (firstNum === 0 || operator === undefined)) {
        alert('Invalid input! Try again.');
        clearInput();
        return false;
    }

    return true;
}

function validateInput(event) {
    if((event.target.textContent === '.' || event.key === '.') && displayInput.includes('.')) {
        alert(`Invalid input! Several dots aren't allowed.`);
        return false;
    }

    return true;
}

function action(event) {
    const display = document.querySelector('.display');

    if(!!operator) {
        operator.classList.remove('active');
    }

    if(clearDisplay) {
        displayInput = '0';
    }

    if(event.target.classList.contains('action')) {
        let actionValidation = validateAction(event);
        if(lastOperation === 'action' && actionValidation) {
            secondNum = Number(displayInput);

            firstNum = roundNumber(operate(firstNum, secondNum, operator));
            operator = event.target;
            operator.classList.add('active');
            displayInput = firstNum;
            secondNum = 0;

            if(operator.textContent === '=') {
                lastOperation = 'input';
            } else {
                lastOperation = 'action';
                clearDisplay = true;
            }

        } else if(actionValidation) {
            operator = event.target;
            operator.classList.add('active');
            firstNum = Number(displayInput);

            displayInput = '';
            lastOperation = 'action';
        }
    } else {
        if(validateInput(event)) {
            displayInput === '0' ? displayInput = event.target.textContent : displayInput += event.target.textContent;
        }
        clearDisplay = false;
    }

    display.textContent = displayInput;
}

let firstNum = 0;
let secondNum = 0;
let operator;
let lastOperation = '-';
let clearDisplay = false;

let displayInput = '';

const calcButtons = document.querySelectorAll('.calc-button');
calcButtons.forEach(a => a.addEventListener('click', action));

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearInput);

// keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code.startsWith('Digit') || event.code === 'Period') {
        const display = document.querySelector('.display');

        if(!!operator) {
            operator.classList.remove('active');
        }

        if(clearDisplay) {
            displayInput = '0';
        }

        if(validateInput(event)) {
            displayInput === '0' ? displayInput = event.key : displayInput += event.key;
        }
        clearDisplay = false;

        display.textContent = displayInput;
    }
});