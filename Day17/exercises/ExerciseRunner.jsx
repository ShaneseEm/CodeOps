import { useState } from "react";
import Exercise1_GetSession from "./Exercise1_GetSession";
import Exercise2_SecureCookie from "./Exercise2_SecureCookie";
import Exercise3_MiddlewareMatcher from "./Exercise3_MiddlewareMatcher";
import Exercise4_NextDestination from "./Exercise4_NextDestination";
import Exercise5_OpenRedirectDefense from "./Exercise5_OpenRedirectDefense";
import Exercise6_ScopedOrdersQuery from "./Exercise6_ScopedOrdersQuery";
import Exercise7_ServerSideKitchenStaff from "./Exercise7_ServerSideKitchenStaff";

const EXERCISES = [
  { id: 1, title: "1. getSession Helper", component: Exercise1_GetSession },
  { id: 2, title: "2. Secure Cookie Flags", component: Exercise2_SecureCookie },
  { id: 3, title: "3. Narrow Middleware Matcher", component: Exercise3_MiddlewareMatcher },
  { id: 4, title: "4. Preserve 'next' Parameter", component: Exercise4_NextDestination },
  { id: 5, title: "5. Open Redirect Defense", component: Exercise5_OpenRedirectDefense },
  { id: 6, title: "6. Scoped Orders Query", component: Exercise6_ScopedOrdersQuery },
  { id: 7, title: "7. Server-Side Staff /kitchen", component: Exercise7_ServerSideKitchenStaff },
];

export default function ExerciseRunner() {
  const [selectedId, setSelectedId] = useState(1);
  const ActiveComponent = EXERCISES.find((e) => e.id === selectedId).component;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem", fontFamily: "sans-serif", background: "#f8fafc", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
      <header style={{ marginBottom: "1.5rem", borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
        <h2 style={{ margin: "0 0 0.5rem 0", color: "#0f172a" }}>Prog M3-SQ10 S26 · Day 17: Exercises</h2>
        <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
          Authentication, Session Integrity, Middleware Routing, Open Redirect Defense & Server-Side RBAC.
        </p>
      </header>

      <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {EXERCISES.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setSelectedId(ex.id)}
            style={{
              padding: "0.45rem 0.8rem",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              background: selectedId === ex.id ? "#0f766e" : "#ffffff",
              color: selectedId === ex.id ? "#ffffff" : "#334155",
              fontWeight: selectedId === ex.id ? "bold" : "normal",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            {ex.title}
          </button>
        ))}
      </nav>

      <main style={{ background: "#ffffff", padding: "1.5rem", borderRadius: "8px", border: "1px solid #e2e8f0", minHeight: "340px" }}>
        <ActiveComponent />
      </main>
    </div>
  );
}
