import { City, RecommenderAnswers, ScoredCityResult } from '../types';

export function calculateCityRecommendations(
  cities: City[],
  answers: RecommenderAnswers
): ScoredCityResult[] {
  const { sector, teamSize, mainFunction, priority } = answers;

  const scoredList: ScoredCityResult[] = cities.map((city) => {
    let baseScore = 0;
    let sectorFitBonus = 0;
    let functionFitBonus = 0;
    let priorityWeightScore = 0;
    let scalePenaltyOrBonus = 0;
    const reasons: string[] = [];
    const caveats: string[] = [];

    // 1. Priority Metric (40% weight -> Max 40 points)
    const metrics = city.score_metrics;
    if (priority === 'cost') {
      priorityWeightScore = metrics.cost_efficiency * 4.0; // max 40
      reasons.push(
        `Strong cost advantage: Blended office rent is ₹${city.office_rent.blended_avg_inr}/sq ft/mo with ${city.talent_cost.discount_vs_bengaluru_pct}% discount on tech compensation vs Bengaluru.`
      );
    } else if (priority === 'talent') {
      priorityWeightScore = metrics.talent_depth * 4.0;
      reasons.push(
        `Exceptional talent depth (${metrics.talent_depth}/10) with verified cluster of over ${city.gcc_count_primary || 300}+ established GCCs to hire senior leadership from.`
      );
    } else if (priority === 'speed') {
      priorityWeightScore = metrics.speed_to_hire * 4.0;
      reasons.push(
        `High hiring velocity: Proven developer density and rapid notice period mobility across tech corridors.`
      );
    } else if (priority === 'incentives') {
      priorityWeightScore = metrics.incentives * 4.0;
      reasons.push(
        `Aggressive state incentives under ${city.state_incentives.policy_name}, including ${city.state_incentives.stamp_duty_exemption || 'stamp duty waivers'}.`
      );
    }

    // 2. Sector Fit Bonus (25% weight -> Max 25 points)
    if (sector === 'Tech & SaaS') {
      if (city.id === 'bengaluru') sectorFitBonus = 25;
      else if (city.id === 'hyderabad') sectorFitBonus = 22;
      else if (city.id === 'pune') sectorFitBonus = 18;
      else if (city.id === 'chennai') sectorFitBonus = 16;
      else if (city.id === 'delhi-ncr') sectorFitBonus = 15;
      else sectorFitBonus = 12;
    } else if (sector === 'BFSI & FinTech') {
      if (city.id === 'mumbai') sectorFitBonus = 25;
      else if (city.id === 'chennai') sectorFitBonus = 22;
      else if (city.id === 'bengaluru') sectorFitBonus = 20;
      else if (city.id === 'pune') sectorFitBonus = 20;
      else if (city.id === 'delhi-ncr') sectorFitBonus = 19;
      else sectorFitBonus = 18;
    } else if (sector === 'Healthcare & Pharma') {
      if (city.id === 'hyderabad') sectorFitBonus = 25;
      else if (city.id === 'chennai') sectorFitBonus = 21;
      else if (city.id === 'bengaluru') sectorFitBonus = 18;
      else if (city.id === 'delhi-ncr') sectorFitBonus = 15;
      else sectorFitBonus = 12;
    } else if (sector === 'Automotive & Manufacturing') {
      if (city.id === 'pune') sectorFitBonus = 25;
      else if (city.id === 'chennai') sectorFitBonus = 24;
      else if (city.id === 'bengaluru') sectorFitBonus = 18;
      else if (city.id === 'delhi-ncr') sectorFitBonus = 14;
      else sectorFitBonus = 10;
    } else if (sector === 'Aerospace & Defense') {
      if (city.id === 'bengaluru') sectorFitBonus = 25;
      else if (city.id === 'hyderabad') sectorFitBonus = 20;
      else if (city.id === 'chennai') sectorFitBonus = 15;
      else sectorFitBonus = 10;
    } else if (sector === 'Retail & E-Commerce') {
      if (city.id === 'bengaluru') sectorFitBonus = 25;
      else if (city.id === 'delhi-ncr') sectorFitBonus = 21;
      else if (city.id === 'hyderabad') sectorFitBonus = 18;
      else if (city.id === 'chennai') sectorFitBonus = 16;
      else sectorFitBonus = 14;
    } else {
      sectorFitBonus = 18;
    }

    if (sectorFitBonus >= 20) {
      reasons.push(
        `Proven specialized cluster for ${sector}: Peers include ${city.top_employers.slice(0, 3).join(', ')}.`
      );
    }

    // 3. Main Function Fit (20% weight -> Max 20 points)
    if (mainFunction === 'Core Software / AI Engineering') {
      if (city.id === 'bengaluru') functionFitBonus = 20;
      else if (city.id === 'hyderabad') functionFitBonus = 18;
      else if (city.id === 'pune') functionFitBonus = 15;
      else functionFitBonus = 13;
    } else if (mainFunction === 'Finance & Risk') {
      if (city.id === 'mumbai') functionFitBonus = 20;
      else if (city.id === 'chennai') functionFitBonus = 18;
      else if (city.id === 'delhi-ncr') functionFitBonus = 18;
      else if (city.id === 'pune') functionFitBonus = 16;
      else functionFitBonus = 14;
    } else if (mainFunction === 'Hardware / Embedded / R&D') {
      if (city.id === 'bengaluru') functionFitBonus = 20;
      else if (city.id === 'pune') functionFitBonus = 19;
      else if (city.id === 'chennai') functionFitBonus = 18;
      else functionFitBonus = 12;
    } else {
      // Operations & Shared Services
      if (city.id === 'chennai') functionFitBonus = 20;
      else if (city.id === 'hyderabad') functionFitBonus = 18;
      else if (city.id === 'pune') functionFitBonus = 17;
      else if (city.id === 'delhi-ncr') functionFitBonus = 16;
      else functionFitBonus = 13;
    }

    // 4. Team Size & Scale Feasibility (15% weight -> Max 15 points)
    if (teamSize === '< 100') {
      // Seed GCC
      if (['bengaluru', 'pune', 'hyderabad'].includes(city.id)) {
        scalePenaltyOrBonus = 15;
        reasons.push(`Vibrant managed office and co-working inventory for fast agile setup under 90 days.`);
      } else {
        scalePenaltyOrBonus = 12;
      }
    } else if (teamSize === '100 - 500') {
      // Growth GCC
      if (['pune', 'hyderabad', 'chennai'].includes(city.id)) {
        scalePenaltyOrBonus = 15;
        reasons.push(`Optimal mid-scale operational stability with lower campus turnover (14-16% vs 22% industry peak).`);
      } else {
        scalePenaltyOrBonus = 12;
      }
    } else if (teamSize === '500 - 2,000') {
      // Enterprise GCC
      if (['hyderabad', 'bengaluru', 'chennai'].includes(city.id)) {
        scalePenaltyOrBonus = 15;
        reasons.push(`Abundant Grade-A commercial tech parks (HITEC City, ORR, OMR) with 500k+ sq ft floor plates.`);
      } else {
        scalePenaltyOrBonus = 11;
      }
    } else {
      // Mega Campus 2,000+
      if (city.id === 'hyderabad') {
        scalePenaltyOrBonus = 15;
        reasons.push(`Single-window land clearances (TS-iPASS) and mega infrastructure corridors (Kokapet Neopolis).`);
      } else if (city.id === 'bengaluru' || city.id === 'chennai') {
        scalePenaltyOrBonus = 14;
      } else {
        scalePenaltyOrBonus = 9;
      }
    }

    // 5. City-specific Caveats & Watchouts
    if (city.id === 'bengaluru') {
      caveats.push('Peak compensation benchmarks in India; competitive poaching in ORR and Whitefield corridors.');
      caveats.push('Peak traffic congestion on ORR requires strategic proximity planning for employee transport.');
    } else if (city.id === 'mumbai') {
      caveats.push('Highest prime commercial office rents in India (BKC ₹180-290/sq ft/mo).');
      caveats.push('Real estate availability for large campus floorplates is restricted.');
    } else if (city.id === 'hyderabad') {
      caveats.push('Commercial rents in Financial District & Kokapet have risen ~18% over the past 24 months.');
    } else if (city.id === 'chennai') {
      caveats.push('Lower supply of consumer-internet and frontier AI specialists compared to Bengaluru.');
    } else if (city.id === 'pune') {
      caveats.push('Airport international connectivity requires transit via Mumbai or Delhi for transatlantic flights.');
    } else if (city.id === 'delhi-ncr') {
      caveats.push('Cross-jurisdictional governance between Haryana (Gurugram) and UP (Noida) policies.');
    }

    baseScore = metrics.ecosystem_maturity * 1.0;
    const totalScore = Math.min(
      99,
      Math.round(baseScore + priorityWeightScore + sectorFitBonus + functionFitBonus + scalePenaltyOrBonus)
    );

    return {
      city,
      rank: 0,
      totalScore,
      breakdown: {
        baseScore: Math.round(baseScore),
        sectorFitBonus: Math.round(sectorFitBonus),
        functionFitBonus: Math.round(functionFitBonus),
        priorityWeightScore: Math.round(priorityWeightScore),
        scalePenaltyOrBonus: Math.round(scalePenaltyOrBonus)
      },
      reasons,
      caveats
    };
  });

  // Sort descending by totalScore
  scoredList.sort((a, b) => b.totalScore - a.totalScore);

  // Assign ranks
  return scoredList.map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));
}
