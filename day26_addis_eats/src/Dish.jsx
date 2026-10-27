import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, description }) {
  return (
    <div className="dish">
      <h3>
        {name}
        {/* conditional spicy badge — boolean guard so no stray 0 renders */}
        {spicy === true && <span className="badge-spicy">🌶 Spicy</span>}
      </h3>
      {description && <p className="dish-description">{description}</p>}
      <p className="dish-price">
        {price} {currency}
      </p>
    </div>
  );
}

// PropTypes — name and price are required; spicy is optional
Dish.propTypes = {
  name:        PropTypes.string.isRequired,
  price:       PropTypes.number.isRequired,
  currency:    PropTypes.string,
  spicy:       PropTypes.bool,
  description: PropTypes.string,
};

export default Dish;
