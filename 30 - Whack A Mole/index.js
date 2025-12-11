const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownDisplay = document.querySelector('.countdown');

let lastHole;
let timeUp = false;
let score = 0;
let GAMETIME = 30000;
let countdownInterval;
let gameTimeout;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    let holeIdx = Math.floor(Math.random() * holes.length);
    let hole = holes[holeIdx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function molePop() {
    let popTime = randomTime(300, 800);
    let popHole = randomHole(holes);

    popHole.classList.add('up');
    setTimeout(() => {
        popHole.classList.remove('up');
        if (!timeUp) molePop();
    }, popTime);
}

function updateCountdownDisplay(time) {
    countdownDisplay.textContent = time;
}

function startCountdown() {
    clearInterval(countdownInterval);
    countdownDisplay.classList.remove('flash');

    let remaining = GAMETIME / 1000;
    updateCountdownDisplay(remaining);

    countdownInterval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
            updateCountdownDisplay(0);
            countdownDisplay.classList.add('flash');
            clearInterval(countdownInterval);
        } else {
            updateCountdownDisplay(remaining);
        }
    }, 1000);
}

function startGame() {
    score = 0;
    scoreBoard.textContent = score;

    clearTimeout(gameTimeout);
    clearInterval(countdownInterval);

    timeUp = false;
    startCountdown();
    molePop();
    gameTimeout = setTimeout(() => {
        timeUp = true;
        countdownDisplay.classList.add('flash');
    }, GAMETIME);
}

function hitMole(e) {
    if (!e.isTrusted) return;

    this.parentNode.classList.remove('up');
    score++;
    scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', hitMole));
