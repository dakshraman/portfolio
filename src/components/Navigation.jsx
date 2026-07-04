'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/data/portfolio';

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrollState, setScrollState] = useState('top');
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', checkMobile);
    };
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
        padding: isCompact ? '10px 16px' : '20px 24px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: isCompact ? '720px' : '1300px',
          height: isCompact ? '48px' : '56px',
          padding: isCompact ? '0 20px' : '0 24px',
          borderRadius: 'var(--radius-full)',
          background: isScrolled
            ? 'var(--nav-bg-scrolled)'
            : 'var(--nav-bg)',
          backdropFilter: 'blur(32px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
          border: '2px solid rgba(237, 237, 239, 0.1)',
          boxShadow: isScrolled
            ? '4px 4px 0px rgba(237, 237, 239, 0.06)'
            : '0 4px 16px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
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
              background: 'linear-gradient(to right, var(--accent), var(--accent-glow))',
              boxShadow: '0 0 8px var(--accent-glow)',
              transition: 'width 0.15s linear',
              borderRadius: '1px',
            }}
          />
        </div>

        <a
          href="/"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isCompact ? '0.85rem' : '0.95rem',
            fontWeight: 700,
            color: 'var(--fg)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'all 0.4s ease',
            flexShrink: 0,
            textTransform: 'uppercase',
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
              <span style={{ color: 'var(--fg-dim)', fontWeight: 500 }}>{siteConfig.name.split(' ')[1]}</span>
            </>
          )}
        </a>

        <div
          style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: isCompact ? '16px' : '24px',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: isCompact ? '0.65rem' : '0.7rem',
                color: activeSection === link.href.replace('#', '')
                  ? 'var(--accent)'
                  : 'var(--fg-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color 0.3s ease',
                position: 'relative',
                padding: '4px 0',
                fontWeight: 600,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={isHome ? '#contact' : '/#contact'}
          className="btn-ghost"
          style={{
            fontSize: '0.65rem',
            padding: isCompact ? '6px 14px' : '8px 18px',
            boxShadow: isCompact ? '2px 2px 0px var(--fg)' : '3px 3px 0px var(--fg)',
            border: '2px solid var(--fg)',
            borderRadius: 'var(--radius-full)',
            background: isCompact ? 'transparent' : 'var(--accent)',
            color: isCompact ? 'var(--fg)' : 'var(--bg)',
            borderColor: isCompact ? 'var(--fg)' : 'var(--accent)',
            boxShadow: isCompact ? '2px 2px 0px var(--fg)' : 'none',
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
