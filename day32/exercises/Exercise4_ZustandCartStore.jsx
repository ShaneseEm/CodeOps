import { create } from "zustand";

/**
 * Exercise 4: Install zustand and build a cart store with items, addItem, remove and clear.
 */
export const useSimpleCartStore = create((set) => ({
  items: [],
  addItem: (dish) => set((s) => ({ items: [...s.items, dish] })),
  remove: (id) => set((s) => ({ items: s.items.filter((d) => d.id !== id) })),
  clear: () => set({ items: [] }),
}));

export default function Exercise4_ZustandCartStore() {
  const items = useSimpleCartStore((s) => s.items);
  const addItem = useSimpleCartStore((s) => s.addItem);
  const remove = useSimpleCartStore((s) => s.remove);
  const clear = useSimpleCartStore((s) => s.clear);

  return (
    <div className="exercise-card">
      <h3>Exercise 4: Zustand Cart Store (items, addItem, remove, clear)</h3>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button onClick={() => addItem({ id: Date.now(), name: "Kitfo", price: 320 })}>
          Add Kitfo (320 ETB)
        </button>
        <button onClick={() => addItem({ id: Date.now() + 1, name: "Shiro", price: 120 })}>
          Add Shiro (120 ETB)
        </button>
        <button onClick={clear} disabled={items.length === 0}>
          Clear All
        </button>
      </div>

      <h4>Store Items ({items.length}):</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ margin: "0.3rem 0" }}>
            {item.name} — {item.price} ETB{" "}
            <button onClick={() => remove(item.id)} style={{ marginLeft: "0.5rem" }}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
