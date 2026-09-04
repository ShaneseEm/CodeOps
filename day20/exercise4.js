/**
 * Day 20 - Exercise 4: Parallel Requests with Promise.all
 * Requirement: Fetch a list from a public API, then use Promise.all to fetch
 * details for the first two items concurrently in parallel.
 */

async function fetchParallelDetails() {
  const outputEl = document.getElementById("ex4-output");
  if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Step 1: Fetching posts list...';

  try {
    // Step 1: Fetch initial list
    const listRes = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    if (!listRes.ok) throw new Error(`Failed list request: HTTP ${listRes.status}`);
    const postsList = await listRes.json();

    if (postsList.length < 2) {
      throw new Error("API returned fewer than 2 items.");
    }

    const item1 = postsList[0];
    const item2 = postsList[1];

    if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Step 2: Executing Promise.all() to fetch details for items #1 and #2 in parallel...';

    const startTime = performance.now();

    // Step 2: Execute concurrent requests in parallel via Promise.all
    const [detail1Res, detail2Res] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/posts/${item1.id}`),
      fetch(`https://jsonplaceholder.typicode.com/posts/${item2.id}`)
    ]);

    if (!detail1Res.ok || !detail2Res.ok) {
      throw new Error("One or more parallel detail requests failed.");
    }

    // Parse JSON bodies concurrently
    const [detail1, detail2] = await Promise.all([
      detail1Res.json(),
      detail2Res.json()
    ]);

    const duration = (performance.now() - startTime).toFixed(1);

    if (outputEl) {
      outputEl.innerHTML = `
        <div class="success-box">
          <h4>🚀 Promise.all Parallel Execution Complete (${duration} ms)</h4>
          <div class="parallel-grid">
            <div class="parallel-card">
              <h5>Item 1 (ID: ${detail1.id})</h5>
              <p><strong>Title:</strong> ${detail1.title}</p>
              <p><strong>Body:</strong> ${detail1.body.substring(0, 70)}...</p>
            </div>
            <div class="parallel-card">
              <h5>Item 2 (ID: ${detail2.id})</h5>
              <p><strong>Title:</strong> ${detail2.title}</p>
              <p><strong>Body:</strong> ${detail2.body.substring(0, 70)}...</p>
            </div>
          </div>
        </div>
      `;
    }
  } catch (err) {
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="error-box">
          ❌ <strong>Promise.all Error:</strong> ${err.message}
        </div>
      `;
    }
    console.error("Exercise 4 Error:", err);
  }
}
