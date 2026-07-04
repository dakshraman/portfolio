'use client';

import { useState, useEffect } from 'react';
import { navLinks, siteConfig } from '@/data/portfolio';

export default function Navigation() {
  const [scrollState, setScrollState] = useState('top');
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setScrollState('top');
      else if (y < 400) setScrollState('compact');
      else setScrollState('scrolled');

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? y / totalHeight : 0);

      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isCompact = scrollState !== 'top';
  const isScrolled = scrollState === 'scrolled';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: isCompact ? '10px 16px' : '16px 24px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: isCompact ? '720px' : '100%',
          height: isCompact ? '48px' : '56px',
          padding: isCompact ? '0 20px' : '0 24px',
          borderRadius: 'var(--radius-full)',
          background: isScrolled
            ? 'rgba(15, 23, 42, 0.85)'
            : 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(24px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
          border: '1px solid rgba(51, 65, 85, 0.4)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.03)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Scroll progress bar inside the pill */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '8px',
            right: '8px',
            height: '2px',
            borderRadius: '1px',
            background: 'rgba(51, 65, 85, 0.3)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(to right, var(--accent), rgba(34, 197, 94, 0.4))',
              boxShadow: '0 0 8px var(--accent-glow)',
              transition: 'width 0.15s linear',
              borderRadius: '1px',
            }}
          />
        </div>

        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: isCompact ? '0.85rem' : '0.9rem',
            fontWeight: 600,
            color: 'var(--fg)',
            textDecoration: 'none',
            letterSpacing: '-0.01em',
            transition: 'all 0.4s ease',
            flexShrink: 0,
          }}
        >
          {isCompact ? (
            <>
              {siteConfig.name.split(' ')[0][0]}
              <span style={{ color: 'var(--accent)' }}>.</span>
            </>
          ) : (
            <>
              {siteConfig.name.split(' ')[0]}
              <span style={{ color: 'var(--accent)', textShadow: '0 0 16px var(--accent-glow-strong)' }}>.</span>
            </>
          )}
        </a>

        {/* Nav links - visible in both states, smaller when compact */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isCompact ? '16px' : '24px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: isCompact ? '0.65rem' : '0.75rem',
                color: activeSection === link.href.replace('#', '')
                  ? 'var(--accent)'
                  : 'var(--fg-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                transition: 'color 0.3s ease',
                position: 'relative',
                padding: '4px 0',
              }}
            >
              {link.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'var(--accent)',
                  transform: activeSection === link.href.replace('#', '') ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: activeSection === link.href.replace('#', '') ? '0 0 8px var(--accent-glow)' : 'none',
                }}
              />
            </a>
          ))}
        </div>

        {/* Contact CTA */}
        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: isCompact ? 'var(--accent)' : 'var(--bg)',
            background: isCompact ? 'transparent' : 'var(--accent)',
            border: isCompact ? '1px solid var(--accent)' : 'none',
            borderRadius: 'var(--radius-full)',
            padding: isCompact ? '4px 12px' : '8px 18px',
            textDecoration: 'none',
            transition: 'all 0.4s ease',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {isCompact ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="12" height="10" rx="1.5" />
              <path d="M2 5l6 4 6-4" />
            </svg>
          ) : 'Contact'}
        </a>
      </nav>
    </div>
  );
}
