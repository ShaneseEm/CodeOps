# Mini-Project · Making Addis Eats Fast

**IBT College Canada · CodeOps Full Stack Development**  
*Prog M3-SQ10 S26 · Day 18 Mini-Project / Day 43*  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day18/mini-project](https://github.com/ShaneseEm/CodeOps/tree/main/Day18/mini-project)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day18/mini-project

Mini-Project · Making Addis Eats Fast (Performance Engineering & Core Web Vitals)

1. Throttled Production Lighthouse Baseline Recorded (PERF.md):
   - Baseline measured on `npm run build && npm run start` with simulated Fast 4G + 4x CPU slowdown:
     Score: 48/100, LCP: 4.35s, CLS: 0.285, INP: 280ms, TBT: 490ms, Payload: 8.42MB.

2. Full next/image Migration with Honest sizes and Aspect Ratios:
   - Converted all dish cards and banners to next/image with explicit dimensions (width={600}, height={400}) and honest sizes:
     `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"`.
   - Meaningful alt text on all images.
   - Slashed payload from 8.42MB down to 684KB (-91.9%) and eliminated layout jumps.

3. Single Hero Image Priority & Remote Hosts Listed (next.config.js):
   - Injected priority={true} on the hero banner only, preloading the LCP element concurrently with HTML.
   - All below-the-fold catalog cards remain lazy-loaded, avoiding socket pool contention.
   - Allowed remote image domains configured under images.remotePatterns in next.config.js (images.unsplash.com, cdn.addiseats.et, res.cloudinary.com).

4. Zero-CLS Self-Hosted next/font:
   - Replaced render-blocking external Google Fonts <link> tags with next/font/google (Inter & Noto_Sans_Ethiopic).
   - Zero external DNS queries at runtime and automatic size-adjust CSS dropped font CLS to 0.001.

5. Third-Party Script Optimization via next/script:
   - GA4 analytics loaded with strategy="afterInteractive".
   - Telebirr Payment SDK and Live Chat loaded with strategy="lazyOnload" (deferred until browser is idle).
   - Reduced INP from 280ms to 52ms (-81.4%) and TBT from 490ms to 35ms (-92.8%).

6. Environment Security & .gitignore Verification:
   - Committed clean, standardized .env.example with zero sensitive keys carrying NEXT_PUBLIC_.
   - Verified .gitignore protects .env*.local from accidental commits.
   - Audited production client JavaScript bundle to confirm zero database or secret key leakage.

7. Final Lighthouse Verification:
   - Overall Score: 48 -> 98 (+50 points)
   - LCP: 4.35s -> 1.12s (-74.3%)
   - CLS: 0.285 -> 0.001 (-99.6%)
   - INP: 280ms -> 52ms (-81.4%)
   - Full audit report with before-and-after numbers in PERF.md.
```

---

## 🎯 What We Built

1. **Interactive Performance Dashboard (`App.jsx`):** Allows reviewers to toggle individual optimizations (Aspect Ratio, Hero Priority, next/font, and lazy scripts) and witness real-time Core Web Vitals impact.
2. **Comprehensive Performance Audit (`PERF.md`):** Documents the exact before-and-after measurements recorded under simulated 4G conditions, technical explanations of each change, and answers to all "Check yourself" questions.
3. **Optimized Next.js Config (`next.config.js`):** Includes remote host patterns for external dish assets, AVIF/WebP image negotiation, and cache TTL policies.
4. **Environment Template (`.env.example`):** Production-grade configuration template ensuring secure onboarding without publishing secrets.

---

## 📁 Files Included

- `App.jsx`: Complete interactive Addis Eats application showcasing responsive Next/Image, self-hosted font styling, and real-time Core Web Vitals HUD.
- `PERF.md`: Exhaustive performance engineering audit report answering all checklist questions.
- `next.config.js`: Next.js configuration declaring remote pattern domains for optimized image fetching.
- `.env.example`: Standardized environment variable template separating server secrets from client public keys.
- `README.md`: Mini-project documentation and copy-paste Moodle submission text.
