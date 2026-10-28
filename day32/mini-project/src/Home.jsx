import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-screen">
      <section className="hero-banner">
        <h2>Experience the Rich Flavors of Addis Ababa</h2>
        <p>
          Handcrafted Ethiopian classics simmered to perfection with authentic berbere,
          niter kibbeh, and freshly baked injera.
        </p>
        <div className="hero-actions">
          <Link to="/menu" className="btn-hero-primary">
            Explore Full Menu 🍽️
          </Link>
          <Link to="/menu?category=Vegan" className="btn-hero-secondary">
            🌱 Fasting / Vegan Specials
          </Link>
        </div>
      </section>

      <section className="featured-highlights">
        <h3>Why Food Lovers Choose Addis Eats</h3>
        <div className="highlights-grid">
          <div className="highlight-card">
            <span className="hl-icon">🔥</span>
            <h4>Authentic Berbere</h4>
            <p>Directly sourced organic spice blends bringing genuine Ethiopian heat and depth.</p>
          </div>
          <div className="highlight-card">
            <span className="hl-icon">⚡</span>
            <h4>Fast TeleBirr Delivery</h4>
            <p>Seamless checkout across Bole, Kazanchis, Piazza, and all sub-cities.</p>
          </div>
          <div className="highlight-card">
            <span className="hl-icon">🌾</span>
            <h4>100% Teff Injera</h4>
            <p>Naturally gluten-free, fermented sourdough flatbread served fresh daily.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
