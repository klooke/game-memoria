const game = {
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

function formatSecondsToTime(seconds) {
  seconds %= 3600;

  var min = parseInt(seconds / 60);
  var seg = seconds % 60;

  min = String(min).padStart(2, "0");
  seg = String(seg).padStart(2, "0");

  return `${min}:${seg}`;
}

function updateTime() {
  game.time.value++;

  game.time.view.textContent = formatSecondsToTime(game.time.value);

  if (game.time.value >= game.timeMax.value) clearInterval(game.time.id);
}

function startTime() {
  game.timeMax.view.textContent = formatSecondsToTime(game.timeMax.value);
  game.time.id = setInterval(updateTime, 1000);
}

function updateBestTime() {
  if (game.bestTime.value > game.time.value) return;

  game.bestTime.value = game.time.value;
  game.bestTime.view.textContent = formatSecondsToTime(game.bestTime.value);
}

function shuffle(array) {
  var newArray = [];
  var length = array.length;

  for (var i = 0; i < length; i++) {
    var randIndex = Math.floor(Math.random() * array.length);

    newArray.push(array.splice(randIndex, 1)[0]);
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
  } else game.flipCards = [];
}

function onCardClick(event) {
  var elCard = event.target;

  if (game.flipCards.length > 1 || elCard.classList.contains("flip")) return;

  elCard.classList.add("flip");

  game.flipCards.push(elCard);

  checkMatch();
}

window.addEventListener("DOMContentLoaded", () => {
  var cards = shuffle(game.cards);

  for (var card of cards) {
    var elCard = document.createElement("div");
    elCard.className = "card";
    elCard.textContent = card;

    elCard.onclick = onCardClick;

    game.field.view.appendChild(elCard);
  }

  startTime();
});
