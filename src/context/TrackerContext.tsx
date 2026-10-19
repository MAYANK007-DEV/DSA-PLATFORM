import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  AppView,
  ConfidenceLevel,
  Difficulty,
  FilterCategory,
  Problem,
  ProblemStatus,
  RevisionEvent,
  Sheet,
  UserProblemState,
  UserSettings,
} from '../types/index.ts';
import {
  ALL_PROBLEMS,
  ALL_PROBLEMS_BY_ID,
  SHEETS_DATA,
} from '../data/sheetsData.ts';
import {
  calculateNextReviewDate,
  getCanonicalStats,
  getQuickRevisionProblemIds,
  StatsResult,
} from '../utils/trackerLogic.ts';
import { BrandConfig, DEFAULT_BRAND } from '../utils/brandLogic.ts';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface TrackerContextType {
  // Navigation & Filtering
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  activeSheetId: string | null;
  openSheet: (sheetId: string) => void;
  activeFilterPill: FilterCategory;
  setActiveFilterPill: (pill: FilterCategory) => void;
  mobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;
  completedMilestoneIds: string[];
  toggleMilestone: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  difficultyFilter: 'all' | Difficulty;
  setDifficultyFilter: (diff: 'all' | Difficulty) => void;
  statusFilter: 'all' | ProblemStatus;
  setStatusFilter: (status: 'all' | ProblemStatus) => void;
  onlyFavorites: boolean;
  setOnlyFavorites: (fav: boolean) => void;

  // Data
  allProblems: Problem[];
  allProblemsById: Record<string, Problem>;
  sheets: Sheet[];
  currentSheet: Sheet | null;
  userStates: Record<string, UserProblemState>;
  revisions: RevisionEvent[];
  followedSheetIds: string[];
  settings: UserSettings;
  overallStats: StatsResult;
  quickRevisionIds: string[];

  // Modals & Popovers
  revisionModalProblem: Problem | null;
  setRevisionModalProblem: (p: Problem | null) => void;
  notesModalProblem: Problem | null;
  setNotesModalProblem: (p: Problem | null) => void;
  sqlModalProblem: Problem | null;
  setSqlModalProblem: (p: Problem | null) => void;
  exportModalOpen: boolean;
  setExportModalOpen: (open: boolean) => void;

  // Actions
  toggleProblemStatus: (problemId: string, forcedStatus?: ProblemStatus) => void;
  toggleFavorite: (problemId: string) => void;
  saveProblemNotes: (
    problemId: string,
    notes: string,
    timeComplexity?: string,
    spaceComplexity?: string
  ) => void;
  addRevision: (
    problemId: string,
    confidence: ConfidenceLevel,
    timeSpentMinutes: number,
    notes?: string
  ) => void;
  toggleFollowSheet: (sheetId: string) => void;
  importUserData: (
    newStates: Record<string, UserProblemState>,
    newRevisions: RevisionEvent[]
  ) => void;
  resetAllData: () => void;
  seedDemoActivity: () => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;

  // Brand / Custom Logo & Website Name
  brand: BrandConfig;
  updateBrand: (update: Partial<BrandConfig>) => void;
  resetBrand: () => void;

  // Intro Modal trigger
  showIntroModal: boolean;
  setShowIntroModal: (show: boolean) => void;

  // Toasts
  toasts: ToastInfo[];
  dismissToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const TrackerContext = createContext<TrackerContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER_STATES: 'placement_tracker_states_v2',
  REVISIONS: 'placement_tracker_revisions_v2',
  FOLLOWED: 'placement_tracker_followed_v2',
  SETTINGS: 'placement_tracker_settings_v2',
  MILESTONES: 'placement_tracker_milestones_v2',
  BRAND: 'placement_tracker_brand_v1',
};

