'use client';

import { useState } from 'react';
import { 
  Mail, 
  Send, 
  Check, 
  Copy, 
  ShieldCheck 
} from 'lucide-react';
import { LinkedinIcon, TelegramIcon } from './Icons';
import { siteConfig } from '@/data/portfolio';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copiedDetails, setCopiedDetails] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    service: 'Full-Cycle MVP (Laravel + Flutter)',
    budget: '$3,000 – $6,000',
    timeline: 'Within 1 Month',
    message: '',
  });

  const servicesList = [
    { id: 'Full-Cycle MVP (Laravel + Flutter)', label: 'Full MVP Sprint' },
    { id: 'Laravel Backend Architecture', label: 'Laravel Backend' },
    { id: 'Flutter Mobile App', label: 'Flutter Mobile App' },
    { id: 'REST API Design & Architecture', label: 'REST API Design' },
    { id: 'Fractional Staff Engineer', label: 'Fractional Retainer' },
    { id: 'Architecture & Code Audit', label: 'Code & Security Audit' },
  ];

  const budgetList = [
    { id: '< $3,000', label: '< $3,000' },
    { id: '$3,000 – $6,000', label: '$3,000 – $6,000' },
    { id: '$6,000 – $15,000+', label: '$6,000 – $15,000+' },
    { id: 'Hourly / Retainer ($45–$65/hr)', label: 'Hourly ($45–$65/hr)' },
  ];

  const timelineList = [
    { id: 'ASAP (2–3 Weeks)', label: 'ASAP (2–3 Weeks)' },
    { id: 'Within 1 Month', label: 'Within 1 Month' },
    { id: '2–3 Months', label: '2–3 Months' },
    { id: 'Flexible / Ongoing', label: 'Flexible / Ongoing' },
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyFormDetails = () => {
    const text = `Name: ${formState.name}
Email: ${formState.email}
Service: ${formState.service}
Budget: ${formState.budget}
Timeline: ${formState.timeline}
Message: ${formState.message}`;
    navigator.clipboard.writeText(text);
    setCopiedDetails(true);
    setTimeout(() => setCopiedDetails(false), 2000);
  };

  // Gmail Web direct compose URL fallback
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    siteConfig.email
  )}&su=${encodeURIComponent(
    `Project Inquiry: ${formState.service} from ${formState.name || 'Startup Client'}`
  )}&body=${encodeURIComponent(
    `Hi Raman,

Name: ${formState.name}
Email: ${formState.email}
Service: ${formState.service}
Budget Range: ${formState.budget}
Timeline: ${formState.timeline}

Project Details:
${formState.message}
`
  )}`;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name: formState.name,
      email: formState.email,
      service: formState.service,
      budget: formState.budget,
      timeline: formState.timeline,
      message: formState.message,
    };

    try {
      // 1. Dispatch via Resend API endpoint
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Failed to dispatch email via Resend.');
      }

      setSubmitted(true);
    } catch (err) {
      console.warn('API submission failed, falling back:', err);
      try {
        // Fallback: Netlify form capture if deployed statically
        const formData = new URLSearchParams({
          'form-name': 'contact',
          name: formState.name,
          email: formState.email,
          service: formState.service,
          budget: formState.budget,
          timeline: formState.timeline,
          message: formState.message,
        });

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        });
        setSubmitted(true);
      } catch {
        setErrorMsg('Could not send message automatically. Please click "Open in Web Gmail" below.');
        setSubmitted(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background ambient lighting */}
      <div className="editorial-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] opacity-25" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="section-label">
            Let&apos;s Build Together
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[var(--fg-page)] leading-tight mb-4">
            Ready to ship? Let&apos;s discuss your roadmap.
          </h2>
          <p className="text-base sm:text-lg text-[var(--muted-fg)] leading-relaxed font-normal">
            Direct collaboration with founders and product teams. No agency middlemen, no sales gatekeepers.
          </p>
        </div>

        {/* ========================================================
            SUCCESS STATE (Inquiry Dispatched)
            ======================================================== */}
        {submitted ? (
          <div className="bento-card p-8 sm:p-12 max-w-2xl mx-auto text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center mx-auto shadow-xs">
              <Check className="w-7 h-7" />
            </div>
            
            <h4 className="text-2xl sm:text-3xl font-bold text-[var(--fg-page)]">
              Inquiry Dispatched Successfully!
            </h4>
            
            {errorMsg ? (
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left space-y-2">
                <p className="text-xs text-[var(--fg-page)] leading-relaxed">
                  {errorMsg}
                </p>
              </div>
            ) : (
              <p className="text-sm text-[var(--muted-fg)] max-w-lg mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[var(--fg-page)]">{formState.name || 'there'}</span>! Your project brief has been sent straight to <span className="font-mono text-[var(--fg-page)] font-semibold">{siteConfig.email}</span>. I review all inquiries personally and will respond within 24 hours.
              </p>
            )}

            {/* Guaranteed Fallback Options */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold shadow-xs transition-transform hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Web Gmail ↗</span>
              </a>

              <button
                onClick={copyFormDetails}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] font-medium hover:bg-[var(--muted-bg)] transition-colors cursor-pointer"
              >
                {copiedDetails ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-[var(--muted-fg)]" />}
                <span>{copiedDetails ? 'Details Copied!' : 'Copy Brief Summary'}</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-[var(--muted-fg)] hover:text-[var(--accent)] underline cursor-pointer"
              >
                ← Submit another inquiry
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
              SPLIT EXECUTIVE CONSOLE (Selected Favorite)
              ======================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Left Executive Briefing Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bento-card p-6 sm:p-7 space-y-5">
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--fg-page)] leading-snug">
                  Tell me what you&apos;re building. I&apos;ll engineer how to ship it.
                </h3>

                <p className="text-xs sm:text-sm text-[var(--muted-fg)] leading-relaxed">
                  Every project is handled personally — from database schema and architecture to pixel-perfect Flutter UI. No junior handoffs or agency overhead.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--fg-page)]">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Guaranteed response within 12–24 hours</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--fg-page)]">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Transparent milestone-based proposals</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--fg-page)]">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>30-Day defect warranty post-deployment</span>
                  </div>
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="bento-card p-6 space-y-3">
                <div className="text-xs font-mono text-[var(--muted-fg)] uppercase">Direct Channels</div>
                <div className="text-sm font-bold font-mono text-[var(--fg-page)] break-all">
                  {siteConfig.email}
                </div>
                
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={copyEmail}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--muted-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] text-xs font-mono text-[var(--fg-page)] transition-colors cursor-pointer text-center"
                  >
                    {copied ? 'Copied to Clipboard!' : 'Copy Email'}
                  </button>

                  <a
                    href={siteConfig.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[var(--muted-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--fg-page)] transition-colors"
                    aria-label="Telegram"
                  >
                    <TelegramIcon className="w-4 h-4" />
                  </a>

                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-[var(--muted-bg)] hover:bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--fg-page)] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bento-card p-6 sm:p-8 shadow-xl">
                <div className="mb-6">
                  <p className="text-xs text-[var(--muted-fg)]">Submit your requirements below to receive a proposal within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Alex Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Service Required</label>
                      <select
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#18181b] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7] transition-colors"
                      >
                        {servicesList.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Budget Target</label>
                      <select
                        value={formState.budget}
                        onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#18181b] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7] transition-colors"
                      >
                        {budgetList.map((b) => (
                          <option key={b.id} value={b.id}>{b.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Target Timeline</label>
                      <select
                        value={formState.timeline}
                        onChange={(e) => setFormState({ ...formState, timeline: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-xs text-[var(--fg-page)] focus:outline-none focus:border-[var(--accent)] cursor-pointer [&>option]:bg-white dark:[&>option]:bg-[#18181b] [&>option]:text-[#1d1d1f] dark:[&>option]:text-[#f5f5f7] transition-colors"
                      >
                        {timelineList.map((t) => (
                          <option key={t.id} value={t.id}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[var(--muted-fg)] mb-1.5">Project Brief &amp; Roadmap</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline the product goals, target deliverables, or any existing repository links..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--muted-bg)] text-sm text-[var(--fg-page)] placeholder:text-[var(--muted-fg)] focus:outline-none focus:border-[var(--accent)] resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3.5 rounded-full text-xs font-semibold cursor-pointer disabled:opacity-60 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Dispatching via Resend...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-1.5">
                        <span>Send Project Brief</span>
                        <Send className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
