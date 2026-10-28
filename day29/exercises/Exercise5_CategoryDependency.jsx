import { useState, useEffect } from "react";

/**
 * Exercise 5: Add the category to the dependency array so switching category
 * refetches the list.
 */
export default function Exercise5_CategoryDependency() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Main", "Vegan", "Grill"];

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        // Query param ensures DevTools Network tab shows each distinct fetch
        const url =
          category === "All"
            ? "/dishes.json"
            : `/dishes.json?category=${category}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Could not load menu");
        const allDishes = await res.json();

        const filtered =
          category === "All"
            ? allDishes
            : allDishes.filter((d) => d.category === category);
        setDishes(filtered);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [category]); // Category in dependency array: switching triggers new fetch!

  return (
    <div className="exercise-card">
      <h3>Exercise 5: Category Dependency Array Refetch</h3>
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            className={cat === category ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p className="status-loading">Loading {category} dishes...</p>}
      {error && <p className="status-error">Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              {dish.name} ({dish.category}) — {dish.price} ETB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
