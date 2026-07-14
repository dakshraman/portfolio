import Link from 'next/link';
import { Icon } from '@iconify/react';
import { siteConfig, services, skills, testimonials } from '@/data/portfolio';

export const metadata = {
  title: 'Hire Freelance Laravel & Flutter Developer in India | Raman Daksh',
  description: 'Hire Raman Daksh — a freelance software engineer from Dehradun, India. Expert in Laravel, Flutter, REST APIs, and full-stack development. 4+ years of experience. Available for remote and onsite projects.',
  keywords: ['Hire Freelance Developer', 'Freelance Laravel Developer India', 'Freelance Flutter Developer', 'Hire Remote Developer', 'Freelancer Dehradun', 'Raman Daksh', 'Freelance Software Engineer India'],
  openGraph: {
    title: 'Hire Freelance Laravel & Flutter Developer in India | Raman Daksh',
    description: 'Hire a freelance software engineer from India specializing in Laravel, Flutter, and full-stack architecture. 4+ years experience.',
  },
};

export default function FreelancePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakshraman.in' },
      { '@type': 'ListItem', position: 2, name: 'Hire Freelance Developer', item: 'https://dakshraman.in/freelance' },
    ],
  };

  return (
    <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 1.5rem 4rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section style={{ marginBottom: '5rem' }}>
        <p className="section-label" style={{ color: '#5E6AD2' }}>Hire a Freelance Developer</p>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700,
          fontFamily: 'var(--font-heading)', lineHeight: 1.1, letterSpacing: '-0.02em',
          marginBottom: '1.5rem', maxWidth: '800px',
        }}>
          Need a software engineer? <br />
          <span style={{ color: 'var(--accent)' }}>I&apos;m available for hire.</span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--fg-muted)', lineHeight: 1.8, maxWidth: '600px', marginBottom: '2rem' }}>
          I&apos;m Raman Daksh, a freelance software engineer based in Dehradun, India. I help startups and enterprises build scalable backend systems, cross-platform mobile apps, and robust APIs.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary">
            Hire Me Now
            <Icon icon="mdi:arrow-right" width={16} height={16} />
          </a>
          <Link href="/#projects" className="btn-ghost">View My Work</Link>
        </div>
      </section>

      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          Services I Offer
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '16px' }}>
          {services.map((service, i) => (
            <Link
              key={i}
              href={`/services/${service.slug}`}
              className="card"
              style={{ textDecoration: 'none', color: 'var(--fg)', padding: '1.5rem' }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          Technologies I Work With
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {skills.map((skill) => (
            <span key={skill} className="tag" style={{ fontSize: '0.7rem', padding: '4px 14px' }}>{skill}</span>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
          What Clients Say
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: '16px' }}>
          {testimonials.slice(0, 3).map((t, i) => (
            <figure key={i} className="card" style={{ margin: 0, padding: '1.5rem' }}>
              <blockquote style={{ margin: 0, fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--fg)' }}>
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <div className="card" style={{
          textAlign: 'center', padding: '3rem 2rem',
          border: '2px solid var(--accent-glow-strong)',
          boxShadow: '0 0 40px var(--accent-glow)',
        }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Ready to start your project?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--fg-muted)', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Let&apos;s discuss your project. Free discovery call — no obligation.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="btn-primary" style={{ fontSize: '0.9rem', padding: '16px 40px' }}>
            <Icon icon="mdi:email-outline" width={18} height={18} />
            ramandaksh6161@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
