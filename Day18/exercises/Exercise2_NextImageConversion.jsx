import React, { useState } from 'react';

/**
 * Exercise 2: Convert every <img> to next/image with real dimensions and honest sizes
 * 
 * Why raw <img> fails Core Web Vitals:
 * 1. Zero reserved space: Browser doesn't know height before download -> Layout Shift (CLS shoots to 0.28).
 * 2. Uncompressed payload: Sends original 3.2MB JPEG instead of AVIF/WebP -> LCP blows out.
 * 3. Default sizes flaw: Leaving out `sizes` makes next/image default to 100vw, forcing a 400px card
 *    on desktop to download an unnecessarily huge 1920px image.
 */

export const SAMPLE_DISHES = [
  {
    id: 'd1',
    name: 'Addis Special Kitfo',
    category: 'Beef',
    rawSrc: '/images/kitfo.jpg',
    rawWidth: 3840,
    rawHeight: 2160,
    rawPayloadKB: 3240,
    optimizedWebPKB: 184,
    renderedWidth: 380,
    renderedHeight: 250,
    alt: 'Freshly minced beef kitfo seasoned with mitmita and niter kibbeh, served with ayib and gomen',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
  },
  {
    id: 'd2',
    name: 'Beyaynetu (Fasting Platter)',
    category: 'Vegan',
    rawSrc: '/images/beyaynetu.jpg',
    rawWidth: 2560,
    rawHeight: 1440,
    rawPayloadKB: 2180,
    optimizedWebPKB: 142,
    renderedWidth: 380,
    renderedHeight: 250,
    alt: 'Colorful vegan combination platter with misir wot, kik alicha, shiro, and fresh salad on injera',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
  },
  {
    id: 'd3',
    name: 'Doro Wot with Hard-Boiled Egg',
    category: 'Poultry',
    rawSrc: '/images/doro-wot.jpg',
    rawWidth: 3000,
    rawHeight: 2000,
    rawPayloadKB: 2890,
    optimizedWebPKB: 165,
    renderedWidth: 380,
    renderedHeight: 250,
    alt: 'Slow-simmered spicy chicken drumstick in berbere reduction with boiled farm egg',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px'
  }
];

export default function Exercise2_NextImageConversion() {
  const [useNextImage, setUseNextImage] = useState(true);

  const totalRawKB = SAMPLE_DISHES.reduce((sum, d) => sum + d.rawPayloadKB, 0);
  const totalOptimizedKB = SAMPLE_DISHES.reduce((sum, d) => sum + d.optimizedWebPKB, 0);
  const percentSaved = Math.round(((totalRawKB - totalOptimizedKB) / totalRawKB) * 100);

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Exercise 2: next/image Conversion with Honest Sizes</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
          Eliminate CLS through reserved bounding boxes and slash payload with responsive srcset generation.
        </p>
      </header>

      {/* Switcher & Payload Comparison */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem', border: '1px solid #cbd5e1' }}>
        <div>
          <label style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useNextImage}
              onChange={(e) => setUseNextImage(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span>Enable <code>next/image</code> Mode (Uncheck to view raw &lt;img&gt; flaws)</span>
          </label>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
            Active Mode: {useNextImage ? '✅ Next.js Image Component (Aspect-ratio locked, AVIF/WebP, sizes scoped)' : '❌ Raw <img> (Unsized, raw megabyte JPEG payload, causes CLS)'}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: useNextImage ? '#16a34a' : '#dc2626' }}>
            {useNextImage ? `${totalOptimizedKB} KB (-${percentSaved}%)` : `${(totalRawKB / 1024).toFixed(1)} MB`}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Network Transfer Weight</div>
        </div>
      </div>

      {/* Code Comparison Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '1rem' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#991b1b' }}>❌ Before: Raw &lt;img&gt;</h4>
          <pre style={{ margin: 0, fontSize: '0.75rem', background: '#ffffff', padding: '0.75rem', borderRadius: 4, overflowX: 'auto' }}>
{`<img
  src="/images/kitfo.jpg"
  alt="Kitfo"
  className="card-image"
/>
// Flaws:
// 1. No width/height: 0px tall until loaded -> CLS!
// 2. Transmits full 3.2MB desktop image on 360px phones
// 3. No WebP/AVIF automatic negotiation`}
          </pre>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '1rem' }}>
          <h4 style={{ margin: '0 0 0.5rem', color: '#166534' }}>✅ After: next/image with Honest Sizes</h4>
          <pre style={{ margin: 0, fontSize: '0.75rem', background: '#ffffff', padding: '0.75rem', borderRadius: 4, overflowX: 'auto' }}>
{`<Image
  src="/images/kitfo.jpg"
  width={380}
  height={250}
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         380px"
  alt="Freshly minced beef kitfo with mitmita"
  className="object-cover rounded-lg"
/>
// Benefits:
// 1. Reserves 380x250 ratio box -> 0.00 CLS
// 2. Generates responsive srcset for exact viewport
// 3. Auto-converted to modern AVIF/WebP`}
          </pre>
        </div>
      </div>

      {/* Dish Showcase Cards */}
      <h3 style={{ margin: '0 0 1rem', color: '#0f172a' }}>Catalog Cards Preview</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
        {SAMPLE_DISHES.map((dish) => (
          <div key={dish.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', background: '#ffffff' }}>
            <div style={{
              width: '100%',
              height: useNextImage ? 180 : 'auto',
              minHeight: useNextImage ? 180 : 0,
              background: '#e2e8f0',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '0.85rem'
            }}>
              {useNextImage ? (
                <div style={{ textAlign: 'center', padding: '1rem' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>🥘</div>
                  <strong>{dish.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: '0.25rem' }}>
                    next/image: 380x250 aspect box reserved ({dish.optimizedWebPKB} KB WebP)
                  </div>
                </div>
              ) : (
                <div style={{ padding: '0.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.25rem' }}>⚠️</div>
                  <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>Raw &lt;img&gt; ({dish.rawPayloadKB} KB)</div>
                </div>
              )}
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: 4, fontWeight: 600 }}>{dish.category}</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{useNextImage ? `${dish.optimizedWebPKB} KB` : `${dish.rawPayloadKB} KB`}</span>
              </div>
              <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem' }}>{dish.name}</h4>
              <p style={{ margin: '0 0 0.75rem', fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>{dish.alt}</p>
              <div style={{ fontSize: '0.75rem', color: '#64748b', background: '#f8fafc', padding: '0.5rem', borderRadius: 4 }}>
                <strong>sizes:</strong> <code>{dish.sizes}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
