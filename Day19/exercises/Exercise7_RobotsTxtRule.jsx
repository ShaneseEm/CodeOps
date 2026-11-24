import React, { useState } from 'react';

/**
 * Exercise 7: Write robots.js Disallowing /cart & /checkout and Pointing at the Sitemap
 * 
 * Objectives:
 * 1. Implement app/robots.js using standard Next.js App Router syntax.
 * 2. Define userAgent: '*' rule.
 * 3. Allow indexing on '/', '/menu', '/menu/*'.
 * 4. Disallow indexing on '/cart', '/checkout', and '/api/*'.
 * 5. Direct search engine bots to https://addiseats.et/sitemap.xml.
 * 6. Interactive crawler access tester for arbitrary paths.
 */

export const ROBOTS_CONFIG = {
  rules: {
    userAgent: '*',
    allow: ['/', '/menu', '/menu/*'],
    disallow: ['/cart', '/checkout', '/api/*'],
  },
  sitemap: 'https://addiseats.et/sitemap.xml',
  host: 'https://addiseats.et',
};

const TEST_URLS = [
  { path: '/', label: 'Homepage', expected: 'ALLOW' },
  { path: '/menu', label: 'Menu Catalog', expected: 'ALLOW' },
  { path: '/menu/1', label: 'Dish Detail: Doro Wat', expected: 'ALLOW' },
  { path: '/menu?category=Vegan', label: 'Menu with Query Param', expected: 'ALLOW' },
  { path: '/cart', label: 'User Cart', expected: 'DISALLOW' },
  { path: '/cart?item=1', label: 'Cart with query params', expected: 'DISALLOW' },
  { path: '/checkout', label: 'Checkout Step', expected: 'DISALLOW' },
  { path: '/api/dishes', label: 'Dishes REST API', expected: 'DISALLOW' },
  { path: '/api/orders', label: 'Orders REST API', expected: 'DISALLOW' },
];

