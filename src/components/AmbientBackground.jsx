'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId;
    let time = 0;

    const animate = () => {
      time += 0.0015;
      const blobs = containerRef.current?.querySelectorAll('.ambient-blob');
      if (blobs) {
        blobs.forEach((blob, i) => {
          const speed = (i + 1) * 0.3;
          const x = Math.sin(time * speed + i * 2.1) * 12;
          const y = Math.cos(time * speed * 0.5 + i * 1.7) * 10;
          blob.style.transform = `translate(${x}%, ${y}%)`;
        });
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
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
      {/* Top-right blue blob */}
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-15%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
      {/* Bottom-left purple blob */}
      <div
        className="ambient-blob"
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-20%',
          width: '55vw',
          height: '55vw',
          maxWidth: '650px',
          maxHeight: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
