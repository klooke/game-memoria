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
  field: {
    view: document.querySelector("#field"),
  },
};

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
  for (var card of game.cards) {
    var elCard = document.createElement("div");
    elCard.className = "card";
    elCard.textContent = card;

    elCard.onclick = onCardClick;

    game.field.view.appendChild(elCard);
  }
});
