/**
 * Day 20 - Exercise 1: Fetch USD to ETB Rate
 * Requirement: Write an async function that fetches USD->ETB rate from a public
 * exchange-rate API, checks res.ok, and returns/displays the rate.
 */
async function fetchUsdToEtbRate() {
  const outputEl = document.getElementById("ex1-output");
  if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Fetching USD→ETB Exchange Rate...';

  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    
    // Explicitly check res.ok HTTP status code (200-299)
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status} (${response.statusText})`);
    }

    const data = await response.json();
    const rate = data.rates && data.rates.ETB ? data.rates.ETB : null;

    if (!rate) {
      throw new Error("ETB rate missing in response payload.");
    }

    const formattedRate = rate.toFixed(2);
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="success-box">
          <h4>✅ USD → ETB Exchange Rate Fetched</h4>
          <p class="rate-display"><strong>1 USD</strong> = <strong class="highlight-val">${formattedRate} ETB</strong></p>
          <small class="timestamp">Last Updated: ${new Date(data.time_last_update_utc || Date.now()).toLocaleString()}</small>
        </div>
      `;
    }
    return rate;
  } catch (error) {
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="error-box">
          ❌ <strong>Failed to fetch exchange rate:</strong> ${error.message}
        </div>
      `;
    }
    console.error("Exercise 1 Error:", error);
    throw error;
  }
}
