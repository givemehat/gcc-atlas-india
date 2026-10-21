import React from 'react';
import { X, ExternalLink, Calendar, MapPin, Building2, Globe2, Users, Briefcase, FileCheck, AlertCircle } from 'lucide-react';
import { GCC } from '../types';
import { ConfidenceBadge } from './ConfidenceBadge';

interface GCCDetailDrawerProps {
  gcc: GCC | null;
  onClose: () => void;
  onReportCorrection: (gcc: GCC) => void;
}

export const GCCDetailDrawer: React.FC<GCCDetailDrawerProps> = ({
  gcc,
  onClose,
  onReportCorrection
}) => {
  if (!gcc) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-stone-200 flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-stone-200 bg-stone-50/70 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <ConfidenceBadge level={gcc.confidence} size="md" />
                <span className="text-xs text-stone-500 font-mono">ID: {gcc.id}</span>
              </div>
              <h2 className="text-2xl font-editorial font-bold text-stone-900 leading-tight">
                {gcc.company}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-sm text-stone-600">
                <span className="flex items-center gap-1">
                  <Globe2 size={14} className="text-stone-400" />
                  HQ: <strong className="text-stone-800">{gcc.parent_hq_country}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Briefcase size={14} className="text-stone-400" />
                  {gcc.sector}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-stone-800">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-stone-50 border border-stone-200">
              <div>
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">
                  Primary Location
                </span>
                <span className="text-base font-semibold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <MapPin size={16} className="text-stone-600" />
                  {gcc.city}
                </span>
                {gcc.micro_market && (
                  <span className="text-xs text-stone-500 block mt-0.5 font-mono">
                    {gcc.micro_market}
                  </span>
                )}
              </div>

              <div>
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">
                  India Headcount
                </span>
                <span className="text-base font-semibold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <Users size={16} className="text-stone-600" />
                  {gcc.headcount_display || (gcc.approx_headcount ? `${gcc.approx_headcount.toLocaleString()}+` : 'Not available yet')}
                </span>
                <span className="text-xs text-stone-500 block mt-0.5">
                  {gcc.approx_headcount ? 'Approximated & sourced' : 'Pending verified disclosure'}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">
                  Year Established
                </span>
                <span className="text-base font-semibold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <Calendar size={16} className="text-stone-600" />
                  {gcc.year_established || 'Not available yet'}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider block">
                  Other Campuses in India
                </span>
                <span className="text-sm font-medium text-stone-800 mt-0.5 block">
                  {gcc.secondary_cities && gcc.secondary_cities.length > 0
                    ? gcc.secondary_cities.join(', ')
                    : 'None / Standalone'}
                </span>
              </div>
            </div>

            {/* Core Functions & Capability Centers */}
            <div>
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Building2 size={15} className="text-stone-400" /> Functional Capabilities
              </h3>
              <div className="flex flex-wrap gap-2">
                {gcc.functions && gcc.functions.length > 0 ? (
                  gcc.functions.map((fn, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs rounded-md font-medium bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      {fn}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-500 italic">Not available yet</span>
                )}
              </div>
            </div>

            {/* Strategic Role & Notes */}
            {gcc.notes && (
              <div>
                <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Strategic Scope & Technical Mandate
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed bg-paper-100 p-3.5 rounded-md border border-stone-200 font-sans">
                  {gcc.notes}
                </p>
              </div>
            )}

            {/* Sourced Evidence Box */}
            <div className="p-4 rounded-lg bg-stone-900 text-stone-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <FileCheck size={14} /> Sourced Verification
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  As of: {gcc.as_of}
                </span>
              </div>

              <div>
                <p className="text-xs text-stone-400 mb-1">Primary Source:</p>
                <p className="text-sm font-medium text-stone-200">{gcc.source_title}</p>
              </div>

              {gcc.confidence_justification && (
                <div className="pt-2 border-t border-stone-800">
                  <p className="text-xs text-stone-400 mb-1">Confidence Tag Rationale:</p>
                  <p className="text-xs text-stone-300 leading-relaxed italic">
                    {gcc.confidence_justification}
                  </p>
                </div>
              )}

              {gcc.source_url && (
                <div className="pt-2">
                  <a
                    href={gcc.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors"
                  >
                    Open original source / filing <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>

            {/* Neutrality & Correction Prompt */}
            <div className="p-4 rounded-lg border border-stone-200 bg-amber-50/50 flex items-start gap-3">
              <AlertCircle size={18} className="text-amber-800 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1 text-amber-900">
                <p className="font-semibold">Notice an outdated number or incorrect city?</p>
                <p className="text-stone-600 leading-relaxed">
                  GCC Atlas is fully neutral and community-audited. If you are a company representative or researcher with a verifiable filing, submit a correction.
                </p>
                <button
                  onClick={() => onReportCorrection(gcc)}
                  className="mt-2 inline-flex items-center text-xs font-medium text-stone-900 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
                >
                  Submit a correction for {gcc.company} →
                </button>
              </div>
            </div>
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
            <span>Every GCC in India, every number sourced.</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-900 text-white rounded font-medium hover:bg-stone-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
