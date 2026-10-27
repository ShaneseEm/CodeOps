# Mini-Project · The Interactive Addis Eats Menu (Day 28)

Interactive React front end for Addis Eats with full state-driven UI.
Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 28 Mini-Project**.

## What Was Made Interactive (State-Driven UI)

1. **Category Filter State (`src/Menu.jsx` & `src/CategoryBar.jsx`)**:
   - `Menu` owns the `category` state (`useState("All")`).
   - `CategoryBar` is a stateless child receiving `selected` and `onSelect` callback.
   - Clicking a category chip updates state and highlights the active chip with CSS without reloading the page.
2. **Derived Filtered List (`src/DishList.jsx`)**:
   - Renders dishes filtered by selected category (`All`, `Main`, `Vegan`, `Grill`).
   - Stable `key={dish.id}` used on every list item.
   - Displays empty state fallback (`No dishes in this category yet.`) when no dishes match.
3. **Item Counter State (`src/Dish.jsx`)**:
   - Local `count` state on each dish card with an "+ Add" button, displaying a badge `×count`.
4. **Running Order Total (`src/App.jsx`)**:
   - An `orderTotal` state held in ETB.
   - Increases by the dish price each time "+ Add" is clicked.
5. **Controlled Form (`src/OrderForm.jsx`)**:
   - `name`, `phone`, and `area` stored in a single state object.
   - Updated immutably with object spread: `setForm(prev => ({ ...prev, [name]: value }))`.
6. **Live TeleBirr Validation (`src/OrderForm.jsx`)**:
   - Validates live with regex `/^(09\d{8}|\+2519\d{8})$/`.
   - Accepts both `0911223344` and `+251911223344` and rejects the rest.
   - Submit button is disabled until name, valid TeleBirr phone, and area are filled.

## Project Structure

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Order total state + root layout
├── Header.jsx        # Page header
├── Menu.jsx          # Category filter state container
├── CategoryBar.jsx   # Stateless category chip buttons
├── DishList.jsx      # Filtered list + empty state
├── Dish.jsx          # Card with count state + Add button
├── Card.jsx          # Reusable children wrapper
├── OrderForm.jsx     # Controlled form with TeleBirr regex validation
├── data.js           # Menu items data array (dishes)
├── App.css           # Responsive styling
└── index.css         # Global reset
```

## How to Run

```bash
npm install
npm run dev
# Open http://localhost:5173
```
