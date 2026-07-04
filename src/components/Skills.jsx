'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(track1Ref.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' } }
      );

      gsap.fromTo(track2Ref.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
          delay: 0.2 }
      );
    }, sectionRef);

    // Fallback
    const fallback = setTimeout(() => {
      [track1Ref, track2Ref].forEach((r) => {
        if (r.current) r.current.style.opacity = '1';
      });
    }, 4000);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  const duplicated1 = [...skills, ...skills, ...skills, ...skills];
  const duplicated2 = [...skills.slice().reverse(), ...skills.slice().reverse(), ...skills.slice().reverse(), ...skills.slice().reverse()];

  return (
    <div
      ref={sectionRef}
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '2.5rem 0',
        background: 'rgba(15, 23, 42, 0.3)',
        position: 'relative',
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '150px',
          background: 'linear-gradient(to right, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '150px',
          background: 'linear-gradient(to left, var(--bg), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Track 1 - left to right */}
      <div ref={track1Ref} style={{ marginBottom: '1rem' }}>
        <div className="marquee-track" style={{ animationDuration: '35s' }}>
          {duplicated1.map((skill, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0 2rem',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--accent)',
                  textShadow: '0 0 20px var(--accent-glow)',
                }}
              >
                {skill}
              </span>
              <span
                style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'var(--border)',
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Track 2 - right to left (reverse) */}
      <div ref={track2Ref}>
        <div className="marquee-track" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
          {duplicated2.map((skill, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '0 2rem',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--fg-dim)',
                }}
              >
                {skill}
              </span>
              <span
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'var(--border-subtle)',
                  flexShrink: 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
