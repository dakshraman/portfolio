'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, Calendar } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient radial glow */}
      <div className="editorial-glow top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Availability & Exclusivity Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] shadow-xs mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono tracking-wide text-[var(--fg-page)] font-medium">
            Available for Q1/Q2 Engagements · 1 MVP Slot Open
          </span>
        </div>

        {/* Primary Client-Centric Headline */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.08] mb-6">
            Senior Laravel & Flutter engineer for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400">
              ambitious startups.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted-fg)] leading-relaxed max-w-2xl font-light mb-8">
            I help founders and engineering teams ship scalable web and mobile products without the bloat of agencies or the gamble of junior hires. High-throughput backends, native mobile apps, and 99.9% uptime.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-12">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Discovery Call</span>
            </Link>

            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--muted-bg)] text-[var(--fg-page)] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <span>View Case Studies</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-mono text-xs text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-[var(--muted-bg)] transition-colors cursor-pointer"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{siteConfig.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Client Trust & Impact Bento Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[var(--subtle-border)]">
          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--fg-page)] tracking-tight">4+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Years Engineering</div>
            <div className="text-[10px] text-orange-500 font-mono mt-0.5">Senior Specialist</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-orange-500 tracking-tight">20+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Delivered Projects</div>
            <div className="text-[10px] text-[var(--muted-fg)] font-mono mt-0.5">100% On-Time Delivery</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[var(--fg-page)] tracking-tight">50K+</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Daily API Volume</div>
            <div className="text-[10px] text-[var(--muted-fg)] font-mono mt-0.5">High-Concurrency Scale</div>
          </div>

          <div className="bento-card p-4 sm:p-5">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-500 tracking-tight">&lt;12h</div>
            <div className="text-xs text-[var(--muted-fg)] mt-1 font-medium">Response Time</div>
            <div className="text-[10px] text-emerald-500 font-mono mt-0.5">US & EU Live Overlap</div>
          </div>
        </div>
      </div>
    </section>
  );
}
