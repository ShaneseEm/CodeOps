import { useState } from "react";
import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";
import CategoryBar from "./CategoryBar";

// categories derived from data — "All" first
const CATEGORIES = ["All", "Main", "Breakfast", "Drinks"];

function Menu({ dishes, onAddDish }) {
  // Ex 2 — category state lives in Menu
  // Ex 3 — passed down to CategoryBar via selected + onSelect
  const [category, setCategory] = useState("All");

  // Ex 4 — filter from state; keep empty-state early return from Day 27
  const shown =
    category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

  return (
    <section className="menu-section">
      {/* Ex 3 — CategoryBar gets selected and onSelect (lifted state) */}
      <CategoryBar
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
      />

      {shown.length === 0 ? (
        <p className="empty-state">No {category} dishes found.</p>
      ) : (
        <div className="menu-grid">
          {/* Ex 4+5 — filtered list, stable key, onAdd passed to Dish */}
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
  dishes:     PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.number.isRequired,
      name:        PropTypes.string.isRequired,
      price:       PropTypes.number.isRequired,
      category:    PropTypes.string.isRequired,
      spicy:       PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
  onAddDish:  PropTypes.func.isRequired,
};

export default Menu;
