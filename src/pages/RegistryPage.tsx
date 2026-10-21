import React, { useState, useMemo, useEffect } from 'react';
import { GCC } from '../types';
import { ConfidenceBadge } from '../components/ConfidenceBadge';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import {
  Search,
  ArrowUpDown,
  ExternalLink,
  ChevronRight,
  Download,
  RotateCcw,
  Building,
  Globe2,
  Info,
  X,
  MapPin
} from 'lucide-react';

interface RegistryPageProps {
  gccList: GCC[];
  onSelectGCC: (gcc: GCC) => void;
  initialCityFilter?: string;
}

const KEY_CORRIDORS = [
  { label: 'All Corridors', value: 'All' },
  { label: 'Outer Ring Road (BLR)', value: 'Outer Ring Road' },
  { label: 'HITEC City (HYD)', value: 'HITEC' },
  { label: 'DLF Cyber City (NCR)', value: 'Cyber City' },
  { label: 'Hinjawadi / Kharadi (PUN)', value: 'Hinjawadi' },
  { label: 'OMR / Taramani (CHE)', value: 'Taramani' },
  { label: 'BKC / Powai (MUM)', value: 'BKC' }
];

export const RegistryPage: React.FC<RegistryPageProps> = ({
  gccList,
  onSelectGCC,
  initialCityFilter
}) => {
  // Read initial query params from URL if present
  const getInitialParams = () => {
    if (typeof window === 'undefined') {
      return {
        search: '',
        city: initialCityFilter || 'All',
        sector: 'All',
        confidence: 'All',
        yearMin: '',
        yearMax: '',
        includeUnknownYear: false,
        functionFilter: 'All',
        microMarketFilter: 'All',
        sortBy: 'headcount' as const,
        sortOrder: 'desc' as const
      };
    }

    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('q') || '',
      city: params.get('city') || initialCityFilter || 'All',
      sector: params.get('sector') || 'All',
      confidence: params.get('conf') || 'All',
      yearMin: params.get('ymin') || '',
      yearMax: params.get('ymax') || '',
      includeUnknownYear: params.get('unkyear') === '1',
      functionFilter: params.get('fn') || 'All',
      microMarketFilter: params.get('mm') || 'All',
      sortBy: (params.get('sort') as any) || 'headcount',
      sortOrder: (params.get('order') as any) || 'desc'
    };
  };

  const initial = getInitialParams();

  const [search, setSearch] = useState(initial.search);
  const [cityFilter, setCityFilter] = useState(initial.city);
  const [sectorFilter, setSectorFilter] = useState(initial.sector);
  const [confidenceFilter, setConfidenceFilter] = useState(initial.confidence);
  const [yearMin, setYearMin] = useState<number | ''>(initial.yearMin ? Number(initial.yearMin) : '');
  const [yearMax, setYearMax] = useState<number | ''>(initial.yearMax ? Number(initial.yearMax) : '');
  const [includeUnknownYear, setIncludeUnknownYear] = useState<boolean>(initial.includeUnknownYear);
  const [functionFilter, setFunctionFilter] = useState(initial.functionFilter);
  const [microMarketFilter, setMicroMarketFilter] = useState(initial.microMarketFilter);
  const [sortBy, setSortBy] = useState<'company' | 'headcount' | 'year' | 'city'>(initial.sortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initial.sortOrder);
  const [pageSize, setPageSize] = useState<number>(30);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showCoverageNotice, setShowCoverageNotice] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 120);
    return () => clearTimeout(timer);
  }, []);

  // Sync state to URL for deep linking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (cityFilter !== 'All') params.set('city', cityFilter);
      if (sectorFilter !== 'All') params.set('sector', sectorFilter);
      if (confidenceFilter !== 'All') params.set('conf', confidenceFilter);
      if (yearMin !== '') params.set('ymin', String(yearMin));
      if (yearMax !== '') params.set('ymax', String(yearMax));
      if (includeUnknownYear) params.set('unkyear', '1');
      if (functionFilter !== 'All') params.set('fn', functionFilter);
      if (microMarketFilter !== 'All') params.set('mm', microMarketFilter);
      if (sortBy !== 'headcount') params.set('sort', sortBy);
      if (sortOrder !== 'desc') params.set('order', sortOrder);

      const newQuery = params.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}${window.location.hash}`;
      window.history.replaceState({}, '', newUrl);
    }
  }, [search, cityFilter, sectorFilter, confidenceFilter, yearMin, yearMax, includeUnknownYear, functionFilter, microMarketFilter, sortBy, sortOrder]);

  // Handle external city filter prop change
  useEffect(() => {
    if (initialCityFilter) {
      setCityFilter(initialCityFilter);
      setCurrentPage(1);
    }
  }, [initialCityFilter]);

  // Derived unique lists for dropdowns
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    gccList.forEach((g) => {
      if (g.city) set.add(g.city);
    });
    return Array.from(set).sort();
  }, [gccList]);

  const availableSectors = useMemo(() => {
    const set = new Set<string>();
    gccList.forEach((g) => {
      if (g.sector) set.add(g.sector);
    });
    return Array.from(set).sort();
  }, [gccList]);

  const availableFunctions = useMemo(() => {
    const set = new Set<string>();
    gccList.forEach((g) => {
      g.functions?.forEach((f) => set.add(f));
    });
    return Array.from(set).sort();
  }, [gccList]);

  const isYearFilterActive = yearMin !== '' || yearMax !== '';

  // Filtering logic
  const filteredList = useMemo(() => {
    return gccList.filter((gcc) => {
      // Text search
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesCompany = gcc.company.toLowerCase().includes(q);
        const matchesHQ = gcc.parent_hq_country.toLowerCase().includes(q);
        const matchesCity = gcc.city.toLowerCase().includes(q);
        const matchesSector = gcc.sector.toLowerCase().includes(q);
        const matchesMicro = gcc.micro_market?.toLowerCase().includes(q) || false;
        const matchesNotes = gcc.notes?.toLowerCase().includes(q) || false;
        const matchesFn = gcc.functions?.some((f) => f.toLowerCase().includes(q)) || false;

        if (!matchesCompany && !matchesHQ && !matchesCity && !matchesSector && !matchesMicro && !matchesNotes && !matchesFn) {
          return false;
        }
      }

      // City filter
      if (cityFilter !== 'All') {
        const isPrimary = gcc.city.toLowerCase() === cityFilter.toLowerCase();
        const isSecondary = gcc.secondary_cities?.some((c) => c.toLowerCase() === cityFilter.toLowerCase()) || false;
        if (!isPrimary && !isSecondary) return false;
      }

      // Sector filter
      if (sectorFilter !== 'All' && gcc.sector !== sectorFilter) {
        return false;
      }

      // Confidence filter
      if (confidenceFilter !== 'All' && gcc.confidence !== confidenceFilter) {
        return false;
      }

      // Function filter
      if (functionFilter !== 'All') {
        if (!gcc.functions || !gcc.functions.includes(functionFilter)) {
          return false;
        }
      }

      // Micro-market filter
      if (microMarketFilter !== 'All') {
        if (!gcc.micro_market || !gcc.micro_market.toLowerCase().includes(microMarketFilter.toLowerCase())) {
          return false;
        }
      }

      // Year range filter with explicit unknown year handling
      if (isYearFilterActive) {
        if (gcc.year_established == null) {
          if (!includeUnknownYear) return false;
        } else {
          if (yearMin !== '' && gcc.year_established < Number(yearMin)) return false;
          if (yearMax !== '' && gcc.year_established > Number(yearMax)) return false;
        }
      }

      return true;
    });
  }, [gccList, search, cityFilter, sectorFilter, confidenceFilter, functionFilter, microMarketFilter, isYearFilterActive, includeUnknownYear, yearMin, yearMax]);

  // Compute count of records matching other filters but hidden solely due to unknown year
  const hiddenUnknownYearCount = useMemo(() => {
    if (!isYearFilterActive || includeUnknownYear) return 0;
    return gccList.filter((gcc) => {
      if (gcc.year_established != null) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesCompany = gcc.company.toLowerCase().includes(q);
        const matchesHQ = gcc.parent_hq_country.toLowerCase().includes(q);
        const matchesCity = gcc.city.toLowerCase().includes(q);
        const matchesSector = gcc.sector.toLowerCase().includes(q);
        const matchesMicro = gcc.micro_market?.toLowerCase().includes(q) || false;
        const matchesNotes = gcc.notes?.toLowerCase().includes(q) || false;
        const matchesFn = gcc.functions?.some((f) => f.toLowerCase().includes(q)) || false;
        if (!matchesCompany && !matchesHQ && !matchesCity && !matchesSector && !matchesMicro && !matchesNotes && !matchesFn) {
          return false;
        }
      }
      if (cityFilter !== 'All') {
        const isPrimary = gcc.city.toLowerCase() === cityFilter.toLowerCase();
        const isSecondary = gcc.secondary_cities?.some((c) => c.toLowerCase() === cityFilter.toLowerCase()) || false;
        if (!isPrimary && !isSecondary) return false;
      }
      if (sectorFilter !== 'All' && gcc.sector !== sectorFilter) return false;
      if (confidenceFilter !== 'All' && gcc.confidence !== confidenceFilter) return false;
      if (functionFilter !== 'All' && (!gcc.functions || !gcc.functions.includes(functionFilter))) return false;
      if (microMarketFilter !== 'All' && (!gcc.micro_market || !gcc.micro_market.toLowerCase().includes(microMarketFilter.toLowerCase()))) return false;
      return true;
    }).length;
  }, [gccList, isYearFilterActive, includeUnknownYear, search, cityFilter, sectorFilter, confidenceFilter, functionFilter, microMarketFilter]);

  const unknownYearIncludedCount = useMemo(() => {
    if (!isYearFilterActive || !includeUnknownYear) return 0;
    return filteredList.filter((gcc) => gcc.year_established == null).length;
  }, [filteredList, isYearFilterActive, includeUnknownYear]);

  // Sorting logic
  const sortedList = useMemo(() => {
    const list = [...filteredList];
    list.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'company') {
        comparison = a.company.localeCompare(b.company);
      } else if (sortBy === 'headcount') {
        const countA = a.approx_headcount ?? -1;
        const countB = b.approx_headcount ?? -1;
        comparison = countA - countB;
      } else if (sortBy === 'year') {
        const yearA = a.year_established ?? -1;
        const yearB = b.year_established ?? -1;
        comparison = yearA - yearB;
      } else if (sortBy === 'city') {
        comparison = a.city.localeCompare(b.city);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return list;
  }, [filteredList, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedList.length / pageSize) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedList.slice(start, start + pageSize);
  }, [sortedList, currentPage, pageSize]);

  const handleSortToggle = (field: 'company' | 'headcount' | 'year' | 'city') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'company' || field === 'city' ? 'asc' : 'desc');
    }
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSearch('');
    setCityFilter('All');
    setSectorFilter('All');
    setConfidenceFilter('All');
    setYearMin('');
    setYearMax('');
    setIncludeUnknownYear(false);
    setFunctionFilter('All');
    setMicroMarketFilter('All');
    setSortBy('headcount');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  // Export filtered list to CSV
  const exportToCSV = () => {
    const headers = [
      'ID',
      'Company',
      'HQ Country',
      'City',
      'Sector',
      'Year Established',
      'Headcount Display',
      'Approx Headcount',
      'Functions',
      'Confidence',
      'Source Title',
      'Source URL',
      'As Of',
      'Micro Market',
      'Notes'
    ];

    const rows = sortedList.map((g) => [
      `"${g.id}"`,
      `"${g.company.replace(/"/g, '""')}"`,
      `"${g.parent_hq_country}"`,
      `"${g.city}"`,
      `"${g.sector}"`,
      `"${g.year_established || ''}"`,
      `"${g.headcount_display || ''}"`,
      `"${g.approx_headcount || ''}"`,
      `"${g.functions?.join('; ') || ''}"`,
      `"${g.confidence}"`,
      `"${g.source_title.replace(/"/g, '""')}"`,
      `"${g.source_url}"`,
      `"${g.as_of}"`,
      `"${g.micro_market || ''}"`,
      `"${(g.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `gcc_atlas_india_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-500">
            <span>Entity-Level Database</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{gccList.length} Verified Entries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-950 mt-1">
            Global Capability Centres Registry
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
            Searchable, sortable index of MNC capability centers in India. Click any row to inspect operating micro-markets, functions, and primary source citations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-stone-300 bg-white text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors shadow-xs"
            title="Export filtered records to CSV"
          >
            <Download size={13} className="text-stone-500" />
            Export CSV ({sortedList.length})
          </button>
        </div>
      </div>

      {/* Dismissible Data Coverage Note */}
      {showCoverageNotice && (
        <div className="bg-amber-50/80 border border-amber-200/90 rounded-lg p-3.5 text-xs text-amber-950 flex items-start justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <Info size={16} className="text-amber-800 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-semibold text-amber-900">Curated Dataset Scope & Sample Notice: </strong>
              This registry indexes a verified sample of {gccList.length} established MNC capability centres with primary corporate disclosures or reported citations. It represents anchor operations, not the full national universe of 2,117 GCCs (Nasscom-Zinnov FY26 benchmark). Every number and entity is directly traceable to corporate filings, jobs portals, or named press reports.
            </div>
          </div>
          <button
            onClick={() => setShowCoverageNotice(false)}
            className="text-amber-700 hover:text-amber-950 p-1 rounded hover:bg-amber-100 transition-colors shrink-0"
            title="Dismiss notice"
            aria-label="Dismiss notice"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Filter Bar Controls */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 shadow-xs space-y-3">
        {/* Row 1: Search & Major Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="lg:col-span-2 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search company, tech park, or keyword..."
              className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-stone-50/50"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                ×
              </button>
            )}
          </div>

          {/* City Selector */}
          <div>
            <select
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-stone-800"
            >
              <option value="All">All Cities (All India)</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Selector */}
          <div>
            <select
              value={sectorFilter}
              onChange={(e) => {
                setSectorFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-stone-800"
            >
              <option value="All">All Sectors</option>
              {availableSectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Confidence Tag Filter */}
          <div>
            <select
              value={confidenceFilter}
              onChange={(e) => {
                setConfidenceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white text-stone-800"
            >
              <option value="All">All Confidence Tags</option>
              <option value="Verified">Verified Only (Filings)</option>
              <option value="Reported">Reported (Press / News)</option>
              <option value="Estimated">Estimated (Derived)</option>
            </select>
          </div>
        </div>

        {/* Micro-market quick corridors */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-mono text-stone-500 uppercase tracking-wider mr-1 flex items-center gap-1">
            <MapPin size={11} className="text-stone-400" />
            Quick Corridors:
          </span>
          {KEY_CORRIDORS.map((corridor) => {
            const isSelected = microMarketFilter.toLowerCase() === corridor.value.toLowerCase();
            return (
              <button
                key={corridor.value}
                onClick={() => {
                  setMicroMarketFilter(corridor.value);
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                {corridor.label}
              </button>
            );
          })}
        </div>

        {/* Row 2: Secondary Filters & Clear Button */}
        <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Year established range */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Year Est:</span>
              <input
                type="number"
                placeholder="Min (e.g. 1995)"
                value={yearMin}
                onChange={(e) => {
                  setYearMin(e.target.value ? Number(e.target.value) : '');
                  setCurrentPage(1);
                }}
                className="w-24 px-2 py-1 border border-stone-300 rounded text-xs"
              />
              <span className="text-stone-400">to</span>
              <input
                type="number"
                placeholder="Max (2026)"
                value={yearMax}
                onChange={(e) => {
                  setYearMax(e.target.value ? Number(e.target.value) : '');
                  setCurrentPage(1);
                }}
                className="w-24 px-2 py-1 border border-stone-300 rounded text-xs"
              />
            </div>

            {/* Unknown year inclusion checkbox */}
            <label className="inline-flex items-center gap-1.5 text-[11px] text-stone-700 cursor-pointer select-none bg-stone-50 hover:bg-stone-100 px-2.5 py-1 rounded border border-stone-200 transition-colors">
              <input
                type="checkbox"
                checked={includeUnknownYear}
                onChange={(e) => {
                  setIncludeUnknownYear(e.target.checked);
                  setCurrentPage(1);
                }}
                className="rounded border-stone-300 text-stone-900 focus:ring-stone-900 h-3.5 w-3.5"
              />
              <span>Include records with unknown year</span>
            </label>

            {/* Function filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Capability:</span>
              <select
                value={functionFilter}
                onChange={(e) => {
                  setFunctionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-2 py-1 border border-stone-300 rounded text-xs bg-white"
              >
                <option value="All">All Capabilities</option>
                {availableFunctions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-500 font-mono text-[11px]">
              Showing <strong>{sortedList.length}</strong> of {gccList.length} entities
              {isYearFilterActive && !includeUnknownYear && hiddenUnknownYearCount > 0 && (
                <span className="text-amber-800 font-medium ml-1.5 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  ({hiddenUnknownYearCount} hidden for unknown year)
                </span>
              )}
              {isYearFilterActive && includeUnknownYear && unknownYearIncludedCount > 0 && (
                <span className="text-emerald-800 font-medium ml-1.5 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  (including {unknownYearIncludedCount} with unknown year)
                </span>
              )}
            </span>

            {(search ||
              cityFilter !== 'All' ||
              sectorFilter !== 'All' ||
              confidenceFilter !== 'All' ||
              functionFilter !== 'All' ||
              microMarketFilter !== 'All' ||
              yearMin !== '' ||
              yearMax !== '' ||
              includeUnknownYear) && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-xs text-amber-900 hover:text-stone-900 font-medium underline underline-offset-2"
              >
                <RotateCcw size={11} /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-stone-700 font-mono select-none">
                {/* Company & HQ */}
                <th
                  onClick={() => handleSortToggle('company')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:bg-stone-200/70 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Company & Parent HQ</span>
                    <ArrowUpDown size={12} className={sortBy === 'company' ? 'text-stone-900' : 'text-stone-400'} />
                  </div>
                </th>

                {/* Primary City */}
                <th
                  onClick={() => handleSortToggle('city')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:bg-stone-200/70 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Primary City</span>
                    <ArrowUpDown size={12} className={sortBy === 'city' ? 'text-stone-900' : 'text-stone-400'} />
                  </div>
                </th>

                {/* Sector */}
                <th className="py-3 px-4 font-semibold">Sector</th>

                {/* Established Year */}
                <th
                  onClick={() => handleSortToggle('year')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:bg-stone-200/70 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Established</span>
                    <ArrowUpDown size={12} className={sortBy === 'year' ? 'text-stone-900' : 'text-stone-400'} />
                  </div>
                </th>

                {/* Headcount */}
                <th
                  onClick={() => handleSortToggle('headcount')}
                  className="py-3 px-4 font-semibold cursor-pointer hover:bg-stone-200/70 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Approx Headcount</span>
                    <ArrowUpDown size={12} className={sortBy === 'headcount' ? 'text-stone-900' : 'text-stone-400'} />
                  </div>
                </th>

                {/* Functions */}
                <th className="py-3 px-4 font-semibold">Key Functions</th>

                {/* Confidence Tag */}
                <th className="py-3 px-4 font-semibold text-center">Confidence</th>

                {/* Source Link */}
                <th className="py-3 px-4 font-semibold text-center">Source Citation</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-200">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center space-y-3">
                    <Building size={32} className="mx-auto text-stone-300" />
                    <p className="text-sm font-editorial font-bold text-stone-800">
                      No Global Capability Centres match your active filters.
                    </p>
                    <p className="text-xs text-stone-500 max-w-sm mx-auto">
                      Try broadening your search term or resetting the city and sector parameters.
                    </p>
                    <button
                      onClick={resetAllFilters}
                      className="px-3 py-1.5 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedList.map((gcc) => (
                  <tr
                    key={gcc.id}
                    onClick={() => onSelectGCC(gcc)}
                    className="hover:bg-amber-50/40 cursor-pointer transition-colors group"
                  >
                    {/* Company & HQ */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-950 group-hover:text-stone-900 flex items-center gap-1.5">
                        <span>{gcc.company}</span>
                        <ChevronRight size={13} className="text-stone-300 group-hover:text-stone-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <Globe2 size={11} className="text-stone-400" />
                        <span>HQ: {gcc.parent_hq_country}</span>
                      </div>
                    </td>

                    {/* City */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-900">{gcc.city}</div>
                      {gcc.micro_market && (
                        <div className="text-[10px] text-stone-500 truncate max-w-[140px] font-mono">
                          {gcc.micro_market}
                        </div>
                      )}
                    </td>

                    {/* Sector */}
                    <td className="py-3 px-4">
                      <span className="text-stone-800 font-medium">{gcc.sector}</span>
                    </td>

                    {/* Established Year */}
                    <td className="py-3 px-4 text-right font-mono text-stone-700">
                      {gcc.year_established || (
                        <span className="text-stone-400 italic text-[11px]">Not available yet</span>
                      )}
                    </td>

                    {/* Headcount */}
                    <td className="py-3 px-4 text-right">
                      {gcc.headcount_display ? (
                        <span className="font-mono font-semibold text-stone-900">
                          {gcc.headcount_display}
                        </span>
                      ) : gcc.approx_headcount ? (
                        <span className="font-mono font-semibold text-stone-900">
                          {gcc.approx_headcount.toLocaleString()}+
                        </span>
                      ) : (
                        <span className="text-stone-400 italic text-[11px]">Not available yet</span>
                      )}
                    </td>

                    {/* Functions */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {gcc.functions && gcc.functions.length > 0 ? (
                          gcc.functions.slice(0, 2).map((fn, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded text-[10px] bg-stone-100 text-stone-700 border border-stone-200/70"
                            >
                              {fn}
                            </span>
                          ))
                        ) : (
                          <span className="text-stone-400 italic text-[11px]">Not available yet</span>
                        )}
                        {gcc.functions && gcc.functions.length > 2 && (
                          <span className="text-[10px] text-stone-500 font-mono">
                            +{gcc.functions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Confidence Tag */}
                    <td className="py-3 px-4 text-center">
                      <ConfidenceBadge
                        level={gcc.confidence}
                        size="sm"
                        tooltipText={gcc.confidence_justification}
                      />
                    </td>

                    {/* Source Citation Link */}
                    <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      {gcc.source_url ? (
                        <a
                          href={gcc.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-800 hover:text-sky-950 hover:underline"
                          title={`${gcc.source_title} (${gcc.as_of})`}
                        >
                          <span>Check</span>
                          <ExternalLink size={11} />
                        </a>
                      ) : (
                        <span className="text-stone-400 text-[10px] italic">Pending URL</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="bg-stone-50 px-4 py-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 border border-stone-300 rounded text-xs bg-white"
            >
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={150}>Show All ({gccList.length})</option>
            </select>
            <span className="text-stone-400 font-mono">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="px-2.5 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100"
            >
              Previous
            </button>
            <span className="px-2 text-stone-800 font-bold">
              {currentPage}
            </span>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="px-2.5 py-1 rounded border border-stone-300 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
