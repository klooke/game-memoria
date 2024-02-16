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
  field: {
    view: document.querySelector("#field"),
  },
};


window.addEventListener("DOMContentLoaded", () => {
  for (var card of game.cards) {
    var elCard = document.createElement("div");
    elCard.className = "card";
    elCard.textContent = card;

    game.field.view.appendChild(elCard);
  }
});
