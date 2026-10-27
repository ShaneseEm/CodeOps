import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function DishList({ dishes, onAddDish }) {
  if (dishes.length === 0) {
    return <p className="empty-state">No dishes in this category yet.</p>;
  }

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
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
  );
}

DishList.propTypes = {
  dishes:    PropTypes.arrayOf(
    PropTypes.shape({
      id:          PropTypes.number.isRequired,
      name:        PropTypes.string.isRequired,
      price:       PropTypes.number.isRequired,
      category:    PropTypes.string.isRequired,
      spicy:       PropTypes.bool,
      description: PropTypes.string,
    })
  ).isRequired,
  onAddDish: PropTypes.func.isRequired,
};

export default DishList;
