import { useState, useEffect } from "react";

/**
 * useFetch - Custom Hook for Asynchronous Data Fetching
 *
 * Implements:
 * - Returns { data, loading, error }
 * - Uses AbortController to cancel in-flight requests on dependency change or unmount
 * - Handles non-200 responses gracefully with clear error messages
 * - Prevents state updates on unmounted components
 *
 * @param {string} url - The URL to fetch
 * @param {Array} [deps=[]] - Additional dependencies that trigger a refetch
 * @returns {{ data: any, loading: boolean, error: string|null }}
 */
export function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function executeFetch() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(
            `Could not load data (${res.status} ${res.statusText || "Not Found"})`
          );
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        // AbortError is intentionally thrown on cancellation; do not treat as an error
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message || "Failed to fetch data");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    executeFetch();

    // Cleanup: cancel request when URL/deps change or on unmount
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return { data, loading, error };
}

export default useFetch;
