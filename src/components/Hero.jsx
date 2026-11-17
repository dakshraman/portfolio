'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, Mail, Server, Smartphone, Layers, Globe } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';
import { useLocale } from '@/context/LocaleContext';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('backend');
  const { country, setIsModalOpen, localTimeStr } = useLocale();

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-grid-pattern">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Worldwide Client Localization Trust Badge */}
        <div className="flex justify-center md:justify-start mb-6">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xs text-xs font-mono text-[var(--muted-fg)] cursor-pointer hover:border-[var(--accent)] transition-all group/loc max-w-full"
            title="Click to switch your country and currency across all 249 countries"
          >
            <span className="text-base leading-none shrink-0">{country.flag}</span>
            <span className="text-[var(--fg-page)] font-semibold truncate max-w-[120px] sm:max-w-none">{country.name}</span>
            {localTimeStr && (
              <span className="hidden sm:inline text-[var(--muted-fg)]">
                ({localTimeStr})
              </span>
            )}
            <span className="text-[var(--muted-fg)]">•</span>
            <span className="text-emerald-500 font-medium hidden sm:inline">{country.overlap}</span>
            <span className="text-emerald-500 font-medium sm:hidden">Available Worldwide</span>
            <span className="text-[var(--accent)] text-[10px] group-hover/loc:translate-x-0.5 transition-transform shrink-0 ml-0.5">
              Change ▾
            </span>
          </button>
        </div>

        {/* Headline & Focused Value Proposition */}
        <div className="max-w-4xl text-center md:text-left mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.1] mb-5">
            I build scalable backends &amp;{' '}
            <span className="text-[var(--accent)]">
              cross-platform mobile apps.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed max-w-3xl font-normal mb-8">
            Hi, I&apos;m Raman Daksh — a senior freelance Laravel and Flutter engineer. I help funded startups and product teams architect high-throughput REST APIs, cloud backends, and pixel-perfect iOS &amp; Android applications.
          </p>

          {/* Action Buttons: Exactly 1 Primary + 1 Secondary */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4">
            <Link
              href="#contact"
              className="btn-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Discuss a Project</span>
            </Link>

            <Link
              href="#highlights"
              className="btn-ghost"
            >
              <span>Explore Flagships ↓</span>
            </Link>
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

        {/* Key Metrics: Standardized Typography & Calibrated Rhythm */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 pt-6 border-t border-[var(--subtle-border)]">
          <div className="bento-card p-3 sm:p-5">
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[var(--fg-page)] font-mono tabular-nums">4+ Years</div>
            <div className="text-[11px] sm:text-xs text-[var(--muted-fg)] mt-1 font-medium truncate">Production Experience</div>
            <div className="text-[10px] sm:text-[11px] text-[var(--muted-fg)] mt-0.5 truncate">Laravel, Flutter &amp; Cloud</div>
          </div>

          <div className="bento-card p-3 sm:p-5">
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[var(--accent)] font-mono tabular-nums">20+ Builds</div>
            <div className="text-[11px] sm:text-xs text-[var(--muted-fg)] mt-1 font-medium truncate">Products Shipped</div>
            <div className="text-[10px] sm:text-[11px] text-[var(--muted-fg)] mt-0.5 truncate">Startups &amp; Enterprise</div>
          </div>

          <div className="bento-card p-3 sm:p-5">
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-[var(--fg-page)] font-mono tabular-nums">100%</div>
            <div className="text-[11px] sm:text-xs text-[var(--muted-fg)] mt-1 font-medium truncate">Full-Stack Delivery</div>
            <div className="text-[10px] sm:text-[11px] text-[var(--muted-fg)] mt-0.5 truncate">Database, APIs &amp; Stores</div>
          </div>

          <div className="bento-card p-3 sm:p-5">
            <div className="text-xl sm:text-3xl font-bold tracking-tight text-emerald-500 font-mono tabular-nums">&lt; 24h</div>
            <div className="text-[11px] sm:text-xs text-[var(--muted-fg)] mt-1 font-medium truncate">Direct SLA</div>
            <div className="text-[10px] sm:text-[11px] text-emerald-500 font-mono mt-0.5 truncate">Founder to founder</div>
          </div>
        </div>
      </div>
    </section>
  );
}
