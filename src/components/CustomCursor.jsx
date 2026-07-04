'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const hover = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    ring.style.opacity = '1';
    dot.style.opacity = '1';

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
      ringPos.current.x = -100;
      ringPos.current.y = -100;
      dotPos.current.x = -100;
      dotPos.current.y = -100;
    };

    const onOver = (e) => {
      const t = e.target;
      const h = !!(t.closest('a') || t.closest('button') || t.closest('[data-cursor="pointer"]'));
      if (h !== hover.current) {
        hover.current = h;
        ring.style.width = h ? '52px' : '34px';
        ring.style.height = h ? '52px' : '34px';
        ring.style.borderColor = h ? 'var(--accent)' : 'rgba(255,255,255,0.25)';
        dot.style.width = h ? '6px' : '4px';
        dot.style.height = h ? '6px' : '4px';
        dot.style.background = h ? 'var(--accent)' : 'var(--fg)';
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onOver, { passive: true });

    let raf;
    const tick = () => {
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ringPos.current.x += (mx - ringPos.current.x) * 0.18;
      ringPos.current.y += (my - ringPos.current.y) * 0.18;
      dotPos.current.x += (mx - dotPos.current.x) * 0.35;
      dotPos.current.y += (my - dotPos.current.y) * 0.35;

      ring.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px) translate(-50%,-50%)`;
      dot.style.transform = `translate(${dotPos.current.x}px,${dotPos.current.y}px) translate(-50%,-50%)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 34, height: 34,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.25)',
          pointerEvents: 'none', zIndex: 99998,
          opacity: 0, willChange: 'transform',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, opacity 0.4s ease',
        }}
      />
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 4, height: 4,
          borderRadius: '50%',
          background: 'var(--fg)',
          pointerEvents: 'none', zIndex: 99999,
          opacity: 0, willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.4s ease',
        }}
      />
    </>
  );
}
