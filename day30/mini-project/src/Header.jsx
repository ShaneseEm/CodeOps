import CartBadge from "./CartBadge";
import { useTheme } from "./ThemeContext";

export default function Header({ onOpenCart }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-top">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* CartBadge reads cart from context - no prop drilling! */}
        <CartBadge onOpenCart={onOpenCart} />
      </div>

      <div className="header-content">
        <h1>Addis Eats</h1>
        <p>Authentic Ethiopian Dishes · Week 1 Capstone Project</p>
      </div>
    </header>
  );
}
