import React, { useState, useEffect } from 'react';
import { X, Save, FileText, Cpu, HardDrive } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';

export const NotesModal: React.FC = () => {
  const { notesModalProblem, setNotesModalProblem, userStates, saveProblemNotes } =
    useTracker();

  const [notes, setNotes] = useState('');
  const [timeComplexity, setTimeComplexity] = useState('');
  const [spaceComplexity, setSpaceComplexity] = useState('');

  useEffect(() => {
    if (notesModalProblem) {
      const state = userStates[notesModalProblem.id];
      setNotes(state?.notes || '');
      setTimeComplexity(state?.timeComplexity || '');
      setSpaceComplexity(state?.spaceComplexity || '');
    }
  }, [notesModalProblem, userStates]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNotesModalProblem(null);
      }
    };
    if (notesModalProblem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [notesModalProblem, setNotesModalProblem]);

  if (!notesModalProblem) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProblemNotes(notesModalProblem.id, notes, timeComplexity, spaceComplexity);
    setNotesModalProblem(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-modal-title"
      onClick={() => setNotesModalProblem(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="bg-[#151b26] border border-[#2a3346] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#222a3a]">
          <div>
            <h3 id="notes-modal-title" className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Personal Notes &amp; Complexity</span>
            </h3>
            <p className="text-xs text-[#8b949e] truncate max-w-sm mt-0.5">
              {notesModalProblem.title}
            </p>
          </div>

          <button
            onClick={() => setNotesModalProblem(null)}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#222a3a] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1.5 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-orange-400" />
                Time Complexity
              </label>
              <input
                type="text"
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                placeholder="e.g. O(n log n)"
                className="w-full bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#8b949e] mb-1.5 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-teal-400" />
                Space Complexity
              </label>
              <input
                type="text"
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                placeholder="e.g. O(1)"
                className="w-full bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-orange-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8b949e] mb-1.5">
              Approach, Intuition &amp; Pitfalls
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your personal notes, patterns recognized, edge cases to watch for..."
              rows={8}
              className="w-full bg-[#111620] border border-[#2a3346] rounded-lg p-3 text-xs text-white placeholder-[#636c7e] outline-none focus:border-orange-500 resize-none leading-relaxed font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setNotesModalProblem(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8b949e] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Notes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
