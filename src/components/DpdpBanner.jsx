'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function DpdpBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if user hasn't consented yet
    const hasConsented = localStorage.getItem('dpdp-consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('dpdp-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="glass-strong"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        zIndex: 9999,
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--color-border)',
        animation: 'slideUp 0.5s var(--ease-spring) forwards'
      }}
      role="dialog"
      aria-labelledby="dpdp-banner-title"
      aria-describedby="dpdp-banner-desc"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: '1 1 300px' }}>
        <ShieldCheck size={24} className="text-accent" aria-hidden="true" style={{ marginTop: '4px', flexShrink: 0 }} />
        <div>
          <h3 id="dpdp-banner-title" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Privacy & Data Consent</h3>
          <p id="dpdp-banner-desc" className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
            In compliance with the Digital Personal Data Protection Act (2026), this website uses cookies to measure performance and improve your experience. We do not sell your personal data. Read our <a href="#" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => setIsVisible(false)}
          className="btn-pill-outline"
          aria-label="Decline cookies"
        >
          Decline
        </button>
        <button 
          onClick={handleAccept}
          className="btn-pill-solid"
          aria-label="Accept cookies"
        >
          Accept
        </button>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
