# Mini-Project · Securing Addis Eats

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 17 Mini-Project*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day17/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/Day17/mini-project)

---

## 🎯 What We Built

A robust, production-grade defense-in-depth authentication and route security architecture for **Addis Eats**:
1. **End-to-End Session Lifecycle:** Cryptographically signed session cookies with `httpOnly`, `secure`, and `sameSite: 'lax'` flags, plus automatic sign-in, token expiration, and sign-out flows.
2. **Narrow Edge Middleware:** Matcher restricted to private routes (`/checkout/:path*`, `/orders/:path*`, `/kitchen/:path*`), gracefully bypassing static images (`/images/*`), CSS, and public pages.
3. **Open Redirect Defense:** URL sanitizer that validates the `next` query parameter, ensuring external URLs and protocol-relative exploits are deflected to `/menu`.
4. **Tenant Isolation & Ownership Scoping:** Queries bound to `session.user.id`, thwarting Insecure Direct Object References (IDOR) on both read queries and mutation server actions.
5. **Server-Side RBAC Guard:** `/kitchen` route restricted to `staff` role on the server, rejecting unauthorized customers with `HTTP 403 Forbidden` regardless of client UI state.

---

## ⚔️ The Three Attacks & Audit Logs

| Attack Vector | Simulated Action | Server Response | Stopping Line | Result |
|---|---|:---:|---|:---:|
| **1. Unauthenticated Console Action** | `updateOrderAddressAction(null, "AE-101", ...)` | `401 Unauthorized` | `serverActions.js:38`<br>`if (!session) return 401` | 🛡️ **BLOCKED** |
| **2. Cross-Account IDOR Write** | Signed in as `user_abebe`, updating order `AE-201` (owned by `user_chaltu`) | `403 Forbidden` | `serverActions.js:58`<br>`if (order.userId !== session.user.id) return 403` | 🛡️ **BLOCKED** |
| **3. External Open Redirect Phishing** | `/sign-in?next=https://evil-phishing-bank.et` | `200 OK` (Deflected to `/menu`) | `auth.js:68`<br>`if (!trimmed.startsWith('/') \|\| trimmed.startsWith('//'))` | 🛡️ **DEFLECTED** |

---

## ✅ "Check Yourself" Verification Answers

| Question | Verdict | Verification Details |
|---|:---:|---|
| **Can any script on your page read the session cookie?** | ❌ **No** | Cookie is configured with `httpOnly: true`. Browsers strictly isolate it from `document.cookie`, preventing XSS token theft. |
| **Does the orders page work if you change the id in the URL to someone else's?** | ❌ **No** | The database query is strictly scoped on the server: `SELECT * FROM orders WHERE id = $1 AND user_id = $session.user.id`. Querying another user's ID yields an empty result. |
| **Does middleware run on your image files? Check the matcher.** | ❌ **No** | Matcher is narrow: `['/checkout/:path*', '/orders/:path*', '/kitchen/:path*']`. Static images (`/images/kitfo.png`), favicons, and styles bypass middleware completely. |
| **Did all three attacks fail, and can you name the line that stopped each one?** | ✅ **Yes** | • Attack 1 stopped at `serverActions.js:38`<br>• Attack 2 stopped at `serverActions.js:58`<br>• Attack 3 stopped at `auth.js:68` |
| **Is the staff link merely hidden, or actually refused server-side?** | ✅ **Refused Server-Side** | The `/kitchen` server component loader verifies `session.user.role === 'staff'` and responds with `HTTP 403 Forbidden` for non-staff. |
| **Is your signing secret absent from the JavaScript the browser downloads?** | ✅ **Yes** | `SERVER_SIGNING_SECRET` is kept in server modules without `NEXT_PUBLIC_` prefixes, preventing it from ever being bundled into client JS. |

---

## 📁 Files Included

- `lib/auth.js`: Session signing, HMAC verification, hardened cookie attributes, and open-redirect validator.
- `lib/middleware.js`: Edge middleware router with narrow matcher and destination preserver.
- `lib/serverActions.js`: Scoped database queries and write actions with session and ownership verification.
- `App.jsx`: Full interactive application featuring role switcher, scoped order viewer, and 3 attacks testing suite.
- `AUTH.md`: Protected route registry, multi-layer security matrix, and attack breakdown.
- `README.md`: Architectural documentation, attack audit logs, and verification checklist.
