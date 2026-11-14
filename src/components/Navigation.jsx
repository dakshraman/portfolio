'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Experience', href: '#experience' },
    { label: 'Writing', href: '#blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <nav
          className={`nav-glass rounded-full px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all duration-300 border ${
            scrolled
              ? 'shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] border-black/20 dark:border-white/20'
              : 'shadow-[0_4px_24px_-2px_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_36px_-4px_rgba(0,0,0,0.65)] border-black/15 dark:border-white/15'
          }`}
          aria-label="Main Navigation"
        >
          {/* Brand & Availability Status */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Raman Daksh - Home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[var(--fg-page)] text-[var(--bg-page)] font-semibold text-xs tracking-tight shadow-xs group-hover:scale-105 transition-transform">
              RD
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm tracking-tight text-[var(--fg-page)] leading-none group-hover:text-[var(--accent)] transition-colors">
                Raman Daksh
              </span>
              <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[var(--muted-fg)] mt-0.5 tracking-tight">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Available
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3.5 py-1.5 text-[13px] font-medium text-[#3a3a3c] dark:text-[#a1a1a6] hover:text-[var(--fg-page)] rounded-full hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Controls: Theme Toggle + CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <ThemeToggle />

            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-xs active:scale-95 transition-all"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--fg-page)] cursor-pointer hover:bg-[var(--muted-bg)] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile & Tablet Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 nav-glass rounded-3xl p-4 sm:p-5 shadow-2xl border border-[var(--card-border)] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-[var(--fg-page)] hover:bg-[var(--muted-bg)] rounded-2xl transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="pt-2.5 mt-2 border-t border-[var(--subtle-border)]">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-opacity shadow-xs"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
