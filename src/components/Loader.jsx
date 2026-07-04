'use client';

import { useState, useEffect, useRef } from 'react';

const languages = [
  { lang: 'Hindi', text: 'रामान दक्ष' },
  { lang: 'Japanese', text: 'ラマン・ダクシュ' },
  { lang: 'Korean', text: '라만 닥슈' },
  { lang: 'Russian', text: 'Раман Дакш' },
  { lang: 'English', text: 'Raman Daksh' },
];

export default function Loader({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isExiting, setIsExiting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [isFinal, setIsFinal] = useState(false);
  const [finalScale, setFinalScale] = useState(false);
  const timers = useRef([]);
  const done = useRef(false);

  const clearAll = () => timers.current.forEach(clearTimeout);

  useEffect(() => {
    if (currentIndex >= languages.length || done.current) return;

    const target = languages[currentIndex].text;
    const isLast = currentIndex === languages.length - 1;

    if (charIndex < target.length) {
      const speed = isLast ? 50 : 35 + Math.random() * 25;
      const t = setTimeout(() => {
        setDisplayedText(target.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
      timers.current.push(t);
      return () => clearTimeout(t);
    }

    if (isLast) {
      done.current = true;
      const t1 = setTimeout(() => setIsFinal(true), 200);
      const t2 = setTimeout(() => setFinalScale(true), 500);
      const t3 = setTimeout(() => setIsExiting(true), 1500);
      const t4 = setTimeout(() => onComplete?.(), 2200);
      timers.current.push(t1, t2, t3, t4);
      return () => { clearAll(); };
    }

    const holdTime = 200 + Math.random() * 80;
    const t = setTimeout(() => {
      setDisplayedText('');
      setCharIndex(0);
      setCurrentIndex(currentIndex + 1);
    }, holdTime);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [currentIndex, charIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const progress = ((currentIndex + charIndex / (languages[currentIndex]?.text.length || 1)) / languages.length) * 100;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99998,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: isFinal ? 'clamp(2rem, 6vw, 4rem)' : 'clamp(1.8rem, 5vw, 3.5rem)',
        fontWeight: isFinal ? 700 : 500,
        color: 'var(--fg)',
        letterSpacing: isFinal ? '0.02em' : '0.04em',
        minHeight: '1.3em',
        textAlign: 'center',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: finalScale ? 'scale(1.15)' : 'scale(1)',
      }}>
        {displayedText}
        {!isFinal && (
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '0.9em',
            background: 'var(--accent)',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
            animation: 'blink 0.7s steps(1) infinite',
          }} />
        )}
      </div>

      {!isFinal && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--fg-dim)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          height: '1em',
        }}>
          {languages[currentIndex]?.lang}
        </div>
      )}

      {isFinal && (
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--fg-dim)',
          letterSpacing: '0.15em',
          opacity: finalScale ? 1 : 0,
          transform: finalScale ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
        }}>
          Software Engineer
        </div>
      )}

      <div style={{
        position: 'absolute',
        bottom: '3rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <div style={{
          width: '120px',
          height: '2px',
          background: 'var(--border)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--accent)',
            borderRadius: '1px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
