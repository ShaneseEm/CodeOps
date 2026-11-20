import { useState, useEffect } from "react";
import { fetcher } from "./lib/fetcher";

const ALL_DISHES = [
  { id: 1, name: "Doro Wat", category: "Traditional", price: 380, spicy: true, description: "Spicy simmered chicken stew with boiled egg and injera." },
  { id: 2, name: "Kitfo Special", category: "Traditional", price: 420, spicy: true, description: "Minced lean beef seasoned in niter kibbeh and mitmita." },
  { id: 3, name: "Beyaynetu", category: "Vegetarian", price: 290, spicy: false, description: "Colorful vegan combo platter on sourdough teff injera." },
  { id: 4, name: "Tibs Tegabino", category: "Grill", price: 350, spicy: false, description: "Sizzling beef cubes sautéed with onions and rosemary." },
  { id: 5, name: "Shiro Mitten", category: "Vegetarian", price: 220, spicy: false, description: "Spiced powdered chickpea tagellet served bubbling hot." },
  { id: 6, name: "Mango Spris", category: "Beverage", price: 110, spicy: false, description: "Fresh layered tropical mango and avocado juice." },
  { id: 7, name: "Zilzil Tibs", category: "Grill", price: 370, spicy: false, description: "Caramelized beef ribeye strips with awaze dipping sauce." },
  { id: 8, name: "Gomen Wat", category: "Vegetarian", price: 180, spicy: false, description: "Collard greens braised with garlic, ginger, and cardamom." },
];

