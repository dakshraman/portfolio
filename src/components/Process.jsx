'use client';

import { Compass, Code2, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Discovery & System Blueprint',
    duration: '48–72 Hours',
    description:
      'We dissect your product requirements, user flows, and edge cases. I deliver a comprehensive architecture blueprint: database schema, API contracts, third-party integrations, and milestone timelines.',
    deliverables: ['Schema & Data Architecture', 'API Specs & Endpoints', 'Fixed Sprint Roadmap'],
    icon: Compass,
  },
  {
    number: '02',
    title: 'Rapid Sprint Execution',
    duration: 'Weeks 1–3',
    description:
      'Milestone-driven engineering with complete visibility. You receive access to a staging environment with weekly testable builds, async Loom screen recordings, and real-time Slack/Telegram progress.',
    deliverables: ['Clean, Documented Code', 'Weekly Staging Deployments', 'Daily Async Standups'],
    icon: Code2,
  },
  {
    number: '03',
    title: 'Hardening & QA Stress Testing',
    duration: 'Week 4',
    description:
      'Rigorous verification before production: database query profiling, API rate-limiting checks, security audit (OWASP compliance), and cross-device testing on iOS & Android devices.',
    deliverables: ['Zero Critical Vulnerabilities', 'Stress-Tested API Pipelines', 'Automated Test Coverage'],
    icon: ShieldCheck,
  },
  {
    number: '04',
    title: 'Zero-Downtime Launch & Warranty',
    duration: 'Launch Day & Beyond',
    description:
      'Seamless production deployment on your cloud infra (AWS / DigitalOcean / Docker) and App Store / Google Play submission. Every fixed project includes 30 days of complimentary post-launch support.',
    deliverables: ['Live Production Deployment', 'Store Review Approval', '30-Day Bug Warranty'],
    icon: Rocket,
  },
];

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">
              Predictable Delivery
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--fg-page)]">
              From concept to production in 4 weeks.
            </h2>
          </div>
          <p className="text-sm text-[var(--muted-fg)] max-w-md">
            No endless meetings or opaque agency handoffs. A transparent, high-velocity engineering workflow designed for founders who value speed and reliability.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="bento-card p-6 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-bold font-mono text-[var(--accent)]">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-[var(--muted-bg)] flex items-center justify-center text-[var(--fg-page)] mb-4 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-[var(--fg-page)] mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--subtle-border)]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-fg)] mb-2 font-semibold">
                    Outputs
                  </div>
                  <ul className="space-y-1">
                    {step.deliverables.map((del) => (
                      <li key={del} className="text-xs text-[var(--fg-page)] flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-[var(--accent)]">
          <div>
            <h4 className="text-lg font-bold text-[var(--fg-page)]">
              Have an urgent timeline or fixed launch date?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] mt-1">
              I can audit your requirements and provide an exact milestone estimate within 24 hours.
            </p>
          </div>

          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-medium tracking-tight bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shrink-0 shadow-xs transition-all active:scale-95"
          >
            <span>Request Project Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
