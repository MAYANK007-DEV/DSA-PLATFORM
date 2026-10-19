import React, { useState } from 'react';
import { X, Clock, Calendar, CheckCircle2, AlertCircle, History, Sparkles } from 'lucide-react';
import { ConfidenceLevel } from '../types/index.ts';
import { useTracker } from '../context/TrackerContext.tsx';
import { calculateNextReviewDate } from '../utils/trackerLogic.ts';

export const RevisionModal: React.FC = () => {
  const {
    revisionModalProblem,
    setRevisionModalProblem,
    addRevision,
    revisions,
  } = useTracker();

  const [activeTab, setActiveTab] = useState<'add' | 'history'>('add');
  const [selectedConfidence, setSelectedConfidence] = useState<ConfidenceLevel>('got_it');
  const [timeSpent, setTimeSpent] = useState<number>(20);
  const [revisionNotes, setRevisionNotes] = useState<string>('');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setRevisionModalProblem(null);
      }
    };
    if (revisionModalProblem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [revisionModalProblem, setRevisionModalProblem]);

  if (!revisionModalProblem) return null;

  // Revisions for this specific problem
  const problemRevisions = revisions.filter(
    (r) => r.problemId === revisionModalProblem.id
  );

  const confidenceOptions: Array<{
    id: ConfidenceLevel;
    label: string;
    sublabel: string;
    intervalText: string;
    colorClasses: string;
  }> = [
    {
      id: 'struggled',
      label: 'Struggled',
      sublabel: 'Need to redo this (stuck on approach or syntax)',
      intervalText: 'Revisit in 1 day',
      colorClasses: 'border-rose-500/40 text-rose-300 hover:bg-rose-500/10',
    },
    {
      id: 'tough',
      label: 'Tough',
      sublabel: 'Solved with effort (heavy thinking or edge case bugs)',
      intervalText: 'Revisit in 3 days',
      colorClasses: 'border-amber-500/40 text-amber-300 hover:bg-amber-500/10',
    },
    {
      id: 'got_it',
      label: 'Got it',
      sublabel: 'Needed a minor hint (understood general pattern)',
      intervalText: 'Revisit in 7 days',
      colorClasses: 'border-blue-500/40 text-blue-300 hover:bg-blue-500/10',
    },
    {
      id: 'nailed_it',
      label: 'Nailed it',
      sublabel: 'Clean & quick solve (optimal time and space)',
      intervalText: 'Revisit in 14 days',
      colorClasses: 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRevision(
      revisionModalProblem.id,
      selectedConfidence,
      timeSpent,
      revisionNotes.trim() || undefined
    );
    setRevisionModalProblem(null);
  };

  const nextDatePreview = calculateNextReviewDate(selectedConfidence, new Date());

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="revision-modal-title"
      onClick={() => setRevisionModalProblem(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="bg-[#151b26] border border-[#2a3346] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#222a3a]">
          <div>
            <h3 id="revision-modal-title" className="text-base font-bold text-white flex items-center gap-2">
              <span>Confidence &amp; Revision</span>
              <span className="text-xs bg-orange-500/10 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-mono">
                Codolio Protocol
              </span>
            </h3>
            <p className="text-xs text-[#8b949e] truncate max-w-sm mt-0.5">
              {revisionModalProblem.title} • {revisionModalProblem.topic}
            </p>
          </div>

          <button
            onClick={() => setRevisionModalProblem(null)}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#222a3a] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs: Add Revision / History */}
        <div className="flex border-b border-[#222a3a] bg-[#111620]">
          <button
            onClick={() => setActiveTab('add')}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'add'
                ? 'border-orange-500 text-orange-400 bg-[#161c28]'
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add Revision</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'history'
                ? 'border-orange-500 text-orange-400 bg-[#161c28]'
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History ({problemRevisions.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {activeTab === 'add' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8b949e] mb-2">
                  How confident was this attempt?
                </label>

                <div className="space-y-2">
                  {confidenceOptions.map((opt) => {
                    const isSelected = selectedConfidence === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedConfidence(opt.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-orange-500/10 border-orange-500 text-white shadow-sm ring-1 ring-orange-500'
                            : `bg-[#111620] border-[#222a38] text-[#9aa4b2] hover:border-[#333d52]`
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-white">
                            {opt.label}
                          </span>
                          <span className="text-[11px] font-mono text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded">
                            {opt.intervalText}
                          </span>
                        </div>
                        <p className="text-xs text-[#7d8590] mt-1">
                          {opt.sublabel}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Time Spent Input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8b949e] mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    Time Spent (Minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-orange-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8b949e] mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    Next Review Date
                  </label>
                  <div className="bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-sm text-teal-300 font-mono">
                    {nextDatePreview}
                  </div>
                </div>
              </div>

              {/* Quick Revision Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#8b949e] mb-1.5">
                  Revision Notes &amp; Key Insight (Optional)
                </label>
                <textarea
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  placeholder="e.g. Remember to handle negative numbers and empty array edge case; two pointers in-place swap..."
                  rows={3}
                  className="w-full bg-[#111620] border border-[#2a3346] rounded-lg p-3 text-xs text-white placeholder-[#636c7e] outline-none focus:border-orange-500 resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Revised</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              {problemRevisions.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#7d8590]">
                  No revisions logged for this problem yet. Add your first attempt to track spaced repetition!
                </div>
              ) : (
                problemRevisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl bg-[#111620] border border-[#222a38] space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white capitalize flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        {rev.confidence.replace('_', ' ')}
                      </span>
                      <span className="text-[#7d8590] text-[11px] font-mono">
                        {new Date(rev.timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-[#8b949e]">
                      <span>Spent: <strong className="text-white">{rev.timeSpentMinutes} mins</strong></span>
                      <span>Next Due: <strong className="text-teal-300 font-mono">{rev.nextReviewDate}</strong></span>
                    </div>

                    {rev.notes && (
                      <p className="text-xs text-[#c9d1d9] bg-[#171f2d] p-2 rounded-lg mt-1 italic border border-[#263144]">
                        "{rev.notes}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
