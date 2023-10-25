// Variables
const wrapperElement = document.querySelector('.wrapper');
const startBtnElement = document.querySelector('#start-btn');

// Functions
const startQuiz = () => {
  startBtnElement.classList.add('hide');
};

// Events
document.addEventListener('DOMContentLoaded', async () => {
  wrapperElement.style.backgroundColor = `var(--html-color)`;
});

startBtnElement.addEventListener('click', startQuiz);
