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
    location.reload(); 
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
    currentCalc.textContent = currentCalc.textContent.toString().slice(0, -1)
  }

// this function converts the current calculation screen to string and with the.slice method it deletes the last integer of it.
// The key on the interface of the calculator is 'undo'


function setOperation(operator) {
    if (operation !== null) evaluate()
    leftOperand = currentCalc.textContent
    operation = operator
    previousCalc.textContent = `${leftOperand} ${operation}`
    screenRefresh = true
  }


function evaluate() {
    if (operation === null || screenRefresh) return
    if (operation === '÷' && currentCalc.textContent === '0') {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = "system 32 deleted - WELL DONE!";
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


  function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
  }


  function add(a, b) {
    return a + b
  }
  
  function substract(a, b) {
    return a - b
  }
  
  function multiply(a, b) {
    return a * b
  }
  
  function divide(a, b) {
    return a / b
  }
  
  function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
      case '+':
        return add(a, b)
      case '-':
        return substract(a, b)
      case 'x':
        return multiply(a, b)
      case '÷':
        return divide(a, b)
      default:
        return null
    }
  }
