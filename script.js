// Global Variables
const buttons = Array.from(document.querySelectorAll('.button'));
const calculatorText = document.querySelector('.calculator-text');

// Calculator Storage
var InMemStorage = {
    a : '',
    b : '',
    operator : ''
}

// Update Screen From Button Pressing (MAIN FUNCTION)
function updateScreen(e) {
    const targetValue = e.target.value ? e.target.value: "";
    
    switch(targetValue) {
        case "=":
            if (!InMemStorage['a'] || !InMemStorage['b'] || !InMemStorage['operator']) {
                break;
            } else {
                calculatorText.innerText = operate(window[InMemStorage['operator']], Number(InMemStorage['a']), Number(InMemStorage['b']));
                updateStorage(a=calculatorText.innerText);
                break;
                }

        case "add":
            OperatorButton(add, targetValue);
            break;
        
        case "subtract":
            OperatorButton(subtract, targetValue);
            break;    

        case "multiply":
            OperatorButton(multiply, targetValue);
            break;
        
        case "divide":
            OperatorButton(divide, targetValue);
            break;
        
        case "ac":
            calculatorText.innerText = "0";
            updateStorage();
            break;
        
        case "c":
            calculatorText.innerText = calculatorText.innerText.slice(0,-1);
            if (!calculatorText.innerText) {
                calculatorText.innerText = '0'
            }
            break;
        
        case "int":
            var result = Number(calculatorText.innerText) * -1;
            calculatorText.innerText = result;
            
            if (InMemStorage['a'] && !InMemStorage['b']) {
                InMemStorage['a'] = result;
            } else if (InMemStorage['a'] && InMemStorage['b']) {
                InMemStorage['b'] = result;
            }
            break;
        
        case "percent":
            var result = Number(operate(divide, calculatorText.innerText, 100));
            calculatorText.innerText = result;
            
            if (InMemStorage['a'] && !InMemStorage['b']) {
                InMemStorage['a'] = result;
            } else if (InMemStorage['a'] && InMemStorage['b']) {
                InMemStorage['b'] = result;
            }
            break;
        
        case "decimal":
            if (!calculatorText.innerText.includes(".")) {
                calculatorText.innerText = calculatorText.innerText.concat(".");
            }
            break;

        case "sqr":
            var result = calculatorText.innerText ** 2;
            calculatorText.innerText = result;
            
            if (InMemStorage['a'] && !InMemStorage['b']) {
                InMemStorage['a'] = result;
            } else if (InMemStorage['a'] && InMemStorage['b']) {
                InMemStorage['b'] = result;
            }
            break;
        
        case "sqrt": 
            var result = getSquareRoot(calculatorText.innerText);
            calculatorText.innerText = result;
        
            if (InMemStorage['a'] && !InMemStorage['b']) {
                InMemStorage['a'] = result;
            } else if (InMemStorage['a'] && InMemStorage['b']) {
                InMemStorage['b'] = result;
            }
            break;
        
        case "pow":
            var power = prompt("Please select what power you want to raise the number to: ")
            if (typeof(power) != "number") {
                power = prompt("Please select a valid number. ")
            }
            
            var result = raisePower(calculatorText.innerText, power);
            calculatorText.innerText = result;

            if (InMemStorage['a'] && !InMemStorage['b']) {
                InMemStorage['a'] = result;
            } else if (InMemStorage['a'] && InMemStorage['b']) {
                InMemStorage['b'] = result;
            }
            break;
        
        default:
            if (calculatorText.innerText == '0') 
            {
                calculatorText.innerText = '';
            }
            calculatorText.innerText = calculatorText.innerText.concat(targetValue);
            
            if (!InMemStorage['operator']) {
                InMemStorage['a'] = calculatorText.innerText;
            
            } else {
                InMemStorage['b'] = calculatorText.innerText;
            }
    }
}

// HELPER FUNCTIONS START

// updates calculator storage (erases by default)
function updateStorage(a='',b='', operator='') {
    InMemStorage['a'] = a;
    InMemStorage['b'] = b;
    InMemStorage['operator'] = operator;
}

// Evaluation Function
function operate(operator, a, b) {
    let result = operator(a,b)
    if (Number.isInteger(result)) {
        return result
    } else {
        return result.toFixed(5);
    }
    
}

// Is called when operator button (+,- etc..) is clicked
function OperatorButton(operatorFunction, targetValue) {
    if (!InMemStorage['a'] || !InMemStorage['b'] || !InMemStorage['operator']) {
        InMemStorage['operator'] = targetValue;
        calculatorText.innerText=''
    
    } else {
        calculatorText.innerText = operate(operatorFunction, Number(InMemStorage['a']), Number(InMemStorage['b']));
        updateStorage(a=calculatorText.innerText)
    }
}

// Mathematical Functions
function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}
function raisePower(a,b) {
    var result = a ** b;
    if (Number.isInteger(result)) {
        return result
    } else {
        return result.toFixed(5);
    }
}
function getSquareRoot(a) {
    return Math.sqrt(a).toFixed(5);
}

// HELPER FUNCTIONS END

buttons.forEach(button => button.addEventListener('click', updateScreen));