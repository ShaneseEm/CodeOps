# Prog M3-SQ10 S26 · Day 18: Exercises (Making Addis Eats Fast)

**IBT College Canada · CodeOps Full Stack Development**  
**Repository Link:** [https://github.com/ShaneseEm/CodeOps/tree/main/Day18/exercises](https://github.com/ShaneseEm/CodeOps/tree/main/Day18/exercises)

---

## 📝 Moodle Submission Copy-Paste Text

```markdown
GitHub Repository: https://github.com/ShaneseEm/CodeOps/tree/main/Day18/exercises

Prog M3-SQ10 S26 · Day 18 Exercises (Performance Engineering & Core Web Vitals)

1. Baseline Lighthouse Run on Throttled Production Build (Exercise1_LighthouseBaseline.jsx):
   - Audited production build (npm run build && npm run start) under Simulated 4G (1.6 Mbps / 150ms RTT) + 4x CPU slowdown.
   - Recorded baseline: Performance Score 48/100, LCP 4.35s (Poor), CLS 0.285 (Poor), INP 280ms (Needs Improvement), TBT 490ms.

2. Convert every <img> to next/image with Real Dimensions and Honest sizes (Exercise2_NextImageConversion.jsx):
   - Converted all dish cards and banners to next/image with width, height, and honest sizes attribute:
     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px".
   - Reserved aspect-ratio bounding boxes eliminate layout shift; responsive srcset generation reduced image payload from 8.4MB to 684KB (-91.9%).

3. Add priority to the ONE Largest Above-The-Fold Image (Exercise3_PriorityAboveFold.jsx):
   - Injected priority={true} on the hero banner image only, generating <link rel="preload" as="image"> in document <head>.
   - Kept all 12 below-the-fold dish cards lazy-loaded (loading="lazy"), preventing network socket saturation.
   - Dropped LCP from 4.35s to 1.12s (-74.3%).

4. Replace External Font <link> with next/font and Confirm CLS Improvement (Exercise4_NextFontSelfHosted.jsx):
   - Replaced blocking Google Fonts <link> tags with next/font/google (Inter & Noto_Sans_Ethiopic) using display: 'swap'.
   - Self-hosted font binaries at build time (0 runtime external requests) and leveraged automatic size-adjust CSS.
   - Reduced font-induced CLS to 0.001 and eliminated 420ms of render-blocking time.

5. Move Third-Party Scripts to next/script with Lazy Strategies (Exercise5_LazyThirdPartyScripts.jsx):
   - Analytics (GA4) loaded with strategy="afterInteractive" to ensure accurate tracking without delaying first paint.
   - Telebirr Payment Web SDK and Live Chat widgets migrated to strategy="lazyOnload" (requestIdleCallback).
   - Reduced Interaction to Next Paint (INP) from 280ms to 52ms (-81.4%) and Total Blocking Time (TBT) from 490ms to 35ms.

6. Environment Variable Security & .gitignore Verification (Exercise6_EnvSecuritySetup.jsx & .env.example):
   - Committed clean, exhaustive .env.example documenting all variables with format comments.
   - Confirmed .gitignore contains .env.local and .env*.local, preventing local credential leaks.
   - Audited all variables: zero sensitive credentials (DATABASE_URL, SERVER_SIGNING_SECRET, TELEBIRR_APP_KEY) use NEXT_PUBLIC_.

7. Re-Run Lighthouse and Record Recorded Differences (Exercise7_LighthouseComparison.jsx & PERF.md):
   - Performance Score: 48 -> 98 (+50 points).
   - LCP: 4.35s -> 1.12s (-74.3%).
   - CLS: 0.285 -> 0.001 (-99.6%).
   - INP: 280ms -> 52ms (-81.4%).
   - Full before-and-after audit logs documented in PERF.md.
```

---

## 📂 File Index

- `Exercise1_LighthouseBaseline.jsx`: Initial throttled production measurement harness and diagnostics.
- `Exercise2_NextImageConversion.jsx`: Responsive `next/image` conversion with honest `sizes` and aspect-ratio reservation.
- `Exercise3_PriorityAboveFold.jsx`: LCP hero image preloading demonstration and socket contention benchmarks.
- `Exercise4_NextFontSelfHosted.jsx`: Migration from remote `<link>` fonts to zero-shift self-hosted `next/font`.
- `Exercise5_LazyThirdPartyScripts.jsx`: Script execution scheduling (`afterInteractive` vs `lazyOnload`).
- `Exercise6_EnvSecuritySetup.jsx`: Security audit matrix and `.gitignore` validation.
- `Exercise7_LighthouseComparison.jsx`: Final before/after comparison dashboard.
- `ExerciseRunner.jsx`: Interactive tabbed testbed for all 7 exercises.
- `PERF.md`: Formal performance engineering audit report answering all checklist questions.
- `.env.example`: Standardized environment configuration template.
