import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartProvider";
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
 * App Component - Multi-Screen Routed Application
 *
 * Route Table:
 * - `/`               -> Home landing screen (index route)
 * - `/menu`           -> Shareable menu with query params (/menu?category=Vegan)
 * - `/menu/:id`       -> Dynamic dish detail page (useParams)
 * - `/cart`           -> Shopping cart view
 * - `/checkout`       -> Protected checkout screen guarded by <RequireAuth>
 * - `/login`          -> Authentication screen redirecting to destination
 * - `*`               -> 404 Not Found catch-all
 */
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
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
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
