'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PerspectiveScroll({ children, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.1 1"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], ["35deg", "0deg"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["100px", "0px"]);

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: '2000px',
        opacity,
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          transformOrigin: 'top center',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
