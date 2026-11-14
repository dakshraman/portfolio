import Link from 'next/link';
import { ArrowUpRight, Check, ShieldCheck, Mail, Clock, Star, Terminal, Zap, Layers, Rocket } from 'lucide-react';
import { siteConfig, services, skills, testimonials } from '@/data/portfolio';

export const metadata = {
  title: 'Hire Senior Freelance Laravel & Flutter Developer | Raman Daksh',
  description:
    'Looking to hire a freelance Laravel or Flutter developer? Raman Daksh provides end-to-end full-stack engineering, high-scale REST APIs, and native iOS & Android mobile apps. Direct founder collaboration with guaranteed 30-day post-launch warranty.',
  keywords: [
    'Hire Freelance Developer',
    'Hire Laravel Developer India',
    'Freelance Flutter Developer',
    'Senior Full Stack Engineer',
    'Hire Remote Developer',
    'Fractional CTO Laravel',
    'Dehradun Developer',
    'MVP Developer for Startups',
  ],
  alternates: {
    canonical: 'https://dakshraman.in/freelance',
  },
  openGraph: {
    title: 'Hire Senior Freelance Laravel & Flutter Developer | Raman Daksh',
    description:
      'Direct engineering partnerships with founders. High-performance Laravel backends, REST APIs, and Flutter mobile apps. 20+ products shipped.',
    url: 'https://dakshraman.in/freelance',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Hire Raman Daksh' }],
  },
};

const freelanceFaqs = [
  {
    q: 'How fast can you start on our project?',
    a: 'Depending on current sprint allocations, I can typically kick off discovery within 48 to 72 hours of signed agreement. Critical audits can start almost immediately.',
  },
  {
    q: 'Do you work with clients in US, UK, and European timezones?',
    a: 'Yes. Over 80% of my client base is international. I offer 3 to 4 hours of live synchronous daily overlap with EST/PST/GMT hours, paired with clear async Loom screen recordings and daily Slack/Discord standup reports.',
  },
  {
    q: 'What are your standard engagement models?',
    a: 'I offer two transparent models: Fixed-Price Product Sprints (best for MVPs and scoped milestones with 30-day bug warranty) and Fractional Retainers ($45–$65/hour, 10–30 hours/week embedded into your engineering team).',
  },
  {
    q: 'What happens after the product is launched?',
    a: 'Every fixed milestone project includes a complimentary 30-day post-launch warranty covering defect fixes, critical performance tuning, and deployment adjustments.',
  },
];

