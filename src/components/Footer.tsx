import React from 'react';
import { ShieldCheck, Database, Calendar, ExternalLink } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenCorrectionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenCorrectionModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 text-xs mt-16 font-sans">
      {/* Sourced Data Breakdown Audit Bar */}
      <div className="border-b border-stone-800 bg-stone-950/70 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
              <ShieldCheck size={14} /> What is Real Verified Data
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Every GCC record contains a live source citation (SEC 10-K, MCA ROC filing, or press release). City counts cite Nasscom-Zinnov, Vestian, JLL 2026, and Flexiple research.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
              <Database size={14} /> What to Verify / Unsupplied Values
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Where headcount or launch year has not been officially reported by the enterprise, fields remain explicitly <code className="text-amber-300 text-[11px]">null</code> and render as <em>"Not available yet"</em>.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-sky-400 font-mono text-[11px] font-semibold uppercase tracking-wider">
              <Calendar size={14} /> Audit Trail & Timestamps
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Data last updated: <strong className="text-stone-200">October 2026</strong>. National total benchmark: 2,117 GCCs running 3,728 units with 2.36M employees ($98.4B revenue).
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xl font-editorial font-bold text-white tracking-tight">
              GCC Atlas India
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              The neutral, entity-level benchmark for Global Capability Centres (GCCs) in India. Built for executives, CFOs, and tech leaders deciding whether, where, and how to scale in India.
            </p>
            <div className="text-[11px] font-mono text-stone-500 pt-1">
              Maintained with editorial neutrality for the Flexiple Product Assignment.
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Explore Atlas
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('registry')}
                  className="hover:text-white transition-colors"
                >
                  GCC Entity Registry (140+ GCCs)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('compare')}
                  className="hover:text-white transition-colors"
                >
                  6-City Cost & Rent Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('recommender')}
                  className="hover:text-white transition-colors"
                >
                  Find My City (Scoring Engine)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('deck')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Strategic Pitch Deck
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Methodology & Ethics
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  Confidence Tag Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  Parent vs Unit Disparity Note
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-white transition-colors"
                >
                  The Neutrality Rule
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCorrectionModal}
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Report a Correction
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-stone-200 uppercase tracking-wider text-[11px] font-mono mb-3">
              Primary Sources
            </h4>
            <ul className="space-y-2 text-stone-400 text-[11px]">
              <li>
                <a
                  href="https://flexiple.com/gcc/statistics"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  Flexiple GCC Statistics <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  Nasscom-Zinnov FY26 Report <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.jll.com/en-in/newsroom/india-s-gcc-expansion-hits-record-31-million"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  JLL India GCC Guide 2026 <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.theweek.in/wire-updates/business/2025/07/21/dcm52-biz-realty-gcc.html"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  Vestian GCC Study <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-[11px]">
          <div>
            © 2026 GCC Atlas India • <em>"Every GCC in India, every number sourced."</em>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-4">
            <span>Built with precision for Flexiple Product Evaluation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
