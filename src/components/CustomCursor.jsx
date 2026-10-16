'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const getFalse = () => false;
const getTrue = () => true;
const subscribeMounted = () => () => {};

const TOUCH_QUERY = '(hover: none) and (pointer: coarse)';
const subscribeTouch = (onChange) => {
  const mql = window.matchMedia(TOUCH_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};
const getTouch = () => window.matchMedia(TOUCH_QUERY).matches;

export default function CustomCursor() {
  // False during SSR and the hydration render, true afterwards — avoids
  // setState-in-effect while keeping hydration deterministic.
  const isMounted = useSyncExternalStore(subscribeMounted, getTrue, getFalse);
  const isMobile = useSyncExternalStore(subscribeTouch, getTouch, getFalse);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for smooth spring physics
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check if hovering over a clickable element
      const target = e.target;
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea, .interactive');
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Fallback if cursor leaves window
    const handleMouseLeave = () => setIsHovering(false);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [cursorX, cursorY, isMobile]);

  if (!isMounted || isMobile) return null;

  return (
    <>
      <style>{`
        /* Hide default cursor on desktop */
        @media (hover: hover) and (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Outer trailing ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          borderRadius: '50%',
          border: '1px solid rgba(254, 127, 45, 0.4)',
          backgroundColor: isHovering ? 'rgba(254, 127, 45, 0.1)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.5,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner tiny dot (no spring, instant follow) */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#FE7F2D',
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Inner dot disappears on hover, leaving only the expanded outer ring
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
