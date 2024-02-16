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


function onCardClick(event) {
  var elCard = event.target;

  elCard.classList.add("flip");

  game.flipCards.push(elCard);
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
