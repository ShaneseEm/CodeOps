# Addis Eats — React (Module 3 · Day 28)

Interactive React front end for Addis Eats with `useState`, controlled forms, and validation.
Built for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js · Day 28**.

## Features Implemented (All 7 Day 28 Exercises)

1. **Item Counter State (`Dish.jsx`)**: Local `count` state on each dish card with an "+ Add" button, displaying a badge `×count`.
2. **Category State (`Menu.jsx`)**: Category chips rendered from an array (`All`, `Main`, `Breakfast`, `Drinks`) with active highlighting.
3. **Lifted State (`CategoryBar.jsx`)**: `CategoryBar` component receives `selected` and `onSelect` callback via props.
4. **Category Filtering (`Menu.jsx`)**: Derived dish list filtered based on active category state, preserving the empty-state fallback.
5. **Running Order Total (`App.jsx`)**: Running order total kept in state, updated on each dish addition, and displayed in ETB.
6. **Controlled Delivery Form (`DeliveryForm.jsx`)**: Full Name, TeleBirr Number, and Delivery Area managed in a single state object with a single `handleChange` handler.
7. **TeleBirr Validation (`DeliveryForm.jsx`)**: Regex validation (`/^09\d{8}$/`) for Ethiopian mobile numbers; submit button is disabled until the number and fields are valid.

## Tech Stack

- React 19 + Vite
- prop-types for component prop validation
- Pure CSS with custom responsive layout

## How to Run

```bash
cd day28_addis_eats
npm install
npm run dev
# Open http://localhost:5173
```
