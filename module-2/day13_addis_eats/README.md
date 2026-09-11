# Addis Eats · Authentic Ethiopian Food & Express Delivery 🇪🇹

**IBT College Canada CodeOps · Full Stack Software Development**  
**Module 2 Capstone Project — Day 23 Build**

---

## 📌 Project Overview

**Addis Eats** is a responsive single-page web application designed for browsing authentic Ethiopian cuisine, filtering menu specials, dynamically managing a shopping order cart with live ETB total calculations, persisting order state across page reloads via `localStorage`, and completing checkout through a validated TeleBirr payment gateway form.

---

## ✨ Key Features

- **Semantic HTML5 & Accessibility**: Fully accessible structure using `<header>`, `<main>`, `<section id="menu">`, `<aside id="cart">`, `<dialog>`, and `<footer>` with explicit `aria-label` attributes and keyboard accessibility.
- **Responsive Mobile-First CSS Grid**: Fluid reflowing menu grid utilizing `repeat(auto-fill, minmax(230px, 1fr))` with desktop sticky multi-column sidebar split layout (`@media (min-width: 850px)`).
- **Data-Driven State Architecture (`fetch` → `state` → `render`)**:
  - Asynchronous menu data fetch from `data/menu.json` with loading indicator, empty search feedback, and error retry state handling.
  - Pure state rendering pipeline (`render()`) driving UI completely from state object.
- **Live Search & Category Filtering**:
  - Instantly search by dish name, category, or ingredients as you type.
  - Filter menu items by category pills (*All Dishes*, *Main Dishes*, *Vegetarian*, *Breakfast*, *Beverages*).
- **Interactive Shopping Cart & Live ETB Totals**:
  - Add dishes, modify quantities (`+` / `-`), remove individual items, or clear cart.
  - Computed total payable calculated using `Array.prototype.reduce`.
- **LocalStorage Persistence**:
  - Order state automatically persists across browser tab reloads under key `addis_eats_cart`.
- **Validated TeleBirr Checkout Form**:
  - Accessible `<dialog>` modal with instant validation for name, delivery address, and Ethiopian TeleBirr phone numbers matching regex format (`09...` or `07...`).

---

## 📁 Repository Structure

```text
day23_addis_eats/
├── data/
│   └── menu.json        # Ethiopian restaurant menu dataset
├── index.html           # Accessible semantic HTML5 layout & modal markup
├── styles.css           # Mobile-first CSS grid layout with custom properties
├── app.js               # State-driven application logic & event handlers
└── README.md            # Project documentation & execution instructions
```

---

## 📊 Data Schema (`data/menu.json`)

Each menu record adheres to the following JSON structure:

```json
{
  "id": 1,
  "name": "Doro Wat",
  "category": "Main",
  "price": 380,
  "spicy": true,
  "description": "Slow-cooked tender chicken leg in rich berbere spice sauce...",
  "icon": "🍗",
  "rating": 4.9,
  "prepTime": "25 min"
}
```

---

## 🚀 How to Run the Application

Because the app utilizes the native browser `fetch` API to load `data/menu.json`, it must be served over HTTP/HTTPS (to comply with browser CORS policies for local files):

### Option 1: Using VS Code Live Server extension
1. Open the project folder in VS Code.
2. Right-click `index.html` and select **Open with Live Server**.

### Option 2: Using Python HTTP Server (Built-in)
Run the following command in your terminal inside the project directory:
```bash
python -m http.server 8000
```
Then open your browser to `http://localhost:8000`.

### Option 3: Using Node.js `npx serve`
```bash
npx serve .
```

---

## 📋 Capstone Requirements Checklist

- [x] **Semantic HTML5 structure** with accessible tags & labels (`<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `aria-label`).
- [x] **Responsive CSS layout** working on mobile, tablet, and desktop (CSS Grid `auto-fill` + `minmax`).
- [x] **JSON data model** loaded asynchronously into `state.dishes` with loading & error handling.
- [x] **State-driven `render()`** where UI updates directly from state object, never storing state in DOM.
- [x] **At least two interactions**: Live search input + category filtering + interactive cart (add/update/remove).
- [x] **Computed summary total** using `Array.prototype.reduce`.
- [x] **Persistence via LocalStorage** (`saveCart` and `loadCart`).
- [x] **Validated TeleBirr form** with phone regex validation (`^(09|07)\d{8}$`).

---

## 📜 License & Property

Property of IBT College Canada CodeOps · Full Stack Software Development Program.
