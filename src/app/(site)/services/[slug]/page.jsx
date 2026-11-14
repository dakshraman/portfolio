import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Check, ShieldCheck, Mail, ArrowLeft, Star, Clock, Layers } from 'lucide-react';
import { services, siteConfig } from '@/data/portfolio';
import ServiceIcon from './ServiceIcon';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `Hire Freelance ${service.title} Developer | Raman Daksh`,
    description:
      service.seoDescription ||
      `Hire Raman Daksh for freelance ${service.title.toLowerCase()}. ${service.description} Fast turnaround, scalable architecture, and guaranteed 30-day bug warranty.`,
    keywords: [
      `Freelance ${service.title}`,
      `Hire ${service.title} Developer`,
      'Freelance Laravel Developer',
      'Hire Flutter Engineer',
      `${service.title} Specialist`,
      'Raman Daksh',
      'Dehradun Remote Developer',
    ],
    alternates: {
      canonical: `https://dakshraman.in/services/${service.slug}`,
    },
    openGraph: {
      title: `Hire Freelance ${service.title} Developer | Raman Daksh`,
      description: service.seoDescription || service.description,
      url: `https://dakshraman.in/services/${service.slug}`,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: `${service.title} Services` }],
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
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://dakshraman.in/#services' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://dakshraman.in/services/${service.slug}` },
    ],
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.title} Engineering Services`,
    provider: {
      '@type': 'Person',
      name: 'Raman Daksh',
      url: 'https://dakshraman.in',
      email: siteConfig.email,
    },
    description: service.description,
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.features.map((f) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: f,
        },
      })),
    },
  };

  // Gmail compose link prefilled for this service
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email
  )}&su=${encodeURIComponent(`Inquiry regarding ${service.title}`)}&body=${encodeURIComponent(
    `Hi Raman,\n\nI am interested in your ${service.title} services. Here is an overview of what we are building:\n\n- Project Stage: [Idea / MVP / Scaling]\n- Budget Range: [$3,000 – $6,000+]\n- Target Launch: [e.g. 1 Month]\n\nBest,\n`
  )}`;

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="mb-14">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20 shadow-xs mb-6">
            <ServiceIcon icon={service.icon} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-xs font-mono text-[var(--muted-fg)] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[var(--fg-page)] font-semibold">Specialized Capability</span>
            <span>•</span>
            <span className="text-amber-500 font-medium">★ 5.0 Rating</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.15] mb-5">
            Freelance {service.title} Development
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed max-w-2xl font-normal mb-8">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={gmailComposeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire for {service.title}</span>
            </a>

            <Link href="/#contact" className="btn-ghost">
              <span>View Engagement Rates</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Deliverables Bento Card */}
        <div className="bento-card p-6 sm:p-9 mb-14">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--subtle-border)]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
                Standard Inclusions
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--fg-page)]">
                Core Deliverables in this Engagement
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-500 font-mono font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>30-Day Bug Warranty Included</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.features.map((feature, j) => (
              <div
                key={j}
                className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)] flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--fg-page)] leading-snug">
                    {feature}
                  </div>
                  <div className="text-xs text-[var(--muted-fg)] mt-1">
                    Delivered with production-grade documentation, tests, and clean architecture standards.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Proposition & Guarantees Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bento-card p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">
              01. Direct Execution
            </div>
            <h3 className="text-base font-bold text-[var(--fg-page)] mb-2">
              No Agency Overhead
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
              Work 1-on-1 with a senior engineer who writes and deploys the code. Faster iterations and complete transparency.
            </p>
          </div>

          <div className="bento-card p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-semibold mb-2">
              02. Speed &amp; Precision
            </div>
            <h3 className="text-base font-bold text-[var(--fg-page)] mb-2">
              3–5 Week MVP Sprints
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
              Milestone-driven sprint velocity with weekly testable builds on staging environments and async video Loom updates.
            </p>
          </div>

          <div className="bento-card p-6">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-500 font-semibold mb-2">
              03. Total Peace of Mind
            </div>
            <h3 className="text-base font-bold text-[var(--fg-page)] mb-2">
              30-Day Defect Warranty
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
              Every fixed project includes 30 days of post-launch defect warranty at zero extra cost to ensure smooth production uptime.
            </p>
          </div>
        </div>

        {/* Conversion Banner */}
        <div className="bento-card p-8 sm:p-10 text-center border-2 border-[var(--accent)] shadow-xl relative overflow-hidden">
          <div className="editorial-glow top-0 left-1/2 -translate-x-1/2 w-[450px] h-[200px]" />
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)]">
              Need {service.title} expertise on your roadmap?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
              Send your wireframes, PRDs, or project requirements. I review feasibility and provide a clear milestone quote within 24 hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/#contact" className="btn-primary w-full sm:w-auto">
                <Mail className="w-4 h-4" />
                <span>Submit Scope Form</span>
              </Link>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto"
              >
                <span>Instant Telegram Chat ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
