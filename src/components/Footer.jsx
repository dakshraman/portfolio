'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from './Icons';
import { siteConfig } from '@/data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--subtle-border)] bg-[var(--card-bg)] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                RD
              </span>
              <span className="font-bold text-lg text-[var(--fg-page)] tracking-tight">
                Raman Daksh
              </span>
            </div>
            <p className="text-xs text-[var(--muted-fg)] max-w-sm">
              Freelance Laravel & Flutter Developer building scalable backends and cross-platform mobile apps for global startups.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              aria-label="Telegram"
            >
              <TelegramIcon className="w-4 h-4" />
            </a>

            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--muted-fg)] hover:text-orange-500 hover:border-orange-500/50 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-[var(--card-border)] bg-[var(--muted-bg)] flex items-center justify-center text-[var(--fg-page)] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
              aria-label="Scroll to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--subtle-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted-fg)]">
          <div>
            &copy; {new Date().getFullYear()} Raman Daksh. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="#contact" className="hover:text-orange-500 transition-colors">
              Inquire
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
