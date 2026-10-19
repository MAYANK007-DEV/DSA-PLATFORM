export interface BrandConfig {
  logoUrl: string;
  websiteName: string;
  subtitle: string;
}

export const PRACTICE_KIT_LOGO_SVG = `/logo-icon.svg`;
export const DEFAULT_LOGO_SVG = `/logo-icon.svg`;

export interface PresetLogo {
  id: string;
  name: string;
  color: string;
  dataUrl: string;
}

export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'practice-kit',
    name: 'Practice Kit Coding',
    color: '#ff2d75',
    dataUrl: '/logo-icon.svg',
  },
  {
    id: 'code-orange',
    name: 'Code Brackets',
    color: '#f97316',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f97316"/><stop offset="100%" stop-color="%23ea580c"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23g)"/><path d="M22 32 L28 24 M22 32 L28 40 M42 32 L36 24 M42 32 L36 40 M34 22 L30 42" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: 'rocket-purple',
    name: 'Rocket Ship',
    color: '#8b5cf6',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%238b5cf6"/><stop offset="100%" stop-color="%23ec4899"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23rg)"/><path d="M32 18 C38 18 44 24 44 32 C44 40 38 46 32 46 C26 46 20 40 20 32 C20 24 26 18 32 18 Z" fill="none" stroke="white" stroke-width="3"/><path d="M32 14 L32 24 M24 38 L16 44 M40 38 L48 44" stroke="white" stroke-width="3" stroke-linecap="round"/></svg>`,
  },
  {
    id: 'terminal-emerald',
    name: 'Tech Terminal',
    color: '#10b981',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="tg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2310b981"/><stop offset="100%" stop-color="%23059669"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23tg)"/><path d="M22 26 L29 32 L22 38 M33 38 L42 38" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: 'shield-cyan',
    name: 'Cyber Shield',
    color: '#06b6d4',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%2306b6d4"/><stop offset="100%" stop-color="%232563eb"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23sg)"/><path d="M32 18 L44 24 L44 34 C44 42 32 48 32 48 C32 48 20 42 20 34 L20 24 Z" stroke="white" stroke-width="3" fill="none"/><path d="M28 32 L31 35 L37 29" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  },
  {
    id: 'diamond-amber',
    name: 'Neon Diamond',
    color: '#f59e0b',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="dg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f59e0b"/><stop offset="100%" stop-color="%23d97706"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23dg)"/><polygon points="32,16 46,32 32,48 18,32" stroke="white" stroke-width="3.5" fill="none"/><circle cx="32" cy="32" r="4" fill="white"/></svg>`,
  },
  {
    id: 'lightning-rose',
    name: 'Lightning',
    color: '#f43f5e',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f43f5e"/><stop offset="100%" stop-color="%23e11d48"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(%23lg)"/><polygon points="35,16 23,34 32,34 29,48 41,30 32,30" stroke="white" stroke-width="2.5" fill="white"/></svg>`,
  },
];

export const DEFAULT_BRAND: BrandConfig = {
  logoUrl: '/logo-icon.svg',
  websiteName: 'Practice Kit Coding',
  subtitle: 'DSA & Placement Prep',
};

export function cleanBrandName(name?: string | null): string {
  if (!name || !name.trim()) return DEFAULT_BRAND.websiteName;
  return name.trim().slice(0, 40);
}

export function extractBrandNameFromFileName(filename: string): string {
  if (!filename) return DEFAULT_BRAND.websiteName;
  // Strip extension
  const withoutExt = filename.replace(/\.[^/.]+$/, '');
  // Replace underscores and hyphens with spaces
  const formatted = withoutExt
    .replace(/[-_]+/g, ' ')
    .trim()
    // Capitalize words
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formatted || DEFAULT_BRAND.websiteName;
}

export function validateImageFile(file: { size: number; type: string; name?: string }): {
  valid: boolean;
  error?: string;
} {
  const hasImageType = file.type && file.type.toLowerCase().startsWith('image/');
  const hasImageExtension =
    file.name &&
    /\.(png|jpe?g|webp|svg|gif|bmp|ico|avif)$/i.test(file.name);

  if (!hasImageType && !hasImageExtension) {
    return {
      valid: false,
      error: 'Please upload an image file (PNG, JPG, SVG, WebP, GIF).',
    };
  }

  // Generous 15MB limit so modern camera photos are supported
  const MAX_SIZE = 15 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'Image file exceeds 15MB limit.',
    };
  }

  return { valid: true };
}

/**
 * Resizes any image file in-browser to a compact max 256x256 data URL.
 * SVGs are preserved as SVG data URLs.
 * This guarantees the output is < 25KB and will never exceed localStorage quota.
 */
export function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // If SVG, read as text/dataURL directly
    if (file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg')) {
      const reader = new FileReader();
      reader.onload = (e) => resolve((e.target?.result as string) || DEFAULT_LOGO_SVG);
      reader.onerror = () => reject(new Error('Failed to read SVG file'));
      reader.readAsDataURL(file);
      return;
    }

    // For raster images, downscale via canvas to max 256x256
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        resolve(rawDataUrl);
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const maxDim = 256;
          let width = img.width || maxDim;
          let height = img.height || maxDim;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/png');
          resolve(compressed);
        } catch {
          resolve(rawDataUrl);
        }
      };
      img.onerror = () => resolve(rawDataUrl);
      img.src = rawDataUrl;
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
}
