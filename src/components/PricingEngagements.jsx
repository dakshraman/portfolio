'use client';

import { Check, ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Architecture & Code Audit',
    tagline: 'Diagnose bottlenecks & eliminate technical debt.',
    badge: 'Fast Turnaround',
    highlight: false,
    price: '$950',
    timeline: '3 Business Days',
    idealFor: 'Teams experiencing slow APIs, scalability limits, or preparing for high traffic / fundraising.',
    features: [
      'Database query profiling & N+1 query detection',
      'API bottleneck & latency benchmarking',
      'Security posture & OWASP compliance check',
      'Actionable PDF report + video walkthrough call',
      'Prioritized pull-request fixes for top 3 issues',
    ],
    cta: 'Book Code Audit',
    href: '#contact',
  },
  {
    name: 'Full-Cycle MVP Sprint',
    tagline: 'From blank repo to production-ready app.',
    badge: 'Most Popular',
    highlight: true,
    price: 'Custom Quote',
    priceSub: 'Typically $3.5k – $8k',
    timeline: '3–5 Weeks',
    idealFor: 'Founders and startups needing a battle-tested web or mobile app launched on schedule.',
    features: [
      'Laravel scalable backend + database architecture',
      'Cross-platform Flutter mobile app (iOS & Android)',
      'Auth, payment processing (Stripe / Razorpay) & emails',
      'Admin management dashboard & reporting',
      'Cloud CI/CD pipeline & App Store / Play Store submission',
      '30-Day complimentary post-launch bug warranty',
    ],
    cta: 'Discuss Your MVP',
    href: '#contact',
  },
  {
    name: 'Fractional Staff Engineer',
    tagline: 'Embedded senior capacity for growing teams.',
    badge: 'Retainer / Hourly',
    highlight: false,
    price: '$45–$65',
    priceSub: 'per hour or weekly sprint block',
    timeline: 'Flexible (10–30 hrs/wk)',
    idealFor: 'Tech companies needing senior leadership for complex Laravel & Flutter engineering.',
    features: [
      'Guaranteed 4-hour live overlap with US / EU timezones',
      'Feature delivery, schema migrations & refactoring',
      'Code reviews, PR merges & developer mentoring',
      'Direct Slack/Discord integration & daily standups',
      'Zero agency bloat — pay only for high-leverage hours',
    ],
    cta: 'Inquire Availability',
    href: '#contact',
  },
];

export default function PricingEngagements() {
  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-2">
            Transparent Engagements
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-4">
            Clear models designed for momentum.
          </h2>
          <p className="text-sm text-[var(--muted-fg)] leading-relaxed">
            No hidden costs, no surprise billing. Transparent milestones, direct engineer communication, and guaranteed delivery timelines.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bento-card p-7 sm:p-8 flex flex-col justify-between relative transition-all ${
                tier.highlight
                  ? 'border-orange-500 shadow-xl shadow-orange-500/10 scale-[1.02] ring-1 ring-orange-500/30'
                  : 'hover:-translate-y-1'
              }`}
            >
              {/* Highlight ribbon */}
              {tier.badge && (
                <div className="absolute top-5 right-5">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold ${
                      tier.highlight
                        ? 'bg-orange-500 text-white'
                        : 'bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[var(--fg-page)] mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-[var(--muted-fg)] mb-6">
                  {tier.tagline}
                </p>

                {/* Price block */}
                <div className="mb-6 p-4 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--fg-page)] tracking-tight">
                    {tier.price}
                  </div>
                  {tier.priceSub && (
                    <div className="text-[11px] text-[var(--muted-fg)] font-mono mt-0.5">
                      {tier.priceSub}
                    </div>
                  )}
                  <div className="text-xs font-semibold text-orange-500 mt-2 flex items-center gap-1.5 font-mono">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Timeline: {tier.timeline}</span>
                  </div>
                </div>

                <div className="text-xs text-[var(--muted-fg)] mb-6 leading-relaxed italic">
                  <strong>Ideal for:</strong> {tier.idealFor}
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--fg-page)] font-bold">
                    What&apos;s Included:
                  </div>
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs text-[var(--fg-page)]">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href={tier.href}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95 ${
                    tier.highlight
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
                      : 'border border-[var(--card-border)] bg-[var(--muted-bg)] hover:bg-[var(--card-bg)] text-[var(--fg-page)]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--subtle-border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-page)]">30-Day Bug Warranty</div>
              <div className="text-[11px] text-[var(--muted-fg)]">Zero-cost post-launch defect fixes.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-page)]">4h US/EU Live Overlap</div>
              <div className="text-[11px] text-[var(--muted-fg)]">Fast async communication + live standups.</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--fg-page)]">IP & Code Ownership</div>
              <div className="text-[11px] text-[var(--muted-fg)]">100% full intellectual property transfer.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
