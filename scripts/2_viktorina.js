// Variables
const wrapperElement = document.querySelector('.wrapper');
const headlineBlockElement = document.querySelector(
  '.wrapper .container .headline'
);
const quizBlockElement = document.querySelector('.wrapper .container .quiz');
const instructionsElement = document.querySelector('#instructions');
const quizQuestionBlockElement = document.querySelector('.quiz__question');
const quizQuestionElement = document.querySelector('#question');
const answersBtnsElement = document.querySelector('#answers-btns');
const startBtnElement = document.querySelector('#start-btn');
const nextBtnElement = document.querySelector('#next-btn');
const quizResultElement = document.querySelector('#quiz-result');

let questions = [];
let index;
let score = 0;

// Functions
// -- starting quiz (after pressing "START QUIZ" button)
const startQuiz = () => {
  startBtnElement.classList.add('hide');
  quizQuestionBlockElement.classList.remove('hide');

  instructionsElement.innerText = `${index + 1} / ${questions.length}`;

  headlineBlockElement.style.height = innerWidth > 768 ? '40%' : '20%';
  quizBlockElement.style.height = innerWidth > 768 ? '60%' : '70%';

  if (!quizResultElement.classList.contains('hide')) {
    quizResultElement.classList.add('hide');
    score = 0;
  }

  index = 0;

  setNextQuestion();
};

// -- reseting "NEXT QUESTION" button and setting new question
const setNextQuestion = () => {
  resetState();
  showQuestion(questions[index]);
};

// -- selecting answer (by clicking on it's button)
const selectAnswer = (e) => {
  const selectedBtn = e.target;

  const correct = selectedBtn.dataset.correct ? true : false;

  if (correct) {
    selectedBtn.classList.add('btn-correct');
    selectedBtn.innerHTML += ` <i class="fa-solid fa-check"></i>`;
    score++;
  } else {
    selectedBtn.classList.add('btn-wrong');
    selectedBtn.innerHTML += ` <i class="fa-solid fa-xmark"></i>`;
  }

  Array.from(answersBtnsElement.children).forEach((x) => {
    x.disabled = true;

    if (x.dataset.correct && !correct) {
      x.classList.add('btn-correct');
      x.innerHTML += ` <i class="fa-solid fa-check"></i>`;
    }
  });

  if (questions.length > index + 1) {
    nextBtnElement.classList.remove('hide');
  } else {
    startBtnElement.innerText = 'Kartoti';
    startBtnElement.classList.remove('hide');

    const result =
      score === questions.length
        ? `🏆 Sveikiname, teisingi atsakymai: ${score} iš ${questions.length}`
        : `📖 Dar reiktų pasitempti, teisingi atsakymai: ${score} iš ${questions.length}`;

    quizResultElement.innerText = result;
    quizResultElement.classList.remove('hide');
  }
};

// -- showing question and answers from question array
const showQuestion = (questionObject) => {
  instructionsElement.innerText = `${index + 1} / ${questions.length}`;

  const { question, answers } = questionObject;

  // -- setting question text
  quizQuestionElement.innerText = question;

  // -- setting answers buttons
  answers.forEach((answer) => {
    const button = document.createElement('button');

    button.innerText = answer.text;
    button.classList.add('btn', 'btn-answer');

    if (answer.correct) button.dataset.correct = answer.correct;

    button.addEventListener('click', selectAnswer);

    answersBtnsElement.appendChild(button);
  });
};

// -- showing next question (after pressing cutton)
const showNextQuestion = () => {
  index++;
  setNextQuestion();
};

// -- reseting "NEXT QUESTION" button and answers button
const resetState = () => {
  nextBtnElement.classList.add('hide');

  while (answersBtnsElement.firstChild) {
    answersBtnsElement.removeChild(answersBtnsElement.firstChild);
  }
};
// Events
document.addEventListener('DOMContentLoaded', async () => {
  wrapperElement.style.backgroundColor = `var(--extra-1-color)`;

  const data = await (await fetch('../data/viktorina.json')).json();

  questions = data.sort(() => Math.random() - 0.5).slice(0, 15);
});
startBtnElement.addEventListener('click', startQuiz);
nextBtnElement.addEventListener('click', showNextQuestion);
