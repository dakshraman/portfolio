'use client';

import { useEffect, useRef } from 'react';
import { skills } from '@/data/portfolio';
import { Icon } from '@iconify/react';

const skillIcons = {
  'Laravel': 'carbon:logo-laravel',
  'Flutter': 'logos:flutter',
  'React.js': 'logos:react',
  'Python': 'logos:python',
  'Dart': 'logos:dart',
  'PHP': 'logos:php',
  'Firebase': 'logos:firebase',
  'Java': 'logos:java',
  'C++': 'logos:c-plus-plus',
  'SQL': 'cib:mysql',
  'Linux': 'logos:linux-tux',
  'Cyber Security': 'mdi:shield-lock',
  'Shopify': 'logos:shopify',
  'WordPress': 'logos:wordpress',
  'System Architecture': 'mdi:sitemap',
  'API Design': 'mdi:api',
};

const skillColors = {
  'Laravel': '#FF2D20',
  'Flutter': '#02569B',
  'React.js': '#61DAFB',
  'Python': '#3776AB',
  'Dart': '#0175C2',
  'PHP': '#777BB4',
  'Firebase': '#FFCA28',
  'Java': '#ED8B00',
  'C++': '#00599C',
  'SQL': '#336791',
  'Linux': '#FCC624',
  'Cyber Security': '#EE1111',
  'Shopify': '#96BF48',
  'WordPress': '#21759B',
  'System Architecture': '#FF6B6B',
  'API Design': '#4ECDC4',
};

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const duplicated = [...skills, ...skills];

  return (
    <div
      ref={sectionRef}
      className="skills-section"
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '2rem 0',
        background: 'var(--bg-elevated)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px',
          background: 'linear-gradient(to right, var(--bg-elevated), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px',
          background: 'linear-gradient(to left, var(--bg-elevated), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }}
      />

      <h2 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>Skills & Technologies</h2>
      <div>
        <ul className="marquee-track" style={{ animationDuration: '60s', listStyle: 'none', margin: 0, padding: 0 }}>
          {duplicated.map((skill, i) => {
            const icon = skillIcons[skill] || 'mdi:code-tags';
            const color = skillColors[skill] || 'var(--accent)';
            return (
              <li
                key={i}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0 1.5rem', whiteSpace: 'nowrap',
                }}
              >
                <Icon icon={icon} width={18} height={18} style={{ color, flexShrink: 0 }} />
                <span
                  style={{
                    fontSize: '0.8rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: 'var(--fg)',
                    fontFamily: 'var(--font-heading)',
                  }}
                >
                  {skill}
                </span>
                <span
                  style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    background: 'var(--fg-dim)', flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .marquee-track {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .skills-section > * {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skills-section.visible > * {
          opacity: 1;
          transform: translateX(0);
        }
        .skills-section > *:nth-child(1) { transition-delay: 0s; }
        .skills-section > *:nth-child(2) { transition-delay: 0.05s; }
        .skills-section > *:nth-child(3) { transition-delay: 0.1s; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
