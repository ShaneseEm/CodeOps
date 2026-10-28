import { useState, useEffect } from "react";

/**
 * Exercise 3: Add loading and error state, and render each one
 * with an early return before the list.
 */
export default function Exercise3_LoadingErrorState() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/dishes.json");
        const data = await res.json();
        setDishes(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Early return 1: Loading
  if (loading) return <p className="status-loading">Loading the menu...</p>;

  // Early return 2: Error
  if (error) return <p className="status-error">Error: {error}</p>;

  // Main return: The list
  return (
    <div className="exercise-card">
      <h3>Exercise 3: Loading & Error States with Early Returns</h3>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} — {dish.price} ETB
          </li>
        ))}
      </ul>
    </div>
  );
}
