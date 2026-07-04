'use client';

import { useEffect, useRef, useState } from 'react';
import { aboutText, aboutStats } from '@/data/portfolio';

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericValue)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          const duration = 1500;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * numericValue));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.85 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{count || value}</span>;
}

function RevealLine({ children, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Lower threshold so it triggers earlier
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={ref} 
      style={{ 
        overflow: 'hidden', 
        clipPath: isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)', 
        transition: 'clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)' 
      }}
    >
      {children}
    </div>
  );
}

export default function About() {
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
    <section ref={sectionRef} id="about" className="section about-section">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[03] About</p>
        <h2 className="text-heading">A bit about me</h2>
      </div>

      <div className="about-grid" style={{ marginBottom: '4rem' }}>
        <div>
          {aboutText.map((text, i) => (
            <RevealLine key={i} delay={i * 0.1}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
                {text}
              </p>
            </RevealLine>
          ))}
        </div>

        <div>
          {aboutStats.map((stat, i) => {
            const colors = ['#5E6AD2', '#A855F7', '#F59E0B', '#EF4444'];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                className="card"
                style={{
                  padding: '1.25rem 1.5rem',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  border: '2px solid var(--border-thick)',
                  boxShadow: '3px 3px 0px rgba(237, 237, 239, 0.08)',
                }}
              >
                <span style={{ fontSize: '2.75rem', fontWeight: 700, color, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                  <AnimatedCounter value={stat.value} />
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
      <style jsx>{`
        .about-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .about-section > *:nth-child(1) { transition-delay: 0s; }
        .about-section > *:nth-child(2) { transition-delay: 0.1s; }
        .about-section > *:nth-child(3) { transition-delay: 0.2s; }
        .about-section > *:nth-child(4) { transition-delay: 0.3s; }
      `}</style>
    </section>
  );
}
