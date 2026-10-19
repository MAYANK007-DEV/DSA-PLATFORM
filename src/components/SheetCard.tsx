import React from 'react';
import { Bookmark, BookmarkCheck, ArrowRight, CheckCircle2, Users } from 'lucide-react';
import { Sheet } from '../types/index.ts';
import { useTracker } from '../context/TrackerContext.tsx';
import { getCanonicalStats } from '../utils/trackerLogic.ts';

interface SheetCardProps {
  sheet: Sheet;
}

export const SheetCard: React.FC<SheetCardProps> = ({ sheet }) => {
  const {
    openSheet,
    userStates,
    allProblemsById,
    followedSheetIds,
    toggleFollowSheet,
  } = useTracker();

  const isFollowed = followedSheetIds.includes(sheet.id);

  // Compute real canonical progress for this sheet
  const stats = getCanonicalStats(sheet.problemIds, userStates, allProblemsById);

  // Format follower count
  const formattedFollowers =
    sheet.followersCount >= 1000
      ? `${(sheet.followersCount / 1000).toFixed(1)}k`
      : sheet.followersCount.toString();

  return (
    <div className="bg-cyber-card border border-cyber cyber-card-hover rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden">
      {/* Subtle top glow line on card hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff2e93] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            {sheet.companyTag && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-wide">
                {sheet.companyTag} Track
              </span>
            )}
            {sheet.isOfficial && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-wide">
                Official Plan
              </span>
            )}
            {sheet.category === 'analyst-sql' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-wide">
                Data Analyst
              </span>
            )}
            {sheet.category === 'revision' && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase tracking-wide">
                Spaced Repetition
              </span>
            )}
          </div>

          {/* Follow / Unfollow toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowSheet(sheet.id);
            }}
            className={`p-1.5 rounded-lg border text-xs font-medium flex items-center gap-1 transition-colors ${
              isFollowed
                ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 hover:bg-orange-500/20'
                : 'bg-[#1b2332] border-[#2d3546] text-[#8b949e] hover:text-[#e6edf3]'
            }`}
            title={isFollowed ? 'Unfollow sheet' : 'Follow sheet'}
          >
            {isFollowed ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden sm:inline">Following</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span className="text-[11px] font-medium hidden sm:inline">Follow</span>
              </>
            )}
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => openSheet(sheet.id)}
          className="text-base font-bold text-white group-hover:text-orange-400 transition-colors cursor-pointer leading-snug line-clamp-1"
        >
          {sheet.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[#8b949e] mt-1.5 line-clamp-2 leading-relaxed">
          {sheet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {sheet.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-[#1a2230] text-[#7d8590] border border-[#263042] px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress & Bottom Controls */}
      <div className="mt-5 pt-4 border-t border-cyber">
        {/* Progress bar and percentages */}
        <div className="flex items-center justify-between text-xs text-[#94a3b8] mb-1.5">
          <span className="flex items-center gap-1 font-mono font-medium text-[#ebf1f5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff]" />
            {stats.solved} / {stats.total} Solved
          </span>
          <span className="font-bold text-white font-mono">{stats.progressPercent}%</span>
        </div>

        <div className="w-full bg-[#111119] h-2 rounded-full overflow-hidden p-0.5 border border-cyber">
          <div
            className="h-full animate-cyber-shimmer rounded-full transition-all duration-500"
            style={{ width: `${stats.progressPercent}%` }}
          />
        </div>

        {/* Difficulty breakdown & Open button */}
        <div className="flex items-center justify-between mt-3.5">
          <div className="flex items-center gap-2 text-[11px] text-[#94a3b8] font-mono">
            <span className="flex items-center gap-1" title="Real follower count">
              <Users className="w-3 h-3 text-[#64748b]" />
              {formattedFollowers}
            </span>
            <span>•</span>
            <span className="text-[#00e5ff] font-medium">{stats.easy.solved}/{stats.easy.total} E</span>
            <span className="text-amber-400 font-medium">{stats.medium.solved}/{stats.medium.total} M</span>
            <span className="text-[#ff2e93] font-medium">{stats.hard.solved}/{stats.hard.total} H</span>
          </div>

          <button
            onClick={() => openSheet(sheet.id)}
            className="flex items-center gap-1 text-xs font-semibold text-[#00e5ff] hover:text-[#ff2e93] transition-colors group/btn cursor-pointer"
          >
            <span>Practice</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
