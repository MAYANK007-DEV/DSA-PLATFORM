import React from 'react';
import {
  CheckCircle2,
  Clock,
  Circle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  Building,
  Database,
  Flame,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { SheetCard } from './SheetCard.tsx';

export const DashboardView: React.FC = () => {
  const {
    overallStats,
    sheets,
    followedSheetIds,
    quickRevisionIds,
    allProblemsById,
    revisions,
    userStates,
    openSheet,
    setActiveFilterPill,
    setActiveView,
    seedDemoActivity,
  } = useTracker();

  // Followed sheets
  const followedSheets = sheets.filter((s) => followedSheetIds.includes(s.id));

  // Overdue or revision items
  const revisionItems = quickRevisionIds
    .map((id) => allProblemsById[id])
    .filter((p) => Boolean(p))
    .slice(0, 5);

  const hasProgress = overallStats.solved > 0 || overallStats.attempted > 0;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Workspace Welcome & High-level Stats */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                Personal Placement Command Center
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Candidate Preparation Workspace
            </h2>
            <p className="text-xs md:text-sm text-[#8b949e] mt-1 max-w-xl leading-relaxed">
              Tracking sequence-wise DSA patterns, FAANG company target tracks, and production SQL paths. Canonical deduplication active: cross-sheet overlaps count once.
            </p>
          </div>

          {!hasProgress && (
            <button
              onClick={seedDemoActivity}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer self-start md:self-auto shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Sample Progress</span>
            </button>
          )}
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-6 pt-6 border-t border-[#222938]">
          <div className="bg-[#111620] border border-[#232b3b] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs text-[#8b949e]">
              <span className="truncate">Unique Solved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">
              {overallStats.solved}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#7d8590] mt-0.5 truncate">
              of {overallStats.total} ({overallStats.progressPercent}%)
            </div>
          </div>

          <div className="bg-[#111620] border border-[#232b3b] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs text-[#8b949e]">
              <span className="truncate">In Attempt</span>
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-300 mt-1 font-mono">
              {overallStats.attempted}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#7d8590] mt-0.5 truncate">
              In progress
            </div>
          </div>

          <div className="bg-[#111620] border border-[#232b3b] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs text-[#8b949e]">
              <span className="truncate">Due for Revision</span>
              <RotateCcw className="w-4 h-4 text-rose-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-rose-300 mt-1 font-mono">
              {quickRevisionIds.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#7d8590] mt-0.5 truncate">
              Spaced queue
            </div>
          </div>

          <div className="bg-[#111620] border border-[#232b3b] rounded-xl p-3 sm:p-4">
            <div className="flex items-center justify-between text-xs text-[#8b949e]">
              <span className="truncate">Followed Sheets</span>
              <BookmarkCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-cyan-300 mt-1 font-mono">
              {followedSheetIds.length}
            </div>
            <div className="text-[10px] sm:text-[11px] text-[#7d8590] mt-0.5 truncate">
              Active pathways
            </div>
          </div>
        </div>

        {/* Difficulty Breakdown Bars */}
        <div className="mt-6 pt-6 border-t border-[#222938] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8b949e]">
            <span className="font-semibold text-[#c9d1d9]">Difficulty Mastery</span>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
              <span className="text-emerald-400">
                Easy: {overallStats.easy.solved}/{overallStats.easy.total}
              </span>
              <span className="text-amber-400">
                Medium: {overallStats.medium.solved}/{overallStats.medium.total}
              </span>
              <span className="text-rose-400">
                Hard: {overallStats.hard.solved}/{overallStats.hard.total}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Easy Bar */}
            <div className="bg-[#111620] border border-[#202737] p-3 rounded-lg">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-emerald-400 font-bold">Easy Problems</span>
                <span className="text-white font-mono">
                  {overallStats.easy.total > 0
                    ? Math.round((overallStats.easy.solved / overallStats.easy.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-[#1b2230] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{
                    width: `${
                      overallStats.easy.total > 0
                        ? (overallStats.easy.solved / overallStats.easy.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Medium Bar */}
            <div className="bg-[#111620] border border-[#202737] p-3 rounded-lg">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-amber-400 font-bold">Medium Problems</span>
                <span className="text-white font-mono">
                  {overallStats.medium.total > 0
                    ? Math.round((overallStats.medium.solved / overallStats.medium.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-[#1b2230] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{
                    width: `${
                      overallStats.medium.total > 0
                        ? (overallStats.medium.solved / overallStats.medium.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Hard Bar */}
            <div className="bg-[#111620] border border-[#202737] p-3 rounded-lg">
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-rose-400 font-bold">Hard Problems</span>
                <span className="text-white font-mono">
                  {overallStats.hard.total > 0
                    ? Math.round((overallStats.hard.solved / overallStats.hard.total) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="w-full bg-[#1b2230] h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{
                    width: `${
                      overallStats.hard.total > 0
                        ? (overallStats.hard.solved / overallStats.hard.total) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Revision Spaced Repetition Priority Strip */}
      {quickRevisionIds.length > 0 && (
        <div className="bg-gradient-to-r from-rose-950/40 to-[#181a24] border border-rose-500/30 rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Spaced Repetition Queue ({quickRevisionIds.length} Questions)</span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.2 rounded-full font-bold">
                    Action Required
                  </span>
                </h3>
                <p className="text-xs text-[#9aa4b2]">
                  Problems marked Struggled or Tough, or whose review interval has matured.
                </p>
              </div>
            </div>

            <button
              onClick={() => openSheet('quick-revision')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Practice Revision Sheet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-2">
            {revisionItems.map((p) => {
              const rev = revisions.find((r) => r.problemId === p.id);
              return (
                <div
                  key={p.id}
                  onClick={() => openSheet('quick-revision')}
                  className="p-3 rounded-lg bg-[#111620] border border-[#232938] hover:border-rose-500/50 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="truncate mr-2">
                    <div className="text-xs font-semibold text-white truncate">{p.title}</div>
                    <div className="text-[10px] text-[#7d8590] truncate">{p.topic}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono shrink-0">
                    {rev ? rev.confidence.replace('_', ' ') : 'Attempted'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Followed Sheets Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookmarkCheck className="w-5 h-5 text-orange-400" />
              <span>My Followed Sheets</span>
            </h3>
            <p className="text-xs text-[#8b949e]">
              Direct access to sheets you are currently preparing with
            </p>
          </div>

          <button
            onClick={() => {
              setActiveFilterPill('All');
              setActiveView('sheets');
            }}
            className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>Browse All Sheets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {followedSheets.length === 0 ? (
          <div className="p-8 text-center bg-[#151b26] border border-[#272e3d] rounded-2xl">
            <p className="text-xs text-[#8b949e]">You are not following any sheets yet.</p>
            <button
              onClick={() => setActiveView('sheets')}
              className="mt-3 px-4 py-2 bg-orange-500 text-white rounded-lg text-xs font-bold"
            >
              Explore Coding Sheets Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {followedSheets.map((sheet) => (
              <SheetCard key={sheet.id} sheet={sheet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
