'use client';

import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/data/portfolio';
import { useLoader } from '@/components/LoaderWrapper';

function TextScramble({ text, trigger, className, style }) {
  const ref = useRef(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!ref.current) return;

    const el = ref.current;
    const original = text;
    let iteration = 0;
    let rafId;

    const animate = () => {
      el.textContent = original
        .split('')
        .map((char, i) => {
          if (i < iteration) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration < original.length) {
        iteration += 1 / 2;
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => { cancelAnimationFrame(rafId); };
  }, [text, trigger]); // Reruns when trigger changes

  return <span ref={ref} className={className} style={style}>{text}</span>;
}

function MagneticButton({ children, href, className, style, download }) {
  const btnRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!btnRef.current) return;

    const el = btnRef.current;
    let currentX = 0, currentY = 0, targetX = 0, targetY = 0, rafId;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) * 0.3;
      targetY = (e.clientY - rect.top - rect.height / 2) * 0.3;
    };
    const onMouseLeave = () => { targetX = 0; targetY = 0; };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <a ref={btnRef} href={href} className={className} style={style} data-cursor="pointer" download={download}>{children}</a>;
}

export default function Hero() {
  const loading = useLoader();
  const [scrambleTrigger, setScrambleTrigger] = useState(0);

  // When loading finishes, we trigger the initial scramble
  useEffect(() => {
    if (!loading) {
      setScrambleTrigger(1);
    }
  }, [loading]);

  const handleNameHover = () => {
    setScrambleTrigger(prev => prev + 1);
  };

  // Only apply animation styles if loading is finished so they don't play behind the loader
  const fadeUp = !loading ? { animation: 'heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both' } : { opacity: 0 };
  const fadeUp1 = !loading ? { animation: 'heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' } : { opacity: 0 };
  const fadeUp2 = !loading ? { animation: 'heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both' } : { opacity: 0 };
  const fadeUp3 = !loading ? { animation: 'heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' } : { opacity: 0 };
  const fadeUp4 = !loading ? { animation: 'heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both' } : { opacity: 0 };

  return (
    <header className="section" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', paddingBottom: '40px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Wrapped content inside a glassmorphic container for ultra-premium look over the video */}
      <div className="glass" style={{
        position: 'relative', 
        zIndex: 2, 
        padding: 'clamp(2rem, 5vw, 4rem)',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.5rem, 3vw, 3rem)'
      }}>
        <div style={fadeUp}>
          <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow-strong), 0 0 32px var(--accent-glow)', animation: 'pulse 2s ease-in-out infinite' }} />
            {siteConfig.availability}
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 
            className="text-display" 
            style={{ fontWeight: 700, marginBottom: '1.5rem', cursor: 'default' }}
            onMouseEnter={handleNameHover}
          >
            <span style={{ display: 'block', ...fadeUp1 }}>
              <TextScramble text={siteConfig.name.split(' ')[0]} trigger={scrambleTrigger} />
            </span>
            <span style={{ display: 'block', color: 'var(--fg-dim)', fontSize: '0.7em', lineHeight: 1.1, ...fadeUp2 }}>
              <TextScramble text={siteConfig.name.split(' ')[1]} trigger={scrambleTrigger} />
            </span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', ...fadeUp3 }}>
            <div style={{ width: 'clamp(60px, 15vw, 120px)', height: '2px', background: 'var(--accent)' }} />
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', color: 'var(--fg-muted)', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.01em' }}>
              {siteConfig.role}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2, ...fadeUp4 }}>
          <p style={{ maxWidth: '520px', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.7, color: 'var(--fg-muted)' }}>
            {siteConfig.tagline}{' '}
            <span style={{ color: 'var(--fg)' }}>{siteConfig.description}</span>
          </p>

          <div style={{ display: 'flex', gap: '12px', flexShrink: 0, flexWrap: 'wrap' }}>
            <MagneticButton href="#projects" className="btn-primary">
              Selected Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="/resume.pdf" className="btn-ghost" style={{ backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)' }} download>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CV
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost" style={{ backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)' }}>Contact Me</MagneticButton>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2, animation: 'float 3s ease-in-out infinite' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Scroll</span>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>

      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @media (max-width: 768px) {
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </header>
  );
}
