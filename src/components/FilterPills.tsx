import React from 'react';
import { useTracker } from '../context/TrackerContext.tsx';
import { FilterCategory } from '../types/index.ts';

const PILLS: FilterCategory[] = [
  'Company Wise',
  'All',
  'Popular',
  'Quick Revision',
  'Complete DSA',
  'Topic Specific',
  'Competitive',
  'SQL',
  'Analyst SQL',
];

export const FilterPills: React.FC = () => {
  const {
    activeFilterPill,
    setActiveFilterPill,
    activeView,
    setActiveView,
    quickRevisionIds,
  } = useTracker();

  const handleSelect = (pill: FilterCategory) => {
    setActiveFilterPill(pill);
    if (activeView !== 'sheets') {
      setActiveView('sheets');
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      {PILLS.map((pill) => {
        const isSelected = activeFilterPill === pill && activeView === 'sheets';
        const isQuickRev = pill === 'Quick Revision';

        return (
          <button
            key={pill}
            onClick={() => handleSelect(pill)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              isSelected
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/25 border border-[#ff2e93]/50 scale-105'
                : 'bg-cyber-card text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-[#1e1e2f] border border-cyber'
            }`}
          >
            <span>{pill}</span>
            {isQuickRev && quickRevisionIds.length > 0 && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-[#ff2e93]/20 text-[#ff2e93]'
                }`}
              >
                {quickRevisionIds.length}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
