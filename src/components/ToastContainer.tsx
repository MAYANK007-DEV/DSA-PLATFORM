import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useTracker();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const icon =
          toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : toast.type === 'warning' ? (
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-orange-400 shrink-0" />
          );

        const borderClass =
          toast.type === 'success'
            ? 'border-emerald-500/30 bg-[#121f18]'
            : toast.type === 'warning'
            ? 'border-amber-500/30 bg-[#1e1c14]'
            : 'border-orange-500/30 bg-[#181f2c]';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border shadow-xl flex items-center justify-between gap-3 text-xs text-white transition-all ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icon}
              <span className="truncate leading-tight">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#8b949e] hover:text-white p-0.5 rounded cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
