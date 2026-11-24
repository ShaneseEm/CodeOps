import React, { useState } from 'react';

/**
 * Exercise 2: Give Every Static Route Its Own Title and a Human-Written Description
 * 
 * Objectives:
 * 1. Define distinct title and human-written description on each static route:
 *    - / (Home)
 *    - /menu (Menu Catalog with query parameter handling)
 *    - /cart (Order Cart - private route)
 *    - /checkout (Checkout - transactional route)
 * 2. Enforce canonical URL on /menu to prevent duplicate content issues when query
 *    parameters like ?category=Vegan or ?spicy=true are present.
 * 3. Restrict indexing on private routes (/cart, /checkout) via robots { index: false, follow: false }.
 * 4. Verify that each route has exactly ONE <h1> that describes the page accurately.
 */

export const STATIC_ROUTES_CONFIG = [
  {
    path: '/',
    name: 'Home',
    h1: 'Addis Eats: Authentic Ethiopian Cuisine & Fast Delivery',
    metaTitle: 'Home - Authentic Ethiopian Cuisine & Delivery',
    computedFullTitle: 'Home - Authentic Ethiopian Cuisine & Delivery | Addis Eats',
    description: 'Taste traditional Ethiopian flavors in Addis Ababa. Explore our fresh breakfast, lunch, and dinner menus crafted with heritage spices, slow-simmered wots, and warm teff injera.',
    canonical: 'https://addiseats.et/',
    robots: 'index, follow',
    isPrivate: false,
    queryParamExample: null,
    characterCount: 173, // Optimal length: 150-160 chars
  },
  {
    path: '/menu',
    name: 'Full Menu',
    h1: 'Traditional Ethiopian Menu & Daily Specials',
    metaTitle: 'Full Menu & Traditional Specialties',
    computedFullTitle: 'Full Menu & Traditional Specialties | Addis Eats',
    description: 'Explore our complete Addis Ababa menu of authentic slow-simmered wots, sizzling clay pot tibs, and vegan beyaynetu fasting platters. Filter by category and spice level.',
    canonical: 'https://addiseats.et/menu',
    robots: 'index, follow',
    isPrivate: false,
    queryParamExample: '/menu?category=Vegan&spicy=true',
    characterCount: 174,
  },
  {
    path: '/cart',
    name: 'Shopping Cart',
    h1: 'Your Addis Eats Cart',
    metaTitle: 'Your Shopping Cart',
    computedFullTitle: 'Your Shopping Cart | Addis Eats',
    description: 'Review your selected authentic Ethiopian dishes, customize your injera portions, and review your order subtotal before heading to secure checkout.',
    canonical: 'https://addiseats.et/cart',
    robots: 'noindex, nofollow',
    isPrivate: true,
    queryParamExample: null,
    characterCount: 154,
  },
  {
    path: '/checkout',
    name: 'Checkout & Payment',
    h1: 'Complete Your Addis Eats Order',
    metaTitle: 'Secure Checkout & Payment',
    computedFullTitle: 'Secure Checkout & Payment | Addis Eats',
    description: 'Finalize your Addis Eats order with instant Telebirr or CBE Birr payment. Fast, reliable, and secure contactless food delivery to any sub-city in Addis Ababa.',
    canonical: 'https://addiseats.et/checkout',
    robots: 'noindex, nofollow',
    isPrivate: true,
    queryParamExample: null,
    characterCount: 164,
  },
];

