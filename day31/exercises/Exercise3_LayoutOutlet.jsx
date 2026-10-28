import { BrowserRouter, Routes, Route, NavLink, Outlet } from "react-router-dom";

/**
 * Exercise 3: Build a Layout with header, nav, Outlet and footer,
 * and nest the screens inside it.
 */
function LayoutPattern() {
  return (
    <div style={{ border: "2px solid #b84a2e", borderRadius: "8px", overflow: "hidden" }}>
      <header style={{ background: "#b84a2e", color: "#fff", padding: "1rem" }}>
        <h3>Shared App Header</h3>
        <nav style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <NavLink to="/ex3" end style={({ isActive }) => ({ color: isActive ? "#fbd38d" : "#fff" })}>
            Home
          </NavLink>
          <NavLink to="/ex3/menu" style={({ isActive }) => ({ color: isActive ? "#fbd38d" : "#fff" })}>
            Menu
          </NavLink>
        </nav>
      </header>

      {/* Outlet acts as placeholder for matched child route */}
      <main style={{ padding: "1.5rem", minHeight: "100px", background: "#fffaf7" }}>
        <Outlet />
      </main>

      <footer style={{ background: "#333", color: "#aaa", padding: "0.75rem", textAlign: "center", fontSize: "0.85rem" }}>
        Shared App Footer
      </footer>
    </div>
  );
}

export default function Exercise3_LayoutOutlet() {
  return (
    <div className="exercise-card">
      <h3>Exercise 3: Nested Routing with Layout & Outlet</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/ex3" element={<LayoutPattern />}>
            <Route index element={<p>👋 Welcome to the Nested Home screen!</p>} />
            <Route path="menu" element={<p>🍲 Welcome to the Nested Menu screen!</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
