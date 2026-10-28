import { useState, useEffect } from "react";

/**
 * Exercise 4: Check res.ok and throw a clear message so a 404 reaches your error branch.
 */
export default function Exercise4_ResOkCheck() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchUrl, setFetchUrl] = useState("/dishes.json");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(fetchUrl);
        // Requirement: check res.ok and throw informative error on 404/500
        if (!res.ok) {
          throw new Error(
            `Could not load the menu (${res.status} ${res.statusText || "Not Found"})`
          );
        }
        const data = await res.json();
        setDishes(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [fetchUrl]);

  return (
    <div className="exercise-card">
      <h3>Exercise 4: res.ok Check & User-Friendly 404 Error</h3>
      <div className="test-buttons">
        <button onClick={() => setFetchUrl("/dishes.json")}>
          Fetch Valid URL (/dishes.json)
        </button>
        <button onClick={() => setFetchUrl("/missing-file.json")}>
          Simulate 404 Error (/missing-file.json)
        </button>
      </div>

      {loading && <p className="status-loading">Loading the menu...</p>}
      {error && <p className="status-error">⚠️ {error}</p>}
      {!loading && !error && (
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              {dish.name} — {dish.price} ETB
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
