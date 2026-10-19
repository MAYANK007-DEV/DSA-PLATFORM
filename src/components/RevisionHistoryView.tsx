import React, { useState } from 'react';
import { History, Clock, Calendar, ExternalLink, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { ConfidenceLevel } from '../types/index.ts';

export const RevisionHistoryView: React.FC = () => {
  const { revisions, allProblemsById, setRevisionModalProblem } = useTracker();
  const [filterConfidence, setFilterConfidence] = useState<'all' | ConfidenceLevel>('all');

  const filteredRevisions = revisions.filter((r) => {
    if (filterConfidence !== 'all' && r.confidence !== filterConfidence) {
      return false;
    }
    return true;
  });

  const getConfidenceBadge = (conf: ConfidenceLevel) => {
    switch (conf) {
      case 'struggled':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'tough':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'got_it':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'nailed_it':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-orange-400" />
            <span>Spaced Revision History Log</span>
          </h2>
          <p className="text-xs text-[#8b949e] mt-1">
            Audit your retention attempts across DSA patterns and SQL topics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#7d8590]" />
          <select
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(e.target.value as any)}
            className="bg-[#151b26] border border-[#2a3242] text-xs text-[#c9d1d9] rounded-lg px-2.5 py-1.5 outline-none focus:border-orange-500"
          >
            <option value="all">All Confidence Ratings</option>
            <option value="struggled">Struggled (1 day)</option>
            <option value="tough">Tough (3 days)</option>
            <option value="got_it">Got it (7 days)</option>
            <option value="nailed_it">Nailed it (14 days)</option>
          </select>
        </div>
      </div>

      {filteredRevisions.length === 0 ? (
        <div className="p-12 text-center bg-[#151b26] border border-[#272e3d] rounded-2xl space-y-3">
          <Clock className="w-10 h-10 text-[#4c586e] mx-auto" />
          <p className="text-sm text-white font-medium">No revision logs found</p>
          <p className="text-xs text-[#8b949e] max-w-sm mx-auto">
            When practicing problems, click the "Revise (+)" button on any problem row to record your confidence score and schedule the next spaced review.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRevisions.map((rev) => {
            const problem = allProblemsById[rev.problemId];
            if (!problem) return null;

            return (
              <div
                key={rev.id}
                className="bg-[#151b26] border border-[#252d3d] hover:border-[#354057] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">
                      {problem.title}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getConfidenceBadge(
                        rev.confidence
                      )}`}
                    >
                      {rev.confidence.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-[#7d8590]">• {problem.topic}</span>
                  </div>

                  {rev.notes && (
                    <p className="text-xs text-[#c9d1d9] bg-[#10141e] border border-[#1f2736] p-2.5 rounded-lg italic">
                      "{rev.notes}"
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#7d8590] pt-0.5">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-orange-400" />
                      Time spent: <strong className="text-white">{rev.timeSpentMinutes} mins</strong>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-teal-400" />
                      Next due: <strong className="text-teal-300">{rev.nextReviewDate}</strong>
                    </span>
                    <span className="text-[#64748b]">
                      Logged: {new Date(rev.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => setRevisionModalProblem(problem)}
                    className="px-3 py-1.5 rounded-lg bg-[#1c2433] hover:bg-[#253147] text-orange-400 border border-[#2d384e] text-xs font-semibold transition-colors"
                  >
                    Add Follow-up
                  </button>
                  {problem.leetcodeUrl && (
                    <a
                      href={problem.leetcodeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#181f2c] border border-[#262f40] text-[#8b949e] hover:text-white transition-colors"
                      title="Open problem in new tab"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
