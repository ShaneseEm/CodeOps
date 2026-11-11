import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

/**
 * DishCard - Server Component
 * Does NOT have "use client".
 * Renders HTML on the server and embeds AddToCartButton as an interactive leaf.
 */
export default function DishCard({ dish }) {
  return (
    <div className="dish-card">
      <div className="dish-header-row">
        <span className="dish-badge">{dish.category}</span>
        {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}
      </div>
      <div className="dish-content">
        <h3 className="dish-title">{dish.name}</h3>
        <p className="dish-desc">{dish.description}</p>
        <div className="dish-footer">
          <span className="dish-price">${dish.price?.toFixed(2)}</span>
          <div className="card-actions">
            <Link href={`/menu/${dish.id}`} className="view-btn">
              Details
            </Link>
            <AddToCartButton dish={dish} />
          </div>
        </div>
      </div>
    </div>
  );
}
