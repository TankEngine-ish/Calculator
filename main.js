initialValue = 0
let displayValue = '';
let firstNum = ''
let secondNum = ''
let midOperator = ''


function wipeDisplay();
function undoInt();

function adding (a, b){
    return leftNum(a) + rightNum(b);
}

function subtracting (a, b){
    return leftNum(a) - rightNum(b);
}
function multiply (a, b){
    return leftNum(a) * rightNum(b);
}
function divide (a, b) {
    if (rightNum(b) == 0){
        return "system32 deleted - well done!"
    }else {
        return leftNum(a) / rightNum(b);
    }
}



function operate (operator, two numbers) {
    // if + call adding, if - call subtracting
calling one of the above functions.
}


function populateLower ()
function populateUpper ()

const upperPart = document.getElementById('previousCalc');
const lowerPart = document.getElementById('currentCalc');
const numberButtons = document.querySelectorAll('button');
