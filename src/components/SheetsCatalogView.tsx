import React, { useMemo } from 'react';
import { useTracker } from '../context/TrackerContext.tsx';
import { FilterPills } from './FilterPills.tsx';
import { SheetCard } from './SheetCard.tsx';
import { QuestionRow } from './QuestionRow.tsx';
import { Search, Sparkles, Layers, BookOpen } from 'lucide-react';
import { Problem } from '../types/index.ts';

export const SheetsCatalogView: React.FC = () => {
  const {
    sheets,
    activeFilterPill,
    searchQuery,
    allProblems,
    openSheet,
    seedDemoActivity,
  } = useTracker();

  // Filter sheets by the active filter pill
  const filteredSheets = useMemo(() => {
    return sheets.filter((sheet) => {
      switch (activeFilterPill) {
        case 'Company Wise':
          return sheet.category === 'company';
        case 'Popular':
          return sheet.category === 'popular';
        case 'Quick Revision':
          return sheet.category === 'revision';
        case 'Complete DSA':
          return sheet.category === 'complete-dsa';
        case 'Topic Specific':
          return sheet.category === 'topic-specific';
        case 'Competitive':
          return sheet.category === 'competitive';
        case 'SQL':
          return sheet.category === 'sql';
        case 'Analyst SQL':
          return sheet.category === 'analyst-sql';
        case 'All':
        default:
          return true;
      }
    });
  }, [sheets, activeFilterPill]);

  // Global search across all canonical problems
  const searchResults: Problem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allProblems
      .filter((p) => {
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTopic = p.topic.toLowerCase().includes(q);
        const matchPattern = p.pattern.toLowerCase().includes(q);
        const matchCompany = p.companyEvidence?.some((c) =>
          c.company.toLowerCase().includes(q)
        );
        return matchTitle || matchTopic || matchPattern || matchCompany;
      })
      .slice(0, 30);
  }, [searchQuery, allProblems]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Filter pills bar */}
      <FilterPills />

      {/* Global Search Results Panel (if user typed in search box) */}
      {searchQuery.trim().length > 0 && (
        <div className="bg-[#151b26] border border-[#2e374a] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Search className="w-4 h-4 text-orange-400" />
              <span>Search Results for "{searchQuery}"</span>
              <span className="text-xs bg-[#1f2838] text-[#8b949e] px-2 py-0.5 rounded-full font-mono">
                {searchResults.length} matches
              </span>
            </h3>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#7d8590]">
              No problems matched "{searchQuery}". Try searching for arrays, binary search, Google, or SQL.
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((p, idx) => (
                <QuestionRow key={p.id} problem={p} index={idx} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Category Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <span>
              {activeFilterPill === 'All'
                ? 'Curated Coding Sheets'
                : `${activeFilterPill} Track`}
            </span>
          </h2>
          <p className="text-xs text-[#8b949e] mt-0.5">
            Select a pathway to start tracking topic accordions and spaced review schedules
          </p>
        </div>

        <span className="text-xs text-[#7d8590] font-mono">
          Showing {filteredSheets.length} {filteredSheets.length === 1 ? 'sheet' : 'sheets'}
        </span>
      </div>

      {/* Responsive 3-Column Sheet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSheets.map((sheet) => (
          <SheetCard key={sheet.id} sheet={sheet} />
        ))}
      </div>
    </div>
  );
};
