// Track the user's score
let score = 0;
// Store the correct answer for current question
let correctAnswer = null;

// Generate a random number between min and max
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a new question
function generateQuestion() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const seed = document.getElementById("seed").value;

  // Set up PRNG if a seed is given
  if (seed) {
    Math.random = new Math.seedrandom(seed);
  } else {
    Math.random = Math.seedrandom(); // Use new PRNG without seed
  }

  // Build the list of selected operators
  const operators = [];
  if (document.getElementById("add").checked) operators.push("+");
  if (document.getElementById("subtract").checked) operators.push("-");
  if (document.getElementById("multiply").checked) operators.push("*");
  if (document.getElementById("divide").checked) operators.push("/");

  // Require at least one operator
  if (operators.length === 0) {
    alert("Please select at least one operator.");
    return;
  }

  // Generate two random numbers and pick an operator
  const num1 = getRandom(min, max);
  const num2 = getRandom(min, max);
  const operator = operators[getRandom(0, operators.length - 1)];

  // Create question string and compute the correct answer
  let questionText = `${num1} ${operator} ${num2}`;
  let answer = 0;

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
      answer = parseFloat((num1 / num2).toFixed(2)); // Round to 2 decimal places
      break;
  }

  // Display the question and clear previous feedback
  document.getElementById("question").innerText = questionText;
  document.getElementById("feedback").innerText = "";
  document.getElementById("answer").value = "";

  // Store the correct answer
  correctAnswer = answer;
}

// Check the user's answer
function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  // Validate the input
  if (isNaN(userAnswer)) {
    feedback.innerText = "Please enter a valid number.";
    feedback.style.color = "orange";
    return;
  }

  // Check if the user's answer is close enough (accounting for rounding)
  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
    score++; // Increase score on correct answer
  } else {
    feedback.innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    feedback.style.color = "red";
  }

  // Update the score display
  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
}



