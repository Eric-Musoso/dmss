import React from 'react';
import { 
  LayoutDashboard, 
  Workflow, 
  Map as MapIcon, 
  FileText, 
  Database, 
  Settings, 
  ChevronLeft, 
  BoxSelect,
  Truck,
  Leaf,
  Sprout,
  Building2,
  Home,
  Shield,
  ShoppingBag,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isOpen: boolean;
  toggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, toggle }) => {
  const { logout } = useAuth();
  
  const coreNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipelines', label: 'Pipeline Builder', icon: Workflow },
    { id: 'map', label: 'Geospatial View', icon: MapIcon },
    { id: 'data', label: 'Data Sources', icon: Database },
  ];

  const solutionItems = [
    { id: 'agriculture', label: 'Agriculture', icon: Sprout },
    { id: 'logistics', label: 'Logistics', icon: Truck },
    { id: 'urban', label: 'Urban & Gov', icon: Building2 },
    { id: 'environment', label: 'Environment', icon: Leaf },
    { id: 'real_estate', label: 'Real Estate', icon: Home },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'retail', label: 'Retail', icon: ShoppingBag },
  ];

  const sysItems = [
    { id: 'docs', label: 'System Design', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderNavGroup = (items: typeof coreNavItems, title?: string) => (
    <div className="mb-6">
      {isOpen && title && <div className="px-4 text-xs font-bold text-emerald-500/80 uppercase tracking-widest mb-3">{title}</div>}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative mb-1
              ${isActive 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}
            `}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-emerald-400' : 'stroke-slate-400 group-hover:stroke-slate-200'}`} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            
            {!isOpen && (
              <div className="absolute left-14 bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                {item.label}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside 
      className={`
        bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 ease-in-out flex flex-col z-20 h-screen
        ${isOpen ? 'w-64' : 'w-20'}
      `}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 shrink-0 bg-gradient-to-b from-emerald-950/30 to-transparent">
        <div className="flex items-center gap-3 text-emerald-500">
          <div className="p-1.5 bg-emerald-500 rounded-lg text-[#020617] shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            <BoxSelect className="w-6 h-6" strokeWidth={2.5} />
          </div>
          {isOpen && <span className="font-bold text-xl text-slate-100 tracking-tight">DMSS</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
        {renderNavGroup(coreNavItems, "Platform")}
        {renderNavGroup(solutionItems, "Verticals")}
        {renderNavGroup(sysItems, "System")}
      </nav>

      {/* Footer Toggle */}
      <div className="p-3 border-t border-white/10 shrink-0 flex flex-col gap-2 bg-[#050505]">
         <button 
          onClick={logout}
          className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-rose-400 hover:bg-rose-500/10
          `}
          title="Log Out"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm font-medium">Return Home</span>}
        </button>

        <button 
          onClick={toggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-slate-400 transition-colors"
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </aside>
  );
};