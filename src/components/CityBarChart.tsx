import React, { useState } from 'react';
import { City } from '../types';
import { BarChart3, TrendingUp } from 'lucide-react';

interface CityBarChartProps {
  cities: City[];
  selectedCityIds: string[];
}

export const CityBarChart: React.FC<CityBarChartProps> = ({
  cities,
  selectedCityIds
}) => {
  const [metric, setMetric] = useState<'count' | 'share'>('count');

  // Filter to selected cities (or all if none selected)
  const displayCities = cities.filter(c => selectedCityIds.includes(c.id));
  const activeList = displayCities.length > 0 ? displayCities : cities;

  const maxCount = Math.max(...activeList.map(c => c.gcc_count_primary || 0), 1000);
  const maxShare = Math.max(...activeList.map(c => c.share_of_new_gccs_pct || 0), 50);

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-5 shadow-sm space-y-4">
      {/* Header & Metric toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
            <BarChart3 size={13} className="text-amber-700" /> Comparative Density Analysis
          </span>
          <h4 className="text-base font-editorial font-bold text-stone-900">
            {metric === 'count'
              ? 'Estimated Active GCC Count by City'
              : 'Share of Newly Established GCCs (FY25–26 %)'}
          </h4>
        </div>

        <div className="inline-flex rounded-md border border-stone-200 p-0.5 bg-stone-100 text-xs">
          <button
            onClick={() => setMetric('count')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              metric === 'count'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Total GCC Count
          </button>
          <button
            onClick={() => setMetric('share')}
            className={`px-3 py-1 rounded font-medium transition-colors ${
              metric === 'share'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            New GCC Share (%)
          </button>
        </div>
      </div>

      {/* SVG / Flex Bar Chart */}
      <div className="pt-2">
        <div className="space-y-4">
          {activeList.map((city) => {
            const count = city.gcc_count_primary || 0;
            const share = city.share_of_new_gccs_pct || 0;
            const pctWidth = metric === 'count'
              ? Math.max(6, (count / maxCount) * 100)
              : Math.max(6, (share / maxShare) * 100);

            return (
              <div key={city.id} className="group">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-sm">
                      {city.name}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      ({city.state})
                    </span>
                  </div>

                  <div className="text-right">
                    {metric === 'count' ? (
                      <span className="font-mono font-bold text-stone-900 text-sm">
                        {count.toLocaleString()} GCCs
                        <span className="text-[11px] text-stone-500 font-normal ml-1.5">
                          (~{city.units_count_estimate || 'N/A'} units)
                        </span>
                      </span>
                    ) : (
                      <span className="font-mono font-bold text-stone-900 text-sm flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-700" />
                        {share}% of new GCCs
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-stone-100 h-6 rounded-md overflow-hidden relative border border-stone-200/80">
                  <div
                    className={`h-full transition-all duration-500 ease-out flex items-center justify-end pr-2.5 ${
                      city.id === 'bengaluru'
                        ? 'bg-stone-900 text-stone-100'
                        : city.id === 'hyderabad'
                        ? 'bg-stone-800 text-stone-100'
                        : 'bg-stone-700 text-stone-200'
                    }`}
                    style={{ width: `${pctWidth}%` }}
                  >
                    <span className="text-[10px] font-mono font-semibold tracking-wider">
                      {metric === 'count' ? `${count}` : `${share}%`}
                    </span>
                  </div>
                </div>

                <div className="mt-1 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="italic truncate max-w-sm">
                    Specialty: {city.key_sectors.slice(0, 2).join(', ')}
                  </span>
                  <span className="font-mono text-[10px]">
                    Rent: ₹{city.office_rent.blended_avg_inr} avg / sq ft
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-stone-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-stone-500">
        <span>Source: Nasscom-Zinnov GCC Pulse 2026 & Flexiple City Intelligence</span>
        <span className="font-mono">As of Q1 2026 • Verified Aggregations</span>
      </div>
    </div>
  );
};
