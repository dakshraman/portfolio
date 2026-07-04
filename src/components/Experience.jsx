'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      );

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
            delay: i * 0.08 }
        );
      });
    }, sectionRef);

    // Fallback
    const fallback = setTimeout(() => {
      if (headingRef.current) headingRef.current.style.opacity = '1';
      itemsRef.current.forEach((item) => { if (item) item.style.opacity = '1'; });
    }, 4000);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[02] Experience</p>
        <h2 ref={headingRef} className="text-heading">Where I&apos;ve worked</h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {experiences.map((exp, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            data-cursor="pointer"
            style={{
              padding: '2rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              borderRadius: '0',
              transition: 'background 0.3s ease',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)';
              e.currentTarget.style.borderRadius = 'var(--radius-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderRadius = '0';
            }}
          >
            {/* Mobile-first stacked layout */}
            <div className="exp-grid">
              <div className="exp-company">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '0.3rem' }}>
                  {exp.company}
                </h3>
                <p className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--fg-dim)' }}>
                  {exp.location}
                </p>
                <span className="font-mono exp-period-mobile" style={{ fontSize: '0.7rem', color: 'var(--fg-dim)', marginTop: '0.25rem' }}>
                  {exp.period}
                </span>
              </div>

              <div className="exp-role">
                <h4 style={{ fontSize: '1.35rem', fontWeight: 400, marginBottom: '0.5rem' }}>
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
                <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--fg-dim)' }}>
                  {exp.period}
                </span>
              </div>
            </div>
          </div>
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
