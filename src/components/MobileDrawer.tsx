import React, { useState, useRef } from 'react';
import {
  X,
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
  Sparkles,
  Camera,
  Upload,
  Pencil,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { FilterCategory } from '../types/index.ts';
import { BrandModal } from './BrandModal.tsx';
import {
  validateImageFile,
  extractBrandNameFromFileName,
  compressImageFile,
  DEFAULT_LOGO_SVG,
} from '../utils/brandLogic.ts';

export const MobileDrawer: React.FC = () => {
  const {
    mobileNavOpen,
    setMobileNavOpen,
    activeView,
    setActiveView,
    activeFilterPill,
    setActiveFilterPill,
    quickRevisionIds,
    setExportModalOpen,
    openSheet,
    brand,
    updateBrand,
    showToast,
  } = useTracker();

  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

  if (!mobileNavOpen) return null;

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setMobileNavOpen(false);
  };

  const navigateTo = (view: any) => {
    setActiveView(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 sm:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* Slide-out drawer content */}
      <aside className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-[#111620] border-r border-[#262c38] shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-right">
        <div>
          {/* Drawer Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-[#262c38]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-8 h-8 rounded-lg overflow-hidden border border-orange-500/30 flex items-center justify-center shrink-0 bg-[#181f2c]"
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
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5 truncate">
                  <span className="truncate">{brand.websiteName}</span>
                  <button
                    onClick={() => setIsBrandModalOpen(true)}
                    className="text-[#8b949e] hover:text-orange-400 p-0.5"
                    title="Customize brand"
                    aria-label="Customize brand"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1 py-0.2 rounded font-mono shrink-0">
                    2026
                  </span>
                </span>
                <span className="text-[10px] text-[#7d8590] truncate">{brand.subtitle}</span>
              </div>
            </div>

            <button
              onClick={() => setMobileNavOpen(false)}
              className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#1a2333] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Primary Navigation */}
          <div className="p-3 space-y-1">
            <button
              onClick={() => navigateTo('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeView === 'dashboard'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#181f2c]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>My Workspace</span>
            </button>

            <button
              onClick={() => {
                setActiveFilterPill('All');
                navigateTo('sheets');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeView === 'sheets' && activeFilterPill === 'All'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#181f2c]'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span>All Coding Sheets</span>
            </button>

            <button
              onClick={() => navigateTo('planner')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeView === 'planner'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#181f2c]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Roadmap &amp; Planner</span>
              </div>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.2 rounded uppercase">
                Prep
              </span>
            </button>

            <button
              onClick={() => navigateTo('revisions-history')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeView === 'revisions-history'
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#181f2c]'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Revision Log</span>
              </div>
              {quickRevisionIds.length > 0 && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded-full font-bold">
                  {quickRevisionIds.length}
                </span>
              )}
            </button>
          </div>

          {/* Curated Track Shortcuts */}
          <div className="px-4 pt-3 pb-1">
            <span className="text-[10px] font-bold tracking-wider uppercase text-[#6e7681]">
              Curated Pathways
            </span>
          </div>

          <div className="p-3 space-y-1">
            <button
              onClick={() => handlePillNav('Company Wise')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Company Tracks</span>
              </div>
              <span className="text-[10px] text-[#7d8590]">Google • MS • JPM</span>
            </button>

            <button
              onClick={() => handlePillNav('Complete DSA', 'complete-dsa-350')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Complete DSA (18 Topics)</span>
              </div>
              <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded">
                350
              </span>
            </button>

            <button
              onClick={() => handlePillNav('Popular', 'leetcode-75')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                <span>LeetCode Top 75</span>
              </div>
              <span className="text-[10px] text-[#7d8590]">75</span>
            </button>

            <button
              onClick={() => handlePillNav('SQL', 'leetcode-sql-50')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LeetCode SQL 50</span>
              </div>
              <span className="text-[10px] text-[#7d8590]">50</span>
            </button>

            <button
              onClick={() => handlePillNav('Analyst SQL', 'analyst-sql-100')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-4 h-4 text-violet-400 shrink-0" />
                <span>Data Analyst SQL 100</span>
              </div>
              <span className="text-[10px] text-[#7d8590]">100</span>
            </button>

            <button
              onClick={() => handlePillNav('Quick Revision', 'quick-revision')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
            >
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Quick Revision</span>
              </div>
              {quickRevisionIds.length > 0 && (
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded-full font-bold">
                  {quickRevisionIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-3 border-t border-[#262c38] space-y-1 bg-[#0e131b]">
          <button
            onClick={() => {
              setExportModalOpen(true);
              setMobileNavOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white hover:bg-[#181f2c] transition-colors"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Backup &amp; Export CSV</span>
          </button>

          <button
            onClick={() => navigateTo('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              activeView === 'settings'
                ? 'bg-orange-500 text-white'
                : 'text-[#8b949e] hover:text-white hover:bg-[#181f2c]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings &amp; Info</span>
          </button>
        </div>
      </aside>

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
};
