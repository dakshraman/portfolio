'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks, siteConfig } from '@/data/portfolio';

// Section icons for the Dynamic Island
const ICONS = {
  highlights: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  projects: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  services: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  experience: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  about: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  blog: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  github: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  ),
  contact: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
};

const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1
};

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('highlights');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hubOpen, setHubOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isIslandHovered, setIsIslandHovered] = useState(false);

  // Close hub on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setHubOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Close hub on scroll change
  useEffect(() => {
    if (!hubOpen) return;
    const close = () => setHubOpen(false);
    window.addEventListener('scroll', close, { once: true, passive: true });
    return () => window.removeEventListener('scroll', close);
  }, [hubOpen]);

  // Scroll tracking and active section
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(Math.max(y / docHeight, 0), 1) : 0);

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
        if (el && el.getBoundingClientRect().top <= 260) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('highlights');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isScrolled = scrollY > 60;
  // Compact mode is active when scrolled down and user is not hovering over the island and hub is closed
  const isCompact = isScrolled && !isIslandHovered && !hubOpen;

  // Active section formatted label
  const activeLabel = navLinks.find((l) => l.href.replace('#', '') === activeSection)?.label || 'Featured';

  return (
    <header
      className="dynamic-island-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: isScrolled ? '12px 16px' : '18px 24px',
        transition: 'padding 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        pointerEvents: 'none',
      }}
    >
      {/* Floating Dynamic Island Capsule */}
      <motion.div
        layout
        animate={{
          borderRadius: hubOpen ? 28 : 9999,
        }}
        transition={springTransition}
        className={`island-capsule ${hubOpen ? 'is-hub-open' : ''} ${isCompact ? 'is-compact' : 'is-expanded'}`}
        onMouseEnter={() => setIsIslandHovered(true)}
        onMouseLeave={() => {
          setIsIslandHovered(false);
          setHoveredLink(null);
        }}
        style={{
          position: 'relative',
          pointerEvents: 'auto',
          background: 'rgba(9, 9, 13, 0.92)',
          backdropFilter: 'blur(40px) saturate(200%)',
          WebkitBackdropFilter: 'blur(40px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: hubOpen
            ? '0 28px 64px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 10px 30px rgba(254, 127, 45, 0.15)'
            : isScrolled
              ? '0 18px 44px -10px rgba(0, 0, 0, 0.82), 0 0 0 1px rgba(255, 255, 255, 0.07), 0 4px 16px rgba(0, 0, 0, 0.5)'
              : '0 14px 36px -8px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06)',
          width: 'fit-content',
          maxWidth: '96vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
        }}
      >
        {/* Specular Rim Light */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '12%',
            right: '12%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        <AnimatePresence mode="wait">
          {hubOpen ? (
            /* ------------------------------------------------------------- */
            /* HUB HEADER ROW (WHEN HUB IS OPEN)                             */
            /* ------------------------------------------------------------- */
            <motion.div
              layout="position"
              key="hub-header"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '48px',
                padding: '0 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                zIndex: 4,
                width: 'min(480px, 94vw)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(254, 127, 45, 0.3) 0%, rgba(35, 61, 77, 0.5) 100%)',
                    border: '1px solid rgba(254, 127, 45, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    color: '#fff',
                  }}
                >
                  RD
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    Dynamic Island Hub
                  </span>
                  <span style={{ fontSize: '0.58rem', color: 'var(--fg-dim)' }}>
                    Raman Daksh Portfolio
                  </span>
                </div>
              </div>

              <button
                onClick={() => setHubOpen(false)}
                aria-label="Close Dynamic Island Hub"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'var(--fg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.color = 'var(--fg)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </motion.div>
          ) : (
            /* ------------------------------------------------------------- */
            /* REGULAR BAR (COMPACT & EXPANDED)                              */
            /* ------------------------------------------------------------- */
            <motion.div
              layout="position"
              key="regular-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: isCompact ? '12px' : '24px',
                minHeight: isCompact ? '44px' : '48px',
                padding: isCompact ? '0 12px 0 14px' : '0 14px 0 16px',
                zIndex: 2,
              }}
            >
              {/* Left Monogram / Brand */}
              <motion.a
                layout="position"
                href="/"
                aria-label="Raman Daksh Home"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: isCompact ? '26px' : '28px',
                    height: isCompact ? '26px' : '28px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(254, 127, 45, 0.25) 0%, rgba(35, 61, 77, 0.4) 100%)',
                    border: '1px solid rgba(254, 127, 45, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-heading)',
                    fontSize: isCompact ? '0.7rem' : '0.74rem',
                    fontWeight: 800,
                    color: '#fff',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                    transition: 'all 0.3s ease',
                  }}
                >
                  RD
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: isCompact ? '0.76rem' : '0.82rem',
                    fontWeight: 700,
                    color: 'var(--fg)',
                    letterSpacing: '0.02em',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s ease',
                  }}
                >
                  RAMAN<span style={{ color: 'var(--accent)' }}>.</span>
                  {!isCompact && (
                    <span
                      className="island-desktop-only"
                      style={{
                        color: 'var(--fg-dim)',
                        fontWeight: 500,
                        marginLeft: '4px',
                      }}
                    >
                      DAKSH
                    </span>
                  )}
                </span>
              </motion.a>

              {/* Center: Dynamic Switcher between Compact Tracker & Expanded Nav Links */}
              <motion.div
                layout="position"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '34px',
                }}
              >
                <AnimatePresence mode="wait">
                  {isCompact ? (
                    /* Compact Tracker Pill */
                    <motion.div
                      key="compact-pill"
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ duration: 0.15 }}
                      onClick={() => setHubOpen(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        userSelect: 'none',
                        transition: 'background 0.2s ease',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center' }}>
                        {ICONS[activeSection] || ICONS.highlights}
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.66rem',
                          fontWeight: 600,
                          color: 'var(--fg)',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {activeLabel}
                      </span>
                    </motion.div>
                  ) : (
                    /* Expanded Segmented Navigation Links */
                    <motion.nav
                      key="expanded-links"
                      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                      transition={{ duration: 0.15 }}
                      className="island-desktop-nav"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        padding: '2px 4px',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {navLinks.map((link) => {
                        const sectionKey = link.href.replace('#', '');
                        const isActive = activeSection === sectionKey;
                        const isHovered = hoveredLink === link.href;
    
                        return (
                          <a
                            key={link.href}
                            href={isHome ? link.href : `/${link.href}`}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                            style={{
                              fontFamily: 'var(--font-heading)',
                              fontSize: '0.64rem',
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? '#ffffff' : isHovered ? 'var(--fg)' : 'var(--fg-muted)',
                              textDecoration: 'none',
                              textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                              padding: '5px 9px',
                              borderRadius: '9999px',
                              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                              background: isActive
                                ? 'rgba(254, 127, 45, 0.2)'
                                : isHovered
                                  ? 'rgba(255, 255, 255, 0.06)'
                                  : 'transparent',
                              border: isActive ? '1px solid rgba(254, 127, 45, 0.35)' : '1px solid transparent',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {link.label}
                          </a>
                        );
                      })}
                    </motion.nav>
                  )}
                </AnimatePresence>
              </motion.div>
 
              {/* Right Action Elements */}
              <motion.div layout="position" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                {/* Hire Me CTA Button */}
                <a
                  href={isHome ? '#contact' : '/#contact'}
                  style={{
                    background: 'linear-gradient(135deg, #FE7F2D 0%, #E86A17 100%)',
                    color: '#000',
                    fontFamily: 'var(--font-heading)',
                    fontSize: isCompact ? '0.62rem' : '0.65rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    padding: isCompact ? '5px 9px' : '5px 12px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 10px rgba(254, 127, 45, 0.35)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(254, 127, 45, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(254, 127, 45, 0.35)';
                  }}
                >
                  <span>Hire Me</span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
 
                {/* Hub Expander Toggle (3 Dots) */}
                <button
                  onClick={() => setHubOpen(true)}
                  aria-label="Open Dynamic Island Hub"
                  style={{
                    width: isCompact ? '26px' : '28px',
                    height: isCompact ? '26px' : '28px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'var(--fg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = 'var(--fg)';
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                    <circle cx="5" cy="12" r="1.5" />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* ------------------------------------------------------------- */}
        {/* EXPANDED HUB WIDGET SHEET BODY                                */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {hubOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '14px 16px 18px',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0.5) 100%)',
                zIndex: 3,
                overflow: 'hidden',
                width: 'min(480px, 94vw)'
              }}
            >
              {/* Profile Info Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-heading)' }}>
                    {siteConfig.name}
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--fg-dim)' }}>
                    {siteConfig.role} • {siteConfig.location}
                  </span>
                </div>
 
                <a
                  href={isHome ? '#contact' : '/#contact'}
                  onClick={() => setHubOpen(false)}
                  style={{
                    background: 'rgba(254, 127, 45, 0.15)',
                    border: '1px solid rgba(254, 127, 45, 0.3)',
                    color: 'var(--accent)',
                    borderRadius: '9999px',
                    padding: '4px 11px',
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  Contact
                </a>
              </div>
 
              {/* Grid Tiles */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '6px',
                }}
              >
                {navLinks.map((link) => {
                  const sectionKey = link.href.replace('#', '');
                  const isActive = activeSection === sectionKey;
                  return (
                    <a
                      key={link.href}
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={() => setHubOpen(false)}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                        padding: '10px 4px',
                        borderRadius: '12px',
                        background: isActive ? 'rgba(254, 127, 45, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: isActive ? '1px solid rgba(254, 127, 45, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                        textDecoration: 'none',
                        color: isActive ? 'var(--accent)' : 'var(--fg)',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      <div style={{ color: isActive ? 'var(--accent)' : 'var(--fg-muted)' }}>
                        {ICONS[sectionKey] || ICONS.highlights}
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {link.label}
                      </span>
                    </a>
                  );
                })}
              </div>
 
              {/* Quick Action Buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <a
                  href="/Raman-Daksh.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    padding: '9px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download CV</span>
                </a>
 
                <a
                  href={siteConfig.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    fontSize: '0.66rem',
                    fontWeight: 600,
                  }}
                >
                  Telegram
                </a>
 
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--fg)',
                    textDecoration: 'none',
                    fontSize: '0.66rem',
                    fontWeight: 600,
                  }}
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Dynamic Island Scroll Progress Laser Track */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'rgba(255, 255, 255, 0.04)',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress * 100}%`,
              background: 'linear-gradient(90deg, #FE7F2D 0%, #FFB074 100%)',
              boxShadow: '0 0 8px rgba(254, 127, 45, 0.8)',
              transition: 'width 0.12s linear',
            }}
          />
        </div>
      </motion.div>
 
      {/* Media queries for smaller screens */}
      <style>{`
        @media (max-width: 900px) {
          .island-desktop-nav {
            display: none !important;
          }
          .island-desktop-only {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
