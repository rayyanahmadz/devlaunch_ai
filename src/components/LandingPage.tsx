import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Rocket, Cpu, Sparkles, Database, Code, ShieldCheck, TrendingUp, Calendar, DollarSign, ChevronDown, Check, ArrowRight, Layers, FileText } from 'lucide-react';

interface LandingPageProps {
  setCurrentView: (view: any) => void;
}

export default function LandingPage({ setCurrentView }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-indigo-400" />,
      title: "Complete PRD Generation",
      description: "Generates professional Product Requirements Documents including Executive Summary, Target Personas, User Journeys, and Market Fit."
    },
    {
      icon: <Database className="h-6 w-6 text-indigo-400" />,
      title: "Database Schemas & ERD",
      description: "Delivers normalized PostgreSQL tables with relations and indexes, plus fully valid rendering code for Mermaid.js diagrams."
    },
    {
      icon: <Code className="h-6 w-6 text-indigo-400" />,
      title: "API Endpoint Specs",
      description: "Outputs restfully clean REST API routes with request bodies, response models, validation guards, and security levels."
    },
    {
      icon: <Layers className="h-6 w-6 text-indigo-400" />,
      title: "ASCII Folder Trees",
      description: "Maps out a modular, scalable project skeleton with custom microservice setups, route controllers, and folder definitions."
    },
    {
      icon: <Calendar className="h-6 w-6 text-indigo-400" />,
      title: "Sprints & Sagas",
      description: "Breaks your timeline into manageable agile cycles complete with detailed user stories, estimations, and acceptance criteria."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-indigo-400" />,
      title: "Cost & Budget Forecasts",
      description: "Estimates monthly cloud server overhead, API rate costs, third-party tooling subscriptions, and operational risk mitigation."
    }
  ];

  const faqs = [
    {
      q: "How does DevLaunch AI analyze my project idea?",
      a: "DevLaunch AI integrates with state-of-the-art Google Gemini models configured with our elite CTO and product architect templates. It processes your goals, budget, constraints, and country-level demographics to formulate specific technical plans."
    },
    {
      q: "Can I export the generated plans?",
      a: "Absolutely! You can instantly export any generated architecture package to premium formats including complete PDF layouts, structured Markdown files, valid JSON, or DOCX documentation."
    },
    {
      q: "Are the database and code schemas actually valid?",
      a: "Yes. Our templates force Gemini to return syntactically valid Postgres DDL SQL schemas, structured Mermaid markup, and correct JSON-formatted API structures that can be pasted directly into code editors."
    },
    {
      q: "What is the difference between the tiers?",
      a: "The Free tier lets you try 3 core architectures. Upgrading to Pro gives you up to 50 generations with fine-tuned parameters. Enterprise offers unlimited access, custom system prompt injection, and team analytics."
    }
  ];

  return (
    <div className="bg-zinc-950 text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(99,102,241,0.15),transparent_60%)]"></div>
        <div className="absolute top-1/4 left-1/10 h-72 w-72 rounded-full bg-indigo-500/10 opacity-30 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/10 h-96 w-96 rounded-full bg-violet-500/10 opacity-20 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 shadow-sm"
          >
            
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
          >
            Launch Your Next Big Startup Idea with <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-500 to-purple-500 bg-clip-text text-transparent">
              Complete AI Technical Blueprints
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Pitch your vision in simple sentences. DevLaunch AI automatically acts as your virtual CTO to draft comprehensive PRDs, database ERDs, folder structures, sprint backlogs, and cloud budgets in under 10 seconds.
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button 
              onClick={() => setCurrentView('register')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 hover:from-indigo-450 hover:to-purple-550 shadow-xl shadow-indigo-500/15 hover:shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              id="hero-btn-start"
            >
              Architect Your App For Free
              <ArrowRight className="h-5 w-5" />
            </button>
            <a 
              href="#features"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700 transition-all"
            >
              Explore Features
            </a>
          </motion.div>

          {/* Interactive Hero Mockup Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-2xl backdrop-blur-sm"
          >
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl -z-10"></div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
              {/* Header mockup */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 bg-zinc-950">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
                </div>
                <div className="text-xs text-zinc-500 font-mono select-none">https://devlaunch.ai/projects/bitespeed-pakistan</div>
                <div className="w-12 h-1 bg-zinc-900 rounded-full"></div>
              </div>

              {/* Grid Content Mockup */}
              <div className="grid grid-cols-1 md:grid-cols-4 h-[420px] text-left">
                {/* Mock Sidebar */}
                <div className="hidden md:block border-r border-zinc-900 p-4 bg-zinc-950/60 font-mono text-xs text-zinc-400 space-y-4">
                  <div className="text-indigo-400 font-bold tracking-wider uppercase mb-2">1. PRODUCTSPEC</div>
                  <div className="pl-3 py-1 border-l-2 border-indigo-500 text-white font-semibold">Executive Summary</div>
                  <div className="pl-3 py-1 hover:text-white cursor-pointer">Target Personas</div>
                  <div className="pl-3 py-1 hover:text-white cursor-pointer">Competitor Ideas</div>
                  <div className="text-indigo-400 font-bold tracking-wider uppercase mb-2 pt-2">2. ARCHITECTURE</div>
                  <div className="pl-3 py-1 hover:text-white cursor-pointer">Database Schema</div>
                  <div className="pl-3 py-1 hover:text-white cursor-pointer">REST API Specs</div>
                  <div className="pl-3 py-1 hover:text-white cursor-pointer">Folder Trees</div>
                </div>

                {/* Mock Editor */}
                <div className="md:col-span-3 p-6 bg-zinc-950/20 overflow-y-auto space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">BiteSpeed Pakistan</h3>
                      <p className="text-xs text-zinc-500">Hyper-localized food & grocery delivery blueprint</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">Active Plan</span>
                  </div>

                  <div className="space-y-3 font-sans text-sm text-zinc-300">
                    <p className="text-zinc-400 leading-relaxed">
                      <strong>Executive Vision:</strong> BiteSpeed will disrupt localized delivery platforms in emerging cities by targeting mid-to-low tier Android devices and implementing cash-on-delivery routing.
                    </p>
                    <div className="p-3.5 rounded-lg bg-zinc-900/80 border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-1">
                      <span className="text-violet-400">CREATE TABLE</span> <span className="text-indigo-400">orders</span> (<br />
                      &nbsp;&nbsp;id <span className="text-purple-400">SERIAL PRIMARY KEY</span>,<br />
                      &nbsp;&nbsp;total_amount <span className="text-orange-400">NUMERIC(10,2)</span>,<br />
                      &nbsp;&nbsp;payment_method <span className="text-yellow-400">VARCHAR(20) DEFAULT</span> <span className="text-emerald-400">'COD'</span><br />
                      );
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              CTO-Level Specifications, instantly
            </h2>
            <p className="text-zinc-400">
              Stop spending weeks copying boilerplate requirements. DevLaunch AI produces full architecture diagrams, database SQL, sprint schedules, and pricing estimates in under ten seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-850 hover:border-zinc-700/80 hover:bg-zinc-900/60 transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/10 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 border-t border-zinc-900 bg-zinc-950/40 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.05),transparent_40%)]"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              How DevLaunch Works
            </h2>
            <p className="text-zinc-400">
              Go from general concepts to complete, actionable roadmap specifications in three simple stages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            {/* Steps line connector */}
            <div className="hidden lg:block absolute top-1/4 left-1/6 right-1/6 h-[2px] bg-zinc-800 -z-10"></div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 mb-6">
                1
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 opacity-20 blur-sm -z-10"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pitch Your Idea</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Describe your startup vision, localized target country, estimated timeline, and operational objectives in human terms.
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 mb-6">
                2
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 opacity-20 blur-sm -z-10"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Gemini Formulation</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Our smart prompt arrays analyze target market niches and generate Postgres databases, ER diagrams, schemas, and sprint backlogs.
              </p>
            </div>

            <div className="text-center">
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20 mb-6">
                3
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-600 opacity-20 blur-sm -z-10"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Export & Launch</h3>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Review your microservices, pricing models, and Gantt summaries. Export instantly to PDF, Markdown, JSON, or DOCX formats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 border-t border-zinc-900 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Flexible, value-driven plans
            </h2>
            <p className="text-zinc-400">
              Start prototyping with our free tier, or unlock full-scale generation capacity with premium options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/20 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all">
              <div>
                <h3 className="text-lg font-semibold text-zinc-400 mb-2">Free Prototyper</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-zinc-500">/ forever</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">Perfect for solo builders looking to test startup architectures.</p>
                <div className="h-px bg-zinc-850 my-6"></div>
                <ul className="space-y-3.5 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> 3 AI project generations</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Basic PDF & Markdown export</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Simple PostgreSQL tables</li>
                </ul>
              </div>
              <button 
                onClick={() => setCurrentView('register')}
                className="mt-8 w-full py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-sm font-semibold hover:bg-zinc-900 transition-all text-white"
              >
                Sign Up Free
              </button>
            </div>

            {/* Pro */}
            <div className="rounded-2xl border-2 border-indigo-500 bg-zinc-900/50 p-8 flex flex-col justify-between shadow-lg shadow-indigo-500/5 relative">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-indigo-500 text-zinc-950 text-xs font-bold uppercase tracking-wider">
                Recommended
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Startup Founder</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$29</span>
                  <span className="text-xs text-zinc-400">/ month</span>
                </div>
                <p className="text-sm text-zinc-300 mb-6">Ideal for active developers and design agencies creating pitch decks.</p>
                <div className="h-px bg-zinc-800 my-6"></div>
                <ul className="space-y-3.5 text-sm text-zinc-200">
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> 50 AI project generations</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Premium Mermaid ERDs</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> PDF, MD, JSON, & DOCX exports</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Live active settings tweaks</li>
                </ul>
              </div>
              <button 
                onClick={() => setCurrentView('register')}
                className="mt-8 w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-500/10 transition-all hover:scale-[1.02]"
              >
                Get Startup Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="rounded-2xl border border-zinc-850 bg-zinc-900/20 p-8 flex flex-col justify-between hover:border-zinc-800 transition-all">
              <div>
                <h3 className="text-lg font-semibold text-zinc-400 mb-2">Studio Edition</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$99</span>
                  <span className="text-xs text-zinc-500">/ month</span>
                </div>
                <p className="text-sm text-zinc-400 mb-6">Built for development studios, tech hubs, and corporate innovators.</p>
                <div className="h-px bg-zinc-850 my-6"></div>
                <ul className="space-y-3.5 text-sm text-zinc-300">
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Unlimited generations</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Custom system prompt injection</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Team workspaces & audit logs</li>
                  <li className="flex items-center gap-2.5"><Check className="h-4.5 w-4.5 text-indigo-400" /> Priority support SLA</li>
                </ul>
              </div>
              <button 
                onClick={() => setCurrentView('register')}
                className="mt-8 w-full py-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-sm font-semibold hover:bg-zinc-900 transition-all text-white"
              >
                Contact Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-t border-zinc-900 bg-zinc-950/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400">
              Clear, direct answers regarding DevLaunch capabilities, licensing, and exports.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-xl border border-zinc-850 bg-zinc-900/20 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-900/30 transition-colors"
                >
                  <span className="font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-zinc-900/50 pt-4 bg-zinc-900/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-12 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-bold text-xs shadow-md">
              DL
            </div>
            <span className="text-sm font-bold text-white">DevLaunch AI</span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
