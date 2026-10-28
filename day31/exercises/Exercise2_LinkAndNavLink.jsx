import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";

/**
 * Exercise 2: Replace every anchor with Link, and the active tab with NavLink.
 *
 * EXPLANATION:
 * - Traditional `<a href="...">` causes a full page reload, dropping React state and reconnecting to the server.
 * - `<Link to="...">` intercepts navigation, preventing browser reloads and performing client-side pushState.
 * - `<NavLink to="...">` automatically detects whether its target matches the current URL and applies
 *   an `isActive` boolean flag to easily style the active tab.
 */
function NavDemo() {
  return (
    <nav style={{ display: "flex", gap: "0.8rem", padding: "0.8rem", background: "#f8f9fa", borderRadius: "8px" }}>
      {/* Static link */}
      <Link to="/" style={{ padding: "0.4rem 0.8rem", textDecoration: "none", color: "#666" }}>
        Brand (Link)
      </Link>

      {/* NavLinks with active highlighting */}
      <NavLink
        to="/ex2-home"
        style={({ isActive }) => ({
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 700,
          background: isActive ? "#b84a2e" : "transparent",
          color: isActive ? "#fff" : "#333",
        })}
      >
        Home Tab
      </NavLink>

      <NavLink
        to="/ex2-menu"
        style={({ isActive }) => ({
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 700,
          background: isActive ? "#b84a2e" : "transparent",
          color: isActive ? "#fff" : "#333",
        })}
      >
        Menu Tab
      </NavLink>

      <NavLink
        to="/ex2-cart"
        style={({ isActive }) => ({
          padding: "0.4rem 0.8rem",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: 700,
          background: isActive ? "#b84a2e" : "transparent",
          color: isActive ? "#fff" : "#333",
        })}
      >
        Cart Tab
      </NavLink>
    </nav>
  );
}

export default function Exercise2_LinkAndNavLink() {
  return (
    <div className="exercise-card">
      <h3>Exercise 2: Replacing Anchors with Link and NavLink</h3>
      <BrowserRouter>
        <NavDemo />
        <Routes>
          <Route path="/ex2-home" element={<p style={{ padding: "1rem" }}>🏠 Home Tab is active.</p>} />
          <Route path="/ex2-menu" element={<p style={{ padding: "1rem" }}>🍽️ Menu Tab is active.</p>} />
          <Route path="/ex2-cart" element={<p style={{ padding: "1rem" }}>🛒 Cart Tab is active.</p>} />
          <Route path="*" element={<p style={{ padding: "1rem" }}>Click any tab above to see NavLink active styling.</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
