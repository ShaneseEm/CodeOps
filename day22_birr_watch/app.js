/**
 * Birr Watch — Live ETB Exchange Rate Tracker
 * Module 2 Day 22 JavaScript Project
 * CodeOps · Full Stack Software Development
 */

// ── 1. STATE OBJECT (Single Source of Truth) ──
const state = {
  base: "ETB",
  rates: {},      // Filled by live API or fake test data
  watchlist: [],  // Saved currency codes, e.g. ["USD", "KES"]
  amount: 100,
  currency: "USD",
  lastUpdated: null,
};

const API = "https://open.er-api.com/v6/latest/ETB";
const STORAGE_KEY = "birrwatch";

// ── DOM ELEMENTS ──
const statusEl = document.querySelector("#status");
const form = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const select = document.querySelector("#currency");
const resultEl = document.querySelector("#result");
const addBtn = document.querySelector("#watch");
const watchUl = document.querySelector("#watchlist");
const watchCountBadge = document.querySelector("#watchlist-count");
const refreshBtn = document.querySelector("#refresh-btn");
const toastContainer = document.querySelector("#toast-container");

// ── 2. RENDER FUNCTIONS ──

/**
 * Main render function that syncs DOM elements with current state
 */
function render() {
  const codes = Object.keys(state.rates);

  // Fill dropdown if rates are available
  if (codes.length > 0) {
    // Preserve selection if valid, otherwise fallback
    const currentSel = select.value || state.currency;
    select.innerHTML = codes
      .map(c => `<option value="${c}">${c}</option>`)
      .join("");

    if (codes.includes(currentSel)) {
      select.value = currentSel;
      state.currency = currentSel;
    } else if (codes.includes("USD")) {
      select.value = "USD";
      state.currency = "USD";
    }
  }

  // Update input value from state
  if (amountInput && state.amount) {
    amountInput.value = state.amount;
  }

  // Render sub-components
  renderWatchlist();
  performConversion();
}

/**
 * Renders the watchlist items from state.watchlist
 */
function renderWatchlist() {
  if (!watchUl) return;

  if (watchCountBadge) {
    watchCountBadge.textContent = `${state.watchlist.length} item${state.watchlist.length === 1 ? '' : 's'}`;
  }

  if (state.watchlist.length === 0) {
    watchUl.innerHTML = `
      <li class="watchlist-empty">
        <span class="empty-icon">📌</span>
        <p>No currencies in your watchlist yet.</p>
        <small>Select a currency above and click "+ Add to Watchlist".</small>
      </li>
    `;
    return;
  }

  watchUl.innerHTML = state.watchlist.map(c => {
    const rate = state.rates[c];
    let rateText = "Loading...";
    let inverseText = "";

    if (typeof rate === "number") {
      rateText = `1 ETB = <strong>${rate}</strong> ${c}`;
      const inv = 1 / rate;
      inverseText = `(1 ${c} = ${inv.toFixed(2)} ETB)`;
    }

    return `
      <li data-c="${c}" class="watchlist-item">
        <div class="watchlist-content">
          <div class="watchlist-title">
            <span class="currency-code">${c}</span>
          </div>
          <div class="watchlist-rate">${rateText} <span class="inverse-rate">${inverseText}</span></div>
        </div>
        <button class="rm" aria-label="Remove ${c}" title="Remove ${c} from watchlist">×</button>
      </li>
    `;
  }).join("");
}

// ── 3. FETCHING DATA ──

/**
 * Loads exchange rates from public API into state
 */
async function loadRates() {
  if (!statusEl) return;
  statusEl.className = "status-box status-loading";
  statusEl.textContent = "Loading live exchange rates from API...";

  try {
    const res = await fetch(API);
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    if (data.result !== "success" || !data.rates) {
      throw new Error("API returned an unexpected response format.");
    }

    state.rates = data.rates;
    statusEl.className = "status-box status-success";
    statusEl.textContent = ""; // Clear status message on success

    render();
  } catch (err) {
    console.error("Failed to fetch exchange rates:", err);
    statusEl.className = "status-box status-error";
    statusEl.textContent = "Could not load exchange rates. Please check your internet connection.";
  }
}

