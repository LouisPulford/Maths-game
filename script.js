let correctAnswer = null;
let score = 0;
let questionAnswered = false;
let rng = null; // global persistent PRNG
let lastSeed = "";
let lastUseTime = false;

function getRandom(min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function generateQuestion() {
  const min = parseInt(document.getElementById("min").value);
  const max = parseInt(document.getElementById("max").value);
  const seedInput = document.getElementById("seed").value.trim();
  const useTime = document.getElementById("randomizeTime").checked;

  const operators = [];
  if (document.getElementById("add").checked) operators.push("+");
  if (document.getElementById("subtract").checked) operators.push("-");
  if (document.getElementById("multiply").checked) operators.push("*");
  if (document.getElementById("divide").checked) operators.push("/");

  if (operators.length === 0) {
    document.getElementById("question").innerText = "Please select at least one operator.";
    return;
  }

  // Only reinitialize RNG if seed or time option changed
  if (seedInput + useTime !== lastSeed + lastUseTime || rng === null) {
    const seed = seedInput + (useTime ? Date.now().toString() : "");
    rng = seedInput ? new Math.seedrandom(seed) : new Math.seedrandom();
    lastSeed = seedInput;
    lastUseTime = useTime;
  }

  const num1 = getRandom(min, max);
  const num2 = getRandom(min, max) || 1;
  const operator = operators[getRandom(0, operators.length - 1)];

  let questionText = `${num1} ${operator} ${num2}`;
  switch (operator) {
    case "+": correctAnswer = num1 + num2; break;
    case "-": correctAnswer = num1 - num2; break;
    case "*": correctAnswer = num1 * num2; break;
    case "/": correctAnswer = parseFloat((num1 / num2).toFixed(2)); break;
  }

  document.getElementById("question").innerText = questionText;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  questionAnswered = false;
}

function checkAnswer() {
  const userInput = document.getElementById("answer").value.trim();
  const userAnswer = parseFloat(userInput);

  if (questionAnswered || correctAnswer === null) {
    document.getElementById("feedback").innerText = "Please generate a new question.";
    return;
  }

  const feedback = document.getElementById("feedback");

  if (Math.abs(userAnswer - correctAnswer) < 0.01) {
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.innerText = `Incorrect. The correct answer was ${correctAnswer}`;
    feedback.style.color = "red";
  }

  document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
  questionAnswered = true;
}

