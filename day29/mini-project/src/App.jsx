import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import "./App.css";

function App() {
  // Order total state in ETB, updated whenever user clicks "+ Add" on any dish
  const [orderTotal, setOrderTotal] = useState(0);

  function handleAddDish(price) {
    setOrderTotal((prev) => prev + price);
  }

  return (
    <div className="app">
      <Header />

      <main>
        {/* Menu component owns category fetch, search ref, loading/error states & DishList */}
        <Menu onAddDish={handleAddDish} />

        {/* Order total displayed in ETB */}
        <div className="order-total">
          <span>Order Total</span>
          <strong>{orderTotal} ETB</strong>
        </div>

        {/* Controlled OrderForm with TeleBirr live validation */}
        <OrderForm />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · The Menu That Loads Itself · Module 3 Day 29 Mini-Project</p>
      </footer>
    </div>
  );
}

export default App;
