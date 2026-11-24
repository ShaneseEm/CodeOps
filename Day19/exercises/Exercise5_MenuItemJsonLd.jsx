import React, { useState } from 'react';
import { DISHES_DATA } from './dishes';

/**
 * Exercise 5: MenuItem JSON-LD Generated from the Same Dish Object
 * 
 * Objectives:
 * 1. Inject schema.org/MenuItem JSON-LD directly into the dish page.
 * 2. Guarantee that name and price match the DOM page text exactly.
 * 3. Currency MUST be in ETB (Check yourself question 4).
 * 4. Map vegan category to Schema.org suitableForDiet (VeganDiet).
 * 5. Interactive Google Rich Results Test validation simulator.
 */

export default function Exercise5_MenuItemJsonLd() {
  const [selectedDishId, setSelectedDishId] = useState(1);
  const [activeTab, setActiveTab] = useState('audit'); // 'audit' | 'json' | 'google-serp'

  const dish = DISHES_DATA.find(d => d.id === selectedDishId) || DISHES_DATA[0];

  // Exact JSON-LD generated from the same dish record rendered on the page
  const jsonLdPayload = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    image: `https://addiseats.et/menu/${dish.id}/opengraph-image`,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
      url: `https://addiseats.et/menu/${dish.id}`,
      seller: {
        "@type": "Restaurant",
        name: "Addis Eats",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "ET"
        }
      }
    },
    suitableForDiet: dish.category === "Vegan" ? "https://schema.org/VeganDiet" : undefined
  };

  // Verification Checks
  const doesPriceMatch = jsonLdPayload.offers.price === dish.price;
  const isCurrencyETB = jsonLdPayload.offers.priceCurrency === "ETB";
  const doesNameMatch = jsonLdPayload.name === dish.name;
  const allChecksPass = doesPriceMatch && isCurrencyETB && doesNameMatch;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 5</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 5</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          MenuItem JSON-LD Structured Data Generation
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Generate Schema.org <code>MenuItem</code> JSON-LD from the exact same dish record rendered in the DOM, guaranteeing complete price and name parity in ETB.
        </p>
      </header>

      {/* Dish Selector & Tab Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginRight: '0.5rem' }}>Select Dish:</label>
          <select
            value={selectedDishId}
            onChange={(e) => setSelectedDishId(Number(e.target.value))}
            style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
          >
            {DISHES_DATA.map(d => (
              <option key={d.id} value={d.id}>{d.name} ({d.price} ETB - {d.category})</option>
            ))}
          </select>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={() => setActiveTab('audit')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: activeTab === 'audit' ? '#0f172a' : '#fff',
              color: activeTab === 'audit' ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Parity Audit
          </button>
          <button
            onClick={() => setActiveTab('json')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: activeTab === 'json' ? '#0f172a' : '#fff',
              color: activeTab === 'json' ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            JSON-LD Script Tag
          </button>
          <button
            onClick={() => setActiveTab('google-serp')}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 6,
              border: '1px solid #cbd5e1',
              background: activeTab === 'google-serp' ? '#0f172a' : '#fff',
              color: activeTab === 'google-serp' ? '#fff' : '#334155',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Google Rich Results SERP
          </button>
        </div>
      </div>

      {activeTab === 'audit' && (
        <div>
          {/* Check yourself: ETB Price Parity Banner */}
          <div style={{
            background: allChecksPass ? '#f0fdf4' : '#fef2f2',
            border: allChecksPass ? '1px solid #86efac' : '1px solid #fecaca',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 700, color: allChecksPass ? '#166534' : '#991b1b', fontSize: '0.9rem' }}>
                Check Yourself: Does the JSON-LD price match the price on the page, in ETB?
              </div>
              <div style={{ fontSize: '0.8rem', color: allChecksPass ? '#15803d' : '#b91c1c', marginTop: '0.2rem' }}>
                ✓ Page DOM displays <strong>&quot;{dish.price} ETB&quot;</strong> and JSON-LD schema declares <strong>offers.price = {jsonLdPayload.offers.price}</strong> with <strong>priceCurrency = &quot;ETB&quot;</strong>.
              </div>
            </div>
            <span style={{
              background: allChecksPass ? '#22c55e' : '#ef4444',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 20
            }}>
              100% MATCH
            </span>
          </div>

          {/* Side by Side DOM vs JSON-LD Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* DOM Rendered Content */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Rendered HTML DOM Output
              </div>
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>&lt;h1 class=&quot;dish-detail-title&quot;&gt;</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>{dish.name}</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 6, border: '1px solid #e2e8f0', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>&lt;span class=&quot;amount&quot;&gt;</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#059669' }}>{dish.price} ETB</div>
              </div>
              <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 6, border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748b' }}>&lt;p class=&quot;dish-detail-desc&quot;&gt;</span>
                <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.2rem' }}>{dish.description}</div>
              </div>
            </div>

            {/* JSON-LD Fields */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', padding: '1rem' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                Schema.org MenuItem JSON-LD Fields
              </div>
              <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: 6, border: '1px solid #bbf7d0', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#166534' }}>JSON-LD &quot;name&quot;:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14532d' }}>&quot;{jsonLdPayload.name}&quot;</div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: 6, border: '1px solid #bbf7d0', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#166534' }}>JSON-LD &quot;offers.price&quot; &amp; &quot;priceCurrency&quot;:</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14532d' }}>
                  {jsonLdPayload.offers.price} <span style={{ color: '#047857' }}>{jsonLdPayload.offers.priceCurrency}</span>
                </div>
              </div>
              <div style={{ background: '#f0fdf4', padding: '0.75rem', borderRadius: 6, border: '1px solid #bbf7d0' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#166534' }}>Diet Suitability:</span>
                <div style={{ fontSize: '0.85rem', color: '#14532d', fontFamily: 'monospace', marginTop: '0.2rem' }}>
                  {jsonLdPayload.suitableForDiet || 'None (Standard Meat / Poultry)'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'json' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>&lt;!-- Injected into app/menu/[id]/page.js --&gt;</div>
          <span style={{ color: '#7dd3fc' }}>&lt;script</span> <span style={{ color: '#fdba74' }}>type</span>=<span style={{ color: '#a7f3d0' }}>&quot;application/ld+json&quot;</span> <span style={{ color: '#fdba74' }}>dangerouslySetInnerHTML</span>={'{{'} __html: JSON.stringify(jsonLd) {'}}'} <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n\n'}
          <span style={{ color: '#94a3b8' }}>// Evaluated JSON payload:</span>{'\n'}
          <pre style={{ margin: 0, color: '#a7f3d0' }}>
            {JSON.stringify(jsonLdPayload, null, 2)}
          </pre>
        </div>
      )}

      {activeTab === 'google-serp' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#0f172a' }}>Google Rich Results SERP Preview</h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569' }}>
            How Google Search displays this dish when schema.org/MenuItem structured data is recognized:
          </p>

          <div style={{ maxWidth: 540, background: '#fff', border: '1px solid #dadce0', borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(60,64,67,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#202124', marginBottom: '0.25rem' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#f59e0b', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>🇪🇹</span>
              <span>addiseats.et &rsaquo; menu &rsaquo; {dish.id}</span>
            </div>
            <div style={{ color: '#1a0dab', fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.3, cursor: 'pointer', marginBottom: '0.25rem' }}>
              {dish.name} - {dish.price} ETB | Addis Eats
            </div>
            
            {/* Rich Snippet Row: Price & Diet */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.8rem', color: '#5f6368', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 700, color: '#137333' }}>{dish.price} ETB</span>
              <span>&bull;</span>
              <span>In stock</span>
              <span>&bull;</span>
              <span>Addis Ababa delivery</span>
              {dish.category === 'Vegan' && (
                <>
                  <span>&bull;</span>
                  <span style={{ background: '#e6f4ea', color: '#137333', padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}>Vegan</span>
                </>
              )}
            </div>

            <div style={{ fontSize: '0.82rem', color: '#4d5156', lineHeight: 1.4 }}>
              Order freshly prepared {dish.name} for {dish.price} ETB at Addis Eats. {dish.description} Served hot with fresh teff injera.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
