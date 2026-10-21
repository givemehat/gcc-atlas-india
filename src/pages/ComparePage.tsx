import React, { useState, useEffect } from 'react';
import { City } from '../types';
import { CityBarChart } from '../components/CityBarChart';
import { SourceTooltip } from '../components/SourceTooltip';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import {
  Check,
  Building,
  TrendingUp,
  Landmark,
  Wallet,
  Briefcase,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Copy,
  Printer,
  CheckCheck,
  X
} from 'lucide-react';

interface ComparePageProps {
  cities: City[];
  initialCities?: string[];
}

export const ComparePage: React.FC<ComparePageProps> = ({ cities, initialCities }) => {
  const validCityIds = cities.map((c) => c.id);

  // Parse initial city IDs from props or URL
  const getInitialCityIds = (): { ids: string[]; fallbackNotice: string | null } => {
    let rawIds: string[] = [];
    let notice: string | null = null;

    if (initialCities && initialCities.length > 0) {
      rawIds = initialCities;
    } else if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const citiesParam = params.get('cities');
      if (citiesParam) {
        rawIds = citiesParam.split(',').map((s) => s.trim().toLowerCase());
      }
    }

    if (rawIds.length === 0) {
      return { ids: ['bengaluru', 'hyderabad', 'pune'], fallbackNotice: null };
    }

    // Filter to valid IDs
    const filtered = rawIds.filter((id) => validCityIds.includes(id));
    if (filtered.length < rawIds.length) {
      notice = 'One or more cities specified in the link were unrecognized and have been omitted.';
    }

    // Enforce 2-4 limit
    if (filtered.length < 2) {
      return {
        ids: ['bengaluru', 'hyderabad', 'pune'],
        fallbackNotice: 'Comparison requires at least 2 valid cities. Reset to default metros.'
      };
    }

    return {
      ids: filtered.slice(0, 4),
      fallbackNotice: notice
    };
  };

  const initial = getInitialCityIds();
  const [selectedIds, setSelectedIds] = useState<string[]>(initial.ids);
  const [bannerMessage, setBannerMessage] = useState<string | null>(initial.fallbackNotice);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync external initialCities if passed
  useEffect(() => {
    if (initialCities && initialCities.length >= 2) {
      const valid = initialCities.filter((id) => validCityIds.includes(id)).slice(0, 4);
      if (valid.length >= 2) {
        setSelectedIds(valid);
      }
    }
  }, [initialCities]);

  // Sync URL query parameters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('tab', 'compare');
      params.set('cities', selectedIds.join(','));
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [selectedIds]);

  const toggleCity = (cityId: string) => {
    if (selectedIds.includes(cityId)) {
      if (selectedIds.length <= 2) {
        setBannerMessage('Comparison requires at least 2 cities. Please select another city before removing this one.');
        return;
      }
      setSelectedIds(selectedIds.filter((id) => id !== cityId));
      setBannerMessage(null);
    } else {
      if (selectedIds.length >= 4) {
        setBannerMessage('Maximum 4 cities can be benchmarked side-by-side. Please deselect one city first.');
        return;
      }
      setSelectedIds([...selectedIds, cityId]);
      setBannerMessage(null);
    }
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

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const selectedCities = cities.filter((c) => selectedIds.includes(c.id));

  return (
    <div className="space-y-8">
      {/* Print Stylesheet */}
      <style>{`
        @media print {
          header, footer, nav, button, .no-print { display: none !important; }
          body { background: white !important; color: black !important; font-size: 10pt !important; }
          .print-only { display: block !important; }
          .page-break { page-break-before: always; }
          table { width: 100% !important; border-collapse: collapse !important; font-size: 8.5pt !important; }
          th, td { border: 1px solid #ccc !important; padding: 4px 6px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
              <span>Benchmarking Matrix</span>
              <span>•</span>
              <span className="text-amber-800 font-semibold">Cross-Metro Head-to-Head</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950 mt-1">
              City Comparator: 2 to 4 Metros
            </h1>
          </div>

          {/* Action CTAs: Copy Link & Print PDF */}
          <div className="flex items-center gap-2 self-start sm:self-auto no-print">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-300 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-xs"
              title="Copy deep-link to this exact comparison"
            >
              {copiedLink ? (
                <>
                  <CheckCheck size={13} className="text-emerald-700" />
                  <span className="text-emerald-700 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} className="text-stone-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-stone-300 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-xs"
              title="Print or Save clean 1-page PDF"
            >
              <Printer size={13} className="text-stone-500" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
          Side-by-side institutional matrix comparing GCC density, office rent, talent compensation bands, and state incentive policies. Hover any figure to inspect its underlying citation.
        </p>

        {/* Inline Dismissible Alert Banner (Replaces native browser alert) */}
        {bannerMessage && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-300 rounded-md flex items-center justify-between gap-3 text-xs text-amber-950 no-print animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-800 shrink-0" />
              <span className="font-medium">{bannerMessage}</span>
            </div>
            <button
              onClick={() => setBannerMessage(null)}
              className="text-amber-800 hover:text-amber-950 p-1 rounded"
              aria-label="Dismiss banner"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* City Selection Pills */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-2 no-print">
          <span className="text-xs font-medium text-stone-500 mr-2">
            Select 2 to 4 Metros:
          </span>
          {cities.map((city) => {
            const isSelected = selectedIds.includes(city.id);
            return (
              <button
                key={city.id}
                onClick={() => toggleCity(city.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs ring-1 ring-stone-900'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-emerald-400 text-stone-950 font-bold' : 'border border-stone-400'
                  }`}
                >
                  {isSelected && <Check size={10} strokeWidth={3} />}
                </span>
                <span>{city.name}</span>
                <span className="text-[10px] opacity-70 font-mono">
                  ({city.gcc_count_primary})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="no-print">
        <CityBarChart cities={cities} selectedCityIds={selectedIds} />
      </div>

      {/* Side-by-Side Matrix Table */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden">
        {/* Print Header */}
        <div className="hidden print:block p-4 border-b border-stone-300">
          <h2 className="text-lg font-serif font-bold text-black">
            GCC Atlas India | City Comparative Matrix Report
          </h2>
          <p className="text-xs text-stone-600 font-mono">
            Selected Metros: {selectedCities.map((c) => c.name).join(', ')} • Date: October 2026
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-800 font-mono">
                <th className="py-4 px-4 w-56 font-semibold bg-stone-100/90 sticky left-0 z-10 border-r border-stone-200">
                  Benchmarking Metric
                </th>
                {selectedCities.map((city) => (
                  <th key={city.id} className="py-4 px-4 min-w-[240px] border-r border-stone-200 last:border-r-0">
                    <div className="font-editorial text-lg font-bold text-stone-950">
                      {city.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-sans font-normal">
                      {city.state} • {city.region}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200 text-stone-800">
              {/* Primary GCC Count */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-stone-500" />
                    <span>Primary GCC Count</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Sourced corporate entities
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-xl font-bold text-stone-950">
                        <SourceTooltip
                          sourceTitle={city.gcc_count_source}
                          sourceUrl={city.gcc_count_source_url}
                          asOf={city.gcc_count_as_of}
                          note={`Estimated ~${city.units_count_estimate || 'N/A'} operating business units.`}
                        >
                          {city.gcc_count_primary?.toLocaleString()} GCCs
                        </SourceTooltip>
                      </div>
                      <ConfidenceBadge level={city.gcc_count_confidence || 'Reported'} size="sm" />
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      ~{city.units_count_estimate} units estimated
                    </span>
                  </td>
                ))}
              </tr>

              {/* Source Disparity Evidence */}
              <tr className="hover:bg-amber-50/20 bg-stone-50/30">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/80 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle size={14} className="text-amber-700" />
                    <span>Source Disparity Evidence</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Vestian vs JLL vs Flexiple
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="space-y-1.5">
                      {city.disparity_evidence?.map((ev, idx) => (
                        <div key={idx} className="text-[11px] border-l-2 border-amber-300 pl-2">
                          <span className="font-medium text-stone-900">{ev.source}: </span>
                          <strong className="text-stone-950">{ev.figure}</strong>
                          <span className="text-stone-500 block text-[10px] italic">
                            {ev.notes}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Share of New GCCs */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-stone-500" />
                    <span>Share of New GCCs</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    FY25-26 National Share
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-base font-bold text-stone-900">
                        <SourceTooltip
                          sourceTitle={city.share_source}
                          sourceUrl={city.share_source_url}
                          asOf={city.share_as_of}
                        >
                          {city.share_of_new_gccs_pct}% of all new GCCs
                        </SourceTooltip>
                      </div>
                      <ConfidenceBadge level={city.share_confidence || 'Reported'} size="sm" />
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mt-1.5 max-w-[140px] no-print">
                      <div
                        className="bg-stone-900 h-full rounded-full"
                        style={{ width: `${(city.share_of_new_gccs_pct || 0) * 2}%` }}
                      />
                    </div>
                  </td>
                ))}
              </tr>

              {/* Office Rent Range */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Landmark size={14} className="text-stone-500" />
                    <span>Office Rent Range</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    INR / sq ft / month (Grade A)
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <div className="font-mono text-sm font-bold text-stone-900">
                        <SourceTooltip
                          sourceTitle={city.office_rent.source}
                          sourceUrl={city.office_rent.source_url}
                          asOf={city.office_rent.as_of}
                          note="Grade A commercial SEZ / non-SEZ IT corridors."
                        >
                          ₹{city.office_rent.min_inr_sqft_mo} to ₹{city.office_rent.max_inr_sqft_mo}
                        </SourceTooltip>
                      </div>
                      <ConfidenceBadge level={city.office_rent.confidence || 'Reported'} size="sm" />
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      Blended Avg: <strong className="text-stone-800">₹{city.office_rent.blended_avg_inr}</strong> / sq ft / mo
                    </span>
                  </td>
                ))}
              </tr>

              {/* Typical Talent Compensation */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Wallet size={14} className="text-stone-500" />
                    <span>Talent Cost Band</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Tech & engineering salaries
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-medium text-stone-900 text-xs">
                        <SourceTooltip
                          sourceTitle={city.talent_cost.source}
                          sourceUrl={city.talent_cost.source_url}
                          asOf={city.talent_cost.as_of}
                        >
                          {city.talent_cost.level}
                        </SourceTooltip>
                      </div>
                      <ConfidenceBadge level={city.talent_cost.confidence || 'Estimated'} size="sm" />
                    </div>

                    <div className="text-[11px] font-mono text-stone-700 space-y-0.5 pt-1">
                      <div>Junior SWE: <span className="font-semibold text-stone-950">{city.talent_cost.junior_swe_lpa}</span></div>
                      <div>Senior Lead: <span className="font-semibold text-stone-950">{city.talent_cost.senior_lead_lpa}</span></div>
                      <div>Director / VP: <span className="font-semibold text-stone-950">{city.talent_cost.director_lpa}</span></div>
                    </div>

                    <div className="pt-1 text-[11px]">
                      <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium">
                        {city.talent_cost.discount_vs_bengaluru_pct === 0
                          ? 'Baseline (0% discount)'
                          : `${city.talent_cost.discount_vs_bengaluru_pct}% discount vs Bengaluru`}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* State GCC Incentives */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-stone-500" />
                    <span>State GCC Incentives</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Statutory policy highlights
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0 space-y-1.5">
                    <div className="flex items-center justify-between gap-1">
                      <div className="font-semibold text-stone-900">
                        <a
                          href={city.state_incentives.policy_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1 text-sky-900"
                        >
                          {city.state_incentives.policy_name}
                          <ExternalLink size={11} className="no-print" />
                        </a>
                      </div>
                      <ConfidenceBadge level={city.state_incentives.confidence || 'Verified'} size="sm" />
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {city.state_incentives.summary}
                    </p>
                    <div className="text-[10px] space-y-0.5 text-stone-500 pt-1 border-t border-stone-100 font-mono">
                      <div>⚡ Power: {city.state_incentives.power_tariff_subsidy || 'Not specified'}</div>
                      <div>🏛️ Stamp Duty: {city.state_incentives.stamp_duty_exemption || 'Not specified'}</div>
                      <div>👥 Skilling Grant: {city.state_incentives.employment_grant || 'Not specified'}</div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Key Sectors */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-stone-500" />
                    <span>Key Sectors</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Proven domain depth
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <ul className="space-y-1 text-stone-700">
                      {city.key_sectors.map((sec, idx) => (
                        <li key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />
                          <span>{sec}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Top Anchor Employers */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <Building size={14} className="text-stone-500" />
                    <span>Anchor Employers</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Peer GCC anchors
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      {city.top_employers.map((emp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200/60"
                        >
                          {emp}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Primary Micro Markets */}
              <tr className="hover:bg-amber-50/20">
                <td className="py-3 px-4 font-semibold text-stone-900 bg-stone-50/60 sticky left-0 border-r border-stone-200">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-stone-500" />
                    <span>Micro-Market Clusters</span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-normal block mt-0.5">
                    Core office tech parks
                  </span>
                </td>
                {selectedCities.map((city) => (
                  <td key={city.id} className="py-3 px-4 border-r border-stone-200 last:border-r-0">
                    <div className="space-y-1 text-[11px] text-stone-600 font-mono">
                      {city.key_micro_markets.map((mm, idx) => (
                        <div key={idx}>• {mm}</div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Print Footnote */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between font-mono">
          <span>GCC Atlas India • Sources: Nasscom-Zinnov, JLL India, Vestian, State Gazettes</span>
          <span>Data As of Q1 2026 • Every number sourced</span>
        </div>
      </div>
    </div>
  );
};
