import Link from "next/link";
import dishesData from "../../../public/dishes.json";

/**
 * DishList Component - Rendered inside Suspense
 */
export default async function DishList({ category = "All" }) {
  // Simulate data fetch delay so streaming can be visibly observed
  await new Promise((resolve) => setTimeout(resolve, 80));

  const filtered =
    category === "All"
      ? dishesData
      : dishesData.filter(
          (d) => d.category.toLowerCase() === category.toLowerCase()
        );

  return (
    <div className="dish-grid">
      {filtered.map((dish) => (
        <div key={dish.id} className="dish-card">
          <div className="dish-card-header">
            <h4>{dish.name}</h4>
            {dish.spicy && <span className="badge-spicy">🌶 Spicy</span>}
          </div>
          <p className="dish-desc">{dish.description}</p>
          <div className="dish-footer">
            <span className="dish-price">{dish.price} ETB</span>
            <Link href={`/menu/${dish.id}`} className="btn-detail">
              View Dish ↗
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
