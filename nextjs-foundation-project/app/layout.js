import "./globals.css";
import Link from "next/link";
import Providers from "./components/Providers";

export const metadata = {
  title: "Addis Eats - Authentic Ethiopian Dining",
  description: "Experience the vibrant flavors of Ethiopia right in Addis Ababa.",
};

/**
 * Root Layout is purely a SERVER COMPONENT.
 * It imports Providers (which accepts {children}) so layout.js itself does NOT
 * carry "use client" and does NOT bundle its markup into client JS.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="site-header">
            <Link href="/" className="logo-container">
              <span>🍲</span> Addis Eats
            </Link>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/menu" className="nav-link">Menu</Link>
              <Link href="/cart" className="nav-link">Cart</Link>
              <Link href="/checkout" className="nav-link">Checkout</Link>
            </nav>
          </header>

          <main className="site-main">
            {children}
          </main>

          <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} Addis Eats. All rights reserved. Bole Sub-City, Addis Ababa, Ethiopia.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
