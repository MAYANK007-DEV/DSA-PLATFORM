import React from 'react';
import {
  Check,
  Star,
  FileText,
  Plus,
  ExternalLink,
  Search,
  Clock,
  HelpCircle,
  Database,
  Building,
} from 'lucide-react';
import { Problem, ProblemStatus } from '../types/index.ts';
import { useTracker } from '../context/TrackerContext.tsx';

interface QuestionRowProps {
  problem: Problem;
  index: number;
}

export const QuestionRow: React.FC<QuestionRowProps> = ({ problem, index }) => {
  const {
    userStates,
    toggleProblemStatus,
    toggleFavorite,
    setRevisionModalProblem,
    setNotesModalProblem,
    setSqlModalProblem,
    revisions,
  } = useTracker();

  const state = userStates[problem.id];
  const status: ProblemStatus = state?.status || 'unsolved';
  const isFavorite = state?.isFavorite ?? false;
  const hasNotes = Boolean(state?.notes && state.notes.trim().length > 0);

  // Get revision count for this problem
  const problemRevisions = revisions.filter((r) => r.problemId === problem.id);
  const revisionCount = problemRevisions.length;
  const latestRevision = problemRevisions[0];

  // Difficulty badge colors
  const diffBadge = {
    Easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Hard: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  }[problem.difficulty];

  // Status visual indicator
  const getStatusButton = () => {
    if (status === 'solved') {
      return (
        <button
          onClick={() => toggleProblemStatus(problem.id)}
          className="w-5 h-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0 hover:bg-emerald-400 transition-colors cursor-pointer"
          title="Status: Solved (Click to cycle)"
          aria-label={`Status: Solved for ${problem.title}`}
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </button>
      );
    }
    if (status === 'attempted') {
      return (
        <button
          onClick={() => toggleProblemStatus(problem.id)}
          className="w-5 h-5 rounded-full bg-amber-500/20 border-2 border-amber-500 text-amber-400 flex items-center justify-center shrink-0 hover:bg-amber-500/30 transition-colors cursor-pointer"
          title="Status: Attempted (Click to mark Solved)"
          aria-label={`Status: Attempted for ${problem.title}`}
        >
          <Clock className="w-2.5 h-2.5" />
        </button>
      );
    }
    return (
      <button
        onClick={() => toggleProblemStatus(problem.id)}
        className="w-5 h-5 rounded-full border-2 border-[#434d61] hover:border-emerald-500/60 shrink-0 transition-colors cursor-pointer"
        title="Status: Unsolved (Click to cycle)"
        aria-label={`Status: Unsolved for ${problem.title}`}
      />
    );
  };

  return (
    <div
      className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3.5 sm:px-4 py-3 rounded-lg border transition-all duration-150 ${
        status === 'solved'
          ? 'bg-[#121b18]/40 border-emerald-500/20 hover:bg-[#121b18]/70'
          : status === 'attempted'
          ? 'bg-[#1d1b15]/40 border-amber-500/20 hover:bg-[#1d1b15]/70'
          : 'bg-[#151a24] border-[#222938] hover:bg-[#192130] hover:border-[#2e374a]'
      }`}
    >
      {/* Left section: Status + Index + Title + Tags */}
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        {/* Status circle checkbox */}
        <div className="mt-0.5 sm:mt-0">{getStatusButton()}</div>

        {/* Index number */}
        <span className="text-xs font-mono text-[#636c7e] w-6 shrink-0 hidden md:inline">
          {String(index + 1).padStart(3, '0')}
        </span>

        {/* Title and metadata */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs sm:text-sm font-semibold truncate ${
                status === 'solved'
                  ? 'text-[#e6edf3] line-through decoration-emerald-500/50'
                  : 'text-[#e6edf3] group-hover:text-white'
              }`}
            >
              {problem.title}
            </span>

            {/* Difficulty Pill */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${diffBadge}`}
            >
              {problem.difficulty}
            </span>

            {/* Company Tag Evidence (if present) */}
            {problem.companyEvidence && problem.companyEvidence.length > 0 && (
              <span
                className="hidden lg:inline-flex items-center gap-1 text-[10px] bg-[#1a2333] text-amber-300 border border-amber-500/20 px-1.5 py-0.2 rounded"
                title={`${problem.companyEvidence[0].company} tagged • Verified ${problem.companyEvidence[0].verifiedDate} (${problem.companyEvidence[0].source})`}
              >
                <Building className="w-2.5 h-2.5 text-amber-400" />
                {problem.companyEvidence[0].company}
              </span>
            )}

            {/* SQL Tag Badge */}
            {problem.sqlMeta && (
              <button
                onClick={() => setSqlModalProblem(problem)}
                className="inline-flex items-center gap-1 text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded hover:bg-purple-500/20 transition-colors"
                title="View SQL task statement and schema"
              >
                <Database className="w-2.5 h-2.5 text-purple-400" />
                <span>Schema &amp; Task</span>
              </button>
            )}
          </div>

          {/* Pattern and subtopic tags */}
          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#7d8590]">
            <span className="truncate max-w-[200px]">{problem.pattern}</span>
            {latestRevision && (
              <span className="text-[10px] text-orange-400/90 font-mono">
                • {latestRevision.confidence.replace('_', ' ')} (Next: {latestRevision.nextReviewDate})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right section: Links & Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#202838]">
        {/* LeetCode Button */}
        {problem.leetcodeUrl && (
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c2433] hover:bg-[#253147] text-amber-400 border border-[#2d384e] text-[11px] font-medium transition-colors"
            title={`Open on LeetCode: ${problem.title}`}
          >
            <span>LeetCode</span>
            {problem.leetcodeVerified ? (
              <ExternalLink className="w-3 h-3 text-amber-400" />
            ) : (
              <Search className="w-3 h-3 text-[#7d8590]" />
            )}
          </a>
        )}

        {/* GFG Button */}
        {problem.gfgUrl && (
          <a
            href={problem.gfgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#16241e] hover:bg-[#1d3329] text-emerald-400 border border-emerald-900/40 text-[11px] font-medium transition-colors"
            title={
              problem.gfgVerified
                ? `Open verified problem on GFG: ${problem.title}`
                : `Search "${problem.title}" on GeeksforGeeks`
            }
          >
            <span>GFG</span>
            {problem.gfgVerified ? (
              <ExternalLink className="w-3 h-3 text-emerald-400" />
            ) : (
              <Search className="w-3 h-3 text-emerald-400/70" />
            )}
          </a>
        )}

        {/* Notes Icon Button */}
        <button
          onClick={() => setNotesModalProblem(problem)}
          className={`p-1.5 rounded-lg border transition-colors ${
            hasNotes
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
              : 'bg-[#181f2c] border-[#293244] text-[#7d8590] hover:text-[#e6edf3]'
          }`}
          title={hasNotes ? 'View/Edit Notes (Notes attached)' : 'Add personal notes'}
          aria-label={`Notes for ${problem.title}`}
        >
          <FileText className="w-3.5 h-3.5" />
        </button>

        {/* Star / Favourite Icon Button */}
        <button
          onClick={() => toggleFavorite(problem.id)}
          className={`p-1.5 rounded-lg border transition-colors ${
            isFavorite
              ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
              : 'bg-[#181f2c] border-[#293244] text-[#7d8590] hover:text-amber-400'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Mark as favorite'}
          aria-label={`Favorite ${problem.title}`}
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
        </button>

        {/* Add Revision (+) Button */}
        <button
          onClick={() => setRevisionModalProblem(problem)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-semibold transition-all ${
            revisionCount > 0
              ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
              : 'bg-[#1e2635] border-[#2f394d] text-[#8b949e] hover:text-orange-400 hover:border-orange-500/40'
          }`}
          title="Add Revision / Log Confidence (Codolio Spaced Repetition)"
          aria-label={`Add revision for ${problem.title}`}
        >
          <Plus className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[11px]">Revise</span>
          {revisionCount > 0 && (
            <span className="text-[10px] bg-orange-500/20 px-1 rounded font-mono">
              {revisionCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
