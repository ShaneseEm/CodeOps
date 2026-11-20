import { useState } from "react";

/**
 * Exercise 6: Turn on keepPreviousData and watch the list stop flashing between searches.
 *
 * Without keepPreviousData:
 * - As soon as the user changes search key, data becomes undefined.
 * - Screen flashes an empty list or loading spinner, causing jarring layout shifts.
 *
 * With keepPreviousData: true:
 * - SWR continues returning the previous dataset while the new fetch runs.
 * - Smooth visual transition without flashing empty.
 */
const SAMPLE_DISHES = [
  { id: 1, name: "Doro Wat", category: "Traditional", price: 380 },
  { id: 2, name: "Kitfo Special", category: "Traditional", price: 420 },
  { id: 3, name: "Beyaynetu Vegan", category: "Vegetarian", price: 290 },
  { id: 4, name: "Tibs Tegabino", category: "Grill", price: 350 },
];

export default function Exercise6_KeepPreviousData() {
  const [keepPreviousData, setKeepPreviousData] = useState(true);
  const [activeQuery, setActiveQuery] = useState("All");
  const [isFetching, setIsFetching] = useState(false);
  const [displayedList, setDisplayedList] = useState(SAMPLE_DISHES);

  const simulateSearchChange = (query) => {
    setActiveQuery(query);
    setIsFetching(true);

    if (!keepPreviousData) {
      // Flashes empty!
      setDisplayedList([]);
    }

    // Simulate 600ms latency
    setTimeout(() => {
      if (query === "Vegan") {
        setDisplayedList(SAMPLE_DISHES.filter((d) => d.category === "Vegetarian"));
      } else if (query === "Grill") {
        setDisplayedList(SAMPLE_DISHES.filter((d) => d.category === "Grill"));
      } else {
        setDisplayedList(SAMPLE_DISHES);
      }
      setIsFetching(false);
    }, 600);
  };

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h3>Exercise 6: keepPreviousData: true (Zero Flash UI)</h3>
      <p style={{ color: "#666", fontSize: "0.9rem" }}>
        <code>keepPreviousData: true</code> preserves the currently rendered list during query key transitions.
      </p>

      {/* Toggle comparison switch */}
      <div style={{ marginBottom: "1rem", padding: "0.75rem", background: "#f1f5f9", borderRadius: "6px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={keepPreviousData}
            onChange={(e) => setKeepPreviousData(e.target.checked)}
          />
          <span>Enable <code>keepPreviousData: true</code></span>
        </label>
        <small style={{ color: keepPreviousData ? "#059669" : "#dc2626", display: "block", marginTop: "0.25rem" }}>
          {keepPreviousData
            ? "✅ UI retains stale data during fetch (Zero visual flashing)"
            : "❌ UI unmounts data during fetch (Causes list flashing & layout shift)"}
        </small>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {["All", "Vegan", "Grill"].map((cat) => (
          <button
            key={cat}
            onClick={() => simulateSearchChange(cat)}
            style={{
              padding: "0.4rem 0.8rem",
              background: activeQuery === cat ? "#1f2937" : "#e2e8f0",
              color: activeQuery === cat ? "#fff" : "#111",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {cat} Dishes
          </button>
        ))}
      </div>

      <div style={{ position: "relative", minHeight: "150px", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "0.75rem", background: "#fff" }}>
        {isFetching && (
          <div style={{ position: "absolute", top: "8px", right: "8px", fontSize: "0.75rem", background: "#fef3c7", color: "#92400e", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
            Fetching in background...
          </div>
        )}

        {displayedList.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "#94a3b8" }}>
            [Empty / Flashing Blank State]
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s ease" }}>
            {displayedList.map((dish) => (
              <li key={dish.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: "1px solid #f1f5f9" }}>
                <span>{dish.name} ({dish.category})</span>
                <strong>{dish.price} ETB</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
