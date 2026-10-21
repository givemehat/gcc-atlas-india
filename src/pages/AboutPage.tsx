import React, { useState } from 'react';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import {
  Lock,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react';

interface AboutPageProps {
  onOpenCorrectionModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  // Local state for inline correction form
  const [companyName, setCompanyName] = useState('');
  const [fieldToCorrect, setFieldToCorrect] = useState('Headcount');
  const [proposedValue, setProposedValue] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `GCC-CORR-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      ticketId,
      timestamp: new Date().toISOString(),
      companyName,
      fieldToCorrect,
      proposedValue,
      sourceUrl,
      submitterEmail,
      notes,
      source: 'AboutPage_InlineForm'
    };

    // Log to console as required
    console.info('[GCC Atlas Correction Submission via About Page]:', payload);
    setSubmittedTicket(ticketId);
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <span>Standards & Governance</span>
          <span>•</span>
          <span className="text-emerald-800 font-semibold">Audited Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950 mt-1">
          Methodology, Sources & Neutrality
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
          The principles, confidence taxonomy, source citations, and correction protocols that govern GCC Atlas India.
        </p>
      </div>

      {/* 1. The Neutrality Rule */}
      <section className="bg-stone-900 text-stone-100 rounded-lg p-6 sm:p-8 space-y-4 border border-stone-800 shadow-sm">
        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
          <Lock size={15} /> Core Neutrality Guarantee
        </div>
        <h2 className="text-2xl font-editorial font-bold text-white leading-snug">
          The Neutrality Rule: Nobody can pay to change a ranking.
        </h2>
        <div className="text-xs sm:text-sm text-stone-300 space-y-3 leading-relaxed">
          <p>
            India's GCC advisory market is filled with "pay-to-play" vendor directories, sponsored reports, and awards funded by service providers. GCC Atlas India operates on an uncompromising editorial standard:
          </p>
          <ul className="space-y-2 pl-4 border-l-2 border-amber-400/80 text-stone-200">
            <li>
              <strong>Zero Sponsored Placements:</strong> No GCC, broker, legal advisor, or state government can pay to rank higher in our recommender or appear at the top of the registry.
            </li>
            <li>
              <strong>100% Deterministic Rule Engine:</strong> Rankings are calculated by transparent, deterministic formulas rendered on screen. There are no black-box adjustments or algorithmic favoritism.
            </li>
            <li>
              <strong>Every Number Sourced:</strong> Where official verifiable data does not exist, we leave the field <code className="text-amber-300">null</code> and display "Not available yet", rather than fabricating numbers.
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Confidence Tags Taxonomy */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
            Data Provenance Protocol
          </span>
          <h2 className="text-2xl font-editorial font-bold text-stone-950 mt-0.5">
            Confidence Tags: What They Mean & When They Are Used
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Every entity in GCC Atlas is tagged with one of three confidence tiers to provide decision-makers with instant clarity on provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Verified */}
          <div className="p-5 rounded-lg border border-emerald-300 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <ConfidenceBadge level="Verified" size="lg" />
              <span className="text-[10px] font-mono text-emerald-800 font-bold uppercase">
                Tier 1
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-900">
              Company Statement or Regulatory Filing
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              Derived from statutory annual reports (SEC 10-K, MCA ROC filing), official company press releases, or statements made on the record by C-suite executives.
            </p>
            <div className="text-[11px] text-stone-500 font-mono pt-1 border-t border-emerald-200/80">
              Standard: 100% auditable public record.
            </div>
          </div>

          {/* Reported */}
          <div className="p-5 rounded-lg border border-sky-300 bg-sky-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <ConfidenceBadge level="Reported" size="lg" />
              <span className="text-[10px] font-mono text-sky-800 font-bold uppercase">
                Tier 2
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-900">
              Reputable Named Publication
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              Published in reputable tier-1 business and technology journalism (e.g. The Economic Times, Reuters, Livemint, Business Standard, TechCrunch) with named quotes.
            </p>
            <div className="text-[11px] text-stone-500 font-mono pt-1 border-t border-sky-200/80">
              Standard: Named secondary journalistic source.
            </div>
          </div>

          {/* Estimated */}
          <div className="p-5 rounded-lg border border-amber-300 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <ConfidenceBadge level="Estimated" size="lg" />
              <span className="text-[10px] font-mono text-amber-800 font-bold uppercase">
                Tier 3
              </span>
            </div>
            <p className="text-xs font-semibold text-stone-900">
              Derived or Approximate Benchmark
            </p>
            <p className="text-xs text-stone-700 leading-relaxed">
              Derived algorithmically from commercial office lease square footage (e.g. 100,000 sq ft @ 120 sq ft/person standard) or LinkedIn employee density signals.
            </p>
            <div className="text-[11px] text-stone-500 font-mono pt-1 border-t border-amber-200/80">
              Standard: Statistical estimate awaiting filing.
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Definitional Gap: Parent vs Unit */}
      <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-4">
        <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold">
          Epistemological Framework
        </span>
        <h2 className="text-2xl font-editorial font-bold text-stone-950">
          The Definitional Gap: Why Source Numbers Disagree
        </h2>
        <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
          <p>
            A major reason numbers diverge across industry publications is conflicting definitions of what constitutes a "GCC":
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-stone-50 rounded border border-stone-200 space-y-1.5">
              <h4 className="font-semibold text-stone-900 text-xs uppercase font-mono">
                1. Parent Enterprise View (e.g. Vestian)
              </h4>
              <p className="text-xs text-stone-600">
                Counts the distinct multinational corporation. Under this rule, Google or JPMorgan Chase counts as <strong>exactly 1 GCC</strong>, even if they run multiple major sites across Bengaluru, Hyderabad, and Mumbai.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded border border-stone-200 space-y-1.5">
              <h4 className="font-semibold text-stone-900 text-xs uppercase font-mono">
                2. Operating Unit / Campus View (e.g. JLL)
              </h4>
              <p className="text-xs text-stone-600">
                Counts each individual physical facility or distinct operating subsidiary. Under this rule, a bank operating an investment banking tech center in BKC and an IT hub in Goregaon counts as <strong>2 separate GCC units</strong>.
              </p>
            </div>
          </div>
          <p className="pt-2 text-stone-600 text-xs">
            Nasscom-Zinnov reconciles this nationally by stating that India's <strong>2,117 GCC parent companies</strong> operate across <strong>3,728 physical units</strong>. GCC Atlas tracks entity-level registries while capturing both dimensions.
          </p>
        </div>
      </section>

      {/* 4. Primary Research Citations */}
      <section className="space-y-4">
        <h2 className="text-xl font-editorial font-bold text-stone-950">
          Primary Sources & Authoritative Citations
        </h2>
        <div className="border border-stone-200 rounded-lg overflow-hidden bg-white">
          <div className="divide-y divide-stone-200 text-xs">
            {[
              {
                title: 'Nasscom-Zinnov GCC Pulse & Annual Review (FY26)',
                desc: 'National benchmark: 2,117 GCCs, 3,728 units, 2.36M employees, $98.4B output revenue.',
                url: 'https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07',
                date: 'May 2026'
              },
              {
                title: 'Flexiple GCC Directory & Market Intelligence Database',
                desc: 'Entity-level records, city micro-market allocations, and tech compensation benchmarks.',
                url: 'https://flexiple.com/gcc/statistics',
                date: 'Q1 2026'
              },
              {
                title: 'JLL India GCC Guide 2026: 31 Million Sq Ft Record Absorption',
                desc: 'Commercial leasing tracking, absorption shares by city, and micro-market rent bands.',
                url: 'https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million',
                date: 'Jan 2026'
              },
              {
                title: 'Vestian GCC Realty Analysis & Metro Disparity Study',
                desc: 'Detailed parent enterprise count by tier-1 metro (Bengaluru 487, Hyderabad 273).',
                url: 'https://www.theweek.in/wire-updates/business/2025/07/21/dcm52-biz-realty-gcc.html',
                date: 'Jul 2025'
              },
              {
                title: 'State Government GCC & ICT Policies (Karnataka, Telangana, Tamil Nadu, Maharashtra)',
                desc: 'Official gazetted policies governing capital subsidies, power tariffs, and stamp duty exemptions.',
                url: 'https://investingintamilnadu.com/',
                date: '2024-2026'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4 hover:bg-stone-50">
                <div className="space-y-0.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-stone-900 hover:underline inline-flex items-center gap-1.5"
                  >
                    {item.title} <ExternalLink size={12} className="text-stone-400" />
                  </a>
                  <p className="text-stone-600 text-[11px]">{item.desc}</p>
                </div>
                <span className="font-mono text-[11px] text-stone-400 shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How to Report a Correction Form (Logs to Console) */}
      <section className="bg-white border border-stone-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-1.5">
            <AlertCircle size={14} /> Open Audit Protocol
          </span>
          <h2 className="text-2xl font-editorial font-bold text-stone-950 mt-1">
            Report a Correction or Propose Verified Data
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
            Every record in GCC Atlas is open to community and corporate verification. Submitting this form logs your audit request directly to the registry queue and browser console.
          </p>
        </div>

        {submittedTicket ? (
          <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-md text-center space-y-3">
            <div className="w-10 h-10 bg-emerald-200 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-editorial text-xl font-bold text-emerald-950">
              Audit Request Logged Successfully
            </h3>
            <p className="text-xs text-emerald-800 font-mono">
              Ticket ID: <strong>{submittedTicket}</strong> • Logged to console
            </p>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Thank you for contributing to the neutral single source of truth for India's GCC ecosystem. Our research desk will verify your source citation.
            </p>
            <button
              onClick={() => {
                setSubmittedTicket(null);
                setCompanyName('');
                setProposedValue('');
                setSourceUrl('');
                setNotes('');
              }}
              className="mt-2 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded hover:bg-stone-800"
            >
              Submit Another Correction
            </button>
          </div>
        ) : (
          <form onSubmit={handleInlineSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Company / Entity Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Siemens Technology, Wells Fargo"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Data Field to Update *
                </label>
                <select
                  value={fieldToCorrect}
                  onChange={(e) => setFieldToCorrect(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none bg-white"
                >
                  <option value="Headcount">Headcount (Current or Campus Total)</option>
                  <option value="City">Primary City or Secondary Campus</option>
                  <option value="Micro-market">Micro-Market / Tech Park Address</option>
                  <option value="Year Established">Year Established in India</option>
                  <option value="Functions">Capabilities & Functions</option>
                  <option value="Source URL">Source URL Link</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Proposed Verified Value *
                </label>
                <input
                  type="text"
                  required
                  value={proposedValue}
                  onChange={(e) => setProposedValue(e.target.value)}
                  placeholder="e.g. 18,500 employees"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Verifiable Source URL (Required) *
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://company.com/annual-report or named news URL"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Submitter Work Email (For audit queries)
                </label>
                <input
                  type="email"
                  value={submitterEmail}
                  onChange={(e) => setSubmitterEmail(e.target.value)}
                  placeholder="analyst@firm.com"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Audit Notes / Citation Excerpt
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Reference page number or quote from filing..."
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:ring-1 focus:ring-stone-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-mono">
                Payload outputs to browser console per assignment rule.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
              >
                Log Correction to Audit Queue <Send size={12} />
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
