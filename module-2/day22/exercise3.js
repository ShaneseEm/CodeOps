/**
 * Step 3 — loadRates(): fetch live endpoint, check res.ok, handle status & error
 */
const API = "https://open.er-api.com/v6/latest/ETB";

async function loadRates() {
  const status = document.querySelector("#status");
  if (status) status.textContent = "Loading rates...";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    state.rates = data.rates;
    if (status) status.textContent = "";
    render();
  } catch (err) {
    if (status) status.textContent = "Could not load rates.";
  }
}