export default function FreelancePage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dakshraman.in' },
      { '@type': 'ListItem', position: 2, name: 'Hire Freelance Developer', item: 'https://dakshraman.in/freelance' },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: freelanceFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--muted-fg)] hover:text-[var(--accent)] transition-colors"
          >
            <span>← Back to Home</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-xs font-mono text-[var(--muted-fg)] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[var(--fg-page)] font-semibold">Senior Freelance Engineering</span>
            <span>•</span>
            <span className="text-amber-500 font-medium">★ 5.0 Rated</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.1] mb-6">
            Hire a senior Laravel &amp; Flutter developer for your next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#47a3ff] to-[#70baff] dark:from-[var(--accent)] dark:via-[#60a5fa] dark:to-[#93c5fd]">
              critical product milestone.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed max-w-3xl mb-8">
            I help startups, venture studios, and scaling product companies build battle-tested Laravel backends, ultra-responsive REST APIs, and native iOS &amp; Android Flutter apps. Direct founder-to-engineer collaboration with zero agency bureaucracy.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              href="/#contact"
              className="btn-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Discuss Project Scope</span>
            </Link>

            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <span>Instant Telegram Chat</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center gap-1 text-xs text-[var(--muted-fg)] font-mono ml-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>30-Day Bug Warranty Included</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <div className="bento-card p-5">
            <div className="text-3xl font-extrabold font-mono text-[var(--fg-page)]">4+ Years</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Hands-On Engineering</div>
            <div className="text-[11px] text-[var(--accent)] font-mono mt-0.5">Laravel, Flutter, APIs</div>
          </div>
          <div className="bento-card p-5">
            <div className="text-3xl font-extrabold font-mono text-[var(--accent)]">20+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Production Launches</div>
            <div className="text-[11px] text-[var(--muted-fg)] font-mono mt-0.5">Startups &amp; Businesses</div>
          </div>
          <div className="bento-card p-5">
            <div className="text-3xl font-extrabold font-mono text-emerald-500">30 Days</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Post-Launch Warranty</div>
            <div className="text-[11px] text-emerald-500 font-mono mt-0.5">Zero-cost defect fixes</div>
          </div>
          <div className="bento-card p-5">
            <div className="text-3xl font-extrabold font-mono text-[var(--fg-page)]">100%</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Code &amp; IP Ownership</div>
            <div className="text-[11px] text-[var(--muted-fg)] font-mono mt-0.5">Direct repository access</div>
          </div>
        </div>

        {/* Services & Capabilities */}
        <div className="mb-20">
          <div className="section-label mb-2">Technical Offerings</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-8">
            How I Can Partner With Your Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="bento-card p-6 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  <h3 className="text-lg font-bold text-[var(--fg-page)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--subtle-border)] flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Specifications</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Models (Fixed Sprints vs Fractional Retainer) */}
        <div className="mb-20">
          <div className="section-label mb-2">Pricing &amp; Collaboration</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-8">
            Transparent Engagement Structures
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bento-card p-8 border-2 border-[var(--accent)]">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-mono font-bold uppercase tracking-wider mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>Fixed-Price Product Sprints</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--fg-page)] mb-2">Full-Cycle MVP Builds</h3>
              <p className="text-sm text-[var(--muted-fg)] mb-6 leading-relaxed">
                Ideal for launching new products from scratch. Complete ownership of backend, database, mobile apps, and cloud deployment with fixed milestones.
              </p>
              <div className="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-[var(--subtle-border)] mb-6">
                <div className="text-2xl font-mono font-bold text-[var(--fg-page)]">$3,500 – $7,500</div>
                <div className="text-xs text-[var(--muted-fg)] mt-1">3–5 weeks delivery · 30-day bug warranty</div>
              </div>
              <Link href="/#contact" className="w-full btn-primary justify-center">
                Inquire About Sprint Slots
              </Link>
            </div>

            <div className="bento-card p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--muted-bg)] text-[var(--muted-fg)] text-xs font-mono font-bold uppercase tracking-wider mb-4 border border-[var(--subtle-border)]">
                <Clock className="w-3.5 h-3.5" />
                <span>Fractional Staff Engineer</span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--fg-page)] mb-2">Embedded Developer Retainer</h3>
              <p className="text-sm text-[var(--muted-fg)] mb-6 leading-relaxed">
                Add senior technical capacity to your team. Work on roadmap features, refactoring critical bottlenecks, and reviewing PRs with daily async updates.
              </p>
              <div className="p-4 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] mb-6">
                <div className="text-2xl font-mono font-bold text-[var(--fg-page)]">$45 – $65 / hour</div>
                <div className="text-xs text-[var(--muted-fg)] mt-1">10–30 hrs/week · Weekly billing · Cancel anytime</div>
              </div>
              <Link href="/#contact" className="w-full btn-ghost justify-center">
                Check Retainer Availability
              </Link>
            </div>
          </div>
        </div>

        {/* Client Endorsements */}
        <div className="mb-20">
          <div className="section-label mb-2">Verified Feedback</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-8">
            What Founders Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bento-card p-7 flex flex-col justify-between">
                <p className="text-sm sm:text-base text-[var(--fg-page)] italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--subtle-border)]">
                  <div className="w-9 h-9 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-bold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--fg-page)]">{t.name}</div>
                    <div className="text-xs text-[var(--muted-fg)] font-mono">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO FAQ Accordion with Schema */}
        <div className="mb-20">
          <div className="section-label mb-2">Direct Answers</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)] mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {freelanceFaqs.map((faq, i) => (
              <div key={i} className="bento-card p-6">
                <h3 className="text-base font-bold text-[var(--fg-page)] mb-2">
                  {faq.q}
                </h3>
                <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* High-Converting Bottom Inbound Banner */}
        <div className="bento-card p-8 sm:p-12 text-center border-2 border-[var(--accent)] shadow-2xl relative overflow-hidden">
          <div className="editorial-glow top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px]" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg-page)]">
              Ready to ship your application?
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
              Submit your project scope or book a 15-minute technical discovery call. Transparent quote within 24 hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/#contact" className="btn-primary w-full sm:w-auto">
                <Mail className="w-4 h-4" />
                <span>Start Project Inquiry</span>
              </Link>
              <a
                href={siteConfig.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full sm:w-auto"
              >
                <span>Chat via Telegram ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
