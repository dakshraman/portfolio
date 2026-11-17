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
    <section id="process" className="py-20 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="section-label">
              Predictable Delivery
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight">
              From whiteboard to production in 4 weeks.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--muted-fg)] max-w-md leading-relaxed font-normal">
            No endless meetings or opaque agency handoffs. A transparent, high-velocity engineering workflow designed for founders who value speed and reliability.
          </p>
        </div>

        {/* Connected Horizontal Sprint Timeline (Desktop) & Vertical Journey (Mobile) */}
        <div className="relative">
          {/* Subtle connecting hairline across steps on desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-[var(--subtle-border)] via-[var(--accent)]/40 to-[var(--subtle-border)] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="flex flex-col justify-between group"
                >
                  <div>
                    {/* Step Node & Indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--fg-page)] flex items-center justify-center font-mono font-bold text-base shadow-sm group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-all">
                        {step.number}
                      </div>

                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[var(--muted-bg)] text-[var(--muted-fg)] border border-[var(--subtle-border)]">
                        {step.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                      <h3 className="text-lg font-bold text-[var(--fg-page)]">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed mb-6 font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--subtle-border)]">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted-fg)] mb-2.5 font-semibold">
                      Milestone Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((del) => (
                        <li key={del} className="text-xs text-[var(--fg-page)] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="truncate">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast-Track Banner */}
        <div className="mt-16 bento-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-l-[var(--accent)]">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-[var(--fg-page)]">
              Have an urgent launch date or sprint scope?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--muted-fg)] mt-1 font-normal">
              I can audit your requirements and provide an exact milestone estimate within 24 hours.
            </p>
          </div>

          <Link
            href="#contact"
            className="btn-primary"
          >
            <span>Request Sprint Roadmap</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
