'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutText, aboutStats, skills } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
    if (isNaN(numericValue)) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue, duration: 1.5, ease: 'expo.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });
    return () => trigger.kill();
  }, [value]);

  return <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>{count || value}</span>;
}

function RevealLine({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' }, delay }
    );
  }, [delay]);
  return <div ref={ref} style={{ overflow: 'hidden' }}>{children}</div>;
}

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
      gsap.fromTo(Array.from(textRef.current?.children || []), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'expo.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' } });
      gsap.fromTo(Array.from(statsRef.current?.children || []), { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } });
      gsap.fromTo(Array.from(stackRef.current?.children || []), { opacity: 0, scale: 0.7, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: stackRef.current, start: 'top 85%' } });
    }, sectionRef);

    // Fallback
    const fallback = setTimeout(() => {
      [headingRef, textRef, statsRef, stackRef].forEach((r) => {
        if (r.current) {
          const els = r.current.children ? Array.from(r.current.children) : [r.current];
          els.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
        }
      });
    }, 4000);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section">
      <div style={{ marginBottom: '3.5rem' }}>
        <p className="section-label">[03] About</p>
        <h2 ref={headingRef} className="text-heading">A bit about me</h2>
      </div>

      <div className="about-grid" style={{ marginBottom: '4rem' }}>
        <div ref={textRef}>
          {aboutText.map((text, i) => (
            <RevealLine key={i} delay={i * 0.1}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
                {text}
              </p>
            </RevealLine>
          ))}
        </div>

        <div ref={statsRef}>
          {aboutStats.map((stat, i) => (
            <div
              key={i}
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: i < aboutStats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(30, 41, 59, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <span style={{ fontSize: '2.75rem', fontWeight: 600, color: 'var(--accent)', lineHeight: 1, textShadow: '0 0 30px var(--accent-glow)' }}>
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-dim)', marginBottom: '1rem' }}>
          Tech Stack
        </p>
        <div ref={stackRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map((skill) => (
            <span key={skill} className="tag">{skill}</span>
          ))}
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
