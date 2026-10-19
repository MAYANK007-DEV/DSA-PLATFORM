import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadinessScore, getTimelineDurationLabel } from './plannerLogic.ts';

test('calculateReadinessScore returns 0 when nothing is completed or solved', () => {
  const result = calculateReadinessScore(20, 0, 0);
  assert.equal(result.totalScore, 0);
  assert.equal(result.tierLabel, 'Beginner Foundations');
});

test('calculateReadinessScore caps solved score at 50% even if > 200 solved', () => {
  const result = calculateReadinessScore(20, 0, 500);
  assert.equal(result.totalScore, 50);
  assert.equal(result.tierLabel, 'Interview Ready (Mid-tier)');
});

test('calculateReadinessScore achieves Google tier (>= 85) when both checklist and problems are high', () => {
  const result = calculateReadinessScore(20, 18, 180);
  // checklist = (18/20)*50 = 45
  // solved = (180/200)*50 = 45
  // total = 90
  assert.equal(result.totalScore, 90);
  assert.equal(result.tierLabel, 'Google & Tier-1 Ready');
});

test('calculateReadinessScore handles edge case with 0 total checklist without division by zero', () => {
  const result = calculateReadinessScore(0, 0, 100);
  assert.equal(result.totalScore, 25);
});

test('getTimelineDurationLabel returns expected mode formats', () => {
  assert.equal(getTimelineDurationLabel('3-months', 0), 'Month 1 (Sprint)');
  assert.equal(getTimelineDurationLabel('6-months', 1), 'Month 2 (Recommended)');
  assert.equal(getTimelineDurationLabel('12-months', 2), 'Month 7 – 9 (Mastery)');
});
