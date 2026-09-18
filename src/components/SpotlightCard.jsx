'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function SpotlightCard({ children, className = '' }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Maps mouse position (-0.5 to 0.5) to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    setPosition({ x: mouseX, y: mouseY });

    // 3D calculation
    const width = rect.width;
    const height = rect.height;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => { setOpacity(1); };
  
  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      <div 
        style={{ 
          transform: 'translateZ(10px)', 
          transformStyle: 'preserve-3d', 
          height: '100%', 
          borderRadius: 'inherit',
          overflow: 'hidden'
        }}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(254, 127, 45, 0.15), transparent 40%)`,
            position: 'absolute',
            inset: '-1px',
            pointerEvents: 'none',
            zIndex: 1,
            borderRadius: 'inherit'
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, height: '100%', transform: 'translateZ(20px)' }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
