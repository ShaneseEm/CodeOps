/**
 * Exercise 2 — save() and load() Helpers
 * Stringify an array to localStorage; parse it back safely.
 */

const FRUITS_KEY = "day21_fruits";

// ── Safe helpers ──
function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Corrupt storage data — starting fresh.", err);
    return []; // defensive fallback
  }
}

// ── In-memory list ──
let fruits = [];

// ── Render list to DOM ──
const fruitList   = document.querySelector("#fruit-list");
const fruitStatus = document.querySelector("#fruit-status");

function renderFruits() {
  fruitList.innerHTML = "";
  fruits.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = item;

    const del = document.createElement("button");
    del.textContent = "✕";
    del.style.cssText = "background:none;border:none;color:#f87171;cursor:pointer;font-size:.8rem;";
    del.addEventListener("click", () => {
      fruits.splice(i, 1);
      renderFruits();
    });

    li.appendChild(del);
    fruitList.appendChild(li);
  });
}

// ── Button: Add ──
document.querySelector("#fruit-add").addEventListener("click", () => {
  const input = document.querySelector("#fruit-input");
  const val   = input.value.trim();
  if (!val) return;
  fruits.push(val);
  input.value = "";
  renderFruits();
  fruitStatus.textContent = "";
});

// ── Button: Save ──
document.querySelector("#fruit-save").addEventListener("click", () => {
  save(FRUITS_KEY, fruits);
  fruitStatus.textContent = `✅ Saved ${fruits.length} item(s) to localStorage.`;
});

// ── Button: Load ──
document.querySelector("#fruit-load").addEventListener("click", () => {
  fruits = load(FRUITS_KEY);
  renderFruits();
  fruitStatus.textContent = `📂 Loaded ${fruits.length} item(s) from localStorage.`;
});

// ── Button: Clear Storage ──
document.querySelector("#fruit-clear").addEventListener("click", () => {
  localStorage.removeItem(FRUITS_KEY);
  fruits = [];
  renderFruits();
  fruitStatus.textContent = "🗑 Storage cleared.";
});

// Auto-load on start
fruits = load(FRUITS_KEY);
renderFruits();
