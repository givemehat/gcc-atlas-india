import React from 'react';
import { ActiveTab, City, GCC } from '../types';
import {
  Database,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Building,
  Users,
  DollarSign,
  Info
} from 'lucide-react';
import { SourceTooltip } from '../components/SourceTooltip';

interface HomePageProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenRegistryWithCity?: (city: string) => void;
  cities: City[];
  gccList: GCC[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenRegistryWithCity,
  cities,
  gccList
}) => {
  return (
    <div className="space-y-16">
      {/* Editorial Hero Section */}
      <section className="pt-8 pb-4 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300 text-stone-800 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Nasscom-Zinnov FY26 Verified Benchmark</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-bold text-stone-950 tracking-tight leading-[1.12]">
          Every GCC in India, <br className="hidden sm:inline" />
          <span className="italic font-normal text-stone-800">every number sourced.</span>
        </h1>

        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          The neutral, entity-level benchmark for Global Capability Centres in India.
          Engineered for global CXOs and boardrooms deciding whether and where to scale.
          Zero consultant paywalls. Zero sponsored ranks.
        </p>

        {/* Big Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectTab('registry')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-stone-900 text-white font-medium text-sm hover:bg-stone-800 shadow-md hover:shadow-lg transition-all"
          >
            <Database size={16} />
            Explore GCC Registry ({gccList.length}+ Entities)
          </button>

          <button
            onClick={() => onSelectTab('recommender')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-white border border-stone-300 text-stone-900 font-medium text-sm hover:bg-stone-100 shadow-sm transition-all"
          >
            <SlidersHorizontal size={16} />
            Find My City (4-Step Recommender)
            <ArrowRight size={14} className="text-stone-500" />
          </button>
        </div>
      </section>

      {/* 3 Headline Sourced National Stats */}
      <section className="max-w-6xl mx-auto">
        <div className="border border-stone-300 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-stone-100/70 px-6 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs text-stone-600 font-mono">
            <span className="flex items-center gap-1.5 font-semibold text-stone-900">
              <ShieldCheck size={14} className="text-emerald-700" />
              National Benchmark Baseline
            </span>
            <span>
              Source:{' '}
              <a
                href="https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-stone-900"
              >
                Nasscom-Zinnov FY26 Report
              </a>{' '}
              • As of FY26
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {/* Stat 1 */}
            <div className="p-6 space-y-2 hover:bg-stone-50/50 transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Building size={13} /> Active GCC Footprint
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950">
                  2,117
                </span>
                <span className="text-xs font-medium text-stone-600">
                  GCCs
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-snug">
                Operating across <strong className="text-stone-800">3,728 units</strong> across India (Nasscom-Zinnov FY26); JLL projects 200+ new units over 24 months.
              </p>
              <div className="pt-2 text-[11px] text-stone-500 font-mono flex items-center justify-between">
                <SourceTooltip
                  sourceTitle="Nasscom-Zinnov GCC Pulse Report (FY26)"
                  sourceUrl="https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07"
                  asOf="FY26"
                  note="Counts distinct corporate entities; physical operating units stand at 3,728."
                >
                  Inspect Citation
                </SourceTooltip>
                <span className="text-stone-400">As of FY26</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-6 space-y-2 hover:bg-stone-50/50 transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <Users size={13} /> Highly Skilled Workforce
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950">
                  2.36M
                </span>
                <span className="text-xs font-medium text-stone-600">
                  Professionals
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-snug">
                Engineers, quantitative analysts, and corporate leaders directly employed in Indian GCCs.
              </p>
              <div className="pt-2 text-[11px] text-stone-500 font-mono flex items-center justify-between">
                <SourceTooltip
                  sourceTitle="Nasscom GCC Talent Pulse & Ministry of Electronics and IT (MeitY)"
                  sourceUrl="https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07"
                  asOf="FY26"
                  note="Represents high-value knowledge workers, of which >50% work in deep tech & AI mandates."
                >
                  Inspect Citation
                </SourceTooltip>
                <span className="text-stone-400">As of FY26</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-6 space-y-2 hover:bg-stone-50/50 transition-colors">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1">
                <DollarSign size={13} /> Economic Output Value
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950">
                  ~$98.4B
                </span>
                <span className="text-xs font-medium text-stone-600">
                  Annual Revenue
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-snug">
                Export and operational value delivered by Indian GCCs back to global parent headquarters.
              </p>
              <div className="pt-2 text-[11px] text-stone-500 font-mono flex items-center justify-between">
                <SourceTooltip
                  sourceTitle="Zinnov-Nasscom Strategic Review & RBI Inward Remittance Data"
                  sourceUrl="https://www.businesstoday.in/amp/technology/news/story/the-big-boom-how-indias-gcc-story-hits-2030-target-4-years-early-530265-2026-05-07"
                  asOf="FY26"
                  note="On track to surpass $105B by FY27, accounting for ~3.5% of India's GDP."
                >
                  Inspect Citation
                </SourceTooltip>
                <span className="text-stone-400">As of FY26</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURE: "Why the numbers differ" Disparity Panel */}
      <section className="max-w-6xl mx-auto">
        <div className="bg-amber-50/40 border border-amber-200/90 rounded-lg p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-200/80 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 font-semibold flex items-center gap-1.5">
                <Info size={14} /> The Epistemic Gap
              </span>
              <h2 className="text-2xl font-editorial font-bold text-stone-950 mt-1">
                Why the numbers differ: The Evidence of Market Asymmetry
              </h2>
            </div>
            <div className="text-xs text-stone-600 max-w-md">
              Three reputable research reports publish three completely irreconcilable pictures of the exact same city.
            </div>
          </div>

          {/* Sourced Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse bg-white rounded-md overflow-hidden border border-amber-200/60 shadow-xs">
              <thead>
                <tr className="bg-amber-100/60 border-b border-amber-200/80 text-stone-800 font-mono">
                  <th className="py-3 px-4 font-semibold">City Metric</th>
                  <th className="py-3 px-4 font-semibold">
                    Vestian Report
                    <span className="block text-[10px] text-stone-500 font-normal">Jul 2025</span>
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    JLL India GCC Guide
                    <span className="block text-[10px] text-stone-500 font-normal">Jan 2026</span>
                  </th>
                  <th className="py-3 px-4 font-semibold">
                    Flexiple GCC Intelligence
                    <span className="block text-[10px] text-stone-500 font-normal">Feb 2026</span>
                  </th>
                  <th className="py-3 px-4 font-semibold text-stone-600">Definition Root Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80">
                <tr className="hover:bg-amber-50/40">
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    Bengaluru
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">487 GCCs</strong>
                    <span className="block text-stone-500 text-[10px]">(29% share)</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">900+ units</strong>
                    <span className="block text-stone-500 text-[10px]">(34% to 39% share)</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">~870 GCCs</strong>
                    <span className="block text-stone-500 text-[10px]">(~40% share)</span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 leading-snug">
                    Vestian filters strictly by single standalone corporate parent leases; JLL counts individual physical business units; Flexiple tallies entity-level operating hubs.
                  </td>
                </tr>

                <tr className="hover:bg-amber-50/40">
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    Hyderabad
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">273 GCCs</strong>
                    <span className="block text-stone-500 text-[10px]">(16% share)</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">20% to 23% share</strong>
                    <span className="block text-stone-500 text-[10px]">(square footage)</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <strong className="text-stone-900">~550 GCCs</strong>
                    <span className="block text-stone-500 text-[10px]">(~24% share)</span>
                  </td>
                  <td className="py-3 px-4 text-stone-600 leading-snug">
                    Discrepancy driven by how HITEC City vs Financial District vs Kokapet secondary branch leases are aggregated.
                  </td>
                </tr>

                <tr className="hover:bg-amber-50/40 bg-stone-50/50">
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    National Total
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-800">
                    ~1,700 GCCs
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-800">
                    200+ new in 2 yrs
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-800">
                    2,117 (Nasscom-Zinnov)
                  </td>
                  <td className="py-3 px-4 text-stone-600 leading-snug">
                    Total gap of 400+ GCCs represents Tier-2 expansions and unbundled offshore tech centers.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Insight explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-700 leading-relaxed bg-white/70 p-4 rounded border border-amber-200/60">
            <div>
              <h4 className="font-semibold text-stone-900 mb-1">
                The Source of the Gap: Parent Companies vs Units
              </h4>
              <p>
                Part of the gap is definitions: some reports count parent companies (e.g. Google as 1 GCC), others count individual operating business units (e.g. Google Cloud, Google Search, Google Pay as 3 separate units), and others track physical commercial lease deeds. They are quoted in the media as if equal.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-stone-900 mb-1">
                The GCC Atlas Solution: Entity-Level Transparency
              </h4>
              <p>
                No consultant report publishes the underlying list of companies behind their numbers. GCC Atlas builds that underlying database: every row has a company name, city, function, headcount, confidence tag, and a verifiable primary source link you can check yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stakeholders: Who is hurt by information asymmetry */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
            Ecosystem Impact Analysis
          </span>
          <h2 className="text-3xl font-editorial font-bold text-stone-950 mt-1">
            Who the players are and how asymmetry hurts them
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            India's GCC enablement market is valued at $12B to $15B. Yet providers compete on marketing hype, not verified delivery outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg border border-stone-200 bg-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-editorial text-lg font-bold text-stone-900">
                The New Entrant (CXO)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-semibold">
                High Pain
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>The Pain:</strong> Cannot objectively verify city choice, real commercial lease rates, state subsidies, or which advisors actually deliver.
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="block font-medium text-stone-800 mb-1">What they do today:</span>
              Buys expensive $20k+ consultant decks, asks peer networks, and relies on subjective word-of-mouth referrals.
            </div>
          </div>

          <div className="p-5 rounded-lg border border-stone-200 bg-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-editorial text-lg font-bold text-stone-900">
                Service Providers & EORs
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                High Friction
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>The Pain:</strong> Cannot identify who is entering India next; difficult to prove genuine delivery track record over louder competitors.
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="block font-medium text-stone-800 mb-1">What they do today:</span>
              Relies on cold LinkedIn prospecting, sponsor booths at industry conferences, and unverified lead lists.
            </div>
          </div>

          <div className="p-5 rounded-lg border border-stone-200 bg-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-editorial text-lg font-bold text-stone-900">
                State Governments
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200 font-semibold">
                Lost Investment
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong>The Pain:</strong> State IT departments cannot present prospective GCC investors with a neutral, apples-to-apples comparative case.
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span className="block font-medium text-stone-800 mb-1">What they do today:</span>
              International roadshows, bilateral MOUs, and static policy PDFs that are difficult for global executives to compare.
            </div>
          </div>
        </div>
      </section>

      {/* City Hub Quick Cards */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">
              Tier-1 Cluster Footprint
            </span>
            <h2 className="text-2xl font-editorial font-bold text-stone-950">
              The 6 Primary GCC Metros in India
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('compare')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-stone-700 underline underline-offset-4"
          >
            Launch 6-City Matrix Comparator →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cities.map((city) => (
            <div
              key={city.id}
              className="p-5 rounded-lg border border-stone-200 bg-white hover:border-stone-400 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-editorial font-bold text-stone-950">
                      {city.name}
                    </h3>
                    <span className="text-xs font-mono text-stone-500">
                      {city.state}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-bold bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-900">
                    {city.gcc_count_primary} GCCs
                  </span>
                </div>

                <p className="text-xs text-stone-600 italic mt-2.5 line-clamp-2">
                  "{city.tagline}"
                </p>

                <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-500">New GCC Share:</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {city.share_of_new_gccs_pct}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Office Rent:</span>
                    <span className="font-mono text-stone-900">
                      ₹{city.office_rent.min_inr_sqft_mo} to ₹{city.office_rent.max_inr_sqft_mo} / sq ft
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Talent Discount:</span>
                    <span className="font-mono font-medium text-emerald-800">
                      {city.talent_cost.discount_vs_bengaluru_pct === 0
                        ? 'Benchmark (0%)'
                        : `-${city.talent_cost.discount_vs_bengaluru_pct}% vs BLR`}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {city.key_sectors.slice(0, 3).map((sec, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded border border-stone-200/60"
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => {
                    if (onOpenRegistryWithCity) {
                      onOpenRegistryWithCity(city.name);
                    } else {
                      onSelectTab('registry');
                    }
                  }}
                  className="font-medium text-stone-900 hover:text-stone-700 underline underline-offset-2"
                >
                  View {city.name} GCCs →
                </button>
                <button
                  onClick={() => onSelectTab('compare')}
                  className="text-stone-500 hover:text-stone-800"
                >
                  Compare
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Neutrality Rule Banner */}
      <section className="max-w-6xl mx-auto">
        <div className="border border-stone-900 bg-stone-950 text-stone-200 rounded-lg p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck size={16} /> The Uncompromising Neutrality Charter
            </div>
            <h3 className="text-2xl font-editorial font-bold text-white">
              Nobody can pay to change a ranking, placement, or number.
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every score in our recommender is computed by public, transparent formulas shown on screen. Every record in our registry points to a verifiable public filing. Trust is our only product.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('about')}
            className="shrink-0 px-5 py-2.5 rounded bg-white text-stone-950 text-xs font-medium hover:bg-stone-100 transition-colors"
          >
            Read Methodology & Audit Standards →
          </button>
        </div>
      </section>
    </div>
  );
};
