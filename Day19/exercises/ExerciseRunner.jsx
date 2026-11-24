import React, { useState } from 'react';
import Exercise1_MetadataBaseTitleTemplate from './Exercise1_MetadataBaseTitleTemplate';
import Exercise2_StaticRoutesMetadata from './Exercise2_StaticRoutesMetadata';
import Exercise3_DynamicDishMetadata from './Exercise3_DynamicDishMetadata';
import Exercise4_OpenGraphImageGeneration from './Exercise4_OpenGraphImageGeneration';
import Exercise5_MenuItemJsonLd from './Exercise5_MenuItemJsonLd';
import Exercise6_AppSitemapGeneration from './Exercise6_AppSitemapGeneration';
import Exercise7_RobotsTxtRule from './Exercise7_RobotsTxtRule';

export default function ExerciseRunner() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Ex 1: metadataBase & Title' },
    { id: 2, label: 'Ex 2: Static Routes & Canonical' },
    { id: 3, label: 'Ex 3: Dish generateMetadata' },
    { id: 4, label: 'Ex 4: OpenGraph Image 1200x630' },
    { id: 5, label: 'Ex 5: MenuItem JSON-LD' },
    { id: 6, label: 'Ex 6: app/sitemap.js' },
    { id: 7, label: 'Ex 7: robots.js Crawler Policy' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', background: '#ffffff', borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <header style={{ background: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Prog M3-SQ10 S26 · Day 19 Exercises
          </div>
          <h1 style={{ margin: '0.25rem 0 0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>
            Making Addis Eats Findable: SEO &amp; Metadata Engineering Suite
          </h1>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
            Comprehensive verification of metadataBase, dynamic OpenGraph 1200&times;630 generation, Schema.org MenuItem JSON-LD, sitemap, and robots.txt.
          </p>
        </header>

        {/* Tab Navigation */}
        <nav style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f1f5f9', overflowX: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.85rem 1.1rem',
                border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                background: activeTab === tab.id ? '#ffffff' : 'transparent',
                color: activeTab === tab.id ? '#1d4ed8' : '#475569',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.82rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content Display */}
        <main style={{ padding: '1.5rem' }}>
          {activeTab === 1 && <Exercise1_MetadataBaseTitleTemplate />}
          {activeTab === 2 && <Exercise2_StaticRoutesMetadata />}
          {activeTab === 3 && <Exercise3_DynamicDishMetadata />}
          {activeTab === 4 && <Exercise4_OpenGraphImageGeneration />}
          {activeTab === 5 && <Exercise5_MenuItemJsonLd />}
          {activeTab === 6 && <Exercise6_AppSitemapGeneration />}
          {activeTab === 7 && <Exercise7_RobotsTxtRule />}
        </main>
      </div>
    </div>
  );
}
