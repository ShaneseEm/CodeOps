import { useState } from "react";
import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";
import CategoryBar from "./CategoryBar";

const CATEGORIES = ["All", "Main", "Breakfast", "Drinks"];

function Menu({ dishes, onAddDish }) {
  // Ex 2 — category state lives in Menu
  // Ex 3 — passed down to CategoryBar
  const [category, setCategory] = useState("All");

  // Ex 4 — filter from category state; empty state from Day 27 preserved
  const shown =
    category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

  return (
    <section className="menu-section">
      <CategoryBar
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />

      {shown.length === 0 ? (
        <p className="empty-state">No {category} dishes found.</p>
      ) : (
        <div className="menu-grid">
          {shown.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                description={dish.description}
                onAdd={onAddDish}
              />
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

Menu.propTypes = {
  dishes:    PropTypes.array.isRequired,
  onAddDish: PropTypes.func.isRequired,
};

export default Menu;
