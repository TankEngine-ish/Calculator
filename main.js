const previousCalc = document.getElementById('previousCalc');
const currentCalc = document.getElementById('currentCalc');
const calcButtons = document.querySelectorAll('button');
const undoButton = document.getElementById('undo');
const allClear = document.getElementById('clear');
const decimalPoint = document.getElementById('dot');
const equalSign = document.getElementById('equals');



// initialValue = 0

// let displayValue = '';

let firstNum = ''
let secondNum = ''
let operation = null
let displayRefresh = false

calcButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

function add (a, b){
    return leftNum(a) + rightNum(b);
}

function subtract (a, b){
    return leftNum(a) - rightNum(b);
}

function multiply (a, b){
    return leftNum(a) * rightNum(b);
}

function divide (a, b) {
    if (rightNum(b) == 0){
        return "system32 deleted - well done!";
    }else {
        return leftNum(a) / rightNum(b);
    }
}

function operate (operator, num1, num2) {
    switch(operator){
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
            break;
        case '*':
            return multiply(num1, num2);
            break;
        case '/':
            return divide(num1, num2);
            break;
    }
}
