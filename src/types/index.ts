export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type ProblemStatus = 'unsolved' | 'attempted' | 'solved';

export type ConfidenceLevel = 'struggled' | 'tough' | 'got_it' | 'nailed_it';

export interface CompanyTagEvidence {
  company: 'Google' | 'Microsoft' | 'JPMorgan';
  verifiedDate: string; // ISO date string, e.g. "2026-08-15"
  source: string;
}

export interface SqlProblemMeta {
  dialect: 'PostgreSQL' | 'MySQL' | 'Multi-dialect';
  module:
    | 'SQL Fundamentals'
    | 'Joins & Relational Logic'
    | 'Aggregation & Business Metrics'
    | 'Window Functions'
    | 'CTEs, Subqueries & Advanced'
    | 'Data Quality & Analytics Cases'
    | 'Dashboard-Ready Case Studies';
  taskStatement: string;
  expectedSchema?: string;
  sampleInput?: string;
  sampleQueryOrSolution?: string;
  expectedOutputSample?: string;
}

export interface Problem {
  id: string; // Canonical unique ID (e.g. "p-two-sum")
  title: string;
  difficulty: Difficulty;
  topic: string;
  pattern: string;
  leetcodeSlug?: string;
  leetcodeUrl?: string;
  leetcodeVerified?: boolean;
  gfgUrl?: string;
  gfgVerified?: boolean;
  lastVerifiedDate: string;
  companyEvidence?: CompanyTagEvidence[];
  sqlMeta?: SqlProblemMeta;
}

export interface Sheet {
  id: string;
  title: string;
  slug: string;
  description: string;
  category:
    | 'complete-dsa'
    | 'company'
    | 'popular'
    | 'sql'
    | 'analyst-sql'
    | 'competitive'
    | 'topic-specific'
    | 'revision';
  problemIds: string[];
  targetQuestions: number;
  companyTag?: 'Google' | 'Microsoft' | 'JPMorgan';
  isOfficial?: boolean;
  followersCount: number;
  tags: string[];
  recommendedOrderDescription?: string;
  externalReferenceUrl?: string;
}

export interface UserProblemState {
  problemId: string;
  status: ProblemStatus;
  isFavorite: boolean;
  notes?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  updatedAt: string;
}

export interface RevisionEvent {
  id: string;
  problemId: string;
  timestamp: string; // ISO string
  confidence: ConfidenceLevel;
  timeSpentMinutes: number;
  notes?: string;
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  solvedCount: number;
  revisedCount: number;
}

export type FilterCategory =
  | 'All'
  | 'Company Wise'
  | 'Popular'
  | 'Quick Revision'
  | 'Complete DSA'
  | 'Topic Specific'
  | 'Competitive'
  | 'SQL'
  | 'Analyst SQL';

export type AppView =
  | 'dashboard'
  | 'sheets'
  | 'sheet-detail'
  | 'revisions-history'
  | 'planner'
  | 'settings';

export interface PlannerMilestone {
  id: string;
  title: string;
  duration: string;
  focus: string;
  tasks: string[];
  recommendedSheetId?: string;
}

export interface CompanyRoadmap {
  id: string;
  name: string;
  tagline: string;
  color: string;
  difficultyFocus: string;
  dsaWeight: string;
  csFundamentalsWeight: string;
  designWeight: string;
  rounds: Array<{
    title: string;
    format: string;
    focus: string;
    insiderTip: string;
  }>;
  oaPlatform?: string;
  salaryTier?: string;
  codingLanguageRecommendation?: string;
  resumeTips?: string[];
  cheatSheetKeywords?: string[];
  keyTopics: Array<{
    topic: string;
    mustMasterPatterns: string[];
    priority: 'Crucial' | 'High' | 'Medium';
  }>;
  behavioralFocus: string;
  recommendedSheetId: string;
}

export interface CandidateProcessStage {
  id: string;
  stageNumber: number;
  title: string;
  subtitle: string;
  timing: string;
  category: 'resume' | 'oa' | 'interview-protocol' | 'cs-fundamentals' | 'behavioral' | 'mock-drills';
  actionItems: string[];
  keyPitfallsToAvoid: string[];
  proTip: string;
}

export interface ReadinessChecklistItem {
  id: string;
  category: 'Core DSA' | 'Advanced DSA' | 'SQL & Databases' | 'CS Fundamentals' | 'Interview & Mock';
  label: string;
  targetCount?: string;
  recommendedSheetId?: string;
}

export interface UserSettings {
  userName: string;
  targetDailyGoal: number;
  soundEffects: boolean;
  theme: 'dark';
  completedMilestoneIds?: string[];
}
