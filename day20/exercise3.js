/**
 * Day 20 - Exercise 3: Network Failure vs HTTP 404 Error Handling
 * Demonstration:
 * Part A: Fetch a deliberately invalid domain -> network error triggers catch.
 * Part B: Fetch a real URL returning 404 -> promise resolves! Demonstrates why checking res.ok is necessary.
 */

// Part A: Test Network Failure (Deliberately wrong domain)
async function testNetworkError() {
  const outputEl = document.getElementById("ex3-output");
  if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Attempting connection to invalid URL...';

  try {
    // Deliberately unreachable domain
    await fetch("https://domain-that-does-not-exist-xyz123.org/api");
  } catch (err) {
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="warning-box">
          ⚡ <strong>Part A Result (Network Error Caught):</strong><br>
          The fetch promise rejected because the domain is unreachable.<br>
          <code>Error: ${err.message}</code>
        </div>
      `;
    }
  }
}

// Part B: Test HTTP 404 Error (Promise resolves despite 404, proving res.ok necessity)
async function testHttp404Error() {
  const outputEl = document.getElementById("ex3-output");
  if (outputEl) outputEl.innerHTML = '<span class="loading-spinner"></span> Fetching valid endpoint that returns 404...';

  try {
    // Real API domain, but resource does not exist (HTTP 404)
    const res = await fetch("https://restcountries.com/v3.1/name/nonexistentcountry99999");
    
    // Demonstrate status inspection
    const statusText = `HTTP ${res.status} ${res.statusText}`;
    
    if (!res.ok) {
      // Without this check, code would treat 404 as success and attempt to parse JSON!
      throw new Error(`res.ok is FALSE (${statusText}). Manually throwing error to trigger catch block.`);
    }

    // This won't execute because of the res.ok guard
    await res.json();
  } catch (err) {
    if (outputEl) {
      outputEl.innerHTML = `
        <div class="info-box">
          🔍 <strong>Part B Result (HTTP 404 Error Handled via res.ok Check):</strong><br>
          Notice: <code>fetch()</code> did NOT reject the promise automatically on HTTP 404.<br>
          Our code detected <code>res.ok === false</code> and threw an explicit error:<br>
          <code>Error: ${err.message}</code>
        </div>
      `;
    }
  }
}
