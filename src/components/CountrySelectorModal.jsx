'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, X, Check, Globe } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { POPULAR_COUNTRY_CODES } from '@/data/countries';

export default function CountrySelectorModal() {
  const { country, setCountry, isModalOpen, setIsModalOpen, allCountries } = useLocale();
  const [search, setSearch] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, setIsModalOpen]);

  // Popular countries subset
  const popularCountries = useMemo(() => {
    return POPULAR_COUNTRY_CODES.map((code) => allCountries.find((c) => c.code === code)).filter(Boolean);
  }, [allCountries]);

  // Filtered countries
  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [allCountries, search]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl max-h-[85vh] flex flex-col rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[var(--subtle-border)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center border border-[var(--accent)]/20 shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--fg-page)] leading-snug">
                Worldwide Client Localization
              </h3>
              <p className="text-xs text-[var(--muted-fg)]">
                Select from all 249 countries &amp; territories to localize currency and working overlap
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="p-2 rounded-xl text-[var(--muted-fg)] hover:text-[var(--fg-page)] hover:bg-[var(--muted-bg)] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[var(--subtle-border)] space-y-3 bg-black/[0.02] dark:bg-white/[0.02]">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--muted-fg)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search all 249 countries (e.g. United States, Germany, Japan, GBP, EUR)..."
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--muted-bg)] border border-[var(--subtle-border)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>

          {/* Popular Quick Chips */}
          {!search && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
              <span className="text-[11px] font-mono text-[var(--muted-fg)] uppercase shrink-0 mr-1">
                Popular:
              </span>
              {popularCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c);
                    setIsModalOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all border ${
                    country.code === c.code
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-xs'
                      : 'bg-[var(--card-bg)] text-[var(--fg-page)] border-[var(--subtle-border)] hover:border-[var(--card-border)]'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Country List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-1.5 divide-y divide-[var(--subtle-border)]/50">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((c) => {
              const isSelected = country.code === c.code;
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCountry(c);
                    setIsModalOpen(false);
                  }}
                  className={`w-full pt-2 pb-2 px-3 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-semibold'
                      : 'hover:bg-[var(--muted-bg)] text-[var(--fg-page)]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl shrink-0 leading-none">{c.flag}</span>
                    <div className="truncate">
                      <div className="text-sm font-medium truncate flex items-center gap-2">
                        <span>{c.name}</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[var(--muted-bg)] text-[var(--muted-fg)]">
                          {c.code}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--muted-fg)] font-mono truncate">
                        {c.overlap}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-[var(--muted-bg)] border border-[var(--subtle-border)] text-[var(--fg-page)]">
                      {c.currency} ({c.symbol})
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[var(--accent)] shrink-0" />}
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-sm text-[var(--muted-fg)]">
              No country found matching &ldquo;{search}&rdquo;. You can search by country name, ISO code, or currency.
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3.5 bg-[var(--muted-bg)] border-t border-[var(--subtle-border)] flex items-center justify-between text-xs text-[var(--muted-fg)] font-mono">
          <span>Global clients: 195+ countries</span>
          <span>Payment in local currency via Stripe/Wise</span>
        </div>
      </div>
    </div>
  );
}
