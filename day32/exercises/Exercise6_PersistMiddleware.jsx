import { useCartStore } from "../../day32_addis_eats/src/cartStore";

/**
 * Exercise 6: Add the persist middleware and confirm the order survives a refresh.
 */
export default function Exercise6_PersistMiddleware() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const clear = useCartStore((s) => s.clear);

  return (
    <div className="exercise-card">
      <h3>Exercise 6: Zustand Persist Middleware Verification</h3>
      <p>
        The store is configured with <code>persist(..., &#123; name: &quot;addis-eats-cart&quot; &#125;)</code>.
        State is automatically synchronized with the browser&apos;s <code>localStorage</code>!
      </p>

      <div style={{ padding: "1rem", background: "#f8f9fa", borderRadius: "8px", marginBottom: "1rem" }}>
        <h4>Current Persisted Items ({items.length}):</h4>
        <ul>
          {items.map((i, idx) => (
            <li key={idx}>
              {i.name} — {i.price} ETB
            </li>
          ))}
        </ul>
        <div style={{ marginTop: "0.8rem", display: "flex", gap: "0.5rem" }}>
          <button onClick={() => addItem({ id: Date.now(), name: "Zilzil Tibs", price: 300 })}>
            + Add Persisted Zilzil Tibs
          </button>
          <button onClick={clear} disabled={items.length === 0}>
            Clear Persisted Store
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "#666" }}>
        <strong>Check in DevTools:</strong> Open Application &rarr; Local Storage &rarr; key: <code>addis-eats-cart</code>.
        Refresh your browser tab — your items will remain!
      </p>
    </div>
  );
}
