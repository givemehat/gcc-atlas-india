import React, { useState, useEffect } from 'react';
import { City, RecommenderAnswers, ScoredCityResult, ActiveTab } from '../types';
import { calculateCityRecommendations } from '../utils/recommender';
import {
  SlidersHorizontal,
  Sparkles,
  Trophy,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Copy,
  CheckCheck,
  X
} from 'lucide-react';

interface RecommenderPageProps {
  cities: City[];
  onSelectTab: (tab: ActiveTab) => void;
  onOpenRegistryWithCity?: (city: string) => void;
  onOpenCompareWithCities?: (cityIds: string[]) => void;
}

// Helper to parse deep-linked recommender criteria from URL
const parseRecommenderParams = (): { answers: RecommenderAnswers; fallbackNotice: string | null } => {
  const defaults: RecommenderAnswers = {
    sector: 'Tech & SaaS',
    teamSize: '100 - 500',
    mainFunction: 'Core Software / AI Engineering',
    priority: 'talent'
  };

  if (typeof window === 'undefined') {
    return { answers: defaults, fallbackNotice: null };
  }

  const params = new URLSearchParams(window.location.search);
  const rawSector = params.get('sector');
  const rawSize = params.get('size');
  const rawFn = params.get('fn') || params.get('function');
  const rawPriority = params.get('priority');

  if (!rawSector && !rawSize && !rawFn && !rawPriority) {
    return { answers: defaults, fallbackNotice: null };
  }

  let notice: string | null = null;
  const result: RecommenderAnswers = { ...defaults };

  // Parse sector
  if (rawSector) {
    const s = rawSector.toLowerCase();
    if (s.includes('tech') || s.includes('saas')) {
      result.sector = 'Tech & SaaS';
    } else if (s.includes('bfsi') || s.includes('fintech') || s.includes('finance')) {
      result.sector = 'BFSI & FinTech';
    } else if (s.includes('health') || s.includes('pharma') || s.includes('life')) {
      result.sector = 'Healthcare & Pharma';
    } else if (s.includes('auto') || s.includes('manufactur') || s.includes('ev')) {
      result.sector = 'Automotive & Manufacturing';
    } else if (s.includes('aero') || s.includes('defense') || s.includes('defence')) {
      result.sector = 'Aerospace & Defense';
    } else if (s.includes('retail') || s.includes('commerce')) {
      result.sector = 'Retail & E-Commerce';
    } else {
      notice = 'Unrecognized sector in URL parameter; defaulted to Tech & SaaS.';
    }
  }

  // Parse team size
  if (rawSize) {
    const sz = rawSize.toLowerCase().replace(/\s+/g, '');
    if (sz === '<100' || sz === 'under100' || sz === 'seed') {
      result.teamSize = '< 100';
    } else if (sz === '100-500' || sz === '100_500' || sz === 'growth') {
      result.teamSize = '100 - 500';
    } else if (sz === '500-2000' || sz === '500-2,000' || sz === 'enterprise') {
      result.teamSize = '500 - 2,000';
    } else if (sz === '2000+' || sz === '2,000+' || sz === 'campus') {
      result.teamSize = '2,000+';
    } else {
      notice = (notice ? `${notice} ` : '') + 'Unrecognized team size; defaulted to 100 - 500.';
    }
  }

  // Parse function
  if (rawFn) {
    const f = rawFn.toLowerCase();
    if (f.includes('software') || f.includes('ai') || f.includes('cloud') || f.includes('eng')) {
      result.mainFunction = 'Core Software / AI Engineering';
    } else if (f.includes('finance') || f.includes('risk') || f.includes('treasury')) {
      result.mainFunction = 'Finance & Risk';
    } else if (f.includes('hardware') || f.includes('embedded') || f.includes('rnd') || f.includes('r&d')) {
      result.mainFunction = 'Hardware / Embedded / R&D';
    } else if (f.includes('operation') || f.includes('shared') || f.includes('service') || f.includes('ops')) {
      result.mainFunction = 'Operations & Shared Services';
    } else {
      notice = (notice ? `${notice} ` : '') + 'Unrecognized function; defaulted to Core Software / AI Engineering.';
    }
  }

  // Parse priority
  if (rawPriority) {
    const p = rawPriority.toLowerCase();
    if (['cost', 'talent', 'speed', 'incentives'].includes(p)) {
      result.priority = p as any;
    } else {
      notice = (notice ? `${notice} ` : '') + 'Unrecognized priority; defaulted to talent depth.';
    }
  }

  return { answers: result, fallbackNotice: notice };
};

