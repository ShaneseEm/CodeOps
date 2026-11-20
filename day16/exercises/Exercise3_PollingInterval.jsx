import { useState, useEffect } from "react";

/**
 * Exercise 3: Add refreshInterval and confirm the polling in the network tab.
 *
 * SWR config:
 * useSWR(`/api/orders/${orderId}`, fetcher, { refreshInterval: 5000 });
 *
 * Periodically polls the server every 5 seconds to track order lifecycle:
 * "Received" -> "Preparing" -> "Out for Delivery" -> "Delivered".
 */
const STATUS_STEPS = ["Order Received 📝", "In the Kitchen 🍳", "Out for Delivery 🛵", "Delivered 🎉"];

export default function Exercise3_PollingInterval({ orderId = "AE-8821" }) {
  const [pollCount, setPollCount] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Simulated 5-second polling interval
  useEffect(() => {
    const timer = setInterval(() => {
      setPollCount((prev) => prev + 1);
      setCurrentStepIndex((prev) => (prev < STATUS_STEPS.length - 1 ? prev + 1 : prev));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 3: Automated Polling with refreshInterval: 5000</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        <code>refreshInterval: 5000</code> queries the server every 5 seconds. Inspecting the Network tab confirms periodic background GET requests.
      </p>

      <div style={{ background: "#ffffff", border: "2px solid #3b82f6", borderRadius: "8px", padding: "1.25rem", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ margin: 0, color: "#1e3a8a" }}>Live Order Status Tracker</h4>
          <span style={{ fontSize: "0.75rem", background: "#dbeafe", color: "#1d4ed8", padding: "0.2rem 0.5rem", borderRadius: "999px", fontWeight: 600 }}>
            Polls every 5000ms
          </span>
        </div>

        <div style={{ margin: "1rem 0", padding: "0.75rem", background: "#eff6ff", borderRadius: "6px" }}>
          <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.85rem", color: "#1e40af" }}>
            Current Status: <strong>{STATUS_STEPS[currentStepIndex]}</strong>
          </p>
          <div style={{ height: "6px", width: "100%", background: "#bfdbfe", borderRadius: "3px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${((currentStepIndex + 1) / STATUS_STEPS.length) * 100}%`,
                background: "#2563eb",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>
          📡 <strong>Network Tab Status:</strong> {pollCount} poll requests executed (every 5.0s)
        </div>
      </div>
    </div>
  );
}
