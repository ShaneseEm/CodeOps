import Link from "next/link";
import NavigationButton from "./NavigationButton";

export const metadata = {
  title: "Home - Authentic Ethiopian Cuisine & Delivery",
  description:
    "Taste traditional Ethiopian flavors in Addis Ababa. Explore our fresh breakfast, lunch, and dinner menus crafted with heritage spices, slow-simmered wots, and warm teff injera.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Addis Eats - Authentic Ethiopian Cuisine & Fast Delivery",
    description:
      "Taste traditional Ethiopian flavors in Addis Ababa. Explore our fresh breakfast, lunch, and dinner menus crafted with heritage spices and warm injera.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-box">
        <h1>Addis Eats: Authentic Ethiopian Cuisine & Fast Delivery</h1>
        <p>
          Experience traditional Ethiopian culinary heritage in Addis Ababa.
          Explore our signature slow-simmered wots, sizzling clay pot tibs,
          and vibrant vegan beyaynetu fasting platters.
        </p>

        <div className="hero-buttons">
          <Link href="/menu" className="btn-primary">
            Explore Menu (Link)
          </Link>
          <Link href="/menu?category=Vegan" className="btn-secondary">
            🌱 Vegan Specials
          </Link>
          {/* Client component using useRouter */}
          <NavigationButton target="/menu" label="Go to Menu via useRouter" />
        </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <span className="feat-icon">🍲</span>
          <h3>File-System Routing</h3>
          <p>Every folder with a <code>page.js</code> creates a clean, predictable URL route.</p>
        </div>
        <div className="feature-card">
          <span className="feat-icon">⚡</span>
          <h3>Declarative States</h3>
          <p>Built-in <code>loading.js</code>, <code>error.js</code>, and <code>not-found.js</code> boundaries.</p>
        </div>
        <div className="feature-card">
          <span className="feat-icon">📦</span>
          <h3>Colocation</h3>
          <p>Components sit right beside their routes without accidentally creating public URLs.</p>
        </div>
      </section>
    </div>
  );
}