export const TrackerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<AppView>('sheets');
  const [activeSheetId, setActiveSheetId] = useState<string | null>('complete-dsa-350');
  const [activeFilterPill, setActiveFilterPill] = useState<FilterCategory>('All');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Completed Milestones (Planner)
  const [completedMilestoneIds, setCompletedMilestoneIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MILESTONES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Difficulty>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ProblemStatus>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Modals
  const [revisionModalProblem, setRevisionModalProblem] = useState<Problem | null>(null);
  const [notesModalProblem, setNotesModalProblem] = useState<Problem | null>(null);
  const [sqlModalProblem, setSqlModalProblem] = useState<Problem | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Persistent States
  const [userStates, setUserStates] = useState<Record<string, UserProblemState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_STATES);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [revisions, setRevisions] = useState<RevisionEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVISIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [followedSheetIds, setFollowedSheetIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLLOWED);
      return saved
        ? JSON.parse(saved)
        : ['complete-dsa-350', 'google-200', 'leetcode-sql-50', 'leetcode-75'];
    } catch {
      return ['complete-dsa-350', 'google-200', 'leetcode-sql-50', 'leetcode-75'];
    }
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved
        ? JSON.parse(saved)
        : {
            userName: 'Mayank',
            targetDailyGoal: 5,
            soundEffects: true,
            theme: 'dark',
          };
    } catch {
      return {
        userName: 'Mayank',
        targetDailyGoal: 5,
        soundEffects: true,
        theme: 'dark',
      };
    }
  });

  const [brand, setBrand] = useState<BrandConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
      if (saved) {
        const parsed = JSON.parse(saved);
        const isOldDefault =
          !parsed.websiteName ||
          parsed.websiteName === 'My Logo Name' ||
          parsed.websiteName === 'Placement Tracker';

        return {
          logoUrl: isOldDefault ? DEFAULT_BRAND.logoUrl : (parsed.logoUrl || DEFAULT_BRAND.logoUrl),
          websiteName: isOldDefault ? DEFAULT_BRAND.websiteName : parsed.websiteName,
          subtitle: isOldDefault ? DEFAULT_BRAND.subtitle : (parsed.subtitle || DEFAULT_BRAND.subtitle),
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_BRAND;
  });

  const [showIntroModal, setShowIntroModal] = useState(false);

  const updateBrand = useCallback((update: Partial<BrandConfig>) => {
    setBrand((prev) => {
      const next = { ...prev, ...update };
      try {
        localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save brand config', e);
      }
      return next;
    });
  }, []);

  const resetBrand = useCallback(() => {
    setBrand(DEFAULT_BRAND);
    try {
      localStorage.removeItem(STORAGE_KEYS.BRAND);
    } catch (e) {
      console.error('Failed to reset brand config', e);
    }
  }, []);

  useEffect(() => {
    if (brand.websiteName) {
      document.title = `${brand.websiteName} • 2026 Placement & DSA`;
    }
  }, [brand.websiteName]);


  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_STATES, JSON.stringify(userStates));
    } catch (e) {
      console.error('Failed to save user states:', e);
    }
  }, [userStates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVISIONS, JSON.stringify(revisions));
    } catch (e) {
      console.error('Failed to save revisions:', e);
    }
  }, [revisions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FOLLOWED, JSON.stringify(followedSheetIds));
    } catch (e) {
      console.error('Failed to save followed sheets:', e);
    }
  }, [followedSheetIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MILESTONES, JSON.stringify(completedMilestoneIds));
    } catch (e) {
      console.error('Failed to save milestones:', e);
    }
  }, [completedMilestoneIds]);

  const toggleMilestone = useCallback((id: string) => {
    setCompletedMilestoneIds((prev) => {
      const exists = prev.includes(id);
      return exists ? prev.filter((m) => m !== id) : [...prev, id];
    });
  }, []);

  // Toast dispatch
  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Quick Revision problem IDs
  const quickRevisionIds = useMemo(() => {
    return getQuickRevisionProblemIds(ALL_PROBLEMS_BY_ID, userStates, revisions);
  }, [userStates, revisions]);

  // Sheets catalog with dynamic Quick Revision sheet updated
  const sheets = useMemo(() => {
    return SHEETS_DATA.map((sheet) => {
      if (sheet.id === 'quick-revision') {
        return {
          ...sheet,
          problemIds: quickRevisionIds,
          targetQuestions: quickRevisionIds.length,
        };
      }
      return sheet;
    });
  }, [quickRevisionIds]);

  // Current selected sheet
  const currentSheet = useMemo(() => {
    if (!activeSheetId) return null;
    return sheets.find((s) => s.id === activeSheetId) || sheets[0];
  }, [activeSheetId, sheets]);

  // Overall canonical stats
  const overallStats = useMemo(() => {
    return getCanonicalStats(
      ALL_PROBLEMS.map((p) => p.id),
      userStates,
      ALL_PROBLEMS_BY_ID
    );
  }, [userStates]);

  const openSheet = useCallback((sheetId: string) => {
    setActiveSheetId(sheetId);
    setActiveView('sheet-detail');
    // Scroll back to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Actions
  const toggleProblemStatus = useCallback(
    (problemId: string, forcedStatus?: ProblemStatus) => {
      setUserStates((prev) => {
        const current = prev[problemId]?.status || 'unsolved';
        let nextStatus: ProblemStatus;

        if (forcedStatus) {
          nextStatus = forcedStatus;
        } else {
          // Cycle: unsolved -> attempted -> solved -> unsolved
          if (current === 'unsolved') nextStatus = 'attempted';
          else if (current === 'attempted') nextStatus = 'solved';
          else nextStatus = 'unsolved';
        }

        const problem = ALL_PROBLEMS_BY_ID[problemId];
        const title = problem ? problem.title : 'Problem';

        if (nextStatus === 'solved') {
          showToast(`Solved: "${title}"! Canonical state updated across all sheets.`, 'success');
        } else if (nextStatus === 'attempted') {
          showToast(`Marked "${title}" as Attempted.`, 'info');
        } else {
          showToast(`Reset "${title}" to Unsolved.`, 'info');
        }

        return {
          ...prev,
          [problemId]: {
            problemId,
            status: nextStatus,
            isFavorite: prev[problemId]?.isFavorite ?? false,
            notes: prev[problemId]?.notes,
            timeComplexity: prev[problemId]?.timeComplexity,
            spaceComplexity: prev[problemId]?.spaceComplexity,
            updatedAt: new Date().toISOString(),
          },
        };
      });
    },
    [showToast]
  );

  const toggleFavorite = useCallback(
    (problemId: string) => {
      setUserStates((prev) => {
        const curFav = prev[problemId]?.isFavorite ?? false;
        const problem = ALL_PROBLEMS_BY_ID[problemId];
        const title = problem ? problem.title : 'Problem';

        showToast(
          curFav ? `Removed "${title}" from favorites.` : `Starred "${title}" for quick access!`,
          'info'
        );

        return {
          ...prev,
          [problemId]: {
            problemId,
            status: prev[problemId]?.status || 'unsolved',
            isFavorite: !curFav,
            notes: prev[problemId]?.notes,
            timeComplexity: prev[problemId]?.timeComplexity,
            spaceComplexity: prev[problemId]?.spaceComplexity,
            updatedAt: new Date().toISOString(),
          },
        };
      });
    },
    [showToast]
  );

  const saveProblemNotes = useCallback(
    (
      problemId: string,
      notes: string,
      timeComplexity?: string,
      spaceComplexity?: string
    ) => {
      setUserStates((prev) => ({
        ...prev,
        [problemId]: {
          problemId,
          status: prev[problemId]?.status || 'unsolved',
          isFavorite: prev[problemId]?.isFavorite ?? false,
          notes,
          timeComplexity,
          spaceComplexity,
          updatedAt: new Date().toISOString(),
        },
      }));
      showToast('Notes saved successfully.', 'success');
    },
    [showToast]
  );

  const addRevision = useCallback(
    (
      problemId: string,
      confidence: ConfidenceLevel,
      timeSpentMinutes: number,
      notes?: string
    ) => {
      const now = new Date();
      const nextReviewDate = calculateNextReviewDate(confidence, now);

      const newRev: RevisionEvent = {
        id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        problemId,
        timestamp: now.toISOString(),
        confidence,
        timeSpentMinutes,
        notes,
        nextReviewDate,
      };

      setRevisions((prev) => [newRev, ...prev]);

      // Automatically mark as solved if not already
      setUserStates((prev) => ({
        ...prev,
        [problemId]: {
          problemId,
          status: 'solved',
          isFavorite: prev[problemId]?.isFavorite ?? false,
          notes: notes || prev[problemId]?.notes,
          timeComplexity: prev[problemId]?.timeComplexity,
          spaceComplexity: prev[problemId]?.spaceComplexity,
          updatedAt: now.toISOString(),
        },
      }));

      const confidenceLabels: Record<ConfidenceLevel, string> = {
        struggled: 'Struggled (Next review: 1 day)',
        tough: 'Tough (Next review: 3 days)',
        got_it: 'Got it (Next review: 7 days)',
        nailed_it: 'Nailed it (Next review: 14 days)',
      };

      showToast(`Revision recorded: ${confidenceLabels[confidence]}`, 'success');
    },
    [showToast]
  );

  const toggleFollowSheet = useCallback(
    (sheetId: string) => {
      setFollowedSheetIds((prev) => {
        const isFollowed = prev.includes(sheetId);
        const next = isFollowed ? prev.filter((id) => id !== sheetId) : [...prev, sheetId];
        const sheet = SHEETS_DATA.find((s) => s.id === sheetId);
        showToast(
          isFollowed
            ? `Unfollowed "${sheet?.title || sheetId}".`
            : `Following "${sheet?.title || sheetId}"! Added to My Workspace.`,
          'info'
        );
        return next;
      });
    },
    [showToast]
  );

  const importUserData = useCallback(
    (
      newStates: Record<string, UserProblemState>,
      newRevisions: RevisionEvent[]
    ) => {
      setUserStates((prev) => ({ ...prev, ...newStates }));
      if (newRevisions.length > 0) {
        setRevisions((prev) => [...newRevisions, ...prev]);
      }
      showToast(
        `Imported ${Object.keys(newStates).length} problem records and ${newRevisions.length} revision logs.`,
        'success'
      );
    },
    [showToast]
  );

  const resetAllData = useCallback(() => {
    setUserStates({});
    setRevisions([]);
    setFollowedSheetIds(['complete-dsa-350', 'google-200', 'leetcode-sql-50', 'leetcode-75']);
    showToast('All progress reset to clean state.', 'info');
  }, [showToast]);

  const seedDemoActivity = useCallback(() => {
    // Seed real representative solved questions for demo & verification testing
    const sampleSolved = [
      'p-two-sum',
      'p-valid-anagram',
      'p-reverse-linked-list',
      'p-climbing-stairs',
      'p-binary-search',
      'p-best-time-to-buy-and-sell-stock',
      'sql-50-175',
      'sql-50-181',
      'analyst-sql-001',
      'analyst-sql-016',
    ];

    const sampleAttempted = [
      'p-trapping-rain-water',
      'p-word-ladder',
      'p-median-of-two-sorted-arrays',
      'analyst-sql-046',
    ];

    const now = new Date();
    const newStates: Record<string, UserProblemState> = {};
    const newRevs: RevisionEvent[] = [];

    sampleSolved.forEach((id, idx) => {
      newStates[id] = {
        problemId: id,
        status: 'solved',
        isFavorite: idx % 3 === 0,
        notes: `Sample practice note for ${id}: Optimal time O(N), space O(1).`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        updatedAt: now.toISOString(),
      };

      const conf: ConfidenceLevel = idx % 2 === 0 ? 'nailed_it' : 'got_it';
      newRevs.push({
        id: `seed-rev-${id}`,
        problemId: id,
        timestamp: new Date(now.getTime() - idx * 86400000).toISOString(),
        confidence: conf,
        timeSpentMinutes: 15 + idx * 5,
        nextReviewDate: calculateNextReviewDate(conf, now),
      });
    });

    sampleAttempted.forEach((id) => {
      newStates[id] = {
        problemId: id,
        status: 'attempted',
        isFavorite: true,
        notes: 'Needs second pass on edge cases.',
        updatedAt: now.toISOString(),
      };
      newRevs.push({
        id: `seed-rev-att-${id}`,
        problemId: id,
        timestamp: now.toISOString(),
        confidence: 'struggled',
        timeSpentMinutes: 35,
        nextReviewDate: calculateNextReviewDate('struggled', now),
      });
    });

    setUserStates((prev) => ({ ...prev, ...newStates }));
    setRevisions((prev) => [...newRevs, ...prev]);
    showToast('Loaded representative practice sample for testing.', 'success');
  }, [showToast]);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const value = {
    activeView,
    setActiveView,
    activeSheetId,
    openSheet,
    activeFilterPill,
    setActiveFilterPill,
    mobileNavOpen,
    setMobileNavOpen,
    completedMilestoneIds,
    toggleMilestone,
    searchQuery,
    setSearchQuery,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    onlyFavorites,
    setOnlyFavorites,
    allProblems: ALL_PROBLEMS,
    allProblemsById: ALL_PROBLEMS_BY_ID,
    sheets,
    currentSheet,
    userStates,
    revisions,
    followedSheetIds,
    settings,
    overallStats,
    quickRevisionIds,
    revisionModalProblem,
    setRevisionModalProblem,
    notesModalProblem,
    setNotesModalProblem,
    sqlModalProblem,
    setSqlModalProblem,
    exportModalOpen,
    setExportModalOpen,
    toggleProblemStatus,
    toggleFavorite,
    saveProblemNotes,
    addRevision,
    toggleFollowSheet,
    importUserData,
    resetAllData,
    seedDemoActivity,
    updateSettings,
    brand,
    updateBrand,
    resetBrand,
    showIntroModal,
    setShowIntroModal,
    toasts,
    dismissToast,
    showToast,
  };

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
};

export const useTracker = () => {
  const context = useContext(TrackerContext);
  if (!context) {
    throw new Error('useTracker must be used within a TrackerProvider');
  }
  return context;
};
