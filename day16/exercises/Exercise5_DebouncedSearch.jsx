import { useState, useEffect } from "react";

/**
 * Exercise 5: Add a debounced search box that uses a null key when the term is empty.
 *
 * Rules:
 * 1. Debounce query term by 300ms so typing 5 characters fires 1 network call, not 5.
 * 2. When debounced term is empty (""), SWR key is passed as `null`.
 *    SWR conditional fetching: passing `null` or a function returning `null`
 *    completely suspends the request.
 */
export default function Exercise5_DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [requestLog, setRequestLog] = useState([]);

  // 300ms debounce timer
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Log SWR key derivation
  useEffect(() => {
    // SWR Key: null when term is empty
    const swrKey = debouncedTerm.trim() ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}` : null;

    if (swrKey) {
      setRequestLog((prev) => [...prev.slice(-3), `Fired GET: ${swrKey}`]);
    }
  }, [debouncedTerm]);

  const swrKey = debouncedTerm.trim() ? `/api/dishes?search=${encodeURIComponent(debouncedTerm.trim())}` : null;

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 5: Debounced Search with null Key</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Typing "Doro" rapidly triggers 1 debounced request instead of 4. When empty, key is <code>null</code>, halting requests.
      </p>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="ex5-search" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
          Search Addis Eats Dishes:
        </label>
        <input
          id="ex5-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type 'Kitfo', 'Tibs', or 'Shiro'..."
          style={{ width: "100%", padding: "0.6rem", borderRadius: "6px", border: "1px solid #ccc", boxSizing: "border-box" }}
        />
      </div>

      <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "0.75rem", fontSize: "0.85rem" }}>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Input Value:</strong> "{searchTerm}" (Length: {searchTerm.length})
        </p>
        <p style={{ margin: "0 0 0.25rem 0" }}>
          <strong>Debounced Term (300ms):</strong> "{debouncedTerm}"
        </p>
        <p style={{ margin: "0 0 0.5rem 0", color: swrKey ? "#0284c7" : "#64748b" }}>
          <strong>Active SWR Key:</strong> <code>{swrKey ? swrKey : "null (Request Suspended)"}</code>
        </p>

        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "0.5rem" }}>
          <strong>Dispatched Network Calls:</strong>
          {requestLog.length === 0 ? (
            <span style={{ color: "#94a3b8", marginLeft: "0.5rem" }}>No requests fired yet.</span>
          ) : (
            <ul style={{ margin: "0.25rem 0 0 0", paddingLeft: "1.2rem", color: "#0369a1" }}>
              {requestLog.map((log, i) => (
                <li key={i}>{log}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
