/**
 * lib/fetcher.js
 * Shared SWR fetcher utility.
 * Validates HTTP response status and throws an enriched Error object
 * if response is not OK (res.ok === false).
 */
export async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error(`An error occurred while fetching the data: ${res.statusText}`);
    // Attach extra details to the error object for SWR error boundaries
    try {
      error.info = await res.json();
    } catch {
      error.info = { status: res.status, statusText: res.statusText };
    }
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export default fetcher;
