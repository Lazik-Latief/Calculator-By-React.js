import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState(""); // Stores current input
  const [theme, setTheme] = useState("dark"); // Theme: dark/light

  // Append number or decimal to input
  const handleDigit = (digit) => {
    const parts = input.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];

    // Prevent multiple decimals in a number
    if (digit === "." && lastNumber.includes(".")) return;

    setInput((prev) => prev + digit);
  };

  // Add operator (+, -, *, /)
  const handleOperator = (op) => {
    if (input === "") return; // Do not start with operator

    const last = input[input.length - 1];

    // Replace last operator if consecutive
    if ("+-*/".includes(last)) {
      setInput((prev) => prev.slice(0, -1) + op);
    } else {
      setInput((prev) => prev + op);
    }
  };

  // Calculate result (handles basic precedence: * / then + -)
  const calculate = (expr) => {
    const numbers = expr.split(/[\+\-\*\/]/).map(Number);
    const operators = expr.replace(/[0-9.]/g, "").split("");

    if (numbers.length === 0) return 0;

    // Process * and /
    let i = 0;
    while (i < operators.length) {
      if (operators[i] === "*") {
        numbers[i] = numbers[i] * numbers[i + 1];
        numbers.splice(i + 1, 1);
        operators.splice(i, 1);
      } else if (operators[i] === "/") {
        numbers[i] = numbers[i] / numbers[i + 1];
        numbers.splice(i + 1, 1);
        operators.splice(i, 1);
      } else {
        i++;
      }
    }

    // Process + and -
    let result = numbers[0];
    for (let j = 0; j < operators.length; j++) {
      if (operators[j] === "+") result += numbers[j + 1];
      if (operators[j] === "-") result -= numbers[j + 1];
    }

    return result;
  };

  // Evaluate input when = is clicked
  const handleEqual = () => {
    if (input === "") return;

    const last = input[input.length - 1];
    if ("+-*/".includes(last)) {
      setInput(input.slice(0, -1)); // Remove trailing operator
      return;
    }

    try {
      const result = calculate(input);
      setInput(String(result));
    } catch {
      setInput("Error");
    }
  };

  // Clear input
  const handleClear = () => {
    setInput("");
  };

  // Delete last character
  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div className={`calculator ${theme}`}>
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="display">{input || "0"}</div>

      <div className="buttons">
        <button onClick={() => handleDigit("7")}>7</button>
        <button onClick={() => handleDigit("8")}>8</button>
        <button onClick={() => handleDigit("9")}>9</button>
        <button onClick={() => handleOperator("/")}>/</button>

        <button onClick={() => handleDigit("4")}>4</button>
        <button onClick={() => handleDigit("5")}>5</button>
        <button onClick={() => handleDigit("6")}>6</button>
        <button onClick={() => handleOperator("*")}>*</button>

        <button onClick={() => handleDigit("1")}>1</button>
        <button onClick={() => handleDigit("2")}>2</button>
        <button onClick={() => handleDigit("3")}>3</button>
        <button onClick={() => handleOperator("-")}>-</button>

        <button onClick={() => handleDigit("0")}>0</button>
        <button onClick={() => handleDigit(".")}>.</button>
        <button onClick={handleEqual}>=</button>
        <button onClick={() => handleOperator("+")}>+</button>

        <button className="clear" onClick={handleClear}>AC</button>
        <button onClick={handleDelete}>DEL</button>
      </div>
    </div>
  );
}

export default App;
