export type ConfidenceLevel = 'Verified' | 'Reported' | 'Estimated';

export interface GCC {
  id: string;
  company: string;
  parent_hq_country: string;
  city: string;
  secondary_cities?: string[];
  sector: string;
  year_established: number | null;
  approx_headcount: number | null;
  headcount_display: string | null;
  functions: string[];
  confidence: ConfidenceLevel;
  confidence_justification?: string;
  source_title: string;
  source_url: string;
  as_of: string;
  micro_market?: string;
  notes?: string;
}

export interface DisparityEvidence {
  source: string;
  figure: string;
  market_share?: string;
  url: string;
  as_of: string;
  notes: string;
}

export interface OfficeRent {
  min_inr_sqft_mo: number;
  max_inr_sqft_mo: number;
  blended_avg_inr: number;
  unit: string;
  source: string;
  source_url: string;
  as_of: string;
  confidence?: ConfidenceLevel;
}

export interface TalentCost {
  level: string;
  discount_vs_bengaluru_pct: number;
  junior_swe_lpa: string;
  senior_lead_lpa: string;
  director_lpa: string;
  source: string;
  source_url: string;
  as_of: string;
  confidence?: ConfidenceLevel;
}

export interface StateIncentives {
  policy_name: string;
  policy_url: string;
  as_of: string;
  summary: string;
  power_tariff_subsidy: string | null;
  stamp_duty_exemption: string | null;
  employment_grant: string | null;
  confidence?: ConfidenceLevel;
}

export interface CityScoreMetrics {
  cost_efficiency: number;
  talent_depth: number;
  speed_to_hire: number;
  incentives: number;
  ecosystem_maturity: number;
}

export interface City {
  id: string;
  name: string;
  state: string;
  region: string;
  tagline: string;
  gcc_count_primary: number | null;
  gcc_count_source: string;
  gcc_count_source_url: string;
  gcc_count_as_of: string;
  gcc_count_confidence?: ConfidenceLevel;
  units_count_estimate?: number | null;
  disparity_evidence: DisparityEvidence[];
  share_of_new_gccs_pct: number | null;
  share_source: string;
  share_source_url: string;
  share_as_of: string;
  share_confidence?: ConfidenceLevel;
  office_rent: OfficeRent;
  talent_cost: TalentCost;
  state_incentives: StateIncentives;
  key_sectors: string[];
  top_employers: string[];
  key_micro_markets: string[];
  score_metrics: CityScoreMetrics;
}

export type ActiveTab = 'home' | 'registry' | 'compare' | 'recommender' | 'about' | 'deck';

export interface FilterState {
  search: string;
  city: string;
  sector: string;
  yearMin: number | '';
  yearMax: number | '';
  confidence: string;
  functionFilter: string;
  sortBy: 'company' | 'headcount' | 'year' | 'city';
  sortOrder: 'asc' | 'desc';
}

export interface RecommenderAnswers {
  sector: string;
  teamSize: string;
  mainFunction: string;
  priority: 'cost' | 'talent' | 'speed' | 'incentives';
}

export interface ScoredCityResult {
  city: City;
  rank: number;
  totalScore: number;
  breakdown: {
    baseScore: number;
    sectorFitBonus: number;
    functionFitBonus: number;
    priorityWeightScore: number;
    scalePenaltyOrBonus: number;
  };
  reasons: string[];
  caveats: string[];
}
