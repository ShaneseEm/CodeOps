import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

/**
 * DishList Component
 * Handles early returns for loading, error, and empty state.
 */
function DishList({ dishes = [], loading = false, error = null, cartItems = [], onAddDish }) {
  // 1. Loading state early return
  if (loading) {
    return (
      <div className="status-box loading-box">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-state">Loading delicious Ethiopian dishes...</p>
      </div>
    );
  }

  // 2. Error state early return
  if (error) {
    return (
      <div className="status-box error-box" role="alert">
        <p className="err">⚠️ {error}</p>
      </div>
    );
  }

  // 3. Friendly empty note
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes found matching your selection.</p>
      </div>
    );
  }

  // Count instances of each dish in cart
  const countsById = cartItems.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            id={dish.id}
            name={dish.name}
            price={dish.price}
            currency={dish.currency || "ETB"}
            spicy={dish.spicy}
            description={dish.description}
            count={countsById[dish.id] || 0}
            onAdd={onAddDish}
          />
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string,
      spicy: PropTypes.bool,
      description: PropTypes.string,
      currency: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  cartItems: PropTypes.array,
  onAddDish: PropTypes.func.isRequired,
};

export default DishList;
