# GCC Atlas India 🇮🇳
> 🌐 **Live Public App**: [https://givemehat.github.io/gcc-atlas-india/](https://givemehat.github.io/gcc-atlas-india/)
> 📦 **GitHub Repository**: [https://github.com/givemehat/gcc-atlas-india](https://github.com/givemehat/gcc-atlas-india)

### *The Neutral, Sourced Single Source of Truth for Global Capability Centres in India*

> **"Every GCC in India, every number sourced."**  
> *Built for an executive at a global company deciding whether and where to open a GCC in India.*

---

## 🧭 Executive Summary

India's GCC market has grown into a **$98.4B annual powerhouse**, with **2,117 active GCCs** running **3,728 units** and employing **2.36 million high-skill professionals** (*Nasscom-Zinnov FY26*). 

Yet despite its size, the ecosystem is plagued by severe **information asymmetry**. Reports from top real estate and strategy consultancies contradict each other on the exact same city:
- **Bengaluru**: Vestian reports **487 GCCs** (29%), JLL reports **900+ units** (34-39%), and Flexiple lists **~870 GCCs** (~40%).
- **Why?** Some count corporate parent entities, others count individual business units or physical campus leases, yet all are cited as if equivalent.
- **The Gap:** No report published the underlying, verifiable entity list.

**GCC Atlas India solves this problem.** It is a public, zero-paywall, entity-level reference and decision tool with **140+ real GCC records**, **6 metro deep-dives**, an auditable **4-question location recommender**, and an uncompromising **Neutrality Charter** where no entity can pay to alter rankings.

---

## ⚡ Tech Stack & Architecture

- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Design System**: Editorial Financial Product (Newsreader Serif headings, Inter sans for data, warm stone off-white palette `#FBFBF9`, deep slate `#0B132B`, emerald/sky/amber confidence badges)
- **Data Layer**: Clean, standalone JSON files at `/data/gcc.json` and `/data/cities.json` (also mirrored at `/public/data/` for external access). Zero backend dependency.
- **Visualizations**: Interactive SVG comparative density bar charts and matrix tooltips.
- **Deep-Linking**: Full URL query parameter synchronization (`?tab=registry&city=Bengaluru&sector=BFSI`).

---

## 📑 Feature & Page Walkthrough

### 1. Overview (Home)
- **Headline Sourced Stats**:
  - **2,117 GCCs** running **3,728 units** (*Nasscom-Zinnov FY26*)
  - **2.36 Million Professionals**
  - **~$98.4B Annual Revenue Output**
- **The Epistemic Disparity Panel**: Explains the root cause of why Vestian (487), JLL (900+), and Flexiple (~870) disagree on Bengaluru, contrasting parent companies vs business units.
- **Stakeholder Impact Grid**: Analyzes the pain and current workarounds for Entrant CXOs, Service Providers, and State Governments.
- **6-City Snapshot Cards**: Instant comparison of Bengaluru, Hyderabad, Pune, Chennai, Delhi NCR, and Mumbai.

### 2. Entity Registry (140+ GCCs)
- **Full Table**: Company, Parent HQ, Primary City, Sector, Year Established, Approx Headcount, Capability Functions, Confidence Tag, and Primary Source Citation.
- **Multi-Parametric Filters**:
  - Live search (company, keywords, tech parks like *DLF Cyber City*, *Bagmane*, *Hinjawadi*)
  - City filter (All, Bengaluru, Hyderabad, Pune, Chennai, Delhi NCR, Mumbai)
  - Sector filter (Tech & SaaS, BFSI & FinTech, Healthcare & Pharma, Automotive & Manufacturing, Aerospace, Retail)
  - Confidence tier (Verified, Reported, Estimated)
  - Capability function filter & Year established range sliders
- **Interactive Slide-Over Drawer**: Click any row to reveal detailed micro-market address, strategic mandate, full capability list, and source link.
- **CSV Export**: One-click download of filtered records for offline financial modeling.

### 3. City Comparator (2 to 4 Metros)
- Side-by-side benchmarking matrix across any 2 to 4 selected cities.
- **Metrics Compared**:
  - Primary GCC Count & Operating Unit Estimates
  - Disparity Evidence (Vestian vs JLL vs Flexiple)
  - Share of newly established GCCs (%)
  - Office rent ranges (INR / sq ft / month) with blended averages
  - Tech talent compensation bands (Junior SWE, Senior Lead, Director/VP in ₹ LPA) + discount vs Bengaluru baseline
  - State GCC Policies (Karnataka GCC Policy 2024-29, Telangana TS-iPASS, Tamil Nadu GCC Policy 2024, Maharashtra IT Policy)
  - Anchor employers & micro-market corridors (ORR, HITEC City, Kharadi, OMR, BKC)
- **Comparative SVG Bar Chart**: Toggle between Total GCC Density and New GCC Share.
- **Hover Citations**: Every number shows its publication source, as-of date, and link on hover.

### 4. Find My City (Deterministic Location Recommender)
- **4-Question Strategic Wizard**:
  1. *Primary Industry Sector* (Tech & SaaS, BFSI, Healthcare, Auto, Aerospace, Retail)
  2. *Planned Team Size in 3 Years* (<100, 100-500, 500-2000, 2000+)
  3. *Primary Mandate* (Core Software/AI, Finance & Risk, Hardware/R&D, Operations)
  4. *Decisive Priority (40% Weight)* (Cost Arbitrage, Talent Depth, Speed to Hire, State Subsidies)
- **Ranked Top-3 Shortlist**:
  - Rank #1, #2, and #3 with exact Match %
  - Plain-language justification tailored to the user's specific answers
  - Real peer GCCs already operating in that city
  - Honest CXO considerations & caveats (e.g. traffic on ORR, rising rents in Kokapet, BKC commercial lease premiums)
- **Transparent Mathematical Formula**:
  $$\text{Total Score} = \text{Priority Weight (40\%)} + \text{Sector Fit (25\%)} + \text{Function Fit (20\%)} + \text{Scale Factor (15\%)} + \text{Base Ecosystem}$$
  - Full point breakdown table displayed on screen.

### 5. Methodology & Neutrality
- **Confidence Taxonomy**:
  - 🟢 **Verified**: Statutory filing (SEC 10-K, MCA ROC) or official company statement.
  - 🔵 **Reported**: Tier-1 named business publication (Economic Times, Reuters, Livemint).
  - 🟠 **Estimated**: Derived from real estate square footage or LinkedIn workforce density.
- **The Neutrality Rule**: Nobody can pay to change a score, ranking, or placement.
- **Report a Correction Form**: Interactive form with input validation that logs submissions directly to the browser console (`console.info`) and issues a unique tracking reference ticket (`GCC-CORR-2026-XXXX`).

### 6. Interactive Strategic Pitch Deck (Bonus Assignment Feature)
- An 8-slide executive presentation viewer built right into the app:
  - *Slide 1*: The Claim & The Epistemic Gap
  - *Slide 2*: The Problem & Stakeholder Asymmetry
  - *Slide 3*: 7 Market Opportunities Ranked
  - *Slide 4*: The MVP Solution & Wedge
  - *Slide 5*: Positioning vs Consultants & Brokers
  - *Slide 6*: Future Monetization (Entrants never pay; advisors pay for verified intros)
  - *Slide 7*: Risk Governance & Data Integrity
  - *Slide 8*: 90-Day Execution Roadmap

---

## 🛠️ Local Development & Build

### Prerequisites
- Node.js v18+ (tested on Node v25)
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
# Opens at http://localhost:5173

# 3. Typecheck and build production bundle
npm run build
# Outputs optimized static bundle to /dist (1.0s build time)

# 4. Preview production build locally
npm run preview
```

---

## 🚀 Public Deployment Guide

The app is completely static and has zero server requirements. It can be deployed in 60 seconds:

### Deploy to Vercel
```bash
npx vercel deploy --prod
```

### Deploy to Netlify
```bash
npx netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
1. In `vite.config.ts`, add `base: '/<repo-name>/'`.
2. Push the repository to GitHub.
3. In GitHub Settings → Pages, select GitHub Actions or deploy the `/dist` folder.

---

## 🗂️ Data Schema & How to Add New GCCs

All data resides in local, human-editable JSON files:
- `data/gcc.json` (mirrored in `public/data/gcc.json`)
- `data/cities.json` (mirrored in `public/data/cities.json`)

### GCC JSON Schema
```typescript
interface GCC {
  id: string;                         // Unique slug identifier, e.g. "stripe-india-infra"
  company: string;                    // Multinational parent company name
  parent_hq_country: string;          // Country of global headquarters, e.g. "United States"
  city: string;                       // Primary Indian metro (Bengaluru, Hyderabad, Pune, Chennai, Delhi NCR, Mumbai)
  secondary_cities?: string[];        // Array of other Indian cities with active campuses
  sector: string;                     // Standardized sector (Tech & SaaS, BFSI & FinTech, Healthcare & Pharma, etc.)
  year_established: number | null;    // Year established in India (null if unverified -> renders "Not available yet")
  approx_headcount: number | null;    // Numerical headcount (null if unverified -> renders "Not available yet")
  headcount_display: string | null;   // Formatted string (e.g. "10,000+" or null)
  functions: string[];                // Functional mandates (e.g. ["AI & Search R&D", "Cloud Infrastructure"])
  confidence: "Verified" | "Reported" | "Estimated"; // Confidence tag
  confidence_justification?: string;  // Explicit explanation for the confidence tier
  source_title: string;               // Name of statutory filing or publication
  source_url: string;                 // Publicly verifiable external link (must start with https://)
  as_of: string;                      // Timestamp of data point (e.g. "Q1 2026", "FY26")
  micro_market?: string;              // Specific tech park or SEZ cluster (e.g. "Outer Ring Road (ORR)")
  notes?: string;                     // Strategic scope and technical mandates
}
```

### How to Add New GCCs (Step-by-Step)
1. Open `data/gcc.json`.
2. Append a new object to the array following the schema above.
   > **Important Data Honesty Rule:** If an exact headcount or launch year is unknown, do NOT fabricate. Set `approx_headcount: null` and `headcount_display: null`. The UI will automatically render `"Not available yet"`.
3. Copy the updated file to the public directory:
   ```bash
   cp data/gcc.json public/data/gcc.json
   ```
4. Example entry:
   ```json
   {
     "id": "datadog-india-center",
     "company": "Datadog",
     "parent_hq_country": "United States",
     "city": "Bengaluru",
     "secondary_cities": [],
     "sector": "Tech & SaaS",
     "year_established": 2024,
     "approx_headcount": null,
     "headcount_display": null,
     "functions": ["Cloud Observability", "Distributed Tracing", "SRE Platforms"],
     "confidence": "Reported",
     "confidence_justification": "Announced in The Economic Times upon establishing Bengaluru R&D footprint.",
     "source_title": "Economic Times: Datadog Sets Up R&D Engineering Hub in India",
     "source_url": "https://economictimes.indiatimes.com/tech/information-tech/datadog-expands-in-india/articleshow/108000000.cms",
     "as_of": "2025",
     "micro_market": "RMZ Ecospace, Bellandur",
     "notes": "Engineers high-throughput metric aggregation pipelines and telemetry ingest servers."
   }
   ```
5. Run `npm run build` to verify that TypeScript resolves the JSON module without warnings.

---

## 📊 Data Disclosure: Real Data, Placeholders & What to Verify

In strict compliance with the assignment rules:

### 1. What is 100% Real, Verified Data
- **National Baseline**: Nasscom-Zinnov FY26 figures (2,117 GCCs, 3,728 units, 2.36M employees, $98.4B revenue).
- **Disparity Benchmark**: Sourced figures from Vestian (487 GCCs, 29%), JLL 2026 (900+ units, 34-39%), and Flexiple (~870 GCCs) with live external URLs.
- **State GCC Policies**: Karnataka GCC Policy 2024-29, Telangana TS-iPASS framework, Tamil Nadu GCC Policy 2024, and Maharashtra IT/ITeS Policy 2023 with verified incentive clauses.
- **Commercial Office Rents**: Blended averages and min/max ranges sourced from CBRE, JLL, and Knight Frank Q4 2025 trackers.
- **GCC Entity Records**: 140+ real enterprise entries with parent headquarters, Indian city hubs, sectors, and verified citations (e.g. Google, Microsoft, Boeing, Goldman Sachs, JPMorgan, AstraZeneca, Bosch, Mercedes-Benz, Qualcomm, Siemens, Walmart, Target, etc.).

### 2. What is Kept as Null ("Not available yet")
- **Unverified Headcount**: For GCCs where the multinational enterprise has not publicly disclosed exact India headcount in regulatory 10-K filings or official press statements (e.g. Stripe India), the headcount is strictly left as `null` and displayed in the UI as *"Not available yet"* rather than fabricating numbers.
- **Historical Establishment Years**: Where exact incorporation date in India is ambiguous, it is left as `null`.

### 3. What to Verify / Next Audit Phase
- **Tier-2 GCC Expansions**: Second-center announcements in emerging hubs (Kochi, Coimbatore, Ahmedabad, Bhubaneswar).
- **Secondary PAN Entities**: Distinguishing between consolidated India employee count vs tech-only GCC headcount for conglomerates operating retail stores or manufacturing plants alongside GCCs (e.g. Amazon, Boeing).

---

## 🚀 The 3 Things I Would Build Next

1. **Automated MCA & SEZ Regulatory Filing Ingest Pipeline**:
   Build a scheduled scraper and parser for Ministry of Corporate Affairs (MCA) Form MGT-7 and ROC balance sheet filings to automatically detect when a Fortune 500 firm incorporates a new subsidiary in India, pulling director filings, paid-up capital, and registered office addresses before any press release is published.

2. **Inbound Expansion Signals & Talent Mobility Feed**:
   Monitor aggregated LinkedIn headcount deltas, senior GCC leadership departures, and commercial lease registrations across Tier-1 SEZs to alert service providers and landlords 90-120 days before a GCC formally announces a second-city expansion.

3. **Neutral RFP & Vetted Setup Partner Marketplace**:
   Allow entrant CXOs who complete the "Find My City" wizard to request quotes from top-tier, audited setup advisors, build-operate-transfer (BOT) firms, and commercial brokers. Service providers pay a success-aligned connection fee, keeping the data neutral and free for entrants forever.

---

## 👥 Product Assignment Contact
- **Applicant**: Rajnish Singh
- **Target Role**: Product Intern, Flexiple
- **Reviewers**: Hrishikesh (`hrishikesh@flexiple.com`) & Tanya (`tanya@flexiple.com`)
- **Submission Date**: 22 October 2026
