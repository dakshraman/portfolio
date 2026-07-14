'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DpdpBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('dpdp-consent');
    if (!hasConsented) setTimeout(() => setIsVisible(true), 1500);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dpdp-consent', 'true');
    setIsAnimating(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('dpdp-consent', 'false');
    setIsAnimating(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="dpdp-title"
      aria-describedby="dpdp-desc"
      style={{
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        right: '16px',
        maxWidth: '680px',
        margin: '0 auto',
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 9999,
        background: 'var(--bg-card)',
        border: '2px solid var(--border-thick)',
        boxShadow: '4px 4px 0px rgba(237, 237, 239, 0.08)',
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: '1 1 280px' }}>
        <ShieldCheck size={18} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <h3 id="dpdp-title" style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px', fontFamily: 'var(--font-heading)' }}>Privacy & Data Consent</h3>
          <p id="dpdp-desc" style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--fg-muted)' }}>
            This website uses cookies to measure performance. We do not sell your data.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button onClick={handleDecline} aria-label="Decline cookies"
          style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, padding: '6px 14px',
            borderRadius: 'var(--radius-sm)', border: '2px solid var(--border-thick)', background: 'transparent',
            color: 'var(--fg-muted)', cursor: 'pointer', transition: 'all 0.15s var(--ease-out)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-dim)'; e.currentTarget.style.color = 'var(--fg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-thick)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
        >Decline</button>
        <button onClick={handleAccept} aria-label="Accept cookies"
          style={{
            fontFamily: 'var(--font-heading)', fontSize: '0.7rem', fontWeight: 700, padding: '6px 14px',
            borderRadius: 'var(--radius-sm)', border: '2px solid var(--accent)', background: 'var(--accent)',
            color: '#fff', cursor: 'pointer', transition: 'all 0.15s var(--ease-out)',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            boxShadow: '2px 2px 0px var(--border-thick)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#16A34A';
            e.currentTarget.style.borderColor = '#16A34A';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent)';
            e.currentTarget.style.borderColor = 'var(--accent)';
          }}
        >Accept</button>
      </div>
    </div>
  );
}
