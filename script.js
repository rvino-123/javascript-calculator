// Global Variables
const buttons = Array.from(document.querySelectorAll('.button'));
const calculatorText = document.querySelector('.calculator-text');
const equalsButton = document.getElementById('equals');

// Calculator Storage
var InMemStorage = {
    a : '',
    b : '',
    operator : ''
}

// Maps symbols to functions
const operatorMap = {
    '+' : add,
    '-' : subtract,
    'x' : multiply,
    '/' : divide
}

// Update Screen From Button Pressing (MAIN FUNCTION)
function updateScreen(e) {
    const targetValue = e.target.value ? e.target.value: "";
    if (targetValue == "=") {
        if (!InMemStorage['a'] || !InMemStorage['b'] || !InMemStorage['operator']) {
            // Incomplete Equation returns nothing when selecting equals button
            return;
        } else {
            // Displays Result
            calculatorText.innerText = operate(operatorMap[InMemStorage['operator']], Number(InMemStorage['a']), Number(InMemStorage['b']))
            
            // Stores the Answer, clears rest of variables
            updateStorage(a=calculatorText.innerText)
            return;
        }
        // Check If event value match the keys of the operator map
    } else if (Object.keys(operatorMap).indexOf(targetValue) != -1) {
            
        // If at least one variable is empty in memory, then this adds/overrides currently selected operator       
        if (!InMemStorage['a'] || !InMemStorage['b'] || !InMemStorage['operator']) {
            InMemStorage['operator'] = targetValue;
            calculatorText.innerText=''
            
        } else {
            calculatorText.innerText = operate(operatorMap[InMemStorage['operator']], Number(InMemStorage['a']), Number(InMemStorage['b']));
            updateStorage(a=calculatorText.innerText)
            return;

        }
        // Clear Button
    } else if (targetValue == 'ac') {
        calculatorText.innerText = "0";
        updateStorage();
        return;
    
        // Remove last number
    } else if (targetValue == 'c') {
        calculatorText.innerText = calculatorText.innerText.slice(0,-1);
        return;
    
    } else if (targetValue == 'int') {
        var result = Number(calculatorText.innerText) * -1;
        calculatorText.innerText = result;
        return;

    } else if (targetValue == 'decimal') {
        var result = Number(operate(divide, calculatorText.innerText, 100));
        calculatorText.innerText = result;
        return;
    
    } else {
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
// Helper Functions
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

window.addEventListener('click', updateScreen)


