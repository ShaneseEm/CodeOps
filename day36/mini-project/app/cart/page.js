import Link from "next/link";
import dishesData from "../../public/dishes.json";

export default function CartPage() {
  const sampleCart = dishesData.slice(0, 2);
  const total = sampleCart.reduce((s, d) => s + d.price, 0);

  return (
    <div className="cart-page">
      <h2>🛒 Your Addis Eats Cart</h2>
      <p style={{ color: "#666", marginBottom: "1.5rem" }}>
        Review your items before proceeding to secure TeleBirr checkout.
      </p>

      <div className="cart-layout">
        <ul className="cart-list">
          {sampleCart.map((item) => (
            <li key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong> ({item.category})
              </div>
              <span className="cart-item-price">{item.price} ETB</span>
            </li>
          ))}
        </ul>

        <div className="cart-summary">
          <h3>Order Total</h3>
          <p className="total-number">{total} ETB</p>
          <Link href="/checkout" className="btn-primary" style={{ display: "block", textAlign: "center" }}>
            Proceed to Checkout 🔒
          </Link>
        </div>
      </div>
    </div>
  );
}
