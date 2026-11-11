import { useState } from "react";
import { ErrorBoundary } from "./Exercise1_ErrorBoundary";

/**
 * Exercise 3: Add a second boundary around the cart panel
 * so the two fail independently.
 */
function BuggyCart({ crash }) {
  if (crash) {
    throw new Error("Cart recalculation overflow error!");
  }
  return (
    <div style={{ padding: "0.75rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
      <p style={{ margin: 0 }}>🛒 Cart Subtotal: <strong>670 ETB</strong> (2 items)</p>
    </div>
  );
}

function BuggyMenu({ crash }) {
  if (crash) {
    throw new Error("Failed to render dish categories from API!");
  }
  return (
    <div style={{ padding: "0.75rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
      <p style={{ margin: 0 }}>🍲 4 Categories Loaded: Traditional, Fast Food, Drinks, Desserts</p>
    </div>
  );
}

export default function Exercise3_DualErrorBoundaries() {
  const [menuCrash, setMenuCrash] = useState(false);
  const [cartCrash, setCartCrash] = useState(false);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 3: Dual Independent Error Boundaries</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Menu and Cart have dedicated, isolated ErrorBoundaries. One can fail completely while the other continues working without disruption.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        {/* Boundary 1: Menu */}
        <div style={{ padding: "1rem", border: "2px solid #3b82f6", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#1d4ed8" }}>Boundary 1: Menu</h4>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <div role="alert" style={{ padding: "0.75rem", background: "#fee2e2", borderRadius: "6px" }}>
                <p style={{ color: "#991b1b", fontSize: "0.85rem", margin: 0 }}>⚠️ {error.message}</p>
                <button
                  onClick={() => {
                    setMenuCrash(false);
                    reset();
                  }}
                  style={{ marginTop: "0.5rem", padding: "0.25rem 0.6rem", cursor: "pointer" }}
                >
                  Recover Menu
                </button>
              </div>
            )}
          >
            <BuggyMenu crash={menuCrash} />
          </ErrorBoundary>
          <button
            onClick={() => setMenuCrash(true)}
            style={{ marginTop: "0.75rem", padding: "0.3rem 0.6rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
          >
            Crash Menu Only
          </button>
        </div>

        {/* Boundary 2: Cart */}
        <div style={{ padding: "1rem", border: "2px solid #10b981", borderRadius: "8px" }}>
          <h4 style={{ margin: "0 0 0.5rem 0", color: "#047857" }}>Boundary 2: Cart</h4>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <div role="alert" style={{ padding: "0.75rem", background: "#fee2e2", borderRadius: "6px" }}>
                <p style={{ color: "#991b1b", fontSize: "0.85rem", margin: 0 }}>⚠️ {error.message}</p>
                <button
                  onClick={() => {
                    setCartCrash(false);
                    reset();
                  }}
                  style={{ marginTop: "0.5rem", padding: "0.25rem 0.6rem", cursor: "pointer" }}
                >
                  Recover Cart
                </button>
              </div>
            )}
          >
            <BuggyCart crash={cartCrash} />
          </ErrorBoundary>
          <button
            onClick={() => setCartCrash(true)}
            style={{ marginTop: "0.75rem", padding: "0.3rem 0.6rem", background: "#ef4444", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
          >
            Crash Cart Only
          </button>
        </div>
      </div>
    </div>
  );
}
