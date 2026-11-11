import { useState, Profiler } from "react";

/**
 * Exercise 5: Record a Profiler session while adding three dishes,
 * and note the slowest component.
 */

// Simulated heavy dish card that re-calculates unnecessarily on every parent render
function SlowDishCard({ dish, onAdd }) {
  // Artificial slowdown simulating un-memoized heavy component / heavy formatting
  const start = performance.now();
  while (performance.now() - start < 6) {
    // 6ms sync burn
  }

  return (
    <div style={{ padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span>{dish.name} - {dish.price} ETB</span>
      <button
        onClick={() => onAdd(dish)}
        style={{ padding: "0.25rem 0.5rem", background: "#b84a2e", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        Add
      </button>
    </div>
  );
}

export default function Exercise5_ProfilerSlowComponent() {
  const [cart, setCart] = useState([]);
  const [profileLogs, setProfileLogs] = useState([]);

  const dishes = [
    { id: 1, name: "Doro Wat", price: 350 },
    { id: 2, name: "Kitfo", price: 380 },
    { id: 3, name: "Beyaynetu", price: 260 },
  ];

  const handleAdd = (dish) => {
    setCart((prev) => [...prev, dish]);
  };

  // Profiler callback tracking phase and commit duration
  const onRenderCallback = (id, phase, actualDuration, baseDuration) => {
    setProfileLogs((prev) => [
      ...prev.slice(-4),
      {
        id,
        phase,
        actualDuration: actualDuration.toFixed(2),
        baseDuration: baseDuration.toFixed(2),
        cartSize: cart.length + 1,
      },
    ]);
  };

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 5: Profiler Session & Slowest Component Identification</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        React's <code>&lt;Profiler&gt;</code> logs exact render durations as dishes are added to the cart.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <strong>Cart Total: {cart.length} items</strong>
        <button onClick={() => setCart([])} style={{ fontSize: "0.8rem", cursor: "pointer" }}>
          Clear Cart
        </button>
      </div>

      <Profiler id="DishListSection" onRender={onRenderCallback}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
          {dishes.map((dish) => (
            <SlowDishCard key={dish.id} dish={dish} onAdd={handleAdd} />
          ))}
        </div>
      </Profiler>

      <div style={{ background: "#1f2937", color: "#f9fafb", padding: "0.75rem", borderRadius: "6px" }}>
        <h4 style={{ margin: "0 0 0.5rem 0", color: "#60a5fa", fontSize: "0.85rem" }}>
          Recorded Profiler Sessions (Slowest: SlowDishCard ~18.5ms total):
        </h4>
        {profileLogs.length === 0 ? (
          <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>Click "Add" on 3 dishes to capture render times...</p>
        ) : (
          <table style={{ width: "100%", fontSize: "0.75rem", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "#9ca3af", textAlign: "left" }}>
                <th>Phase</th>
                <th>Actual (ms)</th>
                <th>Base (ms)</th>
                <th>Items Added</th>
              </tr>
            </thead>
            <tbody>
              {profileLogs.map((log, i) => (
                <tr key={i} style={{ borderTop: "1px solid #374151" }}>
                  <td>{log.phase}</td>
                  <td style={{ color: Number(log.actualDuration) > 10 ? "#f87171" : "#4ade80" }}>
                    {log.actualDuration} ms
                  </td>
                  <td>{log.baseDuration} ms</td>
                  <td>{log.cartSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
