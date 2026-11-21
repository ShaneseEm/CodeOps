# CodeOps Full Stack Development · IBT College Canada

Welcome to the **CodeOps Full Stack Development** portfolio repository for **Addis Eats**. This repository contains modular daily exercises, security implementations, performance engineering audits, and full-stack mini-projects.

---

## 🚀 Quick Navigation Links

### ⚡ Day 18: Performance Engineering & Core Web Vitals (Making Addis Eats Fast)
- 📖 **[Day 18 Exercises (1–7)](Day18/exercises)** — Baseline Lighthouse audit, `next/image` responsive sizes, single hero `priority`, build-time `next/font` self-hosting, `next/script` lazy execution, and `.env.example` setup.
- 🥘 **[Day 18 Mini-Project (Making Addis Eats Fast)](Day18/mini-project)** — Interactive Performance Dashboard (`App.jsx`), Core Web Vitals HUD, and exhaustive before-and-after audit (`PERF.md`).

---

### 🛡️ Day 17: Defense-in-Depth Authentication (Securing Addis Eats)
- 📖 **[Day 17 Exercises (1–7)](Day17/exercises)** — `getSession` cryptographic verification, `httpOnly`/`secure`/`sameSite` cookies, edge middleware matcher, open-redirect defense, and server-side RBAC.
- 🥘 **[Day 17 Mini-Project (Securing Addis Eats)](Day17/mini-project)** — End-to-end authentication, ownership validation, simulated 3 security attacks, and security audit report (`AUTH.md`).

---

### 📡 Day 16: Live Data in Addis Eats (SWR & Real-Time Sync)
- 📖 **[Day 16 Exercises (1–7)](day16/exercises)** — Declarative SWR migration, background polling intervals, server component `fallbackData`, debounced search, and zero-flash `keepPreviousData`.
- 🥘 **[Day 16 Mini-Project (Live Data in Addis Eats)](day16/mini-project)** — Live order tracker, shareable query string pagination, and data strategy audit (`DATA.md`).

---

### 🌐 Next.js Foundation Project
- 💻 **[Addis Eats Next.js Foundation](nextjs-foundation-project)** — Production Next.js App Router deployment with Server Actions, REST route handlers, and cart state management.

---

## 📊 Summary of Day 18 Performance Gains

| Core Web Vital | Baseline (Before) | Optimized (After) | Recorded Gain | Rating |
|---|:---:|:---:|:---:|:---:|
| **Lighthouse Performance Score** | **48 / 100** | **98 / 100** | **+50 Points** | 🟢 **PASS** |
| **Largest Contentful Paint (LCP)** | **4.35 s** | **1.12 s** | **-74.3%** | 🟢 **GOOD** |
| **Cumulative Layout Shift (CLS)** | **0.285** | **0.001** | **-99.6%** | 🟢 **GOOD** |
| **Interaction to Next Paint (INP)** | **280 ms** | **52 ms** | **-81.4%** | 🟢 **GOOD** |
| **Total Blocking Time (TBT)** | **490 ms** | **35 ms** | **-92.8%** | 🟢 **GOOD** |
| **Total Transfer Payload** | **8.42 MB** | **684 KB** | **-91.9%** | 🟢 **LEAN** |
