import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Check,
  Sparkles,
  Link as LinkIcon,
  Palette,
  Loader2,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import {
  validateImageFile,
  extractBrandNameFromFileName,
  cleanBrandName,
  compressImageFile,
  PRESET_LOGOS,
  DEFAULT_LOGO_SVG,
} from '../utils/brandLogic.ts';

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal: React.FC<BrandModalProps> = ({ isOpen, onClose }) => {
  const { brand, updateBrand, resetBrand, showToast } = useTracker();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [websiteName, setWebsiteName] = useState(brand.websiteName);
  const [subtitle, setSubtitle] = useState(brand.subtitle);
  const [logoPreview, setLogoPreview] = useState<string>(brand.logoUrl);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');

  // Synchronize with active brand whenever modal opens or brand changes
  useEffect(() => {
    if (isOpen) {
      setWebsiteName(brand.websiteName);
      setSubtitle(brand.subtitle);
      setLogoPreview(brand.logoUrl || DEFAULT_LOGO_SVG);
    }
  }, [isOpen, brand]);

  if (!isOpen) return null;

  const handleFile = async (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      showToast(validation.error || 'Invalid image file', 'warning');
      return;
    }

    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImageFile(file);
      setLogoPreview(compressedDataUrl);

      // Suggest name if currently generic
      const extracted = extractBrandNameFromFileName(file.name);
      if (
        websiteName === 'My Logo Name' ||
        websiteName === 'Placement Tracker' ||
        !websiteName.trim()
      ) {
        setWebsiteName(extracted);
      }

      showToast(`Loaded logo from "${file.name}"`, 'success');
    } catch (err) {
      console.error('Error processing logo image:', err);
      showToast('Could not process this image. Try another image.', 'warning');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
    // Reset input so re-selecting the same file fires onChange
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleApplyUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      showToast('Please enter an image URL', 'warning');
      return;
    }
    setLogoPreview(trimmed);
    showToast('Image URL applied to logo preview', 'info');
  };

  const handleSelectPreset = (presetDataUrl: string, presetName: string) => {
    setLogoPreview(presetDataUrl);
    showToast(`Selected "${presetName}" logo preset`, 'info');
  };

  const handleSave = () => {
    const finalName = cleanBrandName(websiteName);
    const finalLogo = logoPreview || DEFAULT_LOGO_SVG;

    updateBrand({
      logoUrl: finalLogo,
      websiteName: finalName,
      subtitle: subtitle.trim() || 'DSA & SQL Mastery',
    });
    showToast('Brand settings updated successfully!', 'success');
    onClose();
  };

  const handleReset = () => {
    resetBrand();
    setLogoPreview(DEFAULT_LOGO_SVG);
    setWebsiteName('My Logo Name');
    setSubtitle('DSA & SQL Mastery');
    showToast('Brand reset to defaults', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-[#161b26] border border-[#262c38] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#262c38] bg-[#121621]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 id="brand-modal-title" className="text-sm sm:text-base font-bold text-white">
                Customize Logo &amp; Website Name
              </h2>
              <p className="text-xs text-[#8b949e]">Upload your image, choose presets, or set title</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#1f2637] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Tabs for Adding Logo */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Choose Logo Source
              </label>
              <div className="flex bg-[#111620] p-0.5 rounded-lg border border-[#272e3d]">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'upload'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-[#8b949e] hover:text-white'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('presets')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'presets'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-[#8b949e] hover:text-white'
                  }`}
                >
                  <Palette className="w-3 h-3" />
                  <span>Presets</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === 'url'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-[#8b949e] hover:text-white'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Image URL</span>
                </button>
              </div>
            </div>

            {/* Tab: Upload File */}
            {activeTab === 'upload' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-orange-500 bg-orange-500/10'
                    : 'border-[#2c3547] hover:border-orange-500/50 bg-[#111620]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.ico"
                  onChange={handleFileChange}
                  onClick={(e) => e.stopPropagation()}
                  className="hidden"
                />

                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 py-3 text-orange-400">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-xs font-medium">Processing &amp; optimizing image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center gap-2 py-2">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Click to browse or drag &amp; drop your logo image
                      </p>
                      <p className="text-[11px] text-[#8b949e] mt-0.5">
                        PNG, JPG, SVG, WebP, GIF (auto-resized for best performance)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Presets */}
            {activeTab === 'presets' && (
              <div className="bg-[#111620] border border-[#272e3d] rounded-xl p-3">
                <p className="text-xs text-[#8b949e] mb-2.5">
                  Pick any premium developer icon to use as your logo:
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {PRESET_LOGOS.map((preset) => {
                    const isSelected = logoPreview === preset.dataUrl;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.dataUrl, preset.name)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500/20 shadow-md shadow-orange-500/20'
                            : 'border-[#272e3d] bg-[#161c28] hover:border-slate-500'
                        }`}
                        title={preset.name}
                      >
                        <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <img
                            src={preset.dataUrl}
                            alt={preset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[10px] text-slate-300 font-medium truncate max-w-full">
                          {preset.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab: Image URL */}
            {activeTab === 'url' && (
              <div className="bg-[#111620] border border-[#272e3d] rounded-xl p-3 space-y-2">
                <label className="block text-xs text-[#8b949e]">
                  Paste a direct link to any logo image (HTTPS):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="flex-1 bg-[#161c28] border border-[#2a3346] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
                  >
                    Apply URL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Website Name Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="website-name-input" className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Website Name / Logo Title
              </label>
              <button
                type="button"
                onClick={() => setWebsiteName('My Logo Name')}
                className="text-[11px] text-orange-400 hover:text-orange-300 flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Sparkles className="w-3 h-3" />
                Set &quot;My Logo Name&quot;
              </button>
            </div>
            <input
              id="website-name-input"
              type="text"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="e.g. My Logo Name"
              maxLength={40}
              className="w-full bg-[#111620] border border-[#2c3547] focus:border-orange-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
            <p className="text-[11px] text-[#8b949e] mt-1">
              Displayed as your brand title across the desktop sidebar, mobile drawer, and browser tab.
            </p>
          </div>

          {/* Subtitle / Tagline */}
          <div>
            <label htmlFor="subtitle-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Subtitle / Tagline
            </label>
            <input
              id="subtitle-input"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. DSA &amp; SQL Mastery"
              maxLength={45}
              className="w-full bg-[#111620] border border-[#2c3547] focus:border-orange-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
            />
          </div>

          {/* Live Preview Box */}
          <div className="pt-1">
            <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Active Logo Preview
            </span>
            <div className="p-3 bg-[#111620] border border-[#262c38] rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-orange-500/40 flex items-center justify-center shrink-0 bg-[#181f2c] shadow-md shadow-orange-500/10">
                <img
                  src={logoPreview || DEFAULT_LOGO_SVG}
                  alt={websiteName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if URL is invalid
                    (e.target as HTMLImageElement).src = DEFAULT_LOGO_SVG;
                  }}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white text-sm tracking-tight truncate flex items-center gap-1.5">
                  {websiteName || 'My Logo Name'}
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/30 px-1 py-0.2 rounded font-mono">
                    2026
                  </span>
                </span>
                <span className="text-[11px] text-[#7d8590] truncate">
                  {subtitle || 'DSA & SQL Mastery'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[#262c38] bg-[#111620]">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-[#8b949e] hover:text-white px-3 py-1.5 rounded-lg hover:bg-[#181f2c] transition-colors cursor-pointer"
          >
            Reset to Default
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-[#1c2333] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Save Logo &amp; Name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
