'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, Mail, Server, Smartphone, Layers } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('backend');

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-20 pb-10 md:pt-24 md:pb-14 overflow-hidden bg-grid-pattern">
      {/* Background ambient Apple radial glow */}
      <div className="editorial-glow top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Headline & Human-Written Intro */}
        <div className="max-w-4xl text-center md:text-left mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.1] mb-5">
            I build scalable web backends &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[#47a3ff] to-[#70baff] dark:from-[var(--accent)] dark:via-[#60a5fa] dark:to-[#93c5fd]">
              cross-platform mobile apps.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed max-w-2xl font-normal mb-7">
            Hi, I&apos;m Raman Daksh — a senior freelance Laravel and Flutter engineer with over 4 years of experience. I help funded startups and forward-thinking businesses architect scalable REST APIs, reliable cloud backends, and pixel-perfect iOS &amp; Android apps.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="btn-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Get in Touch</span>
            </Link>

            <Link
              href="#projects"
              className="btn-ghost"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs border border-transparent hover:border-[var(--card-border)] bg-transparent hover:bg-[var(--muted-bg)] text-[var(--muted-fg)] hover:text-[var(--fg-page)] transition-all cursor-pointer"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">Email copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{siteConfig.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Apple-Style Development Window Preview */}
        <div className="my-10 bento-card p-0 shadow-xl overflow-hidden">
          {/* Window Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 sm:px-5 border-b border-[var(--subtle-border)] bg-black/[0.02] dark:bg-white/[0.03]">
            <div className="flex items-center justify-between sm:justify-start gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
              </div>
              <span className="ml-2 font-mono text-[11px] sm:text-xs text-[var(--muted-fg)] truncate max-w-[200px] sm:max-w-none">
                what-i-build.dakshraman.in
              </span>
            </div>

            {/* Segmented Control Tabs (Responsive on Mobile & Tablet) */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar flex items-center justify-between sm:justify-start gap-1 p-1 rounded-full bg-black/[0.05] dark:bg-white/[0.08] text-[11px] sm:text-xs font-medium border border-[var(--subtle-border)] shrink-0">
              <button
                onClick={() => setActiveConsoleTab('backend')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap flex-1 sm:flex-initial ${
                  activeConsoleTab === 'backend'
                    ? 'bg-[var(--card-bg)] text-[var(--fg-page)] shadow-xs border border-[var(--card-border)] font-semibold'
                    : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <Server className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[var(--accent)] shrink-0" />
                <span className="hidden sm:inline">Backend &amp; APIs</span>
                <span className="sm:hidden">Backend</span>
              </button>

              <button
                onClick={() => setActiveConsoleTab('mobile')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap flex-1 sm:flex-initial ${
                  activeConsoleTab === 'mobile'
                    ? 'bg-[var(--card-bg)] text-[var(--fg-page)] shadow-xs border border-[var(--card-border)] font-semibold'
                    : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 shrink-0" />
                <span className="hidden sm:inline">Flutter Apps</span>
                <span className="sm:hidden">Mobile</span>
              </button>

              <button
                onClick={() => setActiveConsoleTab('fullstack')}
                className={`px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap flex-1 sm:flex-initial ${
                  activeConsoleTab === 'fullstack'
                    ? 'bg-[var(--card-bg)] text-[var(--fg-page)] shadow-xs border border-[var(--card-border)] font-semibold'
                    : 'text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] border border-transparent'
                }`}
              >
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
                <span className="hidden sm:inline">Full-Stack Solutions</span>
                <span className="sm:hidden">Full Stack</span>
              </button>
            </div>
          </div>

          {/* Window Body: Real Capabilities */}
          <div className="p-6 sm:p-7">
            {activeConsoleTab === 'backend' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-[var(--accent)] font-semibold mb-1">
                    01. RESTful APIs
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    Structured Laravel APIs
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Clean controllers, form request validation, API resource transformers, and clear documentation for mobile &amp; web clients.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-[var(--accent)] font-semibold mb-1">
                    02. Database &amp; Speed
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    MySQL, Postgres &amp; Redis
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Proper schema design, indexing, eager-loaded relationships to prevent slow queries, and Redis caching for frequently accessed data.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-[var(--accent)] font-semibold mb-1">
                    03. Auth &amp; Payments
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    Integrations &amp; Security
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Secure JWT / Laravel Sanctum authentication, Stripe and Razorpay payment gateway integrations, and background queue workers.
                  </p>
                </div>
              </div>
            )}

            {activeConsoleTab === 'mobile' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-emerald-500 font-semibold mb-1">
                    01. Cross-Platform
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    iOS &amp; Android Apps
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    A single high-quality Flutter codebase that looks native on both iPhone and Android devices, saving you time and cost.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-emerald-500 font-semibold mb-1">
                    02. State Management
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    BLoC &amp; Provider
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Predictable application state, clean separation between UI and logic, and code that remains easy to test as your app expands.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-emerald-500 font-semibold mb-1">
                    03. Storage &amp; Sync
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    Offline Caching &amp; APIs
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Offline support with local SQLite / Hive caching, graceful error handling, and push notifications via Firebase.
                  </p>
                </div>
              </div>
            )}

            {activeConsoleTab === 'fullstack' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-blue-500 font-semibold mb-1">
                    01. End-to-End Delivery
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    From Concept to Launch
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    I take full ownership of the technical setup: database architecture, backend logic, mobile UI, and deployment.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-blue-500 font-semibold mb-1">
                    02. Admin Dashboards
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    Custom Portals &amp; CRMs
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Tailored dashboards for your team to manage users, view analytics, process orders, and handle daily operations easily.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-[var(--subtle-border)]">
                  <div className="text-xs font-mono text-blue-500 font-semibold mb-1">
                    03. Cloud Deployment
                  </div>
                  <div className="text-base font-bold text-[var(--fg-page)] mb-1.5">
                    Servers &amp; Stores
                  </div>
                  <p className="text-xs text-[var(--muted-fg)] leading-relaxed">
                    Setup on DigitalOcean, AWS, or Docker VPS with SSL, Nginx, automated backups, and app submissions to App Store &amp; Play Store.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Real Metrics & Human Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--subtle-border)]">
          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--fg-page)] tracking-tight">4+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Years Experience</div>
            <div className="text-[11px] text-[var(--accent)] font-mono mt-0.5">Laravel &amp; Flutter</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[var(--accent)] tracking-tight">20+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Projects Built</div>
            <div className="text-[11px] text-[var(--muted-fg)] font-mono mt-0.5">Startups &amp; Businesses</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-[var(--fg-page)] tracking-tight truncate">Full Stack</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">End-to-End Scope</div>
            <div className="text-[11px] text-[var(--muted-fg)] font-mono mt-0.5 truncate">Backend, APIs &amp; Apps</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono text-emerald-500 tracking-tight truncate">Direct</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Clear Communication</div>
            <div className="text-[11px] text-emerald-500 font-mono mt-0.5">Fast async replies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