export const RecommenderPage: React.FC<RecommenderPageProps> = ({
  cities,
  onSelectTab,
  onOpenRegistryWithCity,
  onOpenCompareWithCities
}) => {
  const initial = parseRecommenderParams();
  const [answers, setAnswers] = useState<RecommenderAnswers>(initial.answers);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(initial.fallbackNotice);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Compute recommendations dynamically
  const recommendations: ScoredCityResult[] = calculateCityRecommendations(cities, answers);
  const topThree = recommendations.slice(0, 3);

  // Sync state to URL for deep linking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', 'recommender');
      params.set('sector', answers.sector);
      params.set('size', answers.teamSize);
      params.set('fn', answers.mainFunction);
      params.set('priority', answers.priority);
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [answers]);

  const handlePriorityChange = (priority: RecommenderAnswers['priority']) => {
    setAnswers((prev) => ({ ...prev, priority }));
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Fallback Notice Banner */}
      {fallbackNotice && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 rounded-md p-3 text-xs flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} className="text-amber-700 shrink-0" />
            <span>{fallbackNotice}</span>
          </div>
          <button
            onClick={() => setFallbackNotice(null)}
            className="text-amber-700 hover:text-amber-950 p-1"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Page Masthead */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
          <span>Deterministic City Recommender</span>
          <span>•</span>
          <span className="text-amber-800 font-semibold">100% Rule-Based & Auditable</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-1">
          <div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950">
              Find My City: GCC Strategic Location Engine
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
              Answer 4 strategic parameters to receive a transparently ranked shortlist of the top 3 Indian metros for your capability centre. Zero black-box AI hallucinations; all weights are rendered on screen.
            </p>
          </div>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-stone-300 bg-white text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors shadow-2xs self-start sm:self-auto shrink-0"
            title="Copy deep link with current recommender settings"
          >
            {copiedLink ? (
              <>
                <CheckCheck size={13} className="text-emerald-700" />
                <span className="text-emerald-800 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} className="text-stone-500" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 4-Question Form */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-lg p-6 shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-editorial font-bold text-stone-900 flex items-center gap-2">
              <SlidersHorizontal size={17} className="text-amber-800" />
              Strategic Criteria (4 Questions)
            </h2>
            <span className="text-[11px] font-mono text-stone-400">Step 1 of 1</span>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Question 1: Sector */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 font-mono">
                1. Primary Industry Sector
              </label>
              <select
                value={answers.sector}
                onChange={(e) => setAnswers({ ...answers, sector: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50 font-medium"
              >
                <option value="Tech & SaaS">Pure Tech & Enterprise SaaS</option>
                <option value="BFSI & FinTech">BFSI, FinTech & Capital Markets</option>
                <option value="Healthcare & Pharma">Healthcare, Pharma & Lifesciences</option>
                <option value="Automotive & Manufacturing">Automotive, EV & Industrial Engineering</option>
                <option value="Aerospace & Defense">Aerospace & Defense R&D</option>
                <option value="Retail & E-Commerce">Retail & Digital E-Commerce</option>
              </select>
            </div>

            {/* Question 2: Team Size in 3 Years */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 font-mono">
                2. Target Headcount in 3 Years
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '< 100', sub: 'Seed / Rapid Pod' },
                  { label: '100 - 500', sub: 'Growth GCC' },
                  { label: '500 - 2,000', sub: 'Enterprise Hub' },
                  { label: '2,000+', sub: 'Mega Campus' }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setAnswers({ ...answers, teamSize: item.label })}
                    className={`p-2 rounded text-left border transition-all ${
                      answers.teamSize === item.label
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    <div className="text-xs font-semibold">{item.label}</div>
                    <div
                      className={`text-[10px] ${
                        answers.teamSize === item.label ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Main Function */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 font-mono">
                3. Primary Centre Mandate & Function
              </label>
              <select
                value={answers.mainFunction}
                onChange={(e) => setAnswers({ ...answers, mainFunction: e.target.value })}
                className="w-full text-xs px-3 py-2.5 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50 font-medium"
              >
                <option value="Core Software / AI Engineering">Core Software, AI & Cloud Platforms</option>
                <option value="Finance & Risk">Finance, Quantitative Risk & Treasury</option>
                <option value="Hardware / Embedded / R&D">Hardware, Embedded Firmware & Physical R&D</option>
                <option value="Operations & Shared Services">Corporate Operations & Shared Services</option>
              </select>
            </div>

            {/* Question 4: Strategic Priority */}
            <div>
              <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1.5 font-mono">
                4. Decisive Strategic Priority (40% Weight)
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'cost' as const,
                    title: 'Cost Efficiency & Arbitrage',
                    desc: 'Maximize real estate and compensation savings.'
                  },
                  {
                    id: 'talent' as const,
                    title: 'Talent Depth & Domain Maturity',
                    desc: 'Access deep senior technical and leadership pools.'
                  },
                  {
                    id: 'speed' as const,
                    title: 'Speed to Hire & Ramp-up',
                    desc: 'Fastest time-to-market with ready talent density.'
                  },
                  {
                    id: 'incentives' as const,
                    title: 'State Subsidies & Policy Grants',
                    desc: 'Leverage capital rebates, power subsidies & stamp duty waivers.'
                  }
                ].map((opt) => (
                  <label
                    key={opt.id}
                    onClick={() => handlePriorityChange(opt.id)}
                    className={`flex items-start gap-3 p-2.5 rounded border cursor-pointer transition-all ${
                      answers.priority === opt.id
                        ? 'border-stone-900 bg-amber-50/50 text-stone-900 ring-1 ring-stone-900'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      checked={answers.priority === opt.id}
                      onChange={() => handlePriorityChange(opt.id)}
                      className="mt-1 text-stone-900 focus:ring-stone-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-900">{opt.title}</div>
                      <div className="text-[11px] text-stone-500">{opt.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Instant recalculation active</span>
            <button
              onClick={() => {
                setAnswers({
                  sector: 'Tech & SaaS',
                  teamSize: '100 - 500',
                  mainFunction: 'Core Software / AI Engineering',
                  priority: 'talent'
                });
              }}
              className="inline-flex items-center gap-1 hover:text-stone-900 underline"
            >
              <RotateCcw size={11} /> Reset Defaults
            </button>
          </div>
        </div>

        {/* Right Column: Ranked Shortlist of 3 Cities */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold flex items-center gap-1.5">
                <Trophy size={14} /> Shortlist Generated
              </span>
              <h2 className="text-2xl font-editorial font-bold text-stone-950 mt-0.5">
                Top 3 Recommended Indian Metros
              </h2>
            </div>
            <span className="text-xs font-mono bg-stone-100 border border-stone-200 px-2.5 py-1 rounded text-stone-700">
              Evaluated 6 Major Metros
            </span>
          </div>

          {/* Cards for Top 3 */}
          <div className="space-y-4">
            {topThree.map((item) => {
              const { city, rank, totalScore, reasons, caveats } = item;
              const isTop = rank === 1;

              return (
                <div
                  key={city.id}
                  className={`rounded-lg border transition-all p-6 bg-white shadow-xs relative overflow-hidden ${
                    isTop
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {/* Rank Ribbon */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm ${
                          isTop
                            ? 'bg-stone-900 text-amber-400 shadow-sm'
                            : rank === 2
                            ? 'bg-stone-200 text-stone-800'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        #{rank}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <h3 className="text-2xl font-editorial font-bold text-stone-950">
                            {city.name}
                          </h3>
                          <span className="text-xs text-stone-500 font-mono">
                            {city.state}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 italic">
                          "{city.tagline}"
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 font-mono text-xs font-bold">
                        <Sparkles size={12} className="text-emerald-700" />
                        {totalScore}% Match
                      </div>
                      <span className="text-[10px] text-stone-400 block mt-0.5 font-mono">
                        Rule score: {totalScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Core Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 my-4 py-3 border-y border-stone-100 text-xs">
                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-mono">
                        Active GCCs
                      </span>
                      <strong className="text-stone-900 font-mono text-sm">
                        {city.gcc_count_primary}
                      </strong>
                      <span className="text-stone-400 block text-[10px]">
                        ({city.share_of_new_gccs_pct}% new GCC share)
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-mono">
                        Office Rent
                      </span>
                      <strong className="text-stone-900 font-mono text-sm">
                        ₹{city.office_rent.blended_avg_inr}
                      </strong>
                      <span className="text-stone-400 block text-[10px]">
                        INR / sq ft / mo avg
                      </span>
                    </div>

                    <div>
                      <span className="text-stone-500 block text-[10px] uppercase font-mono">
                        Talent Arbitrage
                      </span>
                      <strong className="text-emerald-800 font-mono text-sm">
                        {city.talent_cost.discount_vs_bengaluru_pct === 0
                          ? 'Baseline (0%)'
                          : `-${city.talent_cost.discount_vs_bengaluru_pct}% vs BLR`}
                      </strong>
                      <span className="text-stone-400 block text-[10px]">
                        {city.talent_cost.level}
                      </span>
                    </div>
                  </div>

                  {/* Plain Language Reasons for Rank */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-700 block">
                      Why {city.name} earned Rank #{rank}:
                    </span>
                    <ul className="space-y-1.5 text-xs text-stone-700">
                      {reasons.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Caveats / Watch-outs */}
                  {caveats.length > 0 && (
                    <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-start gap-2 text-[11px] text-amber-900 bg-amber-50/60 p-2.5 rounded border border-amber-200/60">
                      <AlertTriangle size={14} className="text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold">CXO Consideration: </span>
                        <span>{caveats[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        if (onOpenRegistryWithCity) {
                          onOpenRegistryWithCity(city.name);
                        } else {
                          onSelectTab('registry');
                        }
                      }}
                      className="font-medium text-stone-900 hover:text-stone-700 underline underline-offset-2 flex items-center gap-1"
                    >
                      View {city.name} GCCs in Registry <ArrowRight size={12} />
                    </button>
                    <span className="text-stone-400 text-[11px] font-mono">
                      Anchors: {city.top_employers.slice(0, 3).join(', ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visible "How this score was calculated" Section (Required by Assignment) */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 font-mono text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-emerald-700" />
              How this score was calculated (100% Transparent Rule Engine)
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              No black-box machine learning. No paid placement. Rankings are calculated through a weighted scoring rule using audited metrics from state IT policies, JLL commercial rent indexes, and Nasscom talent reports.
            </p>

            {/* Formula Block */}
            <div className="bg-white p-3.5 rounded border border-stone-300 font-mono text-xs text-stone-800 space-y-1">
              <div className="text-[11px] text-stone-500 uppercase tracking-wider">
                Scoring Formula:
              </div>
              <div className="text-stone-950 font-bold overflow-x-auto py-1">
                Total Score = (Priority Metric × 4.0) + Sector Fit (25 pts) + Function Fit (20 pts) + Scale Factor (15 pts) + Base Ecosystem (10 pts)
              </div>
            </div>

            {/* Table of Weights */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs bg-white rounded border border-stone-200">
                <thead>
                  <tr className="bg-stone-100 border-b border-stone-200 font-mono text-stone-700">
                    <th className="py-2 px-3">City</th>
                    <th className="py-2 px-3 text-right">Priority ({answers.priority})</th>
                    <th className="py-2 px-3 text-right">Sector Fit</th>
                    <th className="py-2 px-3 text-right">Function Fit</th>
                    <th className="py-2 px-3 text-right">Scale Fit</th>
                    <th className="py-2 px-3 text-right font-bold text-stone-900">Total Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-mono text-[11px]">
                  {topThree.map((item) => (
                    <tr key={item.city.id}>
                      <td className="py-2 px-3 font-semibold text-stone-900 font-sans">
                        #{item.rank} {item.city.name}
                      </td>
                      <td className="py-2 px-3 text-right text-stone-700">
                        {item.breakdown.priorityWeightScore} / 40
                      </td>
                      <td className="py-2 px-3 text-right text-stone-700">
                        {item.breakdown.sectorFitBonus} / 25
                      </td>
                      <td className="py-2 px-3 text-right text-stone-700">
                        {item.breakdown.functionFitBonus} / 20
                      </td>
                      <td className="py-2 px-3 text-right text-stone-700">
                        {item.breakdown.scalePenaltyOrBonus} / 15
                      </td>
                      <td className="py-2 px-3 text-right font-bold text-stone-950 text-xs">
                        {item.totalScore} pts
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-[11px] text-stone-500">
              <span>Weights and rules are identical for all entities.</span>
              <button
                onClick={() => {
                  const topCityIds = topThree.map((item) => item.city.id);
                  if (onOpenCompareWithCities) {
                    onOpenCompareWithCities(topCityIds);
                  } else {
                    onSelectTab('compare');
                  }
                }}
                className="font-semibold text-stone-900 hover:text-amber-900 underline underline-offset-2 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Compare all 3 cities in full matrix ({topThree.map((t) => t.city.name).join(', ')})</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
