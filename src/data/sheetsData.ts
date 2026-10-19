import { Problem, Sheet } from '../types/index.ts';
import { CORE_DSA_PROBLEMS } from './dsaProblems.ts';
import {
  GOOGLE_200_TITLES,
  MICROSOFT_200_TITLES,
  JPMORGAN_200_TITLES,
  resolveCompanyProblem,
} from './companyTracks.ts';
import {
  LEETCODE_SQL_50_PROBLEMS,
  DATA_ANALYST_SQL_100_PROBLEMS,
} from './sqlProblems.ts';

// Resolve all company track problems into canonical items
export const GOOGLE_200_PROBLEMS: Problem[] = GOOGLE_200_TITLES.map(
  ([title, diff, topic, pattern]) =>
    resolveCompanyProblem(title, diff, topic, pattern, 'Google')
);

export const MICROSOFT_200_PROBLEMS: Problem[] = MICROSOFT_200_TITLES.map(
  ([title, diff, topic, pattern]) =>
    resolveCompanyProblem(title, diff, topic, pattern, 'Microsoft')
);

export const JPMORGAN_200_PROBLEMS: Problem[] = JPMORGAN_200_TITLES.map(
  ([title, diff, topic, pattern]) =>
    resolveCompanyProblem(title, diff, topic, pattern, 'JPMorgan')
);

// LeetCode Top 75 Interview List from Blueprint pages 12-13
export const LEETCODE_TOP_75_TITLES: string[] = [
  'Two Sum',
  'Best Time to Buy and Sell Stock',
  'Contains Duplicate',
  'Product of Array Except Self',
  'Maximum Subarray',
  '3Sum',
  'Container With Most Water',
  'Trapping Rain Water',
  'Valid Anagram',
  'Group Anagrams',
  'Longest Substring Without Repeating Characters',
  'Longest Palindromic Substring',
  'Minimum Window Substring',
  'Valid Parentheses',
  'Min Stack',
  'Daily Temperatures',
  'Binary Search',
  'Search in Rotated Sorted Array',
  'Find Minimum in Rotated Sorted Array',
  'Koko Eating Bananas',
  'Reverse Linked List',
  'Merge Two Sorted Lists',
  'Linked List Cycle',
  'Remove Nth Node From End of List',
  'Reorder List',
  'Merge k Sorted Lists',
  'Invert Binary Tree',
  'Maximum Depth of Binary Tree',
  'Same Tree',
  'Subtree of Another Tree',
  'Lowest Common Ancestor of a Binary Tree',
  'Binary Tree Level Order Traversal',
  'Validate Binary Search Tree',
  'Kth Smallest Element in a BST',
  'Implement Trie (Prefix Tree)',
  'Top K Frequent Elements',
  'Find Median from Data Stream',
  'Kth Largest Element in an Array',
  'Number of Islands',
  'Clone Graph',
  'Max Area of Island',
  'Course Schedule',
  'Pacific Atlantic Water Flow',
  'Graph Valid Tree',
  'Word Ladder',
  'Climbing Stairs',
  'House Robber',
  'House Robber II',
  'Longest Palindromic Subsequence',
  'Coin Change',
  'Longest Increasing Subsequence',
  'Word Break',
  'Combination Sum',
  'Subsets',
  'Permutations',
  'Jump Game',
  'Jump Game II',
  'Insert Interval',
  'Merge Intervals',
  'Non-overlapping Intervals',
  'Rotate Image',
  'Set Matrix Zeroes',
  'Spiral Matrix',
  'Unique Paths',
  'Minimum Path Sum',
  'Decode Ways',
  'Word Search',
  'Search a 2D Matrix',
  'Find the Duplicate Number',
  'Longest Consecutive Sequence',
  'LRU Cache',
  'Serialize and Deserialize Binary Tree',
  'Binary Tree Maximum Path Sum',
  'Median of Two Sorted Arrays',
  'Regular Expression Matching',
];

// Unified canonical dictionary
export const ALL_PROBLEMS_BY_ID: Record<string, Problem> = {};

// Register all core DSA problems
for (const p of CORE_DSA_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}

// Register company problems
for (const p of GOOGLE_200_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}
for (const p of MICROSOFT_200_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}
for (const p of JPMORGAN_200_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}

// Register SQL problems
for (const p of LEETCODE_SQL_50_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}
for (const p of DATA_ANALYST_SQL_100_PROBLEMS) {
  ALL_PROBLEMS_BY_ID[p.id] = p;
}

export const ALL_PROBLEMS: Problem[] = Object.values(ALL_PROBLEMS_BY_ID);

// Resolve Top 75 problem IDs from titles
const lc75Ids: string[] = [];
for (const title of LEETCODE_TOP_75_TITLES) {
  const norm = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const match = ALL_PROBLEMS.find(
    (p) => p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === norm
  );
  if (match) {
    lc75Ids.push(match.id);
  }
}

