import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNextReviewDate,
  isOverdue,
  getCanonicalStats,
  getQuickRevisionProblemIds,
  exportToCsv,
  importFromCsv,
} from './trackerLogic.ts';
import type { Problem, UserProblemState, RevisionEvent } from '../types/index.ts';

test('calculateNextReviewDate computes correct intervals based on confidence', () => {
  const base = new Date('2026-10-18T10:00:00Z');
  assert.equal(calculateNextReviewDate('struggled', base), '2026-10-19');
  assert.equal(calculateNextReviewDate('tough', base), '2026-10-21');
  assert.equal(calculateNextReviewDate('got_it', base), '2026-10-25');
  assert.equal(calculateNextReviewDate('nailed_it', base), '2026-11-01');
});

test('isOverdue correctly detects past, today, and future dates', () => {
  const today = new Date('2026-10-18T12:00:00Z');
  assert.equal(isOverdue('2026-10-17', today), true);
  assert.equal(isOverdue('2026-10-18', today), true);
  assert.equal(isOverdue('2026-10-19', today), false);
});

test('getCanonicalStats correctly counts unique problem states and difficulties', () => {
  const problemsById: Record<string, Problem> = {
    'p-1': {
      id: 'p-1',
      title: 'Problem 1',
      difficulty: 'Easy',
      topic: 'Arrays',
      pattern: 'Two Pointers',
      lastVerifiedDate: '2026-10-01',
    },
    'p-2': {
      id: 'p-2',
      title: 'Problem 2',
      difficulty: 'Medium',
      topic: 'Strings',
      pattern: 'Sliding Window',
      lastVerifiedDate: '2026-10-01',
    },
    'p-3': {
      id: 'p-3',
      title: 'Problem 3',
      difficulty: 'Hard',
      topic: 'DP',
      pattern: 'Knapsack',
      lastVerifiedDate: '2026-10-01',
    },
  };

  const userStates: Record<string, UserProblemState> = {
    'p-1': {
      problemId: 'p-1',
      status: 'solved',
      isFavorite: false,
      updatedAt: '2026-10-18',
    },
    'p-2': {
      problemId: 'p-2',
      status: 'attempted',
      isFavorite: true,
      updatedAt: '2026-10-18',
    },
  };

  // Note duplicate 'p-1' passed into array to ensure canonical deduplication
  const stats = getCanonicalStats(['p-1', 'p-1', 'p-2', 'p-3'], userStates, problemsById);
  assert.equal(stats.total, 3);
  assert.equal(stats.solved, 1);
  assert.equal(stats.attempted, 1);
  assert.equal(stats.unsolved, 1);
  assert.equal(stats.progressPercent, 33);
  assert.equal(stats.easy.total, 1);
  assert.equal(stats.easy.solved, 1);
  assert.equal(stats.medium.total, 1);
  assert.equal(stats.medium.solved, 0);
  assert.equal(stats.hard.total, 1);
  assert.equal(stats.hard.solved, 0);
});

test('getQuickRevisionProblemIds identifies struggled, tough, and overdue items', () => {
  const problemsById: Record<string, Problem> = {
    'p-1': { id: 'p-1', title: 'P1', difficulty: 'Easy', topic: 'A', pattern: 'P', lastVerifiedDate: '2026-10-01' },
    'p-2': { id: 'p-2', title: 'P2', difficulty: 'Medium', topic: 'A', pattern: 'P', lastVerifiedDate: '2026-10-01' },
    'p-3': { id: 'p-3', title: 'P3', difficulty: 'Hard', topic: 'A', pattern: 'P', lastVerifiedDate: '2026-10-01' },
  };

  const userStates: Record<string, UserProblemState> = {
    'p-1': { problemId: 'p-1', status: 'solved', isFavorite: false, updatedAt: '2026-10-18' },
    'p-2': { problemId: 'p-2', status: 'attempted', isFavorite: false, updatedAt: '2026-10-18' },
    'p-3': { problemId: 'p-3', status: 'unsolved', isFavorite: false, updatedAt: '2026-10-18' },
  };

  const revisions: RevisionEvent[] = [
    {
      id: 'rev-1',
      problemId: 'p-1',
      timestamp: '2026-10-17T12:00:00Z',
      confidence: 'struggled',
      timeSpentMinutes: 20,
      nextReviewDate: '2026-10-18',
    },
  ];

  const quickIds = getQuickRevisionProblemIds(problemsById, userStates, revisions, new Date('2026-10-18T12:00:00Z'));
  assert.equal(quickIds.includes('p-1'), true); // struggled
  assert.equal(quickIds.includes('p-2'), true); // attempted
  assert.equal(quickIds.includes('p-3'), false);
});

test('CSV export and import round-trips user states cleanly', () => {
  const problems: Problem[] = [
    {
      id: 'p-two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      topic: 'Arrays & Matrices',
      pattern: 'Two Pointers',
      lastVerifiedDate: '2026-10-01',
    },
  ];

  const userStates: Record<string, UserProblemState> = {
    'p-two-sum': {
      problemId: 'p-two-sum',
      status: 'solved',
      isFavorite: true,
      notes: 'Used a hash map for O(n) time',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      updatedAt: '2026-10-18T10:00:00Z',
    },
  };

  const revisions: RevisionEvent[] = [
    {
      id: 'rev-test-1',
      problemId: 'p-two-sum',
      timestamp: '2026-10-18T10:00:00Z',
      confidence: 'nailed_it',
      timeSpentMinutes: 10,
      nextReviewDate: '2026-11-01',
    },
  ];

  const csv = exportToCsv(problems, userStates, revisions);
  assert.equal(csv.includes('Two Sum'), true);
  assert.equal(csv.includes('solved'), true);

  const imported = importFromCsv(csv);
  assert.equal(imported.updatedCount, 1);
  assert.equal(imported.userStates['p-two-sum']?.status, 'solved');
  assert.equal(imported.userStates['p-two-sum']?.isFavorite, true);
  assert.equal(imported.userStates['p-two-sum']?.timeComplexity, 'O(n)');
});
