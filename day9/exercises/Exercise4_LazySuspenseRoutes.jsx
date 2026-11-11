import { useState, Suspense, lazy } from "react";

/**
 * Exercise 4: Lazy-load the checkout and receipt routes
 * behind a Suspense skeleton.
 */

// Simulated asynchronous lazy bundle imports
const LazyCheckout = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function CheckoutView() {
          return (
            <div style={{ padding: "1rem", background: "#fdf2f8", border: "1px solid #f472b6", borderRadius: "8px" }}>
              <h4>🔒 Lazy Loaded Checkout Form</h4>
              <p>Downloaded code chunk on demand (telebirr gateway, form validators, etc.)</p>
              <button style={{ padding: "0.5rem 1rem", background: "#db2777", color: "#fff", border: "none", borderRadius: "4px" }}>
                Complete Payment
              </button>
            </div>
          );
        },
      });
    }, 1200); // 1.2s network chunk download simulation
  });
});

const LazyReceipt = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        default: function ReceiptView() {
          return (
            <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #4ade80", borderRadius: "8px" }}>
              <h4>🧾 Lazy Loaded Receipt View</h4>
              <p>Order #AE-98231: Confirmed via TeleBirr. Driver dispatched!</p>
            </div>
          );
        },
      });
    }, 1200);
  });
});

function RouteSkeleton({ name }) {
  return (
    <div style={{ padding: "1.5rem", background: "#f3f4f6", borderRadius: "8px", animation: "pulse 1.5s infinite" }}>
      <div style={{ height: "20px", width: "40%", background: "#e5e7eb", borderRadius: "4px", marginBottom: "1rem" }} />
      <div style={{ height: "14px", width: "80%", background: "#e5e7eb", borderRadius: "4px", marginBottom: "0.5rem" }} />
      <div style={{ height: "14px", width: "60%", background: "#e5e7eb", borderRadius: "4px", marginBottom: "1rem" }} />
      <div style={{ height: "36px", width: "120px", background: "#d1d5db", borderRadius: "4px" }} />
      <p style={{ fontSize: "0.8rem", color: "#6b7280", margin: "0.5rem 0 0 0" }}>
        Loading {name} bundle chunk...
      </p>
    </div>
  );
}

export default function Exercise4_LazySuspenseRoutes() {
  const [activeTab, setActiveTab] = useState("menu");

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 4: React.lazy & Suspense Skeleton</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Heavy routes like <code>Checkout</code> and <code>Receipt</code> are code-split into distinct chunks and downloaded only when navigated to.
      </p>

      {/* Route Navigation Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button
          onClick={() => setActiveTab("menu")}
          style={{ padding: "0.4rem 0.8rem", background: activeTab === "menu" ? "#1f2937" : "#e5e7eb", color: activeTab === "menu" ? "#fff" : "#111", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Menu (Instant)
        </button>
        <button
          onClick={() => setActiveTab("checkout")}
          style={{ padding: "0.4rem 0.8rem", background: activeTab === "checkout" ? "#1f2937" : "#e5e7eb", color: activeTab === "checkout" ? "#fff" : "#111", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Checkout (Lazy)
        </button>
        <button
          onClick={() => setActiveTab("receipt")}
          style={{ padding: "0.4rem 0.8rem", background: activeTab === "receipt" ? "#1f2937" : "#e5e7eb", color: activeTab === "receipt" ? "#fff" : "#111", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Receipt (Lazy)
        </button>
      </div>

      <div style={{ minHeight: "180px" }}>
        {activeTab === "menu" && (
          <div style={{ padding: "1rem", background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px" }}>
            <h4>Addis Eats Menu</h4>
            <p>Browsing dishes does NOT download the checkout code chunk.</p>
          </div>
        )}

        {activeTab === "checkout" && (
          <Suspense fallback={<RouteSkeleton name="Checkout" />}>
            <LazyCheckout />
          </Suspense>
        )}

        {activeTab === "receipt" && (
          <Suspense fallback={<RouteSkeleton name="Receipt" />}>
            <LazyReceipt />
          </Suspense>
        )}
      </div>
    </div>
  );
}
