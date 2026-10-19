export interface ReadinessMetrics {
  totalScore: number;
  completedCount: number;
  totalChecklist: number;
  tierLabel: string;
  tierColor: string;
}

export function calculateReadinessScore(
  totalChecklistCount: number,
  completedChecklistCount: number,
  solvedProblemsCount: number
): ReadinessMetrics {
  const safeTotal = Math.max(1, totalChecklistCount);
  const safeCompleted = Math.min(safeTotal, Math.max(0, completedChecklistCount));
  const safeSolved = Math.max(0, solvedProblemsCount);

  // Weight: 50% from checklist items, 50% from actual solved problems count (up to 200 solved)
  const checklistScore = (safeCompleted / safeTotal) * 50;
  const solvedProblemScore = Math.min(50, (safeSolved / 200) * 50);
  const totalScore = Math.min(100, Math.round(checklistScore + solvedProblemScore));

  let tierLabel = 'Beginner Foundations';
  let tierColor = 'text-amber-400';
  if (totalScore >= 85) {
    tierLabel = 'Google & Tier-1 Ready';
    tierColor = 'text-emerald-400';
  } else if (totalScore >= 65) {
    tierLabel = 'Microsoft & JPMorgan Ready';
    tierColor = 'text-cyan-400';
  } else if (totalScore >= 40) {
    tierLabel = 'Interview Ready (Mid-tier)';
    tierColor = 'text-orange-400';
  }

  return {
    totalScore,
    completedCount: safeCompleted,
    totalChecklist: safeTotal,
    tierLabel,
    tierColor,
  };
}

export function getTimelineDurationLabel(
  mode: '3-months' | '6-months' | '12-months',
  phaseIndex: number
): string {
  if (mode === '3-months') {
    return `Month ${Math.min(3, Math.ceil((phaseIndex + 1) * 0.75))} (Sprint)`;
  }
  if (mode === '12-months') {
    return `Month ${(phaseIndex + 1) * 3 - 2} – ${(phaseIndex + 1) * 3} (Mastery)`;
  }
  return `Month ${phaseIndex + 1} (Recommended)`;
}
