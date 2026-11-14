'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-[var(--subtle-border)] bg-[var(--bg-page)] text-[var(--fg-page)] pt-16 pb-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Big Editorial Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[var(--subtle-border)]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-8 h-8 rounded-full bg-[var(--fg-page)] text-[var(--bg-page)] font-semibold text-xs flex items-center justify-center shadow-xs">
                RD
              </span>
              <span className="font-semibold text-lg text-[var(--fg-page)] tracking-tight">
                Raman Daksh
              </span>
            </div>
            <p className="text-base text-[var(--muted-fg)] max-w-lg leading-relaxed">
              Senior Freelance Laravel &amp; Flutter Engineer. Building scalable backend architectures, high-concurrency APIs, and cross-platform mobile apps for global startups.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="btn-primary text-xs py-2.5 px-5">
              Start a Project
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center hover:bg-[var(--muted-bg)] text-[var(--fg-page)] transition-colors cursor-pointer shadow-xs"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clean Multi-Column Directory */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-[var(--fg-page)] mb-3 tracking-tight">Navigation</h4>
            <ul className="space-y-2 text-[var(--muted-fg)]">
              <li><Link href="#projects" className="hover:text-[var(--fg-page)] transition-colors">Selected Work</Link></li>
              <li><Link href="#services" className="hover:text-[var(--fg-page)] transition-colors">Services</Link></li>
              <li><Link href="#pricing" className="hover:text-[var(--fg-page)] transition-colors">Sprint Pricing</Link></li>
              <li><Link href="#blog" className="hover:text-[var(--fg-page)] transition-colors">Technical Writing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fg-page)] mb-3 tracking-tight">Specialization</h4>
            <ul className="space-y-2 text-[var(--muted-fg)]">
              <li><span className="text-[var(--fg-page)] font-medium">Laravel</span> Backend Architecture</li>
              <li><span className="text-[var(--fg-page)] font-medium">Flutter</span> iOS &amp; Android</li>
              <li><span className="text-[var(--fg-page)] font-medium">RESTful</span> API Design</li>
              <li><span className="text-[var(--fg-page)] font-medium">PostgreSQL &amp; Redis</span> Scaling</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fg-page)] mb-3 tracking-tight">Flagship Builds</h4>
            <ul className="space-y-2 text-[var(--muted-fg)]">
              <li>
                <a href="https://clouddeck.dakshraman.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  <span>CloudDeck</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://devkit.dakshraman.in" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  <span>Devkit Platform</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://erp-web-lctn.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                  <span>School ERP</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fg-page)] mb-3 tracking-tight">Contact &amp; Location</h4>
            <div className="space-y-2 text-[var(--muted-fg)] font-mono text-[11px]">
              <div>Dehradun, India · IST (UTC+5:30)</div>
              <button
                onClick={copyEmail}
                className="text-[var(--accent)] hover:underline block cursor-pointer text-left"
              >
                {copied ? 'Copied ✓' : siteConfig.email}
              </button>
              <div className="text-emerald-500 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for Hire</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hairline Divider & Bottom Rights */}
        <div className="pt-6 border-t border-[var(--subtle-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted-fg)]">
          <div>&copy; {new Date().getFullYear()} Raman Daksh.</div>
          <div className="flex items-center gap-5">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--fg-page)] transition-colors">GitHub</a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--fg-page)] transition-colors">LinkedIn</a>
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--fg-page)] transition-colors">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
