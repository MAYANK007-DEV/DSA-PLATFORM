import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Compass,
  History,
  Settings,
  RotateCcw,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import { AppView } from '../types/index.ts';

export const MobileBottomNav: React.FC = () => {
  const { activeView, setActiveView, quickRevisionIds } = useTracker();

  const navItems: Array<{
    view: AppView;
    label: string;
    icon: React.ReactNode;
    badgeCount?: number;
  }> = [
    {
      view: 'dashboard',
      label: 'Workspace',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      view: 'sheets',
      label: 'Sheets',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      view: 'planner',
      label: 'Planner',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      view: 'revisions-history',
      label: 'Revisions',
      icon: <RotateCcw className="w-5 h-5" />,
      badgeCount: quickRevisionIds.length,
    },
    {
      view: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111620]/95 backdrop-blur-lg border-t border-[#262c38] px-2 py-1.5 flex items-center justify-around select-none"
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => {
        const isActive = activeView === item.view;
        return (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors relative min-w-[56px] cursor-pointer ${
              isActive
                ? 'text-orange-400 font-bold'
                : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            <div className="relative">
              {item.icon}
              {Boolean(item.badgeCount && item.badgeCount > 0) && (
                <span className="absolute -top-1 -right-2 text-[9px] bg-rose-500 text-white font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#111620]">
                  {item.badgeCount}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
