# CodeOps Full Stack Development · IBT College Canada

Welcome to the **CodeOps Full Stack Development** portfolio repository for **Addis Eats**. This repository contains modular daily exercises, security implementations, performance engineering audits, metadata & findability architectures, and full-stack mini-projects.

---

## 🧭 Quick Navigation Links

### 🏆 Day 20 / Day 45: Next.js Advanced Project (Week 9 Capstone)
- 🚀 **[Next.js Advanced Project](Day20/advanced-project)** — Unified culmination of Week 9: 3-layer security defense, 3 attacks verified live, SWR polled status seeded with `fallbackData`, debounced search, performance budget (48 → 98), 1200×630 OpenGraph cards, and full metadata.
- 🛡️ **[AUTH.md](Day20/advanced-project/AUTH.md)** — Decision 1: Who may see what, what each layer proves, and the three attacks stopped live.
- 📡 **[DATA.md](Day20/advanced-project/DATA.md)** — Decision 2: Where data is fetched, SWR keys, refresh rules, and zero-spinner server seeding.
- ⚡ **[PERF.md](Day20/advanced-project/PERF.md)** — Decision 3: Performance budget with both columns filled and technical causes.
- 🌐 **[Live Deployed URL](https://code-ops-ten.vercel.app)** — Verified production deployment on Vercel.

---

### 🔍 Day 19: SEO, OpenGraph & Structured Data (Making Addis Eats Findable)
- 📝 **[Day 19 Exercises (1–7)](Day19/exercises)** — `metadataBase` resolution, `%s | Addis Eats` title template, human-crafted descriptions, dynamic `generateMetadata`, 1200×630 `ImageResponse` social cards, Schema.org `MenuItem` JSON-LD, dynamic `app/sitemap.js`, and `app/robots.js` crawler policies.
- 🚀 **[Day 19 Mini-Project (Making Addis Eats Findable)](Day19/mini-project)** — Interactive Findability Application (`App.jsx`), Live `<head>` Source Inspector, Social Preview Debugger, Google Rich Results Validator, and comprehensive audit report (`SEO.md`).

---

### ⚡ Day 18: Performance Engineering & Core Web Vitals (Making Addis Eats Fast)
- 📝 **[Day 18 Exercises (1–7)](Day18/exercises)** — Baseline Lighthouse audit, `next/image` responsive sizes, single hero `priority`, build-time `next/font` self-hosting, `next/script` lazy execution, and `.env.example` setup.
- 🚀 **[Day 18 Mini-Project (Making Addis Eats Fast)](Day18/mini-project)** — Interactive Performance Dashboard (`App.jsx`), Core Web Vitals HUD, and exhaustive before-and-after audit (`PERF.md`).

---

### 🛡️ Day 17: Defense-in-Depth Authentication (Securing Addis Eats)
- 📝 **[Day 17 Exercises (1–7)](Day17/exercises)** — `getSession` cryptographic verification, `httpOnly`/`secure`/`sameSite` cookies, edge middleware matcher, open-redirect defense, and server-side RBAC.
- 🚀 **[Day 17 Mini-Project (Securing Addis Eats)](Day17/mini-project)** — End-to-end authentication, ownership validation, simulated 3 security attacks, and security audit report (`AUTH.md`).

---

### 📡 Day 16: Live Data in Addis Eats (SWR & Real-Time Sync)
- 📝 **[Day 16 Exercises (1–7)](day16/exercises)** — Declarative SWR migration, background polling intervals, server component `fallbackData`, debounced search, and zero-flash `keepPreviousData`.
- 🚀 **[Day 16 Mini-Project (Live Data in Addis Eats)](day16/mini-project)** — Live order tracker, shareable query string pagination, and data strategy audit (`DATA.md`).

---

### 🏗️ Next.js Foundation Project
- 💻 **[Addis Eats Next.js Foundation](nextjs-foundation-project)** — Production Next.js App Router deployment with dynamic metadata, `ImageResponse` OpenGraph banners, Server Actions, REST route handlers, and cart state management.

---

## 📊 Summary of Day 20 Capstone Performance & Security Audit

| Milestone / Metric | Baseline (Before) | Optimized (After) | Recorded Gain | Assessment Status |
|---|:---:|:---:|:---:|:---:|
| **Lighthouse Performance Score** | **48 / 100** | **98 / 100** | **+50 Points** | 🟢 **PASS (Grade A)** |
| **Largest Contentful Paint (LCP)** | **4.35 s** | **1.12 s** | **-74.3%** | 🟢 **PASS (&lt; 2.5s)** |
| **Cumulative Layout Shift (CLS)** | **0.285** | **0.001** | **-99.6%** | 🟢 **PASS (&lt; 0.1)** |
| **First Load JS, `/menu`** | **284 kB** | **88 kB** | **-69.0%** | 🟢 **PASS (&lt; 120 kB)** |
| **Largest Image Payload** | **3,200 kB** | **112 kB** | **-96.5%** | 🟢 **PASS (&lt; 150 kB)** |
| **Three Security Attacks** | Vulnerable | 100% Blocked | Verified Line Stops | 🟢 **PASS (3/3 Stopped)** |
| **Server Seeding (`fallbackData`)** | Loading Spinner | Instant First Paint | 0s Delay on Arrival | 🟢 **PASS** |
| **Debounced Search** | 5 req / word | 1 req / pause | 300ms Buffer | 🟢 **PASS** |
| **Metadata & 1200×630 Cards** | Blue Text | Rich Social Card | Absolute OG URLs | 🟢 **PASS** |
