'use strict';
//find the accese to manipualte all
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//decalaration of variable.

let scores, currentScore, activePlayer, playing;

//function initialization.
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//init function call.
init();

//switch player function .
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

//rolling dice functionality;
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generating random number on dice;
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display dice on page;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //condition to switch;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch the next player
      switchPlayer();
    }
  }
});

//hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player,s score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if player is >=30
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      //finsh the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      //switch the next player
      switchPlayer();
    }
  }
});

//new game handler.
btnNew.addEventListener('click', init);
