// Variables
const wrapperElement = document.querySelector('.wrapper');
const containerElement = document.querySelector('.container');
const startBtnEasyElement = document.querySelector('#start-btn-easy');
const startBtnMediumElement = document.querySelector('#start-btn-medium');
const startBtnHardElement = document.querySelector('#start-btn-hard');

const headlineBlockElement = document.querySelector('.headline');
const gameBlockElement = document.querySelector('.game');

const instructionsElement = document.querySelector('#instructions');

const gameContainerElement = document.querySelector('.game-container');

class AudioController {
  constructor() {
    this.bgMusic = new Audio('../assets/games/rask-vienoda/audio/tic-tac.mp3');
    this.flipSound = new Audio('../assets/games/rask-vienoda/audio/flip.wav');
    this.matchSound = new Audio('../assets/games/rask-vienoda/audio/match.wav');
    this.victorySound = new Audio(
      '../assets/games/rask-vienoda/audio/victory.wav'
    );
    this.gameOverSound = new Audio(
      '../assets/games/rask-vienoda/audio/gameOver.wav'
    );
    this.bgMusic.volume = 0.5;
    this.bgMusic.loop = true;
  }
  startMusic() {
    this.bgMusic.play();
  }
  stopMusic() {
    this.bgMusic.pause();
    this.bgMusic.currentTime = 0;
  }
  flip() {
    this.flipSound.play();
  }
  match() {
    this.matchSound.play();
  }
  victory() {
    this.stopMusic();
    this.victorySound.play();
  }
  gameOver() {
    this.stopMusic();
    this.gameOverSound.play();
  }
}

class MixOrMatch {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
    this.result = document.getElementById('result');
    this.gameResultsContainer = document.querySelector(
      '.game-results-container'
    );
    this.audioController = new AudioController();
    this.gameStoped = false;
  }

  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    this.gameStoped = false;
    setTimeout(() => {
      this.audioController.startMusic();
      this.shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }
  startCountdown() {
    return setInterval(() => {
      this.timeRemaining--;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }
  gameOver() {
    clearInterval(this.countdown);
    this.audioController.gameOver();
    this.gameResultsContainer.classList.remove('hide');
    this.result.innerText = `📖 Deja, nelaimėjote. Reiktų pasitempti...`;
    this.gameStoped = true;
  }
  victory() {
    clearInterval(this.countdown);
    this.audioController.victory();
    this.gameResultsContainer.classList.remove('hide');
    this.result.innerText = `🏆 Sveikiname, laimėjote!`;
    this.gameStoped = true;
  }
  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    });
  }
  flipCard(card) {
    if (!this.gameStoped && this.canFlipCard(card)) {
      this.audioController.flip();
      this.totalClicks++;
      this.ticker.innerText = this.totalClicks;
      card.classList.add('visible');

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }
  checkForCardMatch(card) {
    if (this.getCardType(card) === this.getCardType(this.cardToCheck))
      this.cardMatch(card, this.cardToCheck);
    else this.cardMismatch(card, this.cardToCheck);

    this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    this.audioController.match();
    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }
  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
    }, 1000);
  }
  shuffleCards(cardsArray) {
    // Fisher-Yates Shuffle Algorithm.
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }
  getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src;
  }
  canFlipCard(card) {
    return (
      !this.busy &&
      !this.matchedCards.includes(card) &&
      card !== this.cardToCheck
    );
  }
}

const generateCards = (data, location) => {
  gameContainerElement.classList.remove('hide');

  headlineBlockElement.style.height = '15%';
  gameBlockElement.style.height = '85%';

  data.forEach((x) => {
    console.log(x);
    const card = document.createElement('div');
    const cardBack = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBackImg = document.createElement('img');
    const cardFrontImg = document.createElement('img');
    const cardFrontText = document.createElement('p');

    card.classList.add('card');

    cardBack.classList.add('card-back', 'card-face');
    cardFront.classList.add('card-front', 'card-face');

    cardBackImg.classList.add('logo');
    cardFrontImg.classList.add('card-value');

    cardBackImg.src = x.back;
    cardFrontImg.src = x.front;
    cardFrontText.innerText = x.text;

    cardBack.appendChild(cardBackImg);
    cardFront.append(cardFrontImg, cardFrontText);

    card.append(cardBack, cardFront);

    location.appendChild(card);
  });
};

// Events
document.addEventListener('DOMContentLoaded', async () => {
  let data = await (await fetch('../data/rask-vienoda.json')).json();

  let easyData = data.slice(0, 10);
  let mediumData = data.slice(0, 20);
  let hardData = data.slice(0, 30);

  startBtnEasyElement.addEventListener('click', () => {
    startBtnEasyElement.classList.add('hide');
    startBtnMediumElement.classList.add('hide');
    startBtnHardElement.classList.add('hide');
    instructionsElement.classList.add('hide');
    containerElement.style.backgroundImage = 'url("")';

    gameContainerElement.classList.add('easy');

    generateCards(easyData, gameContainerElement);

    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(50, cards);
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        game.flipCard(card);
      });
    });

    game.startGame();
  });

  startBtnMediumElement.addEventListener('click', () => {
    startBtnEasyElement.classList.add('hide');
    startBtnMediumElement.classList.add('hide');
    startBtnHardElement.classList.add('hide');
    instructionsElement.classList.add('hide');
    containerElement.style.backgroundImage = 'url("")';

    gameContainerElement.classList.add('medium');

    generateCards(mediumData, gameContainerElement);

    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        game.flipCard(card);
      });
    });

    game.startGame();
  });

  startBtnHardElement.addEventListener('click', () => {
    startBtnEasyElement.classList.add('hide');
    startBtnMediumElement.classList.add('hide');
    startBtnHardElement.classList.add('hide');
    instructionsElement.classList.add('hide');
    containerElement.style.backgroundImage = 'url("")';

    gameContainerElement.classList.add('hard');

    generateCards(hardData, gameContainerElement);

    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(150, cards);
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        game.flipCard(card);
      });
    });

    game.startGame();
  });
});