// ── 4. CONVERT ACTION ──

/**
 * Validates input, calculates conversion, and updates DOM
 */
function performConversion() {
  if (!resultEl) return;

  const rawVal = amountInput.value.trim();
  const amt = Number(rawVal);

  // Validation checks
  if (rawVal === "" || isNaN(amt) || amt <= 0) {
    resultEl.className = "result-box result-error";
    resultEl.textContent = "Please enter a valid positive number for the amount.";
    return;
  }

  const selectedCurrency = select.value || state.currency;
  if (!selectedCurrency || !state.rates[selectedCurrency]) {
    resultEl.className = "result-box result-info";
    resultEl.textContent = "Rates not loaded yet or currency invalid.";
    return;
  }

  // Calculate rate
  state.amount = amt;
  state.currency = selectedCurrency;
  save();

  const rate = state.rates[selectedCurrency];
  const outputVal = (amt * rate).toFixed(2);
  const formattedAmt = amt.toLocaleString();
  const formattedOut = Number(outputVal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  resultEl.className = "result-box result-success";
  resultEl.innerHTML = `
    <div class="result-main">
      <span class="result-source">${formattedAmt} ETB</span> =
      <span class="result-target">${formattedOut} ${selectedCurrency}</span>
    </div>
    <div class="result-rate-detail">
      Rate: 1 ETB = ${rate} ${selectedCurrency} · 1 ${selectedCurrency} = ${(1 / rate).toFixed(4)} ETB
    </div>
  `;
}

// Wire submit event on form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  performConversion();
});

// Also trigger conversion when select dropdown changes
select.addEventListener("change", () => {
  state.currency = select.value;
  save();
  performConversion();
});

// ── 5. WATCHLIST INTERACTION & DELEGATION ──

// Add to watchlist button
addBtn.addEventListener("click", () => {
  const c = select.value;
  if (!c) return;

  // Guard against duplicates
  if (state.watchlist.includes(c)) {
    showToast(`"${c}" is already in your watchlist.`, "warning");
    return;
  }

  state.watchlist.push(c);
  save();
  renderWatchlist();
  showToast(`Added ${c} to watchlist!`, "success");
});

// Delegated click listener to remove watchlist items by data-c
watchUl.addEventListener("click", (e) => {
  const rmBtn = e.target.closest(".rm");
  if (!rmBtn) return;

  const li = rmBtn.closest("li");
  if (!li) return;

  const c = li.dataset.c;
  if (!c) return;

  // Filter out currency
  state.watchlist = state.watchlist.filter(item => item !== c);
  save();
  renderWatchlist();
  showToast(`Removed ${c} from watchlist.`, "info");
});

// Refresh button event listener
if (refreshBtn) {
  refreshBtn.addEventListener("click", async () => {
    refreshBtn.classList.add("spinning");
    await loadRates();
    setTimeout(() => refreshBtn.classList.remove("spinning"), 500);
    showToast("Exchange rates updated!", "success");
  });
}

// ── 6. PERSISTENCE (localStorage) & INIT ──

/**
 * Saves non-transient state choices to localStorage
 */
function save() {
  try {
    const dataToSave = {
      watchlist: state.watchlist,
      currency: state.currency,
      amount: state.amount
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (err) {
    console.error("Could not save to localStorage:", err);
  }
}

/**
 * Restores saved choices from localStorage on app load
 */
function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        if (Array.isArray(parsed.watchlist)) {
          state.watchlist = parsed.watchlist;
        }
        if (typeof parsed.currency === "string") {
          state.currency = parsed.currency;
        }
        if (typeof parsed.amount === "number" && !isNaN(parsed.amount)) {
          state.amount = parsed.amount;
        }
      }
    }
  } catch (err) {
    console.error("Corrupted localStorage data encountered; resetting.", err);
  }
}

/**
 * Toast Notification Utility
 */
function showToast(message, type = "info") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/**
 * Application Entry Point
 */
async function init() {
  load();       // 1. Load saved preferences from localStorage
  await loadRates(); // 2. Load live rates from API into state
  render();     // 3. Re-render UI from state
}

// Start application
init();