// All sheets catalog
export const SHEETS_DATA: Sheet[] = [
  {
    id: 'complete-dsa-350',
    title: 'Complete DSA Track (18 Topics)',
    slug: 'complete-dsa',
    description:
      'Curated sequence-wise mastery path covering all 18 core DSA topics: from programming basics and arrays to DP, Trie, Segment Tree, and Fenwick Tree.',
    category: 'complete-dsa',
    problemIds: CORE_DSA_PROBLEMS.map((p) => p.id),
    targetQuestions: CORE_DSA_PROBLEMS.length,
    followersCount: 14280,
    tags: ['Complete DSA', 'Sequence Wise', '18 Topics', 'Foundations to Advanced'],
    recommendedOrderDescription:
      'Solve sequence-wise: Programming Basics -> Arrays -> Strings -> Searching/Sorting -> Linked Lists -> Stacks -> Queues -> Trees -> BST -> Heaps -> Greedy -> Backtracking -> Hashing -> Graphs -> DP -> Segment Tree -> Trie -> Fenwick Tree.',
    externalReferenceUrl: 'https://leetcode.com/problemset/all/',
  },
  {
    id: 'google-200',
    title: 'Google — 200 Questions Placement Track',
    slug: 'google-200',
    description:
      'High-depth problem-solving track for Google: binary search, graph shortest path/MST, dynamic programming, hard optimization, and backtracking.',
    category: 'company',
    companyTag: 'Google',
    problemIds: GOOGLE_200_PROBLEMS.map((p) => p.id),
    targetQuestions: 200,
    followersCount: 28410,
    tags: ['Google', 'FAANG', '200 Target', 'Deep Patterns'],
    recommendedOrderDescription:
      'Recommended mix: 50 arrays/strings/hashmaps, 35 binary search/two pointers/sliding window, 35 trees/graphs, 35 DP/greedy/backtracking, 20 heaps/intervals, 15 design/advanced. Practice Easy -> Medium -> Hard.',
    externalReferenceUrl: 'https://leetcode.com/company/google/',
  },
  {
    id: 'microsoft-200',
    title: 'Microsoft — 200 Questions Placement Track',
    slug: 'microsoft-200',
    description:
      'Broad DSA coverage for Microsoft interviews: arrays/strings, linked lists, trees/BST, graph BFS/DFS, DP, sorting, and clean implementation clarity.',
    category: 'company',
    companyTag: 'Microsoft',
    problemIds: MICROSOFT_200_PROBLEMS.map((p) => p.id),
    targetQuestions: 200,
    followersCount: 22150,
    tags: ['Microsoft', 'Big Tech', '200 Target', 'Trees & Graphs'],
    recommendedOrderDescription:
      'Recommended mix: 45 arrays/strings, 30 linked lists/stacks/queues, 35 trees/BST, 30 graphs/BFS/DFS, 30 DP/greedy, 15 binary search/heap, 5 design/mixed.',
    externalReferenceUrl: 'https://leetcode.com/company/microsoft/',
  },
  {
    id: 'jpmorgan-200',
    title: 'JPMorgan — 200 Questions Placement Track',
    slug: 'jpmorgan-200',
    description:
      'Coding fluency and robust implementation for JPMorgan Chase & Co: hashing, two pointers, searching/sorting, linked lists, stacks, trees, and edge cases.',
    category: 'company',
    companyTag: 'JPMorgan',
    problemIds: JPMORGAN_200_PROBLEMS.map((p) => p.id),
    targetQuestions: 200,
    followersCount: 16940,
    tags: ['JPMorgan', 'FinTech', '200 Target', 'Implementation & Edge Cases'],
    recommendedOrderDescription:
      'Recommended mix: 50 arrays/strings/hashmaps, 30 sorting/searching, 30 linked lists/stacks/queues, 30 trees/graphs, 25 DP/greedy, 15 SQL/data manipulation, 10 complexity drills.',
    externalReferenceUrl: 'https://leetcode.com/company/jpmorgan/',
  },
  {
    id: 'leetcode-75',
    title: 'LeetCode Top 75 Interview List',
    slug: 'leetcode-75',
    description:
      'Compact, high-yield interview revision sheet containing the classic 75 interview patterns frequently asked across software engineering rounds.',
    category: 'popular',
    isOfficial: true,
    problemIds: lc75Ids,
    targetQuestions: 75,
    followersCount: 51200,
    tags: ['LeetCode 75', 'Must Do', 'High Yield', 'Popular'],
    recommendedOrderDescription:
      'Solve before technical phone screens and on-site loops as high-yield pattern review.',
    externalReferenceUrl: 'https://leetcode.com/studyplan/leetcode-75/',
  },
  {
    id: 'leetcode-sql-50',
    title: 'Official LeetCode SQL 50 Study Plan',
    slug: 'leetcode-sql-50',
    description:
      'The gold-standard 50 SQL interview problems: select, basic joins, basic aggregate functions, sorting and grouping, advanced select and joins, and subqueries.',
    category: 'sql',
    isOfficial: true,
    problemIds: LEETCODE_SQL_50_PROBLEMS.map((p) => p.id),
    targetQuestions: 50,
    followersCount: 39400,
    tags: ['SQL 50', 'Official Study Plan', 'Database', 'LeetCode'],
    recommendedOrderDescription:
      'Official study plan. Solve in order to build fundamental database query proficiency.',
    externalReferenceUrl: 'https://leetcode.com/studyplan/top-sql-50/',
  },
  {
    id: 'analyst-sql-100',
    title: 'SQL Top 100 for Data Analyst Roles',
    slug: 'analyst-sql-100',
    description:
      'Dedicated 100-question analyst path separate from SQL 50: Fundamentals, Joins & Relational Logic, Business Metrics, Window Functions, CTEs, Data Quality, and Dashboard Case Studies.',
    category: 'analyst-sql',
    problemIds: DATA_ANALYST_SQL_100_PROBLEMS.map((p) => p.id),
    targetQuestions: 100,
    followersCount: 18720,
    tags: ['Data Analyst', 'SQL 100', 'Window Functions', 'Business Metrics', 'Case Studies'],
    recommendedOrderDescription:
      '7 distinct modules: Fundamentals -> Joins -> Metrics -> Window Functions -> CTEs & Hierarchy -> Data Quality -> Dashboard Studies.',
    externalReferenceUrl: 'https://leetcode.com/problemset/database/',
  },
  {
    id: 'quick-revision',
    title: 'Quick Revision Sheet (Spaced Repetition)',
    slug: 'quick-revision',
    description:
      'Dynamically generated from problems flagged as "Struggled" or "Tough", plus overdue next-review dates. Practice at 1, 3, 7, and 14 day intervals.',
    category: 'revision',
    problemIds: [], // Dynamically populated
    targetQuestions: 0,
    followersCount: 9480,
    tags: ['Quick Revision', 'Spaced Repetition', 'Confidence Based', 'Overdue Reviews'],
    recommendedOrderDescription:
      'Prioritize Struggled items (re-solve after 1 day), then Tough (3 days), Got it (7 days), and Nailed it (14-30 days).',
  },
  {
    id: 'topic-dp-mastery',
    title: 'Dynamic Programming & Memoization Deep Dive',
    slug: 'topic-dp',
    description:
      'Focused practice on 1D DP, 2D Grid DP, Knapsack patterns, LCS/LIS variations, and interval state transitions.',
    category: 'topic-specific',
    problemIds: CORE_DSA_PROBLEMS.filter((p) => p.topic.includes('Dynamic Programming')).map((p) => p.id),
    targetQuestions: CORE_DSA_PROBLEMS.filter((p) => p.topic.includes('Dynamic Programming')).length,
    followersCount: 11200,
    tags: ['Topic Specific', 'Dynamic Programming', 'Knapsack', 'State Transitions'],
  },
  {
    id: 'topic-graph-algorithms',
    title: 'Graph Algorithms, BFS, DFS & Topological Sort',
    slug: 'topic-graphs',
    description:
      'Master graph representations, cycle detection, Kahn algorithm, Dijkstra shortest path, Prim/Kruskal MST, and Disjoint Set Union.',
    category: 'topic-specific',
    problemIds: CORE_DSA_PROBLEMS.filter((p) => p.topic.includes('Graphs')).map((p) => p.id),
    targetQuestions: CORE_DSA_PROBLEMS.filter((p) => p.topic.includes('Graphs')).length,
    followersCount: 8940,
    tags: ['Topic Specific', 'Graphs', 'Topological Sort', 'Shortest Path', 'Union Find'],
  },
  {
    id: 'competitive-advanced',
    title: 'Competitive & Advanced Tree / BIT Sheet',
    slug: 'competitive-advanced',
    description:
      'Advanced range query structures and logarithmic interval updates: Segment Trees, Fenwick Trees (BIT), and Trie implementations.',
    category: 'competitive',
    problemIds: CORE_DSA_PROBLEMS.filter((p) =>
      ['Segment Tree & Range Queries', 'Trie', 'Fenwick Tree / BIT'].includes(p.topic)
    ).map((p) => p.id),
    targetQuestions: CORE_DSA_PROBLEMS.filter((p) =>
      ['Segment Tree & Range Queries', 'Trie', 'Fenwick Tree / BIT'].includes(p.topic)
    ).length,
    followersCount: 6510,
    tags: ['Competitive', 'Segment Tree', 'Fenwick Tree', 'BIT', 'Trie', 'Hard'],
  },
];
