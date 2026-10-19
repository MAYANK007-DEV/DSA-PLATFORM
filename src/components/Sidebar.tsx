import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Layers,
  Compass,
  Building2,
  Flame,
  RotateCcw,
  Code2,
  Database,
  FileSpreadsheet,
  History,
  Download,
  Settings,
  ChevronRight,
  Camera,
  Upload,
  Pencil,
  Play,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { FilterCategory } from '../types/index.ts';
import { BrandModal } from './BrandModal.tsx';
import {
  validateImageFile,
  extractBrandNameFromFileName,
  cleanBrandName,
  compressImageFile,
  DEFAULT_LOGO_SVG,
} from '../utils/brandLogic.ts';

export const Sidebar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    activeFilterPill,
    setActiveFilterPill,
    quickRevisionIds,
    setExportModalOpen,
    openSheet,
    brand,
    updateBrand,
    resetBrand,
    showToast,
    setShowIntroModal,
  } = useTracker();

  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(brand.websiteName);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setNameInput(brand.websiteName);
  }, [brand.websiteName]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditingName]);

  const handleSaveName = () => {
    const cleaned = cleanBrandName(nameInput);
    updateBrand({ websiteName: cleaned });
    setNameInput(cleaned);
    setIsEditingName(false);
    showToast(`Website name updated to "${cleaned}"`, 'success');
  };

  const handleDirectFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid image file', 'warning');
      e.target.value = '';
      return;
    }

    try {
      const dataUrl = await compressImageFile(file);
      const extracted = extractBrandNameFromFileName(file.name);

      const shouldUpdateName =
        brand.websiteName === 'My Logo Name' ||
        brand.websiteName === 'Placement Tracker';

      updateBrand({
        logoUrl: dataUrl,
        websiteName: shouldUpdateName ? extracted : brand.websiteName,
      });

      showToast(
        shouldUpdateName
          ? `Logo added! Website name set to "${extracted}"`
          : 'Custom logo image added successfully!',
        'success'
      );
    } catch (err) {
      console.error(err);
      showToast('Error processing logo image', 'warning');
    }
    e.target.value = '';
  };

  const handlePillNav = (pill: FilterCategory, targetSheetId?: string) => {
    setActiveFilterPill(pill);
    if (targetSheetId) {
      openSheet(targetSheetId);
    } else {
      setActiveView('sheets');
    }
  };

  return (
    <aside
      className="hidden sm:flex w-16 md:w-64 bg-cyber-card border-r border-cyber flex-col justify-between shrink-0 select-none z-30 transition-all duration-200"
      aria-label="Platform Sidebar"
    >
      {/* Top brand */}
      <div className="flex flex-col">
        <div className="h-16 flex items-center px-3.5 md:px-5 border-b border-cyber gap-3">
          <div
            className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center shrink-0 border border-cyber-glow bg-[#1a1a2e] shadow-md shadow-purple-900/20"
            title="Practice Kit Coding Logo"
          >
            <img
              src={brand.logoUrl || DEFAULT_LOGO_SVG}
              alt={brand.websiteName}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_LOGO_SVG;
              }}
            />
          </div>

          <div className="hidden md:flex flex-col overflow-hidden min-w-0 flex-1">
            <span className="font-bold text-[#ebf1f5] text-sm tracking-tight truncate flex items-center gap-1.5 group">
              {isEditingName ? (
                <input
                  ref={nameInputRef}
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onBlur={handleSaveName}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveName();
                    if (e.key === 'Escape') setIsEditingName(false);
                  }}
                  className="bg-[#1a1a2e] text-white text-xs px-1.5 py-0.5 rounded border border-[#ff2e93] focus:outline-none w-full font-bold"
                  autoFocus
                  maxLength={40}
                  aria-label="Edit website name"
                />
              ) : (
                <>
                  <span
                    className="truncate cursor-pointer hover:text-[#00e5ff] transition-colors"
                    onClick={() => setIsEditingName(true)}
                    title="Click to edit website name"
                  >
                    {brand.websiteName}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsBrandModalOpen(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[#94a3b8] hover:text-[#00e5ff] p-0.5 transition-opacity shrink-0"
                    title="Customize logo & brand settings"
                    aria-label="Customize logo & brand settings"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <span className="text-[10px] bg-[#ff2e93]/10 text-[#ff2e93] border border-[#ff2e93]/30 px-1 py-0.2 rounded font-mono shrink-0">
                    2026
                  </span>
                </>
              )}
            </span>
            <span className="text-[11px] text-[#94a3b8] truncate flex items-center justify-between">
              <span className="truncate">{brand.subtitle}</span>
              <button
                onClick={() => setIsBrandModalOpen(true)}
                className="text-[10px] text-[#00e5ff] hover:underline opacity-0 group-hover:opacity-100 transition-opacity ml-1 shrink-0"
                title="Open logo settings"
              >
                Edit
              </button>
            </span>
          </div>
        </div>

        {/* Primary Views Nav */}
        <div className="p-2 md:p-3 space-y-1.5">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeView === 'dashboard'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="My Workspace"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0 group-hover:text-[#00e5ff] transition-colors" />
            <span className="hidden md:inline">My Workspace</span>
          </button>

          <button
            onClick={() => {
              setActiveView('sheets');
              setActiveFilterPill('All');
            }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeView === 'sheets' && activeFilterPill === 'All'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="All Coding Sheets"
          >
            <Layers className="w-4 h-4 shrink-0 group-hover:text-[#00e5ff] transition-colors" />
            <span className="hidden md:inline">All Sheets</span>
          </button>

          <button
            onClick={() => setActiveView('planner')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeView === 'planner'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Placement Roadmap & Company Crack Blueprints"
          >
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 shrink-0 group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">Roadmap &amp; Planner</span>
            </div>
            <span className="hidden md:inline text-[9px] bg-[#ff2e93]/20 text-[#ff2e93] border border-[#ff2e93]/30 font-bold px-1.5 py-0.5 rounded uppercase font-mono">
              PREP
            </span>
          </button>

          <button
            onClick={() => setActiveView('revisions-history')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeView === 'revisions-history'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Revision History"
          >
            <History className="w-4 h-4 shrink-0 group-hover:text-[#00e5ff] transition-colors" />
            <span className="hidden md:inline">Revision Log</span>
          </button>
        </div>

        {/* Section Divider */}
        <div className="hidden md:block px-5 pt-3 pb-1">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#94a3b8] font-mono">
            Curated Tracks
          </span>
        </div>

        {/* Curated Track Shortcuts */}
        <div className="p-2 md:p-3 space-y-1.5">
          <button
            onClick={() => handlePillNav('Company Wise')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'Company Wise' && activeView === 'sheets'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Company Wise Tracks (Google, Microsoft, JPMorgan)"
          >
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 shrink-0 text-amber-400 group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">Company Tracks</span>
            </div>
            <span className="hidden md:inline text-[11px] bg-cyber-card text-[#94a3b8] border border-cyber px-1.5 py-0.5 rounded font-mono">
              3
            </span>
          </button>

          <button
            onClick={() => handlePillNav('Complete DSA', 'complete-dsa-350')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'Complete DSA' || (activeView === 'sheet-detail' && false)
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Complete DSA Track (18 Topics)"
          >
            <div className="flex items-center gap-3">
              <Code2 className="w-4 h-4 shrink-0 text-cyan-400 group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">Complete DSA</span>
            </div>
            <span className="hidden md:inline text-[10px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-1.5 py-0.5 rounded font-mono">
              18 Topics
            </span>
          </button>

          <button
            onClick={() => handlePillNav('Popular', 'leetcode-75')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'Popular'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="LeetCode Top 75"
          >
            <div className="flex items-center gap-3">
              <Flame className="w-4 h-4 shrink-0 text-[#ff2e93] group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">LeetCode Top 75</span>
            </div>
            <span className="hidden md:inline text-[11px] text-[#94a3b8] font-mono">75</span>
          </button>

          <button
            onClick={() => handlePillNav('SQL', 'leetcode-sql-50')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'SQL'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="LeetCode SQL 50"
          >
            <div className="flex items-center gap-3">
              <Database className="w-4 h-4 shrink-0 text-[#00e5ff] group-hover:text-purple-400 transition-colors" />
              <span className="hidden md:inline">LeetCode SQL 50</span>
            </div>
            <span className="hidden md:inline text-[11px] text-[#94a3b8] font-mono">50</span>
          </button>

          <button
            onClick={() => handlePillNav('Analyst SQL', 'analyst-sql-100')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'Analyst SQL'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Data Analyst SQL 100"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-4 h-4 shrink-0 text-purple-400 group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">Analyst SQL 100</span>
            </div>
            <span className="hidden md:inline text-[11px] text-[#94a3b8] font-mono">100</span>
          </button>

          <button
            onClick={() => handlePillNav('Quick Revision', 'quick-revision')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group ${
              activeFilterPill === 'Quick Revision'
                ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
                : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 border border-transparent'
            }`}
            title="Quick Revision Spaced Repetition"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 shrink-0 text-rose-400 group-hover:text-[#00e5ff] transition-colors" />
              <span className="hidden md:inline">Quick Revision</span>
            </div>
            {quickRevisionIds.length > 0 && (
              <span className="hidden md:inline text-[10px] bg-[#ff2e93]/20 text-[#ff2e93] border border-[#ff2e93]/30 px-1.5 py-0.2 rounded-full font-bold font-mono">
                {quickRevisionIds.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-2 md:p-3 border-t border-cyber space-y-1.5">
        <button
          onClick={() => setExportModalOpen(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 transition-all duration-200 cursor-pointer group border border-transparent"
          title="Backup & Export CSV / JSON"
        >
          <Download className="w-4 h-4 shrink-0 text-[#00e5ff] group-hover:text-[#ff2e93] transition-colors" />
          <span className="hidden md:inline">Import &amp; Export</span>
        </button>

        <button
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer group border border-transparent ${
            activeView === 'settings'
              ? 'glow-gradient text-white shadow-lg shadow-[#ff2e93]/20 border border-[#ff2e93]/40 translate-x-1'
              : 'text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1'
          }`}
          title="Settings & Reset"
        >
          <Settings className="w-4 h-4 shrink-0 group-hover:text-[#00e5ff] transition-colors" />
          <span className="hidden md:inline">Settings</span>
        </button>

        <button
          onClick={() => setShowIntroModal(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium text-[#94a3b8] hover:text-[#ebf1f5] hover:bg-cyber-card hover:translate-x-1 transition-all duration-200 cursor-pointer group border border-transparent"
          title="Play Cinematic Intro Video"
        >
          <Play className="w-4 h-4 shrink-0 text-[#ff2e93] group-hover:text-[#00e5ff] transition-colors fill-[#ff2e93]" />
          <span className="hidden md:inline">Play Intro</span>
        </button>

        {/* User Mini Profile */}
        <div className="hidden md:flex items-center gap-2.5 px-3 py-2.5 mt-1 rounded-xl bg-cyber-card border border-cyber hover:border-[#00e5ff]/30 transition-colors">
          <div className="w-7 h-7 rounded-full glow-gradient flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
            M
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#ebf1f5] truncate">Mayank Sain</span>
            <span className="text-[10px] text-[#00e5ff] truncate font-mono">Candidate 2026</span>
          </div>
        </div>
      </div>

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </aside>
  );
};
