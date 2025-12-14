const displayButtons = [...document.querySelectorAll(".button-display")];
const dotButton = document.querySelector(".button-dot");
const clearButton = document.querySelector(".button-clear");
const equalsButton = document.querySelector(".button-equals");
const copyButton = document.querySelector(".button-copy");
const backButton = document.querySelector(".button-backspace");

const displayContents = document.querySelector("#display-numbers");

const operatorsRegex = /([+\-x÷])/;
const operatorsRegexNoCap = /[+\-x÷]/;
const operators = ["+", "-", "x", "÷"];
let isResult = false;

displayContents.textContent = "";

displayButtons.forEach((button) => {
  button.addEventListener("click", () => handleDisplayButtonClick(button.textContent));
});

clearButton.addEventListener("click", () => {
  displayContents.textContent = "";
  dotButton.disabled = displayContents.textContent.includes(".");
});

equalsButton.addEventListener("click", () => {
  handleCalculation(equalsButton.textContent);
  dotButton.disabled = displayContents.textContent.includes(".");
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(displayContents.textContent).then();
})

backButton.addEventListener("click", () => {
  displayContents.textContent = displayContents.textContent.slice(0, displayContents.textContent.length - 1);
  dotButton.disabled = displayContents.textContent.includes(".");
})

function add(a, b) {
  return Math.round((a + b) * 100) / 100;
}

function subtract(a, b) {
  return Math.round((a - b) * 100) / 100;
}

function multiply(a, b) {
  return Math.round((a * b) * 100) / 100;
}

function divide(a, b) {
  return Math.round((a / b) * 100) / 100;
}

function operate(firstNum, secondNum, operator) {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return subtract(firstNum, secondNum);
    case "x":
      return multiply(firstNum, secondNum);
    case  "÷":
      if (secondNum === 0) {
        alert("Can't divide by zero!");
        displayContents.textContent = "";
      } else {
        return divide(firstNum, secondNum);
      }
  }
}

function handleDisplayButtonClick(input) {
  dotButton.disabled = displayContents.textContent.includes(".");

  if (isResult === true) {
    displayContents.textContent = "";
    isResult = false;
  } else if (operators.includes(input)) {
    const numOperators = (displayContents.textContent.match(operatorsRegexNoCap) || []).length;

    if (operators.includes(displayContents.textContent.at(-1))) {
      displayContents.textContent = displayContents.textContent.replace(/.$/, input);
      return;
    }

    if (numOperators === 1) {
      handleCalculation(input);
    }
  }
  displayContents.textContent += input;
  dotButton.disabled = displayContents.textContent.includes(".");
}

function handleCalculation(buttonClicked) {
  const calcArr = displayContents.textContent.split(operatorsRegex);

  if (calcArr.length === 3 && calcArr.at(-1) !== "") {
    displayContents.textContent = operate(
      parseFloat(calcArr[0]),
      parseFloat(calcArr[2]),
      calcArr[1]
    );

    if (buttonClicked === "=") {
      isResult = true;
    }
  }
}
