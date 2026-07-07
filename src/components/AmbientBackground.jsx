'use client';

import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    const threeScript = document.createElement('script');
    threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    threeScript.async = true;
    document.head.appendChild(threeScript);

    threeScript.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
      vantaScript.async = true;
      document.head.appendChild(vantaScript);

      vantaScript.onload = () => {
        if (vantaRef.current && !vantaEffect.current) {
          vantaEffect.current = VANTA.FOG({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            highlightColor: 0xf47f00,
            midtoneColor: 0xf48d0b,
            lowlightColor: 0x65300d,
            baseColor: 0x0,
            blurFactor: 0.32,
            speed: 1.50,
            zoom: 0.80,
          });
        }
      };
    };

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#000',
      }}
    />
  );
}
