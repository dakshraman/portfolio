'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const containerRef = useRef(null);
  const mouseOrbRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let time = 0;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const orbPos = { x: mouse.x, y: mouse.y };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
      time += 0.002;

      // Animate floating blobs
      const blobs = containerRef.current?.querySelectorAll('.ambient-blob');
      if (blobs) {
        blobs.forEach((blob, i) => {
          const speed = (i + 1) * 0.4;
          const x = Math.sin(time * speed + i * 1.7) * 20;
          const y = Math.cos(time * speed * 0.6 + i * 2.3) * 15;
          const scale = 1 + Math.sin(time * speed * 0.5 + i) * 0.1;
          blob.style.transform = `translate(${x}%, ${y}%) scale(${scale})`;
        });
      }

      // Mouse-following orb with spring physics
      orbPos.x += (mouse.x - orbPos.x) * 0.03;
      orbPos.y += (mouse.y - orbPos.y) * 0.03;
      if (mouseOrbRef.current) {
        mouseOrbRef.current.style.transform = `translate(${orbPos.x - 200}px, ${orbPos.y - 200}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Mouse-following orb */}
      <div
        ref={mouseOrbRef}
        className="ambient-mouse-orb"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.03) 40%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
      />

      {/* Floating blobs */}
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-8%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.07) 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-12%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          top: '35%',
          left: '25%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.05) 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          top: '60%',
          right: '20%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.04) 0%, transparent 65%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Grain texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(51, 65, 85, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 65, 85, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />
    </div>
  );
}
