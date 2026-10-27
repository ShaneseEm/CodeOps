# Addis Eats — React (Day 26)

A **static** React front end for the Addis Eats food-ordering app, built as the
Day 26 mini-project for **IBT College Canada CodeOps · Module 3 · Frontend: React & Next.js**.

## What it is

- Displays an Ethiopian restaurant menu using **React components** and **JSX**.
- A reusable `Dish` component receives `name`, `price`, and `description` via **props**.
- A `Header` component sits at the top of the page.
- The menu is rendered from a **data array** using `Array.map()`, with a unique `key` on every item.
- No interactivity yet — state and event handling come on Day 27.

## Tech stack

| Tool | Purpose |
|------|---------|
| React 19 | UI library |
| Vite | Build tool & dev server |
| CSS (no framework) | Custom Ethiopian-themed styles |

## How to run

```bash
# 1. Install dependencies (first time only)
npm install

# 2. Start the development server
npm run dev
# → open http://localhost:5173
```

## Project structure

```
src/
├── main.jsx      # Entry point — mounts <App /> into index.html
├── App.jsx       # Root component: composes Header + Menu
├── Header.jsx    # Page header component
├── Menu.jsx      # Renders the dish array with map + keys
├── Dish.jsx      # Reusable dish card (name, price, description props)
├── App.css       # All component styles
└── index.css     # Global reset
```

## Day 26 checklist

- [x] Project created with Vite (`npm create vite@latest`)
- [x] Runs with `npm run dev`, no console errors
- [x] `Dish` component takes `name` and `price` props (destructured)
- [x] Menu rendered from an array with `map`, each item has a unique `key`
- [x] `Header` component composed inside `App`
- [x] Valid JSX throughout: one root per component, `className` not `class`
- [x] `node_modules` excluded via `.gitignore`
