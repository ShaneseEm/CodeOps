import { useState } from "react";
import { ErrorBoundary } from "./Exercise1_ErrorBoundary";

/**
 * Exercise 2: Throw deliberately inside one dish and confirm
 * the header and cart still work.
 */
function DishCard({ dish, onCrash }) {
  if (dish.crashed) {
    throw new Error(`Corrupted price data for "${dish.name}"!`);
  }

  return (
    <div style={{ padding: "0.75rem", border: "1px solid #e5e7eb", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <strong>{dish.name}</strong> — {dish.price} ETB
      </div>
      <button
        onClick={() => onCrash(dish.id)}
        style={{ padding: "0.25rem 0.6rem", background: "#f87171", color: "#fff", border: "none", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
      >
        Corrupt Dish ⚠️
      </button>
    </div>
  );
}

function MenuWithDeliberateThrow({ onCrashDish, crashedId }) {
  const dishes = [
    { id: 1, name: "Doro Wat", price: 350, crashed: crashedId === 1 },
    { id: 2, name: "Kitfo Special", price: 400, crashed: crashedId === 2 },
    { id: 3, name: "Shiro Tegabino", price: 200, crashed: crashedId === 3 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {dishes.map((d) => (
        <DishCard key={d.id} dish={d} onCrash={onCrashDish} />
      ))}
    </div>
  );
}

export default function Exercise2_DeliberateDishThrow() {
  const [crashedDishId, setCrashedDishId] = useState(null);
  const [cartCount, setCartCount] = useState(2);

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 2: Deliberate Error Thrown in Dish</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        Throwing inside a dish breaks only the Menu boundary. The Header and Cart remain fully operational.
      </p>

      {/* Header stays intact */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "#1f2937", color: "#fff", borderRadius: "6px", marginBottom: "1rem" }}>
        <span style={{ fontWeight: 700 }}>Addis Eats App</span>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span>Active Cart: <strong>{cartCount} items</strong></span>
          <button
            onClick={() => setCartCount((c) => c + 1)}
            style={{ padding: "0.25rem 0.5rem", background: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.8rem" }}
          >
            + Add to Cart
          </button>
        </div>
      </header>

      {/* Menu wrapped in ErrorBoundary */}
      <div style={{ border: "1px dashed #9ca3af", padding: "1rem", borderRadius: "8px" }}>
        <h4 style={{ margin: "0 0 0.75rem 0" }}>Menu Region (Boundary Protected):</h4>
        <ErrorBoundary
          fallback={({ error, reset }) => (
            <div role="alert" style={{ padding: "1rem", background: "#fee2e2", border: "1px solid #ef4444", borderRadius: "6px" }}>
              <p style={{ color: "#991b1b", margin: 0, fontWeight: 600 }}>Caught: {error.message}</p>
              <button
                onClick={() => {
                  setCrashedDishId(null);
                  reset();
                }}
                style={{ marginTop: "0.5rem", padding: "0.3rem 0.7rem", background: "#dc2626", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
              >
                Reset Menu
              </button>
            </div>
          )}
        >
          <MenuWithDeliberateThrow onCrashDish={(id) => setCrashedDishId(id)} crashedId={crashedDishId} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
