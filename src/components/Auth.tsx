import React, { useState } from 'react';
import { Mail, Lock, User, Building, Rocket, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { API } from '../lib/api';

interface AuthProps {
  type: 'login' | 'register';
  onAuthSuccess: (token: string, user: any) => void;
  setCurrentView: (view: any) => void;
}

export default function Auth({ type, onAuthSuccess, setCurrentView }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Simulated forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Simulated email verification states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationDone, setVerificationDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (type === 'login') {
        const data = await API.login(email, password);
        onAuthSuccess(data.token, data.user);
      } else {
        const data = await API.register(email, name, password, company);
        setVerificationEmail(email);
        setShowVerification(true);
        onAuthSuccess(data.token, data.user);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Direct mock reset link sending
      setForgotSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySubmit = async () => {
    setLoading(true);
    try {
      setVerificationDone(true);
      setTimeout(() => {
        setCurrentView('dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showVerification) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-4 border border-indigo-500/20">
              <CheckCircle2 className="h-6 w-6 animate-bounce" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Verify Your Email</h2>
            <p className="mt-2 text-sm text-zinc-400">
              We've created your DevLaunch account. Click verify below to simulate completing registration.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-850 text-sm text-zinc-300 font-mono mb-6 text-center break-all">
            {verificationEmail}
          </div>

          {verificationDone ? (
            <div className="flex flex-col items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Simulated Verification Success! Launching Dashboard...</span>
            </div>
          ) : (
            <button
              onClick={handleVerifySubmit}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 transition-all disabled:opacity-50"
              id="btn-verify-sim"
            >
              {loading ? 'Verifying...' : 'Simulate Verification Check'}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (showForgot) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 px-4 py-12 text-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Forgot Password</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Enter your email and we'll mock sending a recovery link.
            </p>
          </div>

          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {forgotSent ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>Reset email sent (simulated)</span>
              </div>
              <button
                onClick={() => setShowForgot(false)}
                className="w-full py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white bg-zinc-950 border border-zinc-850 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 transition-all disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Mock Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 py-1"
              >
                Cancel and back to login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 px-4 py-12 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.06),transparent_50%)]"></div>
      
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-md relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 text-white font-extrabold text-sm mb-4 shadow-lg shadow-indigo-500/10">
            DL
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {type === 'login' ? 'Sign in to DevLaunch AI' : 'Create your Architect Account'}
          </h2>
          <p className="mt-1.5 text-xs text-zinc-400">
            {type === 'login' ? "Enter credentials or use the demo account below." : 'Sign up to construct robust SaaS requirements.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Rayyan Az"
                    id="input-name"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Company Name (Optional)</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                    placeholder="Acme Corp"
                    id="input-company"
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="rayyanaz101@gmail.com"
                id="input-email"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-400">Password</label>
              {type === 'login' && (
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="••••••••"
                id="input-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none mt-2"
            id="btn-auth-submit"
          >
            {loading ? 'Processing...' : type === 'login' ? 'Sign In' : 'Register & Start'}
            <Rocket className="h-4 w-4" />
          </button>
        </form>

        {/* Demo Account quick values */}
        {type === 'login' && (
          <div className="mt-6 p-3 rounded-xl bg-zinc-950 border border-zinc-850">
            <div className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
              Developer Demo Account
            </div>
            <div className="text-xs text-zinc-300 space-y-1 select-all font-mono">
              <div>Email: <span className="text-white">rayyanaz101@gmail.com</span></div>
              <div>Password: <span className="text-white">demo123</span></div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-zinc-400">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <button 
                onClick={() => setCurrentView('register')} 
                className="text-indigo-400 font-bold hover:underline"
              >
                Create one free
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button 
                onClick={() => setCurrentView('login')} 
                className="text-indigo-400 font-bold hover:underline"
              >
                Sign in instead
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
