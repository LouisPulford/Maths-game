let score = 0;
let correctAnswer = null;
let questionAnswered = false;

function getRandom(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function generateQuestion() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const seedInput = document.getElementById("seed").value.trim();

  const rng = seedInput
    ? new Math.seedrandom(seedInput + Date.now())
    : new Math.seedrandom();

  const operators = [];
  if (document.getElementById("add").checked) operators.push("+");
  if (document.getElementById("subtract").checked) operators.push("-");
  if (document.getElementById("multiply").checked) operators.push("*");
  if (document.getElementById("divide").checked) operators.push("/");

  if (operators.length === 0) {
    alert("Please select at least one operator.");
    return;
  }

  const num1 = getRandom(rng, min, max);
  const num2 = getRandom(rng, min, max) || 1; // prevent divide by zero
  const operator = operators[getRandom(rng, 0, operators.length - 1)];

  let questionText = `${num1} ${operator} ${num2}`;
  let answer = 0;

  switch (operator) {
    case "+": answer = num1 + num2; break;
    case "-": answer = num1 - num2; break;
    case "*": answer = num1 * num2; break;
    case "/": answer = parseFloat((num1 / num2).toFixed(2)); break;
  }

  document.getElementById("question").innerText = questionText;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";

  correctAnswer = answer;
  questionAnswered = false;
}

function checkAnswer() {
  if (questionAnswered || correctAnswer === null) return;

  const userAnswer = parseFloat(document.getElementById("answer").value);
  const feedback = document.getElementById("feedback");

  if (isNaN(userAnswer)) {
    feedback.innerText = "Please enter a valid number.";
    feedback.style.color = "orange";
    return;
  }

  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.innerText = `Incorrect. The correct answer was ${correctAnswer}.`;
    feedback.style.color = "red";
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
  questionAnswered = true;
  correctAnswer = null;
}
