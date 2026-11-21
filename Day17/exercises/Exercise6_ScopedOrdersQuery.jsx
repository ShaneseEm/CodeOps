import { useState } from "react";

/**
 * Exercise 6: Scope the orders query to the session id and try to read another account.
 * Demonstrates defense against Insecure Direct Object Reference (IDOR).
 */

const MOCK_DATABASE_ORDERS = [
  { id: "AE-101", userId: "user_abebe_1", customer: "Abebe Bikila", dish: "Doro Wat", total: 380 },
  { id: "AE-102", userId: "user_abebe_1", customer: "Abebe Bikila", dish: "Kitfo Special", total: 420 },
  { id: "AE-201", userId: "user_chaltu_2", customer: "Chaltu Dibaba", dish: "Beyaynetu", total: 290 },
  { id: "AE-301", userId: "user_almaz_3", customer: "Almaz Kebede", dish: "Shiro Mitten", total: 220 },
];

export default function Exercise6_ScopedOrdersQuery() {
  // Current authenticated user session (Abebe)
  const currentSession = {
    user: { id: "user_abebe_1", name: "Abebe Bikila", email: "abebe@addiseats.et" },
  };

  const [targetOrderId, setTargetOrderId] = useState("AE-201"); // Attempting to read Chaltu's order!
  const [queryMode, setQueryMode] = useState("SCOPED"); // SCOPED vs VULNERABLE
  const [queryResult, setQueryResult] = useState(null);

  const executeOrderQuery = () => {
    if (queryMode === "VULNERABLE") {
      // VULNERABLE PATTERN: Reads directly by request parameter without scoping to session.user.id
      const found = MOCK_DATABASE_ORDERS.find((o) => o.id === targetOrderId);
      if (found) {
        setQueryResult({
          status: "EXPOSED",
          data: found,
          sql: `SELECT * FROM orders WHERE id = '${targetOrderId}'; -- ⚠️ IDOR Vulnerability: Leaked another user's private order!`,
        });
      } else {
        setQueryResult({ status: "NOT_FOUND", data: null, sql: `SELECT * FROM orders WHERE id = '${targetOrderId}'` });
      }
    } else {
      // SECURE SCOPED PATTERN: Query is strictly bound to session.user.id
      const found = MOCK_DATABASE_ORDERS.find(
        (o) => o.id === targetOrderId && o.userId === currentSession.user.id
      );

      if (found) {
        setQueryResult({
          status: "AUTHORIZED",
          data: found,
          sql: `SELECT * FROM orders WHERE id = '${targetOrderId}' AND user_id = '${currentSession.user.id}'; -- ✅ Scoped safely`,
        });
      } else {
        setQueryResult({
          status: "PROTECTED",
          data: null,
          message: "404 Not Found (or 403 Forbidden): Order does not belong to your account.",
          sql: `SELECT * FROM orders WHERE id = '${targetOrderId}' AND user_id = '${currentSession.user.id}'; -- 🛡️ Returned empty set. Attack neutralized!`,
        });
      }
    }
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 6: Session-Scoped Queries (IDOR Defense)</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Orders query is strictly scoped to <code>session.user.id</code> rather than trusting the order ID from URL or request body.
      </p>

      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "1rem" }}>
        <div style={{ fontSize: "0.85rem" }}>
          <strong>Logged in as:</strong> {currentSession.user.name} (<code>{currentSession.user.id}</code>)
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <button
          onClick={() => setQueryMode("SCOPED")}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: queryMode === "SCOPED" ? "#059669" : "#e2e8f0",
            color: queryMode === "SCOPED" ? "#fff" : "#334155",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🛡️ Secure Scoped Query (Exercise 6)
        </button>
        <button
          onClick={() => setQueryMode("VULNERABLE")}
          style={{
            flex: 1,
            padding: "0.5rem",
            background: queryMode === "VULNERABLE" ? "#dc2626" : "#e2e8f0",
            color: queryMode === "VULNERABLE" ? "#fff" : "#334155",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ⚠️ Vulnerable Request-ID Query
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <select
          value={targetOrderId}
          onChange={(e) => setTargetOrderId(e.target.value)}
          style={{ flex: 1, padding: "0.4rem", borderRadius: "4px", border: "1px solid #cbd5e1" }}
        >
          <option value="AE-101">Order AE-101 (Owned by current user Abebe)</option>
          <option value="AE-201">Order AE-201 (Owned by Chaltu - ATTACK TARGET)</option>
          <option value="AE-301">Order AE-301 (Owned by Almaz - ATTACK TARGET)</option>
        </select>
        <button
          onClick={executeOrderQuery}
          style={{ padding: "0.4rem 1rem", background: "#0284c7", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Execute Fetch
        </button>
      </div>

      {queryResult && (
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            background: queryResult.status === "EXPOSED" ? "#fef2f2" : "#ecfdf5",
            border: `1px solid ${queryResult.status === "EXPOSED" ? "#ef4444" : "#10b981"}`,
          }}
        >
          <strong style={{ color: queryResult.status === "EXPOSED" ? "#991b1b" : "#065f46" }}>
            Result: {queryResult.status}
          </strong>
          <pre style={{ margin: "0.4rem 0", fontSize: "0.78rem", background: "#fff", padding: "0.4rem", borderRadius: "4px", overflowX: "auto" }}>
            {queryResult.sql}
          </pre>
          {queryResult.data ? (
            <div style={{ fontSize: "0.85rem" }}>
              <strong>Leaked / Loaded Order:</strong>
              <div>Customer: {queryResult.data.customer}</div>
              <div>Dish: {queryResult.data.dish} ({queryResult.data.total} ETB)</div>
            </div>
          ) : (
            <div style={{ fontSize: "0.85rem", color: "#047857" }}>{queryResult.message}</div>
          )}
        </div>
      )}
    </div>
  );
}
