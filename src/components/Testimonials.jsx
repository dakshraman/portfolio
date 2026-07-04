'use client';

import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { testimonials } from '@/data/portfolio';

const colors = ['#5E6AD2', '#A855F7', '#F59E0B', '#06B6D4'];

export default function Testimonials() {
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
    <section ref={sectionRef} id="testimonials" className="section testimonials-section" aria-label="Testimonials">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[04] Testimonials</p>
        <h2 className="text-heading">What people say</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
        {testimonials.map((t, i) => {
          const color = colors[i % colors.length];
          return (
            <figure
              key={i}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                border: '2px solid var(--border-thick)',
                boxShadow: `4px 4px 0px ${color}22`,
                margin: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `6px 6px 0px ${color}44`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `4px 4px 0px ${color}22`;
              }}
            >
              <Icon
                icon="mdi:format-quote-open"
                width={28}
                height={28}
                style={{ color, opacity: 0.5 }}
              />
              <blockquote style={{ margin: 0, fontSize: '0.9rem', color: 'var(--fg-muted)', lineHeight: 1.75, fontStyle: 'italic', flexGrow: 1 }}>
                {t.quote}
              </blockquote>
              <figcaption style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto' }}>
                <div
                  style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                    border: `2px solid ${color}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-heading)', fontSize: '0.75rem', fontWeight: 700,
                    color, flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--font-heading)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{t.role}</p>
                </div>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <style jsx>{`
        .testimonials-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonials-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .testimonials-section > *:nth-child(1) { transition-delay: 0s; }
        .testimonials-section > *:nth-child(2) { transition-delay: 0.1s; }
      `}</style>
    </section>
  );
}
