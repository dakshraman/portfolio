'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/data/portfolio';

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrollState, setScrollState] = useState('top');
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener('scroll', close, { once: true });
    return () => window.removeEventListener('scroll', close);
  }, [mobileOpen]);

  useEffect(() => {
    if (!menuRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setMenuHeight(entry.contentRect.height);
    });
    observer.observe(menuRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) setScrollState('top');
      else setScrollState('scrolled');

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? y / totalHeight : 0);

      const sections = navLinks
        .map((l) => l.href.replace('#', ''))
        .sort((a, b) => {
          const elA = document.getElementById(a);
          const elB = document.getElementById(b);
          if (!elA) return 1;
          if (!elB) return -1;
          return elA.offsetTop - elB.offsetTop;
        });
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

  const isScrolled = scrollState === 'scrolled';
  const collapsedHeight = isScrolled ? 46 : 54;
  const totalHeight = collapsedHeight + (mobileOpen ? menuHeight : 0);

  return (
    <div
      className="nav-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isScrolled ? '10px 16px' : '18px 24px',
        transition: 'padding 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
        pointerEvents: 'none',
      }}
    >
      <nav
        ref={navRef}
        className="nav-pill"
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: mobileOpen
            ? 'min(380px, 92vw)'
            : isScrolled
              ? 'min(680px, 92vw)'
              : 'min(1100px, 96vw)',
          borderRadius: mobileOpen ? '24px' : '9999px',
          background: isScrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter: 'var(--glass-blur-heavy) saturate(1.8)',
          WebkitBackdropFilter: 'var(--glass-blur-heavy) saturate(1.8)',
          border: '1px solid',
          borderColor: isScrolled
            ? 'var(--glass-border-hover)'
            : 'var(--glass-border)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            : '0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
          transition: 'border-radius 0.6s cubic-bezier(0.32, 0.72, 0, 1), max-width 0.6s cubic-bezier(0.32, 0.72, 0, 1), background 0.6s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.6s cubic-bezier(0.32, 0.72, 0, 1), box-shadow 0.6s cubic-bezier(0.32, 0.72, 0, 1), height 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
          height: `${totalHeight}px`,
          position: 'relative',
          pointerEvents: 'auto',
          overflow: 'hidden',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: 'inherit',
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(254, 127, 45, 0.03) 0%, transparent 50%)'
              : 'none',
            pointerEvents: 'none',
          }}
        />

        {/* Header row: logo + hamburger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: `${collapsedHeight}px`,
            padding: isScrolled ? '0 14px' : '0 22px',
            position: 'relative',
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: isScrolled ? '0.8rem' : '0.9rem',
              fontWeight: 700,
              color: 'var(--fg)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              flexShrink: 0,
              textTransform: 'uppercase',
            }}
          >
            {isScrolled ? (
              <>
                {siteConfig.name.split(' ')[0][0]}
                <span style={{ color: 'var(--accent)' }}>.</span>
              </>
            ) : (
              <>
                {siteConfig.name.split(' ')[0]}
                <span style={{ color: 'var(--accent)' }}>.</span>
                <span style={{ color: 'var(--fg-dim)', fontWeight: 500 }}>{siteConfig.name.split(' ')[1]}</span>
              </>
            )}
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: isScrolled ? '4px' : '8px' }}>
            {/* Desktop links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isScrolled ? '2px' : '6px',
                transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isScrolled ? '0.6rem' : '0.68rem',
                    color: activeSection === link.href.replace('#', '')
                      ? 'var(--accent)'
                      : 'var(--fg-muted)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                    padding: isScrolled ? '4px 8px' : '6px 12px',
                    borderRadius: '9999px',
                    background: activeSection === link.href.replace('#', '')
                      ? 'rgba(254, 127, 45, 0.1)'
                      : 'transparent',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    display: 'none',
                  }}
                  className="nav-desktop-link"
                  onMouseEnter={(e) => {
                    if (activeSection !== link.href.replace('#', '')) {
                      e.currentTarget.style.color = 'var(--fg)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== link.href.replace('#', '')) {
                      e.currentTarget.style.color = 'var(--fg-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Hamburger — morphing icon */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '9999px',
                width: isScrolled ? '30px' : '34px',
                height: isScrolled ? '30px' : '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--fg)',
                transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                padding: 0,
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                flexShrink: 0,
              }}
            >
              <svg
                width={isScrolled ? '14' : '16'}
                height={isScrolled ? '14' : '16'}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                {/* Animated hamburger lines with individual transforms */}
                <line
                  x1="2" y1="4" x2="14" y2="4"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                    transformOrigin: 'center',
                    transform: mobileOpen
                      ? 'translateY(4px) rotate(45deg)'
                      : 'translateY(0) rotate(0deg)',
                  }}
                />
                <line
                  x1="2" y1="8" x2="14" y2="8"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                    transformOrigin: 'center',
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? 'scaleX(0)' : 'scaleX(1)',
                  }}
                />
                <line
                  x1="2" y1="12" x2="14" y2="12"
                  style={{
                    transition: 'all 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
                    transformOrigin: 'center',
                    transform: mobileOpen
                      ? 'translateY(-4px) rotate(-45deg)'
                      : 'translateY(0) rotate(0deg)',
                  }}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            left: '12px',
            right: '12px',
            height: '2px',
            borderRadius: '1px',
            background: 'var(--glass-border)',
            overflow: 'hidden',
            opacity: isScrolled ? 0.6 : 1,
            transition: 'opacity 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
            zIndex: 1,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, rgba(254, 127, 45, 0.6), rgba(254, 127, 45, 0.2))',
              boxShadow: '0 0 6px rgba(254, 127, 45, 0.2)',
              transition: 'width 0.15s linear',
              borderRadius: '1px',
            }}
          />
        </div>

        {/* Mobile menu — fluid expansion inside the pill */}
        <div
          ref={menuRef}
          className="nav-mobile-menu"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            overflow: 'hidden',
            padding: mobileOpen ? '4px 8px 8px' : '0 8px',
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? 'auto' : 'none',
            transition: 'opacity 0.5s cubic-bezier(0.32, 0.72, 0, 1), padding 0.6s cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              onClick={() => setMobileOpen(false)}
              className="nav-mobile-link"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                color: activeSection === link.href.replace('#', '')
                  ? 'var(--accent)'
                  : 'var(--fg-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '12px 16px',
                borderRadius: '14px',
                background: activeSection === link.href.replace('#', '')
                  ? 'rgba(254, 127, 45, 0.08)'
                  : 'transparent',
                fontWeight: 600,
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
                transitionProperty: 'opacity, transform, background, color',
                transitionDuration: mobileOpen ? '0.5s' : '0.3s',
                transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
                transitionDelay: mobileOpen ? `${0.06 + i * 0.04}s` : '0s',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={isHome ? '#contact' : '/#contact'}
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-link"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              color: 'var(--bg)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '12px 16px',
              borderRadius: '14px',
              background: 'var(--accent)',
              fontWeight: 700,
              textAlign: 'center',
              marginTop: '4px',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
              transition: 'all 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
              transitionDelay: mobileOpen ? `${0.06 + navLinks.length * 0.04}s` : '0s',
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-link { display: inline-block !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
