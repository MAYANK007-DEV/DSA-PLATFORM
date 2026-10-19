import React from 'react';
import {
  Settings,
  ShieldCheck,
  Server,
  Download,
  Trash2,
  Sparkles,
  Info,
  CheckCircle2,
  Database,
  ExternalLink,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { BrandModal } from './BrandModal.tsx';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    setExportModalOpen,
    seedDemoActivity,
    resetAllData,
    brand,
    updateBrand,
    resetBrand,
    showToast,
  } = useTracker();

  const [isBrandModalOpen, setIsBrandModalOpen] = React.useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-orange-400" />
          <span>Profile &amp; Platform Architecture</span>
        </h2>
        <p className="text-xs text-[#8b949e] mt-1">
          Configure preferences, audit data residency, and manage local storage
        </p>
      </div>

      {/* Brand & Logo Customization */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-orange-500/30 flex items-center justify-center bg-[#111620] shrink-0">
              {brand.logoUrl ? (
                <img
                  src={brand.logoUrl}
                  alt={brand.websiteName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs">
                  &lt;/&gt;
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
                Logo &amp; Brand Settings
              </h3>
              <p className="text-xs text-[#8b949e]">
                Current website name: <strong className="text-white">{brand.websiteName}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBrandModalOpen(true)}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Upload Logo &amp; Change Name
            </button>
            {brand.logoUrl && (
              <button
                onClick={() => {
                  resetBrand();
                  showToast('Logo reset to default', 'info');
                }}
                className="px-3 py-2 rounded-lg text-xs font-medium text-[#8b949e] hover:text-red-400 hover:bg-[#181f2c] transition-colors"
              >
                Reset Logo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile & Target Goals */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
          User Preferences
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#8b949e] mb-1.5">
              Candidate Display Name
            </label>
            <input
              type="text"
              value={settings.userName}
              onChange={(e) => updateSettings({ userName: e.target.value })}
              className="w-full bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#8b949e] mb-1.5">
              Daily Practice Target (Questions / Day)
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={settings.targetDailyGoal}
              onChange={(e) =>
                updateSettings({ targetDailyGoal: parseInt(e.target.value) || 5 })
              }
              className="w-full bg-[#111620] border border-[#2a3346] rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-orange-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Free-First Architecture & Platform Accuracy Disclosure */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2.5">
          <Server className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Free-Tier Friendly Stack &amp; Privacy Architecture
          </h3>
        </div>

        <div className="space-y-3 text-xs text-[#9aa4b2] leading-relaxed">
          <div className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero-Cost Local &amp; Private Storage</span>
            </div>
            <p>
              Your problem progress, revision confidence logs, and complexity notes are persisted locally on your device with zero monthly fees or quota limits. For cross-device sync, use the built-in <strong>CSV Export / Import</strong> or <strong>Full JSON Snapshot</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Info className="w-4 h-4 text-amber-400" />
              <span>External Platform Submission Policy</span>
            </div>
            <p>
              External LeetCode and GeeksforGeeks buttons open direct problem pages in safe new tabs. Clicking an external link does not fabricate streaks on those third-party sites; you must execute and submit code directly on LeetCode/GFG to record your platform streak. This platform independently maintains your placement preparation spaced revision schedule.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Database className="w-4 h-4 text-purple-400" />
              <span>Company Tag Verification Notice</span>
            </div>
            <p>
              Company tracks (Google, Microsoft, JPMorgan) are curated from verified community tag pages (updated August 2026). They represent high-frequency interview patterns rather than guaranteed question banks. LeetCode and GFG company tags shift over time; our database reflects audited community reports.
            </p>
          </div>
        </div>
      </div>

      {/* Data Management & Seed Controls */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-teal-400">
          Data Management &amp; Seed Testing
        </h3>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-4 py-2 bg-[#1b2332] hover:bg-[#232d3f] border border-[#2d384c] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-teal-400" />
            <span>Open CSV / JSON Backup Hub</span>
          </button>

          <button
            onClick={seedDemoActivity}
            className="px-4 py-2 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Verified Practice Sample</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Reset all tracking progress to zero?')) {
                resetAllData();
              }
            }}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ml-auto"
          >
            <Trash2 className="w-4 h-4" />
            <span>Reset All Progress</span>
          </button>
        </div>
      </div>

      <BrandModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />
    </div>
  );
};
