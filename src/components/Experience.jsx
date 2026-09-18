'use client';

import { experiences } from '@/data/portfolio';
import ScrollReveal from '@/components/ScrollReveal';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <ScrollReveal delay={0} className="mb-14">
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label">[03] Experience</p>
          <h2 className="text-heading">Where I&apos;ve worked</h2>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {experiences.map((exp, i) => (
          <ScrollReveal key={i} delay={i * 0.1}>
            <article
              className="exp-row"
              aria-label={`${exp.role} at ${exp.company}`}
              style={{
                padding: '2rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.3s ease',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                position: 'relative',
                border: '1px solid var(--glass-border)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg-hover)';
                e.currentTarget.style.backdropFilter = 'var(--glass-blur-heavy)';
                e.currentTarget.style.WebkitBackdropFilter = 'var(--glass-blur-heavy)';
                e.currentTarget.style.border = '1px solid var(--glass-border-hover)';
                e.currentTarget.style.borderColor = 'rgba(254, 127, 45, 0.2)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow-hover)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--glass-bg)';
                e.currentTarget.style.backdropFilter = 'var(--glass-blur)';
                e.currentTarget.style.WebkitBackdropFilter = 'var(--glass-blur)';
                e.currentTarget.style.border = '1px solid var(--glass-border)';
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                e.currentTarget.style.transform = 'translateY(0)';
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
          </ScrollReveal>
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
    </section>
  );
}
