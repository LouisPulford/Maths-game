// Variables to store the correct answer for checking
let correctAnswer = null;

// Function to generate a random number in range with optional seeded PRNG
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random question based on selected settings
function generateQuestion() {
  // Get input values
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const seed = document.getElementById("seed").value;

  // If seed is entered, use it to initialise PRNG
  if (seed) {
    Math.random = new Math.seedrandom(seed);
  } else {
    Math.random = Math.seedrandom(); // Reset to unseeded random
  }

  // Get selected operators
  const operators = [];
  if (document.getElementById("add").checked) operators.push("+");
  if (document.getElementById("subtract").checked) operators.push("-");
  if (document.getElementById("multiply").checked) operators.push("*");
  if (document.getElementById("divide").checked) operators.push("/");

  // Make sure at least one operator is selected
  if (operators.length === 0) {
    alert("Please select at least one operator.");
    return;
  }

  // Generate two random numbers and an operator
  const num1 = getRandom(min, max);
  const num2 = getRandom(min, max);
  const operator = operators[getRandom(0, operators.length - 1)];

  let questionText = `${num1} ${operator} ${num2}`;
  let answer = 0;

  // Compute correct answer based on operator
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = parseFloat((num1 / num2).toFixed(2)); // Round to 2 decimals
      break;
  }

  // Display question and store answer
  document.getElementById("question").innerText = questionText;
  correctAnswer = answer;
  document.getElementById("feedback").innerText = "";
  document.getElementById("answer").value = "";
}

// Function to check user's answer
function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (isNaN(userAnswer)) {
    feedback.innerText = "Please enter a valid number.";
    feedback.style.color = "orange";
    return;
  }

  // Compare user input to correct answer
  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
  } else {
    feedback.innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    feedback.style.color = "red";
  }
}


