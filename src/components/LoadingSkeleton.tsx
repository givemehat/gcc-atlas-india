import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2 border-b border-stone-200 pb-5">
        <div className="h-4 w-48 bg-stone-200 rounded"></div>
        <div className="h-8 w-80 bg-stone-300 rounded"></div>
        <div className="h-4 w-full max-w-xl bg-stone-200 rounded"></div>
      </div>

      {/* Filter skeleton */}
      <div className="p-4 bg-white border border-stone-200 rounded-lg space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="h-9 bg-stone-100 rounded col-span-2"></div>
          <div className="h-9 bg-stone-100 rounded"></div>
          <div className="h-9 bg-stone-100 rounded"></div>
        </div>
      </div>

      {/* Table rows skeleton */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0">
            <div className="space-y-1.5 w-1/3">
              <div className="h-4 bg-stone-200 rounded w-3/4"></div>
              <div className="h-3 bg-stone-100 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-stone-100 rounded w-24"></div>
            <div className="h-4 bg-stone-100 rounded w-20"></div>
            <div className="h-6 bg-stone-200 rounded-full w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
