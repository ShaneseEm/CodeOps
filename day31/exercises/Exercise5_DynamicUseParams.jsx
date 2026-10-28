import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

/**
 * Exercise 5: Add menu/:id, read the id with useParams,
 * and link each dish card to its own page.
 */
const SAMPLE_DISHES = [
  { id: 1, name: "Doro Wat", price: 240, description: "Spicy chicken stew with boiled egg" },
  { id: 2, name: "Shiro", price: 120, description: "Chickpea stew seasoned with garlic and ginger" },
  { id: 3, name: "Tibs", price: 280, description: "Sautéed beef with rosemary" },
];

function DishListScreen() {
  return (
    <div>
      <h4>Menu List</h4>
      <div style={{ display: "flex", gap: "1rem" }}>
        {SAMPLE_DISHES.map((dish) => (
          <div key={dish.id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <h5>{dish.name}</h5>
            <p>{dish.price} ETB</p>
            <Link to={`/ex5/menu/${dish.id}`}>View Details &rarr;</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function DishDetailScreen() {
  const { id } = useParams();
  const dish = SAMPLE_DISHES.find((d) => String(d.id) === String(id));

  if (!dish) {
    return (
      <div style={{ color: "red", padding: "1rem" }}>
        <p>Dish with ID &quot;{id}&quot; not found!</p>
        <Link to="/ex5/menu">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div style={{ border: "2px solid #b84a2e", padding: "1.5rem", borderRadius: "8px", background: "#fff" }}>
      <h4>Dynamic Detail for: {dish.name} (Param id: {id})</h4>
      <p>{dish.description}</p>
      <p>Price: <strong>{dish.price} ETB</strong></p>
      <Link to="/ex5/menu">&larr; Back to Dish List</Link>
    </div>
  );
}

export default function Exercise5_DynamicUseParams() {
  return (
    <div className="exercise-card">
      <h3>Exercise 5: Dynamic Routing with useParams (/menu/:id)</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/ex5/menu" element={<DishListScreen />} />
          <Route path="/ex5/menu/:id" element={<DishDetailScreen />} />
          <Route path="*" element={<DishListScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
