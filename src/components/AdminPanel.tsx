import React, { useState, useEffect } from 'react';
import { 
   ShieldAlert, Settings, Cpu, Database, Users, Activity, Save, Check, RefreshCw, AlertCircle,
   BarChart, TrendingUp, PieChart, ShieldCheck
 } from 'lucide-react';
import { AppStats, AppSettings, UserProfile } from '../types';
import { API } from '../lib/api';

interface AdminPanelProps {
  token: string;
}

export default function AdminPanel({ token }: AdminPanelProps) {
  const [stats, setStats] = useState<AppStats | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsMsg, setSettingsMsg] = useState<string | null>(null);
  
  // Settings inputs
  const [aiModelName, setAiModelName] = useState('gemini-3.5-flash');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [freeLimit, setFreeLimit] = useState(3);
  const [proLimit, setProLimit] = useState(50);

  // Edit user state
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editTier, setEditTier] = useState<'Free' | 'Pro' | 'Enterprise'>('Free');
  const [editLimit, setEditLimit] = useState(3);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, settingsData, usersData] = await Promise.all([
        API.getAdminStats(token),
        API.getAdminSettings(token),
        API.getAdminUsers(token),
      ]);

      setStats(statsData);
      setSettings(settingsData);
      setUsers(usersData);

      // Populate inputs
      setAiModelName(settingsData.aiModelName);
      setSystemPrompt(settingsData.systemPromptPreset);
      setFreeLimit(settingsData.freeTierLimit);
      setProLimit(settingsData.proTierLimit);
    } catch (err) {
      console.error("Failed to load admin panel details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [token]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsMsg(null);

    try {
      await API.saveAdminSettings(token, {
        aiModelName,
        systemPromptPreset: systemPrompt,
        freeTierLimit: freeLimit,
        proTierLimit: proLimit,
      });
      
      setSettingsMsg("AI configurations and parameters updated successfully.");
      setTimeout(() => setSettingsMsg(null), 3000);
    } catch (err: any) {
      setSettingsMsg(`Error: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleUpdateUser = async (email: string) => {
    try {
      await API.adminUpdateUser(token, email, editTier, editLimit);
      setEditingEmail(null);
      fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center text-white">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 text-indigo-400 animate-spin" />
          <span className="text-sm text-zinc-400 font-mono">Loading operations dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white min-h-screen">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-6 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System Operations Control</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Configure prompt parameters, manage active subscribers, adjust credit levels, and audit usage metrics.
          </p>
        </div>
      </div>

      {/* Stats Bento Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-mono">Total Projects Compiled</span>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{stats.totalProjectsGenerated}</h3>
            <p className="text-xs text-zinc-500 mt-1">Cross-industry blueprints</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-mono">Registered Accounts</span>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{stats.userCount}</h3>
            <p className="text-xs text-zinc-500 mt-1">Simulated database profiles</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-mono">Total Saved Blueprints</span>
            <h3 className="text-3xl font-extrabold mt-2 text-white">{stats.totalSavedProjects}</h3>
            <p className="text-xs text-zinc-500 mt-1">Active bookmarked plans</p>
          </div>

          <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-950/40">
            <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-mono">Avg Response Latency</span>
            <h3 className="text-3xl font-extrabold mt-2 text-emerald-400">4.2s</h3>
            <p className="text-xs text-zinc-500 mt-1">Google Gemini API average</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: AI Parameters & Prompts Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5 mb-6">
              <Settings className="h-4.5 w-4.5 text-indigo-400" />
              AI Prompt Preset & Model Controls
            </h3>

            {settingsMsg && (
              <div className="mb-4 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>{settingsMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">Gemini Model</label>
                  <select
                    value={aiModelName}
                    onChange={(e) => setAiModelName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="gemini-3.5-flash">gemini-3.5-flash (Standard)</option>
                    <option value="gemini-3.1-pro-preview">gemini-3.1-pro (High reasoning)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">Free Limit</label>
                  <input
                    type="number"
                    value={freeLimit}
                    onChange={(e) => setFreeLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">Pro Limit</label>
                  <input
                    type="number"
                    value={proLimit}
                    onChange={(e) => setProLimit(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/40 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider font-mono">System Prompt Instruction Override</label>
                <textarea
                  rows={6}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-xs text-zinc-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y font-mono"
                  placeholder="Paste system instructions to guide Gemini output patterns..."
                />
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md shadow-indigo-500/10 transition-all disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {savingSettings ? 'Saving...' : 'Persist Parameter Configs'}
              </button>
            </form>
          </div>

          {/* User Database Accounts Manager */}
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <Users className="h-4.5 w-4.5 text-indigo-400" />
              Active System Accounts Directory
            </h3>

            <div className="overflow-x-auto rounded-xl border border-zinc-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-900 border-b border-zinc-850 text-zinc-400 font-mono text-[10px] uppercase">
                    <th className="p-3">User</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Tier</th>
                    <th className="p-3">Usage</th>
                    <th className="p-3">Limits</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50 text-zinc-300">
                  {users.map((u, i) => (
                    <tr key={i} className="hover:bg-zinc-900/10 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white">{u.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{u.email}</div>
                      </td>
                      <td className="p-3 text-zinc-400">{u.company || '—'}</td>
                      <td className="p-3">
                        {editingEmail === u.email ? (
                          <select
                            value={editTier}
                            onChange={(e: any) => setEditTier(e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 text-[10px] text-white rounded p-1"
                          >
                            <option value="Free">Free</option>
                            <option value="Pro">Pro</option>
                            <option value="Enterprise">Enterprise</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ${
                            u.tier === 'Enterprise' ? 'bg-indigo-500/15 text-indigo-400' :
                            u.tier === 'Pro' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {u.tier}
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-mono text-indigo-400 font-bold">{u.usageCount}</td>
                      <td className="p-3 font-mono">
                        {editingEmail === u.email ? (
                          <input
                            type="number"
                            value={editLimit}
                            onChange={(e) => setEditLimit(Number(e.target.value))}
                            className="w-16 bg-zinc-900 border border-zinc-800 text-[10px] p-1 text-white rounded"
                          />
                        ) : (
                          u.usageLimit
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {editingEmail === u.email ? (
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleUpdateUser(u.email)}
                              className="p-1 rounded hover:bg-zinc-900 text-emerald-400"
                              title="Save Changes"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingEmail(null)}
                              className="p-1 rounded hover:bg-zinc-900 text-zinc-500"
                              title="Cancel"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingEmail(u.email);
                              setEditTier(u.tier);
                              setEditLimit(u.usageLimit);
                            }}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold"
                          >
                            Adjust
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Industry popular distribution & logs */}
        <div className="space-y-6">
          {stats && (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Popular Industries</h3>
              <div className="space-y-3">
                {stats.popularIndustries.length === 0 ? (
                  <p className="text-xs text-zinc-500">No industries calculated yet.</p>
                ) : (
                  stats.popularIndustries.map((ind, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                        <span>{ind.name}</span>
                        <span className="font-mono text-indigo-400">{ind.count} blueprints</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(ind.count / Math.max(...stats.popularIndustries.map(x => x.count), 1)) * 100}%` }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {stats && (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Country Targets</h3>
              <div className="space-y-3">
                {stats.popularCountries.length === 0 ? (
                  <p className="text-xs text-zinc-500">No country regions parsed.</p>
                ) : (
                  stats.popularCountries.map((c, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
                        <span>{c.name}</span>
                        <span className="font-mono text-indigo-400">{c.count} targets</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(c.count / Math.max(...stats.popularCountries.map(x => x.count), 1)) * 100}%` }}></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