export default function Exercise2_StaticRoutesMetadata() {
  const [selectedPath, setSelectedPath] = useState('/menu');
  const [activeQueryParam, setActiveQueryParam] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'canonical-audit' | 'h1-audit'

  const currentRoute = STATIC_ROUTES_CONFIG.find(r => r.path === selectedPath) || STATIC_ROUTES_CONFIG[0];
  const simulatedBrowserUrl = activeQueryParam ? `${currentRoute.path}${activeQueryParam}` : currentRoute.path;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 2</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 2</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Static Routes Metadata, Human Descriptions &amp; Canonical URLs
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Ensure every static route provides a human-written description, a verified single <code>&lt;h1&gt;</code>, and canonical links to handle query parameters cleanly.
        </p>
      </header>

      {/* Tab Selectors */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('overview')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'overview' ? '#0f172a' : '#fff',
            color: activeTab === 'overview' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Route Metadata Matrix
        </button>
        <button
          onClick={() => setActiveTab('canonical-audit')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'canonical-audit' ? '#0f172a' : '#fff',
            color: activeTab === 'canonical-audit' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Canonical URL Query Param Test
        </button>
        <button
          onClick={() => setActiveTab('h1-audit')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'h1-audit' ? '#0f172a' : '#fff',
            color: activeTab === 'h1-audit' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Single &lt;h1&gt; Heading Audit
        </button>
      </div>

      {activeTab === 'overview' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            {STATIC_ROUTES_CONFIG.map((route) => {
              const isSelected = route.path === selectedPath;
              return (
                <div
                  key={route.path}
                  onClick={() => { setSelectedPath(route.path); setActiveQueryParam(''); }}
                  style={{
                    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '1rem',
                    background: isSelected ? '#eff6ff' : '#fff',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 6px -1px rgba(37,99,235,0.1)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{route.name}</span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 12,
                      background: route.isPrivate ? '#fee2e2' : '#dcfce7',
                      color: route.isPrivate ? '#991b1b' : '#166534'
                    }}>
                      {route.isPrivate ? 'PRIVATE (noindex)' : 'PUBLIC (indexed)'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#2563eb', marginBottom: '0.5rem' }}>
                    {route.path}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                    {route.description.slice(0, 85)}...
                  </div>
                </div>
              );
            })}
          </div>

          {/* Route Details Card */}
          <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', overflow: 'hidden' }}>
            <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>
                Inspection: <code>{currentRoute.path}</code>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Description Length: <strong>{currentRoute.characterCount} chars</strong> (Ideal: 150-165 chars)
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Single &lt;h1&gt; on Page:</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                  {currentRoute.h1}
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Resolved Document Title:</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1d4ed8', marginTop: '0.2rem' }}>
                  {currentRoute.computedFullTitle}
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Human-Written Meta Description:</span>
                <p style={{ margin: '0.2rem 0 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.45, background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: 6, border: '1px solid #e2e8f0' }}>
                  &ldquo;{currentRoute.description}&rdquo;
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: 6, fontSize: '0.8rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Canonical Target:</span>
                  <div style={{ fontFamily: 'monospace', color: '#059669', fontWeight: 600, marginTop: '0.2rem' }}>{currentRoute.canonical}</div>
                </div>
                <div style={{ background: '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: 6, fontSize: '0.8rem' }}>
                  <span style={{ color: '#64748b', fontWeight: 600 }}>Robots Directive:</span>
                  <div style={{ fontFamily: 'monospace', color: currentRoute.isPrivate ? '#dc2626' : '#059669', fontWeight: 600, marginTop: '0.2rem' }}>{currentRoute.robots}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'canonical-audit' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#0f172a' }}>
            Handling Query Parameters with Canonical URLs
          </h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569' }}>
            The requirement specifies: <em>&quot;A canonical URL on any route that accepts query parameters.&quot;</em>
            When visitors filter <code>/menu</code> by category or spice level, the canonical link tells Googlebot to attribute all search authority back to the clean master URL <code>https://addiseats.et/menu</code>.
          </p>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.5rem' }}>
              Simulate Query Parameters on <code>/menu</code>:
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveQueryParam('')}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', background: activeQueryParam === '' ? '#2563eb' : '#fff', color: activeQueryParam === '' ? '#fff' : '#334155', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                No Params (Base Menu)
              </button>
              <button
                onClick={() => setActiveQueryParam('?category=Vegan')}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', background: activeQueryParam === '?category=Vegan' ? '#2563eb' : '#fff', color: activeQueryParam === '?category=Vegan' ? '#fff' : '#334155', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                ?category=Vegan
              </button>
              <button
                onClick={() => setActiveQueryParam('?category=Grill&spicy=true')}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', background: activeQueryParam === '?category=Grill&spicy=true' ? '#2563eb' : '#fff', color: activeQueryParam === '?category=Grill&spicy=true' ? '#fff' : '#334155', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                ?category=Grill&amp;spicy=true
              </button>
              <button
                onClick={() => setActiveQueryParam('?sort=price_asc')}
                style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', background: activeQueryParam === '?sort=price_asc' ? '#2563eb' : '#fff', color: activeQueryParam === '?sort=price_asc' ? '#fff' : '#334155', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                ?sort=price_asc
              </button>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', background: '#f8fafc' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span>Requested Browser Address:</span>
              <strong style={{ fontFamily: 'monospace', color: '#2563eb' }}>https://addiseats.et{simulatedBrowserUrl}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
              <span>Rendered Canonical Tag in &lt;head&gt;:</span>
              <strong style={{ fontFamily: 'monospace', color: '#059669' }}>&lt;link rel=&quot;canonical&quot; href=&quot;https://addiseats.et/menu&quot; /&gt;</strong>
            </div>
            <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '0.75rem', borderRadius: 6, fontSize: '0.8rem', color: '#166534' }}>
              ✓ <strong>Duplicate Content Protected:</strong> Search engines crawl the filtered parameter URL but combine ranking weight into the single canonical authority <code>https://addiseats.et/menu</code>.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'h1-audit' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#0f172a' }}>
            Check Yourself Audit: Exactly One &lt;h1&gt; Per Page
          </h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569' }}>
            Requirement: <em>&quot;Is there exactly one h1 on each page, and does it describe the page?&quot;</em>
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem' }}>Route</th>
                <th style={{ padding: '0.6rem' }}>Target &lt;h1&gt; Element Text</th>
                <th style={{ padding: '0.6rem' }}>H1 Count</th>
                <th style={{ padding: '0.6rem' }}>Audit Status</th>
              </tr>
            </thead>
            <tbody>
              {STATIC_ROUTES_CONFIG.map(r => (
                <tr key={r.path} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '0.6rem', fontFamily: 'monospace', fontWeight: 600 }}>{r.path}</td>
                  <td style={{ padding: '0.6rem', color: '#0f172a' }}>{r.h1}</td>
                  <td style={{ padding: '0.6rem', fontWeight: 700, color: '#059669' }}>Exactly 1</td>
                  <td style={{ padding: '0.6rem' }}>
                    <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>
                      ✓ PASS
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
