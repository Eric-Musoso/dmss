import React, { useState } from 'react';
import { BoxSelect, Truck, Leaf, Zap, Database, ArrowRight, Activity, Cpu, Sprout, Building2, Home, Shield, ShoppingBag, Globe, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick }) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 text-emerald-500 cursor-pointer group"
          >
            <div className="p-1.5 bg-emerald-500 rounded text-black shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.8)] transition-all duration-300">
               <BoxSelect className="w-6 h-6" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl text-slate-100 tracking-tight">DMSS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => scrollTo('features')} className="hover:text-emerald-400 transition-colors">Platform</button>
            <button onClick={() => scrollTo('solutions')} className="hover:text-emerald-400 transition-colors">Specializations</button>
            <button onClick={() => scrollTo('pricing')} className="hover:text-emerald-400 transition-colors">Pricing</button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLoginClick} className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
                Log In
            </button>
            <button 
                onClick={onLoginClick}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all text-sm border border-white/10 backdrop-blur-sm"
            >
                Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Orbit Design) */}
      <section className="relative pt-32 pb-32 overflow-hidden flex flex-col items-center justify-center min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="text-left animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">System Online v2.4</span>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold text-slate-100 leading-[1.1] mb-8">
               Unlock <br/>
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Global Intelligence</span> <br/>
               In One Click.
             </h1>
             
             <p className="text-lg text-slate-400 max-w-lg mb-10 leading-relaxed">
               Access unified data operations for Agriculture, Logistics, and Urban Planning. 
               The specialized talent and compute you thought was out of reach is now at your fingertips.
             </p>

             <div className="flex items-center gap-6">
                <button 
                  onClick={onLoginClick}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] flex items-center gap-2 group"
                >
                  Start Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex -space-x-3">
                   <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-xs font-bold">JD</div>
                   <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-[#020617] flex items-center justify-center text-xs font-bold">AS</div>
                   <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[#020617] flex items-center justify-center text-xs font-bold text-slate-500">+4k</div>
                </div>
             </div>
          </div>

          {/* Right: Orbit Visual */}
          <div className="relative h-[600px] w-full flex items-center justify-center hidden lg:flex scale-90 lg:scale-100">
             {/* Core with Floating Animation */}
             <div className="absolute z-20 w-48 h-48 rounded-full bg-[#020617] border border-emerald-500/30 flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(16,185,129,0.15)] animate-float">
                <div className="text-5xl font-bold text-white mb-1">1M+</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold">Decisions</div>
             </div>

             {/* Orbit Rings */}
             <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5"></div>
             <div className="absolute w-[550px] h-[550px] rounded-full border border-white/5"></div>

             {/* Orbiting Elements - Ring 1 (Clockwise) */}
             <div className="absolute w-[350px] h-[350px] orbit-cw hover-pause">
                {/* Item 1 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-emerald-500/50 flex items-center justify-center shadow-lg cursor-pointer group counter-rot-cw">
                      <Sprout className="w-6 h-6 text-emerald-400 group-hover:text-white transition-colors" />
                   </div>
                </div>
                {/* Item 2 */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                   <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-indigo-500/50 flex items-center justify-center shadow-lg cursor-pointer group counter-rot-cw">
                      <Truck className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                   </div>
                </div>
             </div>

             {/* Orbiting Elements - Ring 2 (Counter-Clockwise) */}
             <div className="absolute w-[550px] h-[550px] orbit-ccw hover-pause">
                {/* Item 1 */}
                <div className="absolute top-[20%] right-[10%]">
                   <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-purple-500/50 flex items-center justify-center shadow-lg cursor-pointer group counter-rot-ccw">
                      <Building2 className="w-8 h-8 text-purple-400 group-hover:text-white transition-colors" />
                   </div>
                </div>
                {/* Item 2 */}
                <div className="absolute bottom-[20%] left-[10%]">
                   <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-amber-500/50 flex items-center justify-center shadow-lg cursor-pointer group counter-rot-ccw">
                      <ShoppingBag className="w-8 h-8 text-amber-400 group-hover:text-white transition-colors" />
                   </div>
                </div>
                {/* Item 3 */}
                <div className="absolute top-[50%] left-[-2rem]">
                   <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-rose-500/50 flex items-center justify-center shadow-lg cursor-pointer group counter-rot-ccw">
                      <Shield className="w-6 h-6 text-rose-400 group-hover:text-white transition-colors" />
                   </div>
                </div>
             </div>
             
             {/* Floating Particles */}
             <div className="absolute top-10 right-20 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <div className="absolute bottom-20 left-10 w-3 h-3 bg-teal-500 rounded-full animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Brand Strip (Marquee) */}
        <div className="w-full border-t border-white/5 bg-black/20 backdrop-blur-sm py-8 mt-20 overflow-hidden relative">
           {/* Fade Edges */}
           <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#020617] to-transparent z-10"></div>
           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#020617] to-transparent z-10"></div>
           
           <div className="flex gap-16 animate-marquee whitespace-nowrap opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Duplicated items for seamless loop */}
              {[...Array(2)].map((_, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Globe className="w-6 h-6" /> Atlas</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Activity className="w-6 h-6" /> Pulse</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><CheckCircle2 className="w-6 h-6" /> Verify</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Cpu className="w-6 h-6" /> Logic</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Database className="w-6 h-6" /> Base</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Zap className="w-6 h-6" /> Flash</div>
                  <div className="flex items-center gap-2 text-xl font-bold text-slate-300"><Leaf className="w-6 h-6" /> EcoCore</div>
                </React.Fragment>
              ))}
           </div>
        </div>
      </section>

      {/* Specialization Cards */}
      <section id="solutions" className="py-32 px-6 relative">
         <div className="max-w-7xl mx-auto">
            <div className="text-left mb-16">
               <h2 className="text-4xl font-bold text-slate-100 mb-6">Specialized Intelligence <br/> <span className="text-emerald-500">For Your Sector</span></h2>
               <p className="text-slate-400 text-lg max-w-2xl">
                  Don't settle for generic data tools. DMSS provides tailored pipelines and decision models for your specific industry verticals.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Ag */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-emerald-500/50 hover:bg-emerald-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:scale-110 transition-all duration-300">
                      <Sprout className="w-7 h-7 text-emerald-500 group-hover:text-[#0a0a0a]" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Agriculture</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Yield prediction pipelines & satellite-based crop monitoring.</p>
                </div>

                {/* Logistics */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-indigo-500/50 hover:bg-indigo-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-300">
                      <Truck className="w-7 h-7 text-indigo-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Logistics</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Route optimization data flows & vehicle tracking integration.</p>
                </div>

                {/* Urban */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-purple-500/50 hover:bg-purple-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                      <Building2 className="w-7 h-7 text-purple-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Urban Planning</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Census integration & infrastructure monitoring dashboards.</p>
                </div>

                {/* Real Estate */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-blue-500/50 hover:bg-blue-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                      <Home className="w-7 h-7 text-blue-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Real Estate</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Property valuation flows & demographic site selection.</p>
                </div>

                 {/* Insurance */}
                 <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-rose-500/50 hover:bg-rose-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:scale-110 transition-all duration-300">
                      <Shield className="w-7 h-7 text-rose-500 group-hover:text-white" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Insurance</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Risk assessment heatmaps & claim pattern detection.</p>
                </div>

                {/* Retail */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-300">
                   <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:scale-110 transition-all duration-300">
                      <ShoppingBag className="w-7 h-7 text-amber-500 group-hover:text-[#0a0a0a]" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-100 mb-2">Retail</h3>
                   <p className="text-slate-400 text-sm leading-relaxed">Store catchment analysis & competitor mapping.</p>
                </div>

                {/* Environment */}
                <div className="group bg-[#0a0a0a] border border-white/10 p-8 rounded-3xl hover:border-teal-500/50 hover:bg-teal-950/10 transition-all duration-300 col-span-1 md:col-span-2">
                   <div className="flex items-start gap-6">
                       <div className="w-14 h-14 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300 shrink-0">
                          <Leaf className="w-7 h-7 text-teal-500 group-hover:text-[#0a0a0a]" />
                       </div>
                       <div>
                           <h3 className="text-xl font-bold text-slate-100 mb-2">Environmental & Climate</h3>
                           <p className="text-slate-400 text-sm leading-relaxed">Deforestation monitoring, flood risk modeling, and carbon footprint reporting pipelines.</p>
                       </div>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-3 text-emerald-500">
              <BoxSelect className="w-6 h-6" />
              <span className="font-bold text-slate-100 text-lg">DMSS Inc.</span>
           </div>
           <div className="flex gap-8 text-sm text-slate-500">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact Support</a>
           </div>
           <div className="text-sm text-slate-600">
              &copy; 2024 DMSS. All rights reserved.
           </div>
        </div>
      </footer>
    </div>
  );
};