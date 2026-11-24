import React, { useState } from 'react';
import { DISHES_DATA } from './dishes';

/**
 * Exercise 3: Dynamic generateMetadata for Dish Routes
 * 
 * Objectives:
 * 1. Implement generateMetadata({ params }) for dynamic route /menu/[id].
 * 2. Derive metadata dynamically from the dish record:
 *    - Name in title: "${dish.name} (${dish.price} ETB) | Addis Eats"
 *    - Description written for a person incorporating name, price in ETB, and summary
 *    - Canonical URL pointing strictly to /menu/${dish.id}
 *    - OpenGraph images targeting the dynamic /menu/${dish.id}/opengraph-image
 * 3. Verify the "Check yourself" requirement:
 *    "Do two different dish pages have two different descriptions?"
 */

export default function Exercise3_DynamicDishMetadata() {
  const [dishAId, setDishAId] = useState(1); // Doro Wat
  const [dishBId, setDishBId] = useState(2); // Shiro Mited
  const [activeTab, setActiveTab] = useState('comparator'); // 'comparator' | 'code' | 'group-chat-preview'

  const dishA = DISHES_DATA.find(d => d.id === Number(dishAId)) || DISHES_DATA[0];
  const dishB = DISHES_DATA.find(d => d.id === Number(dishBId)) || DISHES_DATA[1];

  const generateMockMetadata = (dish) => {
    const description = `Order freshly prepared ${dish.name} for ${dish.price} ETB at Addis Eats. ${dish.description} Served hot with fresh teff injera across Addis Ababa.`;
    return {
      title: `${dish.name} (${dish.price} ETB)`,
      fullTitle: `${dish.name} (${dish.price} ETB) | Addis Eats`,
      description,
      canonical: `https://addiseats.et/menu/${dish.id}`,
      ogImage: `https://addiseats.et/menu/${dish.id}/opengraph-image`,
      openGraph: {
        title: `${dish.name} - ${dish.price} ETB | Addis Eats`,
        description,
        url: `https://addiseats.et/menu/${dish.id}`,
        type: 'article',
        images: [{ url: `https://addiseats.et/menu/${dish.id}/opengraph-image`, width: 1200, height: 630 }],
      },
    };
  };

  const metaA = generateMockMetadata(dishA);
  const metaB = generateMockMetadata(dishB);

  const areDescriptionsDifferent = metaA.description !== metaB.description;

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ background: '#2563eb', color: '#fff', fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>EXERCISE 3</span>
          <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Reading Sheet Step 3</span>
        </div>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a', fontSize: '1.4rem' }}>
          Dynamic generateMetadata for Dish Detail Routes
        </h2>
        <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>
          Derive unique titles, human-readable descriptions, and OpenGraph tags from the underlying dish records.
        </p>
      </header>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('comparator')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'comparator' ? '#0f172a' : '#fff',
            color: activeTab === 'comparator' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Two-Dish Difference Comparator
        </button>
        <button
          onClick={() => setActiveTab('group-chat-preview')}
          style={{
            padding: '0.4rem 0.9rem',
            borderRadius: 6,
            border: '1px solid #cbd5e1',
            background: activeTab === 'group-chat-preview' ? '#0f172a' : '#fff',
            color: activeTab === 'group-chat-preview' ? '#fff' : '#334155',
            fontWeight: 600,
            fontSize: '0.8rem',
            cursor: 'pointer'
          }}
        >
          Group Chat Preview Test
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
          generateMetadata Code Implementation
        </button>
      </div>

      {activeTab === 'comparator' && (
        <div>
          {/* Check Yourself Verification Banner */}
          <div style={{
            background: areDescriptionsDifferent ? '#f0fdf4' : '#fef2f2',
            border: areDescriptionsDifferent ? '1px solid #86efac' : '1px solid #fecaca',
            padding: '0.75rem 1rem',
            borderRadius: 8,
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontWeight: 700, color: areDescriptionsDifferent ? '#166534' : '#991b1b', fontSize: '0.9rem' }}>
                Check Yourself: Do two different dish pages have two different descriptions?
              </span>
              <div style={{ fontSize: '0.8rem', color: areDescriptionsDifferent ? '#15803d' : '#b91c1c', marginTop: '0.2rem' }}>
                {areDescriptionsDifferent
                  ? '✓ VERIFIED: Dish A and Dish B generate completely distinct, non-duplicate human descriptions.'
                  : '✗ FAILED: Identical descriptions detected! Both dishes must differ.'}
              </div>
            </div>
            <span style={{
              background: areDescriptionsDifferent ? '#22c55e' : '#ef4444',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 20
            }}>
              {areDescriptionsDifferent ? 'PASS' : 'FAIL'}
            </span>
          </div>

          {/* Dish Comparators Side by Side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {/* Dish A Card */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.9rem' }}>Dish Route A:</span>
                <select
                  value={dishAId}
                  onChange={(e) => setDishAId(Number(e.target.value))}
                  style={{ padding: '0.35rem 0.6rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                >
                  {DISHES_DATA.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.price} ETB)</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Generated &lt;title&gt;:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{metaA.fullTitle}</div>
              </div>

              <div style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Generated &lt;meta description&gt;:</div>
                <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', lineHeight: 1.4 }}>
                  {metaA.description}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Canonical &amp; OG Image:</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#059669', marginTop: '0.2rem' }}>
                  Canonical: {metaA.canonical}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#059669', marginTop: '0.1rem' }}>
                  OG Image: {metaA.ogImage}
                </div>
              </div>
            </div>

            {/* Dish B Card */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: 8, background: '#fff', padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, color: '#2563eb', fontSize: '0.9rem' }}>Dish Route B:</span>
                <select
                  value={dishBId}
                  onChange={(e) => setDishBId(Number(e.target.value))}
                  style={{ padding: '0.35rem 0.6rem', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: '0.8rem' }}
                >
                  {DISHES_DATA.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.price} ETB)</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Generated &lt;title&gt;:</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{metaB.fullTitle}</div>
              </div>

              <div style={{ marginBottom: '0.6rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Generated &lt;meta description&gt;:</div>
                <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', lineHeight: 1.4 }}>
                  {metaB.description}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Canonical &amp; OG Image:</div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#059669', marginTop: '0.2rem' }}>
                  Canonical: {metaB.canonical}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#059669', marginTop: '0.1rem' }}>
                  OG Image: {metaB.ogImage}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'group-chat-preview' && (
        <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: 8, padding: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#0f172a' }}>
            Check Yourself: Would a link to a dish look worth opening if you saw it in a group chat?
          </h3>
          <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#475569' }}>
            Simulating WhatsApp / Telegram / iMessage rich link unfurling using dynamic dish metadata:
          </p>

          <div style={{ maxWidth: 420, margin: '0 auto', background: '#0b141a', padding: '1rem', borderRadius: 12, color: '#e9edef' }}>
            <div style={{ fontSize: '0.75rem', color: '#8696a0', marginBottom: '0.5rem' }}>Group Chat (Addis Foodies 🇪🇹)</div>
            
            {/* Chat Bubble with Rich Unfurl Card */}
            <div style={{ background: '#005c4b', borderRadius: 8, padding: '0.5rem', color: '#e9edef' }}>
              <div style={{ background: '#025142', borderRadius: 6, overflow: 'hidden', border: '1px solid #046b57' }}>
                {/* OG Image placeholder */}
                <div style={{ height: 180, background: 'linear-gradient(135deg, #1f2937, #111827)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>🇪🇹</span>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fbbf24' }}>{dishA.name}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399', marginTop: '0.2rem' }}>{dishA.price} ETB</div>
                </div>

                <div style={{ padding: '0.75rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.25rem' }}>
                    {metaA.openGraph.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8696a0', lineHeight: 1.35, marginBottom: '0.4rem' }}>
                    {metaA.description}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#38bdf8' }}>addiseats.et</div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: '#b9d4cf' }}>
                Hey everyone, let&apos;s order dinner from Addis Eats tonight! Check out this {dishA.name}!
              </div>
              <div style={{ fontSize: '0.65rem', textAlign: 'right', color: '#8696a0', marginTop: '0.2rem' }}>19:42 ✓✓</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div style={{ background: '#090d16', color: '#e2e8f0', borderRadius: 8, padding: '1rem', overflowX: 'auto', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5 }}>
          <div style={{ color: '#64748b', marginBottom: '0.5rem' }}>// app/menu/[id]/page.js - Next.js App Router Dynamic Metadata</div>
          <span style={{ color: '#f43f5e' }}>export async function</span> <span style={{ color: '#38bdf8' }}>generateMetadata</span>({'{ params }'}) {'{\n'}
          {'  '}<span style={{ color: '#94a3b8' }}>// 1. Fetch real dish record by dynamic param</span>{'\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>const</span> dish = <span style={{ color: '#f43f5e' }}>await</span> <span style={{ color: '#38bdf8' }}>getDishById</span>(params.id);{'\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>if</span> (!dish) <span style={{ color: '#f43f5e' }}>return</span> {'{ title: '}<span style={{ color: '#a7f3d0' }}>&quot;Dish Not Found&quot;</span>{' };\n\n'}
          {'  '}<span style={{ color: '#94a3b8' }}>// 2. Craft human-readable description with name, price in ETB, and summary</span>{'\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>const</span> description = <span style={{ color: '#a7f3d0' }}>`Order freshly prepared {'${dish.name}'} for {'${dish.price}'} ETB at Addis Eats. {'${dish.description}'} Served hot with fresh teff injera.`</span>;{'\n\n'}
          {'  '}<span style={{ color: '#f43f5e' }}>return</span> {'{\n'}
          {'    '}title: <span style={{ color: '#a7f3d0' }}>`{'${dish.name}'} ({'${dish.price}'} ETB)`</span>,{'\n'}
          {'    '}description,{'\n'}
          {'    '}alternates: {'{ canonical: '}<span style={{ color: '#a7f3d0' }}>`/menu/\${dish.id}`</span>{' },\n'}
          {'    '}openGraph: {'{\n'}
          {'      '}title: <span style={{ color: '#a7f3d0' }}>`{'${dish.name}'} - {'${dish.price}'} ETB | Addis Eats`</span>,{'\n'}
          {'      '}description,{'\n'}
          {'      '}url: <span style={{ color: '#a7f3d0' }}>`/menu/\${dish.id}`</span>,{'\n'}
          {'      '}type: <span style={{ color: '#a7f3d0' }}>&quot;article&quot;</span>,{'\n'}
          {'      '}images: [{'{ url: '}<span style={{ color: '#a7f3d0' }}>`/menu/\${dish.id}/opengraph-image`</span>{', width: 1200, height: 630 }'}],{'\n'}
          {'    '}{'},\n'}
          {'  };\n'}
          {'}'}
        </div>
      )}
    </div>
  );
}
