import React, { useState } from 'react';
import { ExternalLink, Info, Calendar } from 'lucide-react';

interface SourceTooltipProps {
  sourceTitle: string;
  sourceUrl?: string;
  asOf?: string;
  note?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export const SourceTooltip: React.FC<SourceTooltipProps> = ({
  sourceTitle,
  sourceUrl,
  asOf,
  note,
  children,
  position = 'top'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-flex items-center group cursor-help"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="border-b border-dashed border-stone-400 group-hover:border-stone-800 transition-colors">
        {children}
      </span>

      {isOpen && (
        <div
          role="tooltip"
          className={`absolute z-40 w-72 p-3 bg-stone-900 text-stone-100 rounded-md shadow-xl border border-stone-700 text-xs pointer-events-auto transition-opacity duration-150 ${
            position === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              : 'top-full left-1/2 -translate-x-1/2 mt-2'
          }`}
        >
          {/* Caret */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45 border-stone-700 ${
              position === 'top'
                ? 'top-full -mt-1 border-r border-b'
                : 'bottom-full -mb-1 border-l border-t'
            }`}
          />

          <div className="space-y-1.5 text-left">
            <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wider text-amber-400">
                <Info size={11} /> Verified Citation
              </span>
              {asOf && (
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {asOf}
                </span>
              )}
            </div>

            <p className="font-medium text-stone-200 leading-snug">
              {sourceTitle}
            </p>

            {note && (
              <p className="text-[11px] text-stone-400 italic leading-relaxed border-t border-stone-800 pt-1">
                {note}
              </p>
            )}

            {sourceUrl && (
              <div className="pt-1.5 border-t border-stone-800/80 flex items-center justify-between">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  Inspect primary source <ExternalLink size={11} />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
