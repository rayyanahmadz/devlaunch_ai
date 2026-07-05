import React, { useState } from 'react';
import { 
  User, Settings as SettingsIcon, CreditCard, ShieldCheck, Mail, Building, Bell,
  Key, RefreshCw, Zap, CheckCircle2, ShieldAlert
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  token: string;
  onUpdateProfile: (updatedFields: Partial<UserProfile>) => void;
  onUpgradeTier: (tier: 'Free' | 'Pro' | 'Enterprise') => void;
}

export default function Settings({ user, token, onUpdateProfile, onUpgradeTier }: SettingsProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'billing' | 'security'>('profile');
  
  // Profile form state
  const [name, setName] = useState(user.name);
  const [company, setCompany] = useState(user.company || '');
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  // Security mock state
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [securityMsg, setSecurityMsg] = useState<string | null>(null);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setProfileMsg(null);

    try {
      // Simulate API update or let parent update State
      onUpdateProfile({ name, company });
      setProfileMsg("Your company profile details have been updated.");
      setTimeout(() => setProfileMsg(null), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMsg("Password updated successfully (simulated).");
    setCurrPass('');
    setNewPass('');
    setTimeout(() => setSecurityMsg(null), 3000);
  };

  const handleUpgradeSimulate = (tier: 'Pro' | 'Enterprise') => {
    onUpgradeTier(tier);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 text-white min-h-screen">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-6 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <SettingsIcon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Account & Subscriptions</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Update your professional workspace identity, track subscription bills, and inspect security settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Side Sub-Navigation */}
        <div className="md:col-span-1 space-y-1">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeSubTab === 'profile' ? 'bg-indigo-500/10 text-indigo-400 font-extrabold border-l-2 border-indigo-500' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <User className="h-4 w-4" />
            Profile Workspace
          </button>
          <button
            onClick={() => setActiveSubTab('billing')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeSubTab === 'billing' ? 'bg-indigo-500/10 text-indigo-400 font-extrabold border-l-2 border-indigo-500' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <CreditCard className="h-4 w-4" />
            Billing & Tiers
          </button>
          <button
            onClick={() => setActiveSubTab('security')}
            className={`w-full flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
              activeSubTab === 'security' ? 'bg-indigo-500/10 text-indigo-400 font-extrabold border-l-2 border-indigo-500' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
            }`}
          >
            <Key className="h-4 w-4" />
            Password & Security
          </button>
        </div>

        {/* Right Side Content Viewport */}
        <div className="md:col-span-3">
          
          {/* PROFILE VIEW */}
          {activeSubTab === 'profile' && (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 space-y-6">
              <h3 className="text-base font-bold text-white mb-4">Workspace Identity</h3>
              
              {profileMsg && (
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
                  {profileMsg}
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold">Account Owner Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold">Company / Studio</label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none"
                        placeholder="Startup Lab"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-zinc-400 font-semibold">Registered Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/40 text-sm text-zinc-500 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500">Contact our support center to modify primary sign-in emails.</span>
                </div>

                <button
                  type="submit"
                  disabled={updatingProfile}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 shadow-md transition-all"
                >
                  {updatingProfile ? 'Saving...' : 'Update Workspace Details'}
                </button>
              </form>
            </div>
          )}

          {/* BILLING VIEW - SUBSCRIPTION MANAGEMENT */}
          {activeSubTab === 'billing' && (
            <div className="space-y-6">
              {/* Active Plan Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest font-mono">Current Plan</span>
                  <h3 className="text-xl font-bold text-white">{user.tier} Plan</h3>
                  <p className="text-xs text-zinc-400 max-w-sm">
                    {user.tier === 'Enterprise' ? 'Ultimate unlimited technical specification access for corporate studios.' :
                     user.tier === 'Pro' ? 'Up to 50 elite software blueprints and exports per billing cycle.' :
                     'Prototyper credit limits of 3 specifications.'}
                  </p>
                </div>
                <div className="text-left sm:text-right space-y-1">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Billing Rate</span>
                  <h4 className="text-2xl font-extrabold text-white">
                    {user.tier === 'Enterprise' ? '$99' : user.tier === 'Pro' ? '$29' : '$0'}
                    <span className="text-xs text-zinc-500 font-normal"> / mo</span>
                  </h4>
                </div>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pro Upgrade Tier */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 flex flex-col justify-between hover:border-zinc-750 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Startup Pro</h4>
                      <span className="text-xs text-zinc-500 font-mono font-bold">$29/mo</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Lifts generation limits from 3 to 50 plans instantly, and unlocks structured Word DOCX & Mermaid exports.
                    </p>
                  </div>
                  {user.tier === 'Free' ? (
                    <button
                      onClick={() => handleUpgradeSimulate('Pro')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-400 transition-all shadow-lg"
                    >
                      <Zap className="h-3.5 w-3.5 fill-white" />
                      Simulate Pro Upgrade
                    </button>
                  ) : user.tier === 'Pro' ? (
                    <span className="mt-6 text-center text-xs text-indigo-400 font-bold">Your Active Plan</span>
                  ) : (
                    <button
                      onClick={() => handleUpgradeSimulate('Pro')}
                      className="mt-6 text-xs text-zinc-500 hover:text-white hover:underline self-center"
                    >
                      Downgrade to Pro
                    </button>
                  )}
                </div>

                {/* Enterprise Upgrade Tier */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 flex flex-col justify-between hover:border-zinc-750 transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">Enterprise Studio</h4>
                      <span className="text-xs text-zinc-500 font-mono font-bold">$99/mo</span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Provides full operations dashboard access, infinite blueprint exports, prompt parameter preset controls, and usage metrics.
                    </p>
                  </div>
                  {user.tier !== 'Enterprise' ? (
                    <button
                      onClick={() => handleUpgradeSimulate('Enterprise')}
                      className="mt-6 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 transition-all shadow-md shadow-indigo-500/5"
                    >
                      <Zap className="h-3.5 w-3.5 fill-white" />
                      Simulate Enterprise Upgrade
                    </button>
                  ) : (
                    <span className="mt-6 text-center text-xs text-indigo-400 font-bold">Your Active Plan</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SECURITY VIEW */}
          {activeSubTab === 'security' && (
            <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/20 space-y-6">
              <h3 className="text-base font-bold text-white mb-4">Credentials & Verification</h3>

              {securityMsg && (
                <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
                  {securityMsg}
                </div>
              )}

              <form onSubmit={handleSecuritySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold">Current Password</label>
                    <input
                      type="password"
                      required
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-zinc-400 font-semibold">New Safe Password</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all"
                >
                  Simulate Password Reset
                </button>
              </form>

              <div className="h-px bg-zinc-800"></div>

              {/* Status Simulation boxes */}
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/40 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white">Email Address Verification Status</h4>
                  <p className="text-[11px] text-zinc-500">Unverified email flags prevent production plan sharing pipelines.</p>
                </div>
                {user.verified ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase font-mono tracking-wider">
                    Verified Profile
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase font-mono tracking-wider animate-pulse">
                    Action Required
                  </span>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
