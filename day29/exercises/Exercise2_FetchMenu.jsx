import { useState, useEffect } from "react";

/**
 * Exercise 2: Move the menu array into public/dishes.json and fetch it
 * in useEffect with an empty dependency array.
 */
export default function Exercise2_FetchMenu() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      const res = await fetch("/dishes.json");
      const data = await res.json();
      setDishes(data);
    }

    loadMenu();
  }, []); // Empty dependency array -> runs once on mount

  return (
    <div className="exercise-card">
      <h3>Exercise 2: Fetch Menu from public/dishes.json</h3>
      <p>Loaded {dishes.length} dishes from external JSON on mount:</p>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            <strong>{dish.name}</strong> ({dish.category}) — {dish.price} ETB
          </li>
        ))}
      </ul>
    </div>
  );
}
