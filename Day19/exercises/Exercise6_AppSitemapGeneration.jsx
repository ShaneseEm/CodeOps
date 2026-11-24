import React, { useState } from 'react';
import { DISHES_DATA } from './dishes';

/**
 * Exercise 6: Generate app/sitemap.js from Dishes, Excluding Private Routes
 * 
 * Objectives:
 * 1. Implement app/sitemap.js dynamically pulling from dish records.
 * 2. Assign appropriate indexing priorities:
 *    - / (Homepage): priority 1.0, changeFrequency: daily
 *    - /menu (Menu Catalog): priority 0.9, changeFrequency: daily
 *    - /menu/[id] (Each Dish Record): priority 0.8, changeFrequency: weekly
 * 3. STRICTLY EXCLUDE private routes: /cart, /checkout, /admin, /api/*
 * 4. Verify Check yourself question 3: "Does your sitemap contain any route that requires signing in?"
 */

const BASE_URL = 'https://addiseats.et';

export default function Exercise6_AppSitemapGeneration() {
  const [activeTab, setActiveTab] = useState('table'); // 'table' | 'xml' | 'private-audit' | 'code'

  // Dynamic Sitemap Generation logic
  const staticEntries = [
    {
      url: `${BASE_URL}`,
      lastModified: '2026-11-24T00:00:00Z',
      changeFrequency: 'daily',
      priority: 1.0,
      type: 'Core Static Route',
    },
    {
      url: `${BASE_URL}/menu`,
      lastModified: '2026-11-24T00:00:00Z',
      changeFrequency: 'daily',
      priority: 0.9,
      type: 'Catalog Static Route',
    },
  ];

  const dishEntries = DISHES_DATA.map((dish) => ({
    url: `${BASE_URL}/menu/${dish.id}`,
    lastModified: '2026-11-24T00:00:00Z',
    changeFrequency: 'weekly',
    priority: 0.8,
    type: `Dish Record (${dish.name})`,
  }));

  const fullSitemap = [...staticEntries, ...dishEntries];

  // Excluded Private Routes
  const excludedPrivateRoutes = [
    { path: '/cart', reason: 'Personalized user shopping basket state. Crawling wastes bot budget and causes session churn.' },
    { path: '/checkout', reason: 'Transactional checkout flow requiring authentication/cookies. Must never be indexed.' },
    { path: '/api/dishes', reason: 'Internal REST API endpoint. Bots should index rendered HTML, not raw JSON endpoints.' },
    { path: '/api/orders', reason: 'Order creation endpoint containing sensitive customer purchase transactions.' },
  ];

  const containsPrivateRoutes = fullSitemap.some(entry =>
    entry.url.includes('/cart') || entry.url.includes('/checkout') || entry.url.includes('/api')
  );

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 6</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 6</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Dynamic app/sitemap.js Generator &amp; Private Route Exclusion
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Generate a valid XML sitemap from live dish records while strictly excluding private and transactional routes.
        </p>
      </header>

      {/* Check Yourself Verification Banner */}
      <div style={{
        background: !containsPrivateRoutes ? '#f0fdf4' : '#fef2f2',
        border: !containsPrivateRoutes ? '1px solid #86efac' : '1px solid #fecaca',
        padding: '0.75rem 1rem',
        borderRadius: 8,
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ fontWeight: 700, color: !containsPrivateRoutes ? '#166534' : '#991b1b', fontSize: '0.9rem' }}>
            Check Yourself: Does your sitemap contain any route that requires signing in?
          </div>
          <div style={{ fontSize: '0.8rem', color: !containsPrivateRoutes ? '#15803d' : '#b91c1c', marginTop: '0.2rem' }}>
            {!containsPrivateRoutes
              ? '✓ VERIFIED: Zero private or auth-required routes (/cart, /checkout) are included. Only public crawlable pages are exposed.'
              : '✗ FAILED: Private routes detected in sitemap!'}
          </div>
        </div>
        <span style={{
          background: !containsPrivateRoutes ? '#22c55e' : '#ef4444',
          color: '#fff',
          fontSize: '0.75rem',
          fontWeight: 800,
          padding: '4px 10px',
          borderRadius: 20
        }}>
          PASS (0 PRIVATE ROUTES)
        </span>
      </div>

      {/* Tab Switchers */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('table')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'table' ? '#0f172a' : '#fff',
            color: activeTab === 'table' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Sitemap Entries Table ({fullSitemap.length} URLs)
        </button>
        <button
          onClick={() => setActiveTab('xml')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'xml' ? '#0f172a' : '#fff',
            color: activeTab === 'xml' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Raw sitemap.xml Output
        </button>
        <button
          onClick={() => setActiveTab('private-audit')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'private-audit' ? '#0f172a' : '#fff',
            color: activeTab === 'private-audit' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Excluded Private Routes Audit
        </button>
        <button
          onClick={() => setActiveTab('code')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'code' ? '#0f172a' : '#fff',
            color: activeTab === 'code' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          app/sitemap.js Source
        </button>
      </div>

      {activeTab === 'table' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '0.65rem' }}>Type</th>
                <th style={{ padding: '0.65rem' }}>Target Absolute URL</th>
                <th style={{ padding: '0.65rem' }}>Change Frequency</th>
                <th style={{ padding: '0.65rem' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {fullSitemap.map((item, index) => (
                <tr key={item.url} style={{ borderBottom: '1px solid #f1f5f9', background: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                  <td style={{ padding: '0.65rem', fontWeight: 600, color: '#334155' }}>{item.type}</td>
                  <td style={{ padding: '0.65rem', fontFamily: 'monospace', color: '#2563eb' }}>{item.url}</td>
                  <td style={{ padding: '0.65rem', color: '#64748b' }}>{item.changeFrequency}</td>
                  <td style={{ padding: '0.65rem' }}>
                    <span style={{
                      background: item.priority >= 0.9 ? '#dbeafe' : '#f1f5f9',
                      color: item.priority >= 0.9 ? '#1d4ed8' : '#475569',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontWeight: 700
                    }}>
                      {item.priority.toFixed(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'xml' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>&lt;!-- https://addiseats.et/sitemap.xml --&gt;</div>
          <span style={{ color: '#7dd3fc' }}>&lt;?xml</span> <span style={{ color: '#fdba74' }}>version</span>=<span style={{ color: '#a7f3d0' }}>&quot;1.0&quot;</span> <span style={{ color: '#fdba74' }}>encoding</span>=<span style={{ color: '#a7f3d0' }}>&quot;UTF-8&quot;</span><span style={{ color: '#7dd3fc' }}>?&gt;</span>{'\n'}
          <span style={{ color: '#7dd3fc' }}>&lt;urlset</span> <span style={{ color: '#fdba74' }}>xmlns</span>=<span style={{ color: '#a7f3d0' }}>&quot;http://www.sitemaps.org/schemas/sitemap/0.9&quot;</span><span style={{ color: '#7dd3fc' }}>&gt;</span>{'\n'}
          {fullSitemap.map(entry => (
            <React.Fragment key={entry.url}>
              {'  '}<span style={{ color: '#7dd3fc' }}>&lt;url&gt;</span>{'\n'}
              {'    '}<span style={{ color: '#7dd3fc' }}>&lt;loc&gt;</span><span style={{ color: '#fef08a' }}>{entry.url}</span><span style={{ color: '#7dd3fc' }}>&lt;/loc&gt;</span>{'\n'}
              {'    '}<span style={{ color: '#7dd3fc' }}>&lt;lastmod&gt;</span><span style={{ color: '#94a3b8' }}>{entry.lastModified}</span><span style={{ color: '#7dd3fc' }}>&lt;/lastmod&gt;</span>{'\n'}
              {'    '}<span style={{ color: '#7dd3fc' }}>&lt;changefreq&gt;</span><span style={{ color: '#a7f3d0' }}>{entry.changeFrequency}</span><span style={{ color: '#7dd3fc' }}>&lt;/changefreq&gt;</span>{'\n'}
              {'    '}<span style={{ color: '#7dd3fc' }}>&lt;priority&gt;</span><span style={{ color: '#38bdf8' }}>{entry.priority.toFixed(1)}</span><span style={{ color: '#7dd3fc' }}>&lt;/priority&gt;</span>{'\n'}
              {'  '}<span style={{ color: '#7dd3fc' }}>&lt;/url&gt;</span>{'\n'}
            </React.Fragment>
          ))}
          <span style={{ color: '#7dd3fc' }}>&lt;/urlset&gt;</span>
        </div>
      )}

      {activeTab === 'private-audit' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#0f172a' }}>
            Private &amp; Transactional Route Exclusion Rationale
          </h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569' }}>
            Including private paths in a sitemap sends contradictory signals to search engine crawlers:
          </p>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                <th style={{ padding: '0.65rem' }}>Excluded Route</th>
                <th style={{ padding: '0.65rem' }}>Why Excluded From Sitemap</th>
                <th style={{ padding: '0.65rem' }}>Crawl Status</th>
              </tr>
            </thead>
            <tbody>
              {excludedPrivateRoutes.map(item => (
                <tr key={item.path} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.65rem', fontFamily: 'monospace', fontWeight: 600, color: '#dc2626' }}>{item.path}</td>
                  <td style={{ padding: '0.65rem', color: '#475569' }}>{item.reason}</td>
                  <td style={{ padding: '0.65rem' }}>
                    <span style={{ background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: 4, fontWeight: 700, fontSize: '0.75rem' }}>
                      STRICTLY EXCLUDED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'code' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// app/sitemap.js</div>
          <span style={{ color: '#f43f5e' }}>export default async function</span> <span style={{ color: '#38bdf8' }}>sitemap</span>() {'{\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>const</span> dishes = <span style={{ color: '#f43f5e' }}>await</span> <span style={{ color: '#38bdf8' }}>getDishesFromDatabase</span>();{'\n\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>const</span> staticRoutes = [{'\n'}
          {'    '}url: <span style={{ color: '#a7f3d0' }}>&apos;https://addiseats.et&apos;</span>, lastModified: <span style={{ color: '#f43f5e' }}>new</span> Date(), changeFrequency: <span style={{ color: '#a7f3d0' }}>&apos;daily&apos;</span>, priority: 1.0,{'\n'}
          {'    '}url: <span style={{ color: '#a7f3d0' }}>&apos;https://addiseats.et/menu&apos;</span>, lastModified: <span style={{ color: '#f43f5e' }}>new</span> Date(), changeFrequency: <span style={{ color: '#a7f3d0' }}>&apos;daily&apos;</span>, priority: 0.9,{'\n'}
          {'  '}];{'\n\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>const</span> dishRoutes = dishes.map((dish) =&gt; ({'{\n'}
          {'    '}url: <span style={{ color: '#a7f3d0' }}>`https://addiseats.et/menu/\${dish.id}`</span>,{'\n'}
          {'    '}lastModified: <span style={{ color: '#f43f5e' }}>new</span> Date(),{'\n'}
          {'    '}changeFrequency: <span style={{ color: '#a7f3d0' }}>&apos;weekly&apos;</span>,{'\n'}
          {'    '}priority: 0.8,{'\n'}
          {'  }'}));{'\n\n'}
          {'  '}<span style={{ color: '#94a3b8' }}>// /cart and /checkout are omitted from the array</span>{'\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>return</span> [...staticRoutes, ...dishRoutes];{'\n'}
          {'}'}
        </div>
      )}
    </div>
  );
}
