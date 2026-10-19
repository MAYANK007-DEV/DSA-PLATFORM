import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  FileSpreadsheet,
  FileJson,
  Trash2,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { exportToCsv, importFromCsv } from '../utils/trackerLogic.ts';

export const DataExportModal: React.FC = () => {
  const {
    exportModalOpen,
    setExportModalOpen,
    allProblems,
    userStates,
    revisions,
    importUserData,
    resetAllData,
    showToast,
  } = useTracker();

  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'danger'>('export');
  const [importText, setImportText] = useState('');
  const [importFeedback, setImportFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExportModalOpen(false);
      }
    };
    if (exportModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [exportModalOpen, setExportModalOpen]);

  if (!exportModalOpen) return null;

  // Trigger CSV Download
  const handleDownloadCsv = () => {
    const csvContent = exportToCsv(allProblems, userStates, revisions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `dsa_sql_placement_progress_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV successfully.', 'success');
  };

  // Trigger JSON Backup Download
  const handleDownloadJson = () => {
    const backup = {
      version: '2026.1',
      exportedAt: new Date().toISOString(),
      userStates,
      revisions,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `placement_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported JSON backup successfully.', 'success');
  };

  // Handle file input for CSV or JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (file.name.endsWith('.json')) {
        try {
          const parsed = JSON.parse(content);
          if (parsed.userStates) {
            importUserData(parsed.userStates, parsed.revisions || []);
            setImportFeedback(`Successfully imported ${Object.keys(parsed.userStates).length} problem states from JSON.`);
          } else {
            setImportFeedback('Invalid JSON format: missing userStates root object.');
          }
        } catch {
          setImportFeedback('Error parsing JSON backup file.');
        }
      } else {
        // Parse CSV
        const result = importFromCsv(content);
        importUserData(result.userStates, result.revisions);
        setImportFeedback(`Successfully imported ${result.updatedCount} records from CSV file.`);
      }
    };
    reader.readAsText(file);
  };

  const handleManualImport = () => {
    if (!importText.trim()) return;
    try {
      if (importText.trim().startsWith('{')) {
        const parsed = JSON.parse(importText);
        if (parsed.userStates) {
          importUserData(parsed.userStates, parsed.revisions || []);
          setImportFeedback(`Imported ${Object.keys(parsed.userStates).length} records from pasted JSON.`);
          setImportText('');
        }
      } else {
        const result = importFromCsv(importText);
        importUserData(result.userStates, result.revisions);
        setImportFeedback(`Imported ${result.updatedCount} records from pasted CSV.`);
        setImportText('');
      }
    } catch {
      setImportFeedback('Failed to parse text. Please check CSV or JSON syntax.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      onClick={() => setExportModalOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="bg-[#151b26] border border-[#2a3346] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#222a3a]">
          <div>
            <h3 id="export-modal-title" className="text-base font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-teal-400" />
              <span>Data Export &amp; Backup Hub</span>
            </h3>
            <p className="text-xs text-[#8b949e]">
              Manage local progress, export CSV for spreadsheets, or restore backups
            </p>
          </div>

          <button
            onClick={() => setExportModalOpen(false)}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#222a3a] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#222a3a] bg-[#111620]">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'export'
                ? 'border-orange-500 text-orange-400 bg-[#161c28]'
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            Export Backup
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'import'
                ? 'border-orange-500 text-orange-400 bg-[#161c28]'
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            Import Data
          </button>
          <button
            onClick={() => setActiveTab('danger')}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === 'danger'
                ? 'border-rose-500 text-rose-400 bg-[#161c28]'
                : 'border-transparent text-[#7d8590] hover:text-[#c9d1d9]'
            }`}
          >
            Reset
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div
                onClick={handleDownloadCsv}
                className="p-4 rounded-xl bg-[#111620] border border-[#263042] hover:border-teal-500/50 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                      Export CSV Spreadsheet
                    </h4>
                    <p className="text-xs text-[#7d8590]">
                      Includes problem titles, difficulties, notes, status, and revision intervals.
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#7d8590] group-hover:text-teal-400 transition-colors" />
              </div>

              <div
                onClick={handleDownloadJson}
                className="p-4 rounded-xl bg-[#111620] border border-[#263042] hover:border-orange-500/50 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <FileJson className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
                      Export Full JSON Snapshot
                    </h4>
                    <p className="text-xs text-[#7d8590]">
                      Complete lossless backup with timestamps, confidence scores, and settings.
                    </p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-[#7d8590] group-hover:text-orange-400 transition-colors" />
              </div>
            </div>
          )}

          {activeTab === 'import' && (
            <div className="space-y-4">
              {importFeedback && (
                <div className="p-3 rounded-lg bg-[#14231b] border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{importFeedback}</span>
                </div>
              )}

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl border border-dashed border-[#344057] hover:border-orange-500 bg-[#111620] text-xs font-semibold text-[#8b949e] hover:text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Upload className="w-4 h-4 text-orange-400" />
                  <span>Choose .CSV or .JSON File from Computer</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8b949e] mb-1.5">
                  Or Paste CSV / JSON Content Directly:
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste CSV rows or JSON backup here..."
                  rows={4}
                  className="w-full bg-[#111620] border border-[#2a3346] rounded-lg p-3 text-xs text-white placeholder-[#636c7e] outline-none focus:border-orange-500 font-mono resize-none"
                />
                <button
                  onClick={handleManualImport}
                  disabled={!importText.trim()}
                  className="mt-2 w-full py-2 bg-orange-500 disabled:bg-[#252f42] text-white disabled:text-[#636c7e] rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  Process Pasted Text
                </button>
              </div>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-300">
                    Reset All Problem Progress
                  </h4>
                  <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">
                    This will clear your local problem statuses, notes, and revision histories. Make sure you have exported a CSV or JSON backup first if needed.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all tracking progress?')) {
                    resetAllData();
                    setExportModalOpen(false);
                  }
                }}
                className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Full Reset</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
