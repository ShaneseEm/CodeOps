import { useState } from "react";
import Exercise1_Fetcher from "./Exercise1_Fetcher";
import Exercise2_OrderStatusSWR from "./Exercise2_OrderStatusSWR";
import Exercise3_PollingInterval from "./Exercise3_PollingInterval";
import Exercise4_ServerFallbackData from "./Exercise4_ServerFallbackData";
import Exercise5_DebouncedSearch from "./Exercise5_DebouncedSearch";
import Exercise6_KeepPreviousData from "./Exercise6_KeepPreviousData";
import Exercise7_PagedDishList from "./Exercise7_PagedDishList";

const EXERCISES = [
  { id: 1, title: "1. Shared Fetcher", Component: Exercise1_Fetcher },
  { id: 2, title: "2. useSWR Order Status", Component: Exercise2_OrderStatusSWR },
  { id: 3, title: "3. Polling Interval", Component: Exercise3_PollingInterval },
  { id: 4, title: "4. Server fallbackData", Component: Exercise4_ServerFallbackData },
  { id: 5, title: "5. Debounced Search (null key)", Component: Exercise5_DebouncedSearch },
  { id: 6, title: "6. keepPreviousData", Component: Exercise6_KeepPreviousData },
  { id: 7, title: "7. Paged Dish List", Component: Exercise7_PagedDishList },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_Fetcher;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <header style={{ marginBottom: "1.5rem", borderBottom: "2px solid #e5e7eb", paddingBottom: "1rem" }}>
        <h2 style={{ margin: 0, color: "#1f2937" }}>Prog M3-SQ10 S26 / Day 16 — Exercises Hub</h2>
        <p style={{ margin: "0.4rem 0 0 0", color: "#6b7280" }}>
          Live SWR data caching, polling, debounced searching, and pagination solutions
        </p>
      </header>

      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            style={{
              padding: "0.5rem 0.85rem",
              borderRadius: "6px",
              border: activeEx === ex.id ? "2px solid #b84a2e" : "1px solid #d1d5db",
              background: activeEx === ex.id ? "#b84a2e" : "#fff",
              color: activeEx === ex.id ? "#fff" : "#374151",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>

      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <Current />
      </div>
    </div>
  );
}
