import { useState } from "react";
import Header from "./Header";
import Menu from "./Menu";
import DeliveryForm from "./DeliveryForm";
import menu from "./data";
import "./App.css";

function App() {
  // Ex 5 — running order total in state
  const [orderTotal, setOrderTotal] = useState(0);

  // passed down to Menu → Dish; called whenever user clicks "+ Add"
  function handleAddDish(price) {
    setOrderTotal((prev) => prev + price);
  }

  return (
    <div className="app">
      <Header />

      <main>
        {/* Ex 2-4 — Menu owns category state; CategoryBar is inside Menu */}
        <Menu dishes={menu} onAddDish={handleAddDish} />

        {/* Ex 5 — running total displayed below the menu */}
        <div className="order-total">
          <span>Order Total</span>
          <strong>{orderTotal} ETB</strong>
        </div>

        {/* Ex 6-7 — controlled delivery form with TeleBirr validation */}
        <DeliveryForm />
      </main>

      <footer className="footer">
        <p>© 2026 Addis Eats · React + Vite · Module 3 Day 28</p>
      </footer>
    </div>
  );
}

export default App;
