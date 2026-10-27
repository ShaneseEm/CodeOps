import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ dishes, category }) {
  // 1. filter by category (if "All" show everything)
  const shown =
    category === "All"
      ? dishes
      : dishes.filter((d) => d.category === category);

  // 2. early return — empty state when no dishes match
  if (shown.length === 0) {
    return (
      <section className="menu">
        <p className="empty-state">No {category} dishes found.</p>
      </section>
    );
  }

  // 3. render filtered list — keyed by stable id, not index
  return (
    <section className="menu">
      <div className="menu-grid">
        {shown.map((dish) => (
          <Card key={dish.id}>
            <Dish
              name={dish.name}
              price={dish.price}
              spicy={dish.spicy}
              description={dish.description}
            />
          </Card>
        ))}
      </div>
    </section>
  );
}

Menu.propTypes = {
  dishes:   PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.number.isRequired,
      name:        PropTypes.string.isRequired,
      price:       PropTypes.number.isRequired,
      category:    PropTypes.string.isRequired,
      spicy:       PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
  category: PropTypes.string.isRequired,
};

export default Menu;
