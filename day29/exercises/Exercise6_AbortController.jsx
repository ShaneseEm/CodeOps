import { useState, useEffect } from "react";

/**
 * Exercise 6: Abort the previous request in cleanup, then confirm
 * in the Network tab that it is cancelled.
 */
export default function Exercise6_AbortController() {
  const [category, setCategory] = useState("All");
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Main", "Vegan", "Grill"];

  useEffect(() => {
    // 1. Instantiate AbortController
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const url = `/dishes.json?category=${category}&t=${Date.now()}`;
        // 2. Pass signal to fetch
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Could not load menu");
        const all = await res.json();

        const filtered =
          category === "All" ? all : all.filter((d) => d.category === category);
        setDishes(filtered);
      } catch (err) {
        // 3. Ignore AbortError when cancelled by cleanup
        if (err.name === "AbortError") {
          console.log(`Fetch for ${category} aborted.`);
          return;
        }
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    // 4. Cleanup function cancels the in-flight request on category switch or unmount
    return () => {
      controller.abort();
    };
  }, [category]);

  return (
    <div className="exercise-card">
      <h3>Exercise 6: AbortController Request Cancellation in Cleanup</h3>
      <p>
        Click between categories quickly and inspect the Network tab: previous
        requests show status <code>(canceled)</code>!
      </p>
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

      {loading && <p className="status-loading">Loading dishes...</p>}
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
