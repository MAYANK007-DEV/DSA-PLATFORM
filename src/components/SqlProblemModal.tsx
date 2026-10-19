import React from 'react';
import { X, Database, Terminal, FileCode2, CheckCircle, ExternalLink } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';

export const SqlProblemModal: React.FC = () => {
  const { sqlModalProblem, setSqlModalProblem } = useTracker();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSqlModalProblem(null);
      }
    };
    if (sqlModalProblem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sqlModalProblem, setSqlModalProblem]);

  if (!sqlModalProblem || !sqlModalProblem.sqlMeta) return null;

  const { sqlMeta, title, difficulty, leetcodeUrl, gfgUrl } = sqlModalProblem;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sql-modal-title"
      onClick={() => setSqlModalProblem(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="bg-[#151b26] border border-[#2a3346] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#222a3a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 id="sql-modal-title" className="text-base font-bold text-white flex items-center gap-2">
                <span>{title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase">
                  {sqlMeta.dialect}
                </span>
              </h3>
              <p className="text-xs text-[#8b949e]">{sqlMeta.module}</p>
            </div>
          </div>

          <button
            onClick={() => setSqlModalProblem(null)}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#222a3a] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Task Statement */}
          <div>
            <h4 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-orange-400" />
              Task Statement
            </h4>
            <div className="p-3.5 rounded-xl bg-[#10141d] border border-[#232b3b] text-sm text-[#e6edf3] leading-relaxed">
              {sqlMeta.taskStatement}
            </div>
          </div>

          {/* Expected Schema */}
          {sqlMeta.expectedSchema && (
            <div>
              <h4 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Expected Database Schema
              </h4>
              <pre className="p-3.5 rounded-xl bg-[#10141d] border border-[#232b3b] text-xs font-mono text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {sqlMeta.expectedSchema}
              </pre>
            </div>
          )}

          {/* Sample Query or Solution Pattern */}
          {sqlMeta.sampleQueryOrSolution && (
            <div>
              <h4 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-emerald-400" />
                Standard SQL Implementation Pattern
              </h4>
              <pre className="p-3.5 rounded-xl bg-[#10141d] border border-[#232b3b] text-xs font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {sqlMeta.sampleQueryOrSolution}
              </pre>
            </div>
          )}

          {/* Expected Sample Output */}
          {sqlMeta.expectedOutputSample && (
            <div>
              <h4 className="text-xs font-bold text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                Expected Sample Output
              </h4>
              <pre className="p-3.5 rounded-xl bg-[#10141d] border border-[#232b3b] text-xs font-mono text-[#a3b1cc] overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {sqlMeta.expectedOutputSample}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer with external links */}
        <div className="p-4 border-t border-[#222a3a] bg-[#111620] flex items-center justify-between">
          <span className="text-[11px] text-[#7d8590]">
            Analyst SQL 100 • Tested on PostgreSQL 15 &amp; MySQL 8.0
          </span>

          <div className="flex items-center gap-2">
            {leetcodeUrl && (
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-medium transition-colors"
              >
                <span>Find Practice on LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
