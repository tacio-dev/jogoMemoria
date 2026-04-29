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
      clearInterval(intervalo);
      alert(
        "Sucesso! Improvável... Você encontrou a resposta para a vida, o universo e tudo mais. (Os filósofos não ficarão felizes.)",
      );
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
  const ledEl = document.querySelector(".led");
  ledEl.classList.add("wrong");
  alert(
    "Tempo esgotado! Lamentável... Mas não entre em pânico! (Na verdade, entre um pouco, a Terra está prestes a ser demolida.)",
  );

  document.querySelectorAll(".item").forEach((card) => {
    card.onclick = null;
  });
  document.querySelectorAll(".reset");
}
