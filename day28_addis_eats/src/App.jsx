import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OrderForm from "./OrderForm";
import "./App.css";

function App() {
  // An order total held in state, updated from click handler and displayed in ETB
  const [orderTotal, setOrderTotal] = useState(0);

  function handleAddDish(price) {
    setOrderTotal((prev) => prev + price);
  }

  return (
    <div className="app">
      <Header />

      <main>
        {/* Menu component owns category state & renders CategoryBar + DishList */}
        <Menu onAddDish={handleAddDish} />

        {/* Order total displayed in ETB below the menu */}
        <div className="order-total">
          <span>Order Total</span>
          <strong>{orderTotal} ETB</strong>
        </div>

        {/* Controlled OrderForm with TeleBirr live validation */}
        <OrderForm />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · Interactive Menu · Module 3 Day 28 Mini-Project</p>
      </footer>
    </div>
  );
}

export default App;
