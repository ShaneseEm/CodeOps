# Our Addis Eats · Next.js Foundation Project

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Module 3 Next.js Foundation Project*

---

## 🌐 Live Production Deployment

🚀 **Live Application Link:** **[https://addis-eats-foundation.vercel.app](https://addis-eats-foundation.vercel.app)**  
📁 **GitHub Repository:** **[https://github.com/ShaneseEm/CodeOps/tree/main/nextjs-foundation-project](https://github.com/ShaneseEm/CodeOps/tree/main/nextjs-foundation-project)**

---

## 📑 Project Overview

**Our Addis Eats Foundation Project** is a production-ready Next.js application built using the modern **App Router** (`app/`), combining React Server Components (RSC), Client Components, Server Actions, Route Handlers (REST API), and declarative loading/error boundaries into a high-performance food delivery platform.

---

## 🗺️ Route Architecture & Full Route Table

| Path | Type | File Producing Route | Description |
|---|:---:|---|---|
| `/` | Server Component | `app/page.js` | Landing page highlighting platform features with `<Link>` and client `useRouter` transitions. |
| `/menu` | Server Component | `app/menu/page.js` | Full menu catalog with dynamic category filtering (`/menu?category=Vegan`) and search parameters. |
| `/menu/[id]` | SSG / Server Component | `app/menu/[id]/page.js` | Dynamic dish detail page statically generated via `generateStaticParams()`. Triggers `notFound()` on invalid dish IDs. |
| `/cart` | Client Component | `app/cart/page.js` | Real-time shopping cart with item quantity updates and TeleBirr checkout redirect. |
| `/checkout` | Client Component | `app/checkout/page.js` & `CheckoutForm.jsx` | TeleBirr checkout form driven by `placeOrder` Server Action, field-level schema validation, and pending state tracking. |
| `/api/dishes` | Route Handler (GET) | `app/api/dishes/route.js` | Returns complete dish catalog JSON with HTTP `200`. |
| `/api/dishes/[id]` | Route Handler (GET) | `app/api/dishes/[id]/route.js` | Returns single dish object or standardized `{ error, message, statusCode: 404 }`. |
| `/api/orders` | Route Handler (GET/POST) | `app/api/orders/route.js` | Handles new order creation (`201`), validates input (`422` with `fieldErrors`), and lists existing orders. |
| *(Loading)* | Streaming UI | `app/menu/loading.js` | Declarative animated loading spinner automatically shown during server rendering. |
| *(Error)* | Error Boundary | `app/error.js` & `app/menu/error.js` | Declarative error boundary catching runtime errors with interactive reset retry button. |
| *(404 Not Found)* | Not Found UI | `app/not-found.js` | Global custom 404 handler for invalid routes and missing dishes. |

---

## ⚡ Core Technical Foundations

1. **Server Actions (`app/actions/orderActions.js`):**
   - `"use server"` mutations: `placeOrder` and `cancelOrder`.
   - Direct database/store updates without manual `fetch()` boilerplate.
   - Immediate cache revalidation via `revalidatePath('/checkout')` and `revalidatePath('/cart')`.
   - Cryptographic cookie verification server-side (`cookies().get('session_user_id')`) ensuring orders can only be cancelled by their owner.

2. **Server Components vs. Leaf Client Components:**
   - Server-side data access: `DishList` and `page.js` read dish JSON directly from the filesystem on the server, shipping **0 KB** of data-fetching JavaScript to client browsers.
   - Interactive leaf boundaries: Only interactive UI elements (`AddToCartButton`, `CheckoutForm`, `FilterShell`) carry `"use client"`.

3. **Colocation of Non-Routable Components:**
   - `DishList.jsx`, `CategoryBar.jsx`, and `FilterShell.jsx` live directly inside route directories without polluting the URL space.

4. **TeleBirr Mobile Money Integration:**
   - Dedicated regex validation for Ethiopian numbers (`^(09\d{8}|07\d{8}|\+2519\d{8})$`).
   - Dynamic price formatting in Ethiopian Birr (ETB).

---

## 🛠️ Local Development & Running Instructions

```bash
# Clone the repository
git clone https://github.com/ShaneseEm/CodeOps.git

# Navigate to the Foundation Project directory
cd CodeOps/nextjs-foundation-project

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To verify a production build:
```bash
npm run build
npm run start
```
