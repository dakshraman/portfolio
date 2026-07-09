'use client';

import { useEffect, useRef } from 'react';
import { services } from '@/data/portfolio';

const sectionColor = '#14B8A6';

const ServiceIcon = ({ icon }) => {
  const icons = {
    laravel: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M8 32V8H24L32 16V32H8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 8V16H32" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 23H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 28H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    flutter: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="28" r="2" fill="currentColor" opacity="0.3" />
        <path d="M14 14H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 18H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 22H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    api: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="10" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="10" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="22" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="22" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 14H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 26H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    architecture: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="22" y="6" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="22" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 18V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 28H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    fullstack: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 18L10 22L14 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M26 18L30 22L26 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 14L18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    consulting: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 14V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="26" r="1.5" fill="currentColor" opacity="0.6" />
        <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M28 12L24 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M12 28L16 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <path d="M28 28L24 24" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      </svg>
    ),
  };
  return icons[icon] || icons.api;
};

export default function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="section services-section" aria-label="Services">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[02] Services</p>
        <h2 className="text-heading">What I offer</h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap: '16px',
        }}
      >
        {services.map((service, i) => (
          <article
            key={i}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid var(--border-thick)',
              boxShadow: `4px 4px 0px ${sectionColor}22`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `6px 6px 0px ${sectionColor}44`;
              e.currentTarget.style.borderColor = `${sectionColor}44`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `4px 4px 0px ${sectionColor}22`;
              e.currentTarget.style.borderColor = 'var(--border-thick)';
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: `${sectionColor}15`,
                border: `1px solid ${sectionColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: sectionColor,
                marginBottom: '1.25rem',
                flexShrink: 0,
              }}
            >
              <ServiceIcon icon={service.icon} />
            </div>

            <h3
              style={{
                fontSize: '1.15rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--fg)',
                marginBottom: '0.75rem',
              }}
            >
              {service.title}
            </h3>

            <p
              style={{
                color: 'var(--fg-muted)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginBottom: '1.5rem',
                flexGrow: 1,
              }}
            >
              {service.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
              {service.features.map((feature, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.75rem',
                    color: 'var(--fg-dim)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 600,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke={sectionColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .services-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .services-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .services-section > *:nth-child(1) { transition-delay: 0s; }
        .services-section > *:nth-child(2) { transition-delay: 0.1s; }
        .services-section .card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .services-section.visible .card {
          opacity: 1;
          transform: translateY(0);
        }
        .services-section.visible .card:nth-child(1) { transition-delay: 0.05s; }
        .services-section.visible .card:nth-child(2) { transition-delay: 0.1s; }
        .services-section.visible .card:nth-child(3) { transition-delay: 0.15s; }
        .services-section.visible .card:nth-child(4) { transition-delay: 0.2s; }
        .services-section.visible .card:nth-child(5) { transition-delay: 0.25s; }
        .services-section.visible .card:nth-child(6) { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}
