'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
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

function MagneticButton({ children, href, className, style }) {
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

  return <a ref={btnRef} href={href} className={className} style={style} data-cursor="pointer">{children}</a>;
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
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
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
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.06 * (1 - dist / 120)})`;
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

export default function Hero() {
  const sectionRef = useRef(null);
  const statusRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const roleRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo(lineRef.current, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 1.2 }, 0)
        .from(statusRef.current, { opacity: 0, y: 20, duration: 0.8 }, 0.3)
        .fromTo(firstNameRef.current, { opacity: 0, y: 60, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }, 0.5)
        .fromTo(lastNameRef.current, { opacity: 0, y: 60, rotateX: -15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2 }, 0.7)
        .from(roleRef.current, { opacity: 0, y: 25, duration: 0.8 }, 1.0)
        .from(bioRef.current, { opacity: 0, y: 25, duration: 0.8 }, 1.2)
        .from(ctaRef.current?.children || [], { opacity: 0, y: 25, scale: 0.95, duration: 0.6, stagger: 0.1 }, 1.4);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
      <FloatingParticles />

      <div ref={statusRef} style={{ marginBottom: 'auto', position: 'relative', zIndex: 2 }}>
        <p className="font-mono" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 16px var(--accent-glow-strong), 0 0 32px var(--accent-glow)', animation: 'pulse 2s ease-in-out infinite' }} />
          {siteConfig.availability}
        </p>
      </div>

      <div style={{ margin: 'clamp(1.5rem, 3vw, 3rem) 0', position: 'relative', zIndex: 2 }}>
        <div ref={lineRef} style={{ width: '100%', height: '1px', background: 'linear-gradient(to right, var(--accent), transparent)', marginBottom: '1.5rem', transformOrigin: 'left' }} />
        <h1 className="text-display" style={{ fontWeight: 600, marginBottom: '0.75rem', perspective: '1000px' }}>
          <span ref={firstNameRef} style={{ display: 'inline-block' }}>
            <TextScramble text={siteConfig.name.split(' ')[0]} />
          </span>
          <br />
          <span ref={lastNameRef} style={{ display: 'inline-block', color: 'var(--accent)', textShadow: '0 0 50px var(--accent-glow-strong)' }}>
            <TextScramble text={siteConfig.name.split(' ')[1]} />
          </span>
        </h1>
        <p ref={roleRef} style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: 'var(--fg-muted)', fontWeight: 300, letterSpacing: '-0.01em' }}>
          {siteConfig.role}
        </p>
      </div>

      <div ref={bioRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
        <p style={{ maxWidth: '540px', fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', lineHeight: 1.7, color: 'var(--fg-muted)', fontWeight: 400 }}>
          {siteConfig.tagline}{' '}
          <span style={{ color: 'var(--fg)' }}>{siteConfig.description}</span>
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <MagneticButton href="#projects" className="btn-primary">
            Selected Work
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#contact" className="btn-ghost">Contact Me</MagneticButton>
        </div>
      </div>

      <div className="scroll-indicator" style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2, animation: 'float 3s ease-in-out infinite' }}>
        <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Scroll</span>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>

      <style jsx>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes float { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(6px); } }
        @media (max-width: 768px) {
          .scroll-indicator { display: none !important; }
        }
      `}</style>
    </section>
  );
}
