'use client';

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#000', // Ensure dark background behind video
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
          transition: 'opacity 0.5s ease',
        }}
      >
        <source src="/bg-animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
