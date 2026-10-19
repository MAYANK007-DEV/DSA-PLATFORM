import type {
  ConfidenceLevel,
  Difficulty,
  Problem,
  ProblemStatus,
  RevisionEvent,
  UserProblemState,
} from '../types/index.ts';

/**
 * Calculates next spaced-repetition review date based on user confidence.
 * Blueprint rule:
 * - Struggled: 1 day
 * - Tough: 3 days
 * - Got it: 7 days
 * - Nailed it: 14 days
 */
export function calculateNextReviewDate(
  confidence: ConfidenceLevel,
  fromDate: Date = new Date()
): string {
  const d = new Date(fromDate.getTime());
  let daysToAdd = 1;
  switch (confidence) {
    case 'struggled':
      daysToAdd = 1;
      break;
    case 'tough':
      daysToAdd = 3;
      break;
    case 'got_it':
      daysToAdd = 7;
      break;
    case 'nailed_it':
      daysToAdd = 14;
      break;
  }
  d.setDate(d.getDate() + daysToAdd);
  return d.toISOString().split('T')[0];
}

/**
 * Determines if a review is overdue or due today.
 */
export function isOverdue(nextReviewDateStr: string, currentDate: Date = new Date()): boolean {
  if (!nextReviewDateStr) return false;
  const todayStr = currentDate.toISOString().split('T')[0];
  return nextReviewDateStr <= todayStr;
}

export interface StatsResult {
  total: number;
  solved: number;
  attempted: number;
  unsolved: number;
  progressPercent: number;
  easy: { total: number; solved: number };
  medium: { total: number; solved: number };
  hard: { total: number; solved: number };
}

/**
 * Calculates canonical deduplicated problem stats.
 */
export function getCanonicalStats(
  problemIds: string[],
  userStates: Record<string, UserProblemState>,
  problemsById: Record<string, Problem>
): StatsResult {
  // Deduplicate problemIds to guarantee canonical accuracy
  const uniqueIds = Array.from(new Set(problemIds));
  let solved = 0;
  let attempted = 0;

  const easy = { total: 0, solved: 0 };
  const medium = { total: 0, solved: 0 };
  const hard = { total: 0, solved: 0 };

  for (const id of uniqueIds) {
    const p = problemsById[id];
    const state = userStates[id];
    const isSolved = state?.status === 'solved';
    const isAttempted = state?.status === 'attempted';

    if (isSolved) solved++;
    else if (isAttempted) attempted++;

    const diff: Difficulty = p ? p.difficulty : 'Medium';
    if (diff === 'Easy') {
      easy.total++;
      if (isSolved) easy.solved++;
    } else if (diff === 'Medium') {
      medium.total++;
      if (isSolved) medium.solved++;
    } else if (diff === 'Hard') {
      hard.total++;
      if (isSolved) hard.solved++;
    }
  }

  const total = uniqueIds.length;
  const unsolved = Math.max(0, total - solved - attempted);
  const progressPercent = total > 0 ? Math.round((solved / total) * 100) : 0;

  return {
    total,
    solved,
    attempted,
    unsolved,
    progressPercent,
    easy,
    medium,
    hard,
  };
}

/**
 * Filters and aggregates problem IDs for Quick Revision sheet.
 * Includes items with confidence 'struggled' / 'tough', or overdue review dates.
 */
export function getQuickRevisionProblemIds(
  problemsById: Record<string, Problem>,
  userStates: Record<string, UserProblemState>,
  revisions: RevisionEvent[],
  currentDate: Date = new Date()
): string[] {
  const resultIds = new Set<string>();

  // Map each problem to its most recent revision
  const latestRevisionByProblem: Record<string, RevisionEvent> = {};
  for (const rev of revisions) {
    const existing = latestRevisionByProblem[rev.problemId];
    if (!existing || new Date(rev.timestamp) > new Date(existing.timestamp)) {
      latestRevisionByProblem[rev.problemId] = rev;
    }
  }

  const todayStr = currentDate.toISOString().split('T')[0];

  for (const [problemId, rev] of Object.entries(latestRevisionByProblem)) {
    if (!problemsById[problemId]) continue;
    if (rev.confidence === 'struggled' || rev.confidence === 'tough') {
      resultIds.add(problemId);
    } else if (rev.nextReviewDate && rev.nextReviewDate <= todayStr) {
      resultIds.add(problemId);
    }
  }

  // Also include attempted questions that haven't been resolved yet
  for (const [problemId, state] of Object.entries(userStates)) {
    if (problemsById[problemId] && state.status === 'attempted') {
      resultIds.add(problemId);
    }
  }

  return Array.from(resultIds);
}

/**
 * CSV Export for user problem progress and revisions.
 */
