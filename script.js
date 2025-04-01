function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);

    let operators = [];
    if (document.getElementById('add').checked) operators.push('+');
    if (document.getElementById('subtract').checked) operators.push('-');
    if (document.getElementById('multiply').checked) operators.push('×');
    if (document.getElementById('divide').checked) operators.push('÷');

    if (operators.length === 0) {
        alert('Please select at least one operator.');
        return;
    }

    const num1 = getRandomNumber(min, max);
    const num2 = getRandomNumber(min, max);
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question = `${num1} ${operator} ${num2}`;
    document.getElementById('question').innerText = question;
    document.getElementById('answer').value = '';
    document.getElementById('result').innerText = '';
}

function checkAnswer() {
    const question = document.getElementById('question').innerText;
    const userAnswer = parseFloat(document.getElementById('answer').value);

    if (!question.includes(' ')) {
        alert('Please generate a question first!');
        return;
    }

    const [num1, operator, num2] = question.split(' ');
    let correctAnswer;

    switch (operator) {
        case '+': correctAnswer = parseFloat(num1) + parseFloat(num2); break;
        case '-': correctAnswer = parseFloat(num1) - parseFloat(num2); break;
        case '×': correctAnswer = parseFloat(num1) * parseFloat(num2); break;
        case '÷': correctAnswer = parseFloat(num1) / parseFloat(num2); break;
    }

    if (userAnswer === correctAnswer) {
        document.getElementById('result').innerText = '✅ Correct!';
    } else {
        document.getElementById('result').innerText = `❌ Wrong! Correct answer: ${correctAnswer}`;
    }
}
