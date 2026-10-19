import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles, Download, CheckCircle2, Menu } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';

export const Header: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    overallStats,
    setExportModalOpen,
    seedDemoActivity,
    userStates,
    setMobileNavOpen,
  } = useTracker();

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hasProgress = Object.values(userStates).some((s) => s.status !== 'unsolved');

  return (
    <header className="border-b border-cyber bg-[#111119]/95 backdrop-blur-md sticky top-0 z-20 px-3.5 sm:px-6 md:px-8 py-3 sm:py-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        {/* Top row on mobile: Hamburger Menu + Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="sm:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-cyber-card transition-colors"
              aria-label="Open mobile menu drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-black text-[#ebf1f5] tracking-tight flex items-center gap-2">
                <span>Track Coding Sheets</span>
                <span className="hidden sm:inline-flex items-center text-[10px] sm:text-[11px] font-semibold bg-[#ff2e93]/10 text-[#ff2e93] border border-[#ff2e93]/30 px-2.5 py-0.5 rounded-full">
                  Codolio &amp; LeetCode Aligned
                </span>
              </h1>
              <p className="text-[11px] sm:text-xs text-[#94a3b8] mt-0.5 hidden xs:block font-mono">
                Structured DSA pathways • Verified links • Spaced revision
              </p>
            </div>
          </div>

          {/* Mobile Solved Badge */}
          <div className="flex lg:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#14231b] border border-emerald-500/30 text-emerald-300 text-xs font-medium shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong className="font-bold text-white">{overallStats.solved}</strong>
              <span className="text-[#8b949e]">/{overallStats.total}</span>
            </span>
          </div>
        </div>

        {/* Search Bar & Quick Header Controls */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {/* Prominent Search Bar */}
          <div className="relative flex-1 lg:w-72 xl:w-80 group">
            <Search className="w-4 h-4 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:text-[#00e5ff] transition-colors" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, topics, company... (/)"
              className="w-full bg-cyber-card border border-cyber focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]/40 rounded-lg pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-[#94a3b8] outline-none transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] bg-[#1e1e2f] text-[#94a3b8] border border-cyber px-1.5 py-0.5 rounded font-mono">
                /
              </kbd>
            )}
          </div>

          {/* Seed demo if no progress yet */}
          {!hasProgress && (
            <button
              onClick={seedDemoActivity}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-[#ff2e93]/15 to-[#6a00f4]/15 hover:from-[#ff2e93]/25 hover:to-[#6a00f4]/25 text-[#ebf1f5] border border-[#ff2e93]/40 text-xs font-semibold transition-all shadow-md shadow-[#6a00f4]/10 shrink-0 cursor-pointer"
              title="Seed verified sample practice records"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ff2e93]" />
              <span>Seed Sample</span>
            </button>
          )}

          {/* Quick Export/Import Modal Button */}
          <button
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-cyber-card hover:bg-[#1e1e2f] text-[#ebf1f5] border border-cyber text-xs font-medium transition-colors shrink-0 cursor-pointer"
            title="Import/Export CSV data"
          >
            <Download className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="hidden md:inline">Backup</span>
          </button>

          {/* Desktop Solved Stat Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-[#161622] border border-[#00e5ff]/30 text-[#00e5ff] text-xs font-mono font-bold shrink-0 shadow-sm shadow-[#00e5ff]/10">
            <CheckCircle2 className="w-4 h-4 text-[#00e5ff]" />
            <span>
              <strong className="font-bold text-white">{overallStats.solved}</strong> / {overallStats.total}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
