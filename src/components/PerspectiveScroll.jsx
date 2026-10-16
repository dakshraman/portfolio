'use client';

import { useMemo, useRef, useSyncExternalStore } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const getServerSnapshot = () => false;

function useMediaQuery(query) {
  const subscribe = useMemo(
    () => (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, getServerSnapshot);
}

const COMPACT_QUERY = '(max-width: 767px), (pointer: coarse)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export default function PerspectiveScroll({ children, className = '' }) {
  const ref = useRef(null);
  const isCompact = useMediaQuery(COMPACT_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);

  // Reveal on entry instead of over the content height: progress runs from the
  // top edge crossing the viewport bottom to reaching 65% of the viewport
  // height. A height-based range stretched the animation over thousands of
  // pixels on tall single-column mobile layouts, leaving content tilted,
  // scaled down and nearly transparent the whole time it was being read.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0 0.65'],
  });

  const flatten = isCompact || prefersReducedMotion;
  const rotateX = useTransform(scrollYProgress, [0, 1], flatten ? ['0deg', '0deg'] : ['35deg', '0deg']);
  const scale = useTransform(scrollYProgress, [0, 1], flatten ? [1, 1] : [0.8, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0px', '0px'] : isCompact ? ['32px', '0px'] : ['100px', '0px']
  );
  const opacity = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [0, 1]);

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
          willChange: prefersReducedMotion ? 'auto' : 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
