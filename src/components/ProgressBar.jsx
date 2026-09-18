'use client';

import { motion, useScroll } from 'framer-motion';

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--accent), var(--accent-glow))',
        transformOrigin: '0%',
        zIndex: 100,
      }}
    />
  );
}
