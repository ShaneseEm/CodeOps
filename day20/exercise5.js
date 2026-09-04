/**
 * Day 20 - Exercise 5: UI State Management (Loading, Success, Error)
 * Requirement: Build a component demonstrating three UI states:
 * 1) Loading... state
 * 2) Success state with fetched data
 * 3) Error state with friendly feedback (testable via simulate error toggle)
 */

async function fetchWithStateManagement(simulateFailure = false) {
  const container = document.getElementById("ex5-output");
  if (!container) return;

  // 1. STATE 1: LOADING
  container.innerHTML = `
    <div class="state-indicator loading-state">
      <span class="loading-spinner"></span>
      <strong>State 1: Loading...</strong>
      <p>Fetching public quote data from API...</p>
    </div>
  `;

  try {
    const url = simulateFailure
      ? "https://invalid-api-endpoint-testing-12345.org/error"
      : "https://dummyjson.com/quotes/random";

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error Code: ${res.status}`);
    }

    const data = await res.json();

    // 2. STATE 2: SUCCESS
    setTimeout(() => {
      container.innerHTML = `
        <div class="state-indicator success-state">
          <strong>✅ State 2: Success (Data Loaded)</strong>
          <blockquote class="quote-text">"${data.quote}"</blockquote>
          <p class="quote-author">— ${data.author}</p>
        </div>
      `;
    }, 600); // Artificial delay to ensure loading state is clearly visible
  } catch (err) {
    // 3. STATE 3: ERROR
    setTimeout(() => {
      container.innerHTML = `
        <div class="state-indicator error-state">
          <strong>❌ State 3: Error Occurred</strong>
          <p class="error-msg">${err.message || "Failed to reach server. Please check your network connection."}</p>
          <button class="retry-btn" onclick="fetchWithStateManagement(false)">🔄 Retry Connection</button>
        </div>
      `;
    }, 600);
  }
}
