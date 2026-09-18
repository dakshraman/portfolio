'use client';

import { useEffect, useRef, useState } from 'react';
import { aboutText, aboutStats } from '@/data/portfolio';
import ScrollReveal from '@/components/ScrollReveal';

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

  const suffix = value.replace(/[0-9]/g, '');
  const display = count ? `${count}${suffix}` : value;
  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{display}</span>;
}



export default function About() {
  return (
    <section id="about" className="section about-section">
      <ScrollReveal delay={0} className="mb-14">
        <div style={{ marginBottom: '3.5rem' }}>
          <p className="section-label">[03] About</p>
          <h2 className="text-heading">Why clients work with me</h2>
        </div>
      </ScrollReveal>

      <div className="about-grid" style={{ marginBottom: '4rem' }}>
        <div>
          {aboutText.map((text, i) => (
            <ScrollReveal key={i} delay={i * 0.1} yOffset={30}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
                {text}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <div>
          {aboutStats.map((stat, i) => {
            const colors = ['#5E6AD2', '#A855F7', '#F59E0B', '#EF4444'];
            const color = colors[i % colors.length];
            return (
              <ScrollReveal key={i} delay={i * 0.1} yOffset={20}>
                <div
                  className="card"
                  style={{
                    padding: '1.25rem 1.5rem',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontSize: '2.75rem', fontWeight: 700, color, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
                    <AnimatedCounter value={stat.value} />
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
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
    </section>
  );
}
