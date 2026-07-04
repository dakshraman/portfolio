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
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(24px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
        border: '1px solid rgba(51, 65, 85, 0.4)',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
        opacity: isAnimating ? 0 : 1,
        transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: '1 1 280px' }}>
        <ShieldCheck size={18} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
        <div>
          <h3 id="dpdp-title" style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '3px' }}>Privacy & Data Consent</h3>
          <p id="dpdp-desc" style={{ fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--fg-muted)' }}>
            This website uses cookies to measure performance. We do not sell your data.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        <button onClick={handleDecline} aria-label="Decline cookies"
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, padding: '6px 14px',
            borderRadius: 'var(--radius-full)', border: '1px solid rgba(51, 65, 85, 0.4)', background: 'transparent',
            color: 'var(--fg-muted)', cursor: 'pointer', transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--fg-dim)'; e.currentTarget.style.color = 'var(--fg)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(51, 65, 85, 0.4)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}
        >Decline</button>
        <button onClick={handleAccept} aria-label="Accept cookies"
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 500, padding: '6px 14px',
            borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--accent)', color: 'var(--bg)',
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#16A34A'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--accent)'; }}
        >Accept</button>
      </div>
    </div>
  );
}
