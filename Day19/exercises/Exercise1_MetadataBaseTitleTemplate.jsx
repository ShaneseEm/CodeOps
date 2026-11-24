import React, { useState } from 'react';

/**
 * Exercise 1: Set metadataBase and a Title Template in the Root Layout
 * 
 * Objectives:
 * 1. Define metadataBase with the production URL (https://addiseats.et).
 * 2. Configure title object with default title and template: '%s | Addis Eats'.
 * 3. Demonstrate how Next.js converts relative OpenGraph images and canonical URLs
 *    into absolute URLs across all child routes.
 * 4. Verify by viewing generated HTML source.
 */

export const ROOT_METADATA_CONFIG = {
  metadataBase: 'https://addiseats.et',
  titleTemplate: '%s | Addis Eats',
  defaultTitle: 'Addis Eats - Authentic Ethiopian Dining & Fast Delivery',
  description: 'Experience authentic Ethiopian culinary traditions in Addis Ababa. Freshly simmered Doro Wat, sizzling clay pot Tibs, lean seasoned Kitfo, and wholesome vegan fasting Beyaynetu delivered directly to your doorstep.',
  openGraph: {
    siteName: 'Addis Eats',
    locale: 'en_ET',
    type: 'website',
    image: '/opengraph-image', // Relative URL automatically resolved by metadataBase
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@AddisEatsET',
  },
};

const SAMPLE_CHILD_ROUTES = [
  {
    path: '/',
    name: 'Home Route (Root)',
    childTitle: 'Home - Authentic Ethiopian Cuisine & Delivery',
    childDescription: 'Taste traditional Ethiopian flavors in Addis Ababa. Fresh breakfast, lunch, and dinner delivered hot.',
    relativeOgImage: '/opengraph-image',
  },
  {
    path: '/menu',
    name: 'Menu Route',
    childTitle: 'Full Menu & Daily Specials',
    childDescription: 'Explore our complete menu of slow-simmered wots, sizzling tibs, and vegan beyaynetu platters.',
    relativeOgImage: '/opengraph-image',
  },
  {
    path: '/menu/1',
    name: 'Dish Detail: Doro Wat',
    childTitle: 'Doro Wat (240 ETB)',
    childDescription: 'Order freshly prepared Doro Wat for 240 ETB at Addis Eats. Spicy chicken stew with boiled egg.',
    relativeOgImage: '/menu/1/opengraph-image',
  },
  {
    path: '/cart',
    name: 'Cart (Private)',
    childTitle: 'Your Shopping Cart',
    childDescription: 'Review your selected authentic Ethiopian dishes before checkout.',
    relativeOgImage: '/opengraph-image',
  },
];