export function exportToCsv(
  problems: Problem[],
  userStates: Record<string, UserProblemState>,
  revisions: RevisionEvent[]
): string {
  const headers = [
    'Problem ID',
    'Title',
    'Difficulty',
    'Topic',
    'Pattern',
    'Status',
    'Is Favorite',
    'Notes',
    'Time Complexity',
    'Space Complexity',
    'Revisions Count',
    'Last Confidence',
    'Next Review Date',
  ];

  const latestRevByProblem: Record<string, RevisionEvent> = {};
  const revCountByProblem: Record<string, number> = {};

  for (const rev of revisions) {
    revCountByProblem[rev.problemId] = (revCountByProblem[rev.problemId] || 0) + 1;
    const existing = latestRevByProblem[rev.problemId];
    if (!existing || new Date(rev.timestamp) > new Date(existing.timestamp)) {
      latestRevByProblem[rev.problemId] = rev;
    }
  }

  const rows = problems.map((p) => {
    const state = userStates[p.id];
    const status: ProblemStatus = state ? state.status : 'unsolved';
    const isFav = state ? (state.isFavorite ? 'Yes' : 'No') : 'No';
    const notes = (state?.notes || '').replace(/"/g, '""');
    const timeC = (state?.timeComplexity || '').replace(/"/g, '""');
    const spaceC = (state?.spaceComplexity || '').replace(/"/g, '""');
    const count = revCountByProblem[p.id] || 0;
    const lastRev = latestRevByProblem[p.id];
    const conf = lastRev ? lastRev.confidence : '';
    const nextDate = lastRev ? lastRev.nextReviewDate : '';

    return [
      `"${p.id}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.difficulty}"`,
      `"${p.topic.replace(/"/g, '""')}"`,
      `"${p.pattern.replace(/"/g, '""')}"`,
      `"${status}"`,
      `"${isFav}"`,
      `"${notes}"`,
      `"${timeC}"`,
      `"${spaceC}"`,
      count,
      `"${conf}"`,
      `"${nextDate}"`,
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Parse imported CSV and reconcile into user states.
 */
export function importFromCsv(csvText: string): {
  userStates: Record<string, UserProblemState>;
  revisions: RevisionEvent[];
  updatedCount: number;
} {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return { userStates: {}, revisions: [], updatedCount: 0 };
  }

  const userStates: Record<string, UserProblemState> = {};
  const revisions: RevisionEvent[] = [];
  let updatedCount = 0;

  // Simple CSV parser for quoted fields
  const parseLine = (line: string): string[] => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current);
    return values;
  };

  const headers = parseLine(lines[0]).map((h) => h.trim());
  const idIdx = headers.indexOf('Problem ID');
  const statusIdx = headers.indexOf('Status');
  const favIdx = headers.indexOf('Is Favorite');
  const notesIdx = headers.indexOf('Notes');
  const timeCIdx = headers.indexOf('Time Complexity');
  const spaceCIdx = headers.indexOf('Space Complexity');
  const confIdx = headers.indexOf('Last Confidence');
  const nextDateIdx = headers.indexOf('Next Review Date');

  if (idIdx === -1 || statusIdx === -1) {
    return { userStates: {}, revisions: [], updatedCount: 0 };
  }

  const now = new Date().toISOString();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cols = parseLine(line);
    const problemId = cols[idIdx]?.trim();
    if (!problemId) continue;

    const rawStatus = (cols[statusIdx] || '').trim().toLowerCase();
    const status: ProblemStatus =
      rawStatus === 'solved' ? 'solved' : rawStatus === 'attempted' ? 'attempted' : 'unsolved';

    const isFav = favIdx !== -1 && cols[favIdx]?.trim().toLowerCase() === 'yes';
    const notes = notesIdx !== -1 ? cols[notesIdx] : '';
    const timeComplexity = timeCIdx !== -1 ? cols[timeCIdx] : '';
    const spaceComplexity = spaceCIdx !== -1 ? cols[spaceCIdx] : '';

    userStates[problemId] = {
      problemId,
      status,
      isFavorite: isFav,
      notes,
      timeComplexity,
      spaceComplexity,
      updatedAt: now,
    };
    updatedCount++;

    const conf = confIdx !== -1 ? cols[confIdx]?.trim() : '';
    const nextDate = nextDateIdx !== -1 ? cols[nextDateIdx]?.trim() : '';
    if (conf && ['struggled', 'tough', 'got_it', 'nailed_it'].includes(conf)) {
      revisions.push({
        id: `rev-import-${problemId}-${Date.now()}-${i}`,
        problemId,
        timestamp: now,
        confidence: conf as ConfidenceLevel,
        timeSpentMinutes: 15,
        notes: notes || undefined,
        nextReviewDate: nextDate || calculateNextReviewDate(conf as ConfidenceLevel),
      });
    }
  }

  return { userStates, revisions, updatedCount };
}
