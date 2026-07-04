'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

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
          letter.style.color = `rgba(34, 197, 94, ${1 - dist / maxDist * 0.5})`;
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
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' })
        .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' }, 0.1)
        .fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 1, ease: 'expo.out' }, 0.2)
        .fromTo(ctaRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' }, 0.3)
        .fromTo(Array.from(footerRef.current?.children || []), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'expo.out' }, 0.6);
    }, sectionRef);

    // Fallback: ensure visibility after 4s even if ScrollTrigger never fires
    const fallback = setTimeout(() => {
      [labelRef, headingRef, ctaRef, footerRef].forEach((r) => {
        if (r.current) r.current.style.opacity = '1';
      });
      if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)';
    }, 4000);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section" style={{ textAlign: 'center', paddingBottom: '80px' }}>
      <p ref={labelRef} className="font-mono section-label" style={{ justifyContent: 'center' }}>
        [04] What&apos;s next?
      </p>

      <h2 ref={headingRef} className="text-heading" style={{ marginBottom: '2rem', fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
        Have an idea?
      </h2>

      <div ref={lineRef} style={{ width: '80px', height: '2px', background: 'linear-gradient(to right, transparent, var(--accent), transparent)', margin: '0 auto 3rem' }} />

      <a
        ref={ctaRef}
        href={`mailto:${siteConfig.email}`}
        style={{
          display: 'inline-block',
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          color: 'var(--fg)',
          textDecoration: 'none',
          marginBottom: '5rem',
          lineHeight: 1.1,
          transition: 'text-shadow 0.3s ease',
        }}
        data-cursor="pointer"
        onMouseEnter={(e) => { e.currentTarget.style.textShadow = '0 0 40px rgba(34, 197, 94, 0.3)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.textShadow = 'none'; }}
      >
        <MagneticText text="Let's work together" />
      </a>

      <div
        ref={footerRef}
        className="contact-footer"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem 3rem',
          flexWrap: 'wrap',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2.5rem',
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
            <span className="font-mono" style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem', color: 'var(--fg-dim)' }}>
              {item.label}
            </span>
            {item.href ? (
              <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}
                style={{ fontSize: '0.95rem', color: 'var(--fg)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--fg)'; }}
              >
                {item.value}
              </a>
            ) : (
              <span style={{ fontSize: '0.95rem', color: 'var(--fg)', fontWeight: 500 }}>{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
