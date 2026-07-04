'use client';

import { useEffect, useRef } from 'react';
import { experiences } from '@/data/portfolio';

export default function Experience() {
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
    <section ref={sectionRef} id="experience" className="section experience-section">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[02] Experience</p>
        <h2 className="text-heading">Where I&apos;ve worked</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {experiences.map((exp, i) => (
          <article
            key={i}
            data-cursor="pointer"
            className="exp-row"
            aria-label={`${exp.role} at ${exp.company}`}
            style={{
              padding: '2rem 1.5rem',
              borderTop: i === 0 ? '2px solid var(--border-thick)' : '2px solid var(--border-thick)',
              borderRadius: '0',
              transition: 'all 0.3s ease',
              background: 'transparent',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-card)';
              e.currentTarget.style.borderLeft = '2px solid var(--accent)';
              e.currentTarget.style.paddingLeft = 'calc(1.5rem - 2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderLeft = 'none';
              e.currentTarget.style.paddingLeft = '1.5rem';
            }}
          >
            <div className="exp-grid">
              <div className="exp-company">
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.01em' }}>
                  {exp.company}
                </h3>
                <p style={{ fontSize: '0.7rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {exp.location}
                </p>
                <span className="exp-period-mobile" style={{ fontSize: '0.65rem', color: 'var(--fg-dim)', marginTop: '0.25rem', display: 'none' }}>
                  {exp.period}
                </span>
              </div>

              <div className="exp-role">
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  {exp.role}
                </h4>
                <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {exp.description}
                </p>
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                  {exp.technologies?.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="exp-period" style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {exp.period}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 2.5fr 0.8fr;
          gap: 1.5rem;
          align-items: start;
        }
        .exp-period-mobile { display: none; }
        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .exp-period { display: none; }
          .exp-period-mobile { display: block; }
        }
      `}</style>
      <style jsx>{`
        .experience-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .experience-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .experience-section > *:nth-child(1) { transition-delay: 0s; }
        .experience-section > *:nth-child(2) { transition-delay: 0.1s; }
        .experience-section > *:nth-child(3) { transition-delay: 0.15s; }
        .experience-section > *:nth-child(4) { transition-delay: 0.2s; }
        .experience-section > *:nth-child(5) { transition-delay: 0.25s; }
        .experience-section > *:nth-child(6) { transition-delay: 0.3s; }
        .experience-section > *:nth-child(7) { transition-delay: 0.35s; }
      `}</style>
    </section>
  );
}
