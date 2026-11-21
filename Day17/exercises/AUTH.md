# Addis Eats · Authentication & Route Security Architecture (`AUTH.md`)

**Course:** Prog M3-SQ10 S26 · Day 17 Exercises & Mini-Project  
**Topic:** Layered Defense-in-Depth, Route Matchers, Session Integrity & Ownership Scoping  

---

## 🛡️ Multi-Layer Security Model

In modern Next.js Full Stack architecture, security is never entrusted to a single layer. A request must prove its validity at every step of the lifecycle:

```
[ Incoming Request ]
        │
        ▼
[ Layer 1: Middleware / Edge Matcher ] ──► Fast redirect for signed-out visitors & static bypass
        │
        ▼
[ Layer 2: Server Component Page Guard ] ──► Session authentication before SSR / HTML streaming
        │
        ▼
[ Layer 3: Server Action / Mutation Guard ] ──► Strict ownership verification before database writes
        │
        ▼
[ Layer 4: Scoped Database Query ] ──► Inherent tenant isolation (WHERE user_id = session.user.id)
```

---

## 📊 Protected Route Registry & Proof Matrix

| Protected Route | Security Layers Enforced | What Each Layer Proves | Failure Response |
|---|---|---|---|
| **`/checkout`** | **1. Middleware**<br>**2. Server Component**<br>**3. Server Action** | • **Middleware:** Fast-rejects guests; saves `/checkout` in `?next=`.<br>• **Server Component:** Proves active session token hasn't expired or been revoked.<br>• **Server Action:** Proves caller owns the shopping cart before charging payment. | • 307 Redirect to `/sign-in?next=%2Fcheckout`<br>• 401 Unauthorized<br>• 403 Forbidden |
| **`/orders`** | **1. Middleware**<br>**2. Server Component**<br>**3. Scoped DB Query** | • **Middleware:** Prevents unauthenticated access.<br>• **Server Component:** Verifies valid cookie signature via `getSession()`.<br>• **DB Query:** Scoped to `session.user.id` so users only retrieve their own order records. | • 307 Redirect to `/sign-in?next=%2Forders`<br>• 401 Unauthorized<br>• Returns user's records only |
| **`/orders/:orderId`** | **1. Middleware**<br>**2. Server Component**<br>**3. Ownership Check** | • **Middleware:** Fast boundary check.<br>• **Server Component:** Validates HMAC session token.<br>• **Ownership Check:** Proves `order.userId === session.user.id` to prevent Insecure Direct Object Reference (IDOR). | • 307 Redirect<br>• 404 Not Found (or 403 Forbidden) if querying another customer's order ID |
| **`/kitchen`** | **1. Middleware**<br>**2. Server Component**<br>**3. Server-side RBAC Guard** | • **Middleware:** Blocks unauthenticated requests.<br>• **Server Component:** Refuses non-staff visitors server-side.<br>• **RBAC Guard:** Proves `session.user.role === 'staff'`. Not merely hidden in client navigation markup. | • 307 Redirect (Guest)<br>• 403 Forbidden (Customer trying to view kitchen tickets) |

---

## 🔒 Cookie Hardening Profile

The session cookie (`addis_session`) is signed cryptographically on the server and issued with strict transport headers:

- **`httpOnly: true`**: Completely hides the cookie from the JavaScript DOM (`document.cookie`), neutralizing token extraction via Cross-Site Scripting (XSS).
- **`secure: true`**: Restricts cookie transmission exclusively to encrypted HTTPS/TLS channels.
- **`sameSite: 'lax'`**: Prevents the cookie from being sent on cross-site subrequests (protecting against Cross-Site Request Forgery / CSRF) while preserving intended top-level navigation.
- **`maxAge: 86400` (24 Hours)**: Sensible order and delivery session lifespan. Expired tokens are rejected automatically by `getSession()`.
- **`path: '/'`**: Scopes cookie to the entire application domain.
