import { useState } from "react";
import { middlewareConfig, isRouteProtected, runMiddleware } from "./lib/middleware";

/**
 * Exercise 3: Add middleware protecting /checkout and /orders, with a matcher covering only those.
 */
export default function Exercise3_MiddlewareMatcher() {
  const [selectedRoute, setSelectedRoute] = useState("/checkout");
  const [hasSession, setHasSession] = useState(false);
  const [middlewareResult, setMiddlewareResult] = useState(null);

  const testRoutes = [
    { path: "/checkout", category: "Protected Route" },
    { path: "/orders", category: "Protected Route" },
    { path: "/orders/AE-9941", category: "Protected Sub-Route" },
    { path: "/menu", category: "Public Route" },
    { path: "/images/kitfo.png", category: "Static Asset / Image" },
    { path: "/favicon.ico", category: "Static Asset" },
  ];

  const handleRun = (path, authenticated) => {
    setSelectedRoute(path);
    const mockCookie = authenticated ? "valid.payload.mock" : null;
    const result = runMiddleware(path, mockCookie);
    setMiddlewareResult(result);
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 3: Middleware with Narrow Route Matcher</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Narrow matcher covers strictly <code>/checkout/:path*</code> and <code>/orders/:path*</code>, bypassing static images and public views.
      </p>

      <div style={{ background: "#f8fafc", padding: "0.75rem", borderRadius: "6px", border: "1px solid #cbd5e1", marginBottom: "1rem" }}>
        <strong style={{ fontSize: "0.85rem", color: "#334155" }}>Active Next.js Matcher Configuration:</strong>
        <pre style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "#0284c7" }}>
          {JSON.stringify(middlewareConfig, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <label style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Visitor State:</label>
        <button
          onClick={() => {
            setHasSession(!hasSession);
            handleRun(selectedRoute, !hasSession);
          }}
          style={{
            padding: "0.3rem 0.75rem",
            background: hasSession ? "#059669" : "#64748b",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.85rem",
          }}
        >
          {hasSession ? "Authenticated (Signed In)" : "Signed Out (Guest)"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "1rem" }}>
        {testRoutes.map((r) => {
          const protectedFlag = isRouteProtected(r.path);
          return (
            <button
              key={r.path}
              onClick={() => handleRun(r.path, hasSession)}
              style={{
                textAlign: "left",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: selectedRoute === r.path ? "#e0f2fe" : "#ffffff",
                cursor: "pointer",
              }}
            >
              <div style={{ fontWeight: "bold", fontSize: "0.85rem" }}>{r.path}</div>
              <div style={{ fontSize: "0.75rem", color: protectedFlag ? "#dc2626" : "#16a34a" }}>
                {protectedFlag ? "🔒 Matched & Protected" : "⚡ Bypasses Middleware"}
              </div>
            </button>
          );
        })}
      </div>

      {middlewareResult && (
        <div
          style={{
            padding: "0.75rem",
            borderRadius: "6px",
            background: middlewareResult.action === "REDIRECT" ? "#fef2f2" : "#ecfdf5",
            border: `1px solid ${middlewareResult.action === "REDIRECT" ? "#ef4444" : "#10b981"}`,
          }}
        >
          <strong style={{ color: middlewareResult.action === "REDIRECT" ? "#991b1b" : "#065f46" }}>
            Middleware Action: {middlewareResult.action} (HTTP {middlewareResult.status})
          </strong>
          <p style={{ margin: "0.25rem 0", fontSize: "0.85rem" }}>
            Destination: <code>{middlewareResult.destination}</code>
          </p>
          {middlewareResult.reason && (
            <p style={{ margin: "0.25rem 0", fontSize: "0.8rem", color: "#666" }}>Reason: {middlewareResult.reason}</p>
          )}
        </div>
      )}
    </div>
  );
}
