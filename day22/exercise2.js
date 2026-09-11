/**
 * Step 2 — render() against fake hard-coded rates
 */
const state = {
  base: "ETB",
  rates: { USD: 0.0177, KES: 2.29, EUR: 0.0164, GBP: 0.0139 },
  watchlist: [],
  amount: 100,
  currency: "USD",
};

function render() {
  const select = document.querySelector("#currency");
  if (!select) return;
  const codes = Object.keys(state.rates);
  select.innerHTML = codes.map(c => `<option>${c}</option>`).join("");
  select.value = state.currency;
}

// Confirm dropdown fills before touching network
// render();
