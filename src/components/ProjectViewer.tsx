import React, { useState } from 'react';
import { 
  FileText, Database, Calendar, Rocket, Copy, Check, Download, ArrowLeft, Bookmark, 
  Map, User, Code, Server, Layout, DollarSign, ShieldAlert, FileCode, CheckCircle, 
  Layers, Lock, Play, Activity, PlayCircle, Terminal, Eye, BookmarkCheck
} from 'lucide-react';
import { Project, ApiEndpoint, CoreFeature, UserPersona, TechStackItem, CostEstimationItem } from '../types';

interface ProjectViewerProps {
  project: Project;
  onBack: () => void;
  onToggleSave: () => void;
}

export default function ProjectViewer({ project, onBack, onToggleSave }: ProjectViewerProps) {
  const [activeTab, setActiveTab] = useState<'prd' | 'architecture' | 'execution' | 'launch'>('prd');
  const [copiedCode, setCopiedCode] = useState<'sql' | 'erd' | 'readme' | null>(null);
  const [isSavingLocal, setIsSavingLocal] = useState(project.isSaved);

  const handleCopyText = (text: string, type: 'sql' | 'erd' | 'readme') => {
    navigator.clipboard.writeText(text);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Safe toggler for save
  const handleSaveToggle = () => {
    onToggleSave();
    setIsSavingLocal(!isSavingLocal);
  };

  // Downloader utilities
  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };

  const handleExportJSON = () => {
    downloadFile(JSON.stringify(project, null, 2), `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-spec.json`, "application/json");
  };

  const handleExportMarkdown = () => {
    const mdContent = `
# ${project.name} - Software Specification Plan
**Industry:** ${project.industry} | **Target Region:** ${project.country}
**Timeline Target:** ${project.timeline} | **Estimated Budget:** ${project.budget}

---

## 1. Product Requirements Document (PRD)

### Executive Summary
${project.generatedContent.prd.executiveSummary}

### Project Overview
${project.generatedContent.prd.projectOverview}

### Target Users & Demographics
${project.generatedContent.prd.targetUsers}

### Market Analysis & Opportunity Niche
${project.generatedContent.prd.marketAnalysis}

---

## 2. Technical Architecture & Database Design

### Recommended Tech Stack
${project.generatedContent.technicalDesign.recommendedTechStack.map(t => `- **${t.category}**: ${t.technology} (Reason: ${t.reason})`).join('\n')}

### System Architecture Topology
${project.generatedContent.technicalDesign.systemArchitecture}

### SQL Database Schema
\`\`\`sql
${project.generatedContent.technicalDesign.sqlSchema}
\`\`\`

### API Endpoint Spec Sheets
${project.generatedContent.technicalDesign.apiEndpoints.map(e => `#### ${e.method} ${e.path}
- **Description:** ${e.description}
- **Request Body Sample:** \`${e.requestBody || "None"}\`
- **Response Sample:** \`${e.response || "None"}\``).join('\n\n')}

---

## 3. GitHub README.md Launcher
${project.generatedContent.sprintsAndReadme.readme}
`;
    downloadFile(mdContent.trim(), `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-readme.md`, "text/markdown");
  };

  const handleExportDocx = () => {
    const plainTextDoc = `
DEVLAUNCH AI - COMPLETE STARTUP BLUEPRINT
===========================================
Project Name: ${project.name}
Industry Sector: ${project.industry}
Geography: ${project.country}

1. EXECUTIVE SUMMARY
---------------------
${project.generatedContent.prd.executiveSummary}

2. OVERVIEW & VISION
---------------------
${project.generatedContent.prd.projectOverview}

3. USER PROFILE RESEARCH
------------------------
${project.generatedContent.prd.targetUsers}

4. DATABASE DESIGN & SQL STRUCTURES
------------------------------------
${project.generatedContent.technicalDesign.databaseDesign}

SQL Schema:
${project.generatedContent.technicalDesign.sqlSchema}

