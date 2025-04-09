let score = 0;
let correctAnswer = null;
let questionAnswered = false;

function getRandom(min, max, rng) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function generateQuestion() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const seedInput = document.getElementById("seed").value.trim();

  // Seed the random number generator
  const rng = seedInput ? new Math.seedrandom(seedInput + Date.now()) : new Math.seedrandom();

  const ops = [];
  if (document.getElementById("add").checked) ops.push("+");
  if (document.getElementById("subtract").checked) ops.push("-");
  if (document.getElementById("multiply").checked) ops.push("*");
  if (document.getElementById("divide").checked) ops.push("/");

  if (ops.length === 0) {
    alert("Please select at least one operator.");
    return;
  }

  const num1 = getRandom(min, max, rng);
  const num2 = getRandom(min, max, rng) || 1;
  const operator = ops[getRandom(0, ops.length - 1, rng)];

  let question = `${num1} ${operator} ${num2}`;
  let answer;

  switch (operator) {
    case "+": answer = num1 + num2; break;
    case "-": answer = num1 - num2; break;
    case "*": answer = num1 * num2; break;
    case "/": answer = parseFloat((num1 / num2).toFixed(2)); break;
  }

  document.getElementById("question").innerText = question;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";

  correctAnswer = answer;
  questionAnswered = false;
}

function checkAnswer() {
  const feedback = document.getElementById("feedback");

  if (questionAnswered || correctAnswer === null) {
    feedback.innerText = "Please generate a new question.";
    feedback.style.color = "orange";
    return;
  }

  const userInput = document.getElementById("answer").value;
  const userAnswer = parseFloat(userInput);

  if (isNaN(userAnswer)) {
    feedback.innerText = "Please enter a valid number.";
    feedback.style.color = "red";
    return;
  }

  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    score++;
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
  } else {
    feedback.innerText = `Incorrect. The correct answer was ${correctAnswer}`;
    feedback.style.color = "red";
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
  questionAnswered = true;
}
