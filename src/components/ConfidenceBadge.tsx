import React from 'react';
import { ShieldCheck, Newspaper, Calculator } from 'lucide-react';
import { ConfidenceLevel } from '../types';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  tooltipText?: string;
  onClick?: () => void;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  tooltipText,
  onClick
}) => {
  const getBadgeConfig = () => {
    switch (level) {
      case 'Verified':
        return {
          bg: 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-1 ring-emerald-600/10',
          dot: 'bg-emerald-600',
          icon: ShieldCheck,
          label: 'Verified',
          desc: 'Verified by corporate regulatory filing (10-K / MCA) or official company statement'
        };
      case 'Reported':
        return {
          bg: 'bg-sky-50 text-sky-900 border-sky-300 ring-1 ring-sky-600/10',
          dot: 'bg-sky-600',
          icon: Newspaper,
          label: 'Reported',
          desc: 'Reported in named financial or technology news publication (ET, Reuters, Mint, etc.)'
        };
      case 'Estimated':
      default:
        return {
          bg: 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-600/10',
          dot: 'bg-amber-600',
          icon: Calculator,
          label: 'Estimated',
          desc: 'Derived from real estate leasing records, LinkedIn footprint, or industry averages'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium'
  };

  const iconSizes = {
    sm: 12,
    md: 13,
    lg: 15
  };

  return (
    <span
      onClick={onClick}
      title={tooltipText || config.desc}
      className={`inline-flex items-center rounded-full border transition-all duration-150 select-none ${config.bg} ${sizeClasses[size]} ${onClick ? 'cursor-pointer hover:shadow-sm' : ''}`}
    >
      {showIcon && <Icon size={iconSizes[size]} className="shrink-0 stroke-[2.2]" />}
      <span>{config.label}</span>
    </span>
  );
};
