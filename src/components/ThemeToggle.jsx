'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDark(false);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      data-cursor="pointer"
      style={{
        position: 'fixed', bottom: '24px', right: '76px', zIndex: 999,
        width: '44px', height: '44px', borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-card)',
        border: '2px solid var(--border-thick)',
        color: 'var(--fg-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none',
        transition: 'all 0.15s var(--ease-out)',
        boxShadow: '2px 2px 0px var(--border-thick)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.boxShadow = '3px 3px 0px var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'var(--fg-muted)';
        e.currentTarget.style.borderColor = 'var(--border-thick)';
        e.currentTarget.style.boxShadow = '2px 2px 0px var(--border-thick)';
      }}
    >
      <Icon icon={dark ? 'mdi:weather-sunny' : 'mdi:weather-night'} width={20} height={20} />
    </button>
  );
}
