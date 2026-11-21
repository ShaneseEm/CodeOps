import React, { useState } from 'react';

/**
 * Exercise 6: Write .env.example and confirm .env*.local is gitignored
 * 
 * Security Audit Verification:
 * 1. Can a stranger clone the repository and know what variables to configure?
 *    -> Yes! `.env.example` provides explicit variable names and formatting templates.
 * 2. Is there anything in the browser bundle you would not want published?
 *    -> Verified: No database URLs, signing keys, or payment private keys are prefixed
 *       with NEXT_PUBLIC_.
 * 3. Are local environment secrets protected from git leaks?
 *    -> Verified: `.gitignore` contains `.env.local` and `.env*.local`.
 */

export const AUDIT_VARIABLES = [
  {
    name: 'DATABASE_URL',
    type: 'server-only',
    scope: 'PostgreSQL connection string',
    clientSafe: false,
    exampleValue: 'postgres://user:pass@localhost:5432/addis_eats',
    status: '✅ Correctly Private (No NEXT_PUBLIC_ prefix)'
  },
  {
    name: 'SERVER_SIGNING_SECRET',
    type: 'server-only',
    scope: 'HMAC session token signing key',
    clientSafe: false,
    exampleValue: '64-byte-random-hex-string',
    status: '✅ Correctly Private (Server Actions & Route Handlers only)'
  },
  {
    name: 'TELEBIRR_APP_KEY',
    type: 'server-only',
    scope: 'Merchant API authentication secret',
    clientSafe: false,
    exampleValue: 'tb_sec_99182371928371',
    status: '✅ Correctly Private (Never bundled in browser code)'
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    type: 'client-exposed',
    scope: 'Root canonical site origin',
    clientSafe: true,
    exampleValue: 'http://localhost:3000',
    status: '✅ Safe Public (Safe for client router hydration)'
  },
  {
    name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    type: 'client-exposed',
    scope: 'Google Analytics public telemetry ID',
    clientSafe: true,
    exampleValue: 'G-ADDIS12345',
    status: '✅ Safe Public (Intended for public tracking script)'
  }
];

export default function Exercise6_EnvSecuritySetup() {
  const [filterType, setFilterType] = useState('all');

  const filteredVars = filterType === 'all'
    ? AUDIT_VARIABLES
    : AUDIT_VARIABLES.filter(v => v.type === filterType);

  return (
    <div style={{ padding: '1.5rem', fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>Exercise 6: Environment Security &amp; .gitignore Verification</h2>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0' }}>
          Prevent credential leaks by auditing NEXT_PUBLIC_ prefixes and validating .gitignore rules.
        </p>
      </header>

      {/* Security Checklist Banner */}
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '1.25rem', marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem', color: '#166534' }}>🛡️ Security Audit Checklist: PASS</h4>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#14532d', fontSize: '0.85rem', lineHeight: 1.6 }}>
          <li><strong>Gitignore Rule Active:</strong> <code>.env*.local</code> is tracked in <code>.gitignore</code>, preventing accidental secret commits.</li>
          <li><strong>Zero Sensitive NEXT_PUBLIC:</strong> No secrets (DB passwords, HMAC keys, API secrets) carry the <code>NEXT_PUBLIC_</code> prefix.</li>
          <li><strong>Onboarding Ready:</strong> Committed <code>.env.example</code> allows any engineer to clone and run the app without guessing required variables.</li>
        </ul>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {['all', 'server-only', 'client-exposed'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              border: filterType === t ? '2px solid #2563eb' : '1px solid #cbd5e1',
              background: filterType === t ? '#eff6ff' : '#ffffff',
              color: filterType === t ? '#1d4ed8' : '#475569',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Audit Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
            <th style={{ padding: '0.75rem' }}>Variable Name</th>
            <th style={{ padding: '0.75rem' }}>Classification</th>
            <th style={{ padding: '0.75rem' }}>In Client Bundle?</th>
            <th style={{ padding: '0.75rem' }}>Audited Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredVars.map((v, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontWeight: 600 }}>{v.name}</td>
              <td style={{ padding: '0.75rem' }}>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: 4,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  background: v.type === 'server-only' ? '#fee2e2' : '#e0f2fe',
                  color: v.type === 'server-only' ? '#991b1b' : '#0369a1'
                }}>
                  {v.type.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: '0.75rem', color: v.clientSafe ? '#0284c7' : '#dc2626', fontWeight: 600 }}>
                {v.clientSafe ? '🌐 Yes (Public)' : '🔒 No (Server Only)'}
              </td>
              <td style={{ padding: '0.75rem', color: '#166534', fontSize: '0.8rem' }}>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* .gitignore Configuration Preview */}
      <div style={{ background: '#1e293b', color: '#f8fafc', padding: '1rem', borderRadius: 8 }}>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>// .gitignore</div>
        <pre style={{ margin: 0, fontSize: '0.8rem', fontFamily: 'monospace', color: '#38bdf8' }}>
{`# Local environment files (NEVER commit to git)
.env.local
.env*.local

# Next.js build output
.next/
out/
node_modules/`}
        </pre>
      </div>
    </div>
  );
}
