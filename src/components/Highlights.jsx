'use client';

import { 
  ArrowUpRight, 
  ExternalLink, 
  Check 
} from 'lucide-react';
import { GithubIcon } from './Icons';

function LiveBrowserFrame({ url, title }) {
  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl overflow-hidden flex flex-col group/browser">
      {/* Browser Chrome Header */}
      <div className="px-4 py-3 bg-[var(--muted-bg)] border-b border-[var(--subtle-border)] flex items-center justify-between gap-3">
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-[#e0443e]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-[#dea123]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-[#1aab29]" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--card-bg)] border border-[var(--subtle-border)] text-xs font-mono text-[var(--muted-fg)] truncate">
          <span className="text-emerald-500 font-bold text-[10px]">🔒</span>
          <span className="truncate text-[var(--fg-page)]">{url}</span>
        </div>

        {/* External Link Action */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 p-1.5 rounded-lg hover:bg-[var(--card-bg)] text-[var(--muted-fg)] hover:text-[var(--fg-page)] transition-colors"
          title={`Open ${title} in new tab`}
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Live Site Container */}
      <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] bg-[var(--card-bg)]">
        <iframe
          src={url}
          title={title}
          loading="lazy"
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}

export default function Highlights() {
  return (
    <section id="highlights" className="py-20 md:py-32 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <div className="section-label">
            Featured Flagships
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight mb-5">
            Engineered for scale, speed, and real-world impact.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed max-w-3xl font-normal">
            Deep architectural breakdowns of four production systems engineered end-to-end — spanning high-concurrency cloud control panels, hyper-local Flutter mobile apps, modular TypeScript tooling, and campus enterprise ERPs.
          </p>
        </div>

        {/* Flagship Showcases Stack */}
        <div className="space-y-16 md:space-y-28">

          {/* ========================================================
              FLAGSHIP 01: CloudDeck (Cloud & DevOps)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                    FLAGSHIP #01 &bull; CLOUD &amp; DEVOPS
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Production Release
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    CloudDeck — Open-Source Cloud Hosting Control Panel
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Traditional control panels consume over 1GB idle RAM before handling any traffic. CloudDeck was engineered with a Go daemon and Next.js frontend to idle under <strong className="text-[var(--fg-page)]">50MB RAM</strong> while managing multi-PHP (8.1–8.4), automated Let&apos;s Encrypt TLS, MariaDB, Postfix/Dovecot email, and PowerDNS.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>Multi-PHP 8.1–8.4 Sockets</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>1-Click Automated SSL/TLS</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>Polyglot: Go, Node, Python</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                    <span>PowerDNS + Postfix/Dovecot</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">&lt; 50 MB</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Idle Memory</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">Multi-PHP</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">8.1 through 8.4</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">100%</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Open Source</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://clouddeck.dakshraman.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Launch CloudDeck Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://github.com/dakshraman/clouddeck"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Repository</span>
                  </a>
                </div>
              </div>

              {/* Live Site Preview Column */}
              <div className="lg:col-span-6">
                <LiveBrowserFrame 
                  url="https://clouddeck.dakshraman.in" 
                  title="CloudDeck Control Panel"
                />
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 02: Borrow Nearby (Flutter & Laravel Mobile Platform)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Live Site Preview (Order 2 on mobile, Order 1 on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <LiveBrowserFrame 
                  url="https://borrownearby.in" 
                  title="Borrow Nearby Platform"
                />
              </div>

              {/* Content Column (Order 1 on mobile, Order 2 on lg) */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    FLAGSHIP #02 &bull; MOBILE APP &amp; REST API
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    Flutter iOS/Android + Laravel
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Borrow Nearby — Hyperlocal Peer-to-Peer Mobile Marketplace
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    A live location-based community sharing platform deployed to production on iOS and Android. Built from concept to app store release, allowing neighbors to discover, lend, and borrow items with sub-50ms spatial queries, WebSocket real-time chat, and escrow protections.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Cross-Platform Flutter Build</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>PostGIS Spatial Querying</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Encrypted In-App Chat</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>Offline-First SQLite Caching</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">&lt; 50 ms</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Spatial Latency</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">60 FPS</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Native UI Feel</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--accent)] font-mono">iOS &amp; Android</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">One Codebase</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://borrownearby.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Visit Live Platform</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 03: Devkit (Developer Tools & SDK)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Content Column */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                    FLAGSHIP #03 &bull; DEVELOPER TOOLKIT &amp; SDK
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    TypeScript &bull; Dual ESM/CJS
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Devkit — Zero-Dependency TypeScript Utility Toolkit
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Eliminating boilerplate across full-stack repositories. Devkit packages battle-tested, zero-external-dependency utilities for cryptographically secure tokens, strict payload validation, API contract generators, and standardized logging with 100% strict typing.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>0 External Dependencies</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Tree-Shakeable Bundles</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>Universal: Node, Bun, Workers</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    <span>100% Strict Type Safety</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-purple-500 font-mono">0 Deps</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Zero CVE Risks</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">1.4 KB</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Gzipped Core</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">4+ Hours</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Saved per Repo</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://devkit.dakshraman.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Explore Devkit Docs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Live Site Preview Column */}
              <div className="lg:col-span-6">
                <LiveBrowserFrame 
                  url="https://devkit.dakshraman.in" 
                  title="Devkit Documentation"
                />
              </div>
            </div>
          </div>


          {/* ========================================================
              FLAGSHIP 04: Advanced School ERP (Enterprise Platform)
              ======================================================== */}
          <div className="bento-card p-6 sm:p-8 lg:p-10 border border-[var(--card-border)] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Live Site Preview (Order 2 on mobile, Order 1 on lg) */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <LiveBrowserFrame 
                  url="https://erp-web-lctn.onrender.com/" 
                  title="Advanced School ERP Platform"
                />
              </div>

              {/* Content Column (Order 1 on mobile, Order 2 on lg) */}
              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    FLAGSHIP #04 &bull; ENTERPRISE CAMPUS AUTOMATION
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--muted-fg)] bg-[var(--muted-bg)] px-2.5 py-1 rounded-full border border-[var(--subtle-border)]">
                    Laravel &bull; PostgreSQL &bull; RBAC
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--fg-page)] mb-3">
                    Advanced School ERP — Enterprise Campus Operations System
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--muted-fg)] leading-relaxed">
                    Educational institutions often struggle with fragmented paperwork, delayed fee collections, and manual report card generation. Built an end-to-end Laravel platform managing student admissions, online payment gateway reconciliation, automated gradebooks, and staff payroll for 500+ active campus members.
                  </p>
                </div>

                {/* Technical Highlights Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-[var(--fg-page)]">
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Granular 5-Role RBAC Security</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Payment Gateway Reconciliation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Automated PDF Gradebook Engine</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[var(--muted-bg)] px-3 py-2 rounded-xl border border-[var(--subtle-border)]">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>SMS/Email Notification Dispatch</span>
                  </div>
                </div>

                {/* Performance Metrics Bento Row */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-amber-500 font-mono">500+</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Active Users</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] font-mono">35%</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Admin Time Saved</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--muted-bg)] border border-[var(--subtle-border)]">
                    <div className="text-xl sm:text-2xl font-bold text-emerald-500 font-mono">Zero</div>
                    <div className="text-[11px] font-mono text-[var(--muted-fg)] mt-0.5">Discrepancies</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://erp-web-lctn.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span>Launch ERP Live Demo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
