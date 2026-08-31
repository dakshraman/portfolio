'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
     
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
        width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        color: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
        transition: 'all 0.15s var(--ease-out)',
        boxShadow: 'var(--glass-shadow)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        animation: 'fadeIn 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.color = 'var(--bg)';
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(254, 127, 45, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--glass-bg)';
        e.currentTarget.style.color = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--glass-border)';
        e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
      }}
    >
      <Icon icon="mdi:chevron-up" width={22} height={22} />
    </button>
  );
}