const ORDER_LIFECYCLE = [
  { status: "Order Received", time: "12:01 PM", icon: "📝" },
  { status: "In the Kitchen", time: "12:04 PM", icon: "🍳" },
  { status: "Out for Delivery", time: "12:12 PM", icon: "🛵" },
  { status: "Delivered", time: "12:25 PM", icon: "🎉" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("search");

  // Feature 1: Order Status with Server fallbackData + 5s polling
  const [pollCount, setPollCount] = useState(0);
  const [orderStep, setOrderStep] = useState(0);
  const serverFallbackOrder = {
    id: "AE-9941",
    customer: "Bethelhem Alemayehu",
    items: "Doro Wat, Beyaynetu",
    total: 670,
  };

  useEffect(() => {
    // 5-second polling interval simulation (refreshInterval: 5000)
    const interval = setInterval(() => {
      setPollCount((c) => c + 1);
      setOrderStep((s) => (s < ORDER_LIFECYCLE.length - 1 ? s + 1 : s));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Feature 2: Debounced Search (300ms) with null key when empty
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [searchRequestsFired, setSearchRequestsFired] = useState(0);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDebouncedTerm("");
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm.trim());
      setIsDebouncing(false);
      setSearchRequestsFired((prev) => prev + 1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // SWR Key: null when empty (Conditional Fetching)
  const searchSWRKey = debouncedTerm ? `/api/dishes?search=${encodeURIComponent(debouncedTerm)}` : null;

  // Filtered dishes (simulating SWR query response with keepPreviousData)
  const filteredDishes = debouncedTerm
    ? ALL_DISHES.filter((d) => d.name.toLowerCase().includes(debouncedTerm.toLowerCase()))
    : ALL_DISHES;

  // Feature 3: Pagination with Query String (?page=1, ?page=2)
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(ALL_DISHES.length / pageSize);
  const pagedDishes = ALL_DISHES.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto", padding: "1.5rem", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#111827" }}>Addis Eats · Live Data Architecture</h1>
          <p style={{ margin: "0.25rem 0 0 0", color: "#6b7280", fontSize: "0.9rem" }}>
            Module 3 Day 16 · SWR Polling, Debounced Searching, and Paged Feeds
          </p>
        </div>

        <nav style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setActiveTab("search")}
            style={{
              padding: "0.45rem 0.85rem",
              background: activeTab === "search" ? "#b84a2e" : "#e5e7eb",
              color: activeTab === "search" ? "#fff" : "#374151",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Debounced Search
          </button>
          <button
            onClick={() => setActiveTab("order")}
            style={{
              padding: "0.45rem 0.85rem",
              background: activeTab === "order" ? "#b84a2e" : "#e5e7eb",
              color: activeTab === "order" ? "#fff" : "#374151",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Order Status (5s Poll)
          </button>
          <button
            onClick={() => setActiveTab("pagination")}
            style={{
              padding: "0.45rem 0.85rem",
              background: activeTab === "pagination" ? "#b84a2e" : "#e5e7eb",
              color: activeTab === "pagination" ? "#fff" : "#374151",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Paged Dish Catalog
          </button>
        </nav>
      </header>

      {/* TAB 1: DEBOUNCED SEARCH */}
      {activeTab === "search" && (
        <section style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Live Menu Search</h2>
            <span style={{ fontSize: "0.82rem", color: "#6b7280" }}>
              300ms debounce window · <code>keepPreviousData: true</code>
            </span>
          </div>

          <div style={{ position: "relative", marginBottom: "1rem" }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dishes (e.g. 'Doro', 'Kitfo', 'Tibs')..."
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                boxSizing: "border-box",
                outline: "none",
              }}
            />
            {isDebouncing && (
              <span style={{ position: "absolute", right: "12px", top: "12px", fontSize: "0.8rem", color: "#d97706", fontWeight: 600 }}>
                ⏳ Debouncing (300ms)...
              </span>
            )}
          </div>

          {/* Network Activity Telemetry */}
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "0.75rem", marginBottom: "1.25rem", fontSize: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
              <span>Typed Keystrokes: <strong>{searchTerm.length}</strong></span>
              <span style={{ color: "#059669", fontWeight: 700 }}>
                HTTP Requests Fired: {searchRequestsFired}
              </span>
            </div>
            <div>
              Active SWR Cache Key:{" "}
              <code style={{ color: searchSWRKey ? "#2563eb" : "#64748b" }}>
                {searchSWRKey ? searchSWRKey : "null (Conditional fetch suspended)"}
              </code>
            </div>
          </div>

          {/* Dish Results (Zero layout flashing) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {filteredDishes.length === 0 ? (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                No dishes found matching "{debouncedTerm}".
              </p>
            ) : (
              filteredDishes.map((dish) => (
                <div key={dish.id} style={{ padding: "0.85rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong style={{ fontSize: "1rem" }}>{dish.name}</strong>
                    <span style={{ color: "#b84a2e", fontWeight: 700 }}>{dish.price} ETB</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", background: "#f3f4f6", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                    {dish.category}
                  </span>
                  <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.82rem", color: "#6b7280" }}>
                    {dish.description}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* TAB 2: ORDER STATUS TRACKER */}
      {activeTab === "order" && (
        <section style={{ backgroundColor: "#ffffff", padding: "1.75rem", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Live Order Status (Auto-Polling)</h2>
            <span style={{ fontSize: "0.8rem", background: "#ecfdf5", color: "#059669", padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 700 }}>
              refreshInterval: 5000ms
            </span>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#166534" }}>
              <span>Order #{serverFallbackOrder.id}</span>
              <span>Total: {serverFallbackOrder.total} ETB</span>
            </div>
            <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.85rem", color: "#14532d" }}>
              Recipient: {serverFallbackOrder.customer} | Items: {serverFallbackOrder.items}
            </p>
            <small style={{ color: "#15803d", display: "block", marginTop: "0.4rem" }}>
              ✅ Rendered instantly via <code>fallbackData: serverFallbackOrder</code> with zero initial loading spinner!
            </small>
          </div>

          {/* Progress Timeline */}
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "1.5rem" }}>
            {ORDER_LIFECYCLE.map((step, idx) => {
              const isPassed = idx <= orderStep;
              return (
                <div key={step.status} style={{ textAlign: "center", flex: 1, zIndex: 1 }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isPassed ? "#059669" : "#e5e7eb",
                      color: isPassed ? "#fff" : "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.4rem auto",
                      fontWeight: 700,
                      transition: "background 0.3s ease",
                    }}
                  >
                    {step.icon}
                  </div>
                  <strong style={{ fontSize: "0.82rem", display: "block", color: isPassed ? "#065f46" : "#6b7280" }}>
                    {step.status}
                  </strong>
                  <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{step.time}</span>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "0.75rem", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", fontSize: "0.85rem", color: "#475569" }}>
            📡 <strong>Network Poll Telemetry:</strong> Polled {pollCount} times in background without blocking browser interaction.
          </div>
        </section>
      )}

      {/* TAB 3: PAGED DISH CATALOG */}
      {activeTab === "pagination" && (
        <section style={{ backgroundColor: "#ffffff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Paged Menu Catalog</h2>
            <span style={{ fontSize: "0.85rem", color: "#2563eb", fontWeight: 600 }}>
              URL Query: <code>?page={page}&amp;limit={pageSize}</code>
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {pagedDishes.map((dish) => (
              <div key={dish.id} style={{ padding: "0.85rem", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{dish.name}</strong>
                  <span style={{ color: "#b84a2e", fontWeight: 700 }}>{dish.price} ETB</span>
                </div>
                <span style={{ fontSize: "0.75rem", background: "#f3f4f6", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                  {dish.category}
                </span>
                <p style={{ margin: "0.4rem 0 0 0", fontSize: "0.82rem", color: "#6b7280" }}>
                  {dish.description}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: "0.5rem 1rem",
                background: page === 1 ? "#f3f4f6" : "#1f2937",
                color: page === 1 ? "#9ca3af" : "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              ← Previous Page
            </button>

            <span style={{ fontWeight: 600, color: "#374151" }}>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: "0.5rem 1rem",
                background: page === totalPages ? "#f3f4f6" : "#1f2937",
                color: page === totalPages ? "#94a3b8" : "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: 600,
                cursor: page === totalPages ? "not-allowed" : "pointer",
              }}
            >
              Next Page →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
