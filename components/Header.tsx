import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useStore } from '../store';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { user } = useStore();

  return (
    <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-6 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">{title}</h1>
        {title === 'Dashboard' && (
             <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                System Operational
             </span>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search intelligence..." 
            className="bg-black/50 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 w-72 text-slate-300 placeholder-slate-600 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-emerald-400 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-[#0a0a0a]"></span>
          </button>
          
          <div className="h-8 w-px bg-white/10 mx-1"></div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-slate-200">{user?.name}</div>
              <div className="text-xs text-slate-500">{user?.role}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-bold border border-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              {user?.name.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};