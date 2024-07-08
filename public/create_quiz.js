import { ref, set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { database } from "./fb.js";

let questionCount = 0;

function addQuestion() {
    const questionsDiv = document.getElementById('questions');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.id = `question-${questionCount}`;

    questionDiv.innerHTML = `
        <label>Question:</label>
        <input type="text" id="question-text-${questionCount}" placeholder="Enter question text">
        <div class="option">
            <input type="text" id="option-text-${questionCount}-0" placeholder="Option 1">
            <input type="radio" name="correct-option-${questionCount}" value="0">
        </div>
        <div class="option">
            <input type="text" id="option-text-${questionCount}-1" placeholder="Option 2">
            <input type="radio" name="correct-option-${questionCount}" value="1">
        </div>
        <div class="option">
            <input type="text" id="option-text-${questionCount}-2" placeholder="Option 3">
            <input type="radio" name="correct-option-${questionCount}" value="2">
        </div>
        <div class="option">
            <input type="text" id="option-text-${questionCount}-3" placeholder="Option 4">
            <input type="radio" name="correct-option-${questionCount}" value="3">
        </div>
    `;

    questionsDiv.appendChild(questionDiv);
    questionCount++;
}

function saveQuiz() {
    const quizTitle = document.getElementById('quizTitle').value;
    const quizDate = document.getElementById('quizDate').value;

    const questions = [];

    for (let i = 0; i < questionCount; i++) {
        const questionText = document.getElementById(`question-text-${i}`).value;
        const options = [];

        for (let j = 0; j < 4; j++) {
            const optionText = document.getElementById(`option-text-${i}-${j}`).value;
            const isCorrect = document.querySelector(`input[name="correct-option-${i}"]:checked`).value == j;

            options.push({ text: optionText, correct: isCorrect });
        }

        questions.push({ text: questionText, options: options });
    }

    const quizId = `quiz-${Date.now()}`;
    set(ref(database, `quizzes/${quizId}`), {
        title: quizTitle,
        date: quizDate,
        questions: questions
    }).then(() => {
        const quizUrl = `${window.location.origin}/quiz.html?id=${quizId}`;
        document.getElementById('quizSavedMsg').innerText = "Quiz saved successfully!";
        document.getElementById('quizUrl').innerText = quizUrl;
        document.getElementById('quizUrl').href = quizUrl;
    }).catch((error) => {
        console.error("Error saving quiz:", error);
    });
}

export { addQuestion, saveQuiz };
