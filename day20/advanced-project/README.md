# Next.js Advanced Project · Addis Eats (Day 45 / Day 20 Capstone)

**IBT College Canada · CodeOps Full Stack Software Development**  
*Course: Prog M3-SQ10 S26 · Module 3 Frontend: React & Next.js · Day 45 / Day 20*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day20/advanced-project](https://github.com/ShaneseEm/CodeOps/tree/main/Day20/advanced-project)  
**Live Deployed Application:** [https://code-ops-ten.vercel.app](https://code-ops-ten.vercel.app)  

---

## 📋 Moodle Submission Copy-Paste Text (For LMS Text Box)

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day20/advanced-project
Live Deployed Production URL: https://code-ops-ten.vercel.app

Prog M3-SQ10 S26 · Day 20 / Day 45: Next.js Advanced Project (Capstone Checkpoint)

1. Area 1: Accounts & Sessions (AUTH.md):
   - Cryptographically signed sessions stored in flagged cookies: `httpOnly: true`, `secure: true`, `sameSite: 'lax'`, `maxAge: 86400`.
   - Complete end-to-end sign-in and sign-out flows verified via DevTools Application tab.

2. Area 2: Three-Layer Defense-in-Depth Protection (AUTH.md):
   - Layer 1 (Edge Middleware): Intercepts unauthenticated guests before reaching private routes (/orders, /checkout, /kitchen).
   - Layer 2 (Server Page SSR): Cryptographically verifies HMAC session signatures before rendering markup.
   - Layer 3 (Server Actions): Authenticates callers on every mutation (cancelOrder, placeOrder), preventing headless API bypass.
   - RBAC Staff Protection: /kitchen evaluates `session.user.role === 'staff'`; rejects non-staff with 403 Forbidden.

3. Area 3: Scoped Ownership & The Three Attacks Verified (AUTH.md):
   - All queries strictly scoped: `WHERE user_id = session.id` (zero client-supplied ID trust).
   - Attack 1 (Signed out mutation): `await cancelOrder("ord_812")` -> Refused (401 Unauthorized) by line 24 of app/actions/orderActions.js.
   - Attack 2 (IDOR cross-account cancellation): `await cancelOrder("<other_user_order>")` -> Refused on ownership (403 Forbidden) by line 38 of app/actions/orderActions.js.
   - Attack 3 (Crafted open redirect): `/signin?next=https://example.com` -> Neutralized to `/` by line 18 of app/actions/authActions.js.

4. Area 4: Live Data & Server Seeding (DATA.md):
   - Polled Order Status: SWR polls every 3 seconds (`refreshInterval: 3000`). Initial state is pre-rendered on the server and passed as `fallbackData` (ZERO spinner on arrival).
   - Debounced Search: 300ms pause buffer ensures exactly 1 HTTP request per pause rather than 5 per keystroke.

5. Area 5: Measured Performance Budget (PERF.md):
   - Lighthouse Performance Score: 48 / 100 -> 98 / 100 (+50 points).
   - LCP (Throttled 4G): 4.35s -> 1.12s (-74.3%) via single hero `priority={true}` and responsive `sizes`.
   - CLS: 0.285 -> 0.001 (-99.6%) via reserved aspect-ratio boxes and self-hosted `next/font`.
   - First Load JS (/menu): 284 kB -> 88 kB (-69.0%) via `strategy="lazyOnload"` third-party script deferral.
   - Largest Image: 3,200 kB -> 112 kB (-96.5%) via automatic WebP/AVIF compression.

6. Area 6: Discovery, Metadata & Previews (SEO.md):
   - `metadataBase` set to production URL (`https://addiseats.et`), resolving absolute URLs on all social tags.
   - Title template `%s | Addis Eats` with bespoke human descriptions on every route.
   - Dynamic 1200 × 630 OpenGraph images generated per dish via `ImageResponse`.
   - Schema.org `MenuItem` JSON-LD matching DOM text price in ETB (zero discrepancy).
   - Dynamic `app/sitemap.js` generated from dish data with /cart and /checkout strictly excluded.
   - `app/robots.js` disallowing private routes and pointing crawlers to sitemap.xml.
```

---

## 🧭 The Three Decision Tables (Completed)

### 1. Decision One: Who May See What (`AUTH.md`)
| Route | Who | Protected By | What That Proves |
|---|---|---|---|
| **`/menu`** | Everyone | Nothing | It is public, and should stay indexable |
| **`/orders`** | The owner | Middleware + page + scoped query | Signed in, and only their own records |
| **`/checkout`** | Any signed-in user | Middleware + page | Signed in — the write checks the rest |
| **`/kitchen`** | Staff only | Page + role check in every action | Signed in, and permitted (`role === 'staff'`) |

### 2. Decision Two: Where Data is Fetched (`DATA.md`)
| Data | Where | Why It Runs There |
|---|:---:|---|
| **Menu and dishes** | **Server** | Public, indexable, cacheable |
| **Order history** | **Server** | Private, scoped to the session (`WHERE user_id = session.id`) |
| **Order status** | **Server first, then polled** | `fallbackData` seeds first paint (no spinner); SWR polls updates |
| **Menu search** | **Client** | Triggered by typing, debounced by 300ms |
| **Cart** | **Client store** | Never leaves browser until checkout submission |

### 3. Decision Three: Performance Budget Matrix (`PERF.md`)
| Measure | Target | Before (Baseline) | After (Optimized) | Delta | Cause of Improvement |
|---|:---:|:---:|:---:|:---:|---|
| **LCP, throttled** | Under 2.5s | **4.35 s** | **1.12 s** | **-74.3%** | `next/image` with `priority={true}` on hero banner |
| **CLS** | Under 0.1 | **0.285** | **0.001** | **-99.6%** | Explicit container aspect ratios + self-hosted `next/font` |
| **First Load JS, `/menu`** | Under 120 kB | **284 kB** | **88 kB** | **-69.0%** | Deferred non-critical scripts (`lazyOnload`) |
| **Largest image** | Under 150 kB | **3,200 kB** | **112 kB** | **-96.5%** | Responsive WebP/AVIF srcset generation |
| **Lighthouse Performance** | 90 or better | **48 / 100** | **98 / 100** | **+50 pts** | Full core web vitals optimization pass |

---

## 📁 Project Structure & Deliverables

- `App.jsx`: Full interactive dashboard demonstrating all 6 project areas with live attack simulator.
- `AUTH.md`: Route protection layers, ownership verification, and the three stopped attacks.
- `DATA.md`: Server vs client data fetching, SWR cache keys, refresh rules, and server fallbackData seeding.
- `PERF.md`: The complete before-and-after performance budget with causes.
- `README.md`: Reproduction walkthrough and copy-paste Moodle submission text.
