# Day 36 (Module 3 Day 14): Addis Eats Gets an API

## API Endpoints

| Method | Endpoint | Status Codes | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/dishes` | `200` | Returns full menu as JSON array |
| `GET` | `/api/dishes/[id]` | `200`, `404` | Returns single dish or `{ error, message, statusCode }` |
| `POST` | `/api/orders` | `201`, `400`, `422` | Creates an order; `422` returns `{ fieldErrors }` on invalid input |
| `GET` | `/api/orders` | `200` | Returns all orders (admin view) |

---

## Exercise Solutions

### Exercise 1: GET /api/dishes
- **File:** `app/api/dishes/route.js`
- Reads `public/dishes.json` and returns the full menu array as JSON with status `200`.
- **curl test:** `curl http://localhost:3000/api/dishes`

### Exercise 2: GET /api/dishes/[id] with 404 and standard error shape
- **File:** `app/api/dishes/[id]/route.js`
- Finds dish by `params.id`; if not found, returns `{ error, message, statusCode }` with HTTP `404`.
- **curl test:** `curl http://localhost:3000/api/dishes/999`
- **Expected 404:** `{ "error": "Not Found", "message": "Dish with id '999' does not exist.", "statusCode": 404 }`

### Exercise 3: POST /api/orders with Day 33 schema validation → 422
- **File:** `app/api/orders/route.js` and `lib/schema.js`
- Validates body against shared schema (`name`, `phone`, `address`, `items`).
- Returns `422` with `{ fieldErrors }` on invalid input, `201` with `{ order }` on success.
- **curl test for 422:**
  ```bash
  curl -X POST http://localhost:3000/api/orders \
    -H "Content-Type: application/json" \
    -d '{"name": "A", "phone": "12345", "address": "AB", "items": []}'
  ```

### Exercise 4: Point checkout form at the API and branch on status code
- **File:** `app/checkout/CheckoutForm.jsx`
- Form uses `useActionState(placeOrder, initialState)` to drive state; errors from `422` are mapped to `fieldErrors` per-field, identical to direct fetch + status branching on Day 33.

### Exercise 5: Rewrite submission as a Server Action (no fetch)
- **File:** `app/actions/orderActions.js`
- `placeOrder` is a `"use server"` async function that replaces `fetch('/api/orders')` entirely.
- Shares the same `validateOrder` schema from `lib/schema.js`.
- Called directly via `form action={formAction}` — no HTTP round-trip needed.

### Exercise 6: useActionState for pending flag + revalidatePath after success
- **Implementation:**
  ```js
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);
  ```
- Button is disabled and shows "Placing Order..." while `isPending` is `true`.
- On success, `revalidatePath('/checkout')` and `revalidatePath('/cart')` are called server-side so cached pages refresh immediately.

### Exercise 7: cancelOrder action with session + ownership check
- **File:** `app/actions/orderActions.js`
- `cancelOrder` reads `cookies()` server-side for `session_user_id`.
- Returns `401` message if no session; `403` message if order's `ownerId` ≠ session user.
- Authorization runs server-side and **cannot be bypassed** by hiding a UI button.

---

## Check Yourself Verification

1. **Does curl -X POST with an invalid phone number return 422 and named field errors?**
   Yes. `lib/schema.js` validates with regex `/^(\+251\s?9\d{8}|09\d{8})$/` and returns `{ fieldErrors: { phone: "..." } }` with HTTP `422`.

2. **Does a valid order return 201, and an unknown dish id 404 rather than an empty 200?**
   Yes. Valid POST to `/api/orders` → `201`. GET `/api/dishes/999` → `404` with standard error shape.

3. **Does the form still show field errors after you switched to the server action?**
   Yes. `useActionState` returns `state.fieldErrors` from the server action, which are rendered per-field in the form.

4. **Does a new order appear immediately on a cached orders page?**
   Yes. `revalidatePath('/checkout')` is called inside `placeOrder` on success.

5. **Calling cancelOrder with someone else's id from the console — what happens?**
   Returns `{ success: false, message: "Forbidden: You can only cancel your own orders." }`. Authorization runs on the server and cannot be bypassed.

6. **Can you find any secret value in the JavaScript the browser downloaded?**
   No. Session cookies are read only inside Server Actions and the checkout Server Component via `cookies()` from `next/headers` — never exposed to client code. `.env.local` is in `.gitignore`.
