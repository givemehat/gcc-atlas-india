import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Presentation,
  AlertTriangle
} from 'lucide-react';
import { ActiveTab } from '../types';

interface DeckPageProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const DeckPage: React.FC<DeckPageProps> = ({ onSelectTab }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'The Core Claim & The Epistemic Gap',
      subtitle: 'Slide 1 of 8 • The Foundation',
      content: (
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-mono text-xs rounded-full">
            The One-Line Promise: "Every GCC in India, every number sourced."
          </div>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-900 leading-tight">
            India's $98B GCC market is booming, but nobody can agree on the basic numbers.
          </h2>
          <div className="p-4 bg-stone-50 border border-stone-200 rounded text-xs text-stone-700 leading-relaxed">
            The latest <strong>Nasscom-Zinnov FY26 report</strong> counts <strong>2,117 GCCs</strong> operating <strong>3,728 units</strong> with <strong>2.36M employees</strong>. Yet three reputable sources give three completely contradictory figures for the exact same city:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-stone-200 rounded shadow-xs">
              <span className="font-mono text-xs text-stone-500 block">Vestian (Jul 2025)</span>
              <div className="text-2xl font-editorial font-bold text-stone-950 mt-1">487 GCCs</div>
              <p className="text-xs text-stone-600 mt-1">29% national share. Counts strictly standalone parent company leases.</p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded shadow-xs">
              <span className="font-mono text-xs text-stone-500 block">JLL India (Jan 2026)</span>
              <div className="text-2xl font-editorial font-bold text-stone-950 mt-1">900+ units</div>
              <p className="text-xs text-stone-600 mt-1">34% to 39% share. Counts individual business units and campus leases.</p>
            </div>
            <div className="p-4 bg-white border border-stone-200 rounded shadow-xs">
              <span className="font-mono text-xs text-stone-500 block">Flexiple Directory (2026)</span>
              <div className="text-2xl font-editorial font-bold text-stone-950 mt-1">~870 GCCs</div>
              <p className="text-xs text-stone-600 mt-1">~40% share. Entity-level aggregation across major tech corridors.</p>
            </div>
          </div>

          <div className="p-3 bg-stone-900 text-stone-200 rounded text-xs flex items-center justify-between">
            <span>The disagreement is the evidence: No report publishes the underlying list of companies.</span>
            <button
              onClick={() => onSelectTab('home')}
              className="text-amber-400 hover:underline font-mono text-[11px]"
            >
              Inspect Home Disparity Panel →
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'The Problem: Ecosystem Information Asymmetry',
      subtitle: 'Slide 2 of 8 • Stakeholder Pain Analysis',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            A fragmented $15B enablement market built on referral hearsay.
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            When a global enterprise decides to enter India, it navigates a 7-link supply chain: advisors, real estate brokers, tax/legal firms, recruiters, EORs, payroll, and state governments. Information sits scattered in private heads and paywalled PDFs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <div className="font-semibold text-stone-900 font-mono uppercase text-[11px] text-amber-800">
                Demand Side (Entrant CXOs)
              </div>
              <p className="text-stone-700">
                <strong>Cannot verify:</strong> Which city offers the true talent density for their sector, what office space actually costs, or which build-operate-transfer firm delivers outcomes vs just marketing.
              </p>
              <p className="text-stone-500 italic pt-1 border-t border-stone-100">
                Today's reaction: Buys a $25k consultant slide deck, relies on peer referrals, travels on blind roadshows.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <div className="font-semibold text-stone-900 font-mono uppercase text-[11px] text-sky-800">
                Supply Side (Service Providers & Brokers)
              </div>
              <p className="text-stone-700">
                <strong>Cannot identify:</strong> Which global multinationals are secretly scoping India entry, what stage of approval they are in, or how to prove their genuine track record.
              </p>
              <p className="text-stone-500 italic pt-1 border-t border-stone-100">
                Today's reaction: Cold LinkedIn outreach, expensive conference booths, buying unverified lead lists.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-950 font-medium">
            Core thesis: The pain is acute for the first-time entrant CXO who has personal career risk on the line.
          </div>
        </div>
      )
    },
    {
      title: '7 Market Opportunities Ranked',
      subtitle: 'Slide 3 of 8 • Strategic Prioritization',
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-editorial font-bold text-stone-900">
            Evaluating the Wedge: Why the Verified Registry is the Spine
          </h2>
          <p className="text-xs text-stone-600">
            Ranked on 4 tests: Data availability today, Who pays, Time-to-ship, and Defensibility (hard to copy).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded bg-white">
              <thead>
                <tr className="bg-stone-100 font-mono text-stone-700 border-b border-stone-200">
                  <th className="py-2 px-3">Rank & Opportunity</th>
                  <th className="py-2 px-3">Who Pays</th>
                  <th className="py-2 px-3">Data Available Today?</th>
                  <th className="py-2 px-3">Hard to Copy?</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr className="bg-emerald-50/60 font-medium">
                  <td className="py-2 px-3 text-stone-900">#1. Verified GCC Registry</td>
                  <td className="py-2 px-3">Providers, Brokers, Recruiters</td>
                  <td className="py-2 px-3">Yes (10-K, MCA, Press)</td>
                  <td className="py-2 px-3 text-emerald-800 font-semibold">Yes (linked & cleaned)</td>
                  <td className="py-2 px-3 text-emerald-800">Built in MVP</td>
                </tr>
                <tr className="bg-emerald-50/40 font-medium">
                  <td className="py-2 px-3 text-stone-900">#2. Entry Decision Tool (City Compare)</td>
                  <td className="py-2 px-3">Entrants (Free), Advisors (Leads)</td>
                  <td className="py-2 px-3">Yes (Policies, Rent reports)</td>
                  <td className="py-2 px-3">Medium</td>
                  <td className="py-2 px-3 text-emerald-800">Built in MVP</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-stone-800">#3. Inbound Pipeline Feed</td>
                  <td className="py-2 px-3">Advisors, Brokers, Recruiters</td>
                  <td className="py-2 px-3">News & job spike signals</td>
                  <td className="py-2 px-3 font-semibold">Yes (needs Registry)</td>
                  <td className="py-2 px-3 text-stone-500">Phase 2</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-stone-800">#4. Provider Delivery Scorecard</td>
                  <td className="py-2 px-3">Entrants & Verified Providers</td>
                  <td className="py-2 px-3">Hard (Dispute-prone)</td>
                  <td className="py-2 px-3">Very High</td>
                  <td className="py-2 px-3 text-stone-500">Phase 3</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 text-stone-800">#5. State Incentive Comparator</td>
                  <td className="py-2 px-3">Entrants / State Govts</td>
                  <td className="py-2 px-3">Yes (Policy PDFs)</td>
                  <td className="py-2 px-3">Low alone, high inside #2</td>
                  <td className="py-2 px-3 text-emerald-800">Built inside #2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-700">
            <strong>Key Insight:</strong> Opportunities #3, #4, #5, and #6 all depend on knowing which GCCs exist and where. The registry is the spine; the rest are views upon it.
          </div>
        </div>
      )
    },
    {
      title: 'The Solution: GCC Atlas India (MVP)',
      subtitle: 'Slide 4 of 8 • Product Architecture',
      content: (
        <div className="space-y-5">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            A public, neutral reference tool for the global decision-maker.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase">
                1. Sourced Registry (140+ Entities)
              </span>
              <p className="text-stone-600">
                Company name, HQ country, primary city, sector, year established, approx headcount, and a verifiable source citation link for every row. Filter by city, sector, year, and confidence.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase">
                2. City Compare Matrix
              </span>
              <p className="text-stone-600">
                Compare 2 to 4 cities side-by-side on GCC density, share of new setups, Grade-A office rents, talent compensation bands, and state incentives. Every number shows its source on hover.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase">
                3. Find My City (Deterministic Recommender)
              </span>
              <p className="text-stone-600">
                4-question strategic form (sector, team size, function, priority). Outputs a ranked top-3 shortlist with plain-language reasons and a visible mathematical formula.
              </p>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase">
                4. Confidence Taxonomy & Audit Protocol
              </span>
              <p className="text-stone-600">
                Verified (filings), Reported (press), Estimated (derived). Includes an open correction pipeline logging updates with tracking reference numbers.
              </p>
            </div>
          </div>

          <div className="p-3 bg-stone-900 text-stone-200 rounded text-xs flex items-center justify-between">
            <span>Why entrants first: Entrants have the sharpest pain. Serving them builds the trusted audience that providers later pay to reach.</span>
            <button
              onClick={() => onSelectTab('registry')}
              className="text-amber-400 hover:underline font-mono text-[11px]"
            >
              Open Live Registry →
            </button>
          </div>
        </div>
      )
    },
    {
      title: 'Positioning vs Existing Market Alternatives',
      subtitle: 'Slide 5 of 8 • Market Positioning',
      content: (
        <div className="space-y-5">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            Positioned as the neutral reference for India's GCC ecosystem.
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded bg-white">
              <thead>
                <tr className="bg-stone-100 font-mono text-stone-700 border-b border-stone-200">
                  <th className="py-2.5 px-3">Stakeholder</th>
                  <th className="py-2.5 px-3">What They Use Today</th>
                  <th className="py-2.5 px-3">Why They Come to GCC Atlas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">New Entrant (CXO)</td>
                  <td className="py-2.5 px-3">Consultant decks, peer chats, provider pitches</td>
                  <td className="py-2.5 px-3">Neutral, free, comparable in 2 minutes; each number traceable to a link.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Advisors, EOR & Recruiters</td>
                  <td className="py-2.5 px-3">Paid lead lists, cold LinkedIn, event sponsorship</td>
                  <td className="py-2.5 px-3">A qualified audience of entering CXOs; verified profile visibility.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Real Estate Brokers</td>
                  <td className="py-2.5 px-3">Own research, broker networks</td>
                  <td className="py-2.5 px-3">Earlier intent signals by city, micro-market, and headcount scale.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">State Governments</td>
                  <td className="py-2.5 px-3">Roadshows, static PDF policies</td>
                  <td className="py-2.5 px-3">A credible, comparative showcase next to competing state policies.</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Flexiple Alignment</td>
                  <td className="py-2.5 px-3">Static GCC statistics and city lists</td>
                  <td className="py-2.5 px-3">Transforms Flexiple from static SEO content into an interactive utility.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-950">
            <strong>Key Difference:</strong> Consultant reports sell opinions and aggregates (2,117 GCCs). GCC Atlas shows the underlying company list and lets the reader verify every fact.
          </div>
        </div>
      )
    },
    {
      title: 'Monetization & Business Model (Future)',
      subtitle: 'Slide 6 of 8 • Sustainable Unit Economics',
      content: (
        <div className="space-y-5">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            How it monetizes without compromising neutrality.
          </h2>
          <p className="text-xs text-stone-600">
            <strong>The Golden Rule:</strong> Entrants never pay. Sponsorship never changes a score. Rankings cannot be bought.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase block">
                Stream 1: Verified Provider Profiles
              </span>
              <p className="text-stone-700">
                Setup advisors, EOR firms, real estate developers, and legal practices pay an annual subscription for an audited profile showcasing verified client logos and scope.
              </p>
              <span className="text-[10px] text-stone-500 font-mono block pt-1">$3,000 to $6,000 / year</span>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase block">
                Stream 2: Qualified RFP Intros
              </span>
              <p className="text-stone-700">
                When an entrant finishes the "Find My City" recommender and requests vetted local setup partners, providers pay a success-aligned connection fee.
              </p>
              <span className="text-[10px] text-stone-500 font-mono block pt-1">High-intent B2B marketplace</span>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-800 uppercase block">
                Stream 3: Pipeline & Expansion Feed
              </span>
              <p className="text-stone-700">
                Commercial real estate developers and recruiters pay a quarterly subscription for early signals on which GCCs are scoping second cities or lease expansions.
              </p>
              <span className="text-[10px] text-stone-500 font-mono block pt-1">Enterprise data API</span>
            </div>
          </div>

          <div className="p-3 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600">
            Because the entrant gets pure, uncorrupted value for free, they share high-fidelity intent data, which is the exact data the supply side will pay a premium to access.
          </div>
        </div>
      )
    },
    {
      title: 'Key Risks & Tactical Mitigations',
      subtitle: 'Slide 7 of 8 • Risk Governance',
      content: (
        <div className="space-y-5">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            What could go wrong, and how we protect the asset.
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-white border border-stone-200 rounded flex gap-3 items-start">
              <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">
                  Risk 1: Registry data decay and stale headcounts
                </strong>
                <p className="text-stone-600">
                  <em>Mitigation:</em> Every record has an explicit "as-of" date and source URL. A built-in correction flow enables company HR and PR teams to submit updates. Unverified values are left null rather than guessing.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white border border-stone-200 rounded flex gap-3 items-start">
              <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">
                  Risk 2: Provider conflict of interest if they pay and are evaluated
                </strong>
                <p className="text-stone-600">
                  <em>Mitigation:</em> Provider scorecards are excluded from Release 1. Rankings in the City Recommender are 100% deterministic, public formulas. Advertisers are strictly barred from score changes.
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white border border-stone-200 rounded flex gap-3 items-start">
              <AlertTriangle size={16} className="text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">
                  Risk 3: Incomplete coverage outside Tier-1 metros
                </strong>
                <p className="text-stone-600">
                  <em>Mitigation:</em> Focus first on the 6 primary metros that represent 85%+ of all GCC square footage, expanding to Tier-2 hubs (Kochi, Coimbatore, Ahmedabad, Chandigarh) in Phase 2.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'First 90 Days Roadmap & What to Test Next',
      subtitle: 'Slide 8 of 8 • Execution Plan',
      content: (
        <div className="space-y-6">
          <h2 className="text-3xl font-editorial font-bold text-stone-900">
            The 90-Day Execution Plan: From Prototype to Category Authority
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-stone-900 block">
                Days 1-30: Validation & Data Densification
              </span>
              <ul className="space-y-1 text-stone-600 list-disc list-inside">
                <li>Interview 10 first-time GCC leaders on city selection bottlenecks.</li>
                <li>Expand registry from 140+ to 300+ entries using automated MCA filings.</li>
                <li>Integrate real-time SEZ notification feeds.</li>
              </ul>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-stone-900 block">
                Days 31-60: Distribution & SEO Flywheel
              </span>
              <ul className="space-y-1 text-stone-600 list-disc list-inside">
                <li>Deep-link Flexiple's existing GCC pages to Atlas interactive tools.</li>
                <li>Publish quarterly "State of GCC Numbers" Disparity Index.</li>
                <li>Launch LinkedIn automated alerts for newly inaugurated centres.</li>
              </ul>
            </div>

            <div className="p-4 bg-white border border-stone-200 rounded space-y-2">
              <span className="font-mono text-[11px] font-semibold text-stone-900 block">
                Days 61-90: Provider Network Pilot
              </span>
              <ul className="space-y-1 text-stone-600 list-disc list-inside">
                <li>Onboard initial cohort of 15 vetted setup advisors.</li>
                <li>Pilot "Request an Introduction" flow at the end of City Recommender.</li>
                <li>Establish baseline lead conversion metrics for B2B monetization.</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-stone-900 text-stone-100 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white block">Ready to explore the live application?</span>
              <span className="text-stone-400">All features in this deck are functional in the prototype today.</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSelectTab('registry')}
                className="px-3 py-1.5 bg-white text-stone-900 rounded font-medium hover:bg-stone-100"
              >
                Inspect Registry →
              </button>
              <button
                onClick={() => onSelectTab('recommender')}
                className="px-3 py-1.5 bg-stone-800 text-stone-200 rounded font-medium hover:bg-stone-700 border border-stone-700"
              >
                Test Recommender →
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlide((curr) => Math.min(slides.length - 1, curr + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide((curr) => Math.max(0, curr - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Deck Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-800">
            <Presentation size={14} />
            <span>Product Intern Assignment Deck</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-stone-950 mt-0.5">
            Executive Strategy & Product Thesis
          </h1>
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-stone-500">
            Slide <strong>{currentSlide + 1}</strong> of {slides.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((c) => Math.max(0, c - 1))}
              className="p-1.5 rounded border border-stone-300 disabled:opacity-30 hover:bg-stone-100"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={currentSlide === slides.length - 1}
              onClick={() => setCurrentSlide((c) => Math.min(slides.length - 1, c + 1))}
              className="p-1.5 rounded border border-stone-300 disabled:opacity-30 hover:bg-stone-100"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="bg-white border border-stone-300 rounded-lg p-6 sm:p-10 shadow-md min-h-[520px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-stone-400 font-mono mb-4 border-b border-stone-100 pb-2">
            <span>{slides[currentSlide].subtitle}</span>
            <span className="hidden sm:inline">Use ← and → arrow keys to navigate</span>
          </div>

          <div>{slides[currentSlide].content}</div>
        </div>

        {/* Slide Navigator Dots */}
        <div className="pt-8 mt-6 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-6 bg-stone-900'
                    : 'w-2 bg-stone-300 hover:bg-stone-400'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {currentSlide > 0 && (
              <button
                onClick={() => setCurrentSlide((c) => c - 1)}
                className="px-3 py-1.5 border border-stone-300 rounded text-xs text-stone-700 hover:bg-stone-50 font-medium"
              >
                Previous
              </button>
            )}
            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlide((c) => c + 1)}
                className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800"
              >
                Next Slide →
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('registry')}
                className="px-4 py-1.5 bg-emerald-700 text-white rounded text-xs font-medium hover:bg-emerald-800"
              >
                Go to Prototype Registry →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
