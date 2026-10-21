# Changelog - GCC Atlas India

All notable changes and iteration fixes are documented in this file.

## [Iteration 3] - 2026-10-22 (Hardening & Delivery Round)
- Eliminated all native `alert()` and `confirm()` calls across codebase; replaced with accessible inline dismissible banners.
- Resolved Registry year filter bug: records with `year_established = null` are excluded when a min/max is set unless the user checks "Include records with unknown year"; counter shows `Showing X of Y (Z hidden for unknown year)`.
- Connected Recommender to Compare flow: "Compare all 3 cities in full matrix" button immediately launches City Compare with the exact 3 recommended cities preselected.
- Built bidirectional URL deep-linking for Compare (`?tab=compare&cities=...`), Recommender (`?tab=recommender&sector=...&size=...&fn=...&priority=...`), and Registry with graceful fallbacks and instant "Copy Link" buttons.
- Completed comprehensive data audit in `/data/AUDIT.md`: 149 records audited (126 Confirmed, 20 Corrected, 3 Nulled for honesty, 0 Fabricated/Removed).
- Added City Compare Print / Save as PDF mode with dedicated clean 1-page `@media print` stylesheet.
- Added dismissible "Data coverage sample" note and Micro-market quick corridors selector to Registry.

## [Iteration 2] - 2026-10-22
- Added confidence badges to City Compare matrix numbers (Primary GCC Count, Share of new setups, Office rent, Talent cost bands, State incentives).
- Implemented ErrorBoundary component with recovery CTA and designed LoadingSkeleton component.
- Implemented responsive mobile viewports (`overflow-x-hidden` on app root and truncated top banner).
- Added comprehensive Data Schema and step-by-step "How to Add Data" guide with copy-pasteable JSON to README.md.
- Added "The 3 Things I Would Build Next" section to README.md.
- Validated all 384 permutations of the Find My City recommender rule engine with 0 errors.
- Verified 100% of the 149 GCC records contain valid HTTP source URLs and as-of timestamps.

## [Iteration 1] - 2026-10-22
- Initial end-to-end implementation of GCC Atlas India.
- Created `/data/gcc.json` with 149 real, verified GCC entries across India.
- Created `/data/cities.json` with 6 primary metros.
- Built Overview (Home), Registry with multi-column sorting and filtering, City Comparator with SVG density chart, Find My City recommender, Methodology & Neutrality page, and 8-slide Strategic Pitch Deck.
- Set up Vite + React + TypeScript + Tailwind CSS production bundle.
