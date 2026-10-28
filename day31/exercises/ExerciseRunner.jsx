import { useState } from "react";
import Exercise1_BrowserRouter from "./Exercise1_BrowserRouter";
import Exercise2_LinkAndNavLink from "./Exercise2_LinkAndNavLink";
import Exercise3_LayoutOutlet from "./Exercise3_LayoutOutlet";
import Exercise4_IndexAndCatchAll from "./Exercise4_IndexAndCatchAll";
import Exercise5_DynamicUseParams from "./Exercise5_DynamicUseParams";
import Exercise6_UseSearchParams from "./Exercise6_UseSearchParams";
import Exercise7_RequireAuth from "./Exercise7_RequireAuth";

const EXERCISES = [
  { id: 1, title: "1. BrowserRouter", Component: Exercise1_BrowserRouter },
  { id: 2, title: "2. Link & NavLink", Component: Exercise2_LinkAndNavLink },
  { id: 3, title: "3. Layout & Outlet", Component: Exercise3_LayoutOutlet },
  { id: 4, title: "4. Index & Catch-All", Component: Exercise4_IndexAndCatchAll },
  { id: 5, title: "5. useParams /menu/:id", Component: Exercise5_DynamicUseParams },
  { id: 6, title: "6. useSearchParams", Component: Exercise6_UseSearchParams },
  { id: 7, title: "7. RequireAuth Guard", Component: Exercise7_RequireAuth },
];

export default function ExerciseRunner() {
  const [activeEx, setActiveEx] = useState(1);
  const Current = EXERCISES.find((e) => e.id === activeEx)?.Component || Exercise1_BrowserRouter;

  return (
    <div style={{ padding: "1.5rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>Day 31 (Module 3 Day 6) — Exercises Hub</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", margin: "1rem 0" }}>
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActiveEx(ex.id)}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: activeEx === ex.id ? "2px solid #b84a2e" : "1px solid #ccc",
              background: activeEx === ex.id ? "#b84a2e" : "#fff",
              color: activeEx === ex.id ? "#fff" : "#333",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {ex.title}
          </button>
        ))}
      </div>
      <div style={{ background: "#fff", padding: "1.5rem", borderRadius: "10px", border: "1px solid #e8c9a0" }}>
        <Current />
      </div>
    </div>
  );
}
