function Dish({ name, price, description }) {
  return (
    <div className="dish">
      <h3>{name}</h3>
      {description && <p className="dish-description">{description}</p>}
      <p className="dish-price">{price} ETB</p>
    </div>
  );
}

export default Dish;
