import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, description, onAdd }) {
  // Ex 1 — local count state; "Add" button increments it and notifies parent
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((c) => c + 1);
    if (onAdd) onAdd(price); // tells App to update the running total
  }

  return (
    <div className="dish">
      <h3>
        {name}
        {/* boolean guard — spicy === true prevents a stray 0 */}
        {spicy === true && <span className="badge-spicy">🌶 Spicy</span>}
        {/* Ex 1 — show count only when > 0 */}
        {count > 0 && <span className="badge-count">×{count}</span>}
      </h3>

      {description && <p className="dish-description">{description}</p>}

      <div className="dish-footer">
        <p className="dish-price">{price} {currency}</p>
        <button className="btn-add" onClick={handleAdd}>+ Add</button>
      </div>
    </div>
  );
}

Dish.propTypes = {
  name:        PropTypes.string.isRequired,
  price:       PropTypes.number.isRequired,
  currency:    PropTypes.string,
  spicy:       PropTypes.bool,
  description: PropTypes.string,
  onAdd:       PropTypes.func,
};

export default Dish;
