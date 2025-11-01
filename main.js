const calculatorDiv = document.querySelector("#calculator");
const displayTextSpan = document.querySelector("#displayText");

const numberButtons = "1234567890.";
const operatorButtons = "+-/*";

let num1 = null;
let num2 = null;
let operator = null;

let displayText = "";
let newNumber = true;

let lastPressed = null;

calculatorDiv.addEventListener("click", (event) => {
    let pressedButton = event.target.textContent; 
    processInput(pressedButton)
});

document.addEventListener("keydown", (event) => {
    let pressedButton = event.key;
    processInput(pressedButton);
});

function processInput(pressedButton){

    displayText = displayTextSpan.textContent;

    if(numberButtons.includes(pressedButton)){
        if(pressedButton == "." && displayText.includes(".")){
            lastPressed = pressedButton;
            return;
        }
        
        if(newNumber){
            displayText = "";
            newNumber = false;
        } 
        displayText += pressedButton;
    }

    else if(operatorButtons.includes(pressedButton)){

        // Wenn zweimal hintereinander die Operator Taste gedrückt wird.
        if(operatorButtons.includes(lastPressed)){
            operator = pressedButton;
            lastPressed = pressedButton;
            return;
        }

        if(operator == null){
            num1 = displayText;
            operator = pressedButton;
            lastPressed = pressedButton;
            newNumber = true;
            return;
        }
        
        num2 = displayText;
        displayText = operate(num1, num2, operator);
        num1 = displayText;

        operator = pressedButton;
        newNumber = true;
    }
    else{
        switch(pressedButton){
            case "=":
                num2 = displayText;
                displayText = operate(num1, num2, operator);
                num1 = displayText
                newNumber = true;
                operator = null;
                break;
            case "AC":
                displayText = "Start Calculating!";
                num1, num2, operator = null;
                newNumber = true;
                break;
            case "DEL":
                displayText = displayText.slice(0, -1);
                break;
        }
    }
    
    displayTextSpan.textContent = displayText;
    lastPressed = pressedButton;
}

function operate(num1, num2, operator){
    let res;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(operator){
        case "+":
            res = add(num1, num2)
            break;
        case "-":
            res = subtract(num1, num2)
            break;
        case "*":
            res = multiply(num1, num2)
            break;
        case "/":
            if(num2 == 0){
                resetAll();
                return res = "Can't divide by 0.";
            }
            else res = divide(num1, num2);
            break;
        default:
            alert("No valid operator.")
            resetAll();
            return;
    }
    return Math.round(res*100)/100;
}



function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function resetAll(){
    num1, num2, operator = null;
    newNumber = true;
    lastPressed = null;
}