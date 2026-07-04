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

  useEffect(() => {
    if (!mobileOpen) return;
    const close = () => setMobileOpen(false);
    window.addEventListener('scroll', close, { once: true });
    return () => window.removeEventListener('scroll', close);
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 60) setScrollState('top');
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

  const isScrolled = scrollState === 'scrolled';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: isScrolled ? '10px 16px' : '18px 24px',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <nav
          ref={navRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: isScrolled ? '680px' : '1100px',
            height: mobileOpen ? 'auto' : isScrolled ? '46px' : '54px',
            minHeight: isScrolled ? '46px' : '54px',
            padding: mobileOpen ? '18px 20px' : isScrolled ? '0 14px' : '0 22px',
            borderRadius: mobileOpen ? '28px' : '9999px',
            background: isScrolled
              ? 'rgba(10, 10, 11, 0.82)'
              : 'rgba(10, 10, 11, 0.55)',
            backdropFilter: 'blur(40px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
            border: '1px solid',
            borderColor: isScrolled
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(255, 255, 255, 0.06)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
              : '0 4px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
            position: 'relative',
            pointerEvents: 'auto',
            flexDirection: mobileOpen ? 'column' : 'row',
            gap: mobileOpen ? '16px' : '0',
          }}
        >
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

          <div
            style={{
              position: 'absolute',
              bottom: '4px',
              left: '12px',
              right: '12px',
              height: '2px',
              borderRadius: '1px',
              background: 'rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
              opacity: isScrolled ? 0.6 : 1,
              transition: 'opacity 0.4s ease',
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

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
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
                transition: 'all 0.4s ease',
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

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isScrolled ? '4px' : '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isScrolled ? '2px' : '6px',
                  transition: 'all 0.4s ease',
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
                      transition: 'all 0.3s ease',
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

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '9999px',
                  width: isScrolled ? '30px' : '34px',
                  height: isScrolled ? '30px' : '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--fg)',
                  transition: 'all 0.3s ease',
                  padding: 0,
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
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
                  style={{ transition: 'transform 0.3s ease', transform: mobileOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                  {mobileOpen ? (
                    <>
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </>
                  ) : (
                    <>
                      <path d="M2 4h12M2 8h12M2 12h12" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div
            style={{
              display: mobileOpen ? 'flex' : 'none',
              flexDirection: 'column',
              gap: '4px',
              width: '100%',
              paddingTop: '12px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              animation: mobileOpen ? 'navFadeIn 0.3s ease' : 'none',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.8rem',
                  color: activeSection === link.href.replace('#', '')
                    ? 'var(--accent)'
                    : 'var(--fg-muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  background: activeSection === link.href.replace('#', '')
                    ? 'rgba(254, 127, 45, 0.08)'
                    : 'transparent',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={isHome ? '#contact' : '/#contact'}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.8rem',
                color: 'var(--bg)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '10px 14px',
                borderRadius: '14px',
                background: 'var(--accent)',
                fontWeight: 700,
                marginTop: '4px',
                textAlign: 'center',
                transition: 'all 0.2s ease',
              }}
            >
              Contact
            </a>
          </div>

          <style>{`
            @media (min-width: 768px) {
              .nav-desktop-link { display: inline-block !important; }
              nav button { display: none !important; }
            }
            @keyframes navFadeIn {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </nav>
      </div>
    </>
  );
}
