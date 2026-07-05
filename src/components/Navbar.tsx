import React from 'react';
import { Rocket, Cpu, LogOut, User, Settings, PieChart, Sparkles, Bookmark, History, ShieldAlert } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: any) => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export default function Navbar({ currentView, setCurrentView, user, onLogout }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView(user ? 'dashboard' : 'landing')} 
          className="flex cursor-pointer items-center gap-2 group"
          id="nav-logo"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Cpu className="h-5 w-5" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 opacity-30 blur-sm -z-10 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            DevLaunch<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-1">
          {user ? (
            <>
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'dashboard' ? 'text-indigo-400 bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
                id="btn-nav-dashboard"
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('generate')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  currentView === 'generate' ? 'text-indigo-400 bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
                id="btn-nav-generate"
              >
                <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
                Architect New App
              </button>
              <button
                onClick={() => setCurrentView('saved')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  currentView === 'saved' ? 'text-indigo-400 bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
                id="btn-nav-saved"
              >
                <Bookmark className="h-4 w-4" />
                Saved Plans
              </button>
              <button
                onClick={() => setCurrentView('history')}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                  currentView === 'history' ? 'text-indigo-400 bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
                id="btn-nav-history"
              >
                <History className="h-4 w-4" />
                History
              </button>
              {user.tier === 'Enterprise' && (
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    currentView === 'admin' ? 'text-indigo-400 bg-zinc-900' : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                  }`}
                  id="btn-nav-admin"
                >
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                  Admin
                </button>
              )}
            </>
          ) : (
            <>
              <a href="#features" className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors">FAQ</a>
            </>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Token Counter Badge */}
              <div className="hidden sm:flex flex-col items-end text-xs mr-1">
                <span className="text-zinc-400 font-medium">Credits Used</span>
                <span className="text-indigo-400 font-bold">{user.usageCount} / {user.usageLimit}</span>
              </div>
              
              <button
                onClick={() => setCurrentView('settings')}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                title="Account Settings"
                id="btn-nav-settings"
              >
                <Settings className="h-5 w-5" />
              </button>

              <div className="h-8 w-px bg-zinc-800 hidden sm:block"></div>

              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-indigo-400 font-bold text-sm border border-zinc-700">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                  title="Logout"
                  id="btn-nav-logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentView('login')}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                id="btn-nav-login"
              >
                Sign In
              </button>
              <button 
                onClick={() => setCurrentView('register')}
                className="relative inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                id="btn-nav-register"
              >
                Get Started
                <Rocket className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
