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
      data-cursor="pointer"
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
        width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-card)',
        border: '2px solid var(--border-thick)',
        color: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
        transition: 'all 0.15s var(--ease-out)',
        boxShadow: '2px 2px 0px var(--border-thick)',
        animation: 'fadeIn 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--accent)';
        e.currentTarget.style.color = 'var(--bg)';
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '3px 3px 0px var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.color = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--border-thick)';
        e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-thick)';
      }}
    >
      <Icon icon="mdi:chevron-up" width={22} height={22} />
    </button>
  );
}
