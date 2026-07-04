'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/portfolio';

function MagneticText({ text }) {
  const containerRef = useRef(null);
  const letters = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e) => {
      letters.current.forEach((letter) => {
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 100;
        if (dist < maxDist) {
          const strength = (1 - dist / maxDist) * 8;
          letter.style.transform = `translate(${-dx * strength * 0.01}px, ${-dy * strength * 0.01}px)`;
          letter.style.color = `rgba(94, 106, 210, ${1 - dist / maxDist * 0.5})`;
        } else {
          letter.style.transform = 'translate(0, 0)';
          letter.style.color = '';
        }
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    return () => el.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <span ref={containerRef} data-cursor="pointer" style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={(el) => (letters.current[i] = el)}
          style={{
            display: 'inline-block',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease',
            willChange: 'transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Contact() {
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
    <section ref={sectionRef} id="contact" className="section contact-section" style={{ paddingBottom: '80px', background: 'radial-gradient(ellipse at 80% 50%, rgba(236, 72, 153, 0.04) 0%, transparent 60%)' }}>
      <p className="section-label" style={{ textAlign: 'center' }}>
        [07] What&apos;s next?
      </p>

      <h2 className="text-heading" style={{ marginBottom: '2rem', fontSize: 'clamp(1.8rem, 4vw, 3rem)', textAlign: 'center' }}>
        Have an idea?
      </h2>

      <div style={{ width: '80px', height: '2px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)', margin: '0 auto 3rem' }} />

      <div style={{ textAlign: 'center' }}>
        <a
          href={`mailto:${siteConfig.email}`}
          style={{
            display: 'inline-block',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--fg)',
            textDecoration: 'none',
            marginBottom: '5rem',
            lineHeight: 1.1,
            transition: 'text-shadow 0.3s ease',
            fontFamily: 'var(--font-heading)',
          }}
          data-cursor="pointer"
          onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 40px var(--accent-glow-strong)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; }}
        >
          <MagneticText text="Let's work together" />
        </a>
      </div>

      <address
        className="contact-footer"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem 3rem',
          flexWrap: 'wrap',
          borderTop: '2px solid var(--border-thick)',
          paddingTop: '2.5rem',
          fontStyle: 'normal',
        }}
      >
        {[
          { label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
          { label: 'Location', value: siteConfig.location },
          { label: 'GitHub', value: 'GitHub', href: siteConfig.github, external: true },
          { label: 'LinkedIn', value: 'LinkedIn', href: siteConfig.linkedin, external: true },
          { label: 'Instagram', value: 'Instagram', href: siteConfig.instagram, external: true },
          { label: 'Telegram', value: 'Telegram', href: siteConfig.telegram, external: true },
        ].map((item) => (
          <div key={item.label} style={{ textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--fg-dim)', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
              {item.label}
            </span>
            {item.href ? (
              <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}
                style={{ fontSize: '0.9rem', color: 'var(--fg)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.3s ease', fontFamily: 'var(--font-heading)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
              >
                {item.value}
              </a>
            ) : (
              <span style={{ fontSize: '0.9rem', color: 'var(--fg)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{item.value}</span>
            )}
          </div>
        ))}
      </address>
      <style jsx>{`
        .contact-section > * {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .contact-section.visible > * {
          opacity: 1;
          transform: translateY(0);
        }
        .contact-section > *:nth-child(1) { transition-delay: 0s; }
        .contact-section > *:nth-child(2) { transition-delay: 0.1s; }
        .contact-section > *:nth-child(3) { transition-delay: 0.2s; }
        .contact-section.visible > *:nth-child(3) { transform: scaleX(1); }
        .contact-section > *:nth-child(3) { transform: scaleX(0); }
        .contact-section > *:nth-child(4) { transition-delay: 0.3s; }
        .contact-section > *:nth-child(5) { transition-delay: 0.4s; }
      `}</style>
    </section>
  );
}
