/**
 * Day 20 - Exercise 2: Async/Await Conversion
 * Requirement: Rewrite a three-step .then chain (fetch -> json -> render)
 * as an async function using await and try/catch.
 */

// Old .then() chain pattern (for reference):
// fetch("https://jsonplaceholder.typicode.com/users/1")
//   .then(res => res.json())
//   .then(data => renderUser(data))
//   .catch(err => console.error(err));

// Modern Async/Await Refactored Function:
async function loadUserDataAsync() {
  const outputEl = document.getElementById("ex2-output");
  if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Loading user profile...';

  try {
    // Step 1: await fetch response
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!res.ok) {
      throw new Error(`HTTP Error Status: ${res.status}`);
    }

    // Step 2: await JSON parsing
    const user = await res.json();

    // Step 3: Render data into DOM
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="success-box">
          <h4>👤 User Profile Loaded (Async/Await Conversion)</h4>
          <ul class="data-list">
            <li><strong>Name:</strong> ${user.name}</li>
            <li><strong>Email:</strong> ${user.email}</li>
            <li><strong>Company:</strong> ${user.company.name}</li>
            <li><strong>City:</strong> ${user.address.city}</li>
          </ul>
        </div>
      `;
    }
  } catch (err) {
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="error-box">
          ❌ <strong>Async Execution Failed:</strong> ${err.message}
        </div>
      `;
    }
    console.error("Exercise 2 Error:", err);
  }
}
