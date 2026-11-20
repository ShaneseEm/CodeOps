import { useState } from "react";
import { fetcher } from "./lib/fetcher";

/**
 * Exercise 1: Install SWR and put the fetcher in a shared lib/fetcher.js
 * Demonstrates the shared fetcher throwing on non-OK responses and returning JSON.
 */
export default function Exercise1_Fetcher() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFetcher = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetcher(url);
      setResult(data);
    } catch (err) {
      setError({
        message: err.message,
        status: err.status,
        info: err.info,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 1: Shared lib/fetcher.js</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        A centralized fetcher ensuring all SWR queries throw standard errors on non-OK status codes.
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => testFetcher("https://addis-eats-foundation.vercel.app/api/dishes")}
          style={{ padding: "0.5rem 0.85rem", background: "#059669", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Test Successful GET (200 OK)
        </button>
        <button
          onClick={() => testFetcher("https://addis-eats-foundation.vercel.app/api/dishes/999")}
          style={{ padding: "0.5rem 0.85rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Test Error Handling (404 Not Found)
        </button>
      </div>

      {loading && <p style={{ color: "#6b7280" }}>Fetching data with shared fetcher...</p>}

      {result && (
        <div style={{ background: "#f0fdf4", border: "1px solid #86efac", padding: "0.75rem", borderRadius: "6px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#166534" }}>✅ Success Response (200 OK):</h4>
          <pre style={{ margin: 0, fontSize: "0.8rem", maxHeight: "150px", overflow: "auto" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div role="alert" style={{ background: "#fef2f2", border: "1px solid #ef4444", padding: "0.75rem", borderRadius: "6px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#991b1b" }}>❌ Error Thrown by fetcher:</h4>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "#7f1d1d" }}>
            <strong>Status:</strong> {error.status} | <strong>Message:</strong> {error.message}
          </p>
        </div>
      )}
    </div>
  );
}
