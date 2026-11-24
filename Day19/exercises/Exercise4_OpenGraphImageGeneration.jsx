import React, { useState } from 'react';
import { DISHES_DATA } from './dishes';

/**
 * Exercise 4: Site-Wide & Per-Dish Dynamic OpenGraph Images with ImageResponse
 * 
 * Objectives:
 * 1. Build site-wide opengraph-image (app/opengraph-image.jsx).
 * 2. Build per-dish dynamic opengraph-image (app/menu/[id]/opengraph-image.jsx).
 * 3. Enforce exact standard dimensions: 1200 x 630 pixels.
 * 4. Verify absolute URL rendering in <head> og:image tags (Check yourself question 1).
 * 5. Interactive Social Preview Debugger for Facebook, Twitter/X, and WhatsApp.
 */

export default function Exercise4_OpenGraphImageGeneration() {
  const [activeImageType, setActiveImageType] = useState('dish'); // 'dish' | 'sitewide'
  const [selectedDishId, setSelectedDishId] = useState(1);
  const [previewPlatform, setPreviewPlatform] = useState('whatsapp'); // 'whatsapp' | 'twitter' | 'facebook'

  const currentDish = DISHES_DATA.find(d => d.id === selectedDishId) || DISHES_DATA[0];

  const categoryColor =
    currentDish.category === 'Vegan' ? '#10b981' : currentDish.category === 'Grill' ? '#f97316' : '#eab308';

  const absoluteImageUrl = activeImageType === 'sitewide'
    ? 'https://addiseats.et/opengraph-image'
    : `https://addiseats.et/menu/${currentDish.id}/opengraph-image`;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 4</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 4</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Dynamic 1200 &times; 630 OpenGraph Image Generation (ImageResponse)
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Generate site-wide and per-dish visual social banners at exactly 1200 &times; 630 using Next.js <code>ImageResponse</code>.
        </p>
      </header>

      {/* Control Switchers */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>OG Image Type:</label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => setActiveImageType('dish')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 6,
                border: '1px solid #cbd5e1',
                background: activeImageType === 'dish' ? '#2563eb' : '#fff',
                color: activeImageType === 'dish' ? '#fff' : '#334155',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Per-Dish Dynamic OG
            </button>
            <button
              onClick={() => setActiveImageType('sitewide')}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 6,
                border: '1px solid #cbd5e1',
                background: activeImageType === 'sitewide' ? '#2563eb' : '#fff',
                color: activeImageType === 'sitewide' ? '#fff' : '#334155',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Site-Wide Brand OG
            </button>
          </div>
        </div>

        {activeImageType === 'dish' && (
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Select Dish Record:</label>
            <select
              value={selectedDishId}
              onChange={(e) => setSelectedDishId(Number(e.target.value))}
              style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            >
              {DISHES_DATA.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.price} ETB)</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ marginLeft: 'auto' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '0.25rem' }}>Preview Platform:</label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['whatsapp', 'twitter', 'facebook'].map(plat => (
              <button
                key={plat}
                onClick={() => setPreviewPlatform(plat)}
                style={{
                  padding: '0.35rem 0.65rem',
                  borderRadius: 6,
                  border: '1px solid #cbd5e1',
                  background: previewPlatform === plat ? '#0f172a' : '#fff',
                  color: previewPlatform === plat ? '#fff' : '#475569',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer'
                }}
              >
                {plat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Check Yourself Notice: Absolute URL check */}
      <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '0.65rem 1rem', borderRadius: 6, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
        <div>
          <strong style={{ color: '#166534' }}>Check yourself question 1:</strong> Does the page source show absolute URLs in every og:image tag?
          <div style={{ color: '#15803d', fontFamily: 'monospace', marginTop: '0.15rem' }}>
            &lt;meta property=&quot;og:image&quot; content=&quot;{absoluteImageUrl}&quot; /&gt;
          </div>
        </div>
        <span style={{ background: '#22c55e', color: '#fff', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: 12 }}>
          ✓ ABSOLUTE
        </span>
      </div>

      {/* Image Canvas Preview (1200 x 630 aspect ratio = 1.905) */}
      <div style={{ border: '1px solid #cbd5e1', borderRadius: 10, overflow: 'hidden', marginBottom: '1.5rem', background: '#09090b', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)' }}>
        <div style={{ background: '#18181b', padding: '0.4rem 1rem', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#a1a1aa' }}>
          <span>ImageResponse Canvas</span>
          <span style={{ background: '#27272a', color: '#38bdf8', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
            Exact Dimensions: 1200 &times; 630 px (Aspect Ratio 1.905:1)
          </span>
        </div>

        {/* 1200x630 Scaled Representation */}
        {activeImageType === 'dish' ? (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1200/630',
            background: 'radial-gradient(circle at 10% 20%, #27272a 0%, #09090b 100%)',
            padding: '4% 6%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            {/* Ethiopian Tricolor Top Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #078930 0%, #FCDD09 50%, #DA121A 100%)' }} />

            {/* Top Row: Brand & Category Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.6rem' }}>🇪🇹</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fafafa' }}>
                  Addis Eats <span style={{ color: '#facc15' }}>Menu</span>
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ border: `1.5px solid ${categoryColor}`, color: categoryColor, padding: '4px 14px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {currentDish.category}
                </span>
                {currentDish.spicy && (
                  <span style={{ border: '1.5px solid #ef4444', color: '#f87171', padding: '4px 12px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 700 }}>
                    🔥 Spicy
                  </span>
                )}
              </div>
            </div>

            {/* Center Dish Content */}
            <div style={{ margin: '1rem 0' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                {currentDish.name}
              </div>
              <div style={{ fontSize: '1.05rem', color: '#a1a1aa', maxWidth: '85%', lineHeight: 1.4 }}>
                {currentDish.description}
              </div>
            </div>

            {/* Bottom Row: ETB Price & CTA */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: '#71717a' }}>Price: </span>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#facc15' }}>
                  {currentDish.price} <span style={{ fontSize: '1rem', color: '#fafafa' }}>ETB</span>
                </span>
              </div>
              <div style={{ background: '#22c55e', color: '#052e16', padding: '8px 18px', borderRadius: 8, fontSize: '0.9rem', fontWeight: 800 }}>
                Order Hot on Addis Eats &rarr;
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1200/630',
            background: 'radial-gradient(circle at 25% 25%, #292524 0%, #0c0a09 100%)',
            padding: '5% 6%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg, #078930 0%, #FCDD09 50%, #DA121A 100%)' }} />
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 30, padding: '4px 16px', marginBottom: '1rem' }}>
              <span>🇪🇹</span>
              <span style={{ color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Addis Eats · Authentic Culinary Heritage
              </span>
            </div>

            <div style={{ fontSize: '2.3rem', fontWeight: 900, color: '#ffffff', maxWidth: '90%', lineHeight: 1.15, marginBottom: '0.75rem' }}>
              Addis Eats: Real Ethiopian Taste Delivered Hot
            </div>

            <div style={{ fontSize: '1.05rem', color: '#d6d3d1', maxWidth: '80%', lineHeight: 1.35, marginBottom: '1rem' }}>
              Slow-simmered Doro Wat, spiced Kitfo, sizzling Tibs, and fasting Beyaynetu — prepared fresh daily across Addis Ababa.
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ background: '#292524', border: '1px solid #44403c', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', color: '#fbbf24', fontWeight: 600 }}>✨ Pure Teff Injera</span>
              <span style={{ background: '#292524', border: '1px solid #44403c', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', color: '#34d399', fontWeight: 600 }}>🌱 100% Vegan Fasting</span>
              <span style={{ background: '#292524', border: '1px solid #44403c', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', color: '#60a5fa', fontWeight: 600 }}>⚡ Rapid Delivery</span>
            </div>
          </div>
        )}
      </div>

      {/* Social Media Card Debugger */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
          Simulated {previewPlatform.toUpperCase()} OpenGraph Link Preview:
        </div>
        <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ height: 160, background: '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#facc15', fontSize: '1.2rem', fontWeight: 800 }}>
            [1200 &times; 630 Scaled Image: {activeImageType === 'dish' ? currentDish.name : 'Addis Eats Brand'}]
          </div>
          <div style={{ padding: '0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>addiseats.et</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', margin: '0.2rem 0' }}>
              {activeImageType === 'dish' ? `${currentDish.name} - ${currentDish.price} ETB | Addis Eats` : 'Addis Eats - Authentic Ethiopian Dining & Fast Delivery'}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.35 }}>
              {activeImageType === 'dish' ? currentDish.description : 'Experience authentic Ethiopian culinary traditions in Addis Ababa.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
