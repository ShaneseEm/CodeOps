import React, { useState } from 'react';

/**
 * Exercise 5: Move third-party scripts to next/script with a lazy strategy
 * 
 * Script Loading Strategies in Next.js:
 * 1. `beforeInteractive`: Critical scripts that must execute before page hydration (e.g., bot detection).
 * 2. `afterInteractive` (Default): Loads immediately after page is interactive (e.g., Google Analytics).
 * 3. `lazyOnload`: Waits until the browser is completely idle via `requestIdleCallback`
 *    (e.g., Telebirr payment widget, Customer Support Chat, Review Widgets).
 */

export const SCRIPT_CONFIGS = [
  {
    name: 'Google Analytics 4 (GA4)',
    src: 'https://www.googletagmanager.com/gtag/js?id=G-ADDIS123',
    legacyImpact: 'Blocks DOM parsing for 180ms during initial navigation',
    strategy: 'afterInteractive',
    rationale: 'Must track page views accurately right as the page becomes usable, but does not block paint.',
    tbtContributionMs: 25
  },
  {
    name: 'Telebirr Payment Web SDK',
    src: 'https://sdk.telebirr.et/v2/payment-widget.js',
    legacyImpact: 'Competes with hero image download and hydration, inflating INP to 280ms',
    strategy: 'lazyOnload',
    rationale: 'Users do not click "Pay with Telebirr" on frame 1; loading during idle time frees up the main thread.',
    tbtContributionMs: 0
  },
  {
    name: 'Addis Eats Live Chat Support',
    src: 'https://widgets.support.addiseats.et/chat.js',
    legacyImpact: 'Loads 350KB of UI widgets during critical first paint',
    strategy: 'lazyOnload',
    rationale: 'Non-critical background feature; defer until browser CPU is 100% idle.',
    tbtContributionMs: 0
  }
];

export default function Exercise5_LazyThirdPartyScripts() {
  const [useNextScript, setUseNextScript] = useState(true);

  const tbtRaw = 380;
  const tbtOptimized = 25;
  const inpRaw = 280;
  const inpOptimized = 52;

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Exercise 5: next/script Optimization</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
          Free up main thread execution and cut INP/TBT by deferring third-party scripts.
        </p>
      </header>

      {/* Toggle Controls */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={useNextScript}
            onChange={(e) => setUseNextScript(e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <span>Enable <code>next/script</code> Strategies (Uncheck to observe legacy blocking behavior)</span>
        </label>
      </div>

      {/* Metrics Impact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: useNextScript ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${useNextScript ? '#86efac' : '#fca5a5'}`,
          borderRadius: 8,
          padding: '1.25rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: useNextScript ? '#16a34a' : '#dc2626' }}>
            {useNextScript ? `${inpOptimized} ms` : `${inpRaw} ms`}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>Interaction to Next Paint (INP)</div>
          <div style={{ fontSize: '0.75rem', color: useNextScript ? '#15803d' : '#991b1b', marginTop: '0.25rem' }}>
            {useNextScript ? '✅ Good (< 200ms target achieved)' : '❌ Needs Improvement (> 200ms)'}
          </div>
        </div>

        <div style={{
          background: useNextScript ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${useNextScript ? '#86efac' : '#fca5a5'}`,
          borderRadius: 8,
          padding: '1.25rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: useNextScript ? '#16a34a' : '#dc2626' }}>
            {useNextScript ? `${tbtOptimized} ms` : `${tbtRaw} ms`}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 600 }}>Total Blocking Time (TBT)</div>
          <div style={{ fontSize: '0.75rem', color: useNextScript ? '#15803d' : '#991b1b', marginTop: '0.25rem' }}>
            {useNextScript ? '✅ -93% main thread blockage' : '❌ Severe thread congestion'}
          </div>
        </div>
      </div>

      {/* Script Audit Table */}
      <h3 style={{ margin: '0 0 1rem', color: '#0f172a' }}>Third-Party Script Allocation</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
            <th style={{ padding: '0.75rem' }}>Script</th>
            <th style={{ padding: '0.75rem' }}>Assigned Strategy</th>
            <th style={{ padding: '0.75rem' }}>Execution Timing</th>
            <th style={{ padding: '0.75rem' }}>Technical Rationale</th>
          </tr>
        </thead>
        <tbody>
          {SCRIPT_CONFIGS.map((script, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>{script.name}</td>
              <td style={{ padding: '0.75rem' }}>
                <code style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.4rem', borderRadius: 4 }}>
                  strategy="{script.strategy}"
                </code>
              </td>
              <td style={{ padding: '0.75rem', color: '#475569' }}>
                {script.strategy === 'afterInteractive' ? 'Immediately after hydration' : 'During browser idle cycles'}
              </td>
              <td style={{ padding: '0.75rem', color: '#334155' }}>{script.rationale}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Code Snippet */}
      <div style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: 8, overflowX: 'auto' }}>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>// app/layout.jsx</div>
        <pre style={{ margin: 0, fontSize: '0.75rem', lineHeight: 1.5, fontFamily: 'monospace' }}>
{`import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* 1. Analytics loads post-hydration without blocking paint */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ADDIS123"
          strategy="afterInteractive"
        />

        {/* 2. Telebirr SDK loads during idle time */}
        <Script
          src="https://sdk.telebirr.et/v2/payment-widget.js"
          strategy="lazyOnload"
          onLoad={() => console.log('Telebirr SDK initialized during idle')}
        />
      </body>
    </html>
  );
}`}
        </pre>
      </div>
    </div>
  );
}
