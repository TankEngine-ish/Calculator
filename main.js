let leftOperand = ''
let rightOperand = ''
let operation = null
let screenRefresh = false


const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')

const previousCalc = document.getElementById('previousCalc');
const currentCalc = document.getElementById('currentCalc');

const undoButton = document.getElementById('undo');
const allClear = document.getElementById('clear');
const decimalPoint = document.getElementById('dot');
const equalSign = document.getElementById('equals');


window.addEventListener('keydown', handleKeyboardInput)
equalSign.addEventListener('click', evaluate)
allClear.addEventListener('click', clear)
undoButton.addEventListener('click', deleteNumber)
decimalPoint.addEventListener('click', appendPoint)



numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)


function appendNumber(number) {
    if (currentCalc.textContent === '0' || screenRefresh)
        resetScreen()
    currentCalc.textContent += number
  }
  
function resetScreen() {
    currentCalc.textContent = ''
    screenRefresh = false
  }

function clear() {
    currentCalc.textContent = '0'
    previousCalc.textContent = ''
    leftOperand = ''
    rightOperand = ''
    operation = null
  }
//   resetting the screen and setting the initial value of the 'current operation screen' to 0.


function appendPoint() {
    if (screenRefresh) resetScreen()
    if (currentCalc.textContent === '')
    currentCalc.textContent = '0'
    if (currentCalc.textContent.includes('.')) return
    currentCalc.textContent += '.'
  }

//   .includes() method checks if there's a '.' in the current calculation screen and appends it if true.
//    We need a separate function for the dot because it's the only character other than the operands that gets appended to the current calulation screen.
  
function deleteNumber() {
    currentCalc.textContent = currentCalc.textContent
      .toString()
      .slice(0, -1)
  }


function setOperation(operator) {
    if (operation !== null) evaluate()
    leftOperand = currentCalc.textContent
    operation = operator
    previousCalc.textContent = `${leftOperand} ${operation}`
    screenRefresh= true
  }


function evaluate() {
    if (operation === null || screenRefresh) return
    if (operation === '÷' && currentCalc.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    rightOperand = currentCalc.textContent
    currentCalc.textContent = roundResult(
      operate(operation, leftOperand, rightOperand)
    )
    previousCalc.textContent = `${leftOperand} ${operation} ${rightOperand} =`
    operation = null
  }
  


  function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }



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

function operate (operator, leftNum, rightNum) {
    switch(operator){
        case '+':
            return add(leftNum, rightNum);
            break;
        case '-':
            return subtract(leftNum, rightNum);
            break;
        case '*':
            return multiply(leftNum, rightNum);
            break;
        case '/':
            return divide(leftNum, rightNum);
            break;
    }
}
