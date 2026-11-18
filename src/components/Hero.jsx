'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Copy, Check, ArrowDown, FileText, Download } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';
import { useLocale } from '@/context/LocaleContext';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const { country, localTimeStr } = useLocale();

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-16 overflow-hidden bg-grid-pattern">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        <div className="max-w-4xl py-6 md:py-12 space-y-8 md:space-y-10">
          {/* Eyebrow Status */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted-fg)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[var(--fg-page)] font-bold">Raman Daksh</span>
              <span>&bull;</span>
              <span>Senior Software Engineer &bull; Full-Stack Architect</span>
              {country && (
                <>
                  <span className="hidden sm:inline">&bull;</span>
                  <span className="hidden sm:inline text-emerald-500 font-medium">
                    {country.flag} {country.name} ({country.overlap})
                  </span>
                </>
              )}
            </div>

            {/* Swiss Large Statement Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--fg-page)] leading-[1.05]">
              Engineering resilient systems and fluid interfaces.
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-[var(--muted-fg)] leading-relaxed max-w-2xl font-normal">
            I help startups turn complex ideas into production software — from relational schemas and high-throughput APIs to store-ready iOS &amp; Android apps.
          </p>

          {/* Single Quiet Hairline with Metadata and Minimal Links */}
          <div className="pt-8 border-t border-[var(--subtle-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[var(--muted-fg)]">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[var(--fg-page)] font-bold">4+ Years Experience</span>
              <span>&bull;</span>
              <span>20+ Products Shipped</span>
              <span>&bull;</span>
              <span className="text-emerald-500 font-semibold">Available for Hire</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[var(--fg-page)] font-medium">
              <Link 
                href="#contact" 
                className="hover:text-[var(--accent)] transition-colors underline underline-offset-4"
              >
                Get in touch &rarr;
              </Link>
              
              <Link 
                href="#highlights" 
                className="hover:text-[var(--accent)] transition-colors underline underline-offset-4"
              >
                See work &darr;
              </Link>

              <a
                href="/Raman-Daksh.pdf"
                download="Raman-Daksh-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] text-[var(--accent)] transition-colors underline underline-offset-4 inline-flex items-center gap-1 font-semibold"
                title="Download Raman Daksh Resume PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download CV &darr;</span>
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="hover:text-[var(--accent)] transition-colors cursor-pointer text-left"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <span className="text-emerald-500 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied Email
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--muted-fg)] hover:text-[var(--fg-page)]">
                    <Copy className="w-3.5 h-3.5" /> {siteConfig.email}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
