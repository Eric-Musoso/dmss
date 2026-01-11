import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BoxSelect, Lock, Mail, Loader2, User, Key, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
        setIsLoading(false);
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        // Mock success
        login('mock_token_xyz', 'mock_refresh_abc', { 
            id: 'u_123', 
            name: isRegistering ? name : 'Demo User', 
            email: email, 
            role: 'admin' 
        });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 relative overflow-hidden">
       {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-900/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md glass-panel rounded-2xl p-8 shadow-2xl relative z-10">
        <a href="/" className="absolute top-6 left-6 text-slate-500 hover:text-emerald-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
        </a>

        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-emerald-500 rounded-xl text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] mb-4">
               <BoxSelect className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            {isRegistering ? 'Initialize Account' : 'Access Node'}
          </h1>
          <p className="text-slate-400 text-sm mt-2 text-center">
            {isRegistering ? 'Configure your workspace parameters' : 'Authenticate to enter the decision matrix'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-2 rounded text-sm text-center">
              {error}
            </div>
          )}
          
          {isRegistering && (
             <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    placeholder="John Doe"
                    required
                />
                </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="name@company.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          {isRegistering && (
             <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-bold text-emerald-500/80 uppercase tracking-widest flex justify-between">
                    <span>Database API Key</span>
                    <span className="text-slate-600 font-normal normal-case">(Optional)</span>
                </label>
                <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                    type="text" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                    placeholder="pk_live_..."
                />
                </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-6 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRegistering ? 'Initialize Account' : 'Authenticate')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isRegistering ? "Already initialized?" : "New to the system?"} 
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="ml-1 text-emerald-400 font-medium hover:underline focus:outline-none hover:text-emerald-300"
          >
            {isRegistering ? 'Log In' : 'Register Node'}
          </button>
        </div>
      </div>
    </div>
  );
};