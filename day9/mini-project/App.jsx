import { useState, lazy, Suspense, useCallback, useTransition } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./ui/Modal";

// Lazy-loaded routes behind Suspense skeleton
const Checkout = lazy(() => {
  return new Promise((resolve) => {
    // Simulate real-world network chunk fetch (800ms)
    setTimeout(() => {
      resolve(import("./src/components/Checkout"));
    }, 800);
  });
});

const Receipt = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./src/components/Receipt"));
    }, 600);
  });
});

// Initial sample dishes
const INITIAL_DISHES = [
  { id: 1, name: "Doro Wat", price: 380, category: "Traditional", description: "Spicy chicken stew slow-simmered in berbere with hard-boiled eggs and injera." },
  { id: 2, name: "Kitfo Special", price: 420, category: "Traditional", description: "Minced raw beef seasoned in niter kibbeh (clarified butter) and mitmita spices with ayib cottage cheese." },
  { id: 3, name: "Beyaynetu", price: 290, category: "Vegetarian", description: "Colorful vegan platter featuring misir wat, gomen, shiro, atkilt wat, and fosolia." },
  { id: 4, name: "Tibs Tegabino", price: 350, category: "Traditional", description: "Sizzling prime beef cubes stir-fried with rosemary, onions, and jalapenos." },
  { id: 5, name: "Shiro Mitten", price: 220, category: "Vegetarian", description: "Slow-cooked spiced chickpea stew served in a traditional clay tagellet." },
  { id: 6, name: "Mango Spris", price: 110, category: "Beverages", description: "Freshly squeezed layered avocado and mango juice with a lime twist." },
];

function RouteSkeleton({ name = "Route" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        padding: "2rem",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid #e5e7eb",
          borderTopColor: "#b84a2e",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          margin: "0 auto 1rem auto",
        }}
      />
      <h3 style={{ margin: "0 0 0.5rem 0", color: "#374151" }}>Loading {name} Chunk...</h3>
      <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}>
        Downloading code bundle asynchronously via React.lazy &amp; Suspense.
      </p>
    </div>
  );
}

