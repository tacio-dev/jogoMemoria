const emojis = [
  "🐬",
  "🐁",
  "🛸",
  "🎒",
  "💛",
  "👽",
  "👍",
  "🤖",
  "🪐",
  "🌎",
  "🐬",
  "🐁",
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
let ajudaUsada = false;
let gameOver = false;

const board = document.querySelector(".board");

// embaralhar
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

// criar cartas
for (let i = 0; i < emojis.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  box.innerHTML = shuffleEmojis[i];
  box.onclick = handleClick;
  board.appendChild(box);
}

// clique nas cartas
function handleClick() {
  if (gameOver) return;

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
    ledEl.classList.add("right");

    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");

    // vitória
    if (document.querySelectorAll(".boxMatch").length === emojis.length) {
      vitoria();
      return;
    }

    setTimeout(() => {
      ledEl.classList.remove("right");
    }, 500);
  } else {
    ledEl.classList.add("wrong");

    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");

    setTimeout(() => {
      ledEl.classList.remove("wrong");
    }, 500);
  }

  openCards = [];
}

function vitoria() {
  gameOver = true;

  clearInterval(intervalo);

  const ledEl = document.querySelector(".led");
  ledEl.classList.add("right");

  const visorEl = document.querySelector(".visor");
  const tituloEl = document.getElementById("titulo");
  const timerEl = document.getElementById("timer");

  visorEl.classList.remove("warning");
  visorEl.classList.add("victory");

  tituloEl.textContent = "SUCESSO!";

  timerEl.innerHTML = `
    <div class="line1">Improvável</div>
    <div class="line2">Você encontrou a resposta</div>
    <div class="line3">da vida, o universo e tudo mais.</div>
    <div class="line4">(Os filósofos não ficarão felizes.)</div>
  `;

  document.querySelectorAll(".item").forEach((card) => {
    card.onclick = null;
  });

  openCards = [];
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
  gameOver = true;
  clearInterval(intervalo);

  const ledEl = document.querySelector(".led");
  ledEl.classList.add("wrong");

  const visorEl = document.querySelector(".visor");
  const tituloEl = document.getElementById("titulo");
  const timerEl = document.getElementById("timer");

  visorEl.classList.add("game-over");

  tituloEl.textContent = "Tempo esgotado!";
  timerEl.innerHTML = `
    <div class="line1">Lamentável</div>
    <div class="line2">Mas não entre em pânico!</div>
    <div class="line3">(Na verdade, entre um pouco, a Terra está prestes a ser demolida.)</div>
  `;

  const cards = document.querySelectorAll(".item");

  cards.forEach((card) => {
    card.onclick = null;
  });

  cards.forEach((card) => {
    card.classList.add("boxOpen", "game-over");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.innerHTML = "❌";
    });
  }, 1000);

  openCards = [];
}
window.testVictory = vitoria;
window.testGameOver = fimDeJogo;
