import React, { useState } from 'react';
import { 
  Sparkles, Search, Bookmark, History, LayoutGrid, Cpu, TrendingUp, Laptop, 
  Trash, BookmarkCheck, ChevronRight, Activity, Database, DollarSign, Calendar,
  ShieldCheck, AlertCircle, RefreshCw, Zap
} from 'lucide-react';
import { Project, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onToggleSaveProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  setCurrentView: (view: any) => void;
  onUpgradeTier: (tier: 'Free' | 'Pro' | 'Enterprise') => void;
}

export default function Dashboard({ 
  user, 
  projects, 
  onSelectProject, 
  onToggleSaveProject, 
  onDeleteProject, 
  setCurrentView,
  onUpgradeTier
}: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All');

  // Compute metrics
  const totalSpecsCount = projects.length;
  const savedSpecsCount = projects.filter(p => p.isSaved).length;
  const totalSprintsStructured = projects.reduce((acc, p) => acc + (p.generatedContent?.sprintsAndReadme?.sprintPlanning?.length || 0), 0);
  const totalDbTablesCount = projects.reduce((acc, p) => acc + (p.generatedContent?.technicalDesign?.sqlSchema?.match(/CREATE TABLE/gi)?.length || 0), 0);

  // Search/Filter logic
  const industries = ['All', ...Array.from(new Set(projects.map(p => p.industry)))];
  
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'All' || p.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const quickTemplates = [
    {
      title: "Consolidated Micro-Retailer App",
      desc: "Malaysia localized rural e-commerce network with kampungs shipping hubs.",
      industry: "Retail Tech & Local Logistics",
      country: "Malaysia",
      descSnippet: "A community network enabling small vendors to consolidate shipments to urban centers."
    },
    {
      title: "MedTech Appointment Planner",
      desc: "HIPAA-compliant, low-friction scheduling app with patient-doctor chat logs.",
      industry: "MedTech & Health Tech",
      country: "United States",
      descSnippet: "A responsive system facilitating patient secure booking with automated reminders."
    },
    {
      title: "Real Estate Tokenizer",
      desc: "Fractured real-estate ownership logs backed by relational audits.",
      industry: "PropTech & FinTech",
      country: "Global",
      descSnippet: "A secure framework enabling users to fractionalize properties and track dividend ledgers."
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white min-h-screen">
      {/* Upper Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 p-6 md:p-8 mb-8 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">{user.name}</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Construct high-cognition SaaS blueprints, SQL tables, REST routes, cost calculations, and agile Gantts for your startup ideas.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-3.5">
            <div className="text-xs sm:text-right space-y-0.5">
              <span className="text-zinc-500 font-semibold uppercase tracking-wider">Account Tier</span>
              <div className="flex items-center gap-1.5 font-bold text-white">
                <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider uppercase ${
                  user.tier === 'Enterprise' ? 'bg-indigo-500/15 text-indigo-400' :
                  user.tier === 'Pro' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {user.tier} Tier
                </span>
                <span>•</span>
                <span className="text-indigo-400 font-mono">{user.usageCount} / {user.usageLimit} Specs Used</span>
              </div>
            </div>

            {user.tier === 'Free' && (
              <button
                onClick={() => onUpgradeTier('Pro')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 transition-all hover:scale-[1.02] shadow-lg shadow-indigo-500/10"
                id="btn-upgrade-promo"
              >
                <Zap className="h-4 w-4 fill-white" />
                Upgrade to Startup Pro ($29/mo)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Bento Boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 relative group overflow-hidden">
          <div className="absolute top-4 right-4 h-8 w-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400 border border-indigo-500/5 group-hover:scale-105 transition-transform">
            <Cpu className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Specs Compiled</span>
          <h3 className="text-2xl font-extrabold text-white mt-1.5">{totalSpecsCount}</h3>
          <p className="text-[10px] text-zinc-400 mt-1">Virtual CTO plans active</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 relative group overflow-hidden">
          <div className="absolute top-4 right-4 h-8 w-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400 border border-indigo-500/5 group-hover:scale-105 transition-transform">
            <Bookmark className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Saved Plans</span>
          <h3 className="text-2xl font-extrabold text-white mt-1.5">{savedSpecsCount}</h3>
          <p className="text-[10px] text-zinc-400 mt-1">Bookmarked structures</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 relative group overflow-hidden">
          <div className="absolute top-4 right-4 h-8 w-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400 border border-indigo-500/5 group-hover:scale-105 transition-transform">
            <Activity className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Sprint Milestones</span>
          <h3 className="text-2xl font-extrabold text-white mt-1.5">{totalSprintsStructured}</h3>
          <p className="text-[10px] text-zinc-400 mt-1">Gantt cycles planned</p>
        </div>

        <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 relative group overflow-hidden">
          <div className="absolute top-4 right-4 h-8 w-8 rounded bg-indigo-500/5 flex items-center justify-center text-indigo-400 border border-indigo-500/5 group-hover:scale-105 transition-transform">
            <Database className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider font-mono">Relational Tables</span>
          <h3 className="text-2xl font-extrabold text-white mt-1.5">{totalDbTablesCount}</h3>
          <p className="text-[10px] text-zinc-400 mt-1">PostgreSQL structures</p>
        </div>
      </div>

      {/* Main Grid: Projects List & Side Quick Launcher templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Center Column: Project History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-1.5">
              <History className="h-5 w-5 text-indigo-400" />
              Software Specification Blueprints
            </h2>

            {/* Quick Search */}
            <div className="flex items-center gap-2 max-w-xs w-full bg-zinc-900/40 border border-zinc-800 rounded-xl px-3 py-1.5">
              <Search className="h-4 w-4 text-zinc-500 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search specs..."
                className="bg-transparent border-none text-xs text-white focus:outline-none w-full"
                id="input-dashboard-search"
              />
            </div>
          </div>

          {/* Filter Chips */}
          {industries.length > 2 && (
            <div className="flex flex-wrap gap-1.5">
              {industries.map((ind, i) => (
                <button
                  key={i}
                  onClick={() => setIndustryFilter(ind)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    industryFilter === ind 
                      ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' 
                      : 'bg-zinc-900/40 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-800'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          )}

          {/* List/Cards */}
          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/20 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">No architectures found</h4>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  {searchTerm ? "No projects match your current search queries." : "Trigger our virtual CTO compiler to output SaaS requirements."}
                </p>
              </div>
              {!searchTerm && (
                <button
                  onClick={() => setCurrentView('generate')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-500/10"
                  id="btn-empty-generate"
                >
                  Architect New Project
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((p, i) => (
                <div 
                  key={i} 
                  className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800/80 hover:bg-zinc-900/30 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    {/* Upper */}
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-[9px] font-bold text-indigo-400 font-mono uppercase tracking-wider">
                        {p.industry}
                      </span>
                      
                      <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onToggleSaveProject(p.id)}
                          className={`p-1.5 rounded hover:bg-zinc-850 text-zinc-400 ${p.isSaved ? 'text-amber-400 hover:text-amber-300' : 'hover:text-white'}`}
                          title={p.isSaved ? "Unsave Project" : "Save Project"}
                        >
                          {p.isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => onDeleteProject(p.id)}
                          className="p-1.5 rounded hover:bg-zinc-850 text-zinc-400 hover:text-red-400"
                          title="Delete Project"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-white leading-tight group-hover:text-indigo-400 transition-colors">{p.name}</h3>
                      <p className="text-[10px] text-zinc-500 font-mono">{p.country} • {p.timeline} Target</p>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="h-px bg-zinc-900 my-4"></div>
                  <button
                    onClick={() => onSelectProject(p)}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-indigo-400 hover:text-indigo-300 py-1"
                    id={`btn-view-${p.id}`}
                  >
                    <span>View Launch Specs</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Templates / Quick Launcher */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 border border-zinc-900 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-full blur-xl"></div>
            <div className="relative z-10 space-y-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="h-5 w-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white">Generate Custom Specs</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Enter your custom parameter goals to trigger our virtual architect logic.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('generate')}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-500/10 hover:scale-[1.01] transition-all"
                id="btn-sidebar-generate"
              >
                Architect New App
              </button>
            </div>
          </div>

          {/* Quick Ideas Templates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Suggested Blueprints</h3>
            
            <div className="space-y-3.5">
              {quickTemplates.map((tpl, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    setCurrentView('generate');
                  }}
                  className="p-4 rounded-xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30 transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-wider">{tpl.industry}</span>
                    <span className="text-[9px] text-zinc-500 font-mono">{tpl.country}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">{tpl.title}</h4>
                  <p className="text-[11px] text-zinc-400 leading-normal line-clamp-2 mt-1.5">{tpl.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
