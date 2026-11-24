# AUTH.md — Security & Authorization Architecture

**Project:** Addis Eats Next.js Advanced Project (Day 45 / Day 20 Capstone)  
**Institution:** IBT College Canada · CodeOps Full Stack Development  
**Standard:** Defense-in-Depth (Middleware + Server Page + Server Action + Scoped Query)  

---

## 1. Decision One: Who May See What

| Route | Who | Protected By | What That Layer Proves |
|---|---|---|---|
| **`/menu`** | Everyone | Nothing | It is public, and should stay indexable by search engines. |
| **`/orders`** | The owner | Middleware + page + scoped query | Signed in, session token valid, and strictly scoped to their own user records. |
| **`/checkout`** | Any signed-in user | Middleware + page | Signed in with an active session cookie — the write action checks ownership and payment validation. |
| **`/kitchen`** | Staff only | Page + role check in every action | Signed in, and cryptographically verified as carrying `role === "staff"`. |

---

## 2. Multi-Layer Defense-in-Depth Rationale

A single layer is never sufficient in a production full-stack application:

```
User Request
     │
     ▼
[ Layer 1: Edge Middleware ] ────────► Proves a session cookie exists; fast 307 redirect
     │
     ▼
[ Layer 2: Server Page SSR ] ────────► Verifies cryptographic HMAC signature; decrypts user payload
     │
     ▼
[ Layer 3: Server Action / Mutation ] ► Re-authenticates caller; proves write ownership
     │
     ▼
[ Layer 4: Scoped Database Query ] ──► WHERE user_id = session.id (Zero cross-tenant leakage)
```

1. **Middleware (`middleware.js`):**
   - **What it proves:** Fast edge gate proving an authentication cookie is present.
   - **What it does NOT prove:** It cannot safely verify database state or business write permissions.
2. **Server Page Check (`app/orders/page.js`):**
   - **What it proves:** Cryptographically verifies the signed cookie using `SERVER_SIGNING_SECRET`. Prevents forged cookies from rendering HTML.
3. **Server Action Check (`app/actions/orderActions.js`):**
   - **What it proves:** Guarantees that mutations (e.g. `cancelOrder`, `placeOrder`) cannot be triggered by malicious POST requests bypassing the UI. Re-validates the session on every write.
4. **Scoped Database Query (`lib/db.js`):**
   - **What it proves:** Guarantees that queries are strictly parameterized with `WHERE user_id = session.id`. Never accepts a user ID passed in client payloads.

---

## 3. The Three Attacks & Verified Line Stops

These three attacks are executed live from the browser developer console:

### Attack 1: Calling a write action while signed out
```javascript
// From browser console:
await cancelOrder("ord_812");
// Result: Refused with 401 Unauthorized, zero crash
```
- **Stopping Code (`app/actions/orderActions.js`):**
  ```javascript
  const session = await getSession();
  if (!session || !session.user) {
    throw new Error("Unauthorized: Active session required to cancel orders."); // Line 24
  }
  ```
- **Verification:** Action refuses execution immediately; no database mutation occurs.

---

### Attack 2: Signed in, attempting to cancel another customer's order
```javascript
// Signed in as user "usr_chala_101", attempting to cancel order owned by "usr_almaz_202":
await cancelOrder("ord_almaz_555");
// Result: Refused on ownership, not on session (403 Forbidden)
```
- **Stopping Code (`app/actions/orderActions.js`):**
  ```javascript
  const order = await getOrderById(orderId);
  if (!order || order.userId !== session.user.id) {
    throw new Error("Forbidden: You do not have ownership of this order."); // Line 38
  }
  ```
- **Verification:** Even though the session is completely valid, the write ownership check rejects the action because `order.userId !== session.user.id`.

---

### Attack 3: Crafted Open-Redirect Phishing Link
```
GET /signin?next=https://malicious-phishing-site.com
// Expected: Lands on '/', not on malicious-phishing-site.com
```
- **Stopping Code (`app/actions/authActions.js` & `middleware.js`):**
  ```javascript
  // Open redirect defense: only allow relative paths beginning with a single '/'
  const safeNext = next && next.startsWith('/') && !next.startsWith('//') ? next : '/'; // Line 18
  redirect(safeNext);
  ```
- **Verification:** External URLs and protocol-relative URLs (`//evil.com`) are stripped and redirected safely to the root domain (`/`).

---

## 4. Staff-Only RBAC Guard (`/kitchen`)

- **Page Check:**
  ```javascript
  const session = await getSession();
  if (session?.user?.role !== "staff") {
    redirect("/menu?error=unauthorized");
  }
  ```
- **Action Guard:**
  ```javascript
  export async function updateKitchenStatus(orderId, status) {
    const session = await getSession();
    if (!session || session.user.role !== "staff") {
      throw new Error("Forbidden: Staff privileges required.");
    }
    // Update status...
  }
  ```
