import { useState } from "react";
import PropTypes from "prop-types";

// Ex 1 — Dish has local count state + "Add" button
function Dish({ name, price, currency = "ETB", spicy = false, description, onAdd }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount((c) => c + 1);
    if (onAdd) onAdd(price);
  }

  return (
    <div className="dish">
      <h3>
        {name}
        {spicy === true && <span className="badge-spicy">🌶 Spicy</span>}
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
