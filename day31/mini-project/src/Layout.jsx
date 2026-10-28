import { NavLink, Link, Outlet } from "react-router-dom";
import { useCart } from "./CartProvider";
import { useTheme } from "./ThemeContext";
import { useAuth } from "./AuthContext";

/**
 * Layout Component
 * Provides shared Header with NavLinks, Outlet for nested child screens, and Footer.
 */
export default function Layout() {
  const { itemCount, total } = useCart();
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

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `cart-badge-btn ${isActive ? "active-route" : ""}`
              }
              aria-label="Shopping Cart"
            >
              <span className="cart-icon" aria-hidden="true">🛒</span>
              <span className="cart-count-pill">{itemCount}</span>
              {itemCount > 0 && <span className="cart-total-pill">{total} ETB</span>}
            </NavLink>
          </div>
        </div>

        {/* Navigation tabs using NavLink for active tab styling */}
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
            Cart ({itemCount})
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Checkout 🔒
          </NavLink>
        </nav>
      </header>

      {/* Main Outlet for nested screen content */}
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · Multi-Route Router App · Module 3 Day 31</p>
      </footer>
    </div>
  );
}
