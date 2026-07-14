import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { services } from '@/data/portfolio';
import ServiceIcon from './ServiceIcon';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `Hire Freelance ${service.title} Developer in India`,
    description: service.seoDescription || `Hire Raman Daksh for freelance ${service.title.toLowerCase()}. ${service.description} Based in Dehradun, India.`,
    keywords: [`Freelance ${service.title}`, `Hire ${service.title} Developer`, 'Freelance Laravel Developer', 'Freelancer India', `${service.title} Services`, 'Raman Daksh', 'Dehradun Developer'],
    openGraph: {
      title: `Hire Freelance ${service.title} Developer in India | Raman Daksh`,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakshraman.in' },
      { '@type': 'ListItem', position: 2, name: service.title, item: `https://dakshraman.in/services/${service.slug}` },
    ],
  };

  const sectionColor = '#14B8A6';

  return (
    <main style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '8rem 1.5rem 4rem',
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <Link
        href="/#services"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontFamily: 'var(--font-heading)', fontSize: '0.7rem',
          fontWeight: 600, color: 'var(--fg-dim)', textDecoration: 'none',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          marginBottom: '2rem', transition: 'color 0.2s',
        }}
      >
        <Icon icon="mdi:arrow-left" width={16} height={16} />
        All Services
      </Link>

      <div style={{
        width: '56px', height: '56px', borderRadius: '14px',
        background: `${sectionColor}15`, border: `1px solid ${sectionColor}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: sectionColor, marginBottom: '1.5rem',
      }}>
        <ServiceIcon icon={service.icon} />
      </div>

      <h1 style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700,
        fontFamily: 'var(--font-heading)', lineHeight: 1.15, letterSpacing: '-0.02em',
        marginBottom: '1rem',
      }}>
        Freelance {service.title} Services
      </h1>

      <p style={{
        fontSize: '1.05rem', color: 'var(--fg-muted)', lineHeight: 1.8,
        marginBottom: '2.5rem', maxWidth: '680px',
      }}>
        {service.description}
      </p>

      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem', fontFamily: 'var(--font-heading)' }}>
          What I Offer
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {service.features.map((feature, j) => (
            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--fg-muted)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 8L6.5 11L12.5 4.5" stroke={sectionColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '3rem',
      }}>
        <Link
          href={`mailto:ramandaksh6161@gmail.com?subject=Freelance ${service.title} Inquiry`}
          className="btn-primary"
        >
          Hire Me for {service.title}
          <Icon icon="mdi:arrow-right" width={16} height={16} />
        </Link>
        <Link href="/#contact" className="btn-ghost">
          Ask a Question
        </Link>
      </div>

      <div style={{
        marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
          Why Hire Me?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { title: '4+ Years Experience', desc: 'Building production-grade applications for startups and enterprises.' },
            { title: 'India-Based', desc: 'Based in Dehradun, offering competitive rates and flexible timezone coverage.' },
            { title: 'Full Project Lifecycle', desc: 'From requirements to deployment and maintenance — I handle everything.' },
            { title: 'Clean Architecture', desc: 'Code that scales. Well-documented, tested, and maintainable solutions.' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