5. BUDGET & CLOUD OVERHEAD FORECASTS
-------------------------------------
${project.generatedContent.projectExecution.revenueModel}
`;
    downloadFile(plainTextDoc.trim(), `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-spec.doc`, "application/msword");
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white min-h-screen relative print:bg-white print:text-black">
      {/* Upper Navigation & Export Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8 print:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-indigo-400 transition-colors"
            title="Back to Projects"
            id="btn-viewer-back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{project.name}</h1>
            <p className="text-xs text-zinc-400 flex items-center gap-2 mt-1">
              <span>{project.industry}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
              <span>{project.country}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
              <span>{project.timeline}</span>
            </p>
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Save toggle */}
          <button
            onClick={handleSaveToggle}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
              isSavingLocal 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
            }`}
            id="btn-viewer-save"
          >
            {isSavingLocal ? (
              <>
                <BookmarkCheck className="h-4 w-4" />
                Spec Saved
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                Save Spec
              </>
            )}
          </button>

          {/* Export options */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
            <button
              onClick={handleExportJSON}
              className="px-2.5 py-1.5 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-805 transition-all flex items-center gap-1"
              title="Download structured JSON specs"
              id="btn-export-json"
            >
              <FileCode className="h-3.5 w-3.5" />
              JSON
            </button>
            <button
              onClick={handleExportMarkdown}
              className="px-2.5 py-1.5 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-805 transition-all flex items-center gap-1"
              title="Download GitHub standard Markdown"
              id="btn-export-md"
            >
              <Code className="h-3.5 w-3.5" />
              Markdown
            </button>
            <button
              onClick={handleExportDocx}
              className="px-2.5 py-1.5 rounded text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-805 transition-all flex items-center gap-1"
              title="Download plain Word doc file"
              id="btn-export-doc"
            >
              <FileText className="h-3.5 w-3.5" />
              DOCX
            </button>
            <button
              onClick={handlePrintPDF}
              className="px-2.5 py-1.5 rounded text-xs font-semibold text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition-all flex items-center gap-1"
              title="Print document or save as native PDF"
              id="btn-export-pdf"
            >
              <Download className="h-3.5 w-3.5" />
              PDF / Print
            </button>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex items-center gap-2 border-b border-zinc-800 mb-8 print:hidden">
        <button
          onClick={() => setActiveTab('prd')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'prd' ? 'text-indigo-400 border-indigo-500' : 'text-zinc-400 border-transparent hover:text-white'
          }`}
          id="tab-prd"
        >
          <FileText className="h-4 w-4" />
          Product Specification (PRD)
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'architecture' ? 'text-indigo-400 border-indigo-500' : 'text-zinc-400 border-transparent hover:text-white'
          }`}
          id="tab-arch"
        >
          <Database className="h-4 w-4" />
          Technical Design & DB
        </button>
        <button
          onClick={() => setActiveTab('execution')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'execution' ? 'text-indigo-400 border-indigo-500' : 'text-zinc-400 border-transparent hover:text-white'
          }`}
          id="tab-exec"
        >
          <Calendar className="h-4 w-4" />
          Sprint Execution
        </button>
        <button
          onClick={() => setActiveTab('launch')}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'launch' ? 'text-indigo-400 border-indigo-500' : 'text-zinc-400 border-transparent hover:text-white'
          }`}
          id="tab-launch"
        >
          <Rocket className="h-4 w-4" />
          Launch Kit & Sagas
        </button>
      </div>

      {/* Main content viewport */}
      <div className="bg-zinc-950 text-zinc-300">
        {/* TABS - PRD */}
        {activeTab === 'prd' && (
          <div className="space-y-10" id="viewer-prd-tab">
            {/* Executive Vision */}
            <div className="p-8 rounded-2xl bg-zinc-900/20 border border-zinc-900 relative">
              <div className="absolute top-0 left-8 -translate-y-1/2 px-2.5 py-1 rounded bg-indigo-500 text-white font-mono font-bold text-[10px] uppercase tracking-wider">
                Vision
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Executive Summary</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">{project.generatedContent.prd.executiveSummary}</p>
            </div>

            {/* Project Overview */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Map className="h-5 w-5 text-indigo-400" />
                Product Scope & Unique Value Propositions
              </h2>
              <div className="p-6 rounded-xl bg-zinc-900/10 border border-zinc-900 text-sm text-zinc-300 leading-relaxed">
                {project.generatedContent.prd.projectOverview}
              </div>
            </div>

            {/* Target Audience Research */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <User className="h-4 w-4 text-indigo-400" />
                  Target Demographics
                </h3>
                <div className="p-6 rounded-xl bg-zinc-900/10 border border-zinc-900 text-sm text-zinc-300 leading-relaxed">
                  {project.generatedContent.prd.targetUsers}
                </div>
              </div>

              {/* User Personas */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <User className="h-4 w-4 text-indigo-400" />
                  Primary User Personas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.generatedContent.prd.userPersonas.map((p, i) => (
                    <div key={i} className="p-6 rounded-xl bg-zinc-900/30 border border-zinc-800 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-extrabold text-sm border border-indigo-400/20 shadow-inner">
                            {p.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white leading-tight">{p.name}</h4>
                            <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">{p.role}</span>
                          </div>
                        </div>
                        <p className="text-xs italic text-zinc-400 border-l-2 border-zinc-850 pl-3">"{p.quote}"</p>
                        <div className="text-xs space-y-1">
                          <div className="text-zinc-500 font-bold uppercase tracking-wide text-[9px]">Goals</div>
                          <p className="text-zinc-300">{p.goals}</p>
                        </div>
                        <div className="text-xs space-y-1">
                          <div className="text-zinc-500 font-bold uppercase tracking-wide text-[9px]">Pain Points</div>
                          <p className="text-zinc-300">{p.painPoints}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Competitive Landscape */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-white">Market Positioning</h3>
                <div className="p-6 rounded-xl bg-zinc-900/10 border border-zinc-900 text-sm text-zinc-300 leading-relaxed">
                  {project.generatedContent.prd.marketAnalysis}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white">Competitor Differential Matrix</h3>
                <div className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-zinc-800">
                        <th className="p-3 font-semibold text-white uppercase tracking-wider">Competitor</th>
                        <th className="p-3 font-semibold text-white uppercase tracking-wider">Strengths</th>
                        <th className="p-3 font-semibold text-white uppercase tracking-wider">Weaknesses</th>
                        <th className="p-3 font-semibold text-indigo-400 uppercase tracking-wider">Our Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80">
                      {project.generatedContent.prd.competitorIdeas.map((c, i) => (
                        <tr key={i} className="hover:bg-zinc-900/10 transition-colors">
                          <td className="p-3 font-bold text-white">{c.name}</td>
                          <td className="p-3 text-zinc-400">{c.strengths}</td>
                          <td className="p-3 text-zinc-400">{c.weaknesses}</td>
                          <td className="p-3 text-indigo-300 font-semibold bg-indigo-500/[0.02]">{c.ourAdvantage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABS - ARCHITECTURE & DB */}
        {activeTab === 'architecture' && (
          <div className="space-y-10" id="viewer-arch-tab">
            {/* Tech Stack Bento */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-400" />
                Recommended Production Tech Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.generatedContent.technicalDesign.recommendedTechStack.map((t, i) => (
                  <div key={i} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/20">
                    <span className="text-[10px] text-indigo-400 font-mono font-bold uppercase tracking-widest">{t.category}</span>
                    <h4 className="text-base font-bold text-white mt-1 mb-2">{t.technology}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{t.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SQL & ER Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SQL Schema */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <Code className="h-4 w-4 text-indigo-400" />
                    PostgreSQL Schema (DDL)
                  </h3>
                  <button
                    onClick={() => handleCopyText(project.generatedContent.technicalDesign.sqlSchema, 'sql')}
                    className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors py-1 px-2 rounded hover:bg-zinc-900"
                  >
                    {copiedCode === 'sql' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy SQL
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 text-xs font-mono text-emerald-400 overflow-x-auto max-h-[350px]">
                    <code>{project.generatedContent.technicalDesign.sqlSchema}</code>
                  </pre>
                </div>
              </div>

              {/* ERD Graphic Visualization */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <FileCode className="h-4 w-4 text-indigo-400" />
                    Entity Relations Specification (Mermaid)
                  </h3>
                  <button
                    onClick={() => handleCopyText(project.generatedContent.technicalDesign.mermaidErDiagram, 'erd')}
                    className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors py-1 px-2 rounded hover:bg-zinc-900"
                  >
                    {copiedCode === 'erd' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Syntax
                      </>
                    )}
                  </button>
                </div>
                
                {/* Visual DB table representation */}
                <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 space-y-4 h-[350px] overflow-y-auto">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-zinc-900 pb-2">
                    <span>Database Design Topology</span>
                    <span className="text-indigo-400">Relations Active</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed italic">{project.generatedContent.technicalDesign.databaseDesign}</p>
                  
                  {/* Graphical Mock Relations */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-white font-bold mb-1 pb-1 border-b border-zinc-850">USERS [Table]</div>
                      <div className="text-zinc-400">id : INT (PK)</div>
                      <div className="text-zinc-400">email : VARCHAR</div>
                      <div className="text-zinc-400">created_at : TIMESTAMP</div>
                    </div>
                    <div className="p-3.5 rounded bg-zinc-900 border border-zinc-800">
                      <div className="text-white font-bold mb-1 pb-1 border-b border-zinc-850">PROJECTS [Table]</div>
                      <div className="text-zinc-400">id : INT (PK)</div>
                      <div className="text-zinc-400">user_id : INT (FK)</div>
                      <div className="text-zinc-400">content : JSONB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* REST API Endpoints Specifications */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Server className="h-4 w-4 text-indigo-400" />
                REST API Integration Blueprints
              </h3>
              <div className="space-y-4">
                {project.generatedContent.technicalDesign.apiEndpoints.map((e, idx) => (
                  <div key={idx} className="rounded-xl border border-zinc-900 bg-zinc-900/10 overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900/30 gap-3 border-b border-zinc-900">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                          e.method === 'GET' ? 'bg-indigo-500/15 text-indigo-400' :
                          e.method === 'POST' ? 'bg-violet-500/15 text-violet-400' :
                          e.method === 'PUT' ? 'bg-amber-500/15 text-amber-400' : 'bg-rose-500/15 text-rose-400'
                        }`}>
                          {e.method}
                        </span>
                        <span className="font-mono text-sm text-white font-bold">{e.path}</span>
                      </div>
                      <span className="text-xs text-zinc-400 font-medium">{e.description}</span>
                    </div>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono bg-zinc-950/20">
                      {e.requestBody && (
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase text-[9px] font-bold tracking-wider">Request Payload</span>
                          <pre className="p-3 bg-zinc-950 rounded border border-zinc-900 text-zinc-300 overflow-x-auto">
                            <code>{e.requestBody}</code>
                          </pre>
                        </div>
                      )}
                      {e.response && (
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase text-[9px] font-bold tracking-wider">Success Response (200 OK)</span>
                          <pre className="p-3 bg-zinc-950 rounded border border-zinc-900 text-zinc-300 overflow-x-auto">
                            <code>{e.response}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Folder structures & System Topography */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  ASCII Folder Topology
                </h3>
                <pre className="p-4 rounded-xl border border-zinc-900 bg-zinc-950 text-[11px] font-mono text-indigo-300 overflow-x-auto">
                  <code>{project.generatedContent.technicalDesign.folderStructure}</code>
                </pre>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-indigo-400" />
                    Authentication Protocol & JWT Sagas
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.generatedContent.technicalDesign.authFlow}</p>
                </div>

                <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Layout className="h-4 w-4 text-indigo-400" />
                    Distributed System Architecture
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.generatedContent.technicalDesign.systemArchitecture}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TABS - EXECUTION */}
        {activeTab === 'execution' && (
          <div className="space-y-10" id="viewer-exec-tab">
            {/* Timeline phase */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-400" />
                Agile Gantt Timeline & Milestone Phases
              </h2>
              <div className="space-y-4">
                {project.generatedContent.projectExecution.timelineAndMilestones.map((m, i) => (
                  <div key={i} className="p-5 rounded-xl border border-zinc-900 bg-zinc-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 sm:max-w-xs">
                      <span className="text-[10px] font-bold font-mono text-indigo-400 uppercase tracking-widest">{m.duration}</span>
                      <h4 className="text-base font-bold text-white">{m.phase}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:max-w-lg">
                      {m.deliverables.map((d, dIdx) => (
                        <span key={dIdx} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-xs text-zinc-300">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost Forecasting Bento & Monetization */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cost Forecast */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-indigo-400" />
                  Monthly Cloud & Infrastructure Estimates
                </h3>
                <div className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-zinc-900 border-b border-zinc-800">
                        <th className="p-3 font-semibold text-white uppercase tracking-wider">Item / Resource</th>
                        <th className="p-3 font-semibold text-white uppercase tracking-wider">Billing Frequency</th>
                        <th className="p-3 font-semibold text-right text-indigo-400 uppercase tracking-wider">Overhead Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/80">
                      {project.generatedContent.projectExecution.costEstimation.map((c, i) => (
                        <tr key={i} className="hover:bg-zinc-900/10 transition-colors">
                          <td className="p-3 font-bold text-white">{c.item}</td>
                          <td className="p-3 text-zinc-400">{c.frequency}</td>
                          <td className="p-3 text-right text-emerald-400 font-semibold">{c.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Monetization Strategy */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-indigo-400" />
                  Revenue Sagas
                </h3>
                <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-900/10 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Monetization Model</span>
                    <p className="text-xs text-zinc-300 leading-relaxed">{project.generatedContent.projectExecution.revenueModel}</p>
                  </div>
                  <div className="h-px bg-zinc-850"></div>
                  <div className="space-y-3">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Monetization Channels</span>
                    {project.generatedContent.projectExecution.monetizationIdeas.map((m, i) => (
                      <div key={i} className="text-xs">
                        <div className="flex items-center justify-between font-bold text-white mb-0.5">
                          <span>{m.type}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                            m.viability === 'High' ? 'bg-emerald-500/10 text-emerald-400' :
                            m.viability === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            Viability: {m.viability}
                          </span>
                        </div>
                        <p className="text-zinc-400">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Mitigation Tabular */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Architectural Risk Neutralization Sagas
              </h3>
              <div className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950/40">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 border-b border-zinc-800">
                      <th className="p-3.5 font-semibold text-white uppercase tracking-wider">Identified Risk</th>
                      <th className="p-3.5 font-semibold text-white uppercase tracking-wider">Severity Level</th>
                      <th className="p-3.5 font-semibold text-white uppercase tracking-wider">Tactical Mitigation Plan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {project.generatedContent.projectExecution.riskAnalysis.map((r, i) => (
                      <tr key={i} className="hover:bg-zinc-900/10 transition-colors">
                        <td className="p-3.5 font-bold text-white">{r.risk}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ${
                            r.severity === 'High' ? 'bg-rose-500/10 text-rose-400' :
                            r.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-zinc-800 text-zinc-550'
                          }`}>
                            {r.severity}
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-300 leading-relaxed">{r.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TABS - LAUNCH KIT */}
        {activeTab === 'launch' && (
          <div className="space-y-10" id="viewer-launch-tab">
            {/* Agile Sprints Cycles */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Terminal className="h-5 w-5 text-indigo-400" />
                Agile Sprint Backlog Cycles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.generatedContent.sprintsAndReadme.sprintPlanning.map((s, i) => (
                  <div key={i} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
                      <h4 className="text-sm font-bold text-white">{s.sprintName}</h4>
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">{s.duration}</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-zinc-400">
                      {s.goals.map((g, gIdx) => (
                        <li key={gIdx} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* User Stories */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <User className="h-4 w-4 text-indigo-400" />
                Epic User Stories & Sagas
              </h3>
              <div className="space-y-4">
                {project.generatedContent.sprintsAndReadme.userStories.map((u, i) => (
                  <div key={i} className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/20">
                    <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400 font-mono">
                      <span className="text-indigo-400 font-bold uppercase tracking-wider">{u.role}</span>
                      <span>•</span>
                      <span>Saga Stories</span>
                    </div>
                    <h4 className="text-sm font-bold text-white leading-relaxed mb-4">
                      "{u.role}, I want {u.goal}, so that {u.benefit}."
                    </h4>
                    <div className="space-y-2">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Acceptance Criteria</div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                        {u.acceptanceCriteria.map((a, aIdx) => (
                          <li key={aIdx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Launch Security Checklists & Strategies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Security Checklist */}
              <div className="lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-indigo-400" />
                  Launch Security Auditing Checklists
                </h3>
                <div className="p-5 rounded-xl border border-zinc-900 bg-zinc-900/10 space-y-4">
                  {project.generatedContent.projectExecution.securityChecklist.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <input type="checkbox" defaultChecked className="mt-0.5 accent-indigo-500 rounded text-zinc-950 focus:ring-0 focus:ring-offset-0" />
                      <div>
                        <div className="font-bold text-white leading-tight">{s.item}</div>
                        <p className="text-zinc-500 text-[11px] mt-0.5">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dev & Testing Strategy */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle className="h-4 w-4 text-indigo-400" />
                    Testing Protocol Strategy
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.generatedContent.projectExecution.testingStrategy}</p>
                </div>

                <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-900/10">
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                    <Rocket className="h-4 w-4 text-indigo-400" />
                    Launch Operations Deployment Strategy
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{project.generatedContent.projectExecution.deploymentStrategy}</p>
                </div>
              </div>
            </div>

            {/* GitHub README Block */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <FileCode className="h-4 w-4 text-indigo-400" />
                  GitHub Launcher README.md
                </h3>
                <button
                  onClick={() => handleCopyText(project.generatedContent.sprintsAndReadme.readme, 'readme')}
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors py-1 px-2 rounded hover:bg-zinc-900"
                >
                  {copiedCode === 'readme' ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Markdown
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 rounded-xl border border-zinc-900 bg-zinc-950 text-xs font-mono text-zinc-300 overflow-x-auto max-h-[400px]">
                <pre>
                  <code>{project.generatedContent.sprintsAndReadme.readme}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
