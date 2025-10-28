// Select elements
const buttons = document.querySelectorAll(".btn");
const output = document.querySelector(".output");
const history = document.querySelector(".history");

// Calculator state variables
let currentInput = "";
let previousInput = "";
let operator = null;

// Handle button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    // If it's a number or dot
    if (btn.dataset.number) {
      // Prevent multiple dots
      if (value === "." && currentInput.includes(".")) return;
      currentInput += value;
      output.innerText = currentInput;
    }

    // If it's an action
    if (btn.dataset.action) {
      handleAction(btn.dataset.action, value);
    }
  });
});

// Handle all button actions
function handleAction(action, symbol) {
  switch (action) {
    case "clear":
      clearAll();
      break;

    case "sign":
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) * -1);
        output.innerText = currentInput;
      }
      break;

    case "percent":
      if (currentInput) {
        currentInput = String(parseFloat(currentInput) / 100);
        output.innerText = currentInput;
      }
      break;

    case "divide":
    case "multiply":
    case "subtract":
    case "add":
      if (currentInput === "") return;
      if (previousInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        previousInput = result;
        output.innerText = result;
      } else {
        previousInput = currentInput;
      }
      currentInput = "";
      operator = action;
      history.innerText = previousInput + " " + symbol;
      break;

    case "equals":
      if (!operator || !previousInput || currentInput === "") return;
      const result = calculate(previousInput, currentInput, operator);
      output.innerText = result;
      history.innerText = "";
      currentInput = String(result);
      previousInput = "";
      operator = null;
      break;
  }
}

// Calculation logic
function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  switch (op) {
    case "add": return a + b;
    case "subtract": return a - b;
    case "multiply": return a * b;
    case "divide": return b !== 0 ? a / b : "Error";
    default: return b;
  }
}

// Clear all function
function clearAll() {
  currentInput = "";
  previousInput = "";
  operator = null;
  output.innerText = "0";
  history.innerText = "";
}
