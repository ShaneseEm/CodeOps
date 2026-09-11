/**
 * Step 6 — save() and load() with localStorage, wired into init()
 */
const KEY = "birrwatch";

function save() {
  localStorage.setItem(KEY, JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency,
  }));
}

function load() {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (e) {
      console.error("Corrupted state", e);
    }
  }
}

async function init() {
  load();
  await loadRates();
  render();
}
