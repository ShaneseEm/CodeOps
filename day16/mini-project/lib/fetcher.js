/**
 * lib/fetcher.js
 *
 * Centralized HTTP client utility for SWR queries.
 * Validates HTTP response status and throws an enriched Error instance
 * when responses are non-OK (4xx, 5xx), allowing SWR error boundaries to act.
 */
export async function fetcher(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    try {
      error.info = await response.json();
    } catch {
      error.info = { status: response.status, statusText: response.statusText };
    }
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export default fetcher;
