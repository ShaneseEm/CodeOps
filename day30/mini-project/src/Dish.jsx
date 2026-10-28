import { memo } from "react";
import PropTypes from "prop-types";

/**
 * Dish Component - Memoized with React.memo
 *
 * PERFORMANCE JUSTIFICATION:
 * Addis Eats displays a grid of dishes that can grow large.
 * In earlier versions, whenever a dish was added to the cart, or whenever
 * the user typed into the search bar, the parent Menu re-rendered, causing
 * ALL Dish items to execute their render functions.
 * By wrapping Dish in `React.memo` and combining it with a stable `useCallback`
 * for `onAdd`, individual Dish cards will ONLY re-render if their own props
 * (name, price, count) change!
 */
function Dish({
  id,
  name,
  price,
  currency = "ETB",
  spicy = false,
  description,
  count = 0,
  onAdd,
}) {
  return (
    <div className="dish">
      <h3>
        {name}
        {spicy === true && <span className="badge-spicy">🌶 Spicy</span>}
        {count > 0 && <span className="badge-count">×{count}</span>}
      </h3>
      {description && <p className="dish-description">{description}</p>}
      <div className="dish-footer">
        <p className="dish-price">
          {price} {currency}
        </p>
        <button
          type="button"
          className="btn-add"
          onClick={() =>
            onAdd({
              id,
              name,
              price,
              category: spicy ? "Spicy" : "Traditional",
            })
          }
        >
          + Add to Cart
        </button>
      </div>
    </div>
  );
}

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  description: PropTypes.string,
  count: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
};

// Memoized export
export default memo(Dish);
