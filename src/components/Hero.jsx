'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '@/data/portfolio';

function TextScramble({ text, className, style }) {
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

    const timeout = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, 800);

    return () => { clearTimeout(timeout); cancelAnimationFrame(rafId); };
  }, [text]);

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

function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 20 : 40;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    let rafId;
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = window.innerHeight;
        if (p.y > window.innerHeight) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(94, 106, 210, ${p.opacity})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(94, 106, 210, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafId); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.6 }} />
  );
}

const fadeUp = { animation: 'heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both' };
const fadeUp1 = { animation: 'heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s both' };
const fadeUp2 = { animation: 'heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both' };
const fadeUp3 = { animation: 'heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s both' };
const fadeUp4 = { animation: 'heroFadeUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s both' };
const fadeUp5 = { animation: 'heroFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.8s both' };

export default function Hero() {
  return (
    <header className="section" style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', paddingBottom: '40px', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse at 20% 50%, rgba(94, 106, 210, 0.04) 0%, transparent 60%)' }}>
      <FloatingParticles />

      <div style={{ position: 'relative', zIndex: 2, ...fadeUp }}>
        <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow-strong), 0 0 32px var(--accent-glow)', animation: 'pulse 2s ease-in-out infinite' }} />
          {siteConfig.availability}
        </p>
      </div>

      <div style={{ margin: 'clamp(1.5rem, 3vw, 3rem) 0', position: 'relative', zIndex: 2 }}>
        <h1 className="text-display" style={{ fontWeight: 700, marginBottom: '1rem' }}>
          <span style={{ display: 'block', ...fadeUp2 }}>
            <TextScramble text={siteConfig.name.split(' ')[0]} />
          </span>
          <span style={{ display: 'block', color: 'var(--fg-dim)', fontSize: '0.7em', lineHeight: 1.1, ...fadeUp3 }}>
            <TextScramble text={siteConfig.name.split(' ')[1]} />
          </span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', ...fadeUp4 }}>
          <div style={{ width: 'clamp(60px, 15vw, 120px)', height: '2px', background: 'var(--accent)' }} />
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: 'var(--fg-muted)', fontFamily: 'var(--font-heading)', fontWeight: 500, letterSpacing: '-0.01em' }}>
            {siteConfig.role}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2, ...fadeUp5 }}>
        <p style={{ maxWidth: '480px', fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', lineHeight: 1.7, color: 'var(--fg-muted)' }}>
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
          <MagneticButton href="/resume.pdf" className="btn-ghost" download>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download CV
          </MagneticButton>
          <MagneticButton href="#contact" className="btn-ghost">Contact Me</MagneticButton>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2, animation: 'float 3s ease-in-out infinite' }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-heading)', fontWeight: 600 }}>Scroll</span>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>

      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @media (max-width: 768px) {
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </header>
  );
}
