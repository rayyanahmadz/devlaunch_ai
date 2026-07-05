import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, ArrowLeft, ArrowRight, Lightbulb, Compass, Globe, DollarSign, Calendar, Target, Laptop } from 'lucide-react';
import { Project } from '../types';
import { API } from '../lib/api';

interface GenerationFlowProps {
  token: string;
  onGenerationSuccess: (project: Project) => void;
  setCurrentView: (view: any) => void;
}

export default function GenerationFlow({ token, onGenerationSuccess, setCurrentView }: GenerationFlowProps) {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('Global');
  const [targetAudience, setTargetAudience] = useState('');
  const [budget, setBudget] = useState('$10k MVP');
  const [timeline, setTimeline] = useState('3 Months');
  const [description, setDescription] = useState('');
  const [goals, setGoals] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Loading sub-status messages to simulate architectural compilation
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    "Spinning up elite virtual CTO agent...",
    "Analyzing country-specific regulatory ecosystems...",
    "Establishing target persona user profiles...",
    "Structuring fully normalized PostgreSQL schemas...",
    "Mapping REST API endpoints and validation layers...",
    "Calculating monthly operational cloud cost items...",
    "Defining Agile sprints, user stories, and acceptance marks...",
    "Formatting professional GitHub launch Markdown README..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 2200);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !industry || !description) {
      setError("Please complete all required fields (Project Name, Industry, and Description).");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const data = await API.generateProject({
        name,
        industry,
        country,
        targetAudience,
        budget,
        timeline,
        description,
        goals,
      }, token);

      onGenerationSuccess(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during planning package compilation.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setName("HalaalCart");
    setIndustry("Retail Tech & Local Logistics");
    setCountry("Malaysia");
    setTargetAudience("Local micro-retailers and eco-conscious grocery consumers");
    setBudget("$15,000 MVP");
    setTimeline("2.5 Months");
    setDescription("A localized community e-commerce network enabling small vendors in Malaysian kampungs to coordinate consolidated shipments to urban food hubs.");
    setGoals("Onboard 80 local vendors in the first month and reduce delivery overhead by 30% using consolidated micro-depots.");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 px-4 text-center text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        
        <div className="max-w-md w-full p-8 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md relative z-10 space-y-6">
          <div className="flex items-center justify-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/20">
              <Loader2 className="h-8 w-8 animate-spin" />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 opacity-20 blur-md -z-10 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight">Compiling Specifications</h3>
            <p className="text-xs text-indigo-400 font-mono tracking-wider uppercase animate-pulse">{loadingSteps[loadingStep]}</p>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed">
            Our virtual CTO agent is utilizing high-cognition Google Gemini modules to design custom SQL schemas, API routes, bento layout strategies, and cost estimations. This may take up to 10 seconds.
          </p>

          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 animate-loading-bar rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 text-white min-h-screen">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('dashboard')}
        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white mb-6 transition-colors font-semibold"
        id="btn-gen-back"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Architect New Project</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Specify your business parameters below and trigger our virtual CTO specification suite.
          </p>
        </div>
        <button
          type="button"
          onClick={handleQuickFill}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 hover:scale-[1.02] transition-all self-start sm:self-center"
          title="Fills in a ready-made retail concept for Malaysia"
          id="btn-quick-fill"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          Fill Retail Demo Niche
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Laptop className="h-3.5 w-3.5 text-indigo-400" />
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. BiteSpeed Pakistan, SaaSify Contract"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-name"
            />
          </div>

          {/* Industry */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Compass className="h-3.5 w-3.5 text-indigo-400" />
              Industry Sector <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. PropTech, Logistics, EdTech, Fintech"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-industry"
            />
          </div>

          {/* Country / Geo Target */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              Country / Geo-Target
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Pakistan, United States, Global"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-country"
            />
          </div>

          {/* Target Audience */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Target className="h-3.5 w-3.5 text-indigo-400" />
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Small-scale street vendors, corporate legal analysts"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-audience"
            />
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-indigo-400" />
              Budget / Funding Limit
            </label>
            <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. $10k MVP, $250k Pre-Seed"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-budget"
            />
          </div>

          {/* Timeline */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              Launch Target Timeline
            </label>
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. 3 Months, 6 Weeks"
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              id="input-gen-timeline"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Clearly describe your app, startup, or software idea. Explain the problem you are solving, core features you want, and special integrations needed."
            className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
            id="input-gen-desc"
          ></textarea>
        </div>

        {/* Goals */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
            Operational Goals (Optional)
          </label>
          <textarea
            rows={2}
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            placeholder="Describe what success looks like (e.g. Onboard 150 local restaurants, process 1,000 files daily, achieve 99.9% uptime targets)."
            className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-y"
            id="input-gen-goals"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-xl shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4"
          id="btn-gen-trigger"
        >
          Compile Software Planning Package
          <Sparkles className="h-5 w-5 text-white animate-pulse" />
        </button>
      </form>
    </div>
  );
}
