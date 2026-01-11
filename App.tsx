import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { PipelineBuilder } from './pages/PipelineBuilder';
import { MapExplorer } from './pages/MapExplorer';
import { ArchitectureDocs } from './pages/ArchitectureDocs';
import { DataSources } from './pages/DataSources';
import { DataExplorer } from './pages/DataExplorer';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { LogisticsOptimizer } from './pages/verticals/LogisticsOptimizer';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ViewState } from './types';
import { Sprout, Building2, Leaf, Home, Shield, ShoppingBag } from 'lucide-react';

// Layout Wrapper
const DashboardLayout: React.FC<{ children: React.ReactNode, currentView: string, setCurrentView: (v: string) => void }> = ({ children, currentView, setCurrentView }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header title={currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('_', ' ')} />
        <main className="flex-1 overflow-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

// Generic Placeholder Component
const ModulePlaceholder: React.FC<{ title: string; description: string; icon: React.ElementType }> = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="p-8 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full mb-6 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
      <Icon className="w-20 h-20 text-emerald-500" />
    </div>
    <h2 className="text-4xl font-bold text-slate-100 mb-4">{title}</h2>
    <p className="text-slate-400 max-w-lg text-lg leading-relaxed">{description}</p>
    <button className="mt-10 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-1">
      Activate Module
    </button>
  </div>
);

// Main App Logic
const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>(ViewState.DASHBOARD);
  const [showLogin, setShowLogin] = useState(false);
  const { isAuthenticated } = useAuth();

  // Public Route Handling
  if (!isAuthenticated) {
    if (showLogin) {
      return <LoginPage />;
    }
    return <LandingPage onLoginClick={() => setShowLogin(true)} />;
  }

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return <Dashboard />;
      case ViewState.PIPELINES: return <PipelineBuilder />;
      case ViewState.MAP: return <MapExplorer />;
      case ViewState.DOCS: return <ArchitectureDocs />;
      case ViewState.DATA: return <DataSources />;
      case 'explorer': return <DataExplorer />; 
      
      // Industry Verticals
      case ViewState.AGRICULTURE: 
        return <ModulePlaceholder title="Agriculture Intelligence" description="Farm boundary management, yield prediction pipelines, and satellite-based crop monitoring." icon={Sprout} />;
      case ViewState.LOGISTICS: 
        return <LogisticsOptimizer />;
      case ViewState.URBAN: 
        return <ModulePlaceholder title="Urban Planning & Gov" description="Census data integration, permit tracking workflows, and infrastructure monitoring dashboards." icon={Building2} />;
      case ViewState.ENVIRONMENT: 
        return <ModulePlaceholder title="Environmental & Climate" description="Deforestation monitoring, flood risk modeling, and carbon footprint reporting." icon={Leaf} />;
      case ViewState.REAL_ESTATE: 
        return <ModulePlaceholder title="Real Estate & Property" description="Property valuation flows, demographic enrichment, and site selection tools." icon={Home} />;
      case ViewState.INSURANCE: 
        return <ModulePlaceholder title="Insurance Analytics" description="Risk assessment heatmaps, claim pattern detection, and geospatial fraud analysis." icon={Shield} />;
      case ViewState.RETAIL: 
        return <ModulePlaceholder title="Retail Intelligence" description="Store catchment analysis, competitor mapping, and foot traffic visualization." icon={ShoppingBag} />;
        
      default: return <div className="p-8 text-center text-slate-400">Module under development</div>;
    }
  };

  return (
    <DashboardLayout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </DashboardLayout>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;