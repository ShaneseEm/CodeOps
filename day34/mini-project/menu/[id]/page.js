import Link from "next/link";
import { notFound } from "next/navigation";
import dishesData from "../../../../public/dishes.json";

/**
 * Exercise 5: Add generateStaticParams to the dish route and count the pages the build produces.
 *
 * STRATEGY: Static Site Generation (SSG).
 * Pre-generates an HTML page for EVERY dish at build time based on returned IDs.
 */
export async function generateStaticParams() {
  return dishesData.map((dish) => ({
    id: String(dish.id),
  }));
}

export default function DishDetailPage({ params }) {
  const { id } = params;
  const dish = dishesData.find((d) => String(d.id) === String(id));

  if (!dish) {
    notFound();
  }

  return (
    <div className="dish-detail-card">
      <div className="detail-header">
        <h2>{dish.name}</h2>
        <span className="cat-badge">{dish.category}</span>
        {dish.spicy && <span className="badge-spicy">🌶 Spicy</span>}
      </div>

      <p className="detail-desc">{dish.description}</p>

      <div className="detail-meta">
        <div className="meta-box">
          <span className="meta-label">Generation Strategy</span>
          <span className="meta-val">SSG (generateStaticParams)</span>
        </div>
        <div className="meta-box">
          <span className="meta-label">Dish Price</span>
          <span className="meta-val price-val">{dish.price} ETB</span>
        </div>
        <div className="meta-box">
          <span className="meta-label">Static Route</span>
          <span className="meta-val">/menu/{id}</span>
        </div>
      </div>

      <div className="detail-actions">
        <Link href="/cart" className="btn-primary">
          Add to Cart & View Cart 🛒
        </Link>
        <Link href="/menu" className="btn-secondary">
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}
