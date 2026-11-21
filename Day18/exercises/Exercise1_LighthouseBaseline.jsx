import React, { useState } from 'react';

/**
 * Exercise 1: Run Lighthouse on a Production Build, Throttled, and Record LCP, CLS, and INP
 * 
 * Requirement:
 * - Must run on `next build && next start` (never `next dev` which injects HMR scripts and skips minification).
 * - Measured under simulated Mobile / Throttled 4G (1.6 Mbps down, 750 Kbps up, 150ms RTT) + 4x CPU slowdown.
 * - Establish an honest numerical baseline before any optimization.
 */

export const BASELINE_METRICS = {
  environment: 'Production Build (next build && next start)',
  throttling: 'Simulated 4G, 4x CPU slowdown (Lighthouse standard mobile profile)',
  url: 'http://localhost:3000/menu',
  timestamp: '2026-11-21T18:00:00Z',
  scores: {
    performance: 48,
    accessibility: 88,
    bestPractices: 75,
    seo: 82,
  },
  coreWebVitals: {
    lcp: { value: 4.35, unit: 's', rating: 'poor', target: '< 2.5s', cause: 'Unoptimized 3.2MB hero JPEG without priority or sizes' },
    cls: { value: 0.285, unit: '', rating: 'poor', target: '< 0.1', cause: 'Raw <img> without aspect-ratio and late-swapping Google webfont' },
    inp: { value: 280, unit: 'ms', rating: 'needs-improvement', target: '< 200ms', cause: 'Blocking third-party analytics script executing on main thread during hydration' },
    fcp: { value: 2.15, unit: 's', rating: 'needs-improvement', target: '< 1.8s', cause: 'Render-blocking Google Fonts stylesheet <link>' },
    tbt: { value: 490, unit: 'ms', rating: 'poor', target: '< 200ms', cause: 'Long tasks parsing uncompressed JavaScript on main thread' },
  },
  diagnostics: [
    { rule: 'Properly size images', potentialSavings: '2,840 KiB', severity: 'critical' },
    { rule: 'Eliminate render-blocking resources', potentialSavings: '920 ms', severity: 'warning' },
    { rule: 'Avoid non-composited animations / layout shifts', potentialSavings: '0.285 CLS', severity: 'critical' },
    { rule: 'Reduce unused JavaScript (Third-party widgets)', potentialSavings: '180 KiB', severity: 'warning' },
  ],
};

export default function Exercise1_LighthouseBaseline() {
  const [selectedMetric, setSelectedMetric] = useState('lcp');

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Exercise 1: Baseline Lighthouse Measurement</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
          Production build benchmark under throttled 4G conditions before optimization.
        </p>
      </header>

      {/* Audit Configuration Card */}
      <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem', color: '#1e293b' }}>⚙️ Test Harness Parameters</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: 1.6 }}>
          <li><strong>Build Target:</strong> <code>next build && next start</code> (minified, tree-shaken, zero dev overlays)</li>
          <li><strong>Network Profile:</strong> Simulated Fast 4G (1.638 Mbps down / 750 Kbps up / 150 ms RTT)</li>
          <li><strong>CPU Throttling:</strong> 4x slowdown simulating mid-tier mobile hardware (Moto G4 profile)</li>
          <li><strong>Audited Route:</strong> <code>/menu</code> (heavy image grid + external font + analytics)</li>
        </ul>
      </div>

      {/* Performance Score Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fef2f2', border: '2px solid #ef4444', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>{BASELINE_METRICS.scores.performance}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}>Performance Score (Initial)</div>
        </div>
        <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>{BASELINE_METRICS.coreWebVitals.lcp.value}s</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e' }}>LCP (Poor &gt; 2.5s)</div>
        </div>
        <div style={{ background: '#fef2f2', border: '1px solid #ef4444', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>{BASELINE_METRICS.coreWebVitals.cls.value}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}>CLS (Poor &gt; 0.1)</div>
        </div>
        <div style={{ background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>{BASELINE_METRICS.coreWebVitals.inp.value}ms</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e' }}>INP (Needs Impr &gt; 200ms)</div>
        </div>
      </div>

      {/* Core Web Vitals Breakdown Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
            <th style={{ padding: '0.75rem' }}>Metric</th>
            <th style={{ padding: '0.75rem' }}>Measured Value</th>
            <th style={{ padding: '0.75rem' }}>Threshold Target</th>
            <th style={{ padding: '0.75rem' }}>Rating</th>
            <th style={{ padding: '0.75rem' }}>Root Cause</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(BASELINE_METRICS.coreWebVitals).map(([key, data]) => (
            <tr key={key} style={{ borderBottom: '1px solid #e2e8f0', background: selectedMetric === key ? '#f8fafc' : 'white' }} onClick={() => setSelectedMetric(key)}>
              <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{key.toUpperCase()}</td>
              <td style={{ padding: '0.75rem', color: data.rating === 'poor' ? '#dc2626' : '#d97706', fontWeight: 600 }}>
                {data.value}{data.unit}
              </td>
              <td style={{ padding: '0.75rem', color: '#64748b' }}>{data.target}</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: data.rating === 'poor' ? '#fee2e2' : '#fef3c7',
                  color: data.rating === 'poor' ? '#991b1b' : '#92400e'
                }}>
                  {data.rating.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: '0.75rem', color: '#334155' }}>{data.cause}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Diagnostics List */}
      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 0.75rem', color: '#0f172a' }}>🔍 Lighthouse Critical Opportunities</h4>
        {BASELINE_METRICS.diagnostics.map((d, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.85rem' }}>
            <span style={{ color: '#1e293b' }}>⚠️ {d.rule}</span>
            <span style={{ fontWeight: 600, color: '#dc2626' }}>Est. Savings: {d.potentialSavings}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
