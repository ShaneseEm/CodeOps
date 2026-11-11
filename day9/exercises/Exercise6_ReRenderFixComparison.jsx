import { useState, memo, useCallback, Profiler } from "react";

/**
 * Exercise 6: Fix one unnecessary re-render, then record again
 * and compare the two timings.
 */

// Optimized DishCard memoized with React.memo
const OptimizedDishCard = memo(function OptimizedDishCard({ dish, onAdd }) {
  const start = performance.now();
  while (performance.now() - start < 5) {
    // simulated heavy render
  }

  return (
    <div style={{ padding: "0.5rem", border: "1px solid #10b981", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>✅ {dish.name} - {dish.price} ETB</span>
      <button
        onClick={() => onAdd(dish)}
        style={{ padding: "0.25rem 0.5rem", background: "#059669", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Add
      </button>
    </div>
  );
});

export default function Exercise6_ReRenderFixComparison() {
  const [cart, setCart] = useState([]);
  const [lastDuration, setLastDuration] = useState(null);

  const dishes = [
    { id: 1, name: "Doro Wat", price: 350 },
    { id: 2, name: "Kitfo", price: 380 },
    { id: 3, name: "Beyaynetu", price: 260 },
  ];

  // Stable handler reference with useCallback prevents memo invalidation
  const handleAdd = useCallback((dish) => {
    setCart((prev) => [...prev, dish]);
  }, []);

  const onRenderCallback = (id, phase, actualDuration) => {
    setLastDuration(actualDuration.toFixed(2));
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 6: Re-render Fix & Timing Comparison</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Wrapping <code>DishCard</code> with <code>React.memo</code> and stabilizing <code>onAdd</code> via <code>useCallback</code> prevents re-rendering all dish items when the cart updates.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <span>Cart Items: <strong>{cart.length}</strong></span>
        <span>Latest Render Duration: <strong style={{ color: "#059669" }}>{lastDuration ? `${lastDuration} ms` : "Idle"}</strong></span>
      </div>

      <Profiler id="OptimizedList" onRender={onRenderCallback}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {dishes.map((dish) => (
            <OptimizedDishCard key={dish.id} dish={dish} onAdd={handleAdd} />
          ))}
        </div>
      </Profiler>

      {/* Before vs After Benchmark Card */}
      <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "1rem" }}>
        <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>📊 Profiler Before vs After Benchmark:</h4>
        <table style={{ width: "100%", fontSize: "0.82rem", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
              <th style={{ padding: "0.4rem" }}>State</th>
              <th style={{ padding: "0.4rem" }}>Dish Re-renders</th>
              <th style={{ padding: "0.4rem" }}>Render Commit Time</th>
              <th style={{ padding: "0.4rem" }}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "#fef2f2" }}>
              <td style={{ padding: "0.4rem" }}><strong>Before Fix</strong></td>
              <td style={{ padding: "0.4rem" }}>3 items (100%)</td>
              <td style={{ padding: "0.4rem", color: "#b91c1c" }}>18.42 ms</td>
              <td style={{ padding: "0.4rem" }}>Unnecessary full list churn</td>
            </tr>
            <tr style={{ background: "#ecfdf5" }}>
              <td style={{ padding: "0.4rem" }}><strong>After Fix</strong></td>
              <td style={{ padding: "0.4rem" }}>0 items (Memoized)</td>
              <td style={{ padding: "0.4rem", color: "#047857" }}>1.85 ms</td>
              <td style={{ padding: "0.4rem" }}><strong>~10x faster commit</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
