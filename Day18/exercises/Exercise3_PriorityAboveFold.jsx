import React, { useState } from 'react';

/**
 * Exercise 3: Add priority to the ONE largest above-the-fold image, and nothing else
 * 
 * Rules of Next.js Priority:
 * 1. `priority={true}` tells Next.js to inject `<link rel="preload" as="image">` into `<head>`.
 * 2. Preload scanner begins downloading the hero image in parallel with stylesheet and HTML.
 * 3. CRITICAL RULE: Add `priority` to EXACTLY ONE image (the LCP element).
 * 4. Never add priority to below-the-fold dish cards. If all 12 cards are marked priority,
 *    they fight for connection sockets, starving the critical LCP image and raising TBT.
 */

export const STRATEGY_BENCHMARKS = {
  noPriority: {
    label: '1. No Priority (All Lazy)',
    heroPreload: false,
    cardsPreloaded: 0,
    lcp: 3.85,
    tbt: 120,
    networkSockets: 'Lazy queued behind JS parsing',
    description: 'Browser discovers hero image late in the waterfall after JavaScript evaluates.'
  },
  excessivePriority: {
    label: '2. Antipattern: Priority on Everything',
    heroPreload: true,
    cardsPreloaded: 12,
    lcp: 3.40,
    tbt: 480,
    networkSockets: 'Bandwidth contention: 13 simultaneous preloads saturate HTTP/2 pipe',
    description: '12 below-the-fold images clog the network stream, delaying critical CSS and JS execution.'
  },
  singlePriority: {
    label: '3. Gold Standard: Exactly One Hero Priority',
    heroPreload: true,
    cardsPreloaded: 0,
    lcp: 1.12,
    tbt: 55,
    networkSockets: 'Dedicated top-priority stream for Hero; cards stay lazy',
    description: 'Hero preloads immediately in <head>. Below-the-fold cards load on-demand when scrolled into view.'
  }
};

export default function Exercise3_PriorityAboveFold() {
  const [selectedStrategy, setSelectedStrategy] = useState('singlePriority');
  const current = STRATEGY_BENCHMARKS[selectedStrategy];

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Exercise 3: LCP Hero Priority Optimization</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
          Accelerate Largest Contentful Paint by preloading the single above-the-fold hero banner.
        </p>
      </header>

      {/* Strategy Selector Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {Object.entries(STRATEGY_BENCHMARKS).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setSelectedStrategy(key)}
            style={{
              flex: 1,
              padding: '0.75rem',
              borderRadius: 6,
              border: selectedStrategy === key ? '2px solid #2563eb' : '1px solid #cbd5e1',
              background: selectedStrategy === key ? '#eff6ff' : '#ffffff',
              color: selectedStrategy === key ? '#1d4ed8' : '#334155',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Benchmark Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{
          background: current.lcp <= 2.5 ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${current.lcp <= 2.5 ? '#86efac' : '#fca5a5'}`,
          borderRadius: 8,
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: current.lcp <= 2.5 ? '#16a34a' : '#dc2626' }}>
            {current.lcp}s
          </div>
          <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>LCP (Target &lt; 2.5s)</div>
          <div style={{ fontSize: '0.75rem', color: current.lcp <= 2.5 ? '#15803d' : '#991b1b', marginTop: '0.25rem' }}>
            {current.lcp <= 2.5 ? '✅ FAST / PASS' : '❌ SLOW / FAIL'}
          </div>
        </div>

        <div style={{
          background: current.tbt <= 200 ? '#f0fdf4' : '#fffbeb',
          border: `1px solid ${current.tbt <= 200 ? '#86efac' : '#fde68a'}`,
          borderRadius: 8,
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: current.tbt <= 200 ? '#16a34a' : '#d97706' }}>
            {current.tbt}ms
          </div>
          <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Total Blocking Time (TBT)</div>
          <div style={{ fontSize: '0.75rem', color: current.tbt <= 200 ? '#15803d' : '#92400e', marginTop: '0.25rem' }}>
            {current.tbt <= 200 ? '✅ Uncongested Main Thread' : '⚠️ Socket Starvation'}
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a' }}>
            {current.heroPreload ? '1 Hero' : '0'} / {current.cardsPreloaded} Cards
          </div>
          <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Preload Tags in &lt;head&gt;</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            {current.cardsPreloaded > 0 ? '⚠️ High Contention' : '✅ Focused Resource Priority'}
          </div>
        </div>
      </div>

      {/* Code Sample */}
      <div style={{ background: '#1e293b', color: '#f8fafc', padding: '1.25rem', borderRadius: 8, marginBottom: '1.5rem', overflowX: 'auto' }}>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
          // app/menu/page.jsx — Next.js Priority Declaration
        </div>
        <pre style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.5, fontFamily: 'monospace' }}>
{`export default function MenuPage() {
  return (
    <div>
      {/* 1. HERO BANNER: ABOVE THE FOLD (LCP ELEMENT) */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/images/hero-addis-feast.jpg"
          alt="Traditional Addis Ababa feast served on a giant mesob"
          fill
          priority={true} // <-- INJECTS <link rel="preload" as="image">
          sizes="100vw"
          className="object-cover"
        />
      </section>

      {/* 2. CATALOG DISH CARDS: BELOW THE FOLD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <DishCard
            key={dish.id}
            dish={dish}
            // NO priority attribute here! Defaults to loading="lazy"
            // Browser only downloads card images when scrolled within viewport
          />
        ))}
      </div>
    </div>
  );
}`}
        </pre>
      </div>

      {/* Explanation Note */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 0.5rem', color: '#1e40af' }}>💡 Why Exactly One Image?</h4>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.5 }}>
          Preloading signals to Chrome/Safari that this file must jump to the front of the network queue.
          If multiple items are preloaded, the browser cannot determine which visual element constitutes
          the Largest Contentful Paint, resulting in TCP socket thrashing. Marking only the hero image allows
          LCP to drop from <strong>3.85s</strong> down to <strong>1.12s</strong> on simulated 4G.
        </p>
      </div>
    </div>
  );
}
