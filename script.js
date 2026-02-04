const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");

function openModal() {
  backdrop.classList.add("show");
  // zameraj pozornosť na modal (nie je to povinné, ale je to fajn)
  modal.setAttribute("tabindex", "-1");
  modal.focus?.();
}

function closeModal() {
  backdrop.classList.remove("show");
}

openModalBtn?.addEventListener("click", openModal);
closeBtn?.addEventListener("click", closeModal);

// klik mimo modalu zavrie
backdrop?.addEventListener("click", (e) => {
  if (e.target === backdrop) closeModal();
});

// escape zavrie
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && backdrop.classList.contains("show")) closeModal();
});

// --- UTEKAJÚCE "NIE" ---
function moveNoButton() {
  if (!buttonsArea || !noBtn) return;

  const areaRect = buttonsArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // bezpečné okraje, aby to nešlo úplne na kraj
  const padding = 12;

  const maxX = areaRect.width - btnRect.width - padding;
  const maxY = areaRect.height - btnRect.height - padding;

  // ak by bolo malé okno, len nerob nič
  if (maxX < 10 || maxY < 10) return;

  const x = padding + Math.random() * maxX;
  const y = padding + Math.random() * maxY;

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
  noBtn.style.transform = `translate(0,0)`;
}

// keď ide kurzor na tlačidlo "Nie" alebo blízko neho
noBtn?.addEventListener("mouseenter", moveNoButton);

// bonus: keď sa priblíži kurzor do oblasti (aby to bolo “zúrivejšie”)
buttonsArea?.addEventListener("mousemove", (e) => {
  const rect = buttonsArea.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const bx = noBtn.offsetLeft + noBtn.offsetWidth / 2;
  const by = noBtn.offsetTop + noBtn.offsetHeight / 2;

  const dist = Math.hypot(x - bx, y - by);

  // keď si do 90px, utekaj
  if (dist < 90) moveNoButton();
});

// --- Floating hearts generator ---
const heartsContainer = document.querySelector(".hearts");
const heartChars = ["💗","💖","💘","💝","💞","💕","❤️"];

function spawnHeart() {
  if (!heartsContainer) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];

  const left = Math.random() * 100; // vw
  const size = 14 + Math.random() * 24; // px
  const duration = 6 + Math.random() * 6; // s
  const delay = Math.random() * 1.5; // s

  heart.style.left = `${left}vw`;
  heart.style.fontSize = `${size}px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;

  heartsContainer.appendChild(heart);

  // odstráň po animácii
  const total = (duration + delay) * 1000;
  setTimeout(() => heart.remove(), total + 250);
}

// spúšťaj srdiečka priebežne
setInterval(spawnHeart, 280);
for (let i = 0; i < 12; i++) spawnHeart();

// otvor modal automaticky po 0.7s (môžeš vypnúť, ak chceš)
setTimeout(() => {
  if (openModalBtn) openModal();
}, 700);
