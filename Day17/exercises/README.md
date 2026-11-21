# Prog M3-SQ10 S26 · Day 17: Exercises (Securing Addis Eats)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day17/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/Day17/exercises)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day17/exercises

### Day 17 Exercises Solutions & Security Implementation:

1. `getSession` Verification Helper (lib/auth.js & Exercise1_GetSession.jsx):
   - Cryptographically verifies session token HMAC signature against server-only secret `SERVER_SIGNING_SECRET`.
   - Validates timestamp expiration (`session.exp > Date.now()`).
   - Returns sanitized user object `{ id, name, email, role }` or `null` on tamper or expiry.

2. Secure Cookie Configuration on Sign-in (Exercise2_SecureCookie.jsx):
   - Configured Set-Cookie headers with `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, and `maxAge: 86400` (24h).
   - Proved that `document.cookie` scripts cannot read the session cookie, neutralizing token theft via XSS.

3. Middleware with Narrow Matcher (lib/middleware.js & Exercise3_MiddlewareMatcher.jsx):
   - Configured narrow matcher: `matcher: ['/checkout/:path*', '/orders/:path*', '/kitchen/:path*']`.
   - Verified that static images (`/images/kitfo.png`), assets, and public routes (`/menu`) completely bypass middleware execution.

4. Preserve & Return to `next` Destination (Exercise4_NextDestination.jsx):
   - Middleware intercepts unauthorized requests and issues `307 Redirect` to `/sign-in?next=${encodeURIComponent(pathname)}`.
   - Post-authentication flow extracts and routes the user back to their intended target (`/checkout`).

5. Open Redirect Defense (Exercise5_OpenRedirectDefense.jsx):
   - Implemented strict URL sanitizer: enforces single leading slash (`startsWith('/')`), forbids protocol-relative exploits (`startsWith('//')`), and blocks backslashes (`\`).
   - Defused attacks like `https://evil-phishing.com` and `//attacker.com`, safely defaulting to internal root `/`.

6. Scoped Orders Query / IDOR Defense (Exercise6_ScopedOrdersQuery.jsx):
   - Scoped database queries strictly to `session.user.id`: `SELECT * FROM orders WHERE id = $1 AND user_id = $session.user.id`.
   - Verified that User A attempting to read User B's order ID returns 404 / empty set, preventing Insecure Direct Object References.

7. Server-Side RBAC Guard for /kitchen (Exercise7_ServerSideKitchenStaff.jsx):
   - Implemented role-based authorization check directly in server loader: `if (session.user.role !== 'staff') throw 403 Forbidden`.
   - Refused customer role on the server rather than merely hiding navigation markup on the client.
```

---

## 📂 File Index

- `lib/auth.js`: Session signing, signature verification, cookie attributes, and open-redirect sanitizer.
- `lib/middleware.js`: Edge route matcher covering private endpoints and bypassing static assets.
- `Exercise1_GetSession.jsx`: Session decryption, HMAC signature verification, and tamper detection.
- `Exercise2_SecureCookie.jsx`: Hardened cookie flags (`httpOnly`, `secure`, `sameSite`, `maxAge`).
- `Exercise3_MiddlewareMatcher.jsx`: Narrow matcher verification demonstrating image bypass.
- `Exercise4_NextDestination.jsx`: Intercepted destination flow and post-login resumption.
- `Exercise5_OpenRedirectDefense.jsx`: External phishing URL sanitizer and exploit deflection.
- `Exercise6_ScopedOrdersQuery.jsx`: IDOR neutralization via session-bound queries.
- `Exercise7_ServerSideKitchenStaff.jsx`: Server-enforced RBAC for kitchen staff.
- `ExerciseRunner.jsx`: Interactive live hub testing all 7 exercises in one UI.
- `AUTH.md`: Protected route registry, multi-layer security architecture, and failure responses.
