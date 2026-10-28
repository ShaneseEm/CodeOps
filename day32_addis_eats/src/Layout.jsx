import { NavLink, Link, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";
import { useTheme } from "./ThemeContext";
import { useAuth } from "./useAuth";

/**
 * Layout Component
 *
 * Implements:
 * - Does NOT subscribe to the cart store directly!
 * - When items are added/removed, only `CartBadge` updates — Header & Layout do NOT re-render.
 */
export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className={`app ${theme}-theme`}>
      <header className="header">
        <div className="header-top">
          <div className="brand-group">
            <Link to="/" className="brand-title">
              🇪🇹 Addis Eats
            </Link>
            <span className="brand-tagline">Authentic Ethiopian Cuisine</span>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>

            {user ? (
              <div className="user-badge">
                <span>👋 {user.username}</span>
                <button type="button" className="btn-logout" onClick={logout}>
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login-link">
                Sign In
              </Link>
            )}

            {/* CartBadge uses a narrow selector so Layout doesn't re-render on cart changes */}
            <CartBadge />
          </div>
        </div>

        <nav className="main-nav" aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Menu
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Cart
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Checkout 🔒
          </NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · Zustand Store with Narrow Selectors · Module 3 Day 32</p>
      </footer>
    </div>
  );
}
