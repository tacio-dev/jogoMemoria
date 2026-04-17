const emojis = [
  "🍁",
  "⭐",
  "🏎️",
  "🗿",
  "😎",
  "👽",
  "☂️",
  "🧊",
  "🍋‍🟩",
  "🌚",
  "🍁",
  "⭐",
  "🏎️",
  "🗿",
  "😎",
  "👽",
  "☂️",
  "🧊",
  "🍋‍🟩",
  "🌚",
];

let timer = 42;
let intervalo;
let gameStarted = false;
let openCards = [];

const game = document.querySelector(".game");

// embaralhar
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// criar cartas
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  game.appendChild(box);
}

// clique nas cartas
function handleClick() {
  if (!gameStarted) {
    iniciarTimer();
    gameStarted = true;
  }

  if (this.classList.contains("boxOpen") || openCards.length >= 2) {
    return;
  }

  this.classList.add("boxOpen");
  openCards.push(this);

  if (openCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// checar pares
function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  // vitória
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(intervalo);
    alert("Você venceu!");
  }
}

// timer
function iniciarTimer() {
  intervalo = setInterval(() => {
    timer--;

    const timerEl = document.getElementById("timer");
    timerEl.textContent = String(timer).padStart(2, "0");

    // últimos 10 segundos
    if (timer <= 10) {
      timerEl.style.color = "red";
    }

    // fim de jogo
    if (timer <= 0) {
      timer = 0;
      clearInterval(intervalo);
      fimDeJogo();
    }
  }, 1000);
}

// fim de jogo
function fimDeJogo() {
  alert("Tempo esgotado!");

  document.querySelectorAll(".item").forEach((card) => {
    card.onclick = null;
  });
}
