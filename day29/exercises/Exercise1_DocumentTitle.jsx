import { useState, useEffect } from "react";

/**
 * Exercise 1: Set document.title to the number of dishes currently shown,
 * updating whenever the list changes.
 */
export default function Exercise1_DocumentTitle() {
  const [dishes, setDishes] = useState([
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Shiro", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
  ]);

  // Effect 1: Update document.title whenever dishes.length changes
  useEffect(() => {
    document.title = `Addis Eats (${dishes.length} dishes)`;
  }, [dishes.length]);

  return (
    <div className="exercise-card">
      <h3>Exercise 1: Dynamic document.title</h3>
      <p>Check the browser tab title: it shows the current dish count.</p>
      <ul>
        {dishes.map((dish) => (
          <li key={dish.id}>
            {dish.name} — {dish.price} ETB
          </li>
        ))}
      </ul>
      <div className="actions">
        <button
          onClick={() =>
            setDishes((prev) => [
              ...prev,
              { id: Date.now(), name: `Extra Dish #${prev.length + 1}`, price: 150 },
            ])
          }
        >
          + Add Dish (Updates Title)
        </button>
        <button
          onClick={() => setDishes((prev) => prev.slice(0, -1))}
          disabled={dishes.length === 0}
        >
          - Remove Dish
        </button>
      </div>
    </div>
  );
}
