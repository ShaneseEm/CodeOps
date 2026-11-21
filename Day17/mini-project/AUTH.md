# Securing Addis Eats · Multi-Layer Auth Architecture (`AUTH.md`)

**Course:** Prog M3-SQ10 S26 · Day 17 Mini-Project  
**Topic:** End-to-End Authentication, Narrow Matchers, Ownership Verification & Attack Analysis  

---

## 🏛️ Security Philosophy: Defense in Depth

In Addis Eats, security is implemented as multiple redundant boundaries. If an attacker bypasses the edge or calls a server action directly without passing through UI components, the internal server layers enforce authentication and ownership checks.

```
Request Pathway:
Client / Browser / Console
           │
           ▼
[ Layer 1: Edge Middleware ] ──────────────► Narrow Matcher Filter & Fast Redirect
           │
           ▼
[ Layer 2: Server Component SSR ] ────────► Session Verification before HTML render
           │
           ▼
[ Layer 3: Server Action / Mutation ] ────► Direct Session & Ownership Verification
           │
           ▼
[ Layer 4: Database Query Engine ] ───────► Scoped to session.user.id (WHERE user_id = $1)
```

---

## 🛡️ Protected Route Registry & Proof Matrix

| Protected Route | Layers Enforced | What Each Layer Proves | Failure Response |
|---|---|---|---|
| **`/checkout`** | **1. Middleware**<br>**2. Server Component**<br>**3. Server Action** | • **Middleware:** Fast-rejects unauthenticated guests and encodes `/checkout` into `?next=`.<br>• **Server Component:** Ensures session cookie has a valid cryptographic HMAC signature and is unexpired.<br>• **Server Action:** Verifies the user owns the shopping cart before dispatching payments. | • 307 Redirect to `/sign-in?next=%2Fcheckout`<br>• 401 Unauthorized<br>• 403 Forbidden |
| **`/orders`** | **1. Middleware**<br>**2. Server Component**<br>**3. Scoped DB Query** | • **Middleware:** Intercepts unsigned visitors.<br>• **Server Component:** Calls `getSession()` to verify token authenticity.<br>• **DB Query:** Strictly scoped `WHERE user_id = session.user.id`, ensuring zero cross-tenant data leaks. | • 307 Redirect to `/sign-in?next=%2Forders`<br>• 401 Unauthorized<br>• Returns empty array for invalid session |
| **`/orders/:orderId`** | **1. Middleware**<br>**2. Server Component**<br>**3. Write Ownership** | • **Middleware:** Restricts edge access.<br>• **Server Component:** Validates cookie.<br>• **Write Ownership:** Proves `order.userId === session.user.id` before allowing address updates or cancellations. | • 307 Redirect<br>• 404 Not Found (or 403 Forbidden) if another user's order is requested |
| **`/kitchen`** | **1. Middleware**<br>**2. Server Component**<br>**3. RBAC Role Guard** | • **Middleware:** Intercepts guests.<br>• **Server Component:** Evaluates `session.user.role === 'staff'`.<br>• **RBAC Guard:** Server-enforced rejection (not merely hidden in UI navigation markup). | • 307 Redirect (Guest)<br>• 403 Forbidden (Non-staff customer) |

---

## ⚔️ The Three Attacks & Countermeasures

### Attack 1: Call a Server Action from the Console While Signed Out
- **Vector:** An unauthenticated visitor opens devtools console and executes `updateOrderAddressAction(null, "AE-101", "Hacker Street")`.
- **Result:** ❌ **BLOCKED** with `HTTP 401 Unauthorized`.
- **Stopping Line:** `lib/serverActions.js:38`
  ```js
  const session = getSession(cookieValue);
  if (!session) {
    return { success: false, status: 401, error: "401 Unauthorized: Session required" };
  }
  ```

### Attack 2: Sign In as One Account and Call Action with Another Account's Order ID (IDOR)
- **Vector:** Signed in as `user_abebe`, the attacker inspects traffic and calls `updateOrderAddressAction(session, "AE-201", "Stolen Drop Address")`, targeting an order owned by `user_chaltu`.
- **Result:** ❌ **BLOCKED** with `HTTP 403 Forbidden`.
- **Stopping Line:** `lib/serverActions.js:58`
  ```js
  if (targetOrder.userId !== session.user.id) {
    return { success: false, status: 403, error: "403 Forbidden: Ownership violation" };
  }
  ```

### Attack 3: Craft a Sign-in Link with `next` Pointing at an External Site (Open Redirect)
- **Vector:** Phishing attacker sends victim a crafted link: `/sign-in?next=https://evil-phishing-addis-bank.com/steal`.
- **Result:** ❌ **BLOCKED & DEFLECTED**. The URL sanitizer detects the external protocol/hostname and falls back safely to `/menu`.
- **Stopping Line:** `lib/auth.js:68`
  ```js
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("\\")) {
    return "/menu";
  }
  ```

---

## 🎯 "Check Yourself" Verification Answers

1. **Can any script on your page read the session cookie?**  
   **No.** The cookie is set with `httpOnly: true`. Browsers forbid JavaScript execution contexts (including malicious XSS payloads) from accessing `document.cookie`.

2. **Does the orders page work if you change the id in the URL to someone else's?**  
   **No.** Queries never look up records solely by URL request ID. The database query is strictly scoped to `session.user.id`, returning 404/empty for any records belonging to another customer.

3. **Does middleware run on your image files? Check the matcher.**  
   **No.** The narrow matcher is defined as:
   ```js
   export const config = {
     matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*'],
   };
   ```
   Static image requests like `/images/kitfo.png`, stylesheets, and fonts bypass middleware execution entirely.

4. **Did all three attacks fail, and can you name the line that stopped each one?**  
   **Yes, all three attacks failed.**  
   - Attack 1 stopped at `lib/serverActions.js:38`.
   - Attack 2 stopped at `lib/serverActions.js:58`.
   - Attack 3 stopped at `lib/auth.js:68`.

5. **Is the staff link merely hidden, or actually refused server-side?**  
   **Actually refused server-side.** The server loader inspects `session.user.role !== 'staff'` and responds with `HTTP 403 Forbidden`. Even if a customer crafts direct HTTP requests to `/kitchen`, the server refuses access.

6. **Is your signing secret absent from the JavaScript the browser downloads?**  
   **Yes.** The `SERVER_SIGNING_SECRET` is kept in server-side environment variables and files without any `NEXT_PUBLIC_` prefix, preventing it from ever being bundled into client JavaScript.
