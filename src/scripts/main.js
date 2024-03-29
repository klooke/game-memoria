const game = {
  audios: {
    click: new Audio("./res/audio/click.mp3"),
    sucess: new Audio("./res/audio/sucess.mp3"),
    fail: new Audio("./res/audio/fail.mp3"),
  },
  cards: [
    "🙂",
    "🙂",
    "🤡",
    "🤡",
    "👺",
    "👺",
    "💀",
    "💀",
    "👻",
    "👻",
    "👽",
    "👽",
    "👾",
    "👾",
    "🤖",
    "🤖",
    "🐱",
    "🐱",
    "🦁",
    "🦁",
  ],
  flipCards: [],
  matchCount: 0,
  time: {
    view: document.querySelector("#time"),
    id: null,
    value: 0,
  },
  timeMax: {
    view: document.querySelector("#time-max"),
    value: 180, // in seconds
  },
  bestTime: {
    view: document.querySelector("#best-time"),
    value: 0,
  },
  field: {
    view: document.querySelector("#field"),
  },
};

function playAudio(audio) {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
}

function formatSecondsToTime(seconds) {
  seconds %= 3600;

  var min = parseInt(seconds / 60);
  var seg = seconds % 60;

  min = String(min).padStart(2, "0");
  seg = String(seg).padStart(2, "0");

  return `${min}:${seg}`;
}

function startTime() {
  game.time.value = 0;
  game.timeMax.view.textContent = formatSecondsToTime(game.timeMax.value);
  game.time.id = setInterval(updateTime, 1000);
}
function updateTime() {
  game.time.value++;
  game.time.view.textContent = formatSecondsToTime(game.time.value);
  
  checkTimeIsOver();
}

function stopTime() {
  clearInterval(game.time.id);
}

function updateBestTime() {
  if (
    game.time.value > 0 &&
    (game.bestTime.value <= 0 || game.bestTime.value > game.time.value)
  ) {
    game.bestTime.value = game.time.value;
    game.bestTime.view.textContent = formatSecondsToTime(game.bestTime.value);
  }
}

function shuffle(array) {
  var newArray = [];
  var tempArray = Array.from(array);
  var length = tempArray.length;

  for (var i = 0; i < length; i++) {
    var randIndex = Math.floor(Math.random() * tempArray.length);

    newArray.push(tempArray.splice(randIndex, 1)[0]);
  }

  return newArray;
}

function checkMatch() {
  if (game.flipCards.length < 2) return;

  if (game.flipCards[0].textContent !== game.flipCards[1].textContent) {
    var id = setTimeout(() => {
      game.flipCards[0].classList.remove("flip");
      game.flipCards[1].classList.remove("flip");
      game.flipCards = [];

      clearTimeout(id);
    }, 500);

    return;
  }

  game.matchCount++;
  game.flipCards = [];

  checkWin();
}

function checkWin() {
  if (game.matchCount < game.cards.length / 2) return;

  game.matchCount = 0;

  updateBestTime();

  playAudio(game.audios.sucess);

  resetGame();
}

function checkTimeIsOver() {
  if (game.time.value < game.timeMax.value) return;

  game.matchCount = 0;

  playAudio(game.audios.fail);

  resetGame();
}

function resetGame() {
  stopTime();

  var id = setTimeout(() => {
    loadCards();
    startTime();

    clearTimeout(id);
  }, 5000);
}

function onCardClick(event) {
  var elCard = event.target;

  if (game.flipCards.length > 1 || elCard.classList.contains("flip")) return;

  elCard.classList.add("flip");

  game.flipCards.push(elCard);

  playAudio(game.audios.click);

  checkMatch();
}

function loadCards() {
  if (game.field.view.childElementCount > 0) game.field.view.innerHTML = "";

  var cards = shuffle(game.cards);

  for (var card of cards) {
    var elCard = document.createElement("div");
    elCard.className = "card";
    elCard.textContent = card;
    elCard.onclick = onCardClick;

    game.field.view.appendChild(elCard);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadCards();
  startTime();
});
