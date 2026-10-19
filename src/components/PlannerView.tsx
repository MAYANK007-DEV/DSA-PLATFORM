import React, { useState, useMemo } from 'react';
import {
  Compass,
  Building2,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Brain,
  Sparkles,
  BookOpen,
  Code2,
  Database,
  Award,
  ChevronRight,
  Zap,
  Target,
  FileCheck2,
  ListTodo,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  MonitorCheck,
  Send,
  HelpCircle,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { useTracker } from '../context/TrackerContext.tsx';
import {
  COMPANY_ROADMAPS,
  CANDIDATE_PROCESS_STAGES,
  READINESS_CHECKLIST_ITEMS,
  PREPARATION_PHASES,
  DAILY_ROUTINES,
} from '../data/plannerData.ts';
import { calculateReadinessScore, getTimelineDurationLabel } from '../utils/plannerLogic.ts';

type PlannerTab = 'companies' | 'process' | 'roadmap' | 'checklist' | 'routines';

export const PlannerView: React.FC = () => {
  const { openSheet, completedMilestoneIds, toggleMilestone, overallStats } = useTracker();

  // Active top-level subtab in Planner
  const [activeTab, setActiveTab] = useState<PlannerTab>('companies');

  // Active Company in Company Blueprints
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');

  // Timeline speed mode for roadmaps
  const [timelineMode, setTimelineMode] = useState<'3-months' | '6-months' | '12-months'>('6-months');

  // Filter for readiness checklist
  const [checklistFilter, setChecklistFilter] = useState<string>('all');

  const selectedCompany =
    COMPANY_ROADMAPS.find((c) => c.id === selectedCompanyId) || COMPANY_ROADMAPS[0];

  // Calculate readiness score using decoupled pure logic
  const readinessMetrics = useMemo(() => {
    const totalChecklist = READINESS_CHECKLIST_ITEMS.length;
    const completedCount = READINESS_CHECKLIST_ITEMS.filter((item) =>
      completedMilestoneIds.includes(item.id)
    ).length;

    return calculateReadinessScore(totalChecklist, completedCount, overallStats.solved);
  }, [completedMilestoneIds, overallStats.solved]);

  const filteredChecklist = useMemo(() => {
    if (checklistFilter === 'all') return READINESS_CHECKLIST_ITEMS;
    return READINESS_CHECKLIST_ITEMS.filter((item) => item.category === checklistFilter);
  }, [checklistFilter]);

  return (
    <div className="space-y-6 md:space-y-8 max-w-6xl mx-auto pb-20 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-5 sm:p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                Placement &amp; Career Architecture 2026
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Candidate Roadmap &amp; Company Blueprints
            </h1>
            <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
              Step-by-step master plan to crack Google, Microsoft, JPMorgan, Oracle, Amazon, Goldman Sachs, and Tier-1 tech: recruitment processes, OA strategies, interview round breakdowns, and time-management schedules.
            </p>
          </div>

          {/* Readiness Score Quick Card */}
          <div className="bg-[#111620] border border-[#232b3b] p-4 rounded-xl flex items-center gap-4 shrink-0 self-start lg:self-auto min-w-[240px]">
            <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-[#202838]"
                  fill="transparent"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-orange-500 transition-all duration-500"
                  fill="transparent"
                  strokeDasharray={150.8}
                  strokeDashoffset={150.8 - (150.8 * readinessMetrics.totalScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-sm font-extrabold text-white font-mono">
                {readinessMetrics.totalScore}%
              </span>
            </div>
            <div>
              <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">
                Placement Readiness
              </div>
              <div className={`text-xs font-bold mt-0.5 ${readinessMetrics.tierColor}`}>
                {readinessMetrics.tierLabel}
              </div>
              <button
                onClick={() => setActiveTab('checklist')}
                className="text-[10px] text-orange-400 hover:text-orange-300 font-medium underline mt-1"
              >
                View checklist ({readinessMetrics.completedCount}/{readinessMetrics.totalChecklist})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-[#242b3a] no-scrollbar">
        <button
          onClick={() => setActiveTab('companies')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'companies'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161d29]'
          }`}
        >
          <Building2 className="w-4 h-4 shrink-0" />
          <span>Company Blueprints</span>
        </button>

        <button
          onClick={() => setActiveTab('process')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'process'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161d29]'
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>The 6-Step Process</span>
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'roadmap'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161d29]'
          }`}
        >
          <Target className="w-4 h-4 shrink-0" />
          <span>Phased Roadmaps</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'checklist'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161d29]'
          }`}
        >
          <FileCheck2 className="w-4 h-4 shrink-0" />
          <span>Readiness Checklist</span>
          {readinessMetrics.completedCount > 0 && (
            <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.2 rounded font-mono">
              {readinessMetrics.completedCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('routines')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'routines'
              ? 'bg-orange-500 text-white shadow-sm'
              : 'text-[#8b949e] hover:text-white hover:bg-[#161d29]'
          }`}
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span>Daily Routines &amp; Rules</span>
        </button>
      </div>

      {/* TAB 1: Company Blueprints */}
      {activeTab === 'companies' && (
        <div className="space-y-6">
          {/* Company Tab Switcher */}
          <div>
            <div className="text-xs text-[#8b949e] mb-2 font-medium">Select Target Organization:</div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {COMPANY_ROADMAPS.map((comp) => {
                const isSelected = selectedCompanyId === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedCompanyId(comp.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border shrink-0 ${
                      isSelected
                        ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                        : 'bg-[#151b26] text-[#8b949e] hover:text-white border-[#272e3d] hover:bg-[#1c2433]'
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: comp.color }}
                    />
                    <span>{comp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Company Detail Panel */}
          <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-5 sm:p-6 md:p-8 space-y-6">
            {/* Company Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#232b3b]">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedCompany.color }}
                  />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {selectedCompany.name} Cracking Blueprint
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#8b949e]">{selectedCompany.tagline}</p>
              </div>

              <button
                onClick={() => openSheet(selectedCompany.recommendedSheetId)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer self-start md:self-auto shrink-0"
              >
                <span>Practice {selectedCompany.name} Target Track</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Overview Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#111620] border border-[#232b3b] p-3 rounded-xl text-center">
                <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">DSA Weight</div>
                <div className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                  {selectedCompany.dsaWeight}
                </div>
              </div>
              <div className="bg-[#111620] border border-[#232b3b] p-3 rounded-xl text-center">
                <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">CS &amp; SQL Weight</div>
                <div className="text-base sm:text-lg font-extrabold text-cyan-300 mt-0.5">
                  {selectedCompany.csFundamentalsWeight}
                </div>
              </div>
              <div className="bg-[#111620] border border-[#232b3b] p-3 rounded-xl text-center">
                <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">Design Weight</div>
                <div className="text-base sm:text-lg font-extrabold text-amber-300 mt-0.5">
                  {selectedCompany.designWeight}
                </div>
              </div>
              <div className="bg-[#111620] border border-[#232b3b] p-3 rounded-xl text-center">
                <div className="text-[10px] text-[#8b949e] uppercase tracking-wider font-semibold">Difficulty Profile</div>
                <div className="text-[11px] font-bold text-emerald-400 mt-1 truncate">
                  {selectedCompany.difficultyFocus}
                </div>
              </div>
            </div>

            {/* Compensation & OA Platform Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedCompany.salaryTier && (
                <div className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Target Compensation Profile</div>
                    <div className="text-[#8b949e] mt-0.5 font-mono">{selectedCompany.salaryTier}</div>
                  </div>
                </div>
              )}

              {selectedCompany.oaPlatform && (
                <div className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] flex items-start gap-3">
                  <MonitorCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Online Assessment Format</div>
                    <div className="text-[#8b949e] mt-0.5">{selectedCompany.oaPlatform}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Interview Rounds Sequence */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b949e] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Round-By-Round Breakdown</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCompany.rounds.map((round, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-bold text-white mb-1">
                        <span>{round.title}</span>
                        <span className="text-[10px] text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                          {round.format}
                        </span>
                      </div>
                      <p className="text-xs text-[#9aa4b2] leading-relaxed">
                        {round.focus}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1a2332] text-[11px] text-amber-300/90 italic flex items-start gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                      <span>Insider tip: {round.insiderTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Must-Master Topics for this Company */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#8b949e] flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Crucial Question Patterns to Master</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCompany.keyTopics.map((kt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{kt.topic}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          kt.priority === 'Crucial'
                            ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {kt.priority}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {kt.mustMasterPatterns.map((pat) => (
                        <span
                          key={pat}
                          className="text-[10px] bg-[#171f2d] text-[#8b949e] border border-[#253043] px-2 py-0.5 rounded font-mono"
                        >
                          {pat}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cheat Sheet Keywords */}
            {selectedCompany.cheatSheetKeywords && (
              <div className="p-4 rounded-xl bg-[#111620] border border-[#232b3b] space-y-2">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>High-Probability Keyword Checklist</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.cheatSheetKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] bg-[#18212f] text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg font-mono font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Behavioral / Culture Fit Strategy */}
            <div className="p-4 rounded-xl bg-[#131c26] border border-[#223042] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Award className="w-4 h-4 text-orange-400" />
                <span>Behavioral &amp; Culture Assessment Focus</span>
              </div>
              <p className="text-xs text-[#9aa4b2] leading-relaxed">
                {selectedCompany.behavioralFocus}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: The 6-Step Candidate Process */}
      {activeTab === 'process' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-400" />
              <span>The 6-Step End-to-End Placement Pipeline</span>
            </h2>
            <p className="text-xs text-[#8b949e] mt-1">
              The rigorous process a candidate must follow from resume drafting to final executive offer rounds.
            </p>
          </div>

          <div className="space-y-5">
            {CANDIDATE_PROCESS_STAGES.map((stage) => (
              <div
                key={stage.id}
                className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#384358] transition-colors"
              >
                {/* Stage Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#222938]">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center text-xs font-extrabold font-mono shrink-0">
                      0{stage.stageNumber}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white">{stage.title}</h3>
                      <p className="text-xs text-[#8b949e]">{stage.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 self-start sm:self-auto">
                    {stage.timing}
                  </span>
                </div>

                {/* Action Items */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#c9d1d9] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Exact Action Items to Complete</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {stage.actionItems.map((action, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-[#111620] border border-[#202838] text-xs text-[#c9d1d9] flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Pitfalls & Pro Tip */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {/* Pitfalls */}
                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1.5">
                    <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>Critical Red Flags &amp; Mistakes to Avoid</span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-[#b6c2d1]">
                      {stage.keyPitfallsToAvoid.map((pitfall, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{pitfall}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Senior Engineer Insider Tip</span>
                    </div>
                    <p className="text-[11px] text-[#c9d1d9] leading-relaxed">
                      {stage.proTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Phased Roadmaps */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-400" />
                <span>Milestone-Driven Study Tracks</span>
              </h2>
              <p className="text-xs text-[#8b949e]">
                Choose your timeline pace to sequence your learning from fundamentals to offer letters
              </p>
            </div>

            {/* Timeline Speed Selector */}
            <div className="flex items-center gap-1.5 bg-[#111620] p-1 rounded-xl border border-[#232b3b] self-start sm:self-auto shrink-0">
              <button
                onClick={() => setTimelineMode('3-months')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timelineMode === '3-months'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                3-Month Sprint
              </button>
              <button
                onClick={() => setTimelineMode('6-months')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timelineMode === '6-months'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                6-Month Standard
              </button>
              <button
                onClick={() => setTimelineMode('12-months')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  timelineMode === '12-months'
                    ? 'bg-orange-500 text-white shadow'
                    : 'text-[#8b949e] hover:text-white'
                }`}
              >
                12-Month Campus
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {PREPARATION_PHASES.map((phase, idx) => {
              const isCompleted = completedMilestoneIds.includes(phase.id);

              return (
                <div
                  key={phase.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-[#121c17] border-emerald-500/30'
                      : 'bg-[#151b26] border-[#272e3d]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleMilestone(phase.id)}
                        className="p-1 text-[#8b949e] hover:text-white transition-colors cursor-pointer shrink-0"
                        aria-label={isCompleted ? `Mark incomplete: ${phase.title}` : `Mark complete: ${phase.title}`}
                        title={isCompleted ? 'Mark incomplete' : 'Mark phase complete'}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#485368]" />
                        )}
                      </button>

                      <div>
                        <h3
                          className={`text-sm sm:text-base font-bold ${
                            isCompleted ? 'text-emerald-300' : 'text-white'
                          }`}
                        >
                          {phase.title}
                        </h3>
                        <p className="text-xs text-orange-400 font-mono">
                          {getTimelineDurationLabel(timelineMode, idx)} • {phase.duration}
                        </p>
                      </div>
                    </div>

                    {phase.recommendedSheetId && (
                      <button
                        onClick={() => openSheet(phase.recommendedSheetId!)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181f2c] hover:bg-[#20293a] text-xs font-semibold text-white border border-[#2a3447] transition-colors self-start sm:self-auto cursor-pointer shrink-0"
                      >
                        <span>Open Recommended Sheet</span>
                        <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-[#8b949e] mb-3 ml-8 leading-relaxed">
                    {phase.focus}
                  </p>

                  {/* Milestone Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-8">
                    {phase.tasks.map((task, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex items-start gap-2 text-xs text-[#c9d1d9] bg-[#111620] border border-[#202838] p-2.5 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: Readiness Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-orange-400" />
                <span>Candidate Placement Readiness Checklist</span>
              </h2>
              <p className="text-xs text-[#8b949e]">
                Check off key patterns, systems, and interview drills to increase your Placement Readiness Score
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {['all', 'Core DSA', 'Advanced DSA', 'SQL & Databases', 'CS Fundamentals', 'Interview & Mock'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setChecklistFilter(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      checklistFilter === cat
                        ? 'bg-orange-500 text-white'
                        : 'bg-[#111620] text-[#8b949e] hover:text-white border border-[#202737]'
                    }`}
                  >
                    {cat === 'all' ? 'All Items' : cat}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Checklist Items Grid */}
          <div className="space-y-2.5">
            {filteredChecklist.map((item) => {
              const isChecked = completedMilestoneIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-[#121c17] border-emerald-500/30'
                      : 'bg-[#151b26] border-[#222938] hover:border-[#2f394d]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => toggleMilestone(item.id)}
                      className="mt-0.5 sm:mt-0 p-1 text-[#8b949e] hover:text-white cursor-pointer shrink-0"
                      aria-label={isChecked ? `Mark incomplete: ${item.label}` : `Mark as complete: ${item.label}`}
                      title={isChecked ? 'Mark incomplete' : 'Mark as complete'}
                    >
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-[#485368]" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs sm:text-sm font-semibold ${
                            isChecked ? 'text-emerald-300 line-through' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-[10px] font-mono bg-[#1d2636] text-[#8b949e] px-2 py-0.5 rounded border border-[#2a364d]">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {item.targetCount && (
                      <span className="text-[11px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        {item.targetCount}
                      </span>
                    )}

                    {item.recommendedSheetId && (
                      <button
                        onClick={() => openSheet(item.recommendedSheetId!)}
                        className="px-2.5 py-1 rounded bg-[#1c2433] hover:bg-[#253147] text-xs font-semibold text-white border border-[#2d384e] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Open Sheet</span>
                        <ArrowRight className="w-3 h-3 text-orange-400" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: Daily Routines & Commandments */}
      {activeTab === 'routines' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-400" />
              <span>Daily Execution Routines &amp; The 3 Core Rules</span>
            </h2>
            <p className="text-xs text-[#8b949e] mt-1">
              Time allocations for maximum cognitive retention and avoiding burnout during placement season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DAILY_ROUTINES.map((routine, rIdx) => (
              <div
                key={rIdx}
                className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-orange-400 shrink-0" />
                    <h3 className="text-sm font-bold text-white leading-tight">{routine.title}</h3>
                  </div>

                  <div className="space-y-2">
                    {routine.allocations.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="flex items-start gap-2.5 p-2 rounded-lg bg-[#111620] border border-[#202737] text-xs"
                      >
                        <span className="font-mono text-orange-400 font-bold shrink-0 w-16">
                          {item.time}
                        </span>
                        <span className="text-[#c9d1d9] leading-relaxed">{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* The 3 Core Rules for Cracking Tech Interviews */}
          <div className="bg-[#151b26] border border-[#272e3d] rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>The 3 Candidate Commandments for Top-Tier Placement</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#9aa4b2] leading-relaxed">
              <div className="p-4 rounded-xl bg-[#111620] border border-[#232b3b] space-y-1.5">
                <h4 className="font-bold text-white text-xs">1. The 20-Minute Struggle Rule</h4>
                <p>
                  When stuck, do NOT look at solutions before 20 minutes of pure whiteboard or pen-and-paper dry-running. The mental struggle is where neuroplastic pattern retention actually happens.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111620] border border-[#232b3b] space-y-1.5">
                <h4 className="font-bold text-white text-xs">2. Communicate Before Coding</h4>
                <p>
                  State edge cases (null inputs, duplicates, empty bounds), dry-run a simple example aloud, and state brute-force vs optimal time/space complexity before touching a single line of code.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#111620] border border-[#232b3b] space-y-1.5">
                <h4 className="font-bold text-white text-xs">3. Respect Spaced Repetition</h4>
                <p>
                  Solving 500 questions once is ineffective compared to solving 250 questions with 1, 3, 7, and 14-day revisions. Always record your confidence level and redo "Struggled" items promptly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
