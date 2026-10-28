import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Addis Eats · Layouts & Rendering Strategies",
  description: "Advanced Next.js App Router: Nested Layouts, ISR, SSG, SSR & Suspense",
};

/**
 * Root Layout
 * Owns <html> and <body> tags, imports global CSS, renders universal header and footer.
 */
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
                <span className="brand-sub">Layouts & Rendering Strategies</span>
              </div>
              <nav className="nav-links">
                <Link href="/" className="nav-link">Home</Link>
                <Link href="/menu" className="nav-link">Menu (ISR)</Link>
                <Link href="/cart" className="nav-link">Cart (Static)</Link>
                <Link href="/checkout" className="nav-link">Checkout (Dynamic)</Link>
              </nav>
            </div>
          </header>

          <main className="main-content">
            {children}
          </main>

          <footer className="footer">
            <p>© 2026 Addis Eats · Module 3 Day 34 (Day 12)</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
