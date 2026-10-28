import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import { AuthProvider } from "./AuthContext";

import Layout from "./Layout";
import Home from "./Home";
import Menu from "./Menu";
import DishDetail from "./DishDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import RequireAuth from "./RequireAuth";
import NotFound from "./NotFound";

import "./App.css";

/**
 * App Component - Day 32
 *
 * Notice: CartProvider has been completely REMOVED!
 * Cart state lives in a persistent Zustand store (`cartStore.js`).
 * Removing CartProvider breaks nothing, and components subscribe
 * via narrow selectors (`useCartStore(selector)`).
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="cart" element={<Cart />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
