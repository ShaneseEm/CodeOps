import { CartProvider } from "./CartProvider";
import { ThemeProvider, useTheme } from "./ThemeContext";
import Header from "./Header";
import Menu from "./Menu";
import CheckoutPanel from "./CheckoutPanel";
import "./App.css";

function AppContent() {
  const { theme } = useTheme();

  function handleScrollToCart() {
    const el = document.getElementById("checkout");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className={`app ${theme}-theme`}>
      <Header onOpenCart={handleScrollToCart} />

      <main className="main-content">
        {/* Menu component owns category fetch & dish grid */}
        <Menu />

        {/* Checkout panel connects directly to CartContext */}
        <CheckoutPanel />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · Week 1 Project: Addis Eats, Assembled · Module 3 Day 30</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