export default function App() {
  // Navigation active view: 'menu' | 'checkout' | 'receipt'
  const [activeRoute, setActiveRoute] = useState("menu");
  const [, startTransition] = useTransition();

  // Cart state
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Doro Wat", price: 380, quantity: 1 },
  ]);

  // Deliberate error injection triggers
  const [corruptDishId, setCorruptDishId] = useState(null);
  const [crashCart, setCrashCart] = useState(false);

  // Modal inspection state
  const [activeModalDish, setActiveModalDish] = useState(null);
  const [lastTriggerButton, setLastTriggerButton] = useState(null);

  // Cart calculations
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = useCallback((dish) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === dish.id);
      if (existing) {
        return prev.map((i) => (i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  }, []);

  // Remove from cart handler
  const handleRemoveItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const navigateTo = (route) => {
    startTransition(() => {
      setActiveRoute(route);
    });
  };

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "1.5rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Resilient Application Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "1rem 1.5rem",
          backgroundColor: "#111827",
          color: "#ffffff",
          borderRadius: "10px",
          marginBottom: "1.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.8rem" }}>🇪🇹</span>
          <div>
            <h1 style={{ margin: 0, fontSize: "1.35rem", fontWeight: 700, color: "#f9fafb" }}>
              Addis Eats · Resilient Architecture
            </h1>
            <small style={{ color: "#9ca3af" }}>
              Module 3 Day 9 · Error Boundaries, Code Splitting &amp; Modal Portals
            </small>
          </div>
        </div>

        {/* Global Navigation */}
        <nav style={{ display: "flex", gap: "0.5rem" }}>
          <button
            type="button"
            onClick={() => navigateTo("menu")}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: activeRoute === "menu" ? "#b84a2e" : "#374151",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Menu Catalog
          </button>
          <button
            type="button"
            onClick={() => navigateTo("checkout")}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: "none",
              backgroundColor: activeRoute === "checkout" ? "#b84a2e" : "#374151",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Checkout ({totalItemCount})
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {activeRoute === "menu" && (
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", alignItems: "start" }}>
            {/* BOUNDARY 1: MENU CATALOG */}
            <section aria-labelledby="menu-heading">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h2 id="menu-heading" style={{ margin: 0, fontSize: "1.25rem", color: "#1f2937" }}>
                  Dishes &amp; Platters
                </h2>
                <small style={{ color: "#6b7280" }}>Isolated Boundary #1</small>
              </div>

              <ErrorBoundary
                name="Menu Service"
                onReset={() => setCorruptDishId(null)}
                fallback={({ error, reset }) => (
                  <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                      padding: "1.5rem",
                      background: "#fef2f2",
                      border: "2px solid #ef4444",
                      borderRadius: "10px",
                      textAlign: "left",
                    }}
                  >
                    <h3 style={{ margin: "0 0 0.5rem 0", color: "#991b1b" }}>
                      ⚠️ Menu Section Encountered an Error
                    </h3>
                    <p style={{ margin: "0 0 1rem 0", color: "#7f1d1d", fontSize: "0.9rem" }}>
                      {error.message}
                    </p>
                    <p style={{ margin: "0 0 1rem 0", color: "#4b5563", fontSize: "0.85rem" }}>
                      Notice: The Header navigation and the Cart panel on the right remain completely active and operational!
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCorruptDishId(null);
                        reset();
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Recover Menu
                    </button>
                  </div>
                )}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {INITIAL_DISHES.map((dish) => {
                    // Deliberate error condition inside one dish
                    if (corruptDishId === dish.id) {
                      throw new Error(
                        `Deliberate error: Data parsing corrupted for dish #${dish.id} ("${dish.name}").`
                      );
                    }

                    return (
                      <div
                        key={dish.id}
                        style={{
                          padding: "1rem",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          backgroundColor: "#ffffff",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                            <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.05rem", color: "#111827" }}>
                              {dish.name}
                            </h3>
                            <span style={{ fontWeight: 700, color: "#b84a2e", fontSize: "0.95rem" }}>
                              {dish.price} ETB
                            </span>
                          </div>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.15rem 0.5rem",
                              borderRadius: "999px",
                              backgroundColor: "#f3f4f6",
                              fontSize: "0.75rem",
                              color: "#4b5563",
                              marginBottom: "0.5rem",
                            }}
                          >
                            {dish.category}
                          </span>
                          <p style={{ margin: "0 0 0.75rem 0", fontSize: "0.82rem", color: "#6b7280" }}>
                            {dish.description}
                          </p>
                        </div>

                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                          <button
                            type="button"
                            onClick={(e) => {
                              setLastTriggerButton(e.currentTarget);
                              setActiveModalDish(dish);
                            }}
                            style={{
                              flex: 1,
                              padding: "0.45rem",
                              backgroundColor: "#f3f4f6",
                              border: "1px solid #d1d5db",
                              borderRadius: "6px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            View (Modal)
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToCart(dish)}
                            style={{
                              flex: 1,
                              padding: "0.45rem",
                              backgroundColor: "#b84a2e",
                              color: "#fff",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            + Add
                          </button>
                          <button
                            type="button"
                            title="Deliberately throw inside this dish to test ErrorBoundary"
                            onClick={() => setCorruptDishId(dish.id)}
                            style={{
                              padding: "0.45rem",
                              backgroundColor: "#fee2e2",
                              color: "#dc2626",
                              border: "1px solid #fca5a5",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              cursor: "pointer",
                            }}
                          >
                            💥
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ErrorBoundary>
            </section>

            {/* BOUNDARY 2: CART PANEL */}
            <aside aria-labelledby="cart-heading">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h2 id="cart-heading" style={{ margin: 0, fontSize: "1.25rem", color: "#1f2937" }}>
                  Your Order Cart
                </h2>
                <small style={{ color: "#6b7280" }}>Isolated Boundary #2</small>
              </div>

              <ErrorBoundary
                name="Cart Panel"
                onReset={() => setCrashCart(false)}
                fallback={({ error, reset }) => (
                  <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                      padding: "1.25rem",
                      background: "#fef2f2",
                      border: "2px solid #ef4444",
                      borderRadius: "10px",
                    }}
                  >
                    <h3 style={{ margin: "0 0 0.5rem 0", color: "#991b1b", fontSize: "1rem" }}>
                      ⚠️ Cart Calculations Fault
                    </h3>
                    <p style={{ margin: "0 0 0.75rem 0", color: "#7f1d1d", fontSize: "0.85rem" }}>
                      {error.message}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setCrashCart(false);
                        reset();
                      }}
                      style={{
                        padding: "0.4rem 0.8rem",
                        backgroundColor: "#dc2626",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      Recover Cart
                    </button>
                  </div>
                )}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "10px",
                    padding: "1.25rem",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}
                >
                  {crashCart ? (
                    (() => {
                      throw new Error("Deliberate Cart Exception: Currency accumulator overflow!");
                    })()
                  ) : cartItems.length === 0 ? (
                    <p style={{ margin: 0, color: "#6b7280", fontSize: "0.9rem" }}>Your cart is empty.</p>
                  ) : (
                    <>
                      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem 0" }}>
                        {cartItems.map((item) => (
                          <li
                            key={item.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "0.5rem 0",
                              borderBottom: "1px solid #f3f4f6",
                              fontSize: "0.88rem",
                            }}
                          >
                            <div>
                              <strong>{item.name}</strong> × {item.quantity}
                              <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>
                                {item.price * item.quantity} ETB
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                              style={{
                                background: "none",
                                border: "none",
                                color: "#ef4444",
                                cursor: "pointer",
                                fontSize: "1rem",
                              }}
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div
                        style={{
                          borderTop: "2px solid #e5e7eb",
                          paddingTop: "0.75rem",
                          marginBottom: "1rem",
                          display: "flex",
                          justifyContent: "space-between",
                          fontWeight: 700,
                          fontSize: "1.05rem",
                        }}
                      >
                        <span>Total:</span>
                        <span style={{ color: "#b84a2e" }}>{cartTotal} ETB</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => navigateTo("checkout")}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          backgroundColor: "#059669",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontWeight: 700,
                          cursor: "pointer",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Proceed to Checkout
                      </button>

                      <button
                        type="button"
                        onClick={() => setCrashCart(true)}
                        style={{
                          width: "100%",
                          padding: "0.35rem",
                          backgroundColor: "#fef2f2",
                          color: "#dc2626",
                          border: "1px dashed #fca5a5",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        }}
                      >
                        Deliberately Crash Cart Only 💥
                      </button>
                    </>
                  )}
                </div>
              </ErrorBoundary>
            </aside>
          </div>
        )}

        {/* LAZY SUSPENSE ROUTE 1: CHECKOUT */}
        {activeRoute === "checkout" && (
          <ErrorBoundary
            name="Checkout Route"
            fallback={({ error, reset }) => (
              <div role="alert" style={{ padding: "1.5rem", background: "#fef2f2", borderRadius: "8px" }}>
                <h3>Checkout Error: Failed to Load Gateway Chunk</h3>
                <p>{error.message}</p>
                <button onClick={reset}>Retry Checkout</button>
              </div>
            )}
          >
            <Suspense fallback={<RouteSkeleton name="Checkout & TeleBirr Gateway" />}>
              <Checkout
                cartTotal={cartTotal}
                cartItems={cartItems}
                onComplete={() => navigateTo("receipt")}
                onBack={() => navigateTo("menu")}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {/* LAZY SUSPENSE ROUTE 2: RECEIPT */}
        {activeRoute === "receipt" && (
          <ErrorBoundary
            name="Receipt Route"
            fallback={({ error, reset }) => (
              <div role="alert" style={{ padding: "1.5rem", background: "#fef2f2", borderRadius: "8px" }}>
                <h3>Receipt Generation Error</h3>
                <p>{error.message}</p>
                <button onClick={reset}>Try Again</button>
              </div>
            )}
          >
            <Suspense fallback={<RouteSkeleton name="Order Confirmation Receipt" />}>
              <Receipt cartTotal={cartTotal} onHome={() => navigateTo("menu")} />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      {/* MODAL DIALOG (Escape, Focus Trapping, Focus Return, createPortal) */}
      <Modal
        isOpen={Boolean(activeModalDish)}
        title={activeModalDish?.name || "Dish Overview"}
        onClose={() => setActiveModalDish(null)}
        triggerRef={{ current: lastTriggerButton }}
      >
        {activeModalDish && (
          <div>
            <p style={{ margin: "0 0 0.5rem 0", color: "#4b5563", fontSize: "0.95rem" }}>
              {activeModalDish.description}
            </p>
            <p style={{ margin: "0 0 1.25rem 0", fontWeight: 700, fontSize: "1.15rem", color: "#b84a2e" }}>
              Price: {activeModalDish.price} ETB
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setActiveModalDish(null)}
                style={{
                  padding: "0.55rem 1rem",
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close (Esc)
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(activeModalDish);
                  setActiveModalDish(null);
                }}
                style={{
                  padding: "0.55rem 1.25rem",
                  backgroundColor: "#b84a2e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Add to Cart ({activeModalDish.price} ETB)
              </button>
            </div>
          </div>
        )}
      </Modal>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
