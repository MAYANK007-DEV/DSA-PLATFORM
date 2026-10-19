import {
  CompanyRoadmap,
  PlannerMilestone,
  CandidateProcessStage,
  ReadinessChecklistItem,
} from '../types/index.ts';

export const COMPANY_ROADMAPS: CompanyRoadmap[] = [
  {
    id: 'google',
    name: 'Google',
    tagline: 'Deep algorithmic problem-solving, graph proofs, DP optimization & clean modular code.',
    color: '#ea4335',
    salaryTier: 'L3: INR 35-45 LPA ($150k-$190k) • L4: INR 55-75 LPA ($220k-$280k)',
    oaPlatform: 'Google OA (2 problems in 90 mins) or 45-min Google Docs screen',
    codingLanguageRecommendation: 'C++ (STL) or Java (standard libraries) or Python 3',
    difficultyFocus: 'Hard & Medium (65% Medium, 30% Hard, 5% Easy)',
    dsaWeight: '75%',
    csFundamentalsWeight: '10%',
    designWeight: '15%',
    recommendedSheetId: 'google-200',
    resumeTips: [
      'Quantify computational impact: "Reduced memory consumption by 38% using bitmap indexing".',
      'Highlight open source contributions or competitive programming ratings (Codeforces 1600+, LeetCode Guardian/Knight).',
      'Demonstrate systems awareness: concurrency, distributed caches, or low-latency network protocols.',
    ],
    cheatSheetKeywords: [
      'Dijkstra',
      'Topological Sort',
      'Union-Find (DSU)',
      'Morris Inorder',
      'Monotonic Deque',
      'Interval DP',
      'Binary Search on Answer Space',
      'Trie with Bitwise XOR',
    ],
    behavioralFocus:
      'Googlyness & Leadership: Intellectual humility, navigating technical ambiguity, welcoming peer feedback, scalable thinking, and ethical engineering.',
    rounds: [
      {
        title: 'Round 0: Online Assessment / Recruiter Screen',
        format: 'OA (2 questions in 90 mins) or 45-min Google Meet with Google Docs/CoderPad',
        focus: 'Data structures implementation, time/space complexity proof, clean edge case handling.',
        insiderTip:
          'Do NOT jump straight to code. State your assumptions, dry run on an example, then write production-grade variable names and helper functions without shorthand hacks.',
      },
      {
        title: 'Round 1-3: Technical Coding Onsite',
        format: '3-4 separate 45-minute 1-on-1 coding rounds',
        focus:
          'Graphs (Dijkstra, DFS/BFS, Kahn’s Topological Sort, Eulerian Path), Dynamic Programming, Binary Search on Answer Space, Trie, and Monotonic Stacks.',
        insiderTip:
          'Interviewers often add follow-up constraints: "What if the graph has billions of nodes?", "What if data does not fit in RAM?", "Can we solve in O(1) extra space?".',
      },
      {
        title: 'Round 4: System Design (L4+) or LLD / Clean Code (L3)',
        format: '45-minute architectural or object-oriented design whiteboard',
        focus: 'Distributed systems, caching, sharding, consensus, RPC protocols, back-of-the-envelope estimations.',
        insiderTip:
          'Clarify non-functional requirements (p99 latency, read:write ratio, availability vs consistency). Use standard building blocks.',
      },
      {
        title: 'Round 5: Googlyness & Leadership',
        format: '45 minutes with a Google Director or Senior Staff Lead',
        focus: 'Constructive disagreement, handling ambiguity, learning from failure, ethical engineering choices.',
        insiderTip:
          'Use the STAR format (Situation, Task, Action, Result) with honest introspection and quantifiable impact.',
      },
    ],
    keyTopics: [
      {
        topic: 'Graph Algorithms & Shortest Path',
        mustMasterPatterns: ['Dijkstra', 'Topological Sort (Kahn)', 'Union Find (DSU)', 'Eulerian Circuit', 'Bipartite BFS'],
        priority: 'Crucial',
      },
      {
        topic: 'Dynamic Programming & Memoization',
        mustMasterPatterns: ['State Machines', 'Interval DP', '2D Matrix DP', 'Bitmask DP', 'Knapsack Variations'],
        priority: 'Crucial',
      },
      {
        topic: 'Binary Search on Solution Space',
        mustMasterPatterns: ['Koko Eating Bananas', 'Split Array Largest Sum', 'Capacity to Ship Packages', 'Rotated Search'],
        priority: 'Crucial',
      },
      {
        topic: 'Tree & Trie Optimization',
        mustMasterPatterns: ['LCA with Postorder', 'Morris Inorder Traversal', 'Prefix Search', 'Bitwise XOR Trie'],
        priority: 'High',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tagline: 'Balanced DSA foundations, Tree/BST traversals, Low-Level Design (LLD), and Growth Mindset.',
    color: '#00a4ef',
    salaryTier: 'SDE-1: INR 24-32 LPA ($130k-$170k) • SDE-2: INR 42-55 LPA ($180k-$230k)',
    oaPlatform: 'Codility Assessment (3 problems in 75-90 mins)',
    codingLanguageRecommendation: 'C#, Java, C++, or TypeScript/Python',
    difficultyFocus: 'Balanced Medium & Easy (70% Medium, 20% Easy, 10% Hard)',
    dsaWeight: '60%',
    csFundamentalsWeight: '20%',
    designWeight: '20%',
    recommendedSheetId: 'microsoft-200',
    resumeTips: [
      'Highlight modular OOP patterns: SOLID principles, design patterns (Strategy, Factory, Observer).',
      'Detail cloud project deployments: Azure, AWS, Docker containers, CI/CD pipelines.',
      'Showcase collaborative teamwork: code reviews, cross-functional sprints, mentoring juniors.',
    ],
    cheatSheetKeywords: [
      'Level Order BFS',
      'Validate BST',
      'Reverse Linked List in K-Groups',
      'LRU Cache',
      'Design Parking Lot',
      'Spiral Matrix',
      'Word Search',
      'Merge K Sorted Lists',
    ],
    behavioralFocus:
      'Growth Mindset: Curiosity, bias for action, customer obsession, cross-boundary collaboration, and continuous self-improvement.',
    rounds: [
      {
        title: 'Round 0: Codility Online Assessment',
        format: '2-3 questions in 75-90 minutes',
        focus: 'Arrays, string manipulation, hash maps, simulation, and edge cases.',
        insiderTip: 'Score 100% on correctness AND performance. Test boundary conditions: null inputs, duplicates, empty strings.',
      },
      {
        title: 'Round 1-2: Data Structures & Algorithms',
        format: '45-60 minute interactive coding rounds',
        focus: 'Binary Trees, BST, Linked Lists, Breadth-First Search, Two Pointers, and Recursion/Backtracking.',
        insiderTip: 'Explain your reasoning aloud. Microsoft values clear, maintainable, readable code over overly obscure clever one-liners.',
      },
      {
        title: 'Round 3: Low-Level Design (LLD) / OOP',
        format: '45-60 minutes whiteboard / CoderPad',
        focus: 'SOLID principles, design patterns (Factory, Strategy, Observer, Singleton), class hierarchies (e.g. Design Parking Lot, Elevator System, Chess).',
        insiderTip: 'Define interfaces first before writing concrete classes. Keep classes loosely coupled and open for extension.',
      },
      {
        title: 'Round 4: Partner / As Appropriate (AA) Round',
        format: '45 minutes with a Principal / Partner Engineering Manager',
        focus: 'Technical depth, passion for Microsoft cloud/AI vision, systemic problem solving, and culture fit.',
        insiderTip: 'Be prepared to defend your resume projects deeply: bottlenecks, architectural trade-offs, and what you would do differently.',
      },
    ],
    keyTopics: [
      {
        topic: 'Binary Trees & BST Traversals',
        mustMasterPatterns: ['Level Order (BFS)', 'LCA of BST & Binary Tree', 'Validate BST', 'Serialize/Deserialize Tree'],
        priority: 'Crucial',
      },
      {
        topic: 'Linked Lists & Two Pointers',
        mustMasterPatterns: ['Reverse in K-Groups', 'Detect & Find Cycle', 'Merge K Sorted Lists', 'Copy with Random Pointer'],
        priority: 'Crucial',
      },
      {
        topic: 'Object-Oriented Design (LLD)',
        mustMasterPatterns: ['Design LRU Cache', 'Design Parking Lot', 'Design Circular Queue', 'SOLID Architecture'],
        priority: 'High',
      },
      {
        topic: 'Matrix & Grid Traversals',
        mustMasterPatterns: ['Spiral Matrix', 'Rotate Image', 'Number of Islands', 'Word Search'],
        priority: 'High',
      },
    ],
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase & Co',
    tagline: 'Coding fluency, robust implementation, SQL/data manipulation, and financial risk edge cases.',
    color: '#0a58ca',
    salaryTier: 'Analyst/Associate: INR 18-28 LPA ($115k-$150k) • VP: INR 45-65 LPA ($180k-$240k)',
    oaPlatform: 'HackerRank OA (2 coding questions) + HireVue recorded video interview',
    codingLanguageRecommendation: 'Java, Python, C++, or SQL (PostgreSQL/Oracle/MySQL)',
    difficultyFocus: 'Core Medium & Easy (60% Medium, 35% Easy, 5% Hard)',
    dsaWeight: '50%',
    csFundamentalsWeight: '25%',
    designWeight: '25%',
    recommendedSheetId: 'jpmorgan-200',
    resumeTips: [
      'Emphasize data integrity, transactional safety, and financial or high-throughput transaction systems.',
      'Showcase deep SQL mastery: window functions, reconciliation queries, index tuning.',
      'Highlight defensive error handling: null checks, overflow mitigation, idempotency.',
    ],
    cheatSheetKeywords: [
      'Subarray Sum Equals K',
      'Reconciliation Queries',
      'Window Functions (RANK, DENSE_RANK)',
      'Two Sum Variants',
      'Deadlocks & Mutexes',
      'ACID Transactions',
      'Sliding Window Maximum',
    ],
    behavioralFocus:
      'Integrity, client service, operational rigor, risk management, and regulatory compliance awareness.',
    rounds: [
      {
        title: 'Round 0: HackerRank OA + HireVue Video Interview',
        format: '2 coding problems (60 mins) + 2 recorded behavioral questions',
        focus: 'Arrays, math, hashing, strings, and behavioral situational questions.',
        insiderTip: 'Dress professionally for HireVue. Practice maintaining eye contact with the camera and keeping answers to 2 minutes.',
      },
      {
        title: 'Round 1: DSA Fluency & Edge Cases',
        format: '45 minutes',
        focus: 'Hashing, sliding window, sorting/searching, string formatting, and integer overflow checks.',
        insiderTip: 'Financial systems demand extreme defensive programming: never assume inputs are sanitized or within standard bounds.',
      },
      {
        title: 'Round 2: SQL & Database Querying',
        format: '45 minutes with live SQL database editor',
        focus: 'Multi-table joins, GROUP BY with HAVING, window functions (ROW_NUMBER, RANK), transaction isolation.',
        insiderTip: 'Demonstrate know-how on indexes, ACID properties, reconciliation queries, and preventing duplicate double-billing.',
      },
      {
        title: 'Superday Final Panel',
        format: 'Back-to-back technical and executive leadership interviews',
        focus: 'Portfolio projects, multi-threading, concurrency, microservices, and situational integrity questions.',
        insiderTip: 'Show genuine interest in FinTech scalability: payment gateways, latency in trading systems, or cloud banking.',
      },
    ],
    keyTopics: [
      {
        topic: 'Hashing & Sliding Window',
        mustMasterPatterns: ['Two Sum Variants', 'Subarray Sum Equals K', 'Group Anagrams', 'Longest Substring Without Repeats'],
        priority: 'Crucial',
      },
      {
        topic: 'SQL & Data Aggregation',
        mustMasterPatterns: ['Reconciliation Queries', 'Window Functions (RANK, DENSE_RANK)', 'Self-Joins', 'Duplicate Detection'],
        priority: 'Crucial',
      },
      {
        topic: 'Concurrency & Core CS',
        mustMasterPatterns: ['Deadlocks & Mutexes', 'Thread Pools', 'ACID Transactions', 'Connection Pooling'],
        priority: 'High',
      },
    ],
  },
  {
    id: 'oracle',
    name: 'Oracle',
    tagline: 'Database internals, operating systems, multithreading, OCI cloud scale & data structures.',
    color: '#c74634',
    salaryTier: 'Associate: INR 18-26 LPA ($120k-$160k) • MTS: INR 32-48 LPA ($160k-$210k)',
    oaPlatform: 'Oracle OA on HackerEarth/Glider (Coding + CS Core MCQs in OS, DBMS, OOP)',
    codingLanguageRecommendation: 'Java, C++, C, or Python',
    difficultyFocus: 'Medium with deep systems questions (65% Medium, 25% Easy, 10% Hard)',
    dsaWeight: '50%',
    csFundamentalsWeight: '35%',
    designWeight: '15%',
    recommendedSheetId: 'analyst-sql-100',
    resumeTips: [
      'Highlight system-level programming: memory management (malloc/free, GC), pointers, cache lines.',
      'Showcase database project experience: custom storage engine, query parsing, or index structures (B-Tree/LSM).',
      'Detail multithreading knowledge: producer-consumer, thread pools, race condition debugging.',
    ],
    cheatSheetKeywords: [
      'B+ Tree Indexing',
      'WAL (Write-Ahead Logging)',
      'Virtual Memory & Paging',
      'Semaphores & Mutexes',
      'Cycle Detection in Directed Graph',
      'Transaction Isolation Levels',
      'Deadlock Prevention',
    ],
    behavioralFocus:
      'Technical depth, ownership, curiosity about distributed cloud storage, and systems-level problem solving.',
    rounds: [
      {
        title: 'Round 0: Online Assessment',
        format: 'DSA coding questions + MCQs on DBMS, OS, and OOP (90 mins)',
        focus: 'Coding, SQL queries, memory management, and process scheduling questions.',
        insiderTip: 'Do not neglect the MCQ sections; high percentile in DBMS and OS is mandatory to clear cutoff.',
      },
      {
        title: 'Round 1: Data Structures & Algorithms',
        format: '45-60 minutes',
        focus: 'Binary Trees, BST, Linked Lists, Graphs, Heaps, and Hashing.',
        insiderTip: 'Write idiomatic code (Java/C++/Python). Explain memory layout (stack vs heap) of your data structures.',
      },
      {
        title: 'Round 2: Systems, OS & Database Internals',
        format: '60 minutes deep systems dive',
        focus: 'B-Trees vs B+ Trees, Indexing mechanisms, WAL (Write-Ahead Logging), Locking (Pessimistic vs Optimistic), Paging.',
        insiderTip: 'Review how an RDBMS executes a query engine from parser to optimizer and storage engine buffer pools.',
      },
      {
        title: 'Round 3: Techno-Managerial Round',
        format: '45 minutes with a Senior Engineering Director',
        focus: 'Large-scale project architecture, scalability bottlenecks, OCI cloud concepts, and team collaboration.',
        insiderTip: 'Demonstrate curiosity about cloud infrastructure: compute shapes, block storage, and high-availability zones.',
      },
    ],
    keyTopics: [
      {
        topic: 'Database Internals & Advanced SQL',
        mustMasterPatterns: ['B+ Tree Indexing', 'Transaction Isolation Levels', 'Query Execution Plans', 'Deadlock Detection'],
        priority: 'Crucial',
      },
      {
        topic: 'Operating Systems & Concurrency',
        mustMasterPatterns: ['Virtual Memory & Paging', 'Process vs Thread', 'Semaphores & Mutexes', 'Cache Coherence'],
        priority: 'Crucial',
      },
      {
        topic: 'Tree & Graph Traversal',
        mustMasterPatterns: ['BST Operations', 'Cycle Detection in Directed Graphs', 'Lowest Common Ancestor'],
        priority: 'High',
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tagline: 'High-speed problem solving, customer obsession, scalable HLD & 16 Leadership Principles.',
    color: '#ff9900',
    salaryTier: 'SDE-1: INR 26-38 LPA ($140k-$180k) • SDE-2: INR 48-70 LPA ($200k-$270k)',
    oaPlatform: 'Amazon Online Assessment (2 coding questions in 70 mins + Work Simulation Assessment)',
    codingLanguageRecommendation: 'Java, C++, Python, or C#',
    difficultyFocus: 'Fast Medium & Hard (70% Medium, 20% Hard, 10% Easy)',
    dsaWeight: '60%',
    csFundamentalsWeight: '15%',
    designWeight: '25%',
    recommendedSheetId: 'leetcode-75',
    resumeTips: [
      'Structure every achievement bullet using metrics: "Improved latency from 450ms to 85ms for 2M daily requests".',
      'Demonstrate end-to-end ownership: design, development, deployment, monitoring, and on-call resilience.',
      'Show customer-first trade-offs: choosing reliable architectures over unnecessary hype.',
    ],
    cheatSheetKeywords: [
      'Top K Frequent Elements',
      'Course Schedule (Topological)',
      'Rotting Oranges (Multi-source BFS)',
      'Word Ladder',
      'Merge K Sorted Lists',
      'Design Twitter / News Feed',
      'Consistent Hashing',
      '16 Leadership Principles (LP)',
    ],
    behavioralFocus:
      'Amazon 16 Leadership Principles (Customer Obsession, Ownership, Bias for Action, Dive Deep, Deliver Results). Every interview includes at least 2 LP questions.',
    rounds: [
      {
        title: 'Round 0: Online Assessment (OA1 & OA2)',
        format: '2 coding problems (70 mins) + 20-min Work Simulation / Style Assessment',
        focus: 'Standard patterns (Arrays, Graphs, Heaps, DP) and behavioral alignment scenarios.',
        insiderTip: 'In the work simulation, always prioritize customer needs and long-term architectural stability over quick hacks.',
      },
      {
        title: 'Round 1-3: Coding Speed & Cleanliness',
        format: '45-60 minutes per round: 2 questions per round expected',
        focus: 'Topological sort, priority queues, binary search, sliding window, and two pointers.',
        insiderTip: 'Speed is critical. Aim to produce bug-free working code within 15-20 minutes per problem with edge tests.',
      },
      {
        title: 'Round 4: High-Level System Design (HLD)',
        format: '45-60 minutes whiteboard',
        focus: 'Designing systems like URL Shortener, Newsfeed, Video Streaming, Distributed Rate Limiter.',
        insiderTip: 'Start with API signatures, data model, scale estimation, high-level diagram, then deep-dive into bottlenecks.',
      },
      {
        title: 'Round 5: Bar Raiser Round',
        format: '45-60 minutes with an independent Amazon Bar Raiser',
        focus: 'Behavioral stories evaluating long-term leadership potential against all 16 leadership principles.',
        insiderTip: 'Prepare 8-10 versatile STAR stories mapped to each principle. Provide clear metrics and lessons learned.',
      },
    ],
    keyTopics: [
      {
        topic: 'Priority Queues & K-Way Merges',
        mustMasterPatterns: ['Merge K Sorted Lists', 'Top K Elements', 'Find Median in Stream', 'Task Scheduler'],
        priority: 'Crucial',
      },
      {
        topic: 'High-Level System Design',
        mustMasterPatterns: ['Rate Limiting', 'Consistent Hashing', 'Message Queues (Kafka)', 'Cache Invalidation'],
        priority: 'Crucial',
      },
      {
        topic: 'Graph & BFS Shortest Path',
        mustMasterPatterns: ['Rotting Oranges', 'Word Ladder', 'Course Schedule', 'Clone Graph'],
        priority: 'Crucial',
      },
    ],
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    tagline: 'High-frequency algorithmic math, dynamic programming, advanced SQL & latency profiling.',
    color: '#2176ff',
    salaryTier: 'Analyst: INR 22-35 LPA ($125k-$165k) • Associate: INR 40-60 LPA ($175k-$230k)',
    oaPlatform: 'HackerRank (Math/Quant questions + 2 DSA coding problems + CS Core)',
    codingLanguageRecommendation: 'Java, C++, Python, or SQL',
    difficultyFocus: 'Math, Combinatorics & Medium DP (65% Medium, 25% Math/Hard, 10% Easy)',
    dsaWeight: '55%',
    csFundamentalsWeight: '25%',
    designWeight: '20%',
    recommendedSheetId: 'leetcode-sql-50',
    resumeTips: [
      'Highlight probability, statistics, linear algebra, or quantitative modeling exposure.',
      'Show low-latency performance tuning: profiling GC pauses, lock-free queues, caching layers.',
      'Detail robust multi-threaded applications and zero-data-loss architecture.',
    ],
    cheatSheetKeywords: [
      'Subarray Product Less Than K',
      'Fraction to Recurring Decimal',
      'Trapping Rain Water',
      'Coin Change 1 & 2',
      'Window Functions (LAG/LEAD)',
      'Probability & Dice Combinations',
      'Lock-Free Ring Buffers',
    ],
    behavioralFocus:
      'Culture of excellence, high intellectual rigor, teamwork under tight market deadlines, and fiduciary integrity.',
    rounds: [
      {
        title: 'Round 0: Online Assessment',
        format: 'HackerRank (2 Coding Problems + Math/Probability Aptitude + CS MCQs)',
        focus: 'Dynamic programming, strings, number theory, and Bayes theorem/probability.',
        insiderTip: 'Prepare basic combinatorics, modular arithmetic, and expectation math. Time management is crucial.',
      },
      {
        title: 'Round 1-2: Technical Problem Solving',
        format: '45-60 minute CoderPad interviews',
        focus: 'Sliding window, string parsing, sorting/searching, and matrix graph traversals.',
        insiderTip: 'Be prepared to calculate the exact count of primitive operations, not just asymptotic Big-O.',
      },
      {
        title: 'Round 3: CS Core, SQL & Multi-threading',
        format: '45 minutes',
        focus: 'Database indexes, transaction anomalies (dirty reads, phantom reads), volatile/atomic variables, thread contention.',
        insiderTip: 'Explain how Java or C++ manages thread synchronization and memory visibility across CPU cores.',
      },
      {
        title: 'Round 4: Partner / Executive Director Panel',
        format: '45 minutes with Managing Director',
        focus: 'Complex project deep-dive, situational judgment, dealing with production outages, culture alignment.',
        insiderTip: 'Show genuine passion for financial tech infrastructure, market data processing, or algorithmic trade pipelines.',
      },
    ],
    keyTopics: [
      {
        topic: 'Dynamic Programming & Math',
        mustMasterPatterns: ['Coin Change', 'Target Sum', 'Combinatorics & Modular Inverse', 'Pascal Triangle'],
        priority: 'Crucial',
      },
      {
        topic: 'Two Pointers & Sliding Window',
        mustMasterPatterns: ['Trapping Rain Water', 'Minimum Window Substring', 'Subarray Product Less Than K'],
        priority: 'Crucial',
      },
      {
        topic: 'Relational Database Queries',
        mustMasterPatterns: ['LAG / LEAD Window Functions', 'Self-Joins on Financial Ledgers', 'Deduplication'],
        priority: 'High',
      },
    ],
  },
  {
    id: 'uber-atlassian',
    name: 'Uber / Atlassian',
    tagline: 'Production-ready code quality, concurrency, low-level design patterns & distributed scale.',
    color: '#0052cc',
    salaryTier: 'SWE-1: INR 30-45 LPA ($150k-$190k) • SWE-2: INR 55-80 LPA ($220k-$300k)',
    oaPlatform: 'CodeSignal General Coding Assessment (Score 800+ required) or Karat Interview',
    codingLanguageRecommendation: 'Java, Go, C++, Python, or TypeScript',
    difficultyFocus: 'Clean Medium & System Design (75% Medium, 20% Hard, 5% Easy)',
    dsaWeight: '50%',
    csFundamentalsWeight: '20%',
    designWeight: '30%',
    recommendedSheetId: 'complete-dsa-350',
    resumeTips: [
      'Demonstrate clean code craftsmanship: unit tests, mocking, SOLID design, descriptive variable names.',
      'Highlight real-time event streaming: Kafka, WebSockets, Redis pub/sub, geospatial queries (H3/Uber spatial).',
      'Show experience with rate limiting, circuit breakers, and fault-tolerant microservices.',
    ],
    cheatSheetKeywords: [
      'Concurrency Locks (ReentrantLock)',
      'Design Distributed Rate Limiter',
      'Geohash / QuadTree Spatial Search',
      'Design Snake & Ladder / Tic-Tac-Toe',
      'Dijkstra Shortest Path (Rider Matching)',
      'LRU / LFU Cache with O(1)',
    ],
    behavioralFocus:
      'Atlassian Values: "Open company, no bullshit", "Build with heart & balance", "Play as a team". Uber: "Go get it", "Great minds don\'t think alike".',
    rounds: [
      {
        title: 'Round 0: CodeSignal OA / Karat Interview',
        format: 'CodeSignal GCA (4 questions in 70 mins) or 60-min Karat video technical screen',
        focus: 'Implementation speed, 2D matrix manipulation, hash maps, and test coverage.',
        insiderTip: 'Karat allows 1 redo interview if you don’t perform well. Practice quick debugging on buggy code.',
      },
      {
        title: 'Round 1: Machine Coding / Low-Level Design (LLD)',
        format: '90-120 minutes live coding a working, compileable system with unit tests',
        focus: 'Designing rate limiters, ride-matching engines, file system navigators, or Jira issue trackers.',
        insiderTip: 'Write executable code that compiles and runs! Use OOP design patterns and handle edge conditions gracefully.',
      },
      {
        title: 'Round 2: Algorithmic Problem Solving',
        format: '45-60 minutes',
        focus: 'Graphs (Dijkstra, BFS), Tree traversals, Heap priority queues, and interval scheduling.',
        insiderTip: 'Communicate modularity. Write clean helper methods rather than writing a 90-line single function.',
      },
      {
        title: 'Round 3: High-Level System Design (HLD)',
        format: '60 minutes',
        focus: 'Design Ride Hailing (Uber/Lyft), Real-Time Chat, Collaborative Document Editing (Confluence), or Distributed Task Queue.',
        insiderTip: 'Discuss data partitioning, caching strategies, WebSockets vs polling, and failover redundancy.',
      },
      {
        title: 'Round 4: Values & Culture Interview',
        format: '45 minutes with Senior Manager',
        focus: 'Empathy, constructive feedback, team health, handling post-mortems and production outages.',
        insiderTip: 'Show high psychological safety and ownership: focus on system fixes rather than pointing fingers.',
      },
    ],
    keyTopics: [
      {
        topic: 'Machine Coding & LLD',
        mustMasterPatterns: ['Rate Limiter (Token Bucket / Sliding Log)', 'Design Cache (LRU/LFU)', 'SOLID OOP', 'Pub/Sub Broker'],
        priority: 'Crucial',
      },
      {
        topic: 'Graph Shortest Path & Spatial',
        mustMasterPatterns: ['Dijkstra', 'BFS Matrix Shortest Path', 'Connected Components'],
        priority: 'Crucial',
      },
      {
        topic: 'High-Level System Design',
        mustMasterPatterns: ['Geospatial Indexing', 'WebSocket Message Fanout', 'Database Sharding & Replication'],
        priority: 'High',
      },
    ],
  },
];

// The 6-Step End-to-End Candidate Placement Process Blueprint
export const CANDIDATE_PROCESS_STAGES: CandidateProcessStage[] = [
  {
    id: 'stage-1-resume',
    stageNumber: 1,
    title: 'Resume Engineering & ATS Optimization',
    subtitle: 'The 1-Page Gatekeeper: Convert recruiters into guaranteed screening calls.',
    timing: 'Weeks 1 – 2 (or Month 1 Kickoff)',
    category: 'resume',
    actionItems: [
      'Format into a clean, 1-page single-column LaTeX or Markdown-derived PDF (tested on ATS scanners like Jobscan/Resumake).',
      'Implement the Google X-Y-Z formula for every bullet: "Accomplished [X], measured by [Y], by doing [Z]".',
      'Feature 2 deep production-grade projects: include live demo URLs, GitHub repositories, architecture diagrams, and test suites.',
      'Include verifiable proof-of-work: LeetCode profile link, Codeforces/CodeChef ratings, open-source pull requests, or hackathons.',
      'Remove buzzwords and decorative graphics that break ATS parsers (no progress rating bars or multi-column text tables).',
    ],
    keyPitfallsToAvoid: [
      'Listing 20 technologies you only watched a tutorial on; interviewers will grill you on anything on your resume.',
      'Submitting 2+ page resumes as a candidate with under 5 years experience.',
      'Missing metrics (e.g. "built an API" vs "engineered REST APIs handling 4,000 req/sec with < 40ms p99 latency").',
    ],
    proTip:
      'Save your resume as "Firstname_Lastname_Software_Engineer_2026.pdf". Check that text can be copied cleanly without scrambled character encoding.',
  },
  {
    id: 'stage-2-sourcing',
    stageNumber: 2,
    title: 'Referral Sourcing & Recruiter Outreach',
    subtitle: 'Bypass the 10,000-applicant portal blackhole through warm connections.',
    timing: 'Weeks 3 – 4 & Ongoing',
    category: 'resume',
    actionItems: [
      'Build a target list of 30-50 companies segmented into Dream (Tier 1), Target (Tier 2), and Safety (Growth startups/Services).',
      'Reach out to college alumni, former interns, and 2nd-degree LinkedIn connections working at target companies.',
      'Use the 3-sentence outreach formula: (1) Warm connection / genuine compliment, (2) Specific Job ID + match to your skills, (3) Clean resume link + zero-pressure ask.',
      'Engage on LinkedIn tech posts: leave thoughtful technical comments on posts by engineering managers and team leads.',
      'Track all applications in a personal spreadsheet: Company, Job ID, Referral Contact, Application Date, and Follow-Up Date (7 days).',
    ],
    keyPitfallsToAvoid: [
      'Sending a generic "Hi sir, please give me referral" with no job ID or context.',
      'Applying to 10 different roles at the same company simultaneously; choose the 1-2 roles that match your best stack.',
      'Failing to follow up: 50% of referrals happen on the polite 5-to-7 day reminder follow-up.',
    ],
    proTip:
      'Search LinkedIn: "I\'m hiring software engineer" or "hiring SDE" + your target company to find hiring managers directly.',
  },
  {
    id: 'stage-3-oa',
    stageNumber: 3,
    title: 'Online Assessment (OA) Cracking Strategy',
    subtitle: 'Survive automated proctoring, hidden edge test cases, and strict time constraints.',
    timing: 'Weeks 5 – 8',
    category: 'oa',
    actionItems: [
      'Familiarize yourself with platform idiosyncrasies: HackerRank (fast I/O), Codility (performance score), CodeSignal (speed score).',
      'Handle extreme constraints: use 64-bit integers (`long long` in C++, `long` in Java) to prevent integer overflow on large tests.',
      'Test edge cases before final submit: empty arrays, 1-element arrays, duplicate values, negative numbers, all zero elements, max/min bounds (10^9).',
      'Time budget rigorously: in a 2-problem 90-minute OA, spend max 30 minutes on Q1, 45 minutes on Q2, and 15 minutes reviewing.',
      'Write brute-force first if optimal approach is not immediately obvious; passing 60% of test cases is infinitely better than 0%.',
    ],
    keyPitfallsToAvoid: [
      'Relying on slow string concatenation in loops (`str += char` creates O(n²) copies; use `StringBuilder` or list join).',
      'Forgetting recursion depth limits: Python default recursion depth is 1000; set `sys.setrecursionlimit(200000)` if using DFS.',
      'Tab switching or leaving full screen during proctored webcam tests.',
    ],
    proTip:
      'Always calculate input constraints: N <= 10^5 implies an O(N log N) or O(N) solution. N <= 20 implies O(2^N) backtracking/bitmask.',
  },
  {
    id: 'stage-4-interview-protocol',
    stageNumber: 4,
    title: 'Live Technical Interview 5-Step Execution Protocol',
    subtitle: 'The systematic communication framework that turns average coders into top-tier offers.',
    timing: 'Weeks 8 – 12',
    category: 'interview-protocol',
    actionItems: [
      'Step 1 (Clarify & Bound): Ask 2-3 clarifying questions about input bounds, duplicate handling, null values, and return formats.',
      'Step 2 (Dry Run an Example): Walk through a small, non-trivial example on the whiteboard/editor manually before writing any code.',
      'Step 3 (Propose & Analyze): State the brute force in 60 seconds, then state the optimal approach with exact Big-O time and space complexity.',
      'Step 4 (Clean Modular Implementation): Write clean, production-grade code with descriptive variables (e.g. `leftPointer` instead of `l`).',
      'Step 5 (Self-Correction & Testing): Trace your code line-by-line with an example. Catch your own bugs before the interviewer does!',
    ],
    keyPitfallsToAvoid: [
      'Starting to code within 30 seconds of hearing the problem (the #1 red flag cited by Google & Microsoft interviewers).',
      'Radio silence: going mute for 5 minutes leaves the interviewer completely in the dark on your thought process.',
      'Saying "I am done!" without running through the code on a sample input.',
    ],
    proTip:
      'Treat the interviewer as a senior teammate pairing with you on a ticket, not as an adversary grading an exam.',
  },
  {
    id: 'stage-5-cs-fundamentals',
    stageNumber: 5,
    title: 'Core CS Fundamentals & SQL Engineering',
    subtitle: 'The differentiator that separates junior coders from full-stack software engineers.',
    timing: 'Weeks 9 – 13',
    category: 'cs-fundamentals',
    actionItems: [
      'Operating Systems: Master Virtual Memory, Paging, Page Replacement (LRU), Process vs Threads, Semaphores, Mutexes, and Deadlock Conditions (Coffman).',
      'DBMS & Storage: Master ACID transactions, Isolation Levels (Read Uncommitted to Serializable), B+ Tree indexing, and WAL.',
      'SQL Mastery: Complete LeetCode SQL 50 and Analyst SQL 100 with focus on Window Functions (`ROW_NUMBER`, `DENSE_RANK`, `LAG/LEAD`), CTEs, and self-joins.',
      'Computer Networks: Master TCP 3-way handshake, TCP vs UDP, DNS resolution hierarchy, HTTP/1.1 vs HTTP/2 vs HTTP/3, and TLS handshake.',
      'Low-Level Design (LLD): Implement LRU Cache, Design Parking Lot, and apply SOLID principles (Single Responsibility, Open/Closed).',
    ],
    keyPitfallsToAvoid: [
      'Memorizing SQL syntax without understanding query execution order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY.',
      'Inability to write basic multi-threaded code or explain race conditions.',
      'Ignoring database indexes and doing table scans on 10-million-row financial tables.',
    ],
    proTip:
      'In technical interviews, whenever you propose a hash map, proactively mention the trade-off: O(1) average lookup vs O(N) space and hash collisions.',
  },
  {
    id: 'stage-6-behavioral',
    stageNumber: 6,
    title: 'Behavioral & Leadership Rounds (The STAR Method)',
    subtitle: 'Where hiring decisions are finalized: Prove you are someone people love working with.',
    timing: 'Weeks 13 – 16',
    category: 'behavioral',
    actionItems: [
      'Prepare 8 versatile stories mapped to the STAR framework (Situation, Task, Action, Result).',
      'Ensure every story highlights your specific individual actions ("I designed the schema..." instead of "We decided...").',
      'Quantify the Result: Include metrics, team velocity improvements, latency reductions, or customer feedback.',
      'Prepare the 6 classic questions: (1) Technical conflict with teammate, (2) A time you failed, (3) Working with vague requirements, (4) Proudest achievement, (5) Why this company, (6) Tight deadline trade-off.',
      'Prepare 3 thoughtful questions to ask the interviewer about engineering challenges, technical debt, and team roadmap.',
    ],
    keyPitfallsToAvoid: [
      'Giving fake weaknesses like "I am too much of a perfectionist" (use a genuine growth area and what you are doing to improve it).',
      'Speaking negatively about former employers, professors, or teammates.',
      'Ramble for 10 minutes without structured storytelling; keep each STAR answer to 2.5 – 3.5 minutes.',
    ],
    proTip:
      'The "Action" portion of the STAR answer should consume 60-70% of your talking time; the Situation and Task should only take 30 seconds.',
  },
];

// Interactive Candidate Placement Readiness Checklist
export const READINESS_CHECKLIST_ITEMS: ReadinessChecklistItem[] = [
  // Core DSA
  {
    id: 'chk-two-pointers',
    category: 'Core DSA',
    label: 'Mastered Two Pointers & In-Place Reversal (Two Sum II, 3Sum, Trapping Rain Water)',
    targetCount: '15 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-sliding-window',
    category: 'Core DSA',
    label: 'Mastered Sliding Window & Hash Frequency (Minimum Window Substring, Longest Substring Without Repeats)',
    targetCount: '12 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-binary-search',
    category: 'Core DSA',
    label: 'Mastered Binary Search on Answer Space (Koko Eating Bananas, Split Array Largest Sum)',
    targetCount: '10 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-fast-slow',
    category: 'Core DSA',
    label: 'Mastered Fast & Slow Pointers on Linked Lists (Floyd Cycle, Reverse in K-Groups, Merge K Lists)',
    targetCount: '10 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-monotonic-stack',
    category: 'Core DSA',
    label: 'Mastered Monotonic Stacks & Queues (Daily Temperatures, Largest Rectangle in Histogram, Sliding Window Max)',
    targetCount: '10 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },

  // Advanced DSA
  {
    id: 'chk-trees-bst',
    category: 'Advanced DSA',
    label: 'Mastered Trees & BST (Level Order, Lowest Common Ancestor, Validate BST, Serialize/Deserialize)',
    targetCount: '25 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-graphs',
    category: 'Advanced DSA',
    label: 'Mastered Graphs (BFS/DFS, Kahn Topological Sort, Disjoint Set Union / DSU, Dijkstra Shortest Path)',
    targetCount: '25 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-dynamic-programming',
    category: 'Advanced DSA',
    label: 'Mastered Dynamic Programming (1D Linear, 2D Grid, 0/1 Knapsack, Longest Common Subsequence)',
    targetCount: '30 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'chk-heaps-priority',
    category: 'Advanced DSA',
    label: 'Mastered Heaps & Top-K Elements (Merge K Sorted Lists, Find Median from Data Stream, Task Scheduler)',
    targetCount: '12 Questions',
    recommendedSheetId: 'complete-dsa-350',
  },

  // SQL & Databases
  {
    id: 'chk-sql-50',
    category: 'SQL & Databases',
    label: 'Completed LeetCode Official SQL 50 Study Plan',
    targetCount: '50 Questions',
    recommendedSheetId: 'leetcode-sql-50',
  },
  {
    id: 'chk-window-functions',
    category: 'SQL & Databases',
    label: 'Mastered Window Functions (`ROW_NUMBER`, `DENSE_RANK`, `LAG`, `LEAD`, cumulative sums)',
    targetCount: '15 Questions',
    recommendedSheetId: 'analyst-sql-100',
  },
  {
    id: 'chk-analyst-sql',
    category: 'SQL & Databases',
    label: 'Completed Data Analyst SQL 100 (Joins, CTEs, Gaps & Islands, Dashboard KPI Queries)',
    targetCount: '100 Questions',
    recommendedSheetId: 'analyst-sql-100',
  },

  // CS Fundamentals
  {
    id: 'chk-os-core',
    category: 'CS Fundamentals',
    label: 'Operating Systems: Virtual memory, Page replacement, Process vs Threads, Mutexes & Deadlocks',
    targetCount: 'Full Review',
  },
  {
    id: 'chk-dbms-core',
    category: 'CS Fundamentals',
    label: 'DBMS Internals: ACID properties, B+ Tree index structures, Transaction Isolation & WAL',
    targetCount: 'Full Review',
  },
  {
    id: 'chk-networks-core',
    category: 'CS Fundamentals',
    label: 'Computer Networks: TCP 3-way handshake, DNS hierarchy, HTTP/1.1 vs HTTP/2, TLS handshake',
    targetCount: 'Full Review',
  },
  {
    id: 'chk-lld-patterns',
    category: 'CS Fundamentals',
    label: 'Low-Level Design (LLD): Implemented LRU Cache, SOLID Principles & Factory/Strategy Patterns',
    targetCount: 'Full Review',
  },

  // Interview & Mock
  {
    id: 'chk-company-track',
    category: 'Interview & Mock',
    label: 'Solved at least 60+ targeted questions from your target company track (Google, Microsoft, or JPMorgan)',
    targetCount: '60+ Questions',
    recommendedSheetId: 'google-200',
  },
  {
    id: 'chk-timed-mocks',
    category: 'Interview & Mock',
    label: 'Conducted 5+ full-length 45-minute timed mock interviews with peers (speaking out loud, no autocomplete)',
    targetCount: '5 Mock Rounds',
  },
  {
    id: 'chk-star-stories',
    category: 'Interview & Mock',
    label: 'Drafted and rehearsed 8 STAR behavioral stories for Leadership / HR / Culture rounds',
    targetCount: '8 Stories',
  },
  {
    id: 'chk-quick-revision',
    category: 'Interview & Mock',
    label: 'Cleared all "Struggled" and "Tough" questions in Quick Revision queue with spaced repetition',
    targetCount: '0 Overdue',
    recommendedSheetId: 'quick-revision',
  },
];

// Multi-Pace Roadmaps
export const PREPARATION_PHASES: PlannerMilestone[] = [
  {
    id: 'phase-1',
    title: 'Phase 1: Foundations, Complexity & Linear Structures',
    duration: 'Month 1 (Weeks 1 – 4)',
    focus: 'Build deep muscle memory on asymptotic analysis, two pointers, sliding window, and linear data structures.',
    tasks: [
      'Master Big-O time and space complexity: learn to prove why an algorithm runs in O(N log N) vs O(N²).',
      'Arrays & Two Pointers: Two Sum, 3Sum, Container With Most Water, Trapping Rain Water.',
      'Sliding Window & Hash Maps: Longest Substring Without Repeating Characters, Group Anagrams, Minimum Window Substring.',
      'Linked Lists: Fast & slow pointers (Floyd cycle detection), in-place reversal, and Merge K Sorted Lists.',
      'Stacks & Monotonic Stacks: Valid Parentheses, Daily Temperatures, Largest Rectangle in Histogram.',
      'SQL Track Kickoff: Complete SQL Fundamentals (Analyst SQL 001–015) and Basic LeetCode queries.',
    ],
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'phase-2',
    title: 'Phase 2: Hierarchical Structures, Graphs & Dynamic Programming',
    duration: 'Month 2 (Weeks 5 – 8)',
    focus: 'Conquer tree traversals, shortest path graphs, and multi-state dynamic programming.',
    tasks: [
      'Trees & Binary Search Trees: BFS Level Order, DFS Pre/In/Postorder, LCA, Validate BST.',
      'Heaps & Priority Queues: Top K Frequent Elements, Task Scheduler, Find Median from Data Stream.',
      'Graph Algorithms: BFS/DFS, Cycle detection, Kahn Topological Sort, Disjoint Set Union (DSU), Dijkstra.',
      'Dynamic Programming: 1D DP (House Robber, Coin Change), 2D Grid DP (Unique Paths), Knapsack, LCS & LIS.',
      'SQL Joins & Window Functions: Solve Joins & Relational Logic + Window Functions (ROW_NUMBER, RANK, LAG/LEAD).',
    ],
    recommendedSheetId: 'complete-dsa-350',
  },
  {
    id: 'phase-3',
    title: 'Phase 3: Target Company 200 Drilling & Advanced Patterns',
    duration: 'Month 3 (Weeks 9 – 12)',
    focus: 'Targeted preparation for Google, Microsoft, JPMorgan, and Oracle with timed problem-solving.',
    tasks: [
      'Select your primary target track: Google 200, Microsoft 200, or JPMorgan 200.',
      'Implement the "20-Minute Rule": Never look at solutions before 20 minutes of active pen-and-paper dry-running.',
      'Advanced Structures: Trie (Word Search II), Segment Trees / Fenwick Trees for range queries.',
      'Low-Level Design (LLD): Implement LRU Cache, Design Twitter, Design Circular Queue, and OOP SOLID systems.',
      'SQL CTEs & Case Studies: Master Recursive CTEs, Gaps and Islands, and Dashboard KPI query engineering.',
    ],
    recommendedSheetId: 'google-200',
  },
  {
    id: 'phase-4',
    title: 'Phase 4: Spaced Revision, Mock Interviews & Behavioral Polish',
    duration: 'Month 4 (Weeks 13 – 16 / Onsite Sprint)',
    focus: 'Retention guarantee via spaced repetition, timed mock rounds, and STAR story mastery.',
    tasks: [
      'Review all "Struggled" and "Tough" questions in your Quick Revision queue.',
      'Execute 10+ full-length 45-minute timed mock interviews with a peer or interview simulator.',
      'Prepare 8 structured STAR behavioral stories (Situation, Task, Action, Result) covering leadership, conflict, and ownership.',
      'System Design Polish: Practice high-level architecture diagrams, back-of-the-envelope scale math, and trade-offs.',
      'Final resume audit: Ensure every listed bullet has measurable impact and you can explain every underlying line of code.',
    ],
    recommendedSheetId: 'quick-revision',
  },
];

// Daily routine schedules
export const DAILY_ROUTINES = [
  {
    title: '2-Hour Daily Routine (Working Professionals & Busy College Students)',
    allocations: [
      { time: '15 Mins', task: 'Review yesterday’s "Struggled" and "Tough" spaced revision questions in Quick Revision.' },
      { time: '45 Mins', task: 'Solve 1 new Medium problem (timed, whiteboard/pen-paper first, no IDE autocomplete).' },
      { time: '40 Mins', task: 'Solve 1 SQL question or review CS fundamentals (OS/DBMS/Computer Networks).' },
      { time: '20 Mins', task: 'Log revision confidence score, document key pitfalls, and record time/space complexity notes.' },
    ],
  },
  {
    title: '4-Hour Daily Placement Semester Routine (Dedicated Preparation)',
    allocations: [
      { time: '30 Mins', task: 'Clear spaced repetition queue and redo questions with past confidence "Struggled".' },
      { time: '90 Mins', task: 'Solve 2 Medium problems or 1 Hard problem from your target company track.' },
      { time: '45 Mins', task: 'Solve 2 complex SQL problems (Window functions, CTEs, or business metrics).' },
      { time: '45 Mins', task: 'Deep dive into 1 CS topic: Operating Systems (Virtual memory/Deadlocks) or DBMS (B+ trees).' },
      { time: '30 Mins', task: 'Log progress, write complexity analysis, and practice explaining your code out loud.' },
    ],
  },
  {
    title: '8-Hour Weekend Bootcamp Sprint (Intensive Prep)',
    allocations: [
      { time: '60 Mins', task: 'Spaced repetition sprint: clear entire weekly review queue.' },
      { time: '90 Mins', task: 'Mock test: 2 Medium problems in 75 minutes without IDE autocomplete.' },
      { time: '90 Mins', task: 'System Design / Low-Level Design (LLD) architectural case study (LRU Cache, Rate Limiter).' },
      { time: '90 Mins', task: 'Target company 200 track drilling: 2 Medium/Hard company-tagged problems.' },
      { time: '60 Mins', task: 'Advanced SQL queries & database execution plan analysis.' },
      { time: '45 Mins', task: 'Behavioral STAR story refinement and interview retrospective.' },
    ],
  },
];
