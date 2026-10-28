import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats · Next.js App Router",
  description: "Authentic Ethiopian Cuisine ported to Next.js App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="header">
            <div className="header-container">
              <div className="brand">
                <Link href="/" className="brand-logo">
                  🇪🇹 Addis Eats
                </Link>
                <span className="brand-sub">Next.js App Router</span>
              </div>
              <nav className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/menu" className="nav-link">Menu</Link>
                <Link href="/cart" className="nav-link">Cart</Link>
                <Link href="/checkout" className="nav-link">Checkout</Link>
              </nav>
            </div>
          </header>

          <main className="main-content">
            {children}
          </main>

          <footer className="footer">
            <p>© 2026 Addis Eats on Next.js · App Router · Module 3 Day 33</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