export default function Exercise1_MetadataBaseTitleTemplate() {
  const [selectedRoute, setSelectedRoute] = useState(SAMPLE_CHILD_ROUTES[0]);
  const [useMetadataBase, setUseMetadataBase] = useState(true);
  const [activeView, setActiveView] = useState('preview'); // 'preview' | 'source' | 'diff'

  const resolvedTitle = selectedRoute.path === '/'
    ? `${selectedRoute.childTitle} | Addis Eats`
    : `${selectedRoute.childTitle} | Addis Eats`;

  const resolvedOgImageUrl = useMetadataBase
    ? `${ROOT_METADATA_CONFIG.metadataBase}${selectedRoute.relativeOgImage}`
    : selectedRoute.relativeOgImage; // Relative URL (Fails social crawlers without metadataBase!)

  const resolvedCanonicalUrl = useMetadataBase
    ? `${ROOT_METADATA_CONFIG.metadataBase}${selectedRoute.path === '/' ? '' : selectedRoute.path}`
    : selectedRoute.path;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 1</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 1</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Root Layout metadataBase &amp; Title Template
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Configure <code>metadataBase</code> to resolve absolute open graph URLs and establish the <code>%s | Addis Eats</code> title template across every route.
        </p>
      </header>

      {/* Controls Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', background: '#f8fafc', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569' }}>Select Active Route:</label>
          <select
            value={selectedRoute.path}
            onChange={(e) => setSelectedRoute(SAMPLE_CHILD_ROUTES.find(r => r.path === e.target.value))}
            style={{ padding: '0.4rem 0.75rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.85rem', background: '#fff' }}
          >
            {SAMPLE_CHILD_ROUTES.map(r => (
              <option key={r.path} value={r.path}>{r.name} ({r.path})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <input
              type="checkbox"
              checked={useMetadataBase}
              onChange={(e) => setUseMetadataBase(e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            <span>Enable <code>metadataBase: new URL(&apos;https://addiseats.et&apos;)</code></span>
          </label>
        </div>
      </div>

      {/* View Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveView('preview')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeView === 'preview' ? '#0f172a' : '#fff',
            color: activeView === 'preview' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Browser Tab &amp; Header Preview
        </button>
        <button
          onClick={() => setActiveView('source')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeView === 'source' ? '#0f172a' : '#fff',
            color: activeView === 'source' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          View Page Source (&lt;head&gt;)
        </button>
        <button
          onClick={() => setActiveView('diff')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeView === 'diff' ? '#0f172a' : '#fff',
            color: activeView === 'diff' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Why metadataBase Matters (URL Resolution)
        </button>
      </div>

      {/* Main View Display */}
      {activeView === 'preview' && (
        <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, overflow: 'hidden' }}>
          {/* Simulated Browser Window Chrome */}
          <div style={{ background: '#e2e8f0', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #cbd5e1' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            </div>
            {/* Active Tab */}
            <div style={{ background: '#fff', padding: '0.3rem 0.8rem', borderRadius: '6px 6px 0 0', fontSize: '0.8rem', fontWeight: 600, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem', maxWidth: 450, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span>🇪🇹</span>
              <span>{resolvedTitle}</span>
            </div>
          </div>
          <div style={{ background: '#f8fafc', padding: '0.4rem 1rem', borderBottom: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b' }}>
            Address: <strong style={{ color: '#0f172a' }}>{ROOT_METADATA_CONFIG.metadataBase}{selectedRoute.path}</strong>
          </div>

          <div style={{ padding: '1.25rem', background: '#fff' }}>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.85rem', borderRadius: 6, marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>Computed Title from Template</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#14532d', marginTop: '0.2rem' }}>
                &lt;title&gt;{resolvedTitle}&lt;/title&gt;
              </div>
              <div style={{ fontSize: '0.75rem', color: '#15803d', marginTop: '0.25rem' }}>
                Template: <code>%s | Addis Eats</code> &rarr; Child Title <code>&quot;{selectedRoute.childTitle}&quot;</code> is dynamically wrapped.
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Resolved OpenGraph Image URL:</div>
                <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: useMetadataBase ? '#059669' : '#dc2626', wordBreak: 'break-all', marginTop: '0.25rem', fontWeight: 600 }}>
                  {resolvedOgImageUrl}
                </div>
                <div style={{ fontSize: '0.75rem', color: useMetadataBase ? '#059669' : '#dc2626', marginTop: '0.25rem' }}>
                  {useMetadataBase ? '✓ Fully-qualified absolute URL (Passed for WhatsApp/Twitter/Telegram)' : '✗ Relative URL (Social scrapers fail to load preview image)'}
                </div>
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: 6, padding: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Resolved Canonical URL:</div>
                <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: useMetadataBase ? '#059669' : '#dc2626', wordBreak: 'break-all', marginTop: '0.25rem', fontWeight: 600 }}>
                  {resolvedCanonicalUrl}
                </div>
                <div style={{ fontSize: '0.75rem', color: useMetadataBase ? '#059669' : '#dc2626', marginTop: '0.25rem' }}>
                  {useMetadataBase ? '✓ Absolute canonical link for Googlebot search index' : '✗ Incomplete URL'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'source' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>&lt;!-- Generated HTML &lt;head&gt; source for {selectedRoute.path} --&gt;</div>
          <span style={{ color: '#7dd3fc' }}>&lt;html</span> <span style={{ color: '#fdba74' }}>lang</span>=<span style={{ color: '#a7f3d0' }}>&quot;en&quot;</span><span style={{ color: '#7dd3fc' }}>&gt;</span>{'\n'}
          <span style={{ color: '#7dd3fc' }}>&lt;head&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>charSet</span>=<span style={{ color: '#a7f3d0' }}>&quot;utf-8&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;title&gt;</span><span style={{ color: '#fef08a', fontWeight: 'bold' }}>{resolvedTitle}</span><span style={{ color: '#7dd3fc' }}>&lt;/title&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>name</span>=<span style={{ color: '#a7f3d0' }}>&quot;description&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;{selectedRoute.childDescription}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;link</span> <span style={{ color: '#fdba74' }}>rel</span>=<span style={{ color: '#a7f3d0' }}>&quot;canonical&quot;</span> <span style={{ color: '#fdba74' }}>href</span>=<span style={{ color: '#34d399', fontWeight: 'bold' }}>&quot;{resolvedCanonicalUrl}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:site_name&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;Addis Eats&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:title&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;{resolvedTitle}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:description&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;{selectedRoute.childDescription}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:url&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#34d399' }}>&quot;{resolvedCanonicalUrl}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:image&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: useMetadataBase ? '#34d399' : '#f87171', fontWeight: 'bold' }}>&quot;{resolvedOgImageUrl}&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:image:width&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;1200&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>property</span>=<span style={{ color: '#a7f3d0' }}>&quot;og:image:height&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;630&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          {'  '}<span style={{ color: '#7dd3fc' }}>&lt;meta</span> <span style={{ color: '#fdba74' }}>name</span>=<span style={{ color: '#a7f3d0' }}>&quot;twitter:card&quot;</span> <span style={{ color: '#fdba74' }}>content</span>=<span style={{ color: '#a7f3d0' }}>&quot;summary_large_image&quot;</span> <span style={{ color: '#7dd3fc' }}>/&gt;</span>{'\n'}
          <span style={{ color: '#7dd3fc' }}>&lt;/head&gt;</span>
        </div>
      )}

      {activeView === 'diff' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', color: '#0f172a' }}>Why Setting metadataBase is Critical in Next.js App Router</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem' }}>Attribute</th>
                <th style={{ padding: '0.6rem' }}>Without metadataBase (Broken)</th>
                <th style={{ padding: '0.6rem' }}>With metadataBase (Compliant)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.6rem', fontWeight: 600 }}>og:image</td>
                <td style={{ padding: '0.6rem', color: '#dc2626' }}><code>/opengraph-image</code> (Rejected by WhatsApp/Telegram previewers)</td>
                <td style={{ padding: '0.6rem', color: '#059669' }}><code>https://addiseats.et/opengraph-image</code> (Renders rich preview card)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.6rem', fontWeight: 600 }}>canonical</td>
                <td style={{ padding: '0.6rem', color: '#dc2626' }}><code>/menu</code> (Ambiguous relative link)</td>
                <td style={{ padding: '0.6rem', color: '#059669' }}><code>https://addiseats.et/menu</code> (Unambiguous indexing signal)</td>
              </tr>
              <tr>
                <td style={{ padding: '0.6rem', fontWeight: 600 }}>Build Warnings</td>
                <td style={{ padding: '0.6rem', color: '#dc2626' }}>Throws <code>metadataBase is not set</code> console warning in Next.js</td>
                <td style={{ padding: '0.6rem', color: '#059669' }}>Zero build warnings, deterministic production build</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#475569' }}>
            <strong>Implementation Code (`app/layout.js`):</strong>
            <pre style={{ margin: '0.5rem 0 0', background: '#0f172a', color: '#f8fafc', padding: '0.75rem', borderRadius: 4, overflowX: 'auto' }}>
{`export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://addiseats.et'),
  title: {
    default: 'Addis Eats - Authentic Ethiopian Dining & Fast Delivery',
    template: '%s | Addis Eats',
  },
  description: 'Experience authentic Ethiopian culinary traditions in Addis Ababa...',
};`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
