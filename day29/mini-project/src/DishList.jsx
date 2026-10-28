import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

/**
 * DishList Component
 * Renders loading, error, empty, or populated list with early returns.
 */
function DishList({ dishes = [], loading = false, error = null, onAddDish }) {
  // 1. Loading state early return
  if (loading) {
    return (
      <div className="status-box loading-box">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-state">Loading the menu...</p>
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

  // 3. Friendly empty note rather than an error
  if (!dishes || dishes.length === 0) {
    return (
      <div className="empty-state">
        <p>No dishes found matching your selection.</p>
      </div>
    );
  }

  // 4. Populated dish list render
  return (
    <div className="menu-grid">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            currency={dish.currency || "ETB"}
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
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool,
      description: PropTypes.string,
      currency: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  onAddDish: PropTypes.func,
};

export default DishList;
