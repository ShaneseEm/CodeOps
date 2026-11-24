import "./globals.css";
import Link from "next/link";
import Providers from "./components/Providers";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://addiseats.et";

/**
 * Exercise 1 & Mini-Project Root Layout Metadata:
 * - metadataBase set to production URL (enables absolute URL resolution for all og:image and canonical tags)
 * - title template: '%s | Addis Eats' with default fallback title
 * - Human-readable default description
 * - Site-wide OpenGraph and Twitter card defaults
 */
export const metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Addis Eats - Authentic Ethiopian Dining & Fast Delivery",
    template: "%s | Addis Eats",
  },
  description:
    "Experience authentic Ethiopian culinary traditions in Addis Ababa. Freshly simmered Doro Wat, sizzling clay pot Tibs, lean seasoned Kitfo, and wholesome vegan fasting Beyaynetu delivered directly to your doorstep.",
  keywords: [
    "Addis Eats",
    "Ethiopian Food",
    "Addis Ababa Restaurant",
    "Doro Wat",
    "Kitfo",
    "Tibs",
    "Injera",
    "Vegan Fasting Food",
    "Food Delivery Addis Ababa",
  ],
  authors: [{ name: "Addis Eats Culinary Team", url: APP_URL }],
  creator: "Addis Eats",
  publisher: "Addis Eats Ethiopia",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ET",
    url: APP_URL,
    siteName: "Addis Eats",
    title: "Addis Eats - Authentic Ethiopian Dining & Fast Delivery",
    description:
      "Experience authentic Ethiopian culinary traditions in Addis Ababa. Freshly simmered Doro Wat, sizzling Tibs, lean seasoned Kitfo, and wholesome vegan fasting platters.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Addis Eats - Authentic Ethiopian Dining & Delivery in Addis Ababa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats - Authentic Ethiopian Dining & Fast Delivery",
    description:
      "Experience authentic Ethiopian culinary traditions in Addis Ababa. Freshly simmered Doro Wat, sizzling Tibs, lean seasoned Kitfo, and fasting platters.",
    images: ["/opengraph-image"],
    creator: "@AddisEatsET",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
              <span>🇪🇹</span> Addis Eats
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
