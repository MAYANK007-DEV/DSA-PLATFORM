import React from 'react';
import { TrackerProvider, useTracker } from './context/TrackerContext.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { SheetsCatalogView } from './components/SheetsCatalogView.tsx';
import { SheetDetailView } from './components/SheetDetailView.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { RevisionHistoryView } from './components/RevisionHistoryView.tsx';
import { PlannerView } from './components/PlannerView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { RevisionModal } from './components/RevisionModal.tsx';
import { NotesModal } from './components/NotesModal.tsx';
import { SqlProblemModal } from './components/SqlProblemModal.tsx';
import { DataExportModal } from './components/DataExportModal.tsx';
import { ToastContainer } from './components/ToastContainer.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { MobileDrawer } from './components/MobileDrawer.tsx';
import { VideoIntro } from './components/VideoIntro.tsx';

const AppContent: React.FC = () => {
  const { activeView } = useTracker();
  const [introFinished, setIntroFinished] = React.useState(false);

  return (
    <div className="flex h-screen w-screen bg-[#111119] text-[#ebf1f5] overflow-hidden font-sans antialiased relative">
      <VideoIntro onComplete={() => setIntroFinished(true)} />

      {/* Narrow vertical left icon rail / sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Header />

        <main className="flex-1 p-3.5 sm:p-6 md:p-8 pb-28 sm:pb-8">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'sheets' && <SheetsCatalogView />}
          {activeView === 'sheet-detail' && <SheetDetailView />}
          {activeView === 'planner' && <PlannerView />}
          {activeView === 'revisions-history' && <RevisionHistoryView />}
          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Drawer (Slide-out navigation on small viewports) */}
      <MobileDrawer />

      {/* Mobile Bottom Navigation Bar (Thumb-friendly on mobile) */}
      <MobileBottomNav />

      {/* Modals & Overlays */}
      <RevisionModal />
      <NotesModal />
      <SqlProblemModal />
      <DataExportModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <TrackerProvider>
      <AppContent />
    </TrackerProvider>
  );
}
