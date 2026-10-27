import { useState } from "react";
import PropTypes from "prop-types";
import { dishes } from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

const CATEGORIES = ["All", "Main", "Vegan", "Grill"];

export default function Menu({ onAddDish }) {
  // Menu owns the category state
  const [category, setCategory] = useState("All");

  // Derive filtered list from state
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
      <DishList dishes={shown} onAddDish={onAddDish} />
    </section>
  );
}

Menu.propTypes = {
  onAddDish: PropTypes.func.isRequired,
};
