import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function NotFound() {
  return (
    <main style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: '2rem',
    }}>
      <Icon icon="mdi:alert-circle-outline" width={80} height={80} style={{ color: 'var(--accent)', marginBottom: '1.5rem', opacity: 0.6 }} />
      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: 'var(--fg)', lineHeight: 1, marginBottom: '0.5rem' }}>
        404
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--fg-muted)', marginBottom: '2rem', maxWidth: '400px' }}>
        This page doesn&apos;t exist. It might have been moved or the link is broken.
      </p>
      <Link href="/" style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 500,
        background: 'var(--accent)', color: 'var(--bg)',
        border: 'none', borderRadius: 'var(--radius-full)',
        padding: '14px 32px', textDecoration: 'none',
      }}>
        <Icon icon="mdi:home-outline" width={18} height={18} />
        Back to Home
      </Link>
    </main>
  );
}
