import Dish from "./Dish";

const menu = [
  { id: 1, name: "Doro Wat",  price: 240, description: "Spicy Ethiopian chicken stew with boiled egg." },
  { id: 2, name: "Shiro",     price: 120, description: "Smooth chickpea flour stew, a daily staple." },
  { id: 3, name: "Tibs",      price: 280, description: "Sautéed beef or lamb with vegetables and spices." },
  { id: 4, name: "Injera",    price:  40, description: "Spongy sourdough flatbread — the base of every meal." },
  { id: 5, name: "Kitfo",     price: 320, description: "Minced beef seasoned with mitmita and kibbe." },
  { id: 6, name: "Ful",       price:  80, description: "Spiced fava beans — a classic Addis breakfast." },
];

function Menu() {
  return (
    <section className="menu">
      <h2>Our Menu</h2>
      <div className="menu-grid">
        {menu.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
            description={dish.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Menu;
