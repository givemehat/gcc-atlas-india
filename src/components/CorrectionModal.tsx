import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';
import { GCC } from '../types';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledGCC?: GCC | null;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  prefilledGCC
}) => {
  const [companyName, setCompanyName] = useState('');
  const [fieldToCorrect, setFieldToCorrect] = useState('Headcount');
  const [proposedValue, setProposedValue] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitterRole, setSubmitterRole] = useState('Employee');
  const [notes, setNotes] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  useEffect(() => {
    if (prefilledGCC) {
      setCompanyName(prefilledGCC.company);
      if (prefilledGCC.headcount_display) {
        setProposedValue('');
      }
    } else {
      setCompanyName('');
      setProposedValue('');
    }
    setSubmittedTicket(null);
  }, [prefilledGCC, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ticketId = `GCC-CORR-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload = {
      ticketId,
      timestamp: new Date().toISOString(),
      companyName,
      fieldToCorrect,
      proposedValue,
      sourceUrl,
      submitterName,
      submitterEmail,
      submitterRole,
      notes,
      prefilledGCCId: prefilledGCC?.id || null
    };

    // Log to console as required by specification
    console.info('[GCC Atlas Correction Report Submitted]:', payload);

    setSubmittedTicket(ticketId);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setCompanyName('');
    setProposedValue('');
    setSourceUrl('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-stone-200">
          {/* Header */}
          <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-amber-700 block">
                Single Source of Truth Protocol
              </span>
              <h3 className="text-lg font-editorial font-bold text-stone-900">
                Report a Correction or New Data
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          {submittedTicket ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} />
              </div>

              <div>
                <h4 className="text-xl font-editorial font-bold text-stone-900">
                  Correction Logged to Registry Audit Queue
                </h4>
                <p className="text-xs text-stone-500 font-mono mt-1">
                  Tracking Reference ID: <strong className="text-stone-900 font-bold">{submittedTicket}</strong>
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs text-stone-600 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Entity:</span>
                  <span className="font-semibold text-stone-900">{companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Field:</span>
                  <span className="font-semibold text-stone-900">{fieldToCorrect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-stone-500">Proposed:</span>
                  <span className="font-semibold text-stone-900 truncate max-w-[200px]">{proposedValue}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                As per our strict <strong>Neutrality Charter</strong>, changes are only merged once the referenced URL or regulatory filing is independently cross-checked. No entity can pay to alter figures.
              </p>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded hover:bg-stone-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="bg-amber-50/70 border border-amber-200/80 rounded p-3 flex gap-2.5 items-start text-xs text-amber-900">
                <ShieldAlert size={16} className="shrink-0 mt-0.5 text-amber-700" />
                <p>
                  <strong>The Sourced Standard:</strong> Every update requires a publicly verifiable source URL (company annual report, government filing, or named news release).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Company / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Barclays, Google, Boeing"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Field to Correct *
                  </label>
                  <select
                    value={fieldToCorrect}
                    onChange={(e) => setFieldToCorrect(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                  >
                    <option value="Headcount">Headcount / Size</option>
                    <option value="City">City / Location</option>
                    <option value="Micro-market">Micro-Market / Tech Park</option>
                    <option value="Year Established">Year Established</option>
                    <option value="Functions">Capabilities & Functions</option>
                    <option value="Source Link">Source Link / Citation</option>
                    <option value="New GCC Entry">Propose Entire New GCC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Relationship *
                  </label>
                  <select
                    value={submitterRole}
                    onChange={(e) => setSubmitterRole(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 bg-white"
                  >
                    <option value="Employee">GCC Employee / HR</option>
                    <option value="Executive">GCC Leadership / CXO</option>
                    <option value="Advisor">Setup Advisor / EOR</option>
                    <option value="Real Estate">Commercial Broker / Landlord</option>
                    <option value="Analyst">Industry Researcher / Press</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Proposed Verified Value *
                </label>
                <input
                  type="text"
                  required
                  value={proposedValue}
                  onChange={(e) => setProposedValue(e.target.value)}
                  placeholder="e.g. 12,000 headcount (Q1 2026 expansion)"
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Verifiable Source URL (Filing, Press Release, Report) *
                </label>
                <input
                  type="url"
                  required
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://company.com/press-release or https://economictimes.indiatimes.com/..."
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={submitterName}
                    onChange={(e) => setSubmitterName(e.target.value)}
                    placeholder="Full name"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Work Email (For verification query)
                  </label>
                  <input
                    type="email"
                    value={submitterEmail}
                    onChange={(e) => setSubmitterEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Additional Context / Citation Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Number includes only IT & Engineering units, operations unit tracked under separate PAN."
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900 resize-none"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Logs to console & triggers neutral audit.
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3 py-2 border border-stone-300 rounded text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white rounded text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                  >
                    Submit Correction <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
