import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  ExternalLink,
  Filter,
  Search,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { Difficulty, Problem, ProblemStatus } from '../types/index.ts';
import { QuestionRow } from './QuestionRow.tsx';
import { getCanonicalStats } from '../utils/trackerLogic.ts';

export const SheetDetailView: React.FC = () => {
  const {
    currentSheet,
    setActiveView,
    allProblemsById,
    userStates,
    followedSheetIds,
    toggleFollowSheet,
    searchQuery,
    setSearchQuery,
    difficultyFilter,
    setDifficultyFilter,
    statusFilter,
    setStatusFilter,
    onlyFavorites,
    setOnlyFavorites,
  } = useTracker();

  // Accordion open/close state: topic name -> boolean
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  if (!currentSheet) {
    return (
      <div className="p-8 text-center">
        <p className="text-[#8b949e]">Sheet not found.</p>
        <button
          onClick={() => setActiveView('sheets')}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium"
        >
          Return to All Sheets
        </button>
      </div>
    );
  }

  const isFollowed = followedSheetIds.includes(currentSheet.id);

  // Retrieve problems in this sheet
  const problems = useMemo(() => {
    return currentSheet.problemIds
      .map((id) => allProblemsById[id])
      .filter((p): p is Problem => Boolean(p));
  }, [currentSheet.problemIds, allProblemsById]);

  // Overall stats for this sheet
  const sheetStats = useMemo(() => {
    return getCanonicalStats(currentSheet.problemIds, userStates, allProblemsById);
  }, [currentSheet.problemIds, userStates, allProblemsById]);

  // Group problems by Topic
  const groupedByTopic = useMemo(() => {
    const groups: Record<string, Problem[]> = {};
    for (const p of problems) {
      const topic = p.topic || 'General';
      if (!groups[topic]) groups[topic] = [];
      groups[topic].push(p);
    }
    return groups;
  }, [problems]);

  const topicNames = Object.keys(groupedByTopic);

  // Toggle specific topic accordion (preserves window scroll position)
  const toggleTopic = (topic: string) => {
    setOpenTopics((prev) => ({
      ...prev,
      [topic]: prev[topic] === undefined ? false : !prev[topic],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    topicNames.forEach((t) => (allOpen[t] = true));
    setOpenTopics(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    topicNames.forEach((t) => (allClosed[t] = false));
    setOpenTopics(allClosed);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Back button and breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveView('sheets')}
          className="inline-flex items-center gap-2 text-xs md:text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sheets Catalog</span>
        </button>

        <div className="flex items-center gap-2">
          {currentSheet.externalReferenceUrl && (
            <a
              href={currentSheet.externalReferenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181f2c] hover:bg-[#20293a] border border-[#272e3d] text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              <span>Reference Page</span>
              <ExternalLink className="w-3 h-3 text-orange-400" />
            </a>
          )}

          <button
            onClick={() => toggleFollowSheet(currentSheet.id)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isFollowed
                ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 hover:bg-orange-500/20'
                : 'bg-[#181f2c] border-[#2d3546] text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            {isFollowed ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Following</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Follow Sheet</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sheet Hero Banner */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase">
                {currentSheet.category.replace('-', ' ')}
              </span>
              {currentSheet.companyTag && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {currentSheet.companyTag} Evidence
                </span>
              )}
              {currentSheet.isOfficial && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30">
                  Official Plan
                </span>
              )}
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentSheet.title}
            </h2>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              {currentSheet.description}
            </p>

            {currentSheet.recommendedOrderDescription && (
              <div className="mt-3 p-3 rounded-lg bg-[#111620] border border-[#222938] text-xs text-[#9aa4b2] flex items-start gap-2">
                <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{currentSheet.recommendedOrderDescription}</span>
              </div>
            )}
          </div>

          {/* Progress Circular & Detailed Stat card */}
          <div className="bg-[#111620] border border-[#272e3d] rounded-xl p-4 md:min-w-[260px] shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#8b949e]">Overall Progress</span>
              <span className="text-base font-bold text-white font-mono">
                {sheetStats.progressPercent}%
              </span>
            </div>

            <div className="w-full bg-[#202838] h-2.5 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${sheetStats.progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-[#1d2432]">
              <div className="bg-[#151c27] p-1.5 rounded">
                <div className="text-emerald-400 font-bold">{sheetStats.easy.solved}/{sheetStats.easy.total}</div>
                <div className="text-[10px] text-[#7d8590]">Easy</div>
              </div>
              <div className="bg-[#151c27] p-1.5 rounded">
                <div className="text-amber-400 font-bold">{sheetStats.medium.solved}/{sheetStats.medium.total}</div>
                <div className="text-[10px] text-[#7d8590]">Medium</div>
              </div>
              <div className="bg-[#151c27] p-1.5 rounded">
                <div className="text-rose-400 font-bold">{sheetStats.hard.solved}/{sheetStats.hard.total}</div>
                <div className="text-[10px] text-[#7d8590]">Hard</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Accordion Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#151b26] border border-[#272e3d] rounded-xl">
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="bg-[#111620] border border-[#2a3242] text-xs text-[#c9d1d9] rounded-lg px-2.5 py-1.5 outline-none focus:border-orange-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#111620] border border-[#2a3242] text-xs text-[#c9d1d9] rounded-lg px-2.5 py-1.5 outline-none focus:border-orange-500"
          >
            <option value="all">All Statuses</option>
            <option value="solved">Solved</option>
            <option value="attempted">Attempted</option>
            <option value="unsolved">Unsolved</option>
          </select>

          {/* Only Favorites */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              onlyFavorites
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                : 'bg-[#111620] border-[#2a3242] text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            Favorites Only
          </button>
        </div>

        {/* Expand / Collapse All */}
        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 px-2 py-1"
          >
            Expand All
          </button>
          <span className="text-[#3b4354]">|</span>
          <button
            onClick={collapseAll}
            className="text-xs font-semibold text-[#8b949e] hover:text-white px-2 py-1"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Topics Accordion List */}
      <div className="space-y-4">
        {topicNames.length === 0 ? (
          <div className="text-center py-12 bg-[#151b26] border border-[#272e3d] rounded-xl text-[#8b949e]">
            No problems found in this sheet.
          </div>
        ) : (
          topicNames.map((topic) => {
            const topicProblems = groupedByTopic[topic] || [];

            // Apply search & filter to topic problems
            const filteredTopicProblems = topicProblems.filter((p) => {
              if (difficultyFilter !== 'all' && p.difficulty !== difficultyFilter) {
                return false;
              }
              const st = userStates[p.id]?.status || 'unsolved';
              if (statusFilter !== 'all' && st !== statusFilter) {
                return false;
              }
              if (onlyFavorites && !userStates[p.id]?.isFavorite) {
                return false;
              }
              if (searchQuery.trim().length > 0) {
                const q = searchQuery.toLowerCase();
                const matchTitle = p.title.toLowerCase().includes(q);
                const matchTopic = p.topic.toLowerCase().includes(q);
                const matchPattern = p.pattern.toLowerCase().includes(q);
                const matchCompany = p.companyEvidence?.some((c) =>
                  c.company.toLowerCase().includes(q)
                );
                if (!matchTitle && !matchTopic && !matchPattern && !matchCompany) {
                  return false;
                }
              }
              return true;
            });

            // If there's an active search query and this topic has no matches, hide the topic
            if (
              (searchQuery.trim().length > 0 ||
                difficultyFilter !== 'all' ||
                statusFilter !== 'all' ||
                onlyFavorites) &&
              filteredTopicProblems.length === 0
            ) {
              return null;
            }

            // Accordion is open by default unless explicitly toggled off
            const isOpen = openTopics[topic] !== false;

            // Topic stats
            const topicStats = getCanonicalStats(
              topicProblems.map((p) => p.id),
              userStates,
              allProblemsById
            );

            return (
              <div
                key={topic}
                className="bg-[#121620] border border-[#232a38] rounded-xl overflow-hidden transition-colors"
              >
                {/* Topic Header Accordion Trigger */}
                <button
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-[#151c27] hover:bg-[#1a2332] flex items-center justify-between text-left transition-colors cursor-pointer gap-2"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="font-bold text-white text-xs sm:text-sm md:text-base">
                      {topic}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-[#1f2838] text-[#8b949e] border border-[#2e3a4f] px-2 py-0.5 rounded-full font-mono">
                      {topicProblems.length} questions
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                    {/* Completion count */}
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e]">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          topicStats.solved === topicStats.total && topicStats.total > 0
                            ? 'text-emerald-400'
                            : 'text-[#64748b]'
                        }`}
                      />
                      <span>
                        <strong className="text-white font-mono">{topicStats.solved}</strong> /{' '}
                        {topicStats.total}
                      </span>
                    </div>

                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#8b949e]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#8b949e]" />
                    )}
                  </div>
                </button>

                {/* Inline Question List */}
                {isOpen && (
                  <div className="p-3 md:p-4 space-y-2 bg-[#10141d]">
                    {filteredTopicProblems.length === 0 ? (
                      <div className="py-4 text-center text-xs text-[#7d8590]">
                        No questions in this section match the active filters.
                      </div>
                    ) : (
                      filteredTopicProblems.map((problem, idx) => (
                        <QuestionRow
                          key={problem.id}
                          problem={problem}
                          index={idx}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
