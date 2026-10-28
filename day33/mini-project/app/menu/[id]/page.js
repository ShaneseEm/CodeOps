import Link from "next/link";
import { notFound } from "next/navigation";
import dishesData from "../../../public/dishes.json";

/**
 * Exercise 3 & 7: Dynamic route /menu/[id] reading params directly from props
 * Calls notFound() if ID does not exist, triggering not-found.js
 */
export default function DishDetailPage({ params }) {
  const { id } = params;

  // Find dish in data array
  const dish = dishesData.find((d) => String(d.id) === String(id));

  // Exercise 7 Requirement: call notFound() for a dish id that does not exist
  if (!dish) {
    notFound();
  }

  return (
    <div className="dish-detail-container">
      <nav className="breadcrumb">
        <Link href="/menu">← Back to Menu</Link>
      </nav>

      <div className="detail-card">
        <div className="detail-header">
          <h2>{dish.name}</h2>
          <span className="cat-badge">{dish.category}</span>
          {dish.spicy && <span className="spicy-pill">🌶 Spicy Berbere</span>}
        </div>

        <p className="detail-desc">{dish.description}</p>

        <div className="detail-meta">
          <div className="meta-item">
            <span className="meta-label">Route Parameter:</span>
            <span className="meta-val"><code>[id] = {id}</code></span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Price:</span>
            <span className="meta-val price-val">{dish.price} ETB</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Accompaniment:</span>
            <span className="meta-val">Fresh Teff Injera</span>
          </div>
        </div>

        <div className="detail-actions">
          <Link href="/cart" className="btn-primary">
            Add to Cart & View Cart 🛒
          </Link>
          <Link href="/menu" className="btn-secondary">
            Keep Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
