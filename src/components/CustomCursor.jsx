'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const ref = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const el = ref.current;
    if (!el) return;
    el.style.opacity = '1';

    let mx = -100, my = -100;

    const move = (e) => {
      mx = e.clientX;
      my = e.clientY;
      el.style.transform = `translate(${mx - 12}px,${my - 12}px)`;
    };

    const leave = () => { el.style.opacity = '0'; };
    const enter = () => { el.style.opacity = '1'; };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);

    let hovered = false;
    const over = (e) => {
      const h = !!(e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-cursor="pointer"]'));
      if (h === hovered) return;
      hovered = h;
      el.style.width = h ? '32px' : '24px';
      el.style.height = h ? '32px' : '24px';
      el.style.borderColor = h ? 'var(--accent)' : 'rgba(255,255,255,0.4)';
      el.style.background = h ? 'rgba(34,197,94,0.15)' : 'transparent';
      el.style.marginLeft = h ? '-4px' : '0';
      el.style.marginTop = h ? '-4px' : '0';
    };
    document.addEventListener('mouseover', over, { passive: true });

    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: 24, height: 24,
        borderRadius: '50%',
        border: '1.5px solid rgba(255,255,255,0.4)',
        pointerEvents: 'none', zIndex: 99999,
        opacity: 0,
        transition: 'width 0.15s ease, height 0.15s ease, border-color 0.15s ease, background 0.15s ease, opacity 0.2s ease',
      }}
    />
  );
}
