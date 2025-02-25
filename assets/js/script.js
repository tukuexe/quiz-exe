// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '7609668402:AAGWOLDkkQIAEzXqL75TjtD6vAQqaLgehM4';
const TELEGRAM_CHAT_ID = '6715819149';

const quizData = [
    {
        question: "What's my favorite color? 🤨",
        answers: { a: "Red", b: "Blue", c: "Green", d: "Black" },
        correct: "d"
    },
    {
        question: "Which is my favorite movie? 😆",
        answers: { a: "Inception", b: "Titanic", c: "Spider Man", d: "Avengers" },
        correct: "a"
    },
    {
        question: "What's my favorite food? 🤤",
        answers: { a: "Gahori mankho", b: "Maggi", c: "Porotha", d: "Momo" },
        correct: "a"
    },
    {
        question: "Where would I love to go on vacation? 🙃",
        answers: { a: "Mama Ghar", b: "Nagaon", c: "Ghorote", d: "Guwahati" },
        correct: "c"
    },
    {
        question: "What's my favorite hobby?",
        answers: { a: "pohi thoka 📚", b: "Game Khela", c: "Xua!💤", d: "Traveling" },
        correct: "b"
    },
    {
        question: "Which pet do I like most?",
        answers: { a: "Dogs", b: "Cats", c: "Goruu", d: "Birds" },
        correct: "b"
    },
    {
        question: "What's my favorite season?",
        answers: { a: "Winter", b: "Spring", c: "Summer", d: "Autumn" },
        correct: "d"
    },
    {
        question: "What kind of music do I prefer? 🎵",
        answers: { a: "Pop", b: "Classical", c: "Rock", d: "Sad" },
        correct: "d"
    },
    {
        question: "Moi Loratu Kenekua!? 🙂",
        answers: { a: "Harami+Val", b: "Dhokebaaz", c: "Ovodro", d: "Bahut Val" },
        correct: "a"
    },
    {
        question: "Dinor Kuntu Time Besi val pau?",
        answers: { a: "Morning", b: "Afternoon", c: "Evening", d: "Night" },
        correct: "d"
    }
];

function buildQuiz() {
    const quizBox = document.getElementById('quiz-box');
    const output = quizData.map((data, index) => {
        const answers = Object.keys(data.answers)
            .map(letter => `
                <label>
                    <input type="radio" name="question${index}" value="${letter}">
                    ${letter}: ${data.answers[letter]}
                </label>
            `).join('');
        
        return `
            <div class="quiz-question">
                <h2>${data.question}</h2>
                <div>${answers}</div>
            </div>
        `;
    }).join('');
    
    quizBox.innerHTML = output;
}

function showResults() {
    const answerContainers = document.querySelectorAll('.quiz-question');
    let message = "Quiz Results:\n";

    quizData.forEach((data, index) => {
        const answerContainer = answerContainers[index];
        const selector = `input[name=question${index}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        const labels = answerContainer.querySelectorAll('label');
        labels.forEach(label => {
            const input = label.querySelector('input');
            if (input.value === data.correct) {
                label.classList.add('correct');
            } else if (input.checked) {
                label.classList.add('incorrect');
            }
        });

        message += `Q${index + 1}: ${data.question}\n`;
        message += `Selected: ${userAnswer ? userAnswer : 'No Answer'}\n`;
        message += `Correct: ${data.correct}\n\n`;
    });

    sendToTelegram(message);
}

function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
    }).then(response => {
        console.log('Thanks For the Answers👌');
    });
}

// Initialize the quiz
buildQuiz();
