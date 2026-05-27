let balance = 1000;
let bet = 0;

const balanceEl = document.getElementById("balance");
const betEl = document.getElementById("bet");
const resultEl = document.getElementById("result");

const emojis = ["🍒", "💎", "7️⃣", "🍀", "🔥"];

function addBet(amount) {
  if (balance >= amount) {
    bet += amount;
    balance -= amount;
    updateUI();
  } else {
    resultEl.textContent = "Недостаточно денег!";
  }
}

function updateUI() {
  balanceEl.textContent = balance;
  betEl.textContent = bet;
}

function randomEmoji() {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function allIn() {
  if (bet <= 0) {
    resultEl.textContent = "Сначала сделайте ставку!";
    return;
  }

  const s1 = randomEmoji();
  const s2 = randomEmoji();
  const s3 = randomEmoji();

  document.getElementById("slot1").textContent = s1;
  document.getElementById("slot2").textContent = s2;
  document.getElementById("slot3").textContent = s3;

  if (s1 === s2 && s2 === s3) {
    const win = bet * 5;
    balance += win;
    resultEl.textContent = `🎉 Джекпот! Вы выиграли ${win} ₽`;
  } else {
    resultEl.textContent = `💀 Вы проиграли ${bet} ₽`;
  }

  bet = 0;
  updateUI();
}