import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import GenerationFlow from './components/GenerationFlow';
import ProjectViewer from './components/ProjectViewer';
import AdminPanel from './components/AdminPanel';
import Settings from './components/Settings';
import { Project, UserProfile } from './types';
import { RefreshCw } from 'lucide-react';
import { API } from './lib/api';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'generate' | 'viewer' | 'saved' | 'history' | 'admin' | 'settings' | 'login' | 'register'>('landing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  const [appLoading, setAppLoading] = useState(true);

  // Authenticate user on startup if token exists
  useEffect(() => {
    const savedToken = localStorage.getItem('devlaunch_token');
    if (savedToken) {
      setToken(savedToken);
      fetchUserProfile(savedToken);
      fetchProjects(savedToken);
    } else {
      setAppLoading(false);
      fetchProjects();
    }
  }, []);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const data = await API.getCurrentUser(authToken);
      setUser(data);
      // Default authenticated redirect to dashboard
      setCurrentView('dashboard');
    } catch (err) {
      localStorage.removeItem('devlaunch_token');
      setToken(null);
    } finally {
      setAppLoading(false);
    }
  };

  const fetchProjects = async (authToken?: string) => {
    try {
      const activeToken = authToken || token || undefined;
      const data = await API.getProjects(activeToken);
      setProjects(data);
    } catch (err) {
      console.error("Failed to load project indexes:", err);
    }
  };

  const handleAuthSuccess = (newToken: string, authedUser: UserProfile) => {
    localStorage.setItem('devlaunch_token', newToken);
    setToken(newToken);
    setUser(authedUser);
    setCurrentView('dashboard');
    fetchProjects(newToken); // Reload projects list
  };

  const handleLogout = async () => {
    await API.logout();
    localStorage.removeItem('devlaunch_token');
    setToken(null);
    setUser(null);
    setCurrentView('landing');
  };

  const handleToggleSaveProject = async (id: string) => {
    try {
      const isSaved = await API.toggleSaveProject(id);
      setProjects(prev => prev.map(p => p.id === id ? { ...p, isSaved } : p));
      if (activeProject && activeProject.id === id) {
        setActiveProject(prev => prev ? { ...prev, isSaved } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this planning package specification?")) {
      return;
    }
    try {
      const success = await API.deleteProject(id);
      if (success) {
        setProjects(prev => prev.filter(p => p.id !== id));
        if (activeProject && activeProject.id === id) {
          setActiveProject(null);
          setCurrentView('dashboard');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpgradeTier = async (newTier: 'Free' | 'Pro' | 'Enterprise') => {
    if (!user || !token) return;

    // Standard credit limit settings based on new tier
    const limit = newTier === 'Enterprise' ? 100 : newTier === 'Pro' ? 50 : 3;

    try {
      await API.upgradeTier(newTier, limit);
      setUser(prev => prev ? { ...prev, tier: newTier, usageLimit: limit } : null);
      alert(`Success! Your account has been upgraded to ${newTier} tier. Your credit limits have been expanded.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (fields: Partial<UserProfile>) => {
    if (!user) return;
    try {
      await API.updateProfile(fields.name || user.name, fields.company || user.company || "");
      setUser(prev => prev ? { ...prev, ...fields } : null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerationSuccess = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    setActiveProject(newProject);
    
    // Decrement credits on screen immediately
    setUser(prev => prev ? { ...prev, usageCount: prev.usageCount + 1 } : null);
    
    setCurrentView('viewer');
  };

  if (appLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-10 w-10 text-indigo-400 animate-spin" />
          <span className="text-sm font-bold tracking-wider text-zinc-400 font-mono">Initializing DevLaunch AI Workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-300">
      <Navbar 
        currentView={currentView} 
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view === 'dashboard') {
            fetchProjects(); // Reload list
          }
        }} 
        user={user} 
        onLogout={handleLogout} 
      />

      <main className="flex-1">
        {/* LANDING PAGE */}
        {currentView === 'landing' && (
          <LandingPage setCurrentView={setCurrentView} />
        )}

        {/* AUTH - LOGIN */}
        {currentView === 'login' && (
          <Auth 
            type="login" 
            onAuthSuccess={handleAuthSuccess} 
            setCurrentView={setCurrentView} 
          />
        )}

        {/* AUTH - REGISTER */}
        {currentView === 'register' && (
          <Auth 
            type="register" 
            onAuthSuccess={handleAuthSuccess} 
            setCurrentView={setCurrentView} 
          />
        )}

        {/* USER DASHBOARD */}
        {user && currentView === 'dashboard' && (
          <Dashboard 
            user={user}
            projects={projects}
            onSelectProject={(proj) => {
              setActiveProject(proj);
              setCurrentView('viewer');
            }}
            onToggleSaveProject={handleToggleSaveProject}
            onDeleteProject={handleDeleteProject}
            setCurrentView={setCurrentView}
            onUpgradeTier={handleUpgradeTier}
          />
        )}

        {/* SAVED PLANS FILTER */}
        {user && currentView === 'saved' && (
          <Dashboard 
            user={user}
            projects={projects.filter(p => p.isSaved)}
            onSelectProject={(proj) => {
              setActiveProject(proj);
              setCurrentView('viewer');
            }}
            onToggleSaveProject={handleToggleSaveProject}
            onDeleteProject={handleDeleteProject}
            setCurrentView={setCurrentView}
            onUpgradeTier={handleUpgradeTier}
          />
        )}

        {/* HISTORIC SPECIFICATIONS */}
        {user && currentView === 'history' && (
          <Dashboard 
            user={user}
            projects={projects}
            onSelectProject={(proj) => {
              setActiveProject(proj);
              setCurrentView('viewer');
            }}
            onToggleSaveProject={handleToggleSaveProject}
            onDeleteProject={handleDeleteProject}
            setCurrentView={setCurrentView}
            onUpgradeTier={handleUpgradeTier}
          />
        )}

        {/* AI GENERATOR FLOW */}
        {user && currentView === 'generate' && (
          <GenerationFlow 
            token={token || ''}
            onGenerationSuccess={handleGenerationSuccess}
            setCurrentView={setCurrentView}
          />
        )}

        {/* PROJECT BLUEPRINT VIEWER */}
        {activeProject && currentView === 'viewer' && (
          <ProjectViewer 
            project={activeProject}
            onBack={() => {
              setActiveProject(null);
              setCurrentView('dashboard');
            }}
            onToggleSave={() => handleToggleSaveProject(activeProject.id)}
          />
        )}

        {/* ADMIN OPERATIONS PANEL */}
        {user && user.tier === 'Enterprise' && currentView === 'admin' && (
          <AdminPanel token={token || ''} />
        )}

        {/* ACCOUNT SETTINGS & BILLING */}
        {user && currentView === 'settings' && (
          <Settings 
            user={user}
            token={token || ''}
            onUpdateProfile={handleUpdateProfile}
            onUpgradeTier={handleUpgradeTier}
          />
        )}
      </main>
    </div>
  );
}
