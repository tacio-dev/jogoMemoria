const emojis = [
  "🐬",
  "🌌",
  "🛸",
  "🎒",
  "💛",
  "👽",
  "👍",
  "🤖",
  "🪐",
  "🌎",
  "🐬",
  "🌌",
  "🛸",
  "🎒",
  "💛",
  "👽",
  "👍",
  "🤖",
  "🪐",
  "🌎",
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
  const ledEl = document.querySelector(".led");

  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    ledEl.classList.add("wrong");
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");

    setTimeout(() => {
      ledEl.classList.remove("wrong");
    }, 800);
  }

  openCards = [];

  // vitória
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    clearInterval(intervalo);
    alert("Você venceu!");
  }
}

// função timer
function iniciarTimer() {
  const timerEl = document.getElementById("timer");
  const visorEl = document.querySelector(".visor");

  timerEl.textContent = String(timer).padStart(2, "0");

  intervalo = setInterval(() => {
    timer--;

    timerEl.textContent = String(timer).padStart(2, "0");

    if (timer <= 10) {
      visorEl.classList.add("warning");
    }

    if (timer === 0) {
      clearInterval(intervalo);

      requestAnimationFrame(() => {
        setTimeout(fimDeJogo, 50);
      });
    }
  }, 1000);
}

// função fim de jogo
function fimDeJogo() {
  alert("Tempo esgotado!");

  document.querySelectorAll(".item").forEach((card) => {
    card.onclick = null;
  });
  document.querySelectorAll(".reset");
}
