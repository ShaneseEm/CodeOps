import React, { useState } from 'react';
import Exercise1_LighthouseBaseline from './Exercise1_LighthouseBaseline';
import Exercise2_NextImageConversion from './Exercise2_NextImageConversion';
import Exercise3_PriorityAboveFold from './Exercise3_PriorityAboveFold';
import Exercise4_NextFontSelfHosted from './Exercise4_NextFontSelfHosted';
import Exercise5_LazyThirdPartyScripts from './Exercise5_LazyThirdPartyScripts';
import Exercise6_EnvSecuritySetup from './Exercise6_EnvSecuritySetup';
import Exercise7_LighthouseComparison from './Exercise7_LighthouseComparison';

export default function ExerciseRunner() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: 'Ex 1: Baseline Audit' },
    { id: 2, label: 'Ex 2: next/image' },
    { id: 3, label: 'Ex 3: Hero Priority' },
    { id: 4, label: 'Ex 4: next/font' },
    { id: 5, label: 'Ex 5: next/script' },
    { id: 6, label: 'Ex 6: .env Security' },
    { id: 7, label: 'Ex 7: Final Lighthouse' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', background: '#ffffff', borderRadius: 12, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <header style={{ background: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
            Prog M3-SQ10 S26 · Day 18 Exercises
          </div>
          <h1 style={{ margin: '0.25rem 0 0.5rem', fontSize: '1.5rem', fontWeight: 800 }}>
            Making Addis Eats Fast: Performance Engineering Suite
          </h1>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>
            Comprehensive solutions for Core Web Vitals, Image/Font/Script optimizations, and .env security hardening.
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
                fontSize: '0.85rem',
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
          {activeTab === 1 && <Exercise1_LighthouseBaseline />}
          {activeTab === 2 && <Exercise2_NextImageConversion />}
          {activeTab === 3 && <Exercise3_PriorityAboveFold />}
          {activeTab === 4 && <Exercise4_NextFontSelfHosted />}
          {activeTab === 5 && <Exercise5_LazyThirdPartyScripts />}
          {activeTab === 6 && <Exercise6_EnvSecuritySetup />}
          {activeTab === 7 && <Exercise7_LighthouseComparison />}
        </main>
      </div>
    </div>
  );
}