export default function Exercise7_RobotsTxtRule() {
  const [customPath, setCustomPath] = useState('/cart');
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'raw' | 'code'

  const evaluatePath = (path) => {
    // Check disallow rules first
    for (const rule of ROBOTS_CONFIG.rules.disallow) {
      if (rule.endsWith('/*')) {
        const prefix = rule.slice(0, -2);
        if (path.startsWith(prefix)) return { status: 'DISALLOW', matchedRule: `Disallow: ${rule}` };
      } else if (path === rule || path.startsWith(`${rule}/`) || path.startsWith(`${rule}?`)) {
        return { status: 'DISALLOW', matchedRule: `Disallow: ${rule}` };
      }
    }
    // Check allow rules
    for (const rule of ROBOTS_CONFIG.rules.allow) {
      if (rule.endsWith('/*')) {
        const prefix = rule.slice(0, -2);
        if (path.startsWith(prefix)) return { status: 'ALLOW', matchedRule: `Allow: ${rule}` };
      } else if (path === rule || path.startsWith(`${rule}/`) || path.startsWith(`${rule}?`)) {
        return { status: 'ALLOW', matchedRule: `Allow: ${rule}` };
      }
    }
    return { status: 'ALLOW', matchedRule: 'Default: Implicit Allow' };
  };

  const currentEvaluation = evaluatePath(customPath);

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 7</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 7</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Robots.js Rules &amp; Search Engine Crawler Directives
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Configure <code>app/robots.js</code> to disallow crawling of <code>/cart</code> and <code>/checkout</code>, while pointing crawlers to the sitemap.
        </p>
      </header>

      {/* View Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('simulator')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'simulator' ? '#0f172a' : '#fff',
            color: activeTab === 'simulator' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Crawler Rule Simulator
        </button>
        <button
          onClick={() => setActiveTab('raw')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'raw' ? '#0f172a' : '#fff',
            color: activeTab === 'raw' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Generated robots.txt File
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
          app/robots.js Source Code
        </button>
      </div>

      {activeTab === 'simulator' && (
        <div>
          {/* Interactive URL Tester */}
          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
              Test Crawler URL Access (e.g. Googlebot / Bingbot):
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: 6, padding: '0 0.6rem', flex: 1 }}>
                <span style={{ color: '#64748b', fontSize: '0.85rem', fontFamily: 'monospace' }}>https://addiseats.et</span>
                <input
                  type="text"
                  value={customPath}
                  onChange={(e) => setCustomPath(e.target.value)}
                  placeholder="/cart"
                  style={{ border: 'none', outline: 'none', padding: '0.45rem', fontSize: '0.85rem', fontFamily: 'monospace', width: '100%' }}
                />
              </div>
            </div>

            {/* Evaluation Result */}
            <div style={{
              marginTop: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 6,
              background: currentEvaluation.status === 'ALLOW' ? '#f0fdf4' : '#fef2f2',
              border: currentEvaluation.status === 'ALLOW' ? '1px solid #86efac' : '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: currentEvaluation.status === 'ALLOW' ? '#166534' : '#991b1b' }}>
                  Crawler Verdict: {currentEvaluation.status === 'ALLOW' ? 'ALLOWED TO CRAWL' : 'BLOCKED (DISALLOWED)'}
                </span>
                <div style={{ fontSize: '0.8rem', color: currentEvaluation.status === 'ALLOW' ? '#15803d' : '#b91c1c', marginTop: '0.15rem' }}>
                  Rule Applied: <code>{currentEvaluation.matchedRule}</code>
                </div>
              </div>
              <span style={{
                background: currentEvaluation.status === 'ALLOW' ? '#22c55e' : '#ef4444',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 20
              }}>
                {currentEvaluation.status}
              </span>
            </div>
          </div>

          {/* Test Matrix */}
          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ background: '#f8fafc', padding: '0.65rem 1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>
              Standard Crawler Verification Matrix
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '0.6rem' }}>Route Tested</th>
                  <th style={{ padding: '0.6rem' }}>Purpose</th>
                  <th style={{ padding: '0.6rem' }}>Expected Directive</th>
                  <th style={{ padding: '0.6rem' }}>Test</th>
                </tr>
              </thead>
              <tbody>
                {TEST_URLS.map(t => {
                  const evalResult = evaluatePath(t.path);
                  const isMatch = evalResult.status === t.expected;
                  return (
                    <tr key={t.path} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.6rem', fontFamily: 'monospace', fontWeight: 600, color: '#0f172a' }}>{t.path}</td>
                      <td style={{ padding: '0.6rem', color: '#64748b' }}>{t.label}</td>
                      <td style={{ padding: '0.6rem' }}>
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          background: t.expected === 'ALLOW' ? '#dcfce7' : '#fee2e2',
                          color: t.expected === 'ALLOW' ? '#166534' : '#991b1b'
                        }}>
                          {t.expected}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem' }}>
                        <button
                          onClick={() => setCustomPath(t.path)}
                          style={{ padding: '2px 8px', borderRadius: 4, border: '1px solid #cbd5e1', background: '#fff', fontSize: '0.75rem', cursor: 'pointer' }}
                        >
                          Simulate &rarr;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'raw' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}># https://addiseats.et/robots.txt</div>
          <span style={{ color: '#fdba74' }}>User-Agent:</span> <span style={{ color: '#a7f3d0' }}>*</span>{'\n'}
          <span style={{ color: '#fdba74' }}>Allow:</span> <span style={{ color: '#38bdf8' }}>/</span>{'\n'}
          <span style={{ color: '#fdba74' }}>Allow:</span> <span style={{ color: '#38bdf8' }}>/menu</span>{'\n'}
          <span style={{ color: '#fdba74' }}>Allow:</span> <span style={{ color: '#38bdf8' }}>/menu/*</span>{'\n'}
          <span style={{ color: '#f43f5e' }}>Disallow:</span> <span style={{ color: '#f87171' }}>/cart</span>{'\n'}
          <span style={{ color: '#f43f5e' }}>Disallow:</span> <span style={{ color: '#f87171' }}>/checkout</span>{'\n'}
          <span style={{ color: '#f43f5e' }}>Disallow:</span> <span style={{ color: '#f87171' }}>/api/*</span>{'\n\n'}
          <span style={{ color: '#fdba74' }}>Sitemap:</span> <span style={{ color: '#fef08a' }}>https://addiseats.et/sitemap.xml</span>{'\n'}
          <span style={{ color: '#fdba74' }}>Host:</span> <span style={{ color: '#a7f3d0' }}>https://addiseats.et</span>
        </div>
      )}

      {activeTab === 'code' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// app/robots.js</div>
          <span style={{ color: '#f43f5e' }}>const</span> BASE_URL = process.env.NEXT_PUBLIC_APP_URL || <span style={{ color: '#a7f3d0' }}>&apos;https://addiseats.et&apos;</span>;{'\n\n'}
          <span style={{ color: '#f43f5e' }}>export default function</span> <span style={{ color: '#38bdf8' }}>robots</span>() {'{\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>return</span> {'{\n'}
          {'    '}rules: {'{\n'}
          {'      '}userAgent: <span style={{ color: '#a7f3d0' }}>&apos;*&apos;</span>,{'\n'}
          {'      '}allow: [<span style={{ color: '#a7f3d0' }}>&apos;/&apos;</span>, <span style={{ color: '#a7f3d0' }}>&apos;/menu&apos;</span>, <span style={{ color: '#a7f3d0' }}>&apos;/menu/*&apos;</span>],{'\n'}
          {'      '}disallow: [<span style={{ color: '#a7f3d0' }}>&apos;/cart&apos;</span>, <span style={{ color: '#a7f3d0' }}>&apos;/checkout&apos;</span>, <span style={{ color: '#a7f3d0' }}>&apos;/api/*&apos;</span>],{'\n'}
          {'    '}{'},\n'}
          {'    '}sitemap: <span style={{ color: '#a7f3d0' }}>`\${BASE_URL}/sitemap.xml`</span>,{'\n'}
          {'  };\n'}
          {'}'}
        </div>
      )}
    </div>
  );
}
