import Link from "next/link";

/**
 * Exercise 4 & Requirement: Colocated DishList inside app/menu/
 * Demonstrably not routable because it is named DishList.jsx (not page.js).
 */
export default function DishList({ dishes = [], activeCategory = "All" }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-box">
        <p>No dishes found in category &quot;{activeCategory}&quot;.</p>
      </div>
    );
  }

  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <div key={dish.id} className="dish-card">
          <div className="dish-card-header">
            <h3>{dish.name}</h3>
            {dish.spicy && <span className="badge-spicy">🌶 Spicy</span>}
          </div>
          <p className="dish-desc">{dish.description}</p>
          <div className="dish-footer">
            <span className="dish-price">{dish.price} ETB</span>
            {/* Dynamic route link */}
            <Link href={`/menu/${dish.id}`} className="btn-detail">
              View Details ↗
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
