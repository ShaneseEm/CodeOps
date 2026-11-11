import Link from "next/link";
import NavigationButton from "./NavigationButton";

export default function HomePage() {
  return (
    <div className="home-container">
      <section className="hero-box">
        <h1>Welcome to Addis Eats on Next.js</h1>
        <p>
          Experience the power of Next.js App Router: file-system routing,
          colocated components, nested layouts, and server-side loading states.
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
          <span className="feat-icon">📁</span>
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
